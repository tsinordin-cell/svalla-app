import type { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import DagClient from './DagClient'
import type { Restaurant } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Min dag — Svalla',
  description: 'Få en dag planerad på 30 sekunder. Föreslagna stopp, krogar och tider från din position på vattnet — Svallas beslutshjälp för båtfolk.',
  keywords: ['planera dag skärgård', 'vad göra skärgården idag', 'svalla min dag', 'segling planering'],
  openGraph: {
    title: 'Min dag — Svalla',
    description: 'En komplett skärgårdsdag på 30 sekunder.',
    url: 'https://svalla.se/dag',
  },
}

export const dynamic = 'force-dynamic'

export type DagPoolEntry = Pick<
  Restaurant,
  'id' | 'name' | 'type' | 'island' | 'latitude' | 'longitude' |
  'description' | 'image_url' | 'booking_url' | 'opening_hours' | 'seasonality' | 'categories'
>

export default async function DagPage() {
  const supabase = await createServerSupabaseClient()

  // Hämta alla POI med koordinater. Vi filtrerar i klienten baserat på position.
  // 175 verifierade poster — räcker för MVP utan paginering.
  const { data, error } = await supabase
    .from('restaurants')
    .select('id, name, type, island, latitude, longitude, description, image_url, booking_url, opening_hours, seasonality, categories')
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .limit(500)

  const pool: DagPoolEntry[] = (data ?? []) as DagPoolEntry[]

  return <DagClient pool={pool} loadError={!!error} />
}
