'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient, BOAT_TYPES } from '@/lib/supabase'
import { parseGpx, gpxStats, simplifyPoints } from '@/lib/gpx'
import type { GpxPoint } from '@/lib/gpx'
import { toast } from '@/components/Toast'

const MAX_FILES = 50

interface ImportFile {
 id: string
 filename: string
 status: 'parsing' | 'ready' | 'duplicate' | 'saving' | 'saved' | 'error'
 points: GpxPoint[]
 distNm: number
 durationMin: number
 startTime: string | null
 caption: string
 boatType: string
 duplicateWarning?: string
 errorMsg?: string
}

function miniMapPath(pts: GpxPoint[], W: number, H: number): string {
 if (pts.length < 2) return ''
 const lats = pts.map(p => p.lat)
 const lngs = pts.map(p => p.lng)
 const minLat = Math.min(...lats), maxLat = Math.max(...lats)
 const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)
 const ranLat = maxLat - minLat || 0.001
 const ranLng = maxLng - minLng || 0.001
 const pad = 0.1
 return pts.map((p, i) => {
 const x = (((p.lng - minLng) / ranLng) * (1 - pad * 2) + pad) * W
 const y = H - (((p.lat - minLat) / ranLat) * (1 - pad * 2) + pad) * H
 return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
 }).join(' ')
}

