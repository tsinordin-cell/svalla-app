'use client'
/**
 * Förhandsvisning av nya ösidor (Max 2026-11-27): fyra förslag på samma adress, /o/[slug]?v=a|b|c|d, och ?v=nu
 * för dagens sida. Komponenten ritar ny topp och nya mosaiker och ordnar om de befintliga avsnitten med
 * CSS (order och display). All text ligger kvar i sidans HTML från servern, så inget försvinner för Google.
 *
 * A Välj själv: knapprad där besökaren väljer del av sidan. Översikten har mosaiker.
 * B Mosaik först: utvalda krogar, boenden och höjdpunkter som mosaik, sedan planeringen samlad.
 * C Kapitel: Upptäck, Ta dig dit, Ät och bo, På plats, Frågor och mer, med kapitelmeny.
 * E Navet (standard): kort nav med val, urval och hopfällt Allt om ön, se OsidaE.tsx.
 * D Vad är du ute efter: sex snitslade banor (Över dagen, Bo över, Med egen båt, Med barn, Aktiv, Bor här).
 *   Valet sparas i webbläsaren så att nästa ö öppnas i samma bana. Varje bana har en exempelplats för en
 *   samarbetspartner (Max: verksamheter ska vilja betala för att synas), utom öbornas bana.
 *
 * Underlag: tre UX-analyser 2026-11-27 och Oskars fråga om hur olika besökare letar.
 * Ingen popularitetsdata finns, därför står det "Svallas urval" och inte "populärast".
 */
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import OsidaE from './OsidaE'

type Foto = { url: string; fotograf: string; licens: string }
type Kort = { namn: string; typ: string; text: string; sasong?: string; foto?: Foto }
type Gora = { namn: string; text: string; ikon: string }
export type OsidaData = {
  slug: string
  namn: string
  tagline: string
  region: string
  regionHref: string
  ingress: string
  foto: Foto | null
  restid: string
  sasong: string
  perfekt: string
  karaktar: string
  krogar: Kort[]
  boenden: Kort[]
  gora: Gora[]
}

type V = 'a' | 'b' | 'c' | 'd' | 'e' | 'nu'
const VARIANTER: { v: V; namn: string }[] = [
  { v: 'e', namn: 'E Navet' },
  { v: 'd', namn: 'D Vad söker du?' },
  { v: 'a', namn: 'A Välj själv' },
  { v: 'b', namn: 'B Mosaik' },
  { v: 'c', namn: 'C Kapitel' },
  { v: 'nu', namn: 'Dagens sida' },
]

/** Känner igen ett befintligt avsnitt på dess rubrik. */
export function nyckel(el: HTMLElement): string {
  if (el.dataset.osdel) return el.dataset.osdel
  const h = el.querySelector('h2')?.textContent?.trim() ?? ''
  const t = (el.textContent ?? '').trim().slice(0, 240)
  if (/^Om /.test(h)) return 'om'
  if (h === 'Se & Göra') return 'gora'
  if (h === 'Mat & Dryck') return 'mat'
  if (/^Hantverk/.test(h)) return 'hantverk'
  if (h === 'Boende') return 'bo'
  if (h === 'Ta sig dit') return 'dit'
  if (/^Hamnar/.test(h)) return 'hamn'
  if (/^Tips/.test(h)) return 'tips'
  if (/^Vanliga frågor/.test(h)) return 'faq'
  if (/^Vad du kan göra/.test(h)) return 'lankar'
  if (/^Mer om/.test(h)) return 'mer'
  if (/^Besök också/.test(h)) return 'besok'
  if (/^Källor/.test(h)) return 'kallor'
  if (/^Guider/.test(h)) return 'guider'
  if (/^Fakta om/.test(h)) return 'fakta'
  if (/^Nästa avgång/.test(h) || /^Nästa avgång/.test(t)) return 'avgang'
  if (/Sista båten/.test(t)) return 'sistabat'
  if (/Bäst tid att besöka/.test(t)) return 'sasong'
  if (/^Visste du att/.test(t)) return 'visste'
  if (/forum/i.test(h) || /^(Community)?\s*Forum/.test(t)) return 'forum'
  if (el.querySelector('input[type="email"]')) return 'epost'
  if (el.querySelector('img') && !h) return 'foto'
  return 'ovrigt'
}

