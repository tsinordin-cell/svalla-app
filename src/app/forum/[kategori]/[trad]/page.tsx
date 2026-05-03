import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getThreadById, getPostsByThread, getCategoryById, formatForumDate } from '@/lib/forum'
import ForumReplyForm from './ForumReplyForm'
import ForumPostActions from './ForumPostActions'
import ForumLikeButton from './ForumLikeButton'
import ForumSubscribeButton from './ForumSubscribeButton'
import ForumQuoteButton from './ForumQuoteButton'
import BestAnswerButton from './BestAnswerButton'
import ForumSortTabs from './ForumSortTabs'
import ForumRealtimeListener from './ForumRealtimeListener'
import Icon from '@/components/Icon'
import { renderForumBody } from '@/lib/forum-render'
import LoppisListingCard from '@/components/LoppisListingCard'
import type { ForumSort } from '@/lib/forum'
import type { Metadata } from 'next'

export const revalidate = 30

interface Props {
  params: Promise<{ kategori: string; trad: string }>
  searchParams?: Promise<{ sort?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { trad } = await params
  const thread = await getThreadById(trad)
  if (!thread) return { title: 'Forum — Svalla' }
  const description = thread.body.slice(0, 160)
  const ogImage = `/api/og/forum/${trad}`
  return {
    title: `${thread.title} — Svalla Forum`,
    description,
    openGraph: {
      title: `${thread.title} — Svalla Forum`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: thread.title }],
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: `${thread.title} — Svalla Forum`, description, images: [ogImage] },
  }
}

