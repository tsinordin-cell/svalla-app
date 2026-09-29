-- 2026-09-23: 43 beskrivningar med värdeord utan källa ("populär", "perfekt", "mysig" m.fl.),
-- mest från importen 2026-04-16/17. Varje text är omskriven och bygger bara på citat ur
-- tillåtna källor; citaten är kontrollerade med textsökning i renderad sida 2026-09-23.
-- Saknas källa töms texten (Toms ja: tomt fält hellre än påhittat).
-- Källor som bedömts som regionala turistorganisationer: explorearchipelago.com (Åbo stad +
-- Skärgårdsstiftelsen), destinationvaxholm.se, visitstockholm.se. uto.se har inte godtagits.
-- Koordinater: "källa" = position angiven av verksamheten/Svenska Gästhamnar;
-- "geokodad" = verifierad adress omräknad med OpenStreetMap Nominatim.
-- Mätt i egen besöksstatistik (analytics_events): Husarö 36 visningar, Furusund café/kiosk 24,
-- Dalarö värdshus 8, övriga 0–5. Search Console kunde inte läsas denna gång.

-- ═══ DÖLJS ═══
update restaurants set hidden_at = now(), hidden_reason = v.skal
from (values
  ('dalaro-skansen', 'Dalarö skans är en privat ö som hyrs ut för event (dalaroskans.com: "renting the island"; SFV: "I dag är ett eventbolag hyresgäst"), ingen allmän restaurang'),
  ('dalaro-dalaro-skans-hotell', 'Dalarö skans är en privat ö som hyrs ut för event (dalaroskans.com), inget allmänt hotell'),
  ('furusund-cafe-kiosk', 'Dubblett: glass och fika säljs i hamnkrogen i Furusunds gästhamn (svenskagasthamnar.se) = furusunds-brygga-restaurang'),
  ('rokeriet-pa-fjaderholmarna', 'Dubblett av rokeriet-fjaderholmarna; webbplats/telefon tillhörde Fjäderholmarnas Krog AB')
) as v(slug, skal)
where restaurants.slug = v.slug and restaurants.hidden_at is null;

-- ═══ TEXT SAKNAR KÄLLA → TÖMS ═══
update restaurants set description = null, updated_at = now()
where slug in ('bakgarden-uto','toro-ankarudden','vaxholms-hembygdsgards-cafe','lilla-haket-ninas-bod','nosunds-vardshus');

-- ═══ NY TEXT MED KÄLLA ═══
-- svenskagasthamnar.se/stockholms-skargard/husaro/: "Sjöstationen tjänstgör som ett minilivs på ön.",
-- "…ekologiska livsmedel för kompletteringar och de erbjuder kaffe samt grillade paninis.", "Drivmedel kan köpas med kortautomat året runt."
update restaurants set type = 'harbor', website = 'https://www.svenskagasthamnar.se/stockholms-skargard/husaro/',
  description = 'Vid Husarö gästhamn fungerar Sjöstationen som minilivs med ekologiska livsmedel, kaffe och grillade paninis. Drivmedel kan köpas med kortautomat året runt.',
  updated_at = now() where slug = 'husaro-gasthamn-cafe';
-- explorearchipelago.com (Landsort): "Saltboden är en kombinerad handelsbod, servering och pub som ligger på den södra delen av Landsort, mitt i den lilla byn.", "Landsort 1148, 149 95 Nynäshamn"
update restaurants set description = 'Saltboden Kök & Proviant är en kombinerad handelsbod, servering och pub mitt i byn Landsort, på öns södra del.',
  updated_at = now() where slug = 'saltboden-kok-proviant';
-- fejanoutdoor.se (engelsk sida): "Fejan Outdoor has a small café that serves both sweet and savory swedish waffles";
-- "…drive all the way to "Räfsnäs Brygga" outside Norrtälje … and then take the local ferry boat to…"
update restaurants set description = 'Fejan Outdoor på Fejan har ett litet våffelcafé med både söta och salta våfflor. Fejan nås med den lokala färjan från Räfsnäs brygga utanför Norrtälje.',
  updated_at = now() where slug = 'fejan-outdoor-vaffelcafe';
