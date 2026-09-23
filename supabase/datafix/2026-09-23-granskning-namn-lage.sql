-- 2026-09-23: Granskning av namn, webbplats och läge för alla synliga platser.
-- Metod (mätt): alla 424 webbplatser hämtades; platsens namn jämfördes med sidans titel/text,
-- ö/ort jämfördes med sidans text, och poster med delad koordinat/telefon/domän flaggades.
-- 58 flaggade poster granskades mot tillåtna källor. Alla citat nedan är kontrollerade
-- genom textsökning i den renderade sidan 2026-09-23.
-- Koordinater märkta "geokodad" = verifierad adress från källan, omräknad med
-- OpenStreetMap Nominatim (härledd position, inte en uppgift ur källan).
-- Reversibelt: dolda poster får hidden_at + hidden_reason. Inget raderas.

-- ═══ 1. DÖLJS ═══
update restaurants set hidden_at = now(), hidden_reason = v.skal
from (values
  ('mathantverkstan-skargarden', 'Webbplatsen tillhör Waxholm Mathantverk, "ett småskaligt bryggeri med tillverkning på Resarö" – inget café'),
  ('eriks-bastu', 'Finns inte i någon tillåten källa; webbplatsen tillhör Lilla Sauna (Söder Mälarstrand, Vaxholm, Täby, Åkersberga)'),
  ('kadettbryggan', 'Tomtägareföreningens badbrygga (svenskalag.se/isterberget); webbplats/telefon tillhörde restaurangen Strandbryggan'),
  ('sandhamns-sjöstation', 'Hittas inte i någon tillåten källa; telefonen delades med annan sjömack'),
  ('orno-krog', 'Samma koordinat som kyrkviken-bar-bistro (Kyrkviken, Ornö); text utan å/ä/ö utan källa'),
  ('sandhamns-vardshus', 'Dubblett av sandhamn-sandhamns-vardshus (samma webbplats och telefon)'),
  ('nickstabadet-mini', 'Dubblett av nickstabadet (samma badplats enligt HaV)'),
  ('waxholms-camping-servering', 'Del av Waxholms Camping (vaxholm-waxholms-camping); koordinaten låg i Vaxholms centrum'),
  ('strande-dyna', 'Hittas inte i någon tillåten källa; webbplatsen gryning.se är ett behandlingshem'),
  ('bara-smor-fjallbacka', 'Webbplatsen död (Wix-fel); finns inte i någon tillåten källa; koordinat identisk med Stora Hotellet'),
  ('hamnen-kapellskar-ankommande', 'Kapellskär är en färje- och godshamn ("the northernmost port of the Ports of Stockholm"), ingen gästhamn'),
  ('finnsjogardens-bastu', 'Föreningsbastu vid Finnsjön i Mölnlycke (sjovalla.se) – insjö, inte skärgård'),
  ('orno-naturhamn', 'Dubblett: webbplats och telefon (08-501 581 00) tillhör Ornöbåtvarvs gästhamn = orno-gasthamn-och-stugor'),
  ('blido-sommarcafe', 'Webbplats/telefon tillhör Blidö-Saint-Tropez (delikatesser); adress saknas och koordinaten var rund och delad')
) as v(slug, skal)
where restaurants.slug = v.slug and restaurants.hidden_at is null;

-- ═══ 2. RÄTT NAMN, RÄTT PLATS ═══

-- KÄLLA visitvarmdo.com/utbud/cafe-sjostugan-lillsved/: "I hjärtat av skärgården, vid Lillsved på Norra Värmdö ligger idylli…",
-- "Lillsved brygga, Värmdö NV, Sverige", "+46 (0) 85413 80 26". Läge: Lillsved (geokodad).
update restaurants set name = 'Café Sjöstugan', island = 'Värmdö', phone = '08-541 380 26',
  latitude = 59.41017, longitude = 18.49936,
  description = 'Café Sjöstugan ligger vid Lillsved brygga på norra Värmdö.',
  updated_at = now() where slug = 'hemmesta-sjocafe';

