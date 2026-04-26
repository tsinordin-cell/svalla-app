'use client'
import dynamic from 'next/dynamic'

// Client-side wrapper so ssr:false is legal (Server Components can't use it directly)
const IslandWeather = dynamic(() => import('@/components/IslandWeather'), {
  ssr: false,
  loading: () => null,
})

export default function IslandWeatherClient(props: {
  lat: number
  lng: number
  islandName: string
}) {
  return <IslandWeather {...props} />
}
