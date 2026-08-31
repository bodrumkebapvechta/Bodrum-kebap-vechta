import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  Flame, ArrowLeft, ArrowRight, Check, MessageCircle, ChevronLeft, Plus, Minus,
  ShoppingBag, Users, Gift, RotateCw, Lock, ShieldCheck, Phone, RefreshCw,
  Sparkles, User, Copy, Menu as MenuIcon, X, MapPin, Clock3, Instagram, Star, Timer, Heart, Search,
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
const WEB3FORMS_KEY = "4f411a44-2658-4d04-8eef-801d7060fb48";
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
const FRITZ_LIMO_IMG = "/fritz-limo.jpg";
const FRITZ_SPRITZ_TRAUBE_IMG = "/fritz-spritz-traube.jpg";
const FRITZ_SPRITZ_APFEL_IMG = "/fritz-spritz-apfel.jpg";
const FRITZ_KOLA_IMG = "/fritz-kola.jpg";
const FRITZ_KOLA_SUPERZERO_IMG = "/fritz-kola-superzero.jpg";
const FRITZ_MISCHMASCH_IMG = "/fritz-mischmasch.jpg";
const SITE_PHOTOS = [
  { src: TERRACE_IMG, label: 'Terrasse' },
  { src: DOENER_TELLER_IMG, label: 'Döner Teller' },
  { src: SCHNITZEL_IMG, label: 'Schnitzel' },
  { src: SPAGHETTI_IMG, label: 'Spaghetti' },
  { src: FOOD_G1, label: 'Foto 1' },
  { src: FOOD_G2, label: 'Foto 2' },
  { src: FOOD_G3, label: 'Foto 3' },
  { src: FOOD_G4, label: 'Foto 4' },
  { src: DOENER_SPIESS_IMG, label: 'Döner Spieß' },
  { src: CALZONE_IMG, label: 'Calzone' },
  { src: LAHMACUN_IMG, label: 'Lahmacun' },
  { src: PIZZABROETCHEN_IMG, label: 'Pizzabrötchen' },
  { src: PENNE_IMG, label: 'Penne' },
  { src: PIZZA_KAESE_IMG, label: 'Pizza Käse' },
  { src: FALAFEL_IMG, label: 'Falafel' },
  { src: SALAT_BUNT_IMG, label: 'Bunter Salat' },
  { src: BAUERNSALAT_IMG, label: 'Bauernsalat' },
  { src: NUGGETS_IMG, label: 'Nuggets' },
  { src: CHICKEN_STRIPS_IMG, label: 'Chicken Strips' },
  { src: POMMES_IMG, label: 'Pommes' },
  { src: FRITZ_KOLA_IMG, label: 'Fritz Kola' },
  { src: FRITZ_LIMO_IMG, label: 'Fritz Limo' },
  { src: FRITZ_SPRITZ_TRAUBE_IMG, label: 'Fritz Spritz Traube' },
  { src: FRITZ_MISCHMASCH_IMG, label: 'Fritz Mischmasch' },
];

/* ============ I18N ============ */
const LANGS = ['de', 'en', 'tr', 'ro', 'nl', 'sq', 'ku', 'pl'];
// Sipariş akışı (WhatsApp/Sepet/Kurucu/Grup/Çark) geçici olarak kapalı — donanım hazır olunca true yapılabilir.
const ORDERING_ENABLED = false;
const LANG_NAMES = { de: 'Deutsch', en: 'English', tr: 'Türkçe', ro: 'Română', nl: 'Nederlands', sq: 'Shqip', ku: 'Kurdî', pl: 'Polski' };
const LANG_FLAGS = { de: '🇩🇪', en: '🇬🇧', tr: '🇹🇷', ro: '🇷🇴', nl: '🇳🇱', sq: '🇦🇱', ku: '☀️', pl: '🇵🇱' };

const UI = {
  tischMenuKicker: { de: 'TISCHMENÜ', en: 'TABLE MENU', tr: 'MASA MENÜSÜ', ro: 'MENIU DE MASĂ', nl: 'TAFELMENU', sq: 'MENYJA E TRYEZËS', ku: 'MENÛYA MASÊ', pl: 'MENU STOLIKOWE'},
  tischMenuOrderNotice: { de: '🛎️ Zum Bestellen bitte an die Theke kommen', en: '🛎️ Please order at the counter', tr: '🛎️ Sipariş için lütfen kasaya gelin', ro: '🛎️ Pentru comandă, veniți la tejghea', nl: '🛎️ Bestel aan de toonbank', sq: '🛎️ Për porosi, ejani te banaku', ku: '🛎️ Ji kerema xwe re bo sifarişê were qeşetê', pl: '🛎️ Aby zamówić, podejdź do lady'},
  tischMenuFromLabel: { de: 'ab', en: 'from', tr: 'başlangıç', ro: 'de la', nl: 'vanaf', sq: 'nga', ku: 'ji', pl: 'od'},
  tischMenuBackHome: { de: 'Zur Startseite', en: 'Back to homepage', tr: 'Ana sayfaya dön', ro: 'Înapoi la pagina principală', nl: 'Terug naar startpagina', sq: 'Kthehu te faqja kryesore', ku: 'Vegere rûpela sereke', pl: 'Wróć do strony głównej'},
  navExtras: { de: 'Extras', en: 'Extras', tr: 'Ekstralar', ro: 'Extra', nl: 'Extra’s' , sq: 'Ekstra', ku: 'Zêde', pl: 'Dodatki'},
  navMenu: { de: 'Speisekarte', en: 'Menu', tr: 'Menü', ro: 'Meniu', nl: 'Menukaart' , sq: 'Menuja', ku: 'Menû', pl: 'Menu'},
  navGallery: { de: 'Galerie', en: 'Gallery', tr: 'Galeri', ro: 'Galerie', nl: 'Galerij' , sq: 'Galeria', ku: 'Galerî', pl: 'Galeria'},
  navContact: { de: 'Kontakt', en: 'Contact', tr: 'İletişim', ro: 'Contact', nl: 'Contact' , sq: 'Kontakt', ku: 'Têkilî', pl: 'Kontakt'},
  navStaff: { de: 'Personal', en: 'Staff', tr: 'Personel', ro: 'Personal', nl: 'Personeel' , sq: 'Stafi', ku: 'Karmend', pl: 'Personel'},
  navStaffArea: { de: 'Personal-Bereich', en: 'Staff Area', tr: 'Personel Alanı', ro: 'Zonă Personal', nl: 'Personeelsgedeelte' , sq: 'Zona e Stafit', ku: 'Qada Karmendan', pl: 'Strefa personelu'},
  navTrackOrder: { de: 'Bestellung verfolgen', en: 'Track order', tr: 'Siparişi takip et', ro: 'Urmărește comanda', nl: 'Bestelling volgen' , sq: 'Ndiq porosinë', ku: 'Sifarişê bişopîne', pl: 'Śledź zamówienie'},
  titleTrack: { de: 'BESTELLUNG VERFOLGEN', en: 'TRACK ORDER', tr: 'SİPARİŞ TAKİBİ', ro: 'URMĂRIRE COMANDĂ', nl: 'BESTELLING VOLGEN' , sq: 'NDIQ POROSINË', ku: 'SIFARIŞÊ BIŞOPÎNE', pl: 'ŚLEDŹ ZAMÓWIENIE'},
  trackCodePh: { de: 'Bestellcode', en: 'Order code', tr: 'Sipariş kodu', ro: 'Cod comandă', nl: 'Bestelcode' , sq: 'Kodi i porosisë', ku: 'Koda sifarişê', pl: 'Kod zamówienia'},
  trackOrderBtn: { de: 'Bestellung verfolgen', en: 'Track order', tr: 'Siparişi takip et', ro: 'Urmărește comanda', nl: 'Bestelling volgen' , sq: 'Ndiq porosinë', ku: 'Sifarişê bişopîne', pl: 'Śledź zamówienie'},
  orderStatusReady: { de: 'Fertig, komm vorbei! 🎉', en: 'Ready, come pick it up! 🎉', tr: 'Hazır, gelebilirsin! 🎉', ro: 'Gata, poți veni! 🎉', nl: 'Klaar, kom langs! 🎉' , sq: 'Gati, eja merre! 🎉', ku: 'Amade ye, were bigire! 🎉', pl: 'Gotowe, wpadnij! 🎉'},
  orderStatusPreparing: { de: 'Wird zubereitet', en: 'Being prepared', tr: 'Hazırlanıyor', ro: 'Se pregătește', nl: 'Wordt bereid' , sq: 'Po përgatitet', ku: 'Tê amadekirin', pl: 'W przygotowaniu'},
  orderCodeLabel: { de: 'Code', en: 'Code', tr: 'Kod', ro: 'Cod', nl: 'Code' , sq: 'Kodi', ku: 'Kod', pl: 'Kod'},
  staffOrdersTab: { de: 'Bestellungen', en: 'Orders', tr: 'Siparişler', ro: 'Comenzi', nl: 'Bestellingen' , sq: 'Porositë', ku: 'Sifariş', pl: 'Zamówienia'},
  staffSettingsTab: { de: 'Einstellungen', en: 'Settings', tr: 'Ayarlar', ro: 'Setări', nl: 'Instellingen' , sq: 'Cilësimet', ku: 'Mîheng', pl: 'Ustawienia'},
  staffAnalyticsTab: { de: 'Statistik', en: 'Analytics', tr: 'İstatistik', ro: 'Statistici', nl: 'Statistieken' , sq: 'Statistikat', ku: 'Statîstîk', pl: 'Statystyki'},
  staffMenuTab: { de: 'Menü', en: 'Menu', tr: 'Menü', ro: 'Meniu', nl: 'Menu' , sq: 'Menuja', ku: 'Menû', pl: 'Menu'},
  cookieText: { de: 'Diese Website verwendet lokale Speicherung (z.B. Sprachwahl, Favoriten) und anonyme Besucherstatistiken. Keine Weitergabe an Dritte.', en: 'This website uses local storage (e.g. language, favorites) and anonymous visitor statistics. No data is shared with third parties.', tr: 'Bu site yerel depolama (dil seçimi, favoriler gibi) ve anonim ziyaretçi istatistikleri kullanıyor. Veriler üçüncü taraflarla paylaşılmıyor.', ro: 'Acest site folosește stocare locală (limbă, favorite) și statistici anonime de vizitatori. Datele nu sunt partajate cu terți.', nl: 'Deze website gebruikt lokale opslag (taal, favorieten) en anonieme bezoekersstatistieken. Geen gegevens worden gedeeld met derden.', sq: 'Kjo faqe përdor ruajtje lokale (gjuha, të preferuarat) dhe statistika anonime vizitorësh. Të dhënat nuk ndahen me palë të treta.', ku: 'Ev malper cîgirtina herêmî (ziman, hezkirî) û statîstîkên mêvanan bi awayekî anonîm bi kar tîne. Daneyên bi aliyên sêyemîn re nayên parvekirin.', pl: 'Ta strona wykorzystuje pamięć lokalną (język, ulubione) oraz anonimowe statystyki odwiedzin. Dane nie są udostępniane osobom trzecim.' },
  cookieAccept: { de: 'Verstanden', en: 'Got it', tr: 'Anladım', ro: 'Am înțeles', nl: 'Begrepen', sq: 'E kuptova', ku: 'Fêm kir', pl: 'Rozumiem' },
  notifBannerText: { de: '🔔 Verpasse keine Angebote — aktiviere Benachrichtigungen für Aktionen und Neuigkeiten.', en: '🔔 Never miss a deal — turn on notifications for offers and news.', tr: '🔔 Fırsatları kaçırma — kampanya ve haberler için bildirimleri aç.', ro: '🔔 Nu rata nicio ofertă — activează notificările pentru promoții și noutăți.', nl: '🔔 Mis geen aanbiedingen — zet meldingen aan voor acties en nieuws.', sq: '🔔 Mos humb asnjë ofertë — aktivizo njoftimet për oferta dhe lajme.', ku: '🔔 Kirasekê wenda neke — ji bo kampanya û nûçeyan agahdarî çalak bike.', pl: '🔔 Nie przegap okazji — włącz powiadomienia o promocjach i nowościach.' },
  notifBannerNotNow: { de: 'Nicht jetzt', en: 'Not now', tr: 'Şimdi değil', ro: 'Nu acum', nl: 'Niet nu', sq: 'Jo tani', ku: 'Niha na', pl: 'Nie teraz' },
  notifBannerEnable: { de: 'Aktivieren', en: 'Enable', tr: 'Etkinleştir', ro: 'Activează', nl: 'Activeren', sq: 'Aktivizo', ku: 'Çalak bike', pl: 'Włącz' },
  notifBannerIOSText: { de: '🔔 Für Benachrichtigungen auf dem iPhone: Tippe unten auf Teilen ⬆️ → „Zum Home-Bildschirm" und öffne die Seite von dort aus erneut.', en: '🔔 For notifications on iPhone: Tap Share ⬆️ below → "Add to Home Screen", then open the page from there.', tr: '🔔 iPhone\'da bildirimler için: Aşağıdaki Paylaş ⬆️ simgesine dokun → "Ana Ekrana Ekle" ve siteyi oradan tekrar aç.', ro: '🔔 Pentru notificări pe iPhone: Atinge Distribuie ⬆️ mai jos → „Adaugă pe ecranul principal", apoi deschide pagina de acolo.', nl: '🔔 Voor meldingen op iPhone: Tik hieronder op Delen ⬆️ → "Zet op beginscherm" en open de site vandaar opnieuw.', sq: '🔔 Për njoftime në iPhone: Prek Shpërndaj ⬆️ poshtë → "Shto në ekranin kryesor", pastaj hap faqen që andej.', ku: '🔔 Ji bo agahdariyan li ser iPhone: Li jêr li Parvekirinê ⬆️ bitikîne → "Li Ekrana Serekî zêde bike", paşê rûpelê ji wir veke.', pl: '🔔 Aby otrzymywać powiadomienia na iPhone: Stuknij Udostępnij ⬆️ poniżej → "Dodaj do ekranu głównego", a następnie otwórz stronę stamtąd.' },
  notifBannerUnderstood: { de: 'Verstanden', en: 'Got it', tr: 'Anladım', ro: 'Am înțeles', nl: 'Begrepen', sq: 'E kuptova', ku: 'Fêm kir', pl: 'Rozumiem' },
  stoppelmarktText: { de: '🎪 Stoppelmarkt-Woche in Vechta! Besuchen Sie uns – frisch für Sie zubereitet', en: '🎪 Stoppelmarkt week in Vechta! Come visit us – freshly made for you', tr: '🎪 Vechta\'da Stoppelmarkt haftası! Bizi ziyaret edin – sizin için taze hazırlıyoruz', ro: '🎪 Săptămâna Stoppelmarkt în Vechta! Vizitați-ne – preparăm proaspăt pentru dvs.', nl: '🎪 Stoppelmarkt-week in Vechta! Kom langs – vers voor u bereid', sq: '🎪 Java e Stoppelmarkt në Vechta! Na vizitoni – përgatitur i freskët për ju', ku: '🎪 Hefteya Stoppelmarkt li Vechta! Serdana me bikin – ji bo we taze tê amadekirin', pl: '🎪 Tydzień Stoppelmarkt w Vechcie! Odwiedź nas – świeżo przygotowane dla Ciebie' },
  doenerBuildKicker: { de: 'FRISCH ZUBEREITET', en: 'FRESHLY MADE', tr: 'TAZE HAZIRLANIR', ro: 'PREPARAT PROASPĂT', nl: 'VERS BEREID', sq: 'PËRGATITUR I FRESKËT', ku: 'Taze Tê Amadekirin', pl: 'ŚWIEŻO PRZYGOTOWANE' },
  doenerBuildTitle: { de: 'So entsteht dein Döner', en: 'How your döner comes together', tr: 'Dönerin böyle hazırlanır', ro: 'Așa se face döner-ul tău', nl: 'Zo ontstaat jouw döner', sq: 'Kështu bëhet doneri yt', ku: 'Dönera te bi vî rengî çêdibe', pl: 'Tak powstaje Twój kebab' },
  doenerBuildStage1: { de: 'Alles beginnt mit frischem Fladenbrot, warm vom Ofen', en: 'It all starts with fresh flatbread, warm from the oven', tr: 'Her şey fırından sıcak, taze lavaşla başlar', ro: 'Totul începe cu lipie proaspătă, caldă din cuptor', nl: 'Alles begint met vers plat brood, warm uit de oven', sq: 'Gjithçka fillon me bukë të freskët, të ngrohtë nga furra', ku: 'Her tişt bi nanê taze yê ji firnê germ dest pê dike', pl: 'Wszystko zaczyna się od świeżego chleba pita, ciepłego z pieca' },
  doenerBuildStage2: { de: 'Saftiges Fleisch direkt vom Drehspieß', en: 'Juicy meat straight off the rotating spit', tr: 'Şişten yeni çıkan sulu et', ro: 'Carne suculentă direct de pe frigărui', nl: 'Sappig vlees rechtstreeks van het spit', sq: 'Mish lëngshëm direkt nga rrotulli', ku: 'Goştê av dar rasterast ji şîşê zivirok', pl: 'Soczyste mięso prosto z rożna' },
  doenerBuildStage3: { de: 'Frischer Salat obendrauf', en: 'Fresh salad on top', tr: 'Üzerine taze salata', ro: 'Salată proaspătă deasupra', nl: 'Verse salade erbovenop', sq: 'Sallatë e freskët sipër', ku: 'Selata taze li ser', pl: 'Świeża sałatka na wierzchu' },
  doenerBuildStage4: { de: 'Und die perfekte Soße oben drauf — fertig ist dein Döner!', en: 'And the perfect sauce on top — your döner is ready!', tr: 'Ve üzerine mükemmel sos — dönerin hazır!', ro: 'Și sosul perfect deasupra — döner-ul tău e gata!', nl: 'En de perfecte saus erover — jouw döner is klaar!', sq: 'Dhe salca perfekte sipër — doneri yt është gati!', ku: 'Û soşê bêkêmasî li ser — dönera te amade ye!', pl: 'A na to idealny sos — Twój kebab gotowy!' },
  showcaseTitle: { de: 'Frisch aus unserer Küche', en: 'Fresh from our kitchen', tr: 'Mutfağımızdan taze', ro: 'Proaspăt din bucătăria noastră', nl: 'Vers uit onze keuken', sq: 'Freskët nga kuzhina jonë', ku: 'Taze ji metbexa me', pl: 'Świeże z naszej kuchni' },
  staffTischMenuTab: { de: 'Tischmenü', en: 'Table menu', tr: 'Masa Menüsü', ro: 'Meniu de masă', nl: 'Tafelmenu', sq: 'Menyja e tryezës', ku: 'Menûya masê', pl: 'Menu stolikowe'},
  staffPhotosTab: { de: 'Fotos', en: 'Photos', tr: 'Fotoğraflar', ro: 'Fotografii', nl: "Foto's" , sq: 'Fotot', ku: 'Wêne', pl: 'Zdjęcia'},
  staffWelcomeTitle: { de: 'Willkommen zurück!', en: 'Welcome back!', tr: 'Tekrar hoş geldin!', ro: 'Bine ai revenit!', nl: 'Welkom terug!' , sq: 'Mirë se erdhe përsëri!', ku: 'Bi xêr hatî!', pl: 'Witaj ponownie!'},
  staffWelcomeSub: { de: 'Wähle einen Bereich unten aus', en: 'Choose an area below', tr: 'Aşağıdan bir bölüm seç', ro: 'Alege o secțiune mai jos', nl: 'Kies hieronder een gebied' , sq: 'Zgjidh një seksion më poshtë', ku: 'Ji jêr beşekê hilbijêre', pl: 'Wybierz sekcję poniżej'},
  menuSearchPh: { de: 'Gericht suchen...', en: 'Search dish...', tr: 'Ürün ara...', ro: 'Caută fel...', nl: 'Gerecht zoeken...' , sq: 'Kërko një gjellë...', ku: 'Xwarinê bigere...', pl: 'Szukaj dania...'},
  editedBadge: { de: 'bearbeitet', en: 'edited', tr: 'düzenlendi', ro: 'editat', nl: 'bewerkt' , sq: 'ndryshuar', ku: 'hate guherandin', pl: 'edytowano'},
  resetBtn: { de: 'Zurücksetzen', en: 'Reset', tr: 'Sıfırla', ro: 'Resetează', nl: 'Resetten' , sq: 'Rivendos', ku: 'Ji nû ve saz bike', pl: 'Zresetuj'},
  cancelBtn: { de: 'Abbrechen', en: 'Cancel', tr: 'Vazgeç', ro: 'Anulează', nl: 'Annuleren' , sq: 'Anulo', ku: 'Betal bike', pl: 'Anuluj'},
  editedPricesCount: { de: 'Preis(e) angepasst', en: 'price(s) adjusted', tr: 'fiyat düzenlendi', ro: 'prețuri ajustate', nl: 'prijzen aangepast' , sq: 'çmim(e) të ndryshuar', ku: 'biha(yên) hatin guherandin', pl: 'dostosowana(e) cena/ceny'},
  photoUrlHint: { de: 'Foto direkt von deinem Gerät hochladen, oder alternativ einen Bild-Link einfügen (z.B. von einem Foto-Hosting-Dienst).', en: 'Upload a photo directly from your device, or alternatively paste an image link (e.g. from a photo hosting service).', tr: 'Cihazından doğrudan fotoğraf yükle, ya da alternatif olarak bir resim linki yapıştır (örn. bir fotoğraf barındırma servisinden).', ro: 'Încarcă o fotografie direct de pe dispozitiv, sau alternativ adaugă un link de imagine (de ex. de la un serviciu de găzduire foto).', nl: 'Upload een foto direct vanaf je apparaat, of plak als alternatief een afbeeldingslink (bijv. van een fotohostingdienst).' , sq: 'Ngarko një foto direkt nga pajisja jote, ose alternativisht ngjit një lidhje foto (p.sh. nga një shërbim hostimi fotosh).', ku: 'Wêneyekî rasterast ji amûra xwe bar bike, an jî girêdana wêneyekî lê zêde bike (mînak ji xizmeteke hostkirina wêneyan).', pl: 'Prześlij zdjęcie bezpośrednio z urządzenia lub wklej link do obrazu (np. z serwisu hostingowego zdjęć).'},
  uploadPhotoBtn: { de: 'Foto aus Galerie hochladen', en: 'Upload photo from gallery', tr: 'Galeriden fotoğraf yükle', ro: 'Încarcă fotografie din galerie', nl: 'Foto uploaden vanuit galerij', sq: 'Ngarko foto nga galeria', ku: 'Ji galeriyê wêne bar bike' , pl: 'Prześlij zdjęcie z galerii' },
  applyToCategoryBtn: { de: 'Auf alle Artikel dieser Kategorie anwenden', en: 'Apply to all items in this category', tr: 'Bu kategorideki tüm ürünlere uygula', ro: 'Aplică la toate produsele din această categorie', nl: 'Toepassen op alle items in deze categorie', sq: 'Zbato tek të gjitha artikujt e kësaj kategorie', ku: 'Li ser hemû tiştên vê kategoriyê bicîh bike' , pl: 'Zastosuj do wszystkich pozycji w tej kategorii' },
  photoAppliedCategoryMsg: { de: '✓ Auf {count} Artikel angewendet', en: '✓ Applied to {count} items', tr: '✓ {count} ürüne uygulandı', ro: '✓ Aplicat la {count} produse', nl: '✓ Toegepast op {count} items', sq: '✓ U zbatua në {count} artikuj', ku: '✓ Li ser {count} tiştan hate bicîhkirin' , pl: '✓ Zastosowano do {count} pozycji' },
  independentPhotoTitle: { de: 'Foto ohne Bezug zu einem Gericht', en: 'Photo not tied to a dish', tr: 'Bir yemekle bağlantısız fotoğraf', ro: 'Fotografie fără legătură cu un fel de mâncare', nl: "Foto zonder verband met een gerecht", sq: 'Foto pa lidhje me një gjellë', ku: 'Wêne bêyî girêdan bi xwarinekê' , pl: 'Zdjęcie niezwiązane z daniem' },
  independentPhotoHint: { de: 'Für Fotos, die zu keinem bestimmten Gericht gehören (z.B. Restaurant, Team, Events) — wird zur Galerie auf der Startseite hinzugefügt.', en: 'For photos that don\'t belong to a specific dish (e.g. restaurant, team, events) — added to the gallery on the homepage.', tr: 'Belirli bir yemekle ilgili olmayan fotoğraflar için (örn. mekan, ekip, etkinlik) — ana sayfadaki galeriye eklenir.', ro: 'Pentru fotografii care nu aparțin unui anumit fel de mâncare (de ex. restaurant, echipă, evenimente) — adăugate la galeria de pe pagina principală.', nl: 'Voor foto\'s die niet bij een specifiek gerecht horen (bijv. restaurant, team, evenementen) — wordt toegevoegd aan de galerij op de homepage.', sq: 'Për foto që nuk i përkasin një gjelle të caktuar (p.sh. lokali, ekipi, evente) — shtohet te galeria në faqen kryesore.', ku: 'Ji bo wêneyên ku girêdayî gjelleyekê taybet nînin (mînak dikan, tîm, bûyer) — li galeriya rûpelê sereke tê zêdekirin.' , pl: 'Dla zdjęć, które nie należą do konkretnego dania (np. restauracja, zespół, wydarzenia) — zostaną dodane do galerii na stronie głównej.' },
  uploadGalleryPhotoBtn: { de: 'Foto zur Galerie hinzufügen', en: 'Add photo to gallery', tr: 'Galeriye fotoğraf ekle', ro: 'Adaugă fotografie la galerie', nl: 'Foto toevoegen aan galerij', sq: 'Shto foto te galeria', ku: 'Wêne li galeriyê zêde bike' , pl: 'Dodaj zdjęcie do galerii' },
  visitsToday: { de: 'Besuche heute', en: 'Visits today', tr: 'Bugünkü ziyaret', ro: 'Vizite azi', nl: 'Bezoeken vandaag' , sq: 'Vizita sot', ku: 'Serdanên îro', pl: 'Odwiedziny dzisiaj'},
  visitsRecent: { de: 'Letzte Besuche', en: 'Recent visits', tr: 'Son ziyaretler', ro: 'Vizite recente', nl: 'Recente bezoeken' , sq: 'Vizitat e fundit', ku: 'Serdanên dawî', pl: 'Ostatnie odwiedziny'},
  byLanguage: { de: 'NACH SPRACHE', en: 'BY LANGUAGE', tr: 'DİLE GÖRE', ro: 'DUPĂ LIMBĂ', nl: 'PER TAAL' , sq: 'SIPAS GJUHËS', ku: 'LI GORÎ ZIMAN', pl: 'WEDŁUG JĘZYKA'},
  byDevice: { de: 'NACH GERÄT', en: 'BY DEVICE', tr: 'CİHAZA GÖRE', ro: 'DUPĂ DISPOZITIV', nl: 'PER APPARAAT' , sq: 'SIPAS PAJISJES', ku: 'LI GORÎ AMÎR', pl: 'WEDŁUG URZĄDZENIA'},
  callClicksLabel: { de: 'Anrufe (Website)', en: 'Calls (website)', tr: 'Arama tıklaması', ro: 'Apeluri (site)', nl: 'Belletjes (site)', sq: 'Telefonata (sajti)', ku: 'Bang (malper)', pl: 'Połączenia (strona)' },
  routeClicksLabel: { de: 'Routenanfragen', en: 'Route requests', tr: 'Yol tarifi tıklaması', ro: 'Cereri traseu', nl: 'Route-aanvragen', sq: 'Kërkesa për rrugë', ku: 'Daxwaza rê', pl: 'Zapytania o trasę' },
  assistantTitle: { de: 'Bodrum Assistent', en: 'Bodrum Assistant', tr: 'Bodrum Asistan', ro: 'Asistent Bodrum', nl: 'Bodrum Assistent', sq: 'Asistenti Bodrum', ku: 'Alîkarê Bodrum', pl: 'Asystent Bodrum' },
  assistantGreeting: { de: 'Hallo! 👋 Ich bin der kleine Helfer von Bodrum Kebap. Frag mich nach Öffnungszeiten, Adresse, Preisen oder einer Empfehlung!', en: "Hi! 👋 I'm Bodrum Kebap's little helper. Ask me about hours, address, prices, or a recommendation!", tr: 'Merhaba! 👋 Ben Bodrum Kebap\'ın küçük yardımcısıyım. Açılış saati, adres, fiyat ya da öneri sorabilirsin!', ro: 'Salut! 👋 Sunt micul asistent al Bodrum Kebap. Întreabă-mă despre orar, adresă, prețuri sau o recomandare!', nl: 'Hoi! 👋 Ik ben de kleine helper van Bodrum Kebap. Vraag me naar openingstijden, adres, prijzen of een aanbeveling!', sq: 'Përshëndetje! 👋 Unë jam ndihmësi i vogël i Bodrum Kebap. Më pyet për orarin, adresën, çmimet ose një rekomandim!', ku: 'Silav! 👋 Ez alîkarê piçûk ê Bodrum Kebap im. Ji min bipirse li ser demjimêran, navnîşanê, buhayan an pêşniyarek!', pl: 'Cześć! 👋 Jestem małym asystentem Bodrum Kebap. Zapytaj mnie o godziny, adres, ceny lub polecenie!' },
  assistantPlaceholder: { de: 'Frag mich etwas...', en: 'Ask me something...', tr: 'Bir şey sor...', ro: 'Întreabă-mă ceva...', nl: 'Vraag me iets...', sq: 'Më pyet diçka...', ku: 'Tiştekî ji min bipirse...', pl: 'Zapytaj mnie o coś...' },
  contactMsgTitle: { de: '💬 Schreib uns', en: '💬 Message us', tr: '💬 Bize yazın', ro: '💬 Scrie-ne', nl: '💬 Schrijf ons', sq: '💬 Na shkruaj', ku: '💬 Ji me re binivîse', pl: '💬 Napisz do nas' },
  wishBoxTitle: { de: 'Dein Wunsch an uns', en: 'Your wish for us', tr: 'Bizden isteğin', ro: 'Dorința ta pentru noi', nl: 'Jouw wens voor ons', sq: 'Dëshira jote për ne', ku: 'Xwestina te ji me re', pl: 'Twoje życzenie dla nas' },
  wishBoxNavLabel: { de: 'Dein Wunsch', en: 'Your wish', tr: 'İsteğin', ro: 'Dorința ta', nl: 'Jouw wens', sq: 'Dëshira jote', ku: 'Xwestina te', pl: 'Twoje życzenie' },
  wishBoxSub: { de: 'Welches Gericht wünschst du dir bei uns? Sag uns einfach, was dir fehlt.', en: 'Which dish would you like us to add? Just tell us what you\'re missing.', tr: 'Bizden ne eklememizi istersin? Ne eksik olduğunu söyle yeter.', ro: 'Ce fel de mâncare ți-ai dori la noi? Spune-ne ce lipsește.', nl: 'Welk gerecht zou je graag willen? Vertel ons wat je mist.', sq: 'Çfarë gjelle do të doje te ne? Na thuaj çfarë mungon.', ku: 'Tu kîjan xwarinê ji me dixwazî? Tenê ji me re bêje çi kêm e.', pl: 'Jakiego dania sobie życzysz? Po prostu napisz, czego brakuje.' },
  wishBoxName: { de: 'Name (optional)', en: 'Name (optional)', tr: 'İsim (isteğe bağlı)', ro: 'Nume (opțional)', nl: 'Naam (optioneel)', sq: 'Emri (opsionale)', ku: 'Nav (vebijark)', pl: 'Imię (opcjonalnie)' },
  wishBoxPlaceholder: { de: 'z.B. Falafel-Teller, mehr vegane Optionen, Ayran in groß …', en: 'e.g. Falafel plate, more vegan options, large Ayran …', tr: 'örn. Falafel tabağı, daha fazla vegan seçenek, büyük boy ayran …', ro: 'ex. Platou falafel, mai multe opțiuni vegane, Ayran mare …', nl: 'bijv. Falafelbord, meer veganistische opties, grote Ayran …', sq: 'p.sh. Pjatë falafel, më shumë opsione vegan, Ajran i madh …', ku: 'wek nimûne pêşkêş bike Falafel, vebijarkên vegan zêdetir …', pl: 'np. Talerz falafel, więcej opcji wegańskich, duży Ayran …' },
  wishBoxSend: { de: 'Absenden', en: 'Send', tr: 'Gönder', ro: 'Trimite', nl: 'Versturen', sq: 'Dërgo', ku: 'Bişîne', pl: 'Wyślij' },
  wishBoxSent: { de: 'Danke! Wir haben deinen Wunsch erhalten 💚', en: 'Thanks! We received your wish 💚', tr: 'Teşekkürler! İsteğin bize ulaştı 💚', ro: 'Mulțumim! Am primit dorința ta 💚', nl: 'Bedankt! We hebben je wens ontvangen 💚', sq: 'Faleminderit! E morëm dëshirën tënde 💚', ku: 'Spas! Xwestina te gihîşt me 💚', pl: 'Dziękujemy! Otrzymaliśmy Twoje życzenie 💚' },
  contactMsgSub: { de: 'Frage, Feedback oder ein Problem? Wir melden uns persönlich zurück.', en: "Question, feedback, or a problem? We'll get back to you personally.", tr: 'Bir soru, geri bildirim ya da bir sorun mu var? Sana kişisel olarak dönüş yaparız.', ro: 'O întrebare, feedback sau o problemă? Îți răspundem personal.', nl: 'Een vraag, feedback of een probleem? We nemen persoonlijk contact met je op.', sq: 'Pyetje, koment apo problem? Do të të kthejmë përgjigje personalisht.', ku: 'Pirsek, ramanek an pirsgirêkek? Em ê bi taybetî bersivê bidin te.', pl: 'Pytanie, opinia lub problem? Odpowiemy osobiście.' },
  contactMsgName: { de: 'Dein Name', en: 'Your name', tr: 'Adın', ro: 'Numele tău', nl: 'Je naam', sq: 'Emri yt', ku: 'Navê te', pl: 'Twoje imię' },
  contactMsgPhone: { de: 'E-Mail (optional)', en: 'Email (optional)', tr: 'E-posta (opsiyonel)', ro: 'E-mail (opțional)', nl: 'E-mail (optioneel)', sq: 'Email (opsional)', ku: 'E-mail (dilxwazî)', pl: 'E-mail (opcjonalnie)' },
  contactMsgMessage: { de: 'Deine Nachricht...', en: 'Your message...', tr: 'Mesajın...', ro: 'Mesajul tău...', nl: 'Je bericht...', sq: 'Mesazhi yt...', ku: 'Peyama te...', pl: 'Twoja wiadomość...' },
  contactMsgSend: { de: 'Senden', en: 'Send', tr: 'Gönder', ro: 'Trimite', nl: 'Verzenden', sq: 'Dërgo', ku: 'Bişîne', pl: 'Wyślij' },
  contactMsgSent: { de: '✅ Danke! Wir melden uns bald bei dir.', en: "✅ Thanks! We'll be in touch soon.", tr: '✅ Teşekkürler! En kısa sürede sana dönüş yapacağız.', ro: '✅ Mulțumim! Te vom contacta în curând.', nl: '✅ Bedankt! We nemen snel contact op.', sq: '✅ Faleminderit! Do të të kontaktojmë së shpejti.', ku: '✅ Spas! Em ê zû têkiliyê daynin.', pl: '✅ Dziękujemy! Wkrótce się odezwiemy.' },
  contactMsgError: { de: '⚠️ Etwas ist schiefgelaufen. Bitte ruf uns direkt an.', en: '⚠️ Something went wrong. Please call us directly.', tr: '⚠️ Bir şeyler ters gitti. Lütfen bizi direkt ara.', ro: '⚠️ Ceva a mers greșit. Sună-ne direct.', nl: '⚠️ Er ging iets mis. Bel ons alsjeblieft direct.', sq: '⚠️ Diçka shkoi keq. Na telefono direkt.', ku: '⚠️ Tiştek çewt çû. Ji kerema xwe rasterast telefon bike.', pl: '⚠️ Coś poszło nie tak. Zadzwoń do nas bezpośrednio.' },
  liveViewers: { de: 'schauen gerade', en: 'viewing right now', tr: 'kişi şu an bakıyor', ro: 'privesc chiar acum', nl: 'kijken nu', sq: 'po shikojnë tani', ku: 'niha temaşe dikin', pl: 'ogląda teraz' },
  analyticsNote: { de: 'Zeigt die letzten 500 Besuche. Keine persönlichen Daten, nur Sprache & Gerätetyp.', en: 'Shows the last 500 visits. No personal data, only language & device type.', tr: 'Son 500 ziyareti gösterir. Kişisel veri yok, sadece dil ve cihaz türü.', ro: 'Arată ultimele 500 de vizite. Fără date personale, doar limba și tipul dispozitivului.', nl: 'Toont de laatste 500 bezoeken. Geen persoonlijke gegevens, alleen taal & apparaattype.' , sq: 'Tregon 500 vizitat e fundit. Pa të dhëna personale, vetëm gjuha & lloji i pajisjes.', ku: '500 serdanên dawî nîşan dide. Tu daneyên kesane tune, tenê ziman & cureyê amîr.', pl: 'Pokazuje ostatnie 500 odwiedzin. Brak danych osobowych, tylko język i typ urządzenia.'},
  trackEmptyHint: { de: 'Gib deinen Bestellcode ein, um den Status zu sehen.', en: 'Enter your order code to see the status.', tr: 'Durumu görmek için sipariş kodunu gir.', ro: 'Introdu codul comenzii pentru a vedea starea.', nl: 'Voer je bestelcode in om de status te zien.' , sq: 'Fut kodin e porosisë për të parë statusin.', ku: 'Ji bo dîtina rewşê koda sifarişê binivîse.', pl: 'Wpisz swój kod zamówienia, aby zobaczyć status.'},
  surpriseMeBtn: { de: 'Überrasch mich!', en: 'Surprise me!', tr: 'Sürpriz beni!', ro: 'Surprinde-mă!', nl: 'Verras me!' , sq: 'Më surprizo!', ku: 'Min ecêbmayî bihêle!', pl: 'Zaskocz mnie!'},
  surpriseTitle: { de: 'Wie wäre es damit?', en: 'How about this?', tr: 'Buna ne dersin?', ro: 'Ce zici de asta?', nl: 'Wat dacht je hiervan?' , sq: 'Si të duket kjo?', ku: 'Ev çawa ye?', pl: 'Co powiesz na to?'},
  surpriseRolling: { de: 'Wir überlegen...', en: 'Thinking...', tr: 'Düşünüyoruz...', ro: 'Ne gândim...', nl: 'We denken na...' , sq: 'Po mendojmë...', ku: 'Em difikirin...', pl: 'Zastanawiamy się...'},
  surpriseWantIt: { de: 'Ja, das will ich!', en: 'Yes, I want this!', tr: 'Evet, bunu istiyorum!', ro: 'Da, vreau asta!', nl: 'Ja, dit wil ik!' , sq: 'Po, e dua këtë!', ku: 'Erê, ez vê dixwazim!', pl: 'Tak, chcę to!'},
  surpriseAgain: { de: 'Was anderes zeigen', en: 'Show me something else', tr: 'Başka bir şey söyle', ro: 'Arată-mi altceva', nl: 'Toon iets anders' , sq: 'Trego diçka tjetër', ku: 'Tiştekî din nîşan bide', pl: 'Pokaż coś innego'},
  noOrdersYet: { de: 'Noch keine Bestellungen', en: 'No orders yet', tr: 'Henüz sipariş yok', ro: 'Încă nicio comandă', nl: 'Nog geen bestellingen' , sq: 'Ende pa porosi', ku: 'Hê tu sifariş tune', pl: 'Brak zamówień'},
  deleteOrderBtn: { de: 'Löschen (z.B. falls nicht per WhatsApp abgeschickt)', en: 'Delete (e.g. if not actually sent via WhatsApp)', tr: 'Sil (örn. WhatsApp\'tan gerçekten gönderilmediyse)', ro: 'Șterge (ex. dacă nu a fost trimis efectiv prin WhatsApp)', nl: 'Verwijderen (bijv. als niet echt via WhatsApp verstuurd)' , sq: 'Fshi (p.sh. nëse nuk u dërgua nga WhatsApp)', ku: 'Jê bibe (mînak heke bi WhatsApp neşandibe)', pl: 'Usuń (np. jeśli nie wysłano przez WhatsApp)'},
  deleteFailedMsg: { de: '⚠️ Löschen fehlgeschlagen — Datenbankberechtigung prüfen', en: '⚠️ Delete failed — check database permissions', tr: '⚠️ Silme başarısız — veritabanı izinlerini kontrol edin', ro: '⚠️ Ștergere eșuată — verifică permisiunile bazei de date', nl: '⚠️ Verwijderen mislukt — controleer databaserechten' , sq: '⚠️ Fshirja dështoi — kontrollo lejet e bazës së të dhënave', ku: '⚠️ Jêbirin serneket — destûrên danegehê kontrol bike', pl: '⚠️ Usuwanie nie powiodło się — sprawdź uprawnienia bazy danych'},
  ordersTotalLabel: { de: 'GESAMT (angezeigte Bestellungen)', en: 'TOTAL (shown orders)', tr: 'TOPLAM (görüntülenen siparişler)', ro: 'TOTAL (comenzi afișate)', nl: 'TOTAAL (getoonde bestellingen)' , sq: 'GJITHSEJ (porositë e shfaqura)', ku: 'BI TEVAYÎ (sifarişên xuyakirî)', pl: 'SUMA (wyświetlone zamówienia)'},
  stuckOrderBadge: { de: 'ÜBERFÄLLIG', en: 'OVERDUE', tr: 'GECİKTİ', ro: 'ÎNTÂRZIATĂ', nl: 'TE LAAT' , sq: 'VONESË', ku: 'DEREN MABÛYE', pl: 'ZALEGŁE'},
  soldOutBadge: { de: 'AUSVERKAUFT', en: 'SOLD OUT', tr: 'TÜKENDİ', ro: 'EPUIZAT', nl: 'UITVERKOCHT' , sq: 'I SHITUR', ku: 'TIŞTEK NEMA', pl: 'WYPRZEDANE'},
  notifTestLabel: { de: 'Benachrichtigung testen', en: 'Test notification', tr: 'Bildirimi test et', ro: 'Testează notificarea', nl: 'Melding testen' , sq: 'Testo njoftimin', ku: 'Danezanê biceribîne', pl: 'Testuj powiadomienie'},
  dailyBannerLabel: { de: 'Ankündigung des Tages', en: "Today's announcement", tr: 'Günün duyurusu', ro: 'Anunțul zilei', nl: 'Aankondiging van vandaag' , sq: 'Njoftimi i ditës', ku: 'Ragihandina Rojê', pl: 'Ogłoszenie dnia'},
  dailyBannerPh: { de: 'z.B. Heute frischer Sucuk geliefert 🎉', en: 'e.g. Fresh sucuk delivered today 🎉', tr: 'örn. Bugün taze sucuk geldi 🎉', ro: 'ex. Astăzi a sosit sucuk proaspăt 🎉', nl: 'bijv. Vandaag verse sucuk geleverd 🎉' , sq: 'p.sh. Sot erdhi sallam i freskët 🎉', ku: 'mînak Îro sucuqê taze hat 🎉', pl: 'np. Dziś dostarczono świeży sucuk 🎉'},
  waTemplateLabel: { de: 'Persönliche Nachricht (WhatsApp)', en: 'Personal message (WhatsApp)', tr: 'Kişisel mesaj (WhatsApp)', ro: 'Mesaj personal (WhatsApp)', nl: 'Persoonlijk bericht (WhatsApp)' , sq: 'Mesazh personal (WhatsApp)', ku: 'Peyama şexsî (WhatsApp)', pl: 'Osobista wiadomość (WhatsApp)'},
  waTemplateHint: { de: 'Wird am Ende jeder Bestellnachricht angehängt (optional).', en: 'Added to the end of every order message (optional).', tr: 'Her sipariş mesajının sonuna eklenir (opsiyonel).', ro: 'Adăugat la sfârșitul fiecărui mesaj de comandă (opțional).', nl: 'Wordt toegevoegd aan het einde van elk bestelbericht (optioneel).' , sq: 'Shtohet në fund të çdo mesazhi porosie (opsionale).', ku: 'Di dawiya her peyama sifarişê de tê zêdekirin (vebijarkî).', pl: 'Zostanie dodana na końcu każdej wiadomości z zamówieniem (opcjonalnie).'},
  waTemplatePh: { de: 'z.B. Frohe Weihnachten! 🎄', en: 'e.g. Merry Christmas! 🎄', tr: 'örn. İyi bayramlar! 🎄', ro: 'ex. Crăciun fericit! 🎄', nl: 'bijv. Fijne kerst! 🎄' , sq: 'p.sh. Gëzuar Krishtlindjet! 🎄', ku: 'mînak Cejna we pîroz be! 🎄', pl: 'np. Wesołych Świąt! 🎄'},
  testOrderLabel: { de: 'Testbestellung', en: 'Test order', tr: 'Test siparişi', ro: 'Comandă de test', nl: 'Testbestelling' , sq: 'Porosi provë', ku: 'Sifarişa ceribandinê', pl: 'Zamówienie testowe'},
  testOrderHint: { de: 'Erstellt eine Test-Bestellung, um Ton, Vibration und die Bestellungen-Ansicht zu prüfen, ohne echte Daten zu vermischen.', en: 'Creates a test order to check sound, vibration and the orders view, without mixing with real data.', tr: 'Ses, titreşim ve sipariş görünümünü gerçek veriyle karışmadan test etmek için bir test siparişi oluşturur.', ro: 'Creează o comandă de test pentru a verifica sunetul, vibrația și afișarea comenzilor, fără a amesteca date reale.', nl: 'Maakt een testbestelling om geluid, trilling en het bestellingenoverzicht te controleren, zonder echte data te mengen.' , sq: 'Krijon një porosi provë për të testuar zërin, dridhjen dhe pamjen e porosive, pa përzier të dhëna reale.', ku: 'Sifarişeke ceribandinê çêdike da ku deng, lerizîn û dîtbariya sifarişan biceribîne, bêyî ku bi daneyên rastîn re tevlihev bibe.', pl: 'Tworzy testowe zamówienie, aby sprawdzić dźwięk, wibracje i widok zamówień bez mieszania z prawdziwymi danymi.'},
  testOrderBtn: { de: 'Testbestellung erstellen', en: 'Create test order', tr: 'Test siparişi oluştur', ro: 'Creează comandă de test', nl: 'Testbestelling aanmaken' , sq: 'Krijo porosi provë', ku: 'Sifarişa ceribandinê çêke', pl: 'Utwórz zamówienie testowe'},
  showTestOrdersLabel: { de: 'Testbestellungen in der Liste anzeigen', en: 'Show test orders in the list', tr: 'Test siparişlerini listede göster', ro: 'Arată comenzile de test în listă', nl: 'Testbestellingen tonen in de lijst' , sq: 'Trego porositë provë në listë', ku: 'Sifarişên ceribandinê di lîsteyê de nîşan bide', pl: 'Pokaż zamówienia testowe na liście'},
  testOrderCreatedMsg: { de: '✓ Testbestellung erstellt', en: '✓ Test order created', tr: '✓ Test siparişi oluşturuldu', ro: '✓ Comandă de test creată', nl: '✓ Testbestelling aangemaakt' , sq: '✓ Porosia provë u krijua', ku: '✓ Sifarişa ceribandinê hat çêkirin', pl: '✓ Utworzono zamówienie testowe'},
  notifTestBtn: { de: 'Testton abspielen', en: 'Play test sound', tr: 'Test sesini çal', ro: 'Redă sunetul de test', nl: 'Testgeluid afspelen' , sq: 'Luaj tingullin provë', ku: 'Dengê ceribandinê lêxe', pl: 'Odtwórz dźwięk testowy'},
  markSoldOutOn: { de: 'Als „Ausverkauft" markiert', en: 'Marked as "Sold out"', tr: '"Tükendi" olarak işaretlendi', ro: 'Marcat ca „Epuizat"', nl: 'Gemarkeerd als "Uitverkocht"' , sq: 'Shënuar si \\"I shitur\\"', ku: 'Wek \\"Tune\\" hate nîşankirin', pl: 'Oznaczone jako „Wyprzedane”'},
  markSoldOutOff: { de: 'Als „Ausverkauft" markieren', en: 'Mark as "Sold out"', tr: '"Tükendi" olarak işaretle', ro: 'Marchează ca „Epuizat"', nl: 'Markeren als "Uitverkocht"' , sq: 'Shëno si \\"I shitur\\"', ku: 'Wek \\"Tune\\" nîşan bike', pl: 'Oznacz jako „Wyprzedane”'},
  chickenSoldOutLabel: { de: 'Hähnchenfleisch (Döner) ausverkauft', en: 'Chicken meat (Döner) sold out', tr: 'Tavuk döner eti tükendi', ro: 'Carne de pui (Döner) epuizată', nl: 'Kipvlees (Döner) uitverkocht', sq: 'Mishi i pulës (Döner) i shitur', ku: 'Goştê mirîşkê (Döner) nema' , pl: 'Mięso z kurczaka (kebab) wyprzedane' },
  extrasSoldOutTitle: { de: 'Zutaten ausverkauft', en: 'Ingredients sold out', tr: 'Malzeme tükendi', ro: 'Ingrediente epuizate', nl: 'Ingrediënten uitverkocht', sq: 'Përbërësit e shitur', ku: 'Malzemeyên nema' , pl: 'Składniki wyprzedane' },
  extrasSoldOutHint: { de: 'Markiere eine Zutat (z.B. Brokkoli), die gerade nicht verfügbar ist. Kunden sehen dann eine Warnung, können sie aber trotzdem wählen.', en: 'Mark an ingredient (e.g. broccoli) that is currently unavailable. Customers will see a warning but can still choose it.', tr: 'Şu anda mevcut olmayan bir malzemeyi (örn. brokoli) işaretle. Müşteriler bir uyarı görecek ama yine de seçebilecek.', ro: 'Marchează un ingredient (de ex. broccoli) care nu este momentan disponibil. Clienții vor vedea un avertisment, dar îl pot alege oricum.', nl: 'Markeer een ingrediënt (bijv. broccoli) dat momenteel niet beschikbaar is. Klanten zien een waarschuwing maar kunnen het toch kiezen.', sq: 'Shëno një përbërës (p.sh. brokoli) që nuk është i disponueshëm aktualisht. Klientët do të shohin një paralajmërim por mund ta zgjedhin gjithsesi.', ku: 'Malzemeyekê (mînak brokolî) ku niha ne mevcûd e nîşan bike. Xerîdar dê hişyariyekê bibînin lê dîsa jî dikarin wê hilbijêrin.' , pl: 'Oznacz składnik (np. brokuł), który jest chwilowo niedostępny. Klienci zobaczą ostrzeżenie, ale nadal będą mogli go wybrać.' },
  extraSearchPh: { de: 'z.B. Brokkoli, Zwiebeln...', en: 'e.g. broccoli, onions...', tr: 'örn. brokoli, soğan...', ro: 'ex. broccoli, ceapă...', nl: 'bijv. broccoli, uien...', sq: 'p.sh. brokoli, qepë...', ku: 'mînak brokolî, pîvaz...' , pl: 'np. brokuł, cebula...' },
  quickSearchPh: { de: '🔍 Nummer oder Name eingeben (z.B. 24)', en: '🔍 Enter number or name (e.g. 24)', tr: '🔍 Numara veya isim yaz (örn. 24)', ro: '🔍 Introdu numărul sau numele (ex. 24)', nl: '🔍 Nummer of naam invoeren (bijv. 24)', sq: '🔍 Vendos numrin ose emrin (p.sh. 24)', ku: '🔍 Hejmar an nav binivîse (mînak 24)' , pl: '🔍 Wpisz numer lub nazwę (np. 24)' },
  quickSearchNoResults: { de: 'Nichts gefunden', en: 'Nothing found', tr: 'Bir şey bulunamadı', ro: 'Nimic găsit', nl: 'Niets gevonden', sq: 'Nuk u gjet asgjë', ku: 'Tiştek nehat dîtin' , pl: 'Nic nie znaleziono' },
  quickOrderByNumberBtn: { de: 'Mit Nummer bestellen', en: 'Order by number', tr: 'Numara ile sipariş ver', ro: 'Comandă după număr', nl: 'Bestellen met nummer', sq: 'Porosit me numër', ku: 'Bi hejmarê sifariş bide' , pl: 'Zamów po numerze' },
  quantityLabel: { de: 'MENGE', en: 'QUANTITY', tr: 'ADET', ro: 'CANTITATE', nl: 'AANTAL', sq: 'SASIA', ku: 'HEJMAR' , pl: 'ILOŚĆ' },
  comboFreeDrinkHint: { de: 'Dein erstes Getränk ist gratis!', en: 'Your first drink is free!', tr: 'İlk içeceğin ücretsiz!', ro: 'Prima ta băutură este gratuită!', nl: 'Je eerste drankje is gratis!', sq: 'Pija jote e parë është falas!', ku: 'Vexwarina te ya yekem belaş e!' , pl: 'Twój pierwszy napój jest gratis!' },
  staffQuickLookupTitle: { de: '🔍 Nummer nachschlagen', en: '🔍 Look up number', tr: '🔍 Numara sorgula', ro: '🔍 Caută numărul', nl: '🔍 Nummer opzoeken', sq: '🔍 Kërko numrin', ku: '🔍 Hejmarê bigere' , pl: '🔍 Sprawdź numer' },
  staffQuickLookupHint: { de: 'Für Kunden, die per WhatsApp direkt eine Nummer schreiben.', en: 'For customers who message a number directly via WhatsApp.', tr: 'WhatsApp\'a direkt numara yazan müşteriler için.', ro: 'Pentru clienții care scriu direct un număr pe WhatsApp.', nl: 'Voor klanten die direct een nummer via WhatsApp sturen.', sq: 'Për klientët që shkruajnë direkt një numër në WhatsApp.', ku: 'Ji bo xerîdarên ku rasterast hejmarê li WhatsApp dinivîsin.' , pl: 'Dla klientów, którzy piszą numer bezpośrednio na WhatsApp.' },
  extraSoldOutWarnPrefix: { de: 'Achtung: Wir haben gerade kein/e/n', en: 'Note: We currently don\'t have', tr: 'Dikkat: Şu anda', ro: 'Atenție: Momentan nu avem', nl: 'Let op: We hebben momenteel geen', sq: 'Kujdes: Aktualisht nuk kemi', ku: 'Bala xwe bidê: Niha em ne xwedî' , pl: 'Uwaga: obecnie nie mamy' },
  extraSoldOutWarnSuffix: { de: 'mehr. Trotzdem hinzufügen?', en: '. Add it anyway?', tr: 'yok. Yine de eklensin mi?', ro: '. Adaugi oricum?', nl: 'meer. Toch toevoegen?', sq: 'më. Ta shtoj gjithsesi?', ku: 'nema. Dîsa jî bê zêdekirin?' , pl: '. Dodać mimo to?' },
  addAnywayBtn: { de: 'Trotzdem hinzufügen', en: 'Add anyway', tr: 'Yine de ekle', ro: 'Adaugă oricum', nl: 'Toch toevoegen', sq: 'Shto gjithsesi', ku: 'Dîsa jî zêde bike' , pl: 'Dodaj mimo to' },
  groupShareBtn: { de: 'Per WhatsApp einladen', en: 'Invite via WhatsApp', tr: 'WhatsApp ile davet et', ro: 'Invită prin WhatsApp', nl: 'Uitnodigen via WhatsApp' , sq: 'Fto përmes WhatsApp', ku: 'Bi WhatsApp vexwîne', pl: 'Zaproś przez WhatsApp'},
  groupShareMsg: { de: 'Hey! Lass uns zusammen bei Bodrum Kebap Vechta bestellen 🥙 Tritt mit dem Code {code} bei: https://bodrumkebapvechta.de', en: 'Hey! Let\'s order together from Bodrum Kebap Vechta 🥙 Join with code {code}: https://bodrumkebapvechta.de', tr: 'Selam! Bodrum Kebap Vechta\'dan birlikte sipariş verelim 🥙 {code} koduyla katıl: https://bodrumkebapvechta.de', ro: 'Hei! Hai să comandăm împreună de la Bodrum Kebap Vechta 🥙 Alătură-te cu codul {code}: https://bodrumkebapvechta.de', nl: 'Hé! Laten we samen bestellen bij Bodrum Kebap Vechta 🥙 Doe mee met code {code}: https://bodrumkebapvechta.de' , sq: 'Hej! Le të porosisim së bashku nga Bodrum Kebap Vechta 🥙 Bashkohu me kodin {code}: https://bodrumkebapvechta.de', ku: 'Silav! Werin em bi hev re ji Bodrum Kebap Vechta sifariş bidin 🥙 Bi koda {code} tevlî bibe: https://bodrumkebapvechta.de', pl: 'Hej! Zamówmy razem w Bodrum Kebap Vechta 🥙 Dołącz kodem {code}: https://bodrumkebapvechta.de'},
  pendingParticipantsPrefix: { de: 'Noch nicht fertig:', en: 'Not finished yet:', tr: 'Henüz bitirmedi:', ro: 'Încă nu au terminat:', nl: 'Nog niet klaar:' , sq: 'Ende pa mbaruar:', ku: 'Hê ne temam:', pl: 'Jeszcze nie skończyli:'},
  pendingParticipantsSuffix: { de: '', en: '', tr: '', ro: '', nl: '' , sq: '', ku: '', pl: ''},
  sendAnywayConfirm: { de: 'Manche Personen wählen noch aus. Trotzdem senden?', en: 'Some people are still selecting. Send anyway?', tr: 'Bazı kişiler hâlâ seçim yapıyor. Yine de gönderilsin mi?', ro: 'Unele persoane încă aleg. Trimiți oricum?', nl: 'Sommige mensen zijn nog aan het kiezen. Toch versturen?' , sq: 'Disa persona ende po zgjedhin. Të dërgohet gjithsesi?', ku: 'Hin kes hê hildibijêrin. Dîsa jî bişînim?', pl: 'Niektóre osoby jeszcze wybierają. Wysłać mimo to?'},
  elapsedPrefix: { de: 'seit', en: 'since', tr: 'geçen süre', ro: 'de', nl: 'sinds' , sq: 'prej', ku: 'ji', pl: 'od'},
  inPrefix: { de: 'in', en: 'in', tr: 'kalan', ro: 'în', nl: 'over' , sq: 'pas', ku: 'di nav', pl: 'za'},
  overduePrefix: { de: 'überfällig seit', en: 'overdue by', tr: 'gecikme', ro: 'întârziere', nl: 'te laat met' , sq: 'me vonesë prej', ku: 'deren maye ji', pl: 'zaległe od'},
  googleRatingLabel: { de: 'Google-Bewertung (Punkte, Anzahl)', en: 'Google rating (score, count)', tr: 'Google puanı (puan, adet)', ro: 'Rating Google (scor, număr)', nl: 'Google-beoordeling (score, aantal)' , sq: 'Vlerësimi Google (pikë, numër)', ku: 'Nirxandina Google (xal, hejmar)', pl: 'Ocena Google (punkty, liczba)'},
  saveBtn: { de: 'Speichern', en: 'Save', tr: 'Kaydet', ro: 'Salvează', nl: 'Opslaan' , sq: 'Ruaj', ku: 'Tomar bike', pl: 'Zapisz'},
  savedMsg: { de: '✓ Gespeichert', en: '✓ Saved', tr: '✓ Kaydedildi', ro: '✓ Salvat', nl: '✓ Opgeslagen' , sq: '✓ U ruajt', ku: '✓ Hat tomarkirin', pl: '✓ Zapisano'},
  deletedMsg: { de: 'Gelöscht', en: 'Deleted', tr: 'Silindi', ro: 'Șters', nl: 'Verwijderd', sq: 'U fshi', ku: 'Hat jêbirin', pl: 'Usunięto' },
  welcomeBackMsg: { de: '👋 Wir haben dich vermisst! Schön, dass du wieder da bist.', en: '👋 We missed you! Great to have you back.', tr: '👋 Seni özledik! Tekrar hoş geldin.', ro: '👋 Ne-a fost dor de tine! Bine ai revenit.', nl: '👋 We hebben je gemist! Fijn dat je er weer bent.' , sq: '👋 Na ka munguar! Mirë se erdhe përsëri.', ku: '👋 Me bêriya te kir! Xweş e ku tu vegeriyayî.', pl: '👋 Tęskniliśmy za Tobą! Miło, że znów tu jesteś.'},
  favoritesTitle: { de: 'DEINE FAVORITEN', en: 'YOUR FAVOURITES', tr: 'FAVORİLERİN', ro: 'FAVORITELE TALE', nl: 'JOUW FAVORIETEN' , sq: 'FAVORITET E TUA', ku: 'BIJARTEYÊN TE', pl: 'TWOJE ULUBIONE'},
  orderNow: { de: 'Jetzt bestellen', en: 'Order now', tr: 'Şimdi sipariş ver', ro: 'Comandă acum', nl: 'Nu bestellen' , sq: 'Porosit tani', ku: 'Niha sifariş bide', pl: 'Zamów teraz'},
  heroHalal: { de: '100% HALAL', en: '100% HALAL', tr: '%100 HELAL', ro: '100% HALAL', nl: '100% HALAL' , sq: '100% HALLALL', ku: '100% HELAL', pl: '100% HALAL'},
  heroTitle1: { de: 'Frisch vom', en: 'Fresh from the', tr: 'Taze', ro: 'Proaspăt de la', nl: 'Vers van het' , sq: 'E freskët nga', ku: 'Taze ji', pl: 'Świeżo z'},
  heroTitle2: { de: 'Drehspieß', en: 'rotisserie', tr: 'Döner', ro: 'rotisor', nl: 'draaispit' , sq: 'Rrotisi', ku: 'Şîşê zivirî', pl: 'rożna'},
  heroSubtitle: { de: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salat — täglich frisch zubereitet in Vechta.', en: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salad — freshly made every day in Vechta.', tr: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salata — Vechta\'da her gün taze hazırlanır.', ro: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salată — preparate proaspăt zilnic în Vechta.', nl: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salade — dagelijks vers bereid in Vechta.' , sq: 'Kebap · Picë · Rollo · Kalcone · Shnicel · Sallatë — përgatitur fresk çdo ditë në Vechta.', ku: 'Kebap · Pizza · Rollo · Kalzone · Şnîtzel · Salate — her roj li Vechta taze tê amadekirin.', pl: 'Kebab · Pizza · Rollo · Calzone · Sznycel · Sałatka — przygotowywane świeżo codziennie w Vechcie.'},
  heroCtaWhatsapp: { de: '📱 Per WhatsApp bestellen', en: '📱 Order via WhatsApp', tr: '📱 WhatsApp ile sipariş ver', ro: '📱 Comandă prin WhatsApp', nl: '📱 Bestellen via WhatsApp' , sq: '📱 Porosit përmes WhatsApp', ku: '📱 Bi WhatsApp sifariş bide', pl: '📱 Zamów przez WhatsApp'},
  heroCtaMore: { de: 'Mehr entdecken', en: 'Discover more', tr: 'Daha fazlasını keşfet', ro: 'Descoperă mai mult', nl: 'Meer ontdekken' , sq: 'Zbulo më shumë', ku: 'Bêtir keşf bike', pl: 'Odkryj więcej'},
  heroCtaGroup: { de: 'Gruppenbestellung starten — mit Freunden zusammen bestellen! →', en: 'Start a group order — order together with friends! →', tr: 'Grup siparişi başlat — arkadaşlarınla birlikte sipariş ver! →', ro: 'Începe o comandă de grup — comandă împreună cu prietenii! →', nl: 'Start een groepsbestelling — samen bestellen met vrienden! →' , sq: 'Fillo porosi në grup — porosit së bashku me shokët! →', ku: 'Sifarişa komê dest pê bike — bi hevalan re sifariş bide! →', pl: 'Rozpocznij zamówienie grupowe — zamawiaj razem ze znajomymi! →'},
  heroOpeningHours: { de: 'Öffnungszeiten', en: 'Opening hours', tr: 'Çalışma saatleri', ro: 'Program', nl: 'Openingstijden' , sq: 'Orari i hapjes', ku: 'Demên vekirî', pl: 'Godziny otwarcia'},
  heroClosedDay: { de: 'Ruhetag', en: 'Closed on', tr: 'Kapalı gün', ro: 'Zi de închidere', nl: 'Gesloten dag' , sq: 'Mbyllur', ku: 'Girtî', pl: 'Dzień zamknięcia'},
  heroAddress: { de: 'Adresse', en: 'Address', tr: 'Adres', ro: 'Adresă', nl: 'Adres' , sq: 'Adresa', ku: 'Navnîşan', pl: 'Adres'},
  extrasKicker: { de: 'UNSERE DIGITALEN EXTRAS', en: 'OUR DIGITAL EXTRAS', tr: 'DİJİTAL EKSTRALARIMIZ', ro: 'EXTRELE NOASTRE DIGITALE', nl: 'ONZE DIGITALE EXTRA’S' , sq: 'EKSTRAT TONA DIGJITALE', ku: 'ZÊDEYÊN ME YÊN DIJÎTAL', pl: 'NASZE CYFROWE DODATKI'},
  extrasTitle: { de: 'Mehr als nur bestellen', en: 'More than just ordering', tr: 'Sadece sipariş vermekten fazlası', ro: 'Mai mult decât o simplă comandă', nl: 'Meer dan alleen bestellen' , sq: 'Më shumë se thjesht porosi', ku: 'Ji sifarişkirinê zêdetir', pl: 'Więcej niż tylko zamawianie'},
  extrasTip: { de: '🎡 Tipp: Beim Bestellen wartet vor dem Absenden ein Glücksrad mit Gewinnchance!', en: '🎡 Tip: A lucky wheel with a chance to win is waiting before you send your order!', tr: '🎡 İpucu: Sipariş göndermeden önce kazanma şansı olan bir çark seni bekliyor!', ro: '🎡 Sfat: O roată norocoasă cu șansă de câștig te așteaptă înainte de a trimite comanda!', nl: '🎡 Tip: Voor je bestelling verstuurt, wacht een geluksrad met winkans!' , sq: '🎡 Këshillë: Para se të dërgosh porosinë, të pret rrota e fatit me shans fitoreje!', ku: '🎡 Şîret: Berî şandina sifarişê çerxa bextê ya bi şansê ya biserketinê li benda te ye!', pl: '🎡 Wskazówka: podczas składania zamówienia, przed wysłaniem czeka koło szczęścia z szansą na wygraną!'},
  featWaTitle: { de: 'WhatsApp Bestellung', en: 'WhatsApp Order', tr: 'WhatsApp Sipariş', ro: 'Comandă WhatsApp', nl: 'WhatsApp Bestelling' , sq: 'Porosi me WhatsApp', ku: 'Sifarişa WhatsApp', pl: 'Zamówienie przez WhatsApp'},
  featWaSub: { de: 'Menü wählen, direkt zur Abholung senden', en: 'Choose from the menu, send straight for pickup', tr: 'Menüden seç, direkt teslim alma için gönder', ro: 'Alege din meniu, trimite direct pentru ridicare', nl: 'Kies uit het menu, direct versturen om af te halen' , sq: 'Zgjidh nga menuja, dërgo direkt për marrje', ku: 'Ji menûyê hilbijêre, rasterast ji bo standinê bişîne', pl: 'Wybierz menu, wyślij bezpośrednio do odbioru'},
  featBuilderTitle: { de: 'Baue Döner, Pizza oder Pasta', en: 'Build a Döner, Pizza or Pasta', tr: 'Döner, Pizza veya Pasta Oluştur', ro: 'Construiește Kebap, Pizza sau Pasta', nl: 'Bouw een Döner, Pizza of Pasta' , sq: 'Krijo Döner, Picë ose Pastë', ku: 'Dönerê, Pizzayê an Pastayê çêke', pl: 'Zbuduj kebab, pizzę lub makaron'},
  featBuilderSub: { de: 'Ganz nach deinem Geschmack — Schritt für Schritt selbst zusammenstellen', en: 'Exactly to your taste — build it step by step yourself', tr: 'Tamamen kendi zevkine göre — adım adım kendin oluştur', ro: 'Exact după gustul tău — construiește-l pas cu pas', nl: 'Precies naar jouw smaak — stap voor stap zelf samenstellen' , sq: 'Sipas shijes tënde — krijoje vetë hap pas hapi', ku: 'Bi tam ya te — gav bi gav bi xwe çêke', pl: 'Dokładnie według Twojego gustu — krok po kroku ułóż sam(a)'},
  builderQuickLabel: { de: 'Döner, Pizza & Pasta selbst bauen', en: 'Build your Döner, Pizza & Pasta', tr: 'Döner, Pizza & Pasta Oluştur', ro: 'Construiește Kebap, Pizza & Pasta', nl: 'Bouw je Döner, Pizza & Pasta' , sq: 'Krijo vetë Döner, Picë & Pastë', ku: 'Dönerê, Pizzayê & Pastayê bi xwe çêke', pl: 'Zbuduj sam(a) kebab, pizzę i makaron'},
  featGroupTitle: { de: 'Gruppenbestellung', en: 'Group Order', tr: 'Grup Siparişi', ro: 'Comandă de grup', nl: 'Groepsbestelling' , sq: 'Porosi në grup', ku: 'Sifarişa Komê', pl: 'Zamówienie grupowe'},
  featGroupSub: { de: 'Mit Freunden zusammen bestellen', en: 'Order together with friends', tr: 'Arkadaşlarınla birlikte sipariş ver', ro: 'Comandă împreună cu prietenii', nl: 'Samen bestellen met vrienden' , sq: 'Porosit së bashku me shokët', ku: 'Bi hevalan re sifariş bide', pl: 'Zamawiaj razem ze znajomymi'},
  featLoyaltyTitle: { de: 'Treuekarte', en: 'Loyalty Card', tr: 'Sadakat Kartı', ro: 'Card de fidelitate', nl: 'Spaarkaart' , sq: 'Karta e besnikërisë', ku: 'Karta Dilsozîyê', pl: 'Karta lojalnościowa'},
  featSurpriseSub: { de: 'Lass dich zufällig inspirieren', en: 'Get a random inspiration', tr: 'Rastgele bir ilham al', ro: 'Inspiră-te aleatoriu', nl: 'Laat je willekeurig inspireren' , sq: 'Lëre veten të frymëzohesh rastësisht', ku: 'Bihêle bi rengekî tesadufî îlham bigirî', pl: 'Daj się zainspirować losowo'},
  featLoyaltySub: { de: '8 Stempel sammeln, Gratis-Portion sichern', en: 'Collect 8 stamps, get a free item', tr: '8 damga topla, ücretsiz ürün kazan', ro: 'Colectează 8 ștampile, primești gratuit', nl: '8 stempels sparen, gratis item ontvangen' , sq: 'Mblidh 8 vula, siguro një racion falas', ku: '8 mor berhev bike, portîyoneke belaş bistîne', pl: 'Zbierz 8 pieczątek, zdobądź darmową porcję'},
  footerImpressum: { de: 'Impressum', en: 'Legal notice', tr: 'Yasal Bilgiler', ro: 'Date companie', nl: 'Colofon' , sq: 'Të dhëna ligjore', ku: 'Agahiyên Hiqûqî', pl: 'Impressum'},
  footerDatenschutz: { de: 'Datenschutz', en: 'Privacy', tr: 'Gizlilik', ro: 'Confidențialitate', nl: 'Privacy' , sq: 'Privatësia', ku: 'Nihêniya Daneyan', pl: 'Polityka prywatności'},
  galleryTerrace: { de: 'UNSERE TERRASSE', en: 'OUR TERRACE', tr: 'TERASIMIZ', ro: 'TERASA NOASTRĂ', nl: 'ONS TERRAS' , sq: 'TARACA JONË', ku: 'TERASA ME', pl: 'NASZ TARAS'},
  galleryTerraceTitle: { de: 'Ein Stück Bodrum in Deutschland', en: 'A piece of Bodrum in Germany', tr: 'Almanya\'da bir parça Bodrum', ro: 'O bucată din Bodrum în Germania', nl: 'Een stukje Bodrum in Duitsland' , sq: 'Një copë Bodrum në Gjermani', ku: 'Perçeyek Bodrumê li Almanyayê', pl: 'Kawałek Bodrum w Niemczech'},
  galleryTerraceSub: { de: 'Gemütlich draußen sitzen & genießen — direkt bei uns in Vechta.', en: 'Sit outside and enjoy — right here in Vechta.', tr: 'Dışarıda rahatça oturup keyif çıkar — Vechta\'da bizde.', ro: 'Stai afară și bucură-te — direct la noi în Vechta.', nl: 'Gezellig buiten zitten & genieten — bij ons in Vechta.' , sq: 'Ulu rehat jashtë & shijo — pikërisht te ne në Vechta.', ku: 'Li derve bi rihetî rûnê û kêfê bike — li vir li Vechta li cem me.', pl: 'Usiądź wygodnie na zewnątrz i ciesz się chwilą — u nas w Vechcie.'},
  galleryKitchen: { de: 'EIN BLICK IN UNSERE KÜCHE', en: 'A LOOK INTO OUR KITCHEN', tr: 'MUTFAĞIMIZDAN BİR BAKIŞ', ro: 'O PRIVIRE ÎN BUCĂTĂRIA NOASTRĂ', nl: 'EEN KIJKJE IN ONZE KEUKEN' , sq: 'NJË VËSHTRIM NË KUZHINËN TONË', ku: 'LI MATBAXA ME BINÊRE', pl: 'SPOJRZENIE DO NASZEJ KUCHNI'},
  contactKicker: { de: 'BESUCH UNS', en: 'VISIT US', tr: 'BİZİ ZİYARET ET', ro: 'VIZITEAZĂ-NE', nl: 'BEZOEK ONS' , sq: 'NA VIZITO', ku: 'SERDANA ME BIKE', pl: 'ODWIEDŹ NAS'},
  contactTitle: { de: 'So findest du uns', en: 'How to find us', tr: 'Bizi nasıl bulursun', ro: 'Cum ne găsești', nl: 'Zo vind je ons' , sq: 'Kështu na gjen', ku: 'Bi vî rengî tu me dibînî', pl: 'Tak nas znajdziesz'},
  contactRoute: { de: '📍 Route planen', en: '📍 Get directions', tr: '📍 Yol tarifi al', ro: '📍 Planifică traseul', nl: '📍 Route plannen' , sq: '📍 Planifiko itinerarin', ku: '📍 Rêyê plansaz bike', pl: '📍 Zaplanuj trasę'},
  weiter: { de: 'Weiter →', en: 'Next →', tr: 'İleri →', ro: 'Continuă →', nl: 'Verder →' , sq: 'Vazhdo →', ku: 'Bidomîne →', pl: 'Dalej →'},
  zurueck: { de: 'Zurück', en: 'Back', tr: 'Geri', ro: 'Înapoi', nl: 'Terug' , sq: 'Prapa', ku: 'Vegere', pl: 'Wstecz'},
  abbrechen: { de: 'Abbrechen', en: 'Cancel', tr: 'İptal', ro: 'Anulează', nl: 'Annuleren' , sq: 'Anulo', ku: 'Betal bike', pl: 'Anuluj'},
  hinzufuegen: { de: 'Hinzufügen', en: 'Add', tr: 'Ekle', ro: 'Adaugă', nl: 'Toevoegen' , sq: 'Shto', ku: 'Zêde bike', pl: 'Dodaj'},
  toCart: { de: 'Zum Warenkorb', en: 'Add to cart', tr: 'Sepete ekle', ro: 'Adaugă în coș', nl: 'In winkelwagen' , sq: 'Në shportë', ku: 'Bo selikê', pl: 'Do koszyka'},
  gesamt: { de: 'Gesamt', en: 'Total', tr: 'Toplam', ro: 'Total', nl: 'Totaal' , sq: 'Gjithsej', ku: 'Bi Tevayî', pl: 'Razem'},
  waSend: { de: 'Per WhatsApp senden', en: 'Send via WhatsApp', tr: 'WhatsApp ile gönder', ro: 'Trimite prin WhatsApp', nl: 'Versturen via WhatsApp' , sq: 'Dërgo përmes WhatsApp', ku: 'Bi WhatsApp bişîne', pl: 'Wyślij przez WhatsApp'},
  cartEmpty: { de: 'Dein Warenkorb ist leer.', en: 'Your cart is empty.', tr: 'Sepetin boş.', ro: 'Coșul tău este gol.', nl: 'Je winkelwagen is leeg.' , sq: 'Shporta jote është bosh.', ku: 'Selika te vala ye.', pl: 'Twój koszyk jest pusty.'},
  skip: { de: 'Nein danke, überspringen', en: 'No thanks, skip', tr: 'Hayır teşekkürler, geç', ro: 'Nu, mulțumesc, sari peste', nl: 'Nee bedankt, overslaan' , sq: 'Jo faleminderit, kalo', ku: 'Na spas, derbas bike', pl: 'Nie dziękuję, pomiń'},
  yourName: { de: 'Dein Name', en: 'Your name', tr: 'Adın', ro: 'Numele tău', nl: 'Je naam' , sq: 'Emri yt', ku: 'Navê te', pl: 'Twoje imię'},
  groupStart: { de: 'Neue Gruppenbestellung starten', en: 'Start a new group order', tr: 'Yeni grup siparişi başlat', ro: 'Începe o comandă de grup nouă', nl: 'Nieuwe groepsbestelling starten' , sq: 'Fillo porosi të re në grup', ku: 'Sifarişeke nû ya komê dest pê bike', pl: 'Rozpocznij nowe zamówienie grupowe'},
  groupJoin: { de: 'Mit Code beitreten', en: 'Join with code', tr: 'Kod ile katıl', ro: 'Alătură-te cu cod', nl: 'Deelnemen met code' , sq: 'Bashkohu me kod', ku: 'Bi kodê tevlî bibe', pl: 'Dołącz kodem'},
  groupSubmit: { de: 'Meine Bestellung abschicken', en: 'Submit my order', tr: 'Siparişimi gönder', ro: 'Trimite comanda mea', nl: 'Mijn bestelling versturen' , sq: 'Dërgo porosinë time', ku: 'Sifarişa xwe bişîne', pl: 'Wyślij moje zamówienie'},
  groupSendFinal: { de: 'Gesamtbestellung an WhatsApp senden', en: 'Send full order via WhatsApp', tr: 'Toplam siparişi WhatsApp\'a gönder', ro: 'Trimite comanda totală prin WhatsApp', nl: 'Volledige bestelling versturen via WhatsApp' , sq: 'Dërgo porosinë e plotë në WhatsApp', ku: 'Sifarişa giştî bi WhatsApp bişîne', pl: 'Wyślij całe zamówienie na WhatsApp'},
  groupAlreadySent: { de: 'hat die Bestellung bereits gesendet. Du musst nichts weiter tun.', en: 'has already sent the order. You don\'t need to do anything else.', tr: 'siparişi zaten gönderdi. Senin bir şey yapmana gerek yok.', ro: 'a trimis deja comanda. Nu mai trebuie să faci nimic.', nl: 'heeft de bestelling al verstuurd. Je hoeft verder niets te doen.' , sq: 'e ka dërguar tashmë porosinë. Nuk duhet të bësh asgjë tjetër.', ku: 'sifariş jixwe şandiye. Tu ne hewce yî tiştekî din bikî.', pl: 'wysłał(a) już zamówienie. Nie musisz nic więcej robić.'},
  titleWa: { de: 'WHATSAPP BESTELLUNG', en: 'WHATSAPP ORDER', tr: 'WHATSAPP SİPARİŞ', ro: 'COMANDĂ WHATSAPP', nl: 'WHATSAPP BESTELLING' , sq: 'POROSI ME WHATSAPP', ku: 'SIFARIŞA WHATSAPP', pl: 'ZAMÓWIENIE PRZEZ WHATSAPP'},
  titleBuilder: { de: 'DEIN DÖNER', en: 'YOUR DÖNER', tr: 'SENİN DÖNERİN', ro: 'KEBAP-UL TĂU', nl: 'JOUW DÖNER' , sq: 'DÖNERI YT', ku: 'DÖNERÊ TE', pl: 'TWÓJ KEBAB'},
  titleGroup: { de: 'GRUPPENBESTELLUNG', en: 'GROUP ORDER', tr: 'GRUP SİPARİŞİ', ro: 'COMANDĂ DE GRUP', nl: 'GROEPSBESTELLING' , sq: 'POROSI NË GRUP', ku: 'SIFARIŞA KOMÊ', pl: 'ZAMÓWIENIE GRUPOWE'},
  titleStaff: { de: 'PERSONAL-BEREICH', en: 'STAFF AREA', tr: 'PERSONEL ALANI', ro: 'ZONĂ PERSONAL', nl: 'PERSONEELSGEDEELTE' , sq: 'ZONA E STAFIT', ku: 'QADA KARMENDAN', pl: 'STREFA PERSONELU'},
  titleLoyalty: { de: 'TREUEKARTE', en: 'LOYALTY CARD', tr: 'SADAKAT KARTI', ro: 'CARD DE FIDELITATE', nl: 'SPAARKAART' , sq: 'KARTA E BESNIKËRISË', ku: 'KARTA DILSOZÎYÊ', pl: 'KARTA LOJALNOŚCIOWA'},
  weekendOnlyToday: { de: '🎉 NUR HEUTE — SAMSTAG', en: '🎉 TODAY ONLY — SATURDAY', tr: '🎉 SADECE BUGÜN — CUMARTESİ', ro: '🎉 DOAR ASTĂZI — SÂMBĂTĂ', nl: '🎉 ALLEEN VANDAAG — ZATERDAG' , sq: '🎉 VETËM SOT — E SHTUNË', ku: '🎉 TENÊ ÎRO — ŞEMÎ', pl: '🎉 TYLKO DZIŚ — SOBOTA'},
  weekendOfferTitle: { de: 'Wochenende-Angebot!', en: 'Weekend Special!', tr: 'Hafta Sonu Fırsatı!', ro: 'Ofertă de Weekend!', nl: 'Weekendaanbieding!' , sq: 'Oferta e fundjavës!', ku: 'Pêşniyara Dawiya Hefteyê!', pl: 'Oferta weekendowa!'},
  weekendPizzaTitle: { de: '🍕 28cm Pizza + Dose Getränk', en: '🍕 28cm Pizza + Canned Drink', tr: '🍕 28cm Pizza + Kutu İçecek', ro: '🍕 Pizza 28cm + Băutură la doză', nl: '🍕 28cm Pizza + Blikje drinken' , sq: '🍕 Picë 28cm + Pije kanaçe', ku: '🍕 Pizza 28cm + Vexwarina qutîkirî', pl: '🍕 Pizza 28cm + puszka napoju'},
  weekendPizzaSub: { de: 'Wähle deine Wunschpizza aus unserer ganzen Pizzakarte!', en: 'Choose your favorite pizza from our whole pizza menu!', tr: 'Tüm pizza menümüzden istediğin pizzayı seç!', ro: 'Alege pizza preferată din întreg meniul nostru de pizza!', nl: 'Kies je favoriete pizza uit onze hele pizzakaart!' , sq: 'Zgjidh picën tënde të preferuar nga e gjithë menuja jonë e picave!', ku: 'Ji tevahiya menûya me ya pizzayan pizzaya xwe hilbijêre!', pl: 'Wybierz swoją wymarzoną pizzę z całej naszej karty!'},
  choosePizza: { de: 'Pizza auswählen →', en: 'Choose pizza →', tr: 'Pizza seç →', ro: 'Alege pizza →', nl: 'Kies pizza →' , sq: 'Zgjidh picën →', ku: 'Pizzayê hilbijêre →', pl: 'Wybierz pizzę →'},
  chooseMeat: { de: 'FLEISCH WÄHLEN:', en: 'CHOOSE MEAT:', tr: 'ET SEÇ:', ro: 'ALEGE CARNEA:', nl: 'KIES VLEES:' , sq: 'ZGJIDH MISHIN:', ku: 'GOŞTÊ HILBIJÊRE:', pl: 'WYBIERZ MIĘSO:'},
  included: { de: 'inklusive', en: 'included', tr: 'dahil', ro: 'inclus', nl: 'inbegrepen' , sq: 'e përfshirë', ku: 'tê de', pl: 'w cenie'},
  addToOrder: { de: 'Zur Bestellung hinzufügen', en: 'Add to order', tr: 'Siparişe ekle', ro: 'Adaugă la comandă', nl: 'Toevoegen aan bestelling' , sq: 'Shto te porosia', ku: 'Li sifarişê zêde bike', pl: 'Dodaj do zamówienia'},
  chooseArrow: { de: 'Auswählen →', en: 'Choose →', tr: 'Seç →', ro: 'Alege →', nl: 'Kies →' , sq: 'Zgjidh →', ku: 'Hilbijêre →', pl: 'Wybierz →'},
  weekendTeaserOnly: { de: '🎉 Nur Samstag:', en: '🎉 Saturday only:', tr: '🎉 Sadece Cumartesi:', ro: '🎉 Doar sâmbătă:', nl: '🎉 Alleen zaterdag:' , sq: '🎉 Vetëm të shtunën:', ku: '🎉 Tenê Şemî:', pl: '🎉 Tylko w sobotę:'},
  lunchOffer: { de: 'MITTAGSANGEBOT · 9,50 €', en: 'LUNCH SPECIAL · €9.50', tr: 'ÖĞLE FIRSATI · 9,50 €', ro: 'OFERTĂ DE PRÂNZ · 9,50 €', nl: 'LUNCHAANBIEDING · € 9,50' , sq: 'OFERTA E DREKËS · 9,50 €', ku: 'PÊŞNIYARA NAVROJÊ · 9,50 €', pl: 'OFERTA OBIADOWA · 9,50 €'},
  lunchOfferInactive: { de: 'Mo.–Fr. 11:30–14:00 Uhr · inkl. Getränk', en: 'Mon–Fri 11:30 AM–2:00 PM · incl. drink', tr: 'Pzt–Cuma 11:30–14:00 · içecek dahil', ro: 'Lun–Vin 11:30–14:00 · include băutură', nl: 'Ma–vr 11:30–14:00 uur · incl. drankje' , sq: 'Hën–Pre 11:30–14:00 · me pije të përfshirë', ku: 'Duş–În 11:30–14:00 · bi vexwarinê ve', pl: 'Pon.–Pt. 11:30–14:00 · w cenie napój'},
  lunchOfferItems: { de: '28cm Pizza · Salat · Schnitzel · Nudelgericht', en: '28cm Pizza · Salad · Schnitzel · Pasta dish', tr: '28cm Pizza · Salata · Şnitzel · Makarna', ro: 'Pizza 28cm · Salată · Șnițel · Paste', nl: '28cm Pizza · Salade · Schnitzel · Pastagerecht' , sq: 'Picë 28cm · Sallatë · Shnicel · Gjellë makaronash', ku: 'Pizza 28cm · Salate · Şnîtzel · Xwarina makarnayê', pl: 'Pizza 28cm · Sałatka · Sznycel · Danie z makaronu'},
  wheelPrompt: { de: 'Dreh am Glücksrad, bevor du bestellst!', en: 'Spin the lucky wheel before you order!', tr: 'Sipariş vermeden önce şans çarkını çevir!', ro: 'Învârte roata norocului înainte de a comanda!', nl: 'Draai aan het geluksrad voordat je bestelt!' , sq: 'Rrotullo rrotën e fatit para se të porositësh!', ku: 'Berî sifariş bidî çerxa bextê bizivirîne!', pl: 'Zakręć kołem szczęścia przed złożeniem zamówienia!'},
  wheelSub: { de: 'Gewinne z. B. 10% Rabatt, ein Gratis-Getränk, Gratis-Pommes oder Chicken Nuggets 🎁', en: 'Win e.g. 10% off, a free drink, free fries or chicken nuggets 🎁', tr: 'Örneğin %10 indirim, ücretsiz içecek, ücretsiz patates veya nugget kazan 🎁', ro: 'Câștigă de ex. 10% reducere, o băutură gratuită, cartofi prăjiți gratuiți sau nuggets 🎁', nl: 'Win bijv. 10% korting, een gratis drankje, gratis friet of chicken nuggets 🎁' , sq: 'Fito p.sh. 10% zbritje, një pije falas, patate falas ose nagets pule 🎁', ku: 'Mînak 10% daxistin, vexwarineke belaş, çîpsên belaş an nagetsên mirîşkê bi dest bixe 🎁', pl: 'Wygraj np. 10% rabatu, darmowy napój, darmowe frytki lub nuggetsy z kurczaka 🎁'},
  showCodeAtCounter: { de: 'Zeig diesen Code an der Kasse:', en: 'Show this code at the counter:', tr: 'Bu kodu kasada göster:', ro: 'Arată acest cod la casă:', nl: 'Toon deze code bij de kassa:' , sq: 'Trego këtë kod te arka:', ku: 'Vê kodê li kasayê nîşan bide:', pl: 'Pokaż ten kod przy kasie:'},
  noExtraWin: { de: 'Diesmal kein Extra-Gewinn', en: 'No extra win this time', tr: 'Bu sefer ekstra kazanç yok', ro: 'De data aceasta fără premiu suplimentar', nl: 'Deze keer geen extra prijs' , sq: 'Këtë herë pa fitore shtesë', ku: 'Vê carê xelateke din tune', pl: 'Tym razem bez dodatkowej wygranej'},
  thanksPlaying: { de: 'Aber danke fürs Mitspielen — beim nächsten Mal mehr Glück!', en: 'But thanks for playing — more luck next time!', tr: 'Ama katıldığın için teşekkürler — bir dahaki sefere daha çok şans!', ro: 'Dar îți mulțumim că ai jucat — mai mult noroc data viitoare!', nl: 'Maar bedankt voor het meedoen — volgende keer meer geluk!' , sq: 'Por faleminderit që luajte — më shumë fat herën tjetër!', ku: 'Lê spas ji bo lîstinê — cara din bextê zêdetir!', pl: 'Ale dziękujemy za grę — następnym razem więcej szczęścia!'},
  spinning: { de: 'Dreht sich…', en: 'Spinning…', tr: 'Dönüyor…', ro: 'Se învârte…', nl: 'Draait…' , sq: 'Po rrotullohet…', ku: 'Dizivire…', pl: 'Kręci się…'},
  spinNow: { de: 'Jetzt drehen!', en: 'Spin now!', tr: 'Şimdi çevir!', ro: 'Învârte acum!', nl: 'Draai nu!' , sq: 'Rrotullo tani!', ku: 'Niha bizivirîne!', pl: 'Zakręć teraz!'},
  closedTodayTitle: { de: 'Heute Ruhetag', en: 'Closed today', tr: 'Bugün kapalı', ro: 'Astăzi închis', nl: 'Vandaag gesloten' , sq: 'Sot mbyllur', ku: 'Îro girtî', pl: 'Dziś zamknięte'},
  closedTodaySub: { de: 'Wir haben dienstags geschlossen — ab morgen wieder ab 11:30 Uhr für dich da!', en: "We're closed on Tuesdays — back for you tomorrow from 11:30 AM!", tr: 'Salı günleri kapalıyız — yarından itibaren 11:30\'dan itibaren yine buradayız!', ro: 'Suntem închiși marțea — revenim mâine de la ora 11:30!', nl: 'Wij zijn dinsdag gesloten — morgen weer open vanaf 11:30 uur!' , sq: 'Ne jemi mbyllur të martave — nesër jemi përsëri për ty nga ora 11:30!', ku: 'Em Sêşeman girtî ne — sibê ji saet 11:30 ve dîsa ji bo te vekirî ne!', pl: 'We wtorki mamy zamknięte — od jutra znów czekamy na Ciebie od 11:30!'},
  upsellTitle: { de: 'Möchtest du noch etwas dazu?', en: 'Would you like anything else?', tr: 'Yanında bir şey ister misin?', ro: 'Mai dorești ceva pe lângă?', nl: 'Wil je er nog iets bij?' , sq: 'Do të doje diçka tjetër?', ku: 'Tu tiştekî din jî dixwazî?', pl: 'Chcesz coś jeszcze do tego?'},
  upsellSub: { de: 'Diese Klassiker passen perfekt zu deiner Bestellung!', en: 'These classics go perfectly with your order!', tr: 'Bu klasikler siparişine mükemmel uyar!', ro: 'Aceste clasice se potrivesc perfect cu comanda ta!', nl: 'Deze klassiekers passen perfect bij je bestelling!' , sq: 'Këto klasikë shkojnë përsosur me porosinë tënde!', ku: 'Van klasîkan bi sifarişa te re baş têkildar in!', pl: 'Te klasyki idealnie pasują do Twojego zamówienia!'},
  drinksSub: { de: 'Kalt und erfrischend zu deiner Bestellung!', en: 'Cold and refreshing with your order!', tr: 'Siparişine soğuk ve ferahlatıcı bir ek!', ro: 'Rece și răcoritor alături de comanda ta!', nl: 'Lekker fris en koud bij je bestelling!' , sq: 'E ftohtë dhe freskuese me porosinë tënde!', ku: 'Sar û vejîner bi sifarişa te re!', pl: 'Zimne i orzeźwiające do Twojego zamówienia!'},
  continueToOrder: { de: 'Weiter zur Bestellung', en: 'Continue to order', tr: 'Siparişe devam et', ro: 'Continuă spre comandă', nl: 'Verder naar bestelling' , sq: 'Vazhdo te porosia', ku: 'Here ser sifarişê', pl: 'Przejdź do zamówienia'},
  wheelSpinOnceMsg: { de: 'Dreh einmal — dein Gewinn wird automatisch zur Bestellung hinzugefügt!', en: 'Spin once — your prize will be added to the order automatically!', tr: 'Bir kez çevir — kazandığın ödül otomatik olarak siparişe eklenir!', ro: 'Învârte o dată — premiul tău va fi adăugat automat la comandă!', nl: 'Draai één keer — je prijs wordt automatisch aan de bestelling toegevoegd!' , sq: 'Rrotullo një herë — fitorja jote shtohet automatikisht te porosia!', ku: 'Carekê bizivirîne — xelata te bixweber li sifarişê tê zêdekirin!', pl: 'Zakręć raz — Twoja wygrana zostanie automatycznie dodana do zamówienia!'},
  confirmPickupNote: { de: 'Die Abholzeit bestätigen wir euch direkt per WhatsApp-Antwort.', en: "We'll confirm the pickup time directly via WhatsApp reply.", tr: 'Teslim alma saatini WhatsApp üzerinden doğrudan onaylayacağız.', ro: 'Vă confirmăm ora de ridicare direct prin răspuns pe WhatsApp.', nl: 'We bevestigen de ophaaltijd rechtstreeks via WhatsApp.' , sq: 'Orën e marrjes do ta konfirmojmë direkt me përgjigje në WhatsApp.', ku: 'Em ê dema standinê rasterast bi bersiveke WhatsApp piştrast bikin.', pl: 'Godzinę odbioru potwierdzimy bezpośrednio w odpowiedzi na WhatsApp.'},
  chooseBase: { de: 'Wähle deine Basis', en: 'Choose your base', tr: 'Bazını seç', ro: 'Alege baza', nl: 'Kies je basis' , sq: 'Zgjidh bazën tënde', ku: 'Bingeha xwe hilbijêre', pl: 'Wybierz swoją bazę'},
  chooseBaseSub: { de: 'Wie soll dein Döner serviert werden?', en: 'How would you like your Döner served?', tr: 'Dönerin nasıl servis edilsin?', ro: 'Cum dorești să fie servit kebap-ul tău?', nl: 'Hoe wil je je Döner geserveerd hebben?' , sq: 'Si dëshiron ta shërbejmë Dönerin tënd?', ku: 'Döner çawa were pêşkêşkirin?', pl: 'Jak podać Twojego kebaba?'},
  chooseMeatTitle: { de: 'Wähle dein Lieblingsfleisch.', en: 'Choose your favorite meat.', tr: 'Favori etini seç.', ro: 'Alege carnea preferată.', nl: 'Kies je favoriete vlees.' , sq: 'Zgjidh mishin tënd të preferuar.', ku: 'Goştê xwe yê hezkirî hilbijêre.', pl: 'Wybierz swoje ulubione mięso.'},
  chooseSauceTitle: { de: 'Welche Soße?', en: 'Which sauce?', tr: 'Hangi sos?', ro: 'Ce sos?', nl: 'Welke saus?' , sq: 'Cila salcë?', ku: 'Kîjan soz?', pl: 'Jaki sos?'},
  chooseSauceSub: { de: 'Eine Soße aussuchen.', en: 'Pick one sauce.', tr: 'Bir sos seç.', ro: 'Alege un sos.', nl: 'Kies één saus.' , sq: 'Zgjidh një salcë.', ku: 'Sozekê hilbijêre.', pl: 'Wybierz jeden sos.'},
  chooseExtrasSub: { de: 'So viele du möchtest — optional.', en: 'As many as you like — optional.', tr: 'İstediğin kadar — isteğe bağlı.', ro: 'Câte dorești — opțional.', nl: 'Zoveel als je wilt — optioneel.' , sq: 'Sa shumë të duash — opsionale.', ku: 'Çend ku tu bixwazî — vebijarkî.', pl: 'Tyle, ile chcesz — opcjonalnie.'},
  doenerReadyTitle: { de: 'Dein Döner ist fertig! 🎉', en: 'Your Döner is ready! 🎉', tr: 'Dönerin hazır! 🎉', ro: 'Kebap-ul tău este gata! 🎉', nl: 'Jouw Döner is klaar! 🎉' , sq: 'Döneri yt është gati! 🎉', ku: 'Dönerê te amade ye! 🎉', pl: 'Twój kebab jest gotowy! 🎉'},
  doenerReadySub: { de: 'Kurz prüfen und abschicken.', en: 'Quickly check and send.', tr: 'Kısaca kontrol et ve gönder.', ro: 'Verifică rapid și trimite.', nl: 'Snel controleren en versturen.' , sq: 'Kontrollo shkurt dhe dërgo.', ku: 'Kurt kontrol bike û bişîne.', pl: 'Sprawdź szybko i wyślij.'},
  backToOrder: { de: 'Zurück zur Bestellung', en: 'Back to order', tr: 'Siparişe geri dön', ro: 'Înapoi la comandă', nl: 'Terug naar bestelling' , sq: 'Kthehu te porosia', ku: 'Vegere ser sifarişê', pl: 'Wróć do zamówienia'},
  wheelTitle: { de: 'Glücksrad 🎡', en: 'Lucky Wheel 🎡', tr: 'Şans Çarkı 🎡', ro: 'Roata Norocului 🎡', nl: 'Geluksrad 🎡' , sq: 'Rrota e Fatit 🎡', ku: 'Çerxa Bextê 🎡', pl: 'Koło szczęścia 🎡'},
  groupStep1End: { de: 'und erhält einen Code.', en: 'and gets a code.', tr: 've bir kod alır.', ro: 'și primește un cod.', nl: 'en krijgt een code.' , sq: 'dhe merr një kod.', ku: 'û kodekê digire.', pl: 'i otrzymuje kod.'},
  groupStep2: { de: 'Diesen Code per WhatsApp mit Freunden teilen.', en: 'Share this code with friends via WhatsApp.', tr: 'Bu kodu WhatsApp üzerinden arkadaşlarınla paylaş.', ro: 'Distribuie acest cod prietenilor prin WhatsApp.', nl: 'Deel deze code met vrienden via WhatsApp.' , sq: 'Ndaj këtë kod me shokët përmes WhatsApp.', ku: 'Vê kodê bi WhatsApp bi hevalan re parve bike.', pl: 'Udostępnij ten kod znajomym przez WhatsApp.'},
  groupStep3Mid: { de: '„Mit Code beitreten"', en: '"Join with code"', tr: '"Kod ile katıl"', ro: '„Alătură-te cu cod"', nl: '"Deelnemen met code"' , sq: '\\"Bashkohu me kod\\"', ku: '\\"Bi kodê tevlî bibe\\"', pl: '„Dołącz kodem”'},
  groupStep3End: { de: ', gibt den Code ein und wählt seine eigenen Speisen aus.', en: ', enters the code and chooses their own food.', tr: ', kodu girer ve kendi yemeklerini seçer.', ro: ', introduce codul și își alege propriile mâncăruri.', nl: ', voert de code in en kiest zijn eigen gerechten.' , sq: ', fut kodin dhe zgjedh gjellët e veta.', ku: ', kodê dinivîse û xwarinên xwe hilbijêre.', pl: ', wpisuje kod i wybiera własne dania.'},
  groupStep4: { de: 'Am Ende wird alles zu einer gemeinsamen Bestellung zusammengefasst und per WhatsApp an uns geschickt.', en: 'At the end, everything is combined into one shared order and sent to us via WhatsApp.', tr: 'Sonunda her şey ortak bir siparişte birleştirilir ve bize WhatsApp üzerinden gönderilir.', ro: 'La final, totul este combinat într-o singură comandă și ne este trimis prin WhatsApp.', nl: 'Aan het einde wordt alles samengevoegd tot één gezamenlijke bestelling en naar ons verstuurd via WhatsApp.' , sq: 'Në fund gjithçka bashkohet në një porosi të përbashkët dhe dërgohet te ne përmes WhatsApp.', ku: 'Di dawiyê de her tişt dibe sifarişeke hevpar û bi WhatsApp ji me re tê şandin.', pl: 'Na koniec wszystko zostaje połączone w jedno wspólne zamówienie i wysłane do nas przez WhatsApp.'},
  shareCodeWithGroup: { de: 'Teile diesen Code mit deiner Gruppe:', en: 'Share this code with your group:', tr: 'Bu kodu grubunla paylaş:', ro: 'Distribuie acest cod grupului tău:', nl: 'Deel deze code met je groep:' , sq: 'Ndaje këtë kod me grupin tënd:', ku: 'Vê kodê bi koma xwe re parve bike:', pl: 'Udostępnij ten kod swojej grupie:'},
  continueToMyOrder: { de: 'Weiter zu meiner Bestellung', en: 'Continue to my order', tr: 'Siparişime devam et', ro: 'Continuă la comanda mea', nl: 'Verder naar mijn bestelling' , sq: 'Vazhdo te porosia ime', ku: 'Here ser sifarişa xwe', pl: 'Przejdź do mojego zamówienia'},
  continueToMenu: { de: 'Weiter zur Speisekarte', en: 'Continue to the menu', tr: 'Menüye devam et', ro: 'Continuă la meniu', nl: 'Verder naar het menu' , sq: 'Vazhdo te menuja', ku: 'Here ser menûyê', pl: 'Przejdź do menu'},
  orderAdded: { de: '✓ Deine Bestellung wurde hinzugefügt', en: '✓ Your order has been added', tr: '✓ Siparişin eklendi', ro: '✓ Comanda ta a fost adăugată', nl: '✓ Je bestelling is toegevoegd' , sq: '✓ Porosia jote u shtua', ku: '✓ Sifarişa te hate zêdekirin', pl: '✓ Twoje zamówienie zostało dodane'},
  editMyOrder: { de: '+ Meine Bestellung ändern', en: '+ Edit my order', tr: '+ Siparişimi değiştir', ro: '+ Modifică-mi comanda', nl: '+ Mijn bestelling wijzigen' , sq: '+ Ndrysho porosinë time', ku: '+ Sifarişa xwe biguherîne', pl: '+ Zmień moje zamówienie'},
  backToOverview: { de: 'Zurück zur Übersicht', en: 'Back to overview', tr: 'Genel bakışa dön', ro: 'Înapoi la prezentare generală', nl: 'Terug naar overzicht' , sq: 'Kthehu te përmbledhja', ku: 'Vegere ser pêşdîtinê', pl: 'Wróć do przeglądu'},
  wheelGrandMsg: { de: 'Dein Gewinn wird automatisch zur Gesamtbestellung hinzugefügt!', en: 'Your prize will be added to the group order automatically!', tr: 'Kazandığın ödül otomatik olarak toplam siparişe eklenir!', ro: 'Premiul tău va fi adăugat automat la comanda totală!', nl: 'Je prijs wordt automatisch toegevoegd aan de totale bestelling!' , sq: 'Fitorja jote shtohet automatikisht te porosia e përgjithshme!', ku: 'Xelata te bixweber li sifarişa giştî tê zêdekirin!', pl: 'Twoja wygrana zostanie automatycznie dodana do całego zamówienia!'},
  continueToOverview: { de: 'Weiter zur Übersicht', en: 'Continue to overview', tr: 'Genel bakışa devam et', ro: 'Continuă la prezentarea generală', nl: 'Verder naar overzicht' , sq: 'Vazhdo te përmbledhja', ku: 'Here ser pêşdîtinê', pl: 'Przejdź do przeglądu'},
  staffWheelCodeTitle: { de: '🎡 Glücksrad-Code', en: '🎡 Wheel code', tr: '🎡 Çark kodu', ro: '🎡 Cod roată', nl: '🎡 Radcode' , sq: '🎡 Kodi i Rrotës së Fatit', ku: '🎡 Koda Çerxa Bextê', pl: '🎡 Kod koła szczęścia'},
  codeNotFound: { de: 'Code nicht gefunden.', en: 'Code not found.', tr: 'Kod bulunamadı.', ro: 'Cod negăsit.', nl: 'Code niet gevonden.' , sq: 'Kodi nuk u gjet.', ku: 'Kod nehat dîtin.', pl: 'Nie znaleziono kodu.'},
  redeem: { de: 'Einlösen', en: 'Redeem', tr: 'Kullan', ro: 'Utilizează', nl: 'Inwisselen' , sq: 'Përdor', ku: 'Bikar bîne', pl: 'Odbierz'},
  confirmRedeem: { de: 'Einlösen bestätigen', en: 'Confirm redemption', tr: 'Kullanımı onayla', ro: 'Confirmă utilizarea', nl: 'Inwisselen bevestigen' , sq: 'Konfirmo përdorimin', ku: 'Bikaranînê piştrast bike', pl: 'Potwierdź odbiór'},
  loyaltyNoPhone: { de: 'Keine Telefonnummer nötig — deine Karte läuft über einen persönlichen Code.', en: 'No phone number needed — your card works via a personal code.', tr: 'Telefon numarası gerekmez — kartın kişisel bir kodla çalışır.', ro: 'Nu este nevoie de număr de telefon — cardul tău funcționează printr-un cod personal.', nl: 'Geen telefoonnummer nodig — je kaart werkt via een persoonlijke code.' , sq: 'Nuk nevojitet numër telefoni — karta jote funksionon me një kod personal.', ku: 'Ne hewceyî hejmara têlefonê ye — karta te bi koda şexsî dixebite.', pl: 'Numer telefonu niepotrzebny — Twoja karta działa dzięki osobistemu kodowi.'},
  codeDoesntExist: { de: 'Diesen Code gibt es nicht.', en: "This code doesn't exist.", tr: 'Bu kod mevcut değil.', ro: 'Acest cod nu există.', nl: 'Deze code bestaat niet.' , sq: 'Ky kod nuk ekziston.', ku: 'Ev kod nîne.', pl: 'Ten kod nie istnieje.'},
  showCodeForStamp: { de: 'Zeig deinen Code an der Kasse, damit wir einen Stempel hinzufügen können.', en: 'Show your code at the counter so we can add a stamp.', tr: 'Damga ekleyebilmemiz için kodunu kasada göster.', ro: 'Arată-ți codul la casă pentru a adăuga o ștampilă.', nl: 'Toon je code bij de kassa zodat we een stempel kunnen toevoegen.' , sq: 'Trego kodin tënd te arka që të shtojmë një vulë.', ku: 'Koda xwe li kasayê nîşan bide da ku em morekê zêde bikin.', pl: 'Pokaż swój kod przy kasie, abyśmy mogli dodać pieczątkę.'},
  dailyRecommendation: { de: 'TAGESEMPFEHLUNG', en: "TODAY'S PICKS", tr: 'GÜNÜN ÖNERİSİ', ro: 'RECOMANDAREA ZILEI', nl: 'AANBEVELING VAN DE DAG' , sq: 'REKOMANDIMI I DITËS', ku: 'PÊŞNIYARA ROJÊ', pl: 'POLECANE DNIA'},
  onlyLeft: { de: 'Nur noch', en: 'Only', tr: 'Sadece', ro: 'Doar', nl: 'Nog maar' , sq: 'Vetëm edhe', ku: 'Tenê hîn', pl: 'Zostało tylko'},
  minutesLeft: { de: 'Minuten!', en: 'minutes left!', tr: 'dakika kaldı!', ro: 'minute rămase!', nl: 'minuten over!' , sq: 'minuta!', ku: 'deqîqe!', pl: 'minut!'},
  chooseMeatQ: { de: 'Welches Fleisch?', en: 'Which meat?', tr: 'Hangi et?', ro: 'Ce carne?', nl: 'Welk vlees?' , sq: 'Cili mish?', ku: 'Kîjan goşt?', pl: 'Jakie mięso?'},
  extrasQ: { de: 'Extras dazu?', en: 'Extras?', tr: 'Ekstra ister misin?', ro: 'Extra?', nl: 'Extra’s erbij?' , sq: 'Ekstra?', ku: 'Zêde?', pl: 'Dodatki do tego?'},
  rowBasis: { de: 'Basis', en: 'Base', tr: 'Baz', ro: 'Bază', nl: 'Basis' , sq: 'Baza', ku: 'Bingeh', pl: 'Baza'},
  rowMeat: { de: 'Fleisch', en: 'Meat', tr: 'Et', ro: 'Carne', nl: 'Vlees' , sq: 'Mishi', ku: 'Goşt', pl: 'Mięso'},
  rowSauce: { de: 'Soße', en: 'Sauce', tr: 'Sos', ro: 'Sos', nl: 'Saus' , sq: 'Salca', ku: 'Soz', pl: 'Sos'},
  rowExtras: { de: 'Extras', en: 'Extras', tr: 'Ekstralar', ro: 'Extra', nl: 'Extra’s' , sq: 'Ekstrat', ku: 'Zêde', pl: 'Dodatki'},
  rowPrice: { de: 'Preis', en: 'Price', tr: 'Fiyat', ro: 'Preț', nl: 'Prijs' , sq: 'Çmimi', ku: 'Biha', pl: 'Cena'},
  freeLabel: { de: 'gratis', en: 'free', tr: 'ücretsiz', ro: 'gratuit', nl: 'gratis' , sq: 'falas', ku: 'belaş', pl: 'gratis'},
  continueBtn: { de: 'Weiter', en: 'Continue', tr: 'İleri', ro: 'Continuă', nl: 'Verder' , sq: 'Vazhdo', ku: 'Bidomîne', pl: 'Dalej'},
  wheelThresholdPrefix: { de: '🎡 Noch', en: '🎡 Only', tr: '🎡 Sadece', ro: '🎡 Doar', nl: '🎡 Nog maar' , sq: '🎡 Edhe', ku: '🎡 Hîn', pl: '🎡 Jeszcze'},
  wheelThresholdSuffix: { de: 'bis zum Glücksrad — ab 30,00 € Bestellwert!', en: 'until the lucky wheel — from €30.00 order value!', tr: 'şans çarkına kadar — 30,00 € üzeri siparişte!', ro: 'până la roata norocului — de la o comandă de 30,00 €!', nl: 'tot het geluksrad — vanaf € 30,00 bestelwaarde!' , sq: 'deri te rrota e fatit — nga 30,00 € vlerë porosie!', ku: 'heta çerxa bextê — ji nirxa sifarişê 30,00 € pê ve!', pl: 'do koła szczęścia — od 30,00 € wartości zamówienia!'},
  wonPrefix: { de: 'Gewonnen:', en: 'Won:', tr: 'Kazandın:', ro: 'Câștigat:', nl: 'Gewonnen:' , sq: 'Fituar:', ku: 'Hate bidestxistin:', pl: 'Wygrano:'},
  wonSuffix: { de: '— wird mitgeschickt', en: '— will be included', tr: '— siparişe eklenecek', ro: '— va fi inclus', nl: '— wordt meegestuurd' , sq: '— do të dërgohet bashkë', ku: '— dê were şandin', pl: '— zostanie dołączone'},
  groupStartBtn: { de: 'Neue Gruppenbestellung starten', en: 'Start a new group order', tr: 'Yeni grup siparişi başlat', ro: 'Începe o comandă de grup nouă', nl: 'Nieuwe groepsbestelling starten' , sq: 'Fillo porosi të re në grup', ku: 'Sifarişeke nû ya komê dest pê bike', pl: 'Rozpocznij nowe zamówienie grupowe'},
  howItWorks: { de: "👥 So funktioniert's:", en: '👥 How it works:', tr: '👥 Nasıl çalışır:', ro: '👥 Cum funcționează:', nl: '👥 Zo werkt het:' , sq: '👥 Si funksionon:', ku: '👥 Bi vî rengî dixebite:'},
  groupStep1Start: { de: 'Eine Person tippt auf', en: 'One person taps', tr: 'Bir kişi', ro: 'O persoană apasă pe', nl: 'Eén persoon tikt op' , sq: 'Një person prek', ku: 'Kesek li ser dide', pl: 'Jedna osoba klika'},
  groupStep3Start: { de: 'Jede/r tippt auf', en: 'Everyone taps', tr: 'Herkes', ro: 'Fiecare apasă pe', nl: 'Iedereen tikt op' , sq: 'Secili/a prek', ku: 'Her kes li ser dide', pl: 'Każdy klika'},
  groupStep3Btn: { de: '„Mit Code beitreten"', en: '"Join with code"', tr: '"Kod ile katıl"', ro: '„Alătură-te cu cod"', nl: '"Deelnemen met code"' , sq: '\\"Bashkohu me kod\\"', ku: '\\"Bi kodê tevlî bibe\\"', pl: '„Dołącz kodem”'},
  codePlaceholder: { de: 'Code z. B. K7XQ2', en: 'Code e.g. K7XQ2', tr: 'Kod örn. K7XQ2', ro: 'Cod ex. K7XQ2', nl: 'Code bijv. K7XQ2' , sq: 'Kodi p.sh. K7XQ2', ku: 'Kod mînak K7XQ2', pl: 'Kod np. K7XQ2'},
  joinBtn: { de: 'Beitreten', en: 'Join', tr: 'Katıl', ro: 'Alătură-te', nl: 'Deelnemen' , sq: 'Bashkohu', ku: 'Tevlî bibe', pl: 'Dołącz'},
  peopleOrderedSuffix: { de: 'Personen bestellt', en: 'people ordered', tr: 'kişi sipariş verdi', ro: 'persoane au comandat', nl: 'personen besteld' , sq: 'persona porositën', ku: 'kes sifariş dan', pl: 'osób zamówiło'},
  refreshBtn: { de: 'Aktualisieren', en: 'Refresh', tr: 'Yenile', ro: 'Reîmprospătează', nl: 'Vernieuwen' , sq: 'Rifresko', ku: 'Nû bike', pl: 'Odśwież'},
  grandTotalAll: { de: 'Gesamt (alle)', en: 'Total (all)', tr: 'Toplam (hepsi)', ro: 'Total (toți)', nl: 'Totaal (allemaal)' , sq: 'Gjithsej (të gjithë)', ku: 'Bi Tevayî (hemû)', pl: 'Razem (wszyscy)'},
  wheelPrizesCountSuffix: { de: 'x Glücksrad-Gewinn wird mitgeschickt', en: 'x wheel prize will be included', tr: 'x çark ödülü siparişe eklenecek', ro: 'x premii de la roată vor fi incluse', nl: 'x radprijs wordt meegestuurd' , sq: 'x fitore nga rrota e fatit do të dërgohet', ku: 'x xelata çerxa bextê dê were şandin', pl: 'x wygrana z koła zostanie dołączona'},
  loginBtn: { de: 'Anmelden', en: 'Log in', tr: 'Giriş yap', ro: 'Autentificare', nl: 'Inloggen' , sq: 'Hyr', ku: 'Têkeve', pl: 'Zaloguj się'},
  defaultPinNote: { de: 'Standard-PIN: 1234', en: 'Default PIN: 1234', tr: 'Varsayılan PIN: 1234', ro: 'PIN implicit: 1234', nl: 'Standaard-pincode: 1234' , sq: 'PIN standarde: 1234', ku: 'PIN standard: 1234', pl: 'Domyślny PIN: 1234'},
  loyaltyTabLabel: { de: '🎟️ Treuekarte', en: '🎟️ Loyalty card', tr: '🎟️ Sadakat kartı', ro: '🎟️ Card de fidelitate', nl: '🎟️ Spaarkaart' , sq: '🎟️ Karta e besnikërisë', ku: '🎟️ Karta Dilsozîyê', pl: '🎟️ Karta lojalnościowa'},
  customerCodePh: { de: 'Kunden-Code', en: 'Customer code', tr: 'Müşteri kodu', ro: 'Cod client', nl: 'Klantcode' , sq: 'Kodi i klientit', ku: 'Koda Muşteriyê', pl: 'Kod klienta'},
  searchBtn: { de: 'Suchen', en: 'Search', tr: 'Ara', ro: 'Caută', nl: 'Zoeken' , sq: 'Kërko', ku: 'Bigere', pl: 'Szukaj'},
  addStampBtn: { de: '+1 Stempel', en: '+1 stamp', tr: '+1 damga', ro: '+1 ștampilă', nl: '+1 stempel' , sq: '+1 vulë', ku: '+1 Mor', pl: '+1 pieczątka'},
  prizeCodePh: { de: 'Gewinn-Code', en: 'Prize code', tr: 'Ödül kodu', ro: 'Cod premiu', nl: 'Prijscode' , sq: 'Kodi i fitores', ku: 'Koda Xelatê', pl: 'Kod wygranej'},
  alreadyRedeemed: { de: 'Bereits eingelöst', en: 'Already redeemed', tr: 'Zaten kullanıldı', ro: 'Deja utilizat', nl: 'Al ingewisseld' , sq: 'Përdorur tashmë', ku: 'Berê hatiye bikaranîn', pl: 'Już odebrano'},
  validLabel: { de: 'Gültig', en: 'Valid', tr: 'Geçerli', ro: 'Valid', nl: 'Geldig' , sq: 'I vlefshëm', ku: 'Derbasdar', pl: 'Ważny'},
  stampAddedMsg: { de: 'Stempel hinzugefügt ✓', en: 'Stamp added ✓', tr: 'Damga eklendi ✓', ro: 'Ștampilă adăugată ✓', nl: 'Stempel toegevoegd ✓' , sq: 'Vula u shtua ✓', ku: 'Mor hate zêdekirin ✓', pl: 'Pieczątka dodana ✓'},
  freePortionRedeemedMsg: { de: 'Gratis-Portion eingelöst ✓', en: 'Free item redeemed ✓', tr: 'Ücretsiz ürün kullanıldı ✓', ro: 'Produs gratuit utilizat ✓', nl: 'Gratis item ingewisseld ✓' , sq: 'Racioni falas u përdor ✓', ku: 'Portîyona belaş hate bikaranîn ✓', pl: 'Darmowa porcja odebrana ✓'},
  redeemedMsg: { de: '✓ Eingelöst', en: '✓ Redeemed', tr: '✓ Kullanıldı', ro: '✓ Utilizat', nl: '✓ Ingewisseld' , sq: '✓ U përdor', ku: '✓ Hate bikaranîn', pl: '✓ Odebrano'},
  stampsWord: { de: 'Stempel', en: 'stamps', tr: 'damga', ro: 'ștampile', nl: 'stempels' , sq: 'vula', ku: 'mor', pl: 'Pieczątki'},
  haveCodeLabel: { de: 'ICH HABE SCHON EINEN CODE', en: 'I ALREADY HAVE A CODE', tr: 'ZATEN BİR KODUM VAR', ro: 'AM DEJA UN COD', nl: 'IK HEB AL EEN CODE' , sq: 'UNË KAM TASHMË NJË KOD', ku: 'MIN JIXWE KODEK HEYE', pl: 'MAM JUŻ KOD'},
  codeExamplePh: { de: 'Z. B. K7XQ2M', en: 'e.g. K7XQ2M', tr: 'Örn. K7XQ2M', ro: 'ex. K7XQ2M', nl: 'bijv. K7XQ2M' , sq: 'P.sh. K7XQ2M', ku: 'Mînak K7XQ2M', pl: 'Np. K7XQ2M'},
  showBtn: { de: 'Anzeigen', en: 'Show', tr: 'Göster', ro: 'Afișează', nl: 'Tonen' , sq: 'Trego', ku: 'Nîşan bide', pl: 'Pokaż'},
  orLabel: { de: '— oder —', en: '— or —', tr: '— veya —', ro: '— sau —', nl: '— of —' , sq: '— ose —', ku: '— an —', pl: '— lub —'},
  createNewCardBtn: { de: 'Neue Treuekarte erstellen', en: 'Create new loyalty card', tr: 'Yeni sadakat kartı oluştur', ro: 'Creează un card nou de fidelitate', nl: 'Nieuwe spaarkaart aanmaken' , sq: 'Krijo kartë të re besnikërie', ku: 'Karteke nû ya dilsozîyê çêke', pl: 'Utwórz nową kartę lojalnościową'},
  screenshotNote: { de: '📸 Bitte den Code notieren oder einen Screenshot machen — er ist dein einziger Zugang zur Karte!', en: '📸 Please note the code or take a screenshot — it\'s your only access to the card!', tr: '📸 Lütfen kodu not al veya ekran görüntüsü al — karta tek erişimin bu!', ro: '📸 Notează codul sau fă o captură de ecran — este singurul tău acces la card!', nl: '📸 Noteer de code of maak een screenshot — het is je enige toegang tot de kaart!' , sq: '📸 Ju lutem shënoni kodin ose bëni një pamje ekrani — është aksesi juaj i vetëm te karta!', ku: '📸 Ji kerema xwe kodê not bike an dîmenekê bigire — ev yekane rêya te ya gihîştina kartê ye!', pl: '📸 Zapisz kod lub zrób zrzut ekranu — to jedyny dostęp do Twojej karty!'},
  yourCodeLabel: { de: 'DEIN CODE', en: 'YOUR CODE', tr: 'KODUN', ro: 'CODUL TĂU', nl: 'JOUW CODE' , sq: 'KODI YT', ku: 'KODA TE', pl: 'TWÓJ KOD'},
  freeItemEarned: { de: '🎉 Gratis-Portion verdient!', en: '🎉 Free item earned!', tr: '🎉 Ücretsiz ürün kazandın!', ro: '🎉 Produs gratuit câștigat!', nl: '🎉 Gratis item verdiend!' , sq: '🎉 Fitove një racion falas!', ku: '🎉 Te portîyoneke belaş bi dest xist!', pl: '🎉 Zdobyto darmową porcję!'},
  stampsUntilFreePrefix: { de: 'Noch', en: 'Only', tr: 'Sadece', ro: 'Mai', nl: 'Nog' , sq: 'Edhe', ku: 'Hîn', pl: 'Jeszcze'},
  stampsUntilFreeSuffix: { de: 'Stempel bis zur Gratis-Portion', en: 'stamps until your free item', tr: 'damga kaldı, ücretsiz ürün kazanacaksın', ro: 'ștampile până la produsul gratuit', nl: 'stempels tot je gratis item' , sq: 'vula deri te racioni falas', ku: 'mor heta portîyona belaş', pl: 'pieczątek do darmowej porcji'},
  noteExampleCheese: { de: 'Anmerkung, z.B. ohne Käse', en: 'Note, e.g. no cheese', tr: 'Not, örn. peynirsiz', ro: 'Observație, ex. fără brânză', nl: 'Opmerking, bijv. zonder kaas' , sq: 'Shënim, p.sh. pa djathë', ku: 'Not, mînak bêyî penîr', pl: 'Uwaga, np. bez sera'},
  noteExampleOnions: { de: 'Anmerkung, z.B. ohne Zwiebeln', en: 'Note, e.g. no onions', tr: 'Not, örn. soğansız', ro: 'Observație, ex. fără ceapă', nl: 'Opmerking, bijv. zonder uien' , sq: 'Shënim, p.sh. pa qepë', ku: 'Not, mînak bêyî pîvaz', pl: 'Uwaga, np. bez cebuli'},
  noteOptional: { de: 'Anmerkung (optional)', en: 'Note (optional)', tr: 'Not (isteğe bağlı)', ro: 'Observație (opțional)', nl: 'Opmerking (optioneel)' , sq: 'Shënim (opsionale)', ku: 'Not (vebijarkî)', pl: 'Uwaga (opcjonalnie)'},
  pickupTimePh: { de: 'Gewünschte Abholzeit (optional)', en: 'Desired pickup time (optional)', tr: 'İstenen teslim alma saati (isteğe bağlı)', ro: 'Ora de ridicare dorită (opțional)', nl: 'Gewenste ophaaltijd (optioneel)' , sq: 'Ora e dëshiruar e marrjes (opsionale)', ku: 'Dema standinê ya xwestî (vebijarkî)', pl: 'Preferowana godzina odbioru (opcjonalnie)'},
  pickupTimeLabel: { de: 'Abholzeit', en: 'Pickup time', tr: 'Teslim alma saati', ro: 'Ora de ridicare', nl: 'Ophaaltijd' , sq: 'Ora e marrjes', ku: 'Dema Standinê', pl: 'Godzina odbioru'},
  titlePizzaBuilder: { de: 'DEINE PIZZA', en: 'YOUR PIZZA', tr: 'SENİN PİZZAN', ro: 'PIZZA TA', nl: 'JOUW PIZZA' , sq: 'PICA JOTE', ku: 'PIZZAYA TE', pl: 'TWOJA PIZZA'},
  titlePastaBuilder: { de: 'DEINE PASTA', en: 'YOUR PASTA', tr: 'SENİN MAKARNAN', ro: 'PASTA TA', nl: 'JOUW PASTA' , sq: 'PASTA JOTE', ku: 'PASTAYA TE', pl: 'TWÓJ MAKARON'},
  chooseCreationTitle: { de: 'Was möchtest du zusammenstellen?', en: 'What would you like to build?', tr: 'Ne oluşturmak istersin?', ro: 'Ce dorești să creezi?', nl: 'Wat wil je samenstellen?' , sq: 'Çfarë dëshiron të krijosh?', ku: 'Tu dixwazî çi çêkî?', pl: 'Co chcesz stworzyć?'},
  chooseCreationSub: { de: 'Wähle deine Basis — Schritt für Schritt zu deinem Wunschgericht.', en: 'Choose your base — step by step to your dream dish.', tr: 'Bazını seç — adım adım hayalindeki yemeğe ulaş.', ro: 'Alege baza — pas cu pas spre felul tău preferat.', nl: 'Kies je basis — stap voor stap naar jouw droomgerecht.' , sq: 'Zgjidh bazën tënde — hap pas hapi drejt gjellës që dëshiron.', ku: 'Bingeha xwe hilbijêre — gav bi gav ber bi xwarina xwestî.', pl: 'Wybierz swoją bazę — krok po kroku do wymarzonego dania.'},
  buildDoener: { de: 'Baue deinen Döner', en: 'Build your Döner', tr: 'Dönerini Oluştur', ro: 'Construiește-ți Kebap-ul', nl: 'Bouw je Döner' , sq: 'Krijo Dönerin tënd', ku: 'Dönerê xwe çêke', pl: 'Zbuduj swojego kebaba'},
  buildPizza: { de: 'Baue deine Pizza', en: 'Build your Pizza', tr: 'Pizzanı Oluştur', ro: 'Construiește-ți Pizza', nl: 'Bouw je Pizza' , sq: 'Krijo picën tënde', ku: 'Pizzaya xwe çêke', pl: 'Zbuduj swoją pizzę'},
  buildPasta: { de: 'Baue deine Pasta', en: 'Build your Pasta', tr: 'Makarnanı Oluştur', ro: 'Construiește-ți Pasta', nl: 'Bouw je Pasta' , sq: 'Krijo pastën tënde', ku: 'Pastaya xwe çêke', pl: 'Zbuduj swój makaron'},
  choosePizzaSize: { de: 'Wähle deine Größe', en: 'Choose your size', tr: 'Boyutunu seç', ro: 'Alege dimensiunea', nl: 'Kies je formaat' , sq: 'Zgjidh madhësinë tënde', ku: 'Mezinahiya xwe hilbijêre', pl: 'Wybierz rozmiar'},
  choosePizzaSizeSub: { de: 'Klein oder groß?', en: 'Small or large?', tr: 'Küçük mü büyük mü?', ro: 'Mică sau mare?', nl: 'Klein of groot?' , sq: 'E vogël apo e madhe?', ku: 'Biçûk an mezin?', pl: 'Mała czy duża?'},
  chooseToppingsSub: { de: 'So viele du möchtest — je 1,00 €.', en: 'As many as you like — €1.00 each.', tr: 'İstediğin kadar — her biri 1,00 €.', ro: 'Câte dorești — 1,00 € fiecare.', nl: 'Zoveel als je wilt — elk € 1,00.' , sq: 'Sa shumë të duash — nga 1,00 € secila.', ku: 'Çend ku tu bixwazî — her yek 1,00 €.', pl: 'Tyle, ile chcesz — po 1,00 € każdy.'},
  pizzaReadyTitle: { de: 'Deine Pizza ist fertig! 🎉', en: 'Your Pizza is ready! 🎉', tr: 'Pizzan hazır! 🎉', ro: 'Pizza ta este gata! 🎉', nl: 'Jouw Pizza is klaar! 🎉' , sq: 'Pica jote është gati! 🎉', ku: 'Pizzaya te amade ye! 🎉', pl: 'Twoja pizza jest gotowa! 🎉'},
  choosePastaStyle: { de: 'Wähle deinen Stil', en: 'Choose your style', tr: 'Stilini seç', ro: 'Alege stilul', nl: 'Kies je stijl' , sq: 'Zgjidh stilin tënd', ku: 'Şêweya xwe hilbijêre', pl: 'Wybierz swój styl'},
  yaprakWeekendOnly: { de: 'Yaprak Döner gibt es nur freitags, samstags und sonntags. An anderen Tagen leider nicht verfügbar.', en: 'Yaprak Döner is only available on Fridays, Saturdays and Sundays. Not available on other days.', tr: 'Yaprak Döner sadece Cuma, Cumartesi ve Pazar günleri mevcuttur. Diğer günler maalesef yok.', ro: 'Yaprak Döner este disponibil doar vineri, sâmbătă și duminică. În celelalte zile, din păcate, nu.', nl: 'Yaprak Döner is alleen op vrijdag, zaterdag en zondag verkrijgbaar. Andere dagen helaas niet.' , sq: 'Yaprak Döner ofrohet vetëm të premten, të shtunën dhe të dielën. Në ditët e tjera fatkeqësisht nuk ofrohet.', ku: 'Yaprak Döner tenê roja Îni, Şemî û Yekşemê heye. Di rojên din de mixabin nîne.', pl: 'Yaprak Döner dostępny jest tylko w piątki, soboty i niedziele. W inne dni niestety niedostępny.'},
  weekendItemOnly: { de: 'Dieses Gericht gibt es nur freitags, samstags und sonntags. An anderen Tagen leider nicht verfügbar.', en: 'This dish is only available on Fridays, Saturdays and Sundays. Not available on other days.', tr: 'Bu ürün sadece Cuma, Cumartesi ve Pazar günleri mevcuttur. Diğer günler maalesef yok.', ro: 'Acest fel este disponibil doar vineri, sâmbătă și duminică. În celelalte zile, din păcate, nu.', nl: 'Dit gerecht is alleen op vrijdag, zaterdag en zondag verkrijgbaar. Andere dagen helaas niet.' , sq: 'Kjo gjellë ofrohet vetëm të premten, të shtunën dhe të dielën. Në ditët e tjera fatkeqësisht nuk ofrohet.', ku: 'Ev xwarin tenê roja Îni, Şemî û Yekşemê heye. Di rojên din de mixabin nîne.', pl: 'To danie dostępne jest tylko w piątki, soboty i niedziele. W inne dni niestety niedostępne.'},
  weekendWarnTitle: { de: 'Nur am Wochenende', en: 'Weekends only', tr: 'Sadece hafta sonu', ro: 'Doar în weekend', nl: 'Alleen in het weekend' , sq: 'Vetëm në fundjavë', ku: 'Tenê Dawiya Hefteyê', pl: 'Tylko w weekend'},
  statusOpenNow: { de: 'Jetzt geöffnet', en: 'Open now', tr: 'Şu an açık', ro: 'Acum deschis', nl: 'Nu geopend' , sq: 'Hapur tani', ku: 'Niha vekirî ye', pl: 'Teraz otwarte'},
  statusClosedRestDay: { de: 'Geschlossen · Ruhetag', en: 'Closed · Rest day', tr: 'Kapalı · Tatil günü', ro: 'Închis · Zi liberă', nl: 'Gesloten · Rustdag' , sq: 'Mbyllur · Ditë pushimi', ku: 'Girtî · Roja Vala', pl: 'Zamknięte · Dzień wolny'},
  statusNotYetOpen: { de: 'Noch geschlossen', en: 'Not open yet', tr: 'Henüz açılmadı', ro: 'Încă închis', nl: 'Nog gesloten' , sq: 'Ende mbyllur', ku: 'Hîn girtî', pl: 'Jeszcze zamknięte'},
  statusClosed: { de: 'Geschlossen', en: 'Closed', tr: 'Kapalı', ro: 'Închis', nl: 'Gesloten' , sq: 'Mbyllur', ku: 'Girtî', pl: 'Zamknięte'},
  statusOpeningSoon: { de: 'Öffnet bald', en: 'Opening soon', tr: 'Yakında açılıyor', ro: 'Se deschide curând', nl: 'Opent binnenkort', sq: 'Hapet së shpejti', ku: 'Nêzîk vedibe', pl: 'Wkrótce otwarte' },
  statusClosingSoon: { de: 'Schließt bald', en: 'Closing soon', tr: 'Yakında kapanıyor', ro: 'Se închide curând', nl: 'Sluit binnenkort', sq: 'Mbyllet së shpejti', ku: 'Nêzîk digire', pl: 'Wkrótce zamknięte' },
  sizeLabel: { de: 'GRÖSSE', en: 'SIZE', tr: 'BOYUT', ro: 'MĂRIME', nl: 'FORMAAT' , sq: 'MADHËSIA', ku: 'MEZINAHÎ', pl: 'ROZMIAR'},
  pizzaComboBanner: { de: '🎉 Wochenende-Angebot: Wähle deine 28cm Pizza für {price} inkl. Getränk!', en: '🎉 Weekend deal: Choose your 28cm pizza for {price} incl. drink!', tr: '🎉 Hafta sonu fırsatı: 28cm pizzanı {price} karşılığında içecek dahil seç!', ro: '🎉 Ofertă de weekend: Alege pizza ta de 28cm pentru {price} incl. băutură!', nl: '🎉 Weekendaanbieding: Kies je 28cm pizza voor {price} incl. drankje!' , sq: '🎉 Oferta e fundjavës: Zgjidh picën tënde 28cm për {price} me pije të përfshirë!', ku: '🎉 Pêşniyara Dawiya Hefteyê: Pizzaya xwe ya 28cm ji bo {price} bi vexwarinê ve hilbijêre!', pl: '🎉 Oferta weekendowa: wybierz pizzę 28cm za {price} z napojem w cenie!'},
  leaveOffer: { de: 'Angebot verlassen', en: 'Leave offer', tr: 'Fırsattan çık', ro: 'Părăsește oferta', nl: 'Aanbieding verlaten' , sq: 'Largohu nga oferta', ku: 'Ji pêşniyarê derkeve', pl: 'Opuść ofertę'},
  itemAddedToast: { de: 'Zum Warenkorb hinzugefügt', en: 'Added to cart', tr: 'Sepete eklendi', ro: 'Adăugat în coș', nl: 'Toegevoegd aan winkelwagen' , sq: 'U shtua në shportë', ku: 'Li selikê hate zêdekirin', pl: 'Dodano do koszyka'},
  meatTypeLabel: { de: 'FLEISCHART (KOSTENLOS)', en: 'TYPE OF MEAT (FREE)', tr: 'ET TÜRÜ (ÜCRETSİZ)', ro: 'TIP DE CARNE (GRATUIT)', nl: 'SOORT VLEES (GRATIS)' , sq: 'LLOJI I MISHIT (FALAS)', ku: 'CUREYÊ GOŞT (BELAŞ)', pl: 'RODZAJ MIĘSA (BEZPŁATNIE)'},
  meatKalb: { de: 'Kalb/Rind', en: 'Veal/Beef', tr: 'Dana/Kalb', ro: 'Vițel/Vită', nl: 'Kalfs-/rundvlees' , sq: 'Viç/Lopë', ku: 'Golik/Ga', pl: 'Cielęcina/wołowina'},
  lunchComboTitle: { de: '🍽️ Mittagsangebot', en: '🍽️ Lunch special', tr: '🍽️ Öğle fırsatı', ro: '🍽️ Ofertă de prânz', nl: '🍽️ Lunchaanbieding' , sq: '🍽️ Oferta e drekës', ku: '🍽️ Pêşniyara Navrojê', pl: '🍽️ Oferta obiadowa'},
  lunchComboSub: { de: 'Wähle dein Getränk dazu — zusammen nur 9,50 €!', en: 'Choose your drink — together only €9.50!', tr: 'Yanına içeceğini seç — birlikte sadece 9,50 €!', ro: 'Alege băutura — împreună doar 9,50 €!', nl: 'Kies je drankje — samen maar € 9,50!' , sq: 'Zgjidh pijen tënde shtesë — së bashku vetëm 9,50 €!', ku: 'Vexwarina xwe hilbijêre — bi hev re tenê 9,50 €!', pl: 'Wybierz do tego napój — razem tylko 9,50 €!'},
  lunchComboConfirm: { de: 'Zur Bestellung hinzufügen', en: 'Add to order', tr: 'Siparişe ekle', ro: 'Adaugă la comandă', nl: 'Toevoegen aan bestelling' , sq: 'Shto te porosia', ku: 'Li sifarişê zêde bike', pl: 'Dodaj do zamówienia'},
  lunchSmallHint: { de: '💡 Tipp: Bei der großen Pizza bekommst du zwischen 11:30–14:00 Uhr ein Getränk gratis dazu!', en: '💡 Tip: With the large pizza you get a free drink between 11:30 AM–2:00 PM!', tr: '💡 İpucu: Büyük pizzayla 11:30–14:00 arası ücretsiz içecek kazanırsın!', ro: '💡 Sfat: La pizza mare primești o băutură gratuită între 11:30–14:00!', nl: '💡 Tip: Bij de grote pizza krijg je tussen 11:30–14:00 uur een gratis drankje!' , sq: '💡 Këshillë: Me picën e madhe merr një pije falas midis orës 11:30–14:00!', ku: '💡 Şîret: Bi pizzaya mezin di navbera saet 11:30–14:00 de vexwarineke belaş bi dest dixî!', pl: '💡 Wskazówka: przy dużej pizzy między 11:30–14:00 dostajesz napój gratis!'},
  pickupEstimate: { de: 'Fertig in ca. 15–20 Minuten', en: 'Ready in approx. 15–20 minutes', tr: 'Yaklaşık 15-20 dakikada hazır', ro: 'Gata în aprox. 15–20 minute', nl: 'Klaar in ca. 15–20 minuten' , sq: 'Gati për rreth 15–20 minuta', ku: 'Nêzîkî 15–20 deqîqeyan de amade ye', pl: 'Gotowe za ok. 15–20 minut'},
  allergenInfoBtn: { de: 'ⓘ Allergene & Zusatzstoffe', en: 'ⓘ Allergens & additives', tr: 'ⓘ Alerjen ve katkı maddeleri', ro: 'ⓘ Alergeni și aditivi', nl: 'ⓘ Allergenen & additieven' , sq: 'ⓘ Alergjenët & Aditivët', ku: 'ⓘ Alerjen & Zêdebûyî', pl: 'ⓘ Alergeny i substancje dodatkowe'},
  recommendedForYou: { de: 'PASST GUT DAZU', en: 'GOES WELL WITH THIS', tr: 'BUNA ÇOK YAKIŞIR', ro: 'SE POTRIVEȘTE BINE', nl: 'PAST HIER GOED BIJ' , sq: 'SHKON MIRË ME KËTË', ku: 'BI VÊ RE BAŞ TÊKILDAR E', pl: 'DOBRZE PASUJE DO TEGO'},
  groupSubmitBtn: { de: 'Meine Bestellung abschicken', en: 'Submit my order', tr: 'Siparişimi gönder', ro: 'Trimite comanda mea', nl: 'Mijn bestelling versturen' , sq: 'Dërgo porosinë time', ku: 'Sifarişa xwe bişîne', pl: 'Wyślij moje zamówienie'},
  freeDrinkProgress: { de: 'Noch {amount} bis zum 1L-Getränk gratis!', en: 'Only {amount} more for a free 1L drink!', tr: '1L içecek hediye için {amount} kaldı!', ro: 'Mai sunt {amount} pentru o băutură de 1L gratuită!', nl: 'Nog {amount} tot een gratis 1L drankje!' , sq: 'Edhe {amount} deri te pija falas 1L!', ku: 'Hîn {amount} heta vexwarina 1L ya belaş!', pl: 'Jeszcze {amount} do darmowego napoju 1L!'},
  freeDrinkUnlocked: { de: '🎉 1L-Getränk gratis freigeschaltet!', en: '🎉 Free 1L drink unlocked!', tr: '🎉 1L içecek hediye kazandın!', ro: '🎉 Băutură de 1L gratuită deblocată!', nl: '🎉 Gratis 1L drankje ontgrendeld!' , sq: '🎉 Pija falas 1L u aktivizua!', ku: '🎉 Vexwarina 1L ya belaş vebû!', pl: '🎉 Odblokowano darmowy napój 1L!'},
  noDrinkReminder: { de: 'Durst? Vergiss dein Getränk nicht!', en: 'Thirsty? Don\'t forget a drink!', tr: 'Susadın mı? İçeceğini unutma!', ro: 'Ți-e sete? Nu uita o băutură!', nl: 'Dorst? Vergeet je drankje niet!' , sq: 'Etje? Mos harro pijen tënde!', ku: 'Tî yî? Vexwarina xwe ji bîr neke!', pl: 'Pragniesz? Nie zapomnij o napoju!'},
  allergenLegendTitle: { de: 'Allergene & Zusatzstoffe', en: 'Allergens & additives', tr: 'Alerjen ve katkı maddeleri', ro: 'Alergeni și aditivi', nl: 'Allergenen & additieven' , sq: 'Alergjenët & Aditivët', ku: 'Alerjen & Zêdebûyî', pl: 'Alergeny i substancje dodatkowe'},
  allergenSectionTitle: { de: 'ALLERGENE', en: 'ALLERGENS', tr: 'ALERJENLER', ro: 'ALERGENI', nl: 'ALLERGENEN' , sq: 'ALERGJENËT', ku: 'ALERJEN', pl: 'ALERGENY'},
  zusatzSectionTitle: { de: 'ZUSATZSTOFFE', en: 'ADDITIVES', tr: 'KATKI MADDELERİ', ro: 'ADITIVI', nl: 'ADDITIEVEN' , sq: 'ADITIVËT', ku: 'ZÊDEBÛYÎ', pl: 'SUBSTANCJE DODATKOWE'},
  choosePastaTypeTitle: { de: 'Spaghetti oder Makkaroni?', en: 'Spaghetti or Macaroni?', tr: 'Spagetti mi Makarna mı?', ro: 'Spaghete sau macaroane?', nl: 'Spaghetti of macaroni?' , sq: 'Spageti apo Makarona?', ku: 'Spageta an Makarona?', pl: 'Spaghetti czy makaron rurki?'},
  weiterShort: { de: 'Weiter', en: 'Next', tr: 'İleri', ro: 'Continuă', nl: 'Verder' , sq: 'Vazhdo', ku: 'Bidomîne', pl: 'Dalej'},
  choosePastaStyleSub: { de: 'Jede Pasta wird mit Kurkuma-Penne & Marktsalat serviert.', en: 'Every pasta is served with turmeric penne & market salad.', tr: 'Her makarna zerdeçallı penne ve mevsim salatasıyla servis edilir.', ro: 'Fiecare pastă este servită cu penne cu turmeric și salată de sezon.', nl: 'Elke pasta wordt geserveerd met kurkumapenne & marktsalade.' , sq: 'Çdo pastë shërbehet me penne kurkumë & sallatë tregu.', ku: 'Her pasta bi Kurkuma-Penne & salata bazarê tê pêşkêşkirin.', pl: 'Każdy makaron podawany jest z penne kurkumowym i sałatką z targu.'},
  pastaReadyTitle: { de: 'Deine Pasta ist fertig! 🎉', en: 'Your Pasta is ready! 🎉', tr: 'Makarnan hazır! 🎉', ro: 'Pasta ta este gata! 🎉', nl: 'Jouw Pasta is klaar! 🎉' , sq: 'Pasta jote është gati! 🎉', ku: 'Pastaya te amade ye! 🎉', pl: 'Twój makaron jest gotowy! 🎉'},
  sizeSmall: { de: 'klein', en: 'small', tr: 'küçük', ro: 'mic', nl: 'klein' , sq: 'e vogël', ku: 'biçûk', pl: 'mała'},
  sizeLarge: { de: 'groß', en: 'large', tr: 'büyük', ro: 'mare', nl: 'groot' , sq: 'e madhe', ku: 'mezin', pl: 'duża'},
  extrasPricePrefix: { de: 'Extras (je', en: 'Extras (each', tr: 'Ekstralar (her biri', ro: 'Extra (fiecare', nl: 'Extra’s (elk' , sq: 'Ekstra (nga', ku: 'Zêde (her', pl: 'Dodatki (po'},
  cartTitle: { de: 'Deine Bestellung', en: 'Your order', tr: 'Siparişin', ro: 'Comanda ta', nl: 'Jouw bestelling' , sq: 'Porosia jote', ku: 'Sifarişa Te', pl: 'Twoje zamówienie'},
  drinksTitle: { de: 'Etwas zu trinken?', en: 'Something to drink?', tr: 'İçecek ister misin?', ro: 'Ceva de băut?', nl: 'Iets te drinken?' , sq: 'Diçka për të pirë?', ku: 'Tiştek ji bo vexwarinê?', pl: 'Coś do picia?'},
  itemsWord: { de: 'Artikel', en: 'items', tr: 'ürün', ro: 'articole', nl: 'items' , sq: 'artikuj', ku: 'tişt', pl: 'Pozycje'},
  orderSentTitle: { de: '✓ Bestellung gesendet!', en: '✓ Order sent!', tr: '✓ Sipariş gönderildi!', ro: '✓ Comandă trimisă!', nl: '✓ Bestelling verstuurd!' , sq: '✓ Porosia u dërgua!', ku: '✓ Sifariş hate şandin!', pl: '✓ Zamówienie wysłane!'},
  orderSentSub: { de: 'Vielen Dank! Wir bereiten deine Bestellung vor.', en: "Thank you! We're preparing your order.", tr: 'Teşekkürler! Siparişini hazırlıyoruz.', ro: 'Mulțumim! Îți pregătim comanda.', nl: 'Bedankt! We bereiden je bestelling voor.' , sq: 'Faleminderit shumë! Po përgatisim porosinë tënde.', ku: 'Gelek spas! Em sifarişa te amade dikin.', pl: 'Dziękujemy! Przygotowujemy Twoje zamówienie.'},
  backToHomeBtn: { de: 'Zurück zur Startseite', en: 'Back to homepage', tr: 'Ana sayfaya dön', ro: 'Înapoi la pagina principală', nl: 'Terug naar startpagina' , sq: 'Kthehu te faqja kryesore', ku: 'Vegere Rûpela Sereke', pl: 'Wróć do strony głównej'},
  newOrderBtn: { de: 'Neue Bestellung starten', en: 'Start a new order', tr: 'Yeni sipariş oluştur', ro: 'Începe o comandă nouă', nl: 'Nieuwe bestelling starten' , sq: 'Fillo porosi të re', ku: 'Sifarişeke nû dest pê bike', pl: 'Rozpocznij nowe zamówienie'},
  installAppBtn: { de: '📲 App installieren', en: '📲 Install app', tr: '📲 Uygulamayı yükle', ro: '📲 Instalează aplicația', nl: '📲 App installeren' , sq: '📲 Instalo aplikacionin', ku: '📲 Sepan saz bike', pl: '📲 Zainstaluj aplikację'},
  installHelpTitle: { de: 'Zum Startbildschirm hinzufügen', en: 'Add to Home Screen', tr: 'Ana Ekrana Ekle', ro: 'Adaugă pe ecranul principal', nl: 'Toevoegen aan beginscherm' , sq: 'Shto te ekrani kryesor', ku: 'Li Ekrana Destpêkê Zêde bike', pl: 'Dodaj do ekranu głównego'},
  installHelpIOS: { de: 'Tippe unten auf Teilen 􀈂 und dann auf „Zum Home-Bildschirm".', en: 'Tap the Share button below, then "Add to Home Screen".', tr: 'Aşağıdaki Paylaş simgesine, ardından "Ana Ekrana Ekle"ye dokun.', ro: 'Atinge butonul Distribuie de mai jos, apoi „Adaugă pe ecranul principal".', nl: 'Tik op Delen hieronder en dan op "Zet op beginscherm".' , sq: 'Prek butonin Ndaj poshtë, pastaj \\"Shto në ekranin kryesor\\".', ku: 'Li jêr bişkoja Parve bike bitikîne, paşê \\"Li Ekrana Destpêkê Zêde bike\\".', pl: 'Stuknij na dole w Udostępnij 􀈂, a następnie w „Do ekranu początkowego”.'},
  installHelpAndroid: { de: 'Tippe oben rechts auf das Menü ⋮ und dann auf „App installieren" oder „Zum Startbildschirm hinzufügen".', en: 'Tap the ⋮ menu top right, then "Install app" or "Add to Home Screen".', tr: 'Sağ üstteki ⋮ menüsüne dokun, sonra "Uygulamayı yükle" veya "Ana Ekrana Ekle" seç.', ro: 'Atinge meniul ⋮ din dreapta sus, apoi „Instalează aplicația".', nl: 'Tik op het ⋮-menu rechtsboven, dan op "App installeren".' , sq: 'Prek menynë ⋮ lart djathtas, pastaj \\"Instalo aplikacionin\\" ose \\"Shto te ekrani kryesor\\".', ku: 'Li jor rastê menûya ⋮ bitikîne, paşê \\"Sepan saz bike\\" an \\"Li Ekrana Destpêkê Zêde bike\\".', pl: 'Stuknij w prawym górnym rogu w menu ⋮, a następnie w „Zainstaluj aplikację” lub „Dodaj do ekranu głównego”.'},
  installHelpClose: { de: 'Verstanden', en: 'Got it', tr: 'Anladım', ro: 'Am înțeles', nl: 'Begrepen' , sq: 'E kuptova', ku: 'Fêm kir', pl: 'Rozumiem'},
  downloadReceiptBtn: { de: 'Beleg als Bild speichern', en: 'Save receipt as image', tr: 'Fişi görsel olarak kaydet', ro: 'Salvează bonul ca imagine', nl: 'Bon opslaan als afbeelding', sq: 'Ruaj faturën si imazh' , ku: 'Fîşê wek wêne tomar bike', pl: 'Zapisz paragon jako obraz'},
  showReceiptBtn: { de: 'Beleg anzeigen', en: 'Show receipt', tr: 'Fişi göster', ro: 'Arată bonul', nl: 'Bon tonen', sq: 'Shfaq faturën' , ku: 'Fîşê nîşan bide', pl: 'Pokaż paragon'},
};

const CATEGORY_IMAGES = {
  kebap: [LAHMACUN_IMG, DOENER_SPIESS_IMG, DOENER_TELLER_IMG],
  pizza: [PIZZA_KAESE_IMG, PIZZA_KAESE_IMG],
  pizzabrot: [PIZZABROETCHEN_IMG],
  calzone: [CALZONE_IMG],
  nudeln: [PENNE_IMG, SPAGHETTI_IMG],
  salat: [SALAT_BUNT_IMG, BAUERNSALAT_IMG],
  finger: [CHICKEN_STRIPS_IMG, NUGGETS_IMG, POMMES_IMG],
  getraenke: [FRITZ_KOLA_IMG, FRITZ_LIMO_IMG, FRITZ_SPRITZ_TRAUBE_IMG, FRITZ_MISCHMASCH_IMG, FRITZ_KOLA_SUPERZERO_IMG],
};
const CATEGORY_LABELS = {
  kebap: { de: 'Kebap', en: 'Kebap', tr: 'Kebap', ro: 'Kebap', nl: 'Kebap' },
  pizza: { de: 'Pizza', en: 'Pizza', tr: 'Pizza', ro: 'Pizza', nl: 'Pizza' },
  familienpizza: { de: 'Familienpizza', en: 'Family Pizza', tr: 'Aile Boyu Pizza', ro: 'Pizza de familie', nl: 'Familiepizza' },
  pizzabrot: { de: 'Pizzabrot & Brötchen', en: 'Pizza Bread & Rolls', tr: 'Pizza Ekmeği & Topları', ro: 'Pâine & Chifle Pizza', nl: 'Pizzabrood & Broodjes' },
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

const LANG_COLORS = { de: '#e6b800', en: '#e65a0a', tr: '#d62828', ro: '#2d6a4f', nl: '#e65a0a', sq: '#153826', ku: '#ffc738', pl: '#d62828' };
const CHOOSE_LANG_TITLE = { de: '🌐 Sprache wählen', en: '🌐 Choose language', tr: '🌐 Dil seç', ro: '🌐 Alege limba', nl: '🌐 Kies taal', sq: '🌐 Zgjidh gjuhën', ku: '🌐 Ziman hilbijêre', pl: '🌐 Wybierz język' };

function LanguageSwitcher({ lang, setLang, dark }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 px-3.5 py-2.5 rounded-full text-sm font-bold" style={dark ? { background: 'rgba(255,246,234,.1)', color: '#fff' } : { background: '#f0e5cf', color: GREEN }}>
        <span className="text-base">{LANG_FLAGS[lang]}</span><span className="hidden sm:inline">{LANG_NAMES[lang]}</span>
      </button>
      {open && ReactDOM.createPortal(
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,.75)', animation: 'modalBgFade .25s ease' }} onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-xs rounded-3xl p-5"
            style={{ background: GREEN, border: '1px solid rgba(255,199,56,.25)', boxShadow: '0 30px 70px rgba(21,56,38,.5)', animation: 'modalCardUp .3s cubic-bezier(.25,.46,.45,.94)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center font-black text-base mb-4" style={{ color: GOLD }}>{CHOOSE_LANG_TITLE[lang] || CHOOSE_LANG_TITLE.de}</div>
            <div className="flex flex-col gap-2.5">
              {LANGS.map((l) => {
                const color = LANG_COLORS[l] || ORANGE;
                const active = l === lang;
                return (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setOpen(false); }}
                    className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-base"
                    style={{
                      background: active ? color : 'rgba(255,246,234,.08)',
                      color: active ? '#fff' : 'rgba(255,246,234,.85)',
                      boxShadow: active ? `0 0 22px ${color}66` : 'none',
                      border: active ? 'none' : '1px solid rgba(255,246,234,.14)',
                    }}
                  >
                    <span className="text-2xl">{LANG_FLAGS[l]}</span>
                    <span className="flex-1 text-left">{LANG_NAMES[l]}</span>
                    <ArrowRight size={17} color={active ? '#fff' : 'rgba(255,246,234,.4)'} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

/* ============ MENU TRANSLATIONS (word/phrase-level) ============ */
const MENU_PHRASES = {
  'Hähnchenbrust mit Paprika & Pilzen in Sojasoße': { en: 'Chicken breast with bell pepper & mushrooms in soy sauce', tr: 'Biberli ve mantarlı soya soslu tavuk göğsü', ro: 'Piept de pui cu ardei și ciuperci în sos de soia', nl: 'Kipfilet met paprika & champignons in sojasaus' , sq: 'Gjoks pule me spec dhe kërpudha në salcë soje', ku: 'Sînga mirîşkê bi biber û karkoçkan di soza sojayê de', pl: 'Pierś z kurczaka z papryką i pieczarkami w sosie sojowym'},
  'Hähnchenbrust in Sahnesoße mit Berg-Thymian': { en: 'Chicken breast in cream sauce with mountain thyme', tr: 'Dağ kekikli kremalı soslu tavuk göğsü', ro: 'Piept de pui în sos de smântână cu cimbru de munte', nl: 'Kipfilet in roomsaus met bergtijm' , sq: 'Gjoks pule në salcë kremi me trumzë mali', ku: 'Sînga mirîşkê di soza krêmê de bi kekîka çiyayî', pl: 'Pierś z kurczaka w sosie śmietanowym z tymiankiem górskim'},
  'Hähnchenbrust mit Pilzen in Curry-Sahnesoße': { en: 'Chicken breast with mushrooms in curry cream sauce', tr: 'Mantarlı köri kremalı soslu tavuk göğsü', ro: 'Piept de pui cu ciuperci în sos de curry cu smântână', nl: 'Kipfilet met champignons in curry-roomsaus' , sq: 'Gjoks pule me kërpudha në salcë kremi kerri', ku: 'Sînga mirîşkê bi karkoçkan di soza krêmê ya kariyê de', pl: 'Pierś z kurczaka z pieczarkami w sosie curry-śmietanowym'},
  'Hähnchenbrust in Paprika-Auberginen-Soße': { en: 'Chicken breast in bell pepper-eggplant sauce', tr: 'Biberli-patlıcanlı soslu tavuk göğsü', ro: 'Piept de pui în sos de ardei și vinete', nl: 'Kipfilet in paprika-auberginesaus' , sq: 'Gjoks pule në salcë specash dhe patëllxhani', ku: 'Sînga mirîşkê di soza biber-bacanreş de', pl: 'Pierś z kurczaka w sosie paprykowo-bakłażanowym'},
  'Hähnchenbrust mit Pilzen in Sahnesoße': { en: 'Chicken breast with mushrooms in cream sauce', tr: 'Mantarlı kremalı soslu tavuk göğsü', ro: 'Piept de pui cu ciuperci în sos de smântână', nl: 'Kipfilet met champignons in roomsaus' , sq: 'Gjoks pule me kërpudha në salcë kremi', ku: 'Sînga mirîşkê bi karkoçkan di soza krêmê de', pl: 'Pierś z kurczaka z pieczarkami w sosie śmietanowym'},
  'Extra Portion Fleisch vom Drehspieß': { en: 'Extra portion of rotisserie meat', tr: 'Ekstra porsiyon döner et', ro: 'Porție extra de carne la frigărui rotative', nl: 'Extra portie vlees van het draaispit' , sq: 'Racion shtesë mish nga rrotisi', ku: 'Porsiyoneke zêde ya goştê şîşê zivirî', pl: 'Dodatkowa porcja mięsa z rożna'},
  'mit türkischer Knoblauchwurst': { en: 'with Turkish garlic sausage', tr: 'Türk sarımsaklı sucuklu', ro: 'cu cârnat turcesc cu usturoi', nl: 'met Turkse knoflookworst' , sq: 'me sallam hudhre turk', ku: 'bi sucûqa sîrê ya tirkî', pl: 'z turecką kiełbasą czosnkową'},
  'mit kleinem Beilagensalat': { en: 'with a small side salad', tr: 'küçük yan salata ile', ro: 'cu o salată mică', nl: 'met een kleine bijgerechtsalade' , sq: 'me sallatë të vogël shoqëruese', ku: 'bi salateke piçûk a alîkar', pl: 'z małą sałatką jako dodatek'},
  'Pilzen in Curry-Sahnesoße': { en: 'Mushrooms in curry cream sauce', tr: 'Köri kremalı soslu mantar', ro: 'Ciuperci în sos de curry cu smântână', nl: 'Champignons in curry-roomsaus' , sq: 'Kërpudha në salcë kremi kerri', ku: 'Karkoçk di soza krêmê ya kariyê de', pl: 'pieczarkami w sosie curry-śmietanowym'},
  'Fleisch vom Drehspieß': { en: 'Rotisserie meat', tr: 'Döner et', ro: 'Carne la frigărui rotative', nl: 'Vlees van het draaispit' , sq: 'Mish nga rrotisi', ku: 'Goştê şîşê zivirî', pl: 'mięso z rożna'},
  'Weichkäse in Salzlake': { en: 'Soft cheese in brine', tr: 'Salamura yumuşak peynir', ro: 'Brânză moale în saramură', nl: 'Zachte kaas in pekel' , sq: 'Djathë i butë në shëllirë', ku: 'Penîrê nerm di avê şor de', pl: 'ser miękki w solance'},
  'Apfel-Kirsch-Holunder': { en: 'Apple-cherry-elderberry', tr: 'Elma-kiraz-mürver', ro: 'Măr-cireșe-soc', nl: 'Appel-kers-vlier' , sq: 'Mollë-Qershi-Shtog', ku: 'Sêv-Gêlaz-Bêbûk', pl: 'Jabłko-wiśnia-bez czarny'},
  'Gratis Dip inklusive': { en: 'Free dip included', tr: 'Ücretsiz sos dahil', ro: 'Sos gratuit inclus', nl: 'Gratis dipsaus inbegrepen' , sq: 'Salcë falas e përfshirë', ku: 'Soza belaş tê de', pl: 'Darmowy sos w cenie'},
  'mit Käse überbacken': { en: 'baked with cheese', tr: 'peynirli fırınlanmış', ro: 'gratinat cu brânză', nl: 'gegratineerd met kaas' , sq: 'i pjekur me djathë', ku: 'bi penîr hatiye pijandin', pl: 'zapiekane z serem'},
  'Käse überbacken': { en: 'Baked with cheese', tr: 'Peynirli fırınlanmış', ro: 'Gratinat cu brânză', nl: 'Gegratineerd met kaas' , sq: 'Djathë i pjekur', ku: 'Penîrê pijandî', pl: 'zapiekane z serem'},
  'Gebratenes Hähnchen': { en: 'Fried chicken', tr: 'Kızarmış tavuk', ro: 'Pui prăjit', nl: 'Gebakken kip' , sq: 'Pulë e skuqur', ku: 'Mirîşka biraştî', pl: 'Smażony kurczak'},
  'Pilzen in Sahnesoße': { en: 'Mushrooms in cream sauce', tr: 'Kremalı soslu mantar', ro: 'Ciuperci în sos de smântână', nl: 'Champignons in roomsaus' , sq: 'Kërpudha në salcë kremi', ku: 'Karkoçk di soza krêmê de', pl: 'pieczarkami w sosie śmietanowym'},
  'Zigeuner Schnitzel': { en: 'Paprika Schnitzel', tr: 'Biberli Şnitzel', ro: 'Șnițel cu Sos de Ardei', nl: 'Paprika Schnitzel' , sq: 'Shnicel Zigeuner', ku: 'Şnîtzela Çîngeneyan', pl: 'Sznycel cygański'},
  'Bio-Traubenschorle': { en: 'Organic grape spritzer', tr: 'Organik üzüm sodası', ro: 'Suc de struguri bio cu apă minerală', nl: 'Bio-druivenspuitwater' , sq: 'Lëng rrushi bio', ku: 'Ava tirî ya bio', pl: 'Bio sok z winogron z wodą'},
  'Pilzen in Sojasoße': { en: 'Mushrooms in soy sauce', tr: 'Soya soslu mantar', ro: 'Ciuperci în sos de soia', nl: 'Champignons in sojasaus' , sq: 'Kërpudha në salcë soje', ku: 'Karkoçk di soza sojayê de', pl: 'pieczarkami w sosie sojowym'},
  'Fritiertes Gemüse': { en: 'Fried vegetables', tr: 'Kızarmış sebze', ro: 'Legume prăjite', nl: 'Gefrituurde groenten' , sq: 'Perime të fërguara', ku: 'Sebzeyên sorkirî', pl: 'Warzywa smażone w głębokim tłuszczu'},
  'fritiertes Gemüse': { en: 'fried vegetables', tr: 'kızarmış sebze', ro: 'legume prăjite', nl: 'gefrituurde groenten' , sq: 'perime të fërguara', ku: 'sebzeyên sorkirî', pl: 'warzywa smażone w głębokim tłuszczu'},
  'Hollandaise Sauce': { en: 'Hollandaise sauce', tr: 'Hollandaise sos', ro: 'Sos hollandaise', nl: 'Hollandaisesaus' , sq: 'Salcë Hollandaise', ku: 'Soza Hollandaise', pl: 'Sos holenderski'},
  'Hollandaise Soße': { en: 'Hollandaise sauce', tr: 'Hollandaise sos', ro: 'Sos hollandaise', nl: 'Hollandaisesaus' , sq: 'Salcë Hollandaise', ku: 'Soza Hollandaise', pl: 'Sos holenderski'},
  'Jäger Schnitzel': { en: 'Hunter\'s Schnitzel', tr: 'Avcı Usulü Şnitzel', ro: 'Șnițel Vânătoresc', nl: 'Jagers Schnitzel' , sq: 'Shnicel Gjahtari', ku: 'Şnîtzela Nêçîrvan', pl: 'Sznycel myśliwski'},
  'Türkische Pizza': { en: 'Turkish Pizza', tr: 'Türk Pizzası', ro: 'Pizza Turcească', nl: 'Turkse Pizza' , sq: 'Picë turke', ku: 'Pizzaya Tirkî', pl: 'Pizza turecka'},
  'Frische Tomaten': { en: 'Fresh tomatoes', tr: 'Taze domates', ro: 'Roșii proaspete', nl: 'Verse tomaten' , sq: 'Domate të freskëta', ku: 'Firangoşên taze', pl: 'Świeże pomidory'},
  'still/spritzig': { en: 'still/sparkling', tr: 'sade/gazlı', ro: 'plată/acidulată', nl: 'plat/bruisend' , sq: 'pa gaz/me gaz', ku: 'bêgaz/bigaz', pl: 'niegazowana/gazowana'},
  'Knoblauchsauce': { en: 'Garlic sauce', tr: 'Sarımsak sos', ro: 'Sos de usturoi', nl: 'Knoflooksaus' , sq: 'Salcë hudhre', ku: 'Soza sîr', pl: 'Sos czosnkowy'},
  'Chicken Strips': { en: 'Chicken strips', tr: 'Tavuk parçaları', ro: 'Fâșii de pui', nl: 'Kipfilet strips' , sq: 'Copa pule', ku: 'Perçeyên mirîşkê', pl: 'Paski z kurczaka'},
  'Pommes Frites': { en: 'French Fries', tr: 'Patates Kızartması', ro: 'Cartofi Prăjiți', nl: 'Friet' , sq: 'Patate të skuqura', ku: 'Kartol sorkirî', pl: 'Frytki'},
  'Hähnchenbrust': { en: 'Chicken breast', tr: 'Tavuk göğsü', ro: 'Piept de pui', nl: 'Kipfilet' , sq: 'Gjoks pule', ku: 'Sînga mirîşkê', pl: 'Pierś z kurczaka'},
  'Bio-Rhabarber': { en: 'Organic rhubarb', tr: 'Organik ravent', ro: 'Rubarbă bio', nl: 'Bio-rabarber' , sq: 'Rrabarbër bio', ku: 'Rêwendê bio', pl: 'Bio rabarbar'},
  'Kurkuma-Penne': { en: 'Turmeric penne', tr: 'Zerdeçallı penne', ro: 'Penne cu turmeric', nl: 'Kurkumapenne' , sq: 'Penne me kurkumë', ku: 'Penne bi kurkumê', pl: 'Penne kurkumowe'},
  'Steak Fleisch': { en: 'Steak meat', tr: 'Biftek et', ro: 'Carne de vită (steak)', nl: 'Steakvlees' , sq: 'Mish biftek', ku: 'Goştê stêkê', pl: 'Mięso stekowe'},
  'Knoblauchsoße': { en: 'Garlic sauce', tr: 'Sarımsak sos', ro: 'Sos de usturoi', nl: 'Knoflooksaus' , sq: 'Salcë hudhre', ku: 'Soza sîr', pl: 'Sos czosnkowy'},
  'Cocktailsauce': { en: 'Cocktail sauce', tr: 'Kokteyl sos', ro: 'Sos cocktail', nl: 'Cocktailsaus' , sq: 'Salcë kokteil', ku: 'Soza koktêlê', pl: 'Sos koktajlowy'},
  'Beilagensalat': { en: 'Side salad', tr: 'Yan salata', ro: 'Salată garnitură', nl: 'Bijgerechtsalade' , sq: 'Sallatë shoqëruese', ku: 'Salata alîkar', pl: 'Sałatka jako dodatek'},
  'Meeresfrüchte': { en: 'Seafood', tr: 'Deniz ürünleri', ro: 'Fructe de mare', nl: 'Zeevruchten' , sq: 'Fruta deti', ku: 'Fêkiyên deryayê', pl: 'Owoce morza'},
  'Pizzabrötchen': { en: 'Pizza rolls', tr: 'Pizza topları', ro: 'Chifle pizza', nl: 'Pizzabroodjes' , sq: 'Simite pice', ku: 'Nanikên pizzayê', pl: 'Bułeczki pizzowe'},
  'Kräuterbutter': { en: 'Herb butter', tr: 'Otlu tereyağı', ro: 'Unt cu ierburi', nl: 'Kruidenboter' , sq: 'Gjalpë me erëza', ku: 'Rûnê bi giyayan', pl: 'Masło ziołowe'},
  'Putenschinken': { en: 'Turkey ham', tr: 'Hindi jambonu', ro: 'Șuncă de curcan', nl: 'Kalkoenham' , sq: 'Proshutë gjeli', ku: 'Jambona hindûrî', pl: 'Szynka z indyka'},
  'Berg-Thymian': { en: 'Mountain thyme', tr: 'Dağ kekiği', ro: 'Cimbru de munte', nl: 'Bergtijm' , sq: 'Trumzë mali', ku: 'Kekîka çiyayî', pl: 'Tymianek górski'},
  'Grüner Salat': { en: 'Green salad', tr: 'Yeşil salata', ro: 'Salată verde', nl: 'Groene salade' , sq: 'Sallatë jeshile', ku: 'Salata kesk', pl: 'Zielona sałata'},
  'grüner Salat': { en: 'green salad', tr: 'yeşil salata', ro: 'salată verde', nl: 'groene salade' , sq: 'sallatë jeshile', ku: 'salata kesk', pl: 'zielona sałata'},
  'Vegetarische': { en: 'Vegetarian', tr: 'Vejetaryen', ro: 'Vegetariană', nl: 'Vegetarische' , sq: 'Vegjetariane', ku: 'Vejeteryan', pl: 'Wegetariańska'},
  'Rindersalami': { en: 'Beef salami', tr: 'Dana salam', ro: 'Salam de vită', nl: 'Runderworst' , sq: 'Sallam viçi', ku: 'Salamiya ga', pl: 'Salami wołowe'},
  'Zigeunersoße': { en: 'Spicy paprika sauce', tr: 'Acılı biber sosu', ro: 'Sos picant cu ardei', nl: 'Pikante paprikasaus' , sq: 'Salcë Zigeuner', ku: 'Soza Çîngeneyan', pl: 'Sos cygański'},
  'Energy Drink': { en: 'Energy drink', tr: 'Enerji içeceği', ro: 'Băutură energizantă', nl: 'Energiedrank' , sq: 'Pije energjike', ku: 'Vexwarina enerjiyê', pl: 'Napój energetyczny'},
  'Vegetarisch': { en: 'Vegetarian', tr: 'Vejetaryen', ro: 'Vegetarian', nl: 'Vegetarisch' , sq: 'Vegjetarian', ku: 'Vejeteryan', pl: 'Wegetariańskie'},
  'Tomatensoße': { en: 'Tomato sauce', tr: 'Domates sos', ro: 'Sos de roșii', nl: 'Tomatensaus' , sq: 'Salcë domatesh', ku: 'Soza firangoşan', pl: 'Sos pomidorowy'},
  'Fleischsoße': { en: 'Meat sauce', tr: 'Kıymalı sos', ro: 'Sos de carne', nl: 'Vleessaus' , sq: 'Salcë mishi', ku: 'Soza goşt', pl: 'Sos mięsny'},
  'Bolognese-Soße': { en: 'Bolognese sauce', tr: 'Bolonez sos', ro: 'Sos Bolognese', nl: 'Bolognesesaus' , sq: 'Salcë Bolonjeze', ku: 'Soza Bolognese', pl: 'Sos bolognese'},
  'Baue deine eigene Pizza 🎨': { en: 'Build your own Pizza 🎨', tr: 'Kendi Pizzanı Oluştur 🎨', ro: 'Construiește-ți propria Pizza 🎨', nl: 'Bouw je eigen Pizza 🎨' , sq: 'Krijo picën tënde 🎨', ku: 'Pizzaya xwe çêke 🎨', pl: 'Zbuduj własną pizzę 🎨'},
  'Baue deine eigene Pasta 🎨': { en: 'Build your own Pasta 🎨', tr: 'Kendi Makarnanı Oluştur 🎨', ro: 'Construiește-ți propria Pasta 🎨', nl: 'Bouw je eigen Pasta 🎨' , sq: 'Krijo pastën tënde 🎨', ku: 'Pastaya xwe çêke 🎨', pl: 'Zbuduj własny makaron 🎨'},
  'Tomatensoße inklusive — wähle deine Beläge': { en: 'Tomato sauce included — choose your toppings', tr: 'Domates sosu dahil — malzemelerini seç', ro: 'Sos de roșii inclus — alege ingredientele', nl: 'Tomatensaus inbegrepen — kies je toppings' , sq: 'Salcë domatesh e përfshirë — zgjidh mbushjet e tua', ku: 'Soza firangoşan tê de — tiştên li ser hilbijêre', pl: 'Sos pomidorowy w cenie — wybierz swoje dodatki'},
  'Soße & Extras frei wählbar': { en: 'Sauce & extras of your choice', tr: 'Sos ve ekstralar serbest seçim', ro: 'Sos și extra la alegere', nl: 'Saus & extra’s vrij te kiezen' , sq: 'Salcë & shtesa sipas dëshirës', ku: 'Soz & Zêde li gorî daxwazê', pl: 'Sos i dodatki do wyboru'},
  'Spaghetti': { en: 'Spaghetti', tr: 'Spagetti', ro: 'Spaghete', nl: 'Spaghetti' , sq: 'Spageti', ku: 'Spageta', pl: 'Spaghetti'},
  'Makkaroni': { en: 'Macaroni', tr: 'Makarna', ro: 'Macaroane', nl: 'Macaroni' , sq: 'Makarona', ku: 'Makarona', pl: 'Makaron rurki'},
  'Soße nach Wahl inklusive — wähle deine Extras': { en: 'Choice of sauce included — choose your extras', tr: 'İstediğin sos dahil — ekstralarını seç', ro: 'Sos la alegere inclus — alege extra-urile', nl: 'Saus naar keuze inbegrepen — kies je extra’s' , sq: 'Salcë sipas zgjedhjes e përfshirë — zgjidh shtesat', ku: 'Soza li gorî hilbijartinê tê de — zêdeyên xwe hilbijêre', pl: 'Sos do wyboru w cenie — wybierz swoje dodatki'},
  'Deutschland': { en: 'Germany', tr: 'Almanya', ro: 'Germania', nl: 'Duitsland' , sq: 'Gjermani', ku: 'Almanya', pl: 'Niemcy'},
  'Wiener Art': { en: 'Vienna Style', tr: 'Viyana Usulü', ro: 'Stil Vienez', nl: 'Weense Stijl' , sq: 'Stili Vjenez', ku: 'Şêwaza Viyana', pl: 'Po wiedeńsku'},
  'Marktsalat': { en: 'Market salad', tr: 'Pazar salatası', ro: 'Salată de sezon', nl: 'Marktsalade' , sq: 'Sallatë tregu', ku: 'Salata bazarê', pl: 'Sałatka targowa'},
  'Rahmpulver': { en: 'Cream powder', tr: 'Krema tozu', ro: 'Praf de smântână', nl: 'Roompoeder' , sq: 'Pluhur kremi', ku: 'Toza krêmê', pl: 'Proszek śmietankowy'},
  'Mozzarella': { en: 'Mozzarella', tr: 'Mozzarella', ro: 'Mozzarella', nl: 'Mozzarella' , sq: 'Mocarela', ku: 'Mozarella', pl: 'Mozzarella'},
  'Gorgonzola': { en: 'Gorgonzola', tr: 'Gorgonzola', ro: 'Gorgonzola', nl: 'Gorgonzola' , sq: 'Gorgonzola', ku: 'Gorgonzola', pl: 'Gorgonzola'},
  'Mayonnaise': { en: 'Mayonnaise', tr: 'Mayonez', ro: 'Maioneză', nl: 'Mayonaise' , sq: 'Majonezë', ku: 'Mayonez', pl: 'Majonez'},
  'überbacken': { en: 'baked & gratinated', tr: 'fırında gratine', ro: 'gratinat', nl: 'gegratineerd' , sq: 'i pjekur në furrë', ku: 'pijandî', pl: 'zapiekane'},
  'Vier Käse': { en: 'Four Cheese', tr: 'Dört Peynirli', ro: 'Patru Brânzeturi', nl: 'Vier Kazen' , sq: 'Katër djathëra', ku: 'Çar Penîr', pl: 'Cztery sery'},
  'Weichkäse': { en: 'Soft cheese', tr: 'Yumuşak peynir', ro: 'Brânză moale', nl: 'Zachte kaas' , sq: 'Djathë i butë', ku: 'Penîrê nerm', pl: 'Ser miękki'},
  'Vegetaria': { en: 'Vegetarian', tr: 'Vejetaryen', ro: 'Vegetariană', nl: 'Vegetarisch' , sq: 'Vegjetariane', ku: 'Vejeteryan', pl: 'Wegetariańska'},
  'Jägersoße': { en: 'Hunter\'s sauce', tr: 'Avcı sosu', ro: 'Sos vânătoresc', nl: 'Jagersaus' , sq: 'Salcë Gjahtari', ku: 'Soza Nêçîrvan', pl: 'Sos myśliwski'},
  'Lavasbrot': { en: 'Lavash bread', tr: 'Lavaş ekmeği', ro: 'Pâine lavash', nl: 'Lavashbrood' , sq: 'Bukë lavash', ku: 'Nanê lavaş', pl: 'Chleb lavash'},
  'Pizzabrot': { en: 'Pizza bread', tr: 'Pizza ekmeği', ro: 'Pâine pizza', nl: 'Pizzabrood' , sq: 'Bukë pice', ku: 'Nanê pizzayê', pl: 'Chleb pizzowy'},
  'Sahnesoße': { en: 'Cream sauce', tr: 'Kremalı sos', ro: 'Sos de smântână', nl: 'Roomsaus' , sq: 'Salcë kremi', ku: 'Soza krêmê', pl: 'Sos śmietanowy'},
  'Jalapeños': { en: 'Jalapeños', tr: 'Jalapeño biber', ro: 'Jalapeño', nl: 'Jalapeño\'s' , sq: 'Speca Jalapeño', ku: 'Biberên Jalapeño', pl: 'Jalapeño'},
  'Thunfisch': { en: 'Tuna', tr: 'Ton balığı', ro: 'Ton', nl: 'Tonijn' , sq: 'Ton', ku: 'Masiyê ton', pl: 'Tuńczyk'},
  'Knoblauch': { en: 'Garlic', tr: 'Sarımsak', ro: 'Usturoi', nl: 'Knoflook' , sq: 'Hudhër', ku: 'Sîr', pl: 'Czosnek'},
  'Weißkohl': { en: 'White cabbage', tr: 'Beyaz lahana', ro: 'Varză albă', nl: 'Witte kool' , sq: 'Lakër e bardhë', ku: 'Kelema spî', pl: 'Kapusta biała'},
  'Pfirsich': { en: 'Peach', tr: 'Şeftali', ro: 'Piersică', nl: 'Perzik' , sq: 'Pjeshkë', ku: 'Xox', pl: 'Brzoskwinia'},
  'Hähnchen': { en: 'Chicken', tr: 'Tavuk', ro: 'Pui', nl: 'Kip' , sq: 'Pulë', ku: 'Mirîşk', pl: 'Kurczak'},
  'Brokkoli': { en: 'Broccoli', tr: 'Brokoli', ro: 'Broccoli', nl: 'Broccoli' , sq: 'Brokoli', ku: 'Brokolî', pl: 'Brokuł'},
  'Peperoni': { en: 'Chili peppers', tr: 'Acı biber', ro: 'Ardei iute', nl: 'Pepperoni' , sq: 'Speca djegës', ku: 'Biberê tûj', pl: 'Papryczki'},
  'Zwiebeln': { en: 'Onions', tr: 'Soğan', ro: 'Ceapă', nl: 'Uien' , sq: 'Qepë', ku: 'Pîvaz', pl: 'Cebula'},
  'Schinken': { en: 'Ham', tr: 'Jambon', ro: 'Șuncă', nl: 'Ham' , sq: 'Proshutë', ku: 'Jambon', pl: 'Szynka'},
  'serviert': { en: 'served', tr: 'servis edilir', ro: 'servit', nl: 'geserveerd' , sq: 'shërbehet', ku: 'tê pêşkêşkirin', pl: 'podawane'},
  'Krabben': { en: 'Shrimp sticks', tr: 'Krab çubuğu', ro: 'Bastonașe de crab', nl: 'Krabsticks' , sq: 'Gaforre', ku: 'Kevzêrk', pl: 'Kraby'},
  'Nuggets': { en: 'Nuggets', tr: 'Nugget', ro: 'Nuggets', nl: 'Nuggets' , sq: 'Nagets', ku: 'Nagets', pl: 'Nuggetsy'},
  'Portion': { en: 'Portion', tr: 'Porsiyon', ro: 'Porție', nl: 'Portie' , sq: 'Racion', ku: 'Porsiyon', pl: 'Porcja'},
  'Spezial': { en: 'Special', tr: 'Özel', ro: 'Special', nl: 'Speciaal' , sq: 'Speciale', ku: 'Taybet', pl: 'Specjalne'},
  'Schwarz': { en: 'Black', tr: 'Siyah', ro: 'Negre', nl: 'Zwart' , sq: 'E zezë', ku: 'Reş', pl: 'Czarne'},
  'Brokoli': { en: 'Broccoli', tr: 'Brokoli', ro: 'Broccoli', nl: 'Broccoli' , sq: 'Brokoli', ku: 'Brokolî', pl: 'Brokuł'},
  'Paprika': { en: 'Bell pepper', tr: 'Biber', ro: 'Ardei', nl: 'Paprika' , sq: 'Spec', ku: 'Biber', pl: 'Papryka'},
  'Tomaten': { en: 'Tomatoes', tr: 'Domates', ro: 'Roșii', nl: 'Tomaten' , sq: 'Domate', ku: 'Firangoş', pl: 'Pomidory'},
  'Ketchup': { en: 'Ketchup', tr: 'Ketçap', ro: 'Ketchup', nl: 'Ketchup' , sq: 'Ketchup', ku: 'Ketçap', pl: 'Ketchup'},
  'Zitrone': { en: 'Lemon', tr: 'Limon', ro: 'Lămâie', nl: 'Citroen' , sq: 'Limon', ku: 'Lîmon', pl: 'Cytryna'},
  'Extra Fleisch': { en: 'Extra meat', tr: 'Ekstra Et', ro: 'Carne extra', nl: 'Extra vlees' , sq: 'Mish shtesë', ku: 'Goştê zêde', pl: 'Dodatkowe mięso'},
  'Fleisch': { en: 'Meat', tr: 'Et', ro: 'Carne', nl: 'Vlees' , sq: 'Mish', ku: 'Goşt', pl: 'Mięso'},
  '5 Stück': { en: '5 pieces', tr: '5 adet', ro: '5 bucăți', nl: '5 stuks' , sq: '5 copë', ku: '5 heb', pl: '5 sztuk'},
  '7 Stück': { en: '7 pieces', tr: '7 adet', ro: '7 bucăți', nl: '7 stuks' , sq: '7 copë', ku: '7 heb', pl: '7 sztuk'},
  '10% Rabatt': { en: '10% off', tr: '%10 indirim', ro: '10% reducere', nl: '10% korting' , sq: '10% zbritje', ku: '10% daxistin', pl: '10% rabatu'},
  'Gratis Getränk': { en: 'Free drink', tr: 'Ücretsiz içecek', ro: 'Băutură gratuită', nl: 'Gratis drankje' , sq: 'Pije falas', ku: 'Vexwarina belaş', pl: 'Darmowy napój'},
  'Gratis Pommes': { en: 'Free fries', tr: 'Ücretsiz patates', ro: 'Cartofi prăjiți gratuiți', nl: 'Gratis friet' , sq: 'Patate falas', ku: 'Kartolê belaş', pl: 'Darmowe frytki'},
  'Gratis Nuggets': { en: 'Free nuggets', tr: 'Ücretsiz nugget', ro: 'Nuggets gratuite', nl: 'Gratis nuggets' , sq: 'Nagets falas', ku: 'Nagetsên belaş', pl: 'Darmowe nuggetsy'},
  'Nochmal Glück!': { en: 'Try again!', tr: 'Tekrar dene!', ro: 'Încearcă din nou!', nl: 'Nog een keer!' , sq: 'Edhe një herë fat!', ku: 'Careke din bext!', pl: 'Jeszcze raz szczęścia!'},
  'Eistee': { en: 'Iced tea', tr: 'Soğuk çay', ro: 'Ceai rece', nl: 'IJsthee' , sq: 'Çaj i ftohtë', ku: 'Çaya sar', pl: 'Mrożona herbata'},
  'Spinat': { en: 'Spinach', tr: 'Ispanak', ro: 'Spanac', nl: 'Spinazie' , sq: 'Spinaq', ku: 'Spînax', pl: 'Szpinak'},
  'Gemüse': { en: 'Vegetable', tr: 'Sebzeli', ro: 'Legume', nl: 'Groente' , sq: 'Perime', ku: 'Sebze', pl: 'Warzywa'},
  'Tasche': { en: 'Pocket', tr: 'Cep', ro: 'Buzunar', nl: 'Zak' , sq: 'Byrek', ku: 'Kîs', pl: 'Kieszeń'},
  'Teller': { en: 'Plate', tr: 'Tabak', ro: 'Farfurie', nl: 'Bord' , sq: 'Pjatë', ku: 'Firaq', pl: 'Talerz'},
  'Türkei': { en: 'Turkey', tr: 'Türkiye', ro: 'Turcia', nl: 'Turkije' , sq: 'Turqi', ku: 'Tirkiye', pl: 'Turcja'},
  'Bauern': { en: 'Farmer\'s', tr: 'Çiftçi', ro: 'Țărănească', nl: 'Boeren' , sq: 'Fshatare', ku: 'Gundî', pl: 'Chłopska'},
  'Oliven': { en: 'Olives', tr: 'Zeytin', ro: 'Măsline', nl: 'Olijven' , sq: 'Ullinj', ku: 'Zeytûn', pl: 'Oliwki'},
  'Gurken': { en: 'Cucumbers', tr: 'Salatalık', ro: 'Castraveți', nl: 'Komkommer' , sq: 'Kastravec', ku: 'Xiyar', pl: 'Ogórki'},
  'Salami': { en: 'Salami', tr: 'Salam', ro: 'Salam', nl: 'Salami' , sq: 'Sallam', ku: 'Salami', pl: 'Salami'},
  'Ananas': { en: 'Pineapple', tr: 'Ananas', ro: 'Ananas', nl: 'Ananas' , sq: 'Ananas', ku: 'Enenas', pl: 'Ananas'},
  'Pilzen': { en: 'Mushrooms', tr: 'Mantar', ro: 'Ciuperci', nl: 'Champignons' , sq: 'Kërpudha', ku: 'Karkoçk', pl: 'pieczarkami'},
  'Pommes': { en: 'Fries', tr: 'Patates kızartması', ro: 'Cartofi prăjiți', nl: 'Friet' , sq: 'Patate', ku: 'Kartol', pl: 'Frytki'},
  'Wasser': { en: 'Water', tr: 'Su', ro: 'Apă', nl: 'Water' , sq: 'Ujë', ku: 'Av', pl: 'Woda'},
  ' oder ': { en: ' or ', tr: ' veya ', ro: ' sau ', nl: ' of ' , sq: ' ose ', ku: ' an ', pl: ' lub '},
  'Salat': { en: 'Salad', tr: 'Salata', ro: 'Salată', nl: 'Salade' , sq: 'Sallatë', ku: 'Salate', pl: 'Sałatka'},
  'Steak': { en: 'Steak', tr: 'Biftek', ro: 'Steak', nl: 'Steak' , sq: 'Biftek', ku: 'Stêk', pl: 'Stek'},
  ' und ': { en: ' and ', tr: ' ve ', ro: ' și ', nl: ' en ' , sq: ' dhe ', ku: ' û ', pl: ' i '},
  ' mit ': { en: ' with ', tr: ' ile ', ro: ' cu ', nl: ' met ' , sq: ' me ', ku: ' bi ', pl: ' z '},
  'Rahm': { en: 'Cream', tr: 'Kremalı', ro: 'Cu smântână', nl: 'Room' , sq: 'Krem', ku: 'Krêm', pl: 'Śmietana'},
  'Mais': { en: 'Corn', tr: 'Mısır', ro: 'Porumb', nl: 'Maïs' , sq: 'Misër', ku: 'Genimoke', pl: 'Kukurydza'},
  'Käse': { en: 'Cheese', tr: 'Peynir', ro: 'Brânză', nl: 'Kaas' , sq: 'Djathë', ku: 'Penîr', pl: 'Ser'},
  'Brot': { en: 'Bread', tr: 'Ekmek', ro: 'Pâine', nl: 'Brood' , sq: 'Bukë', ku: 'Nan', pl: 'Chleb'},
  'Dose': { en: 'Can', tr: 'Kutu', ro: 'Doză', nl: 'Blikje' , sq: 'Kanaçe', ku: 'Qutî', pl: 'Puszka'},
  'Ei': { en: 'Egg', tr: 'Yumurta', ro: 'Ou', nl: 'Ei' , sq: 'Vezë', ku: 'Hêk', pl: 'Jajko'},
  'Scharf': { en: 'Spicy', tr: 'Acılı', ro: 'Picant', nl: 'Pittig' , sq: 'Djegës', ku: 'Tûj', pl: 'Ostre'},
  'Hähnchen-Fleisch': { en: 'Chicken meat', tr: 'Tavuk eti', ro: 'Carne de pui', nl: 'Kipvlees' , sq: 'Mish pule', ku: 'Goştê mirîşkê', pl: 'Mięso z kurczaka'},
  'Kola & Orange': { en: 'Cola & Orange', tr: 'Kola & Portakal', ro: 'Cola & Portocală', nl: 'Cola & Sinaasappel' , sq: 'Kola & Portokall', ku: 'Kola & Porteqal', pl: 'Kola i Pomarańcza'},
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
    { id: 'k0-steak', name: 'Steak Kebap', price: 10.0, desc: 'Steak Fleisch, Knoblauchsoße, Salat und Zwiebeln', weekend: true, alg: 'a,i,e' },
    { id: 'k1', name: 'Kalb Kebap', price: 8.0, desc: 'Fleisch vom Drehspieß, Knoblauchsoße, Salat und Zwiebeln', alg: 'a,i,15' },
    { id: 'k2', name: 'Kebap Spezial Weichkäse', price: 8.5, desc: 'Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln, Weichkäse in Salzlake', alg: 'a,i,15' },
    { id: 'k3', name: 'Kebap Hollandaise Soße', price: 8.5, desc: 'Fleisch vom Drehspieß, Hollandaise Soße, Salat, Zwiebeln', alg: 'a,i,15' },
    { id: 'k4', name: 'Bodrum Gemüse Kebap', price: 9.0, desc: 'Fritiertes Gemüse, Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln', alg: 'a,e,i,15' },
    { id: 'k5', name: 'Jumbo Kebap', price: 9.0, desc: 'Extra Portion Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln', alg: 'a,i,15' },
    { id: 'k6', name: 'Kebap Box', price: 8.0, desc: 'Fleisch vom Drehspieß, Pommes und Knoblauchsoße', alg: 'a,i,15' },
    { id: 'k7', name: 'Vegetarische Tasche', price: 7.0, desc: 'Brot mit Salat, Knoblauchsoße, Zwiebeln und Weichkäse in Salzlake', alg: 'a,i' },
    { id: 'k8', name: 'Dürüm Kebap', price: 9.0, desc: 'Lavasbrot, Fleisch vom Drehspieß, Salat, Knoblauchsoße und Zwiebeln', alg: 'a,i,15' },
    { id: 'k9', name: 'Bodrum Gemüse Dürüm Kebap', price: 10.0, desc: 'Lavasbrot, Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln und fritiertes Gemüse', alg: 'a,e,i,15' },
    { id: 'k10', name: 'Türkische Pizza Salat (Lahmacun)', price: 8.0, desc: 'Mit Salat, Knoblauchsoße und Zwiebeln', alg: 'a,i' },
    { id: 'k11', name: 'Türkische Pizza Kebap (Lahmacun)', price: 10.0, desc: 'Fleisch vom Drehspieß, Knoblauchsoße, Salat und Zwiebeln', alg: 'a,i,15' },
    { id: 'k12', name: 'Steak Teller', price: 14.0, desc: 'Steak Fleisch, Salat, Knoblauchsoße, Zwiebeln und Pommes', weekend: true, alg: 'a,i,e' },
    { id: 'k13', name: 'Kebap Teller', price: 12.0, desc: 'Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln und Pommes', alg: 'a,i,15' },
    { id: 'k14', name: 'Kebap Teller Bodrum', price: 13.0, desc: 'Salat, Knoblauchsoße, Zwiebeln, Weichkäse, Peperoni und Pommes', alg: 'a,i,15' },
    { id: 'k15', name: 'Kebap Teller Hollandaise Soße', price: 13.0, desc: 'Salat, Zwiebeln, Hollandaise und Pommes', alg: 'a,e,i,15' },
    { id: 'k16', name: 'Gemüse Kebap Teller', price: 13.5, desc: 'Fritiertes Gemüse, Salat, Knoblauchsoße, Zwiebeln, Pommes', alg: 'a,i,15' },
    { id: 'k17', name: 'Falafel Tasche', price: 7.0, desc: 'Mit Salat und Knoblauchsoße', alg: 'a,c,g,i' },
    { id: 'k18', name: 'Falafel Tortilla Dürüm', price: 8.0, desc: 'Mit Salat und Knoblauchsoße', alg: 'a,c,g,i' },
    { id: 'k19', name: 'Falafel Teller (7 Stück)', price: 10.0, desc: 'Mit Salat und Pommes', alg: 'a,c,g,i' },
  ]},
  { key: 'pizza', label: 'Pizza', items: [
    { id: 'custom-pizza', name: 'Baue deine eigene Pizza 🎨', price: 8.0, desc: 'Tomatensoße inklusive — wähle deine Beläge', customPizza: true },
    { id: 'p24', name: 'Pizza Margherita', priceSmall: 7.0, priceLarge: 8.0, alg: 'a,i,e' },
    { id: 'p25', name: 'Pizza Salami', priceSmall: 8.0, priceLarge: 9.0, alg: 'a,i,e,13' },
    { id: 'p26', name: 'Pizza Schinken', priceSmall: 8.0, priceLarge: 9.0, alg: 'a,i,e,13' },
    { id: 'p27', name: 'Pizza Kebap', priceSmall: 8.0, priceLarge: 9.0, alg: 'a,i,e,15' },
    { id: 'p28', name: 'Pizza Kebap Hollandaise', priceSmall: 9.0, priceLarge: 10.0, alg: 'a,i,e,15' },
    { id: 'p29', name: 'Pizza Bodrum', priceSmall: 10.0, priceLarge: 11.0, desc: 'Fleisch vom Drehspieß, Zwiebeln, Jalapeños und Hollandaise Soße', alg: 'a,i,e,15' },
    { id: 'p30', name: 'Pizza Rastaa', priceSmall: 10.0, priceLarge: 11.0, desc: 'Fleisch vom Drehspieß, Mais und Peperoni, Hollandaise Soße', alg: 'a,i,e,15' },
    { id: 'p31', name: 'Pizza Oldenburger Münsterland', priceSmall: 10.0, priceLarge: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Mais und Hollandaise Soße', alg: 'a,i,e,15' },
    { id: 'p32', name: 'Pizza Thunfisch', priceSmall: 9.0, priceLarge: 10.0, desc: 'Mit Zwiebeln', alg: 'a,i,e,j' },
    { id: 'p33', name: 'Pizza Steak', priceSmall: 9.0, priceLarge: 10.0, weekend: true, alg: 'a,i,e' },
    { id: 'p34', name: 'Pizza Hawaii', priceSmall: 9.0, priceLarge: 10.0, desc: 'Putenschinken und Ananas', alg: 'a,i,e,13' },
    { id: 'p35', name: 'Pizza Türkei', priceSmall: 10.0, priceLarge: 11.0, desc: 'Türkische Knoblauchwurst, Tomaten und Ei', alg: 'a,i,e,13' },
    { id: 'p36', name: 'Pizza Sucuk', priceSmall: 8.5, priceLarge: 9.5, desc: 'Mit türkischer Knoblauchwurst', alg: 'a,i,e,13' },
    { id: 'p37', name: 'Pizza Spezial', priceSmall: 8.5, priceLarge: 9.5, desc: 'Thunfisch, Putenschinken, Ananas und Pilzen', alg: 'a,e,i,j,13' },
    { id: 'p38', name: 'Pizza Vechta', priceSmall: 10.5, priceLarge: 11.5, desc: 'Fleisch vom Drehspieß, Brokkoli, Zwiebeln, Paprika, Hollandaise Soße, Weichkäse in Salzlake', alg: 'a,i,e,15' },
    { id: 'p39', name: 'Pizza Deutschland', priceSmall: 9.5, priceLarge: 10.5, desc: 'Fleisch vom Drehspieß und Paprika', alg: 'a,i,e,15' },
    { id: 'p40', name: 'Pizza Spinat', priceSmall: 8.5, priceLarge: 9.5, desc: 'Knoblauch und Weichkäse in Salzlake', alg: 'a,i,e' },
    { id: 'p41', name: 'Pizza Vegetarisch', priceSmall: 8.0, priceLarge: 9.0, desc: 'Pilzen, Brokkoli, Paprika und Mais', alg: 'a,i,e' },
    { id: 'p42', name: 'Pizza Mozzarella', priceSmall: 8.5, priceLarge: 9.5, desc: 'Frische Tomaten und Mozzarella', alg: 'a,i,e,13' },
    { id: 'p43', name: 'Pizza Taverna', priceSmall: 9.5, priceLarge: 10.5, desc: 'Rindersalami, Putenschinken, Pilzen und Ei', alg: 'a,i,e,13' },
    { id: 'p44', name: 'Pizza Meeresfrüchte', priceSmall: 8.5, priceLarge: 9.5, desc: 'Mit Knoblauch', alg: 'a,i,e,d' },
    { id: 'p45', name: 'Pizza Krabben', priceSmall: 8.5, priceLarge: 9.5, desc: 'Mit Knoblauch', alg: 'a,i,e,d,j' },
    { id: 'p46', name: 'Pizza QuattroStagioni', priceSmall: 9.5, priceLarge: 10.5, desc: 'Rindersalami, Putenschinken, Pilzen und Paprika', alg: 'a,i,e,13' },
    { id: 'p47', name: 'Pizza Vier Käse', priceSmall: 9.0, priceLarge: 10.0, desc: 'Mozzarella, Gorgonzola und Weichkäse', alg: 'a,g,i' },
    { id: 'p48', name: 'Pizza Bolognese', priceSmall: 8.0, priceLarge: 9.0, desc: 'Mit Fleischsoße', alg: 'a,i,e' },
    { id: 'p49', name: 'Pizza Brokoli', priceSmall: 8.0, priceLarge: 9.0, alg: 'a,i,e' },
    { id: 'p52', name: 'Pizza Oythe', priceSmall: 9.5, priceLarge: 10.5, desc: 'Krabben, Putenschinken, Knoblauch', alg: 'a,i,e,d' },
    { id: 'p53', name: 'Pizza Italia', priceSmall: 9.5, priceLarge: 10.5, desc: 'Brokkoli, Pilzen, Zwiebeln und Weichkäse in Salzlake', alg: 'a,i,e' },
    { id: 'p54', name: 'Pizza Fantaria', priceSmall: 10.0, priceLarge: 11.5, desc: 'Rindersalami, Putenschinken, Paprika und Peperoni', alg: 'a,i,e,13' },
  ]},
  { key: 'familienpizza', label: 'Familienpizza', items: [
    { id: 'familienpizza', name: 'Familienpizza Margherita', price: 15.0, desc: '~Ø 40 cm · Tomatensoße, Oregano, Goudakäse', alg: 'a,i,e', extras: [{ label: 'Gemüse', price: 2.5 }, { label: 'Fleisch', price: 3.5 }, { label: 'Steak', price: 4.5 }], toppingChoices: ['Mais', 'Zwiebeln', 'Ananas', 'Peperoni', 'Meeresfrüchte', 'Krabben', 'Paprika', 'Brokkoli', 'Spinat', 'Bolognese', 'Rindersalami', 'Putenschinken', 'Pilze', 'Weichkäse in Salzlake', 'Mozzarella', 'Fleisch vom Drehspieß', 'Türkische Knoblauchwurst (Sucuk)', 'Thunfisch', 'Steak Fleisch'] },
  ]},
  { key: 'pizzabrot', label: 'Pizzabrot & Brötchen', items: [
    { id: 'p56', name: 'Pizzabrot', price: 4.5, alg: 'a,i,e' },
    { id: 'p57', name: 'Pizzabrot mit Käse', price: 5.5, alg: 'a,i,e' },
    { id: 'p58', name: 'Pizzabrot mit Knoblauch', price: 5.5, alg: 'a,i,e' },
    { id: 'p59', name: 'Pizzabrot mit Kräuterbutter', price: 5.5, alg: 'a,i,e,d' },
    { id: 'p60', name: 'Pizzabrötchen mit Käse', price: 7.0, desc: 'Gratis Dip inklusive', sauceChoice: true, alg: 'a,i,e' },
    { id: 'p61', name: 'Pizzabrötchen mit Fleisch', price: 8.0, desc: 'Gratis Dip inklusive', sauceChoice: true, alg: 'a,i,e' },
    { id: 'p62', name: 'Pizzabrötchen mit Salami', price: 8.0, desc: 'Gratis Dip inklusive', sauceChoice: true, alg: 'a,i,e,13' },
    { id: 'p63', name: 'Pizzabrötchen mit Thunfisch', price: 8.0, desc: 'Gratis Dip inklusive', sauceChoice: true, alg: 'a,i,e,j' },
  ]},
  { key: 'calzone', label: 'Calzone', items: [
    { id: 'c78', name: 'Calzone Steak', price: 12.0, desc: 'Fleisch vom Drehspieß, Knoblauchsoße, Zwiebeln und Weichkäse', weekend: true, alg: 'a,i,e' },
    { id: 'c79', name: 'Calzone Kebap', price: 10.0, desc: 'Fleisch vom Drehspieß, Knoblauchsoße, Zwiebeln und Weichkäse in Salzlake', alg: 'a,i,e,15' },
    { id: 'c80', name: 'Calzone Bodrum Hollandaise', price: 11.0, desc: 'Fleisch vom Drehspieß, Hollandaise Soße, Zwiebeln, Jalapeños und Weichkäse in Salzlake', alg: 'a,i,e,15' },
    { id: 'c81', name: 'Calzone Thunfisch', price: 10.0, desc: 'Thunfisch und Zwiebeln', alg: 'a,i,e,j' },
    { id: 'c82', name: 'Calzone Vegetarisch', price: 9.5, desc: 'Paprika, Pilzen, Brokoli, Mais und Weichkäse', alg: 'a,i,e' },
    { id: 'c83', name: 'Calzone Gourmet', price: 10.0, desc: 'Rindersalami, Schinken und Pilzen', alg: 'a,i,e,13' },
    { id: 'c84', name: 'Calzone Hawaii', price: 9.5, desc: 'Putenschinken und Ananas', alg: 'a,i,e,13' },
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
    { id: 'u129-steak', name: 'Steak Döner überbacken', price: 14.0, desc: 'Steak Döner, Tomatensoße, mit Knoblauch, Paprika und Zwiebeln', weekend: true, alg: 'a,i,e' },
    { id: 'u130', name: 'Hähnchen überbacken', price: 11.0, desc: 'Gebratenes Hähnchen, Sahnesoße, Paprika und Pilzen', alg: 'a,i,14' },
    { id: 'u131', name: 'Kebap überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Zwiebeln und Tomatensoße', alg: 'a,i,15' },
    { id: 'u132', name: 'Kebap überbacken Bodrum', price: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Pilzen und Sahnesoße', alg: 'a,i,15' },
    { id: 'u133', name: 'Kebap Hawaii überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Tomatensoße und Ananas', alg: 'a,e,i,13' },
    { id: 'u134', name: 'Kebap Spezial überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Tomatensoße, Brokoli, Pilzen und Weichkäse', alg: 'a,i,15' },
    { id: 'u135', name: 'Kebap Hollandaise überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Tomaten, Paprika und Pilzen', alg: 'a,e,i,15' },
    { id: 'u136', name: 'Kebap Vechta überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Mais, Brokoli und Sahnesoße', alg: 'a,i,15' },
  ]},
  { key: 'rollo', label: 'Rollo überbacken', items: [
    { id: 'r146', name: 'Rollo Steak', price: 12.0, desc: 'Steak Fleisch, Zwiebeln und Knoblauchsoße, mit kleinem Beilagensalat', weekend: true, alg: 'a,e,i,15' },
    { id: 'r147', name: 'Rollo Kebap', price: 10.0, desc: 'Fleisch vom Drehspieß, Zwiebeln und Knoblauchsoße, mit kleinem Beilagensalat', alg: 'a,e,i,15' },
    { id: 'r148', name: 'Rollo Bodrum', price: 11.0, desc: 'Fleisch vom Drehspieß, Zwiebeln und Hollandaise Soße, mit kleinem Beilagensalat', alg: 'a,e,i,15' },
    { id: 'r149', name: 'Rollo Thunfisch', price: 10.0, desc: 'Thunfisch und Zwiebeln', alg: 'a,e,i,j' },
    { id: 'r150', name: 'Rollo Hawaii', price: 10.0, desc: 'Putenschinken und Ananas', alg: 'a,e,i,13' },
    { id: 'r153', name: 'Rollo Spezial', price: 10.0, desc: 'Rindersalami, Putenschinken und Pilzen', alg: 'a,e,i,13' },
  ]},
  { key: 'nudeln', label: 'Nudeln', items: [
    { id: 'n157', name: 'Spaghetti Pomodoro', price: 7.5, desc: 'Mit Tomatensoße', alg: 'a' },
    { id: 'n158', name: 'Spaghetti Bolognese', price: 8.0, desc: 'Mit Fleischsoße', alg: 'a' },
    { id: 'n159', name: 'Spaghetti Carbonara', price: 8.5, desc: 'Putenschinken, Ei und Sahnesoße', alg: 'a,c,j,2,3,7' },
    { id: 'n160', name: 'Spaghetti Bodrum', price: 9.0, desc: 'Fleisch vom Drehspieß, Brokkoli, Pilzen und Sahnesoße', alg: 'a,j,2,3,4,7' },
    { id: 'n161', name: 'Makkaroni Vegetaria', price: 8.5, desc: 'Brokkoli, Pilzen, Paprika, Tomatensoße', alg: 'a' },
    { id: 'n162', name: 'Makkaroni Kebap', price: 9.0, desc: 'Fleisch vom Drehspieß, Tomatensoße, überbacken mit Käse', alg: 'a,j,2,3,4,7' },
    { id: 'n163', name: 'Makkaroni Bodrum', price: 9.0, desc: 'Fleisch vom Drehspieß, Brokkoli, Pilzen und Sahnesoße', alg: 'a,j,2,3,4,7' },
    { id: 'n164', name: 'Makkaroni Al Forno', price: 9.5, desc: 'Fleisch vom Drehspieß, Brokkoli, Mais und Sahnesoße, mit Käse überbacken', alg: 'a,j,2,3,4,7' },
    { id: 'n165', name: 'Alpine Pesto', price: 10.0, desc: 'Hähnchenbrust in Sahnesoße mit Berg-Thymian, serviert mit Kurkuma-Penne & Marktsalat', alg: 'a,i,1' },
    { id: 'n166', name: 'Curry-Madras', price: 10.0, desc: 'Hähnchenbrust mit Pilzen in Curry-Sahnesoße, serviert mit Kurkuma-Penne & Marktsalat', alg: 'a,i,1,4' },
    { id: 'n167', name: 'Fungi di Roma', price: 10.0, desc: 'Hähnchenbrust mit Pilzen in Sahnesoße, serviert mit Kurkuma-Penne & Marktsalat', alg: 'a,i,1,4' },
    { id: 'n168', name: 'Balkan Spirit', price: 10.0, desc: 'Hähnchenbrust in Paprika-Auberginen-Soße, serviert mit Kurkuma-Penne & Marktsalat', alg: 'a,i,1,4' },
    { id: 'n169', name: 'Soja Salsa', price: 11.0, desc: 'Hähnchenbrust mit Paprika & Pilzen in Sojasoße, serviert mit Kurkuma-Penne & Marktsalat', alg: 'a,i,h,1,4' },
  ]},
  { key: 'schnitzel', label: 'Schnitzel', items: [
    { id: 's184', name: 'Schnitzel Wiener Art', price: 10.0, desc: 'Mit Salat, Pommes', alg: 'a,e,i,14' },
    { id: 's185', name: 'Zigeuner Schnitzel', price: 11.0, desc: 'Salat, Zigeunersoße, Pommes', alg: 'a,e,i,14' },
    { id: 's186', name: 'Jäger Schnitzel', price: 11.0, desc: 'Salat, Jägersoße, Pommes', alg: 'a,e,i,14' },
    { id: 's187', name: 'Brokkoli Schnitzel', price: 11.0, desc: 'Salat, Sahnesoße, Brokkoli, Pommes', alg: 'a,e,i,14' },
    { id: 's188', name: 'Hawaii Schnitzel', price: 11.0, desc: 'Salat, Putenschinken, Ananas, Pommes, überbacken mit Käse', alg: 'a,e,i,13,14' },
    { id: 's189', name: 'Gorgonzola Schnitzel', price: 11.0, desc: 'Salat, Sahnesoße, Gorgonzola, Pommes', alg: 'a,e,i,14' },
    { id: 's190', name: 'Mozzarella Schnitzel', price: 11.0, desc: 'Frische Tomaten, Mozzarella, Sahnesoße, Pommes, überbacken mit Käse und Salat', alg: 'a,e,i,14' },
    { id: 's191', name: 'Rahm Schnitzel', price: 11.0, desc: 'Salat, Pilzen, Rahmpulver, Pommes', alg: 'a,e,i,14' },
  ]},
  { key: 'salat', label: 'Salat', items: [
    { id: 'sa95', name: 'Nizza Salat', price: 8.0, desc: 'Grüner Salat, Tomaten, Gurken, Zwiebeln, Weißkohl, Putenschinken und Käse', alg: 'a,i,13' },
    { id: 'sa96', name: 'Bauern Salat', price: 7.0, desc: 'Grüner Salat, Tomaten, Gurken und Weichkäse', alg: 'i' },
    { id: 'sa97', name: 'Thunfisch Salat', price: 8.0, desc: 'Grüner Salat, Tomaten, Gurken, Weißkohl, Thunfisch und Zwiebeln', alg: 'i,j' },
    { id: 'sa98', name: 'Mais Salat', price: 7.0, desc: 'Grüner Salat, Tomaten, Gurken, Weißkohl, Zwiebeln und Mais', alg: 'i' },
    { id: 'sa100', name: 'Mozzarella Salat', price: 8.0, desc: 'Grüner Salat, Tomaten und Mozzarella', alg: 'i,13' },
    { id: 'sa101', name: 'Bodrum Salat', price: 9.5, desc: 'Grüner Salat, Tomaten, Gurken, Zwiebeln, Mais, Weißkohl, Thunfisch, Putenschinken, Paprika und Weichkäse in Salzlake', alg: 'i,15' },
    { id: 'sa102', name: 'Kebap Salat', price: 9.0, desc: 'Fleisch vom Drehspieß, grüner Salat, Tomaten, Gurken, Zwiebeln und Weißkohl', alg: 'i,15' },
    { id: 'sa104', name: 'Hähnchen Salat', price: 9.0, desc: 'Gebratenes Hähnchen, grüner Salat, Tomaten, Gurken, Zwiebeln und Weißkohl', alg: 'i,15' },
  ]},
  { key: 'finger', label: 'Finger Food', items: [
    { id: 'f201', name: 'Chicken Strips (5 Stück)', price: 5.0, desc: '5 Stück', alg: 'a,b,e,g,i,2,3,4' },
    { id: 'f202', name: 'Nuggets (7 Stück)', price: 5.0, desc: '7 Stück', alg: 'a,b,e,g,i,2,3,4' },
    { id: 'f203', name: 'Pommes Frites', price: 3.5, alg: '4' },
    { id: 'f204a', name: 'Portion Knoblauchsauce', price: 2.0, alg: 'c,e,g,2,3' },
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
    { id: 'g308', name: 'Fritz-Kola', price: 3.0, img: FRITZ_KOLA_IMG, imgContain: true },
    { id: 'g309', name: 'Fritz-Limo', price: 3.0, desc: 'Zitrone oder Apfel-Kirsch-Holunder', img: FRITZ_LIMO_IMG, imgContain: true },
    { id: 'g310', name: 'Fritz-Spritz', price: 3.0, desc: 'Bio-Rhabarber oder Bio-Traubenschorle', img: FRITZ_SPRITZ_TRAUBE_IMG, imgContain: true },
    { id: 'g310b', name: 'Fritz-Kola Mischmasch', price: 3.0, desc: 'Kola & Orange', img: FRITZ_MISCHMASCH_IMG, imgContain: true },
    { id: 'g311', name: 'Vita Malz', price: 3.0 },
    { id: 'g312', name: 'Energy Drink', price: 3.0 },
  ]},
];
const EXTRA_TOPPINGS = ['Mais', 'Zwiebeln', 'Ananas', 'Peperoni', 'Jalapeños', 'Paprika', 'Brokkoli', 'Pilzen', 'Sucuk', 'Extra Fleisch', 'Brot', 'Scharf'];
const PASTA_TOPPINGS = ['Tomatensoße', 'Sahnesoße', 'Bolognese-Soße', 'Käse', 'Extra Fleisch', 'Peperoni', 'Pilzen'];
const PASTA_SAUCE_OPTIONS = ['Tomatensoße', 'Sahnesoße', 'Bolognese-Soße'];
const PASTA_EXTRA_ITEMS = ['Käse', 'Käse überbacken', 'Extra Fleisch', 'Peperoni', 'Jalapeños', 'Pilzen', 'Mais', 'Brokkoli', 'Putenschinken', 'Paprika', 'Ei', 'Brot', 'Scharf'];
const PASTA_TYPES = ['Spaghetti', 'Makkaroni'];

/* ============ HELPERS ============ */
function fmt(n) { return n.toFixed(2).replace('.', ',') + ' €'; }
const ALLERGEN_LEGEND = {
  a: { de: 'Glutenhaltiges Getreide', en: 'Gluten-containing cereals', tr: 'Glüten içeren tahıllar', ro: 'Cereale cu gluten', nl: 'Glutenbevattende granen' },
  b: { de: 'Sellerie', en: 'Celery', tr: 'Kereviz', ro: 'Țelină', nl: 'Selderij' },
  c: { de: 'Erdnüsse', en: 'Peanuts', tr: 'Yer fıstığı', ro: 'Arahide', nl: 'Pinda\'s' },
  d: { de: 'Sesamsamen', en: 'Sesame seeds', tr: 'Susam tohumu', ro: 'Semințe de susan', nl: 'Sesamzaad' },
  e: { de: 'Eier', en: 'Eggs', tr: 'Yumurta', ro: 'Ouă', nl: 'Eieren' },
  f: { de: 'Krebstiere', en: 'Crustaceans', tr: 'Kabuklu deniz hayvanları', ro: 'Crustacee', nl: 'Schaaldieren' },
  g: { de: 'Schalenfrüchte', en: 'Tree nuts', tr: 'Kabuklu yemişler', ro: 'Fructe cu coajă', nl: 'Noten' },
  h: { de: 'Soja', en: 'Soy', tr: 'Soya', ro: 'Soia', nl: 'Soja' },
  i: { de: 'Milch', en: 'Milk', tr: 'Süt', ro: 'Lapte', nl: 'Melk' },
  j: { de: 'Fisch', en: 'Fish', tr: 'Balık', ro: 'Pește', nl: 'Vis' },
  k: { de: 'Senf', en: 'Mustard', tr: 'Hardal', ro: 'Muștar', nl: 'Mosterd' },
  l: { de: 'Schwefeldioxid/Sulphite', en: 'Sulphur dioxide/sulphites', tr: 'Kükürt dioksit/sülfit', ro: 'Dioxid de sulf/sulfiți', nl: 'Zwaveldioxide/sulfieten' },
  m: { de: 'Lupine', en: 'Lupin', tr: 'Acı bakla', ro: 'Lupin', nl: 'Lupine' },
  n: { de: 'Weichtiere', en: 'Molluscs', tr: 'Yumuşakçalar', ro: 'Moluște', nl: 'Weekdieren' },
};
const ZUSATZ_LEGEND = {
  1: { de: 'Farbstoffe', en: 'Colourings', tr: 'Renklendirici', ro: 'Coloranți', nl: 'Kleurstoffen' },
  2: { de: 'Konservierungsstoffe', en: 'Preservatives', tr: 'Koruyucu', ro: 'Conservanți', nl: 'Conserveringsmiddelen' },
  3: { de: 'Antioxidationsmittel', en: 'Antioxidants', tr: 'Antioksidan', ro: 'Antioxidanți', nl: 'Antioxidanten' },
  4: { de: 'Geschmacksverstärker', en: 'Flavour enhancers', tr: 'Lezzet arttırıcı', ro: 'Amplificatori de aromă', nl: 'Smaakversterkers' },
  5: { de: 'Geschwefelt', en: 'Sulphured', tr: 'Kükürtlenmiş', ro: 'Sulfurat', nl: 'Gezwaveld' },
  6: { de: 'Geschwärzt', en: 'Blackened (olives)', tr: 'Karartılmış (zeytin)', ro: 'Înnegrit (măsline)', nl: 'Zwart gemaakt (olijven)' },
  7: { de: 'Phosphat', en: 'Phosphate', tr: 'Fosfat', ro: 'Fosfat', nl: 'Fosfaat' },
  8: { de: 'Unter Schutzatmosphäre verpackt', en: 'Packaged under protective atmosphere', tr: 'Koruyucu atmosferde paketlenmiş', ro: 'Ambalat în atmosferă protectoare', nl: 'Verpakt onder beschermende atmosfeer' },
  9: { de: 'Gewachst', en: 'Waxed', tr: 'Mumlanmış', ro: 'Cerat', nl: 'Gewaxt' },
  10: { de: 'Mit Süßungsmittel', en: 'With sweetener', tr: 'Tatlandırıcılı', ro: 'Cu îndulcitor', nl: 'Met zoetstof' },
  11: { de: 'Koffeinhaltig', en: 'Contains caffeine', tr: 'Kafein içerir', ro: 'Conține cofeină', nl: 'Bevat cafeïne' },
  12: { de: 'Chininhaltig', en: 'Contains quinine', tr: 'Kinin içerir', ro: 'Conține chinină', nl: 'Bevat kinine' },
  13: { de: 'Rindersalami mit Konservierungs- & Antioxidationsmitteln, Farbstoffen', en: 'Beef salami with preservatives, antioxidants, colourings', tr: 'Koruyucu, antioksidan ve renklendirici içeren dana salam', ro: 'Salam de vită cu conservanți, antioxidanți, coloranți', nl: 'Runderworst met conserverings-, antioxidatie- en kleurstoffen' },
  14: { de: 'Schnitzel aus Geflügelfleisch (Putenformschnitzel)', en: 'Schnitzel made from poultry (formed turkey schnitzel)', tr: 'Kanatlı etinden şnitzel (hindi form şnitzel)', ro: 'Șnițel din carne de pasăre (curcan presat)', nl: 'Schnitzel van gevogelte (kalkoenvormschnitzel)' },
  15: { de: 'Mit Hähnchenseparatorenfleisch', en: 'With mechanically separated chicken meat', tr: 'Mekanik ayrılmış tavuk eti içerir', ro: 'Cu carne de pui separată mecanic', nl: 'Met machinaal ontbeend kippenvlees' },
};
function isWeekendDay() { const d = new Date().getDay(); return d === 0 || d === 5 || d === 6; }
function findMenuItemById(id) {
  for (const cat of MENU) { const item = cat.items.find((i) => i.id === id); if (item) return item; }
  return null;
}
function findMenuItemByName(name) {
  for (const cat of MENU) { const item = cat.items.find((i) => i.name === name); if (item) return item; }
  return null;
}
function applyItemOverride(item, overrides, photoOverrides, soldOutSet) {
  const ov = overrides ? overrides[item.id] : null;
  const photoOv = photoOverrides ? photoOverrides[item.id] : null;
  const isSoldOut = soldOutSet ? soldOutSet.has(item.id) : false;
  if (!ov && !photoOv && !isSoldOut) return item;
  let next = item;
  if (ov) {
    if (item.priceLarge !== undefined) {
      next = { ...next, priceSmall: ov.small !== undefined ? ov.small : item.priceSmall, priceLarge: ov.large !== undefined ? ov.large : item.priceLarge };
    } else {
      next = { ...next, price: ov.price !== undefined ? ov.price : item.price };
    }
  }
  if (photoOv) next = { ...next, img: photoOv, imgContain: false };
  if (isSoldOut) next = { ...next, soldOut: true };
  return next;
}
function applyPriceOverrides(overrides, photoOverrides, soldOutIds) {
  const hasPrice = overrides && Object.keys(overrides).length > 0;
  const hasPhoto = photoOverrides && Object.keys(photoOverrides).length > 0;
  const hasSoldOut = soldOutIds && soldOutIds.length > 0;
  if (!hasPrice && !hasPhoto && !hasSoldOut) return MENU;
  const soldOutSet = hasSoldOut ? new Set(soldOutIds) : null;
  return MENU.map((cat) => ({
    ...cat,
    items: cat.items.map((item) => applyItemOverride(item, overrides, photoOverrides, soldOutSet)),
  }));
}
function applyOverridesToFlatList(items, overrides, photoOverrides, soldOutIds) {
  const hasPrice = overrides && Object.keys(overrides).length > 0;
  const hasPhoto = photoOverrides && Object.keys(photoOverrides).length > 0;
  const hasSoldOut = soldOutIds && soldOutIds.length > 0;
  if (!hasPrice && !hasPhoto && !hasSoldOut) return items;
  const soldOutSet = hasSoldOut ? new Set(soldOutIds) : null;
  return items.map((item) => applyItemOverride(item, overrides, photoOverrides, soldOutSet));
}
function getFavorites() { try { return JSON.parse(localStorage.getItem('bk_favorites') || '[]'); } catch { return []; } }
function toggleFavoriteId(id) {
  const favs = getFavorites();
  const next = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
  try { localStorage.setItem('bk_favorites', JSON.stringify(next)); } catch {}
  return next;
}
function FavoriteHeart({ id, favorites, setFavorites, size = 16 }) {
  const isFav = favorites.includes(id);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); setFavorites(toggleFavoriteId(id)); }}
      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: isFav ? '#fdecd4' : 'rgba(21,56,38,.06)' }}
    >
      <Heart size={size} fill={isFav ? CHILI : 'none'} color={isFav ? CHILI : '#a4906c'} strokeWidth={2} />
    </button>
  );
}
function isLunchWindowNow() {
  const now = new Date();
  const day = now.getDay();
  const lunchDays = isTuesdayOpenNow(now) ? [1, 2, 3, 4, 5] : [1, 3, 4, 5];
  if (!lunchDays.includes(day)) return false;
  const start = new Date(now); start.setHours(11, 30, 0, 0);
  const end = new Date(now); end.setHours(14, 0, 0, 0);
  return now >= start && now <= end;
}
const LUNCH_CATEGORIES = ['pizza', 'salat', 'schnitzel', 'nudeln'];
function findSoldOutExtraInItem(item, soldOutExtras) {
  if (!soldOutExtras || soldOutExtras.length === 0 || !item.desc) return null;
  return soldOutExtras.find((name) => item.desc.includes(name)) || null;
}
function hasDonerMeat(item) {
  if (item.name.includes('Steak')) return false;
  return item.name.includes('Kebap') || (item.desc && item.desc.includes('Fleisch vom Drehspieß'));
}
function extraCost(name) {
  if (name === 'Hähnchen-Fleisch') return 0;
  if (name === 'Bolognese-Soße') return 0.5;
  if (name === 'Tomatensoße' || name === 'Sahnesoße') return 0;
  return 1.0;
}
function menuNum(id) { if (/^g\d/.test(id)) return ''; return id.replace(/^[a-z]+/i, ''); }
function normalizePhone(raw) { return raw.replace(/[^\d+]/g, ''); }
function todayKey() { return new Date().toISOString().slice(0, 10); }
const SUPABASE_URL = 'https://uayewlkcqlgtzmeerhjy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dTrkRJ16pFhd2Bp1In-CTQ_jXVnWVcE';
const STORAGE_BUCKET = 'menu-photos';
async function uploadImageToStorage(dataUrl, keyHint) {
  try {
    const blob = await (await fetch(dataUrl)).blob();
    const path = `${(keyHint || 'photo').replace(/[^a-z0-9-]/gi, '_')}-${Date.now()}.jpg`;
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${path}`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'image/jpeg' },
      body: blob,
    });
    if (!res.ok) return null;
    return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
  } catch { return null; }
}

const kvCache = new Map();
const kvInflight = new Map();
async function safeGet(key) {
  if (kvCache.has(key)) return kvCache.get(key);
  if (kvInflight.has(key)) return kvInflight.get(key);
  const p = (async () => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/kv_store?key=eq.${encodeURIComponent(key)}&select=value`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
      });
      if (!res.ok) return null;
      const rows = await res.json();
      const value = rows.length ? rows[0].value : null;
      kvCache.set(key, value);
      return value;
    } catch { return null; }
    finally { kvInflight.delete(key); }
  })();
  kvInflight.set(key, p);
  return p;
}
function tischText(val, lang) {
  if (!val) return '';
  if (typeof val === 'string') return val;
  return val[lang] || val.de || '';
}
function tischCatLabel(cat, lang) {
  if (cat.key.startsWith('imp-')) {
    const orig = cat.key.slice(4);
    if (CATEGORY_LABELS[orig]) return catLabel(orig, lang);
  }
  return mx(tischText(cat.label, 'de'), lang);
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
    if (res.ok) kvCache.set(key, value);
    return res.ok;
  } catch { return false; }
}
const kvListCache = new Map();
async function safeListPrefix(prefix, limit = 20) {
  const cacheKey = `${prefix}|${limit}`;
  if (prefix === 'tischphoto:' && kvListCache.has(cacheKey)) return kvListCache.get(cacheKey);
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/kv_store?key=like.${encodeURIComponent(prefix)}*&select=key,value,updated_at&order=updated_at.desc&limit=${limit}`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) return [];
    const rows = await res.json();
    if (prefix === 'tischphoto:') kvListCache.set(cacheKey, rows);
    return rows;
  } catch { return []; }
}
async function safeListPrefixOldest(prefix, limit = 2000) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/kv_store?key=like.${encodeURIComponent(prefix)}*&select=key,value,updated_at&order=updated_at.asc&limit=${limit}`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch { return []; }
}
async function safeDeleteKey(key) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/kv_store?key=eq.${encodeURIComponent(key)}`, {
      method: 'DELETE',
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, Prefer: 'return=representation' },
    });
    if (!res.ok) return false;
    kvCache.delete(key);
    const body = await res.json().catch(() => []);
    return Array.isArray(body) && body.length > 0;
  } catch { return false; }
}
async function cleanupOldOrders() {
  try {
    if (sessionStorage.getItem('bk_cleanup_done')) return;
    sessionStorage.setItem('bk_cleanup_done', '1');
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const cutoff48h = Date.now() - 48 * 60 * 60 * 1000;
    const [orders, groups, visits] = await Promise.all([
      safeListPrefixOldest('order:', 2000),
      safeListPrefixOldest('grouporder:', 2000),
      safeListPrefixOldest('analytics:', 5000),
    ]);
    const staleOrders = orders.filter((r) => !r.value?.createdAt || r.value.createdAt < todayStart.getTime());
    const staleGroups = groups.filter((r) => {
      const ts = r.value?.createdAt || (r.updated_at ? new Date(r.updated_at).getTime() : 0);
      return !ts || ts < cutoff48h;
    });
    const staleVisits = visits.filter((r) => {
      const ts = r.value?.ts || (r.updated_at ? new Date(r.updated_at).getTime() : 0);
      return !ts || ts < todayStart.getTime();
    });
    await Promise.all([...staleOrders, ...staleGroups, ...staleVisits].map((r) => safeDeleteKey(r.key)));
  } catch {}
}
const NOTIFY_BEEP_URI = 'data:audio/wav;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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';
function makeShortCode(len = 5) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = ''; for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
function makeNumericCode(len = 4) {
  let out = ''; for (let i = 0; i < len; i++) out += Math.floor(Math.random() * 10);
  return out;
}
function wrapCanvasText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  words.forEach((w) => {
    const test = cur ? cur + ' ' + w : w;
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  });
  if (cur) lines.push(cur);
  return lines;
}
async function generateReceiptImage({ items, total, code, name, pickupTime, note, t }) {
  const W = 640;
  const PAD = 36;
  const scale = 2;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // measure height first with a dry run
  const measure = () => {
    let y = 0;
    y += 150; // header
    y += 70; // code box
    y += 36; // items title
    items.forEach((it) => {
      ctx.font = '600 20px -apple-system, Segoe UI, Arial';
      const nameLines = wrapCanvasText(ctx, `${it.qty}x ${it.name}`, W - PAD * 2 - 90);
      y += nameLines.length * 26 + 10;
    });
    y += 30; // dashed line
    y += 50; // total row
    if (pickupTime) y += 34;
    if (name) y += 30;
    if (note) y += 30 + 20;
    y += 60; // footer
    return y;
  };
  ctx.font = '600 20px -apple-system, Segoe UI, Arial';
  const H = Math.max(500, measure());

  canvas.width = W * scale;
  canvas.height = H * scale;
  ctx.scale(scale, scale);

  // background
  ctx.fillStyle = '#FFF6EA';
  ctx.fillRect(0, 0, W, H);

  // header band
  ctx.fillStyle = '#153826';
  ctx.fillRect(0, 0, W, 130);
  ctx.fillStyle = '#FFC738';
  ctx.font = '900 26px -apple-system, Segoe UI, Arial';
  ctx.textAlign = 'center';
  ctx.fillText('🥙 BODRUM KEBAP', W / 2, 55);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 15px -apple-system, Segoe UI, Arial';
  ctx.fillText('VECHTA · Oyther Straße 37', W / 2, 82);
  ctx.font = '600 13px -apple-system, Segoe UI, Arial';
  ctx.fillStyle = '#d9cdb4';
  const now = new Date();
  ctx.fillText(now.toLocaleDateString('de-DE') + '  ·  ' + now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }), W / 2, 105);

  let y = 150;

  // code box
  ctx.fillStyle = '#153826';
  const boxH = 56;
  const r = 14;
  ctx.beginPath();
  ctx.moveTo(PAD + r, y);
  ctx.arcTo(W - PAD, y, W - PAD, y + boxH, r);
  ctx.arcTo(W - PAD, y + boxH, PAD, y + boxH, r);
  ctx.arcTo(PAD, y + boxH, PAD, y, r);
  ctx.arcTo(PAD, y, W - PAD, y, r);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#a4906c';
  ctx.textAlign = 'left';
  ctx.font = '700 11px -apple-system, Segoe UI, Arial';
  ctx.fillStyle = '#FFC738';
  ctx.fillText('BESTELLCODE', PAD + 18, y + 24);
  ctx.font = '900 24px -apple-system, Segoe UI, Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(code, PAD + 18, y + 46);
  y += boxH + 30;

  // items title
  ctx.fillStyle = '#153826';
  ctx.font = '800 14px -apple-system, Segoe UI, Arial';
  ctx.textAlign = 'left';
  ctx.fillText('BESTELLUNG', PAD, y);
  y += 22;
  ctx.strokeStyle = '#e3d5bd';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke();
  y += 20;

  items.forEach((it) => {
    ctx.font = '600 15px -apple-system, Segoe UI, Arial';
    ctx.fillStyle = '#153826';
    ctx.textAlign = 'left';
    const nameLines = wrapCanvasText(ctx, `${it.qty}x ${it.name}`, W - PAD * 2 - 90);
    nameLines.forEach((ln, i) => {
      ctx.fillText(ln, PAD, y + i * 22);
    });
    ctx.textAlign = 'right';
    ctx.fillStyle = '#E65A0A';
    ctx.font = '700 15px -apple-system, Segoe UI, Arial';
    ctx.fillText(fmt(it.price), W - PAD, y);
    y += nameLines.length * 22 + 12;
  });

  y += 6;
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = '#c9b896';
  ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke();
  ctx.setLineDash([]);
  y += 32;

  ctx.textAlign = 'left';
  ctx.font = '800 17px -apple-system, Segoe UI, Arial';
  ctx.fillStyle = '#153826';
  ctx.fillText('GESAMT', PAD, y);
  ctx.textAlign = 'right';
  ctx.font = '900 22px -apple-system, Segoe UI, Arial';
  ctx.fillStyle = '#153826';
  ctx.fillText(fmt(total), W - PAD, y);
  y += 28;

  if (pickupTime) {
    ctx.textAlign = 'left';
    ctx.font = '600 14px -apple-system, Segoe UI, Arial';
    ctx.fillStyle = '#7c6d55';
    ctx.fillText(`🕐 Abholzeit: ${pickupTime}`, PAD, y);
    y += 26;
  }
  if (name) {
    ctx.textAlign = 'left';
    ctx.font = '600 14px -apple-system, Segoe UI, Arial';
    ctx.fillStyle = '#7c6d55';
    ctx.fillText(`👤 ${name}`, PAD, y);
    y += 22;
  }
  if (note) {
    ctx.textAlign = 'left';
    ctx.font = '600 13px -apple-system, Segoe UI, Arial';
    ctx.fillStyle = '#7c6d55';
    const noteLines = wrapCanvasText(ctx, `📝 ${note}`, W - PAD * 2);
    noteLines.forEach((ln, i) => ctx.fillText(ln, PAD, y + i * 18));
    y += noteLines.length * 18 + 16;
  }

  y += 20;
  ctx.textAlign = 'center';
  ctx.font = '700 13px -apple-system, Segoe UI, Arial';
  ctx.fillStyle = '#a4906c';
  ctx.fillText('Vielen Dank für deine Bestellung! 🙏', W / 2, y);
  ctx.font = '600 11px -apple-system, Segoe UI, Arial';
  ctx.fillText('bodrumkebapvechta.de', W / 2, y + 20);

  return canvas.toDataURL('image/png');
}
function logVisit(lang) {
  try {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    if (localStorage.getItem('bk_visit_day') === today) return;
    localStorage.setItem('bk_visit_day', today);
    const device = window.innerWidth < 768 ? 'mobile' : 'desktop';
    const key = `analytics:${Date.now()}-${makeShortCode(4)}`;
    safeSet(key, { ts: Date.now(), lang, device });
  } catch {}
}
function useLiveViewerCount() {
  const [count, setCount] = useState(1);
  const sessionIdRef = useRef(null);
  useEffect(() => {
    if (!sessionIdRef.current) {
      let sid = null;
      try { sid = sessionStorage.getItem('bk_session_id'); } catch {}
      if (!sid) { sid = makeShortCode(8); try { sessionStorage.setItem('bk_session_id', sid); } catch {} }
      sessionIdRef.current = sid;
    }
    const beat = () => safeSet(`heartbeat:${sessionIdRef.current}`, { ts: Date.now() });
    beat();
    const beatInterval = setInterval(beat, 25000);
    const readCount = async () => {
      try {
        const rows = await safeListPrefix('heartbeat:', 300);
        const active = rows.filter((r) => Date.now() - r.value.ts < 90000).length;
        setCount(Math.max(1, active));
      } catch {}
    };
    readCount();
    const readInterval = setInterval(readCount, 20000);
    return () => { clearInterval(beatInterval); clearInterval(readInterval); };
  }, []);
  return count;
}

async function sendPushNotification(title, message, url) {
  try {
    await fetch('/api/send-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, message, url }),
    });
  } catch {}
}
async function sendOwnerPushNotification(title, message, url) {
  try {
    await fetch('/api/send-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, message, url, targetOwner: true }),
    });
  } catch {}
}
async function isPushTriggerEnabled(key) {
  try {
    const t = await safeGet('siteconfig:pushTriggers');
    if (!t || t[key] === undefined) return true; // Standard: an
    return !!t[key];
  } catch { return true; }
}
async function fireIfEnabled(key, title, message, url) {
  if (await isPushTriggerEnabled(key)) await sendPushNotification(title, message, url);
}

function logEvent(eventType, extra) {
  try {
    const key = `analytics:${Date.now()}-${makeShortCode(4)}`;
    safeSet(key, { ts: Date.now(), event: eventType, ...(extra || {}) });
  } catch {}
}
async function incrementCategoryClick(catKey) {
  try {
    const counts = (await safeGet('analytics:categoryCounts')) || {};
    counts[catKey] = (counts[catKey] || 0) + 1;
    await safeSet('analytics:categoryCounts', counts);
  } catch {}
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
  const { t, go, lang, setLang } = React.useContext(LangContext);
  const [globalNavOpen, setGlobalNavOpen] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 px-5 pt-6 pb-4">
      <div className="flex items-center gap-3">
        <button onClick={onHome} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: dark ? 'rgba(255,246,234,0.12)' : '#f0e5cf' }}>
          <ArrowLeft size={18} color={dark ? CREAM : GREEN} />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: ORANGE }}>
            <img src={LOGO_ICON} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-extrabold text-sm leading-tight tracking-wide" style={{ color: dark ? '#fff' : GREEN }}>BODRUM KEBAP</div>
            <div className="text-[10px] font-semibold tracking-[0.2em]" style={{ color: GOLD }}>{title}</div>
          </div>
        </div>
      </div>
      <div className="relative flex-shrink-0">
        <button onClick={() => setGlobalNavOpen((v) => !v)} className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, boxShadow: '0 4px 14px rgba(230,90,10,.45)' }}>
          {globalNavOpen ? <X size={19} color="#fff" /> : <MenuIcon size={19} color="#fff" />}
        </button>
        {globalNavOpen && (
          <>
            <div className="fixed inset-0" style={{ zIndex: 199 }} onClick={() => setGlobalNavOpen(false)} />
            <div className="absolute top-11 right-0 w-56 rounded-2xl py-2" style={{ background: GREEN, boxShadow: '0 12px 30px rgba(21,56,38,.4)', zIndex: 200, animation: 'modalCardUp .25s cubic-bezier(.25,.46,.45,.94)' }}>
              <button onClick={() => { setGlobalNavOpen(false); go('home'); }} className="w-full text-left px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('backToHomeBtn')}</button>
              {ORDERING_ENABLED ? <button onClick={() => { setGlobalNavOpen(false); go('whatsapp'); }} className="w-full text-left px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('navMenu')}</button> : <button onClick={() => { setGlobalNavOpen(false); go('tischmenu'); }} className="w-full text-left px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('navMenu')}</button>}
              {ORDERING_ENABLED && <button onClick={() => { setGlobalNavOpen(false); go('group'); }} className="w-full text-left px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('titleGroup')}</button>}
              {ORDERING_ENABLED && <button onClick={() => { setGlobalNavOpen(false); go('track'); }} className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2" style={{ color: '#d9cdb4' }}><Timer size={15} /> {t('navTrackOrder')}</button>}
              <button onClick={() => { setGlobalNavOpen(false); go('staff'); }} className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2" style={{ color: '#d9cdb4' }}><Lock size={14} /> {t('navStaffArea')}</button>
              <a href="https://instagram.com/BodrumKebapVechta" target="_blank" rel="noopener noreferrer" onClick={() => setGlobalNavOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}><Instagram size={15} /> Instagram</a>
              <div className="px-4 py-2.5" style={{ borderTop: '1px solid rgba(255,246,234,.12)' }}>
                <LanguageSwitcher lang={lang} setLang={setLang} dark />
              </div>
            </div>
          </>
        )}
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
  kebap: '🥙', pizza: '🍕', pizzabrot: '🥖', calzone: '🥟', baguette: '🥖', ueberbacken: '🧀',
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
  { id: 'extra-brot', name: 'Brot', price: 1.0, emoji: '🍞' },
];
const UPSELL_DRINKS = (MENU.find((m) => m.key === 'getraenke')?.items || []).map((d) => ({ id: d.id, name: d.name, price: d.price, emoji: '🥤', img: d.img, imgContain: d.imgContain }));
const UPSELL_ITEMS_POOL = [...UPSELL_FOOD, ...UPSELL_DRINKS];
const SURPRISE_CATEGORIES = ['kebap', 'pizza', 'calzone', 'baguette', 'ueberbacken', 'rollo', 'nudeln', 'schnitzel', 'salat'];
function buildSurpriseItems(effectiveMenu) {
  return effectiveMenu.filter((cat) => SURPRISE_CATEGORIES.includes(cat.key)).flatMap((cat) => cat.items
    .filter((i) => !i.customPizza && !i.customPasta)
    .map((i) => ({
      id: i.id,
      name: i.name,
      price: i.priceLarge !== undefined ? i.priceLarge : i.price,
      img: i.img,
      imgContain: i.imgContain,
      weekend: i.weekend || false,
      cat: cat.key,
      desc: i.desc || '',
      soldOut: i.soldOut || false,
      alg: i.alg || '',
    })));
}
const SURPRISE_ITEMS = buildSurpriseItems(MENU);
const CATEGORY_UPSELL_RECS = {
  kebap: ['g305', 'g301'],
  pizza: ['g301', 'f204a'],
  pizzabrot: ['f204a', 'g301'],
  calzone: ['g301', 'f204b'],
  baguette: ['g306', 'g301'],
  ueberbacken: ['g301', 'f204a'],
  rollo: ['g301', 'g305'],
  nudeln: ['g306', 'g301'],
  schnitzel: ['g301', 'f204a'],
  salat: ['g306', 'g301'],
  finger: ['f204a', 'g301'],
};
const UPSELL_ITEMS = [...UPSELL_FOOD, ...UPSELL_DRINKS];

function UpsellStrip({ addItem, lang }) {
  return (
    <div className="mx-5 mt-1 mb-3 rounded-xl overflow-hidden" style={{ background: '#fdecd4', border: '1px solid #f0d4a8' }}>
      <div className="px-3.5 pt-2.5 text-[11px] font-black tracking-wide" style={{ color: '#8a5a1f' }}>🔥 DAZU PASST PERFEKT — nicht vergessen!</div>
      <div className="flex gap-2 overflow-x-auto px-3.5 pb-3 pt-1.5">
        {UPSELL_ITEMS.map((u) => (
          <button
            key={u.id}
            onClick={() => addItem(u.id, mx(u.name, lang), u.price, u.name)}
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

function ReceiptView({ snapshot, onClose }) {
  const { t } = React.useContext(LangContext);
  const [busy, setBusy] = useState(false);
  const download = async () => {
    setBusy(true);
    try {
      const dataUrl = await generateReceiptImage(snapshot);
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `bestellung-${snapshot.code}.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Bestellung', text: `Bodrum Kebap Vechta · ${snapshot.code}` });
      } else {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `bestellung-${snapshot.code}.png`;
        a.click();
      }
    } catch {}
    setBusy(false);
  };
  const now = new Date();
  return (
    <ConfigModal onClose={onClose}>
      <div className="p-5">
        <div className="rounded-2xl overflow-hidden" style={{ background: '#FFF6EA', boxShadow: '0 8px 24px rgba(21,56,38,.12)' }}>
          <div className="text-center py-6 px-5" style={{ background: GREEN }}>
            <div className="font-black text-xl" style={{ color: GOLD }}>🥙 BODRUM KEBAP</div>
            <div className="text-xs font-bold mt-1" style={{ color: '#fff' }}>VECHTA · Oyther Straße 37</div>
            <div className="text-[11px] font-semibold mt-2" style={{ color: '#d9cdb4' }}>{now.toLocaleDateString('de-DE')} · {now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
          <div className="p-5">
            <div className="rounded-xl p-3.5 mb-4" style={{ background: GREEN }}>
              <div className="text-[10px] font-bold tracking-widest" style={{ color: GOLD }}>BESTELLCODE</div>
              <div className="font-black text-xl" style={{ color: '#fff' }}>{snapshot.code}</div>
            </div>
            <div className="text-[11px] font-black tracking-widest mb-2" style={{ color: GREEN }}>BESTELLUNG</div>
            <div style={{ borderTop: '1px solid #e3d5bd' }} className="pt-3 flex flex-col gap-2">
              {snapshot.items.map((it, i) => (
                <div key={i} className="flex items-start justify-between gap-3 text-sm">
                  <span className="font-semibold" style={{ color: GREEN }}>{it.qty}x {it.name}</span>
                  <span className="font-bold flex-shrink-0" style={{ color: ORANGE }}>{fmt(it.price)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px dashed #c9b896' }} className="mt-4 pt-4 flex items-center justify-between">
              <span className="font-black text-base" style={{ color: GREEN }}>GESAMT</span>
              <span className="font-black text-xl" style={{ color: GREEN }}>{fmt(snapshot.total)}</span>
            </div>
            {snapshot.pickupTime && <div className="text-xs font-semibold mt-3" style={{ color: '#7c6d55' }}>🕐 Abholzeit: {snapshot.pickupTime}</div>}
            {snapshot.name && <div className="text-xs font-semibold mt-1.5" style={{ color: '#7c6d55' }}>👤 {snapshot.name}</div>}
            {snapshot.note && <div className="text-xs font-semibold mt-1.5" style={{ color: '#7c6d55' }}>📝 {snapshot.note}</div>}
            <div className="text-center mt-5">
              <div className="text-xs font-bold" style={{ color: '#a4906c' }}>Vielen Dank für deine Bestellung! 🙏</div>
              <div className="text-[10px] font-semibold mt-1" style={{ color: '#a4906c' }}>bodrumkebapvechta.de</div>
            </div>
          </div>
        </div>
        <button onClick={download} disabled={busy} className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white disabled:opacity-50" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>
          <span className="text-base">⬇️</span> {busy ? '…' : t('downloadReceiptBtn')}
        </button>
      </div>
    </ConfigModal>
  );
}
function ConfigModal({ onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: 'rgba(21,56,38,.55)', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)', zIndex: 150, animation: 'modalBgFade .35s ease' }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto"
        style={{ animation: 'modalCardUp .4s cubic-bezier(.25,.46,.45,.94)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

function CartPopEmoji({ trigger }) {
  const { t } = React.useContext(LangContext);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!trigger) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, [trigger]);
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed left-1/2 top-6 flex items-center gap-3 pl-3 pr-5 py-3 rounded-2xl overflow-hidden" style={{ zIndex: 300, transform: 'translateX(-50%)', background: `linear-gradient(135deg, ${GREEN}, #1d4530)`, border: `1px solid rgba(255,199,56,.35)`, boxShadow: '0 16px 40px rgba(21,56,38,.5), 0 0 0 1px rgba(255,199,56,.08)', animation: 'toastSlide 1.9s cubic-bezier(.22,1,.36,1) forwards' }}>
      <span className="absolute inset-0" style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(255,199,56,.14) 50%, transparent 70%)', animation: 'toastSheen 1.9s ease forwards' }} />
      <span className="relative w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${GOLD}, #ffb020)`, boxShadow: '0 0 0 4px rgba(255,199,56,.15)', animation: 'checkPop .5s cubic-bezier(.34,1.56,.64,1) .1s both' }}>
        <Check size={16} color={GREEN} strokeWidth={3.5} />
      </span>
      <span className="relative text-sm font-bold text-white whitespace-nowrap tracking-wide">{t('itemAddedToast')}</span>
      <span className="relative text-base" style={{ animation: 'sparkleFloat 1.9s ease forwards' }}>✨</span>
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
const VECHTA_LAT = 52.727, VECHTA_LON = 8.273;
let weatherCache = { data: null, fetchedAt: 0 };

function getWeatherEffect(code, isDay, windKmh) {
  const lightCodes = [51, 53, 56, 61, 80];
  const moderateCodes = [55, 57, 63, 66, 81];
  const heavyCodes = [65, 67, 82];
  const stormCodes = [95, 96, 99];
  const snowCodes = [71, 73, 75, 77, 85, 86];
  let type = 'none', intensity = 'moderate', storm = false;
  if (stormCodes.includes(code)) { type = 'rain'; intensity = 'heavy'; storm = true; }
  else if (heavyCodes.includes(code)) { type = 'rain'; intensity = 'heavy'; }
  else if (moderateCodes.includes(code)) { type = 'rain'; intensity = 'moderate'; }
  else if (lightCodes.includes(code)) { type = 'rain'; intensity = 'light'; }
  else if (snowCodes.includes(code)) { type = 'snow'; intensity = 'moderate'; }
  else if (code === 0 && isDay) { type = 'sun'; }
  const windy = typeof windKmh === 'number' && windKmh >= 25;
  return { type, intensity, storm, windy, windKmh: windKmh ?? null };
}

// Von mehreren Komponenten gemeinsam genutzt (Regen-/Schnee-Effekt UND
// Windschwanken der Buttons) — ein einziger Fetch für alle, dank des
// modulweiten Caches (5 Minuten frisch, damit sich das Wetter zeitnah
// aktualisiert statt 20 Minuten lang veraltet zu bleiben).
function useWeather() {
  const [data, setData] = useState(weatherCache.data);
  useEffect(() => {
    const fresh = weatherCache.data && Date.now() - weatherCache.fetchedAt < 1 * 60 * 1000;
    if (fresh) { setData(weatherCache.data); return; }
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${VECHTA_LAT}&longitude=${VECHTA_LON}&current=weather_code,is_day,wind_speed_10m&timezone=Europe%2FBerlin`)
      .then((r) => r.json())
      .then((d) => {
        const eff = getWeatherEffect(d?.current?.weather_code, d?.current?.is_day === 1, d?.current?.wind_speed_10m);
        weatherCache = { data: eff, fetchedAt: Date.now() };
        setData(eff);
      })
      .catch(() => {});
  }, []);
  return data;
}

function WeatherEffect() {
  const weather = useWeather();
  const effect = weather?.type || null;
  const intensity = weather?.intensity || 'moderate';
  const storm = !!weather?.storm;
  const scale = intensity === 'light' ? 0.5 : intensity === 'heavy' ? 1.7 : 1;
  const speedMul = intensity === 'light' ? 1.3 : intensity === 'heavy' ? 0.7 : 1;

  const rainDrops = React.useMemo(() => Array.from({ length: Math.round(28 * scale) }).map(() => ({
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: (0.7 + Math.random() * 0.5) * speedMul,
    height: 14 + Math.random() * 16,
    opacity: (0.15 + Math.random() * 0.2) * (intensity === 'heavy' ? 1.4 : 1),
  })), [scale, speedMul, intensity]);
  const splashes = React.useMemo(() => Array.from({ length: Math.round(10 * scale) }).map(() => ({
    left: Math.random() * 100,
    top: 55 + Math.random() * 42,
    delay: Math.random() * 4,
    duration: (2.2 + Math.random() * 1.8) * speedMul,
  })), [scale, speedMul]);
  const snowFlakes = React.useMemo(() => Array.from({ length: 32 }).map(() => ({
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 8,
    size: 3 + Math.random() * 4,
    drift: (Math.random() - 0.5) * 60,
    opacity: 0.4 + Math.random() * 0.4,
  })), []);

  if (!effect || effect === 'none') return null;

  const content = (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 200 }}>
      <style>{`
        @keyframes weatherRainFall { 0%{ transform: translateY(-8vh); opacity:0; } 8%{ opacity:1; } 92%{ opacity:1; } 100%{ transform: translateY(108vh); opacity:0; } }
        @keyframes weatherSplash { 0%{ transform: scale(0); opacity:.55; } 70%{ opacity:.15; } 100%{ transform: scale(2.6); opacity:0; } }
        @keyframes weatherSnowFall { 0%{ transform: translateY(-6vh) translateX(0); opacity:0; } 8%{ opacity: var(--op); } 92%{ opacity: var(--op); } 100%{ transform: translateY(106vh) translateX(var(--drift)); opacity:0; } }
        @keyframes weatherSunSweep { 0%{ transform: translateX(-40%) translateY(-20%) rotate(18deg); } 100%{ transform: translateX(40%) translateY(20%) rotate(18deg); } }
        @keyframes weatherLightning { 0%, 92%, 100% { opacity: 0; } 93% { opacity: .55; } 94% { opacity: .1; } 95% { opacity: .4; } 96% { opacity: 0; } }
      `}</style>

      {storm && (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,14,22,.22)' }} />
          <div style={{ position: 'absolute', inset: 0, background: '#fff', animation: 'weatherLightning 7s ease-in-out infinite' }} />
        </>
      )}

      {effect === 'rain' && rainDrops.map((d, i) => (
        <div key={i} style={{
          position: 'absolute', top: 0, left: `${d.left}%`, width: 1.5, height: d.height,
          background: `linear-gradient(180deg, transparent, rgba(210,230,255,${d.opacity}))`,
          animation: `weatherRainFall ${d.duration}s linear ${d.delay}s infinite`,
        }} />
      ))}
      {effect === 'rain' && splashes.map((s, i) => (
        <div key={`sp${i}`} style={{
          position: 'absolute', left: `${s.left}%`, top: `${s.top}%`, width: 10, height: 10,
          borderRadius: '50%', border: '1px solid rgba(210,230,255,.35)',
          animation: `weatherSplash ${s.duration}s ease-out ${s.delay}s infinite`,
        }} />
      ))}

      {effect === 'snow' && snowFlakes.map((f, i) => (
        <div key={i} style={{
          position: 'absolute', top: 0, left: `${f.left}%`, width: f.size, height: f.size,
          borderRadius: '50%', background: '#fff', filter: 'blur(.3px)',
          animation: `weatherSnowFall ${f.duration}s linear ${f.delay}s infinite`,
          '--drift': `${f.drift}px`, '--op': f.opacity,
        }} />
      ))}

      {effect === 'sun' && (
        <div style={{
          position: 'absolute', top: '-30%', left: '-20%', width: '160%', height: '80%',
          background: 'linear-gradient(100deg, transparent 40%, rgba(255,235,180,.10) 48%, rgba(255,245,210,.16) 50%, rgba(255,235,180,.10) 52%, transparent 60%)',
          animation: 'weatherSunSweep 14s ease-in-out infinite alternate',
        }} />
      )}
    </div>
  );
  return ReactDOM.createPortal(content, document.body);
}

function SplashScreen({ onDone }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 150);
    const t2 = setTimeout(() => setStage(2), 750);
    const t3 = setTimeout(() => setStage(3), 1350);
    const t4 = setTimeout(() => onDone(), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  const embers = React.useMemo(() => [
    ...Array.from({ length: 14 }).map(() => ({
      left: 8 + Math.random() * 84,
      delay: Math.random() * 2.2,
      duration: 2.2 + Math.random() * 1.6,
      drift: (Math.random() - 0.5) * 60,
      size: 3 + Math.random() * 4,
    })),
    ...Array.from({ length: 8 }).map(() => ({
      left: 38 + Math.random() * 24,
      delay: Math.random() * 1.6,
      duration: 1.6 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 30,
      size: 2.5 + Math.random() * 3,
    })),
  ], []);

  return (
    <div className="min-h-screen w-full flex justify-center items-center relative overflow-hidden" style={{ background: `radial-gradient(ellipse at 50% 100%, rgba(230,90,10,.35), transparent 60%), linear-gradient(180deg, #0a1a10, ${GREEN})` }} onClick={onDone}>
      <style>{`
        @keyframes ignite { 0%{ transform:scale(.15); opacity:0; filter:brightness(3.5); box-shadow:0 0 0 0 rgba(255,140,0,0); } 45%{ transform:scale(1.18); opacity:1; filter:brightness(2); box-shadow:0 0 70px 24px rgba(255,140,0,.75); } 100%{ transform:scale(1); opacity:1; filter:brightness(1); box-shadow:0 0 34px 8px rgba(255,140,0,.45); } }
        @keyframes flarePulse { 0%,100%{ box-shadow:0 0 34px 8px rgba(255,140,0,.45);} 50%{ box-shadow:0 0 44px 14px rgba(255,180,60,.55);} }
        @keyframes riseFade { 0%{ transform:translateY(16px); opacity:0; } 100%{ transform:translateY(0); opacity:1; } }
        @keyframes shimmerBar { 0%{ background-position:-200px 0;} 100%{ background-position:200px 0;} }
        @keyframes emberFloat { 0%{ transform:translateY(0) translateX(0); opacity:0; } 12%{ opacity:1; } 100%{ transform:translateY(-360px) translateX(var(--drift)); opacity:0; } }
      `}</style>

      {embers.map((e, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', bottom: 0, left: `${e.left}%`,
            width: e.size, height: e.size, borderRadius: '50%',
            background: i % 2 === 0 ? GOLD : ORANGE,
            boxShadow: `0 0 6px 2px ${i % 2 === 0 ? 'rgba(255,199,56,.8)' : 'rgba(230,90,10,.8)'}`,
            animation: `emberFloat ${e.duration}s ease-in ${e.delay}s infinite`,
            '--drift': `${e.drift}px`,
          }}
        />
      ))}

      <div className="flex flex-col items-center px-8 text-center relative">
        <div
          className="rounded-full flex items-center justify-center mb-6"
          style={{
            width: 108, height: 108, background: `linear-gradient(135deg, ${CREAM}, #fff)`,
            animation: stage >= 1 ? 'ignite .8s cubic-bezier(.22,1,.36,1) forwards, flarePulse 2s ease-in-out .8s infinite' : 'none',
            opacity: stage >= 1 ? 1 : 0,
          }}
        >
          <img src={LOGO_ICON} alt="logo" style={{ width: 78, height: 78, objectFit: 'contain' }} />
        </div>
        <div style={{ opacity: stage >= 2 ? 1 : 0, animation: stage >= 2 ? 'riseFade .6s ease forwards' : 'none' }}>
          <div className="text-white font-black text-2xl tracking-wide">BODRUM KEBAP</div>
          <div className="font-bold text-sm tracking-[4px] mt-1" style={{ color: GOLD }}>VECHTA</div>
        </div>
      </div>
    </div>
  );
}

/* ============ HOME ============ */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}s, transform .7s cubic-bezier(.22,1,.36,1) ${delay}s` }}>
      {children}
    </div>
  );
}

function CountUp({ to, decimals = 0, suffix = '', duration = 1400 }) {
  const ref = React.useRef(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          setVal(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, started]);
  return <span ref={ref}>{val.toFixed(decimals).replace('.', ',')}{suffix}</span>;
}

function FeatureCard({ icon, title, sub, color, textColor = '#fff', onClick, index = 0, img }) {
  return (
    <button
      onClick={onClick}
      className="feature-card relative overflow-hidden text-left rounded-2xl p-6 flex flex-col gap-3"
      style={{
        background: color, boxShadow: '0 10px 30px rgba(21,56,38,.14)',
        animation: `cardIn .6s cubic-bezier(.22,1,.36,1) ${index * 0.12}s both`,
      }}
    >
      {img && <img src={img} className="feature-card-bg absolute inset-0 w-full h-full object-cover" style={{ opacity: .08, transition: 'opacity .3s ease, transform .3s ease' }} />}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl icon-wobble relative" style={{ background: 'rgba(255,255,255,0.2)' }}>{icon}</div>
      <div className="relative">
        <div className="font-black text-lg leading-tight" style={{ color: textColor }}>{title}</div>
        <div className="text-sm font-medium mt-1" style={{ color: textColor, opacity: 0.85 }}>{sub}</div>
      </div>
      <div className="flex items-center gap-1.5 text-sm font-bold mt-1 relative" style={{ color: textColor }}>Los geht's <ArrowRight size={15} /></div>
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
  const [rating, setRating] = useState({ score: 4.6, count: 293 });
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 4000);
    safeGet('siteconfig:rating').then((r) => { if (r && r.score) setRating(r); });
    return () => clearInterval(t);
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-10 py-12">
      <div className="rounded-2xl p-8 sm:p-10 text-center" style={{ background: '#fff', boxShadow: '0 10px 30px rgba(21,56,38,.1)' }}>
        <div className="flex items-center justify-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={19} fill={GOLD} color={GOLD} />))}
        </div>
        <div className="font-black text-sm mb-6" style={{ color: GREEN }}><CountUp to={rating.score} decimals={1} /> · <CountUp to={rating.count} /> Google-Bewertungen</div>
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
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

// Ab dem 8. September 2026 (inklusive) haben wir auch dienstags geöffnet —
// diese eine Funktion steuert das überall im Code. Kein manueller Eingriff
// mehr nötig, sobald das Datum erreicht ist, schaltet alles automatisch um.
function isTuesdayOpenNow(now) {
  const cutoff = new Date(2026, 8, 8); // Monat ist 0-indiziert: 8 = September
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return d >= cutoff;
}

function getOpenStatus(now) {
  const day = now.getDay(); // 0 Sun ... 2 Tue
  const nextOpenAt = (daysAhead) => { const d = new Date(now); d.setDate(d.getDate() + daysAhead); d.setHours(11, 30, 0, 0); return d; };
  if (day === 2 && !isTuesdayOpenNow(now)) return { open: false, labelKey: 'statusClosedRestDay', nextOpen: nextOpenAt(1) };
  const h = now.getHours() + now.getMinutes() / 60;
  if (h >= 11.5 && h < 22) {
    if (h >= 21.5) return { open: true, soon: true, labelKey: 'statusClosingSoon' };
    return { open: true, labelKey: 'statusOpenNow' };
  }
  if (h < 11.5) {
    if (h >= 11.0) return { open: false, soon: true, labelKey: 'statusOpeningSoon', nextOpen: nextOpenAt(0) };
    return { open: false, labelKey: 'statusNotYetOpen', nextOpen: nextOpenAt(0) };
  }
  return { open: false, labelKey: 'statusClosed', nextOpen: nextOpenAt(day === 1 && !isTuesdayOpenNow(now) ? 2 : 1) };
}
function formatCountdown(ms) {
  if (ms <= 0) return '0s';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (h > 0) return `${h}h ${m}m`;
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}m ${s}s`;
}
function formatElapsedMMSS(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
function parsePickupTimeToday(pickupTimeStr) {
  const match = /^(\d{1,2}):(\d{2})$/.exec((pickupTimeStr || '').trim());
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (h > 23 || m > 59) return null;
  const target = new Date();
  target.setHours(h, m, 0, 0);
  return target;
}

function getGreeting(now) {
  const h = now.getHours();
  if (h < 5) return 'Noch wach? 🌙';
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
  { day: 2, items: [
    { name: 'Kalb Kebap', price: 8.0, desc: 'Fleisch vom Drehspieß, Salat & Soße nach Wahl', img: 'g1', cat: 'kebap' },
    { name: 'Pizza Salami', price: 8.0, desc: 'Tomatensoße, Mozzarella & Salami', img: 'g3', cat: 'pizza' },
  ]},
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
  { key: 'yaprak', label: 'Yaprak Döner', extra: 2.0 },
];
const DOENER_COMBO = { title: 'Dönerteller + Dose Getränk', price: 12.5, emoji: '🍽️' };
const PIZZA_COMBO_PRICE = 10.0;

function WeekendComboPromo({ go, top }) {
  const { t } = React.useContext(LangContext);
  const [openDoener, setOpenDoener] = useState(false);
  const [meat, setMeat] = useState('haehnchen');
  const [comboPhotos, setComboPhotos] = useState({ pizza: FOOD_G2, doener: DOENER_TELLER_IMG });
  useEffect(() => {
    safeGet('siteconfig:weekendComboPhotos').then((r) => {
      if (r) setComboPhotos({ pizza: r.pizza || FOOD_G2, doener: r.doener || DOENER_TELLER_IMG });
    });
  }, []);

  const confirmDoener = () => {
    if (!ORDERING_ENABLED) { go('tischmenu', { initialCatHint: 'kebap' }); return; }
    const opt = WEEKEND_MEAT_OPTIONS.find((m) => m.key === meat);
    const total = DOENER_COMBO.price + (opt?.extra || 0);
    go('whatsapp', { pendingCombo: { title: `${DOENER_COMBO.title} (${opt.label})`, price: total } });
  };
  const goToPizzaCombo = () => {
    if (!ORDERING_ENABLED) { go('tischmenu', { initialCatHint: 'pizza' }); return; }
    go('whatsapp', { pizzaComboMode: true });
  };

  if (top) {
    return (
      <section id="tagesempfehlung" className="py-4" style={{ background: `linear-gradient(100deg, ${CHILI}, ${ORANGE})`, boxShadow: '0 6px 20px rgba(214,40,40,.3)' }}>
        <div className="max-w-2xl mx-auto px-5">
          <div className="text-center mb-3">
            <span className="text-white font-black text-sm tracking-wide" style={{ textShadow: '0 2px 6px rgba(0,0,0,.25)' }}>🎉 {t('weekendOnlyToday')}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={goToPizzaCombo} className="rounded-2xl overflow-hidden text-left" style={{ background: '#fff', boxShadow: '0 10px 24px rgba(0,0,0,.28)', border: `2.5px solid ${GOLD}` }}>
              <div className="relative">
                <img src={comboPhotos.pizza} className="w-full object-cover" style={{ height: 100 }} />
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full font-black text-sm" style={{ background: GOLD, color: GREEN, boxShadow: '0 3px 8px rgba(0,0,0,.25)' }}>{fmt(PIZZA_COMBO_PRICE)}</div>
              </div>
              <div className="px-3 py-2.5">
                <div className="font-black text-sm leading-tight" style={{ color: GREEN }}>{t('weekendPizzaTitle')}</div>
              </div>
            </button>
            <button onClick={() => setOpenDoener((v) => !v)} className="rounded-2xl overflow-hidden text-left" style={{ background: '#fff', boxShadow: '0 10px 24px rgba(0,0,0,.28)', border: `2.5px solid ${GOLD}` }}>
              <div className="relative">
                <img src={comboPhotos.doener} className="w-full object-cover" style={{ height: 100 }} />
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full font-black text-sm" style={{ background: GOLD, color: GREEN, boxShadow: '0 3px 8px rgba(0,0,0,.25)' }}>{fmt(DOENER_COMBO.price)}</div>
              </div>
              <div className="px-3 py-2.5">
                <div className="font-black text-sm leading-tight" style={{ color: GREEN }}>{DOENER_COMBO.title}</div>
              </div>
            </button>
          </div>
          {openDoener && (
            <div className="mt-3 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,.97)', boxShadow: '0 10px 24px rgba(0,0,0,.25)' }}>
              <div className="text-xs font-bold mb-2.5" style={{ color: '#8a7c62' }}>{t('chooseMeat')}</div>
              <div className="flex flex-col gap-2 mb-3">
                {WEEKEND_MEAT_OPTIONS.map((m) => (
                  <button key={m.key} onClick={() => setMeat(m.key)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold" style={meat === m.key ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN }}>
                    <span>{m.label}</span>
                    <span>{m.extra > 0 ? `+${fmt(m.extra)}` : t('included')}</span>
                  </button>
                ))}
              </div>
              <button onClick={confirmDoener} className="w-full py-3 rounded-full font-bold text-sm text-white" style={{ background: CHILI, boxShadow: '0 6px 16px rgba(214,40,40,.35)' }}>
                {t('addToOrder')}
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="tagesempfehlung" className="max-w-7xl mx-auto px-5 lg:px-10 py-4">
      <div className="rounded-2xl overflow-hidden" style={{ background: `linear-gradient(120deg, ${CHILI}, ${ORANGE})`, boxShadow: '0 10px 30px rgba(214,40,40,.3)' }}>
        <div className="px-6 pt-7 pb-3 text-center">
          <div className="text-white font-black text-xs tracking-[4px] mb-1.5 animate-pulse">{t('weekendOnlyToday')}</div>
          <div className="text-white font-black text-3xl">{t('weekendOfferTitle')}</div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 p-5 pt-2 relative">

          {/* PIZZA CARD — leitet zur echten Pizza-Auswahl */}
          <div className="combo-card rounded-2xl overflow-hidden shadow-lg" style={{ background: '#fff' }}>
            <div className="relative">
              <img src={comboPhotos.pizza} className="w-full h-56 sm:h-64 object-cover" />
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
              <img src={comboPhotos.doener} className="w-full h-56 sm:h-64 object-cover" />
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
        <div className="pb-5 relative" />
      </div>
    </section>
  );
}

function WeekendTeaser({ go }) {
  const { t } = React.useContext(LangContext);
  return (
    <button onClick={() => go(ORDERING_ENABLED ? 'whatsapp' : 'tischmenu')} className="w-full flex items-center justify-center gap-2 flex-wrap text-center py-2.5 px-4 rounded-xl mt-3" style={{ background: '#fdecd4', border: '1px solid #f0d4a8' }}>
      <span className="text-xs font-black" style={{ color: '#8a5a1f' }}>{t('weekendTeaserOnly')}</span>
      <span className="text-xs font-semibold" style={{ color: '#8a5a1f' }}>28cm Pizza + {fmt(PIZZA_COMBO_PRICE)} · {DOENER_COMBO.title.split(' + ')[0]} + {fmt(DOENER_COMBO.price)}</span>
    </button>
  );
}

function StoppelmarktBanner() {
  const { t } = React.useContext(LangContext);
  const now = new Date();
  const start = new Date(2026, 7, 13, 0, 0, 0); // 13. August 2026 (Monat 0-indiziert: 7 = August)
  const end = new Date(2026, 7, 18, 23, 59, 59); // 18. August 2026
  if (now < start || now > end) return null;
  return (
    <div className="px-5 py-3 text-center" style={{ background: `linear-gradient(90deg, ${GOLD}, #ffdf8a, ${GOLD})`, animation: 'goldGlow 2.2s ease-in-out infinite' }}>
      <span className="font-black text-sm" style={{ color: GREEN }}>{t('stoppelmarktText')}</span>
    </div>
  );
}

const ALL_MENU_ITEMS = MENU.flatMap((cat) => cat.items.filter((i) => !i.customPizza && !i.customPasta).map((i) => ({ ...i, number: menuNum(i.id) })));
function formatItemPriceText(item) {
  if (item.priceLarge !== undefined) return `22cm ${fmt(item.priceSmall)} / 28cm ${fmt(item.priceLarge)}`;
  return fmt(item.price);
}

const ASSISTANT_R = {
  openYes: { de: "🟢 Ja, wir haben gerade geöffnet! Heute bis 22:00 Uhr. Dienstags haben wir Ruhetag.", en: "🟢 Yes, we're open right now! Today until 10:00 PM. We're closed on Tuesdays.", tr: "🟢 Evet, şu an açığız! Bugün 22:00'a kadar hizmet veriyoruz. Salı günleri kapalıyız.", ro: "🟢 Da, suntem deschiși acum! Astăzi până la ora 22:00. Marțea suntem închiși.", nl: "🟢 Ja, we zijn nu open! Vandaag tot 22:00 uur. Op dinsdag zijn we gesloten.", sq: "🟢 Po, jemi hapur tani! Sot deri në orën 22:00. Të martave jemi mbyllur.", ku: "🟢 Erê, em niha vekirî ne! Îro heta saet 22:00. Roja Sêşemê em girtî ne.", pl: "🟢 Tak, jesteśmy teraz otwarci! Dziś do 22:00. We wtorki mamy zamknięte." },
  openYesEveryDay: { de: "🟢 Ja, wir haben gerade geöffnet! Heute bis 22:00 Uhr. Wir haben jeden Tag geöffnet, auch dienstags!", en: "🟢 Yes, we're open right now! Today until 10:00 PM. We're open every day, including Tuesdays!", tr: "🟢 Evet, şu an açığız! Bugün 22:00'a kadar hizmet veriyoruz. Salı dahil her gün açığız!", ro: "🟢 Da, suntem deschiși acum! Astăzi până la ora 22:00. Suntem deschiși în fiecare zi, inclusiv marțea!", nl: "🟢 Ja, we zijn nu open! Vandaag tot 22:00 uur. We zijn elke dag geopend, ook op dinsdag!", sq: "🟢 Po, jemi hapur tani! Sot deri në orën 22:00. Jemi hapur çdo ditë, edhe të martave!", ku: "🟢 Erê, em niha vekirî ne! Îro heta saet 22:00. Em her roj vekirî ne, Sêşem jî tê de!", pl: "🟢 Tak, jesteśmy teraz otwarci! Dziś do 22:00. Jesteśmy otwarci codziennie, także we wtorki!" },
  openNoPrefix: { de: "🔴 Wir haben gerade geschlossen.", en: "🔴 We're currently closed.", tr: "🔴 Şu an kapalıyız.", ro: "🔴 Suntem închiși momentan.", nl: "🔴 We zijn nu gesloten.", sq: "🔴 Jemi mbyllur tani.", ku: "🔴 Em niha girtî ne.", pl: "🔴 Jesteśmy teraz zamknięci." },
  opensIn: { de: "Öffnet in", en: "Opens in", tr: "Açılışa", ro: "Se deschide în", nl: "Opent over", sq: "Hapet pas", ku: "Vedibe piştî", pl: "Otwieramy za" },
  openNoSuffix: { de: "Wir haben täglich von 11:30–22:00 Uhr geöffnet, außer dienstags.", en: "We're open daily 11:30 AM–10:00 PM, except Tuesdays.", tr: "Her gün 11:30–22:00 arası açığız, Salı hariç.", ro: "Suntem deschiși zilnic 11:30–22:00, cu excepția marțea.", nl: "We zijn dagelijks geopend van 11:30–22:00 uur, behalve dinsdag.", sq: "Jemi hapur çdo ditë 11:30–22:00, përveç të martave.", ku: "Em her roj saet 11:30–22:00 vekirî ne, ji xeynî Sêşemê.", pl: "Jesteśmy otwarci codziennie 11:30–22:00, oprócz wtorków." },
  openNoSuffixEveryDay: { de: "Wir haben täglich von 11:30–22:00 Uhr geöffnet, auch dienstags — keine Ruhetage mehr!", en: "We're open daily 11:30 AM–10:00 PM, including Tuesdays — no closed days anymore!", tr: "Her gün 11:30–22:00 arası açığız, Salı dahil — artık kapalı günümüz yok!", ro: "Suntem deschiși zilnic 11:30–22:00, inclusiv marțea — fără zile de închidere!", nl: "We zijn dagelijks geopend van 11:30–22:00 uur, ook op dinsdag — geen sluitingsdagen meer!", sq: "Jemi hapur çdo ditë 11:30–22:00, edhe të martave — nuk ka më ditë pushimi!", ku: "Em her roj saet 11:30–22:00 vekirî ne, Sêşem jî tê de — êdî roja girtî tune!", pl: "Jesteśmy otwarci codziennie 11:30–22:00, także we wtorki — nie ma już dni zamknięcia!" },
  address: { de: "📍 Oyther Straße 37, 49377 Vechta. Über das Menü oben findest du den Button \"Route\" für die direkte Wegbeschreibung.", en: "📍 Oyther Straße 37, 49377 Vechta. Use the \"Route\" button in the top menu for direct directions.", tr: "📍 Oyther Straße 37, 49377 Vechta. Üstteki menüden \"Rota\" butonuna basarsan direkt yol tarifi açılır.", ro: "📍 Oyther Straße 37, 49377 Vechta. Folosește butonul \"Rută\" din meniul de sus pentru indicații directe.", nl: "📍 Oyther Straße 37, 49377 Vechta. Gebruik de \"Route\"-knop in het menu bovenaan voor een directe routebeschrijving.", sq: "📍 Oyther Straße 37, 49377 Vechta. Përdor butonin \"Rruga\" në menynë sipër për udhëzime direkte.", ku: "📍 Oyther Straße 37, 49377 Vechta. Bişkoja \"Rê\" ya di menuya jorîn de bikar bîne bo rêberiyê.", pl: "📍 Oyther Straße 37, 49377 Vechta. Użyj przycisku \"Trasa\" w menu u góry, aby uzyskać wskazówki dojazdu." },
  phone: { de: "📞 04441 / 95 16 104 — tippe oben auf den gelben \"Anrufen\"-Button für einen Direktanruf.", en: "📞 04441 / 95 16 104 — tap the yellow \"Call\" button at the top to call directly.", tr: "📞 04441 / 95 16 104 — üstteki sarı \"Ara\" butonuna basarak direkt arayabilirsin.", ro: "📞 04441 / 95 16 104 — apasă butonul galben \"Sună\" de sus pentru apel direct.", nl: "📞 04441 / 95 16 104 — tik op de gele \"Bellen\"-knop bovenaan om direct te bellen.", sq: "📞 04441 / 95 16 104 — troko butonin e verdhë \"Telefono\" lart për të thirrur direkt.", ku: "📞 04441 / 95 16 104 — bişkoja zer a \"Telefon\" li jor bitikîne da ku rasterast telefon bikî.", pl: "📞 04441 / 95 16 104 — dotknij żółty przycisk \"Zadzwoń\" u góry, aby zadzwonić bezpośrednio." },
  halal: { de: "☪️ Ja, 100% Halal! Alle unsere Produkte sind halal-zertifiziert.", en: "☪️ Yes, 100% Halal! All our products are halal-certified.", tr: "☪️ Evet, %100 Helal! Tüm ürünlerimiz helal sertifikalı.", ro: "☪️ Da, 100% Halal! Toate produsele noastre sunt certificate halal.", nl: "☪️ Ja, 100% Halal! Al onze producten zijn halal-gecertificeerd.", sq: "☪️ Po, 100% Hallall! Të gjitha produktet tona janë të certifikuara hallall.", ku: "☪️ Erê, %100 Helal e! Hemû berhemên me bawernameya helal hene.", pl: "☪️ Tak, 100% Halal! Wszystkie nasze produkty mają certyfikat halal." },
  allergen: { de: "ⓘ Allergen- und Zusatzstoffinfos stehen bei jedem Artikel in der Speisekarte klein daneben, oder tippe oben auf \"ⓘ Allergene\".", en: "ⓘ Allergen and additive info is shown next to each item on the menu, or tap \"ⓘ Allergens\" at the top.", tr: "ⓘ Alerjen ve katkı madde bilgileri Speisekarte'de her ürünün yanında küçük harflerle yazıyor, üstteki \"ⓘ Allergene\" butonuna da bakabilirsin.", ro: "ⓘ Informațiile despre alergeni sunt afișate lângă fiecare produs din meniu, sau apasă \"ⓘ Alergeni\" sus.", nl: "ⓘ Allergie- en toevoegingsinfo staat bij elk artikel op de kaart, of tik boven op \"ⓘ Allergenen\".", sq: "ⓘ Informacioni për alergjenët shfaqet pranë çdo artikulli në menu, ose troko \"ⓘ Alergjenët\" lart.", ku: "ⓘ Agahiyên alerjiyê li tenişta her tiştî di menuyê de tê nîşandan, an li jor li ser \"ⓘ Alerji\" bitikîne.", pl: "ⓘ Informacje o alergenach są przy każdej pozycji w menu, lub dotknij \"ⓘ Alergeny\" u góry." },
  orderOn: { de: "🥙 Zum Bestellen tippe oben auf \"Per WhatsApp bestellen\"!", en: '🥙 To order, tap "Order via WhatsApp" at the top!', tr: "🥙 Sipariş vermek için üstteki \"WhatsApp'tan sipariş ver\" butonuna basabilirsin!", ro: "🥙 Pentru a comanda, apasă \"Comandă prin WhatsApp\" sus!", nl: '🥙 Om te bestellen, tik boven op "Bestellen via WhatsApp"!', sq: '🥙 Për të porositur, troko "Porosit me WhatsApp" lart!', ku: '🥙 Bo sifarişê, li jor li ser "Bi WhatsAppê sifariş bike" bitikîne!', pl: '🥙 Aby zamówić, dotknij "Zamów przez WhatsApp" u góry!' },
  orderOff: { de: "📞 Online-Bestellungen sind aktuell nicht möglich, aber du kannst uns ganz einfach anrufen: 04441 / 95 16 104", en: "📞 Online ordering isn't available right now, but you can easily call us: 04441 / 95 16 104", tr: "📞 Şu an online sipariş sistemi kapalı, ama bizi arayarak kolayca sipariş verebilirsin: 04441 / 95 16 104", ro: "📞 Comenzile online nu sunt momentan posibile, dar ne poți suna ușor: 04441 / 95 16 104", nl: "📞 Online bestellen is nu niet mogelijk, maar je kunt ons gewoon bellen: 04441 / 95 16 104", sq: "📞 Porositë online nuk janë të mundshme tani, por mund të na telefononi: 04441 / 95 16 104", ku: "📞 Sifarişên online niha ne gengaz in, lê tu dikarî bi hêsanî telefon bikî: 04441 / 95 16 104", pl: "📞 Zamówienia online są obecnie niedostępne, ale możesz do nas łatwo zadzwonić: 04441 / 95 16 104" },
  noDelivery: { de: "🚫 Nein, wir bieten leider keinen Lieferservice an — nur Abholung. Du kannst deine Bestellung aber persönlich bei uns abholen: 04441 / 95 16 104", en: "🚫 No, we don't offer delivery — pickup only. You can pick up your order in person: 04441 / 95 16 104", tr: "🚫 Hayır, maalesef teslimat hizmetimiz yok — sadece paket servis (gel-al). Siparişini bizzat gelip alabilirsin: 04441 / 95 16 104", ro: "🚫 Nu, din păcate nu oferim livrare — doar ridicare personală. Poți ridica comanda ta: 04441 / 95 16 104", nl: "🚫 Nee, we bieden helaas geen bezorgservice aan — alleen afhalen. Je kunt je bestelling persoonlijk ophalen: 04441 / 95 16 104", sq: "🚫 Jo, fatkeqësisht nuk ofrojmë shërbim dërgese — vetëm marrje personale. Mund ta marrësh porosinë vetë: 04441 / 95 16 104", ku: "🚫 Na, mixabin em karûbarê radestkirinê pêşkêş nakin — tenê hilanîna kesane. Tu dikarî sifarişa xwe bi xwe bistînî: 04441 / 95 16 104", pl: "🚫 Nie, niestety nie oferujemy dostawy — tylko odbiór osobisty. Możesz odebrać zamówienie osobiście: 04441 / 95 16 104" },
  paymentYes: { de: "✅ Ja, du kannst bei uns mit Karte oder bar bezahlen.", en: "✅ Yes, you can pay by card or cash with us.", tr: "✅ Evet, bizde hem kart hem nakit ödeme yapabilirsin.", ro: "✅ Da, poți plăti cu cardul sau cash la noi.", nl: "✅ Ja, je kunt bij ons met kaart of contant betalen.", sq: "✅ Po, mund të paguash me kartë ose para në dorë tek ne.", ku: "✅ Erê, tu dikarî li cem me bi kart an pere neqid bidî.", pl: "✅ Tak, możesz u nas płacić kartą lub gotówką." },
  steakAvailability: { de: "🥩 Steakfleisch gibt es bei uns nur Freitag, Samstag und Sonntag (+2,00 € Aufpreis).", en: "🥩 Steak is only available Friday, Saturday and Sunday (+€2.00 surcharge).", tr: "🥩 Steak eti bizde sadece Cuma, Cumartesi ve Pazar günleri var (+2,00 € ek ücretle).", ro: "🥩 Carnea de vită (steak) este disponibilă doar vineri, sâmbătă și duminică (+2,00 € suprataxă).", nl: "🥩 Steak is bij ons alleen op vrijdag, zaterdag en zondag verkrijgbaar (+€2,00 toeslag).", sq: "🥩 Mishi steak ka vetëm të premten, të shtunën dhe të dielën (+2,00 € shtesë).", ku: "🥩 Goştê steak tenê roja Îni, Şemî û Yekşemê heye (+2,00 € zêde).", pl: "🥩 Stek jest dostępny tylko w piątek, sobotę i niedzielę (+2,00 € dopłaty)." },
  recommendPrefix: { de: "🎲 Meine Empfehlung für heute:", en: "🎲 My recommendation for today:", tr: "🎲 Bugün için önerim:", ro: "🎲 Recomandarea mea de azi:", nl: "🎲 Mijn aanbeveling voor vandaag:", sq: "🎲 Rekomandimi im për sot:", ku: "🎲 Pêşniyara min a îro:", pl: "🎲 Moje polecenie na dziś:" },
  enjoy: { de: "Guten Appetit! 😋", en: "Enjoy your meal! 😋", tr: "Afiyet olsun! 😋", ro: "Poftă bună! 😋", nl: "Eet smakelijk! 😋", sq: "Ju bëftë mirë! 😋", ku: "Nûşê te be! 😋", pl: "Smacznego! 😋" },
  menuList: { de: "📋 Unsere Kategorien: Kebap, Pizza, Rollo, Calzone, Baguette, Nudeln, Schnitzel, Salat. Tippe oben auf \"Speisekarte\" für die komplette Karte.", en: '📋 Our categories: Kebap, Pizza, Rollo, Calzone, Baguette, Pasta, Schnitzel, Salad. Tap "Menu" at the top for the full menu.', tr: "📋 Kebap, Pizza, Rollo, Calzone, Baguette, Nudeln, Schnitzel, Salat kategorilerimiz var — üstteki \"Speisekarte\" butonuyla tüm menüyü görebilirsin.", ro: '📋 Categoriile noastre: Kebap, Pizza, Rollo, Calzone, Baguette, Paste, Șnițel, Salată. Apasă "Meniu" sus pentru meniul complet.', nl: '📋 Onze categorieën: Kebap, Pizza, Rollo, Calzone, Baguette, Pasta, Schnitzel, Salade. Tik boven op "Menu" voor de volledige kaart.', sq: '📋 Kategoritë tona: Kebap, Pica, Rollo, Kalcone, Bagetë, Makarona, Shnicel, Sallatë. Troko "Menuja" lart për menynë e plotë.', ku: '📋 Kategoriyên me: Kebap, Pizza, Rollo, Calzone, Baguette, Nûdile, Schnitzel, Selate. Li jor li ser "Menû" bitikîne bo menuya tevahî.', pl: '📋 Nasze kategorie: Kebap, Pizza, Rollo, Calzone, Baguette, Makaron, Sznycel, Sałatka. Dotknij "Menu" u góry, aby zobaczyć pełną kartę.' },
  itemFound: { de: "🍽️ Nr. {num} — **{name}** — {price}\n{desc}", en: "🍽️ No. {num} — **{name}** — {price}\n{desc}", tr: "🍽️ No. {num} — **{name}** — {price}\n{desc}", ro: "🍽️ Nr. {num} — **{name}** — {price}\n{desc}", nl: "🍽️ Nr. {num} — **{name}** — {price}\n{desc}", sq: "🍽️ Nr. {num} — **{name}** — {price}\n{desc}", ku: "🍽️ Hej. {num} — **{name}** — {price}\n{desc}", pl: "🍽️ Nr {num} — **{name}** — {price}\n{desc}" },
  itemFoundNoNum: { de: "🍽️ **{name}** — {price}\n{desc}", en: "🍽️ **{name}** — {price}\n{desc}", tr: "🍽️ **{name}** — {price}\n{desc}", ro: "🍽️ **{name}** — {price}\n{desc}", nl: "🍽️ **{name}** — {price}\n{desc}", sq: "🍽️ **{name}** — {price}\n{desc}", ku: "🍽️ **{name}** — {price}\n{desc}", pl: "🍽️ **{name}** — {price}\n{desc}" },
  fallback: { de: "Das habe ich nicht ganz verstanden 🤔 Frag mich z.B. \"Habt ihr geöffnet?\", \"Wo seid ihr?\", \"Was empfehlt ihr?\" oder gib eine Artikelnummer/-name ein. Oder ruf direkt an: 📞 04441 / 95 16 104", en: '🤔 I didn\'t quite catch that. Try asking "Are you open?", "Where are you?", "What do you recommend?", or type an item number/name. Or call directly: 📞 04441 / 95 16 104', tr: "Bunu tam anlayamadım 🤔 Ama şunları sorabilirsin: \"açık mısınız\", \"adresiniz nerede\", \"ne önerirsiniz\", ya da bir ürün ismi/numarası yazabilirsin. Ya da direkt ara: 📞 04441 / 95 16 104", ro: '🤔 Nu am înțeles bine. Încearcă "Sunteți deschiși?", "Unde sunteți?", "Ce recomandați?" sau scrie un număr/nume de produs. Sau sună direct: 📞 04441 / 95 16 104', nl: '🤔 Dat begreep ik niet helemaal. Probeer "Zijn jullie open?", "Waar zijn jullie?", "Wat raden jullie aan?" of typ een artikelnummer/-naam. Of bel direct: 📞 04441 / 95 16 104', sq: '🤔 Nuk e kuptova plotësisht. Provo "A jeni hapur?", "Ku jeni?", "Çfarë rekomandoni?" ose shkruaj një numër/emër artikulli. Ose telefono direkt: 📞 04441 / 95 16 104', ku: '🤔 Min ev baş fêm nekir. Biceribîne "Hûn vekirî ne?", "Hûn li ku ne?", "Hûn çi pêşniyar dikin?", an hejmar/navê tiştekî binivîse. An rasterast telefon bike: 📞 04441 / 95 16 104', pl: '🤔 Nie do końca to zrozumiałem. Zapytaj np. "Czy jesteście otwarci?", "Gdzie jesteście?", "Co polecacie?" albo wpisz numer/nazwę dania. Albo zadzwoń bezpośrednio: 📞 04441 / 95 16 104' },
  chipOpen: { de: "Habt ihr geöffnet?", en: "Are you open?", tr: "Açık mısınız?", ro: "Sunteți deschiși?", nl: "Zijn jullie open?", sq: "A jeni hapur?", ku: "Hûn vekirî ne?", pl: "Czy jesteście otwarci?" },
  chipRecommend: { de: "Was empfehlt ihr?", en: "What do you recommend?", tr: "Ne önerirsiniz?", ro: "Ce recomandați?", nl: "Wat raden jullie aan?", sq: "Çfarë rekomandoni?", ku: "Hûn çi pêşniyar dikin?", pl: "Co polecacie?" },
  chipAddress: { de: "Wo seid ihr?", en: "Where are you?", tr: "Adresiniz nerede?", ro: "Unde sunteți?", nl: "Waar zijn jullie?", sq: "Ku jeni?", ku: "Hûn li ku ne?", pl: "Gdzie jesteście?" },
};
function ar(key, lang) { return ASSISTANT_R[key][lang] || ASSISTANT_R[key].de; }

function getAssistantReply(qRaw, lang) {
  const q = qRaw.toLowerCase().trim();
  const now = new Date();
  const status = getOpenStatus(now);
  const has = (...words) => words.some((w) => q.includes(w));

  // 1) Numeric item lookup takes priority (e.g. "201", "25 numaralı pizza")
  const numMatch = q.match(/\d+/);
  if (numMatch) {
    const found = ALL_MENU_ITEMS.find((it) => it.number === numMatch[0]);
    if (found) return { intent: 'item', text: ar('itemFound', lang).replace('{num}', found.number).replace('{name}', mx(found.name, lang)).replace('{price}', formatItemPriceText(found)).replace('{desc}', found.desc ? mx(found.desc, lang) : '') };
  }

  if (has('açık', 'kapalı', 'saat', 'öffnung', 'geöffnet', 'geschlossen', 'uhr', 'hours', 'open ', 'closed', 'wann', 'godzin', 'otwart')) {
    const tueOpen = isTuesdayOpenNow(now);
    if (status.open) return { intent: 'hours', text: ar(tueOpen ? 'openYesEveryDay' : 'openYes', lang) };
    return { intent: 'hours', text: `${ar('openNoPrefix', lang)} ${status.nextOpen ? `${ar('opensIn', lang)}: ${formatCountdown(status.nextOpen - now)}` : ''} ${ar(tueOpen ? 'openNoSuffixEveryDay' : 'openNoSuffix', lang)}` };
  }
  if (has('adres', 'nerede', 'wo ', 'address', 'yol', 'route', 'konum', 'standort', 'adresse')) {
    return { intent: 'address', text: ar('address', lang) };
  }
  if (has('telefon', ' ara', 'anruf', 'phone', 'zadzwoń')) {
    return { intent: 'phone', text: ar('phone', lang) };
  }
  if (has('helal', 'halal')) {
    return { intent: 'halal', text: ar('halal', lang) };
  }
  if (has('alerjen', 'allergie', 'allergen', 'zusatzstoffe')) {
    return { intent: 'allergen', text: ar('allergen', lang) };
  }
  if (has('liefer', 'delivery', 'teslimat', 'livrare', 'bezorg', 'dërgesë', 'radestkirin', 'dostawa', 'dostarcz')) {
    return { intent: 'delivery', text: ar('noDelivery', lang) };
  }
  if (has('steak', 'steakfleisch')) {
    return { intent: 'steak', text: ar('steakAvailability', lang) };
  }
  if (has('karte', 'kredit', 'ec-karte', 'kartenzahlung', 'card', 'kart ile', 'kart mı', 'kartla', 'bargeld', 'bar bezahl', 'bar zahlen', 'nakit', 'cash', 'kontaktlos', 'contactless', 'girocard')) {
    return { intent: 'payment', text: ar('paymentYes', lang) };
  }
  if (has('sipariş', 'bestell', 'order', 'zamów', 'comand')) {
    return { intent: 'order', text: ORDERING_ENABLED ? ar('orderOn', lang) : ar('orderOff', lang) };
  }
  if (has('öner', 'empfehl', 'ne yesem', 'was soll ich', 'recommend', 'vorschlag', 'polec')) {
    const item = SURPRISE_ITEMS[Math.floor(Math.random() * SURPRISE_ITEMS.length)];
    const descPart = item.desc ? ` ${mx(item.desc, lang)}.` : '';
    return { intent: 'recommend', text: `${ar('recommendPrefix', lang)} **${mx(item.name, lang)}** — ${fmt(item.price)}.${descPart} ${ar('enjoy', lang)}` };
  }
  if (has('menü', 'menu', 'speisekarte', 'karte')) {
    return { intent: 'menu', text: ar('menuList', lang) };
  }
  // 2) Name-based item lookup
  if (q.length > 2) {
    const nameMatch = ALL_MENU_ITEMS.find((it) => it.name.toLowerCase().includes(q) || q.includes(it.name.toLowerCase()));
    if (nameMatch) {
      if (nameMatch.number) return { intent: 'item', text: ar('itemFound', lang).replace('{num}', nameMatch.number).replace('{name}', mx(nameMatch.name, lang)).replace('{price}', formatItemPriceText(nameMatch)).replace('{desc}', nameMatch.desc ? mx(nameMatch.desc, lang) : '') };
      return { intent: 'item', text: ar('itemFoundNoNum', lang).replace('{name}', mx(nameMatch.name, lang)).replace('{price}', formatItemPriceText(nameMatch)).replace('{desc}', nameMatch.desc ? mx(nameMatch.desc, lang) : '') };
    }
  }
  return { intent: 'fallback', text: ar('fallback', lang) };
}

const SPEECH_LOCALE = { de: 'de-DE', en: 'en-US', tr: 'tr-TR', ro: 'ro-RO', nl: 'nl-NL', sq: 'sq-AL', ku: 'ku', pl: 'pl-PL' };

function speakText(text, lang) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_#🍽️🎲📞📍☪️ⓘ🥙📋🔴🟢😋🤔👋]/gu, '').trim();
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = SPEECH_LOCALE[lang] || 'de-DE';
    window.speechSynthesis.speak(utter);
  } catch {}
}

function AIAssistant() {
  const { lang, t } = React.useContext(LangContext);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const scrollRef = useRef(null);
  const recogRef = useRef(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: 'bot', text: t('assistantGreeting') }]);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Proactive auto-open: once per browser session, if idle ~28s and never opened
  useEffect(() => {
    try {
      if (sessionStorage.getItem('bk_assistant_nudged')) return;
    } catch {}
    const timer = setTimeout(() => {
      setOpen((wasOpen) => {
        if (!wasOpen) {
          try { sessionStorage.setItem('bk_assistant_nudged', '1'); } catch {}
          return true;
        }
        return wasOpen;
      });
    }, 28000);
    return () => clearTimeout(timer);
  }, []);

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q) return;
    const { intent, text: reply } = getAssistantReply(q, lang);
    logEvent('assistant_' + intent, { q: q.slice(0, 200) });
    setInput('');
    if (intent !== 'fallback') {
      setMessages((m) => [...m, { from: 'user', text: q }, { from: 'bot', text: reply }]);
      return;
    }
    // Kein Keyword-Treffer: an die echte KI weiterreichen (kostet etwas,
    // daher bewusst nur in diesem Fallback-Fall, nicht bei jeder Nachricht).
    const thinkingId = Date.now() + Math.random();
    setMessages((m) => [...m, { from: 'user', text: q }, { from: 'bot', text: '…', id: thinkingId }]);
    fetch('/api/ask-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q, lang }),
    }).then((r) => r.json()).then((d) => {
      setMessages((m) => m.map((msg) => (msg.id === thinkingId ? { from: 'bot', text: d.answer || reply } : msg)));
    }).catch(() => {
      setMessages((m) => m.map((msg) => (msg.id === thinkingId ? { from: 'bot', text: reply } : msg)));
    });
  };

  const startVoiceInput = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Ses tanıma bu tarayıcıda desteklenmiyor.'); return; }
    const recog = new SR();
    recog.lang = SPEECH_LOCALE[lang] || 'de-DE';
    recog.interimResults = false;
    recog.maxAlternatives = 1;
    recog.onstart = () => setListening(true);
    recog.onend = () => setListening(false);
    recog.onerror = () => setListening(false);
    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      send(transcript);
    };
    recogRef.current = recog;
    recog.start();
  };

  const chips = [ar('chipOpen', lang), ar('chipRecommend', lang), ar('chipAddress', lang)];
  const speechSupported = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, boxShadow: '0 10px 28px rgba(230,90,10,.5)', animation: open ? 'none' : 'goldGlow 2.4s ease-in-out infinite' }}
      >
        <span className="text-2xl">{open ? '✕' : '🤖'}</span>
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[92vw] max-w-sm rounded-3xl overflow-hidden flex flex-col" style={{ height: '65vh', maxHeight: 520, background: CREAM, boxShadow: '0 20px 50px rgba(0,0,0,.35)' }}>
          <div className="px-4 py-3 flex items-center gap-2.5 flex-shrink-0" style={{ background: `linear-gradient(135deg, ${GREEN}, #0e2a1c)` }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ORANGE }}><span className="text-lg">🤖</span></div>
            <div className="text-white font-black text-sm">{t('assistantTitle')}</div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-3 space-y-2.5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="px-3.5 py-2.5 rounded-2xl text-sm font-medium max-w-[85%] whitespace-pre-wrap flex items-end gap-1.5"
                  style={m.from === 'user'
                    ? { background: GREEN, color: '#fff', borderBottomRightRadius: 4 }
                    : { background: '#fff', color: GREEN, borderBottomLeftRadius: 4, boxShadow: '0 2px 8px rgba(21,56,38,.08)' }}
                >
                  <span>{m.text}</span>
                  {m.from === 'bot' && (
                    <button onClick={() => speakText(m.text, lang)} className="flex-shrink-0 opacity-60" title="Vorlesen">🔊</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {messages.length <= 1 && (
            <div className="px-3.5 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
              {chips.map((c) => (
                <button key={c} onClick={() => send(c)} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: '#fff', color: GREEN, border: `1px solid #e3d5bd` }}>{c}</button>
              ))}
            </div>
          )}

          <div className="p-3 flex gap-2 flex-shrink-0" style={{ borderTop: '1px solid #e3d5bd' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
              placeholder={t('assistantPlaceholder')}
              className="flex-1 px-3.5 py-2.5 rounded-full text-sm outline-none"
              style={{ background: '#fff', color: GREEN, border: '1px solid #e3d5bd' }}
            />
            {speechSupported && (
              <button onClick={startVoiceInput} className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: listening ? CHILI : '#f0e5cf', animation: listening ? 'closedBlink 1s ease-in-out infinite' : 'none' }}>
                <span className="text-base">🎙️</span>
              </button>
            )}
            <button onClick={() => send()} className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ORANGE }}>
              <ArrowRight size={17} color="#fff" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const MOOD_R = {
  title: { de: 'Worauf hast du Lust?', en: "What are you craving?", tr: 'Ne canın çekiyor?', ro: 'Ce ți-e poftă?', nl: 'Waar heb je zin in?', sq: 'Për çfarë ke qejf?', ku: 'Tu dixwazî çi bixwî?', pl: 'Na co masz ochotę?' },
  meat: { de: 'Fleisch 🍖', en: 'Meat 🍖', tr: 'Et 🍖', ro: 'Carne 🍖', nl: 'Vlees 🍖', sq: 'Mish 🍖', ku: 'Goşt 🍖', pl: 'Mięso 🍖' },
  light: { de: 'Leicht 🥗', en: 'Light 🥗', tr: 'Hafif 🥗', ro: 'Ceva ușor 🥗', nl: 'Licht 🥗', sq: 'Lehtë 🥗', ku: 'Sivik 🥗', pl: 'Coś lekkiego 🥗' },
  dough: { de: 'Teigig 🍕', en: 'Dough 🍕', tr: 'Hamur işi 🍕', ro: 'Cu aluat 🍕', nl: 'Deeg 🍕', sq: 'Brumë 🍕', ku: 'Hevîr 🍕', pl: 'Coś z ciasta 🍕' },
  surprise: { de: 'Überrasch mich 🎲', en: 'Surprise me 🎲', tr: 'Şaşırt beni 🎲', ro: 'Surprinde-mă 🎲', nl: 'Verras me 🎲', sq: 'Më befaso 🎲', ku: 'Min ecêb bihêle 🎲', pl: 'Zaskocz mnie 🎲' },
  result: { de: 'Wie wäre es hiermit?', en: 'How about this?', tr: 'Buna ne dersin?', ro: 'Ce zici de asta?', nl: 'Wat dacht je hiervan?', sq: 'Si të duket kjo?', ku: 'Ev çawa ye?', pl: 'Co powiesz na to?' },
  again: { de: 'Nochmal', en: 'Again', tr: 'Tekrar dene', ro: 'Din nou', nl: 'Opnieuw', sq: 'Përsëri', ku: 'Dîsa', pl: 'Jeszcze raz' },
};
function mr(key, lang) { return MOOD_R[key][lang] || MOOD_R[key].de; }

const MOOD_CATS = {
  meat: ['kebap', 'schnitzel'],
  light: ['salat'],
  dough: ['pizza', 'calzone', 'baguette'],
};
function isVegItem(name) {
  const n = name.toLowerCase();
  return n.includes('vegetarisch') || n.includes('falafel') || n.includes('veggie') || n.includes('salat (') || n.includes('salat)') || n.includes(' salat');
}

function MoodPicker({ onClose, items }) {
  const { lang } = React.useContext(LangContext);
  const [result, setResult] = useState(null);
  const pool0 = items && items.length ? items : SURPRISE_ITEMS;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const pick = (moodKey) => {
    let pool = pool0;
    if (moodKey === 'light') {
      pool = pool0.filter((it) => it.cat === 'salat' || isVegItem(it.name));
    } else if (moodKey === 'meat' || moodKey === 'dough') {
      const cats = MOOD_CATS[moodKey];
      pool = pool0.filter((it) => cats.includes(it.cat) && !isVegItem(it.name));
    }
    if (pool.length === 0) pool = pool0;
    setResult(pool[Math.floor(Math.random() * pool.length)]);
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: 'radial-gradient(circle at 50% 20%, rgba(255,199,56,.1), transparent 55%), rgba(21,56,38,.5)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', zIndex: 150, animation: 'modalBgFade .35s ease' }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto relative"
        style={{
          background: 'rgba(255,255,255,.42)',
          backdropFilter: 'blur(26px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(26px) saturate(1.6)',
          border: '1px solid rgba(255,255,255,.55)',
          boxShadow: '0 30px 70px rgba(21,56,38,.35), inset 0 1px 0 rgba(255,255,255,.7), inset 0 0 40px rgba(255,255,255,.15)',
          animation: 'modalCardUp .4s cubic-bezier(.25,.46,.45,.94)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,.5), transparent)' }} />
        <div className="p-6 text-center relative" style={{ minHeight: 320 }}>
        {!result ? (
          <>
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-black text-lg mb-6" style={{ color: GREEN }}>{mr('title', lang)}</h3>
            <div className="grid grid-cols-2 gap-3">
              {['meat', 'light', 'dough', 'surprise'].map((k) => (
                <button key={k} onClick={() => pick(k)} className="py-4 rounded-2xl font-bold text-sm" style={{ background: 'rgba(255,255,255,.55)', color: GREEN, border: '1px solid rgba(255,255,255,.6)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.8)' }}>{mr(k, lang)}</button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="font-black text-lg mb-4" style={{ color: GREEN }}>{mr('result', lang)}</h3>
            {result.img && (
              <div className="w-full h-40 rounded-xl overflow-hidden mb-4 flex items-center justify-center" style={{ background: result.imgContain ? 'rgba(255,255,255,.4)' : 'transparent' }}>
                <img src={result.img} alt={result.name} className={result.imgContain ? 'h-full object-contain py-2' : 'w-full h-full object-cover'} />
              </div>
            )}
            <div className="font-black text-xl mb-1" style={{ color: GREEN }}>{mx(result.name, lang)}<AllergenTag alg={result.alg} /></div>
            {result.desc && <p className="text-xs font-medium mb-2" style={{ color: '#5a4f3a' }}>{mx(result.desc, lang)}</p>}
            <div className="font-bold text-lg mb-6" style={{ color: CHILI }}>{fmt(result.price)}</div>
            <button onClick={() => setResult(null)} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ background: 'rgba(255,255,255,.55)', color: GREEN, border: '1px solid rgba(255,255,255,.6)' }}>{mr('again', lang)}</button>
          </>
        )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function CampaignBanner() {
  const [campaign, setCampaign] = useState(null);
  useEffect(() => { safeGet('siteconfig:campaign').then((r) => { if (r) setCampaign(r); }); }, []);
  if (!campaign || !campaign.active || !campaign.title) return null;
  const todayStr = new Date().toISOString().slice(0, 10);
  if (campaign.startDate && todayStr < campaign.startDate) return null;
  if (campaign.endDate && todayStr > campaign.endDate) return null;
  return (
    <div className="px-5 py-3 text-center" style={{ background: `linear-gradient(90deg, ${GOLD}, #ffdf8a, ${GOLD})`, animation: 'goldGlow 2.2s ease-in-out infinite' }}>
      <span className="font-black text-sm" style={{ color: GREEN }}>{campaign.title}</span>
      {campaign.subtitle && <span className="block text-xs font-semibold mt-0.5" style={{ color: GREEN }}>{campaign.subtitle}</span>}
    </div>
  );
}

async function translateToGerman(text, sourceLang) {
  if (sourceLang === 'de' || !text.trim()) return text;
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|de`);
    const j = await res.json();
    const translated = j?.responseData?.translatedText;
    if (translated && j.responseStatus === 200) return translated;
  } catch {}
  return text; // Fallback: Original, falls Übersetzung fehlschlägt
}

function ContactMessageForm({ lang, t }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const submit = async () => {
    if (!name.trim() || !message.trim()) return;
    setStatus('sending');
    try {
      const messageDe = await translateToGerman(message.trim(), lang);
      const key = `contactmsg:${Date.now()}-${makeShortCode(4)}`;
      await safeSet(key, { name: name.trim(), email: email.trim(), message: message.trim(), messageDe, lang, ts: Date.now(), read: false });
      sendOwnerPushNotification('📬 Neue Nachricht: ' + name.trim(), messageDe);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Neue Nachricht von der Website — ${name.trim()}`,
          from_name: 'Bodrum Kebap Website',
          name: name.trim(),
          ...(email.trim() ? { email: email.trim() } : {}),
          message: messageDe,
          original_language: lang,
          original_message: lang !== 'de' ? message.trim() : undefined,
        }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      setName(''); setEmail(''); setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div id="nachricht" className="mt-8 rounded-2xl p-5" style={{ background: 'rgba(255,246,234,.05)', border: '1px solid rgba(255,246,234,.12)' }}>
      <div className="text-white font-black text-sm mb-1">{t('contactMsgTitle')}</div>
      <p className="text-xs font-medium mb-4" style={{ color: '#a89878' }}>{t('contactMsgSub')}</p>
      {status === 'sent' ? (
        <p className="text-sm font-bold" style={{ color: '#7ed99b' }}>{t('contactMsgSent')}</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('contactMsgName')} className="w-full px-3.5 py-3 rounded-lg text-sm font-semibold outline-none" style={{ background: CREAM, color: GREEN, border: 'none' }} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('contactMsgPhone')} className="w-full px-3.5 py-3 rounded-lg text-sm font-semibold outline-none" style={{ background: CREAM, color: GREEN, border: 'none' }} />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t('contactMsgMessage')} rows={3} className="w-full px-3.5 py-3 rounded-lg text-sm font-semibold outline-none resize-none" style={{ background: CREAM, color: GREEN, border: 'none' }} />
          <button onClick={submit} disabled={status === 'sending' || !name.trim() || !message.trim()} className="px-5 py-2.5 rounded-full font-bold text-sm text-white self-start" style={{ background: status === 'sending' ? '#8a7c62' : ORANGE, opacity: (!name.trim() || !message.trim()) ? 0.5 : 1 }}>
            {status === 'sending' ? '⏳ ...' : t('contactMsgSend')}
          </button>
          {status === 'error' && <p className="text-xs font-bold" style={{ color: '#e08a8a' }}>{t('contactMsgError')}</p>}
        </div>
      )}
    </div>
  );
}

function WishModal({ lang, t, onClose }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = async () => {
    if (!text.trim()) return;
    setStatus('sending');
    try {
      const key = `wish:${Date.now()}-${makeShortCode(4)}`;
      await safeSet(key, { name: name.trim(), text: text.trim(), lang, ts: Date.now() });
      sendOwnerPushNotification('💡 Neuer Kundenwunsch', text.trim());
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,.75)', animation: 'modalBgFade .25s ease' }} onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-3xl p-6"
        style={{ background: GREEN, border: '1px solid rgba(255,199,56,.25)', boxShadow: '0 30px 70px rgba(21,56,38,.5)', animation: 'modalCardUp .3s cubic-bezier(.25,.46,.45,.94)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="font-black text-base" style={{ color: GOLD }}>💡 {t('wishBoxTitle')}</div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,.1)' }}><X size={15} color="#fff" /></button>
        </div>
        <p className="text-xs font-medium mb-4" style={{ color: '#a89878' }}>{t('wishBoxSub')}</p>
        {status === 'sent' ? (
          <div className="text-center py-4">
            <p className="text-sm font-bold mb-4" style={{ color: '#7ed99b' }}>{t('wishBoxSent')}</p>
            <button onClick={onClose} className="px-6 py-2.5 rounded-full font-bold text-sm" style={{ background: GOLD, color: GREEN }}>OK</button>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('wishBoxName')} className="w-full px-3.5 py-3 rounded-lg text-sm font-semibold outline-none" style={{ background: CREAM, color: GREEN, border: 'none' }} />
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t('wishBoxPlaceholder')} rows={3} autoFocus className="w-full px-3.5 py-3 rounded-lg text-sm font-semibold outline-none resize-none" style={{ background: CREAM, color: GREEN, border: 'none' }} />
            <button onClick={submit} disabled={status === 'sending' || !text.trim()} className="px-5 py-3 rounded-full font-bold text-sm text-white" style={{ background: status === 'sending' ? '#8a7c62' : ORANGE, opacity: !text.trim() ? 0.5 : 1 }}>
              {status === 'sending' ? '⏳ ...' : t('wishBoxSend')}
            </button>
            {status === 'error' && <p className="text-xs font-bold text-center" style={{ color: '#e08a8a' }}>{t('contactMsgError')}</p>}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function DistanceWidget({ lang, inline }) {
  const [state, setState] = useState('idle'); // idle | loading | done | error
  const [result, setResult] = useState(null);

  const SHOP_FALLBACK = { lat: 52.7263, lon: 8.2860 }; // Vechta Stadtzentrum, Näherung falls Geocoding fehlschlägt

  const haversineKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const locate = () => {
    if (!navigator.geolocation) { setState('error'); return; }
    setState('loading');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        let shop = SHOP_FALLBACK;
        try {
          const r = await fetch('https://photon.komoot.io/api/?q=' + encodeURIComponent('Oyther Straße 37, 49377 Vechta, Germany') + '&limit=1');
          const j = await r.json();
          const f = j?.features?.[0];
          if (f) shop = { lat: f.geometry.coordinates[1], lon: f.geometry.coordinates[0] };
        } catch {}
        const km = haversineKm(pos.coords.latitude, pos.coords.longitude, shop.lat, shop.lon);
        const minutes = Math.max(1, Math.round((km / 32) * 60)); // ~32km/h angenommene Stadtgeschwindigkeit
        setResult({ km: km.toFixed(1), minutes });
        setState('done');
      },
      () => setState('error'),
      { timeout: 10000 }
    );
  };

  return (
    <div className={inline ? 'contents' : ''}>
      {state === 'idle' && (
        <button onClick={locate} className="w-fit flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-white" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>
          📍 {lang === 'de' ? 'Meine Entfernung berechnen' : lang === 'en' ? 'Calculate my distance' : lang === 'tr' ? 'Uzaklığımı hesapla' : lang === 'ro' ? 'Calculează distanța mea' : lang === 'sq' ? 'Llogarit distancën time' : lang === 'ku' ? 'Dûrahiya min hesibîne' : 'Bereken mijn afstand'}
        </button>
      )}
      {state === 'loading' && <p className="text-xs font-semibold self-center px-2" style={{ color: '#7a6a52' }}>⏳ {lang === 'de' ? 'Wird berechnet…' : 'Calculating…'}</p>}
      {state === 'error' && <p className="text-xs font-semibold self-center px-2" style={{ color: CHILI }}>⚠️ {lang === 'de' ? 'Standort nicht verfügbar' : 'Location not available'}</p>}
      {state === 'done' && result && (
        <div className="w-fit flex items-center gap-2.5 rounded-full px-5 py-3" style={{ background: GOLD }}>
          <span className="text-lg">📍</span>
          <div>
            <div className="font-black text-xs" style={{ color: GREEN }}>≈ {result.km} km · ≈ {result.minutes} {lang === 'de' ? 'Min. mit dem Auto' : lang === 'en' ? 'min by car' : lang === 'tr' ? 'dk (araçla)' : 'min'}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function MemoryMatchGame({ onClose }) {
  const EMOJIS = ['🥙', '🍕', '🧀', '🍟', '🥗', '🍝'];
  const shuffle = () => {
    const pairs = [...EMOJIS, ...EMOJIS].map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    return pairs;
  };

  const [cards, setCards] = useState(shuffle);
  const [flippedIds, setFlippedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [won, setWon] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [best, setBest] = useState(() => { try { const v = localStorage.getItem('bk_memory_best'); return v ? parseInt(v, 10) : null; } catch { return null; } });

  const matchedCount = cards.filter((c) => c.matched).length;

  useEffect(() => {
    if (matchedCount === cards.length && cards.length > 0 && !won) {
      setWon(true);
      setBest((b) => {
        if (b === null || moves < b) {
          setIsNewBest(true);
          try { localStorage.setItem('bk_memory_best', String(moves)); } catch {}
          return moves;
        }
        return b;
      });
    }
  }, [matchedCount]);

  const flip = (card) => {
    if (locked || card.flipped || card.matched || flippedIds.length === 2) return;
    const newFlipped = [...flippedIds, card.id];
    setCards((cs) => cs.map((c) => (c.id === card.id ? { ...c, flipped: true } : c)));
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [firstId, secondId] = newFlipped;
      const first = cards.find((c) => c.id === firstId);
      const second = card;
      setTimeout(() => {
        if (first.emoji === second.emoji) {
          setCards((cs) => cs.map((c) => (c.id === firstId || c.id === secondId) ? { ...c, matched: true } : c));
        } else {
          setCards((cs) => cs.map((c) => (c.id === firstId || c.id === secondId) ? { ...c, flipped: false } : c));
        }
        setFlippedIds([]);
        setLocked(false);
      }, 700);
    }
  };

  const restart = () => { setCards(shuffle()); setFlippedIds([]); setMoves(0); setLocked(false); setWon(false); setIsNewBest(false); };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-5" style={{ background: 'rgba(0,0,0,.7)' }}>
      <div className="w-full max-w-sm rounded-3xl overflow-hidden" style={{ background: CREAM, boxShadow: '0 20px 50px rgba(0,0,0,.4)' }}>
        <div className="px-5 py-4 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${GREEN}, #1d4530)` }}>
          <div className="text-white font-black text-sm">🧠 Kebap-Memory</div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,246,234,.15)' }}><X size={15} color="#fff" /></button>
        </div>
        <div className="px-5 pt-3 flex items-center justify-between">
          <span className="font-black text-sm" style={{ color: GREEN }}>🔄 {moves} Züge</span>
          <span className="font-bold text-xs" style={{ color: '#a4906c' }}>🏆 {best === null ? '—' : best}</span>
        </div>
        <div className="relative mx-4 my-3 rounded-2xl overflow-hidden p-3" style={{ background: '#fff', border: '1.5px solid #f0e5cf' }}>
          {!won ? (
            <div className="grid grid-cols-4 gap-2.5">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => flip(card)}
                  className="aspect-square rounded-xl flex items-center justify-center text-2xl transition-all"
                  style={{
                    background: card.matched ? 'rgba(52,160,101,.15)' : card.flipped ? '#fff' : `linear-gradient(135deg, ${GREEN}, #1d4530)`,
                    border: card.matched ? '2px solid #34a065' : '1.5px solid #f0e5cf',
                  }}
                >
                  {(card.flipped || card.matched) ? card.emoji : ''}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2.5" style={{ minHeight: 280 }}>
              {isNewBest && <div className="absolute inset-0 pointer-events-none">{Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="absolute text-lg" style={{ left: `${Math.random() * 100}%`, top: -20, animation: `confettiFall ${1.4 + Math.random()}s ease-in forwards`, animationDelay: `${Math.random() * 0.4}s` }}>{['🎉', '⭐', '🥙', '🎊'][i % 4]}</span>
              ))}</div>}
              <div className="text-4xl">{isNewBest ? '🏆' : '🎉'}</div>
              {isNewBest && <div className="font-black text-sm" style={{ color: ORANGE }}>Neuer Rekord!</div>}
              <div className="font-black text-lg" style={{ color: GREEN }}>Geschafft in {moves} Zügen!</div>
              <button onClick={restart} className="px-5 py-2.5 rounded-full font-bold text-sm text-white" style={{ background: ORANGE }}>Nochmal 🔄</button>
            </div>
          )}
        </div>
        <p className="text-center text-[11px] font-medium pb-4" style={{ color: '#a4906c' }}>Finde alle Paare mit möglichst wenigen Zügen!</p>
      </div>
      <style>{`
        @keyframes confettiFall { from { transform: translateY(0) rotate(0deg); opacity: 1; } to { transform: translateY(360px) rotate(360deg); opacity: 0; } }
      `}</style>
    </div>
  );
}


function MittagsBanner({ menu, onPhotoClick }) {
  const { t } = React.useContext(LangContext);
  const [now, setNow] = useState(new Date());
  const [enabledCats, setEnabledCats] = useState(null);
  const [pizzaGalleryUrl, setPizzaGalleryUrl] = useState('');
  const [photoIdx, setPhotoIdx] = useState(0);
  useEffect(() => {
    const t2 = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t2);
  }, []);
  useEffect(() => {
    safeGet('siteconfig:mittagsSidePhotos').then((r) => {
      if (r) {
        setEnabledCats(r.enabled || {});
        setPizzaGalleryUrl(r.pizzaGalleryUrl || '');
      }
    });
  }, []);
  const sidePhotos = React.useMemo(() => {
    if (!enabledCats || !menu) return null;
    const pool = [];
    ['pizza', 'salat', 'nudeln', 'schnitzel'].forEach((catKey) => {
      if (!enabledCats[catKey]) return;
      const cat = menu.find((c) => c.key === catKey);
      if (!cat) return;
      cat.items.forEach((item) => { if (item.img && !item.customPizza && !item.customPasta) pool.push(item.img); });
      if (catKey === 'pizza' && pizzaGalleryUrl) pool.push(pizzaGalleryUrl);
    });
    return pool.length ? pool : null;
  }, [enabledCats, pizzaGalleryUrl, menu]);
  useEffect(() => {
    if (!sidePhotos || sidePhotos.length < 2) return;
    const iv = setInterval(() => setPhotoIdx((i) => (i + 1) % sidePhotos.length), 2500);
    return () => clearInterval(iv);
  }, [sidePhotos]);
  const day = now.getDay();
  if (day === 6) return null; // Samstag hat seine eigene Kampagne (Tagesempfehlung)
  const lunchDays = isTuesdayOpenNow(now) ? [1, 2, 3, 4, 5] : [1, 3, 4, 5];
  const isLunchDay = lunchDays.includes(day);
  const start = new Date(now); start.setHours(11, 30, 0, 0);
  const end = new Date(now); end.setHours(14, 0, 0, 0);
  const active = isLunchDay && now >= start && now <= end;
  const isBlackout = day === 0 || (day === 5 && now >= end); // Sonntag, oder Freitag ab 14:00 — Countdown pausiert bis Montag 00:00
  const showCountdown = !isBlackout;

  const getNextStart = () => {
    for (let add = 0; add <= 8; add++) {
      const d = new Date(now);
      d.setDate(d.getDate() + add);
      d.setHours(11, 30, 0, 0);
      if (lunchDays.includes(d.getDay()) && d.getTime() > now.getTime()) return d;
    }
    return null;
  };

  let countdownLabel = '';
  if (active) {
    const diff = end.getTime() - now.getTime();
    const hh = Math.floor(diff / 3600000);
    const mm = Math.floor((diff % 3600000) / 60000);
    const ss = Math.floor((diff % 60000) / 1000);
    countdownLabel = `⏱ noch ${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  } else if (showCountdown) {
    const next = getNextStart();
    if (next) {
      const diff = next.getTime() - now.getTime();
      const hh = Math.floor(diff / 3600000);
      const mm = Math.floor((diff % 3600000) / 60000);
      const ss = Math.floor((diff % 60000) / 1000);
      countdownLabel = `⏳ ${t('lunchOfferInactive').split(' · ')[0]} · ${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
    } else {
      countdownLabel = t('lunchOfferInactive');
    }
  }

  return (
    <section className="py-2.5 relative overflow-hidden" style={{ background: active ? `linear-gradient(115deg, ${CHILI} 0%, ${ORANGE} 55%, #ff9a4d 100%)` : `linear-gradient(115deg, #c94706 0%, ${ORANGE} 55%, #ff9a4d 100%)`, boxShadow: '0 4px 16px rgba(230,90,10,.25)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 15% 0%, rgba(255,255,255,.16), transparent 60%)' }} />
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(135deg, #fff 0 2px, transparent 2px 22px)' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'rgba(255,199,56,.7)' }} />
      <div className="max-w-md mx-auto px-5 relative">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex flex-col items-center text-center gap-1.5 rounded-2xl px-4 py-3.5" style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,199,56,.4)', backdropFilter: 'blur(2px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18)' }}>
            <div className="flex items-center gap-2">
              <span className="text-xl" style={active ? { animation: 'urgentPulse 1.6s ease-out infinite' } : {}}>{active ? '🔥' : '🍽️'}</span>
              <span className="text-white font-black text-base tracking-tight">{t('lunchOffer')}</span>
            </div>
            <div className="font-black text-3xl px-4 py-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${GOLD}, #ffdf8a)`, color: GREEN, boxShadow: '0 4px 12px rgba(0,0,0,.2)' }}>{fmt(9.5)}</div>
            <div className="text-[11px] font-bold" style={{ color: 'rgba(255,255,255,.85)' }}>Montag–Freitag · 11:30–14:00</div>
            {showCountdown && (
              <div className="text-sm font-black mt-0.5 tabular-nums px-3 py-1 rounded-full" style={{ color: '#153826', background: 'rgba(255,255,255,.92)' }}>
                {countdownLabel}
              </div>
            )}
          </div>
          {sidePhotos && (
            <div onClick={() => onPhotoClick?.(sidePhotos[photoIdx % sidePhotos.length])} className="flex-shrink-0 relative rounded-2xl overflow-hidden cursor-pointer" style={{ width: 100, height: 100, boxShadow: '0 10px 24px rgba(0,0,0,.32)', border: '3px solid rgba(255,255,255,.55)' }}>
              {sidePhotos.map((url, i) => (
                <img key={url + i} src={url} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: i === photoIdx % sidePhotos.length ? 1 : 0, transition: 'opacity 1.2s ease-in-out' }} />
              ))}
            </div>
          )}
        </div>
        <p className="text-center text-white text-sm font-bold mt-2" style={{ opacity: 0.95 }}>{t('lunchOfferItems')}</p>
      </div>
    </section>
  );
}

const LUNCH_DRINKS = ['Coca-Cola', 'Coca-Cola Zero', 'Fanta', 'Uludağ Gazoz', 'Ayran', 'Wasser', 'Eistee Pfirsich'];

function DailySpecialCard({ item, isLunchWindow, go }) {
  const { lang, t } = React.useContext(LangContext);
  const displayPrice = isLunchWindow ? 9.5 : item.price;

  const orderNow = () => {
    if (!ORDERING_ENABLED) { go('tischmenu', item.cat ? { initialCatHint: item.cat } : undefined); return; }
    go('whatsapp', { pendingCombo: { title: item.name, price: displayPrice } });
  };

  return (
    <div className="daily-card rounded-2xl overflow-hidden flex flex-col" style={{ background: GREEN, boxShadow: '0 10px 30px rgba(21,56,38,.16)' }}>
      <div className="overflow-hidden"><img src={item.imgSrc} className="daily-card-img w-full h-40 object-cover" /></div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-white font-black text-lg mb-1">{mx(item.name, lang)}<AllergenTag alg={item.alg} /></div>
        <div className="text-xs font-medium mb-3" style={{ color: '#d9cdb4' }}>{mx(item.desc, lang)}</div>

        <div className="mt-auto flex items-center gap-3">
          <span className="font-black text-lg" style={{ color: GOLD }}>
            {fmt(displayPrice)}{isLunchWindow && <span className="text-[10px] font-bold ml-1" style={{ color: '#d9cdb4' }}>inkl. Getränk</span>}
          </span>
          {item.soldOut ? (
            <span className="px-4 py-2 rounded-full font-bold text-xs" style={{ background: '#8a7c62', color: '#fff' }}>{t('soldOutBadge')}</span>
          ) : (
            <button onClick={orderNow} className="px-4 py-2 rounded-full font-bold text-xs" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('orderNow')} →</button>
          )}
        </div>
      </div>
    </div>
  );
}

function ShowcaseCarousel() {
  const { t } = React.useContext(LangContext);
  const [paused, setPaused] = useState(false);
  const photos = [
    DOENER_TELLER_IMG, PIZZA_KAESE_IMG, CALZONE_IMG, DOENER_SPIESS_IMG, LAHMACUN_IMG,
    SPAGHETTI_IMG, SCHNITZEL_IMG, SALAT_BUNT_IMG, PIZZABROETCHEN_IMG, FALAFEL_IMG,
    PENNE_IMG, CHICKEN_STRIPS_IMG, BAUERNSALAT_IMG, NUGGETS_IMG, TERRACE_IMG,
  ];
  const loop = [...photos, ...photos];
  return (
    <section className="relative py-12 overflow-hidden" style={{ background: `linear-gradient(180deg, ${CREAM}, #f7ecd6)` }}>
      <style>{`
        @keyframes showcaseScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .showcase-track { animation: showcaseScroll 55s linear infinite; }
        .showcase-track.paused { animation-play-state: paused; }
        .showcase-card { transition: transform .35s ease, box-shadow .35s ease; }
        .showcase-card:hover { transform: translateY(-8px) scale(1.03); box-shadow: 0 22px 44px rgba(21,56,38,.28); }
      `}</style>
      <div className="text-center mb-8 px-5">
        <div className="text-xs font-bold tracking-[3px] mb-2" style={{ color: '#e4550a' }}>{t('galleryKitchen')}</div>
        <h2 className="font-black" style={{ fontSize: 'clamp(24px,4vw,34px)', color: GREEN }}>{t('showcaseTitle')}</h2>
      </div>
      <div
        className="flex gap-5 w-max px-5 showcase-track"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {loop.map((src, i) => (
          <div key={i} className="showcase-card flex-shrink-0 rounded-3xl overflow-hidden" style={{ width: 230, height: 300, boxShadow: '0 14px 34px rgba(21,56,38,.18)' }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

function DailySpecial({ go }) {
  const { lang, t } = React.useContext(LangContext);
  const [now, setNow] = useState(new Date());
  const [photoOverrides, setPhotoOverrides] = useState({});
  const [tischPhotos, setTischPhotos] = useState({});
  const [priceOverrides, setPriceOverrides] = useState({});
  const [soldOutIds, setSoldOutIds] = useState([]);
  useEffect(() => {
    safeGet('siteconfig:photoOverrides').then((r) => { if (r) setPhotoOverrides(r); });
    safeListPrefix('tischphoto:', 500).then((rows) => {
      const map = {};
      rows.forEach((r) => { if (r.value?.url) map[r.key.replace(/^tischphoto:/, '')] = r.value.url; });
      setTischPhotos(map);
    });
    safeGet('siteconfig:priceOverrides').then((r) => { if (r) setPriceOverrides(r); });
    safeGet('siteconfig:soldOut').then((r) => { if (r) setSoldOutIds(r); });
  }, []);
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const day = now.getDay();
  const entry = DAILY_SPECIALS[day];
  const imgMap = { g1: FOOD_G1, g2: FOOD_G2, g3: FOOD_G3, g4: FOOD_G4, g5: FOOD_G5, schnitzel: SCHNITZEL_IMG, spaghetti: SPAGHETTI_IMG };
  const days = DAY_NAMES[lang] || DAY_NAMES.de;

  const isLunchDay = isTuesdayOpenNow(now) ? [1, 2, 3, 4, 5].includes(day) : [1, 3, 4, 5].includes(day);
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
    return null; // Samstag-Kampagne wird bereits ganz oben auf der Seite gezeigt
  }

  if (day === 2 && !isTuesdayOpenNow(now)) {
    return (
      <section id="tagesempfehlung" className="max-w-7xl mx-auto px-5 lg:px-10 py-4">
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
    <section id="tagesempfehlung" className="max-w-7xl mx-auto px-5 lg:px-10 py-4">
      <div className="flex justify-center mb-4">
        <div className="px-6 py-2.5 rounded-full font-black text-sm sm:text-base tracking-[2px] text-center" style={{ background: GREEN, color: GOLD, animation: 'goldGlow 2.6s ease-in-out infinite' }}>
          ⭐ {t('dailyRecommendation')} · {days[day].toUpperCase()} ⭐
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {entry.items.map((item, i) => {
          const menuMatch = findMenuItemByName(item.name);
          const overrideImg = menuMatch ? (photoOverrides[menuMatch.id] || tischPhotos['imp-' + menuMatch.id] || tischPhotos[menuMatch.id]) : null;
          const priceOv = menuMatch ? priceOverrides[menuMatch.id] : null;
          const overridePrice = priceOv ? (priceOv.price !== undefined ? priceOv.price : priceOv.large) : null;
          const isSoldOut = menuMatch ? soldOutIds.includes(menuMatch.id) : false;
          return (
          <div key={i} style={{ animation: `cardIn .6s cubic-bezier(.22,1,.36,1) ${i * 0.12}s both` }}>
            <DailySpecialCard item={{ ...item, price: overridePrice !== null && overridePrice !== undefined ? overridePrice : item.price, imgSrc: overrideImg || imgMap[item.img], soldOut: isSoldOut, alg: menuMatch?.alg }} isLunchWindow={isLunchWindow} go={go} />
          </div>
          );
        })}
      </div>

      <WeekendTeaser go={go} />
    </section>
  );
}

function HomeView({ go, installPrompt, onInstall, cartCount }) {
  const { lang, setLang, t } = React.useContext(LangContext);
  const weather = useWeather();
  const windSway = (base = '', dur = 2.6, delay = 0) => weather?.windy ? `${base ? base + ', ' : ''}windSway ${dur}s ease-in-out ${delay}s infinite` : (base || undefined);
  const [navOpen, setNavOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [gameOpen, setGameOpen] = useState(false);
  const logoClickTimer = useRef(null);
  const handleLogoClick = () => {
    setLogoClicks((c) => {
      const nc = c + 1;
      if (nc >= 3) { setGameOpen(true); return 0; }
      return nc;
    });
    clearTimeout(logoClickTimer.current);
    logoClickTimer.current = setTimeout(() => setLogoClicks(0), 1500);
  };
  const [lightbox, setLightbox] = useState(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [surpriseItem, setSurpriseItem] = useState(null);
  const [wishModalOpen, setWishModalOpen] = useState(false);
  const [homeSoldOutIds, setHomeSoldOutIds] = useState([]);
  const [homePriceOverrides, setHomePriceOverrides] = useState({});
  const [homePhotoOverrides, setHomePhotoOverrides] = useState({});
  useEffect(() => {
    safeGet('siteconfig:soldOut').then((r) => { if (r) setHomeSoldOutIds(r); });
    safeGet('siteconfig:priceOverrides').then((r) => { if (r) setHomePriceOverrides(r); });
    safeGet('siteconfig:photoOverrides').then((r) => { if (r) setHomePhotoOverrides((prev) => ({ ...r, ...prev })); });
    safeListPrefix('tischphoto:', 500).then((rows) => {
      const map = {};
      rows.forEach((r) => { if (r.value?.url) { const id = r.key.replace(/^tischphoto:/, '').replace(/^imp-/, ''); map[id] = r.value.url; } });
      setHomePhotoOverrides((prev) => ({ ...map, ...prev }));
    });
  }, []);
  const HOME_EFFECTIVE_MENU = useMemo(() => applyPriceOverrides(homePriceOverrides, homePhotoOverrides, homeSoldOutIds), [homePriceOverrides, homePhotoOverrides, homeSoldOutIds]);
  const HOME_SURPRISE_ITEMS = useMemo(() => buildSurpriseItems(HOME_EFFECTIVE_MENU), [HOME_EFFECTIVE_MENU]);
  const [dailyBanner, setDailyBanner] = useState(null);
  useEffect(() => { safeGet('siteconfig:dailyBanner').then((r) => { if (r && r.text && (!r.expiresAt || r.expiresAt > Date.now())) setDailyBanner(r); }); }, []);
  const [extraGalleryPhotos, setExtraGalleryPhotos] = useState([]);
  useEffect(() => { safeGet('siteconfig:extraGalleryPhotos').then((r) => { if (r) setExtraGalleryPhotos(r); }); }, []);
  const [hiddenPhotos, setHiddenPhotos] = useState([]);
  useEffect(() => { safeGet('siteconfig:hiddenPhotos').then((r) => { if (r) setHiddenPhotos(r); }); }, []);
  const [surpriseRolling, setSurpriseRolling] = useState(false);
  const rollSurprise = () => {
    setSurpriseRolling(true);
    let pool = isWeekendDay() ? HOME_SURPRISE_ITEMS : HOME_SURPRISE_ITEMS.filter((i) => !i.weekend);
    pool = pool.filter((i) => !i.soldOut);
    let count = 0;
    const maxCount = 16;
    const spin = () => {
      setSurpriseItem(pool[Math.floor(Math.random() * pool.length)]);
      count++;
      if (count < maxCount) {
        setTimeout(spin, 70 + count * 12);
      } else {
        setSurpriseRolling(false);
      }
    };
    spin();
  };
  const confirmSurprise = () => {
    const item = surpriseItem;
    if (!item) return;
    if (!ORDERING_ENABLED) { setSurpriseItem(null); go('tischmenu', item.cat ? { initialCatHint: item.cat } : undefined); return; }
    if (isLunchWindowNow() && LUNCH_CATEGORIES.includes(item.cat)) {
      go('whatsapp', { lunchSurprise: { label: mx(item.name, lang), deLabel: item.name } });
    } else if (new Date().getDay() === 6 && item.cat === 'pizza') {
      go('whatsapp', { pendingCombo: { title: `${item.name} (28cm Kombo inkl. Getränk)`, price: PIZZA_COMBO_PRICE } });
    } else if (new Date().getDay() === 6 && item.cat === 'kebap') {
      go('whatsapp', { pendingCombo: { title: DOENER_COMBO.title, price: DOENER_COMBO.price } });
    } else {
      go('whatsapp', { pendingCombo: { title: item.name, price: item.price } });
    }
    setSurpriseItem(null);
  };
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    try {
      const last = localStorage.getItem('bk_last_visit');
      const now = Date.now();
      if (last && now - parseInt(last, 10) > 10 * 24 * 60 * 60 * 1000) setShowWelcomeBack(true);
      localStorage.setItem('bk_last_visit', String(now));
      const favs = JSON.parse(localStorage.getItem('bk_favorites') || '[]');
      setFavorites(favs);
    } catch {}
  }, []);
  useEffect(() => {
    if (lightbox) { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }
  }, [lightbox]);
  const now = useLiveClock();
  const liveViewers = useLiveViewerCount();
  const status = getOpenStatus(now);
  useEffect(() => { logVisit(lang); }, []);
  // Hinweis: Die automatischen Push-Benachrichtigungen für "Samstag-Angebot"
  // und "Montags-Erinnerung" werden seit [Datum] nicht mehr hier im Frontend
  // (abhängig von einem zufälligen Website-Besuch) ausgelöst, sondern
  // zuverlässig server-seitig über Vercel Cron Jobs (siehe /api/cron-samstag
  // und /api/cron-montag, konfiguriert in vercel.json). Die Ein/Aus-Schalter
  // in Einstellungen → Kommunikation funktionieren weiterhin unverändert,
  // da die Cron-Jobs denselben "siteconfig:pushTriggers"-Wert auslesen.
  const HERO_IMAGES_RAW = [TERRACE_IMG, SPAGHETTI_IMG, CALZONE_IMG, FALAFEL_IMG, LAHMACUN_IMG, PIZZABROETCHEN_IMG, PENNE_IMG, PIZZA_KAESE_IMG, DOENER_SPIESS_IMG, SALAT_BUNT_IMG, NUGGETS_IMG, CHICKEN_STRIPS_IMG, BAUERNSALAT_IMG, POMMES_IMG, DOENER_TELLER_IMG, SCHNITZEL_IMG, ...extraGalleryPhotos].filter((src) => !hiddenPhotos.includes(src));
  const HERO_IMAGES_UNSHUFFLED = HERO_IMAGES_RAW.length > 0 ? HERO_IMAGES_RAW : [TERRACE_IMG];
  const HERO_IMAGES = useMemo(() => {
    const arr = [...HERO_IMAGES_UNSHUFFLED];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [HERO_IMAGES_UNSHUFFLED.length]);
  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(iv);
  }, [HERO_IMAGES.length]);
  const scrollTo = (id) => {
    setNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ background: `${CREAM} repeating-linear-gradient(135deg, rgba(21,56,38,.025) 0 40px, rgba(21,56,38,0) 40px 80px)`, fontFamily: "'Segoe UI', Arial, sans-serif", minHeight: '100vh', animation: 'pageFade .7s cubic-bezier(.25,.46,.45,.94)' }}>
      <style>{`
        @keyframes pageFade { from{ opacity:0;} to{ opacity:1;} }
        @keyframes confettiFall { 0%{ transform:translateY(-20px) rotate(0deg); opacity:1;} 80%{ opacity:1;} 100%{ transform:translateY(105vh) rotate(var(--spin, 480deg)); opacity:0;} }
        @keyframes popIn { 0%{ opacity:0; transform:scale(.6) rotate(-8deg);} 60%{ opacity:1; transform:scale(1.08) rotate(3deg);} 100%{ opacity:1; transform:scale(1) rotate(0deg);} }
        @keyframes cardIn { from{ opacity:0; transform:translateY(22px) scale(.97);} to{ opacity:1; transform:translateY(0) scale(1);} }
        @keyframes floatY { 0%,100%{ transform:translateY(0px) rotate(-3deg);} 50%{ transform:translateY(-10px) rotate(3deg);} }
        @keyframes sideFloatHome1 { 0%,100%{ transform:translateY(0) rotate(-8deg);} 50%{ transform:translateY(-24px) rotate(8deg);} }
        @keyframes sideFloatHome2 { 0%,100%{ transform:translateY(0) rotate(6deg);} 50%{ transform:translateY(-32px) rotate(-6deg);} }
        @keyframes sideSpinHome { from{ transform:rotate(0deg);} to{ transform:rotate(360deg);} }
        @keyframes windSway { 0%,100%{ transform:rotate(-1.4deg) translateX(-1px);} 50%{ transform:rotate(1.4deg) translateX(1px);} }
        @keyframes floatY2 { 0%,100%{ transform:translateY(0px) rotate(4deg);} 50%{ transform:translateY(-14px) rotate(-4deg);} }
        @keyframes ctaGlow { 0%,100%{ box-shadow:0 0 0 0 rgba(255,106,26,.55);} 50%{ box-shadow:0 0 0 10px rgba(255,106,26,0);} }
        @keyframes quickOrderShimmer { 0%{ background-position: 0% 0; } 100%{ background-position: 200% 0; } }
        @keyframes quickOrderPulse { 0%,100%{ transform: scale(1); } 50%{ transform: scale(1.015); } }
        @keyframes urgentPulse { 0%,100%{ box-shadow:0 0 0 0 rgba(214,40,40,.55);} 50%{ box-shadow:0 0 0 10px rgba(214,40,40,0);} }
        @keyframes goldGlow { 0%,100%{ box-shadow:0 0 0 0 rgba(255,199,56,.45);} 50%{ box-shadow:0 0 14px 4px rgba(255,199,56,.35);} }
        @keyframes liveDot { 0%,100%{ opacity:1; transform:scale(1);} 50%{ opacity:.4; transform:scale(.7);} }
        @keyframes closedBlink { 0%,100%{ opacity:1;} 50%{ opacity:.25;} }
        @keyframes cartBadgePulse { 0%,100%{ box-shadow:0 4px 14px rgba(21,56,38,.4), 0 0 0 0 rgba(230,90,10,.4);} 50%{ box-shadow:0 4px 14px rgba(21,56,38,.4), 0 0 0 8px rgba(230,90,10,0);} }
        button, a { transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease, opacity .18s ease; }
        button:active { transform: scale(.97); }
        @keyframes shine { 0%{ background-position:-300px 0;} 100%{ background-position:300px 0;} }
        .feature-card{ transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease; transform-style: preserve-3d; }
        .feature-card:hover{ transform: perspective(700px) rotateX(4deg) rotateY(-4deg) translateY(-8px) scale(1.02); box-shadow:0 22px 44px rgba(21,56,38,.26); }
        .feature-card:hover .icon-wobble{ animation: floatY .9s ease-in-out infinite; }
        .feature-card:hover .feature-card-bg{ opacity: .16; transform: scale(1.08); }
        .gallery-img{ transition: transform .4s ease, filter .4s ease; }
        .daily-card{ transition: transform .3s ease, box-shadow .3s ease; }
        .daily-card:hover{ transform: translateY(-4px); box-shadow: 0 16px 34px rgba(21,56,38,.24); }
        .daily-card-img{ transition: transform .5s ease; }
        .daily-card:hover .daily-card-img{ transform: scale(1.06); }
        .combo-card{ transition: transform .3s ease, box-shadow .3s ease; }
        .combo-card:hover{ transform: translateY(-4px); }
        .gallery-img:hover{ transform: scale(1.05); filter: brightness(1.05); }
        .cta-pulse{ animation: ctaGlow 2.2s ease-out infinite; }
        .quick-order-btn{ animation: quickOrderShimmer 3s linear infinite, quickOrderPulse 2.4s ease-in-out infinite; }
        .hero-float{ animation: floatY 4.5s ease-in-out infinite; }
        .hero-float2{ animation: floatY2 5.5s ease-in-out infinite; }
      `}</style>

      {/* Dekoration für sehr breite Bildschirme */}
      <div className="hidden 2xl:flex flex-col items-center gap-12 fixed left-8 top-1/3 opacity-80 pointer-events-none z-0">
        <span style={{ fontSize: 44, animation: 'sideFloatHome1 5.5s ease-in-out infinite' }}>🥙</span>
        <span style={{ fontSize: 34, animation: 'sideSpinHome 8s linear infinite', display: 'inline-block' }}>🍕</span>
        <span style={{ fontSize: 30, animation: 'sideFloatHome2 4.8s ease-in-out infinite' }}>🍝</span>
      </div>
      <div className="hidden 2xl:flex flex-col items-center gap-12 fixed right-8 top-1/4 opacity-90 pointer-events-none z-10">
        {ORDERING_ENABLED && (
          <button onClick={() => go('group')} className="pointer-events-auto flex flex-col items-center gap-1.5 px-4 py-4 rounded-2xl text-center" style={{ background: ORANGE, animation: 'goldGlow 2.2s ease-in-out infinite', boxShadow: '0 10px 26px rgba(255,106,26,.4)' }}>
            <span style={{ fontSize: 30 }}>👥</span>
            <span className="text-white font-black text-[11px] leading-tight">{t('featGroupTitle')}!</span>
            <span className="text-white font-semibold text-[9px] opacity-90">{t('weiter')}</span>
          </button>
        )}
        <span style={{ fontSize: 30, animation: 'sideFloatHome1 5s ease-in-out infinite' }}>🥤</span>
        <span style={{ fontSize: 34, animation: 'sideSpinHome 7s linear infinite reverse', display: 'inline-block' }}>🔥</span>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40" style={{ background: GREEN }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-3.5 flex items-center justify-between">
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <img src={LOGO_ICON} alt="Bodrum Kebap Vechta" onClick={handleLogoClick} className="w-10 h-10 rounded-full object-contain cursor-pointer" style={{ background: CREAM, padding: 3 }} />
            <div>
              <div className="text-white font-black text-sm leading-tight">BODRUM KEBAP</div>
              <div className="text-[10px] font-bold tracking-[3px]" style={{ color: GOLD }}>VECHTA</div>
            </div>
            <div className="flex items-center gap-1.5 ml-1 sm:ml-2 px-2 sm:px-2.5 py-1 rounded-full" style={{ background: status.soon ? 'rgba(255,199,56,.16)' : status.open ? 'rgba(255,246,234,.08)' : 'rgba(214,40,40,.16)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.soon ? GOLD : status.open ? '#4ade80' : '#ff4d4d', animation: status.soon ? 'liveDot 1.2s ease-in-out infinite' : status.open ? 'liveDot 1.6s ease-in-out infinite' : 'closedBlink 1.1s ease-in-out infinite' }} />
              <span className="text-[10.5px] font-black" style={{ color: status.soon ? GOLD : status.open ? '#4ade80' : '#ff6b6b' }}>{t(status.labelKey)}{!status.open && status.nextOpen && <span className="opacity-80 font-bold"> · {formatCountdown(status.nextOpen - now)}</span>}</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            {ORDERING_ENABLED ? <button onClick={() => go('whatsapp')} className="text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('navMenu')}</button> : <button onClick={() => go('tischmenu')} className="text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('navMenu')}</button>}
            <button onClick={() => scrollTo('galerie')} className="text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('navGallery')}</button>
            <button onClick={() => setWishModalOpen(true)} className="text-sm font-semibold" style={{ color: '#d9cdb4' }}>💡 {t('wishBoxNavLabel')}</button>
            <button onClick={() => go('staff')} className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#d9cdb4' }}><Lock size={13} /> {t('navStaff')}</button>
            {installPrompt && (
              <button onClick={onInstall} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(255,199,56,.16)', color: GOLD, border: '1px solid rgba(255,199,56,.4)' }}>{t('installAppBtn')}</button>
            )}
            <LanguageSwitcher lang={lang} setLang={setLang} dark />
            <a href="https://instagram.com/BodrumKebapVechta" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)' }} title="@BodrumKebapVechta">
              <Instagram size={16} color="#fff" />
            </a>
            {ORDERING_ENABLED && <button onClick={() => go('whatsapp')} className="cta-pulse px-5 py-2.5 rounded-full font-bold text-sm" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.4)' }}>{t('orderNow')}</button>}
            {!ORDERING_ENABLED && <a href="tel:+4944419516104" onClick={() => logEvent('call')} className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.4)' }}><Phone size={15} /> 04441 95 16 104</a>}
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher lang={lang} setLang={setLang} dark />
            <button onClick={() => setNavOpen((v) => !v)} className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, boxShadow: '0 4px 14px rgba(230,90,10,.45)' }}>
              {navOpen ? <X size={19} color="#fff" /> : <MenuIcon size={19} color="#fff" />}
            </button>
          </div>
        </div>
        {navOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col" style={{ background: `radial-gradient(circle at 85% 0%, rgba(255,199,56,.12), transparent 50%), rgba(10,24,15,.6)`, backdropFilter: 'blur(22px) saturate(1.5)', WebkitBackdropFilter: 'blur(22px) saturate(1.5)', animation: 'pageFade .3s ease-out' }}>
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, boxShadow: '0 4px 14px rgba(230,90,10,.4)' }}><img src={LOGO_ICON} alt="" className="w-full h-full object-cover" /></div>
                <div>
                  <div className="text-white font-black text-sm leading-tight">BODRUM KEBAP</div>
                  <div className="font-bold text-[10px] tracking-widest" style={{ color: GOLD }}>VECHTA</div>
                </div>
              </div>
              <button onClick={() => setNavOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.18)' }}>
                <X size={18} color="#fff" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pt-6 flex flex-col gap-2.5">
              {[
                { onClick: () => (ORDERING_ENABLED ? go('whatsapp') : go('tischmenu')), icon: '📋', label: t('navMenu') },
                { onClick: () => scrollTo('galerie'), icon: '🖼️', label: t('navGallery') },
                { onClick: () => { setNavOpen(false); setWishModalOpen(true); }, icon: '💡', label: t('wishBoxNavLabel') },
              ].map((item, i) => (
                <button key={i} onClick={item.onClick} className="flex items-center gap-4 py-3.5 px-3.5 rounded-2xl" style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.1)' }}>
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'rgba(255,199,56,.14)' }}>{item.icon}</span>
                  <span className="font-bold text-base text-white">{item.label}</span>
                  <ArrowRight size={16} color="rgba(255,246,234,.35)" className="ml-auto" />
                </button>
              ))}
              <a href="https://instagram.com/BodrumKebapVechta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 py-3.5 px-3.5 rounded-2xl" style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.1)' }}>
                <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,199,56,.14)' }}><Instagram size={17} color={GOLD} /></span>
                <span className="font-bold text-base text-white">@BodrumKebapVechta</span>
                <ArrowRight size={16} color="rgba(255,246,234,.35)" className="ml-auto" />
              </a>
              <button onClick={() => go('staff')} className="flex items-center gap-4 py-3.5 px-3.5 rounded-2xl" style={{ background: 'rgba(255,255,255,.04)' }}>
                <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,.06)' }}><Lock size={15} color="rgba(217,205,180,.7)" /></span>
                <span className="font-semibold text-sm" style={{ color: 'rgba(217,205,180,.7)' }}>{t('navStaffArea')}</span>
              </button>
              {installPrompt && (
                <button onClick={onInstall} className="flex items-center gap-4 py-3.5 px-3.5 rounded-2xl" style={{ background: 'rgba(255,199,56,.08)' }}>
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,199,56,.14)' }}>📲</span>
                  <span className="font-semibold text-sm" style={{ color: GOLD }}>{t('installAppBtn')}</span>
                </button>
              )}
            </div>

            <div className="px-6 pb-8 pt-3">
              {ORDERING_ENABLED
                ? <button onClick={() => go('whatsapp')} className="w-full py-4 rounded-2xl font-black text-base text-center text-white" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, boxShadow: '0 10px 26px rgba(230,90,10,.4)' }}>{t('orderNow')}</button>
                : <a href="tel:+4944419516104" onClick={() => logEvent('call')} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-base text-center text-white" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, boxShadow: '0 10px 26px rgba(230,90,10,.4)' }}><Phone size={17} /> 04441 95 16 104</a>}
            </div>
          </div>
        )}
      </header>
      <CampaignBanner />
      <MittagsBanner menu={HOME_EFFECTIVE_MENU} onPhotoClick={setLightbox} />
      {now.getDay() === 6 && <WeekendComboPromo go={go} top />}
      {dailyBanner && (
        <div className="mx-4 mt-3 mb-1 rounded-2xl overflow-hidden" style={{ background: GREEN, boxShadow: '0 10px 28px rgba(21,56,38,.3)', border: `1.5px solid ${GOLD}` }}>
          {dailyBanner.img && <img src={dailyBanner.img} alt="" onClick={() => setLightbox(dailyBanner.img)} className="w-full h-40 object-cover cursor-pointer" />}
          <div className="flex items-center gap-2.5 px-4 py-3.5">
            <span className="text-xl flex-shrink-0">📣</span>
            <span className="font-bold text-sm" style={{ color: GOLD }}>{dailyBanner.text}</span>
          </div>
        </div>
      )}
      {showWelcomeBack && (
        <div className="py-2.5 px-5 text-center text-sm font-bold relative" style={{ background: GOLD, color: GREEN }}>
          {t('welcomeBackMsg')}
          <button onClick={() => setShowWelcomeBack(false)} className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(21,56,38,.12)' }}><X size={13} color={GREEN} /></button>
        </div>
      )}

      {/* HERO */}
      <section className="relative overflow-hidden">
        {HERO_IMAGES.map((img, i) => (
          <div key={img} className="absolute inset-0" style={{ backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundPosition: img === TERRACE_IMG ? 'center 15%' : 'center', opacity: i === heroIdx ? 1 : 0, transition: 'opacity 1.8s ease-in-out', zIndex: 0 }} />
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(21,56,38,.55), rgba(21,56,38,.72))', zIndex: 1 }} />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {HERO_IMAGES.map((_, i) => (
            <span key={i} style={{ width: i === heroIdx ? 16 : 6, height: 6, borderRadius: 3, background: i === heroIdx ? GOLD : 'rgba(255,246,234,.4)', transition: 'all .4s ease' }} />
          ))}
        </div>
        <div className="hero-float absolute text-5xl select-none pointer-events-none opacity-20" style={{ top: '8%', left: '4%', zIndex: 2 }}>🥙</div>
        <div className="hero-float2 absolute text-5xl select-none pointer-events-none opacity-20" style={{ bottom: '10%', right: '6%', zIndex: 2 }}>🍕</div>
        <div className="hero-float absolute text-4xl select-none pointer-events-none opacity-15 hidden lg:block" style={{ top: '55%', left: '46%', zIndex: 2 }}>🔥</div>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 pt-6 pb-16 lg:pt-8 lg:pb-24 grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-2" style={{ background: 'rgba(255,199,56,.15)', color: GOLD, border: '1px solid rgba(255,199,56,.4)', animation: 'softFloat 4s ease-in-out infinite' }}>{getGreeting(now)} · ☪ {t('heroHalal')}</div>
            {liveViewers > 1 && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold mb-5" style={{ background: 'rgba(74,222,128,.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,.3)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80', animation: 'liveDot 1.6s ease-in-out infinite' }} /> {liveViewers} {t('liveViewers')}
              </div>
            )}
            <h1 className="text-white font-black leading-[1.05] mb-4" style={{ fontSize: 'clamp(34px,5vw,58px)', textShadow: '0 4px 24px rgba(0,0,0,.35), 0 2px 0 rgba(0,0,0,.15)', letterSpacing: '-0.01em' }}>{t('heroTitle1')}<br /><span style={{ color: ORANGE, textShadow: '0 4px 20px rgba(230,90,10,.5)' }}>{t('heroTitle2')}</span></h1>
            <p className="text-base mb-6 max-w-md" style={{ color: '#d9cdb4' }}>{t('heroSubtitle')}</p>
            <div className="h-48 sm:h-56" />
            {!ORDERING_ENABLED && (
              <div className="flex flex-wrap gap-3 mb-5">
                <button
                  onClick={() => { logEvent('hero_menu'); go('tischmenu'); }}
                  className="h-12 flex items-center gap-2 px-5 rounded-xl font-bold text-sm"
                  style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, color: '#fff', boxShadow: '0 10px 24px rgba(230,90,10,.4)', animation: windSway('goldGlow 2.4s ease-in-out infinite', 2.4, 0) }}
                >
                  <span className="text-lg">📋</span> {t('navMenu')}
                  <ArrowRight size={16} />
                </button>
                <a
                  href="tel:+4944419516104"
                  onClick={() => logEvent('call')}
                  className="h-12 flex items-center gap-2 px-5 rounded-xl font-bold text-sm"
                  style={{ background: GOLD, color: GREEN, boxShadow: '0 8px 20px rgba(255,199,56,.3)' }}
                >
                  <Phone size={16} /> 04441 / 95 16 104
                </a>
              </div>
            )}
            {ORDERING_ENABLED && (
              <>
                <button
                  onClick={() => go('whatsapp', { focusSearch: true })}
                  className="quick-order-btn w-full sm:w-auto flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-base mb-5 relative overflow-hidden"
                  style={{ background: `linear-gradient(120deg, #ff3d68, #ff6a1a 55%, ${GOLD})`, backgroundSize: '200% 100%', color: '#fff', boxShadow: '0 14px 34px rgba(255,61,104,.4)' }}
                >
                  <span className="text-2xl relative">🔢</span>
                  <span className="relative">{t('quickOrderByNumberBtn')}</span>
                  <ArrowRight size={18} className="relative ml-auto sm:ml-1" />
                </button>
                <div className="flex flex-wrap gap-3 mb-3">
                  <button onClick={() => go('whatsapp')} className="cta-pulse px-6 py-3.5 rounded-full font-bold text-sm" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, color: '#fff', boxShadow: '0 10px 26px rgba(230,90,10,.45)' }}>{t('heroCtaWhatsapp')}</button>
                </div>
                <button onClick={() => go('group')} className="w-full sm:w-auto flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm" style={{ background: GOLD, color: GREEN, animation: 'goldGlow 2.2s ease-in-out infinite', boxShadow: '0 8px 22px rgba(255,199,56,.35)' }}>
                  <span className="text-lg">👥</span> {t('heroCtaGroup')}
                </button>
                <button onClick={() => go('builder')} className="w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl font-black text-base mt-4" style={{ background: `linear-gradient(135deg, ${GOLD}, #ffdb70)`, color: GREEN, boxShadow: '0 12px 30px rgba(255,199,56,.45)', animation: 'goldGlow 2.4s ease-in-out infinite' }}>
                  <span className="text-2xl">🧩</span> {t('builderQuickLabel')}
                </button>
              </>
            )}
            <div className="grid gap-2 mt-3" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
              <button onClick={() => { logEvent('hero_tagesempfehlung'); scrollTo('tagesempfehlung'); }} className="h-12 flex items-center justify-center gap-1.5 px-1.5 rounded-xl font-black text-[10px] text-center leading-tight" style={{ background: GOLD, color: GREEN, boxShadow: '0 8px 20px rgba(255,199,56,.35)', animation: windSway('', 2.6, 0.15) }}>
                <span className="text-base flex-shrink-0">⭐</span> <span className="truncate">{t('dailyRecommendation')}</span>
              </button>
              <button onClick={() => { logEvent('hero_wish'); setWishModalOpen(true); }} className="h-12 flex items-center justify-center gap-1.5 px-1.5 rounded-xl font-black text-[10px] text-center text-white leading-tight" style={{ background: 'linear-gradient(135deg, #2d6a4f, #52a074)', boxShadow: '0 8px 20px rgba(45,106,79,.35)', animation: windSway('', 2.8, 0.3) }}>
                <span className="text-base flex-shrink-0">💡</span> <span className="truncate">{t('wishBoxNavLabel')}</span>
              </button>
              <button onClick={() => { logEvent('hero_surprise'); rollSurprise(); }} className="h-12 flex items-center justify-center gap-1.5 px-1.5 rounded-xl font-black text-[10px] text-center text-white leading-tight" style={{ background: 'linear-gradient(135deg, #2f9e8f, #3fc4b0)', boxShadow: '0 8px 20px rgba(47,158,143,.35)', animation: windSway('', 3.0, 0.45) }}>
                <span className="text-base flex-shrink-0">🎲</span> <span className="truncate">{t('surpriseMeBtn')}</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5 mt-2.5">
              {ORDERING_ENABLED && <button onClick={() => go('track')} className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs" style={{ background: 'rgba(255,246,234,.12)', color: CREAM, border: '1px solid rgba(255,246,234,.3)' }}>📦 {t('navTrackOrder')}</button>}
              {installPrompt && (
                <button onClick={onInstall} className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs" style={{ background: 'rgba(255,199,56,.16)', color: GOLD, border: '1px solid rgba(255,199,56,.4)' }}>{t('installAppBtn')}</button>
              )}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Oyther+Stra%C3%9Fe+37%2C+49377+Vechta"
                target="_blank" rel="noopener noreferrer"
                onClick={() => logEvent('route')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs text-white"
                style={{ background: `linear-gradient(135deg, #ff3b3b, ${CHILI})`, boxShadow: '0 6px 16px rgba(255,30,30,.4)' }}
              >
                📍 {t('contactRoute')}
              </a>
              <button onClick={() => scrollTo('nachricht')} className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs" style={{ background: 'rgba(255,246,234,.12)', color: CREAM, border: '1px solid rgba(255,246,234,.3)' }}>{t('contactMsgTitle')}</button>
            </div>
          </div>
          <div className="rounded-2xl p-6 hidden lg:block relative" style={{ background: 'rgba(255,253,249,.97)' }}>
            <div className="flex justify-between py-2.5 text-sm" style={{ borderBottom: '1px dashed #e3d5bd' }}><span className="font-semibold" style={{ color: '#7a6a52' }}>{t('heroOpeningHours')}</span><span className="font-bold" style={{ color: GREEN }}>{lang === 'de' ? 'Täglich 11:30–22:00' : '11:30–22:00'}</span></div>
            {!isTuesdayOpenNow(new Date()) && <div className="flex justify-between py-2.5 text-sm" style={{ borderBottom: '1px dashed #e3d5bd' }}><span className="font-semibold" style={{ color: '#7a6a52' }}>{t('heroClosedDay')}</span><span className="font-bold" style={{ color: CHILI }}>{lang === 'de' ? 'Dienstag' : lang === 'en' ? 'Tuesday' : lang === 'tr' ? 'Salı' : lang === 'ro' ? 'Marți' : lang === 'sq' ? 'E martë' : lang === 'ku' ? 'Sêşem' : 'Dinsdag'}</span></div>}
            <div className="flex justify-between py-2.5 text-sm"><span className="font-semibold" style={{ color: '#7a6a52' }}>{t('heroAddress')}</span><span className="font-bold text-right" style={{ color: GREEN }}>Oyther Straße 37,<br />49377 Vechta</span></div>
            <img src={CALZONE_IMG} className="hidden xl:block absolute rounded-2xl object-cover" style={{ width: 92, height: 92, top: -22, right: -22, border: `4px solid ${CREAM}`, boxShadow: '0 10px 24px rgba(21,56,38,.3)', transform: 'rotate(9deg)' }} />
            <img src={PENNE_IMG} className="hidden xl:block absolute rounded-2xl object-cover" style={{ width: 78, height: 78, bottom: -18, left: -18, border: `4px solid ${CREAM}`, boxShadow: '0 10px 24px rgba(21,56,38,.3)', transform: 'rotate(-8deg)' }} />
          </div>
        </div>
        <svg viewBox="0 0 1440 60" className="w-full block relative z-10" style={{ marginBottom: -1 }} preserveAspectRatio="none"><path d="M0,32 C240,64 480,0 720,20 C960,40 1200,60 1440,24 L1440,60 L0,60 Z" fill={CREAM} /></svg>
      </section>

      {/* SHOWCASE GALLERY */}
      <ShowcaseCarousel />

      {/* DAILY SPECIAL */}
      <DailySpecial go={go} />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* EXTRAS */}
      {ORDERING_ENABLED && favorites.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 lg:px-10 pt-8">
          <div className="text-xs font-bold tracking-widest mb-3 flex items-center gap-1.5" style={{ color: '#a4906c' }}><Heart size={13} fill={CHILI} color={CHILI} /> {t('favoritesTitle')}</div>
          <div className="flex gap-2.5 overflow-x-auto pb-2">
            {favorites.map((id) => {
              const item = findMenuItemById(id);
              if (!item) return null;
              return (
                <button key={id} onClick={() => go('whatsapp')} className="flex-none px-4 py-2.5 rounded-full text-xs font-bold" style={{ background: '#fff', color: GREEN, border: '1px solid #e3d5bd', boxShadow: '0 4px 12px rgba(21,56,38,.08)' }}>
                  ❤️ {mx(item.name, lang)}
                </button>
              );
            })}
          </div>
        </section>
      )}
      {ORDERING_ENABLED && (
      <section id="extras" className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <Reveal className="text-center mb-9">
          <div className="text-xs font-bold tracking-[3px] mb-2" style={{ color: '#e4550a' }}>{t('extrasKicker')}</div>
          <h2 className="font-black" style={{ fontSize: 'clamp(26px,4vw,36px)', color: GREEN }}>{t('extrasTitle')}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard index={0} icon="📱" title={t('featWaTitle')} sub={t('featWaSub')} color="#25D366" onClick={() => go('whatsapp')} img={DOENER_SPIESS_IMG} />
          <FeatureCard index={1} icon="🧩" title={t('featBuilderTitle')} sub={t('featBuilderSub')} color={GREEN} onClick={() => go('builder')} img={PIZZA_KAESE_IMG} />
          <FeatureCard index={2} icon="👥" title={t('featGroupTitle')} sub={t('featGroupSub')} color="#2b5c41" onClick={() => go('group')} img={CALZONE_IMG} />
          <FeatureCard index={3} icon="🎲" title={t('surpriseMeBtn')} sub={t('featSurpriseSub')} color={GOLD} textColor={GREEN} onClick={rollSurprise} img={PENNE_IMG} />
        </div>
        <p className="text-center text-xs font-medium mt-6" style={{ color: '#a4906c' }}>{t('extrasTip')}</p>
      </section>
      )}

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
        <div className="columns-2 lg:columns-4 gap-3 [column-fill:_balance]">
          {SITE_PHOTOS.filter((p) => !hiddenPhotos.includes(p.src)).map((p, idx) => (
            <img key={p.src} src={p.src} onClick={() => setLightbox(p.src)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 160 + (idx % 5) * 22 }} />
          ))}
          {extraGalleryPhotos.map((src, idx) => (
            <img key={idx} src={src} onClick={() => setLightbox(src)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 190 + (idx % 3) * 25 }} />
          ))}
        </div>
      </section>

      {surpriseItem && (() => {
        const isLunchOffer = isLunchWindowNow() && LUNCH_CATEGORIES.includes(surpriseItem.cat);
        return (
        <ConfigModal onClose={() => { if (!surpriseRolling) setSurpriseItem(null); }}>
          <div className="p-6 text-center" style={{ minHeight: 340 }}>
            <div className="text-4xl mb-2" style={surpriseRolling ? { animation: 'sadBounce .3s ease-in-out infinite' } : {}}>🎲</div>
            <h3 className="font-black text-lg mb-4" style={{ color: GREEN }}>{surpriseRolling ? t('surpriseRolling') : t('surpriseTitle')}</h3>
            <div style={{ opacity: surpriseRolling ? 0.55 : 1, filter: surpriseRolling ? 'blur(1px)' : 'none', transition: 'opacity .15s, filter .15s' }}>
              {surpriseItem.img && (
                <div className="w-full h-40 rounded-xl overflow-hidden mb-4 flex items-center justify-center" style={{ background: surpriseItem.imgContain ? '#f7f0e2' : 'transparent' }}>
                  <img src={surpriseItem.img} alt={surpriseItem.name} className={surpriseItem.imgContain ? 'h-full object-contain py-2' : 'w-full h-full object-cover'} />
                </div>
              )}
              {!surpriseRolling && isLunchOffer && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-[11px] mb-2" style={{ background: ORANGE, color: '#fff' }}>🍽️ {t('lunchOffer')}</div>
              )}
              <div className="font-black text-xl mb-1" style={{ color: GREEN }}>{mx(surpriseItem.name, lang)}<AllergenTag alg={surpriseItem.alg} />{surpriseItem.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}</div>
              {surpriseItem.desc && <p className="text-xs font-medium mb-2" style={{ color: '#8a7c62' }}>{mx(surpriseItem.desc, lang)}</p>}
              <div className="font-bold text-lg mb-6" style={{ color: CHILI }}>
                {fmt(isLunchOffer ? 9.5 : surpriseItem.price)}
                {isLunchOffer && <span className="text-[10px] font-bold ml-1.5" style={{ color: '#8a7c62' }}>inkl. Getränk</span>}
              </div>
            </div>
            {!surpriseRolling && (
              <div className="flex flex-col gap-2.5">
                <button onClick={confirmSurprise} className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('surpriseWantIt')}</button>
                <button onClick={rollSurprise} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('surpriseAgain')}</button>
              </div>
            )}
          </div>
        </ConfigModal>
        );
      })()}

      {wishModalOpen && <WishModal lang={lang} t={t} onClose={() => setWishModalOpen(false)} />}
      {gameOpen && <MemoryMatchGame onClose={() => setGameOpen(false)} />}

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: 'rgba(21,56,38,.92)', animation: 'viewFade .25s ease', height: '100dvh' }}>
          <button onClick={() => setLightbox(null)} className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,246,234,.15)' }}>
            <X size={20} color="#fff" />
          </button>
          <img src={lightbox} className="rounded-2xl object-contain" style={{ maxWidth: '100%', maxHeight: '100%', boxShadow: '0 20px 60px rgba(0,0,0,.5)' }} onClick={(e) => e.stopPropagation()} />
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
            <div className="flex items-start gap-3 mb-4"><Phone size={16} color={GOLD} className="mt-0.5 flex-shrink-0" /><a href="tel:+4944419516104" onClick={() => logEvent('call')} className="text-white font-bold text-sm">04441 / 95 16 104</a></div>
            <div className="flex items-start gap-3 mb-6"><Clock3 size={16} color={GOLD} className="mt-0.5 flex-shrink-0" /><div><div className="text-white font-bold text-sm">{lang === 'de' ? 'Täglich 11:30–22:00 Uhr' : lang === 'en' ? 'Daily 11:30 AM–10:00 PM' : lang === 'tr' ? 'Her gün 11:30–22:00' : lang === 'ro' ? 'Zilnic 11:30–22:00' : lang === 'sq' ? 'Çdo ditë 11:30–22:00' : lang === 'ku' ? 'Her roj 11:30–22:00' : 'Dagelijks 11:30–22:00'}</div>{!isTuesdayOpenNow(new Date()) && <div className="text-xs font-medium" style={{ color: '#d9cdb4' }}>{lang === 'de' ? 'Dienstag Ruhetag' : lang === 'en' ? 'Closed on Tuesdays' : lang === 'tr' ? 'Salı günü kapalı' : lang === 'ro' ? 'Marți închis' : lang === 'sq' ? 'Mbyllur të martave' : lang === 'ku' ? 'Sêşeman girtî' : 'Dinsdag gesloten'}</div>}</div></div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Oyther+Stra%C3%9Fe+37%2C+49377+Vechta"
                target="_blank" rel="noopener noreferrer"
                onClick={() => logEvent('route')}
                className="cta-pulse inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm w-fit"
                style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}
              >
                {t('contactRoute')}
              </a>
              <DistanceWidget lang={lang} inline />
              <a
                href="https://instagram.com/BodrumKebapVechta"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm w-fit"
                style={{ background: 'linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)', color: '#fff' }}
              >
                <Instagram size={16} /> @BodrumKebapVechta
              </a>
            </div>
            <ContactMessageForm lang={lang} t={t} />
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
          <span className="text-[11px] font-medium" style={{ color: '#6b5a3e' }}>© 2019 Bodrum Kebap Vechta</span>
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
function WhatsAppOrderView({ back, initialAction, onConsumeAction, cart, setCart, cartOpen, setCartOpen, go }) {
  const { lang, setLang, t, installPrompt, onInstall } = React.useContext(LangContext);
  const [globalNavOpen, setGlobalNavOpen] = useState(false);
  const initialTab = initialAction?.pizzaComboMode ? 'pizza' : (initialAction?.categoryMode || MENU[0].key);
  const [tab, setTab] = useState(initialTab);
  const [catImgIdx, setCatImgIdx] = useState(0);
  useEffect(() => {
    setCatImgIdx(0);
    const imgs = CATEGORY_IMAGES[tab];
    if (!imgs || imgs.length < 2) return;
    const iv = setInterval(() => setCatImgIdx((i) => (i + 1) % imgs.length), 3500);
    return () => clearInterval(iv);
  }, [tab]);
  const [openExtra, setOpenExtra] = useState(null);
  const [configExtras, setConfigExtras] = useState([]);
  const [configMeat, setConfigMeat] = useState(null);
  const [configNote, setConfigNote] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [drawerView, setDrawerView] = useState('cart');
  const [wheelResult, setWheelResult] = useState(null);
  const [pizzaComboActive, setPizzaComboActive] = useState(!!initialAction?.pizzaComboMode);
  const [comboDrinkFreeUsed, setComboDrinkFreeUsed] = useState(false);
  const [itemNotes, setItemNotes] = useState({});
  const [burst, setBurst] = useState(false);
  const [sentSnapshot, setSentSnapshot] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const resetOrder = () => { setCart({}); setName(''); setNote(''); setWheelResult(null); setItemNotes({}); setDrawerView('cart'); setCartOpen(false); };
  const handleSend = () => {
    setBurst(true); setTimeout(() => setBurst(false), 5200); setDrawerView('sent');
    const itemsList = lines.map(([, v]) => ({ name: v.deName || v.name, qty: v.qty, price: v.qty * v.price }));
    safeSet(`order:${orderCode}`, { code: orderCode, status: 'preparing', createdAt: Date.now(), itemCount: totalCount, total: totalPrice, name: name || null, items: itemsList.map(({ name, qty }) => ({ name, qty })), pickupTime: pickupTime || null });
    setSentSnapshot({ code: orderCode, items: itemsList, total: totalPrice, name, pickupTime, note });
    setOrderCode(makeNumericCode(4));
  };

  const [cartPop, setCartPop] = useState(0);
  const [lunchPending, setLunchPending] = useState(null);
  const [weekendWarnOpen, setWeekendWarnOpen] = useState(false);
  const [meatChoiceItem, setMeatChoiceItem] = useState(null);
  const [meatChoiceSel, setMeatChoiceSel] = useState(null);
  const [meatChoiceNote, setMeatChoiceNote] = useState('');
  const [meatChoiceQty, setMeatChoiceQty] = useState(1);
  const [sauceSel, setSauceSel] = useState({});
  const [allergenLegendOpen, setAllergenLegendOpen] = useState(false);
  const [lastAddedTab, setLastAddedTab] = useState(null);
  const [priceOverrides, setPriceOverrides] = useState({});
  const [waExtraText, setWaExtraText] = useState('');
  const [photoOverrides, setPhotoOverrides] = useState({});
  const [soldOutIds, setSoldOutIds] = useState([]);
  const [chickenSoldOut, setChickenSoldOut] = useState(false);
  const [soldOutExtras, setSoldOutExtras] = useState([]);
  const [pendingSoldOutExtra, setPendingSoldOutExtra] = useState(null);
  useEffect(() => {
    safeGet('siteconfig:priceOverrides').then((r) => { if (r) setPriceOverrides(r); });
    safeGet('siteconfig:photoOverrides').then((r) => { if (r) setPhotoOverrides(r); });
    safeGet('siteconfig:soldOut').then((r) => { if (r) setSoldOutIds(r); });
    safeGet('siteconfig:chickenSoldOut').then((r) => { setChickenSoldOut(!!r); });
    safeGet('siteconfig:soldOutExtras').then((r) => { if (r) setSoldOutExtras(r); });
    safeGet('siteconfig:waTemplate').then((r) => { if (r && r.text) setWaExtraText(r.text); });
  }, []);
  const EFFECTIVE_MENU = useMemo(() => applyPriceOverrides(priceOverrides, photoOverrides, soldOutIds), [priceOverrides, photoOverrides, soldOutIds]);
  const EFFECTIVE_UPSELL_POOL = useMemo(() => applyOverridesToFlatList(UPSELL_ITEMS_POOL, priceOverrides, photoOverrides, soldOutIds), [priceOverrides, photoOverrides, soldOutIds]);
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [lunchDrink, setLunchDrink] = useState(null);
  const confirmLunchAdd = () => {
    if (!lunchPending || !lunchDrink) return;
    addItem(`lunch-${Date.now()}`, `${lunchPending.label} + Dose Getränk (${lunchDrink})`, 9.5, `${lunchPending.deLabel} + Dose Getränk (${lunchDrink})`);
    setLunchPending(null); setLunchDrink(null);
  };
  const [pastaStep, setPastaStep] = useState(0);
  const [pastaType, setPastaType] = useState(null);
  const [pastaSauceSel, setPastaSauceSel] = useState(null);
  const addItem = (lineKey, label, price, deLabel, qty = 1) => { setCart((c) => ({ ...c, [lineKey]: { name: label, deName: deLabel || label, price, qty: (c[lineKey]?.qty || 0) + qty } })); setCartPop((x) => x + 1); };

  useEffect(() => {
    if (initialAction?.pendingCombo) {
      const key = `combo-${Date.now()}`;
      setCart((c) => ({ ...c, [key]: { name: `🎉 ${initialAction.pendingCombo.title}`, deName: `🎉 ${initialAction.pendingCombo.title}`, price: initialAction.pendingCombo.price, qty: 1 } }));
      setLastAddedTab(initialAction.pendingCombo.title.includes('Pizza') ? 'pizza' : null);
      setDrawerView('upsell');
      setCartOpen(true);
    }
    if (initialAction?.openCart) {
      setDrawerView('cart');
      setCartOpen(true);
    }
    if (initialAction?.lunchSurprise) {
      setLunchDrink(null);
      setLunchPending(initialAction.lunchSurprise);
    }
    if (initialAction?.quickSearchTerm) {
      setQuickSearch(initialAction.quickSearchTerm);
    }
    if (initialAction?.focusSearch) {
      const tryFocus = () => {
        const el = quickSearchRef.current;
        if (!el) return;
        el.focus();
        el.click();
      };
      requestAnimationFrame(() => requestAnimationFrame(tryFocus));
      setTimeout(tryFocus, 120);
      setTimeout(tryFocus, 400);
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
  const [orderCode, setOrderCode] = useState(() => makeNumericCode(4));

  const waLink = useMemo(() => {
    if (lines.length === 0) return null;
    let msg = `Hallo Bodrum Kebap Vechta, ich möchte gerne folgendes bestellen:\n\n`;
    lines.forEach(([key, v]) => { const note = itemNotes[key]; msg += `• ${v.qty}x ${v.deName || v.name}${note ? ` – ${note}` : ''} (${fmt(v.qty * v.price)})\n`; });
    msg += `\nGesamt: ${fmt(totalPrice)}\n`;
    if (name) msg += `\nName: ${name}`;
    if (pickupTime) msg += `\nGewünschte Abholzeit: ${pickupTime}`;
    if (note) msg += `\nHinweis: ${note}`;
    if (wheelResult && wheelResult.code) msg += `\n\n🎁 Glücksrad-Gewinn: ${wheelResult.prize} (Code: ${wheelResult.code})`;
    msg += `\n\nBestellcode: ${orderCode}`;
    msg += `\n\n(Abholung, keine Lieferung) Bitte sagt mir kurz, wann die Bestellung abholbereit ist. Danke!`;
    if (waExtraText) msg += `\n\n${waExtraText}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [lines, totalPrice, name, note, pickupTime, wheelResult, itemNotes, orderCode]);

  const activeCategory = EFFECTIVE_MENU.find((m) => m.key === tab);

  const [quickSearch, setQuickSearch] = useState('');
  const quickSearchRef = useRef(null);
  const ALL_SEARCHABLE_ITEMS = useMemo(() => {
    return EFFECTIVE_MENU.flatMap((cat) => cat.items
      .filter((i) => !i.customPizza && !i.customPasta)
      .map((i) => ({ ...i, catKey: cat.key })));
  }, [EFFECTIVE_MENU]);
  const quickSearchResults = useMemo(() => {
    if (!quickSearch.trim()) return [];
    const q = quickSearch.trim().toLowerCase();
    const exactNum = ALL_SEARCHABLE_ITEMS.filter((i) => menuNum(i.id).toLowerCase() === q);
    const nameMatches = ALL_SEARCHABLE_ITEMS.filter((i) => menuNum(i.id).toLowerCase() !== q && (mx(i.name, lang).toLowerCase().includes(q) || i.name.toLowerCase().includes(q)));
    return [...exactNum, ...nameMatches].slice(0, 15);
  }, [quickSearch, ALL_SEARCHABLE_ITEMS, lang]);
  const handleQuickAdd = (item) => {
    const soExtra = findSoldOutExtraInItem(item, soldOutExtras);
    const proceed = () => {
      if (item.soldOut) return;
      if (item.weekend && !isWeekendDay()) { setWeekendWarnOpen(true); return; }
      if (item.priceLarge !== undefined) {
        quickSearchRef.current?.blur();
        setTab(item.catKey);
        setOpenExtra({ itemId: item.id, size: 'gross' }); setConfigExtras([]); setConfigNote(''); setConfigMeat(null);
        return;
      }
      if (item.catKey === 'kebap' && hasDonerMeat(item)) { quickSearchRef.current?.blur(); setMeatChoiceSel(null); setMeatChoiceNote(''); setMeatChoiceQty(1); setMeatChoiceItem(item); return; }
      if (isLunchWindowNow() && LUNCH_CATEGORIES.includes(item.catKey) && item.catKey !== 'pizza') { quickSearchRef.current?.blur(); setLunchDrink(null); setLunchPending({ label: mx(item.name, lang), deLabel: item.name }); return; }
      setLastAddedTab(item.catKey); addItem(item.id, mx(item.name, lang), item.price, item.name);
    };
    if (soExtra) { setPendingSoldOutExtra({ name: soExtra, onConfirm: proceed }); return; }
    proceed();
  };

  return (
    <div className="pb-32">
      <CartPopEmoji trigger={cartPop} />
      {lunchPending && (
        <ConfigModal onClose={() => setLunchPending(null)}>
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-black text-lg" style={{ color: GREEN }}>{t('lunchComboTitle')}</h3>
              <button onClick={() => setLunchPending(null)} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0e5cf' }}><X size={16} color={GREEN} /></button>
            </div>
            <p className="text-sm mb-4" style={{ color: '#7c6d55' }}>{t('lunchComboSub')}</p>
            <div className="flex flex-col gap-2 mb-5">
              {LUNCH_DRINKS.map((d) => (<OptionCard key={d} selected={lunchDrink === d} onClick={() => setLunchDrink(d)}><span className="font-bold text-sm">{mx(d, lang)}</span></OptionCard>))}
            </div>
            <button onClick={confirmLunchAdd} disabled={!lunchDrink} className="w-full py-3.5 rounded-xl font-bold text-sm text-white disabled:opacity-40" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)' }}>{t('lunchComboConfirm')} · {fmt(9.5)}</button>
          </div>
        </ConfigModal>
      )}
      {meatChoiceItem && (
        <ConfigModal onClose={() => setMeatChoiceItem(null)}>
          <div className="p-6">
            <h3 className="font-black text-lg mb-1" style={{ color: GREEN }}>{mx(meatChoiceItem.name, lang)}</h3>
            <div className="text-[11px] font-bold tracking-widest mb-2 mt-4" style={{ color: '#a4906c' }}>{t('meatTypeLabel')}</div>
            <div className="flex gap-2 mb-6">
              <button onClick={() => setMeatChoiceSel(null)} className="flex-1 py-3 rounded-lg text-sm font-bold" style={!meatChoiceSel ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{t('meatKalb')}</button>
              <button onClick={() => !chickenSoldOut && setMeatChoiceSel('Hähnchen')} disabled={chickenSoldOut} className="flex-1 py-3 rounded-lg text-sm font-bold disabled:opacity-40" style={meatChoiceSel === 'Hähnchen' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{mx('Hähnchen', lang)}{chickenSoldOut && <span className="block text-[9px] font-black mt-0.5">{t('soldOutBadge')}</span>}</button>
            </div>
            <input
              value={meatChoiceNote}
              onChange={(e) => setMeatChoiceNote(e.target.value)}
              placeholder={t('noteExampleOnions')}
              className="w-full mb-5 px-3.5 py-3 rounded-xl text-sm font-medium outline-none"
              style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
            />
            <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('quantityLabel')}</div>
            <div className="flex items-center justify-center gap-5 mb-6 py-1">
              <button onClick={() => setMeatChoiceQty((q) => Math.max(1, q - 1))} className="w-11 h-11 rounded-full flex items-center justify-center font-black text-lg" style={{ background: '#f7f0e2', color: GREEN }}>−</button>
              <span key={meatChoiceQty} className="font-black text-2xl w-10 text-center" style={{ color: GREEN, animation: 'qtyPop .25s cubic-bezier(.34,1.56,.64,1)' }}>{meatChoiceQty}</span>
              <button onClick={() => setMeatChoiceQty((q) => Math.min(50, q + 1))} className="w-11 h-11 rounded-full flex items-center justify-center font-black text-lg text-white" style={{ background: ORANGE }}>+</button>
            </div>
            <button
              onClick={() => {
                const item = meatChoiceItem;
                let deLabel = meatChoiceSel ? `${item.name} [${meatChoiceSel}]` : item.name;
                let displayLabel = meatChoiceSel ? `${mx(item.name, lang)} [${mx(meatChoiceSel, lang)}]` : mx(item.name, lang);
                if (meatChoiceNote.trim()) { deLabel += ` [${meatChoiceNote.trim()}]`; displayLabel += ` [${meatChoiceNote.trim()}]`; }
                setLastAddedTab('kebap');
                addItem(`${item.id}-${meatChoiceSel || 'x'}-${Date.now()}`, displayLabel, item.price, deLabel, meatChoiceQty);
                setMeatChoiceItem(null);
                if (quickSearch.trim()) setTimeout(() => quickSearchRef.current?.focus(), 50);
              }}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white"
              style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}
            >{t('hinzufuegen')} · {fmt(meatChoiceItem.price * meatChoiceQty)}</button>
          </div>
        </ConfigModal>
      )}
      {pendingSoldOutExtra && (
        <ConfigModal onClose={() => setPendingSoldOutExtra(null)}>
          <div className="p-6 text-center">
            <div className="text-3xl mb-3">⚠️</div>
            <p className="text-sm font-bold mb-6" style={{ color: GREEN }}>{t('extraSoldOutWarnPrefix')} {mx(pendingSoldOutExtra.name, lang)} {t('extraSoldOutWarnSuffix')}</p>
            <div className="flex flex-col gap-2.5">
              <button onClick={() => { pendingSoldOutExtra.onConfirm(); setPendingSoldOutExtra(null); }} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)' }}>{t('addAnywayBtn')}</button>
              <button onClick={() => setPendingSoldOutExtra(null)} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('cancelBtn')}</button>
            </div>
          </div>
        </ConfigModal>
      )}
      {weekendWarnOpen && (
        <ConfigModal onClose={() => setWeekendWarnOpen(false)}>
          <div className="p-6 text-center">
            <div className="text-5xl mb-3" style={{ animation: 'sadBounce 1.2s ease-in-out infinite' }}>😔</div>
            <h3 className="font-black text-lg mb-2" style={{ color: GREEN }}>{t('weekendWarnTitle')}</h3>
            <p className="text-sm mb-6" style={{ color: '#7c6d55' }}>{t('weekendItemOnly')}</p>
            <button onClick={() => setWeekendWarnOpen(false)} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)' }}>{t('installHelpClose')}</button>
          </div>
        </ConfigModal>
      )}
      <div style={{ background: GREEN }}><TopBar onHome={back} title={t('titleWa')} /></div>

      <div className="px-5 pt-4 pb-1">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: ORANGE }}>🔍</span>
          <input
            ref={quickSearchRef}
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder={t('quickSearchPh')}
            inputMode="numeric"
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm font-bold outline-none"
            style={{ background: '#fff', border: `1.5px solid ${quickSearch ? ORANGE : '#e3d5bd'}`, color: GREEN, boxShadow: quickSearch ? '0 6px 20px rgba(230,90,10,.15)' : 'none', transition: 'border-color .2s ease, box-shadow .2s ease' }}
          />
          {quickSearch && (
            <button onClick={() => setQuickSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#f0e5cf' }}><X size={12} color={GREEN} /></button>
          )}
        </div>
      </div>
      {quickSearch.trim() && (
        <div className="px-5 pb-24">
          {quickSearchResults.length === 0 ? (
            <p className="text-xs font-semibold text-center py-4" style={{ color: '#a4906c' }}>{t('quickSearchNoResults')}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {quickSearchResults.map((item, i) => (
                <button key={item.id} onClick={() => handleQuickAdd(item)} disabled={item.soldOut} className="w-full text-left bg-white rounded-xl p-3 flex items-center justify-between shadow-sm disabled:opacity-50 active:scale-[.98]" style={{ animation: `resultPop .3s cubic-bezier(.22,1,.36,1) ${i * 0.04}s both`, transition: 'transform .1s ease' }}>
                  <span className="font-bold text-sm" style={{ color: GREEN }}>{menuNum(item.id) && <span className="inline-flex items-center justify-center min-w-[26px] px-1.5 py-0.5 rounded-md mr-1.5 text-[11px] font-black" style={{ background: '#fdecd4', color: ORANGE }}>{menuNum(item.id)}</span>}{mx(item.name, lang)}{item.soldOut && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: '#8a7c62', color: '#fff' }}>{t('soldOutBadge')}</span>}</span>
                  <span className="text-xs font-bold flex-shrink-0 ml-2" style={{ color: CHILI }}>{item.priceLarge !== undefined ? fmt(item.priceLarge) : fmt(item.price)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2.5 overflow-x-auto px-5 pt-3 pb-3">
        {MENU.map((m) => (
          <button key={m.key} onClick={() => setTab(m.key)} className="flex-none px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap flex items-center gap-1.5"
            style={tab === m.key ? { background: `linear-gradient(135deg, ${GREEN}, #1d4530)`, color: GOLD, boxShadow: '0 6px 16px rgba(21,56,38,.3)', border: '1.5px solid transparent' } : { background: '#fff', color: GREEN, border: `1.5px solid #e3d5bd` }}>
            <span className="text-base">{CATEGORY_ICONS[m.key]}</span> {catLabel(m.key, lang)}
          </button>
        ))}
      </div>


      {pizzaComboActive && tab === 'pizza' && (
        <div className="mx-5 mt-3 mb-1 px-4 py-3 rounded-xl flex items-center justify-between gap-2 flex-wrap" style={{ background: '#fdecd4', border: '1px solid #f0d4a8' }}>
          <span className="text-xs font-black" style={{ color: '#8a5a1f' }}>{t('pizzaComboBanner').replace('{price}', fmt(PIZZA_COMBO_PRICE))}</span>
          <button onClick={() => setPizzaComboActive(false)} className="text-[11px] font-bold underline" style={{ color: '#8a5a1f' }}>{t('leaveOffer')}</button>
        </div>
      )}

      {CATEGORY_IMAGES[tab] && (
        <div className="px-5 pt-2">
          <div className="rounded-2xl overflow-hidden relative h-40" style={{ boxShadow: '0 8px 20px rgba(21,56,38,.15)' }}>
            <img key={catImgIdx} src={CATEGORY_IMAGES[tab][catImgIdx]} className="w-full h-full object-cover" style={{ animation: 'modalBgFade .6s ease' }} alt={catLabel(tab, lang)} />
            <div className="absolute inset-0 flex items-end p-3" style={{ background: 'linear-gradient(0deg, rgba(21,56,38,.75), rgba(21,56,38,.05))' }}>
              <span className="text-white font-black text-lg">{CATEGORY_ICONS[tab]} {catLabel(tab, lang)}</span>
            </div>
          </div>
        </div>
      )}
      <div className="px-5 pt-2 flex justify-end">
        <button onClick={() => setAllergenLegendOpen(true)} className="text-[11px] font-bold underline" style={{ color: '#a4906c' }}>{t('allergenInfoBtn')}</button>
      </div>
      {allergenLegendOpen && <AllergenLegendModal onClose={() => setAllergenLegendOpen(false)} />}
      <div key={tab} className="px-5 pt-2 grid md:grid-cols-2 xl:grid-cols-3 gap-2.5 items-start" style={{ animation: 'modalBgFade .35s ease' }}>
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
            const size = openExtra?.size || 'gross';
            const basePrice = size === 'klein' ? item.priceSmall : item.priceLarge;
            const configTotal = basePrice + configExtras.reduce((s, e) => s + extraCost(e), 0);
            const doOpen = () => { if (item.soldOut) return; if (item.weekend && !isWeekendDay()) { setWeekendWarnOpen(true); return; } setOpenExtra({ itemId: item.id, size: 'gross' }); setConfigExtras([]); setConfigNote(''); setConfigMeat(null); };
            const openFor = () => { const soExtra = findSoldOutExtraInItem(item, soldOutExtras); if (soExtra) { setPendingSoldOutExtra({ name: soExtra, onConfirm: doOpen }); return; } doOpen(); };
            const setSize = (sz) => setOpenExtra({ itemId: item.id, size: sz });
            const toggleExtra = (t) => { if (!configExtras.includes(t) && soldOutExtras.includes(t)) { setPendingSoldOutExtra({ name: t, onConfirm: () => setConfigExtras((ex) => [...ex, t]) }); return; } setConfigExtras((ex) => (ex.includes(t) ? ex.filter((x) => x !== t) : [...ex, t])); };
            const closeModal = () => { setOpenExtra(null); setConfigExtras([]); setConfigNote(''); setConfigMeat(null);  if (quickSearch.trim()) setTimeout(() => quickSearchRef.current?.focus(), 50); };
            const confirmAdd = () => {
              const sizeLabel = size === 'klein' ? 'klein' : 'groß';
              const displaySizeLabel = size === 'klein' ? t('sizeSmall') : t('sizeLarge');
              let deLabel = configExtras.length > 0 ? `${item.name} (${sizeLabel}) ${configExtras.map((e) => `+${e}`).join(' ')}` : `${item.name} (${sizeLabel})`;
              let displayLabel = configExtras.length > 0 ? `${mx(item.name, lang)} (${displaySizeLabel}) ${configExtras.map((e) => `+${mx(e, lang)}`).join(' ')}` : `${mx(item.name, lang)} (${displaySizeLabel})`;
              if (configMeat) { deLabel += ` [${configMeat}]`; displayLabel += ` [${mx(configMeat, lang)}]`; }
              if (configNote.trim()) { deLabel += ` [${configNote.trim()}]`; displayLabel += ` [${configNote.trim()}]`; }
              if (isLunchWindowNow() && tab === 'pizza' && size === 'gross') {
                closeModal();
                setLunchDrink(null);
                setLunchPending({ label: displayLabel, deLabel });
                return;
              }
              const lineKey = `${item.id}-${size}-${configMeat || 'x'}-${configExtras.slice().sort().join('_') || 'ohne'}`;
              setLastAddedTab(tab);
              addItem(lineKey, displayLabel, configTotal, deLabel);
              closeModal();
            };
            return (
              <React.Fragment key={item.id}>
                <button onClick={openFor} className="text-left bg-white rounded-xl overflow-hidden shadow-sm w-full" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                  {item.img && <img src={item.img} alt={item.name} className="w-full h-36 object-cover" loading="lazy" />}
                  <div className="p-3.5">
                    <div className="font-bold text-sm mb-1" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{mx(item.name, lang)}<AllergenTag alg={item.alg} />{item.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}{item.soldOut && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: '#8a7c62', color: '#fff' }}>{t('soldOutBadge')}</span>}</div>
                    {item.desc && <div className="text-[11px] font-medium mb-2" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}
                    <div className="text-xs font-bold" style={{ color: CHILI }}>{t('sizeSmall')} {fmt(item.priceSmall)} · {t('sizeLarge')} {fmt(item.priceLarge)}</div>
                  </div>
                </button>
                {isOpen && (
                  <ConfigModal onClose={closeModal}>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-black text-xl" style={{ color: GREEN }}>{mx(item.name, lang)}<AllergenTag alg={item.alg} /></h3>
                        <button onClick={closeModal} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0e5cf' }}><X size={16} color={GREEN} /></button>
                      </div>
                      {item.desc && <p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{mx(item.desc, lang)}</p>}
                      <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('sizeLabel')}</div>
                      <div className="flex gap-2 mb-5">
                        <button onClick={() => setSize('klein')} className="flex-1 py-4 rounded-xl text-center font-bold" style={size === 'klein' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>
                          <div className="text-base">{t('sizeSmall')}</div><div className="text-sm opacity-80">{fmt(item.priceSmall)}</div>
                        </button>
                        <button onClick={() => setSize('gross')} className="flex-1 py-4 rounded-xl text-center font-bold" style={size === 'gross' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>
                          <div className="text-base">{t('sizeLarge')}</div><div className="text-sm opacity-80">{fmt(item.priceLarge)}</div>
                        </button>
                      </div>
                      {tab === 'pizza' && size === 'klein' && isLunchWindowNow() && (
                        <div className="text-[11px] font-semibold px-3 py-2.5 rounded-lg mb-4" style={{ background: '#fdecd4', color: '#8a5a1f' }}>{t('lunchSmallHint')}</div>
                      )}
                      {hasDonerMeat(item) && (
                        <>
                          <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('meatTypeLabel')}</div>
                          <div className="flex gap-2 mb-5">
                            <button onClick={() => setConfigMeat(null)} className="flex-1 py-2.5 rounded-lg text-xs font-bold" style={!configMeat ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{t('meatKalb')}</button>
                            <button onClick={() => !chickenSoldOut && setConfigMeat('Hähnchen')} disabled={chickenSoldOut} className="flex-1 py-2.5 rounded-lg text-xs font-bold disabled:opacity-40" style={configMeat === 'Hähnchen' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{mx('Hähnchen', lang)}{chickenSoldOut && <span className="block text-[8px] font-black">{t('soldOutBadge')}</span>}</button>
                          </div>
                        </>
                      )}
                      <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('extrasPricePrefix')} {fmt(1.0)}):</div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {EXTRA_TOPPINGS.map((top) => (
                          <button key={top} onClick={() => toggleExtra(top)} className="px-3 py-2.5 rounded-lg text-xs font-bold text-left" style={configExtras.includes(top) ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>{mx(top, lang)}{soldOutExtras.includes(top) && <span className="ml-1">⚠️</span>} <span className="opacity-70">{extraCost(top) > 0 ? `+${fmt(extraCost(top))}` : t('freeLabel')}</span></button>
                        ))}
                      </div>
                      <input
                        value={configNote}
                        onChange={(e) => setConfigNote(e.target.value)}
                        placeholder={t('noteExampleCheese')}
                        className="w-full mb-4 px-3.5 py-3 rounded-xl text-sm font-medium outline-none"
                        style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
                      />
                      <button onClick={confirmAdd} className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}><Plus size={16} /> {t('toCart')} · {fmt(configTotal)}</button>
                    </div>
                  </ConfigModal>
                )}
              </React.Fragment>
            );
          }
          if (item.customPizza) {
            const isOpen = openExtra?.itemId === item.id;
            const configTotal = item.price + configExtras.reduce((s, e) => s + extraCost(e), 0);
            const doOpen = () => { setOpenExtra({ itemId: item.id }); setConfigExtras([]); setConfigNote(''); };
            const openFor = () => { const soExtra = findSoldOutExtraInItem(item, soldOutExtras); if (soExtra) { setPendingSoldOutExtra({ name: soExtra, onConfirm: doOpen }); return; } doOpen(); };
            const toggleExtra = (top) => { if (!configExtras.includes(top) && soldOutExtras.includes(top)) { setPendingSoldOutExtra({ name: top, onConfirm: () => setConfigExtras((ex) => [...ex, top]) }); return; } setConfigExtras((ex) => (ex.includes(top) ? ex.filter((x) => x !== top) : [...ex, top])); };
            const closeModal = () => { setOpenExtra(null); setConfigExtras([]); setConfigNote('');  if (quickSearch.trim()) setTimeout(() => quickSearchRef.current?.focus(), 50); };
            const confirmAdd = () => {
              let deLabel = configExtras.length > 0 ? `${item.name} ${configExtras.map((e) => `+${e}`).join(' ')}` : `${item.name}`;
              let displayLabel = configExtras.length > 0 ? `${mx(item.name, lang)} ${configExtras.map((e) => `+${mx(e, lang)}`).join(' ')}` : `${mx(item.name, lang)}`;
              if (configNote.trim()) { deLabel += ` [${configNote.trim()}]`; displayLabel += ` [${configNote.trim()}]`; }
              const lineKey = `${item.id}-${configExtras.slice().sort().join('_') || 'ohne'}`;
              setLastAddedTab('pizza');
              addItem(lineKey, displayLabel, configTotal, deLabel);
              closeModal();
            };
            return (
              <React.Fragment key={item.id}>
                <button onClick={openFor} className="text-left bg-white rounded-xl overflow-hidden shadow-sm w-full" style={{ borderLeft: `4px solid ${GOLD}` }}>
                  {item.img && <img src={item.img} alt={item.name} className="w-full h-28 object-cover" loading="lazy" />}
                  <div className="p-3.5">
                    <div className="font-bold text-sm mb-1" style={{ color: GREEN }}>{mx(item.name, lang)}</div>
                    {item.desc && <div className="text-[11px] font-medium mb-1" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}
                    <div className="text-xs font-bold" style={{ color: CHILI }}>{t('chooseArrow')} · {fmt(item.price)}</div>
                  </div>
                </button>
                {isOpen && (
                  <ConfigModal onClose={closeModal}>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-black text-xl" style={{ color: GREEN }}>{mx(item.name, lang)}<AllergenTag alg={item.alg} /></h3>
                        <button onClick={closeModal} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0e5cf' }}><X size={16} color={GREEN} /></button>
                      </div>
                      {item.desc && <p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{mx(item.desc, lang)}</p>}
                      <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('rowExtras').toUpperCase()} (+{fmt(1.0)})</div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {EXTRA_TOPPINGS.map((top) => (
                          <button key={top} onClick={() => toggleExtra(top)} className="px-3 py-2.5 rounded-lg text-xs font-bold text-left" style={configExtras.includes(top) ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>{mx(top, lang)}{soldOutExtras.includes(top) && <span className="ml-1">⚠️</span>} <span className="opacity-70">{extraCost(top) > 0 ? `+${fmt(extraCost(top))}` : t('freeLabel')}</span></button>
                        ))}
                      </div>
                      <input
                        value={configNote}
                        onChange={(e) => setConfigNote(e.target.value)}
                        placeholder={t('noteExampleCheese')}
                        className="w-full mb-4 px-3.5 py-3 rounded-xl text-sm font-medium outline-none"
                        style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
                      />
                      <button onClick={confirmAdd} className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}><Plus size={16} /> {t('toCart')} · {fmt(configTotal)}</button>
                    </div>
                  </ConfigModal>
                )}
              </React.Fragment>
            );
          }
          if (item.customPasta) {
            const isOpen = openExtra?.itemId === item.id;
            const detectedType = item.name.includes('Makkaroni') ? 'Makkaroni' : 'Spaghetti';
            const configTotal = item.price + (pastaSauceSel === 'Bolognese-Soße' ? 0.5 : 0) + configExtras.reduce((s, e) => s + extraCost(e), 0);
            const doOpen = () => { setOpenExtra({ itemId: item.id }); setPastaStep(0); setPastaType(detectedType); setPastaSauceSel(null); setConfigExtras([]); setConfigNote(''); };
            const openFor = () => { const soExtra = findSoldOutExtraInItem(item, soldOutExtras); if (soExtra) { setPendingSoldOutExtra({ name: soExtra, onConfirm: doOpen }); return; } doOpen(); };
            const toggleExtra = (top) => { if (!configExtras.includes(top) && soldOutExtras.includes(top)) { setPendingSoldOutExtra({ name: top, onConfirm: () => setConfigExtras((ex) => [...ex, top]) }); return; } setConfigExtras((ex) => (ex.includes(top) ? ex.filter((x) => x !== top) : [...ex, top])); };
            const closeModal = () => { setOpenExtra(null); setPastaStep(0); setPastaType(null); setPastaSauceSel(null); setConfigExtras([]); setConfigNote(''); };
            const confirmAdd = () => {
              let deLabel = `${item.name} – ${pastaSauceSel}${configExtras.length > 0 ? ` ${configExtras.map((e) => `+${e}`).join(' ')}` : ''}`;
              let displayLabel = `${mx(item.name, lang)} – ${mx(pastaSauceSel, lang)}${configExtras.length > 0 ? ` ${configExtras.map((e) => `+${mx(e, lang)}`).join(' ')}` : ''}`;
              if (configNote.trim()) { deLabel += ` [${configNote.trim()}]`; displayLabel += ` [${configNote.trim()}]`; }
              const lineKey = `${item.id}-${pastaSauceSel}-${configExtras.slice().sort().join('_') || 'ohne'}`;
              addItem(lineKey, displayLabel, configTotal, deLabel);
              closeModal();
            };
            return (
              <React.Fragment key={item.id}>
                <button onClick={openFor} className="text-left bg-white rounded-xl overflow-hidden shadow-sm w-full" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                  <div className="p-3.5">
                    <div className="font-bold text-sm mb-1" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{mx(item.name, lang)}</div>
                    {item.desc && <div className="text-[11px] font-medium mb-1" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}
                    <div className="text-xs font-bold" style={{ color: CHILI }}>{fmt(item.price)}</div>
                  </div>
                </button>
                {isOpen && (
                  <ConfigModal onClose={closeModal}>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-black text-xl" style={{ color: GREEN }}>{mx(item.name, lang)}<AllergenTag alg={item.alg} /></h3>
                        <button onClick={closeModal} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0e5cf' }}><X size={16} color={GREEN} /></button>
                      </div>
                      <div className="flex items-center gap-1.5 mb-5">
                        {[0, 1].map((i) => <div key={i} className="h-1.5 rounded-full flex-1" style={{ background: i <= pastaStep ? ORANGE : '#e3d5bd' }} />)}
                      </div>
                      {pastaStep === 0 && (
                        <div>
                          <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('chooseSauceTitle').toUpperCase()}</div>
                          <div className="flex flex-col gap-2.5 mb-4">
                            {PASTA_SAUCE_OPTIONS.map((s) => (<OptionCard key={s} selected={pastaSauceSel === s} onClick={() => setPastaSauceSel(s)}><span className="font-bold text-sm">{mx(s, lang)} {s === 'Bolognese-Soße' ? `+${fmt(0.5)}` : `· ${t('freeLabel')}`}</span></OptionCard>))}
                          </div>
                        </div>
                      )}
                      {pastaStep === 1 && (
                        <div className="mb-4">
                          <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('rowExtras').toUpperCase()} (+{fmt(1.0)})</div>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {PASTA_EXTRA_ITEMS.map((top) => (
                              <button key={top} onClick={() => toggleExtra(top)} className="px-3 py-2.5 rounded-lg text-xs font-bold text-left" style={configExtras.includes(top) ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>{mx(top, lang)}{soldOutExtras.includes(top) && <span className="ml-1">⚠️</span>} <span className="opacity-70">{extraCost(top) > 0 ? `+${fmt(extraCost(top))}` : t('freeLabel')}</span></button>
                            ))}
                          </div>
                          <input
                            value={configNote}
                            onChange={(e) => setConfigNote(e.target.value)}
                            placeholder={t('noteExampleCheese')}
                            className="w-full px-3.5 py-3 rounded-xl text-sm font-medium outline-none"
                            style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        {pastaStep > 0 && <button onClick={() => setPastaStep(0)} className="px-4 py-3 rounded-xl text-sm font-semibold" style={{ background: '#f0e5cf', color: GREEN }}>{t('zurueck')}</button>}
                        {pastaStep === 0 && <button onClick={() => setPastaStep(1)} disabled={!pastaSauceSel} className="flex-1 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)' }}>{t('weiterShort')}</button>}
                        {pastaStep === 1 && <button onClick={confirmAdd} className="flex-1 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)' }}><Plus size={16} /> {t('toCart')} · {fmt(configTotal)}</button>}
                      </div>
                    </div>
                  </ConfigModal>
                )}
              </React.Fragment>
            );
          }
          const qty = cart[item.id]?.qty || 0;
          return (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
              {item.img && (
                <div className="w-full h-32 flex items-center justify-center" style={{ background: item.imgContain ? '#f7f0e2' : 'transparent' }}>
                  <img src={item.img} alt={item.name} className={item.imgContain ? 'h-full object-contain py-2' : 'w-full h-full object-cover'} loading="lazy" />
                </div>
              )}
              <div className="p-3.5">
              <div className="flex items-center justify-between">
                <div><div className="font-bold text-sm" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{mx(item.name, lang)}<AllergenTag alg={item.alg} />{item.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}{item.soldOut && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: '#8a7c62', color: '#fff' }}>{t('soldOutBadge')}</span>}</div>{item.desc && <div className="text-[11px] font-medium mt-0.5" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}<div className="text-xs font-semibold mt-1" style={{ color: CHILI }}>{fmt(item.price)}</div></div>
                <div className="flex items-center gap-2 flex-shrink-0">
                <FavoriteHeart id={item.id} favorites={favorites} setFavorites={setFavorites} />
                <Stepper qty={qty} onAdd={() => {
                  const doAdd = () => {
                    if (item.soldOut) return;
                    if (item.weekend && !isWeekendDay()) { setWeekendWarnOpen(true); return; }
                    if (tab === 'kebap' && hasDonerMeat(item)) { setMeatChoiceSel(null); setMeatChoiceNote(''); setMeatChoiceQty(1); setMeatChoiceItem(item); return; }
                    if (isLunchWindowNow() && LUNCH_CATEGORIES.includes(tab) && tab !== 'pizza') { setLunchDrink(null); setLunchPending({ label: mx(item.name, lang), deLabel: item.name }); return; }
                    setLastAddedTab(tab); addItem(item.id, mx(item.name, lang), item.price, item.name);
                  };
                  const soExtra = findSoldOutExtraInItem(item, soldOutExtras);
                  if (soExtra) { setPendingSoldOutExtra({ name: soExtra, onConfirm: doAdd }); return; }
                  doAdd();
                }} onRemove={() => removeItem(item.id)} />
                </div>
              </div>
              {qty > 0 && item.sauceChoice && (
                <div className="mt-2.5 flex gap-2">
                  {['Knoblauchsoße', 'Cocktailsauce'].map((s) => (
                    <button key={s} onClick={() => setItemNotes((n) => ({ ...n, [item.id]: s }))} className="flex-1 px-2 py-2 rounded-lg text-[11px] font-bold" style={itemNotes[item.id] === s ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>{mx(s, lang)} · {t('freeLabel')}</button>
                  ))}
                </div>
              )}
              {qty > 0 && !item.sauceChoice && (
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

      {totalCount > 0 && !cartOpen && !openExtra && ReactDOM.createPortal(
        <button onClick={() => { setCartOpen(true); setDrawerView('upsell'); }} className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[360px] rounded-2xl px-5 py-4 flex items-center justify-center gap-2 shadow-xl" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)', zIndex: 90 }}>
          <span className="font-black text-base">{t('weiter')}</span>
        </button>,
        document.body
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-center">
          <div className="w-full max-w-md h-full flex flex-col" style={{ background: CREAM }}>
            <div style={{ background: GREEN }} className="px-5 py-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button onClick={() => (drawerView === 'wheel' || drawerView === 'upsell2' ? setDrawerView(drawerView === 'upsell2' ? 'upsell' : 'cart') : setCartOpen(false))} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,246,234,.12)' }}><ChevronLeft size={18} color="#fff" /></button>
                <div className="text-white font-extrabold text-sm">{drawerView === 'wheel' ? t('wheelTitle') : drawerView === 'upsell' ? t('upsellTitle') : drawerView === 'upsell2' ? t('drinksTitle') : drawerView === 'sent' ? t('orderSentTitle') : t('cartTitle')}</div>
              </div>
              <div className="relative flex-shrink-0">
                <button onClick={() => setGlobalNavOpen((v) => !v)} className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, boxShadow: '0 4px 14px rgba(230,90,10,.45)' }}>
                  {globalNavOpen ? <X size={19} color="#fff" /> : <MenuIcon size={19} color="#fff" />}
                </button>
                {globalNavOpen && (
                  <>
                    <div className="fixed inset-0" style={{ zIndex: 199 }} onClick={() => setGlobalNavOpen(false)} />
                    <div className="absolute top-10 right-0 w-56 rounded-2xl py-2" style={{ background: GREEN, boxShadow: '0 12px 30px rgba(21,56,38,.4)', zIndex: 200, animation: 'modalCardUp .25s cubic-bezier(.25,.46,.45,.94)' }}>
                      <button onClick={() => { setGlobalNavOpen(false); setCartOpen(false); go('home'); }} className="w-full text-left px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('backToHomeBtn')}</button>
                      <button onClick={() => { setGlobalNavOpen(false); setCartOpen(false); go('whatsapp'); }} className="w-full text-left px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('navMenu')}</button>
                      <button onClick={() => { setGlobalNavOpen(false); setCartOpen(false); go('group'); }} className="w-full text-left px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('titleGroup')}</button>
                      <button onClick={() => { setGlobalNavOpen(false); setCartOpen(false); go('track'); }} className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2" style={{ color: '#d9cdb4' }}><Timer size={15} /> {t('navTrackOrder')}</button>
                      <button onClick={() => { setGlobalNavOpen(false); setCartOpen(false); go('staff'); }} className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2" style={{ color: '#d9cdb4' }}><Lock size={14} /> {t('navStaffArea')}</button>
                      <a href="https://instagram.com/BodrumKebapVechta" target="_blank" rel="noopener noreferrer" onClick={() => setGlobalNavOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}><Instagram size={15} /> Instagram</a>
                      <div className="px-4 py-2.5" style={{ borderTop: '1px solid rgba(255,246,234,.12)' }}>
                        <LanguageSwitcher lang={lang} setLang={setLang} dark />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {drawerView === 'upsell' && (
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <div className="text-center mb-5">
                  <div className="text-3xl mb-2">🍟🍗</div>
                  <div className="font-black text-lg" style={{ color: GREEN }}>{t('upsellTitle')}</div>
                  <p className="text-sm mt-1" style={{ color: '#7c6d55' }}>{t('upsellSub')}</p>
                </div>
                {lastAddedTab && CATEGORY_UPSELL_RECS[lastAddedTab] && (
                  <div className="mb-5">
                    <div className="text-[11px] font-black tracking-widest mb-2 flex items-center gap-1.5" style={{ color: ORANGE }}>✨ {t('recommendedForYou')}</div>
                    <div className="flex flex-col gap-2.5">
                      {CATEGORY_UPSELL_RECS[lastAddedTab].map((id) => {
                        const u = EFFECTIVE_UPSELL_POOL.find((x) => x.id === id);
                        if (!u) return null;
                        const qty = cart[u.id]?.qty || 0;
                        return (
                          <div key={u.id} className="rounded-xl p-4 flex items-center justify-between shadow-sm" style={{ background: '#fdecd4', border: `1.5px solid ${GOLD}` }}>
                            <div className="flex items-center gap-3">
                              {u.img ? (
                                <div className="w-11 h-11 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden" style={{ background: u.imgContain ? '#fff' : 'transparent' }}>
                                  <img src={u.img} alt={u.name} className={u.imgContain ? 'h-full object-contain py-0.5' : 'w-full h-full object-cover'} />
                                </div>
                              ) : (
                                <span className="text-2xl">{u.emoji}</span>
                              )}
                              <div>
                                <div className="font-bold text-sm" style={{ color: GREEN }}>{u.name}</div>
                                <div className="text-xs font-semibold" style={{ color: CHILI }}>{fmt(u.price)}</div>
                              </div>
                            </div>
                            <Stepper qty={qty} onAdd={() => { if (!u.soldOut) addItem(u.id, mx(u.name, lang), u.price, u.name); }} onRemove={() => removeItem(u.id)} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
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
                        <Stepper qty={qty} onAdd={() => { if (!u.soldOut) addItem(u.id, mx(u.name, lang), u.price, u.name); }} onRemove={() => removeItem(u.id)} />
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
                  {pizzaComboActive && !comboDrinkFreeUsed && (
                    <div className="inline-flex items-center gap-1.5 mt-3 px-3.5 py-1.5 rounded-full font-bold text-xs" style={{ background: '#fdecd4', color: '#8a5a1f', border: '1px solid #f0d4a8' }}>🎁 {t('comboFreeDrinkHint')}</div>
                  )}
                </div>
                <div className="flex flex-col gap-2.5">
                  {UPSELL_DRINKS.map((u) => {
                    const key = u.id;
                    const qty = cart[key]?.qty || 0;
                    const freeKey = `${u.id}-combofree`;
                    const isFreeLine = pizzaComboActive && !!cart[freeKey];
                    return (
                      <div key={u.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                        <div className="flex items-center gap-3">
                          {u.img ? (
                            <div className="w-11 h-11 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden" style={{ background: u.imgContain ? '#f7f0e2' : 'transparent' }}>
                              <img src={u.img} alt={u.name} className={u.imgContain ? 'h-full object-contain py-0.5' : 'w-full h-full object-cover'} />
                            </div>
                          ) : (
                            <span className="text-2xl">{u.emoji}</span>
                          )}
                          <div>
                            <div className="font-bold text-sm" style={{ color: GREEN }}>{u.name}</div>
                            <div className="text-xs font-semibold" style={{ color: CHILI }}>{fmt(u.price)}</div>
                          </div>
                        </div>
                        <Stepper qty={qty + (cart[freeKey]?.qty || 0)} onAdd={() => {
                          if (u.soldOut) return;
                          if (pizzaComboActive && !comboDrinkFreeUsed) {
                            addItem(freeKey, `🎁 ${mx(u.name, lang)} (gratis)`, 0, `${u.name} (gratis)`);
                            setComboDrinkFreeUsed(true);
                            return;
                          }
                          addItem(u.id, mx(u.name, lang), u.price, u.name);
                        }} onRemove={() => {
                          if (isFreeLine) { removeItem(freeKey); setComboDrinkFreeUsed(false); return; }
                          removeItem(u.id);
                        }} />
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
                  {lines.length > 0 && (
                    <div className="mt-4 rounded-xl p-3.5" style={{ background: '#f7f0e2' }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold" style={{ color: GREEN }}>{totalPrice >= 50 ? t('freeDrinkUnlocked') : t('freeDrinkProgress').replace('{amount}', fmt(50 - totalPrice))}</span>
                        <span className="text-xs font-bold" style={{ color: ORANGE }}>{Math.min(100, Math.round(totalPrice / 50 * 100))}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#e3d5bd' }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.min(100, totalPrice / 50 * 100)}%`, background: totalPrice >= 50 ? '#25D366' : `linear-gradient(90deg, ${ORANGE}, ${GOLD})`, transition: 'width .4s ease' }} />
                      </div>
                    </div>
                  )}
                  {lines.length > 0 && !lines.some(([key]) => key.startsWith('g3')) && (
                    <div className="mt-3 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold" style={{ background: '#fdecd4', color: '#8a5a1f' }}>
                      🥤 {t('noDrinkReminder')}
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
              <div className="flex-1 overflow-y-auto px-5 py-10 flex flex-col items-center justify-center text-center relative" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(37,211,102,.08), transparent 60%)' }}>
                {burst && <EmojiConfetti emojis={['🎉', '🥙', '✅', '⭐', '🎊']} />}
                <div className="rounded-full flex items-center justify-center mb-5" style={{ width: 88, height: 88, background: '#e8f9ee', animation: 'popIn .65s cubic-bezier(.34,1.56,.64,1) both, ringPulse 1.8s ease-out .5s infinite' }}>
                  <span className="text-5xl">✅</span>
                </div>
                <div className="font-black text-2xl mb-2" style={{ color: GREEN, animation: 'slideUpFade .5s ease .15s both' }}>{t('orderSentTitle')}</div>
                <p className="text-sm mb-6" style={{ color: '#7c6d55', animation: 'slideUpFade .5s ease .3s both' }}>{t('orderSentSub')}</p>
                <div className="w-full rounded-2xl p-4 mb-6 text-left" style={{ background: '#fff', boxShadow: '0 8px 24px rgba(21,56,38,.1)', animation: 'slideUpFade .5s ease .38s both' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: '#a4906c' }}>{totalCount} {t('itemsWord')}</span>
                    <span className="font-black text-lg" style={{ color: GREEN }}>{fmt(totalPrice)}</span>
                  </div>
                </div>
                <button onClick={() => go('track', { orderCode: sentSnapshot?.code || orderCode })} className="w-full flex items-center justify-center gap-2 mb-3 py-3 rounded-xl font-bold text-sm" style={{ background: '#fdecd4', color: '#8a5a1f', border: '1px solid #f0d4a8', animation: 'slideUpFade .5s ease .44s both' }}><Timer size={16} /> {t('trackOrderBtn')} ({sentSnapshot?.code || orderCode})</button>
                <button onClick={() => setShowReceipt(true)} className="w-full flex items-center justify-center gap-2 mb-6 py-3 rounded-xl font-bold text-sm" style={{ background: '#fff', color: GREEN, border: `1px solid #e3d5bd`, animation: 'slideUpFade .5s ease .47s both' }}><span className="text-base">🧾</span> {t('showReceiptBtn')}</button>
                {showReceipt && sentSnapshot && <ReceiptView snapshot={sentSnapshot} onClose={() => setShowReceipt(false)} />}
                <div className="w-full flex flex-col gap-3" style={{ animation: 'slideUpFade .5s ease .5s both' }}>
                  <button onClick={resetOrder} className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('newOrderBtn')}</button>
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
  { id: 'yaprak', label: 'Yaprak Döner', extra: 2.0, emoji: '🌿', weekendOnly: true },
];
const SAUCES = [
  { id: 'knoblauch', label: 'Knoblauchsoße' }, { id: 'hollandaise', label: 'Hollandaise' },
  { id: 'scharf', label: 'Scharfe Soße' }, { id: 'ohne', label: 'Ohne Soße' },
];
const BUILDER_EXTRAS = [
  { id: 'kaese', label: 'Käse', price: 1.0 }, { id: 'peperoni', label: 'Peperoni', price: 1.0 },
  { id: 'jalapenos', label: 'Jalapeños', price: 1.0 },
  { id: 'zwiebeln', label: 'Zwiebeln', price: 0 }, { id: 'tomaten', label: 'Tomaten', price: 0 },
  { id: 'rotkohl', label: 'Rotkohl', price: 0 }, { id: 'mais', label: 'Mais', price: 1.0 },
  { id: 'extrafleisch', label: 'Extra Fleisch', price: 1.0 },
  { id: 'scharf', label: 'Scharf', price: 1.0 },
  { id: 'brot', label: 'Brot', price: 1.0 },
];
const ALL_EXTRA_NAMES = Array.from(new Set([
  ...EXTRA_TOPPINGS, ...PASTA_TOPPINGS, ...PASTA_EXTRA_ITEMS, ...BUILDER_EXTRAS.map((e) => e.label), 'Steak Fleisch',
]));
function AllergenTag({ alg }) {
  if (!alg) return null;
  return <sup className="font-semibold" style={{ fontSize: '9px', color: '#a4906c', marginLeft: 2 }}>{alg}</sup>;
}
function AllergenLegendModal({ onClose }) {
  const { lang, t } = React.useContext(LangContext);
  return (
    <ConfigModal onClose={onClose}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-black text-lg" style={{ color: GREEN }}>{t('allergenLegendTitle')}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0e5cf' }}><X size={16} color={GREEN} /></button>
        </div>
        <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('allergenSectionTitle')}</div>
        <div className="grid grid-cols-1 gap-1 mb-4">
          {Object.entries(ALLERGEN_LEGEND).map(([code, label]) => (
            <div key={code} className="flex gap-2 text-xs" style={{ color: GREEN }}><span className="font-black w-4">{code}</span><span>{label[lang] || label.de}</span></div>
          ))}
        </div>
        <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('zusatzSectionTitle')}</div>
        <div className="grid grid-cols-1 gap-1">
          {Object.entries(ZUSATZ_LEGEND).map(([code, label]) => (
            <div key={code} className="flex gap-2 text-xs" style={{ color: GREEN }}><span className="font-black w-4">{code}</span><span>{label[lang] || label.de}</span></div>
          ))}
        </div>
      </div>
    </ConfigModal>
  );
}
function OptionCard({ selected, onClick, children, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} className="w-full text-left px-4 py-3.5 rounded-xl flex items-center justify-between disabled:opacity-40" style={selected ? { background: ORANGE, color: '#fff' } : { background: '#fff', color: GREEN, border: '1px solid #e3d5bd' }}>
      {children}{selected && <Check size={18} />}
    </button>
  );
}
function DonerBuilderView({ back, go }) {
  const { t, lang, installPrompt, onInstall } = React.useContext(LangContext);
  const [kind, setKind] = useState(null); // null | 'doener' | 'pasta'
  const [waExtraText, setWaExtraText] = useState('');
  useEffect(() => { safeGet('siteconfig:waTemplate').then((r) => { if (r && r.text) setWaExtraText(r.text); }); }, []);
  const [chickenSoldOut, setChickenSoldOut] = useState(false);
  useEffect(() => { safeGet('siteconfig:chickenSoldOut').then((r) => { setChickenSoldOut(!!r); }); }, []);
  const [soldOutExtras, setSoldOutExtras] = useState([]);
  const [pendingSoldOutExtra, setPendingSoldOutExtra] = useState(null);
  useEffect(() => { safeGet('siteconfig:soldOutExtras').then((r) => { if (r) setSoldOutExtras(r); }); }, []);
  const [step, setStep] = useState(0);
  const [base, setBase] = useState(null);
  const [meat, setMeat] = useState(null);
  const [sauce, setSauce] = useState(null);
  const [extras, setExtras] = useState([]);
  const [pastaType, setPastaType] = useState(null);
  const [pastaSauce, setPastaSauce] = useState(null);
  const [pastaExtras, setPastaExtras] = useState([]);
  const [name, setName] = useState('');
  const [showWheel, setShowWheel] = useState(false);
  const [wheelResult, setWheelResult] = useState(null);
  const [sent, setSent] = useState(false);
  const [burst, setBurst] = useState(false);
  const [orderCode, setOrderCode] = useState(() => makeNumericCode(4));
  const [sentSnapshot, setSentSnapshot] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const handleSend = () => {
    setBurst(true); setSent(true); setTimeout(() => setBurst(false), 5200);
    const itemName = kind === 'pasta'
      ? `${pastaType} (${pastaSauce}${pastaExtras.length ? ', ' + pastaExtras.join(', ') : ''})`
      : `Döner (${base?.label}, ${meat?.label}, ${SAUCES.find((s) => s.id === sauce)?.label}${extras.length ? ', ' + extras.map((id) => BUILDER_EXTRAS.find((e) => e.id === id)?.label).join(', ') : ''})`;
    safeSet(`order:${orderCode}`, { code: orderCode, status: 'preparing', createdAt: Date.now(), itemCount: 1, total, name: name || null, items: [{ name: itemName, qty: 1 }] });
    setSentSnapshot({ code: orderCode, items: [{ name: itemName, qty: 1, price: total }], total, name, pickupTime: null, note: '' });
    setOrderCode(makeNumericCode(4));
  };
  const resetBuilder = () => { setKind(null); setStep(0); setBase(null); setMeat(null); setSauce(null); setExtras([]); setPastaType(null); setPastaSauce(null); setPastaExtras([]); setName(''); setWheelResult(null); setSent(false); setShowWheel(false); };

  const toggleExtra = (id) => {
    const extraDef = BUILDER_EXTRAS.find((e) => e.id === id);
    if (!extras.includes(id) && extraDef && soldOutExtras.includes(extraDef.label)) {
      setPendingSoldOutExtra({ name: extraDef.label, onConfirm: () => setExtras((e) => [...e, id]) });
      return;
    }
    setExtras((e) => (e.includes(id) ? e.filter((x) => x !== id) : [...e, id]));
  };
  const togglePastaExtra = (top) => {
    if (!pastaExtras.includes(top) && soldOutExtras.includes(top)) {
      setPendingSoldOutExtra({ name: top, onConfirm: () => setPastaExtras((e) => [...e, top]) });
      return;
    }
    setPastaExtras((e) => (e.includes(top) ? e.filter((x) => x !== top) : [...e, top]));
  };

  const total = useMemo(() => {
    if (kind === 'pasta') {
      const base_ = pastaType === 'Makkaroni' ? 8.0 : 7.5;
      return base_ + (pastaSauce === 'Bolognese-Soße' ? 0.5 : 0) + pastaExtras.reduce((s, e) => s + extraCost(e), 0);
    }
    let t = (base?.price || 0) + (meat?.extra || 0);
    extras.forEach((id) => { const ex = BUILDER_EXTRAS.find((e) => e.id === id); if (ex) t += ex.price; });
    return Math.max(t, 0);
  }, [kind, base, meat, extras, pastaType, pastaSauce, pastaExtras]);

  const canNext = kind === 'pasta'
    ? [!!pastaType, !!pastaSauce, true, false][step]
    : [!!base, !!meat, !!sauce, true, false][step];
  const totalSteps = kind === 'pasta' ? 3 : 4;

  const waLink = useMemo(() => {
    if (kind === 'pasta') {
      if (!pastaType || !pastaSauce) return null;
      let msg = `Hallo Bodrum Kebap Vechta, ich möchte mir gerne meine eigene Pasta zusammenstellen:\n\n`;
      msg += `🍝 ${pastaType}\n🧂 Soße: ${pastaSauce}\n`;
      if (pastaExtras.length > 0) msg += `➕ Extras: ${pastaExtras.join(', ')}\n`;
      msg += `\nPreis: ${fmt(total)}\n`;
      if (name) msg += `\nName: ${name}`;
      if (wheelResult && wheelResult.code) msg += `\n\n🎁 Glücksrad-Gewinn: ${wheelResult.prize} (Code: ${wheelResult.code})`;
      msg += `\n\nBestellcode: ${orderCode}`;
      msg += `\n\n(Abholung, keine Lieferung) Bitte sagt mir kurz, wann die Bestellung abholbereit ist. Danke!`;
    if (waExtraText) msg += `\n\n${waExtraText}`;
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    }
    if (!base || !meat || !sauce) return null;
    let msg = `Hallo Bodrum Kebap Vechta, ich möchte mir gerne meinen Döner selbst zusammenstellen:\n\n`;
    msg += `🌯 Basis: ${base.label}\n🍖 Fleisch: ${meat.label}\n🧂 Soße: ${SAUCES.find((s) => s.id === sauce)?.label}\n`;
    if (extras.length > 0) msg += `➕ Extras: ${extras.map((id) => BUILDER_EXTRAS.find((e) => e.id === id)?.label).join(', ')}\n`;
    msg += `\nPreis: ${fmt(total)}\n`;
    if (name) msg += `\nName: ${name}`;
    if (wheelResult && wheelResult.code) msg += `\n\n🎁 Glücksrad-Gewinn: ${wheelResult.prize} (Code: ${wheelResult.code})`;
    msg += `\n\nBestellcode: ${orderCode}`;
    msg += `\n\n(Abholung, keine Lieferung) Bitte sagt mir kurz, wann die Bestellung abholbereit ist. Danke!`;
    if (waExtraText) msg += `\n\n${waExtraText}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [kind, base, meat, sauce, extras, pastaType, pastaSauce, pastaExtras, name, total, wheelResult, orderCode]);

  return (
    <div className="pb-10">
      <div style={{ background: GREEN }}><TopBar onHome={back} title={t('titleBuilder')} /></div>
      {!kind && (
        <div className="px-5 pt-4">
          <h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('chooseCreationTitle')}</h2>
          <p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('chooseCreationSub')}</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => setKind('doener')} className="rounded-2xl overflow-hidden relative h-28 text-left" style={{ boxShadow: '0 8px 20px rgba(21,56,38,.15)' }}>
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
            <button onClick={() => setKind('pasta')} className="rounded-2xl overflow-hidden relative h-28 text-left" style={{ boxShadow: '0 8px 20px rgba(21,56,38,.15)' }}>
              <img src={PENNE_IMG} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center px-5" style={{ background: 'linear-gradient(90deg, rgba(21,56,38,.82), rgba(21,56,38,.25))' }}>
                <span className="text-white font-black text-lg">🍝 {t('buildPasta')}</span>
              </div>
            </button>
          </div>
        </div>
      )}
      {kind && step < totalSteps && (
        <div className="flex items-center gap-2 px-5 mb-2">
          {Array.from({ length: totalSteps }).map((_, i) => <div key={i} className="h-1.5 rounded-full flex-1" style={{ background: i <= step ? ORANGE : '#e3d5bd' }} />)}
        </div>
      )}
      {kind === 'doener' && (
      <div className="px-5 pt-3">
        {step === 0 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('chooseBase')}</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('chooseBaseSub')}</p>
          <div className="flex flex-col gap-2.5">{BASES.map((b) => (<OptionCard key={b.id} selected={base?.id === b.id} onClick={() => setBase(b)}><span className="font-bold text-sm flex items-center gap-2.5"><span className="text-lg">{b.emoji}</span> {mx(b.label, lang)}<span className="text-xs font-medium opacity-80">· {mx(b.desc, lang)}</span></span></OptionCard>))}</div></div>)}
        {step === 1 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('chooseMeatQ')}</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('chooseMeatTitle')}</p>
          <div className="flex flex-col gap-2.5">{MEATS.map((m) => (<OptionCard key={m.id} selected={meat?.id === m.id} disabled={m.id === 'haehnchen' && chickenSoldOut} onClick={() => { if (m.id === 'haehnchen' && chickenSoldOut) return; if (m.weekendOnly && !isWeekendDay()) { alert(t('yaprakWeekendOnly')); return; } setMeat(m); }}><span className="font-bold text-sm flex items-center gap-2.5"><span className="text-lg">{m.emoji}</span> {mx(m.label, lang)}{m.extra !== 0 && <span className="text-xs font-medium opacity-80">({m.extra > 0 ? '+' : ''}{fmt(m.extra)})</span>}{m.weekendOnly && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: CHILI, color: '#fff' }}>FR·SA·SO</span>}{m.id === 'haehnchen' && chickenSoldOut && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: '#8a7c62', color: '#fff' }}>{t('soldOutBadge')}</span>}</span></OptionCard>))}</div></div>)}
        {step === 2 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('chooseSauceTitle')}</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('chooseSauceSub')}</p>
          <div className="flex flex-col gap-2.5">{SAUCES.map((s) => (<OptionCard key={s.id} selected={sauce === s.id} onClick={() => setSauce(s.id)}><span className="font-bold text-sm">{mx(s.label, lang)}</span></OptionCard>))}</div></div>)}
        {step === 3 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('extrasQ')}</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('chooseExtrasSub')}</p>
          <div className="grid grid-cols-2 gap-2.5">{BUILDER_EXTRAS.map((e) => { const sel = extras.includes(e.id); return (<button key={e.id} onClick={() => toggleExtra(e.id)} className="px-3.5 py-3 rounded-xl text-left" style={sel ? { background: ORANGE, color: '#fff' } : { background: '#fff', color: GREEN, border: '1px solid #e3d5bd' }}><div className="font-bold text-sm">{mx(e.label, lang)}{soldOutExtras.includes(e.label) && <span className="ml-1">⚠️</span>}</div><div className="text-[11px] font-medium opacity-80 mt-0.5">{e.price > 0 ? `+${fmt(e.price)}` : t('freeLabel')}</div></button>); })}</div></div>)}
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
      {kind === 'pasta' && (
      <div className="px-5 pt-3">
        {step === 0 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('choosePastaTypeTitle')}</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('choosePastaStyleSub')}</p>
          <div className="flex flex-col gap-2.5">{PASTA_TYPES.map((pt) => (<OptionCard key={pt} selected={pastaType === pt} onClick={() => setPastaType(pt)}><span className="font-bold text-sm">{mx(pt, lang)}</span></OptionCard>))}</div></div>)}
        {step === 1 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('chooseSauceTitle')}</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('chooseSauceSub')}</p>
          <div className="flex flex-col gap-2.5">{PASTA_SAUCE_OPTIONS.map((s) => (<OptionCard key={s} selected={pastaSauce === s} onClick={() => setPastaSauce(s)}><span className="font-bold text-sm">{mx(s, lang)} {s === 'Bolognese-Soße' ? `+${fmt(0.5)}` : `· ${t('freeLabel')}`}</span></OptionCard>))}</div></div>)}
        {step === 2 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('extrasQ')}</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('chooseExtrasSub')}</p>
          <div className="grid grid-cols-2 gap-2.5">{PASTA_EXTRA_ITEMS.map((top) => { const sel = pastaExtras.includes(top); return (<button key={top} onClick={() => togglePastaExtra(top)} className="px-3.5 py-3 rounded-xl text-left" style={sel ? { background: ORANGE, color: '#fff' } : { background: '#fff', color: GREEN, border: '1px solid #e3d5bd' }}><div className="font-bold text-sm">{mx(top, lang)}{soldOutExtras.includes(top) && <span className="ml-1">⚠️</span>}</div><div className="text-[11px] font-medium opacity-80 mt-0.5">{extraCost(top) > 0 ? `+${fmt(extraCost(top))}` : t('freeLabel')}</div></button>); })}</div></div>)}
        {step === totalSteps && !showWheel && !sent && (
          <div>
            <h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>{t('pastaReadyTitle')}</h2>
            <p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{t('doenerReadySub')}</p>
            <div className="bg-white rounded-xl p-5 mb-4" style={{ borderLeft: `4px solid ${ORANGE}` }}>
              <Row label={t('rowBasis')} value={mx(pastaType, lang)} /><Row label={t('rowSauce')} value={mx(pastaSauce, lang)} />
              {pastaExtras.length > 0 && <Row label={t('rowExtras')} value={pastaExtras.map((tp) => mx(tp, lang)).join(', ')} />}
              <div className="flex justify-between items-center pt-3 mt-2" style={{ borderTop: '1px dashed #e3d5bd' }}><span className="text-sm font-semibold" style={{ color: '#7c6d55' }}>{t('rowPrice')}</span><span className="text-xl font-black" style={{ color: GREEN }}>{fmt(total)}</span></div>
            </div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('yourName')} className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none mb-3" style={{ background: '#fff', border: '1px solid #e3d5bd', color: GREEN }} />
            {!wheelResult && total >= 30 && (<div className="mb-4"><WheelPromoBanner onClick={() => setShowWheel(true)} /></div>)}
            {!wheelResult && total < 30 && (<div className="mb-4 text-center text-xs font-semibold px-4 py-2.5 rounded-xl" style={{ background: '#f7f0e2', color: '#8a7c62' }}>{t('wheelThresholdPrefix')} {fmt(30 - total)} {t('wheelThresholdSuffix')}</div>)}
            {wheelResult && wheelResult.code && (<div className="w-full mb-4 px-4 py-3 rounded-xl flex items-center gap-2" style={{ background: GREEN, animation: 'popIn .5s ease' }}><Gift size={16} color={GOLD} /><span className="text-xs font-bold" style={{ color: GOLD }}>{t('wonPrefix')} {mx(wheelResult.prize, lang)} {t('wonSuffix')}</span></div>)}
            <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={handleSend} className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mb-3" style={{ background: 'linear-gradient(135deg, #25D366, #1fb855)', color: '#fff', boxShadow: '0 8px 22px rgba(37,211,102,.4)' }}><MessageCircle size={18} /> {t('waSend')}</a>
          </div>
        )}
      </div>
      )}
      {kind && step === totalSteps && sent && (
        <div className="px-5 flex flex-col items-center justify-center text-center py-10 relative">
          {burst && <EmojiConfetti emojis={['🎉', '🥙', '✅', '⭐', '🎊']} />}
          <div className="rounded-full flex items-center justify-center mb-5" style={{ width: 84, height: 84, background: '#e8f9ee', animation: 'popIn .65s cubic-bezier(.34,1.56,.64,1) both, ringPulse 1.8s ease-out .5s infinite' }}>
            <span className="text-5xl">✅</span>
          </div>
          <div className="font-black text-xl mb-2" style={{ color: GREEN, animation: 'slideUpFade .5s ease .15s both' }}>{t('orderSentTitle')}</div>
          <p className="text-sm mb-8" style={{ color: '#7c6d55', animation: 'slideUpFade .5s ease .3s both' }}>{t('orderSentSub')}</p>
          <button onClick={() => setShowReceipt(true)} className="w-full flex items-center justify-center gap-2 mb-3 py-3 rounded-xl font-bold text-sm" style={{ background: '#fff', color: GREEN, border: `1px solid #e3d5bd` }}><span className="text-base">🧾</span> {t('showReceiptBtn')}</button>
          {showReceipt && sentSnapshot && <ReceiptView snapshot={sentSnapshot} onClose={() => setShowReceipt(false)} />}
          <div className="w-full flex flex-col gap-3" style={{ animation: 'slideUpFade .5s ease .45s both' }}>
            <button onClick={resetBuilder} className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: ORANGE }}>{t('newOrderBtn')}</button>
            <button onClick={back} className="w-full py-3.5 rounded-xl font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('backToHomeBtn')}</button>
            {installPrompt && (
              <button onClick={onInstall} className="w-full py-3 rounded-xl font-semibold text-xs" style={{ background: '#fdecd4', color: '#8a5a1f', border: '1px solid #f0d4a8' }}>{t('installAppBtn')}</button>
            )}
          </div>
        </div>
      )}
      {kind && step === totalSteps && showWheel && (
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
      {kind && step < totalSteps && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[360px]">
          <button onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-xl disabled:opacity-40" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('continueBtn')} <ArrowRight size={18} /></button>
        </div>
      )}
      {pendingSoldOutExtra && (
        <ConfigModal onClose={() => setPendingSoldOutExtra(null)}>
          <div className="p-6 text-center">
            <div className="text-3xl mb-3">⚠️</div>
            <p className="text-sm font-bold mb-6" style={{ color: GREEN }}>{t('extraSoldOutWarnPrefix')} {mx(pendingSoldOutExtra.name, lang)} {t('extraSoldOutWarnSuffix')}</p>
            <div className="flex flex-col gap-2.5">
              <button onClick={() => { pendingSoldOutExtra.onConfirm(); setPendingSoldOutExtra(null); }} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)' }}>{t('addAnywayBtn')}</button>
              <button onClick={() => setPendingSoldOutExtra(null)} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('cancelBtn')}</button>
            </div>
          </div>
        </ConfigModal>
      )}
    </div>
  );
}
function Row({ label, value }) {
  return <div className="flex justify-between items-start py-1.5 gap-3"><span className="text-xs font-semibold flex-shrink-0" style={{ color: '#a4906c' }}>{label}</span><span className="text-sm font-bold text-right" style={{ color: GREEN }}>{value}</span></div>;
}

/* ============ GROUP ORDER ============ */
function makeGroupCode() { return makeShortCode(5); }
function GroupOrderView({ back }) {
  const { lang, t, installPrompt, onInstall } = React.useContext(LangContext);
  const [view, setView] = useState('home');
  const [code, setCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [name, setName] = useState('');
  const [tab, setTab] = useState(MENU[0].key);
  const [catImgIdx, setCatImgIdx] = useState(0);
  useEffect(() => {
    setCatImgIdx(0);
    const imgs = CATEGORY_IMAGES[tab];
    if (!imgs || imgs.length < 2) return;
    const iv = setInterval(() => setCatImgIdx((i) => (i + 1) % imgs.length), 3500);
    return () => clearInterval(iv);
  }, [tab]);
  const [localCart, setLocalCart] = useState({});
  const [group, setGroup] = useState(null);
  const [err, setErr] = useState('');
  const [showWheel, setShowWheel] = useState(false);
  const [wheelResult, setWheelResult] = useState(null);
  const [openExtra, setOpenExtra] = useState(null);
  const [configExtras, setConfigExtras] = useState([]);
  const [configMeat, setConfigMeat] = useState(null);
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
  const [cartPop, setCartPop] = useState(0);
  const [lunchPending, setLunchPending] = useState(null);
  const [weekendWarnOpen, setWeekendWarnOpen] = useState(false);
  const [meatChoiceItem, setMeatChoiceItem] = useState(null);
  const [meatChoiceSel, setMeatChoiceSel] = useState(null);
  const [meatChoiceNote, setMeatChoiceNote] = useState('');
  const [meatChoiceQty, setMeatChoiceQty] = useState(1);
  const [sauceSel, setSauceSel] = useState({});
  const [allergenLegendOpen, setAllergenLegendOpen] = useState(false);
  const [lastAddedTab, setLastAddedTab] = useState(null);
  const [priceOverrides, setPriceOverrides] = useState({});
  const [waExtraText, setWaExtraText] = useState('');
  const [photoOverrides, setPhotoOverrides] = useState({});
  const [soldOutIds, setSoldOutIds] = useState([]);
  const [chickenSoldOut, setChickenSoldOut] = useState(false);
  const [soldOutExtras, setSoldOutExtras] = useState([]);
  const [pendingSoldOutExtra, setPendingSoldOutExtra] = useState(null);
  useEffect(() => {
    safeGet('siteconfig:priceOverrides').then((r) => { if (r) setPriceOverrides(r); });
    safeGet('siteconfig:photoOverrides').then((r) => { if (r) setPhotoOverrides(r); });
    safeGet('siteconfig:soldOut').then((r) => { if (r) setSoldOutIds(r); });
    safeGet('siteconfig:chickenSoldOut').then((r) => { setChickenSoldOut(!!r); });
    safeGet('siteconfig:soldOutExtras').then((r) => { if (r) setSoldOutExtras(r); });
    safeGet('siteconfig:waTemplate').then((r) => { if (r && r.text) setWaExtraText(r.text); });
  }, []);
  const EFFECTIVE_MENU = useMemo(() => applyPriceOverrides(priceOverrides, photoOverrides, soldOutIds), [priceOverrides, photoOverrides, soldOutIds]);
  const EFFECTIVE_UPSELL_POOL = useMemo(() => applyOverridesToFlatList(UPSELL_ITEMS_POOL, priceOverrides, photoOverrides, soldOutIds), [priceOverrides, photoOverrides, soldOutIds]);
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [lunchDrink, setLunchDrink] = useState(null);
  const confirmLunchAdd = () => {
    if (!lunchPending || !lunchDrink) return;
    addLocal(`lunch-${Date.now()}`, `${lunchPending.label} + Dose Getränk (${lunchDrink})`, 9.5, `${lunchPending.deLabel} + Dose Getränk (${lunchDrink})`);
    setLunchPending(null); setLunchDrink(null);
  };
  const [pastaStep, setPastaStep] = useState(0);
  const [pastaType, setPastaType] = useState(null);
  const [pastaSauceSel, setPastaSauceSel] = useState(null);
  const addLocal = (id, label, price, deLabel, qty = 1) => { setLocalCart((c) => ({ ...c, [id]: { name: label, deName: deLabel || label, price, qty: (c[id]?.qty || 0) + qty } })); setCartPop((x) => x + 1); };
  const removeLocal = (id) => setLocalCart((c) => { const ex = c[id]; if (!ex) return c; if (ex.qty <= 1) { const cp = { ...c }; delete cp[id]; return cp; } return { ...c, [id]: { ...ex, qty: ex.qty - 1 } }; });
  const myLines = Object.entries(localCart);
  const myTotal = myLines.reduce((s, [, v]) => s + v.qty * v.price, 0);
  const submitMyOrder = async () => {
    if (myLines.length === 0) return;
    const fresh = (await safeGet(`grouporder:${code}`)) || { code, people: [] };
    const people = fresh.people.filter((p) => p.name !== name);
    people.push({ name, items: myLines.map(([key, v]) => ({ name: itemNotes[key] ? `${v.deName || v.name} – ${itemNotes[key]}` : (v.deName || v.name), price: v.price, qty: v.qty })), total: myTotal });
    const pending = (fresh.pending || []).filter((p) => p !== name);
    const updated = { ...fresh, people, pending };
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
  const activeCategory = EFFECTIVE_MENU.find((m) => m.key === tab);

  const [quickSearch, setQuickSearch] = useState('');
  const quickSearchRef = useRef(null);
  const ALL_SEARCHABLE_ITEMS = useMemo(() => {
    return EFFECTIVE_MENU.flatMap((cat) => cat.items
      .filter((i) => !i.customPizza && !i.customPasta)
      .map((i) => ({ ...i, catKey: cat.key })));
  }, [EFFECTIVE_MENU]);
  const quickSearchResults = useMemo(() => {
    if (!quickSearch.trim()) return [];
    const q = quickSearch.trim().toLowerCase();
    const exactNum = ALL_SEARCHABLE_ITEMS.filter((i) => menuNum(i.id).toLowerCase() === q);
    const nameMatches = ALL_SEARCHABLE_ITEMS.filter((i) => menuNum(i.id).toLowerCase() !== q && (mx(i.name, lang).toLowerCase().includes(q) || i.name.toLowerCase().includes(q)));
    return [...exactNum, ...nameMatches].slice(0, 15);
  }, [quickSearch, ALL_SEARCHABLE_ITEMS, lang]);
  const handleQuickAdd = (item) => {
    const soExtra = findSoldOutExtraInItem(item, soldOutExtras);
    const proceed = () => {
      if (item.soldOut) return;
      if (item.weekend && !isWeekendDay()) { setWeekendWarnOpen(true); return; }
      if (item.priceLarge !== undefined) {
        quickSearchRef.current?.blur();
        setTab(item.catKey);
        setOpenExtra({ itemId: item.id, size: 'gross' }); setConfigExtras([]); setConfigNote(''); setConfigMeat(null);
        return;
      }
      if (item.catKey === 'kebap' && hasDonerMeat(item)) { quickSearchRef.current?.blur(); setMeatChoiceSel(null); setMeatChoiceNote(''); setMeatChoiceQty(1); setMeatChoiceItem(item); return; }
      if (isLunchWindowNow() && LUNCH_CATEGORIES.includes(item.catKey) && item.catKey !== 'pizza') { quickSearchRef.current?.blur(); setLunchDrink(null); setLunchPending({ label: mx(item.name, lang), deLabel: item.name }); return; }
      setLastAddedTab(item.catKey); addLocal(item.id, mx(item.name, lang), item.price, item.name);
    };
    if (soExtra) { setPendingSoldOutExtra({ name: soExtra, onConfirm: proceed }); return; }
    proceed();
  };

  return (
    <div className="pb-32 relative">
      {burst && <EmojiConfetti emojis={['🎉', '🥙', '✅', '⭐']} />}
      {bigBurst && <EmojiConfetti emojis={['🎉', '🎊', '📲', '🥙', '⭐', '🔥']} />}
      <CartPopEmoji trigger={cartPop} />
      {lunchPending && (
        <ConfigModal onClose={() => setLunchPending(null)}>
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-black text-lg" style={{ color: GREEN }}>{t('lunchComboTitle')}</h3>
              <button onClick={() => setLunchPending(null)} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0e5cf' }}><X size={16} color={GREEN} /></button>
            </div>
            <p className="text-sm mb-4" style={{ color: '#7c6d55' }}>{t('lunchComboSub')}</p>
            <div className="flex flex-col gap-2 mb-5">
              {LUNCH_DRINKS.map((d) => (<OptionCard key={d} selected={lunchDrink === d} onClick={() => setLunchDrink(d)}><span className="font-bold text-sm">{mx(d, lang)}</span></OptionCard>))}
            </div>
            <button onClick={confirmLunchAdd} disabled={!lunchDrink} className="w-full py-3.5 rounded-xl font-bold text-sm text-white disabled:opacity-40" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)' }}>{t('lunchComboConfirm')} · {fmt(9.5)}</button>
          </div>
        </ConfigModal>
      )}
      {meatChoiceItem && (
        <ConfigModal onClose={() => setMeatChoiceItem(null)}>
          <div className="p-6">
            <h3 className="font-black text-lg mb-1" style={{ color: GREEN }}>{mx(meatChoiceItem.name, lang)}</h3>
            <div className="text-[11px] font-bold tracking-widest mb-2 mt-4" style={{ color: '#a4906c' }}>{t('meatTypeLabel')}</div>
            <div className="flex gap-2 mb-6">
              <button onClick={() => setMeatChoiceSel(null)} className="flex-1 py-3 rounded-lg text-sm font-bold" style={!meatChoiceSel ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{t('meatKalb')}</button>
              <button onClick={() => !chickenSoldOut && setMeatChoiceSel('Hähnchen')} disabled={chickenSoldOut} className="flex-1 py-3 rounded-lg text-sm font-bold disabled:opacity-40" style={meatChoiceSel === 'Hähnchen' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{mx('Hähnchen', lang)}{chickenSoldOut && <span className="block text-[9px] font-black mt-0.5">{t('soldOutBadge')}</span>}</button>
            </div>
            <input
              value={meatChoiceNote}
              onChange={(e) => setMeatChoiceNote(e.target.value)}
              placeholder={t('noteExampleOnions')}
              className="w-full mb-5 px-3.5 py-3 rounded-xl text-sm font-medium outline-none"
              style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
            />
            <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('quantityLabel')}</div>
            <div className="flex items-center justify-center gap-5 mb-6 py-1">
              <button onClick={() => setMeatChoiceQty((q) => Math.max(1, q - 1))} className="w-11 h-11 rounded-full flex items-center justify-center font-black text-lg" style={{ background: '#f7f0e2', color: GREEN }}>−</button>
              <span key={meatChoiceQty} className="font-black text-2xl w-10 text-center" style={{ color: GREEN, animation: 'qtyPop .25s cubic-bezier(.34,1.56,.64,1)' }}>{meatChoiceQty}</span>
              <button onClick={() => setMeatChoiceQty((q) => Math.min(50, q + 1))} className="w-11 h-11 rounded-full flex items-center justify-center font-black text-lg text-white" style={{ background: ORANGE }}>+</button>
            </div>
            <button
              onClick={() => {
                const item = meatChoiceItem;
                let deLabel = meatChoiceSel ? `${item.name} [${meatChoiceSel}]` : item.name;
                let displayLabel = meatChoiceSel ? `${mx(item.name, lang)} [${mx(meatChoiceSel, lang)}]` : mx(item.name, lang);
                if (meatChoiceNote.trim()) { deLabel += ` [${meatChoiceNote.trim()}]`; displayLabel += ` [${meatChoiceNote.trim()}]`; }
                setLastAddedTab('kebap');
                addLocal(`${item.id}-${meatChoiceSel || 'x'}-${Date.now()}`, displayLabel, item.price, deLabel, meatChoiceQty);
                setMeatChoiceItem(null);
                if (quickSearch.trim()) setTimeout(() => quickSearchRef.current?.focus(), 50);
              }}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white"
              style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}
            >{t('hinzufuegen')} · {fmt(meatChoiceItem.price * meatChoiceQty)}</button>
          </div>
        </ConfigModal>
      )}
      {pendingSoldOutExtra && (
        <ConfigModal onClose={() => setPendingSoldOutExtra(null)}>
          <div className="p-6 text-center">
            <div className="text-3xl mb-3">⚠️</div>
            <p className="text-sm font-bold mb-6" style={{ color: GREEN }}>{t('extraSoldOutWarnPrefix')} {mx(pendingSoldOutExtra.name, lang)} {t('extraSoldOutWarnSuffix')}</p>
            <div className="flex flex-col gap-2.5">
              <button onClick={() => { pendingSoldOutExtra.onConfirm(); setPendingSoldOutExtra(null); }} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)' }}>{t('addAnywayBtn')}</button>
              <button onClick={() => setPendingSoldOutExtra(null)} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('cancelBtn')}</button>
            </div>
          </div>
        </ConfigModal>
      )}
      {weekendWarnOpen && (
        <ConfigModal onClose={() => setWeekendWarnOpen(false)}>
          <div className="p-6 text-center">
            <div className="text-5xl mb-3" style={{ animation: 'sadBounce 1.2s ease-in-out infinite' }}>😔</div>
            <h3 className="font-black text-lg mb-2" style={{ color: GREEN }}>{t('weekendWarnTitle')}</h3>
            <p className="text-sm mb-6" style={{ color: '#7c6d55' }}>{t('weekendItemOnly')}</p>
            <button onClick={() => setWeekendWarnOpen(false)} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)' }}>{t('installHelpClose')}</button>
          </div>
        </ConfigModal>
      )}
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
          <a
            href={`https://wa.me/?text=${encodeURIComponent(t('groupShareMsg').replace('{code}', code))}`}
            target="_blank" rel="noopener noreferrer"
            className="w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 mb-3"
            style={{ background: 'linear-gradient(135deg, #25D366, #1fb855)', color: '#fff', boxShadow: '0 8px 20px rgba(37,211,102,.35)' }}
          ><MessageCircle size={18} /> {t('groupShareBtn')}</a>
          <button onClick={() => setView('name')} className="w-full py-3.5 rounded-xl font-bold text-base" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('continueToMyOrder')}</button>
        </div>
      )}
      {view === 'name' && (
        <div className="px-5 pt-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('yourName')} className="w-full px-4 py-3.5 rounded-xl text-base font-semibold outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
          <button onClick={async () => {
            if (!name) return;
            setView('order');
            const fresh = (await safeGet(`grouporder:${code}`)) || { code, people: [] };
            const pending = (fresh.pending || []).filter((p) => p !== name);
            if (!(fresh.people || []).some((p) => p.name === name)) pending.push(name);
            const updated = { ...fresh, pending };
            await safeSet(`grouporder:${code}`, updated); setGroup(updated);
          }} disabled={!name} className="w-full py-3.5 rounded-xl font-bold text-base disabled:opacity-50" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('continueToMenu')}</button>
        </div>
      )}
      {view === 'order' && (
        <div>
          <div className="px-5 pt-2 pb-1">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: ORANGE }}>🔍</span>
              <input
                ref={quickSearchRef}
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder={t('quickSearchPh')}
                inputMode="numeric"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm font-bold outline-none"
                style={{ background: '#fff', border: `1.5px solid ${quickSearch ? ORANGE : '#e3d5bd'}`, color: GREEN, boxShadow: quickSearch ? '0 6px 20px rgba(230,90,10,.15)' : 'none', transition: 'border-color .2s ease, box-shadow .2s ease' }}
              />
              {quickSearch && (
                <button onClick={() => setQuickSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#f0e5cf' }}><X size={12} color={GREEN} /></button>
              )}
            </div>
          </div>
          {quickSearch.trim() && (
            <div className="px-5 pb-24">
              {quickSearchResults.length === 0 ? (
                <p className="text-xs font-semibold text-center py-4" style={{ color: '#a4906c' }}>{t('quickSearchNoResults')}</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {quickSearchResults.map((item, i) => (
                    <button key={item.id} onClick={() => handleQuickAdd(item)} disabled={item.soldOut} className="w-full text-left bg-white rounded-xl p-3 flex items-center justify-between shadow-sm disabled:opacity-50 active:scale-[.98]" style={{ animation: `resultPop .3s cubic-bezier(.22,1,.36,1) ${i * 0.04}s both`, transition: 'transform .1s ease' }}>
                      <span className="font-bold text-sm" style={{ color: GREEN }}>{menuNum(item.id) && <span className="inline-flex items-center justify-center min-w-[26px] px-1.5 py-0.5 rounded-md mr-1.5 text-[11px] font-black" style={{ background: '#fdecd4', color: ORANGE }}>{menuNum(item.id)}</span>}{mx(item.name, lang)}{item.soldOut && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: '#8a7c62', color: '#fff' }}>{t('soldOutBadge')}</span>}</span>
                      <span className="text-xs font-bold flex-shrink-0 ml-2" style={{ color: CHILI }}>{item.priceLarge !== undefined ? fmt(item.priceLarge) : fmt(item.price)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="flex gap-2 overflow-x-auto px-5 pt-2 pb-2">
            {MENU.map((m) => (<button key={m.key} onClick={() => setTab(m.key)} className="flex-none px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap flex items-center gap-1.5" style={tab === m.key ? { background: `linear-gradient(135deg, ${GREEN}, #1d4530)`, color: GOLD, boxShadow: '0 6px 16px rgba(21,56,38,.3)', border: '1.5px solid transparent' } : { background: '#fff', color: GREEN, border: `1.5px solid #e3d5bd` }}><span className="text-base">{CATEGORY_ICONS[m.key]}</span> {catLabel(m.key, lang)}</button>))}
          </div>
          {CATEGORY_IMAGES[tab] && (
            <div className="px-5 pt-2">
              <div className="rounded-2xl overflow-hidden relative h-40" style={{ boxShadow: '0 8px 20px rgba(21,56,38,.15)' }}>
                <img key={catImgIdx} src={CATEGORY_IMAGES[tab][catImgIdx]} className="w-full h-full object-cover" style={{ animation: 'modalBgFade .6s ease' }} alt={catLabel(tab, lang)} />
                <div className="absolute inset-0 flex items-end p-3" style={{ background: 'linear-gradient(0deg, rgba(21,56,38,.75), rgba(21,56,38,.05))' }}>
                  <span className="text-white font-black text-lg">{CATEGORY_ICONS[tab]} {catLabel(tab, lang)}</span>
                </div>
              </div>
            </div>
          )}
          <div className="px-5 pt-2 flex justify-end">
        <button onClick={() => setAllergenLegendOpen(true)} className="text-[11px] font-bold underline" style={{ color: '#a4906c' }}>{t('allergenInfoBtn')}</button>
      </div>
      {allergenLegendOpen && <AllergenLegendModal onClose={() => setAllergenLegendOpen(false)} />}
      <div key={tab} className="px-5 pt-2 grid md:grid-cols-2 xl:grid-cols-3 gap-2.5 items-start" style={{ animation: 'modalBgFade .35s ease' }}>
            {activeCategory.items.map((item) => {
              if (item.priceSmall !== undefined) {
                const isOpen = openExtra?.itemId === item.id;
                const size = openExtra?.size || 'gross';
                const basePrice = size === 'klein' ? item.priceSmall : item.priceLarge;
                const configTotal = basePrice + configExtras.reduce((s, e) => s + extraCost(e), 0);
                const doOpen = () => { if (item.soldOut) return; if (item.weekend && !isWeekendDay()) { setWeekendWarnOpen(true); return; } setOpenExtra({ itemId: item.id, size: 'gross' }); setConfigExtras([]); setConfigNote(''); setConfigMeat(null); };
            const openFor = () => { const soExtra = findSoldOutExtraInItem(item, soldOutExtras); if (soExtra) { setPendingSoldOutExtra({ name: soExtra, onConfirm: doOpen }); return; } doOpen(); };
                const setSize = (sz) => setOpenExtra({ itemId: item.id, size: sz });
                const toggleExtra = (t) => { if (!configExtras.includes(t) && soldOutExtras.includes(t)) { setPendingSoldOutExtra({ name: t, onConfirm: () => setConfigExtras((ex) => [...ex, t]) }); return; } setConfigExtras((ex) => (ex.includes(t) ? ex.filter((x) => x !== t) : [...ex, t])); };
                const closeModal = () => { setOpenExtra(null); setConfigExtras([]); setConfigNote(''); setConfigMeat(null);  if (quickSearch.trim()) setTimeout(() => quickSearchRef.current?.focus(), 50); };
                const confirmAdd = () => {
                  const sizeLabel = size === 'klein' ? 'klein' : 'groß';
                  const displaySizeLabel = size === 'klein' ? t('sizeSmall') : t('sizeLarge');
                  let deLabel = configExtras.length > 0 ? `${item.name} (${sizeLabel}) ${configExtras.map((e) => `+${e}`).join(' ')}` : `${item.name} (${sizeLabel})`;
                  let displayLabel = configExtras.length > 0 ? `${mx(item.name, lang)} (${displaySizeLabel}) ${configExtras.map((e) => `+${mx(e, lang)}`).join(' ')}` : `${mx(item.name, lang)} (${displaySizeLabel})`;
                  if (configMeat) { deLabel += ` [${configMeat}]`; displayLabel += ` [${mx(configMeat, lang)}]`; }
                  if (configNote.trim()) { deLabel += ` [${configNote.trim()}]`; displayLabel += ` [${configNote.trim()}]`; }
                  if (isLunchWindowNow() && tab === 'pizza' && size === 'gross') {
                    closeModal();
                    setLunchDrink(null);
                    setLunchPending({ label: displayLabel, deLabel });
                    return;
                  }
                  const lineKey = `${item.id}-${size}-${configMeat || 'x'}-${configExtras.slice().sort().join('_') || 'ohne'}`;
                  setLastAddedTab(tab);
                  addLocal(lineKey, displayLabel, configTotal, deLabel);
                  closeModal();
                };
                return (
                  <React.Fragment key={item.id}>
                    <button onClick={openFor} className="text-left bg-white rounded-xl overflow-hidden shadow-sm w-full" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                      {item.img && <img src={item.img} alt={item.name} className="w-full h-36 object-cover" loading="lazy" />}
                      <div className="p-3.5">
                        <div className="font-bold text-sm mb-1" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{mx(item.name, lang)}<AllergenTag alg={item.alg} />{item.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}{item.soldOut && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: '#8a7c62', color: '#fff' }}>{t('soldOutBadge')}</span>}</div>
                        {item.desc && <div className="text-[11px] font-medium mb-2" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}
                        <div className="text-xs font-bold" style={{ color: CHILI }}>{t('sizeSmall')} {fmt(item.priceSmall)} · {t('sizeLarge')} {fmt(item.priceLarge)}</div>
                      </div>
                    </button>
                    {isOpen && (
                      <ConfigModal onClose={closeModal}>
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-black text-xl" style={{ color: GREEN }}>{mx(item.name, lang)}<AllergenTag alg={item.alg} /></h3>
                            <button onClick={closeModal} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0e5cf' }}><X size={16} color={GREEN} /></button>
                          </div>
                          {item.desc && <p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{mx(item.desc, lang)}</p>}
                          <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('sizeLabel')}</div>
                          <div className="flex gap-2 mb-5">
                            <button onClick={() => setSize('klein')} className="flex-1 py-4 rounded-xl text-center font-bold" style={size === 'klein' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>
                              <div className="text-base">{t('sizeSmall')}</div><div className="text-sm opacity-80">{fmt(item.priceSmall)}</div>
                            </button>
                            <button onClick={() => setSize('gross')} className="flex-1 py-4 rounded-xl text-center font-bold" style={size === 'gross' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>
                              <div className="text-base">{t('sizeLarge')}</div><div className="text-sm opacity-80">{fmt(item.priceLarge)}</div>
                            </button>
                          </div>
                          {tab === 'pizza' && size === 'klein' && isLunchWindowNow() && (
                            <div className="text-[11px] font-semibold px-3 py-2.5 rounded-lg mb-4" style={{ background: '#fdecd4', color: '#8a5a1f' }}>{t('lunchSmallHint')}</div>
                          )}
                          {hasDonerMeat(item) && (
                            <>
                              <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('meatTypeLabel')}</div>
                              <div className="flex gap-2 mb-5">
                                <button onClick={() => setConfigMeat(null)} className="flex-1 py-2.5 rounded-lg text-xs font-bold" style={!configMeat ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{t('meatKalb')}</button>
                                <button onClick={() => !chickenSoldOut && setConfigMeat('Hähnchen')} disabled={chickenSoldOut} className="flex-1 py-2.5 rounded-lg text-xs font-bold disabled:opacity-40" style={configMeat === 'Hähnchen' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>{mx('Hähnchen', lang)}{chickenSoldOut && <span className="block text-[8px] font-black">{t('soldOutBadge')}</span>}</button>
                              </div>
                            </>
                          )}
                          <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('extrasPricePrefix')} {fmt(1.0)}):</div>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {EXTRA_TOPPINGS.map((top) => (
                              <button key={top} onClick={() => toggleExtra(top)} className="px-3 py-2.5 rounded-lg text-xs font-bold text-left" style={configExtras.includes(top) ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>{mx(top, lang)}{soldOutExtras.includes(top) && <span className="ml-1">⚠️</span>} <span className="opacity-70">{extraCost(top) > 0 ? `+${fmt(extraCost(top))}` : t('freeLabel')}</span></button>
                            ))}
                          </div>
                          <input
                            value={configNote}
                            onChange={(e) => setConfigNote(e.target.value)}
                            placeholder={t('noteExampleCheese')}
                            className="w-full mb-4 px-3.5 py-3 rounded-xl text-sm font-medium outline-none"
                            style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
                          />
                          <button onClick={confirmAdd} className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}><Plus size={16} /> {t('hinzufuegen')} · {fmt(configTotal)}</button>
                        </div>
                      </ConfigModal>
                    )}
                  </React.Fragment>
                );
              }
              if (item.customPizza) {
                const isOpen = openExtra?.itemId === item.id;
                const configTotal = item.price + configExtras.reduce((s, e) => s + extraCost(e), 0);
                const doOpen = () => { setOpenExtra({ itemId: item.id }); setConfigExtras([]); setConfigNote(''); };
            const openFor = () => { const soExtra = findSoldOutExtraInItem(item, soldOutExtras); if (soExtra) { setPendingSoldOutExtra({ name: soExtra, onConfirm: doOpen }); return; } doOpen(); };
                const toggleExtra = (top) => { if (!configExtras.includes(top) && soldOutExtras.includes(top)) { setPendingSoldOutExtra({ name: top, onConfirm: () => setConfigExtras((ex) => [...ex, top]) }); return; } setConfigExtras((ex) => (ex.includes(top) ? ex.filter((x) => x !== top) : [...ex, top])); };
                const closeModal = () => { setOpenExtra(null); setConfigExtras([]); setConfigNote('');  if (quickSearch.trim()) setTimeout(() => quickSearchRef.current?.focus(), 50); };
                const confirmAdd = () => {
                  let deLabel = configExtras.length > 0 ? `${item.name} ${configExtras.map((e) => `+${e}`).join(' ')}` : `${item.name}`;
                  let displayLabel = configExtras.length > 0 ? `${mx(item.name, lang)} ${configExtras.map((e) => `+${mx(e, lang)}`).join(' ')}` : `${mx(item.name, lang)}`;
                  if (configNote.trim()) { deLabel += ` [${configNote.trim()}]`; displayLabel += ` [${configNote.trim()}]`; }
                  const lineKey = `${item.id}-${configExtras.slice().sort().join('_') || 'ohne'}`;
                  addLocal(lineKey, displayLabel, configTotal, deLabel);
                  closeModal();
                };
                return (
                  <React.Fragment key={item.id}>
                    <button onClick={openFor} className="text-left bg-white rounded-xl overflow-hidden shadow-sm w-full" style={{ borderLeft: `4px solid ${GOLD}` }}>
                      {item.img && <img src={item.img} alt={item.name} className="w-full h-28 object-cover" loading="lazy" />}
                      <div className="p-3.5">
                        <div className="font-bold text-sm mb-1" style={{ color: GREEN }}>{mx(item.name, lang)}</div>
                        {item.desc && <div className="text-[11px] font-medium mb-1" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}
                        <div className="text-xs font-bold" style={{ color: CHILI }}>{t('chooseArrow')} · {fmt(item.price)}</div>
                      </div>
                    </button>
                    {isOpen && (
                      <ConfigModal onClose={closeModal}>
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-black text-xl" style={{ color: GREEN }}>{mx(item.name, lang)}<AllergenTag alg={item.alg} /></h3>
                            <button onClick={closeModal} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0e5cf' }}><X size={16} color={GREEN} /></button>
                          </div>
                          {item.desc && <p className="text-sm mb-5" style={{ color: '#7c6d55' }}>{mx(item.desc, lang)}</p>}
                          <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('rowExtras').toUpperCase()} (+{fmt(1.0)})</div>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {EXTRA_TOPPINGS.map((top) => (
                              <button key={top} onClick={() => toggleExtra(top)} className="px-3 py-2.5 rounded-lg text-xs font-bold text-left" style={configExtras.includes(top) ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>{mx(top, lang)}{soldOutExtras.includes(top) && <span className="ml-1">⚠️</span>} <span className="opacity-70">{extraCost(top) > 0 ? `+${fmt(extraCost(top))}` : t('freeLabel')}</span></button>
                            ))}
                          </div>
                          <input
                            value={configNote}
                            onChange={(e) => setConfigNote(e.target.value)}
                            placeholder={t('noteExampleCheese')}
                            className="w-full mb-4 px-3.5 py-3 rounded-xl text-sm font-medium outline-none"
                            style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
                          />
                          <button onClick={confirmAdd} className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}><Plus size={16} /> {t('hinzufuegen')} · {fmt(configTotal)}</button>
                        </div>
                      </ConfigModal>
                    )}
                  </React.Fragment>
                );
              }
              if (item.customPasta) {
                const isOpen = openExtra?.itemId === item.id;
                const detectedType = item.name.includes('Makkaroni') ? 'Makkaroni' : 'Spaghetti';
                const configTotal = item.price + (pastaSauceSel === 'Bolognese-Soße' ? 0.5 : 0) + configExtras.reduce((s, e) => s + extraCost(e), 0);
                const doOpen = () => { setOpenExtra({ itemId: item.id }); setPastaStep(0); setPastaType(detectedType); setPastaSauceSel(null); setConfigExtras([]); setConfigNote(''); };
            const openFor = () => { const soExtra = findSoldOutExtraInItem(item, soldOutExtras); if (soExtra) { setPendingSoldOutExtra({ name: soExtra, onConfirm: doOpen }); return; } doOpen(); };
                const toggleExtra = (top) => { if (!configExtras.includes(top) && soldOutExtras.includes(top)) { setPendingSoldOutExtra({ name: top, onConfirm: () => setConfigExtras((ex) => [...ex, top]) }); return; } setConfigExtras((ex) => (ex.includes(top) ? ex.filter((x) => x !== top) : [...ex, top])); };
                const closeModal = () => { setOpenExtra(null); setPastaStep(0); setPastaType(null); setPastaSauceSel(null); setConfigExtras([]); setConfigNote(''); };
                const confirmAdd = () => {
                  let deLabel = `${item.name} – ${pastaSauceSel}${configExtras.length > 0 ? ` ${configExtras.map((e) => `+${e}`).join(' ')}` : ''}`;
                  let displayLabel = `${mx(item.name, lang)} – ${mx(pastaSauceSel, lang)}${configExtras.length > 0 ? ` ${configExtras.map((e) => `+${mx(e, lang)}`).join(' ')}` : ''}`;
                  if (configNote.trim()) { deLabel += ` [${configNote.trim()}]`; displayLabel += ` [${configNote.trim()}]`; }
                  const lineKey = `${item.id}-${pastaSauceSel}-${configExtras.slice().sort().join('_') || 'ohne'}`;
                  addLocal(lineKey, displayLabel, configTotal, deLabel);
                  closeModal();
                };
                return (
                  <React.Fragment key={item.id}>
                    <button onClick={openFor} className="text-left bg-white rounded-xl overflow-hidden shadow-sm w-full" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                      <div className="p-3.5">
                        <div className="font-bold text-sm mb-1" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{mx(item.name, lang)}</div>
                        {item.desc && <div className="text-[11px] font-medium mb-1" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}
                        <div className="text-xs font-bold" style={{ color: CHILI }}>{fmt(item.price)}</div>
                      </div>
                    </button>
                    {isOpen && (
                      <ConfigModal onClose={closeModal}>
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-black text-xl" style={{ color: GREEN }}>{mx(item.name, lang)}<AllergenTag alg={item.alg} /></h3>
                            <button onClick={closeModal} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0e5cf' }}><X size={16} color={GREEN} /></button>
                          </div>
                          <div className="flex items-center gap-1.5 mb-5">
                            {[0, 1].map((i) => <div key={i} className="h-1.5 rounded-full flex-1" style={{ background: i <= pastaStep ? ORANGE : '#e3d5bd' }} />)}
                          </div>
                          {pastaStep === 0 && (
                            <div>
                              <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('chooseSauceTitle').toUpperCase()}</div>
                              <div className="flex flex-col gap-2.5 mb-4">
                                {PASTA_SAUCE_OPTIONS.map((s) => (<OptionCard key={s} selected={pastaSauceSel === s} onClick={() => setPastaSauceSel(s)}><span className="font-bold text-sm">{mx(s, lang)} {s === 'Bolognese-Soße' ? `+${fmt(0.5)}` : `· ${t('freeLabel')}`}</span></OptionCard>))}
                              </div>
                            </div>
                          )}
                          {pastaStep === 1 && (
                            <div className="mb-4">
                              <div className="text-[11px] font-bold tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('rowExtras').toUpperCase()} (+{fmt(1.0)})</div>
                              <div className="grid grid-cols-2 gap-2 mb-4">
                                {PASTA_EXTRA_ITEMS.map((top) => (
                                  <button key={top} onClick={() => toggleExtra(top)} className="px-3 py-2.5 rounded-lg text-xs font-bold text-left" style={configExtras.includes(top) ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>{mx(top, lang)}{soldOutExtras.includes(top) && <span className="ml-1">⚠️</span>} <span className="opacity-70">{extraCost(top) > 0 ? `+${fmt(extraCost(top))}` : t('freeLabel')}</span></button>
                                ))}
                              </div>
                              <input
                                value={configNote}
                                onChange={(e) => setConfigNote(e.target.value)}
                                placeholder={t('noteExampleCheese')}
                                className="w-full px-3.5 py-3 rounded-xl text-sm font-medium outline-none"
                                style={{ background: '#f7f0e2', border: '1px solid #e3d5bd', color: GREEN }}
                              />
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            {pastaStep > 0 && <button onClick={() => setPastaStep(0)} className="px-4 py-3 rounded-xl text-sm font-semibold" style={{ background: '#f0e5cf', color: GREEN }}>{t('zurueck')}</button>}
                            {pastaStep === 0 && <button onClick={() => setPastaStep(1)} disabled={!pastaSauceSel} className="flex-1 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)' }}>{t('weiterShort')}</button>}
                            {pastaStep === 1 && <button onClick={confirmAdd} className="flex-1 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)' }}><Plus size={16} /> {t('hinzufuegen')} · {fmt(configTotal)}</button>}
                          </div>
                        </div>
                      </ConfigModal>
                    )}
                  </React.Fragment>
                );
              }
              const qty = localCart[item.id]?.qty || 0;
              return (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                  {item.img && (
                    <div className="w-full h-32 flex items-center justify-center" style={{ background: item.imgContain ? '#f7f0e2' : 'transparent' }}>
                      <img src={item.img} alt={item.name} className={item.imgContain ? 'h-full object-contain py-2' : 'w-full h-full object-cover'} loading="lazy" />
                    </div>
                  )}
                  <div className="p-3.5">
                  <div className="flex items-center justify-between">
                    <div><div className="font-bold text-sm" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{mx(item.name, lang)}<AllergenTag alg={item.alg} />{item.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}{item.soldOut && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: '#8a7c62', color: '#fff' }}>{t('soldOutBadge')}</span>}</div>{item.desc && <div className="text-[11px] font-medium mt-0.5" style={{ color: '#8a7c62' }}>{mx(item.desc, lang)}</div>}<div className="text-xs font-semibold mt-1" style={{ color: CHILI }}>{fmt(item.price)}</div></div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                    <FavoriteHeart id={item.id} favorites={favorites} setFavorites={setFavorites} />
                    <Stepper qty={qty} onAdd={() => {
                      const doAdd = () => {
                        if (item.soldOut) return;
                        if (item.weekend && !isWeekendDay()) { setWeekendWarnOpen(true); return; }
                        if (tab === 'kebap' && hasDonerMeat(item)) { setMeatChoiceSel(null); setMeatChoiceNote(''); setMeatChoiceQty(1); setMeatChoiceItem(item); return; }
                        if (isLunchWindowNow() && LUNCH_CATEGORIES.includes(tab) && tab !== 'pizza') { setLunchDrink(null); setLunchPending({ label: mx(item.name, lang), deLabel: item.name }); return; }
                        setLastAddedTab(tab); addLocal(item.id, mx(item.name, lang), item.price, item.name);
                      };
                      const soExtra = findSoldOutExtraInItem(item, soldOutExtras);
                      if (soExtra) { setPendingSoldOutExtra({ name: soExtra, onConfirm: doAdd }); return; }
                      doAdd();
                    }} onRemove={() => removeLocal(item.id)} />
                    </div>
                  </div>
                  {qty > 0 && item.sauceChoice && (
                    <div className="mt-2.5 flex gap-2">
                      {['Knoblauchsoße', 'Cocktailsauce'].map((s) => (
                        <button key={s} onClick={() => setItemNotes((n) => ({ ...n, [item.id]: s }))} className="flex-1 px-2 py-2 rounded-lg text-[11px] font-bold" style={itemNotes[item.id] === s ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>{mx(s, lang)} · {t('freeLabel')}</button>
                      ))}
                    </div>
                  )}
                  {qty > 0 && !item.sauceChoice && (
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
              <button onClick={() => setView('upsell')} className="w-full px-5 py-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}><span className="font-black text-base">{t('weiter')}</span></button>
            </div>
          )}
        </div>
      )}
      {view === 'upsell' && (
        <div className="px-5 pt-2">
          <div className="text-center mb-5">
            <div className="text-3xl mb-2">🍟🍗</div>
            <div className="font-black text-lg" style={{ color: GREEN }}>{t('upsellTitle')}</div>
            <p className="text-sm mt-1" style={{ color: '#7c6d55' }}>{t('upsellSub')}</p>
          </div>
          {lastAddedTab && CATEGORY_UPSELL_RECS[lastAddedTab] && (
            <div className="mb-5">
              <div className="text-[11px] font-black tracking-widest mb-2 flex items-center gap-1.5" style={{ color: ORANGE }}>✨ {t('recommendedForYou')}</div>
              <div className="flex flex-col gap-2.5">
                {CATEGORY_UPSELL_RECS[lastAddedTab].map((id) => {
                  const u = EFFECTIVE_UPSELL_POOL.find((x) => x.id === id);
                  if (!u) return null;
                  const qty = localCart[u.id]?.qty || 0;
                  return (
                    <div key={u.id} className="rounded-xl p-4 flex items-center justify-between shadow-sm" style={{ background: '#fdecd4', border: `1.5px solid ${GOLD}` }}>
                      <div className="flex items-center gap-3">
                        {u.img ? (
                          <div className="w-11 h-11 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden" style={{ background: u.imgContain ? '#fff' : 'transparent' }}>
                            <img src={u.img} alt={u.name} className={u.imgContain ? 'h-full object-contain py-0.5' : 'w-full h-full object-cover'} />
                          </div>
                        ) : (
                          <span className="text-2xl">{u.emoji}</span>
                        )}
                        <div>
                          <div className="font-bold text-sm" style={{ color: GREEN }}>{u.name}</div>
                          <div className="text-xs font-semibold" style={{ color: CHILI }}>{fmt(u.price)}</div>
                        </div>
                      </div>
                      <Stepper qty={qty} onAdd={() => { if (!u.soldOut) addLocal(u.id, mx(u.name, lang), u.price, u.name); }} onRemove={() => removeLocal(u.id)} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2.5">
            {UPSELL_FOOD.map((u) => {
              const qty = localCart[u.id]?.qty || 0;
              return (
                <div key={u.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{u.emoji}</span>
                    <div>
                      <div className="font-bold text-sm" style={{ color: GREEN }}>{u.name}</div>
                      <div className="text-xs font-semibold" style={{ color: CHILI }}>{fmt(u.price)}</div>
                    </div>
                  </div>
                  <Stepper qty={qty} onAdd={() => { if (!u.soldOut) addLocal(u.id, mx(u.name, lang), u.price, u.name); }} onRemove={() => removeLocal(u.id)} />
                </div>
              );
            })}
          </div>
          <button onClick={() => setView('upsell2')} className="w-full mt-6 py-3.5 rounded-xl font-bold text-base text-white" style={{ background: GREEN }}>{t('weiter')}</button>
          <button onClick={() => setView('upsell2')} className="w-full mt-2 py-2.5 rounded-xl font-semibold text-xs" style={{ color: '#a4906c' }}>{t('skip')}</button>
        </div>
      )}
      {view === 'upsell2' && (
        <div className="px-5 pt-2">
          <div className="text-center mb-5">
            <div className="text-3xl mb-2">🥤</div>
            <div className="font-black text-lg" style={{ color: GREEN }}>Etwas zu trinken?</div>
            <p className="text-sm mt-1" style={{ color: '#7c6d55' }}>{t('drinksSub')}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            {UPSELL_DRINKS.map((u) => {
              const qty = localCart[u.id]?.qty || 0;
              return (
                <div key={u.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                  <div className="flex items-center gap-3">
                    {u.img ? (
                      <div className="w-11 h-11 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden" style={{ background: u.imgContain ? '#f7f0e2' : 'transparent' }}>
                        <img src={u.img} alt={u.name} className={u.imgContain ? 'h-full object-contain py-0.5' : 'w-full h-full object-cover'} />
                      </div>
                    ) : (
                      <span className="text-2xl">{u.emoji}</span>
                    )}
                    <div>
                      <div className="font-bold text-sm" style={{ color: GREEN }}>{u.name}</div>
                      <div className="text-xs font-semibold" style={{ color: CHILI }}>{fmt(u.price)}</div>
                    </div>
                  </div>
                  <Stepper qty={qty} onAdd={() => { if (!u.soldOut) addLocal(u.id, mx(u.name, lang), u.price, u.name); }} onRemove={() => removeLocal(u.id)} />
                </div>
              );
            })}
          </div>
          <button onClick={submitMyOrder} className="w-full mt-6 py-3.5 rounded-xl font-bold text-base text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('groupSubmitBtn')}</button>
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
                <>
                  {group.pending && group.pending.length > 0 && (
                    <div className="mb-3 px-4 py-3 rounded-xl text-xs font-bold text-center" style={{ background: '#fdecd4', color: '#8a5a1f' }}>
                      ⏳ {t('pendingParticipantsPrefix')} {group.pending.join(', ')} {t('pendingParticipantsSuffix')}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (group.pending && group.pending.length > 0 && !window.confirm(t('sendAnywayConfirm'))) return;
                      markSent();
                      window.open(waFinalLink, '_blank', 'noopener,noreferrer');
                    }}
                    className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #25D366, #1fb855)', color: '#fff', boxShadow: '0 8px 22px rgba(37,211,102,.4)' }}
                  ><MessageCircle size={18} /> {t('groupSendFinal')}</button>
                </>
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
      { h: '3. Lokale Speicherung im Browser', p: 'Diese Website verwendet keine Marketing- oder Tracking-Cookies und keine Analysewerkzeuge wie Google Analytics. Zur technischen Funktion speichert die Website jedoch einige Informationen lokal in Ihrem Browser (localStorage), z. B.: Ihre Cookie-Hinweis-Bestätigung, Ihre Spracheinstellung, Favoriten, ob Sie die Website heute bereits besucht haben (zur Vermeidung von Doppelzählungen in der anonymen Statistik) sowie ggf. ein Highscore eines kleinen Spiels. Diese Daten verlassen Ihr Gerät nicht und werden nicht an uns oder Dritte übertragen.' },
      { h: '4. Kontaktformular ("Schreib uns")', p: 'Wenn Sie unser Kontaktformular nutzen, werden Ihr Name, optional Ihre E-Mail-Adresse und Ihre Nachricht verarbeitet. Die Nachricht wird über den Dienst Web3Forms (Drittanbieter) per E-Mail an uns weitergeleitet und zusätzlich in unserer Datenbank bei Supabase Inc. (EU) gespeichert, damit wir sie im internen Personalbereich einsehen können. Gespeicherte Nachrichten werden von uns spätestens am nächsten Tag automatisch gelöscht. Verfassen Sie Ihre Nachricht nicht auf Deutsch, wird der Text vor dem Versand automatisch über den Dienst MyMemory (Drittanbieter) maschinell ins Deutsche übersetzt, damit unser Personal ihn verstehen kann; der Originaltext bleibt zusätzlich einsehbar.' },
      { h: '5. Push-Benachrichtigungen', p: 'Sie können freiwillig Benachrichtigungen (z. B. über Aktionen) abonnieren. Hierfür wird der Dienst OneSignal eingesetzt. Bei Ihrer Zustimmung wird eine anonyme Geräte-/Abonnentenkennung bei OneSignal gespeichert, über die wir Ihnen Nachrichten senden können. Sie können das Abonnement jederzeit über Ihre Browser- bzw. Geräteeinstellungen widerrufen.' },
      { h: '6. Standortabfrage (Entfernungsrechner)', p: 'Wenn Sie die Funktion "Meine Entfernung berechnen" nutzen, fragt Ihr Browser mit Ihrer ausdrücklichen Erlaubnis Ihren ungefähren Standort ab. Die Berechnung erfolgt in Ihrem Browser; zur Ermittlung unserer Restaurant-Koordinaten wird der kostenlose Geokodierungsdienst Photon (Komoot) angefragt. Ihr Standort wird nicht gespeichert oder an uns übermittelt.' },
      { h: '7. Anonyme Besucherstatistik', p: 'Wir erfassen anonymisierte Nutzungsdaten (z. B. Sprache, Gerätetyp, Klicks auf Anruf-/Routen-Buttons, an unseren Chat-Assistenten gestellte Fragen) in unserer Datenbank bei Supabase Inc. (EU). Es werden keine Namen, IP-Adressen oder sonstigen direkt personenbezogenen Daten in dieser Statistik gespeichert.' },
      { h: '8. Gruppenbestellung & Glücksrad', p: 'Für diese Funktionen wird ein zufällig erzeugter Code gespeichert (keine Namen, keine Telefonnummern). Die Daten werden bei Supabase Inc. in einer Datenbank innerhalb der EU gespeichert und dienen ausschließlich der Funktion dieser Angebote.' },
      { h: '9. Google Maps', p: 'Auf unserer Website ist eine Karte von Google Maps eingebunden. Beim Laden der Karte können Daten (z. B. IP-Adresse) an Google Ireland Limited übertragen werden. Weitere Informationen: Google-Datenschutzerklärung.' },
      { h: '10. Instagram', p: 'Wir verlinken auf unser Instagram-Profil. Beim Anklicken werden Sie zu Instagram (Meta Platforms Ireland Ltd.) weitergeleitet, deren eigene Datenschutzbestimmungen gelten.' },
      { h: '11. Ihre Rechte', p: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten sowie ein Recht auf Widerspruch. Wenden Sie sich hierzu an die oben genannte Kontaktadresse. Zudem steht Ihnen ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.' },
    ] },
  en: { title: 'Privacy Policy',
    s: [
      { h: '1. Controller', p: 'Lütfü Kutluca — Bodrum Kebap Vechta\nOyther Straße 37, 49377 Vechta, Germany\nPhone: 04441 / 95 16 104\nEmail: bodrumkebapvechta@gmail.com' },
      { h: '2. Hosting', p: 'This website is hosted by Vercel Inc. When you visit the website, technical access data (e.g. IP address, date/time, page accessed) is automatically processed by the hosting provider. This serves the technical provision and security of the website.' },
      { h: '3. Local browser storage', p: 'This website does not use marketing or tracking cookies and no analytics tools such as Google Analytics. For technical functionality, the website does store some information locally in your browser (localStorage), such as: your cookie-notice confirmation, your language preference, favorites, whether you have already visited today (to avoid double-counting in the anonymous statistics), and possibly a high score from a small game. This data never leaves your device and is not transmitted to us or third parties.' },
      { h: '4. Contact form ("Message us")', p: 'If you use our contact form, your name, optionally your email address, and your message are processed. The message is forwarded to us by email via the Web3Forms service (third party) and additionally stored in our database at Supabase Inc. (EU) so we can view it in our internal staff area. Stored messages are automatically deleted by us at the latest the following day. If you write your message in a language other than German, the text is automatically machine-translated into German via the MyMemory service (third party) before sending, so our staff can understand it; the original text also remains viewable.' },
      { h: '5. Push notifications', p: 'You may voluntarily subscribe to notifications (e.g. about promotions). This uses the OneSignal service. Upon your consent, an anonymous device/subscriber identifier is stored with OneSignal, through which we can send you messages. You can withdraw this subscription at any time via your browser or device settings.' },
      { h: '6. Location request (distance calculator)', p: 'If you use the "Calculate my distance" feature, your browser will request your approximate location with your explicit permission. The calculation happens in your browser; the free geocoding service Photon (Komoot) is queried to determine our restaurant\'s coordinates. Your location is not stored or transmitted to us.' },
      { h: '7. Anonymous visitor statistics', p: 'We collect anonymized usage data (e.g. language, device type, clicks on call/directions buttons, questions asked to our chat assistant) in our database at Supabase Inc. (EU). No names, IP addresses, or other directly personal data are stored in this statistic.' },
      { h: '8. Group order & lucky wheel', p: 'For these features, a randomly generated code is stored (no names, no phone numbers). The data is stored by Supabase Inc. in a database within the EU and is used exclusively for the operation of these features.' },
      { h: '9. Google Maps', p: 'A Google Maps map is embedded on our website. When the map loads, data (e.g. IP address) may be transmitted to Google Ireland Limited. More information: Google Privacy Policy.' },
      { h: '10. Instagram', p: 'We link to our Instagram profile. Clicking it will redirect you to Instagram (Meta Platforms Ireland Ltd.), whose own privacy policy applies.' },
      { h: '11. Your rights', p: 'You have the right to access, rectify, erase and restrict the processing of your data, as well as a right to object. Please contact the address given above. You also have the right to lodge a complaint with a data protection supervisory authority.' },
    ] },
  tr: { title: 'Gizlilik Politikası',
    s: [
      { h: '1. Sorumlu Kişi', p: 'Lütfü Kutluca — Bodrum Kebap Vechta\nOyther Straße 37, 49377 Vechta, Almanya\nTelefon: 04441 / 95 16 104\nE-posta: bodrumkebapvechta@gmail.com' },
      { h: '2. Hosting', p: 'Bu web sitesi Vercel Inc. tarafından barındırılmaktadır. Web sitesine erişildiğinde, teknik erişim verileri (örn. IP adresi, tarih/saat, erişilen sayfa) otomatik olarak hosting sağlayıcısı tarafından işlenir. Bu, web sitesinin teknik olarak sunulması ve güvenliği amacına hizmet eder.' },
      { h: '3. Tarayıcıda Yerel Depolama', p: 'Bu web sitesi pazarlama veya izleme çerezleri ve Google Analytics gibi analiz araçları kullanmamaktadır. Teknik işlevsellik için site, tarayıcınızda (localStorage) bazı bilgileri yerel olarak saklar: çerez bildirimi onayınız, dil tercihiniz, favorileriniz, bugün siteyi zaten ziyaret edip etmediğiniz (anonim istatistikte mükerrer sayımı önlemek için) ve varsa küçük bir oyunun en yüksek skoru. Bu veriler cihazınızdan hiç çıkmaz, bize veya üçüncü taraflara iletilmez.' },
      { h: '4. İletişim Formu ("Bize yazın")', p: 'İletişim formumuzu kullandığınızda, adınız, isteğe bağlı olarak e-posta adresiniz ve mesajınız işlenir. Mesaj, Web3Forms (üçüncü taraf) hizmeti üzerinden e-posta ile bize iletilir ve ayrıca personel panelimizde görüntüleyebilmemiz için Supabase Inc. (AB) veritabanımızda saklanır. Saklanan mesajlar tarafımızca en geç ertesi gün otomatik olarak silinir. Mesajınızı Almanca dışında bir dilde yazarsanız, personelimizin anlayabilmesi için metin gönderilmeden önce MyMemory (üçüncü taraf) hizmeti aracılığıyla otomatik olarak Almanca\'ya çevrilir; orijinal metin de ayrıca görüntülenebilir kalır.' },
      { h: '5. Push Bildirimleri', p: 'İsteğe bağlı olarak bildirimlere (örn. kampanyalar hakkında) abone olabilirsiniz. Bunun için OneSignal hizmeti kullanılmaktadır. Onayınız üzerine, size mesaj gönderebilmemiz için OneSignal\'da anonim bir cihaz/abone kimliği saklanır. Bu aboneliği istediğiniz zaman tarayıcı veya cihaz ayarlarınızdan iptal edebilirsiniz.' },
      { h: '6. Konum Talebi (Mesafe Hesaplayıcı)', p: '"Uzaklığımı hesapla" özelliğini kullandığınızda, tarayıcınız açık izninizle yaklaşık konumunuzu talep eder. Hesaplama tarayıcınızda gerçekleşir; restoranımızın koordinatlarını belirlemek için ücretsiz Photon (Komoot) coğrafi kodlama hizmetine sorgu gönderilir. Konumunuz saklanmaz veya bize iletilmez.' },
      { h: '7. Anonim Ziyaretçi İstatistikleri', p: 'Supabase Inc. (AB) veritabanımızda anonimleştirilmiş kullanım verileri topluyoruz (örn. dil, cihaz türü, ara/yol tarifi butonlarına tıklamalar, sohbet asistanımıza sorulan sorular). Bu istatistikte isim, IP adresi veya başka doğrudan kişisel veri saklanmaz.' },
      { h: '8. Grup Siparişi & Şans Çarkı', p: 'Bu özellikler için rastgele oluşturulmuş bir kod saklanır (isim veya telefon numarası saklanmaz). Veriler, Supabase Inc. tarafından AB içindeki bir veritabanında saklanır ve yalnızca bu özelliklerin işlevi için kullanılır.' },
      { h: '9. Google Haritalar', p: 'Web sitemizde bir Google Haritalar haritası gömülüdür. Harita yüklendiğinde, veriler (örn. IP adresi) Google Ireland Limited\'e aktarılabilir. Daha fazla bilgi: Google Gizlilik Politikası.' },
      { h: '10. Instagram', p: 'Instagram profilimize bağlantı veriyoruz. Tıkladığınızda kendi gizlilik politikaları geçerli olan Instagram\'a (Meta Platforms Ireland Ltd.) yönlendirilirsiniz.' },
      { h: '11. Haklarınız', p: 'Verilerinize erişim, düzeltme, silme ve işlemenin kısıtlanmasını talep etme hakkına ve itiraz hakkına sahipsiniz. Bunun için yukarıda belirtilen adresle iletişime geçebilirsiniz. Ayrıca bir veri koruma denetim makamına şikayette bulunma hakkınız da vardır.' },
    ] },
  ro: { title: 'Politica de confidențialitate',
    s: [
      { h: '1. Operator de date', p: 'Lütfü Kutluca — Bodrum Kebap Vechta\nOyther Straße 37, 49377 Vechta, Germania\nTelefon: 04441 / 95 16 104\nE-mail: bodrumkebapvechta@gmail.com' },
      { h: '2. Găzduire', p: 'Acest site este găzduit de Vercel Inc. La accesarea site-ului, datele tehnice de acces (de ex. adresa IP, data/ora, pagina accesată) sunt procesate automat de furnizorul de găzduire. Acest lucru servește furnizării tehnice și securității site-ului.' },
      { h: '3. Stocare locală în browser', p: 'Acest site nu utilizează cookie-uri de marketing sau urmărire și niciun instrument de analiză precum Google Analytics. Pentru funcționalitate tehnică, site-ul stochează totuși unele informații local în browserul dvs. (localStorage): confirmarea notei privind cookie-urile, preferința de limbă, favoritele, dacă ați vizitat deja site-ul azi (pentru a evita numărarea dublă în statisticile anonime) și eventual un scor maxim al unui mic joc. Aceste date nu părăsesc niciodată dispozitivul dvs. și nu sunt transmise nouă sau terților.' },
      { h: '4. Formular de contact ("Scrie-ne")', p: 'Dacă utilizați formularul nostru de contact, sunt procesate numele dvs., opțional adresa de e-mail și mesajul dvs. Mesajul este transmis nouă prin e-mail prin serviciul Web3Forms (terț) și stocat suplimentar în baza noastră de date la Supabase Inc. (UE) pentru a-l putea vizualiza în zona internă de personal. Mesajele stocate sunt șterse automat de noi cel târziu a doua zi. Dacă scrieți mesajul într-o altă limbă decât germana, textul este tradus automat în germană prin serviciul MyMemory (terț) înainte de trimitere, pentru ca personalul nostru să îl poată înțelege; textul original rămâne de asemenea vizibil.' },
      { h: '5. Notificări push', p: 'Vă puteți abona voluntar la notificări (de ex. despre promoții). Pentru aceasta se utilizează serviciul OneSignal. La consimțământul dvs., un identificator anonim de dispozitiv/abonat este stocat la OneSignal, prin care vă putem trimite mesaje. Puteți retrage acest abonament oricând din setările browserului sau dispozitivului dvs.' },
      { h: '6. Solicitare de locație (calculator de distanță)', p: 'Dacă utilizați funcția "Calculează distanța mea", browserul dvs. va solicita locația dvs. aproximativă cu permisiunea dvs. explicită. Calculul are loc în browserul dvs.; serviciul gratuit de geocodare Photon (Komoot) este interogat pentru a determina coordonatele restaurantului nostru. Locația dvs. nu este stocată sau transmisă nouă.' },
      { h: '7. Statistici anonime despre vizitatori', p: 'Colectăm date de utilizare anonimizate (de ex. limbă, tip de dispozitiv, clicuri pe butoanele de apel/direcții, întrebări adresate asistentului nostru de chat) în baza noastră de date la Supabase Inc. (UE). Nu sunt stocate nume, adrese IP sau alte date direct personale în această statistică.' },
      { h: '8. Comandă de grup & roata norocului', p: 'Pentru aceste funcții este stocat un cod generat aleatoriu (fără nume, fără numere de telefon). Datele sunt stocate de Supabase Inc. într-o bază de date din UE și sunt utilizate exclusiv pentru funcționarea acestor oferte.' },
      { h: '9. Google Maps', p: 'Pe site-ul nostru este integrată o hartă Google Maps. La încărcarea hărții, datele (de ex. adresa IP) pot fi transmise către Google Ireland Limited. Mai multe informații: Politica de confidențialitate Google.' },
      { h: '10. Instagram', p: 'Facem trimitere către profilul nostru de Instagram. La accesare veți fi redirecționat către Instagram (Meta Platforms Ireland Ltd.), unde se aplică propriile politici de confidențialitate.' },
      { h: '11. Drepturile dvs.', p: 'Aveți dreptul de acces, rectificare, ștergere și restricționare a prelucrării datelor dvs., precum și un drept de opoziție. Vă rugăm să contactați adresa menționată mai sus. De asemenea, aveți dreptul de a depune o plângere la o autoritate de supraveghere a protecției datelor.' },
    ] },
  nl: { title: 'Privacyverklaring',
    s: [
      { h: '1. Verwerkingsverantwoordelijke', p: 'Lütfü Kutluca — Bodrum Kebap Vechta\nOyther Straße 37, 49377 Vechta, Duitsland\nTelefoon: 04441 / 95 16 104\nE-mail: bodrumkebapvechta@gmail.com' },
      { h: '2. Hosting', p: 'Deze website wordt gehost door Vercel Inc. Bij het bezoeken van de website worden automatisch technische toegangsgegevens (bijv. IP-adres, datum/tijd, bezochte pagina) verwerkt door de hostingprovider. Dit dient de technische levering en beveiliging van de website.' },
      { h: '3. Lokale opslag in de browser', p: 'Deze website gebruikt geen marketing- of trackingcookies en geen analysetools zoals Google Analytics. Voor technische functionaliteit slaat de website echter enkele gegevens lokaal op in uw browser (localStorage): uw bevestiging van de cookiemelding, uw taalvoorkeur, favorieten, of u de website vandaag al heeft bezocht (om dubbeltellingen in de anonieme statistieken te voorkomen) en eventueel een hoogste score van een klein spelletje. Deze gegevens verlaten uw apparaat nooit en worden niet naar ons of derden verzonden.' },
      { h: '4. Contactformulier ("Schrijf ons")', p: 'Als u ons contactformulier gebruikt, worden uw naam, optioneel uw e-mailadres en uw bericht verwerkt. Het bericht wordt via de dienst Web3Forms (derde partij) per e-mail aan ons doorgestuurd en bovendien opgeslagen in onze database bij Supabase Inc. (EU), zodat we het in ons interne personeelsgedeelte kunnen bekijken. Opgeslagen berichten worden door ons uiterlijk de volgende dag automatisch verwijderd. Schrijft u uw bericht in een andere taal dan Duits, dan wordt de tekst vóór verzending automatisch machinaal vertaald naar het Duits via de dienst MyMemory (derde partij), zodat ons personeel het kan begrijpen; de originele tekst blijft ook zichtbaar.' },
      { h: '5. Pushmeldingen', p: 'U kunt vrijwillig meldingen (bijv. over acties) abonneren. Hiervoor wordt de dienst OneSignal gebruikt. Na uw toestemming wordt een anonieme apparaat-/abonneeidentificatie opgeslagen bij OneSignal, waarmee we u berichten kunnen sturen. U kunt dit abonnement op elk moment via uw browser- of apparaatinstellingen intrekken.' },
      { h: '6. Locatieverzoek (afstandsberekening)', p: 'Als u de functie "Bereken mijn afstand" gebruikt, vraagt uw browser met uw uitdrukkelijke toestemming uw geschatte locatie op. De berekening vindt plaats in uw browser; om de coördinaten van ons restaurant te bepalen wordt de gratis geocoderingsdienst Photon (Komoot) geraadpleegd. Uw locatie wordt niet opgeslagen of naar ons verzonden.' },
      { h: '7. Anonieme bezoekersstatistieken', p: 'Wij verzamelen geanonimiseerde gebruiksgegevens (bijv. taal, apparaattype, klikken op bel-/routeknoppen, vragen gesteld aan onze chatassistent) in onze database bij Supabase Inc. (EU). Er worden geen namen, IP-adressen of andere direct persoonlijke gegevens in deze statistiek opgeslagen.' },
      { h: '8. Groepsbestelling & geluksrad', p: 'Voor deze functies wordt een willekeurig gegenereerde code opgeslagen (geen namen, geen telefoonnummers). De gegevens worden door Supabase Inc. opgeslagen in een database binnen de EU en worden uitsluitend gebruikt voor de werking van deze functies.' },
      { h: '9. Google Maps', p: 'Op onze website is een Google Maps-kaart ingesloten. Bij het laden van de kaart kunnen gegevens (bijv. IP-adres) worden verzonden naar Google Ireland Limited. Meer informatie: Google-privacybeleid.' },
      { h: '10. Instagram', p: 'Wij linken naar ons Instagram-profiel. Als u hierop klikt, wordt u doorgestuurd naar Instagram (Meta Platforms Ireland Ltd.), waar hun eigen privacybeleid van toepassing is.' },
      { h: '11. Uw rechten', p: 'U heeft recht op inzage, rectificatie, verwijdering en beperking van de verwerking van uw gegevens, evenals een recht van bezwaar. Neem hiervoor contact op met bovengenoemd adres. Daarnaast heeft u het recht om een klacht in te dienen bij een toezichthoudende autoriteit voor gegevensbescherming.' },
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

function OrderTrackView({ back, initialAction, onConsumeAction }) {
  const { t } = React.useContext(LangContext);
  const [codeInput, setCodeInput] = useState(initialAction?.orderCode || '');
  const [order, setOrder] = useState(undefined);
  const [searched, setSearched] = useState(false);

  useEffect(() => { onConsumeAction && onConsumeAction(); }, []);
  useEffect(() => {
    if (initialAction?.orderCode) { search(initialAction.orderCode); }
  }, []);

  const search = async (c) => {
    const code = (c || codeInput).trim().toUpperCase();
    if (!code) return;
    setSearched(true);
    setOrder(await safeGet(`order:${code}`));
  };

  useEffect(() => {
    if (!order) return;
    const iv = setInterval(async () => {
      const c = (order.code || codeInput).trim().toUpperCase();
      const fresh = await safeGet(`order:${c}`);
      if (fresh) setOrder(fresh);
    }, 5000);
    return () => clearInterval(iv);
  }, [order?.code]);

  return (
    <div className="pb-10">
      <div style={{ background: GREEN }}><TopBar onHome={back} title={t('titleTrack')} /></div>
      <div className="px-5 pt-4">
        <div className="flex gap-2 mb-5">
          <input value={codeInput} onChange={(e) => setCodeInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && search()} placeholder={t('trackCodePh')} className="flex-1 px-4 py-3 rounded-xl text-base font-bold tracking-[0.15em] outline-none text-center" style={{ background: '#f7f0e2', color: GREEN }} />
          <button onClick={() => search()} className="px-5 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('searchBtn')}</button>
        </div>
        {searched && order === null && <p className="text-sm font-semibold text-center" style={{ color: CHILI }}>{t('codeNotFound')}</p>}
        {!searched && (
          <div className="text-center py-10 opacity-70">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-sm font-semibold" style={{ color: '#8a7c62' }}>{t('trackEmptyHint')}</p>
          </div>
        )}
        {order && (
          <div className="bg-white rounded-2xl p-6 text-center" style={{ boxShadow: '0 10px 30px rgba(21,56,38,.1)' }}>
            <div className="text-5xl mb-4">{order.status === 'ready' ? '🎉' : '👨‍🍳'}</div>
            <div className="font-black text-xl mb-2" style={{ color: GREEN }}>{order.status === 'ready' ? t('orderStatusReady') : t('orderStatusPreparing')}</div>
            <p className="text-xs font-semibold" style={{ color: '#a4906c' }}>{t('orderCodeLabel')}: {order.code}</p>
          </div>
        )}
      </div>
    </div>
  );
}
function SettingsRow({ id, icon, title, openId, setOpenId, children }) {
  const isOpen = openId === id;
  return (
    <div className="rounded-2xl mb-2.5 overflow-hidden" style={{ background: '#fff', border: `1.5px solid ${isOpen ? '#e9d19a' : '#f0e5cf'}`, boxShadow: isOpen ? '0 6px 18px rgba(21,56,38,.08)' : '0 2px 6px rgba(21,56,38,.04)', transition: 'box-shadow .2s, border-color .2s' }}>
      <button onClick={() => setOpenId(isOpen ? null : id)} className="w-full flex items-center justify-between px-4 py-3.5 text-left">
        <span className="flex items-center gap-2 font-black text-sm" style={{ color: GREEN }}>{icon} {title}</span>
        <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]" style={{ background: isOpen ? GOLD : '#f7f0e2', color: GREEN, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s, background .2s' }}>▼</span>
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function AnimatedLock({ open }) {
  return (
    <svg width="32" height="32" viewBox="0 0 34 34" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="lockBodyGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e9e9e9" />
        </linearGradient>
      </defs>
      <path
        d="M22 15.5 V11 A6 6 0 0 0 10 11 V15.5"
        fill="none"
        stroke="#fff"
        strokeWidth="4.6"
        strokeLinecap="round"
        style={{
          transformOrigin: '22px 15.5px',
          transform: open ? 'rotate(115deg)' : 'rotate(0deg)',
          transition: 'transform .8s cubic-bezier(.34,1.4,.64,1)',
          filter: 'drop-shadow(0 1px 1px rgba(0,0,0,.25))',
        }}
      />
      <rect x="6.5" y="14.5" width="21" height="16" rx="5" fill="url(#lockBodyGrad2)" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.2))' }} />
      <rect x="6.5" y="14.5" width="21" height="6" rx="5" fill="rgba(255,255,255,.9)" />
      <circle cx="17" cy="21" r="2.1" fill="#153826" opacity="0.6" />
      <rect x="15.9" y="22.2" width="2.2" height="4" rx="1" fill="#153826" opacity="0.6" />
    </svg>
  );
}

function formatEventTime(ts) {
  const d = new Date(ts);
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const isToday = d.getTime() >= todayStart.getTime();
  const time = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  return isToday ? time : `${d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })} · ${time}`;
}
function StatsDetailModal({ data, onClose }) {
  if (!data) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(21,56,38,.55)' }} onClick={onClose}>
      <div className="w-full max-w-md rounded-t-3xl flex flex-col" style={{ background: '#fff', maxHeight: '75vh', boxShadow: '0 -20px 50px rgba(21,56,38,.3)', animation: 'modalCardUp .3s cubic-bezier(.25,.46,.45,.94)' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0" style={{ borderBottom: '1px solid #f0e5cf' }}>
          <div className="font-black text-sm" style={{ color: GREEN }}>{data.title} <span className="font-bold" style={{ color: '#a4906c' }}>({data.items.length})</span></div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0e5cf' }}><X size={15} color={GREEN} /></button>
        </div>
        <div className="overflow-y-auto px-5 py-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          {data.items.length === 0 && <p className="text-xs text-center py-8" style={{ color: '#a4906c' }}>Noch keine Einträge</p>}
          {data.items.map((it, i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-2.5" style={{ borderBottom: i < data.items.length - 1 ? '1px solid #f7f0e2' : 'none' }}>
              <span className="font-black text-sm flex-shrink-0" style={{ color: GREEN }}>{it.time}</span>
              {it.sub && <span className="text-xs font-semibold text-right truncate" style={{ color: '#a4906c' }}>{it.sub}</span>}
            </div>
          ))}
        </div>
        <div style={{ height: 'env(safe-area-inset-bottom, 12px)' }} />
      </div>
    </div>
  );
}

function StaffPanelView({ back }) {
  const { t, lang } = React.useContext(LangContext);
  const [pin, setPin] = useState('');
  const [ok, setOk] = useState(() => {
    try {
      const raw = localStorage.getItem('bk_staff_remember_v1');
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data.until || data.until < Date.now()) { localStorage.removeItem('bk_staff_remember_v1'); return false; }
      return true; // optimistic; verified against server epoch right after mount below
    } catch { return false; }
  });
  const [unlocking, setUnlocking] = useState(false);
  const [staffLookup, setStaffLookup] = useState('');
  const [lookupOpen, setLookupOpen] = useState(false);
  const [openSettingsId, setOpenSettingsId] = useState(null);
  const pinEmbers = React.useMemo(() => Array.from({ length: 16 }).map(() => ({
    left: 4 + Math.random() * 92,
    delay: Math.random() * 3,
    duration: 4.5 + Math.random() * 3.5,
    drift: (Math.random() - 0.5) * 50,
    size: 2.5 + Math.random() * 3.5,
  })), []);
  useEffect(() => {
    if (ok) {
      safeGet('siteconfig:priceOverrides').then((r) => { if (r) setPriceOverrides(r); });
      safeGet('siteconfig:soldOut').then((r) => { if (r) setSoldOutIdsStaff(r); });
      safeGet('siteconfig:photoOverrides').then((r) => { if (r) setPhotoOverrides(r); });
      safeGet('siteconfig:extraGalleryPhotos').then((r) => { if (r) setExtraGalleryPhotos(r); });
      safeGet('siteconfig:mittagsSidePhotos').then((r) => { if (r) { setMittagsEnabled({ pizza: false, salat: false, nudeln: false, schnitzel: false, ...r.enabled }); setMittagsPizzaGalleryUrl(r.pizzaGalleryUrl || ''); } });
      safeGet('siteconfig:weekendComboPhotos').then((r) => { if (r) setWeekendComboPhotos({ pizza: r.pizza || '', doener: r.doener || '' }); });
      safeGet('siteconfig:pushTriggers').then((r) => { if (r) setPushTriggers((prev) => ({ ...prev, ...r })); });
    }
  }, [ok]);
  const staffLookupResults = useMemo(() => {
    if (!staffLookup.trim()) return [];
    const q = staffLookup.trim().toLowerCase();
    const pool = MENU.flatMap((cat) => cat.items.filter((i) => !i.customPizza && !i.customPasta));
    const exactNum = pool.filter((i) => menuNum(i.id).toLowerCase() === q);
    const nameMatches = pool.filter((i) => menuNum(i.id).toLowerCase() !== q && i.name.toLowerCase().includes(q));
    return [...exactNum, ...nameMatches].slice(0, 15);
  }, [staffLookup]);
  const [tab, setTab] = useState('menu'); // orders | wheel | settings | analytics

  const [wheelCode, setWheelCode] = useState('');
  const [wheelResult, setWheelResult] = useState(undefined);
  const [redeemMsg, setRedeemMsg] = useState('');

  const [orders, setOrders] = useState([]);
  const [statsModal, setStatsModal] = useState(null);
  const openStatsModal = (title, list, subFn) => {
    const sorted = [...list].sort((a, b) => b.value.ts - a.value.ts);
    setStatsModal({ title, items: sorted.map((v) => ({ time: formatEventTime(v.value.ts), sub: subFn ? subFn(v) : null })) });
  };
  const [staffPin, setStaffPin] = useState('440921');
  const [newPin, setNewPin] = useState('');
  const [newPin2, setNewPin2] = useState('');
  const [pinMsg, setPinMsg] = useState('');
  const [unlockStage, setUnlockStage] = useState('idle'); // idle | unlocked | wrong
  const [keystroke, setKeystroke] = useState(0);
  const [lastLoginAt, setLastLoginAt] = useState(null);
  const [rememberChoice, setRememberChoice] = useState(null); // null | '10m' | '1h' | 'today'
  const pinInputRef = useRef(null);
  useEffect(() => {
    if (!ok) {
      const raf = requestAnimationFrame(() => pinInputRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
  }, [ok]);
  useEffect(() => {
    if (!ok) return;
    try {
      const raw = localStorage.getItem('bk_staff_remember_v1');
      if (!raw) return; // ok=true from a fresh PIN entry this session, nothing to verify
      const data = JSON.parse(raw);
      safeGet('siteconfig:staffSessionEpoch').then((epoch) => {
        const serverEpoch = epoch || 0;
        if (data.epoch !== serverEpoch) { localStorage.removeItem('bk_staff_remember_v1'); setOk(false); }
      }).catch(() => {});
    } catch {}
  }, []);
  useEffect(() => { safeGet('siteconfig:staffPin').then((r) => { if (r && r.pin) setStaffPin(r.pin); }); }, []);
  useEffect(() => {
    if (ok || unlocking || pin.length === 0) return;
    if (pin === staffPin) {
      setUnlocking(true);
      setUnlockStage('unlocked');
      unlockAudio();
      // Markiert dieses Gerät bei OneSignal als "owner", damit z.B. Kundenwünsche
      // NUR hierher gesendet werden können (nicht an alle Abonnenten). Reine
      // Ergänzung — verändert nichts an der bestehenden Push-Registrierung/init.
      try {
        if (window.OneSignal?.User?.addTag) {
          window.OneSignal.User.addTag('owner', 'true');
        } else if (window.OneSignalDeferred) {
          window.OneSignalDeferred.push((OneSignal) => { try { OneSignal.User.addTag('owner', 'true'); } catch {} });
        }
      } catch {}
      safeGet('siteconfig:lastStaffLogin').then((r) => {
        if (r && r.ts) setLastLoginAt(r.ts);
        safeSet('siteconfig:lastStaffLogin', { ts: Date.now() });
      });
      if (rememberChoice) {
        const durationMs = rememberChoice === '10m' ? 10 * 60 * 1000 : rememberChoice === '1h' ? 60 * 60 * 1000 : (() => { const end = new Date(); end.setHours(23, 59, 59, 999); return end.getTime() - Date.now(); })();
        safeGet('siteconfig:staffSessionEpoch').then((epoch) => {
          localStorage.setItem('bk_staff_remember_v1', JSON.stringify({ until: Date.now() + durationMs, epoch: epoch || 0 }));
        }).catch(() => {});
      }
      setTimeout(() => setOk(true), 900);
    } else if (pin.length >= staffPin.length) {
      setUnlockStage('wrong');
      setTimeout(() => { setPin(''); setUnlockStage('idle'); }, 700);
    }
  }, [pin, staffPin, ok, unlocking]);
  const savePin = async () => {
    if (newPin.trim().length < 4) { setPinMsg('PIN muss mind. 4 Ziffern haben'); setTimeout(() => setPinMsg(''), 2500); return; }
    if (newPin !== newPin2) { setPinMsg('PINs stimmen nicht überein'); setTimeout(() => setPinMsg(''), 2500); return; }
    await safeSet('siteconfig:staffPin', { pin: newPin.trim() });
    setStaffPin(newPin.trim());
    setNewPin(''); setNewPin2('');
    setPinMsg(t('savedMsg'));
    setTimeout(() => setPinMsg(''), 2500);
  };
  const [logoutAllMsg, setLogoutAllMsg] = useState('');
  const logoutAllDevices = async () => {
    const newEpoch = Date.now();
    await safeSet('siteconfig:staffSessionEpoch', newEpoch);
    localStorage.removeItem('bk_staff_remember_v1');
    setLogoutAllMsg('✅ Alle gemerkten Geräte wurden abgemeldet');
    setTimeout(() => setLogoutAllMsg(''), 3000);
  };
  const [ratingScore, setRatingScore] = useState('4.6');
  const [ratingCount, setRatingCount] = useState('293');
  const [ratingMsg, setRatingMsg] = useState('');
  const [dailyBannerText, setDailyBannerText] = useState('');
  const [dailyBannerImg, setDailyBannerImg] = useState('');
  const [dailyBannerDays, setDailyBannerDays] = useState('1');
  const [dailyBannerHours, setDailyBannerHours] = useState('0');
  const [dailyBannerUploadBusy, setDailyBannerUploadBusy] = useState(false);
  const [dailyBannerMsg, setDailyBannerMsg] = useState('');
  const [mittagsEnabled, setMittagsEnabled] = useState({ pizza: false, salat: false, nudeln: false, schnitzel: false });
  const [mittagsPizzaGalleryUrl, setMittagsPizzaGalleryUrl] = useState('');
  const [weekendComboPhotos, setWeekendComboPhotos] = useState({ pizza: '', doener: '' });
  const [weekendPhotoUploadBusy, setWeekendPhotoUploadBusy] = useState('');
  const [settingsGroup, setSettingsGroup] = useState('sicherheit');
  const [pushTestMsg, setPushTestMsg] = useState('');
  const [pushTriggers, setPushTriggers] = useState({ ankuendigung: true, samstag: true, neuesProdukt: true, angebot: true, montagErinnerung: true });
  const [pushRawTestMsg, setPushRawTestMsg] = useState('');
  const [campaign, setCampaign] = useState({ active: false, title: '', subtitle: '', startDate: '', endDate: '' });
  const [campaignMsg, setCampaignMsg] = useState('');
  const [waTemplateText, setWaTemplateText] = useState('');
  const [waTemplateMsg, setWaTemplateMsg] = useState('');
  const [showTestOrders, setShowTestOrders] = useState(false);
  const [testOrderMsg, setTestOrderMsg] = useState('');
  const [visits, setVisits] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [contactMessagesArchive, setContactMessagesArchive] = useState([]);
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [contactMessages, setContactMessages] = useState([]);
  const [menuSearch, setMenuSearch] = useState('');
  const [priceOverrides, setPriceOverrides] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [editSmall, setEditSmall] = useState('');
  const [editLarge, setEditLarge] = useState('');
  const [menuSaveMsg, setMenuSaveMsg] = useState('');
  const [soldOutIds, setSoldOutIdsStaff] = useState([]);
  const [chickenSoldOut, setChickenSoldOut] = useState(false);
  const [soldOutExtras, setSoldOutExtras] = useState([]);
  const [extraSearch, setExtraSearch] = useState('');
  const [photoOverrides, setPhotoOverrides] = useState({});
  const [photoSearch, setPhotoSearch] = useState('');
  const [editingPhotoItem, setEditingPhotoItem] = useState(null);
  const [editPhotoUrl, setEditPhotoUrl] = useState('');
  const [photoSaveMsg, setPhotoSaveMsg] = useState('');

  const [tischMenu, setTischMenu] = useState({ categories: [], items: [] });
  const [tischNewCatName, setTischNewCatName] = useState('');
  const [tischAdminSearch, setTischAdminSearch] = useState('');
  const [tischNewCatEmoji, setTischNewCatEmoji] = useState('🍽️');
  const [tischItemCat, setTischItemCat] = useState('');
  const [tischItemName, setTischItemName] = useState('');
  const [tischItemDesc, setTischItemDesc] = useState('');
  const [tischItemPrice, setTischItemPrice] = useState('');
  const [tischItemPriceLarge, setTischItemPriceLarge] = useState('');
  const [tischItemImg, setTischItemImg] = useState('');
  const [tischPhotos, setTischPhotos] = useState({});
  const [tischEditingId, setTischEditingId] = useState(null);
  const [tischFormOpen, setTischFormOpen] = useState(false);
  const [tischUploadBusy, setTischUploadBusy] = useState(false);
  const [tischAdminOpen, setTischAdminOpen] = useState(false);
  const [tischMsg, setTischMsg] = useState('');

  useEffect(() => {
    if (!ok) return;
    Promise.all([safeGet('siteconfig:tischMenu'), safeGet('siteconfig:tischPhotos'), safeListPrefix('tischphoto:', 500)]).then(([menuData, legacyBlob, rows]) => {
      if (!menuData) return;
      const photoMap = {};
      rows.forEach((r) => { if (r.value?.url) photoMap[r.key.replace(/^tischphoto:/, '')] = r.value.url; });
      const legacy = legacyBlob || {};
      let changed = false;
      // Fotos, die noch im alten Sammel-Blob liegen, einzeln nachziehen
      Object.keys(legacy).forEach((id) => {
        if (!photoMap[id]) { photoMap[id] = legacy[id]; changed = true; queueTischPhotoSave(id, legacy[id]); }
      });
      // Fotos, die noch direkt im Menü-Datensatz eingebettet sind, herauslösen
      const lightenedItems = menuData.items.map((it) => {
        if (it.img && it.img.startsWith('data:image') && !photoMap[it.id]) {
          photoMap[it.id] = it.img;
          changed = true;
          queueTischPhotoSave(it.id, it.img);
          const next = { ...it };
          delete next.img;
          return next;
        }
        return it;
      });
      setTischPhotos(photoMap);
      if (changed) {
        const lightenedMenu = { ...menuData, items: lightenedItems };
        setTischMenu(lightenedMenu);
        saveTischMenu(lightenedMenu);
      } else {
        setTischMenu(menuData);
      }
    });
  }, [ok]);

  const tischSaveQueueRef = useRef(Promise.resolve());
  function saveTischMenu(next) {
    setTischMenu(next);
    tischSaveQueueRef.current = tischSaveQueueRef.current.then(() => safeSet('siteconfig:tischMenu', next)).catch(() => {});
  }
  function tischAddCategory() {
    const label = tischNewCatName.trim();
    if (!label) return;
    const key = label.toLowerCase().replace(/[^a-z0-9äöüß]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now().toString(36).slice(-4);
    const next = { ...tischMenu, categories: [...tischMenu.categories, { key, label, emoji: tischNewCatEmoji.trim() || '🍽️' }] };
    saveTischMenu(next);
    setTischNewCatName(''); setTischNewCatEmoji('🍽️');
  }
  function tischDeleteCategory(key) {
    const next = { categories: tischMenu.categories.filter((c) => c.key !== key), items: tischMenu.items.filter((i) => i.category !== key) };
    saveTischMenu(next);
  }
  function tischResetForm() {
    setTischEditingId(null); setTischItemName(''); setTischItemDesc(''); setTischItemPrice(''); setTischItemPriceLarge(''); setTischItemImg(''); setTischMsg(''); setTischFormOpen(false);
  }
  function tischStartAdd() {
    tischResetForm();
    setTischFormOpen(true);
  }
  function tischStartEdit(item) {
    setTischEditingId(item.id); setTischItemCat(item.category);
    setTischItemName(typeof item.name === 'string' ? item.name : (item.name?.de || ''));
    setTischItemDesc(typeof item.desc === 'string' ? item.desc : (item.desc?.de || ''));
    setTischItemPrice(String(item.price)); setTischItemPriceLarge(item.priceLarge !== undefined ? String(item.priceLarge) : '');
    setTischItemImg(tischPhotos[item.id] || item.img || '');
    setTischFormOpen(true);
  }
  const tischPhotoSaveQueueRef = useRef(Promise.resolve());
  function queueTischPhotoSave(itemId, url) {
    tischPhotoSaveQueueRef.current = tischPhotoSaveQueueRef.current.then(() => safeSet('tischphoto:' + itemId, { url })).then(() => kvListCache.clear()).catch(() => {});
  }
  function tischSaveItem() {
    const price = parseFloat(tischItemPrice.replace(',', '.'));
    if (!tischItemCat || !tischItemName.trim() || isNaN(price)) { setTischMsg('⚠️ Kategorie, Name und Preis erforderlich'); return; }
    const priceLargeVal = tischItemPriceLarge.trim() ? parseFloat(tischItemPriceLarge.replace(',', '.')) : undefined;
    let items;
    let itemId = tischEditingId;
    if (tischEditingId) {
      items = tischMenu.items.map((i) => {
        if (i.id !== tischEditingId) return i;
        const next = { ...i, category: tischItemCat, name: tischItemName.trim(), desc: tischItemDesc.trim(), price };
        delete next.img; // Fotos liegen jetzt einzeln unter tischphoto:{id}, nicht mehr im Menü-Datensatz
        if (priceLargeVal !== undefined) next.priceLarge = priceLargeVal; else delete next.priceLarge;
        return next;
      });
    } else {
      const id = 't' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      itemId = id;
      const newItem = { id, category: tischItemCat, name: tischItemName.trim(), desc: tischItemDesc.trim(), price, soldOut: false };
      if (priceLargeVal !== undefined) newItem.priceLarge = priceLargeVal;
      items = [...tischMenu.items, newItem];
      fireIfEnabled('neuesProdukt', '🆕 Neu auf der Karte!', tischItemName.trim());
    }
    if (tischItemImg && tischItemImg.trim()) {
      setTischPhotos((prev) => ({ ...prev, [itemId]: tischItemImg.trim() }));
      queueTischPhotoSave(itemId, tischItemImg.trim());
    }
    saveTischMenu({ ...tischMenu, items });
    setTischMsg('✅ Gespeichert (auf Deutsch — sag mir im Chat Bescheid, wenn ich es in alle Sprachen übersetzen soll)');
    tischResetForm();
  }
  function tischImportFromMenu() {
    const emojiMap = { kebap: '🥙', pizza: '🍕', familienpizza: '🍕', pizzabrot: '🥖', calzone: '🥐', baguette: '🥪', ueberbacken: '🧀', rollo: '🌯', nudeln: '🍝', schnitzel: '🍖', salat: '🥗', finger: '🍤', getraenke: '🥤' };
    const existingCatKeys = new Set(tischMenu.categories.map((c) => c.key));
    const existingItemsById = new Map(tischMenu.items.map((i) => [i.id, i]));
    const newCats = [];
    const mergedItems = [...tischMenu.items];
    let addedCount = 0, updatedCount = 0;
    MENU.forEach((cat) => {
      const catKey = 'imp-' + cat.key;
      if (!existingCatKeys.has(catKey)) newCats.push({ key: catKey, label: cat.label, emoji: emojiMap[cat.key] || '🍽️' });
      cat.items.forEach((it) => {
        if (it.customPizza || it.customPasta) return;
        const id = 'imp-' + it.id;
        const base = { id, category: catKey, name: it.name, desc: it.desc || '', number: menuNum(it.id), alg: it.alg || '', ...(it.extras ? { extras: it.extras } : {}), ...(it.toppingChoices ? { toppingChoices: it.toppingChoices } : {}) };
        if (it.priceLarge !== undefined) { base.price = it.priceSmall; base.priceLarge = it.priceLarge; }
        else base.price = it.price;
        const existing = existingItemsById.get(id);
        if (existing) {
          const idx = mergedItems.findIndex((x) => x.id === id);
          mergedItems[idx] = { ...existing, ...base };
          updatedCount++;
        } else {
          mergedItems.push({ ...base, img: '', soldOut: false });
          addedCount++;
        }
      });
    });
    if (addedCount === 0 && updatedCount === 0) { setTischMsg('Keine Änderungen.'); return; }
    const menuOrder = MENU.map((c) => 'imp-' + c.key);
    const combinedCats = [...tischMenu.categories, ...newCats].sort((a, b) => {
      const ia = menuOrder.indexOf(a.key); const ib = menuOrder.indexOf(b.key);
      if (ia === -1 && ib === -1) return 0;
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
    saveTischMenu({ categories: combinedCats, items: mergedItems });
    setTischMsg(`✅ ${addedCount} neu, ${updatedCount} aktualisiert (Nummern & Allergene ergänzt)`);
  }
  function tischDeleteItem(id) {
    saveTischMenu({ ...tischMenu, items: tischMenu.items.filter((i) => i.id !== id) });
    if (tischEditingId === id) tischResetForm();
  }
  function tischToggleSoldOut(id) {
    saveTischMenu({ ...tischMenu, items: tischMenu.items.map((i) => (i.id === id ? { ...i, soldOut: !i.soldOut } : i)) });
  }
  async function tischHandleImageUpload(file) {
    if (!file) return;
    setTischUploadBusy(true);
    try {
      const dataUrl = await compressImageFile(file, 900, 0.78);
      const publicUrl = await uploadImageToStorage(dataUrl, tischEditingId || 'tisch');
      setTischItemImg(publicUrl || dataUrl); // falls back to base64 only if the Storage upload failed
    } catch {}
    setTischUploadBusy(false);
  }

  useEffect(() => {
    if (ok && tab === 'orders') {
      const load = () => safeListPrefix('order:', 25).then((rows) => {
        const prevKeys = knownOrderKeysRef.current;
        if (prevKeys !== null) {
          const isNew = rows.some((r) => !prevKeys.has(r.key));
          if (isNew) notifyNewOrder();
        }
        knownOrderKeysRef.current = new Set(rows.map((r) => r.key));
        setOrders(rows);
      });
      load();
      const iv = setInterval(load, 6000);
      const tickIv = setInterval(() => setNowTick(Date.now()), 1000);
      return () => { clearInterval(iv); clearInterval(tickIv); };
    } else {
      knownOrderKeysRef.current = null;
    }
  }, [ok, tab]);
  useEffect(() => {
    if (ok && tab === 'settings') {
      safeGet('siteconfig:rating').then((r) => { if (r) { setRatingScore(String(r.score)); setRatingCount(String(r.count)); } });
      safeGet('siteconfig:dailyBanner').then((r) => {
        if (r && r.text) setDailyBannerText(r.text);
        if (r && r.img) setDailyBannerImg(r.img);
        if (r && r.expiresAt) {
          const remainingMs = Math.max(0, r.expiresAt - Date.now());
          setDailyBannerDays(String(Math.floor(remainingMs / (24 * 3600 * 1000))));
          setDailyBannerHours(String(Math.round((remainingMs % (24 * 3600 * 1000)) / 3600000)));
        }
      });
      safeGet('siteconfig:waTemplate').then((r) => { if (r && r.text) setWaTemplateText(r.text); });
      safeGet('siteconfig:campaign').then((r) => { if (r) setCampaign(r); });
    }
  }, [ok, tab]);
  useEffect(() => {
    if (ok && tab === 'analytics') {
      safeListPrefix('analytics:', 500).then((rows) => setVisits(rows));
      safeListPrefix('wish:', 100).then((rows) => setWishes(rows.sort((a, b) => b.value.ts - a.value.ts)));
      // Nur lesen, NICHT löschen — anders als im Nachrichten-Tab, der ältere
      // Nachrichten automatisch aufräumt. Hier soll nichts verschwinden,
      // damit eine E-Mail-Benachrichtigung, die übersehen wurde, hier
      // trotzdem dauerhaft sichtbar bleibt.
      safeListPrefix('contactmsg:', 200).then((rows) => setContactMessagesArchive(rows.sort((a, b) => b.value.ts - a.value.ts)));
      fetch('/api/subscriber-count').then((r) => r.json()).then((d) => {
        if (typeof d?.count === 'number') setSubscriberCount(d.count);
      }).catch(() => {});
    }
  }, [ok, tab]);
  useEffect(() => {
    if (ok && tab === 'messages') {
      safeListPrefix('contactmsg:', 200).then((rows) => {
        const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
        const fresh = [];
        rows.forEach((r) => {
          if (r.value.ts < todayStart.getTime()) {
            safeDeleteKey(r.key);
          } else {
            fresh.push(r);
          }
        });
        setContactMessages(fresh.sort((a, b) => b.value.ts - a.value.ts));
      });
    }
  }, [ok, tab]);
  useEffect(() => {
    if (ok && tab === 'menu') {
      safeGet('siteconfig:priceOverrides').then((r) => { if (r) setPriceOverrides(r); });
      safeGet('siteconfig:soldOut').then((r) => { if (r) setSoldOutIdsStaff(r); });
      safeGet('siteconfig:chickenSoldOut').then((r) => { setChickenSoldOut(!!r); });
      safeGet('siteconfig:soldOutExtras').then((r) => { if (r) setSoldOutExtras(r); });
    }
  }, [ok, tab]);
  useEffect(() => {
    if (ok && tab === 'photos') {
      safeGet('siteconfig:photoOverrides').then((r) => { if (r) setPhotoOverrides(r); });
      safeGet('siteconfig:extraGalleryPhotos').then((r) => { if (r) setExtraGalleryPhotos(r); });
    }
  }, [ok, tab]);
  const toggleOrderStatus = async (o) => {
    const next = o.value.status === 'ready' ? 'preparing' : 'ready';
    const updated = { ...o.value, status: next };
    await safeSet(o.key, updated);
    setOrders((list) => list.map((x) => x.key === o.key ? { ...x, value: updated } : x));
  };
  const [deleteErrorMsg, setDeleteErrorMsg] = useState('');
  const sortedOrders = useMemo(() => {
    const visible = showTestOrders ? orders : orders.filter((o) => !o.value.test);
    return visible.slice().sort((a, b) => {
      const aReady = a.value.status === 'ready';
      const bReady = b.value.status === 'ready';
      if (aReady !== bReady) return aReady ? 1 : -1; // unready first
      const aPickup = parsePickupTimeToday(a.value.pickupTime);
      const bPickup = parsePickupTimeToday(b.value.pickupTime);
      if (aPickup && bPickup) return aPickup.getTime() - bPickup.getTime();
      if (aPickup) return -1;
      if (bPickup) return 1;
      return a.value.createdAt - b.value.createdAt; // oldest (most overdue) first
    });
  }, [orders, showTestOrders]);
  const knownOrderKeysRef = useRef(null);
  const [nowTick, setNowTick] = useState(Date.now());
  const beepAudioRef = useRef(null);
  const getBeepAudio = () => {
    if (!beepAudioRef.current) {
      beepAudioRef.current = new Audio(NOTIFY_BEEP_URI);
      beepAudioRef.current.volume = 1;
    }
    return beepAudioRef.current;
  };
  const audioCtxRef = useRef(null);
  const getAudioCtx = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      return audioCtxRef.current;
    } catch { return null; }
  };
  const playBeeps = (ctx) => {
    const base = ctx.currentTime;
    [0, 0.18].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 900;
      gain.gain.setValueAtTime(0.4, base + delay);
      gain.gain.setValueAtTime(0.4, base + delay + 0.12);
      gain.gain.linearRampToValueAtTime(0, base + delay + 0.15);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(base + delay);
      osc.stop(base + delay + 0.16);
    });
  };
  const unlockAudio = () => {
    try {
      const el = getBeepAudio();
      el.muted = true;
      const p = el.play();
      if (p && p.then) p.then(() => { el.pause(); el.currentTime = 0; el.muted = false; }).catch(() => { el.muted = false; });
    } catch {}
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.gain.value = 0.0001;
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.05);
    } catch {}
  };
  const notifyNewOrder = () => {
    try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch {}
    try {
      const el = getBeepAudio();
      el.currentTime = 0;
      const p = el.play();
      if (p && p.catch) p.catch(() => {});
      setTimeout(() => { try { const el2 = getBeepAudio(); el2.currentTime = 0; el2.play().catch(() => {}); } catch {} }, 750);
    } catch {}
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      ctx.resume();
      playBeeps(ctx);
    } catch {}
  };
  const deleteOrder = async (o) => {
    const success = await safeDeleteKey(o.key);
    if (success) {
      setOrders((list) => list.filter((x) => x.key !== o.key));
    } else {
      setDeleteErrorMsg(t('deleteFailedMsg'));
      setTimeout(() => setDeleteErrorMsg(''), 6000);
    }
  };
  const saveRating = async () => {
    const score = parseFloat(ratingScore.replace(',', '.'));
    const count = parseInt(ratingCount, 10);
    if (isNaN(score) || isNaN(count)) return;
    await safeSet('siteconfig:rating', { score, count });
    setRatingMsg(t('savedMsg'));
    setTimeout(() => setRatingMsg(''), 2500);
  };
  const selectExistingWeekendPhoto = async (which, url) => {
    const next = { ...weekendComboPhotos, [which]: url };
    setWeekendComboPhotos(next);
    await safeSet('siteconfig:weekendComboPhotos', next);
  };
  const handleWeekendPhotoUpload = async (which, file) => {
    if (!file) return;
    setWeekendPhotoUploadBusy(which);
    try {
      const dataUrl = await compressImageFile(file, 1000, 0.78);
      const publicUrl = await uploadImageToStorage(dataUrl, 'weekendcombo-' + which);
      const next = { ...weekendComboPhotos, [which]: publicUrl || dataUrl };
      setWeekendComboPhotos(next);
      await safeSet('siteconfig:weekendComboPhotos', next);
    } catch {}
    setWeekendPhotoUploadBusy('');
  };
  const togglePushTrigger = async (key) => {
    const next = { ...pushTriggers, [key]: !pushTriggers[key] };
    setPushTriggers(next);
    await safeSet('siteconfig:pushTriggers', next);
  };
  const toggleMittagsCat = async (catKey) => {
    const next = { ...mittagsEnabled, [catKey]: !mittagsEnabled[catKey] };
    setMittagsEnabled(next);
    await safeSet('siteconfig:mittagsSidePhotos', { enabled: next, pizzaGalleryUrl: mittagsPizzaGalleryUrl });
  };
  const setPizzaGalleryPhoto = async (url) => {
    const nextUrl = mittagsPizzaGalleryUrl === url ? '' : url;
    setMittagsPizzaGalleryUrl(nextUrl);
    await safeSet('siteconfig:mittagsSidePhotos', { enabled: mittagsEnabled, pizzaGalleryUrl: nextUrl });
  };
  const saveDailyBanner = async () => {
    const days = parseFloat(dailyBannerDays) || 0;
    const hours = parseFloat(dailyBannerHours) || 0;
    const durationMs = (days * 24 + hours) * 3600 * 1000;
    const expiresAt = durationMs > 0 ? Date.now() + durationMs : null;
    await safeSet('siteconfig:dailyBanner', { text: dailyBannerText.trim(), img: dailyBannerImg || '', expiresAt, updatedAt: Date.now() });
    setDailyBannerMsg(t('savedMsg'));
    setTimeout(() => setDailyBannerMsg(''), 2500);
    if (dailyBannerText.trim()) fireIfEnabled('ankuendigung', '📣 Neue Ankündigung', dailyBannerText.trim());
  };
  const clearDailyBanner = async () => {
    setDailyBannerText(''); setDailyBannerImg(''); setDailyBannerDays('1'); setDailyBannerHours('0');
    await safeSet('siteconfig:dailyBanner', { text: '', img: '', expiresAt: null, updatedAt: Date.now() });
  };
  const handleDailyBannerUpload = async (file) => {
    if (!file) return;
    setDailyBannerUploadBusy(true);
    try {
      const dataUrl = await compressImageFile(file, 1000, 0.78);
      const publicUrl = await uploadImageToStorage(dataUrl, 'ankuendigung');
      setDailyBannerImg(publicUrl || dataUrl);
    } catch {}
    setDailyBannerUploadBusy(false);
  };
  const saveCampaign = async () => {
    const prev = await safeGet('siteconfig:campaign');
    await safeSet('siteconfig:campaign', campaign);
    setCampaignMsg(t('savedMsg'));
    setTimeout(() => setCampaignMsg(''), 2500);
    if (campaign.active && !prev?.active && campaign.title.trim()) {
      fireIfEnabled('angebot', '🎉 ' + campaign.title.trim(), campaign.subtitle?.trim() || 'Jetzt bei uns entdecken!');
    }
  };
  const saveWaTemplate = async () => {
    await safeSet('siteconfig:waTemplate', { text: waTemplateText.trim() });
    setWaTemplateMsg(t('savedMsg'));
    setTimeout(() => setWaTemplateMsg(''), 2500);
  };
  const createTestOrder = async () => {
    const testCode = `TEST-${makeNumericCode(4)}`;
    await safeSet(`order:${testCode}`, {
      code: testCode, status: 'preparing', createdAt: Date.now(), test: true,
      itemCount: 2, total: 12.5, name: 'Test',
      items: [{ name: '1x Kalb Kebap', qty: 1 }, { name: '1x Fritz-Kola', qty: 1 }],
      pickupTime: null,
    });
    setTestOrderMsg(t('testOrderCreatedMsg'));
    setTimeout(() => setTestOrderMsg(''), 3000);
  };

  const menuSearchResults = useMemo(() => {
    if (!menuSearch.trim()) return [];
    const q = menuSearch.trim().toLowerCase();
    const out = [];
    MENU.forEach((cat) => cat.items.forEach((item) => {
      if (item.name.toLowerCase().includes(q) || menuNum(item.id).toLowerCase().includes(q)) out.push(item);
    }));
    return out.slice(0, 12);
  }, [menuSearch]);
  const selectMenuItem = (item) => {
    setEditingItem(item);
    const ov = priceOverrides[item.id];
    if (item.priceLarge !== undefined) {
      setEditSmall(String(ov?.small !== undefined ? ov.small : item.priceSmall));
      setEditLarge(String(ov?.large !== undefined ? ov.large : item.priceLarge));
    } else {
      setEditSmall(String(ov?.price !== undefined ? ov.price : item.price));
    }
  };
  const saveMenuPrice = async () => {
    if (!editingItem) return;
    const next = { ...priceOverrides };
    if (editingItem.priceLarge !== undefined) {
      const small = parseFloat(editSmall.replace(',', '.'));
      const large = parseFloat(editLarge.replace(',', '.'));
      if (isNaN(small) || isNaN(large)) return;
      next[editingItem.id] = { small, large };
    } else {
      const price = parseFloat(editSmall.replace(',', '.'));
      if (isNaN(price)) return;
      next[editingItem.id] = { price };
    }
    await safeSet('siteconfig:priceOverrides', next);
    setPriceOverrides(next);
    setMenuSaveMsg(t('savedMsg'));
    setTimeout(() => setMenuSaveMsg(''), 2500);
  };
  const resetMenuPrice = async () => {
    if (!editingItem) return;
    const next = { ...priceOverrides };
    delete next[editingItem.id];
    await safeSet('siteconfig:priceOverrides', next);
    setPriceOverrides(next);
    setEditingItem(null);
  };
  const toggleSoldOut = async () => {
    if (!editingItem) return;
    const isOut = soldOutIds.includes(editingItem.id);
    const next = isOut ? soldOutIds.filter((id) => id !== editingItem.id) : [...soldOutIds, editingItem.id];
    await safeSet('siteconfig:soldOut', next);
    setSoldOutIdsStaff(next);
  };
  const toggleChickenSoldOut = async () => {
    const next = !chickenSoldOut;
    await safeSet('siteconfig:chickenSoldOut', next);
    setChickenSoldOut(next);
  };
  const toggleSoldOutExtra = async (name) => {
    const isOut = soldOutExtras.includes(name);
    const next = isOut ? soldOutExtras.filter((n) => n !== name) : [...soldOutExtras, name];
    await safeSet('siteconfig:soldOutExtras', next);
    setSoldOutExtras(next);
  };
  const extraSearchResults = useMemo(() => {
    if (!extraSearch.trim()) return [];
    const q = extraSearch.trim().toLowerCase();
    return ALL_EXTRA_NAMES.filter((n) => n.toLowerCase().includes(q)).slice(0, 12);
  }, [extraSearch]);

  const photoSearchResults = useMemo(() => {
    if (!photoSearch.trim()) return [];
    const q = photoSearch.trim().toLowerCase();
    const out = [];
    MENU.forEach((cat) => cat.items.forEach((item) => {
      if (item.name.toLowerCase().includes(q) || menuNum(item.id).toLowerCase().includes(q)) out.push(item);
    }));
    return out.slice(0, 12);
  }, [photoSearch]);
  const photoSaveQueueRef = useRef(Promise.resolve());
  const queuePhotoOverridesSave = (next) => {
    photoSaveQueueRef.current = photoSaveQueueRef.current.then(() => safeSet('siteconfig:photoOverrides', next)).catch(() => {});
  };
  const [migrateBusy, setMigrateBusy] = useState(false);
  const [migrateMsg, setMigrateMsg] = useState('');
  async function migrateOldPhotosToStorage() {
    setMigrateBusy(true);
    setMigrateMsg('Läuft…');
    let migrated = 0, failed = 0;
    try {
      const overrides = await safeGet('siteconfig:photoOverrides') || {};
      const nextOverrides = { ...overrides };
      let overridesChanged = false;
      for (const [id, val] of Object.entries(overrides)) {
        if (typeof val === 'string' && val.startsWith('data:image')) {
          const url = await uploadImageToStorage(val, id);
          if (url) { nextOverrides[id] = url; overridesChanged = true; migrated++; }
          else failed++;
        }
      }
      if (overridesChanged) { await safeSet('siteconfig:photoOverrides', nextOverrides); setPhotoOverrides(nextOverrides); }

      const rows = await safeListPrefix('tischphoto:', 500);
      for (const row of rows) {
        const val = row.value?.url;
        if (typeof val === 'string' && val.startsWith('data:image')) {
          const id = row.key.replace(/^tischphoto:/, '');
          const url = await uploadImageToStorage(val, id);
          if (url) { await safeSet('tischphoto:' + id, { url }); migrated++; }
          else failed++;
        }
      }
      kvListCache.clear();

      const gallery = await safeGet('siteconfig:extraGalleryPhotos') || [];
      let galleryChanged = false;
      const nextGallery = [];
      for (const val of gallery) {
        if (typeof val === 'string' && val.startsWith('data:image')) {
          const url = await uploadImageToStorage(val, 'gallery');
          if (url) { nextGallery.push(url); galleryChanged = true; migrated++; }
          else { nextGallery.push(val); failed++; }
        } else {
          nextGallery.push(val);
        }
      }
      if (galleryChanged) { await safeSet('siteconfig:extraGalleryPhotos', nextGallery); setExtraGalleryPhotos(nextGallery); }

      setMigrateMsg(migrated === 0 && failed === 0 ? '✅ Nichts zu tun — alle Fotos sind bereits schnell.' : `✅ ${migrated} Foto(s) migriert${failed ? `, ${failed} fehlgeschlagen` : ''}`);
    } catch {
      setMigrateMsg('⚠️ Fehler — bitte nochmal versuchen');
    }
    setMigrateBusy(false);
  }
  const selectPhotoItem = (item) => {
    setEditingPhotoItem(item);
    setEditPhotoUrl(photoOverrides[item.id] || item.img || '');
  };
  const savePhoto = () => {
    if (!editingPhotoItem || !editPhotoUrl.trim()) return;
    const next = { ...photoOverrides, [editingPhotoItem.id]: editPhotoUrl.trim() };
    setPhotoOverrides(next);
    setPhotoSaveMsg(t('savedMsg'));
    setTimeout(() => setPhotoSaveMsg(''), 2000);
    queuePhotoOverridesSave(next);
  };
  const applyPhotoToCategory = () => {
    if (!editingPhotoItem || !editPhotoUrl.trim()) return;
    const cat = MENU.find((c) => c.items.some((i) => i.id === editingPhotoItem.id));
    if (!cat) return;
    const next = { ...photoOverrides };
    cat.items.forEach((i) => { next[i.id] = editPhotoUrl.trim(); });
    setPhotoOverrides(next);
    setPhotoSaveMsg(t('photoAppliedCategoryMsg').replace('{count}', String(cat.items.length)));
    setTimeout(() => setPhotoSaveMsg(''), 3000);
    queuePhotoOverridesSave(next);
  };
  const [photoUploadBusy, setPhotoUploadBusy] = useState(false);
  const compressImageFile = (file, maxW = 900, quality = 0.78) => new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const handlePhotoFileUpload = async (file) => {
    if (!file || !editingPhotoItem) return;
    setPhotoUploadBusy(true);
    try {
      const dataUrl = await compressImageFile(file);
      const publicUrl = await uploadImageToStorage(dataUrl, editingPhotoItem.id);
      const finalUrl = publicUrl || dataUrl; // falls back to base64 only if the Storage upload failed
      setEditPhotoUrl(finalUrl);
      const next = { ...photoOverrides, [editingPhotoItem.id]: finalUrl };
      setPhotoOverrides(next);
      setPhotoSaveMsg(t('savedMsg'));
      setTimeout(() => setPhotoSaveMsg(''), 2000);
      queuePhotoOverridesSave(next);
    } catch {}
    setPhotoUploadBusy(false);
  };
  const [extraGalleryPhotos, setExtraGalleryPhotos] = useState([]);
  const [galleryUploadBusy, setGalleryUploadBusy] = useState(false);
  const [galleryPreview, setGalleryPreview] = useState('');
  const [galleryMsg, setGalleryMsg] = useState('');
  const handleGalleryFileUpload = async (file) => {
    if (!file) return;
    setGalleryUploadBusy(true);
    try {
      const dataUrl = await compressImageFile(file, 1000, 0.75);
      const publicUrl = await uploadImageToStorage(dataUrl, 'gallery');
      setGalleryPreview(publicUrl || dataUrl); // falls back to base64 only if the Storage upload failed
    } catch {}
    setGalleryUploadBusy(false);
  };
  const saveGalleryPhoto = () => {
    if (!galleryPreview) return;
    const next = [...extraGalleryPhotos, galleryPreview];
    setExtraGalleryPhotos(next);
    setGalleryPreview('');
    setGalleryMsg(t('savedMsg'));
    setTimeout(() => setGalleryMsg(''), 2000);
    safeSet('siteconfig:extraGalleryPhotos', next);
  };
  const removeGalleryPhoto = (idx) => {
    const next = extraGalleryPhotos.filter((_, i) => i !== idx);
    setExtraGalleryPhotos(next);
    safeSet('siteconfig:extraGalleryPhotos', next);
  };
  const [hiddenPhotos, setHiddenPhotos] = useState([]);
  useEffect(() => { if (ok) safeGet('siteconfig:hiddenPhotos').then((r) => { if (r) setHiddenPhotos(r); }); }, [ok]);
  const togglePhotoHidden = async (src) => {
    const next = hiddenPhotos.includes(src) ? hiddenPhotos.filter((s) => s !== src) : [...hiddenPhotos, src];
    setHiddenPhotos(next);
    await safeSet('siteconfig:hiddenPhotos', next);
  };
  const resetPhoto = () => {
    if (!editingPhotoItem) return;
    const next = { ...photoOverrides };
    delete next[editingPhotoItem.id];
    setPhotoOverrides(next);
    setEditPhotoUrl('');
    setPhotoSaveMsg('🗑️ ' + t('deletedMsg'));
    setTimeout(() => { setPhotoSaveMsg(''); setEditingPhotoItem(null); }, 900);
    queuePhotoOverridesSave(next);
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

  if (ok && tischAdminOpen) {
    return (
      <div className="pb-10" style={{ background: CREAM, minHeight: '100vh' }}>
        <div style={{ background: GREEN }}><TopBar onHome={() => setTischAdminOpen(false)} title={t('staffTischMenuTab')} /></div>
        <div className="px-5 pt-4">
          <p className="text-[11px] mb-2" style={{ color: '#a4906c' }}>Eigene Karte für den QR-Tischmenü-Bildschirm — unabhängig vom Bestell-Menü. Einträge werden auf Deutsch gespeichert; für andere Sprachen im Chat Bescheid geben, dann werden sie wie auf der Hauptseite von Hand übersetzt.</p>
          <a href="?menu=1" target="_blank" rel="noreferrer" className="inline-block mb-3 mr-2 px-4 py-2 rounded-full font-bold text-xs" style={{ background: '#fdecd4', color: '#8a5a1f', border: '1px solid #f0d4a8' }}>👁️ Vorschau ansehen</a>
          <button onClick={tischImportFromMenu} className="inline-block mb-4 px-4 py-2 rounded-full font-bold text-xs" style={{ background: '#e2eee2', color: GREEN, border: `1px solid ${GREEN}` }}>📥 Alle Artikel von der Bestellseite importieren</button>

          {tischMenu.categories.length > 0 && (
            <button onClick={tischStartAdd} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm text-white mb-4" style={{ background: `linear-gradient(135deg, ${GREEN}, #1d4a34)`, boxShadow: '0 8px 20px rgba(21,56,38,.25)' }}>
              <span className="text-base">➕</span> Neuer Artikel
            </button>
          )}

          {/* Kategorien */}
          <div className="bg-white rounded-2xl p-4 mb-4">
            <div className="font-black text-xs mb-2.5" style={{ color: GREEN }}>Kategorien</div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {tischMenu.categories.map((cat) => (
                <div key={cat.key} className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl" style={{ background: '#f7f0e2' }}>
                  <span className="text-base flex-shrink-0">{cat.emoji}</span>
                  <span className="flex-1 min-w-0 truncate text-xs font-bold" style={{ color: GREEN }}>{tischText(cat.label, 'de')}</span>
                  <button onClick={() => { if (confirm(`"${tischText(cat.label, 'de')}" und alle ihre Artikel löschen?`)) tischDeleteCategory(cat.key); }} className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0d4d4' }}><X size={12} color={CHILI} /></button>
                </div>
              ))}
              {tischMenu.categories.length === 0 && <p className="text-[11px] font-semibold col-span-2" style={{ color: '#c4b697' }}>Noch keine Kategorien — leg unten die erste an.</p>}
            </div>
            <div className="flex gap-2">
              <input value={tischNewCatEmoji} onChange={(e) => setTischNewCatEmoji(e.target.value)} placeholder="🍽️" className="w-14 px-2 py-2.5 rounded-lg text-center text-lg outline-none" style={{ background: '#f7f0e2' }} />
              <input value={tischNewCatName} onChange={(e) => setTischNewCatName(e.target.value)} placeholder="Neue Kategorie (z.B. Vorspeisen)" className="flex-1 px-3 py-2.5 rounded-lg text-sm font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
              <button onClick={tischAddCategory} className="px-4 rounded-lg font-bold text-sm text-white" style={{ background: GREEN }}>+</button>
            </div>
          </div>

          {/* Suche nach Nummer oder Name */}
          <div className="mb-4">
            <input
              value={tischAdminSearch}
              onChange={(e) => setTischAdminSearch(e.target.value)}
              placeholder="🔍 Suche nach Nummer oder Name…"
              className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none"
              style={{ background: '#fff', color: GREEN, border: '1.5px solid #f0e5cf' }}
            />
          </div>

          {/* Artikel-Liste je Kategorie */}
          {tischMenu.categories.map((cat) => {
            const q = tischAdminSearch.trim().toLowerCase();
            const catItems = tischMenu.items.filter((i) => {
              if (i.category !== cat.key) return false;
              if (!q) return true;
              const numMatch = i.number && String(i.number).toLowerCase().includes(q);
              const nameMatch = tischText(i.name, 'de').toLowerCase().includes(q);
              return numMatch || nameMatch;
            });
            if (q && catItems.length === 0) return null;
            return (
              <div key={cat.key} className="mb-5">
                <div className="flex items-center gap-1.5 mb-2.5 px-0.5">
                  <span className="font-black text-xs" style={{ color: '#a4906c' }}>{cat.emoji} {tischText(cat.label, 'de')}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#f0e5cf', color: '#a4906c' }}>{catItems.length}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {catItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-3" style={{ boxShadow: '0 2px 8px rgba(21,56,38,.06)' }}>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        {(tischPhotos[item.id] || item.img) ? (
                          <img src={tischPhotos[item.id] || item.img} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl" style={{ background: '#f7f0e2' }}>🍽️</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm leading-snug" style={{ color: GREEN }}>
                            {item.number && <span className="text-[10px] font-black mr-1" style={{ color: ORANGE }}>#{item.number}</span>}
                            {tischText(item.name, 'de')}
                            {item.alg && <sup className="ml-0.5 font-semibold" style={{ fontSize: '9px', color: '#a4906c' }}>{item.alg}</sup>}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-xs font-black" style={{ color: ORANGE }}>{item.priceLarge !== undefined ? `22cm ${fmt(item.price)} / 28cm ${fmt(item.priceLarge)}` : fmt(item.price)}</span>
                            {item.soldOut && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: '#8a7c62', color: '#fff' }}>{t('soldOutBadge')}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => tischToggleSoldOut(item.id)} className="flex-1 text-[11px] font-bold py-2 rounded-xl" style={{ background: item.soldOut ? '#e9e2d0' : '#fdecd4', color: item.soldOut ? '#8a7c62' : '#8a5a1f' }}>{item.soldOut ? '↩ Zurück' : 'Ausverkauft'}</button>
                        <button onClick={() => tischStartEdit(item)} className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm" style={{ background: '#f0e5cf' }}>✏️</button>
                        <button onClick={() => { if (confirm('Artikel löschen?')) tischDeleteItem(item.id); }} className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#f0d4d4' }}><X size={14} color={CHILI} /></button>
                      </div>
                    </div>
                  ))}
                  {catItems.length === 0 && <p className="text-[11px] font-semibold px-1" style={{ color: '#c4b697' }}>Noch keine Artikel</p>}
                </div>
              </div>
            );
          })}

          {tischFormOpen && (
            <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-8 pb-8 overflow-y-auto" style={{ background: 'rgba(21,56,38,.55)', backdropFilter: 'blur(3px)' }} onClick={tischResetForm}>
              <div className="w-full max-w-sm rounded-3xl p-5" style={{ background: '#fff', boxShadow: '0 30px 70px rgba(21,56,38,.4)', animation: 'modalCardUp .3s cubic-bezier(.25,.46,.45,.94)' }} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <div className="font-black text-base" style={{ color: GREEN }}>{tischEditingId ? '✏️ Artikel bearbeiten' : '➕ Neuer Artikel'}</div>
                  <button onClick={tischResetForm} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#f0e5cf' }}><X size={15} color={GREEN} /></button>
                </div>
                <div className="flex flex-col gap-2.5">
                  <select value={tischItemCat} onChange={(e) => setTischItemCat(e.target.value)} className="w-full px-3.5 py-3 rounded-xl text-sm font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }}>
                    <option value="">Kategorie wählen…</option>
                    {tischMenu.categories.map((c) => <option key={c.key} value={c.key}>{c.emoji} {tischText(c.label, 'de')}</option>)}
                  </select>
                  <input value={tischItemName} onChange={(e) => setTischItemName(e.target.value)} placeholder="Name (auf Deutsch)" className="w-full px-3.5 py-3 rounded-xl text-sm font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                  <textarea value={tischItemDesc} onChange={(e) => setTischItemDesc(e.target.value)} placeholder="Beschreibung (optional, auf Deutsch)" rows={2} className="w-full px-3.5 py-3 rounded-xl text-sm font-medium outline-none resize-none" style={{ background: '#f7f0e2', color: GREEN }} />
                  <div className="flex gap-2.5">
                    <input value={tischItemPrice} onChange={(e) => setTischItemPrice(e.target.value)} placeholder="Preis (z.B. 8.50)" inputMode="decimal" className="flex-1 px-3.5 py-3 rounded-xl text-sm font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                    <input value={tischItemPriceLarge} onChange={(e) => setTischItemPriceLarge(e.target.value)} placeholder="Preis groß (opt.)" inputMode="decimal" className="flex-1 px-3.5 py-3 rounded-xl text-sm font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                  </div>
                  {tischItemImg && <img src={tischItemImg} alt="" className="w-full h-32 object-cover rounded-xl" />}
                  <label className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white cursor-pointer" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', opacity: tischUploadBusy ? 0.6 : 1 }}>
                    <span className="text-base">📷</span> {tischUploadBusy ? '…' : 'Foto hochladen'}
                    <input type="file" accept="image/*" className="hidden" disabled={tischUploadBusy} onChange={(e) => { const f = e.target.files?.[0]; if (f) tischHandleImageUpload(f); e.target.value = ''; }} />
                  </label>
                  <div className="flex gap-2 mt-1">
                    <button onClick={tischSaveItem} disabled={tischUploadBusy} className="flex-1 py-3 rounded-xl font-bold text-sm text-white disabled:opacity-50" style={{ background: GREEN }}>{tischUploadBusy ? '…' : t('saveBtn')}</button>
                    <button onClick={tischResetForm} className="px-5 py-3 rounded-xl font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('cancelBtn')}</button>
                  </div>
                  {tischMsg && <p className="text-center text-xs font-bold" style={{ color: '#8a5a1f' }}>{tischMsg}</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div style={{ background: GREEN }}><TopBar onHome={back} title={t('titleStaff')} /></div>

      {!ok ? (
        <div className="min-h-[calc(100vh-70px)] flex justify-center px-6 pt-4 relative overflow-hidden" style={{ background: `radial-gradient(ellipse at 50% -10%, rgba(255,199,56,.1), transparent 60%), linear-gradient(165deg, #081209, #123420 50%, #0a1a10)` }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 300, height: 300, top: -90, left: -70, background: 'radial-gradient(circle, rgba(255,59,59,.14), transparent 70%)', filter: 'blur(14px)', animation: 'softFloat 9s ease-in-out infinite' }} />
          <div className="absolute rounded-full pointer-events-none" style={{ width: 260, height: 260, bottom: -70, right: -60, background: 'radial-gradient(circle, rgba(255,199,56,.13), transparent 70%)', filter: 'blur(14px)', animation: 'softFloat 11s ease-in-out infinite reverse' }} />
          <style>{`@keyframes pinEmberFloat { 0%{ transform:translateY(0) translateX(0); opacity:0; } 12%{ opacity:1; } 100%{ transform:translateY(-680px) translateX(var(--drift)); opacity:0; } }`}</style>
          {pinEmbers.map((e, i) => (
            <div key={i} className="pointer-events-none" style={{
              position: 'absolute', bottom: 0, left: `${e.left}%`,
              width: e.size, height: e.size, borderRadius: '50%',
              background: i % 2 === 0 ? GOLD : ORANGE,
              boxShadow: `0 0 6px 2px ${i % 2 === 0 ? 'rgba(255,199,56,.7)' : 'rgba(230,90,10,.7)'}`,
              animation: `pinEmberFloat ${e.duration}s ease-in ${e.delay}s infinite`,
              '--drift': `${e.drift}px`,
            }} />
          ))}
          <div className="w-full max-w-xs relative">
            <div className="flex flex-col items-center mb-4 mt-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-2.5"
                style={unlockStage === 'unlocked'
                  ? { background: `linear-gradient(135deg, #34c759, #28a745)`, boxShadow: '0 10px 30px rgba(52,199,89,.5), 0 0 0 5px rgba(52,199,89,.2)', transform: 'scale(1.1)', transition: 'all .8s cubic-bezier(.34,1.4,.64,1)' }
                  : unlockStage === 'wrong'
                  ? { background: `linear-gradient(135deg, #ff3b3b, #ff1a1a)`, boxShadow: '0 10px 30px rgba(255,30,30,.6), 0 0 0 6px rgba(255,59,59,.3)', animation: 'shakeX .4s ease' }
                  : { background: `linear-gradient(135deg, #ff3b3b, #ff1a1a)`, boxShadow: '0 10px 30px rgba(255,30,30,.5), 0 0 0 6px rgba(255,59,59,.22)', animation: 'urgentPulse 2s ease-out infinite' }}
              >
                {unlockStage === 'wrong' ? <span className="text-2xl">✕</span> : <AnimatedLock open={unlockStage === 'unlocked'} />}
              </div>
              <div className="font-black text-base text-center" style={{ color: unlockStage === 'unlocked' ? '#7ed99b' : unlockStage === 'wrong' ? '#ff8080' : '#fff' }}>
                {unlockStage === 'unlocked' ? '✅ Willkommen!' : unlockStage === 'wrong' ? '❌ Falscher PIN' : t('titleStaff')}
              </div>
              <div className="text-[10px] font-bold tracking-widest mt-0.5" style={{ color: GOLD, opacity: 0.85 }}>NUR FÜR PERSONAL</div>
            </div>
            <div className="rounded-3xl p-5 mt-6" style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,199,56,.25)', backdropFilter: 'blur(18px) saturate(1.5)', WebkitBackdropFilter: 'blur(18px) saturate(1.5)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.15), 0 20px 50px rgba(0,0,0,.35)' }} onClick={() => pinInputRef.current?.focus()}>
              <div className="relative">
                <input
                  ref={pinInputRef}
                  value={pin}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, '').slice(0, 6);
                    if (v.length > pin.length) setKeystroke((k) => k + 1);
                    setPin(v);
                  }}
                  type="tel" inputMode="numeric" maxLength={6}
                  disabled={unlocking}
                  className="absolute inset-0 w-full h-full opacity-0"
                  style={{ zIndex: 2 }}
                  autoFocus
                />
                <div className="flex items-center justify-center gap-2 pointer-events-none" style={{ animation: unlockStage === 'wrong' ? 'shakeX .4s ease' : 'none' }}>
                  {Array.from({ length: 6 }).map((_, i) => {
                    const filled = i < pin.length;
                    const isActive = i === pin.length - 1;
                    const boxColor = unlockStage === 'unlocked' ? '#34c759' : unlockStage === 'wrong' ? '#ff4d4d' : filled ? GOLD : 'rgba(255,255,255,.22)';
                    return (
                      <div
                        key={isActive ? `box-${i}-${keystroke}` : `box-${i}`}
                        className="w-10 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: filled ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.04)',
                          backdropFilter: 'blur(8px)',
                          border: `1.5px solid ${boxColor}`,
                          boxShadow: filled ? `inset 0 1px 0 rgba(255,255,255,.25), 0 0 14px ${unlockStage === 'unlocked' ? 'rgba(52,199,89,.4)' : unlockStage === 'wrong' ? 'rgba(255,77,77,.4)' : 'rgba(255,199,56,.3)'}` : 'inset 0 1px 0 rgba(255,255,255,.08)',
                          transition: 'border-color .3s, background .3s',
                          animation: isActive && unlockStage === 'idle' ? 'pinBoxPop .4s cubic-bezier(.34,1.56,.64,1)' : 'none',
                        }}
                      >
                        {unlockStage === 'unlocked' ? (
                          <Check size={22} color="#34c759" strokeWidth={4} />
                        ) : filled ? (
                          <span className="w-2 h-2 rounded-full" style={{ background: unlockStage === 'wrong' ? '#ff4d4d' : GOLD }} />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}>
                <button onClick={() => setRememberChoice(rememberChoice ? null : '1h')} className="w-full flex items-center gap-2.5 mb-2.5" disabled={unlocking}>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: rememberChoice ? GOLD : 'rgba(255,255,255,.08)', border: rememberChoice ? 'none' : '1.5px solid rgba(255,255,255,.25)' }}>
                    {rememberChoice && <Check size={13} color={GREEN} strokeWidth={3.5} />}
                  </div>
                  <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,.85)' }}>Auf diesem Gerät merken</span>
                </button>
                {rememberChoice && (
                  <div className="flex gap-1.5">
                    {[{ id: '10m', label: '10 Min' }, { id: '1h', label: '1 Stunde' }, { id: 'today', label: 'Heute' }].map((opt) => (
                      <button key={opt.id} onClick={() => setRememberChoice(opt.id)} className="flex-1 py-2 rounded-lg text-[11px] font-bold" style={rememberChoice === opt.id ? { background: GOLD, color: GREEN } : { background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.6)' }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden" style={{ background: `radial-gradient(ellipse at 50% -10%, rgba(255,199,56,.09), transparent 55%), linear-gradient(165deg, #16241c, #1d3527 45%, #17281e)`, minHeight: 'calc(100vh - 70px)', paddingBottom: 96, paddingTop: 20 }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: 280, height: 280, top: -80, right: -70, background: 'radial-gradient(circle, rgba(255,199,56,.11), transparent 70%)', filter: 'blur(16px)', animation: 'softFloat 10s ease-in-out infinite' }} />
          <div className="absolute rounded-full pointer-events-none" style={{ width: 240, height: 240, top: '40%', left: -80, background: 'radial-gradient(circle, rgba(45,106,79,.2), transparent 70%)', filter: 'blur(16px)', animation: 'softFloat 12s ease-in-out infinite reverse' }} />
          {lastLoginAt && (
            <div className="px-5 pb-3 text-center">
              <span className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,.45)' }}>🕐 Letzter Zugang: {new Date(lastLoginAt).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })} Uhr</span>
            </div>
          )}
          {tab === 'wheel' && (
            <div className="px-5">
              <div className="text-[10px] font-black tracking-widest mb-2" style={{ color: '#a4906c' }}>🎡 GEWINNCODE PRÜFEN</div>
              <div className="flex gap-2 mb-4">
                <input value={wheelCode} onChange={(e) => setWheelCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && wheelSearch()} placeholder={t('prizeCodePh')} className="flex-1 px-4 py-3 rounded-xl text-base font-bold tracking-[0.1em] outline-none" style={{ background: '#fff', color: GREEN, border: '1.5px solid #f0e5cf' }} />
                <button onClick={wheelSearch} className="px-5 rounded-xl font-bold text-sm" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('searchBtn')}</button>
              </div>
              {wheelResult === null && <p className="text-sm font-semibold text-center" style={{ color: CHILI }}>{t('codeNotFound')}</p>}
              {wheelResult && (
                <div className="bg-white rounded-2xl p-5" style={{ border: '1.5px solid #f0e5cf' }}>
                  <div className="flex items-center gap-2 mb-3"><ShieldCheck size={18} color={wheelResult.redeemed ? '#a4906c' : '#34a065'} /><span className="font-bold text-sm" style={{ color: GREEN }}>{wheelResult.redeemed ? t('alreadyRedeemed') : t('validLabel')}</span></div>
                  <div className="text-lg font-black mb-4" style={{ color: GREEN }}>{mx(wheelResult.prize, lang)}</div>
                  {!wheelResult.redeemed && <button onClick={wheelRedeem} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN }}>{t('confirmRedeem')}</button>}
                  {redeemMsg && <p className="text-center text-sm font-bold mt-3" style={{ color: '#8a5a1f' }}>{redeemMsg}</p>}
                </div>
              )}
            </div>
          )}
          {tab === 'orders' && (
            <div className="px-5">
              <div className="text-[10px] font-black tracking-widest mb-2" style={{ color: '#a4906c' }}>📦 {t('staffOrdersTab').toUpperCase()}</div>
              {deleteErrorMsg && <p className="text-xs font-bold text-center mb-3 px-3 py-2 rounded-lg" style={{ background: '#fdecd4', color: CHILI }}>{deleteErrorMsg}</p>}
              {sortedOrders.length === 0 && (
                <div className="text-center py-14 rounded-2xl" style={{ background: '#fff', border: '1.5px dashed #e3d5bd' }}>
                  <div className="text-5xl mb-3 opacity-70">📭</div>
                  <p className="text-sm font-semibold" style={{ color: '#8a7c62' }}>{t('noOrdersYet')}</p>
                </div>
              )}
              <div className="flex flex-col gap-2.5">
                {sortedOrders.map((o) => {
                  const elapsedMs = nowTick - o.value.createdAt;
                  const isStuck = o.value.status !== 'ready' && elapsedMs > 15 * 60 * 1000;
                  const pickupTarget = o.value.pickupTime ? parsePickupTimeToday(o.value.pickupTime) : null;
                  const pickupDiffMs = pickupTarget ? pickupTarget.getTime() - nowTick : null;
                  return (
                  <div key={o.key} className="bg-white rounded-2xl p-4" style={isStuck ? { border: `2px solid ${CHILI}`, background: '#fff5f5' } : { border: '1.5px solid #f0e5cf' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-black text-sm flex items-center gap-1.5" style={{ color: GREEN }}>{o.value.code} {o.value.name ? `· ${o.value.name}` : ''}{o.value.test && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full text-white" style={{ background: '#8a7c62' }}>🧪 TEST</span>}{isStuck && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full text-white" style={{ background: CHILI }}>⏰ {t('stuckOrderBadge')}</span>}</div>
                        <div className="text-[11px] font-bold mt-0.5" style={{ color: isStuck ? CHILI : ORANGE }}>⏱ {t('elapsedPrefix')} {formatElapsedMMSS(elapsedMs)}</div>
                        {pickupTarget && (
                          <div className="text-[11px] font-bold mt-0.5" style={{ color: pickupDiffMs > 0 ? GREEN : CHILI }}>
                            🕐 {t('pickupTimePh')}: {o.value.pickupTime} · {pickupDiffMs > 0 ? `${t('inPrefix')} ${formatElapsedMMSS(pickupDiffMs)}` : `${t('overduePrefix')} ${formatElapsedMMSS(-pickupDiffMs)}`}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button onClick={() => toggleOrderStatus(o)} className="px-3.5 py-2 rounded-lg text-xs font-bold text-white" style={{ background: o.value.status === 'ready' ? '#25D366' : ORANGE }}>{o.value.status === 'ready' ? t('orderStatusReady') : t('orderStatusPreparing')}</button>
                        <button onClick={() => deleteOrder(o)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#f7e2e2' }} title={t('deleteOrderBtn')}><X size={14} color={CHILI} /></button>
                      </div>
                    </div>
                    {o.value.items && o.value.items.length > 0 && (
                      <div className="rounded-lg p-2.5 mb-2" style={{ background: '#f7f0e2' }}>
                        {o.value.items.map((it, idx) => (
                          <div key={idx} className="text-xs font-semibold" style={{ color: GREEN }}>{it.qty}x {it.name}</div>
                        ))}
                      </div>
                    )}
                    <div className="text-xs font-bold text-right" style={{ color: CHILI }}>{o.value.itemCount} {t('itemsWord')} · {fmt(o.value.total)}</div>
                  </div>
                  );
                })}
              </div>
              {sortedOrders.length > 0 && (
                <div className="mt-4 rounded-xl p-4 flex items-center justify-between" style={{ background: GREEN }}>
                  <span className="text-sm font-bold" style={{ color: GOLD }}>{t('ordersTotalLabel')}</span>
                  <span className="font-black text-lg" style={{ color: GOLD }}>{fmt(sortedOrders.reduce((s, o) => s + (o.value.total || 0), 0))}</span>
                </div>
              )}
            </div>
          )}
          {tab === 'settings' && (
            <div className="px-5">
              <div className="flex gap-2 overflow-x-auto pb-1 mb-4" style={{ WebkitOverflowScrolling: 'touch' }}>
                {[
                  { key: 'sicherheit', label: '🔒 Sicherheit' },
                  { key: 'fotos', label: '📸 Fotos & Werbung' },
                  { key: 'kommunikation', label: '💬 Kommunikation' },
                  { key: 'erweitert', label: '🧪 Erweitert' },
                ].map((g) => (
                  <button key={g.key} onClick={() => setSettingsGroup(g.key)} className="flex-shrink-0 px-4 py-2.5 rounded-full font-bold text-xs whitespace-nowrap" style={settingsGroup === g.key ? { background: GREEN, color: '#fff', boxShadow: '0 4px 12px rgba(21,56,38,.25)' } : { background: '#fff', color: '#7c6d55', border: '1.5px solid #e9dcc0' }}>
                    {g.label}
                  </button>
                ))}
              </div>

              {settingsGroup === 'sicherheit' && (
                <>
                  <SettingsRow id="pin" icon="🔒" title="PIN ändern" openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <p className="text-[11px] mb-2.5" style={{ color: '#a4906c' }}>Aktueller PIN gilt bis du ihn hier änderst.</p>
                    <input value={newPin} onChange={(e) => setNewPin(e.target.value)} type="password" inputMode="numeric" placeholder="Neuer PIN" className="w-full px-3 py-2.5 rounded-xl text-sm font-bold outline-none mb-2 tracking-[0.2em]" style={{ background: '#f7f0e2', color: GREEN }} />
                    <input value={newPin2} onChange={(e) => setNewPin2(e.target.value)} type="password" inputMode="numeric" placeholder="Neuer PIN wiederholen" className="w-full px-3 py-2.5 rounded-xl text-sm font-bold outline-none mb-2.5 tracking-[0.2em]" style={{ background: '#f7f0e2', color: GREEN }} />
                    <button onClick={savePin} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN, boxShadow: '0 6px 16px rgba(21,56,38,.25)' }}>{t('saveBtn')}</button>
                    {pinMsg && <p className="text-center text-xs font-bold mt-2" style={{ color: '#8a5a1f' }}>{pinMsg}</p>}
                  </SettingsRow>

                  <SettingsRow id="logoutAll" icon="📴" title="Alle Geräte abmelden" openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <p className="text-[11px] mb-2.5" style={{ color: '#a4906c' }}>Meldet sofort jedes Gerät ab, das mit „Auf diesem Gerät merken" gemerkt wurde — auch dieses hier. Nützlich, wenn ein Handy verloren geht oder du dich versehentlich auf einem fremden Gerät gemerkt hast.</p>
                    <button onClick={logoutAllDevices} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: CHILI, boxShadow: '0 6px 16px rgba(214,40,40,.25)' }}>Jetzt alle abmelden</button>
                    {logoutAllMsg && <p className="text-center text-xs font-bold mt-2" style={{ color: '#8a5a1f' }}>{logoutAllMsg}</p>}
                  </SettingsRow>
                </>
              )}

              {settingsGroup === 'fotos' && (
                <>
                  <SettingsRow id="migratePhotos" icon="🚀" title="Alte Fotos beschleunigen" openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <p className="text-[11px] mb-2.5" style={{ color: '#a4906c' }}>Verschiebt alle bisher hochgeladenen Fotos in den schnellen Speicher (Storage). Einmal antippen genügt — kann ein paar Minuten dauern, du kannst währenddessen weiterarbeiten.</p>
                    <button onClick={migrateOldPhotosToStorage} disabled={migrateBusy} className="w-full py-3 rounded-xl font-bold text-sm text-white disabled:opacity-50" style={{ background: GREEN, boxShadow: '0 6px 16px rgba(21,56,38,.25)' }}>{migrateBusy ? '…' : 'Jetzt migrieren'}</button>
                    {migrateMsg && <p className="text-center text-xs font-bold mt-2" style={{ color: '#8a5a1f' }}>{migrateMsg}</p>}
                  </SettingsRow>

                  <SettingsRow id="mittagsPhotos" icon="🖼️" title="Mittagsangebot – Seitenfotos" openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <p className="text-[11px] mb-3" style={{ color: '#a4906c' }}>Kategorie aktivieren = alle Fotos dieser Kategorie wechseln links/rechts neben dem Mittagsangebot-Banner.</p>
                    {[
                      { key: 'pizza', label: '🍕 Pizza', catKey: 'pizza', gallery: true },
                      { key: 'salat', label: '🥗 Salat', catKey: 'salat', gallery: false },
                      { key: 'nudeln', label: '🍝 Nudelngericht', catKey: 'nudeln', gallery: false },
                      { key: 'schnitzel', label: '🍖 Schnitzel', catKey: 'schnitzel', gallery: false },
                    ].map((row) => {
                      const cat = MENU.find((c) => c.key === row.catKey);
                      const previews = (cat?.items || [])
                        .map((item) => photoOverrides[item.id] || item.img)
                        .filter(Boolean);
                      const isOn = mittagsEnabled[row.key];
                      return (
                        <div key={row.key} className="mb-3.5">
                          <button onClick={() => toggleMittagsCat(row.key)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2" style={{ background: isOn ? `${GREEN}` : '#f7f0e2' }}>
                            <span className="font-bold text-sm flex-1 text-left" style={{ color: isOn ? '#fff' : GREEN }}>{row.label}</span>
                            <span className="text-[10px] font-black" style={{ color: isOn ? GOLD : '#a4906c' }}>{previews.length} Fotos</span>
                            <div className="w-9 h-5 rounded-full flex-shrink-0 relative" style={{ background: isOn ? GOLD : '#e3d5bd' }}>
                              <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white" style={{ left: isOn ? 18 : 2, transition: 'left .15s' }} />
                            </div>
                          </button>
                          {previews.length === 0 && <p className="text-[10px] font-semibold px-1" style={{ color: '#c4b697' }}>Keine Fotos in dieser Kategorie — zuerst in „Speisekarte bearbeiten" Fotos hinzufügen.</p>}
                          {previews.length > 0 && (
                            <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
                              {previews.map((url, i) => <img key={i} src={url} alt="" className="flex-shrink-0 rounded-lg object-cover" style={{ width: 40, height: 40, opacity: isOn ? 1 : 0.4 }} />)}
                            </div>
                          )}
                          {row.gallery && extraGalleryPhotos.length > 0 && (
                            <div className="mt-2">
                              <p className="text-[10px] font-black mb-1" style={{ color: '#a4906c' }}>+ ZUSÄTZLICH AUS GALERIE (optional)</p>
                              <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
                                {extraGalleryPhotos.map((url, i) => (
                                  <button key={i} onClick={() => setPizzaGalleryPhoto(url)} className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 40, height: 40, border: mittagsPizzaGalleryUrl === url ? `3px solid ${GOLD}` : '1px solid #e9dcc0' }}>
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </SettingsRow>

                  <SettingsRow id="weekendPhotos" icon="🎉" title="Samstag-Angebot – Fotos" openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <p className="text-[11px] mb-3" style={{ color: '#a4906c' }}>Aktuelle Fotos für die Pizza- und Dönerteller-Karten am Samstag — hochladen oder aus vorhandenen Speisekarte-Fotos wählen.</p>
                    {[
                      { key: 'pizza', label: '🍕 Pizza-Kombi', catKey: 'pizza' },
                      { key: 'doener', label: '🥙 Dönerteller-Kombi', catKey: 'kebap' },
                    ].map((row) => {
                      const cat = MENU.find((c) => c.key === row.catKey);
                      const candidates = (cat?.items || []).map((item) => photoOverrides[item.id] || item.img).filter(Boolean);
                      return (
                        <div key={row.key} className="mb-4">
                          <div className="text-xs font-black mb-1.5" style={{ color: GREEN }}>{row.label}</div>
                          {weekendComboPhotos[row.key] && <img src={weekendComboPhotos[row.key]} alt="" className="w-full h-28 object-cover rounded-xl mb-2" />}
                          <label className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white cursor-pointer mb-2" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', opacity: weekendPhotoUploadBusy === row.key ? 0.6 : 1 }}>
                            <span className="text-base">📷</span> {weekendPhotoUploadBusy === row.key ? '…' : 'Neues Foto hochladen'}
                            <input type="file" accept="image/*" className="hidden" disabled={!!weekendPhotoUploadBusy} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleWeekendPhotoUpload(row.key, f); e.target.value = ''; }} />
                          </label>
                          {(candidates.length > 0 || extraGalleryPhotos.length > 0) && (
                            <>
                              <p className="text-[10px] font-black mb-1" style={{ color: '#a4906c' }}>ODER VORHANDENES FOTO WÄHLEN</p>
                              <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
                                {candidates.map((url, i) => (
                                  <button key={`c${i}`} onClick={() => selectExistingWeekendPhoto(row.key, url)} className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 44, height: 44, border: weekendComboPhotos[row.key] === url ? `3px solid ${GOLD}` : '1px solid #e9dcc0' }}>
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                  </button>
                                ))}
                                {extraGalleryPhotos.map((url, i) => (
                                  <button key={`g${i}`} onClick={() => selectExistingWeekendPhoto(row.key, url)} className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 44, height: 44, border: weekendComboPhotos[row.key] === url ? `3px solid ${GOLD}` : '1px solid #e9dcc0' }}>
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </SettingsRow>

                  <SettingsRow id="dailyBanner" icon="📌" title={t('dailyBannerLabel')} openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <input value={dailyBannerText} onChange={(e) => setDailyBannerText(e.target.value)} placeholder={t('dailyBannerPh')} className="w-full px-3 py-2.5 rounded-xl text-sm font-bold outline-none mb-2.5" style={{ background: '#f7f0e2', color: GREEN }} />
                    {dailyBannerImg && <img src={dailyBannerImg} alt="" className="w-full h-32 object-cover rounded-lg mb-2.5" />}
                    <label className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white mb-2.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', opacity: dailyBannerUploadBusy ? 0.6 : 1 }}>
                      <span className="text-base">📷</span> {dailyBannerUploadBusy ? '…' : 'Foto hinzufügen (optional)'}
                      <input type="file" accept="image/*" className="hidden" disabled={dailyBannerUploadBusy} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleDailyBannerUpload(f); e.target.value = ''; }} />
                    </label>
                    <div className="text-[10px] font-black mb-1.5" style={{ color: '#a4906c' }}>WIE LANGE AUF DER STARTSEITE ZEIGEN?</div>
                    <div className="flex gap-2 mb-2.5">
                      <div className="flex-1">
                        <input type="number" min="0" value={dailyBannerDays} onChange={(e) => setDailyBannerDays(e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-sm font-bold outline-none text-center" style={{ background: '#f7f0e2', color: GREEN }} />
                        <div className="text-[10px] font-bold text-center mt-1" style={{ color: '#a4906c' }}>Tage</div>
                      </div>
                      <div className="flex-1">
                        <input type="number" min="0" max="23" value={dailyBannerHours} onChange={(e) => setDailyBannerHours(e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-sm font-bold outline-none text-center" style={{ background: '#f7f0e2', color: GREEN }} />
                        <div className="text-[10px] font-bold text-center mt-1" style={{ color: '#a4906c' }}>Stunden</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={saveDailyBanner} className="flex-1 py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN, boxShadow: '0 6px 16px rgba(21,56,38,.25)' }}>{t('saveBtn')}</button>
                      <button onClick={clearDailyBanner} className="px-5 py-3 rounded-xl font-bold text-sm" style={{ background: '#fff', color: CHILI, border: '1.5px solid #f2c9c9' }}>{t('resetBtn')}</button>
                    </div>
                    {dailyBannerMsg && <p className="text-center text-xs font-bold mt-2" style={{ color: '#8a5a1f' }}>{dailyBannerMsg}</p>}
                  </SettingsRow>

                  <SettingsRow id="campaign" icon="🎉" title="Aktionsbanner" openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <p className="text-[11px] mb-2.5" style={{ color: '#a4906c' }}>Für Zeiträume wie Stoppelmarkt, Feiertage etc.</p>
                    <label className="flex items-center gap-2 text-xs font-semibold mb-2.5" style={{ color: GREEN }}>
                      <input type="checkbox" checked={campaign.active} onChange={(e) => setCampaign({ ...campaign, active: e.target.checked })} />
                      Banner aktiv
                    </label>
                    <input value={campaign.title} onChange={(e) => setCampaign({ ...campaign, title: e.target.value })} placeholder="Titel (z.B. 🎪 Stoppelmarkt-Woche!)" className="w-full px-3 py-2.5 rounded-xl text-sm font-bold outline-none mb-2" style={{ background: '#f7f0e2', color: GREEN }} />
                    <input value={campaign.subtitle} onChange={(e) => setCampaign({ ...campaign, subtitle: e.target.value })} placeholder="Untertitel (optional)" className="w-full px-3 py-2.5 rounded-xl text-sm font-medium outline-none mb-2" style={{ background: '#f7f0e2', color: GREEN }} />
                    <div className="flex gap-2 mb-2">
                      <input type="date" value={campaign.startDate} onChange={(e) => setCampaign({ ...campaign, startDate: e.target.value })} className="flex-1 px-3 py-2.5 rounded-xl text-xs font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                      <input type="date" value={campaign.endDate} onChange={(e) => setCampaign({ ...campaign, endDate: e.target.value })} className="flex-1 px-3 py-2.5 rounded-xl text-xs font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                    </div>
                    <p className="text-[10px] mb-2.5" style={{ color: '#a4906c' }}>Leer lassen = Banner läuft solange "aktiv" angehakt ist, egal welches Datum.</p>
                    <button onClick={saveCampaign} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN, boxShadow: '0 6px 16px rgba(21,56,38,.25)' }}>{t('saveBtn')}</button>
                    {campaignMsg && <p className="text-center text-xs font-bold mt-2" style={{ color: '#8a5a1f' }}>{campaignMsg}</p>}
                  </SettingsRow>
                </>
              )}

              {settingsGroup === 'kommunikation' && (
                <>
                  <SettingsRow id="pushTriggers" icon="🔔" title="Push-Benachrichtigungen — Auto-Versand" openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <p className="text-[11px] mb-3" style={{ color: '#a4906c' }}>Wenn aktiviert, wird bei diesem Ereignis automatisch eine Push-Benachrichtigung an alle angemeldeten Besucher gesendet.</p>
                    {[
                      { key: 'ankuendigung', label: '📣 Neue Ankündigung gespeichert' },
                      { key: 'angebot', label: '🎉 Aktionsbanner wird aktiviert' },
                      { key: 'neuesProdukt', label: '🆕 Neues Produkt hinzugefügt' },
                      { key: 'samstag', label: '🍕 Samstag-Angebot (jeden Samstag)' },
                      { key: 'montagErinnerung', label: '🍽️ Mittagsangebot-Erinnerung (Montag 11 Uhr)' },
                    ].map((row) => {
                      const isOn = pushTriggers[row.key];
                      return (
                        <button key={row.key} onClick={() => togglePushTrigger(row.key)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2" style={{ background: isOn ? GREEN : '#f7f0e2' }}>
                          <span className="font-bold text-sm flex-1 text-left" style={{ color: isOn ? '#fff' : GREEN }}>{row.label}</span>
                          <div className="w-9 h-5 rounded-full flex-shrink-0 relative" style={{ background: isOn ? GOLD : '#e3d5bd' }}>
                            <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white" style={{ left: isOn ? 18 : 2, transition: 'left .15s' }} />
                          </div>
                        </button>
                      );
                    })}
                  </SettingsRow>

                  <SettingsRow id="pushRawTest" icon="🧪" title="Push testen (direkter Versand)" openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <p className="text-[11px] mb-2.5" style={{ color: '#a4906c' }}>Sendet sofort eine echte Test-Benachrichtigung über den Server und zeigt die genaue Antwort — zeigt sofort, ob der geheime Schlüssel richtig eingerichtet ist.</p>
                    <button
                      onClick={async () => {
                        setPushRawTestMsg('Sende…');
                        try {
                          const res = await fetch('/api/send-push', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ title: '🧪 Testbenachrichtigung', message: 'Wenn du das siehst, funktioniert alles!' }),
                          });
                          const data = await res.json().catch(() => ({}));
                          setPushRawTestMsg(`Status ${res.status}: ${JSON.stringify(data)}`);
                        } catch (e) {
                          setPushRawTestMsg('⚠️ Netzwerkfehler: ' + (e?.message || String(e)));
                        }
                      }}
                      className="w-full py-3 rounded-xl font-bold text-sm text-white"
                      style={{ background: ORANGE, boxShadow: '0 6px 16px rgba(255,106,26,.25)' }}
                    >
                      🧪 Test-Push jetzt senden
                    </button>
                    {pushRawTestMsg && <p className="text-left text-xs font-bold mt-2 break-words whitespace-pre-line" style={{ color: '#8a5a1f' }}>{pushRawTestMsg}</p>}
                  </SettingsRow>

                  <SettingsRow id="waTemplate" icon="💬" title={t('waTemplateLabel')} openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <p className="text-[11px] mb-2.5" style={{ color: '#a4906c' }}>{t('waTemplateHint')}</p>
                    <input value={waTemplateText} onChange={(e) => setWaTemplateText(e.target.value)} placeholder={t('waTemplatePh')} className="w-full px-3 py-2.5 rounded-xl text-sm font-bold outline-none mb-2.5" style={{ background: '#f7f0e2', color: GREEN }} />
                    <button onClick={saveWaTemplate} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN, boxShadow: '0 6px 16px rgba(21,56,38,.25)' }}>{t('saveBtn')}</button>
                    {waTemplateMsg && <p className="text-center text-xs font-bold mt-2" style={{ color: '#8a5a1f' }}>{waTemplateMsg}</p>}
                  </SettingsRow>

                  <SettingsRow id="notifTest" icon="🔔" title={t('notifTestLabel')} openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <button onClick={() => { unlockAudio(); notifyNewOrder(); }} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: ORANGE, boxShadow: '0 6px 16px rgba(255,106,26,.25)' }}>🔔 {t('notifTestBtn')}</button>
                  </SettingsRow>

                  <SettingsRow id="rating" icon="⭐" title={t('googleRatingLabel')} openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <div className="flex gap-2 mb-2.5">
                      <input value={ratingScore} onChange={(e) => setRatingScore(e.target.value)} placeholder="4.6" className="flex-1 px-3 py-2.5 rounded-xl text-sm font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                      <input value={ratingCount} onChange={(e) => setRatingCount(e.target.value)} placeholder="293" className="flex-1 px-3 py-2.5 rounded-xl text-sm font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                    </div>
                    <button onClick={saveRating} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN, boxShadow: '0 6px 16px rgba(21,56,38,.25)' }}>{t('saveBtn')}</button>
                    {ratingMsg && <p className="text-center text-xs font-bold mt-2" style={{ color: '#8a5a1f' }}>{ratingMsg}</p>}
                  </SettingsRow>
                </>
              )}

              {settingsGroup === 'erweitert' && (
                <>
                  <SettingsRow id="testOrder" icon="🧪" title={t('testOrderLabel')} openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <p className="text-[11px] mb-2.5" style={{ color: '#a4906c' }}>{t('testOrderHint')}</p>
                    <button onClick={createTestOrder} className="w-full py-3 rounded-xl font-bold text-sm text-white mb-2" style={{ background: ORANGE, boxShadow: '0 6px 16px rgba(255,106,26,.25)' }}>🧪 {t('testOrderBtn')}</button>
                    <label className="flex items-center gap-2 text-xs font-semibold" style={{ color: GREEN }}>
                      <input type="checkbox" checked={showTestOrders} onChange={(e) => setShowTestOrders(e.target.checked)} />
                      {t('showTestOrdersLabel')}
                    </label>
                    {testOrderMsg && <p className="text-center text-xs font-bold mt-2" style={{ color: '#8a5a1f' }}>{testOrderMsg}</p>}
                  </SettingsRow>

                  <SettingsRow id="pushTest" icon="🔔" title="Push-Berechtigung testen (direkt)" openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <p className="text-[11px] mb-2.5" style={{ color: '#a4906c' }}>Fragt sofort beim Antippen nach Benachrichtigungs-Erlaubnis — ohne Wartezeit, ohne automatische Anzeige-Logik. Zeigt dir genau, ob OneSignal grundsätzlich funktioniert.</p>
                    <button
                      onClick={() => {
                        setPushTestMsg('Aktueller Status: ' + (typeof Notification !== 'undefined' ? Notification.permission : 'nicht unterstützt') + ' — frage jetzt (nativ)…');
                        if (typeof Notification === 'undefined') { setPushTestMsg('⚠️ Dieser Browser unterstützt keine Web-Notifications.'); return; }
                        Notification.requestPermission().then(async (result) => {
                          setPushTestMsg('Native Antwort: ' + result);
                          if (result !== 'granted') return;
                          try {
                            setPushTestMsg((m) => m + '\n→ warte auf Service Worker…');
                            const reg = await Promise.race([
                              navigator.serviceWorker.ready,
                              new Promise((_, rej) => setTimeout(() => rej(new Error('Timeout: Service Worker wurde nach 8s nicht aktiv')), 8000)),
                            ]);
                            setPushTestMsg((m) => m + `\n✓ Service Worker aktiv: ${reg.active?.scriptURL || '?'}`);
                          } catch (e) {
                            setPushTestMsg((m) => m + '\n⚠️ ' + (e?.message || String(e)));
                            return;
                          }
                          if (!window.OneSignalDeferred) { setPushTestMsg((m) => m + '\n⚠️ OneSignal-Skript nicht gefunden'); return; }
                          window.OneSignalDeferred.push(async (OneSignal) => {
                            try {
                              setPushTestMsg((m) => m + '\n→ melde bei OneSignal an…');
                              await Promise.race([
                                OneSignal.User.PushSubscription.optIn(),
                                new Promise((_, rej) => setTimeout(() => rej(new Error('Timeout: OneSignal-Anmeldung hängt nach 8s')), 8000)),
                              ]);
                              const optedIn = OneSignal.User.PushSubscription.optedIn;
                              const token = OneSignal.User.PushSubscription.token;
                              setPushTestMsg((m) => m + `\n✓ optIn() fertig — optedIn: ${optedIn}, token: ${token ? 'vorhanden' : 'fehlt noch'}`);
                              setPushTestMsg((m) => m + '\n→ warte auf ID von OneSignal-Server (bis zu 20s)…');
                              let id = OneSignal.User.PushSubscription.id;
                              for (let i = 0; i < 20 && !id; i++) {
                                await new Promise((r) => setTimeout(r, 1000));
                                id = OneSignal.User.PushSubscription.id;
                              }
                              if (id) {
                                setPushTestMsg((m) => m + `\n✅ ID erhalten: ${id}`);
                              } else {
                                setPushTestMsg((m) => m + `\n⚠️ Nach 20s immer noch keine ID. optedIn: ${OneSignal.User.PushSubscription.optedIn}, token: ${OneSignal.User.PushSubscription.token ? 'vorhanden' : 'fehlt'}`);
                              }
                            } catch (e) {
                              setPushTestMsg((m) => m + '\n⚠️ OneSignal-Anmeldung: ' + (e?.message || String(e)));
                            }
                          });
                        }).catch((e) => {
                          setPushTestMsg('⚠️ Fehler bei nativer Anfrage: ' + (e?.message || String(e)));
                        });
                      }}
                      className="w-full py-3 rounded-xl font-bold text-sm text-white"
                      style={{ background: ORANGE, boxShadow: '0 6px 16px rgba(255,106,26,.25)' }}
                    >
                      🔔 Jetzt direkt nach Erlaubnis fragen
                    </button>
                    {pushTestMsg && <p className="text-left text-xs font-bold mt-2 break-words whitespace-pre-line" style={{ color: '#8a5a1f' }}>{pushTestMsg}</p>}
                  </SettingsRow>

                  <SettingsRow id="notifTest" icon="🔔" title={t('notifTestLabel')} openId={openSettingsId} setOpenId={setOpenSettingsId}>
                    <button onClick={() => { unlockAudio(); notifyNewOrder(); }} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: ORANGE, boxShadow: '0 6px 16px rgba(255,106,26,.25)' }}>🔔 {t('notifTestBtn')}</button>
                  </SettingsRow>
                </>
              )}
            </div>
          )}
          {tab === 'analytics' && (() => {
            const now = Date.now();
            const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
            const pageVisits = visits.filter((v) => !v.value.event);
            const callClicks = visits.filter((v) => v.value.event === 'call').length;
            const routeClicks = visits.filter((v) => v.value.event === 'route').length;
            const total = pageVisits.length;
            const today = pageVisits.filter((v) => v.value.ts >= todayStart.getTime()).length;
            const byLang = {};
            const byDevice = { mobile: 0, desktop: 0 };
            pageVisits.forEach((v) => {
              byLang[v.value.lang] = (byLang[v.value.lang] || 0) + 1;
              byDevice[v.value.device] = (byDevice[v.value.device] || 0) + 1;
            });
            const langOrder = Object.entries(byLang).sort((a, b) => b[1] - a[1]);
            return (
              <div className="px-5">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button onClick={() => openStatsModal('Besuche heute', pageVisits.filter((v) => v.value.ts >= todayStart.getTime()), (v) => `${(v.value.lang || '').toUpperCase()} · ${v.value.device === 'mobile' ? '📱' : '💻'}`)} className="bg-white rounded-2xl p-4 text-center" style={{ border: '1.5px solid #f0e5cf' }}>
                    <div className="font-black text-2xl" style={{ color: GREEN }}>{today}</div>
                    <div className="text-[11px] font-bold" style={{ color: '#a4906c' }}>{t('visitsToday')}</div>
                  </button>
                  <button onClick={() => openStatsModal('Besuche gesamt', pageVisits, (v) => `${(v.value.lang || '').toUpperCase()} · ${v.value.device === 'mobile' ? '📱' : '💻'}`)} className="bg-white rounded-2xl p-4 text-center" style={{ border: '1.5px solid #f0e5cf' }}>
                    <div className="font-black text-2xl" style={{ color: GREEN }}>{total}</div>
                    <div className="text-[11px] font-bold" style={{ color: '#a4906c' }}>{t('visitsRecent')}</div>
                  </button>
                </div>
                <div className="rounded-2xl p-4 text-center mb-3" style={{ background: GREEN, boxShadow: '0 6px 16px rgba(21,56,38,.2)' }}>
                  <div className="font-black text-3xl text-white">🔔 {subscriberCount === null ? '…' : subscriberCount}</div>
                  <div className="text-[11px] font-bold" style={{ color: '#d9c9a3' }}>Push-Abonnenten (auf Startbildschirm hinzugefügt)</div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button onClick={() => openStatsModal('📞 Anrufe', visits.filter((v) => v.value.event === 'call'))} className="rounded-xl p-4 text-center" style={{ background: `${ORANGE}14`, boxShadow: '0 4px 14px rgba(21,56,38,.08)' }}>
                    <div className="font-black text-2xl" style={{ color: ORANGE }}>📞 {callClicks}</div>
                    <div className="text-[11px] font-bold" style={{ color: '#a4906c' }}>{t('callClicksLabel')}</div>
                  </button>
                  <button onClick={() => openStatsModal('📍 Routenanfragen', visits.filter((v) => v.value.event === 'route'))} className="rounded-xl p-4 text-center" style={{ background: `${ORANGE}14`, boxShadow: '0 4px 14px rgba(21,56,38,.08)' }}>
                    <div className="font-black text-2xl" style={{ color: ORANGE }}>📍 {routeClicks}</div>
                    <div className="text-[11px] font-bold" style={{ color: '#a4906c' }}>{t('routeClicksLabel')}</div>
                  </button>
                </div>
                <div className="bg-white rounded-xl p-4 mb-3">
                  <div className="text-[11px] font-black tracking-widest mb-2" style={{ color: '#a4906c' }}>💡 KUNDENWÜNSCHE</div>
                  {wishes.length === 0 && <p className="text-xs" style={{ color: '#a4906c' }}>Noch keine Wünsche eingegangen.</p>}
                  {wishes.slice(0, 30).map((w) => (
                    <div key={w.key} className="py-2" style={{ borderBottom: '1px solid #f0e5cf' }}>
                      <div className="text-sm font-semibold" style={{ color: GREEN }}>{w.value.text}</div>
                      <div className="text-[10px] font-bold mt-0.5" style={{ color: '#a4906c' }}>{w.value.name ? w.value.name + ' · ' : ''}{new Date(w.value.ts).toLocaleString('de-DE')}</div>
                    </div>
                  ))}
                </div>
                {(() => {
                  // Alle Klick-Events (Kategorien, Hero-Buttons, Anrufe, Route) in einer
                  // gemeinsamen, absteigend sortierten Liste — zeigt auf einen Blick,
                  // wo im Laufe des Tages/insgesamt am meisten geklickt wurde.
                  const CATEGORY_LABELS = Object.fromEntries((tischMenu?.categories || []).map((c) => [c.key, tischText(c.label, 'de')]));
                  const EVENT_LABELS = {
                    hero_menu: '📋 Hero: Speisekarte',
                    hero_tagesempfehlung: '⭐ Hero: Tagesempfehlung',
                    hero_surprise: '🎲 Hero: Überrasch mich',
                    call: '📞 Anruf-Button',
                    route: '📍 Route/Anfahrt',
                  };
                  const grouped = {};
                  visits.forEach((v) => {
                    const ev = v.value.event;
                    if (!ev) return;
                    let label;
                    if (ev === 'category') {
                      const catKey = v.value.cat;
                      label = `📂 Kategorie: ${CATEGORY_LABELS[catKey] || catKey}`;
                    } else if (EVENT_LABELS[ev]) {
                      label = EVENT_LABELS[ev];
                    } else if (ev.startsWith('assistant_')) {
                      return; // wird schon im KI-Assistent-Bereich separat gezeigt
                    } else {
                      return;
                    }
                    if (!grouped[label]) grouped[label] = [];
                    grouped[label].push(v);
                  });
                  const rows = Object.entries(grouped).sort((a, b) => b[1].length - a[1].length);
                  const todayRows = Object.entries(grouped)
                    .map(([label, rs]) => [label, rs.filter((r) => r.value.ts >= todayStart.getTime())])
                    .filter(([, rs]) => rs.length > 0)
                    .sort((a, b) => b[1].length - a[1].length);
                  const maxCount = rows.length ? rows[0][1].length : 1;
                  return (
                    <div className="bg-white rounded-xl p-4 mb-3">
                      <div className="text-[11px] font-black tracking-widest mb-1" style={{ color: '#a4906c' }}>📊 SITE-AKTIVITÄT — HEUTE</div>
                      {todayRows.length === 0 && <p className="text-xs mb-2" style={{ color: '#a4906c' }}>Heute noch keine Klicks erfasst.</p>}
                      {todayRows.slice(0, 8).map(([label, rs]) => (
                        <div key={'today-' + label} className="flex items-center justify-between py-1 text-sm font-semibold" style={{ color: GREEN }}>
                          <span className="truncate pr-2">{label}</span><span className="flex-shrink-0">{rs.length}</span>
                        </div>
                      ))}
                      <div className="text-[11px] font-black tracking-widest mt-3 mb-1" style={{ color: '#a4906c' }}>📊 SITE-AKTIVITÄT — GESAMT (Rangliste)</div>
                      {rows.length === 0 && <p className="text-xs" style={{ color: '#a4906c' }}>Noch keine Aktivität erfasst.</p>}
                      {rows.map(([label, rs]) => (
                        <button
                          key={label}
                          onClick={() => openStatsModal(label, rs, (v) => new Date(v.value.ts).toLocaleString('de-DE'))}
                          className="w-full mb-2 text-left"
                        >
                          <div className="flex items-center justify-between text-xs font-bold mb-0.5" style={{ color: GREEN }}>
                            <span className="truncate pr-2">{label}</span><span className="flex-shrink-0">{rs.length}</span>
                          </div>
                          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#f0e5cf' }}>
                            <div className="h-full rounded-full" style={{ width: `${Math.max(4, (rs.length / maxCount) * 100)}%`, background: `linear-gradient(90deg, ${ORANGE}, ${GOLD})` }} />
                          </div>
                        </button>
                      ))}
                    </div>
                  );
                })()}
                <div className="bg-white rounded-xl p-4">
                  <div className="text-[11px] font-black tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('byDevice')}</div>
                  <button onClick={() => openStatsModal('📱 Mobile Besuche', pageVisits.filter((v) => v.value.device === 'mobile'), (v) => (v.value.lang || '').toUpperCase())} className="w-full flex items-center justify-between py-1 text-sm font-semibold" style={{ color: GREEN }}><span>📱 Mobile</span><span>{byDevice.mobile || 0}</span></button>
                  <button onClick={() => openStatsModal('💻 Desktop Besuche', pageVisits.filter((v) => v.value.device === 'desktop'), (v) => (v.value.lang || '').toUpperCase())} className="w-full flex items-center justify-between py-1 text-sm font-semibold" style={{ color: GREEN }}><span>💻 Desktop</span><span>{byDevice.desktop || 0}</span></button>
                </div>
                {(() => {
                  const assistantEvents = visits.filter((v) => v.value.event && v.value.event.startsWith('assistant_'));
                  const byIntent = {};
                  assistantEvents.forEach((v) => {
                    const key = v.value.event.replace('assistant_', '');
                    byIntent[key] = (byIntent[key] || 0) + 1;
                  });
                  const intentLabels = { hours: '🕐 Öffnungszeiten', address: '📍 Adresse', phone: '📞 Telefon', halal: '☪️ Halal', allergen: 'ⓘ Allergene', order: '🥙 Bestellung', delivery: '🚫 Lieferung', payment: '💳 Zahlung', steak: '🥩 Steak', recommend: '🎲 Empfehlung', menu: '📋 Speisekarte', item: '🍽️ Artikel-Suche', fallback: '🤔 Nicht verstanden' };
                  const intentOrder = Object.entries(byIntent).sort((a, b) => b[1] - a[1]);
                  const unrecognized = assistantEvents
                    .filter((v) => v.value.event === 'assistant_fallback' && v.value.q)
                    .sort((a, b) => b.value.ts - a.value.ts)
                    .slice(0, 25);
                  if (intentOrder.length === 0) return null;
                  return (
                    <>
                      <div className="bg-white rounded-xl p-4 mt-3">
                        <div className="text-[11px] font-black tracking-widest mb-2" style={{ color: '#a4906c' }}>🤖 ASSISTENT — MEISTGEFRAGT</div>
                        {intentOrder.map(([k, c]) => (
                          <button key={k} onClick={() => openStatsModal(intentLabels[k] || k, assistantEvents.filter((v) => v.value.event === `assistant_${k}`), (v) => v.value.q || null)} className="w-full flex items-center justify-between py-1 text-sm font-semibold" style={{ color: GREEN }}><span>{intentLabels[k] || k}</span><span>{c}</span></button>
                        ))}
                      </div>
                      {unrecognized.length > 0 && (
                        <div className="bg-white rounded-xl p-4 mt-3">
                          <div className="text-[11px] font-black tracking-widest mb-2" style={{ color: '#a4906c' }}>🤔 NICHT VERSTANDENE FRAGEN</div>
                          <div className="flex flex-col gap-1.5">
                            {unrecognized.map((v) => (
                              <div key={v.key} className="rounded-lg px-3 py-2" style={{ background: '#f7f0e2' }}>
                                <div className="text-sm font-semibold" style={{ color: GREEN }}>"{v.value.q}"</div>
                                <div className="text-[10px] font-medium mt-0.5" style={{ color: '#a4906c' }}>{new Date(v.value.ts).toLocaleString('de-DE')}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
                <p className="text-[10px] text-center mt-4" style={{ color: '#a4906c' }}>{t('analyticsNote')}</p>
              </div>
            );
          })()}
          <StatsDetailModal data={statsModal} onClose={() => setStatsModal(null)} />
          {tab === 'menu' && (
            <div className="px-5">
              <button
                onClick={() => setTischAdminOpen(true)}
                className="w-full flex items-center gap-3.5 px-5 py-4 rounded-2xl text-left mb-5"
                style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, boxShadow: '0 8px 20px rgba(230,90,10,.3)' }}
              >
                <span className="text-2xl">🍽️</span>
                <div className="min-w-0">
                  <div className="font-black text-sm text-white truncate">Speisekarte bearbeiten →</div>
                  <div className="text-[11px] text-white/80 truncate">Preise, Namen, Fotos, neue Produkte, löschen</div>
                </div>
              </button>
              <div className="text-[10px] font-black tracking-widest mb-2" style={{ color: '#a4906c' }}>📋 {t('staffMenuTab').toUpperCase()}</div>
              <div className="bg-white rounded-2xl p-4 mb-5" style={{ boxShadow: '0 3px 10px rgba(21,56,38,.06)' }}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm" style={{ background: '#fdecd4' }}>🥦</div>
                  <div className="font-black text-sm" style={{ color: GREEN }}>{t('extrasSoldOutTitle')}</div>
                </div>
                <button onClick={toggleChickenSoldOut} className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl mb-2.5" style={{ background: chickenSoldOut ? CHILI : '#f7f0e2' }}>
                  <span className="text-lg flex-shrink-0">🍗</span>
                  <span className="flex-1 min-w-0 text-left font-bold text-sm" style={{ color: chickenSoldOut ? '#fff' : GREEN }}>{t('chickenSoldOutLabel')}</span>
                  <span className="text-[10px] font-black px-2 py-1 rounded-full flex-shrink-0" style={chickenSoldOut ? { background: '#fff', color: CHILI } : { background: '#fff', color: '#7c6d55' }}>{chickenSoldOut ? t('markSoldOutOn') : t('markSoldOutOff')}</span>
                </button>
                <p className="text-[11px] mb-3 leading-relaxed" style={{ color: '#a4906c' }}>{t('extrasSoldOutHint')}</p>
                <div className="relative mb-2">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" color="#c4b697" />
                  <input value={extraSearch} onChange={(e) => setExtraSearch(e.target.value)} placeholder={t('extraSearchPh')} className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-sm font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                </div>
                {extraSearchResults.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    {extraSearchResults.map((name) => {
                      const isOut = soldOutExtras.includes(name);
                      return (
                        <button key={name} onClick={() => toggleSoldOutExtra(name)} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl" style={isOut ? { background: CHILI } : { background: '#f7f0e2' }}>
                          <span className="font-bold text-sm" style={{ color: isOut ? '#fff' : GREEN }}>{mx(name, lang)}</span>
                          <span className="text-[10px] font-black px-2 py-1 rounded-full" style={isOut ? { background: '#fff', color: CHILI } : { background: '#fff', color: '#7c6d55' }}>{isOut ? t('markSoldOutOn') : t('markSoldOutOff')}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                {soldOutExtras.length > 0 && !extraSearch && (
                  <div className="flex items-center gap-1.5 mt-2 px-0.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: GOLD, color: GREEN }}>{soldOutExtras.length}</span>
                    <span className="text-[11px] font-bold" style={{ color: '#8a5a1f' }}>{t('editedPricesCount')}</span>
                  </div>
                )}
              </div>
              <div className="relative mb-3">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" color="#c4b697" />
                <input value={menuSearch} onChange={(e) => { setMenuSearch(e.target.value); setEditingItem(null); }} placeholder={t('menuSearchPh')} className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-bold outline-none" style={{ background: '#fff', color: GREEN, boxShadow: '0 2px 8px rgba(21,56,38,.06)' }} />
              </div>
              {!editingItem && menuSearchResults.map((item) => (
                <button key={item.id} onClick={() => selectMenuItem(item)} className="w-full text-left rounded-2xl p-3.5 mb-2.5 flex items-center justify-between" style={{ background: '#fff', border: '1px solid #f0e5cf', boxShadow: '0 3px 10px rgba(21,56,38,.06)' }}>
                  <span className="font-bold text-sm" style={{ color: GREEN }}>{menuNum(item.id) && <span style={{ color: ORANGE }}>{menuNum(item.id)} · </span>}{item.name}{priceOverrides[item.id] && <span className="ml-2 text-[10px] font-black px-1.5 py-0.5 rounded-full" style={{ background: GOLD, color: GREEN }}>{t('editedBadge')}</span>}</span>
                  <span className="text-xs font-semibold" style={{ color: CHILI }}>{item.priceLarge !== undefined ? `${fmt(item.priceSmall)} / ${fmt(item.priceLarge)}` : fmt(item.price)}</span>
                </button>
              ))}
              {editingItem && (
                <div className="bg-white rounded-xl p-5">
                  <div className="font-black text-base mb-4" style={{ color: GREEN }}>{editingItem.name}</div>
                  {editingItem.priceLarge !== undefined ? (
                    <div className="flex gap-2 mb-4">
                      <div className="flex-1">
                        <div className="text-[11px] font-bold mb-1" style={{ color: '#a4906c' }}>{t('sizeSmall')}</div>
                        <input value={editSmall} onChange={(e) => setEditSmall(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-sm font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] font-bold mb-1" style={{ color: '#a4906c' }}>{t('sizeLarge')}</div>
                        <input value={editLarge} onChange={(e) => setEditLarge(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-sm font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                      </div>
                    </div>
                  ) : (
                    <input value={editSmall} onChange={(e) => setEditSmall(e.target.value)} className="w-full px-3 py-2.5 rounded-lg text-sm font-bold outline-none mb-4" style={{ background: '#f7f0e2', color: GREEN }} />
                  )}
                  <div className="flex gap-2 mb-3">
                    <button onClick={toggleSoldOut} className="flex-1 py-2.5 rounded-lg font-bold text-sm" style={soldOutIds.includes(editingItem.id) ? { background: CHILI, color: '#fff' } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>
                      {soldOutIds.includes(editingItem.id) ? `✓ ${t('markSoldOutOn')}` : t('markSoldOutOff')}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveMenuPrice} className="flex-1 py-2.5 rounded-lg font-bold text-sm text-white" style={{ background: GREEN }}>{t('saveBtn')}</button>
                    {priceOverrides[editingItem.id] && <button onClick={resetMenuPrice} className="px-4 py-2.5 rounded-lg font-bold text-sm" style={{ background: '#f7e2e2', color: CHILI }}>{t('resetBtn')}</button>}
                    <button onClick={() => setEditingItem(null)} className="px-4 py-2.5 rounded-lg font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('cancelBtn')}</button>
                  </div>
                  {menuSaveMsg && <p className="text-center text-xs font-bold mt-3" style={{ color: '#8a5a1f' }}>{menuSaveMsg}</p>}
                </div>
              )}
              {Object.keys(priceOverrides).length > 0 && !editingItem && !menuSearch && (
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: GOLD, color: GREEN }}>{Object.keys(priceOverrides).length}</span>
                  <span className="text-[11px] font-bold" style={{ color: '#a4906c' }}>{t('editedPricesCount')}</span>
                </div>
              )}
            </div>
          )}
          {tab === 'messages' && (
            <div className="px-5">
              <div className="text-[10px] font-black tracking-widest mb-2" style={{ color: '#a4906c' }}>💬 NACHRICHTEN</div>
              {contactMessages.length === 0 && (
                <div className="text-center py-14 rounded-2xl" style={{ background: '#fff', border: '1.5px dashed #e3d5bd' }}>
                  <div className="text-5xl mb-3 opacity-70">📭</div>
                  <p className="text-sm font-semibold" style={{ color: '#8a7c62' }}>Noch keine Nachrichten</p>
                </div>
              )}
              <div className="flex flex-col gap-2.5">
                {contactMessages.map((m) => (
                  <div key={m.key} className="bg-white rounded-2xl p-4" style={{ border: '1.5px solid #f0e5cf' }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-black text-sm" style={{ color: GREEN }}>{m.value.name}</span>
                      <span className="text-[10px] font-medium" style={{ color: '#a4906c' }}>{new Date(m.value.ts).toLocaleString('de-DE')}</span>
                    </div>
                    {m.value.email && <div className="text-xs font-bold mb-1.5" style={{ color: ORANGE }}>✉️ {m.value.email}</div>}
                    <p className="text-sm font-medium" style={{ color: GREEN }}>{m.value.messageDe || m.value.message}</p>
                    {m.value.lang && m.value.lang !== 'de' && m.value.message !== m.value.messageDe && (
                      <p className="text-xs font-medium mt-1.5 italic" style={{ color: '#a4906c' }}>Original ({m.value.lang.toUpperCase()}): {m.value.message}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'photos' && (
            <div className="px-5">
              <div className="text-[10px] font-black tracking-widest mb-2" style={{ color: '#a4906c' }}>📷 {t('staffPhotosTab').toUpperCase()}</div>
              <p className="text-[11px] mb-3" style={{ color: '#a4906c' }}>{t('photoUrlHint')}</p>
              <input value={photoSearch} onChange={(e) => { setPhotoSearch(e.target.value); setEditingPhotoItem(null); }} placeholder={t('menuSearchPh')} className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
              {!editingPhotoItem && photoSearchResults.map((item) => (
                <button key={item.id} onClick={() => selectPhotoItem(item)} className="w-full text-left bg-white rounded-xl p-3.5 mb-2 flex items-center justify-between shadow-sm">
                  <span className="font-bold text-sm" style={{ color: GREEN }}>{menuNum(item.id) && <span style={{ color: ORANGE }}>{menuNum(item.id)} · </span>}{item.name}{photoOverrides[item.id] && <span className="ml-2 text-[10px] font-black px-1.5 py-0.5 rounded-full" style={{ background: GOLD, color: GREEN }}>{t('editedBadge')}</span>}</span>
                </button>
              ))}
              {editingPhotoItem && (
                <div className="bg-white rounded-xl p-5">
                  <div className="font-black text-base mb-3" style={{ color: GREEN }}>{editingPhotoItem.name}</div>
                  {editPhotoUrl && <img src={editPhotoUrl} alt="" className="w-full h-36 object-cover rounded-lg mb-3" onError={(e) => { e.target.style.display = 'none'; }} />}
                  <label className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm text-white mb-3 cursor-pointer" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', opacity: photoUploadBusy ? 0.6 : 1 }}>
                    <span className="text-base">📷</span> {photoUploadBusy ? '…' : t('uploadPhotoBtn')}
                    <input type="file" accept="image/*" className="hidden" disabled={photoUploadBusy} onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoFileUpload(f); e.target.value = ''; }} />
                  </label>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-px" style={{ background: '#e3d5bd' }} />
                    <span className="text-[10px] font-bold" style={{ color: '#a4906c' }}>{t('orLabel')}</span>
                    <div className="flex-1 h-px" style={{ background: '#e3d5bd' }} />
                  </div>
                  <input value={editPhotoUrl} onChange={(e) => setEditPhotoUrl(e.target.value)} placeholder="https://..." className="w-full px-3 py-2.5 rounded-lg text-sm font-medium outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-px" style={{ background: '#e3d5bd' }} />
                    <span className="text-[10px] font-bold" style={{ color: '#a4906c' }}>{t('orLabel')}</span>
                    <div className="flex-1 h-px" style={{ background: '#e3d5bd' }} />
                  </div>
                  <div className="text-[11px] font-bold mb-2" style={{ color: '#a4906c' }}>📁 Aus der Galerie wählen</div>
                  <div className="flex gap-2 overflow-x-auto mb-4 pb-1">
                    {[...SITE_PHOTOS.map((p) => p.src), ...extraGalleryPhotos].map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setEditPhotoUrl(src)}
                        className="flex-shrink-0 rounded-lg overflow-hidden"
                        style={{ width: 56, height: 56, border: editPhotoUrl === src ? `2.5px solid ${ORANGE}` : '2.5px solid transparent' }}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                  {editPhotoUrl.trim() && (
                    <button onClick={applyPhotoToCategory} className="w-full mb-4 text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2" style={{ background: '#fdecd4', color: '#8a5a1f', border: '1px solid #f0d4a8' }}>
                      <span className="text-sm">🔁</span> {t('applyToCategoryBtn')}
                    </button>
                  )}
                  <div className="flex gap-2">
                    <button onClick={savePhoto} className="flex-1 py-2.5 rounded-lg font-bold text-sm text-white" style={{ background: GREEN }}>{t('saveBtn')}</button>
                    {photoOverrides[editingPhotoItem.id] && <button onClick={resetPhoto} className="px-4 py-2.5 rounded-lg font-bold text-sm flex items-center gap-1.5" style={{ background: '#f7e2e2', color: CHILI }}>🗑️ {t('resetBtn')}</button>}
                    <button onClick={() => setEditingPhotoItem(null)} className="px-4 py-2.5 rounded-lg font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('cancelBtn')}</button>
                  </div>
                  {photoSaveMsg && <div className="text-center text-sm font-bold mt-3 py-2 rounded-lg" style={{ background: '#e8f5ec', color: '#1d6b3a' }}>{photoSaveMsg}</div>}
                </div>
              )}
              <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,246,234,.12)' }}>
                <div className="flex items-center gap-2 mb-1.5"><span className="text-lg">👁️</span><h3 className="font-black text-sm" style={{ color: CREAM }}>Foto-Galerie verwalten ({SITE_PHOTOS.length - hiddenPhotos.filter((s) => SITE_PHOTOS.some((p) => p.src === s)).length + extraGalleryPhotos.length}/{SITE_PHOTOS.length + extraGalleryPhotos.length})</h3></div>
                <p className="text-[11px] mb-3" style={{ color: '#d9cdb4' }}>Feste Fotos kannst du nicht löschen, nur ausblenden. Eigene hochgeladene Fotos (mit ✕) kannst du direkt löschen.</p>
                <label className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm text-white mb-4 cursor-pointer" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', opacity: galleryUploadBusy ? 0.6 : 1 }}>
                  <span className="text-base">📷</span> {galleryUploadBusy ? '…' : t('uploadGalleryPhotoBtn')}
                  <input type="file" accept="image/*" className="hidden" disabled={galleryUploadBusy} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleGalleryFileUpload(f); e.target.value = ''; }} />
                </label>
                {galleryPreview && (
                  <div className="bg-white rounded-xl p-3 mb-4">
                    <img src={galleryPreview} alt="" className="w-full h-40 object-cover rounded-lg mb-3" />
                    <div className="flex gap-2">
                      <button onClick={saveGalleryPhoto} className="flex-1 py-2.5 rounded-lg font-bold text-sm text-white" style={{ background: GREEN }}>{t('saveBtn')}</button>
                      <button onClick={() => setGalleryPreview('')} className="px-4 py-2.5 rounded-lg font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('cancelBtn')}</button>
                    </div>
                    {galleryMsg && <div className="text-center text-sm font-bold mt-3 py-2 rounded-lg" style={{ background: '#e8f5ec', color: '#1d6b3a' }}>{galleryMsg}</div>}
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2">
                  {extraGalleryPhotos.map((src, idx) => (
                    <div key={'custom-' + idx} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '1' }}>
                      <img src={src} className="w-full h-full object-cover" />
                      <button onClick={() => removeGalleryPhoto(idx)} className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(21,56,38,.75)' }}><X size={13} color="#fff" /></button>
                      <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1 text-[9px] font-bold text-white truncate" style={{ background: 'rgba(0,0,0,.6)' }}>Eigenes Foto</div>
                    </div>
                  ))}
                  {SITE_PHOTOS.map((p) => {
                    const hidden = hiddenPhotos.includes(p.src);
                    return (
                      <button key={p.src} onClick={() => togglePhotoHidden(p.src)} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '1', opacity: hidden ? 0.35 : 1 }}>
                        <img src={p.src} className="w-full h-full object-cover" />
                        <div className="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: hidden ? 'rgba(0,0,0,.7)' : 'rgba(52,199,89,.9)' }}>
                          {hidden ? '🚫' : '👁️'}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1 text-[9px] font-bold text-white truncate" style={{ background: 'rgba(0,0,0,.6)' }}>{p.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="fixed bottom-0 left-0 right-0 z-40 max-w-5xl mx-auto" style={{ background: '#faf3e4', borderTop: '1px solid #f0e5cf', boxShadow: '0 -8px 24px rgba(0,0,0,.18)' }}>
            <div className="relative" style={{ height: 66 }}>
              {(() => {
                const staffTabs = [
                  { key: 'messages', icon: '💬', label: 'Nachrichten' },
                  { key: 'photos', icon: '📷', label: t('staffPhotosTab') },
                  { key: 'menu', icon: '📋', label: t('staffMenuTab') },
                  { key: 'settings', icon: '⚙️', label: t('staffSettingsTab') },
                  { key: 'analytics', icon: '📊', label: t('staffAnalyticsTab') },
                ];
                const activeIdx = Math.max(0, staffTabs.findIndex((it) => it.key === tab));
                return (
                  <>
                    <div className="flex items-center h-full">
                      {staffTabs.map((item, i) => (
                        <button key={item.key} onClick={() => { setTab(item.key); setLookupOpen(false); }} className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full">
                          <span className="text-lg" style={{ opacity: i === activeIdx ? 0 : 0.5, transition: 'opacity .2s' }}>{item.icon}</span>
                          <span className="font-bold text-center leading-[1.1]" style={{ fontSize: 8.5, color: i === activeIdx ? ORANGE : '#a4906c', opacity: i === activeIdx ? 0 : 1, transition: 'opacity .2s' }}>{item.label}</span>
                        </button>
                      ))}
                    </div>
                    <div
                      className="rounded-full flex items-center justify-center pointer-events-none"
                      style={{
                        width: 58, height: 58,
                        position: 'absolute', top: -26,
                        left: `${(activeIdx + 0.5) * (100 / staffTabs.length)}%`,
                        transform: 'translateX(-50%)',
                        background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`,
                        boxShadow: '0 8px 20px rgba(230,90,10,.5)',
                        border: '5px solid #faf3e4',
                        transition: 'left .32s cubic-bezier(.34,1.3,.64,1)',
                      }}
                    >
                      <span className="text-2xl">{staffTabs[activeIdx].icon}</span>
                    </div>
                    <div
                      className="absolute pointer-events-none font-bold text-center"
                      style={{
                        bottom: 6,
                        left: `${(activeIdx + 0.5) * (100 / staffTabs.length)}%`,
                        transform: 'translateX(-50%)',
                        fontSize: 8.5,
                        color: ORANGE,
                        transition: 'left .32s cubic-bezier(.34,1.3,.64,1)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {staffTabs[activeIdx].label}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ LOYALTY (Treuekarte) ============ */
/* ============ APP ============ */
const TISCH_CAT_COLORS = ['#e65a0a', '#153826', '#c9962e', '#8a3b2f', '#2f6b4f', '#a44f9e'];
function tischCatColor(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return TISCH_CAT_COLORS[h % TISCH_CAT_COLORS.length];
}

function pizzaToppingPrice(label) {
  const l = label.toLowerCase();
  if (l.includes('steak')) return 4.5;
  const meatKeywords = ['krabben', 'meeresfrüchte', 'salami', 'schinken', 'drehspieß', 'thunfisch', 'sucuk', 'wurst'];
  if (meatKeywords.some((k) => l.includes(k))) return 3.5;
  return 2.5;
}
function PizzaToppingCard({ item, color, resolvedImg, lang }) {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const toggleTopping = (top) => setSelectedToppings((prev) => prev.includes(top) ? prev.filter((t) => t !== top) : [...prev, top]);
  const toppingsTotal = selectedToppings.reduce((s, top) => s + pizzaToppingPrice(top), 0);
  const totalPrice = item.price + toppingsTotal;

  return (
    <div className="tm-card bg-white rounded-3xl p-4" style={{ boxShadow: '0 4px 18px rgba(21,56,38,.08)' }}>
      <div className="flex items-center flex-wrap gap-1.5 mb-3">
        {item.number && <span className="inline-flex items-center justify-center min-w-[22px] px-1.5 py-0.5 rounded-md text-[11px] font-black" style={{ background: `${color}18`, color }}>{item.number}</span>}
        <span className="font-black text-[15px]" style={{ color: GREEN }}>{mx(tischText(item.name, 'de'), lang)}</span>
        <AllergenTag alg={item.alg} />
      </div>

      <div className="mx-auto mb-3 rounded-full overflow-hidden" style={{ width: '100%', maxWidth: 220, aspectRatio: '1/1', boxShadow: '0 12px 28px rgba(21,56,38,.28)', border: `4px solid ${GOLD}` }}>
        {resolvedImg ? <img src={resolvedImg} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full" style={{ background: 'radial-gradient(circle, #f3c96b 0%, #e6a13a 55%, #c97f1f 100%)' }} />}
      </div>

      {item.desc && <p className="text-xs text-center mb-3" style={{ color: '#8a7c62' }}>{mx(tischText(item.desc, 'de'), lang)}</p>}

      <div className="flex justify-center mb-4">
        <span className="text-lg font-black px-4 py-1.5 rounded-full" style={{ background: GOLD, color: GREEN, boxShadow: '0 2px 6px rgba(255,199,56,.4)' }}>{fmt(totalPrice)}</span>
      </div>

      {item.toppingChoices && item.toppingChoices.length > 0 && (
        <div>
          <div className="text-[10px] font-black mb-2 tracking-wide" style={{ color: '#a4906c' }}>ZUTATEN AUSWÄHLEN</div>
          <div className="flex flex-wrap gap-1.5">
            {item.toppingChoices.map((top) => {
              const isActive = selectedToppings.includes(top);
              return (
                <button key={top} onClick={() => toggleTopping(top)} className="flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-full" style={isActive ? { background: color, color: '#fff', boxShadow: `0 3px 8px ${color}55` } : { background: '#f7f0e2', color: '#8a7c62', border: '1px solid #ede0c4' }}>
                  {top}
                  <span className="font-black" style={{ opacity: isActive ? 0.9 : 0.65 }}>+{fmt(pizzaToppingPrice(top))}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function TischMenuView({ back, initialAction, onConsumeAction }) {
  const { lang, setLang, t, go } = React.useContext(LangContext);
  const [globalNavOpen, setGlobalNavOpen] = useState(false);
  const [tischMenu, setTischMenu] = useState(null); // null = loading
  const [activeCat, setActiveCat] = useState(null);
  const [legendOpen, setLegendOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [tmLightbox, setTmLightbox] = useState(null);
  const [photoOverrides, setPhotoOverrides] = useState({});
  useEffect(() => { safeGet('siteconfig:photoOverrides').then((r) => { if (r) setPhotoOverrides(r); }); }, []);
  const [tischPhotos, setTischPhotos] = useState({});

  useEffect(() => {
    safeGet('siteconfig:tischMenu').then((r) => {
      const data = r || { categories: [], items: [] };
      setTischMenu(data);
      const hint = initialAction?.initialCatHint;
      if (hint) {
        const match = data.categories.find((c) => c.key === 'imp-' + hint) || data.categories.find((c) => c.key.endsWith(hint));
        if (match) { setActiveCat(match.key); if (onConsumeAction) onConsumeAction(); return; }
      }
      // Kein Hint: keine Kategorie vorauswählen — der Bildschirm startet neutral, die Person wählt selbst.
    });
  }, []);

  const activeItems = useMemo(() => {
    if (!tischMenu || !activeCat) return [];
    return tischMenu.items.filter((i) => i.category === activeCat);
  }, [tischMenu, activeCat]);

  const searchResults = useMemo(() => {
    if (!tischMenu || !search.trim()) return null;
    const q = search.trim().toLowerCase();
    return tischMenu.items.filter((i) => (i.number && i.number === search.trim()) || mx(tischText(i.name, 'de'), lang).toLowerCase().includes(q) || tischText(i.name, 'de').toLowerCase().includes(q));
  }, [tischMenu, search, lang]);

  const displayedItems = searchResults !== null ? searchResults : activeItems;

  useEffect(() => {
    safeListPrefix('tischphoto:', 500).then((rows) => {
      const map = {};
      rows.forEach((r) => { if (r.value?.url) map[r.key.replace(/^tischphoto:/, '')] = r.value.url; });
      setTischPhotos(map);
    });
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden" style={{ background: '#eaf3ec', fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <div className="relative" style={{ zIndex: 1 }}>
      <style>{`
        @keyframes tmFadeUp { from{ opacity:0; transform:translateY(14px); } to{ opacity:1; transform:translateY(0); } }
        @keyframes tmGlow { 0%,100%{ box-shadow:0 0 0 0 rgba(255,199,56,.5);} 50%{ box-shadow:0 0 0 12px rgba(255,199,56,0);} }
        @keyframes tmFlicker { 0%,100%{ transform:scale(1) rotate(-2deg);} 50%{ transform:scale(1.08) rotate(2deg);} }
        @keyframes tmShimmer { 0%{ background-position:-300px 0;} 100%{ background-position:300px 0;} }
        @keyframes tmBellRing { 0%,100%{ transform:rotate(0deg);} 20%{ transform:rotate(-12deg);} 40%{ transform:rotate(10deg);} 60%{ transform:rotate(-6deg);} 80%{ transform:rotate(4deg);} }
        @keyframes modalCardUp { from{ opacity:0; transform:translateY(40px) scale(.97);} to{ opacity:1; transform:translateY(0) scale(1);} }
        .tm-card { animation: tmFadeUp .45s ease both; transition: transform .15s ease, box-shadow .15s ease; }
        .tm-card:active { transform: scale(.98); }
        .tm-tab { transition: all .2s ease; }
      `}</style>

      {/* Header */}
      <div className="relative px-5 pt-7 pb-4" style={{ background: `linear-gradient(135deg, ${GREEN}, #0e2a1c)` }}>
        <div className="absolute -top-8 -right-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,199,56,.18), transparent 70%)' }} />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(230,90,10,.18), transparent 70%)' }} />
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {back && (
              <button onClick={back} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,246,234,0.12)' }}>
                <ArrowLeft size={17} color="#fff" />
              </button>
            )}
            <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, boxShadow: '0 4px 14px rgba(230,90,10,.5)' }}>
              <img src={LOGO_ICON} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-extrabold text-base leading-tight tracking-wide text-white">BODRUM KEBAP</div>
              <div className="text-[10px] font-bold tracking-[0.25em]" style={{ color: GOLD }}>{t('tischMenuKicker')}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher lang={lang} setLang={setLang} dark />
            <div className="relative">
              <button onClick={() => setGlobalNavOpen((v) => !v)} className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, boxShadow: '0 4px 14px rgba(230,90,10,.45)' }}>
                {globalNavOpen ? <X size={19} color="#fff" /> : <MenuIcon size={19} color="#fff" />}
              </button>
              {globalNavOpen && (
                <>
                  <div className="fixed inset-0" style={{ zIndex: 199 }} onClick={() => setGlobalNavOpen(false)} />
                  <div className="absolute top-11 right-0 w-56 rounded-2xl py-2" style={{ background: GREEN, boxShadow: '0 12px 30px rgba(21,56,38,.4)', zIndex: 200, animation: 'modalCardUp .25s cubic-bezier(.25,.46,.45,.94)' }}>
                    <button onClick={() => { setGlobalNavOpen(false); go('home'); }} className="w-full text-left px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('backToHomeBtn')}</button>
                    <button onClick={() => { setGlobalNavOpen(false); go('staff'); }} className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2" style={{ color: '#d9cdb4' }}><Lock size={14} /> {t('navStaffArea')}</button>
                    <a href="https://instagram.com/BodrumKebapVechta" target="_blank" rel="noopener noreferrer" onClick={() => setGlobalNavOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}><Instagram size={15} /> Instagram</a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search by number or name */}
      <div className="px-5 py-3">
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('quickSearchPh')}
            className="w-full px-4 py-3.5 rounded-2xl text-sm font-bold outline-none"
            style={{ background: '#fff', color: GREEN, border: `1.5px solid #e9dcc0`, boxShadow: '0 4px 14px rgba(21,56,38,.08)' }}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#f0e5cf' }}>
              <X size={13} color={GREEN} />
            </button>
          )}
        </div>
      </div>

      {/* Order-at-counter notice — only relevant for the QR table screen, not in-app browsing */}
      {!back && (
        <div className="px-5 py-3.5 text-center flex items-center justify-center gap-2" style={{ background: `linear-gradient(90deg, ${GOLD}, #ffdf8a, ${GOLD})`, animation: 'tmGlow 2.6s ease-in-out infinite' }}>
          <span style={{ display: 'inline-block', animation: 'tmBellRing 2.2s ease-in-out infinite' }}>🛎️</span>
          <span className="font-black text-sm" style={{ color: GREEN }}>{t('tischMenuOrderNotice').replace('🛎️ ', '')}</span>
        </div>
      )}

      {tischMenu === null && (
        <div className="px-5 py-20 text-center text-sm font-semibold" style={{ color: '#a4906c' }}>…</div>
      )}

      {tischMenu && tischMenu.categories.length === 0 && (
        <div className="px-5 py-20 text-center" style={{ animation: 'tmFadeUp .5s ease both' }}>
          <div className="text-5xl mb-3">🍽️</div>
          <p className="text-sm font-semibold" style={{ color: '#a4906c' }}>Menü noch nicht eingerichtet.</p>
        </div>
      )}

      {tischMenu && tischMenu.categories.length > 0 && (
        <>
          {/* Category tabs */}
          <div className="relative sticky top-0 z-10" style={{ background: 'rgba(253,246,232,.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e9dcc0' }}>
            <div className="flex gap-2.5 px-4 py-3.5 overflow-x-auto" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
              {tischMenu.categories.map((cat) => {
                const active = activeCat === cat.key;
                const color = tischCatColor(cat.key);
                return (
                  <button
                    key={cat.key}
                    onClick={() => { setActiveCat(cat.key); setSearch(''); logEvent('category', { cat: cat.key }); incrementCategoryClick(cat.key); }}
                    className="tm-tab flex-shrink-0 flex flex-col items-center justify-center gap-1 rounded-2xl"
                    style={{
                      width: 72, height: 72,
                      background: active ? `linear-gradient(160deg, ${color}22, ${GREEN}14)` : '#fff',
                      border: active ? `2px solid ${GOLD}` : '1.5px solid #e9dcc0',
                      boxShadow: active ? `0 0 0 4px ${GOLD}22, 0 8px 18px rgba(21,56,38,.14)` : '0 2px 6px rgba(21,56,38,.05)',
                      transition: 'all .2s ease',
                    }}
                  >
                    <span className="text-2xl leading-none">{cat.emoji || '🍽️'}</span>
                    <span className="font-bold text-[10px] leading-tight text-center px-1" style={{ color: active ? GREEN : '#8a7c62' }}>{tischCatLabel(cat, lang)}</span>
                  </button>
                );
              })}
            </div>
            <div className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(253,246,232,.95))' }} />
          </div>

          <div className="px-5 pt-3">
            <button onClick={() => setLegendOpen(true)} className="text-[11px] font-bold underline" style={{ color: '#a4906c' }}>ⓘ {t('allergenLegendTitle')}</button>
          </div>

          {/* Item list */}
          <div className="relative px-4 py-5 space-y-3.5">
            <div className="absolute top-10 -left-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(230,90,10,.10), transparent 70%)', filter: 'blur(2px)' }} />
            <div className="absolute top-1/2 -right-14 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(21,56,38,.08), transparent 70%)', filter: 'blur(2px)' }} />
            <div className="absolute bottom-10 left-1/3 w-36 h-36 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,199,56,.14), transparent 70%)', filter: 'blur(2px)' }} />
            {displayedItems.length === 0 && (
              <div className="text-center py-14">
                {search.trim() ? (
                  <p className="text-xs font-semibold" style={{ color: '#a4906c' }}>{t('quickSearchNoResults')}</p>
                ) : !activeCat ? (
                  <>
                    <div className="text-4xl mb-3">👆</div>
                    <p className="text-sm font-bold" style={{ color: GREEN }}>Wähle oben eine Kategorie</p>
                  </>
                ) : (
                  <p className="text-xs font-semibold" style={{ color: '#a4906c' }}>—</p>
                )}
              </div>
            )}
            {displayedItems.map((item, idx) => {
              const color = tischCatColor(item.category);
              const originalId = item.id.replace(/^imp-/, '');
              const resolvedImg = tischPhotos[originalId] || tischPhotos[item.id] || item.img || photoOverrides[originalId] || '';
              if (item.toppingChoices && item.toppingChoices.length > 0) {
                return <PizzaToppingCard key={item.id} item={item} color={color} resolvedImg={resolvedImg} lang={lang} />;
              }
              return (
                <div
                  key={item.id}
                  className="tm-card bg-white rounded-2xl p-3.5 flex items-center gap-3.5"
                  style={{ opacity: item.soldOut ? 0.55 : 1, boxShadow: '0 4px 16px rgba(21,56,38,.08)', animationDelay: `${Math.min(idx, 8) * 0.05}s` }}
                >
                  {resolvedImg ? (
                    <img src={resolvedImg} alt="" loading="lazy" onClick={() => setTmLightbox(resolvedImg)} className="w-[68px] h-[68px] rounded-xl object-cover flex-shrink-0 cursor-pointer" />
                  ) : (
                    <div className="w-[68px] h-[68px] rounded-xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}>
                      🍽️
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-[15px] flex items-center flex-wrap gap-1.5 leading-snug" style={{ color: GREEN }}>
                      {item.number && <span className="inline-flex items-center justify-center min-w-[22px] px-1.5 py-0.5 rounded-md text-[11px] font-black" style={{ background: `${color}18`, color }}>{item.number}</span>}
                      {mx(tischText(item.name, 'de'), lang)}
                      <AllergenTag alg={item.alg} />
                      {item.soldOut && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: '#8a7c62', color: '#fff' }}>{t('soldOutBadge')}</span>}
                    </div>
                    {item.desc && <div className="text-xs mt-0.5 leading-snug" style={{ color: '#8a7c62' }}>{mx(tischText(item.desc, 'de'), lang)}</div>}
                    {item.extras && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {item.extras.map((ex) => (
                          <span key={ex.label} className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${color}14`, color }}>+ {ex.label} {fmt(ex.price)}</span>
                        ))}
                      </div>
                    )}
                    {item.toppingChoices && (
                      <div className="mt-2">
                        <div className="text-[9px] font-bold mb-1" style={{ color: '#a4906c' }}>Weitere Beläge:</div>
                        <div className="flex flex-wrap gap-1">
                          {item.toppingChoices.map((top) => (
                            <span key={top} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#f7f0e2', color: '#8a7c62', border: '1px solid #ede0c4' }}>{top}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-right flex flex-col items-end gap-1">
                    {item.extras && <span className="text-[9px] font-bold" style={{ color: '#a4906c' }}>Grundbelag</span>}
                    {item.priceLarge !== undefined ? (
                      <div className="flex flex-col gap-0.5 items-end">
                        <span className="text-xs font-black px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: GOLD, color: GREEN, boxShadow: '0 2px 6px rgba(255,199,56,.4)' }}><span className="opacity-70 font-bold text-[10px]">22cm</span>{fmt(item.price)}</span>
                        <span className="text-xs font-black px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: GOLD, color: GREEN, boxShadow: '0 2px 6px rgba(255,199,56,.4)' }}><span className="opacity-70 font-bold text-[10px]">28cm</span>{fmt(item.priceLarge)}</span>
                      </div>
                    ) : (
                      <span className="text-sm font-black px-2.5 py-1 rounded-full" style={{ background: GOLD, color: GREEN, boxShadow: '0 2px 6px rgba(255,199,56,.4)' }}>{fmt(item.price)}</span>
                    )}
                    <button onClick={() => speakText(item.priceLarge !== undefined ? `${mx(tischText(item.name, 'de'), lang)}. 22 cm: ${fmt(item.price)}. 28 cm: ${fmt(item.priceLarge)}` : `${mx(tischText(item.name, 'de'), lang)}. ${fmt(item.price)}`, lang)} className="text-sm opacity-50" title="Vorlesen">🔊</button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Footer contact info */}
      <div className="relative px-5 py-8 text-center mt-2" style={{ background: `linear-gradient(135deg, ${GREEN}, #0e2a1c)` }}>
        <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,199,56,.15), transparent 70%)' }} />
        <div className="relative flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5 text-white font-bold text-sm"><MapPin size={14} color={GOLD} /> Oyther Straße 37, 49377 Vechta</div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: '#d9cdb4' }}><Phone size={12} color={GOLD} /> 04441 / 95 16 104</div>
        </div>
      </div>
      {legendOpen && <AllergenLegendModal onClose={() => setLegendOpen(false)} />}
      {tmLightbox && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,.85)' }} onClick={() => setTmLightbox(null)}>
          <img src={tmLightbox} alt="" className="max-w-full max-h-full rounded-2xl" style={{ animation: 'modalCardUp .3s ease' }} />
          <button onClick={() => setTmLightbox(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,.15)' }}><X size={20} color="#fff" /></button>
        </div>
      )}
      </div>
    </div>
  );
}
function NotificationOptInBanner() {
  const { t } = React.useContext(LangContext);
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const isIOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  const isStandalone = typeof window !== 'undefined' && (window.navigator.standalone || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches));
  const needsHomeScreenFirst = isIOS && !isStandalone;
  useEffect(() => {
    const check = () => {
      try {
        if (localStorage.getItem('bk_notif_dismissed')) return false;
        if (!localStorage.getItem('cookieConsent')) return false;
        if (needsHomeScreenFirst) { setVisible(true); return true; }
        if (typeof Notification === 'undefined') return false;
        if (Notification.permission !== 'default') return false;
        setVisible(true);
        return true;
      } catch { return false; }
    };
    if (check()) return;
    let attempts = 0;
    const iv = setInterval(() => {
      attempts++;
      if (check() || attempts > 120) clearInterval(iv); // max. ~3 Minuten warten
    }, 1500);
    return () => clearInterval(iv);
  }, [needsHomeScreenFirst]);
  if (!visible) return null;
  const dismiss = () => {
    try { localStorage.setItem('bk_notif_dismissed', '1'); } catch {}
    setVisible(false);
  };
  const dismissInstruction = () => {
    // Nur für diese Ansicht ausblenden — NICHT dauerhaft, da der Nutzer die Seite erst noch
    // zum Home-Bildschirm hinzufügen muss, um danach den echten Aktivieren-Button zu sehen.
    setVisible(false);
  };
  const enable = () => {
    setBusy(true);
    Notification.requestPermission().then((result) => {
      setBusy(false);
      setVisible(false);
      try { localStorage.setItem('bk_notif_dismissed', '1'); } catch {}
      if (result === 'granted' && window.OneSignalDeferred) {
        window.OneSignalDeferred.push(async (OneSignal) => {
          try { await OneSignal.User.PushSubscription.optIn(); } catch {}
          // Benachrichtigt den Besitzer einmalig (pro Gerät/Browser) über den
          // neuen Abonnenten — rein additiv, ändert nichts am Opt-in-Ablauf.
          try {
            if (!localStorage.getItem('bk_owner_notified_new_sub')) {
              localStorage.setItem('bk_owner_notified_new_sub', '1');
              sendOwnerPushNotification('🔔 Neuer Push-Abonnent!', isStandalone ? 'Über App-Icon (Home-Bildschirm) abonniert 📲' : 'Über den Browser abonniert 🌐');
            }
          } catch {}
        });
      }
    }).catch(() => setBusy(false));
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[300] px-4 py-4" style={{ background: needsHomeScreenFirst ? 'transparent' : 'rgba(14,34,23,.97)', backdropFilter: needsHomeScreenFirst ? 'none' : 'blur(6px)', boxShadow: needsHomeScreenFirst ? 'none' : '0 -8px 24px rgba(0,0,0,.3)' }}>
      {needsHomeScreenFirst ? (
        <div className="max-w-md mx-auto rounded-3xl p-5" style={{ background: `linear-gradient(160deg, ${GREEN}, #0d2418)`, border: `2px solid ${GOLD}`, boxShadow: '0 -10px 40px rgba(0,0,0,.5)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: GOLD, animation: 'urgentPulse 1.8s ease-out infinite' }}>🔔</div>
            <div className="font-black text-base" style={{ color: GOLD }}>Verpasse keine Angebote!</div>
          </div>
          <div className="flex items-center gap-3 mb-2.5 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,.08)' }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs" style={{ background: GOLD, color: GREEN }}>1</span>
            <span className="text-sm font-semibold" style={{ color: '#fff' }}>Tippe unten auf <b style={{ color: GOLD }}>Teilen ⬆️</b></span>
          </div>
          <div className="flex items-center gap-3 mb-3.5 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,.08)' }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs" style={{ background: GOLD, color: GREEN }}>2</span>
            <span className="text-sm font-semibold" style={{ color: '#fff' }}>Wähle <b style={{ color: GOLD }}>„Zum Home-Bildschirm"</b></span>
          </div>
          <button onClick={dismissInstruction} className="w-full py-3 rounded-full font-bold text-sm" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, color: '#fff' }}>{t('notifBannerUnderstood')}</button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          <p className="text-xs font-medium flex-1 text-center sm:text-left" style={{ color: '#d9cdb4' }}>
            {t('notifBannerText')}
          </p>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={dismiss} className="px-4 py-2.5 rounded-full font-semibold text-xs" style={{ background: 'rgba(255,255,255,.1)', color: '#d9cdb4' }}>{t('notifBannerNotNow')}</button>
            <button onClick={enable} disabled={busy} className="px-6 py-2.5 rounded-full font-bold text-sm disabled:opacity-60" style={{ background: 'linear-gradient(135deg, #e65a0a, #ff8a3d)', color: '#fff' }}>{busy ? '…' : t('notifBannerEnable')}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CookieBanner() {
  const { t, go } = React.useContext(LangContext);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem('cookieConsent')) setVisible(true); } catch { setVisible(true); }
  }, []);
  if (!visible) return null;
  const accept = () => {
    try { localStorage.setItem('cookieConsent', '1'); } catch {}
    setVisible(false);
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[300] px-4 py-4" style={{ background: 'rgba(14,34,23,.97)', backdropFilter: 'blur(6px)', boxShadow: '0 -8px 24px rgba(0,0,0,.3)' }}>
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        <p className="text-xs font-medium flex-1 text-center sm:text-left" style={{ color: '#d9cdb4' }}>
          {t('cookieText')}{' '}
          <button onClick={() => { setVisible(false); go('datenschutz'); }} className="underline font-bold" style={{ color: '#ffc738' }}>{t('footerDatenschutz')}</button>
        </p>
        <button onClick={accept} className="flex-shrink-0 px-6 py-2.5 rounded-full font-bold text-sm" style={{ background: 'linear-gradient(135deg, #e65a0a, #ff8a3d)', color: '#fff' }}>{t('cookieAccept')}</button>
      </div>
    </div>
  );
}

function isTischMenuUrl() {
  try { return new URLSearchParams(window.location.search).get('menu') === '1'; } catch { return false; }
}

export default function App() {
  const isTischMenu = isTischMenuUrl();
  const [booted, setBooted] = useState(isTischMenu);
  const [view, setView] = useState(isTischMenu ? 'tischmenu' : 'home');
  const [pendingAction, setPendingAction] = useState(null);
  const go = (v, action) => { if (action) setPendingAction(action); setView(v); };
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);
  useEffect(() => {
    if (document.getElementById('onesignal-sdk')) return;
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    const script = document.createElement('script');
    script.id = 'onesignal-sdk';
    script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
    script.defer = true;
    document.head.appendChild(script);
    window.OneSignalDeferred.push(async function (OneSignal) {
      await OneSignal.init({
        appId: 'e2d12bd5-0cd9-4bf7-9ad9-8d3dd258f16f',
        // Verhindert, dass OneSignal zusätzlich einen eigenen Worker unter
        // /OneSignalSDKWorker.js im selben Scope registriert. Stattdessen
        // wird derselbe sw.js verwendet, den wir bereits oben registrieren
        // (siehe navigator.serviceWorker.register('/sw.js')) — nur EIN
        // Worker pro Scope, kein Kontroll-Konflikt mehr.
        serviceWorkerPath: 'sw.js',
        serviceWorkerParam: { scope: '/' },
      });
    });
  }, []);
  useEffect(() => {
    if (document.getElementById('bk-structured-data')) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'bk-structured-data';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Bodrum Kebap",
      "image": "https://bodrumkebapvechta.de/hero.jpg",
      "url": "https://bodrumkebapvechta.de",
      "telephone": "+4944419516104",
      "priceRange": "€€",
      "servesCuisine": ["Turkish", "Döner", "Pizza", "Pasta"],
      "acceptsReservations": "False",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Oyther Straße 37",
        "postalCode": "49377",
        "addressLocality": "Vechta",
        "addressCountry": "DE"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.6",
        "reviewCount": "293"
      },
      "openingHoursSpecification": isTuesdayOpenNow(new Date())
        ? [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "11:30", "closes": "22:00" }]
        : [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "11:30", "closes": "22:00" }],
      "servesHalal": true,
      "sameAs": ["https://instagram.com/BodrumKebapVechta"]
    });
    document.head.appendChild(script);
  }, []);
  const langCtx = useLang();
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useMemo(() => Object.values(cart).reduce((s, v) => s + v.qty, 0), [cart]);
  const cartTotal = useMemo(() => Object.values(cart).reduce((s, v) => s + v.qty * v.price, 0), [cart]);
  const [cartBumpKey, setCartBumpKey] = useState(0);
  const prevCartCountRef = useRef(0);
  useEffect(() => {
    if (cartCount > prevCartCountRef.current) setCartBumpKey((k) => k + 1);
    prevCartCountRef.current = cartCount;
  }, [cartCount]);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  useEffect(() => { cleanupOldOrders(); }, []);
  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    const onInstalled = () => setInstallPrompt(null);
    window.addEventListener('appinstalled', onInstalled);
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) setIsStandalone(true);
    if (window.navigator.standalone) setIsStandalone(true);
    return () => { window.removeEventListener('beforeinstallprompt', handler); window.removeEventListener('appinstalled', onInstalled); };
  }, []);
  const triggerInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
      return;
    }
    setShowInstallHelp(true);
  };

  if (!booted) return <SplashScreen onDone={() => setBooted(true)} />;

  const ctxValue = { ...langCtx, installPrompt: isStandalone ? null : (installPrompt || true), onInstall: triggerInstall, go };
  const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  const installHelpModal = showInstallHelp && ReactDOM.createPortal(
    <ConfigModal onClose={() => setShowInstallHelp(false)}>
      <div className="p-6 text-center">
        <div className="text-4xl mb-3">📲</div>
        <h3 className="font-black text-lg mb-3" style={{ color: GREEN }}>{ctxValue.t('installHelpTitle')}</h3>
        <p className="text-sm mb-6" style={{ color: '#7c6d55' }}>{isIOS ? ctxValue.t('installHelpIOS') : ctxValue.t('installHelpAndroid')}</p>
        <button onClick={() => setShowInstallHelp(false)} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN }}>{ctxValue.t('installHelpClose')}</button>
      </div>
    </ConfigModal>,
    document.body
  );
  const cartBadge = cartCount > 0 && !cartOpen && ReactDOM.createPortal(
    <button key={cartBumpKey} onClick={() => { if (view === 'whatsapp') { setCartOpen(true); } else { go('whatsapp', { openCart: true }); } }} className={`fixed ${view === 'home' ? 'bottom-5 right-4' : 'top-4 right-4'} flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full font-bold text-sm text-white`} style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 10px 26px rgba(230,90,10,.45)', zIndex: 90, animation: 'cartBump .45s cubic-bezier(.34,1.56,.64,1)' }}>
      <span className="relative"><ShoppingBag size={17} /><span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: GREEN, color: GOLD }}>{cartCount}</span></span>
      {fmt(cartTotal)}
    </button>,
    document.body
  );


  if (view === 'home') {
    return <LangContext.Provider value={ctxValue}><WeatherEffect /><HomeView go={go} installPrompt={installPrompt} onInstall={triggerInstall} cartCount={cartCount} />{installHelpModal}{cartBadge}<CookieBanner /><NotificationOptInBanner /><AIAssistant /></LangContext.Provider>;
  }

  if (view === 'tischmenu') {
    return <LangContext.Provider value={ctxValue}><WeatherEffect /><TischMenuView back={isTischMenu ? undefined : () => go('home')} initialAction={pendingAction} onConsumeAction={() => setPendingAction(null)} />{installHelpModal}<CookieBanner /></LangContext.Provider>;
  }

  return (
    <LangContext.Provider value={ctxValue}>
    <WeatherEffect />
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: `${GREEN} radial-gradient(circle at 15% 20%, rgba(255,199,56,.05), transparent 45%), radial-gradient(circle at 85% 75%, rgba(255,106,26,.06), transparent 45%)`, fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <style>{`
        @keyframes sideFloat1 { 0%,100%{ transform:translateY(0) rotate(-6deg);} 50%{ transform:translateY(-22px) rotate(6deg);} }
        @keyframes sideFloat2 { 0%,100%{ transform:translateY(0) rotate(5deg);} 50%{ transform:translateY(-30px) rotate(-5deg);} }
        @keyframes sideFloat3 { 0%,100%{ transform:translateY(0) rotate(0deg);} 50%{ transform:translateY(-16px) rotate(10deg);} }
        @keyframes sideSpin { from{ transform:rotate(0deg);} to{ transform:rotate(360deg);} }
        @keyframes viewFade { from{ opacity:0; transform:translateY(10px);} to{ opacity:1; transform:translateY(0);} }
        @keyframes popIn { 0%{ opacity:0; transform:scale(.6) rotate(-8deg);} 60%{ opacity:1; transform:scale(1.08) rotate(3deg);} 100%{ opacity:1; transform:scale(1) rotate(0deg);} }
        @keyframes confettiFall { 0%{ transform:translateY(-20px) rotate(0deg); opacity:1;} 80%{ opacity:1;} 100%{ transform:translateY(105vh) rotate(var(--spin, 480deg)); opacity:0;} }
        @keyframes ringPulse { 0%{ box-shadow:0 0 0 0 rgba(37,211,102,.45);} 100%{ box-shadow:0 0 0 30px rgba(37,211,102,0);} }
        @keyframes slideUpFade { from{ opacity:0; transform:translateY(16px);} to{ opacity:1; transform:translateY(0);} }
        @keyframes modalBgFade { from{ opacity:0;} to{ opacity:1;} }
        @keyframes modalCardUp { from{ opacity:0; transform:translateY(40px) scale(.97);} to{ opacity:1; transform:translateY(0) scale(1);} }
        @keyframes toastSlide { 0%{ opacity:0; transform:translateX(-50%) translateY(-16px) scale(.92); } 10%{ opacity:1; transform:translateX(-50%) translateY(0) scale(1); } 88%{ opacity:1; transform:translateX(-50%) translateY(0) scale(1); } 100%{ opacity:0; transform:translateX(-50%) translateY(-10px) scale(.97); } }
        @keyframes toastSheen { 0%{ transform: translateX(-120%); } 35%{ transform: translateX(120%); } 100%{ transform: translateX(120%); } }
        @keyframes checkPop { 0%{ transform: scale(0) rotate(-25deg); opacity:0; } 60%{ transform: scale(1.15) rotate(4deg); opacity:1; } 100%{ transform: scale(1) rotate(0); } }
        @keyframes sparkleFloat { 0%,15%{ opacity:0; transform: translateY(4px) scale(.6); } 30%{ opacity:1; transform: translateY(-2px) scale(1); } 60%{ opacity:1; transform: translateY(-6px) scale(1); } 85%,100%{ opacity:0; transform: translateY(-14px) scale(.8); } }
        @keyframes cartBump { 0%{ transform: scale(1); } 30%{ transform: scale(1.18); } 55%{ transform: scale(.94); } 100%{ transform: scale(1); } }
        @keyframes shimmerGold { 0%{ background-position: -200% 0; } 100%{ background-position: 200% 0; } }
        @keyframes softFloat { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-6px); } }
        @keyframes pinBoxPop { 0%{ transform:translateY(0) scale(1); } 35%{ transform:translateY(-12px) scale(1.08); } 100%{ transform:translateY(0) scale(1); } }
        @keyframes shakeX { 0%,100%{ transform:translateX(0); } 20%{ transform:translateX(-8px); } 40%{ transform:translateX(8px); } 60%{ transform:translateX(-6px); } 80%{ transform:translateX(6px); } }
        @keyframes checkingDots { 0%{ opacity:.2; } 50%{ opacity:1; } 100%{ opacity:.2; } }
        @keyframes urgentPulse { 0%,100%{ box-shadow:0 0 0 0 rgba(214,40,40,.55);} 50%{ box-shadow:0 0 0 10px rgba(214,40,40,0);} }
        @keyframes spin { from{ transform:rotate(0deg) scale(1);} 50%{ transform:rotate(180deg) scale(1.1);} to{ transform:rotate(360deg) scale(1);} }
        @keyframes goldGlow { 0%,100%{ box-shadow:0 0 0 0 rgba(255,199,56,.45);} 50%{ box-shadow:0 0 14px 4px rgba(255,199,56,.35);} }
        @keyframes resultPop { 0%{ opacity:0; transform: translateY(8px) scale(.96); } 100%{ opacity:1; transform: translateY(0) scale(1); } }
        @keyframes qtyPop { 0%{ transform: scale(.6); opacity:.4; } 60%{ transform: scale(1.2); } 100%{ transform: scale(1); opacity:1; } }
        button, a { transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease, opacity .18s ease; }
        button:active { transform: scale(.97); }
        @keyframes sadBounce { 0%,100%{ transform:translateY(0) rotate(0deg);} 25%{ transform:translateY(-6px) rotate(-4deg);} 75%{ transform:translateY(-2px) rotate(4deg);} }
        @keyframes bottomFloat1 { 0%,100%{ transform:translateY(0) rotate(-6deg);} 50%{ transform:translateY(-14px) rotate(6deg);} }
        @keyframes bottomFloat2 { 0%,100%{ transform:translateY(0) rotate(5deg);} 50%{ transform:translateY(-18px) rotate(-5deg);} }
      `}</style>

      {/* decorative side stripe */}
      <div className="absolute inset-y-0 left-0 w-2" style={{ background: `repeating-linear-gradient(180deg, ${ORANGE} 0 24px, ${GOLD} 24px 48px, #d62828 48px 72px)` }} />
      <div className="absolute inset-y-0 right-0 w-2" style={{ background: `repeating-linear-gradient(180deg, ${ORANGE} 0 24px, ${GOLD} 24px 48px, #d62828 48px 72px)` }} />

      {/* subtle professional corner accents — replaces the old floating emoji decorations */}
      <div className="absolute pointer-events-none" style={{ top: -120, left: -120, width: 360, height: 360, borderRadius: '50%', background: `radial-gradient(circle, rgba(255,199,56,.08), transparent 70%)` }} />
      <div className="absolute pointer-events-none" style={{ bottom: -140, right: -140, width: 420, height: 420, borderRadius: '50%', background: `radial-gradient(circle, rgba(230,90,10,.09), transparent 70%)` }} />
      <div className="hidden 2xl:block fixed left-8 bottom-10 opacity-60 pointer-events-none" style={{ fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: 3, writingMode: 'vertical-rl' }}>
        100% HALAL
      </div>
      <div className="hidden 2xl:block fixed right-8 bottom-10 opacity-60 pointer-events-none" style={{ fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: 3, writingMode: 'vertical-rl' }}>
        BODRUM KEBAP VECHTA
      </div>

      {cartBadge}

      <div key={view} className="w-full max-w-5xl mx-auto relative min-h-screen" style={{ background: CREAM, animation: 'viewFade .3s ease-out', zIndex: 1 }}>
        {view === 'whatsapp' && <WhatsAppOrderView back={() => setView('home')} initialAction={pendingAction} onConsumeAction={() => setPendingAction(null)} cart={cart} setCart={setCart} cartOpen={cartOpen} setCartOpen={setCartOpen} go={go} />}
        {view === 'builder' && <DonerBuilderView back={() => setView('home')} go={go} />}
        {view === 'group' && <GroupOrderView back={() => setView('home')} />}
        {view === 'staff' && <StaffPanelView back={() => setView('home')} />}
        {view === 'impressum' && <ImpressumView back={() => setView('home')} />}
        {view === 'datenschutz' && <DatenschutzView back={() => setView('home')} />}
        {view === 'track' && <OrderTrackView back={() => setView('home')} initialAction={pendingAction} onConsumeAction={() => setPendingAction(null)} />}
      </div>
    </div>
    {installHelpModal}
    <CookieBanner />
    </LangContext.Provider>
  );
}
