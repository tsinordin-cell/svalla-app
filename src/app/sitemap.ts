import { MetadataRoute } from 'next'
import { ALL_ISLANDS } from './o/island-data'
import { ACTIVITY_LIST, islandsForActivity } from './aktivitet/activity-data'
import { OAR_CATEGORIES } from './oar/oar-categories'
import { createClient } from '@/lib/supabase'

// Blogg-slugs (statisk lista — speglar posts-data.ts)
const BLOG_SLUGS = [
  'basta-restaurangerna-sandhamn',
  'kajak-stockholms-skargard-nyborjare',
  'dolda-parlor-moja',
  'bransle-ankring-skargard',
  'sommar-skargard-tips',
  'fjaderholmarna-dagstur',
  'vaxholm-guide',
  'uto-guide',
  'segling-nyborjare-guide',
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
    { url: base,                             lastModified: now, priority: 1.0, changeFrequency: 'daily'   as const },
    { url: `${base}/platser`,                lastModified: now, priority: 0.9, changeFrequency: 'daily'   as const },
    { url: `${base}/karta`,                  lastModified: now, priority: 0.85, changeFrequency: 'weekly' as const },
    { url: `${base}/rutter`,                 lastModified: now, priority: 0.9, changeFrequency: 'weekly'  as const },
    { url: `${base}/rutter?vy=oar`,          lastModified: now, priority: 0.9, changeFrequency: 'weekly'  as const },
    { url: `${base}/rutter?vy=farjor`,       lastModified: now, priority: 0.85, changeFrequency: 'weekly' as const },
    { url: `${base}/farjor`,                 lastModified: now, priority: 0.85, changeFrequency: 'weekly' as const },
    // Region-landningssidor — SEO-marknadsföring, driver till signup
    { url: `${base}/stockholms-skargard`,    lastModified: now, priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: `${base}/bohuslan`,               lastModified: now, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${base}/gotland`,                lastModified: now, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${base}/aland`,                  lastModified: now, priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${base}/blekinge-skargard`,      lastModified: now, priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${base}/vasterhav`,              lastModified: now, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${base}/malaren`,               lastModified: now, priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${base}/goteborg-skargard`,     lastModified: now, priority: 0.85, changeFrequency: 'monthly' as const },
    // Kategori-landningssidor (dropdown-mål) — kurerade, SEO-optimerade
    { url: `${base}/resmal`,                 lastModified: now, priority: 0.85, changeFrequency: 'weekly' as const },
    { url: `${base}/aktiviteter`,            lastModified: now, priority: 0.8,  changeFrequency: 'weekly' as const },
    { url: `${base}/boende`,                 lastModified: now, priority: 0.8,  changeFrequency: 'weekly' as const },
    { url: `${base}/krogar-och-mat`,         lastModified: now, priority: 0.8,  changeFrequency: 'weekly' as const },
    { url: `${base}/bastu-och-bad`,          lastModified: now, priority: 0.8,  changeFrequency: 'weekly' as const },
    { url: `${base}/hamnar-och-bryggor`,     lastModified: now, priority: 0.8,  changeFrequency: 'weekly' as const },
    { url: `${base}/naturhamnar`,            lastModified: now, priority: 0.85, changeFrequency: 'weekly' as const },
    { url: `${base}/vandring-och-natur`,     lastModified: now, priority: 0.8,  changeFrequency: 'weekly' as const },
    { url: `${base}/barnvanliga-oar`,        lastModified: now, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${base}/erbjudanden`,            lastModified: now, priority: 0.75, changeFrequency: 'weekly' as const },
    { url: `${base}/populara-turer`,         lastModified: now, priority: 0.8,  changeFrequency: 'weekly' as const },
    { url: `${base}/segelrutter`,            lastModified: now, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${base}/nyborjare-segling`,      lastModified: now, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${base}/snabbaste-vagen`,        lastModified: now, priority: 0.75, changeFrequency: 'weekly' as const },
    { url: `${base}/planera-tur`,            lastModified: now, priority: 0.85, changeFrequency: 'weekly' as const },
    { url: `${base}/dagsturer`,              lastModified: now, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${base}/tips`,                   lastModified: now, priority: 0.8,  changeFrequency: 'weekly' as const },
    { url: `${base}/blogg`,                  lastModified: now, priority: 0.7,  changeFrequency: 'weekly' as const },
    { url: `${base}/planera`,                 lastModified: now, priority: 0.9,  changeFrequency: 'daily'   as const },
    { url: `${base}/utflykt`,                 lastModified: now, priority: 0.9,  changeFrequency: 'daily'   as const },
    { url: `${base}/bingo`,                   lastModified: now, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${base}/forum`,                   lastModified: now, priority: 0.85, changeFrequency: 'daily'   as const },
    { url: `${base}/guide`,                  lastModified: now, priority: 0.6,  changeFrequency: 'monthly' as const },
    { url: `${base}/om`,                     lastModified: now, priority: 0.5,  changeFrequency: 'monthly' as const },
    { url: `${base}/faq`,                    lastModified: now, priority: 0.5,  changeFrequency: 'monthly' as const },
  ]

  // ── Ö-sidor (statiska, inkl. Bohuslän) ─────────────────────────
  const islandPages: MetadataRoute.Sitemap = ALL_ISLANDS.map(island => ({
    url: `${base}/o/${island.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // ── Aktivitetssidor (programmatisk SEO) ─────────────────────────
  const activityIndex: MetadataRoute.Sitemap = [
    { url: `${base}/aktivitet`, lastModified: now, priority: 0.85, changeFrequency: 'weekly' as const },
  ]
  const activityTypePages: MetadataRoute.Sitemap = ACTIVITY_LIST.map(a => ({
    url: `${base}/aktivitet/${a.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  const activityIslandPages: MetadataRoute.Sitemap = ACTIVITY_LIST.flatMap(a =>
    islandsForActivity(a.slug).map(island => ({
      url: `${base}/aktivitet/${a.slug}/${island.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  // ── Long-tail kategori-sidor: barnvänliga, dagstur, segling osv ──
  const oarCategoryPages: MetadataRoute.Sitemap = OAR_CATEGORIES.map(c => ({
    url: `${base}/oar/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // ── Per-ö kategorisidor (restauranger / hamnar / boende) ────────
  const islandCategoryPages: MetadataRoute.Sitemap = ALL_ISLANDS.flatMap(island => [
    { url: `${base}/o/${island.slug}/restauranger`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/o/${island.slug}/hamnar`,        lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/o/${island.slug}/boende`,        lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
  ])

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
  let tipsPages: MetadataRoute.Sitemap = []
  let planeraPages: MetadataRoute.Sitemap = []
  let forumCatPages: MetadataRoute.Sitemap = []
  let forumThreadPages: MetadataRoute.Sitemap = []

  try {
    const supabase = createClient()

    const [{ data: restaurants }, { data: tours }, { data: articles }, { data: plannedRoutes }, { data: forumCats }, { data: forumThreads }] = await Promise.all([
      supabase.from('restaurants').select('id, updated_at').order('id'),
      supabase.from('tours').select('id, updated_at').order('id'),
      supabase.from('articles').select('slug, updated_at, published').eq('published', true),
      supabase.from('planned_routes').select('id, updated_at').eq('status', 'published'),
      supabase.from('forum_categories').select('id'),
      supabase.from('forum_threads').select('id, category_id, last_reply_at').eq('in_spam_queue', false).order('last_reply_at', { ascending: false }).limit(500),
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

    tipsPages = (articles ?? []).map((a: { slug: string; updated_at?: string }) => ({
      url: `${base}/tips/${a.slug}`,
      lastModified: a.updated_at ? new Date(a.updated_at) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))

    planeraPages = (plannedRoutes ?? []).map((r: { id: string; updated_at?: string }) => ({
      url: `${base}/planera/${r.id}`,
      lastModified: r.updated_at ? new Date(r.updated_at) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    forumCatPages = (forumCats ?? []).map((c: { id: string }) => ({
      url: `${base}/forum/${c.id}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.75,
    }))

    forumThreadPages = (forumThreads ?? []).map((t: { id: string; category_id: string; last_reply_at?: string }) => ({
      url: `${base}/forum/${t.category_id}/${t.id}`,
      lastModified: t.last_reply_at ? new Date(t.last_reply_at) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    }))
  } catch {
    // Om Supabase inte svarar — returnera ändå resten av sitemap
  }

  return [
    ...staticPages,
    ...islandPages,
    ...islandCategoryPages,
    ...activityIndex,
    ...activityTypePages,
    ...activityIslandPages,
    ...oarCategoryPages,
    ...blogPages,
    ...platsPages,
    ...rutterPages,
    ...tipsPages,
    ...planeraPages,
    ...forumCatPages,
    ...forumThreadPages,
  ]
}
