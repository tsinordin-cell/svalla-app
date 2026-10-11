'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { createClient } from '@/lib/supabase'
import { STAGES, KPIS, EXIT_GOAL, currentStage, targetFor, type KpiValues, type KpiKey } from './roadmap-config'
import type { GscSummary, GscQuery, GscPage } from '@/lib/gsc'

// ── Roadmap ────────────────────────────────────────────────────────────────
// Ordningen är medveten: vart vi ska (farleden), var vi är, vad vi gör nu,
// vad vi har klarat — och sist trafiken i detalj. Det ni ska göra ska inte
// hamna under en graf.
//
// Siffrorna räknas på servern varje sidladdning. Milstolparna ligger i
// team_milestones och ändras direkt här, i realtid mellan Tom och Max.

export type Milestone = {
  id: string
  stage: number
  title: string
  detail: string | null
  status: 'todo' | 'doing' | 'done'
  owner: 'tom' | 'max' | 'bada' | null
  done_at: string | null
  sort: number
  created_by: string | null
  created_at: string
}

export type RoadmapMerits = {
  daysSinceStart: number
  places: number
  tasksDone: number
  /** Nya registrerade användare senaste 30 dygnen */
  users30: number
  /** Nya aktiva prenumeranter senaste 30 dygnen */
  subs30: number
}

export type RoadmapTraffic = {
  /** Egen mätning, senaste 30 dygnen, agentsessioner bortrensade. */
  own: { sessions: number; pageviews: number; outbound: number }
  gsc:
    | { ok: true; property: string; fetchedAt: string; summary: GscSummary; topQueries: GscQuery[]; topPages: GscPage[] }
    | { ok: false; reason: string; clientEmail: string | null }
}

type Supa = ReturnType<typeof createClient>

const OWNER_LABEL: Record<NonNullable<Milestone['owner']>, string> = { tom: 'Tom', max: 'Max', bada: 'Båda' }
const OWNER_NEXT: Record<string, Milestone['owner']> = { none: 'tom', tom: 'max', max: 'bada', bada: null }
const STATUS_NEXT: Record<Milestone['status'], Milestone['status']> = { todo: 'doing', doing: 'done', done: 'todo' }
const STATUS_LABEL: Record<Milestone['status'], string> = { todo: 'Inte påbörjad', doing: 'Pågår', done: 'Klar' }

/** De tre siffror en köpare frågar efter först. Resten är bas. */
const DRIVARE: KpiKey[] = ['partners', 'subs', 'revenue']

const MANAD = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']

