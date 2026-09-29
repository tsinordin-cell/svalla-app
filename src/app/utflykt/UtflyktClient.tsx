'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Icon, { type IconName } from '@/components/Icon'
import SaveIslandButton from '@/components/SaveIslandButton'
import { trackEvent } from '@/lib/analytics'
import { CHIP_LABEL, type IslandChip } from '@/lib/islandChips'
import { ALLA_HUB_SLUG, rankDagIslands, type DagHub, type DagIsland } from '@/lib/dagsplan'
import { MAX_TRANSIT_DAYS_AHEAD } from '@/lib/transitDate'
import { packingForSeason, seasonLabel } from './utflykt-data'

/**
 * "Din dag i skärgården" (2026-09-28) — ersätter den gamla utflyktsplaneraren.
 *
 * Tre val, sedan svar: var startar du, vilken dag, vad vill du göra. Listan
 * är öar som nås från startpunkten (lib/dagsplan.ts), med ösidans källbelagda
 * restid och — på begäran, per ö — dagens båttider och sista båten hem från
 * Trafiklab. Allt tillstånd ligger i URL:en (fran, datum, vill, o) så en dag
 * går att dela och komma tillbaka till.
 *
 * Den gamla restidsuppskattningen (fågelväg / 40 km/h) är borttagen: den var
 * en gissning som visades som fakta.
 */

type HubLite = Pick<DagHub, 'slug' | 'label' | 'name'>

interface Props {
  islands: DagIsland[]
  hubs: HubLite[]
}

const VILL: { chip: IslandChip; icon: IconName }[] = [
  { chip: 'bad', icon: 'swim' },
  { chip: 'krog', icon: 'utensils' },
  { chip: 'barn', icon: 'child' },
  { chip: 'natur', icon: 'walk' },
  { chip: 'bastu', icon: 'fire' },
  { chip: 'lugnt', icon: 'moon' },
  { chip: 'gästhamn', icon: 'anchor' },
]
const CHIP_ICON: Record<IslandChip, IconName> = Object.fromEntries(VILL.map(v => [v.chip, v.icon])) as Record<IslandChip, IconName>

const ALLA_CHIPS = new Set<string>(VILL.map(v => v.chip))

