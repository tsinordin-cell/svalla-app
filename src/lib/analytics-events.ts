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

  // Sidvisning — generisk, fyras vid varje route-byte. Ger oss trafiksiffror
  // i vår egen tabell (inte bara i PostHog) så /admin/malet kan räkna själv.
  | { name: 'page_viewed';          props: { path: string } }

  // Discovery / search
  | { name: 'search_performed';     props: { query: string; query_length: number; results: number; surface?: string } }
  | { name: 'island_viewed';        props: { island_slug: string } }
  | { name: 'place_viewed';         props: { place_id: string } }

  // Planera
  | { name: 'route_planned';        props: { distance_nm: number; stops: number; interests: string[] } }
  | { name: 'route_saved';          props: { route_id: string } }

  // Min dag
  | { name: 'dag_pill_clicked';     props: { from: 'upptack_topbar' | 'feed' | 'island_page' | 'other' } }
  | { name: 'dag_page_viewed';      props: Record<string, never> }
  | { name: 'dag_position_set';     props: { source: 'gps' | 'fallback'; label?: string } }
  | { name: 'dag_plan_generated';   props: { stops: number; total_km: number; total_min: number } }
  | { name: 'dag_save_clicked';     props: { stops: number } }
  | { name: 'dag_plan_saved';       props: { plan_id: string; stops: number } }
  | { name: 'dag_save_failed';      props: { reason: 'auth' | 'server' | 'network' } }

  // Monetization
  | { name: 'pricing_viewed';       props: { source?: string; is_pro: boolean } }
  | { name: 'checkout_started';     props: { plan: 'month' | 'year' } }
  | { name: 'checkout_completed';   props: { plan: 'month' | 'year' } }
  | { name: 'partner_inquiry_sent'; props: { tier?: string } }

  // Errors & friction
  | { name: 'feature_friction';     props: { feature: string; reason: string } }
  | { name: 'paywall_hit';          props: { feature: string } }

  // ── Plats-sida actions (instrumenterade 2026-05-07) ──────────────────────
  // Kritiska för att förstå conversion på /upptack/[id].
  | { name: 'share_clicked';        props: { surface: string; entity_id?: string } }
  | { name: 'directions_clicked';   props: { place_id: string } }
  | { name: 'action_pill_clicked';  props: { action: 'boka' | 'meny' | 'hemsida' | 'instagram'; place_id: string } }
  | { name: 'filter_changed';       props: { surface: 'upptack' | 'sok' | 'other'; filter: string; value: string } }
  | { name: 'bookmark_toggled';     props: { entity_type: 'restaurant' | 'route'; entity_id: string; saved: boolean } }

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
 * Skickar ett event till BÅDE PostHog och vår egen analytics_events-tabell.
 *
 * - PostHog är primary (för funnels, retention, dashboards i deras UI)
 * - Vår egen tabell läses av /admin/insikter för snabba SQL-queries
 *   (t.ex. "top 10 mest besökta platser senaste 7d")
 *
 * No-op om consent saknas. Båda anrop är fire-and-forget — ett misslyckas
 * tyst utan att blockera den andra eller UI-tråden.
 */
export function track<E extends SvallaEvent>(name: E['name'], props: E['props']): void {
  if (typeof window === 'undefined') return
  if (!hasAnalyticsConsent()) return

  // 1) PostHog (primary)
  const ph = window.posthog
  if (ph?.capture) ph.capture(name, props as Record<string, unknown>)

  // 2) Egen lagring för admin-dashboard. Async, ingen await — events
  //    får inte blockera klick. Felfri-tyst om endpoint är nere.
  try {
    const sessionId = getOrCreateSessionId()
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: name,
        props,
        sessionId,
        path: window.location.pathname,
      }),
      // keepalive så event skickas även vid page-unload
      keepalive: true,
    }).catch(() => { /* tyst */ })
  } catch { /* tyst */ }
}

/** Anonym session-id i sessionStorage. Återanvänds över page navigations
 *  inom samma flik så vi kan se "session-flow" i admin-vyn. */
function getOrCreateSessionId(): string {
  try {
    const KEY = 'svalla_session_id'
    let id = sessionStorage.getItem(KEY)
    if (!id) {
      id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
      sessionStorage.setItem(KEY, id)
    }
    return id
  } catch {
    return 'no-session'
  }
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
