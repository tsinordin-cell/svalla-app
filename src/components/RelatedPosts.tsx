import Link from 'next/link'
import Icon from '@/components/Icon'
import type { PostMeta } from '@/app/blogg/posts-data'

type Props = {
  posts: PostMeta[]
  /** Rubrik kan styras (t.ex. "Senaste från bloggen" på startsidan vs "Relaterade artiklar" i blog) */
  heading?: string
  /** Mindre vy med 1-rads layout istället för rutnät */
  compact?: boolean
}

/**
 * RelatedPosts — internal linking-komponent.
 *
 * SEO-syfte: skapa länkar mellan blog-poster och från startsidan till bloggen.
 * Google följer dessa länkar när de crawlar och hittar "Discovered, not crawled"-
 * sidor snabbare.
 *
 * Använd:
 * - På /blogg/[slug] → "Relaterade artiklar" (3 valda via tag-similarity)
 * - På startsidan → "Senaste från bloggen" (3 nyaste)
 * - I /upptack-nav eller annan landningssida → relaterad artikel-strip
 */
export default function RelatedPosts({ posts, heading = 'Relaterade artiklar', compact = false }: Props) {
  if (posts.length === 0) return null

  return (
    <section
      aria-label={heading}
      style={{
        marginTop: 32, marginBottom: 16,
        background: 'var(--white)',
        borderRadius: 16,
        padding: '20px',
        border: '1px solid rgba(10,123,140,0.08)',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14,
      }}>
        <Icon name="bookmark" size={16} stroke={2} />
        <h2 style={{
          fontSize: 12, fontWeight: 800, color: 'var(--sea)',
          textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0,
        }}>
          {heading}
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 12,
      }}>
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/blogg/${post.slug}`}
            style={{
              display: 'block',
              padding: '12px 14px',
              borderRadius: 12,
              background: 'rgba(10,123,140,0.04)',
              border: '1px solid rgba(10,123,140,0.10)',
              textDecoration: 'none',
              color: 'var(--txt)',
              transition: 'background 150ms ease, transform 150ms ease',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 10, fontWeight: 700, color: 'var(--sea)',
              textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6,
            }}>
              {post.category}
              <span style={{ color: 'var(--txt3)', fontWeight: 600, letterSpacing: 0 }}>
                · {post.readTime}
              </span>
            </div>
            <div style={{
              fontSize: 14, fontWeight: 700, color: 'var(--txt)',
              lineHeight: 1.35, marginBottom: 6,
            }}>
              {post.title}
            </div>
            <div style={{
              fontSize: 12, color: 'var(--txt3)', lineHeight: 1.5,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {post.excerpt}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