function stockholmToday(): string {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })
}
function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}
function fmtDag(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`)
  return d.toLocaleDateString('sv-SE', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }).replace('.', '')
}
function fmtMin(min: number): string {
  const h = Math.floor(min / 60), m = min % 60
  if (h === 0) return `${m} min`
  return m === 0 ? `${h} h` : `${h} h ${m} min`
}

/** Datum i URL:en: 'idag' | 'imorgon' | YYYY-MM-DD. Löses till ett ISO-datum, eller null före hydrering. */
function resolveDatum(datum: string, today: string | null): string | null {
  if (!today) return null
  if (datum === 'idag') return today
  if (datum === 'imorgon') return addDays(today, 1)
  if (/^\d{4}-\d{2}-\d{2}$/.test(datum)) {
    const diff = Math.round((Date.parse(`${datum}T12:00:00Z`) - Date.parse(`${today}T12:00:00Z`)) / 86_400_000)
    if (diff >= 0 && diff <= MAX_TRANSIT_DAYS_AHEAD) return datum
  }
  return today
}

export default function UtflyktClient({ islands, hubs }: Props) {
  const sp = useSearchParams()
  const [hub, setHub] = useState<string>(() => hubs.some(h => h.slug === sp.get('fran')) ? sp.get('fran')! : 'stockholm')
  const [datum, setDatum] = useState<string>(() => sp.get('datum') || 'idag')
  const [vill, setVill] = useState<IslandChip[]>(() =>
    (sp.get('vill') ?? '').split(',').filter(c => ALLA_CHIPS.has(c)) as IslandChip[])
  const [open, setOpen] = useState<string | null>(() => sp.get('o'))
  const [today, setToday] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [visaAlla, setVisaAlla] = useState(false)
  const preselected = useRef(sp.get('o'))

  useEffect(() => { setToday(stockholmToday()) }, [])

  // Kom besökaren från en ösida (?o=slug)? Välj den startpunkt ön nås från
  // och rulla dit, så hon ser sin ö och inte en tom lista.
  useEffect(() => {
    const slug = preselected.current
    if (!slug) return
    const island = islands.find(i => i.slug === slug)
    if (!island) return
    if (!sp.get('fran')) setHub(island.hubs[0] ?? ALLA_HUB_SLUG)
    const t = setTimeout(() => {
      document.getElementById(`dag-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 150)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // URL:en speglar valen — utan navigering, utan historikposter.
  useEffect(() => {
    if (!today) return
    const q = new URLSearchParams()
    if (hub !== 'stockholm') q.set('fran', hub)
    if (datum !== 'idag') q.set('datum', datum)
    if (vill.length) q.set('vill', vill.join(','))
    if (open) q.set('o', open)
    const s = q.toString()
    const url = `${window.location.pathname}${s ? `?${s}` : ''}`
    if (url !== `${window.location.pathname}${window.location.search}`) window.history.replaceState(null, '', url)
  }, [hub, datum, vill, open, today])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(t)
  }, [toast])

  const iso = resolveDatum(datum, today)
  const ranked = useMemo(() => rankDagIslands(islands, hub, vill), [islands, hub, vill])
  const utanFilter = useMemo(() => (vill.length ? rankDagIslands(islands, hub, []) : []), [islands, hub, vill])
  const hubInfo = hubs.find(h => h.slug === hub)
  const visade = visaAlla ? ranked : ranked.slice(0, 12)

  function toggleVill(c: IslandChip) {
    setVill(v => (v.includes(c) ? v.filter(x => x !== c) : [...v, c]))
    setVisaAlla(false)
  }

  async function dela() {
    const url = window.location.href
    const title = `Din dag i skärgården${hubInfo && hub !== ALLA_HUB_SLUG ? ` från ${hubInfo.label}` : ''}`
    trackEvent('dagsplan_delad', { hub, datum, vill: vill.join(',') })
    try {
      if (navigator.share) { await navigator.share({ title, url }); return }
      await navigator.clipboard.writeText(url)
      setToast('Länken är kopierad')
    } catch {
      setToast('Kunde inte kopiera — markera adressen i adressfältet')
    }
  }

  const month = iso ? Number(iso.slice(5, 7)) : new Date().getMonth() + 1

  return (
    <div>
      {/* 1. Var startar du */}
      <Steg nr={1} rubrik="Var startar du?">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {hubs.map(h => (
            <Pill key={h.slug} active={h.slug === hub} onClick={() => { setHub(h.slug); setVisaAlla(false) }}>
              {h.label}
            </Pill>
          ))}
        </div>
      </Steg>

      {/* 2. När */}
      <Steg nr={2} rubrik="Vilken dag?">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <Pill active={datum === 'idag'} onClick={() => setDatum('idag')}>
            I dag{today ? ` · ${fmtDag(today)}` : ''}
          </Pill>
          <Pill active={datum === 'imorgon'} onClick={() => setDatum('imorgon')}>
            I morgon{today ? ` · ${fmtDag(addDays(today, 1))}` : ''}
          </Pill>
          <label style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 999,
            border: `1.5px solid ${datum !== 'idag' && datum !== 'imorgon' ? 'var(--sea)' : 'var(--surface-3)'}`,
            background: datum !== 'idag' && datum !== 'imorgon' ? 'var(--sea-xl)' : 'var(--white)',
            fontSize: 13.5, fontWeight: 600, color: 'var(--txt)', cursor: 'pointer',
          }}>
            <Icon name="calendar" size={15} stroke={2.2} />
            <span>Välj datum</span>
            <input
              id="dag-datum"
              type="date"
              aria-label="Välj datum"
              min={today ?? undefined}
              max={today ? addDays(today, MAX_TRANSIT_DAYS_AHEAD) : undefined}
              value={/^\d{4}-\d{2}-\d{2}$/.test(datum) ? datum : ''}
              onChange={e => { if (e.target.value) setDatum(e.target.value) }}
              style={{ border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 13.5, color: 'var(--txt)', width: 130 }}
            />
          </label>
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--txt3)', margin: '10px 0 0', lineHeight: 1.5 }}>
          Båttider går att hämta upp till {MAX_TRANSIT_DAYS_AHEAD} dagar fram — längre fram saknar Trafiklab ofta tidtabell.
        </p>
      </Steg>

      {/* 3. Vad vill du */}
      <Steg nr={3} rubrik="Vad vill du göra?" hint="Valfritt — välj flera, alla måste finnas på ön.">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {VILL.map(v => (
            <Pill key={v.chip} active={vill.includes(v.chip)} onClick={() => toggleVill(v.chip)} icon={v.icon}>
              {CHIP_LABEL[v.chip]}
            </Pill>
          ))}
        </div>
      </Steg>

      {/* Resultat */}
      <section id="dag-resultat" aria-labelledby="dag-resultat-rubrik" style={{ marginTop: 28 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
          <h2 id="dag-resultat-rubrik" style={{ fontSize: 22, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--txt)' }}>
            {ranked.length === 0 ? 'Inga öar matchar allt du valt'
              : `${ranked.length} ${ranked.length === 1 ? 'ö' : 'öar'} ${hub === ALLA_HUB_SLUG ? 'längs hela kusten' : `från ${hubInfo?.label ?? ''}`}`}
          </h2>
          <button type="button" onClick={dela} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 999,
            border: '1.5px solid var(--surface-3)', background: 'var(--white)', color: 'var(--sea)',
            fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <Icon name="link" size={14} stroke={2.2} />
            Dela dagen
          </button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 16px', lineHeight: 1.5 }}>
          {iso ? <>Dag: <strong style={{ color: 'var(--txt2)' }}>{fmtDag(iso)}</strong>. </> : null}
          Restiden kommer från ösidan; båttider för dagen hämtar du per ö. Hjärtat sparar ön till Min skärgård.
        </p>

        {ranked.length === 0 && utanFilter.length > 0 && (
          <div style={{ background: 'var(--acc-l)', border: '1px solid rgba(201,110,42,0.25)', borderRadius: 14, padding: '14px 16px', fontSize: 13.5, color: 'var(--txt2)', lineHeight: 1.55, marginBottom: 16 }}>
            Ta bort ett önskemål så dyker öarna upp igen — {utanFilter.length} {utanFilter.length === 1 ? 'ö nås' : 'öar nås'} härifrån utan filter.
          </div>
        )}
        {ranked.length === 0 && utanFilter.length === 0 && hub !== ALLA_HUB_SLUG && (
          <div style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 14, padding: '14px 16px', fontSize: 13.5, color: 'var(--txt2)', lineHeight: 1.55, marginBottom: 16 }}>
            Vi har inga ösidor som nås härifrån ännu. Prova <button type="button" onClick={() => setHub(ALLA_HUB_SLUG)} style={{ border: 'none', background: 'none', color: 'var(--sea)', fontWeight: 700, cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: 'inherit' }}>hela kusten</button>.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visade.map(island => (
            <IslandCard
              key={island.slug}
              island={island}
              iso={iso}
              open={open === island.slug}
              onToggle={() => setOpen(o => (o === island.slug ? null : island.slug))}
            />
          ))}
        </div>
        {!visaAlla && ranked.length > visade.length && (
          <button type="button" onClick={() => setVisaAlla(true)} style={{
            width: '100%', marginTop: 12, padding: '12px 15px', borderRadius: 14,
            background: 'var(--white)', color: 'var(--sea)', border: '1.5px solid var(--surface-3)',
            fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Visa alla {ranked.length} öar
          </button>
        )}
      </section>

      {/* Packlista */}
      <details style={{ marginTop: 24, background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 14, padding: '4px 18px' }}>
        <summary style={{ cursor: 'pointer', padding: '12px 0', fontSize: 14, fontWeight: 700, color: 'var(--txt)', listStyle: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="backpack" size={16} stroke={2.2} />
          Packlista — {seasonLabel(month).toLowerCase()}
        </summary>
        <ul style={{ margin: '0 0 14px', paddingLeft: 20, fontSize: 13.5, color: 'var(--txt2)', lineHeight: 1.7 }}>
          {packingForSeason(month).map(p => <li key={p}>{p}</li>)}
        </ul>
      </details>

      {toast && (
        <div role="status" style={{
          position: 'fixed', left: '50%', bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))', transform: 'translateX(-50%)',
          background: 'var(--txt)', color: '#fff', padding: '10px 16px', borderRadius: 999, fontSize: 13.5, fontWeight: 600,
          boxShadow: 'var(--shadow-md)', zIndex: 50, maxWidth: 'calc(100vw - 32px)',
        }}>
          {toast}
        </div>
      )}
    </div>
  )
}

function Steg({ nr, rubrik, hint, children }: { nr: number; rubrik: string; hint?: string; children: React.ReactNode }) {
  return (
    <section style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 14, padding: '18px 18px 16px', marginBottom: 12 }}>
      <h2 style={{ fontSize: 11, fontWeight: 800, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>
        {nr}. {rubrik}
        {hint && <span style={{ fontWeight: 500, textTransform: 'none', letterSpacing: 0, marginLeft: 8 }}>{hint}</span>}
      </h2>
      {children}
    </section>
  )
}

function Pill({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon?: IconName; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', borderRadius: 999,
        border: `1.5px solid ${active ? 'var(--sea)' : 'var(--surface-3)'}`,
        background: active ? 'var(--sea)' : 'var(--white)',
        color: active ? '#fff' : 'var(--txt)',
        fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .12s',
      }}
    >
      {icon && <Icon name={icon} size={14} stroke={2.2} />}
      {children}
    </button>
  )
}

