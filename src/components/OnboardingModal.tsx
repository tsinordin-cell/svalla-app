'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

/* ─────────────────────────────────────────────────────────────────────────────
   OnboardingModal — Premium skärgårds-tour
   ────────────────────────────────────────────
   8 steg som faktiskt LÄR användaren produkten:

   1. WELCOME    — Animerad horisont + sailboat + sol/fyrtorn. Brand-moment.
   2. TOUR_LOG   — "Logga turer" — illustrerat sjökort med GPS-rutt.
   3. TOUR_MAP   — "Hitta krogar, bryggor, bastur" — sjökort med markörer.
   4. TOUR_COMM  — "Möt skärgårdsbor" — två båtar möts på vatten + forum-bubblor.
   5. BAT        — Snabb personalisering: båttyp.
   6. PORT       — Hemmavatten (med skärgårds-chips).
   7. FOLLOW     — Följ aktiva seglare.
   8. DONE       — "Klar för avgång" — båt seglar mot horisonten.

   Allt bär maritim känsla:
   - Animerade vågor i bakgrunden
   - Riktiga SVG-illustrationer (sjökort, sailboat, fyrtorn, kompass)
   - Maritime språk: "Sätt kurs", "Kasta loss", "Lägg från kaj"
   - Inga emojis. Bara SVG.
   - Sea-paletten genomgående (#061826 → #1e6880 + accent #c96e2a)
───────────────────────────────────────────────────────────────────────────── */

type Step = 'welcome' | 'tour_log' | 'tour_map' | 'tour_comm' | 'bat' | 'port' | 'follow' | 'done'

interface SuggestedUser {
  id: string
  username: string
  avatar: string | null
  trip_count: number
}

const TOUR_STEPS: Step[] = ['welcome', 'tour_log', 'tour_map', 'tour_comm', 'bat', 'port', 'follow', 'done']
const TOTAL_STEPS = TOUR_STEPS.length
const stepIdx = (s: Step) => TOUR_STEPS.indexOf(s)

/* ── Animationer ─────────────────────────────────────────────────────────── */
const KEYFRAMES = `
@keyframes ob-fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ob-ring {
  0%   { transform: scale(0.7); opacity: 0; }
  60%  { transform: scale(1.06); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes ob-spin { to { transform: rotate(360deg); } }
@keyframes ob-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
@keyframes ob-wave-shift {
  from { transform: translateX(0); }
  to   { transform: translateX(-120px); }
}
@keyframes ob-boat-bob {
  0%, 100% { transform: translate(0, 0) rotate(-1.5deg); }
  50%      { transform: translate(0, -3px) rotate(1.5deg); }
}
@keyframes ob-boat-sail {
  0%   { transform: translateX(-30%); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translateX(120%); opacity: 0.4; }
}
@keyframes ob-light-blink {
  0%, 92%, 100% { opacity: 0.18; }
  93%, 95%      { opacity: 1; }
}
@keyframes ob-compass-spin {
  0%   { transform: rotate(0deg); }
  85%  { transform: rotate(740deg); }
  100% { transform: rotate(720deg); }
}
@keyframes ob-marker-pop {
  from { transform: translateY(8px) scale(0.5); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}
@keyframes ob-route-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes ob-bubble-rise {
  0%   { transform: translateY(8px); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
}
`

/* ── Animerad havs-bakgrund (alla skärmar) ──────────────────────────────── */
function SeaBackdrop() {
  return (
    <div aria-hidden style={{
      position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
    }}>
      {/* Glow ovanifrån — sol/måne */}
      <div style={{
        position: 'absolute', top: '-10%', left: '60%', width: 360, height: 360,
        background: 'radial-gradient(circle, rgba(232,146,74,0.20) 0%, transparent 60%)',
        filter: 'blur(12px)',
      }}/>
      <div style={{
        position: 'absolute', top: '-15%', left: '5%', width: 320, height: 320,
        background: 'radial-gradient(circle, rgba(45,125,138,0.30) 0%, transparent 65%)',
        filter: 'blur(10px)',
      }}/>
      {/* Stjärnor / prick-mönster */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.45,
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px),' +
          'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '90px 90px, 56px 56px',
        backgroundPosition: '0 0, 45px 45px',
      }}/>
      {/* Vågor längst ner — animerade i två lager */}
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none"
           style={{ position: 'absolute', bottom: -10, left: 0, width: '120%', height: 80,
                    animation: 'ob-wave-shift 12s linear infinite', opacity: 0.18 }}>
        <path d="M0,60 C150,90 350,30 600,55 C850,80 1050,30 1200,60 L1200,120 L0,120 Z" fill="#65b8c8"/>
      </svg>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none"
           style={{ position: 'absolute', bottom: -20, left: 0, width: '125%', height: 90,
                    animation: 'ob-wave-shift 18s linear infinite reverse', opacity: 0.10 }}>
        <path d="M0,70 C200,100 400,40 600,70 C800,100 1000,40 1200,70 L1200,120 L0,120 Z" fill="#9ed5e1"/>
      </svg>
    </div>
  )
}

