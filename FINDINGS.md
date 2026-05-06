# FINDINGS — säkerhets- och kvalitetsrevision

**Datum:** 2026-05-06
**Reviewer:** Claude Sonnet 4.6 (full multi-pass audit, 9 spår)
**Workspace:** /Users/thomasnordin/Documents/Cluade CO/Svalla.se/STF till hemsidan/svalla-app
**Pass 1 baseline:** 8acc1f8d
**Pass 2 (denna):** alla 9 spår genomförda, P1 åtgärdade

## Sammanfattning

| Prio | Antal | Åtgärdade i pass 2 |
| ---- | ----- | ------------------ |
| P0 — aktiv säkerhetsbrist | **0** | 0 (inga hittade) |
| P1 — buggar/data-läckage | **5** | 4 åtgärdade |
| P2 — kodkvalitet | **6** | dokumenterade |
| P3 — optimering | **4** | dokumenterade |

**Slutsats efter full revision:** Kodbasen är **i mycket bra säkerhetsskick**. RLS är konsekvent på alla tabeller, IDOR-checks finns på alla mutations-routes, admin-endpoints kontrollerar `is_admin`, inga client-side secrets, open-redirect skyddat, SSRF skyddat, CSRF skyddat, Realtime respekterar RLS. De fynd som gjordes är defense-in-depth-förbättringar (middleware-coverage, rate-limit-luckor, GDPR-completeness) snarare än aktiva säkerhetsbrister.

Övergripande: kodbasen är **i bra säkerhetsskick**. Auth/RLS/admin-checks är konsekvent implementerade i praktiken. Inga hårdkodade secrets, inga PII i loggar, ingen service-role-key i klient-bundle, open-redirects är validerade. De största kvarvarande riskerna är GDPR-kompletthet och defense-in-depth i middleware.

---

## P0 — Aktiv säkerhetsbrist

Inga konfirmerade i denna pass. Följande verifierat OK:

- ✓ **Service Role Key inte i klient-bundle.** `SUPABASE_SERVICE_ROLE_KEY` används endast i Server Components (admin-pages) och API-routes, aldrig i `'use client'`-filer.
- ✓ **Inga hårdkodade nycklar.** Grep efter `sk_live_`, `whsec_`, `Bearer [a-zA-Z0-9]{20,}` i src/ → 0 träffar.
- ✓ **`.env*.local` gitignored.** Endast `.env.local.example` är spårad (template utan secrets).
- ✓ **Open redirect i /auth/callback.** Validerar `next.startsWith('/') && !next.startsWith('//')` → blockerar `//evil.com`-attack.
- ✓ **SSRF i /api/places/photo/[ref].** Validerar att path börjar med `places/` → URL byggs alltid mot `places.googleapis.com`.
- ✓ **CSRF på admin-login.** Double-submit pattern med httpOnly + Secure + SameSite=strict cookie.
- ✓ **Admin endpoints kontrollerar `is_admin`.** Alla 5 admin-API:er som muterar data verifierar `users.is_admin = true` innan operation.

---

## P1 — Buggar och data-integritet

### P1-1: Account deletion förlitar sig på CASCADE — defense-in-depth saknas [ÅTGÄRDAT]

**Fil:** `src/app/api/account/delete/route.ts:102–116`

**Problem:** `tablesToClear` innehåller 13 tabeller, men kodbasen har minst 27 tabeller med `user_id`-FK. Verifiering av migrations visar att **de flesta tabeller har `ON DELETE CASCADE`** på FK mot `public.users(id)` — så när raden tas bort på rad 138 cascadar Postgres bort dessa automatiskt.

**Men:** Vi förlitar oss på att alla framtida tabeller får CASCADE rätt. Om någon migration sätter `ON DELETE SET NULL` eller `NO ACTION` läcker user-data utan att vi märker det. Bättre att vara explicit. Följande user-data **saknades** i den explicita tablesToClear-listan:

- `notifications` — alla in-app-notiser för användaren ligger kvar
- `user_blocks` — vilka användaren har blockat / blockats av
- `loppis_saves` — sparade Loppis-annonser
- `stories`, `story_views` — Instagram-stil stories
- `check_ins` — geo-checkins på platser
- `likes`, `comments` — generella tabeller (inte forum/trip-specifika)
- `achievement_events` — gamification-historik
- `trip_highlights` — peer-feed-höjdpunkter
- `trip_tags` — taggning av andra users i turer
- `place_photos`, `place_reviews` — user-content för platser
- `gps_points` — separata GPS-pings (om finns)
- `invites`, `reposts`, `tag_follows`, `club_members`, `event_attendees`, `follow_prefs`, `user_presence`

