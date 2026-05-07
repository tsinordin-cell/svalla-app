'use client'
/**
 * PlaceActionPill — klient-wrapper kring en action-knapp i PlacePremiumHeader
 * (Boka, Meny, Hemsida, Instagram). Skickar `action_pill_clicked` till analytics
 * när användaren klickar.
 *
 * Vi öppnar inte länken manuellt — låter <a target="_blank"> hantera det.
 * Att enbart skicka event:et i onClick är safe även om navigationen
 * sker innan fetch hinner färdas (vi använder keepalive i track()).
 */
import type { ReactNode } from 'react'
import { track } from '@/lib/analytics-events'

type ActionKey = 'boka' | 'meny' | 'hemsida' | 'instagram'

interface Props {
  href: string
  action: ActionKey
  placeId: string
  primary?: boolean
  children: ReactNode
}

export default function PlaceActionPill({ href, action, placeId, primary, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('action_pill_clicked', { action, place_id: placeId })}
      style={{
        flex: '1 1 calc(50% - 4px)',
        minWidth: 140,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '12px 14px',
        borderRadius: 12,
        background: primary ? 'var(--accent, #c96e2a)' : 'rgba(10, 123, 140, 0.06)',
        border: primary ? 'none' : '1px solid rgba(10, 123, 140, 0.12)',
        color: primary ? '#fff' : 'var(--txt)',
        textDecoration: 'none',
        fontSize: 13.5,
        fontWeight: 700,
        boxShadow: primary ? '0 2px 10px rgba(201, 110, 42, 0.30)' : 'none',
        transition: 'transform 120ms ease, box-shadow 120ms ease',
      }}
    >
      {children}
    </a>
  )
}
