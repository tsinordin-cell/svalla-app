import { createClient } from '@/lib/supabase'
import type { Punkt } from '@/lib/dela-klistermarken'
import { ritaOgKort, OgRutter, type OgTal } from '@/app/api/og/_mall/kort'

export const runtime = 'nodejs'
export const revalidate = 3600
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Svalla Wrapped'

/**
 * Länkförhandsvisning för Svalla Wrapped. Gemensam mall
 * (src/app/api/og/_mall/kort.tsx), 2026-11-19. Gav 500 i produktion före det:
 * satori klarar inte CSS-variabler (`background: var(--grad-sea)`).
 */
export default async function Image({
  params,
}: {
  params: Promise<{ username: string; year: string }>
}) {
  // Next.js dekodar inte dynamiska segment automatiskt (se src/app/u/[username]/page.tsx).
  const { username: rawUsername, year } = await params
  const username = decodeURIComponent(rawUsername)
  const yr = parseInt(year, 10)

  const supabase = createClient()
  const { data: userRow } = await supabase
    .from('users_publik')
    .select('id, username, vessel_name, home_port')
    .eq('username', username)
    .maybeSingle()

  if (!userRow || !Number.isFinite(yr)) {
    return ritaOgKort({ etikett: 'Wrapped', rubrik: 'Svalla Wrapped', adress: 'svalla.se/wrapped' }, { status: 404 })
  }

  const { data: rawTrips } = await supabase
    .from('trips')
    .select('distance, location_name, route_points')
    .eq('user_id', userRow.id)
    .is('deleted_at', null)
    .gte('started_at', `${yr}-01-01`)
    .lt('started_at', `${yr + 1}-01-01`)

  const trips = rawTrips ?? []
  const nm = trips.reduce((a, t) => a + (Number(t.distance) || 0), 0)
  const platser = new Set(trips.map(t => t.location_name).filter(Boolean)).size
  const grupper = trips
    .map(t => t.route_points)
    .filter((p): p is Punkt[] => Array.isArray(p) && p.length >= 2)

  const tal: OgTal[] = [
    { val: String(trips.length), etikett: trips.length === 1 ? 'TUR' : 'TURER' },
    { val: nm >= 100 ? String(Math.round(nm)) : nm.toFixed(1).replace('.', ','), enhet: 'NM', etikett: 'DISTANS' },
    { val: String(platser), etikett: platser === 1 ? 'PLATS' : 'PLATSER' },
  ]

  return ritaOgKort({
    etikett: `Wrapped ${yr}`,
    // Svensk genitiv: inget extra s efter s, x eller z.
    rubrik: `${userRow.username}${/[sxz]$/i.test(userRow.username) ? '' : 's'} ${yr} på sjön`,
    under: [userRow.vessel_name, userRow.home_port],
    // Bara publika turer syns här (anonym klient); utan turer ingen talpanel med nollor.
    tal: trips.length > 0 ? tal : [],
    avsandare: userRow.username,
    hoger: grupper.length > 0 ? <OgRutter grupper={grupper} /> : null,
    adress: 'svalla.se/wrapped',
  })
}
