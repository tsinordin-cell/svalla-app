'use client'
/**
 * Sidtopp: tillbaka och Svalla-loggan överst på publika sidor som saknade både
 * meny och logga (Tom 2026-11-20: "Denna sida behöver en svalla logga och en
 * tillbaka knapp", sedan "Lös detta!" för alla sådana sidor).
 *
 * MÄTT 2026-11-20: Playwright i 390 px, utloggad, en sida per sidtyp i
 * sitemap plus alla toppnivåsidor (314 st). 74 sidor saknade logga i övre
 * delen. Listorna nedan är de publika av dem.
 *
 * - HELA: varken logga eller tillbakaknapp → tillbaka + logga.
 * - BARA_LOGGA: sidan har redan en egen tillbakalänk till sin föräldrasida
 *   ("‹ Alla guider", "← Alla resetips") → bara loggan, så det inte blir två pilar.
 *
 * Inte här, medvetet: app-sidorna (Nav.tsx APP_PATHS: /forum, /upptack, /sok,
 * /topplista, /rutter, /planera …). De har appens flikrad i botten och egna
 * tillbakaknappar på undersidorna; en extra rad överst tar plats från kartan
 * och sökfältet. /guide (Thorkel) har eget sidhuvud med tillbaka.
 *
 * Matchning på segmentgräns som i Nav.tsx: poster som slutar på `/` är prefix.
 * Ny publik sida utan eget sidhuvud: lägg till den här.
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SvallaLogo from '@/components/SvallaLogo'
import BackButtonInline from '@/components/BackButtonInline'

const HELA = [
  '/ai-guide', '/dag', '/glomt-losenord', '/goodbye', '/helgturer', '/hyra-bat', '/oppet-nu',
  '/sasong', '/statistik', '/ta-dig-till', '/teambuilding', '/upplevelser', '/goteborg',
  '/goteborg/', '/bohuslan/',
]
const BARA_LOGGA = [
  '/aland/aventyr', '/gotland/aventyr', '/oland/aventyr', '/aktivitet/kajak', '/guider', '/guider/',
  '/insikter', '/jamfor', '/ostlistan', '/resetips/', '/sasong/', '/segelkurs/', '/hyra-bat/', '/teambuilding/',
]

// Exakt sökväg, eller prefix när posten slutar på '/'.
const traff = (lista: string[], path: string) =>
  lista.some(p => (p.endsWith('/') ? path.startsWith(p) : path === p))

export default function Sidtopp() {
  const path = usePathname() ?? ''
  const logga = traff(BARA_LOGGA, path)
  const hela = !logga && traff(HELA, path)
  if (!hela && !logga) return null
  return (
    <div
      className="mork-yta"
      style={{
        background: 'linear-gradient(90deg,#0d2440 0%,#164a6b 100%)',
        borderBottom: '1px solid rgba(255,255,255,.08)',
        paddingTop: 'calc(8px + env(safe-area-inset-top, 0px))', paddingBottom: 8, paddingLeft: 16, paddingRight: 16,
        position: 'relative', zIndex: 20,
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36 }}>
        {hela ? <BackButtonInline fallback="/" ljus /> : <div style={{ width: 36 }} aria-hidden />}
        <Link href="/" aria-label="Svalla, till startsidan" style={{ display: 'inline-flex' }}>
          <SvallaLogo height={24} color="#ffffff" />
        </Link>
        <div style={{ width: 36 }} aria-hidden />
      </div>
    </div>
  )
}
