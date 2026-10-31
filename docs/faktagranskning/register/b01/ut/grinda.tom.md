# Grinda – till Tom (faktagranskning batch 01, Granskare/Skribent 2026-10-29/31)

## 1. Platsradie (ändring av radiusKm föreslås inte – förslag platsRadieKm)
- **MÄTT 2026-10-29 i OpenStreetMap (relation 2663146, ön Grinda):** nålen 59.4109, 18.5618 ligger
  på ön; längsta avstånd från nålen till öns strandlinje är 1 319 m (polygonens 3 888 punkter,
  haversine). Dagens `radiusKm: 2.5` når Viggsö brygga (1,5 km) och Ljusterös strand (1,7 km).
- **Förslag:** `platsRadieKm: 1.4` för Grinda (ryms hela ön, inga grannöar). GPS-radien
  `radiusKm` rörs inte i edits.json (förtydligande 3).

## 2. OCT-Entreprenad: var företaget har sin bas (grinda-0295)
- Företagets webbplats (oct-entreprenad.com, kontakt- och om oss-sidan lästa 2026-10-29) anger
  ingen ort eller adress, bara "Din byggfirma i Stockholms skärgård" och org.nr 556955-5856.
- Bolagsverkets företagssida (foretagsinfo.bolagsverket.se, org.nr 5569555856) gav ingen läsbar
  text i Chromium – **EJ NÅBAR från arbetsytan**. Om du öppnar den i din webbläsare och läser
  "Säte", kan `ort`/`bas` i hantverkare-data.ts sättas till kommunen med Bolagsverket som källa.
- Tills dess står den belagda generaliseringen i edits.json: `ort: 'Stockholms skärgård'`,
  `bas: 'Stockholms skärgård'` (kortet visar då "Baserade i Stockholms skärgård — kör hit med båt").

## 3. Mallfel som rör Grinda (döms i registret, ingen kodändring i edits.json – tas centralt)
- JSON-LD `validFrom 2026-05-01` / `validThrough 2026-10-31` (page.tsx:246–247) är fel för Grinda:
  båt och sjömack året om (grinda-0024, 0025).
- `isAccessibleForFree: true` (page.tsx:203) är obelagt (grinda-0019).
- `activity_meta.kajak.difficulty` kan inte lämnas tomt; /aktivitet/kajak visar Lätt/Medel/Svår
  (grinda-0504, samma som Möja).
- Källistan märker Waxholmsbolaget som MYNDIGHET; enligt DEL 5 är bolaget operatör (grinda-0397,
  0400, 0401).
- src/lib/ferries.ts `wxb-grinda`: season "Sommar (maj–sep)" och stoppen Ramsö, Vindö finns inte i
  tabell 11 (linjen går året om via Vaxholm, Lillsved, Viggsö) – Vakten (grinda-0089). Samma
  obelagda formuleringar i src/data/guider.ts:67, 368, 402, 479 ("buss 434 till Stavsnäs" är fel
  väg till Grinda; bussarna är 437 Lillsved och 438 Boda).

## 4. Inga mejl behövs
Alla sakuppgifter kunde beläggas eller generaliseras utan att fråga verksamheten.
