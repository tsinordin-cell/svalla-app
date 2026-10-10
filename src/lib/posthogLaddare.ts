/**
 * PostHog laddas först när besökaren har godkänt analys (2026-10).
 *
 * Varför: posthog-js (≈63 kB komprimerat) importerades statiskt i
 * rotlayouten och laddades på varje sida för varje besökare – även för alla
 * som aldrig godkänt analys, där det sedan aldrig startades. Det var den
 * största enskilda biten av sidornas eget JavaScript (uppmätt på /upptack
 * 2026-10-10: 63 av ≈400 kB). Nu hämtas biblioteket med import() när det
 * behövs, och bara då.
 *
 * Konfigurationen är oförändrad (se PostHogProvider för bakgrunden).
 */
import type { PostHog } from 'posthog-js'

let instans: PostHog | null = null
let laddning: Promise<PostHog | null> | null = null

/** PostHog om det redan är laddat och startat, annars null (laddar inget). */
export function posthogOmLaddad(): PostHog | null {
  return instans
}

/** Ladda och starta PostHog (en gång). null om nyckel saknas eller laddningen misslyckas. */
export function laddaPostHog(): Promise<PostHog | null> {
  if (instans) return Promise.resolve(instans)
  if (laddning) return laddning
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return Promise.resolve(null)   // ingen nyckel → ingen tracking

  laddning = import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(key, {
        // Reverse proxy via Next.js rewrites (next.config.ts) — kringgår
        // AdBlock som annars skulle blockera *.posthog.com och tappa data.
        // ui_host pekar fortfarande på riktiga PostHog så toolbar/links funkar.
        //
        // OBS: tilläggsskripten (recorder, surveys m.m.) hämtas i praktiken från
        // us-assets.i.posthog.com (uppmätt 2026-10-02), inte via proxyn.
        api_host:           process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://svalla.se/ingest',
        ui_host:            'https://us.posthog.com',
        capture_pageview:   false,           // PostHogPageView hanterar detta
        capture_pageleave:  true,
        autocapture:        true,
        persistence:        'localStorage+cookie',
        // Efter opt-out sparas inget alls i webbläsaren.
        opt_out_persistence_by_default: true,
        session_recording: {
          maskAllInputs:     true,           // dölj lösenord, e-post etc.
          maskTextSelector:  '[data-ph-mask]',
        },
      })
      instans = posthog
      return posthog
    })
    .catch(() => {
      // Nätverksfel, adblock m.m. – försök igen nästa gång någon frågar.
      laddning = null
      return null
    })
  return laddning
}
