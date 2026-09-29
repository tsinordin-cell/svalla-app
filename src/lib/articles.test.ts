import { describe, it, expect, vi } from 'vitest'
vi.mock('./supabase-server', () => ({ createServerSupabaseClient: () => ({}) }))
vi.mock('./logger', () => ({ logger: { error: () => {} } }))
import { renderMarkdown } from './articles'
describe('renderMarkdown', () => {
  it('döljer källkommentarer, gör # till h2, interna länkar utan ny flik', () => {
    const h = renderMarkdown('<!-- KÄLLA: x\nrad2 -->\n# Rubrik\nText [in](/o/grinda) och [ut](https://a.se).\n- punkt')
    expect(h).not.toContain('KÄLLA')
    expect(h).toContain('<h2>Rubrik</h2>')
    expect(h).toContain('<a href="/o/grinda">in</a>')
    expect(h).toContain('target="_blank"')
  })
})
