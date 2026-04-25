import type { Metadata } from 'next'
import UpptackLoader from './UpptackLoader'

export const metadata: Metadata = {
  title: 'Upptäck – Svalla',
  description: 'Utforska bryggor, krogar, naturhamnar och populära seglarleder i skärgården.',
}

export default function UpptackPage() {
  return (
    <div className="upptack-shell">
      <UpptackLoader />
    </div>
  )
}
