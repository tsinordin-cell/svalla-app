import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export type Restaurant = {
  id: string
  name: string
  latitude: number
  longitude: number
  images: string[]
  menu: string
  opening_hours: string
  description: string
  created_at: string
  tags?: string[]
  core_experience?: string | null
  type?: string | null
  island?: string | null
  archipelago_region?: string | null
  categories?: string[] | null
  best_for?: string[] | null
  facilities?: string[] | null
  seasonality?: string | null
  source_confidence?: string | null
  image_url?: string | null
  slug?: string | null
}

export type Route = {
  id: string
  name: string
  description: string
  distance: number        // nautical miles
  duration: number        // minutes estimated
  difficulty: 'Lätt' | 'Medel' | 'Svår'
  boat_types: string[]    // suitable boat types
  waypoints: { lat: number; lng: number; name?: string }[]
  cover_image: string
  restaurant_ids: string[]
  created_at: string
  restaurants?: Restaurant[]
}

export type Trip = {
  id: string
  user_id: string
  boat_type: string
  distance: number
  duration: number
  average_speed_knots: number
  max_speed_knots: number
  image: string
  location_name: string | null    // "Grinda", "Sandhamn" etc
  start_location: string | null   // "Nynäshamn", "Stockholms ström" etc
  caption: string | null          // kort text, max 280 tecken
  pinnar_rating: number | null    // 1 | 2 | 3 (⚓ systemet)
  route_id: string | null
  started_at: string | null
  ended_at: string | null
  created_at: string
  route_points: { lat: number; lng: number }[] | null  // förenklad GPS-rutt för visning i feed
  users?: { username: string; avatar_url: string | null }
  routes?: { name: string } | null
  // Batch-fetched social counts (avoids N+1 on feed)
  likes_count?: number
  comments_count?: number
  user_liked?: boolean
}

export type User = {
  id: string
  username: string
  email: string
  avatar: string | null
  created_at: string
}

export type TourWaypoint = {
  lat: number
  lng: number
  name?: string
  description?: string
  restaurant?: string
}

export type Tour = {
  id: string
  slug: string
  title: string
  start_location: string
  destination: string
  transport_types: string[]
  duration_label: string
  best_for: string[]
  highlights: string[]
  food_stops: { namn: string; nara_bryggan: boolean; typ: string }[]
  season: string
  usp: string
  category: string[]
  hamn_profil: string[]
  bad_profil: string[]
  tone_tags: string[]
  log_suggestions: string[]
  insider_tip: string | null
  cover_image: string | null
  description: string | null
  waypoints: TourWaypoint[]
  created_at: string
  tags?: string[]
}

// ─────────────────────────────────────────────────────────
// SOCIAL v2 — DM, klubbar, check-ins, events, stories,
// reposts, achievement-events, follow-prefs, invites.
// ─────────────────────────────────────────────────────────

export type Conversation = {
  id: string
  is_group: boolean
  title: string | null
  club_id: string | null
  created_by: string | null
  created_at: string
  last_message_at: string
  last_message_preview: string | null
  last_message_user_id: string | null
}

export type ConversationParticipant = {
  conversation_id: string
  user_id: string
  role: 'owner' | 'admin' | 'member'
  joined_at: string
  last_read_at: string
  muted: boolean
}

export type Message = {
  id: string
  conversation_id: string
  user_id: string
  content: string | null
  attachment_type: 'image' | 'geo' | 'trip' | null
  attachment_url: string | null
  attachment_meta: Record<string, unknown> | null
  created_at: string
}

export type Club = {
  id: string
  slug: string
  name: string
  description: string | null
  image: string | null
  is_public: boolean
  region: string | null
  created_by: string | null
  created_at: string
}

export type CheckIn = {
  id: string
  user_id: string
  place_id: string | null
  place_name: string | null
  lat: number | null
  lng: number | null
  message: string | null
  image: string | null
  created_at: string
}

export type Event = {
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
}

export type EventAttendee = {
  event_id: string
  user_id: string
  status: 'going' | 'maybe' | 'no'
  joined_at: string
}

export type TripTag = {
  trip_id: string
  tagged_user_id: string
  tagged_by_user_id: string | null
  confirmed: boolean
  created_at: string
}

export type Story = {
  id: string
  user_id: string
  image: string | null
  caption: string | null
  lat: number | null
  lng: number | null
  location_name: string | null
  created_at: string
  expires_at: string
}

export type Repost = {
  id: string
  user_id: string
  trip_id: string
  comment: string | null
  created_at: string
}

export type PlaceReview = {
  id: string
  user_id: string
  place_id: string | null
  place_type: 'restaurant' | 'island' | 'harbor' | 'generic' | null
  rating: number | null
  body: string | null
  created_at: string
}

export type AchievementEvent = {
  id: string
  user_id: string
  achievement_key: string
  awarded_at: string
}

export type FollowPref = {
  follower_id: string
  following_id: string
  notify_any: boolean
  only_magic: boolean
  min_distance: number | null
  updated_at: string
}

export type Invite = {
  id: string
  user_id: string
  code: string
  uses: number
  max_uses: number | null
  created_at: string
  expires_at: string | null
}

export const BOAT_TYPES = [
  'Motorbåt',
  'Segelbåt',
  'RIB',
  'Katamaran',
  'Segeljolle',
  'Kajak',
  'SUP',
  'Annat',
] as const

export type BoatType = typeof BOAT_TYPES[number]
