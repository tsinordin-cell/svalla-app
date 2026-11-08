# Omarbete runda 4 – Fjäderholmarna (Granskaren och Skribenten, 2026-11-08)

Filer: register/b01/fjaderholmarna.tsv (31 rader ändrade, 6 nya: N015–N020; 349 rader, alla med 15 kolumner),
ut/fjaderholmarna.edits.json (40 poster: nr 33–39 nya, nr 4, 5, 23, 28 och 29 ändrade), ut/fjaderholmarna.sql
(samma 4 UPDATE som förut, WHERE kontrollerade med SELECT i dag; ny kommentar utan UPDATE för rad 0300).
Arbetsfiler, sidkopior och skript: scratchpad/b01/omk4-fjaderholmarna/. Nya källtexter också i kallcache/ny/ (*.2026-11-08.txt).
Ingen P0.

Källor för historien (nivå 1, alla lästa 2026-11-08): Lidingö stads kulturmiljöprogram, Stora Fjäderholmen
(K7 = share.mediaflow.com/sv/?K7CCE1YEFB, knappen Hämta dokument, samma pdf som 2026-10-29) och del 2 (D2 = share.mediaflow.com/sv/?QMCC914E6X);
Riksantikvarieämbetets Fornsök, lämning L2013:5096, krog/gästgiveri (FS = app.raa.se/open/fornsok/lamning/406b40b1-…);
Stockholmskällan, Stadsmuseet (SK10177 och SK9943). Förvaltarens historiesida (KDF) är nivå 2 och står kvar bara för nuläget
(bergrum, kanoner, byggnaderna) och för förvaltaren om sig själv (1982).

