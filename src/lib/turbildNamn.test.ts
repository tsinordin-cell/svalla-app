import { describe, it, expect } from 'vitest'
import { turbildNamn, filandelse } from './turbildNamn'

const ANV = '9520b990-4818-45aa-88bc-c21081fdb05a'

describe('turbildNamn', () => {
  it('börjar med användarens id följt av bindestreck (kontoraderingen söker på det)', () => {
    expect(turbildNamn(ANV, 'bild.jpg').startsWith(`${ANV}-`)).toBe(true)
  })

  it('innehåller inget klockslag som går att gissa', () => {
    const namn = turbildNamn(ANV, 'bild.jpg')
    const rest = namn.slice(ANV.length + 1)
    // Det gamla mönstret var 13 siffror (millisekunder) direkt före filändelsen.
    expect(/^\d{10,}(-\d+)?\./.test(rest)).toBe(false)
  })

  it('ger olika namn varje gång, även i samma millisekund', () => {
    const namn = new Set(Array.from({ length: 200 }, () => turbildNamn(ANV, 'bild.jpg')))
    expect(namn.size).toBe(200)
  })

  it('har minst 122 slumpade bitar (ett UUID) i namnet', () => {
    const rest = turbildNamn(ANV, 'bild.jpg').slice(ANV.length + 1).replace(/\.jpg$/, '')
    expect(rest.replace(/-/g, '').length).toBeGreaterThanOrEqual(32)
  })

  it('behåller filändelsen', () => {
    expect(turbildNamn(ANV, 'IMG_0042.HEIC').endsWith('.heic')).toBe(true)
    expect(turbildNamn(ANV, 'tur.från.sandhamn.png').endsWith('.png')).toBe(true)
  })
})

describe('filandelse', () => {
  it('gör om till gemener', () => {
    expect(filandelse('A.JPG')).toBe('jpg')
  })

  it('faller tillbaka på jpg när ändelse saknas eller är konstig', () => {
    expect(filandelse('bild')).toBe('jpg')
    expect(filandelse('bild.')).toBe('jpg')
    expect(filandelse('bild.j/pg')).toBe('jpg')
    expect(filandelse('bild.väldigtlång')).toBe('jpg')
    expect(filandelse('')).toBe('jpg')
  })
})