function IslandCard({ island, iso, open, onToggle }: { island: DagIsland; iso: string | null; open: boolean; onToggle: () => void }) {
  return (
    <article id={`dag-${island.slug}`} style={{
      background: 'var(--white)', borderRadius: 16, padding: '14px 14px 14px 16px',
      border: `1px solid ${open ? 'rgba(30,92,130,0.35)' : 'rgba(10,123,140,0.08)'}`,
      boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <Link href={`/o/${island.slug}`} style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>{island.name}</div>
          <div style={{ fontSize: 12, color: 'var(--txt3)', marginBottom: 6 }}>
            {island.regionLabel}{island.slag !== 'ö' ? ` · ${island.slag}` : ''}
          </div>
          {island.travelTime ? (
            <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <Icon name="clock" size={14} stroke={2.2} />
              <span>
                {island.travelTime}
                {island.travelTimeMatt && (
                  <span title="Kontrollerad mot operatörens tidtabell" style={{ marginLeft: 6, fontSize: 11, fontWeight: 700, color: '#2a9d5c', display: 'inline-flex', alignItems: 'center', gap: 3, verticalAlign: 'middle' }}>
                    <Icon name="check" size={11} stroke={2.6} />Källbelagd
                  </span>
                )}
              </span>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--txt3)' }}>Restid saknas på ösidan.</div>
          )}
          {island.chips.length > 0 && (
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8 }}>
              {island.chips.map(c => (
                <span key={c} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: 'var(--txt2)',
                  background: 'rgba(30,92,130,0.07)', borderRadius: 20, padding: '2px 8px',
                }}>
                  <Icon name={CHIP_ICON[c]} size={11} stroke={2.2} />
                  {CHIP_LABEL[c]}
                </span>
              ))}
            </div>
          )}
        </Link>
        <SaveIslandButton islandSlug={island.slug} islandName={island.name} variant="icon" />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        {island.hasTransit ? (
          <button type="button" onClick={onToggle} aria-expanded={open} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', borderRadius: 999,
            border: 'none', background: open ? 'var(--sea-d)' : 'var(--sea)', color: '#fff',
            fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <Icon name="ship" size={14} stroke={2.2} />
            {open ? 'Dölj båttider' : `Båttider ${iso ? fmtDag(iso) : ''}`}
          </button>
        ) : island.noTransit ? (
          <span style={{ fontSize: 12.5, color: 'var(--txt3)', lineHeight: 1.5, alignSelf: 'center' }}>
            Ingen kollektivtrafik hit — egen båt eller taxibåt.
          </span>
        ) : (
          <Link href={`/o/${island.slug}/komma-dit`} style={{ fontSize: 13, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none', alignSelf: 'center' }}>
            Så tar du dig hit →
          </Link>
        )}
        <Link href={`/o/${island.slug}`} style={{
          display: 'inline-flex', alignItems: 'center', padding: '9px 14px', borderRadius: 999,
          border: '1.5px solid var(--surface-3)', color: 'var(--sea)', fontSize: 13, fontWeight: 700, textDecoration: 'none',
        }}>
          Ösidan →
        </Link>
      </div>

      {open && island.hasTransit && <Battider slug={island.slug} name={island.name} iso={iso} />}
    </article>
  )
}

