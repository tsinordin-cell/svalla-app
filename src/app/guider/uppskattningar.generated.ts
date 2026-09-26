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
  "rakfrukost-skargard": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "sjomatkrogar-guide": {
    "antal": 4,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "hummersafari-bohuslan": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "smogen-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "fjaderholmarna-guide": {
    "antal": 2,
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
  "sup-paddleboard-skargarden": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "o-luffa-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "havsbastu-skargarden": {
    "antal": 2,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "uto-komplett-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "fiske-i-skargarden": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "moja-guide": {
    "antal": 2,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "grinda-guide": {
    "antal": 3,
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
  "romantisk-weekend-skargarden": {
    "antal": 3,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "foretagsevent-skargarden": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "aland-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "gotland-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "kosterarna-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "missat-sista-baten": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "batkorkort-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "ingmarso-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "hoga-kusten-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "lysekil-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "bornholm-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "dalaro-guide": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "ankra-sova-bat": {
    "antal": 14,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "aw-pa-bat-stockholm": {
    "antal": 2,
    "datum": "2026-08",
    "vad": "spann över flera charteroperatörer, ej hämtat per aktör"
  },
  "konferens-skargard-stockholm": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "kajak-vaxholm": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "hyra-kajak-stockholm": {
    "antal": 3,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "glamping-skargard": {
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
  "cykeluthyrning-gotland": {
    "antal": 3,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "kursgard-skargard-stockholm": {
    "antal": 1,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "kickoff-ideer-skargard": {
    "antal": 2,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "hyra-stuga-marstrand-bohuslan": {
    "antal": 2,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "workshop-skargard-stockholm": {
    "antal": 2,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "teambuilding-skargard-stockholm": {
    "antal": 2,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "segelkurs-stockholm": {
    "antal": 2,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  },
  "dagstur-marstrand": {
    "antal": 13,
    "datum": "2026-08",
    "vad": "ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör"
  }
}

/** Antal guider som innehåller minst en uppskattad prisnivå. */
export const GUIDER_MED_UPPSKATTNING = 47
