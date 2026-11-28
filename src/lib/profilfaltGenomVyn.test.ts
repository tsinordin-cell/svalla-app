// Spärr: profilfält med synlighetsval får inte läsas direkt ur users (2026-11-19).
//
// Bakgrund: på profilen väljer användaren vilka fält andra får se (kolumnen
// public_fields). Valet gällde länge bara i gränssnittet: sidorna läste alla
// fält ur tabellen users och dolde dem sedan, så den som frågade databasens
// API direkt fick ut bio, båttyp och båtmodell för vilket konto som helst.
//
// Nu lämnas fälten ut av vyn users_publik (bara det som är
// publikt), och läsrätten till samma kolumner i users är borttagen för vanliga
// klienter. En fråga som ändå läser dem ur users får "permission denied" i
// drift. Det syns inte i bygget, så det här testet fäller den i stället.
//
// Testet parsar varje .ts/.tsx under src och tittar på kedjor som börjar med
// .from('users'): select, filter och sortering får inte nämna de stängda
// kolumnerna. Att SKRIVA dem (update/insert/upsert) är tillåtet. Det tittar
// också på inbäddningar i andra tabellers select, till exempel
// trips.select('id, users(bio)').
//
// Fälls testet: läs ur users_publik (andras profiler) eller min_profil() (den egna) i stället för users.
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

const ROT = join(__dirname, '..')

/** Kolumnerna i users som inte går att läsa för anon/authenticated. */
export const STANGDA_KOLUMNER = [
  'bio', 'website', 'nationality', 'experience_years',
  'vessel_name', 'vessel_type', 'vessel_model', 'boat_type',
  'home_port', 'home_port_lat', 'home_port_lng', 'sailing_region',
  // 2026-11-20: vilka konton som är admin ska inte gå att lista. Fråga
  // is_admin_user() genom lib/adminRad.ts i stället.
  'is_admin',
] as const

/**
 * Filer som läser users med service-nyckeln (förbi kolumnrättigheterna).
 * Lägg bara till en fil här om frågan bevisligen går genom admin-klienten.
 */
const UNDANTAG = new Set([
  'app/admin/users/page.tsx', // adminlistan över konton, getAdminClient()
  'app/team/page.tsx', // listan över adminkonton hämtas med tjänsteklienten (service)
  'app/api/team/delegera/route.ts', // kollar med tjänsteklienten att mottagaren är i teamet; is_admin bara som filter, lämnas aldrig ut (2026-11-28)
])

const LASMETODER = new Set([
  'select', 'eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'is', 'in',
  'contains', 'containedBy', 'order', 'not', 'or', 'filter', 'match', 'textSearch', 'overlaps',
])

const ordgrans = (k: string) => new RegExp(`(^|[^a-z0-9_])${k}([^a-z0-9_]|$)`)

function stangdaI(text: string): string[] {
  return STANGDA_KOLUMNER.filter(k => ordgrans(k).test(text))
}

/** Texten i ett argument: strängliteral, mallsträng eller en const-sträng i samma fil. */
function argumentText(arg: ts.Expression | undefined, sf: ts.SourceFile): string | null {
  if (!arg) return ''
  if (ts.isStringLiteral(arg) || ts.isNoSubstitutionTemplateLiteral(arg)) return arg.text
  if (ts.isTemplateExpression(arg)) return arg.getText(sf)
  if (ts.isObjectLiteralExpression(arg) || ts.isArrayLiteralExpression(arg)) return arg.getText(sf)
  if (ts.isIdentifier(arg)) {
    let funnen: string | null = null
    const leta = (n: ts.Node) => {
      if (funnen !== null) return
      if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.name.text === arg.text && n.initializer) {
        const i = n.initializer
        if (ts.isStringLiteral(i) || ts.isNoSubstitutionTemplateLiteral(i)) funnen = i.text
        else funnen = i.getText(sf)
      }
      ts.forEachChild(n, leta)
    }
    leta(sf)
    return funnen
  }
  return arg.getText(sf)
}

