# Omarbete av öarna efter Kontrollanten – batch 01 (2026-11-02–03)

En rad per kontrollrad (kid) eller registerrad som ändrats. «edits nr» räknas från 0 i öns edits.json. Läsdatum: källor lästa före avbrottet 2026-11-02, efter 2026-11-03.
Registren i docs/faktagranskning/register/b01/ är uppdaterade (kolumnen kontrollant tom). Databasen är pausad, så WHERE-villkoren i .sql är inte kontrollerade mot den.

## Storholmen
Filer: ut/storholmen.edits.json (torrkörning 13 ersättningar ok, 0 fel), ut/storholmen.sql, ut/storholmen.tom.md, register/b01/storholmen.tsv.

- storholmen-k113 / storholmen-0177: Dom FEL (SL är bolaget AB Storstockholms Lokaltrafik, nivå 2, inte myndighet). Åtgärd RÄTTA i generatorn (sidmallarnas omarbete); ingen ändring i edits.json. Källa sl.se/om-sl/det-har-ar-sl, läst 2026-11-02.
- storholmen-k043 / storholmen-0178: Dom KORREKT, åtgärd PRECISERA (klockslag i källistan). KÄLLA-raderna i edits nr 0, 3, 5, 7 saknar klockslag; källistan visar rubrik, giltighet och uppmätta restider. h80.pdf läst igen 2026-11-02.
- storholmen-k076 / storholmen-0179: Som 0178.
- storholmen-k014 / storholmen-0180: Som 0178.
- storholmen-k042 / storholmen-0181: Som 0178.
- storholmen-k002 / storholmen-0185: Dom INAKTUELL, åtgärd RÄTTA: källistans läsdatum blir 2026-10-29 (de nya KÄLLA-raderna). Källa h80.pdf "Giltig 17 augusti–12 december 2026", läst 2026-11-02.
- storholmen-k084 / storholmen-0045: Dom KORREKT: Commons-beskrivningen "Linje 80, Storholmen from the south" (läst i webbläsare (Redaktören) 2026-11-02) plus h80.pdf "Ropsten–Storholmen" och Lidingö stad (linje 80 fortsätter till Storholmen). Ingen ändring i datan.
- storholmen-k087 / storholmen-N002: Utfyllnad: struken (STRYK+KOMPENSERA). edits nr 9: Sticklinge-meningarna och deras KÄLLA-rader (Nominatim, batpendla, Sticklingecitaten) borttagna.
- storholmen-k018 / storholmen-N003: Som N002 (mätningen 148 m via Nominatim struken).
- storholmen-k080 / storholmen-N004: Som N002.
- storholmen-k094 / storholmen-N005: Som N002.
- storholmen-N007: Ny mening i badnoten (edits nr 9): "Storholmen är bebyggd: mellan cirka 1925 och 1935 uppfördes sportstugor över hela ön, och i dag bor omkring 80 hushåll här året runt." Källa lidingo.se/…/lidingo-skargard/, läst 2026-11-02.
- storholmen-N008: Ny uppgift i samma mening (cirka 80 permanenta hushåll), samma källa.
- storholmen-0205: Rätt uppgift: kompensationen på badsidan är nu N007–N008.
- storholmen-0199–0204: Läst 2026-11-02 (HaV:s lista och Lidingö stads badsida lästa igen; KÄLLA-raderna i edits nr 9 har nytt läsdatum).

## Fjäderholmarna
Filer: ut/fjaderholmarna.edits.json (torrkörning 33 ersättningar ok, 0 fel), ut/fjaderholmarna.sql, ut/fjaderholmarna.tom.md, register/b01/fjaderholmarna.tsv.

