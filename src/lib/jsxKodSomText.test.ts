// Spärr mot kod som visas som text (2026-11-07).
//
// Bakgrund: AchievementFeedCard visade "getIconForEvent(ev.type)" i klartext
// i flödet från 29 sep till 7 nov (#507), /nyborjare-segling visade fyra
// interna "// UPPSKATTNING"-kommentarer för besökarna och boost-knappen i
// loppisen visade "// PRODUKTREGEL". TypeScript ser inget: det är bara text.
//
// Testet parsar varje .tsx under src med TypeScript-kompilatorn och tittar
// på JsxText-noderna, alltså det som faktiskt hamnar på skärmen. Det fäller
// bygget när en textnod ser ut som kod eller som en kommentar. Vanlig svenska
// med parenteser ("Pris (kr)", "t.ex.") går igenom.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

const ROT = join(__dirname, '..')

function tsxFiler(dir: string, ut: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) tsxFiler(p, ut)
    else if (e.name.endsWith('.tsx')) ut.push(p)
  }
  return ut
}

const MONSTER: Array<[RegExp, string]> = [
  // "// kommentar" eller "/* kommentar */" som hamnat utanför klamrar
  [/^\/\/|\/\*\s|\s\*\//m, 'kommentar i klartext'],
  // internt arbetsspråk som aldrig ska synas för besökare
  [/^\s*(UPPSKATTNING|KÄLLA|MÄTT|RESONERAT|PRODUKTREGEL|TODO|FIXME|HACK)\s*:/m, 'intern anteckning'],
  // camelCase-anrop: getIconForEvent(x), formatDate(trip.started_at)
  [/\b[a-z_$][\w$]*[A-Z][\w$]*\([^)]*\)/, 'funktionsanrop'],
  // anrop med egenskap som argument: f(ev.type)
  [/\b[a-z_$][\w$]*\(\s*[\w$]+\.[\w$.]+\s*\)/, 'funktionsanrop'],
  // egenskapsåtkomst på vanliga variabelnamn: ev.type, props.title, item.name
  [/\b(ev|props|item|row|data|user|trip|island|guide|place|state|params|entry|node)\.[a-z_]\w*\b/, 'egenskap'],
  // mallsträng som inte tolkats
  [/\$\{/, 'mallsträng'],
  [/\b(undefined|NaN)\b|\[object Object\]/, 'undefined/NaN/object'],
]

export function kodSomText(fil: string, kallkod: string): string[] {
  const sf = ts.createSourceFile(fil, kallkod, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const fel: string[] = []
  const besok = (n: ts.Node) => {
    if (n.kind === ts.SyntaxKind.JsxText) {
      const text = n.getText().trim()
      if (text) {
        for (const [re, varfor] of MONSTER) {
          if (re.test(text)) {
            const { line } = sf.getLineAndCharacterOfPosition(n.getStart())
            fel.push(`${fil}:${line + 1} [${varfor}] ${text.replace(/\s+/g, ' ').slice(0, 120)}`)
            break
          }
        }
      }
    }
    ts.forEachChild(n, besok)
  }
  besok(sf)
  return fel
}

describe('JSX-text som ser ut som kod', () => {
  it('ingen textnod i src/**/*.tsx ser ut som kod, kommentar eller intern anteckning', () => {
    const fel = tsxFiler(ROT).flatMap(f => kodSomText(f.replace(ROT + '/', 'src/'), readFileSync(f, 'utf8')))
    expect(fel, fel.join('\n')).toEqual([])
  })

  it('fångar de tre felen som fanns 2026-11-07', () => {
    expect(kodSomText('a.tsx', '<div>getIconForEvent(ev.type)</div>')).toHaveLength(1)
    expect(kodSomText('b.tsx', '<p>\n // UPPSKATTNING: ungefärliga priser\n Text.\n</p>')).toHaveLength(1)
    expect(kodSomText('c.tsx', '<button>\n // PRODUKTREGEL: vårt eget pris\n {x}\n</button>')).toHaveLength(1)
  })

  it('släpper igenom vanlig svenska med parenteser', () => {
    expect(kodSomText('d.tsx', '<label>Pris (kr)</label>')).toEqual([])
    expect(kodSomText('e.tsx', '<p>Texten ligger i <code>emails/*.md</code>, t.ex. så här (valfritt).</p>')).toEqual([])
    expect(kodSomText('f.tsx', '<p>Kalmar Länstrafik (KLT) och Strömma (Cinderella).</p>')).toEqual([])
  })
})
