/**
 * Vilken kategori en plats visas under på Utforska och på startsidans karta.
 *
 * Platsens egen typ i databasen avgör först. Etiketter och ord i
 * beskrivningen används bara när typen saknas eller är natur/sevärdhet.
 *
 * Ändrat 2026-11-23: tidigare vann etiketten "harbor_stop" och ord som
 * "gästhamn", "bensin" eller "diesel" i beskrivningen över typen. Då stod 61
 * krogar, kaféer och barer under Gästhamnar (t.ex. Finnhamns Krog) och 8
 * gästhamnar under Bensin, mätt i tabellen restaurants samma dag.
 */
export type PlatsKategori = 'krog' | 'butik' | 'hamn' | 'naturhamn' | 'bastu' | 'bensin' | 'boende' | 'bad' | 'annat'

export interface PlatsForKategori {
  name?: string | null
  type?: string | null
  categories?: string[] | null
  description?: string | null
}

const BOENDE_ETIKETTER = ['accommodation', 'hotel', 'hostel', 'cabin', 'bnb', 'pension']

export function platsKategori(p: PlatsForKategori): PlatsKategori {
  const cats = (p.categories ?? []).map(c => c.toLowerCase())
  const t = (p.type ?? '').toLowerCase()
  const harBoende = cats.some(c => BOENDE_ETIKETTER.includes(c))

  // 1. Typen avgör.
  if (t === 'sauna' || t === 'bastu') return 'bastu'
  if (t === 'fuel' || t === 'fuel_station') return 'bensin'
  if (['hotel', 'hostel', 'cabin', 'camping', 'pension'].includes(t)) return 'boende'
  // Krogar och hamnar med rum (t.ex. värdshus) visas som boende, som förut.
  if (['restaurant', 'bar', 'cafe', 'kafe'].includes(t)) {
    if (harBoende) return 'boende'
    // Butiker (lanthandel, livsmedelsbutik) har typen café eller restaurang
    // men etiketten "shop", som platssidan visar som Butik.
    if (cats.includes('shop')) return 'butik'
    return 'krog'
  }
  if (t === 'harbor' || t === 'marina') return harBoende ? 'boende' : 'hamn'
  if (t === 'nature_harbor' || t === 'anchorage') return 'naturhamn'
  if (['beach', 'bad', 'strand'].includes(t)) return 'bad'

  // 2. Typ saknas eller är natur/sevärdhet: etiketter och beskrivning.
  const gissad = kategoriUtanTyp(p, cats)
  // En fyr eller ett naturreservat med kaféetikett är ingen krog.
  if ((t === 'nature' || t === 'attraction') && gissad === 'krog') return 'annat'
  return gissad
}

function kategoriUtanTyp(p: PlatsForKategori, cats: string[]): PlatsKategori {
  const n = (p.name ?? '').toLowerCase()
  const d = (p.description ?? '').toLowerCase()
  if (cats.some(c => c === 'sauna' || c === 'bastu') || n.includes('bastu') || n.includes('sauna')) return 'bastu'
  if (cats.includes('fuel') || cats.includes('bransle') || d.includes('bensin') || d.includes('diesel') || d.includes('drivmedel')) return 'bensin'
  if (cats.some(c => BOENDE_ETIKETTER.includes(c))) return 'boende'
  if (cats.some(c => ['guest_harbor', 'harbor_stop', 'marina'].includes(c)) || d.includes('gästhamn') || d.includes('marina')) return 'hamn'
  if (cats.some(c => c === 'nature_harbor' || c === 'anchorage')) return 'naturhamn'
  if (cats.some(c => ['restaurant', 'cafe', 'bar'].includes(c))) return 'krog'
  if (cats.some(c => ['beach', 'bad', 'strand', 'badplats'].includes(c)) || n.includes('badplats') || n.includes('strand') || d.includes('badplats')) return 'bad'
  return 'annat'
}
