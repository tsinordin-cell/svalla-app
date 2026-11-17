# Omarbete 4f, del A (Fjäderholmarna, Grinda, Vaxholm, Storholmen, Husarö)

Granskare/Skribent 2026-11-16 (källorna lästa 2026-11-16; avbrott vid femtimmarsgränsen, slutfört 2026-11-17 utan nya läsningar). Bas: main-kopian 1f02b76. Källtexterna sparade i scratchpad b01/omk4f-a/kallor/, skripten i omk4f-a/skript/.

## Punkterna (beslutsfil:kid — vad — källa)
- slut-06:k011 (FÖRST) — Fjäderholmarna: förbudet gäller igen Libertas OCH Rövarns holme ("förbjudet att gå i land eller uppehålla sig 1 april–15 juli"). Länsstyrelsens beslut 1982-03-08 (geodata…/dokument/1045298, läst som bild, avskrift sparad), Naturvårdsregistret föreskriftsområden + wkt; MÄTT: gränsen omsluter 80/80 noder i Libertas och 38/41 i Rövarns holme (övriga ≤0,5 m utanför). Lidingö stad (Naturkartan) skriver båda öarna.
- slut-03:k029, slut-06:k031 — 1381 och namnet efter nivå 1 med förbehåll: Lidingö stads kulturmiljöprogram ("omnämns i skrift redan 1381", "antagligen … holmarna på fjärden", Bo Jonsson Grip) och Fornsök ("förmodligen … Fjärdholmarna", "1661 skrevs det Fierholmarne"). Förvaltarens KÄLLA-rad struken.
- slut-03:k056, slut-06:k022 — 1985 för öppnandet struket i description och i insiderTips. Nivå 1: Stockholmskällan post 10177 (1982, renoveringar, öppna Stora Fjäderholmen med restauranger, museum, gästhamn); Lidingö stad (Försvarsmakten disponerade vissa utrymmen till 1985). Tipset kompenseras med informationsskyltarna (Lidingö stad).
- slut-03:k060 — markföroreningarna struket (bara förvaltaren; ingen myndighetskälla gick att läsa). Kompensation, Lidingö stad: rivningen under försvarsepoken, Grå stugan/Röda stugan, truckgatorna. Förvaltarens uppmaning "respektera ytor som är avstängda" står kvar, tillskriven (se Kvar nedan).
- slut-03:k038 — bestReason: förvaltarens "säsongsöppet till och med 13 september", bryggeriet 1 maj; Waxholmsbolagets linje 2 lägger till vid Fjäderholmarna till 12 december 2026 (h2.pdf, X utan not u).
- slut-05:k044 — "Sommarsäsongen är kort" → "Kungl. Djurgårdens förvaltning anger säsongen till maj–mitten av september" (historiesidan).
- slut-06:k001 — Rökeriets tips: "ta en skärgårdsfika under besöket på ön" som källan skriver. Samma fel ("ut på klipporna") rättat i description, rad 0100.
- slut-06:k006, k012 — "kajplatsområde 13" i description och getting_there.from; förköpskravet gäller nu bara julbordsbåten, sommarbåten "bokad avgång ger förtur" (Strömmas två sidor).
- slut-01:k070 — Grinda: "Grinda Wärdshus Hotell" → "Hotell på Grinda" (grinda.se sidtitel; STF-raden läst igen).
- slut-04:k074 — Grinda: destStopName "Grinda Södra brygga" (MÄTT: Trafiklab ger "Grinda Södra bryggan (Värmdö kn)" för 740098471, linje 13 i november); noten skriver operatörens ord: via Vaxholm, året om, flest turer på sommaren; tabell 11 har Södra och Norra Grinda.
- slut-07:k031 — Grinda: "I oktober ordnar wärdshuset höstevent" → dåtid efter evenemangssidan (2026: påsk till Halloween, Vilt & Jakt och Oktoberfest i oktober).
- slut-01:k078 — Vaxholm: KÄLLA-rader för related: h11 (11A, Grinda), h13 (Finnhamn), h12 (12A: Staveström, Stensvik, Hummelmora på Ljusterö; GÄLLER-raden läst i bild).
- slut-04:utanför-k067 — Vaxholm: SFV-citatet syns inte i Chromium (bara i sidans dolda kod). Ersatt på tre ställen i koden och i vaxholm.sql med länsmuseet ("på Vaxholmen utanför Vaxholms samhälle", "strax utanför Vaxholms stad. Besökare tar sig dit med en linfärja"); description säger nu det i stället för "ett stenkast".
- slut-05:k062 — Vaxholm: peak "22 juni–23 augusti 2026 (kastellmuseet öppet varje dag)" (vaxholmsfastning.se besöksinfo); augusti i månadsraden Öppet, inte Högsäsong.
- slut-03:k077 — vaxholm.sql: type hotel → camping för vaxholm-waxholms-camping (waxholmscamping.com), med samma förbehåll som Utö camping (körs när koden stöder typen).
- slut-05:utanför-1 — vaxholm.sql: core_experience för magasinet-gustavsberg → "Bistro, inredningsbutik, festlokal och yogastudio under samma tak på Fiskaregatan 1 i Vaxholm." (magasinetwaxholm.se). Ny registerrad vaxholm-N027.
- slut-01:k103 — Husarö: OBS-raden om Lilla Husarn citerar nu Länsstyrelsens reservatssida (inte en KÄLLA-rad; kommer inte i källistan, kontrollerat i kallor.generated.ts).
- slut-01:k110 — Husarö: juni → limited (Begränsad service); ingen källa räknar juni till sommarperioden, vår-/hösttabellen gäller till 18 juni.
- slut-03:k034, slut-07:k018 — Husarö: bestReason "gå de många grusvägarna och stigarna på ön" (Husarö Handel).
- slut-07:k026 — Husarö: KÄLLA husarohandel.se/husar-handel---om-oss ("Vid Husarö ångbåtsbrygga … gästhamn").
- Storholmen: inga punkter i listan; filerna orörda.

