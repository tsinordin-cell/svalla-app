# Slutrapport

**Status:** KLAR
**Total tid:** ~75 min (inkl. Node v25 paus + omstart)
**Total fixar:** 9
**Total commits (mina):** 8 + 1 logg
**Bundle före/efter:** N/A — `next build` blockerat av Node v25 / Next 15.3.6
**Build-tid:** N/A
**TypeScript:** PASS (0 errors före och efter)
**Lint:** N/A — ESLint inte konfigurerat
**Tester:** Vitest också blockerat av Node v25

## Vad som blev bättre

### Pass 2 — Runtime
- `admin/moderation/page.tsx`: onClick + window.open i SERVER-komponent
  (kraschar runtime). Trasig href-template `/u/[se_target_id]`. Bytt
  till ren `<a>`.
- `components/InstallPrompt.tsx`: timer-cleanup returnerades från
  event-handlern istället för useEffect — clearTimeout kördes aldrig.
  Timern överlevde unmount och kunde sätta state på död komponent.

### Pass 3 — Dead code (587 rader bort)
- `components/ProBadge.tsx` — oanvänd
- `components/ShareButton.tsx` — oanvänd
- `components/RestaurantMap.tsx` — oanvänd
- `components/RestaurantMapClient.tsx` — oanvänd wrapper
- `components/ui/IconButton.tsx` — oanvänd
- `lib/tracker.ts` — duplikat av `lib/gps.ts` (GpsPoint-typen exporteras
  båda ställen, men bara `lib/gps` används)
- `lib/map-tiles.ts` — exporterar tile-helpers ingen importerar

### Pass 4 — Performance
- `lib/dm.ts countUnreadMessages`: N+1 sequential count-queries
  parallelliserade via Promise.all. Påverkar olästa-bjällran på
  varje sidladdning för användare med flera konversationer.

### Pass 5 — Polish
- `app/i/[code]/page.tsx`: lade till metadata + OG-tags + robots:noindex.
  Inbjudningslänkar fick tidigare bara fallback-titeln från root layout
  vid delning i Slack/iMessage.
- `app/meddelanden/[id]/page.tsx`: två externa länkar saknade `noopener`
  — minor reverse tabnabbing-yta.

## Sidor som polerades
- `/admin/moderation` — fix
- `/i/[code]` — metadata
- `/meddelanden/[id]` — säkerhet

## Skippade items (kräver Tom's beslut)

- **Node v25 + Next 15.3.6**: `next build` och `npm test` kraschar
  båda pga `next/dist/compiled/string_decoder` saknar `package.json`.
  TypeScript är ren. Lösningar:
  1. `nvm use 22` (säkrast, ingen kodändring)
  2. Uppgradera Next till 15.4+
  3. patch-package
  4. `.nvmrc` med "22"
- **ESLint inte konfigurerat**: `next lint` finns i package.json men
  ingen `.eslintrc.*` eller `eslint.config.*`. Vill du att jag
  konfigurerar Strict-läget?
- **`<img>` istället för `<Image>`** i 6 platser (avatarer, previews):
  alla är blob:/object URLs där Next/Image inte fungerar. Inte ett bug.
- **`countUnreadMessages` har en SQL-baserad ompackning** som vore
  ännu snabbare än `Promise.all` — kräver Supabase-RPC, så utanför
  scope.

## Rekommenderade nästa steg

1. **Fixa Node-versionen** så att build/test fungerar igen — annars
   missar du klassen av buggar bara CI-pipelinen kan fånga.
2. **Konfigurera ESLint Strict** — du kommer hitta fler döda imports
   och saknade hook-deps som tsc inte ser.
3. **Bundle-analys när build går igen** — Pass 4 kunde inte göras
   ordentligt. Sannolika kandidater: Leaflet-bundle på sidor som
   inte behöver karta, Sentry-init för stora.

---

## Pass-loggar

### Pass 1 — Build & TypeScript-fel
- Hittade: 1 (miljö, inte kod)
- Fixade: 0 (Tom väljer fix; tsc clean)
- Skippade: 1 (Node v25 + Next 15.3.6 string_decoder)
- Commits: 577bd11
- TypeScript: PASS (0 errors)
- Build: FAIL (miljö)

### Pass 2 — Runtime-buggar
- Hittade: 2
- Fixade: 2
- Commits: 60b11cf, ef7f85a

### Pass 3 — Dead code
- Hittade: 7 oanvända filer
- Fixade: 7 (587 rader bort)
- Commits: 3fc0848, ab46f96, 099fb77

### Pass 4 — Performance & bundle
- Hittade: 1 N+1-loop
- Fixade: 1 (parallellisering)
- Skippade: bundle-analys (build trasig)
- Commits: deb2f8c

### Pass 5 — Polish per sida
- Hittade: 2 (saknad metadata, missande noopener)
- Fixade: 2
- Commits: c6d3be1, 6ce432d

### Pass 6 — Verifiering
- TypeScript: PASS (0 errors)
- Lint: N/A
- Tester: blockerade av Node v25

---

## Tidigare paus-anteckning (för kontext)

Pass 1 blockerades initialt av miljö-buggen. Efter Tom's "kör alla
pass utan att pausa" fortsatte jag med pass 2–6 baserat på enbart
tsc + statisk kod-analys. Allt i listan ovan är verifierat genom
TypeScript och kodgranskning. Build-verifiering kräver Node-fix.
