'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { kalenderPagar, kalenderSynlig, oppnaLuckor, FORHANDS_KOD } from '@/lib/julkalender'
import { track } from '@/lib/analytics-events'

/**
 * Litet svävande paket med skylt uppe till vänster i startsidans himmel (2026-11-12).
 * Visas 1–24 december, eller med ?julkalender=1 för att titta i förväg.
 * Paketet bär dagens datum. Hela paketet och skylten är en vanlig länk till /julkalender.
 */
export default function JulkalenderSkylt() {
  const [dag, setDag] = useState<number | null>(null)
  const [href, setHref] = useState('/julkalender')

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    // Förhandslänken (?forhand=kod) visar paketet och tar med koden in i kalendern
    const kod = sp.get('forhand') === FORHANDS_KOD
    const forhand = sp.get('julkalender') === '1' || kod
    if (kod) setHref(`/julkalender?forhand=${FORHANDS_KOD}`)
    if (kalenderPagar()) setDag(oppnaLuckor())
    else if (kalenderSynlig() || forhand) setDag(0)
  }, [])

  if (dag === null) return null

  return (
    <Link href={href} className="julskylt" aria-label={dag === 0 ? 'Svallas julkalender öppnar 1 december' : `Svallas julkalender, öppna lucka ${dag}`} onClick={() => { if (href === '/julkalender') track('julkalender_klick', { plats: 'startsida', dag }) }}>
      <style>{`
        .julskylt{position:absolute;top:78px;left:22px;z-index:50;display:flex;align-items:center;gap:6px;text-decoration:none;animation:julsva 3.2s ease-in-out infinite;transform-origin:8px 0}
        .julskylt span{background:rgba(255,255,255,.92);border-radius:8px;padding:4px 8px;color:#0f2f40;font-size:11.5px;font-weight:600;line-height:1.2;white-space:nowrap}
        .julskylt b{color:#b5591a;font-weight:700}
        .julskylt i{font-style:normal}.julskylt .kort{display:none}
        @media (min-width:600px) and (max-width:999px){.julskylt .lang{display:none}.julskylt .kort{display:inline}}
        @keyframes julsva{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-3px) rotate(2deg)}}
        .julskylt svg{width:15px;height:20px;flex-shrink:0}
        @media (min-width:1000px){.julskylt{top:90px;left:28px;gap:9px}.julskylt svg{width:30px;height:40px}.julskylt span{font-size:16px;padding:6px 12px;border-radius:10px}}
        @media (min-width:1400px){.julskylt{top:96px;left:32px;gap:12px}.julskylt svg{width:45px;height:60px}.julskylt span{font-size:20px;padding:8px 16px;border-radius:12px}}
        @media (max-width:600px){.julskylt{top:68px;left:14px}.julskylt span{font-size:11px}}
        @media (prefers-reduced-motion: reduce){.julskylt{animation:none}}
      `}</style>
      <svg width="15" height="20" viewBox="0 0 44 58" aria-hidden="true">
        <path d="M22 0 V14" stroke="#7a8a96" strokeWidth="1.6" />
        <rect x="6" y="22" width="32" height="30" rx="3" fill="#c0392b" />
        <rect x="4" y="16" width="36" height="9" rx="2" fill="#d94a3a" />
        <rect x="19" y="16" width="6" height="36" fill="#f2c230" />
        <path d="M22 16 C14 6 8 12 16 16 M22 16 C30 6 36 12 28 16" stroke="#f2c230" strokeWidth="3" fill="none" />
        <text x="22" y="45" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" fontFamily="Georgia">{dag || 1}</text>
      </svg>
      <span>{dag === 0 ? <><i className="lang">Svallas julkalender öppnar 1 december</i><i className="kort">Julkalender 1 december</i></> : 'Svallas julkalender'} <b>→</b></span>
    </Link>
  )
}
