# Husarö – till Tom (batch 01, Granskaren 2026-11-02)

Två punkter. Inget mejl till verksamheter behövs: allt som ändras är belagt.

## 1. radiusKm för Husarö (förtydligande 3, husaro-0015)

- I dag: `radiusKm: 2.0` i `src/lib/islandCoords.ts:42`. Värdet styr både vilka databasplatser som räknas som "på Husarö" och GPS-besöken i appen.
- Uppmätt 2026-11-02: hela ön ryms inom 1,32 km från nålen (59.5064, 18.8475). Mätt med haversine mot alla punkter i öns ytterlinjer i OpenStreetMaps API, relation 11665504 (https://api.openstreetmap.org/api/0.6/relation/11665504/full).
- Med 2,0 km kommer också Särsös brygga med (1,66 km söderut). Där finns inga databasplatser i dag, men en båt vid Särsö kan räknas som ett besök på Husarö.
- Förslag: 1,5 km. Det täcker hela ön med marginal och utesluter Särsö. Finnhamns platser ligger 2,88–3,29 km bort och påverkas inte.
- Inte ändrat i husaro.edits.json.

## 2. Regionetiketten "Mellersta skärgården" (förtydligande 6, husaro-0002–0003)

Etiketten är inte ändrad. Ingen tillåten källa placerar Husarö själv i mellersta skärgården:
- husaro.se: "Husarö hittar du där den norra ytterskärgården öppnar sig"
- Österåkers kommun: "Långt ut i Österåkers yttersta skärgård hittar du Husarö."
- Skärgårdsstiftelsen säger "i mellanskärgården" om grannön Finnhamn, som ligger 2,9 km bort.

Taggen "ytterskärgård" (husaro-N002, Österåkers kommun) ersätter "orört". Med den hamnar Husarö i kategorin Avskilda skärgårdsöar (`oar-categories.ts`).
