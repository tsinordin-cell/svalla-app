import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'
import RegionOar from '@/components/RegionOar'
import RegionNav from '@/components/RegionNav'
import { byggRegionNav } from '@/lib/region-nav'
import { ogSida } from '@/lib/og-standard'

export const metadata: Metadata = {
 title: 'Blekinges skärgård: Hanö, Tjärö, Tärnö och Utklippan',
 description: 'Sju öar i Blekinges skärgård, från Hanö till Utklippan. Så tar du dig ut med vägfärja, skärgårdsbåt, öns egen färja eller egen båt.',
 keywords: [
 'blekinge skärgård',
 'segla blekinge',
 'karlskrona skärgård',
 'blekinge båt',
 'naturhamn blekinge',
 'sölvesborg',
 'hanö',
 'sölvesborgs skärgård',
 'karlskrona hamn',
 'utskärgård blekinge',
 'blekinge sommar',
 'karlskrona gästhamn',
 'hanö segling',
 'östersjöleden',
 'blekinge segling guide',
 'karlskrona unesco',
 ],
 openGraph: {
 images: ogSida('https://svalla.se/blekinge-skargard'),
 title: 'Blekinges skärgård på Svalla',
 description: 'Sju öar i Blekinges skärgård, med resvägar och regler.',
 url: 'https://svalla.se/blekinge-skargard',
 },
 alternates: { canonical: 'https://svalla.se/blekinge-skargard' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🐦',
    title: 'Hanö',
    // KÄLLA: https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/hano.html — "När du besöker naturreservatet Hanö", "I norr finns strandsporren Bönsäcken", "Idag finns en av Sveriges största avenbokskogar på Hanös södra delar" (läst 2026-10-20)
    // KÄLLA: https://solvesborg.se/uppleva-och-gora/turism-att-besoka-solvesborg/sevardheter/hano.html — "På ön finns den engelska kyrkogården, ett minne från Napoleonkrigets dagar (1810-1812)" (läst 2026-10-20)
    description: 'Naturreservat med engelsk kyrkogård från Napoleonkrigens tid, Bönsäcken och avenbokskog.',
    href: '/o/hano',
  },
  {
    icon: '🗼',
    title: 'Utklippan',
    // KÄLLA: https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/utklippan.html — "Utklippan är Sveriges sydöstligaste ögrupp och ett populärt besöksmål för båtfolk."; "På Södraskär finns Utklippans fyr och de forna fyrvaktarbostäderna." (läst 2026-11-17)
    description: 'Sveriges sydöstligaste ögrupp, med Utklippans fyr på Södraskär och en gästhamn för båtfolk.',
    href: '/o/utklippan',
  },
  {
    icon: '⛵',
    title: 'Segelrutter längs ostkusten',
    description: 'Distanser och regler för segling längs ostkusten ner till Malmö, samlade på en sida.',
    href: '/segelrutter',
  },
  {
    icon: '⚓',
    title: 'Naturhamnar och allemansrätten',
    description: 'Vad som gäller när du ankrar i en vik eller lånar en brygga, och var du inte får gå i land under häckningstiden.',
    href: '/hamnar-och-bryggor#naturhamnar',
  },
  {
    icon: '📍',
    title: 'Logga dina turer',
    description: 'Skapa ett gratis konto och logga dina turer med GPS, bilder och anteckningar.',
    href: '/kom-igang',
  },
]

