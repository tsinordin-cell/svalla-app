import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
 title: { absolute: 'Skärgårdskrogar & mat — Stockholms skärgård | Svalla' },
 description: 'Skärgårdskrogar, sommarrestauranger, caféer och bagerier i Stockholms skärgård. Från Fjäderholmarna till Landsort.',
 keywords: [
 'skärgårdskrog stockholm',
 'krogar skärgården',
 'sandhamn krog',
 'utö krog',
 'grinda värdshus',
 'fjäderholmarna restaurang',
 'skärgårdsrestaurang',
 ],
 openGraph: {
 title: 'Skärgårdskrogar & mat — Svalla',
 description: 'Skärgårdskrogar, caféer och bagerier i Stockholms skärgård.',
 url: 'https://svalla.se/krogar-och-mat',
 },
 alternates: { canonical: 'https://svalla.se/krogar-och-mat' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🍽',
    title: 'Värdshus och restauranger',
    description: 'Fjäderholmarnas Krog, Sandhamns Värdshus, Utö Värdshus, Grinda Wärdshus — klassiker med sjöutsikt och husmanskost. Öppet maj–sep.',
    href: '/krogar-och-mat/vardshus-restauranger',
    meta: 'Säsong: maj–sep',
  },
  {
    icon: '🐟',
    title: 'Fisk och skaldjur',
    description: 'Rökt strömming på träpinne, räkor direkt från bryggan och kräftskivor i juli — skärgårdens bästa råvaror.',
    href: '/krogar-och-mat/fisk-skaldjur',
  },
  {
    icon: '☕',
    title: 'Fika och caféer',
    description: 'Morgonbröd, kanelbullar och skärgårdskaffe — Sandhamns Bageriet, Möja Bageri och fler små ställen med stor charm.',
    href: '/krogar-och-mat/fika-cafe',
  },
  {
    icon: '🍦',
    title: 'Take-away och kiosker',
    description: 'Glass vid bryggan, räksmörgåsar i hamnen och lanthandeln som räddar middagen. Enkelt, gott och utan bokning.',
    href: '/krogar-och-mat/take-away-kiosker',
  },
]

export default function KrogarOchMatPage() {
 return (
 <CategoryLanding
 heroGradient={['#c96e2a', '#d98246']}
 eyebrow="Krogar & mat"
 title="Skärgårdens tallrik"
 tagline="Från rökt strömming på bryggan till hummer vid vit duk — kurerade krogar, caféer och bagerier i hela skärgården."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M3 2v7a3 3 0 0 0 6 0V2" />
 <path d="M6 2v20" />
 <path d="M18 2c-2 0-3 1-3 3v6a2 2 0 0 0 2 2h1v9" />
 </svg>
 }
 intro={
 <>
 <p>
 Skärgårdskrogen är sommarens sanna mötespunkt — en plats där båtfolk, fastboende och stockholmare samlas kring samma bord. De flesta klassikerna har öppet <strong>maj–september</strong>, men ett växande antal ställen håller öppet året runt.
 </p>
 <p>
 Svalla samlar alla seriösa skärgårdskrogar på ett ställe, med öppettider, bokningslänkar och aktuella omdömen från användare som faktiskt ätit där den här säsongen. Vi sorterar efter typ, område och båtbarhet (finns brygga? hur djupt?).
 </p>
 </>
 }
 itemsTitle="Olika typer av ställen"
 itemsDescription="Välj kategori för att se alla ställen på kartan."
 items={ITEMS}
 deeperContent={
 <>
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Tips från oss som seglat
 </h2>
 <p>
 <strong>Ring alltid innan.</strong> Skärgårdskrogar drivs ofta av en handfull personer — en mattkurs, en barnförkylning eller storm kan stänga köket på en timme. De flesta har bokning via sin Facebook-sida. Svalla länkar direkt till operatörens bokningssystem när det finns.
 </p>
 <p>
 <strong>Ankra rätt.</strong> Populära krogar som Grinda Wärdshus och Sandhamns Värdshus har fullt på bryggan från lunch på helger i juli. Kolla alternativa naturhamnar inom gångavstånd — finns ofta listat på platssidan.
 </p>
 <p>
 <strong>Prova något utanför topp-10.</strong> Svalla-användare rankar många mindre ställen — t.ex. caféer på Norrpada eller hemmasnickrade matställen i norra skärgården — lika högt som klassikerna, till halva priset.
 </p>
 </>
 }
 related={[
 { label: 'Boende', href: '/boende' },
 { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
 { label: 'Populära turer', href: '/populara-turer' },
 { label: 'Kartan', href: '/upptack' },
 ]}
 />
 )
}
