import { serializeForScript } from '@/lib/serializeForScript'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland } from '../../island-data'
import IslandSubPageHeader from '@/components/IslandSubPageHeader'
import Icon from '@/components/Icon'
import { emojiToIcon } from '@/lib/iconMap'
import { harBat, kommaDitTitel, franOrten as franPlatsen } from '@/lib/kommaDitTitlar'
import { nasUtanBat } from '@/components/HantverkarKort'
import { fardsattFran, klockslagsregler, arOrt } from '@/lib/mallRegler'
import { stryksKlockslag } from '@/lib/klockslagStrykning'
import { LOKALA_BATREGLER, batrutaGranskad, batregelInledning } from '@/lib/batregler'
import { ogO } from '@/lib/og-standard'

type Props = { params: Promise<{ slug: string }> }

// SOFT-404, DEL 2 (2026-08-12). notFound() i generateMetadata (PR #117)
// räckte inte: Vercel serverar ett byggtids-fallbackskal för ISR-rutter
// med loading.tsx (x-nextjs-prerender: 1) — 200-statusen är satt INNAN
// någon kod körs, och vår notFound() landar bara som en error-digest i
// streamen (NEXT_HTTP_ERROR_FALLBACK;404 i body, status ändå 200).
// Den här routens hela slug-mängd är känd vid bygget (data ligger i
// repot), så dynamicParams=false är semantiskt rätt: okänd slug 404:ar
// i routern, före skalet. Gäller INTE db-backade rutter (upptack, tur,
// u) — nya rader där måste kunna renderas utan ny deploy.
export const dynamicParams = false

