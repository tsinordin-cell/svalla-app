'use client'
/**
 * Förslag E, Navet (Max 2026-11-27): ösidan som ett kort nav i stället för ett långt dokument.
 *
 * Navet: kort topp med foto, valen "Vad vill du göra?" direkt under, Svallas urval i en karusell,
 * Bra att veta, och Allt om ön som hopfällda rader. Varje val öppnar en egen kort vy (?bana=) med
 * fast tillbaka-rad. Webbläsarens bakåtknapp tar besökaren tillbaka till navet.
 *
 * Den befintliga texten från servern ligger kvar i HTML (för Google) men visas bara när den öppnas.
 * Inspiration: Kauai (valen direkt efter ingressen), VisitScotland Skye (fakta i korthet, tydlig väg
 * tillbaka), Köpenhamn och NYC Tourism (fotokort i karuseller per tema), Lofoten (val efter situation),
 * Visit Norway (partner tydligt märkta efter det redaktionella).
 */
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { OsidaData } from './OsidaForslag'
import { platsbild, vagbild } from '@/lib/platsbilder'

type Foto = { url: string; fotograf: string; licens: string }
type EKort = { namn: string; etikett?: string; text: string; sasong?: string; foto?: Foto; ikon: string; href: string }
type VirtKey = '__krogar' | '__boenden' | '__gora'
type Vag = {
  id: string
  namn: string
  fraga: string
  ikon: string
  partner?: VirtKey
  steg: { rubrik: string; delar: string[] }[]
  lankar: (slug: string) => { text: string; href: string }[]
}

const VAGAR: Vag[] = [
  {
    id: 'dag', namn: 'Över dagen', fraga: 'Dit och hem samma dag', ikon: 'ship', partner: '__krogar',
    steg: [
      { rubrik: 'Ta dig dit och hem igen', delar: ['avgang', 'sistabat', 'dit'] },
      { rubrik: 'Ät lunch', delar: ['__krogar'] },
      { rubrik: 'Upptäck ön', delar: ['__gora', 'tips'] },
      { rubrik: 'Bra att veta', delar: ['sasong', 'faq'] },
    ],
    lankar: s => [{ text: 'Båtar och färjor', href: '/farjor' }, { text: 'Komma dit', href: '/o/' + s + '/komma-dit' }],
  },
  {
    id: 'bo', namn: 'Bo över', fraga: 'Var kan jag sova?', ikon: 'bed', partner: '__boenden',
    steg: [
      { rubrik: 'Välj boende', delar: ['__boenden'] },
      { rubrik: 'Ät middag', delar: ['__krogar'] },
      { rubrik: 'Vad gör man här', delar: ['__gora', 'tips'] },
      { rubrik: 'Ta dig dit', delar: ['avgang', 'dit', 'sasong'] },
    ],
    lankar: s => [{ text: 'Alla boenden', href: '/o/' + s + '/boende' }],
  },
  {
    id: 'bat', namn: 'Med egen båt', fraga: 'Var lägger jag till?', ikon: 'anchor', partner: '__krogar',
    steg: [
      { rubrik: 'Lägg till', delar: ['hamn'] },
      { rubrik: 'Krogar nära bryggan', delar: ['__krogar'] },
      { rubrik: 'Service på ön', delar: ['hantverk', 'tips'] },
      { rubrik: 'Bra att veta', delar: ['sasong', 'faq'] },
    ],
    lankar: s => [{ text: 'Hamnar och bryggor', href: '/o/' + s + '/hamnar' }, { text: 'Alla hamnar', href: '/hamnar-och-bryggor' }],
  },
  {
    id: 'barn', namn: 'Med barn', fraga: 'Bad och lek', ikon: 'child', partner: '__gora',
    steg: [
      { rubrik: 'Bada och leka', delar: ['__gora'] },
      { rubrik: 'Fika och mat', delar: ['__krogar'] },
      { rubrik: 'Ta dig dit', delar: ['avgang', 'sistabat', 'dit'] },
      { rubrik: 'Bra att veta', delar: ['tips', 'faq'] },
    ],
    lankar: s => [{ text: 'Med barn', href: '/o/' + s + '/med-barn' }, { text: 'Bad', href: '/o/' + s + '/bad' }],
  },
  {
    id: 'aktiv', namn: 'Aktiv', fraga: 'Natur, stigar och vatten', ikon: 'walk', partner: '__gora',
    steg: [
      { rubrik: 'Vad kan man göra', delar: ['__gora'] },
      { rubrik: 'Tips från oss', delar: ['tips'] },
      { rubrik: 'Ta dig dit', delar: ['avgang', 'dit'] },
      { rubrik: 'Mat på vägen', delar: ['__krogar'] },
    ],
    lankar: s => [{ text: 'Aktiviteter', href: '/o/' + s + '/aktiviteter' }, { text: 'Rutter', href: '/rutter' }],
  },
  {
    id: 'bor', namn: 'Jag bor här', fraga: 'Båten, hantverkare, grannar', ikon: 'island',
    steg: [
      { rubrik: 'Båtarna', delar: ['avgang', 'sistabat', 'dit'] },
      { rubrik: 'Hantverkare och service', delar: ['hantverk', 'hamn'] },
      { rubrik: 'Fråga grannarna', delar: ['forum'] },
      { rubrik: 'Om ön', delar: ['fakta', 'kallor'] },
    ],
    lankar: s => [{ text: 'Hantverkare', href: '/o/' + s + '/hantverkare' }, { text: 'Skärgårdens datum', href: '/skargardsdatum' }],
  },
]
const FORSTA: Vag = {
  id: 'visa', namn: 'Första gången', fraga: 'Visa mig ön', ikon: 'compass',
  steg: [
    { rubrik: 'Det här är ön', delar: ['visste', 'om'] },
    { rubrik: 'Höjdpunkter', delar: ['__gora'] },
    { rubrik: 'Ät och bo', delar: ['__krogar', '__boenden'] },
    { rubrik: 'Ta dig dit', delar: ['dit', 'sasong'] },
  ],
  lankar: s => [{ text: 'Komma dit', href: '/o/' + s + '/komma-dit' }, { text: 'Allt att göra', href: '/o/' + s + '/aktiviteter' }],
}
const ALLA_VAGAR = [...VAGAR, FORSTA]

