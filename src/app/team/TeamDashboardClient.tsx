'use client'
import { useEffect, useMemo, useState, useCallback, useRef, Fragment } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

// ── Typer ─────────────────────────────────────────────────────────────────

// initials: valfri override för avatar-bokstäverna (t.ex. "TN", "MB") —
// annars faller vi tillbaka på de två första bokstäverna i username.
type TeamMember = { id: string; username: string; avatar: string | null; initials?: string | null }

type Project = {
  id: string
  name: string
  slug: string
  description: string | null
  color: string
  status: 'active' | 'paused' | 'done'
  created_by: string | null
  created_at: string
}

// Claude-arbetsflöde: Att göra → Claude jobbar → Redo att granska → Klart.
// Matchar hur uppgifter faktiskt rör sig här — de flesta är "Claude-uppdrag",
// inte ett generiskt kanban-flöde.
type TaskStatus = 'todo' | 'working' | 'review' | 'done'
type TaskPriority = 'low' | 'normal' | 'high'

type TeamSupabase = ReturnType<typeof createClient>

// Bildbilaga på en uppgift. Vi sparar sökvägen (inte en färdig URL) eftersom
// bucketen är privat — URL:en måste signeras om varje gång den ska visas.
type TaskImage = {
  path: string
  name?: string | null
  w?: number | null
  h?: number | null
  by?: string | null
  at?: string | null
}

type Task = {
  id: string
  project_id: string | null
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  assignee_id: string | null
  created_by: string | null
  due_date: string | null
  pr_url: string | null
  prompt: string | null
  images: TaskImage[]
  color: string | null
  created_at: string
  updated_at: string
}

// Fält som går att ändra i efterhand från detaljvyn.
type TaskPatch = Partial<Pick<Task, 'description' | 'color'>>

type Prompt = {
  id: string
  project_id: string | null
  title: string
  content: string
  tags: string[]
  created_by: string | null
  created_at: string
}

type Activity = {
  id: string
  kind: 'note' | 'task' | 'prompt' | 'project'
  message: string
  task_id: string | null
  prompt_id: string | null
  project_id: string | null
  created_by: string | null
  created_at: string
}

type Tab = 'tasks' | 'prompts' | 'activity'

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: 'Att göra',
  working: 'Claude jobbar',
  review: 'Redo att granska',
  done: 'Klart',
}
const STATUS_ORDER: TaskStatus[] = ['todo', 'working', 'review', 'done']
// Återanvänder sajtens egna temafärger (--txt3/--amber/--green är redan
// mörkt-läge-anpassade i globals.css) — bara "review" saknar en global
// motsvarighet så den får en fast lila som funkar på båda bakgrunderna.
const REVIEW_COLOR = '#8b5cf6'
const STATUS_ACCENT: Record<TaskStatus, string> = {
  todo: 'var(--txt3)',
  working: 'var(--amber)',
  review: REVIEW_COLOR,
  done: 'var(--green)',
}

const PRIORITY_LABEL: Record<TaskPriority, string> = { low: 'Låg', normal: 'Normal', high: 'Hög' }
const PRIORITY_COLOR: Record<TaskPriority, string> = {
  low: 'var(--txt3)',
  normal: 'var(--sea)',
  high: 'var(--red)',
}

// Egen färg per uppgift — märk upp efter vad arbetet gäller, oberoende av
// projekt. Fasta hex-värden (som projektfärgerna) eftersom de ska betyda
// samma sak i ljust och mörkt läge. Valda för att gå att skilja åt även
// för den som har svårt med rött/grönt.
const TASK_COLORS: { value: string; label: string }[] = [
  { value: '#3b82f6', label: 'Blå' },
  { value: '#14b8a6', label: 'Turkos' },
  { value: '#22c55e', label: 'Grön' },
  { value: '#eab308', label: 'Gul' },
  { value: '#f97316', label: 'Orange' },
  { value: '#ef4444', label: 'Röd' },
  { value: '#ec4899', label: 'Rosa' },
  { value: '#8b5cf6', label: 'Lila' },
]

const AVATAR_PALETTE = ['#1e5c82', '#c96e2a', '#0a7b8c', '#7c3aed', '#0a7b3c', '#9d174d']

function avatarColor(id: string): string {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length]!
}

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diffMs / 60000)
  if (min < 1) return 'just nu'
  if (min < 60) return `${min} min sedan`
  const h = Math.floor(min / 60)
  if (h < 24) return `${h} tim sedan`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d} dag${d === 1 ? '' : 'ar'} sedan`
  return new Date(iso).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

function initials(name: string): string {
  return name.slice(0, 2).toUpperCase()
}

// Avatar-bokstäver: använd explicit override om den finns (t.ex. "TN" för
// Tom Nordin, "MB" för Max), annars de två första bokstäverna i namnet.
function memberInitials(m: { username: string; initials?: string | null }): string {
  return m.initials || initials(m.username)
}

function hostFromUrl(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname === 'github.com') {
      const parts = u.pathname.split('/').filter(Boolean)
      if (parts.length >= 4 && parts[2] === 'pull') return `PR #${parts[3]}`
      if (parts.length >= 3 && parts[2] === 'tree') return `branch: ${parts.slice(3).join('/')}`
      return u.pathname.split('/').slice(1, 3).join('/')
    }
    return u.hostname.replace('www.', '')
  } catch {
    return 'länk'
  }
}

// ── Ikoner (linje-stil, matchar admin-panelens SVG-ikoner) ──────────────────

function IcoTasks({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 7 2 2 3-3" /><path d="M11 7h9" />
      <path d="m4 14 2 2 3-3" /><path d="M11 14h9" />
      <path d="m4 21 2 2 3-3" /><path d="M11 21h9" />
    </svg>
  )
}
function IcoPrompt({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="m7 9 3 3-3 3" /><path d="M13 15h4" />
    </svg>
  )
}
function IcoActivity({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h4l2.5-7L14 19l2.5-7H21" />
    </svg>
  )
}
function IcoFolder({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8A2 2 0 0 1 21 9.5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  )
}
function IcoPlus({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
function IcoTrash({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
    </svg>
  )
}
function IcoChevron({ dir = 'right', color = 'currentColor' }: { dir?: 'left' | 'right'; color?: string }) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'right' ? 'M9 5.5 15.5 12 9 18.5' : 'M15 5.5 8.5 12 15 18.5'} />
    </svg>
  )
}
function IcoCopy({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </svg>
  )
}
function IcoCheck({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 12 6 6L20 6" />
    </svg>
  )
}
function IcoLink({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.5" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.36-1.36" />
    </svg>
  )
}
function IcoImage({ color = 'currentColor', size = 12 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <circle cx="8.5" cy="8.5" r="1.6" />
      <path d="m21 15-4.5-4.5L7 21" />
    </svg>
  )
}
function IcoNote({ color = 'currentColor', size = 12 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h9" />
    </svg>
  )
}
function IcoClose({ color = 'currentColor', size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

// ── Bildhjälpare ──────────────────────────────────────────────────────────

/** Krymper och komprimerar i webbläsaren före upload — samma mönster som
 *  /spara och /logga/manuell. En mobilskärmdump på 3 MB blir ~200 kB. */
async function compressImage(file: File, maxPx = 1920, quality = 0.82): Promise<{ file: File; w: number; h: number }> {
  return new Promise(resolve => {
    const img = new window.Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > maxPx || height > maxPx) {
        if (width >= height) { height = Math.round(height * maxPx / width); width = maxPx }
        else                 { width = Math.round(width * maxPx / height);  height = maxPx }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width; canvas.height = height
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        blob => resolve({
          file: blob ? new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' }) : file,
          w: width, h: height,
        }),
        'image/jpeg', quality
      )
    }
    img.onerror = () => resolve({ file, w: 0, h: 0 })
    img.src = url
  })
}

/** Plockar ut bildfiler ur en drop eller inklistring (Cmd+V av skärmdump). */
function imageFilesFrom(list: FileList | DataTransferItemList | null): File[] {
  if (!list) return []
  const out: File[] = []
  for (let i = 0; i < list.length; i++) {
    const entry = list[i] as File | DataTransferItem
    const file = 'getAsFile' in entry ? entry.getAsFile() : entry
    if (file && file.type.startsWith('image/')) out.push(file)
  }
  return out
}

// ── Delade stilar ─────────────────────────────────────────────────────────

const surface: React.CSSProperties = {
  background: 'var(--white)',
  borderRadius: 12,
  border: '1px solid var(--svt-border)',
  boxShadow: 'var(--shadow-xs)',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: 8,
  border: '1.5px solid var(--input-border)',
  background: 'var(--input-bg)',
  fontSize: 13,
  color: 'var(--txt)',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

const btnPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '9px 16px',
  borderRadius: 8,
  border: 'none',
  background: 'var(--sea)',
  color: '#fff',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
}

const btnGhost: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '9px 16px',
  borderRadius: 8,
  border: '1.5px solid var(--svt-border-strong)',
  background: 'transparent',
  color: 'var(--txt2)',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
}

