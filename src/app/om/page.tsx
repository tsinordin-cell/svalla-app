/**
 * /om: vad Svalla är, varför vi bygger det, allt som finns på sajten och
 * varför man kan lita på uppgifterna. Omskriven 2026-10-07 (godkänd av Max).
 *
 * Siffrorna räknas fram ur datan vid varje bygge. Bara funktioner som är
 * påslagna nämns: loppis, klubbar, evenemang och Pro är gömda och står inte här.
 *
 * E-E-A-T-byggande sida för AI-erans SEO. Schema.org Person för Thorkel
 * (transparent: AI-karaktär), Organization referens från layout.tsx,
 * "Hur vi samlar data"-sektion för transparency.
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'
import { KALLOR_PER_O } from '@/app/o/kallor.generated'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { PUBLICERADE_GUIDER } from '@/app/guider/guides-data'

/**
 * Källsiffrorna räknas fram ur kallor.generated.ts vid varje bygge, så de kan
 * aldrig bli inaktuella. Exitplanen task 6 (2026-09-30): vårt källsystem ska
 * synas utanför koden. "Myndighet" följer generera-kallor.mjs: myndigheter,
 * kommuner, regioner och de regionägda trafikbolagen.
 */
function kallsiffror() {
  const listor = Object.values(KALLOR_PER_O)
  const totalt = listor.reduce((n, l) => n + l.length, 0)
  const myndighet = listor.reduce((n, l) => n + l.filter(k => k.myndighet).length, 0)
  const oarMedKalla = listor.filter(l => l.length > 0).length
  return {
    totalt,
    myndighetsandel: totalt > 0 ? Math.round((myndighet / totalt) * 100) : 0,
    oarMedKalla,
    oarTotalt: ALL_ISLANDS.length,
  }
}

export const metadata: Metadata = {
  title: { absolute: 'Om Svalla: Sveriges samlade sida för skärgården' },
  description: 'Svalla samlar öarna, båtarna, krogarna, naturhamnarna och hantverkarna i skärgården på ett ställe, med en källa på varje uppgift. Läs vad Svalla är och varför vi bygger det.',
  alternates: { canonical: 'https://svalla.se/om' },
  openGraph: {
    title: 'Om Svalla',
    description: 'Sveriges samlade sida för skärgården, med en källa på varje uppgift.',
    url: 'https://svalla.se/om',
  },
}

// Schema.org Person för Thorkel — transparent markerad som AI-karaktär.
// Detta är ärligt och tillåtet av Google så länge det inte hävdar Thorkel är
// en verklig person. disambiguatingDescription gör det tydligt.
const THORKEL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://svalla.se/om#thorkel',
  name: 'Thorkel',
  alternateName: 'Thorkel skeppare',
  jobTitle: 'AI-skärgårdsguide',
  description: 'Thorkel är Svallas AI-baserade skärgårdsguide, en digital skeppare som hjälper användare planera turer, hitta öar och navigera kollektivtrafik i den svenska skärgården.',
  disambiguatingDescription: 'Fiktiv AI-karaktär. Inte en verklig person.',
  image: 'https://svalla.se/thorkel-avatar.svg',
  url: 'https://svalla.se/planera-tur',
  knowsAbout: [
    'Stockholms skärgård',
    'Bohuslän',
    'Skärgårdsbåtar',
    'Naturhamnar',
    'Allemansrätten på sjön',
    'Skärgårdsmat och restauranger',
  ],
  worksFor: { '@id': 'https://svalla.se/#organization' },
}

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Svalla', item: 'https://svalla.se' },
    { '@type': 'ListItem', position: 2, name: 'Om Svalla', item: 'https://svalla.se/om' },
  ],
}

type Lank = { href: string; namn: string; text: string }
type Grupp = { rubrik: string; lankar: Lank[] }

