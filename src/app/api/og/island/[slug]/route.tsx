/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { getIsland } from '@/app/o/island-data'

export const runtime = 'edge'

const SIZE = { width: 1200, height: 630 }

type Props = { params: Promise<{ slug: string }> }

const REGION_GRADIENT: Record<string, [string, string]> = {
  'norra':     ['#1a5276', '#2d7d8a'],
  'mellersta': ['#1e5c82', '#2d7d8a'],
  'södra':     ['#1a4a3a', '#2a6e50'],
  'bohuslan':  ['#a8381e', '#c96e2a'],
}

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) {
    return new ImageResponse(<div>Not found</div>, SIZE)
  }

  const [c1, c2] = REGION_GRADIENT[island.region] ?? ['#1e5c82', '#2d7d8a']

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: Brand + region */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 0.5 }}>
            Svalla
          </div>
          <div style={{
            fontSize: 16, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
            background: 'rgba(255,255,255,0.18)', padding: '8px 18px', borderRadius: 999,
          }}>
            {island.regionLabel}
          </div>
        </div>

        {/* Center: name (emoji removed per no-emoji-policy) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 90, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
              {island.name}
            </div>
            <div style={{ fontSize: 26, opacity: 0.85, marginTop: 16, maxWidth: 800, lineHeight: 1.3 }}>
              {island.tagline}
            </div>
          </div>
        </div>

        {/* Bottom: footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 18, opacity: 0.85 }}>
          <div>svalla.se/o/{island.slug}</div>
          <div>{island.facts.travel_time}</div>
        </div>
      </div>
    ),
    SIZE,
  )
}