/* ── Hero-illustration (welcome) — fyrtorn + sailboat på horisonten ────── */
function HeroHorizon() {
  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: 360, aspectRatio: '16 / 10',
      margin: '0 auto 28px',
    }}>
      <svg viewBox="0 0 360 225" width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* Himmel-gradient */}
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#1a3d5a"/>
            <stop offset="60%" stopColor="#2d6582"/>
            <stop offset="100%" stopColor="#4a8da0"/>
          </linearGradient>
          <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4b06a" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#e8924a" stopOpacity="0.4"/>
          </linearGradient>
          <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e5c82"/>
            <stop offset="100%" stopColor="#0e3848"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="360" height="135" fill="url(#sky)" rx="12"/>
        {/* Sol på horisonten */}
        <circle cx="240" cy="125" r="22" fill="url(#sunset)"/>
        <circle cx="240" cy="125" r="32" fill="rgba(244,176,106,0.18)"/>
        {/* Skärgårds-silhuetter */}
        <path d="M-5 130 Q 30 110 60 122 Q 80 105 110 120 Q 140 102 175 125 L 175 135 L -5 135 Z" fill="rgba(8,28,48,0.72)"/>
        <path d="M280 132 Q 305 115 330 128 Q 350 112 365 130 L 365 135 L 280 135 Z" fill="rgba(8,28,48,0.65)"/>
        {/* Fyrtorn på liten ö i mitten */}
        <g transform="translate(178 95)">
          <path d="M-22 40 Q 0 28 22 40 L 22 42 L -22 42 Z" fill="rgba(8,28,48,0.78)"/>
          <rect x="-4" y="22" width="8" height="20" fill="#f5f4ef"/>
          <rect x="-4" y="22" width="8" height="20" fill="rgba(201,110,42,0.55)" mask="url(#stripes)"/>
          <rect x="-5" y="18" width="10" height="6" rx="1" fill="#1a2530"/>
          <circle cx="0" cy="14" r="3.5" fill="#f4b06a" style={{ animation: 'ob-light-blink 4s infinite' }}/>
          <circle cx="0" cy="14" r="9" fill="rgba(244,176,106,0.25)" style={{ animation: 'ob-light-blink 4s infinite' }}/>
        </g>
        {/* Hav */}
        <rect x="0" y="135" width="360" height="90" fill="url(#sea)" rx="0"/>
        {/* Vågor */}
        <path d="M0 150 Q 30 145 60 150 T 120 150 T 180 150 T 240 150 T 300 150 T 360 150" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none"/>
        <path d="M0 165 Q 35 160 70 165 T 140 165 T 210 165 T 280 165 T 360 165" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
        <path d="M0 182 Q 40 177 80 182 T 160 182 T 240 182 T 320 182 T 400 182" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none"/>
        {/* Sailboat — animerad bobbing */}
        <g transform="translate(70 155)" style={{ animation: 'ob-boat-bob 4s ease-in-out infinite', transformOrigin: 'center' }}>
          {/* Skrov */}
          <path d="M-18 4 L 18 4 L 14 12 L -14 12 Z" fill="#f5f4ef"/>
          <path d="M-18 4 L 18 4 L 14 12 L -14 12 Z" fill="rgba(30,92,130,0.4)"/>
          {/* Mast */}
          <line x1="0" y1="4" x2="0" y2="-22" stroke="#f5f4ef" strokeWidth="1.2"/>
          {/* Storsegel */}
          <path d="M0 -22 L 0 0 L 12 0 Z" fill="#f5f4ef"/>
          {/* Förseglet */}
          <path d="M0 -18 L 0 -2 L -10 0 Z" fill="rgba(245,244,239,0.85)"/>
          {/* Reflektion */}
          <ellipse cx="0" cy="14" rx="16" ry="2" fill="rgba(245,244,239,0.18)"/>
        </g>
        {/* Liten båt i fjärran */}
        <g transform="translate(290 145)" style={{ animation: 'ob-boat-bob 5s ease-in-out infinite' }}>
          <path d="M-6 1 L 6 1 L 5 4 L -5 4 Z" fill="rgba(245,244,239,0.7)"/>
          <line x1="0" y1="1" x2="0" y2="-8" stroke="rgba(245,244,239,0.7)" strokeWidth="0.7"/>
          <path d="M0 -8 L 4 0 L 0 0 Z" fill="rgba(245,244,239,0.65)"/>
        </g>
      </svg>
    </div>
  )
}

/* ── Tour-illustration: sjökort + GPS-rutt ─────────────────────────────── */
function ChartRouteIllustration() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 320, aspectRatio: '16 / 10', margin: '0 auto 24px' }}>
      <svg viewBox="0 0 320 200" width="100%" height="100%">
        <defs>
          <linearGradient id="chart-paper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5e9d0"/>
            <stop offset="100%" stopColor="#e8d8b3"/>
          </linearGradient>
        </defs>
        {/* Sjökortspapper */}
        <rect x="8" y="8" width="304" height="184" rx="12" fill="url(#chart-paper)"/>
        {/* Rutnät */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`v${i}`} x1={8 + i * 38} y1="8" x2={8 + i * 38} y2="192" stroke="rgba(60,90,130,0.15)" strokeWidth="0.5"/>
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="8" y1={8 + i * 46} x2="312" y2={8 + i * 46} stroke="rgba(60,90,130,0.15)" strokeWidth="0.5"/>
        ))}
        {/* Skärgårds-öar */}
        <path d="M50 60 Q 65 50 80 65 Q 70 75 55 75 Z" fill="#a8b58a"/>
        <path d="M120 90 Q 145 78 165 95 Q 170 110 145 115 Q 120 110 120 90 Z" fill="#a8b58a"/>
        <path d="M210 50 Q 230 45 245 60 Q 240 70 220 68 Z" fill="#a8b58a"/>
        <path d="M250 130 Q 280 122 290 140 Q 280 155 255 150 Z" fill="#a8b58a"/>
        <path d="M40 140 Q 60 132 70 145 Q 60 155 45 152 Z" fill="#a8b58a"/>
        {/* Djupkurvor */}
        <path d="M30 100 Q 100 80 180 95 Q 250 110 300 95" stroke="rgba(60,90,130,0.25)" strokeWidth="0.6" fill="none" strokeDasharray="2 3"/>
        {/* GPS-rutt — animerad ritning */}
        <path d="M40 165 Q 70 130 120 120 Q 175 110 220 80 Q 260 65 280 60"
              stroke="#c96e2a" strokeWidth="2.5" fill="none" strokeLinecap="round"
              strokeDasharray="320" strokeDashoffset="320"
              style={{ animation: 'ob-route-draw 1.6s 0.3s cubic-bezier(0.4,0,0.2,1) forwards' }}/>
        {/* Start-pin */}
        <circle cx="40" cy="165" r="4" fill="#c96e2a"/>
        <circle cx="40" cy="165" r="9" fill="rgba(201,110,42,0.20)"/>
        {/* End-pin */}
        <g transform="translate(280 60)" style={{ animation: 'ob-marker-pop 0.4s 1.6s both' }}>
          <path d="M0 -10 Q -7 -10 -7 -3 Q -7 4 0 10 Q 7 4 7 -3 Q 7 -10 0 -10 Z" fill="#1e5c82"/>
          <circle cx="0" cy="-3" r="2.5" fill="#f5f4ef"/>
        </g>
        {/* Liten sailboat på rutten */}
        <g transform="translate(175 105) rotate(-15)" style={{ animation: 'ob-boat-bob 3s ease-in-out infinite' }}>
          <path d="M-7 0 L 7 0 L 5 4 L -5 4 Z" fill="#1e5c82"/>
          <line x1="0" y1="0" x2="0" y2="-9" stroke="#1e5c82" strokeWidth="1"/>
          <path d="M0 -9 L 5 0 L 0 0 Z" fill="#f5f4ef" stroke="#1e5c82" strokeWidth="0.5"/>
        </g>
        {/* Statistik-banner */}
        <g transform="translate(20 175)">
          <rect x="0" y="0" width="100" height="14" rx="3" fill="rgba(30,92,130,0.85)"/>
          <text x="6" y="10" fontFamily="monospace" fontSize="8" fill="#f5f4ef" letterSpacing="0.5">14.2 NM · 3h 12m</text>
        </g>
      </svg>
    </div>
  )
}

