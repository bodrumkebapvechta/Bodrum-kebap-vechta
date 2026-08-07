import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  Flame, ArrowLeft, ArrowRight, Check, MessageCircle, ChevronLeft, Plus, Minus,
  ShoppingBag, Users, Gift, RotateCw, Lock, ShieldCheck, Phone, RefreshCw,
  Sparkles, User, Copy, Menu as MenuIcon, X, MapPin, Clock3, Instagram, Star, Timer, Heart,
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
const FRITZ_LIMO_IMG = "/fritz-limo.jpg";
const FRITZ_SPRITZ_TRAUBE_IMG = "/fritz-spritz-traube.jpg";
const FRITZ_SPRITZ_APFEL_IMG = "/fritz-spritz-apfel.jpg";
const FRITZ_KOLA_IMG = "/fritz-kola.jpg";
const FRITZ_KOLA_SUPERZERO_IMG = "/fritz-kola-superzero.jpg";
const FRITZ_MISCHMASCH_IMG = "/fritz-mischmasch.jpg";

/* ============ I18N ============ */
const LANGS = ['de', 'en', 'tr', 'ro', 'nl', 'sq', 'ku'];
const LANG_NAMES = { de: 'Deutsch', en: 'English', tr: 'Türkçe', ro: 'Română', nl: 'Nederlands', sq: 'Shqip', ku: 'Kurdî' };
const LANG_FLAGS = { de: '🇩🇪', en: '🇬🇧', tr: '🇹🇷', ro: '🇷🇴', nl: '🇳🇱', sq: '🇦🇱', ku: '☀️' };

