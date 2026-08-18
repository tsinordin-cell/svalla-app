// ═══════════════════════════════════════════════════════════════════════════
//  VÄGEN TILL MILJONEN — manuella konstanter
//  Uppdatera dessa varje kvartal. Allt annat hämtas live från Supabase.
// ═══════════════════════════════════════════════════════════════════════════

/** Besök per månad — hämtas från Google Search Console / analytics */
export const TRAFFIC_MONTHLY = 0

/** Faktiska intäkter senaste 12 månaderna (SEK) */
export const REVENUE_YEARLY_SEK = 0

/** Faktiska kostnader senaste 12 månaderna: hosting, Supabase, mail, AI (SEK) */
export const COSTS_YEARLY_SEK = 0

/** Scenario 2 — förmedlad bokningsvolym senaste 12 mån (GMV i SEK) */
export const BOOKING_GMV_YEARLY = 0

/** Scenario 3 — månatlig abonnemangsintäkt från företagsverktyget (SEK) */
export const SAAS_MRR_SEK = 0

/** Snittintäkt per betalande partner och år (SEK).
 *  Marknadsreferens: Turistkanalen.se tar 1 995 kr/år för premiumlistning. */
export const PARTNER_AVG_YEARLY_SEK = 6_000

/** Kvartalsvis logg — lägg till en post varje kvartal, nyast först */
export const TIMELINE: { period: string; text: string }[] = [
  {
    period: '2026 Q3',
    text:
      'Exit-brief och scenariomodell skapad. Tagline satt till "Sveriges samlade skärgårdssida". ' +
      'Beslut: bygg mot scenario BAS, håll dörren öppen mot PLATTFORM. ' +
      'Noll betalande partners — det är den enda siffra som betyder något just nu.',
  },
]
