// POST /api/staff-write  { token, op: 'set'|'delete', key, value }
//                   oder { loyalty: '<aktion>', ... }  (Stempelkarte)
// Schreibt/löscht im Namen des eingeloggten Personals mit dem Service-Role-Key.
// Nur bekannte Bereiche sind erlaubt, "secret:*" niemals.
import { kvSet, kvDelete, verifyToken, readBody } from './_lib/staff.js';
import { handleLoyalty } from './_lib/loyalty.js';

const ALLOWED = /^(siteconfig|tischphoto|spincode|weeklyreport|order|grouporder|analytics|heartbeat|langday|wish|contactmsg|cateringreq|survey):[^\s]{1,200}$/;
const FORBIDDEN_KEYS = new Set(['siteconfig:staffPin', 'siteconfig:ownerDevicePassword']);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const body = readBody(req);
  // Stempelkarte: eigene Aktionen (teils ohne Login), siehe _lib/loyalty.js.
  // Läuft über diesen Endpunkt, weil der Hobby-Plan max. 12 Funktionen erlaubt.
  if (typeof body.loyalty === 'string') {
    const [status, json] = await handleLoyalty(body);
    return res.status(status).json(json);
  }
  const { token, op, key, value } = body;
  try {
    if (!(await verifyToken(token))) return res.status(401).json({ error: 'Nicht angemeldet' });
    if (typeof key !== 'string' || !ALLOWED.test(key) || FORBIDDEN_KEYS.has(key)) return res.status(400).json({ error: 'Schlüssel nicht erlaubt' });
    if (op === 'set') {
      if (value === undefined) return res.status(400).json({ error: 'value fehlt' });
      if (JSON.stringify(value).length > 900000) return res.status(413).json({ error: 'zu groß' });
      return res.status(200).json({ ok: await kvSet(key, value) });
    }
    if (op === 'delete') return res.status(200).json({ ok: true, deleted: await kvDelete(key) });
    return res.status(400).json({ error: 'op unbekannt' });
  } catch (err) {
    console.error('[staff-write]', err);
    return res.status(500).json({ error: 'Serverfehler' });
  }
}