/* Raderna under Allt om ön. Etiketten byts mot avsnittets egen rubrik när den finns. */
const ALLT: { k: string; etikett: string }[] = [
  { k: 'om', etikett: 'Om ön' },
  { k: 'dit', etikett: 'Ta sig dit' },
  { k: 'sistabat', etikett: 'Sista båten' },
  { k: 'mat', etikett: 'Mat och dryck' },
  { k: 'bo', etikett: 'Boende' },
  { k: 'gora', etikett: 'Se och göra' },
  { k: 'hamn', etikett: 'Hamnar och service' },
  { k: 'faq', etikett: 'Vanliga frågor' },
  { k: 'tips', etikett: 'Tips från oss' },
  { k: 'hantverk', etikett: 'Hantverkare och service' },
  { k: 'sasong', etikett: 'Bäst tid att besöka' },
  { k: 'visste', etikett: 'Visste du att' },
  { k: 'fakta', etikett: 'Fakta' },
  { k: 'mer', etikett: 'Mer om ön' },
  { k: 'guider', etikett: 'Guider' },
  { k: 'besok', etikett: 'Besök också' },
  { k: 'forum', etikett: 'Forum' },
  { k: 'kallor', etikett: 'Källor' },
]
const SYNLIGA_RADER = 8

function plats(v: Vag, k: string): number {
  for (let si = 0; si < v.steg.length; si++) {
    const i = v.steg[si]!.delar.indexOf(k)
    if (i >= 0) return 100 * (si + 1) + (i + 1) * 2
  }
  return -1
}

function tomAvgang(el: HTMLElement) {
  return /Inga avgångar/.test(el.textContent ?? '')
}

function Ikon({ namn, klass }: { namn: string; klass?: string }) {
  const [src, setSrc] = useState('/ikoner/' + namn + '.webp')
  const [syns, setSyns] = useState(true)
  if (!syns) return null
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" aria-hidden="true" className={klass ?? 'e-ikon'} onError={() => { if (src.endsWith('/island.webp')) setSyns(false); else setSrc('/ikoner/island.webp') }} />
}

function FotoKort({ k }: { k: EKort }) {
  return (
    <a href={k.href} className={'e-kort ' + (k.foto ? 'e-kort-foto' : 'e-kort-mal')} style={k.foto ? { backgroundImage: "url('" + k.foto.url + "')" } : undefined}>
      {!k.foto && <Ikon namn={k.ikon} klass="e-kort-ikon" />}
      <span className="e-kort-text">
        {k.etikett && <small>{k.etikett}</small>}
        <b>{k.namn}</b>
        <span className="e-kort-besk">{k.text}</span>
        {k.sasong && <i>Säsong: {k.sasong}</i>}
        {k.foto && <em>Foto: {k.foto.fotograf}, {k.foto.licens}</em>}
      </span>
    </a>
  )
}

function PartnerKort() {
  return (
    <a href="/partner" className="e-kort e-partner">
      <span className="e-partner-etikett">Samarbetspartner · exempel</span>
      <b>Din verksamhet här</b>
      <span>Riktigt foto, öppettider, bokningsknapp och ett erbjudande. Tydligt märkt, och övriga ställen visas som vanligt.</span>
      <i>Synas på ön →</i>
    </a>
  )
}

function Karusell({ kort, partner }: { kort: EKort[]; partner?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const flytta = (d: number) => { const el = ref.current; if (el) el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: 'smooth' }) }
  const lista: (EKort | 'partner')[] = [...kort.filter(k => k.foto), ...kort.filter(k => !k.foto)]
  if (partner) lista.splice(Math.min(1, lista.length), 0, 'partner')
  return (
    <div className="e-kar-ram">
      <div className="e-kar" ref={ref}>
        {lista.map((k, i) => k === 'partner' ? <PartnerKort key="partner" /> : <FotoKort key={k.namn + i} k={k} />)}
      </div>
      {lista.length > 3 && (
        <div className="e-pilar">
          <button type="button" aria-label="Föregående" onClick={() => flytta(-1)}>←</button>
          <button type="button" aria-label="Nästa" onClick={() => flytta(1)}>→</button>
        </div>
      )}
    </div>
  )
}