/* Vilka avsnitt som hör till vilken del. __mosaik, __krogar, __boenden och __gora är förslagets egna block. */
const FLIKAR: { id: string; namn: string; delar: string[] }[] = [
  { id: 'oversikt', namn: 'Översikt', delar: ['__mosaik', 'visste', 'om', 'sasong', 'fakta'] },
  { id: 'dit', namn: 'Ta dig dit', delar: ['avgang', 'sistabat', 'dit'] },
  { id: 'ata', namn: 'Äta', delar: ['mat'] },
  { id: 'bo', namn: 'Bo', delar: ['bo'] },
  { id: 'gora', namn: 'Göra', delar: ['gora', 'tips'] },
  { id: 'hamn', namn: 'Hamnar och service', delar: ['hamn', 'hantverk'] },
  { id: 'fragor', namn: 'Frågor', delar: ['faq'] },
  { id: 'mer', namn: 'Mer', delar: ['mer', 'guider', 'besok', 'kallor', 'forum'] },
]
const KAPITEL: { id: string; namn: string; delar: string[] }[] = [
  { id: 'upptack', namn: '1 Upptäck', delar: ['visste', 'om', 'sasong', 'fakta'] },
  { id: 'resa', namn: '2 Ta dig dit', delar: ['avgang', 'sistabat', 'dit'] },
  { id: 'atabo', namn: '3 Ät och bo', delar: ['__mosaik', 'mat', 'bo'] },
  { id: 'plats', namn: '4 På plats', delar: ['gora', 'tips', 'hamn', 'hantverk'] },
  { id: 'mer', namn: '5 Frågor och mer', delar: ['faq', 'mer', 'guider', 'besok', 'kallor', 'forum'] },
]
const ORDNING_B = ['__mosaik', 'avgang', 'sistabat', 'dit', 'hamn', 'visste', 'om', 'sasong', 'fakta', 'faq', 'mat', 'bo', 'gora', 'tips', 'hantverk', 'mer', 'guider', 'besok', 'kallor', 'forum']
const ORDNING_D_ALLA = ['visste', 'om', '__gora', '__krogar', '__boenden', 'avgang', 'sistabat', 'dit', 'hamn', 'sasong', 'fakta', 'faq', 'mat', 'bo', 'gora', 'tips', 'hantverk', 'mer', 'guider', 'besok', 'kallor', 'forum']
const ALLTID_DOLDA = ['foto', 'lankar']
const VARIANT_BLOCK = ['__mosaik', '__krogar', '__boenden', '__gora']

type Bana = {
  id: string
  namn: string
  fraga: string
  ikon: string
  partner?: '__krogar' | '__boenden' | '__gora'
  steg: { rubrik: string; delar: string[] }[]
  lankar: (slug: string, namn: string) => { text: string; href: string }[]
}
const BANOR: Bana[] = [
  {
    id: 'dag', namn: 'Över dagen', fraga: 'Hur kommer jag dit och hem igen?', ikon: 'ship', partner: '__krogar',
    steg: [
      { rubrik: 'Ta dig dit och hem igen', delar: ['avgang', 'sistabat', 'dit'] },
      { rubrik: 'Ät lunch', delar: ['__krogar'] },
      { rubrik: 'Upptäck ön', delar: ['__gora', 'tips'] },
      { rubrik: 'Bra att veta', delar: ['sasong', 'faq'] },
    ],
    lankar: s => [{ text: 'Båtar och färjor', href: '/farjor' }, { text: 'Komma dit', href: `/o/${s}/komma-dit` }],
  },
  {
    id: 'bo', namn: 'Bo över', fraga: 'Var kan jag sova?', ikon: 'bed', partner: '__boenden',
    steg: [
      { rubrik: 'Välj boende', delar: ['__boenden', 'bo'] },
      { rubrik: 'Ät middag', delar: ['__krogar'] },
      { rubrik: 'Vad gör man här', delar: ['__gora', 'tips'] },
      { rubrik: 'Ta dig dit', delar: ['avgang', 'dit', 'sasong'] },
    ],
    lankar: s => [{ text: 'Alla boenden', href: `/o/${s}/boende` }],
  },
  {
    id: 'bat', namn: 'Med egen båt', fraga: 'Var lägger jag till?', ikon: 'anchor', partner: '__krogar',
    steg: [
      { rubrik: 'Lägg till', delar: ['hamn'] },
      { rubrik: 'Krogar nära bryggan', delar: ['__krogar'] },
      { rubrik: 'Service på ön', delar: ['hantverk', 'tips'] },
      { rubrik: 'Bra att veta', delar: ['sasong', 'faq'] },
    ],
    lankar: s => [{ text: 'Hamnar och bryggor', href: `/o/${s}/hamnar` }, { text: 'Alla hamnar', href: '/hamnar-och-bryggor' }],
  },
  {
    id: 'barn', namn: 'Med barn', fraga: 'Blir det roligt för barnen?', ikon: 'child', partner: '__gora',
    steg: [
      { rubrik: 'Bada och leka', delar: ['__gora', 'gora'] },
      { rubrik: 'Fika och mat', delar: ['__krogar'] },
      { rubrik: 'Ta dig dit', delar: ['avgang', 'sistabat', 'dit'] },
      { rubrik: 'Bra att veta', delar: ['tips', 'faq'] },
    ],
    lankar: s => [{ text: 'Med barn', href: `/o/${s}/med-barn` }, { text: 'Bad', href: `/o/${s}/bad` }],
  },
  {
    id: 'aktiv', namn: 'Aktiv', fraga: 'Vandra, cykla eller paddla?', ikon: 'walk', partner: '__gora',
    steg: [
      { rubrik: 'Vad kan man göra', delar: ['__gora', 'gora'] },
      { rubrik: 'Tips från oss', delar: ['tips'] },
      { rubrik: 'Ta dig dit', delar: ['avgang', 'dit'] },
      { rubrik: 'Mat på vägen', delar: ['__krogar'] },
    ],
    lankar: s => [{ text: 'Aktiviteter', href: `/o/${s}/aktiviteter` }, { text: 'Rutter', href: '/rutter' }],
  },
  {
    id: 'bor', namn: 'Jag bor här', fraga: 'När går båten, vem fixar taket?', ikon: 'island',
    steg: [
      { rubrik: 'Båtarna', delar: ['avgang', 'sistabat', 'dit'] },
      { rubrik: 'Hantverkare och service', delar: ['hantverk', 'hamn'] },
      { rubrik: 'Fråga grannarna', delar: ['forum'] },
      { rubrik: 'Om ön', delar: ['fakta', 'kallor'] },
    ],
    lankar: s => [{ text: 'Hantverkare', href: `/o/${s}/hantverkare` }, { text: 'Skärgårdens datum', href: '/skargardsdatum' }],
  },
]