const UI = {
  navExtras: { de: 'Extras', en: 'Extras', tr: 'Ekstralar', ro: 'Extra', nl: 'Extra’s' , sq: 'Ekstra', ku: 'Zêde'},
  navMenu: { de: 'Speisekarte', en: 'Menu', tr: 'Menü', ro: 'Meniu', nl: 'Menukaart' , sq: 'Menuja', ku: 'Menû'},
  navGallery: { de: 'Galerie', en: 'Gallery', tr: 'Galeri', ro: 'Galerie', nl: 'Galerij' , sq: 'Galeria', ku: 'Galerî'},
  navContact: { de: 'Kontakt', en: 'Contact', tr: 'İletişim', ro: 'Contact', nl: 'Contact' , sq: 'Kontakt', ku: 'Têkilî'},
  navStaff: { de: 'Personal', en: 'Staff', tr: 'Personel', ro: 'Personal', nl: 'Personeel' , sq: 'Stafi', ku: 'Karmend'},
  navStaffArea: { de: 'Personal-Bereich', en: 'Staff Area', tr: 'Personel Alanı', ro: 'Zonă Personal', nl: 'Personeelsgedeelte' , sq: 'Zona e Stafit', ku: 'Qada Karmendan'},
  navTrackOrder: { de: 'Bestellung verfolgen', en: 'Track order', tr: 'Siparişi takip et', ro: 'Urmărește comanda', nl: 'Bestelling volgen' , sq: 'Ndiq porosinë', ku: 'Sifarişê bişopîne'},
  titleTrack: { de: 'BESTELLUNG VERFOLGEN', en: 'TRACK ORDER', tr: 'SİPARİŞ TAKİBİ', ro: 'URMĂRIRE COMANDĂ', nl: 'BESTELLING VOLGEN' , sq: 'NDIQ POROSINË', ku: 'SIFARIŞÊ BIŞOPÎNE'},
  trackCodePh: { de: 'Bestellcode', en: 'Order code', tr: 'Sipariş kodu', ro: 'Cod comandă', nl: 'Bestelcode' , sq: 'Kodi i porosisë', ku: 'Koda sifarişê'},
  trackOrderBtn: { de: 'Bestellung verfolgen', en: 'Track order', tr: 'Siparişi takip et', ro: 'Urmărește comanda', nl: 'Bestelling volgen' , sq: 'Ndiq porosinë', ku: 'Sifarişê bişopîne'},
  orderStatusReady: { de: 'Fertig, komm vorbei! 🎉', en: 'Ready, come pick it up! 🎉', tr: 'Hazır, gelebilirsin! 🎉', ro: 'Gata, poți veni! 🎉', nl: 'Klaar, kom langs! 🎉' , sq: 'Gati, eja merre! 🎉', ku: 'Amade ye, were bigire! 🎉'},
  orderStatusPreparing: { de: 'Wird zubereitet', en: 'Being prepared', tr: 'Hazırlanıyor', ro: 'Se pregătește', nl: 'Wordt bereid' , sq: 'Po përgatitet', ku: 'Tê amadekirin'},
  orderCodeLabel: { de: 'Code', en: 'Code', tr: 'Kod', ro: 'Cod', nl: 'Code' , sq: 'Kodi', ku: 'Kod'},
  staffOrdersTab: { de: 'Bestellungen', en: 'Orders', tr: 'Siparişler', ro: 'Comenzi', nl: 'Bestellingen' , sq: 'Porositë', ku: 'Sifariş'},
  staffSettingsTab: { de: 'Einstellungen', en: 'Settings', tr: 'Ayarlar', ro: 'Setări', nl: 'Instellingen' , sq: 'Cilësimet', ku: 'Mîheng'},
  staffAnalyticsTab: { de: 'Statistik', en: 'Analytics', tr: 'İstatistik', ro: 'Statistici', nl: 'Statistieken' , sq: 'Statistikat', ku: 'Statîstîk'},
  staffMenuTab: { de: 'Menü', en: 'Menu', tr: 'Menü', ro: 'Meniu', nl: 'Menu' , sq: 'Menuja', ku: 'Menû'},
  staffPhotosTab: { de: 'Fotos', en: 'Photos', tr: 'Fotoğraflar', ro: 'Fotografii', nl: "Foto's" , sq: 'Fotot', ku: 'Wêne'},
  staffWelcomeTitle: { de: 'Willkommen zurück!', en: 'Welcome back!', tr: 'Tekrar hoş geldin!', ro: 'Bine ai revenit!', nl: 'Welkom terug!' , sq: 'Mirë se erdhe përsëri!', ku: 'Bi xêr hatî!'},
  staffWelcomeSub: { de: 'Wähle einen Bereich unten aus', en: 'Choose an area below', tr: 'Aşağıdan bir bölüm seç', ro: 'Alege o secțiune mai jos', nl: 'Kies hieronder een gebied' , sq: 'Zgjidh një seksion më poshtë', ku: 'Ji jêr beşekê hilbijêre'},
  menuSearchPh: { de: 'Gericht suchen...', en: 'Search dish...', tr: 'Ürün ara...', ro: 'Caută fel...', nl: 'Gerecht zoeken...' , sq: 'Kërko një gjellë...', ku: 'Xwarinê bigere...'},
  editedBadge: { de: 'bearbeitet', en: 'edited', tr: 'düzenlendi', ro: 'editat', nl: 'bewerkt' , sq: 'ndryshuar', ku: 'hate guherandin'},
  resetBtn: { de: 'Zurücksetzen', en: 'Reset', tr: 'Sıfırla', ro: 'Resetează', nl: 'Resetten' , sq: 'Rivendos', ku: 'Ji nû ve saz bike'},
  cancelBtn: { de: 'Abbrechen', en: 'Cancel', tr: 'Vazgeç', ro: 'Anulează', nl: 'Annuleren' , sq: 'Anulo', ku: 'Betal bike'},
  editedPricesCount: { de: 'Preis(e) angepasst', en: 'price(s) adjusted', tr: 'fiyat düzenlendi', ro: 'prețuri ajustate', nl: 'prijzen aangepast' , sq: 'çmim(e) të ndryshuar', ku: 'biha(yên) hatin guherandin'},
  photoUrlHint: { de: 'Foto direkt von deinem Gerät hochladen, oder alternativ einen Bild-Link einfügen (z.B. von einem Foto-Hosting-Dienst).', en: 'Upload a photo directly from your device, or alternatively paste an image link (e.g. from a photo hosting service).', tr: 'Cihazından doğrudan fotoğraf yükle, ya da alternatif olarak bir resim linki yapıştır (örn. bir fotoğraf barındırma servisinden).', ro: 'Încarcă o fotografie direct de pe dispozitiv, sau alternativ adaugă un link de imagine (de ex. de la un serviciu de găzduire foto).', nl: 'Upload een foto direct vanaf je apparaat, of plak als alternatief een afbeeldingslink (bijv. van een fotohostingdienst).' , sq: 'Ngarko një foto direkt nga pajisja jote, ose alternativisht ngjit një lidhje foto (p.sh. nga një shërbim hostimi fotosh).', ku: 'Wêneyekî rasterast ji amûra xwe bar bike, an jî girêdana wêneyekî lê zêde bike (mînak ji xizmeteke hostkirina wêneyan).'},
  uploadPhotoBtn: { de: 'Foto aus Galerie hochladen', en: 'Upload photo from gallery', tr: 'Galeriden fotoğraf yükle', ro: 'Încarcă fotografie din galerie', nl: 'Foto uploaden vanuit galerij', sq: 'Ngarko foto nga galeria', ku: 'Ji galeriyê wêne bar bike' },
  applyToCategoryBtn: { de: 'Auf alle Artikel dieser Kategorie anwenden', en: 'Apply to all items in this category', tr: 'Bu kategorideki tüm ürünlere uygula', ro: 'Aplică la toate produsele din această categorie', nl: 'Toepassen op alle items in deze categorie', sq: 'Zbato tek të gjitha artikujt e kësaj kategorie', ku: 'Li ser hemû tiştên vê kategoriyê bicîh bike' },
  photoAppliedCategoryMsg: { de: '✓ Auf {count} Artikel angewendet', en: '✓ Applied to {count} items', tr: '✓ {count} ürüne uygulandı', ro: '✓ Aplicat la {count} produse', nl: '✓ Toegepast op {count} items', sq: '✓ U zbatua në {count} artikuj', ku: '✓ Li ser {count} tiştan hate bicîhkirin' },
  independentPhotoTitle: { de: 'Foto ohne Bezug zu einem Gericht', en: 'Photo not tied to a dish', tr: 'Bir yemekle bağlantısız fotoğraf', ro: 'Fotografie fără legătură cu un fel de mâncare', nl: "Foto zonder verband met een gerecht", sq: 'Foto pa lidhje me një gjellë', ku: 'Wêne bêyî girêdan bi xwarinekê' },
  independentPhotoHint: { de: 'Für Fotos, die zu keinem bestimmten Gericht gehören (z.B. Restaurant, Team, Events) — wird zur Galerie auf der Startseite hinzugefügt.', en: 'For photos that don\'t belong to a specific dish (e.g. restaurant, team, events) — added to the gallery on the homepage.', tr: 'Belirli bir yemekle ilgili olmayan fotoğraflar için (örn. mekan, ekip, etkinlik) — ana sayfadaki galeriye eklenir.', ro: 'Pentru fotografii care nu aparțin unui anumit fel de mâncare (de ex. restaurant, echipă, evenimente) — adăugate la galeria de pe pagina principală.', nl: 'Voor foto\'s die niet bij een specifiek gerecht horen (bijv. restaurant, team, evenementen) — wordt toegevoegd aan de galerij op de homepage.', sq: 'Për foto që nuk i përkasin një gjelle të caktuar (p.sh. lokali, ekipi, evente) — shtohet te galeria në faqen kryesore.', ku: 'Ji bo wêneyên ku girêdayî gjelleyekê taybet nînin (mînak dikan, tîm, bûyer) — li galeriya rûpelê sereke tê zêdekirin.' },
  uploadGalleryPhotoBtn: { de: 'Foto zur Galerie hinzufügen', en: 'Add photo to gallery', tr: 'Galeriye fotoğraf ekle', ro: 'Adaugă fotografie la galerie', nl: 'Foto toevoegen aan galerij', sq: 'Shto foto te galeria', ku: 'Wêne li galeriyê zêde bike' },
  visitsToday: { de: 'Besuche heute', en: 'Visits today', tr: 'Bugünkü ziyaret', ro: 'Vizite azi', nl: 'Bezoeken vandaag' , sq: 'Vizita sot', ku: 'Serdanên îro'},
  visitsRecent: { de: 'Letzte Besuche', en: 'Recent visits', tr: 'Son ziyaretler', ro: 'Vizite recente', nl: 'Recente bezoeken' , sq: 'Vizitat e fundit', ku: 'Serdanên dawî'},
  byLanguage: { de: 'NACH SPRACHE', en: 'BY LANGUAGE', tr: 'DİLE GÖRE', ro: 'DUPĂ LIMBĂ', nl: 'PER TAAL' , sq: 'SIPAS GJUHËS', ku: 'LI GORÎ ZIMAN'},
  byDevice: { de: 'NACH GERÄT', en: 'BY DEVICE', tr: 'CİHAZA GÖRE', ro: 'DUPĂ DISPOZITIV', nl: 'PER APPARAAT' , sq: 'SIPAS PAJISJES', ku: 'LI GORÎ AMÎR'},
  analyticsNote: { de: 'Zeigt die letzten 500 Besuche. Keine persönlichen Daten, nur Sprache & Gerätetyp.', en: 'Shows the last 500 visits. No personal data, only language & device type.', tr: 'Son 500 ziyareti gösterir. Kişisel veri yok, sadece dil ve cihaz türü.', ro: 'Arată ultimele 500 de vizite. Fără date personale, doar limba și tipul dispozitivului.', nl: 'Toont de laatste 500 bezoeken. Geen persoonlijke gegevens, alleen taal & apparaattype.' , sq: 'Tregon 500 vizitat e fundit. Pa të dhëna personale, vetëm gjuha & lloji i pajisjes.', ku: '500 serdanên dawî nîşan dide. Tu daneyên kesane tune, tenê ziman & cureyê amîr.'},
  trackEmptyHint: { de: 'Gib deinen Bestellcode ein, um den Status zu sehen.', en: 'Enter your order code to see the status.', tr: 'Durumu görmek için sipariş kodunu gir.', ro: 'Introdu codul comenzii pentru a vedea starea.', nl: 'Voer je bestelcode in om de status te zien.' , sq: 'Fut kodin e porosisë për të parë statusin.', ku: 'Ji bo dîtina rewşê koda sifarişê binivîse.'},
  surpriseMeBtn: { de: 'Überrasch mich!', en: 'Surprise me!', tr: 'Sürpriz beni!', ro: 'Surprinde-mă!', nl: 'Verras me!' , sq: 'Më surprizo!', ku: 'Min ecêbmayî bihêle!'},
  surpriseTitle: { de: 'Wie wäre es damit?', en: 'How about this?', tr: 'Buna ne dersin?', ro: 'Ce zici de asta?', nl: 'Wat dacht je hiervan?' , sq: 'Si të duket kjo?', ku: 'Ev çawa ye?'},
  surpriseRolling: { de: 'Wir überlegen...', en: 'Thinking...', tr: 'Düşünüyoruz...', ro: 'Ne gândim...', nl: 'We denken na...' , sq: 'Po mendojmë...', ku: 'Em difikirin...'},
  surpriseWantIt: { de: 'Ja, das will ich!', en: 'Yes, I want this!', tr: 'Evet, bunu istiyorum!', ro: 'Da, vreau asta!', nl: 'Ja, dit wil ik!' , sq: 'Po, e dua këtë!', ku: 'Erê, ez vê dixwazim!'},
  surpriseAgain: { de: 'Was anderes zeigen', en: 'Show me something else', tr: 'Başka bir şey söyle', ro: 'Arată-mi altceva', nl: 'Toon iets anders' , sq: 'Trego diçka tjetër', ku: 'Tiştekî din nîşan bide'},
  noOrdersYet: { de: 'Noch keine Bestellungen', en: 'No orders yet', tr: 'Henüz sipariş yok', ro: 'Încă nicio comandă', nl: 'Nog geen bestellingen' , sq: 'Ende pa porosi', ku: 'Hê tu sifariş tune'},
  deleteOrderBtn: { de: 'Löschen (z.B. falls nicht per WhatsApp abgeschickt)', en: 'Delete (e.g. if not actually sent via WhatsApp)', tr: 'Sil (örn. WhatsApp\'tan gerçekten gönderilmediyse)', ro: 'Șterge (ex. dacă nu a fost trimis efectiv prin WhatsApp)', nl: 'Verwijderen (bijv. als niet echt via WhatsApp verstuurd)' , sq: 'Fshi (p.sh. nëse nuk u dërgua nga WhatsApp)', ku: 'Jê bibe (mînak heke bi WhatsApp neşandibe)'},
  deleteFailedMsg: { de: '⚠️ Löschen fehlgeschlagen — Datenbankberechtigung prüfen', en: '⚠️ Delete failed — check database permissions', tr: '⚠️ Silme başarısız — veritabanı izinlerini kontrol edin', ro: '⚠️ Ștergere eșuată — verifică permisiunile bazei de date', nl: '⚠️ Verwijderen mislukt — controleer databaserechten' , sq: '⚠️ Fshirja dështoi — kontrollo lejet e bazës së të dhënave', ku: '⚠️ Jêbirin serneket — destûrên danegehê kontrol bike'},
  ordersTotalLabel: { de: 'GESAMT (angezeigte Bestellungen)', en: 'TOTAL (shown orders)', tr: 'TOPLAM (görüntülenen siparişler)', ro: 'TOTAL (comenzi afișate)', nl: 'TOTAAL (getoonde bestellingen)' , sq: 'GJITHSEJ (porositë e shfaqura)', ku: 'BI TEVAYÎ (sifarişên xuyakirî)'},
  stuckOrderBadge: { de: 'ÜBERFÄLLIG', en: 'OVERDUE', tr: 'GECİKTİ', ro: 'ÎNTÂRZIATĂ', nl: 'TE LAAT' , sq: 'VONESË', ku: 'DEREN MABÛYE'},
  soldOutBadge: { de: 'AUSVERKAUFT', en: 'SOLD OUT', tr: 'TÜKENDİ', ro: 'EPUIZAT', nl: 'UITVERKOCHT' , sq: 'I SHITUR', ku: 'TIŞTEK NEMA'},
  notifTestLabel: { de: 'Benachrichtigung testen', en: 'Test notification', tr: 'Bildirimi test et', ro: 'Testează notificarea', nl: 'Melding testen' , sq: 'Testo njoftimin', ku: 'Danezanê biceribîne'},
  dailyBannerLabel: { de: 'Ankündigung des Tages', en: "Today's announcement", tr: 'Günün duyurusu', ro: 'Anunțul zilei', nl: 'Aankondiging van vandaag' , sq: 'Njoftimi i ditës', ku: 'Ragihandina Rojê'},
  dailyBannerPh: { de: 'z.B. Heute frischer Sucuk geliefert 🎉', en: 'e.g. Fresh sucuk delivered today 🎉', tr: 'örn. Bugün taze sucuk geldi 🎉', ro: 'ex. Astăzi a sosit sucuk proaspăt 🎉', nl: 'bijv. Vandaag verse sucuk geleverd 🎉' , sq: 'p.sh. Sot erdhi sallam i freskët 🎉', ku: 'mînak Îro sucuqê taze hat 🎉'},
  waTemplateLabel: { de: 'Persönliche Nachricht (WhatsApp)', en: 'Personal message (WhatsApp)', tr: 'Kişisel mesaj (WhatsApp)', ro: 'Mesaj personal (WhatsApp)', nl: 'Persoonlijk bericht (WhatsApp)' , sq: 'Mesazh personal (WhatsApp)', ku: 'Peyama şexsî (WhatsApp)'},
  waTemplateHint: { de: 'Wird am Ende jeder Bestellnachricht angehängt (optional).', en: 'Added to the end of every order message (optional).', tr: 'Her sipariş mesajının sonuna eklenir (opsiyonel).', ro: 'Adăugat la sfârșitul fiecărui mesaj de comandă (opțional).', nl: 'Wordt toegevoegd aan het einde van elk bestelbericht (optioneel).' , sq: 'Shtohet në fund të çdo mesazhi porosie (opsionale).', ku: 'Di dawiya her peyama sifarişê de tê zêdekirin (vebijarkî).'},
  waTemplatePh: { de: 'z.B. Frohe Weihnachten! 🎄', en: 'e.g. Merry Christmas! 🎄', tr: 'örn. İyi bayramlar! 🎄', ro: 'ex. Crăciun fericit! 🎄', nl: 'bijv. Fijne kerst! 🎄' , sq: 'p.sh. Gëzuar Krishtlindjet! 🎄', ku: 'mînak Cejna we pîroz be! 🎄'},
  testOrderLabel: { de: 'Testbestellung', en: 'Test order', tr: 'Test siparişi', ro: 'Comandă de test', nl: 'Testbestelling' , sq: 'Porosi provë', ku: 'Sifarişa ceribandinê'},
  testOrderHint: { de: 'Erstellt eine Test-Bestellung, um Ton, Vibration und die Bestellungen-Ansicht zu prüfen, ohne echte Daten zu vermischen.', en: 'Creates a test order to check sound, vibration and the orders view, without mixing with real data.', tr: 'Ses, titreşim ve sipariş görünümünü gerçek veriyle karışmadan test etmek için bir test siparişi oluşturur.', ro: 'Creează o comandă de test pentru a verifica sunetul, vibrația și afișarea comenzilor, fără a amesteca date reale.', nl: 'Maakt een testbestelling om geluid, trilling en het bestellingenoverzicht te controleren, zonder echte data te mengen.' , sq: 'Krijon një porosi provë për të testuar zërin, dridhjen dhe pamjen e porosive, pa përzier të dhëna reale.', ku: 'Sifarişeke ceribandinê çêdike da ku deng, lerizîn û dîtbariya sifarişan biceribîne, bêyî ku bi daneyên rastîn re tevlihev bibe.'},
  testOrderBtn: { de: 'Testbestellung erstellen', en: 'Create test order', tr: 'Test siparişi oluştur', ro: 'Creează comandă de test', nl: 'Testbestelling aanmaken' , sq: 'Krijo porosi provë', ku: 'Sifarişa ceribandinê çêke'},
  showTestOrdersLabel: { de: 'Testbestellungen in der Liste anzeigen', en: 'Show test orders in the list', tr: 'Test siparişlerini listede göster', ro: 'Arată comenzile de test în listă', nl: 'Testbestellingen tonen in de lijst' , sq: 'Trego porositë provë në listë', ku: 'Sifarişên ceribandinê di lîsteyê de nîşan bide'},
  testOrderCreatedMsg: { de: '✓ Testbestellung erstellt', en: '✓ Test order created', tr: '✓ Test siparişi oluşturuldu', ro: '✓ Comandă de test creată', nl: '✓ Testbestelling aangemaakt' , sq: '✓ Porosia provë u krijua', ku: '✓ Sifarişa ceribandinê hat çêkirin'},
  notifTestBtn: { de: 'Testton abspielen', en: 'Play test sound', tr: 'Test sesini çal', ro: 'Redă sunetul de test', nl: 'Testgeluid afspelen' , sq: 'Luaj tingullin provë', ku: 'Dengê ceribandinê lêxe'},
  markSoldOutOn: { de: 'Als „Ausverkauft" markiert', en: 'Marked as "Sold out"', tr: '"Tükendi" olarak işaretlendi', ro: 'Marcat ca „Epuizat"', nl: 'Gemarkeerd als "Uitverkocht"' , sq: 'Shënuar si \\"I shitur\\"', ku: 'Wek \\"Tune\\" hate nîşankirin'},
  markSoldOutOff: { de: 'Als „Ausverkauft" markieren', en: 'Mark as "Sold out"', tr: '"Tükendi" olarak işaretle', ro: 'Marchează ca „Epuizat"', nl: 'Markeren als "Uitverkocht"' , sq: 'Shëno si \\"I shitur\\"', ku: 'Wek \\"Tune\\" nîşan bike'},
  chickenSoldOutLabel: { de: 'Hähnchenfleisch (Döner) ausverkauft', en: 'Chicken meat (Döner) sold out', tr: 'Tavuk döner eti tükendi', ro: 'Carne de pui (Döner) epuizată', nl: 'Kipvlees (Döner) uitverkocht', sq: 'Mishi i pulës (Döner) i shitur', ku: 'Goştê mirîşkê (Döner) nema' },
  extrasSoldOutTitle: { de: 'Zutaten ausverkauft', en: 'Ingredients sold out', tr: 'Malzeme tükendi', ro: 'Ingrediente epuizate', nl: 'Ingrediënten uitverkocht', sq: 'Përbërësit e shitur', ku: 'Malzemeyên nema' },
  extrasSoldOutHint: { de: 'Markiere eine Zutat (z.B. Brokkoli), die gerade nicht verfügbar ist. Kunden sehen dann eine Warnung, können sie aber trotzdem wählen.', en: 'Mark an ingredient (e.g. broccoli) that is currently unavailable. Customers will see a warning but can still choose it.', tr: 'Şu anda mevcut olmayan bir malzemeyi (örn. brokoli) işaretle. Müşteriler bir uyarı görecek ama yine de seçebilecek.', ro: 'Marchează un ingredient (de ex. broccoli) care nu este momentan disponibil. Clienții vor vedea un avertisment, dar îl pot alege oricum.', nl: 'Markeer een ingrediënt (bijv. broccoli) dat momenteel niet beschikbaar is. Klanten zien een waarschuwing maar kunnen het toch kiezen.', sq: 'Shëno një përbërës (p.sh. brokoli) që nuk është i disponueshëm aktualisht. Klientët do të shohin një paralajmërim por mund ta zgjedhin gjithsesi.', ku: 'Malzemeyekê (mînak brokolî) ku niha ne mevcûd e nîşan bike. Xerîdar dê hişyariyekê bibînin lê dîsa jî dikarin wê hilbijêrin.' },
  extraSearchPh: { de: 'z.B. Brokkoli, Zwiebeln...', en: 'e.g. broccoli, onions...', tr: 'örn. brokoli, soğan...', ro: 'ex. broccoli, ceapă...', nl: 'bijv. broccoli, uien...', sq: 'p.sh. brokoli, qepë...', ku: 'mînak brokolî, pîvaz...' },
  extraSoldOutWarnPrefix: { de: 'Achtung: Wir haben gerade kein/e/n', en: 'Note: We currently don\'t have', tr: 'Dikkat: Şu anda', ro: 'Atenție: Momentan nu avem', nl: 'Let op: We hebben momenteel geen', sq: 'Kujdes: Aktualisht nuk kemi', ku: 'Bala xwe bidê: Niha em ne xwedî' },
  extraSoldOutWarnSuffix: { de: 'mehr. Trotzdem hinzufügen?', en: '. Add it anyway?', tr: 'yok. Yine de eklensin mi?', ro: '. Adaugi oricum?', nl: 'meer. Toch toevoegen?', sq: 'më. Ta shtoj gjithsesi?', ku: 'nema. Dîsa jî bê zêdekirin?' },
  addAnywayBtn: { de: 'Trotzdem hinzufügen', en: 'Add anyway', tr: 'Yine de ekle', ro: 'Adaugă oricum', nl: 'Toch toevoegen', sq: 'Shto gjithsesi', ku: 'Dîsa jî zêde bike' },
  groupShareBtn: { de: 'Per WhatsApp einladen', en: 'Invite via WhatsApp', tr: 'WhatsApp ile davet et', ro: 'Invită prin WhatsApp', nl: 'Uitnodigen via WhatsApp' , sq: 'Fto përmes WhatsApp', ku: 'Bi WhatsApp vexwîne'},
  groupShareMsg: { de: 'Hey! Lass uns zusammen bei Bodrum Kebap Vechta bestellen 🥙 Tritt mit dem Code {code} bei: https://bodrumkebapvechta.de', en: 'Hey! Let\'s order together from Bodrum Kebap Vechta 🥙 Join with code {code}: https://bodrumkebapvechta.de', tr: 'Selam! Bodrum Kebap Vechta\'dan birlikte sipariş verelim 🥙 {code} koduyla katıl: https://bodrumkebapvechta.de', ro: 'Hei! Hai să comandăm împreună de la Bodrum Kebap Vechta 🥙 Alătură-te cu codul {code}: https://bodrumkebapvechta.de', nl: 'Hé! Laten we samen bestellen bij Bodrum Kebap Vechta 🥙 Doe mee met code {code}: https://bodrumkebapvechta.de' , sq: 'Hej! Le të porosisim së bashku nga Bodrum Kebap Vechta 🥙 Bashkohu me kodin {code}: https://bodrumkebapvechta.de', ku: 'Silav! Werin em bi hev re ji Bodrum Kebap Vechta sifariş bidin 🥙 Bi koda {code} tevlî bibe: https://bodrumkebapvechta.de'},
  pendingParticipantsPrefix: { de: 'Noch nicht fertig:', en: 'Not finished yet:', tr: 'Henüz bitirmedi:', ro: 'Încă nu au terminat:', nl: 'Nog niet klaar:' , sq: 'Ende pa mbaruar:', ku: 'Hê ne temam:'},
  pendingParticipantsSuffix: { de: '', en: '', tr: '', ro: '', nl: '' , sq: '', ku: ''},
  sendAnywayConfirm: { de: 'Manche Personen wählen noch aus. Trotzdem senden?', en: 'Some people are still selecting. Send anyway?', tr: 'Bazı kişiler hâlâ seçim yapıyor. Yine de gönderilsin mi?', ro: 'Unele persoane încă aleg. Trimiți oricum?', nl: 'Sommige mensen zijn nog aan het kiezen. Toch versturen?' , sq: 'Disa persona ende po zgjedhin. Të dërgohet gjithsesi?', ku: 'Hin kes hê hildibijêrin. Dîsa jî bişînim?'},
  elapsedPrefix: { de: 'seit', en: 'since', tr: 'geçen süre', ro: 'de', nl: 'sinds' , sq: 'prej', ku: 'ji'},
  inPrefix: { de: 'in', en: 'in', tr: 'kalan', ro: 'în', nl: 'over' , sq: 'pas', ku: 'di nav'},
  overduePrefix: { de: 'überfällig seit', en: 'overdue by', tr: 'gecikme', ro: 'întârziere', nl: 'te laat met' , sq: 'me vonesë prej', ku: 'deren maye ji'},
  googleRatingLabel: { de: 'Google-Bewertung (Punkte, Anzahl)', en: 'Google rating (score, count)', tr: 'Google puanı (puan, adet)', ro: 'Rating Google (scor, număr)', nl: 'Google-beoordeling (score, aantal)' , sq: 'Vlerësimi Google (pikë, numër)', ku: 'Nirxandina Google (xal, hejmar)'},
  saveBtn: { de: 'Speichern', en: 'Save', tr: 'Kaydet', ro: 'Salvează', nl: 'Opslaan' , sq: 'Ruaj', ku: 'Tomar bike'},
  savedMsg: { de: '✓ Gespeichert', en: '✓ Saved', tr: '✓ Kaydedildi', ro: '✓ Salvat', nl: '✓ Opgeslagen' , sq: '✓ U ruajt', ku: '✓ Hat tomarkirin'},
  welcomeBackMsg: { de: '👋 Wir haben dich vermisst! Schön, dass du wieder da bist.', en: '👋 We missed you! Great to have you back.', tr: '👋 Seni özledik! Tekrar hoş geldin.', ro: '👋 Ne-a fost dor de tine! Bine ai revenit.', nl: '👋 We hebben je gemist! Fijn dat je er weer bent.' , sq: '👋 Na ka munguar! Mirë se erdhe përsëri.', ku: '👋 Me bêriya te kir! Xweş e ku tu vegeriyayî.'},
  favoritesTitle: { de: 'DEINE FAVORITEN', en: 'YOUR FAVOURITES', tr: 'FAVORİLERİN', ro: 'FAVORITELE TALE', nl: 'JOUW FAVORIETEN' , sq: 'FAVORITET E TUA', ku: 'BIJARTEYÊN TE'},
  orderNow: { de: 'Jetzt bestellen', en: 'Order now', tr: 'Şimdi sipariş ver', ro: 'Comandă acum', nl: 'Nu bestellen' , sq: 'Porosit tani', ku: 'Niha sifariş bide'},
  heroHalal: { de: '100% HALAL', en: '100% HALAL', tr: '%100 HELAL', ro: '100% HALAL', nl: '100% HALAL' , sq: '100% HALLALL', ku: '100% HELAL'},
  heroTitle1: { de: 'Frisch vom', en: 'Fresh from the', tr: 'Taze', ro: 'Proaspăt de la', nl: 'Vers van het' , sq: 'E freskët nga', ku: 'Taze ji'},
  heroTitle2: { de: 'Drehspieß', en: 'rotisserie', tr: 'Döner', ro: 'rotisor', nl: 'draaispit' , sq: 'Rrotisi', ku: 'Şîşê zivirî'},
  heroSubtitle: { de: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salat — täglich frisch zubereitet in Vechta.', en: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salad — freshly made every day in Vechta.', tr: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salata — Vechta\'da her gün taze hazırlanır.', ro: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salată — preparate proaspăt zilnic în Vechta.', nl: 'Kebap · Pizza · Rollo · Calzone · Schnitzel · Salade — dagelijks vers bereid in Vechta.' , sq: 'Kebap · Picë · Rollo · Kalcone · Shnicel · Sallatë — përgatitur fresk çdo ditë në Vechta.', ku: 'Kebap · Pizza · Rollo · Kalzone · Şnîtzel · Salate — her roj li Vechta taze tê amadekirin.'},
  heroCtaWhatsapp: { de: '📱 Per WhatsApp bestellen', en: '📱 Order via WhatsApp', tr: '📱 WhatsApp ile sipariş ver', ro: '📱 Comandă prin WhatsApp', nl: '📱 Bestellen via WhatsApp' , sq: '📱 Porosit përmes WhatsApp', ku: '📱 Bi WhatsApp sifariş bide'},
  heroCtaMore: { de: 'Mehr entdecken', en: 'Discover more', tr: 'Daha fazlasını keşfet', ro: 'Descoperă mai mult', nl: 'Meer ontdekken' , sq: 'Zbulo më shumë', ku: 'Bêtir keşf bike'},
  heroCtaGroup: { de: 'Gruppenbestellung starten — mit Freunden zusammen bestellen! →', en: 'Start a group order — order together with friends! →', tr: 'Grup siparişi başlat — arkadaşlarınla birlikte sipariş ver! →', ro: 'Începe o comandă de grup — comandă împreună cu prietenii! →', nl: 'Start een groepsbestelling — samen bestellen met vrienden! →' , sq: 'Fillo porosi në grup — porosit së bashku me shokët! →', ku: 'Sifarişa komê dest pê bike — bi hevalan re sifariş bide! →'},
  heroOpeningHours: { de: 'Öffnungszeiten', en: 'Opening hours', tr: 'Çalışma saatleri', ro: 'Program', nl: 'Openingstijden' , sq: 'Orari i hapjes', ku: 'Demên vekirî'},
  heroClosedDay: { de: 'Ruhetag', en: 'Closed on', tr: 'Kapalı gün', ro: 'Zi de închidere', nl: 'Gesloten dag' , sq: 'Mbyllur', ku: 'Girtî'},
  heroAddress: { de: 'Adresse', en: 'Address', tr: 'Adres', ro: 'Adresă', nl: 'Adres' , sq: 'Adresa', ku: 'Navnîşan'},
  extrasKicker: { de: 'UNSERE DIGITALEN EXTRAS', en: 'OUR DIGITAL EXTRAS', tr: 'DİJİTAL EKSTRALARIMIZ', ro: 'EXTRELE NOASTRE DIGITALE', nl: 'ONZE DIGITALE EXTRA’S' , sq: 'EKSTRAT TONA DIGJITALE', ku: 'ZÊDEYÊN ME YÊN DIJÎTAL'},
  extrasTitle: { de: 'Mehr als nur bestellen', en: 'More than just ordering', tr: 'Sadece sipariş vermekten fazlası', ro: 'Mai mult decât o simplă comandă', nl: 'Meer dan alleen bestellen' , sq: 'Më shumë se thjesht porosi', ku: 'Ji sifarişkirinê zêdetir'},
  extrasTip: { de: '🎡 Tipp: Beim Bestellen wartet vor dem Absenden ein Glücksrad mit Gewinnchance!', en: '🎡 Tip: A lucky wheel with a chance to win is waiting before you send your order!', tr: '🎡 İpucu: Sipariş göndermeden önce kazanma şansı olan bir çark seni bekliyor!', ro: '🎡 Sfat: O roată norocoasă cu șansă de câștig te așteaptă înainte de a trimite comanda!', nl: '🎡 Tip: Voor je bestelling verstuurt, wacht een geluksrad met winkans!' , sq: '🎡 Këshillë: Para se të dërgosh porosinë, të pret rrota e fatit me shans fitoreje!', ku: '🎡 Şîret: Berî şandina sifarişê çerxa bextê ya bi şansê ya biserketinê li benda te ye!'},
  featWaTitle: { de: 'WhatsApp Bestellung', en: 'WhatsApp Order', tr: 'WhatsApp Sipariş', ro: 'Comandă WhatsApp', nl: 'WhatsApp Bestelling' , sq: 'Porosi me WhatsApp', ku: 'Sifarişa WhatsApp'},
  featWaSub: { de: 'Menü wählen, direkt zur Abholung senden', en: 'Choose from the menu, send straight for pickup', tr: 'Menüden seç, direkt teslim alma için gönder', ro: 'Alege din meniu, trimite direct pentru ridicare', nl: 'Kies uit het menu, direct versturen om af te halen' , sq: 'Zgjidh nga menuja, dërgo direkt për marrje', ku: 'Ji menûyê hilbijêre, rasterast ji bo standinê bişîne'},
  featBuilderTitle: { de: 'Baue Döner, Pizza oder Pasta', en: 'Build a Döner, Pizza or Pasta', tr: 'Döner, Pizza veya Pasta Oluştur', ro: 'Construiește Kebap, Pizza sau Pasta', nl: 'Bouw een Döner, Pizza of Pasta' , sq: 'Krijo Döner, Picë ose Pastë', ku: 'Dönerê, Pizzayê an Pastayê çêke'},
  featBuilderSub: { de: 'Ganz nach deinem Geschmack — Schritt für Schritt selbst zusammenstellen', en: 'Exactly to your taste — build it step by step yourself', tr: 'Tamamen kendi zevkine göre — adım adım kendin oluştur', ro: 'Exact după gustul tău — construiește-l pas cu pas', nl: 'Precies naar jouw smaak — stap voor stap zelf samenstellen' , sq: 'Sipas shijes tënde — krijoje vetë hap pas hapi', ku: 'Bi tam ya te — gav bi gav bi xwe çêke'},
  builderQuickLabel: { de: 'Döner, Pizza & Pasta selbst bauen', en: 'Build your Döner, Pizza & Pasta', tr: 'Döner, Pizza & Pasta Oluştur', ro: 'Construiește Kebap, Pizza & Pasta', nl: 'Bouw je Döner, Pizza & Pasta' , sq: 'Krijo vetë Döner, Picë & Pastë', ku: 'Dönerê, Pizzayê & Pastayê bi xwe çêke'},
  featGroupTitle: { de: 'Gruppenbestellung', en: 'Group Order', tr: 'Grup Siparişi', ro: 'Comandă de grup', nl: 'Groepsbestelling' , sq: 'Porosi në grup', ku: 'Sifarişa Komê'},
  featGroupSub: { de: 'Mit Freunden zusammen bestellen', en: 'Order together with friends', tr: 'Arkadaşlarınla birlikte sipariş ver', ro: 'Comandă împreună cu prietenii', nl: 'Samen bestellen met vrienden' , sq: 'Porosit së bashku me shokët', ku: 'Bi hevalan re sifariş bide'},
  featLoyaltyTitle: { de: 'Treuekarte', en: 'Loyalty Card', tr: 'Sadakat Kartı', ro: 'Card de fidelitate', nl: 'Spaarkaart' , sq: 'Karta e besnikërisë', ku: 'Karta Dilsozîyê'},
  featSurpriseSub: { de: 'Lass dich zufällig inspirieren', en: 'Get a random inspiration', tr: 'Rastgele bir ilham al', ro: 'Inspiră-te aleatoriu', nl: 'Laat je willekeurig inspireren' , sq: 'Lëre veten të frymëzohesh rastësisht', ku: 'Bihêle bi rengekî tesadufî îlham bigirî'},
  featLoyaltySub: { de: '8 Stempel sammeln, Gratis-Portion sichern', en: 'Collect 8 stamps, get a free item', tr: '8 damga topla, ücretsiz ürün kazan', ro: 'Colectează 8 ștampile, primești gratuit', nl: '8 stempels sparen, gratis item ontvangen' , sq: 'Mblidh 8 vula, siguro një racion falas', ku: '8 mor berhev bike, portîyoneke belaş bistîne'},
  footerImpressum: { de: 'Impressum', en: 'Legal notice', tr: 'Yasal Bilgiler', ro: 'Date companie', nl: 'Colofon' , sq: 'Të dhëna ligjore', ku: 'Agahiyên Hiqûqî'},
  footerDatenschutz: { de: 'Datenschutz', en: 'Privacy', tr: 'Gizlilik', ro: 'Confidențialitate', nl: 'Privacy' , sq: 'Privatësia', ku: 'Nihêniya Daneyan'},
  galleryTerrace: { de: 'UNSERE TERRASSE', en: 'OUR TERRACE', tr: 'TERASIMIZ', ro: 'TERASA NOASTRĂ', nl: 'ONS TERRAS' , sq: 'TARACA JONË', ku: 'TERASA ME'},
  galleryTerraceTitle: { de: 'Ein Stück Bodrum in Deutschland', en: 'A piece of Bodrum in Germany', tr: 'Almanya\'da bir parça Bodrum', ro: 'O bucată din Bodrum în Germania', nl: 'Een stukje Bodrum in Duitsland' , sq: 'Një copë Bodrum në Gjermani', ku: 'Perçeyek Bodrumê li Almanyayê'},
  galleryTerraceSub: { de: 'Gemütlich draußen sitzen & genießen — direkt bei uns in Vechta.', en: 'Sit outside and enjoy — right here in Vechta.', tr: 'Dışarıda rahatça oturup keyif çıkar — Vechta\'da bizde.', ro: 'Stai afară și bucură-te — direct la noi în Vechta.', nl: 'Gezellig buiten zitten & genieten — bij ons in Vechta.' , sq: 'Ulu rehat jashtë & shijo — pikërisht te ne në Vechta.', ku: 'Li derve bi rihetî rûnê û kêfê bike — li vir li Vechta li cem me.'},
  galleryKitchen: { de: 'EIN BLICK IN UNSERE KÜCHE', en: 'A LOOK INTO OUR KITCHEN', tr: 'MUTFAĞIMIZDAN BİR BAKIŞ', ro: 'O PRIVIRE ÎN BUCĂTĂRIA NOASTRĂ', nl: 'EEN KIJKJE IN ONZE KEUKEN' , sq: 'NJË VËSHTRIM NË KUZHINËN TONË', ku: 'LI MATBAXA ME BINÊRE'},
  contactKicker: { de: 'BESUCH UNS', en: 'VISIT US', tr: 'BİZİ ZİYARET ET', ro: 'VIZITEAZĂ-NE', nl: 'BEZOEK ONS' , sq: 'NA VIZITO', ku: 'SERDANA ME BIKE'},
  contactTitle: { de: 'So findest du uns', en: 'How to find us', tr: 'Bizi nasıl bulursun', ro: 'Cum ne găsești', nl: 'Zo vind je ons' , sq: 'Kështu na gjen', ku: 'Bi vî rengî tu me dibînî'},
  contactRoute: { de: '📍 Route planen', en: '📍 Get directions', tr: '📍 Yol tarifi al', ro: '📍 Planifică traseul', nl: '📍 Route plannen' , sq: '📍 Planifiko itinerarin', ku: '📍 Rêyê plansaz bike'},
  weiter: { de: 'Weiter →', en: 'Next →', tr: 'İleri →', ro: 'Continuă →', nl: 'Verder →' , sq: 'Vazhdo →', ku: 'Bidomîne →'},
  zurueck: { de: 'Zurück', en: 'Back', tr: 'Geri', ro: 'Înapoi', nl: 'Terug' , sq: 'Prapa', ku: 'Vegere'},
  abbrechen: { de: 'Abbrechen', en: 'Cancel', tr: 'İptal', ro: 'Anulează', nl: 'Annuleren' , sq: 'Anulo', ku: 'Betal bike'},
  hinzufuegen: { de: 'Hinzufügen', en: 'Add', tr: 'Ekle', ro: 'Adaugă', nl: 'Toevoegen' , sq: 'Shto', ku: 'Zêde bike'},
  toCart: { de: 'Zum Warenkorb', en: 'Add to cart', tr: 'Sepete ekle', ro: 'Adaugă în coș', nl: 'In winkelwagen' , sq: 'Në shportë', ku: 'Bo selikê'},
  gesamt: { de: 'Gesamt', en: 'Total', tr: 'Toplam', ro: 'Total', nl: 'Totaal' , sq: 'Gjithsej', ku: 'Bi Tevayî'},
  waSend: { de: 'Per WhatsApp senden', en: 'Send via WhatsApp', tr: 'WhatsApp ile gönder', ro: 'Trimite prin WhatsApp', nl: 'Versturen via WhatsApp' , sq: 'Dërgo përmes WhatsApp', ku: 'Bi WhatsApp bişîne'},
  cartEmpty: { de: 'Dein Warenkorb ist leer.', en: 'Your cart is empty.', tr: 'Sepetin boş.', ro: 'Coșul tău este gol.', nl: 'Je winkelwagen is leeg.' , sq: 'Shporta jote është bosh.', ku: 'Selika te vala ye.'},
  skip: { de: 'Nein danke, überspringen', en: 'No thanks, skip', tr: 'Hayır teşekkürler, geç', ro: 'Nu, mulțumesc, sari peste', nl: 'Nee bedankt, overslaan' , sq: 'Jo faleminderit, kalo', ku: 'Na spas, derbas bike'},
  yourName: { de: 'Dein Name', en: 'Your name', tr: 'Adın', ro: 'Numele tău', nl: 'Je naam' , sq: 'Emri yt', ku: 'Navê te'},
  groupStart: { de: 'Neue Gruppenbestellung starten', en: 'Start a new group order', tr: 'Yeni grup siparişi başlat', ro: 'Începe o comandă de grup nouă', nl: 'Nieuwe groepsbestelling starten' , sq: 'Fillo porosi të re në grup', ku: 'Sifarişeke nû ya komê dest pê bike'},
  groupJoin: { de: 'Mit Code beitreten', en: 'Join with code', tr: 'Kod ile katıl', ro: 'Alătură-te cu cod', nl: 'Deelnemen met code' , sq: 'Bashkohu me kod', ku: 'Bi kodê tevlî bibe'},
  groupSubmit: { de: 'Meine Bestellung abschicken', en: 'Submit my order', tr: 'Siparişimi gönder', ro: 'Trimite comanda mea', nl: 'Mijn bestelling versturen' , sq: 'Dërgo porosinë time', ku: 'Sifarişa xwe bişîne'},
  groupSendFinal: { de: 'Gesamtbestellung an WhatsApp senden', en: 'Send full order via WhatsApp', tr: 'Toplam siparişi WhatsApp\'a gönder', ro: 'Trimite comanda totală prin WhatsApp', nl: 'Volledige bestelling versturen via WhatsApp' , sq: 'Dërgo porosinë e plotë në WhatsApp', ku: 'Sifarişa giştî bi WhatsApp bişîne'},
  groupAlreadySent: { de: 'hat die Bestellung bereits gesendet. Du musst nichts weiter tun.', en: 'has already sent the order. You don\'t need to do anything else.', tr: 'siparişi zaten gönderdi. Senin bir şey yapmana gerek yok.', ro: 'a trimis deja comanda. Nu mai trebuie să faci nimic.', nl: 'heeft de bestelling al verstuurd. Je hoeft verder niets te doen.' , sq: 'e ka dërguar tashmë porosinë. Nuk duhet të bësh asgjë tjetër.', ku: 'sifariş jixwe şandiye. Tu ne hewce yî tiştekî din bikî.'},
  titleWa: { de: 'WHATSAPP BESTELLUNG', en: 'WHATSAPP ORDER', tr: 'WHATSAPP SİPARİŞ', ro: 'COMANDĂ WHATSAPP', nl: 'WHATSAPP BESTELLING' , sq: 'POROSI ME WHATSAPP', ku: 'SIFARIŞA WHATSAPP'},
  titleBuilder: { de: 'DEIN DÖNER', en: 'YOUR DÖNER', tr: 'SENİN DÖNERİN', ro: 'KEBAP-UL TĂU', nl: 'JOUW DÖNER' , sq: 'DÖNERI YT', ku: 'DÖNERÊ TE'},
  titleGroup: { de: 'GRUPPENBESTELLUNG', en: 'GROUP ORDER', tr: 'GRUP SİPARİŞİ', ro: 'COMANDĂ DE GRUP', nl: 'GROEPSBESTELLING' , sq: 'POROSI NË GRUP', ku: 'SIFARIŞA KOMÊ'},
  titleStaff: { de: 'PERSONAL-BEREICH', en: 'STAFF AREA', tr: 'PERSONEL ALANI', ro: 'ZONĂ PERSONAL', nl: 'PERSONEELSGEDEELTE' , sq: 'ZONA E STAFIT', ku: 'QADA KARMENDAN'},
  titleLoyalty: { de: 'TREUEKARTE', en: 'LOYALTY CARD', tr: 'SADAKAT KARTI', ro: 'CARD DE FIDELITATE', nl: 'SPAARKAART' , sq: 'KARTA E BESNIKËRISË', ku: 'KARTA DILSOZÎYÊ'},
  weekendOnlyToday: { de: '🎉 NUR HEUTE — SAMSTAG', en: '🎉 TODAY ONLY — SATURDAY', tr: '🎉 SADECE BUGÜN — CUMARTESİ', ro: '🎉 DOAR ASTĂZI — SÂMBĂTĂ', nl: '🎉 ALLEEN VANDAAG — ZATERDAG' , sq: '🎉 VETËM SOT — E SHTUNË', ku: '🎉 TENÊ ÎRO — ŞEMÎ'},
  weekendOfferTitle: { de: 'Wochenende-Angebot!', en: 'Weekend Special!', tr: 'Hafta Sonu Fırsatı!', ro: 'Ofertă de Weekend!', nl: 'Weekendaanbieding!' , sq: 'Oferta e fundjavës!', ku: 'Pêşniyara Dawiya Hefteyê!'},
  weekendPizzaTitle: { de: '🍕 28cm Pizza + Dose Getränk', en: '🍕 28cm Pizza + Canned Drink', tr: '🍕 28cm Pizza + Kutu İçecek', ro: '🍕 Pizza 28cm + Băutură la doză', nl: '🍕 28cm Pizza + Blikje drinken' , sq: '🍕 Picë 28cm + Pije kanaçe', ku: '🍕 Pizza 28cm + Vexwarina qutîkirî'},
  weekendPizzaSub: { de: 'Wähle deine Wunschpizza aus unserer ganzen Pizzakarte!', en: 'Choose your favorite pizza from our whole pizza menu!', tr: 'Tüm pizza menümüzden istediğin pizzayı seç!', ro: 'Alege pizza preferată din întreg meniul nostru de pizza!', nl: 'Kies je favoriete pizza uit onze hele pizzakaart!' , sq: 'Zgjidh picën tënde të preferuar nga e gjithë menuja jonë e picave!', ku: 'Ji tevahiya menûya me ya pizzayan pizzaya xwe hilbijêre!'},
  choosePizza: { de: 'Pizza auswählen →', en: 'Choose pizza →', tr: 'Pizza seç →', ro: 'Alege pizza →', nl: 'Kies pizza →' , sq: 'Zgjidh picën →', ku: 'Pizzayê hilbijêre →'},
  chooseMeat: { de: 'FLEISCH WÄHLEN:', en: 'CHOOSE MEAT:', tr: 'ET SEÇ:', ro: 'ALEGE CARNEA:', nl: 'KIES VLEES:' , sq: 'ZGJIDH MISHIN:', ku: 'GOŞTÊ HILBIJÊRE:'},
  included: { de: 'inklusive', en: 'included', tr: 'dahil', ro: 'inclus', nl: 'inbegrepen' , sq: 'e përfshirë', ku: 'tê de'},
  addToOrder: { de: 'Zur Bestellung hinzufügen', en: 'Add to order', tr: 'Siparişe ekle', ro: 'Adaugă la comandă', nl: 'Toevoegen aan bestelling' , sq: 'Shto te porosia', ku: 'Li sifarişê zêde bike'},
  chooseArrow: { de: 'Auswählen →', en: 'Choose →', tr: 'Seç →', ro: 'Alege →', nl: 'Kies →' , sq: 'Zgjidh →', ku: 'Hilbijêre →'},
  weekendTeaserOnly: { de: '🎉 Nur Samstag:', en: '🎉 Saturday only:', tr: '🎉 Sadece Cumartesi:', ro: '🎉 Doar sâmbătă:', nl: '🎉 Alleen zaterdag:' , sq: '🎉 Vetëm të shtunën:', ku: '🎉 Tenê Şemî:'},
  lunchOffer: { de: 'MITTAGSANGEBOT · 9,50 €', en: 'LUNCH SPECIAL · €9.50', tr: 'ÖĞLE FIRSATI · 9,50 €', ro: 'OFERTĂ DE PRÂNZ · 9,50 €', nl: 'LUNCHAANBIEDING · € 9,50' , sq: 'OFERTA E DREKËS · 9,50 €', ku: 'PÊŞNIYARA NAVROJÊ · 9,50 €'},
  lunchOfferInactive: { de: 'Mo.–Fr. 11:30–14:00 Uhr · inkl. Getränk', en: 'Mon–Fri 11:30 AM–2:00 PM · incl. drink', tr: 'Pzt–Cuma 11:30–14:00 · içecek dahil', ro: 'Lun–Vin 11:30–14:00 · include băutură', nl: 'Ma–vr 11:30–14:00 uur · incl. drankje' , sq: 'Hën–Pre 11:30–14:00 · me pije të përfshirë', ku: 'Duş–În 11:30–14:00 · bi vexwarinê ve'},
  lunchOfferItems: { de: '28cm Pizza · Salat · Schnitzel · Nudelgericht', en: '28cm Pizza · Salad · Schnitzel · Pasta dish', tr: '28cm Pizza · Salata · Şnitzel · Makarna', ro: 'Pizza 28cm · Salată · Șnițel · Paste', nl: '28cm Pizza · Salade · Schnitzel · Pastagerecht' , sq: 'Picë 28cm · Sallatë · Shnicel · Gjellë makaronash', ku: 'Pizza 28cm · Salate · Şnîtzel · Xwarina makarnayê'},
  wheelPrompt: { de: 'Dreh am Glücksrad, bevor du bestellst!', en: 'Spin the lucky wheel before you order!', tr: 'Sipariş vermeden önce şans çarkını çevir!', ro: 'Învârte roata norocului înainte de a comanda!', nl: 'Draai aan het geluksrad voordat je bestelt!' , sq: 'Rrotullo rrotën e fatit para se të porositësh!', ku: 'Berî sifariş bidî çerxa bextê bizivirîne!'},
  wheelSub: { de: 'Gewinne z. B. 10% Rabatt, ein Gratis-Getränk, Gratis-Pommes oder Chicken Nuggets 🎁', en: 'Win e.g. 10% off, a free drink, free fries or chicken nuggets 🎁', tr: 'Örneğin %10 indirim, ücretsiz içecek, ücretsiz patates veya nugget kazan 🎁', ro: 'Câștigă de ex. 10% reducere, o băutură gratuită, cartofi prăjiți gratuiți sau nuggets 🎁', nl: 'Win bijv. 10% korting, een gratis drankje, gratis friet of chicken nuggets 🎁' , sq: 'Fito p.sh. 10% zbritje, një pije falas, patate falas ose nagets pule 🎁', ku: 'Mînak 10% daxistin, vexwarineke belaş, çîpsên belaş an nagetsên mirîşkê bi dest bixe 🎁'},
  showCodeAtCounter: { de: 'Zeig diesen Code an der Kasse:', en: 'Show this code at the counter:', tr: 'Bu kodu kasada göster:', ro: 'Arată acest cod la casă:', nl: 'Toon deze code bij de kassa:' , sq: 'Trego këtë kod te arka:', ku: 'Vê kodê li kasayê nîşan bide:'},
  noExtraWin: { de: 'Diesmal kein Extra-Gewinn', en: 'No extra win this time', tr: 'Bu sefer ekstra kazanç yok', ro: 'De data aceasta fără premiu suplimentar', nl: 'Deze keer geen extra prijs' , sq: 'Këtë herë pa fitore shtesë', ku: 'Vê carê xelateke din tune'},
  thanksPlaying: { de: 'Aber danke fürs Mitspielen — beim nächsten Mal mehr Glück!', en: 'But thanks for playing — more luck next time!', tr: 'Ama katıldığın için teşekkürler — bir dahaki sefere daha çok şans!', ro: 'Dar îți mulțumim că ai jucat — mai mult noroc data viitoare!', nl: 'Maar bedankt voor het meedoen — volgende keer meer geluk!' , sq: 'Por faleminderit që luajte — më shumë fat herën tjetër!', ku: 'Lê spas ji bo lîstinê — cara din bextê zêdetir!'},
  spinning: { de: 'Dreht sich…', en: 'Spinning…', tr: 'Dönüyor…', ro: 'Se învârte…', nl: 'Draait…' , sq: 'Po rrotullohet…', ku: 'Dizivire…'},
  spinNow: { de: 'Jetzt drehen!', en: 'Spin now!', tr: 'Şimdi çevir!', ro: 'Învârte acum!', nl: 'Draai nu!' , sq: 'Rrotullo tani!', ku: 'Niha bizivirîne!'},
  closedTodayTitle: { de: 'Heute Ruhetag', en: 'Closed today', tr: 'Bugün kapalı', ro: 'Astăzi închis', nl: 'Vandaag gesloten' , sq: 'Sot mbyllur', ku: 'Îro girtî'},
  closedTodaySub: { de: 'Wir haben dienstags geschlossen — ab morgen wieder ab 11:30 Uhr für dich da!', en: "We're closed on Tuesdays — back for you tomorrow from 11:30 AM!", tr: 'Salı günleri kapalıyız — yarından itibaren 11:30\'dan itibaren yine buradayız!', ro: 'Suntem închiși marțea — revenim mâine de la ora 11:30!', nl: 'Wij zijn dinsdag gesloten — morgen weer open vanaf 11:30 uur!' , sq: 'Ne jemi mbyllur të martave — nesër jemi përsëri për ty nga ora 11:30!', ku: 'Em Sêşeman girtî ne — sibê ji saet 11:30 ve dîsa ji bo te vekirî ne!'},
  upsellTitle: { de: 'Möchtest du noch etwas dazu?', en: 'Would you like anything else?', tr: 'Yanında bir şey ister misin?', ro: 'Mai dorești ceva pe lângă?', nl: 'Wil je er nog iets bij?' , sq: 'Do të doje diçka tjetër?', ku: 'Tu tiştekî din jî dixwazî?'},
  upsellSub: { de: 'Diese Klassiker passen perfekt zu deiner Bestellung!', en: 'These classics go perfectly with your order!', tr: 'Bu klasikler siparişine mükemmel uyar!', ro: 'Aceste clasice se potrivesc perfect cu comanda ta!', nl: 'Deze klassiekers passen perfect bij je bestelling!' , sq: 'Këto klasikë shkojnë përsosur me porosinë tënde!', ku: 'Van klasîkan bi sifarişa te re baş têkildar in!'},
  drinksSub: { de: 'Kalt und erfrischend zu deiner Bestellung!', en: 'Cold and refreshing with your order!', tr: 'Siparişine soğuk ve ferahlatıcı bir ek!', ro: 'Rece și răcoritor alături de comanda ta!', nl: 'Lekker fris en koud bij je bestelling!' , sq: 'E ftohtë dhe freskuese me porosinë tënde!', ku: 'Sar û vejîner bi sifarişa te re!'},
  continueToOrder: { de: 'Weiter zur Bestellung', en: 'Continue to order', tr: 'Siparişe devam et', ro: 'Continuă spre comandă', nl: 'Verder naar bestelling' , sq: 'Vazhdo te porosia', ku: 'Here ser sifarişê'},
  wheelSpinOnceMsg: { de: 'Dreh einmal — dein Gewinn wird automatisch zur Bestellung hinzugefügt!', en: 'Spin once — your prize will be added to the order automatically!', tr: 'Bir kez çevir — kazandığın ödül otomatik olarak siparişe eklenir!', ro: 'Învârte o dată — premiul tău va fi adăugat automat la comandă!', nl: 'Draai één keer — je prijs wordt automatisch aan de bestelling toegevoegd!' , sq: 'Rrotullo një herë — fitorja jote shtohet automatikisht te porosia!', ku: 'Carekê bizivirîne — xelata te bixweber li sifarişê tê zêdekirin!'},
  confirmPickupNote: { de: 'Die Abholzeit bestätigen wir euch direkt per WhatsApp-Antwort.', en: "We'll confirm the pickup time directly via WhatsApp reply.", tr: 'Teslim alma saatini WhatsApp üzerinden doğrudan onaylayacağız.', ro: 'Vă confirmăm ora de ridicare direct prin răspuns pe WhatsApp.', nl: 'We bevestigen de ophaaltijd rechtstreeks via WhatsApp.' , sq: 'Orën e marrjes do ta konfirmojmë direkt me përgjigje në WhatsApp.', ku: 'Em ê dema standinê rasterast bi bersiveke WhatsApp piştrast bikin.'},
  chooseBase: { de: 'Wähle deine Basis', en: 'Choose your base', tr: 'Bazını seç', ro: 'Alege baza', nl: 'Kies je basis' , sq: 'Zgjidh bazën tënde', ku: 'Bingeha xwe hilbijêre'},
  chooseBaseSub: { de: 'Wie soll dein Döner serviert werden?', en: 'How would you like your Döner served?', tr: 'Dönerin nasıl servis edilsin?', ro: 'Cum dorești să fie servit kebap-ul tău?', nl: 'Hoe wil je je Döner geserveerd hebben?' , sq: 'Si dëshiron ta shërbejmë Dönerin tënd?', ku: 'Döner çawa were pêşkêşkirin?'},
  chooseMeatTitle: { de: 'Wähle dein Lieblingsfleisch.', en: 'Choose your favorite meat.', tr: 'Favori etini seç.', ro: 'Alege carnea preferată.', nl: 'Kies je favoriete vlees.' , sq: 'Zgjidh mishin tënd të preferuar.', ku: 'Goştê xwe yê hezkirî hilbijêre.'},
  chooseSauceTitle: { de: 'Welche Soße?', en: 'Which sauce?', tr: 'Hangi sos?', ro: 'Ce sos?', nl: 'Welke saus?' , sq: 'Cila salcë?', ku: 'Kîjan soz?'},
  chooseSauceSub: { de: 'Eine Soße aussuchen.', en: 'Pick one sauce.', tr: 'Bir sos seç.', ro: 'Alege un sos.', nl: 'Kies één saus.' , sq: 'Zgjidh një salcë.', ku: 'Sozekê hilbijêre.'},
  chooseExtrasSub: { de: 'So viele du möchtest — optional.', en: 'As many as you like — optional.', tr: 'İstediğin kadar — isteğe bağlı.', ro: 'Câte dorești — opțional.', nl: 'Zoveel als je wilt — optioneel.' , sq: 'Sa shumë të duash — opsionale.', ku: 'Çend ku tu bixwazî — vebijarkî.'},
  doenerReadyTitle: { de: 'Dein Döner ist fertig! 🎉', en: 'Your Döner is ready! 🎉', tr: 'Dönerin hazır! 🎉', ro: 'Kebap-ul tău este gata! 🎉', nl: 'Jouw Döner is klaar! 🎉' , sq: 'Döneri yt është gati! 🎉', ku: 'Dönerê te amade ye! 🎉'},
  doenerReadySub: { de: 'Kurz prüfen und abschicken.', en: 'Quickly check and send.', tr: 'Kısaca kontrol et ve gönder.', ro: 'Verifică rapid și trimite.', nl: 'Snel controleren en versturen.' , sq: 'Kontrollo shkurt dhe dërgo.', ku: 'Kurt kontrol bike û bişîne.'},
  backToOrder: { de: 'Zurück zur Bestellung', en: 'Back to order', tr: 'Siparişe geri dön', ro: 'Înapoi la comandă', nl: 'Terug naar bestelling' , sq: 'Kthehu te porosia', ku: 'Vegere ser sifarişê'},
  wheelTitle: { de: 'Glücksrad 🎡', en: 'Lucky Wheel 🎡', tr: 'Şans Çarkı 🎡', ro: 'Roata Norocului 🎡', nl: 'Geluksrad 🎡' , sq: 'Rrota e Fatit 🎡', ku: 'Çerxa Bextê 🎡'},
  groupStep1End: { de: 'und erhält einen Code.', en: 'and gets a code.', tr: 've bir kod alır.', ro: 'și primește un cod.', nl: 'en krijgt een code.' , sq: 'dhe merr një kod.', ku: 'û kodekê digire.'},
  groupStep2: { de: 'Diesen Code per WhatsApp mit Freunden teilen.', en: 'Share this code with friends via WhatsApp.', tr: 'Bu kodu WhatsApp üzerinden arkadaşlarınla paylaş.', ro: 'Distribuie acest cod prietenilor prin WhatsApp.', nl: 'Deel deze code met vrienden via WhatsApp.' , sq: 'Ndaj këtë kod me shokët përmes WhatsApp.', ku: 'Vê kodê bi WhatsApp bi hevalan re parve bike.'},
  groupStep3Mid: { de: '„Mit Code beitreten"', en: '"Join with code"', tr: '"Kod ile katıl"', ro: '„Alătură-te cu cod"', nl: '"Deelnemen met code"' , sq: '\\"Bashkohu me kod\\"', ku: '\\"Bi kodê tevlî bibe\\"'},
  groupStep3End: { de: ', gibt den Code ein und wählt seine eigenen Speisen aus.', en: ', enters the code and chooses their own food.', tr: ', kodu girer ve kendi yemeklerini seçer.', ro: ', introduce codul și își alege propriile mâncăruri.', nl: ', voert de code in en kiest zijn eigen gerechten.' , sq: ', fut kodin dhe zgjedh gjellët e veta.', ku: ', kodê dinivîse û xwarinên xwe hilbijêre.'},
  groupStep4: { de: 'Am Ende wird alles zu einer gemeinsamen Bestellung zusammengefasst und per WhatsApp an uns geschickt.', en: 'At the end, everything is combined into one shared order and sent to us via WhatsApp.', tr: 'Sonunda her şey ortak bir siparişte birleştirilir ve bize WhatsApp üzerinden gönderilir.', ro: 'La final, totul este combinat într-o singură comandă și ne este trimis prin WhatsApp.', nl: 'Aan het einde wordt alles samengevoegd tot één gezamenlijke bestelling en naar ons verstuurd via WhatsApp.' , sq: 'Në fund gjithçka bashkohet në një porosi të përbashkët dhe dërgohet te ne përmes WhatsApp.', ku: 'Di dawiyê de her tişt dibe sifarişeke hevpar û bi WhatsApp ji me re tê şandin.'},
  shareCodeWithGroup: { de: 'Teile diesen Code mit deiner Gruppe:', en: 'Share this code with your group:', tr: 'Bu kodu grubunla paylaş:', ro: 'Distribuie acest cod grupului tău:', nl: 'Deel deze code met je groep:' , sq: 'Ndaje këtë kod me grupin tënd:', ku: 'Vê kodê bi koma xwe re parve bike:'},
  continueToMyOrder: { de: 'Weiter zu meiner Bestellung', en: 'Continue to my order', tr: 'Siparişime devam et', ro: 'Continuă la comanda mea', nl: 'Verder naar mijn bestelling' , sq: 'Vazhdo te porosia ime', ku: 'Here ser sifarişa xwe'},
  continueToMenu: { de: 'Weiter zur Speisekarte', en: 'Continue to the menu', tr: 'Menüye devam et', ro: 'Continuă la meniu', nl: 'Verder naar het menu' , sq: 'Vazhdo te menuja', ku: 'Here ser menûyê'},
  orderAdded: { de: '✓ Deine Bestellung wurde hinzugefügt', en: '✓ Your order has been added', tr: '✓ Siparişin eklendi', ro: '✓ Comanda ta a fost adăugată', nl: '✓ Je bestelling is toegevoegd' , sq: '✓ Porosia jote u shtua', ku: '✓ Sifarişa te hate zêdekirin'},
  editMyOrder: { de: '+ Meine Bestellung ändern', en: '+ Edit my order', tr: '+ Siparişimi değiştir', ro: '+ Modifică-mi comanda', nl: '+ Mijn bestelling wijzigen' , sq: '+ Ndrysho porosinë time', ku: '+ Sifarişa xwe biguherîne'},
  backToOverview: { de: 'Zurück zur Übersicht', en: 'Back to overview', tr: 'Genel bakışa dön', ro: 'Înapoi la prezentare generală', nl: 'Terug naar overzicht' , sq: 'Kthehu te përmbledhja', ku: 'Vegere ser pêşdîtinê'},
  wheelGrandMsg: { de: 'Dein Gewinn wird automatisch zur Gesamtbestellung hinzugefügt!', en: 'Your prize will be added to the group order automatically!', tr: 'Kazandığın ödül otomatik olarak toplam siparişe eklenir!', ro: 'Premiul tău va fi adăugat automat la comanda totală!', nl: 'Je prijs wordt automatisch toegevoegd aan de totale bestelling!' , sq: 'Fitorja jote shtohet automatikisht te porosia e përgjithshme!', ku: 'Xelata te bixweber li sifarişa giştî tê zêdekirin!'},
  continueToOverview: { de: 'Weiter zur Übersicht', en: 'Continue to overview', tr: 'Genel bakışa devam et', ro: 'Continuă la prezentarea generală', nl: 'Verder naar overzicht' , sq: 'Vazhdo te përmbledhja', ku: 'Here ser pêşdîtinê'},
  staffWheelCodeTitle: { de: '🎡 Glücksrad-Code', en: '🎡 Wheel code', tr: '🎡 Çark kodu', ro: '🎡 Cod roată', nl: '🎡 Radcode' , sq: '🎡 Kodi i Rrotës së Fatit', ku: '🎡 Koda Çerxa Bextê'},
  codeNotFound: { de: 'Code nicht gefunden.', en: 'Code not found.', tr: 'Kod bulunamadı.', ro: 'Cod negăsit.', nl: 'Code niet gevonden.' , sq: 'Kodi nuk u gjet.', ku: 'Kod nehat dîtin.'},
  redeem: { de: 'Einlösen', en: 'Redeem', tr: 'Kullan', ro: 'Utilizează', nl: 'Inwisselen' , sq: 'Përdor', ku: 'Bikar bîne'},
  confirmRedeem: { de: 'Einlösen bestätigen', en: 'Confirm redemption', tr: 'Kullanımı onayla', ro: 'Confirmă utilizarea', nl: 'Inwisselen bevestigen' , sq: 'Konfirmo përdorimin', ku: 'Bikaranînê piştrast bike'},
  loyaltyNoPhone: { de: 'Keine Telefonnummer nötig — deine Karte läuft über einen persönlichen Code.', en: 'No phone number needed — your card works via a personal code.', tr: 'Telefon numarası gerekmez — kartın kişisel bir kodla çalışır.', ro: 'Nu este nevoie de număr de telefon — cardul tău funcționează printr-un cod personal.', nl: 'Geen telefoonnummer nodig — je kaart werkt via een persoonlijke code.' , sq: 'Nuk nevojitet numër telefoni — karta jote funksionon me një kod personal.', ku: 'Ne hewceyî hejmara têlefonê ye — karta te bi koda şexsî dixebite.'},
  codeDoesntExist: { de: 'Diesen Code gibt es nicht.', en: "This code doesn't exist.", tr: 'Bu kod mevcut değil.', ro: 'Acest cod nu există.', nl: 'Deze code bestaat niet.' , sq: 'Ky kod nuk ekziston.', ku: 'Ev kod nîne.'},
  showCodeForStamp: { de: 'Zeig deinen Code an der Kasse, damit wir einen Stempel hinzufügen können.', en: 'Show your code at the counter so we can add a stamp.', tr: 'Damga ekleyebilmemiz için kodunu kasada göster.', ro: 'Arată-ți codul la casă pentru a adăuga o ștampilă.', nl: 'Toon je code bij de kassa zodat we een stempel kunnen toevoegen.' , sq: 'Trego kodin tënd te arka që të shtojmë një vulë.', ku: 'Koda xwe li kasayê nîşan bide da ku em morekê zêde bikin.'},
  dailyRecommendation: { de: 'TAGESEMPFEHLUNG', en: "TODAY'S PICKS", tr: 'GÜNÜN ÖNERİSİ', ro: 'RECOMANDAREA ZILEI', nl: 'AANBEVELING VAN DE DAG' , sq: 'REKOMANDIMI I DITËS', ku: 'PÊŞNIYARA ROJÊ'},
  onlyLeft: { de: 'Nur noch', en: 'Only', tr: 'Sadece', ro: 'Doar', nl: 'Nog maar' , sq: 'Vetëm edhe', ku: 'Tenê hîn'},
  minutesLeft: { de: 'Minuten!', en: 'minutes left!', tr: 'dakika kaldı!', ro: 'minute rămase!', nl: 'minuten over!' , sq: 'minuta!', ku: 'deqîqe!'},
  chooseMeatQ: { de: 'Welches Fleisch?', en: 'Which meat?', tr: 'Hangi et?', ro: 'Ce carne?', nl: 'Welk vlees?' , sq: 'Cili mish?', ku: 'Kîjan goşt?'},
  extrasQ: { de: 'Extras dazu?', en: 'Extras?', tr: 'Ekstra ister misin?', ro: 'Extra?', nl: 'Extra’s erbij?' , sq: 'Ekstra?', ku: 'Zêde?'},
  rowBasis: { de: 'Basis', en: 'Base', tr: 'Baz', ro: 'Bază', nl: 'Basis' , sq: 'Baza', ku: 'Bingeh'},
  rowMeat: { de: 'Fleisch', en: 'Meat', tr: 'Et', ro: 'Carne', nl: 'Vlees' , sq: 'Mishi', ku: 'Goşt'},
  rowSauce: { de: 'Soße', en: 'Sauce', tr: 'Sos', ro: 'Sos', nl: 'Saus' , sq: 'Salca', ku: 'Soz'},
  rowExtras: { de: 'Extras', en: 'Extras', tr: 'Ekstralar', ro: 'Extra', nl: 'Extra’s' , sq: 'Ekstrat', ku: 'Zêde'},
  rowPrice: { de: 'Preis', en: 'Price', tr: 'Fiyat', ro: 'Preț', nl: 'Prijs' , sq: 'Çmimi', ku: 'Biha'},
  freeLabel: { de: 'gratis', en: 'free', tr: 'ücretsiz', ro: 'gratuit', nl: 'gratis' , sq: 'falas', ku: 'belaş'},
  continueBtn: { de: 'Weiter', en: 'Continue', tr: 'İleri', ro: 'Continuă', nl: 'Verder' , sq: 'Vazhdo', ku: 'Bidomîne'},
  wheelThresholdPrefix: { de: '🎡 Noch', en: '🎡 Only', tr: '🎡 Sadece', ro: '🎡 Doar', nl: '🎡 Nog maar' , sq: '🎡 Edhe', ku: '🎡 Hîn'},
  wheelThresholdSuffix: { de: 'bis zum Glücksrad — ab 30,00 € Bestellwert!', en: 'until the lucky wheel — from €30.00 order value!', tr: 'şans çarkına kadar — 30,00 € üzeri siparişte!', ro: 'până la roata norocului — de la o comandă de 30,00 €!', nl: 'tot het geluksrad — vanaf € 30,00 bestelwaarde!' , sq: 'deri te rrota e fatit — nga 30,00 € vlerë porosie!', ku: 'heta çerxa bextê — ji nirxa sifarişê 30,00 € pê ve!'},
  wonPrefix: { de: 'Gewonnen:', en: 'Won:', tr: 'Kazandın:', ro: 'Câștigat:', nl: 'Gewonnen:' , sq: 'Fituar:', ku: 'Hate bidestxistin:'},
  wonSuffix: { de: '— wird mitgeschickt', en: '— will be included', tr: '— siparişe eklenecek', ro: '— va fi inclus', nl: '— wordt meegestuurd' , sq: '— do të dërgohet bashkë', ku: '— dê were şandin'},
  groupStartBtn: { de: 'Neue Gruppenbestellung starten', en: 'Start a new group order', tr: 'Yeni grup siparişi başlat', ro: 'Începe o comandă de grup nouă', nl: 'Nieuwe groepsbestelling starten' , sq: 'Fillo porosi të re në grup', ku: 'Sifarişeke nû ya komê dest pê bike'},
  howItWorks: { de: "👥 So funktioniert's:", en: '👥 How it works:', tr: '👥 Nasıl çalışır:', ro: '👥 Cum funcționează:', nl: '👥 Zo werkt het:' , sq: '👥 Si funksionon:', ku: '👥 Bi vî rengî dixebite:'},
  groupStep1Start: { de: 'Eine Person tippt auf', en: 'One person taps', tr: 'Bir kişi', ro: 'O persoană apasă pe', nl: 'Eén persoon tikt op' , sq: 'Një person prek', ku: 'Kesek li ser dide'},
  groupStep3Start: { de: 'Jede/r tippt auf', en: 'Everyone taps', tr: 'Herkes', ro: 'Fiecare apasă pe', nl: 'Iedereen tikt op' , sq: 'Secili/a prek', ku: 'Her kes li ser dide'},
  groupStep3Btn: { de: '„Mit Code beitreten"', en: '"Join with code"', tr: '"Kod ile katıl"', ro: '„Alătură-te cu cod"', nl: '"Deelnemen met code"' , sq: '\\"Bashkohu me kod\\"', ku: '\\"Bi kodê tevlî bibe\\"'},
  codePlaceholder: { de: 'Code z. B. K7XQ2', en: 'Code e.g. K7XQ2', tr: 'Kod örn. K7XQ2', ro: 'Cod ex. K7XQ2', nl: 'Code bijv. K7XQ2' , sq: 'Kodi p.sh. K7XQ2', ku: 'Kod mînak K7XQ2'},
  joinBtn: { de: 'Beitreten', en: 'Join', tr: 'Katıl', ro: 'Alătură-te', nl: 'Deelnemen' , sq: 'Bashkohu', ku: 'Tevlî bibe'},
  peopleOrderedSuffix: { de: 'Personen bestellt', en: 'people ordered', tr: 'kişi sipariş verdi', ro: 'persoane au comandat', nl: 'personen besteld' , sq: 'persona porositën', ku: 'kes sifariş dan'},
  refreshBtn: { de: 'Aktualisieren', en: 'Refresh', tr: 'Yenile', ro: 'Reîmprospătează', nl: 'Vernieuwen' , sq: 'Rifresko', ku: 'Nû bike'},
  grandTotalAll: { de: 'Gesamt (alle)', en: 'Total (all)', tr: 'Toplam (hepsi)', ro: 'Total (toți)', nl: 'Totaal (allemaal)' , sq: 'Gjithsej (të gjithë)', ku: 'Bi Tevayî (hemû)'},
  wheelPrizesCountSuffix: { de: 'x Glücksrad-Gewinn wird mitgeschickt', en: 'x wheel prize will be included', tr: 'x çark ödülü siparişe eklenecek', ro: 'x premii de la roată vor fi incluse', nl: 'x radprijs wordt meegestuurd' , sq: 'x fitore nga rrota e fatit do të dërgohet', ku: 'x xelata çerxa bextê dê were şandin'},
  loginBtn: { de: 'Anmelden', en: 'Log in', tr: 'Giriş yap', ro: 'Autentificare', nl: 'Inloggen' , sq: 'Hyr', ku: 'Têkeve'},
  defaultPinNote: { de: 'Standard-PIN: 1234', en: 'Default PIN: 1234', tr: 'Varsayılan PIN: 1234', ro: 'PIN implicit: 1234', nl: 'Standaard-pincode: 1234' , sq: 'PIN standarde: 1234', ku: 'PIN standard: 1234'},
  loyaltyTabLabel: { de: '🎟️ Treuekarte', en: '🎟️ Loyalty card', tr: '🎟️ Sadakat kartı', ro: '🎟️ Card de fidelitate', nl: '🎟️ Spaarkaart' , sq: '🎟️ Karta e besnikërisë', ku: '🎟️ Karta Dilsozîyê'},
  customerCodePh: { de: 'Kunden-Code', en: 'Customer code', tr: 'Müşteri kodu', ro: 'Cod client', nl: 'Klantcode' , sq: 'Kodi i klientit', ku: 'Koda Muşteriyê'},
  searchBtn: { de: 'Suchen', en: 'Search', tr: 'Ara', ro: 'Caută', nl: 'Zoeken' , sq: 'Kërko', ku: 'Bigere'},
  addStampBtn: { de: '+1 Stempel', en: '+1 stamp', tr: '+1 damga', ro: '+1 ștampilă', nl: '+1 stempel' , sq: '+1 vulë', ku: '+1 Mor'},
  prizeCodePh: { de: 'Gewinn-Code', en: 'Prize code', tr: 'Ödül kodu', ro: 'Cod premiu', nl: 'Prijscode' , sq: 'Kodi i fitores', ku: 'Koda Xelatê'},
  alreadyRedeemed: { de: 'Bereits eingelöst', en: 'Already redeemed', tr: 'Zaten kullanıldı', ro: 'Deja utilizat', nl: 'Al ingewisseld' , sq: 'Përdorur tashmë', ku: 'Berê hatiye bikaranîn'},
  validLabel: { de: 'Gültig', en: 'Valid', tr: 'Geçerli', ro: 'Valid', nl: 'Geldig' , sq: 'I vlefshëm', ku: 'Derbasdar'},
  stampAddedMsg: { de: 'Stempel hinzugefügt ✓', en: 'Stamp added ✓', tr: 'Damga eklendi ✓', ro: 'Ștampilă adăugată ✓', nl: 'Stempel toegevoegd ✓' , sq: 'Vula u shtua ✓', ku: 'Mor hate zêdekirin ✓'},
  freePortionRedeemedMsg: { de: 'Gratis-Portion eingelöst ✓', en: 'Free item redeemed ✓', tr: 'Ücretsiz ürün kullanıldı ✓', ro: 'Produs gratuit utilizat ✓', nl: 'Gratis item ingewisseld ✓' , sq: 'Racioni falas u përdor ✓', ku: 'Portîyona belaş hate bikaranîn ✓'},
  redeemedMsg: { de: '✓ Eingelöst', en: '✓ Redeemed', tr: '✓ Kullanıldı', ro: '✓ Utilizat', nl: '✓ Ingewisseld' , sq: '✓ U përdor', ku: '✓ Hate bikaranîn'},
  stampsWord: { de: 'Stempel', en: 'stamps', tr: 'damga', ro: 'ștampile', nl: 'stempels' , sq: 'vula', ku: 'mor'},
  haveCodeLabel: { de: 'ICH HABE SCHON EINEN CODE', en: 'I ALREADY HAVE A CODE', tr: 'ZATEN BİR KODUM VAR', ro: 'AM DEJA UN COD', nl: 'IK HEB AL EEN CODE' , sq: 'UNË KAM TASHMË NJË KOD', ku: 'MIN JIXWE KODEK HEYE'},
  codeExamplePh: { de: 'Z. B. K7XQ2M', en: 'e.g. K7XQ2M', tr: 'Örn. K7XQ2M', ro: 'ex. K7XQ2M', nl: 'bijv. K7XQ2M' , sq: 'P.sh. K7XQ2M', ku: 'Mînak K7XQ2M'},
  showBtn: { de: 'Anzeigen', en: 'Show', tr: 'Göster', ro: 'Afișează', nl: 'Tonen' , sq: 'Trego', ku: 'Nîşan bide'},
  orLabel: { de: '— oder —', en: '— or —', tr: '— veya —', ro: '— sau —', nl: '— of —' , sq: '— ose —', ku: '— an —'},
  createNewCardBtn: { de: 'Neue Treuekarte erstellen', en: 'Create new loyalty card', tr: 'Yeni sadakat kartı oluştur', ro: 'Creează un card nou de fidelitate', nl: 'Nieuwe spaarkaart aanmaken' , sq: 'Krijo kartë të re besnikërie', ku: 'Karteke nû ya dilsozîyê çêke'},
  screenshotNote: { de: '📸 Bitte den Code notieren oder einen Screenshot machen — er ist dein einziger Zugang zur Karte!', en: '📸 Please note the code or take a screenshot — it\'s your only access to the card!', tr: '📸 Lütfen kodu not al veya ekran görüntüsü al — karta tek erişimin bu!', ro: '📸 Notează codul sau fă o captură de ecran — este singurul tău acces la card!', nl: '📸 Noteer de code of maak een screenshot — het is je enige toegang tot de kaart!' , sq: '📸 Ju lutem shënoni kodin ose bëni një pamje ekrani — është aksesi juaj i vetëm te karta!', ku: '📸 Ji kerema xwe kodê not bike an dîmenekê bigire — ev yekane rêya te ya gihîştina kartê ye!'},
  yourCodeLabel: { de: 'DEIN CODE', en: 'YOUR CODE', tr: 'KODUN', ro: 'CODUL TĂU', nl: 'JOUW CODE' , sq: 'KODI YT', ku: 'KODA TE'},
  freeItemEarned: { de: '🎉 Gratis-Portion verdient!', en: '🎉 Free item earned!', tr: '🎉 Ücretsiz ürün kazandın!', ro: '🎉 Produs gratuit câștigat!', nl: '🎉 Gratis item verdiend!' , sq: '🎉 Fitove një racion falas!', ku: '🎉 Te portîyoneke belaş bi dest xist!'},
  stampsUntilFreePrefix: { de: 'Noch', en: 'Only', tr: 'Sadece', ro: 'Mai', nl: 'Nog' , sq: 'Edhe', ku: 'Hîn'},
  stampsUntilFreeSuffix: { de: 'Stempel bis zur Gratis-Portion', en: 'stamps until your free item', tr: 'damga kaldı, ücretsiz ürün kazanacaksın', ro: 'ștampile până la produsul gratuit', nl: 'stempels tot je gratis item' , sq: 'vula deri te racioni falas', ku: 'mor heta portîyona belaş'},
  noteExampleCheese: { de: 'Anmerkung, z.B. ohne Käse', en: 'Note, e.g. no cheese', tr: 'Not, örn. peynirsiz', ro: 'Observație, ex. fără brânză', nl: 'Opmerking, bijv. zonder kaas' , sq: 'Shënim, p.sh. pa djathë', ku: 'Not, mînak bêyî penîr'},
  noteExampleOnions: { de: 'Anmerkung, z.B. ohne Zwiebeln', en: 'Note, e.g. no onions', tr: 'Not, örn. soğansız', ro: 'Observație, ex. fără ceapă', nl: 'Opmerking, bijv. zonder uien' , sq: 'Shënim, p.sh. pa qepë', ku: 'Not, mînak bêyî pîvaz'},
  noteOptional: { de: 'Anmerkung (optional)', en: 'Note (optional)', tr: 'Not (isteğe bağlı)', ro: 'Observație (opțional)', nl: 'Opmerking (optioneel)' , sq: 'Shënim (opsionale)', ku: 'Not (vebijarkî)'},
  pickupTimePh: { de: 'Gewünschte Abholzeit (optional)', en: 'Desired pickup time (optional)', tr: 'İstenen teslim alma saati (isteğe bağlı)', ro: 'Ora de ridicare dorită (opțional)', nl: 'Gewenste ophaaltijd (optioneel)' , sq: 'Ora e dëshiruar e marrjes (opsionale)', ku: 'Dema standinê ya xwestî (vebijarkî)'},
  pickupTimeLabel: { de: 'Abholzeit', en: 'Pickup time', tr: 'Teslim alma saati', ro: 'Ora de ridicare', nl: 'Ophaaltijd' , sq: 'Ora e marrjes', ku: 'Dema Standinê'},
  titlePizzaBuilder: { de: 'DEINE PIZZA', en: 'YOUR PIZZA', tr: 'SENİN PİZZAN', ro: 'PIZZA TA', nl: 'JOUW PIZZA' , sq: 'PICA JOTE', ku: 'PIZZAYA TE'},
  titlePastaBuilder: { de: 'DEINE PASTA', en: 'YOUR PASTA', tr: 'SENİN MAKARNAN', ro: 'PASTA TA', nl: 'JOUW PASTA' , sq: 'PASTA JOTE', ku: 'PASTAYA TE'},
  chooseCreationTitle: { de: 'Was möchtest du zusammenstellen?', en: 'What would you like to build?', tr: 'Ne oluşturmak istersin?', ro: 'Ce dorești să creezi?', nl: 'Wat wil je samenstellen?' , sq: 'Çfarë dëshiron të krijosh?', ku: 'Tu dixwazî çi çêkî?'},
  chooseCreationSub: { de: 'Wähle deine Basis — Schritt für Schritt zu deinem Wunschgericht.', en: 'Choose your base — step by step to your dream dish.', tr: 'Bazını seç — adım adım hayalindeki yemeğe ulaş.', ro: 'Alege baza — pas cu pas spre felul tău preferat.', nl: 'Kies je basis — stap voor stap naar jouw droomgerecht.' , sq: 'Zgjidh bazën tënde — hap pas hapi drejt gjellës që dëshiron.', ku: 'Bingeha xwe hilbijêre — gav bi gav ber bi xwarina xwestî.'},
  buildDoener: { de: 'Baue deinen Döner', en: 'Build your Döner', tr: 'Dönerini Oluştur', ro: 'Construiește-ți Kebap-ul', nl: 'Bouw je Döner' , sq: 'Krijo Dönerin tënd', ku: 'Dönerê xwe çêke'},
  buildPizza: { de: 'Baue deine Pizza', en: 'Build your Pizza', tr: 'Pizzanı Oluştur', ro: 'Construiește-ți Pizza', nl: 'Bouw je Pizza' , sq: 'Krijo picën tënde', ku: 'Pizzaya xwe çêke'},
  buildPasta: { de: 'Baue deine Pasta', en: 'Build your Pasta', tr: 'Makarnanı Oluştur', ro: 'Construiește-ți Pasta', nl: 'Bouw je Pasta' , sq: 'Krijo pastën tënde', ku: 'Pastaya xwe çêke'},
  choosePizzaSize: { de: 'Wähle deine Größe', en: 'Choose your size', tr: 'Boyutunu seç', ro: 'Alege dimensiunea', nl: 'Kies je formaat' , sq: 'Zgjidh madhësinë tënde', ku: 'Mezinahiya xwe hilbijêre'},
  choosePizzaSizeSub: { de: 'Klein oder groß?', en: 'Small or large?', tr: 'Küçük mü büyük mü?', ro: 'Mică sau mare?', nl: 'Klein of groot?' , sq: 'E vogël apo e madhe?', ku: 'Biçûk an mezin?'},
  chooseToppingsSub: { de: 'So viele du möchtest — je 1,00 €.', en: 'As many as you like — €1.00 each.', tr: 'İstediğin kadar — her biri 1,00 €.', ro: 'Câte dorești — 1,00 € fiecare.', nl: 'Zoveel als je wilt — elk € 1,00.' , sq: 'Sa shumë të duash — nga 1,00 € secila.', ku: 'Çend ku tu bixwazî — her yek 1,00 €.'},
  pizzaReadyTitle: { de: 'Deine Pizza ist fertig! 🎉', en: 'Your Pizza is ready! 🎉', tr: 'Pizzan hazır! 🎉', ro: 'Pizza ta este gata! 🎉', nl: 'Jouw Pizza is klaar! 🎉' , sq: 'Pica jote është gati! 🎉', ku: 'Pizzaya te amade ye! 🎉'},
  choosePastaStyle: { de: 'Wähle deinen Stil', en: 'Choose your style', tr: 'Stilini seç', ro: 'Alege stilul', nl: 'Kies je stijl' , sq: 'Zgjidh stilin tënd', ku: 'Şêweya xwe hilbijêre'},
  yaprakWeekendOnly: { de: 'Yaprak Döner gibt es nur freitags, samstags und sonntags. An anderen Tagen leider nicht verfügbar.', en: 'Yaprak Döner is only available on Fridays, Saturdays and Sundays. Not available on other days.', tr: 'Yaprak Döner sadece Cuma, Cumartesi ve Pazar günleri mevcuttur. Diğer günler maalesef yok.', ro: 'Yaprak Döner este disponibil doar vineri, sâmbătă și duminică. În celelalte zile, din păcate, nu.', nl: 'Yaprak Döner is alleen op vrijdag, zaterdag en zondag verkrijgbaar. Andere dagen helaas niet.' , sq: 'Yaprak Döner ofrohet vetëm të premten, të shtunën dhe të dielën. Në ditët e tjera fatkeqësisht nuk ofrohet.', ku: 'Yaprak Döner tenê roja Îni, Şemî û Yekşemê heye. Di rojên din de mixabin nîne.'},
  weekendItemOnly: { de: 'Dieses Gericht gibt es nur freitags, samstags und sonntags. An anderen Tagen leider nicht verfügbar.', en: 'This dish is only available on Fridays, Saturdays and Sundays. Not available on other days.', tr: 'Bu ürün sadece Cuma, Cumartesi ve Pazar günleri mevcuttur. Diğer günler maalesef yok.', ro: 'Acest fel este disponibil doar vineri, sâmbătă și duminică. În celelalte zile, din păcate, nu.', nl: 'Dit gerecht is alleen op vrijdag, zaterdag en zondag verkrijgbaar. Andere dagen helaas niet.' , sq: 'Kjo gjellë ofrohet vetëm të premten, të shtunën dhe të dielën. Në ditët e tjera fatkeqësisht nuk ofrohet.', ku: 'Ev xwarin tenê roja Îni, Şemî û Yekşemê heye. Di rojên din de mixabin nîne.'},
  weekendWarnTitle: { de: 'Nur am Wochenende', en: 'Weekends only', tr: 'Sadece hafta sonu', ro: 'Doar în weekend', nl: 'Alleen in het weekend' , sq: 'Vetëm në fundjavë', ku: 'Tenê Dawiya Hefteyê'},
  statusOpenNow: { de: 'Jetzt geöffnet', en: 'Open now', tr: 'Şu an açık', ro: 'Acum deschis', nl: 'Nu geopend' , sq: 'Hapur tani', ku: 'Niha vekirî ye'},
  statusClosedRestDay: { de: 'Geschlossen · Ruhetag', en: 'Closed · Rest day', tr: 'Kapalı · Tatil günü', ro: 'Închis · Zi liberă', nl: 'Gesloten · Rustdag' , sq: 'Mbyllur · Ditë pushimi', ku: 'Girtî · Roja Vala'},
  statusNotYetOpen: { de: 'Noch geschlossen', en: 'Not open yet', tr: 'Henüz açılmadı', ro: 'Încă închis', nl: 'Nog gesloten' , sq: 'Ende mbyllur', ku: 'Hîn girtî'},
  statusClosed: { de: 'Geschlossen', en: 'Closed', tr: 'Kapalı', ro: 'Închis', nl: 'Gesloten' , sq: 'Mbyllur', ku: 'Girtî'},
  sizeLabel: { de: 'GRÖSSE', en: 'SIZE', tr: 'BOYUT', ro: 'MĂRIME', nl: 'FORMAAT' , sq: 'MADHËSIA', ku: 'MEZINAHÎ'},
  pizzaComboBanner: { de: '🎉 Wochenende-Angebot: Wähle deine 28cm Pizza für {price} inkl. Getränk!', en: '🎉 Weekend deal: Choose your 28cm pizza for {price} incl. drink!', tr: '🎉 Hafta sonu fırsatı: 28cm pizzanı {price} karşılığında içecek dahil seç!', ro: '🎉 Ofertă de weekend: Alege pizza ta de 28cm pentru {price} incl. băutură!', nl: '🎉 Weekendaanbieding: Kies je 28cm pizza voor {price} incl. drankje!' , sq: '🎉 Oferta e fundjavës: Zgjidh picën tënde 28cm për {price} me pije të përfshirë!', ku: '🎉 Pêşniyara Dawiya Hefteyê: Pizzaya xwe ya 28cm ji bo {price} bi vexwarinê ve hilbijêre!'},
  leaveOffer: { de: 'Angebot verlassen', en: 'Leave offer', tr: 'Fırsattan çık', ro: 'Părăsește oferta', nl: 'Aanbieding verlaten' , sq: 'Largohu nga oferta', ku: 'Ji pêşniyarê derkeve'},
  itemAddedToast: { de: 'Zum Warenkorb hinzugefügt', en: 'Added to cart', tr: 'Sepete eklendi', ro: 'Adăugat în coș', nl: 'Toegevoegd aan winkelwagen' , sq: 'U shtua në shportë', ku: 'Li selikê hate zêdekirin'},
  meatTypeLabel: { de: 'FLEISCHART (KOSTENLOS)', en: 'TYPE OF MEAT (FREE)', tr: 'ET TÜRÜ (ÜCRETSİZ)', ro: 'TIP DE CARNE (GRATUIT)', nl: 'SOORT VLEES (GRATIS)' , sq: 'LLOJI I MISHIT (FALAS)', ku: 'CUREYÊ GOŞT (BELAŞ)'},
  meatKalb: { de: 'Kalb/Rind', en: 'Veal/Beef', tr: 'Dana/Kalb', ro: 'Vițel/Vită', nl: 'Kalfs-/rundvlees' , sq: 'Viç/Lopë', ku: 'Golik/Ga'},
  lunchComboTitle: { de: '🍽️ Mittagsangebot', en: '🍽️ Lunch special', tr: '🍽️ Öğle fırsatı', ro: '🍽️ Ofertă de prânz', nl: '🍽️ Lunchaanbieding' , sq: '🍽️ Oferta e drekës', ku: '🍽️ Pêşniyara Navrojê'},
  lunchComboSub: { de: 'Wähle dein Getränk dazu — zusammen nur 9,50 €!', en: 'Choose your drink — together only €9.50!', tr: 'Yanına içeceğini seç — birlikte sadece 9,50 €!', ro: 'Alege băutura — împreună doar 9,50 €!', nl: 'Kies je drankje — samen maar € 9,50!' , sq: 'Zgjidh pijen tënde shtesë — së bashku vetëm 9,50 €!', ku: 'Vexwarina xwe hilbijêre — bi hev re tenê 9,50 €!'},
  lunchComboConfirm: { de: 'Zur Bestellung hinzufügen', en: 'Add to order', tr: 'Siparişe ekle', ro: 'Adaugă la comandă', nl: 'Toevoegen aan bestelling' , sq: 'Shto te porosia', ku: 'Li sifarişê zêde bike'},
  lunchSmallHint: { de: '💡 Tipp: Bei der großen Pizza bekommst du zwischen 11:30–14:00 Uhr ein Getränk gratis dazu!', en: '💡 Tip: With the large pizza you get a free drink between 11:30 AM–2:00 PM!', tr: '💡 İpucu: Büyük pizzayla 11:30–14:00 arası ücretsiz içecek kazanırsın!', ro: '💡 Sfat: La pizza mare primești o băutură gratuită între 11:30–14:00!', nl: '💡 Tip: Bij de grote pizza krijg je tussen 11:30–14:00 uur een gratis drankje!' , sq: '💡 Këshillë: Me picën e madhe merr një pije falas midis orës 11:30–14:00!', ku: '💡 Şîret: Bi pizzaya mezin di navbera saet 11:30–14:00 de vexwarineke belaş bi dest dixî!'},
  pickupEstimate: { de: 'Fertig in ca. 15–20 Minuten', en: 'Ready in approx. 15–20 minutes', tr: 'Yaklaşık 15-20 dakikada hazır', ro: 'Gata în aprox. 15–20 minute', nl: 'Klaar in ca. 15–20 minuten' , sq: 'Gati për rreth 15–20 minuta', ku: 'Nêzîkî 15–20 deqîqeyan de amade ye'},
  allergenInfoBtn: { de: 'ⓘ Allergene & Zusatzstoffe', en: 'ⓘ Allergens & additives', tr: 'ⓘ Alerjen ve katkı maddeleri', ro: 'ⓘ Alergeni și aditivi', nl: 'ⓘ Allergenen & additieven' , sq: 'ⓘ Alergjenët & Aditivët', ku: 'ⓘ Alerjen & Zêdebûyî'},
  recommendedForYou: { de: 'PASST GUT DAZU', en: 'GOES WELL WITH THIS', tr: 'BUNA ÇOK YAKIŞIR', ro: 'SE POTRIVEȘTE BINE', nl: 'PAST HIER GOED BIJ' , sq: 'SHKON MIRË ME KËTË', ku: 'BI VÊ RE BAŞ TÊKILDAR E'},
  groupSubmitBtn: { de: 'Meine Bestellung abschicken', en: 'Submit my order', tr: 'Siparişimi gönder', ro: 'Trimite comanda mea', nl: 'Mijn bestelling versturen' , sq: 'Dërgo porosinë time', ku: 'Sifarişa xwe bişîne'},
  freeDrinkProgress: { de: 'Noch {amount} bis zum 1L-Getränk gratis!', en: 'Only {amount} more for a free 1L drink!', tr: '1L içecek hediye için {amount} kaldı!', ro: 'Mai sunt {amount} pentru o băutură de 1L gratuită!', nl: 'Nog {amount} tot een gratis 1L drankje!' , sq: 'Edhe {amount} deri te pija falas 1L!', ku: 'Hîn {amount} heta vexwarina 1L ya belaş!'},
  freeDrinkUnlocked: { de: '🎉 1L-Getränk gratis freigeschaltet!', en: '🎉 Free 1L drink unlocked!', tr: '🎉 1L içecek hediye kazandın!', ro: '🎉 Băutură de 1L gratuită deblocată!', nl: '🎉 Gratis 1L drankje ontgrendeld!' , sq: '🎉 Pija falas 1L u aktivizua!', ku: '🎉 Vexwarina 1L ya belaş vebû!'},
  noDrinkReminder: { de: 'Durst? Vergiss dein Getränk nicht!', en: 'Thirsty? Don\'t forget a drink!', tr: 'Susadın mı? İçeceğini unutma!', ro: 'Ți-e sete? Nu uita o băutură!', nl: 'Dorst? Vergeet je drankje niet!' , sq: 'Etje? Mos harro pijen tënde!', ku: 'Tî yî? Vexwarina xwe ji bîr neke!'},
  allergenLegendTitle: { de: 'Allergene & Zusatzstoffe', en: 'Allergens & additives', tr: 'Alerjen ve katkı maddeleri', ro: 'Alergeni și aditivi', nl: 'Allergenen & additieven' , sq: 'Alergjenët & Aditivët', ku: 'Alerjen & Zêdebûyî'},
  allergenSectionTitle: { de: 'ALLERGENE', en: 'ALLERGENS', tr: 'ALERJENLER', ro: 'ALERGENI', nl: 'ALLERGENEN' , sq: 'ALERGJENËT', ku: 'ALERJEN'},
  zusatzSectionTitle: { de: 'ZUSATZSTOFFE', en: 'ADDITIVES', tr: 'KATKI MADDELERİ', ro: 'ADITIVI', nl: 'ADDITIEVEN' , sq: 'ADITIVËT', ku: 'ZÊDEBÛYÎ'},
  choosePastaTypeTitle: { de: 'Spaghetti oder Makkaroni?', en: 'Spaghetti or Macaroni?', tr: 'Spagetti mi Makarna mı?', ro: 'Spaghete sau macaroane?', nl: 'Spaghetti of macaroni?' , sq: 'Spageti apo Makarona?', ku: 'Spageta an Makarona?'},
  weiterShort: { de: 'Weiter', en: 'Next', tr: 'İleri', ro: 'Continuă', nl: 'Verder' , sq: 'Vazhdo', ku: 'Bidomîne'},
  choosePastaStyleSub: { de: 'Jede Pasta wird mit Kurkuma-Penne & Marktsalat serviert.', en: 'Every pasta is served with turmeric penne & market salad.', tr: 'Her makarna zerdeçallı penne ve mevsim salatasıyla servis edilir.', ro: 'Fiecare pastă este servită cu penne cu turmeric și salată de sezon.', nl: 'Elke pasta wordt geserveerd met kurkumapenne & marktsalade.' , sq: 'Çdo pastë shërbehet me penne kurkumë & sallatë tregu.', ku: 'Her pasta bi Kurkuma-Penne & salata bazarê tê pêşkêşkirin.'},
  pastaReadyTitle: { de: 'Deine Pasta ist fertig! 🎉', en: 'Your Pasta is ready! 🎉', tr: 'Makarnan hazır! 🎉', ro: 'Pasta ta este gata! 🎉', nl: 'Jouw Pasta is klaar! 🎉' , sq: 'Pasta jote është gati! 🎉', ku: 'Pastaya te amade ye! 🎉'},
  sizeSmall: { de: 'klein', en: 'small', tr: 'küçük', ro: 'mic', nl: 'klein' , sq: 'e vogël', ku: 'biçûk'},
  sizeLarge: { de: 'groß', en: 'large', tr: 'büyük', ro: 'mare', nl: 'groot' , sq: 'e madhe', ku: 'mezin'},
  extrasPricePrefix: { de: 'Extras (je', en: 'Extras (each', tr: 'Ekstralar (her biri', ro: 'Extra (fiecare', nl: 'Extra’s (elk' , sq: 'Ekstra (nga', ku: 'Zêde (her'},
  cartTitle: { de: 'Deine Bestellung', en: 'Your order', tr: 'Siparişin', ro: 'Comanda ta', nl: 'Jouw bestelling' , sq: 'Porosia jote', ku: 'Sifarişa Te'},
  drinksTitle: { de: 'Etwas zu trinken?', en: 'Something to drink?', tr: 'İçecek ister misin?', ro: 'Ceva de băut?', nl: 'Iets te drinken?' , sq: 'Diçka për të pirë?', ku: 'Tiştek ji bo vexwarinê?'},
  itemsWord: { de: 'Artikel', en: 'items', tr: 'ürün', ro: 'articole', nl: 'items' , sq: 'artikuj', ku: 'tişt'},
  orderSentTitle: { de: '✓ Bestellung gesendet!', en: '✓ Order sent!', tr: '✓ Sipariş gönderildi!', ro: '✓ Comandă trimisă!', nl: '✓ Bestelling verstuurd!' , sq: '✓ Porosia u dërgua!', ku: '✓ Sifariş hate şandin!'},
  orderSentSub: { de: 'Vielen Dank! Wir bereiten deine Bestellung vor.', en: "Thank you! We're preparing your order.", tr: 'Teşekkürler! Siparişini hazırlıyoruz.', ro: 'Mulțumim! Îți pregătim comanda.', nl: 'Bedankt! We bereiden je bestelling voor.' , sq: 'Faleminderit shumë! Po përgatisim porosinë tënde.', ku: 'Gelek spas! Em sifarişa te amade dikin.'},
  backToHomeBtn: { de: 'Zurück zur Startseite', en: 'Back to homepage', tr: 'Ana sayfaya dön', ro: 'Înapoi la pagina principală', nl: 'Terug naar startpagina' , sq: 'Kthehu te faqja kryesore', ku: 'Vegere Rûpela Sereke'},
  newOrderBtn: { de: 'Neue Bestellung starten', en: 'Start a new order', tr: 'Yeni sipariş oluştur', ro: 'Începe o comandă nouă', nl: 'Nieuwe bestelling starten' , sq: 'Fillo porosi të re', ku: 'Sifarişeke nû dest pê bike'},
  installAppBtn: { de: '📲 App installieren', en: '📲 Install app', tr: '📲 Uygulamayı yükle', ro: '📲 Instalează aplicația', nl: '📲 App installeren' , sq: '📲 Instalo aplikacionin', ku: '📲 Sepan saz bike'},
  installHelpTitle: { de: 'Zum Startbildschirm hinzufügen', en: 'Add to Home Screen', tr: 'Ana Ekrana Ekle', ro: 'Adaugă pe ecranul principal', nl: 'Toevoegen aan beginscherm' , sq: 'Shto te ekrani kryesor', ku: 'Li Ekrana Destpêkê Zêde bike'},
  installHelpIOS: { de: 'Tippe unten auf Teilen 􀈂 und dann auf „Zum Home-Bildschirm".', en: 'Tap the Share button below, then "Add to Home Screen".', tr: 'Aşağıdaki Paylaş simgesine, ardından "Ana Ekrana Ekle"ye dokun.', ro: 'Atinge butonul Distribuie de mai jos, apoi „Adaugă pe ecranul principal".', nl: 'Tik op Delen hieronder en dan op "Zet op beginscherm".' , sq: 'Prek butonin Ndaj poshtë, pastaj \\"Shto në ekranin kryesor\\".', ku: 'Li jêr bişkoja Parve bike bitikîne, paşê \\"Li Ekrana Destpêkê Zêde bike\\".'},
  installHelpAndroid: { de: 'Tippe oben rechts auf das Menü ⋮ und dann auf „App installieren" oder „Zum Startbildschirm hinzufügen".', en: 'Tap the ⋮ menu top right, then "Install app" or "Add to Home Screen".', tr: 'Sağ üstteki ⋮ menüsüne dokun, sonra "Uygulamayı yükle" veya "Ana Ekrana Ekle" seç.', ro: 'Atinge meniul ⋮ din dreapta sus, apoi „Instalează aplicația".', nl: 'Tik op het ⋮-menu rechtsboven, dan op "App installeren".' , sq: 'Prek menynë ⋮ lart djathtas, pastaj \\"Instalo aplikacionin\\" ose \\"Shto te ekrani kryesor\\".', ku: 'Li jor rastê menûya ⋮ bitikîne, paşê \\"Sepan saz bike\\" an \\"Li Ekrana Destpêkê Zêde bike\\".'},
  installHelpClose: { de: 'Verstanden', en: 'Got it', tr: 'Anladım', ro: 'Am înțeles', nl: 'Begrepen' , sq: 'E kuptova', ku: 'Fêm kir'},
  downloadReceiptBtn: { de: 'Beleg als Bild speichern', en: 'Save receipt as image', tr: 'Fişi görsel olarak kaydet', ro: 'Salvează bonul ca imagine', nl: 'Bon opslaan als afbeelding', sq: 'Ruaj faturën si imazh' , ku: 'Fîşê wek wêne tomar bike'},
  showReceiptBtn: { de: 'Beleg anzeigen', en: 'Show receipt', tr: 'Fişi göster', ro: 'Arată bonul', nl: 'Bon tonen', sq: 'Shfaq faturën' , ku: 'Fîşê nîşan bide'},
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
  'Hähnchenbrust mit Paprika & Pilzen in Sojasoße': { en: 'Chicken breast with bell pepper & mushrooms in soy sauce', tr: 'Biberli ve mantarlı soya soslu tavuk göğsü', ro: 'Piept de pui cu ardei și ciuperci în sos de soia', nl: 'Kipfilet met paprika & champignons in sojasaus' , sq: 'Gjoks pule me spec dhe kërpudha në salcë soje', ku: 'Sînga mirîşkê bi biber û karkoçkan di soza sojayê de'},
  'Hähnchenbrust in Sahnesoße mit Berg-Thymian': { en: 'Chicken breast in cream sauce with mountain thyme', tr: 'Dağ kekikli kremalı soslu tavuk göğsü', ro: 'Piept de pui în sos de smântână cu cimbru de munte', nl: 'Kipfilet in roomsaus met bergtijm' , sq: 'Gjoks pule në salcë kremi me trumzë mali', ku: 'Sînga mirîşkê di soza krêmê de bi kekîka çiyayî'},
  'Hähnchenbrust mit Pilzen in Curry-Sahnesoße': { en: 'Chicken breast with mushrooms in curry cream sauce', tr: 'Mantarlı köri kremalı soslu tavuk göğsü', ro: 'Piept de pui cu ciuperci în sos de curry cu smântână', nl: 'Kipfilet met champignons in curry-roomsaus' , sq: 'Gjoks pule me kërpudha në salcë kremi kerri', ku: 'Sînga mirîşkê bi karkoçkan di soza krêmê ya kariyê de'},
  'Hähnchenbrust in Paprika-Auberginen-Soße': { en: 'Chicken breast in bell pepper-eggplant sauce', tr: 'Biberli-patlıcanlı soslu tavuk göğsü', ro: 'Piept de pui în sos de ardei și vinete', nl: 'Kipfilet in paprika-auberginesaus' , sq: 'Gjoks pule në salcë specash dhe patëllxhani', ku: 'Sînga mirîşkê di soza biber-bacanreş de'},
  'Hähnchenbrust mit Pilzen in Sahnesoße': { en: 'Chicken breast with mushrooms in cream sauce', tr: 'Mantarlı kremalı soslu tavuk göğsü', ro: 'Piept de pui cu ciuperci în sos de smântână', nl: 'Kipfilet met champignons in roomsaus' , sq: 'Gjoks pule me kërpudha në salcë kremi', ku: 'Sînga mirîşkê bi karkoçkan di soza krêmê de'},
  'Extra Portion Fleisch vom Drehspieß': { en: 'Extra portion of rotisserie meat', tr: 'Ekstra porsiyon döner et', ro: 'Porție extra de carne la frigărui rotative', nl: 'Extra portie vlees van het draaispit' , sq: 'Racion shtesë mish nga rrotisi', ku: 'Porsiyoneke zêde ya goştê şîşê zivirî'},
  'mit türkischer Knoblauchwurst': { en: 'with Turkish garlic sausage', tr: 'Türk sarımsaklı sucuklu', ro: 'cu cârnat turcesc cu usturoi', nl: 'met Turkse knoflookworst' , sq: 'me sallam hudhre turk', ku: 'bi sucûqa sîrê ya tirkî'},
  'mit kleinem Beilagensalat': { en: 'with a small side salad', tr: 'küçük yan salata ile', ro: 'cu o salată mică', nl: 'met een kleine bijgerechtsalade' , sq: 'me sallatë të vogël shoqëruese', ku: 'bi salateke piçûk a alîkar'},
  'Pilzen in Curry-Sahnesoße': { en: 'Mushrooms in curry cream sauce', tr: 'Köri kremalı soslu mantar', ro: 'Ciuperci în sos de curry cu smântână', nl: 'Champignons in curry-roomsaus' , sq: 'Kërpudha në salcë kremi kerri', ku: 'Karkoçk di soza krêmê ya kariyê de'},
  'Fleisch vom Drehspieß': { en: 'Rotisserie meat', tr: 'Döner et', ro: 'Carne la frigărui rotative', nl: 'Vlees van het draaispit' , sq: 'Mish nga rrotisi', ku: 'Goştê şîşê zivirî'},
  'Weichkäse in Salzlake': { en: 'Soft cheese in brine', tr: 'Salamura yumuşak peynir', ro: 'Brânză moale în saramură', nl: 'Zachte kaas in pekel' , sq: 'Djathë i butë në shëllirë', ku: 'Penîrê nerm di avê şor de'},
  'Apfel-Kirsch-Holunder': { en: 'Apple-cherry-elderberry', tr: 'Elma-kiraz-mürver', ro: 'Măr-cireșe-soc', nl: 'Appel-kers-vlier' , sq: 'Mollë-Qershi-Shtog', ku: 'Sêv-Gêlaz-Bêbûk'},
  'Gratis Dip inklusive': { en: 'Free dip included', tr: 'Ücretsiz sos dahil', ro: 'Sos gratuit inclus', nl: 'Gratis dipsaus inbegrepen' , sq: 'Salcë falas e përfshirë', ku: 'Soza belaş tê de'},
  'mit Käse überbacken': { en: 'baked with cheese', tr: 'peynirli fırınlanmış', ro: 'gratinat cu brânză', nl: 'gegratineerd met kaas' , sq: 'i pjekur me djathë', ku: 'bi penîr hatiye pijandin'},
  'Käse überbacken': { en: 'Baked with cheese', tr: 'Peynirli fırınlanmış', ro: 'Gratinat cu brânză', nl: 'Gegratineerd met kaas' , sq: 'Djathë i pjekur', ku: 'Penîrê pijandî'},
  'Gebratenes Hähnchen': { en: 'Fried chicken', tr: 'Kızarmış tavuk', ro: 'Pui prăjit', nl: 'Gebakken kip' , sq: 'Pulë e skuqur', ku: 'Mirîşka biraştî'},
  'Pilzen in Sahnesoße': { en: 'Mushrooms in cream sauce', tr: 'Kremalı soslu mantar', ro: 'Ciuperci în sos de smântână', nl: 'Champignons in roomsaus' , sq: 'Kërpudha në salcë kremi', ku: 'Karkoçk di soza krêmê de'},
  'Zigeuner Schnitzel': { en: 'Paprika Schnitzel', tr: 'Biberli Şnitzel', ro: 'Șnițel cu Sos de Ardei', nl: 'Paprika Schnitzel' , sq: 'Shnicel Zigeuner', ku: 'Şnîtzela Çîngeneyan'},
  'Bio-Traubenschorle': { en: 'Organic grape spritzer', tr: 'Organik üzüm sodası', ro: 'Suc de struguri bio cu apă minerală', nl: 'Bio-druivenspuitwater' , sq: 'Lëng rrushi bio', ku: 'Ava tirî ya bio'},
  'Pilzen in Sojasoße': { en: 'Mushrooms in soy sauce', tr: 'Soya soslu mantar', ro: 'Ciuperci în sos de soia', nl: 'Champignons in sojasaus' , sq: 'Kërpudha në salcë soje', ku: 'Karkoçk di soza sojayê de'},
  'Fritiertes Gemüse': { en: 'Fried vegetables', tr: 'Kızarmış sebze', ro: 'Legume prăjite', nl: 'Gefrituurde groenten' , sq: 'Perime të fërguara', ku: 'Sebzeyên sorkirî'},
  'fritiertes Gemüse': { en: 'fried vegetables', tr: 'kızarmış sebze', ro: 'legume prăjite', nl: 'gefrituurde groenten' , sq: 'perime të fërguara', ku: 'sebzeyên sorkirî'},
  'Hollandaise Sauce': { en: 'Hollandaise sauce', tr: 'Hollandaise sos', ro: 'Sos hollandaise', nl: 'Hollandaisesaus' , sq: 'Salcë Hollandaise', ku: 'Soza Hollandaise'},
  'Hollandaise Soße': { en: 'Hollandaise sauce', tr: 'Hollandaise sos', ro: 'Sos hollandaise', nl: 'Hollandaisesaus' , sq: 'Salcë Hollandaise', ku: 'Soza Hollandaise'},
  'Jäger Schnitzel': { en: 'Hunter\'s Schnitzel', tr: 'Avcı Usulü Şnitzel', ro: 'Șnițel Vânătoresc', nl: 'Jagers Schnitzel' , sq: 'Shnicel Gjahtari', ku: 'Şnîtzela Nêçîrvan'},
  'Türkische Pizza': { en: 'Turkish Pizza', tr: 'Türk Pizzası', ro: 'Pizza Turcească', nl: 'Turkse Pizza' , sq: 'Picë turke', ku: 'Pizzaya Tirkî'},
  'Frische Tomaten': { en: 'Fresh tomatoes', tr: 'Taze domates', ro: 'Roșii proaspete', nl: 'Verse tomaten' , sq: 'Domate të freskëta', ku: 'Firangoşên taze'},
  'still/spritzig': { en: 'still/sparkling', tr: 'sade/gazlı', ro: 'plată/acidulată', nl: 'plat/bruisend' , sq: 'pa gaz/me gaz', ku: 'bêgaz/bigaz'},
  'Knoblauchsauce': { en: 'Garlic sauce', tr: 'Sarımsak sos', ro: 'Sos de usturoi', nl: 'Knoflooksaus' , sq: 'Salcë hudhre', ku: 'Soza sîr'},
  'Chicken Strips': { en: 'Chicken strips', tr: 'Tavuk parçaları', ro: 'Fâșii de pui', nl: 'Kipfilet strips' , sq: 'Copa pule', ku: 'Perçeyên mirîşkê'},
  'Pommes Frites': { en: 'French Fries', tr: 'Patates Kızartması', ro: 'Cartofi Prăjiți', nl: 'Friet' , sq: 'Patate të skuqura', ku: 'Kartol sorkirî'},
  'Hähnchenbrust': { en: 'Chicken breast', tr: 'Tavuk göğsü', ro: 'Piept de pui', nl: 'Kipfilet' , sq: 'Gjoks pule', ku: 'Sînga mirîşkê'},
  'Bio-Rhabarber': { en: 'Organic rhubarb', tr: 'Organik ravent', ro: 'Rubarbă bio', nl: 'Bio-rabarber' , sq: 'Rrabarbër bio', ku: 'Rêwendê bio'},
  'Kurkuma-Penne': { en: 'Turmeric penne', tr: 'Zerdeçallı penne', ro: 'Penne cu turmeric', nl: 'Kurkumapenne' , sq: 'Penne me kurkumë', ku: 'Penne bi kurkumê'},
  'Steak Fleisch': { en: 'Steak meat', tr: 'Biftek et', ro: 'Carne de vită (steak)', nl: 'Steakvlees' , sq: 'Mish biftek', ku: 'Goştê stêkê'},
  'Knoblauchsoße': { en: 'Garlic sauce', tr: 'Sarımsak sos', ro: 'Sos de usturoi', nl: 'Knoflooksaus' , sq: 'Salcë hudhre', ku: 'Soza sîr'},
  'Cocktailsauce': { en: 'Cocktail sauce', tr: 'Kokteyl sos', ro: 'Sos cocktail', nl: 'Cocktailsaus' , sq: 'Salcë kokteil', ku: 'Soza koktêlê'},
  'Beilagensalat': { en: 'Side salad', tr: 'Yan salata', ro: 'Salată garnitură', nl: 'Bijgerechtsalade' , sq: 'Sallatë shoqëruese', ku: 'Salata alîkar'},
  'Meeresfrüchte': { en: 'Seafood', tr: 'Deniz ürünleri', ro: 'Fructe de mare', nl: 'Zeevruchten' , sq: 'Fruta deti', ku: 'Fêkiyên deryayê'},
  'Pizzabrötchen': { en: 'Pizza rolls', tr: 'Pizza topları', ro: 'Chifle pizza', nl: 'Pizzabroodjes' , sq: 'Simite pice', ku: 'Nanikên pizzayê'},
  'Kräuterbutter': { en: 'Herb butter', tr: 'Otlu tereyağı', ro: 'Unt cu ierburi', nl: 'Kruidenboter' , sq: 'Gjalpë me erëza', ku: 'Rûnê bi giyayan'},
  'Putenschinken': { en: 'Turkey ham', tr: 'Hindi jambonu', ro: 'Șuncă de curcan', nl: 'Kalkoenham' , sq: 'Proshutë gjeli', ku: 'Jambona hindûrî'},
  'Berg-Thymian': { en: 'Mountain thyme', tr: 'Dağ kekiği', ro: 'Cimbru de munte', nl: 'Bergtijm' , sq: 'Trumzë mali', ku: 'Kekîka çiyayî'},
  'Grüner Salat': { en: 'Green salad', tr: 'Yeşil salata', ro: 'Salată verde', nl: 'Groene salade' , sq: 'Sallatë jeshile', ku: 'Salata kesk'},
  'grüner Salat': { en: 'green salad', tr: 'yeşil salata', ro: 'salată verde', nl: 'groene salade' , sq: 'sallatë jeshile', ku: 'salata kesk'},
  'Vegetarische': { en: 'Vegetarian', tr: 'Vejetaryen', ro: 'Vegetariană', nl: 'Vegetarische' , sq: 'Vegjetariane', ku: 'Vejeteryan'},
  'Rindersalami': { en: 'Beef salami', tr: 'Dana salam', ro: 'Salam de vită', nl: 'Runderworst' , sq: 'Sallam viçi', ku: 'Salamiya ga'},
  'Zigeunersoße': { en: 'Spicy paprika sauce', tr: 'Acılı biber sosu', ro: 'Sos picant cu ardei', nl: 'Pikante paprikasaus' , sq: 'Salcë Zigeuner', ku: 'Soza Çîngeneyan'},
  'Energy Drink': { en: 'Energy drink', tr: 'Enerji içeceği', ro: 'Băutură energizantă', nl: 'Energiedrank' , sq: 'Pije energjike', ku: 'Vexwarina enerjiyê'},
  'Vegetarisch': { en: 'Vegetarian', tr: 'Vejetaryen', ro: 'Vegetarian', nl: 'Vegetarisch' , sq: 'Vegjetarian', ku: 'Vejeteryan'},
  'Tomatensoße': { en: 'Tomato sauce', tr: 'Domates sos', ro: 'Sos de roșii', nl: 'Tomatensaus' , sq: 'Salcë domatesh', ku: 'Soza firangoşan'},
  'Fleischsoße': { en: 'Meat sauce', tr: 'Kıymalı sos', ro: 'Sos de carne', nl: 'Vleessaus' , sq: 'Salcë mishi', ku: 'Soza goşt'},
  'Bolognese-Soße': { en: 'Bolognese sauce', tr: 'Bolonez sos', ro: 'Sos Bolognese', nl: 'Bolognesesaus' , sq: 'Salcë Bolonjeze', ku: 'Soza Bolognese'},
  'Baue deine eigene Pizza 🎨': { en: 'Build your own Pizza 🎨', tr: 'Kendi Pizzanı Oluştur 🎨', ro: 'Construiește-ți propria Pizza 🎨', nl: 'Bouw je eigen Pizza 🎨' , sq: 'Krijo picën tënde 🎨', ku: 'Pizzaya xwe çêke 🎨'},
  'Baue deine eigene Pasta 🎨': { en: 'Build your own Pasta 🎨', tr: 'Kendi Makarnanı Oluştur 🎨', ro: 'Construiește-ți propria Pasta 🎨', nl: 'Bouw je eigen Pasta 🎨' , sq: 'Krijo pastën tënde 🎨', ku: 'Pastaya xwe çêke 🎨'},
  'Tomatensoße inklusive — wähle deine Beläge': { en: 'Tomato sauce included — choose your toppings', tr: 'Domates sosu dahil — malzemelerini seç', ro: 'Sos de roșii inclus — alege ingredientele', nl: 'Tomatensaus inbegrepen — kies je toppings' , sq: 'Salcë domatesh e përfshirë — zgjidh mbushjet e tua', ku: 'Soza firangoşan tê de — tiştên li ser hilbijêre'},
  'Soße & Extras frei wählbar': { en: 'Sauce & extras of your choice', tr: 'Sos ve ekstralar serbest seçim', ro: 'Sos și extra la alegere', nl: 'Saus & extra’s vrij te kiezen' , sq: 'Salcë & shtesa sipas dëshirës', ku: 'Soz & Zêde li gorî daxwazê'},
  'Spaghetti': { en: 'Spaghetti', tr: 'Spagetti', ro: 'Spaghete', nl: 'Spaghetti' , sq: 'Spageti', ku: 'Spageta'},
  'Makkaroni': { en: 'Macaroni', tr: 'Makarna', ro: 'Macaroane', nl: 'Macaroni' , sq: 'Makarona', ku: 'Makarona'},
  'Soße nach Wahl inklusive — wähle deine Extras': { en: 'Choice of sauce included — choose your extras', tr: 'İstediğin sos dahil — ekstralarını seç', ro: 'Sos la alegere inclus — alege extra-urile', nl: 'Saus naar keuze inbegrepen — kies je extra’s' , sq: 'Salcë sipas zgjedhjes e përfshirë — zgjidh shtesat', ku: 'Soza li gorî hilbijartinê tê de — zêdeyên xwe hilbijêre'},
  'Deutschland': { en: 'Germany', tr: 'Almanya', ro: 'Germania', nl: 'Duitsland' , sq: 'Gjermani', ku: 'Almanya'},
  'Wiener Art': { en: 'Vienna Style', tr: 'Viyana Usulü', ro: 'Stil Vienez', nl: 'Weense Stijl' , sq: 'Stili Vjenez', ku: 'Şêwaza Viyana'},
  'Marktsalat': { en: 'Market salad', tr: 'Pazar salatası', ro: 'Salată de sezon', nl: 'Marktsalade' , sq: 'Sallatë tregu', ku: 'Salata bazarê'},
  'Rahmpulver': { en: 'Cream powder', tr: 'Krema tozu', ro: 'Praf de smântână', nl: 'Roompoeder' , sq: 'Pluhur kremi', ku: 'Toza krêmê'},
  'Mozzarella': { en: 'Mozzarella', tr: 'Mozzarella', ro: 'Mozzarella', nl: 'Mozzarella' , sq: 'Mocarela', ku: 'Mozarella'},
  'Gorgonzola': { en: 'Gorgonzola', tr: 'Gorgonzola', ro: 'Gorgonzola', nl: 'Gorgonzola' , sq: 'Gorgonzola', ku: 'Gorgonzola'},
  'Mayonnaise': { en: 'Mayonnaise', tr: 'Mayonez', ro: 'Maioneză', nl: 'Mayonaise' , sq: 'Majonezë', ku: 'Mayonez'},
  'überbacken': { en: 'baked & gratinated', tr: 'fırında gratine', ro: 'gratinat', nl: 'gegratineerd' , sq: 'i pjekur në furrë', ku: 'pijandî'},
  'Vier Käse': { en: 'Four Cheese', tr: 'Dört Peynirli', ro: 'Patru Brânzeturi', nl: 'Vier Kazen' , sq: 'Katër djathëra', ku: 'Çar Penîr'},
  'Weichkäse': { en: 'Soft cheese', tr: 'Yumuşak peynir', ro: 'Brânză moale', nl: 'Zachte kaas' , sq: 'Djathë i butë', ku: 'Penîrê nerm'},
  'Vegetaria': { en: 'Vegetarian', tr: 'Vejetaryen', ro: 'Vegetariană', nl: 'Vegetarisch' , sq: 'Vegjetariane', ku: 'Vejeteryan'},
  'Jägersoße': { en: 'Hunter\'s sauce', tr: 'Avcı sosu', ro: 'Sos vânătoresc', nl: 'Jagersaus' , sq: 'Salcë Gjahtari', ku: 'Soza Nêçîrvan'},
  'Lavasbrot': { en: 'Lavash bread', tr: 'Lavaş ekmeği', ro: 'Pâine lavash', nl: 'Lavashbrood' , sq: 'Bukë lavash', ku: 'Nanê lavaş'},
  'Pizzabrot': { en: 'Pizza bread', tr: 'Pizza ekmeği', ro: 'Pâine pizza', nl: 'Pizzabrood' , sq: 'Bukë pice', ku: 'Nanê pizzayê'},
  'Sahnesoße': { en: 'Cream sauce', tr: 'Kremalı sos', ro: 'Sos de smântână', nl: 'Roomsaus' , sq: 'Salcë kremi', ku: 'Soza krêmê'},
  'Jalapeños': { en: 'Jalapeños', tr: 'Jalapeño biber', ro: 'Jalapeño', nl: 'Jalapeño\'s' , sq: 'Speca Jalapeño', ku: 'Biberên Jalapeño'},
  'Thunfisch': { en: 'Tuna', tr: 'Ton balığı', ro: 'Ton', nl: 'Tonijn' , sq: 'Ton', ku: 'Masiyê ton'},
  'Knoblauch': { en: 'Garlic', tr: 'Sarımsak', ro: 'Usturoi', nl: 'Knoflook' , sq: 'Hudhër', ku: 'Sîr'},
  'Weißkohl': { en: 'White cabbage', tr: 'Beyaz lahana', ro: 'Varză albă', nl: 'Witte kool' , sq: 'Lakër e bardhë', ku: 'Kelema spî'},
  'Pfirsich': { en: 'Peach', tr: 'Şeftali', ro: 'Piersică', nl: 'Perzik' , sq: 'Pjeshkë', ku: 'Xox'},
  'Hähnchen': { en: 'Chicken', tr: 'Tavuk', ro: 'Pui', nl: 'Kip' , sq: 'Pulë', ku: 'Mirîşk'},
  'Brokkoli': { en: 'Broccoli', tr: 'Brokoli', ro: 'Broccoli', nl: 'Broccoli' , sq: 'Brokoli', ku: 'Brokolî'},
  'Peperoni': { en: 'Chili peppers', tr: 'Acı biber', ro: 'Ardei iute', nl: 'Pepperoni' , sq: 'Speca djegës', ku: 'Biberê tûj'},
  'Zwiebeln': { en: 'Onions', tr: 'Soğan', ro: 'Ceapă', nl: 'Uien' , sq: 'Qepë', ku: 'Pîvaz'},
  'Schinken': { en: 'Ham', tr: 'Jambon', ro: 'Șuncă', nl: 'Ham' , sq: 'Proshutë', ku: 'Jambon'},
  'serviert': { en: 'served', tr: 'servis edilir', ro: 'servit', nl: 'geserveerd' , sq: 'shërbehet', ku: 'tê pêşkêşkirin'},
  'Krabben': { en: 'Shrimp sticks', tr: 'Krab çubuğu', ro: 'Bastonașe de crab', nl: 'Krabsticks' , sq: 'Gaforre', ku: 'Kevzêrk'},
  'Nuggets': { en: 'Nuggets', tr: 'Nugget', ro: 'Nuggets', nl: 'Nuggets' , sq: 'Nagets', ku: 'Nagets'},
  'Portion': { en: 'Portion', tr: 'Porsiyon', ro: 'Porție', nl: 'Portie' , sq: 'Racion', ku: 'Porsiyon'},
  'Spezial': { en: 'Special', tr: 'Özel', ro: 'Special', nl: 'Speciaal' , sq: 'Speciale', ku: 'Taybet'},
  'Schwarz': { en: 'Black', tr: 'Siyah', ro: 'Negre', nl: 'Zwart' , sq: 'E zezë', ku: 'Reş'},
  'Brokoli': { en: 'Broccoli', tr: 'Brokoli', ro: 'Broccoli', nl: 'Broccoli' , sq: 'Brokoli', ku: 'Brokolî'},
  'Paprika': { en: 'Bell pepper', tr: 'Biber', ro: 'Ardei', nl: 'Paprika' , sq: 'Spec', ku: 'Biber'},
  'Tomaten': { en: 'Tomatoes', tr: 'Domates', ro: 'Roșii', nl: 'Tomaten' , sq: 'Domate', ku: 'Firangoş'},
  'Ketchup': { en: 'Ketchup', tr: 'Ketçap', ro: 'Ketchup', nl: 'Ketchup' , sq: 'Ketchup', ku: 'Ketçap'},
  'Zitrone': { en: 'Lemon', tr: 'Limon', ro: 'Lămâie', nl: 'Citroen' , sq: 'Limon', ku: 'Lîmon'},
  'Extra Fleisch': { en: 'Extra meat', tr: 'Ekstra Et', ro: 'Carne extra', nl: 'Extra vlees' , sq: 'Mish shtesë', ku: 'Goştê zêde'},
  'Fleisch': { en: 'Meat', tr: 'Et', ro: 'Carne', nl: 'Vlees' , sq: 'Mish', ku: 'Goşt'},
  '5 Stück': { en: '5 pieces', tr: '5 adet', ro: '5 bucăți', nl: '5 stuks' , sq: '5 copë', ku: '5 heb'},
  '7 Stück': { en: '7 pieces', tr: '7 adet', ro: '7 bucăți', nl: '7 stuks' , sq: '7 copë', ku: '7 heb'},
  '10% Rabatt': { en: '10% off', tr: '%10 indirim', ro: '10% reducere', nl: '10% korting' , sq: '10% zbritje', ku: '10% daxistin'},
  'Gratis Getränk': { en: 'Free drink', tr: 'Ücretsiz içecek', ro: 'Băutură gratuită', nl: 'Gratis drankje' , sq: 'Pije falas', ku: 'Vexwarina belaş'},
  'Gratis Pommes': { en: 'Free fries', tr: 'Ücretsiz patates', ro: 'Cartofi prăjiți gratuiți', nl: 'Gratis friet' , sq: 'Patate falas', ku: 'Kartolê belaş'},
  'Gratis Nuggets': { en: 'Free nuggets', tr: 'Ücretsiz nugget', ro: 'Nuggets gratuite', nl: 'Gratis nuggets' , sq: 'Nagets falas', ku: 'Nagetsên belaş'},
  'Nochmal Glück!': { en: 'Try again!', tr: 'Tekrar dene!', ro: 'Încearcă din nou!', nl: 'Nog een keer!' , sq: 'Edhe një herë fat!', ku: 'Careke din bext!'},
  'Eistee': { en: 'Iced tea', tr: 'Soğuk çay', ro: 'Ceai rece', nl: 'IJsthee' , sq: 'Çaj i ftohtë', ku: 'Çaya sar'},
  'Spinat': { en: 'Spinach', tr: 'Ispanak', ro: 'Spanac', nl: 'Spinazie' , sq: 'Spinaq', ku: 'Spînax'},
  'Gemüse': { en: 'Vegetable', tr: 'Sebzeli', ro: 'Legume', nl: 'Groente' , sq: 'Perime', ku: 'Sebze'},
  'Tasche': { en: 'Pocket', tr: 'Cep', ro: 'Buzunar', nl: 'Zak' , sq: 'Byrek', ku: 'Kîs'},
  'Teller': { en: 'Plate', tr: 'Tabak', ro: 'Farfurie', nl: 'Bord' , sq: 'Pjatë', ku: 'Firaq'},
  'Türkei': { en: 'Turkey', tr: 'Türkiye', ro: 'Turcia', nl: 'Turkije' , sq: 'Turqi', ku: 'Tirkiye'},
  'Bauern': { en: 'Farmer\'s', tr: 'Çiftçi', ro: 'Țărănească', nl: 'Boeren' , sq: 'Fshatare', ku: 'Gundî'},
  'Oliven': { en: 'Olives', tr: 'Zeytin', ro: 'Măsline', nl: 'Olijven' , sq: 'Ullinj', ku: 'Zeytûn'},
  'Gurken': { en: 'Cucumbers', tr: 'Salatalık', ro: 'Castraveți', nl: 'Komkommer' , sq: 'Kastravec', ku: 'Xiyar'},
  'Salami': { en: 'Salami', tr: 'Salam', ro: 'Salam', nl: 'Salami' , sq: 'Sallam', ku: 'Salami'},
  'Ananas': { en: 'Pineapple', tr: 'Ananas', ro: 'Ananas', nl: 'Ananas' , sq: 'Ananas', ku: 'Enenas'},
  'Pilzen': { en: 'Mushrooms', tr: 'Mantar', ro: 'Ciuperci', nl: 'Champignons' , sq: 'Kërpudha', ku: 'Karkoçk'},
  'Pommes': { en: 'Fries', tr: 'Patates kızartması', ro: 'Cartofi prăjiți', nl: 'Friet' , sq: 'Patate', ku: 'Kartol'},
  'Wasser': { en: 'Water', tr: 'Su', ro: 'Apă', nl: 'Water' , sq: 'Ujë', ku: 'Av'},
  ' oder ': { en: ' or ', tr: ' veya ', ro: ' sau ', nl: ' of ' , sq: ' ose ', ku: ' an '},
  'Salat': { en: 'Salad', tr: 'Salata', ro: 'Salată', nl: 'Salade' , sq: 'Sallatë', ku: 'Salate'},
  'Steak': { en: 'Steak', tr: 'Biftek', ro: 'Steak', nl: 'Steak' , sq: 'Biftek', ku: 'Stêk'},
  ' und ': { en: ' and ', tr: ' ve ', ro: ' și ', nl: ' en ' , sq: ' dhe ', ku: ' û '},
  ' mit ': { en: ' with ', tr: ' ile ', ro: ' cu ', nl: ' met ' , sq: ' me ', ku: ' bi '},
  'Rahm': { en: 'Cream', tr: 'Kremalı', ro: 'Cu smântână', nl: 'Room' , sq: 'Krem', ku: 'Krêm'},
  'Mais': { en: 'Corn', tr: 'Mısır', ro: 'Porumb', nl: 'Maïs' , sq: 'Misër', ku: 'Genimoke'},
  'Käse': { en: 'Cheese', tr: 'Peynir', ro: 'Brânză', nl: 'Kaas' , sq: 'Djathë', ku: 'Penîr'},
  'Brot': { en: 'Bread', tr: 'Ekmek', ro: 'Pâine', nl: 'Brood' , sq: 'Bukë', ku: 'Nan'},
  'Dose': { en: 'Can', tr: 'Kutu', ro: 'Doză', nl: 'Blikje' , sq: 'Kanaçe', ku: 'Qutî'},
  'Ei': { en: 'Egg', tr: 'Yumurta', ro: 'Ou', nl: 'Ei' , sq: 'Vezë', ku: 'Hêk'},
  'Scharf': { en: 'Spicy', tr: 'Acılı', ro: 'Picant', nl: 'Pittig' , sq: 'Djegës', ku: 'Tûj'},
  'Hähnchen-Fleisch': { en: 'Chicken meat', tr: 'Tavuk eti', ro: 'Carne de pui', nl: 'Kipvlees' , sq: 'Mish pule', ku: 'Goştê mirîşkê'},
  'Kola & Orange': { en: 'Cola & Orange', tr: 'Kola & Portakal', ro: 'Cola & Portocală', nl: 'Cola & Sinaasappel' , sq: 'Kola & Portokall', ku: 'Kola & Porteqal'},
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
    { id: 'p35', name: 'Pizza Türkei', priceSmall: 10.0, priceLarge: 11.0, desc: 'Rindersalami, Putenschinken, Pilzen und Ei', alg: 'a,i,e,13' },
    { id: 'p36', name: 'Pizza Sucuk', priceSmall: 8.5, priceLarge: 9.5, desc: 'Mit türkischer Knoblauchwurst', alg: 'a,i,e,13' },
    { id: 'p37', name: 'Pizza Spezial', priceSmall: 8.5, priceLarge: 9.5, desc: 'Thunfisch, Putenschinken, Ananas und Pilzen', alg: 'a,e,i,j,13' },
    { id: 'p38', name: 'Pizza Vechta', priceSmall: 10.5, priceLarge: 11.5, desc: 'Fleisch vom Drehspieß, Brokkoli, Zwiebeln, Paprika, Hollandaise Soße, Weichkäse in Salzlake', alg: 'a,i,e,15' },
    { id: 'p39', name: 'Pizza Deutschland', priceSmall: 9.5, priceLarge: 10.5, desc: 'Fleisch vom Drehspieß und Paprika', alg: 'a,i,e,15' },
    { id: 'p40', name: 'Pizza Spinat', priceSmall: 8.5, priceLarge: 9.5, desc: 'Knoblauch und Weichkäse in Salzlake', alg: 'a,i,e' },
    { id: 'p41', name: 'Pizza Vegetarisch', priceSmall: 8.0, priceLarge: 9.0, desc: 'Pilzen, Brokkoli, Paprika und Mais', alg: 'a,i,e' },
    { id: 'p42', name: 'Pizza Mozzarella', priceSmall: 8.5, priceLarge: 9.5, desc: 'Frische Tomaten und Mozzarella', alg: 'a,i,e,13' },
    { id: 'p43', name: 'Pizza Taverna', priceSmall: 9.5, priceLarge: 10.5, desc: 'Rindersalami, Putenschinken, Pilzen und Ei', alg: 'a,i,e,13' },
    { id: 'p44', name: 'Pizza Krabben', priceSmall: 8.5, priceLarge: 9.5, desc: 'Mit Knoblauch', alg: 'a,i,e,d' },
    { id: 'p45', name: 'Pizza Meeresfrüchte', priceSmall: 8.5, priceLarge: 9.5, desc: 'Mit Knoblauch', alg: 'a,i,e,d,j' },
    { id: 'p46', name: 'Pizza QuattroStagioni', priceSmall: 9.5, priceLarge: 10.5, desc: 'Rindersalami, Putenschinken, Pilzen und Paprika', alg: 'a,i,e,13' },
    { id: 'p47', name: 'Pizza Vier Käse', priceSmall: 9.0, priceLarge: 10.0, desc: 'Mozzarella, Gorgonzola und Weichkäse', alg: 'a,g,i' },
    { id: 'p48', name: 'Pizza Bolognese', priceSmall: 8.0, priceLarge: 9.0, desc: 'Mit Fleischsoße', alg: 'a,i,e' },
    { id: 'p49', name: 'Pizza Brokoli', priceSmall: 8.0, priceLarge: 9.0, alg: 'a,i,e' },
    { id: 'p52', name: 'Pizza Oythe', priceSmall: 9.5, priceLarge: 10.5, desc: 'Krabben, Putenschinken, Knoblauch', alg: 'a,i,e,d' },
    { id: 'p53', name: 'Pizza Italia', priceSmall: 9.5, priceLarge: 10.5, desc: 'Brokkoli, Pilzen, Zwiebeln und Weichkäse in Salzlake', alg: 'a,i,e' },
    { id: 'p54', name: 'Pizza Fantaria', priceSmall: 10.0, priceLarge: 11.5, desc: 'Rindersalami, Putenschinken, Paprika und Peperoni', alg: 'a,i,e,13' },
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
  if (![1, 3, 4, 5].includes(day)) return false;
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
async function safeListPrefix(prefix, limit = 20) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/kv_store?key=like.${encodeURIComponent(prefix)}*&select=key,value,updated_at&order=updated_at.desc&limit=${limit}`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) return [];
    return await res.json();
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
    if (sessionStorage.getItem('bk_visit_logged')) return;
    sessionStorage.setItem('bk_visit_logged', '1');
    const device = window.innerWidth < 768 ? 'mobile' : 'desktop';
    const key = `analytics:${Date.now()}-${makeShortCode(4)}`;
    safeSet(key, { ts: Date.now(), lang, device });
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
  const { t, go, globalNavOpen, setGlobalNavOpen, lang, setLang } = React.useContext(LangContext);
  return (
    <div className="flex items-center justify-between gap-3 px-5 pt-6 pb-4">
      <div className="flex items-center gap-3">
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
      <div className="relative flex-shrink-0">
        <button onClick={() => setGlobalNavOpen((v) => !v)} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: dark ? 'rgba(255,246,234,0.12)' : '#f0e5cf' }}>
          {globalNavOpen ? <X size={18} color={dark ? CREAM : GREEN} /> : <MenuIcon size={18} color={dark ? CREAM : GREEN} />}
        </button>
        {globalNavOpen && (
          <>
            <div className="fixed inset-0" style={{ zIndex: 199 }} onClick={() => setGlobalNavOpen(false)} />
            <div className="absolute top-11 right-0 w-56 rounded-2xl overflow-hidden py-2" style={{ background: GREEN, boxShadow: '0 12px 30px rgba(21,56,38,.4)', zIndex: 200, animation: 'modalCardUp .25s cubic-bezier(.25,.46,.45,.94)' }}>
              <button onClick={() => { setGlobalNavOpen(false); go('home'); }} className="w-full text-left px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('backToHomeBtn')}</button>
              <button onClick={() => { setGlobalNavOpen(false); go('whatsapp'); }} className="w-full text-left px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('navMenu')}</button>
              <button onClick={() => { setGlobalNavOpen(false); go('group'); }} className="w-full text-left px-4 py-3 text-sm font-semibold" style={{ color: '#d9cdb4' }}>{t('titleGroup')}</button>
              <button onClick={() => { setGlobalNavOpen(false); go('track'); }} className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center gap-2" style={{ color: '#d9cdb4' }}><Timer size={15} /> {t('navTrackOrder')}</button>
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
  return (
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
    </div>
  );
}

function CartPopEmoji({ trigger }) {
  const { t } = React.useContext(LangContext);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!trigger) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(t);
  }, [trigger]);
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed left-1/2 top-6 flex items-center gap-2.5 px-4 py-3 rounded-2xl" style={{ zIndex: 300, transform: 'translateX(-50%)', background: GREEN, boxShadow: '0 12px 30px rgba(21,56,38,.4)', animation: 'toastSlide 1.6s cubic-bezier(.22,1,.36,1) forwards' }}>
      <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#25D366' }}><Check size={15} color="#fff" strokeWidth={3} /></span>
      <span className="text-sm font-bold text-white whitespace-nowrap">{t('itemAddedToast')}</span>
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
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function getOpenStatus(now) {
  const day = now.getDay(); // 0 Sun ... 2 Tue
  const nextOpenAt = (daysAhead) => { const d = new Date(now); d.setDate(d.getDate() + daysAhead); d.setHours(11, 30, 0, 0); return d; };
  if (day === 2) return { open: false, labelKey: 'statusClosedRestDay', nextOpen: nextOpenAt(1) };
  const h = now.getHours() + now.getMinutes() / 60;
  if (h >= 11.5 && h < 22) return { open: true, labelKey: 'statusOpenNow' };
  if (h < 11.5) return { open: false, labelKey: 'statusNotYetOpen', nextOpen: nextOpenAt(0) };
  return { open: false, labelKey: 'statusClosed', nextOpen: nextOpenAt(day === 1 ? 2 : 1) };
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

const LUNCH_DRINKS = ['Coca-Cola', 'Coca-Cola Zero', 'Fanta', 'Uludağ Gazoz', 'Ayran', 'Wasser', 'Eistee Pfirsich'];

function DailySpecialCard({ item, isLunchWindow, go }) {
  const { lang, t } = React.useContext(LangContext);
  const displayPrice = isLunchWindow ? 9.5 : item.price;

  const orderNow = () => {
    go('whatsapp', { pendingCombo: { title: item.name, price: displayPrice } });
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

function DailySpecial({ go }) {
  const { lang, t } = React.useContext(LangContext);
  const [now, setNow] = useState(new Date());
  const [photoOverrides, setPhotoOverrides] = useState({});
  const [priceOverrides, setPriceOverrides] = useState({});
  const [soldOutIds, setSoldOutIds] = useState([]);
  useEffect(() => {
    safeGet('siteconfig:photoOverrides').then((r) => { if (r) setPhotoOverrides(r); });
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
        {entry.items.map((item, i) => {
          const menuMatch = findMenuItemByName(item.name);
          const overrideImg = menuMatch ? photoOverrides[menuMatch.id] : null;
          const priceOv = menuMatch ? priceOverrides[menuMatch.id] : null;
          const overridePrice = priceOv ? (priceOv.price !== undefined ? priceOv.price : priceOv.large) : null;
          const isSoldOut = menuMatch ? soldOutIds.includes(menuMatch.id) : false;
          return (
          <div key={i} style={{ animation: `cardIn .6s cubic-bezier(.22,1,.36,1) ${i * 0.12}s both` }}>
            <DailySpecialCard item={{ ...item, price: overridePrice !== null && overridePrice !== undefined ? overridePrice : item.price, imgSrc: overrideImg || imgMap[item.img], soldOut: isSoldOut }} isLunchWindow={isLunchWindow} go={go} />
          </div>
          );
        })}
      </div>

      <WeekendTeaser go={go} />
    </section>
  );
}

function HomeView({ go, installPrompt, onInstall, cartCount }) {
  const [navOpen, setNavOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [surpriseItem, setSurpriseItem] = useState(null);
  const [homeSoldOutIds, setHomeSoldOutIds] = useState([]);
  const [homePriceOverrides, setHomePriceOverrides] = useState({});
  const [homePhotoOverrides, setHomePhotoOverrides] = useState({});
  useEffect(() => {
    safeGet('siteconfig:soldOut').then((r) => { if (r) setHomeSoldOutIds(r); });
    safeGet('siteconfig:priceOverrides').then((r) => { if (r) setHomePriceOverrides(r); });
    safeGet('siteconfig:photoOverrides').then((r) => { if (r) setHomePhotoOverrides(r); });
  }, []);
  const HOME_EFFECTIVE_MENU = useMemo(() => applyPriceOverrides(homePriceOverrides, homePhotoOverrides, homeSoldOutIds), [homePriceOverrides, homePhotoOverrides, homeSoldOutIds]);
  const HOME_SURPRISE_ITEMS = useMemo(() => buildSurpriseItems(HOME_EFFECTIVE_MENU), [HOME_EFFECTIVE_MENU]);
  const [dailyBanner, setDailyBanner] = useState('');
  useEffect(() => { safeGet('siteconfig:dailyBanner').then((r) => { if (r && r.text) setDailyBanner(r.text); }); }, []);
  const [extraGalleryPhotos, setExtraGalleryPhotos] = useState([]);
  useEffect(() => { safeGet('siteconfig:extraGalleryPhotos').then((r) => { if (r) setExtraGalleryPhotos(r); }); }, []);
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
  const status = getOpenStatus(now);
  const { lang, setLang, t } = React.useContext(LangContext);
  useEffect(() => { logVisit(lang); }, []);
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
        @keyframes floatY2 { 0%,100%{ transform:translateY(0px) rotate(4deg);} 50%{ transform:translateY(-14px) rotate(-4deg);} }
        @keyframes ctaGlow { 0%,100%{ box-shadow:0 0 0 0 rgba(255,106,26,.55);} 50%{ box-shadow:0 0 0 10px rgba(255,106,26,0);} }
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
              <span className="text-[10.5px] font-black" style={{ color: status.open ? '#4ade80' : '#ff6b6b' }}>{t(status.labelKey)}{!status.open && status.nextOpen && <span className="opacity-80 font-bold"> · {formatCountdown(status.nextOpen - now)}</span>}</span>
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
          <div className="md:hidden px-5 pb-4 flex flex-col gap-3" style={{ animation: 'viewFade .35s cubic-bezier(.25,.46,.45,.94)' }}>
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
      <MittagsBanner />
      {dailyBanner && (
        <div className="py-2.5 px-5 text-center text-sm font-bold" style={{ background: GREEN, color: GOLD }}>
          📣 {dailyBanner}
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
            <h1 className="text-white font-black leading-[1.05] mb-4" style={{ fontSize: 'clamp(34px,5vw,58px)', textShadow: '0 4px 24px rgba(0,0,0,.35), 0 2px 0 rgba(0,0,0,.15)', letterSpacing: '-0.01em' }}>{t('heroTitle1')}<br /><span style={{ color: ORANGE, textShadow: '0 4px 20px rgba(230,90,10,.5)' }}>{t('heroTitle2')}</span></h1>
            <p className="text-base mb-8 max-w-md" style={{ color: '#d9cdb4' }}>{t('heroSubtitle')}</p>
            <div className="flex flex-wrap gap-3 mb-3">
              <button onClick={() => go('whatsapp')} className="cta-pulse px-6 py-3.5 rounded-full font-bold text-sm" style={{ background: `linear-gradient(135deg, ${ORANGE}, #ff8a3d)`, color: '#fff', boxShadow: '0 10px 26px rgba(230,90,10,.45)' }}>{t('heroCtaWhatsapp')}</button>
            </div>
            <button onClick={() => go('group')} className="w-full sm:w-auto flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm" style={{ background: GOLD, color: GREEN, animation: 'goldGlow 2.2s ease-in-out infinite', boxShadow: '0 8px 22px rgba(255,199,56,.35)' }}>
              <span className="text-lg">👥</span> {t('heroCtaGroup')}
            </button>
            <button onClick={() => go('builder')} className="w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl font-black text-base mt-4" style={{ background: `linear-gradient(135deg, ${GOLD}, #ffdb70)`, color: GREEN, boxShadow: '0 12px 30px rgba(255,199,56,.45)', animation: 'goldGlow 2.4s ease-in-out infinite' }}>
              <span className="text-2xl">🧩</span> {t('builderQuickLabel')}
            </button>
            <div className="flex flex-wrap gap-2.5 mt-3">
              <button onClick={() => go('track')} className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs" style={{ background: 'rgba(255,246,234,.12)', color: CREAM, border: '1px solid rgba(255,246,234,.3)' }}>📦 {t('navTrackOrder')}</button>
              <button onClick={rollSurprise} className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs" style={{ background: 'rgba(255,246,234,.12)', color: CREAM, border: '1px solid rgba(255,246,234,.3)' }}>🎲 {t('surpriseMeBtn')}</button>
              <button onClick={() => scrollTo('extras')} className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs" style={{ background: 'rgba(255,246,234,.1)', color: CREAM, border: '1px solid rgba(255,246,234,.25)' }}>{t('heroCtaMore')}</button>
              {installPrompt && (
                <button onClick={onInstall} className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs" style={{ background: 'rgba(255,199,56,.16)', color: GOLD, border: '1px solid rgba(255,199,56,.4)' }}>{t('installAppBtn')}</button>
              )}
            </div>
          </div>
          <div className="rounded-2xl p-6 hidden lg:block relative" style={{ background: 'rgba(255,253,249,.97)' }}>
            <div className="flex justify-between py-2.5 text-sm" style={{ borderBottom: '1px dashed #e3d5bd' }}><span className="font-semibold" style={{ color: '#7a6a52' }}>{t('heroOpeningHours')}</span><span className="font-bold" style={{ color: GREEN }}>{lang === 'de' ? 'Täglich 11:30–22:00' : '11:30–22:00'}</span></div>
            <div className="flex justify-between py-2.5 text-sm" style={{ borderBottom: '1px dashed #e3d5bd' }}><span className="font-semibold" style={{ color: '#7a6a52' }}>{t('heroClosedDay')}</span><span className="font-bold" style={{ color: CHILI }}>{lang === 'de' ? 'Dienstag' : lang === 'en' ? 'Tuesday' : lang === 'tr' ? 'Salı' : lang === 'ro' ? 'Marți' : lang === 'sq' ? 'E martë' : lang === 'ku' ? 'Sêşem' : 'Dinsdag'}</span></div>
            <div className="flex justify-between py-2.5 text-sm"><span className="font-semibold" style={{ color: '#7a6a52' }}>{t('heroAddress')}</span><span className="font-bold text-right" style={{ color: GREEN }}>Oyther Straße 37,<br />49377 Vechta</span></div>
            <img src={CALZONE_IMG} className="hidden xl:block absolute rounded-2xl object-cover" style={{ width: 92, height: 92, top: -22, right: -22, border: `4px solid ${CREAM}`, boxShadow: '0 10px 24px rgba(21,56,38,.3)', transform: 'rotate(9deg)' }} />
            <img src={PENNE_IMG} className="hidden xl:block absolute rounded-2xl object-cover" style={{ width: 78, height: 78, bottom: -18, left: -18, border: `4px solid ${CREAM}`, boxShadow: '0 10px 24px rgba(21,56,38,.3)', transform: 'rotate(-8deg)' }} />
          </div>
        </div>
        <svg viewBox="0 0 1440 60" className="w-full block relative z-10" style={{ marginBottom: -1 }} preserveAspectRatio="none"><path d="M0,32 C240,64 480,0 720,20 C960,40 1200,60 1440,24 L1440,60 L0,60 Z" fill={CREAM} /></svg>
      </section>

      {/* DAILY SPECIAL */}
      <DailySpecial go={go} />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* EXTRAS */}
      {favorites.length > 0 && (
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
          <img src={TERRACE_IMG} onClick={() => setLightbox(TERRACE_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 220 }} />
          <img src={DOENER_TELLER_IMG} onClick={() => setLightbox(DOENER_TELLER_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 160 }} />
          <img src={SCHNITZEL_IMG} onClick={() => setLightbox(SCHNITZEL_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 190 }} />
          <img src={SPAGHETTI_IMG} onClick={() => setLightbox(SPAGHETTI_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 240 }} />
          <img src={FOOD_G1} onClick={() => setLightbox(FOOD_G1)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 170 }} />
          <img src={FOOD_G2} onClick={() => setLightbox(FOOD_G2)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 210 }} />
          <img src={FOOD_G3} onClick={() => setLightbox(FOOD_G3)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 160 }} />
          <img src={FOOD_G4} onClick={() => setLightbox(FOOD_G4)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 230 }} />
          <img src={DOENER_SPIESS_IMG} onClick={() => setLightbox(DOENER_SPIESS_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 260 }} />
          <img src={CALZONE_IMG} onClick={() => setLightbox(CALZONE_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 180 }} />
          <img src={LAHMACUN_IMG} onClick={() => setLightbox(LAHMACUN_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 210 }} />
          <img src={PIZZABROETCHEN_IMG} onClick={() => setLightbox(PIZZABROETCHEN_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 160 }} />
          <img src={PENNE_IMG} onClick={() => setLightbox(PENNE_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 220 }} />
          <img src={PIZZA_KAESE_IMG} onClick={() => setLightbox(PIZZA_KAESE_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 190 }} />
          <img src={FALAFEL_IMG} onClick={() => setLightbox(FALAFEL_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 170 }} />
          <img src={SALAT_BUNT_IMG} onClick={() => setLightbox(SALAT_BUNT_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 240 }} />
          <img src={BAUERNSALAT_IMG} onClick={() => setLightbox(BAUERNSALAT_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 180 }} />
          <img src={NUGGETS_IMG} onClick={() => setLightbox(NUGGETS_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 200 }} />
          <img src={CHICKEN_STRIPS_IMG} onClick={() => setLightbox(CHICKEN_STRIPS_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 230 }} />
          <img src={POMMES_IMG} onClick={() => setLightbox(POMMES_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 170 }} />
          <img src={FRITZ_KOLA_IMG} onClick={() => setLightbox(FRITZ_KOLA_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 200 }} />
          <img src={FRITZ_LIMO_IMG} onClick={() => setLightbox(FRITZ_LIMO_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 230 }} />
          <img src={FRITZ_SPRITZ_TRAUBE_IMG} onClick={() => setLightbox(FRITZ_SPRITZ_TRAUBE_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 190 }} />
          <img src={FRITZ_MISCHMASCH_IMG} onClick={() => setLightbox(FRITZ_MISCHMASCH_IMG)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 210 }} />
          {extraGalleryPhotos.map((src, idx) => (
            <img key={idx} src={src} onClick={() => setLightbox(src)} className="gallery-img rounded-xl object-cover w-full mb-3 cursor-pointer" style={{ breakInside: 'avoid', height: 190 + (idx % 3) * 25 }} />
          ))}
        </div>
      </section>

      {surpriseItem && (
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
              <div className="font-black text-xl mb-1" style={{ color: GREEN }}>{mx(surpriseItem.name, lang)}{surpriseItem.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}</div>
              {surpriseItem.desc && <p className="text-xs font-medium mb-2" style={{ color: '#8a7c62' }}>{mx(surpriseItem.desc, lang)}</p>}
              <div className="font-bold text-lg mb-6" style={{ color: CHILI }}>{fmt(surpriseItem.price)}</div>
            </div>
            {!surpriseRolling && (
              <div className="flex flex-col gap-2.5">
                <button onClick={confirmSurprise} className="w-full py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('surpriseWantIt')}</button>
                <button onClick={rollSurprise} className="w-full py-3 rounded-xl font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('surpriseAgain')}</button>
              </div>
            )}
          </div>
        </ConfigModal>
      )}
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
            <div className="flex items-start gap-3 mb-4"><Phone size={16} color={GOLD} className="mt-0.5 flex-shrink-0" /><a href="tel:+4944419516104" className="text-white font-bold text-sm">04441 / 95 16 104</a></div>
            <div className="flex items-start gap-3 mb-6"><Clock3 size={16} color={GOLD} className="mt-0.5 flex-shrink-0" /><div><div className="text-white font-bold text-sm">{lang === 'de' ? 'Täglich 11:30–22:00 Uhr' : lang === 'en' ? 'Daily 11:30 AM–10:00 PM' : lang === 'tr' ? 'Her gün 11:30–22:00' : lang === 'ro' ? 'Zilnic 11:30–22:00' : lang === 'sq' ? 'Çdo ditë 11:30–22:00' : lang === 'ku' ? 'Her roj 11:30–22:00' : 'Dagelijks 11:30–22:00'}</div><div className="text-xs font-medium" style={{ color: '#d9cdb4' }}>{lang === 'de' ? 'Dienstag Ruhetag' : lang === 'en' ? 'Closed on Tuesdays' : lang === 'tr' ? 'Salı günü kapalı' : lang === 'ro' ? 'Marți închis' : lang === 'sq' ? 'Mbyllur të martave' : lang === 'ku' ? 'Sêşeman girtî' : 'Dinsdag gesloten'}</div></div></div>
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
function WhatsAppOrderView({ back, initialAction, onConsumeAction, cart, setCart, cartOpen, setCartOpen, go }) {
  const { lang, t, installPrompt, onInstall } = React.useContext(LangContext);
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
  const addItem = (lineKey, label, price, deLabel) => { setCart((c) => ({ ...c, [lineKey]: { name: label, deName: deLabel || label, price, qty: (c[lineKey]?.qty || 0) + 1 } })); setCartPop((x) => x + 1); };

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
            <button
              onClick={() => {
                const item = meatChoiceItem;
                let deLabel = meatChoiceSel ? `${item.name} [${meatChoiceSel}]` : item.name;
                let displayLabel = meatChoiceSel ? `${mx(item.name, lang)} [${mx(meatChoiceSel, lang)}]` : mx(item.name, lang);
                if (meatChoiceNote.trim()) { deLabel += ` [${meatChoiceNote.trim()}]`; displayLabel += ` [${meatChoiceNote.trim()}]`; }
                setLastAddedTab('kebap');
                addItem(`${item.id}-${meatChoiceSel || 'x'}-${Date.now()}`, displayLabel, item.price, deLabel);
                setMeatChoiceItem(null);
              }}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white"
              style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}
            >{t('hinzufuegen')} · {fmt(meatChoiceItem.price)}</button>
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
            const closeModal = () => { setOpenExtra(null); setConfigExtras([]); setConfigNote(''); setConfigMeat(null); };
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
            const closeModal = () => { setOpenExtra(null); setConfigExtras([]); setConfigNote(''); };
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
                    if (tab === 'kebap' && hasDonerMeat(item)) { setMeatChoiceSel(null); setMeatChoiceNote(''); setMeatChoiceItem(item); return; }
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
                </div>
                <div className="flex flex-col gap-2.5">
                  {UPSELL_DRINKS.map((u) => {
                    const key = u.id;
                    const qty = cart[key]?.qty || 0;
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
                        <Stepper qty={qty} onAdd={() => { if (!u.soldOut) addItem(u.id, mx(u.name, lang), u.price, u.name); }} onRemove={() => removeItem(u.id)} />
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
  { id: 'yaprak', label: 'Yaprak Döner', extra: 1.0, emoji: '🌿', weekendOnly: true },
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
  ...EXTRA_TOPPINGS, ...PASTA_TOPPINGS, ...PASTA_EXTRA_ITEMS, ...BUILDER_EXTRAS.map((e) => e.label),
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
  const addLocal = (id, label, price, deLabel) => { setLocalCart((c) => ({ ...c, [id]: { name: label, deName: deLabel || label, price, qty: (c[id]?.qty || 0) + 1 } })); setCartPop((x) => x + 1); };
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
            <button
              onClick={() => {
                const item = meatChoiceItem;
                let deLabel = meatChoiceSel ? `${item.name} [${meatChoiceSel}]` : item.name;
                let displayLabel = meatChoiceSel ? `${mx(item.name, lang)} [${mx(meatChoiceSel, lang)}]` : mx(item.name, lang);
                if (meatChoiceNote.trim()) { deLabel += ` [${meatChoiceNote.trim()}]`; displayLabel += ` [${meatChoiceNote.trim()}]`; }
                setLastAddedTab('kebap');
                addLocal(`${item.id}-${meatChoiceSel || 'x'}-${Date.now()}`, displayLabel, item.price, deLabel);
                setMeatChoiceItem(null);
              }}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white"
              style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}
            >{t('hinzufuegen')} · {fmt(meatChoiceItem.price)}</button>
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
          <div className="flex gap-2 overflow-x-auto px-5 pt-2 pb-2">
            {MENU.map((m) => (<button key={m.key} onClick={() => setTab(m.key)} className="flex-none px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap" style={tab === m.key ? { background: GREEN, color: GOLD } : { background: 'transparent', color: GREEN, border: `1.5px solid ${GREEN}` }}>{CATEGORY_ICONS[m.key]} {catLabel(m.key, lang)}</button>))}
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
                const closeModal = () => { setOpenExtra(null); setConfigExtras([]); setConfigNote(''); setConfigMeat(null); };
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
                const closeModal = () => { setOpenExtra(null); setConfigExtras([]); setConfigNote(''); };
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
                        if (tab === 'kebap' && hasDonerMeat(item)) { setMeatChoiceSel(null); setMeatChoiceNote(''); setMeatChoiceItem(item); return; }
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
      { h: '3. Bestellung per WhatsApp', p: 'Wenn Sie über unsere Website eine Bestellung per WhatsApp aufgeben, werden Sie zur WhatsApp-Anwendung von Meta Platforms Ireland Ltd. weitergeleitet. Die dort eingegebenen Daten (z. B. Name, Bestellinhalt) unterliegen der Datenschutzerklärung von WhatsApp/Meta. Wir erhalten nur die von Ihnen gesendete Nachricht.' },
      { h: '4. Gruppenbestellung & Glücksrad', p: 'Für diese Funktionen wird ein zufällig erzeugter Code gespeichert (keine Namen, keine Telefonnummern). Die Daten werden bei Supabase Inc. in einer Datenbank innerhalb der EU gespeichert und dienen ausschließlich der Funktion dieser Angebote..' },
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
      { h: '4. Group order & lucky wheel', p: 'For these features, a randomly generated code is stored (no names, no phone numbers). The data is stored by Supabase Inc. in a database within the EU and is used exclusively for the operation of these features.' },
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
      { h: '4. Grup Siparişi & Şans Çarkı', p: 'Bu özellikler için rastgele oluşturulmuş bir kod saklanır (isim veya telefon numarası saklanmaz). Veriler, Supabase Inc. tarafından AB içindeki bir veritabanında saklanır ve yalnızca bu özelliklerin işlevi için kullanılır.' },
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
      { h: '4. Comandă de grup & roata norocului', p: 'Pentru aceste funcții este stocat un cod generat aleatoriu (fără nume, fără numere de telefon). Datele sunt stocate de Supabase Inc. într-o bază de date din UE și sunt utilizate exclusiv pentru funcționarea acestor oferte.' },
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
      { h: '4. Groepsbestelling & geluksrad', p: 'Voor deze functies wordt een willekeurig gegenereerde code opgeslagen (geen namen, geen telefoonnummers). De gegevens worden door Supabase Inc. opgeslagen in een database binnen de EU en worden uitsluitend gebruikt voor de werking van deze functies.' },
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
function StaffPanelView({ back }) {
  const { t, lang } = React.useContext(LangContext);
  const [pin, setPin] = useState('');
  const [ok, setOk] = useState(false);
  const [tab, setTab] = useState('orders'); // orders | wheel | settings | analytics

  const [wheelCode, setWheelCode] = useState('');
  const [wheelResult, setWheelResult] = useState(undefined);
  const [redeemMsg, setRedeemMsg] = useState('');

  const [orders, setOrders] = useState([]);
  const [ratingScore, setRatingScore] = useState('4.6');
  const [ratingCount, setRatingCount] = useState('293');
  const [ratingMsg, setRatingMsg] = useState('');
  const [dailyBannerText, setDailyBannerText] = useState('');
  const [dailyBannerMsg, setDailyBannerMsg] = useState('');
  const [waTemplateText, setWaTemplateText] = useState('');
  const [waTemplateMsg, setWaTemplateMsg] = useState('');
  const [showTestOrders, setShowTestOrders] = useState(false);
  const [testOrderMsg, setTestOrderMsg] = useState('');
  const [visits, setVisits] = useState([]);
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
      safeGet('siteconfig:dailyBanner').then((r) => { if (r && r.text) setDailyBannerText(r.text); });
      safeGet('siteconfig:waTemplate').then((r) => { if (r && r.text) setWaTemplateText(r.text); });
    }
  }, [ok, tab]);
  useEffect(() => {
    if (ok && tab === 'analytics') {
      safeListPrefix('analytics:', 500).then((rows) => setVisits(rows));
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
  const saveDailyBanner = async () => {
    await safeSet('siteconfig:dailyBanner', { text: dailyBannerText.trim(), updatedAt: Date.now() });
    setDailyBannerMsg(t('savedMsg'));
    setTimeout(() => setDailyBannerMsg(''), 2500);
  };
  const clearDailyBanner = async () => {
    setDailyBannerText('');
    await safeSet('siteconfig:dailyBanner', { text: '', updatedAt: Date.now() });
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
  const selectPhotoItem = (item) => {
    setEditingPhotoItem(item);
    setEditPhotoUrl(photoOverrides[item.id] || item.img || '');
  };
  const savePhoto = async () => {
    if (!editingPhotoItem || !editPhotoUrl.trim()) return;
    const next = { ...photoOverrides, [editingPhotoItem.id]: editPhotoUrl.trim() };
    await safeSet('siteconfig:photoOverrides', next);
    setPhotoOverrides(next);
    setPhotoSaveMsg(t('savedMsg'));
    setTimeout(() => setPhotoSaveMsg(''), 2500);
  };
  const applyPhotoToCategory = async () => {
    if (!editingPhotoItem || !editPhotoUrl.trim()) return;
    const cat = MENU.find((c) => c.items.some((i) => i.id === editingPhotoItem.id));
    if (!cat) return;
    const next = { ...photoOverrides };
    cat.items.forEach((i) => { next[i.id] = editPhotoUrl.trim(); });
    await safeSet('siteconfig:photoOverrides', next);
    setPhotoOverrides(next);
    setPhotoSaveMsg(t('photoAppliedCategoryMsg').replace('{count}', String(cat.items.length)));
    setTimeout(() => setPhotoSaveMsg(''), 3000);
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
      setEditPhotoUrl(dataUrl);
      const next = { ...photoOverrides, [editingPhotoItem.id]: dataUrl };
      await safeSet('siteconfig:photoOverrides', next);
      setPhotoOverrides(next);
      setPhotoSaveMsg(t('savedMsg'));
      setTimeout(() => setPhotoSaveMsg(''), 2500);
    } catch {}
    setPhotoUploadBusy(false);
  };
  const [extraGalleryPhotos, setExtraGalleryPhotos] = useState([]);
  const [galleryUploadBusy, setGalleryUploadBusy] = useState(false);
  const handleGalleryFileUpload = async (file) => {
    if (!file) return;
    setGalleryUploadBusy(true);
    try {
      const dataUrl = await compressImageFile(file, 1000, 0.75);
      const next = [...extraGalleryPhotos, dataUrl];
      await safeSet('siteconfig:extraGalleryPhotos', next);
      setExtraGalleryPhotos(next);
    } catch {}
    setGalleryUploadBusy(false);
  };
  const removeGalleryPhoto = async (idx) => {
    const next = extraGalleryPhotos.filter((_, i) => i !== idx);
    await safeSet('siteconfig:extraGalleryPhotos', next);
    setExtraGalleryPhotos(next);
  };
  const resetPhoto = async () => {
    if (!editingPhotoItem) return;
    const next = { ...photoOverrides };
    delete next[editingPhotoItem.id];
    await safeSet('siteconfig:photoOverrides', next);
    setPhotoOverrides(next);
    setEditingPhotoItem(null);
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
          <input value={pin} onChange={(e) => setPin(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && pin === '0021' && (setOk(true), unlockAudio())} type="password" inputMode="numeric" placeholder="PIN ••••" className="w-full px-4 py-3.5 rounded-xl text-lg font-bold tracking-[0.3em] text-center outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
          <button onClick={() => { if (pin === '0021') { setOk(true); unlockAudio(); } }} className="w-full py-3.5 rounded-xl font-bold text-base" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', color: '#fff', boxShadow: '0 8px 20px rgba(230,90,10,.35)' }}>{t('loginBtn')}</button>
        </div>
      ) : (
        <>
          <div className="px-5 pt-4 pb-1">
            <div className="rounded-2xl p-4 mb-1 flex items-center gap-3" style={{ background: `linear-gradient(135deg, ${GREEN}, #1d4530)` }}>
              <span className="text-2xl">👨‍🍳</span>
              <div>
                <div className="font-black text-sm" style={{ color: GOLD }}>{t('staffWelcomeTitle')}</div>
                <div className="text-[11px] font-medium" style={{ color: '#d9cdb4' }}>{t('staffWelcomeSub')}</div>
              </div>
            </div>
          </div>
          <div className="px-5 pt-3 pb-2">
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { key: 'orders', icon: '📦', label: t('staffOrdersTab') },
                { key: 'wheel', icon: '🎡', label: t('staffWheelCodeTitle') },
                { key: 'menu', icon: '📋', label: t('staffMenuTab') },
                { key: 'photos', icon: '📷', label: t('staffPhotosTab') },
                { key: 'settings', icon: '⚙️', label: t('staffSettingsTab') },
                { key: 'analytics', icon: '📊', label: t('staffAnalyticsTab') },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className="flex items-center gap-2.5 px-4 py-3.5 rounded-2xl text-left transition-all"
                  style={tab === item.key
                    ? { background: `linear-gradient(135deg, ${GREEN}, #1d4530)`, color: GOLD, boxShadow: '0 8px 20px rgba(21,56,38,.3)', border: `1.5px solid ${GOLD}` }
                    : { background: '#fff', color: GREEN, boxShadow: '0 2px 8px rgba(21,56,38,.08)', border: '1.5px solid transparent' }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-bold text-xs leading-tight">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

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
          {tab === 'orders' && (
            <div className="px-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-lg">📦</span><h3 className="font-black text-sm" style={{ color: GREEN }}>{t('staffOrdersTab')}</h3></div>
              {deleteErrorMsg && <p className="text-xs font-bold text-center mb-3 px-3 py-2 rounded-lg" style={{ background: '#fdecd4', color: CHILI }}>{deleteErrorMsg}</p>}
              {sortedOrders.length === 0 && (
                <div className="text-center py-14 opacity-70">
                  <div className="text-5xl mb-3">📭</div>
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
                  <div key={o.key} className="bg-white rounded-xl p-4 shadow-sm" style={isStuck ? { border: `2px solid ${CHILI}`, background: '#fff5f5' } : {}}>
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
              <div className="bg-white rounded-xl p-5 mb-3">
                <div className="text-sm font-black mb-3" style={{ color: GREEN }}>{t('dailyBannerLabel')}</div>
                <input value={dailyBannerText} onChange={(e) => setDailyBannerText(e.target.value)} placeholder={t('dailyBannerPh')} className="w-full px-3 py-2.5 rounded-lg text-sm font-bold outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
                <div className="flex gap-2">
                  <button onClick={saveDailyBanner} className="flex-1 py-2.5 rounded-lg font-bold text-sm text-white" style={{ background: GREEN }}>{t('saveBtn')}</button>
                  <button onClick={clearDailyBanner} className="px-4 py-2.5 rounded-lg font-bold text-sm" style={{ background: '#f7e2e2', color: CHILI }}>{t('resetBtn')}</button>
                </div>
                {dailyBannerMsg && <p className="text-center text-xs font-bold mt-2" style={{ color: '#8a5a1f' }}>{dailyBannerMsg}</p>}
              </div>
              <div className="bg-white rounded-xl p-5 mb-3">
                <div className="text-sm font-black mb-1.5" style={{ color: GREEN }}>{t('waTemplateLabel')}</div>
                <p className="text-[11px] mb-3" style={{ color: '#a4906c' }}>{t('waTemplateHint')}</p>
                <input value={waTemplateText} onChange={(e) => setWaTemplateText(e.target.value)} placeholder={t('waTemplatePh')} className="w-full px-3 py-2.5 rounded-lg text-sm font-bold outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
                <button onClick={saveWaTemplate} className="w-full py-2.5 rounded-lg font-bold text-sm text-white" style={{ background: GREEN }}>{t('saveBtn')}</button>
                {waTemplateMsg && <p className="text-center text-xs font-bold mt-2" style={{ color: '#8a5a1f' }}>{waTemplateMsg}</p>}
              </div>
              <div className="bg-white rounded-xl p-5 mb-3">
                <div className="text-sm font-black mb-1.5" style={{ color: GREEN }}>{t('testOrderLabel')}</div>
                <p className="text-[11px] mb-3" style={{ color: '#a4906c' }}>{t('testOrderHint')}</p>
                <button onClick={createTestOrder} className="w-full py-2.5 rounded-lg font-bold text-sm text-white mb-2" style={{ background: ORANGE }}>🧪 {t('testOrderBtn')}</button>
                <label className="flex items-center gap-2 text-xs font-semibold" style={{ color: GREEN }}>
                  <input type="checkbox" checked={showTestOrders} onChange={(e) => setShowTestOrders(e.target.checked)} />
                  {t('showTestOrdersLabel')}
                </label>
                {testOrderMsg && <p className="text-center text-xs font-bold mt-2" style={{ color: '#8a5a1f' }}>{testOrderMsg}</p>}
              </div>
              <div className="bg-white rounded-xl p-5 mb-3">
                <div className="text-sm font-black mb-3" style={{ color: GREEN }}>{t('notifTestLabel')}</div>
                <button onClick={() => { unlockAudio(); notifyNewOrder(); }} className="w-full py-2.5 rounded-lg font-bold text-sm text-white" style={{ background: ORANGE }}>🔔 {t('notifTestBtn')}</button>
              </div>
              <div className="bg-white rounded-xl p-5">
                <div className="text-sm font-black mb-3" style={{ color: GREEN }}>{t('googleRatingLabel')}</div>
                <div className="flex gap-2 mb-3">
                  <input value={ratingScore} onChange={(e) => setRatingScore(e.target.value)} placeholder="4.6" className="flex-1 px-3 py-2.5 rounded-lg text-sm font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                  <input value={ratingCount} onChange={(e) => setRatingCount(e.target.value)} placeholder="293" className="flex-1 px-3 py-2.5 rounded-lg text-sm font-bold outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                </div>
                <button onClick={saveRating} className="w-full py-2.5 rounded-lg font-bold text-sm text-white" style={{ background: GREEN }}>{t('saveBtn')}</button>
                {ratingMsg && <p className="text-center text-xs font-bold mt-2" style={{ color: '#8a5a1f' }}>{ratingMsg}</p>}
              </div>
            </div>
          )}
          {tab === 'analytics' && (() => {
            const now = Date.now();
            const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
            const total = visits.length;
            const today = visits.filter((v) => v.value.ts >= todayStart.getTime()).length;
            const byLang = {};
            const byDevice = { mobile: 0, desktop: 0 };
            visits.forEach((v) => {
              byLang[v.value.lang] = (byLang[v.value.lang] || 0) + 1;
              byDevice[v.value.device] = (byDevice[v.value.device] || 0) + 1;
            });
            const langOrder = Object.entries(byLang).sort((a, b) => b[1] - a[1]);
            return (
              <div className="px-5">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: '0 4px 14px rgba(21,56,38,.08)' }}>
                    <div className="font-black text-2xl" style={{ color: GREEN }}>{today}</div>
                    <div className="text-[11px] font-bold" style={{ color: '#a4906c' }}>{t('visitsToday')}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: '0 4px 14px rgba(21,56,38,.08)' }}>
                    <div className="font-black text-2xl" style={{ color: GREEN }}>{total}</div>
                    <div className="text-[11px] font-bold" style={{ color: '#a4906c' }}>{t('visitsRecent')}</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 mb-3">
                  <div className="text-[11px] font-black tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('byLanguage')}</div>
                  {langOrder.length === 0 && <p className="text-xs" style={{ color: '#a4906c' }}>—</p>}
                  {langOrder.map(([l, c]) => (
                    <div key={l} className="flex items-center justify-between py-1 text-sm font-semibold" style={{ color: GREEN }}><span className="uppercase">{l}</span><span>{c}</span></div>
                  ))}
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-[11px] font-black tracking-widest mb-2" style={{ color: '#a4906c' }}>{t('byDevice')}</div>
                  <div className="flex items-center justify-between py-1 text-sm font-semibold" style={{ color: GREEN }}><span>📱 Mobile</span><span>{byDevice.mobile || 0}</span></div>
                  <div className="flex items-center justify-between py-1 text-sm font-semibold" style={{ color: GREEN }}><span>💻 Desktop</span><span>{byDevice.desktop || 0}</span></div>
                </div>
                <p className="text-[10px] text-center mt-4" style={{ color: '#a4906c' }}>{t('analyticsNote')}</p>
              </div>
            );
          })()}
          {tab === 'menu' && (
            <div className="px-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-lg">📋</span><h3 className="font-black text-sm" style={{ color: GREEN }}>{t('staffMenuTab')}</h3></div>
              <button onClick={toggleChickenSoldOut} className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl mb-4" style={chickenSoldOut ? { background: CHILI } : { background: '#fff', border: '1px solid #e3d5bd' }}>
                <span className="flex items-center gap-2 font-bold text-sm" style={{ color: chickenSoldOut ? '#fff' : GREEN }}>🍗 {t('chickenSoldOutLabel')}</span>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={chickenSoldOut ? { background: '#fff', color: CHILI } : { background: '#f0e5cf', color: '#7c6d55' }}>{chickenSoldOut ? t('markSoldOutOn') : t('markSoldOutOff')}</span>
              </button>
              <div className="rounded-xl p-4 mb-4" style={{ background: '#fdecd4', border: '1px solid #f0d4a8' }}>
                <div className="font-black text-sm mb-1" style={{ color: '#8a5a1f' }}>🥦 {t('extrasSoldOutTitle')}</div>
                <p className="text-[11px] mb-3" style={{ color: '#a4906c' }}>{t('extrasSoldOutHint')}</p>
                <input value={extraSearch} onChange={(e) => setExtraSearch(e.target.value)} placeholder={t('extraSearchPh')} className="w-full px-3.5 py-2.5 rounded-lg text-sm font-bold outline-none mb-2" style={{ background: '#fff', color: GREEN }} />
                {extraSearchResults.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    {extraSearchResults.map((name) => {
                      const isOut = soldOutExtras.includes(name);
                      return (
                        <button key={name} onClick={() => toggleSoldOutExtra(name)} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg" style={isOut ? { background: CHILI } : { background: '#fff', border: '1px solid #f0d4a8' }}>
                          <span className="font-bold text-sm" style={{ color: isOut ? '#fff' : GREEN }}>{mx(name, lang)}</span>
                          <span className="text-[10px] font-black px-2 py-1 rounded-full" style={isOut ? { background: '#fff', color: CHILI } : { background: '#f0e5cf', color: '#7c6d55' }}>{isOut ? t('markSoldOutOn') : t('markSoldOutOff')}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                {soldOutExtras.length > 0 && !extraSearch && (
                  <p className="text-[11px] font-bold mt-2" style={{ color: '#8a5a1f' }}>{soldOutExtras.length} {t('editedPricesCount')}</p>
                )}
              </div>
              <input value={menuSearch} onChange={(e) => { setMenuSearch(e.target.value); setEditingItem(null); }} placeholder={t('menuSearchPh')} className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
              {!editingItem && menuSearchResults.map((item) => (
                <button key={item.id} onClick={() => selectMenuItem(item)} className="w-full text-left bg-white rounded-xl p-3.5 mb-2 flex items-center justify-between shadow-sm">
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
                <p className="text-[11px] text-center mt-4" style={{ color: '#a4906c' }}>{Object.keys(priceOverrides).length} {t('editedPricesCount')}</p>
              )}
            </div>
          )}
          {tab === 'photos' && (
            <div className="px-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-lg">📷</span><h3 className="font-black text-sm" style={{ color: GREEN }}>{t('staffPhotosTab')}</h3></div>
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
                  {editPhotoUrl.trim() && (
                    <button onClick={applyPhotoToCategory} className="w-full mb-4 text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2" style={{ background: '#fdecd4', color: '#8a5a1f', border: '1px solid #f0d4a8' }}>
                      <span className="text-sm">🔁</span> {t('applyToCategoryBtn')}
                    </button>
                  )}
                  <div className="flex gap-2">
                    <button onClick={savePhoto} className="flex-1 py-2.5 rounded-lg font-bold text-sm text-white" style={{ background: GREEN }}>{t('saveBtn')}</button>
                    {photoOverrides[editingPhotoItem.id] && <button onClick={resetPhoto} className="px-4 py-2.5 rounded-lg font-bold text-sm" style={{ background: '#f7e2e2', color: CHILI }}>{t('resetBtn')}</button>}
                    <button onClick={() => setEditingPhotoItem(null)} className="px-4 py-2.5 rounded-lg font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>{t('cancelBtn')}</button>
                  </div>
                  {photoSaveMsg && <p className="text-center text-xs font-bold mt-3" style={{ color: '#8a5a1f' }}>{photoSaveMsg}</p>}
                </div>
              )}
              <div className="mt-6 pt-5" style={{ borderTop: '1px solid #e3d5bd' }}>
                <div className="flex items-center gap-2 mb-1.5"><span className="text-lg">🖼️</span><h3 className="font-black text-sm" style={{ color: GREEN }}>{t('independentPhotoTitle')}</h3></div>
                <p className="text-[11px] mb-3" style={{ color: '#a4906c' }}>{t('independentPhotoHint')}</p>
                <label className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm text-white mb-4 cursor-pointer" style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', opacity: galleryUploadBusy ? 0.6 : 1 }}>
                  <span className="text-base">📷</span> {galleryUploadBusy ? '…' : t('uploadGalleryPhotoBtn')}
                  <input type="file" accept="image/*" className="hidden" disabled={galleryUploadBusy} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleGalleryFileUpload(f); e.target.value = ''; }} />
                </label>
                {extraGalleryPhotos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {extraGalleryPhotos.map((src, idx) => (
                      <div key={idx} className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => removeGalleryPhoto(idx)} className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(21,56,38,.75)' }}><X size={13} color="#fff" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ============ LOYALTY (Treuekarte) ============ */
/* ============ APP ============ */
export default function App() {
  const [booted, setBooted] = useState(false);
  const [view, setView] = useState('home');
  const [pendingAction, setPendingAction] = useState(null);
  const go = (v, action) => { if (action) setPendingAction(action); setView(v); };
  const langCtx = useLang();
  const [globalNavOpen, setGlobalNavOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useMemo(() => Object.values(cart).reduce((s, v) => s + v.qty, 0), [cart]);
  const cartTotal = useMemo(() => Object.values(cart).reduce((s, v) => s + v.qty * v.price, 0), [cart]);
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

  const ctxValue = { ...langCtx, installPrompt: isStandalone ? null : (installPrompt || true), onInstall: triggerInstall, go, globalNavOpen, setGlobalNavOpen };
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
  const cartBadge = cartCount > 0 && ReactDOM.createPortal(
    <button onClick={() => { if (view === 'whatsapp') { setCartOpen(true); } else { go('whatsapp', { openCart: true }); } }} className={`fixed ${view === 'home' ? 'bottom-5 right-4' : 'top-4 right-4'} flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full font-bold text-sm text-white`} style={{ background: 'linear-gradient(135deg, ' + ORANGE + ', #ff8a3d)', boxShadow: '0 10px 26px rgba(230,90,10,.45)', zIndex: 90 }}>
      <span className="relative"><ShoppingBag size={17} /><span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: GREEN, color: GOLD }}>{cartCount}</span></span>
      {fmt(cartTotal)}
    </button>,
    document.body
  );


  if (view === 'home') {
    return <LangContext.Provider value={ctxValue}><HomeView go={go} installPrompt={installPrompt} onInstall={triggerInstall} cartCount={cartCount} />{installHelpModal}{cartBadge}</LangContext.Provider>;
  }

  return (
    <LangContext.Provider value={ctxValue}>
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
        @keyframes toastSlide { 0%{ opacity:0; transform:translateX(-50%) translateY(-16px); } 12%{ opacity:1; transform:translateX(-50%) translateY(0); } 85%{ opacity:1; transform:translateX(-50%) translateY(0); } 100%{ opacity:0; transform:translateX(-50%) translateY(-10px); } }
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
    </LangContext.Provider>
  );
}
