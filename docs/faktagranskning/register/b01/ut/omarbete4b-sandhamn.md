# Omarbete runda 4b – Sandhamn (Granskaren och Skribenten, 2026-11-10)

Alla källor lästa 2026-11-10: curl --http1.1 (värdshusets svenska sida med curl, eftersom Chromium skickas till /english/), Chromium för Waxholmsbolaget och Naturkartan, pdftotext, OpenStreetMaps API. Ingen verifieringssida, ingen P0. Inget kört mot databasen, inte heller SELECT. Inget committat.
Arbetsfiler, sidkopior, OSM-data och skript: /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/omk4b-sandhamn/ (säkerhetskopior i fore/; källtexterna också i kallcache/ny/, *.2026-11-10*).

## Rader i arbetslistan
- 0557 (so4003): "Stranden vid Västerudden" struken ur FAQ-listan, som blir "Badplatser: Trouville, Fläskberget." Ny sats i sandhamn.sql: vasterudde-strand får typen nature (naturplats); posten, namnet och texten står kvar. Värmdö kommuns badplatslista, SAT. Radens övriga källor lästa igen.
- Följdrader till so4003: 0517 (type, DELVIS → OBELAGD, PRECISERA), 0538 (/bad räknar 2 badplatser).
- Kompensation i badplatsernas sektion (nya rader, edits nr 22 och 23): N040 bad.note "I Värmdö kommuns lista över badplatser finns Trouville och Fläskberget på Sandhamn." N038 Fläskbergets vägbeskrivning: båt med Waxholmsbolaget eller Strömma enligt kommunen, "omkring 500 meter fågelvägen väster om ångbåtsbryggan". MÄTT: kommunens kartpunkt (SWEREF 99 18 00, omräknad) till färjeterminalen Sandhamn i OSM är 521 m. Omräkningen ger Kontrollantens 94 m och 624 m.
- 0078 (so4056): bisatsen och "bara" strukna. Nu: "Värdshusets restaurang har öppet varje dag från mitten av juni till mitten av september; annan tid på året är den främst öppen helger. Enligt värdshusets engelska sida stänger det för renovering den 12 januari och öppnar igen den 6 mars." Sidan anger inget år. Servern anger att sidan ändrades 2026-11-03 (MÄTT). Raden läses om före publiceringen.
- 0566, 0567 (so4s03, so4s04): toilets och shower står kvar (edits nr 17), KORREKT/BEHÅLL med Värmdö kommun ("Toaletter sommartid", Trouville och Fläskberget) och KSSS servicehus (dusch maj–september).
- Inte rörda: so4001, so4033 och so4039 (Toms fråga 6c), so4008–so4041 (Café Strindbergsgården, 6b), so4015 (mallarnas runda 5) och sandhamn.tom.md.

## Redaktörens tillägg (ö-fältet)
- Posterna finns inte i mallar5/data/oar.json, som bara listar öarna. De gamla värdena kommer från docs/faktagranskning/platser-export-2026-10-29.json.
- sandhamn-N039: ksss-gasthamn-lokholmen-trollsundet: island 'Sandhamn' → 'Lökholmen' (KSSS: "I yttre havsbandet intill Sandhamn ligger Lökholmen.").
- vaxholm-N026: tenobadet: island null → 'Bogesundslandet', som grannposten bryggan-teno. Vaxholms stad: "I Tenöreservatet på Bogesund …" och "… över Pålsundsbron från Vaxön till Bogesundslandet." Kommunen kallar inte Tenö en ö.

## Kontroller (MÄTT)
- Torrkörning mot main-kopian (1be6e12): 31 ersättningar ok, 0 fel. Alla 31 "gammal" står exakt en gång i main-kopian. TypeScript-parsern ger 0 syntaxfel.
- skript/citatkoll.py: 82 par (URL, citat) i 10 rader och 16 nya KÄLLA-rader står ordagrant i dagens sparade text. Inga klockslag. En URL per KÄLLA-rad, och KÄLLA finns inom fem rader ovanför varje ändrad sträng. Båda registren har 15 kolumner (697 och 721 rader).
- Lag 3 på /o/sandhamn/bad: Västerudden-kortet hade 16 ord live och 35 i runda 4. Rubriken "Fler badplatser …" har 6 ord. Kompensationen har 37 ord. warning har 24 ord på main, 48 i runda 4 och 55 nu.

## För Redaktören och Vakten
- Listan "Fler badplatser på och nära Sandhamn" på /bad blir tom och visas inte (beslut 6 plus typbytet). FAQ-listan på /med-barn blir tre ord kortare; den byggs av mallen.
- Upptäck-kartan räknar namn med "strand" som bad (UpptackExplorer.tsx rad 100–103), så Västerudden visas där som bad. Det är en mallfråga.
- RESONERAT: seasonal.open ("värdshusets pub … året runt") och months (januari–mars limited) tar inte hänsyn till stängningen 12 januari–6 mars. De låg utanför listan.
- MOTSTRIDIG, inte använd: kommunens post i Naturkartan kallar Fläskberget "liten mysig sandstrand" med "rullstolsramp". Kommunens egen sida säger klippbad och listar ingen ramp.
- WHERE i de tre nya satserna bygger på registret och exporten 2026-10-29. Kör SELECT före. Tenöbadet påverkar vaxholm-0561 och 0583.