const fmt = (n: number) => Math.round(n).toLocaleString('sv-SE')
const fmtShort = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toLocaleString('sv-SE', { maximumFractionDigits: 1 })} M`
  : n >= 10_000 ? `${Math.round(n / 1000)} k`
  : fmt(n)
const pct = (n: number) => `${Math.round(n * 100)} %`

function idagSvenskt(): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Stockholm' }).format(new Date())
}

function datumKort(d: string, medAr = true): string {
  const [y, m, day] = d.split('-').map(Number)
  const man = MANAD[(m ?? 1) - 1] ?? ''
  return medAr ? `${day} ${man} ${y}` : `${day} ${man}`
}

function sortMilestones(a: Milestone, b: Milestone) {
  const rank = { doing: 0, todo: 1, done: 2 }
  return rank[a.status] - rank[b.status] || a.sort - b.sort || a.created_at.localeCompare(b.created_at)
}

export default function RoadmapView({
  supabase, kpis, merits, traffic, initialMilestones, currentUserId, onLog,
}: {
  supabase: Supa
  kpis: KpiValues
  merits: RoadmapMerits
  traffic: RoadmapTraffic
  initialMilestones: Milestone[]
  currentUserId: string
  onLog: (message: string) => void
}) {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones)
  const [newTitle, setNewTitle] = useState('')
  const stage = currentStage(kpis)
  const activeStage = Math.min(stage, 3) as 1 | 2 | 3
  const [newStage, setNewStage] = useState<number>(activeStage)
  const [openLater, setOpenLater] = useState(false)
  const [showAllDone, setShowAllDone] = useState(false)
  const [fel, setFel] = useState<string | null>(null)

  // Realtime: den andra ser avbockningen direkt.
  useEffect(() => {
    const ch = supabase
      .channel('team-roadmap')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_milestones' }, payload => {
        setMilestones(prev => {
          if (payload.eventType === 'DELETE') return prev.filter(m => m.id !== (payload.old as { id: string }).id)
          const row = payload.new as Milestone
          const i = prev.findIndex(m => m.id === row.id)
          if (i === -1) return [...prev, row]
          const next = [...prev]; next[i] = row; return next
        })
      })
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [supabase])

  useEffect(() => {
    if (!fel) return
    const t = setTimeout(() => setFel(null), 5000)
    return () => clearTimeout(t)
  }, [fel])

  // Ärligt framsteg: hur många av målen för steget som är nådda. Ett snitt
  // av andelar döljer flaskhalsen — 250 guider väger då upp 0 partners.
  const malStatus = useMemo(() => KPIS.map(k => ({
    k, nadd: kpis[k.key] >= targetFor(k, activeStage),
  })), [kpis, activeStage])
  const kpisMet = malStatus.filter(m => m.nadd).length

  const weakest = useMemo(() => [...KPIS].sort((a, b) =>
    kpis[a.key] / targetFor(a, activeStage) - kpis[b.key] / targetFor(b, activeStage))[0], [kpis, activeStage])

  const nowList = milestones.filter(m => m.stage === activeStage && m.status !== 'done').sort(sortMilestones)
  const laterStages = ([1, 2, 3] as const).filter(s => s > activeStage)
  const done = milestones
    .filter(m => m.status === 'done')
    .sort((a, b) => (b.done_at ?? '').localeCompare(a.done_at ?? '') || b.sort - a.sort)
  const doneShown = showAllDone ? done : done.slice(0, 6)
  const done30 = useMemo(() => {
    const grans = new Date(Date.now() - 30 * 86_400_000).toISOString().slice(0, 10)
    return done.filter(m => (m.done_at ?? '') >= grans).length
  }, [done])

  async function patch(m: Milestone, p: Partial<Milestone>) {
    const prev = milestones
    setMilestones(list => list.map(x => (x.id === m.id ? { ...x, ...p } : x)))
    const { error } = await supabase.from('team_milestones').update(p).eq('id', m.id)
    if (error) { setMilestones(prev); setFel('Ändringen sparades inte. Försök igen.') }
  }

  function cycleStatus(m: Milestone) {
    const status = STATUS_NEXT[m.status]
    const done_at = status === 'done' ? idagSvenskt() : null
    patch(m, { status, done_at })
    if (status === 'done') onLog(`Milstolpe avklarad: ${m.title}`)
  }

  async function add() {
    const title = newTitle.trim()
    if (!title) return
    setNewTitle('')
    const maxSort = Math.max(0, ...milestones.filter(m => m.stage === newStage).map(m => m.sort))
    const { data, error } = await supabase
      .from('team_milestones')
      .insert({ title, stage: newStage, sort: maxSort + 10, created_by: currentUserId })
      .select()
      .single()
    if (error || !data) { setNewTitle(title); setFel('Milstolpen sparades inte. Försök igen.'); return }
    setMilestones(list => (list.some(m => m.id === data.id) ? list : [...list, data as Milestone]))
  }

  async function remove(m: Milestone) {
    if (!confirm(`Ta bort "${m.title}"?`)) return
    const prev = milestones
    setMilestones(list => list.filter(x => x.id !== m.id))
    const { error } = await supabase.from('team_milestones').delete().eq('id', m.id)
    if (error) { setMilestones(prev); setFel('Milstolpen togs inte bort. Försök igen.') }
  }

  const stageMeta = STAGES[activeStage] ?? STAGES[1]!
  const fart: Partial<Record<KpiKey, string>> = {
    subs: merits.subs30 > 0 ? `+${fmt(merits.subs30)} senaste 30 d` : 'Inga nya senaste 30 d',
    users: merits.users30 > 0 ? `+${fmt(merits.users30)} senaste 30 d` : 'Inga nya senaste 30 d',
  }

  return (
    <div className="rm">
      <style>{CSS}</style>

      {fel && <div className="rm-toast" role="status">{fel}</div>}

      <Farled stage={stage} activeStage={activeStage} kpisMet={kpisMet} total={KPIS.length} days={merits.daysSinceStart} />

      {/* ── Var vi är ──────────────────────────────────────────────────── */}
      <section aria-labelledby="rm-lage">
        <div className="rm-h">
          <h2 id="rm-lage">Var vi är</h2>
          <div className="rm-goals" aria-label={`${kpisMet} av ${KPIS.length} mål nådda`}>
            <span>{kpisMet} av {KPIS.length} mål klara för {stageMeta.value}</span>
            <span className="rm-goal-dots" aria-hidden>
              {[...malStatus].sort((a, b) => Number(b.nadd) - Number(a.nadd)).map(({ k, nadd }) => <i key={k.key} className={nadd ? 'on' : ''} title={`${k.label}: ${nadd ? 'nått' : 'inte nått'}`} />)}
            </span>
          </div>
        </div>

        <div className="rm-drivers">
          {KPIS.filter(k => DRIVARE.includes(k.key)).map(k => {
            const v = kpis[k.key]
            const target = targetFor(k, activeStage)
            const p = Math.min(1, v / target)
            const met = v >= target
            const isWeak = k.key === weakest?.key && !met
            return (
              <div key={k.key} className={`rm-driver${met ? ' met' : ''}${isWeak ? ' weak' : ''}`}>
                <div className="rm-driver-top">
                  <span className="rm-driver-label">{k.label}</span>
                  {isWeak && <span className="rm-flag">Flaskhalsen</span>}
                </div>
                <div className="rm-driver-num">
                  {fmt(v)}{k.unit ? <small> {k.unit}</small> : null}
                </div>
                <div className="rm-driver-target">av {fmt(target)}{k.unit ? ` ${k.unit}` : ''} för {stageMeta.value}</div>
                <div className="rm-bar"><span style={{ width: `${Math.max(p * 100, v > 0 ? 1.5 : 0)}%` }} /></div>
                <div className="rm-driver-foot">
                  <span>{met ? 'Nått' : pct(p)}</span>
                  {fart[k.key] && <span className="rm-fart">{fart[k.key]}</span>}
                </div>
                <p className="rm-why">{k.why}</p>
              </div>
            )
          })}
        </div>

        <ul className="rm-base">
          {KPIS.filter(k => !DRIVARE.includes(k.key)).map(k => {
            const v = kpis[k.key]
            const target = targetFor(k, activeStage)
            const p = Math.min(1, v / target)
            const met = v >= target
            return (
              <li key={k.key} className={met ? 'met' : ''} title={k.why}>
                <span className="rm-base-label">{k.label}</span>
                <span className="rm-base-num"><b>{fmt(v)}</b> av {fmtShort(target)}</span>
                <span className="rm-bar thin"><span style={{ width: `${Math.max(p * 100, v > 0 ? 1.5 : 0)}%` }} /></span>
                <span className="rm-base-pct">{met ? 'Nått' : pct(p)}</span>
                {fart[k.key] && <span className="rm-base-fart">{fart[k.key]}</span>}
              </li>
            )
          })}
        </ul>
      </section>

      {/* ── Nästa steg ─────────────────────────────────────────────────── */}
      <section aria-labelledby="rm-nasta">
        <div className="rm-h">
          <h2 id="rm-nasta">Nästa steg</h2>
          <span>Klicka i rutan för att flytta en milstolpe från ej påbörjad till pågår till klar.</span>
        </div>
        <div className="rm-list">
          {nowList.length === 0 && <div className="rm-empty">Allt i det här steget är klart. Skriv nästa milstolpe nedan.</div>}
          {nowList.map(m => (
            <Row key={m.id} m={m} onStatus={cycleStatus} onPatch={p => patch(m, p)} onDelete={remove} />
          ))}
        </div>

        <form className="rm-add" onSubmit={e => { e.preventDefault(); add() }}>
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Ny milstolpe, t.ex. Första partnermötet bokat"
            maxLength={200}
            aria-label="Ny milstolpe"
          />
          <select value={newStage} onChange={e => setNewStage(Number(e.target.value))} aria-label="Vilket steg milstolpen hör till">
            {STAGES.filter(s => s.n > 0).map(s => <option key={s.n} value={s.n}>{s.value}, {s.name.toLowerCase()}</option>)}
          </select>
          <button type="submit" disabled={!newTitle.trim()}>Lägg till</button>
        </form>

        {laterStages.length > 0 && (
          <div className="rm-later">
            <button className="rm-toggle" onClick={() => setOpenLater(v => !v)} aria-expanded={openLater}>
              <Chevron open={openLater} /> Senare steg
              <span>{milestones.filter(m => m.stage > activeStage && m.status !== 'done').length}</span>
            </button>
            {openLater && laterStages.map(s => {
              const items = milestones.filter(m => m.stage === s && m.status !== 'done').sort(sortMilestones)
              return (
                <div key={s} className="rm-later-group">
                  <h3>{STAGES[s]?.value}, {STAGES[s]?.name.toLowerCase()}</h3>
                  <div className="rm-list">
                    {items.length === 0 && <div className="rm-empty">Inga milstolpar ännu.</div>}
                    {items.map(m => <Row key={m.id} m={m} onStatus={cycleStatus} onPatch={p => patch(m, p)} onDelete={remove} />)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Avklarat ───────────────────────────────────────────────────── */}
      <section aria-labelledby="rm-klart">
        <div className="rm-h">
          <h2 id="rm-klart">Det ni har byggt</h2>
          <span>{done30 > 0 ? `${done30} milstolpar klara senaste 30 dagarna` : 'Räknat live'}</span>
        </div>

        <dl className="rm-merits">
          <Merit n={kpis.guides} label="guider" />
          <Merit n={kpis.islands} label="öprofiler" />
          <Merit n={merits.places} label="platssidor" />
          <Merit n={kpis.users} label="registrerade användare" />
          {traffic.gsc.ok
            ? <Merit n={traffic.gsc.summary.totalClicks} label="klick från Google" />
            : <Merit n={merits.daysSinceStart} label="dagar sedan start" />}
          {traffic.gsc.ok
            ? <Merit n={traffic.gsc.summary.totalImpressions} label="visningar i Google" />
            : <Merit n={traffic.own.pageviews} label="sidvisningar, 30 d" />}
          <Merit n={merits.tasksDone} label="kort klara på tavlan" />
          <Merit n={done.length} label="milstolpar avklarade" />
        </dl>

        <ol className="rm-timeline">
          {doneShown.map(m => (
            <DoneItem key={m.id} m={m} onUndo={() => cycleStatus(m)} onPatch={p => patch(m, p)} />
          ))}
        </ol>
        {done.length > 6 && (
          <button className="rm-toggle" onClick={() => setShowAllDone(v => !v)} aria-expanded={showAllDone}>
            <Chevron open={showAllDone} /> {showAllDone ? 'Visa färre' : `Visa alla ${done.length}`}
          </button>
        )}
      </section>

      {/* ── Trafik ─────────────────────────────────────────────────────── */}
      <Traffic t={traffic} />
    </div>
  )
}

// ── Farleden ───────────────────────────────────────────────────────────────
// Värdetrappan som en sjöväg: ett sjömärke per steg, och båten står där ni
// är. Mellan två märken flyttas den efter hur många av stegets mål som är
// nådda — inte efter ett snitt.

const MARK_X = [10, 36.67, 63.33, 90] // procent av bredden

function Farled({ stage, activeStage, kpisMet, total, days }: {
  stage: 1 | 2 | 3 | 4; activeStage: 1 | 2 | 3; kpisMet: number; total: number; days: number
}) {
  const fran = MARK_X[activeStage - 1]!
  const till = MARK_X[activeStage]!
  const andel = stage === 4 ? 1 : kpisMet / total
  const bat = stage === 4 ? MARK_X[3]! : fran + (till - fran) * Math.max(0.04, Math.min(0.96, andel))
  const nasta = STAGES[activeStage]!

  return (
    <section className="rm-hero" aria-labelledby="rm-mal">
      <div className="rm-hero-top">
        <div>
          <h2 id="rm-mal" className="rm-hero-goal">Exit {EXIT_GOAL.range}</h2>
          <p className="rm-hero-sub">Målet är {EXIT_GOAL.year}. Dag {fmt(days)} sedan första commit.</p>
        </div>
        <Link href="/admin/malet" className="rm-hero-link">Värderingsmodellen</Link>
      </div>

      <div className="rm-route" role="img" aria-label={`Farleden: ${kpisMet} av ${total} mål klara på väg mot ${nasta.value}`}>
        <div className="rm-route-sea" aria-hidden>
          <span className="rm-lane done" style={{ left: `${MARK_X[0]}%`, width: `${bat - MARK_X[0]!}%` }} />
          <span className="rm-lane ahead" style={{ left: `${bat}%`, width: `${MARK_X[3]! - bat}%` }} />
          {STAGES.map((s, i) => {
            const passed = s.n === 0 || s.n < stage
            const next = s.n === activeStage && stage !== 4
            return (
              <span key={s.n} className={`rm-mark${passed ? ' passed' : ''}${next ? ' next' : ''}`} style={{ left: `${MARK_X[i]}%` }}>
                {passed && <Check size={11} />}
              </span>
            )
          })}
          <span className="rm-boat" style={{ left: `${bat}%` }}><Boat /></span>
        </div>
        <ol className="rm-route-labels">
          {STAGES.map(s => {
            const passed = s.n === 0 || s.n < stage
            const next = s.n === activeStage && stage !== 4
            return (
              <li key={s.n} className={passed ? 'passed' : next ? 'next' : ''}>
                <b>{s.value}</b>
                <span>{s.name}</span>
              </li>
            )
          })}
        </ol>
      </div>

      <p className="rm-hero-now">
        <b>Nu: {nasta.value}, {nasta.name.toLowerCase()}.</b> {nasta.tagline} {kpisMet} av {total} mål är klara.
      </p>
    </section>
  )
}

function Boat() {
  return (
    <svg width="30" height="26" viewBox="0 0 30 26" aria-hidden>
      <path d="M14 2 L14 18 L4 18 Z" fill="currentColor" opacity=".95" />
      <path d="M16 6 L16 18 L23 18 Z" fill="currentColor" opacity=".7" />
      <path d="M3 20 H27 L23.5 24.5 H6.5 Z" fill="#f5b942" />
    </svg>
  )
}

// ── Milstolpe (pågående / att göra) ─────────────────────────────────────────

function Row({ m, onStatus, onPatch, onDelete }: {
  m: Milestone
  onStatus: (m: Milestone) => void
  onPatch: (p: Partial<Milestone>) => void
  onDelete: (m: Milestone) => void
}) {
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(m.title)
  const [detail, setDetail] = useState(m.detail ?? '')

  function spara() {
    const t = title.trim()
    if (!t) return
    onPatch({ title: t, detail: detail.trim() || null })
    setEdit(false)
  }

  if (edit) {
    return (
      <form className="rm-row rm-editing" onSubmit={e => { e.preventDefault(); spara() }}>
        <div className="rm-edit-fields">
          <input value={title} onChange={e => setTitle(e.target.value)} maxLength={200} aria-label="Titel" autoComplete="off" />
          <textarea value={detail} onChange={e => setDetail(e.target.value)} maxLength={1000} rows={2} placeholder="Beskrivning (valfri)" aria-label="Beskrivning" />
        </div>
        <div className="rm-edit-actions">
          <button type="submit" className="primary" disabled={!title.trim()}>Spara</button>
          <button type="button" onClick={() => { setEdit(false); setTitle(m.title); setDetail(m.detail ?? '') }}>Avbryt</button>
          <button type="button" className="danger" onClick={() => onDelete(m)}>Ta bort</button>
        </div>
      </form>
    )
  }

  return (
    <div className={`rm-row rm-${m.status}`}>
      <button
        className="rm-check"
        onClick={() => onStatus(m)}
        aria-label={`${m.title}: ${STATUS_LABEL[m.status]}. Ändra till ${STATUS_LABEL[STATUS_NEXT[m.status]].toLowerCase()}.`}
        title={`Ändra till ${STATUS_LABEL[STATUS_NEXT[m.status]].toLowerCase()}`}
      >
        {m.status === 'done' ? <Check /> : m.status === 'doing' ? <span className="rm-half" /> : null}
      </button>
      <div className="rm-row-body">
        <div className="rm-row-title">{m.title}</div>
        {m.detail && <div className="rm-row-detail">{m.detail}</div>}
      </div>
      {m.status === 'doing' && <span className="rm-pill">Pågår</span>}
      <button
        className={`rm-owner${m.owner ? '' : ' none'}`}
        onClick={() => onPatch({ owner: OWNER_NEXT[m.owner ?? 'none'] ?? null })}
        title="Vem driver den? Klicka för att byta."
      >
        {m.owner ? OWNER_LABEL[m.owner] : 'Vem tar den?'}
      </button>
      <button className="rm-icon" onClick={() => setEdit(true)} aria-label={`Redigera ${m.title}`} title="Redigera">
        <Pen />
      </button>
    </div>
  )
}

// ── Avklarad milstolpe (tidslinjen) ─────────────────────────────────────────

function DoneItem({ m, onUndo, onPatch }: { m: Milestone; onUndo: () => void; onPatch: (p: Partial<Milestone>) => void }) {
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(m.title)
  const [detail, setDetail] = useState(m.detail ?? '')
  const [datum, setDatum] = useState(m.done_at ?? '')

  if (edit) {
    return (
      <li className="rm-tl-edit">
        <span className="rm-tl-dot" aria-hidden />
        <form onSubmit={e => {
          e.preventDefault()
          const t = title.trim()
          if (!t) return
          onPatch({ title: t, detail: detail.trim() || null, done_at: datum || m.done_at })
          setEdit(false)
        }}>
          <input type="date" value={datum} onChange={e => setDatum(e.target.value)} aria-label="Datum" />
          <input value={title} onChange={e => setTitle(e.target.value)} maxLength={200} aria-label="Titel" />
          <textarea value={detail} onChange={e => setDetail(e.target.value)} maxLength={1000} rows={2} placeholder="Beskrivning (valfri)" aria-label="Beskrivning" />
          <div className="rm-edit-actions">
            <button type="submit" className="primary" disabled={!title.trim()}>Spara</button>
            <button type="button" onClick={() => setEdit(false)}>Avbryt</button>
            <button type="button" onClick={() => { setEdit(false); onUndo() }}>Markera som inte klar</button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li>
      <span className="rm-tl-dot" aria-hidden />
      <time className="rm-tl-date" dateTime={m.done_at ?? undefined}>{m.done_at ? datumKort(m.done_at) : 'Utan datum'}</time>
      <div className="rm-tl-body">
        <div className="rm-tl-title">
          {m.title}
          {m.owner && <span className="rm-owner static">{OWNER_LABEL[m.owner]}</span>}
        </div>
        {m.detail && <div className="rm-tl-detail">{m.detail}</div>}
      </div>
      <button className="rm-icon" onClick={() => setEdit(true)} aria-label={`Redigera ${m.title}`} title="Redigera">
        <Pen />
      </button>
    </li>
  )
}

function Merit({ n, label }: { n: number; label: string }) {
  return (
    <div className="rm-merit">
      <dt>{label}</dt>
      <dd>{fmt(n)}</dd>
    </div>
  )
}

// ── Trafik ─────────────────────────────────────────────────────────────────

function delta(now: number, prev: number): { text: string; up: boolean } | null {
  if (!prev) return now > 0 ? { text: 'ny', up: true } : null
  const p = Math.round(((now - prev) / prev) * 100)
  return { text: `${p > 0 ? '+' : p < 0 ? '−' : ''}${Math.abs(p)} %`, up: p >= 0 }
}

function Traffic({ t }: { t: RoadmapTraffic }) {
  const g = t.gsc
  return (
    <section aria-labelledby="rm-trafik">
      <div className="rm-h">
        <h2 id="rm-trafik">Trafik</h2>
        <span>{g.ok && g.summary.lastDate ? `Google, 28 dagar till ${datumKort(g.summary.lastDate)}. Uppdateras var sjätte timme.` : 'Egen mätning, senaste 30 dygnen'}</span>
      </div>

      {g.ok ? <GscBlock g={g} own={t.own} /> : (
        <>
          <div className="rm-gsc-off">
            <b>Google-siffrorna saknas just nu.</b> {g.reason}
            {g.clientEmail && (
              <ol>
                <li>Öppna <a href="https://search.google.com/search-console/users" target="_blank" rel="noreferrer">Search Console, Användare och behörigheter</a> för svalla.se.</li>
                <li>Lägg till <code>{g.clientEmail}</code> med behörigheten Begränsad.</li>
                <li>Ladda om sidan.</li>
              </ol>
            )}
          </div>
          <OwnLine own={t.own} />
        </>
      )}
    </section>
  )
}

function OwnLine({ own }: { own: RoadmapTraffic['own'] }) {
  return (
    <p className="rm-own">
      Egen mätning, 30 dygn, bara besökare som sagt ja till statistik: <b>{fmt(own.sessions)}</b> besök,{' '}
      <b>{fmt(own.pageviews)}</b> sidvisningar och <b>{fmt(own.outbound)}</b> {own.outbound === 1 ? 'klick' : 'klick'} vidare till verksamheter.
    </p>
  )
}

function GscBlock({ g, own }: { g: Extract<RoadmapTraffic['gsc'], { ok: true }>; own: RoadmapTraffic['own'] }) {
  const s = g.summary
  const dc = delta(s.clicks28, s.clicksPrev28)
  const di = delta(s.impressions28, s.impressionsPrev28)
  const max = Math.max(1, ...s.weeks.map(w => w.clicks))
  const toppIdx = s.weeks.findIndex(w => w.clicks === max)
  const sista = s.weeks[s.weeks.length - 1]

  return (
    <>
      <div className="rm-stats">
        <Stat label="Klick" value={fmt(s.clicks28)} delta={dc} />
        <Stat label="Visningar" value={fmt(s.impressions28)} delta={di} />
        <Stat label="Klickfrekvens" value={`${(s.ctr28 * 100).toLocaleString('sv-SE', { maximumFractionDigits: 1 })} %`} />
        <Stat label="Snittposition" value={s.position28 ? s.position28.toLocaleString('sv-SE', { maximumFractionDigits: 1 }) : '–'} />
      </div>

      {s.weeks.length > 1 && (
        <figure className="rm-chart">
          <figcaption>
            <span>Klick från Google per vecka</span>
            {sista && <span>Senaste veckan: <b>{fmt(sista.clicks)}</b></span>}
          </figcaption>
          <div className="rm-bars" role="img" aria-label={`Klick per vecka. Toppen ${fmt(max)} klick veckan från ${datumKort(s.weeks[toppIdx]?.start ?? '', false)}.`}>
            {s.weeks.map((w, i) => {
              const manad = Number(w.start.slice(5, 7))
              const forra = i > 0 ? Number(s.weeks[i - 1]!.start.slice(5, 7)) : -1
              return (
                <div key={w.start} className={`rm-bar-col${i === toppIdx ? ' top' : ''}`} title={`Veckan från ${datumKort(w.start)}: ${fmt(w.clicks)} klick, ${fmt(w.impressions)} visningar`}>
                  {i === toppIdx && <span className="rm-bar-peak">{fmt(w.clicks)}</span>}
                  <span className="rm-bar-fill" style={{ height: `${Math.max((w.clicks / max) * 100, w.clicks ? 2 : 0)}%` }} />
                  <span className="rm-bar-month">{manad !== forra ? MANAD[manad - 1] : ''}</span>
                </div>
              )
            })}
          </div>
        </figure>
      )}

      <div className="rm-two">
        <MilestoneLadder title="Klick per 28 dagar" items={s.clickMilestones} current={s.clicks28} />
        <MilestoneLadder title="Visningar per 28 dagar" items={s.impressionMilestones} current={s.impressions28} />
      </div>

      <div className="rm-two">
        {g.topQueries.length > 0 && (
          <div className="rm-panel">
            <h3>Sökord som ger klick</h3>
            <table className="rm-table">
              <thead><tr><th scope="col">Sökord</th><th scope="col">Klick</th><th scope="col">Visn.</th><th scope="col">Pos.</th></tr></thead>
              <tbody>
                {g.topQueries.map(q => (
                  <tr key={q.query}>
                    <td>{q.query}</td><td>{fmt(q.clicks)}</td><td>{fmt(q.impressions)}</td>
                    <td>{q.position.toLocaleString('sv-SE', { maximumFractionDigits: 1 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {g.topPages.length > 0 && (
          <div className="rm-panel">
            <h3>Sidor som ger klick</h3>
            <table className="rm-table">
              <thead><tr><th scope="col">Sida</th><th scope="col">Klick</th><th scope="col">Visn.</th></tr></thead>
              <tbody>
                {g.topPages.map(p => {
                  const path = p.page.replace(/^https?:\/\/(www\.)?svalla\.se/, '') || '/'
                  return (
                    <tr key={p.page}>
                      <td><a href={path} target="_blank" rel="noreferrer">{path}</a></td><td>{fmt(p.clicks)}</td><td>{fmt(p.impressions)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <OwnLine own={own} />
      <p className="rm-foot">
        {s.bestDay && <>Bästa dagen hittills: {fmt(s.bestDay.clicks)} klick den {datumKort(s.bestDay.date)}. </>}
        Google-data sedan {s.firstDate ? datumKort(s.firstDate) : '–'}.
      </p>
    </>
  )
}

function MilestoneLadder({ title, items, current }: { title: string; items: { threshold: number; reachedAt: string | null }[]; current: number }) {
  const nextIdx = items.findIndex(m => !m.reachedAt)
  return (
    <div className="rm-panel">
      <h3>{title}</h3>
      <ul className="rm-ms">
        {items.map((m, i) => {
          const isNext = i === nextIdx
          if (nextIdx !== -1 && i > nextIdx + 1) return null
          return (
            <li key={m.threshold} className={m.reachedAt ? 'got' : isNext ? 'next' : 'later'}>
              <span className="rm-ms-dot" aria-hidden>{m.reachedAt ? <Check size={10} /> : null}</span>
              <span className="rm-ms-n">{fmtShort(m.threshold)}</span>
              <span className="rm-ms-when">
                {m.reachedAt ? datumKort(m.reachedAt)
                  : isNext ? `${pct(Math.min(1, current / m.threshold))} dit, ${fmt(m.threshold - current)} kvar`
                  : 'Därefter'}
              </span>
              {isNext && <span className="rm-bar thin rm-ms-bar"><span style={{ width: `${Math.min(100, (current / m.threshold) * 100)}%` }} /></span>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Stat({ label, value, delta: d }: { label: string; value: string; delta?: { text: string; up: boolean } | null }) {
  return (
    <div className="rm-stat">
      <div className="rm-stat-label">{label}</div>
      <div className="rm-stat-v">{value}</div>
      {d && <div className={`rm-delta ${d.up ? 'up' : 'down'}`}>{d.text} <span>mot förra 28 d</span></div>}
    </div>
  )
}

// ── Ikoner ─────────────────────────────────────────────────────────────────

function Check({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  )
}
function Chevron({ open }: { open: boolean }) {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden
      style={{ transform: open ? 'rotate(90deg)' : undefined, transition: 'transform .15s' }}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}
function Pen() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
}

const CSS = `
.rm { display: flex; flex-direction: column; gap: 40px; padding-bottom: 48px; }
.rm h2 { font-size: 19px; font-weight: 700; color: var(--txt); margin: 0; font-family: var(--font-display), var(--font-display-fallback); letter-spacing: -.01em; }
.rm h3 { font-size: 13px; font-weight: 700; color: var(--txt2); margin: 0 0 10px; font-family: inherit; letter-spacing: 0; }
.rm-h { display: flex; align-items: baseline; justify-content: space-between; gap: 6px 16px; flex-wrap: wrap; margin-bottom: 14px; }
.rm-h > span { font-size: 12.5px; color: var(--txt3); }
.rm :focus-visible { outline: 2px solid var(--sea); outline-offset: 2px; border-radius: 6px; }

