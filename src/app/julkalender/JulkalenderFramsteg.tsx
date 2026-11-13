'use client'
import { useEffect, useState } from 'react'
import { lasOppnade } from './JulkalenderLucka'

/** "Du har öppnat X av Y luckor". Sparas på enheten, missade dagar straffas inte. */
export default function JulkalenderFramsteg({ oppna }: { oppna: number }) {
  const [antal, setAntal] = useState<number | null>(null)
  useEffect(() => {
    const las = () => setAntal(lasOppnade().filter(d => d <= oppna).length)
    las()
    window.addEventListener('julkalender-oppnad', las)
    return () => window.removeEventListener('julkalender-oppnad', las)
  }, [oppna])
  if (antal === null || oppna === 0) return null
  const text = antal === 0
    ? `${oppna === 1 ? 'Lucka 1 är öppen' : `${oppna} luckor är öppna`}. Börja med dagens!`
    : antal >= oppna
      ? `Du har öppnat alla ${oppna} luckor hittills.${oppna === 24 ? ' God jul!' : ' Ny lucka i morgon.'}`
      : `Du har öppnat ${antal} av ${oppna} luckor. Missade luckor går att öppna i efterhand.`
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 14, padding: '12px 14px', marginBottom: 14 }}>
      <div style={{ flex: 1, fontSize: 14, color: 'var(--ink)', fontWeight: 600 }}>{text}</div>
      <div aria-hidden="true" style={{ width: 90, height: 8, borderRadius: 8, background: 'var(--surface-2)', overflow: 'hidden' }}>
        <div style={{ width: `${Math.round((antal / 24) * 100)}%`, height: '100%', background: '#c0392b' }} />
      </div>
    </div>
  )
}
