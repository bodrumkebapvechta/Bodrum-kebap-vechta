// Vercel Cron Job — sendet jeden Sonntag um 21 Uhr einen Wochenrückblick
// NUR an den Besitzer (Owner-Gerät), mit den wichtigsten Zahlen der
// vergangenen 7 Tage. Reine Zusammenfassung, kein Kundenversand.

const SUPABASE_URL = 'https://uayewlkcqlgtzmeerhjy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dTrkRJ16pFhd2Bp1In-CTQ_jXVnWVcE';
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

async function fetchPrefix(prefix, limit = 3000) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/kv_store?key=like.${encodeURIComponent(prefix)}*&select=key,value&limit=${limit}`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function handler(req, res) {
  const REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;
  if (!REST_API_KEY) {
    return res.status(500).json({ error: 'ONESIGNAL_REST_API_KEY ist auf dem Server nicht konfiguriert' });
  }

  try {
    const now = Date.now();
    const since = now - WEEK_MS;

    const [analyticsRows, loyaltyRows, stampRows, surveyRows] = await Promise.all([
      fetchPrefix('analytics:'),
      fetchPrefix('loyalty:'),
      fetchPrefix('loyaltystamp:'),
      fetchPrefix('survey:'),
    ]);

    const visitsThisWeek = analyticsRows.filter((r) => !r.value.event && r.value.ts >= since).length;
    const wheelSpinsThisWeek = analyticsRows.filter((r) => r.value.event === 'tuesday_wheel_spin' && r.value.ts >= since).length;
    const newCardsThisWeek = loyaltyRows.filter((r) => (r.value.createdAt || 0) >= since).length;
    const stampsThisWeek = stampRows.filter((r) => r.value.ts >= since).length;
    const fullCardsNow = loyaltyRows.filter((r) => (r.value.stamps || 0) >= 8).length;
    const surveysThisWeek = surveyRows.filter((r) => r.value.ts >= since);
    const avgRating = surveysThisWeek.length
      ? (surveysThisWeek.reduce((s, r) => s + r.value.rating, 0) / surveysThisWeek.length).toFixed(1)
      : null;

    const lines = [
      `👥 ${visitsThisWeek} Besuche`,
      `🎟️ ${newCardsThisWeek} neue Stempelkarten`,
      `🥙 ${stampsThisWeek} Stempel vergeben`,
      `🍕 ${fullCardsNow} Karten warten auf Einlösung`,
    ];
    if (wheelSpinsThisWeek > 0) lines.push(`🎡 ${wheelSpinsThisWeek}x Dienstags-Glücksrad gedreht`);
    if (avgRating) lines.push(`⭐ ${avgRating}/5 (${surveysThisWeek.length} Bewertungen)`);

    const message = lines.join(' · ');

    const response = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Key ${REST_API_KEY}` },
      body: JSON.stringify({
        app_id: 'e2d12bd5-0cd9-4bf7-9ad9-8d3dd258f16f',
        filters: [{ field: 'tag', key: 'owner', relation: '=', value: 'true' }],
        headings: { en: '📊 Dein Wochenrückblick', de: '📊 Dein Wochenrückblick' },
        contents: { en: message, de: message },
        url: 'https://www.bodrumkebapvechta.de',
        chrome_web_icon: 'https://www.bodrumkebapvechta.de/icon-192.png',
      }),
    });
    const data = await response.json();
    return res.status(response.ok ? 200 : response.status).json({ ...data, summary: message });
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
