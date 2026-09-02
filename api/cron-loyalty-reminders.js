// Vercel Cron Job — läuft täglich und sendet gezielte Erinnerungs-Pushes an
// Stempelkarten-Inhaber, OHNE zu nerven:
//
// 1) "Fast geschafft"-Push: EINMALIG, sobald jemand 7 von 8 Stempeln hat.
// 2) "Komm doch mal wieder vorbei"-Push: nur wenn seit dem letzten Stempel
//    mindestens 4 Tage vergangen sind, UND seit der letzten Erinnerung
//    ebenfalls mindestens 4 Tage — so kann niemand öfter als alle 4 Tage
//    genervt werden.
// 3) Geburtstags-Push: einmal pro Jahr, mit klarem Angebot (Gratis-Pizza).
//
// Jeder Push geht NUR an das eine Gerät mit dem passenden "loyalty_code"-Tag
// (siehe OneSignal.User.addTag im Frontend), nicht an alle Abonnenten.

const SUPABASE_URL = 'https://uayewlkcqlgtzmeerhjy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dTrkRJ16pFhd2Bp1In-CTQ_jXVnWVcE';
const LOYALTY_TARGET = 8;
const REMINDER_GAP_MS = 4 * 24 * 60 * 60 * 1000; // 4 Tage

async function fetchAllLoyaltyCards() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/kv_store?key=like.loyalty:*&select=key,value&limit=2000`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  if (!res.ok) return [];
  return res.json();
}

async function saveCard(key, value) {
  await fetch(`${SUPABASE_URL}/rest/v1/kv_store`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
  });
}

async function sendToCode(REST_API_KEY, code, title, message) {
  await fetch('https://api.onesignal.com/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Key ${REST_API_KEY}` },
    body: JSON.stringify({
      app_id: 'e2d12bd5-0cd9-4bf7-9ad9-8d3dd258f16f',
      filters: [{ field: 'tag', key: 'loyalty_code', relation: '=', value: code }],
      headings: { en: title, de: title },
      contents: { en: message, de: message },
      url: 'https://www.bodrumkebapvechta.de',
      chrome_web_icon: 'https://www.bodrumkebapvechta.de/icon-192.png',
    }),
  });
}

export default async function handler(req, res) {
  const REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;
  if (!REST_API_KEY) {
    return res.status(500).json({ error: 'ONESIGNAL_REST_API_KEY ist auf dem Server nicht konfiguriert' });
  }

  try {
    const rows = await fetchAllLoyaltyCards();
    const now = Date.now();
    const today = new Date();
    const todayMMDD = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const thisYear = today.getFullYear();
    let almostThereSent = 0, reminderSent = 0, birthdaySent = 0;

    for (const row of rows) {
      const code = row.key.replace('loyalty:', '');
      const card = row.value || {};
      const stamps = card.stamps || 0;

      // 🎂 Geburtstag (unabhängig vom Stempelstand, einmal pro Jahr)
      if (card.birthday === todayMMDD && card.lastBirthdayYear !== thisYear) {
        await sendToCode(REST_API_KEY, code, '🎂 Alles Gute zum Geburtstag!', 'Zeig heute deinen Code an der Kasse — eine Gratis-Pizza wartet auf dich! 🍕🎉');
        await saveCard(row.key, { ...card, lastBirthdayYear: thisYear });
        birthdaySent++;
      }

      if (stamps < 1 || stamps >= LOYALTY_TARGET) continue;

      // 1) Fast geschafft (einmalig bei 7/8)
      if (stamps === LOYALTY_TARGET - 1 && !card.almostThereNotified) {
        await sendToCode(REST_API_KEY, code, '🍕 Nur noch 1 Stempel!', 'Beim nächsten Besuch gibt es deine Gratis-Pizza!');
        await saveCard(row.key, { ...card, almostThereNotified: true });
        almostThereSent++;
        continue; // in derselben Runde nicht zusätzlich die normale Erinnerung schicken
      }

      // 2) Komm-doch-mal-wieder (max. alle 4 Tage)
      const lastStampAt = card.lastStampAt || card.createdAt || 0;
      const lastReminderAt = card.lastReminderAt || 0;
      const daysSinceStamp = now - lastStampAt;
      const daysSinceReminder = now - lastReminderAt;
      if (daysSinceStamp >= REMINDER_GAP_MS && daysSinceReminder >= REMINDER_GAP_MS) {
        await sendToCode(
          REST_API_KEY,
          code,
          '🎟️ Deine Stempelkarte wartet!',
          `Du hast schon ${stamps}/${LOYALTY_TARGET} Stempel — komm vorbei und sammle weiter!`
        );
        await saveCard(row.key, { ...card, lastReminderAt: now });
        reminderSent++;
      }
    }

    return res.status(200).json({ checked: rows.length, almostThereSent, reminderSent, birthdaySent });
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
}
