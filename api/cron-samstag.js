// Vercel Cron Job — sendet automatisch jeden Samstag das Samstag-Angebot,
// unabhängig davon, ob jemand die Website besucht.

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

export default async function handler(req, res) {
  const enabled = await isTriggerEnabled('samstag');
  if (!enabled) {
    return res.status(200).json({ skipped: true, reason: 'Trigger in den Einstellungen deaktiviert' });
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
        headings: { en: '🎉 Samstag-Angebot ist da!', de: '🎉 Samstag-Angebot ist da!' },
        contents: { en: 'Pizza-Kombi & Dönerteller-Kombi — nur heute!', de: 'Pizza-Kombi & Dönerteller-Kombi — nur heute!' },
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
