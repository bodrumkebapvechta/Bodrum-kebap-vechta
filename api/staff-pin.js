// POST /api/staff-pin  { token, newPin }  → neuen Personal-PIN setzen (nur eingeloggt).
// Die PIN-Länge wird öffentlich unter siteconfig:staffPinLength abgelegt,
// damit die Eingabe weiß, wie viele Stellen sie erwartet.
import { kvSet, verifyToken, makeSecretRecord, readBody } from './_lib/staff.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { token, newPin } = readBody(req);
  try {
    if (!(await verifyToken(token))) return res.status(401).json({ error: 'Nicht angemeldet' });
    const pin = String(newPin || '').trim();
    if (!/^\d{4,8}$/.test(pin)) return res.status(400).json({ error: 'PIN muss 4–8 Ziffern haben' });
    const ok = (await kvSet('secret:staffPin', makeSecretRecord(pin))) && (await kvSet('siteconfig:staffPinLength', { len: pin.length }));
    return res.status(ok ? 200 : 500).json({ ok });
  } catch (err) {
    console.error('[staff-pin]', err);
    return res.status(500).json({ error: 'Serverfehler' });
  }
}
