'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Ark, ArkRad, Avatar, BildBubbla, DagAvdelare, IKON, Ikon, MeddelandeRad, RostBubbla, SamtalsHuvud, Sjokort, Skrivfalt, TextBubbla,
  TomtLage, TurKort, TurValjare, type KonvRadData, type TurVal,
} from '@/components/meddelanden/Delar'
import { rostFormat, useRostInspelning, type RostInspelning } from '@/lib/useRostInspelning'
import { PROV_M4A, PROV_WEBM } from './ljudprov'
import { InkorgVy } from '@/components/meddelanden/Inkorg'
import { Citat, MeddelandeMeny, ReaktionsRad, SvarsRad, REAKTIONER, type Reaktion } from '@/components/meddelanden/Meny'

// Påhittade samtal. Inga riktiga personer eller meddelanden.
const MIN = 60_000
const nu = Date.now()
const iso = (msSedan: number) => new Date(nu - msSedan).toISOString()

const RADER: KonvRadData[] = [
  { id: 'a', namn: 'Elin Berg', nyckel: 'elinberg', bild: null, tid: iso(4 * MIN), text: 'Vi ligger vid gästbryggan, kom förbi!', duSkrev: false, last: null, olasta: 2, forfragan: false, vantar: false },
  { id: 'b', namn: 'Johan Ek', nyckel: 'johanek', bild: null, tid: iso(52 * MIN), text: 'Låter bra, vi ses i Sandhamn', duSkrev: true, last: true, olasta: 0, forfragan: false, vantar: false },
  { id: 'c', namn: 'Segelgänget', nyckel: 'segelganget', bild: null, tid: iso(3 * 60 * MIN), text: 'Maja: Någon som har plats för två till?', duSkrev: false, last: null, olasta: 0, forfragan: false, vantar: false },
  { id: 'd', namn: 'Karin Lund', nyckel: 'karinlund', bild: null, tid: iso(26 * 60 * MIN), text: 'Tack för tipset om Grinda', duSkrev: true, last: false, olasta: 0, forfragan: false, vantar: false },
  { id: 'e', namn: 'Oskar Nyberg', nyckel: 'oskarnyberg', bild: null, tid: iso(3 * 24 * 60 * MIN), text: 'Hej! Säljer du fortfarande fendrarna?', duSkrev: false, last: null, olasta: 0, forfragan: true, vantar: false },
  { id: 'f', namn: 'Lisa Holm', nyckel: 'lisaholm', bild: null, tid: iso(9 * 24 * 60 * MIN), text: null, duSkrev: false, last: null, olasta: 0, forfragan: false, vantar: true },
]

type M = { id: string; mine: boolean; tid: string; text?: string; typ?: 'bild' | 'geo' | 'tur' | 'rost'; svar?: string; ljud?: 'm4a' | 'webm' | string; sek?: number }
const SAMTAL: M[] = [
  { id: '1', mine: false, tid: iso(26 * 60 * MIN), text: 'Hej! Ska ni ut i helgen?' },
  { id: '2', mine: true, tid: iso(26 * 60 * MIN - MIN), text: 'Ja, vi tänkte gå mot Sandhamn på lördag om vinden håller.' },
  { id: '3', mine: true, tid: iso(26 * 60 * MIN - 2 * MIN), typ: 'tur' },
  { id: '4', mine: false, tid: iso(40 * MIN), text: 'Vi är redan här sedan i morse' },
  { id: '5', mine: false, tid: iso(39 * MIN), typ: 'geo' },
  { id: '6', mine: false, tid: iso(38 * MIN), text: 'Vi ligger vid gästbryggan, kom förbi!' },
  { id: '7', mine: true, tid: iso(12 * MIN), typ: 'bild' },
  { id: '8', mine: true, tid: iso(11 * MIN), text: 'Vi rundar Korsö nu. Om en timme ungefär!', svar: '6' },
  // Röstmeddelanden: Elins klipp har Chromes format (WebM), ditt har iPhones (M4A).
  { id: '9', mine: false, tid: iso(6 * MIN), typ: 'rost', ljud: 'webm', sek: 6 },
  { id: '10', mine: true, tid: iso(5 * MIN), typ: 'rost', ljud: 'm4a', sek: 6 },
]