-- engso-events.com: "Engsö slott, med anor från 1100-talet, ligger centralt på ön", "Ett 30-tal öar i Mälaren bildar Engsö Skärgård.",
-- "Kaffe på rostade bönor.", "2st pannkaka med sylt och sötad grädde.", "Krispigt grillad lavain fylld med krämig skagenröra och skivor av gravad lax."
update restaurants set name = 'Café på Engsö slott', type = 'cafe', island = 'Engsö',
  description = 'Caféet på Engsö slott ligger på ön Engsö i Mälaren och serverar kaffe, bakverk, pannkakor med sylt och grillat levainbröd med skagenröra och gravad lax.',
  updated_at = now() where slug = 'angso-slottsrestaurang';
-- vitagrindarna.se: "Sollenkrokavägen 33, 139 73 Djurhamn"; /boende/: "Vid besök på restaurangen, strandcaféet eller vid bokning av annat evenemang kan ni ligga vid vår brygga.";
-- /restaurangen/: "…favoriterna från havet, det krispigt läckra från växtriket och godsakerna från betesmarkerna."
update restaurants set description = 'Vita Grindarna vid Djurö havsbad, Sollenkrokavägen 33 i Djurhamn, har restaurang och strandcafé. Gäster på restaurangen eller i strandcaféet kan ligga vid bryggan, och menyn har rätter från havet, vegetariskt och kött.',
  updated_at = now() where slug = 'vita-grindarna-djuro';
-- explorearchipelago.com (Dalarö Mat): "Här hittar du färska grönsaker och frukt samt trädgårdscafé och dagens lunch.", "Odinsvägen 25, 137 70 Dalarö", "070-926 24 62".
-- Telefonen i posten tillhörde Dalarö Mat. Läge: Odinsvägen 25 (geokodad, husnivå).
update restaurants set name = 'Dalarö Mat', type = 'cafe', phone = '070-926 24 62', latitude = 59.13304, longitude = 18.40802,
  description = 'Dalarö Mat på Odinsvägen 25 i Dalarö säljer färska grönsaker och frukt och har trädgårdscafé och dagens lunch.',
  updated_at = now() where slug = 'dalaro-krog';
-- destinationvaxholm.se: "På Syrran & Jag i Rindö hamn kan ni avnjuta god mat och dryck medan kryssningsfartyg och båtar passerar utanför fönstret.",
-- "Kökets filosofi är vällagad mat på hållbara råvaror…", "Grisselmarens väg 21". Läge: Syrran & Jag, Grisselmarens väg 21 (geokodad).
update restaurants set name = 'Syrran & Jag', latitude = 59.39290, longitude = 18.43943,
  description = 'Syrran & Jag är en restaurang i Rindö hamn, Grisselmarens väg 21, där kryssningsfartyg och båtar passerar utanför fönstren. Köket lagar mat på hållbara råvaror.',
  updated_at = now() where slug = 'rindo-kafe';
-- goteborg.com (guide ät och fika i skärgården): "Här kommer mycket av fisken och skaldjuren direkt från Styrsös egna fiskebåtar.",
-- "Restaurangen är belägen på en brygga över havet…"; engelsk version: "Next to Donsö lies Styrsö. Here, you can head to Tångbaren…"
update restaurants set island = 'Styrsö',
  description = 'Tångbaren är en restaurang på en brygga över havet på Styrsö. Mycket av fisken och skaldjuren kommer från Styrsös egna fiskebåtar.',
  updated_at = now() where slug = 'tangbaren';
-- lemoinebageri.se: "Gransbergsvägen 12, 13973 Djurhamn", "Våra bullar och croissanter…", "…surdegsbröd…", "Nu har vi börjat med pizza!", "Räksallad", "Kycklingsallad".
-- Posten låg ca 13 km fel. Läge: Gransbergsvägen 12 (geokodad, husnivå).
update restaurants set name = 'Le Moine Hantverksbageri', island = 'Djurö', latitude = 59.31037, longitude = 18.69794,
  description = 'Le Moine Hantverksbageri på Gransbergsvägen 12 i Djurhamn bakar bullar, croissanter och surdegsbröd och säljer även pizza och sallader.',
  updated_at = now() where slug = 'munkens-bageri-djurhamn';
