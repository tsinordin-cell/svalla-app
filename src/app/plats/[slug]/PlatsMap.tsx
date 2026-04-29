'use client'
import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import { baseTile, SEAMARK_TILE, SEAMARK_ATTR } from '@/lib/map-tiles'

interface Props { lat: number; lng: number; name: string }

export default function PlatsMap({ lat, lng, name }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    import('leaflet').then(L => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center: [lat, lng],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        keyboard: false,
        touchZoom: false,
        boxZoom: false,
      })

      const { url: tileUrl, attr: tileAttr } = baseTile()
      L.tileLayer(tileUrl, { maxZoom: 18, attribution: tileAttr }).addTo(map)

      L.tileLayer(SEAMARK_TILE, {
        maxZoom: 18, opacity: 0.85, crossOrigin: '', attribution: SEAMARK_ATTR,
      }).addTo(map)

      L.marker([lat, lng]).addTo(map).bindPopup(name)

      mapInstanceRef.current = map
    })

    return () => {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
    }
  }, [lat, lng, name])

  return (
    <div
      ref={mapRef}
      style={{
        height: 200,
        borderRadius: 'var(--radius-inner)',
        overflow: 'hidden',
        border: '1px solid var(--hairline)',
      }}
    />
  )
}
