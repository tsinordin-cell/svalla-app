import type { Metadata } from 'next'
import Link from 'next/link'
import Icon, { type IconName } from '@/components/Icon'
import { GUIDES } from '@/app/guider/guides-data'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { getAdminClient } from '@/lib/supabase-admin'

export const metadata: Metadata = {
  title: 'Annonsera och samarbeta med Svalla – mediakit 2026',
  description: 'Nå skärgårds- och kustintresserade resenärer via Svalla. Nyhetsbrevssponsorskap, redaktionella samarbeten och destinationspartnerskap. Kontakta oss för offert.',
  alternates: { canonical: 'https://svalla.se/partner-sida' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Annonsera på Svalla – nå Sveriges skärgårdsintresserade resenärer',
    description: 'Guider, öprofiler och platser längs hela kusten, med källa för varje uppgift. Tre samarbetsformer, inga programmatiska annonser.',
    url: 'https://svalla.se/partner-sida',
    type: 'website',
  },
}

// ─── Siffror ───────────────────────────────────────────────────────────────────
// 2026-09-22: ÅTERSTÄLLD efter PR #338 och förbättrad. Upplägget, paketen,
// processen och exempelutskicket är tillbaka. Det enda som INTE är tillbaka är
// siffror som saknade underlag (MÄTT 2026-09-21): "2 200+ prenumeranter"
// (email_subscribers: 12), "18 000+ läsare" (ingen besöksmätning är påslagen),
// "52 %/9 %" öppning/klick för ett nyhetsbrev som aldrig gått ut, demografin
// (68 % Stockholm, 54 % kvinnor …) och trafikkurvan per månad.
//
// Siffrorna nedan räknas ur sajtens egen data och kan därför inte ljuga eller
// bli inaktuella. Publiksiffror läggs till här NÄR de mäts — sätt värdet så
// visas rutan, lämna null så syns den inte.
export const revalidate = 3600

const PUBLIK: { manadsbesokare: string | null; prenumeranter: string | null } = {
  manadsbesokare: null,
  prenumeranter: null,
}

const REGIONER_UTANFOR_STHLM = new Set(['bohuslan', 'goteborg', 'ovriga'])
const HAMNAR = ALL_ISLANDS.reduce((n, o) => n + (o.harbors?.length ?? 0), 0)
const OAR_UTANFOR = ALL_ISLANDS.filter(o => REGIONER_UTANFOR_STHLM.has(o.region)).length
const fmt = (n: number) => n.toLocaleString('sv-SE')

async function antalPlatser(): Promise<number | null> {
  try {
    const { count, error } = await getAdminClient().from('restaurants').select('*', { count: 'exact', head: true })
    return error ? null : count ?? null
  } catch {
    return null
  }
}

// KÄLLA säsongen: Waxholmsbolaget tabell 26 ("gäller 2 april–18 juni och
// 17 augusti–1 november 2026") och tabell 15 sommar (19 juni–16 augusti 2026),
// https://kund.printhuset-sthlm.se/wa/h26.pdf och /wa/s15.pdf; Strömma,
// Cinderellabåtarna 2026 (30 april–27 september). Lästa 2026-09-21.
const SASONG: Array<{ namn: string; fran: [number, number]; till: [number, number]; farg: string }> = [
  { namn: 'Waxholmsbolagets vår- och hösttidtabell', fran: [4, 2], till: [11, 1], farg: 'rgba(10,123,140,0.35)' },
  { namn: 'Cinderellabåtarna till Sandhamn', fran: [4, 30], till: [9, 27], farg: 'rgba(10,123,140,0.6)' },
  { namn: 'Waxholmsbolagets sommartidtabell', fran: [6, 19], till: [8, 16], farg: 'linear-gradient(90deg,#0a7b8c,#1e5c82)' },
]
const MANADER = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
// Position i året, 0–100 %
const iAret = ([m, d]: [number, number]) => ((m - 1) + (d - 1) / 30.5) / 12 * 100

