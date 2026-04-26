import Link from 'next/link'
import { getForumCategories } from '@/lib/forum'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forum — Svalla',
  description: 'Diskutera segling, fiske, motorbåt och skärgårdsliv med andra båtentusiaster.',
}

export const revalidate = 300

export default async function ForumPage() {
  const categories = await getForumCategories()

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 24px)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, var(--sea) 0%, #0d8fa3 100%)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 20px) 20px 28px',
        color: '#fff',
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.3px' }}>
          Forum
        </h1>
        <p style={{ fontSize: 14, opacity: 0.85, margin: 0 }}>
          Skärgårdsliv, teknik, tips och nyheter
        </p>
      </div>

      {/* CTA — ny tråd */}
      <div style={{ padding: '16px 16px 0' }}>
        <Link href="/forum/ny-trad" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '13px 18px',
          background: 'var(--sea)',
          color: '#fff',
          borderRadius: 14,
          textDecoration: 'none',
          fontSize: 15,
          fontWeight: 600,
          boxShadow: '0 2px 12px rgba(10,123,140,0.22)',
        }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>✏️</span>
          Starta en ny diskussion
        </Link>
      </div>

      {/* Kategorilistning */}
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h2 style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt3)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px 4px' }}>
          Kategorier
        </h2>

        {categories.map(cat => (
          <Link
            key={cat.id}
            href={`/forum/${cat.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 16px',
              background: 'var(--card-bg, #fff)',
              borderRadius: 16,
              border: '1px solid var(--border, rgba(10,123,140,0.1))',
              textDecoration: 'none',
              color: 'inherit',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            {/* Icon */}
            <span style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'var(--teal-08, rgba(10,123,140,0.08))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              flexShrink: 0,
            }}>
              {cat.icon}
            </span>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)', marginBottom: 2 }}>
                {cat.name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--txt3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {cat.description}
              </div>
            </div>

            {/* Counts */}
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              {cat.thread_count > 0 ? (
                <>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--sea)' }}>
                    {cat.thread_count}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--txt3)' }}>
                    trådar
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 11, color: 'var(--txt3)' }}>Ny!</div>
              )}
            </div>

            {/* Chevron */}
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5.5L15.5 12L9 18.5" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Info-sektion */}
      <div style={{
        margin: '4px 16px 0',
        padding: '14px 16px',
        background: 'var(--teal-08, rgba(10,123,140,0.06))',
        borderRadius: 14,
        fontSize: 13,
        color: 'var(--txt3)',
        lineHeight: 1.5,
      }}>
        <strong style={{ color: 'var(--txt2)' }}>Välkommen till Svalla Forum!</strong>{' '}
        Diskutera skärgårdsliv med andra båtentusiaster. Håll en trevlig ton — vi är alla ute för att njuta av havet.
      </div>
    </main>
  )
}
