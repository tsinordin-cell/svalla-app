# Dimension 6 — Error Handling & Observabilitet

## [P1] 73 API-routes utan Sentry-wrapping
**Sökning:** `find src/app/api -name "route.ts" | xargs grep -L "withSentry"` → 64 av 73 routes saknar wrapping
**Beskrivning:** Okontrollerade fel i dessa routes loggas aldrig till Sentry — de uppstår tyst och syns bara i Vercel Function Logs med kort retention. Kritiska routes att prioritera:

| Route | Risk |
|---|---|
| `src/app/api/stripe/webhook/route.ts` | Betalningshändelser tappas tyst |
| `src/app/api/stripe/checkout/route.ts` | Checkout-fel osynliga |
| `src/app/api/push/weekly-digest/route.ts` | Cron-jobb utan alerting |
| `src/app/api/push/dag-launch/route.ts` | Cron-jobb utan alerting |
| `src/app/api/transit/departures/route.ts` | Extern-API-fel syns inte |
| `src/app/api/subscribe/route.ts` | Prenumerationsfel tappas |

**Åtgärd:** Prioritera Stripe-webhooks (P1) och push-cron (P1) — dessa är tids- och pengakritiska.

## [P1] `console.warn` i API-lager istället för `logger`
**Fil:** `src/app/api/forum/threads/[id]/save/route.ts:69`
**Kod:** `console.warn('[loppis-save] notification failed:', e)`
**Åtgärd:** Ersätt med `logger.warn('loppis-save', 'notification failed', { error: e.message })`

## [P2] Saknat globalt `error.tsx` för admin-sektionen
**Sökning:** `find src/app/admin -name "error.tsx"` → 0 träffar
**Beskrivning:** `src/app/admin/` har 8+ sidor men saknar `error.tsx`. Om en admin-sida kastar undantag visas Next.js generiska felgränssnitt utan branding eller felrapportering.
**Åtgärd:** Skapa `src/app/admin/error.tsx` med `useEffect(() => Sentry.captureException(error), [error])`.

## [P2] Saknat globalt `not-found.tsx` för platssidor
**Sökning:** `find src/app/platser -name "not-found.tsx"` → 0 träffar
**Beskrivning:** `src/app/platser/[id]/page.tsx` returnerar `notFound()` men det finns ingen `not-found.tsx` i den segmentet — Next.js faller tillbaka till global `not-found.tsx` vilket kan ge en generisk 404 utan kontextuell länk tillbaka till platslistan.

## [P3] AbortSignal.timeout saknas i Google Places photo proxy
**Fil:** `src/app/api/places/photo/[ref]/route.ts`
**Beskrivning:** Proxyn fetchear från Google utan timeout. Om Google svarar långsamt hänger Vercel Function (max 30s) upp, vilket blockerar alla parallella requests till samma route.
**Åtgärd:** Lägg till `signal: AbortSignal.timeout(10_000)` på Google-fetch-anropet.
