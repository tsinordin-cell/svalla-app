/**
 * LoppisListingCard — premium Blocket-style annons för forum-trådar i
 * Loppis-kategorin. Server component, läser listing_data från forum_threads.
 *
 * Layout (mobile-first):
 *   1. Bildgalleri 4:3 (LoppisListingGallery — client)
 *   2. Pris-banner (stort, accent-färg)
 *   3. Titel
 *   4. Plats + datum
 *   5. Specs-grid (2-col)
 *   6. Beskrivning (renderForumBody)
 *   7. Extern länk-knapp (om finns)
 *   8. Säljarkort med Kontakta-CTA
 */
import Link from 'next/link'
import Image from 'next/image'
import LoppisListingGallery from './LoppisListingGallery'
import LoppisImageEditor from './LoppisImageEditor'
import LoppisStatusToggle from './LoppisStatusToggle'
import { renderForumBody } from '@/lib/forum-render'
import { formatForumDate } from '@/lib/forum-utils'

export type ListingStatus = 'aktiv' | 'reserverad' | 'sald'

export interface ListingData {
  price?: number
  currency?: string
  condition?: string
  category?: string
  images?: string[]
  specs?: Array<{ label: string; value: string }>
  location?: string
  external_link?: string
  status?: ListingStatus
}

interface Props {
  threadId: string
  title: string
  body: string
  createdAt: string
  listing: ListingData
  author: { id: string; username: string; avatar: string | null } | null
  isOwner?: boolean
  /** Null när användaren inte är inloggad — vi visar då login-prompt istället för Kontakta. */
  currentUserId?: string | null
}

function formatPrice(price?: number, currency = 'SEK'): string {
  if (typeof price !== 'number' || !Number.isFinite(price)) return 'Pris på förfrågan'
  if (price === 0) return 'Skänkes'
  // Svensk format: 150 000 kr (mellanslag som tusentalsavgränsare)
  const formatted = new Intl.NumberFormat('sv-SE').format(price)
  return `${formatted} ${currency === 'SEK' ? 'kr' : currency}`
}

