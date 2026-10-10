'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { createClient } from '@/lib/supabase'
import { STAGES, KPIS, EXIT_GOAL, currentStage, targetFor, type KpiValues } from './roadmap-config'
import type { GscSummary, GscQuery, GscPage } from '@/lib/gsc'

// ── Roadmap ────────────────────────────────────────────────────────────────
// Var vi är (live-siffror mot nästa steg), vart vi ska (värdetrappan),
// vad som är nästa steg (milstolpar att bocka av) och vad som är avklarat.
// Siffrorna räknas på servern varje sidladdning — inget att underhålla.
// Milstolparna ligger i team_milestones och ändras direkt här.

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

const fmt = (n: number) => Math.round(n).toLocaleString('sv-SE')
const fmtShort = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toLocaleString('sv-SE', { maximumFractionDigits: 1 })} M`
  : n >= 10_000 ? `${Math.round(n / 1000)} k`
  : fmt(n)

function idagSvenskt(): string {
  // YYYY-MM-DD i svensk tid, oavsett var webbläsaren står.
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Stockholm' }).format(new Date())
}

function datumKort(d: string): string {
  const [y, m, day] = d.split('-').map(Number)
  const man = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'][(m ?? 1) - 1] ?? ''
  return `${day} ${man} ${y}`
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

  const stageProgress = useMemo(() => {
    return ([1, 2, 3] as const).map(s => {
      const parts = KPIS.map(k => Math.min(1, kpis[k.key] / targetFor(k, s)))
      return parts.reduce((a, b) => a + b, 0) / parts.length
    })
  }, [kpis])

  const nowList = milestones.filter(m => m.stage === activeStage && m.status !== 'done').sort(sortMilestones)
  const laterStages = ([1, 2, 3] as const).filter(s => s > activeStage)
  const done = milestones
    .filter(m => m.status === 'done')
    .sort((a, b) => (b.done_at ?? '').localeCompare(a.done_at ?? '') || b.sort - a.sort)
  const doneShown = showAllDone ? done : done.slice(0, 6)
  const kpisMet = KPIS.filter(k => kpis[k.key] >= targetFor(k, activeStage)).length

  // Den svagaste siffran relativt målet — det är där nästa insats gör störst skillnad.
  const weakest = useMemo(() => {
    return [...KPIS].sort((a, b) =>
      kpis[a.key] / targetFor(a, activeStage) - kpis[b.key] / targetFor(b, activeStage))[0]
  }, [kpis, activeStage])

  async function patch(m: Milestone, p: Partial<Milestone>) {
    const prev = milestones
    setMilestones(list => list.map(x => (x.id === m.id ? { ...x, ...p } : x)))
    const { error } = await supabase.from('team_milestones').update(p).eq('id', m.id)
    if (error) { setMilestones(prev); alertSoft('Kunde inte spara ändringen.') }
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
    if (error || !data) { setNewTitle(title); alertSoft('Kunde inte lägga till milstolpen.'); return }
    setMilestones(list => (list.some(m => m.id === data.id) ? list : [...list, data as Milestone]))
  }

  async function remove(m: Milestone) {
    if (!confirm(`Ta bort "${m.title}"?`)) return
    const prev = milestones
    setMilestones(list => list.filter(x => x.id !== m.id))
    const { error } = await supabase.from('team_milestones').delete().eq('id', m.id)
    if (error) setMilestones(prev)
  }

  const stageMeta = STAGES[activeStage] ?? STAGES[1]!

  return (
    <div className="rm">
      <style>{CSS}</style>

      {/* ── Vart vi ska ────────────────────────────────────────────────── */}
      <section className="rm-hero">
        <div className="rm-hero-top">
          <div>
            <div className="rm-eyebrow">Vart vi ska</div>
            <div className="rm-hero-goal">Exit {EXIT_GOAL.range}</div>
            <div className="rm-hero-sub">
              Mål {EXIT_GOAL.year}. Dag {fmt(merits.daysSinceStart)} sedan första commit.
            </div>
          </div>
          <Link href="/admin/malet" className="rm-hero-link">Värderingsmodellen →</Link>
        </div>

        <ol className="rm-ladder" aria-label="Värdetrappan">
          {STAGES.map(s => {
            const state = s.n === 0 || s.n < stage ? 'done' : s.n === activeStage ? 'now' : 'later'
            const p = s.n === 0 ? 1 : (stageProgress[s.n - 1] ?? 0)
            return (
              <li key={s.n} className={`rm-step rm-step-${state}`}>
                <div className="rm-step-head">
                  <span className="rm-step-dot" aria-hidden>{state === 'done' ? <Check /> : s.n}</span>
                  <span className="rm-step-value">{s.value}</span>
                </div>
                <div className="rm-step-name">{s.name}</div>
                {state === 'now' && <div className="rm-here">Ni är här</div>}
                <div className="rm-step-bar"><span style={{ width: `${Math.round(p * 100)}%` }} /></div>
                <div className="rm-step-tag">{s.tagline}</div>
              </li>
            )
          })}
        </ol>
      </section>

      {/* ── Var vi är ──────────────────────────────────────────────────── */}
      <section>
        <div className="rm-h">
          <h2>Var vi är</h2>
          <span>{kpisMet} av {KPIS.length} mål nådda för {stageMeta.name.toLowerCase()} ({stageMeta.value})</span>
        </div>
        <div className="rm-kpis">
          {KPIS.map(k => {
            const v = kpis[k.key]
            const target = targetFor(k, activeStage)
            const p = Math.min(1, v / target)
            const met = v >= target
            const isWeak = k.key === weakest?.key && !met
            return (
              <div key={k.key} className={`rm-kpi${met ? ' met' : ''}${isWeak ? ' weak' : ''}`} title={k.why}>
                <div className="rm-kpi-label">{k.label}</div>
                <div className="rm-kpi-num">
                  {fmt(v)}{k.unit ? ` ${k.unit}` : ''}
                  <span> / {fmtShort(target)}</span>
                </div>
                <div className="rm-kpi-bar"><span style={{ width: `${Math.max(p * 100, v > 0 ? 2 : 0)}%` }} /></div>
                <div className="rm-kpi-foot">
                  {met ? 'Nått' : isWeak ? 'Längst kvar — fokus här' : `${Math.round(p * 100)} %`}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Trafik (Google + egen mätning) ────────────────────────────── */}
      <Traffic t={traffic} />

      {/* ── Nästa steg ─────────────────────────────────────────────────── */}
      <section>
        <div className="rm-h">
          <h2>Nästa steg</h2>
          <span>Milstolpar för {stageMeta.name.toLowerCase()}. Klicka på rutan för att ändra status.</span>
        </div>
        <div className="rm-list">
          {nowList.length === 0 && <div className="rm-empty">Inget kvar i det här steget. Lägg till nästa milstolpe nedan.</div>}
          {nowList.map(m => <Row key={m.id} m={m} onStatus={cycleStatus} onOwner={o => patch(m, { owner: o })} onDelete={remove} />)}
        </div>

        <div className="rm-add">
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') add() }}
            placeholder="Ny milstolpe…"
            maxLength={200}
            aria-label="Ny milstolpe"
          />
          <select value={newStage} onChange={e => setNewStage(Number(e.target.value))} aria-label="Steg">
            {STAGES.filter(s => s.n > 0).map(s => <option key={s.n} value={s.n}>{s.name} ({s.value})</option>)}
          </select>
          <button onClick={add} disabled={!newTitle.trim()}>Lägg till</button>
        </div>

        {laterStages.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <button className="rm-toggle" onClick={() => setOpenLater(v => !v)} aria-expanded={openLater}>
              <Chevron open={openLater} /> Senare steg
              <span>{milestones.filter(m => m.stage > activeStage && m.status !== 'done').length}</span>
            </button>
            {openLater && laterStages.map(s => {
              const items = milestones.filter(m => m.stage === s && m.status !== 'done').sort(sortMilestones)
              return (
                <div key={s} style={{ marginTop: 12 }}>
                  <div className="rm-sub">{STAGES[s]?.name} · {STAGES[s]?.value}</div>
                  <div className="rm-list">
                    {items.length === 0 && <div className="rm-empty">Inga milstolpar ännu.</div>}
                    {items.map(m => <Row key={m.id} m={m} onStatus={cycleStatus} onOwner={o => patch(m, { owner: o })} onDelete={remove} />)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Meriter ────────────────────────────────────────────────────── */}
      <section>
        <div className="rm-h"><h2>Meriter</h2><span>Det ni har byggt, räknat live</span></div>
        <div className="rm-merits">
          <Merit n={kpis.guides} label="guider" />
          <Merit n={kpis.islands} label="öprofiler" />
          <Merit n={merits.places} label="platssidor för krogar, boenden och hamnar" />
          <Merit n={kpis.users} label="registrerade användare" />
          <Merit n={merits.tasksDone} label="kort klara på tavlan" />
          <Merit n={done.length} label="milstolpar avklarade" />
          {traffic.gsc.ok && <Merit n={traffic.gsc.summary.totalClicks} label="klick från Google totalt" />}
          {traffic.gsc.ok && <Merit n={traffic.gsc.summary.totalImpressions} label="visningar i Google totalt" />}
        </div>
      </section>

      {/* ── Avklarat ───────────────────────────────────────────────────── */}
      <section>
        <div className="rm-h"><h2>Avklarat</h2><span>Nyast först</span></div>
        <ol className="rm-timeline">
          {doneShown.map(m => (
            <li key={m.id}>
              <span className="rm-tl-dot" aria-hidden />
              <div className="rm-tl-date">{m.done_at ? datumKort(m.done_at) : '—'}</div>
              <div className="rm-tl-body">
                <div className="rm-tl-title">
                  {m.title}
                  {m.owner && <span className="rm-owner static">{OWNER_LABEL[m.owner]}</span>}
                </div>
                {m.detail && <div className="rm-tl-detail">{m.detail}</div>}
              </div>
              <button className="rm-undo" onClick={() => cycleStatus(m)} title="Markera som inte klar">Ångra</button>
            </li>
          ))}
        </ol>
        {done.length > 6 && (
          <button className="rm-toggle" onClick={() => setShowAllDone(v => !v)}>
            {showAllDone ? 'Visa färre' : `Visa alla ${done.length}`}
          </button>
        )}
      </section>
    </div>
  )
}

function Row({ m, onStatus, onOwner, onDelete }: {
  m: Milestone
  onStatus: (m: Milestone) => void
  onOwner: (o: Milestone['owner']) => void
  onDelete: (m: Milestone) => void
}) {
  return (
    <div className={`rm-row rm-${m.status}`}>
      <button
        className="rm-check"
        onClick={() => onStatus(m)}
        aria-label={`${m.title}: ${STATUS_LABEL[m.status]}. Klicka för att ändra.`}
        title={`${STATUS_LABEL[m.status]} — klicka för ${STATUS_LABEL[STATUS_NEXT[m.status]].toLowerCase()}`}
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
        onClick={() => onOwner(OWNER_NEXT[m.owner ?? 'none'] ?? null)}
        title="Vem driver den? Klicka för att byta."
      >
        {m.owner ? OWNER_LABEL[m.owner] : 'Ansvarig?'}
      </button>
      <button className="rm-del" onClick={() => onDelete(m)} aria-label={`Ta bort ${m.title}`} title="Ta bort"><Cross /></button>
    </div>
  )
}

function delta(now: number, prev: number): { text: string; up: boolean } | null {
  if (!prev) return now > 0 ? { text: 'ny', up: true } : null
  const p = Math.round(((now - prev) / prev) * 100)
  return { text: `${p > 0 ? '+' : ''}${p} %`, up: p >= 0 }
}

function Traffic({ t }: { t: RoadmapTraffic }) {
  const g = t.gsc
  return (
    <section>
      <div className="rm-h">
        <h2>Trafik</h2>
        <span>{g.ok ? `Google Search Console, senaste 28 dagarna${g.summary.lastDate ? ` t.o.m. ${datumKort(g.summary.lastDate)}` : ''}` : 'Egen mätning, senaste 30 dygnen'}</span>
      </div>

      {g.ok ? <GscBlock g={g} /> : (
        <div className="rm-gsc-off">
          <b>Search Console är inte kopplad ännu.</b> {g.reason}
          {g.clientEmail && (
            <ol>
              <li>Öppna <a href="https://search.google.com/search-console/users" target="_blank" rel="noreferrer">Search Console → Inställningar → Användare och behörigheter</a> för svalla.se.</li>
              <li>Klicka <b>Lägg till användare</b>, klistra in <code>{g.clientEmail}</code> och välj behörighet <b>Begränsad</b>.</li>
              <li>Ladda om den här sidan. Siffrorna hämtas automatiskt härefter.</li>
            </ol>
          )}
        </div>
      )}

      <div className="rm-sub" style={{ marginTop: 18 }}>Egen mätning · 30 dygn · bara besökare som sagt ja till statistik</div>
      <div className="rm-stats">
        <Stat label="Besök" value={fmt(t.own.sessions)} />
        <Stat label="Sidvisningar" value={fmt(t.own.pageviews)} />
        <Stat label="Vidareklick till verksamheter" value={fmt(t.own.outbound)} />
      </div>
    </section>
  )
}

function GscBlock({ g }: { g: Extract<RoadmapTraffic['gsc'], { ok: true }> }) {
  const s = g.summary
  const dc = delta(s.clicks28, s.clicksPrev28)
  const di = delta(s.impressions28, s.impressionsPrev28)
  const maxW = Math.max(1, ...s.weeks.map(w => w.clicks))
  const maxI = Math.max(1, ...s.weeks.map(w => w.impressions))
  return (
    <>
      <div className="rm-stats">
        <Stat label="Klick" value={fmt(s.clicks28)} delta={dc} />
        <Stat label="Visningar" value={fmt(s.impressions28)} delta={di} />
        <Stat label="CTR" value={`${(s.ctr28 * 100).toLocaleString('sv-SE', { maximumFractionDigits: 1 })} %`} />
        <Stat label="Snittposition" value={s.position28 ? s.position28.toLocaleString('sv-SE', { maximumFractionDigits: 1 }) : '—'} />
      </div>

      {s.weeks.length > 1 && (
        <div className="rm-chart" role="img" aria-label="Klick och visningar per vecka">
          <div className="rm-chart-legend">
            <span><i className="c" /> Klick per vecka</span>
            <span><i className="v" /> Visningar (relativ skala)</span>
          </div>
          <div className="rm-bars">
            {s.weeks.map(w => (
              <div key={w.start} className="rm-bar" title={`Vecka från ${datumKort(w.start)}: ${fmt(w.clicks)} klick, ${fmt(w.impressions)} visningar`}>
                <span className="v" style={{ height: `${(w.impressions / maxI) * 100}%` }} />
                <span className="c" style={{ height: `${Math.max((w.clicks / maxW) * 100, w.clicks ? 3 : 0)}%` }} />
              </div>
            ))}
          </div>
          <div className="rm-chart-axis">
            <span>{datumKort(s.weeks[0]?.start ?? '')}</span>
            <span>{datumKort(s.weeks[s.weeks.length - 1]?.start ?? '')}</span>
          </div>
        </div>
      )}

      <div className="rm-gsc-ms">
        <MilestoneLadder title="Klick per 28 dagar" items={s.clickMilestones} current={s.clicks28} />
        <MilestoneLadder title="Visningar per 28 dagar" items={s.impressionMilestones} current={s.impressions28} />
      </div>

      <div className="rm-gsc-lists">
        {g.topQueries.length > 0 && (
          <div>
            <div className="rm-sub">Sökord som ger klick</div>
            <table className="rm-table">
              <thead><tr><th>Sökord</th><th>Klick</th><th>Visn.</th><th>Pos.</th></tr></thead>
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
          <div>
            <div className="rm-sub">Sidor som ger klick</div>
            <table className="rm-table">
              <thead><tr><th>Sida</th><th>Klick</th><th>Visn.</th></tr></thead>
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

      <div className="rm-gsc-foot">
        {s.bestDay && <>Bästa dagen hittills: {fmt(s.bestDay.clicks)} klick {datumKort(s.bestDay.date)}. </>}
        Data sedan {s.firstDate ? datumKort(s.firstDate) : '—'}. Hämtas från Google var sjätte timme.
      </div>
    </>
  )
}

function MilestoneLadder({ title, items, current }: { title: string; items: { threshold: number; reachedAt: string | null }[]; current: number }) {
  const nextIdx = items.findIndex(m => !m.reachedAt)
  return (
    <div className="rm-ms">
      <div className="rm-sub">{title}</div>
      <ul>
        {items.map((m, i) => {
          const isNext = i === nextIdx
          const hidden = nextIdx !== -1 && i > nextIdx + 1
          if (hidden) return null
          return (
            <li key={m.threshold} className={m.reachedAt ? 'got' : isNext ? 'next' : 'later'}>
              <span className="rm-ms-dot" aria-hidden>{m.reachedAt ? <Check size={10} /> : null}</span>
              <span className="rm-ms-n">{fmtShort(m.threshold)}</span>
              <span className="rm-ms-when">
                {m.reachedAt ? datumKort(m.reachedAt)
                  : isNext ? `${Math.round(Math.min(1, current / m.threshold) * 100)} % dit · ${fmt(m.threshold - current)} kvar`
                  : 'därefter'}
              </span>
              {isNext && <span className="rm-ms-bar"><span style={{ width: `${Math.min(100, (current / m.threshold) * 100)}%` }} /></span>}
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
      <div className="rm-kpi-label">{label}</div>
      <div className="rm-stat-v">{value}</div>
      {d && <div className={`rm-delta ${d.up ? 'up' : 'down'}`}>{d.text} mot föregående 28</div>}
    </div>
  )
}

function Merit({ n, label }: { n: number; label: string }) {
  return (
    <div className="rm-merit">
      <div className="rm-merit-n">{fmt(n)}</div>
      <div className="rm-merit-l">{label}</div>
    </div>
  )
}

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
function Cross() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

function alertSoft(msg: string) {
  // Ingen blockerande dialog — bara konsolen och en kort titel-signal.
  console.error('[roadmap]', msg)
}

const CSS = `
.rm { display: flex; flex-direction: column; gap: 30px; padding-bottom: 40px; }
.rm h2 { font-size: 16px; font-weight: 700; color: var(--txt); margin: 0; font-family: var(--font-display), var(--font-display-fallback); }
.rm-h { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
.rm-h > span { font-size: 12px; color: var(--txt3); }
.rm-sub { font-size: 11px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; color: var(--txt3); margin-bottom: 6px; }

.rm-hero {
  border-radius: 16px; padding: 22px 22px 20px; color: #fff;
  background: linear-gradient(135deg, #16496a 0%, #0e2f45 70%, #0a2333 100%);
  box-shadow: var(--shadow-sm);
}
[data-theme="dark"] .rm-hero { background: linear-gradient(135deg, #123c57 0%, #08202f 100%); border: 1px solid rgba(255,255,255,0.08); }
.rm-hero-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
.rm-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: rgba(255,255,255,0.55); }
.rm-hero-goal { font-size: 30px; font-weight: 700; line-height: 1.15; margin-top: 4px; font-family: var(--font-display), var(--font-display-fallback); }
.rm-hero-sub { font-size: 13px; color: rgba(255,255,255,0.7); margin-top: 4px; }
.rm-hero-link { font-size: 12.5px; color: rgba(255,255,255,0.75); text-decoration: none; border: 1px solid rgba(255,255,255,0.22); padding: 6px 11px; border-radius: 8px; white-space: nowrap; }
.rm-hero-link:hover { color: #fff; border-color: rgba(255,255,255,0.45); }

.rm-ladder { list-style: none; margin: 22px 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.rm-step { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10); border-radius: 12px; padding: 12px 12px 11px; position: relative; }
.rm-step-now { background: rgba(255,255,255,0.13); border-color: rgba(255,255,255,0.35); }
.rm-step-later { opacity: .62; }
.rm-step-head { display: flex; align-items: center; gap: 8px; }
.rm-step-dot { width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 700; background: rgba(255,255,255,0.14); flex-shrink: 0; }
.rm-step-done .rm-step-dot { background: #2fb37a; }
.rm-step-now .rm-step-dot { background: #fff; color: #0e2f45; }
.rm-step-value { font-size: 15px; font-weight: 700; }
.rm-step-name { font-size: 12.5px; color: rgba(255,255,255,0.75); margin-top: 6px; font-weight: 600; }
.rm-here { position: absolute; top: -9px; right: 10px; font-size: 10.5px; font-weight: 700; letter-spacing: .4px; background: #f5b942; color: #2a1d00; padding: 2px 8px; border-radius: 999px; }
.rm-step-bar { height: 4px; border-radius: 4px; background: rgba(255,255,255,0.14); margin-top: 10px; overflow: hidden; }
.rm-step-bar span { display: block; height: 100%; background: #fff; border-radius: 4px; }
.rm-step-done .rm-step-bar span { background: #2fb37a; }
.rm-step-tag { font-size: 11.5px; line-height: 1.4; color: rgba(255,255,255,0.6); margin-top: 8px; }

.rm-kpis { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
.rm-kpi { background: var(--white); border: 1px solid var(--svt-border); border-radius: 12px; padding: 13px 14px 12px; box-shadow: var(--shadow-xs); }
.rm-kpi.weak { border-color: var(--amber); box-shadow: 0 0 0 1px var(--amber) inset; }
.rm-kpi-label { font-size: 12px; color: var(--txt3); font-weight: 600; }
.rm-kpi-num { font-size: 22px; font-weight: 700; color: var(--txt); margin-top: 3px; font-variant-numeric: tabular-nums; }
.rm-kpi-num span { font-size: 13px; color: var(--txt3); font-weight: 600; }
.rm-kpi-bar { height: 6px; border-radius: 6px; background: var(--svt-chip-bg); margin-top: 9px; overflow: hidden; }
.rm-kpi-bar span { display: block; height: 100%; border-radius: 6px; background: var(--sea); transition: width .5s ease; }
.rm-kpi.met .rm-kpi-bar span { background: var(--green); }
.rm-kpi.weak .rm-kpi-bar span { background: var(--amber); }
.rm-kpi-foot { font-size: 11.5px; color: var(--txt3); margin-top: 6px; font-weight: 600; }
.rm-kpi.met .rm-kpi-foot { color: var(--green); }
.rm-kpi.weak .rm-kpi-foot { color: var(--amber); }

.rm-list { display: flex; flex-direction: column; gap: 6px; }
.rm-row { display: flex; align-items: center; gap: 12px; background: var(--white); border: 1px solid var(--svt-border); border-radius: 10px; padding: 10px 12px; box-shadow: var(--shadow-xs); }
.rm-row.rm-doing { border-left: 3px solid var(--amber); }
.rm-check { width: 22px; height: 22px; border-radius: 6px; border: 2px solid var(--svt-border-strong); background: transparent; cursor: pointer; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; color: #fff; font-size: 13px; font-weight: 700; padding: 0; }
.rm-check:hover { border-color: var(--sea); }
.rm-doing .rm-check { border-color: var(--amber); }
.rm-half { width: 8px; height: 8px; border-radius: 2px; background: var(--amber); }
.rm-done .rm-check { background: var(--green); border-color: var(--green); }
.rm-row-body { flex: 1; min-width: 0; }
.rm-row-title { font-size: 13.5px; font-weight: 600; color: var(--txt); }
.rm-row-detail { font-size: 12px; color: var(--txt3); margin-top: 2px; line-height: 1.4; }
.rm-pill { font-size: 10.5px; font-weight: 700; color: var(--amber); background: var(--svt-chip-bg); padding: 3px 8px; border-radius: 999px; flex-shrink: 0; }
.rm-owner { font-size: 11px; font-weight: 700; padding: 4px 9px; border-radius: 999px; border: 1px solid var(--svt-border-strong); background: var(--svt-tint-bg); color: var(--sea); cursor: pointer; flex-shrink: 0; }
.rm-owner.none { background: transparent; color: var(--txt3); font-weight: 600; }
.rm-owner.static { cursor: default; margin-left: 8px; padding: 2px 7px; font-size: 10.5px; }
.rm-del { border: none; background: transparent; color: var(--txt3); font-size: 18px; line-height: 1; cursor: pointer; padding: 2px 4px; opacity: 0; transition: opacity .12s; }
.rm-row:hover .rm-del, .rm-del:focus-visible { opacity: 1; }
@media (hover: none) { .rm-del { opacity: .6; } }
.rm-empty { border: 1.5px dashed var(--svt-border-strong); border-radius: 10px; padding: 16px; text-align: center; color: var(--txt3); font-size: 12.5px; }

.rm-add { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
.rm-add input { flex: 1 1 220px; min-width: 0; padding: 9px 12px; border-radius: 8px; border: 1.5px solid var(--input-border); background: var(--input-bg); color: var(--txt); font-size: 13px; font-family: inherit; outline: none; }
.rm-add input:focus { border-color: var(--sea); }
.rm-add select { padding: 9px 10px; border-radius: 8px; border: 1.5px solid var(--input-border); background: var(--input-bg); color: var(--txt); font-size: 13px; font-family: inherit; }
.rm-add button { padding: 9px 16px; border-radius: 8px; border: none; background: var(--sea-knapp); color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; }
.rm-add button:disabled { opacity: .5; cursor: default; }
.rm-toggle { border: none; background: transparent; color: var(--txt2); font-size: 12.5px; font-weight: 700; cursor: pointer; padding: 6px 0; display: inline-flex; gap: 6px; align-items: center; }
.rm-toggle span { font-weight: 600; color: var(--txt3); }

.rm-merits { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
.rm-merit { border-radius: 12px; padding: 14px; background: var(--svt-tint-bg); }
.rm-merit-n { font-size: 26px; font-weight: 700; color: var(--sea); font-variant-numeric: tabular-nums; line-height: 1.1; font-family: var(--font-display), var(--font-display-fallback); }
.rm-merit-l { font-size: 12px; color: var(--txt2); margin-top: 4px; line-height: 1.35; }

.rm-timeline { list-style: none; margin: 0; padding: 0 0 0 4px; position: relative; }
.rm-timeline::before { content: ''; position: absolute; left: 9px; top: 6px; bottom: 6px; width: 2px; background: var(--svt-border-strong); }
.rm-timeline li { position: relative; display: grid; grid-template-columns: 92px 1fr auto; gap: 12px; padding: 8px 0 8px 26px; align-items: start; }
.rm-tl-dot { position: absolute; left: 0; top: 12px; width: 12px; height: 12px; border-radius: 50%; background: var(--green); border: 3px solid var(--bg); }
.rm-tl-date { font-size: 12px; color: var(--txt3); font-weight: 600; padding-top: 1px; font-variant-numeric: tabular-nums; }
.rm-tl-title { font-size: 13.5px; font-weight: 600; color: var(--txt); }
.rm-tl-detail { font-size: 12px; color: var(--txt3); margin-top: 2px; line-height: 1.4; }
.rm-undo { border: none; background: transparent; color: var(--txt3); font-size: 11.5px; cursor: pointer; opacity: 0; padding: 2px 4px; }
.rm-timeline li:hover .rm-undo, .rm-undo:focus-visible { opacity: 1; }

.rm-stats { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
.rm-stat { background: var(--white); border: 1px solid var(--svt-border); border-radius: 12px; padding: 12px 14px; box-shadow: var(--shadow-xs); }
.rm-stat-v { font-size: 22px; font-weight: 700; color: var(--txt); margin-top: 3px; font-variant-numeric: tabular-nums; }
.rm-delta { font-size: 11.5px; font-weight: 600; margin-top: 4px; }
.rm-delta.up { color: var(--green); }
.rm-delta.down { color: var(--red, #c0392b); }
.rm-gsc-off { background: var(--white); border: 1.5px dashed var(--amber); border-radius: 12px; padding: 14px 16px; font-size: 13px; color: var(--txt2); line-height: 1.5; }
.rm-gsc-off ol { margin: 8px 0 0; padding-left: 20px; }
.rm-gsc-off code { font-size: 12px; background: var(--svt-chip-bg); padding: 1px 5px; border-radius: 4px; word-break: break-all; }
.rm-gsc-off a { color: var(--sea); }
.rm-chart { background: var(--white); border: 1px solid var(--svt-border); border-radius: 12px; padding: 14px 14px 10px; margin-top: 10px; box-shadow: var(--shadow-xs); }
.rm-chart-legend { display: flex; gap: 16px; font-size: 11.5px; color: var(--txt3); margin-bottom: 10px; flex-wrap: wrap; }
.rm-chart-legend i { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 5px; vertical-align: -1px; }
.rm-chart-legend i.c, .rm-bar .c { background: var(--sea); }
.rm-chart-legend i.v, .rm-bar .v { background: var(--svt-tint-bg); }
.rm-bars { display: flex; align-items: flex-end; gap: 3px; height: 110px; }
.rm-bar { flex: 1; height: 100%; position: relative; }
.rm-bar span { position: absolute; bottom: 0; left: 0; right: 0; border-radius: 3px 3px 0 0; }
.rm-bar .c { left: 22%; right: 22%; }
.rm-chart-axis { display: flex; justify-content: space-between; font-size: 11px; color: var(--txt3); margin-top: 6px; }
.rm-gsc-ms { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
.rm-ms { background: var(--white); border: 1px solid var(--svt-border); border-radius: 12px; padding: 12px 14px; box-shadow: var(--shadow-xs); }
.rm-ms ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 7px; }
.rm-ms li { display: grid; grid-template-columns: 20px 58px 1fr; align-items: center; gap: 8px; font-size: 12.5px; }
.rm-ms-dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--svt-border-strong); display: inline-flex; align-items: center; justify-content: center; font-size: 10px; color: #fff; font-weight: 700; }
.rm-ms li.got .rm-ms-dot { background: var(--green); border-color: var(--green); }
.rm-ms li.next .rm-ms-dot { border-color: var(--amber); }
.rm-ms-n { font-weight: 700; color: var(--txt); font-variant-numeric: tabular-nums; }
.rm-ms li.later { opacity: .55; }
.rm-ms-when { color: var(--txt3); font-size: 12px; }
.rm-ms li.next .rm-ms-when { color: var(--amber); font-weight: 600; }
.rm-ms-bar { grid-column: 2 / -1; height: 4px; border-radius: 4px; background: var(--svt-chip-bg); overflow: hidden; }
.rm-ms-bar span { display: block; height: 100%; background: var(--amber); }
.rm-gsc-lists { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
.rm-gsc-lists > div { background: var(--white); border: 1px solid var(--svt-border); border-radius: 12px; padding: 12px 14px; box-shadow: var(--shadow-xs); min-width: 0; }
.rm-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
.rm-table th { text-align: right; font-size: 11px; color: var(--txt3); font-weight: 600; padding: 4px 0 6px 8px; }
.rm-table th:first-child, .rm-table td:first-child { text-align: left; padding-left: 0; }
.rm-table td { text-align: right; padding: 5px 0 5px 8px; border-top: 1px solid var(--svt-divider); color: var(--txt2); font-variant-numeric: tabular-nums; }
.rm-table td:first-child { color: var(--txt); max-width: 0; width: 60%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rm-table a { color: var(--sea); text-decoration: none; }
.rm-gsc-foot { font-size: 11.5px; color: var(--txt3); margin-top: 8px; }

@media (max-width: 860px) {
  .rm-gsc-ms, .rm-gsc-lists { grid-template-columns: 1fr; }
  .rm-ladder { grid-template-columns: 1fr 1fr; gap: 14px 10px; }
  .rm-hero { padding: 18px 16px; }
  .rm-hero-goal { font-size: 25px; }
}
@media (max-width: 520px) {
  .rm-timeline li { grid-template-columns: 1fr auto; }
  .rm-tl-date { grid-column: 1 / -1; padding-top: 0; }
  .rm-row { flex-wrap: wrap; }
  .rm-row-body { flex-basis: calc(100% - 70px); }
}
`
