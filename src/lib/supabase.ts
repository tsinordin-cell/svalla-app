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
  location_name: string | null   // "Grinda", "Sandhamn" etc
  caption: string | null          // kort text, max 280 tecken
  pinnar_rating: number | null    // 1 | 2 | 3 (⚓ systemet)
  route_id: string | null
  started_at: string | null
  ended_at: string | null
  created_at: string
  users?: { username: string; avatar_url: string | null }
  routes?: { name: string } | null
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