export default async function ForumTradPage({ params, searchParams }: Props) {
  const { kategori, trad } = await params
  const sp = (await searchParams) ?? {}
  const sort: ForumSort = sp.sort === 'nyast' || sp.sort === 'hjalpsamma' ? sp.sort : 'aldst'
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  const currentUserId = user?.id ?? null

  const thread = await getThreadById(trad)
  const cat = await getCategoryById(kategori)
  if (!thread || !cat) notFound()

  const [posts, subRow] = await Promise.all([
    getPostsByThread(trad, currentUserId, { sort, bestPostId: thread.best_post_id ?? null }),
    currentUserId
      ? supabase.from('forum_subscriptions').select('user_id').eq('user_id', currentUserId).eq('thread_id', trad).maybeSingle()
      : Promise.resolve({ data: null }),
  ])
  const isSubscribed = !!subRow?.data
  const isThreadOwner = currentUserId === thread.user_id

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: thread.title,
    text: thread.body.slice(0, 500),
    datePublished: thread.created_at,
    url: `https://svalla.se/forum/${kategori}/${trad}`,
    inLanguage: 'sv',
    author: thread.author?.username
      ? { '@type': 'Person', name: thread.author.username }
      : undefined,
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/ReplyAction',
      userInteractionCount: posts.length,
    },
    isPartOf: {
      '@type': 'DiscussionForum',
      name: `${cat.name} — Svalla Forum`,
      url: `https://svalla.se/forum/${kategori}`,
    },
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 32px)',
    }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Header ── */}
      <div style={{
        background: 'linear-gradient(160deg, var(--sea) 0%, #0d8fa3 100%)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 14px) 16px 22px',
        color: '#fff',
      }}>
        {/* Breadcrumb + back button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Link href={`/forum/${cat.id}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '5px 12px 5px 8px',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff', textDecoration: 'none',
            fontSize: 12, fontWeight: 600,
          }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5.5L8.5 12L15 18.5" />
            </svg>
            <Icon name={cat.iconName} size={14} stroke={2} />
            {cat.name}
          </Link>
          <Link href="/forum" style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
            Forum
          </Link>
        </div>

        <h1 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 14px', lineHeight: 1.3, letterSpacing: '-0.2px', display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ flex: 1 }}>{thread.title}</span>
          {thread.is_solved && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '4px 10px', borderRadius: 6,
              background: 'rgba(34,197,94,0.18)',
              color: '#bbf7d0',
              border: '1px solid rgba(187,247,208,0.35)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Löst
            </span>
          )}
        </h1>

        {/* Thread meta — author + stats + subscribe */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {thread.author?.avatar ? (
              <img
                src={thread.author.avatar}
                alt=""
                width={26}
                height={26}
                style={{
                  width: 26, height: 26,
                  aspectRatio: '1 / 1',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  flexShrink: 0,
                  border: '1.5px solid rgba(255,255,255,0.4)',
                }}
              />
            ) : (
              <div style={{
                width: 26, height: 26,
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: '#fff',
                flexShrink: 0,
                border: '1.5px solid rgba(255,255,255,0.3)',
              }}>
                {(thread.author?.username ?? '?')[0]?.toUpperCase()}
              </div>
            )}
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
              {thread.author?.username ?? 'Okänd'}
            </span>
          </div>
          <span style={{ opacity: 0.4, fontSize: 12 }}>·</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{formatForumDate(thread.created_at)}</span>
          {posts.length > 0 && (
            <>
              <span style={{ opacity: 0.4, fontSize: 12 }}>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z" />
                </svg>
                {posts.length} svar
              </span>
            </>
          )}
          {/* Spacer + bevaka-knapp */}
          <div style={{ marginLeft: 'auto' }}>
            <ForumSubscribeButton
              threadId={trad}
              initialSubscribed={isSubscribed}
              currentUserId={currentUserId}
            />
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 0 0', maxWidth: 760, margin: '0 auto' }}>

        {/* ── OP-kort: Loppis-annons eller vanlig forum-tråd ── */}
        {kategori === 'loppis' && thread.listing_data ? (
          <>
            <LoppisListingCard
              title={thread.title}
              body={thread.body}
              createdAt={thread.created_at}
              listing={thread.listing_data}
              author={thread.author ? {
                id: thread.user_id,
                username: thread.author.username,
                avatar: thread.author.avatar,
              } : null}
              isOwner={isThreadOwner}
            />
            {/* Ägar-actions för annonsen (redigera/radera) */}
            <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 16px 16px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <ForumQuoteButton username={thread.author?.username ?? 'Okänd'} body={thread.body} />
              <ForumPostActions
                postId={thread.id}
                threadId={thread.id}
                authorId={thread.user_id}
                currentUserId={currentUserId}
                initialBody={thread.body}
                initialTitle={thread.title}
                isThread
                categoryId={kategori}
              />
            </div>
          </>
        ) : (
          <div style={{
            padding: '18px 18px 14px',
            margin: '0 16px 16px',
            background: 'var(--card-bg, #fff)',
            borderRadius: 16,
            border: '1px solid var(--border, rgba(10,123,140,0.1))',
            borderLeft: '3px solid var(--sea)',
            boxShadow: '0 2px 12px rgba(10,123,140,0.07)',
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
              lineHeight: 1.65,
              marginTop: 12,
              wordBreak: 'break-word',
            }}>
              {renderForumBody(thread.body)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              <ForumQuoteButton username={thread.author?.username ?? 'Okänd'} body={thread.body} />
              <ForumPostActions
                postId={thread.id}
                threadId={thread.id}
                authorId={thread.user_id}
                currentUserId={currentUserId}
                initialBody={thread.body}
                initialTitle={thread.title}
                isThread
                categoryId={kategori}
              />
            </div>
          </div>
        )}

        <div style={{ padding: '0 16px' }}>

        {/* ── Svar ── */}
        {posts.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            {/* Svar-header med linje + sort-tabbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                {posts.length} {posts.length === 1 ? 'svar' : 'svar'}
              </span>
              <div style={{ flex: 1, height: 1, background: 'var(--border, rgba(10,123,140,0.1))' }} />
              {posts.length > 1 && <ForumSortTabs current={sort} />}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {posts.map((post, i) => {
                const isBest = thread.best_post_id === post.id
                return (
                  <div key={post.id} id={`post-${post.id}`} style={{
                    padding: '14px 16px',
                    background: 'var(--card-bg, #fff)',
                    borderRadius: 14,
                    border: isBest ? '1.5px solid rgba(34,197,94,0.5)' : '1px solid var(--border, rgba(10,123,140,0.1))',
                    boxShadow: isBest ? '0 4px 16px rgba(34,197,94,0.18)' : '0 1px 4px rgba(0,0,0,0.04)',
                    scrollMarginTop: 80,
                    position: 'relative',
                  }}>
                    {isBest && (
                      <div style={{
                        position: 'absolute', top: -10, left: 14,
                        background: '#16a34a', color: '#fff',
                        fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                        padding: '3px 9px', borderRadius: 6,
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        boxShadow: '0 2px 6px rgba(22,163,74,0.35)',
                      }}>
                        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Bästa svar
                      </div>
                    )}
                    <PostHeader
                      username={post.author?.username ?? 'Okänd'}
                      avatar={post.author?.avatar ?? null}
                      date={post.created_at}
                      index={i + 1}
                      postId={post.id}
                    />
                    <div style={{
                      fontSize: 14,
                      color: 'var(--txt)',
                      lineHeight: 1.65,
                      marginTop: 10,
                      wordBreak: 'break-word',
                    }}>
                      {renderForumBody(post.body)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, gap: 8, flexWrap: 'wrap' }}>
                      <ForumLikeButton
                        postId={post.id}
                        initialCount={post.like_count ?? 0}
                        initialLiked={post.liked_by_user ?? false}
                        currentUserId={currentUserId}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                        {(isThreadOwner || isBest) && (
                          <BestAnswerButton
                            threadId={trad}
                            postId={post.id}
                            isThreadOwner={isThreadOwner}
                            isBest={isBest}
                          />
                        )}
                        <ForumQuoteButton username={post.author?.username ?? 'Okänd'} body={post.body} />
                        <ForumPostActions
                          postId={post.id}
                          authorId={post.user_id}
                          currentUserId={currentUserId}
                          initialBody={post.body}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Empty state — inga svar än ── */}
        {posts.length === 0 && !thread.is_locked && (
          <div style={{
            textAlign: 'center',
            padding: '20px 16px 24px',
            color: 'var(--txt3)',
            fontSize: 14,
          }}>
            <div style={{ marginBottom: 4 }}>
              <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="rgba(10,123,140,0.3)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z" />
              </svg>
            </div>
            Inga svar ännu — var den första att svara!
          </div>
        )}

        {/* ── Svarsformulär / låst ── */}
        {thread.is_locked ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '16px',
            background: 'rgba(10,123,140,0.05)',
            borderRadius: 14,
            border: '1px solid rgba(10,123,140,0.1)',
            fontSize: 14,
            color: 'var(--txt3)',
          }}>
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Den här tråden är låst för nya svar.
          </div>
        ) : (
          <ForumReplyForm threadId={thread.id} categoryId={kategori} />
        )}
        </div>
      </div>

      {/* Realtime: lyssnar på nya posts och visar pill om någon annan postar */}
      <ForumRealtimeListener threadId={thread.id} initialCount={posts.length} />
    </main>
  )
}

function PostHeader({
  username, avatar, date, isOP, index, postId,
}: {
  username: string
  avatar: string | null
  date: string
  isOP?: boolean
  index?: number
  postId?: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {/* Avatar */}
      {avatar ? (
        <img
          src={avatar}
          alt=""
          width={40}
          height={40}
          style={{
            width: 40, height: 40,
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
            flexShrink: 0,
          }}
        />
      ) : (
        <div style={{
          width: 40, height: 40,
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          background: 'var(--grad-sea)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 700, color: '#fff',
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
              fontSize: 10, fontWeight: 700, color: '#fff',
              background: 'var(--sea)',
              padding: '1px 6px', borderRadius: 4,
              letterSpacing: '0.03em',
            }}>OP</span>
          )}
          {index !== undefined && postId && (
            <a
              href={`#post-${postId}`}
              style={{ fontSize: 11, color: 'var(--txt3)', textDecoration: 'none' }}
              title="Länk till detta svar"
            >
              #{index}
            </a>
          )}
          {index !== undefined && !postId && (
            <span style={{ fontSize: 11, color: 'var(--txt3)' }}>#{index}</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 1 }}>{formatForumDate(date)}</div>
      </div>
    </div>
  )
}
