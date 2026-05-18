# Dimension 9 — SEO

## [P1] `generateMetadata` saknas på `/platser/[id]`
**Fil:** `src/app/platser/[id]/page.tsx`
**Beskrivning:** Platssidor (restauranger, hamnar) saknar dynamisk `generateMetadata`. Google indexerar sidan med fallback-title från `layout.tsx` ("Svalla") istället för platsens namn. Dessa sidor är troligen bland de viktigaste för organisk söktrafik (brand + geo).
**Åtgärd:** Lägg till `generateMetadata({ params })` som fetchear `restaurants.name`, `description` och `image_url` och returnerar `title`, `description`, `openGraph.images`.

## [P1] `generateMetadata` saknas på `/profil/[username]`
**Fil:** `src/app/profil/[username]/page.tsx`
**Beskrivning:** Profilsidor indexeras med generisk title. Varje användarprofil som delas på sociala medier får ingen OG-bild eller korrekt titel.
**Åtgärd:** Returnera `title: "${displayName} på Svalla"` och OG-bild via profilbild eller generisk sjökort-bild.

## [P2] Sitemap inkluderar inte platssidor dynamiskt
**Fil:** `src/app/sitemap.ts`
**Beskrivning:** Sitemappen innehåller statiska slug-listor (blogginlägg, öar, aktiviteter) men fetchear inte `/platser/[id]` dynamiskt från Supabase. Med 163+ platser i databasen är dessa sidor osynliga för Google.
**Åtgärd:** Lägg till Supabase-query i `sitemap()` som fetchear alla `restaurants.id` (eller `slug` om det finns) och lägger till `https://svalla.se/platser/{id}`.

## [P2] 22 blogg-slugs i BLOG_SLUGS är statisk hårdkodad lista
**Fil:** `src/app/sitemap.ts:10-32`
**Beskrivning:** Om nya blogginlägg läggs till i `posts-data.ts` men glöms i `BLOG_SLUGS` indexeras de aldrig. Listan bör deriveras programmatiskt från `posts-data.ts`.

## [P3] `next/image` saknar `sizes`-prop på 7 platser
**Fil:** Se `docs/audit-2026-05-12/03-performance.md` — redan rapporterat under Performance.
**SEO-konsekvens:** Google PageSpeed påverkas av LCP-prestanda. Saknade `sizes` gör att Next.js laddar onödigt stora bilder på mobil vilket sänker Core Web Vitals-poäng.

## [P3] Kanoniska URLs — inga dupliceringsproblem hittade
**Beskrivning:** Verifierat OK. Inga `?ref=`, `?utm_*` eller trailing-slash-problem som skulle skapa dubbletter i index. `next/link` normaliserar interna URLs.

## [P3] OG-bilder för dynamiska öar och forum-trådar
**Fil:** `src/app/o/[slug]/page.tsx:26-40`
**Beskrivning:** Öar har OG-bild via `/api/og/island/{slug}`. Forum-trådar (via `src/app/forum/[kategori]/[trad]/page.tsx`) bör verifiera att OG-bildrouten existerar och returnerar korrekt 1200×630.
