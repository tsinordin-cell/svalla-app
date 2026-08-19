'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  REVENUE_YEARLY_SEK,
  COSTS_YEARLY_SEK,
  BOOKING_GMV_YEARLY,
  SAAS_MRR_SEK,
  PARTNER_AVG_YEARLY_SEK,
  TIMELINE,
} from './config'

type Props = {
  users: number
  subs: number
  partners: number
  guides: number
  islands: number
  /** Antal företagssidor vi redan har (restaurants-tabellen) */
  places: number
  /** Unika sessioner senaste 30 dygnen */
  sessions: number
  /** Sidvisningar senaste 30 dygnen */
  pageviews: number
  /** true = siffran kommer live från analytics_events */
  isLiveTraffic: boolean
}

type ScenarioKey = 'bas' | 'utokad' | 'plattform'

const kr = (n: number) => Math.round(n).toLocaleString('sv-SE') + ' kr'
const msek = (n: number) => (n / 1_000_000).toFixed(2).replace('.', ',') + ' MSEK'

// ═══ Värderingsmodell ══════════════════════════════════════════════════════
// Multiplar hämtade från marknadsdata 2026, se källor längst ner på sidan.

function basRevenue(subs: number, partners: number, sessions: number, side: 'low' | 'high') {
  const partnerRev = partners * PARTNER_AVG_YEARLY_SEK
  const newsRev = subs * (side === 'low' ? 15 : 45) // SEK/prenumerant/år
  // Under 50 000 sessioner/mån släpps vi inte in hos Mediavine/Raptive och
  // är hänvisade till AdSense — därav den kraftigt lägre RPM:en.
  const qualified = sessions >= 50_000
  const rpm = qualified ? (side === 'low' ? 30 : 60) : (side === 'low' ? 8 : 20)
  const displayRev = ((sessions * 2) / 1000) * rpm * 12
  return { partnerRev, newsRev, displayRev, rpm, qualified, total: partnerRev + newsRev + displayRev }
}

function saasMultiple(arr: number, side: 'low' | 'high') {
  if (arr < 1_000_000) return side === 'low' ? 2.5 : 4.0
  if (arr < 5_000_000) return side === 'low' ? 4.0 : 6.0
  return side === 'low' ? 5.0 : 8.0
}

function valuation(scenario: ScenarioKey, subs: number, partners: number, sessions: number, side: 'low' | 'high') {
  const base = basRevenue(subs, partners, sessions, side)
  const profit = Math.max(0, base.total - COSTS_YEARLY_SEK)

  if (scenario === 'bas') {
    return profit * (side === 'low' ? 2.3 : 3.5)
  }
  if (scenario === 'utokad') {
    const netRev = BOOKING_GMV_YEARLY * 0.12
    return (netRev + base.total) * (side === 'low' ? 2.0 : 4.0)
  }
  const arr = SAAS_MRR_SEK * 12
  return arr * saasMultiple(arr, side) + profit * 2.3
}

// ═══ Scenariodefinitioner ══════════════════════════════════════════════════

const SCENARIOS: Record<
  ScenarioKey,
  {
    label: string
    sub: string
    range: string
    color: string
    tagline: string
    multiple: string
    basis: string
    model: string
    ceiling: string
  }
