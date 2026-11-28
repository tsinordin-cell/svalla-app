import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import OnboardingFlow from '@/app/onboarding/OnboardingFlow'

/**
 * TILLFÄLLIG förhandsvisning av den nya onboardingen (branch claude/onboarding-ny-design).
 * Finns bara utanför produktion och tas bort före merge. Inget sparas eller spåras.
 */
export const metadata: Metadata = { title: 'Förhandsvisning', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default function Forhandsvisning() {
  if (process.env.VERCEL_ENV === 'production') notFound()
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #efe7d6 0%, #f7f1e7 60%)', display: 'flex', flexDirection: 'column', padding: '28px 18px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <OnboardingFlow
          forhandsvisning
          userId="00000000-0000-4000-8000-000000000000"
          initialUsername="tom"
          suggestions={[
            { id: 'a', username: 'skargardsmax', avatar: null, vessel_model: null, home_port: 'Vaxholm', boat_type: 'Segelbåt', van: true },
            { id: 'b', username: 'mojaseglaren', avatar: null, vessel_model: null, home_port: 'Möja', boat_type: 'Segelbåt' },
            { id: 'c', username: 'kajakkajsa', avatar: null, vessel_model: null, home_port: 'Dalarö', boat_type: 'Kajak' },
          ]}
        />
      </div>
    </div>
  )
}
