import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { VILLKOR_SOKVAG, VILLKOR_VERSION, kontrolleraVillkor, villkorsGodkannande } from './villkor'

const KOM_IGANG = readFileSync(join(__dirname, '../app/kom-igang/page.tsx'), 'utf8')

describe('villkorsGodkannande', () => {
  it('sparar tidpunkt och version', () => {
    const nu = new Date('2026-11-22T12:00:00Z')
    expect(villkorsGodkannande(nu)).toEqual({
      villkor_godkanda_at: '2026-11-22T12:00:00.000Z',
      villkor_version: VILLKOR_VERSION,
    })
  })
})

describe('kontrolleraVillkor', () => {
  it('stoppar kontot när rutan inte är ikryssad', () => {
    expect(kontrolleraVillkor(false)).toMatch(/användarvillkoren/)
  })
  it('släpper igenom när rutan är ikryssad', () => {
    expect(kontrolleraVillkor(true)).toBeNull()
  })
})

describe('/kom-igang', () => {
  it('har en kryssruta för villkoren som skickas med vid registreringen', () => {
    expect(KOM_IGANG).toContain('type="checkbox"')
    expect(KOM_IGANG).toContain('VILLKOR_SOKVAG')
    expect(KOM_IGANG).toContain('...villkorsGodkannande()')
    expect(VILLKOR_SOKVAG).toBe('/villkor')
  })
})
