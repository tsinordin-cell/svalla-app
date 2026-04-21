'use client'
// Client-wrapper: dynamic({ ssr: false }) för att Leaflet-koden
// aldrig ska hamna i initial JS-bundle. Minskar LCP på /tur/[id].
import dynamic from 'next/dynamic'

const TripDetailMap = dynamic(() => import('./TripDetailMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: 360,
      borderRadius: 20,
      background: 'linear-gradient(135deg, rgba(30,92,130,0.06), rgba(45,125,138,0.08))',
    }} />
  ),
})

export default TripDetailMap
