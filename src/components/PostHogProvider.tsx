'use client'

/**
 * PostHogProvider — initierar PostHog en gång vid app-start.
 *
 * Konfiguration:
 *  - EU-region (data lagras i Frankfurt) → GDPR-compliant
 *  - capture_pageview: false  → hanteras manuellt via PostHogPageView
 *  - session_recording med maskAllInputs → lösenord/e-post loggas aldrig
 *  - autocapture: true → klick, formulär, navigering fångas utan extra kod
 *
 * User identification: lyssnar på Supabase auth-state och kopplar
 * analytics-händelser till rätt användare automatiskt.
 */

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase'

let initialized = false

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (initialized) return
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key) return                        // inget nyckel → ingen tracking

    posthog.init(key, {
      api_host:           process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
      ui_host:            'https://eu.posthog.com',
      capture_pageview:   false,           // PostHogPageView hanterar detta
      capture_pageleave:  true,
      autocapture:        true,
      persistence:        'localStorage+cookie',
      session_recording: {
        maskAllInputs:     true,           // dölj lösenord, e-post etc.
        maskTextSelector:  '[data-ph-mask]',
      },
    })
    initialized = true

    // Identifiera inloggad användare → kopplar events till rätt person i PostHog
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        posthog.identify(data.user.id, {
          email: data.user.email,
          username: data.user.user_metadata?.username,
        })
      }
    })

    // Lyssna på login/logout under session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        posthog.identify(session.user.id, {
          email: session.user.email,
          username: session.user.user_metadata?.username,
        })
      }
      if (event === 'SIGNED_OUT') {
        posthog.reset()
      }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
