import { describe, expect, it } from 'vitest'
import { formatCspRapport, tolkaCspRapporter, utanQuery } from './cspRapport'

describe('tolkaCspRapporter', () => {
  it('läser report-to-formatet (Chrome/Safari)', () => {
    const text = JSON.stringify([
      {
        type: 'csp-violation',
        body: {
          effectiveDirective: 'script-src-attr',
          blockedURL: 'inline',
          documentURL: 'https://svalla.se/oar?code=hemligt#x',
          sourceFile: 'https://svalla.se/_next/static/chunks/a.js',
          lineNumber: 12,
          sample: 'alert(1)',
        },
      },
      { type: 'deprecation', body: { id: 'x' } },
    ])
    const r = tolkaCspRapporter(text)
    expect(r).toHaveLength(1)
    expect(r[0]).toEqual({
      direktiv: 'script-src-attr',
      blockerat: 'inline',
      sida: 'https://svalla.se/oar',
      kalla: 'https://svalla.se/_next/static/chunks/a.js',
      rad: 12,
      utdrag: 'alert(1)',
    })
  })

  it('läser report-uri-formatet (Firefox)', () => {
    const text = JSON.stringify({
      'csp-report': {
        'violated-directive': 'connect-src',
        'blocked-uri': 'https://evil.example/x?token=abc',
        'document-uri': 'https://svalla.se/',
      },
    })
    const [r] = tolkaCspRapporter(text)
    expect(r?.direktiv).toBe('connect-src')
    expect(r?.blockerat).toBe('https://evil.example/x')
    expect(r?.rad).toBeNull()
  })

  it('tål skräp utan att kasta', () => {
    expect(tolkaCspRapporter('inte json')).toEqual([])
    expect(tolkaCspRapporter('null')).toEqual([])
    expect(tolkaCspRapporter('[1,"a",null]')).toEqual([])
    expect(tolkaCspRapporter('{"csp-report":"x"}')).toEqual([])
  })
})

describe('utanQuery', () => {
  it('tar bort query och fragment', () => {
    expect(utanQuery('https://a.se/b?c=d')).toBe('https://a.se/b')
    expect(utanQuery('https://a.se/b#c')).toBe('https://a.se/b')
    expect(utanQuery(42)).toBe('')
  })
})

describe('formatCspRapport', () => {
  it('ger en rad även när fälten innehåller radbrytningar', () => {
    const rad = formatCspRapport({ direktiv: 'a\nb', blockerat: '', sida: '', kalla: '', rad: null, utdrag: 'x\ny' })
    expect(rad.includes('\n')).toBe(false)
    expect(rad.startsWith('[csp] ')).toBe(true)
  })
})
