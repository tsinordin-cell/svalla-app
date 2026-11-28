// ═══════════════════════════════════════════════════════════════════════════
//  ROADMAP — värdetrappan Tom och Max följer på /team
//  Samma trappa som 04_Rapporter/SVALLA_EXIT_BRIEF.md och /admin/malet.
//  Målen här är standardvärden. Teamet kan ändra dem på /team (tabellen
//  team_kpi_mal, 2026-11-28); siffrorna i sig räknas alltid live.
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
  { n: 3, name: 'Marknadsledare', value: '5 MSEK', tagline: 'Skärgården börjar här. Exit 2028 till 2029.' },
]

export const EXIT_GOAL = { range: '3 till 5 MSEK', year: '2028 till 2029' }

/** Mål per steg: [Bevis, Fäste, Marknadsledare]. Viktigast först. */
export const KPIS: { key: KpiKey; label: string; unit?: string; targets: [number, number, number]; why: string }[] = [
  { key: 'partners', label: 'Betalande partners', targets: [3, 15, 40], why: 'Återkommande B2B-intäkt värderas 3 till 5x. Den enskilt viktigaste siffran.' },
  { key: 'subs', label: 'E-postprenumeranter', targets: [1_000, 5_000, 15_000], why: 'Ägd publik. Köparen betalar för den.' },
  { key: 'sessions', label: 'Besökare per månad', targets: [15_000, 60_000, 150_000], why: 'Det största av Google-klick och egna besök. Verklig siffra är högre, eftersom alla inte godkänner statistik.' },
  { key: 'revenue', label: 'Intäkt senaste 12 mån', unit: 'kr', targets: [100_000, 500_000, 1_500_000], why: 'Hämtas från Stripe: betalningar minus återbetalningar. Köparen värderar på intäkt, inte på trafik.' },
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

/** Ändrade mål från tabellen team_kpi_mal, per nyckeltal. */
export type KpiMal = Partial<Record<KpiKey, [number, number, number]>>

/** Nyckeltalen med teamets ändrade mål där sådana finns, annars standardmålen. */
export function medMal(mal: KpiMal | null | undefined): Kpi[] {
  return KPIS.map(k => {
    const t = mal?.[k.key]
    return t ? { ...k, targets: t } : k
  })
}

/** Är tre mål giltiga? Större än noll och stigande från 1 till 5 MSEK. */
export function giltigaMal(t: [number, number, number]): boolean {
  return t.every(n => Number.isFinite(n) && n > 0) && t[0] <= t[1] && t[1] <= t[2]
}

/** Första steget (1–3) där minst ett mål inte är nått. 4 = hela trappan klar. */
export function currentStage(v: KpiValues, kpis: readonly Kpi[] = KPIS): 1 | 2 | 3 | 4 {
  for (const s of [1, 2, 3] as const) {
    if (kpis.some(k => v[k.key] < targetFor(k, s))) return s
  }
  return 4
}
