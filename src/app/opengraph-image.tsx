import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import path from 'path'
import { Buffer } from 'buffer'
import sharp from 'sharp'
import { ogTypsnitt } from '@/app/api/og/_typsnitt/typsnitt'
import { ORDBILD_LITEN } from '@/components/svallaOrdbild'

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const alt = 'Svalla | Planera din skärgårdsvistelse'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Standardbilden för länkar till svalla.se och för alla sidor utan egen bild.
 *
 * 2026-11-28 (Tom: "ser lite mörk och tråkig ut", ville att den skulle likna
 * startsidan): startsidans färger och scen i stället för den mörka mallen.
 * Sandfärgad himmel och blått hav som startscenen (#efe7d6, #1b57a0), loggan i
 * marinblått som i startsidans meny, och scenens egna målade bilder ur
 * public/kreativ (ön, fyren, solen, fiskarna och Thorkels båt). Rubriken och
 * ingressen är startsidans egna. Övriga delningsbilder (tur, ö, plats, guide …)
 * använder fortfarande den gemensamma mörka mallen i src/app/api/og/_mall/kort.tsx.
 * Den tidigare bilden ligger kvar i git-historiken.
 *
 * Satori klarar inte webp, så bilderna görs om till png med sharp. Bilden byggs
 * en gång vid bygget (force-static), där public/ finns på disk. Går en fil inte
 * att läsa hämtas den från svalla.se i stället.
 */
const W = 1200
const H = 630
const HAV = 448
const SAND = '#efe7d6'
const BLA = '#1b57a0'
const MARIN = '#0a2540'
const TEXT = '#3a4d5c'
const SERIF = 'Playfair Display, Georgia, serif'
const FONT = 'Inter, system-ui, sans-serif'

async function bild(namn: string, bredd: number): Promise<string | null> {
  let data: Buffer | null = null
  try {
    data = await readFile(path.join(process.cwd(), 'public', 'kreativ', `${namn}.webp`))
  } catch {
    try {
      const res = await fetch(`https://svalla.se/kreativ/${namn}.webp`)
      if (res.ok) data = Buffer.from(await res.arrayBuffer())
    } catch { /* ritas utan bilden */ }
  }
  if (!data) return null
  const png = await sharp(data).resize({ width: bredd }).png().toBuffer()
  return `data:image/png;base64,${png.toString('base64')}`
}

/** Svallas logga (samma former som src/components/SvallaLogo.tsx), i marinblått som i startsidans meny. */
function Logga({ hojd }: { hojd: number }) {
  return (
    <svg viewBox="0 0 90 28" width={hojd * 90 / 28} height={hojd} style={{ display: 'flex' }}>
      <g transform="translate(0,2)">
        <line x1="9" y1="20" x2="9" y2="3" stroke={MARIN} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M9,4 L18,18 L9,18 Z" fill={MARIN} opacity="0.9" />
        <path d="M9,8 L1,17 L9,17 Z" fill={MARIN} opacity="0.5" />
        <path d="M2,20 Q6,17.5 9,20 Q12,17.5 17,20" stroke={MARIN} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
      </g>
      <path transform="translate(23 20) scale(0.0155) translate(-55 0)" fill={MARIN} d={ORDBILD_LITEN} />
    </svg>
  )
}

/** Havet med en mjukt vågig kant överst. */
function Hav() {
  let d = `M0 ${HAV}`
  for (let x = 0; x < W; x += 60) d += ` Q ${x + 30} ${HAV - 7} ${x + 60} ${HAV}`
  d += ` L ${W} ${H} L 0 ${H} Z`
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', left: 0, top: 0 }}>
      <path d={d} fill={BLA} />
    </svg>
  )
}

export default async function OGImage() {
  const [fonts, o, fyr, bat, sol, fisk1, fisk2] = await Promise.all([
    ogTypsnitt(),
    bild('scen-o', 951),
    bild('scen-fyr', 484),
    bild('thorkel-bat-v', 1080),
    bild('scen-sol', 300),
    bild('scen-fisk1', 737),
    bild('scen-fisk2', 727),
  ])

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: 'flex', position: 'relative', background: SAND, fontFamily: FONT, overflow: 'hidden' }}>
        {sol ? <img src={sol} alt="" width={92} height={92} style={{ position: 'absolute', left: 1050, top: 52, opacity: 0.92 }} /> : null}
        {o ? <img src={o} alt="" width={460} height={206} style={{ position: 'absolute', left: 640, top: HAV - 200 }} /> : null}
        {fyr ? <img src={fyr} alt="" width={150} height={149} style={{ position: 'absolute', left: 1080, top: HAV - 147 }} /> : null}
        <Hav />
        {bat ? <img src={bat} alt="" width={300} height={250} style={{ position: 'absolute', left: 470, top: HAV - 178 }} /> : null}
        {fisk1 ? <img src={fisk1} alt="" width={150} height={40} style={{ position: 'absolute', left: 900, top: 540, opacity: 0.5 }} /> : null}
        {fisk2 ? <img src={fisk2} alt="" width={120} height={21} style={{ position: 'absolute', left: 170, top: 565, opacity: 0.45 }} /> : null}

        <div style={{ position: 'absolute', left: 64, top: 56, width: 540, display: 'flex', flexDirection: 'column' }}>
          <Logga hojd={44} />
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 62, lineHeight: 1.06, letterSpacing: -1, color: MARIN, marginTop: 40, display: 'flex' }}>
            Planera din skärgårdsvistelse
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 24, lineHeight: 1.4, color: TEXT, marginTop: 18, maxWidth: 440, display: 'flex' }}>
            Öar, krogar, badplatser och båttider, samlat på ett ställe.
          </div>
        </div>

        <div style={{ position: 'absolute', left: 64, top: HAV + 70, display: 'flex', fontFamily: FONT, fontWeight: 700, fontSize: 24, letterSpacing: 1, color: '#ffffff' }}>
          svalla.se
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