-- KÄLLA ingmarsobageri.com: "På Ingmarsö bageri serverar vi alltid dagsfärskt bröd och sötebröd.",
-- "På uteserveringen i vår trädgård kan ni slå er ner för att äta frukost, lunch mi…", "08-37 09 50".
-- Koordinaten 59.4675,18.7572 ligger på Ingmarsö (inte Finnhamn).
update restaurants set name = 'Ingmarsö bageri', island = 'Ingmarsö', website = 'https://ingmarsobageri.com/',
  description = 'Ingmarsö bageri serverar dagsfärskt bröd och sötebröd, och på uteserveringen i trädgården går det att äta frukost och lunch.',
  updated_at = now() where slug = 'bagarbordet-finnhamn';

-- KÄLLA visitstockholm.com/o/magasinet-i-vaxholm/: "Fiskaregatan 1, 185 32 Vaxholm",
-- "Magasinet, located on the waterfront in idyllic Vaxholm, is more than a re…". Posten låg i Gustavsberg.
-- Läge: Fiskaregatan 1 (geokodad, husnivå).
update restaurants set name = 'Magasinet i Waxholm', island = 'Vaxholm', latitude = 59.40327, longitude = 18.35454,
  description = 'Magasinet ligger vid vattnet på Fiskaregatan 1 i Vaxholm.',
  updated_at = now() where slug = 'magasinet-gustavsberg';

-- KÄLLA namdosolvik.com/handla: "Här hittar du allt från färska råvaror till vardagens nödvändigheter…",
-- handlarn.se: "Solvik 201, 130 36 Nämdö"; skargardsstiftelsen.se/omraden/namdo/: "I Solvik finns livsmedelsbutik, café och service."
update restaurants set name = 'Nämdö Solviks butik och café', island = 'Nämdö', website = 'https://www.namdosolvik.com/handla',
  phone = '076-256 12 43',
  description = 'Butiken i Solvik på Nämdö säljer färska råvaror och vardagsvaror. I Solvik finns också café och service.',
  updated_at = now() where slug = 'namdö-handelsbod-cafe';
-- KÄLLA namdosolvik.com/handla: "Här tankar du snabbt och smidigt innan nästa äventyr till havs."; kontakt: "076-256 12 43".
update restaurants set name = 'Nämdö Solviks sjömack', phone = '076-256 12 43', website = 'https://www.namdosolvik.com/handla',
  description = 'Sjömacken i Solvik på Nämdö, där båtar kan tanka.',
  updated_at = now() where slug = 'namdo-macken';
-- KÄLLA namdosolvik.com/gasthamn: "Nämdö Solviks gästhamn är en välkomnande plats för både små och stora båtar.",
-- "Passa på att besöka vår livsmedelsbutik, bageri eller restaurang medan du ligger…"
update restaurants set name = 'Nämdö Solviks gästhamn', island = 'Nämdö', type = 'harbor', website = 'https://www.namdosolvik.com/gasthamn',
  description = 'Nämdö Solviks gästhamn tar emot både små och stora båtar. I Solvik finns livsmedelsbutik, bageri och restaurang.',
  updated_at = now() where slug = 'namndö-gasthamn';

-- KÄLLA tenorok.se/om-oss: "Sommaren 2026 tar jag, Malin Lönneberg över tidigare Bryggan på Tenö";
-- tenorok.se: "En restaurang i Stockholms skärgård med eget litet rökeri och deli.";
-- hitta-hit: "Du hittar oss på Bogesundslandet vid Tenöbadet.", "Adressen är Tenö 1 A, 185 93 Vaxholm",
-- "Kommer du med båt är du välkommen att lägga till vid vår gästbrygga."; kontakt: "Telefon: 070 0261301";
-- srmh.taby.se: "Tenö Rök & Brygga Tenö 1A 185 93 Vaxholm". Posten låg vid 59.1,17.98 (söder om Stockholm).
-- Läge: Tenöbadet (geokodad).
update restaurants set name = 'Tenö Rök & Brygga', island = 'Bogesundslandet', website = 'https://tenorok.se/',
  phone = '070-026 13 01', latitude = 59.39257, longitude = 18.33038,
  description = 'Tenö Rök & Brygga är en restaurang med eget litet rökeri och deli vid Tenöbadet på Bogesundslandet, tidigare Bryggan på Tenö. Den som kommer med båt kan lägga till vid gästbryggan.',
  updated_at = now() where slug = 'bryggan-teno';

