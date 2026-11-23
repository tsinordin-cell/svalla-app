'use client'
/**
 * Sidtopp: sidhuvud överst på publika sidor som saknar eget (Tom 2026-11-20: "Denna sida behöver
 * en svalla logga och en tillbaka knapp", sedan "Lös detta!" för alla sådana sidor).
 *
 * MÄTT 2026-11-20: Playwright i 390 px, utloggad, en sida per sidtyp i sitemap plus alla
 * toppnivåsidor (314 st). 74 sidor saknade logga i övre delen. Listorna nedan är de publika av dem.
 *
 * 2026-11-20 (Max: samma meny överallt): innehållssidorna får Svallas meny (MegaMeny), samma som
 * startsidan och SidHuvud. Kontosidorna (lösenord, avslut) behåller den enkla raden med tillbaka
 * och logga, så att man inte leds bort mitt i ett flöde. Under menyn ligger en rad med Tillbaka (TillbakaRad).
 *
 * Sidor som själva visar SidHuvud ska inte stå här (då blir det två menyer): /guider, /guider/…,
 * /resetips/…, /dag/… och /aktivitet/[typ] har SidHuvud. /aktivitet/kajak är en egen sida utan.
 *
 * Inte här, medvetet: app-sidorna (Nav.tsx APP_PATHS: /forum, /upptack, /sok, /topplista, /rutter,
 * /planera, /insikter …). /insikter stod här till 2026-11-22 och fick då två menyer (beslut 3). De har appens flikrad i botten. /guide (Thorkel) har eget sidhuvud med tillbaka.
 *
 * Matchning på segmentgräns som i Nav.tsx: poster som slutar på `/` är prefix.
 * Ny publik sida utan eget sidhuvud: lägg till den här.
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SvallaLogo from '@/components/SvallaLogo'
import BackButtonInline from '@/components/BackButtonInline'
import MegaMeny from '@/components/MegaMeny'
import TillbakaRad from '@/components/TillbakaRad'

const MENY = [
  '/ai-guide', '/dag', '/helgturer', '/hyra-bat', '/oppet-nu', '/sasong', '/statistik', '/ta-dig-till',
  '/teambuilding', '/upplevelser', '/goteborg', '/goteborg/', '/bohuslan/',
  '/aktivitet/kajak', '/aland/aventyr', '/gotland/aventyr', '/oland/aventyr', '/jamfor', '/ostlistan',
  '/sasong/', '/segelkurs/', '/hyra-bat/', '/teambuilding/',
]
// Sidor som redan har en egen tillbakalänk högst upp (t.ex. "← Aktiviteter"): ingen extra rad där.
const EGEN_TILLBAKA = ['/aktivitet/kajak', '/jamfor', '/teambuilding/', '/segelkurs/']
const KONTO = ['/glomt-losenord', '/nytt-losenord', '/goodbye']

// Exakt sökväg, eller prefix när posten slutar på '/'.
const traff = (lista: string[], path: string) =>
  lista.some(p => (p.endsWith('/') ? path.startsWith(p) : path === p))

export default function Sidtopp() {
  const path = usePathname() ?? ''
  if (traff(MENY, path)) return <><MegaMeny />{!traff(EGEN_TILLBAKA, path) && <TillbakaRad />}</>
  if (!traff(KONTO, path)) return null
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
        <BackButtonInline fallback="/" ljus />
        <Link href="/" aria-label="Svalla, till startsidan" style={{ display: 'inline-flex' }}>
          <SvallaLogo height={24} color="#ffffff" />
        </Link>
        <div style={{ width: 36 }} aria-hidden />
      </div>
    </div>
  )
}
