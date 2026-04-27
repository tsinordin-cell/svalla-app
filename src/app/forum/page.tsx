import Link from 'next/link'
import { getForumCategories } from '@/lib/forum'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Fish, Wrench, BookOpen, ShoppingBag } from '@/components/icons/LucideIcons'
import { IconSailboat, IconMotorboat, IconKayak, IconAnchor, IconLighthouse } from '@/components/icons/SvallaIcons'

const CATEGORY_ICONS: Record<string, ReactNode> = {
  '⛵': <IconSailboat size={26} />,
  '🚤': <IconMotorboat size={26} />,
  '🎣': <Fish size={26} />,
  '🛶': <IconKayak size={26} />,
  // Fyr = navigation + säkerhet i dåligt väder. Matchar Svalla-ikonstilen
  // bättre än Lucide Cloud (som bara är en kontur av ett moln).
  '⛅': <IconLighthouse size={26} />,
  '🔧': <Wrench size={26} />,
  '⚓': <IconAnchor size={26} />,
  '👋': <BookOpen size={26} />,
  '💰': <ShoppingBag size={26} />,
}

export const metadata: Metadata = {
  title: 'Forum — Svalla',
  description: 'Diskutera segling, fiske, motorbåt och skärgårdsliv med andra båtentusiaster.',
}

export const revalidate = 300

export default async function ForumPage() {
  const categories = await getForumCategories()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForum',
    name: 'Svalla Forum',
    url: 'https://svalla.se/forum',
    description: 'Diskutera segling, fiske, motorbåt och skärgårdsliv med andra båtentusiaster.',
    inLanguage: 'sv',
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 24px)',
    }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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

      {/* CTA — ny tråd + sök */}
      <div style={{ padding: '16px 16px 0', display: 'flex', gap: 10 }}>
        <Link href="/forum/ny-trad" style={{
          flex: 1,
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
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
          </svg>
          Starta en ny diskussion
        </Link>
        <Link href="/forum/sok" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          background: 'var(--card-bg, #fff)',
          border: '1px solid var(--border, rgba(10,123,140,0.15))',
          borderRadius: 14,
          textDecoration: 'none',
          flexShrink: 0,
        }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
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
              color: 'var(--sea)',
              flexShrink: 0,
            }}>
              {CATEGORY_ICONS[cat.icon] ?? cat.icon}
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
