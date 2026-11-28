/**
 * Follow-prefs — granulär kontroll över push-notiser per följd användare.
 * notify_any — helt av/på (default true)
 * only_magic — bara turer
 * min_distance — minst N nautiska mil
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export type FollowPref = {
 follower_id: string
 following_id: string
 notify_any: boolean
 only_magic: boolean
 min_distance: number | null
 updated_at: string
}

export const DEFAULT_FOLLOW_PREF: Omit<FollowPref, 'follower_id' | 'following_id' | 'updated_at'> = {
 notify_any: true,
 only_magic: false,
 min_distance: null,
}

export async function getFollowPref(
 _supabase: SupabaseClient,
 _followerId: string,
 _followingId: string,
): Promise<FollowPref | null> {
 // Tabellen follow_prefs finns inte. Frågan gav 404 och tomt svar, så profilen
 // visar standardläget (inte anpassade notiser) utan att anropa databasen.
 return null
}

export async function upsertFollowPref(
 _supabase: SupabaseClient,
 _followerId: string,
 _followingId: string,
 _patch: Partial<Omit<FollowPref, 'follower_id' | 'following_id' | 'updated_at'>>,
): Promise<boolean> {
 // Sparning slog också mot den saknade tabellen och misslyckades. Knappen
 // stannar öppen, samma som när upsert svarade med fel.
 return false
}

/** Avgör om en notis ska skickas baserat på tur + pref. */
export function shouldNotify(pref: FollowPref | null, trip: { pinnar_rating: number | null; distance: number | null }): boolean {
 if (!pref) return true // default = ja
 if (!pref.notify_any) return false
 if (pref.only_magic && trip.pinnar_rating !== 3) return false
 if (pref.min_distance != null && (trip.distance ?? 0) < pref.min_distance) return false
 return true
}