export default function LoppisListingCard({
  threadId, title, body, createdAt, listing, author, isOwner = false, currentUserId = null,
}: Props) {
  const isLoggedIn = !!currentUserId
  const status: ListingStatus = listing.status ?? 'aktiv'
  const images = Array.isArray(listing.images) ? listing.images : []
  const specs = Array.isArray(listing.specs) ? listing.specs.filter(s => s.label && s.value) : []
  const isSold = status === 'sald'

  return (
    <article style={{
      maxWidth: 760,
      margin: '0 auto',
      padding: '0 16px',
      // Bevarar specs-tabellens uppfattbara struktur
    }}>
      {/* ── Bildgalleri ── */}
      <div style={{ marginBottom: 18, opacity: isSold ? 0.78 : 1 }}>
        <LoppisListingGallery images={images} alt={title} status={status} />
      </div>

      {/* ── Bild-editor + status-toggle (bara ägaren) ── */}
      {isOwner && (
        <>
          <LoppisImageEditor threadId={threadId} initialImages={images} />
          <LoppisStatusToggle threadId={threadId} initialStatus={status} />
        </>
      )}

      {/* ── Pris + status ── */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 12, marginBottom: 6,
      }}>
        <div style={{
          fontSize: 30, fontWeight: 800, color: 'var(--acc, #c96e2a)',
          letterSpacing: '-0.5px', lineHeight: 1.1,
        }}>
          {formatPrice(listing.price, listing.currency)}
        </div>
        {listing.category && (
          <div style={{
            background: 'rgba(10,123,140,0.10)',
            color: 'var(--sea)',
            padding: '4px 10px', borderRadius: 8,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.4px',
            textTransform: 'uppercase', whiteSpace: 'nowrap',
            alignSelf: 'flex-start', marginTop: 6,
          }}>
            {listing.category}
          </div>
        )}
      </div>

      {/* ── Titel ── */}
      <h1 style={{
        fontSize: 24, fontWeight: 700, color: 'var(--txt)',
        margin: '0 0 8px', lineHeight: 1.25, letterSpacing: '-0.3px',
      }}>
        {title}
      </h1>

      {/* ── Plats + datum + skick ── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '6px 12px',
        fontSize: 13, color: 'var(--txt3)', marginBottom: 18,
      }}>
        {listing.location && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {listing.location}
          </span>
        )}
        <span>·</span>
        <span>{formatForumDate(createdAt)}</span>
        {listing.condition && (
          <>
            <span>·</span>
            <span style={{ color: 'var(--sea)', fontWeight: 600 }}>{listing.condition}</span>
          </>
        )}
      </div>

      {/* ── Specs-grid ── */}
      {specs.length > 0 && (
        <div style={{
          background: 'var(--card-bg, #fff)',
          border: '1px solid var(--border, rgba(10,123,140,0.10))',
          borderRadius: 14,
          padding: 16,
          marginBottom: 18,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--txt3)',
            letterSpacing: '0.6px', textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Specifikationer
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px 18px',
          }}>
            {specs.map((s, i) => (
              <div key={i}>
                <div style={{
                  fontSize: 11, color: 'var(--txt3)',
                  textTransform: 'uppercase', letterSpacing: '0.4px',
                  marginBottom: 2, fontWeight: 600,
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontSize: 14, color: 'var(--txt)', fontWeight: 600,
                  wordBreak: 'break-word',
                }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Beskrivning ── */}
      {body && body.trim().length > 0 && (
        <div style={{
          background: 'var(--card-bg, #fff)',
          border: '1px solid var(--border, rgba(10,123,140,0.10))',
          borderRadius: 14,
          padding: 18,
          marginBottom: 18,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          fontSize: 15, color: 'var(--txt)', lineHeight: 1.6,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--txt3)',
            letterSpacing: '0.6px', textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            Beskrivning
          </div>
          {renderForumBody(body)}
        </div>
      )}

      {/* ── Extern länk ── */}
      {listing.external_link && (
        <a
          href={listing.external_link}
          target="_blank"
          rel="noopener nofollow ugc"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 18px',
            background: 'rgba(10,123,140,0.06)',
            border: '1px solid rgba(10,123,140,0.18)',
            borderRadius: 14,
            textDecoration: 'none',
            color: 'var(--sea)',
            fontSize: 14, fontWeight: 600,
            marginBottom: 18,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Se komplett annons hos säljare
          </span>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}

      {/* ── Säljarkort ── */}
      {author && (
        <div style={{
          background: 'var(--card-bg, #fff)',
          border: '1px solid var(--border, rgba(10,123,140,0.10))',
          borderRadius: 14,
          padding: 16,
          marginBottom: 18,
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <Link
            href={`/u/${author.username}`}
            style={{ flexShrink: 0, lineHeight: 0 }}
          >
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.username}
                width={52}
                height={52}
                style={{
                  width: 52, height: 52,
                  aspectRatio: '1 / 1',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  border: '2px solid var(--border, rgba(10,123,140,0.10))',
                }}
              />
            ) : (
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'var(--teal-15, rgba(10,123,140,0.15))',
                color: 'var(--sea)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700,
              }}>
                {author.username[0]?.toUpperCase()}
              </div>
            )}
          </Link>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 600 }}>
              Säljare
            </div>
            <Link
              href={`/u/${author.username}`}
              style={{
                fontSize: 16, fontWeight: 700, color: 'var(--txt)',
                textDecoration: 'none',
              }}
            >
              {author.username}
            </Link>
          </div>
          {!isOwner && (
            isLoggedIn ? (
              <Link
                href={`/meddelanden/ny?to=${author.id}&about=${threadId}&title=${encodeURIComponent(title)}`}
                style={{
                  padding: '10px 18px',
                  background: 'var(--sea)',
                  color: '#fff',
                  borderRadius: 12,
                  textDecoration: 'none',
                  fontSize: 14, fontWeight: 700,
                  whiteSpace: 'nowrap',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}
              >
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Kontakta
              </Link>
            ) : (
              <Link
                href={`/logga-in?returnTo=${encodeURIComponent(`/forum/loppis/${threadId}`)}`}
                style={{
                  padding: '10px 18px',
                  background: 'var(--acc, #c96e2a)',
                  color: '#fff',
                  borderRadius: 12,
                  textDecoration: 'none',
                  fontSize: 13, fontWeight: 700,
                  whiteSpace: 'nowrap',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  boxShadow: '0 3px 10px rgba(201,110,42,0.25)',
                }}
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Logga in för att kontakta
              </Link>
            )
          )}
        </div>
      )}

      {/* ── Säkerhetstips ── */}
      <div style={{
        background: 'rgba(245,158,11,0.06)',
        border: '1px solid rgba(245,158,11,0.18)',
        borderRadius: 12,
        padding: '12px 14px',
        marginBottom: 24,
        fontSize: 12, color: 'var(--txt2, #555)', lineHeight: 1.5,
        display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <div>
          <strong style={{ color: 'var(--txt)' }}>Köp säkert.</strong>{' '}
          Träffas helst, kontrollera båten själv och betala först när du är nöjd.
          Var skeptisk till priser som verkar för bra för att vara sanna.
        </div>
      </div>
    </article>
  )
}
