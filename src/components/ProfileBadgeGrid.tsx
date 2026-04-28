'use client'

import { useState } from 'react'
import { ACHIEVEMENTS } from '@/lib/achievements'

const LOCKED_DEFAULT = 4

export default function ProfileBadgeGrid({ unlockedIds }: { unlockedIds: string[] }) {
  const [showAll, setShowAll] = useState(false)

  const unlockedAch = ACHIEVEMENTS.filter(a => unlockedIds.includes(a.id))
  const lockedAch   = ACHIEVEMENTS.filter(a => !unlockedIds.includes(a.id))
  const visibleLocked = showAll ? lockedAch : lockedAch.slice(0, LOCKED_DEFAULT)
  const hiddenCount   = lockedAch.length - LOCKED_DEFAULT
  const badgesToShow  = [...unlockedAch, ...visibleLocked]
  const next = lockedAch[0]

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {badgesToShow.map(a => {
          const unlocked = unlockedIds.includes(a.id)
          return (
            <div key={a.id} title={`${a.label} — ${a.desc}`} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4, padding: '9px 4px 7px',
              borderRadius: 14,
              background: unlocked ? 'rgba(10,123,140,0.06)' : 'rgba(0,0,0,0.03)',
              border: `1.5px solid ${unlocked ? 'rgba(10,123,140,0.16)' : 'rgba(0,0,0,0.06)'}`,
              opacity: unlocked ? 1 : 0.38,
              filter: unlocked ? 'none' : 'grayscale(1)',
              boxShadow: unlocked ? '0 2px 8px rgba(0,45,60,0.07)' : 'none',
              position: 'relative',
            }}>
              {unlocked && (
                <div style={{
                  position: 'absolute', top: 5, right: 5,
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--green)',
                }} />
              )}
              <span style={{ fontSize: 20 }}>{a.emoji}</span>
              <span style={{
                fontSize: 9, fontWeight: 600,
                color: unlocked ? 'var(--txt)' : 'var(--txt3)',
                textAlign: 'center', lineHeight: 1.3,
                maxWidth: 56, overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              } as React.CSSProperties}>{a.label}</span>
            </div>
          )
        })}
      </div>

      {!showAll && hiddenCount > 0 && (
        <button onClick={() => setShowAll(true)} style={{
          display: 'block', width: '100%', marginTop: 10,
          padding: '9px', borderRadius: 12,
          border: '1.5px solid rgba(10,123,140,0.12)',
          background: 'rgba(10,123,140,0.04)',
          fontSize: 12, fontWeight: 600, color: 'var(--sea)',
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Visa {hiddenCount} fler märken
        </button>
      )}
      {showAll && lockedAch.length > LOCKED_DEFAULT && (
        <button onClick={() => setShowAll(false)} style={{
          display: 'block', width: '100%', marginTop: 10,
          padding: '9px', borderRadius: 12,
          border: 'none', background: 'none',
          fontSize: 12, fontWeight: 600, color: 'var(--txt3)',
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Visa färre
        </button>
      )}

      {next && (
        <div style={{ marginTop: 10, padding: '10px 12px', background: 'rgba(201,110,42,0.07)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20, filter: 'grayscale(0.3)', opacity: 0.8 }}>{next.emoji}</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--acc)', marginBottom: 2 }}>Nästa: {next.label}</div>
            <div style={{ fontSize: 11, color: 'var(--txt3)', lineHeight: 1.4 }}>{next.desc}</div>
          </div>
        </div>
      )}
    </>
  )
}
