import { MetadataRoute } from 'next'
import { ISLANDS } from './o/island-data'
import { createClient } from '@/lib/supabase'

// Blogg-slugs (statisk lista — speglar posts-data.ts)
const BLOG_SLUGS = [
  'basta-restaurangerna-sandhamn',
  'kajak-stockholms-skargard-nybörjare',
  'dolda-parlor-moja',
  'bransle-ankring-skargard',
  'sommar-skargard-tips',
  'fjaderholmarna-dagstur',
  'vaxholm-guide',
  'uto-guide',
  'segling-nybörjare-guide',
  'basta-badplatserna',
  'vandring-orno-uto',
  'cykling-moja-gallno',
  'fiske-skargard-guide',
  'gasthamnar-guide',
  'vinter-skargard',
  'barnfamilj-skargard',
  'svenska-hoar-sandhamn',
  'grilla-naturhamn',
  'norrtelje-norra-skargard',
  'packlista-bat',
  'havsbastu-guide',
  'segling-klassiska-leder',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://svalla.se'
  const now = new Date()

  // ── Statiska sidor ──────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                  priority: 1.0, changeFrequency: 'daily'   },
    { url: `${base}/platser`,     priority: 0.9, changeFrequency: 'daily'   },
    { url: `${base}/rutter`,      priority: 0.9, changeFrequency: 'weekly'  },
    { url: `${base}/oar`,         priority: 0.9, changeFrequency: 'weekly'  },
    { url: `${base}/blogg`,       priority: 0.7, changeFrequency: 'weekly'  },
    { url: `${base}/guide`,       priority: 0.6, changeFrequency: 'monthly' },
    { url: `${base}/om`,          priority: 0.5, changeFrequency: 'monthly' },
    { url: `${base}/faq`,         priority: 0.5, changeFrequency: 'monthly' },
  ].map(p => ({ ...p, lastModified: now }))

  // ── Ö-sidor (statiska) ──────────────────────────────────────────
  const islandPages: MetadataRoute.Sitemap = ISLANDS.map(island => ({
    url: `${base}/o/${island.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // ── Blogg-artiklar ──────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map(slug => ({
    url: `${base}/blogg/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // ── Dynamiska platser från Supabase ─────────────────────────────
  let platsPages: MetadataRoute.Sitemap = []
  let rutterPages: MetadataRoute.Sitemap = []

  try {
    const supabase = createClient()

    const [{ data: restaurants }, { data: tours }] = await Promise.all([
      supabase.from('restaurants').select('id, updated_at').order('id'),
      supabase.from('tours').select('id, updated_at').order('id'),
    ])

    platsPages = (restaurants ?? []).map((r: { id: string; updated_at?: string }) => ({
      url: `${base}/platser/${r.id}`,
      lastModified: r.updated_at ? new Date(r.updated_at) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))

    rutterPages = (tours ?? []).map((t: { id: string; updated_at?: string }) => ({
      url: `${base}/rutter/${t.id}`,
      lastModified: t.updated_at ? new Date(t.updated_at) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  } catch {
    // Om Supabase inte svarar — returnera ändå resten av sitemap
  }

  return [
    ...staticPages,
    ...islandPages,
    ...blogPages,
    ...platsPages,
    ...rutterPages,
  ]
}
