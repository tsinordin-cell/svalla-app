'use client'
import dynamic from 'next/dynamic'

const UpptackClient = dynamic(() => import('./UpptackClient'), {
  ssr: false,
  loading: () => (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)',
      flexDirection: 'column', gap: 12,
      paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom,0px))',
    }}>
      <div style={{ fontSize: 36 }}>🗺️</div>
      <p style={{ color: 'var(--txt3)', fontSize: 14, margin: 0 }}>Laddar karta…</p>
    </div>
  ),
})

export default function UpptackLoader() {
  return <UpptackClient />
}