const GLOBAL_CSS = `
.svt-shell {
  display: flex; min-height: 100dvh; background: var(--bg);
  /* Lokala tokens för det här verktyget — ljust läge som grund, mörkt
     läge skrivs över nedan. Färger/skuggor i övrigt återanvänder sajtens
     egna --txt/--sea/--amber/--green/--red/--shadow-* som redan är
     mörkt-läge-anpassade i globals.css. */
  --svt-border:        rgba(15,45,60,0.08);
  --svt-border-strong: rgba(15,45,60,0.14);
  --svt-hover-border:  rgba(15,45,60,0.16);
  --svt-hover-bg:      rgba(15,45,60,0.07);
  --svt-chip-bg:       rgba(15,45,60,0.06);
  --svt-divider:       rgba(15,45,60,0.06);
  --svt-tint-bg:       rgba(30,92,130,0.10);
  --svt-avatar-ring:   rgba(15,45,60,0.35);
}
[data-theme="dark"] .svt-shell {
  --svt-border:        rgba(255,255,255,0.09);
  --svt-border-strong: rgba(255,255,255,0.16);
  --svt-hover-border:  rgba(255,255,255,0.20);
  --svt-hover-bg:      rgba(255,255,255,0.08);
  --svt-chip-bg:       rgba(255,255,255,0.07);
  --svt-divider:       rgba(255,255,255,0.08);
  --svt-tint-bg:       rgba(74,184,212,0.14);
  --svt-avatar-ring:   rgba(255,255,255,0.55);
}
.svt-sidebar {
  width: 252px; flex-shrink: 0; min-height: 100dvh; position: sticky; top: 0;
  background: linear-gradient(180deg, #16496a 0%, #0e2f45 100%);
  display: flex; flex-direction: column; padding: 20px 14px;
}
[data-theme="dark"] .svt-sidebar { background: linear-gradient(180deg, #0e2f45 0%, #05131e 100%); }
.svt-mobile-nav { display: none; }
.svt-navitem {
  display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px;
  color: rgba(255,255,255,0.68); font-size: 13.5px; font-weight: 600; cursor: pointer;
  border: none; background: transparent; width: 100%; text-align: left;
  transition: background .13s, color .13s;
}
.svt-navitem:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.92); }
.svt-navitem.active { background: rgba(255,255,255,0.13); color: #fff; box-shadow: inset 3px 0 0 var(--acc); }
.svt-projrow {
  display: flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 8px;
  color: rgba(255,255,255,0.72); font-size: 12.5px; font-weight: 500; cursor: pointer;
  border: none; background: transparent; width: 100%; text-align: left;
  transition: background .13s, color .13s;
}
.svt-projrow:hover { background: rgba(255,255,255,0.07); color: #fff; }
.svt-projrow.active { background: rgba(255,255,255,0.13); color: #fff; }
.svt-card {
  transition: transform .14s ease, box-shadow .14s ease, border-color .14s ease;
  animation: svtFadeUp .22s ease both;
}
.svt-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); border-color: var(--svt-hover-border); }
.svt-avbtn {
  width: 26px; height: 26px; border-radius: 50%; border: 2px solid transparent; cursor: pointer;
  display: flex; align-items: center; justify-content: center; font-size: 10.5px; font-weight: 700; color: #fff;
  transition: transform .12s ease, opacity .12s ease, border-color .12s ease; opacity: 0.38;
}
.svt-avbtn:hover { transform: scale(1.12); opacity: 0.75; }
.svt-avbtn.picked { opacity: 1; border-color: var(--svt-avatar-ring); transform: scale(1.05); }
.svt-empty-col {
  border: 1.5px dashed var(--svt-border-strong); border-radius: 12px; padding: 22px 12px;
  display: flex; flex-direction: column; align-items: center; gap: 6px; color: var(--txt3); font-size: 12px;
}
.svt-tab {
  display: flex; align-items: center; gap: 7px; padding: 9px 4px; border: none; background: transparent;
  font-size: 13.5px; font-weight: 600; color: var(--txt3); cursor: pointer; border-bottom: 2.5px solid transparent;
  transition: color .13s, border-color .13s;
}
.svt-tab:hover { color: var(--txt2); }
.svt-tab.active { color: var(--sea); border-color: var(--sea); }
.svt-iconbtn {
  width: 26px; height: 26px; border-radius: 7px; border: none; background: transparent; color: var(--txt3);
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background .12s, color .12s;
}
.svt-iconbtn:hover { background: var(--svt-hover-bg); color: var(--txt); }
.svt-iconbtn.danger:hover { background: rgba(192,57,43,0.14); color: var(--red); }
.svt-iconbtn.active { background: var(--svt-tint-bg); color: var(--sea); }
/* Primär-knappar: vit text i ljust läge, men på den ljusa cyanen --sea får
   i mörkt läge blir vit text för svag kontrast — mörk text där istället. */
.svt-btn-primary { color: #fff; }
[data-theme="dark"] .svt-btn-primary { color: #04202b; }
@keyframes svtFadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.svt-main { flex: 1; min-width: 0; padding: 28px 32px 100px; }
.svt-mobile-projectbar { display: none; }
/* Varje uppgift är sin egen rad (svit-lane) — kolumnen visar bara var i
   arbetsflödet (Att göra/Claude jobbar/Redo att granska/Klart) den befinner
   sig just nu, istället för att uppgifter i olika status råkar hamna på
   samma höjd bara för att de är först i sin kolumn. */
.svt-status-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px 16px; align-items: start; }
.svt-status-col { min-width: 0; }
.svt-swim-header { display: flex; align-items: center; gap: 7px; padding-bottom: 8px; border-bottom: 1px solid var(--svt-divider); }
/* Svagt band bakom hela uppgiftsraden — gör raden läsbar som en enhet
   (en uppgifts väg genom flödet) utan att fylla tomma kolumner med
   rutor. Ligger bakom kortet, ingen egen kant. */
.svt-swim-band { align-self: stretch; background: var(--svt-chip-bg); border-radius: 12px; opacity: 0.5; }
.svt-swimlanes-mobile { display: none; }
.svt-card-open { cursor: pointer; }
.svt-card-open:focus-visible { outline: 2px solid var(--sea); outline-offset: 2px; }

/* ── Detaljvy ─────────────────────────────────────────────────────────── */
.svt-modal-backdrop {
  position: fixed; inset: 0; z-index: 900; background: rgba(3, 22, 32, 0.55);
  backdrop-filter: blur(3px); display: flex; align-items: center; justify-content: center;
  padding: 24px; animation: svtFade .14s ease both;
}
.svt-modal {
  position: relative;
  background: var(--white); border: 1px solid var(--svt-border); border-radius: 16px;
  box-shadow: var(--shadow-md); width: 100%; max-width: 680px; max-height: 88vh;
  display: flex; flex-direction: column; overflow: hidden; animation: svtPop .16s ease both;
}
.svt-modal-head {
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  padding: 14px 18px; border-bottom: 1px solid var(--svt-divider); flex-shrink: 0;
}
.svt-modal-body { padding: 18px; overflow-y: auto; flex: 1; }
.svt-modal-foot {
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  padding: 12px 18px; border-top: 1px solid var(--svt-divider); flex-shrink: 0; background: var(--svt-chip-bg);
}
@keyframes svtFade { from { opacity: 0 } to { opacity: 1 } }
@keyframes svtPop { from { opacity: 0; transform: translateY(8px) scale(.99) } to { opacity: 1; transform: none } }

/* Fältetikett — gör formuläret läsbart som ett formulär istället för en
   hög med rutor med platshållartext. */
.svt-field-label {
  display: block; margin: 0 0 5px; font-size: 11.5px; font-weight: 700;
  color: var(--txt2); text-transform: uppercase; letter-spacing: 0.5px;
}

/* Färgrutor */
.svt-swatch {
  border-radius: 7px; border: 2px solid transparent; cursor: pointer; padding: 0;
  box-shadow: 0 0 0 1px var(--svt-border) inset; transition: transform .1s ease;
}
.svt-swatch:hover { transform: scale(1.12); }
.svt-swatch.picked { border-color: var(--txt); transform: scale(1.12); }
.svt-swatch.none {
  background: var(--svt-chip-bg);
  background-image: linear-gradient(45deg, transparent 44%, var(--red) 44%, var(--red) 56%, transparent 56%);
}

/* Anteckningar i läsläge — ser ut som text, inte som ett ifyllt fält.
   Hela ytan går att klicka för att börja redigera. */
.svt-notes {
  font-size: 13.5px; line-height: 1.6; color: var(--txt); white-space: pre-wrap;
  word-break: break-word; padding: 9px 11px; margin: 0 -11px; border-radius: 9px;
  cursor: text; transition: background .12s;
}
.svt-notes:hover { background: var(--svt-chip-bg); }

/* Färgprick i rubrikraden — fäller ut färgväljaren först när man vill. */
.svt-colordot {
  width: 26px; height: 26px; border-radius: 50%; cursor: pointer; padding: 0;
  background: transparent; border: 2px dashed var(--svt-border-strong);
  transition: transform .12s ease, border-color .12s ease;
}
.svt-colordot:hover, .svt-colordot.open { transform: scale(1.1); border-style: solid; border-color: var(--sea); }

.svt-drop-overlay {
  position: absolute; inset: 0; z-index: 5; border-radius: 16px;
  background: var(--white); border: 2px dashed var(--sea);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  font-size: 13.5px; font-weight: 600; color: var(--sea); pointer-events: none;
}

.svt-dropzone {
  border: 1.5px dashed var(--svt-border-strong); border-radius: 12px; padding: 26px 14px;
  display: flex; flex-direction: column; align-items: center; gap: 7px; text-align: center;
  color: var(--txt2); font-size: 12.5px; cursor: pointer; transition: border-color .12s, background .12s;
}
.svt-dropzone.slim { padding: 12px; flex-direction: row; justify-content: center; gap: 8px; margin-top: 10px; font-size: 12px; color: var(--txt3); }
.svt-dropzone:hover, .svt-dropzone.over { border-color: var(--sea); background: var(--svt-tint-bg); }

.svt-img-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
.svt-img-cell { position: relative; border-radius: 10px; overflow: hidden; border: 1px solid var(--svt-border); background: var(--svt-chip-bg); }
.svt-img-cell img { display: block; width: 100%; height: 150px; object-fit: cover; cursor: zoom-in; }
.svt-img-skeleton { width: 100%; height: 150px; background: var(--svt-chip-bg); }
.svt-img-remove {
  position: absolute; top: 6px; right: 6px; width: 24px; height: 24px; border-radius: 7px;
  border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
  background: rgba(3, 22, 32, 0.62); color: #fff; opacity: 0; transition: opacity .12s;
}
.svt-img-cell:hover .svt-img-remove { opacity: 1; }
.svt-img-remove:hover { background: var(--red); }

.svt-lightbox {
  position: fixed; inset: 0; z-index: 950; background: rgba(3, 22, 32, 0.88);
  display: flex; align-items: center; justify-content: center; padding: 32px; cursor: zoom-out;
  animation: svtFade .12s ease both;
}
.svt-lightbox img { max-width: 100%; max-height: 100%; border-radius: 10px; cursor: default; }
.svt-lightbox-close { position: absolute; top: 18px; right: 18px; background: rgba(255,255,255,0.14); color: #fff; }
.svt-chip {
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px;
  font-size: 12px; font-weight: 600; color: var(--txt2); background: var(--svt-chip-bg);
  border: none; white-space: nowrap; flex-shrink: 0; cursor: pointer;
}
.svt-chip.active { background: var(--sea); color: #fff; }
.svt-link-chip {
  display: inline-flex; align-items: center; gap: 5px; padding: 2px 8px; border-radius: 6px;
  font-size: 10.5px; font-weight: 600; color: var(--sea); background: var(--svt-chip-bg);
  text-decoration: none; border: none; cursor: pointer;
}
.svt-link-chip:hover { background: var(--svt-tint-bg); }
.svt-prompt-box {
  background: var(--svt-chip-bg); border-radius: 8px; padding: 9px 11px; margin-top: 8px;
  font-family: ui-monospace, monospace; font-size: 11.5px; line-height: 1.5; color: var(--txt2);
  white-space: pre-wrap; word-break: break-word; max-height: 160px; overflow-y: auto;
}
@media (max-width: 860px) {
  .svt-sidebar { display: none; }
  .svt-mobile-nav { display: flex; }
  .svt-main { padding: 16px 14px 88px; }
  .svt-mobile-projectbar { display: flex; gap: 8px; overflow-x: auto; margin: 0 0 16px; padding-bottom: 2px; -webkit-overflow-scrolling: touch; }
  /* På smal skärm blir 4 fasta kolumner + en rad per uppgift för trångt för
     att vara läsbart — svit-lane-rutnätet (desktop) döljs och ersätts med
     status grupperat i staplade sektioner istället. */
  .svt-status-grid { display: none; }
  .svt-swimlanes-mobile { display: flex; flex-direction: column; gap: 22px; }
  /* Text-inputs under 16px triggar auto-zoom på iOS — tvinga 16px på mobil oavsett desktop-storlek. */
  .svt-input { font-size: 16px !important; }
  /* Tumme-vänliga tap-ytor — 26px är för litet för finger på en skärm. */
  .svt-avbtn { width: 32px !important; height: 32px !important; font-size: 12px !important; }
  .svt-iconbtn { width: 34px !important; height: 34px !important; }
  /* Detaljvyn tar hela skärmen på mobil — en centrerad ruta med marginal
     äter för mycket yta när man ska granska en skärmdump. */
  .svt-modal-backdrop { padding: 0; }
  .svt-modal { max-width: none; max-height: none; height: 100%; border-radius: 0; border: none; }
  .svt-img-cell img, .svt-img-skeleton { height: 190px; }
  /* Ta bort-knappen syns alltid — det finns ingen hover på touch. */
  .svt-img-remove { opacity: 1; }
  .svt-lightbox { padding: 12px; }
}
`

