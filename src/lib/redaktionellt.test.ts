import { describe, it, expect } from 'vitest'
import { arRedaktionellt } from './redaktionellt'

describe('forumets startinlägg', () => {
  it('de tolv startkontona känns igen', () => {
    expect(arRedaktionellt('00000000-c0c0-4a00-b000-000000000001')).toBe(true)
    expect(arRedaktionellt('00000000-c0c0-4a00-b000-00000000000C')).toBe(true)
  })
  it('riktiga konton och tomt märks inte', () => {
    expect(arRedaktionellt('9520b990-4818-45aa-88bc-c21081fdb05a')).toBe(false)
    expect(arRedaktionellt(null)).toBe(false)
    expect(arRedaktionellt(undefined)).toBe(false)
  })
})
