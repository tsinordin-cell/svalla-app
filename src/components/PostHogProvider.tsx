'use client'

/**
 * PostHogProvider — initierar PostHog FÖRST när besökaren godkänt analys i
 * cookie-bannern (CookieConsent → localStorage 'svalla_cookie_consent').
 *
 * Revision 2026-10-02: tidigare kördes posthog.init direkt vid sidladdning,
 * oavsett val i bannern. Cookien ph_*_posthog sattes och inspelning, enkäter
 * och autocapture laddades innan besökaren valt — medan bannern lovade
 * "analys (PostHog) bara om du godkänner". Nu:
 *  - inget samtycke → ingen init, och gamla ph_*-spår i webbläsaren städas bort
 *  - "Acceptera alla" → init direkt, utan omladdning
 *  - "Endast nödvändiga" efter ett tidigare ja → opt-out, inspelningen stoppas.
 *    (Inte reset(): i posthog-js raderar reset() opt-out-flaggan, och då
 *    började spårningen igen — uppmätt av granskaren 2026-10-02.)
 *
 * 2026-10-10: själva biblioteket laddas också först efter samtycke
 * (lib/posthogLaddare.ts, import()). Tidigare låg posthog-js (≈63 kB) i varje
 * sidas JavaScript för alla besökare, även de som aldrig godkänt analys.
 *
 * Konfiguration (oförändrad, i lib/posthogLaddare.ts):
 *  - US-region (PostHog US Cloud) via vår /ingest-proxy
 *  - capture_pageview: false  → hanteras manuellt via PostHogPageView
 *  - session_recording med maskAllInputs → lösenord/e-post loggas aldrig
 *  - autocapture: true → klick, formulär, navigering fångas utan extra kod
 *
 * User identification: lyssnar på Supabase auth-state och kopplar
 * analytics-händelser till rätt användare — bara efter samtycke.
 */

import { useEffect } from 'react'
import { createClient, getViewer } from '@/lib/supabase'
import { hasAnalyticsConsent } from '@/components/CookieConsent'
import { laddaPostHog, posthogOmLaddad } from '@/lib/posthogLaddare'

/**
 * Tar bort PostHog-spår som satts innan samtycke krävdes (före 2026-10-02).
 * Opt-out-flaggan (__ph_opt_in_out_*) börjar inte på ph_ och lämnas kvar.
 */
function stadaPostHogSpar() {
  try {
    for (const lager of [window.localStorage, window.sessionStorage]) {
      for (const k of Object.keys(lager)) {
        if (k.startsWith('ph_')) lager.removeItem(k)
      }
    }
    // PostHog sätter cookien på huvuddomänen (domain=.svalla.se). En cookie
    // tas bara bort med samma domain som den sattes med, så radera i båda
    // varianterna.
    const host = window.location.hostname
    const huvuddomän = host.split('.').slice(-2).join('.')
    for (const c of document.cookie.split(';')) {
      const namn = c.split('=')[0]?.trim()
      if (namn && namn.startsWith('ph_')) {
        document.cookie = `${namn}=; path=/; max-age=0; SameSite=Lax`
        document.cookie = `${namn}=; path=/; max-age=0; SameSite=Lax; domain=.${huvuddomän}`
      }
    }
  } catch { /* privat läge m.m. — inget att städa */ }
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let avbruten = false
    let startad = false
    let avregistrera: (() => void) | null = null

    // Laddar biblioteket (bara efter samtycke, se lib/posthogLaddare.ts) och
    // kopplar händelser till den inloggade användaren.
    const starta = async () => {
      if (startad) return
      startad = true
      const posthog = await laddaPostHog()
      if (!posthog || avbruten) { startad = false; return }

      // Identifiera inloggad användare → kopplar events till rätt person i PostHog
      const supabase = createClient()
      getViewer(supabase).then(({ data }) => {
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
      avregistrera = () => subscription.unsubscribe()
    }

    if (hasAnalyticsConsent()) {
      void starta()
    } else {
      stadaPostHogSpar()
    }

    const vidNyttVal = (e: Event) => {
      const val = (e as CustomEvent<{ value?: string }>).detail?.value
      if (val === 'accepted') {
        void starta()
        laddaPostHog().then(posthog => {
          if (!posthog) return
          posthog.opt_in_capturing()
          // Sidan besökaren står på räknas också (annars saknas landningssidan).
          posthog.capture('$pageview', { $current_url: window.location.href })
        })
      } else {
        avregistrera?.()
        avregistrera = null
        stadaPostHogSpar()
        const posthog = posthogOmLaddad()
        if (posthog) {
          posthog.opt_out_capturing()
          posthog.stopSessionRecording()
          // PostHog fortsätter hämta /ingest/flags/ var 5:e minut så länge
          // sidan lever, oavsett opt-out. En omladdning ger en sida där
          // PostHog aldrig startas.
          window.location.reload()
        }
      }
    }
    window.addEventListener('svalla-consent-changed', vidNyttVal)

    return () => {
      avbruten = true
      window.removeEventListener('svalla-consent-changed', vidNyttVal)
      avregistrera?.()
    }
  }, [])

  return <>{children}</>
}
