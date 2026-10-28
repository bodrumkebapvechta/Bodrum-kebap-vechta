// Stempelkarte – alle Schreibvorgänge laufen hier über den Server
// (Service-Role-Key). Browser dürfen "loyalty:*" / "loyaltystamp:*" nur noch LESEN.
//
// Kunden-Aktionen (ohne Login):
//   create     { code, referredBy }  → neue Karte mit Willkommens-Stempel (nur wenn sie noch nicht existiert)
//   birthday   { code, mmdd }        → Geburtstag eintragen (nur einmal; ändern kann nur das Personal)
//   selfCheck  { token }             → ist der NFC-Mühür-Link gültig/aktiv?
//   selfStamp  { code, token }       → Selbst-Stempel per NFC (1×/Tag, nur zu Öffnungszeiten)
// Personal-Aktionen (Token nötig):
//   stamp, redeem, birthday (ändern), delete (→ Papierkorb), trashList, restore, purge, stampCfg
//
// Papierkorb: gelöschte Karten (inkl. Stempel-Historie) liegen 30 Tage unter
// "secret:loyaltytrash:<code>" – für Browser unsichtbar, nur über diese API.
import crypto from 'crypto';
import { kvGet, kvSet, kvDelete, kvList, verifyToken } from './staff.js';
import { verifySunParams, newKeyHex } from './sdm.js';

export const LOYALTY_TARGET = 8;
const CODE_RE = /^BK-[A-Z0-9]{4}$/;
const MMDD_RE = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const TRASH = 'secret:loyaltytrash:';
const TRASH_DAYS = 30;
const STAMP_CFG_KEY = 'siteconfig:stampConfig';

class HttpError extends Error { constructor(status, msg) { super(msg); this.status = status; } }
const fail = (status, msg) => { throw new HttpError(status, msg); };

function shortCode(len = 4) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const b = crypto.randomBytes(len);
  let out = ''; for (let i = 0; i < len; i++) out += chars[b[i] % chars.length];
  return out;
}
async function logStamp(code, source, ts = Date.now()) {
  await kvSet(`loyaltystamp:${ts}-${shortCode()}`, { code, ts, source });
}
async function saveCard(code, card) {
  if (!(await kvSet(`loyalty:${code}`, card))) fail(503, 'Speichern fehlgeschlagen');
  return card;
}

// ── Berliner Zeit + Öffnungszeiten (gleiche Logik wie im Frontend) ──────────
function berlinParts(now = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23' }).formatToParts(now).map((x) => [x.type, x.value]));
  const dow = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday];
  return { key: `${p.year}-${p.month}-${p.day}`, dow, h: Number(p.hour) + Number(p.minute) / 60 };
}
const HM_RE = /^([01]?\d|2[0-3]):([0-5]\d)$/;
const hm = (s, d) => { const m = HM_RE.exec(s || '') || HM_RE.exec(d); return (+m[1]) + (+m[2]) / 60; };
function defaultHours() {
  const week = (closed) => Object.fromEntries([0, 1, 2, 3, 4, 5, 6].map((d) => [d, { open: !closed.includes(d), from: '11:30', to: '22:00' }]));
  return { schedules: [{ from: '2000-01-01', days: week([]) }, { from: '2026-11-01', days: week([2]) }], exceptions: [] };
}
function dayWindow(cfg, key, dow) {
  for (const e of (cfg.exceptions || [])) {
    if (e && e.from <= key && key <= e.to) return e.closed !== false ? null : [hm(e.openFrom, '11:30'), hm(e.openTo, '22:00')];
  }
  const sch = [...(cfg.schedules || [])].filter((s) => s && s.from && s.days).sort((a, b) => (a.from < b.from ? -1 : 1));
  let act = sch[0];
  for (const s of sch) if (s.from <= key) act = s;
  const d = act && (act.days[dow] || act.days[String(dow)]);
  if (!d || d.open === false) return null;
  return [hm(d.from, '11:30'), hm(d.to, '22:00')];
}
async function isOpenOrJustClosed(now = new Date()) {
  let cfg = null;
  try { cfg = await kvGet('siteconfig:hours'); } catch {}
  if (!cfg || !Array.isArray(cfg.schedules) || !cfg.schedules.length) cfg = defaultHours();
  // Geöffnet ODER bis 30 Minuten nach Ladenschluss
  for (const t of [now, new Date(now.getTime() - 30 * 60000)]) {
    const b = berlinParts(t);
    const w = dayWindow(cfg, b.key, b.dow);
    if (w && b.h >= w[0] && b.h < w[1]) return true;
  }
  return false;
}