/* ── Tour-illustration: sjökort med markörer (krog/brygga/bastu) ────── */
function MapMarkersIllustration() {
  const markers: { x: number; y: number; type: 'krog' | 'brygga' | 'bastu' | 'tank' }[] = [
    { x: 80,  y: 55,  type: 'krog' },
    { x: 175, y: 90,  type: 'brygga' },
    { x: 248, y: 60,  type: 'bastu' },
    { x: 230, y: 138, type: 'tank' },
    { x: 110, y: 130, type: 'brygga' },
  ]
  const pinColor: Record<typeof markers[number]['type'], string> = {
    krog: '#c96e2a',
    brygga: '#1e5c82',
    bastu: '#9d4d3a',
    tank: '#2d7d8a',
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 320, aspectRatio: '16 / 10', margin: '0 auto 24px' }}>
      <svg viewBox="0 0 320 200" width="100%" height="100%">
        <defs>
          <linearGradient id="map-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#aedce4"/>
            <stop offset="100%" stopColor="#7fb6c5"/>
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="304" height="184" rx="12" fill="url(#map-water)"/>
        {/* Större öar */}
        <path d="M30 30 Q 90 18 130 35 Q 145 55 110 75 Q 60 78 30 60 Z" fill="#a8b58a"/>
        <path d="M180 110 Q 240 100 280 125 Q 290 155 250 165 Q 200 168 175 145 Z" fill="#a8b58a"/>
        <path d="M210 30 Q 245 22 275 38 Q 280 55 255 60 Q 225 58 210 45 Z" fill="#a8b58a"/>
        {/* Mindre öar */}
        <ellipse cx="60" cy="120" rx="22" ry="9" fill="#a8b58a"/>
        <ellipse cx="155" cy="160" rx="16" ry="7" fill="#a8b58a"/>
        {/* Vågor */}
        <path d="M0 90 Q 40 86 80 90 T 160 90 T 240 90 T 320 90" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" fill="none"/>
        <path d="M0 175 Q 40 171 80 175 T 160 175 T 240 175 T 320 175" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" fill="none"/>
        {/* Markörer */}
        {markers.map((m, i) => (
          <g key={i} transform={`translate(${m.x} ${m.y})`} style={{ animation: `ob-marker-pop 0.4s ${0.2 + i * 0.12}s both` }}>
            <ellipse cx="0" cy="2" rx="6" ry="2" fill="rgba(0,0,0,0.18)"/>
            <path d="M0 -14 Q -8 -14 -8 -5 Q -8 4 0 13 Q 8 4 8 -5 Q 8 -14 0 -14 Z" fill={pinColor[m.type]}/>
            <circle cx="0" cy="-5" r="3" fill="#f5f4ef"/>
          </g>
        ))}
        {/* Kompass-ros */}
        <g transform="translate(280 165)">
          <circle cx="0" cy="0" r="14" fill="rgba(245,244,239,0.85)" stroke="rgba(8,28,48,0.5)" strokeWidth="0.7"/>
          <path d="M0 -10 L 2 0 L 0 10 L -2 0 Z" fill="#1e5c82"/>
          <path d="M-10 0 L 0 -2 L 10 0 L 0 2 Z" fill="rgba(8,28,48,0.4)"/>
          <text x="0" y="-15" fontSize="5" fontWeight="700" fill="#1e5c82" textAnchor="middle">N</text>
        </g>
      </svg>
    </div>
  )
}

/* ── Tour-illustration: två båtar möts + forum-bubblor ──────────────── */
function CommunityIllustration() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 320, aspectRatio: '16 / 10', margin: '0 auto 24px' }}>
      <svg viewBox="0 0 320 200" width="100%" height="100%">
        <defs>
          <linearGradient id="comm-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2d6582"/>
            <stop offset="100%" stopColor="#0e3848"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="320" height="200" rx="12" fill="url(#comm-sea)"/>
        {/* Stjärnor */}
        {[[40,30],[80,15],[140,25],[200,18],[270,35],[290,65]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r="0.8" fill="rgba(255,255,255,0.6)"/>
        ))}
        {/* Måne */}
        <circle cx="265" cy="40" r="14" fill="#f5f4ef" opacity="0.85"/>
        <circle cx="270" cy="38" r="12" fill="url(#comm-sea)" opacity="0.5"/>
        {/* Vågor */}
        <path d="M0 130 Q 40 125 80 130 T 160 130 T 240 130 T 320 130" stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none"/>
        <path d="M0 150 Q 40 145 80 150 T 160 150 T 240 150 T 320 150" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
        <path d="M0 170 Q 40 165 80 170 T 160 170 T 240 170 T 320 170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none"/>

        {/* Båt 1 (vänster) */}
        <g transform="translate(80 140)" style={{ animation: 'ob-boat-bob 3.5s ease-in-out infinite' }}>
          <path d="M-15 4 L 15 4 L 12 11 L -12 11 Z" fill="#f5f4ef"/>
          <line x1="0" y1="4" x2="0" y2="-22" stroke="#f5f4ef" strokeWidth="1.2"/>
          <path d="M0 -22 L 0 0 L 12 0 Z" fill="#f5f4ef"/>
          <path d="M0 -18 L 0 -2 L -10 0 Z" fill="rgba(245,244,239,0.85)"/>
        </g>

        {/* Båt 2 (höger) */}
        <g transform="translate(220 145)" style={{ animation: 'ob-boat-bob 4s ease-in-out infinite 0.5s' }}>
          <path d="M-13 4 L 13 4 L 11 10 L -11 10 Z" fill="#c96e2a"/>
          <line x1="0" y1="4" x2="0" y2="-20" stroke="#f5f4ef" strokeWidth="1"/>
          <path d="M0 -20 L 0 0 L -11 0 Z" fill="#f5f4ef"/>
          <path d="M0 -16 L 0 -2 L 9 0 Z" fill="rgba(245,244,239,0.85)"/>
        </g>

        {/* Pratbubbla 1 — kommer från vänster båt */}
        <g transform="translate(110 95)" style={{ animation: 'ob-bubble-rise 0.6s 0.4s both' }}>
          <path d="M0 0 L 70 0 Q 78 0 78 8 L 78 22 Q 78 30 70 30 L 18 30 L 8 38 L 12 30 L 8 30 Q 0 30 0 22 L 0 8 Q 0 0 8 0 Z"
                fill="#f5f4ef"/>
          <text x="39" y="20" fontSize="10" fontWeight="600" fill="#1e5c82" textAnchor="middle">Sandhamn?</text>
        </g>

        {/* Pratbubbla 2 — kommer från höger båt */}
        <g transform="translate(165 50)" style={{ animation: 'ob-bubble-rise 0.6s 0.9s both' }}>
          <path d="M0 0 L 80 0 Q 88 0 88 8 L 88 22 Q 88 30 80 30 L 70 30 L 80 38 L 60 30 L 8 30 Q 0 30 0 22 L 0 8 Q 0 0 8 0 Z"
                fill="#c96e2a"/>
          <text x="44" y="20" fontSize="10" fontWeight="600" fill="#f5f4ef" textAnchor="middle">Just lade till!</text>
        </g>

        {/* Hjärt-ikon flytande */}
        <g transform="translate(150 80)" style={{ animation: 'ob-bubble-rise 0.6s 1.4s both' }}>
          <path d="M0 6 L -6 0 Q -10 -4 -6 -8 Q -2 -12 0 -8 Q 2 -12 6 -8 Q 10 -4 6 0 Z" fill="#e8924a"/>
        </g>
      </svg>
    </div>
  )
}

