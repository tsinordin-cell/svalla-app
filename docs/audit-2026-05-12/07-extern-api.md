# Dimension 7 — Extern-API Kostnad & Robusthet

## [P1] Google Places Photo proxy saknar timeout
**Fil:** `src/app/api/places/photo/[ref]/route.ts`
**Beskrivning:** Ingen `AbortSignal.timeout()` på Google-fetchen. Om Google's CDN svarar långsamt blockeras Vercel Function (max 30s wall-clock), och parallella requests köar bakom. Trafiklab-proxy har korrekt `AbortSignal.timeout(8000)` — Google-proxyn bör ha samma.
**Risk:** DoS-effekt om 10+ användare laddar bildkarusell simultant under Google-instabilitet.
**Åtgärd:** `signal: AbortSignal.timeout(10_000)` på `fetch(googleUrl, ...)`.

## [P1] Trafiklab — ingen retry vid `503 Service Unavailable`
**Fil:** `src/lib/trafiklab.ts`
**Beskrivning:** Timeout är korrekt satt (8s via AbortSignal) men ett `503`-svar från ResRobot orsakar omedelbart `null`-return utan retry. ResRobot är känd för kortvariga 503:or under rusningstrafik.
**Åtgärd:** Enkel 1-retry med 1s delay för 5xx-svar.

## [P2] Google Places enrichment utan kostnadsspårning
**Fil:** `src/app/api/admin/enrich-places/route.ts`
**Beskrivning:** Admin-endpointen anropar Google Places API utan loggning av hur många Place Details-anrop som görs. Vid ett misstag (loop, felaktig batch-size) kan månadsbudgeten förbrukas omgående.
**Åtgärd:** Logga antal anrop per körning till `logger.info` och sätt en hårdkodad max (t.ex. 50 platser per request).

## [P2] Resend e-mail utan retry vid tillfälliga fel
**Fil:** `src/app/api/subscribe/route.ts` (indirekt via Resend SDK)
**Beskrivning:** Resend SDK kastar exception vid nätverksproblem. Ingen retry-logik finns. Prenumerationsbekräftelse tappas tyst — användaren tror de prenumererat men mailet skickades aldrig.
**Åtgärd:** try/catch med ett loggat fallback (Sentry + logger.error), eventuellt en Supabase-queue-pattern för retry.

## [P3] `robots.ts` korrekt konfigurerad
**Fil:** `src/app/robots.ts`
**Beskrivning:** Verifierat OK. `robots.ts` finns och exporterar korrekt `MetadataRoute.Robots` med `disallow: ['/admin', '/api']`. Inga problem.

## [P3] Stripe webhook utan idempotency-check
**Fil:** `src/app/api/stripe/webhook/route.ts`
**Beskrivning:** Stripe kan leverera samma webhook-event flera gånger (retry vid 5xx). Om databasen inte är skyddad mot dubbelprocessering kan en betalning krediteras dubbelt.
**Åtgärd:** Kontrollera om event-ID redan processats: `SELECT 1 FROM processed_stripe_events WHERE event_id = $1` — eller lägg till unique constraint på event_id i en events-log-tabell.