## Ändrade och nya registerrader (dom → åtgärd: ändring; källa; post i edits.json)
- 0038 OBELAGD → STRYK+KOMPENSERA: Eurenius köp 1809 struket ur Visste du att; ingen nivå 1-källa. FS. Nr 38.
- 0039 FEL → RÄTTA: namnbytet till Lilla Britannien gjordes år 1800 av den dåvarande ägaren, en sjökapten (FS stavar «Brittannien»). Nr 38.
- 0040 OBELAGD → STRYK+KOMPENSERA: «Eurenius imperium» struket; öknamnet England i stället (N018). FS. Nr 38.
- 0041 DELVIS → PRECISERA: «krogstuga på 1600-talet» → krog åtminstone sedan 1699. K7, FS. Nr 38.
- 0042 DELVIS → PRECISERA: «totalt landstigningsförbud» → förbud 1940 som i princip gällde till 1976. K7. Nr 38.
- 0046 KORREKT, BEHÅLL (ANM): oktober prövad mot tabell 2 (h2.pdf, GÄLLER-raden oförändrad): X-turer hela perioden till 12 december, u-turer 14/9–19/11. Oktober är redan limited i nr 29 (rad 0052); KÄLLA-rad ovanför months. Nr 29.
- 0050 DELVIS → RÄTTA: augusti peak → open. Strömmas täta tabell gäller 18 juni–15 augusti, så bara juli ligger helt inom den. Strömma, bryggeriet. Nr 29.
- 0063 FEL → RÄTTA: seasonal.peak 'Juli–Augusti' → '18 juni–15 augusti 2027' (där Strömma och bryggeriet är överens). Inlagd i nr 28, som har samma "gammal" (rad 0013).
- 0096 KORREKT → PRECISERA: klockslagen i description[2] tas bort av nr 4 (rad 0097, «på dagen»); 0096 tillagd i nr 4, Strömmas KÄLLA-rad läst igen. Nr 4.
- 0108 DELVIS → PRECISERA: «sedan 2020» struket; produktionsbryggeriet i Bro «öppnade när covid-19-pandemin var som värst». fjaderholmarnasbryggeri.se/about. Nr 5.
- 0109 OBELAGD → PRECISERA: samma mening; 2020 är året för vägvalet, inte öppningen. about. Nr 5.
- 0129 DELVIS → PRECISERA: krog åtminstone sedan 1699 och troligen långt tidigare. K7. Nr 33.
- 0130 OBELAGD → PRECISERA: stadsfolk som kom för att roa sig → sjökrogen som rast- och mötesplats för skärgårdsbor, bland annat Möjaborna, på väg med strömming till Fiskarhamnen. FS. Nr 33.
- 0131 OBELAGD → STRYK+KOMPENSERA: uppköparna strukna; kompensation N015 och Möjabornas strömming. FS. Nr 33.
- 0132 OBELAGD → STRYK+KOMPENSERA: Eurenius köp 1809 struket; kompensation N016 (Stockholms stad köpte holmarna 1849). K7, SK9943. Nr 34.
- 0133 FEL → RÄTTA: namnbytet år 1800, den dåvarande ägaren var sjökapten. FS. Nr 34.
- 0134 OBELAGD → STRYK+KOMPENSERA (utanför listan, samma mening som 0135, subjektet struket): «stora summor på ombyggnader»; kompensation N017. K7. Nr 34.
- 0135 OBELAGD → STRYK+KOMPENSERA: «Eurenius imperium» struket; kompensation N017 och N018. K7, FS. Nr 34.
- 0136 OBELAGD → STRYK+KOMPENSERA: försäljningen 1822 struken; kompensation N016. K7, SK9943. Nr 34.
- 0137 DELVIS → PRECISERA: «Kronan tog över» → efter första världskrigets slut 1918 förvärvade marinen holmarna, som byggdes ut för ammunitionstillverkning. K7, D2. Nr 35.
- 0138 DELVIS → PRECISERA: förbudet 1940 gällde i princip till 1976, då Försvarsmakten lämnade holmarna. K7. Nr 35.
- 0151 KORREKT, BEHÅLL: KÄLLA-rad ny (nivå 1): sjökrogarna gick i sent 1800-tal över till restaurang- och caféverksamhet. D2, K7. Nr 36.
- 0152 OBELAGD → STRYK+KOMPENSERA: Värdshuset Grönborg 1884 struket (ingen nivå 1-källa); kompensation N019 och N020. K7. Nr 36.
- 0153 DELVIS → PRECISERA: «ångsluparna i skytteltrafik» → kunderna reste gratis med båtarna från Stockholm, som gick varje halvtimme. K7, SK10177. Nr 36.
- 0154 KORREKT, BEHÅLL: KÄLLA-rad ny (Grand Restaurant Bellevue 1905). K7, SK10177. Nr 36.
- 0155 KORREKT, BEHÅLL (utanför listan): KÄLLA-blocket omskrivet, källan byts till K7 (utedansbana 1910). Nr 36.
- 0157 DELVIS → PRECISERA: «ammunitionsdepå under andra världskriget» → ammunitionsförvaring; 1939 ny byggnadsfas med bergrum för ammunition och minor. K7. Nr 37.
- 0158 FEL → RÄTTA: «arbetade och bodde 150–200» → arbetade på 1940-talet, men de flesta pendlade från Stockholm. K7. Nr 37.
- 0252 KORREKT, BEHÅLL (OMPROVAS): Länsstyrelsens beslut 1982-03-08 (inskannat, Naturvårdsregistret dokument 1045298): förbud att 1 april–15 juli landstiga på Libertus, skären nordost därom och Lillholmen; syfte: fågelfaunan under häckningstid. Naturvårdsregistret: gällande, tillträdesförbud fågel 1/4–15/7. MÄTT: områdets gräns (wkt, 1,63 ha) omsluter OSM:s Libertas och Rövarns holme helt, ingen del av Stora Fjäderholmen. Texten står kvar. Nr 23.
- 0300 KORREKT, BEHÅLL: läget belagt med förvaltarens karta (gästhamnens bryggor mellan (14)–(16) och (21) Sjömacken & Gästhamnskontor) och MÄTT i OSM: nålen 10 m från flytbryggan way 118316335 (mooring=yes). Ingen UPDATE; kommentar i sql.
- 0313 OBELAGD → PRECISERA: badplatsen «Klipporna på Stora Fjäderholmen» → «Klipporna på Fjäderholmarna». fjaderholmarna.se («Sol och bad vid klipporna.»), Visit Stockholm. Nr 39.
- N015 NY: krogen finns utmärkt på 1699 års kartor över Lidingö socken. FS. Nr 33.
- N016 NY: år 1849 köpte Stockholms stad holmarna. K7, SK9943. Nr 34.
- N017 NY: 1849 till slutet av 1880-talet var Ängsholmen deponi för stadens latrintömning. K7. Nr 34.
- N018 NY: den största holmen, där krogen låg, kallades länge England. FS (Länsstyrelsens karta 1982 har också namnet). Nr 38.
- N019 NY: brännvinsmonopol i Stockholm, men L. O. Smith kunde fritt sälja billigt brännvin på Stora Fjäderholmen utanför stadens gräns; «i slutet av 1800-talet» eftersom K7 säger 1880-talet och SK10177 slutet av 1870-talet. Nr 36.
- N020 NY: utsiktstornet Belvederen 1884, restaurangpaviljong för 500–600 personer 1894. K7. Nr 36.

