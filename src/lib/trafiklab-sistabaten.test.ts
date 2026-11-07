import { describe, it, expect } from 'vitest'
import { valjSistaBaten, type TripLeg, type TripSummary } from './trafiklab'

// Sista båten 2026-11-03: hemresan får fortsätta med buss eller tåg, men
// benet som lämnar ön ska vara en båt, och resan ska komma fram samma dag.
const DAG = '2026-11-03'

function ben(typ: 'farja' | 'buss' | 'tag', fran: string, till: string, fromTime: string, toTime: string): TripLeg {
  const kod = typ === 'farja' ? { catCode: '8', cls: '256' } : typ === 'buss' ? { catCode: '7', cls: '128' } : { catCode: '4', cls: '16' }
  return { category: typ, operator: null, line: '1', fromName: fran, fromTime, toName: till, toTime, isWalk: false, ...kod }
}

function resa(legs: TripLeg[], opts: { startDate?: string; endDate?: string } = {}): TripSummary {
  return {
    durationMin: 0,
    startTime: legs[0]!.fromTime,
    startDate: opts.startDate ?? DAG,
    endTime: legs[legs.length - 1]!.toTime,
    endDate: opts.endDate ?? DAG,
    changes: legs.length - 1,
    legs,
    allLegs: legs,
  }
}

describe('valjSistaBaten', () => {
  it('Vaxholm: en senare resa med buss och tunnelbana räknas inte som sista båten', () => {
    const bat = resa([ben('farja', 'Vaxholm Hotellkajen', 'Strömkajen', '18:25', '19:35')])
    const buss = resa([ben('buss', 'Västerhamnsplan', 'Tekniska högskolan', '20:02', '20:50'), ben('tag', 'Tekniska högskolan', 'T-Centralen', '20:55', '21:02')])
    expect(valjSistaBaten([buss, bat], DAG, 'start')).toBe(bat)
  })

  it('Sandhamn: båt till Stavsnäs och sedan buss räknas på hemresan', () => {
    const hem = resa([ben('farja', 'Sandhamn', 'Stavsnäs vinterhamn', '16:00', '16:40'), ben('buss', 'Stavsnäs vinterhamn', 'Slussen', '16:50', '17:45')])
    expect(valjSistaBaten([hem], DAG, 'start')).toBe(hem)
  })

  it('Utö: på resan dit räknas den som slutar med båten till ön', () => {
    const dit = resa([ben('tag', 'Stockholm C', 'Västerhaninge', '15:00', '15:30'), ben('buss', 'Västerhaninge', 'Årsta brygga', '15:40', '16:05'), ben('farja', 'Årsta brygga', 'Utö Gruvbryggan', '16:15', '17:00')])
    const utanBat = resa([ben('tag', 'Stockholm C', 'Västerhaninge', '18:00', '18:30'), ben('buss', 'Västerhaninge', 'Årsta brygga', '18:40', '19:05')])
    expect(valjSistaBaten([dit, utanBat], DAG, 'slut')).toBe(dit)
  })

  it('en resa som kommer fram nästa dag är ingen väg hem i dag', () => {
    const over = resa([ben('farja', 'Resarö', 'Vaxholm', '18:41', '18:55'), ben('farja', 'Vaxholm', 'Strömkajen', '06:30', '07:37')], { endDate: '2026-11-04' })
    expect(valjSistaBaten([over], DAG, 'start')).toBeNull()
  })

  it('resor som startar en annan dag räknas inte', () => {
    const imorgon = resa([ben('farja', 'Styrsö Bratten', 'Saltholmen', '06:10', '06:30')], { startDate: '2026-11-04', endDate: '2026-11-04' })
    expect(valjSistaBaten([imorgon], DAG, 'start')).toBeNull()
  })

  it('samma båt hem med två anslutningar: den som kommer fram först väljs', () => {
    const sen = resa([ben('farja', 'Utö Gruvbryggan', 'Årsta brygga', '21:00', '21:45'), ben('buss', 'Årsta brygga', 'Västerhaninge', '22:30', '22:55')])
    const tidig = resa([ben('farja', 'Utö Gruvbryggan', 'Årsta brygga', '21:00', '21:45'), ben('buss', 'Årsta brygga', 'Västerhaninge', '21:55', '22:20')])
    expect(valjSistaBaten([tidig, sen], DAG, 'start')).toBe(tidig)
  })

  it('senaste båten vinner, även när en tidigare båt har en senare anslutning', () => {
    const tidigBat = resa([ben('farja', 'Ö', 'Fastland', '17:00', '17:30'), ben('buss', 'Fastland', 'Stad', '22:00', '23:00')])
    const senBat = resa([ben('farja', 'Ö', 'Fastland', '19:00', '19:30'), ben('buss', 'Fastland', 'Stad', '19:40', '20:30')])
    expect(valjSistaBaten([senBat, tidigBat], DAG, 'start')).toBe(senBat)
  })

  it('utan datum för ankomsten släpps resan igenom (hellre visa än gissa)', () => {
    const r = resa([ben('farja', 'Ö', 'Fastland', '17:00', '17:30')])
    delete r.endDate
    expect(valjSistaBaten([r], DAG, 'start')).toBe(r)
  })
})
