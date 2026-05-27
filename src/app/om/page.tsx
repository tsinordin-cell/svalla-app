/**
 * /om — Om Svalla, Thorkel och hur vi samlar data.
 *
 * E-E-A-T-byggande sida för AI-erans SEO. Schema.org Person för Thorkel
 * (transparent: AI-karaktär), Organization referens från layout.tsx,
 * "Hur vi samlar data"-sektion för transparency.
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'

export const metadata: Metadata = {
  title: 'Om Svalla – så bygger vi Sveriges skärgårdsguide',
  description: 'Svalla är en digital guide till svenska skärgården — byggd av skärgårdsälskare med stöd av Thorkel, vår AI-skeppare. Läs om hur vi samlar data, verifierar fakta och tänker kring innehållet.',
  alternates: { canonical: 'https://svalla.se/om' },
  openGraph: {
    title: 'Om Svalla',
    description: 'Byggt av skärgårdsälskare, för skärgårdsälskare. Med Thorkel som digital skeppare.',
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
  description: 'Thorkel är Svallas AI-baserade skärgårdsguide — en digital skeppare som hjälper användare planera turer, hitta öar och navigera kollektivtrafik i den svenska skärgården.',
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

export default function OmPage() {
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
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 280, height: 280, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
          }} />

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
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: 580 }}>
              Byggt av skärgårdsälskare, för skärgårdsälskare. Med Thorkel som digital skeppare.
            </p>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '36px 20px 0' }}>

          {/* Vad är Svalla */}
          <article style={{
            background: 'var(--white)',
            borderRadius: 16,
            padding: '32px 28px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid rgba(10,123,140,0.06)',
            lineHeight: 1.75, color: 'var(--txt2)', fontSize: 15,
          }}>
            <h2 style={h2Style}>Vad är Svalla?</h2>
            <p>
              Svalla är en digital plattform för svenska skärgården — från Fjäderholmarna i innerskärgården till Landsort i söder, och vidare till Bohusläns klippkust och västkustens öar.
            </p>
            <p>
              Vi kombinerar tre saker: en sökbar karta över restauranger, gästhamnar, naturhamnar och bryggor; live tidtabeller och transport-guider till skärgårdens öar; och Thorkel — vår AI-skeppare — som hjälper dig planera turer och svarar på frågor.
            </p>

            <h2 style={h2Style}>Varför vi byggde det</h2>
            <p>
              Vi tröttnade på att söka i fem olika appar för att hitta en öppen krog en sommarkväll. Google Maps saknar hälften av skärgårdens platser, Tripadvisor har gamla öppettider och sjökorten säger ingenting om mat.
            </p>
            <p>
              Svalla samlar det som faktiskt spelar roll för den som är ute i skärgården — öppettider, koordinater på rätt ö, transport-länkar och insidertips.
            </p>
          </article>

          {/* Thorkel */}
          <article style={{
            marginTop: 24,
            background: 'linear-gradient(135deg, var(--thor-l, rgba(204, 178, 122, 0.12)) 0%, var(--white) 100%)',
            borderRadius: 16,
            padding: '32px 28px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid rgba(10,123,140,0.06)',
            lineHeight: 1.75, color: 'var(--txt2)', fontSize: 15,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/thorkel-avatar.svg"
                alt="Thorkel — Svallas AI-skeppare"
                width={64}
                height={64}
                style={{ borderRadius: '50%', flexShrink: 0, background: 'var(--thor-l, rgba(204,178,122,0.12))' }}
              />
              <div>
                <h2 style={{ ...h2Style, margin: 0 }}>Möt Thorkel</h2>
                <div style={{ fontSize: 13, color: 'var(--txt3)', marginTop: 2 }}>
                  AI-skeppare · Karaktär, inte en verklig person
                </div>
              </div>
            </div>
            <p>
              Thorkel är Svallas digitala skeppare — en AI-assistent som är formgiven som en 70-årig skeppare från Möja, gammal lots vid Sandhamn, med decennier på vattnet. Vit kaptens-keps, mörkblå uniform, doft av salt och tjära.
            </p>
            <p>
              Han hjälper dig hitta öar, planera dagsturer, kolla färjetider och svara på frågor om vad som väntar dig på respektive ö. Han är opinionerad — han har starka åsikter om plast i havet, om trålare och om att respektera fredningstider. Det är inte politik för honom utan hemkärlek.
            </p>
            <p style={{ fontSize: 13.5, color: 'var(--txt3)', fontStyle: 'italic', marginBottom: 0 }}>
              Transparent: Thorkel är en AI-karaktär. Inte en verklig person. Vi var tydliga med det från första dagen.
            </p>
            <div style={{ marginTop: 18 }}>
              <Link href="/planera-tur" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--thor, #8d6e3a)', color: '#fff',
                padding: '10px 18px', borderRadius: 22,
                textDecoration: 'none', fontWeight: 700, fontSize: 14,
              }}>
                Prata med Thorkel →
              </Link>
            </div>
          </article>

          {/* Hur vi samlar data */}
          <article style={{
            marginTop: 24,
            background: 'var(--white)',
            borderRadius: 16,
            padding: '32px 28px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid rgba(10,123,140,0.06)',
            lineHeight: 1.75, color: 'var(--txt2)', fontSize: 15,
          }}>
            <h2 style={h2Style}>Hur vi samlar data</h2>
            <p>
              Vi tror på transparens. Här är vad vi gör, och varifrån informationen kommer:
            </p>
            <ul style={ulStyle}>
              <li>
                <strong>Platser och koordinater</strong> — manuellt curerade. Varje restaurang, hamn och brygga är verifierad mot officiella källor. Koordinater korrigerade mot Google Maps.
              </li>
              <li>
                <strong>Färje- och busstider</strong> — live från Trafiklab (ResRobot). Datan kommer direkt från SL, Waxholmsbolaget och deras systerbolag. Vi tar inte ansvar för avvikelser.
              </li>
              <li>
                <strong>Ö-guider och FAQ</strong> — handskrivna av Svalla-teamet. Vi använder Skärgårdsstiftelsen, Visit Stockholm, vastsverige.com och kommunala turistsidor som källor. Texter granskas innan publicering.
              </li>
              <li>
                <strong>Thorkels svar</strong> — genererade av en stor språkmodell (Anthropic Claude). Thorkel hämtar faktadata från Svallas databaser plus live-trafiklab-data. Han kan göra fel — kontrollera viktiga uppgifter mot officiella källor.
              </li>
              <li>
                <strong>Användarinnehåll</strong> — turer, foton och forumtrådar är skapade av Svallas användare. Vi granskar för spam och olämpligt innehåll men står inte bakom enskilda uttalanden.
              </li>
            </ul>
            <p style={{ fontSize: 13.5, color: 'var(--txt3)', marginTop: 18, marginBottom: 0 }}>
              Hittar du fel eller föråldrad information? Maila <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)', fontWeight: 700 }}>info@svalla.se</a> så fixar vi det.
            </p>
          </article>

          {/* Kontakt */}
          <article style={{
            marginTop: 24,
            background: 'var(--white)',
            borderRadius: 16,
            padding: '32px 28px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid rgba(10,123,140,0.06)',
            lineHeight: 1.75, color: 'var(--txt2)', fontSize: 15,
          }}>
            <h2 style={h2Style}>Kontakt</h2>
            <p style={{ margin: 0 }}>
              Frågor, platstips, samarbeten eller pressfrågor?{' '}
              <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)', fontWeight: 700 }}>info@svalla.se</a>
            </p>
          </article>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <Link href="/upptack" style={{
              padding: '12px 24px', background: 'var(--sea)', color: '#fff',
              borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: 'none',
            }}>Utforska kartan</Link>
            <Link href="/faq" style={{
              padding: '12px 24px', background: 'var(--white)', color: 'var(--sea)',
              borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: 'none',
              border: '1.5px solid var(--sea)',
            }}>Vanliga frågor</Link>
            <Link href="/guider" style={{
              padding: '12px 24px', background: 'var(--white)', color: 'var(--sea)',
              borderRadius: 20, fontWeight: 700, fontSize: 14, textDecoration: 'none',
              border: '1.5px solid var(--sea)',
            }}>Praktiska guider</Link>
          </div>

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
