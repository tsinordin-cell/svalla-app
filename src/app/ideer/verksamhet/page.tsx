import type { Metadata } from 'next'
import Verksamhet, { type VBild } from './Verksamhet'
import { OBILDER } from '@/app/o/obilder.generated'

/**
 * FÖRHANDSVISNING 2026-11-21 (Max): allt som kan finnas på en verksamhetssida på Svalla.
 * För Claes och Thomas. Oindexerad och olänkad.
 * "Finns redan" = delar som finns på platssidorna i dag (src/app/upptack/[id]/page.tsx, kontrollerat 2026-11-21).
 * "Idé" = finns inte än. Verksamheten och allt innehåll om den är EXEMPEL.
 */
export const metadata: Metadata = {
  title: 'Allt som kan finnas på en verksamhetssida (förhandsvisning)',
  description: 'Förhandsvisning: delarna som kan finnas på en krog eller ett hotell på Svalla. Exempel.',
  robots: { index: false, follow: false },
}

const bild = (slug: string): VBild => {
  const b = OBILDER[slug]
  return b ? { url: b.url, fotograf: b.fotograf, licens: b.licens } : null
}

export default function VerksamhetPage() {
  return <Verksamhet bilder={[bild('moja'), bild('sandhamn'), bild('grinda'), bild('finnhamn')]} />
}
