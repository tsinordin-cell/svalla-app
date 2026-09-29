-- 2026-09-23: Text till platser som saknade text, i ordning efter Google-klick (Search Console,
-- URL-egendomen https://svalla.se/, 3 mån). 39 platser granskades; 17 får text här (varav Torö via befintliga sjoboden-toro-ankarudden); 2 döljs (norrora-krog, dubbletten toro-ankarudden).
-- Citat kontrollerade med textsökning i renderad sida 2026-09-23 (utom där annat anges).
-- Godkända som regionala turist-/ortsorganisationer: explorearchipelago.com, destinationmollosund.se,
-- kostersweden.com (Kosters Samhällsförening), visitaland.com, vastsverige.com, goteborg.com.
-- Utan tillåten källa (lämnas utan text): rorviksbadet, fiskmyrans-badstrand, langviks-yttre-gasthamn,
-- dalenbadet, tjusviks-hamn, loknasudds-gard-och-marina-ab, holo-klippbad, fjallbacka-bastuforening, andys-thai,
-- caf-obergska, larsson-karlsson, kalvhagens-bryggforening, ekelofs-mat-bar, kajplatsen-fisk-grill,
-- lilla-trouville-stranden, badplats-sabyviken, ornsand, pizzaverket, lilla-haket-ninas-bod (uto.se ej godkänd).
-- Kunde inte kontrolleras nu (webbplatsen svarade 502): lacka-nynashamns-segelsallskap, blekets-bastu.

-- kymendo.se: "Mitt i Kymendösund ligger vi, Strax intill Vaxholmsbryggan.", "Restaurangen ligger alldeles intill vattnet…",
-- "…färska grönsaker & frukter, mejeri, chark", "Här kan du tanka året om 24 timmar om dygnet med hjälp av våran kontokortpelare!",
-- "Vi kör småbåtstaxi i Skärgården Våra båtar tar upp till 12 pasagerare"
update restaurants set description = 'Kymendö Service ligger vid Kymendösund på Kymmendö, intill Vaxholmsbryggan, med restaurang vid vattnet och en butik med bland annat färska grönsaker, mejeri och chark. Här går det att tanka dygnet runt året om med kortautomat, och verksamheten kör småbåtstaxi i skärgården med plats för upp till tolv passagerare.',
  updated_at = now() where slug = 'kymmendo-gasthamn-kok' and description is null;
-- svenskagasthamnar.se/goteborgs-skargard/roro/: "Fiske- och båthamn på Rörös sydsida.", "Diesel automat Bensin automat",
-- "Hamndjup 2,5-4,5 m", "Gästplatser 120"
update restaurants set description = 'I Rörö hamn, fiske- och båthamnen på Rörös sydsida, finns diesel och bensin i automat. Hamnen har 120 gästplatser och ett hamndjup på 2,5–4,5 meter.',
  updated_at = now() where slug = 'roro-sjotapp-bensin-diesel' and description is null;
-- destinationmollosund.se/project/kvarnen-kok-och-bar/: "…restaurang vid Mollösunds hamn.", "Hamnvägen 10",
-- "Ni kan förboka bord men är lika välkomna som drop-in gäster.", "Vill ni hellre ta med en pizza hem eller till båten är detta inga problem."
update restaurants set description = 'Kvarnen Kök och Bar är en restaurang vid hamnen i Mollösund, Hamnvägen 10. Bord kan förbokas men drop-in går också bra, och pizza kan tas med ut till båten.',
  updated_at = now() where slug = 'kvarnen-kok-och-bar-mollosund' and description is null;
-- bastubryggan.nu/om.html: "Bastubryggan är en ideell förening som bildades 1998 av sju entusiaster…", "…kunde bastun invigas den 1 juli 2000."
update restaurants set name = 'Bastubryggan Brännö',
  description = 'Bastubryggan Brännö är en ideell förening på Brännö som bildades 1998. Föreningens bastu invigdes den 1 juli 2000.',
  updated_at = now() where slug = 'branno-bastubad' and description is null;
-- styrsohafsbad.se/om/: "Styrsö Havsbads Vänner är en ideell förening…", "Styrsö, Kallbadsvägen"; styrsohafsbad.se:
-- "…sitta i en ångande varm bastu…titta ut på ett djupblått skimrande hav?", "Kanske ta ett svalkande dopp i det salta vattnet?";
-- /bli-medlem/: "Medlemskap kan sökas av personer som bor och äger fastighet i Göteborgs södra skärgård.", "Icke medlem är välkommen att bada i sällskap med medlem"
update restaurants set name = 'Styrsö Havsbads Vänner', website = 'https://styrsohafsbad.se/', island = 'Styrsö', endast_medlemmar = true,
  description = 'Styrsö Havsbads Vänner är en ideell förening med bastu vid havet på Kallbadsvägen på Styrsö, där man kan ta ett dopp i saltvattnet. Medlemskap kan sökas av den som bor och äger fastighet i Göteborgs södra skärgård, och den som inte är medlem får bada i sällskap med en medlem.',
  updated_at = now() where slug = 'styrso-bratten-bastu' and description is null;
-- explorearchipelago.com (Södersunda): "Semaforen vid bryggan måste hissas för att signalera att du ska åka med båten.", "Södersunda, 130 38 Runmarö, Sweden"
update restaurants set island = 'Runmarö',
  description = 'Södersunda brygga ligger vid Södersunda på Runmarö. Den som ska åka med skärgårdsbåten härifrån hissar semaforen vid bryggan som signal till båten.',
  updated_at = now() where slug = 'sodersunda-brygga' and description is null;
-- visitaland.com (fiskekort): "Stormskärs konferens & Värdshus Västerövägen 176 22550 Vårdö",
-- "Fiske är begränsat till fastighetsägare och stuggäster på Stormskärs Värdshus och konferens", "Gädda uteslutande Catch & Release"
update restaurants set island = 'Vårdö',
  description = 'Stormskärs Konferens & Värdshus ligger på Västerövägen 176 i Vårdö på Åland och har stugor för gäster. Fisket runt Stormskär är begränsat till fastighetsägare och värdshusets stuggäster, och gädda fiskas bara med catch and release.',
  updated_at = now() where slug = 'stormskars-konferens-och-vardshus-aland' and description is null;
-- torpaskog.com/bryggor/nasselviken/: "I Nässelviken erbjuds båtplatser för våra medlemmar.", "Medlem i Torpa Skogs Tomtägarförening",
-- "Nyckel till rampen för iläggning och upptagning kan erhållas…"
update restaurants set name = 'Nässelvikens brygga', website = 'https://torpaskog.com/bryggor/nasselviken/', endast_medlemmar = true,
  description = 'Vid Nässelvikens brygga har Torpa Skogs Tomtägarförening båtplatser för föreningens medlemmar. Här finns också en ramp för sjösättning och upptagning.',
  updated_at = now() where slug = 'nasselvikens-batklubb' and description is null;
-- vastsverige.com (Strömstad): "Fisk- och skaldjursrestaurang med uteservering mot hamnen, men har också butik där du kan köpa färska delikatesser, räkfyllda baguetter…", "Ångbåtskajen 4"
update restaurants set name = 'Laholmens Fisk',
  description = 'Laholmens Fisk på Ångbåtskajen 4 i Strömstad är en fisk- och skaldjursrestaurang med uteservering mot hamnen. Här finns också en butik med färska delikatesser och räkbaguetter.',
  updated_at = now() where slug = 'laholmens-fisk-stromstad-ab' and description is null;
-- uddevalla.se (Mollön): "Här kan man bada både i långgrunt vatten och från det roliga hopptornet.", "…gräs och långgrunt vatten, samt klippor och hopptorn.",
-- "…ramp som har byggts om för att bli mer tillgänglig", "Bra parkeringsmöjligheter finns nära badet", "Sand: NEJ Klippor: JA Brygga: JA Kiosk: NEJ Toalett: JA",
-- "Det är förbjudet för hundar att vistas på kommunens badplatser."
update restaurants set website = 'https://www.uddevalla.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser/mollon.html',
  description = 'Mollön är en av Uddevalla kommuns badplatser, med gräsytor, långgrunt vatten, klippor, brygga och hopptorn. Här finns toalett och en ramp som byggts om för bättre tillgänglighet, men ingen sandstrand eller kiosk, och hundar får inte vistas på badplatsen.',
  updated_at = now() where slug = 'mollon' and description is null;
-- sjobodentoro.se/restaurang-nynashamn/ och /om-oss/: "Vi är en sommar sjökrog som ligger precis vid vattnet i Stockholms södra skärgård kallat Ankarudden.",
-- "Sjöboden Torö med egen brygga", "…A´ la Carte meny med inslag av svensk husmans…", "…i väntan på Landsorts färjan smita in för en snabb öl eller en go fika.";
-- explorearchipelago.com: "Ankarudden 3, 149 92 Nynäshamn, Sweden"
-- Restaurang Sjöboden Torö fanns redan som sjoboden-toro-ankarudden (med webbplats och telefon) men med läge ca 6 km fel.
-- toro-ankarudden är samma verksamhet: dubbletten döljs (308 till sjoboden-toro-ankarudden i middleware) och dess läge,
-- som stämmer med OpenStreetMap (Ankarudden, 58.8016 N 17.8373 E), flyttas över. Den gamla texten hade värdeord.
update restaurants set latitude = 58.8016667, longitude = 17.8369444,
  description = 'Restaurang Sjöboden är en sommarkrog med egen brygga precis vid vattnet på Ankarudden, Torö, i Stockholms södra skärgård. Köket serverar à la carte med inslag av svensk husmanskost, och i väntan på färjan till Landsort går det att ta en öl eller en fika.',
  updated_at = now() where slug = 'sjoboden-toro-ankarudden';
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av sjoboden-toro-ankarudden (Restaurang Sjöboden Torö, Ankarudden 3)'
  where slug = 'toro-ankarudden' and hidden_at is null;
-- ockerohamn.se/om-hamnen: "Sjömack Endast färgad diesel.", "Stranden 14, Öckerö", "Gästhamn, Ställplats, Bastu, Diesel, Bunkerservice…",
-- "Öckerö hamn ägs och förvaltas av Öckerö hamn & fiskareförening"; ockerohamn.se: "Gästhamnen är i sydvästra delen av fiskehamnen med plats för ca 30 båtar"
update restaurants set description = 'Sjömacken i Öckerö hamn, Stranden 14 på Öckerö, säljer endast färgad diesel, och hamnen har också bunkerservice. Hamnen förvaltas av Öckerö hamn & fiskareförening och har en gästhamn för omkring 30 båtar i fiskehamnens sydvästra del.',
  updated_at = now() where slug = 'ockero-hamn-drivmedel' and description is null;
-- grinda.se/aktiviteter/: "Hyr en kajak, Stand Up Paddle boards eller bastu:", "Bastu / Sauna Källviken 1 tim / hour 1-4 pers.", "Grinda Wärdshus AB"
update restaurants set island = 'Grinda',
  description = 'Källvikens bastu på Grinda hyrs ut per timme för en till fyra personer via Grinda Wärdshus, som också hyr ut kajaker och SUP-brädor.',
  updated_at = now() where slug = 'kallvikens-bastu' and description is null;
-- kanten.se: "Med dess läge precis vid vattnet erbjuder Kanten…", "Allt från en enkel kopp bryggkaffe till en … latte",
-- "Vi erbjuder en varierad meny med allt från sallader och hamburgare till … fisk"
update restaurants set description = 'Kanten Café & Bar ligger vid vattnet i Hunnebostrand och serverar allt från kaffe till sallader, hamburgare och fisk.',
  updated_at = now() where slug = 'kanten-caf-bar' and description is null;
-- kostersweden.com/pacos: "Välkommen till Pacos – familjerestaurangen vid Långegärdebryggan på Sydkoster.",
-- "Här väntar en varierad meny … glass …", "Under sommaren bjuder vi dessutom på livemusik, sport på storbild…"
update restaurants set island = 'Sydkoster',
  description = 'Pacos är en familjerestaurang vid Långegärdebryggan på Sydkoster, med varierad meny och glass. Under sommaren blir det också livemusik och sport på storbild.',
  updated_at = now() where slug = 'pacos' and description is null;
-- vastsverige.com (Hamburgsund Fisk & Skaldjur): "Fisk- och skaldjurslunch och egen saluhall med allt man kan önska från havet.",
-- "På restaurang Sunnegabet serveras fisk- och skaldjursrätter", "…ta en paus med en god kopp kaffe på den nybyggda uteserv[eringen]";
-- hamburgsundsfisk.se: "Hamburgsunds Fisk & Skaldjur AB, Udden 1, 45745 Hamburgsund"
update restaurants set name = 'Restaurang Sunnegabet', website = 'https://hamburgsundsfisk.se/',
  description = 'Restaurang Sunnegabet hör till Hamburgsunds Fisk & Skaldjur på Udden 1 i Hamburgsund och serverar lunch med fisk- och skaldjursrätter. I samma verksamhet finns en saluhall med råvaror från havet och en uteservering för kaffe.',
  updated_at = now() where slug = 'sunnegabet' and description is null;
-- vastsverige.com/visitockero/produkter/restaurang-kroken/: "I Hönö Klåva ligger denna … restaurang med egen trädgård!", "Kontaktinformation Klova hamnkrog Hönö Klåva hamn väg 15 475 42 Hönö Telefon: 0729 71 71 10" (samma telefon som posten),
-- "…på vår uteservering som oftast erbjuder lä från havets vindar."
update restaurants set description = 'Klova Hamnkrog i Hönö Klåva, Hönö Klåva hamn väg 15, är en restaurang med egen trädgård och en uteservering i lä från havsvinden.',
  updated_at = now() where slug = 'klova-hamnkrog' and description is null;

-- explorearchipelago.com/sthlm/northern-archipelago/norrora: "There are no shops, accommodation, or restaurants here."
-- Posten (import 2026-04-17) saknade webbplats och telefon. Dold och omdirigerad till /o/norrora i middleware.
update restaurants set hidden_at = now(), hidden_reason = 'Ingen krog på Norröra enligt Explore Archipelago ("There are no shops, accommodation, or restaurants here."); posten saknade webbplats och telefon'
  where slug = 'norrora-krog' and hidden_at is null;
