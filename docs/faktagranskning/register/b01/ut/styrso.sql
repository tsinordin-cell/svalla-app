-- Faktagranskning batch 01 – Styrsö (Granskare/Skribent, 2026-11-02).
-- Körs av huvudsessionen. Bara UPDATE. Satsen skriver över exakt det granskade värdet (gamla värdet i WHERE).
-- Databasen kontrollerad 2026-11-03 (bara SELECT): FÖRE-värdena i WHERE stämmer i dag för karran och vrango-gasthamn (description).
-- Den gamla Kärran-texten kommer från supabase/datafix/2026-09-23-texter-omgang3.sql:85 (description sattes bara om den var tom).
-- Träffar en sats ändå 0 rader har värdet ändrats efter 2026-11-03: kör  select slug, description from restaurants where slug in ('karran', 'vrango-gasthamn');
-- och kontrollera att satsen träffar en rad (UPDATE ... RETURNING slug).

-- restaurants.karran.description (styrso-0335; DELVIS: Kärran är en foodtruck, inte en restaurang; första meningen enligt SEO-regeln)
-- FÖRE: 'Kärran är en restaurang på Brännö i Göteborgs södra skärgård.'
-- KÄLLA: https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard — "Det är en rosa foodtruck som serverar asiatiska rätter med en svensk touch, hemmagjorda bakverk, juicer och iskaffe. Foodtrucken hittas på Varpevägen 3 på Brännö, med utsikt över Gärdet och hamninloppet, öppet april-september." (läst 2026-10-31)
-- KÄLLA: https://www.goteborg.com/platser/branno — "Brännö är en levande skärgårdsö i södra delen av Göteborgs skärgård" (läst 2026-10-31)
update restaurants set description = 'Kärran är en rosa foodtruck på Varpevägen 3 på Brännö i Göteborgs södra skärgård. Den serverar asiatiska rätter med en svensk touch, hemmagjorda bakverk, juicer och iskaffe och har öppet april–september.', updated_at = now() where slug = 'karran' and description = 'Kärran är en restaurang på Brännö i Göteborgs södra skärgård.';

-- restaurants.vrango-gasthamn.description (styrso-0493 STRYK+KOMPENSERA; nya uppgifter styrso-N003–N006; första meningen enligt SEO-regeln)
-- FÖRE: 'Vrångö gästhamn har plats för cirka 130 gästande båtar och en dagbrygga för kortare besök, och hamnen ligger väl skyddad för vind och vågor. Hamndjupet är 3,5–5 meter. I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och sugtömning, och i hamnen finns mataffär och matställen.'
-- Struket: "Hamndjupet är 3,5–5 meter." Djup får bara beläggas av myndigheten (nivå 1); enda källan är svenskagasthamnar.se (nivå 3, "Hamndjup 3,5-5 m").
-- Inte med: källans "Ankringsförbud" – en föreskrift, som bara myndigheten kan belägga.
-- KÄLLA: https://www.svenskagasthamnar.se/goteborgs-skargard/vrango/ — "Vrångö hamn är en mycket populär och välbesökt gästhamn som har plats för c a 130 gästande båtar.", "Det finns även en nyutlagd dagbrygga för kortare besök. Hamnen ligger väl skyddad för vind och vågor.", "I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och septictank sugtömning.", "Det finns mataffär och matställen i hamnen.", "för mot brygga, fast akterfäste el. boj." (läst 2026-11-03). Aggregator (nivå 3); ingen nivå 1–2-källa hittad för hamnen.
-- KÄLLA: https://www.goteborg.com/platser/vrango — "Skärgårdsbåten lägger till i Mittvik", "Tvärs över ön, en knapp kilometer från båtens tilläggsplats, finns en stor modern gästhamn med fiskekaj" (läst 2026-11-03)
-- KÄLLA: https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Vr%C3%A5ng%C3%B6 — "Vrångö", "Göteborg | Tätort" (läst 2026-11-03)
update restaurants set description = 'Vrångö gästhamn är gästhamnen på Vrångö i Göteborgs kommun, med plats för cirka 130 gästande båtar och en dagbrygga för kortare besök. Hamnen ligger väl skyddad för vind och vågor, och båtarna förtöjs med fören mot bryggan och fast akterfäste eller boj. I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och sugtömning, och i hamnen finns fiskekaj, mataffär och matställen. Skärgårdsbåten lägger till i Mittvik, en knapp kilometer bort på andra sidan ön.', updated_at = now()
 where slug = 'vrango-gasthamn' and description = 'Vrångö gästhamn har plats för cirka 130 gästande båtar och en dagbrygga för kortare besök, och hamnen ligger väl skyddad för vind och vågor. Hamndjupet är 3,5–5 meter. I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och sugtömning, och i hamnen finns mataffär och matställen.';