function grupper(oar: number, guider: number): Grupp[] {
  return [
    {
      rubrik: 'Hitta och planera',
      lankar: [
        { href: '/oar', namn: 'Öarna', text: `${oar} öar med båten dit, mat, boende, bad och regler` },
        { href: '/planera', namn: 'Reseplaneraren', text: 'Planera turen eller hela dagen på en ö' },
        { href: '/planera-tur', namn: 'Thorkel', text: 'AI-skepparen som svarar och planerar åt dig' },
        { href: '/upptack', namn: 'Karta och platser', text: 'Krogar, hamnar, kiosker och bastur' },
        { href: '/farjor', namn: 'Färjetider', text: 'Båtarna ut till öarna' },
        { href: '/skargardsdatum', namn: 'Skärgårdens datum', text: 'Tidtabellsbyten och premiärer' },
      ],
    },
    {
      rubrik: 'Läsa och lära',
      lankar: [
        { href: '/guider', namn: 'Guider', text: `${guider} praktiska guider` },
        { href: '/blogg', namn: 'Artiklar', text: 'Reportage och tips från skärgården' },
        { href: '/jamfor', namn: 'Jämför öar', text: 'Vilken ö passar dig?' },
        { href: '/oppet-nu', namn: 'Öppet nu', text: 'Vad som har öppet just nu' },
      ],
    },
    {
      rubrik: 'För båtfolket',
      lankar: [
        { href: '/naturhamnar', namn: 'Naturhamnar', text: 'Var du kan lägga till för natten' },
        { href: '/hamnar-och-bryggor', namn: 'Hamnar och bryggor', text: 'Gästhamnar och bryggor' },
        { href: '/segelrutter', namn: 'Segelrutter', text: 'Rutter att segla' },
        { href: '/logga', namn: 'Logga turer', text: 'Spara dina turer och samla öarna i Min skärgård' },
      ],
    },
    {
      rubrik: 'Gemenskapen',
      lankar: [
        { href: '/forum', namn: 'Forum per ö', text: 'Fråga folk som är där' },
        { href: '/feed', namn: 'Flödet', text: 'Turer och bilder från andra' },
        { href: '/bingo', namn: 'Skärgårdsbingo', text: 'För den som vill ha en lek på båten' },
      ],
    },
    {
      rubrik: 'För dem som bor och verkar där',
      lankar: [
        { href: '/o/moja/hantverkare', namn: 'Hantverkare per ö', text: 'Vem som tar uppdrag ute på öarna' },
        { href: '/vintertidtabeller', namn: 'Vintertidtabeller', text: 'När båtarna går efter säsongen' },
        { href: '/partner-sida', namn: 'För verksamheter', text: 'Ta över er sida, utan kostnad' },
        { href: '/data/oar.json', namn: 'Öppen data', text: 'Källorna per ö som fri fil (CC BY 4.0)' },
      ],
    },
  ]
}

