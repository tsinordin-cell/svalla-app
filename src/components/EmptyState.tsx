import type { ReactNode } from 'react'
import Link from 'next/link'
import { radius, fontSize, fontWeight, space } from '@/lib/tokens'

interface EmptyStateProps {
  /** SVG or emoji node — rendered at 28×28 inside the icon container */
  icon?: ReactNode
  title: string
  body?: string
  cta?: { label: string; href?: string; onClick?: () => void }
  /** Extra top margin. Defaults to 'auto' (vertically centres inside flex parent). */
  marginTop?: number | string
}

/**
 * Standardised empty state — 64px icon container, title, muted body, optional CTA pill.
 * Usage:
 *   <EmptyState
 *     icon={<svg>…</svg>}
 *     title="Inga turer ännu"
 *     body="Logga din första tur för att se den här."
 *     cta={{ label: 'Logga tur', href: '/logga' }}
 *   />
 */
export default function EmptyState({ icon, title, body, cta, marginTop = 'auto' }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', padding: `${space[8]}px ${space[6]}px`,
      marginTop,
    }}>
      {/* Icon container */}
      {icon && (
        <div style={{
          width: 64, height: 64, borderRadius: radius.md,
          background: 'rgba(10,123,140,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: space[4],
          color: 'var(--sea)',
        }}>
          <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </div>
        </div>
      )}

      {/* Title */}
      <h3 style={{
        margin: 0,
        fontSize: fontSize.subtitle,
        fontWeight: fontWeight.semibold,
        color: 'var(--txt)',
        lineHeight: 1.3,
        marginBottom: body ? space[2] : 0,
      }}>
        {title}
      </h3>

      {/* Body */}
      {body && (
        <p style={{
          margin: 0,
          fontSize: fontSize.body,
          fontWeight: fontWeight.regular,
          color: 'var(--txt3)',
          lineHeight: 1.55,
          maxWidth: 280,
          marginBottom: cta ? space[5] : 0,
        }}>
          {body}
        </p>
      )}

      {/* CTA pill */}
      {cta && (
        cta.href ? (
          <Link href={cta.href} style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: 44, paddingInline: space[6],
            borderRadius: radius.full,
            background: 'var(--sea)',
            color: '#fff',
            fontSize: fontSize.small,
            fontWeight: fontWeight.semibold,
            textDecoration: 'none',
            letterSpacing: '0.1px',
            WebkitTapHighlightColor: 'transparent',
          }}>
            {cta.label}
          </Link>
        ) : (
          <button onClick={cta.onClick} style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: 44, paddingInline: space[6],
            borderRadius: radius.full,
            background: 'var(--sea)',
            color: '#fff',
            fontSize: fontSize.small,
            fontWeight: fontWeight.semibold,
            border: 'none', cursor: 'pointer',
            letterSpacing: '0.1px',
            WebkitTapHighlightColor: 'transparent',
          }}>
            {cta.label}
          </button>
        )
      )}
    </div>
  )
}