// Påhittade reaktioner. "jag" är den som tittar, "elin" den andra.
const START_REAKTIONER: Reaktion[] = [
  { id: 'r1', message_id: '2', user_id: 'elin', emoji: REAKTIONER[1] },
  { id: 'r2', message_id: '6', user_id: 'jag', emoji: REAKTIONER[0] },
  { id: 'r3', message_id: '7', user_id: 'elin', emoji: REAKTIONER[0] },
  { id: 'r4', message_id: '7', user_id: 'jag', emoji: REAKTIONER[0] },
]

function kortText(m: M) {
  if (m.text) return m.text
  return m.typ === 'bild' ? 'Bild' : m.typ === 'geo' ? 'Position' : m.typ === 'tur' ? 'Tur' : m.typ === 'rost' ? 'Röstmeddelande' : 'Meddelande'
}

/**
 * ?meny=andra|egen: öppnar den nya menyn på Elins eller ett eget meddelande.
 * ?meny=fore: den gamla menyn (samma kod som på svalla.se före ändringen), för jämförelse.
 * ?svar=1: visar raden "Svarar Elin Berg" ovanför skrivfältet.
 * ?db=nej: som innan databasändringen är körd: inga reaktioner, inget Svara.
 * ?plus=tur: turväljaren, ?plus=inga: turväljaren utan turer,
 * ?plus=privat: frågan som kommer när man väljer en privat tur.
 * ?pek=1: visar kameraknappen även med mus, så att telefonens skrivfält går att fota på dator.
 * ?rost=spelar|klar: inspelningsraden mitt i en inspelning, eller stoppad vid två minuter.
 * ?rost=prov: visar vilket format webbläsaren spelar in i. Utan rost= fungerar mikrofonen på riktigt:
 *   klippet stannar i webbläsaren och läggs sist i samtalet, inget laddas upp.
 */
export default function Forhandsvisning({ vy, tema, meny, svar, db, plus, pek, rost }: { vy: string; tema?: string; meny?: string; svar?: string; db?: string; plus?: string; pek?: string; rost?: string }) {
  // ?tema=mork|ljust: sätter samma inställning som appens temaväljare (bara i förhandsversionens webbläsare).
  useEffect(() => {
    if (tema !== 'mork' && tema !== 'ljust') return
    const t = tema === 'mork' ? 'dark' : 'light'
    try { localStorage.setItem('svalla-theme', t) } catch { /* privat läge */ }
    document.documentElement.setAttribute('data-theme', t)
  }, [tema])
  const [text, setText] = useState('')
  const [flik, setFlik] = useState<'active' | 'requests'>('active')
  const [sok, setSok] = useState('')
  const iSamtal = vy === 'samtal'
  const lage = vy === 'laddar' ? 'laddar' : vy === 'utloggad' ? 'utloggad' : vy === 'fel' ? 'fel' : 'klar'
  const tomInkorg = vy === 'tom'
  const synliga = tomInkorg ? [] : RADER.filter(r => (flik === 'requests' ? r.forfragan : !r.forfragan))
    .filter(r => !sok || r.namn.toLowerCase().includes(sok.toLowerCase()))

  return (
    <div className={`md-fv${pek === '1' ? ' md-fv--pek' : ''}`}>
      <div className="md-fv-meny" aria-hidden="true">Appens sidomeny<br />(oförändrad)</div>
      <div className={`md-ram md-rot ${iSamtal ? 'md-ram--samtal' : 'md-ram--inkorg'}`}>
        <aside className="md-ram-lista" aria-label="Meddelanden">
          <InkorgVy
            lage={lage}
            rader={synliga}
            aktivaAntal={tomInkorg ? 0 : RADER.filter(r => !r.forfragan).length}
            forfragningarAntal={tomInkorg ? 0 : RADER.filter(r => r.forfragan).length}
            flik={flik} setFlik={setFlik} sok={sok} setSok={setSok}
            valtId={iSamtal ? 'a' : null}
            onForsokIgen={() => {}}
            hrefFor={() => '/designforslag/meddelanden?vy=samtal'}
          />
        </aside>
        <section className="md-ram-innehall">
          {iSamtal ? <Samtal text={text} setText={setText} startMeny={meny} startSvar={svar === '1'} medDb={db !== 'nej'} startPlus={plus} rostLage={rost} /> : (
            <div className="md-valj">
              <TomtLage ikon={IKON.pratbubbla} rubrik="Dina meddelanden" text="Välj någon till vänster eller skriv ett nytt meddelande." />
            </div>
          )}
        </section>
      </div>
      <style>{`
        .fb-flytande{display:none!important}
        .md-fv--pek .md-rund--kamera{display:flex!important}
        .md-fv-meny{display:none}
        @media (min-width:1024px){
          .md-fv{padding-left:220px}
          .md-fv-meny{display:flex;position:fixed;left:0;top:0;bottom:0;width:220px;align-items:center;justify-content:center;text-align:center;
            font-size:13px;line-height:1.5;color:var(--txt3);background:var(--white);border-right:1px solid var(--md-linje)}
        }
      `}</style>
    </div>
  )
}

