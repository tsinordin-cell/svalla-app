'use client'
/**
 * OnboardingModalLoader — tunn klient-wrapper för lazy-load.
 *
 * `ssr: false` är inte tillåtet i Server Components (Next.js 15 App Router).
 * Den här komponenten är 'use client' och gör dynamic-importen,
 * så feed/page.tsx (Server Component) kan använda den utan byggfel.
 */
import dynamic from 'next/dynamic'

const OnboardingModal = dynamic(() => import('./OnboardingModal'), {
  ssr: false,
  loading: () => null,
})

export default function OnboardingModalLoader() {
  return <OnboardingModal />
}
