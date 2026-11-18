/**
 * FÖRHANDSVISNING 2026-11-18: områden att välja mellan på krog-, boende- och
 * hamnsidorna. Byggs ur regionLabel i island-data, så inget innehåll är nytt.
 */
import { ALL_ISLANDS } from '@/app/o/island-data'
import type { OmradeData } from '@/components/OmradesVal'

const OMRADEN: { namn: string; etiketter: string[] }[] = [
  { namn: 'Stockholms skärgård', etiketter: ['Innerskärgården', 'Norra skärgården', 'Norra ytterskärgården', 'Mellersta skärgården', 'Mellersta ytterskärgården', 'Södra skärgården', 'Södra ytterskärgården'] },
  { namn: 'Roslagen', etiketter: ['Roslagen'] },
  { namn: 'Sörmland', etiketter: ['Sörmlands skärgård'] },
  { namn: 'Östergötland', etiketter: ['Östergötlands skärgård'] },
  { namn: 'Kalmar och Öland', etiketter: ['Kalmar läns skärgård', 'Kalmarsund', 'Öland'] },
  { namn: 'Gotland', etiketter: ['Gotland'] },
  { namn: 'Blekinge', etiketter: ['Blekinge'] },
  { namn: 'Skåne och Öresund', etiketter: ['Skånes kust', 'Öresund'] },
  { namn: 'Halland', etiketter: ['Hallands skärgård'] },
  { namn: 'Göteborgs skärgård', etiketter: ['Göteborgs norra skärgård', 'Göteborgs skärgård', 'Göteborgs södra skärgård'] },
  { namn: 'Bohuslän', etiketter: ['Bohuslän'] },
  { namn: 'Norrlandskusten', etiketter: ['Gävleborgs skärgård', 'Höga Kusten', 'Västerbotten', 'Norrbottens skärgård'] },
  { namn: 'Insjöar', etiketter: ['Mälaren', 'Vänern', 'Vättern'] },
]

export function byggOmraden(vad: 'krogar' | 'boende' | 'hamnar'): OmradeData[] {
  return OMRADEN.map(o => {
    const oar = ALL_ISLANDS.filter(i => i.regionLabel && o.etiketter.includes(i.regionLabel))
    const platser = oar.flatMap(i => {
      if (vad === 'krogar') return (i.restaurants ?? []).map(r => ({ name: r.name, typ: r.type, o: i.name, oSlug: i.slug }))
      if (vad === 'boende') return (i.accommodation ?? []).map(a => ({ name: a.name, typ: a.type, o: i.name, oSlug: i.slug }))
      return (i.harbors ?? []).map(h => ({ name: h.name, typ: h.fuel ? 'Gästhamn med bränsle' : 'Gästhamn', o: i.name, oSlug: i.slug }))
    })
    return { namn: o.namn, platser }
  })
}