-- KÄLLA holmensaltsjobaden.se: "Torben Gruts väg 5, 133 39 Saltsjöbaden", "08-717 77 67".
-- Posten låg i Nacka Strand. Läge: Torben Gruts väg (geokodad, gatunivå).
update restaurants set name = 'Holmen', island = 'Saltsjöbaden', latitude = 59.27584, longitude = 18.31573,
  description = 'Holmen ligger på Torben Gruts väg 5 i Saltsjöbaden.',
  updated_at = now() where slug = 'holmen-kok-bar';

-- KÄLLA kymendo.se: sidtitel "Kymendö Service", "08 - 501 542 65". Tidigare text ("Naturhavn…") saknade källa.
update restaurants set name = 'Kymendö Service', website = 'http://www.kymendo.se/', description = null,
  updated_at = now() where slug = 'kymmendo-gasthamn-kok';

-- KÄLLA blidorestaurang.se: "Stämmarsundsbacken Blidö", "Från början av juni till mitten av augusti har vi öppet för lunch och middag."
-- Koordinaten var rund (59.605,18.9). Läge: Stämmarsundsbacken (geokodad).
update restaurants set latitude = 59.63568, longitude = 18.92383,
  description = 'Blidö Brygga & Bistro ligger vid Stämmarsundsbacken på Blidö och har öppet för lunch och middag under sommaren.',
  updated_at = now() where slug = 'blido-brygga-bistro';

-- KÄLLA visitvarmdo.com/utbud/stavsnas-hembageri-2/: "Allévägen 36, Stavsnäs, Sweden", "08-571 504 60",
-- "Ett bageri med lång tradition." Läge: Allévägen (geokodad, gatunivå); delade tidigare koordinat med två andra poster.
update restaurants set name = 'Stavsnäs Hembageri', phone = '08-571 504 60', latitude = 59.29010, longitude = 18.68853,
  description = 'Stavsnäs Hembageri är ett bageri med lång tradition på Allévägen 36 i Stavsnäs.',
  updated_at = now() where slug = 'stavsnäs-hembageri';
-- KÄLLA stavsnasbatvarv.se: "Stavsnäsvägen 218, Vinterhamn, 139 70 Stavsnäs", "Hos oss kan du tanka dygnet runt".
-- Läge: Stavsnäs vinterhamn (geokodad).
update restaurants set latitude = 59.28657, longitude = 18.70432,
  description = 'Stavsnäs Båtvarv & Sjömack ligger vid Vinterhamnen i Stavsnäs, där det går att tanka dygnet runt.',
  updated_at = now() where slug = 'stavsnäs-batvart-sjomack';
-- Webbplatsens titel: "STAVSNÄS KROG" (hämtad 2026-09-23).
update restaurants set name = 'Stavsnäs Krog', updated_at = now() where slug = 'stavsnas-restaurang-bar';

-- KÄLLA skansholmen.com: "Välkommen till Skansholmen på vackra Mörkö…", "Bo i mysiga stugor, på vår naturnära camping,
-- lägg till i gästhamnen…", "Lägg till i Skansholmens skyddade marina med plats för 140 båtar upp till 52 fot",
-- "Två restauranger – flera vyer.", "Skansholmen, 153 93 Mörkö". Läge: Skansholmen, Södertälje kommun (geokodad).
update restaurants set name = 'Skansholmen', type = 'marina', latitude = 59.04790, longitude = 17.69207,
  description = 'Skansholmen på Mörkö har en skyddad marina med plats för 140 båtar, gästhamn, två restauranger, stugor och camping.',
  updated_at = now() where slug = 'morko-morko-stugor';

-- KÄLLA barsebackshamn.eu: "Barsebäckshamn är ett gammalt charmigt fiskeläge med anor från 1400-talet.",
-- "Position 55°45,4 N 12°54,1 E". Posten var typad restaurang med rund koordinat.
update restaurants set name = 'Barsebäckshamn', type = 'harbor', latitude = 55.75667, longitude = 12.90167,
  description = 'Barsebäckshamn är ett gammalt fiskeläge med anor från 1400-talet.',
  updated_at = now() where slug = 'barseback-marina';

