-- 2026-09-23: Granskning av poster utan källa och av importen 2026-04-21 (västkusten).
-- Alla citat nedan är kontrollerade 2026-09-23 genom textsökning i den renderade sidan.
-- Reversibelt: dolda poster får hidden_at + hidden_reason. Inget raderas.
-- Ingen av de dolda posterna har bokmärken eller recensioner (mätt 2026-09-23).

-- ═══ 1. DUBBLETTER: slå ihop till posten med verifierad webbplats/telefon ═══

-- Marstrands Wärdshus. KÄLLA marstrandswardshus.se: "Marstrands Wärdshus", "0303-60369".
-- marstrands-vardshus (import 2026-05-07) hade delad platshållarkoordinat 57.8867,11.5853
-- med gästhamnen och drivmedelsposten; dess beskrivning (verifierad i block 6) flyttas över.
update restaurants set name = 'Marstrands Wärdshus', archipelago_region = 'bohuslan',
  description = (select description from restaurants where slug = 'marstrands-vardshus'),
  updated_at = now() where slug = 'marstrand-vardshus';
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av marstrand-vardshus (platshållarkoordinat)'
  where slug = 'marstrands-vardshus' and hidden_at is null;

-- Marstrands gästhamn. KÄLLA marstrandsgasthamn.se/sv/Kontakt: "Telefon: +46(0)703469901".
update restaurants set name = 'Marstrands gästhamn', type = 'harbor', archipelago_region = 'bohuslan',
  description = (select description from restaurants where slug = 'marstrand-gasthamn'),
  updated_at = now() where slug = 'marstrands-gasthamn';
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av marstrands-gasthamn (platshållarkoordinat)'
  where slug = 'marstrand-gasthamn' and hidden_at is null;

-- Hönö Klåva gästhamn. KÄLLA svenskagasthamnar.se/goteborgs-skargard/hono-klava/:
-- "Läge 5741 N 1139 E" och "Tel.031-96 58 85" (= telefonen på hono-gasthamn).
-- Båda posternas koordinater låg fel (57.7050 resp. 57.6722); läget sätts till källans
-- minutangivelse 57°41'N 11°39'E (precision ca ±1 km).
-- Namnet är unikt i tabellen: beskrivningen kopieras först, sedan döljs och döps
-- dubbletten om, och först därefter får den behållna posten namnet.
update restaurants set type = 'harbor', archipelago_region = 'goteborg',
  latitude = 57.68333, longitude = 11.65000,
  description = (select description from restaurants where slug = 'hono-klava-gasthamn'),
  updated_at = now() where slug = 'hono-gasthamn';
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av hono-gasthamn (platshållarkoordinat)',
  name = 'Hönö Klåva gästhamn (dubblett)'
  where slug = 'hono-klava-gasthamn' and hidden_at is null;
update restaurants set name = 'Hönö Klåva gästhamn', updated_at = now() where slug = 'hono-gasthamn';

-- Hamburgsunds gästhamn. KÄLLA svenskagasthamnar.se/norra-vastkusten/hamburgsund/:
-- "Läge 5833 N 1116 E", "Gästhamnsbolaget Väst AB", "mob.0707-40 36 66".
-- hamburgsunds-gasthamn ligger inom källans precision; hamburgsund-gasthamn låg ca 3 km söderut.
update restaurants set name = 'Hamburgsunds gästhamn', type = 'harbor', archipelago_region = 'bohuslan',
  website = 'https://www.svenskagasthamnar.se/norra-vastkusten/hamburgsund/', phone = '0707-40 36 66',
  description = (select description from restaurants where slug = 'hamburgsund-gasthamn'),
  updated_at = now() where slug = 'hamburgsunds-gasthamn';
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av hamburgsunds-gasthamn (läge ca 3 km fel)'
  where slug = 'hamburgsund-gasthamn' and hidden_at is null;

-- Åstols Rökeri. KÄLLA astolsrokeri.se: "Åstols Rökeri", "0304-677 740".
-- astol-hamnkrog ("Åstol Hamnkrog") pekade på Åstols Rökeris webbplats och telefon.
update restaurants set website = 'https://www.astolsrokeri.se/', phone = '0304-677 740',
  updated_at = now() where slug = 'astols-rokeri-bohuslan';
update restaurants set hidden_at = now(), hidden_reason = 'Påhittat namn ("Åstol Hamnkrog"); dubblett av astols-rokeri-bohuslan'
  where slug = 'astol-hamnkrog' and hidden_at is null;

