/**
 * Svalla — Moderation helpers
 * Ordfilter (svenska + engelska), rapport-CRUD, admin-queue.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

// ─── Typer ────────────────────────────────────────────────────────────────────

export type ReportTargetType =
  | 'trip' | 'comment' | 'user' | 'message' | 'review' | 'story' | 'checkin'

export type ReportReason =
  | 'spam' | 'harassment' | 'inappropriate' | 'misinformation' | 'underage' | 'other'

export type ReportStatus = 'open' | 'reviewed' | 'actioned' | 'dismissed'

export interface Report {
  id: string
  reporter_id: string
  target_type: ReportTargetType
  target_id: string
  reason: ReportReason
  note: string | null
  status: ReportStatus
  auto_flagged: boolean
  created_at: string
  reviewed_by: string | null
  reviewed_at: string | null
}

export interface ModerationQueueItem {
  id: string
  target_type: ReportTargetType
  target_id: string
  reason: ReportReason
  note: string | null
  status: ReportStatus
  auto_flagged: boolean
  created_at: string
  reviewed_at: string | null
  reporter_username: string | null
  reviewer_username: string | null
  report_count: number
}

// ─── Ordfilter ────────────────────────────────────────────────────────────────
// Lista med termer som triggar auto-flaggning.
// Listan är avsiktligt måttlig — vi flaggar inte bort, bara markerar för granskning.

const FLAGGED_WORDS: RegExp[] = [
  // Svenska
  /\b(hora|fitta|kuk|jävla|fan|fuck|knull|skit|idiot|mongo|cp|neger|bög|flata|nobbe|rövhål|jävel|helvete|djävul)\b/i,
  // Engelska
  /\b(bitch|asshole|bastard|cunt|fuck|shit|whore|slut|faggot|retard|nigger|rape|kill\s+your?self)\b/i,
  // Kontextspecifika farliga fraser
  /ta\s+livet\s+av\s+dig/i,
  /döda\s+dig/i,
]

export interface FilterResult {
  flagged: boolean
  matchedWords: string[]
}

/**
 * Kontrollerar om en textsträng innehåller flaggade ord.
 * Returnerar { flagged, matchedWords }.
 */
export function filterText(text: string): FilterResult {
  if (!text || text.trim().length === 0) return { flagged: false, matchedWords: [] }

  const matched: string[] = []
  for (const pattern of FLAGGED_WORDS) {
    const m = text.match(pattern)
    if (m) matched.push(m[0])
  }
  return { flagged: matched.length > 0, matchedWords: matched }
}

// ─── CRUD ────────────────────────────────────────────────────────────────────

/**
 * Skapa en anmälan. Returnerar rapport-ID vid lyckat, null vid fel.
 */
export async function createReport(
  supabase: SupabaseClient,
  reporterId: string,
  params: {
    targetType: ReportTargetType
    targetId: string
    reason: ReportReason
    note?: string
    autoFlagged?: boolean
  },
): Promise<string | null> {
  const { data, error } = await supabase
    .from('reports')
    .insert({
      reporter_id:  reporterId,
      target_type:  params.targetType,
      target_id:    params.targetId,
      reason:       params.reason,
      note:         params.note?.trim() ?? null,
      auto_flagged: params.autoFlagged ?? false,
    })
    .select('id')
    .single()

  if (error) {
    // Unique violation = redan anmält
    if (`${error.code}` === '23505') return 'already_reported'
    return null
  }
  return data?.id ?? null
}

/**
 * Hämta inloggad användares egna anmälningar.
 */
export async function getMyReports(
  supabase: SupabaseClient,
  userId: string,
): Promise<Report[]> {
  const { data } = await supabase
    .from('reports')
    .select('id, reporter_id, target_type, target_id, reason, note, status, auto_flagged, created_at, reviewed_by, reviewed_at')
    .eq('reporter_id', userId)
    .order('created_at', { ascending: false })
  return (data ?? []) as Report[]
}

/**
 * Admin: hämta moderationskö.
 */
export async function getModerationQueue(
  supabase: SupabaseClient,
  status: ReportStatus | 'all' = 'open',
  limit = 50,
  offset = 0,
): Promise<ModerationQueueItem[]> {
  const { data } = await supabase.rpc('get_moderation_queue', {
    p_status: status,
    p_limit:  limit,
    p_offset: offset,
  })
  return (data ?? []) as ModerationQueueItem[]
}

/**
 * Admin: uppdatera rapportstatus.
 */
export async function adminUpdateReport(
  supabase: SupabaseClient,
  reportId: string,
  status: 'reviewed' | 'actioned' | 'dismissed',
  note?: string,
): Promise<boolean> {
  const { error } = await supabase.rpc('admin_update_report', {
    p_report_id: reportId,
    p_status:    status,
    p_note:      note ?? null,
  })
  return !error
}

// ─── Hjälp: human-läsbara etiketter ─────────────────────────────────────────

export const REASON_LABELS: Record<ReportReason, string> = {
  spam:           'Skräppost / spam',
  harassment:     'Trakasseri eller hot',
  inappropriate:  'Olämpligt innehåll',
  misinformation: 'Falsk eller vilseledande info',
  underage:       'Involverar minderårig',
  other:          'Annat',
}

export const TARGET_TYPE_LABELS: Record<ReportTargetType, string> = {
  trip:     'Tur',
  comment:  'Kommentar',
  user:     'Användare',
  message:  'Meddelande',
  review:   'Recension',
  story:    'Story',
  checkin:  'Check-in',
}

export const STATUS_LABELS: Record<ReportStatus, string> = {
  open:      'Öppen',
  reviewed:  'Granskad',
  actioned:  'Åtgärdad',
  dismissed: 'Avfärdad',
}
