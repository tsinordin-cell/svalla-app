/**
 * Typsnitt till bilderna som satori ritar (next/og ImageResponse). Utan egna
 * typsnitt ritar satori allt i sitt standardtypsnitt utan fetstil, så
 * fontWeight 700/800 blev vanlig vikt (syntes på storykorten t.o.m. 2026-10-26).
 * Inter (SIL OFL 1.1) i vikterna 500, 700 och 800 för text och tal, och
 * Playfair Display 700 (SIL OFL 1.1) för ordmärket SVALLA, samma som sajtens
 * rubriker (next/font i layout.tsx). Licenserna ligger bredvid filerna.
 */
import { readFile } from 'fs/promises'
import path from 'path'

type Typsnitt = { name: string; data: ArrayBuffer; weight: 500 | 700 | 800; style: 'normal' }
let cache: Promise<Typsnitt[]> | null = null

const FILER: { name: string; fil: string; weight: 500 | 700 | 800 }[] = [
  { name: 'Inter', fil: 'inter-latin-500-normal.woff', weight: 500 },
  { name: 'Inter', fil: 'inter-latin-700-normal.woff', weight: 700 },
  { name: 'Inter', fil: 'inter-latin-800-normal.woff', weight: 800 },
  { name: 'Playfair Display', fil: 'playfair-display-latin-700-normal.woff', weight: 700 },
]

export function ogTypsnitt(): Promise<Typsnitt[]> {
  if (!cache) {
    const dir = path.join(process.cwd(), 'src/app/api/og/_typsnitt')
    cache = Promise.all(FILER.map(async ({ name, fil, weight }) => {
      const buf = await readFile(path.join(dir, fil))
      return { name, data: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer, weight, style: 'normal' as const }
    }))
  }
  return cache
}
