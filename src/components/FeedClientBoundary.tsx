'use client'

import { Component, ReactNode } from 'react'
import * as Sentry from '@sentry/nextjs'

type Props = { children: ReactNode }
type State = { hasError: boolean; err?: Error }

/**
 * Klient-sidig error boundary för feed-innehållet.
 *
 * Motivation: en krasch i en enskild TripCard (t.ex. next/image,
 * oväntad null, trasig avatar) bubblar annars hela vägen upp till
 * app/feed/error.tsx och visar "Flödet kunde inte laddas" för hela
 * sidan. Boundaryn fångar det på klient-sidan och visar bara ett
 * litet inline-fel med en reload-knapp — resten av feeden lever.
 */
export default class FeedClientBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, err }
  }

  componentDidCatch(err: Error, info: { componentStack?: string }) {
    // Logga i både konsol och Sentry för diagnostik
    console.error('[FeedClientBoundary] caught:', err, info)
    try { Sentry.captureException(err, { extra: { componentStack: info.componentStack } }) } catch {}
  }

  reset = () => this.setState({ hasError: false, err: undefined })

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div
        role="alert"
        style={{
          background: 'var(--white)',
          borderRadius: 16,
          padding: '20px 22px',
          margin: '12px 0',
          border: '1px solid rgba(201,110,42,0.25)',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>
          Ett kort kunde inte visas
        </div>
        <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.5 }}>
          Resten av flödet fungerar. Vi har loggat felet och tittar på det.
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={this.reset}
            style={{
              padding: '8px 14px', borderRadius: 10, border: 'none',
              background: 'var(--sea)', color: '#fff',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Försök igen
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 14px', borderRadius: 10,
              border: '1px solid rgba(10,123,140,0.25)',
              background: 'transparent', color: 'var(--txt2)',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Ladda om sidan
          </button>
        </div>
      </div>
    )
  }
}
