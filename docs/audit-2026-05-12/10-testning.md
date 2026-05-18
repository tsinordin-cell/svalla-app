# Dimension 10 — Testning

## Status: Partiell täckning
9 Vitest-filer täcker lib-lager. 0 integrationstester. 0 E2E-tester.

## [P1] Kritisk affärslogik utan test: Stripe-betalningsflöde
**Fil:** `src/app/api/stripe/webhook/route.ts`, `src/app/api/stripe/checkout/route.ts`
**Beskrivning:** Betalning är den enda monetiserade funktionen. Ingen test för webhook-hantering, idempotency eller partner-checkout-flöde. En regression här kostar direkt intäkt.
**Åtgärd:** Minst ett mock-test för `POST /api/stripe/webhook` med `payment_intent.succeeded`-event.

## [P1] Push-notification-pipeline utan test
**Fil:** `src/app/api/push/weekly-digest/route.ts`, `src/app/api/push/dag-launch/route.ts`
**Beskrivning:** Cron-jobben kör utan testskydd. En bugg i `weekly-digest` kan spamma eller tystna hela prenumerantbasen innan man märker det.

## [P2] `src/lib/trafiklab.ts` — extern-API-integration utan test
**Fil:** `src/lib/trafiklab.ts`
**Beskrivning:** Trafiklab-parsningen (`rtTime`, `cancelled`, `numF`-splitting) saknar test. Fältnamn i ResRobot v2.1-svaret har ändrats förut och kan ändras igen — ett enhetstest med fixture-svar fångar detta direkt.

## [P2] Vitest-svit kör men inte i CI
**Fil:** `package.json:{"test":"vitest run src/lib"}`
**Beskrivning:** `npm test` kör 9 testfiler men det är oklart om detta körs i Vercel build-pipeline eller GitHub Actions. Om inte körs testerna aldrig automatiskt.
**Befintliga testfiler (alla OK — passerar lokalt per tidigare session):**
- `src/lib/gpx.test.ts` (165 rader)
- `src/lib/utils.test.ts` (139 rader)
- `src/lib/planner.test.ts` (178 rader)
- `src/lib/kalman.test.ts` (97 rader)
- `src/lib/insights.test.ts`
- `src/lib/gps.test.ts`
- `src/lib/coordValidation.test.ts`
- `src/lib/achievements.test.ts`
- `src/lib/routeSmooth.test.ts`

## [P3] Inga snapshot-tester för kritiska UI-komponenter
**Beskrivning:** `TripCard`, `Nav`, `FeedCard` renderas utan test. En oavsiktlig CSS-ändring eller prop-rename syns inte förrän i produktion.

## [P3] Ingen Playwright/Cypress E2E-svit
**Beskrivning:** Gyllene väg (registrera → spara tur → visa på feed) testas inte automatiskt. Givet att Tom är solodev är detta rimligt att skjuta upp, men en minimal smoke-test (login + feed render) är högt ROI.
