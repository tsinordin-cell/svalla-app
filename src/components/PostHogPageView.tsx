'use client'

/**
 * PostHogPageView — spårar sidvisningar i Next.js App Router.
 *
 * App Router använder client-side navigation (inget full page reload),
 * så vi måste fånga varje route-byte manuellt. Den här komponenten
 * lyssnar på pathname + searchParams och skickar $pageview till PostHog
 * varje gång de ändras.
 *
 * Wrappas i <Suspense> i layout.tsx pga useSearchParams()-kravet.
 */

import { usePathname, useSearchParams } from 'next/navigation'
import { laddaPostHog } from '@/lib/posthogLaddare'
import { useEffect } from 'react'
import { track } from '@/lib/analytics-events'
import { hasAnalyticsConsent } from '@/components/CookieConsent'
import { fangaKampanj } from '@/lib/kampanj'

function PageViewTracker() {
  const pathname    = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Kampanjlänkar (?k=), se lib/kampanj.ts. Före posthog-kollen: namnet ska
    // fångas även om PostHog inte är laddat.
    fangaKampanj(window.location.search, hasAnalyticsConsent())
    if (!pathname) return
    // PostHog laddas och startas bara efter samtycke (lib/posthogLaddare.ts).
    if (hasAnalyticsConsent()) {
      const url = window.location.href
      laddaPostHog().then(posthog => posthog?.capture('$pageview', { $current_url: url }))
    }
    // Spegla till vår egen analytics_events-tabell så /admin/malet och
    // /admin/insikter kan räkna trafik utan att gå via PostHogs API.
    // track() är no-op utan analytics-consent.
    track('page_viewed', { path: pathname })
  }, [pathname, searchParams])

  return null
}

// Exporteras wrappat i Suspense — useSearchParams() kräver det
import { Suspense } from 'react'
export default function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  )
}
