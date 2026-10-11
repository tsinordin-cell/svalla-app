// ═══════════════════════════════════════════════════════════════════════════
//  ROADMAP — värdetrappan Tom och Max följer på /team
//  Samma trappa som 04_Rapporter/SVALLA_EXIT_BRIEF.md och /admin/malet.
//  Ändra målen här om trappan ändras — siffrorna i sig räknas live.
// ═══════════════════════════════════════════════════════════════════════════

export type KpiKey = 'sessions' | 'subs' | 'partners' | 'revenue' | 'users' | 'guides' | 'islands'

export type Stage = {
  /** 0 = Grunden (redan byggt), 1–3 = stegen i värdetrappan */
  n: 0 | 1 | 2 | 3
  name: string
  value: string
  tagline: string
}

export const STAGES: Stage[] = [
  { n: 0, name: 'Grunden', value: 'Bygget', tagline: 'Produkten, innehållet och faktan på plats.' },
  { n: 1, name: 'Bevis', value: '1 MSEK', tagline: 'Någon betalar. Någon läser varje månad.' },
  { n: 2, name: 'Fäste', value: '3 MSEK', tagline: 'Återkommande intäkt och bevisad tillväxt.' },
  { n: 3, name: 'Marknadsledare', value: '5 MSEK', tagline: 'Sveriges samlade skärgårdssida. Exit 2028–2029.' },
]

export const EXIT_GOAL = { range: '3–5 MSEK', year: '2028–2029' }

/** Mål per steg: [Bevis, Fäste, Marknadsledare]. Viktigast först. */
export const KPIS: { key: KpiKey; label: string; unit?: string; targets: [number, number, number]; why: string }[] = [
  { key: 'partners', label: 'Betalande partners', targets: [3, 15, 40], why: 'Återkommande B2B-intäkt värderas 3–5x. Den enskilt viktigaste siffran.' },
  { key: 'subs', label: 'E-postprenumeranter', targets: [1_000, 5_000, 15_000], why: 'Ägd publik. Köparen betalar för den.' },
  { key: 'sessions', label: 'Besökare per månad', targets: [15_000, 60_000, 150_000], why: 'Störst av egna sessioner 30 dygn (bara med samtycke) och Google-klick 28 dygn. Verklig siffra är högre.' },
  { key: 'revenue', label: 'Intäkt senaste 12 mån', unit: 'kr', targets: [100_000, 500_000, 1_500_000], why: 'Från Stripe: betalningar minus återbetalningar senaste 12 mån. Faller tillbaka på /admin/malet/config.ts om Stripe inte svarar.' },
  { key: 'users', label: 'Registrerade användare', targets: [2_000, 10_000, 30_000], why: 'Konton på sajten och i appen.' },
  { key: 'guides', label: 'Publicerade guider', targets: [150, 250, 400], why: 'Innehållet som drar trafiken.' },
  { key: 'islands', label: 'Öprofiler', targets: [200, 400, 600], why: 'Den verifierade ödatan är moaten.' },
]

export type KpiValues = Record<KpiKey, number>
export type Kpi = (typeof KPIS)[number]

/** Målet för ett steg (1–3). Tupeln har alltid tre värden. */
export function targetFor(k: Kpi, stage: 1 | 2 | 3): number {
  return k.targets[(stage - 1) as 0 | 1 | 2]
}

/** Första steget (1–3) där minst ett mål inte är nått. 4 = hela trappan klar. */
export function currentStage(v: KpiValues): 1 | 2 | 3 | 4 {
  for (const s of [1, 2, 3] as const) {
    if (KPIS.some(k => v[k.key] < targetFor(k, s))) return s
  }
  return 4
}
