'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { type BingoItem } from './bingo-data'

const STORAGE_KEY = 'svalla_bingo_2026'

const CATEGORY_LABEL: Record<BingoItem['category'], string> = {
  ö: 'Ö',
  aktivitet: 'Aktivitet',
  mat: 'Mat',
  utmaning: 'Utmaning',
  natur: 'Natur',
}

const CATEGORY_COLOR: Record<BingoItem['category'], string> = {
  ö: '#0a7b8c',
  aktivitet: '#2d7d8a',
  mat: '#c96e2a',
  utmaning: '#7c3aed',
  natur: '#0a7b3c',
}

interface Props {
  items: BingoItem[]
}

export default function BingoClient({ items }: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)
  const [shareStatus, setShareStatus] = useState<string | null>(null)

  // Ladda från localStorage på client-mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const arr = JSON.parse(raw) as string[]
        setChecked(new Set(arr))
      }
    } catch {}
    setHydrated(true)
  }, [])

  // Persistera vid varje förändring
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checked)))
    } catch {}
  }, [checked, hydrated])

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function reset() {
    if (!confirm('Är du säker? Alla markeringar nollställs.')) return
    setChecked(new Set())
  }

  async function share() {
    const count = checked.size
    const total = items.length
    const text = count === 0
      ? `Jag har precis börjat min Skärgårdsbingo 2026 — 25 utmaningar att bocka av. Hur många kan du klara?`
      : count === total
      ? `🎉 Jag har klarat ALLA 25 utmaningar i Skärgårdsbingo 2026! Klarar du det också?`
      : `Jag har bockat av ${count}/${total} utmaningar i Skärgårdsbingo 2026. Hur många klarar du?`
    const url = 'https://svalla.se/bingo'

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Skärgårdsbingo 2026', text, url })
        setShareStatus('Delat!')
      } else {
        await navigator.clipboard.writeText(`${text}\n\n${url}`)
        setShareStatus('Länk kopierad!')
      }
      setTimeout(() => setShareStatus(null), 2500)
    } catch {
      setShareStatus(null)
    }
  }

  // Statistik per kategori
  const stats = useMemo(() => {
    const total = items.length
    const checkedCount = checked.size
    const byCategory = items.reduce<Record<string, { done: number; total: number }>>((acc, item) => {
      const key = item.category
      if (!acc[key]) acc[key] = { done: 0, total: 0 }
      acc[key].total += 1
      if (checked.has(item.id)) acc[key].done += 1
      return acc
    }, {})
    return { total, checkedCount, byCategory }
  }, [items, checked])

  const progress = stats.total > 0 ? (stats.checkedCount / stats.total) * 100 : 0

  return (
    <div>
      {/* Status-card */}
      <section style={{
        background: 'var(--white)',
        border: '1px solid var(--surface-3)',
        borderRadius: 16,
        padding: '20px 22px',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
            Din bricka
          </h2>
          <div style={{ fontSize: 14, color: 'var(--sea)', fontWeight: 700 }}>
            {stats.checkedCount} / {stats.total}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          height: 8, borderRadius: 4,
          background: 'var(--surface-2)',
          overflow: 'hidden',
          marginBottom: 14,
        }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--sea), var(--acc))',
            transition: 'width .3s ease',
          }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {Object.entries(stats.byCategory).map(([cat, s]) => (
            <span key={cat} style={{
              fontSize: 11, padding: '3px 10px', borderRadius: 999,
              background: CATEGORY_COLOR[cat as BingoItem['category']] + '15',
              color: CATEGORY_COLOR[cat as BingoItem['category']],
              fontWeight: 700,
            }}>
              {CATEGORY_LABEL[cat as BingoItem['category']]}: {s.done}/{s.total}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={share}
            style={{
              padding: '10px 20px', borderRadius: 10, border: 'none',
              background: 'var(--sea)', color: '#fff', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', flex: '1 1 200px',
            }}
          >
            {shareStatus || 'Dela bricka →'}
          </button>
          <button
            onClick={reset}
            disabled={stats.checkedCount === 0}
            style={{
              padding: '10px 16px', borderRadius: 10,
              border: '1px solid var(--surface-3)',
              background: 'transparent',
              color: stats.checkedCount === 0 ? 'var(--txt3)' : 'var(--txt2)',
              fontSize: 13, fontWeight: 600,
              cursor: stats.checkedCount === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Nollställ
          </button>
        </div>
      </section>

      {/* Vinst-meddelande */}
      {hydrated && stats.checkedCount === stats.total && (
        <section style={{
          background: 'linear-gradient(135deg, #0a7b3c, #2d7d8a)',
          color: '#fff',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 16,
          textAlign: 'center',
        }}>
          <div style={{ display: 'inline-flex', marginBottom: 8, color: '#fff' }}>
            <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 6px', fontFamily: "'Playfair Display', Georgia, serif" }}>
            BINGO!
          </h2>
          <p style={{ fontSize: 14, opacity: 0.92, margin: 0 }}>
            Du har klarat alla 25 utmaningar — du är en riktig skärgårdsräv. Dela din bricka!
          </p>
        </section>
      )}

      {/* Bingobrickan — 5×5 grid */}
      <section>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 10,
        }}>
          {items.map(item => {
            const isChecked = checked.has(item.id)
            const color = CATEGORY_COLOR[item.category]
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                aria-pressed={isChecked}
                style={{
                  position: 'relative',
                  background: isChecked ? color : 'var(--white)',
                  border: `2px solid ${isChecked ? color : 'var(--surface-3)'}`,
                  borderRadius: 14,
                  padding: '16px 14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all .15s',
                  minHeight: 120,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  color: isChecked ? '#fff' : 'var(--txt)',
                  fontFamily: 'inherit',
                }}
              >
                <div>
                  <div style={{
                    fontSize: 9, fontWeight: 700,
                    color: isChecked ? 'rgba(255,255,255,0.85)' : color,
                    textTransform: 'uppercase', letterSpacing: 0.6,
                    marginBottom: 6,
                  }}>
                    {CATEGORY_LABEL[item.category]}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.35 }}>
                    {item.text}
                  </div>
                </div>
                {item.hint && (
                  <div style={{
                    fontSize: 10,
                    color: isChecked ? 'rgba(255,255,255,0.78)' : 'var(--txt3)',
                    lineHeight: 1.4, marginTop: 8,
                  }}>
                    {item.hint}
                  </div>
                )}
                {isChecked && (
                  <span style={{
                    position: 'absolute', top: 8, right: 10,
                    fontSize: 18, fontWeight: 700, color: '#fff',
                  }}>
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* Footer-länkar */}
      <div style={{
        marginTop: 32, padding: '20px 22px',
        background: 'var(--white)', borderRadius: 14,
        border: '1px solid var(--surface-3)',
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Behöver du tips?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 14 }}>
          <Link href="/utflykt" style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>
            Planera en utflykt →
          </Link>
          <Link href="/aktivitet" style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>
            Alla aktiviteter →
          </Link>
          <Link href="/rutter?vy=oar" style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>
            Bläddra öar →
          </Link>
        </div>
      </div>
    </div>
  )
}