> = {
  bas: {
    label: 'BAS',
    sub: 'Content-sajt',
    range: '3–5 MSEK',
    color: '#0a7b3c',
    tagline: 'Vad Svalla är idag. Företag betalar för att synas.',
    multiple: '2,3–3,5x årsvinst (28–42x månadsvinst). Premium med stark e-postlista: upp till 5x.',
    basis: 'Värderas på VINST — inte omsättning.',
    model:
      'Partnerlistningar 2 000–8 000 kr/år, premiumpartner 12 000–25 000 kr/år, nyhetsbrevssponsring, display och affiliate.',
    ceiling: 'Realistiskt tak 5 MSEK. Absolut max ~8 vid perfekt exekvering.',
  },
  utokad: {
    label: 'UTÖKAD',
    sub: 'Marknadsplats',
    range: '10–20 MSEK',
    color: '#1d4ed8',
    tagline: 'Svalla förmedlar bokningar och tar en andel.',
    multiple: '2,0–4,0x OMSÄTTNING. Take rate 10–15% är branschnorm (Airbnb ~9%).',
    basis: 'Värderas på omsättning — därför högre värde per intjänad krona.',
    model:
      'Boende, båtcharter, guidade turer, teambuilding och konferens. Kräver betalflöde, leverantörsavtal, avbokningshantering och support.',
    ceiling: 'Kräver 30–50 MSEK i förmedlad volym per år.',
  },
  plattform: {
    label: 'PLATTFORM',
    sub: 'Vertical SaaS',
    range: '15–30 MSEK',
    color: '#7c3aed',
    tagline: 'Företagen betalar för ett verktyg de använder varje vecka.',
    multiple: '4,0–8,0x ARR för vertikal B2B-SaaS. Under 1 MSEK ARR: 2,5–4x.',
    basis: 'Värderas på återkommande intäkt — högst multipel av alla tre modeller.',
    model:
      'Bokningskalender, automatisk synk av öppettider och priser mot Svalla + Google, gästkommunikation, väder- och färjekopplade avbokningar, Thorkel som kundtjänst åt deras gäster.',
    ceiling: 'Kräver retention över 90% och låg ägarberoende för att nå toppmultipeln.',
  },
}

// ═══ Mål per scenario ══════════════════════════════════════════════════════

type Target = { label: string; value: number | null; target: number; suffix?: string }

function targetsFor(
  scenario: ScenarioKey,
  d: Props,
): Target[] {
  if (scenario === 'bas') {
    return [
      { label: 'Sessioner per månad', value: d.sessions, target: 150_000 },
      { label: 'E-postprenumeranter', value: d.subs, target: 10_000 },
      { label: 'Betalande partners', value: d.partners, target: 125 },
      { label: 'Registrerade användare', value: d.users, target: 25_000 },
      { label: 'Årlig vinst', value: Math.max(0, REVENUE_YEARLY_SEK - COSTS_YEARLY_SEK), target: 1_250_000, suffix: ' kr' },
    ]
  }
  if (scenario === 'utokad') {
    return [
      { label: 'Förmedlad bokningsvolym per år', value: BOOKING_GMV_YEARLY, target: 40_000_000, suffix: ' kr' },
      { label: 'Nettoomsättning (12% take rate)', value: BOOKING_GMV_YEARLY * 0.12, target: 4_800_000, suffix: ' kr' },
      { label: 'Anslutna leverantörer', value: d.partners, target: 200 },
      { label: 'Andel bokningar utanför juli–aug', value: null, target: 40, suffix: ' %' },
    ]
  }
  return [
    { label: 'Företag på abonnemang', value: d.partners, target: 400 },
    { label: 'Månatlig abonnemangsintäkt (MRR)', value: SAAS_MRR_SEK, target: 400_000, suffix: ' kr' },
    { label: 'ARR', value: SAAS_MRR_SEK * 12, target: 4_800_000, suffix: ' kr' },
    { label: 'Årlig churn (lägre är bättre)', value: null, target: 10, suffix: ' %' },
  ]
}

// ═══ Innehåll ══════════════════════════════════════════════════════════════

const LAYERS = [
  {
    n: '5',
    title: 'Nätverkslagret — det som inte går att kopiera',
    body:
      'Användare som markerar besökta öar, skriver i forumet, rättar fel. Datan förbättrar sig själv, gratis. Det enda lagret en köpare omöjligt kan replikera.',
  },
  {
    n: '4',
    title: 'Transaktionslagret — värdefångst',
    body:
      'Där efterfrågan och utbud möts går det att ta betalt för själva mötet. Kräver att lager 2 och 3 sitter först.',
  },
  {
    n: '3',
    title: 'Utbudslagret — företagen',
    body:
      '"Gör anspråk" är ingången. Gratis profil → verifierad profil → betalt verktyg. Ju fler företag som använder Svalla dagligen, desto svårare att ersätta.',
  },
  {
    n: '2',
    title: 'Distributionslagret — efterfrågan',
    body: 'SEO, e-postlistan, Thorkel. Bringar resenärerna. Utan detta är datan värdelös.',
  },
  {
    n: '1',
    title: 'Datalagret — grunden',
    body:
      'Verifierade priser, öppettider, färjeförbindelser, badplatser och dagskostnader för 120+ öar. Ingen annan har detta i strukturerad form. verify-claims är inte en bromskloss — det är det som gör datan licensierbar.',
  },
]

