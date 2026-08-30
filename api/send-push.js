// Vercel Serverless Function — sendet Push-Benachrichtigungen über OneSignal.
// Der REST API Key bleibt hier sicher auf dem Server (Vercel Environment Variable),
// er wird NIE an den Browser/die Website weitergegeben.
//
// Änderung: optionaler Parameter "targetOwner". Wenn NICHT gesetzt, verhält
// sich diese Funktion exakt wie zuvor (sendet an "Total Subscriptions" —
// alle bestehenden Aufrufe wie Ankündigung, neues Produkt, Kampagne, die
// beiden Cron-Jobs usw. sind davon unberührt). Nur wenn targetOwner: true
// mitgeschickt wird, geht die Nachricht stattdessen NUR an das Gerät, das
// beim Personal-Login mit dem Tag "owner" markiert wurde.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, message, url, targetOwner } = req.body || {};
  if (!title || !message) {
    return res.status(400).json({ error: 'title und message sind erforderlich' });
  }

  const REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;
  if (!REST_API_KEY) {
    return res.status(500).json({ error: 'ONESIGNAL_REST_API_KEY ist auf dem Server nicht konfiguriert' });
  }

  try {
    const payload = {
      app_id: 'e2d12bd5-0cd9-4bf7-9ad9-8d3dd258f16f',
      headings: { en: title, de: title },
      contents: { en: message, de: message },
      url: url || 'https://www.bodrumkebapvechta.de',
      chrome_web_icon: 'https://www.bodrumkebapvechta.de/icon-192.png',
      firefox_icon: 'https://www.bodrumkebapvechta.de/icon-192.png',
      chrome_web_badge: 'https://www.bodrumkebapvechta.de/icon-192.png',
    };

    if (targetOwner) {
      payload.filters = [{ field: 'tag', key: 'owner', relation: '=', value: 'true' }];
    } else {
      payload.included_segments = ['Total Subscriptions'];
    }

    const response = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${REST_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
