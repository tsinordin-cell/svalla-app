/**
 * PlacePremiumHeader — den första vyn under hero-bilden.
 *
 * Detta är vad som ger plats-sidan "premium-känsla" likt thatsup.se:
 *   - STORT namn med tydlig hierarki
 *   - One-liner / tagline direkt under (säger på 2 sek vad det är)
 *   - Prominenta betygs-pills (Google + Svalla, sida vid sida)
 *   - Prisklass-badge
 *   - 4 action-pills i rad: Hemsida / Meny / Boka bord / Instagram
 *
 * Server Component — inga interaktiva delar utöver native <a href>-länkar.
 */
type PriceLevel = 'budget' | 'mellan' | 'premium' | 'lyx' | null

interface Props {
  name: string
  oneLiner?: string | null            // Kort sammanfattning (en mening)
  typeLabel?: string | null           // "Restaurang", "Krog", "Naturhamn", etc.
  island?: string | null              // För location-trail under namnet
  region?: string | null              // T.ex. "Stockholms skärgård"

  // Ratings
  googleRating?: number | null
  googleRatingsTotal?: number | null
  svallaRating?: number | null
  svallaRatingCount?: number | null

  // Pris
  priceLevel?: PriceLevel

  // Action-knappar — bara de som har data renderas
  websiteUrl?: string | null
  menuUrl?: string | null
  bookingUrl?: string | null
  instagram?: string | null           // handle utan @
}

const PRICE_LABEL: Record<NonNullable<PriceLevel>, { label: string; symbol: string }> = {
  budget: { label: 'Budget', symbol: '$' },
  mellan: { label: 'Mellanklass', symbol: '$$' },
  premium: { label: 'Premium', symbol: '$$$' },
  lyx: { label: 'Lyx', symbol: '$$$$' },
}

