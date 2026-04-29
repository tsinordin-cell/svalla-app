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
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

function PageViewTracker() {
  const pathname    = usePathname()
  const searchParams = useSearchParams()
  const posthog     = usePostHog()

  useEffect(() => {
    if (!pathname || !posthog) return
    const url = window.location.href
    posthog.capture('$pageview', { $current_url: url })
  }, [pathname, searchParams, posthog])

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
