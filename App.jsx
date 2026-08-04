import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Flame, ArrowLeft, ArrowRight, Check, MessageCircle, ChevronLeft, Plus, Minus,
  ShoppingBag, Users, Gift, RotateCw, Lock, ShieldCheck, Phone, RefreshCw,
  Sparkles, User, Copy, Menu as MenuIcon, X, MapPin, Clock3, Instagram, Star, Timer,
} from 'lucide-react';

/* ============ DESIGN TOKENS ============ */
const GREEN = '#153826';
const ORANGE = '#ff6a1a';
const GOLD = '#ffc738';
const CREAM = '#fff6ea';
const CHILI = '#d62828';
const WHATSAPP_NUMBER = '4915210804759';

/* ============ ASSETS ============ */
const LOGO_ICON = "/logo.png";
const FOOD_HERO = "/hero.jpg";
const FOOD_G1 = "/food-g1.jpg";
const FOOD_G2 = "/food-g2.jpg";
const FOOD_G3 = "/food-g3.jpg";
const FOOD_G4 = "/food-g4.jpg";
const FOOD_G5 = "/food-g5.jpg";
const TERRACE_IMG = "/terrace.jpg";
const DOENER_TELLER_IMG = "/doener-teller.jpg";
const SCHNITZEL_IMG = "/schnitzel.jpg";
const SPAGHETTI_IMG = "/spaghetti.jpg";
const CALZONE_IMG = "/calzone.jpg";
const FALAFEL_IMG = "/falafel.jpg";
const LAHMACUN_IMG = "/lahmacun.jpg";
const PIZZABROETCHEN_IMG = "/pizzabroetchen.jpg";
const PENNE_IMG = "/penne.jpg";
const PIZZA_KAESE_IMG = "/pizza-kaese.jpg";
const DOENER_SPIESS_IMG = "/doner-spiess.jpg";
const SALAT_BUNT_IMG = "/salat-bunt.jpg";
const NUGGETS_IMG = "/nuggets.jpg";
const CHICKEN_STRIPS_IMG = "/chicken-strips.jpg";
const BAUERNSALAT_IMG = "/bauernsalat.jpg";
const POMMES_IMG = "/pommes.jpg";

/* ============ I18N ============ */
const LANGS = ['de', 'en', 'tr', 'ro', 'nl'];
const LANG_NAMES = { de: 'Deutsch', en: 'English', tr: 'Türkçe', ro: 'Română', nl: 'Nederlands' };
const LANG_FLAGS = { de: '🇩🇪', en: '🇬🇧', tr: '🇹🇷', ro: '🇷🇴', nl: '🇳🇱' };

const UI = {
  navExtras: { de: 'Extras', en: 'Extras', tr: 'Ekstralar', ro: 'Extra', nl: 'Extra’s' },
  navMenu: { de: 'Speisekarte', en: 'Menu', tr: 'Menü', ro: 'Meniu', nl: 'Menukaart' },
  navGallery: { de: 'Galerie', en: 'Gallery', tr: 'Galeri', ro: 'Galerie', nl: 'Galerij' },
  navContact: { de: 'Kontakt', en: 'Contact', tr: 'İletişim', ro: 'Contact', nl: 'Contact' },
  navStaff: { de: 'Personal', en: 'Staff', tr: 'Personel', ro: 'Personal', nl: 'Personeel' },
  navStaffArea: { de: 'Personal-Bereich', en: 'Staff Area', tr: 'Personel Alanı', ro: 'Zonă Personal', nl: 'Personeelsgedeelte' },
  orderNow: { de: 'Jetzt bestellen', en: 'Order now', tr: 'Şimdi sipariş ver', ro: 'Comandă acum', nl: 'Nu bestellen' },
  heroHalal: { de: '100% HALAL', en: '100% HALAL', tr: '%100 HELAL', ro: '100% HALAL', nl: '100% HALAL' },
  heroTitle1: { de: 'Frisch vom', en: 'Fresh from the', tr: 'Taze', ro: 'Proaspăt de la', nl: 'Vers van het' },
  heroTitle2: { de: 'Drehspieß', en: 'rotisserie', tr: 'Döner', ro: 'rotisor', nl: 'draaispit' },
  heroSubtitle: { de: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salat — täglich frisch zubereitet in Vechta.', en: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salad — freshly made every day in Vechta.', tr: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salata — Vechta\'da her gün taze hazırlanır.', ro: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salată — preparate proaspăt zilnic în Vechta.', nl: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salade — dagelijks vers bereid in Vechta.' },
  heroCtaWhatsapp: { de: '📱 Per WhatsApp bestellen', en: '📱 Order via WhatsApp', tr: '📱 WhatsApp ile sipariş ver', ro: '📱 Comandă prin WhatsApp', nl: '📱 Bestellen via WhatsApp' },
  heroCtaMore: { de: 'Mehr entdecken', en: 'Discover more', tr: 'Daha fazlasını keşfet', ro: 'Descoperă mai mult', nl: 'Meer ontdekken' },
  heroCtaGroup: { de: 'Gruppenbestellung starten — mit Freunden zusammen bestellen! →', en: 'Start a group order — order together with friends! →', tr: 'Grup siparişi başlat — arkadaşlarınla birlikte sipariş ver! →', ro: 'Începe o comandă de grup — comandă împreună cu prietenii! →', nl: 'Start een groepsbestelling — samen bestellen met vrienden! →' },
  heroOpeningHours: { de: 'Öffnungszeiten', en: 'Opening hours', tr: 'Çalışma saatleri', ro: 'Program', nl: 'Openingstijden' },
  heroClosedDay: { de: 'Ruhetag', en: 'Closed on', tr: 'Kapalı gün', ro: 'Zi de închidere', nl: 'Gesloten dag' },
  heroAddress: { de: 'Adresse', en: 'Address', tr: 'Adres', ro: 'Adresă', nl: 'Adres' },
  extrasKicker: { de: 'UNSERE DIGITALEN EXTRAS', en: 'OUR DIGITAL EXTRAS', tr: 'DİJİTAL EKSTRALARIMIZ', ro: 'EXTRELE NOASTRE DIGITALE', nl: 'ONZE DIGITALE EXTRA’S' },
  extrasTitle: { de: 'Mehr als nur bestellen', en: 'More than just ordering', tr: 'Sadece sipariş vermekten fazlası', ro: 'Mai mult decât o simplă comandă', nl: 'Meer dan alleen bestellen' },
  extrasTip: { de: '🎡 Tipp: Beim Bestellen wartet vor dem Absenden ein Glücksrad mit Gewinnchance!', en: '🎡 Tip: A lucky wheel with a chance to win is waiting before you send your order!', tr: '🎡 İpucu: Sipariş göndermeden önce kazanma şansı olan bir çark seni bekliyor!', ro: '🎡 Sfat: O roată norocoasă cu șansă de câștig te așteaptă înainte de a trimite comanda!', nl: '🎡 Tip: Voor je bestelling verstuurt, wacht een geluksrad met winkans!' },
  featWaTitle: { de: 'WhatsApp Bestellung', en: 'WhatsApp Order', tr: 'WhatsApp Sipariş', ro: 'Comandă WhatsApp', nl: 'WhatsApp Bestelling' },
  featWaSub: { de: 'Menü wählen, direkt zur Abholung senden', en: 'Choose from the menu, send straight for pickup', tr: 'Menüden seç, direkt teslim alma için gönder', ro: 'Alege din meniu, trimite direct pentru ridicare', nl: 'Kies uit het menu, direct versturen om af te halen' },
  featBuilderTitle: { de: 'Baue Döner, Pizza oder Pasta', en: 'Build a Döner, Pizza or Pasta', tr: 'Döner, Pizza veya Pasta Oluştur', ro: 'Construiește Kebap, Pizza sau Pasta', nl: 'Bouw een Döner, Pizza of Pasta' },
  featBuilderSub: { de: 'Ganz nach deinem Geschmack — Schritt für Schritt selbst zusammenstellen', en: 'Exactly to your taste — build it step by step yourself', tr: 'Tamamen kendi zevkine göre — adım adım kendin oluştur', ro: 'Exact după gustul tău — construiește-l pas cu pas', nl: 'Precies naar jouw smaak — stap voor stap zelf samenstellen' },
  builderQuickLabel: { de: 'Döner, Pizza & Pasta selbst bauen', en: 'Build your Döner, Pizza & Pasta', tr: 'Döner, Pizza & Pasta Oluştur', ro: 'Construiește Kebap, Pizza & Pasta', nl: 'Bouw je Döner, Pizza & Pasta' },
  featGroupTitle: { de: 'Gruppenbestellung', en: 'Group Order', tr: 'Grup Siparişi', ro: 'Comandă de grup', nl: 'Groepsbestelling' },
  featGroupSub: { de: 'Mit Freunden zusammen bestellen', en: 'Order together with friends', tr: 'Arkadaşlarınla birlikte sipariş ver', ro: 'Comandă împreună cu prietenii', nl: 'Samen bestellen met vrienden' },
  featLoyaltyTitle: { de: 'Treuekarte', en: 'Loyalty Card', tr: 'Sadakat Kartı', ro: 'Card de fidelitate', nl: 'Spaarkaart' },
  featLoyaltySub: { de: '8 Stempel sammeln, Gratis-Portion sichern', en: 'Collect 8 stamps, get a free item', tr: '8 damga topla, ücretsiz ürün kazan', ro: 'Colectează 8 ștampile, primești gratuit', nl: '8 stempels sparen, gratis item ontvangen' },
  footerImpressum: { de: 'Impressum', en: 'Legal notice', tr: 'Yasal Bilgiler', ro: 'Date companie', nl: 'Colofon' },
  footerDatenschutz: { de: 'Datenschutz', en: 'Privacy', tr: 'Gizlilik', ro: 'Confidențialitate', nl: 'Privacy' },
  galleryTerrace: { de: 'UNSERE TERRASSE', en: 'OUR TERRACE', tr: 'TERASIMIZ', ro: 'TERASA NOASTRĂ', nl: 'ONS TERRAS' },
  galleryTerraceTitle: { de: 'Ein Stück Bodrum in Deutschland', en: 'A piece of Bodrum in Germany', tr: 'Almanya\'da bir parça Bodrum', ro: 'O bucată din Bodrum în Germania', nl: 'Een stukje Bodrum in Duitsland' },
  galleryTerraceSub: { de: 'Gemütlich draußen sitzen & genießen — direkt bei uns in Vechta.', en: 'Sit outside and enjoy — right here in Vechta.', tr: 'Dışarıda rahatça oturup keyif çıkar — Vechta\'da bizde.', ro: 'Stai afară și bucură-te — direct la noi în Vechta.', nl: 'Gezellig buiten zitten & genieten — bij ons in Vechta.' },
  galleryKitchen: { de: 'EIN BLICK IN UNSERE KÜCHE', en: 'A LOOK INTO OUR KITCHEN', tr: 'MUTFAĞIMIZDAN BİR BAKIŞ', ro: 'O PRIVIRE ÎN BUCĂTĂRIA NOASTRĂ', nl: 'EEN KIJKJE IN ONZE KEUKEN' },
  contactKicker: { de: 'BESUCH UNS', en: 'VISIT US', tr: 'BİZİ ZİYARET ET', ro: 'VIZITEAZĂ-NE', nl: 'BEZOEK ONS' },
  contactTitle: { de: 'So findest du uns', en: 'How to find us', tr: 'Bizi nasıl bulursun', ro: 'Cum ne găsești', nl: 'Zo vind je ons' },
  contactRoute: { de: '📍 Route planen', en: '📍 Get directions', tr: '📍 Yol tarifi al', ro: '📍 Planifică traseul', nl: '📍 Route plannen' },
  weiter: { de: 'Weiter →', en: 'Next →', tr: 'İleri →', ro: 'Continuă →', nl: 'Verder →' },
  zurueck: { de: 'Zurück', en: 'Back', tr: 'Geri', ro: 'Înapoi', nl: 'Terug' },
  abbrechen: { de: 'Abbrechen', en: 'Cancel', tr: 'İptal', ro: 'Anulează', nl: 'Annuleren' },
  hinzufuegen: { de: 'Hinzufügen', en: 'Add', tr: 'Ekle', ro: 'Adaugă', nl: 'Toevoegen' },
  toCart: { de: 'Zum Warenkorb', en: 'Add to cart', tr: 'Sepete ekle', ro: 'Adaugă în coș', nl: 'In winkelwagen' },
  gesamt: { de: 'Gesamt', en: 'Total', tr: 'Toplam', ro: 'Total', nl: 'Totaal' },
  waSend: { de: 'Per WhatsApp senden', en: 'Send via WhatsApp', tr: 'WhatsApp ile gönder', ro: 'Trimite prin WhatsApp', nl: 'Versturen via WhatsApp' },
  cartEmpty: { de: 'Dein Warenkorb ist leer.', en: 'Your cart is empty.', tr: 'Sepetin boş.', ro: 'Coșul tău este gol.', nl: 'Je winkelwagen is leeg.' },
  skip: { de: 'Nein danke, überspringen', en: 'No thanks, skip', tr: 'Hayır teşekkürler, geç', ro: 'Nu, mulțumesc, sari peste', nl: 'Nee bedankt, overslaan' },
  yourName: { de: 'Dein Name', en: 'Your name', tr: 'Adın', ro: 'Numele tău', nl: 'Je naam' },
  groupStart: { de: 'Neue Gruppenbestellung starten', en: 'Start a new group order', tr: 'Yeni grup siparişi başlat', ro: 'Începe o comandă de grup nouă', nl: 'Nieuwe groepsbestelling starten' },
  groupJoin: { de: 'Mit Code beitreten', en: 'Join with code', tr: 'Kod ile katıl', ro: 'Alătură-te cu cod', nl: 'Deelnemen met code' },
  groupSubmit: { de: 'Meine Bestellung abschicken', en: 'Submit my order', tr: 'Siparişimi gönder', ro: 'Trimite comanda mea', nl: 'Mijn bestelling versturen' },
  groupSendFinal: { de: 'Gesamtbestellung an WhatsApp senden', en: 'Send full order via WhatsApp', tr: 'Toplam siparişi WhatsApp\'a gönder', ro: 'Trimite comanda totală prin WhatsApp', nl: 'Volledige bestelling versturen via WhatsApp' },
  groupAlreadySent: { de: 'hat die Bestellung bereits gesendet. Du musst nichts weiter tun.', en: 'has already sent the order. You don\'t need to do anything else.', tr: 'siparişi zaten gönderdi. Senin bir şey yapmana gerek yok.', ro: 'a trimis deja comanda. Nu mai trebuie să faci nimic.', nl: 'heeft de bestelling al verstuurd. Je hoeft verder niets te doen.' },
  titleWa: { de: 'WHATSAPP BESTELLUNG', en: 'WHATSAPP ORDER', tr: 'WHATSAPP SİPARİŞ', ro: 'COMANDĂ WHATSAPP', nl: 'WHATSAPP BESTELLING' },
  titleBuilder: { de: 'DEIN DÖNER', en: 'YOUR DÖNER', tr: 'SENİN DÖNERİN', ro: 'KEBAP-UL TĂU', nl: 'JOUW DÖNER' },
  titleGroup: { de: 'GRUPPENBESTELLUNG', en: 'GROUP ORDER', tr: 'GRUP SİPARİŞİ', ro: 'COMANDĂ DE GRUP', nl: 'GROEPSBESTELLING' },
  titleStaff: { de: 'PERSONAL-BEREICH', en: 'STAFF AREA', tr: 'PERSONEL ALANI', ro: 'ZONĂ PERSONAL', nl: 'PERSONEELSGEDEELTE' },
  titleLoyalty: { de: 'TREUEKARTE', en: 'LOYALTY CARD', tr: 'SADAKAT KARTI', ro: 'CARD DE FIDELITATE', nl: 'SPAARKAART' },
  weekendOnlyToday: { de: '🎉 NUR HEUTE — SAMSTAG', en: '🎉 TODAY ONLY — SATURDAY', tr: '🎉 SADECE BUGÜN — CUMARTESİ', ro: '🎉 DOAR ASTĂZI — SÂMBĂTĂ', nl: '🎉 ALLEEN VANDAAG — ZATERDAG' },
  weekendOfferTitle: { de: 'Wochenende-Angebot!', en: 'Weekend Special!', tr: 'Hafta Sonu Fırsatı!', ro: 'Ofertă de Weekend!', nl: 'Weekendaanbieding!' },
  weekendPizzaTitle: { de: '🍕 28cm Pizza + Dose Getränk', en: '🍕 28cm Pizza + Canned Drink', tr: '🍕 28cm Pizza + Kutu İçecek', ro: '🍕 Pizza 28cm + Băutură la doză', nl: '🍕 28cm Pizza + Blikje drinken' },
  weekendPizzaSub: { de: 'Wähle deine Wunschpizza aus unserer ganzen Pizzakarte!', en: 'Choose your favorite pizza from our whole pizza menu!', tr: 'Tüm pizza menümüzden istediğin pizzayı seç!', ro: 'Alege pizza preferată din întreg meniul nostru de pizza!', nl: 'Kies je favoriete pizza uit onze hele pizzakaart!' },
  choosePizza: { de: 'Pizza auswählen →', en: 'Choose pizza →', tr: 'Pizza seç →', ro: 'Alege pizza →', nl: 'Kies pizza →' },
  chooseMeat: { de: 'FLEISCH WÄHLEN:', en: 'CHOOSE MEAT:', tr: 'ET SEÇ:', ro: 'ALEGE CARNEA:', nl: 'KIES VLEES:' },
  included: { de: 'inklusive', en: 'included', tr: 'dahil', ro: 'inclus', nl: 'inbegrepen' },
  addToOrder: { de: 'Zur Bestellung hinzufügen', en: 'Add to order', tr: 'Siparişe ekle', ro: 'Adaugă la comandă', nl: 'Toevoegen aan bestelling' },
  chooseArrow: { de: 'Auswählen →', en: 'Choose →', tr: 'Seç →', ro: 'Alege →', nl: 'Kies →' },
  weekendTeaserOnly: { de: '🎉 Nur Samstag:', en: '🎉 Saturday only:', tr: '🎉 Sadece Cumartesi:', ro: '🎉 Doar sâmbătă:', nl: '🎉 Alleen zaterdag:' },
  lunchOffer: { de: 'MITTAGSANGEBOT · 9,50 €', en: 'LUNCH SPECIAL · €9.50', tr: 'ÖĞLE FIRSATI · 9,50 €', ro: 'OFERTĂ DE PRÂNZ · 9,50 €', nl: 'LUNCHAANBIEDING · € 9,50' },
  lunchOfferInactive: { de: 'Mo.–Fr. 11:30–14:00 Uhr · inkl. Getränk', en: 'Mon–Fri 11:30 AM–2:00 PM · incl. drink', tr: 'Pzt–Cuma 11:30–14:00 · içecek dahil', ro: 'Lun–Vin 11:30–14:00 · include băutură', nl: 'Ma–vr 11:30–14:00 uur · incl. drankje' },
  lunchOfferItems: { de: '28cm Pizza · Salat · Schnitzel · Nudelgericht', en: '28cm Pizza · Salad · Schnitzel · Pasta dish', tr: '28cm Pizza · Salata · Şnitzel · Makarna', ro: 'Pizza 28cm · Salată · Șnițel · Paste', nl: '28cm Pizza · Salade · Schnitzel · Pastagerecht' },
  wheelPrompt: { de: 'Dreh am Glücksrad, bevor du bestellst!', en: 'Spin the lucky wheel before you order!', tr: 'Sipariş vermeden önce şans çarkını çevir!', ro: 'Învârte roata norocului înainte de a comanda!', nl: 'Draai aan het geluksrad voordat je bestelt!' },
  wheelSub: { de: 'Gewinne z. B. 10% Rabatt, ein Gratis-Getränk, Gratis-Pommes oder Chicken Nuggets 🎁', en: 'Win e.g. 10% off, a free drink, free fries or chicken nuggets 🎁', tr: 'Örneğin %10 indirim, ücretsiz içecek, ücretsiz patates veya nugget kazan 🎁', ro: 'Câștigă de ex. 10% reducere, o băutură gratuită, cartofi prăjiți gratuiți sau nuggets 🎁', nl: 'Win bijv. 10% korting, een gratis drankje, gratis friet of chicken nuggets 🎁' },
  showCodeAtCounter: { de: 'Zeig diesen Code an der Kasse:', en: 'Show this code at the counter:', tr: 'Bu kodu kasada göster:', ro: 'Arată acest cod la casă:', nl: 'Toon deze code bij de kassa:' },
  noExtraWin: { de: 'Diesmal kein Extra-Gewinn', en: 'No extra win this time', tr: 'Bu sefer ekstra kazanç yok', ro: 'De data aceasta fără premiu suplimentar', nl: 'Deze keer geen extra prijs' },
  thanksPlaying: { de: 'Aber danke fürs Mitspielen — beim nächsten Mal mehr Glück!', en: 'But thanks for playing — more luck next time!', tr: 'Ama katıldığın için teşekkürler — bir dahaki sefere daha çok şans!', ro: 'Dar îți mulțumim că ai jucat — mai mult noroc data viitoare!', nl: 'Maar bedankt voor het meedoen — volgende keer meer geluk!' },
  spinning: { de: 'Dreht sich…', en: 'Spinning…', tr: 'Dönüyor…', ro: 'Se învârte…', nl: 'Draait…' },
  spinNow: { de: 'Jetzt drehen!', en: 'Spin now!', tr: 'Şimdi çevir!', ro: 'Învârte acum!', nl: 'Draai nu!' },
  closedTodayTitle: { de: 'Heute Ruhetag', en: 'Closed today', tr: 'Bugün kapalı', ro: 'Astăzi închis', nl: 'Vandaag gesloten' },
  closedTodaySub: { de: 'Wir haben dienstags geschlossen — ab morgen wieder ab 11:30 Uhr für dich da!', en: "We're closed on Tuesdays — back for you tomorrow from 11:30 AM!", tr: 'Salı günleri kapalıyız — yarından itibaren 11:30\'dan itibaren yine buradayız!', ro: 'Suntem închiși marțea — revenim mâine de la ora 11:30!', nl: 'Wij zijn dinsdag gesloten — morgen weer open vanaf 11:30 uur!' },
  upsellTitle: { de: 'Möchtest du noch etwas dazu?', en: 'Would you like anything else?', tr: 'Yanında bir şey ister misin?', ro: 'Mai dorești ceva pe lângă?', nl: 'Wil je er nog iets bij?' },
  upsellSub: { de: 'Diese Klassiker passen perfekt zu deiner Bestellung!', en: 'These classics go perfectly with your order!', tr: 'Bu klasikler siparişine mükemmel uyar!', ro: 'Aceste clasice se potrivesc perfect cu comanda ta!', nl: 'Deze klassiekers passen perfect bij je bestelling!' },
  drinksSub: { de: 'Kalt und erfrischend zu deiner Bestellung!', en: 'Cold and refreshing with your order!', tr: 'Siparişine soğuk ve ferahlatıcı bir ek!', ro: 'Rece și răcoritor alături de comanda ta!', nl: 'Lekker fris en koud bij je bestelling!' },
  continueToOrder: { de: 'Weiter zur Bestellung', en: 'Continue to order', tr: 'Siparişe devam et', ro: 'Continuă spre comandă', nl: 'Verder naar bestelling' },
  wheelSpinOnceMsg: { de: 'Dreh einmal — dein Gewinn wird automatisch zur Bestellung hinzugefügt!', en: 'Spin once — your prize will be added to the order automatically!', tr: 'Bir kez çevir — kazandığın ödül otomatik olarak siparişe eklenir!', ro: 'Învârte o dată — premiul tău va fi adăugat automat la comandă!', nl: 'Draai één keer — je prijs wordt automatisch aan de bestelling toegevoegd!' },
  confirmPickupNote: { de: 'Die Abholzeit bestätigen wir euch direkt per WhatsApp-Antwort.', en: "We'll confirm the pickup time directly via WhatsApp reply.", tr: 'Teslim alma saatini WhatsApp üzerinden doğrudan onaylayacağız.', ro: 'Vă confirmăm ora de ridicare direct prin răspuns pe WhatsApp.', nl: 'We bevestigen de ophaaltijd rechtstreeks via WhatsApp.' },
  chooseBase: { de: 'Wähle deine Basis', en: 'Choose your base', tr: 'Bazını seç', ro: 'Alege baza', nl: 'Kies je basis' },
  chooseBaseSub: { de: 'Wie soll dein Döner serviert werden?', en: 'How would you like your Döner served?', tr: 'Dönerin nasıl servis edilsin?', ro: 'Cum dorești să fie servit kebap-ul tău?', nl: 'Hoe wil je je Döner geserveerd hebben?' },
  chooseMeatTitle: { de: 'Wähle dein Lieblingsfleisch.', en: 'Choose your favorite meat.', tr: 'Favori etini seç.', ro: 'Alege carnea preferată.', nl: 'Kies je favoriete vlees.' },
  chooseSauceTitle: { de: 'Welche Soße?', en: 'Which sauce?', tr: 'Hangi sos?', ro: 'Ce sos?', nl: 'Welke saus?' },
  chooseSauceSub: { de: 'Eine Soße aussuchen.', en: 'Pick one sauce.', tr: 'Bir sos seç.', ro: 'Alege un sos.', nl: 'Kies één saus.' },
  chooseExtrasSub: { de: 'So viele du möchtest — optional.', en: 'As many as you like — optional.', tr: 'İstediğin kadar — isteğe bağlı.', ro: 'Câte dorești — opțional.', nl: 'Zoveel als je wilt — optioneel.' },
  doenerReadyTitle: { de: 'Dein Döner ist fertig! 🎉', en: 'Your Döner is ready! 🎉', tr: 'Dönerin hazır! 🎉', ro: 'Kebap-ul tău este gata! 🎉', nl: 'Jouw Döner is klaar! 🎉' },
  doenerReadySub: { de: 'Kurz prüfen und abschicken.', en: 'Quickly check and send.', tr: 'Kısaca kontrol et ve gönder.', ro: 'Verifică rapid și trimite.', nl: 'Snel controleren en versturen.' },
  backToOrder: { de: 'Zurück zur Bestellung', en: 'Back to order', tr: 'Siparişe geri dön', ro: 'Înapoi la comandă', nl: 'Terug naar bestelling' },
  wheelTitle: { de: 'Glücksrad 🎡', en: 'Lucky Wheel 🎡', tr: 'Şans Çarkı 🎡', ro: 'Roata Norocului 🎡', nl: 'Geluksrad 🎡' },
  groupStep1End: { de: 'und erhält einen Code.', en: 'and gets a code.', tr: 've bir kod alır.', ro: 'și primește un cod.', nl: 'en krijgt een code.' },
  groupStep2: { de: 'Diesen Code per WhatsApp mit Freunden teilen.', en: 'Share this code with friends via WhatsApp.', tr: 'Bu kodu WhatsApp üzerinden arkadaşlarınla paylaş.', ro: 'Distribuie acest cod prietenilor prin WhatsApp.', nl: 'Deel deze code met vrienden via WhatsApp.' },
  groupStep3Mid: { de: '„Mit Code beitreten"', en: '"Join with code"', tr: '"Kod ile katıl"', ro: '„Alătură-te cu cod"', nl: '"Deelnemen met code"' },
  groupStep3End: { de: ', gibt den Code ein und wählt seine eigenen Speisen aus.', en: ', enters the code and chooses their own food.', tr: ', kodu girer ve kendi yemeklerini seçer.', ro: ', introduce codul și își alege propriile mâncăruri.', nl: ', voert de code in en kiest zijn eigen gerechten.' },
  groupStep4: { de: 'Am Ende wird alles zu einer gemeinsamen Bestellung zusammengefasst und per WhatsApp an uns geschickt.', en: 'At the end, everything is combined into one shared order and sent to us via WhatsApp.', tr: 'Sonunda her şey ortak bir siparişte birleştirilir ve bize WhatsApp üzerinden gönderilir.', ro: 'La final, totul este combinat într-o singură comandă și ne este trimis prin WhatsApp.', nl: 'Aan het einde wordt alles samengevoegd tot één gezamenlijke bestelling en naar ons verstuurd via WhatsApp.' },
  shareCodeWithGroup: { de: 'Teile diesen Code mit deiner Gruppe:', en: 'Share this code with your group:', tr: 'Bu kodu grubunla paylaş:', ro: 'Distribuie acest cod grupului tău:', nl: 'Deel deze code met je groep:' },
  continueToMyOrder: { de: 'Weiter zu meiner Bestellung', en: 'Continue to my order', tr: 'Siparişime devam et', ro: 'Continuă la comanda mea', nl: 'Verder naar mijn bestelling' },
  continueToMenu: { de: 'Weiter zur Speisekarte', en: 'Continue to the menu', tr: 'Menüye devam et', ro: 'Continuă la meniu', nl: 'Verder naar het menu' },
  orderAdded: { de: '✓ Deine Bestellung wurde hinzugefügt', en: '✓ Your order has been added', tr: '✓ Siparişin eklendi', ro: '✓ Comanda ta a fost adăugată', nl: '✓ Je bestelling is toegevoegd' },
  editMyOrder: { de: '+ Meine Bestellung ändern', en: '+ Edit my order', tr: '+ Siparişimi değiştir', ro: '+ Modifică-mi comanda', nl: '+ Mijn bestelling wijzigen' },
  backToOverview: { de: 'Zurück zur Übersicht', en: 'Back to overview', tr: 'Genel bakışa dön', ro: 'Înapoi la prezentare generală', nl: 'Terug naar overzicht' },
  wheelGrandMsg: { de: 'Dein Gewinn wird automatisch zur Gesamtbestellung hinzugefügt!', en: 'Your prize will be added to the group order automatically!', tr: 'Kazandığın ödül otomatik olarak toplam siparişe eklenir!', ro: 'Premiul tău va fi adăugat automat la comanda totală!', nl: 'Je prijs wordt automatisch toegevoegd aan de totale bestelling!' },
  continueToOverview: { de: 'Weiter zur Übersicht', en: 'Continue to overview', tr: 'Genel bakışa devam et', ro: 'Continuă la prezentarea generală', nl: 'Verder naar overzicht' },
  staffWheelCodeTitle: { de: '🎡 Glücksrad-Code', en: '🎡 Wheel code', tr: '🎡 Çark kodu', ro: '🎡 Cod roată', nl: '🎡 Radcode' },
  codeNotFound: { de: 'Code nicht gefunden.', en: 'Code not found.', tr: 'Kod bulunamadı.', ro: 'Cod negăsit.', nl: 'Code niet gevonden.' },
  redeem: { de: 'Einlösen', en: 'Redeem', tr: 'Kullan', ro: 'Utilizează', nl: 'Inwisselen' },
  confirmRedeem: { de: 'Einlösen bestätigen', en: 'Confirm redemption', tr: 'Kullanımı onayla', ro: 'Confirmă utilizarea', nl: 'Inwisselen bevestigen' },
  loyaltyNoPhone: { de: 'Keine Telefonnummer nötig — deine Karte läuft über einen persönlichen Code.', en: 'No phone number needed — your card works via a personal code.', tr: 'Telefon numarası gerekmez — kartın kişisel bir kodla çalışır.', ro: 'Nu este nevoie de număr de telefon — cardul tău funcționează printr-un cod personal.', nl: 'Geen telefoonnummer nodig — je kaart werkt via een persoonlijke code.' },
  codeDoesntExist: { de: 'Diesen Code gibt es nicht.', en: "This code doesn't exist.", tr: 'Bu kod mevcut değil.', ro: 'Acest cod nu există.', nl: 'Deze code bestaat niet.' },
  showCodeForStamp: { de: 'Zeig deinen Code an der Kasse, damit wir einen Stempel hinzufügen können.', en: 'Show your code at the counter so we can add a stamp.', tr: 'Damga ekleyebilmemiz için kodunu kasada göster.', ro: 'Arată-ți codul la casă pentru a adăuga o ștampilă.', nl: 'Toon je code bij de kassa zodat we een stempel kunnen toevoegen.' },
  dailyRecommendation: { de: 'TAGESEMPFEHLUNG', en: "TODAY'S PICKS", tr: 'GÜNÜN ÖNERİSİ', ro: 'RECOMANDAREA ZILEI', nl: 'AANBEVELING VAN DE DAG' },
  onlyLeft: { de: 'Nur noch', en: 'Only', tr: 'Sadece', ro: 'Doar', nl: 'Nog maar' },
  minutesLeft: { de: 'Minuten!', en: 'minutes left!', tr: 'dakika kaldı!', ro: 'minute rămase!', nl: 'minuten over!' },
  chooseMeatQ: { de: 'Welches Fleisch?', en: 'Which meat?', tr: 'Hangi et?', ro: 'Ce carne?', nl: 'Welk vlees?' },
  extrasQ: { de: 'Extras dazu?', en: 'Extras?', tr: 'Ekstra ister misin?', ro: 'Extra?', nl: 'Extra’s erbij?' },
  rowBasis: { de: 'Basis', en: 'Base', tr: 'Baz', ro: 'Bază', nl: 'Basis' },
  rowMeat: { de: 'Fleisch', en: 'Meat', tr: 'Et', ro: 'Carne', nl: 'Vlees' },
  rowSauce: { de: 'Soße', en: 'Sauce', tr: 'Sos', ro: 'Sos', nl: 'Saus' },
  rowExtras: { de: 'Extras', en: 'Extras', tr: 'Ekstralar', ro: 'Extra', nl: 'Extra’s' },
  rowPrice: { de: 'Preis', en: 'Price', tr: 'Fiyat', ro: 'Preț', nl: 'Prijs' },
  freeLabel: { de: 'gratis', en: 'free', tr: 'ücretsiz', ro: 'gratuit', nl: 'gratis' },
  continueBtn: { de: 'Weiter', en: 'Continue', tr: 'İleri', ro: 'Continuă', nl: 'Verder' },
  wheelThresholdPrefix: { de: '🎡 Noch', en: '🎡 Only', tr: '🎡 Sadece', ro: '🎡 Doar', nl: '🎡 Nog maar' },
  wheelThresholdSuffix: { de: 'bis zum Glücksrad — ab 30,00 € Bestellwert!', en: 'until the lucky wheel — from €30.00 order value!', tr: 'şans çarkına kadar — 30,00 € üzeri siparişte!', ro: 'până la roata norocului — de la o comandă de 30,00 €!', nl: 'tot het geluksrad — vanaf € 30,00 bestelwaarde!' },
  wonPrefix: { de: 'Gewonnen:', en: 'Won:', tr: 'Kazandın:', ro: 'Câștigat:', nl: 'Gewonnen:' },
  wonSuffix: { de: '— wird mitgeschickt', en: '— will be included', tr: '— siparişe eklenecek', ro: '— va fi inclus', nl: '— wordt meegestuurd' },
  groupStartBtn: { de: 'Neue Gruppenbestellung starten', en: 'Start a new group order', tr: 'Yeni grup siparişi başlat', ro: 'Începe o comandă de grup nouă', nl: 'Nieuwe groepsbestelling starten' },
  howItWorks: { de: "👥 So funktioniert's:", en: '👥 How it works:', tr: '👥 Nasıl çalışır:', ro: '👥 Cum funcționează:', nl: '👥 Zo werkt het:' },
  groupStep1Start: { de: 'Eine Person tippt auf', en: 'One person taps', tr: 'Bir kişi', ro: 'O persoană apasă pe', nl: 'Eén persoon tikt op' },
  groupStep3Start: { de: 'Jede/r tippt auf', en: 'Everyone taps', tr: 'Herkes', ro: 'Fiecare apasă pe', nl: 'Iedereen tikt op' },
  groupStep3Btn: { de: '„Mit Code beitreten"', en: '"Join with code"', tr: '"Kod ile katıl"', ro: '„Alătură-te cu cod"', nl: '"Deelnemen met code"' },
  codePlaceholder: { de: 'Code z. B. K7XQ2', en: 'Code e.g. K7XQ2', tr: 'Kod örn. K7XQ2', ro: 'Cod ex. K7XQ2', nl: 'Code bijv. K7XQ2' },
  joinBtn: { de: 'Beitreten', en: 'Join', tr: 'Katıl', ro: 'Alătură-te', nl: 'Deelnemen' },
  peopleOrderedSuffix: { de: 'Personen bestellt', en: 'people ordered', tr: 'kişi sipariş verdi', ro: 'persoane au comandat', nl: 'personen besteld' },
  refreshBtn: { de: 'Aktualisieren', en: 'Refresh', tr: 'Yenile', ro: 'Reîmprospătează', nl: 'Vernieuwen' },
  grandTotalAll: { de: 'Gesamt (alle)', en: 'Total (all)', tr: 'Toplam (hepsi)', ro: 'Total (toți)', nl: 'Totaal (allemaal)' },
  wheelPrizesCountSuffix: { de: 'x Glücksrad-Gewinn wird mitgeschickt', en: 'x wheel prize will be included', tr: 'x çark ödülü siparişe eklenecek', ro: 'x premii de la roată vor fi incluse', nl: 'x radprijs wordt meegestuurd' },
  loginBtn: { de: 'Anmelden', en: 'Log in', tr: 'Giriş yap', ro: 'Autentificare', nl: 'Inloggen' },
  defaultPinNote: { de: 'Standard-PIN: 1234', en: 'Default PIN: 1234', tr: 'Varsayılan PIN: 1234', ro: 'PIN implicit: 1234', nl: 'Standaard-pincode: 1234' },
  loyaltyTabLabel: { de: '🎟️ Treuekarte', en: '🎟️ Loyalty card', tr: '🎟️ Sadakat kartı', ro: '🎟️ Card de fidelitate', nl: '🎟️ Spaarkaart' },
  customerCodePh: { de: 'Kunden-Code', en: 'Customer code', tr: 'Müşteri kodu', ro: 'Cod client', nl: 'Klantcode' },
  searchBtn: { de: 'Suchen', en: 'Search', tr: 'Ara', ro: 'Caută', nl: 'Zoeken' },
  addStampBtn: { de: '+1 Stempel', en: '+1 stamp', tr: '+1 damga', ro: '+1 ștampilă', nl: '+1 stempel' },
  prizeCodePh: { de: 'Gewinn-Code', en: 'Prize code', tr: 'Ödül kodu', ro: 'Cod premiu', nl: 'Prijscode' },
  alreadyRedeemed: { de: 'Bereits eingelöst', en: 'Already redeemed', tr: 'Zaten kullanıldı', ro: 'Deja utilizat', nl: 'Al ingewisseld' },
  validLabel: { de: 'Gültig', en: 'Valid', tr: 'Geçerli', ro: 'Valid', nl: 'Geldig' },
  stampAddedMsg: { de: 'Stempel hinzugefügt ✓', en: 'Stamp added ✓', tr: 'Damga eklendi ✓', ro: 'Ștampilă adăugată ✓', nl: 'Stempel toegevoegd ✓' },
  freePortionRedeemedMsg: { de: 'Gratis-Portion eingelöst ✓', en: 'Free item redeemed ✓', tr: 'Ücretsiz ürün kullanıldı ✓', ro: 'Produs gratuit utilizat ✓', nl: 'Gratis item ingewisseld ✓' },
  redeemedMsg: { de: '✓ Eingelöst', en: '✓ Redeemed', tr: '✓ Kullanıldı', ro: '✓ Utilizat', nl: '✓ Ingewisseld' },
  stampsWord: { de: 'Stempel', en: 'stamps', tr: 'damga', ro: 'ștampile', nl: 'stempels' },
  haveCodeLabel: { de: 'ICH HABE SCHON EINEN CODE', en: 'I ALREADY HAVE A CODE', tr: 'ZATEN BİR KODUM VAR', ro: 'AM DEJA UN COD', nl: 'IK HEB AL EEN CODE' },
  codeExamplePh: { de: 'Z. B. K7XQ2M', en: 'e.g. K7XQ2M', tr: 'Örn. K7XQ2M', ro: 'ex. K7XQ2M', nl: 'bijv. K7XQ2M' },
  showBtn: { de: 'Anzeigen', en: 'Show', tr: 'Göster', ro: 'Afișează', nl: 'Tonen' },
  orLabel: { de: '— oder —', en: '— or —', tr: '— veya —', ro: '— sau —', nl: '— of —' },
  createNewCardBtn: { de: 'Neue Treuekarte erstellen', en: 'Create new loyalty card', tr: 'Yeni sadakat kartı oluştur', ro: 'Creează un card nou de fidelitate', nl: 'Nieuwe spaarkaart aanmaken' },
  screenshotNote: { de: '📸 Bitte den Code notieren oder einen Screenshot machen — er ist dein einziger Zugang zur Karte!', en: '📸 Please note the code or take a screenshot — it\'s your only access to the card!', tr: '📸 Lütfen kodu not al veya ekran görüntüsü al — karta tek erişimin bu!', ro: '📸 Notează codul sau fă o captură de ecran — este singurul tău acces la card!', nl: '📸 Noteer de code of maak een screenshot — het is je enige toegang tot de kaart!' },
  yourCodeLabel: { de: 'DEIN CODE', en: 'YOUR CODE', tr: 'KODUN', ro: 'CODUL TĂU', nl: 'JOUW CODE' },
  freeItemEarned: { de: '🎉 Gratis-Portion verdient!', en: '🎉 Free item earned!', tr: '🎉 Ücretsiz ürün kazandın!', ro: '🎉 Produs gratuit câștigat!', nl: '🎉 Gratis item verdiend!' },
  stampsUntilFreePrefix: { de: 'Noch', en: 'Only', tr: 'Sadece', ro: 'Mai', nl: 'Nog' },
  stampsUntilFreeSuffix: { de: 'Stempel bis zur Gratis-Portion', en: 'stamps until your free item', tr: 'damga kaldı, ücretsiz ürün kazanacaksın', ro: 'ștampile până la produsul gratuit', nl: 'stempels tot je gratis item' },
  noteExampleCheese: { de: 'Anmerkung, z.B. ohne Käse', en: 'Note, e.g. no cheese', tr: 'Not, örn. peynirsiz', ro: 'Observație, ex. fără brânză', nl: 'Opmerking, bijv. zonder kaas' },
  noteExampleOnions: { de: 'Anmerkung, z.B. ohne Zwiebeln', en: 'Note, e.g. no onions', tr: 'Not, örn. soğansız', ro: 'Observație, ex. fără ceapă', nl: 'Opmerking, bijv. zonder uien' },
  noteOptional: { de: 'Anmerkung (optional)', en: 'Note (optional)', tr: 'Not (isteğe bağlı)', ro: 'Observație (opțional)', nl: 'Opmerking (optioneel)' },
  pickupTimePh: { de: 'Gewünschte Abholzeit (optional)', en: 'Desired pickup time (optional)', tr: 'İstenen teslim alma saati (isteğe bağlı)', ro: 'Ora de ridicare dorită (opțional)', nl: 'Gewenste ophaaltijd (optioneel)' },
  pickupTimeLabel: { de: 'Abholzeit', en: 'Pickup time', tr: 'Teslim alma saati', ro: 'Ora de ridicare', nl: 'Ophaaltijd' },
  titlePizzaBuilder: { de: 'DEINE PIZZA', en: 'YOUR PIZZA', tr: 'SENİN PİZZAN', ro: 'PIZZA TA', nl: 'JOUW PIZZA' },
  titlePastaBuilder: { de: 'DEINE PASTA', en: 'YOUR PASTA', tr: 'SENİN MAKARNAN', ro: 'PASTA TA', nl: 'JOUW PASTA' },
  chooseCreationTitle: { de: 'Was möchtest du zusammenstellen?', en: 'What would you like to build?', tr: 'Ne oluşturmak istersin?', ro: 'Ce dorești să creezi?', nl: 'Wat wil je samenstellen?' },
  chooseCreationSub: { de: 'Wähle deine Basis — Schritt für Schritt zu deinem Wunschgericht.', en: 'Choose your base — step by step to your dream dish.', tr: 'Bazını seç — adım adım hayalindeki yemeğe ulaş.', ro: 'Alege baza — pas cu pas spre felul tău preferat.', nl: 'Kies je basis — stap voor stap naar jouw droomgerecht.' },
  buildDoener: { de: 'Baue deinen Döner', en: 'Build your Döner', tr: 'Dönerini Oluştur', ro: 'Construiește-ți Kebap-ul', nl: 'Bouw je Döner' },
  buildPizza: { de: 'Baue deine Pizza', en: 'Build your Pizza', tr: 'Pizzanı Oluştur', ro: 'Construiește-ți Pizza', nl: 'Bouw je Pizza' },
  buildPasta: { de: 'Baue deine Pasta', en: 'Build your Pasta', tr: 'Makarnanı Oluştur', ro: 'Construiește-ți Pasta', nl: 'Bouw je Pasta' },
  choosePizzaSize: { de: 'Wähle deine Größe', en: 'Choose your size', tr: 'Boyutunu seç', ro: 'Alege dimensiunea', nl: 'Kies je formaat' },
  choosePizzaSizeSub: { de: 'Klein oder groß?', en: 'Small or large?', tr: 'Küçük mü büyük mü?', ro: 'Mică sau mare?', nl: 'Klein of groot?' },
  chooseToppingsSub: { de: 'So viele du möchtest — je 1,00 €.', en: 'As many as you like — €1.00 each.', tr: 'İstediğin kadar — her biri 1,00 €.', ro: 'Câte dorești — 1,00 € fiecare.', nl: 'Zoveel als je wilt — elk € 1,00.' },
  pizzaReadyTitle: { de: 'Deine Pizza ist fertig! 🎉', en: 'Your Pizza is ready! 🎉', tr: 'Pizzan hazır! 🎉', ro: 'Pizza ta este gata! 🎉', nl: 'Jouw Pizza is klaar! 🎉' },
  choosePastaStyle: { de: 'Wähle deinen Stil', en: 'Choose your style', tr: 'Stilini seç', ro: 'Alege stilul', nl: 'Kies je stijl' },
  choosePastaStyleSub: { de: 'Jede Pasta wird mit Kurkuma-Penne & Marktsalat serviert.', en: 'Every pasta is served with turmeric penne & market salad.', tr: 'Her makarna zerdeçallı penne ve mevsim salatasıyla servis edilir.', ro: 'Fiecare pastă este servită cu penne cu turmeric și salată de sezon.', nl: 'Elke pasta wordt geserveerd met kurkumapenne & marktsalade.' },
  pastaReadyTitle: { de: 'Deine Pasta ist fertig! 🎉', en: 'Your Pasta is ready! 🎉', tr: 'Makarnan hazır! 🎉', ro: 'Pasta ta este gata! 🎉', nl: 'Jouw Pasta is klaar! 🎉' },
  sizeSmall: { de: 'klein', en: 'small', tr: 'küçük', ro: 'mic', nl: 'klein' },
  sizeLarge: { de: 'groß', en: 'large', tr: 'büyük', ro: 'mare', nl: 'groot' },
  extrasPricePrefix: { de: 'Extras (je', en: 'Extras (each', tr: 'Ekstralar (her biri', ro: 'Extra (fiecare', nl: 'Extra’s (elk' },
  cartTitle: { de: 'Deine Bestellung', en: 'Your order', tr: 'Siparişin', ro: 'Comanda ta', nl: 'Jouw bestelling' },
  drinksTitle: { de: 'Etwas zu trinken?', en: 'Something to drink?', tr: 'İçecek ister misin?', ro: 'Ceva de băut?', nl: 'Iets te drinken?' },
  itemsWord: { de: 'Artikel', en: 'items', tr: 'ürün', ro: 'articole', nl: 'items' },
  orderSentTitle: { de: '✓ Bestellung gesendet!', en: '✓ Order sent!', tr: '✓ Sipariş gönderildi!', ro: '✓ Comandă trimisă!', nl: '✓ Bestelling verstuurd!' },
  orderSentSub: { de: 'Vielen Dank! Wir bereiten deine Bestellung vor.', en: "Thank you! We're preparing your order.", tr: 'Teşekkürler! Siparişini hazırlıyoruz.', ro: 'Mulțumim! Îți pregătim comanda.', nl: 'Bedankt! We bereiden je bestelling voor.' },
  backToHomeBtn: { de: 'Zurück zur Startseite', en: 'Back to homepage', tr: 'Ana sayfaya dön', ro: 'Înapoi la pagina principală', nl: 'Terug naar startpagina' },
  newOrderBtn: { de: 'Neue Bestellung starten', en: 'Start a new order', tr: 'Yeni sipariş oluştur', ro: 'Începe o comandă nouă', nl: 'Nieuwe bestelling starten' },
  installAppBtn: { de: '📲 App installieren', en: '📲 Install app', tr: '📲 Uygulamayı yükle', ro: '📲 Instalează aplicația', nl: '📲 App installeren' },
};