// ── Aktionen ─────────────────────────────────────────────────────────────────
async function create({ code, referredBy }) {
  if (!CODE_RE.test(code || '')) fail(400, 'Ungültiger Code');
  const existing = await kvGet(`loyalty:${code}`);
  if (existing) return { card: existing, isNew: false };
  const fresh = { stamps: 1, createdAt: Date.now(), welcomeStamp: true };
  if (CODE_RE.test(referredBy || '') && referredBy !== code && (await kvGet(`loyalty:${referredBy}`))) fresh.referredBy = referredBy;
  await saveCard(code, fresh);
  try { await logStamp(code, 'welcome'); } catch {}
  return { card: fresh, isNew: true };
}

// Stempel hinzufügen. Freundschaftsbonus nur bei Personal-Stempeln.
async function addStamp(code, source) {
  const card = (await kvGet(`loyalty:${code}`)) || { stamps: 0, createdAt: Date.now() };
  const updated = { ...card, stamps: Math.min(LOYALTY_TARGET, (card.stamps || 0) + 1), lastStampAt: Date.now() };
  if (source === 'self') updated.lastSelfStampDay = berlinParts().key;
  if (source !== 'self' && card.referredBy && !card.referralProcessed) {
    updated.stamps = Math.min(LOYALTY_TARGET, updated.stamps + 1);
    updated.referralProcessed = true;
    try {
      const ref = await kvGet(`loyalty:${card.referredBy}`);
      if (ref) await kvSet(`loyalty:${card.referredBy}`, { ...ref, stamps: Math.min(LOYALTY_TARGET, (ref.stamps || 0) + 1) });
    } catch {}
  }
  await saveCard(code, updated);
  try { await logStamp(code, source); } catch {}
  return updated;
}

