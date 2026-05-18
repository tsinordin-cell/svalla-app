# Dimension 3 — Performance

## [P0] Saknat index på restaurants(slug)
**Fil:** Saknas i alla migrations
**Beskrivning:** Alla plats-sidors main query gör full table scan (1000+ rader) för `.eq('slug', slug)`. Ingen migration definierar `CREATE INDEX ON restaurants(slug)`.
**Fix:**
```sql
CREATE INDEX IF NOT EXISTS restaurants_slug_idx ON public.restaurants(slug);
```
**Status:** VERIFIERAT

---

## [P1] `SELECT *` utan kolumn-begränsning
**Fil:** `src/app/admin/partners/page.tsx:64`, `src/app/admin/subscribers/page.tsx:38`, `src/app/meddelanden/[id]/page.tsx:194`, `src/lib/forum.ts:214`
**Beskrivning:** Hämtar alla kolumner inklusive tunga fält (google_photo_refs, route_points) som inte används på sidan.
**Fix:** Ersätt `.select('*')` med explicit kolumn-lista per anrop.
**Status:** VERIFIERAT

---

## [P1] next/image utan sizes-prop
**Fil:** `src/app/topplista/page.tsx:334`, `src/app/tur/[id]/page.tsx:352`, `src/app/sok/page.tsx:448,655`, `src/components/Nav.tsx:115`
**Beskrivning:** `<Image>` utan `sizes` prop ger suboptimal LCP/CLS — Next.js kan inte räkna rätt viewport-bredd för responsive bilder.
**Fix:** Lägg till `sizes="36px"` (eller korrekt värde per kontext) på alla avatar-bilder.
**Status:** VERIFIERAT

---

## Verifierat OK — ingen åtgärd krävs

- **Leaflet dynamic imports:** Korrekt via `UpptackLoader.tsx` (`dynamic(..., {ssr:false})`) och `PlaneraMapDynamic.tsx`. VERIFIERAT OK.
- **N+1 i topplista:** Använder `.in('id', allUids)` batch-query. VERIFIERAT OPTIMERAT.
- **N+1 i feed:** Feed hämtas via `feed_with_counts` RPC. VERIFIERAT OPTIMERAT.
- **Bundle-analys:** OVERIFIERAT — kräver `npm run build` + bundle-analyzer.
