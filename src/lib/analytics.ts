'use client'

import posthog from 'posthog-js'

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  try {
    posthog.capture(event, properties)
  } catch {}
}

// Typed helpers for custom events
export const analytics = {
  tripStarted: (props?: { method?: 'gps' | 'manual' }) =>
    trackEvent('trip_started', props),
  tripSaved: (props?: {
    has_ai_analysis?: boolean
    has_photos?: boolean
    duration_seconds?: number
  }) => trackEvent('trip_saved', props),
  islandMarkedVisited: (props?: {
    island_slug?: string
    island_name?: string
  }) => trackEvent('island_marked_visited', props),
  aiAnalysisRequested: (props?: { source?: 'spara' | 'manuell' }) =>
    trackEvent('ai_analysis_requested', props),
  forumPostCreated: (props?: { category?: string }) =>
    trackEvent('forum_post_created', props),
  searchPerformed: (props?: { query?: string; results_count?: number }) =>
    trackEvent('search_performed', props),
  planDayTap: (props?: { source?: 'upptack' | 'platser' | 'island' }) =>
    trackEvent('plan_day_tap', props),
}