-- svenskaturistforeningen.se: "STF Siaröfortet Skärgårdskrog och Pensionat ligger på Kyrkogårdsön, mitt i farleden mellan Vaxholm och Furusund.",
-- "…logementsbyggnaden från 1916"; siarofortet.se/gästhamn-2/: "Gästhamnen ligger strategiskt på den sydöstra sidan…", "…erbjuder bojar…",
-- "Dessutom finns tillgång till el", "En dagbrygga för besökare till museet, cafét och restaurangen…"
update restaurants set name = 'Siaröfortet', island = 'Kyrkogårdsön', website = 'https://siarofortet.se/',
  description = 'Siaröfortet på Kyrkogårdsön, i farleden mellan Vaxholm och Furusund, har skärgårdskrog, café, museum och pensionat i en logementsbyggnad från 1916. Gästhamnen på öns sydöstra sida har bojar och el, och vid dagbryggan kan besökare till museet, caféet och restaurangen lägga till.',
  updated_at = now() where slug = 'siarofortet-krog';
-- rokeriet-fjaderholmarna.se: "…våra egna rökta produkter, tillagade på plats…", "vår deli och glasskiosk", "En kort sträcka från bryggan så är du direkt hos oss"
update restaurants set island = 'Fjäderholmarna',
  description = 'Rökeriet är en restaurang på Stora Fjäderholmen som serverar egna rökta produkter tillagade på plats. Sommartid finns också deli och glasskiosk, en kort bit från bryggan.',
  updated_at = now() where slug = 'rokeriet-fjaderholmarna';
-- vikenshamn.se: "Vikens Hamnförening - Hamnplanen 3 263 61 Viken"; hamninfo: "Här vid slipen finns servicehuset med betalstation, toaletter, duschar, tvätt och torkmöjligheter."; gästhamn: "El & vatten"
update restaurants set name = 'Vikens hamn', type = 'harbor', island = 'Viken',
  description = 'Vikens hamn på Hamnplanen 3 i Viken har gästplatser med el och vatten. Vid slipen finns servicehuset med toaletter, duschar och tvätt.',
  updated_at = now() where slug = 'vikens-gasthamn';
-- hamnen4.se: "Vi finns mitt på Smögenbryggan…", "Sillgatan 16 456 51, Smögen", "…trähuset från 1800-talet…",
-- "…har genom åren varit både postkontor och segelmakeri", "Vår meny hämtar inspiration från västkustens lokala råvaror i säsong…"
update restaurants set description = 'Restaurang Hamnen 4 ligger mitt på Smögenbryggan, Sillgatan 16, i ett trähus från 1800-talet som har varit både postkontor och segelmakeri. Menyn bygger på lokala råvaror från västkusten efter säsong.',
  updated_at = now() where slug = 'restaurang-hamnen-4';
-- kbb-orno.se: "Kyrkvikens bar & bistro är en skärgårdskrog belägen vid Kyrkviken på Ornö i Stockholms södra skärgård."
update restaurants set name = 'Kyrkvikens Bar & Bistro', website = 'https://www.kbb-orno.se/',
  description = 'Kyrkvikens Bar & Bistro är en skärgårdskrog vid Kyrkviken på Ornö i Stockholms södra skärgård.',
  updated_at = now() where slug = 'kyrkviken-bar-bistro';
-- fjaderholmarnasbryggeri.se: "Brewpub (at sea)", "Stora Fjäderholmen SE-100 05 Stockholm"; /fjaderholmarnas-bryggeri-at-sea: "4–5 of our own brews"
update restaurants set description = 'Fjäderholmarnas Bryggeri har sin brewpub på Stora Fjäderholmen, där det går att prova fyra till fem av bryggeriets egna öl.',
  updated_at = now() where slug = 'fjaderholmarna-bryggeri';
-- storakarlso.se/karlsorestaurangen/: "Restaurangen är belägen i Norderhamn … närhet till båten, museet, starten på guideturerna",
-- "…stekt sill, gravad lax och handskalade räkor", "…vegetariska alternativ…", "För barnen finns egna alternativ på menyn.", "I café-delen finns även ett hörn med souvenirer."
update restaurants set island = 'Stora Karlsö',
  description = 'Restaurangen på Stora Karlsö ligger i Norderhamn, nära båten, museet och starten för guideturerna. Menyn har bland annat stekt sill, gravad lax och handskalade räkor, med vegetariska rätter och barnrätter, och i cafédelen finns fika, glass och souvenirer.',
  updated_at = now() where slug = 'stora-karlso-restaurang-gotland';
