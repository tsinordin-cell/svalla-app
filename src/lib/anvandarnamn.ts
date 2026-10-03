import { cache } from 'react'
import { createPublicSupabaseClient } from './supabase-server'

/**
 * Användarnamnet i profiladresser (/u/<namn>), revision 2026-10-02.
 *
 * Uppmätt 2026-10-02: /u/Elin gav 200 men /u/elin gav 404, eftersom uppslaget
 * var skiftlägeskänsligt (.eq). Nu görs exakt uppslag först, precis som förut,
 * och bara om det missar en skiftlägesokänslig reserv (ilike). Reserven godtas
 * bara om den ger EN rad. Det finns användarnamn som bara skiljer sig i
 * skiftläge, och då vet vi inte vem som avses, så då blir det 404 som förut.
 *
 * Hittas namnet med annat skiftläge omdirigerar layouten för /u/[username]
 * permanent (308) till profilens riktiga adress, så att bara den delas.
 *
 * cache() gör att layouten, generateMetadata och sidan delar samma uppslag
 * inom en och samma förfrågan.
 */

/** Ett ilike-mönster som bara matchar namnet självt (utom skiftläge), eller
 *  null om det inte går att bygga ett säkert mönster. */
export function ilikeExakt(namn: string): string | null {
  // PostgREST gör om * till % i like/ilike, och * går inte att escapa.
  if (namn.includes('*')) return null
  // \ % _ är specialtecken i ILIKE; backslash är Postgres standard-escape.
  return namn.replace(/[\\%_]/g, '\\$&')
}

/** Det riktiga användarnamnet (som det står i databasen), eller null. */
export const hittaAnvandarnamn = cache(async (namn: string): Promise<string | null> => {
  const supabase = createPublicSupabaseClient()
  const { data: exakt } = await supabase
    .from('users').select('username').eq('username', namn).maybeSingle()
  if (exakt?.username) return exakt.username as string

  const monster = ilikeExakt(namn)
  if (!monster) return null
  const { data } = await supabase
    .from('users').select('username').ilike('username', monster).limit(2)
  return data?.length === 1 ? ((data[0]?.username as string | undefined) ?? null) : null
})
