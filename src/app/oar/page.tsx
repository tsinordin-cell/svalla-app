import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'
import EmailSignup from '@/components/EmailSignup'
import PublicFooter from '@/components/PublicFooter'
import { ALL_ISLANDS, type Island } from '../o/island-data'
import { OAR_CATEGORIES, islandsForCategory } from './oar-categories'

export const metadata: Metadata = {
  title: 'Alla öar i skärgården — 84 destinationer | Svalla',
  description: 'Utforska 84 öar i Stockholms skärgård och Bohuslän. Sandhamn, Grinda, Utö, Marstrand och 80 till — guider, restauranger, hamnar och färjetider.',
  keywords: [
    'alla öar stockholms skärgård',
    'skärgården stockholm',
    'öar bohuslän',
    'svalla öar',
    'stockholms skärgård guide',
  ],
  alternates: { canonical: 'https://svalla.se/oar' },
  openGraph: {
    title: 'Alla öar i skärgården — 84 destinationer',
    description: 'Stockholms skärgård + Bohuslän. Komplett guide.',
    url: 'https://svalla.se/oar',
  },
}

const REGION_LABELS: Record<string, string> = {
  norra: 'Norra skärgården',
  mellersta: 'Mellersta skärgården',
  södra: 'Södra skärgården',
  bohuslan: 'Bohuslän',
}

const REGION_TAGLINES: Record<string, string> = {
  norra: 'Tystare, lugnare, längre ut. Från Arholma till Blidö.',
  mellersta: 'Det klassiska skärgårdslivet — Sandhamn, Möja, Finnhamn.',
  södra: 'Söderskärgården — Utö, Nåttarö, Ornö, Landsort.',
  bohuslan: 'Västkusten — Marstrand, Smögen, Kosterhavet.',
}

