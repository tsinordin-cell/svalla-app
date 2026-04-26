import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getThreadById, getPostsByThread, getCategoryById, formatForumDate } from '@/lib/forum'
import ForumReplyForm from './ForumReplyForm'
import type { Metadata } from 'next'

export const revalidate = 30

interface Props {
  params: Promise<{ kategori: string; trad: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { trad } = await params
  const thread = await getThreadById(trad)
  if (!thread) return { title: 'Forum — Svalla' }
  return {
    title: `${thread.title} — Svalla Forum`,
  }
}

export default async function ForumTradPage({ params }: Props) {
  const { kategori, trad } = await params
  const [thread, posts, cat] = await Promise.all([
    getThreadById(trad),
    getPostsByThread(trad),
    getCategoryById(kategori),
  ])

  if (!thread || !cat) notFound()

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 24px)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, var(--sea) 0%, #0d8fa3 100%)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 14px) 16px 20px',
        color: '#fff',
      }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, opacity: 0.8, marginBottom: 10 }}>
          <Link href="/forum" style={{ color: 'inherit', textDecoration: 'none' }}>Forum</Link>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5.5L15.5 12L9 18.5" />
          </svg>
          <Link href={`/forum/${cat.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {cat.icon} {cat.name}
          </Link>
        </div>
        <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
          {thread.title}
        </h1>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {/* Ursprungligt inlägg (OP) */}
        <div style={{
          padding: '16px',
          background: 'var(--card-bg, #fff)',
          borderRadius: 16,
          border: '1px solid var(--border, rgba(10,123,140,0.1))',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          marginBottom: 12,
        }}>
          <PostHeader
            username={thread.author?.username ?? 'Okänd'}
            avatar={thread.author?.avatar ?? null}
            date={thread.created_at}
            isOP
          />
          <div style={{
            fontSize: 15,
            color: 'var(--txt)',
            lineHeight: 1.6,
            marginTop: 10,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {thread.body}
          </div>
        </div>

        {/* Svar */}
        {posts.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            <h2 style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt3)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '4px 4px 4px' }}>
              {posts.length} svar
            </h2>
            {posts.map((post, i) => (
              <div key={post.id} style={{
                padding: '14px 16px',
                background: 'var(--card-bg, #fff)',
                borderRadius: 14,
                border: '1px solid var(--border, rgba(10,123,140,0.1))',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}>
                <PostHeader
                  username={post.author?.username ?? 'Okänd'}
                  avatar={post.author?.avatar ?? null}
                  date={post.created_at}
                  index={i + 1}
                />
                <div style={{
                  fontSize: 14,
                  color: 'var(--txt)',
                  lineHeight: 1.6,
                  marginTop: 8,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {post.body}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Svarsformulär */}
        {thread.is_locked ? (
          <div style={{
            padding: '14px 16px',
            background: 'var(--teal-08, rgba(10,123,140,0.06))',
            borderRadius: 12,
            textAlign: 'center',
            fontSize: 14,
            color: 'var(--txt3)',
          }}>
            🔒 Den här tråden är låst för nya svar.
          </div>
        ) : (
          <ForumReplyForm threadId={thread.id} categoryId={kategori} />
        )}
      </div>
    </main>
  )
}

function PostHeader({
  username, avatar, date, isOP, index,
}: {
  username: string
  avatar: string | null
  date: string
  isOP?: boolean
  index?: number
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* Avatar */}
      {avatar ? (
        <img src={avatar} alt="" width={32} height={32} style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
      ) : (
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--teal-15, rgba(10,123,140,0.15))',
          color: 'var(--sea)',
          fontSize: 13, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {username[0]?.toUpperCase()}
        </div>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)' }}>{username}</span>
          {isOP && (
            <span style={{
              fontSize: 10, fontWeight: 700, color: 'var(--sea)',
              background: 'var(--teal-08, rgba(10,123,140,0.08))',
              padding: '1px 5px', borderRadius: 4,
            }}>OP</span>
          )}
          {index !== undefined && (
            <span style={{ fontSize: 11, color: 'var(--txt3)' }}>#{index}</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--txt3)' }}>{formatForumDate(date)}</div>
      </div>
    </div>
  )
}
