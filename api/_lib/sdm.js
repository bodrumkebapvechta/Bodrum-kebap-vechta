// NTAG 424 DNA – "Secure Dynamic Messaging" (SUN) prüfen.
// Der Chip hängt bei JEDEM Antippen zwei Werte an den Link:
//   picc = verschlüsselt: UID des Chips + Lesezähler (AES-128, Schlüssel kMeta)
//   cmac = Prüfsumme über diese Werte (AES-CMAC, Sitzungsschlüssel aus kFile)
// Ein kopierter Link enthält einen alten Zähler → der Server lehnt ihn ab.
// Standard-Einrichtung nach NXP AN12196 (MAC über leere Eingabe, d. h.
// SDMMACInputOffset = SDMMACOffset), wie bei den üblichen SUN-Beispielen.
import crypto from 'crypto';

const ZERO_IV = Buffer.alloc(16, 0);

function aesEcb(key, block) {
  const c = crypto.createCipheriv('aes-128-ecb', key, null);
  c.setAutoPadding(false);
  return Buffer.concat([c.update(block), c.final()]);
}
function shiftLeft1(buf) {
  const out = Buffer.alloc(buf.length);
  let carry = 0;
  for (let i = buf.length - 1; i >= 0; i--) {
    out[i] = ((buf[i] << 1) | carry) & 0xff;
    carry = (buf[i] & 0x80) ? 1 : 0;
  }
  return out;
}
// AES-CMAC nach RFC 4493
export function aesCmac(key, msg) {
  const L = aesEcb(key, Buffer.alloc(16, 0));
  let K1 = shiftLeft1(L); if (L[0] & 0x80) K1[15] ^= 0x87;
  let K2 = shiftLeft1(K1); if (K1[0] & 0x80) K2[15] ^= 0x87;
  const n = Math.max(1, Math.ceil(msg.length / 16));
  const complete = msg.length > 0 && msg.length % 16 === 0;
  let last;
  if (complete) {
    last = Buffer.from(msg.subarray((n - 1) * 16, n * 16));
    for (let i = 0; i < 16; i++) last[i] ^= K1[i];
  } else {
    last = Buffer.alloc(16, 0);
    const rest = msg.subarray((n - 1) * 16);
    rest.copy(last); last[rest.length] = 0x80;
    for (let i = 0; i < 16; i++) last[i] ^= K2[i];
  }
  let X = Buffer.alloc(16, 0);
  for (let i = 0; i < n - 1; i++) {
    const blk = msg.subarray(i * 16, i * 16 + 16);
    const y = Buffer.alloc(16); for (let j = 0; j < 16; j++) y[j] = X[j] ^ blk[j];
    X = aesEcb(key, y);
  }
  const y = Buffer.alloc(16); for (let j = 0; j < 16; j++) y[j] = X[j] ^ last[j];
  return aesEcb(key, y);
}

function hexKey(h) {
  if (typeof h !== 'string' || !/^[0-9a-fA-F]{32}$/.test(h)) throw new Error('Schlüssel ungültig');
  return Buffer.from(h, 'hex');
}

function macTrunc(kSes, msg) {
  const full = aesCmac(kSes, msg);
  return Buffer.from([1, 3, 5, 7, 9, 11, 13, 15].map((i) => full[i]));
}
function sessionKey(kFile, uid, ctrLE) {
  return aesCmac(kFile, Buffer.concat([Buffer.from('3cc300010080', 'hex'), uid, ctrLE]));
}

// Prüft einen Chip-Link. Unterstützt beide üblichen Einstellungen:
//   verschlüsselt:  ?picc=<32 hex>&cmac=<16 hex>
//   offen:          ?uid=<14 hex>&ctr=<6 hex>&cmac=<16 hex>
// und als MAC-Eingabe sowohl "leer" als auch den Link-Text vom ersten
// dynamischen Wert bis vor den cmac-Wert (je nach Einstellung beim Beschreiben).
// p = { picc, uid, ctr, cmac, raw }  raw = Original-Query (location.search)
// Liefert { uid, ctr } oder null (gefälscht/ungültig).
export function verifySunParams(p, kMetaHex, kFileHex) {
  const cmacHex = String(p.cmac || '');
  if (!/^[0-9a-fA-F]{16}$/.test(cmacHex)) return null;
  const kFile = hexKey(kFileHex);
  let uid, ctrLE, firstVal;
  if (p.picc) {
    if (!/^[0-9a-fA-F]{32}$/.test(String(p.picc))) return null;
    const d = crypto.createDecipheriv('aes-128-cbc', hexKey(kMetaHex), ZERO_IV);
    d.setAutoPadding(false);
    const plain = Buffer.concat([d.update(Buffer.from(String(p.picc), 'hex')), d.final()]);
    const tag = plain[0];
    // Bit7: UID gespiegelt, Bit6: Zähler gespiegelt, Bits0-3: UID-Länge (7)
    if ((tag & 0xc0) !== 0xc0 || (tag & 0x0f) !== 7) return null;
    uid = plain.subarray(1, 8);
    ctrLE = plain.subarray(8, 11);
    firstVal = String(p.picc);
  } else if (p.uid && p.ctr) {
    if (!/^[0-9a-fA-F]{14}$/.test(String(p.uid)) || !/^[0-9a-fA-F]{6}$/.test(String(p.ctr))) return null;
    uid = Buffer.from(String(p.uid), 'hex');
    ctrLE = Buffer.from(String(p.ctr), 'hex').reverse(); // gespiegelt als MSB zuerst
    firstVal = String(p.uid);
  } else return null;
  const kSes = sessionKey(kFile, uid, ctrLE);
  const given = Buffer.from(cmacHex, 'hex');
  const inputs = [Buffer.alloc(0)];
  const raw = typeof p.raw === 'string' ? p.raw : '';
  const a = raw.indexOf(firstVal), b = raw.lastIndexOf(cmacHex);
  if (a >= 0 && b > a) inputs.push(Buffer.from(raw.slice(a, b), 'ascii'));
  if (!inputs.some((m) => crypto.timingSafeEqual(macTrunc(kSes, m), given))) return null;
  return { uid: uid.toString('hex').toUpperCase(), ctr: ctrLE[0] | (ctrLE[1] << 8) | (ctrLE[2] << 16) };
}
// Kurzform (nur verschlüsselt, MAC über leere Eingabe)
export function verifySun(piccHex, cmacHex, kMetaHex, kFileHex) {
  try { return verifySunParams({ picc: piccHex, cmac: cmacHex }, kMetaHex, kFileHex); } catch { return null; }
}
// Nur für Tests: gültige offene Parameter erzeugen
export function _makePlainCmac(uidHex, ctr, kFileHex, msg = '') {
  const ctrLE = Buffer.from([ctr & 0xff, (ctr >> 8) & 0xff, (ctr >> 16) & 0xff]);
  return macTrunc(sessionKey(hexKey(kFileHex), Buffer.from(uidHex, 'hex'), ctrLE), Buffer.from(msg, 'ascii')).toString('hex').toUpperCase();
}

export function newKeyHex() { return crypto.randomBytes(16).toString('hex').toUpperCase(); }