## Rader som inte rörts, med skäl
- 0257 (f17-k104): mallfel, «Öppettiderna skiljer sig mellan säsonger» i islandFaqs.ts:69 (mall-0081). Mallarnas omkontroll.
- 0242 (full-17 utanför-1): ingen ny åtgärd; «eluttag anges inte» är redan FEL, och el står i N010 och N011.
- 0240 och 0305, hamndjup (full-17 utanför-3): ingen ny åtgärd; redan OBELAGD och strukna.
- JSON-LD validThrough 2026-10-31 (full-20 utanför-1): Vaktens lista (hårdkodat i src/app/o/[slug]/page.tsx).
- Edits nr 31 (radiusKm 0.7 i islandCoords.ts) står kvar oförändrad: Vaktens lista justerar den mot platsRadieKm. Obs: Toms beslut 3
  (2026-11-08) säger att Fjäderholmarnas GPS-radie står kvar på 1,5 km, så nr 31 får inte läggas in som radiusKm.
- Inga poster borttagna: Vaktens lista nämner ingen Fjäderholmarna-post som redan finns i main.

## För Redaktören (utanför arbetslistan, inget ändrat)
- 0127 och 0128 (köpebrev 1381; namnet från Fierdholmarna) har bara förvaltarens startsida, nivå 2, för historia. Nivå 1 säger
  «omnämns i skrift redan 1381» utan köpebrev (K7) och att namnet «antagligen» (K7) eller «förmodligen» (FS) kommer från fjärden.
- 0081 (nr 3, 2026-11-03): Rövarns holme ströks ur skyddsmeningen eftersom Länsstyrelsen bara nämner Libertus. Mätningen för 0252
  visar att området omfattar Rövarns holme (beslutet kallar den troligen Lillholmen; RESONERAT efter kartans läge).
- Samma uppgift som 0157 och 0138 står i src/app/guider/[slug]/guide-content.ts:2238 med förvaltarens sida som källa (för Vakten).
- Förvaltarens historiesida anger Eurenius 1809 och Värdshuset Grönborg 1884; Fornsök anger ett namnbyte år 1800 av en sjökapten.
  Ingen nivå 1-källa nämner Eurenius eller Grönborg (sökt i K7, D2, Fornsök/K-samsök, Stockholmskällan, Stockholms läns museum).

## Ska omprövas i slutomkontrollen
- 0252 (flagga OMPROVAS): beslutet är inskannat utan textlager; citaten är avskrivna från bilden och kontrollerade mot OCR.
- 0300: mätningen mot förvaltarens karta (kartan är en tecknad bild, inte skalenlig; ordningen längs stranden är det som mäts).
- 0050 och 0063: säsongskalendern (augusti open, peak 18 juni–15 augusti 2027) läses om före publiceringen (förtydligande 15).

## Torrkörning och kontroller
- `node applicera.mjs main-kopia ut/fjaderholmarna.edits.json --torr` (main-kopia = bde5b83, efter #504–#509):
  **40 ersättningar ok, 0 fel (torrkörning)**. Alla 33 tidigare poster gick in utan ändrad "gammal".
- island-data.ts efter inläggning i en kopia: inga syntaxfel (TypeScript-parsning med repots typescript).
- Citat: 78 citat i KÄLLA-rader lästa 2026-11-08 (edits) och 61 citat i registret står ordagrant i sparade källtexter
  (skript/kolla_citat.py, skript/kolla_register.py); inga klockslag, en URL per KÄLLA-rad.
- Lag 3 (skript/lag3.py, samma metod som runda 3): /o/fjaderholmarna 110,4 % (110,2 % före runda 4), /bad 99,4 %,
  /med-barn 115,8 %, /aktiviteter 105,0 %. De ändrade strängarna har 411 ord mot 297 före.
