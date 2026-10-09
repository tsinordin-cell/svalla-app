/**
 * Säsongskedjan för Stockholms skärgård, oktober till maj.
 *
 * Varje guide i kedjan får en rad längst ner med föregående och nästa guide,
 * så att den som läser om oktober hittar november och den som läser om jul
 * hittar nyår. Granskningen 2026-10-09 visade att flera guider inte länkade
 * vidare alls (höst, vinter). Ordningen följer kalendern.
 */
export const SASONGSKEDJA: ReadonlyArray<{ slug: string; kort: string }> = [
  { slug: 'oktober-skargarden', kort: 'Oktober' },
  { slug: 'host-stockholms-skargard', kort: 'Hösten' },
  { slug: 'november-skargard', kort: 'November' },
  { slug: 'julbord-skargarden', kort: 'Julbord' },
  { slug: 'julmarknad-havet', kort: 'Julmarknader' },
  { slug: 'jul-skargarden', kort: 'Jul' },
  { slug: 'nyar-skargarden', kort: 'Nyår' },
  { slug: 'vinter-i-skargarden', kort: 'Vintern' },
  { slug: 'pask-skargarden', kort: 'Påsk' },
  { slug: 'valborg-skargarden', kort: 'Valborg' },
  { slug: 'var-stockholms-skargard', kort: 'Våren' },
]

export function grannarISasongen(slug: string) {
  const i = SASONGSKEDJA.findIndex(s => s.slug === slug)
  if (i < 0) return null
  return { fore: SASONGSKEDJA[i - 1] ?? null, efter: SASONGSKEDJA[i + 1] ?? null }
}