async function readStampCfg() {
  const c = await kvGet(STAMP_CFG_KEY);
  return c && c.token ? c : null;
}
function tokenOk(cfg, token) {
  if (!cfg || typeof token !== 'string' || !token) return false;
  const a = Buffer.from(String(cfg.token)); const b = Buffer.from(token);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// ── Sichere NFC-Chips (NTAG 424 DNA, SUN) ────────────────────────────────────
// secret:sdmConfig = { kMeta, kFile, required }   (Schlüssel als 32 Hex-Zeichen)
// secret:sdmtag:<UID> = { seen, used, at }         (höchster gesehener / verbrauchter Zähler)
// Jedes Antippen erzeugt einen neuen Zähler. Ein Link wird nur akzeptiert, wenn
// sein Zähler noch NICHT verbraucht ist UND nicht älter als der zuletzt gesehene –
// ein gespeicherter/kopierter Link ist also spätestens nach dem nächsten
// Antippen (oder nach dem Einlösen) wertlos.
const SDM_CFG = 'secret:sdmConfig';
async function readSdm() { return (await kvGet(SDM_CFG)) || null; }
function sunOf(sdm, sp) {
  if (!sdm || !sdm.kMeta || !sdm.kFile || !sp || !sp.cmac) return null;
  try { return verifySunParams(sp, sdm.kMeta, sdm.kFile); } catch { return null; }
}
// sp = { picc, uid, ctr, cmac, raw } aus dem Link (vom Browser durchgereicht)
function sunParams(body) {
  const sp = body && body.sun && typeof body.sun === 'object' ? body.sun : {};
  const pick = (k) => (typeof sp[k] === 'string' ? sp[k].slice(0, 300) : undefined);
  return { picc: pick('picc'), uid: pick('uid'), ctr: pick('ctr'), cmac: pick('cmac'), raw: pick('raw') };
}
// Prüft den Chip-Teil des Links. Liefert { ok:true, sun } | { ok:true } (nicht nötig) | { ok:false }.
async function checkSun(sdm, sp, consume) {
  const hasParams = !!(sp && sp.cmac);
  if (!hasParams) return { ok: !(sdm && sdm.required) };
  const sun = sunOf(sdm, sp);
  if (!sun) return { ok: false };
  const key = `secret:sdmtag:${sun.uid}`;
  const rec = (await kvGet(key)) || { seen: -1, used: -1 };
  if (sun.ctr <= (rec.used ?? -1) || sun.ctr < (rec.seen ?? -1)) return { ok: false, replay: true };
  const next = { seen: Math.max(rec.seen ?? -1, sun.ctr), used: consume ? sun.ctr : (rec.used ?? -1), at: Date.now() };
  await kvSet(key, next);
  return { ok: true, sun };
}

async function selfStamp(body) {
  const { code, token } = body;
  const cfg = await readStampCfg();
  if (!tokenOk(cfg, token)) return { error: 'invalid' };
  if (cfg.enabled === false) return { error: 'disabled' };
  if (!CODE_RE.test(code || '')) return { error: 'notfound' };
  if (cfg.openOnly !== false && !(await isOpenOrJustClosed())) return { error: 'closed' };
  const card = await kvGet(`loyalty:${code}`);
  if (!card) return { error: 'notfound' };
  if (card.lastSelfStampDay === berlinParts().key) return { error: 'already' };
  if ((card.stamps || 0) >= LOYALTY_TARGET) return { error: 'full' };
  // Chip-Prüfung zuletzt und mit "verbrauchen": erst wenn alles andere passt,
  // wird der Zähler entwertet (sonst wäre ein Tipp bei z. B. falschem Code verloren).
  const chk = await checkSun(await readSdm(), sunParams(body), true);
  if (!chk.ok) return { error: 'tap' };
  return { card: await addStamp(code, 'self'), secure: !!chk.sun };
}

async function birthday({ code, mmdd }, staff) {
  if (!CODE_RE.test(code || '')) fail(400, 'Ungültiger Code');
  if (!MMDD_RE.test(mmdd || '')) fail(400, 'Ungültiges Datum');
  const card = await kvGet(`loyalty:${code}`);
  if (!card) fail(404, 'Karte nicht gefunden');
  if (card.birthday === mmdd) return { card };
  // Kunden dürfen den Geburtstag nur EINMAL eintragen (sonst ließe sich das
  // Geburtstagsgeschenk durch ständiges Umstellen erschleichen).
  if (card.birthday && !staff) fail(409, 'Geburtstag schon eingetragen');
  return { card: await saveCard(code, { ...card, birthday: mmdd }) };
}

async function redeem({ code }) {
  if (!CODE_RE.test(code || '')) fail(400, 'Ungültiger Code');
  const card = (await kvGet(`loyalty:${code}`)) || { stamps: 0, createdAt: Date.now() };
  const updated = { ...card, stamps: 0, lastRedeemedAt: Date.now(), redeemedCount: (card.redeemedCount || 0) + 1, almostThereNotified: false };
  return { card: await saveCard(code, updated) };
}

async function purgeOldTrash() {
  const rows = await kvList(TRASH, 1000);
  const cutoff = Date.now() - TRASH_DAYS * 86400000;
  const keep = [];
  for (const r of rows) {
    if ((r.value?.deletedAt || 0) < cutoff) await kvDelete(r.key);
    else keep.push(r);
  }
  return keep;
}

// Löschen = in den Papierkorb legen (Karte + ihre Stempel-Historie).
async function softDelete({ code }) {
  if (!CODE_RE.test(code || '')) fail(400, 'Ungültiger Code');
  const card = await kvGet(`loyalty:${code}`);
  if (!card) return { ok: true, deleted: false };
  const stamps = (await kvList('loyaltystamp:', 2000)).filter((r) => r.value?.code === code).map((r) => ({ key: r.key, value: r.value }));
  if (!(await kvSet(`${TRASH}${code}`, { code, card, stamps, deletedAt: Date.now() }))) fail(503, 'Papierkorb nicht erreichbar');
  await kvDelete(`loyalty:${code}`);
  for (const s of stamps) await kvDelete(s.key);
  try { await purgeOldTrash(); } catch {}
  return { ok: true, deleted: true };
}

async function trashList() {
  const rows = await purgeOldTrash();
  return {
    items: rows.map((r) => ({ code: r.value.code, stamps: r.value.card?.stamps || 0, birthday: r.value.card?.birthday || null, createdAt: r.value.card?.createdAt || null, deletedAt: r.value.deletedAt }))
      .sort((a, b) => b.deletedAt - a.deletedAt),
    days: TRASH_DAYS,
  };
}

async function restore({ code }) {
  if (!CODE_RE.test(code || '')) fail(400, 'Ungültiger Code');
  const t = await kvGet(`${TRASH}${code}`);
  if (!t) fail(404, 'Nicht im Papierkorb');
  // Falls der Kunde in der Zwischenzeit eine neue (leere) Karte mit demselben
  // Code bekommen hat: dort neu gesammelte Stempel (ohne Willkommens-Stempel) dazurechnen.
  const now = await kvGet(`loyalty:${code}`);
  const card = { ...t.card };
  if (now) {
    const extra = Math.max(0, (now.stamps || 0) - (now.welcomeStamp ? 1 : 0));
    card.stamps = Math.min(LOYALTY_TARGET, (card.stamps || 0) + extra);
    if (now.lastStampAt) card.lastStampAt = Math.max(card.lastStampAt || 0, now.lastStampAt);
    if (!card.birthday && now.birthday) card.birthday = now.birthday;
  }
  await saveCard(code, card);
  for (const s of (t.stamps || [])) { try { await kvSet(s.key, s.value); } catch {} }
  await kvDelete(`${TRASH}${code}`);
  return { card };
}

async function purge({ code }) {
  if (!CODE_RE.test(code || '')) fail(400, 'Ungültiger Code');
  return { ok: true, deleted: await kvDelete(`${TRASH}${code}`) };
}

// body.loyalty = Aktionsname, Rest = Parameter. Liefert [status, json].
export async function handleLoyalty(body) {
  const action = body.loyalty;
  try {
    if (action === 'create') return [200, await create(body)];
    if (action === 'selfCheck') {
      const cfg = await readStampCfg();
      if (!tokenOk(cfg, body.token)) return [200, { valid: false }];
      const chk = await checkSun(await readSdm(), sunParams(body), false);
      return [200, { valid: true, enabled: cfg.enabled !== false, openOnly: cfg.openOnly !== false, tap: !chk.ok }];
    }
    if (action === 'selfStamp') return [200, await selfStamp(body)];
    const staff = await verifyToken(body.staffToken);
    if (action === 'birthday') return [200, await birthday(body, !!staff)];
    if (!staff) return [401, { error: 'Nicht angemeldet' }];
    if (action === 'stamp') {
      if (!CODE_RE.test(body.code || '')) fail(400, 'Ungültiger Code');
      return [200, { card: await addStamp(body.code, 'staff') }];
    }
    if (action === 'redeem') return [200, await redeem(body)];
    if (action === 'delete') return [200, await softDelete(body)];
    if (action === 'trashList') return [200, await trashList()];
    if (action === 'restore') return [200, await restore(body)];
    if (action === 'purge') return [200, await purge(body)];
    if (action === 'stampCfg') return [200, { cfg: await readStampCfg() }];
    if (action === 'sdmGet') {
      const sdm = await readSdm();
      const tags = (await kvList('secret:sdmtag:', 50)).map((r) => ({ uid: r.key.split(':').pop(), used: r.value?.used, seen: r.value?.seen, at: r.value?.at }));
      return [200, { configured: !!(sdm && sdm.kMeta), required: !!(sdm && sdm.required), kMeta: sdm?.kMeta || '', kFile: sdm?.kFile || '', tags }];
    }
    if (action === 'sdmSet') {
      const cur = (await readSdm()) || {};
      const next = { ...cur };
      if (body.generate) { next.kMeta = newKeyHex(); next.kFile = newKeyHex(); next.required = false; }
      if (body.factory) { next.kMeta = '0'.repeat(32); next.kFile = '0'.repeat(32); }
      if (typeof body.kMeta === 'string' && typeof body.kFile === 'string') {
        if (!/^[0-9a-fA-F]{32}$/.test(body.kMeta) || !/^[0-9a-fA-F]{32}$/.test(body.kFile)) fail(400, 'Schlüssel: je 32 Hex-Zeichen');
        next.kMeta = body.kMeta.toUpperCase(); next.kFile = body.kFile.toUpperCase();
      }
      if (typeof body.required === 'boolean') {
        if (body.required && !next.kMeta) fail(400, 'Zuerst Schlüssel einrichten');
        next.required = body.required;
      }
      if (!(await kvSet(SDM_CFG, next))) fail(503, 'Speichern fehlgeschlagen');
      return [200, { ok: true, configured: !!next.kMeta, required: !!next.required, kMeta: next.kMeta || '', kFile: next.kFile || '' }];
    }
    return [400, { error: 'Aktion unbekannt' }];
  } catch (err) {
    if (err instanceof HttpError) return [err.status, { error: err.message }];
    console.error('[loyalty]', err);
    return [500, { error: 'Serverfehler' }];
  }
}