const CATEGORY_IMAGES = {
  kebap: LAHMACUN_IMG,
  pizza: PIZZA_KAESE_IMG,
  calzone: CALZONE_IMG,
  nudeln: PENNE_IMG,
  salat: SALAT_BUNT_IMG,
  finger: CHICKEN_STRIPS_IMG,
};
const CATEGORY_LABELS = {
  kebap: { de: 'Kebap', en: 'Kebap', tr: 'Kebap', ro: 'Kebap', nl: 'Kebap' },
  pizza: { de: 'Pizza', en: 'Pizza', tr: 'Pizza', ro: 'Pizza', nl: 'Pizza' },
  calzone: { de: 'Calzone', en: 'Calzone', tr: 'Calzone', ro: 'Calzone', nl: 'Calzone' },
  baguette: { de: 'Baguette', en: 'Baguette', tr: 'Baget', ro: 'Baghetă', nl: 'Baguette' },
  ueberbacken: { de: 'Kebap überbacken', en: 'Baked Kebap', tr: 'Fırında Kebap', ro: 'Kebap gratinat', nl: 'Kebap gegratineerd' },
  rollo: { de: 'Rollo überbacken', en: 'Baked Rollo', tr: 'Fırında Rollo', ro: 'Rollo gratinat', nl: 'Rollo gegratineerd' },
  nudeln: { de: 'Nudeln', en: 'Pasta', tr: 'Makarna', ro: 'Paste', nl: 'Pasta' },
  schnitzel: { de: 'Schnitzel', en: 'Schnitzel', tr: 'Şnitzel', ro: 'Șnițel', nl: 'Schnitzel' },
  salat: { de: 'Salat', en: 'Salad', tr: 'Salata', ro: 'Salată', nl: 'Salade' },
  finger: { de: 'Finger Food', en: 'Finger Food', tr: 'Atıştırmalık', ro: 'Gustări', nl: 'Fingerfood' },
  getraenke: { de: 'Getränke', en: 'Drinks', tr: 'İçecekler', ro: 'Băuturi', nl: 'Drankjes' },
};
function catLabel(key, lang) { return CATEGORY_LABELS[key]?.[lang] ?? CATEGORY_LABELS[key]?.de ?? key; }

const DAY_NAMES = {
  de: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  tr: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
  ro: ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'],
  nl: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
};

const LangContext = React.createContext({ lang: 'de', t: (k) => UI[k]?.de ?? k, setLang: () => {}, installPrompt: null, onInstall: () => {} });

function useLang() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('bk_lang') || 'de'; } catch { return 'de'; }
  });
  const changeLang = (l) => { setLang(l); try { localStorage.setItem('bk_lang', l); } catch {} };
  const t = (key) => UI[key]?.[lang] ?? UI[key]?.de ?? key;
  return { lang, setLang: changeLang, t };
}

