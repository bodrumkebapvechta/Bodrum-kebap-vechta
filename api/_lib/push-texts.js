// Mehrsprachige Push-Texte.
//
// OneSignal wählt pro Abonnent automatisch die passende Sprache aus
// "headings"/"contents" — anhand der Sprache, die die Website beim Besuch
// setzt (OneSignal.User.setLanguage, siehe App.jsx → Sprache der Website).
//
// WICHTIG zu "en": OneSignal verlangt immer einen "en"-Text und nimmt ihn als
// Rückfall für alle Sprachen ohne eigenen Text. Viele deutsche Kunden haben
// ihr Handy auf Englisch gestellt (ca. ¼ der Besucher) — damit die nicht
// plötzlich englische Nachrichten bekommen, ist "en" bewusst der DEUTSCHE Text.
// Unterstützte eigene Sprachen: de, tr, pl, ro, nl.

const T = {
  montag: {
    title: { de: '🍽️ Mittagsangebot startet gleich!', tr: '🍽️ Öğle menüsü birazdan başlıyor!', pl: '🍽️ Oferta lunchowa zaraz się zaczyna!', ro: '🍽️ Oferta de prânz începe în curând!', nl: '🍽️ Lunchaanbieding begint zo!' },
    body: { de: 'Ab 11:30 Uhr: Mittagsmenü für 9,50 €', tr: "Saat 11:30'dan itibaren: Öğle menüsü 9,50 €", pl: 'Od 11:30: menu lunchowe za 9,50 €', ro: 'De la 11:30: meniul de prânz la 9,50 €', nl: 'Vanaf 11:30 uur: lunchmenu voor 9,50 €' },
  },
  samstag: {
    title: { de: '🎉 Samstag-Angebot ist da!', tr: '🎉 Cumartesi fırsatı başladı!', pl: '🎉 Sobotnia oferta już jest!', ro: '🎉 Oferta de sâmbătă e aici!', nl: '🎉 Zaterdagaanbieding is er!' },
    body: { de: 'Pizza-Kombi & Dönerteller-Kombi — nur heute!', tr: 'Pizza menü & Döner tabağı menü — sadece bugün!', pl: 'Zestaw z pizzą i zestaw z talerzem döner — tylko dziś!', ro: 'Combo pizza și combo farfurie döner — doar azi!', nl: 'Pizza-combi & dönerschotel-combi — alleen vandaag!' },
  },
  dienstag: {
    title: { de: '🥙 Dienstag ist Döner-Tag!', tr: '🥙 Salı döner günü!', pl: '🥙 Wtorek to dzień dönera!', ro: '🥙 Marțea e ziua de döner!', nl: '🥙 Dinsdag is dönerdag!' },
    body: { de: 'Bodrum Kebap nicht vergessen — wir haben heute für dich geöffnet! 😋', tr: "Bodrum Kebap'ı unutma — bugün senin için açığız! 😋", pl: 'Nie zapomnij o Bodrum Kebap — dziś jesteśmy dla Ciebie otwarci! 😋', ro: 'Nu uita de Bodrum Kebap — azi suntem deschiși pentru tine! 😋', nl: 'Vergeet Bodrum Kebap niet — we zijn vandaag voor je open! 😋' },
  },
  birthday: {
    title: { de: '🎂 Alles Gute zum Geburtstag!', tr: '🎂 Doğum günün kutlu olsun!', pl: '🎂 Wszystkiego najlepszego z okazji urodzin!', ro: '🎂 La mulți ani!', nl: '🎂 Gefeliciteerd met je verjaardag!' },
    body: { de: 'Zeig heute deinen Code an der Kasse — eine kleine Überraschung wartet auf dich! 🎉', tr: 'Bugün kasada kodunu göster — seni küçük bir sürpriz bekliyor! 🎉', pl: 'Pokaż dziś swój kod przy kasie — czeka na Ciebie mała niespodzianka! 🎉', ro: 'Arată-ți astăzi codul la casă — te așteaptă o mică surpriză! 🎉', nl: 'Laat vandaag je code zien bij de kassa — er wacht een kleine verrassing op je! 🎉' },
  },
  almostThere: {
    title: { de: '🍕 Nur noch 1 Stempel!', tr: '🍕 Sadece 1 damga kaldı!', pl: '🍕 Jeszcze tylko 1 pieczątka!', ro: '🍕 Încă doar o ștampilă!', nl: '🍕 Nog maar 1 stempel!' },
    body: { de: 'Beim nächsten Besuch gibt es deine Gratis-Pizza!', tr: 'Bir sonraki gelişinde pizzan bizden!', pl: 'Przy następnej wizycie dostaniesz darmową pizzę!', ro: 'La următoarea vizită primești pizza gratuită!', nl: 'Bij je volgende bezoek krijg je je gratis pizza!' },
  },
  reminder: {
    title: { de: '🎟️ Deine Stempelkarte wartet!', tr: '🎟️ Damga kartın seni bekliyor!', pl: '🎟️ Twoja karta z pieczątkami czeka!', ro: '🎟️ Cardul tău cu ștampile te așteaptă!', nl: '🎟️ Je stempelkaart wacht op je!' },
    body: { de: 'Du hast schon {s}/{n} Stempel — komm vorbei und sammle weiter!', tr: 'Şimdiden {s}/{n} damgan var — uğra ve toplamaya devam et!', pl: 'Masz już {s}/{n} pieczątek — wpadnij i zbieraj dalej!', ro: 'Ai deja {s}/{n} ștampile — treci pe la noi și strânge în continuare!', nl: 'Je hebt al {s}/{n} stempels — kom langs en spaar verder!' },
  },
};

function fill(str, vars) {
  return String(str).replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] !== undefined ? String(vars[k]) : ''));
}

function localize(map, vars) {
  const out = {};
  for (const [lang, s] of Object.entries(map)) out[lang] = fill(s, vars);
  out.en = out.de; // Rückfall = Deutsch (siehe oben)
  return out;
}

// Liefert { headings, contents } für OneSignal.
export function pushText(key, vars) {
  const t = T[key];
  if (!t) throw new Error('Unbekannter Push-Text: ' + key);
  return { headings: localize(t.title, vars), contents: localize(t.body, vars) };
}
