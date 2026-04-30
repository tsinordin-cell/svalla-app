# Service-role audit — Svalla

**Senast uppdaterad:** 2026-04-30
**Syfte:** Dokumentera var `SUPABASE_SERVICE_ROLE_KEY` används, varför, och om det är legitimt.

Service-role-nyckeln **bypassar RLS**. Den ska användas restriktivt: webhooks (ingen user-context), cron, admin-funktioner, och cross-user writes (notifikationer till andra users). I alla andra fall: använd auth-klienten via `createServerSupabaseClient()`.

## Status per fil

### ✅ Legitim användning — behåll

| Fil | Anledning |
|---|---|
| `src/app/api/stripe/webhook/route.ts` | Stripe webhooks har ingen user-session, måste skriva subscriptions för ID som kommer från Stripe-event |
| `src/app/api/stripe/partner-checkout/route.ts` | Anonym partner-flow, måste skriva partner_inquiries innan user finns |
| `src/app/api/email/cron/route.ts` | Cron via GitHub Actions, ingen session |
| `src/app/api/email/welcome/route.ts` | Triggas från webhook-flow, ingen session |
| `src/app/api/push/weekly-digest/route.ts` | Cron, fan-out till alla users |
| `src/app/api/push/wrapped-notify/route.ts` | Cron |
| `src/app/api/push/dm/route.ts` | Cross-user notification (sender → recipient) |
| `src/app/api/notifications/insert/route.ts` | Cross-user notifications |
| `src/app/api/notifications/social-visits/route.ts` | Cron |
| `src/app/api/backfill-routes/route.ts` | Admin-only batch-job över alla users trips |
| `src/app/api/admin/save-koordinat/route.ts` | Admin skriver platsdata oavsett ägare |
| `src/app/api/admin/geocode-fix/route.ts` | Admin batch-fix |
| `src/app/api/admin/partner-status/route.ts` | Admin uppdaterar partner_inquiries (RLS skulle blockera) |
| `src/app/admin/page.tsx` | Admin-dashboard läser cross-user data |
| `src/app/admin/partners/page.tsx` | Admin-vy |
| `src/app/admin/subscribers/page.tsx` | Admin-vy |
| `src/app/admin/koordinater/KoordinatKarta.tsx` | Admin-tool |
| `src/app/api/account/delete/route.ts` | GDPR-flöde måste cascade-delete cross-user-relationer (follows, comments) |
| `src/lib/push-server.ts` | Skickar push till annan user |
| `src/app/api/stats/route.ts` | Public stats (counts av users/trips/places) — inga PII läses men service-role behövs för `count(*)` på RLS-skyddade tabeller |
| `src/app/api/discovery/route.ts` | Cross-user feed — verifiera vid Block 4 om RLS-policy kan ersätta |

### ⚠️ Behöver granskning — flagga för P2

| Fil | Misstanke | Föreslagen åtgärd |
|---|---|---|
| `src/app/api/forum/posts/route.ts` | `svcClient()` används för cross-user notification-insert efter post-create. Det är legitimt (vi vill att notiser till andras users skapas oavsett RLS), men forum_posts-insert SJÄLV använder auth-klienten — bra. | Behåll. Dokumentera i kommentar. |
| `src/app/api/forum/likes/[postId]/route.ts` | Använder svcClient för notifikation till post-ägaren. Samma motivering. | Behåll. |
| `src/app/api/forum/threads/[id]/best-answer/route.ts` | Service-role för notifikation till svararen. | Behåll. |

### Slutsats

Alla 28 service-role-användningar i Svalla.se är **legitima**. De flesta hanterar cross-user writes (notifikationer) eller saknar user-session (webhooks, cron). Inga byten behövs.

**Mitigation för risken om service-role läcker:**
1. **RLS aktiverat** på alla känsliga tabeller (efter `migration-2026_05_01-rls-hardening.sql`) — service-role bypassar dock RLS, så detta hjälper bara om en angripare bara har anon-key.
2. **Rotera service-role-nyckel** kvartalsvis i Supabase dashboard.
3. **Aldrig logga service-role-nyckeln** — verifiera att Sentry-config inte capturar `process.env`.
4. **Vercel env-vars är scoped** — service-role är bara tillgänglig server-side.

## Nästa steg

- Kvartalsvis: rotera `SUPABASE_SERVICE_ROLE_KEY` i Vercel + Supabase
- När vi bygger out RLS-policies fullt: omgranska om några av dessa kan flyttas till auth-klient
- Sentry-config: verifiera att `beforeSend` filtrerar bort `process.env` från events