const TURER: TurVal[] = [
  { id: 't1', location_name: 'Stavsnäs till Sandhamn', distance: 9.4, image: '/og-image.jpg', started_at: '2026-08-14T08:10:00Z', created_at: null, visibility: 'public' },
  { id: 't2', location_name: 'Runt Grinda', distance: 6.2, image: null, started_at: '2026-08-02T11:30:00Z', created_at: null, visibility: 'private' },
  { id: 't3', location_name: 'Vaxholm till Finnhamn', distance: 14.8, image: '/og-image.jpg', started_at: '2026-07-21T07:45:00Z', created_at: null, visibility: 'public' },
]

const NIVAER = [0.1, 0.2, 0.45, 0.7, 0.5, 0.3, 0.6, 0.85, 0.55, 0.35, 0.2, 0.4, 0.75, 0.9, 0.6, 0.3, 0.15, 0.35, 0.65, 0.8,
  0.5, 0.25, 0.45, 0.7, 0.4, 0.2, 0.55, 0.3]

/** Provklippen som blob-länkar, som de riktiga klippens länkar från lagringen. */
function useProvLankar(): Record<string, string> {
  const [lankar, setLankar] = useState<Record<string, string>>({})
  useEffect(() => {
    const blob = (b64: string, typ: string) => URL.createObjectURL(new Blob([Uint8Array.from(atob(b64), c => c.charCodeAt(0))], { type: typ }))
    const l = { m4a: blob(PROV_M4A, 'audio/mp4'), webm: blob(PROV_WEBM, 'audio/webm') }
    setLankar(l)
    return () => Object.values(l).forEach(u => URL.revokeObjectURL(u))
  }, [])
  return lankar
}

