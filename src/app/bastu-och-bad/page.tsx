import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
 title: 'Bastu & bad i Stockholms skärgård — Svalla',
 description: 'Publika bastur, bastuflottar, badklippor och sandstränder i Stockholms skärgård. Året-runt-dopp och långa vedbastur.',
 keywords: [
 'bastu stockholms skärgård',
 'badplats skärgården',
 'bastuflotte stockholm',
 'vinterbad skärgård',
 'klippbad stockholm',
 'havsbad skärgård',
 ],
 openGraph: {
 title: 'Bastu & bad i Stockholms skärgård — Svalla',
 description: 'Publika bastur, badklippor och vinterbad i skärgården.',
 url: 'https://svalla.se/bastu-och-bad',
 },
 alternates: { canonical: 'https://svalla.se/bastu-och-bad' },
}

const ITEMS: LandingItem[] = [
 {
 icon: '🪵',
 title: 'Vedeldade bastur',
 description: 'Klassiska vedbastur på öarna — bokning, drop-in och vinterbas. Ofta med bryggdopp.',
 href: '/platser?kategori=bastu',
 },
 {
 icon: '',
 title: 'Elbastur & spa',
 description: 'Moderna spabastur i hotell och badhus — för den som vill hoppa över vedhuggningen.',
 href: '/platser?kategori=spa',
 },
 {
 icon: '🛟',
 title: 'Bastuflottar',
 description: 'Flytande bastur du hyr en kväll eller vecka — kör dit med båt eller paddla ut.',
 href: '/platser?kategori=bastuflotte',
 },
 {
 icon: '🧊',
 title: 'Vinterbad & isvak',
 description: 'Organiserade vinterbad, isvakar och klubbar som samlas året runt — hjärtvänligt dopp.',
 href: '/platser?kategori=vinterbad',
 },
 {
 icon: '️',
 title: 'Sandstränder',
 description: 'Björnö, Trosa, Dalarö och fler — breda sandstränder med parkering och badvakter.',
 href: '/platser?kategori=sandstrand',
 },
 {
 icon: '🪨',
 title: 'Klippbad',
 description: 'Mjuka graniklippor, släta badhällar och djupa hopp — skärgårdens signatur.',
 href: '/platser?kategori=klippbad',
 },
]

export default function BastuOchBadPage() {
 return (
 <CategoryLanding
 heroGradient={['#1e5c82', '#2d7d8a']}
 eyebrow="Bastu & bad"
 title="Dopp, svett, upprepa"
 tagline="Publika bastur, bastuflottar, badklippor och sandstränder — året runt, från morgondopp till vedbastu i decembermörker."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M17 14c.3-1-.5-1.9-1.4-2-.5-.1-1-.3-1.5-.6" />
 <path d="M9 9c0 4-5 4-5 8" />
 <path d="M15 5c0 3-5 3-5 8" />
 <path d="M21 13c0 4-6 4-6 9" />
 </svg>
 }
 intro={
 <>
 <p>
 Bastukultur och skärgård hör ihop. Saltvattnet runt Stockholms skärgård håller <strong>8–10°C från november till maj</strong> — perfekt temperaturkontrast till en vedeldad 80-gradig bastu. Och sommaren? Då är vattnet 18–23° och dopp och dagbad är vardag.
 </p>
 <p>
 Svalla samlar alla publika bastur och seriösa badplatser i skärgården — från klassiker som Nacka Strandbad och Hasseluddens Yasuragi till mindre lokala bastuklubbar du bara hittar genom lokalbefolkningen.
 </p>
 </>
 }
 itemsTitle="Typ av upplevelse"
 items={ITEMS}
 deeperContent={
 <>
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Bastuetik i korthet
 </h2>
 <p>
 I publika bastur gäller oftast: <strong>duscha innan</strong>, <strong>handduk på laven</strong>, <strong>lugnt samtal</strong>, <strong>fråga innan bad</strong>. Många traditionella bastur har separata herrar/dam-tider — kolla alltid på platssidan eller ring i förväg.
 </p>
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Vinterbadare — börja mjukt
 </h2>
 <p>
 Om du är ny på kalla bad: börja i september när vattnet fortfarande är 14–16°C och sänk dig successivt genom hösten. Aldrig ensam, aldrig berusad, aldrig längre än kroppen säger till. Alla våra bastu- och vinterbadplatser listar om de har livräddningsutrustning och hur djupet ser ut.
 </p>
 </>
 }
 related={[
 { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
 { label: 'Aktiviteter', href: '/aktiviteter' },
 { label: 'Alla öar', href: '/rutter?vy=oar' },
 { label: 'Kartan', href: '/upptack' },
 ]}
 />
 )
}
