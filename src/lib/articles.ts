import { createPublicSupabaseClient } from './supabase-server'
import { logger } from './logger'

export type ArticleRow = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  body_md: string
  cover_image: string | null
  author_id: string | null
  author_name: string | null
  category: string | null
  tags: string[] | null
  reading_min: number | null
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

const ARTICLE_COLUMNS =
  'id, slug, title, excerpt, body_md, cover_image, author_id, author_name, category, tags, reading_min, published, published_at, created_at, updated_at'

/**
 * Hämtar alla publicerade artiklar, sorterade efter published_at DESC.
 */
export async function listPublishedArticles(): Promise<ArticleRow[]> {
  // Cookie-fri klient (revision 2026-10-02). createServerSupabaseClient()
  // anropar cookies(), vilket gjorde /tips och /tips/[slug] dynamiska trots
  // revalidate = 300: x-vercel-cache MISS båda varven och cache-control
  // private, no-store (uppmätt 2026-10-02: /tips 0,91/0,76 s,
  // /tips/basta-krogarna-skargarden-2026 1,47/0,65 s). Samma p29-mönster som
  // forum.ts. Policyn "Articles public read" (published = true) gäller alla
  // roller. Inloggade såg dessutom egna utkast ("Articles author read drafts"),
  // men /tips filtrerar på published och /tips/[slug] 404:ar opublicerade, så
  // ingen sida visar något annat än förut (0 utkast i tabellen 2026-10-02).
  const sb = createPublicSupabaseClient()
  const { data, error } = await sb
    .from('articles')
    .select(ARTICLE_COLUMNS)
    .eq('published', true)
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(50)
    // Avbryt efter 10 s (revision 2026-10-02). Funktionen körs av
    // generateStaticParams i /tips/[slug] under bygget, och i granskningen
    // hängde bygget i "Collecting page data" när databasen inte svarade.
    // Gränsen omfattar även supabase-js egna omförsök (503/520, nätverksfel).
    .abortSignal(AbortSignal.timeout(10_000))
  if (error) {
    logger.error('articles', 'listPublishedArticles failed', { error })
    // Kasta i stället för att returnera [] (revision 2026-10-02). Med ISR
    // cachades ett tyst [] som "Inga artiklar publicerade ännu" i upp till
    // 5 min. Ett kast gör att Next behåller den gamla sidan vid förnyelse och
    // att bygget avbryts. generateStaticParams i /tips/[slug] fångar felet.
    throw new Error(`articles: ${error.message}`)
  }
  return (data as ArticleRow[]) ?? []
}

/**
 * Hämtar en artikel via slug (endast publicerade returneras för anonyma).
 */
export async function getArticleBySlug(slug: string): Promise<ArticleRow | null> {
  // Cookie-fri klient, se listPublishedArticles (revision 2026-10-02). RLS
  // returnerar därmed bara publicerade artiklar, oavsett vem som tittar.
  const sb = createPublicSupabaseClient()
  const { data, error } = await sb
    .from('articles')
    .select(ARTICLE_COLUMNS)
    .eq('slug', slug)
    // Samma tidsgräns som listPublishedArticles (revision 2026-10-02): en
    // databas som hänger ska ge ett fel (gamla sidan ligger kvar), inte en
    // förnyelse eller ett bygge som hänger.
    .abortSignal(AbortSignal.timeout(10_000))
    .maybeSingle()
  if (error) {
    logger.error('articles', 'getArticleBySlug failed', { error })
    // Kasta vid frågefel i stället för att returnera null (revision
    // 2026-10-02): null blev notFound(), och med ISR cachades då en 404 för en
    // befintlig artikel i upp till 5 min. Saknas artikeln (0 rader) är error
    // null och data null, så den ger fortfarande null och 404.
    throw new Error(`articles: ${error.message}`)
  }
  return (data as ArticleRow | null) ?? null
}

/**
 * Enkel markdown → HTML-konvertering (rubriker, listor, fet, kursiv, länkar).
 * Håller oss beroendefria (ingen ny npm-lib) — tillräckligt för redaktionellt innehåll.
 */
export function renderMarkdown(md: string): string {
  if (!md) return ''
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // Källkommentarer (<!-- KÄLLA … -->) är för granskning i efterhand och visas inte på sidan.
  const lines = md.replace(/<!--[\s\S]*?-->/g, '').split(/\r?\n/)
  const out: string[] = []
  let inList = false

  const flushList = () => {
    if (inList) {
      out.push('</ul>')
      inList = false
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      flushList()
      continue
    }
    // Rubriker
    if (/^###\s+/.test(line)) { flushList(); out.push(`<h3>${inline(line.replace(/^###\s+/, ''))}</h3>`); continue }
    if (/^##\s+/.test(line))  { flushList(); out.push(`<h2>${inline(line.replace(/^##\s+/, ''))}</h2>`);  continue }
    // Sidan har redan artikelns titel som h1 – en "# " i brödtexten blir h2 så att sidan bara har en h1.
    if (/^#\s+/.test(line))   { flushList(); out.push(`<h2>${inline(line.replace(/^#\s+/, ''))}</h2>`);   continue }
    // Listor
    if (/^[-*]\s+/.test(line)) {
      if (!inList) { out.push('<ul>'); inList = true }
      out.push(`<li>${inline(line.replace(/^[-*]\s+/, ''))}</li>`)
      continue
    }
    flushList()
    // Vanlig paragraf
    out.push(`<p>${inline(line)}</p>`)
  }
  flushList()

  function inline(s: string): string {
    let t = esc(s)
    // Länkar [text](url)
    // Länkar inom svalla.se (börjar med /) öppnas i samma flik, externa i ny flik.
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text: string, url: string) =>
      url.startsWith('/') ? `<a href="${url}">${text}</a>` : `<a href="${url}" target="_blank" rel="noopener">${text}</a>`)
    // Fet
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Kursiv
    t = t.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>')
    return t
  }

  return out.join('\n')
}
