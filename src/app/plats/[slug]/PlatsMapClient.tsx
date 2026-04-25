'use client'
import dynamic from 'next/dynamic'

const PlatsMap = dynamic(() => import('./PlatsMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: 200,
      borderRadius: 'var(--radius-inner)',
      background: 'var(--map-preview-bg)',
    }} />
  ),
})

export default PlatsMap
