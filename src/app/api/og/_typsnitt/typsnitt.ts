/**
 * Typsnitt till bilderna som satori ritar (next/og ImageResponse). Utan egna
 * typsnitt ritar satori allt i sitt standardtypsnitt utan fetstil, så
 * fontWeight 700/800 blev vanlig vikt (syntes på storykorten t.o.m. 2026-10-26).
 * Inter (SIL OFL 1.1) i vikterna 500, 700 och 800 för text och tal, och
 * Playfair Display 700 (SIL OFL 1.1) för ordmärket SVALLA, samma som sajtens
 * rubriker (next/font i layout.tsx). Licenserna ligger bredvid .woff-filerna.
 *
 * Filerna bäddas in som base64 (typsnitt.generated.ts, byggd av
 * scripts/bygg-typsnitt.mjs): Vercels serverless-funktion får inte med lösa
 * filer under src/, så readFile gav ENOENT i förhandsvisningen.
 */
import { TYPSNITT_B64 } from './typsnitt.generated'

type Typsnitt = { name: string; data: ArrayBuffer; weight: 500 | 700 | 800; style: 'normal' }
let cache: Typsnitt[] | null = null

export async function ogTypsnitt(): Promise<Typsnitt[]> {
  if (!cache) {
    cache = TYPSNITT_B64.map(({ name, weight, b64 }) => {
      const buf = Buffer.from(b64, 'base64')
      return { name, data: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer, weight, style: 'normal' as const }
    })
  }
  return cache
}