- fjaderholmarna-k025 / fjaderholmarna-0230: Dom DELVIS, RÄTTA: «Sök resan i SL-appen.» → «Sök hela resan på sl.se.» (h2.pdf, läst 2026-11-02). edits nr 17: text och KÄLLA-rad. Samma text för Yxlan och i blogg/[slug]/page.tsx:902 noterad för Vakten.
- fjaderholmarna-k006 / fjaderholmarna-0328: FAQ på /med-barn byggs av datan; dom DELVIS, RÄTTA (följer av 0230 och N002).
- fjaderholmarna-k083 / fjaderholmarna-0310: FAQ på /komma-dit byggs av datan; dom DELVIS, RÄTTA (följer av 0230 och N002).
- fjaderholmarna-k038 / fjaderholmarna-N002: Julbordsbåten: «Från november 2026 …» → «Mellan 20 november och 20 december 2026 går Strömmas julbordsbåt dagligen …» (Strömmas sida, fliken Tidtabell, läst 2026-11-02). edits nr 16: text och KÄLLA-rad.
- fjaderholmarna-k058 / fjaderholmarna-N004: Samma ändring i description[2] (edits nr 4). KÄLLA-raden för Strömmas dagstur utan klockslag ("Varje halvtimme", läst 2026-11-03).
- fjaderholmarna-k036 / fjaderholmarna-0081: Dom DELVIS, PRECISERA: «Libertas är fågelskyddsområde med tillträdesförbud 1 april–15 juli; hos Länsstyrelsen heter området Libertus.» Källor Länsstyrelsens broschyr (område 28, karta s. 28) och Naturvårdsregistret, lästa 2026-11-03. Rövarns holme struket ur skyddsmeningen. edits nr 3 utökad till hela meningen.
- fjaderholmarna-0082: PRECISERA (följer av 0081): «landstigningsförbud under häckningstiden» → «tillträdesförbud».
- fjaderholmarna-0084: PRECISERA (följer av 0081): «Där finns …» → «På Libertas och Rövarns holme finns …» (Naturkartan, Lidingö stad, läst 2026-11-03).
- fjaderholmarna-0083, 0085, N013: Läst 2026-11-03 (KÄLLA-raderna lästa igen).
- fjaderholmarna-k124 / fjaderholmarna-0183: Dom DELVIS, PRECISERA: bergrum och luftvärnskanoner «på holmarna» enligt historiesidan, inte längs stigarna. edits nr 15: text och KÄLLA-rader (läst 2026-11-03).

## Utö
Filer: ut/uto.edits.json (torrkörning 36 ersättningar ok, 0 fel), ut/uto.sql, ut/uto.tom.md, register/b01/uto.tsv.

- uto-k077 / uto-0223: Ny text i registret med undantaget «utom på allmänt vatten» (Länsstyrelsens fiskeguide, läst 2026-11-03); raden bär regeln. Texten i edits nr 7 oförändrad, KÄLLA-radens läsdatum 2026-11-03.
- uto-k002 / uto-N003: Inte längre ny mening: undantaget ingår i 0223:s precisering (åtgärd NY → PRECISERA). Ingen kompensation behövs (N003 var ingen kompensation; fiskeposten har Utö-specifika N002).
- uto-N002: Läst 2026-11-03.
- uto-k025 / uto-0397: SQL: «Utö by Krog är en restaurang i Edesnäs på Utö i Haninge kommun, vid vägen mellan Gruvbyn och Ålö. …». Kommunen belagd med SCB (Utö 0136Q102; 0136 = Haninge), lästa 2026-11-03; Nominatim-källan borttagen.
- uto-0392: Namnet: «Utö Bykrog» → «Utö by Krog» (restaurangens egen webbplats). Ny UPDATE av name i uto.sql.
- uto-0398, 0400, N016: KÄLLA-rad: restaurangens kontaktsida (läst 2026-11-03); N016 är inte längre kompensation men står kvar.
- uto-s005 / uto-0399: Återställd «vid vägen mellan Gruvbyn och Ålö»: Stockholm Archipelago Trail (grusvägen Ålö–Gruvbryggan, etappen börjar vid Gula Villan), uppmätt i OSM 16 m till Stora Landsvägen, Skärgårdsstiftelsen och Utö gästhamn för Gruvbyn. Dom KORREKT, BEHÅLL.
- uto-k119 / uto-0447: Dom DELVIS, RÄTTA i uto.sql: «Gruvbryggan är den mest trafikerade av Waxholmsbolagets bryggor på Utö i Haninge kommun …» (Waxholmsbolaget och tabell 21, lästa 2026-11-03).
- uto-0448: PRECISERA: omformulering av linje 21-uppgiften i samma UPDATE.
- uto-N019: Ny mening i Gruvbryggans text: «Längre söderut angör båtarna också Näsudden och Spränga.»