const MOVES = [
  {
    n: 1,
    title: 'Vänd datan utåt — bli infrastruktur, inte bara sajt',
    body:
      'AI-assistenter äter söktrafik. Försvaret och offensiven är samma sak: bli källan de citerar. Strukturerad, verifierad, licensierbar data via API. llms.txt finns redan — nästa steg är ett datalager som färjebolag, turistorganisationer och AI-tjänster betalar för. Högsta marginal och högsta multipel av alla intäkter.',
  },
  {
    n: 2,
    title: 'Lös säsongsproblemet med företagsmarknaden',
    body:
      'Skärgården har 69 000 besökare på midsommardagen och 3 500 en dag i januari. Den kurvan sänker värderingen — köpare rabatterar säsongsberoende hårt. Konferens och teambuilding sker vår och höst, har företagsbudgetar och är mindre priskänsligt. /teambuilding finns redan. Det är den mest undervärderade sidan vi har.',
  },
  {
    n: 3,
    title: 'Äg planeringsfönstret, inte bara resan',
    body:
      'Beslutet fattas i januari–mars. Den som äger planeringen äger bokningen. E-postlistan och Thorkel fångar avsikt månader i förväg — och avsiktsdatan ("300 personer planerar Sandhamn i juli") är i sig säljbar till företagen.',
  },
  {
    n: 4,
    title: 'Gör "gör anspråk" till en trappa, inte en knapp',
    body:
      'Gratis anspråk → verifierad profil → statistik om egna besökare → betalt verktyg. Varje steg är litet, varje steg ökar beroendet. Detta är vägen från BAS till PLATTFORM, och den kostar nästan ingenting att bygga.',
  },
  {
    n: 5,
    title: 'Välj EN transaktion att äga helt',
    body:
      'Inte alla bokningar. En, med högt ordervärde och dålig befintlig upplevelse. Båtcharter och konferens/teambuilding är starkaste kandidaterna: fragmenterat utbud, höga belopp, usel bokningsupplevelse idag.',
  },
  {
    n: 6,
    title: 'Internationalisera när svensk trafik planat ut',
    body:
      'Tyskland är största inkommande marknaden för svensk naturturism. Engelska och tyska versioner dubblar adresserbar trafik, och internationell trafik betalar högre RPM. Gör detta efter att svenska modellen bevisats — inte innan.',
  },
  {
    n: 7,
    title: 'Skapa budgivning, inte ett samtal',
    body:
      'Strategisk premium uppstår när två köpare vill ha samma sak. Det kräver att vi syns: press, branschnärvaro, att vara det självklara namnet. En köpare betalar finansiellt värde. Två köpare betalar strategiskt värde.',
  },
]

const PHASES = [
  { phase: '1. Bevisa efterfrågan', time: '0–12 mån', goal: 'Första betalande partnern. Listan till 3 000.', proof: 'Någon betalar frivilligt' },
  { phase: '2. Lås utbudet', time: '12–24 mån', goal: '100+ företag med anspråkad profil. Verktyget i beta.', proof: 'Företag loggar in varje vecka' },
  { phase: '3. Fånga värdet', time: '24–36 mån', goal: 'Transaktion eller abonnemang i skala', proof: 'ARR eller GMV växer månad över månad' },
  { phase: '4. Sälj', time: '36–48 mån', goal: 'Exit', proof: '24 mån ren tillväxtdata i GSC' },
]

