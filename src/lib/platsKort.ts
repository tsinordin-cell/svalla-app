/**
 * Vad platskortet på /upptack får visa.
 *
 * Betyg och öppettider kommer bara med när de redan finns i restaurants
 * och öppettiderna är kontrollerade (verified_at). Kortet hittar inte på
 * värden och lägger inte till fält i databasen.
 */
import type { PlatsKategori } from './platskategori'
import { regionEtikett } from './regionEtikett'

/** Singular, som i raden "Krog · Möja". Filtren behåller plural. */
export const KATEGORI_SINGULAR: Record<PlatsKategori, string> = {
  krog: 'Krog',
  butik: 'Butik',
  hamn: 'Gästhamn',
  naturhamn: 'Naturhamn',
  bastu: 'Bastu',
  bensin: 'Bensin',
  boende: 'Boende',
  bad: 'Bad',
  annat: 'Annat',
}

export interface PlatsOmrade {
  etikett: string
  omrade: string | null
}

/** Kategori och ö, eller regionens svenska namn när ön saknas. */
export function platsOmrade(
  kat: PlatsKategori,
  island: string | null | undefined,
  region: string | null | undefined,
): PlatsOmrade {
  const o = island?.trim()
  return {
    etikett: KATEGORI_SINGULAR[kat],
    omrade: o ? o : regionEtikett(region),
  }
}

/** Google-betyg som redan ligger på platsen. Tomt när källan saknar det. */
export function betygRad(
  rating: number | null | undefined,
  antal: number | null | undefined,
): string | null {
  if (typeof rating !== 'number' || !Number.isFinite(rating) || rating <= 0) return null
  const tal = rating.toFixed(1).replace('.', ',')
  const n = typeof antal === 'number' && Number.isFinite(antal) && antal > 0
    ? Math.round(antal).toLocaleString('sv-SE')
    : null
  return n ? `${tal} på Google (${n})` : `${tal} på Google`
}

const STRECK = /\u2013|\u2014/g

/**
 * Öppettider som text. Tankstreck från källan byts mot bindestreck så att
 * gränssnittet inte visar dem. Tom sträng ger ingen rad.
 */
export function tiderRad(timmar: string | null | undefined): string | null {
  if (typeof timmar !== 'string') return null
  const text = timmar.replace(STRECK, '-').replace(/\s+/g, ' ').trim()
  return text.length > 0 ? text : null
}

export interface KallFalt {
  google_rating?: number
  google_ratings_total?: number
  opening_hours?: string
}

/**
 * Fält från en restaurants-rad som kortet får använda.
 * Öppettider följer med bara när verified_at är satt, samma regel som platssidan.
 */
export function faltFranKalla(r: {
  google_rating?: number | string | null
  google_ratings_total?: number | string | null
  opening_hours?: string | null
  verified_at?: string | null
}): KallFalt {
  const falt: KallFalt = {}
  const betyg = typeof r.google_rating === 'number'
    ? r.google_rating
    : typeof r.google_rating === 'string' ? Number(r.google_rating) : NaN
  if (Number.isFinite(betyg) && betyg > 0) {
    falt.google_rating = betyg
    const antal = typeof r.google_ratings_total === 'number'
      ? r.google_ratings_total
      : typeof r.google_ratings_total === 'string' ? Number(r.google_ratings_total) : NaN
    if (Number.isFinite(antal) && antal > 0) falt.google_ratings_total = Math.round(antal)
  }
  const tid = r.opening_hours?.trim()
  if (r.verified_at && tid) falt.opening_hours = tid
  return falt
}
