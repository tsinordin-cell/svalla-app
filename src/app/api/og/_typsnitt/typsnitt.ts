/**
 * Typsnitt till bilderna som satori ritar (next/og ImageResponse). Utan egna
 * typsnitt ritar satori allt i sitt standardtypsnitt utan fetstil, så
 * fontWeight 700/800 blev vanlig vikt (syntes på storykorten t.o.m. 2026-10-26).
 * Inter (SIL OFL 1.1, se LICENSE-Inter.txt) i vikterna 500, 700 och 800, latin.
 */
import { readFile } from 'fs/promises'
import path from 'path'

type Typsnitt = { name: string; data: ArrayBuffer; weight: 500 | 700 | 800; style: 'normal' }
let cache: Promise<Typsnitt[]> | null = null

export function ogTypsnitt(): Promise<Typsnitt[]> {
  if (!cache) {
    const dir = path.join(process.cwd(), 'src/app/api/og/_typsnitt')
    cache = Promise.all(([500, 700, 800] as const).map(async weight => {
      const buf = await readFile(path.join(dir, `inter-latin-${weight}-normal.woff`))
      return { name: 'Inter', data: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer, weight, style: 'normal' as const }
    }))
  }
  return cache
}
