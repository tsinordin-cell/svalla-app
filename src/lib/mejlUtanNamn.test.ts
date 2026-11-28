import { describe, it, expect } from 'vitest'
import { renderEmail, utanNamnOmDetSaknas } from './email'

describe('mejl när namnet saknas (2026-11-28)', () => {
  it('tar bort namnet först i meningen när det saknas', () => {
    expect(utanNamnOmDetSaknas('{{first_name}}, alla åker till Sandhamn.', 'där')).toBe('Alla åker till Sandhamn.')
    expect(utanNamnOmDetSaknas('# {{first_name}}: välkommen ombord.', '')).toBe('# Välkommen ombord.')
    expect(utanNamnOmDetSaknas('{{first_name}}, {{visited_count}} öar.', undefined)).toBe('{{visited_count}} öar.')
  })

  it('lämnar mallen orörd när namnet finns, och "Hej {{first_name}}" alltid', () => {
    expect(utanNamnOmDetSaknas('{{first_name}}, alla åker', 'Anna')).toBe('{{first_name}}, alla åker')
    expect(utanNamnOmDetSaknas('# Hej {{first_name}}', 'där')).toBe('# Hej {{first_name}}')
  })

  it('dag 7-mejlet utan namn börjar inte med "där,"', () => {
    const utan = renderEmail('day7', { first_name: 'där' })
    expect(utan.subject).toBe('Alla åker till Sandhamn. Du är inte alla.')
    expect(utan.html).not.toMatch(/>\s*där, alla åker/)
    const med = renderEmail('day7', { first_name: 'Anna' })
    expect(med.subject).toBe('Anna, alla åker till Sandhamn. Du är inte alla.')
  })

  it('inga mallar ger "där," eller "där:" när namnet saknas', () => {
    for (const mall of ['welcome', 'day7', 'season_open', 'season_close', 'weather_tip'] as const) {
      const r = renderEmail(mall, { first_name: 'där', visited_count: 3 })
      expect(r.subject ?? '', mall).not.toMatch(/^där[,:]/i)
      expect(r.html ?? '', mall).not.toMatch(/>\s*där[,:]/)
    }
  })
})
