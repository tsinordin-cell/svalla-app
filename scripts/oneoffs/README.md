# Engångs-scripts

Dessa scripts har körts mot live-DB:n och behövs inte längre i den löpande
utvecklingen. De ligger kvar för historik / referens — om vi behöver göra
liknande operationer igen kan de återanvändas som mall.

**Kör inte dessa igen utan att först läsa innehållet.** Vissa raderar
data, vissa skriver till restaurants-tabellen, etc.

## Boende-import (maj 2026)

- `seed-accommodations.mjs` — seedade 55 boenden från PDF
- `dedupe-accommodations.mjs` — slog ihop boende-dubletter med restauranger
- `finalize-accommodations.mjs` — hand-curated mapping för obskyra boenden
- `_merge-grinda.mjs` — engångs-merge för Grinda Wärdshus

## Hamn-koordinater (maj 2026)

- `verify-departures.mjs` — verifierade alla DEPARTURES mot Google
- `correct-departures.mjs` — visade vilka som behövde korrigering
- `apply-departure-corrections.mjs` — skrev korrigerade koord till planner-client.ts

## Status-checker (utveckling)

- `check-acc-status.mjs` — räknade boenden med/utan Google-data
- `check-places-status.mjs` — räknade alla platser med Google-data
- `coord-update-stats.mjs` — räknade hur många koord backfill uppdaterat
- `find-duplicates.mjs` — letade fysiska dubletter
- `list-missing-places.mjs` — listade platser utan Google-id
- `_check.mjs` — quick-check för Sandhamn-platser
- `_find-tullinge.mjs` — hittade Tullinge båtklubb-koord
- `_find-boende.mjs` — listade exempel-boenden för UI-test