## Det som inte gick, och iakttagelser
- slut-07:k018 "Hela året" (Husarö): prövat mot operatören. Tabell 10, 12, 13 och alla linjer i Waxholmsbolagets tabelltjänst gäller till 2026-12-12; ingen vintertabell är publicerad, och Waxholmsbolaget har ingen resmålssida för Husarö (404). Året runt kan inte prövas efter 12 december. Värdet och januari–mars står kvar (länsmuseet), med kommentar i koden; att ändra open skulle också sätta mallens validThrough 2026-10-31 i JSON-LD. Prövas igen när vintertabellen kommer.
- slut-03:k060: hälsorisken från markföroreningarna står nu inte på sidan. Behåller Redaktören den, behövs en myndighetskälla (Försvarsmakten eller Lidingö stads miljöförvaltning). Uppmaningen om avstängda ytor står kvar tillskriven; stryk den om den räknas som säkerhetsuppgift.
- Husarö Handels två sidor säger "lång pontonbrygga" respektive "betongbrygga"; texten följer startsidan. Startsidan säger också att gästhamnen är obemannad "för tillfället" och macken stängd.
- Samma fel utanför öarnas filer (för Vakten): "kajplats 13" i src/app/dagsturer/page.tsx och blogginlägget; 1985 för öppnandet i guide-content.ts:2185; taggen "gustavsberg" på magasinet-gustavsberg (databasen).
- Fjäderholmarnas description säger fortfarande "Säsongen 2026 pågick till och med 13 september och är nu slut" om verksamheterna; det stämmer med förvaltaren men nämner inte linje 2 (som stycket om operatörerna gör).
- Inga Facebook- eller Instagramsidor behövdes. Inga P0 nya; k011 var den som hade blivit P0.

## Torrkörning (mot main-kopian 1f02b76)
- applicera.mjs --torr: fjaderholmarna 45, grinda 22, vaxholm 41, storholmen 14, husaro 17 ersättningar ok, 0 fel.
- Egen kopia (omk4f-a/torr): generera-kallor ok (101 av 101 öar, 1574 källor); vitest src/lib 67 filer, 730 test, alla gröna; tsc 4 fel, samma 4 som före rundan (difficultyFor i island-data.ts och platsRadieKm i islandCoords.ts – kräver mallarnas typer, inte infört här).
- Citat: 114 citat i 42 KÄLLA-rader läst 2026-11-16 står ordagrant i de sparade källtexterna (kolla_citat.py, normalisering som kallcache.py). Beslutet 1982 är inskannat; citatet kontrolleras mot avskriften.
- Ord per ö (strängar i island-data.ts): Fjäderholmarna 1661 → 1798, Grinda 1990 → 2013, Vaxholm 2250 → 2259, Husarö 673 → 673.
- Register: kontrollera_register.py utan formfel; nya rader fjaderholmarna-N021–N025 och vaxholm-N027. Databasen är inte läst eller ändrad; FÖRE-värdena i vaxholm.sql prövas med SELECT av Redaktören.
