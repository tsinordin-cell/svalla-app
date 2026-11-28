// Bäddar in startscenens målade bilder (public/kreativ) som png i base64 för
// delningsbildernas gemensamma mall (src/app/api/og/_mall/kort.tsx).
// Kör: node scripts/bygg-og-scen.mjs   (efter att en bild i public/kreativ bytts)
// Varför inbäddat: serverless-funktionen på Vercel får inte med public/ på disk,
// och satori klarar inte webp. Storlekarna är de som mallen ritar dem i.
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import sharp from 'sharp'
const bilder = [
  ['o', 'scen-o', 414],
  ['fyr', 'scen-fyr', 135],
  ['flagga', 'scen-flagga', 42],
  ['sol', 'scen-sol', 82],
  ['fisk', 'scen-fisk1', 130],
]
const rader = [
  '// Genererad av scripts/bygg-og-scen.mjs ur public/kreativ. Ändra inte för hand.',
  'export const SCEN_B64: Record<string, { b: number; h: number; png: string }> = {',
]
for (const [nyckel, fil, bredd] of bilder) {
  const buf = await sharp(readFileSync(path.join(process.cwd(), 'public/kreativ', `${fil}.webp`))).resize({ width: bredd }).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer()
  const m = await sharp(buf).metadata()
  rader.push(`  ${nyckel}: { b: ${m.width}, h: ${m.height}, png: '${buf.toString('base64')}' },`)
}
rader.push('}')
writeFileSync(path.join(process.cwd(), 'src/app/api/og/_mall/scen.generated.ts'), rader.join('\n') + '\n')
console.log('✓ scen.generated.ts:', bilder.length, 'bilder')
