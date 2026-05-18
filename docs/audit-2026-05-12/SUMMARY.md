# Audit-sammanfattning — 2026-05-12

**Scope:** 10 dimensioner, ~73 API-routes, ~200 komponenter/sidor, 15 migrationer
**Verktyg:** TypeScript strict (0 fel), npm audit (3 vulns), statisk grep-analys

---

## Top-15 åtgärder (prioritetsordning)

### STOP THE BLEEDING — fixa denna vecka

| # | Prio | Åtgärd | Fil | Dimension |
|---|------|---------|-----|-----------|
| 1 | **P0** | Timezone-bug: `new Date().setHours(0,0,0,0)` jämförs mot UTC-strängar — meddelanden visas som "igår" i Sverige sommartid | `src/app/meddelanden/[id]/page.tsx:43-45` | Buggar |
| 2 | **P1** | Soft-delete filter saknas: soft-deleted turer syns i topplista och sökning | `src/app/topplista/page.tsx:33`, `src/app/sok/page.tsx:111` | Säkerhet |
| 3 | **P1** | MIME magic-byte-validering saknas på profilbild, check-in och manuell logg — Content-Type-spoofing möjlig | `src/app/profil/page.tsx:138`, `src/app/check-in/page.tsx:66`, `src/app/logga/manuell/page.tsx:236` | Säkerhet |
| 4 | **P1** | Saknar index på `restaurants(slug)` — alla slug-lookups är full table scan | Migration saknas | Performance |
| 5 | **P1** | Stripe webhook utan Sentry-wrapping — betalningshändelser tappas tyst vid fel | `src/app/api/stripe/webhook/route.ts` | Error Handling |
| 6 | **P1** | Push-cron utan Sentry-wrapping — `weekly-digest` och `dag-launch` kan fela tyst | `src/app/api/push/weekly-digest/route.ts`, `dag-launch/route.ts` | Error Handling |

### FIXA NÄSTA SPRINT

| # | Prio | Åtgärd | Fil | Dimension |
|---|------|---------|-----|-----------|
| 7 | **P1** | `generateMetadata` saknas på `/platser/[id]` — platsnamn indexeras inte av Google | `src/app/platser/[id]/page.tsx` | SEO |
| 8 | **P1** | Forum triggers saknar exception handling — en crash i trigger kan rulla tillbaka hela forum-INSERT | `supabase/migrations/20260502000007_migration-forum.sql:55-95` | Databas |
| 9 | **P1** | Non-idempotent `CREATE POLICY` i 3 migrationer — `supabase db push` kraschar vid re-run | Se `04-databas.md` | Databas |
| 10 | **P1** | Optimistisk like-knapp race condition — dubbel-klick kan ge `liked: true` med `count` oförändrat | `src/components/forum/ForumLikeButton.tsx:28-42` | Buggar |
| 11 | **P1** | GPS hastighetstak inkonsekvent: 30 knop i validering men 45 knop i Kalman-filter | `src/app/spara/page.tsx:387-392,341` | Buggar |
| 12 | **P1** | Sitemap inkluderar inte 163+ platssidor — de är osynliga för Google | `src/app/sitemap.ts` | SEO |

### PLANERA IN

| # | Prio | Åtgärd | Fil | Dimension |
|---|------|---------|-----|-----------|
| 13 | **P2** | `SELECT *` på 4 ställen inkl. `place_photos` i hot-path | Se `03-performance.md` | Performance |
| 14 | **P2** | macOS-duplikat och `.fuse_hidden`-filer i git | `src/components/LastBoatPanel 2.tsx` | Kodrensning |
| 15 | **P2** | Google Photo proxy saknar `AbortSignal.timeout` — hänger vid Google-instabilitet | `src/app/api/places/photo/[ref]/route.ts` | Extern-API |

---

## npm-sårbarheter (3 st, `npm audit`)

| Paket | CVSS | Typ |
|---|---|---|
| Next.js middleware | Hög | Autentiserings-bypass via malformad URL |
| postcss | Måttlig | ReDoS / XSS vid malformad CSS |

**Åtgärd:** `npm audit fix` (icke-breaking). Kör och committa.

---

## Statistik

| Dimension | P0 | P1 | P2 | P3 |
|-----------|----|----|----|----|
| Säkerhet | 0 | 2 | 1 | 2 |
| Buggar | 1 | 4 | 1 | 0 |
| Performance | 1 | 2 | 2 | 0 |
| Databas | 0 | 3 | 1 | 1 |
| Kodrensning | 0 | 2 | 3 | 1 |
| Error Handling | 0 | 2 | 2 | 1 |
| Extern-API | 0 | 1 | 2 | 2 |
| Mobile | 0 | 0 | 2 | 3 |
| SEO | 0 | 2 | 2 | 2 |
| Testning | 0 | 2 | 2 | 2 |
| **Totalt** | **2** | **20** | **18** | **14** |
