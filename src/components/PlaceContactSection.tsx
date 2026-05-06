/**
 * PlaceContactSection — premium-info-sektion på plats-sidan.
 *
 * Visar telefon, hemsida, meny-länk, adress, Google-rating, Google Maps-länk,
 * Instagram. Renderar BARA fält som har data — så att en plats med bara
 * telefonnummer ser ren ut, inte fylld med tomma rubriker.
 *
 * Server Component — inga interaktiva delar utöver native <a href>-länkar.
 */
import Link from 'next/link'

interface Props {
  phone?: string | null
  email?: string | null
  website?: string | null
  menuUrl?: string | null
  instagram?: string | null
  facebook?: string | null
  formattedAddress?: string | null
  googleRating?: number | null
  googleRatingsTotal?: number | null
  googlePlaceId?: string | null
  // För Google Maps-link om google_place_id saknas
  latitude?: number | null
  longitude?: number | null
  name?: string | null
}

export default function PlaceContactSection({
  phone, email, website, menuUrl, instagram, facebook,
  formattedAddress, googleRating, googleRatingsTotal, googlePlaceId,
  latitude, longitude, name,
}: Props) {
  const hasContact = !!(phone || email || website || menuUrl || instagram || facebook)
  const hasRating = typeof googleRating === 'number' && googleRating > 0
  const hasAddress = !!(formattedAddress || (latitude && longitude))

  // Bygg Google Maps-URL — föredra place_id om vi har, annars koord
  const mapsUrl = googlePlaceId
    ? `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(googlePlaceId)}`
    : (latitude && longitude)
      ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}${name ? '&query_place_id=' + encodeURIComponent(name) : ''}`
      : null

  if (!hasContact && !hasRating && !hasAddress) return null

  return (
    <section style={{
      background: 'var(--white)',
      borderRadius: 16,
      padding: '20px 22px',
      marginTop: 18,
      boxShadow: '0 1px 6px rgba(0,45,60,0.06)',
      border: '1px solid rgba(10, 123, 140, 0.06)',
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--txt3)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: 14,
      }}>
        Information
      </div>

      {/* Google rating — top-banner-ish */}
      {hasRating && (
        <a
          href={mapsUrl ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px',
            borderRadius: 10,
            background: 'rgba(255, 196, 0, 0.08)',
            border: '1px solid rgba(255, 196, 0, 0.18)',
            textDecoration: 'none',
            marginBottom: 12,
            color: 'var(--txt)',
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 800, color: '#b48000', minWidth: 36 }}>
            {googleRating!.toFixed(1)}
          </span>
          <span aria-hidden style={{ display: 'inline-flex', gap: 2 }}>
            {Array.from({ length: 5 }, (_, i) => (
              <svg key={i} viewBox="0 0 24 24" width="14" height="14"
                fill={i < Math.round(googleRating!) ? '#f5a623' : 'none'}
                stroke="#f5a623" strokeWidth="1.6" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>
              </svg>
            ))}
          </span>
          {typeof googleRatingsTotal === 'number' && googleRatingsTotal > 0 && (
            <span style={{ fontSize: 12, color: 'var(--txt3)', marginLeft: 'auto' }}>
              {googleRatingsTotal.toLocaleString('sv-SE')} omdömen på Google
            </span>
          )}
        </a>
      )}

      {/* Adress */}
      {hasAddress && (
        <ContactRow icon="map-pin" label="Adress" content={
          mapsUrl ? (
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={LINK}>
              {formattedAddress ?? `${latitude?.toFixed(5)}, ${longitude?.toFixed(5)}`}
            </a>
          ) : (formattedAddress ?? `${latitude?.toFixed(5)}, ${longitude?.toFixed(5)}`)
        } />
      )}

      {/* Telefon */}
      {phone && (
        <ContactRow icon="phone" label="Telefon" content={
          <a href={`tel:${phone.replace(/\s/g, '')}`} style={LINK}>{phone}</a>
        } />
      )}

      {/* Email */}
      {email && (
        <ContactRow icon="mail" label="E-post" content={
          <a href={`mailto:${email}`} style={LINK}>{email}</a>
        } />
      )}

      {/* Hemsida */}
      {website && (
        <ContactRow icon="globe" label="Hemsida" content={
          <a href={website} target="_blank" rel="noopener noreferrer" style={LINK}>
            {website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </a>
        } />
      )}

      {/* Meny — egen länk om de har dedikerad menu URL */}
      {menuUrl && (
        <a
          href={menuUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 14px',
            borderRadius: 12,
            background: 'var(--accent, #c96e2a)',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 14,
            marginTop: 12,
            boxShadow: '0 2px 8px rgba(201, 110, 42, 0.25)',
          }}
        >
          <Icon name="utensils" />
          <span>Se menyn</span>
          <span style={{ marginLeft: 'auto' }}>&rarr;</span>
        </a>
      )}

      {/* Sociala */}
      {(instagram || facebook) && (
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {instagram && (
            <a
              href={`https://instagram.com/${instagram.replace(/^@/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={SOCIAL_PILL}
            >
              <Icon name="instagram" />
              Instagram
            </a>
          )}
          {facebook && (
            <a
              href={facebook.startsWith('http') ? facebook : `https://facebook.com/${facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              style={SOCIAL_PILL}
            >
              <Icon name="facebook" />
              Facebook
            </a>
          )}
        </div>
      )}

      {/* Visa i Google Maps */}
      {mapsUrl && (
        <Link
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 14,
            fontSize: 12.5,
            color: 'var(--sea, #1e5c82)',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          <Icon name="external-link" />
          Visa i Google Maps
        </Link>
      )}

      {/* Powered by Google — KRÄVS av Google ToS när vi visar deras data */}
      {(googleRating || googlePlaceId) && (
        <div style={{
          fontSize: 10.5,
          color: 'var(--txt3)',
          marginTop: 12,
          fontStyle: 'italic',
        }}>
          Information från Google Places.
        </div>
      )}
    </section>
  )
}

const LINK: React.CSSProperties = {
  color: 'var(--sea, #1e5c82)',
  textDecoration: 'none',
  fontWeight: 600,
}
const SOCIAL_PILL: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '7px 14px',
  borderRadius: 999,
  background: 'rgba(10, 123, 140, 0.08)',
  color: 'var(--txt)',
  textDecoration: 'none',
  fontSize: 12.5,
  fontWeight: 600,
}

function ContactRow({ icon, label, content }: { icon: string; label: string; content: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '8px 0',
      borderBottom: '1px solid rgba(10, 123, 140, 0.06)',
    }}>
      <div style={{ width: 18, color: 'var(--txt3)', flexShrink: 0, marginTop: 2 }}>
        <Icon name={icon} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: 'var(--txt3)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {label}
        </div>
        <div style={{ fontSize: 14, color: 'var(--txt)', marginTop: 2, wordBreak: 'break-word' }}>
          {content}
        </div>
      </div>
    </div>
  )
}

function Icon({ name }: { name: string }) {
  const props = {
    width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.8,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  }
  switch (name) {
    case 'phone':
      return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    case 'mail':
      return <svg {...props}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    case 'globe':
      return <svg {...props}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    case 'map-pin':
      return <svg {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    case 'utensils':
      return <svg {...props}><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
    case 'instagram':
      return <svg {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    case 'facebook':
      return <svg {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    case 'external-link':
      return <svg {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
    default:
      return null
  }
}
