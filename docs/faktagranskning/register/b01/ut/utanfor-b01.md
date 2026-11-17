# Lag 3-kompensation utanför batch 01 (2026-11-17)

Leverans: ut/utanfor-b01.edits.json (18 poster, island-data.ts och bohuslan-data.ts), utanfor-b01.tsv (22 rader: utanfor-N001–N020, R001–R002). Läsdatum 2026-11-17.
Ordning: ce275b2 + mallar-arbetskopia.patch (runda 9, 47 filer) + de nio öarnas edits.json (267 poster) + utanfor-b01.edits.json. Torrkörning i ren kopia: 18 ok, 0 fel.
MÄTT = renderat med mallar8/skript/matt8.tsx (riktig platsdatabas db-riktig.json); main ce275b2 mätt om i dag, ord identiska med mallar8/matt/main.jsonl. Före = patch runda 9 + öarna. Mätfiler: scratchpad/b01/utanfor/matt/ (main, fore9, slut, lag3-slut.tsv).
Resultat: under 95 % före 16 sidor, efter 0 (batch 01: 0). Ingen sida sjunker under 95 %. Enda sidan som minskar: Trysunda med barn 440 → 437 (main 432; badnamnen utan parentes).

## Per sida (main / före → efter, andel efter; vad som lagts till; källa)
1. Svartlöga bad 353 / 277 → 343 (97,2): de två baden fick beskrivning. Läge och vik: Stockholms läns museum, Norrtälje kommuns kulturmiljöutredning (nivå 1); badet: Lassas Hagar, namngiven (nivå 3, ingen nivå 1–2 finns).
2. Gräddö bad 356 / 284 → 369 (103,7): badnot om Björköören: EU-bad vid campingen, klassning utmärkt 2023–2025, julimedel 19,8 grader, skötsel 15 maj till 15 september, rökförbud. Havs- och vattenmyndighetens Badplatsen, Norrtälje kommun.
3. Arholma bad 276 / 226 → 296 (107,2): badnot: bad från klippor och små stränder, reservatets regler (hund, eld, tält), ingen av kommunens 31 badplatser på ön. Skärgårdsstiftelsen, Länsstyrelsen, Norrtälje kommun.
4. Brännö bad 313 / 267 → 332 (106,1): Ramsdals badplats med beskrivning (EU-bad, Brännöföreningen, ålgräs, klassning, julimedel 18,8). Havs- och vattenmyndigheten; "nära Husvik" Göteborg & Co (nivå 3).
5. Nåttarö bad 282 / 247 → 349 (123,8): Storsand och Skarsand som badplatser (sanddyner, torrdass, grillplatser, vägen från bryggan). Länsstyrelsen, Haninge kommun, Stockholm Archipelago Trail.
6. Fjällbacka bad 254 / 226 → 313 (123,2): Badberget (EU-bad, ramp, flytflotte, tillsyn) och Badholmen (klippor, trampolin, hopptorn, ingen parkering). Havs- och vattenmyndigheten (Tanums kommuns uppgifter).
7. Trysunda bad 280 / 258 → 316 (112,9): Björnviken och Storviken med beskrivning (Malmgrottan, klapperfältet, tältning). Länsstyrelsen Västernorrland (sida och PDF).
8. Lidö bad 267 / 247 → 284 (106,4): badnot (klippbad och mindre sandstränder; hund, eld). Skärgårdsstiftelsen, Länsstyrelsen.
9. Nämdö bad 253 / 235 → 269 (106,3): badnot (badplatser och klippbad längs kusten; hund, eld). Skärgårdsstiftelsen, Länsstyrelsen.
10. Lysekil bad 281 / 266 → 298 (106,0): badnot (Gullmarsbaden östra är hundbad; daglig tillsyn på större bad). Lysekils kommun.
11. Gräddö ösidan 1829 / 1670 → 1785 (97,6): ingen egen post; lyfts av källistan från badposten (Havs- och vattenmyndigheten, Norrtälje kommun).
12. Brännö ösidan 1860 / 1733 → 1893 (101,8): tips om Galterö naturreservat: vägen från Rödsten, skjutfältet på västra Galterö, hund, tält, eld. Länsstyrelsen Västra Götaland.
13. Trysunda ösidan 1848 / 1741 → 1797 (97,2): tips om tillgänglighet (M/F Ulvön, grusad gångväg, anpassade toaletter). Länsstyrelsen Västernorrland.
14. Gällnö ösidan 2494 / 2367 → 2451 (98,3): en mening om vattenområdena i reservatet. Länsstyrelsen.
15. Dalarö hamnar 160 / 151 → 160 (100,0): Askfatshamnen: förtöjning vid bom, gångstigen över Askfatsberget. Svenska Gästhamnar (nivå 3; Haninge kommun säger bara att gästhamn finns).
16. Birka komma-dit 452 / 373 → 448 (99,1): Vårby och Jungfrusunds bryggor, sju minuters promenad till Hovgårdens brygga, färjan kallas i Trafikverkets app, Särimners avgångsbryggor. birkavikingastaden.se (nivå 2), Trafikverket. Inga tider eller priser.

