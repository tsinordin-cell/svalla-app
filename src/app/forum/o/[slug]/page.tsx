import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getThreadsByIsland, formatForumDate } from '@/lib/forum'
import { getIsland } from '@/app/o/island-data'
import type { Metadata } from 'next'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) return { title: { absolute: 'Forum — Svalla' } }
  return {
    title: { absolute: `Forum om ${island.name} — Svalla` },
    description: `Diskussioner, tips och frågor om ${island.name}. Dela erfarenheter, hitta lokala tjänster och knyt kontakter.`,
  }
}

export default async function IslandForumPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  const threads = await getThreadsByIsland(slug)

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 24px)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, var(--sea) 0%, #0d8fa3 100%)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 16px) 20px 24px',
        color: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <Link href={`/o/${slug}`} style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontSize: 14 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5.5L8.5 12L15 18.5" />
            </svg>
            {island.name}
          </Link>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.3px' }}>
          Forum — {island.name}
        </h1>
        <p style={{ fontSize: 14, opacity: 0.85, margin: 0 }}>
          Diskussioner, tips och lokala tjänster
        </p>
      </div>

      {/* CTA-knappar */}
      <div style={{ padding: '16px 16px 0', display: 'flex', gap: 10 }}>
        <Link
          href={`/forum/ny-trad?island=${slug}`}
          style={{
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
          }}
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
          </svg>
          Starta en diskussion om {island.name}
        </Link>
      </div>

      {/* Tråd-lista */}
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {threads.length === 0 ? (
          /* Tom-state med seed-prompts */
          <div style={{
            padding: '32px 20px',
            background: 'var(--card-bg, #fff)',
            borderRadius: 18,
            border: '1px solid rgba(10,123,140,0.1)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🏝️</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--txt)', marginBottom: 6 }}>
                Bli den första att skriva om {island.name}!
              </div>
              <div style={{ fontSize: 14, color: 'var(--txt3)', lineHeight: 1.55 }}>
                Inga frågor är för enkla. Lokalkännedom är guld värd.
              </div>
            </div>

            {/* Klickbara startfrågor */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                Förslag — klicka för att starta:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  `Vad ska man absolut inte missa på ${island.name}?`,
                  `Bästa restaurangen på ${island.name} sommaren 2026?`,
                  `Tips för förstagångsbesökare på ${island.name}?`,
                  `Hur tar man sig till ${island.name} snabbast från Stockholm?`,
                  `Är ${island.name} barnvänlig — vad rekommenderar ni?`,
                ].map(prompt => (
                  <Link
                    key={prompt}
                    href={`/forum/ny-trad?island=${slug}&titel=${encodeURIComponent(prompt)}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 14px',
                      background: 'rgba(10,123,140,0.05)',
                      border: '1.5px dashed rgba(10,123,140,0.2)',
                      borderRadius: 12,
                      textDecoration: 'none',
                      color: 'var(--txt2)',
                      fontSize: 14,
                      lineHeight: 1.4,
                      transition: 'background 0.15s, border-color 0.15s',
                    }}
                  >
                    <span style={{ fontSize: 16, flexShrink: 0 }}>💬</span>
                    <span>{prompt}</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--sea)', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>Starta →</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={`/forum/ny-trad?island=${slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '13px 22px',
                background: 'var(--sea)',
                color: '#fff',
                borderRadius: 12,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Skriv egen fråga eller tips →
            </Link>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt3)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px 4px' }}>
              {threads.length} diskussion{threads.length !== 1 ? 'er' : ''}
            </div>
            {threads.map(thread => (
              <Link
                key={thread.id}
                href={`/forum/${thread.category_id}/${thread.id}`}
                style={{
                  display: 'block',
                  padding: '14px 16px',
                  background: 'var(--card-bg, #fff)',
                  borderRadius: 16,
                  border: '1px solid rgba(10,123,140,0.1)',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)', marginBottom: 4, lineHeight: 1.35 }}>
                  {thread.title}
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  {thread.author && (
                    <span style={{ fontSize: 12, color: 'var(--txt3)' }}>
                      {thread.author.username}
                    </span>
                  )}
                  <span style={{ fontSize: 12, color: 'var(--txt3)' }}>
                    {formatForumDate(thread.created_at)}
                  </span>
                  {thread.reply_count > 0 && (
                    <span style={{ fontSize: 12, color: 'var(--sea)', fontWeight: 600 }}>
                      {thread.reply_count} svar
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </>
        )}
      </div>

      {/* Länk till hela forumet */}
      <div style={{ padding: '0 16px' }}>
        <Link
          href="/forum"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: '13px',
            background: 'var(--card-bg, #fff)',
            border: '1px solid rgba(10,123,140,0.12)',
            borderRadius: 14,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--txt3)',
          }}
        >
          Se alla forumkategorier →
        </Link>
      </div>
    </main>
  )
}