-- ===== Omarbete runda 4 (2026-11-09, Granskaren och Skribenten) =====
-- Databasen gick inte att läsa i dag: SELECT nekades i arbetsytan 2026-11-09. FÖRE-värdena nedan kommer ur registret (Utvinnarens
-- avläsning), datafix-filerna (texter) och platsexporten 2026-10-29 (koordinater). WHERE skriver bara över ett oförändrat värde.
-- Kör SELECT före: select slug, name, description, website, latitude, longitude from restaurants where slug in
-- ('donso-hamnkrog', 'donso-fiskrokeri', 'branno-vardshus'); och kontrollera att varje sats träffar en rad (UPDATE ... RETURNING slug).

-- donso-hamnkrog → Isbolaget Hotell & Restaurang (Toms beslut 7, 2026-11-08; styrso.tom.md punkt 2). Slugen står kvar.
-- styrso-0306 (namn), 0307 (typen restaurant står kvar), 0308 (ö-fältet Donsö står kvar), 0310 (nål), 0311 (webbplats),
-- 0312–0314, N027 och N028 (text). Första meningen enligt SEO-regeln: namn, vad det är, plats och region.
-- KÄLLA: https://www.isbolaget.com/omoss — "ISBOLAGET"; "HOTELL & RESTAURANG I GÖTEBORGS SKÄRGÅRD"; "Längst ut på piren i Donsö hamn, mitt i Göteborgs skärgård, ligger Isbolaget"; "I dag är ishuset varsamt omvandlat till hotell och restaurang" (läst 2026-11-09)
-- KÄLLA: https://www.isbolaget.com/ — "DONSÖ HAMNVÄG 45"; "430 82 DONSÖ"; "HUNDAR ÄR VARMT VÄLKOMNA TILL OSS PÅ ISBOLAGET" (läst 2026-11-09)
-- KÄLLA: https://www.isbolaget.com/eat — "LUNCH"; "A LA CARTE"; "PIZZA & KEBAB HELG" (läst 2026-11-09)
-- KÄLLA: https://www.vastsverige.com/visitockero/oppetnu-restaurangguidegoteborgsskargard/ — "Isbolaget Hotell & Restaurang – Donsö hamn - Öppet"; "Här serveras bland annat fisk och skaldjur, dagens lunch, pizza och à la carte."; "Senast uppdaterad: 27 oktober 2026" (läst 2026-11-09) Västsverige är ett regionalt destinationsbolag (nivå 3), använt bara för fisk och skaldjur.
-- KÄLLA: https://www.goteborg.com/platser/isbolaget-donso — "på en av de södra öarna i Göteborgs skärgård"; "http://www.isbolaget.com" (läst 2026-11-09)
-- KÄLLA: https://www.donsohamn.se/ — "Restaurang Isbolaget"; "Hotell Isbolaget" (läst 2026-11-09)
-- Inte med: "i det gamla ishuset" och att fiskebåtarna fick is där. Det är byggnadens historia före verksamheten och kräver nivå 1
-- (förtydligande 8 och 19); varken Göteborgs Stads bevarandeprogram eller andra nivå 1-källor nämner huset.
-- FÖRE: name 'Donsö Hamnkrog', description 'Donsö Hamnkrog är en restaurang på Donsö i Göteborgs södra skärgård.', website 'http://www.donsohamn.se/', latitude 57.5985718, longitude 11.792968
update restaurants set name = 'Isbolaget Hotell & Restaurang', updated_at = now() where slug = 'donso-hamnkrog' and name = 'Donsö Hamnkrog';
update restaurants set description = 'Isbolaget Hotell & Restaurang är ett hotell och en restaurang längst ut på piren i Donsö hamn, på Donsö i Göteborgs södra skärgård. Här serveras bland annat fisk och skaldjur, dagens lunch, pizza och à la carte. Hundar är välkomna.', updated_at = now() where slug = 'donso-hamnkrog' and description = 'Donsö Hamnkrog är en restaurang på Donsö i Göteborgs södra skärgård.';
update restaurants set website = 'https://www.isbolaget.com/', updated_at = now() where slug = 'donso-hamnkrog' and website = 'http://www.donsohamn.se/';
-- KÄLLA: https://api.openstreetmap.org/api/0.6/node/832457440 — "Isbolaget"; "Donsö Hamnväg"; "restaurant" (läst 2026-11-09) ; uppmätt (haversine): nodens läge 57.5980216, 11.7910826 ligger på Donsö, 17 m innanför strandlinjen (relation 11048170), och 128 m från den gamla nålen, som var Donsö gästhamns punkt (68 m från OpenStreetMaps Donsö gästhamn, node 605530611). Noden har adressen Donsö Hamnväg 45, samma som Isbolagets sida.
update restaurants set latitude = 57.5980216, longitude = 11.7910826, updated_at = now() where slug = 'donso-hamnkrog' and round(latitude::numeric, 7) = 57.5985718 and round(longitude::numeric, 7) = 11.792968;