## Grinda
Filer: ut/grinda.edits.json (torrkörning 16 ersättningar ok, 0 fel), ut/grinda.sql, ut/grinda.tom.md, register/b01/grinda.tsv.

- grinda-k154 / grinda-0448: Dom FEL, RÄTTA: Cinderella angör bara Södra Grinda (Strömmas tidtabell 2026, läst 2026-11-03). Norra bryggans text i grinda.sql: «trafikeras av Waxholmsbolaget, som skriver att Grinda har trafik året om». P0-klass, följer med batchen enligt Redaktören.
- grinda-k021 / grinda-0449: «året om» omformulerat så att det håller efter 12 december 2026; KÄLLA-rader i grinda.sql: tabell 11, Waxholmsbolagets Grindasida och Strömmas tidtabell (lästa 2026-11-03).
- grinda-k153 / grinda-0420: KÄLLA (register och grinda.sql) belägger både Waxholmsbolaget och Cinderella; PRECISERA av «året om» i Södra bryggans text.
- grinda-k012 / grinda-0421: Södra bryggans text i grinda.sql: «trafikeras av Waxholmsbolaget, som skriver att Grinda har trafik året om. Under säsong angör även …»; KÄLLA-raderna belägger Waxholmsbolaget (tabell 11 och operatörens sida).
- grinda-k105 / grinda-0346: Registrets källa och citat kompletterade med Strömmas tidtabell-PDF (30/4–27/9), som redan står i KÄLLA-raden i grinda.edits.json nr 7. Ingen ändring i datan.
- grinda-k037 / grinda-0587: Källkonflikten STF («en knapp kilometer») mot Stockholm Archipelago Trail («about 1500 meters») löst: STF driver hotellet (regel 1), och uppmätt i OSM 2026-11-03 är gångvägen 952 m från Södra och 741 m från Norra bryggan. Texten står kvar; mätning och konflikt i grinda.sql.

## Möja
Filer: ut/moja.edits.json (torrkörning 25 ersättningar ok, 0 fel), ut/moja.sql, ut/moja.tom.md, register/b01/moja.tsv.

- moja-k066 / moja-0423: Dom DELVIS, RÄTTA: «3–7 turer/dag» → «2–7 turer/dag» (tabell 14A läst 2026-11-03, sidan 3 granskad som bild: lördagar utanför M-perioderna bara turerna 1451 och 1453). edits nr 14: text och KÄLLA-rad.
- moja-k070 / moja-0421: Dom DELVIS, RÄTTA: «buss 434 Slussen–Sollenkroka» → «buss 434 Slussen–Överby, där vissa turer går till Sollenkroka brygga» (v434.pdf läst 2026-11-03). edits nr 14.
- moja-0102: PRECISERA (följer av 0421): description[3] «… Sollenkroka brygga (bara vissa turer på linjen går dit) …». edits nr 1.
- moja-0295: PRECISERA (följer av 0421): getting_there[0] «(vissa turer på buss 434 från Slussen går dit, drygt en timme)». edits nr 7. FAQ-svaren byggs om av datan.
- moja-k199 / moja-0524: Dom KORREKT, BEHÅLL: Möja står kvar i oar. Ny edit (nr 22) i hantverkare-data.ts: KÄLLA-rad ovanför oar (jowael.se/elektriker-skargarden/, läst 2026-11-03). moja.tom.md: Jowa struken ur mejlet; Vaxholmsfrågan står kvar.
- moja-k203 / moja-0082: Registret: «14X» finns inte i tabell 14 och beskrivs inte som förbokningsturer; ingen ändring i datafilerna (P0 4 i avgångsrutan).
- moja-k173 / moja-0387: Dom KORREKT, BEHÅLL: blogglänkens Gällnö-del belagd med STF Gällnö vandrarhem («Cykel finns att hyra.», läst 2026-11-03); KÄLLA-rad tillagd i edits nr 18.
- moja-0472 – moja-0480: EJ NÅBAR → KORREKT, BEHÅLL: Wallner Marins sajt läst över http://www.wallnermarin.se (adressen i datan) 2026-11-03; https-certifikatet har gått ut, vilket förklarar Chromes felsida. Ny edit nr 23 i hantverkare-data.ts med KÄLLA-rader; kalla.last → 2026-11-03. Ingen blockering kringgicks.
- moja-0522: KORREKT, BEHÅLL: Elsäkerhetsverkets söktjänst visar Jowa Elektriska AB, 556774-1250 (Chromium 2026-11-03). Direktlänken visar bara sökformuläret och byts mot söklänken (ny edit nr 24, gäller även vaxholm-0265).
- moja-0496 – moja-0503: Hellström Marin läst i Toms webbläsare 2026-11-02: namn, totalentreprenad, adress, telefon, e-post och sajt KORREKT, BEHÅLL; moja-0500 (Möja nämns inte) OBELAGD, PRECISERA – mejlfrågan står kvar i moja.tom.md.
- moja-0574: FEL, RÄTTA: Bastuhusets website (finnhamn.se, Finnhamns Arkipelag AB) → null; ny UPDATE i moja.sql.
- övrigt: moja.tom.md: Hellström Marin markerad som läst; nytt avsnitt om Wallner Marin (ingen fråga behövs).

