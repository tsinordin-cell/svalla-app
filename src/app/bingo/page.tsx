import type { Metadata } from 'next'
import SidHuvud from '@/components/SidHuvud'
import TillbakaRad from '@/components/TillbakaRad'
import PublicFooter from '@/components/PublicFooter'
import BingoClient from './BingoClient'
import { BINGO_ITEMS } from './bingo-data'
import { ogSida } from '@/lib/og-standard'

export const metadata: Metadata = {
  title: 'Skärgårdsbingo 2026 till 25 utmaningar för en perfekt sommar',
  description: 'Skärgårdens bingobricka: 25 öar, aktiviteter och utmaningar att bocka av i sommar. Sandhamn, havsbastu, sandstrand, fyr, säl. Dela din bricka.',
  keywords: ['skärgårdsbingo', 'sommarutmaning skärgård', 'svalla bingo', 'bucket list skärgård', 'sommar 2026 stockholm'],
  alternates: { canonical: 'https://svalla.se/bingo' },
  openGraph: {
    images: ogSida('https://svalla.se/bingo'),
    title: 'Skärgårdsbingo 2026 till 25 utmaningar',
    description: 'Hur många kan du bocka av i sommar?',
    url: 'https://svalla.se/bingo',
  },
}

export default function BingoPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <SidHuvud />
      <TillbakaRad />

      <header style={{
        background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '40px 24px 56px', color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
            Sommarutmaning · 2026
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Skärgårdsbingo
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.55, marginTop: 12, maxWidth: 640, opacity: 0.92 }}>
            25 utmaningar: öar, aktiviteter och klassiker. Bocka av allt eftersom du gör dem. Dina markeringar sparas på enheten.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>
        <BingoClient items={BINGO_ITEMS} />
      </div>
      <PublicFooter />
    </div>
  )
}
