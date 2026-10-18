// Gemeinsame Helfer für die Personal-Endpunkte (KEIN eigener Endpunkt:
// Dateien mit "_" am Anfang werden von Vercel nicht als Route veröffentlicht).
//
// Sicherheit:
// - Der PIN und das Inhaber-Passwort liegen nur gehasht (scrypt + Salt) unter
//   "secret:*" in der Datenbank. Diese Schlüssel kann der Browser nicht lesen
//   (Row Level Security), nur der Server mit dem Service-Role-Key.
// - Nach erfolgreichem PIN bekommt das Gerät einen signierten, ablaufenden
//   Token (HMAC-SHA256). Der Signaturschlüssel wird aus dem Service-Role-Key
//   abgeleitet und verlässt nie den Server.
// - "Alle Geräte abmelden" erhöht siteconfig:staffSessionEpoch → alle älteren
//   Tokens werden ungültig.
import crypto from 'crypto';

export const SUPABASE_URL = 'https://uayewlkcqlgtzmeerhjy.supabase.co';

function serviceKey() {
  const k = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!k) throw new Error('SUPABASE_SERVICE_ROLE_KEY fehlt');
  return k;
}
function headers(extra) {
  const k = serviceKey();
  return { apikey: k, Authorization: `Bearer ${k}`, ...(extra || {}) };
}

export async function kvGet(key) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/kv_store?key=eq.${encodeURIComponent(key)}&select=value`, { headers: headers() });
  if (!r.ok) throw new Error(`kvGet ${r.status}`);
  const rows = await r.json();
  return rows.length ? rows[0].value : null;
}
export async function kvSet(key, value) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/kv_store`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' }),
    body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
  });
  return r.ok;
}
export async function kvDelete(key) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/kv_store?key=eq.${encodeURIComponent(key)}`, {
    method: 'DELETE',
    headers: headers({ Prefer: 'return=representation' }),
  });
  if (!r.ok) return false;
  const body = await r.json().catch(() => []);
  return Array.isArray(body) && body.length > 0;
}

export function hashSecret(plain, salt) {
  return crypto.scryptSync(String(plain), String(salt), 32).toString('hex');
}
export function makeSecretRecord(plain) {
  const salt = crypto.randomBytes(16).toString('hex');
  return { salt, hash: hashSecret(plain, salt), updatedAt: Date.now() };
}
export function secretMatches(plain, record) {
  if (!record || !record.salt || !record.hash) return false;
  const a = Buffer.from(hashSecret(plain, record.salt), 'hex');
  const b = Buffer.from(String(record.hash), 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function signingKey() {
  return crypto.createHash('sha256').update(`bk-staff-token:${serviceKey()}`).digest();
}
export function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', signingKey()).update(body).digest('base64url');
  return `${body}.${sig}`;
}
export async function currentEpoch() {
  const e = await kvGet('siteconfig:staffSessionEpoch');
  return typeof e === 'number' ? e : 0;
}
// Liefert die Token-Daten oder null (abgelaufen, gefälscht, abgemeldet).
export async function verifyToken(token) {
  if (typeof token !== 'string' || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', signingKey()).update(body).digest('base64url');
  const a = Buffer.from(sig || '');
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  let p;
  try { p = JSON.parse(Buffer.from(body, 'base64url').toString()); } catch { return null; }
  if (!p || p.r !== 'staff' || typeof p.exp !== 'number' || p.exp < Date.now()) return null;
  if ((p.ep || 0) !== (await currentEpoch())) return null;
  return p;
}

// Sekunden bis heute 23:59:59 in Berlin.
export function secondsUntilBerlinMidnight(now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(now).map((p) => [p.type, Number(p.value)]));
  return Math.max(60, (23 - parts.hour) * 3600 + (59 - parts.minute) * 60 + (59 - parts.second));
}

export function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch { return {}; }
}
