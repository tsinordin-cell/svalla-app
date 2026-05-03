# Planera din dag — Spec

> Status: design-spec, ej byggd. Tracking-stub live på `/upptack` 2026-05-03.
> Beslutspunkt: bygg P0 om `plan_day_tap`-events > 200 på 7 dagar. Annars arkivera.

## P0 · ENTRY EXPERIENCE

**Plats:** Sticky bar längst upp på `/upptack` (under header, ovanför karta) + chip-länk från `/platser/[id]` när användaren tittar på en plats. **Inte** en egen flik i bottom-nav.

**Fil:** `src/components/PlanDayEntry.tsx` (renderas i `src/app/upptack/UpptackClient.tsx`).

```ts
interface PlanDayEntryProps {
  geolocation: { lat: number; lng: number; islandSlug: string | null } | null
  defaultStartTime?: string  // ISO, default = now (om före 16:00) eller imorgon 09:00
}
```

**Visuellt (380px):** Hela baren är en knapp, 60px hög.
- Vänster: ☀ ikon + "Planera din dag" (fontWeight 700, 15px, var(--txt))
- Höger: chip "Möja · idag" (om geo finns) eller "Välj ö" (annars)
- Bakgrund: `linear-gradient(90deg, rgba(30,92,130,0.08), rgba(201,110,42,0.08))`
- Border: `1px solid rgba(30,92,130,0.15)`, radius 14px

**3-sekunders förståelse:** En tap. Användaren ser direkt 3 turkort inom 800ms. **Ingen wizard.** Ön är förvald via GPS. Tid = nu (eller imorgon om sent på dagen).

---

## P0 · DAY VIEW

**Fil:** `src/app/dag/[island]/page.tsx` (server component, anonym-vänlig). URL-mönster: `/dag/moja?start=09:30&dur=8h`.

```ts
interface DayPlanProps {
  island: { slug: string; name: string; lat: number; lng: number }
  selectedTour: TourPlan
  alternatives: TourPlan[]
  startTime: string
  durationHours: number
}

interface TourPlan {
  id: string
  title: string
  vibe: 'aktiv' | 'mat' | 'lugn' | 'familj'
  totalKm: number
  totalDurationMin: number
  stops: Stop[]
  restaurantHook?: { placeId: string; bookingUrl: string | null }
}

interface Stop {
  id: string
  placeId?: string
  type: 'restaurang' | 'brygga' | 'bad' | 'vandring' | 'utsikt'
  name: string
  arriveAt: string  // "11:00"
  durationMin: number
  lat: number
  lng: number
  shortDesc: string  // max 80 tecken
  whyHere: string  // "Lokalfavorit, inte turistig" — max 60 tecken
}
```

### Sidlayout (mobile, top→bottom)

1. **Header (sticky 56px):** ← tillbaka · "Möja · lördag 9:30–17:30" · ⋯
2. **Karta (200px):** Leaflet, 3 markörer + linje mellan. Återanvänd `PlatserMap.tsx`.
3. **Tur-tabs (44px, horisontellt scroll):** 3 chips — "🍽 Mat & vin" (vald), "🥾 Aktiv", "😌 Lugn". Tap = bytt tur, karta uppdateras, ingen sidladdning.
4. **Timeline (flex-1):** Vertikalt flöde med 3 stopp. Varje stopp = kort (radius 16px, white/dark-bg, shadow 0 2px 8px rgba(0,45,60,0.06)).
5. **Bottom CTA (sticky, 80px ovanför nav):** "💾 Spara plan" (var(--sea), full bredd) + sekundär "🔗 Dela".

### Stoppkort

```
┌─ 11:00 · Möja Värdshus ─────────┐
│ 🍽 Lunch · 1h 30min             │
│ Säsongsgrönt + skaldjur,        │
│ liten meny som ändras varje    │
│ vecka.                          │
│ ✨ Lokalfavorit                  │
│                                 │
│ [Boka bord →]  [Visa på karta]  │
└─────────────────────────────────┘
```

