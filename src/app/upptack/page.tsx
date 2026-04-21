import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Upptäck – Svalla',
  description: 'Utforska bryggor, krogar, naturhamnar och populära seglarleder i skärgården.',
}

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

export default function UpptackPage() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px))',
      overflow: 'hidden',
    }}>
      <UpptackClient />
    </div>
  )
}
