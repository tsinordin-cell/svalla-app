import { describe, it, expect } from 'vitest'
import { turArPublik } from './besokSynlighet'

const publik   = { visibility: 'public',  status: 'done',   deleted_at: null }
const privat   = { visibility: 'private', status: 'done',   deleted_at: null }
const raderad  = { visibility: 'public',  status: 'done',   deleted_at: '2026-11-17T10:00:00Z' }
const pagaende = { visibility: 'public',  status: 'active', deleted_at: null }

describe('turArPublik', () => {
  it('en klar, publik och inte raderad tur är publik', () => {
    expect(turArPublik(publik)).toBe(true)
  })

  it('privat, raderad och pågående tur är inte publik', () => {
    expect(turArPublik(privat)).toBe(false)
    expect(turArPublik(raderad)).toBe(false)
    expect(turArPublik(pagaende)).toBe(false)
  })

  it('en privat tur som dessutom är raderad är inte publik', () => {
    expect(turArPublik({ ...privat, deleted_at: '2026-11-17T10:00:00Z' })).toBe(false)
  })

  it('saknad tur är inte publik', () => {
    expect(turArPublik(null)).toBe(false)
    expect(turArPublik(undefined)).toBe(false)
  })

  it('okänt värde på synlighet räknas inte som publikt', () => {
    expect(turArPublik({ visibility: null, status: 'done', deleted_at: null })).toBe(false)
    expect(turArPublik({ visibility: 'friends', status: 'done', deleted_at: null })).toBe(false)
  })
})
