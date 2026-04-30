/**
 * placeSocial — sociala objekt knutna till en plats (restaurang, ö, hamn).
 * Bygger på check_ins (place_id) och place_reviews (place_id + place_type).
 * Joinar username/avatar för rendering utan extra rundtur.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export type PlaceType = 'restaurant' | 'island' | 'harbor' | 'generic'

export type PlaceCheckIn = {
  id: string
  user_id: string
  place_id: string | null
  place_name: string | null
  message: string | null
  image: string | null
  lat: number | null
  lng: number | null
  created_at: string
  username?: string
  avatar?: string | null
}

export type PlaceReview = {
  id: string
  user_id: string
  place_id: string
  place_type: PlaceType
  rating: number
  body: string | null
  created_at: string
  username?: string
  avatar?: string | null
}

export type PlaceVisitor = {
  user_id: string
  username: string
  avatar: string | null
  last_visit: string
  visit_count: number
}

/** Hämta senaste check-ins som är knutna till en specifik plats. */
export async function listCheckInsForPlace(
  supabase: SupabaseClient,
  placeId: string,
  limit = 12,
): Promise<PlaceCheckIn[]> {
  const { data: rows } = await supabase
    .from('check_ins')
    .select('id, user_id, place_id, place_name, message, image, lat, lng, created_at')
    .eq('place_id', placeId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (!rows || rows.length === 0) return []

  const ids = [...new Set(rows.map(r => r.user_id as string))]
  const { data: users } = await supabase
    .from('users').select('id, username, avatar').in('id', ids)
  const map: Record<string, { username: string; avatar: string | null }> = {}
  for (const u of users ?? []) {
    map[u.id as string] = { username: u.username as string, avatar: (u.avatar ?? null) as string | null }
  }
  return rows.map(r => ({
    ...(r as PlaceCheckIn),
    username: map[r.user_id as string]?.username,
    avatar: map[r.user_id as string]?.avatar ?? null,
  }))
}

/** Hämta omdömen för en plats. */
export async function listReviewsForPlace(
  supabase: SupabaseClient,
  placeId: string,
  placeType: PlaceType,
  limit = 20,
): Promise<PlaceReview[]> {
  const { data: rows } = await supabase
    .from('place_reviews')
    .select('id, user_id, place_id, place_type, rating, body, created_at')
    .eq('place_id', placeId)
    .eq('place_type', placeType)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (!rows || rows.length === 0) return []

  const ids = [...new Set(rows.map(r => r.user_id as string))]
  const { data: users } = await supabase
    .from('users').select('id, username, avatar').in('id', ids)
  const map: Record<string, { username: string; avatar: string | null }> = {}
  for (const u of users ?? []) {
    map[u.id as string] = { username: u.username as string, avatar: (u.avatar ?? null) as string | null }
  }
  return rows.map(r => ({
    ...(r as PlaceReview),
    username: map[r.user_id as string]?.username,
    avatar: map[r.user_id as string]?.avatar ?? null,
  }))
}

/** Posta/uppdatera ett omdöme. Unique-key (user_id, place_id, place_type) → upsert. */
export async function upsertReview(
  supabase: SupabaseClient,
  userId: string,
  placeId: string,
  placeType: PlaceType,
  rating: number,
  body: string | null,
): Promise<PlaceReview | null> {
  const r = Math.max(1, Math.min(5, Math.round(rating)))
  const { data, error } = await supabase
    .from('place_reviews')
    .upsert({
      user_id: userId,
      place_id: placeId,
      place_type: placeType,
      rating: r,
      body: body?.slice(0, 1000) ?? null,
    }, { onConflict: 'user_id,place_id,place_type' })
    .select('id, user_id, place_id, place_type, rating, body, created_at')
    .single()
  if (error || !data) return null
  return data as PlaceReview
}

export async function deleteReview(
  supabase: SupabaseClient,
  userId: string,
  placeId: string,
  placeType: PlaceType,
): Promise<boolean> {
  const { error } = await supabase.from('place_reviews').delete()
    .eq('user_id', userId).eq('place_id', placeId).eq('place_type', placeType)
  return !error
}

/** Aggregat: vilka unika användare har varit här (check-ins + reviews) — sorterat på senast besök. */
export async function listPlaceVisitors(
  supabase: SupabaseClient,
  placeId: string,
  placeType: PlaceType,
  limit = 24,
): Promise<PlaceVisitor[]> {
  const [{ data: cins }, { data: revs }] = await Promise.all([
    supabase.from('check_ins').select('user_id, created_at').eq('place_id', placeId).order('created_at', { ascending: false }).limit(200),
    supabase.from('place_reviews').select('user_id, created_at').eq('place_id', placeId).eq('place_type', placeType).order('created_at', { ascending: false }).limit(200),
  ])
  type Agg = { user_id: string; last_visit: string; visit_count: number }
  const aggMap: Record<string, Agg> = {}
  for (const row of [...(cins ?? []), ...(revs ?? [])]) {
    const u = row.user_id as string
    const t = row.created_at as string
    const cur = aggMap[u]
    if (!cur) aggMap[u] = { user_id: u, last_visit: t, visit_count: 1 }
    else {
      cur.visit_count += 1
      if (t > cur.last_visit) cur.last_visit = t
    }
  }
  const sorted = Object.values(aggMap).sort((a, b) => b.last_visit.localeCompare(a.last_visit)).slice(0, limit)
  if (sorted.length === 0) return []

  const ids = sorted.map(x => x.user_id)
  const { data: users } = await supabase
    .from('users').select('id, username, avatar').in('id', ids)
  const umap: Record<string, { username: string; avatar: string | null }> = {}
  for (const u of users ?? []) {
    umap[u.id as string] = { username: u.username as string, avatar: (u.avatar ?? null) as string | null }
  }
  return sorted.map(s => ({
    ...s,
    username: umap[s.user_id]?.username ?? 'okänd',
    avatar: umap[s.user_id]?.avatar ?? null,
  }))
}

/** Aggregat-rating direkt från place_reviews (utan att slå mot legacy `reviews`). */
export async function getReviewSummary(
  supabase: SupabaseClient,
  placeId: string,
  placeType: PlaceType,
): Promise<{ avg: number | null; count: number }> {
  const { data } = await supabase
    .from('place_reviews')
    .select('rating')
    .eq('place_id', placeId)
    .eq('place_type', placeType)
  if (!data || data.length === 0) return { avg: null, count: 0 }
  const sum = data.reduce((a: number, r: { rating: number }) => a + (r.rating ?? 0), 0)
  return { avg: sum / data.length, count: data.length }
}