.rm-toast { position: fixed; left: 50%; bottom: 84px; transform: translateX(-50%); z-index: 40; background: var(--txt); color: var(--bg); padding: 10px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; box-shadow: var(--shadow-md); }

/* ── Farleden ───────────────────────────────────────────── */
.rm-hero { border-radius: 18px; padding: 26px 28px 22px; color: #fff; background: linear-gradient(160deg, #1a5378 0%, #0f3550 55%, #0b2a40 100%); box-shadow: var(--shadow-sm); overflow: hidden; position: relative; }
[data-theme="dark"] .rm-hero { background: linear-gradient(160deg, #123c57 0%, #08202f 100%); border: 1px solid rgba(255,255,255,0.08); }
.rm-hero-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
.rm .rm-hero-goal { font-size: 40px; line-height: 1.05; color: #fff; letter-spacing: -.02em; }
.rm-hero-sub { font-size: 13.5px; color: rgba(255,255,255,0.72); margin: 6px 0 0; }
.rm-hero-link { font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.82); text-decoration: none; border: 1px solid rgba(255,255,255,0.24); padding: 7px 12px; border-radius: 8px; white-space: nowrap; }
.rm-hero-link:hover { color: #fff; border-color: rgba(255,255,255,0.5); }

.rm-route { margin-top: 30px; }
.rm-route-sea { position: relative; height: 46px; }
.rm-lane { position: absolute; top: 27px; height: 3px; border-radius: 3px; }
.rm-lane.done { background: linear-gradient(90deg, #4fd1a1, #f5b942); }
.rm-lane.ahead { background: repeating-linear-gradient(90deg, rgba(255,255,255,0.38) 0 7px, transparent 7px 14px); }
.rm-mark { position: absolute; top: 20px; width: 17px; height: 17px; margin-left: -8.5px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.45); background: #0f3550; display: flex; align-items: center; justify-content: center; color: #08311f; }
.rm-mark.passed { background: #4fd1a1; border-color: #4fd1a1; }
.rm-mark.next { border-color: #f5b942; box-shadow: 0 0 0 5px rgba(245,185,66,0.18); }
.rm-boat { position: absolute; top: -2px; margin-left: -15px; color: #fff; filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); }
@media (prefers-reduced-motion: no-preference) {
  .rm-boat { animation: rmGung 3.2s ease-in-out infinite; }
  @keyframes rmGung { 0%,100% { transform: translateY(0) rotate(-2deg) } 50% { transform: translateY(-2px) rotate(2deg) } }
}
.rm-route-labels { list-style: none; margin: 8px 0 0; padding: 0; position: relative; height: 40px; }
.rm-route-labels li { position: absolute; transform: translateX(-50%); text-align: center; white-space: nowrap; display: flex; flex-direction: column; gap: 1px; }
.rm-route-labels li:nth-child(1) { left: 10%; }
.rm-route-labels li:nth-child(2) { left: 36.67%; }
.rm-route-labels li:nth-child(3) { left: 63.33%; }
.rm-route-labels li:nth-child(4) { left: 90%; }
.rm-route-labels b { font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.82); }
.rm-route-labels span { font-size: 12px; color: rgba(255,255,255,0.7); }
.rm-route-labels li.passed b, .rm-route-labels li.passed span { color: #8fe6c4; }
.rm-route-labels li.next b { color: #fff; }
.rm-route-labels li.next span { color: rgba(255,255,255,0.8); }
.rm-hero-now { margin: 18px 0 0; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.12); font-size: 13.5px; color: rgba(255,255,255,0.78); line-height: 1.5; }
.rm-hero-now b { color: #fff; }

/* ── Var vi är ──────────────────────────────────────────── */
.rm-goals { display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: var(--txt3); }
.rm-goal-dots { display: inline-flex; gap: 4px; }
.rm-goal-dots i { width: 10px; height: 10px; border-radius: 3px; background: var(--svt-chip-bg); border: 1px solid var(--svt-border-strong); }
.rm-goal-dots i.on { background: var(--green); border-color: var(--green); }

.rm-drivers { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.rm-driver { background: var(--white); border: 1px solid var(--svt-border); border-radius: 14px; padding: 16px 18px 14px; box-shadow: var(--shadow-xs); display: flex; flex-direction: column; }
.rm-driver.weak { border-color: var(--amber); box-shadow: inset 0 0 0 1px var(--amber); }
.rm-driver-top { display: flex; justify-content: space-between; align-items: center; gap: 8px; min-height: 22px; }
.rm-driver-label { font-size: 13px; font-weight: 600; color: var(--txt2); }
.rm-flag { font-size: 11px; font-weight: 700; color: var(--amber); background: var(--svt-chip-bg); padding: 2px 8px; border-radius: 999px; }
.rm-driver-num { font-size: 40px; font-weight: 700; line-height: 1.1; margin-top: 6px; color: var(--txt); font-family: var(--font-display), var(--font-display-fallback); font-variant-numeric: tabular-nums lining-nums; letter-spacing: -.02em; }
.rm-driver-num small { font-size: 18px; font-weight: 600; color: var(--txt3); letter-spacing: 0; }
.rm-driver-target { font-size: 12.5px; color: var(--txt3); margin-top: 2px; }
.rm-bar { display: block; height: 7px; border-radius: 7px; background: var(--svt-chip-bg); margin-top: 12px; overflow: hidden; }
.rm-bar.thin { height: 5px; margin-top: 0; }
.rm-bar > span { display: block; height: 100%; border-radius: inherit; background: var(--sea); }
.rm-driver.weak .rm-bar > span { background: var(--amber); }
.met .rm-bar > span { background: var(--green); }
.rm-driver-foot { display: flex; justify-content: space-between; gap: 8px; font-size: 12px; font-weight: 600; color: var(--txt3); margin-top: 7px; }
.rm-driver.met .rm-driver-foot > span:first-child { color: var(--green); }
.rm-fart { color: var(--txt2); }
.rm-why { font-size: 12px; line-height: 1.45; color: var(--txt3); margin: 10px 0 0; padding-top: 10px; border-top: 1px solid var(--svt-divider); }

.rm-base { list-style: none; margin: 12px 0 0; padding: 4px 18px; background: var(--white); border: 1px solid var(--svt-border); border-radius: 14px; box-shadow: var(--shadow-xs); }
.rm-base li { display: grid; grid-template-columns: minmax(150px, 1.2fr) minmax(110px, .9fr) minmax(80px, 2fr) 44px minmax(0, 1fr); align-items: center; gap: 14px; padding: 11px 0; font-size: 13px; border-top: 1px solid var(--svt-divider); }
.rm-base li:first-child { border-top: none; }
.rm-base-label { color: var(--txt2); font-weight: 600; }
.rm-base-num { color: var(--txt3); font-variant-numeric: tabular-nums; }
.rm-base-num b { color: var(--txt); font-size: 14px; }
.rm-base-pct { font-size: 12px; font-weight: 600; color: var(--txt3); text-align: right; font-variant-numeric: tabular-nums; }
.rm-base li.met .rm-base-pct { color: var(--green); }
.rm-base-fart { font-size: 12px; color: var(--txt3); text-align: right; }

/* ── Nästa steg ─────────────────────────────────────────── */
.rm-list { display: flex; flex-direction: column; gap: 6px; }
.rm-row { display: flex; align-items: center; gap: 12px; background: var(--white); border: 1px solid var(--svt-border); border-radius: 12px; padding: 11px 12px; box-shadow: var(--shadow-xs); }
.rm-row.rm-doing { border-left: 3px solid var(--amber); padding-left: 10px; }
.rm-check { width: 24px; height: 24px; border-radius: 7px; border: 2px solid var(--svt-border-strong); background: transparent; cursor: pointer; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; color: #fff; padding: 0; }
.rm-check:hover { border-color: var(--sea); }
.rm-doing .rm-check { border-color: var(--amber); }
.rm-half { width: 9px; height: 9px; border-radius: 2px; background: var(--amber); }
.rm-done .rm-check { background: var(--green); border-color: var(--green); }
.rm-row-body { flex: 1; min-width: 0; }
.rm-row-title { font-size: 14px; font-weight: 600; color: var(--txt); }
.rm-row-detail { font-size: 12.5px; color: var(--txt3); margin-top: 2px; line-height: 1.45; }
.rm-pill { font-size: 11px; font-weight: 700; color: var(--amber); background: var(--svt-chip-bg); padding: 3px 9px; border-radius: 999px; flex-shrink: 0; }
.rm-owner { font-size: 12px; font-weight: 700; padding: 5px 10px; border-radius: 999px; border: 1px solid var(--svt-border-strong); background: var(--svt-tint-bg); color: var(--sea); cursor: pointer; flex-shrink: 0; min-width: 58px; }
.rm-owner.none { background: transparent; color: var(--txt3); font-weight: 600; border-style: dashed; }
.rm-owner.static { cursor: default; margin-left: 8px; padding: 2px 8px; font-size: 11px; min-width: 0; }
.rm-icon { border: none; background: transparent; color: var(--txt3); cursor: pointer; padding: 6px; border-radius: 8px; display: inline-flex; flex-shrink: 0; }
.rm-icon:hover { color: var(--txt); background: var(--svt-hover-bg); }
.rm-empty { border: 1.5px dashed var(--svt-border-strong); border-radius: 12px; padding: 16px; text-align: center; color: var(--txt3); font-size: 13px; }

.rm-editing { flex-direction: column; align-items: stretch; gap: 10px; }
.rm-edit-fields { display: flex; flex-direction: column; gap: 6px; }
.rm input, .rm textarea, .rm select { padding: 9px 12px; border-radius: 9px; border: 1.5px solid var(--input-border); background: var(--input-bg); color: var(--txt); font-size: 13.5px; font-family: inherit; outline: none; min-width: 0; }
.rm input:focus, .rm textarea:focus, .rm select:focus { border-color: var(--sea); }
.rm textarea { resize: vertical; line-height: 1.45; }
.rm-edit-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.rm-edit-actions button, .rm-add button { padding: 8px 14px; border-radius: 9px; border: 1.5px solid var(--svt-border-strong); background: transparent; color: var(--txt2); font-size: 13px; font-weight: 600; cursor: pointer; }
.rm-edit-actions button.primary, .rm-add button { border-color: transparent; background: var(--sea-knapp); color: #fff; }
.rm-edit-actions button.danger { margin-left: auto; color: var(--red, #c0392b); border-color: transparent; }
.rm-edit-actions button:disabled, .rm-add button:disabled { opacity: .45; cursor: default; }

.rm-add { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
.rm-add input { flex: 1 1 260px; }
.rm-later { margin-top: 14px; }
.rm-later-group { margin-top: 12px; }
.rm-toggle { border: none; background: transparent; color: var(--txt2); font-size: 13px; font-weight: 700; cursor: pointer; padding: 6px 0; display: inline-flex; gap: 6px; align-items: center; }
.rm-toggle span { font-weight: 600; color: var(--txt3); }

/* ── Det ni har byggt ───────────────────────────────────── */
.rm-merits { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin: 0 0 22px; background: var(--white); border: 1px solid var(--svt-border); border-radius: 14px; box-shadow: var(--shadow-xs); overflow: hidden; }
.rm-merit { padding: 16px 18px; border-right: 1px solid var(--svt-divider); border-bottom: 1px solid var(--svt-divider); display: flex; flex-direction: column-reverse; gap: 2px; }
.rm-merit:nth-child(4n) { border-right: none; }
.rm-merit:nth-last-child(-n+4) { border-bottom: none; }
.rm-merit dd { margin: 0; font-size: 28px; font-weight: 700; color: var(--sea); line-height: 1.1; font-family: var(--font-display), var(--font-display-fallback); font-variant-numeric: tabular-nums lining-nums; }
.rm-merit dt { font-size: 12.5px; color: var(--txt3); }

.rm-timeline { list-style: none; margin: 0; padding: 0 0 0 4px; position: relative; }
.rm-timeline::before { content: ''; position: absolute; left: 9px; top: 10px; bottom: 10px; width: 2px; background: var(--svt-border-strong); }
.rm-timeline > li { position: relative; display: grid; grid-template-columns: 96px 1fr auto; gap: 14px; padding: 9px 0 9px 28px; align-items: start; }
.rm-tl-dot { position: absolute; left: 3px; top: 12px; width: 14px; height: 14px; border-radius: 50%; background: var(--green); border: 3px solid var(--bg); }
.rm-tl-date { font-size: 12.5px; color: var(--txt3); font-weight: 600; padding-top: 1px; font-variant-numeric: tabular-nums; }
.rm-tl-title { font-size: 14px; font-weight: 600; color: var(--txt); }
.rm-tl-detail { font-size: 12.5px; color: var(--txt3); margin-top: 2px; line-height: 1.45; }
.rm-timeline .rm-icon { opacity: 0; margin-top: -4px; }
.rm-timeline > li:hover .rm-icon, .rm-timeline .rm-icon:focus-visible { opacity: 1; }
@media (hover: none) { .rm-timeline .rm-icon { opacity: .7; } }
.rm-tl-edit { display: block !important; }
.rm-tl-edit form { display: flex; flex-direction: column; gap: 6px; max-width: 560px; }
.rm-tl-edit input[type="date"] { align-self: flex-start; }

/* ── Trafik ─────────────────────────────────────────────── */
.rm-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); background: var(--white); border: 1px solid var(--svt-border); border-radius: 14px; box-shadow: var(--shadow-xs); overflow: hidden; }
.rm-stat { padding: 14px 18px; border-right: 1px solid var(--svt-divider); }
.rm-stat:last-child { border-right: none; }
.rm-stat-label { font-size: 12.5px; color: var(--txt3); font-weight: 600; }
.rm-stat-v { font-size: 24px; font-weight: 700; color: var(--txt); margin-top: 2px; font-variant-numeric: tabular-nums; }
.rm-delta { font-size: 12.5px; font-weight: 700; margin-top: 2px; white-space: nowrap; }
.rm-delta span { font-weight: 500; color: var(--txt3); }
.rm-delta.up { color: var(--green); }
.rm-delta.down { color: var(--red, #c0392b); }

.rm-chart { margin: 12px 0 0; background: var(--white); border: 1px solid var(--svt-border); border-radius: 14px; padding: 14px 18px 10px; box-shadow: var(--shadow-xs); }
.rm-chart figcaption { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; font-weight: 600; color: var(--txt2); margin-bottom: 26px; flex-wrap: wrap; }
.rm-chart figcaption span:last-child { font-weight: 500; color: var(--txt3); }
.rm-chart figcaption b { color: var(--txt); }
.rm-bars { display: flex; align-items: flex-end; gap: 4px; height: 140px; padding-bottom: 20px; position: relative; border-bottom: 1px solid var(--svt-divider); }
.rm-bar-col { flex: 1; height: 100%; position: relative; display: flex; align-items: flex-end; }
.rm-bar-fill { display: block; width: 100%; border-radius: 3px 3px 0 0; background: var(--sea); opacity: .75; transition: opacity .12s; }
.rm-bar-col:hover .rm-bar-fill, .rm-bar-col.top .rm-bar-fill { opacity: 1; }
.rm-bar-peak { position: absolute; left: 50%; transform: translateX(-50%); bottom: calc(100% + 4px); font-size: 11.5px; font-weight: 700; color: var(--txt); white-space: nowrap; }
.rm-bar-col.top .rm-bar-peak { bottom: auto; top: -20px; }
.rm-bar-month { position: absolute; left: 0; bottom: -19px; font-size: 11px; color: var(--txt3); white-space: nowrap; }

.rm-two { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
.rm-panel { background: var(--white); border: 1px solid var(--svt-border); border-radius: 14px; padding: 14px 18px; box-shadow: var(--shadow-xs); min-width: 0; }
.rm-ms { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.rm-ms li { display: grid; grid-template-columns: 20px 58px 1fr; align-items: center; gap: 8px; font-size: 13px; }
.rm-ms-dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--svt-border-strong); display: inline-flex; align-items: center; justify-content: center; color: #fff; }
.rm-ms li.got .rm-ms-dot { background: var(--green); border-color: var(--green); }
.rm-ms li.next .rm-ms-dot { border-color: var(--amber); }
.rm-ms-n { font-weight: 700; color: var(--txt); font-variant-numeric: tabular-nums; }
.rm-ms li.later { opacity: .55; }
.rm-ms-when { color: var(--txt3); font-size: 12.5px; }
.rm-ms li.next .rm-ms-when { color: var(--amber); font-weight: 600; }
.rm-ms-bar { grid-column: 2 / -1; }
.rm-ms-bar > span { background: var(--amber); }

.rm-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.rm-table th { text-align: right; font-size: 11.5px; color: var(--txt3); font-weight: 600; padding: 2px 0 7px 10px; }
.rm-table th:first-child, .rm-table td:first-child { text-align: left; padding-left: 0; }
.rm-table td { text-align: right; padding: 6px 0 6px 10px; border-top: 1px solid var(--svt-divider); color: var(--txt2); font-variant-numeric: tabular-nums; }
.rm-table td:first-child { color: var(--txt); max-width: 0; width: 62%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rm-table a { color: var(--sea); text-decoration: none; }
.rm-table a:hover { text-decoration: underline; }

.rm-own { margin: 14px 0 0; font-size: 13px; color: var(--txt3); line-height: 1.5; }
.rm-own b { color: var(--txt); }
.rm-foot { font-size: 12px; color: var(--txt3); margin: 6px 0 0; }
.rm-gsc-off { background: var(--white); border: 1.5px dashed var(--amber); border-radius: 14px; padding: 14px 18px; font-size: 13px; color: var(--txt2); line-height: 1.5; }
.rm-gsc-off ol { margin: 8px 0 0; padding-left: 20px; }
.rm-gsc-off code { font-size: 12px; background: var(--svt-chip-bg); padding: 1px 5px; border-radius: 4px; word-break: break-all; }
.rm-gsc-off a { color: var(--sea); }

/* ── Mobil ──────────────────────────────────────────────── */
@media (max-width: 860px) {
  .rm { gap: 32px; }
  .rm-hero { padding: 20px 18px 18px; border-radius: 16px; }
  .rm .rm-hero-goal { font-size: 32px; }
  .rm-drivers { grid-template-columns: 1fr; }
  .rm-driver-num { font-size: 34px; }
  .rm-why { display: none; }
  .rm-base li { grid-template-columns: 1fr auto; gap: 4px 12px; }
  .rm-base-label { grid-column: 1; }
  .rm-base-num { grid-column: 2; text-align: right; }
  .rm-base li .rm-bar { grid-column: 1 / -1; }
  .rm-base-pct { grid-column: 1; text-align: left; }
  .rm-base-fart { grid-column: 2; }
  .rm-merits { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .rm-merit:nth-child(4n) { border-right: 1px solid var(--svt-divider); }
  .rm-merit:nth-child(2n) { border-right: none; }
  .rm-merit:nth-last-child(-n+4) { border-bottom: 1px solid var(--svt-divider); }
  .rm-merit:nth-last-child(-n+2) { border-bottom: none; }
  .rm-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .rm-stat:nth-child(2) { border-right: none; }
  .rm-stat:nth-child(-n+2) { border-bottom: 1px solid var(--svt-divider); }
  .rm-two { grid-template-columns: 1fr; }
  .rm-bars { gap: 2px; }
}
@media (max-width: 520px) {
  .rm-route-labels li:nth-child(1) { left: 0; transform: none; text-align: left; }
  .rm-route-labels li:nth-child(4) { left: auto; right: 0; transform: none; text-align: right; }
  .rm-route-labels b { font-size: 13px; }
  .rm-route-labels span { font-size: 11px; }
  .rm-timeline > li { grid-template-columns: 1fr auto; }
  .rm-tl-date { grid-column: 1 / -1; }
  .rm-row { flex-wrap: wrap; }
  .rm-row-body { flex-basis: calc(100% - 80px); }
  .rm-row .rm-pill { margin-left: 36px; }
  .rm-goals { width: 100%; justify-content: space-between; }
}
`
