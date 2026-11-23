import { describe, it, expect } from 'vitest'
import { serializeForScript } from './serializeForScript'

describe('serializeForScript', () => {
  const elak = { name: '</script><script>alert(1)</script>', text: 'a & b <!-- x --> \u2028\u2029' }

  it('lämnar inga tecken som kan bryta en <script>-tagg', () => {
    const ut = serializeForScript(elak)
    expect(ut).not.toMatch(/[<>&\u2028\u2029]/)
    expect(ut.toLowerCase()).not.toContain('</script')
  })

  it('är fortfarande giltig JSON med samma innehåll', () => {
    expect(JSON.parse(serializeForScript(elak))).toEqual(elak)
  })

  it('ändrar inget för vanlig text', () => {
    const vanlig = { '@type': 'Place', name: 'Grinda', url: 'https://svalla.se/o/grinda' }
    expect(serializeForScript(vanlig)).toBe(JSON.stringify(vanlig))
  })

  it('tål undefined', () => {
    expect(serializeForScript(undefined)).toBe('')
  })
})
