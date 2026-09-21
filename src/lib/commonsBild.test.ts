import { describe, it, expect } from 'vitest'
import { commonsThumb } from './commonsBild'

describe('commonsThumb', () => {
  it('byter storlekssteg i en miniatyr-URL', () => {
    const u = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Grinda_V%C3%A4rdshuset.jpg/1280px-Grinda_V%C3%A4rdshuset.jpg'
    expect(commonsThumb(u, 250)).toBe('https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Grinda_V%C3%A4rdshuset.jpg/250px-Grinda_V%C3%A4rdshuset.jpg')
  })
  it('lämnar originalfiler orörda', () => {
    const u = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Foo.jpg'
    expect(commonsThumb(u, 250)).toBe(u)
  })
})