-- ═══ 3. RÄTT Ö/ORT ═══
update restaurants set island = 'Ingmarsö', updated_at = now() where slug = 'ingmarso-gasthamn';
-- KÄLLA vastsverige.com/stromstad/produkter/strandkanten/: "I en ombyggd sjöbod precis vid Nordkosters strand…"
update restaurants set name = 'Strandkanten på Nordkoster', island = 'Nordkoster', updated_at = now() where slug = 'strandkanten-pa-nord-koster';
-- KÄLLA frokentrulls.se: "Du hittar oss på Orust, direkt utanför Ellös i vad vi kallar Morlanda by…"
update restaurants set island = 'Orust', updated_at = now() where slug = 'froken-trulls';
-- KÄLLA goteborg.com/platser/knarrholmen: "Knarrholmen är en av de mindre öarna i Göteborgs södra skärgård.",
-- "Du når Knarrholmen med skärgårdsfärja från Saltholmen."; goteborg.com/platser/restaurang-knarrholmen:
-- "Skärgård, västkustinspirerad mat och gott vin." (Tidigare text sa felaktigt "på Donsö".)
update restaurants set island = 'Knarrholmen',
  description = 'Knarrholmens restaurang ligger på Knarrholmen, en av de mindre öarna i Göteborgs södra skärgård, dit skärgårdsfärjan går från Saltholmen. Maten är västkustinspirerad.',
  updated_at = now() where slug = 'knarrholmens-restaurang';

-- ═══ 4. RÄTT WEBBPLATS / TELEFON / NAMN ═══
update restaurants set website = 'https://grinda.se/boende/sealodge/',
  description = 'Grinda Sea Lodge ligger vid havet på södra delen av Grinda. Boendet är fördelat på fyra längor med totalt 44 bäddar i fyr- och tvåbäddsrum.',
  updated_at = now() where slug = 'grinda-grinda-sea-lodge';
update restaurants set website = 'https://waxholmscamping.com/', updated_at = now() where slug = 'vaxholm-waxholms-camping';
update restaurants set name = 'Gustafsberg', website = null, updated_at = now() where slug = 'gustavsberg';
update restaurants set website = 'https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser',
  description = 'Kåreviks badplats ligger i Rönnäng på södra Tjörn och har gräsytor, sandstrand, klippor, badbryggor och hopptorn. Sötvattendusch och toaletter finns nära badplatsen.',
  updated_at = now() where slug = 'kareviks-badplats';
update restaurants set website = 'https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn',
  phone = '070-620 89 17', updated_at = now() where slug = 'kungshamn-gasthamn';
update restaurants set website = 'https://goteborg.se/wps/portal/start/uppleva-och-gora/idrott-motion-och-friluftsliv/simma-och-bada/badplatser/hitta-badplatser-utomhusbad?id=3698',
  updated_at = now() where slug = 'smithska-udden';
update restaurants set name = 'Lysekils Marina', website = 'https://lysekilsmarina.se/', updated_at = now()
  where slug = 'lysekils-marina-ab-basteviksholmarna';
update restaurants set website = 'https://www.vastsverige.com/sotenas/produkter/henrik-olssons-fiskaffar/', updated_at = now()
  where slug = 'henrik-s-sjokrog';
update restaurants set name = 'Lilling Cottage', website = 'https://www.goteborg.com/platser/lilling-cottage', updated_at = now()
  where slug = 'lilling-cottage-ab';
update restaurants set website = 'https://barbuco.se/', updated_at = now() where slug = 'big-buco-gotland';
update restaurants set website = 'https://www.svenskagasthamnar.se/oregrunds-skargard/elmsta-almsta-gasthamn/', updated_at = now()
  where slug = 'elmsta-udde-gasthamn';
update restaurants set name = 'Singö Camping', updated_at = now() where slug = 'singo-camping-grisslehamns-marina-och-camping-ab';

