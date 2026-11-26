// Mallreglerna från mallarnas runda 5 (2026-11-10): kajakens grad, avreseorten och klockslag i FAQ-svaren.
import { describe, it, expect } from 'vitest'
import { kajakGrad, fardsattFran, utanKlockslagsmeningar, meningar, fardUtanKlockslag, utanKlockslag, arButik, arOrt, klockslagsregler, aktivitetsUndertitel, barnAktivitet } from './mallRegler'
import { stryksKlockslag } from './klockslagStrykning'

describe('kajakGrad', () => {
  it('visar en grad eller ett spann ur datan', () => {
    expect(kajakGrad({ difficulty: 'lätt' })?.text).toBe('Lätt')
    expect(kajakGrad({ difficulty: 'medel' })?.text).toBe('Medel')
    expect(kajakGrad({ difficulty: 'svår' })?.text).toBe('Svår')
    expect(kajakGrad({ difficulty: 'lätt–medel' })?.text).toBe('Lätt till medel')
    expect(kajakGrad({ difficulty: 'lätt-medel' })?.text).toBe('Lätt till medel')
    expect(kajakGrad({ difficulty: 'medel–svår' })?.text).toBe('Medel till svår')
    expect(kajakGrad({ difficulty: 'lätt–medel', difficultyFor: 'guidade turer' })?.text).toBe('Lätt till medel (guidade turer)')
    // Main skriver intervall med "till" sedan PR #540 (Djurö och Tjärö: 'lätt till medel'; mallarnas runda 7).
    expect(kajakGrad({ difficulty: 'lätt till medel' })?.text).toBe('Lätt till medel')
  })

  it('ger ingen grad när värdet saknas eller är okänt, aldrig "Svår"', () => {
    expect(kajakGrad(undefined)).toBeNull()
    expect(kajakGrad({})).toBeNull()
    expect(kajakGrad({ difficulty: '' })).toBeNull()
    expect(kajakGrad({ difficulty: 'Easy' })).toBeNull()
    expect(kajakGrad({ difficulty: 'medel–lätt' })).toBeNull()
    expect(kajakGrad({ difficulty: 'lätt–medel–svår' })).toBeNull()
  })
})

describe('fardsattFran', () => {
  it('skriver inte avreseorten två gånger', () => {
    expect(fardsattFran('Waxholmsbåt från Stavsnäs', 'Stavsnäs vinterhamn')).toBe('Waxholmsbåt från Stavsnäs')
    expect(fardsattFran('Båt med guidad rundvandring från Djupvik', 'Djupvik (Eksta, Gotland)')).toBe('Båt med guidad rundvandring från Djupvik')
    expect(fardsattFran('Dagstursbåt från Oskarshamn', 'Ölandskajen, Oskarshamn')).toBe('Dagstursbåt från Oskarshamn')
    expect(fardsattFran('Båt från Värmdö', 'Lillsved eller Boda')).toBe('Båt från Värmdö (Lillsved eller Boda)')
    expect(fardsattFran('Waxholmsbåt', 'Strömkajen')).toBe('Waxholmsbåt från Strömkajen')
    expect(fardsattFran('Bil', undefined)).toBe('Bil')
  })

  // Kontrollantens fynd ma5026: "Taxi- eller charterbåt från Varierar", "Egen båt från Valfri hamn" (runda 6).
  it('skriver inte "från" när from inte är en ort', () => {
    expect(fardsattFran('Taxi- eller charterbåt', 'Varierar')).toBe('Taxi- eller charterbåt')
    expect(fardsattFran('Egen båt', 'Valfri hamn')).toBe('Egen båt')
    expect(fardsattFran('Kajak', 'Egen utgångspunkt')).toBe('Kajak')
    expect(fardsattFran('Flyg', 'Flera svenska städer')).toBe('Flyg')
    expect(fardsattFran('Andra rederier', 'Runt Mälaren')).toBe('Andra rederier')
    expect(fardsattFran('Fritidsbåt', 'Lidingö eller valfri brygga')).toBe('Fritidsbåt från Lidingö eller valfri brygga')
  })
})