export default function PlacePremiumHeader({
  name, oneLiner, typeLabel, island, region,
  googleRating, googleRatingsTotal, svallaRating, svallaRatingCount,
  priceLevel,
  websiteUrl, menuUrl, bookingUrl, instagram,
}: Props) {
  const hasGoogle = typeof googleRating === 'number' && googleRating > 0
  const hasSvalla = typeof svallaRating === 'number' && svallaRating > 0
  const price = priceLevel ? PRICE_LABEL[priceLevel] : null
  const locationLabel = [typeLabel, island, region].filter(Boolean).join(' · ')

  // Bygg lista med aktiva action-knappar
  const actions: Array<{ key: string; label: string; href: string; primary?: boolean; icon: string }> = []
  if (bookingUrl) actions.push({ key: 'boka', label: 'Boka bord', href: bookingUrl, primary: true, icon: 'calendar' })
  if (menuUrl) actions.push({ key: 'meny', label: 'Meny', href: menuUrl, icon: 'utensils' })
  if (websiteUrl) actions.push({ key: 'hemsida', label: 'Hemsida', href: websiteUrl, icon: 'globe' })
  if (instagram) actions.push({
    key: 'instagram',
    label: 'Instagram',
    href: `https://instagram.com/${instagram.replace(/^@/, '')}`,
    icon: 'instagram',
  })

  return (
    <section style={{
      background: 'var(--white)',
      borderRadius: 20,
      padding: '22px 22px 18px',
      marginTop: -28,                  // Lyfter över hero-botten för en sömlös övergång
      marginBottom: 14,
      boxShadow: '0 6px 24px rgba(0,45,60,0.08)',
      border: '1px solid rgba(10,123,140,0.06)',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Location-trail uppåt — diskret men ger orientering */}
      {locationLabel && (
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--txt3)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          {locationLabel}
        </div>
      )}

      {/* STORT namn */}
      <h1 style={{
        fontSize: 28,
        fontWeight: 800,
        color: 'var(--txt)',
        lineHeight: 1.1,
        margin: '0 0 8px',
        letterSpacing: '-0.01em',
      }}>
        {name}
      </h1>

      {/* One-liner — säger på 2 sek vad platsen är */}
      {oneLiner && (
        <p style={{
          fontSize: 14.5,
          color: 'var(--txt2)',
          lineHeight: 1.5,
          margin: '0 0 14px',
        }}>
          {oneLiner}
        </p>
      )}

      {/* Rating + prisklass-rad */}
      {(hasGoogle || hasSvalla || price) && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: actions.length > 0 ? 16 : 0,
        }}>
          {hasGoogle && (
            <RatingPill
              value={googleRating!}
              count={googleRatingsTotal ?? undefined}
              source="Google"
              color="#f5a623"
              bg="rgba(245, 166, 35, 0.10)"
              border="rgba(245, 166, 35, 0.22)"
            />
          )}
          {hasSvalla && (
            <RatingPill
              value={svallaRating!}
              count={svallaRatingCount ?? undefined}
              source="Svalla"
              color="var(--sea)"
              bg="rgba(10, 123, 140, 0.08)"
              border="rgba(10, 123, 140, 0.18)"
            />
          )}
          {price && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px',
              borderRadius: 999,
              background: 'rgba(45, 125, 138, 0.08)',
              border: '1px solid rgba(45, 125, 138, 0.16)',
              fontSize: 12.5,
              fontWeight: 700,
              color: 'var(--txt2)',
            }}>
              <span style={{ fontWeight: 800, color: 'var(--sea)' }}>{price.symbol}</span>
              <span style={{ color: 'var(--txt3)' }}>{price.label}</span>
            </div>
          )}
        </div>
      )}

      {/* Action-knappar — 4 snabbåtkomst-pills */}
      {actions.length > 0 && (
        <div style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginTop: 4,
        }}>
          {actions.map(a => (
            <a
              key={a.key}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: '1 1 calc(50% - 4px)',
                minWidth: 140,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 14px',
                borderRadius: 12,
                background: a.primary ? 'var(--accent, #c96e2a)' : 'rgba(10, 123, 140, 0.06)',
                border: a.primary ? 'none' : '1px solid rgba(10, 123, 140, 0.12)',
                color: a.primary ? '#fff' : 'var(--txt)',
                textDecoration: 'none',
                fontSize: 13.5,
                fontWeight: 700,
                boxShadow: a.primary ? '0 2px 10px rgba(201, 110, 42, 0.30)' : 'none',
                transition: 'transform 120ms ease, box-shadow 120ms ease',
              }}
            >
              <ActionIcon name={a.icon} primary={!!a.primary} />
              <span>{a.label}</span>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

// ─── Rating-pill ────────────────────────────────────────────────────────────

function RatingPill({ value, count, source, color, bg, border }: {
  value: number; count?: number; source: string;
  color: string; bg: string; border: string;
}) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px 6px 10px',
      borderRadius: 999,
      background: bg,
      border: `1px solid ${border}`,
      fontSize: 12.5,
      color: 'var(--txt2)',
    }}>
      <svg viewBox="0 0 24 24" width="14" height="14" fill={color} stroke="none" aria-hidden>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>
      </svg>
      <span style={{ fontWeight: 800, color: 'var(--txt)', letterSpacing: '-0.01em' }}>
        {value.toFixed(1)}
      </span>
      {typeof count === 'number' && count > 0 && (
        <span style={{ color: 'var(--txt3)' }}>
          ({count.toLocaleString('sv-SE')})
        </span>
      )}
      <span style={{
        marginLeft: 2,
        fontSize: 10,
        fontWeight: 700,
        color: 'var(--txt3)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        {source}
      </span>
    </div>
  )
}

// ─── Action-ikoner ──────────────────────────────────────────────────────────

function ActionIcon({ name, primary }: { name: string; primary: boolean }) {
  const props = {
    width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none',
    stroke: primary ? '#fff' : 'var(--sea)',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (name) {
    case 'calendar':
      return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    case 'utensils':
      return <svg {...props}><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
    case 'globe':
      return <svg {...props}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    case 'instagram':
      return <svg {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    default:
      return null
  }
}
