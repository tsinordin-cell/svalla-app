'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import Icon from '@/components/Icon'
import { formatForumDate } from '@/lib/forum-utils'
import { STATIC_CATEGORIES } from '@/lib/forum-categories'

interface SubscribedThread {
  id: string
  title: string
  category_id: string
  reply_count: number
  last_reply_at: string
  is_solved: boolean | null
}

/**
 * Visar lista över forum-trådar som användaren prenumererar på.
 * Mountas på /profil. Tom lista renderar inget — undviker visuell bus.
 */
export default function ProfileForumSubscriptions({ userId }: { userId: string }) {
  const [threads, setThreads] = useState<SubscribedThread[] | null>(null)

  useEffect(() => {
    let cancelled = false
    const supabase = createClient()
    ;(async () => {
      const { data: subs } = await supabase
        .from('forum_subscriptions')
        .select('thread_id')
        .eq('user_id', userId)
      if (!subs || subs.length === 0) {
        if (!cancelled) setThreads([])
        return
      }
      const ids = subs.map((s: { thread_id: string }) => s.thread_id)
      const { data: rows } = await supabase
        .from('forum_threads')
        .select('id, title, category_id, reply_count, last_reply_at, is_solved')
        .in('id', ids)
        .eq('in_spam_queue', false)
        .order('last_reply_at', { ascending: false })
        .limit(10)
      if (!cancelled) setThreads((rows ?? []) as SubscribedThread[])
    })()
    return () => { cancelled = true }
  }, [userId])

  if (threads === null) {
    // Skeleton
    return (
      <div style={{
        background: 'var(--white)',
        borderRadius: 18,
        padding: '18px 16px',
        marginTop: 12,
        boxShadow: '0 1px 8px rgba(0,45,60,0.07)',
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 14 }}>
          Trådar du följer
        </div>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            height: 52, marginBottom: 8, borderRadius: 12,
            background: 'linear-gradient(90deg, rgba(10,123,140,0.05), rgba(10,123,140,0.10), rgba(10,123,140,0.05))',
            backgroundSize: '200% 100%',
            animation: 'svallaSkeleton 1.6s ease-in-out infinite',
          }}/>
        ))}
        <style>{`@keyframes svallaSkeleton { 0%,100%{background-position:0% 0%} 50%{background-position:100% 0%} }`}</style>
      </div>
    )
  }

  if (threads.length === 0) return null

  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: 18,
      padding: '18px 16px',
      marginTop: 12,
      boxShadow: '0 1px 8px rgba(0,45,60,0.07)',
    }}>
      <div style={{
        fontSize: 10, fontWeight: 600, color: 'var(--txt3)',
        textTransform: 'uppercase', letterSpacing: '0.6px',
        marginBottom: 14,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <Icon name="bell" size={11} stroke={2.2} />
        Trådar du följer
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {threads.map(t => {
          const cat = STATIC_CATEGORIES.find(c => c.id === t.category_id)
          return (
            <Link
              key={t.id}
              href={`/forum/${t.category_id}/${t.id}`}
              style={{
                display: 'block',
                padding: '12px 14px',
                borderRadius: 12,
                background: 'rgba(10,123,140,0.04)',
                border: '1px solid rgba(10,123,140,0.08)',
                textDecoration: 'none',
                color: 'var(--txt)',
                transition: 'background 150ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(10,123,140,0.09)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,123,140,0.04)' }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 10, fontWeight: 700, color: 'var(--sea)',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                marginBottom: 4,
              }}>
                {cat?.iconName && <Icon name={cat.iconName} size={11} stroke={2} />}
                {cat?.name ?? t.category_id}
                {t.is_solved && (
                  <span style={{
                    marginLeft: 6,
                    fontSize: 9, fontWeight: 800,
                    color: '#16a34a',
                    background: 'rgba(34,197,94,0.10)',
                    padding: '1px 6px', borderRadius: 4,
                  }}>LÖST</span>
                )}
              </div>
              <div style={{
                fontSize: 13.5, fontWeight: 600, color: 'var(--txt)',
                lineHeight: 1.4, marginBottom: 4,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {t.title}
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: 11, color: 'var(--txt3)',
              }}>
                <span>{t.reply_count} {t.reply_count === 1 ? 'svar' : 'svar'}</span>
                <span>·</span>
                <span>{formatForumDate(t.last_reply_at)}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