const FARGER = ['#0d2440', '#1e5c82', '#f3ece0', '#e7dcc8', '#2f6f73', '#f7f1e6']
const MORKA = new Set(['#0d2440', '#1e5c82', '#2f6f73'])

function Ikon({ namn, stor }: { namn: string; stor?: boolean }) {
  const [syns, setSyns] = useState(true)
  if (!syns) return null
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/ikoner/${namn}.webp`} alt="" aria-hidden="true" className={stor ? 'os-ikon os-ikon-stor' : 'os-ikon'} onError={() => setSyns(false)} />
}

type MKort = { namn: string; typ?: string; text: string; sasong?: string; ikon?: string; foto?: Foto }

function Mosaik({ rubrik, under, kort, ikon, alla, allaText, partner }: { rubrik: string; under: string; kort: MKort[]; ikon: string; alla: string; allaText: string; partner?: boolean }) {
  if (kort.length === 0) return null
  // Kort med foto först, så att mosaiken bär. Ordningen bygger inte på betyg.
  const visa = [...kort.filter(k => k.foto), ...kort.filter(k => !k.foto)].slice(0, 5)
  return (
    <section className="os-mosaik">
      <div className="os-mosaik-topp">
        <div>
          <div className="os-liten">{under}</div>
          <h2 className="os-h2">{rubrik}</h2>
        </div>
        <a href={alla} className="os-alla">{allaText} →</a>
      </div>
      {partner && (
        <a href="/partner" className="os-partner">
          <span className="os-partner-etikett">Samarbetspartner · exempel</span>
          <b>Här syns en verksamhet som vill nå just dig</b>
          <span>Riktigt foto, öppettider just nu, bokningsknapp och ett erbjudande. Tydligt märkt. Alla andra ställen visas som vanligt nedanför.</span>
          <i>Driver du en verksamhet på ön? Synas här →</i>
        </a>
      )}
      <div className="os-rutnat">
        {visa.map((k, i) => {
          const bg = FARGER[i % FARGER.length]!
          const mork = MORKA.has(bg) || !!k.foto
          const stil = k.foto
            ? { backgroundImage: `linear-gradient(180deg, rgba(8,24,38,0) 30%, rgba(8,24,38,.82) 100%), url('${k.foto.url}')`, backgroundColor: '#0d2440' }
            : { background: bg }
          return (
            <a key={k.namn} href={alla} className={'os-ruta' + (i === 0 ? ' os-ruta-stor' : '') + (mork ? ' os-mork' : '') + (k.foto ? ' os-ruta-foto' : '')} style={stil}>
              {!k.foto && <Ikon namn={k.ikon ?? ikon} stor={i === 0} />}
              <span className="os-ruta-text">
                {k.typ && <small>{k.typ}</small>}
                <b>{k.namn}</b>
                <span className="os-ruta-besk">{k.text}</span>
                {k.sasong && <i>Säsong: {k.sasong}</i>}
                {k.foto && <em className="os-kredit">Foto: {k.foto.fotograf}, {k.foto.licens}</em>}
              </span>
            </a>
          )
        })}
      </div>
      <p className="os-not">Svallas urval från öns sida. Ordningen bygger inte på betyg.</p>
    </section>
  )
}

export default function OsidaForslag({ data }: { data: OsidaData }) {
  const [v, setV] = useState<V>('e')
  const [flik, setFlik] = useState('oversikt')
  const [bana, setBana] = useState<string | null>(null)
  const [mal, setMal] = useState<Record<string, HTMLElement>>({})
  const [kapitelOppen, setKapitelOppen] = useState(false)
  const [klar, setKlar] = useState(false)
  const [forbiHero, setForbiHero] = useState(false)

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('v')
    if (p === 'a' || p === 'b' || p === 'c' || p === 'd' || p === 'e' || p === 'nu') setV(p)
    try { const b = window.localStorage.getItem('svalla-bana'); if (b) setBana(b) } catch { /* privat läge */ }
    setKlar(true)
    const scroll = () => setForbiHero(window.scrollY > window.innerHeight * 0.55)
    scroll()
    window.addEventListener('scroll', scroll, { passive: true })
    const c = document.getElementById('osida-innehall')
    if (!c) return () => window.removeEventListener('scroll', scroll)
    const hosts: Record<string, HTMLElement> = {}
    for (const k of VARIANT_BLOCK) {
      const host = document.createElement('div')
      host.dataset.osdel = k
      c.appendChild(host)
      hosts[k] = host
    }
    setMal(hosts)
    return () => { Object.values(hosts).forEach(h => h.remove()); window.removeEventListener('scroll', scroll) }
  }, [])

  const byt = useCallback((nytt: V) => {
    setV(nytt)
    const u = new URL(window.location.href)
    u.searchParams.set('v', nytt)
    window.history.replaceState(null, '', u.toString())
  }, [])

  const valjBana = (id: string | null) => {
    setBana(id)
    try { if (id) window.localStorage.setItem('svalla-bana', id); else window.localStorage.removeItem('svalla-bana') } catch { /* privat läge */ }
    setTimeout(() => document.getElementById('os-banor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30)
  }

  const aktivBana = BANOR.find(b => b.id === bana) ?? null

  // Ordna och visa de befintliga avsnitten efter förslag, flik och bana.
  useEffect(() => {
    const c = document.getElementById('osida-innehall')
    const hero = document.getElementById('osida-hero')
    if (!c || v === 'e') return
    if (hero) hero.style.display = v === 'nu' ? 'block' : 'none'
    const barn = Array.from(c.children) as HTMLElement[]
    let forstaEpost = true
    for (const el of barn) {
      const k = nyckel(el)
      el.dataset.osdel = k
      el.style.removeProperty('display')
      el.style.removeProperty('order')
      el.removeAttribute('data-kapitel')
      el.removeAttribute('data-eklamp')
      if (/^(kapitel|steg)-/.test(el.id)) el.removeAttribute('id')
      if (v === 'nu') { if (VARIANT_BLOCK.includes(k)) el.style.display = 'none'; continue }
      if (ALLTID_DOLDA.includes(k)) { el.style.display = 'none'; continue }
      if (v === 'd' && k === '__mosaik') { el.style.display = 'none'; continue }
      if (v !== 'd' && (k === '__krogar' || k === '__boenden' || k === '__gora')) { el.style.display = 'none'; continue }
      if (k === 'epost') { if (forstaEpost) { el.style.display = 'none'; forstaEpost = false } else el.style.order = '900'; continue }
      if (k === 'ovrigt') { el.style.order = '950'; continue }
      if (v === 'a') {
        const f = FLIKAR.find(x => x.id === flik)!
        const i = f.delar.indexOf(k)
        if (i < 0) el.style.display = 'none'
        else el.style.order = String(i * 10)
      } else if (v === 'b') {
        const i = ORDNING_B.indexOf(k)
        el.style.order = String(i < 0 ? 800 : i * 10)
      } else if (v === 'c') {
        let ord = 800
        KAPITEL.forEach((kap, ki) => {
          const i = kap.delar.indexOf(k)
          if (i >= 0) ord = ki * 100 + i * 10
        })
        el.style.order = String(ord)
      } else if (aktivBana) {
        let ord = -1
        aktivBana.steg.forEach((s, si) => {
          const i = s.delar.indexOf(k)
          if (i >= 0 && ord < 0) ord = si * 100 + i * 10
        })
        if (ord < 0) el.style.display = 'none'
        else el.style.order = String(ord)
      } else {
        const i = ORDNING_D_ALLA.indexOf(k)
        el.style.order = String(i < 0 ? 800 : i * 10)
      }
    }
    const rubriker = v === 'c'
      ? KAPITEL.map(k => ({ id: 'kapitel-' + k.id, namn: k.namn.replace(/^\d /, ''), delar: k.delar }))
      : v === 'd' && aktivBana
        ? aktivBana.steg.map((s, i) => ({ id: 'steg-' + (i + 1), namn: `Steg ${i + 1} · ${s.rubrik}`, delar: s.delar }))
        : []
    rubriker.forEach(r => {
      const forsta = barn
        .filter(el => r.delar.includes(el.dataset.osdel ?? '') && el.style.display !== 'none')
        .sort((a, b) => Number(a.style.order) - Number(b.style.order))[0]
      if (forsta && !forsta.dataset.kapitel) { forsta.dataset.kapitel = r.namn; forsta.id = r.id }
    })
    c.style.display = v === 'nu' ? '' : 'flex'
    c.style.flexDirection = 'column'
  }, [v, flik, mal, aktivBana])

  const valjFlik = (id: string) => {
    setFlik(id)
    document.getElementById('os-flikar')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const kort = {
    gora: data.gora.map(g => ({ namn: g.namn, text: g.text, ikon: g.ikon })),
    krogar: data.krogar.map(k => ({ ...k })),
    boenden: data.boenden.map(k => ({ ...k })),
  }
  const goraM = (partner?: boolean) => <Mosaik rubrik={`Höjdpunkter på ${data.namn}`} under="Göra" kort={kort.gora} ikon="tower" alla={`/o/${data.slug}/aktiviteter`} allaText="Allt att göra" partner={partner} />
  const krogM = (partner?: boolean) => <Mosaik rubrik={`Krogar och kaféer på ${data.namn}`} under="Äta" kort={kort.krogar} ikon="utensils" alla={`/o/${data.slug}/restauranger`} allaText="Alla krogar" partner={partner} />
  const boM = (partner?: boolean) => <Mosaik rubrik={`Boenden på ${data.namn}`} under="Bo" kort={kort.boenden} ikon="bed" alla={`/o/${data.slug}/boende`} allaText="Alla boenden" partner={partner} />

  const mosaiker = (
    <div className={'os-mosaiker os-mosaiker-' + v}>
      {v === 'b' && goraM()}
      {krogM()}
      {boM()}
      {v === 'a' && goraM()}
      {v === 'b' && <h2 className="os-h2 os-planera">Planera besöket</h2>}
    </div>
  )

  return (
    <>
      <style>{CSS}</style>
      {v === 'e' && <OsidaE data={data} nyckel={nyckel} />}

      {v !== 'nu' && v !== 'e' && (
        <header className={'os-hero os-hero-' + v} style={data.foto ? { backgroundImage: `linear-gradient(180deg, rgba(8,24,38,.15) 0%, rgba(8,24,38,.72) 100%), url('${data.foto.url}')` } : undefined}>
          <div className="os-hero-inre">
            <nav className="os-smulor" aria-label="Brödsmulor"><a href="/">Hem</a> › <a href={data.regionHref}>{data.region}</a> › <span>{data.namn}</span></nav>
            <h1 className="os-h1">{data.namn}</h1>
            <p className="os-tagline">{data.tagline}</p>
            <div className="os-fakta">
              {data.restid && <a href={v === 'a' ? undefined : '#'} onClick={e => { e.preventDefault(); if (v === 'a') valjFlik('dit'); else document.querySelector('[data-osdel="dit"]')?.scrollIntoView({ behavior: 'smooth' }) }} className="os-fakta-ruta os-klick"><small>Restid</small><span className="os-tre">{data.restid}</span><em>Se båtar och tider →</em></a>}
              {data.sasong && <div className="os-fakta-ruta"><small>Säsong</small>{data.sasong}</div>}
              {data.perfekt && <div className="os-fakta-ruta"><small>Perfekt för</small>{data.perfekt}</div>}
            </div>
            {data.foto && <div className="os-foto">Foto: {data.foto.fotograf}, {data.foto.licens}</div>}
          </div>
        </header>
      )}

      {klar && v === 'd' && (
        <div className="os-banor" id="os-banor">
          <div className="os-banor-inre">
            {!aktivBana ? (
              <>
                <div className="os-liten">Välj din väg</div>
                <h2 className="os-h2">Vad är du ute efter på {data.namn}?</h2>
                <div className="os-banval">
                  {BANOR.map(b => (
                    <button key={b.id} className="os-bankort" onClick={() => valjBana(b.id)}>
                      <Ikon namn={b.ikon} />
                      <b>{b.namn}</b>
                      <span>{b.fraga}</span>
                    </button>
                  ))}
                </div>
                <p className="os-not">Eller läs allt om {data.namn} nedanför. Svalla minns ditt val till nästa ö.</p>
              </>
            ) : (
              <>
                <div className="os-banrad">
                  <span className="os-liten" style={{ margin: 0 }}>Din väg</span>
                  {BANOR.map(b => (
                    <button key={b.id} className={b.id === aktivBana.id ? 'os-flik os-flik-aktiv' : 'os-flik'} onClick={() => valjBana(b.id)}>{b.namn}</button>
                  ))}
                  <button className="os-flik os-flik-tom" onClick={() => valjBana(null)}>Allt om {data.namn}</button>
                </div>
                <div className="os-bantopp">
                  <h2 className="os-h2">{aktivBana.namn} på {data.namn}</h2>
                  <ol className="os-stegrad">
                    {aktivBana.steg.map((s, i) => <li key={s.rubrik}><a href={'#steg-' + (i + 1)}><span>{i + 1}</span>{s.rubrik}</a></li>)}
                  </ol>
                  <div className="os-banlankar">{aktivBana.lankar(data.slug, data.namn).map(l => <a key={l.href} href={l.href}>{l.text} →</a>)}</div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {klar && v === 'a' && (
        <div className="os-flikar" id="os-flikar">
          <div className="os-flikar-inre" role="tablist" aria-label={`Välj vad du vill läsa om ${data.namn}`}>
            {FLIKAR.map(f => (
              <button key={f.id} role="tab" aria-selected={flik === f.id} className={flik === f.id ? 'os-flik os-flik-aktiv' : 'os-flik'} onClick={() => valjFlik(f.id)}>{f.namn}</button>
            ))}
          </div>
        </div>
      )}

      {klar && v === 'b' && (
        <div className="os-ingress"><p>{data.ingress}</p></div>
      )}

      {klar && v === 'c' && (
        <>
          <div className="os-ingress"><p>{data.ingress}</p></div>
          <nav className={forbiHero ? 'os-kapitelmeny os-synlig' : 'os-kapitelmeny'} aria-label="Kapitel">
            <div className="os-liten">Din resa till {data.namn}</div>
            {KAPITEL.map(k => <a key={k.id} href={'#kapitel-' + k.id}>{k.namn}</a>)}
          </nav>
          <div className="os-kapitelknapp">
            {kapitelOppen && (
              <div className="os-kapitellista">
                {KAPITEL.map(k => <a key={k.id} href={'#kapitel-' + k.id} onClick={() => setKapitelOppen(false)}>{k.namn}</a>)}
              </div>
            )}
            <button onClick={() => setKapitelOppen(o => !o)}>{kapitelOppen ? 'Stäng' : 'Kapitel'}</button>
          </div>
        </>
      )}

      {mal.__mosaik && v !== 'nu' && v !== 'd' && createPortal(mosaiker, mal.__mosaik)}
      {mal.__krogar && v === 'd' && createPortal(krogM(aktivBana?.partner === '__krogar'), mal.__krogar)}
      {mal.__boenden && v === 'd' && createPortal(boM(aktivBana?.partner === '__boenden'), mal.__boenden)}
      {mal.__gora && v === 'd' && createPortal(goraM(aktivBana?.partner === '__gora'), mal.__gora)}

      <div className="os-vaxlare" role="group" aria-label="Välj förslag">
        <span>Förslag</span>
        {VARIANTER.map(x => (
          <button key={x.v} className={v === x.v ? 'os-vx-aktiv' : ''} onClick={() => byt(x.v)}>{x.namn}</button>
        ))}
      </div>
    </>
  )
}

const CSS = `
#osida-hero{display:none}
.os-tre{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.os-hero{position:relative;min-height:min(62vh,560px);display:flex;align-items:flex-end;background:#1e5c82 center/cover no-repeat;color:#fff}
.os-hero-inre{width:100%;max-width:900px;margin:0 auto;padding:48px 24px 28px}
.os-smulor{font-size:12.5px;color:rgba(255,255,255,.85);margin-bottom:10px}
.os-smulor a{color:rgba(255,255,255,.9);text-decoration:none}
.os-h1{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:clamp(40px,7vw,72px);line-height:1;margin:0 0 10px;letter-spacing:-.01em;color:#fff}
.os-tagline{font-size:clamp(16px,2vw,19px);line-height:1.5;margin:0 0 20px;max-width:46ch;color:rgba(255,255,255,.95)}
.os-fakta{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}
.os-fakta-ruta{display:flex;flex-direction:column;gap:3px;background:rgba(255,253,248,.14);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.22);border-radius:14px;padding:12px 16px;font-size:14px;font-weight:600;line-height:1.4;color:#fff;text-decoration:none}
.os-fakta-ruta small{font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.75)}
.os-fakta-ruta em{font-style:normal;font-size:12.5px;color:#f2c27a;margin-top:2px}
.os-klick{cursor:pointer}
.os-klick:hover{background:rgba(255,253,248,.24)}
.os-foto{margin-top:14px;font-size:11px;color:rgba(255,255,255,.7)}
.os-flikar{position:sticky;top:0;z-index:40;background:#f3ece0;border-bottom:1px solid rgba(150,110,60,.2)}
.os-flikar-inre{max-width:900px;margin:0 auto;padding:10px 16px;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none}
.os-flikar-inre::-webkit-scrollbar{display:none}
.os-flik{flex-shrink:0;font:600 14px Inter,system-ui,sans-serif;padding:9px 16px;border-radius:999px;border:1px solid rgba(13,36,64,.18);background:#fffdf8;color:#0d2440;cursor:pointer}
.os-flik:hover{border-color:#1e5c82}
.os-flik-aktiv{background:#0d2440;color:#fff;border-color:#0d2440}
.os-flik-tom{background:transparent;border-style:dashed}
.os-banor{background:#f3ece0;border-bottom:1px solid rgba(150,110,60,.18);scroll-margin-top:0}
.os-banor-inre{max-width:900px;margin:0 auto;padding:28px 24px 24px}
.os-banval{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}
.os-bankort{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:4px;text-align:left;padding:18px 18px 16px;min-height:132px;border-radius:18px;border:1px solid rgba(150,110,60,.2);background:#fffdf8;color:#0d2440;cursor:pointer;font:inherit;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}
.os-bankort:hover{transform:translateY(-3px);box-shadow:0 12px 26px rgba(13,36,64,.12);border-color:#1e5c82}
.os-bankort .os-ikon{top:12px;right:12px;width:46px;height:46px}
.os-bankort b{font-family:'Playfair Display',Georgia,serif;font-size:21px;margin-top:auto}
.os-bankort span{font-size:13.5px;line-height:1.4;color:#3d5865;max-width:22ch}
.os-banrad{display:flex;gap:8px;align-items:center;overflow-x:auto;scrollbar-width:none;padding-bottom:4px}
.os-banrad::-webkit-scrollbar{display:none}
.os-bantopp{margin-top:18px}
.os-stegrad{list-style:none;margin:12px 0 0;padding:0;display:flex;gap:8px;flex-wrap:wrap}
.os-stegrad a{display:inline-flex;align-items:center;gap:8px;font:600 14px Inter,system-ui,sans-serif;color:#0d2440;text-decoration:none;background:#fffdf8;border:1px solid rgba(150,110,60,.2);border-radius:999px;padding:6px 14px 6px 6px}
.os-stegrad a span{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#b5591a;color:#fff;font-size:12px}
.os-banlankar{display:flex;gap:16px;flex-wrap:wrap;margin-top:12px}
.os-banlankar a{font-size:14px;font-weight:700;color:#1e5c82;text-decoration:none}
.os-partner{display:flex;flex-direction:column;gap:4px;margin:0 0 12px;padding:16px 18px;border:2px dashed #b5591a;border-radius:18px;background:#fff7ec;color:#0d2440;text-decoration:none}
.os-partner-etikett{font-size:10.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#a8501a}
.os-partner b{font-family:'Playfair Display',Georgia,serif;font-size:19px}
.os-partner span{font-size:13.5px;line-height:1.5;color:#3d5865}
.os-partner i{font-style:normal;font-size:13.5px;font-weight:700;color:#1e5c82}
.os-ingress{max-width:900px;margin:0 auto;padding:28px 24px 0}
.os-ingress p{font-family:'Playfair Display',Georgia,serif;font-size:clamp(19px,2.4vw,24px);line-height:1.45;color:#0d2440;margin:0}
.os-mosaiker{display:flex;flex-direction:column;gap:36px;margin-bottom:40px}
.os-mosaik{margin-bottom:36px}
.os-liten{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#a8501a;margin:0 0 6px}
.os-h2{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:clamp(24px,3vw,30px);line-height:1.15;color:#0d2440;margin:0}
.os-planera{margin-top:8px}
.os-mosaik-topp{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:14px}
.os-alla{flex-shrink:0;font-size:14px;font-weight:700;color:#1e5c82;text-decoration:none}
.os-rutnat{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:170px;gap:12px}
.os-ruta{position:relative;display:flex;flex-direction:column;justify-content:flex-end;padding:16px;border-radius:18px;overflow:hidden;color:#0d2440;text-decoration:none;transition:transform .25s ease,box-shadow .25s ease;border:1px solid rgba(150,110,60,.14);background-size:cover !important;background-position:center !important}
.os-ruta:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(13,36,64,.14)}
.os-ruta-stor{grid-column:span 2;grid-row:span 2}
.os-mork{color:#fff;border-color:transparent}
.os-ikon{position:absolute;top:12px;right:12px;width:54px;height:54px;object-fit:contain;opacity:.95}
.os-ikon-stor{width:120px;height:120px;top:20px;right:20px}
.os-ruta-text{position:relative;display:flex;flex-direction:column;gap:3px}
.os-ruta-text small{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.8}
.os-ruta-text b{font-family:'Playfair Display',Georgia,serif;font-size:19px;line-height:1.15}
.os-ruta-stor .os-ruta-text b{font-size:28px}
.os-ruta-besk{font-size:13px;line-height:1.45;opacity:.92;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.os-ruta-stor .os-ruta-besk{-webkit-line-clamp:3;font-size:14.5px}
.os-ruta-text i{font-style:normal;font-size:12px;font-weight:600;opacity:.85;margin-top:2px}
.os-ruta-foto .os-ruta-text{text-shadow:0 1px 8px rgba(0,0,0,.35)}
.os-ruta-foto:not(.os-ruta-stor)::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,24,38,.05) 0%,rgba(8,24,38,.55) 45%,rgba(8,24,38,.9) 100%)}
.os-ruta-foto:not(.os-ruta-stor) .os-ruta-besk{display:none}
.os-kredit{font-style:normal;font-size:10px;opacity:.75;margin-top:4px}
.os-not{font-size:12px;color:#5b7280;margin:8px 0 0}
[data-kapitel]::before{content:attr(data-kapitel);display:block;font:700 12px Inter,system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#a8501a;border-top:2px solid #0d2440;padding-top:14px;margin:12px 0 18px}
[id^="kapitel-"],[id^="steg-"]{scroll-margin-top:24px}
.os-kapitelmeny{display:none}
.os-kapitelknapp{position:fixed;left:50%;transform:translateX(-50%);bottom:72px;z-index:45;display:flex;flex-direction:column;align-items:center;gap:8px}
@media (min-width:1280px){
  .os-kapitelmeny.os-synlig{display:flex}
  .os-kapitelmeny{flex-direction:column;gap:6px;position:fixed;left:24px;top:140px;width:170px;z-index:30;background:#fffdf8;border:1px solid rgba(150,110,60,.18);border-radius:16px;padding:16px;box-shadow:0 8px 24px rgba(60,40,15,.08)}
  .os-kapitelmeny a{font-size:14px;font-weight:600;color:#0d2440;text-decoration:none;padding:6px 8px;border-radius:8px}
  .os-kapitelmeny a:hover{background:#f3ece0}
  .os-kapitelknapp{display:none}
}
.os-kapitelknapp button{font:700 14px Inter,system-ui,sans-serif;padding:11px 22px;border-radius:999px;border:none;background:#0d2440;color:#fff;box-shadow:0 8px 20px rgba(13,36,64,.25);cursor:pointer}
.os-kapitellista{display:flex;flex-direction:column;background:#fffdf8;border-radius:16px;padding:8px;box-shadow:0 12px 30px rgba(13,36,64,.2);min-width:220px}
.os-kapitellista a{padding:10px 14px;font-size:15px;font-weight:600;color:#0d2440;text-decoration:none;border-radius:10px}
.os-vaxlare{position:fixed;left:12px;bottom:12px;z-index:60;display:flex;align-items:center;gap:4px;flex-wrap:wrap;max-width:calc(100vw - 110px);background:#0d2440;color:#fff;border-radius:16px;padding:6px 8px;box-shadow:0 10px 26px rgba(13,36,64,.3);font:600 12px Inter,system-ui,sans-serif}
.os-vaxlare>span{padding:0 6px;opacity:.7;text-transform:uppercase;letter-spacing:.12em;font-size:10px}
.os-vaxlare button{font:600 12px Inter,system-ui,sans-serif;color:#fff;background:transparent;border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:6px 10px;cursor:pointer}
.os-vaxlare .os-vx-aktiv{background:#f2a25c;border-color:#f2a25c;color:#0d2440}
@media (max-width:700px){
  .os-hero{min-height:70vh}
  .os-hero-inre{padding:36px 16px 20px}
  .os-banor-inre{padding:22px 16px 18px}
  .os-banval{grid-template-columns:1fr 1fr;gap:10px}
  .os-bankort{min-height:118px;padding:14px}
  .os-bankort b{font-size:18px}
  .os-bankort span{font-size:12.5px}
  .os-bankort .os-ikon{width:38px;height:38px}
  .os-rutnat{grid-template-columns:1fr 1fr;grid-auto-rows:150px;gap:10px}
  .os-ruta-stor{grid-column:span 2;grid-row:span 2}
  .os-ikon{width:42px;height:42px}
  .os-ikon-stor{width:90px;height:90px}
  .os-ingress{padding:22px 16px 0}
  .os-vaxlare{left:8px;bottom:8px;padding:5px 6px}
  .os-vaxlare button{padding:5px 8px;font-size:11px}
}
`
