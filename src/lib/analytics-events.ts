/**
 * analytics-events — typad helper för PostHog-events.
 *
 * Använd ALLTID denna helper istället för posthog.capture() direkt.
 * Detta säkerställer:
 *  - Konsekventa event-namn (inga "user_signup" + "user-signup" + "signup")
 *  - Konsekventa property-fält (typed)
 *  - Möjlighet att lägga till global enrichment (t.ex. is_pro)
 *  - Respekterar cookie-consent (events skickas bara om analytics-consent given)
 *
 * Användning (client):
 *   import { track } from '@/lib/analytics-events'
 *   track('trip_logged', { trip_id, distance_nm, duration_min })
 *
 * För server-side events (webhook, cron) → använd PostHog server SDK separat.
 */

import { hasAnalyticsConsent } from '@/components/CookieConsent'

// ─── Event-katalog ────────────────────────────────────────────────────────────
// Lägg ALDRIG till nya events utan att uppdatera detta interface.

export type SvallaEvent =
  // Auth & signup
  | { name: 'user_signup'; props: { method: 'email' | 'oauth'; provider?: string } }
  | { name: 'user_login';  props: { method: 'email' | 'oauth' } }
  | { name: 'user_logout'; props: Record<string, never> }
  | { name: 'account_deleted'; props: Record<string, never> }

  // Onboarding
  | { name: 'onboarding_started';  props: { step: number } }
  | { name: 'onboarding_step';     props: { step: number; skipped?: boolean } }
  | { name: 'onboarding_completed'; props: { duration_seconds: number } }

  // Trips (logging)
  | { name: 'trip_logging_started'; props: Record<string, never> }
  | { name: 'trip_logged';          props: { trip_id: string; distance_nm: number; duration_min: number; first_trip: boolean } }
  | { name: 'trip_viewed';          props: { trip_id: string; is_own: boolean } }
  | { name: 'trip_liked';           props: { trip_id: string } }
  | { name: 'trip_commented';       props: { trip_id: string } }

  // Forum
  | { name: 'forum_thread_created'; props: { category: string; first_thread: boolean } }
  | { name: 'forum_post_created';   props: { thread_id: string; has_image: boolean; has_trip: boolean; has_mention: boolean } }
  | { name: 'forum_subscribed';     props: { thread_id: string } }
  | { name: 'forum_best_answer_marked'; props: { thread_id: string } }

  // Engagement
  | { name: 'follow_added';         props: { followed_user_id: string } }
  | { name: 'push_prompt_shown';    props: { trigger: 'manual' | 'auto' } }
  | { name: 'push_prompt_response'; props: { granted: boolean } }

  // Discovery / search
  | { name: 'search_performed';     props: { query_length: number; results: number } }
  | { name: 'island_viewed';        props: { island_slug: string } }
  | { name: 'place_viewed';         props: { place_id: string } }

  // Planera
  | { name: 'route_planned';        props: { distance_nm: number; stops: number; interests: string[] } }
  | { name: 'route_saved';          props: { route_id: string } }

  // Monetization
  | { name: 'pricing_viewed';       props: Record<string, never> }
  | { name: 'checkout_started';     props: { plan: 'monthly' | 'yearly' } }
  | { name: 'checkout_completed';   props: { plan: 'monthly' | 'yearly' } }
  | { name: 'partner_inquiry_sent'; props: { tier?: string } }

  // Errors & friction
  | { name: 'feature_friction';     props: { feature: string; reason: string } }

interface PostHogLike {
  capture: (eventName: string, properties?: Record<string, unknown>) => void
  identify?: (id: string, props?: Record<string, unknown>) => void
}

declare global {
  interface Window {
    posthog?: PostHogLike
  }
}

/**
 * Skickar ett event till PostHog. No-op om consent saknas eller posthog inte laddat.
 */
export function track<E extends SvallaEvent>(name: E['name'], props: E['props']): void {
  if (typeof window === 'undefined') return
  if (!hasAnalyticsConsent()) return
  const ph = window.posthog
  if (!ph?.capture) return
  ph.capture(name, props as Record<string, unknown>)
}

/**
 * Identifierar inloggad användare för PostHog. Anropa efter login.
 */
export function identifyUser(userId: string, traits?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  if (!hasAnalyticsConsent()) return
  const ph = window.posthog
  if (!ph?.identify) return
  ph.identify(userId, traits)
}
