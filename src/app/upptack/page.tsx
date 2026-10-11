import type { Metadata } from 'next'
import { preconnect, preload } from 'react-dom'
import UpptackLoader from './UpptackLoader'
import { PLATSDATA_URL } from './platsdata'

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
  // revision 2026-10-02 (P1-3): kartan och listan laddas i webbläsaren efter
  // att sidans JavaScript körts, och först då hämtades platsdatan. Med en
  // preload börjar hämtningen när HTML:en läses, parallellt med skripten.
  // Samma adress och anropssätt som fetch() i platsdata.ts, och API:t svarar
  // med max-age=60 – annars hämtar webbläsaren om svaret i stället för att
  // återanvända det förladdade. Preconnect sparar uppkopplingen till
  // kartrutornas servrar; den största rutan är sidans LCP-element.
  preload(PLATSDATA_URL, { as: 'fetch', crossOrigin: 'anonymous' })
  preconnect('https://tile.openstreetmap.org')
  preconnect('https://tiles.openseamap.org')
  return (
    <div className="upptack-shell">
      {/* revision 2026-10-02: sidan saknade h1 (skärmläsare och sökmotorer).
          Designen har ingen synlig rubrik över kartan, så den är visuellt dold. */}
      <h1 className="sr-only">Utforska skärgården</h1>
      <UpptackLoader />
    </div>
  )
}