## Vaxholm
Filer: ut/vaxholm.edits.json (torrkörning 37 ersättningar ok, 0 fel), ut/vaxholm.sql, ut/vaxholm.tom.md, register/b01/vaxholm.tsv.

- vaxholm-k022 / vaxholm-0071: bestReason: «varje dag från midsommar till slutet av augusti» → «varje dag från 22 juni till 23 augusti; midsommarhelgen 19–21 juni var det stängt» (museets sida, läst 2026-11-03). edits nr 32.
- vaxholm-k028 / vaxholm-0593: insiderTips[1]: «sedan den gamla fästningen rivits» → «sedan stora delar av den gamla fästningen rivits»; KÄLLA-rader för Statens fastighetsverk och länsmuseet tillagda, källkonflikten noterad (edits nr 31).
- vaxholm-k143 / vaxholm-0595: Som 0593 (åtgärd PRECISERA, nivå 1 gäller).
- vaxholm-0594: Källa: Statens fastighetsverk och länsmuseet (1833–1863), läst 2026-11-03.
- vaxholm-k123 / vaxholm-0504: STRYK+KOMPENSERA: meningen om stenar i farvattnet struken ur Resarö båtklubbs text (djup och säkerhet bara Sjöfartsverket). Ny UPDATE i vaxholm.sql.
- vaxholm-N008: Kompensation i samma text: «Bryggorna hör till Resarö Båtklubb, en ideell förening bildad 1972 med hemort på Resarö, som har 236 båtplatser i sina fyra hamnar.» (resarobatklubb.se, läst 2026-11-03).
- vaxholm-k144 / vaxholm-0408: Dom FEL, RÄTTA: blogglänkens titel → «Waxholmsbolaget – biljetter, cykel, zoner och båt till Vaxholm» (guidens egen rubrik). Ny edit (nr 36).
- vaxholm-k194 / vaxholm-0394: Dom KORREKT, BEHÅLL: länken till tillgänglighetsguiden står kvar; ersättningen i guide-island-map.ts struken ur vaxholm.edits.json (Waxholmsbolagets tillgänglighetssida läst 2026-11-03).
- vaxholm-k049 / vaxholm-0551: Dom DELVIS, PRECISERA: «eller egen båt» struket ur badets vägbeskrivning (edits nr 29).
- vaxholm-0552, 0553: Läst 2026-11-03 (Trafikverket).
- vaxholm-k219 / vaxholm-0465: Norrbergshamnens text i vaxholm.sql: «Dusch, toalett och latrintömning finns i Vaxholms gästhamn …» (påståendet att de saknas här struket).
- vaxholm-k124 / vaxholm-0609: Dom OBELAGD, STRYK: dog_friendly borttaget ur ö-posten (visas inte på någon sida), sammanslaget med amenities-ersättningen (edits nr 30). Ligger raden ovanför P0 17:s ändring: lägg in efter P0-grenen.
- vaxholm-k107 / vaxholm-0445: accommodationIntro skriven om efter källorna: Waxholms Hotell på Hamngatan, Vaxholms Bed & Breakfast på Drottninggatan, Kastellet B&B på kastellets egen ö med båt, camping på Eriksö, vandrarhem 4 km utanför (edits nr 21, lästa 2026-11-03).
- vaxholm-0444, 0446: Läst 2026-11-03.
- vaxholm-0265: KORREKT, BEHÅLL: Jowa Elektriska i Elsäkerhetsverkets söktjänst; länken byts i moja.edits.json nr 24 (posten är gemensam för Möja och Vaxholm).
- vaxholm-0428, 0429, 0432, 0433: Vaxholms Hembygdsgårds Café står kvar som EJ NÅBAR (Facebook); noterat i rätt uppgift.
- vaxholm-0674: Rent Under står kvar som EJ NÅBAR; frågan ligger hos Tom (noterat i rätt uppgift).

