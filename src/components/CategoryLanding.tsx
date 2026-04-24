import Link from 'next/link'
import type { ReactNode } from 'react'
import SvallaLogo from '@/components/SvallaLogo'

/**
 * CategoryLanding — delad mall för SEO-landningssidor under dropdown-menyn.
 * Server component. Renderar hero + intro + grid + CTA + relaterat.
 *
 * Används av /resmal, /aktiviteter, /boende, /krogar-och-mat osv.
 * Copy är helt under kontroll av sidan som renderar — denna komponent
 * står enbart för layout och visuell konsistens.
 */

export type LandingItem = {
  title: string
  description: string
  href: string
  /** Valfri emoji/unicode-prefix (⚓, 🍽️ etc). För SEO spelar ikoner roll bara om de har aria-label. */
  icon?: string
  /** Valfri subtext (ex: "38 platser", "Sommar 2026") */
  meta?: string
}

export type RelatedLink = {
  label: string
  href: string
}

export type CategoryLandingProps = {
  /** Ikon som SVG-children i hero-pillen (24×24). */
  heroIcon: ReactNode
  /** Huvudrubrik på sidan (H1). */
  title: string
  /** Eyebrow ovanför titeln — kategorin ("Kategori", "Tur", "Snabbval"). */
  eyebrow: string
  /** Kort sammanfattning under H1 (120–160 tecken för SEO). */
  tagline: string
  /** Gradient för hero-banner — två hex-färger, standard är Svalla-blå. */
  heroGradient?: [string, string]
  /** Intro-sektion — 1–3 st <p>-element med brödtext. */
  intro: ReactNode
  /** Huvudgrid med kort. */
  items: LandingItem[]
  /** Rubrik ovanför grid. */
  itemsTitle?: string
  /** Kort beskrivning under items-titel. */
  itemsDescription?: string
  /** Sekundär sektion med extra innehåll — t.ex. FAQ, tips, insikter. */
  deeperContent?: ReactNode
  /** CTA-länk. Standard är "Utforska på kartan" → /platser. */
  cta?: { label: string; href: string; secondaryLabel?: string; secondaryHref?: string }
  /** Relaterade sidor längst ner. */
  related?: RelatedLink[]
}

export default function CategoryLanding(props: CategoryLandingProps) {
  const {
    heroIcon,
    title,
    eyebrow,
    tagline,
    heroGradient = ['#1e5c82', '#2d7d8a'],
    intro,
    items,
    itemsTitle = 'Populärt just nu',
    itemsDescription,
    deeperContent,
    cta = { label: 'Öppna kartan', href: '/platser', secondaryLabel: 'Kom igång gratis', secondaryHref: '/kom-igang' },
    related,
  } = props

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 96 }}>
      {/* HERO */}
      <header
        style={{
          background: `linear-gradient(160deg, ${heroGradient[0]} 0%, ${heroGradient[1]} 100%)`,
          padding: '52px 20px 44px',
        }}
      >
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 18 }}>
            <SvallaLogo height={26} color="#ffffff" />
          </Link>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.14)',
              border: '1px solid rgba(255,255,255,0.22)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.6,
              color: '#fff',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 28,
                height: 28,
                marginLeft: -6,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.18)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              {heroIcon}
            </span>
            {eyebrow}
          </div>

          <h1
            style={{
              fontSize: 'clamp(30px, 4.6vw, 44px)',
              fontWeight: 700,
              color: '#fff',
              margin: '0 0 10px',
              letterSpacing: -0.4,
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.86)',
              fontSize: 16,
              margin: 0,
              maxWidth: 680,
              lineHeight: 1.55,
            }}
          >
            {tagline}
          </p>
        </div>
      </header>

      {/* INTRO */}
      <section
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '36px 20px 10px',
          color: 'var(--txt)',
          fontSize: 16,
          lineHeight: 1.65,
        }}
      >
        {intro}
      </section>

      {/* HIGHLIGHTS GRID */}
      <section style={{ maxWidth: 1040, margin: '0 auto', padding: '24px 20px 8px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto 20px' }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--txt)',
              margin: '0 0 6px',
              letterSpacing: -0.2,
            }}
          >
            {itemsTitle}
          </h2>
          {itemsDescription && (
            <p style={{ color: 'var(--txt2)', fontSize: 14, margin: 0, lineHeight: 1.55 }}>
              {itemsDescription}
            </p>
          )}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 14,
          }}
        >
          {items.map(it => (
            <LandingCard key={it.href + it.title} item={it} accent={heroGradient[0]} />
          ))}
        </div>
      </section>

      {/* DEEPER CONTENT */}
      {deeperContent && (
        <section
          style={{
            maxWidth: 760,
            margin: '0 auto',
            padding: '40px 20px 10px',
            color: 'var(--txt)',
            fontSize: 15,
            lineHeight: 1.7,
          }}
        >
          {deeperContent}
        </section>
      )}

      {/* CTA */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '36px 20px 10px' }}>
        <div
          style={{
            background: 'var(--white)',
            borderRadius: 18,
            padding: '24px 24px',
            boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 14,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>
              Vill du ha allt i en app?
            </div>
            <div style={{ fontSize: 13, color: 'var(--txt2)' }}>
              Spara favoriter, logga turer och upptäck skärgården med hundratusentals andra.
            </div>
          </div>
          <div style={{ display: 'inline-flex', gap: 8 }}>
            {cta.secondaryLabel && cta.secondaryHref && (
              <Link
                href={cta.secondaryHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 44,
                  padding: '0 16px',
                  borderRadius: 10,
                  background: 'transparent',
                  color: 'var(--sea)',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '1px solid var(--sea)',
                }}
              >
                {cta.secondaryLabel}
              </Link>
            )}
            <Link
              href={cta.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 44,
                padding: '0 18px',
                borderRadius: 10,
                background: heroGradient[0],
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              {cta.label} →
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related && related.length > 0 && (
        <nav
          aria-label="Relaterade sidor"
          style={{ maxWidth: 760, margin: '0 auto', padding: '34px 20px 0' }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--txt3)',
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              marginBottom: 10,
            }}
          >
            Relaterat
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {related.map(r => (
              <Link
                key={r.href}
                href={r.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 34,
                  padding: '0 12px',
                  borderRadius: 999,
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  color: 'var(--txt2)',
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                {r.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}

function LandingCard({ item, accent }: { item: LandingItem; accent: string }) {
  return (
    <Link
      href={item.href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: '18px 18px 16px',
        borderRadius: 14,
        background: 'var(--white)',
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
        border: '1px solid var(--border)',
        textDecoration: 'none',
        transition: 'transform 120ms ease, box-shadow 120ms ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {item.icon && (
          <span
            aria-hidden
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: `${accent}14`,
              color: accent,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 17,
            }}
          >
            {item.icon}
          </span>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', lineHeight: 1.3 }}>
            {item.title}
          </div>
          {item.meta && (
            <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>{item.meta}</div>
          )}
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
        {item.description}
      </p>
    </Link>
  )
}
