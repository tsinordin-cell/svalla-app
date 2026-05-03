import Link from 'next/link'
import type { ReactNode } from 'react'

export interface BreadcrumbItem {
  /** Visible label */
  label: string
  /** Internal href. If omitted the item renders as current page (no link) */
  href?: string
  /** Optional icon rendered before label (12-14px size) */
  icon?: ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** Margin below the trail. Defaults to 12px */
  marginBottom?: number | string
  /** Optional aria label override */
  ariaLabel?: string
}

/**
 * Breadcrumb — strukturerad navigation-trail för djupa hierarkier.
 *
 * Premium-kriterier:
 * - Alltid visar trail från root till nuvarande sida
 * - Sista item är ej klickbar (current page)
 * - Använder JSON-LD BreadcrumbList för SEO
 * - Touch-targets ≥32px på mobil
 * - Inga emojis — använd icon-prop med SVG
 *
 * Usage:
 *   <Breadcrumb items={[
 *     { label: 'Hem', href: '/' },
 *     { label: 'Öar', href: '/oar' },
 *     { label: 'Sandhamn', href: '/o/sandhamn' },
 *     { label: 'Hamnar' }, // current — no href
 *   ]} />
 */
export default function Breadcrumb({ items, marginBottom = 12, ariaLabel = 'Brödsmulor' }: BreadcrumbProps) {
  if (items.length === 0) return null

  // JSON-LD för SEO — ger Google strukturerad data om sidans plats i hierarkin
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `https://svalla.se${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label={ariaLabel}
        style={{
          display: 'flex', alignItems: 'center', flexWrap: 'wrap',
          gap: 2, marginBottom,
          fontSize: 12.5, fontWeight: 500,
          color: 'var(--txt3)',
          lineHeight: 1.4,
        }}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          const isCurrent = isLast || !item.href

          return (
            <span key={`${item.label}-${idx}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
              {isCurrent ? (
                <span
                  aria-current="page"
                  style={{
                    color: 'var(--txt2)',
                    fontWeight: 600,
                    padding: '4px 6px',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}
                >
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href!}
                  style={{
                    color: 'var(--txt3)',
                    textDecoration: 'none',
                    padding: '4px 6px',
                    borderRadius: 6,
                    minHeight: 32,
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    transition: 'color 0.12s, background 0.12s',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--sea)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--txt3)' }}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <span aria-hidden="true" style={{ color: 'var(--txt3)', opacity: 0.55, padding: '0 1px' }}>
                  /
                </span>
              )}
            </span>
          )
        })}
      </nav>
    </>
  )
}
