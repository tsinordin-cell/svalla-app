import { describe, it, expect } from 'vitest'
import { stadaKampanj } from '@/lib/kampanj'
describe('stadaKampanj', () => {
  it('städar', () => {
    expect(stadaKampanj('TikTok-Bio')).toBe('tiktok-bio')
    expect(stadaKampanj('qr strömkajen')).toBe('qrstrmkajen')
    expect(stadaKampanj('a')).toBeNull()
    expect(stadaKampanj(5)).toBeNull()
    expect(stadaKampanj('x'.repeat(60))?.length).toBe(40)
  })
})