export default async function PartnerSidaPage() {
  const platser = await antalPlatser()
  const S = {
    guides: fmt(GUIDES.length),
    islands: fmt(ALL_ISLANDS.length),
    places: platser ? fmt(platser) : null,
    harbors: fmt(HAMNAR),
  }
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 96 }}>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(160deg, #091e2e 0%, #0d3f5a 45%, #1a6b7a 100%)',
        padding: 'clamp(56px,8vw,96px) 20px clamp(48px,6vw,80px)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 999,
            padding: '5px 16px',
            fontSize: 11,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '1.6px',
            textTransform: 'uppercase',
            marginBottom: 22,
          }}>
            Mediakit 2026
          </div>
          <h1 style={{
            fontSize: 'clamp(30px, 5vw, 50px)',
            fontWeight: 800,
            color: '#fff',
            margin: '0 0 20px',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}>
            Nå resenärer som redan<br />
            <span style={{ color: '#7dd3c8' }}>vet vart de vill åka</span>
          </h1>
          <p style={{
            fontSize: 'clamp(15px,2vw,18px)',
            color: 'rgba(255,255,255,0.72)',
            margin: '0 0 40px',
            lineHeight: 1.7,
            maxWidth: 540,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Den som öppnar Svalla drömmer inte om skärgården — hen planerar en tur dit. Vilken ö, vilken båt, var man äter och var man lägger till. Där, mitt i planeringen, syns din verksamhet.
          </p>

          {/* Hero-stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 40 }}>
            {[
              { v: PUBLIK.manadsbesokare, l: 'besökare i månaden' },
              { v: PUBLIK.prenumeranter,  l: 'prenumeranter' },
              { v: S.guides,              l: 'guider' },
              { v: S.islands,             l: 'öprofiler' },
              { v: S.places,              l: 'platser på kartan' },
              { v: S.harbors,             l: 'hamnar beskrivna' },
            ].filter(x => x.v).map(({ v, l }) => (
              <div key={l} style={{
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 12,
                padding: '12px 20px',
                textAlign: 'center',
                minWidth: 100,
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.52)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>

          <a
            href="mailto:hej@svalla.se?subject=Partnerförfrågan%20Svalla"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: '#fff',
              color: '#0d3f5a',
              borderRadius: 12,
              textDecoration: 'none',
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: '-0.01em',
            }}
          >
            Kontakta oss om samarbete →
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 20px' }}>

        {/* ── Varför Svalla — intentbaserad räckvidd ── */}
        <section style={{ padding: '60px 0 52px' }}>
          <div style={{ maxWidth: 680 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 14px' }}>
              Det är stor skillnad på räckvidd och intention
            </h2>
            <p style={{ fontSize: 16, color: 'var(--txt2)', lineHeight: 1.75, margin: '0 0 14px' }}>
              Sociala medier säljer räckvidd. Svalla säljer intention. Den som läser om båten till Utö eller gästhamnen på Möja har redan bestämt sig för att åka ut — hen vet bara inte exakt till vilken ö, vilket värdshus eller vilken aktivitet.
            </p>
            <p style={{ fontSize: 16, color: 'var(--txt2)', lineHeight: 1.75, margin: 0 }}>
              Den positionen är dyr att köpa i sökannonser. På Svalla står ditt erbjudande bredvid båttiderna och öguiden — i ett sammanhang som ingen banner kan efterlikna.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14, marginTop: 36 }}>
            {[
              {
                icon: 'target' as IconName,
                title: 'Djup nisch, noll spill',
                text: 'Svalla handlar bara om hav, skärgård och kust. Du betalar inte för visningar hos folk som inte ska ut på vattnet.',
              },
              {
                icon: 'compass' as IconName,
                title: 'Källa på varje uppgift',
                text: 'Båttider, regler och fakta hämtas från myndigheter och operatörer, med källan angiven. Läsarna litar på sidan — och på det som står på den.',
              },
              {
                icon: 'lock' as IconName,
                title: 'Inga programmatiska annonser',
                text: 'Aldrig. Varje samarbete är manuellt paketerat och kontextuellt placerat. Inga reklambannrar, inga pop-ups.',
              },
              {
                icon: 'barChart' as IconName,
                title: 'Tidigt partnerskap lönar sig',
                text: 'Svalla lanseras fullt inför sommaren 2027. Partners som kommer in tidigt låser in priset och syns från första dagen.',
              },
            ].map(({ icon, title, text }) => (
              <div key={title} style={{
                background: 'var(--white)',
                borderRadius: 14,
                padding: '20px 20px 18px',
                border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}>
                <div style={{ marginBottom: 10, color: 'var(--sea)' }} aria-hidden><Icon name={icon} size={24} /></div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--txt)', marginBottom: 8, lineHeight: 1.3 }}>{title}</div>
                <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Målgrupp ── */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 10px' }}>Vem Svalla är byggt för</h2>
          <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: '0 0 28px', maxWidth: 600 }}>
            Inte en bred &quot;outdoor&quot;-publik. Svalla är byggt för den som har bestämt sig för skärgården — dagsturen med Waxholmsbåten, helgen på en ö eller båtsemestern längs kusten — och nu letar efter var, hur och när.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{
              background: 'var(--white)',
              borderRadius: 16,
              padding: '24px',
              border: '1px solid rgba(0,0,0,0.07)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              gridColumn: 'span 2',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                {[
                  { label: 'Öar', value: `${S.islands} öprofiler`, sub: `${fmt(OAR_UTANFOR)} utanför Stockholms skärgård` },
                  { label: 'Planering', value: `${S.guides} guider`, sub: 'Badplatser, färdvägar, säsong och mat' },
                  { label: 'Kartan', value: S.places ? `${S.places} platser` : 'Krogar och hamnar', sub: 'Krogar, bryggor, naturhamnar och bastu' },
                  { label: 'Båtfolk', value: `${S.harbors} hamnar`, sub: 'Gästhamnar och angöring per ö' },
                  { label: 'Båt dit', value: 'Tidtabellerna', sub: 'Waxholmsbolaget, SL, Västtrafik, Strömma' },
                  { label: 'Kusten', value: 'Hela Sverige', sub: 'Stockholm, Bohuslän, Göteborg, Gotland, Öland, Höga Kusten' },
                ].map(({ label, value, sub }) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--sea)', marginBottom: 3 }}>{value}</div>
                    <div style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.4 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Säsongskalender */}
          <div style={{ marginTop: 14 }}>
            <div style={{
              background: 'var(--white)',
              borderRadius: 16,
              padding: '22px 24px',
              border: '1px solid rgba(0,0,0,0.07)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--txt)', marginBottom: 4 }}>Säsongen enligt båttidtabellerna 2026</div>
              <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '0 0 16px', lineHeight: 1.5 }}>När båtarna går, reser folket. Planera kampanjen efter tidtabellerna.</p>
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', marginBottom: 8 }}>
                  {MANADER.map(m => (
                    <div key={m} style={{ fontSize: 10, color: 'var(--txt3)', textAlign: 'center', borderLeft: '1px solid rgba(0,0,0,0.06)' }}>{m}</div>
                  ))}
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {SASONG.map(b => (
                    <div key={b.namn}>
                      <div style={{ position: 'relative', height: 14, background: 'rgba(0,0,0,0.04)', borderRadius: 7 }}>
                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${iAret(b.fran)}%`, width: `${iAret(b.till) - iAret(b.fran)}%`, background: b.farg, borderRadius: 7 }} />
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--txt2)', marginTop: 3 }}>
                        {b.namn} · {b.fran[1]}/{b.fran[0]}–{b.till[1]}/{b.till[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'var(--txt3)' }}>
                Källor: Waxholmsbolagets tidtabeller 15 och 26, Strömma. Gäller 2026.
              </div>
            </div>
          </div>
        </section>

        {/* ── Samarbetsformer ── */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 6px' }}>Samarbetsformer</h2>
          <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 32px' }}>Tre former av samarbete — maila oss för offert och vi skräddarsyr ett upplägg.</p>

          {/* Paket */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginBottom: 20 }}>
            {[
              {
                icon: 'mail' as IconName,
                name: 'Nyhetsbrevssponsor',
                tagline: 'Exklusiv plats i Svallas helgtips — torsdagar maj–september, när helgvädret lockar ut',
                highlight: false,
                badge: null,
                bullets: [
                  'Max 1 sponsor per utskick — aldrig konkurrens',
                  'Dedikerat avsnitt med din text + bild + länk',
                  'UTM-tracking på alla klick',
                  'Redaktionen kvalitetsgranskar texten',
                  'Rapport med klick efter varje utskick',
                ],
                note: 'Bäst för: värdshus, aktörer och upplevelsebolag som vill driva bokningar under högsäsong.',
              },
              {
                icon: 'edit' as IconName,
                name: 'Redaktionellt samarbete',
                tagline: 'Djupguide eller destinationsartikel skriven av Svalla',
                highlight: true,
                badge: 'Rekommenderas',
                bullets: [
                  'Skriven av Svallas redaktion — inte av en copywriter',
                  'SEO-optimerad och permanent på svalla.se',
                  'Varje uppgift får en källa, som allt annat på Svalla',
                  'Märkt som "redaktionellt samarbete"',
                  'Uppdateras löpande om fakta förändras',
                ],
                note: 'Bäst för: destinationer, aktörer med en komplex produkt och varumärken som vill bygga förtroende.',
              },
              {
                icon: 'island' as IconName,
                name: 'Destinationspartner',
                tagline: 'Löpande synlighet under hela säsongen',
                highlight: false,
                badge: null,
                bullets: [
                  'Exponering i relevanta öprofiler + guider i 3 månader',
                  'Två platser i helgtipset under säsongen',
                  'Löpande uppdatering av öppettider och erbjudanden',
                  'Logotyp i partnersektion på svalla.se',
                  'Månatlig rapport över visningar och klick',
                ],
                note: 'Bäst för: värdshus, hotell, destinationsbolag och regionala aktörer som vill synas hela säsongen.',
              },
            ].map(pkg => (
              <div key={pkg.name} style={{
                background: pkg.highlight ? 'linear-gradient(155deg, #0d3f5a 0%, #1e5c82 60%, #1a6b7a 100%)' : 'var(--white)',
                borderRadius: 20,
                padding: '26px 24px 22px',
                border: pkg.highlight ? 'none' : '1px solid rgba(0,0,0,0.08)',
                boxShadow: pkg.highlight ? '0 12px 40px rgba(13,63,90,0.28)' : '0 2px 14px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}>
                {pkg.badge && (
                  <div style={{
                    position: 'absolute',
                    top: -11,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#f5a623',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 800,
                    padding: '3px 14px',
                    borderRadius: 999,
                    letterSpacing: '0.6px',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>{pkg.badge}</div>
                )}
                <div style={{marginBottom: 12}} aria-hidden><Icon name={pkg.icon} size={26} /></div>
                <div style={{ fontSize: 17, fontWeight: 800, color: pkg.highlight ? '#fff' : 'var(--txt)', marginBottom: 5 }}>{pkg.name}</div>
                <p style={{ fontSize: 13, color: pkg.highlight ? 'rgba(255,255,255,0.65)' : 'var(--txt3)', margin: '0 0 18px', lineHeight: 1.55 }}>{pkg.tagline}</p>

                <ul style={{ margin: '0 0 16px', padding: 0, listStyle: 'none' }}>
                  {pkg.bullets.map((b, i) => (
                    <li key={i} style={{
                      fontSize: 13,
                      color: pkg.highlight ? 'rgba(255,255,255,0.82)' : 'var(--txt2)',
                      lineHeight: 1.6,
                      marginBottom: 7,
                      paddingLeft: 18,
                      position: 'relative',
                    }}>
                      <svg aria-hidden viewBox="0 0 24 24" width="13" height="13" fill="none" stroke={pkg.highlight ? '#7dd3c8' : '#0a7b8c'} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 0, top: 5 }}><polyline points="20 6 9 17 4 12" /></svg>
                      {b}
                    </li>
                  ))}
                </ul>

                <p style={{ fontSize: 12, color: pkg.highlight ? 'rgba(255,255,255,0.45)' : 'var(--txt3)', fontStyle: 'italic', margin: '0 0 20px', lineHeight: 1.5, marginTop: 'auto' }}>
                  {pkg.note}
                </p>

                <div style={{ borderTop: `1px solid ${pkg.highlight ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}`, paddingTop: 18 }}>
                  <a
                    href={`mailto:hej@svalla.se?subject=${encodeURIComponent(`Partnerförfrågan: ${pkg.name}`)}&body=${encodeURIComponent(`Hej!\n\nJag är intresserad av "${pkg.name}" på Svalla.\n\nVår verksamhet:\n\nVad vi vill uppnå:\n\n`)}`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '12px 20px',
                      borderRadius: 10,
                      textDecoration: 'none',
                      fontSize: 14,
                      fontWeight: 700,
                      background: pkg.highlight ? 'rgba(255,255,255,0.13)' : 'rgba(10,123,140,0.07)',
                      color: pkg.highlight ? '#fff' : '#0a7b8c',
                      border: `1px solid ${pkg.highlight ? 'rgba(255,255,255,0.2)' : 'rgba(10,123,140,0.16)'}`,
                    }}
                  >
                    Kontakta oss för samarbete →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13, color: 'var(--txt3)', textAlign: 'center' }}>
            Behöver du ett skräddarsytt upplägg? Maila oss — vi löser det.
          </p>
        </section>

        {/* ── Så här fungerar det ── */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 10px' }}>Så här fungerar ett samarbete</h2>
          <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: '0 0 32px', maxWidth: 560 }}>
            Vi vill att processen ska vara enkel och transparent — inga långa avtal, ingen jakt på godkännanden.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, position: 'relative' }}>
            {[
              { step: '01', title: 'Kontakta oss', text: 'Maila hej@svalla.se med en kort beskrivning av din verksamhet och vad du vill uppnå. Vi svarar inom 48 timmar.' },
              { step: '02', title: 'Vi tar ett samtal', text: 'En kort genomgång (30 min, video eller telefon) där vi förstår din publik och diskuterar vilket upplägg som passar bäst.' },
              { step: '03', title: 'Vi levererar', text: 'Du godkänner innehållet innan det publiceras. Vi levererar rapport med klick och räckvidd efteråt.' },
            ].map(({ step, title, text }, i) => (
              <div key={step} style={{
                background: 'var(--white)',
                borderRadius: i === 0 ? '14px 0 0 14px' : i === 2 ? '0 14px 14px 0' : 0,
                padding: '24px 22px',
                border: '1px solid rgba(0,0,0,0.08)',
                borderLeft: i > 0 ? 'none' : '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#0a7b8c', letterSpacing: '1px', marginBottom: 10 }}>STEG {step}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--txt)', marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Nyhetsbrevsmock ── */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 10px' }}>Så ser ett sponsrat avsnitt ut</h2>
          <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: '0 0 28px', maxWidth: 560 }}>
            Sponsorblocket ser ut som redaktionellt innehåll — för att det är det. Vi skriver texten, du godkänner den.
          </p>

          {/* Mock email card */}
          <div style={{
            background: 'var(--white)',
            borderRadius: 18,
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.09)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            maxWidth: 560,
          }}>
            {/* Email header */}
            <div style={{
              background: 'linear-gradient(135deg, #0d3a5c, #1e5c82, #0a7b8c)',
              padding: '20px 24px 16px',
            }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 3 }}>Svallas helgtips</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Torsdag · helgen ser ut att bli fin</div>
            </div>

            {/* Email body */}
            <div style={{ padding: '22px 24px' }}>
              {/* Redaktionellt avsnitt */}
              <div style={{ marginBottom: 20 }}>
                {/* KÄLLA: Waxholmsbolagets tabell 21 Årsta brygga–Utö (35–75 min), buss 846 från Västerhaninge — samma belägg som Utö-guiden */}
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt3)', marginBottom: 8 }}>Helgens ö — Utö</div>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65, margin: '0 0 8px' }}>
                  Utö når du året runt: pendeltåg till Västerhaninge, buss 846 till Årsta brygga och båt till Gruvbryggan på 35–75 minuter...
                </p>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0a7b8c', textDecoration: 'none' }}>Läs Utö-guiden →</span>
              </div>

              {/* Sponsorblocket */}
              <div style={{
                background: 'rgba(10,123,140,0.04)',
                border: '1px solid rgba(10,123,140,0.12)',
                borderRadius: 10,
                padding: '16px 18px',
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>
                  I samarbete med — din verksamhet
                </div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #0d3f5a, #1a6b7a)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'}} aria-hidden><Icon name="pin" size={20} /></div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 5 }}>Rubriken på ditt erbjudande</div>
                    <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 8px' }}>
                      Två–tre meningar om vad ni erbjuder just den här helgen: bord på bryggan, ett paket med båt och boende eller en tur med guide. Vi skriver texten, du godkänner den.
                    </p>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0a7b8c', textDecoration: 'none' }}>Se erbjudandet →</span>
                  </div>
                </div>
              </div>

              {/* Redaktionellt fortsätter */}
              <div>
                {/* KÄLLA: Norröra samfällighetsförening, norrora.se/saltkrakan — "Den hette egentligen 'Valkyrian' och var byggd 1909" (läst 2026-09-21) */}
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt3)', marginBottom: 8 }}>Visste du att…</div>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>
                  Ångbåten i Vi på Saltkråkan hette egentligen Valkyrian. Den byggdes 1909 och skulle just huggas upp när filmteamet räddade den...
                </p>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.025)', padding: '12px 24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 11, color: 'var(--txt3)' }}>Avregistrera · Om nyhetsbrevet · svalla.se</div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 12 }}>
            Exempel — det faktiska innehållet skräddarsys till din verksamhet.
          </p>
        </section>

        {/* ── Redaktionell integritet ── */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(10,123,140,0.05), rgba(30,92,130,0.05))',
          border: '1px solid rgba(10,123,140,0.13)',
          borderRadius: 18,
          padding: '28px 32px',
          marginBottom: 60,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--sea)', margin: '0 0 12px' }}>
            Vår redaktionella integritet — det är därför din annons fungerar
          </h2>
          <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.75, margin: '0 0 14px', maxWidth: 680 }}>
            Svalla har aldrig haft programmatiska annonser. Vi har inga planer på det. Läsarnas förtroende är det enda vi egentligen säljer, och det tar år att bygga och sekunder att förstöra.
          </p>
          <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.75, margin: 0, maxWidth: 680 }}>
            Det innebär att kommersiella samarbeten alltid märks tydligt. Det innebär att vi aldrig tar emot betalning för att påverka redaktionell bedömning. Och det innebär att om ett samarbete inte funkar ihop med vår publik — tackar vi nej. Det är inte en risk för dig som väljer att arbeta med oss. Det är en garanti.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 28px' }}>Vanliga frågor</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              {
                q: 'Hur lång framförhållning behövs?',
                a: 'För nyhetsbrevssponsor: minst 10 arbetsdagar. För redaktionellt samarbete: 3–4 veckor. Destinationspartnerskap planeras kvartalsvis — boka gärna i januari–februari för sommarsäsongen.',
              },
              {
                q: 'Kan jag se texten innan den publiceras?',
                a: 'Alltid. Du och vi granskar texten gemensamt, och du kan begära justeringar av fakta. Tonen och redaktionella omdömet behåller vi — det är det som gör att det fungerar.',
              },
              {
                q: 'Vad mäter ni och hur rapporterar ni?',
                a: 'Utskick: klick per länk. Artikel och ösidor: sidvisningar och klick på dina länkar. Rapport levereras inom 7 dagar efter publicering.',
              },
              {
                q: 'Hur många besöker Svalla?',
                a: 'Svalla lanseras fullt inför sommaren 2027. Vi publicerar bara siffror vi kan visa underlag för — frågar du får du de aktuella, och varifrån de kommer.',
              },
              {
                q: 'Tar ni kategoriserade samarbeten — t.ex. bara ett värdshus per kvartal?',
                a: 'Vi undviker direkta konkurrenter i samma utskick: två värdshus på samma ö får aldrig plats samma torsdag. Ett värdshus och ett kajakföretag kan däremot samsas utan problem.',
              },
              {
                q: 'Fungerar annonsering på Svalla om vi inte är i Stockholms skärgård?',
                a: `Ja. ${fmt(OAR_UTANFOR)} av Svallas ${S.islands} öprofiler ligger utanför Stockholms skärgård — i Bohuslän, Göteborgs skärgård, på Gotland, Öland och längs Höga Kusten — och guiderna följer med.`,
              },
              {
                q: 'Kan man köpa enstaka artiklar utan abonnemang?',
                a: 'Ja — redaktionellt samarbete och nyhetsbrevssponsor säljs per styck. Destinationspartner är kvartalsbundet men kan sägas upp efter ett kvartal.',
              },
              {
                q: 'Stämmer uppgifterna om min verksamhet på Svalla?',
                a: 'Skicka en länk till er egen webbplats eller prislista till hej@svalla.se så rättar vi öppettider, säsong och kontakt. Det är gratis och kopplas aldrig till ett samarbete.',
              },
            ].map(({ q, a }, i) => (
              <div key={i} style={{
                background: 'var(--white)',
                borderRadius: 12,
                padding: '20px 22px',
                border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', marginBottom: 8 }}>{q}</div>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          textAlign: 'center',
          background: 'linear-gradient(155deg, #091e2e, #0d3f5a)',
          borderRadius: 22,
          padding: '48px 32px 44px',
          marginBottom: 24,
        }}>
          <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: '#fff', margin: '0 0 14px', lineHeight: 1.25 }}>
            Redo att synas där<br />skärgårdsresan planeras?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', margin: '0 0 32px', lineHeight: 1.65 }}>
            Berätta om din verksamhet och vad du vill uppnå. Vi svarar normalt inom 48 timmar.
          </p>
          <a
            href="mailto:hej@svalla.se?subject=Partnerförfrågan%20Svalla&body=Hej!%0A%0AJag%20är%20intresserad%20av%20ett%20samarbete%20med%20Svalla.%0A%0AVår%20verksamhet%3A%0A%0AVad%20vi%20vill%20uppnå%3A%0A%0A"
            style={{
              display: 'inline-block',
              padding: '15px 40px',
              background: '#fff',
              color: '#0d3f5a',
              borderRadius: 12,
              textDecoration: 'none',
              fontSize: 16,
              fontWeight: 800,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              letterSpacing: '-0.01em',
            }}
          >
            Maila hej@svalla.se →
          </a>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 16 }}>
            Vi svarar normalt inom 48 timmar på vardagar.
          </p>
        </section>

        {/* Fotnot */}
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0 }}>
            Vill du se hur Svallas utskick ser ut innan du bestämmer dig?{' '}
            <Link href="/nyhetsbrev" style={{ color: 'var(--sea)', textDecoration: 'underline' }}>
              Prenumerera gratis →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
