import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const revalidate = 3600 // 1 h — OG-bilder cachas länge av sociala medier

/**
 * Dynamisk OG-bild för redaktionella artiklar på /tips/[slug].
 *
 * Följer samma visuella språk som /api/og/tur/[id] men anpassad för
 * läsredaktionellt innehåll: stor rubrik, kategori-pill, författarnamn.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = createClient()

  const { data: article } = await supabase
    .from('articles')
    .select('title, excerpt, cover_image, category, author_name, reading_min, tags')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  const title = article?.title ?? 'Tips & guider — Svalla'
  const excerpt = article?.excerpt ?? 'Redaktionellt innehåll om Stockholms skärgård — bryggor, rutter och båtliv.'
  const category = article?.category ?? 'Guide'
  const author = article?.author_name ?? 'Svalla-redaktionen'
  const readingMin = article?.reading_min ?? null
  const cover = article?.cover_image ?? null
  const tags: string[] = Array.isArray(article?.tags) ? article.tags.slice(0, 3) : []

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          display: 'flex', flexDirection: 'row',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: 'linear-gradient(145deg, #081828 0%, #0d2a40 45%, #0e3550 100%)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Bakgrunds-glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,110,42,0.14) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Vänster — innehåll */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          padding: '52px 44px 44px',
          justifyContent: 'space-between',
          zIndex: 1,
          minWidth: 0,
        }}>
          {/* Top: branding + kategori */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              fontSize: 13, fontWeight: 600, letterSpacing: '3px',
              color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
            }}>
              SVALLA.SE · TIPS
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(201,110,42,0.18)',
              border: '1px solid rgba(201,110,42,0.40)',
              borderRadius: 20, padding: '6px 14px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f5a35a', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                {category}
              </div>
            </div>
          </div>

          {/* Rubrik */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              fontSize: title.length > 40 ? 44 : title.length > 24 ? 52 : 60,
              fontWeight: 700, color: '#fff',
              lineHeight: 1.1, letterSpacing: '-1px',
              display: 'flex',
            }}>
              {title}
            </div>
            {excerpt && (
              <div style={{
                fontSize: 18,
                color: 'rgba(255,255,255,0.68)',
                lineHeight: 1.4,
                display: 'flex',
                maxHeight: 100,
                overflow: 'hidden',
              }}>
                {excerpt.length > 140 ? excerpt.slice(0, 140) + '…' : excerpt}
              </div>
            )}
          </div>

          {/* Bottom: författare + tags */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700, color: '#fff',
              }}>
                {author[0]?.toUpperCase() ?? 'S'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                  {author}
                </div>
                {readingMin ? (
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                    {readingMin} min läsning
                  </div>
                ) : null}
              </div>
            </div>
            <div style={{
              fontSize: 12, fontWeight: 700,
              color: 'rgba(100,180,230,0.50)',
              letterSpacing: '0.5px',
            }}>
              Läs på Svalla.se ⚓
            </div>
          </div>
        </div>

        {/* Höger — visuell ankare (cover eller ikon-fallback) */}
        <div style={{
          width: 380, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(30,100,180,0.22) 0%, transparent 70%)',
            display: 'flex',
          }} />

          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt=""
              width={380}
              height={630}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: 0.88,
              }}
            />
          ) : (
            <div style={{
              fontSize: 160, opacity: 0.18, position: 'relative', zIndex: 1,
              display: 'flex',
            }}>
              ⚓
            </div>
          )}

          {/* Tag-pills längst ner höger */}
          {tags.length > 0 && (
            <div style={{
              position: 'absolute', bottom: 24, left: 16, right: 16,
              display: 'flex', flexDirection: 'row', gap: 6, flexWrap: 'wrap',
              zIndex: 2, justifyContent: 'flex-end',
            }}>
              {tags.map(tag => (
                <div
                  key={tag}
                  style={{
                    background: 'rgba(0,0,0,0.55)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 14, padding: '4px 10px',
                    fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
                    display: 'flex',
                  }}
                >
                  #{tag}
                </div>
              ))}
            </div>
          )}

          {/* Fade-kanter */}
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 60,
            background: 'linear-gradient(to right, transparent, rgba(8,24,40,0.95))',
            display: 'flex',
          }} />
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 40,
            background: 'linear-gradient(to left, transparent, rgba(8,24,40,0.7))',
            display: 'flex',
          }} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
