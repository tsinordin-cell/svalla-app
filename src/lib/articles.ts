import { createServerSupabaseClient } from './supabase-server'

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
  const sb = await createServerSupabaseClient()
  const { data, error } = await sb
    .from('articles')
    .select(ARTICLE_COLUMNS)
    .eq('published', true)
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(50)
  if (error) {
    console.error('[articles] listPublishedArticles failed', error)
    return []
  }
  return (data as ArticleRow[]) ?? []
}

/**
 * Hämtar en artikel via slug (endast publicerade returneras för anonyma).
 */
export async function getArticleBySlug(slug: string): Promise<ArticleRow | null> {
  const sb = await createServerSupabaseClient()
  const { data, error } = await sb
    .from('articles')
    .select(ARTICLE_COLUMNS)
    .eq('slug', slug)
    .maybeSingle()
  if (error) {
    console.error('[articles] getArticleBySlug failed', error)
    return null
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

  const lines = md.split(/\r?\n/)
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
    if (/^#\s+/.test(line))   { flushList(); out.push(`<h1>${inline(line.replace(/^#\s+/, ''))}</h1>`);   continue }
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
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Fet
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Kursiv
    t = t.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>')
    return t
  }

  return out.join('\n')
}
