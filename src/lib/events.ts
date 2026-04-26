/**
 * Event-helpers — skapa regatta/gemensam segling, RSVP, listning.
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import { slugifyClubName } from './clubs'

export type EventRow = {
  id: string
  slug: string | null
  title: string
  description: string | null
  image: string | null
  starts_at: string
  ends_at: string | null
  location_name: string | null
  lat: number | null
  lng: number | null
  club_id: string | null
  created_by: string | null
  created_at: string
  // joinad
  going_count?: number
  maybe_count?: number
  my_status?: 'going' | 'maybe' | 'no' | null
  club_name?: string | null
  creator_username?: string | null
}

export async function createEvent(
  supabase: SupabaseClient,
  currentUserId: string,
  input: {
    title: string
    description?: string | null
    image?: string | null
    starts_at: string
    ends_at?: string | null
    location_name?: string | null
    lat?: number | null
    lng?: number | null
    club_id?: string | null
  },
): Promise<EventRow | null> {
  let slug = slugifyClubName(input.title)
  const { data: existing } = await supabase
    .from('events').select('slug').eq('slug', slug).maybeSingle()
  if (existing) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`

  const { data: ev, error } = await supabase
    .from('events')
    .insert({
      slug,
      title: input.title,
      description: input.description ?? null,
      image: input.image ?? null,
      starts_at: input.starts_at,
      ends_at: input.ends_at ?? null,
      location_name: input.location_name ?? null,
      lat: input.lat ?? null,
      lng: input.lng ?? null,
      club_id: input.club_id ?? null,
      created_by: currentUserId,
    })
    .select('id, slug, title, description, image, starts_at, ends_at, location_name, lat, lng, club_id, created_by, created_at')
    .single()
  if (error || !ev) return null

  // auto-RSVP "going" för skaparen
  await supabase
    .from('event_attendees')
    .insert({ event_id: ev.id, user_id: currentUserId, status: 'going' })

  return ev as EventRow
}

export async function setAttendance(
  supabase: SupabaseClient,
  currentUserId: string,
  eventId: string,
  status: 'going' | 'maybe' | 'no' | null,
): Promise<boolean> {
  if (status === null) {
    const { error } = await supabase
      .from('event_attendees').delete()
      .eq('event_id', eventId).eq('user_id', currentUserId)
    return !error
  }
  const { error } = await supabase
    .from('event_attendees')
    .upsert({ event_id: eventId, user_id: currentUserId, status }, { onConflict: 'event_id,user_id' })
  return !error
}

/** Lista kommande events (startar från idag). */
export async function listUpcomingEvents(
  supabase: SupabaseClient,
  opts: { userId?: string | null; clubId?: string; limit?: number } = {},
): Promise<EventRow[]> {
  let q = supabase
    .from('events')
    .select('id, slug, title, description, image, starts_at, ends_at, location_name, lat, lng, club_id, created_by, created_at')
    .gte('starts_at', new Date(Date.now() - 3 * 3600_000).toISOString()) // tolererar events som startade senaste 3h
    .order('starts_at', { ascending: true })
    .limit(opts.limit ?? 30)
  if (opts.clubId) q = q.eq('club_id', opts.clubId)
  const { data: evs } = await q
  if (!evs || evs.length === 0) return []

  const evIds = evs.map(e => e.id as string)
  const { data: atts } = await supabase
    .from('event_attendees')
    .select('event_id, user_id, status')
    .in('event_id', evIds)

  const goingMap: Record<string, number> = {}
  const maybeMap: Record<string, number> = {}
  const myMap: Record<string, 'going' | 'maybe' | 'no'> = {}
  for (const a of atts ?? []) {
    const eid = a.event_id as string
    if (a.status === 'going') goingMap[eid] = (goingMap[eid] ?? 0) + 1
    if (a.status === 'maybe') maybeMap[eid] = (maybeMap[eid] ?? 0) + 1
    if (opts.userId && a.user_id === opts.userId) myMap[eid] = a.status as 'going' | 'maybe' | 'no'
  }

  // club names
  const clubIds = [...new Set(evs.map(e => e.club_id as string | null).filter(Boolean) as string[])]
  const clubMap: Record<string, string> = {}
  if (clubIds.length > 0) {
    const { data: cs } = await supabase.from('clubs').select('id, name').in('id', clubIds)
    for (const c of cs ?? []) clubMap[c.id as string] = c.name as string
  }

  return evs.map(e => ({
    ...(e as EventRow),
    going_count: goingMap[e.id as string] ?? 0,
    maybe_count: maybeMap[e.id as string] ?? 0,
    my_status: opts.userId ? (myMap[e.id as string] ?? null) : null,
    club_name: e.club_id ? clubMap[e.club_id as string] ?? null : null,
  }))
}

export function formatEventDate(startsAt: string, endsAt: string | null): string {
  const s = new Date(startsAt)
  const sStr = s.toLocaleString('sv-SE', {
    weekday: 'short', day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit',
  })
  if (!endsAt) return sStr
  const e = new Date(endsAt)
  const sameDay = s.toDateString() === e.toDateString()
  if (sameDay) {
    const eStr = e.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
    return `${sStr} – ${eStr}`
  }
  const eStr = e.toLocaleString('sv-SE', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  })
  return `${sStr} – ${eStr}`
}
