/**
 * FÖRHANDSVISNING 2026-11-19: långa avsnitt som gardiner (Max).
 *
 * Tar sidans fördjupningstext och gör varje H2-avsnitt till en gardin som
 * fälls ut när man trycker på rubriken. Avsnitt med "frågor" i rubriken får
 * dessutom en gardin per fråga (H3). Texten ligger kvar i sidans HTML, så den
 * syns för sökmotorer precis som förut; bara visningen ändras.
 *
 * Samma avstånd överallt: rubriker, stycken och listor får sina marginaler
 * härifrån, inte från varje sidas egna inline-stilar.
 *
 * Har texten inga H2 som direkta barn visas den oförändrad.
 */
import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from 'react'

type MedBarn = ReactElement<{ children?: ReactNode; id?: string }>

const text = (n: ReactNode): string =>
  typeof n === 'string' || typeof n === 'number' ? String(n)
    : Array.isArray(n) ? n.map(text).join('')
      : isValidElement(n) ? text((n.props as { children?: ReactNode }).children) : ''

/** Plattar ut fragment så att rubrikerna hamnar på samma nivå. */
function platta(node: ReactNode): ReactNode[] {
  const ut: ReactNode[] = []
  Children.toArray(node).forEach(c => {
    if (isValidElement(c) && c.type === Fragment) ut.push(...platta((c.props as { children?: ReactNode }).children))
    else ut.push(c)
  })
  return ut
}

const arTagg = (n: ReactNode, tagg: string): n is MedBarn => isValidElement(n) && n.type === tagg

function dela(noder: ReactNode[], tagg: string) {
  const fore: ReactNode[] = []
  const grupper: { rubrik: MedBarn; innehall: ReactNode[] }[] = []
  for (const n of noder) {
    if (arTagg(n, tagg)) grupper.push({ rubrik: n, innehall: [] })
    else if (grupper.length) grupper[grupper.length - 1].innehall.push(n)
    else fore.push(n)
  }
  return { fore, grupper }
}

export default function Gardiner({ children }: { children: ReactNode }) {
  const { fore, grupper } = dela(platta(children), 'h2')
  if (grupper.length === 0) return <>{children}</>
  return (
    <div className="gardiner">
      <style>{GARDIN_CSS}</style>
      {fore.length > 0 && <div className="gardin-fore">{fore}</div>}
      {grupper.map((g, i) => {
        const arFragor = /fr[åa]gor/i.test(text(g.rubrik.props.children))
        let inre: ReactNode[] = g.innehall
        if (arFragor) {
          const f = dela(g.innehall, 'h3')
          if (f.grupper.length) {
            inre = [
              ...f.fore,
              ...f.grupper.map((q, j) => (
                <details key={`fraga-${j}`} className="gardin-fraga">
                  <summary><h3 className="gardin-h3">{q.rubrik.props.children}</h3></summary>
                  <div className="gardin-svar">{q.innehall}</div>
                </details>
              )),
            ]
          }
        }
        return (
          <details key={`gardin-${i}`} className="gardin" id={g.rubrik.props.id}>
            <summary><h2 className="gardin-h2">{g.rubrik.props.children}</h2></summary>
            <div className="gardin-inre">{inre}</div>
          </details>
        )
      })}
    </div>
  )
}

const GARDIN_CSS = `
.gardiner{display:flex;flex-direction:column;gap:12px}
.gardin-fore>*:last-child{margin-bottom:6px!important}
.gardin{background:var(--white);border:1px solid rgba(150,110,60,.16);border-radius:14px;box-shadow:0 1px 4px rgba(90,60,20,.05)}
.gardin>summary{list-style:none;cursor:pointer;padding:18px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.gardin>summary::-webkit-details-marker{display:none}
.gardin>summary::after{content:'+';flex-shrink:0;font-size:24px;line-height:1;color:var(--acc-text,#a8501a);transition:transform .2s ease}
.gardin[open]>summary::after{transform:rotate(45deg)}
.gardin>summary:hover .gardin-h2{color:var(--sea)}
.gardin-h2{font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:700;color:var(--txt);margin:0;line-height:1.3}
.gardin-inre{padding:0 22px 20px;font-size:15px;line-height:1.7;color:var(--txt)}
.gardin-inre>*:first-child{margin-top:0!important}
.gardin-inre h3:not(.gardin-h3){font-family:'Playfair Display',Georgia,serif;font-size:17px!important;font-weight:700;color:var(--txt);margin:24px 0 8px!important;line-height:1.3}
.gardin-inre p,.gardin-inre ul,.gardin-inre ol{margin:0 0 14px!important}
.gardin-inre li{margin:0 0 6px}
.gardin-fraga{border-top:1px solid rgba(150,110,60,.14)}
.gardin-fraga>summary{list-style:none;cursor:pointer;padding:14px 0;display:flex;align-items:center;justify-content:space-between;gap:12px}
.gardin-fraga>summary::-webkit-details-marker{display:none}
.gardin-fraga>summary::after{content:'+';flex-shrink:0;font-size:20px;line-height:1;color:var(--acc-text,#a8501a)}
.gardin-fraga[open]>summary::after{content:'\\2212'}
.gardin-h3{font-size:15.5px;font-weight:700;color:var(--txt);margin:0;line-height:1.4}
.gardin-svar{padding:0 0 12px}
.gardin-svar p{margin:0 0 10px!important}
@media (max-width:640px){.gardin>summary{padding:16px 16px}.gardin-inre{padding:0 16px 16px}}
`
