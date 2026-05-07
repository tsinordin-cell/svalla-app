/**
 * Generisk SEO-sida för (region, kategori) — t.ex. /goteborg/krogar.
 * Server-renderad så Google indexerar full innehåll.
 */
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export const REGIONS: Record<string, { label: string; description: string; archipelago_region: string }> = {
  goteborg: {
    label: 'Göteborgs skärgård',
    description: 'Göteborgs södra och norra skärgård — Brännö, Donsö, Vrångö, Styrsö, Hönö, Öckerö och Källö-Knippla.',
    archipelago_region: 'goteborg',
  },
  bohuslan: {
    label: 'Bohuslän',
    description: 'Från Marstrand i söder till Strömstad i norr — Käringön, Smögen, Fjällbacka, Grebbestad och Kosteröarna.',
    archipelago_region: 'bohuslan',
  },
}

export const CATEGORIES: Record<string, { label: string; type: string; intro: string; metaTitle: (region: string) => string; metaDesc: (region: string) => string }> = {
  krogar: {
    label: 'Krogar och restauranger',
    type: 'restaurant',
    intro: 'Krogar och restauranger längs kusten — testade av båtfolk, recensionerna är från Google.',
    metaTitle: r => `Krogar & restauranger i ${r} 2026 — Svalla`,
    metaDesc: r => `Hitta de bästa krogarna och restaurangerna i ${r}. Verifierade öppettider, telefon, foto och recensioner. Allt på en karta.`,
  },
  gasthamnar: {
    label: 'Gästhamnar och marinor',
    type: 'harbor',
    intro: 'Gästhamnar och marinor med koordinater, kontaktuppgifter och recensioner från andra båtfolk.',
    metaTitle: r => `Gästhamnar i ${r} 2026 — Svalla`,
    metaDesc: r => `Komplett guide till gästhamnar och marinor i ${r}. Telefon, hemsida, koordinater och recensioner.`,
  },
  sjomackar: {
    label: 'Sjömackar och drivmedel',
    type: 'fuel',
    intro: 'Var du kan tanka båten i området — diesel, bensin och öppettider.',
    metaTitle: r => `Sjömackar i ${r} 2026 — Svalla`,
    metaDesc: r => `Hitta alla sjömackar och bränslestationer för båt i ${r}. Öppettider, telefon, koordinater.`,
  },
  bastu: {
    label: 'Bastu och kallbadhus',
    type: 'sauna',
    intro: 'Bastu, badhus och kallbadhus i området — för det perfekta avslutet på en seglardag.',
    metaTitle: r => `Bastu & kallbadhus i ${r} 2026 — Svalla`,
    metaDesc: r => `De bästa bastu och kallbadhusen i ${r}. Öppettider, telefon, foto och recensioner.`,
  },
}

interface Place {
  id: string
  name: string
  slug: string | null
  latitude: number
  longitude: number
  island: string | null
  google_rating: number | null
  google_ratings_total: number | null
  formatted_address: string | null
  image_url: string | null
}

export async function getPlacesForRegionCategory(regionKey: string, categoryKey: string): Promise<Place[]> {
  const region = REGIONS[regionKey]
  const cat = CATEGORIES[categoryKey]
  if (!region || !cat) return []
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('restaurants')
    .select('id, name, slug, latitude, longitude, island, google_rating, google_ratings_total, formatted_address, image_url')
    .eq('archipelago_region', region.archipelago_region)
    .eq('type', cat.type)
    .order('google_rating', { ascending: false, nullsFirst: false })
    .order('google_ratings_total', { ascending: false, nullsFirst: false })
    .limit(200)
  return (data ?? []) as Place[]
}

export default async function RegionCategoryPage({
  regionKey,
  categoryKey,
}: { regionKey: string; categoryKey: string }) {
  const region = REGIONS[regionKey]
  const cat = CATEGORIES[categoryKey]
  if (!region || !cat) notFound()

  const places = await getPlacesForRegionCategory(regionKey, categoryKey)

  // JSON-LD ItemList för Google rich results
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${cat.label} i ${region.label}`,
    numberOfItems: places.length,
    itemListElement: places.slice(0, 50).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://svalla.se/platser/${p.slug || p.id}`,
      name: p.name,
    })),
  }

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px 96px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Brödsmulor" style={{ fontSize: 14, color: 'var(--txt-muted, #666)', marginBottom: 16 }}>
        <Link href="/" style={{ color: 'inherit' }}>Hem</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <Link href={`/${regionKey}`} style={{ color: 'inherit' }}>{region.label}</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: 'var(--txt, #111)' }}>{cat.label}</span>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, fontFamily: "'Playfair Display', Georgia, serif", margin: 0 }}>
          {cat.label} i {region.label}
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--txt-muted, #555)', marginTop: 12, maxWidth: 720 }}>
          {cat.intro} {region.description}
        </p>
        <p style={{ fontSize: 14, color: 'var(--txt-muted, #777)', marginTop: 8 }}>
          {places.length} {places.length === 1 ? 'plats' : 'platser'} hittade.
        </p>
      </header>

      {/* Lista */}
      {places.length === 0 ? (
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--txt-muted, #888)' }}>
          Vi har inga platser registrerade i denna kategori ännu.
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {places.map(p => (
            <li key={p.id} style={{ background: 'var(--white, #fff)', border: '1px solid var(--border, rgba(0,0,0,0.08))', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <Link href={`/platser/${p.slug || p.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {p.image_url && (
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '3/2', background: '#eee' }}>
                    <Image
                      src={p.image_url}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>{p.name}</h2>
                  {p.island && <div style={{ fontSize: 13, color: 'var(--txt-muted, #777)' }}>{p.island}</div>}
                  {p.google_rating != null && (
                    <div style={{ fontSize: 14, color: 'var(--txt-muted, #555)', marginTop: 4 }}>
                      {p.google_rating.toFixed(1)}★ {p.google_ratings_total != null && <span style={{ opacity: 0.7 }}>({p.google_ratings_total} recensioner)</span>}
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Cross-link till andra kategorier i samma region */}
      <section style={{ marginTop: 48, padding: 24, background: 'var(--bg-soft, rgba(0,0,0,0.03))', borderRadius: 12 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Mer i {region.label}</h2>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 12, listStyle: 'none', padding: 0, marginTop: 12 }}>
          {Object.entries(CATEGORIES).filter(([k]) => k !== categoryKey).map(([k, c]) => (
            <li key={k}>
              <Link href={`/${regionKey}/${k}`} style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--white, #fff)', borderRadius: 999, border: '1px solid var(--border, rgba(0,0,0,0.1))', color: 'var(--txt, #111)', textDecoration: 'none', fontSize: 14 }}>
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
