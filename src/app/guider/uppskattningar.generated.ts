// GENERERAD AV scripts/generera-uppskattningar.mjs — REDIGERA INTE FÖR HAND.
//
// Vilka guider som innehåller prisnivåer vi uppskattat i stället för hämtat.
// Kommer från UPPSKATTNING-markörerna i guide-content.ts. Ändra markören där
// och kör om skriptet.
//
// Poängen: en uppskattning som bara är märkt i koden blir aldrig omprövad.
// Syns den på sidan blir den det — av oss eller av en läsare som vet bättre.

export type Uppskattning = {
  /** Hur många prisnivåer i guiden som är uppskattade */
  antal: number
  /** Äldsta månaden bland markörerna — hur inaktuell sidan är i värsta fall */
  datum: string
  /** Vad uppskattningen bygger på, som markören formulerar det */
  vad: string
}

export const UPPSKATTNINGAR_PER_GUIDE: Record<string, Uppskattning> = {
  "midsommar-skargarden-2026": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "vaxholm-guide-komplett": {
    "antal": 2,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "hyrbat-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "seglingsklubbar-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "vad-kostar-skargarden": {
    "antal": 8,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "o-luffa-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "finnhamn-guide": {
    "antal": 2,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "orno-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "hoga-kusten-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "dalaro-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "segeldag-foretag-stockholm": {
    "antal": 2,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "teambuilding-kajak-stockholm": {
    "antal": 2,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "dagstur-marstrand": {
    "antal": 3,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  }
}

/** Antal guider som innehåller minst en uppskattad prisnivå. */
export const GUIDER_MED_UPPSKATTNING = 13