-- hamnkrogenvaxholm.com: "Hamnkrogen har varit vaxholmarnas kvarterskrog sedan 1950-talet.", "…äta lunch, middag eller ta något att dricka medan du ser ut över båtlivet i gästhamnen.",
-- "…ostar från Ostmakeriet på Rindö och öl…", "Söderhamnen 10 185 31 Vaxholm", "59°24'05.8"N 18°21'05.8"E" (källa).
update restaurants set latitude = 59.40161, longitude = 18.35161,
  description = 'Hamnkrogen på Söderhamnen 10 i Vaxholm har varit kvarterskrog sedan 1950-talet och ser ut över gästhamnen. Här serveras lunch, middag och dryck, bland annat ostar från Ostmakeriet på Rindö och öl från lokala bryggerier.',
  updated_at = now() where slug = 'hamnkrogen-vaxholm';
-- utogasthamn.se/kiosk-cafe/: "Här finns kiosk, café och restaurang i samma byggnad.", "I Hamnbodens restaurang är sushi vår specialitet!",
-- "kokt korv, toast, smörgåsar…"; utogasthamn.se: "I vår gästhamn finns plats för ca 300 fritidsbåtar."
update restaurants set description = 'Hamnboden i Utö gästhamn har kiosk, café och restaurang i samma byggnad, med sittplatser mot bryggorna. Restaurangen har sushi som specialitet och serverar även bland annat kokt korv, toast och smörgåsar. Gästhamnen har plats för omkring 300 fritidsbåtar.',
  updated_at = now() where slug = 'hamnboden-uto';
-- grundet.se: "Sjökrog och boende på egen Ö i Stockholms skärgård", "Rögrund är belägen på Nämndöfjärden … mellan Stavsnäs och Dalarö.",
-- "Du som kommer med egen båt … kan lägga till på någon av båtplatserna i anslutning till Sjökrogen. (Dock ej över natten)."
update restaurants set island = 'Rögrund',
  description = 'Rögrunds Sjökrog är en sjökrog med boende på ön Rögrund i Nämndöfjärden, mellan Stavsnäs och Dalarö. Den som kommer med egen båt kan lägga till vid båtplatserna intill sjökrogen, dock inte över natten.',
  updated_at = now() where slug = 'rogrunds-sjokrog';
-- vaxholmsfastning.se/besoksinfo/: "enkelt café finns i museets reception.", "Museishop…", "…med Waxholmsbolaget når du Kastellet året runt."
update restaurants set type = 'cafe', island = 'Kastellet',
  description = 'Ett enkelt café finns i receptionen till Vaxholms fästnings museum på Kastellet, där det också finns en museibutik. Kastellet nås året runt med Waxholmsbolagets båtar.',
  updated_at = now() where slug = 'vaxholms-fastning-cafe';
-- hotellfurusund.se: "…restaurang med anslutande "orangerie"…"; /restaurangen/: "…säsongsbaserade menyer…", "I restaurangens vackra matsal ryms hundra gäster",
-- "De stora kryssningsfartygen glider tätt förbi restaurangen…"; /kontakt/: "Furusund Strandväg 2"
update restaurants set name = 'Hotell Furusund', website = 'https://hotellfurusund.se/',
  description = 'Hotell Furusund på Furusund Strandväg 2 har restaurang med orangeri och säsongsbaserade menyer. Matsalen rymmer hundra gäster, och kryssningsfartygen passerar tätt förbi.',
  updated_at = now() where slug = 'furusund-vardshus';
-- artipelag.se (engelsk): "On the top floor, with a breathtaking views of the Stockholm archipelago you find Artipelag Restaurant."
update restaurants set island = 'Värmdö',
  description = 'Artipelag på Värmdö har restaurangen Artipelag Restaurant på översta våningen, med utsikt över Stockholms skärgård.',
  updated_at = now() where slug = 'artipelag';
-- svartsolanthandel.se: "Svartsö Lanthandel är en välsorterad butik med fräscha grönsaker och butiksbageri.", "Butiken är ombud för PostNord, DHL, Schenker och UPS. Systembolaget och Apoteket.",
-- /gasthamn: "Hamnen drivs av oss i Svartsö Lanthandel och ligger i anslutning till både butiken och vårt fina café.", "…servicehus innehållandes toalett & dusch…";
-- /kontakt: "Alsviks Brygga", "N 59°26′13.36"E 18°39′29.58"" (källa). Posten låg ca 5 km fel.
update restaurants set name = 'Svartsö Lanthandel', latitude = 59.43705, longitude = 18.65822, website = 'https://www.svartsolanthandel.se/',
  description = 'Svartsö Lanthandel vid Alsviks brygga på Svartsö är en livsmedelsbutik med butiksbageri och ombud för bland annat PostNord, Systembolaget och Apoteket. Lanthandeln driver också gästhamnen intill, med toalett och dusch, och ett café.',
  updated_at = now() where slug = 'svartsö-handelsbod';