-- donso-fiskrokeri.latitude/.longitude — styrso-0300 (FEL, MÄTT: nålen låg på Donsö gästhamns punkt, 210 m från Fiskeboa).
-- FÖRE: 57.5983, 11.7919 (5 m från OpenStreetMaps Donsö gästhamn, node 605530611, och 40 m utanför Donsös strandlinje).
-- KÄLLA: https://www.fiskeboadonso-vrango.se/donso/ — "Fiskeboa Donsö"; "Vi finns i Donsö hamn, bredvid ICA Yngves Livs." (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/node/8276155839 — "Fiskeboa Donsö"; "seafood" (läst 2026-11-09) ; uppmätt (haversine): nodens läge 57.5991484, 11.7950433 ligger på Donsö, 58 m innanför strandlinjen (relation 11048170), 42 m från ICA Nära Yngves Livs närmaste vägg (way 104964519) och 210 m från den gamla nålen.
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/104964519/full — "ICA Nära Yngves Livs"; "Donsö Backe" (läst 2026-11-09)
update restaurants set latitude = 57.5991484, longitude = 11.7950433, updated_at = now() where slug = 'donso-fiskrokeri' and round(latitude::numeric, 7) = 57.5983 and round(longitude::numeric, 7) = 11.7919;

-- branno-vardshus.description — styrso-0325 (FEL: "den gamla lotsbostaden" är byggnadens historia och saknar nivå 1-källa; STRYK+KOMPENSERA med N029),
-- styrso-0329 (FEL, MÄTT: värdshuset anger att bageriet är tillfälligt stängt; omprövas i slutomkontrollen) och 0326–0328 (lästa i dag).
-- KÄLLA: https://brannovardshus.se/mat-fest/bageri/ — "Bageriet är tyvärr tillfälligt stängt men väntas öppna igen inom kort!"; "DAGENS LUNCH"; "SKÄRGÅRDSLUNCH PÅ LÖRDAGAR"; "SÖNDAGSMIDDAG" (läst 2026-11-09)
-- KÄLLA: https://brannovardshus.se/ — "KAFÉ & BAGERI" (läst 2026-11-09)
-- KÄLLA: https://www.vastsverige.com/foretagprodukter/goteborg/branno-vardshus/ — "Restaurangens meny speglas av närheten till havet, med fisk och skaldjur som självklara inslag."; "I de mysiga små rummen"; "eller i glashus-paviljongen kan du njuta av god mat med inspiration från havet."; "På värdshuset kan du övernatta i något av gästrummen eller på pensionat Baggen." (läst 2026-11-09)
-- Göteborgs Stads kulturmiljöunderlag för Brännö (2021) nämner lotsgårdar vid Husvik men pekar inte ut värdshusets hus, och
-- värdshusets egen uppgift om lotsbostaden räcker inte för byggnadens historia (förtydligande 8 och 19).
-- FÖRE: 'Brännö Värdshus är en restaurang på Brännö vars meny präglas av närheten till havet, med fisk och skaldjur. Maten serveras i den gamla lotsbostaden eller i en glashuspaviljong, och till värdshuset hör ett café och ett eget bageri som har öppet under sommaren. Övernattning finns i gästrum och på pensionat Baggen.'
update restaurants set description = 'Brännö Värdshus är en restaurang på Brännö vars meny präglas av närheten till havet, med fisk och skaldjur. Maten serveras i värdshusets små rum eller i en glashuspaviljong, och restaurangen har bland annat dagens lunch, skärgårdslunch på lördagar och söndagsmiddag. Till värdshuset hör ett café och ett eget bageri, men i november 2026 var bageriet enligt värdshuset tillfälligt stängt och väntades öppna igen inom kort. Övernattning finns i gästrum och på pensionat Baggen.', updated_at = now() where slug = 'branno-vardshus' and description = 'Brännö Värdshus är en restaurang på Brännö vars meny präglas av närheten till havet, med fisk och skaldjur. Maten serveras i den gamla lotsbostaden eller i en glashuspaviljong, och till värdshuset hör ett café och ett eget bageri som har öppet under sommaren. Övernattning finns i gästrum och på pensionat Baggen.';

-- branno-husvik-gasthamn.latitude/.longitude — styrso-0410 (SAKNAS, MÄTT): ingen UPDATE. Hamnens egen uppgift (Brännö Båtägare
-- Förening) säger bara att gästbryggan ligger i Husvik, och OpenStreetMap har ingen gästbrygga där, bara färjeläget och pirer utan namn.
-- KÄLLA: https://www.brannobatagare.se/hamnar/husvik/ — "Det finns en gästbrygga i Husvik"; "Husvik har en ramp och en truck för lyft upp till 3000 kg." (läst 2026-11-09)
