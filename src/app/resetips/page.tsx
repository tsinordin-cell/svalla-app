import type { Metadata } from 'next'
import SidHuvud from '@/components/SidHuvud'
import GuideHero from '@/components/GuideHero'
import GuideVal from '@/components/GuideVal'
import { allaGuidePoster } from '@/lib/guideposter'
import { ogSida } from '@/lib/og-standard'

export const metadata: Metadata = {
  title: 'Resetips & dagsrutter i skärgården',
  description: 'Utvalda dagsrutter i Stockholms skärgård, från Fjäderholmarna till Arholma. Med stopp, tips och praktisk info.',
  alternates: { canonical: 'https://svalla.se/resetips' },
  openGraph: {
    images: ogSida('https://svalla.se/resetips'),
    title: 'Resetips & dagsrutter i skärgården | Svalla',
    description: 'Utvalda dagsrutter i Stockholms skärgård, från Fjäderholmarna till Arholma.',
    url: 'https://svalla.se/resetips',
  },
}

// FÖRHANDSVISNING 2026-11-20: samma sida som /guider (GuideVal), med Dagsplaner förvalt.
// Rubrik, titel, beskrivning och canonical är desamma som förut.
export default function ResetipsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <SidHuvud />
      <GuideHero
        etikett="Resetips"
        titel="Utvalda skärgårdsrutter"
        text="Kompletta dagsrutter med stopp, tips och praktisk info, planerade av folk som faktiskt gjort dem. Välj område, och byt till Guider om du vill läsa mer."
      />
      <GuideVal poster={allaGuidePoster()} forval="Dagsplan" />
    </div>
  )
}
