import { describe, expect, it } from 'vitest'
import { utanHtmlKommentarer } from './htmlKommentarer'

describe('utanHtmlKommentarer', () => {
  it('tar bort källanteckningar, omskrivningsnoter och kort-id', () => {
    const html = [
      '<!-- KÄLLA: https://example.se/ — "citat" (läst 2026-11-17) -->',
      '<p>Synlig mening.</p>',
      '<!-- OMSKRIVEN 2026-09-28. Borttaget utan källa. -->',
      '<!-- SKRIVEN 2026-09-30 (kort 08e7a3dd). Intern not. -->',
      '<p>Andra meningen.</p>',
    ].join('\n')

    const resultat = utanHtmlKommentarer(html)

    expect(resultat).not.toContain('<!--')
    expect(resultat).not.toContain('KÄLLA')
    expect(resultat).not.toContain('OMSKRIVEN')
    expect(resultat).not.toContain('08e7a3dd')
    expect(resultat).toContain('<p>Synlig mening.</p>')
    expect(resultat).toContain('<p>Andra meningen.</p>')
  })

  it('lämnar texten runt en kommentar inuti ett stycke orörd', () => {
    const html = '<p style="color:var(--txt2)"><!-- KÄLLA: internt -->\n2026 är midsommarafton i juni.</p>'
    expect(utanHtmlKommentarer(html)).toBe(
      '<p style="color:var(--txt2)">\n2026 är midsommarafton i juni.</p>',
    )
  })

  it('rör inte tankstreck som står i den synliga texten', () => {
    const html = '<p>Resan tar 20\u201326 minuter.</p>'
    expect(utanHtmlKommentarer(html)).toBe(html)
  })
})