export default function OsidaE({ data, nyckel }: { data: OsidaData; nyckel: (el: HTMLElement) => string }) {
  const [vag, setVag] = useState<string | null>(null)
  const [senast, setSenast] = useState<string | null>(null)
  const [oppna, setOppna] = useState<Record<string, boolean>>({})
  const [flerRader, setFlerRader] = useState(false)
  const [hosts, setHosts] = useState<Record<string, HTMLElement>>({})
  const [rader, setRader] = useState<{ k: string; etikett: string }[]>([])

  const slug = data.slug
  const aktiv = ALLA_VAGAR.find(v => v.id === vag) ?? null

  const kort: Record<VirtKey, EKort[]> = {
    __krogar: data.krogar.map(k => ({ namn: k.namn, etikett: k.typ, text: k.text, ikon: 'utensils', href: '/o/' + slug + '/restauranger', ...(k.sasong ? { sasong: k.sasong } : {}), ...(k.foto ? { foto: k.foto } : {}) })),
    __boenden: data.boenden.map(k => ({ namn: k.namn, etikett: k.typ, text: k.text, ikon: 'bed', href: '/o/' + slug + '/boende', ...(k.foto ? { foto: k.foto } : {}) })),
    __gora: data.gora.map(g => { const f = platsbild(slug, g.namn); return { namn: g.namn, etikett: 'Göra', text: g.text, ikon: g.ikon, href: '/o/' + slug + '/aktiviteter', ...(f ? { foto: f } : {}) } }),
  }

  // Start: läs vald väg ur adressen, skapa platser för navets rader och vägarnas steg.
  useEffect(() => {
    const las = () => {
      const b = new URLSearchParams(window.location.search).get('bana')
      setVag(b && ALLA_VAGAR.some(v => v.id === b) ? b : null)
    }
    las()
    try { setSenast(window.localStorage.getItem('svalla-bana')) } catch { /* privat läge */ }
    window.addEventListener('popstate', las)
    const hd = document.querySelector('header')
    if (hd) {
      const pos = getComputedStyle(hd).position
      document.documentElement.style.setProperty('--e-topp', pos === 'sticky' || pos === 'fixed' ? hd.offsetHeight + 'px' : '0px')
    }
    const c = document.getElementById('osida-innehall')
    const h: Record<string, HTMLElement> = {}
    const klick = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const el = t.closest('[data-eklamp]') as HTMLElement | null
      if (!el || t.closest('a,button,input,select,textarea,summary,label')) return
      e.preventDefault()
      const k = el.dataset.osdel
      if (k) setOppna(o => ({ ...o, ['v:' + k]: true }))
    }
    if (c) {
      const finns = new Map<string, string>()
      for (const el of Array.from(c.children) as HTMLElement[]) {
        if (el.dataset.ehost) continue
        const k = nyckel(el)
        el.dataset.osdel = k
        if (k === 'avgang' && tomAvgang(el)) continue
        if (!finns.has(k)) finns.set(k, el.querySelector('h2')?.textContent?.trim() ?? '')
      }
      setRader(ALLT.filter(a => finns.has(a.k)).map(a => ({ k: a.k, etikett: finns.get(a.k) || a.etikett })))
      const ny = (id: string) => {
        const d = document.createElement('div')
        d.dataset.ehost = id
        d.dataset.osdel = '__e'
        c.appendChild(d)
        h[id] = d
      }
      ny('allt')
      ALLT.forEach(a => ny('rad-' + a.k))
      ny('fler')
      for (let i = 0; i < 4; i++) ny('steg-' + i)
      ny('v__krogar'); ny('v__boenden'); ny('v__gora')
      ny('slut')
      setHosts(h)
      c.addEventListener('click', klick)
    }
    return () => {
      window.removeEventListener('popstate', las)
      Object.values(h).forEach(d => d.remove())
      if (c) {
        c.removeEventListener('click', klick)
        c.style.removeProperty('max-width')
        for (const el of Array.from(c.children) as HTMLElement[]) { el.removeAttribute('data-eklamp'); el.style.removeProperty('display'); el.style.removeProperty('order') }
      }
    }
  }, [nyckel])

  // Ordna innehållet efter navet eller vald väg.
  useEffect(() => {
    const c = document.getElementById('osida-innehall')
    if (!c) return
    const hero = document.getElementById('osida-hero')
    if (hero) hero.style.display = 'none'
    c.style.display = 'flex'
    c.style.flexDirection = 'column'
    c.style.maxWidth = '1088px'
    let forstaEpost = true
    for (const el of Array.from(c.children) as HTMLElement[]) {
      el.style.removeProperty('display')
      el.style.removeProperty('order')
      el.removeAttribute('data-eklamp')
      el.removeAttribute('data-kapitel')
      const id = el.dataset.ehost
      if (id) {
        let ord = -1
        if (!aktiv) {
          if (id === 'allt') ord = 296
          else if (id === 'fler') ord = rader.length > SYNLIGA_RADER && !flerRader ? 300 + 4 * SYNLIGA_RADER - 1 : -1
          else if (id.startsWith('rad-')) {
            const i = rader.findIndex(r => 'rad-' + r.k === id)
            ord = i < 0 || (i >= SYNLIGA_RADER && !flerRader) ? -1 : 300 + 4 * i
          }
        } else {
          if (id.startsWith('steg-')) { const si = Number(id.slice(5)); ord = aktiv.steg[si] ? 100 * (si + 1) : -1 }
          else if (id.startsWith('v__')) ord = plats(aktiv, id.slice(1))
          else if (id === 'slut') ord = 980
        }
        if (ord < 0) el.style.display = 'none'
        else el.style.order = String(ord)
        continue
      }
      const k = el.dataset.osdel ?? nyckel(el)
      if (k.startsWith('__') || k === 'foto' || k === 'lankar') { el.style.display = 'none'; continue }
      if (k === 'epost') {
        if (forstaEpost || aktiv) el.style.display = 'none'
        else el.style.order = '990'
        forstaEpost = false
        continue
      }
      if (k === 'ovrigt') { if (aktiv) el.style.display = 'none'; else el.style.order = '995'; continue }
      if (!aktiv) {
        const i = rader.findIndex(r => r.k === k)
        if (i < 0 || !oppna[k] || (k === 'avgang' && tomAvgang(el))) { el.style.display = 'none'; continue }
        el.style.order = String(300 + 4 * i + 2)
      } else {
        const pos = plats(aktiv, k)
        if (pos < 0 || (k === 'avgang' && tomAvgang(el))) { el.style.display = 'none'; continue }
        el.style.order = String(pos + 1)
        if (!oppna['v:' + k] && el.scrollHeight > 560) el.dataset.eklamp = '1'
      }
    }
  }, [aktiv, rader, oppna, flerRader, hosts, nyckel])

  const valj = (id: string) => {
    setVag(id)
    setSenast(id)
    try { window.localStorage.setItem('svalla-bana', id) } catch { /* privat läge */ }
    const u = new URL(window.location.href)
    u.searchParams.set('bana', id)
    window.history.pushState({ eNav: true }, '', u.toString())
    window.scrollTo({ top: 0 })
  }

  const tillbaka = () => {
    const st = window.history.state as { eNav?: boolean } | null
    if (st?.eNav) window.history.back()
    else {
      const u = new URL(window.location.href)
      u.searchParams.delete('bana')
      window.history.replaceState(null, '', u.toString())
      setVag(null)
    }
    setTimeout(() => document.getElementById('e-val')?.scrollIntoView({ block: 'start' }), 80)
  }

  const vaxla = (k: string) => setOppna(o => ({ ...o, [k]: !o[k] }))

  const urval: EKort[] = [
    ...kort.__krogar.slice(0, 1).map(k => ({ ...k, etikett: 'Äta' })),
    ...kort.__boenden.slice(0, 1).map(k => ({ ...k, etikett: 'Bo' })),
    ...kort.__gora.filter(g => g.foto).slice(0, 2),
  ]

  const restidKort = (data.restid.split(' · ')[0] ?? data.restid).trim()
  const topbild = aktiv ? (vagbild(slug, aktiv.id) ?? data.foto) : data.foto

  return (
    <>
      <style>{CSS}</style>

      {!aktiv ? (
        <>
          <header className="e-topp" style={data.foto ? { backgroundImage: "url('" + data.foto.url + "')" } : undefined}>
            <div className="e-topp-inre">
              <nav className="e-smulor" aria-label="Brödsmulor"><a href="/">Hem</a> › <a href={data.regionHref}>{data.region}</a> › <span>{data.namn}</span></nav>
              <h1 className="e-h1">{data.namn}</h1>
              <p className="e-tagline">{data.tagline}</p>
              <div className="e-chips">
                {data.restid && <a href={'/o/' + slug + '/komma-dit'} className="e-chip e-chip-lank" title={data.restid} aria-label={'Ta dig till ' + data.namn + ': ' + data.restid}><Ikon namn="ship" klass="e-chip-ikon" /><span>{restidKort}</span><i aria-hidden="true">→</i></a>}
                {data.sasong && <span className="e-chip"><Ikon namn="sun" klass="e-chip-ikon" /><span>{data.sasong}</span></span>}
              </div>
            </div>
            {data.foto && <div className="e-kredit">Foto: {data.foto.fotograf}, {data.foto.licens}</div>}
          </header>

          <section className="e-val" id="e-val">
            <div className="e-inre">
              <div className="e-liten">Välj din väg</div>
              <h2 className="e-h2">Vad vill du göra på {data.namn}?</h2>
              {data.perfekt && <p className="e-passar"><b>Passar för</b> {data.perfekt}</p>}
              <div className="e-valgrid">
                {VAGAR.map(v => {
                  const f = vagbild(slug, v.id)
                  return (
                    <button key={v.id} type="button" className={'e-valkort ' + (f ? 'e-valkort-foto' : 'e-valkort-mal')} style={f ? { backgroundImage: "url('" + f.url + "')" } : undefined} onClick={() => valj(v.id)}>
                      {!f && <Ikon namn={v.ikon} klass="e-valkort-ikon" />}
                      {senast === v.id && <span className="e-senast">Ditt senaste val</span>}
                      <span className="e-valkort-text"><b>{v.namn}</b><span>{v.fraga}</span></span>
                    </button>
                  )
                })}
              </div>
              <button type="button" className="e-forsta" onClick={() => valj('visa')}>
                <Ikon namn="compass" klass="e-forsta-ikon" />
                <span><b>Första gången på {data.namn}?</b><span>Vi visar dig ön på fyra steg</span></span>
                <i>→</i>
              </button>
            </div>
          </section>

          {urval.length > 0 && (
            <section className="e-sektion">
              <div className="e-inre">
                <div className="e-rubrikrad">
                  <div><div className="e-liten">Svallas urval</div><h2 className="e-h2">Ett smakprov av {data.namn}</h2></div>
                </div>
                <nav className="e-snabb" aria-label={'Allt på ' + data.namn}>
                  {data.krogar.length > 0 && <a href={'/o/' + slug + '/restauranger'}>Äta <span>{data.krogar.length}</span></a>}
                  {data.boenden.length > 0 && <a href={'/o/' + slug + '/boende'}>Bo <span>{data.boenden.length}</span></a>}
                  {data.gora.length > 0 && <a href={'/o/' + slug + '/aktiviteter'}>Göra <span>{data.gora.length}</span></a>}
                </nav>
                <Karusell kort={urval} partner />
                <p className="e-not">Utvalt av Svalla. Ordningen bygger inte på betyg eller betalning.</p>
              </div>
            </section>
          )}

          <section className="e-sektion">
            <div className="e-inre">
              <div className="e-liten">Bra att veta</div>
              <div className="e-bra">
                <a href={'/o/' + slug + '/komma-dit'} className="e-bra-rad"><Ikon namn="ship" klass="e-bra-ikon" /><span><b>Ta dig hit och hem</b><span>{data.restid || 'Båtar, tider och bryggor'}</span></span><i>→</i></a>
                <a href={'/o/' + slug + '/hamnar'} className="e-bra-rad"><Ikon namn="anchor" klass="e-bra-ikon" /><span><b>Hamnar och bryggor</b><span>För dig som kommer med egen båt</span></span><i>→</i></a>
                <a href={'/o/' + slug + '/hantverkare'} className="e-bra-rad"><Ikon namn="map" klass="e-bra-ikon" /><span><b>Hantverkare och service</b><span>För dig som bor eller har stuga här</span></span><i>→</i></a>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <div className="e-bar">
            <button type="button" className="e-bak" onClick={tillbaka}>← {data.namn}</button>
            <div className="e-bar-steg">
              {aktiv.steg.map((s, i) => <a key={s.rubrik} href={'#e-steg-' + i}><span>{i + 1}</span>{s.rubrik}</a>)}
            </div>
          </div>
          <header className="e-vagtopp" style={topbild ? { backgroundImage: "url('" + topbild.url + "')" } : undefined}>
            <div className="e-topp-inre">
              <div className="e-liten e-ljus">Din väg på {data.namn}</div>
              <h1 className="e-h1 e-h1-vag">{aktiv.id === 'visa' ? 'Första gången på ' + data.namn : aktiv.namn + ' på ' + data.namn}</h1>
              <p className="e-tagline">{aktiv.fraga}</p>
            </div>
            {topbild && <div className="e-kredit">Foto: {topbild.fotograf}, {topbild.licens}</div>}
          </header>
        </>
      )}

      {hosts.allt && createPortal(
        <div className="e-allt">
          <div className="e-liten">Allt om {data.namn}</div>
          <h2 className="e-h2">Läs på i lugn och ro</h2>
          <p>Allt vi vet om ön, samlat. Tryck på en rubrik för att öppna.</p>
        </div>, hosts.allt)}
      {rader.map(r => hosts['rad-' + r.k] ? createPortal(
        <button type="button" className={'e-rad' + (oppna[r.k] ? ' e-rad-oppen' : '')} aria-expanded={!!oppna[r.k]} onClick={() => vaxla(r.k)}>
          <span>{r.etikett}</span><i aria-hidden="true" />
        </button>, hosts['rad-' + r.k]!, r.k) : null)}
      {hosts.fler && createPortal(
        <button type="button" className="e-fler" onClick={() => setFlerRader(true)}>Visa fler rubriker ({Math.max(0, rader.length - SYNLIGA_RADER)})</button>, hosts.fler)}

      {aktiv && aktiv.steg.map((s, si) => hosts['steg-' + si] ? createPortal(
        <div className="e-steghuvud" id={'e-steg-' + si}>
          <span className="e-stegnr">{si + 1}</span>
          <div><small>Steg {si + 1} av {aktiv.steg.length}</small><h2>{s.rubrik}</h2></div>
        </div>, hosts['steg-' + si]!, 'steg' + si) : null)}
      {aktiv && (['__krogar', '__boenden', '__gora'] as VirtKey[]).map(k => hosts['v' + k] && plats(aktiv, k) >= 0 ? createPortal(
        <div className="e-stegblock">
          <Karusell kort={kort[k]} partner={aktiv.partner === k} />
          <a className="e-allalank" href={kort[k][0]?.href ?? '/o/' + slug}>{k === '__krogar' ? 'Alla krogar och kaféer' : k === '__boenden' ? 'Alla boenden' : 'Allt att göra'} →</a>
        </div>, hosts['v' + k]!, k) : null)}
      {aktiv && hosts.slut && createPortal(
        <div className="e-slut">
          <div className="e-liten">Gå vidare</div>
          <div className="e-slutlankar">{aktiv.lankar(slug).map(l => <a key={l.href} href={l.href}>{l.text} →</a>)}</div>
          <div className="e-liten" style={{ marginTop: 22 }}>Eller välj en annan väg</div>
          <div className="e-andra">
            {[...VAGAR, FORSTA].filter(v => v.id !== aktiv.id).map(v => <button key={v.id} type="button" onClick={() => valj(v.id)}>{v.namn}</button>)}
          </div>
          <button type="button" className="e-tillbaka-stor" onClick={tillbaka}>← Tillbaka till {data.namn}</button>
        </div>, hosts.slut)}
    </>
  )
}

