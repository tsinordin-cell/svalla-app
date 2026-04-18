import { createClient } from '@/lib/supabase'
import type { Restaurant } from '@/lib/supabase'
import type { Metadata } from 'next'
import PlatserClient from '@/components/PlatserClient'

export type TourLine = {
  id: string
  title: string
  start_location: string
  destination: string
  duration_label: string
  waypoints: { lat: number; lng: number }[]
}

export const metadata: Metadata = {
  title: 'Platser',
  description: 'Hitta restauranger, bryggor och stopp längs den svenska skärgårdskusten.',
  openGraph: {
    title: 'Platser – Svalla',
    description: 'Restauranger och stopp längs skärgårdsrutten, recenserade av seglare.',
    url: 'https://svalla.se/platser',
  },
}

// Leaflet-kartan kräver browser-API:er — skippa statisk prerender
export const dynamic = 'force-dynamic'

export default async function PlatserPage() {
  const supabase = createClient()

  const { data: restaurants, error } = await supabase
    .from('restaurants')
    .select('id, name, images, description, opening_hours, latitude, longitude, tags, core_experience, type')
    .order('name', { ascending: true })

  if (error) {
    console.error('[platser]', error.message)
    return (
      <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 24px', background: '#f2f8fa' }}>
        <div style={{ fontSize: 52 }}>⚓</div>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: '#1e5c82', margin: 0 }}>Kunde inte ladda platser</h1>
        <p style={{ fontSize: 14, color: '#7a9dab', textAlign: 'center', margin: 0 }}>Kontrollera din anslutning och försök igen.</p>
        <a href="/platser" style={{ padding: '11px 24px', borderRadius: 14, background: '#1e5c82', color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
          Försök igen
        </a>
      </div>
    )
  }

  const { data: toursRaw } = await supabase
    .from('tours')
    .select('id, title, start_location, destination, duration_label, waypoints')
    .order('title', { ascending: true })

  const tours: TourLine[] = (toursRaw ?? [])
    .filter((t: TourLine) => Array.isArray(t.waypoints) && t.waypoints.length >= 2)
    .map((t: TourLine) => ({
      id: t.id,
      title: t.title,
      start_location: t.start_location,
      destination: t.destination,
      duration_label: t.duration_label,
      waypoints: t.waypoints,
    }))

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f2f8fa' }}>

      {/* ── Sticky header ── */}
      <header style={{
        flexShrink: 0,
        padding: '12px 16px 10px',
        background: 'rgba(250,254,255,0.97)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: '#1e5c82', margin: 0 }}>Utforska</h1>
          <p style={{ fontSize: 11, color: '#7a9dab', margin: '2px 0 0', fontWeight: 500 }}>
            {restaurants?.length ?? 0} platser i skärgården
          </p>
        </div>
      </header>

      {restaurants && restaurants.length > 0 ? (
        <PlatserClient restaurants={restaurants as Restaurant[]} tours={tours} />
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🏝</div>
          <p style={{ fontSize: 15, color: '#7a9dab' }}>Inga platser inlagda ännu.</p>
        </div>
      )}
    </div>
  )
}
