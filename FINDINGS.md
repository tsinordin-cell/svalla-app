# FINDINGS — säkerhets- och kvalitetsrevision

**Datum:** 2026-05-06
**Reviewer:** Claude Sonnet 4.6 (multi-pass audit)
**Workspace:** /Users/thomasnordin/Documents/Cluade CO/Svalla.se/STF till hemsidan/svalla-app
**Senast committed:** 8acc1f8d (URL-validering i upptack)

## Sammanfattning

| Prio | Antal | Status |
| ---- | ----- | ------ |
| P0 — aktiv säkerhetsbrist | **0** | inga konfirmerade |
| P1 — buggar/data-läckage | **3** | 1 åtgärdad i denna pass |
| P2 — kodkvalitet | **5** | dokumenterade |
| P3 — optimering | **4** | dokumenterade |

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

### P1-3: PROTECTED_ROUTES i middleware täcker inte allt [DOKUMENTERAT]

**Fil:** `src/middleware.ts:5`

**Problem:** `PROTECTED_ROUTES = ['/feed', '/profil', '/spara', '/logga', '/notiser']` saknar:
- `/planera`, `/sparade`, `/meddelanden`, `/min-skargard`, `/onboarding`

Verifierat att alla dessa pages **gör egen auth-check** i `page.tsx` (redirect till `/logga-in`), så det är inte en aktiv brist. Men det är **defense-in-depth-svaghet** — om någon framtida sida missar att lägga till auth-check förlitar man sig på utvecklaren snarare än middleware.

**Fix-förslag:** Lägg till samtliga skyddade routes i middleware-listan så det blir två lager. Inte åtgärdat — risk för att bryta något existerande edge-case.

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

Tidigare bughunt-pass tog bort 6 dead components. Återstår potentiellt fler. Kör `ts-prune` eller `knip` för komplett lista.

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

## Anteckningar för nästa pass

Utanför dagens scope men värt att titta på:

1. **RLS-verifiering live mot Supabase.** Jag verifierade migrations-filer och kod-pattern. Faktisk RLS-tillstånd i prod-DB inte verifierat — kör t.ex. SELECT från ANON-rollen mot varje tabell för att bekräfta.

2. **Realtime-channels.** Inte audited. Om Supabase Realtime används för live-tracking behöver kanaler filtreras på `user_id = auth.uid()` annars kan inloggad user prenumerera på andras data.

3. **Stripe webhook signature.** Antar att verifieras med `whsec_*` — inte verifierat i koden. Kontrollera `src/app/api/stripe/webhook/route.ts`.

4. **Cookie-flaggor på Supabase auth.** Implicit via `@supabase/ssr` SDK — inte explicit verifierat att httpOnly+Secure+SameSite=Lax är satta.
