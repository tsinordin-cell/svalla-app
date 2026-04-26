'use client'
import dynamic from 'next/dynamic'

const PlaneraMap = dynamic(() => import('./PlaneraMap'), {
  ssr: false,
  loading: () => (
    <div style={{ height: 260, borderRadius: 18, background: 'var(--sea-xl,#e8f2fa)', marginBottom: 20, border: '1px solid rgba(10,123,140,0.1)' }} />
  ),
})

export default PlaneraMap
