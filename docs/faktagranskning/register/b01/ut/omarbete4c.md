# Omarbete runda 4c – Utö, Vaxholm, Möja och Grinda (Granskaren och Skribenten, 2026-11-10)

Arbetslista: kontroll/omk4b.beslut.tsv, raderna «Omarbete 4c». Raderna märkta «OK efter Redaktörens läsning» (ob4001, ob4007, ob4017, ob4030)
är inte rörda. Main-kopian står på 1be6e12. Arbetsfiler, sidkopior och skript ligger i scratchpad/b01/omk4c/. Källtexterna finns också i kallcache/ny/ (*2026-11-10*).

## Utö (uto.tsv; edits och sql är oförändrade)
- uto-0017 (ob4035): raden säger nu att alla mätvärden gäller den nya nålen 58.9476, 18.2623, som uto.edits.json nr 34 lägger in. Kontrollanten
  mätte från den gamla nålen i main (7,94, 5,40, 4,19 och 4,92 km). MÄTT igen 2026-11-10 i OpenStreetMaps API (haversine) från den nya nålen:
  längsta strandpunkt 6,997 km, Gruvbryggan 4,41 km, Ålö 5,09 km och Rånö 5,77 km. Rånökällans punkt är OSM-noden 3053395678
  («Rånö Källan Pub & Café»), som uto.sql (rano-brygga) lägger in. Den ligger 5,82 km från nålen. Toms fråga 3c väntar; blir svaret ja skrivs raden om.
- Radnummer: fil:rad 496 → 504 (uto-0139–0145), 593 → 620 (uto-0330–0332) och 597 → 626 (uto-0335–0337 och uto-N032). Kontrollerat i
  main-kopian; raderna är desamma i 80c0470 och 1be6e12.

## Vaxholm (vaxholm.tsv, vaxholm.edits.json nr 28)
- vaxholm-0437 (ob4028): MÄTT 2026-11-10 med haversine från Vaxholms nål 59.4022, 18.3520. Tenös punkt i databasen i dag (59.39257, 18.33038)
  ligger 1,63 km bort. Punkten efter vaxholm.sql (rad 0438, 59.392279, 18.328248) ligger 1,74 km bort. Båda värdena och metoden står i raden.
  Tills vaxholm.sql har körts gäller 1,63 km, så en platsradie för Vaxholm måste vara kortare än så. Citatet ur islandPlaces.ts är nu ordagrant (utan «…»).
- vaxholm-0615 (ob4043): difficulty 'medel' → 'lätt–medel' och difficultyFor 'guidade turer'. Mallarnas runda 5 visar det som «Lätt–medel (guidade turer)»
  (typen och kajakGrad finns i arbetskopian /home/claude/svalla-mallar5). På kanotcenter.com/tours/ (läst utan klick 2026-11-10) är 10 av 12
  paddelturer Easy och 2 Moderate. Uthyrningen har ingen grad. Posten kräver mallarnas runda 5: i dagens mall visas värdet som Svår, och typen saknar difficultyFor.

## Möja (moja.tsv, moja.sql)
- moja-0619 (ob4022): moja.sql har ett nytt värde i satsen för moja-bageri.description: «Enligt värdshuset startade bageriet 1951, och 2019 tog nuvarande
  fastighetsägare över verksamheten, …». Ledet «då man började baka bröd i fastigheten» är struket, och citatet om det är borttaget ur KÄLLA-kommentaren.
  WHERE är oförändrad. Sidan och bokningssidan är lästa i dag. Texten har 50 ord; databasen har 35 i dag.

## Grinda (grinda.tsv, grinda.edits.json nr 3; texten är oförändrad)
- grinda-0168 (ob4033): datumet står kvar. «2026 hölls det den 17 oktober» beläggs av wärdshusets egen evenemangslista, grinda.se/evenemang/
  («17 okt 2026», «Eld-helg»; datumet står närmast före evenemanget), läst i Chromium 2026-11-10. Kontrollanten läste inte den sidan.
  Stängningen beläggs av grinda.se/oppettider/ (Hotell/Wärdshuset, läst 2026-11-10): endast lunch 1 november 2026, stängt 2 november 2026–29 april 2027
  och öppet från 30 april 2027. Båda sidorna stod redan i KÄLLA-raderna i nr 3. Nu har de läsdatum 2026-11-10, och registerraden har båda som källor.

## Kontroller
- Torrkörning mot main-kopian 1be6e12: uto 36, vaxholm 42, moja 35 och grinda 20 ersättningar ok, 0 fel. island-data.ts har inga syntaxfel efter
  inläggning av vaxholm och grinda.
- Citat (omk4c/skript/kolla_citat.py): 47 citat i de ändrade KÄLLA-raderna och registerraderna står ordagrant i källtexter lästa 2026-11-10. Det finns inga
  klockslag, och alla rader har 15 kolumner. grinda-0168:s fyra äldre källor (lästa 2026-11-09) är inte lästa igen; läst-kolumnen anger båda datumen.