// ── Huvudkomponent ──────────────────────────────────────────────────────────

export default function TeamDashboardClient({
  currentUser,
  teamMembers,
  initialProjects,
  initialTasks,
  initialPrompts,
  initialActivity,
}: {
  currentUser: { id: string; username: string; initials?: string | null }
  teamMembers: TeamMember[]
  initialProjects: Project[]
  initialTasks: Task[]
  initialPrompts: Prompt[]
  initialActivity: Activity[]
}) {
  const supabase = useMemo(() => createClient(), [])

  const [tab, setTab] = useState<Tab>('tasks')
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts)
  const [activity, setActivity] = useState<Activity[]>(initialActivity)
  const [projectFilter, setProjectFilter] = useState<string | null>(null)
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectColor, setNewProjectColor] = useState('#1e5c82')

  const memberById = useMemo(() => {
    const m = new Map<string, TeamMember>()
    for (const t of teamMembers) m.set(t.id, t)
    return m
  }, [teamMembers])

  const projectById = useMemo(() => {
    const m = new Map<string, Project>()
    for (const p of projects) m.set(p.id, p)
    return m
  }, [projects])

  // ── Realtime — Tom och Max ser varandras ändringar direkt ────────────────
  useEffect(() => {
    const channel = supabase
      .channel('team-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_tasks' }, payload => {
        setTasks(prev => applyRealtimeChange(prev, payload))
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_prompts' }, payload => {
        setPrompts(prev => applyRealtimeChange(prev, payload))
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_projects' }, payload => {
        setProjects(prev => applyRealtimeChange(prev, payload))
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'team_activity' }, payload => {
        setActivity(prev => [payload.new as Activity, ...prev].slice(0, 100))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── CRUD: tasks ───────────────────────────────────────────────────────────
  // Returnerar id:t på den skapade uppgiften — formuläret behöver det för att
  // kunna ladda upp bilder som valdes innan uppgiften fanns.
  const createTask = useCallback(async (input: {
    title: string; description: string | null; project_id: string | null; assignee_id: string | null
    priority: TaskPriority; due_date: string | null; pr_url: string | null; prompt: string | null
    color: string | null
  }): Promise<string | null> => {
    const { data, error } = await supabase
      .from('team_tasks')
      .insert({ ...input, created_by: currentUser.id, status: 'todo' as TaskStatus })
      .select()
      .single()
    if (error || !data) return null
    setTasks(prev => [data as Task, ...prev])
    return (data as Task).id
  }, [supabase, currentUser.id])

  const updateTask = useCallback(async (id: string, patch: TaskPatch) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t))
    await supabase.from('team_tasks').update(patch).eq('id', id)
  }, [supabase])

  const updateTaskStatus = useCallback(async (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
    await supabase.from('team_tasks').update({ status }).eq('id', id)
  }, [supabase])

  const updateTaskAssignee = useCallback(async (id: string, assignee_id: string | null) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, assignee_id } : t))
    await supabase.from('team_tasks').update({ assignee_id }).eq('id', id)
  }, [supabase])

  const deleteTask = useCallback(async (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
    await supabase.from('team_tasks').delete().eq('id', id)
  }, [supabase])

  // ── Bildbilagor ───────────────────────────────────────────────────────────
  // Buggbilder låg tidigare i en WhatsApp-tråd; nu hänger de på uppgiften.
  // Bucketen är privat, så vi sparar sökvägen och signerar URL:en vid visning.
  const addTaskImages = useCallback(async (taskId: string, files: File[]): Promise<string | null> => {
    if (!files.length) return null
    const uploaded: TaskImage[] = []

    for (const raw of files) {
      const { file, w, h } = await compressImage(raw)
      const path = `${taskId}/${crypto.randomUUID()}.jpg`
      const { error } = await supabase.storage
        .from('team-attachments')
        .upload(path, file, { contentType: 'image/jpeg', upsert: false })
      if (error) return `Kunde inte ladda upp ${raw.name}: ${error.message}`
      uploaded.push({ path, name: raw.name, w, h, by: currentUser.id, at: new Date().toISOString() })
    }

    // Läs aktuell lista från servern först — Tom och Max kan ladda upp
    // samtidigt, och en blind överskrivning hade tappat den andres bilder.
    const { data: fresh } = await supabase.from('team_tasks').select('images').eq('id', taskId).single()
    const next = [ ...(((fresh?.images as TaskImage[]) ?? [])), ...uploaded ]

    const { error: upErr } = await supabase.from('team_tasks').update({ images: next }).eq('id', taskId)
    if (upErr) return `Bilden laddades upp men kunde inte kopplas till uppgiften: ${upErr.message}`

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, images: next } : t))
    return null
  }, [supabase, currentUser.id])

  const removeTaskImage = useCallback(async (taskId: string, path: string) => {
    const { data: fresh } = await supabase.from('team_tasks').select('images').eq('id', taskId).single()
    const next = (((fresh?.images as TaskImage[]) ?? [])).filter(im => im.path !== path)
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, images: next } : t))
    await supabase.from('team_tasks').update({ images: next }).eq('id', taskId)
    await supabase.storage.from('team-attachments').remove([path])
  }, [supabase])

  // ── CRUD: prompts ─────────────────────────────────────────────────────────
  const createPrompt = useCallback(async (input: { title: string; content: string; tags: string[]; project_id: string | null }) => {
    const { data, error } = await supabase
      .from('team_prompts')
      .insert({ ...input, created_by: currentUser.id })
      .select()
      .single()
    if (!error && data) {
      setPrompts(prev => [data as Prompt, ...prev])
      await supabase.from('team_activity').insert({
        kind: 'prompt', message: `Ny prompt: ${input.title}`, prompt_id: (data as Prompt).id,
        project_id: input.project_id, created_by: currentUser.id,
      })
    }
  }, [supabase, currentUser.id])

  const deletePrompt = useCallback(async (id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id))
    await supabase.from('team_prompts').delete().eq('id', id)
  }, [supabase])

  // ── CRUD: activity (manuell notering) ────────────────────────────────────
  const postNote = useCallback(async (message: string, project_id: string | null) => {
    const { data, error } = await supabase
      .from('team_activity')
      .insert({ kind: 'note', message, project_id, created_by: currentUser.id })
      .select()
      .single()
    if (!error && data) setActivity(prev => [data as Activity, ...prev])
  }, [supabase, currentUser.id])

  // ── CRUD: projects ────────────────────────────────────────────────────────
  const createProject = useCallback(async (input: { name: string; color: string; description: string | null }) => {
    const slug = input.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || `projekt-${Date.now()}`
    const { data, error } = await supabase
      .from('team_projects')
      .insert({ ...input, slug, created_by: currentUser.id })
      .select()
      .single()
    if (!error && data) setProjects(prev => [...prev, data as Project])
  }, [supabase, currentUser.id])

  function submitNewProject() {
    if (!newProjectName.trim()) return
    createProject({ name: newProjectName.trim(), color: newProjectColor, description: null })
    setNewProjectName(''); setShowNewProject(false)
  }

  const filteredTasks = projectFilter ? tasks.filter(t => t.project_id === projectFilter) : tasks
  const filteredPrompts = projectFilter ? prompts.filter(p => p.project_id === projectFilter) : prompts

  function taskCountForProject(projectId: string) {
    return tasks.filter(t => t.project_id === projectId).length
  }

  const TAB_TITLE: Record<Tab, string> = { tasks: 'Uppgifter', prompts: 'Promptbibliotek', activity: 'Aktivitet' }

  const navItems: Array<{ key: Tab; label: string; icon: React.ReactNode }> = [
    { key: 'tasks', label: 'Uppgifter', icon: <IcoTasks /> },
    { key: 'prompts', label: 'Promptbibliotek', icon: <IcoPrompt /> },
    { key: 'activity', label: 'Aktivitet', icon: <IcoActivity /> },
  ]

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="svt-shell">
        {/* ── Sidebar ────────────────────────────────────────────────────── */}
        <aside className="svt-sidebar">
          <div style={{ padding: '4px 10px 18px' }}>
            <div style={{
              fontSize: 17, fontWeight: 700, color: '#fff',
              fontFamily: 'var(--font-display), var(--font-display-fallback)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                width: 26, height: 26, borderRadius: 7, background: 'rgba(255,255,255,0.14)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
              }}>⛵</span>
              Svalla Team
            </div>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>Delad arbetsyta</div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {navItems.map(item => (
              <button key={item.key} className={`svt-navitem${tab === item.key ? ' active' : ''}`} onClick={() => setTab(item.key)}>
                {item.icon}{item.label}
              </button>
            ))}
          </nav>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '16px 4px' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px 6px' }}>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', letterSpacing: 0.7 }}>
              Projekt
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, overflowY: 'auto' }}>
            <button className={`svt-projrow${projectFilter === null ? ' active' : ''}`} onClick={() => setProjectFilter(null)}>
              <IcoFolder color="rgba(255,255,255,0.55)" />
              <span style={{ flex: 1 }}>Alla projekt</span>
              <span style={{ fontSize: 11, opacity: 0.6 }}>{tasks.length}</span>
            </button>
            {projects.map(p => (
              <button key={p.id} className={`svt-projrow${projectFilter === p.id ? ' active' : ''}`} onClick={() => setProjectFilter(projectFilter === p.id ? null : p.id)}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                <span style={{ fontSize: 11, opacity: 0.6 }}>{taskCountForProject(p.id)}</span>
              </button>
            ))}

            {showNewProject ? (
              <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <input
                    value={newProjectName} onChange={e => setNewProjectName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') submitNewProject() }}
                    placeholder="Projektnamn…" autoFocus
                    style={{ ...inputStyle, flex: 1, background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', fontSize: 12 }}
                  />
                  <input type="color" value={newProjectColor} onChange={e => setNewProjectColor(e.target.value)} style={{ width: 28, height: '100%', border: 'none', borderRadius: 6, padding: 0, background: 'none', cursor: 'pointer' }} />
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={submitNewProject} className="svt-btn-primary" style={{ ...btnPrimary, padding: '6px 10px', fontSize: 11.5, flex: 1, justifyContent: 'center' }}>Skapa</button>
                  <button onClick={() => setShowNewProject(false)} style={{ ...btnGhost, padding: '6px 10px', fontSize: 11.5, color: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.16)' }}>Avbryt</button>
                </div>
              </div>
            ) : (
              <button className="svt-projrow" onClick={() => setShowNewProject(true)} style={{ color: 'rgba(255,255,255,0.5)' }}>
                <IcoPlus color="rgba(255,255,255,0.5)" /> Nytt projekt
              </button>
            )}
          </div>

          <div style={{ marginTop: 12, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.10)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px 10px' }}>
              {teamMembers.map(m => (
                <div key={m.id} title={m.username} style={{
                  width: 26, height: 26, borderRadius: '50%', background: avatarColor(m.id), color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700,
                  border: m.id === currentUser.id ? '2px solid rgba(255,255,255,0.6)' : '2px solid transparent',
                }}>
                  {memberInitials(m)}
                </div>
              ))}
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Tom &amp; Max</span>
            </div>
            <Link href="/feed" style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px',
              fontSize: 12.5, color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
            }}>
              <IcoChevron dir="left" color="rgba(255,255,255,0.55)" /> Tillbaka till appen
            </Link>
          </div>
        </aside>

        {/* ── Mobil-nav (visas bara under 860px) ───────────────────────────── */}
        <div className="svt-mobile-nav" style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20,
          background: 'var(--white)', borderTop: '1px solid var(--svt-border-strong)',
          padding: '8px 10px', justifyContent: 'space-around',
          boxShadow: 'var(--shadow-md)',
        }}>
          {navItems.map(item => (
            <button key={item.key} onClick={() => setTab(item.key)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none',
              color: tab === item.key ? 'var(--sea)' : 'var(--txt3)', fontSize: 10.5, fontWeight: 600, cursor: 'pointer', padding: '4px 10px',
            }}>
              {item.icon}{item.label}
            </button>
          ))}
        </div>

        {/* ── Huvudinnehåll ─────────────────────────────────────────────── */}
        <main className="svt-main">
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <h1 style={{
                  fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: 0,
                  fontFamily: 'var(--font-display), var(--font-display-fallback)',
                }}>
                  {TAB_TITLE[tab]}
                </h1>
                <p style={{ fontSize: 12.5, color: 'var(--txt3)', margin: '2px 0 0' }}>
                  {projectFilter ? projectById.get(projectFilter)?.name : 'Alla projekt'}
                </p>
              </div>
            </div>

            {/* Projektväxlare — sidebaren är dold under 860px, så det här är
                enda vägen att filtrera/skapa projekt på mobil. */}
            <div className="svt-mobile-projectbar">
              <button className={`svt-chip${projectFilter === null ? ' active' : ''}`} onClick={() => setProjectFilter(null)}>
                Alla <span style={{ opacity: 0.7 }}>{tasks.length}</span>
              </button>
              {projects.map(p => (
                <button key={p.id} className={`svt-chip${projectFilter === p.id ? ' active' : ''}`} onClick={() => setProjectFilter(projectFilter === p.id ? null : p.id)}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: projectFilter === p.id ? '#fff' : p.color, flexShrink: 0 }} />
                  {p.name} <span style={{ opacity: 0.7 }}>{taskCountForProject(p.id)}</span>
                </button>
              ))}
              <button className="svt-chip" onClick={() => setShowNewProject(v => !v)}><IcoPlus color="currentColor" /> Nytt</button>
            </div>
            {showNewProject && (
              <div className="svt-mobile-projectbar" style={{ marginTop: -10, display: 'flex' }}>
                <input
                  value={newProjectName} onChange={e => setNewProjectName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') submitNewProject() }}
                  placeholder="Projektnamn…" className="svt-input"
                  style={{ ...inputStyle, flex: 1 }}
                />
                <input type="color" value={newProjectColor} onChange={e => setNewProjectColor(e.target.value)} style={{ width: 36, border: 'none', borderRadius: 6, padding: 0, background: 'none', cursor: 'pointer', flexShrink: 0 }} />
                <button onClick={submitNewProject} className="svt-btn-primary" style={{ ...btnPrimary, padding: '8px 14px', flexShrink: 0 }}>Skapa</button>
              </div>
            )}

            {tab === 'tasks' && (
              <TasksBoard
                tasks={filteredTasks}
                projects={projects}
                projectById={projectById}
                memberById={memberById}
                teamMembers={teamMembers}
                currentUser={currentUser}
                onCreate={createTask}
                onStatusChange={updateTaskStatus}
                onAssigneeChange={updateTaskAssignee}
                onDelete={deleteTask}
                onAddImages={addTaskImages}
                onRemoveImage={removeTaskImage}
                onUpdate={updateTask}
                supabase={supabase}
              />
            )}

            {tab === 'prompts' && (
              <PromptLibrary
                prompts={filteredPrompts}
                projects={projects}
                projectById={projectById}
                onCreate={createPrompt}
                onDelete={deletePrompt}
              />
            )}

            {tab === 'activity' && (
              <ActivityFeed
                activity={activity}
                projects={projects}
                memberById={memberById}
                currentUser={currentUser}
                onPost={postNote}
              />
            )}
          </div>
        </main>
      </div>
    </>
  )
}

