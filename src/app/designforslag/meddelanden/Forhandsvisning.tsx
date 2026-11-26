'use client'

import { useState } from 'react'
import {
  Avatar, BildBubbla, DagAvdelare, IKON, MeddelandeRad, SamtalsHuvud, Sjokort, Skrivfalt, TextBubbla,
  TomtLage, TurKort, type KonvRadData,
} from '@/components/meddelanden/Delar'
import { InkorgVy } from '@/components/meddelanden/Inkorg'

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

type M = { id: string; mine: boolean; tid: string; text?: string; typ?: 'bild' | 'geo' | 'tur' }
const SAMTAL: M[] = [
  { id: '1', mine: false, tid: iso(26 * 60 * MIN), text: 'Hej! Ska ni ut i helgen?' },
  { id: '2', mine: true, tid: iso(26 * 60 * MIN - MIN), text: 'Ja, vi tänkte gå mot Sandhamn på lördag om vinden håller.' },
  { id: '3', mine: true, tid: iso(26 * 60 * MIN - 2 * MIN), typ: 'tur' },
  { id: '4', mine: false, tid: iso(40 * MIN), text: 'Vi är redan här sedan i morse' },
  { id: '5', mine: false, tid: iso(39 * MIN), typ: 'geo' },
  { id: '6', mine: false, tid: iso(38 * MIN), text: 'Vi ligger vid gästbryggan, kom förbi!' },
  { id: '7', mine: true, tid: iso(12 * MIN), typ: 'bild' },
  { id: '8', mine: true, tid: iso(11 * MIN), text: 'Vi rundar Korsö nu. Om en timme ungefär!' },
]

export default function Forhandsvisning({ vy }: { vy: string }) {
  const [text, setText] = useState('')
  const [flik, setFlik] = useState<'active' | 'requests'>('active')
  const [sok, setSok] = useState('')
  const iSamtal = vy === 'samtal'
  const lage = vy === 'laddar' ? 'laddar' : vy === 'utloggad' ? 'utloggad' : vy === 'fel' ? 'fel' : 'klar'
  const tomInkorg = vy === 'tom'
  const synliga = tomInkorg ? [] : RADER.filter(r => (flik === 'requests' ? r.forfragan : !r.forfragan))
    .filter(r => !sok || r.namn.toLowerCase().includes(sok.toLowerCase()))

  return (
    <div className="md-fv">
      <div className="md-fv-meny" aria-hidden="true">Appens sidomeny<br />(oförändrad)</div>
      <div className={`md-ram md-rot ${iSamtal ? 'md-ram--samtal' : 'md-ram--inkorg'}`}>
        <aside className="md-ram-lista" aria-label="Samtal">
          <InkorgVy
            lage={lage}
            rader={synliga}
            aktivaAntal={tomInkorg ? 0 : RADER.filter(r => !r.forfragan).length}
            forfragningarAntal={tomInkorg ? 0 : RADER.filter(r => r.forfragan).length}
            flik={flik} setFlik={setFlik} sok={sok} setSok={setSok}
            valtId={iSamtal || vy === 'inkorg' ? 'a' : null}
            onForsokIgen={() => {}}
            hrefFor={() => '/designforslag/meddelanden?vy=samtal'}
          />
        </aside>
        <section className="md-ram-innehall">
          {iSamtal || vy === 'inkorg' ? <Samtal text={text} setText={setText} /> : (
            <div className="md-valj">
              <TomtLage ikon={IKON.pratbubbla} rubrik="Välj ett samtal" text="Dina samtal finns till vänster. Du kan också starta ett nytt." />
            </div>
          )}
        </section>
      </div>
      <style>{`
        .fb-flytande{display:none!important}
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

function Samtal({ text, setText }: { text: string; setText: (t: string) => void }) {
  const sista = SAMTAL.length - 1
  return (
    <div className="md-samtal md-rot">
      <SamtalsHuvud namn="Elin Berg" nyckel="elinberg" bild={null} profilHref={null} under="Visa profil" onMer={() => {}} />
      <div className="md-flode">
        <div className="md-flode-inre">
          {SAMTAL.map((m, i) => {
            const fore = SAMTAL[i - 1]
            const efter = SAMTAL[i + 1]
            const nyDag = !fore || new Date(fore.tid).toDateString() !== new Date(m.tid).toDateString()
            const nyGrupp = nyDag || !fore || fore.mine !== m.mine || new Date(m.tid).getTime() - new Date(fore.tid).getTime() > 5 * MIN
            const sist = !efter || efter.mine !== m.mine || new Date(efter.tid).getTime() - new Date(m.tid).getTime() > 5 * MIN ||
              new Date(efter.tid).toDateString() !== new Date(m.tid).toDateString()
            return (
              <div key={m.id}>
                {nyDag && <DagAvdelare iso={m.tid} />}
                <MeddelandeRad mine={m.mine} nyGrupp={nyGrupp} sist={sist} tid={m.tid} sett={i === sista}
                  avatar={<Avatar namn="Elin Berg" nyckel="elinberg" s={28} />}>
                  {m.typ === 'bild' && <BildBubbla src="/og-image.jpg" />}
                  {m.typ === 'geo' && <Sjokort meta={{ lat: 59.2794, lng: 18.9123, accuracy: 12, location_name: 'Sandhamn, gästhamnen' }} href={null} onKopiera={() => {}} />}
                  {m.typ === 'tur' && <TurKort meta={{ location_name: 'Stavsnäs till Sandhamn', distance: 9.4, image: '/og-image.jpg' }} />}
                  {m.text && <TextBubbla text={m.text} />}
                </MeddelandeRad>
              </div>
            )
          })}
        </div>
      </div>
      <Skrivfalt text={text} setText={setText} onSkicka={() => setText('')} kanSkicka={!!text.trim()}
        placeholder="Skriv ett meddelande…" onBild={() => {}} onPosition={() => {}} laddarBild={false} delarPosition={false} />
    </div>
  )
}