## Rättelserna
- Nåttarö "Snorkling" (R001): kortet följer nu Länsstyrelsen ("Invid ångbåtsbryggan finns en snorkelled …"; "ett av länets första marina naturreservat"). Obs: Haninge kommun skriver i dag "På Nåttarö kan du snorkla längs länets första snorkelled". Uppgiften är alltså belagd av kommunen (nivå 1) och inte motbevisad av Länsstyrelsen, bara inte nämnd där. Dom KORREKT, åtgärd PRECISERA. Samma uppgift står kvar i tagline, description och did_you_know (Haninges citat). Redaktören avgör.
- Dalarö "Vrakdykning" (R002): DELVIS. Haninge kommun: "Inför varje dyktillfälle görs en ansökan om tillstånd att få förtöja vid bojen av en dykarrangör, detta sker via Dalarö Dykpark." Kortet säger nu det, och att dyket sker under ledning av dykguide (Haninge, Dalarö Dykpark) och att Dykparkens webbplats listar arrangörer. Kvar med samma fel: öns description ("tillstånd krävs före varje dyk") och tips ("kräver tillstånd i förväg"). Till Vakten.
- Badsidan visar Snorkling bara om mallen tar med "snork"; kompensationen räknar inte med kortet.

## Annat att veta
- Svartlöga: kortet "Stigar och bad" har explorearchipelago.com som källa; adressen går i dag till skargardsstiftelsen.se/omraden/ (död källa).
- Gräddö: inga fler kommunala bad nära; Lågaröören och Åkeröbadet ligger cirka 6,5 km bort (Lantmäteriets Min karta).
- Källistan visar per URL det längsta citatet. Nya citat för en URL kan därför byta ut ett annat (Trysunda, Länsstyrelsen). Gällnös citat är kortare med flit.
- Fjällbacka och Lysekil fick activity_meta (fanns inte); Arholma, Lidö, Nämdö och Lysekil har beaches: [] med note.

## Kontroller (kopian med allt ovan, 2026-11-17)
npx tsc --noEmit -p . 0 fel · node scripts/verify-claims.mjs exit 0 (2 kända i baslinjen) · generera-kallor.mjs kört, --kontroll grön (101 öar, 1 759 källor) · generera-uppskattningar.mjs --kontroll grön · npx vitest run src/lib 77 filer, 786 test gröna · kontrollera_register.py: inga formfel, 22 rader.
Citat: 88 av 88 nya citat står ordagrant i de sparade källtexterna (scratchpad/b01/utanfor/kallor/, skript/citat.py). Inga tankstreck i tillagd publicerad text; citat med tankstreck är delade.
Ej nåbar: ingen. Facebook och Instagram användes inte.