const RISKS = [
  { risk: 'Säsongsberoende sänker multipeln', fix: 'Företagsmarknaden (konferens/teambuilding), planeringstrafik jan–mars, internationella gäster med annan säsong.' },
  { risk: 'Google-algoritmskifte eller AI-svar äter trafiken', fix: 'E-postlistan gör oss algoritmoberoende. Att vara källan AI citerar gör skiftet till en fördel.' },
  { risk: 'Konkurrent kopierar konceptet', fix: 'Djupdata, Thorkel och användargenererat innehåll är tidsförsprång — inte kod som kan klonas.' },
  { risk: 'Ingen betalande partner', fix: 'Då faller hela värderingen till trafik × RPM, den lägsta multipel som finns. Detta är den enskilt största risken idag.' },
  { risk: 'Vi tappar tempo', fix: 'Minst en guide och en förbättring varje vecka, mätbart.' },
]

const BUYERS = [
  { who: 'Svensk/nordisk sajtportföljinvesterare', why: 'Kassaflöde och tillväxtkurva', pays: 'Vinst × multipel, rent finansiellt' },
  { who: 'Befintligt rese- eller båtlivsmedieföretag', why: 'Bygger inte om från noll', pays: 'Trafik, varumärke, redaktionell position' },
  { who: 'Större charter- eller bokningsaktör', why: 'Vill ha efterfrågesidan', pays: 'Bokningsflöde och leverantörsrelationer' },
  { who: 'Regional destinationsorganisation', why: 'Digital närvaro de saknar', pays: 'Datan och den redaktionella täckningen' },
  { who: 'Privatperson via mäklare', why: 'Söker lönsam nischtillgång', pays: 'Dokumenterad, låg-underhålls-vinst' },
]

const SOURCES = [
  { t: 'Content-multiplar 28–42x månadsvinst', u: 'https://website-worth.org/website-profit-multiples-2026/' },
  { t: 'Marknadsplatsmultiplar och take rate', u: 'https://flippa.com/blog/marketplaces-valuation-multiples-what-do-you-need-to-evaluate/' },
  { t: 'Vertikal SaaS 4–8x ARR', u: 'https://windsordrake.com/saas-valuation-multiples/' },
  { t: 'E-postprenumerantvärde', u: 'https://bsandco.us/blog-post/subscriber-value-benchmarks' },
  { t: 'Display-RPM per nisch', u: 'https://toolsignal.site/articles/blog-display-ad-rpm-by-niche-2026' },
  { t: 'Svensk B2B-jämförelse: 1 995 kr/år', u: 'https://turistkanalen.se/annonsorer.php?kid=24875&bid=1&tm=1' },
  { t: '4 miljoner besökare/år i skärgården', u: 'https://www.dagensps.se/weekend/bat-sjoliv/fler-an-4-miljoner-besokte-stocholms-skargard-2021/' },
]

// ═══ Småkomponenter ════════════════════════════════════════════════════════

function Bar({ value, target, color, suffix }: { value: number | null; target: number; color: string; suffix?: string }) {
  if (value === null) {
    return (
      <div style={{ marginTop: 6 }}>
        <div style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic' }}>
          Mäts inte än — mål {target.toLocaleString('sv-SE')}{suffix ?? ''}
        </div>
        <div style={{ height: 6, background: 'var(--surface-3)', borderRadius: 4, marginTop: 4 }} />
      </div>
    )
  }
  const pct = target === 0 ? 0 : Math.min((value / target) * 100, 100)
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--txt3)', marginBottom: 4 }}>
        <span>{Math.round(value).toLocaleString('sv-SE')}{suffix ?? ''}</span>
        <span>mål {target.toLocaleString('sv-SE')}{suffix ?? ''}</span>
      </div>
      <div style={{ height: 6, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: color, borderRadius: 4, transition: 'width .5s ease' }} />
      </div>
      <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 3 }}>{pct.toFixed(1)}%</div>
    </div>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 1, margin: '36px 0 12px' }}>
      {children}
    </h2>
  )
}

function Card({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <div
      style={{
        background: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderLeft: accent ? `4px solid ${accent}` : '1px solid var(--surface-3)',
        borderRadius: 10,
        padding: '16px 18px',
      }}
    >
      {children}
    </div>
  )
}

// ═══ Sidan ═════════════════════════════════════════════════════════════════