export default function OarIndexPage() {
  // Gruppera per region för listvy
  const grouped: Record<string, Island[]> = { norra: [], mellersta: [], södra: [], bohuslan: [] }
  for (const i of ALL_ISLANDS) {
    const region = i.region in grouped ? i.region : 'mellersta'
    const bucket = grouped[region]
    if (bucket) bucket.push(i)
  }

  // Topp-kategorier för "Hitta efter intresse"-sektion
  const topCategories = OAR_CATEGORIES.slice(0, 6).map(c => ({
    ...c,
    count: islandsForCategory(c.slug).length,
  }))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* JSON-LD ItemList för SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Alla öar i skärgården',
            numberOfItems: ALL_ISLANDS.length,
            itemListElement: ALL_ISLANDS.slice(0, 30).map((i, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              url: `https://svalla.se/o/${i.slug}`,
              name: i.name,
            })),
          }),
        }}
      />

      <nav style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '18px 24px 16px',
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <SvallaLogo height={26} color="#ffffff" />
          </Link>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <Link href="/logga-in" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              Logga in
            </Link>
            <Link href="/kom-igang" style={{
              padding: '8px 18px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: '#fff',
              fontSize: 13, fontWeight: 700,
              textDecoration: 'none',
              backdropFilter: 'blur(8px)',
            }}>
              Kom igång gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header style={{
        background: 'linear-gradient(170deg, #0d2440 0%, #1e5c82 50%, #2d7d8a 100%)',
        padding: '72px 24px 96px', color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 920, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, opacity: 0.85, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
            {ALL_ISLANDS.length} öar · Stockholm + Bohuslän
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 700, margin: '0 0 18px',
            lineHeight: 1.05,
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: -0.5,
          }}>
            Hela skärgården <em style={{ color: '#f4b06a', fontStyle: 'italic' }}>på en sida</em>
          </h1>
          <p style={{
            fontSize: 18, lineHeight: 1.55,
            margin: '0 0 32px', maxWidth: 640,
            color: 'rgba(255,255,255,0.88)',
          }}>
            Från Arholma längst i norr till Marstrand på västkusten. {ALL_ISLANDS.length} kuraterade öar med restauranger, hamnar, färjetider och våra bästa tips för varje destination.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link
              href="/kom-igang"
              style={{
                padding: '14px 28px', borderRadius: 999,
                background: '#c96e2a',
                color: '#fff', fontSize: 14, fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(201,110,42,0.35)',
              }}
            >
              Skapa gratis konto →
            </Link>
            <Link
              href="/utflykt"
              style={{
                padding: '14px 28px', borderRadius: 999,
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.22)',
                color: '#fff', fontSize: 14, fontWeight: 600,
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
              }}
            >
              Planera utflykt
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: '-48px auto 0', padding: '0 16px 60px' }}>
        {/* Konvertering — varför skapa konto */}
        <section style={{
          background: '#fff', borderRadius: 18,
          padding: '28px 32px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          marginBottom: 48,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
        }}>
          {[
            { icon: '⚓', label: 'Spara öar', desc: 'Bygg din lista över ställen att besöka.' },
            { icon: '🗺', label: 'Planera turer', desc: 'Få restid, packlista och krogar längs vägen.' },
            { icon: '📍', label: 'Logga besök', desc: 'Se vilka av 84 öar du klarat av.' },
            { icon: '🎉', label: 'Helt gratis', desc: 'Ingen prenumeration, inga annonser.' },
          ].map(b => (
            <div key={b.label}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{b.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 4 }}>{b.label}</div>
              <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>{b.desc}</div>
            </div>
          ))}
        </section>

        {/* Hitta efter intresse */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{
            fontSize: 28, fontWeight: 700,
            color: 'var(--txt)', margin: '0 0 8px',
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Hitta efter vad du vill göra
          </h2>
          <p style={{ fontSize: 15, color: 'var(--txt2)', margin: '0 0 24px' }}>
            Vi har grupperat de 84 öarna efter intresse — välj din typ.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 12,
          }}>
            {topCategories.map(c => (
              <Link
                key={c.slug}
                href={`/oar/${c.slug}`}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--surface-3)',
                  borderRadius: 14,
                  padding: '18px 20px',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                }}
              >
                <div style={{ fontSize: 11, color: 'var(--acc)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 6 }}>
                  {c.count} öar
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--sea)', marginBottom: 4, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {c.title.replace(' i skärgården', '').replace('Skärgårdsöar — ', '').replace('Skärgårdsöar ', '')}
                </div>
                <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
                  {c.hero.split(' — ')[0]}
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/oar/barnvanliga"
            style={{
              display: 'inline-block', marginTop: 14,
              fontSize: 13, color: 'var(--sea)', fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Alla 10 kategorier →
          </Link>
        </section>

        {/* Alla öar grupperade per region */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{
            fontSize: 28, fontWeight: 700,
            color: 'var(--txt)', margin: '0 0 8px',
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Alla {ALL_ISLANDS.length} öar
          </h2>
          <p style={{ fontSize: 15, color: 'var(--txt2)', margin: '0 0 24px' }}>
            Bläddra per region eller scrolla för att hitta din destination.
          </p>

          {(['norra', 'mellersta', 'södra', 'bohuslan'] as const).map(region => {
            const items = grouped[region] ?? []
            if (items.length === 0) return null
            return (
              <div key={region} style={{ marginBottom: 36 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
                  <h3 style={{
                    fontSize: 20, fontWeight: 700, color: 'var(--sea)',
                    margin: 0, fontFamily: "'Playfair Display', Georgia, serif",
                  }}>
                    {REGION_LABELS[region]}
                  </h3>
                  <span style={{
                    fontSize: 11, padding: '3px 10px', borderRadius: 999,
                    background: 'var(--surface-2)', color: 'var(--txt2)', fontWeight: 700,
                  }}>
                    {items.length} öar
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--txt2)', margin: '0 0 14px' }}>
                  {REGION_TAGLINES[region]}
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 12,
                }}>
                  {items.map(i => (
                    <Link
                      key={i.slug}
                      href={`/o/${i.slug}`}
                      style={{
                        background: 'var(--white)',
                        border: '1px solid var(--surface-3)',
                        borderRadius: 12,
                        padding: '14px 16px',
                        textDecoration: 'none', color: 'inherit',
                        display: 'flex', gap: 14, alignItems: 'center',
                      }}
                    >
                      <div style={{
                        width: 64, height: 48, flexShrink: 0,
                        borderRadius: 8, overflow: 'hidden',
                        background: `url('${i.coverImage || `/api/og/island/${i.slug}`}') center/cover, linear-gradient(135deg, #1e5c82, #2d7d8a)`,
                      }} aria-hidden />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 15, fontWeight: 700,
                          color: 'var(--txt)', marginBottom: 2,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {i.name}
                        </div>
                        <div style={{
                          fontSize: 12, color: 'var(--txt2)',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {i.tagline}
                        </div>
                      </div>
                      <span style={{ color: 'var(--sea)', fontSize: 16, flexShrink: 0 }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </section>

        {/* Email signup */}
        <section style={{ marginBottom: 60 }}>
          <EmailSignup
            variant="card"
            source="oar-index"
            title="Få tips inför sommaren"
            description="2 mail i månaden — säsong, evenemang, nya guider. Ingen reklam."
          />
        </section>

        {/* Slut-CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
          color: '#fff',
          borderRadius: 18,
          padding: '40px 32px',
          textAlign: 'center',
          marginBottom: 48,
        }}>
          <h2 style={{
            fontSize: 26, fontWeight: 700,
            margin: '0 0 10px',
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Bygg din egen skärgård
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, margin: '0 auto 22px', maxWidth: 520, opacity: 0.92 }}>
            Spara öar du vill besöka, logga turer du gjort, och få personliga tips utifrån vad du gillar.
            Helt gratis, inga annonser.
          </p>
          <Link
            href="/kom-igang"
            style={{
              display: 'inline-block',
              padding: '14px 32px', borderRadius: 999,
              background: '#c96e2a',
              color: '#fff', fontSize: 14, fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            Skapa konto — 30 sekunder →
          </Link>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
