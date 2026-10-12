// Vercel Cron Job — sendet automatisch jeden Dienstag um 9 Uhr eine
// freundliche Erinnerung an ALLE Push-Abonnenten. Unabhängig davon, ob
// jemand die Website besucht.

const SUPABASE_URL = 'https://uayewlkcqlgtzmeerhjy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dTrkRJ16pFhd2Bp1In-CTQ_jXVnWVcE';

async function isTriggerEnabled(key) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/kv_store?key=eq.siteconfig:pushTriggers&select=value`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!res.ok) return true;
    const rows = await res.json();
    const t = rows.length ? rows[0].value : null;
    if (!t || t[key] === undefined) return true; // Standard: an
    return !!t[key];
  } catch {
    return true;
  }
}

// Ist heute (Berlin) geöffnet? Liest denselben Plan wie die Website
// (siteconfig:hours, im Personal-Bereich änderbar). Fehlt er oder ist er
// unlesbar, gilt der Standard: ab 01.11.2026 ist dienstags Ruhetag.
// Ohne diese Prüfung ginge ab 01.11. jeden Dienstag eine falsche
// "wir haben heute für dich geöffnet"-Nachricht an alle Abonnenten.
async function isOpenToday() {
  const todayKey = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Berlin' }); // YYYY-MM-DD
  const weekday = new Date(todayKey + 'T12:00:00Z').getUTCDay();
  let cfg = null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/kv_store?key=eq.siteconfig:hours&select=value`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (res.ok) {
      const rows = await res.json();
      cfg = rows.length ? rows[0].value : null;
    }
  } catch {}
  if (!cfg || !Array.isArray(cfg.schedules) || cfg.schedules.length === 0) {
    return !(todayKey >= '2026-11-01' && weekday === 2);
  }
  const ex = (Array.isArray(cfg.exceptions) ? cfg.exceptions : []).filter((e) => e && e.from <= todayKey && todayKey <= e.to).pop();
  if (ex) return ex.closed === false;
  let act = null;
  for (const sc of [...cfg.schedules].sort((a, b) => (a.from < b.from ? -1 : 1))) {
    if (!act || sc.from <= todayKey) act = sc;
  }
  const day = act && act.days && (act.days[weekday] || act.days[String(weekday)]);
  return !day || day.open !== false;
}

export default async function handler(req, res) {
  const enabled = await isTriggerEnabled('dienstagErinnerung');
  if (!enabled) {
    return res.status(200).json({ skipped: true, reason: 'Trigger in den Einstellungen deaktiviert' });
  }

  if (!(await isOpenToday())) {
    return res.status(200).json({ skipped: true, reason: 'Heute ist Ruhetag laut Öffnungszeiten-Plan' });
  }

  const REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;
  if (!REST_API_KEY) {
    return res.status(500).json({ error: 'ONESIGNAL_REST_API_KEY ist auf dem Server nicht konfiguriert' });
  }

  try {
    const response = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${REST_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: 'e2d12bd5-0cd9-4bf7-9ad9-8d3dd258f16f',
        included_segments: ['Total Subscriptions'],
        headings: { en: '🥙 Dienstag ist Döner-Tag!', de: '🥙 Dienstag ist Döner-Tag!' },
        contents: { en: 'Bodrum Kebap nicht vergessen — wir haben heute für dich geöffnet! 😋', de: 'Bodrum Kebap nicht vergessen — wir haben heute für dich geöffnet! 😋' },
        url: 'https://www.bodrumkebapvechta.de',
        chrome_web_icon: 'https://www.bodrumkebapvechta.de/icon-192.png',
        firefox_icon: 'https://www.bodrumkebapvechta.de/icon-192.png',
        chrome_web_badge: 'https://www.bodrumkebapvechta.de/icon-192.png',
      }),
    });
    const data = await response.json();
    return res.status(response.ok ? 200 : response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
