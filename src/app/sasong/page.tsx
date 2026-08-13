/**
 * /sasong — Säsongs-listsida. Visar 4 säsonger som klickbara kort.
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { SEASONS } from './sasong-data'
import { emojiToIcon } from '@/lib/iconMap'
import Icon from '@/components/Icon'

export const metadata: Metadata = {
  title: 'Skärgården året om – guider per säsong',
  description: 'Vad förändras i skärgården mellan vår, sommar, höst och vinter? Praktiska guider för varje säsong med tips, väder och öar att besöka.',
  alternates: { canonical: 'https://svalla.se/sasong' },
  openGraph: {
    title: 'Skärgården året om',
    description: 'Säsongsguider till svenska skärgården.',
    url: 'https://svalla.se/sasong',
  },
}

export default function SasongIndex() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Säsongsguider till skärgården',
    numberOfItems: SEASONS.length,
    itemListElement: SEASONS.map((s, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `https://svalla.se/sasong/${s.slug}`,
      name: `Skärgården på ${s.name.toLowerCase()}en`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

        {/* Hero */}
        <div style={{
          background: 'linear-gradient(160deg, #1e5c82 0%, #0d6e6e 100%)',
          paddingTop: 'calc(env(safe-area-inset-top, 0px))',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 280, height: 280, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px 40px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{
                background: 'rgba(255,255,255,0.18)', color: '#fff',
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '4px 12px', borderRadius: 20,
              }}>
                Säsongsguider
              </span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 800, color: '#fff',
              margin: '0 0 14px', lineHeight: 1.2,
            }}>
              Skärgården året om
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: 580 }}>
              Vad förändras i skärgården mellan säsongerna? Praktiska guider för vår, sommar, höst och vinter — vad du ska tänka på och vilka öar är öppna.
            </p>
          </div>

          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 40, marginBottom: -1 }}>
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="var(--bg, #f8f7f4)" />
          </svg>
        </div>

        {/* 4 säsongs-kort */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 20px 0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 14,
          }}>
            {SEASONS.map(s => (
              <Link key={s.slug} href={`/sasong/${s.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: `linear-gradient(135deg, ${s.color} 0%, #0a3d52 100%)`,
                  borderRadius: 18,
                  padding: '24px 24px',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  <div style={{
                    position: 'absolute', top: -30, right: -30,
                    width: 120, height: 120,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.07)',
                    pointerEvents: 'none',
                  }} />
                  <div>
                    <div style={{lineHeight: 1, marginBottom: 12}} aria-hidden><Icon name={emojiToIcon(s.emoji)} size={40} /></div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
                      {s.monthsLabel}
                    </div>
                    <h2 style={{
                      fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
                      fontSize: 22, fontWeight: 700, color: '#fff',
                      margin: '0 0 8px', lineHeight: 1.2,
                    }}>
                      Skärgården på {s.name.toLowerCase()}en
                    </h2>
                    <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55, margin: 0 }}>
                      {s.tagline}
                    </p>
                  </div>
                  <div style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>
                    Läs guiden →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