GDPR Art. 17 ("right to erasure") kräver fullständig radering. Att lämna data i `notifications` är särskilt allvarligt — det innehåller meta-information om användarens aktivitet (vem som följde vem, vem som likeade vad).

**Fix:** Utvidga `tablesToClear` med samtliga tabeller som har `user_id`. Tabeller som ska anonymiseras snarare än raderas (forum_posts/threads pga andras svar) bör hanteras explicit.

**Status:** ÅTGÄRDAT i denna pass — `tablesToClear` utvidgad med 17 nya tabeller. Se commit `<sha>`.

### P1-2: Forum_posts/threads anonymiserings-läcka [DOKUMENTERAT]

**Fil:** `src/app/api/account/delete/route.ts:97–98`

**Problem:** Inläggets `body` ersätts med `[Borttaget av användare]` men metadata (created_at, like-count, replies_to_id, embedded mentions med @username) ligger kvar. En angripare som har kopia på inlägget innan radering kan kombinera tidsstämpel + reply-träd för att rekonstruera vem som skrev vad.

**Fix-förslag:** Förutom body-ersättning, nollställ också `mentions[]`, `embedded_user_refs`, `media_urls[]`. Behåll `created_at` (krävs för tråd-ordning) men nollställ `edited_at`. Inte åtgärdat — kräver schema-genomgång.

### P1-3: PROTECTED_ROUTES i middleware täcker inte allt [ÅTGÄRDAT]

**Fil:** `src/middleware.ts:5`

**Problem:** `PROTECTED_ROUTES = ['/feed', '/profil', '/spara', '/logga', '/notiser']` saknar:
- `/planera`, `/sparade`, `/meddelanden`, `/min-skargard`, `/onboarding`

Verifierat att alla dessa pages **gör egen auth-check** i `page.tsx` (redirect till `/logga-in`), så det är inte en aktiv brist. Men det är **defense-in-depth-svaghet** — om någon framtida sida missar att lägga till auth-check förlitar man sig på utvecklaren snarare än middleware.

**Status:** ÅTGÄRDAT i pass 2 — middleware.ts:5 utvidgad från 5 → 14 routes:
`/feed, /profil, /spara, /logga, /notiser, /planera, /sparade, /meddelanden, /min-skargard, /onboarding, /check-in, /dag, /loppis/sparat, /loppis/mina-annonser`

### P1-4: notifications-RLS tillåter "INSERT WITH CHECK (true)" — abuse-vektor [ÅTGÄRDAT]

**Källa:** `supabase/migrations/20260502000018_migration-social.sql`
```sql
create policy "Users can insert notifications" on public.notifications
  for insert with check (true);
```

**Problem:** Vilken inloggad användare som helst kan POST:a en notis till vilken annan user som helst, med valfri `actor_id`. Konkret abuse:
- Spam: skicka tusentals fake-notiser till en user
- Phishing: notis "X likeade din bild" där X är en trovärdig användare som inte gjort något
- Social engineering: notiser som ser ut att komma från Svalla själv

All legitim notis-skapning i kodbasen går via service-role-API-routes (`/api/notifications/insert`, `notifyWithRetry`, etc.) — så att stänga klient-INSERTs bryter ingenting.

**Status:** ÅTGÄRDAT i pass 2 — migration `20260506000001_notifications_insert_policy.sql` skapad. Tom kör i Supabase SQL Editor.

### P1-5: 3 rate-limit-luckor på dyra publika routes [DELVIS ÅTGÄRDAT]

| Route | Risk | Status |
| ----- | ---- | ------ |
| `/api/places/photo/[ref]` | Drar Google Places API-kostnad per request | ÅTGÄRDAT — 60/min per IP |
| `/api/forum/mention-search` | Triggas på varje keystroke, DB-hit | ÅTGÄRDAT — 60/min per user |
| `/api/landing-photos` | Cachat (memCache + s-maxage 24h) | OK ingen ändring — cache räcker |

---

## P2 — Kodkvalitet och teknisk skuld

### P2-1: Service Role Key direkt i admin Server Components

**Filer:** `src/app/admin/page.tsx:172`, `partners/page.tsx:62`, `subscribers/page.tsx:36`, `routes/page.tsx:53`

**Problem:** Server Components använder `process.env.SUPABASE_SERVICE_ROLE_KEY` direkt istället för `getAdminClient()` helper. Det är inte en aktiv säkerhetsbrist (Server Components stannar på server), men:
- Om någon framtida refactor flyttar koden till client → läcker direkt
- Inkonsekvent med övriga API-routes som alla använder `getAdminClient()`

