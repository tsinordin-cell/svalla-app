'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Icon, { type IconName } from './Icon'

/**
 * Säsong-driven banner i feed för att synliggöra nya verktyg.
 * Innehåll byts utifrån månad. Dismissable per banner-id (localStorage).
 */
type Banner = {
  id: string
  title: string
  body: string
  href: string
  cta: string
  accent: string
  icon: IconName
}

const STORAGE_KEY = 'svalla_dismissed_banners'

function pickBanner(): Banner {
  const month = new Date().getMonth() + 1 // 1-12
  // Maj–augusti: skärgårdsbingo (sommarutmaning)
  if (month >= 5 && month <= 8) {
    return {
      id: 'bingo-2026',
      title: 'Skärgårdsbingo 2026',
      body: '25 utmaningar att bocka av i sommar — segla, äta räkor, spotta säl.',
      href: '/bingo',
      cta: 'Spela →',
      accent: '#7c3aed',
      icon: 'trophy',
    }
  }
  // Mars–april: planera inför säsong
  if (month === 3 || month === 4) {
    return {
      id: 'utflykt-vår',
      title: 'Planera vårens första utflykt',
      body: 'Få restid, packlista och krogar — välj ö och vi gör resten.',
      href: '/utflykt',
      cta: 'Planera →',
      accent: '#0a7b8c',
      icon: 'navigation',
    }
  }
  // September–oktober: eftersäsong reflektion
  if (month === 9 || month === 10) {
    return {
      id: 'jamfor-höst',
      title: 'Bestäm dig till nästa år',
      body: 'Jämför öar du inte hann besöka — Sandhamn vs Möja, Utö vs Grinda.',
      href: '/jamfor',
      cta: 'Jämför →',
      accent: '#c96e2a',
      icon: 'check',
    }
  }
  // November–februari: forum + community
  return {
    id: 'forum-vinter',
    title: 'Diskutera båt & skärgård',
    body: 'Vinterförvaring, vårplanering, frågor som behöver svar — forumet är öppet.',
    href: '/forum',
    cta: 'Gå med →',
    accent: '#1d4ed8',
    icon: 'users',
  }
}

export default function SeasonToolBanner() {
  const banner = pickBanner()
  const [dismissed, setDismissed] = useState<boolean | null>(null) // null = ej hydrerad än

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const list: string[] = raw ? JSON.parse(raw) : []
      setDismissed(list.includes(banner.id))
    } catch {
      setDismissed(false)
    }
  }, [banner.id])

  function handleDismiss(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const list: string[] = raw ? JSON.parse(raw) : []
      if (!list.includes(banner.id)) list.push(banner.id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    } catch {}
    setDismissed(true)
  }

  if (dismissed !== false) return null  // null = ej hydrerad → render inget för att undvika layout-flash

  return (
    <Link
      href={banner.href}
      style={{
        display: 'block',
        margin: '12px 12px 16px',
        padding: '14px 16px',
        background: `linear-gradient(135deg, ${banner.accent}11, ${banner.accent}05)`,
        border: `1px solid ${banner.accent}28`,
        borderRadius: 14,
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        boxShadow: `0 1px 4px ${banner.accent}10`,
      }}
    >
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dölj"
        style={{
          position: 'absolute', top: 8, right: 8,
          width: 24, height: 24, borderRadius: '50%',
          border: 'none',
          background: 'transparent',
          color: 'var(--txt3)',
          fontSize: 14, lineHeight: 1,
          cursor: 'pointer',
        }}
      >
        ×
      </button>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{
          width: 36, height: 36, flexShrink: 0,
          borderRadius: 10,
          background: banner.accent,
          color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={banner.icon} size={20} stroke={1.9} />
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingRight: 24 }}>
          <div style={{
            fontSize: 14, fontWeight: 700,
            color: 'var(--txt)', marginBottom: 2,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            {banner.title}
          </div>
          <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.45, marginBottom: 6 }}>
            {banner.body}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: banner.accent }}>
            {banner.cta}
          </div>
        </div>
      </div>
    </Link>
  )
}