-- Övriga dubbletter (webbplats/telefon tillhör en redan befintlig post).
update restaurants set hidden_at = now(), hidden_reason = 'Påhittat namn ("Fjällbacka Värdshus"); webbplats/telefon tillhör Stora Hotellet (stora-hotellet-fjallbacka)'
  where slug = 'fjallbacka-vardshus' and hidden_at is null;
update restaurants set hidden_at = now(), hidden_reason = 'Telefonen går till hamnvärden för Vrångö gästhamn (svenskagasthamnar.se); dubblett av vrango-gasthamn'
  where slug = 'vrango-naturhamn' and hidden_at is null;
update restaurants set hidden_at = now(), hidden_reason = 'Påhittat namn ("Smögen Brygghus"); bryggeriet Smögen Ale/SmögenBryggarn, serveringen finns som smogenbryggar-ns-olhall'
  where slug = 'smogen-brygghus' and hidden_at is null;
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av namndo-krog (Solvik har en restaurang)'
  where slug = 'namndö-restaurang' and hidden_at is null;
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av bakfickan-uto'
  where slug = 'uto-bakficka' and hidden_at is null;
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av seglarhotellet-sandhamn'
  where slug = 'seglarrestaurangen-sandhamn' and hidden_at is null;
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av motorverkstan-bistro-bar (samma koordinat)'
  where slug = 'motorverkstan-djuro' and hidden_at is null;
update restaurants set hidden_at = now(), hidden_reason = 'Namnet finns inte; sjömacken är Klintsundet Marina (ca 8 km bort), redan med som circle-k-klintsundet'
  where slug = 'klintan-sjöstation' and hidden_at is null;

-- ═══ 2. FEL NAMN PÅ VERKLIG VERKSAMHET: rätta namnet, ersätt beskrivningen ═══

-- KÄLLA vastsverige.com/orust/produkter/gullholmens-hamnkrog/: "Gullholmens Hamnkrog",
-- "Välkommen till Hamnkrogen på Gullholmen. Här njuter du av god mat och dryck i hamnen på den vackra ön Gullholmen."
update restaurants set name = 'Gullholmens Hamnkrog', archipelago_region = 'bohuslan',
  description = 'Gullholmens Hamnkrog ligger i hamnen på Gullholmen på Orust och serverar mat och dryck.',
  updated_at = now() where slug = 'gullholmens-krog';

-- KÄLLA gostasfiskekrog.se: "Göstas Fiskekrog", "0523 – 72077"; vastsverige.com (en):
-- "Göstas Fiskekrog is located next to the fish shop, Göstas Fiskbutik, down at the harbour at Smögen."
update restaurants set name = 'Göstas Fiskekrog', archipelago_region = 'bohuslan',
  description = 'Göstas Fiskekrog ligger nere i hamnen på Smögen, intill fiskbutiken Göstas Fiskbutik.',
  updated_at = now() where slug = 'smogens-hamnkrog';

-- KÄLLA vastsverige.com/en/skafto---eng/food--beverage/eat-on-skafto/:
-- "Smultron & Tång, GrundsundVästra Kajen, 451 79 Grundsund. Tel +46 (0)523-217 20"
update restaurants set name = 'Smultron & Tång', archipelago_region = 'bohuslan',
  description = 'Smultron & Tång är en restaurang vid Västra Kajen i Grundsund på Skaftö.',
  updated_at = now() where slug = 'grundsunds-krog';

-- KÄLLA vastsverige.com/visitockero/oppetnu-restaurangguidegoteborgsskargard/:
-- "Fiskeboa Donsö – Donsö hamn", "Fiskaffär och lunchställe med färsk fisk, skaldjur, varmrökt lax och andra delikatesser.", "Telefon: 076-008 51 53"
update restaurants set name = 'Fiskeboa Donsö', archipelago_region = 'goteborg',
  description = 'Fiskeboa Donsö i Donsö hamn är en fiskaffär och ett lunchställe med färsk fisk, skaldjur, varmrökt lax och andra delikatesser.',
  updated_at = now() where slug = 'donso-fiskrokeri';

-- KÄLLA petersonskrog.se: "Petersons Krog på Käringön", "0304-56019".
update restaurants set name = 'Petersons Krog', archipelago_region = 'bohuslan',
  description = 'Petersons Krog är en krog på Käringön.',
  updated_at = now() where slug = 'karingon-krog';