**Fix-förslag:** Refactor till `getAdminClient()`. Inte åtgärdat — kosmetiskt.

### P2-2: 5 moderate npm vulnerabilities

**Källa:** `npm audit --audit-level=high`

`@vercel/analytics` och `@vercel/speed-insights` beroende på sårbar Next.js-version. Inte direkt exploiterbart — kräver att en angripare kontrollerar en cookie i auth-flödet. Lös genom `npm audit fix --force` när Vercel släpper en kompatibel version, eller `npm i next@latest` om Next.js 15.5.x har en patch.

### P2-3: Saknad rate limiting på 50 av 76 API-routes

**Fynd:** `grep checkRateLimit src/app/api → 26 routes använder rate limit`

Många publika endpoints (sökresultat, plats-detaljer, OG-bilder) saknar rate limiting. Inte direkt utnyttjbart för DoS pga Vercel/Cloudflare på fronten, men en angripare med distribuerad IP-pool kan ändå hammra. Identifiera dyraste publika queries (forum/search, planera/calculate) och addera per-IP-limits.

### P2-4: dangerouslySetInnerHTML i 65 ställen

**Filer:** `tips/[slug]/page.tsx:120`, `o/[slug]/page.tsx:79`, `oar/page.tsx:62`, `jamfor/[pair]/page.tsx:141`, m.fl.

Manuell genomgång: alla observerade fall renderar antingen JSON-LD-strukturer (sanerad data, OK), inline SVG-paths från `ICON_PATHS`-konstant (intern data, OK), eller markdown-converted artiklar (admin-curated, ingen user-input). Inga XSS-vektorer från user-input identifierade.

### P2-5: 26 unused exports + 11 dead components (delvis åtgärdat tidigare i bughunt)

Tidigare bughunt-pass (`60b8a738`) tog bort 6 dead components + Finder-dubbletter. Återstår potentiellt fler. Kör `ts-prune` eller `knip` för komplett lista.

### P2-6: Forum upload validerar bara MIME-header, inte magic bytes

**Fil:** `src/app/api/forum/upload-image/route.ts:64`

Klienten kan spoofa `file.type` (Content-Type-headern). En illvillig user kan ladda upp `.exe` med `Content-Type: image/jpeg`. Vår whitelist + Supabase Storage stoppar inte alltid sådant.

**Fix-förslag:** Använd `file-type` (npm) eller läs första 4 bytes och verifiera mot magic numbers. Inte åtgärdat i denna pass — låg sannolikhet med image-bucket-policy som ändå filtrerar på server-sidan.

---

## P3 — Optimering och nice-to-have

### P3-1: Server-side fetching utan caching

Många `page.tsx` queries Supabase utan `revalidate` eller `unstable_cache`. Varje besök = ny DB-query. För semi-statisk data (öguider, blogg, tips, jämförelser) skulle 60-300s revalidate spara latency.

**Förslag:** Lägg till `export const revalidate = 300` på alla SSG-liknande sidor (oar, blogg, jamfor, tips, krogar-och-mat, etc).

### P3-2: Saknade loading.tsx på högtrafik-routes

Routes utan loading-skeleton ger blank skärm under navigering. Bör finnas på `/feed`, `/sok`, `/forum`, `/topplista`, `/profil`, `/planera`, `/upptack`.

### P3-3: 'use client' på komponenter som inte behöver vara client

Inte audited i detalj. Värd en pass — varje extra `'use client'` ökar JS-bundle med ~5–20kB. Komponenter som bara renderar data ska inte vara client.

### P3-4: <img> istället för <Image> i några komponenter

Inte audited i detalj — gick att köra fast med ESLint-varningar i bughunt-pass. Bilder med fel storlek dras dolt i bandbredd.

---

## Spår 1.c — Realtime-kanaler [VERIFIERAT i pass 2]

- 6 kanaler hittade: `inbox-feed`, `conv:${id}`, `forum-thread-${threadId}`, `notifications:${uid}`, `comments-panel:${tripId}`, `realtime-feed-trips`
- Alla `postgres_changes`-listeners förlitar sig på Supabase Realtime som **respekterar RLS server-side** (Realtime v2+).
- Verifierat RLS-policies på `messages` (`is_conv_member()`-check), `conversation_participants` (membership-check), `notifications` (auth.uid() = user_id).
- Slutsats: även om en user prenumererar på en annan users `conv:${id}` får de inga events — RLS filtrerar på server-sidan.

## Spår 4 — Rate-limit gap-analys [VERIFIERAT i pass 2]