## Sandhamn
Filer: ut/sandhamn.edits.json (torrkörning 24 ersättningar ok, 0 fel), ut/sandhamn.sql, ut/sandhamn.tom.md, register/b01/sandhamn.tsv.

- sandhamn-k135 / sandhamn-0494: Dom FEL, RÄTTA: from_nearest_hub_min 38 → 60, medianen av 25 turer Stavsnäs–Sandhamn i tabell 16A (38–87 min, MÄTT 2026-11-03). Fältet är ett tal som mallarna skriver «ca X minuter», så spannet kan inte stå där; det står i facts.travel_time. Ny edit nr 22 med KÄLLA-rad och tidtabellsperiod. Fyra turer tar 38–45 min, inte bara en.
- sandhamn-k022 / sandhamn-0497: Dom DELVIS, RÄTTA: FAQ-svaret säger «ca 60 minuter» i stället för «ca 38 minuter» (följer av 0494).
- sandhamn-k212 / sandhamn-0342: Dom DELVIS, RÄTTA: «Lång resa rakt ut genom skärgården.» → «Lördagar och söndagar gick en båt hela vägen via Vaxholm, Södra Grinda och Sollenkroka; övriga dagar fick man byta båt i Finnhamn.» KÄLLA-raden för s15 (tabell 15A, läst 2026-11-03) står nu direkt ovanför posten. edits nr 11.
- sandhamn-k003 / sandhamn-0495: Dom DELVIS, RÄTTA: FAQ-svaret byggs om av getting_there (se 0342).
- sandhamn-k106 / sandhamn-0314: KÄLLA byts: sandhamn.com (Seglarhotellet) → Värmdö kommuns sida om Stavsnäs vinterhamn («Med bil Följ väg 222 från Stockholm. Vägen slutar vid Stavsnäs vinterhamn.»). Dom KORREKT, BEHÅLL. edits nr 11.
- sandhamn-k123 / sandhamn-0306: Som 0314: Värmdö kommun («… knutpunkten mellan fastlandet och skärgårdsöar som Sandhamn …», Waxholmsbolaget bland rederierna). Dom KORREKT, BEHÅLL.
- sandhamn-k044 / sandhamn-0516: Dom OBELAGD, RÄTTA: «Västerudde strand» → «Stranden vid Västerudden» (ny UPDATE av name i sandhamn.sql). Stockholm Archipelago Trail kallar udden Västerudden; uppmätt i OSM ligger stranden 37 m från Sandöns västligaste punkt.
- sandhamn-0521: description utan det obelagda namnet: «Stranden vid Västerudden ligger på Sandöns västra udde, på Sandhamn i Värmdö kommun. Från Västerudden är det omkring 1,5 kilometer längs Stockholm Archipelago Trail till ångbåtsbryggan i byn.» (sandhamn.sql).
- sandhamn-N021: Ny rad: 1,5 km längs leden från Västerudden till ångbåtsbryggan (Stockholm Archipelago Trails steg-för-steg-guide, läst 2026-11-03).
- sandhamn-k064 / sandhamn-0409: Dom FEL, RÄTTA: «mellersta skärgård» → «yttre skärgård» i Sandhamns Glassigaste Ställes text (ny UPDATE i sandhamn.sql; Länsstyrelsens fiskeguide läst 2026-11-03). Övrigt i posten ligger hos Tom (5b).
- sandhamn-k159 / sandhamn-0416: Som 0409, för PUB Alma.
- sandhamn-k069 / sandhamn-0538: Dom FEL, RÄTTA: strandnamnet i island-data «Trouville-stranden» → «Trouville» (kommunens namn, ny edit nr 23). Bad-sidans dubblettkontroll tar då bort Stora och Lilla Trouville ur databaslistan oavsett Toms beslut; antalet blir 3.
- sandhamn-0498: PRECISERA: activity_meta.bad.beaches[0].name → «Trouville» (Värmdö kommun: «Trouville, Sandhamn», läst 2026-11-03).
- sandhamn-k004 / sandhamn-0557: Dom DELVIS, RÄTTA: badnamnen följer 0498 och 0516. med-barn-mallen (rad 87) jämför exakta namn, så Stora Trouvillestranden står kvar där tills Tom döljer posten eller mallen ändras.
- sandhamn-s001 / sandhamn-0097: Återställd: «På sommaren är hamnen full av båtgäster» i description[0], i samma mening som KSSS-uppgiften (Stockholm Archipelago Trail, läst 2026-11-03). Dom KORREKT, PRECISERA. edits nr 2.
- sandhamn-N001, sandhamn-0098: N001 omskriven till del av samma mening; «Ersatt av» i 0098 uppdaterad.
- sandhamn-s004 / sandhamn-0131: Återställd: «Enligt Länsstyrelsens sjötrafikföreskrifter gäller högst fem knop vid Sandhamn» (01FS 2001:138 punkt 135, omtryck 01FS 2018:48). Gäller i dag: förteckningen 01FS 2025:1 och årgångarna 2025–2026 har ingen ändring av punkt 135. Dom KORREKT, PRECISERA. edits nr 4.
- sandhamn-s005 / sandhamn-0132: Området med Länsstyrelsens avgränsning (Telegrafholmens västligaste udde, linjen Herrbadet–Ringgrundet–Ostkobben, sunden på båda sidor om Lökholmen). Dom DELVIS, PRECISERA.
- sandhamn-s007 / sandhamn-0181: Återställd: «I dag går fyrplatsen att besöka» (Skärgårdsstiftelsen, läst 2026-11-03). Dom KORREKT, PRECISERA. edits nr 5.
- sandhamn-N019, sandhamn-N020: Nya rader i samma mening: Grönskär nås med egen båt; på ön finns varken servering eller boende (Skärgårdsstiftelsen).
- övrigt: sandhamn.tom.md: punkt 4 (fartbegränsningen) borttagen; punkt 2 uppdaterad för Trouville, Västerudden och «mellersta».
- sandhamn-0395, 0396, 0399, 0400: EJ NÅBAR → KORREKT, BEHÅLL: Café Ankarets Instagram läst i Toms webbläsare 2026-11-02 (senaste inlägget 28 augusti 2026, inom 12 månader): kafé, butik och konstgalleri.
- sandhamn-0402: OBELAGD, STRYK+KOMPENSERA: adressen «Sandhamn 310» stryks (bara från explorearchipelago.com). Ny description-UPDATE i sandhamn.sql: «Café Ankaret är ett kafé i Sandhamn som också har butik och konstgalleri.»
- sandhamn-N018: Ny rad: kompensationen (butik och konstgalleri), Instagram nivå 2.
- sandhamn-0428 – sandhamn-0435: Café Strindbergsgården står kvar som EJ NÅBAR (Facebook gick inte heller att läsa i Toms Chrome); noterat i rätt uppgift.
- övrigt: sandhamn.tom.md punkt 1: Café Ankaret markerad som klar (Toms läsning 2026-11-02, adressen struken); Café Strindbergsgården står kvar som EJ NÅBAR.
