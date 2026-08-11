import Link from 'next/link'

/**
 * IslandB2BCTA — passiv B2B-lead-insamling på varje ösida.
 * Visas för restauranger, gästhamnar och upplevelse-aktörer
 * som söker upp sin egen ö på Svalla.
 *
 * Server component — tar emot islandName + slug
 * för pre-ifylld mailto-subject.
 */
interface Props {
  islandName: string
  islandSlug: string
}

export default function IslandB2BCTA({ islandName, islandSlug: _islandSlug }: Props) {
  const mailSubject = encodeURIComponent(`Partnerförfrågan – ${islandName}`)
  const mailHref = `mailto:info@svalla.se?subject=${mailSubject}`

  return (
    <section
      aria-label={`Aktör på ${islandName} – lista din verksamhet`}
      style={{
        margin: '48px 0 0',
        background: 'linear-gradient(135deg, rgba(26,74,107,0.05) 0%, rgba(10,123,140,0.05) 100%)',
        borderRadius: 18,
        border: '1px solid rgba(10,123,140,0.12)',
        padding: '24px 24px 22px',
        display: 'flex',
        gap: 18,
        alignItems: 'flex-start',
      }}
    >
      {/* Ikon */}
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: 'linear-gradient(135deg, #1a4a6b, #0a7b8c)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>

      {/* Text + CTA */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--sea, #0a7b8c)',
          margin: '0 0 5px',
        }}>
          Aktör på {islandName}?
        </p>
        <p style={{
          fontSize: 14,
          color: 'var(--txt2, rgba(0,0,0,0.6))',
          margin: '0 0 14px',
          lineHeight: 1.6,
        }}>
          Lista din restaurang, gästhamn eller upplevelse gratis på Svalla — syns för tusentals båtfolk som planerar hit.
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link
            href="/partner"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 18px',
              background: 'linear-gradient(135deg, #1a4a6b, #0a7b8c)',
              color: '#fff',
              borderRadius: 22,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            Kom igång gratis →
          </Link>
          <a
            href={mailHref}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 16px',
              background: 'transparent',
              color: 'var(--sea, #0a7b8c)',
              border: '1px solid rgba(10,123,140,0.3)',
              borderRadius: 22,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Skriv till oss
          </a>
        </div>
      </div>
    </section>
  )
}