function LanguageSwitcher({ lang, setLang, dark }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold" style={dark ? { background: 'rgba(255,246,234,.1)', color: '#fff' } : { background: '#f0e5cf', color: GREEN }}>
        <span>{LANG_FLAGS[lang]}</span><span className="hidden sm:inline">{LANG_NAMES[lang]}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 py-1.5 rounded-xl shadow-xl z-50 min-w-[150px]" style={{ background: '#fff' }}>
            {LANGS.map((l) => (
              <button key={l} onClick={() => { setLang(l); setOpen(false); }} className="w-full flex items-center gap-2 px-3.5 py-2 text-left text-xs font-bold" style={{ color: l === lang ? ORANGE : GREEN, background: l === lang ? '#fdecd4' : 'transparent' }}>
                <span>{LANG_FLAGS[l]}</span> {LANG_NAMES[l]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ============ MENU TRANSLATIONS (word/phrase-level) ============ */
const MENU_PHRASES = {
  'Hähnchenbrust mit Paprika & Pilzen in Sojasoße': { en: 'Chicken breast with bell pepper & mushrooms in soy sauce', tr: 'Biberli ve mantarlı soya soslu tavuk göğsü', ro: 'Piept de pui cu ardei și ciuperci în sos de soia', nl: 'Kipfilet met paprika & champignons in sojasaus' },
  'Hähnchenbrust in Sahnesoße mit Berg-Thymian': { en: 'Chicken breast in cream sauce with mountain thyme', tr: 'Dağ kekikli kremalı soslu tavuk göğsü', ro: 'Piept de pui în sos de smântână cu cimbru de munte', nl: 'Kipfilet in roomsaus met bergtijm' },
  'Hähnchenbrust mit Pilzen in Curry-Sahnesoße': { en: 'Chicken breast with mushrooms in curry cream sauce', tr: 'Mantarlı köri kremalı soslu tavuk göğsü', ro: 'Piept de pui cu ciuperci în sos de curry cu smântână', nl: 'Kipfilet met champignons in curry-roomsaus' },
  'Hähnchenbrust in Paprika-Auberginen-Soße': { en: 'Chicken breast in bell pepper-eggplant sauce', tr: 'Biberli-patlıcanlı soslu tavuk göğsü', ro: 'Piept de pui în sos de ardei și vinete', nl: 'Kipfilet in paprika-auberginesaus' },
  'Hähnchenbrust mit Pilzen in Sahnesoße': { en: 'Chicken breast with mushrooms in cream sauce', tr: 'Mantarlı kremalı soslu tavuk göğsü', ro: 'Piept de pui cu ciuperci în sos de smântână', nl: 'Kipfilet met champignons in roomsaus' },
  'Extra Portion Fleisch vom Drehspieß': { en: 'Extra portion of rotisserie meat', tr: 'Ekstra porsiyon döner et', ro: 'Porție extra de carne la frigărui rotative', nl: 'Extra portie vlees van het draaispit' },
  'mit türkischer Knoblauchwurst': { en: 'with Turkish garlic sausage', tr: 'Türk sarımsaklı sucuklu', ro: 'cu cârnat turcesc cu usturoi', nl: 'met Turkse knoflookworst' },
  'mit kleinem Beilagensalat': { en: 'with a small side salad', tr: 'küçük yan salata ile', ro: 'cu o salată mică', nl: 'met een kleine bijgerechtsalade' },
  'Pilzen in Curry-Sahnesoße': { en: 'Mushrooms in curry cream sauce', tr: 'Köri kremalı soslu mantar', ro: 'Ciuperci în sos de curry cu smântână', nl: 'Champignons in curry-roomsaus' },
  'Fleisch vom Drehspieß': { en: 'Rotisserie meat', tr: 'Döner et', ro: 'Carne la frigărui rotative', nl: 'Vlees van het draaispit' },
  'Weichkäse in Salzlake': { en: 'Soft cheese in brine', tr: 'Salamura yumuşak peynir', ro: 'Brânză moale în saramură', nl: 'Zachte kaas in pekel' },
  'Apfel-Kirsch-Holunder': { en: 'Apple-cherry-elderberry', tr: 'Elma-kiraz-mürver', ro: 'Măr-cireșe-soc', nl: 'Appel-kers-vlier' },
  'Gratis Dip inklusive': { en: 'Free dip included', tr: 'Ücretsiz sos dahil', ro: 'Sos gratuit inclus', nl: 'Gratis dipsaus inbegrepen' },
  'mit Käse überbacken': { en: 'baked with cheese', tr: 'peynirli fırınlanmış', ro: 'gratinat cu brânză', nl: 'gegratineerd met kaas' },
  'Gebratenes Hähnchen': { en: 'Fried chicken', tr: 'Kızarmış tavuk', ro: 'Pui prăjit', nl: 'Gebakken kip' },
  'Pilzen in Sahnesoße': { en: 'Mushrooms in cream sauce', tr: 'Kremalı soslu mantar', ro: 'Ciuperci în sos de smântână', nl: 'Champignons in roomsaus' },
  'Zigeuner Schnitzel': { en: 'Paprika Schnitzel', tr: 'Biberli Şnitzel', ro: 'Șnițel cu Sos de Ardei', nl: 'Paprika Schnitzel' },
  'Bio-Traubenschorle': { en: 'Organic grape spritzer', tr: 'Organik üzüm sodası', ro: 'Suc de struguri bio cu apă minerală', nl: 'Bio-druivenspuitwater' },
  'Pilzen in Sojasoße': { en: 'Mushrooms in soy sauce', tr: 'Soya soslu mantar', ro: 'Ciuperci în sos de soia', nl: 'Champignons in sojasaus' },
  'Fritiertes Gemüse': { en: 'Fried vegetables', tr: 'Kızarmış sebze', ro: 'Legume prăjite', nl: 'Gefrituurde groenten' },
  'fritiertes Gemüse': { en: 'fried vegetables', tr: 'kızarmış sebze', ro: 'legume prăjite', nl: 'gefrituurde groenten' },
  'Hollandaise Sauce': { en: 'Hollandaise sauce', tr: 'Hollandaise sos', ro: 'Sos hollandaise', nl: 'Hollandaisesaus' },
  'Hollandaise Soße': { en: 'Hollandaise sauce', tr: 'Hollandaise sos', ro: 'Sos hollandaise', nl: 'Hollandaisesaus' },
  'Jäger Schnitzel': { en: 'Hunter\'s Schnitzel', tr: 'Avcı Usulü Şnitzel', ro: 'Șnițel Vânătoresc', nl: 'Jagers Schnitzel' },
  'Türkische Pizza': { en: 'Turkish Pizza', tr: 'Türk Pizzası', ro: 'Pizza Turcească', nl: 'Turkse Pizza' },
  'Frische Tomaten': { en: 'Fresh tomatoes', tr: 'Taze domates', ro: 'Roșii proaspete', nl: 'Verse tomaten' },
  'still/spritzig': { en: 'still/sparkling', tr: 'sade/gazlı', ro: 'plată/acidulată', nl: 'plat/bruisend' },
  'Knoblauchsauce': { en: 'Garlic sauce', tr: 'Sarımsak sos', ro: 'Sos de usturoi', nl: 'Knoflooksaus' },
  'Chicken Strips': { en: 'Chicken strips', tr: 'Tavuk parçaları', ro: 'Fâșii de pui', nl: 'Kipfilet strips' },
  'Pommes Frites': { en: 'French Fries', tr: 'Patates Kızartması', ro: 'Cartofi Prăjiți', nl: 'Friet' },
  'Hähnchenbrust': { en: 'Chicken breast', tr: 'Tavuk göğsü', ro: 'Piept de pui', nl: 'Kipfilet' },
  'Bio-Rhabarber': { en: 'Organic rhubarb', tr: 'Organik ravent', ro: 'Rubarbă bio', nl: 'Bio-rabarber' },
  'Kurkuma-Penne': { en: 'Turmeric penne', tr: 'Zerdeçallı penne', ro: 'Penne cu turmeric', nl: 'Kurkumapenne' },
  'Steak Fleisch': { en: 'Steak meat', tr: 'Biftek et', ro: 'Carne de vită (steak)', nl: 'Steakvlees' },
  'Knoblauchsoße': { en: 'Garlic sauce', tr: 'Sarımsak sos', ro: 'Sos de usturoi', nl: 'Knoflooksaus' },
  'Cocktailsauce': { en: 'Cocktail sauce', tr: 'Kokteyl sos', ro: 'Sos cocktail', nl: 'Cocktailsaus' },
  'Beilagensalat': { en: 'Side salad', tr: 'Yan salata', ro: 'Salată garnitură', nl: 'Bijgerechtsalade' },
  'Meeresfrüchte': { en: 'Seafood', tr: 'Deniz ürünleri', ro: 'Fructe de mare', nl: 'Zeevruchten' },
  'Pizzabrötchen': { en: 'Pizza rolls', tr: 'Pizza topları', ro: 'Chifle pizza', nl: 'Pizzabroodjes' },
  'Kräuterbutter': { en: 'Herb butter', tr: 'Otlu tereyağı', ro: 'Unt cu ierburi', nl: 'Kruidenboter' },
  'Putenschinken': { en: 'Turkey ham', tr: 'Hindi jambonu', ro: 'Șuncă de curcan', nl: 'Kalkoenham' },
  'Berg-Thymian': { en: 'Mountain thyme', tr: 'Dağ kekiği', ro: 'Cimbru de munte', nl: 'Bergtijm' },
  'Grüner Salat': { en: 'Green salad', tr: 'Yeşil salata', ro: 'Salată verde', nl: 'Groene salade' },
  'grüner Salat': { en: 'green salad', tr: 'yeşil salata', ro: 'salată verde', nl: 'groene salade' },
  'Vegetarische': { en: 'Vegetarian', tr: 'Vejetaryen', ro: 'Vegetariană', nl: 'Vegetarische' },
  'Rindersalami': { en: 'Beef salami', tr: 'Dana salam', ro: 'Salam de vită', nl: 'Runderworst' },
  'Zigeunersoße': { en: 'Spicy paprika sauce', tr: 'Acılı biber sosu', ro: 'Sos picant cu ardei', nl: 'Pikante paprikasaus' },
  'Energy Drink': { en: 'Energy drink', tr: 'Enerji içeceği', ro: 'Băutură energizantă', nl: 'Energiedrank' },
  'Vegetarisch': { en: 'Vegetarian', tr: 'Vejetaryen', ro: 'Vegetarian', nl: 'Vegetarisch' },
  'Tomatensoße': { en: 'Tomato sauce', tr: 'Domates sos', ro: 'Sos de roșii', nl: 'Tomatensaus' },
  'Fleischsoße': { en: 'Meat sauce', tr: 'Kıymalı sos', ro: 'Sos de carne', nl: 'Vleessaus' },
  'Bolognese-Soße': { en: 'Bolognese sauce', tr: 'Bolonez sos', ro: 'Sos Bolognese', nl: 'Bolognesesaus' },
  'Baue deine eigene Pizza 🎨': { en: 'Build your own Pizza 🎨', tr: 'Kendi Pizzanı Oluştur 🎨', ro: 'Construiește-ți propria Pizza 🎨', nl: 'Bouw je eigen Pizza 🎨' },
  'Baue deine eigene Pasta 🎨': { en: 'Build your own Pasta 🎨', tr: 'Kendi Makarnanı Oluştur 🎨', ro: 'Construiește-ți propria Pasta 🎨', nl: 'Bouw je eigen Pasta 🎨' },
  'Tomatensoße inklusive — wähle deine Beläge': { en: 'Tomato sauce included — choose your toppings', tr: 'Domates sosu dahil — malzemelerini seç', ro: 'Sos de roșii inclus — alege ingredientele', nl: 'Tomatensaus inbegrepen — kies je toppings' },
  'Soße & Extras frei wählbar': { en: 'Sauce & extras of your choice', tr: 'Sos ve ekstralar serbest seçim', ro: 'Sos și extra la alegere', nl: 'Saus & extra’s vrij te kiezen' },
  'Soße nach Wahl inklusive — wähle deine Extras': { en: 'Choice of sauce included — choose your extras', tr: 'İstediğin sos dahil — ekstralarını seç', ro: 'Sos la alegere inclus — alege extra-urile', nl: 'Saus naar keuze inbegrepen — kies je extra’s' },
  'Deutschland': { en: 'Germany', tr: 'Almanya', ro: 'Germania', nl: 'Duitsland' },
  'Wiener Art': { en: 'Vienna Style', tr: 'Viyana Usulü', ro: 'Stil Vienez', nl: 'Weense Stijl' },
  'Marktsalat': { en: 'Market salad', tr: 'Pazar salatası', ro: 'Salată de sezon', nl: 'Marktsalade' },
  'Rahmpulver': { en: 'Cream powder', tr: 'Krema tozu', ro: 'Praf de smântână', nl: 'Roompoeder' },
  'Mozzarella': { en: 'Mozzarella', tr: 'Mozzarella', ro: 'Mozzarella', nl: 'Mozzarella' },
  'Gorgonzola': { en: 'Gorgonzola', tr: 'Gorgonzola', ro: 'Gorgonzola', nl: 'Gorgonzola' },
  'Mayonnaise': { en: 'Mayonnaise', tr: 'Mayonez', ro: 'Maioneză', nl: 'Mayonaise' },
  'überbacken': { en: 'baked & gratinated', tr: 'fırında gratine', ro: 'gratinat', nl: 'gegratineerd' },
  'Vier Käse': { en: 'Four Cheese', tr: 'Dört Peynirli', ro: 'Patru Brânzeturi', nl: 'Vier Kazen' },
  'Weichkäse': { en: 'Soft cheese', tr: 'Yumuşak peynir', ro: 'Brânză moale', nl: 'Zachte kaas' },
  'Vegetaria': { en: 'Vegetarian', tr: 'Vejetaryen', ro: 'Vegetariană', nl: 'Vegetarisch' },
  'Makkaroni': { en: 'Macaroni', tr: 'Makarna', ro: 'Macaroane', nl: 'Macaroni' },
  'Jägersoße': { en: 'Hunter\'s sauce', tr: 'Avcı sosu', ro: 'Sos vânătoresc', nl: 'Jagersaus' },
  'Lavasbrot': { en: 'Lavash bread', tr: 'Lavaş ekmeği', ro: 'Pâine lavash', nl: 'Lavashbrood' },
  'Pizzabrot': { en: 'Pizza bread', tr: 'Pizza ekmeği', ro: 'Pâine pizza', nl: 'Pizzabrood' },
  'Sahnesoße': { en: 'Cream sauce', tr: 'Kremalı sos', ro: 'Sos de smântână', nl: 'Roomsaus' },
  'Jalapeños': { en: 'Jalapeños', tr: 'Jalapeño biber', ro: 'Jalapeño', nl: 'Jalapeño\'s' },
  'Thunfisch': { en: 'Tuna', tr: 'Ton balığı', ro: 'Ton', nl: 'Tonijn' },
  'Knoblauch': { en: 'Garlic', tr: 'Sarımsak', ro: 'Usturoi', nl: 'Knoflook' },
  'Weißkohl': { en: 'White cabbage', tr: 'Beyaz lahana', ro: 'Varză albă', nl: 'Witte kool' },
  'Pfirsich': { en: 'Peach', tr: 'Şeftali', ro: 'Piersică', nl: 'Perzik' },
  'Hähnchen': { en: 'Chicken', tr: 'Tavuk', ro: 'Pui', nl: 'Kip' },
  'Brokkoli': { en: 'Broccoli', tr: 'Brokoli', ro: 'Broccoli', nl: 'Broccoli' },
  'Peperoni': { en: 'Chili peppers', tr: 'Acı biber', ro: 'Ardei iute', nl: 'Pepperoni' },
  'Zwiebeln': { en: 'Onions', tr: 'Soğan', ro: 'Ceapă', nl: 'Uien' },
  'Schinken': { en: 'Ham', tr: 'Jambon', ro: 'Șuncă', nl: 'Ham' },
  'serviert': { en: 'served', tr: 'servis edilir', ro: 'servit', nl: 'geserveerd' },
  'Krabben': { en: 'Shrimp sticks', tr: 'Krab çubuğu', ro: 'Bastonașe de crab', nl: 'Krabsticks' },
  'Nuggets': { en: 'Nuggets', tr: 'Nugget', ro: 'Nuggets', nl: 'Nuggets' },
  'Portion': { en: 'Portion', tr: 'Porsiyon', ro: 'Porție', nl: 'Portie' },
  'Spezial': { en: 'Special', tr: 'Özel', ro: 'Special', nl: 'Speciaal' },
  'Schwarz': { en: 'Black', tr: 'Siyah', ro: 'Negre', nl: 'Zwart' },
  'Brokoli': { en: 'Broccoli', tr: 'Brokoli', ro: 'Broccoli', nl: 'Broccoli' },
  'Paprika': { en: 'Bell pepper', tr: 'Biber', ro: 'Ardei', nl: 'Paprika' },
  'Tomaten': { en: 'Tomatoes', tr: 'Domates', ro: 'Roșii', nl: 'Tomaten' },
  'Ketchup': { en: 'Ketchup', tr: 'Ketçap', ro: 'Ketchup', nl: 'Ketchup' },
  'Zitrone': { en: 'Lemon', tr: 'Limon', ro: 'Lămâie', nl: 'Citroen' },
  'Extra Fleisch': { en: 'Extra meat', tr: 'Ekstra Et', ro: 'Carne extra', nl: 'Extra vlees' },
  'Fleisch': { en: 'Meat', tr: 'Et', ro: 'Carne', nl: 'Vlees' },
  '5 Stück': { en: '5 pieces', tr: '5 adet', ro: '5 bucăți', nl: '5 stuks' },
  '7 Stück': { en: '7 pieces', tr: '7 adet', ro: '7 bucăți', nl: '7 stuks' },
  '10% Rabatt': { en: '10% off', tr: '%10 indirim', ro: '10% reducere', nl: '10% korting' },
  'Gratis Getränk': { en: 'Free drink', tr: 'Ücretsiz içecek', ro: 'Băutură gratuită', nl: 'Gratis drankje' },
  'Gratis Pommes': { en: 'Free fries', tr: 'Ücretsiz patates', ro: 'Cartofi prăjiți gratuiți', nl: 'Gratis friet' },
  'Gratis Nuggets': { en: 'Free nuggets', tr: 'Ücretsiz nugget', ro: 'Nuggets gratuite', nl: 'Gratis nuggets' },
  'Nochmal Glück!': { en: 'Try again!', tr: 'Tekrar dene!', ro: 'Încearcă din nou!', nl: 'Nog een keer!' },
  'Eistee': { en: 'Iced tea', tr: 'Soğuk çay', ro: 'Ceai rece', nl: 'IJsthee' },
  'Spinat': { en: 'Spinach', tr: 'Ispanak', ro: 'Spanac', nl: 'Spinazie' },
  'Gemüse': { en: 'Vegetable', tr: 'Sebzeli', ro: 'Legume', nl: 'Groente' },
  'Tasche': { en: 'Pocket', tr: 'Cep', ro: 'Buzunar', nl: 'Zak' },
  'Teller': { en: 'Plate', tr: 'Tabak', ro: 'Farfurie', nl: 'Bord' },
  'Türkei': { en: 'Turkey', tr: 'Türkiye', ro: 'Turcia', nl: 'Turkije' },
  'Bauern': { en: 'Farmer\'s', tr: 'Çiftçi', ro: 'Țărănească', nl: 'Boeren' },
  'Oliven': { en: 'Olives', tr: 'Zeytin', ro: 'Măsline', nl: 'Olijven' },
  'Gurken': { en: 'Cucumbers', tr: 'Salatalık', ro: 'Castraveți', nl: 'Komkommer' },
  'Salami': { en: 'Salami', tr: 'Salam', ro: 'Salam', nl: 'Salami' },
  'Ananas': { en: 'Pineapple', tr: 'Ananas', ro: 'Ananas', nl: 'Ananas' },
  'Pilzen': { en: 'Mushrooms', tr: 'Mantar', ro: 'Ciuperci', nl: 'Champignons' },
  'Pommes': { en: 'Fries', tr: 'Patates kızartması', ro: 'Cartofi prăjiți', nl: 'Friet' },
  'Wasser': { en: 'Water', tr: 'Su', ro: 'Apă', nl: 'Water' },
  ' oder ': { en: ' or ', tr: ' veya ', ro: ' sau ', nl: ' of ' },
  'Salat': { en: 'Salad', tr: 'Salata', ro: 'Salată', nl: 'Salade' },
  'Steak': { en: 'Steak', tr: 'Biftek', ro: 'Steak', nl: 'Steak' },
  ' und ': { en: ' and ', tr: ' ve ', ro: ' și ', nl: ' en ' },
  ' mit ': { en: ' with ', tr: ' ile ', ro: ' cu ', nl: ' met ' },
  'Rahm': { en: 'Cream', tr: 'Kremalı', ro: 'Cu smântână', nl: 'Room' },
  'Mais': { en: 'Corn', tr: 'Mısır', ro: 'Porumb', nl: 'Maïs' },
  'Käse': { en: 'Cheese', tr: 'Peynir', ro: 'Brânză', nl: 'Kaas' },
  'Brot': { en: 'Bread', tr: 'Ekmek', ro: 'Pâine', nl: 'Brood' },
  'Dose': { en: 'Can', tr: 'Kutu', ro: 'Doză', nl: 'Blikje' },
  'Ei': { en: 'Egg', tr: 'Yumurta', ro: 'Ou', nl: 'Ei' },
};
const MENU_PHRASE_KEYS = Object.keys(MENU_PHRASES);
const MENU_PHRASE_RE = new RegExp(MENU_PHRASE_KEYS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
function mx(text, lang) {
  if (!text || lang === 'de') return text;
  return text.replace(MENU_PHRASE_RE, (m) => MENU_PHRASES[m]?.[lang] ?? m);
}

/* ============ MENU DATA ============ */
const MENU = [
  { key: 'kebap', label: 'Kebap', items: [
    { id: 'k1', name: 'Kalb Kebap', price: 8.0, desc: 'Fleisch vom Drehspieß, Knoblauchsoße, Salat und Zwiebeln' },
    { id: 'k2', name: 'Kebap Spezial Weichkäse', price: 8.5, desc: 'Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln, Weichkäse in Salzlake' },
    { id: 'k3', name: 'Kebap Hollandaise Soße', price: 8.5, desc: 'Fleisch vom Drehspieß, Hollandaise Soße, Salat, Zwiebeln' },
    { id: 'k4', name: 'Bodrum Gemüse Kebap', price: 9.0, desc: 'Fritiertes Gemüse, Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln' },
    { id: 'k5', name: 'Jumbo Kebap', price: 9.0, desc: 'Extra Portion Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln' },
    { id: 'k6', name: 'Kebap Box', price: 8.0, desc: 'Fleisch vom Drehspieß, Pommes und Knoblauchsoße' },
    { id: 'k7', name: 'Vegetarische Tasche', price: 7.0, desc: 'Brot mit Salat, Knoblauchsoße, Zwiebeln und Weichkäse in Salzlake' },
    { id: 'k8', name: 'Dürüm Kebap', price: 9.0, desc: 'Lavasbrot, Fleisch vom Drehspieß, Salat, Knoblauchsoße und Zwiebeln' },
    { id: 'k9', name: 'Bodrum Gemüse Dürüm Kebap', price: 10.0, desc: 'Lavasbrot, Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln und fritiertes Gemüse' },
    { id: 'k10', name: 'Türkische Pizza Salat (Lahmacun)', price: 8.0, desc: 'Mit Salat, Knoblauchsoße und Zwiebeln' },
    { id: 'k11', name: 'Türkische Pizza Kebap (Lahmacun)', price: 10.0, desc: 'Fleisch vom Drehspieß, Knoblauchsoße, Salat und Zwiebeln' },
    { id: 'k12', name: 'Steak Teller', price: 14.0, desc: 'Steak Fleisch, Salat, Knoblauchsoße, Zwiebeln und Pommes', weekend: true },
    { id: 'k13', name: 'Kebap Teller', price: 12.0, desc: 'Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln und Pommes' },
    { id: 'k14', name: 'Kebap Teller Bodrum', price: 13.0, desc: 'Salat, Knoblauchsoße, Zwiebeln, Weichkäse, Peperoni und Pommes' },
    { id: 'k15', name: 'Kebap Teller Hollandaise Soße', price: 13.0, desc: 'Salat, Zwiebeln, Hollandaise und Pommes' },
    { id: 'k16', name: 'Gemüse Kebap Teller', price: 13.5, desc: 'Fritiertes Gemüse, Salat, Knoblauchsoße, Zwiebeln, Pommes' },
    { id: 'k17', name: 'Falafel Tasche', price: 7.0, desc: 'Mit Salat und Knoblauchsoße' },
    { id: 'k18', name: 'Falafel Tortilla Dürüm', price: 8.0, desc: 'Mit Salat und Knoblauchsoße' },
    { id: 'k19', name: 'Falafel Teller (7 Stück)', price: 10.0, desc: 'Mit Salat und Pommes' },
  ]},
  { key: 'pizza', label: 'Pizza', items: [
    { id: 'custom-pizza', name: 'Baue deine eigene Pizza 🎨', price: 8.0, desc: 'Tomatensoße inklusive — wähle deine Beläge', customPizza: true },
    { id: 'p24', name: 'Pizza Margherita', priceSmall: 7.0, priceLarge: 8.0 },
    { id: 'p25', name: 'Pizza Salami', priceSmall: 8.0, priceLarge: 9.0 },
    { id: 'p26', name: 'Pizza Schinken', priceSmall: 8.0, priceLarge: 9.0 },
    { id: 'p27', name: 'Pizza Kebap', priceSmall: 8.0, priceLarge: 9.0 },
    { id: 'p28', name: 'Pizza Kebap Hollandaise', priceSmall: 9.0, priceLarge: 10.0 },
    { id: 'p29', name: 'Pizza Bodrum', priceSmall: 10.0, priceLarge: 11.0, desc: 'Fleisch vom Drehspieß, Zwiebeln, Jalapeños und Hollandaise Soße' },
    { id: 'p30', name: 'Pizza Rastaa', priceSmall: 10.0, priceLarge: 11.0, desc: 'Fleisch vom Drehspieß, Mais und Peperoni, Hollandaise Soße' },
    { id: 'p31', name: 'Pizza Oldenburger Münsterland', priceSmall: 10.0, priceLarge: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Mais und Hollandaise Soße' },
    { id: 'p32', name: 'Pizza Thunfisch', priceSmall: 9.0, priceLarge: 10.0, desc: 'Mit Zwiebeln' },
    { id: 'p33', name: 'Pizza Steak', priceSmall: 9.0, priceLarge: 10.0, weekend: true },
    { id: 'p34', name: 'Pizza Hawaii', priceSmall: 9.0, priceLarge: 10.0, desc: 'Putenschinken und Ananas' },
    { id: 'p35', name: 'Pizza Türkei', priceSmall: 10.0, priceLarge: 11.0, desc: 'Rindersalami, Putenschinken, Pilzen und Ei' },
    { id: 'p36', name: 'Pizza Sucuk', priceSmall: 8.5, priceLarge: 9.5, desc: 'Mit türkischer Knoblauchwurst' },
    { id: 'p37', name: 'Pizza Spezial', priceSmall: 8.5, priceLarge: 9.5, desc: 'Thunfisch, Putenschinken, Ananas und Pilzen' },
    { id: 'p38', name: 'Pizza Vechta', priceSmall: 10.5, priceLarge: 11.5, desc: 'Fleisch vom Drehspieß, Brokkoli, Zwiebeln, Paprika, Hollandaise Soße, Weichkäse in Salzlake' },
    { id: 'p39', name: 'Pizza Deutschland', priceSmall: 9.5, priceLarge: 10.5, desc: 'Fleisch vom Drehspieß und Paprika' },
    { id: 'p40', name: 'Pizza Spinat', priceSmall: 8.5, priceLarge: 9.5, desc: 'Knoblauch und Weichkäse in Salzlake' },
    { id: 'p41', name: 'Pizza Vegetarisch', priceSmall: 8.0, priceLarge: 9.0, desc: 'Pilzen, Brokkoli, Paprika und Mais' },
    { id: 'p42', name: 'Pizza Mozzarella', priceSmall: 8.5, priceLarge: 9.5, desc: 'Frische Tomaten und Mozzarella' },
    { id: 'p43', name: 'Pizza Taverna', priceSmall: 9.5, priceLarge: 10.5, desc: 'Rindersalami, Putenschinken, Pilzen und Ei' },
    { id: 'p44', name: 'Pizza Krabben', priceSmall: 8.5, priceLarge: 9.5, desc: 'Mit Knoblauch' },
    { id: 'p45', name: 'Pizza Meeresfrüchte', priceSmall: 8.5, priceLarge: 9.5, desc: 'Mit Knoblauch' },
    { id: 'p46', name: 'Pizza QuattroStagioni', priceSmall: 9.5, priceLarge: 10.5, desc: 'Rindersalami, Putenschinken, Pilzen und Paprika' },
    { id: 'p47', name: 'Pizza Vier Käse', priceSmall: 9.0, priceLarge: 10.0, desc: 'Mozzarella, Gorgonzola und Weichkäse' },
    { id: 'p48', name: 'Pizza Bolognese', priceSmall: 8.0, priceLarge: 9.0, desc: 'Mit Fleischsoße' },
    { id: 'p49', name: 'Pizza Brokoli', priceSmall: 8.0, priceLarge: 9.0 },
    { id: 'p52', name: 'Pizza Oythe', priceSmall: 9.5, priceLarge: 10.5, desc: 'Krabben, Putenschinken, Knoblauch' },
    { id: 'p53', name: 'Pizza Italia', priceSmall: 9.5, priceLarge: 10.5, desc: 'Brokkoli, Pilzen, Zwiebeln und Weichkäse in Salzlake' },
    { id: 'p54', name: 'Pizza Fantaria', priceSmall: 10.0, priceLarge: 11.5, desc: 'Rindersalami, Putenschinken, Paprika und Peperoni' },
    { id: 'p56', name: 'Pizzabrot', price: 4.5 },
    { id: 'p57', name: 'Pizzabrot mit Käse', price: 5.5 },
    { id: 'p58', name: 'Pizzabrot mit Knoblauch', price: 5.5 },
    { id: 'p59', name: 'Pizzabrot mit Kräuterbutter', price: 5.5 },
    { id: 'p60', name: 'Pizzabrötchen mit Käse', price: 7.0, desc: 'Gratis Dip inklusive' },
    { id: 'p61', name: 'Pizzabrötchen mit Fleisch', price: 8.0, desc: 'Gratis Dip inklusive' },
    { id: 'p62', name: 'Pizzabrötchen mit Salami', price: 8.0, desc: 'Gratis Dip inklusive' },
    { id: 'p63', name: 'Pizzabrötchen mit Thunfisch', price: 8.0, desc: 'Gratis Dip inklusive' },
  ]},
  { key: 'calzone', label: 'Calzone', items: [
    { id: 'c78', name: 'Calzone Steak', price: 12.0, desc: 'Fleisch vom Drehspieß, Knoblauchsoße, Zwiebeln und Weichkäse', weekend: true },
    { id: 'c79', name: 'Calzone Kebap', price: 10.0, desc: 'Fleisch vom Drehspieß, Knoblauchsoße, Zwiebeln und Weichkäse in Salzlake' },
    { id: 'c80', name: 'Calzone Bodrum Hollandaise', price: 11.0, desc: 'Fleisch vom Drehspieß, Hollandaise Soße, Zwiebeln, Jalapeños und Weichkäse in Salzlake' },
    { id: 'c81', name: 'Calzone Thunfisch', price: 10.0, desc: 'Thunfisch und Zwiebeln' },
    { id: 'c82', name: 'Calzone Vegetarisch', price: 9.5, desc: 'Paprika, Pilzen, Brokoli, Mais und Weichkäse' },
    { id: 'c83', name: 'Calzone Gourmet', price: 10.0, desc: 'Rindersalami, Schinken und Pilzen' },
    { id: 'c84', name: 'Calzone Hawaii', price: 9.5, desc: 'Putenschinken und Ananas' },
  ]},
  { key: 'baguette', label: 'Baguette', items: [
    { id: 'b114', name: 'Baguette Kebap', price: 10.0, desc: 'Fleisch vom Drehspieß, Pilzen, Zwiebeln, Käse, Salat, Tomaten, Gurken' },
    { id: 'b115', name: 'Baguette Bodrum', price: 11.0, desc: 'Fleisch vom Drehspieß, Käse, Hollandaise Soße, Weichkäse in Salzlake, Salat, Tomaten und Gurken' },
    { id: 'b116', name: 'Baguette Salami', price: 9.0, desc: 'Salat, Tomaten, Gurken, Rindersalami und Käse' },
    { id: 'b117', name: 'Baguette Schinken', price: 9.0, desc: 'Salat, Tomaten, Gurken und Käse' },
    { id: 'b118', name: 'Baguette Hawaii', price: 9.0, desc: 'Putenschinken, Ananas, Salat, Tomaten, Gurken' },
    { id: 'b119', name: 'Baguette Thunfisch', price: 9.0, desc: 'Thunfisch, Zwiebeln, Käse, Salat, Tomaten und Gurken' },
    { id: 'b120', name: 'Baguette Vegetarisch', price: 9.0, desc: 'Pilzen, Paprika, Mais, Käse, Salat, Tomaten und Gurken' },
  ]},
  { key: 'ueberbacken', label: 'Kebap überbacken', items: [
    { id: 'u130', name: 'Hähnchen überbacken', price: 11.0, desc: 'Gebratenes Hähnchen, Sahnesoße, Paprika und Pilzen' },
    { id: 'u131', name: 'Kebap überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Zwiebeln und Tomatensoße' },
    { id: 'u132', name: 'Kebap überbacken Bodrum', price: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Pilzen und Sahnesoße' },
    { id: 'u133', name: 'Kebap Hawaii überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Tomatensoße und Ananas' },
    { id: 'u134', name: 'Kebap Spezial überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Tomatensoße, Brokoli, Pilzen und Weichkäse' },
    { id: 'u135', name: 'Kebap Hollandaise überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Tomaten, Paprika und Pilzen' },
    { id: 'u136', name: 'Kebap Vechta überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Mais, Brokoli und Sahnesoße' },
  ]},
  { key: 'rollo', label: 'Rollo überbacken', items: [
    { id: 'r146', name: 'Rollo Steak', price: 12.0, desc: 'Steak Fleisch, Zwiebeln und Knoblauchsoße, mit kleinem Beilagensalat', weekend: true },
    { id: 'r147', name: 'Rollo Kebap', price: 10.0, desc: 'Fleisch vom Drehspieß, Zwiebeln und Knoblauchsoße, mit kleinem Beilagensalat' },
    { id: 'r148', name: 'Rollo Bodrum', price: 11.0, desc: 'Fleisch vom Drehspieß, Zwiebeln und Hollandaise Soße, mit kleinem Beilagensalat' },
    { id: 'r149', name: 'Rollo Thunfisch', price: 10.0, desc: 'Thunfisch und Zwiebeln' },
    { id: 'r150', name: 'Rollo Hawaii', price: 10.0, desc: 'Putenschinken und Ananas' },
    { id: 'r153', name: 'Rollo Spezial', price: 10.0, desc: 'Rindersalami, Putenschinken und Pilzen' },
  ]},
  { key: 'nudeln', label: 'Nudeln', items: [
    { id: 'n157', name: 'Spaghetti Pomodoro', price: 7.5, desc: 'Soße & Extras frei wählbar', customPasta: true },
    { id: 'n158', name: 'Spaghetti Bolognese', price: 8.0, desc: 'Soße & Extras frei wählbar', customPasta: true },
    { id: 'n159', name: 'Spaghetti Carbonara', price: 8.5, desc: 'Soße & Extras frei wählbar', customPasta: true },
    { id: 'n160', name: 'Spaghetti Bodrum', price: 9.0, desc: 'Soße & Extras frei wählbar', customPasta: true },
    { id: 'n161', name: 'Makkaroni Vegetaria', price: 8.5, desc: 'Soße & Extras frei wählbar', customPasta: true },
    { id: 'n162', name: 'Makkaroni Kebap', price: 9.0, desc: 'Soße & Extras frei wählbar', customPasta: true },
    { id: 'n163', name: 'Makkaroni Bodrum', price: 9.0, desc: 'Soße & Extras frei wählbar', customPasta: true },
    { id: 'n164', name: 'Makkaroni Al Forno', price: 9.5, desc: 'Soße & Extras frei wählbar', customPasta: true },
    { id: 'n165', name: 'Alpine Pesto', price: 10.0, desc: 'Hähnchenbrust in Sahnesoße mit Berg-Thymian, serviert mit Kurkuma-Penne & Marktsalat' },
    { id: 'n166', name: 'Curry-Madras', price: 10.0, desc: 'Hähnchenbrust mit Pilzen in Curry-Sahnesoße, serviert mit Kurkuma-Penne & Marktsalat' },
    { id: 'n167', name: 'Fungi di Roma', price: 10.0, desc: 'Hähnchenbrust mit Pilzen in Sahnesoße, serviert mit Kurkuma-Penne & Marktsalat' },
    { id: 'n168', name: 'Balkan Spirit', price: 10.0, desc: 'Hähnchenbrust in Paprika-Auberginen-Soße, serviert mit Kurkuma-Penne & Marktsalat' },
    { id: 'n169', name: 'Soja Salsa', price: 11.0, desc: 'Hähnchenbrust mit Paprika & Pilzen in Sojasoße, serviert mit Kurkuma-Penne & Marktsalat' },
  ]},
  { key: 'schnitzel', label: 'Schnitzel', items: [
    { id: 's184', name: 'Schnitzel Wiener Art', price: 10.0, desc: 'Mit Salat, Pommes' },
    { id: 's185', name: 'Zigeuner Schnitzel', price: 11.0, desc: 'Salat, Zigeunersoße, Pommes' },
    { id: 's186', name: 'Jäger Schnitzel', price: 11.0, desc: 'Salat, Jägersoße, Pommes' },
    { id: 's187', name: 'Brokkoli Schnitzel', price: 11.0, desc: 'Salat, Sahnesoße, Brokkoli, Pommes' },
    { id: 's188', name: 'Hawaii Schnitzel', price: 11.0, desc: 'Salat, Putenschinken, Ananas, Pommes, überbacken mit Käse' },
    { id: 's189', name: 'Gorgonzola Schnitzel', price: 11.0, desc: 'Salat, Sahnesoße, Gorgonzola, Pommes' },
    { id: 's190', name: 'Mozzarella Schnitzel', price: 11.0, desc: 'Frische Tomaten, Mozzarella, Sahnesoße, Pommes, überbacken mit Käse und Salat' },
    { id: 's191', name: 'Rahm Schnitzel', price: 11.0, desc: 'Salat, Pilzen, Rahmpulver, Pommes' },
  ]},
  { key: 'salat', label: 'Salat', items: [
    { id: 'sa95', name: 'Nizza Salat', price: 8.0, desc: 'Grüner Salat, Tomaten, Gurken, Zwiebeln, Weißkohl, Putenschinken und Käse' },
    { id: 'sa96', name: 'Bauern Salat', price: 7.0, desc: 'Grüner Salat, Tomaten, Gurken und Weichkäse' },
    { id: 'sa97', name: 'Thunfisch Salat', price: 8.0, desc: 'Grüner Salat, Tomaten, Gurken, Weißkohl, Thunfisch und Zwiebeln' },
    { id: 'sa98', name: 'Mais Salat', price: 7.0, desc: 'Grüner Salat, Tomaten, Gurken, Weißkohl, Zwiebeln und Mais' },
    { id: 'sa100', name: 'Mozzarella Salat', price: 8.0, desc: 'Grüner Salat, Tomaten und Mozzarella' },
    { id: 'sa101', name: 'Bodrum Salat', price: 9.5, desc: 'Grüner Salat, Tomaten, Gurken, Zwiebeln, Mais, Weißkohl, Thunfisch, Putenschinken, Paprika und Weichkäse in Salzlake' },
    { id: 'sa102', name: 'Kebap Salat', price: 9.0, desc: 'Fleisch vom Drehspieß, grüner Salat, Tomaten, Gurken, Zwiebeln und Weißkohl' },
    { id: 'sa104', name: 'Hähnchen Salat', price: 9.0, desc: 'Gebratenes Hähnchen, grüner Salat, Tomaten, Gurken, Zwiebeln und Weißkohl' },
  ]},
  { key: 'finger', label: 'Finger Food', items: [
    { id: 'f201', name: 'Chicken Strips (5 Stück)', price: 5.0, desc: '5 Stück' },
    { id: 'f202', name: 'Nuggets (7 Stück)', price: 5.0, desc: '7 Stück' },
    { id: 'f203', name: 'Pommes Frites', price: 3.5 },
    { id: 'f204a', name: 'Portion Knoblauchsauce', price: 2.0 },
    { id: 'f204b', name: 'Portion Cocktailsauce', price: 2.0 },
    { id: 'f204c', name: 'Portion Ketchup', price: 1.0 },
    { id: 'f204d', name: 'Portion Mayonnaise', price: 1.0 },
    { id: 'f204e', name: 'Portion Hollandaise Sauce', price: 2.5 },
    { id: 'f205', name: 'Portion Oliven (Schwarz)', price: 2.0 },
    { id: 'f206', name: 'Portion Peperoni', price: 2.5 },
    { id: 'f207', name: 'Portion Beilagensalat / Weißkohl', price: 3.5 },
    { id: 'f208', name: 'Portion Fleisch', price: 8.0 },
  ]},
  { key: 'getraenke', label: 'Getränke', items: [
    { id: 'g301', name: 'Coca-Cola (Dose)', price: 2.5 },
    { id: 'g302', name: 'Coca-Cola Zero (Dose)', price: 2.5 },
    { id: 'g303', name: 'Fanta (Dose)', price: 2.5 },
    { id: 'g304', name: 'Uludağ Gazoz (Dose)', price: 2.5 },
    { id: 'g305', name: 'Ayran', price: 2.0 },
    { id: 'g306', name: 'Wasser (still/spritzig)', price: 2.0 },
    { id: 'g307', name: 'Eistee Pfirsich (Dose)', price: 2.5 },
    { id: 'g308', name: 'Fritz-Kola', price: 3.0 },
    { id: 'g309', name: 'Fritz-Limo', price: 3.0, desc: 'Zitrone oder Apfel-Kirsch-Holunder' },
    { id: 'g310', name: 'Fritz-Spritz', price: 3.0, desc: 'Bio-Rhabarber oder Bio-Traubenschorle' },
    { id: 'g311', name: 'Vita Malz', price: 3.0 },
    { id: 'g312', name: 'Energy Drink', price: 3.0 },
  ]},
];
const EXTRA_TOPPINGS = ['Mais', 'Zwiebeln', 'Ananas', 'Peperoni', 'Paprika', 'Brokkoli', 'Pilzen', 'Sucuk', 'Extra Fleisch'];
const PASTA_TOPPINGS = ['Tomatensoße', 'Sahnesoße', 'Bolognese-Soße', 'Käse', 'Extra Fleisch', 'Peperoni', 'Pilzen'];

/* ============ HELPERS ============ */
function fmt(n) { return n.toFixed(2).replace('.', ',') + ' €'; }
function menuNum(id) { if (/^g\d/.test(id)) return ''; return id.replace(/^[a-z]+/i, ''); }
function normalizePhone(raw) { return raw.replace(/[^\d+]/g, ''); }
function todayKey() { return new Date().toISOString().slice(0, 10); }
const SUPABASE_URL = 'https://uayewlkcqlgtzmeerhjy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dTrkRJ16pFhd2Bp1In-CTQ_jXVnWVcE';

async function safeGet(key) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/kv_store?key=eq.${encodeURIComponent(key)}&select=value`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) return null;
    const rows = await res.json();
    return rows.length ? rows[0].value : null;
  } catch { return null; }
}
async function safeSet(key, value) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/kv_store`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
    });
    return res.ok;
  } catch { return false; }
}

/* ============ WHEEL DATA ============ */
const WHEEL_PRIZES = [
  { label: '10% Rabatt', weight: 13, color: GREEN, text: '#fff' },
  { label: 'Nochmal Glück!', weight: 20, color: '#e8d9b8', text: GREEN },
  { label: 'Gratis Getränk', weight: 15, color: ORANGE, text: '#fff' },
  { label: 'Gratis Pommes', weight: 15, color: GREEN, text: '#fff' },
  { label: 'Nochmal Glück!', weight: 20, color: '#e8d9b8', text: GREEN },
  { label: 'Gratis Nuggets', weight: 12, color: ORANGE, text: '#fff' },
  { label: '10% Rabatt', weight: 5, color: GOLD, text: GREEN },
];
const WHEEL_N = WHEEL_PRIZES.length;
const WHEEL_SLICE = 360 / WHEEL_N;
function pickWheelPrize() {
  const total = WHEEL_PRIZES.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * total;
  for (let i = 0; i < WHEEL_PRIZES.length; i++) { r -= WHEEL_PRIZES[i].weight; if (r <= 0) return i; }
  return 0;
}
function makeSpinCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = ''; for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
function wheelConicGradient() {
  return `conic-gradient(${WHEEL_PRIZES.map((p, i) => `${p.color} ${i * WHEEL_SLICE}deg ${(i + 1) * WHEEL_SLICE}deg`).join(',')})`;
}

/* ============ SHARED UI ============ */
function TopBar({ onHome, title, dark = true }) {
  return (
    <div className="flex items-center gap-3 px-5 pt-6 pb-4">
      <button onClick={onHome} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: dark ? 'rgba(255,246,234,0.12)' : '#f0e5cf' }}>
        <ArrowLeft size={18} color={dark ? CREAM : GREEN} />
      </button>
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ORANGE }}>
          <Flame size={18} color="#fff" />
        </div>
        <div>
          <div className="font-extrabold text-sm leading-tight tracking-wide" style={{ color: dark ? '#fff' : GREEN }}>BODRUM KEBAP</div>
          <div className="text-[10px] font-semibold tracking-[0.2em]" style={{ color: GOLD }}>{title}</div>
        </div>
      </div>
    </div>
  );
}
function Stepper({ qty, onAdd, onRemove }) {
  return (
    <div className="flex items-center gap-2.5 flex-shrink-0">
      {qty > 0 && (
        <>
          <button onClick={onRemove} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#f0e5cf', color: GREEN }}><Minus size={14} /></button>
          <span className="text-sm font-bold w-4 text-center" style={{ color: GREEN }}>{qty}</span>
        </>
      )}
      <button onClick={onAdd} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}><Plus size={14} /></button>
    </div>
  );
}
function QtyRow({ label, qty, onAdd, onRemove }) {
  return (
    <div className="flex-1 flex items-center justify-between px-2.5 py-2 rounded-lg" style={{ background: '#f7f0e2' }}>
      <span className="text-[11px] font-semibold" style={{ color: '#7c6d55' }}>{label}</span>
      <Stepper qty={qty} onAdd={onAdd} onRemove={onRemove} />
    </div>
  );
}