-- KÄLLA wards.se: "Mollösunds Wärdshus", "Kyrkvägen 9, 474 70 Mollösund, Sverige", "0304-211 08".
update restaurants set name = 'Mollösunds Wärdshus', archipelago_region = 'bohuslan',
  description = 'Mollösunds Wärdshus ligger på Kyrkvägen 9 i Mollösund.',
  updated_at = now() where slug = 'mollosunds-vardshus';

-- KÄLLA namdosolvik.com/ata: "Nämdö Krogen", "Krogen är hjärtat i Nämdö";
-- skargardsstiftelsen.se/omraden/namdo/: "I Solvik finns livsmedelsbutik, café och service. Här finns också
-- boendealternativ, bland annat glamping och restaurangverksamhet under sommarsäsongen."
update restaurants set name = 'Nämdö Krogen', island = 'Nämdö', website = 'https://www.namdosolvik.com/ata',
  description = 'Nämdö Krogen är restaurangen i Solvik på Nämdö. I Solvik finns också livsmedelsbutik, café och service, och restaurangverksamheten är igång under sommarsäsongen.',
  updated_at = now() where slug = 'namndo-krog';

-- Region för verifierade poster som hade koden west_coast (Upptäck och regionsidorna känner inte den koden).
update restaurants set archipelago_region = 'goteborg', updated_at = now() where slug = 'bjorko-gasthamn';
update restaurants set archipelago_region = 'bohuslan', updated_at = now() where slug = 'lysekil-gasthamn';
-- KÄLLA svenskagasthamnar.se/norra-vastkusten/fjallbacka/: "0707-40 36 85" (= telefonen på posten).
update restaurants set archipelago_region = 'bohuslan',
  website = 'https://www.svenskagasthamnar.se/norra-vastkusten/fjallbacka/', updated_at = now()
  where slug = 'fjallbacka-gasthamn';

-- ═══ 3. FEL LÄGE ELLER INTE DET POSTEN PÅSTÅR ═══
update restaurants set hidden_at = now(), hidden_reason = 'Väderöarnas Värdshus ligger på Väderöarna ("35 min från Hamburgsund med båt", vaderoarna.com), inte i Hamburgsund'
  where slug = 'hamburgsunds-vardshus' and hidden_at is null;
update restaurants set hidden_at = now(), hidden_reason = 'Flatö Bryggeri AB är ett bryggeri, ingen krog (flatobryggeri.se)'
  where slug = 'flatons-krog' and hidden_at is null;
update restaurants set hidden_at = now(), hidden_reason = 'Heter Käringöns Brygga (Hotell Käringön, Skeppersholme 127); koordinaten låg ca 15 km fel'
  where slug = 'karingon-pensionat' and hidden_at is null;
update restaurants set hidden_at = now(), hidden_reason = 'Saltholmens Kallbadhus; koordinaten låg ca 4 km från Saltholmen och rätt läge saknar källa'
  where slug = 'saltholmens-bastusallskap' and hidden_at is null;
update restaurants set hidden_at = now(), hidden_reason = 'Brännö brygga är en dansbrygga (goteborg.com), ingen restaurang'
  where slug = 'branno-brygga' and hidden_at is null;

-- ═══ 4. HITTAS INTE I NÅGON TILLÅTEN KÄLLA (och posten saknar egen källa) ═══
update restaurants set hidden_at = now(), hidden_reason = 'Hittas inte i någon tillåten källa (granskning 2026-09-23); posten saknade webbplats, telefon och Google-id'
  where hidden_at is null and website is null and phone is null and google_place_id is null and slug in (
    'arholma-brygga','ingmarso-cafe','ljustero-hamnkrog','skatudden-cafe-hamn','sodermoja-krog',
    'grinda-strandcafe','buskudden','hono-sjokrog','hono-bastuforening','ockero-vardshus','bjorko-sjokrog',
    'lyckans-restaurang-mollosund','stromstads-stadshotell','smogens-kallbadhus','skomakarviken',
    'pensionat-styrso-skaret'
  );
update restaurants set hidden_at = now(), hidden_reason = 'Hittas inte i någon tillåten källa (granskning 2026-09-23); "Styrsö Skäret" är färjelägets namn'
  where slug = 'styrso-skaret' and hidden_at is null;