describe('utanKlockslagsmeningar', () => {
  it('stryker meningar med klockslag och låter resten stå', () => {
    expect(utanKlockslagsmeningar('Båten går från Djupvik. Avgång 09.00, tillbaka i Djupvik senast 13.30. Boka i förväg.'))
      .toBe('Båten går från Djupvik. Boka i förväg.')
    expect(utanKlockslagsmeningar('Restid ca 1,5 tim.')).toBe('Restid ca 1,5 tim.')
    expect(utanKlockslagsmeningar('Avgång 09.00.')).toBe('')
  })

  // Kontrollantens fynd ma5011 (omkontrollen av runda 5): delningen klippte efter "kl." och "t.ex." och lämnade fragment,
  // och "kl. 08–18" utan minuter stod kvar (mallarnas runda 6, 2026-11-16).
  it('klipper inte vid förkortningar och lämnar inga fragment', () => {
    expect(utanKlockslagsmeningar('Samma båt och avgångsdagar som från Nynäshamn. 1–26 juli går båten kl. 08.00 från Fårösund och är tillbaka vid 21-tiden, vilket ger dagsbesökare runt sju timmar på ön.'))
      .toBe('Samma båt och avgångsdagar som från Nynäshamn.')
    expect(utanKlockslagsmeningar('Hotellets RIB-båt ingår i vistelsen. Den går kl. 12.00 från Marstrand eller kl. 12.30 från Rönnäng, och hemresan går kl. 10.30. Från Rönnäng brukar överfarten upplevas som något mjukare.'))
      .toBe('Hotellets RIB-båt ingår i vistelsen. Från Rönnäng brukar överfarten upplevas som något mjukare.')
    expect(utanKlockslagsmeningar('Närtrafiken går mellan Bräkne-Hoby station och Tjäröbåten i Järnavik alla dagar kl. 08–18. Boka hos Blekingetrafiken.'))
      .toBe('Boka hos Blekingetrafiken.')
    expect(utanKlockslagsmeningar('Resan måste beställas minst 1 timme före avgång, dock senast kl. 17.00. Tidtabellen gäller 2 april–18 juni.'))
      .toBe('Tidtabellen gäller 2 april–18 juni.')
  })

  it('stryker en parentes med klockslag och låter resten av meningen stå', () => {
    expect(utanKlockslagsmeningar('Direktturerna tar 2 tim 15 min–3 tim i hösttabellen 2026 (t.ex. lördag 08.35–10.50). Maj–september går även Cinderellabåtarna.'))
      .toBe('Direktturerna tar 2 tim 15 min–3 tim i hösttabellen 2026. Maj–september går även Cinderellabåtarna.')
    expect(utanKlockslagsmeningar('Linje 290 fortsätter till Öckerö (t.ex. 09.12 → Öckerö färjeläge 10.12). Turerna går morgon och eftermiddag.'))
      .toBe('Linje 290 fortsätter till Öckerö. Turerna går morgon och eftermiddag.')
  })
})

describe('meningar', () => {
  it('delar vid meningsslut men inte efter förkortningar', () => {
    expect(meningar('Bussen går bl.a. Singöbron södra. Sju turer om dagen.')).toEqual(['Bussen går bl.a. Singöbron södra.', 'Sju turer om dagen.'])
    expect(meningar('Båten går året runt. 1 september till 31 maj kör den färre turer.')).toEqual(['Båten går året runt.', '1 september till 31 maj kör den färre turer.'])
    expect(meningar('Restid ca 45–50 min. Vissa turer angör bara efter beställning.')).toEqual(['Restid ca 45–50 min.', 'Vissa turer angör bara efter beställning.'])
    expect(meningar('Hamnen m.fl. ställen, t.ex. Gruvbryggan.')).toEqual(['Hamnen m.fl. ställen, t.ex. Gruvbryggan.'])
  })
})

describe('fardUtanKlockslag och utanKlockslag', () => {
  it('visar tiden bara när den inte är ett klockslag', () => {
    expect(fardUtanKlockslag({ method: 'Båt', time: '09.00–13.30', desc: 'Avgång 09.00. Högst sex personer per tur.' }))
      .toEqual({ method: 'Båt', time: undefined, desc: 'Högst sex personer per tur.' })
    expect(fardUtanKlockslag({ method: 'Båt', time: '35 min', desc: 'Båten går från Stavsnäs.' }).time).toBe('35 min')
  })

  it('stryker led med klockslag ur restiden, också utan minuter', () => {
    expect(utanKlockslag('Båt ca 1,5 tim från Oskarshamn; avgång 09.00, hemma 15.15 eller 16.15')).toBe('Båt ca 1,5 tim från Oskarshamn')
    expect(utanKlockslag('Buss och båt ca 2 tim; båten går kl. 9')).toBe('Buss och båt ca 2 tim')
  })

  // Kontrollantens fynd mo01-k046 (mallarnas runda 7, 2026-11-17): trafiktiden i en parentes stod kvar i turtätheten.
  it('stryker en parentes med timintervall och låter ledet stå', () => {
    expect(utanKlockslag('Vardagar 26 ordinarie turer Burö till Rörö (05 till 21), därtill kallelseturer nattetid'))
      .toBe('Vardagar 26 ordinarie turer Burö till Rörö, därtill kallelseturer nattetid')
    expect(utanKlockslag('Vardagar 26 ordinarie turer Burö–Rörö (05–21), därtill kallelseturer nattetid'))
      .toBe('Vardagar 26 ordinarie turer Burö–Rörö, därtill kallelseturer nattetid')
  })
})

