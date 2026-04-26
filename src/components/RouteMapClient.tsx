'use client'
// Client-wrapper: dynamic({ ssr: false }) för att Leaflet-koden
// aldrig ska hamna i initial JS-bundle. Minskar LCP på /rutter/[id].
import dynamic from 'next/dynamic'

const RouteMap = dynamic(() => import('./RouteMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: 280,
      borderRadius: 18,
      background: 'linear-gradient(135deg, rgba(30,92,130,0.06), rgba(45,125,138,0.08))',
    }} />
  ),
})

export default RouteMap