const CSS = `
#osida-hero{display:none}
.e-inre{max-width:1080px;margin:0 auto;padding:0 20px}
.e-liten{font:700 11.5px Inter,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#a8501a;margin:0 0 6px}
.e-ljus{color:#f2c27a}
.e-h2{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:clamp(26px,3.4vw,36px);line-height:1.12;color:#0d2440;margin:0;letter-spacing:-.01em}
.e-topp,.e-vagtopp{position:relative;display:flex;align-items:flex-end;color:#fff;background:#1e5c82 center/cover no-repeat}
.e-topp{height:clamp(380px,58vh,620px)}
.e-vagtopp{height:clamp(220px,32vh,340px)}
.e-topp::before,.e-vagtopp::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,24,38,.12) 0%,rgba(8,24,38,.3) 45%,rgba(8,24,38,.84) 100%)}
.e-topp-inre{text-shadow:0 1px 12px rgba(0,0,0,.35)}
.e-topp-inre{position:relative;width:100%;max-width:1080px;margin:0 auto;padding:0 20px 64px}
.e-vagtopp .e-topp-inre{padding-bottom:28px}
.e-smulor{font-size:12.5px;color:rgba(255,255,255,.85);margin-bottom:10px}
.e-smulor a{color:rgba(255,255,255,.92);text-decoration:none}
.e-h1{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:clamp(48px,9vw,96px);line-height:.95;margin:0 0 10px;letter-spacing:-.02em;color:#fff}
.e-h1-vag{font-size:clamp(34px,6vw,60px);line-height:1.02}
.e-tagline{font-size:clamp(16px,2vw,20px);line-height:1.45;margin:0 0 16px;max-width:44ch;color:rgba(255,255,255,.95)}
.e-chips{display:flex;flex-wrap:wrap;gap:8px}
.e-chip{display:inline-flex;align-items:center;gap:8px;max-width:100%;padding:7px 14px 7px 8px;border-radius:18px;text-shadow:none;background:rgba(255,253,248,.16);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.25);font:600 13px Inter,system-ui,sans-serif}
.e-chip>span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.e-chip-ikon{width:22px;height:22px;object-fit:contain}
.e-chip-lank{color:#fff;text-decoration:none;cursor:pointer;transition:background .2s ease}
.e-chip-lank:hover{background:rgba(255,253,248,.28)}
.e-chip i{font-style:normal;opacity:.9}
.e-passar{margin:8px 0 0;font-size:15px;line-height:1.5;color:#3d5865}
.e-passar b{color:#0d2440;margin-right:4px}
.e-kredit{position:absolute;right:12px;bottom:40px;font-size:10px;color:rgba(255,255,255,.7)}
.e-vagtopp .e-kredit{bottom:8px}
.e-val{position:relative;margin-top:-30px;background:#f7f1e7;border-radius:28px 28px 0 0;padding:26px 0 8px;scroll-margin-top:calc(var(--e-topp,0px) + 8px)}
.e-valgrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:18px}
.e-valkort{position:relative;display:flex;align-items:flex-end;height:200px;padding:16px;border-radius:20px;overflow:hidden;border:0;cursor:pointer;text-align:left;color:#fff;background:#1e5c82 center/cover no-repeat;font:inherit;transition:transform .25s ease,box-shadow .25s ease}
.e-valkort::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,24,38,0) 35%,rgba(8,24,38,.8) 100%);transition:opacity .25s ease}
.e-valkort:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(13,36,64,.18)}
.e-valkort:hover::before{opacity:.8}
.e-valkort-mal{background:linear-gradient(160deg,#fffaf1,#efe4d0);color:#0d2440;border:1px solid rgba(150,110,60,.18)}
.e-valkort-mal::before{display:none}
.e-valkort-ikon{position:absolute;top:14px;right:14px;width:64px;height:64px;object-fit:contain}
.e-valkort-text{position:relative;display:flex;flex-direction:column;gap:2px}
.e-valkort-text b{font-family:'Playfair Display',Georgia,serif;font-size:24px;line-height:1.1}
.e-valkort-text span{font-size:13.5px;opacity:.92}
.e-senast{position:absolute;top:12px;left:12px;z-index:1;font:700 10.5px Inter,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;background:#f2a25c;color:#0d2440;border-radius:999px;padding:5px 10px}
.e-forsta{display:flex;align-items:center;gap:14px;width:100%;margin-top:14px;padding:14px 18px;border-radius:18px;border:1px dashed rgba(30,92,130,.45);background:#fffdf8;color:#0d2440;cursor:pointer;text-align:left;font:inherit}
.e-forsta:hover{border-style:solid;border-color:#1e5c82}
.e-forsta-ikon{width:40px;height:40px;object-fit:contain;flex-shrink:0}
.e-forsta>span{display:flex;flex-direction:column;flex:1}
.e-forsta b{font-family:'Playfair Display',Georgia,serif;font-size:19px}
.e-forsta>span>span{font-size:13.5px;color:#3d5865}
.e-forsta i,.e-bra-rad i{font-style:normal;font-size:20px;color:#1e5c82}
.e-sektion{padding:40px 0 0}
.e-rubrikrad{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:12px}
.e-snabb{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 16px}
.e-snabb a{display:inline-flex;align-items:center;gap:8px;font:600 14px Inter,system-ui,sans-serif;color:#0d2440;text-decoration:none;background:#fffdf8;border:1px solid rgba(150,110,60,.22);border-radius:999px;padding:8px 10px 8px 16px;transition:border-color .2s ease}
.e-snabb a:hover{border-color:#1e5c82}
.e-snabb span{display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:24px;padding:0 6px;border-radius:999px;background:#f3ece0;color:#a8501a;font-size:12px;font-weight:700}
.e-kar-ram{position:relative}
.e-kar{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(260px,1fr);gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:4px}
.e-kar::-webkit-scrollbar{display:none}
.e-kort{position:relative;scroll-snap-align:start;display:flex;flex-direction:column;justify-content:flex-end;height:320px;padding:18px;border-radius:20px;overflow:hidden;color:#fff;text-decoration:none;background:#0d2440 center/cover no-repeat;transition:transform .25s ease,box-shadow .25s ease}
.e-kort:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(13,36,64,.16)}
.e-kort-foto::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,24,38,0) 30%,rgba(8,24,38,.85) 100%)}
.e-kort-mal{background:linear-gradient(165deg,#fffaf1,#efe4d0);color:#0d2440;border:1px solid rgba(150,110,60,.18)}
.e-kort-ikon{position:absolute;top:28px;left:50%;transform:translateX(-50%);width:120px;height:120px;object-fit:contain}
.e-kort-text{position:relative;display:flex;flex-direction:column;gap:3px}
.e-kort-text small{font:700 10.5px Inter,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;opacity:.85}
.e-kort-text b{font-family:'Playfair Display',Georgia,serif;font-size:23px;line-height:1.12}
.e-kort-besk{font-size:13.5px;line-height:1.45;opacity:.92;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.e-kort-text i{font-style:normal;font-size:12px;font-weight:600;opacity:.85}
.e-kort-text em{font-style:normal;font-size:10px;opacity:.7;margin-top:4px}
.e-partner{background:#fff7ec;color:#0d2440;border:2px dashed #b5591a;justify-content:center;gap:8px}
.e-partner-etikett{font:800 10.5px Inter,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#a8501a}
.e-partner b{font-family:'Playfair Display',Georgia,serif;font-size:24px}
.e-partner span{font-size:13.5px;line-height:1.5;color:#3d5865}
.e-partner i{font-style:normal;font-size:14px;font-weight:700;color:#1e5c82}
.e-pilar{display:none}
.e-not{font-size:12px;color:#5b7280;margin:10px 0 0}
.e-bra{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:8px}
.e-bra-rad{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:18px;background:#fffdf8;border:1px solid rgba(150,110,60,.16);color:#0d2440;text-decoration:none}
a.e-bra-rad:hover{border-color:#1e5c82}
.e-bra-ikon{width:40px;height:40px;object-fit:contain;flex-shrink:0}
.e-bra-rad>span{display:flex;flex-direction:column;flex:1;min-width:0}
.e-bra-rad b{font-size:15px}
.e-bra-rad>span>span{font-size:13px;color:#3d5865;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.e-allt{padding:48px 0 14px}
.e-allt p{font-size:14px;color:#3d5865;margin:8px 0 0}
.e-rad{display:flex;justify-content:space-between;align-items:center;width:100%;padding:16px 4px;border:0;border-top:1px solid rgba(13,36,64,.12);background:transparent;cursor:pointer;font:600 16px Inter,system-ui,sans-serif;color:#0d2440;text-align:left}
.e-rad i{position:relative;width:14px;height:14px;flex-shrink:0}
.e-rad:hover{color:#1e5c82}
.e-rad i::before,.e-rad i::after{content:'';position:absolute;left:0;top:6px;width:14px;height:2px;background:#1e5c82;border-radius:2px;transition:transform .2s ease}
.e-rad i::after{transform:rotate(90deg)}
.e-rad-oppen i::after{transform:rotate(0)}
.e-fler{display:block;width:100%;padding:14px;border:0;border-top:1px solid rgba(13,36,64,.12);background:transparent;cursor:pointer;font:600 14px Inter,system-ui,sans-serif;color:#1e5c82;text-align:left}
.e-bar{position:sticky;top:var(--e-topp,0px);z-index:45;display:flex;align-items:center;gap:12px;padding:10px 16px;background:rgba(247,241,231,.94);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(150,110,60,.18)}
.e-bak{flex-shrink:0;font:700 14px Inter,system-ui,sans-serif;padding:9px 16px;border-radius:999px;border:0;background:#0d2440;color:#fff;cursor:pointer}
.e-bar-steg{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none}
.e-bar-steg::-webkit-scrollbar{display:none}
.e-bar-steg a{flex-shrink:0;display:inline-flex;align-items:center;gap:7px;font:600 13px Inter,system-ui,sans-serif;color:#0d2440;text-decoration:none;background:#fffdf8;border:1px solid rgba(150,110,60,.2);border-radius:999px;padding:5px 12px 5px 5px}
.e-bar-steg a span,.e-stegnr{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#b5591a;color:#fff;font-size:11.5px;font-weight:700}
.e-steghuvud{display:flex;align-items:center;gap:14px;padding:28px 0 12px;scroll-margin-top:calc(var(--e-topp,0px) + 64px)}
.e-stegnr{width:40px;height:40px;font-size:17px;flex-shrink:0}
.e-steghuvud small{font:700 11px Inter,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#a8501a}
.e-steghuvud h2{font-family:'Playfair Display',Georgia,serif;font-size:clamp(24px,3vw,30px);line-height:1.15;color:#0d2440;margin:2px 0 0}
.e-stegblock{margin-bottom:8px}
.e-allalank{display:inline-block;margin-top:10px;font-size:14px;font-weight:700;color:#1e5c82;text-decoration:none}
[data-eklamp]{max-height:460px;overflow:hidden;position:relative;cursor:pointer}
[data-eklamp]::after{content:'Visa allt';position:absolute;left:0;right:0;bottom:0;height:130px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:14px;background:linear-gradient(180deg,rgba(247,241,231,0),#f7f1e7 70%);font:700 14px Inter,system-ui,sans-serif;color:#1e5c82}
.e-slut{margin:36px 0 12px;padding:24px;border-radius:22px;background:#fffdf8;border:1px solid rgba(150,110,60,.16)}
.e-slutlankar{display:flex;gap:18px;flex-wrap:wrap}
.e-slutlankar a{font-size:15px;font-weight:700;color:#1e5c82;text-decoration:none}
.e-andra{display:flex;gap:8px;flex-wrap:wrap}
.e-andra button{font:600 14px Inter,system-ui,sans-serif;padding:9px 16px;border-radius:999px;border:1px solid rgba(13,36,64,.18);background:#fff;color:#0d2440;cursor:pointer}
.e-andra button:hover{border-color:#1e5c82}
.e-tillbaka-stor{margin-top:22px;font:700 15px Inter,system-ui,sans-serif;padding:12px 20px;border-radius:999px;border:0;background:#0d2440;color:#fff;cursor:pointer}
@media (min-width:901px){
  .e-kar{grid-auto-columns:calc((100% - 28px) / 3)}
  .e-pilar{display:flex;gap:8px;position:absolute;top:-58px;right:0}
  .e-pilar button{width:40px;height:40px;border-radius:50%;border:1px solid rgba(13,36,64,.18);background:#fffdf8;color:#0d2440;font-size:16px;cursor:pointer}
}
@media (max-width:700px){
  .e-topp{height:clamp(340px,50svh,460px)}
  .e-vagtopp{height:210px}
  .e-topp-inre{padding:0 16px 52px}
  .e-inre{padding:0 16px}
  .e-valgrid{grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
  .e-valkort{height:150px;padding:12px;border-radius:18px}
  .e-valkort-text b{font-size:19px}
  .e-valkort-text span{font-size:12.5px}
  .e-valkort-ikon{width:48px;height:48px;top:10px;right:10px}
  .e-kar{grid-auto-columns:78%}
  .e-kort{height:300px}
  .e-bra{grid-template-columns:1fr}
  .e-sektion{padding-top:34px}
  .e-kredit{bottom:36px}
}
#osida-innehall>[data-osdel]:not([data-ehost]){max-width:860px;width:100%}
.e-valkort:focus-visible,.e-kort:focus-visible,.e-rad:focus-visible,.e-forsta:focus-visible,.e-bra-rad:focus-visible,.e-snabb a:focus-visible,.e-chip-lank:focus-visible,.e-bak:focus-visible{outline:3px solid #f2a25c;outline-offset:3px}
@media (min-width:901px){.e-sektion{padding-top:56px}.e-allt{padding-top:64px}}
@media (max-width:700px){#osida-innehall{padding-left:16px !important;padding-right:16px !important}}
@media (prefers-reduced-motion:reduce){.e-valkort,.e-kort{transition:none}}
`
