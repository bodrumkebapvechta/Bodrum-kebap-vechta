// POST /api/staff-login
//   { pin, remember: null|'10m'|'1h'|'today' }  → { token, exp }   (PIN prüfen)
//   { action: 'check', token }                    → { ok }           (Token noch gültig?)
//   { action: 'ping' }                            → { ok }           (nur aufwärmen)
// Schutz gegen Durchprobieren: nach 10 falschen Versuchen 15 Minuten Sperre.
import { kvGet, kvSet, signToken, verifyToken, secretMatches, currentEpoch, secondsUntilBerlinMidnight, readBody } from './_lib/staff.js';

const MAX_TRIES = 10;
const LOCK_MS = 15 * 60 * 1000;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const body = readBody(req);
  try {
    // Aufwärmen, sobald der PIN-Bildschirm erscheint (Kaltstart passiert dann,
    // während man tippt – nicht erst nach dem letzten Ziffer).
    if (body.action === 'ping') return res.status(200).json({ ok: true });
    if (body.action === 'check') {
      const p = await verifyToken(body.token);
      return res.status(200).json({ ok: !!p, exp: p ? p.exp : null });
    }
    const pin = String(body.pin || '');
    if (!/^\d{4,8}$/.test(pin)) return res.status(400).json({ error: 'PIN ungültig' });

    // Alle Lesezugriffe parallel (früher 5 Anfragen nacheinander).
    const now = Date.now();
    const [tries0, record, epoch, prev] = await Promise.all([
      kvGet('secret:pinAttempts'), kvGet('secret:staffPin'), currentEpoch(), kvGet('siteconfig:lastStaffLogin'),
    ]);
    const tries = tries0 || { count: 0, since: now };
    if (tries.count >= MAX_TRIES && now - tries.since < LOCK_MS) {
      return res.status(429).json({ error: 'locked', retryInMin: Math.ceil((LOCK_MS - (now - tries.since)) / 60000) });
    }
    if (!record) return res.status(500).json({ error: 'PIN ist auf dem Server nicht eingerichtet' });

    if (!secretMatches(pin, record)) {
      const fresh = now - tries.since >= LOCK_MS ? { count: 1, since: now } : { count: (tries.count || 0) + 1, since: tries.since || now };
      await kvSet('secret:pinAttempts', fresh);
      await new Promise((r) => setTimeout(r, 400));
      return res.status(401).json({ error: 'wrong', left: Math.max(0, MAX_TRIES - fresh.count) });
    }

    const ttlSec = body.remember === '10m' ? 600 : body.remember === '1h' ? 3600 : body.remember === 'today' ? secondsUntilBerlinMidnight() : 12 * 3600;
    const exp = now + ttlSec * 1000;
    const token = signToken({ r: 'staff', exp, ep: epoch });
    await Promise.all([
      tries.count ? kvSet('secret:pinAttempts', { count: 0, since: now }) : null,
      kvSet('siteconfig:lastStaffLogin', { ts: now }),
    ]);
    return res.status(200).json({ token, exp, lastLogin: prev && prev.ts ? prev.ts : null });
  } catch (err) {
    console.error('[staff-login]', err);
    return res.status(500).json({ error: 'Serverfehler' });
  }
}