/* ── Done-illustration: båt seglar mot horisonten ──────────────────── */
function DepartureIllustration() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 280, aspectRatio: '4 / 3', margin: '0 auto 24px' }}>
      <svg viewBox="0 0 280 210" width="100%" height="100%">
        <defs>
          <linearGradient id="done-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a3d5a"/>
            <stop offset="60%" stopColor="#3a7088"/>
            <stop offset="90%" stopColor="#e8924a"/>
            <stop offset="100%" stopColor="#f4b06a"/>
          </linearGradient>
          <linearGradient id="done-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e5c82"/>
            <stop offset="100%" stopColor="#0e3848"/>
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="264" height="120" rx="12" fill="url(#done-sky)"/>
        {/* Sol */}
        <circle cx="200" cy="115" r="22" fill="#f4b06a" opacity="0.95"/>
        <circle cx="200" cy="115" r="35" fill="rgba(244,176,106,0.30)"/>
        {/* Hav */}
        <rect x="8" y="125" width="264" height="80" rx="0" fill="url(#done-sea)"/>
        {/* Sol-reflektion */}
        <ellipse cx="200" cy="130" rx="40" ry="3" fill="rgba(244,176,106,0.55)"/>
        {/* Vågor */}
        <path d="M0 145 Q 40 141 80 145 T 160 145 T 240 145 T 320 145" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none"/>
        <path d="M0 165 Q 40 161 80 165 T 160 165 T 240 165 T 320 165" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" fill="none"/>
        <path d="M0 185 Q 40 181 80 185 T 160 185 T 240 185 T 320 185" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none"/>
        {/* Båt — animerad seglar bort */}
        <g style={{ animation: 'ob-boat-sail 6s ease-out infinite' }}>
          <g transform="translate(0 155)">
            <path d="M-18 4 L 18 4 L 14 12 L -14 12 Z" fill="#f5f4ef"/>
            <line x1="0" y1="4" x2="0" y2="-26" stroke="#f5f4ef" strokeWidth="1.4"/>
            <path d="M0 -26 L 0 0 L 14 0 Z" fill="#f5f4ef"/>
            <path d="M0 -20 L 0 -2 L -12 0 Z" fill="rgba(245,244,239,0.85)"/>
          </g>
        </g>
        {/* Liten ö-silhuett i fjärran */}
        <path d="M40 122 Q 60 116 80 124 L 80 128 L 40 128 Z" fill="rgba(8,28,48,0.7)"/>
        <path d="M250 122 Q 270 117 290 125 L 290 128 L 250 128 Z" fill="rgba(8,28,48,0.6)"/>
      </svg>
    </div>
  )
}

