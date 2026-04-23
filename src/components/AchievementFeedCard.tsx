'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { AchievementEvent } from '@/lib/achievementEvents'
import { timeAgo } from '@/lib/utils'
import ProfileTeaserPopover from './ProfileTeaserPopover'

export default function AchievementFeedCard({ ev }: { ev: AchievementEvent }) {
  if (!ev.username || !ev.label) return null

  return (
    <article style={{
      background: 'linear-gradient(135deg, rgba(232,160,32,0.08), rgba(201,110,42,0.05))',
      border: '1.5px solid rgba(232,160,32,0.20)',
      borderRadius: 20,
      padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: '0 2px 16px rgba(0,30,50,0.06)',
      WebkitTapHighlightColor: 'transparent',
    }}>
      <ProfileTeaserPopover username={ev.username}>
        <Link href={`/u/${ev.username}`} style={{ display: 'inline-block' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', flexShrink: 0, overflow: 'hidden',
            background: 'var(--grad-sea)', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff',
          }}>
            {ev.avatar
              ? <Image src={ev.avatar} alt={ev.username} fill sizes="40px" style={{ objectFit: 'cover' }} />
              : ev.username[0]?.toUpperCase()}
          </div>
        </Link>
      </ProfileTeaserPopover>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.35 }}>
          <Link href={`/u/${ev.username}`} style={{ fontWeight: 600, color: 'var(--txt)', textDecoration: 'none' }}>
            @{ev.username}
          </Link>
          {' '}låste upp{' '}
          <span style={{ fontWeight: 600, color: 'var(--acc)' }}>{ev.label}</span>
        </div>
        {ev.desc && (
          <div suppressHydrationWarning style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>
            {ev.desc} · {timeAgo(ev.awarded_at)}
          </div>
        )}
      </div>

      {/* Stort emoji-badge till höger */}
      <div style={{
        width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg,#e8a020,#c96e2a)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28,
        boxShadow: '0 4px 14px rgba(201,110,42,0.35)',
      }}>
        {ev.emoji ?? '🏆'}
      </div>
    </article>
  )
}
