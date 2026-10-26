// Bäddar in .woff-filerna i src/app/api/og/_typsnitt som base64 i typsnitt.generated.ts.
// Kör: node scripts/bygg-typsnitt.mjs   (efter att en fontfil bytts)
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
const dir = path.join(process.cwd(), 'src/app/api/og/_typsnitt')
const filer = [
  ['Inter', 500, 'inter-latin-500-normal.woff'],
  ['Inter', 700, 'inter-latin-700-normal.woff'],
  ['Inter', 800, 'inter-latin-800-normal.woff'],
  ['Playfair Display', 700, 'playfair-display-latin-700-normal.woff'],
]
const rader = [
  '// Genererad av scripts/bygg-typsnitt.mjs ur .woff-filerna i samma mapp. Ändra inte för hand.',
  '// Typsnitten bäddas in som base64 eftersom serverless-funktionen på Vercel inte får med',
  '// lösa filer under src/ (ENOENT i förhandsvisningen 2026-10-26).',
  'export const TYPSNITT_B64: { name: string; weight: 500 | 700 | 800; b64: string }[] = [',
  ...filer.map(([name, weight, fil]) => `  { name: '${name}', weight: ${weight}, b64: '${readFileSync(path.join(dir, fil)).toString('base64')}' },`),
  ']',
]
writeFileSync(path.join(dir, 'typsnitt.generated.ts'), rader.join('\n') + '\n')
console.log('✓ typsnitt.generated.ts:', filer.length, 'typsnitt')