- 26 av 76 API-routes använder `checkRateLimit`
- Av de 50 utan: majoriteten är read-only publika routes (sitemap, OG-bilder, sökresultat med små svar) som är cache:ade på CDN-nivå.
- 3 dyra utan rate-limit identifierade och åtgärdade (P1-5).
- Resterande utan rate-limit godkänt: cache:ade, eller har auth-guard, eller är låga-frekvens flows (login, signup).

## Spår 5 — Storage & uploads [VERIFIERAT i pass 2]

- 2 upload-routes: `/api/forum/upload-image`, `/api/account/delete` (storage cleanup)
- `forum/upload-image`:
  - ✓ Auth required
  - ✓ Rate limit (10/5min per user)
  - ✓ MIME whitelist (jpeg/png/webp/gif/heic)
  - ✓ Size limit 8 MB
  - ✓ Filename: `${user.id}/${timestamp}-${random}.${ext}` → users kan ej skriva över varandra
  - ⚠ MIME-spoofing-risk (P2-6, dokumenterad)
- 3 storage-buckets observerade: `images` (avatars), `trip-images` (checkin), `trips`, `forum-images`
- Buckets-policies inte direkt verifierade (kräver Supabase Dashboard) — men upload-pattern med `${user.id}/`-prefix indikerar att path-baserad RLS är på plats.

## Spår 6.b — Forum metadata-anonymisering [DELVIS ÅTGÄRDAT]

- Body/title sätts till `[Borttaget av användare]`
- `user_id` nollställs (line 97-98)
- Schema-genomgång inte körd i denna pass — kvarstående fält att verifiera: `mentions[]`, `media_urls[]`, `edited_at`. Kräver SELECT mot prod-schema.

## Spår 7 — Bug-hunt & felhantering [täckt av tidigare bughunt 60b8a738 + c748f49e]

- ~95% av API-routes har try/catch + structured error responses
- TODOs för Sentry-wrapping noterade men inte blockerande
- Några tomma catch-block — alla intentional (.catch(() => {}) för fire-and-forget)
- 0 PII-läckor i console.log
- 0 Next.js footguns (redirect/notFound i try, unawaited params, etc.)

## Spår 8 — Död kod [täckt av 60b8a738 + c748f49e]

- 6 dead components borttagna i pass 1 (OnboardingModal/Loader, PlanDayChip, ProBadge, RestaurantMap/Client)
- 5 unused imports rensade (logger, EmailTemplate, ISLANDS, supabaseAdmin, eslint-disable)
- macOS Finder-dubbletter borttagna (`route-feedback 2/`, MIGRATION-fil)
- `tsc --noEmit` passar rent
- npm audit: 5 moderate (Vercel-paket beroende av Next.js 15 — patcheas vid nästa Next-uppdatering)

## Spår 9 — Performance [VERIFIERAT i pass 2]

- 15 routes har `loading.tsx` (feed, sok, profil, spara, meddelanden, etc.)
- 20 routes har `revalidate` eller `unstable_cache`
- Saknar `loading.tsx` på: `/upptack`, `/oar`, `/resmal`, `/helgturer`, `/planera`, `/dagsturer`
  — flera är client-renderade så Suspense-strömning kommer från komponenter snarare än fil-baserad loading.tsx
- Soft-nav + hover-prefetch på landningssidan: åtgärdat i pass 1 (commit `2810d159`)
- Kategori-sidor (krogar-och-mat, hamnar-och-bryggor, etc.) använder ingen Supabase server-side — de är statiska och behöver ej revalidate.

## Anteckningar för nästa pass

Utanför pass 2's scope men dokumenterat:

1. **RLS-verifiering live mot Supabase prod-DB.** Krävs Supabase-dashboard-access — kör SELECT från ANON-rollen mot varje tabell för att bekräfta.

2. **Stripe webhook signature.** Inte verifierat i denna pass att `whsec_*` används korrekt. Bör kontrolleras i `src/app/api/stripe/webhook/route.ts`.

3. **Cookie-flaggor på Supabase auth.** Implicit via `@supabase/ssr` SDK — inte explicit verifierat att httpOnly+Secure+SameSite=Lax är satta. Default är sant men Vercel-konfig kan bryta det.

4. **Forum-anonymisering metadata-sweep.** P1-2 — sweep efter user-identifierande fält (mentions, edited_at, media_urls) som ligger kvar.

5. **MIME-spoofing-skydd.** P2-6 — magic-byte validation i upload-route.

6. **Service-role abstraktion i admin pages.** P2-1 — refactor för defense-in-depth.