export default function MaletClient(d: Props) {
  const [scenario, setScenario] = useState<ScenarioKey>('bas')
  const s = SCENARIOS[scenario]

  const low = valuation(scenario, d.subs, d.partners, d.sessions, 'low')
  const high = valuation(scenario, d.subs, d.partners, d.sessions, 'high')

  const revLow = basRevenue(d.subs, d.partners, d.sessions, 'low')
  const revHigh = basRevenue(d.subs, d.partners, d.sessions, 'high')
  const profitLow = revLow.total - COSTS_YEARLY_SEK
  const profitHigh = revHigh.total - COSTS_YEARLY_SEK

  const headline =
    high < 500_000
      ? 'Det är lågt. Det är rätt. Vi är tidigt.'
      : high < 3_000_000
        ? 'Vi har bevisat något. Nu skalar vi.'
        : 'Nu är det ett företag. Håll tempot.'

  const today = new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })

  const claudeContext = `SVALLA.SE — EXITKONTEXT (${today})

STACK: Next.js 15 + Supabase + Vercel. Repo: tsinordin-cell/svalla-app.
Branch-skydd på main — all kod via PR. Claude kör aldrig git själv.

VALT SCENARIO: ${s.label} — ${s.sub} (${s.range})
Uppskattat värde idag: ${msek(low)}–${msek(high)}

NULÄGE:
• Registrerade användare: ${d.users}
• E-postprenumeranter: ${d.subs}
• Betalande partners: ${d.partners}
• Sessioner/mån: ${d.sessions.toLocaleString('sv-SE')} · Sidvisningar/mån: ${d.pageviews.toLocaleString('sv-SE')}
• Guider: ${d.guides} · Öprofiler: ${d.islands} · Företagssidor: ${d.places}
• Faktisk årsintäkt: ${kr(REVENUE_YEARLY_SEK)}

DE TRE SCENARIERNA:
BAS (content)      3–5 MSEK   — 2,3–3,5x årsvinst
UTÖKAD (marknad)  10–20 MSEK  — 2,0–4,0x omsättning
PLATTFORM (SaaS)  15–30 MSEK  — 4,0–8,0x ARR

TILLGÅNGEN ÄR INTE SAJTEN. Den är tre saker som förstärker varandra:
den verifierade datan, kanalen till resenärerna, relationen till företagen.
En köpare kan bygga en sajt. Inte de tre på under två år.

PRIORITERINGSORDNING:
1. Första betalande partnern — allt annat är teori tills någon betalar
2. E-postlistan — gör oss algoritmoberoende
3. Företagsmarknaden (konferens/teambuilding) — löser säsongsproblemet
4. SEO-innehåll som rankar
5. Öprofildjup och Thorkel — moaten

REGLER SOM ALDRIG BRYTS:
• verify-claims: klockslag/priser/avstånd kräver <!-- KÄLLA: URL (datum) -->
• Inga grundarnamn någonstans på sajten
• Endast info@svalla.se som kontaktadress
• Push sker via PR — Claude kör inte git-kommandon
• Aldrig påståenden som inte är verifierade`

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', padding: '20px 16px 80px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        <Link
          href="/admin"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--txt3)', textDecoration: 'none', marginBottom: 20 }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5.5L8.5 12L15 18.5" />
          </svg>
          Tillbaka till admin
        </Link>

        {/* ── HEADER ── */}
        <div style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)', borderRadius: 14, padding: 24, color: '#fff', marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: 1.5 }}>
            Internt — konfidentiellt
          </div>
          <h1 style={{ fontSize: 27, fontWeight: 800, margin: '6px 0 2px', letterSpacing: '-.5px' }}>Vägen till miljonen</h1>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.45)', marginBottom: 18 }}>Uppdaterad {today}</div>

          <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.55)', textTransform: 'uppercase', letterSpacing: 1 }}>
            Uppskattad exitvärdering — scenario {s.label}
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-1px', margin: '2px 0 6px' }}>
            {msek(low)}–{msek(high)}
          </div>
          <div style={{ fontSize: 14, color: '#ffd966' }}>{headline}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 10, lineHeight: 1.6 }}>
            {d.sessions.toLocaleString('sv-SE')} sessioner/mån · {d.pageviews.toLocaleString('sv-SE')} sidvisningar/mån ·{' '}
            {d.subs} prenumeranter · {d.partners} betalande partners<br />
            {d.users} användare · {d.guides} guider · {d.islands} öprofiler · {d.places} företagssidor
            {d.isLiveTraffic && (
              <><br /><span style={{ color: 'rgba(255,255,255,.3)' }}>
                Trafik hämtas live ur analytics_events (senaste 30 dygnen). Kräver cookie-consent,
                så verklig trafik är högre — jämför med Search Console.
              </span></>
            )}
          </div>
        </div>

        {/* ── SCENARIOVÄXEL ── */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {(Object.keys(SCENARIOS) as ScenarioKey[]).map(k => {
            const sc = SCENARIOS[k]
            const active = k === scenario
            return (
              <button
                key={k}
                onClick={() => setScenario(k)}
                style={{
                  flex: 1,
                  cursor: 'pointer',
                  background: active ? sc.color : 'var(--surface-1)',
                  color: active ? '#fff' : 'var(--txt2)',
                  border: `1px solid ${active ? sc.color : 'var(--surface-3)'}`,
                  borderRadius: 10,
                  padding: '10px 6px',
                  fontFamily: 'inherit',
                  transition: 'all .15s ease',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: .5 }}>{sc.label}</div>
                <div style={{ fontSize: 10, opacity: .75, marginTop: 2 }}>{sc.sub}</div>
                <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4 }}>{sc.range}</div>
              </button>
            )
          })}
        </div>

        <Card accent={s.color}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>{s.tagline}</div>
          <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.7 }}>
            <div style={{ marginBottom: 6 }}><strong>Multipel:</strong> {s.multiple}</div>
            <div style={{ marginBottom: 6 }}><strong>Grund:</strong> {s.basis}</div>
            <div style={{ marginBottom: 6 }}><strong>Intäktsmodell:</strong> {s.model}</div>
            <div style={{ color: 'var(--txt3)' }}>{s.ceiling}</div>
          </div>
        </Card>

        {/* ── MÅL ── */}
        <H2>Mål för {s.range}</H2>
        <Card accent={s.color}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {targetsFor(scenario, d).map(t => (
              <div key={t.label}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)' }}>{t.label}</div>
                <Bar value={t.value} target={t.target} color={s.color} suffix={t.suffix} />
              </div>
            ))}
          </div>
        </Card>

        {/* ── BREAKDOWN ── */}
        <H2>Så räknas det</H2>
        <Card>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ color: 'var(--txt3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: .5 }}>
                  <th style={{ textAlign: 'left', padding: '0 0 8px' }}>Post</th>
                  <th style={{ textAlign: 'right', padding: '0 0 8px' }}>Lågt</th>
                  <th style={{ textAlign: 'right', padding: '0 0 8px' }}>Högt</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--txt2)' }}>
                <tr><td style={{ padding: '6px 0' }}>Partnerintäkt ({d.partners} × {kr(PARTNER_AVG_YEARLY_SEK)})</td><td style={{ textAlign: 'right' }}>{kr(revLow.partnerRev)}</td><td style={{ textAlign: 'right' }}>{kr(revHigh.partnerRev)}</td></tr>
                <tr><td style={{ padding: '6px 0' }}>Nyhetsbrev ({d.subs} × 15–45 kr/år)</td><td style={{ textAlign: 'right' }}>{kr(revLow.newsRev)}</td><td style={{ textAlign: 'right' }}>{kr(revHigh.newsRev)}</td></tr>
                <tr><td style={{ padding: '6px 0' }}>Annons/affiliate (RPM {revLow.rpm}–{revHigh.rpm} kr{revLow.qualified ? '' : ', AdSense-nivå'})</td><td style={{ textAlign: 'right' }}>{kr(revLow.displayRev)}</td><td style={{ textAlign: 'right' }}>{kr(revHigh.displayRev)}</td></tr>
                {scenario === 'utokad' && (
                  <tr><td style={{ padding: '6px 0' }}>Bokningsintäkt (GMV × 12%)</td><td style={{ textAlign: 'right' }}>{kr(BOOKING_GMV_YEARLY * .12)}</td><td style={{ textAlign: 'right' }}>{kr(BOOKING_GMV_YEARLY * .12)}</td></tr>
                )}
                {scenario === 'plattform' && (
                  <tr><td style={{ padding: '6px 0' }}>ARR (MRR × 12)</td><td style={{ textAlign: 'right' }}>{kr(SAAS_MRR_SEK * 12)}</td><td style={{ textAlign: 'right' }}>{kr(SAAS_MRR_SEK * 12)}</td></tr>
                )}
                <tr style={{ color: 'var(--txt3)' }}><td style={{ padding: '6px 0' }}>Minus kostnader</td><td style={{ textAlign: 'right' }}>−{kr(COSTS_YEARLY_SEK)}</td><td style={{ textAlign: 'right' }}>−{kr(COSTS_YEARLY_SEK)}</td></tr>
                <tr style={{ borderTop: '1px solid var(--surface-3)', fontWeight: 700, color: 'var(--txt)' }}>
                  <td style={{ padding: '8px 0' }}>Årlig vinst (modell)</td>
                  <td style={{ textAlign: 'right' }}>{kr(profitLow)}</td>
                  <td style={{ textAlign: 'right' }}>{kr(profitHigh)}</td>
                </tr>
                <tr style={{ fontWeight: 800, color: s.color, fontSize: 14 }}>
                  <td style={{ padding: '8px 0' }}>Exitvärde</td>
                  <td style={{ textAlign: 'right' }}>{kr(low)}</td>
                  <td style={{ textAlign: 'right' }}>{kr(high)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic', marginTop: 12, lineHeight: 1.6 }}>
            Multiplar sätts på vinst för content-sajter, men på omsättning för marknadsplatser och SaaS.
            Samma intäktskrona är därför värd 2–3x mer som abonnemang än som annonsplats.
            {REVENUE_YEARLY_SEK > 0 && <> Faktisk intäkt senaste 12 mån: <strong>{kr(REVENUE_YEARLY_SEK)}</strong>.</>}
          </div>
        </Card>

        {/* ── ANNONSTRÖSKLAR ── */}
        <H2>Annonsintäkt — var vi står mot trösklarna</H2>
        <Card accent={revLow.qualified ? '#0a7b3c' : '#d97706'}>
          <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.7, marginBottom: 14 }}>
            Annonsnätverken har hårda inträdeskrav. Under dem är vi hänvisade till AdSense,
            där svensk trafik ger ungefär en fjärdedel av vad ett premiumnätverk betalar.
            Vid nuvarande trafik ger annonser <strong>{kr(revLow.displayRev / 12)}–{kr(revHigh.displayRev / 12)}</strong> i månaden.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)' }}>Mediavine — 50 000 sessioner/mån</div>
              <Bar value={d.sessions} target={50_000} color={revLow.qualified ? '#0a7b3c' : '#d97706'} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)' }}>Raptive — 100 000 sidvisningar/mån</div>
              <Bar value={d.pageviews} target={100_000} color={revLow.qualified ? '#0a7b3c' : '#d97706'} />
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic', marginTop: 14, lineHeight: 1.65 }}>
            Annonsintäkt är den enklaste intäkten att starta och den lägst värderade vid en exit —
            den kräver ingen försäljning, men den skalar bara med trafik och ger lägst multipel.
            En betalande partner är strategiskt värd mer än motsvarande annonskronor.
          </div>
        </Card>

        {/* ── DEN ULTIMATA VÄGEN ── */}
        <div style={{ marginTop: 40, background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 14, padding: '24px 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: 1 }}>
            Strategisk kärna
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0c4a6e', margin: '6px 0 12px' }}>
            Den ultimata vägen
          </h2>
          <p style={{ fontSize: 14, color: '#0c4a6e', lineHeight: 1.75, margin: '0 0 24px', fontWeight: 500 }}>
            Sajten är inte tillgången. Tillgången är tre saker som förstärker varandra: <strong>den verifierade
            datan</strong>, <strong>kanalen till resenärerna</strong> och <strong>relationen till företagen</strong>.
            En köpare kan bygga en sajt. Hen kan inte bygga de tre på under två år. Varje beslut ska göra minst en
            av dem starkare.
          </p>

          <div style={{ fontSize: 12, fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            De fem lagren
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 26 }}>
            {LAYERS.map(l => (
              <div key={l.n} style={{ background: '#fff', border: '1px solid #bae6fd', borderRadius: 8, padding: '12px 14px', display: 'flex', gap: 12 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#7dd3fc', lineHeight: 1.2, minWidth: 22 }}>{l.n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0c4a6e' }}>{l.title}</div>
                  <div style={{ fontSize: 13, color: '#164e63', lineHeight: 1.6, marginTop: 3 }}>{l.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            Sju drag som höjer taket
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26 }}>
            {MOVES.map(m => (
              <div key={m.n} style={{ background: '#fff', border: '1px solid #bae6fd', borderRadius: 8, padding: '14px 16px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0c4a6e' }}>{m.n}. {m.title}</div>
                <div style={{ fontSize: 13, color: '#164e63', lineHeight: 1.7, marginTop: 5 }}>{m.body}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            Faserna
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PHASES.map(p => (
              <div key={p.phase} style={{ background: '#fff', border: '1px solid #bae6fd', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0c4a6e' }}>{p.phase}</div>
                  <div style={{ fontSize: 11, color: '#0369a1', whiteSpace: 'nowrap' }}>{p.time}</div>
                </div>
                <div style={{ fontSize: 13, color: '#164e63', marginTop: 4 }}>{p.goal}</div>
                <div style={{ fontSize: 12, color: '#0369a1', marginTop: 3, fontStyle: 'italic' }}>Bevis att gå vidare: {p.proof}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: '#0c4a6e', color: '#e0f2fe', borderRadius: 8, padding: '14px 16px', fontSize: 13, lineHeight: 1.7 }}>
            <strong>Timing:</strong> sälj inte vid högsta intäkt — sälj vid brantaste kurvan, med 12–24 månaders
            ren dokumenterad tillväxt bakom oss. Köpare betalar för framtiden de kan se, inte för historiken.
          </div>
        </div>

        {/* ── RISKER ── */}
        <H2>Risker och motmedel</H2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {RISKS.map(r => (
            <Card key={r.risk} accent="#dc2626">
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{r.risk}</div>
              <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.65, marginTop: 4 }}>{r.fix}</div>
            </Card>
          ))}
        </div>

        {/* ── KÖPARE ── */}
        <H2>Sannolika köpare</H2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {BUYERS.map(b => (
            <Card key={b.who}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{b.who}</div>
              <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, marginTop: 4 }}>
                <strong>Varför:</strong> {b.why}<br />
                <strong>Betalar för:</strong> {b.pays}
              </div>
            </Card>
          ))}
          <div style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic', lineHeight: 1.6, padding: '4px 2px' }}>
            Visit Sweden är statligt finansierat och förvärvar inte privata sajter. Bonnier och Schibsted opererar
            i 50+ MSEK-klassen. Räkna inte med dem.
          </div>
        </div>

        {/* ── TIDSLINJE ── */}
        <H2>Tidslinje</H2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TIMELINE.map(t => (
            <Card key={t.period} accent="var(--sea)">
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--sea)', letterSpacing: .5 }}>{t.period}</div>
              <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.65, marginTop: 4 }}>{t.text}</div>
            </Card>
          ))}
          <div style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic', padding: '4px 2px' }}>
            Lägg till en post varje kvartal i src/app/admin/malet/config.ts
          </div>
        </div>

        {/* ── CLAUDE-KONTEXT ── */}
        <H2>Kontext för Claude</H2>
        <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 12, padding: '18px 18px' }}>
          <div style={{ fontSize: 12, color: '#0369a1', marginBottom: 10 }}>
            Kopiera in detta i början av varje strategisk session. Siffrorna uppdateras automatiskt.
          </div>
          <pre style={{ fontSize: 12, color: '#0c4a6e', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace' }}>
            {claudeContext}
          </pre>
        </div>

        {/* ── KÄLLOR ── */}
        <H2>Källor för siffrorna</H2>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {SOURCES.map(src => (
              <a
                key={src.u}
                href={src.u}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13, color: 'var(--sea)', textDecoration: 'none' }}
              >
                {src.t} ↗
              </a>
            ))}
          </div>
        </Card>

      </div>
    </div>
  )
}
