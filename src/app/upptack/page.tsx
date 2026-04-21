import type { Metadata } from 'next'
import UpptackLoader from './UpptackLoader'

export const metadata: Metadata = {
  title: 'Upptäck – Svalla',
  description: 'Utforska bryggor, krogar, naturhamnar och populära seglarleder i skärgården.',
}

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
      <UpptackLoader />
    </div>
  )
}
