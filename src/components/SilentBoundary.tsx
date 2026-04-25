'use client'

/**
 * SilentBoundary — minimal React error boundary som tyst returnerar null
 * vid render-krasch. Används för att skydda icke-kritiska client-komponenter
 * i feed/page.tsx (StoriesStrip, SuggestedUsers, NotificationBell m.fl.)
 * så att en krasch i dem INTE triggar feed/error.tsx.
 */
import { Component, type ReactNode } from 'react'

interface State { hasError: boolean }

export default class SilentBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(err: Error, info: { componentStack: string }) {
    // Logga till konsolen men låt aldrig bubbla vidare
    console.error('[SilentBoundary] caught render error:', err?.message, info?.componentStack?.slice(0, 200))
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}
