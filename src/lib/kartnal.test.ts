import { describe, expect, it } from 'vitest'
import { pinHtml } from './kartnal'

describe('pinHtml', () => {
  it('växer och får en ring när platskortet är öppet', () => {
    const vald = pinHtml('krog', true, true)
    expect(vald).toContain('class="pin-ring"')
    expect(vald).toContain('scale(1.2)')
  })

  it('ritar ingen ring vid vanlig hover', () => {
    expect(pinHtml('krog', true)).not.toContain('pin-ring')
    expect(pinHtml('krog', false)).not.toContain('scale(1.2)')
  })
})