function Samtal({ text, setText, startMeny, startSvar, medDb, startPlus, rostLage }: {
  text: string; setText: (t: string) => void; startMeny?: string; startSvar: boolean; medDb: boolean; startPlus?: string; rostLage?: string
}) {
  const [plusLage, setPlusLage] = useState<string | null>(startPlus ?? null)
  const provLankar = useProvLankar()
  // Egna inspelningar i förhandsvisningen. De stannar i webbläsaren.
  const [egna, setEgna] = useState<M[]>([])
  const [egnaLankar, setEgnaLankar] = useState<Record<string, string>>({})
  const riktig = useRostInspelning({
    onKlipp: async ({ blob, sekunder }) => {
      const nyckel = `egen-${Date.now()}`
      setEgnaLankar(prev => ({ ...prev, [nyckel]: URL.createObjectURL(blob) }))
      setEgna(prev => [...prev, { id: nyckel, mine: true, tid: new Date().toISOString(), typ: 'rost', ljud: nyckel, sek: sekunder }])
      setTimeout(() => { if (flode.current) flode.current.scrollTop = flode.current.scrollHeight }, 50)
    },
    onFel: t => window.alert(t),
  })
  const lasad: RostInspelning | null = rostLage === 'spelar' || rostLage === 'klar'
    ? { kan: true, lage: rostLage, sekunder: rostLage === 'klar' ? 120 : 14, nivaer: NIVAER, starta: () => {}, avbryt: () => {}, skicka: () => {} }
    : null
  const [format, setFormat] = useState<string | null>(null)
  useEffect(() => { setFormat(rostFormat()?.mime ?? 'kan inte spela in') }, [])
  const ALLA = [...SAMTAL, ...egna]
  const sista = ALLA.length - 1
  const [reaktioner, setReaktioner] = useState<Reaktion[]>(medDb ? START_REAKTIONER : [])
  const [svarPa, setSvarPa] = useState<string | null>(startSvar && medDb ? '4' : null)
  const [meny, setMeny] = useState<{ id: string; rect: { top: number; left: number; right: number; height: number } } | null>(null)
  const [gammal, setGammal] = useState(false)
  const [markerad, setMarkerad] = useState<string | null>(null)
  const tryck = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Som riktiga samtalet: börja längst ned, vid det senaste meddelandet.
  const flode = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ned = () => { if (flode.current) flode.current.scrollTop = flode.current.scrollHeight }
    ned()
    const t = [setTimeout(ned, 400), setTimeout(ned, 1500)]
    return () => t.forEach(clearTimeout)
  }, [])

  const oppna = useCallback((id: string, el?: Element | null) => {
    const kol = el ?? document.querySelector(`#m-${id} .md-kol`)
    if (!kol) return
    const r = kol.getBoundingClientRect()
    setMeny({ id, rect: { top: r.top, left: r.left, right: r.right, height: r.height } })
  }, [])

  // Öppna en meny direkt via adressen, efter att flödet scrollats färdigt.
  useEffect(() => {
    if (!startMeny) return
    const t = setTimeout(() => {
      if (startMeny === 'fore') setGammal(true)
      else oppna(startMeny === 'egen' ? '8' : '6')
    }, 1700)
    return () => clearTimeout(t)
  }, [startMeny, oppna])

  const stang = useCallback(() => setMeny(null), [])

  function reagera(id: string, emoji: string) {
    setReaktioner(prev => {
      const min = prev.find(r => r.message_id === id && r.user_id === 'jag')
      const utan = prev.filter(r => r !== min)
      return min?.emoji === emoji ? utan : [...utan, { id: `r-${id}-${emoji}`, message_id: id, user_id: 'jag', emoji }]
    })
  }

  function hoppa(id: string) {
    document.getElementById(`m-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setMarkerad(id)
    setTimeout(() => setMarkerad(null), 1600)
  }

  const byId = new Map(ALLA.map(m => [m.id, m]))
  const vem = (m: M) => (m.mine ? 'Du' : 'Elin Berg')

  function bubblor(m: M, iMeny = false) {
    const orig = medDb && m.svar ? byId.get(m.svar) : undefined
    return (
      <>
        {orig && <Citat vem={vem(orig)} text={kortText(orig)} onTryck={iMeny ? undefined : () => hoppa(orig.id)} />}
        {m.typ === 'bild' && <BildBubbla src="/og-image.jpg" />}
        {m.typ === 'geo' && <Sjokort meta={{ lat: 59.2893, lng: 18.9098, accuracy: 12, location_name: 'Sandhamn, vid sjöstationen' }} href={null} onKopiera={() => {}} />}
        {m.typ === 'rost' && <RostBubbla src={m.ljud ? (provLankar[m.ljud] ?? egnaLankar[m.ljud]) : undefined} meta={{ duration: m.sek ?? null }} />}
        {m.typ === 'tur' && <TurKort meta={{ location_name: 'Stavsnäs till Sandhamn', distance: 9.4, image: '/og-image.jpg' }} />}
        {m.text && <TextBubbla text={m.text} />}
      </>
    )
  }

  const menyM = meny ? byId.get(meny.id) : undefined
  const svarM = svarPa ? byId.get(svarPa) : undefined

  return (
    <div className="md-samtal md-rot">
      <SamtalsHuvud namn="Elin Berg" nyckel="elinberg" bild={null} profilHref={null} under="Visa profil" onMer={() => {}} />
      {rostLage === 'prov' && (
        <div className="md-banner md-banner--info"><div className="md-banner-ruta">
          <strong>Prova röstmeddelanden</strong>
          <p style={{ marginBottom: 0 }}>
            Den här webbläsaren spelar in som {format ?? '…'}. Elins klipp har Chromes format, ditt har iPhones.
            Tryck på mikrofonen för att prova att spela in. Inget laddas upp.
          </p>
        </div></div>
      )}
      <div className="md-flode" ref={flode}>
        <div className="md-flode-inre">
          {ALLA.map((m, i) => {
            const fore = ALLA[i - 1]
            const efter = ALLA[i + 1]
            const nyDag = !fore || new Date(fore.tid).toDateString() !== new Date(m.tid).toDateString()
            const nyGrupp = nyDag || !fore || fore.mine !== m.mine || new Date(m.tid).getTime() - new Date(fore.tid).getTime() > 5 * MIN
            const sist = !efter || efter.mine !== m.mine || new Date(efter.tid).getTime() - new Date(m.tid).getTime() > 5 * MIN ||
              new Date(efter.tid).toDateString() !== new Date(m.tid).toDateString()
            return (
              <div key={m.id}>
                {nyDag && <DagAvdelare iso={m.tid} />}
                <MeddelandeRad mine={m.mine} nyGrupp={nyGrupp} sist={sist} tid={m.tid} sett={i === sista}
                  radId={`m-${m.id}`} markerad={markerad === m.id}
                  avatar={<Avatar namn="Elin Berg" nyckel="elinberg" s={28} />}
                  handlers={{
                    onTouchStart: e => { const el = e.currentTarget; tryck.current = setTimeout(() => oppna(m.id, el), 420) },
                    onTouchEnd: () => { if (tryck.current) clearTimeout(tryck.current) },
                    onTouchMove: () => { if (tryck.current) clearTimeout(tryck.current) },
                    onContextMenu: e => { e.preventDefault(); oppna(m.id, e.currentTarget) },
                  }}
                  under={medDb && (
                    <ReaktionsRad lista={reaktioner.filter(r => r.message_id === m.id)} me="jag" mine={m.mine} onTryck={e => reagera(m.id, e)} />
                  )}
                  atgarder={
                    <>
                      {medDb && (
                        <button type="button" className="md-hover-knapp" aria-label="Svara" title="Svara" onClick={() => setSvarPa(m.id)}>
                          <Ikon d={IKON.svar} s={17} w={1.9} />
                        </button>
                      )}
                      <button type="button" className="md-hover-knapp" aria-label={medDb ? 'Reagera och fler val' : 'Fler val'}
                        title={medDb ? 'Reagera' : 'Fler val'}
                        onClick={e => oppna(m.id, e.currentTarget.closest('.md-rad')?.querySelector('.md-kol'))}>
                        <Ikon d={medDb ? IKON.smil : IKON.mer} s={17} w={1.9} />
                      </button>
                    </>
                  }>
                  {bubblor(m)}
                </MeddelandeRad>
              </div>
            )
          })}
        </div>
      </div>
      <Skrivfalt text={text} setText={setText} onSkicka={() => { setText(''); setSvarPa(null) }} kanSkicka={!!text.trim()}
        placeholder="Meddelande…" onBild={() => {}} onPosition={() => {}} onTur={() => setPlusLage('tur')} onKamera={() => {}} laddarBild={false}
        rost={lasad ?? riktig}
        ovanfor={svarM ? <SvarsRad vem={svarM.mine ? 'dig själv' : 'Elin Berg'} text={kortText(svarM)} onAvbryt={() => setSvarPa(null)} /> : null} />

      {meny && menyM && (
        <MeddelandeMeny
          key={menyM.id}
          rect={meny.rect}
          mine={menyM.mine}
          innehall={bubblor(menyM, true)}
          reaktioner={medDb}
          minReaktion={reaktioner.find(r => r.message_id === menyM.id && r.user_id === 'jag')?.emoji ?? null}
          onReagera={e => { stang(); reagera(menyM.id, e) }}
          onSvara={medDb ? () => { stang(); setSvarPa(menyM.id) } : undefined}
          onKopiera={menyM.text ? stang : undefined}
          onRadera={menyM.mine ? stang : undefined}
          onAnmal={!menyM.mine ? stang : undefined}
          onStang={stang}
        />
      )}

      {(plusLage === 'tur' || plusLage === 'inga') && (
        <TurValjare turer={plusLage === 'inga' ? [] : TURER} fel={false}
          onValj={t => setPlusLage(t.visibility === 'private' ? 'privat' : null)} onStang={() => setPlusLage(null)} />
      )}
      {plusLage === 'privat' && (
        <Ark onStang={() => setPlusLage(null)} etikett="Turen är privat">
          <div className="md-ark-text">
            <h2>Turen är privat</h2>
            <p>Andra kan inte öppna en privat tur. Vill du göra den synlig för alla och skicka den?</p>
          </div>
          <div className="md-ark-knappar">
            <button type="button" className="md-ark-ja md-ark-ja--vanlig" onClick={() => setPlusLage(null)}>Gör synlig och skicka</button>
            <button type="button" className="md-ark-nej" onClick={() => setPlusLage(null)}>Avbryt</button>
          </div>
        </Ark>
      )}

      {/* Den gamla menyn, oförändrad, för före-bilder (?meny=fore). */}
      {gammal && (
        <Ark onStang={() => setGammal(false)} etikett="Åtgärder för meddelandet">
          <ArkRad ikon={IKON.flagga} label="Anmäl meddelande" fara onClick={() => setGammal(false)} />
          <ArkRad ikon={IKON.stang} label="Avbryt" onClick={() => setGammal(false)} />
        </Ark>
      )}
    </div>
  )
}
