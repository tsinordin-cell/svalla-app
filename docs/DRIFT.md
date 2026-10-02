# Drift och kostnader

Sammanställt 2026-10-02 av Claude ur koden (env-variabler, vercel.json, GitHub Actions). Exitplanen, Drift & rutiner: en köpare ska kunna se vad som håller sajten uppe och vad det kostar, utan att fråga Max eller Thomas.

**Kostnader är inte ifyllda.** Jag har ingen åtkomst till fakturorna och gissar inte. Fyll i kolumnen från respektive faktura, med månad, och skriv vem som äger kontot.

`DEPLOY.md` beskriver en äldre uppsättning med Netlify. Produktionen körs på Vercel (`vercel.json`, region `arn1` Stockholm).

## Tjänster

| Tjänst | Vad den gör hos oss | Env-variabler | Kontoägare | Kostnad per månad |
|---|---|---|---|---|
| Vercel | Bygger och serverar svalla.se, kör cron | sätts i Vercel | | |
| Supabase | Databas, inloggning, bildlagring | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | | |
| Resend | Skickar all e-post (välkomstmejl, nyhetsbrev, flöden) | `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_REPLY_TO`, `EMAIL_AUTOMATIK` | | |
| Anthropic | Thorkel (`/api/guide`) och tursammanfattning (`/api/trip-summary`), modell `claude-haiku-4-5-20251001` | `ANTHROPIC_API_KEY` | | |
| Google Places och Maps | Platsfoton och platsdata | `GOOGLE_PLACES_API_KEY`, `GOOGLE_MAPS_API_KEY` | | |
| Google Indexing API | Anmäler nya sidor till Google | `GOOGLE_INDEXING_SA_JSON` | | |
| IndexNow | Anmäler nya sidor till Bing m.fl. | `INDEXNOW_KEY` | | |
| Trafiklab (ResRobot) | Kommande båtavgångar på `/farjor` | `TRAFIKLAB_RESROBOT_KEY`, `TRAFIKLAB_API_KEY` | | |
| Upstash Redis | Begränsar antal anrop per besökare (`src/lib/rateLimit.ts`) | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | | |
| PostHog | Besöksstatistik och händelser (vidareklick, anmälningar) | `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` | | |
| Sentry | Felrapporter från sajten | `NEXT_PUBLIC_SENTRY_DSN` | | |
| Stripe | Betalning för Pro och partner. Pro är avstängt (`NEXT_PUBLIC_PRO_ENABLED`) | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_*` | | |
| Webbpush (VAPID) | Pushnotiser | `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` | | ingen tjänst |
| GitHub | Koden, tester (vitest) och veckopushen | `CRON_SECRET` som secret | | |
| Domän svalla.se | | | | |
| Google Workspace | max@svalla.se, delad Drive | | | |
| App Store och Google Play | Appen `se.svalla.app` (Capacitor) | | | |

## Schemalagda jobb

| Jobb | När | Var |
|---|---|---|
| `/api/email/cron` | varje dag 09.00 UTC | `vercel.json` |
| `/api/notifications/social-visits` | varje dag 18.00 UTC | `vercel.json` |
| `/api/push/weekly-digest` | måndagar 09.00 UTC | `.github/workflows/weekly-digest 2.yml` |
| Tester `vitest` | varje PR | `.github/workflows/tests.yml` |
| Databaslint | | `.github/workflows/db-lint.yml` |

E-postcronen skickar säsongsmejl 1 april och 1 oktober och väderutskick torsdagar maj till september. Flödena i `floden.ts` skickar bara om flödets namn står i `EMAIL_AUTOMATIK`.

## Hemligheter som bara vi har

`CRON_SECRET` (skyddar cron och nyhetsbrevsutskicket), `BACKFILL_SECRET`, `ADMIN_PASSWORD`, `SUPABASE_SERVICE_ROLE_KEY`. Ska ligga i en delad lösenordshanterare, inte i någons huvud. Skriv här var de ligger: 

## Rutiner som redan finns

- Backup och återställning av databasen: `docs/RUNBOOK_BACKUP_RESTORE.md` (inte testkörd enligt dokumentet).
- Service role-granskning: `docs/SERVICE_ROLE_AUDIT.md`.
- Arbetsregler: `docs/ARBETSREGLER.md`.

## Att fylla i

1. Kostnad per tjänst från senaste fakturan, och vilken plan (gratis eller betald).
2. Kontoägare per tjänst. En köpare behöver kunna ta över varje konto.
3. Var hemligheterna ligger.
4. Domänregistrar och förnyelsedatum för svalla.se.
