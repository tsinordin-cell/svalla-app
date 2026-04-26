import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryById, getThreadsByCategory, formatForumDate } from '@/lib/forum'
import type { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ kategori: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params
  const cat = await getCategoryById(kategori)
  if (!cat) return { title: 'Forum — Svalla' }
  return {
    title: `${cat.name} — Svalla Forum`,
    description: cat.description ?? undefined,
  }
}

export default async function ForumKategoriPage({ params }: Props) {
  const { kategori } = await params
  const [cat, threads] = await Promise.all([
    getCategoryById(kategori),
    getThreadsByCategory(kategori),
  ])

  if (!cat) notFound()

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
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <Link href="/forum" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5.5L8.5 12L15 18.5" />
          </svg>
          Forum
        </Link>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ fontSize: 22 }}>{cat.icon}</span>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-0.3px' }}>{cat.name}</h1>
          {cat.description && (
            <p style={{ fontSize: 13, opacity: 0.8, margin: '2px 0 0' }}>{cat.description}</p>
          )}
        </div>
      </div>

      {/* CTA — ny tråd i den här kategorin */}
      <div style={{ padding: '14px 16px 0' }}>
        <Link href={`/forum/ny-trad?kategori=${cat.id}`} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '11px 16px',
          background: 'var(--sea)',
          color: '#fff',
          borderRadius: 12,
          textDecoration: 'none',
          fontSize: 14,
          fontWeight: 600,
        }}>
          <span style={{ fontSize: 16 }}>✏️</span>
          Ny tråd i {cat.name}
        </Link>
      </div>

      {/* Trådlista */}
      <div style={{ padding: '16px 16px 0' }}>
        {threads.length === 0 ? (
          <EmptyThreads categoryName={cat.name} categoryId={cat.id} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {threads.map(thread => (
              <Link
                key={thread.id}
                href={`/forum/${cat.id}/${thread.id}`}
                style={{
                  display: 'block',
                  padding: '14px 16px',
                  background: 'var(--card-bg, #fff)',
                  borderRadius: 14,
                  border: '1px solid var(--border, rgba(10,123,140,0.1))',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {thread.is_pinned && (
                  <span style={{
                    display: 'inline-block',
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--sea)',
                    background: 'var(--teal-08, rgba(10,123,140,0.08))',
                    padding: '1px 7px',
                    borderRadius: 6,
                    marginBottom: 6,
                  }}>📌 Fäst</span>
                )}
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)', marginBottom: 4, lineHeight: 1.3 }}>
                  {thread.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 8, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {thread.body}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--txt3)' }}>
                  {thread.author && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <AvatarMini username={thread.author.username} avatar={thread.author.avatar} />
                      {thread.author.username}
                    </span>
                  )}
                  <span>·</span>
                  <span>{formatForumDate(thread.created_at)}</span>
                  {thread.reply_count > 0 && (
                    <>
                      <span>·</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z" />
                        </svg>
                        {thread.reply_count}
                      </span>
                    </>
                  )}
                  {thread.is_locked && <span>🔒</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function AvatarMini({ username, avatar }: { username: string; avatar: string | null }) {
  if (avatar) {
    return <img src={avatar} alt="" width={16} height={16} style={{ borderRadius: '50%', objectFit: 'cover' }} />
  }
  return (
    <span style={{
      width: 16, height: 16, borderRadius: '50%',
      background: 'var(--teal-15, rgba(10,123,140,0.15))',
      color: 'var(--sea)',
      fontSize: 9, fontWeight: 700,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {username[0]?.toUpperCase()}
    </span>
  )
}

function EmptyThreads({ categoryName, categoryId }: { categoryName: string; categoryId: string }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '48px 24px',
      background: 'var(--card-bg, #fff)',
      borderRadius: 16,
      border: '1px solid var(--border, rgba(10,123,140,0.1))',
    }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--txt)', margin: '0 0 8px' }}>
        Inga trådar ännu
      </h3>
      <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px', lineHeight: 1.5 }}>
        Bli den första att starta en diskussion om {categoryName}.
      </p>
      <Link href={`/forum/ny-trad?kategori=${categoryId}`} style={{
        display: 'inline-block',
        padding: '12px 24px',
        background: 'var(--grad-sea)',
        color: '#fff',
        borderRadius: 12,
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 600,
      }}>
        Starta första tråden
      </Link>
    </div>
  )
}
