# Dimension 2 — Bug Hunt

## [P0] Timezone-bug i meddelanden — datum jämförs mot lokal midnatt
**Fil:** `src/app/meddelanden/[id]/page.tsx:43-45`
**Beskrivning:** `new Date(); today.setHours(0,0,0,0)` sätter lokal midnatt. Supabase returnerar UTC-strängar. I Sverige sommartid (UTC+2) visar meddelanden från 00:00-01:59 UTC som "igår" istället för "idag".
**Fix:**
```typescript
const todayUtc = new Date().toISOString().split('T')[0]
const msgDayUtc = new Date(d).toISOString().split('T')[0]
if (msgDayUtc === todayUtc) return 'Idag'
```
**Status:** VERIFIERAT

---

## [P1] GPS speed-cap inkonsistens — 30 knop cap vs 45 knop anomaly-gräns
**Fil:** `src/app/spara/page.tsx:387-392, 341`
**Beskrivning:** `isGpsAnomaly()` anropas med `maxSpeedKnots=45` (rad 341) men `cleanSpeed` cappas till 30 knop (rad 392). Hastigheter 30-45 knop passerar anomaly-filtret och lagras.
**Fix:** Justera `isGpsAnomaly(maxSpeedKnots=30)` för konsistens.
**Status:** VERIFIERAT

---

## [P1] Optimistic UI race condition i ForumLikeButton
**Fil:** `src/app/forum/[kategori]/[trad]/ForumLikeButton.tsx:28-42`
**Beskrivning:** Rollback vid fel använder `liked`-state som kan ha muterats av ett andra snabbt klick innan första requestn returnerat.
**Fix:**
```typescript
const prevLiked = liked
const prevCount = count
// ... optimistic update ...
// Vid error:
setLiked(prevLiked)
setCount(prevCount)
```
**Status:** VERIFIERAT

---

## [P1] push_subscriptions — ingen explicit unsubscribe-endpoint
**Fil:** `src/app/api/push/subscribe/route.ts`
**Beskrivning:** `POST /api/push/subscribe` skapar rader via upsert, men det finns ingen `DELETE /api/push/unsubscribe`-endpoint. När browser unregistrerar SW returnerar push-försök 410 Gone — cleanup sker reaktivt i `src/app/api/push/dm/route.ts:158` istället för proaktivt.
**Fix:** Skapa `DELETE /api/push/unsubscribe` som tar `{ endpoint }` och raderar från `push_subscriptions`.
**Status:** VERIFIERAT

---

## [P2] route_points null-check inkonsistent
**Fil:** `src/components/TripCard.tsx:236`, `src/app/wrapped/[username]/[year]/page.tsx:116`
**Beskrivning:** Direkta `.map()` anrop på `trip.route_points` utan null-coalescing. `src/app/tur/[id]/page.tsx:213` har korrekt `Array.isArray()`-check men andra ställen saknar det.
**Fix:** `(trip.route_points ?? []).map(...)`
**Status:** VERIFIERAT

---

## [P2] LiveTrackMap cleanup-ordning och timer-leak
**Fil:** `src/components/LiveTrackMap.tsx:97-115`
**Beskrivning:** Tre `setTimeout`-anrop för `invalidateSize()` clearas i cleanup, men om komponenten unmountas under callback-körning kan `mapInstance.current` vara null. Cleanup clearar timers men inte ResizeObserver-callbacks som kan trigga nya timeouts.
**Fix:** Debounce `invalidate`-anropet (300ms), cancella i cleanup.
**Status:** VERIFIERAT

---

## Verifierat säkert — ingen åtgärd krävs

- **Leaflet container height:** `invalidateSize()` med timeouts implementerat i `src/components/PlaceMiniMap.tsx` (commit 90782002). VERIFIERAT FIXAT.
- **Server Components bundlar inte Supabase-klienten:** `createBrowserClient` finns enbart i 'use client'-filer. VERIFIERAT SÄKER.
