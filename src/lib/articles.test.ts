import { describe, it, expect, vi, beforeEach } from 'vitest'
// Svaret som den låtsade frågan ger. vi.hoisted eftersom vi.mock lyfts överst i filen.
const svar = vi.hoisted(() => ({ data: null as unknown, error: null as unknown }))
// articles.ts använder den cookie-fria klienten (revision 2026-10-02). Frågan är
// en kedja som till sist awaitas, så alla led returnerar samma objekt.
vi.mock('./supabase-server', () => ({
  createPublicSupabaseClient: () => {
    const fraga: Record<string, unknown> = {}
    for (const led of ['from', 'select', 'eq', 'order', 'limit', 'maybeSingle', 'abortSignal']) fraga[led] = () => fraga
    fraga.then = (ok: (v: unknown) => unknown, fel?: (e: unknown) => unknown) => Promise.resolve(svar).then(ok, fel)
    return fraga
  },
}))
vi.mock('./logger', () => ({ logger: { error: () => {} } }))
import { getArticleBySlug, listPublishedArticles, renderMarkdown } from './articles'
describe('renderMarkdown', () => {
  it('döljer källkommentarer, gör # till h2, interna länkar utan ny flik', () => {
    const h = renderMarkdown('<!-- KÄLLA: x\nrad2 -->\n# Rubrik\nText [in](/o/grinda) och [ut](https://a.se).\n- punkt')
    expect(h).not.toContain('KÄLLA')
    expect(h).toContain('<h2>Rubrik</h2>')
    expect(h).toContain('<a href="/o/grinda">in</a>')
    expect(h).toContain('target="_blank"')
  })
})
// Revision 2026-10-02: med ISR cachades ett tyst [] eller null (tom lista,
// 404) vid databasfel. Ett frågefel ska kasta; en saknad artikel ska ge null.
describe('felhantering mot databasen', () => {
  beforeEach(() => { svar.data = null; svar.error = null })
  it('listPublishedArticles kastar vid frågefel i stället för att returnera []', async () => {
    svar.error = { message: 'mock: databasfel' }
    await expect(listPublishedArticles()).rejects.toThrow('articles: mock: databasfel')
  })
  it('getArticleBySlug kastar vid frågefel i stället för att returnera null', async () => {
    svar.error = { message: 'mock: databasfel' }
    await expect(getArticleBySlug('finns')).rejects.toThrow('articles: mock: databasfel')
  })
  it('getArticleBySlug ger null när artikeln saknas (0 rader, inget fel)', async () => {
    await expect(getArticleBySlug('finns-inte')).resolves.toBeNull()
  })
  it('listPublishedArticles returnerar raderna när frågan lyckas', async () => {
    svar.data = [{ slug: 'a' }, { slug: 'b' }]
    await expect(listPublishedArticles()).resolves.toHaveLength(2)
  })
})
