# Omarbete runda 4 – Möja (Granskaren och Skribenten, 2026-11-09)

Alla källor lästa 2026-11-09 (svensk tid; arbetet började 8 november och allt lästes om efter dygnsskiftet): curl, Chromium (las_sida.py), pdftotext, Riksantikvarieämbetets K-samsök och bebyggelseregister, OpenStreetMaps API med paus mellan anropen, Supabase bara SELECT. Facebook (Jeppes, PerMobilen) visade bara inloggningen och är EJ NÅBAR; Jeppes Instagram gick att läsa. svenskagasthamnar.se gav 502 från arbetsytans proxy i Chromium och är läst med curl. Ingen verifieringssida visades. Ingen P0.
Main-kopian uppdaterades under rundan till 85f7415 (#513). Alla poster är prövade mot den. Sidkopior, OSM-data och skript: /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/omk4-moja/ (texterna också i kallcache/ny/, *.2026-11-09*).
Kortnamn: Foldern = Värmdö kommuns Möjafolder (2018). Kommunen 2023 = Värmdö kommuns inbjudan till markanvisning på Möja (dnr 2023KS/0452). BeBR = Riksantikvarieämbetets bebyggelseregister, Möja kyrka (anläggning 21300000005465; historik av Stockholms läns museum 2007 och RAÄ 1996/2003). SAT = stockholmarchipelagotrail.com, etapp Möja. VM = visitmoja.se (Möja turistförening, nivå 3; för den egna boden nivå 2). MO = mojaoutdoor.se. VH = mojavandrarhem.se. Coop = konsummoja.se. MKU = mojadansbana.se.

## Ändrade och nya registerrader (84 ändrade, 12 nya: N016–N027)
Säsongen (edits nr 19 och 20)
- 0060 (maj) och 0065 (okt): KORREKT, KÄLLA-rad ny för Begränsad service. Kommunen 2023, VH (april–december), MO (maj–sep 2027), VM (boden juni–augusti), bokningssidan.
- 0061 (juni) och 0063 (aug): KORREKT, KÄLLA-rad ny för Öppet. Boden, B&B:n 18 juni–15 augusti, museet från midsommardagen, s14.pdf (19 juni–16 augusti 2026), MO.
- 0068 (best "Juni eller augusti"): KORREKT. Rådet följer av skälen som nu står i bestReason. VM, s14.pdf.
- 0070: FEL → RÄTTA: boendena är "ofta" fullbokade tidigt på året. VM boende.
- 0071: FEL → RÄTTA: "Föreningens Brunströms bod i Berg har öppet juni–augusti" i stället för "sommarverksamheterna". VM.
- N027 NY: "Waxholmsbolagets sommartabell gällde 2026 från 19 juni till 16 augusti". s14.pdf.
Turistföreningen ersatt med nivå 1–2 (nr 0, 5, 13, 15, 16, 18, 26–28, 31)
- 0005, 0027, 0382 (vandring), 0227, 0231 (naturstigen): KORREKT, KÄLLA-rad ny. Foldern ("naturstig går över ön till Ramsmora."), SAT.
- 0553 och 0243: KORREKT, KÄLLA-rad ny. Foldern för kajaken, MO för SUP.
- 0554, 0244, 0245, 0246: KORREKT, KÄLLA-rad ny. MO (kajak, roddbåt, SUP, sälsafari, bastu på en ö).
- 0037 (Året runt): KORREKT, KÄLLA-rad ny. Kommunen 2023 (matbutik året runt, båtar året om även i is).
- 0438, 0439 (badet): KORREKT, KÄLLA-rad ny. Foldern.
- 0242 (dansbanan): KORREKT, KÄLLA-rad ny. MKU (bion året om), Kommunen 2023 (arrangemang hela året). VM står kvar för musik, dans och marknader.
- 0228, 0229, 0230, 0453: KORREKT, KÄLLA-rad ny. SAT (Långvik–Hamn, grusväg, Lätt, barnvagn). VM står kvar för ordet landsvägen.
- 0234 (gula band), 0466, 0468, 0469 (PerMobilen): KORREKT. Ingen nivå 1–2-källa; VM står kvar och namnges i KÄLLA-raden. PerMobilens Facebooksida är EJ NÅBAR.
- 0232: MOTSTRIDIG → RÄTTA: "(12 km)" → "(knappt 5 km)". MÄTT i OSM: relation 19268630 är 4 857 m. VM anger 12 km. N017 NY (kompensation): stigen startar i Ramsmora vid Mellansjön (Foldern).
- 0556 (max_km): KORREKT, KÄLLA-rad ny. SAT 13,8 km. MÄTT i OSM: ingen annan namngiven stig på Möja är längre än 4 857 m.
Skolan (nr 1 och 5)
- 0034: INAKTUELL → STRYK+KOMPENSERA. Kommunen 2023: Möja skola är pausad på grund av för få barn. Faktakortet: "Bofast ö med två Coop och runt 60 företag; runt 200 personer bor här permanent (kommunen 2023)". N024 NY (runt 200 bofasta).
- 0091 PRECISERA, 0092 och 0093 INAKTUELL → RÄTTA (utanför listan, samma uppgift): description[1] säger nu att skolan var pausad 2023. N025 NY: barnen gick i Djurö skola med skolskjuts. 0033 och 0036 har Kommunen 2023 som källa, och 0035 är läst igen.
Kyrkan (nr 0, 6 och 29)
- 0164 och 0238: DELVIS → PRECISERA: "fortifikationsbyggmästaren Carl Öhrn (även stavat Örn)". BeBR har båda stavningarna.
- 0165 och 0239: FEL → RÄTTA: tornet byggdes till 1839–1840 och fick sin nuvarande tornspira 1885. BeBR.
- 0167 (KORREKT) och 0168 (DELVIS): PRECISERA: interiören restaurerades 1924–1938, och då fick kyrkorummet sin nuvarande karaktär; exteriören fick sitt utseende 1885. BeBR.
- 0171: PRECISERA: kyrkogården anlades 1755 (inte "omkring"). BeBR.
- 0169: KORREKT, KÄLLA-rad ny: tavlan med Kristus på korset (församlingen om inredningen i dag, ingen historia).
- 0166 (dörrar 1924), 0170 (ramens ålder), 0172 och 0173 (orgeln 1982, Walter Thür): OBELAGD → STRYK+KOMPENSERA; bara församlingen (nivå 2) anger dem.
- N018–N022 NY: liggtimmer 1768–1769, exteriören 1885, arkitekten Martin Hedman, kyrkan skyddad enligt kulturminneslagen (BeBR), orgelns tio stämmor (församlingen).
- 0236: PRECISERA: "Kyrka från 1768–1769 på Kyrkvikens västra sida på södra Möja". BeBR. 0016 (taglinens kyrka): KÄLLA-rad ny, Kommunen 2023.
Roland Svensson (nr 2 och 27)
- 0131, 0222: KORREKT, KÄLLA-rad ny. Nationalmuseum (collection.nationalmuseum.se, artist 3475) och Kungliga biblioteket (arken.kb.se).
- 0133, 0225: OBELAGD → PRECISERA: "i museet finns hans målar- och skrivarhörnor" (museet om sin egen utställning). Flytten från Tornö har ingen nivå 1-källa och är struken. N016 NY: museet har öppet resten av året mot bokning.
- 0135: FEL → RÄTTA: glasväggen ger utsikt mot Nassa och Gillöga, "den skärgård som enligt museet låg honom varmast om hjärtat".
Trafik, Coop och Kyrkvikens gästhamn (nr 17, 30, 32)
- 0360: KORREKT → PRECISERA: h14.pdf (MÄTT: Berg har en tid på varje tur, vår och höst 2026), s14.pdf, Kommunen 2023.
- 0361: OBELAGD → STRYK+KOMPENSERA. Vintertabellen 2026–2027 är inte publicerad (v14.pdf är vår och höst), och Kommunen 2023 skriver att båtarna lägger till i Berg och Möjaström året om, även när isen ligger (N026 NY).
- 0362: OBELAGD → STRYK+KOMPENSERA. Ingen källa för Möjabussen. N023 NY: vägen från bryggan till STF Möja vandrarhem (STF om sitt eget läge).
- 0463: FEL → RÄTTA: "Coop Berg är ombud för Systembolaget, post och apotek." Coop, Kommunen 2023, Foldern. Systembolagets ombudssida hittades inte.
- 0335, 0336: KORREKT, KÄLLA-rad ny: Möja Värdshus & Bageri, Bergs by 600 (restaurangen) och Coop Berg. Avståndet 500 m står hos svenskagasthamnar.se (läst med curl).
- 0018, 0086 (mellersta skärgård): KORREKT, KÄLLA-rad ny: SAT "Stockholms mellersta skärgård" (nivå 3; ingen kommun eller myndighet har en egen indelning). Länsmuseets "mellanskärgård" är en annan indelning. Toms beslut 2.
Övrigt i datafilerna (nr 7 och 33)
- 0289 (full-18 utanför-1): FEL → RÄTTA: rummen går att boka 18 juni–15 augusti, och övriga datum är boendet stängt. Bokningssidan anger inget år, så inget år är skrivet.
- 0488: OBELAGD → RÄTTA: "Möja Snickarna" utan AB. Det är företagets eget namn på mojasnickarna.se.
Databasen (moja.sql)
- 0581: FEL → RÄTTA: hamncafet-moja.website = null. VM ger profilen till Hamnbaren (länkarna är MÄTT i sidans HTML).
- 0580: OBELAGD, BEHÅLL: ingen belagd punkt för Hamncafét. Turistföreningen anger bara "(Kyrkviken)", och nålen ligger 106 m från viken (MÄTT).
- 0584: KORREKT, KÄLLA-rad ny: Jeppes egen Instagram (senaste inlägget 2026-11-06) skriver Jeppes Gästgiveri, så namnet står kvar.
- 0587, 0593, 0594, 0626, 0618: KORREKT, KÄLLA-rad ny, uppmätt i OSM: Jeppes 10 m, Kyrkviken 1 m, Hamnbaren 17 m, bageriet 54 m.
- 0619: FEL → RÄTTA: bageriets historia börjar 1951, och 2019 köptes ny bageriutrustning för att återta bageripositionen.
- 0633: FEL → RÄTTA: type hotel → hostel (typen finns redan). 0645: FEL → RÄTTA (uthyrningen går via vandrarhemmet, transporten via Möja Outdoor). N004: PRECISERA (Coop Berg, med Coop som källa).
- 0570: OBELAGD → PRECISERA: namnet "Bastu på Stora Kalholmen" (STF). Beskrivningssatsen skriver inte längre "Bastuhuset".
- 0407 och 0413 (Löka, full-08 utanför-1) och 0599 (Kyrkviken, utanför-2): lästa igen. Ingen nivå 1–2-källa anger antal platser, Y-bommar eller djup. Satserna i moja.sql från 2026-10-29 tar redan bort dem.

## Rader i arbetslistan som inte rörts
- moja-0020 (f20-k004): mallfel, isAccessibleForFree är ett fast värde (mall-0008, page.tsx:203). Tas i mallarnas omkontroll.
- moja-0491 (f22-k065) och moja-0484 (f26-k008): mallfel i HantverkarKort.tsx (ö mot o), på Vaktens lista. Tas i mallarnas omkontroll.
- Alla andra rader i listan var omarbeten och är gjorda. Inga Möja-poster är borttagna, eftersom Vaktens lista inte nämner någon Möja-post som redan finns i main.

## Omprövas i slutomkontrollen
- 0360 och 0362 (flaggan OMPROVAS): nu operatören och kommunen. Vintertabellen för 2026–2027 ska läsas när den publiceras.
- 0335 och 0336 (OMPROVAS): svenskagasthamnar.se är bara läst med curl.
- Säsongen (förtydligande 15): 0060, 0061, 0063, 0065, 0068, 0071, N027 och 0289 läses om före publiceringen.
- 0232 och 0556: mätningen i OSM mot turistföreningens 12 km.
- 0034, 0091–0093, N024, N025: skolans läge i dag. Kommunens senaste uppgift är från 2023.
- 0131 och 0222: Redaktören bekräftar att Nationalmuseum och KB räknas som nivå 1 för levnadsår. 0164 och 0238: nivå 1 har två stavningar.
- 0580: Hamncaféts nål behöver verksamhetens egen uppgift.

## Torrkörning och kontroller (MÄTT)
- `applicera.mjs main-kopia moja.edits.json --torr` (85f7415): **34 ersättningar ok, 0 fel**. Alla 26 tidigare poster gick in utan ändrad "gammal", och varje "gammal" finns exakt en gång i orörd main.
- Nya poster nr 26–33: kajakens KÄLLA, museet och vandringen, dansbanan och kajaken, kyrkan, tipset om Berg, PerMobilen, Kyrkvikens gästhamn och Möja Snickarna. Ändrade poster: nr 0, 1, 2, 5, 6, 7, 13, 15, 16, 17, 18, 19 och 20 (nr 17 och 19 har längre "gammal" som tar med textraden).
- TypeScript-parsern: 0 syntaxfel i island-data.ts, hantverkare-data.ts och transit-stops.ts efter inläggning.
- Citat (skript/citatkoll4.py): 70 KÄLLA-rader i edits.json, 31 i moja.sql och 96 registerrader med läst 2026-11-09 ger 339 citat, och alla står ordagrant i dagens sparade källtext. Det är en URL per KÄLLA-rad och inga klockslag.
- moja.sql: 11 UPDATE, varav 6 från tidigare rundor och 5 nya (bastuhuset.name, moja-bageri.description, hamncafet-moja.website, moja-stf-moja-gard.type och .description), och 6 kommentarer utan UPDATE. SELECT 2026-11-09: varje WHERE träffar en rad. Inget är kört.
- Registret: 673 rader, alla med 15 kolumner. kontrollera_register.py: inga formfel, inga grundrader utan motsvarighet.
- Lag 3: Möjablockets strängar går från 1 864 till 2 000 ord (107,3 %), och de ändrade strängarna från 314 till 450 ord. Ingen sektion blir tunnare. Hantverkarkortet tappar ett ord (AB).
- /oppet-nu (RESONERAT ur data och sidans logik, inte renderat): mot publicerad main visas Möja nu alla tolv månader. Jan–apr och nov–dec ligger under Begränsad service (förut syntes ön inte alls), september flyttar från Öppet till Begränsad service, och maj–augusti och oktober står kvar som förut. Märket "Bäst: Juni" är oförändrat i alla månader, eftersom mallen tar första ordet i best. Mot förra rundans edits ändras bara bestReason. Kortet visar nu "Gästhamnarna kan vara trånga i juli, och under högsommaren är boendena ofta fullbokade …".

## För Redaktören och Vakten
- Kommunen 2023 (nivå 1, nyare än Foldern) skriver att restaurangerna har öppet "större delen av året". Därför står inte VM:s "restauranger året runt" i säsongstexten, som beslutet bad om, eftersom nivå 3 inte får användas mot nivå 1. Vandrarhemmet har i dag öppet april–december enligt egen sida, medan Foldern och SAT skriver året om.
- Samma uppgifter finns på fler ställen: blogg/[slug]/page.tsx (dolda-parlor-moja, ungefär rad 160–170) säger "12 kilometer" om naturstigen, att hörnorna "flyttades hit" från Tornö och att kyrkogården anlades "omkring 1755".
- BeBR används som nivå 1 för kyrkans historia (Riksantikvarieämbetet, text av länsmuseet). Sidan på bebyggelseregistret.raa.se går att läsa med curl. Länken via kulturarvsdata.se/raa/bbr/html/ leder dit, men det äldre id:t 21400000444986 ger 410.