export default function BlekingeSkargardPage() {
 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'Hur nära är Blekinge till Danmark och Tyskland?',
 // UPPMÄTT: storcirkelavstånd beräknade 2026-08-16 — Karlskrona–Hammeren (Bornholms nordspets) 59 nm, Karlskrona–Rønne 71 nm, Karlskrona–Kap Arkona (Rügen) 115 nm. Tidigare siffror 80 resp 50 var fel åt båda hållen.
 acceptedAnswer: { '@type': 'Answer', text: 'Bornholms nordspets ligger knappt 60 sjömil sydväst om Karlskrona, och Rügen i Tyskland cirka 115 sjömil bort åt samma håll.' },
 },
 {
 '@type': 'Question',
 name: 'Finns det en märkt segelled längs ostkusten?',
 // KÄLLA: faktagranskning 2026-08-23 — ingen myndighet eller operatör känner en märkt segelrutt Sthlm–Malmö. ARK56: naturkartan.se/ark56 (läst 2026-08-23)
 acceptedAnswer: { '@type': 'Answer', text: 'Nej, någon officiellt märkt segelrutt Stockholm till Malmö finns inte. Kusten seglas ändå flitigt i väl utprickade farleder, och Blekinge är en naturlig etapp mellan Kalmarsund och Öresund. För paddling, vandring och cykel finns ARK56, Blekinges länkade kustleder.' },
 },
 ],
 }
 const breadcrumbJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Blekinges skärgård', item: 'https://svalla.se/blekinge-skargard' },
 ],
 }
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
 <CategoryLanding
 regionNav={<RegionNav data={byggRegionNav('Blekinge skärgård', ['tarno', 'hano', 'utklippan', 'aspo-blekinge', 'sturko', 'tjaro', 'hastholmen-ytteron'], ['blekinge-skargard-guide', 'aspo-sturko-guide', 'hano-guide', 'karlskrona-guide'])} />}
 heroGradient={['#4a3728', '#6b5040']}
 eyebrow="Blekinges skärgård"
 title="Från Hanö till Utklippan"
 tagline="Sju öar i Blekinges skärgård, med färjor, skärgårdsbåtar och gästhamnar."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
 <polyline points="9 22 9 12 15 12 15 22" />
 </svg>
 }
 intro={
 <>
 {/* KÄLLA: https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/utklippan.html — "Utklippan är Sveriges sydöstligaste ögrupp och ett populärt besöksmål för båtfolk."; "På Södraskär finns Utklippans fyr och de forna fyrvaktarbostäderna." (läst 2026-11-17) */}
 <p>
 På Svalla finns sju öar i Blekinges skärgård, från Hanö i Sölvesborgs kommun till Utklippan, Sveriges sydöstligaste ögrupp. Till några kör du bil, till andra går färja eller skärgårdsbåt, och till Utklippan behöver du egen båt.
 </p>
 <p>
 Med ett gratis konto på Svalla kan du logga dina turer med GPS, bilder och anteckningar.
 </p>
 </>
 }
 itemsTitle="Blekinge med Svalla"
 itemsDescription="Öarna, resvägarna och var du loggar dina turer."
 items={ITEMS}
 deeperContent={
 <>
 <RegionOar rubrik="Öar i Blekinge skärgård" etiketter={['Blekinge']} />

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Så tar du dig ut till öarna
 </h2>
 {/* KÄLLA: https://www.blekingetrafiken.se/reseinformation/skargardstrafik/ — "Mellan Nogersund och Hanö finns skärgårdstrafik året runt. Gå ombord på M/F Vitaskär i Nogersund och 25 minuter senare befinner du dig på sköna Hanö." (läst 2026-10-19) */}
 {/* KÄLLA: https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/hano.html — "Till Nogersund kan du ta dig med buss från Sölvesborg eller med bil."; "Närmaste busshållplats är Nogersunds hamn som trafikeras av linje 2."; "Ta av från E22:an vid trafikplats Listerlandet (47) och följ väg 123 (Hälleviksvägen) till Nogersund." (läst 2026-10-19) */}
 <p>
 <strong>Hanö</strong>: M/F Vitaskär går året runt från Nogersund, och överfarten tar 25 minuter. Till Nogersund kommer du med buss från Sölvesborg eller med bil.
 </p>
 {/* KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/aspoleden/ — "Aspöleden går mellan Karlskrona och Aspö i Karlskrona skärgård. Färjeledens längd är 6700 meter och överfartstiden är cirka 25 minuter. Resan med vägfärjan är avgiftsfri." (läst 2026-09-27); https://www.karlskrona.se/hitta-verksamheter/badplatser/aspo-havsbad — "Långgrund sandstrand i skärgårdsmiljö. Stor gräsyta samt lekplats." (läst 2026-09-27); https://www.visitkarlskrona.se/sv/gasthamn-lokanabben-aspo — "På ön finns mataffär, samt restaurang och café sommartid." (läst 2026-09-27) */}
 <p>
 <strong>Aspö</strong>: Trafikverkets vägfärja Aspöleden går från Karlskrona. Överfarten tar cirka 25 minuter och är avgiftsfri.
 </p>
 {/* KÄLLA: https://www.visitblekinge.se/en/sturko-a-picturesque-island — "reached via Sturkövägen – a permanent road bridge running across the islands of Senoren and Skällö" (läst 2026-09-27) */}
 {/* KÄLLA: https://www.blekingetrafiken.se/reseinformation/skargardstrafik/karlskrona-skargard/ — "Handelshamnen–Sturkö"; "Sturköpendeln har juluppehåll 21 december - 6 januari. Vi hänvisar resenärer till buss linje 123." (läst 2026-09-27). Tidtabellsdata på sidan: 17 aug–20 dec 2026 måndag–fredag 5 turer Handelshamnen→Bredavik (06.40, 07.40, 14.40, 15.40, 16.50), 20 min; 22 juni–16 aug 2026 även helger (11.20, 14.40, 16.40, 19.30), 20–25 min. */}
 <p>
 <strong>Sturkö</strong>: du kör bil på Sturkövägen, som går över broar via Senoren och Skällö. Utan bil tar du Sturköpendeln från Handelshamnen i Karlskrona. Den har juluppehåll 21 december till 6 januari.
 </p>
 {/* KÄLLA: https://tjaro.com/farjeavgangar/ — "Färjan tar 15 minuter enkel väg. Färjan går inte att förboka och åker fram och tillbaka tills alla kommit över.", "Biljett köpes på Tjärö och visas upp på hemvägen." (läst 2026-09-27) */}
 {/* KÄLLA: https://tjaro.com/ — "Tjärö håller öppet mellan den 30 april - 20 september 2026" (läst 2026-09-27) */}
 <p>
 <strong>Tjärö</strong>: öns egen färja går från Järnavik och tar 15 minuter. Den går inte att förboka, men åker fram och tillbaka tills alla har kommit över. Tjärö höll öppet 30 april till 20 september 2026.
 </p>
 {/* KÄLLA: https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/tarno-yttre-eko.html — "Tärnö nås sommartid med båt enligt tidtabell. Det går en passagerarfärja från både Karlshamn och Matvik." (läst 2026-11-17) */}
 {/* KÄLLA: https://www.blekingetrafiken.se/reseinformation/skargardstrafik/karlshamn-skargard/ — "Cirka 30 minuter från skärgårdsterminalen i Karlshamn ligger Tärnö." (läst 2026-11-17) */}
 <p>
 <strong>Tärnö</strong>: sommartid går passagerarfärja från Karlshamn och Matvik. Från skärgårdsterminalen i centrala Karlshamn tar resan cirka 30 minuter.
 </p>
 {/* KÄLLA: https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/utklippan.html — "Öarna nås med egen båt."; "Öarna har gästhamn och på Södraskär finns bland annat en fågelstation." (läst 2026-11-17) */}
 <p>
 <strong>Utklippan</strong>: du når öarna med egen båt. Där finns en gästhamn.
 </p>
 {/* KÄLLA: https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/hastholmen-ytteron.html — "Du tar av från E22 mot Torhamn i Jämjö, följ skyltningen mot Yttre Park. Där går en kabelfärja." (läst 2026-11-17) */}
 <p>
 <strong>Hästholmen och Ytterön</strong>: ta av från E22 mot Torhamn i Jämjö och följ skyltningen mot Yttre Park. Enligt Länsstyrelsen går det en kabelfärja därifrån.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Aspö och örlogsstaden
 </h3>
 {/* KÄLLA: https://www.visitkarlskrona.se/sv/drottningskars-kastells-historia — "För de stora örlogsskeppen är inloppet mellan Aspö och Tjurkö det enda sättet att nå Karlskrona." (läst 2026-09-27); https://www.visitkarlskrona.se/sv/drottningskarskastell — "Drottningskärs kastell är en del av världsarvet Örlogsstaden Karlskrona", "Själva fastigheten förvaltas av Statens fastighetsverk" (läst 2026-09-27); https://www.visitkarlskrona.se/sv/aspo-kyrka — "Aspö kyrka stod färdig 1891.", "Aspö kyrka är uppförd i nygotisk stil." (läst 2026-09-27) */}
 <p>
 Inloppet mellan Aspö och Tjurkö var det enda sättet för de stora örlogsskeppen att nå Karlskrona. På Aspö ligger Drottningskärs kastell, som ingår i världsarvet Örlogsstaden Karlskrona och förvaltas av Statens fastighetsverk.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Hanö och den engelska kyrkogården
 </h3>
 {/* KÄLLA: https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/hano.html — "Engelska kyrkogården är ett minne från åren 1810-1812, då Hanö fungerade som engelsmännens flottbas i Östersjön under Napoleons blockad. Kyrkogården besöks fortfarande regelbundet av passerande fartyg ur den brittiska flottan." (läst 2026-10-19) */}
 <p>
 Åren 1810 till 1812, under Napoleons blockad, var Hanö den brittiska flottans bas i Östersjön. Engelska kyrkogården är ett minne från den tiden, och den besöks fortfarande regelbundet av fartyg ur den brittiska flottan.
 </p>

 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Vanliga frågor
 </h3>
 <p>
 <strong>Hur nära är Blekinge till Danmark och Tyskland?</strong><br />
 {/* UPPMÄTT: storcirkelavstånd beräknade 2026-08-16 — Karlskrona–Hammeren 59 nm, Karlskrona–Kap Arkona 115 nm */}
 Bornholms nordspets ligger knappt 60 sjömil sydväst om Karlskrona, och Rügen i Tyskland cirka 115 sjömil bort åt samma håll.
 </p>
 <p>
 <strong>Finns det en märkt segelled längs ostkusten?</strong><br />
 {/* KÄLLA: faktagranskning 2026-08-23 — ingen märkt segelrutt Sthlm–Malmö existerar; ARK56 enligt naturkartan.se/ark56 (läst 2026-08-23) */}
 Nej, någon officiellt märkt segelrutt Stockholm till Malmö finns inte. Kusten seglas ändå flitigt i väl utprickade farleder, och Blekinge är en naturlig etapp mellan Kalmarsund och Öresund. För paddling, vandring och cykel finns ARK56, Blekinges länkade kustleder.
 </p>
 </>
 }
 cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
 related={[
 { label: 'Segelrutter', href: '/segelrutter' },
 { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
 { label: 'Aktiviteter', href: '/aktiviteter' },
 { label: 'Gotland', href: '/gotland' },
 ]}
 />
 </>
 )
}