function fmtDur(min: number) {
 const h = Math.floor(min / 60)
 const m = min % 60
 return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`
}

export default function ImporteraPage() {
 const router = useRouter()
 const [userId, setUserId] = useState<string | null>(null)
 const [files, setFiles] = useState<ImportFile[]>([])
 const [dragging, setDragging] = useState(false)
 const inputRef = useRef<HTMLInputElement>(null)

 useEffect(() => {
 createClient().auth.getUser().then(({ data: { user } }) => {
 if (!user) { router.push('/logga-in'); return }
 setUserId(user.id)
 })
 }, [router])

 async function processFiles(fileList: File[]) {
 const gpxFiles = fileList.filter(f => f.name.toLowerCase().endsWith('.gpx')).slice(0, MAX_FILES - files.length)
 if (gpxFiles.length === 0) return

 const supabase = createClient()
 const newEntries: ImportFile[] = gpxFiles.map(f => ({
 id: Math.random().toString(36).slice(2),
 filename: f.name,
 status: 'parsing' as const,
 points: [],
 distNm: 0,
 durationMin: 0,
 startTime: null,
 caption: f.name.replace(/\.gpx$/i, ''),
 boatType: 'Segelbåt',
 }))

 setFiles(prev => [...prev, ...newEntries])

 for (let i = 0; i < gpxFiles.length; i++) {
 const file = gpxFiles[i]!
 const entry = newEntries[i]!
 try {
 const text = await file.text()
 const tracks = parseGpx(text)
 const allPts = tracks.flatMap(t => t.points)
 const stats = gpxStats(allPts)
 const simplified = simplifyPoints(allPts, 500)

 let status: ImportFile['status'] = 'ready'
 let duplicateWarning: string | undefined

 if (stats.startTime && userId) {
 const t0 = new Date(stats.startTime)
 const from = new Date(t0.getTime() - 5 * 60000).toISOString()
 const to = new Date(t0.getTime() + 5 * 60000).toISOString()
 const { data: existing } = await supabase
 .from('trips')
 .select('id, location_name, started_at')
 .eq('user_id', userId)
 .gte('started_at', from)
 .lte('started_at', to)
 .maybeSingle()
 if (existing) {
 status = 'duplicate'
 duplicateWarning = `Möjlig dubblett: ${existing.location_name ?? 'tur'} ${new Date(existing.started_at).toLocaleDateString('sv-SE')}`
 }
 }

 setFiles(prev => prev.map(e => e.id !== entry.id ? e : {
 ...e,
 status,
 points: simplified,
 distNm: stats.distNm,
 durationMin: stats.durationMin,
 startTime: stats.startTime,
 caption: tracks[0]?.name !== 'Import' ? tracks[0]!.name : e.caption,
 duplicateWarning,
 }))
 } catch {
 setFiles(prev => prev.map(e => e.id !== entry.id ? e : { ...e, status: 'error', errorMsg: 'Kunde inte läsa filen' }))
 }
 }
 }

 const onDrop = useCallback((e: React.DragEvent) => {
 e.preventDefault()
 setDragging(false)
 processFiles(Array.from(e.dataTransfer.files))
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [files.length, userId])

 async function saveFile(entry: ImportFile) {
 if (!userId) return
 setFiles(prev => prev.map(e => e.id !== entry.id ? e : { ...e, status: 'saving' }))

 const supabase = createClient()
 const routePoints = entry.points.map(p => ({ lat: p.lat, lng: p.lng }))

 const { data: trip, error } = await supabase
 .from('trips')
 .insert({
 user_id: userId,
 boat_type: entry.boatType,
 distance: entry.distNm,
 duration: entry.durationMin,
 average_speed_knots: entry.durationMin > 0 ? Math.round((entry.distNm / (entry.durationMin / 60)) * 10) / 10 : 0,
 caption: entry.caption || null,
 started_at: entry.startTime,
 route_points: routePoints,
 })
 .select('id')
 .single()

 if (error || !trip) {
 setFiles(prev => prev.map(e => e.id !== entry.id ? e : { ...e, status: 'error', errorMsg: error?.message ?? 'Sparning misslyckades' }))
 return
 }

 if (entry.points.length > 0) {
 const gpsBatch = entry.points.map(p => ({
 trip_id: trip.id,
 latitude: p.lat,
 longitude: p.lng,
 recorded_at: p.time ?? null,
 }))
 await supabase.from('gps_points').insert(gpsBatch)
 }

 setFiles(prev => prev.map(e => e.id !== entry.id ? e : { ...e, status: 'saved' }))
 toast(`${entry.caption || 'Tur'} sparad`)
 }

 function removeFile(id: string) {
 setFiles(prev => prev.filter(e => e.id !== id))
 }

 function updateField(id: string, key: keyof ImportFile, val: string) {
 setFiles(prev => prev.map(e => e.id !== id ? e : { ...e, [key]: val }))
 }

 const readyCount = files.filter(f => f.status === 'ready' || f.status === 'duplicate').length
 const savedCount = files.filter(f => f.status === 'saved').length

 async function saveAll() {
 const toSave = files.filter(f => f.status === 'ready' || f.status === 'duplicate')
 for (const f of toSave) await saveFile(f)
 }

 return (
 <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
 <header style={{
 position: 'sticky', top: 0, zIndex: 50,
 display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
 background: 'var(--glass-96)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
 borderBottom: '1px solid rgba(10,123,140,0.10)',
 }}>
 <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'var(--sea)', cursor: 'pointer', fontSize: 20, padding: '0 4px' }}>←</button>
 <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--sea)' }}>Importera GPX</span>
 {readyCount > 0 && (
 <button
 onClick={saveAll}
 className="press-feedback"
 style={{
 marginLeft: 'auto', padding: '8px 16px', borderRadius: 12,
 background: 'var(--grad-sea)',
 color: '#fff', fontSize: 13, fontWeight: 700,
 border: 'none', cursor: 'pointer', fontFamily: 'inherit',
 }}
 >
 Spara alla ({readyCount})
 </button>
 )}
 </header>

 <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px 16px' }}>

 {/* Drop zone */}
 <div
 onDragOver={e => { e.preventDefault(); setDragging(true) }}
 onDragLeave={() => setDragging(false)}
 onDrop={onDrop}
 onClick={() => inputRef.current?.click()}
 style={{
 border: `2px dashed ${dragging ? 'var(--sea)' : 'rgba(10,123,140,0.25)'}`,
 borderRadius: 20,
 padding: '40px 24px',
 textAlign: 'center',
 cursor: 'pointer',
 background: dragging ? 'rgba(30,92,130,0.05)' : 'var(--white)',
 transition: 'all 0.15s',
 marginBottom: 20,
 }}
 >
 <div style={{ fontSize: 40, marginBottom: 10 }}>📁</div>
 <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)', margin: '0 0 6px' }}>
 Dra och släpp GPX-filer här
 </p>
 <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0 }}>
 Eller klicka för att välja · Max {MAX_FILES} filer per session
 </p>
 <input
 ref={inputRef}
 type="file"
 accept=".gpx"
 multiple
 style={{ display: 'none' }}
 onChange={e => processFiles(Array.from(e.target.files ?? []))}
 />
 </div>

 {savedCount > 0 && (
 <div style={{
 background: 'rgba(15,158,100,0.1)', border: '1px solid rgba(15,158,100,0.25)',
 borderRadius: 12, padding: '10px 14px', marginBottom: 12,
 fontSize: 13, color: 'var(--green)', fontWeight: 600,
 }}>
 {savedCount} tur{savedCount > 1 ? 'er' : ''} sparad{savedCount > 1 ? 'e' : ''}
 </div>
 )}

 {/* File list */}
 {files.map(entry => {
 const MAP_W = 120, MAP_H = 80
 const path = miniMapPath(entry.points, MAP_W, MAP_H)
 const isReady = entry.status === 'ready' || entry.status === 'duplicate'

 return (
 <div key={entry.id} style={{
 background: 'var(--white)',
 borderRadius: 18,
 marginBottom: 12,
 overflow: 'hidden',
 boxShadow: '0 2px 12px rgba(0,45,60,0.07)',
 opacity: entry.status === 'saved' ? 0.6 : 1,
 border: entry.status === 'duplicate' ? '1.5px solid #c96e2a' : '1.5px solid transparent',
 }}>
 <div style={{ display: 'flex', gap: 12, padding: 14, alignItems: 'flex-start' }}>

 {/* Mini-map */}
 <div style={{ width: MAP_W, height: MAP_H, background: '#0d2240', borderRadius: 10, flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 {entry.status === 'parsing' ? (
 <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>…</span>
 ) : path ? (
 <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} width={MAP_W} height={MAP_H}>
 <path d={path} fill="none" stroke="#4ab8d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 ) : (
 <span style={{ fontSize: 20 }}>⚠️</span>
 )}
 </div>

 {/* Content */}
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
 <span style={{ fontSize: 10, color: 'var(--txt3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.filename}</span>
 <button onClick={() => removeFile(entry.id)} style={{ background: 'none', border: 'none', color: 'var(--txt3)', cursor: 'pointer', fontSize: 16, padding: 0, marginLeft: 'auto', flexShrink: 0 }}>×</button>
 </div>

 {entry.status === 'parsing' && (
 <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0 }}>Läser fil…</p>
 )}

 {entry.status === 'error' && (
 <p style={{ fontSize: 13, color: 'var(--red)', margin: 0 }}>{entry.errorMsg ?? 'Fel'}</p>
 )}

 {entry.status === 'saved' && (
 <p style={{ fontSize: 13, color: 'var(--green)', margin: 0, fontWeight: 600 }}>Sparad</p>
 )}

 {(isReady || entry.status === 'saving') && (
 <>
 {entry.duplicateWarning && (
 <p style={{ fontSize: 11, color: 'var(--acc)', margin: '0 0 8px', fontWeight: 600 }}>
 {entry.duplicateWarning}
 </p>
 )}
 <div style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 12, color: 'var(--txt3)' }}>
 <span>{entry.distNm} nm</span>
 {entry.durationMin > 0 && <span>{fmtDur(entry.durationMin)}</span>}
 {entry.startTime && <span>{new Date(entry.startTime).toLocaleDateString('sv-SE')}</span>}
 </div>
 <input
 value={entry.caption}
 onChange={e => updateField(entry.id, 'caption', e.target.value)}
 placeholder="Benämning (valfri)"
 style={{
 width: '100%', padding: '7px 10px', borderRadius: 10,
 border: '1.5px solid rgba(10,123,140,0.18)',
 fontSize: 13, color: 'var(--txt)', background: 'var(--bg)',
 fontFamily: 'inherit', marginBottom: 6, boxSizing: 'border-box',
 }}
 />
 <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
 <select
 value={entry.boatType}
 onChange={e => updateField(entry.id, 'boatType', e.target.value)}
 style={{
 flex: 1, padding: '7px 10px', borderRadius: 10,
 border: '1.5px solid rgba(10,123,140,0.18)',
 fontSize: 13, color: 'var(--txt)', background: 'var(--bg)',
 fontFamily: 'inherit',
 }}
 >
 {BOAT_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
 </select>
 <button
 onClick={() => saveFile(entry)}
 disabled={entry.status === 'saving'}
 className="press-feedback"
 style={{
 padding: '7px 16px', borderRadius: 10,
 background: 'var(--grad-sea)',
 color: '#fff', fontSize: 13, fontWeight: 700,
 border: 'none', cursor: entry.status === 'saving' ? 'not-allowed' : 'pointer',
 fontFamily: 'inherit', opacity: entry.status === 'saving' ? 0.7 : 1,
 flexShrink: 0,
 }}
 >
 {entry.status === 'saving' ? '…' : 'Spara'}
 </button>
 </div>
 </>
 )}
 </div>
 </div>
 </div>
 )
 })}

 {files.length === 0 && (
 <p style={{ textAlign: 'center', color: 'var(--txt3)', fontSize: 14, marginTop: 32 }}>
 Stöds: GPX v1.1 · Max {MAX_FILES} filer per session
 </p>
 )}
 </div>
 </div>
 )
}