// ── Realtime-hjälpare ────────────────────────────────────────────────────────

function applyRealtimeChange<T extends { id: string }>(
  prev: T[],
  payload: { eventType: string; new: unknown; old: unknown },
): T[] {
  if (payload.eventType === 'INSERT') {
    const row = payload.new as T
    if (prev.some(p => p.id === row.id)) return prev
    return [row, ...prev]
  }
  if (payload.eventType === 'UPDATE') {
    const row = payload.new as T
    return prev.map(p => p.id === row.id ? row : p)
  }
  if (payload.eventType === 'DELETE') {
    const row = payload.old as T
    return prev.filter(p => p.id !== row.id)
  }
  return prev
}

// ── Delegera-väljare — klicka på en persons avatar för att tilldela ──────────

function AssigneePicker({ teamMembers, value, onChange, size = 22 }: {
  teamMembers: TeamMember[]
  value: string | null
  onChange: (id: string | null) => void
  size?: number
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} onClick={e => e.stopPropagation()}>
      {teamMembers.map(m => {
        const picked = value === m.id
        return (
          <button
            key={m.id}
            className={`svt-avbtn${picked ? ' picked' : ''}`}
            title={picked ? `Tilldelad: ${m.username} (klicka för att ta bort)` : `Delegera till ${m.username}`}
            onClick={() => onChange(picked ? null : m.id)}
            style={{ width: size, height: size, background: avatarColor(m.id), fontSize: size * 0.42 }}
          >
            {memberInitials(m)}
          </button>
        )
      })}
    </div>
  )
}

