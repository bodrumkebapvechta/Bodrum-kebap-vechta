// POST /api/owner-password
//   { action: 'verify', password }                         → { ok }  (Gerät als Inhaber-Gerät markieren)
//   { action: 'change', token, oldPassword, newPassword }  → { ok }  (nur eingeloggt)
// Übergang: Gibt es noch kein gehashtes Passwort, wird einmalig das alte
// Klartext-Passwort (siteconfig:ownerDevicePassword) geprüft, gehasht
// übernommen und der Klartext gelöscht.
import { kvGet, kvSet, kvDelete, verifyToken, makeSecretRecord, secretMatches, readBody } from './_lib/staff.js';

async function check(password) {
  const rec = await kvGet('secret:ownerPassword');
  if (rec) return secretMatches(password, rec);
  const legacy = await kvGet('siteconfig:ownerDevicePassword');
  const legacyPw = legacy && typeof legacy.password === 'string' ? legacy.password : null;
  if (legacyPw && legacyPw === password) {
    await kvSet('secret:ownerPassword', makeSecretRecord(password));
    await kvDelete('siteconfig:ownerDevicePassword');
    return true;
  }
  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const body = readBody(req);
  try {
    if (body.action === 'verify') {
      const ok = await check(String(body.password || ''));
      if (!ok) await new Promise((r) => setTimeout(r, 400));
      return res.status(200).json({ ok });
    }
    if (body.action === 'change') {
      if (!(await verifyToken(body.token))) return res.status(401).json({ error: 'Nicht angemeldet' });
      const next = String(body.newPassword || '').trim();
      if (next.length < 4) return res.status(400).json({ error: 'Neues Passwort muss mind. 4 Zeichen haben' });
      if (!(await check(String(body.oldPassword || '')))) return res.status(403).json({ error: 'Aktuelles Passwort ist falsch' });
      const ok = await kvSet('secret:ownerPassword', makeSecretRecord(next));
      await kvDelete('siteconfig:ownerDevicePassword');
      return res.status(ok ? 200 : 500).json({ ok });
    }
    return res.status(400).json({ error: 'action unbekannt' });
  } catch (err) {
    console.error('[owner-password]', err);
    return res.status(500).json({ error: 'Serverfehler' });
  }
}