const CATEGORY_ICONS = {
  kebap: '🥙', pizza: '🍕', calzone: '🥟', baguette: '🥖', ueberbacken: '🧀',
  rollo: '🌯', nudeln: '🍝', schnitzel: '🍗', salat: '🥗', finger: '🍟', getraenke: '🥤',
};

const UPSELL_FOOD = [
  { id: 'f203', name: 'Pommes Frites', price: 3.5, emoji: '🍟' },
  { id: 'f202', name: 'Nuggets (7 Stück)', price: 5.0, emoji: '🍗' },
  { id: 'f201', name: 'Chicken Strips (5 Stück)', price: 5.0, emoji: '🍤' },
  { id: 'f204a', name: 'Knoblauchsauce', price: 2.0, emoji: '🥫' },
  { id: 'f204b', name: 'Cocktailsauce', price: 2.0, emoji: '🥫' },
  { id: 'f204c', name: 'Ketchup', price: 1.0, emoji: '🍅' },
  { id: 'f204d', name: 'Mayonnaise', price: 1.0, emoji: '🥫' },
  { id: 'f204e', name: 'Hollandaise Sauce', price: 2.5, emoji: '🧈' },
];
const UPSELL_DRINKS = (MENU.find((m) => m.key === 'getraenke')?.items || []).map((d) => ({ id: d.id, name: d.name, price: d.price, emoji: '🥤' }));
const UPSELL_ITEMS = [...UPSELL_FOOD, ...UPSELL_DRINKS];

function UpsellStrip({ addItem }) {
  return (
    <div className="mx-5 mt-1 mb-3 rounded-xl overflow-hidden" style={{ background: '#fdecd4', border: '1px solid #f0d4a8' }}>
      <div className="px-3.5 pt-2.5 text-[11px] font-black tracking-wide" style={{ color: '#8a5a1f' }}>🔥 DAZU PASST PERFEKT — nicht vergessen!</div>
      <div className="flex gap-2 overflow-x-auto px-3.5 pb-3 pt-1.5">
        {UPSELL_ITEMS.map((u) => (
          <button
            key={u.id}
            onClick={() => addItem(u.id, u.name, u.price)}
            className="flex-none flex items-center gap-2 pl-2 pr-3 py-2 rounded-full"
            style={{ background: '#fff', border: '1px solid #f0d4a8' }}
          >
            <span className="text-lg">{u.emoji}</span>
            <span className="text-xs font-bold" style={{ color: GREEN }}>{u.name}</span>
            <span className="text-xs font-black" style={{ color: ORANGE }}>+{fmt(u.price)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
function WheelPromoBanner({ onClick }) {
  const { t } = React.useContext(LangContext);
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl p-4 flex items-center gap-3.5 text-left relative overflow-hidden"
      style={{ background: `linear-gradient(120deg, ${CHILI}, ${ORANGE})`, animation: 'wheelBannerGlow 2s ease-out infinite' }}
    >
      <style>{`
        @keyframes wheelBannerGlow { 0%,100%{ box-shadow:0 0 0 0 rgba(255,106,26,.5);} 50%{ box-shadow:0 0 0 10px rgba(255,106,26,0);} }
        @keyframes wheelSpin360 { from{ transform:rotate(0deg);} to{ transform:rotate(360deg);} }
      `}</style>
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(255,255,255,.22)', animation: 'wheelSpin360 4s linear infinite' }}>🎡</div>
      <div className="flex-1">
        <div className="text-white font-black text-sm leading-tight">{t('wheelPrompt')}</div>
        <div className="text-[11.5px] font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,.9)' }}>{t('wheelSub')}</div>
      </div>
      <ArrowRight size={18} color="#fff" />
    </button>
  );
}
function EmojiConfetti({ emojis = ['🎉', '🥙', '🍕', '⭐', '🎊'] }) {
  const items = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    emoji: emojis[i % emojis.length],
    left: Math.random() * 100,
    delay: Math.random() * 1.3,
    duration: 2.6 + Math.random() * 1.8,
    size: 16 + Math.random() * 16,
    spin: 360 + Math.random() * 360,
  })), []);
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 100 }}>
      {items.map((it, i) => (
        <span key={i} style={{ position: 'absolute', left: `${it.left}%`, top: '-28px', fontSize: it.size, animation: `confettiFall ${it.duration}s cubic-bezier(.25,.1,.4,1) ${it.delay}s forwards`, '--spin': `${it.spin}deg` }}>{it.emoji}</span>
      ))}
    </div>
  );
}

