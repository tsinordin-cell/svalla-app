import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
 title: 'Karta över Stockholms skärgård — Svalla',
 description: 'Interaktiv karta över krogar, bryggor, bastun, badplatser och sevärdheter i Stockholms skärgård — från Arholma till Landsort.',
 keywords: [
 'karta stockholms skärgård',
 'skärgårdskarta',
 'krogkarta skärgården',
 'gästhamnar karta',
 'badplatser stockholm',
 'skärgårdsöar karta',
 ],
 openGraph: {
 title: 'Karta över Stockholms skärgård — Svalla',
 description: 'Interaktiv karta med krogar, bryggor, bastun och badplatser i hela Stockholms skärgård.',
 url: 'https://svalla.se/karta',
 },
 alternates: { canonical: 'https://svalla.se/karta' },
}

const ITEMS: LandingItem[] = [
 {
 icon: '️',
 title: 'Krogar & caféer',
 description: 'Från Fjäderholmarnas Krog i inloppet till Utö Värdshus längs kanalen. Filtrera på öppettider, bokningsbart och årstid.',
 href: '/krogar-och-mat',
 meta: '100+ platser',
 },
 {
 icon: '',
 title: 'Hamnar & bryggor',
 description: 'Gästhamnar med el och dusch, naturhamnar i skyddade vikar, besöksbryggor vid krog eller bara öppna klippor att förtöja vid.',
 href: '/hamnar-och-bryggor',
 meta: '80+ platser',
 },
 {
 icon: '',
 title: 'Bastu & bad',
 description: 'Publika bastun, bastuflottar och klassiska klippbad. Vinterbad i Saltsjön, sommarbad i Trälhavet.',
 href: '/bastu-och-bad',
 meta: '40+ platser',
 },
 {
 icon: '⛽',
 title: 'Bränslemackar',
 description: 'Sjömackar, diesel och bensin — var du kan tanka båten mellan Nynäshamn och Arholma.',
 href: '/hamnar-och-bryggor',
 meta: '20+ mackar',
 },
 {
 icon: '🏕️',
 title: 'Natur & vandring',
 description: 'Naturreservat, tältplatser, vandringsleder och utsiktsplatser — från Ornö till Bullerö.',
 href: '/vandring-och-natur',
 },
 {
 icon: '️',
 title: 'Alla öar',
 description: 'Sandhamn, Utö, Möja, Grinda, Finnhamn, Arholma — klassiker och mindre kända smultronställen.',
 href: '/resmal',
 meta: '200+ öar',
 },
]

export default function KartaPage() {
 return (
 <CategoryLanding
 heroGradient={['#1e5c82', '#2d7d8a']}
 eyebrow="Karta"
 title="Kartan över Stockholms skärgård"
 tagline="Krogar, bryggor, bastun, badplatser och sevärdheter — kurerade av skärgårdsfolk, filtrerbara efter säsong, aktivitet och erbjudande."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M9 3l6 3 6-3v15l-6 3-6-3-6 3V6l6-3z" />
 <path d="M9 3v15M15 6v15" />
 </svg>
 }
 intro={
 <>
 <p>
 Skärgården är stor — över 30 000 öar sträcker sig från Arholma i norr till Landsort i söder. Att hitta rätt krog, närmaste gästhamn eller en badplats som inte är full i juli kräver lokalkännedom. Svallas karta samlar alla de platserna på ett ställe, kurerade av människor som faktiskt seglar där.
 </p>
 <p>
 Kartan är <strong>öppen för alla</strong> — ingen inloggning krävs för att utforska. Med konto kan du dessutom spara favoriter, logga dina besök och se recensioner från andra seglare.
 </p>
 </>
 }
 itemsTitle="Vad du hittar på kartan"
 itemsDescription="Sex kategorier som täcker allt skärgårdsfolk behöver — från morgonfika till kvällsankring."
 items={ITEMS}
 deeperContent={
 <>
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Hur kartan fungerar
 </h2>
 <p>
 Varje punkt på kartan är en <strong>verifierad plats</strong> — vi accepterar inte okurerade inlägg. Klickar du på en marker får du öppettider, kontakt, bild och ev. bokningslänk direkt. Med konto kan du även se <strong>recensioner</strong> från andra seglare och <strong>markera att du varit där</strong>.
 </p>
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Offline i båten
 </h2>
 <p>
 Mobiltäckning är nyckfull i ytterskärgården. När du är inloggad cachas kartan automatiskt så du kan slå upp krogar och hamnar även utan signal. Ingen särskild app krävs — Svalla fungerar direkt i webbläsaren.
 </p>
 </>
 }
 cta={{ label: '️ Öppna kartan', href: '/kom-igang' }}
 related={[
 { label: 'Alla resmål', href: '/resmal' },
 { label: 'Populära turer', href: '/populara-turer' },
 { label: 'Krogar & mat', href: '/krogar-och-mat' },
 { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
 ]}
 />
 )
}
