/**
 * Premium OG-card för plats-delningar.
 *
 * Layout (1200×630):
 *   - Google-foto fyller hela bakgrunden (cover)
 *   - Mörk gradient overlay (top-down) för text-läsbarhet
 *   - Top: SVALLA.SE + typ-pill (HOTELL/KROG/etc)
 *   - Center-bottom: stort namn + lokation
 *   - Bottom: rating-pill + URL
 *
 * Faller tillbaka till varumärkesgradient om plats saknar Google-foto.
 *
 * Edge runtime = snabb cold start (sociala medier scraper:ar tål inte
 * lambda-spinup).
 */
import { ImageResponse } from 'next/og'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export const runtime = 'nodejs'
export const revalidate = 3600

const SIZE = { width: 1200, height: 630 } as const

const TYPE_LABEL: Record<string, string> = {
  restaurant: 'Restaurang', cafe: 'Kafé', bar: 'Bar',
  marina: 'Gästhamn', harbor: 'Hamn',
  anchorage: 'Naturhamn', nature_harbor: 'Naturhamn',
  fuel: 'Bränsle', fuel_station: 'Bränsle',
  beach: 'Bad', sauna: 'Bastu',
  shop: 'Butik', hotel: 'Boende', nature: 'Naturplats',
}

// UUID v4 regex
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: idOrSlug } = await params
  const supabase = await createServerSupabaseClient()

  const isUuid = UUID_RE.test(idOrSlug)
  const col = isUuid ? 'id' : 'slug'
  const { data } = await supabase
    .from('restaurants')
    .select('name, island, archipelago_region, type, description, google_rating, google_ratings_total, google_photo_refs, image_url')
    .eq(col, idOrSlug)
    .maybeSingle()

  // ── Notfound: Svalla-branded fallback ──
  if (!data) {
    return new ImageResponse(
      (
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e5c82 0%, #2d7d8a 100%)',
          color: '#fff', fontFamily: 'sans-serif',
          fontSize: 48, fontWeight: 800,
        }}>
          Svalla
        </div>
      ),
      SIZE,
    )
  }

  // ── Bakgrunds-foto: Google först, sen image_url, sen ingen ──
  const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://svalla.se'
  const googleRef = (data.google_photo_refs as { reference: string }[] | null)?.[0]?.reference
  let bgUrl: string | null = null
  if (googleRef) {
    const encoded = Buffer.from(googleRef, 'utf-8').toString('base64url')
    bgUrl = `${SITE}/api/places/photo/${encoded}?w=1600&h=900`
  } else if (data.image_url) {
    bgUrl = data.image_url.startsWith('http') ? data.image_url : `${SITE}${data.image_url.startsWith('/') ? '' : '/'}${data.image_url}`
  }

  const typeLabel = data.type ? TYPE_LABEL[data.type] : null
  const locationParts = [data.island, data.archipelago_region].filter(Boolean) as string[]
  const locationLabel = locationParts.join(' · ')

  const hasGoogleRating = typeof data.google_rating === 'number' && data.google_rating > 0
  const ratingValue = hasGoogleRating ? (data.google_rating as number).toFixed(1) : null
  const ratingCount = (data.google_ratings_total as number | null) ?? 0

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        background: 'linear-gradient(135deg, #1e5c82 0%, #2d7d8a 100%)',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
      }}>
        {/* ── Bakgrundsbild ── */}
        {bgUrl && (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img
            src={bgUrl}
            width={1200}
            height={630}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {/* ── Dark gradient overlay för läsbarhet ── */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 35%, rgba(0,15,30,0.55) 70%, rgba(0,15,30,0.92) 100%)',
        }} />

        {/* ── Top row: brand + typ-pill ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '40px 56px 0',
        }}>
          {/* Brand */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22V8" />
              <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
              <circle cx="12" cy="5" r="3" />
            </svg>
            <span>Svalla</span>
          </div>

          {/* Typ-pill */}
          {typeLabel && (
            <div style={{
              display: 'flex', alignItems: 'center',
              fontSize: 15, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              padding: '10px 18px', borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.22)',
              boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
            }}>
              {typeLabel}
            </div>
          )}
        </div>

        {/* ── Spacer ── */}
        <div style={{ flex: 1, display: 'flex' }} />

        {/* ── Bottom-left: namn + plats + rating ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column',
          padding: '0 56px 44px',
          gap: 14,
        }}>
          {/* Lokation pill (om finns) */}
          {locationLabel && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 15, fontWeight: 700,
              letterSpacing: '0.10em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              textShadow: '0 2px 10px rgba(0,0,0,0.6)',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {locationLabel}
            </div>
          )}

          {/* Plats-namn — STORT */}
          <div style={{
            fontSize: data.name.length > 28 ? 60 : 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            textShadow: '0 2px 24px rgba(0,0,0,0.5)',
            maxWidth: 1080,
            display: 'flex',
          }}>
            {data.name}
          </div>

          {/* Rating + URL-rad */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            marginTop: 8,
          }}>
            {/* Rating-pill */}
            {hasGoogleRating && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.96)',
                color: '#1a1a1a',
                padding: '10px 16px',
                borderRadius: 999,
                fontSize: 17, fontWeight: 700,
                boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#f5a623">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                </svg>
                <span style={{ color: '#1a1a1a', fontWeight: 800 }}>{ratingValue}</span>
                {ratingCount > 0 && (
                  <span style={{ color: '#666', fontWeight: 600, fontSize: 15 }}>
                    ({ratingCount.toLocaleString('sv-SE')})
                  </span>
                )}
              </div>
            )}

            {/* URL */}
            <div style={{
              fontSize: 15, fontWeight: 600,
              color: 'rgba(255,255,255,0.78)',
              letterSpacing: '0.04em',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              marginLeft: hasGoogleRating ? 'auto' : 0,
            }}>
              svalla.se
            </div>
          </div>
        </div>
      </div>
    ),
    SIZE,
  )
}
