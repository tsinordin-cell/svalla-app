'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { kalenderPagar, oppnaLuckor } from '@/lib/julkalender'

/**
 * Litet svävande paket med skylt uppe till vänster i startsidans himmel (2026-11-12).
 * Visas 1–24 december, eller med ?julkalender=1 för att titta i förväg.
 * Paketet bär dagens datum. Hela paketet och skylten är en vanlig länk till /julkalender.
 */
export default function JulkalenderSkylt() {
  const [dag, setDag] = useState<number | null>(null)

  useEffect(() => {
    const forhand = new URLSearchParams(window.location.search).get('julkalender') === '1'
    if (kalenderPagar()) setDag(oppnaLuckor())
    else if (forhand) setDag(new Date().getMonth() === 11 ? Math.min(new Date().getDate(), 24) : 1)
  }, [])

  if (dag === null) return null

  return (
    <Link href="/julkalender" className="julskylt" aria-label={`Svallas julkalender, öppna lucka ${dag}`}>
      <style>{`
        .julskylt{position:absolute;top:78px;left:22px;z-index:50;display:flex;align-items:center;gap:6px;text-decoration:none;animation:julsva 3.2s ease-in-out infinite;transform-origin:8px 0}
        .julskylt span{background:rgba(255,255,255,.92);border-radius:8px;padding:4px 8px;color:#0f2f40;font-size:11.5px;font-weight:600;line-height:1.2;white-space:nowrap}
        .julskylt b{color:#b5591a;font-weight:700}
        @keyframes julsva{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-3px) rotate(2deg)}}
        @media (max-width:600px){.julskylt{top:68px;left:14px}.julskylt span{font-size:11px}}
        @media (prefers-reduced-motion: reduce){.julskylt{animation:none}}
      `}</style>
      <svg width="15" height="20" viewBox="0 0 44 58" aria-hidden="true">
        <path d="M22 0 V14" stroke="#7a8a96" strokeWidth="1.6" />
        <rect x="6" y="22" width="32" height="30" rx="3" fill="#c0392b" />
        <rect x="4" y="16" width="36" height="9" rx="2" fill="#d94a3a" />
        <rect x="19" y="16" width="6" height="36" fill="#f2c230" />
        <path d="M22 16 C14 6 8 12 16 16 M22 16 C30 6 36 12 28 16" stroke="#f2c230" strokeWidth="3" fill="none" />
        <text x="22" y="45" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" fontFamily="Georgia">{dag}</text>
      </svg>
      <span>Svallas julkalender <b>→</b></span>
    </Link>
  )
}