export default function OmPage() {
  const k = kallsiffror()
  const guider = PUBLICERADE_GUIDER.length
  const kort: React.CSSProperties = {
    marginTop: 24, background: 'var(--white)', borderRadius: 16, padding: '32px 28px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(10,123,140,0.06)',
    lineHeight: 1.75, color: 'var(--txt2)', fontSize: 15,
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(THORKEL_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />

      <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

        {/* Hero */}
        <div style={{
          background: 'var(--grad-sea-hero, linear-gradient(160deg, #1e5c82 0%, #0d6e6e 100%))',
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 40px)',
          paddingBottom: 40,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px', position: 'relative' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
              <SvallaLogo height={26} color="#ffffff" />
            </Link>
            <h1 style={{
              fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 800, color: '#fff',
              margin: '0 0 10px', lineHeight: 1.2,
            }}>
              Om Svalla
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, lineHeight: 1.6, margin: 0, maxWidth: 600 }}>
              Sveriges samlade sida för skärgården.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '12px 20px 0' }}>

          <article style={kort}>
            <h2 style={h2Style}>Vad är Svalla?</h2>
            <p>
              <strong>Svalla är Sveriges samlade sida för skärgården.</strong> Här hittar du ön, båten dit,
              krogen som har öppet, naturhamnen för natten och hantverkaren som kan komma ut, på ett ställe
              och med en källa på varje uppgift.
            </p>
            <p>
              Vi täcker {k.oarTotalt} öar från Roslagen till Bohuslän, Gotland, Öland och Höga kusten, med {guider} guider,
              platssidor för krogar och hamnar, färjetider, vintertidtabeller och de datum som styr skärgårdsåret.
              Ösidorna bygger på {k.totalt.toLocaleString('sv-SE')} källor, och {k.myndighetsandel} procent av dem kommer
              från en myndighet, kommun eller region.
            </p>
            <p style={{ marginBottom: 0 }}>
              Svalla är också ett sätt att vara i skärgården. Du kan planera dagen med reseplaneraren eller fråga
              Thorkel, vår AI-skeppare. Du kan logga dina turer, fråga folk som är där i forumet för varje ö, och
              samla öarna du besökt i Min skärgård.
            </p>
          </article>

          <article style={kort}>
            <h2 style={h2Style}>Varför vi bygger Svalla</h2>
            <p>
              Skärgården är Sveriges största vardagsäventyr, men allt man behöver veta ligger utspritt.
              Tidtabellerna hos ett rederi, öppettiderna på krogens Instagram, reglerna hos länsstyrelsen och de
              bästa tipsen i öns Facebookgrupp. Den som ska ut får lägga ihop pusslet själv, varje gång.
            </p>
            <p>
              Vi vill att det ska finnas ett ställe där det hänger ihop. För båtfolket som letar natthamn. För den
              som har hus på en ö och behöver veta när sista båten går i november. För den som har en ledig lördag
              och inte vet vart. Och för krogarna, varven och hantverkarna som lever av skärgården och förtjänar
              att hittas av dem som letar.
            </p>
            <p>
              Vi skriver bara det vi kan belägga. Uppgifterna på ösidorna visar var de kommer ifrån och när vi
              senast läste dem. Hellre en lucka än ett fel, för en fel tidtabell i skärgården kan betyda en natt
              på fel ö.
            </p>
            <p style={{ marginBottom: 0 }}>
              Och vi gör det hela året. Skärgården tar inte slut i augusti, och det gör inte vi heller.
            </p>
          </article>

          <section style={{ marginTop: 32 }}>
            <h2 style={{ ...h2Style, marginBottom: 6 }}>Allt på Svalla</h2>
            <p style={{ fontSize: 14.5, color: 'var(--txt3)', margin: '0 0 8px' }}>
              Det här finns på sajten i dag.
            </p>
            {grupper(k.oarTotalt, guider).map((g) => (
              <div key={g.rubrik} style={{ marginTop: 18 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                  {g.rubrik}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 10 }}>
                  {g.lankar.map((l) => (
                    <Link key={l.href} href={l.href} style={{
                      display: 'block', textDecoration: 'none', background: 'var(--white)',
                      borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(10,123,140,0.1)',
                    }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--sea)' }}>{l.namn}</div>
                      <div style={{ fontSize: 13, color: 'var(--txt2)', marginTop: 3, lineHeight: 1.45 }}>{l.text}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <article style={kort}>
            <h2 style={h2Style}>Varför du kan lita på uppgifterna</h2>
            <p>
              Ösidorna vilar på {k.totalt.toLocaleString('sv-SE')} källor, och {k.myndighetsandel} procent av dem
              kommer från myndigheter, kommuner, regioner eller deras trafikbolag. {k.oarMedKalla === k.oarTotalt
                ? `Alla ${k.oarTotalt} öar har minst en.`
                : `${k.oarMedKalla} av ${k.oarTotalt} öar har minst en.`}{' '}
              Ett nytt pris eller klockslag utan källa stoppar publiceringen av sig själv. Hela källistan per ö
              finns som öppen fil: <a href="/data/oar.json">svalla.se/data/oar.json</a> (CC BY 4.0).
            </p>
            <ul style={ulStyle}>
              <li><strong>Öar och platser</strong>: uppgifterna har en källa från kommunen, myndigheten eller verksamheten själv, och källorna står längst ner på varje ösida.</li>
              <li><strong>Färjetider</strong>: kommande avgångar för Waxholmsbolaget och Cinderellabåtarna hämtas från Trafiklab. Kontrollera alltid mot rederiet inför avgång.</li>
              <li><strong>Guider och artiklar</strong>: skrivna av Svalla och granskade innan de publiceras.</li>
              <li><strong>Hantverkare</strong>: hämtade från företagens egna webbplatser och öarnas företagskataloger, med källa och läsdatum.</li>
              <li><strong>Thorkels svar</strong>: genererade av en språkmodell (Anthropic Claude) utifrån Svallas data. Han kan göra fel, så kontrollera viktiga uppgifter.</li>
              <li><strong>Användarinnehåll</strong>: turer, bilder och forumtrådar skapas av användarna. Vi granskar för spam och olämpligt innehåll men står inte bakom enskilda uttalanden.</li>
            </ul>
            <p style={{ fontSize: 13.5, color: 'var(--txt3)', marginTop: 18, marginBottom: 0 }}>
              Hittar du något som är fel eller gammalt? Skriv till <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)', fontWeight: 700 }}>info@svalla.se</a> så rättar vi det.
            </p>
          </article>

          <article style={{
            ...kort,
            background: 'linear-gradient(135deg, var(--thor-l, rgba(204, 178, 122, 0.12)) 0%, var(--white) 100%)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/thorkel-avatar.svg" alt="Thorkel, Svallas AI-skeppare" width={56} height={56}
                style={{ borderRadius: '50%', flexShrink: 0, background: 'var(--thor-l, rgba(204,178,122,0.12))' }} />
              <div>
                <h2 style={{ ...h2Style, margin: 0 }}>Möt Thorkel</h2>
                <div style={{ fontSize: 13, color: 'var(--txt3)', marginTop: 2 }}>AI-skeppare, en karaktär och inte en verklig person</div>
              </div>
            </div>
            <p>
              Thorkel är Svallas digitala skeppare. Han hjälper dig hitta en ö, planera dagen och kolla båtarna, och
              han svarar utifrån samma källbelagda data som resten av sajten.
            </p>
            <Link href="/planera-tur" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--thor, #8d6e3a)', color: '#fff',
              padding: '10px 18px', borderRadius: 22,
              textDecoration: 'none', fontWeight: 700, fontSize: 14,
            }}>
              Prata med Thorkel
            </Link>
          </article>

          <article style={kort}>
            <h2 style={h2Style}>Driver du en verksamhet i skärgården?</h2>
            <p style={{ marginBottom: 12 }}>
              Krogar, hamnar, rederier och hantverkare kan ta över sin sida på Svalla utan kostnad: rätta uppgifter,
              lägga till bilder och berätta vad ni gör. Vill ni inte vara med tar vi bort er, utan frågor.
            </p>
            <Link href="/partner-sida" style={{ color: 'var(--sea)', fontWeight: 700, fontSize: 15 }}>Så tar ni över er sida</Link>
          </article>

          <article style={kort}>
            {/* Ankare: sidfotens "Kontakt" länkar hit (/om#kontakt). */}
            <h2 id="kontakt" style={h2Style}>Följ med och hör av dig</h2>
            <p style={{ marginBottom: 12 }}>
              Tips om en ö, något som är fel, samarbeten eller pressfrågor:{' '}
              <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)', fontWeight: 700 }}>info@svalla.se</a>
            </p>
            <Link href="/nyhetsbrev" style={{
              display: 'inline-block', padding: '11px 22px', background: 'var(--sea)', color: '#fff',
              borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: 'none',
            }}>Få nyhetsbrevet</Link>
          </article>

        </div>
      </div>
    </>
  )
}

const h2Style: React.CSSProperties = {
  color: 'var(--txt)',
  fontSize: 22,
  fontWeight: 700,
  marginTop: 0,
  marginBottom: 12,
  fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
}

const ulStyle: React.CSSProperties = {
  margin: '12px 0 0',
  paddingLeft: 20,
  lineHeight: 1.8,
}
