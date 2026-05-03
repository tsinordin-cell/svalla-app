import Link from 'next/link'
import type { ReactNode } from 'react'
import SvallaLogo from './SvallaLogo'
import Breadcrumb from './Breadcrumb'

export type IslandSubPageTab = 'boende' | 'hamnar' | 'restauranger'

const TAB_LABEL: Record<IslandSubPageTab, string> = {
  boende: 'Boende',
  hamnar: 'Hamnar',
  restauranger: 'Restauranger',
}

interface IslandSubPageHeaderProps {
  island: {
    name: string
    slug: string
    regionLabel?: string
  }
  /** Vilken sub-sida vi är på — sätter aktiv tab och breadcrumb sista item */
  tab: IslandSubPageTab
  /** Optional egen rubrik. Default: "<TabLabel> på <Island>" */
  title?: string
  /** Optional sub-text under rubriken */
  subtitle?: ReactNode
}

/**
 * IslandSubPageHeader — delad header för /o/[slug]/{boende,hamnar,restauranger}.
 *
 * Tidigare: 3 sub-sidor återskapade headern med inline styles → inkonsistent.
 * Nu: en källa till sanning, samma typografi och spacing över alla tre.
 *
 * Innehåller:
 * - Top-nav med logo + tillbaka-länk
 * - Breadcrumb (Hem / Öar / Sandhamn / Hamnar)
 * - Hero med region-label + Playfair-rubrik
 * - Sub-tab-rad (markerar aktiv tab) — döljs på mobil <420px för att spara plats
 */
export default function IslandSubPageHeader({ island, tab, title, subtitle }: IslandSubPageHeaderProps) {
  const heading = title ?? `${TAB_LABEL[tab]} på ${island.name}`

  return (
    <>
      {/* Top nav strip — logo + tillbaka */}
      <nav style={{
        background: 'var(--grad-sea-hero)',
        padding: '18px 24px 16px',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link
            href={`/o/${island.slug}`}
            style={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: 12, fontWeight: 600,
              textDecoration: 'none',
              padding: '6px 10px', borderRadius: 8,
              display: 'inline-flex', alignItems: 'center', gap: 4,
              transition: 'color 0.12s, background 0.12s',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            {island.name}-guiden
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header style={{
        background: 'var(--grad-sea-hero)',
        padding: '32px 24px 56px', color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Breadcrumb i ljus stil — använder den vanliga komponenten men override-färgar via wrapper */}
          <div className="island-subpage-breadcrumb" style={{ marginBottom: 16 }}>
            <Breadcrumb
              items={[
                { label: 'Hem', href: '/' },
                { label: 'Öar', href: '/oar' },
                { label: island.name, href: `/o/${island.slug}` },
                { label: TAB_LABEL[tab] },
              ]}
              marginBottom={0}
            />
          </div>

          {island.regionLabel && (
            <div style={{
              fontSize: 11, opacity: 0.82,
              letterSpacing: 1.2, textTransform: 'uppercase',
              marginBottom: 8, fontWeight: 600,
            }}>
              {island.regionLabel} · {island.name}
            </div>
          )}
          <h1 style={{
            fontSize: 'clamp(28px, 5.5vw, 36px)',
            fontWeight: 700, margin: 0,
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: '-0.01em', lineHeight: 1.15,
          }}>
            {heading}
          </h1>
          {subtitle && (
            <p style={{
              fontSize: 16, opacity: 0.88,
              marginTop: 12, marginBottom: 0,
              maxWidth: 540, lineHeight: 1.55,
            }}>
              {subtitle}
            </p>
          )}

          {/* Sub-tab-rad — visar alla tre tabs med aktiv markerad */}
          <div style={{
            display: 'flex', gap: 6, marginTop: 24, flexWrap: 'wrap',
          }}>
            {(Object.keys(TAB_LABEL) as IslandSubPageTab[]).map(key => {
              const isActive = key === tab
              return (
                <Link
                  key={key}
                  href={`/o/${island.slug}/${key}`}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    padding: '7px 14px', borderRadius: 999,
                    fontSize: 12.5, fontWeight: 600,
                    textDecoration: 'none',
                    background: isActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.10)',
                    color: isActive ? 'var(--sea-d)' : 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(255,255,255,0.16)',
                    transition: 'background 0.14s, color 0.14s',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {TAB_LABEL[key]}
                </Link>
              )
            })}
          </div>
        </div>
      </header>

      {/* Override Breadcrumb-färger lokalt — den interna komponenten antar txt3
          vilket är osynligt mot mörk hero. */}
      <style>{`
        .island-subpage-breadcrumb nav,
        .island-subpage-breadcrumb a,
        .island-subpage-breadcrumb span[aria-current="page"] {
          color: rgba(255,255,255,0.85) !important;
        }
        .island-subpage-breadcrumb a:hover {
          color: #fff !important;
        }
      `}</style>
    </>
  )
}
