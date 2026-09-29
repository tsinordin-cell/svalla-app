/**
 * Generisk SEO-sida för (region, kategori) — t.ex. /goteborg/krogar.
 * Server-renderad så Google indexerar full innehåll.
 */
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { createServerSupabaseClient } from '@/lib/supabase-server'

// koder: alla archipelago_region-koder som hör till regionen. Tidigare matchades
// bara en exakt kod, så t.ex. 'bohuslan_nord' föll bort från /bohuslan/* (mätt
// 2026-09-23). Samma kodgruppering som Upptäck-flikarna (src/lib/upptackRegion.ts).
type RegionInfo = { label: string; description: string; koder: string[] }
export const REGIONS = {
  goteborg: {
    label: 'Göteborgs skärgård',
    description: 'Göteborgs södra och norra skärgård — Brännö, Donsö, Vrångö, Styrsö, Hönö, Öckerö och Källö-Knippla.',
    koder: ['goteborg'],
  },
  bohuslan: {
    label: 'Bohuslän',
    description: 'Från Marstrand i söder till Strömstad i norr — Käringön, Smögen, Fjällbacka, Grebbestad och Kosteröarna.',
    koder: ['bohuslan', 'bohuslan_nord'],
  },
  aland: {
    label: 'Åland',
    description: 'Mariehamn, Eckerö, Kökar, Föglö, Brändö och de yttre öarna — den åländska skärgården samlad.',
    koder: ['aland'],
  },
  oland: {
    label: 'Öland',
    description: 'Borgholm, Mörbylånga, Färjestaden, Byxelkrok, Sandvik och Löttorp — hela Öland norr till söder.',
    koder: ['oland'],
  },
  gotland: {
    label: 'Gotland',
    description: 'Visby med medeltida ringmur, Fårö med Bergmans landskap, Slite, Burgsvik och Karlsöarna.',
    koder: ['gotland'],
  },
  hogakusten: {
    label: 'Höga Kusten',
    // KÄLLA: sverigesnationalparker.se — Skuleskogens nationalpark bildad 1984 (läst 2026-09-14)
    description: 'Härnösand, Ulvön, Kramfors, Höga Kusten-leden och Skuleskogens nationalpark — Norrlands dramatiska klippkust.',
    koder: ['hogakusten'],
  },
  halland: {
    label: 'Halland',
    description: 'Tylösand, Varberg fästning, Falkenberg, Båstad och Laholmsbukten — Hallands långa sandstrand och fästningsstad.',
    koder: ['halland'],
  },
} satisfies Record<string, RegionInfo>

// types: alla platstyper som hör till kategorin. "Gästhamnar och marinor" tog
// tidigare bara med typen harbor, så marinor (typ marina) saknades, och
// sjömackar med typen fuel_station saknades på sjömackssidorna.
// Texterna lovar inget sajten inte kan hålla: inga "bästa", inga "verifierade
// öppettider", inga "testade av båtfolk" (ingen sådan testning finns).
export const CATEGORIES: Record<string, { label: string; types: string[]; intro: string; metaTitle: (region: string) => string; metaDesc: (region: string) => string }> = {
  krogar: {
    label: 'Krogar och restauranger',
    types: ['restaurant'],
    intro: 'Krogar och restauranger längs kusten. Betygen kommer från Google.',
    metaTitle: r => `Krogar & restauranger i ${r} — Svalla`,
    metaDesc: r => `Krogar och restauranger i ${r} samlade på en karta, med kontaktuppgifter och länkar till verksamheterna.`,
  },
  gasthamnar: {
    label: 'Gästhamnar och marinor',
    types: ['harbor', 'marina'],
    intro: 'Gästhamnar och marinor med position och kontaktuppgifter. Betygen kommer från Google.',
    metaTitle: r => `Gästhamnar & marinor i ${r} — Svalla`,
    metaDesc: r => `Gästhamnar och marinor i ${r} med position, telefon och hemsida.`,
  },
  sjomackar: {
    label: 'Sjömackar och drivmedel',
    types: ['fuel', 'fuel_station'],
    intro: 'Var du kan tanka båten i området. Kontrollera öppettider och drivmedel hos macken innan du lägger till.',
    metaTitle: r => `Sjömackar i ${r} — Svalla`,
    metaDesc: r => `Sjömackar och bränslestationer för båt i ${r}, med position och kontaktuppgifter.`,
  },
  bastu: {
    label: 'Bastu och kallbadhus',
    types: ['sauna'],
    intro: 'Bastur, badhus och kallbadhus i området. Vissa drivs av föreningar och är bara öppna för medlemmar – det står i så fall på platsens sida.',
    metaTitle: r => `Bastu & kallbadhus i ${r} — Svalla`,
    metaDesc: r => `Bastur och kallbadhus i ${r} med position och kontaktuppgifter.`,
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
  endast_medlemmar: boolean | null
}

// cache(): generateMetadata (noindex för tom kategori) och sidan delar samma hämtning.
export const getPlacesForRegionCategory = cache(async (regionKey: string, categoryKey: string): Promise<Place[]> => {
  const region = REGIONS[regionKey as keyof typeof REGIONS]
  const cat = CATEGORIES[categoryKey]
  if (!region || !cat) return []
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('restaurants')
    .select('id, name, slug, latitude, longitude, island, google_rating, google_ratings_total, formatted_address, image_url, endast_medlemmar')
    .in('archipelago_region', region.koder)
    .in('type', cat.types)
    .order('google_rating', { ascending: false, nullsFirst: false })
    .order('google_ratings_total', { ascending: false, nullsFirst: false })
    .limit(200)
  return (data ?? []) as Place[]
})

export default async function RegionCategoryPage({
  regionKey,
  categoryKey,
}: { regionKey: string; categoryKey: string }) {
  const region = REGIONS[regionKey as keyof typeof REGIONS]
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
      url: `https://svalla.se/upptack/${p.slug || p.id}`,
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
              <Link href={`/upptack/${p.slug || p.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
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
                  {p.endast_medlemmar && <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt-muted, #555)' }}>Endast medlemmar</div>}
                  {p.google_rating != null && (
                    <div style={{ fontSize: 14, color: 'var(--txt-muted, #555)', marginTop: 4 }}>
                      Google-betyg {p.google_rating.toFixed(1).replace('.', ',')} {p.google_ratings_total != null && <span style={{ opacity: 0.7 }}>({p.google_ratings_total} recensioner)</span>}
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
