/**
 * LoppisSimilarAds — "Liknande annonser" i botten av annons-vyn.
 * Server-component, hämtad data passas in från parent.
 *
 * Håller köpare på siten, ger fler chanser till köp/sälj. 4-grid på desktop,
 * 2-grid på mobil.
 */
import Link from 'next/link'
import Image from 'next/image'

interface Ad {
  id: string
  title: string
  image: string | null
  price: number | null
  location: string | null
  status: string
}

interface Props {
  ads: Ad[]
}

function formatPrice(price: number | null): string {
  if (typeof price !== 'number' || !Number.isFinite(price)) return 'Pris på förfrågan'
  if (price === 0) return 'Skänkes'
  return `${new Intl.NumberFormat('sv-SE').format(price)} kr`
}

export default function LoppisSimilarAds({ ads }: Props) {
  if (ads.length === 0) return null

  return (
    <section style={{ marginBottom: 24 }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--txt3)',
        letterSpacing: '0.6px', textTransform: 'uppercase',
        marginBottom: 10,
      }}>
        Liknande annonser
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 10,
      }}>
        {ads.map(ad => (
          <Link
            key={ad.id}
            href={`/forum/loppis/${ad.id}`}
            style={{
              display: 'block',
              borderRadius: 12,
              overflow: 'hidden',
              background: 'var(--card-bg, #fff)',
              border: '1px solid var(--border, rgba(10,123,140,0.10))',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              textDecoration: 'none',
              color: 'inherit',
              opacity: ad.status === 'reserverad' ? 0.85 : 1,
            }}
          >
            <div style={{
              position: 'relative', width: '100%', aspectRatio: '4 / 3',
              background: '#0a1e2c',
            }}>
              {ad.image ? (
                <Image src={ad.image} alt={ad.title} fill sizes="(max-width: 480px) 50vw, 180px" style={{ objectFit: 'cover' }} loading="lazy" />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#456', fontSize: 12,
                }}>Ingen bild</div>
              )}
              {ad.status === 'reserverad' && (
                <div style={{
                  position: 'absolute', top: 6, right: 6,
                  background: 'rgba(40,40,40,0.72)', color: '#fff',
                  padding: '2px 7px', borderRadius: 10,
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase',
                  backdropFilter: 'blur(6px)',
                }}>Reserverad</div>
              )}
            </div>
            <div style={{ padding: '8px 10px 10px' }}>
              <div style={{
                fontSize: 14, fontWeight: 800, color: 'var(--acc, #c96e2a)',
                letterSpacing: '-0.2px', marginBottom: 2,
              }}>
                {formatPrice(ad.price)}
              </div>
              <div style={{
                fontSize: 12, fontWeight: 600, color: 'var(--txt)',
                lineHeight: 1.3,
                overflow: 'hidden', display: '-webkit-box',
                WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>{ad.title}</div>
              {ad.location && (
                <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>
                  {ad.location}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
