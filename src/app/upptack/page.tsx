import type { Metadata } from 'next'
import { preconnect } from 'react-dom'
import { createPublicSupabaseClient } from '@/lib/supabase-server'
import { arGiltigPlats, hamtaPlatslista } from '@/lib/platslista'
import UpptackExplorer from './UpptackExplorer'

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

// Listan ändras bara via /admin. Tio minuter i CDN:en. Kastar hämtningen vid
// en bakgrundsrevalidering behåller Next den förra sidan; vid `next build`
// stoppar den bygget (samma som /upptack/[id] och /o/[slug]).
export const revalidate = 600

/**
 * Sidan renderas på servern med platslistan i HTML:en (2026-10-10).
 *
 * Tidigare var hela vyn klientrenderad (dynamic ssr:false): HTML:en innehöll
 * en snurra, och först efter sidans JavaScript → explorerns chunk → API-
 * anropet fanns det något att läsa. Uppmätt live 2026-10-10 (mobil, Lighthouse):
 * LCP 5,0 s median med spridning 1–7 s, och sökmotorer såg en tom sida.
 * Nu kommer korten med första svaret, från CDN:en, och Leaflet laddas efter.
 * ?region=, ?typ= och ?q= läses i webbläsaren efter monteringen (samma
 * mönster som ProfileTabs, CLAUDE.md p27) så att sidan kan vara statisk.
 */
export default async function UpptackPage() {
  const platser = (await hamtaPlatslista(createPublicSupabaseClient())).filter(arGiltigPlats)
  // Tom lista utan fel (t.ex. ändrad läspolicy) ska inte ligga tio minuter i CDN:en.
  if (platser.length === 0) throw new Error('/upptack: platslistan var tom')
  // Preconnect till kartrutornas servrar; den största rutan är ofta LCP-elementet.
  preconnect('https://tile.openstreetmap.org')
  preconnect('https://tiles.openseamap.org')
  return (
    <div className="upptack-shell">
      {/* revision 2026-10-02: sidan saknade h1 (skärmläsare och sökmotorer).
          Designen har ingen synlig rubrik över kartan, så den är visuellt dold. */}
      <h1 className="sr-only">Utforska skärgården</h1>
      <UpptackExplorer initialPois={platser} />
    </div>
  )
}