// Mallarnas runda 7 (2026-11-17).
describe('arButik, arOrt och klockslagsregler', () => {
  it('räknar lanthandlar men inte kaféer som butiker (mo01-k040, k055)', () => {
    expect(arButik('Handel')).toBe(true)
    expect(arButik('Livsmedelsbutik')).toBe(true)
    expect(arButik('Café & lanthandel')).toBe(false)
    expect(arButik('Handelsbod, servering & pub')).toBe(false)
  })
  it('skriver inte "från" för värden som inte är orter', () => {
    expect(arOrt('Valfri hamn')).toBe(false)
    expect(arOrt('Varierar')).toBe(false)
    expect(arOrt('Stavsnäs')).toBe(true)
    expect(arOrt(undefined)).toBe(false)
  })
  it('lämnar texten orörd där strykningen är uppskjuten (Toms beslut 10)', () => {
    expect(klockslagsregler(false).utanKlockslag('avgång 09.00')).toBe('avgång 09.00')
    expect(klockslagsregler(true).utanKlockslag('Båt ca 1 tim; avgång 09.00')).toBe('Båt ca 1 tim')
    expect(stryksKlockslag('sandhamn', 'komma-dit')).toBe(true)
    expect(stryksKlockslag('svartloga', 'boende')).toBe(false)
  })
})

// Mallarnas runda 10 (2026-11-17).
describe('aktivitetsUndertitel (sm08-k006)', () => {
  it('räknar på, på och nära och nära för sig', () => {
    expect(aktivitetsUndertitel('Utö', { pa: 5, bada: 1, annan: 0 })).toBe('5 aktiviteter och upplevelser på Utö och en till på och nära ön')
    expect(aktivitetsUndertitel('Utö', { pa: 5, bada: 1, annan: 2 })).toBe('5 aktiviteter och upplevelser på Utö, en till på och nära ön och 2 till nära ön')
    expect(aktivitetsUndertitel('Vindö', { pa: 0, bada: 0, annan: 1 })).toBe('En aktivitet nära ön')
    expect(aktivitetsUndertitel('X', { pa: 1, bada: 0, annan: 0 })).toBe('En aktivitet på X')
    expect(aktivitetsUndertitel('X', { pa: 0, bada: 2, annan: 0 })).toBe('2 aktiviteter på och nära ön')
  })
})

describe('barnAktivitet (sm05-k003)', () => {
  it('tar inte med kort där bad bara nämns i förbigående', () => {
    expect(barnAktivitet({ name: 'Fiske', desc: 'I dag står fiske med bland det du kan göra på ön, tillsammans med vandring och bad.' })).toBe(false)
    expect(barnAktivitet({ name: 'Havskajak och sälsafari', desc: 'Guidad paddling bland kobbarna runt ön.' })).toBe(false)
    expect(barnAktivitet({ name: 'Kålsö', desc: 'Halvö med skog, hagar och strandängar.' })).toBe(false)
  })
  it('tar med bad, barn och cykel', () => {
    expect(barnAktivitet({ name: 'Klippbad', desc: '' })).toBe(true)
    expect(barnAktivitet({ name: 'Pinnevik', desc: 'Kommunal badplats i tätorten.' })).toBe(true)
    expect(barnAktivitet({ name: 'Cykling', desc: 'Grusvägar.' })).toBe(true)
    expect(barnAktivitet({ name: 'Naturstig', desc: 'Passar barnfamiljer.' })).toBe(true)
    expect(barnAktivitet({ name: 'Sandvik', desc: 'En vik med sandstrand där det går att bada.' })).toBe(true)
  })
})
