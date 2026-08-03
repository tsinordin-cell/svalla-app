'use client'
import { useState } from 'react'
import ForumLikeButton from './ForumLikeButton'
import ForumQuoteButton from './ForumQuoteButton'
import ForumPostActions from './ForumPostActions'
import BestAnswerButton from './BestAnswerButton'
import ForumSortTabs from './ForumSortTabs'
import { useForumViewer } from './ForumViewer'
import { renderForumBody } from '@/lib/forum-render'
import { formatForumDate } from '@/lib/forum-utils'
import type { ForumSort } from '@/lib/forum'

/**
 * Trådens svarslista — klientkomponent med inläggen som DATA, inte som
 * färdiga server-slots.
 *
 * VARFÖR (2026-08-02): sorteringen (?sort=) lästes tidigare via searchParams
 * på servern och ändrade datats ordning i getPostsByThread. Att läsa
 * searchParams tvingar dynamisk rendering (samma fälla som ?tab= på
 * /u/[username], PR #37) — så själva sorteringsvalet gjorde att varje
 * forumtråd renderades om för varje besökare.
 *
 * Sortering är en ren omordning av data som redan är hämtad, så den hör
 * hemma här: servern skickar inläggen EN gång (sorterade äldst-först, samma
 * för alla → cachebar HTML, och klientkomponenter serverrenderas så
 * innehållet ligger i den statiska HTML:en för både besökare och Google),
 * och klienten ordnar om lokalt utan navigering. Sorteringslogiken speglar
 * getPostsByThread: hjälpsamma = likes desc sedan tid, bästa svar alltid
 * först utom vid "nyast".
 */

export type PostData = {
  id: string
  user_id: string
  body: string
  created_at: string
  like_count: number
  author: { username: string; avatar: string | null } | null
}

export function PostHeader({
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
      {avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
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

function sortera(posts: PostData[], sort: ForumSort, bestPostId: string | null): PostData[] {
  const ut = [...posts]
  if (sort === 'nyast') {
    ut.sort((a, b) => b.created_at.localeCompare(a.created_at))
    return ut // vid "nyast" lyfts bästa svar inte — samma som serverlogiken
  }
  if (sort === 'hjalpsamma') {
    ut.sort((a, b) => (b.like_count ?? 0) - (a.like_count ?? 0) || a.created_at.localeCompare(b.created_at))
  } else {
    ut.sort((a, b) => a.created_at.localeCompare(b.created_at))
  }
  if (bestPostId) {
    const idx = ut.findIndex(p => p.id === bestPostId)
    if (idx > 0) {
      const [best] = ut.splice(idx, 1)
      if (best) ut.unshift(best)
    }
  }
  return ut
}

export default function ForumPostList({
  posts,
  threadId,
  bestPostId,
}: {
  posts: PostData[]
  threadId: string
  bestPostId: string | null
}) {
  const { isThreadOwner } = useForumViewer()
  // Utgångsläget måste matcha serverns rendering ('aldst'), annars
  // hydreringsfel — samma princip som ProfileTabs.
  const [sort, setSort] = useState<ForumSort>('aldst')
  const sorterade = sortera(posts, sort, bestPostId)

  if (posts.length === 0) return null

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
          {posts.length} svar
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--border, rgba(10,123,140,0.1))' }} />
        {posts.length > 1 && <ForumSortTabs current={sort} onChange={setSort} />}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sorterade.map((post, i) => {
          const isBest = bestPostId === post.id
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
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                  {(isThreadOwner || isBest) && (
                    <BestAnswerButton
                      threadId={threadId}
                      postId={post.id}
                      isBest={isBest}
                    />
                  )}
                  <ForumQuoteButton username={post.author?.username ?? 'Okänd'} body={post.body} />
                  <ForumPostActions
                    postId={post.id}
                    authorId={post.user_id}
                    initialBody={post.body}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