-- ═══ 5. PÅHITTADE TEXTER (skrivna utan å/ä/ö) ERSATTA MED KÄLLA ═══
-- KÄLLA svenskagasthamnar.se/stockholms-skargard/nynashamn/: "Läge 5854 N 1757 E", "Gästplatser 300",
-- "Förtöjning bom/boj", "Längs hamnstråket finns det restauranger och caféer.",
-- "Nynäshamns centrum ligger cirka fem minuters promenadväg från…"
update restaurants set name = 'Nynäshamns gästhamn', type = 'harbor',
  description = 'Nynäshamns gästhamn har 300 gästplatser med förtöjning vid bom eller boj. Längs hamnstråket finns restauranger och caféer, och centrum ligger ungefär fem minuters promenad bort.',
  updated_at = now() where slug = 'nynashamns-gasthamn';
-- KÄLLA samma sida: "Diesel", "Bensin". Marinestore (tidigare webbplats) är ett båtföretag, ingen sjömack.
update restaurants set name = 'Sjömack i Nynäshamns gästhamn', type = 'fuel',
  website = 'https://www.svenskagasthamnar.se/stockholms-skargard/nynashamn/', phone = null,
  description = 'Enligt Svenska Gästhamnar finns diesel och bensin i Nynäshamns gästhamn.',
  updated_at = now() where slug = 'nynashamn-marinbransle';
-- KÄLLA skargardsstiftelsen.se/omraden/huvudskar/: "Huvudskär ligger längst ut i Haninges ytterskärgård, sydost om Ornö.",
-- "För den som kommer med egen båt finns också naturhamnar och gästbryggor i området.",
-- "Huvudskär har flera välbesökta naturhamnar och i fladen mellan Ålandsskär och Lökskär blir det ibland fullt med båtar."
update restaurants set name = 'Huvudskär', type = 'harbor', website = 'https://skargardsstiftelsen.se/omraden/huvudskar/',
  description = 'Huvudskär ligger längst ut i Haninges ytterskärgård, sydost om Ornö. Här finns naturhamnar och gästbryggor, och fladen mellan Ålandsskär och Lökskär blir ibland full med båtar.',
  updated_at = now() where slug = 'huvudskar-gasthamn';
-- KÄLLA svenskagasthamnar.se/gotland/katthammarsvik/: "Båthamn på Gotland 5 mil öster om Visby. Hamnen ligger i anslutning till
-- Katthammarsviks Rökeri och Pensionat Borgvik.", "En gammal lanthamn från tidigt 1900-tal (nyrenoverad). 100m till den populära badplatsen.",
-- "Gästplatser 5", "Förtöjning Mot sydvästra hörnet av kajen."
update restaurants set name = 'Katthammarsviks gästhamn', type = 'harbor',
  website = 'https://www.svenskagasthamnar.se/gotland/katthammarsvik/',
  description = 'Katthammarsvik är en gammal lanthamn från tidigt 1900-tal, fem mil öster om Visby, i anslutning till Katthammarsviks Rökeri. Hamnen har fem gästplatser med förtöjning mot kajens sydvästra hörn, och badplatsen ligger 100 meter bort.',
  updated_at = now() where slug = 'katthammarsvik-gasthamn';
-- KÄLLA sverigesnationalparker.se (Gotska Sandön, hitta hit): "Det går givetvis bra att besöka Gotska Sandön med egen båt året runt.",
-- "Läget långt ut i Östersjön ställer dock stora krav på båt och sjövana. Det finns ingen hamn så du får ankra utanför på en läsida.",
-- "Observera att det finns ett sälskyddsområde vid Säludden i nordost. Det är ankringsförbud vid Tärnudden."; kontakt: "Telefon: 010-223 92 80".
-- Koordinaten är ungefärlig: källan anger ingen bestämd ankringsplats.
update restaurants set name = 'Gotska Sandön', island = 'Gotska Sandön', phone = '010-223 92 80',
  website = 'https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/besok-parken/hitta-hit',
  description = 'Gotska Sandön går att besöka med egen båt året runt, men läget långt ut i Östersjön ställer stora krav på båt och sjövana. Det finns ingen hamn, så man ankrar på en läsida. Det är ankringsförbud vid Tärnudden och ett sälskyddsområde vid Säludden i nordost.',
  updated_at = now() where slug = 'gotska-sando-naturhamn';
