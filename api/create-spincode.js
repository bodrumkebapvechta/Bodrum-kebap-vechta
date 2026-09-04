// Vercel Serverless Function — erstellt Glücksrad-Gewinncodes SICHER auf dem
// Server, statt dass der Browser direkt in die Datenbank schreibt.
//
// WARUM DAS WICHTIG IST: Vorher hat der Browser den Gewinncode direkt per
// Supabase-Anfrage mit dem öffentlichen (publishable) Key gespeichert. Da
// dieser Key im Website-Code sichtbar ist, konnte theoretisch jemand mit
// technischem Wissen einen "Gewinn"-Code direkt in der Datenbank erfinden,
// OHNE jemals am Rad zu drehen — z.B. für den größten Preis. Diese Funktion
// schließt diese Lücke: Nur der Server (mit dem geheimen Service-Role-Key,
// der NIE an den Browser weitergegeben wird) darf noch Gewinncodes anlegen.
// Der Browser sagt nur noch "ich habe X gewonnen", und der Server prüft,
// ob X überhaupt ein gültiger, existierender Preis ist, bevor er den Code
// erstellt.

const SUPABASE_URL = 'https://uayewlkcqlgtzmeerhjy.supabase.co';

// Bewusst dieselben Preislisten wie im Frontend (App.jsx: WHEEL_PRIZES und
// TUESDAY_WHEEL_PRIZES) — nur diese Bezeichnungen werden akzeptiert. Wird
// hier ein Preis geändert/hinzugefügt, muss er auch hier ergänzt werden.
const ALLOWED_PRIZES = new Set([
  '10% Rabatt',
  '20% Rabatt',
  'Gratis Getränk',
  'Gratis Pommes',
  'Gratis Nuggets',
  'Gratis Sigara Böreği',
]);

function makeSpinCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prize } = req.body || {};
  if (!prize || !ALLOWED_PRIZES.has(prize)) {
    return res.status(400).json({ error: 'Ungültiger oder unbekannter Preis' });
  }

  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'SUPABASE_SERVICE_ROLE_KEY ist auf dem Server nicht konfiguriert' });
  }

  try {
    let code, exists = true, attempts = 0;
    // Sehr unwahrscheinlich, aber zur Sicherheit: prüft, dass der 4-stellige
    // Code nicht bereits vergeben ist, bevor er gespeichert wird.
    while (exists && attempts < 5) {
      code = makeSpinCode();
      const check = await fetch(
        `${SUPABASE_URL}/rest/v1/kv_store?key=eq.spincode:${code}&select=key`,
        { headers: { apikey: SERVICE_ROLE_KEY, Authorization: `Bearer ${SERVICE_ROLE_KEY}` } }
      );
      const rows = await check.json();
      exists = Array.isArray(rows) && rows.length > 0;
      attempts++;
    }

    const value = { prize, redeemed: false, at: new Date().toISOString() };
    const saveRes = await fetch(`${SUPABASE_URL}/rest/v1/kv_store`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify({ key: `spincode:${code}`, value, updated_at: new Date().toISOString() }),
    });

    if (!saveRes.ok) {
      const errText = await saveRes.text();
      return res.status(500).json({ error: 'Speichern fehlgeschlagen', detail: errText });
    }

    return res.status(200).json({ code, prize });
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