/* ── Båt-typ SVG:er ──────────────────────────────────────────────────── */
function SailboatIcon() {
  return (
    <svg width={36} height={36} viewBox="0 0 64 64" fill="none">
      <path d="M32 8 L32 46" stroke="rgba(245,244,239,0.92)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 10 L52 42 L14 42 Z" fill="rgba(245,244,239,0.18)" stroke="rgba(245,244,239,0.85)" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M32 16 L16 34 L32 34 Z" fill="rgba(245,244,239,0.12)" stroke="rgba(245,244,239,0.6)" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M10 46 Q32 54 54 46" stroke="rgba(165,205,225,0.85)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
function MotorboatIcon() {
  return (
    <svg width={36} height={36} viewBox="0 0 64 64" fill="none">
      <path d="M8 38 L20 28 L52 28 L58 38 Z" fill="rgba(245,244,239,0.18)" stroke="rgba(245,244,239,0.85)" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 28 L24 20 L42 20 L44 28" fill="rgba(245,244,239,0.10)" stroke="rgba(245,244,239,0.6)" strokeWidth="1.2"/>
      <path d="M50 32 L56 32" stroke="rgba(245,244,239,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M4 40 Q32 50 60 40" stroke="rgba(165,205,225,0.85)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
function KayakIcon() {
  return (
    <svg width={36} height={36} viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="36" rx="26" ry="7" fill="rgba(245,244,239,0.18)" stroke="rgba(245,244,239,0.85)" strokeWidth="1.5"/>
      <circle cx="32" cy="30" r="5" fill="rgba(245,244,239,0.20)" stroke="rgba(245,244,239,0.7)" strokeWidth="1.2"/>
      <path d="M18 25 L12 16" stroke="rgba(245,244,239,0.85)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M46 25 L52 16" stroke="rgba(245,244,239,0.85)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
function CharterIcon() {
  return (
    <svg width={36} height={36} viewBox="0 0 64 64" fill="none">
      {/* Anchor */}
      <circle cx="32" cy="14" r="4" stroke="rgba(245,244,239,0.85)" strokeWidth="1.8" fill="none"/>
      <line x1="32" y1="18" x2="32" y2="46" stroke="rgba(245,244,239,0.85)" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="22" y1="26" x2="42" y2="26" stroke="rgba(245,244,239,0.85)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 38 Q 32 56 50 38" stroke="rgba(245,244,239,0.85)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <line x1="14" y1="38" x2="10" y2="34" stroke="rgba(245,244,239,0.85)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="50" y1="38" x2="54" y2="34" stroke="rgba(245,244,239,0.85)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

const BOAT_OPTIONS = [
  { value: 'Segelbåt', label: 'Segelbåt',     Icon: SailboatIcon, desc: 'Kryss och slör mellan öarna' },
  { value: 'Motorbåt', label: 'Motorbåt',     Icon: MotorboatIcon, desc: 'Snabb genom skärgården' },
  { value: 'Kajak',    label: 'Kajak / SUP',  Icon: KayakIcon, desc: 'Nära vattnet och tystnaden' },
  { value: 'Charter',  label: 'Utan egen båt', Icon: CharterIcon, desc: 'Hyr, åk med, eller besätter' },
]

const COMMON_PORTS = [
  'Stockholm', 'Vaxholm', 'Saltsjöbaden', 'Värmdö',
  'Sandhamn', 'Marstrand', 'Smögen', 'Göteborg',
  'Strömstad', 'Trosa', 'Nynäshamn', 'Dalarö',
]

/* ── Generic ikoner ─────────────────────────────────────────────────── */
function CheckIcon({ size = 18, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function ArrowRightIcon({ size = 16, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

/* ── Kompass-progress ───────────────────────────────────────────────── */
function CompassProgress({ current }: { current: Step }) {
  if (current === 'welcome' || current === 'done') return null
  const idx = stepIdx(current)
  const pct = (idx / (TOTAL_STEPS - 1)) * 100
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 }}>
      {/* Liten kompass-ros */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="rgba(165,205,225,0.7)" strokeWidth="1.2"/>
        <path d="M12 4 L 13.5 12 L 12 20 L 10.5 12 Z" fill="rgba(165,205,225,0.85)"/>
        <path d="M4 12 L 12 10.5 L 20 12 L 12 13.5 Z" fill="rgba(165,205,225,0.45)"/>
      </svg>
      {/* Bar */}
      <div style={{
        position: 'relative', width: 180, height: 4, borderRadius: 999,
        background: 'rgba(255,255,255,0.10)', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, width: `${pct}%`,
          background: 'linear-gradient(90deg, #2d7d8a, #65b8c8)',
          borderRadius: 999, transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: '0 0 14px rgba(101,184,200,0.55)',
        }}/>
      </div>
      <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em' }}>
        {idx + 1}/{TOTAL_STEPS}
      </span>
    </div>
  )
}

/* ── Layout-konstanter ─────────────────────────────────────────────── */
const OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 1100,
  background: 'linear-gradient(160deg, #061826 0%, #0c2e45 35%, #155070 75%, #1e6880 100%)',
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  overflowY: 'auto',
  padding: 'env(safe-area-inset-top,16px) 20px env(safe-area-inset-bottom,32px)',
}

const CARD: React.CSSProperties = {
  position: 'relative', zIndex: 1,
  width: '100%', maxWidth: 460, paddingTop: 28,
  display: 'flex', flexDirection: 'column',
  animation: 'ob-fadeUp 0.42s cubic-bezier(0.22,1,0.36,1) both',
}

const HEADING: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 30, fontWeight: 800, color: '#fff',
  margin: '0 0 10px', letterSpacing: '-0.5px', lineHeight: 1.18,
  textAlign: 'center',
}

const SUBTITLE: React.CSSProperties = {
  fontSize: 15, color: 'rgba(255,255,255,0.68)',
  margin: '0 auto 26px', lineHeight: 1.55, maxWidth: 380, textAlign: 'center',
}

const PRIMARY_BTN = (disabled = false): React.CSSProperties => ({
  flex: 1, padding: '15px 20px', borderRadius: 14, border: 'none',
  cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
  background: disabled
    ? 'rgba(255,255,255,0.08)'
    : 'linear-gradient(135deg, #1e5c82 0%, #2d7d8a 50%, #65b8c8 100%)',
  color: disabled ? 'rgba(255,255,255,0.30)' : '#fff',
  fontSize: 15, fontWeight: 700, letterSpacing: '0.02em',
  boxShadow: disabled ? 'none' : '0 8px 28px rgba(45,125,138,0.40)',
  transition: 'all 0.2s',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
})

const SKIP_BTN: React.CSSProperties = {
  padding: '13px 18px', borderRadius: 14,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: 'rgba(255,255,255,0.55)',
  fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
  whiteSpace: 'nowrap',
}

const BACK_BTN: React.CSSProperties = {
  padding: '13px 16px', borderRadius: 14,
  border: 'none', background: 'transparent',
  color: 'rgba(255,255,255,0.55)',
  fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
}

/* ──────────────────────────────────────────────────────────────────────────
   HUVUDKOMPONENT
─────────────────────────────────────────────────────────────────────────── */
export default function OnboardingModal() {
  const router = useRouter()
  const [supabase] = useState(() => createClient())

  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>('welcome')
  const [animKey, setAnimKey] = useState(0)

  // User
  const [myId, setMyId] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  // Form state
  const [boatType, setBoatType] = useState<string | null>(null)
  const [savingBoat, setSavingBoat] = useState(false)
  const [homePort, setHomePort] = useState('')
  const [savingPort, setSavingPort] = useState(false)

  // Follow
  const [users, setUsers] = useState<SuggestedUser[]>([])
  const [followed, setFollowed] = useState<Set<string>>(new Set())
  const [loadingUsers, setLoadingUsers] = useState(false)

  /* Visa onboarding bara för nya/oboardade */
  useEffect(() => {
    setMounted(true)
    if (typeof window === 'undefined') return
    if (localStorage.getItem('svalla_onboarded')) return
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      setMyId(data.user.id)

      const meta = data.user.user_metadata ?? {}
      const name = (meta.full_name as string) ?? (meta.name as string) ?? ''
      const firstName = name.split(' ')[0] ?? ''
      setDisplayName(firstName)
      setAvatarUrl((meta.avatar_url as string) ?? (meta.picture as string) ?? null)

      const { data: userRow } = await supabase
        .from('users')
        .select('boat_type, home_port, onboarded_at, created_at')
        .eq('id', data.user.id)
        .single()

      if (userRow?.onboarded_at) return
      const isNewUser = userRow?.created_at
        ? Date.now() - new Date(userRow.created_at).getTime() < 30 * 60 * 1000
        : false

      if (!userRow?.boat_type || isNewUser) setShow(true)
    })
  }, [supabase])

  /* Hämta seglare när vi når follow-steget */
  useEffect(() => {
    if (step !== 'follow' || !myId) return
    setLoadingUsers(true)
    supabase
      .from('users')
      .select('id, username, avatar')
      .neq('id', myId)
      .not('username', 'is', null)
      .limit(40)
      .then(async ({ data: allUsers }) => {
        if (!allUsers?.length) { setLoadingUsers(false); return }
        const { data: counts } = await supabase
          .from('trips')
          .select('user_id')
          .in('user_id', allUsers.map(u => u.id))
          .is('deleted_at', null)
        const countMap: Record<string, number> = {}
        counts?.forEach(r => { countMap[r.user_id] = (countMap[r.user_id] ?? 0) + 1 })
        const sorted = allUsers
          .map(u => ({ ...u, trip_count: countMap[u.id] ?? 0 }))
          .filter(u => u.trip_count > 0)
          .sort((a, b) => b.trip_count - a.trip_count)
          .slice(0, 8)
        if (sorted.length === 0) {
          // Fallback — visa alla även utan turer om inga aktiva finns
          setUsers(allUsers.slice(0, 8).map(u => ({ ...u, trip_count: 0 })))
        } else {
          setUsers(sorted)
        }
        setLoadingUsers(false)
      })
  }, [step, myId, supabase])

  if (!mounted || !show) return null

  /* Navigation */
  const goTo = (next: Step) => { setAnimKey(k => k + 1); setStep(next) }
  const goBack = () => {
    const idx = stepIdx(step)
    if (idx > 0) goTo(TOUR_STEPS[idx - 1]!)
  }
  const goNext = () => {
    const idx = stepIdx(step)
    if (idx < TOTAL_STEPS - 1) goTo(TOUR_STEPS[idx + 1]!)
  }

  const finish = async (target: string = '/feed') => {
    localStorage.setItem('svalla_onboarded', '1')
    if (myId) {
      // Idempotent: markerar onboardad så vi inte visar igen
      await supabase.from('users').update({ onboarded_at: new Date().toISOString() }).eq('id', myId)
    }
    setShow(false)
    if (target !== window.location.pathname) router.push(target)
  }

  /* Action handlers */
  const handleBoatSelect = async (value: string) => {
    setBoatType(value)
    if (!myId) return
    setSavingBoat(true)
    await supabase.from('users').update({ boat_type: value, vessel_model: value }).eq('id', myId)
    setSavingBoat(false)
  }
  const handleSavePort = async () => {
    if (!myId || homePort.trim().length < 2) return
    setSavingPort(true)
    await supabase.from('users').update({ home_port: homePort.trim() }).eq('id', myId)
    setSavingPort(false)
    goNext()
  }
  const toggleFollow = async (targetId: string) => {
    if (!myId) return
    const isFollowing = followed.has(targetId)
    const next = new Set(followed)
    if (isFollowing) {
      next.delete(targetId)
      setFollowed(next)
      await supabase.from('follows').delete().eq('follower_id', myId).eq('following_id', targetId)
    } else {
      next.add(targetId)
      setFollowed(next)
      await supabase.from('follows').insert({ follower_id: myId, following_id: targetId })
      // Trigga notiser + push (icke-blockerande)
      const { data: me } = await supabase.from('users').select('username').eq('id', myId).single()
      const myName = me?.username ?? 'Någon'
      Promise.allSettled([
        fetch('/api/notifications/insert', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetUserId: targetId, type: 'follow' }),
        }),
        fetch('/api/push/send', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetUserId: targetId, title: 'Ny följare', body: `${myName} börjar följa dig`, url: `/u/${myName}` }),
        }),
      ])
    }
  }

  /* ════════════════════════════════════════════════════════════════════════
     STEG 1 — WELCOME (brand-moment)
  ═══════════════════════════════════════════════════════════════════════ */
  if (step === 'welcome') return (
    <div style={OVERLAY} role="dialog" aria-modal="true" aria-label="Välkommen till Svalla">
      <style>{KEYFRAMES}</style>
      <SeaBackdrop/>
      <div key={animKey} style={{ ...CARD, justifyContent: 'center', minHeight: '90vh' }}>

        {/* Brand-vinjett */}
        <div style={{
          textAlign: 'center', marginBottom: 18,
          fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700,
          color: 'rgba(255,255,255,0.62)', letterSpacing: '0.32em',
          animation: 'ob-fadeUp 0.4s 0.1s both',
        }}>SVALLA</div>

        {/* Hero-illustration */}
        <div style={{ animation: 'ob-fadeUp 0.5s 0.18s both' }}>
          <HeroHorizon/>
        </div>

        {/* Avatar mini-chip om Google */}
        {avatarUrl && (
          <div style={{
            display: 'flex', justifyContent: 'center', marginBottom: 14,
            animation: 'ob-fadeUp 0.4s 0.28s both',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '6px 14px 6px 6px', borderRadius: 999,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatarUrl} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}/>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
                {displayName ? `Hej ${displayName}` : 'Inloggad'}
              </span>
            </div>
          </div>
        )}

        {/* Rubrik */}
        <h1 style={{ ...HEADING, animation: 'ob-fadeUp 0.45s 0.32s both' }}>
          Välkommen aboard
        </h1>
        <p style={{ ...SUBTITLE, animation: 'ob-fadeUp 0.45s 0.4s both' }}>
          Svalla är skärgårdens digitala hemmahamn. Logga turer, hitta krogar och bryggor,
          och möt andra som lever på vattnet. Vi tar dig genom det viktigaste på en minut.
        </p>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 10, animation: 'ob-fadeUp 0.45s 0.5s both' }}>
          <button onClick={goNext} className="press-feedback" style={PRIMARY_BTN(false)}>
            Kasta loss <ArrowRightIcon/>
          </button>
        </div>
        <button onClick={() => finish('/feed')} style={{
          ...BACK_BTN, marginTop: 14, alignSelf: 'center',
          animation: 'ob-fadeUp 0.45s 0.6s both',
        }}>
          Hoppa över touren
        </button>
      </div>
    </div>
  )

  /* ════════════════════════════════════════════════════════════════════════
     STEG 2 — TOUR: LOGGA TURER
  ═══════════════════════════════════════════════════════════════════════ */
  if (step === 'tour_log') return (
    <div style={OVERLAY} role="dialog" aria-modal="true">
      <style>{KEYFRAMES}</style>
      <SeaBackdrop/>
      <div key={animKey} style={CARD}>
        <CompassProgress current={step}/>
        <div style={{
          fontSize: 11, fontWeight: 700, color: 'rgba(165,205,225,0.85)',
          textTransform: 'uppercase', letterSpacing: '0.16em',
          textAlign: 'center', marginBottom: 12,
        }}>Funktion 1 av 3</div>
        <h2 style={HEADING}>Logga dina turer</h2>
        <p style={SUBTITLE}>
          Spåra rutten med GPS direkt från telefonen. Distans, tid, fart och rutt
          sparas automatiskt — som ett digitalt loggbok-uppslag.
        </p>
        <ChartRouteIllustration/>
        <div style={{
          display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20,
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'GPS i bakgrunden' },
            { label: 'Foto från turen' },
            { label: 'Pinnar-rating ⚓' },
          ].map(b => (
            <span key={b.label} style={{
              fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.75)',
              padding: '6px 12px', borderRadius: 999,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}>{b.label.replace('⚓', '')}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={goBack} style={BACK_BTN}>← Tillbaka</button>
          <button onClick={goNext} className="press-feedback" style={PRIMARY_BTN(false)}>
            Sätt kurs <ArrowRightIcon/>
          </button>
        </div>
      </div>
    </div>
  )

  /* ════════════════════════════════════════════════════════════════════════
     STEG 3 — TOUR: UTFORSKA SJÖKORTET
  ═══════════════════════════════════════════════════════════════════════ */
  if (step === 'tour_map') return (
    <div style={OVERLAY} role="dialog" aria-modal="true">
      <style>{KEYFRAMES}</style>
      <SeaBackdrop/>
      <div key={animKey} style={CARD}>
        <CompassProgress current={step}/>
        <div style={{
          fontSize: 11, fontWeight: 700, color: 'rgba(165,205,225,0.85)',
          textTransform: 'uppercase', letterSpacing: '0.16em',
          textAlign: 'center', marginBottom: 12,
        }}>Funktion 2 av 3</div>
        <h2 style={HEADING}>Pejla in skärgården</h2>
        <p style={SUBTITLE}>
          Hitta krogar, gästbryggor, bastur och bensinmackar längs hela kusten.
          Sökbart sjökort med riktiga koordinater — inga gissningar.
        </p>
        <MapMarkersIllustration/>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20,
        }}>
          {[
            { color: '#c96e2a', label: 'Krogar & restauranger' },
            { color: '#1e5c82', label: 'Gästbryggor' },
            { color: '#9d4d3a', label: 'Bastur' },
            { color: '#2d7d8a', label: 'Bensin & service' },
          ].map(b => (
            <div key={b.label} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 10px', borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: b.color, flexShrink: 0 }}/>
              <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.78)', fontWeight: 500 }}>{b.label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={goBack} style={BACK_BTN}>← Tillbaka</button>
          <button onClick={goNext} className="press-feedback" style={PRIMARY_BTN(false)}>
            Sätt kurs <ArrowRightIcon/>
          </button>
        </div>
      </div>
    </div>
  )

  /* ════════════════════════════════════════════════════════════════════════
     STEG 4 — TOUR: COMMUNITY & FORUM
  ═══════════════════════════════════════════════════════════════════════ */
  if (step === 'tour_comm') return (
    <div style={OVERLAY} role="dialog" aria-modal="true">
      <style>{KEYFRAMES}</style>
      <SeaBackdrop/>
      <div key={animKey} style={CARD}>
        <CompassProgress current={step}/>
        <div style={{
          fontSize: 11, fontWeight: 700, color: 'rgba(165,205,225,0.85)',
          textTransform: 'uppercase', letterSpacing: '0.16em',
          textAlign: 'center', marginBottom: 12,
        }}>Funktion 3 av 3</div>
        <h2 style={HEADING}>Möt skärgårdsbor</h2>
        <p style={SUBTITLE}>
          Följ aktiva seglare i flödet, ställ frågor i forumet, dela tips och hitta dina.
          Ett möte mellan båtar har ingen tystnadsplikt.
        </p>
        <CommunityIllustration/>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={goBack} style={BACK_BTN}>← Tillbaka</button>
          <button onClick={goNext} className="press-feedback" style={PRIMARY_BTN(false)}>
            Personifiera <ArrowRightIcon/>
          </button>
        </div>
      </div>
    </div>
  )

  /* ════════════════════════════════════════════════════════════════════════
     STEG 5 — BÅTTYP
  ═══════════════════════════════════════════════════════════════════════ */
  if (step === 'bat') return (
    <div style={OVERLAY} role="dialog" aria-modal="true">
      <style>{KEYFRAMES}</style>
      <SeaBackdrop/>
      <div key={animKey} style={CARD}>
        <CompassProgress current={step}/>
        <h2 style={HEADING}>Hur tar du dig ut?</h2>
        <p style={SUBTITLE}>
          Vi anpassar feed och tips. Inget rätt eller fel svar — alla är välkomna.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {BOAT_OPTIONS.map(({ value, label, Icon, desc }) => {
            const active = boatType === value
            return (
              <button key={value} onClick={() => handleBoatSelect(value)} className="press-feedback"
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '14px 18px', borderRadius: 16, border: 'none',
                  cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: 'inherit',
                  background: active
                    ? 'linear-gradient(135deg, rgba(30,92,130,0.62) 0%, rgba(45,125,138,0.55) 100%)'
                    : 'rgba(255,255,255,0.06)',
                  outline: active ? '1.5px solid rgba(165,205,225,0.55)' : '1.5px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.18s',
                  boxShadow: active ? '0 6px 20px rgba(45,125,138,0.30)' : 'none',
                }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: active ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: active ? 1 : 0.75,
                  transition: 'all 0.18s',
                }}><Icon/></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{label}</div>
                  <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{desc}</div>
                </div>
                {active && <CheckIcon size={20} color="rgba(165,225,235,0.95)"/>}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={goBack} style={BACK_BTN}>← Tillbaka</button>
          <button onClick={() => boatType && goNext()} disabled={!boatType || savingBoat}
                  className="press-feedback" style={PRIMARY_BTN(!boatType || savingBoat)}>
            {savingBoat ? 'Sparar…' : <>Sätt kurs <ArrowRightIcon/></>}
          </button>
        </div>
      </div>
    </div>
  )

  /* ════════════════════════════════════════════════════════════════════════
     STEG 6 — HEMMAVATTEN
  ═══════════════════════════════════════════════════════════════════════ */
  if (step === 'port') {
    const canContinue = homePort.trim().length >= 2
    return (
      <div style={OVERLAY} role="dialog" aria-modal="true">
        <style>{KEYFRAMES}</style>
        <SeaBackdrop/>
        <div key={animKey} style={CARD}>
          <CompassProgress current={step}/>
          <h2 style={HEADING}>Vilken är din skärgård?</h2>
          <p style={SUBTITLE}>
            Hemmahamn eller utgångspunkt. Vi anpassar feed och visar lokala tips.
          </p>

          <div style={{ marginBottom: 20 }}>
            <input
              type="text"
              value={homePort}
              autoFocus
              onChange={e => setHomePort(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && canContinue) handleSavePort() }}
              placeholder="t.ex. Vaxholm, Marstrand, Sandhamn…"
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '15px 18px', borderRadius: 14,
                border: `1.5px solid ${canContinue ? 'rgba(165,225,235,0.45)' : 'rgba(255,255,255,0.14)'}`,
                background: 'rgba(255,255,255,0.07)',
                color: '#fff', fontSize: 16, fontFamily: 'inherit', fontWeight: 500,
                outline: 'none', transition: 'border-color 0.2s',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 24 }}>
            {COMMON_PORTS.map(p => (
              <button key={p} onClick={() => setHomePort(p)} type="button"
                style={{
                  padding: '7px 13px', borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: homePort === p ? 'rgba(101,184,200,0.20)' : 'rgba(255,255,255,0.04)',
                  color: homePort === p ? 'rgba(165,225,235,0.95)' : 'rgba(255,255,255,0.7)',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}>{p}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={goBack} style={BACK_BTN}>← Tillbaka</button>
            <button onClick={handleSavePort} disabled={!canContinue || savingPort}
                    className="press-feedback" style={PRIMARY_BTN(!canContinue || savingPort)}>
              {savingPort ? 'Sparar…' : <>Sätt kurs <ArrowRightIcon/></>}
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ════════════════════════════════════════════════════════════════════════
     STEG 7 — FOLLOW
  ═══════════════════════════════════════════════════════════════════════ */
  if (step === 'follow') return (
    <div style={OVERLAY} role="dialog" aria-modal="true">
      <style>{KEYFRAMES}</style>
      <SeaBackdrop/>
      <div key={animKey} style={CARD}>
        <CompassProgress current={step}/>
        <h2 style={HEADING}>Följ några skärgårdsbor</h2>
        <p style={SUBTITLE}>
          Deras turer och tips dyker upp i ditt flöde. Du kan följa fler senare.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
          {loadingUsers
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '13px 16px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.05)',
                  animation: 'ob-pulse 1.4s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`,
                }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ width: 110, height: 11, borderRadius: 5, background: 'rgba(255,255,255,0.10)', marginBottom: 6 }}/>
                    <div style={{ width: 60, height: 9, borderRadius: 5, background: 'rgba(255,255,255,0.06)' }}/>
                  </div>
                </div>
              ))
            : users.length === 0
            ? (
                <div style={{
                  textAlign: 'center', padding: '24px 16px',
                  background: 'rgba(255,255,255,0.04)', borderRadius: 14,
                  color: 'rgba(255,255,255,0.55)', fontSize: 13.5,
                }}>
                  Inga aktiva seglare ännu. Du hittar folk att följa direkt i flödet.
                </div>
              )
            : users.map(u => {
                const isFollowing = followed.has(u.id)
                return (
                  <button key={u.id} onClick={() => toggleFollow(u.id)} type="button"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '12px 16px', borderRadius: 14,
                      background: isFollowing ? 'rgba(101,184,200,0.10)' : 'rgba(255,255,255,0.05)',
                      border: isFollowing
                        ? '1px solid rgba(165,225,235,0.30)'
                        : '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                      width: '100%',
                      transition: 'all 0.18s',
                    }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 700, color: '#fff', overflow: 'hidden',
                      border: isFollowing ? '2px solid rgba(165,225,235,0.55)' : '2px solid transparent',
                    }}>
                      {u.avatar
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={u.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                        : (u.username[0]?.toUpperCase() ?? '?')}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: '#fff' }}>@{u.username}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)', marginTop: 2 }}>
                        {u.trip_count > 0 ? `${u.trip_count} ${u.trip_count === 1 ? 'tur' : 'turer'}` : 'Ny på Svalla'}
                      </div>
                    </div>
                    <div style={{
                      padding: '6px 14px', borderRadius: 999,
                      background: isFollowing
                        ? 'rgba(101,184,200,0.18)'
                        : 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
                      color: isFollowing ? 'rgba(165,225,235,0.95)' : '#fff',
                      fontSize: 12, fontWeight: 700,
                      display: 'flex', alignItems: 'center', gap: 5,
                      flexShrink: 0,
                    }}>
                      {isFollowing && <CheckIcon size={11} color="rgba(165,225,235,0.95)"/>}
                      {isFollowing ? 'Följer' : 'Följ'}
                    </div>
                  </button>
                )
              })
          }
        </div>

        <div style={{
          fontSize: 12, color: 'rgba(255,255,255,0.50)',
          textAlign: 'center', marginBottom: 18, fontWeight: 500,
        }}>
          {followed.size === 0 ? 'Du kan följa fler senare' : `Du följer ${followed.size}`}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={goBack} style={BACK_BTN}>← Tillbaka</button>
          <button onClick={goNext} className="press-feedback" style={PRIMARY_BTN(false)}>
            Sätt kurs <ArrowRightIcon/>
          </button>
        </div>
      </div>
    </div>
  )

  /* ════════════════════════════════════════════════════════════════════════
     STEG 8 — DONE (klar för avgång)
  ═══════════════════════════════════════════════════════════════════════ */
  return (
    <div style={OVERLAY} role="dialog" aria-modal="true">
      <style>{KEYFRAMES}</style>
      <SeaBackdrop/>
      <div key={animKey} style={{ ...CARD, alignItems: 'center', textAlign: 'center' }}>

        {/* Brand-vinjett */}
        <div style={{
          fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700,
          color: 'rgba(255,255,255,0.55)', letterSpacing: '0.32em',
          marginBottom: 8, animation: 'ob-fadeUp 0.4s 0.1s both',
        }}>SVALLA</div>

        <DepartureIllustration/>

        <h2 style={{ ...HEADING, fontSize: 32 }}>Klar för avgång</h2>
        <p style={SUBTITLE}>
          {displayName ? `Tack ${displayName} — ` : ''}Du är ombord. Lägg från kaj och börja
          logga din första tur, eller börja med att utforska vad andra gör.
        </p>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
          <button onClick={() => finish('/logga')} className="press-feedback" style={{
            ...PRIMARY_BTN(false),
            padding: '17px 20px', fontSize: 16,
          }}>
            Lägg från kaj — logga första turen <ArrowRightIcon size={18}/>
          </button>
          <button onClick={() => finish('/upptack')} style={{
            padding: '14px 18px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.16)',
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.85)',
            fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Utforska sjökortet
          </button>
          <button onClick={() => finish('/feed')} style={{
            padding: '12px 18px', borderRadius: 14, border: 'none',
            background: 'transparent',
            color: 'rgba(255,255,255,0.55)',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Gå till flödet
          </button>
        </div>
      </div>
    </div>
  )
}