-- hoganashamnkrog.se: "…läge i hamnen i Höganäs.", "Småbåtshamnen 26, 263 39 Höganäs", "Välj mellan Dagens lunch, Veckans Fisk och Veckans vegetariska", a la carte, "…viner och öl…", "Vår Cocktailmeny…"
update restaurants set island = 'Höganäs',
  description = 'Höganäs Hamnkrog ligger i hamnen i Höganäs, Småbåtshamnen 26. Krogen serverar dagens lunch, veckans fisk och veckans vegetariska samt à la carte, vin, öl och cocktails.',
  updated_at = now() where slug = 'hoganas-hamnkrog';
-- tullhuset.nu: "Tullhuset Restaurant & Bar är en skärgårdskrog som huserar i anrika Dalarö Tullhus.", "…utsikt över Dalarö ström…ekologiskt fokus",
-- "…traditionella luncher, middagar samt festvåningsmenyer.", "Vi tar med nöje emot större beställningar såsom dop, bröllop…"
update restaurants set name = 'Tullhuset Restaurant & Bar, Dalarö',
  description = 'Tullhuset Restaurant & Bar är en skärgårdskrog i Dalarö tullhus med utsikt över Dalarö ström. Här serveras luncher och middagar med ekologiskt fokus, och restaurangen tar emot större beställningar som dop och bröllop.',
  updated_at = now() where slug = 'dalaro-vardshus';
-- sandhamnsbageriet.com: "Box 78, 130 39 Sandhamn", bröd (vetesurdeg, rågsurdeg), frallor, "SÖTA BULLAR … Kanelbulle, Kardemummabulle, Seglarbulle",
-- "BESTÄLLNINGSSORTIMENT … TÅRTOR", "BURKAR … Gelé, Marmelad, Sylt"
update restaurants set name = 'Sandhamnsbageriet',
  description = 'Sandhamnsbageriet i Sandhamn bakar surdegsbröd, frallor och bullar som kanel- och kardemummabullar. Tårtor kan beställas i förväg, och bageriet säljer även sylt och marmelad.',
  updated_at = now() where slug = 'sandhamns-bageriet';
-- utovardshus.se/seglarbaren: "BAREN MITT I HAMNEN", "På Seglarbarens veranda har du första parkett till hela hamninloppet.",
-- "…enklare rätter till lunch eller … kolgrillade rätter till kvällen.", "…fika under dagen", "…cocktails, ölsorter eller viner.", "Intill Seglarbarens uteservering finns en lekplats"
update restaurants set description = 'Seglarbaren är Utö Värdshus bar och restaurang mitt i hamnen på Utö, med veranda mot hamninloppet. Här serveras enklare lunchrätter, kolgrillat på kvällen, fika under dagen samt öl, vin och cocktails, och intill uteserveringen finns en lekplats.',
  updated_at = now() where slug = 'seglarbaren-uto';
-- dalarobageri.se: "Odinsvägen 15 137 70 Dalarö", veckans lunch "Inklusive Salladsbuffé, nybakat bröd…", "Cafémeny", "RÄKSMÖRGÅS", "KVARGPANNKAKOR", "Veckans paj"
update restaurants set name = 'Dalarö Bageri',
  description = 'Dalarö Bageri på Odinsvägen 15 i Dalarö serverar veckans lunch med salladsbuffé och har en cafémeny med bland annat räksmörgås, kvargpannkakor och veckans paj.',
  updated_at = now() where slug = 'dalaro-bageri-cafe';
-- linanasbryggan.se/hittahit: "Linanäsvägen 140 184 97 Ljusterö", "GPS position 59°28,23 N 18°30,38 E" (källa), meny: "Restaurang … Deli & Café Gästhamn",
-- "Waxholmsbolaget har båtar som dagligen åker från både Slussen och Strömkajen i Stockholm till vårt älskade Linanäs."; /faq: "Hur många båtplatser har ni? 20+". Posten låg ca 7 km fel.
update restaurants set latitude = 59.47050, longitude = 18.50633,
  description = 'Linanäsbryggan på Linanäsvägen 140, Ljusterö, har restaurang, deli och café samt gästhamn med över 20 båtplatser. Waxholmsbolagets båtar går hit dagligen från Stockholm.',
  updated_at = now() where slug = 'linanaesbryggan';