type Trip = { durationMin: number; startTime: string; endTime: string; changes: number; cancelled?: boolean }
type DepResp = { error?: string; fel?: string | null; originName?: string; destName?: string; note?: string | null; trips?: Trip[] }
type LastResp = { error?: string; originName?: string; destName?: string; outbound?: Trip | null; return?: Trip | null }

function Battider({ slug, name, iso }: { slug: string; name: string; iso: string | null }) {
  const [dep, setDep] = useState<DepResp | null>(null)
  const [last, setLast] = useState<LastResp | null>(null)
  const [fel, setFel] = useState(false)
  const [hamtat, setHamtat] = useState<string | null>(null)

  useEffect(() => {
    if (!iso) return
    let cancelled = false
    setDep(null); setLast(null); setFel(false)
    trackEvent('dagsplan_battider', { island_slug: slug, datum: iso })
    const q = `dest=${encodeURIComponent(slug)}&date=${iso}`
    Promise.all([
      fetch(`/api/transit/departures?${q}`).then(r => (r.ok ? r.json() : Promise.reject(new Error('http')))),
      fetch(`/api/transit/last-departure?${q}`).then(r => (r.ok ? r.json() : Promise.reject(new Error('http')))),
    ]).then(([d, l]) => {
      if (cancelled) return
      setDep(d as DepResp); setLast(l as LastResp)
      setHamtat(new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Stockholm' }))
    }).catch(() => { if (!cancelled) setFel(true) })
    return () => { cancelled = true }
  }, [slug, iso])

  const box: React.CSSProperties = {
    marginTop: 12, borderRadius: 14, padding: '14px 16px',
    background: 'linear-gradient(135deg, #0d2440 0%, #1e5c82 100%)', color: '#fff', fontSize: 13.5, lineHeight: 1.55,
  }

  if (fel) {
    return <div style={box}>Kunde inte hämta tider från Trafiklab just nu. <Link href={`/o/${slug}/komma-dit`} style={{ color: '#9be59c', fontWeight: 700 }}>Så tar du dig till {name} →</Link></div>
  }
  if (!dep || !last) {
    return <div style={{ ...box, opacity: 0.85 }} aria-busy="true">Hämtar båttider från Trafiklab…</div>
  }
  if (dep.error === 'no_transit') {
    return <div style={box}>Ingen kollektivtrafik går till {name}. Egen båt eller taxibåt.</div>
  }
  if (dep.fel) {
    return <div style={box}>Trafiklab svarade inte just nu — försök igen om en stund. <Link href={`/o/${slug}/komma-dit`} style={{ color: '#9be59c', fontWeight: 700 }}>Så tar du dig till {name} →</Link></div>
  }
  if (dep.error) {
    return <div style={box}>Trafiklab har inga tider för {name} den här dagen. <Link href={`/o/${slug}/komma-dit`} style={{ color: '#9be59c', fontWeight: 700 }}>Så tar du dig hit →</Link></div>
  }
  const trips = (dep.trips ?? []).slice(0, 3)
  const hem = last.return ?? null
  return (
    <div style={box}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.8, marginBottom: 6 }}>
        Dit · från {dep.originName}
      </div>
      {trips.length === 0 ? (
        <div style={{ opacity: 0.9 }}>Inga resor hittades i Trafiklab för den dagen. Kontrollera operatörens tidtabell på <Link href={`/o/${slug}/komma-dit`} style={{ color: '#9be59c', fontWeight: 700 }}>ösidan →</Link></div>
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {trips.map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', textDecoration: t.cancelled ? 'line-through' : 'none' }}>
              <span style={{ fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{t.startTime} → {t.endTime}</span>
              <span style={{ opacity: 0.85 }}>{fmtMin(t.durationMin)}{t.changes > 0 ? ` · ${t.changes} ${t.changes === 1 ? 'byte' : 'byten'}` : ' · direkt'}{t.cancelled ? ' · inställd' : ''}</span>
            </li>
          ))}
        </ul>
      )}
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.8, margin: '12px 0 6px' }}>
        Sista båten hem
      </div>
      {hem ? (
        <div>
          <span style={{ fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{hem.startTime}</span> från {last.destName} · framme {hem.endTime} ({fmtMin(hem.durationMin)})
        </div>
      ) : (
        <div style={{ opacity: 0.9 }}>Ingen returresa hittades i Trafiklab för den dagen — kontrollera hos operatören innan du åker.</div>
      )}
      {dep.note && <div style={{ marginTop: 10, fontSize: 12.5, opacity: 0.85 }}>{dep.note}</div>}
      <div style={{ marginTop: 10, fontSize: 11.5, opacity: 0.7 }}>
        Källa: Trafiklab (ResRobot){hamtat ? `, hämtat ${hamtat}` : ''}. Tider kan ändras — kontrollera hos operatören.
      </div>
    </div>
  )
}
