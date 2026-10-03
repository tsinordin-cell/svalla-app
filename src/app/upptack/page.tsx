import type { Metadata } from 'next'
import UpptackLoader from './UpptackLoader'

export const metadata: Metadata = {
  title: 'Utforska skärgården',
  description: 'Utforska bryggor, krogar, naturhamnar och populära seglarleder i skärgården.',
  alternates: { canonical: 'https://svalla.se/upptack' },
  openGraph: {
    title: 'Utforska skärgården – Svalla',
    description: 'Utforska bryggor, krogar, naturhamnar och populära seglarleder i skärgården.',
    url: 'https://svalla.se/upptack',
    type: 'website',
  },
}

export default function UpptackPage() {
  return (
    <div className="upptack-shell">
      {/* revision 2026-10-02: sidan saknade h1 (skärmläsare och sökmotorer).
          Designen har ingen synlig rubrik över kartan, så den är visuellt dold. */}
      <h1 className="sr-only">Utforska skärgården</h1>
      <UpptackLoader />
    </div>
  )
}