// ── Uppgiftstavla ────────────────────────────────────────────────────────────

type AssigneeFilter = 'all' | 'me' | 'unassigned' | string

function TasksBoard({ tasks, projects, projectById, memberById, teamMembers, currentUser, onCreate, onStatusChange, onAssigneeChange, onDelete, onAddImages, onRemoveImage, onUpdate, supabase }: {
  tasks: Task[]
  projects: Project[]
  projectById: Map<string, Project>
  memberById: Map<string, TeamMember>
  teamMembers: TeamMember[]
  currentUser: { id: string; username: string; initials?: string | null }
  onCreate: (input: {
    title: string; description: string | null; project_id: string | null; assignee_id: string | null
    priority: TaskPriority; due_date: string | null; pr_url: string | null; prompt: string | null
    color: string | null
  }) => Promise<string | null>
  onStatusChange: (id: string, status: TaskStatus) => void
  onAssigneeChange: (id: string, assignee_id: string | null) => void
  onDelete: (id: string) => void
  onAddImages: (taskId: string, files: File[]) => Promise<string | null>
  onRemoveImage: (taskId: string, path: string) => void
  onUpdate: (id: string, patch: TaskPatch) => void
  supabase: TeamSupabase
}) {
  const [showForm, setShowForm] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [openTaskId, setOpenTaskId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [projectId, setProjectId] = useState('')
  const [assigneeId, setAssigneeId] = useState<string | null>(null)
  const [priority, setPriority] = useState<TaskPriority>('normal')
  const [dueDate, setDueDate] = useState('')
  const [prUrl, setPrUrl] = useState('')
  const [prompt, setPrompt] = useState('')
  const [color, setColor] = useState<string | null>(null)
  const [assigneeFilter, setAssigneeFilter] = useState<AssigneeFilter>('all')
  // Bilder valda innan uppgiften finns — laddas upp direkt efter att den
  // skapats, eftersom lagringssökvägen bygger på uppgiftens id.
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [saving, setSaving] = useState(false)
  const newFileInput = useRef<HTMLInputElement>(null)
  const [dragNew, setDragNew] = useState(false)

  function resetForm() {
    setTitle(''); setNotes(''); setProjectId(''); setAssigneeId(null); setPriority('normal')
    setDueDate(''); setPrUrl(''); setPrompt(''); setColor(null); setPendingFiles([])
    setShowDetails(false); setShowForm(false)
  }

  // Förhandsvisning av ännu ej uppladdade bilder. Skapas en gång per lista
  // och återkallas när listan byts ut — annars läcker en blob-URL per
  // omritning och bilden flimrar till varje gång formuläret renderas om.
  const pendingPreviews = useMemo(
    () => pendingFiles.map(f => URL.createObjectURL(f)),
    [pendingFiles]
  )
  useEffect(() => () => { pendingPreviews.forEach(URL.revokeObjectURL) }, [pendingPreviews])

  async function submit() {
    if (!title.trim() || saving) return
    setSaving(true)
    const newId = await onCreate({
      title: title.trim(),
      description: notes.trim() || null,
      project_id: projectId || null,
      assignee_id: assigneeId,
      priority,
      due_date: dueDate || null,
      pr_url: prUrl.trim() || null,
      prompt: prompt.trim() || null,
      color,
    })
    if (newId && pendingFiles.length) await onAddImages(newId, pendingFiles)
    setSaving(false)
    resetForm()
  }

  const visibleTasks = tasks.filter(t => {
    if (assigneeFilter === 'all') return true
    if (assigneeFilter === 'unassigned') return !t.assignee_id
    if (assigneeFilter === 'me') return t.assignee_id === currentUser.id
    return t.assignee_id === assigneeFilter
  })

  // Varje uppgift får sin egen rad i svit-lane-rutnätet (desktop), äldst
  // överst — så en ny uppgift alltid hamnar ett steg ner, aldrig på samma
  // rad som en annan, orelaterad uppgift i en annan status.
  const orderedTasks = [...visibleTasks].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )

  // Hämtas ur tasks (inte sparad i state) så detaljvyn uppdateras direkt när
  // en bild läggs till eller status ändras, även om Max gör det samtidigt.
  const openTask = openTaskId ? tasks.find(t => t.id === openTaskId) ?? null : null

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
        {!showForm ? (
          <button onClick={() => setShowForm(true)} className="svt-btn-primary" style={btnPrimary}><IcoPlus color="currentColor" /> Ny uppgift</button>
        ) : <div />}

        {/* Håll koll på vem som har vad — snabbfilter på tilldelning */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button className={`svt-chip${assigneeFilter === 'all' ? ' active' : ''}`} onClick={() => setAssigneeFilter('all')}>Alla</button>
          <button className={`svt-chip${assigneeFilter === 'me' ? ' active' : ''}`} onClick={() => setAssigneeFilter('me')}>Mina</button>
          {teamMembers.filter(m => m.id !== currentUser.id).map(m => (
            <button key={m.id} className={`svt-chip${assigneeFilter === m.id ? ' active' : ''}`} onClick={() => setAssigneeFilter(m.id)}>
              {m.username}
            </button>
          ))}
          <button className={`svt-chip${assigneeFilter === 'unassigned' ? ' active' : ''}`} onClick={() => setAssigneeFilter('unassigned')}>Otilldelat</button>
        </div>
      </div>

      {showForm && (
        <div
          data-newtask-form
          style={{ ...surface, padding: 16, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 12, borderLeft: color ? `4px solid ${color}` : undefined }}
          onPaste={e => {
            const files = imageFilesFrom(e.clipboardData?.items ?? null)
            if (files.length) { e.preventDefault(); setPendingFiles(prev => [...prev, ...files]) }
          }}
        >
          <div>
            <label className="svt-field-label">Rubrik</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Vad ska göras?" className="svt-input" style={{ ...inputStyle, fontSize: 14, fontWeight: 500 }} autoFocus />
          </div>

          <div>
            <label className="svt-field-label">Anteckningar</label>
            <textarea
              value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Fler instruktioner — steg för att återskapa buggen, var i appen det gäller, vad som ska hända…"
              rows={3} className="svt-input"
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <select value={projectId} onChange={e => setProjectId(e.target.value)} style={{ ...inputStyle, width: 'auto', flex: 1, minWidth: 130 }}>
              <option value="">Inget projekt</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} style={{ ...inputStyle, width: 'auto', flex: 1, minWidth: 90 }}>
              <option value="low">Låg prioritet</option>
              <option value="normal">Normal prioritet</option>
              <option value="high">Hög prioritet</option>
            </select>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ ...inputStyle, width: 'auto', flex: 1, minWidth: 130 }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className="svt-field-label" style={{ margin: 0 }}>Färg</span>
            <ColorPicker value={color} onChange={setColor} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className="svt-field-label" style={{ margin: 0 }}>Delegera till</span>
            <AssigneePicker teamMembers={teamMembers} value={assigneeId} onChange={setAssigneeId} size={28} />
            {assigneeId && (
              <span style={{ fontSize: 12, color: 'var(--sea)', fontWeight: 600 }}>{memberById.get(assigneeId)?.username}</span>
            )}
          </div>

          {/* Bilder — synligt direkt, inte gömt bakom en knapp. Det var
              hela poängen med att flytta hit buggrapporterna. */}
          <div>
            <label className="svt-field-label">Bilder</label>
            {pendingFiles.length > 0 && (
              <div className="svt-img-grid" style={{ marginBottom: 8 }}>
                {pendingFiles.map((f, i) => (
                  <div key={`${f.name}-${i}`} className="svt-img-cell">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pendingPreviews[i]} alt={f.name} />
                    <button
                      className="svt-img-remove" title="Ta bort"
                      onClick={() => setPendingFiles(prev => prev.filter((_, j) => j !== i))}
                    >
                      <IcoClose size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div
              className={`svt-dropzone${pendingFiles.length ? ' slim' : ''}${dragNew ? ' over' : ''}`}
              onClick={() => newFileInput.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragNew(true) }}
              onDragLeave={() => setDragNew(false)}
              onDrop={e => {
                e.preventDefault(); setDragNew(false)
                // Läs ut filerna direkt. React kör state-uppdateraren senare,
                // och då är dataTransfer redan tömd av webbläsaren.
                const files = imageFilesFrom(e.dataTransfer.files)
                setPendingFiles(prev => [...prev, ...files])
              }}
            >
              {pendingFiles.length ? (
                <><IcoPlus color="var(--txt3)" /><span>Dra hit fler, eller klistra in med ⌘V</span></>
              ) : (
                <>
                  <IcoImage size={22} color="var(--txt3)" />
                  <span style={{ fontWeight: 600 }}>Dra hit en bild, klistra in med ⌘V, eller klicka</span>
                  <span style={{ fontSize: 11, color: 'var(--txt3)' }}>Skärmdump på buggen — laddas upp när uppgiften skapas</span>
                </>
              )}
            </div>
            <input
              ref={newFileInput} type="file" accept="image/*" multiple hidden
              onChange={e => {
                // Samma sak här: fillistan måste läsas ut innan inputen
                // nollställs, annars ser den lata uppdateraren en tom lista.
                const files = imageFilesFrom(e.target.files)
                setPendingFiles(prev => [...prev, ...files])
                e.target.value = ''
              }}
            />
          </div>

          {!showDetails ? (
            <button onClick={() => setShowDetails(true)} className="svt-tab" style={{ borderBottom: 'none', justifyContent: 'flex-start', padding: '2px 2px' }}>
              <IcoPlus /> Lägg till prompt eller PR/branch-länk
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--svt-chip-bg)', borderRadius: 8, padding: 10 }}>
              <input
                value={prUrl} onChange={e => setPrUrl(e.target.value)}
                placeholder="Länk till GitHub-PR eller branch (valfritt)"
                className="svt-input" style={{ ...inputStyle, background: 'var(--white)' }}
              />
              <textarea
                value={prompt} onChange={e => setPrompt(e.target.value)}
                placeholder="Prompten Claude ska köra för den här uppgiften (valfritt)…"
                rows={4} className="svt-input"
                style={{ ...inputStyle, background: 'var(--white)', resize: 'vertical', fontFamily: 'ui-monospace, monospace' }}
              />
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={submit} disabled={!title.trim() || saving} className="svt-btn-primary" style={{ ...btnPrimary, opacity: !title.trim() || saving ? 0.5 : 1 }}>
              {saving ? 'Skapar…' : 'Skapa uppgift'}
            </button>
            <button onClick={resetForm} style={btnGhost}>Avbryt</button>
            {pendingFiles.length > 0 && (
              <span style={{ fontSize: 11.5, color: 'var(--txt3)' }}>
                {pendingFiles.length} bild{pendingFiles.length === 1 ? '' : 'er'} bifogas
              </span>
            )}
          </div>
        </div>
      )}

      {/* Desktop: svit-lane-rutnät — varje uppgift är sin egen rad, kolumnen
          visar bara var i flödet den befinner sig just nu. Ny uppgift hamnar
          alltid ett steg ner (se orderedTasks), aldrig på samma rad som en
          orelaterad uppgift i en annan status. */}
      <div className="svt-status-grid">
        {STATUS_ORDER.map(status => (
          <div key={status} className="svt-swim-header">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS_ACCENT[status], flexShrink: 0 }} />
            <span style={{
              fontSize: 12, fontWeight: 700, color: 'var(--txt2)', textTransform: 'uppercase', letterSpacing: 0.5,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {STATUS_LABEL[status]}
            </span>
            <span style={{
              fontSize: 11, fontWeight: 700, color: 'var(--txt3)', background: 'var(--svt-chip-bg)',
              padding: '1px 7px', borderRadius: 999, flexShrink: 0,
            }}>
              {visibleTasks.filter(t => t.status === status).length}
            </span>
          </div>
        ))}

        {orderedTasks.length === 0 && (
          <div className="svt-empty-col" style={{ gridColumn: '1 / -1' }}>
            <IcoTasks color="var(--txt3)" />
            Inga uppgifter här
          </div>
        )}

        {orderedTasks.map((task, i) => {
          const rowIdx = i + 2
          return (
            <Fragment key={task.id}>
              {/* Ett svagt band över hela raden — knyter ihop uppgiftens rad
                  visuellt så kortet inte ser ut att sväva ensamt i ett tomt
                  fält, utan att lägga till tre tomma rutor per rad. */}
              <div className="svt-swim-band" style={{ gridColumn: '1 / -1', gridRow: rowIdx }} />
              <div style={{ gridColumn: STATUS_ORDER.indexOf(task.status) + 1, gridRow: rowIdx }}>
                <TaskCard
                  task={task}
                  project={task.project_id ? projectById.get(task.project_id) : undefined}
                  teamMembers={teamMembers}
                  onStatusChange={onStatusChange}
                  onAssigneeChange={onAssigneeChange}
                  onDelete={onDelete}
                  onOpen={() => setOpenTaskId(task.id)}
                />
              </div>
            </Fragment>
          )
        })}
      </div>

      {/* Mobil: 4 fasta kolumner + en rad per uppgift blir för trångt för att
          vara läsbart på en smal skärm — status grupperat i staplade
          sektioner istället, samma data och samma TaskCard. */}
      <div className="svt-swimlanes-mobile">
        {STATUS_ORDER.map(status => {
          const colTasks = visibleTasks.filter(t => t.status === status)
          return (
            <div key={status}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: STATUS_ACCENT[status] }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt2)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {STATUS_LABEL[status]}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: 'var(--txt3)', background: 'var(--svt-chip-bg)',
                  padding: '1px 7px', borderRadius: 999,
                }}>
                  {colTasks.length}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 60 }}>
                {colTasks.length === 0 && (
                  <div className="svt-empty-col">
                    <IcoTasks color="var(--txt3)" />
                    Inga uppgifter här
                  </div>
                )}
                {colTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    project={task.project_id ? projectById.get(task.project_id) : undefined}
                    teamMembers={teamMembers}
                    onStatusChange={onStatusChange}
                    onAssigneeChange={onAssigneeChange}
                    onDelete={onDelete}
                    onOpen={() => setOpenTaskId(task.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {openTask && (
        <TaskDetail
          task={openTask}
          project={openTask.project_id ? projectById.get(openTask.project_id) : undefined}
          memberById={memberById}
          teamMembers={teamMembers}
          supabase={supabase}
          onClose={() => setOpenTaskId(null)}
          onStatusChange={onStatusChange}
          onAssigneeChange={onAssigneeChange}
          onAddImages={onAddImages}
          onRemoveImage={onRemoveImage}
          onUpdate={onUpdate}
        />
      )}
    </div>
  )
}

/** Färgväljare — fasta rutor istället för en råfärgsväljare, så att
 *  färgerna betyder samma sak mellan uppgifter och ser konsekventa ut. */
function ColorPicker({ value, onChange, size = 22 }: {
  value: string | null
  onChange: (c: string | null) => void
  size?: number
}) {
  return (
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
      <button
        type="button"
        className={`svt-swatch none${value === null ? ' picked' : ''}`}
        style={{ width: size, height: size }}
        onClick={() => onChange(null)}
        title="Ingen färg"
      />
      {TASK_COLORS.map(c => (
        <button
          key={c.value}
          type="button"
          className={`svt-swatch${value === c.value ? ' picked' : ''}`}
          style={{ width: size, height: size, background: c.value }}
          onClick={() => onChange(value === c.value ? null : c.value)}
          title={c.label}
        />
      ))}
    </div>
  )
}

function TaskCard({ task, project, teamMembers, onStatusChange, onAssigneeChange, onDelete, onOpen }: {
  task: Task
  project?: Project
  teamMembers: TeamMember[]
  onStatusChange: (id: string, status: TaskStatus) => void
  onAssigneeChange: (id: string, assignee_id: string | null) => void
  onDelete: (id: string) => void
  onOpen: () => void
}) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [copied, setCopied] = useState(false)
  const overdue = task.due_date && task.status !== 'done' && new Date(task.due_date) < new Date(new Date().toDateString())
  const idx = STATUS_ORDER.indexOf(task.status)
  const imageCount = task.images?.length ?? 0
  // Uppgiftens egen färg vinner över projektfärgen — den är mer specifik.
  const accent = task.color ?? project?.color ?? null

  async function copyPrompt() {
    if (!task.prompt) return
    try {
      await navigator.clipboard.writeText(task.prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* no-op */ }
  }

  // Kortet i sin helhet öppnar uppgiften. Knappar/länkar inuti stoppar
  // bubblingen, annars hade ett klick på t.ex. "ta bort" också öppnat vyn.
  const stop = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <div
      className="svt-card svt-card-open"
      style={{ ...surface, padding: 14, borderLeft: accent ? `3px solid ${accent}` : undefined }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--txt)', lineHeight: 1.4 }}>{task.title}</div>
        <button className="svt-iconbtn danger" onClick={e => { stop(e); onDelete(task.id) }} title="Ta bort" style={{ flexShrink: 0 }}>
          <IcoTrash />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 9, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: PRIORITY_COLOR[task.priority], background: 'var(--svt-chip-bg)', padding: '2px 8px', borderRadius: 6 }}>
          {PRIORITY_LABEL[task.priority]}
        </span>
        {project && (
          <span style={{ fontSize: 10.5, fontWeight: 600, color: project.color, background: `${project.color}14`, padding: '2px 8px', borderRadius: 6 }}>
            {project.name}
          </span>
        )}
        {task.due_date && (
          <span style={{
            fontSize: 10.5, fontWeight: overdue ? 700 : 500, color: overdue ? 'var(--red)' : 'var(--txt3)',
            background: 'var(--svt-chip-bg)', padding: '2px 8px', borderRadius: 6,
          }}>
            {overdue ? '⚠ ' : ''}{new Date(task.due_date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
          </span>
        )}
        {task.pr_url && (
          <a href={task.pr_url} target="_blank" rel="noopener noreferrer" className="svt-link-chip" onClick={stop}>
            <IcoLink /> {hostFromUrl(task.pr_url)}
          </a>
        )}
        {task.prompt && (
          <button className="svt-link-chip" onClick={e => { stop(e); setShowPrompt(v => !v) }}>
            <IcoPrompt color="currentColor" /> Prompt
          </button>
        )}
        {imageCount > 0 && (
          <span className="svt-link-chip" title={`${imageCount} bild${imageCount === 1 ? '' : 'er'}`}>
            <IcoImage /> {imageCount}
          </span>
        )}
        {task.description && (
          <span className="svt-link-chip" title="Har anteckningar">
            <IcoNote /> Anteckning
          </span>
        )}
      </div>

      {task.prompt && showPrompt && (
        <div onClick={stop}>
          <pre className="svt-prompt-box">{task.prompt}</pre>
          <button onClick={e => { stop(e); copyPrompt() }} className="svt-iconbtn" style={{ width: 'auto', gap: 5, padding: '4px 8px', fontSize: 11, fontWeight: 600 }}>
            {copied ? <><IcoCheck color="var(--green)" /> Kopierad</> : <><IcoCopy /> Kopiera prompt</>}
          </button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--svt-divider)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={stop}>
          <span style={{ fontSize: 10.5, color: 'var(--txt3)', fontWeight: 600 }}>Delegera:</span>
          <AssigneePicker teamMembers={teamMembers} value={task.assignee_id} onChange={id => onAssigneeChange(task.id, id)} />
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          {idx > 0 && (
            <button className="svt-iconbtn" onClick={e => { stop(e); onStatusChange(task.id, STATUS_ORDER[idx - 1]!) }} title={`Flytta till ${STATUS_LABEL[STATUS_ORDER[idx - 1]!]}`}>
              <IcoChevron dir="left" />
            </button>
          )}
          {idx < STATUS_ORDER.length - 1 && (
            <button
              onClick={e => { stop(e); onStatusChange(task.id, STATUS_ORDER[idx + 1]!) }}
              title={`Flytta till ${STATUS_LABEL[STATUS_ORDER[idx + 1]!]}`}
              className="svt-btn-primary"
              style={{ width: 26, height: 26, borderRadius: 7, border: 'none', background: 'var(--sea)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <IcoChevron dir="right" color="currentColor" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Detaljvy: uppgiften i stort format, med bildbilagor ─────────────────────
// Ersätter WhatsApp-flödet: en buggskärmdump hör hemma på uppgiften, inte i
// en chatt. Tavlans layout är oförändrad — det här ligger ovanpå.

function TaskDetail({
  task, project, memberById, teamMembers, supabase,
  onClose, onStatusChange, onAssigneeChange, onAddImages, onRemoveImage, onUpdate,
}: {
  task: Task
  project?: Project
  memberById: Map<string, TeamMember>
  teamMembers: TeamMember[]
  supabase: TeamSupabase
  onClose: () => void
  onStatusChange: (id: string, status: TaskStatus) => void
  onAssigneeChange: (id: string, assignee_id: string | null) => void
  onAddImages: (taskId: string, files: File[]) => Promise<string | null>
  onRemoveImage: (taskId: string, path: string) => void
  onUpdate: (id: string, patch: TaskPatch) => void
}) {
  const [urls, setUrls] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  // Detaljvyn är i första hand en läsvy — att redigera ska vara ett aktivt
  // val, inte det man landar i så fort man öppnar en uppgift.
  const [notes, setNotes] = useState(task.description ?? '')
  const [editingNotes, setEditingNotes] = useState(false)
  const [showColors, setShowColors] = useState(false)

  const images = useMemo(() => task.images ?? [], [task.images])
  const idx = STATUS_ORDER.indexOf(task.status)
  const assignee = task.assignee_id ? memberById.get(task.assignee_id) : undefined
  const overdue = task.due_date && task.status !== 'done' && new Date(task.due_date) < new Date(new Date().toDateString())

  // Privat bucket → varje bild behöver en signerad URL. `requested` gör att en
  // sökväg bara signeras en gång; utan den hade en bild som misslyckas att
  // signeras försökt om i all oändlighet (effekten kör om när urls ändras).
  const requested = useRef<Set<string>>(new Set())
  useEffect(() => {
    const missing = images.map(im => im.path).filter(p => !requested.current.has(p))
    if (!missing.length) return
    missing.forEach(p => requested.current.add(p))
    let alive = true
    supabase.storage.from('team-attachments').createSignedUrls(missing, 3600).then(({ data }) => {
      if (!alive || !data) return
      const next: Record<string, string> = {}
      for (const row of data) if (row.path && row.signedUrl) next[row.path] = row.signedUrl
      setUrls(prev => ({ ...prev, ...next }))
    })
    return () => { alive = false }
  }, [images, supabase])

  const upload = useCallback(async (files: File[]) => {
    if (!files.length) return
    setBusy(true); setError(null)
    const err = await onAddImages(task.id, files)
    if (err) setError(err)
    setBusy(false)
  }, [onAddImages, task.id])

  // Esc stänger, och Cmd+V klistrar in en skärmdump direkt — det är så här
  // en bugg faktiskt fångas: skärmdump, växla till tavlan, klistra in.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { if (lightbox) setLightbox(null); else onClose() }
    }
    const onPaste = (e: ClipboardEvent) => {
      // Om markören står i "ny uppgift"-formuläret bakom modalen äger det
      // inklistringen — annars hade bilden hamnat på båda ställena.
      const target = e.target as HTMLElement | null
      if (target?.closest?.('[data-newtask-form]')) return
      const files = imageFilesFrom(e.clipboardData?.items ?? null)
      if (files.length) { e.preventDefault(); upload(files) }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('paste', onPaste)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('paste', onPaste)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, upload, lightbox])

  return (
    <>
      <div className="svt-modal-backdrop" onClick={onClose}>
        <div
          className="svt-modal"
          onClick={e => e.stopPropagation()}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => {
            e.preventDefault(); setDragOver(false)
            upload(imageFilesFrom(e.dataTransfer.files))
          }}
        >
          {/* Uppgiftens färg som topplist — samma signal som kortets kant */}
          {task.color && <div style={{ height: 4, background: task.color, flexShrink: 0 }} />}

          {/* Släppyta syns bara medan man drar — ingen permanent ruta */}
          {dragOver && (
            <div className="svt-drop-overlay">
              <IcoImage size={26} color="var(--sea)" />
              <span>Släpp för att lägga till bilden</span>
            </div>
          )}

          {/* Rubrik */}
          <div className="svt-modal-head">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_ACCENT[task.status], flexShrink: 0 }} />
              <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--txt2)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {STATUS_LABEL[task.status]}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button
                className={`svt-colordot${showColors ? ' open' : ''}`}
                onClick={() => setShowColors(v => !v)}
                title="Färg"
                style={task.color ? { background: task.color, borderColor: task.color } : undefined}
              />
              <button className="svt-iconbtn" onClick={onClose} title="Stäng (Esc)">
                <IcoClose />
              </button>
            </div>
          </div>

          {/* Färgväljaren fälls ut på begäran — annars ligger det en rad
              redigeringskontroller framme så fort man öppnat en uppgift. */}
          {showColors && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderBottom: '1px solid var(--svt-divider)', flexWrap: 'wrap' }}>
              <span className="svt-field-label" style={{ margin: 0 }}>Färg</span>
              <ColorPicker value={task.color} onChange={c => onUpdate(task.id, { color: c })} size={24} />
            </div>
          )}

          <div className="svt-modal-body">
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px', lineHeight: 1.3 }}>
              {task.title}
            </h2>

            {/* Metadata */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: PRIORITY_COLOR[task.priority], background: 'var(--svt-chip-bg)', padding: '3px 9px', borderRadius: 6 }}>
                {PRIORITY_LABEL[task.priority]}
              </span>
              {project && (
                <span style={{ fontSize: 11, fontWeight: 600, color: project.color, background: `${project.color}14`, padding: '3px 9px', borderRadius: 6 }}>
                  {project.name}
                </span>
              )}
              {task.due_date && (
                <span style={{
                  fontSize: 11, fontWeight: overdue ? 700 : 500, color: overdue ? 'var(--red)' : 'var(--txt3)',
                  background: 'var(--svt-chip-bg)', padding: '3px 9px', borderRadius: 6,
                }}>
                  {overdue ? '⚠ ' : ''}{new Date(task.due_date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' })}
                </span>
              )}
              {task.pr_url && (
                <a href={task.pr_url} target="_blank" rel="noopener noreferrer" className="svt-link-chip">
                  <IcoLink /> {hostFromUrl(task.pr_url)}
                </a>
              )}
            </div>

            {/* Anteckningar — visas som text. Redigering öppnas medvetet,
                så att man inte landar i ett formulär när man bara vill läsa. */}
            <div style={{ marginBottom: 18 }}>
              <span className="svt-field-label">Anteckningar</span>
              {editingNotes ? (
                <>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Fler instruktioner — steg för att återskapa buggen, var i appen det gäller, vad som ska hända…"
                    rows={5} className="svt-input" autoFocus
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.55 }}
                  />
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button
                      className="svt-btn-primary"
                      style={{ ...btnPrimary, padding: '6px 12px', fontSize: 12.5 }}
                      onClick={() => {
                        const next = notes.trim() || null
                        if (next !== (task.description ?? null)) onUpdate(task.id, { description: next })
                        setEditingNotes(false)
                      }}
                    >
                      Spara
                    </button>
                    <button
                      style={{ ...btnGhost, padding: '6px 12px', fontSize: 12.5 }}
                      onClick={() => { setNotes(task.description ?? ''); setEditingNotes(false) }}
                    >
                      Avbryt
                    </button>
                  </div>
                </>
              ) : task.description ? (
                <div
                  className="svt-notes"
                  onClick={() => setEditingNotes(true)}
                  title="Klicka för att redigera"
                >
                  {task.description}
                </div>
              ) : (
                <button className="svt-link-chip" onClick={() => setEditingNotes(true)}>
                  <IcoPlus color="currentColor" /> Lägg till anteckning
                </button>
              )}
            </div>

            {/* Bilder */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
              <span className="svt-field-label" style={{ margin: 0 }}>
                Bilder {images.length > 0 && <span style={{ color: 'var(--txt3)' }}>({images.length})</span>}
              </span>
              <button
                className="svt-link-chip"
                onClick={() => fileInput.current?.click()}
                disabled={busy}
                style={{ opacity: busy ? 0.5 : 1 }}
                title="Du kan också dra hit en bild eller klistra in med ⌘V"
              >
                <IcoPlus color="currentColor" /> {busy ? 'Laddar upp…' : 'Lägg till'}
              </button>
              <input
                ref={fileInput} type="file" accept="image/*" multiple hidden
                onChange={e => { upload(imageFilesFrom(e.target.files)); e.target.value = '' }}
              />
            </div>

            {error && (
              <div style={{ fontSize: 12, color: 'var(--red)', background: 'rgba(239,68,68,0.1)', padding: '8px 10px', borderRadius: 8, marginBottom: 10 }}>
                {error}
              </div>
            )}

            {images.length === 0 ? (
              <p style={{ fontSize: 12.5, color: 'var(--txt3)', margin: '0 0 4px' }}>
                Inga bilder än — dra hit en, klistra in med ⌘V, eller använd Lägg till.
              </p>
            ) : (
              <div className="svt-img-grid">
                {images.map(im => {
                  const url = urls[im.path]
                  return (
                    <div key={im.path} className="svt-img-cell">
                      {url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={url} alt={im.name ?? 'Bilaga'}
                          onClick={() => setLightbox(url)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="svt-img-skeleton" />
                      )}
                      <button
                        className="svt-img-remove"
                        title="Ta bort bild"
                        onClick={() => onRemoveImage(task.id, im.path)}
                      >
                        <IcoClose size={13} />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Prompt */}
            {task.prompt && (
              <div style={{ marginTop: 20 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt2)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Prompt
                </span>
                <pre className="svt-prompt-box" style={{ maxHeight: 240 }}>{task.prompt}</pre>
              </div>
            )}
          </div>

          {/* Fot: delegera + flytta i flödet */}
          <div className="svt-modal-foot">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11.5, color: 'var(--txt3)', fontWeight: 600 }}>Delegera:</span>
              <AssigneePicker teamMembers={teamMembers} value={task.assignee_id} onChange={id => onAssigneeChange(task.id, id)} size={26} />
              {assignee && <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--sea)' }}>{assignee.username}</span>}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {idx > 0 && (
                <button className="svt-iconbtn" style={{ width: 'auto', gap: 5, padding: '6px 10px', fontSize: 12, fontWeight: 600 }}
                  onClick={() => onStatusChange(task.id, STATUS_ORDER[idx - 1]!)}>
                  <IcoChevron dir="left" /> {STATUS_LABEL[STATUS_ORDER[idx - 1]!]}
                </button>
              )}
              {idx < STATUS_ORDER.length - 1 && (
                <button className="svt-btn-primary" style={{ ...btnPrimary, padding: '7px 12px', fontSize: 12.5 }}
                  onClick={() => onStatusChange(task.id, STATUS_ORDER[idx + 1]!)}>
                  {STATUS_LABEL[STATUS_ORDER[idx + 1]!]} <IcoChevron dir="right" color="currentColor" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullstor visning — en mobilskärmdump måste kunna läsas */}
      {lightbox && (
        <div className="svt-lightbox" onClick={() => setLightbox(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="Bilaga i full storlek" onClick={e => e.stopPropagation()} />
          <button className="svt-iconbtn svt-lightbox-close" onClick={() => setLightbox(null)} title="Stäng (Esc)">
            <IcoClose size={20} />
          </button>
        </div>
      )}
    </>
  )
}

// ── Promptbibliotek ──────────────────────────────────────────────────────────

function PromptLibrary({ prompts, projects, projectById, onCreate, onDelete }: {
  prompts: Prompt[]
  projects: Project[]
  projectById: Map<string, Project>
  onCreate: (input: { title: string; content: string; tags: string[]; project_id: string | null }) => void
  onDelete: (id: string) => void
}) {
  const [q, setQ] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [projectId, setProjectId] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const s = new Set<string>()
    for (const p of prompts) for (const t of p.tags) s.add(t)
    return Array.from(s).sort()
  }, [prompts])
  const [tagFilter, setTagFilter] = useState<string | null>(null)

  const filtered = prompts.filter(p => {
    if (tagFilter && !p.tags.includes(tagFilter)) return false
    if (!q) return true
    const hay = `${p.title} ${p.content} ${p.tags.join(' ')}`.toLowerCase()
    return hay.includes(q.toLowerCase())
  })

  async function copy(p: Prompt) {
    try {
      await navigator.clipboard.writeText(p.content)
      setCopiedId(p.id)
      setTimeout(() => setCopiedId(null), 1500)
    } catch { /* no-op */ }
  }

  function submit() {
    if (!title.trim() || !content.trim()) return
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    onCreate({ title: title.trim(), content: content.trim(), tags, project_id: projectId || null })
    setTitle(''); setContent(''); setTagsInput(''); setProjectId(''); setShowForm(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Sök promptar…" className="svt-input" style={{ ...inputStyle, flex: 1, minWidth: 200 }} />
        <button onClick={() => setShowForm(v => !v)} className="svt-btn-primary" style={btnPrimary}><IcoPlus color="currentColor" /> {showForm ? 'Stäng' : 'Ny prompt'}</button>
      </div>

      {allTags.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          <button onClick={() => setTagFilter(null)} className={`svt-chip${!tagFilter ? ' active' : ''}`}>Alla</button>
          {allTags.map(t => (
            <button key={t} onClick={() => setTagFilter(t === tagFilter ? null : t)} className={`svt-chip${tagFilter === t ? ' active' : ''}`}>
              #{t}
            </button>
          ))}
        </div>
      )}

      {showForm && (
        <div style={{ ...surface, padding: 16, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titel — t.ex. 'Faktagranska guide-utkast'" className="svt-input" style={{ ...inputStyle, fontSize: 14, fontWeight: 500 }} autoFocus />
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Själva prompten…" rows={5} className="svt-input" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'ui-monospace, monospace' }} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="Taggar, kommaseparerat" className="svt-input" style={{ ...inputStyle, flex: 1, minWidth: 140 }} />
            <select value={projectId} onChange={e => setProjectId(e.target.value)} style={{ ...inputStyle, width: 'auto', minWidth: 140 }}>
              <option value="">Inget projekt</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={submit} className="svt-btn-primary" style={btnPrimary}>Spara prompt</button>
            <button onClick={() => setShowForm(false)} style={btnGhost}>Avbryt</button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="svt-empty-col" style={{ padding: '36px 12px' }}>
          <IcoPrompt color="var(--txt3)" />
          Inga promptar än — lägg till den första.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {filtered.map(p => {
            const proj = p.project_id ? projectById.get(p.project_id) : undefined
            return (
              <div key={p.id} className="svt-card" style={{ ...surface, padding: 16, borderTop: proj ? `3px solid ${proj.color}` : undefined, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{p.title}</div>
                  <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                    <button className="svt-iconbtn" onClick={() => copy(p)} title="Kopiera">
                      {copiedId === p.id ? <IcoCheck color="var(--green)" /> : <IcoCopy />}
                    </button>
                    <button className="svt-iconbtn danger" onClick={() => onDelete(p.id)} title="Ta bort">
                      <IcoTrash />
                    </button>
                  </div>
                </div>
                <pre style={{
                  fontSize: 12, color: 'var(--txt2)', background: 'var(--svt-chip-bg)', borderRadius: 8,
                  padding: '10px 12px', margin: '10px 0 0', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  fontFamily: 'ui-monospace, monospace', maxHeight: 160, overflowY: 'auto', flex: 1,
                }}>
                  {p.content}
                </pre>
                {p.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontSize: 10.5, fontWeight: 600, padding: '3px 9px', borderRadius: 999, background: 'var(--svt-chip-bg)', color: 'var(--txt3)' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Aktivitetsflöde ──────────────────────────────────────────────────────────

function ActivityFeed({ activity, projects, memberById, currentUser, onPost }: {
  activity: Activity[]
  projects: Project[]
  memberById: Map<string, TeamMember>
  currentUser: { id: string; username: string; initials?: string | null }
  onPost: (message: string, project_id: string | null) => void
}) {
  const [message, setMessage] = useState('')
  const [projectId, setProjectId] = useState('')

  function submit() {
    if (!message.trim()) return
    onPost(message.trim(), projectId || null)
    setMessage(''); setProjectId('')
  }

  const kindColor: Record<Activity['kind'], string> = {
    task: 'var(--green)', prompt: REVIEW_COLOR, project: 'var(--amber)', note: 'var(--sea)',
  }
  const iconFor = (kind: Activity['kind']) => {
    switch (kind) {
      case 'task': return <IcoCheck color={kindColor.task} />
      case 'prompt': return <IcoPrompt color={kindColor.prompt} />
      case 'project': return <IcoFolder color={kindColor.project} />
      default: return <IcoActivity color={kindColor.note} />
    }
  }

  return (
    <div>
      <div style={{ ...surface, padding: 14, marginBottom: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') submit() }}
          placeholder="Dela en uppdatering med Max/Tom…"
          className="svt-input"
          style={{ ...inputStyle, flex: 1, minWidth: 200 }}
        />
        <select value={projectId} onChange={e => setProjectId(e.target.value)} style={{ ...inputStyle, width: 'auto', minWidth: 140 }}>
          <option value="">Inget projekt</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <button onClick={submit} className="svt-btn-primary" style={btnPrimary}>Dela</button>
      </div>

      {activity.length === 0 ? (
        <div className="svt-empty-col" style={{ padding: '36px 12px' }}>
          <IcoActivity color="var(--txt3)" />
          Inget har hänt än.
        </div>
      ) : (
        <div style={{ ...surface, padding: '4px 16px' }}>
          {activity.map((a, i) => {
            const author = a.created_by ? memberById.get(a.created_by) : undefined
            const authorObj = author ?? (a.created_by === currentUser.id ? currentUser : undefined)
            const authorName = authorObj?.username ?? 'System'
            return (
              <div key={a.id} style={{
                display: 'flex', gap: 12, padding: '12px 0',
                borderBottom: i < activity.length - 1 ? '1px solid var(--svt-divider)' : 'none',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', background: 'var(--svt-chip-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {iconFor(a.kind)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, color: 'var(--txt)' }}>{a.message}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--txt3)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      width: 15, height: 15, borderRadius: '50%', background: author ? avatarColor(author.id) : 'var(--txt3)',
                      color: '#fff', fontSize: 8, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {authorObj ? memberInitials(authorObj) : initials(authorName)}
                    </span>
                    {authorName} · {relativeTime(a.created_at)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
