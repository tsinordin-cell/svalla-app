import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SvallaLogo from '@/components/SvallaLogo'
import EmailSignup from '@/components/EmailSignup'
import { OAR_CATEGORIES, getOarCategory, islandsForCategory } from '../oar-categories'

type Props = { params: Promise<{ kategori: string }> }

export async function generateStaticParams() {
  return OAR_CATEGORIES.map(c => ({ kategori: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params
  const cat = getOarCategory(kategori)
  if (!cat) return {}
  const count = islandsForCategory(kategori).length
  return {
    title: `${cat.title} — ${count} öar | Svalla`,
    description: cat.description,
    keywords: cat.searchTerms,
    alternates: { canonical: `https://svalla.se/oar/${cat.slug}` },
    openGraph: {
      title: cat.title,
      description: cat.hero,
      url: `https://svalla.se/oar/${cat.slug}`,
    },
  }
}

const REGION_LABELS: Record<string, string> = {
  norra: 'Norra skärgården',
  mellersta: 'Mellersta skärgården',
  södra: 'Södra skärgården',
  bohuslan: 'Bohuslän',
}

export default async function OarCategoryPage({ params }: Props) {
  const { kategori } = await params
  const cat = getOarCategory(kategori)
  if (!cat) notFound()

  const islands = islandsForCategory(kategori)

  // Gruppera per region
  const grouped: Record<string, typeof islands> = { norra: [], mellersta: [], södra: [], bohuslan: [] }
  for (const i of islands) {
    const region = i.region in grouped ? i.region : 'mellersta'
    const bucket = grouped[region]
    if (bucket) bucket.push(i)
  }

  // BreadcrumbList JSON-LD
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Öar i skärgården', item: 'https://svalla.se/oar' },
      { '@type': 'ListItem', position: 3, name: cat.title, item: `https://svalla.se/oar/${cat.slug}` },
    ],
  }

  // ItemList JSON-LD (Google ranks list pages with this)
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: cat.title,
    description: cat.description,
    numberOfItems: islands.length,
    itemListElement: islands.slice(0, 25).map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `https://svalla.se/o/${i.slug}`,
      name: i.name,
    })),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <nav style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '18px 24px 16px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link href="/oar" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none' }}>
            ← Alla öar
          </Link>
        </div>
      </nav>

      <header style={{
        background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '40px 24px 56px', color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
            {islands.length} öar · Svalla-utvalda
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
            {cat.hero}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, marginTop: 14, maxWidth: 680, opacity: 0.92 }}>
            {cat.intro}
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>
        {islands.length === 0 ? (
          <div style={{
            background: 'var(--white)', border: '1px solid var(--surface-3)',
            borderRadius: 14, padding: '32px 24px', textAlign: 'center',
            color: 'var(--txt2)',
          }}>
            Vi hittade inga öar för denna kategori — säg till om någon saknas.
          </div>
        ) : (
          (['norra', 'mellersta', 'södra', 'bohuslan'] as const).map(region => {
            const items = grouped[region] ?? []
            if (items.length === 0) return null
            return (
              <section key={region} style={{ marginBottom: 28 }}>
                <h2 style={{
                  fontSize: 12, fontWeight: 700, color: 'var(--txt3)',
                  textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px',
                }}>
                  {REGION_LABELS[region]} · {items.length}
                </h2>
                <div style={{ display: 'grid', gap: 10 }}>
                  {items.map(i => (
                    <Link
                      key={i.slug}
                      href={`/o/${i.slug}`}
                      style={{
                        background: 'var(--white)',
                        border: '1px solid var(--surface-3)',
                        borderRadius: 12,
                        padding: '14px 18px',
                        textDecoration: 'none', color: 'inherit',
                        display: 'flex', alignItems: 'center', gap: 14,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>
                          {i.name}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.45 }}>
                          {i.tagline}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 4 }}>
                          {i.facts.travel_time}
                        </div>
                      </div>
                      <span style={{ color: 'var(--sea)', fontSize: 18 }}>→</span>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })
        )}

        {/* Andra kategorier */}
        <div style={{
          marginTop: 32, padding: '20px 22px',
          background: 'var(--white)', borderRadius: 14,
          border: '1px solid var(--surface-3)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>Andra urval</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {OAR_CATEGORIES.filter(c => c.slug !== cat.slug).map(c => (
              <Link
                key={c.slug}
                href={`/oar/${c.slug}`}
                style={{
                  padding: '6px 14px', borderRadius: 999,
                  background: 'var(--surface-2)', color: 'var(--sea)',
                  textDecoration: 'none', fontSize: 13,
                }}
              >
                {c.title.replace('Skärgårdsöar', 'Öar').replace(' i skärgården', '')} →
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <EmailSignup
            variant="card"
            source={`oar-${cat.slug}`}
            title="Få fler skärgårdstips"
            description="2 mail i månaden — säsong, evenemang, nya guider."
          />
        </div>
      </main>
    </div>
  )
}
