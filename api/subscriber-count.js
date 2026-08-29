// Vercel Serverless Function — liefert die Anzahl der Push-Abonnenten.
// Der REST API Key bleibt sicher auf dem Server, wird nie an den Browser gesendet.

export default async function handler(req, res) {
  const REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;
  if (!REST_API_KEY) {
    return res.status(500).json({ error: 'ONESIGNAL_REST_API_KEY ist auf dem Server nicht konfiguriert' });
  }

  try {
    const response = await fetch('https://api.onesignal.com/apps/e2d12bd5-0cd9-4bf7-9ad9-8d3dd258f16f', {
      headers: { Authorization: `Key ${REST_API_KEY}` },
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    // messageable_players = Abonnenten, die tatsächlich erreichbar sind
    return res.status(200).json({ count: data.messageable_players ?? 0 });
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