export async function generateStaticParams() {
  return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  // SOFT-404-SKYDD: loading.tsx streamar svaret — 200 flushas före sidkroppen,
  // så bara ett notFound() HÄR (före headers) ger riktig 404-status. Se
  // motsvarande kommentar i o/[slug]/page.tsx och CLAUDE.md.
  if (!island) notFound()
  // Metabeskrivningen sa "Waxholmsbolaget, Cinderellabåten, SL eller bil" på
  // ALLA öar, även Bohuslän och Göteborg (Käringön: båt från Tuvesvik).
  // Uppmätt i Search Console 2026-09-23 (6 400 visningar). Nu byggs den av
  // öns egna färdsätt och operatör.
  // Alla färdsätt, inte bara det första: på Fjäderholmarna var det första en
  // sommarbåt vars säsong var slut (faktagranskningen 2026-11-02, mall-0164).
  const vag = island.getting_there.length > 0
    ? island.getting_there.map(t => t.method).join(', ')
    : null
  const operator = island.transport_meta?.operator ?? null
  // Klockslagen stryks enligt Toms beslut 10 (src/lib/klockslagStrykning.ts; mallarnas runda 7).
  const { utanKlockslag } = klockslagsregler(stryksKlockslag(slug, 'komma-dit'))
  const restid = utanKlockslag(island.facts.travel_time ?? '')
  // Båtar från orten själv går därifrån, inte dit: Hamburgsunds linfärja till Hamburgö,
  // Grebbestads taxibåt till Otterön (2026-11-02, mall-0160–0161 omarbete 2). Förut föll alla båtar bort när slag var 'ort',
  // och Vaxholm (ort på Vaxön, Waxholmsbolaget går dit) fick "Bil och buss" (Kontrollantens fynd sm07-k009; runda 10).
  // Nu samma test som sidans franOrten: bara ett båtfärdsätt vars from börjar med ortens namn faller bort.
  const titelFardsatt = island.getting_there.filter(t => !(harBat([t.method]) && franPlatsen(island.name, t.from))).map(t => t.method)
  const beskrivning = [
    `Så tar du dig till ${island.name}`,
    vag ? `: ${vag}` : '',
    '.',
    // Restiden utan klockslag: Lilla Karlsö "båten till ön avgår 09.00", Blå Jungfrun "avgång 09.00, hemma 15.15 eller 16.15" (mall-0166 omarbete 4).
    restid ? ` Restid: ${restid}.` : '',
    operator && !(vag ?? '').toLowerCase().includes(operator.toLowerCase()) ? ` Trafik: ${operator}.` : '',
  ].join('')
  return {
    // Egen titel med färdsätt och hamn för öarna i src/lib/kommaDitTitlar.ts.
    title: kommaDitTitel(slug, island.name, titelFardsatt),
    description: beskrivning,
    keywords: [
      `hur tar man sig till ${island.name.toLowerCase()}`,
      `${island.name.toLowerCase()} båt`,
      `${island.name.toLowerCase()} färja`,
      `${island.name.toLowerCase()} transport`,
      `komma till ${island.name.toLowerCase()}`,
      `resa till ${island.name.toLowerCase()}`,
      ...(operator ? [`${island.name.toLowerCase()} ${operator.toLowerCase()}`] : []),
      `how to get to ${island.name.toLowerCase()} sweden`,
    ],
    openGraph: {
      images: ogO(island.slug),
      title: kommaDitTitel(slug, island.name, titelFardsatt),
      // Tidigare lovade delningstexten "avgångstider, priser" och buss för alla
      // öar. Sidorna har inga priser. Nu samma text som metabeskrivningen.
      description: beskrivning,
      url: `https://svalla.se/o/${slug}/komma-dit`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/komma-dit` },
  }
}

export default async function IslandKommaDitPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  // Påståenden som bara är sanna för vissa öar ska inte stå på alla 103.
  // "Ingen egen båt krävs" var hårdkodat även för öar utan reguljärtrafik, och
  // Waxholmsbolagets biljettregler visades på Bohusläns öar (2026-09-21).
  // "Egen eller hyrd båt", "Ingen reguljär båt" (Yttre Gården) och "Fritidsbåt" (Storholmen)
  // räknades som allmän trafik (2026-11-02, mall-0166 omarbete).
  const egenBat = /egen båt|egen eller hyrd båt|fritidsbåt|segelbåt|kajak|charter|ingen reguljär/i
  // Ett färdsätt som utgår från orten själv tar en inte dit: Hamburgsunds linfärja går till Hamburgö,
  // Grebbestads taxibåt till Otterön (2026-11-03, mall-0166 omarbete 3).
  const franOrten = (fran?: string) => franPlatsen(island.name, fran)
  const kollektiva = island.getting_there.filter(t => !egenBat.test(t.method) && !franOrten(t.from))
  const kollektivt = kollektiva.length > 0
  // Klockslagen stryks enligt Toms beslut 10 (src/lib/klockslagStrykning.ts; mallarnas runda 7).
  const { harKlockslag, utanKlockslag, utanKlockslagsmeningar, fardUtanKlockslag } = klockslagsregler(stryksKlockslag(slug, 'komma-dit'))
  // "Hur lång tid tar båten" stod också på öar som nås med bil och buss (2026-11-02, mall-0170),
  // och på orter där båten går därifrån och svaret är bil- eller busstid (Hamburgsund, Grebbestad,
  // Lysekil, Grundsund, Orust, Resarö; mall-0170 omarbete 2). Nås orten på väg frågar vi om resan.
  const vag = nasUtanBat(island.getting_there, island.name)
  const batlinje = harBat(kollektiva.map(t => t.method)) && !vag
  const stockholm = island.region === 'norra' || island.region === 'mellersta' || island.region === 'södra'
  // Waxholmsbolagets regler gäller bara öar som bolaget trafikerar; Storholmen
  // har SL:s pendelbåt 80. Samma test som med-barn/page.tsx (2026-11-02, mall-0174).
  // Bara allmänna färdsätt: Yttre Gårdens "Ingen reguljär båt" nämner Waxholmsbolaget
  // för att säga att bolaget inte går dit (2026-11-02, mall-0174 omarbete).
  const usesWaxholmsbolaget = (island.transport_meta?.operator ?? '').includes('Waxholmsbolaget')
    || kollektiva.some(t => `${t.method} ${t.desc}`.includes('Waxholm'))
  // SL:s egna biljettregler där ön nås med SL men inte med Waxholmsbolaget (bussar, pendelbåt). Ersätter Waxholmsbolagets
  // tips, som main visade på alla Stockholmsöar (mall-0174; Lag 3, mallarnas runda 8, 2026-11-17).
  const slTrafik = !usesWaxholmsbolaget && (island.transport_meta?.operator === 'SL'
    || kollektiva.some(t => /\bSL\b|SL-buss|\/sl\//.test(`${t.method} ${t.desc} ${t.url ?? ''}`)))
  // Ön nås (också) med egen båt: ett färdsätt med egen båt, eller en text som säger att man annars tar egen båt (Bullerö
  // "Övrig tid: egen båt eller taxibåt"). Då visas allemansrättens regler för båt i stället för Waxholmsbolagets tips, på
  // öar som bolaget inte trafikerar (runda 8). Öar utan allmän trafik har alltid fått dem (mall-0174 omarbete).
  const egenBatFard = !kollektivt || (!usesWaxholmsbolaget && island.getting_there.some(t => egenBat.test(t.method)
    || (/egen båt/i.test(t.desc) && !/ingen egen båt|utan egen båt/i.test(t.desc))))
  // Båtrutan och lokala förbud (mallarnas runda 9, 2026-11-17; src/lib/batregler.ts): har myndigheten föreskrivit förbud
  // för ankring, förtöjning, tillträde eller fart börjar rutan med dem; anger bara en verksamhet ett förbud (Birka) visas
  // rutan inte, så att den allmänna regeln inte står bredvid öns eget kort om förbudet (mall-N042).
  // Bara på genomgångna öar (batrutaGranskad): de 16 nya öarna på main med egen båt är inte genomgångna (runda 10).
  const batruta = egenBatFard && batrutaGranskad(slug)
  const lokalaBatregler = batruta ? LOKALA_BATREGLER[slug] ?? [] : []
  // Inledningen bara i skyddade områden; ett ankringsförbud vid en kabel står utan (sm07-k016; runda 10, src/lib/batregler.ts).
  const batInledning = batregelInledning(slug)
  // Restiden och tiderna i mallens texter utan klockslag ur datan (undertitel, FAQ; mall-0166 omarbete 4).
  const restid = utanKlockslag(island.facts.travel_time ?? '')
  const tider = island.getting_there.filter(t => t.time && !harKlockslag(t.time))
  // Korten nedan: tiden och texten utan klockslag, samma regel som FAQ-svaren (Lilla Karlsö "09.00–13.30";
  // Kontrollantens fynd utanför-1, mallarnas runda 6, 2026-11-16).
  const fardKort = island.getting_there.map(fardUtanKlockslag)
  // Turtäthet och parkering utan led med klockslag (Lilla Karlsö "Avgång 09.00 från Djupvik, …", Gotland "öppen 06–24 och
  // låst nattetid"); texter utan klockslag visas som de står (runda 6, utanför-1).
  const tm = island.transport_meta
  const turtathet = tm?.frequency && harKlockslag(tm.frequency) ? utanKlockslag(tm.frequency) : tm?.frequency ?? ''
  const parkering = tm?.car_parking && harKlockslag(tm.car_parking) ? utanKlockslag(tm.car_parking).replace(/[^.!?]$/, m => `${m}.`) : tm?.car_parking ?? ''
  const lankFor = (method: string, desc: string, url?: string) => {
    if (url) return url
    const tm = island.transport_meta
    if (!tm?.booking_url) return null
    const op = tm.operator.toLowerCase()
    const m = `${method} ${desc}`.toLowerCase()
    return m.includes(op) || (op.includes('waxholm') && m.includes('waxholm')) ? tm.booking_url : null
  }

  const transportSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Hur tar man sig till ${island.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: island.getting_there.length > 0
            // Utan meningar med klockslag ur datan (Vaktens lista: avgångstider i FAQ:n på 23 öar; mallarnas runda 5).
            ? island.getting_there.map(t => { const d = utanKlockslagsmeningar(t.desc); const s = (d ? `${t.method}: ${d}` : t.method).trim(); return /[.!?]$/.test(s) ? s : `${s}.` }).join(' ')
            : `Vi har inte kunnat belägga någon reguljär förbindelse till ${island.name}.${restid ? ` Restid: ${restid}.` : ''}`,
        },
      },
      {
        '@type': 'Question',
        name: `Behöver man en egen båt för att komma till ${island.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: kollektivt
            // Utan väg bara när trafiken går: turbåtarna till Gotska Sandön, Blå Jungfrun och Lilla
            // Karlsö går bara sommartid (mall-0166 omarbete 2).
            // Inga klockslag: Lilla Karlsös tid "09.00–13.30" är avgång och återkomst, ingen restid (mall-0166 omarbete 3).
            ? `${vag ? 'Nej.' : 'Nej, inte när trafiken går:'} ${kollektiva.map(t => `${fardsattFran(t.method, t.from)}${t.time && !harKlockslag(t.time) ? ` (${t.time})` : ''}`).join(', ')}.`
            : `Vi har inte kunnat belägga någon reguljär förbindelse till ${island.name}.${restid ? ` Restid: ${restid}.` : ''}`,
        },
      },
      {
        '@type': 'Question',
        name: `Hur lång tid tar ${batlinje ? 'båten' : 'resan'} till ${island.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${restid ? `Restid till ${island.name}: ${restid}. ` : tider.map(t => `${fardsattFran(t.method, t.from)}: ${t.time}`).join('. ') + (tider.length > 0 ? '. ' : '')}${island.transport_meta ? `Från närmaste knutpunkt (${island.transport_meta.nearest_hub}): ca ${island.transport_meta.from_nearest_hub_min} minuter.` : ''}`,
        },
      },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeForScript(transportSchema) }} />

      <IslandSubPageHeader
        island={island}
        tab="komma-dit"
        subtitle={`${restid ? `Restid: ${restid}.` : ''}${kollektivt ? `${restid ? ' ' : ''}${vag ? 'Ingen egen båt krävs.' : 'Utan egen båt kommer du dit med trafiken nedan, när den går.'}` : ''}`}
      />

      <div style={{ maxWidth: 900, margin: '24px auto 0', padding: '0 16px 60px' }}>

        {/* Snabb restid-info */}
        {island.transport_meta && (
          <div style={{
            background: 'var(--white)', borderRadius: 16, padding: '20px 22px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid rgba(10,123,140,0.07)',
            marginBottom: 24,
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16,
          }}>
            <div>
              {/* "Från Stockholm" stod även på Bohusläns och Göteborgs öar. */}
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 }}>{stockholm ? 'Från Stockholm' : `Från ${island.transport_meta.nearest_hub}`}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--sea)' }}>{stockholm ? island.transport_meta.from_city_min : island.transport_meta.from_nearest_hub_min} min</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 }}>Närmaste knutpunkt</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)' }}>{island.transport_meta.nearest_hub}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 }}>Operatör</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)' }}>{island.transport_meta.operator}{island.transport_meta.line ? ` · linje ${island.transport_meta.line}` : ''}</div>
              {island.transport_meta.booking_url && (
                <a href={island.transport_meta.booking_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none' }}>
                  {/* RUNDA 2 (2026-11-28, f300b-0120): "Se tidtabell" stod också på länkar till startsidor och sidor utan tidtabell
                      (sl.se, waxholmsbolaget.se, destinationgotland.se, solkustturer.se med flera). Samma etikettregel som färdsättskorten. */}
                  {((u: string) => /\.pdf(\?|$)/i.test(u) ? 'Tidtabell (pdf) →' : /trafikverket\.se|vasttrafik\.se\/reseplanering\/tidtabeller\/linje\//i.test(u) ? 'Tidtabell →' : (() => { try { return `Mer hos ${new URL(u).hostname.replace(/^www\./, '')} →` } catch { return 'Mer om resan →' } })())(island.transport_meta.booking_url)}
                </a>
              )}
            </div>
            {turtathet && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 }}>Turtäthet</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>{turtathet}</div>
            </div>
            )}
          </div>
        )}

        {/* Transportalternativ */}
        {island.getting_there.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Hur tar man sig till {island.name}?
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {/* Länken väljs på den fullständiga texten, där operatören kan stå i en mening med klockslag. */}
              {fardKort.map((t, i) => (
                <div key={i} style={{
                  background: 'var(--white)', borderRadius: 14, padding: '18px 20px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(10,123,140,0.08)',
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                }}>
                  <span style={{ flexShrink: 0, marginTop: 2, color: 'var(--sea)', display: 'inline-flex' }}>
                    <Icon name={emojiToIcon(t.icon)} size={24} stroke={1.7} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' as const }}>
                      <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--txt)' }}>{t.method}</span>
                      {t.time && (
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sea)', background: 'rgba(10,123,140,0.08)', padding: '2px 10px', borderRadius: 999 }}>
                          {t.time}
                        </span>
                      )}
                    </div>
                    {/* Bara när from är en ort, inte "Valfri hamn" eller "Varierar" (samma regel som fardsattFran; runda 7). */}
                    {arOrt(t.from) && (
                      <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2, marginBottom: 6 }}>Från: {t.from}</div>
                    )}
                    <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65 }}>{t.desc}</div>
                    {lankFor(t.method, island.getting_there[i]!.desc, t.url) ? (
                      <a href={lankFor(t.method, island.getting_there[i]!.desc, t.url)!} target="_blank" rel="noopener noreferrer" style={{
                        display: 'inline-block', marginTop: 10, fontSize: 13, fontWeight: 700,
                        color: 'var(--sea)', textDecoration: 'none',
                      }}>
                        {/* Tryckta tidtabeller (SL, Västtrafik) har ingen biljettinformation (2026-11-02, mall-0172 omarbete). */}
                        {/* Trafikverkets vägfärjor har tidtabell men ingen biljettinformation (Nordöleden; mall-0172 omarbete 2). */}
                        {/* Västtrafiks linjesidor har ingen biljettinformation (mall-0172 omarbete 3). Höga Kusten-båtarnas startsida har
                            ingen tidtabell, så Ulvön länkar direkt till turlistan (pdf) (mall-0172 omarbete 4). */}
                        {/* f300b-0131 (fas 3, 2026-11-28): "Tidtabell och biljettinformation" stod också på länkar till Länsstyrelsens
                            reservatssidor, en kontaktsida och en kommunal nyhet. Nu namnges sajten länken går till. */}
                        {/\.pdf(\?|$)/i.test(lankFor(t.method, island.getting_there[i]!.desc, t.url)!) ? 'Tidtabell (pdf) →' : /trafikverket\.se|vasttrafik\.se\/reseplanering\/tidtabeller\/linje\//i.test(lankFor(t.method, island.getting_there[i]!.desc, t.url)!) ? 'Tidtabell →' : (() => { try { return `Mer hos ${new URL(lankFor(t.method, island.getting_there[i]!.desc, t.url)!).hostname.replace(/^www\./, '')} →` } catch { return 'Mer om resan →' } })()}
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fallback om ingen transportdata */}
        {island.getting_there.length === 0 && (
          <div style={{
            background: 'var(--white)', borderRadius: 14, padding: '20px',
            border: '1px solid rgba(10,123,140,0.08)',
            marginBottom: 28,
          }}>
            <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: 0 }}>
              Restid: {restid}.{usesWaxholmsbolaget ? (<>{' '}Se{' '}
              <a href="https://waxholmsbolaget.se" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sea)' }}>
                Waxholmsbolagets tidtabell
              </a>{' '}
              för aktuella avgångstider.</>) : null}
            </p>
          </div>
        )}

        {/* Praktisk info — visas bara när det finns något som gäller den här ön */}
        {(usesWaxholmsbolaget || slTrafik || parkering || batruta) && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(10,123,140,0.06) 0%, rgba(26,74,107,0.04) 100%)',
          borderRadius: 16, padding: '22px 20px',
          border: '1px solid rgba(10,123,140,0.10)',
          marginBottom: 28,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 12 }}>
            Praktiska tips
          </h3>
          <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.9 }}>
            {/* KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Barn som är under 7 år gamla reser utan avgift med annan betalande resenär.", "Du räknas som ungdom om du är över 7 år gammal men inte har fyllt 20 år ännu.", "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd." (läst 2026-10-29) */}
            {/* KÄLLA: https://sl.se/biljetter/sortiment-och-regler/biljetter-for-resor-med-waxholmsbolagets-skargardsbatar — "Det är inte lågsäsong. Det vill säga att du reser under perioden 30 april–13 september.", "Under lågsäsongen, från 14 september till 29 april, gäller alla SL:s periodbiljetter som har en giltighetstid på 30 dagar eller längre för resor på Waxholmsbolagets båtar." (läst 2026-10-29) */}
            {usesWaxholmsbolaget && (<>
              <li>Barn under 7 år åker gratis med Waxholmsbolaget i sällskap med en annan betalande resenär, och 7 till 19 år betalar rabatterat pris.</li>
              <li>Alla SL-biljetter gäller på Waxholmsbolaget mellan Strömkajen och Vaxholm med omnejd. Längre ut krävs Waxholmsbolagets biljett 30 april till 13 september; 14 september till 29 april gäller SL-periodbiljetter på 30 dagar eller mer i hela trafiken.</li>
              {/* KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "ANMÄRKNING TUR", "ANMÄRKNING BRYGGA", "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00" (tabell 10, gäller 2 april–18 juni och 17 augusti–12 december 2026; tabell 24 gällde till 1 november) (läst 2026-10-29) */}
              {/* KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Beställ resan i SL-appen, på", "08-600 10 00 minst 2 timmar innan" (läst 2026-11-28; f300b-0127) */}
              <li>Vissa bryggor och turer är beställningstrafik. Beställ resan i SL-appen, på Waxholmsbolagets webb eller på 08-600 10 00. Vilka turer och bryggor det gäller, och hur långt i förväg, står i anmärkningarna i linjens tidtabell.</li>
            </>)}
            {/* SL:s biljettregler (mall-N020, N021; mallarnas runda 8, 2026-11-17). Inga priser. */}
            {/* KÄLLA: https://sl.se/biljetter/sortiment-och-regler/rabatter — "Barn som är under 7 år får åka med gratis när de reser med en annan person som har en giltig biljett.", "Den som är över 18 år och har en SL-biljett får utan kostnad ta med sig upp till sex stycken barn som fyllt 7 men inte 12 år. Det här gäller alla dagar i veckan året om.", "Den som är under 20 eller över 65 kan alltid köpa biljett till ett rabatterat pris." (läst 2026-11-17) */}
            {/* KÄLLA: https://sl.se/biljetter/res-med-betalkort — "Du kan blippa ditt betalkort i alla olika delar av SL‑trafiken.", "Blippa ditt betalkort och köp en enkelbiljett till vuxenpris. Om du vill resa till rabatterat pris måste du ställa in det här på sl.se senast dagen innan du ska resa.", "Biljetten är giltig i 75 minuter från att du blippade betalkortet första gången under resan." (läst 2026-11-17) */}
            {slTrafik && (<>
              <li>Barn under 7 år åker gratis med SL när de reser med någon som har giltig biljett. Den som är över 18 år och har en SL-biljett får dessutom ta med upp till sex barn som fyllt 7 men inte 12 år utan kostnad, alla dagar året om.</li>
              <li>Den som är under 20 eller över 65 år kan alltid köpa SL-biljett till rabatterat pris.</li>
              <li>Du kan blippa ditt betalkort i alla delar av SL-trafiken och köpa en enkelbiljett till vuxenpris. Den gäller i 75 minuter från första blippen under resan. Vill du resa till rabatterat pris med betalkortet ställer du in det på sl.se senast dagen innan.</li>
            </>)}
            {parkering && (
              <li>Parkering: {parkering}</li>
            )}
            {/* Öar som nås med egen båt eller kajak. Ersätter Waxholmsbolagets regler, som visades på Yttre Gården fast bolaget
                inte går dit (2026-11-02, mall-0174 omarbete). Sedan runda 8 också där egen båt är ett av färdsätten (egenBatFard),
                med reglerna för att ligga för ankar och om skyddade områden (mall-N022, N023; 2026-11-17). */}
            {/* Lokala föreskrifter först (mall-N025 till N039; runda 9, 2026-11-17). Varje ös föreskrifter och inledningen i
                skyddade områden (SKYDDAT_INLEDNING) har sina KÄLLA-rader i src/lib/batregler.ts. "Lokala föreskrifter går före
                allemansrätten" stod också vid ankringsförbuden vid kablar, där källan om skyddade områden inte gäller (sm07-k016; runda 10). */}
            {lokalaBatregler.length > 0 && (<>
              <li>{batInledning ? `${batInledning} ` : ''}{lokalaBatregler[0]}</li>
              {lokalaBatregler.slice(1).map(r => <li key={r}>{r}</li>)}
            </>)}
            {/* Allemansrätten med Naturvårdsverkets eget förbehåll (strand som inte är skyddad) och att den som åker båt ska känna
                till föreskrifterna för vattnet (mall-N040; runda 9; tiden för ankring mall-N041). Citatet var kapat före "eller som är skyddad". */}
            {/* KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Du får gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt, eller som är skyddad för fågelliv eller annat.", "Åker du båt ska du visa gott sjömanskap och känna till regler och föreskrifter som gäller för de vatten du färdas i." (läst 2026-11-17) */}
            {/* KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Det finns inte heller någon regel för hur länge du får ligga för ankar på samma plats. Man brukar använda sig av samma princip som för tältning, och det är något enstaka dygn.", "Om du har tänkt att ligga för ankar eller förtöja en längre tid vid någon annans strand behöver du fråga markägaren om lov." (läst 2026-11-17) */}
            {/* KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "I nationalparker, naturreservat och i andra skyddade områden gäller särskilda regler. Reglerna kan begränsa allemansrätten.", "I nationalparker och naturreservat kan det till exempel finnas särskilda regler om att elda, tälta eller förtöja en båt. Vid fågel- eller sälskyddsområden får du inte stiga iland under en viss tid av året. Det kan även vara förbjudet att vistas på vattnet inom ett visst avstånd från stranden. Förbuden märks ofta ut med gula eller röd/gula skyltar." (läst 2026-11-17) */}
            {batruta && (<>
              <li>Med egen båt eller kajak får du enligt allemansrätten gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte hör till någon tomt och inte är skyddad för fågelliv eller annat, så länge inga lokala föreskrifter säger något annat. Den som åker båt ska känna till de regler och föreskrifter som gäller för vattnet.</li>
              <li>Allemansrätten har ingen regel för hur länge du får ligga för ankar på samma plats; brukligt är något enstaka dygn, som för tältning. Vill du ligga för ankar eller förtöja längre vid någon annans strand behöver du fråga markägaren om lov.</li>
              <li>I nationalparker, naturreservat och andra skyddade områden gäller särskilda regler som kan begränsa allemansrätten, till exempel om att förtöja en båt. Vid fågel- och sälskyddsområden får du inte gå i land under en viss tid av året, och det kan vara förbjudet att vara på vattnet inom ett visst avstånd från stranden. Förbuden märks ofta ut med gula eller röd/gula skyltar.</li>
            </>)}
          </ul>
        </div>
        )}

        {/* Planera tur med Thorkel */}
        <div style={{
          background: 'linear-gradient(160deg, #1a4a6b 0%, #0d6e6e 100%)',
          borderRadius: 16, padding: '28px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 20, flexWrap: 'wrap' as const,
          marginBottom: 32,
        }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 600, marginBottom: 6 }}>AI-planeraren</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              Planera resan till {island.name} med Thorkel
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
              Berätta när du vill åka, så föreslår Thorkel en plan.
            </div>
            {/* Knappen leder till ruttplaneraren /planera/ny, som fungerar utan konto (2026-11-02, mall-0189). Dela
                går också utan konto; inloggning behövs för att spara rutten i dina rutter (/api/planera/claim).
                Inte /planera: src/middleware.ts skyddar exakt /planera (ruttlistan) och skickar en utloggad besökare
                till inloggningen; bara /planera/ny och /planera/<id> är publika (mallarnas runda 8, 2026-11-17). */}
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>Ruttplaneraren fungerar utan konto. Logga in om du vill spara rutten i dina rutter.</div>
          </div>
          <Link href="/planera/ny" prefetch={false} style={{
            display: 'inline-block', background: 'var(--acc-knapp)', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 50, flexShrink: 0,
          }}>
            Planera med Thorkel →
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href={`/o/${slug}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--sea-knapp)', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 28,
          }}>
            ← Tillbaka till {island.name}
          </Link>
        </div>
      </div>
    </div>
  )
}
