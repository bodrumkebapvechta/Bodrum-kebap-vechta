// Vercel Serverless Function — beantwortet Fragen, die der einfache
// Keyword-Assistent im Frontend nicht erkannt hat, über die Anthropic API.
// Wird bewusst NUR im Fallback-Fall aufgerufen (nicht bei jeder Nachricht),
// damit die Kosten niedrig bleiben. Der API Key bleibt sicher auf dem Server.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, lang } = req.body || {};
  if (!question || !question.trim()) {
    return res.status(400).json({ error: 'question ist erforderlich' });
  }

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY ist auf dem Server nicht konfiguriert' });
  }

  const langNames = {
    de: 'Deutsch', en: 'Englisch', tr: 'Türkisch', ro: 'Rumänisch',
    nl: 'Niederländisch', sq: 'Albanisch', ku: 'Kurdisch', pl: 'Polnisch',
  };
  const replyLang = langNames[lang] || 'Deutsch';

  const systemPrompt = `Du bist der freundliche Chat-Assistent von "Bodrum Kebap Vechta", einem Döner-/Pizza-Imbiss (nur Abholung, kein Lieferservice) in Vechta, Deutschland.

Fakten, die immer korrekt sein müssen:
- Adresse: Oyther Straße 37, 49377 Vechta
- Telefon: 04441 / 95 16 104, WhatsApp: +49 152 10804759
- Öffnungszeiten: täglich 11:30–22:00 Uhr, DIENSTAG GESCHLOSSEN
- 100% Halal
- Nur Abholung, kein Lieferdienst
- Zahlung: Karte und Bar
- Steak-Gerichte gibt es NUR Freitag, Samstag und Sonntag
- Es gibt KEIN Reis-Gericht auf der Speisekarte
- Kategorien der Speisekarte: Kebap, Pizza, Familienpizza, Pizzabrot & Brötchen, Calzone, Baguette, Kebap überbacken, Rollo überbacken, Nudeln, Schnitzel, Salat, Finger Food, Getränke

Wichtig:
- Du kennst NICHT jeden einzelnen Preis oder jede Zutat auswendig. Wenn nach einem genauen Preis oder einem sehr spezifischen Detail gefragt wird, das du nicht sicher weißt, verweise freundlich auf die Speisekarte auf der Website oder einen Anruf.
- Antworte kurz (1–3 Sätze), freundlich, ohne zu übertreiben.
- Antworte auf ${replyLang}, unabhängig von der Sprache der Frage.
- Wenn die Frage nichts mit dem Restaurant zu tun hat, lenke höflich zurück zum Thema Essen/Restaurant.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: 'user', content: question.trim().slice(0, 500) }],
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    const answer = data?.content?.find((b) => b.type === 'text')?.text || null;
    return res.status(200).json({ answer });
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