export function lasningarUrUsers(fil: string, kallkod: string): string[] {
  const sf = ts.createSourceFile(fil, kallkod, ts.ScriptTarget.Latest, true, fil.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  const fynd: string[] = []
  const rad = (n: ts.Node) => sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1

  const besok = (n: ts.Node) => {
    if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression)) {
      const metod = n.expression.name.text
      const forsta = n.arguments[0]

      // 1. Kedjan efter .from('users')
      if (metod === 'from' && forsta && ts.isStringLiteral(forsta) && forsta.text === 'users') {
        let nod: ts.Node = n
        // Gå uppåt: .metod(...) ligger som PropertyAccess → Call ovanför varje led.
        while (nod.parent && ts.isPropertyAccessExpression(nod.parent) && nod.parent.expression === nod
          && nod.parent.parent && ts.isCallExpression(nod.parent.parent) && nod.parent.parent.expression === nod.parent) {
          const anrop: ts.CallExpression = nod.parent.parent
          const namn = nod.parent.name.text
          const har = rad(nod.parent.name) // raden där metoden står, inte där kedjan börjar
          if (LASMETODER.has(namn)) {
            // Bara första argumentet är kolumner: .eq('id', värde), .select('a, b', { count }).
            const text = argumentText(anrop.arguments[0], sf)
            if (text === null) {
              // En select vars kolumnlista inte går att läsa av kan gömma vad som helst.
              if (namn === 'select') fynd.push(`rad ${har}: users.select(…) med en kolumnlista som testet inte kan läsa av`)
            } else {
              for (const k of stangdaI(text)) fynd.push(`rad ${har}: users.${namn} läser "${k}"`)
            }
          }
          nod = anrop
        }
      }

      // 2. Inbäddat users(...) i en select på en annan tabell
      if (metod === 'select' && forsta) {
        const text = argumentText(forsta, sf) ?? ''
        for (const m of text.matchAll(/(?:^|[\s,:])users(?:![a-z_]+)?\s*\(([^)]*)\)/g)) {
          for (const k of stangdaI(m[1] ?? '')) fynd.push(`rad ${rad(n)}: inbäddat users(…) läser "${k}"`)
        }
      }
    }
    ts.forEachChild(n, besok)
  }
  besok(sf)
  return fynd
}

function kallfiler(dir: string, ut: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) { if (e.name !== 'node_modules') kallfiler(p, ut) }
    else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) ut.push(p)
  }
  return ut
}

describe('spärren själv', () => {
  it('fäller en select på en stängd kolumn', () => {
    expect(lasningarUrUsers('a.ts', `supabase.from('users').select('id, bio')`)).toHaveLength(1)
  })

  it('fäller även när en kommentar ligger mitt i kedjan', () => {
    const kod = `supabase.from('users').update({ bio: 'x' })\n  .eq('id', id)\n  // kommentar\n  .select('id, vessel_model')`
    expect(lasningarUrUsers('a.ts', kod)).toEqual(['rad 4: users.select läser "vessel_model"'])
  })

  it('fäller filter, or-villkor och sortering', () => {
    expect(lasningarUrUsers('a.ts', `supabase.from('users').select('id').ilike('home_port', 'x')`)).toHaveLength(1)
    expect(lasningarUrUsers('a.ts', "supabase.from('users').select('id').or(`username.ilike.${p},vessel_name.ilike.${p}`)")).toHaveLength(1)
    expect(lasningarUrUsers('a.ts', `supabase.from('users').select('id').order('sailing_region')`)).toHaveLength(1)
  })

  it('fäller en select genom en konstant i samma fil', () => {
    const kod = `const FALT = 'id, username, boat_type'\nsupabase.from('users').select(FALT)`
    expect(lasningarUrUsers('a.ts', kod)).toHaveLength(1)
  })

  it('fäller inbäddat users(...) i en annan tabells select', () => {
    expect(lasningarUrUsers('a.ts', `supabase.from('trips').select('id, users(username, bio)')`)).toHaveLength(1)
    expect(lasningarUrUsers('a.ts', `supabase.from('trips').select('id, forfattare:users!user_id(home_port)')`)).toHaveLength(1)
  })

  it('släpper igenom skrivningar, öppna kolumner och vyn', () => {
    expect(lasningarUrUsers('a.ts', `supabase.from('users').update({ bio: 'x', home_port: 'y' }).eq('id', id)`)).toEqual([])
    expect(lasningarUrUsers('a.ts', `supabase.from('users').select('id, username, avatar, public_fields')`)).toEqual([])
    expect(lasningarUrUsers('a.ts', `supabase.from('users_publik').select('id, bio, home_port')`)).toEqual([])
    expect(lasningarUrUsers('a.ts', `supabase.from('trips').select('id, boat_type, users(username, avatar)')`)).toEqual([])
  })

  it('räknar inte ett värde som en kolumn', () => {
    expect(lasningarUrUsers('a.ts', `supabase.from('users').select('id').eq('username', 'bio')`)).toEqual([])
  })
})

describe('profilfält med synlighetsval läses genom vyn users_publik', () => {
  it('ingen fråga i src läser de stängda kolumnerna ur users', () => {
    const fel: string[] = []
    for (const fil of kallfiler(ROT)) {
      const rel = relative(ROT, fil).split(sep).join('/')
      if (UNDANTAG.has(rel)) continue
      for (const f of lasningarUrUsers(fil, readFileSync(fil, 'utf8'))) fel.push(`src/${rel}, ${f}`)
    }
    expect(fel, `Läs ur users_publik i stället för users:\n${fel.join('\n')}`).toEqual([])
  })
})