-- strommakrogochkanalbar.se: "Intill Strömma kanal ligger vår … restaurang … mitt på Värmdö.", "Lillströmsuddsvägen 2, Värmdö", "…en kontantfri restaurang!"
-- Posten låg i Duvnäs, ca 22 km fel. Läge: Strömma kanalbar, Lillströmsuddsvägen 2 (geokodad).
update restaurants set island = 'Värmdö', latitude = 59.28611, longitude = 18.54833,
  description = 'Strömma Krog & Kanalbar ligger intill Strömma kanal på Värmdö, Lillströmsuddsvägen 2, och är en kontantfri restaurang och bar.',
  updated_at = now() where slug = 'stromma-kanalbar';
-- svenskagasthamnar.se/stockholms-skargard/furusund/: "I det gula huset här intill finns vår hamnkrog där du kan äta en enklare lunch eller middag.",
-- "Här finns även ett stort glassutbud, vin, öl och fika.", "I vår gästhamn finns plats för upp till hundra båtar.", "…toalett, dusch, bastu, el och vatten samt tvättmöjligheter.";
-- furusundshamnkrog.se: "Furusunds strandväg 6, 760 19 Furusund"
update restaurants set name = 'Furusunds Hamnkrog', website = 'https://furusundshamnkrog.se/',
  description = 'Furusunds Hamnkrog ligger i det gula huset vid gästhamnen i Furusund, Furusunds strandväg 6, och serverar enklare luncher och middagar samt glass, vin, öl och fika. Gästhamnen har plats för upp till hundra båtar och har toalett, dusch, bastu, el och vatten.',
  updated_at = now() where slug = 'furusunds-brygga-restaurang';
-- grinda.se/en/food-festivities/grinda-wardshus/: "The historic house has looked out over Saxarfjärden since 1906"; grinda.se: "Det anrika Wärdshuset erbjuder klassisk skärgårdsmat",
-- "Grinda Wärdshus AB … Södra bryggan, Grinda"; gästhamn: "…access to electricity, shower, toilet…"; sjömack: "…we sell Petrol 98, Diesel, LPG…"
update restaurants set description = 'Grinda Wärdshus vid Södra bryggan på Grinda ligger i ett hus som har sett ut över Saxarfjärden sedan 1906 och serverar skärgårdsmat. I viken finns gästhamnen med el, dusch och toalett, och sjömacken säljer bensin, diesel och gasol.',
  updated_at = now() where slug = 'grinda-wardshus';
-- visitstockholm.se/o/roda-villan/: "Restaurangen ligger på Fjäderholmarna … håller öppet under sommarsäsongen…", "…mat grillad över öppen eld, boule…", "Fjäderholmen 1"
update restaurants set island = 'Fjäderholmarna',
  description = 'Röda Villan är en sommarrestaurang på Fjäderholmarna med mat grillad över öppen eld och utsikt över inloppet till Stockholm. Här finns också boule.',
  updated_at = now() where slug = 'roda-villan';
-- nattaro.se/krogen/: "Krogen hittar du intill ångbåtsbryggan och gästhamnen.", "Handelsbod & Glasskiosker"
update restaurants set description = 'Nåttarö krog ligger intill ångbåtsbryggan och gästhamnen på Nåttarö. På ön finns också handelsbod och glasskiosker.',
  updated_at = now() where slug = 'nattaro-krog';
-- nacka.se: "…separata badhus för herr- och dambad, bastu och vinterbad.", "…sandstrand dit alla är välkomna, hopptorn, servering och kajakuthyrning.",
-- "Saltsjöbanan till station Saltsjöbaden. Därefter promenad ca 500 meter."
update restaurants set description = 'Saltsjöbadens friluftsbad har separata badhus för dam- och herrbad med bastu och vinterbad, och en sandstrand som är öppen för alla. Här finns också hopptorn, servering och kajakuthyrning, och från Saltsjöbanans station Saltsjöbaden är det ungefär 500 meter att gå.',
  updated_at = now() where slug = 'saltsjobadens-friluftsbad';
