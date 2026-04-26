'use client'
// Client wrapper — krävs för att dynamic({ ssr: false }) ska fungera i Next.js 15
import dynamic from 'next/dynamic'

const RestaurantMapClient = dynamic(
  () => import('@/components/RestaurantMap'),
  { ssr: false, loading: () => <div style={{ height: 220, background: 'rgba(10,123,140,0.06)', borderRadius: 16 }} /> }
)

export default RestaurantMapClient