- Vänster border 4px i kategorifärg (mat=acc, brygga=sea, bad=#5a9fd4)
- "Boka bord" syns endast om `bookingUrl` finns → öppnar i ny flik
- Klick på kortets bakgrund → `/platser/[placeId]` (befintlig sida)

---

## Konkret data-instans · "Möja Mat & Vin · lördag 09:30"

```ts
{
  island: { slug: 'moja', name: 'Möja', lat: 59.4636, lng: 18.8975 },
  startTime: '09:30',
  durationHours: 8,
  selectedTour: {
    id: 'moja-mat-l1',
    title: 'Mat & vin på Möja',
    vibe: 'mat',
    totalKm: 6.2,
    totalDurationMin: 480,
    restaurantHook: { placeId: 'moja-vardshus', bookingUrl: 'https://...' },
    stops: [
      {
        id: 's1', type: 'brygga', name: 'Berg gästhamn',
        arriveAt: '09:30', durationMin: 30,
        lat: 59.4665, lng: 18.9012,
        shortDesc: 'Förtöj och ta morgonkaffe på bryggcaféet.',
        whyHere: 'Närmast tilläggsplats, alltid plats på morgonen.',
      },
      {
        id: 's2', placeId: 'moja-vardshus',
        type: 'restaurang', name: 'Möja Värdshus',
        arriveAt: '11:30', durationMin: 90,
        lat: 59.4641, lng: 18.8967,
        shortDesc: 'Säsongsmeny med lokala råvaror och skaldjur.',
        whyHere: 'Lokalfavorit — inte turisterna, gå hit för riktig mat.',
      },
      {
        id: 's3', type: 'vandring', name: 'Ramsmoraleden',
        arriveAt: '14:00', durationMin: 120,
        lat: 59.4598, lng: 18.9123,
        shortDesc: '3 km lättvandrad slinga med utsikt mot Kanholmsfjärden.',
        whyHere: 'Smältan efter lunch — barnvänlig.',
      },
    ],
  },
}
```

---

## P1 · TOUR CARD

**Fil:** `src/components/TourCard.tsx`.

```ts
interface TourCardProps {
  tour: TourPlan
  isSelected: boolean
  onSelect: () => void
}
```

**Innehåll (max 88px höjd):**
- Rad 1: Vibe-emoji + titel (15px/700) + · + totaltid ("4h aktivt")
- Rad 2: Stopp-glyfs i rad ("⚓ → 🍽 → 🥾") + km
- Rad 3: 1 social proof: "23 båtfolk gillar idag" ELLER väderchip "☀ 19°"

**Vald tur:** 2px border var(--sea), bakgrund `rgba(30,92,130,0.04)`. Annars 1px rgba(10,123,140,0.12).

---

## P1 · INTERACTION

**Byt stopp:** Long-press på stoppkort → bottom sheet (180px, ej modal) med 3 alternativ från samma kategori inom 2km. Återanvänd `place_saves`-tabellen för "personliga favoriter" som top-prio.

**Justera tid:** Tap på tidstämpeln (`11:30`) → native time picker. Stopp efter justeras automatiskt.

**Spara:** Inloggad: insert i `planned_routes` (lägg till kolumn `tour_data jsonb`, antagande). Anonym: `localStorage` + chip "Logga in för att spara permanent".

**Inga modaler.** Allt är bottom sheets eller inline.

---

## P1 · DECISION SUPPORT

1. **Vibe-tag** ersätter generisk beskrivning
2. **`whyHere`** på varje stopp — varför just här
3. **Tid-sanity:** Stängd restaurang → grå med "Stängt 11:30 — visa alternativ"

---

## P2 · BUSINESS IMPACT

- **Restaurangtrafik:** Bokningsknapp har `data-source="dagsplan"`. Mål 12%.
- **Engagement:** Push 18:00 dagen före: "Din Möja-plan börjar imorgon 09:30 — kolla väder".
- **Monetisering (senare):** `restaurants.is_promoted` boolean med tydlig "💼 Partner"-badge.

---

## Edge cases

| Case | UI |
|---|---|
| Offline / 3G | Karta cachar tiles vid första load (SW). Stoppkort SSR. |
| Tom feed | "Vi har inga färdiga dagar för Harö ännu. [Bygg din egen i Planera →]" |
| Alla restauranger stängda | Vibe "Mat" filtreras bort. Visar 2 turer + chip "Restauranger öppnar imorgon 11:00". |
| Efter 16:00 vald start | Default: kort kvällsversion (3h, 1 stopp), eller chip "Planera för imorgon istället". |
| Anonym + Spara | Bottom sheet: "Logga in för att hitta planen senare. Vi sparar din plan medan du loggar in." |

---

## States

- **Loading:** Skeleton-kort (3 st, 88px), karta = grå rektangel med spinner. Max 600ms.
- **Error:** "Kunde inte hämta dagsplan. [Försök igen]" — inline.
- **Empty (filtreringen tömde):** "Inga turer matchar. [Visa alla 3 →]"