function WheelWidget({ onWin, compact }) {
  const { lang, t } = React.useContext(LangContext);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const size = compact ? 240 : 280;

  const spin = () => {
    if (spinning || result) return;
    setSpinning(true);
    const idx = pickWheelPrize();
    const center = idx * WHEEL_SLICE + WHEEL_SLICE / 2;
    setRotation(5 * 360 + (360 - center));
    setTimeout(async () => {
      const prize = WHEEL_PRIZES[idx];
      const isReal = prize.label !== 'Nochmal Glück!';
      let res;
      if (isReal) {
        const code = makeSpinCode();
        await safeSet(`spincode:${code}`, { prize: prize.label, redeemed: false, at: new Date().toISOString() });
        res = { prize: prize.label, code };
      } else {
        res = { prize: prize.label, code: null };
      }
      setResult(res);
      setSpinning(false);
      onWin && onWin(res);
    }, 4200);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: -12, width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `18px solid ${GOLD}`, zIndex: 10 }} />
        <div className="rounded-full relative" style={{
          width: size, height: size, background: wheelConicGradient(), border: `6px solid ${GOLD}`,
          transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 4.2s cubic-bezier(0.17,0.67,0.16,0.99)' : 'none',
        }}>
          {WHEEL_PRIZES.map((p, i) => {
            const angle = i * WHEEL_SLICE + WHEEL_SLICE / 2;
            return (
              <div key={i} className="absolute left-1/2 top-1/2 origin-left text-center" style={{ width: size * 0.4, transform: `rotate(${angle - 90}deg) translateX(14px)` }}>
                <span className="block font-black leading-[1.15]" style={{ color: p.text, fontSize: 13, transform: 'translateY(-6px)' }}>{mx(p.label, lang)}</span>
              </div>
            );
          })}
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center" style={{ width: 50, height: 50, background: '#fff', border: `4px solid ${GOLD}` }}>
          <Flame size={20} color={ORANGE} />
        </div>
      </div>
      {!result && (
        <button onClick={spin} disabled={spinning} className="mt-7 w-full py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-60" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>
          <RotateCw size={17} /> {spinning ? t('spinning') : t('spinNow')}
        </button>
      )}
      {result && (
        <div className="mt-7 w-full bg-white rounded-2xl p-5 text-center shadow-sm" style={{ borderTop: `4px solid ${ORANGE}` }}>
          {result.code ? (
            <>
              <div className="text-2xl mb-1">🎉</div>
              <div className="font-black text-base mb-1" style={{ color: GREEN }}>{mx(result.prize, lang)}</div>
              <div className="text-xs font-medium mb-3" style={{ color: '#7c6d55' }}>{t('showCodeAtCounter')}</div>
              <div className="text-xl font-black tracking-[0.25em] py-2.5 rounded-xl" style={{ background: '#f7f0e2', color: GREEN }}>{result.code}</div>
            </>
          ) : (
            <>
              <div className="text-2xl mb-1">🍀</div>
              <div className="font-black text-base" style={{ color: GREEN }}>{t('noExtraWin')}</div>
              <div className="text-xs font-medium mt-1" style={{ color: '#7c6d55' }}>{t('thanksPlaying')}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ============ SPLASH ============ */
function SplashScreen({ onDone }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 120);
    const t2 = setTimeout(() => setStage(2), 700);
    const t3 = setTimeout(() => setStage(3), 1300);
    const t4 = setTimeout(() => onDone(), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center" style={{ background: GREEN }} onClick={onDone}>
      <style>{`
        @keyframes popIn { 0%{ transform:scale(.4) rotate(-15deg); opacity:0; } 60%{ transform:scale(1.08) rotate(4deg); opacity:1; } 100%{ transform:scale(1) rotate(0deg); opacity:1; } }
        @keyframes riseFade { 0%{ transform:translateY(16px); opacity:0; } 100%{ transform:translateY(0); opacity:1; } }
        @keyframes glowPulse { 0%,100%{ box-shadow:0 0 0 0 rgba(255,199,56,.45);} 50%{ box-shadow:0 0 0 22px rgba(255,199,56,0);} }
        @keyframes spinSlow { from{ transform:rotate(0deg);} to{ transform:rotate(360deg);} }
        @keyframes shimmerBar { 0%{ background-position:-200px 0;} 100%{ background-position:200px 0;} }
      `}</style>
      <div className="flex flex-col items-center px-8 text-center">
        <div
          className="rounded-full flex items-center justify-center mb-6 relative"
          style={{
            width: 108, height: 108, background: CREAM,
            animation: stage >= 1 ? 'popIn .7s cubic-bezier(.34,1.56,.64,1) forwards, glowPulse 2.4s ease-out 0.7s infinite' : 'none',
            opacity: stage >= 1 ? 1 : 0,
          }}
        >
          <img src={LOGO_ICON} alt="logo" style={{ width: 78, height: 78, objectFit: 'contain' }} />
        </div>
        <div style={{ opacity: stage >= 2 ? 1 : 0, animation: stage >= 2 ? 'riseFade .6s ease forwards' : 'none' }}>
          <div className="text-white font-black text-2xl tracking-wide">BODRUM KEBAP</div>
          <div className="font-bold text-sm tracking-[4px] mt-1" style={{ color: GOLD }}>VECHTA</div>
        </div>
        <div
          className="mt-6 h-[3px] w-40 rounded-full overflow-hidden"
          style={{
            opacity: stage >= 3 ? 1 : 0, transition: 'opacity .4s ease',
            background: 'linear-gradient(90deg, transparent, rgba(255,199,56,.15), transparent), #2b5c41',
            backgroundSize: '200px 100%, 100% 100%',
            animation: stage >= 3 ? 'shimmerBar 1.1s linear infinite' : 'none',
          }}
        />
        <div className="mt-4 text-xs font-semibold" style={{ color: '#a49475', opacity: stage >= 3 ? 1 : 0, transition: 'opacity .5s ease' }}>
          Frisch vom Drehspieß …
        </div>
      </div>
    </div>
  );
}

/* ============ HOME ============ */
function FeatureCard({ icon, title, sub, color, textColor = '#fff', onClick, index = 0 }) {
  return (
    <button
      onClick={onClick}
      className="feature-card text-left rounded-2xl p-6 flex flex-col gap-3"
      style={{
        background: color, boxShadow: '0 10px 30px rgba(21,56,38,.14)',
        animation: `cardIn .6s cubic-bezier(.22,1,.36,1) ${index * 0.12}s both`,
      }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl icon-wobble" style={{ background: 'rgba(255,255,255,0.2)' }}>{icon}</div>
      <div>
        <div className="font-black text-lg leading-tight" style={{ color: textColor }}>{title}</div>
        <div className="text-sm font-medium mt-1" style={{ color: textColor, opacity: 0.85 }}>{sub}</div>
      </div>
      <div className="flex items-center gap-1.5 text-sm font-bold mt-1" style={{ color: textColor }}>Los geht's <ArrowRight size={15} /></div>
    </button>
  );
}

const REVIEWS = [
  { text: 'Günstig und richtig leckeres Essen. Bestellung ging schnell.', name: 'Google-Bewertung' },
  { text: 'Wirklich gutes Essen, schneller Service und tolle Atmosphäre.', name: 'Google-Bewertung' },
  { text: 'Immer wieder gerne – top Qualität und freundliches Team!', name: 'Google-Bewertung' },
  { text: 'Bester Döner in Vechta, immer frisch und lecker zubereitet.', name: 'Google-Bewertung' },
  { text: 'Sehr freundliches Personal und großzügige Portionen.', name: 'Google-Bewertung' },
  { text: 'Die Pizza ist der Hammer, kommt man immer wieder gerne her.', name: 'Google-Bewertung' },
  { text: 'Sauberer Laden, schnelle Zubereitung, klare Empfehlung!', name: 'Google-Bewertung' },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-10 py-12">
      <div className="rounded-2xl p-8 sm:p-10 text-center" style={{ background: '#fff', boxShadow: '0 10px 30px rgba(21,56,38,.1)' }}>
        <div className="flex items-center justify-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={19} fill={GOLD} color={GOLD} />))}
        </div>
        <div className="font-black text-sm mb-6" style={{ color: GREEN }}>4,6 · 293 Google-Bewertungen</div>
        <p className="text-lg sm:text-xl font-semibold mb-4" style={{ color: '#4a4032', minHeight: 64 }}>„{REVIEWS[idx].text}"</p>
        <div className="text-xs font-bold tracking-wide" style={{ color: '#a4906c' }}>— {REVIEWS[idx].name}</div>
        <div className="flex justify-center gap-2 mt-6">
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className="w-2 h-2 rounded-full" style={{ background: i === idx ? ORANGE : '#e3d5bd' }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LunchCountdown() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const day = now.getDay();
  const isWeekday = day >= 1 && day <= 5;
  const start = new Date(now); start.setHours(11, 30, 0, 0);
  const end = new Date(now); end.setHours(14, 0, 0, 0);
  const active = isWeekday && now >= start && now <= end;

  let mm = 0, ss = 0;
  if (active) {
    const diff = end.getTime() - now.getTime();
    mm = Math.floor(diff / 60000);
    ss = Math.floor((diff % 60000) / 1000);
  }

  return (
    <div className="py-4 text-center" style={{ background: active ? CHILI : ORANGE, animation: active ? 'urgentPulse 1.4s ease-out infinite' : 'none' }}>
      <div className="max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-center gap-3">
        <span className="text-white font-black text-lg">{active ? '🔥 ' : ''}MITTAGSANGEBOT · 9,50 €</span>
        {active ? (
          <span className="text-white text-sm font-black px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,.18)' }}>
            Nur noch {mm}:{ss.toString().padStart(2, '0')} Minuten!
          </span>
        ) : (
          <span className="text-white text-xs font-semibold opacity-90">Mo.–Fr. 11:30–14:00 · Schnitzel, Nudeln, Salat + Getränk</span>
        )}
      </div>
    </div>
  );
}

function useLiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function getOpenStatus(now) {
  const day = now.getDay(); // 0 Sun ... 2 Tue
  if (day === 2) return { open: false, label: 'Geschlossen · Ruhetag', next: 'Öffnet morgen um 11:30 Uhr' };
  const h = now.getHours() + now.getMinutes() / 60;
  if (h >= 11.5 && h < 22) return { open: true, label: 'Jetzt geöffnet', next: `Bis 22:00 Uhr` };
  if (h < 11.5) return { open: false, label: 'Noch geschlossen', next: 'Öffnet heute um 11:30 Uhr' };
  return { open: false, label: 'Geschlossen', next: 'Öffnet morgen um 11:30 Uhr' };
}

function getGreeting(now) {
  const h = now.getHours();
  if (h < 11) return 'Guten Morgen! ☀️';
  if (h < 14) return 'Mahlzeit! 🥙';
  if (h < 18) return 'Schönen Nachmittag! 👋';
  return 'Guten Abend! 🌙';
}

const DAILY_SPECIALS = [
  { day: 0, items: [
    { name: 'Pizza Vier Käse', price: 9.0, desc: 'Mozzarella, Gorgonzola & Weichkäse', img: 'g2', cat: 'pizza' },
    { name: 'Spaghetti Carbonara', price: 8.5, desc: 'Putenschinken, Ei und Sahnesoße', img: 'spaghetti', cat: 'nudeln' },
  ]},
  { day: 1, items: [
    { name: 'Kebap überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Zwiebeln und Tomatensoße, überbacken mit Käse', img: 'g4', cat: 'ueberbacken' },
    { name: 'Baguette Kebap', price: 10.0, desc: 'Fleisch vom Drehspieß, Pilzen, Zwiebeln & Käse', img: 'g5', cat: 'baguette' },
  ]},
  { day: 2, items: null },
  { day: 3, items: [
    { name: 'Spaghetti Bodrum', price: 9.0, desc: 'Fleisch vom Drehspieß, Brokkoli & Sahnesoße', img: 'spaghetti', cat: 'nudeln' },
    { name: 'Schnitzel Wiener Art', price: 10.0, desc: 'Mit Salat, Pommes', img: 'schnitzel', cat: 'schnitzel' },
  ]},
  { day: 4, items: [
    { name: 'Zigeuner Schnitzel', price: 11.0, desc: 'Mit Salat, Pommes', img: 'schnitzel', cat: 'schnitzel' },
    { name: 'Pizza Spinat', price: 8.5, desc: 'Knoblauch und Weichkäse in Salzlake', img: 'g2', cat: 'pizza' },
  ]},
  { day: 5, items: [
    { name: 'Baguette Bodrum', price: 11.0, desc: 'Hollandaise, Weichkäse & frisches Gemüse', img: 'g5', cat: 'baguette' },
    { name: 'Calzone Kebap', price: 10.0, desc: 'Gefüllt mit Fleisch vom Drehspieß & Käse', img: 'g4', cat: 'calzone' },
  ]},
  { day: 6, items: null },
];

const WEEKEND_MEAT_OPTIONS = [
  { key: 'haehnchen', label: 'Hähnchen', extra: 0 },
  { key: 'kalb', label: 'Kalb/Rind', extra: 0 },
  { key: 'yaprak', label: 'Yaprak Döner', extra: 1.0 },
];
const DOENER_COMBO = { title: 'Dönerteller + Dose Getränk', price: 12.5, emoji: '🍽️' };
const PIZZA_COMBO_PRICE = 11.0;

function WeekendComboPromo({ go }) {
  const { t } = React.useContext(LangContext);
  const [openDoener, setOpenDoener] = useState(false);
  const [meat, setMeat] = useState('haehnchen');

  const confirmDoener = () => {
    const opt = WEEKEND_MEAT_OPTIONS.find((m) => m.key === meat);
    const total = DOENER_COMBO.price + (opt?.extra || 0);
    go('whatsapp', { pendingCombo: { title: `${DOENER_COMBO.title} (${opt.label})`, price: total } });
  };
  const goToPizzaCombo = () => {
    go('whatsapp', { pizzaComboMode: true });
  };

  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-10 py-4">
      <div className="rounded-2xl overflow-hidden" style={{ background: `linear-gradient(120deg, ${CHILI}, ${ORANGE})`, boxShadow: '0 10px 30px rgba(214,40,40,.3)' }}>
        <div className="px-6 pt-7 pb-3 text-center">
          <div className="text-white font-black text-xs tracking-[4px] mb-1.5 animate-pulse">{t('weekendOnlyToday')}</div>
          <div className="text-white font-black text-3xl">{t('weekendOfferTitle')}</div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 p-5 pt-2">

          {/* PIZZA CARD — leitet zur echten Pizza-Auswahl */}
          <div className="combo-card rounded-2xl overflow-hidden shadow-lg" style={{ background: '#fff' }}>
            <div className="relative">
              <img src={FOOD_G2} className="w-full h-56 sm:h-64 object-cover" />
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full font-black text-lg" style={{ background: GOLD, color: GREEN }}>{fmt(PIZZA_COMBO_PRICE)}</div>
            </div>
            <div className="p-4">
              <div className="font-black text-lg mb-1 text-center" style={{ color: GREEN }}>{t('weekendPizzaTitle')}</div>
              <p className="text-xs text-center mb-3" style={{ color: '#8a7c62' }}>{t('weekendPizzaSub')}</p>
              <button onClick={goToPizzaCombo} className="w-full py-3 rounded-full font-bold text-sm text-white" style={{ background: ORANGE }}>
                {t('choosePizza')}
              </button>
            </div>
          </div>

          {/* DÖNERTELLER CARD */}
          <div className="combo-card rounded-2xl overflow-hidden shadow-lg" style={{ background: '#fff' }}>
            <div className="relative">
              <img src={DOENER_TELLER_IMG} className="w-full h-56 sm:h-64 object-cover" />
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full font-black text-lg" style={{ background: GOLD, color: GREEN }}>{fmt(DOENER_COMBO.price)}</div>
            </div>
            <div className="p-4">
              <div className="font-black text-lg mb-3 text-center" style={{ color: GREEN }}>{DOENER_COMBO.emoji} {DOENER_COMBO.title}</div>

              {!openDoener && (
                <button onClick={() => { setOpenDoener(true); setMeat('haehnchen'); }} className="w-full py-3 rounded-full font-bold text-sm text-white" style={{ background: ORANGE }}>
                  {t('chooseArrow')}
                </button>
              )}

              {openDoener && (
                <div>
                  <div className="text-[11px] font-bold mb-2" style={{ color: '#8a7c62' }}>{t('chooseMeat')}</div>
                  <div className="flex flex-col gap-2 mb-3">
                    {WEEKEND_MEAT_OPTIONS.map((m) => (
                      <button key={m.key} onClick={() => setMeat(m.key)} className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold" style={meat === m.key ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN }}>
                        <span>{m.label}</span>
                        <span>{m.extra > 0 ? `+${fmt(m.extra)}` : t('included')}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={confirmDoener} className="w-full py-3 rounded-full font-bold text-sm text-white" style={{ background: CHILI }}>
                    {t('addToOrder')}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
        <div className="pb-5" />
      </div>
    </section>
  );
}

function WeekendTeaser({ go }) {
  const { t } = React.useContext(LangContext);
  return (
    <button onClick={() => go('whatsapp')} className="w-full flex items-center justify-center gap-2 flex-wrap text-center py-2.5 px-4 rounded-xl mt-3" style={{ background: '#fdecd4', border: '1px solid #f0d4a8' }}>
      <span className="text-xs font-black" style={{ color: '#8a5a1f' }}>{t('weekendTeaserOnly')}</span>
      <span className="text-xs font-semibold" style={{ color: '#8a5a1f' }}>28cm Pizza + {fmt(PIZZA_COMBO_PRICE)} · {DOENER_COMBO.title.split(' + ')[0]} + {fmt(DOENER_COMBO.price)}</span>
    </button>
  );
}

function MittagsBanner() {
  const { t } = React.useContext(LangContext);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t2 = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t2);
  }, []);
  const day = now.getDay();
  const isLunchDay = [1, 3, 4, 5].includes(day);
  const start = new Date(now); start.setHours(11, 30, 0, 0);
  const end = new Date(now); end.setHours(14, 0, 0, 0);
  const active = isLunchDay && now >= start && now <= end;
  let mm = 0, ss = 0;
  if (active) {
    const diff = end.getTime() - now.getTime();
    mm = Math.floor(diff / 60000);
    ss = Math.floor((diff % 60000) / 1000);
  }
  return (
    <section className="py-4" style={{ background: ORANGE }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 flex flex-col items-center justify-center gap-1 text-center" style={active ? { animation: 'urgentPulse 1.6s ease-out infinite' } : {}}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-white font-black text-lg">{active ? '🔥 ' : ''}{t('lunchOffer')}</span>
          <span className="text-white text-sm font-semibold opacity-90">
            {active ? `noch ${mm}:${ss.toString().padStart(2, '0')} Min.` : t('lunchOfferInactive')}
          </span>
        </div>
        <span className="text-white text-xs font-semibold opacity-85">{t('lunchOfferItems')}</span>
      </div>
    </section>
  );
}

function DailySpecialCard({ item, isLunchWindow, go }) {
  const { lang } = React.useContext(LangContext);
  const displayPrice = isLunchWindow ? 9.5 : item.price;

  const goToCategory = () => {
    go('whatsapp', { categoryMode: item.cat });
  };

  return (
    <div className="daily-card rounded-2xl overflow-hidden flex flex-col" style={{ background: GREEN, boxShadow: '0 10px 30px rgba(21,56,38,.16)' }}>
      <div className="overflow-hidden"><img src={item.imgSrc} className="daily-card-img w-full h-40 object-cover" /></div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-white font-black text-lg mb-1">{mx(item.name, lang)}</div>
        <div className="text-xs font-medium mb-3" style={{ color: '#d9cdb4' }}>{mx(item.desc, lang)}</div>

        <div className="mt-auto flex items-center gap-3">
          <span className="font-black text-lg" style={{ color: GOLD }}>
            {fmt(displayPrice)}{isLunchWindow && <span className="text-[10px] font-bold ml-1" style={{ color: '#d9cdb4' }}>inkl. Getränk</span>}
          </span>
          <button onClick={goToCategory} className="px-4 py-2 rounded-full font-bold text-xs" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>Bestellen →</button>
        </div>
      </div>
    </div>
  );
}

function DailySpecial({ go }) {
  const { lang, t } = React.useContext(LangContext);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const day = now.getDay();
  const entry = DAILY_SPECIALS[day];
  const imgMap = { g1: FOOD_G1, g2: FOOD_G2, g3: FOOD_G3, g4: FOOD_G4, g5: FOOD_G5, schnitzel: SCHNITZEL_IMG, spaghetti: SPAGHETTI_IMG };
  const days = DAY_NAMES[lang] || DAY_NAMES.de;

  const isLunchDay = [1, 3, 4, 5].includes(day);
  const start = new Date(now); start.setHours(11, 30, 0, 0);
  const end = new Date(now); end.setHours(14, 0, 0, 0);
  const isLunchWindow = isLunchDay && now >= start && now <= end;
  let mm = 0, ss = 0;
  if (isLunchWindow) {
    const diff = end.getTime() - now.getTime();
    mm = Math.floor(diff / 60000);
    ss = Math.floor((diff % 60000) / 1000);
  }

  if (day === 6) {
    return <WeekendComboPromo go={go} />;
  }

  if (day === 2) {
    return (
      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-4">
        <div className="rounded-2xl p-6 text-center" style={{ background: GREEN, boxShadow: '0 10px 30px rgba(21,56,38,.16)' }}>
          <div className="text-2xl mb-1.5">😴</div>
          <div className="text-white font-black text-lg mb-1">{t('closedTodayTitle')}</div>
          <div className="text-sm font-medium" style={{ color: '#d9cdb4' }}>{t('closedTodaySub')}</div>
          <WeekendTeaser go={go} />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-10 py-4">
      <div className="flex justify-center mb-4">
        <div className="px-6 py-2.5 rounded-full font-black text-sm sm:text-base tracking-[2px] text-center" style={{ background: GREEN, color: GOLD, animation: 'goldGlow 2.6s ease-in-out infinite' }}>
          ⭐ {t('dailyRecommendation')} · {days[day].toUpperCase()} ⭐
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {entry.items.map((item, i) => (
          <div key={i} style={{ animation: `cardIn .6s cubic-bezier(.22,1,.36,1) ${i * 0.12}s both` }}>
            <DailySpecialCard item={{ ...item, imgSrc: imgMap[item.img] }} isLunchWindow={isLunchWindow} go={go} />
          </div>
        ))}
      </div>

      <WeekendTeaser go={go} />
    </section>
  );
}

function HomeView({ go, installPrompt, onInstall }) {
  const [navOpen, setNavOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const now = useLiveClock();
  const status = getOpenStatus(now);
  const { lang, setLang, t } = React.useContext(LangContext);
  const HERO_IMAGES = [DOENER_SPIESS_IMG, PIZZA_KAESE_IMG, CALZONE_IMG, LAHMACUN_IMG, PENNE_IMG];
  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(iv);
  }, []);
  const scrollTo = (id) => {
    setNavOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: `${CREAM} repeating-linear-gradient(135deg, rgba(21,56,38,.025) 0 40px, rgba(21,56,38,0) 40px 80px)`, fontFamily: "'Segoe UI', Arial, sans-serif", minHeight: '100vh', animation: 'pageFade .5s cubic-bezier(.22,1,.36,1)' }}>
      <style>{`
        @keyframes pageFade { from{ opacity:0; transform:translateY(10px);} to{ opacity:1; transform:translateY(0);} }
        @keyframes confettiFall { 0%{ transform:translateY(-20px) rotate(0deg); opacity:1;} 80%{ opacity:1;} 100%{ transform:translateY(105vh) rotate(var(--spin, 480deg)); opacity:0;} }
        @keyframes popIn { 0%{ opacity:0; transform:scale(.6) rotate(-8deg);} 60%{ opacity:1; transform:scale(1.08) rotate(3deg);} 100%{ opacity:1; transform:scale(1) rotate(0deg);} }
        @keyframes cardIn { from{ opacity:0; transform:translateY(22px) scale(.97);} to{ opacity:1; transform:translateY(0) scale(1);} }
        @keyframes floatY { 0%,100%{ transform:translateY(0px) rotate(-3deg);} 50%{ transform:translateY(-10px) rotate(3deg);} }
        @keyframes sideFloatHome1 { 0%,100%{ transform:translateY(0) rotate(-8deg);} 50%{ transform:translateY(-24px) rotate(8deg);} }
        @keyframes sideFloatHome2 { 0%,100%{ transform:translateY(0) rotate(6deg);} 50%{ transform:translateY(-32px) rotate(-6deg);} }
        @keyframes sideSpinHome { from{ transform:rotate(0deg);} to{ transform:rotate(360deg);} }
        @keyframes floatY2 { 0%,100%{ transform:translateY(0px) rotate(4deg);} 50%{ transform:translateY(-14px) rotate(-4deg);} }
        @keyframes ctaGlow { 0%,100%{ box-shadow:0 0 0 0 rgba(255,106,26,.55);} 50%{ box-shadow:0 0 0 10px rgba(255,106,26,0);} }
        @keyframes urgentPulse { 0%,100%{ box-shadow:0 0 0 0 rgba(214,40,40,.55);} 50%{ box-shadow:0 0 0 10px rgba(214,40,40,0);} }
        @keyframes goldGlow { 0%,100%{ box-shadow:0 0 0 0 rgba(255,199,56,.45);} 50%{ box-shadow:0 0 14px 4px rgba(255,199,56,.35);} }
        @keyframes liveDot { 0%,100%{ opacity:1; transform:scale(1);} 50%{ opacity:.4; transform:scale(.7);} }
        @keyframes closedBlink { 0%,100%{ opacity:1;} 50%{ opacity:.25;} }
        @keyframes shine { 0%{ background-position:-300px 0;} 100%{ background-position:300px 0;} }
        .feature-card{ transition: transform .25s ease, box-shadow .25s ease; }
        .feature-card:hover{ transform: translateY(-6px) scale(1.015); box-shadow:0 18px 40px rgba(21,56,38,.22); }
        .feature-card:hover .icon-wobble{ animation: floatY .9s ease-in-out infinite; }
        .gallery-img{ transition: transform .4s ease, filter .4s ease; }
        .daily-card{ transition: transform .3s ease, box-shadow .3s ease; }
        .daily-card:hover{ transform: translateY(-4px); box-shadow: 0 16px 34px rgba(21,56,38,.24); }
        .daily-card-img{ transition: transform .5s ease; }
        .daily-card:hover .daily-card-img{ transform: scale(1.06); }
        .combo-card{ transition: transform .3s ease, box-shadow .3s ease; }
        .combo-card:hover{ transform: translateY(-4px); }
        .gallery-img:hover{ transform: scale(1.05); filter: brightness(1.05); }
        .cta-pulse{ animation: ctaGlow 2.2s ease-out infinite; }
        .hero-float{ animation: floatY 4.5s ease-in-out infinite; }
        .hero-float2{ animation: floatY2 5.5s ease-in-out infinite; }
      `}</style>
      <div className="h-1.5 w-full" style={{ background: `repeating-linear-gradient(115deg, ${ORANGE} 0 22px, ${GOLD} 22px 44px, ${CHILI} 44px 66px)` }} />

      {/* Dekoration für sehr breite Bildschirme */}
      <div className="hidden 2xl:flex flex-col items-center gap-12 fixed left-8 top-1/3 opacity-80 pointer-events-none z-0">
        <span style={{ fontSize: 44, animation: 'sideFloatHome1 5.5s ease-in-out infinite' }}>🥙</span>
        <span style={{ fontSize: 34, animation: 'sideSpinHome 8s linear infinite', display: 'inline-block' }}>🍕</span>
        <span style={{ fontSize: 30, animation: 'sideFloatHome2 4.8s ease-in-out infinite' }}>🍝</span>
      </div>
      <div className="hidden 2xl:flex flex-col items-center gap-12 fixed right-8 top-1/4 opacity-90 pointer-events-none z-10">
        <button onClick={() => go('group')} className="pointer-events-auto flex flex-col items-center gap-1.5 px-4 py-4 rounded-2xl text-center" style={{ background: ORANGE, animation: 'goldGlow 2.2s ease-in-out infinite', boxShadow: '0 10px 26px rgba(255,106,26,.4)' }}>
          <span style={{ fontSize: 30 }}>👥</span>
          <span className="text-white font-black text-[11px] leading-tight">{t('featGroupTitle')}!</span>
          <span className="text-white font-semibold text-[9px] opacity-90">{t('weiter')}</span>
        </button>
        <span style={{ fontSize: 30, animation: 'sideFloatHome1 5s ease-in-out infinite' }}>🥤</span>
        <span style={{ fontSize: 34, animation: 'sideSpinHome 7s linear infinite reverse', display: 'inline-block' }}>🔥</span>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40" style={{ background: GREEN }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-3.5 flex items-center justify-between">
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <img src={LOGO_ICON} alt="Bodrum Kebap Vechta" className="w-10 h-10 rounded-full object-contain" style={{ background: CREAM, padding: 3 }} />
            <div>
              <div className="text-white font-black text-sm leading-tight">BODRUM KEBAP</div>
              <div className="text-[10px] font-bold tracking-[3px]" style={{ color: GOLD }}>VECHTA</div>
            </div>
            <div className="flex items-center gap-1.5 ml-1 sm:ml-2 px-2 sm:px-2.5 py-1 rounded-full" style={{ background: status.open ? 'rgba(255,246,234,.08)' : 'rgba(214,40,40,.16)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.open ? '#4ade80' : '#ff4d4d', animation: status.open ? 'liveDot 1.6s ease-in-out infinite' : 'closedBlink 1.1s ease-in-out infinite' }} />
              <span className="text-[10.5px] font-black" style={{ color: status.open ? '#4ade80' : '#ff6b6b' }}>{status.label}</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            <button onClick={() => go('whatsapp')} className="text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('navMenu')}</button>
            <button onClick={() => scrollTo('extras')} className="text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('navExtras')}</button>
            <button onClick={() => scrollTo('galerie')} className="text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('navGallery')}</button>
            <button onClick={() => scrollTo('kontakt')} className="text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('navContact')}</button>
            <button onClick={() => go('staff')} className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#d9cdb4' }}><Lock size={13} /> {t('navStaff')}</button>
            {installPrompt && (
              <button onClick={onInstall} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(255,199,56,.16)', color: GOLD, border: '1px solid rgba(255,199,56,.4)' }}>{t('installAppBtn')}</button>
            )}
            <LanguageSwitcher lang={lang} setLang={setLang} dark />
            <a href="https://instagram.com/BodrumKebapVechta" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)' }} title="@BodrumKebapVechta">
              <Instagram size={16} color="#fff" />
            </a>
            <button onClick={() => go('whatsapp')} className="cta-pulse px-5 py-2.5 rounded-full font-bold text-sm" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.4)' }}>{t('orderNow')}</button>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher lang={lang} setLang={setLang} dark />
            <button onClick={() => setNavOpen((v) => !v)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,246,234,.12)' }}>
              {navOpen ? <X size={18} color="#fff" /> : <MenuIcon size={18} color="#fff" />}
            </button>
          </div>
        </div>
        {navOpen && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-3">
            <button onClick={() => go('whatsapp')} className="text-left text-sm font-semibold py-1.5" style={{ color: '#d9cdb4' }}>{t('navMenu')}</button>
            <button onClick={() => scrollTo('extras')} className="text-left text-sm font-semibold py-1.5" style={{ color: '#d9cdb4' }}>{t('navExtras')}</button>
            <a href="https://instagram.com/BodrumKebapVechta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold py-1.5" style={{ color: '#d9cdb4' }}><Instagram size={15} /> @BodrumKebapVechta</a>
            <button onClick={() => scrollTo('galerie')} className="text-left text-sm font-semibold py-1.5" style={{ color: '#d9cdb4' }}>{t('navGallery')}</button>
            <button onClick={() => scrollTo('kontakt')} className="text-left text-sm font-semibold py-1.5" style={{ color: '#d9cdb4' }}>{t('navContact')}</button>
            <button onClick={() => go('staff')} className="flex items-center gap-2 text-left text-sm font-semibold py-1.5" style={{ color: '#d9cdb4' }}><Lock size={14} /> {t('navStaffArea')}</button>
            {installPrompt && (
              <button onClick={onInstall} className="flex items-center gap-2 text-left text-sm font-semibold py-1.5" style={{ color: GOLD }}>{t('installAppBtn')}</button>
            )}
            <button onClick={() => go('whatsapp')} className="px-5 py-2.5 rounded-full font-bold text-sm text-center" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.4)' }}>{t('orderNow')}</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {HERO_IMAGES.map((img, i) => (
          <div key={img} className="absolute inset-0" style={{ backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: i === heroIdx ? 1 : 0, transition: 'opacity 1.8s ease-in-out', zIndex: 0 }} />
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(21,56,38,.86), rgba(21,56,38,.93))', zIndex: 1 }} />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {HERO_IMAGES.map((_, i) => (
            <span key={i} style={{ width: i === heroIdx ? 16 : 6, height: 6, borderRadius: 3, background: i === heroIdx ? GOLD : 'rgba(255,246,234,.4)', transition: 'all .4s ease' }} />
          ))}
        </div>
        <div className="hero-float absolute text-5xl select-none pointer-events-none opacity-20" style={{ top: '8%', left: '4%', zIndex: 2 }}>🥙</div>
        <div className="hero-float2 absolute text-5xl select-none pointer-events-none opacity-20" style={{ bottom: '10%', right: '6%', zIndex: 2 }}>🍕</div>
        <div className="hero-float absolute text-4xl select-none pointer-events-none opacity-15 hidden lg:block" style={{ top: '55%', left: '46%', zIndex: 2 }}>🔥</div>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5" style={{ background: 'rgba(255,199,56,.15)', color: GOLD, border: '1px solid rgba(255,199,56,.4)' }}>{getGreeting(now)} · ☪ {t('heroHalal')}</div>
            <h1 className="text-white font-black leading-[1.05] mb-4" style={{ fontSize: 'clamp(34px,5vw,58px)' }}>{t('heroTitle1')}<br /><span style={{ color: ORANGE }}>{t('heroTitle2')}</span></h1>
            <p className="text-base mb-8 max-w-md" style={{ color: '#d9cdb4' }}>{t('heroSubtitle')}</p>
            <div className="flex flex-wrap gap-3 mb-3">
              <button onClick={() => go('whatsapp')} className="cta-pulse px-6 py-3.5 rounded-full font-bold text-sm" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, color: '#fff', boxShadow: '0 10px 26px rgba(230,90,10,.45)' }}>{t('heroCtaWhatsapp')}</button>
              <button onClick={() => scrollTo('extras')} className="px-6 py-3.5 rounded-full font-bold text-sm" style={{ background: 'rgba(255,246,234,.1)', color: CREAM, border: '1px solid rgba(255,246,234,.25)' }}>{t('heroCtaMore')}</button>
            </div>
            <button onClick={() => go('group')} className="w-full sm:w-auto flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm" style={{ background: GOLD, color: GREEN, animation: 'goldGlow 2.2s ease-in-out infinite', boxShadow: '0 8px 22px rgba(255,199,56,.35)' }}>
              <span className="text-lg">👥</span> {t('heroCtaGroup')}
            </button>
            <div className="flex flex-wrap gap-2.5 mt-3">
              <button onClick={() => go('builder')} className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs" style={{ background: 'rgba(255,199,56,.16)', color: GOLD, border: '1px solid rgba(255,199,56,.4)' }}>🧩 {t('builderQuickLabel')}</button>
              <button onClick={() => go('loyalty')} className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs" style={{ background: 'rgba(255,246,234,.12)', color: CREAM, border: '1px solid rgba(255,246,234,.3)' }}>🎟️ {t('featLoyaltyTitle')}</button>
            </div>
          </div>
          <div className="rounded-2xl p-6 hidden lg:block" style={{ background: 'rgba(255,253,249,.97)' }}>
            <div className="flex justify-between py-2.5 text-sm" style={{ borderBottom: '1px dashed #e3d5bd' }}><span className="font-semibold" style={{ color: '#7a6a52' }}>{t('heroOpeningHours')}</span><span className="font-bold" style={{ color: GREEN }}>{lang === 'de' ? 'Täglich 11:30–22:00' : '11:30–22:00'}</span></div>
            <div className="flex justify-between py-2.5 text-sm" style={{ borderBottom: '1px dashed #e3d5bd' }}><span className="font-semibold" style={{ color: '#7a6a52' }}>{t('heroClosedDay')}</span><span className="font-bold" style={{ color: CHILI }}>{lang === 'de' ? 'Dienstag' : lang === 'en' ? 'Tuesday' : lang === 'tr' ? 'Salı' : lang === 'ro' ? 'Marți' : 'Dinsdag'}</span></div>
            <div className="flex justify-between py-2.5 text-sm"><span className="font-semibold" style={{ color: '#7a6a52' }}>{t('heroAddress')}</span><span className="font-bold text-right" style={{ color: GREEN }}>Oyther Straße 37,<br />49377 Vechta</span></div>
          </div>
        </div>
      </section>

      {/* DAILY SPECIAL */}
      <DailySpecial go={go} />
      <MittagsBanner />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* EXTRAS */}
      <section id="extras" className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="text-center mb-9">
          <div className="text-xs font-bold tracking-[3px] mb-2" style={{ color: '#e4550a' }}>{t('extrasKicker')}</div>
          <h2 className="font-black" style={{ fontSize: 'clamp(26px,4vw,36px)', color: GREEN }}>{t('extrasTitle')}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard index={0} icon="📱" title={t('featWaTitle')} sub={t('featWaSub')} color="#25D366" onClick={() => go('whatsapp')} />
          <FeatureCard index={1} icon="🧩" title={t('featBuilderTitle')} sub={t('featBuilderSub')} color={GREEN} onClick={() => go('builder')} />
          <FeatureCard index={2} icon="👥" title={t('featGroupTitle')} sub={t('featGroupSub')} color="#2b5c41" onClick={() => go('group')} />
          <FeatureCard index={3} icon="🎟️" title={t('featLoyaltyTitle')} sub={t('featLoyaltySub')} color={GOLD} textColor={GREEN} onClick={() => go('loyalty')} />
        </div>
        <p className="text-center text-xs font-medium mt-6" style={{ color: '#a4906c' }}>{t('extrasTip')}</p>
      </section>

      {/* GALLERY */}
      <section id="galerie" className="max-w-7xl mx-auto px-5 lg:px-10 py-10">
        <div className="text-xs font-bold tracking-widest mb-4" style={{ color: '#a4906c' }}>{t('galleryTerrace')}</div>
        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ boxShadow: '0 10px 30px rgba(21,56,38,.16)' }}>
          <img src={TERRACE_IMG} className="gallery-img w-full h-56 sm:h-72 lg:h-96 object-cover" />
          <div className="absolute inset-0 flex items-end" style={{ background: 'linear-gradient(0deg, rgba(21,56,38,.75) 0%, rgba(21,56,38,0) 45%)' }}>
            <div className="p-5 sm:p-7">
              <div className="text-white font-black text-lg sm:text-2xl">{t('galleryTerraceTitle')}</div>
              <div className="text-sm font-medium" style={{ color: '#d9cdb4' }}>{t('galleryTerraceSub')}</div>
            </div>
          </div>
        </div>

        <div className="text-xs font-bold tracking-widest mb-4" style={{ color: '#a4906c' }}>{t('galleryKitchen')}</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <img src={TERRACE_IMG} onClick={() => setLightbox(TERRACE_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={DOENER_TELLER_IMG} onClick={() => setLightbox(DOENER_TELLER_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={SCHNITZEL_IMG} onClick={() => setLightbox(SCHNITZEL_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={SPAGHETTI_IMG} onClick={() => setLightbox(SPAGHETTI_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={FOOD_G1} onClick={() => setLightbox(FOOD_G1)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={FOOD_G2} onClick={() => setLightbox(FOOD_G2)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={FOOD_G3} onClick={() => setLightbox(FOOD_G3)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={FOOD_G4} onClick={() => setLightbox(FOOD_G4)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={DOENER_SPIESS_IMG} onClick={() => setLightbox(DOENER_SPIESS_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={CALZONE_IMG} onClick={() => setLightbox(CALZONE_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={LAHMACUN_IMG} onClick={() => setLightbox(LAHMACUN_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={PIZZABROETCHEN_IMG} onClick={() => setLightbox(PIZZABROETCHEN_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={PENNE_IMG} onClick={() => setLightbox(PENNE_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={PIZZA_KAESE_IMG} onClick={() => setLightbox(PIZZA_KAESE_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={FALAFEL_IMG} onClick={() => setLightbox(FALAFEL_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={SALAT_BUNT_IMG} onClick={() => setLightbox(SALAT_BUNT_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={BAUERNSALAT_IMG} onClick={() => setLightbox(BAUERNSALAT_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={NUGGETS_IMG} onClick={() => setLightbox(NUGGETS_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={CHICKEN_STRIPS_IMG} onClick={() => setLightbox(CHICKEN_STRIPS_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={POMMES_IMG} onClick={() => setLightbox(POMMES_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
        </div>
      </section>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: 'rgba(21,56,38,.92)', animation: 'viewFade .25s ease' }}>
          <button onClick={() => setLightbox(null)} className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,246,234,.15)' }}>
            <X size={20} color="#fff" />
          </button>
          <img src={lightbox} className="max-w-full max-h-full rounded-2xl object-contain" style={{ boxShadow: '0 20px 60px rgba(0,0,0,.5)' }} onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* MAP / CONTACT */}
      <section id="kontakt" className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="text-center mb-9">
          <div className="text-xs font-bold tracking-[3px] mb-2" style={{ color: '#e4550a' }}>{t('contactKicker')}</div>
          <h2 className="font-black" style={{ fontSize: 'clamp(26px,4vw,36px)', color: GREEN }}>{t('contactTitle')}</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl p-6 flex flex-col justify-center" style={{ background: GREEN }}>
            <div className="flex items-start gap-3 mb-4"><MapPin size={18} color={GOLD} className="mt-0.5 flex-shrink-0" /><div><div className="text-white font-bold text-sm">Oyther Straße 37</div><div className="text-sm font-medium" style={{ color: '#d9cdb4' }}>49377 Vechta</div></div></div>
            <div className="flex items-start gap-3 mb-4"><Phone size={16} color={GOLD} className="mt-0.5 flex-shrink-0" /><a href="tel:+4944419516104" className="text-white font-bold text-sm">04441 / 95 16 104</a></div>
            <div className="flex items-start gap-3 mb-6"><Clock3 size={16} color={GOLD} className="mt-0.5 flex-shrink-0" /><div><div className="text-white font-bold text-sm">{lang === 'de' ? 'Täglich 11:30–22:00 Uhr' : lang === 'en' ? 'Daily 11:30 AM–10:00 PM' : lang === 'tr' ? 'Her gün 11:30–22:00' : lang === 'ro' ? 'Zilnic 11:30–22:00' : 'Dagelijks 11:30–22:00'}</div><div className="text-xs font-medium" style={{ color: '#d9cdb4' }}>{lang === 'de' ? 'Dienstag Ruhetag' : lang === 'en' ? 'Closed on Tuesdays' : lang === 'tr' ? 'Salı günü kapalı' : lang === 'ro' ? 'Marți închis' : 'Dinsdag gesloten'}</div></div></div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Oyther+Stra%C3%9Fe+37%2C+49377+Vechta"
                target="_blank" rel="noopener noreferrer"
                className="cta-pulse inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm w-fit"
                style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}
              >
                {t('contactRoute')}
              </a>
              <a
                href="https://instagram.com/BodrumKebapVechta"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm w-fit"
                style={{ background: 'linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)', color: '#fff' }}
              >
                <Instagram size={16} /> @BodrumKebapVechta
              </a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ minHeight: 280, boxShadow: '0 10px 30px rgba(21,56,38,.14)' }}>
            <iframe
              title="Bodrum Kebap Vechta Standort"
              src="https://www.google.com/maps?q=Oyther+Stra%C3%9Fe+37,+49377+Vechta&output=embed"
              width="100%" height="100%" style={{ border: 0, minHeight: 280 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: GREEN }} className="mt-4">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={LOGO_ICON} alt="logo" className="w-8 h-8 rounded-full object-contain" style={{ background: CREAM, padding: 2 }} />
            <span className="text-white font-black text-xs">BODRUM KEBAP VECHTA</span>
          </div>
          <span className="text-[11px] font-medium" style={{ color: '#6b5a3e' }}>© 2026 Bodrum Kebap Vechta</span>
          <div className="flex items-center gap-4">
            <button onClick={() => go('impressum')} className="text-[10px] font-semibold underline" style={{ color: '#6b5a3e' }}>{t('footerImpressum')}</button>
            <button onClick={() => go('datenschutz')} className="text-[10px] font-semibold underline" style={{ color: '#6b5a3e' }}>{t('footerDatenschutz')}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============ WHATSAPP ORDER ============ */
function WhatsAppOrderView({ back, initialAction, onConsumeAction }) {
  const { lang, t, installPrompt, onInstall } = React.useContext(LangContext);
  const initialTab = initialAction?.pizzaComboMode ? 'pizza' : (initialAction?.categoryMode || MENU[0].key);
  const [tab, setTab] = useState(initialTab);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [openExtra, setOpenExtra] = useState(null);
  const [configExtras, setConfigExtras] = useState([]);
  const [configNote, setConfigNote] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [drawerView, setDrawerView] = useState('cart');
  const [wheelResult, setWheelResult] = useState(null);
  const [pizzaComboActive, setPizzaComboActive] = useState(!!initialAction?.pizzaComboMode);
  const [itemNotes, setItemNotes] = useState({});
  const [burst, setBurst] = useState(false);
  const resetOrder = () => { setCart({}); setName(''); setNote(''); setWheelResult(null); setItemNotes({}); setDrawerView('cart'); setCartOpen(false); };
  const handleSend = () => { setBurst(true); setTimeout(() => setBurst(false), 5200); setDrawerView('sent'); };

  const addItem = (lineKey, label, price, deLabel) => setCart((c) => ({ ...c, [lineKey]: { name: label, deName: deLabel || label, price, qty: (c[lineKey]?.qty || 0) + 1 } }));

  useEffect(() => {
    if (initialAction?.pendingCombo) {
      const key = `combo-${Date.now()}`;
      setCart((c) => ({ ...c, [key]: { name: `🎉 ${initialAction.pendingCombo.title}`, deName: `🎉 ${initialAction.pendingCombo.title}`, price: initialAction.pendingCombo.price, qty: 1 } }));
      setDrawerView('upsell');
      setCartOpen(true);
    }
    onConsumeAction && onConsumeAction();
  }, []);

  const addPizzaCombo = (item) => {
    const key = `combo-pizza-${item.id}`;
    setCart((c) => ({ ...c, [key]: { name: `🎉 ${mx(item.name, lang)} (28cm, Wochenende-Angebot inkl. Getränk)`, deName: `🎉 ${item.name} (28cm, Wochenende-Angebot inkl. Getränk)`, price: PIZZA_COMBO_PRICE, qty: (c[key]?.qty || 0) + 1 } }));
  };

  const removeItem = (lineKey) => setCart((c) => {
    const ex = c[lineKey]; if (!ex) return c;
    if (ex.qty <= 1) { const cp = { ...c }; delete cp[lineKey]; return cp; }
    return { ...c, [lineKey]: { ...ex, qty: ex.qty - 1 } };
  });

  const lines = Object.entries(cart);
  const totalCount = lines.reduce((s, [, v]) => s + v.qty, 0);
  const totalPrice = lines.reduce((s, [, v]) => s + v.qty * v.price, 0);

  const waLink = useMemo(() => {
    if (lines.length === 0) return null;
    let msg = `Hallo Bodrum Kebap Vechta, ich möchte gerne folgendes bestellen:\n\n`;
    lines.forEach(([key, v]) => { const note = itemNotes[key]; msg += `• ${v.qty}x ${v.deName || v.name}${note ? ` – ${note}` : ''} (${fmt(v.qty * v.price)})\n`; });
    msg += `\nGesamt: ${fmt(totalPrice)}\n`;
    if (name) msg += `\nName: ${name}`;
    if (pickupTime) msg += `\nGewünschte Abholzeit: ${pickupTime}`;
    if (note) msg += `\nHinweis: ${note}`;
    if (wheelResult && wheelResult.code) msg += `\n\n🎁 Glücksrad-Gewinn: ${wheelResult.prize} (Code: ${wheelResult.code})`;
    msg += `\n\n(Abholung, keine Lieferung) Bitte sagt mir kurz, wann die Bestellung abholbereit ist. Danke!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [lines, totalPrice, name, note, pickupTime, wheelResult, itemNotes]);

  const activeCategory = MENU.find((m) => m.key === tab);

  return (
    <div className="pb-24">
      <div style={{ background: GREEN }}><TopBar onHome={back} title={t('titleWa')} /></div>

      <div className="flex gap-2 overflow-x-auto px-5 pt-4 pb-2">
        {MENU.map((m) => (
          <button key={m.key} onClick={() => setTab(m.key)} className="flex-none px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap"
            style={tab === m.key ? { background: GREEN, color: GOLD } : { background: 'transparent', color: GREEN, border: `1.5px solid ${GREEN}` }}>
            {CATEGORY_ICONS[m.key]} {catLabel(m.key, lang)}
          </button>
        ))}
      </div>


      {pizzaComboActive && tab === 'pizza' && (
        <div className="mx-5 mt-3 mb-1 px-4 py-3 rounded-xl flex items-center justify-between gap-2 flex-wrap" style={{ background: '#fdecd4', border: '1px solid #f0d4a8' }}>
          <span className="text-xs font-black" style={{ color: '#8a5a1f' }}>🎉 Wochenende-Angebot: Wähle deine 28cm Pizza für {fmt(PIZZA_COMBO_PRICE)} inkl. Getränk!</span>
          <button onClick={() => setPizzaComboActive(false)} className="text-[11px] font-bold underline" style={{ color: '#8a5a1f' }}>Angebot verlassen</button>
        </div>
      )}

      {CATEGORY_IMAGES[tab] && (
        <div className="px-5 pt-2">
          <div className="rounded-2xl overflow-hidden relative h-28" style={{ boxShadow: '0 8px 20px rgba(21,56,38,.15)' }}>
            <img src={CATEGORY_IMAGES[tab]} className="w-full h-full object-cover" alt={catLabel(tab, lang)} />
            <div className="absolute inset-0 flex items-end p-3" style={{ background: 'linear-gradient(0deg, rgba(21,56,38,.75), rgba(21,56,38,.05))' }}>
              <span className="text-white font-black text-lg">{CATEGORY_ICONS[tab]} {catLabel(tab, lang)}</span>
            </div>
          </div>
        </div>
      )}
      <div className="px-5 pt-2 grid md:grid-cols-2 xl:grid-cols-3 gap-2.5 items-start">
        {activeCategory.items.map((item) => {
          if (item.priceSmall !== undefined) {
            if (pizzaComboActive && tab === 'pizza') {
              return (
                <div key={item.id} className="bg-white rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-2" style={{ borderLeft: `4px solid ${GOLD}` }}>
                  <div>
                    <div className="font-bold text-sm" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{mx(item.name, lang)}</div>
                    {item.desc && <div className="text-[11px] font-medium mt-0.5" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}
                  </div>
                  <button onClick={() => addPizzaCombo(item)} className="flex-none px-3.5 py-2.5 rounded-lg text-xs font-black text-white text-center" style={{ background: ORANGE }}>Wählen<br />{fmt(PIZZA_COMBO_PRICE)}</button>
                </div>
              );
            }
            const isOpen = openExtra?.itemId === item.id;
            const size = openExtra?.size;
            const basePrice = size === 'klein' ? item.priceSmall : item.priceLarge;
            const configTotal = isOpen ? basePrice + configExtras.length * 1.0 : 0;
            const openFor = (sz) => { setOpenExtra({ itemId: item.id, size: sz }); setConfigExtras([]); setConfigNote(''); };
            const toggleExtra = (t) => setConfigExtras((ex) => (ex.includes(t) ? ex.filter((x) => x !== t) : [...ex, t]));
            const confirmAdd = () => {
              const sizeLabel = size === 'klein' ? 'klein' : 'groß';
              const displaySizeLabel = size === 'klein' ? t('sizeSmall') : t('sizeLarge');
              let deLabel = configExtras.length > 0 ? `${item.name} (${sizeLabel}) ${configExtras.map((e) => `+${e}`).join(' ')}` : `${item.name} (${sizeLabel})`;
              let displayLabel = configExtras.length > 0 ? `${mx(item.name, lang)} (${displaySizeLabel}) ${configExtras.map((e) => `+${mx(e, lang)}`).join(' ')}` : `${mx(item.name, lang)} (${displaySizeLabel})`;
              if (configNote.trim()) { deLabel += ` [${configNote.trim()}]`; displayLabel += ` [${configNote.trim()}]`; }
              const lineKey = `${item.id}-${size}-${configExtras.slice().sort().join('_') || 'ohne'}`;
              addItem(lineKey, displayLabel, configTotal, deLabel);
              setOpenExtra(null); setConfigExtras([]); setConfigNote('');
            };
            return (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                {item.img && <img src={item.img} alt={item.name} className="w-full h-36 object-cover" loading="lazy" />}
                <div className="p-3.5">
                <div className="font-bold text-sm mb-1" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{mx(item.name, lang)}{item.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}</div>
                {item.desc && <div className="text-[11px] font-medium mb-2" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}
                <div className="flex gap-2">
                  <button onClick={() => openFor('klein')} className="flex-1 px-2.5 py-2.5 rounded-lg text-[11px] font-bold" style={isOpen && size === 'klein' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{t('sizeSmall')} · {fmt(item.priceSmall)}</button>
                  <button onClick={() => openFor('gross')} className="flex-1 px-2.5 py-2.5 rounded-lg text-[11px] font-bold" style={isOpen && size === 'gross' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{t('sizeLarge')} · {fmt(item.priceLarge)}</button>
                </div>
                {isOpen && (
                  <div className="mt-3 pt-3" style={{ borderTop: '1px dashed #e3d5bd' }}>
                    <div className="text-[11px] font-bold mb-2" style={{ color: '#8a5a1f' }}>{t('extrasPricePrefix')} {fmt(1.0)}):</div>
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      {EXTRA_TOPPINGS.map((top) => (
                        <button key={top} onClick={() => toggleExtra(top)} className="px-2 py-1.5 rounded-lg text-[10.5px] font-bold" style={configExtras.includes(top) ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>{mx(top, lang)}</button>
                      ))}
                    </div>
                    <input
                      value={configNote}
                      onChange={(e) => setConfigNote(e.target.value)}
                      placeholder={t('noteExampleCheese')}
                      className="w-full mb-3 px-3 py-2 rounded-lg text-[11px] font-medium outline-none"
                      style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
                    />
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setOpenExtra(null); setConfigExtras([]); setConfigNote(''); }} className="px-4 py-2.5 rounded-lg text-xs font-semibold" style={{ background: '#f0e5cf', color: GREEN }}>{t('abbrechen')}</button>
                      <button onClick={confirmAdd} className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: ORANGE }}>{t('toCart')} · {fmt(configTotal)}</button>
                    </div>
                  </div>
                )}
                </div>
              </div>
            );
          }
          if (item.customPizza || item.customPasta) {
            const isOpen = openExtra?.itemId === item.id;
            const toppings = item.customPizza ? EXTRA_TOPPINGS : PASTA_TOPPINGS;
            const extraCost = (top) => (top === 'Bolognese-Soße' ? 0.5 : (top === 'Tomatensoße' || top === 'Sahnesoße') ? 0 : 1.0);
            const configTotal = isOpen ? item.price + configExtras.reduce((s, e) => s + extraCost(e), 0) : 0;
            const openFor = () => { setOpenExtra({ itemId: item.id }); setConfigExtras([]); setConfigNote(''); };
            const toggleExtra = (top) => setConfigExtras((ex) => (ex.includes(top) ? ex.filter((x) => x !== top) : [...ex, top]));
            const confirmAdd = () => {
              let deLabel = configExtras.length > 0 ? `${item.name} ${configExtras.map((e) => `+${e}`).join(' ')}` : `${item.name}`;
              let displayLabel = configExtras.length > 0 ? `${mx(item.name, lang)} ${configExtras.map((e) => `+${mx(e, lang)}`).join(' ')}` : `${mx(item.name, lang)}`;
              if (configNote.trim()) { deLabel += ` [${configNote.trim()}]`; displayLabel += ` [${configNote.trim()}]`; }
              const lineKey = `${item.id}-${configExtras.slice().sort().join('_') || 'ohne'}`;
              addItem(lineKey, displayLabel, configTotal, deLabel);
              setOpenExtra(null); setConfigExtras([]); setConfigNote('');
            };
            return (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ borderLeft: `4px solid ${GOLD}` }}>
                <div className="p-3.5">
                  <div className="font-bold text-sm mb-1" style={{ color: GREEN }}>{mx(item.name, lang)}</div>
                  {item.desc && <div className="text-[11px] font-medium mb-2" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}
                  <button onClick={openFor} className="w-full px-2.5 py-2.5 rounded-lg text-[11px] font-bold" style={isOpen ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{t('chooseArrow')} · {fmt(item.price)}</button>
                  {isOpen && (
                    <div className="mt-3 pt-3" style={{ borderTop: '1px dashed #e3d5bd' }}>
                      <div className="text-[11px] font-bold mb-2" style={{ color: '#8a5a1f' }}>{t('rowExtras')}:</div>
                      <div className="grid grid-cols-3 gap-1.5 mb-3">
                        {toppings.map((top) => (
                          <button key={top} onClick={() => toggleExtra(top)} className="px-2 py-1.5 rounded-lg text-[10.5px] font-bold flex flex-col items-center gap-0.5" style={configExtras.includes(top) ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>
                            <span>{mx(top, lang)}</span><span className="opacity-70 text-[9px]">{extraCost(top) > 0 ? `+${fmt(extraCost(top))}` : t('freeLabel')}</span>
                          </button>
                        ))}
                      </div>
                      <input
                        value={configNote}
                        onChange={(e) => setConfigNote(e.target.value)}
                        placeholder={t('noteExampleCheese')}
                        className="w-full mb-3 px-3 py-2 rounded-lg text-[11px] font-medium outline-none"
                        style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
                      />
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setOpenExtra(null); setConfigExtras([]); setConfigNote(''); }} className="px-4 py-2.5 rounded-lg text-xs font-semibold" style={{ background: '#f0e5cf', color: GREEN }}>{t('abbrechen')}</button>
                        <button onClick={confirmAdd} className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: ORANGE }}>{t('toCart')} · {fmt(configTotal)}</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }
          const qty = cart[item.id]?.qty || 0;
          return (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
              {item.img && <img src={item.img} alt={item.name} className="w-full h-32 object-cover" loading="lazy" />}
              <div className="p-3.5">
              <div className="flex items-center justify-between">
                <div><div className="font-bold text-sm" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{mx(item.name, lang)}{item.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}</div>{item.desc && <div className="text-[11px] font-medium mt-0.5" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}<div className="text-xs font-semibold mt-1" style={{ color: CHILI }}>{fmt(item.price)}</div></div>
                <Stepper qty={qty} onAdd={() => addItem(item.id, mx(item.name, lang), item.price, item.name)} onRemove={() => removeItem(item.id)} />
              </div>
              {qty > 0 && (
                <input
                  value={itemNotes[item.id] || ''}
                  onChange={(e) => setItemNotes((n) => ({ ...n, [item.id]: e.target.value }))}
                  placeholder={t('noteExampleOnions')}
                  className="w-full mt-2.5 px-3 py-2 rounded-lg text-[11px] font-medium outline-none"
                  style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
                />
              )}
              </div>
            </div>
          );
        })}
      </div>

      {totalCount > 0 && !cartOpen && (
        <button onClick={() => { setCartOpen(true); setDrawerView('upsell'); }} className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[360px] rounded-2xl px-5 py-4 flex items-center justify-between shadow-xl" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>
          <span className="flex items-center gap-2 font-bold text-sm"><ShoppingBag size={18} /> {totalCount} {t('itemsWord')}</span>
          <span className="font-black text-base">{fmt(totalPrice)}</span>
        </button>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-center">
          <div className="w-full max-w-md h-full flex flex-col" style={{ background: CREAM }}>
            <div style={{ background: GREEN }} className="px-5 py-5 flex items-center gap-3">
              <button onClick={() => (drawerView === 'wheel' || drawerView === 'upsell2' ? setDrawerView(drawerView === 'upsell2' ? 'upsell' : 'cart') : setCartOpen(false))} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,246,234,.12)' }}><ChevronLeft size={18} color="#fff" /></button>
              <div className="text-white font-extrabold text-sm">{drawerView === 'wheel' ? t('wheelTitle') : drawerView === 'upsell' ? t('upsellTitle') : drawerView === 'upsell2' ? t('drinksTitle') : drawerView === 'sent' ? t('orderSentTitle') : t('cartTitle')}</div>
            </div>

            {drawerView === 'upsell' && (
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <div className="text-center mb-5">
                  <div className="text-3xl mb-2">🍟🍗</div>
                  <div className="font-black text-lg" style={{ color: GREEN }}>{t('upsellTitle')}</div>
                  <p className="text-sm mt-1" style={{ color: '#7c6d55' }}>{t('upsellSub')}</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {UPSELL_FOOD.map((u) => {
                    const key = u.id;
                    const qty = cart[key]?.qty || 0;
                    return (
                      <div key={u.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{u.emoji}</span>
                          <div>
                            <div className="font-bold text-sm" style={{ color: GREEN }}>{u.name}</div>
                            <div className="text-xs font-semibold" style={{ color: CHILI }}>{fmt(u.price)}</div>
                          </div>
                        </div>
                        <Stepper qty={qty} onAdd={() => addItem(u.id, mx(u.name, lang), u.price, u.name)} onRemove={() => removeItem(u.id)} />
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => setDrawerView('upsell2')} className="w-full mt-6 py-3.5 rounded-xl font-bold text-base text-white" style={{ background: GREEN }}>{t('weiter')}</button>
                <button onClick={() => setDrawerView('cart')} className="w-full mt-2 py-2.5 rounded-xl font-semibold text-xs" style={{ color: '#a4906c' }}>{t('skip')}</button>
              </div>
            )}

            {drawerView === 'upsell2' && (
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <div className="text-center mb-5">
                  <div className="text-3xl mb-2">🥤</div>
                  <div className="font-black text-lg" style={{ color: GREEN }}>Etwas zu trinken?</div>
                  <p className="text-sm mt-1" style={{ color: '#7c6d55' }}>{t('drinksSub')}</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {UPSELL_DRINKS.map((u) => {
                    const key = u.id;
                    const qty = cart[key]?.qty || 0;
                    return (
                      <div key={u.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{u.emoji}</span>
                          <div>
                            <div className="font-bold text-sm" style={{ color: GREEN }}>{u.name}</div>
                            <div className="text-xs font-semibold" style={{ color: CHILI }}>{fmt(u.price)}</div>
                          </div>
                        </div>
                        <Stepper qty={qty} onAdd={() => addItem(u.id, mx(u.name, lang), u.price, u.name)} onRemove={() => removeItem(u.id)} />
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => setDrawerView('cart')} className="w-full mt-6 py-3.5 rounded-xl font-bold text-base text-white" style={{ background: GREEN }}>{t('continueToOrder')}</button>
                <button onClick={() => setDrawerView('cart')} className="w-full mt-2 py-2.5 rounded-xl font-semibold text-xs" style={{ color: '#a4906c' }}>{t('skip')}</button>
              </div>
            )}

            {drawerView === 'wheel' && (
              <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col items-center">
                <p className="text-sm text-center mb-5" style={{ color: '#6b5a3e' }}>{t('wheelSpinOnceMsg')}</p>
                <WheelWidget compact onWin={(res) => setWheelResult(res)} />
                {wheelResult && (
                  <button onClick={() => setDrawerView('cart')} className="mt-4 w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN }}>{t('continueToOrder')}</button>
                )}
              </div>
            )}

            {drawerView === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {lines.length === 0 && <p className="text-sm text-center mt-10" style={{ color: '#8a7c62' }}>{t('cartEmpty')}</p>}
                  <div className="flex flex-col gap-2.5">
                    {lines.map(([key, v]) => (
                      <div key={key} className="bg-white rounded-xl p-3.5 flex items-center justify-between shadow-sm">
                        <div><div className="font-bold text-sm" style={{ color: GREEN }}>{v.name}</div><div className="text-xs font-semibold" style={{ color: CHILI }}>{fmt(v.price)} / Stück</div></div>
                        <Stepper qty={v.qty} onAdd={() => addItem(key, v.name, v.price, v.deName)} onRemove={() => removeItem(key)} />
                      </div>
                    ))}
                  </div>

                  {lines.length > 0 && !wheelResult && totalPrice >= 30 && (
                    <div className="mt-4"><WheelPromoBanner onClick={() => setDrawerView('wheel')} /></div>
                  )}
                  {lines.length > 0 && !wheelResult && totalPrice < 30 && (
                    <div className="mt-4 text-center text-xs font-semibold px-4 py-2.5 rounded-xl" style={{ background: '#f7f0e2', color: '#8a7c62' }}>
                      {t('wheelThresholdPrefix')} {fmt(30 - totalPrice)} {t('wheelThresholdSuffix')}
                    </div>
                  )}
                  {wheelResult && wheelResult.code && (
                    <div className="w-full mt-4 px-4 py-3 rounded-xl flex items-center gap-2" style={{ background: GREEN, animation: 'popIn .5s ease' }}>
                      <Gift size={16} color={GOLD} /><span className="text-xs font-bold" style={{ color: GOLD }}>{t('wonPrefix')} {mx(wheelResult.prize, lang)} {t('wonSuffix')}</span>
                    </div>
                  )}

                  {lines.length > 0 && (
                    <div className="mt-6 flex flex-col gap-3">
                      <p className="text-xs font-medium -mt-1" style={{ color: '#8a7c62' }}>{t('confirmPickupNote')}</p>
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('yourName')} className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none" style={{ background: '#fff', border: '1px solid #e3d5bd', color: GREEN }} />
                      <input value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} placeholder={t('pickupTimePh')} className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none" style={{ background: '#fff', border: '1px solid #e3d5bd', color: GREEN }} />
                      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={t('noteOptional')} rows={2} className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none resize-none" style={{ background: '#fff', border: '1px solid #e3d5bd', color: GREEN }} />
                    </div>
                  )}
                </div>
                {lines.length > 0 && (
                  <div className="px-5 py-4" style={{ borderTop: '1px solid #e3d5bd', background: '#fff' }}>
                    <div className="flex justify-between items-center mb-3"><span className="text-sm font-semibold" style={{ color: '#7c6d55' }}>{t('gesamt')}</span><span className="text-lg font-black" style={{ color: GREEN }}>{fmt(totalPrice)}</span></div>
                    <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={handleSend} className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #25D366, #1fb855)', color: '#fff', boxShadow: '0 8px 22px rgba(37,211,102,.4)' }}><MessageCircle size={18} /> {t('waSend')}</a>
                  </div>
                )}
              </>
            )}

            {drawerView === 'sent' && (
              <div className="flex-1 overflow-y-auto px-5 py-10 flex flex-col items-center justify-center text-center relative">
                {burst && <EmojiConfetti emojis={['🎉', '🥙', '✅', '⭐', '🎊']} />}
                <div className="rounded-full flex items-center justify-center mb-5" style={{ width: 84, height: 84, background: '#e8f9ee', animation: 'popIn .65s cubic-bezier(.34,1.56,.64,1) both, ringPulse 1.8s ease-out .5s infinite' }}>
                  <span className="text-5xl">✅</span>
                </div>
                <div className="font-black text-xl mb-2" style={{ color: GREEN, animation: 'slideUpFade .5s ease .15s both' }}>{t('orderSentTitle')}</div>
                <p className="text-sm mb-8" style={{ color: '#7c6d55', animation: 'slideUpFade .5s ease .3s both' }}>{t('orderSentSub')}</p>
                <div className="w-full flex flex-col gap-3" style={{ animation: 'slideUpFade .5s ease .45s both' }}>
                  <button onClick={resetOrder} className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: ORANGE }}>{t('newOrderBtn')}</button>
                  <button onClick={back} className="w-full py-3.5 rounded-xl font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('backToHomeBtn')}</button>
                  {installPrompt && (
                    <button onClick={onInstall} className="w-full py-3 rounded-xl font-semibold text-xs" style={{ background: '#fdecd4', color: '#8a5a1f', border: '1px solid #f0d4a8' }}>{t('installAppBtn')}</button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ DÖNER BUILDER ============ */
const BASES = [
  { id: 'brot', label: 'Im Brot (klassisch)', desc: 'Klassischer Döner im Fladenbrot', price: 8.0, emoji: '🥙' },
  { id: 'duerum', label: 'Dürüm', desc: 'Im Lavasbrot gerollt', price: 9.0, emoji: '🌯' },
  { id: 'teller', label: 'Teller', desc: 'Mit Pommes', price: 12.0, emoji: '🍽️' },
  { id: 'box', label: 'Box', desc: 'Mit Pommes & Soße', price: 8.0, emoji: '🥡' },
];
const MEATS = [
  { id: 'kalb', label: 'Kalbfleisch', extra: 0, emoji: '🥩' },
  { id: 'haehnchen', label: 'Hähnchen', extra: 0, emoji: '🍗' },
  { id: 'gemischt', label: 'Gemischt', extra: 0.5, emoji: '🍖' },
  { id: 'steak', label: 'Steakfleisch', extra: 2.0, emoji: '🔥' },
  { id: 'falafel', label: 'Falafel (vegetarisch)', extra: -1.0, emoji: '🧆' },
];
const SAUCES = [
  { id: 'knoblauch', label: 'Knoblauchsoße' }, { id: 'hollandaise', label: 'Hollandaise' },
  { id: 'scharf', label: 'Scharfe Soße' }, { id: 'joghurt', label: 'Joghurtsoße' }, { id: 'ohne', label: 'Ohne Soße' },
];
const BUILDER_EXTRAS = [
  { id: 'kaese', label: 'Käse', price: 1.0 }, { id: 'peperoni', label: 'Peperoni', price: 1.0 },
  { id: 'zwiebeln', label: 'Zwiebeln', price: 0 }, { id: 'tomaten', label: 'Tomaten', price: 0 },
  { id: 'rotkohl', label: 'Rotkohl', price: 0 }, { id: 'mais', label: 'Mais', price: 1.0 },
  { id: 'extrafleisch', label: 'Extra Fleisch', price: 1.0 },
];
function OptionCard({ selected, onClick, children }) {
  return (
    <button onClick={onClick} className="w-full text-left px-4 py-3.5 rounded-xl flex items-center justify-between" style={selected ? { background: ORANGE, color: '#fff' } : { background: '#fff', color: GREEN, border: '1px solid #e3d5bd' }}>
      {children}{selected && <Check size={18} />}
    </button>
  );
}
function DonerBuilderView({ back, go }) {
  const { t, lang, installPrompt, onInstall } = React.useContext(LangContext);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [base, setBase] = useState(null);
  const [meat, setMeat] = useState(null);
  const [sauce, setSauce] = useState(null);
  const [extras, setExtras] = useState([]);
  const [name, setName] = useState('');
  const [showWheel, setShowWheel] = useState(false);
  const [wheelResult, setWheelResult] = useState(null);
  const [sent, setSent] = useState(false);
  const [burst, setBurst] = useState(false);
  const handleSend = () => { setBurst(true); setSent(true); setTimeout(() => setBurst(false), 5200); };
  const resetBuilder = () => { setStarted(false); setStep(0); setBase(null); setMeat(null); setSauce(null); setExtras([]); setName(''); setWheelResult(null); setSent(false); setShowWheel(false); };

  const toggleExtra = (id) => setExtras((e) => (e.includes(id) ? e.filter((x) => x !== id) : [...e, id]));

  const total = useMemo(() => {
    let t = (base?.price || 0) + (meat?.extra || 0);
    extras.forEach((id) => { const ex = BUILDER_EXTRAS.find((e) => e.id === id); if (ex) t += ex.price; });
    return Math.max(t, 0);
  }, [base, meat, extras]);

  const canNext = [!!base, !!meat, !!sauce, true, false][step];
  const totalSteps = 4;

  const waLink = useMemo(() => {
    if (!base || !meat || !sauce) return null;
    let msg = `Hallo Bodrum Kebap Vechta, ich möchte mir gerne meinen Döner selbst zusammenstellen:\n\n`;
    msg += `🌯 Basis: ${base.label}\n🍖 Fleisch: ${meat.label}\n🧂 Soße: ${SAUCES.find((s) => s.id === sauce)?.label}\n`;
    if (extras.length > 0) msg += `➕ Extras: ${extras.map((id) => BUILDER_EXTRAS.find((e) => e.id === id)?.label).join(', ')}\n`;
    msg += `\nPreis: ${fmt(total)}\n`;
    if (name) msg += `\nName: ${name}`;
    if (wheelResult && wheelResult.code) msg += `\n\n🎁 Glücksrad-Gewinn: ${wheelResult.prize} (Code: ${wheelResult.code})`;
    msg += `\n\n(Abholung, keine Lieferung) Bitte sagt mir kurz, wann die Bestellung abholbereit ist. Danke!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [base, meat, sauce, extras, name, total, wheelResult]);

  return (
    <div className="pb-10">
      <div style={{ background: GREEN }}><TopBar onHome={back} title={t('titleBuilder')} /></div>
      {!started && (
        <div className="px-5 pt-4">
          <h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('chooseCreationTitle')}</h2>
          <p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('chooseCreationSub')}</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => setStarted(true)} className="rounded-2xl overflow-hidden relative h-28 text-left" style={{ boxShadow: '0 8px 20px rgba(21,56,38,.15)' }}>
              <img src={DOENER_SPIESS_IMG} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center px-5" style={{ background: 'linear-gradient(90deg, rgba(21,56,38,.82), rgba(21,56,38,.25))' }}>
                <span className="text-white font-black text-lg">🥙 {t('buildDoener')}</span>
              </div>
            </button>
            <button onClick={() => go('whatsapp', { categoryMode: 'pizza' })} className="rounded-2xl overflow-hidden relative h-28 text-left" style={{ boxShadow: '0 8px 20px rgba(21,56,38,.15)' }}>
              <img src={PIZZA_KAESE_IMG} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center px-5" style={{ background: 'linear-gradient(90deg, rgba(21,56,38,.82), rgba(21,56,38,.25))' }}>
                <span className="text-white font-black text-lg">🍕 {t('buildPizza')}</span>
              </div>
            </button>
            <button onClick={() => go('whatsapp', { categoryMode: 'nudeln' })} className="rounded-2xl overflow-hidden relative h-28 text-left" style={{ boxShadow: '0 8px 20px rgba(21,56,38,.15)' }}>
              <img src={PENNE_IMG} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center px-5" style={{ background: 'linear-gradient(90deg, rgba(21,56,38,.82), rgba(21,56,38,.25))' }}>
                <span className="text-white font-black text-lg">🍝 {t('buildPasta')}</span>
              </div>
            </button>
          </div>
        </div>
      )}
      {started && step < totalSteps && (
        <div className="flex items-center gap-2 px-5 mb-2">
          {Array.from({ length: totalSteps }).map((_, i) => <div key={i} className="h-1.5 rounded-full flex-1" style={{ background: i <= step ? ORANGE : '#e3d5bd' }} />)}
        </div>
      )}
      {started && (
      <div className="px-5 pt-3">
        {step === 0 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('chooseBase')}</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('chooseBaseSub')}</p>
          <div className="flex flex-col gap-2.5">{BASES.map((b) => (<OptionCard key={b.id} selected={base?.id === b.id} onClick={() => setBase(b)}><span className="font-bold text-sm flex items-center gap-2.5"><span className="text-lg">{b.emoji}</span> {mx(b.label, lang)}<span className="text-xs font-medium opacity-80">· {mx(b.desc, lang)}</span></span></OptionCard>))}</div></div>)}
        {step === 1 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('chooseMeatQ')}</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('chooseMeatTitle')}</p>
          <div className="flex flex-col gap-2.5">{MEATS.map((m) => (<OptionCard key={m.id} selected={meat?.id === m.id} onClick={() => setMeat(m)}><span className="font-bold text-sm flex items-center gap-2.5"><span className="text-lg">{m.emoji}</span> {mx(m.label, lang)}{m.extra !== 0 && <span className="text-xs font-medium opacity-80">({m.extra > 0 ? '+' : ''}{fmt(m.extra)})</span>}</span></OptionCard>))}</div></div>)}
        {step === 2 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('chooseSauceTitle')}</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('chooseSauceSub')}</p>
          <div className="flex flex-col gap-2.5">{SAUCES.map((s) => (<OptionCard key={s.id} selected={sauce === s.id} onClick={() => setSauce(s.id)}><span className="font-bold text-sm">{mx(s.label, lang)}</span></OptionCard>))}</div></div>)}
        {step === 3 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('extrasQ')}</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('chooseExtrasSub')}</p>
          <div className="grid grid-cols-2 gap-2.5">{BUILDER_EXTRAS.map((e) => { const sel = extras.includes(e.id); return (<button key={e.id} onClick={() => toggleExtra(e.id)} className="px-3.5 py-3 rounded-xl text-left" style={sel ? { background: ORANGE, color: '#fff' } : { background: '#fff', color: GREEN, border: '1px solid #e3d5bd' }}><div className="font-bold text-sm">{mx(e.label, lang)}</div><div className="text-[11px] font-medium opacity-80 mt-0.5">{e.price > 0 ? `+${fmt(e.price)}` : t('freeLabel')}</div></button>); })}</div></div>)}
        {step === totalSteps && !showWheel && !sent && (
          <div>
            <h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('doenerReadyTitle')}</h2>
            <p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('doenerReadySub')}</p>
            <div className="bg-white rounded-xl p-5 mb-4" style={{ borderLeft: `4px solid ${ORANGE}` }}>
              <Row label={t('rowBasis')} value={mx(base?.label, lang)} /><Row label={t('rowMeat')} value={mx(meat?.label, lang)} /><Row label={t('rowSauce')} value={mx(SAUCES.find((s) => s.id === sauce)?.label, lang)} />
              {extras.length > 0 && <Row label={t('rowExtras')} value={extras.map((id) => mx(BUILDER_EXTRAS.find((e) => e.id === id)?.label, lang)).join(', ')} />}
              <div className="flex justify-between items-center pt-3 mt-2" style={{ borderTop: '1px dashed #e3d5bd' }}><span className="text-sm font-semibold" style={{ color: '#7c6d55' }}>{t('rowPrice')}</span><span className="text-xl font-black" style={{ color: GREEN }}>{fmt(total)}</span></div>
            </div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('yourName')} className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none mb-3" style={{ background: '#fff', border: '1px solid #e3d5bd', color: GREEN }} />

            {!wheelResult && total >= 30 && (
              <div className="mb-4"><WheelPromoBanner onClick={() => setShowWheel(true)} /></div>
            )}
            {!wheelResult && total < 30 && (
              <div className="mb-4 text-center text-xs font-semibold px-4 py-2.5 rounded-xl" style={{ background: '#f7f0e2', color: '#8a7c62' }}>
                {t('wheelThresholdPrefix')} {fmt(30 - total)} {t('wheelThresholdSuffix')}
              </div>
            )}
            {wheelResult && wheelResult.code && (
              <div className="w-full mb-4 px-4 py-3 rounded-xl flex items-center gap-2" style={{ background: GREEN, animation: 'popIn .5s ease' }}>
                <Gift size={16} color={GOLD} /><span className="text-xs font-bold" style={{ color: GOLD }}>{t('wonPrefix')} {mx(wheelResult.prize, lang)} {t('wonSuffix')}</span>
              </div>
            )}

            <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={handleSend} className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mb-3" style={{ background: 'linear-gradient(135deg, #25D366, #1fb855)', color: '#fff', boxShadow: '0 8px 22px rgba(37,211,102,.4)' }}><MessageCircle size={18} /> {t('waSend')}</a>
          </div>
        )}
      </div>
      )}
      {started && step === totalSteps && sent && (
        <div className="px-5 flex flex-col items-center justify-center text-center py-10 relative">
          {burst && <EmojiConfetti emojis={['🎉', '🥙', '✅', '⭐', '🎊']} />}
          <div className="rounded-full flex items-center justify-center mb-5" style={{ width: 84, height: 84, background: '#e8f9ee', animation: 'popIn .65s cubic-bezier(.34,1.56,.64,1) both, ringPulse 1.8s ease-out .5s infinite' }}>
            <span className="text-5xl">✅</span>
          </div>
          <div className="font-black text-xl mb-2" style={{ color: GREEN, animation: 'slideUpFade .5s ease .15s both' }}>{t('orderSentTitle')}</div>
          <p className="text-sm mb-8" style={{ color: '#7c6d55', animation: 'slideUpFade .5s ease .3s both' }}>{t('orderSentSub')}</p>
          <div className="w-full flex flex-col gap-3" style={{ animation: 'slideUpFade .5s ease .45s both' }}>
            <button onClick={resetBuilder} className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: ORANGE }}>{t('newOrderBtn')}</button>
            <button onClick={back} className="w-full py-3.5 rounded-xl font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('backToHomeBtn')}</button>
            {installPrompt && (
              <button onClick={onInstall} className="w-full py-3 rounded-xl font-semibold text-xs" style={{ background: '#fdecd4', color: '#8a5a1f', border: '1px solid #f0d4a8' }}>{t('installAppBtn')}</button>
            )}
          </div>
        </div>
      )}
      {started && step === totalSteps && showWheel && (
        <div className="px-5">
          <button onClick={() => setShowWheel(false)} className="mb-4 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: '#f0e5cf', color: GREEN }}><ArrowLeft size={13} /> {t('backToOrder')}</button>
          <h2 className="font-black text-xl mb-1 text-center" style={{ color: GREEN }}>{t('wheelTitle')}</h2>
          <p className="text-sm mb-5 text-center" style={{ color: '#7c6d55' }}>{t('wheelSpinOnceMsg')}</p>
          <WheelWidget compact onWin={(res) => setWheelResult(res)} />
          {wheelResult && (
            <button onClick={() => setShowWheel(false)} className="mt-4 w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN }}>{t('continueToOrder')}</button>
          )}
        </div>
      )}
      {started && step < totalSteps && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[360px]">
          <button onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-xl disabled:opacity-40" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('continueBtn')} <ArrowRight size={18} /></button>
        </div>
      )}
    </div>
  );
}
function Row({ label, value }) {
  return <div className="flex justify-between items-start py-1.5 gap-3"><span className="text-xs font-semibold flex-shrink-0" style={{ color: '#a4906c' }}>{label}</span><span className="text-sm font-bold text-right" style={{ color: GREEN }}>{value}</span></div>;
}

/* ============ GROUP ORDER ============ */
function makeGroupCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = ''; for (let i = 0; i < 5; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
function GroupOrderView({ back }) {
  const { lang, t, installPrompt, onInstall } = React.useContext(LangContext);
  const [view, setView] = useState('home');
  const [code, setCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [name, setName] = useState('');
  const [tab, setTab] = useState(MENU[0].key);
  const [localCart, setLocalCart] = useState({});
  const [group, setGroup] = useState(null);
  const [err, setErr] = useState('');
  const [showWheel, setShowWheel] = useState(false);
  const [wheelResult, setWheelResult] = useState(null);
  const [openExtra, setOpenExtra] = useState(null);
  const [configExtras, setConfigExtras] = useState([]);
  const [configNote, setConfigNote] = useState('');
  const [itemNotes, setItemNotes] = useState({});
  const [burst, setBurst] = useState(false);
  const [bigBurst, setBigBurst] = useState(false);

  const loadGroup = async (c) => { const data = await safeGet(`grouporder:${c}`); setGroup(data || { code: c, people: [] }); };
  useEffect(() => {
    if (view === 'order' || view === 'summary') {
      loadGroup(code);
      const t = setInterval(() => loadGroup(code), 4000);
      return () => clearInterval(t);
    }
  }, [view, code]);

  const startGroup = async () => { const c = makeGroupCode(); await safeSet(`grouporder:${c}`, { code: c, people: [] }); setCode(c); setView('create'); };
  const joinGroup = async () => {
    const c = codeInput.trim().toUpperCase(); if (c.length < 4) return;
    const data = await safeGet(`grouporder:${c}`);
    if (!data) { setErr('Diesen Code gibt es nicht.'); return; }
    setErr(''); setCode(c); setGroup(data); setView('name');
  };
  const addLocal = (id, label, price, deLabel) => setLocalCart((c) => ({ ...c, [id]: { name: label, deName: deLabel || label, price, qty: (c[id]?.qty || 0) + 1 } }));
  const removeLocal = (id) => setLocalCart((c) => { const ex = c[id]; if (!ex) return c; if (ex.qty <= 1) { const cp = { ...c }; delete cp[id]; return cp; } return { ...c, [id]: { ...ex, qty: ex.qty - 1 } }; });
  const myLines = Object.entries(localCart);
  const myTotal = myLines.reduce((s, [, v]) => s + v.qty * v.price, 0);
  const submitMyOrder = async () => {
    if (myLines.length === 0) return;
    const fresh = (await safeGet(`grouporder:${code}`)) || { code, people: [] };
    const people = fresh.people.filter((p) => p.name !== name);
    people.push({ name, items: myLines.map(([key, v]) => ({ name: itemNotes[key] ? `${v.deName || v.name} – ${itemNotes[key]}` : (v.deName || v.name), price: v.price, qty: v.qty })), total: myTotal });
    const updated = { ...fresh, people };
    await safeSet(`grouporder:${code}`, updated); setGroup(updated); setView('summary');
    setBurst(true); setTimeout(() => setBurst(false), 5200);
  };
  const grandTotal = useMemo(() => (group ? group.people.reduce((s, p) => s + p.total, 0) : 0), [group]);
  const waFinalLink = useMemo(() => {
    if (!group || group.people.length === 0) return null;
    let msg = `Hallo Bodrum Kebap Vechta, Gruppenbestellung (Code ${code}):\n`;
    group.people.forEach((p) => { msg += `\n👤 ${p.name}:\n`; p.items.forEach((it) => { msg += `  • ${it.qty}x ${it.name} (${fmt(it.qty * it.price)})\n`; }); });
    msg += `\nGesamt: ${fmt(grandTotal)}\n`;
    if (group.wheelPrizes && group.wheelPrizes.length > 0) {
      msg += `\n🎁 Glücksrad-Gewinne:\n`;
      group.wheelPrizes.forEach((w) => { msg += `  • ${w.name}: ${w.prize} (Code: ${w.code})\n`; });
    }
    msg += `\n(Abholung, keine Lieferung) Bitte sagt uns, wann es abholbereit ist. Danke!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [group, grandTotal, code]);
  const [justSent, setJustSent] = useState(false);
  const markSent = async () => {
    const fresh = (await safeGet(`grouporder:${code}`)) || group;
    if (fresh?.sentBy) { setGroup(fresh); return; }
    const updated = { ...fresh, sentBy: name, sentAt: Date.now() };
    await safeSet(`grouporder:${code}`, updated);
    setGroup(updated);
    setBigBurst(true); setJustSent(true); setTimeout(() => setBigBurst(false), 5200);
  };
  const resetGroupOrder = () => {
    setView('home'); setCode(''); setCodeInput(''); setName(''); setLocalCart({}); setGroup(null); setErr('');
    setShowWheel(false); setWheelResult(null); setItemNotes({}); setJustSent(false);
  };
  const onGroupWheelWin = async (res) => {
    setWheelResult(res);
    const fresh = (await safeGet(`grouporder:${code}`)) || group;
    const already = (fresh.wheelPrizes || []).some((w) => w.name === name);
    const wheelPrizes = already ? fresh.wheelPrizes : [...(fresh.wheelPrizes || []), { name, prize: res.prize, code: res.code }];
    const updated = { ...fresh, wheelPrizes };
    await safeSet(`grouporder:${code}`, updated);
    setGroup(updated);
  };
  const activeCategory = MENU.find((m) => m.key === tab);

  return (
    <div className="pb-24 relative">
      {burst && <EmojiConfetti emojis={['🎉', '🥙', '✅', '⭐']} />}
      {bigBurst && <EmojiConfetti emojis={['🎉', '🎊', '📲', '🥙', '⭐', '🔥']} />}
      <div style={{ background: GREEN }}><TopBar onHome={back} title={t('titleGroup')} /></div>

      {view === 'home' && (
        <div className="px-5 pt-4 flex flex-col gap-3">
          <button onClick={startGroup} className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-bold text-base" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}><Plus size={20} /> {t('groupStartBtn')}</button>
          <button onClick={() => setView('join')} className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-bold text-base" style={{ background: '#f0e5cf', color: GREEN }}><Users size={20} /> {t('groupJoin')}</button>

          <div className="rounded-2xl p-5 mt-4" style={{ background: '#f7f0e2' }}>
            <div className="font-black text-sm mb-3" style={{ color: GREEN }}>{t('howItWorks')}</div>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs" style={{ background: GREEN, color: GOLD }}>1</div>
                <p className="text-sm font-medium" style={{ color: '#3f3524' }}>{t('groupStep1Start')} <b>{t('groupStartBtn')}</b> {t('groupStep1End')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs" style={{ background: GREEN, color: GOLD }}>2</div>
                <p className="text-sm font-medium" style={{ color: '#3f3524' }}>{t('groupStep2')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs" style={{ background: GREEN, color: GOLD }}>3</div>
                <p className="text-sm font-medium" style={{ color: '#3f3524' }}>{t('groupStep3Start')} <b>{t('groupStep3Btn')}</b>{t('groupStep3End')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs" style={{ background: GREEN, color: GOLD }}>4</div>
                <p className="text-sm font-medium" style={{ color: '#3f3524' }}>{t('groupStep4')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {view === 'join' && (
        <div className="px-5 pt-4">
          <input value={codeInput} onChange={(e) => { setCodeInput(e.target.value.toUpperCase()); setErr(''); }} placeholder={t('codePlaceholder')} className="w-full px-4 py-3.5 rounded-xl text-lg font-bold tracking-[0.25em] text-center outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
          {err && <p className="text-sm font-semibold mb-3" style={{ color: CHILI }}>{err}</p>}
          <button onClick={joinGroup} className="w-full py-3.5 rounded-xl font-bold text-base" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('joinBtn')}</button>
        </div>
      )}
      {view === 'create' && (
        <div className="px-5 pt-4 text-center">
          <p className="text-sm mb-4" style={{ color: '#7c6d55' }}>{t('shareCodeWithGroup')}</p>
          <div className="rounded-2xl py-6 mb-4" style={{ background: '#f7f0e2' }}><div className="text-4xl font-black tracking-[0.3em]" style={{ color: GREEN }}>{code}</div></div>
          <button onClick={() => setView('name')} className="w-full py-3.5 rounded-xl font-bold text-base" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('continueToMyOrder')}</button>
        </div>
      )}
      {view === 'name' && (
        <div className="px-5 pt-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('yourName')} className="w-full px-4 py-3.5 rounded-xl text-base font-semibold outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
          <button onClick={() => name && setView('order')} disabled={!name} className="w-full py-3.5 rounded-xl font-bold text-base disabled:opacity-50" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('continueToMenu')}</button>
        </div>
      )}
      {view === 'order' && (
        <div>
          <div className="flex gap-2 overflow-x-auto px-5 pt-2 pb-2">
            {MENU.map((m) => (<button key={m.key} onClick={() => setTab(m.key)} className="flex-none px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap" style={tab === m.key ? { background: GREEN, color: GOLD } : { background: 'transparent', color: GREEN, border: `1.5px solid ${GREEN}` }}>{CATEGORY_ICONS[m.key]} {catLabel(m.key, lang)}</button>))}
          </div>
          {CATEGORY_IMAGES[tab] && (
            <div className="px-5 pt-2">
              <div className="rounded-2xl overflow-hidden relative h-28" style={{ boxShadow: '0 8px 20px rgba(21,56,38,.15)' }}>
                <img src={CATEGORY_IMAGES[tab]} className="w-full h-full object-cover" alt={catLabel(tab, lang)} />
                <div className="absolute inset-0 flex items-end p-3" style={{ background: 'linear-gradient(0deg, rgba(21,56,38,.75), rgba(21,56,38,.05))' }}>
                  <span className="text-white font-black text-lg">{CATEGORY_ICONS[tab]} {catLabel(tab, lang)}</span>
                </div>
              </div>
            </div>
          )}
          <div className="px-5 pt-2 grid md:grid-cols-2 xl:grid-cols-3 gap-2.5 items-start">
            {activeCategory.items.map((item) => {
              if (item.priceSmall !== undefined) {
                const isOpen = openExtra?.itemId === item.id;
                const size = openExtra?.size;
                const basePrice = size === 'klein' ? item.priceSmall : item.priceLarge;
                const configTotal = isOpen ? basePrice + configExtras.length * 1.0 : 0;
                const openFor = (sz) => { setOpenExtra({ itemId: item.id, size: sz }); setConfigExtras([]); setConfigNote(''); };
                const toggleExtra = (t) => setConfigExtras((ex) => (ex.includes(t) ? ex.filter((x) => x !== t) : [...ex, t]));
                const confirmAdd = () => {
                  const sizeLabel = size === 'klein' ? 'klein' : 'groß';
                  const displaySizeLabel = size === 'klein' ? t('sizeSmall') : t('sizeLarge');
                  let deLabel = configExtras.length > 0 ? `${item.name} (${sizeLabel}) ${configExtras.map((e) => `+${e}`).join(' ')}` : `${item.name} (${sizeLabel})`;
                  let displayLabel = configExtras.length > 0 ? `${mx(item.name, lang)} (${displaySizeLabel}) ${configExtras.map((e) => `+${mx(e, lang)}`).join(' ')}` : `${mx(item.name, lang)} (${displaySizeLabel})`;
                  if (configNote.trim()) { deLabel += ` [${configNote.trim()}]`; displayLabel += ` [${configNote.trim()}]`; }
                  const lineKey = `${item.id}-${size}-${configExtras.slice().sort().join('_') || 'ohne'}`;
                  addLocal(lineKey, displayLabel, configTotal, deLabel);
                  setOpenExtra(null); setConfigExtras([]); setConfigNote('');
                };
                return (
                  <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                    {item.img && <img src={item.img} alt={item.name} className="w-full h-36 object-cover" loading="lazy" />}
                    <div className="p-3.5">
                    <div className="font-bold text-sm mb-1" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{mx(item.name, lang)}{item.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}</div>
                    {item.desc && <div className="text-[11px] font-medium mb-2" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}
                    <div className="flex gap-2">
                      <button onClick={() => openFor('klein')} className="flex-1 px-2.5 py-2.5 rounded-lg text-[11px] font-bold" style={isOpen && size === 'klein' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{t('sizeSmall')} · {fmt(item.priceSmall)}</button>
                      <button onClick={() => openFor('gross')} className="flex-1 px-2.5 py-2.5 rounded-lg text-[11px] font-bold" style={isOpen && size === 'gross' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{t('sizeLarge')} · {fmt(item.priceLarge)}</button>
                    </div>
                    {isOpen && (
                      <div className="mt-3 pt-3" style={{ borderTop: '1px dashed #e3d5bd' }}>
                        <div className="text-[11px] font-bold mb-2" style={{ color: '#8a5a1f' }}>{t('extrasPricePrefix')} {fmt(1.0)}):</div>
                        <div className="grid grid-cols-3 gap-1.5 mb-3">
                          {EXTRA_TOPPINGS.map((top) => (
                            <button key={top} onClick={() => toggleExtra(top)} className="px-2 py-1.5 rounded-lg text-[10.5px] font-bold" style={configExtras.includes(top) ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>{mx(top, lang)}</button>
                          ))}
                        </div>
                        <input
                          value={configNote}
                          onChange={(e) => setConfigNote(e.target.value)}
                          placeholder={t('noteExampleCheese')}
                          className="w-full mb-3 px-3 py-2 rounded-lg text-[11px] font-medium outline-none"
                          style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
                        />
                        <div className="flex items-center gap-2">
                          <button onClick={() => { setOpenExtra(null); setConfigExtras([]); setConfigNote(''); }} className="px-4 py-2.5 rounded-lg text-xs font-semibold" style={{ background: '#f0e5cf', color: GREEN }}>{t('abbrechen')}</button>
                          <button onClick={confirmAdd} className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: ORANGE }}>{t('hinzufuegen')} · {fmt(configTotal)}</button>
                        </div>
                      </div>
                    )}
                    </div>
                  </div>
                );
              }
              if (item.customPizza || item.customPasta) {
                const isOpen = openExtra?.itemId === item.id;
                const toppings = item.customPizza ? EXTRA_TOPPINGS : PASTA_TOPPINGS;
                const extraCost = (top) => (top === 'Bolognese-Soße' ? 0.5 : (top === 'Tomatensoße' || top === 'Sahnesoße') ? 0 : 1.0);
                const configTotal = isOpen ? item.price + configExtras.reduce((s, e) => s + extraCost(e), 0) : 0;
                const openFor = () => { setOpenExtra({ itemId: item.id }); setConfigExtras([]); setConfigNote(''); };
                const toggleExtra = (top) => setConfigExtras((ex) => (ex.includes(top) ? ex.filter((x) => x !== top) : [...ex, top]));
                const confirmAdd = () => {
                  let deLabel = configExtras.length > 0 ? `${item.name} ${configExtras.map((e) => `+${e}`).join(' ')}` : `${item.name}`;
                  let displayLabel = configExtras.length > 0 ? `${mx(item.name, lang)} ${configExtras.map((e) => `+${mx(e, lang)}`).join(' ')}` : `${mx(item.name, lang)}`;
                  if (configNote.trim()) { deLabel += ` [${configNote.trim()}]`; displayLabel += ` [${configNote.trim()}]`; }
                  const lineKey = `${item.id}-${configExtras.slice().sort().join('_') || 'ohne'}`;
                  addLocal(lineKey, displayLabel, configTotal, deLabel);
                  setOpenExtra(null); setConfigExtras([]); setConfigNote('');
                };
                return (
                  <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ borderLeft: `4px solid ${GOLD}` }}>
                    <div className="p-3.5">
                      <div className="font-bold text-sm mb-1" style={{ color: GREEN }}>{mx(item.name, lang)}</div>
                      {item.desc && <div className="text-[11px] font-medium mb-2" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}
                      <button onClick={openFor} className="w-full px-2.5 py-2.5 rounded-lg text-[11px] font-bold" style={isOpen ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{t('chooseArrow')} · {fmt(item.price)}</button>
                      {isOpen && (
                        <div className="mt-3 pt-3" style={{ borderTop: '1px dashed #e3d5bd' }}>
                          <div className="text-[11px] font-bold mb-2" style={{ color: '#8a5a1f' }}>{t('rowExtras')}:</div>
                          <div className="grid grid-cols-3 gap-1.5 mb-3">
                            {toppings.map((top) => (
                              <button key={top} onClick={() => toggleExtra(top)} className="px-2 py-1.5 rounded-lg text-[10.5px] font-bold flex flex-col items-center gap-0.5" style={configExtras.includes(top) ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>
                                <span>{mx(top, lang)}</span><span className="opacity-70 text-[9px]">{extraCost(top) > 0 ? `+${fmt(extraCost(top))}` : t('freeLabel')}</span>
                              </button>
                            ))}
                          </div>
                          <input
                            value={configNote}
                            onChange={(e) => setConfigNote(e.target.value)}
                            placeholder={t('noteExampleCheese')}
                            className="w-full mb-3 px-3 py-2 rounded-lg text-[11px] font-medium outline-none"
                            style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
                          />
                          <div className="flex items-center gap-2">
                            <button onClick={() => { setOpenExtra(null); setConfigExtras([]); setConfigNote(''); }} className="px-4 py-2.5 rounded-lg text-xs font-semibold" style={{ background: '#f0e5cf', color: GREEN }}>{t('abbrechen')}</button>
                            <button onClick={confirmAdd} className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: ORANGE }}>{t('toCart')} · {fmt(configTotal)}</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              const qty = localCart[item.id]?.qty || 0;
              return (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                  {item.img && <img src={item.img} alt={item.name} className="w-full h-32 object-cover" loading="lazy" />}
                  <div className="p-3.5">
                  <div className="flex items-center justify-between">
                    <div><div className="font-bold text-sm" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{mx(item.name, lang)}{item.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}</div>{item.desc && <div className="text-[11px] font-medium mt-0.5" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}<div className="text-xs font-semibold mt-1" style={{ color: CHILI }}>{fmt(item.price)}</div></div>
                    <Stepper qty={qty} onAdd={() => addLocal(item.id, mx(item.name, lang), item.price, item.name)} onRemove={() => removeLocal(item.id)} />
                  </div>
                  {qty > 0 && (
                    <input
                      value={itemNotes[item.id] || ''}
                      onChange={(e) => setItemNotes((n) => ({ ...n, [item.id]: e.target.value }))}
                      placeholder={t('noteExampleOnions')}
                      className="w-full mt-2.5 px-3 py-2 rounded-lg text-[11px] font-medium outline-none"
                      style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
                    />
                  )}
                  </div>
                </div>
              );
            })}
          </div>
          {myLines.length > 0 && (
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[360px] rounded-2xl shadow-xl overflow-hidden">
              <button onClick={submitMyOrder} className="w-full px-5 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}><span className="flex items-center gap-2 font-bold text-sm"><ShoppingBag size={18} /> Meine Bestellung abschicken</span><span className="font-black text-base">{fmt(myTotal)}</span></button>
            </div>
          )}
        </div>
      )}
      {view === 'summary' && !showWheel && (
        <div className="px-5 pt-2">
          <div className="mb-4 px-4 py-2.5 rounded-xl text-sm font-semibold text-center" style={{ background: '#fdecd4', color: '#8a5a1f', animation: 'popIn .5s ease' }}>{t('orderAdded')}</div>
          <div className="flex items-center justify-between mb-3"><span className="text-xs font-bold" style={{ color: '#a4906c' }}>{group?.people.length || 0} {t('peopleOrderedSuffix')}</span><button onClick={() => loadGroup(code)} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: '#f0e5cf', color: '#7c6d55' }}><RefreshCw size={12} /> {t('refreshBtn')}</button></div>
          <div className="flex flex-col gap-2.5 mb-4">
            {(group?.people || []).map((p, i) => (<div key={i} className="bg-white rounded-xl p-4"><div className="flex justify-between items-center mb-2"><span className="font-bold text-sm" style={{ color: GREEN }}>👤 {p.name}</span><span className="font-bold text-sm" style={{ color: CHILI }}>{fmt(p.total)}</span></div>{p.items.map((it, j) => (<div key={j} className="text-xs font-medium" style={{ color: '#7c6d55' }}>{it.qty}x {it.name}</div>))}</div>))}
          </div>
          <button onClick={() => setView('order')} className="w-full py-3 rounded-xl font-semibold text-sm mb-3" style={{ background: '#f0e5cf', color: GREEN }}>{t('editMyOrder')}</button>
          {group && group.people.length > 0 && (
            <div className="bg-white rounded-xl p-4">
              <div className="flex justify-between items-center mb-3"><span className="text-sm font-semibold" style={{ color: '#7c6d55' }}>{t('grandTotalAll')}</span><span className="text-lg font-black" style={{ color: GREEN }}>{fmt(grandTotal)}</span></div>
              {!wheelResult && !group.sentBy && grandTotal >= 30 && (
                <div className="mb-3"><WheelPromoBanner onClick={() => setShowWheel(true)} /></div>
              )}
              {!wheelResult && grandTotal < 30 && (
                <div className="mb-3 text-center text-xs font-semibold px-4 py-2.5 rounded-xl" style={{ background: '#f7f0e2', color: '#8a7c62' }}>
                  {t('wheelThresholdPrefix')} {fmt(30 - grandTotal)} {t('wheelThresholdSuffix')}
                </div>
              )}
              {group.wheelPrizes && group.wheelPrizes.length > 0 && (
                <div className="w-full mb-3 px-4 py-3 rounded-xl flex items-center gap-2" style={{ background: GREEN, animation: 'popIn .5s ease' }}>
                  <Gift size={16} color={GOLD} /><span className="text-xs font-bold" style={{ color: GOLD }}>{group.wheelPrizes.length}{t('wheelPrizesCountSuffix')}</span>
                </div>
              )}
              {group.sentBy ? (
                <div className="relative">
                  {justSent && bigBurst && <EmojiConfetti emojis={['🎉', '🥙', '📲', '⭐', '🎊']} />}
                  <div className="w-full py-3.5 rounded-xl font-bold text-sm text-center mb-3" style={{ background: '#f0e5cf', color: GREEN, animation: justSent ? 'popIn .55s cubic-bezier(.34,1.56,.64,1) both' : 'none' }}>
                    ✓ {group.sentBy} {t('groupAlreadySent')}
                  </div>
                  <div className="w-full flex flex-col gap-3" style={{ animation: justSent ? 'slideUpFade .5s ease .2s both' : 'none' }}>
                    <button onClick={resetGroupOrder} className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: ORANGE }}>{t('newOrderBtn')}</button>
                    <button onClick={back} className="w-full py-3.5 rounded-xl font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('backToHomeBtn')}</button>
                    {justSent && installPrompt && (
                      <button onClick={onInstall} className="w-full py-3 rounded-xl font-semibold text-xs" style={{ background: '#fdecd4', color: '#8a5a1f', border: '1px solid #f0d4a8' }}>{t('installAppBtn')}</button>
                    )}
                  </div>
                </div>
              ) : (
                <a href={waFinalLink} target="_blank" rel="noopener noreferrer" onClick={markSent} className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #25D366, #1fb855)', color: '#fff', boxShadow: '0 8px 22px rgba(37,211,102,.4)' }}><MessageCircle size={18} /> {t('groupSendFinal')}</a>
              )}
            </div>
          )}
        </div>
      )}
      {view === 'summary' && showWheel && (
        <div className="px-5 pt-2">
          <button onClick={() => setShowWheel(false)} className="mb-4 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: '#f0e5cf', color: GREEN }}><ArrowLeft size={13} /> {t('backToOverview')}</button>
          <h2 className="font-black text-xl mb-1 text-center" style={{ color: GREEN }}>{t('wheelTitle')}</h2>
          <p className="text-sm mb-5 text-center" style={{ color: '#7c6d55' }}>{t('wheelGrandMsg')}</p>
          <WheelWidget compact onWin={onGroupWheelWin} />
          {wheelResult && (
            <button onClick={() => setShowWheel(false)} className="mt-4 w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN }}>{t('continueToOverview')}</button>
          )}
        </div>
      )}
    </div>
  );
}

/* ============ LUCKY WHEEL (standalone view incl. staff verify) ============ */
function LegalTextView({ back, title, children }) {
  return (
    <div className="pb-16" style={{ background: CREAM, minHeight: '100vh' }}>
      <div style={{ background: GREEN }}><TopBar onHome={back} title={title} /></div>
      <div className="max-w-2xl mx-auto px-5 py-6 text-sm leading-relaxed" style={{ color: '#3f3524' }}>
        {children}
      </div>
    </div>
  );
}

const IMPRESSUM_TEXT = {
  de: {
    heading: 'Angaben gemäß § 5 DDG',
    address: 'Bodrum Kebap Vechta\nInhaber: Lütfü Kutluca\nOyther Straße 37\n49377 Vechta\nDeutschland',
    contactH: 'Kontakt',
    contact: 'Telefon: 04441 / 95 16 104\nE-Mail: bodrumkebapvechta@gmail.com',
    respH: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
    resp: 'Lütfü Kutluca\nOyther Straße 37, 49377 Vechta',
    odrH: 'EU-Streitschlichtung',
    odr: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: ec.europa.eu/consumers/odr. Unsere E-Mail-Adresse finden Sie oben. Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    contentH: 'Haftung für Inhalte',
    content: 'Als Diensteanbieter sind wir für eigene Inhalte auf dieser Website nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.',
    linksH: 'Haftung für Links',
    links: 'Unsere Website enthält Links zu externen Websites Dritter (z. B. WhatsApp, Instagram, Google Maps), auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte können wir keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.',
  },
  en: {
    heading: 'Legal notice pursuant to § 5 DDG (German Digital Services Act)',
    address: 'Bodrum Kebap Vechta\nOwner: Lütfü Kutluca\nOyther Straße 37\n49377 Vechta\nGermany',
    contactH: 'Contact',
    contact: 'Phone: 04441 / 95 16 104\nEmail: bodrumkebapvechta@gmail.com',
    respH: 'Responsible for content pursuant to § 18 (2) MStV',
    resp: 'Lütfü Kutluca\nOyther Straße 37, 49377 Vechta, Germany',
    odrH: 'EU Online Dispute Resolution',
    odr: 'The European Commission provides a platform for online dispute resolution (ODR): ec.europa.eu/consumers/odr. Our email address can be found above. We are not obliged and not willing to take part in dispute resolution proceedings before a consumer arbitration board.',
    contentH: 'Liability for content',
    content: 'As a service provider, we are responsible for our own content on this website under general law. However, we are not obliged to monitor transmitted or stored third-party information. Obligations to remove or block the use of information under general law remain unaffected.',
    linksH: 'Liability for links',
    links: 'Our website contains links to external third-party websites (e.g. WhatsApp, Instagram, Google Maps) over whose content we have no influence. We therefore cannot assume any liability for this external content. The respective provider is always responsible for the content of the linked pages.',
  },
  tr: {
    heading: 'Alman Dijital Hizmetler Kanunu (DDG) § 5 uyarınca yasal bilgiler',
    address: 'Bodrum Kebap Vechta\nİşletme sahibi: Lütfü Kutluca\nOyther Straße 37\n49377 Vechta\nAlmanya',
    contactH: 'İletişim',
    contact: 'Telefon: 04441 / 95 16 104\nE-posta: bodrumkebapvechta@gmail.com',
    respH: 'MStV § 18 Fıkra 2 uyarınca içerikten sorumlu kişi',
    resp: 'Lütfü Kutluca\nOyther Straße 37, 49377 Vechta, Almanya',
    odrH: 'AB Çevrimiçi Uyuşmazlık Çözümü',
    odr: 'Avrupa Komisyonu çevrimiçi uyuşmazlık çözümü (ODR) için bir platform sunmaktadır: ec.europa.eu/consumers/odr. E-posta adresimizi yukarıda bulabilirsiniz. Bir tüketici hakem heyeti önünde uyuşmazlık çözüm sürecine katılma yükümlülüğümüz ve isteğimiz bulunmamaktadır.',
    contentH: 'İçerik sorumluluğu',
    content: 'Hizmet sağlayıcı olarak, bu web sitesindeki kendi içeriklerimizden genel yasalar çerçevesinde sorumluyuz. Ancak iletilen veya depolanan üçüncü taraf bilgilerini izleme yükümlülüğümüz bulunmamaktadır. Genel yasalar kapsamında bilgilerin kaldırılması veya kullanımının engellenmesine ilişkin yükümlülükler bundan etkilenmez.',
    linksH: 'Bağlantılardan sorumluluk',
    links: 'Web sitemiz, içerikleri üzerinde herhangi bir etkimizin olmadığı harici üçüncü taraf web sitelerine (örn. WhatsApp, Instagram, Google Maps) bağlantılar içermektedir. Bu nedenle bu harici içerikler için herhangi bir sorumluluk üstlenemeyiz. Bağlantılı sayfaların içeriğinden her zaman ilgili sağlayıcı sorumludur.',
  },
  ro: {
    heading: 'Informații conform § 5 DDG (Legea germană a serviciilor digitale)',
    address: 'Bodrum Kebap Vechta\nProprietar: Lütfü Kutluca\nOyther Straße 37\n49377 Vechta\nGermania',
    contactH: 'Contact',
    contact: 'Telefon: 04441 / 95 16 104\nE-mail: bodrumkebapvechta@gmail.com',
    respH: 'Responsabil pentru conținut conform § 18 alin. 2 MStV',
    resp: 'Lütfü Kutluca\nOyther Straße 37, 49377 Vechta, Germania',
    odrH: 'Soluționarea online a litigiilor la nivelul UE',
    odr: 'Comisia Europeană pune la dispoziție o platformă pentru soluționarea online a litigiilor (SOL): ec.europa.eu/consumers/odr. Adresa noastră de e-mail se găsește mai sus. Nu suntem obligați și nu suntem dispuși să participăm la proceduri de soluționare a litigiilor în fața unei comisii de arbitraj pentru consumatori.',
    contentH: 'Răspunderea pentru conținut',
    content: 'În calitate de furnizor de servicii, suntem responsabili pentru conținutul propriu de pe acest site conform legilor generale. Cu toate acestea, nu suntem obligați să monitorizăm informațiile transmise sau stocate de la terți. Obligațiile de eliminare sau blocare a utilizării informațiilor conform legilor generale rămân neafectate.',
    linksH: 'Răspunderea pentru linkuri',
    links: 'Site-ul nostru conține linkuri către site-uri externe ale unor terți (de ex. WhatsApp, Instagram, Google Maps), asupra conținutului cărora nu avem nicio influență. Prin urmare, nu ne putem asuma nicio răspundere pentru acest conținut extern. Furnizorul respectiv este întotdeauna responsabil pentru conținutul paginilor conectate.',
  },
  nl: {
    heading: 'Informatie volgens § 5 DDG (Duitse wet digitale diensten)',
    address: 'Bodrum Kebap Vechta\nEigenaar: Lütfü Kutluca\nOyther Straße 37\n49377 Vechta\nDuitsland',
    contactH: 'Contact',
    contact: 'Telefoon: 04441 / 95 16 104\nE-mail: bodrumkebapvechta@gmail.com',
    respH: 'Verantwoordelijk voor de inhoud volgens § 18 lid 2 MStV',
    resp: 'Lütfü Kutluca\nOyther Straße 37, 49377 Vechta, Duitsland',
    odrH: 'Online geschillenbeslechting EU',
    odr: 'De Europese Commissie biedt een platform voor onlinegeschillenbeslechting (ODR): ec.europa.eu/consumers/odr. Ons e-mailadres vindt u hierboven. Wij zijn niet verplicht en niet bereid deel te nemen aan geschillenbeslechtingsprocedures voor een consumentenarbitragecommissie.',
    contentH: 'Aansprakelijkheid voor inhoud',
    content: 'Als dienstverlener zijn wij verantwoordelijk voor onze eigen inhoud op deze website volgens de algemene wetgeving. Wij zijn echter niet verplicht om verzonden of opgeslagen informatie van derden te controleren. Verplichtingen om informatie te verwijderen of het gebruik ervan te blokkeren op grond van de algemene wetgeving blijven onaangetast.',
    linksH: 'Aansprakelijkheid voor links',
    links: 'Onze website bevat links naar externe websites van derden (bijv. WhatsApp, Instagram, Google Maps) waarop wij geen invloed hebben. Wij kunnen daarom geen aansprakelijkheid aanvaarden voor deze externe inhoud. Voor de inhoud van de gelinkte pagina\'s is steeds de betreffende aanbieder verantwoordelijk.',
  },
};

function ImpressumView({ back }) {
  const { lang, t } = React.useContext(LangContext);
  const x = IMPRESSUM_TEXT[lang] || IMPRESSUM_TEXT.de;
  return (
    <LegalTextView back={back} title={t('footerImpressum').toUpperCase()}>
      <h2 className="font-black text-lg mb-3" style={{ color: GREEN }}>{x.heading}</h2>
      <p className="mb-4" style={{ whiteSpace: 'pre-line' }}>{x.address}</p>
      <h3 className="font-bold mb-1.5" style={{ color: GREEN }}>{x.contactH}</h3>
      <p className="mb-4" style={{ whiteSpace: 'pre-line' }}>{x.contact}</p>
      <h3 className="font-bold mb-1.5" style={{ color: GREEN }}>{x.respH}</h3>
      <p className="mb-4" style={{ whiteSpace: 'pre-line' }}>{x.resp}</p>
      <h3 className="font-bold mb-1.5" style={{ color: GREEN }}>{x.odrH}</h3>
      <p className="mb-4">{x.odr}</p>
      <h3 className="font-bold mb-1.5" style={{ color: GREEN }}>{x.contentH}</h3>
      <p className="mb-4">{x.content}</p>
      <h3 className="font-bold mb-1.5" style={{ color: GREEN }}>{x.linksH}</h3>
      <p className="mb-2">{x.links}</p>
    </LegalTextView>
  );
}

const DATENSCHUTZ_TEXT = {
  de: { title: 'Datenschutzerklärung',
    s: [
      { h: '1. Verantwortlicher', p: 'Lütfü Kutluca — Bodrum Kebap Vechta\nOyther Straße 37, 49377 Vechta\nTelefon: 04441 / 95 16 104\nE-Mail: bodrumkebapvechta@gmail.com' },
      { h: '2. Hosting', p: 'Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der Website werden automatisch technische Zugriffsdaten (z. B. IP-Adresse, Datum/Uhrzeit, aufgerufene Seite) durch den Hosting-Anbieter verarbeitet. Dies dient der technischen Bereitstellung und Sicherheit der Website.' },
      { h: '3. Bestellung per WhatsApp', p: 'Wenn Sie über unsere Website eine Bestellung per WhatsApp aufgeben, werden Sie zur WhatsApp-Anwendung von Meta Platforms Ireland Ltd. weitergeleitet. Die dort eingegebenen Daten (z. B. Name, Bestellinhalt) unterliegen der Datenschutzerklärung von WhatsApp/Meta. Wir erhalten nur die von Ihnen gesendete Nachricht.' },
      { h: '4. Treuekarte, Gruppenbestellung & Glücksrad', p: 'Für diese Funktionen wird ein zufällig erzeugter Code gespeichert (keine Namen, keine Telefonnummern). Die Daten werden bei Supabase Inc. in einer Datenbank innerhalb der EU gespeichert und dienen ausschließlich der Funktion dieser Angebote (z. B. Stempelzählung).' },
      { h: '5. Google Maps', p: 'Auf unserer Website ist eine Karte von Google Maps eingebunden. Beim Laden der Karte können Daten (z. B. IP-Adresse) an Google Ireland Limited übertragen werden. Weitere Informationen: Google-Datenschutzerklärung.' },
      { h: '6. Instagram', p: 'Wir verlinken auf unser Instagram-Profil. Beim Anklicken werden Sie zu Instagram (Meta Platforms Ireland Ltd.) weitergeleitet, deren eigene Datenschutzbestimmungen gelten.' },
      { h: '7. Cookies', p: 'Diese Website verwendet keine Tracking- oder Marketing-Cookies. Es werden keine Analysewerkzeuge (z. B. Google Analytics) eingesetzt.' },
      { h: '8. Ihre Rechte', p: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten sowie ein Recht auf Widerspruch. Wenden Sie sich hierzu an die oben genannte Kontaktadresse. Zudem steht Ihnen ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.' },
    ] },
  en: { title: 'Privacy Policy',
    s: [
      { h: '1. Controller', p: 'Lütfü Kutluca — Bodrum Kebap Vechta\nOyther Straße 37, 49377 Vechta, Germany\nPhone: 04441 / 95 16 104\nEmail: bodrumkebapvechta@gmail.com' },
      { h: '2. Hosting', p: 'This website is hosted by Vercel Inc. When you visit the website, technical access data (e.g. IP address, date/time, page accessed) is automatically processed by the hosting provider. This serves the technical provision and security of the website.' },
      { h: '3. Ordering via WhatsApp', p: 'If you place an order via WhatsApp through our website, you will be redirected to the WhatsApp application of Meta Platforms Ireland Ltd. Data entered there (e.g. name, order content) is subject to the WhatsApp/Meta privacy policy. We only receive the message you send.' },
      { h: '4. Loyalty card, group order & lucky wheel', p: 'For these features, a randomly generated code is stored (no names, no phone numbers). The data is stored by Supabase Inc. in a database within the EU and is used exclusively for the operation of these features (e.g. stamp counting).' },
      { h: '5. Google Maps', p: 'A Google Maps map is embedded on our website. When the map loads, data (e.g. IP address) may be transmitted to Google Ireland Limited. More information: Google Privacy Policy.' },
      { h: '6. Instagram', p: 'We link to our Instagram profile. Clicking it will redirect you to Instagram (Meta Platforms Ireland Ltd.), whose own privacy policy applies.' },
      { h: '7. Cookies', p: 'This website does not use tracking or marketing cookies. No analytics tools (e.g. Google Analytics) are used.' },
      { h: '8. Your rights', p: 'You have the right to access, rectify, erase and restrict the processing of your data, as well as a right to object. Please contact the address given above. You also have the right to lodge a complaint with a data protection supervisory authority.' },
    ] },
  tr: { title: 'Gizlilik Politikası',
    s: [
      { h: '1. Sorumlu Kişi', p: 'Lütfü Kutluca — Bodrum Kebap Vechta\nOyther Straße 37, 49377 Vechta, Almanya\nTelefon: 04441 / 95 16 104\nE-posta: bodrumkebapvechta@gmail.com' },
      { h: '2. Hosting', p: 'Bu web sitesi Vercel Inc. tarafından barındırılmaktadır. Web sitesine erişildiğinde, teknik erişim verileri (örn. IP adresi, tarih/saat, erişilen sayfa) otomatik olarak hosting sağlayıcısı tarafından işlenir. Bu, web sitesinin teknik olarak sunulması ve güvenliği amacına hizmet eder.' },
      { h: '3. WhatsApp Üzerinden Sipariş', p: 'Web sitemiz üzerinden WhatsApp ile sipariş verdiğinizde, Meta Platforms Ireland Ltd.\'ye ait WhatsApp uygulamasına yönlendirilirsiniz. Orada girilen veriler (örn. isim, sipariş içeriği) WhatsApp/Meta\'nın gizlilik politikasına tabidir. Biz yalnızca sizin gönderdiğiniz mesajı alırız.' },
      { h: '4. Sadakat Kartı, Grup Siparişi & Şans Çarkı', p: 'Bu özellikler için rastgele oluşturulmuş bir kod saklanır (isim veya telefon numarası saklanmaz). Veriler, Supabase Inc. tarafından AB içindeki bir veritabanında saklanır ve yalnızca bu özelliklerin işlevi için kullanılır (örn. damga sayımı).' },
      { h: '5. Google Haritalar', p: 'Web sitemizde bir Google Haritalar haritası gömülüdür. Harita yüklendiğinde, veriler (örn. IP adresi) Google Ireland Limited\'e aktarılabilir. Daha fazla bilgi: Google Gizlilik Politikası.' },
      { h: '6. Instagram', p: 'Instagram profilimize bağlantı veriyoruz. Tıkladığınızda kendi gizlilik politikaları geçerli olan Instagram\'a (Meta Platforms Ireland Ltd.) yönlendirilirsiniz.' },
      { h: '7. Çerezler', p: 'Bu web sitesi izleme veya pazarlama çerezleri kullanmamaktadır. Herhangi bir analiz aracı (örn. Google Analytics) kullanılmamaktadır.' },
      { h: '8. Haklarınız', p: 'Verilerinize erişim, düzeltme, silme ve işlemenin kısıtlanmasını talep etme hakkına ve itiraz hakkına sahipsiniz. Bunun için yukarıda belirtilen adresle iletişime geçebilirsiniz. Ayrıca bir veri koruma denetim makamına şikayette bulunma hakkınız da vardır.' },
    ] },
  ro: { title: 'Politica de confidențialitate',
    s: [
      { h: '1. Operator de date', p: 'Lütfü Kutluca — Bodrum Kebap Vechta\nOyther Straße 37, 49377 Vechta, Germania\nTelefon: 04441 / 95 16 104\nE-mail: bodrumkebapvechta@gmail.com' },
      { h: '2. Găzduire', p: 'Acest site este găzduit de Vercel Inc. La accesarea site-ului, datele tehnice de acces (de ex. adresa IP, data/ora, pagina accesată) sunt procesate automat de furnizorul de găzduire. Acest lucru servește furnizării tehnice și securității site-ului.' },
      { h: '3. Comandă prin WhatsApp', p: 'Dacă plasați o comandă prin WhatsApp de pe site-ul nostru, veți fi redirecționat către aplicația WhatsApp a Meta Platforms Ireland Ltd. Datele introduse acolo (de ex. nume, conținutul comenzii) sunt supuse politicii de confidențialitate WhatsApp/Meta. Noi primim doar mesajul trimis de dvs.' },
      { h: '4. Card de fidelitate, comandă de grup & roata norocului', p: 'Pentru aceste funcții este stocat un cod generat aleatoriu (fără nume, fără numere de telefon). Datele sunt stocate de Supabase Inc. într-o bază de date din UE și sunt utilizate exclusiv pentru funcționarea acestor oferte (de ex. numărarea ștampilelor).' },
      { h: '5. Google Maps', p: 'Pe site-ul nostru este integrată o hartă Google Maps. La încărcarea hărții, datele (de ex. adresa IP) pot fi transmise către Google Ireland Limited. Mai multe informații: Politica de confidențialitate Google.' },
      { h: '6. Instagram', p: 'Facem trimitere către profilul nostru de Instagram. La accesare veți fi redirecționat către Instagram (Meta Platforms Ireland Ltd.), unde se aplică propriile politici de confidențialitate.' },
      { h: '7. Cookie-uri', p: 'Acest site nu utilizează cookie-uri de urmărire sau marketing. Nu sunt utilizate instrumente de analiză (de ex. Google Analytics).' },
      { h: '8. Drepturile dvs.', p: 'Aveți dreptul de acces, rectificare, ștergere și restricționare a prelucrării datelor dvs., precum și un drept de opoziție. Vă rugăm să contactați adresa menționată mai sus. De asemenea, aveți dreptul de a depune o plângere la o autoritate de supraveghere a protecției datelor.' },
    ] },
  nl: { title: 'Privacyverklaring',
    s: [
      { h: '1. Verwerkingsverantwoordelijke', p: 'Lütfü Kutluca — Bodrum Kebap Vechta\nOyther Straße 37, 49377 Vechta, Duitsland\nTelefoon: 04441 / 95 16 104\nE-mail: bodrumkebapvechta@gmail.com' },
      { h: '2. Hosting', p: 'Deze website wordt gehost door Vercel Inc. Bij het bezoeken van de website worden automatisch technische toegangsgegevens (bijv. IP-adres, datum/tijd, bezochte pagina) verwerkt door de hostingprovider. Dit dient de technische levering en beveiliging van de website.' },
      { h: '3. Bestellen via WhatsApp', p: 'Als u via onze website een bestelling plaatst via WhatsApp, wordt u doorgestuurd naar de WhatsApp-applicatie van Meta Platforms Ireland Ltd. De daar ingevoerde gegevens (bijv. naam, bestelinhoud) vallen onder het privacybeleid van WhatsApp/Meta. Wij ontvangen alleen het door u verzonden bericht.' },
      { h: '4. Spaarkaart, groepsbestelling & geluksrad', p: 'Voor deze functies wordt een willekeurig gegenereerde code opgeslagen (geen namen, geen telefoonnummers). De gegevens worden door Supabase Inc. opgeslagen in een database binnen de EU en worden uitsluitend gebruikt voor de werking van deze functies (bijv. stempeltelling).' },
      { h: '5. Google Maps', p: 'Op onze website is een Google Maps-kaart ingesloten. Bij het laden van de kaart kunnen gegevens (bijv. IP-adres) worden verzonden naar Google Ireland Limited. Meer informatie: Google-privacybeleid.' },
      { h: '6. Instagram', p: 'Wij linken naar ons Instagram-profiel. Als u hierop klikt, wordt u doorgestuurd naar Instagram (Meta Platforms Ireland Ltd.), waar hun eigen privacybeleid van toepassing is.' },
      { h: '7. Cookies', p: 'Deze website gebruikt geen tracking- of marketingcookies. Er worden geen analysetools (bijv. Google Analytics) gebruikt.' },
      { h: '8. Uw rechten', p: 'U heeft recht op inzage, rectificatie, verwijdering en beperking van de verwerking van uw gegevens, evenals een recht van bezwaar. Neem hiervoor contact op met bovengenoemd adres. Daarnaast heeft u het recht om een klacht in te dienen bij een toezichthoudende autoriteit voor gegevensbescherming.' },
    ] },
};

function DatenschutzView({ back }) {
  const { lang, t } = React.useContext(LangContext);
  const x = DATENSCHUTZ_TEXT[lang] || DATENSCHUTZ_TEXT.de;
  return (
    <LegalTextView back={back} title={t('footerDatenschutz').toUpperCase()}>
      <h2 className="font-black text-lg mb-3" style={{ color: GREEN }}>{x.title}</h2>
      {x.s.map((sec, i) => (
        <React.Fragment key={i}>
          <h3 className="font-bold mb-1.5" style={{ color: GREEN }}>{sec.h}</h3>
          <p className="mb-4" style={{ whiteSpace: 'pre-line' }}>{sec.p}</p>
        </React.Fragment>
      ))}
    </LegalTextView>
  );
}

function StaffPanelView({ back }) {
  const { t, lang } = React.useContext(LangContext);
  const [pin, setPin] = useState('');
  const [ok, setOk] = useState(false);
  const [tab, setTab] = useState('stamps'); // stamps | wheel

  const [stampCode, setStampCode] = useState('');
  const [stampCustomer, setStampCustomer] = useState(undefined);
  const [msg, setMsg] = useState('');

  const [wheelCode, setWheelCode] = useState('');
  const [wheelResult, setWheelResult] = useState(undefined);
  const [redeemMsg, setRedeemMsg] = useState('');

  const stampSearch = async () => {
    const c = stampCode.trim().toUpperCase(); if (!c) return;
    setStampCustomer(await safeGet(`loyalty:${c}`));
    setMsg('');
  };
  const addStamp = async () => {
    if (!stampCustomer) return;
    const c = stampCode.trim().toUpperCase();
    const updated = { ...stampCustomer, stamps: stampCustomer.stamps + 1 };
    await safeSet(`loyalty:${c}`, updated); setStampCustomer(updated); setMsg(t('stampAddedMsg'));
  };
  const redeemStamp = async () => {
    if (!stampCustomer || stampCustomer.stamps < LOYALTY_GOAL) return;
    const c = stampCode.trim().toUpperCase();
    const updated = { ...stampCustomer, stamps: stampCustomer.stamps - LOYALTY_GOAL, rewardsRedeemed: (stampCustomer.rewardsRedeemed || 0) + 1 };
    await safeSet(`loyalty:${c}`, updated); setStampCustomer(updated); setMsg(t('freePortionRedeemedMsg'));
  };

  const wheelSearch = async () => {
    const c = wheelCode.trim().toUpperCase(); if (!c) return;
    setWheelResult(await safeGet(`spincode:${c}`)); setRedeemMsg('');
  };
  const wheelRedeem = async () => {
    if (!wheelResult) return;
    const c = wheelCode.trim().toUpperCase();
    const updated = { ...wheelResult, redeemed: true, redeemedAt: new Date().toISOString() };
    await safeSet(`spincode:${c}`, updated); setWheelResult(updated); setRedeemMsg(t('redeemedMsg'));
  };

  return (
    <div className="pb-10">
      <div style={{ background: GREEN }}><TopBar onHome={back} title={t('titleStaff')} /></div>

      {!ok ? (
        <div className="px-5 pt-4">
          <input value={pin} onChange={(e) => setPin(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && pin === '1234' && setOk(true)} type="password" inputMode="numeric" placeholder="PIN ••••" className="w-full px-4 py-3.5 rounded-xl text-lg font-bold tracking-[0.3em] text-center outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
          <button onClick={() => pin === '1234' && setOk(true)} className="w-full py-3.5 rounded-xl font-bold text-base" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('loginBtn')}</button>
          <p className="text-[11px] text-center mt-3" style={{ color: '#a4906c' }}>{t('defaultPinNote')}</p>
        </div>
      ) : (
        <>
          <div className="flex gap-2 px-5 pt-2 pb-4">
            <button onClick={() => setTab('stamps')} className="flex-1 py-2.5 rounded-full text-xs font-bold" style={tab === 'stamps' ? { background: GREEN, color: GOLD } : { background: '#f0e5cf', color: GREEN }}>{t('loyaltyTabLabel')}</button>
            <button onClick={() => setTab('wheel')} className="flex-1 py-2.5 rounded-full text-xs font-bold" style={tab === 'wheel' ? { background: GREEN, color: GOLD } : { background: '#f0e5cf', color: GREEN }}>{t('staffWheelCodeTitle')}</button>
          </div>

          {tab === 'stamps' && (
            <div className="px-5">
              <div className="flex gap-2 mb-4">
                <input value={stampCode} onChange={(e) => setStampCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && stampSearch()} placeholder={t('customerCodePh')} className="flex-1 px-4 py-3 rounded-xl text-base font-bold tracking-[0.1em] outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                <button onClick={stampSearch} className="px-5 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('searchBtn')}</button>
              </div>
              {stampCustomer === null && <p className="text-sm font-semibold text-center" style={{ color: CHILI }}>{t('codeNotFound')}</p>}
              {stampCustomer && (
                <div className="bg-white rounded-xl p-5">
                  <div className="text-lg font-black mb-4" style={{ color: GREEN }}>{stampCustomer.stamps} / {LOYALTY_GOAL} {t('stampsWord')}</div>
                  <StampRow stamps={stampCustomer.stamps} goal={LOYALTY_GOAL} />
                  <div className="flex gap-2 mt-5">
                    <button onClick={addStamp} className="flex-1 py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN }}>{t('addStampBtn')}</button>
                    <button onClick={redeemStamp} disabled={stampCustomer.stamps < LOYALTY_GOAL} className="flex-1 py-3 rounded-xl font-bold text-sm text-white disabled:opacity-40" style={{ background: CHILI }}>{t('redeem')}</button>
                  </div>
                </div>
              )}
              {msg && <p className="text-center text-sm font-bold mt-4" style={{ color: '#8a5a1f' }}>{msg}</p>}
            </div>
          )}

          {tab === 'wheel' && (
            <div className="px-5">
              <div className="flex gap-2 mb-4">
                <input value={wheelCode} onChange={(e) => setWheelCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && wheelSearch()} placeholder={t('prizeCodePh')} className="flex-1 px-4 py-3 rounded-xl text-base font-bold tracking-[0.1em] outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                <button onClick={wheelSearch} className="px-5 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('searchBtn')}</button>
              </div>
              {wheelResult === null && <p className="text-sm font-semibold text-center" style={{ color: CHILI }}>{t('codeNotFound')}</p>}
              {wheelResult && (
                <div className="bg-white rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3"><ShieldCheck size={18} color={wheelResult.redeemed ? '#a4906c' : '#34a065'} /><span className="font-bold text-sm" style={{ color: GREEN }}>{wheelResult.redeemed ? t('alreadyRedeemed') : t('validLabel')}</span></div>
                  <div className="text-lg font-black mb-4" style={{ color: GREEN }}>{mx(wheelResult.prize, lang)}</div>
                  {!wheelResult.redeemed && <button onClick={wheelRedeem} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN }}>{t('confirmRedeem')}</button>}
                  {redeemMsg && <p className="text-center text-sm font-bold mt-3" style={{ color: '#8a5a1f' }}>{redeemMsg}</p>}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ============ LOYALTY (Treuekarte) ============ */
const LOYALTY_GOAL = 8;
function StampRow({ stamps, goal }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {Array.from({ length: goal }).map((_, i) => {
        const filled = i < stamps;
        return (<div key={i} className="aspect-square rounded-full flex items-center justify-center border-2" style={{ background: filled ? ORANGE : 'transparent', borderColor: filled ? ORANGE : '#d8c6a3', borderStyle: filled ? 'solid' : 'dashed' }}>{filled ? <Check size={20} color="#fff" strokeWidth={3} /> : <Flame size={16} color="#d8c6a3" />}</div>);
      })}
    </div>
  );
}
function makeLoyaltyCode() {
  let out = ''; for (let i = 0; i < 4; i++) out += Math.floor(Math.random() * 10);
  return out;
}
function LoyaltyView({ back }) {
  const { t } = React.useContext(LangContext);
  const [codeInput, setCodeInput] = useState('');
  const [customer, setCustomer] = useState(undefined);
  const [justCreated, setJustCreated] = useState(false);

  const openCard = async (code) => {
    const data = await safeGet(`loyalty:${code}`);
    setCustomer(data || null);
  };
  const lookup = async () => {
    const c = codeInput.trim().toUpperCase(); if (!c) return;
    await openCard(c);
  };
  const createNew = async () => {
    let code = makeLoyaltyCode();
    while (await safeGet(`loyalty:${code}`)) code = makeLoyaltyCode();
    const data = { code, stamps: 0, rewardsRedeemed: 0 };
    await safeSet(`loyalty:${code}`, data);
    setCustomer(data);
    setJustCreated(true);
  };

  return (
    <div className="pb-10">
      <div style={{ background: GREEN }}><TopBar onHome={back} title={t('titleLoyalty')} /></div>

      {customer === undefined && (
        <div className="px-5 pt-4">
          <p className="text-sm mb-5 text-center" style={{ color: '#7c6d55' }}>{t('loyaltyNoPhone')}</p>
          <label className="block text-xs font-bold mb-2" style={{ color: '#a4906c' }}>{t('haveCodeLabel')}</label>
          <div className="flex gap-2 mb-6">
            <input value={codeInput} onChange={(e) => setCodeInput(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === 'Enter' && lookup()} placeholder={t('codeExamplePh')} className="flex-1 px-4 py-3 rounded-xl text-base font-bold tracking-[0.15em] outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
            <button onClick={lookup} className="px-5 rounded-xl font-bold text-sm" style={{ background: GREEN, color: GOLD }}>{t('showBtn')}</button>
          </div>
          <div className="text-center text-xs font-semibold mb-3" style={{ color: '#a4906c' }}>{t('orLabel')}</div>
          <button onClick={createNew} className="w-full py-3.5 rounded-xl font-bold text-base" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('createNewCardBtn')}</button>
        </div>
      )}

      {customer === null && (
        <div className="px-5 pt-6 text-center">
          <p className="text-sm font-semibold mb-4" style={{ color: CHILI }}>{t('codeDoesntExist')}</p>
          <button onClick={() => setCustomer(undefined)} className="px-5 py-2.5 rounded-xl font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('zurueck')}</button>
        </div>
      )}

      {customer && (
        <div className="px-5 pt-4">
          {justCreated && (
            <div className="mb-4 px-4 py-3 rounded-xl text-xs font-semibold" style={{ background: '#fdecd4', color: '#8a5a1f', border: '1px solid #f0d4a8' }}>
              {t('screenshotNote')}
            </div>
          )}
          <div className="bg-white rounded-xl p-6" style={{ borderLeft: `5px solid ${ORANGE}` }}>
            <div className="text-center mb-4">
              <div className="text-[11px] font-bold tracking-widest mb-1" style={{ color: '#a4906c' }}>{t('yourCodeLabel')}</div>
              <div className="text-2xl font-black tracking-[0.25em]" style={{ color: GREEN }}>{customer.code}</div>
            </div>
            <div className="text-lg font-black mb-5 text-center" style={{ color: GREEN }}>{customer.stamps} / {LOYALTY_GOAL} {t('stampsWord')}</div>
            <StampRow stamps={customer.stamps} goal={LOYALTY_GOAL} />
            <div className="mt-6 pt-4 text-center" style={{ borderTop: '1px dashed #e3d5bd' }}>
              {customer.stamps >= LOYALTY_GOAL ? <div className="font-bold" style={{ color: CHILI, animation: 'popIn .6s ease' }}>{t('freeItemEarned')}</div> : <div className="text-sm font-semibold" style={{ color: '#7c6d55' }}>{t('stampsUntilFreePrefix')} {LOYALTY_GOAL - customer.stamps} {t('stampsUntilFreeSuffix')}</div>}
            </div>
          </div>
          <p className="text-xs text-center mt-4" style={{ color: '#a4906c' }}>{t('showCodeForStamp')}</p>
        </div>
      )}
    </div>
  );
}

/* ============ APP ============ */
export default function App() {
  const [booted, setBooted] = useState(false);
  const [view, setView] = useState('home');
  const [pendingAction, setPendingAction] = useState(null);
  const go = (v, action) => { if (action) setPendingAction(action); setView(v); };
  const langCtx = useLang();
  const [installPrompt, setInstallPrompt] = useState(null);
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    const onInstalled = () => setInstallPrompt(null);
    window.addEventListener('appinstalled', onInstalled);
    return () => { window.removeEventListener('beforeinstallprompt', handler); window.removeEventListener('appinstalled', onInstalled); };
  }, []);
  const triggerInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  if (!booted) return <SplashScreen onDone={() => setBooted(true)} />;

  const ctxValue = { ...langCtx, installPrompt, onInstall: triggerInstall };

  if (view === 'home') {
    return <LangContext.Provider value={ctxValue}><HomeView go={go} installPrompt={installPrompt} onInstall={triggerInstall} /></LangContext.Provider>;
  }

  return (
    <LangContext.Provider value={ctxValue}>
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: `${GREEN} repeating-linear-gradient(135deg, rgba(255,246,234,.035) 0 40px, rgba(255,246,234,0) 40px 80px)`, fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <style>{`
        @keyframes sideFloat1 { 0%,100%{ transform:translateY(0) rotate(-6deg);} 50%{ transform:translateY(-22px) rotate(6deg);} }
        @keyframes sideFloat2 { 0%,100%{ transform:translateY(0) rotate(5deg);} 50%{ transform:translateY(-30px) rotate(-5deg);} }
        @keyframes sideFloat3 { 0%,100%{ transform:translateY(0) rotate(0deg);} 50%{ transform:translateY(-16px) rotate(10deg);} }
        @keyframes sideSpin { from{ transform:rotate(0deg);} to{ transform:rotate(360deg);} }
        @keyframes viewFade { from{ opacity:0; transform:translateY(14px) scale(.985);} to{ opacity:1; transform:translateY(0) scale(1);} }
        @keyframes popIn { 0%{ opacity:0; transform:scale(.6) rotate(-8deg);} 60%{ opacity:1; transform:scale(1.08) rotate(3deg);} 100%{ opacity:1; transform:scale(1) rotate(0deg);} }
        @keyframes confettiFall { 0%{ transform:translateY(-20px) rotate(0deg); opacity:1;} 80%{ opacity:1;} 100%{ transform:translateY(105vh) rotate(var(--spin, 480deg)); opacity:0;} }
        @keyframes ringPulse { 0%{ box-shadow:0 0 0 0 rgba(37,211,102,.45);} 100%{ box-shadow:0 0 0 30px rgba(37,211,102,0);} }
        @keyframes slideUpFade { from{ opacity:0; transform:translateY(16px);} to{ opacity:1; transform:translateY(0);} }
        @keyframes bottomFloat1 { 0%,100%{ transform:translateY(0) rotate(-6deg);} 50%{ transform:translateY(-14px) rotate(6deg);} }
        @keyframes bottomFloat2 { 0%,100%{ transform:translateY(0) rotate(5deg);} 50%{ transform:translateY(-18px) rotate(-5deg);} }
      `}</style>

      {/* decorative side stripe */}
      <div className="absolute inset-y-0 left-0 w-2" style={{ background: `repeating-linear-gradient(180deg, ${ORANGE} 0 24px, ${GOLD} 24px 48px, #d62828 48px 72px)` }} />
      <div className="absolute inset-y-0 right-0 w-2" style={{ background: `repeating-linear-gradient(180deg, ${ORANGE} 0 24px, ${GOLD} 24px 48px, #d62828 48px 72px)` }} />

      {/* bottom decoration — visible on every screen size, fills the green space below shorter pages */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-8 sm:gap-14 pb-6 opacity-20 pointer-events-none select-none" style={{ zIndex: 0 }}>
        <span style={{ fontSize: 34, animation: 'bottomFloat1 4.5s ease-in-out infinite' }}>🥙</span>
        <span style={{ fontSize: 26, animation: 'sideSpin 8s linear infinite', display: 'inline-block' }}>🍕</span>
        <span style={{ fontSize: 30, animation: 'bottomFloat2 5.2s ease-in-out infinite' }}>🌶️</span>
        <span style={{ fontSize: 26, animation: 'bottomFloat1 5.8s ease-in-out infinite' }}>🥤</span>
        <span style={{ fontSize: 30, animation: 'sideSpin 7s linear infinite reverse', display: 'inline-block' }}>🔥</span>
      </div>

      {/* floating decorations — only visible when there's real side space */}
      <div className="hidden 2xl:flex flex-col items-center gap-10 fixed left-10 top-1/3 opacity-90 pointer-events-none">
        <span style={{ fontSize: 46, animation: 'sideFloat1 5s ease-in-out infinite' }}>🥙</span>
        <span style={{ fontSize: 34, animation: 'sideSpin 9s linear infinite', display: 'inline-block' }}>🍕</span>
        <span style={{ fontSize: 30, animation: 'sideFloat3 4.5s ease-in-out infinite' }}>🌶️</span>
      </div>
      <div className="hidden 2xl:flex flex-col items-center gap-10 fixed right-10 top-1/4 opacity-90 pointer-events-none">
        <span style={{ fontSize: 40, animation: 'sideFloat2 6s ease-in-out infinite' }}>🍔</span>
        <span style={{ fontSize: 30, animation: 'sideFloat1 5.5s ease-in-out infinite' }}>🥤</span>
        <span style={{ fontSize: 36, animation: 'sideSpin 7s linear infinite reverse', display: 'inline-block' }}>🔥</span>
      </div>
      <div className="hidden 2xl:block fixed left-10 bottom-16 opacity-80 pointer-events-none" style={{ fontSize: 12, color: GOLD, fontWeight: 700, letterSpacing: 2, writingMode: 'vertical-rl' }}>
        100% HALAL
      </div>
      <div className="hidden 2xl:block fixed right-10 bottom-16 opacity-80 pointer-events-none" style={{ fontSize: 12, color: GOLD, fontWeight: 700, letterSpacing: 2, writingMode: 'vertical-rl' }}>
        FRISCH VOM DREHSPIESS
      </div>

      <div key={view} className="w-full max-w-5xl mx-auto relative" style={{ background: CREAM, animation: 'viewFade .5s cubic-bezier(.22,1,.36,1)', zIndex: 1 }}>
        {view === 'whatsapp' && <WhatsAppOrderView back={() => setView('home')} initialAction={pendingAction} onConsumeAction={() => setPendingAction(null)} />}
        {view === 'builder' && <DonerBuilderView back={() => setView('home')} go={go} />}
        {view === 'group' && <GroupOrderView back={() => setView('home')} />}
        {view === 'loyalty' && <LoyaltyView back={() => setView('home')} />}
        {view === 'staff' && <StaffPanelView back={() => setView('home')} />}
        {view === 'impressum' && <ImpressumView back={() => setView('home')} />}
        {view === 'datenschutz' && <DatenschutzView back={() => setView('home')} />}
      </div>
    </div>
    </LangContext.Provider>
  );
}
