'use client'
/**
 * FÖRHANDSVISNING 2026-11-21: alla delar som kan finnas på en verksamhetssida.
 * Verksamheten ("Krogen vid gästhamnen" / "Hotellet vid hamnen") och allt om den är EXEMPEL.
 * Märkningen "Finns redan" gäller delar som finns på Svallas platssidor i dag.
 */
import Link from 'next/link'
import { useMemo, useState } from 'react'
import SvallaLogo from '@/components/SvallaLogo'

export type VBild = { url: string; fotograf: string; licens: string } | null
type Typ = 'krog' | 'hotell'
type Status = 'finns' | 'ide'
type Del = { id: string; namn: string; grupp: string; status: Status; text: string; kravs?: string }

const DELAR: Del[] = [
  { id: 'galleri', grupp: 'Första intrycket', namn: 'Bildgalleri', status: 'finns', text: 'Flera bilder överst som man sveper mellan.' },
  { id: 'huvud', grupp: 'Första intrycket', namn: 'Namn, kort rad och prisklass', status: 'finns', text: 'Vad stället är, på en rad.' },
  { id: 'dela', grupp: 'Första intrycket', namn: 'Dela och spara', status: 'finns', text: 'Knappar för att dela sidan och spara stället.' },
  { id: 'video', grupp: 'Första intrycket', namn: 'Svallafilm om stället', status: 'ide', text: 'En kort film i Svallas stil om historien bakom stället.', kravs: 'Filmen görs med sanningsprocessen, som våra öfilmer.' },
  { id: 'speciellt', grupp: 'Om stället', namn: 'Det som gör stället speciellt', status: 'finns', text: 'En mening om varför man ska åka just hit.' },
  { id: 'taggar', grupp: 'Om stället', namn: 'Taggar', status: 'finns', text: 'Korta ord som Utsikt, Brygga, Barnvänligt.' },
  { id: 'beskrivning', grupp: 'Om stället', namn: 'Beskrivning', status: 'finns', text: 'Längre text om stället.' },
  { id: 'egenskaper', grupp: 'Om stället', namn: 'Egenskaper och säsong', status: 'finns', text: 'Typ, faciliteter, passar för och säsong.' },
  { id: 'meny', grupp: 'Om stället', namn: 'Meny eller rum', status: 'finns', text: 'Menyn för en krog. För hotell blir det rummen.', kravs: 'Rum för hotell finns inte än, menyn finns.' },
  { id: 'evenemang', grupp: 'Om stället', namn: 'Evenemang', status: 'ide', text: 'Kommande kvällar, musik och säsongsstart.', kravs: 'Verksamheten lägger själv in sina datum.' },
  { id: 'kontakt', grupp: 'Hitta och komma dit', namn: 'Kontakt, adress och öppettider', status: 'finns', text: 'Telefon, hemsida, adress och länk till Google Maps.' },
  { id: 'karta', grupp: 'Hitta och komma dit', namn: 'Minikarta med vägbeskrivning', status: 'finns', text: 'Var stället ligger och en knapp för vägen dit.' },
  { id: 'baten', grupp: 'Hitta och komma dit', namn: 'Båten hit', status: 'ide', text: 'Närmaste brygga och vilken båt som går dit.', kravs: 'Finns redan per ö, behöver kopplas till stället.' },
  { id: 'gasthamn', grupp: 'Hitta och komma dit', namn: 'Gästhamn för egen båt', status: 'ide', text: 'Närmaste gästhamn för den som kommer med egen båt.', kravs: 'Hamnarna finns per ö, behöver kopplas till stället.' },
  { id: 'boka', grupp: 'Boka och följa', namn: 'Stor bokningsknapp som alltid syns', status: 'ide', text: 'Boka bord eller rum, längst ner i mobilen hela tiden. Gästen bokar hos er.', kravs: 'Bokningslänkar finns på ösidorna, knappen är ny.' },
  { id: 'instagram', grupp: 'Boka och följa', namn: 'Följ på Instagram', status: 'ide', text: 'En knapp till verksamhetens Instagram.', kravs: 'Verksamheten anger sitt konto.' },
  { id: 'flode', grupp: 'Boka och följa', namn: 'Senaste inläggen från Instagram', status: 'ide', text: 'Verksamhetens egna bilder direkt på sidan.', kravs: 'Kräver att verksamheten loggar in via Meta och godkänner det.' },
  { id: 'planera', grupp: 'Svalla gör det unikt', namn: 'Planera en tur hit', status: 'finns', text: 'Lägg stället i en dagsplan.' },
  { id: 'logga', grupp: 'Svalla gör det unikt', namn: 'Logga ett besök', status: 'finns', text: 'Besökaren sparar att den varit här.' },
  { id: 'besok', grupp: 'Svalla gör det unikt', namn: 'Senaste besök', status: 'finns', text: 'Turer där stället varit med.' },
  { id: 'rutter', grupp: 'Svalla gör det unikt', namn: 'Rutter som passar', status: 'finns', text: 'Båtrutter som går förbi.' },
  { id: 'narheten', grupp: 'Svalla gör det unikt', namn: 'I närheten och öns sida', status: 'finns', text: 'Andra ställen i närheten och länk till ön.' },
  { id: 'thorkel', grupp: 'Svalla gör det unikt', namn: 'Fråga Thorkel om stället', status: 'ide', text: 'Svallas guide svarar på frågor om just det här stället.', kravs: 'Thorkel finns, frågan på platssidan är ny.' },
  { id: 'stampel', grupp: 'Svalla gör det unikt', namn: 'Stämpel i Min skärgård', status: 'ide', text: 'Den som besöker får en stämpel.', kravs: 'Bygger på Logga ett besök.' },
  { id: 'forman', grupp: 'Partner och förmåner', namn: 'Svalla-förmån', status: 'ide', text: 'Något extra till Svallas besökare, till exempel sen utcheckning.', kravs: 'Förmånerna är det vi bygger nu.' },
  { id: 'partner', grupp: 'Partner och förmåner', namn: 'Märkt som samarbetspartner', status: 'ide', text: 'En liten märkning och sedan vilket år.', kravs: 'Betalda placeringar märks alltid som reklam.' },
  { id: 'faq', grupp: 'Längst ner', namn: 'Vanliga frågor', status: 'finns', text: 'Frågor och svar om stället.' },
  { id: 'omdomen', grupp: 'Längst ner', namn: 'Omdömen', status: 'finns', text: 'Vad besökare tycker.' },
  { id: 'uppdaterad', grupp: 'Längst ner', namn: 'Senast uppdaterad', status: 'finns', text: 'När uppgifterna sågs över senast, och en länk för att rätta.' },
]
const GRUPPER = [...new Set(DELAR.map(d => d.grupp))]

const EX = {
  krog: { namn: 'Krogen vid gästhamnen', typ: 'Krog', rad: 'Fisk från trakten och sol på bryggan', knapp: 'Boka bord', menyRubrik: 'Meny', meny: ['Strömming med potatismos', 'Fisksoppa', 'Dagens från grillen'] },
  hotell: { namn: 'Hotellet vid hamnen', typ: 'Hotell', rad: 'Rum med havsutsikt, frukost på bryggan', knapp: 'Boka rum', menyRubrik: 'Rum', meny: ['Dubbelrum med havsutsikt', 'Familjerum', 'Svit under taket'] },
}

export default function Verksamhet({ bilder }: { bilder: VBild[] }) {
  const [typ, setTyp] = useState<Typ>('krog')
  const [pa, setPa] = useState<Record<string, boolean>>(() => Object.fromEntries(DELAR.map(d => [d.id, true])))
  const [filter, setFilter] = useState<'alla' | Status>('alla')
  const ex = EX[typ]
  const visas = (id: string) => pa[id]
  const antal = useMemo(() => ({ finns: DELAR.filter(d => d.status === 'finns').length, ide: DELAR.filter(d => d.status === 'ide').length }), [])
  const sattAlla = (v: boolean, s?: Status) => setPa(p => Object.fromEntries(DELAR.map(d => [d.id, s ? (d.status === s ? v : (p[d.id] ?? false)) : v])))
  const forsta = bilder.find(Boolean) ?? null

  return (
    <div className="vk">
      <style>{CSS}</style>
      <div className="vk-varning">Förhandsvisning. Verksamheten och allt om den är exempel.</div>

      <header className="vk-topp">
        <Link href="/" aria-label="Svalla, till startsidan"><SvallaLogo height={22} color="#0d2440" /></Link>
      </header>

      <section className="vk-intro">
        <small>För Claes och Thomas</small>
        <h1>Allt som kan finnas på en verksamhetssida</h1>
        <p>{DELAR.length} delar en krog eller ett hotell kan ha på Svalla. {antal.finns} finns redan på våra platssidor, {antal.ide} är idéer. Slå av och på, så ser ni direkt i telefonen hur sidan blir.</p>
        <div className="vk-val">
          <div className="vk-seg" role="group" aria-label="Typ av verksamhet">
            <button type="button" className={typ === 'krog' ? 'pa' : ''} onClick={() => setTyp('krog')}>Krog</button>
            <button type="button" className={typ === 'hotell' ? 'pa' : ''} onClick={() => setTyp('hotell')}>Hotell</button>
          </div>
          <div className="vk-seg" role="group" aria-label="Visa">
            <button type="button" className={filter === 'alla' ? 'pa' : ''} onClick={() => setFilter('alla')}>Alla</button>
            <button type="button" className={filter === 'finns' ? 'pa' : ''} onClick={() => setFilter('finns')}>Finns redan</button>
            <button type="button" className={filter === 'ide' ? 'pa' : ''} onClick={() => setFilter('ide')}>Idéer</button>
          </div>
          <div className="vk-snabb">
            <button type="button" onClick={() => sattAlla(true)}>Slå på alla</button>
            <button type="button" onClick={() => sattAlla(false, 'ide')}>Bara det som finns</button>
          </div>
        </div>
      </section>

      <div className="vk-yta">
        <div className="vk-lista">
          {GRUPPER.map(g => {
            const delar = DELAR.filter(d => d.grupp === g && (filter === 'alla' || d.status === filter))
            if (!delar.length) return null
            return (
              <section key={g} className="vk-grupp">
                <h2>{g}</h2>
                {delar.map(d => (
                  <label key={d.id} className={pa[d.id] ? 'vk-del pa' : 'vk-del'}>
                    <input type="checkbox" checked={pa[d.id]} onChange={e => setPa(p => ({ ...p, [d.id]: e.target.checked }))} />
                    <span className="vk-del-text">
                      <span className="vk-del-rad"><b>{d.namn}</b><em className={d.status}>{d.status === 'finns' ? 'Finns redan' : 'Idé'}</em></span>
                      <span>{d.text}</span>
                      {d.kravs && <small>{d.kravs}</small>}
                    </span>
                  </label>
                ))}
              </section>
            )
          })}
        </div>

        <div className="vk-telefon-plats">
          <div className="vk-telefon">
            <div className="vk-skarm">
              <div className="vk-inne">
                {visas('galleri') ? (
                  <div className="vk-galleri">
                    {bilder.filter(Boolean).slice(0, 3).map((b, i) => <div key={i} className="vk-gbild" style={{ backgroundImage: `url('${b!.url}')` }} />)}
                    <span className="vk-ex">Exempel</span>
                    {visas('dela') && <span className="vk-ikoner"><i>↗</i><i>♡</i></span>}
                  </div>
                ) : <div className="vk-tomtopp">{visas('dela') && <span className="vk-ikoner mork"><i>↗</i><i>♡</i></span>}</div>}

                {visas('video') && <div className="vk-video" style={forsta ? { backgroundImage: `linear-gradient(rgba(8,24,38,.35),rgba(8,24,38,.6)),url('${forsta.url}')` } : undefined}><span>▶</span><b>Historien bakom stället</b></div>}
                {visas('partner') && <div className="vk-partnermark">Samarbetspartner sedan 2027 · Exempel</div>}
                {visas('huvud') && (
                  <div className="vk-huvud">
                    <small>{ex.typ} · Möja</small>
                    <b>{ex.namn}</b>
                    <span>{ex.rad} · ●●○</span>
                  </div>
                )}
                {visas('speciellt') && <p className="vk-speciellt">Här lägger båten till precis nedanför terrassen.</p>}
                {visas('taggar') && <div className="vk-taggar"><span>Utsikt</span><span>Brygga</span><span>Barnvänligt</span></div>}
                {visas('forman') && <div className="vk-forman"><i>✦</i><span><b>{typ === 'krog' ? 'Fri kaffe till lunchen' : 'Sen utcheckning'}</b><small>För Svallas besökare</small></span><em>Svalla-förmån</em></div>}
                {visas('beskrivning') && <p className="vk-text">En kort text om stället, skriven av verksamheten själv. Vad man äter, hur det ser ut och varför man kommer tillbaka.</p>}
                {visas('instagram') && <div className="vk-insta"><span className="vk-ig">◎</span><b>Följ på Instagram</b><span>@exempel</span></div>}
                {visas('flode') && <div className="vk-flode">{bilder.filter(Boolean).slice(0, 3).map((b, i) => <div key={i} style={{ backgroundImage: `url('${b!.url}')` }} />)}</div>}
                {visas('meny') && (
                  <div className="vk-kort">
                    <h3>{ex.menyRubrik}</h3>
                    {ex.meny.map(m => <div key={m} className="vk-rad">{m}</div>)}
                  </div>
                )}
                {visas('evenemang') && <div className="vk-kort"><h3>Evenemang</h3><div className="vk-rad">Säsongsstart med musik på bryggan</div><div className="vk-rad">Kräftskiva i augusti</div></div>}
                {visas('egenskaper') && <div className="vk-kort"><h3>Egenskaper</h3><div className="vk-chips"><span>Uteservering</span><span>Brygga</span><span>Säsong maj till september</span></div></div>}
                {visas('kontakt') && <div className="vk-kort"><h3>Kontakt</h3><div className="vk-rad">Hemsida</div><div className="vk-rad">Telefon</div><div className="vk-rad">Adress vid gästhamnen</div><div className="vk-rad">Öppettider</div></div>}
                {visas('karta') && <div className="vk-karta"><span className="vk-pin" /><em>Vägbeskrivning</em></div>}
                {visas('baten') && <div className="vk-kort"><h3>Båten hit</h3><div className="vk-rad">Närmaste brygga och båtlinje</div></div>}
                {visas('gasthamn') && <div className="vk-kort"><h3>Egen båt</h3><div className="vk-rad">Gästhamnen ligger vid stället</div></div>}
                {visas('planera') && <div className="vk-knapprad"><span>Planera en tur hit</span></div>}
                {visas('logga') && <div className="vk-knapprad ljus"><span>Logga ett besök</span></div>}
                {visas('stampel') && <div className="vk-stampel"><span>SVALLA<b>Möja</b>BESÖKT</span></div>}
                {visas('thorkel') && <div className="vk-thorkel"><span className="fraga">Har ni vegetariskt?</span><span className="svar">Thorkel svarar utifrån det verksamheten har lagt in.</span></div>}
                {visas('besok') && <div className="vk-kort"><h3>Senaste besök</h3><div className="vk-rad">En tur förbi Möja</div></div>}
                {visas('rutter') && <div className="vk-kort"><h3>Rutter som passar</h3><div className="vk-rad">Runt Möja</div></div>}
                {visas('narheten') && <div className="vk-kort"><h3>I närheten</h3><div className="vk-rad">Möjas ösida</div><div className="vk-rad">Badplats i närheten</div></div>}
                {visas('faq') && <div className="vk-kort"><h3>Vanliga frågor</h3><div className="vk-rad">Behöver man boka?</div></div>}
                {visas('omdomen') && <div className="vk-kort"><h3>Omdömen</h3><div className="vk-rad">Omdömen från besökare visas här</div></div>}
                {visas('uppdaterad') && <p className="vk-uppdaterad">Senast uppdaterad · Rätta en uppgift</p>}
                <div className="vk-luft" />
              </div>
              {visas('boka') && <div className="vk-bokabar"><span>{ex.knapp}</span></div>}
            </div>
          </div>
          <p className="vk-under">Exempel. {Object.values(pa).filter(Boolean).length} av {DELAR.length} delar påslagna.</p>
          {forsta && <p className="vk-foto">Foton: {bilder.filter(Boolean).slice(0, 3).map(b => `${b!.fotograf}, ${b!.licens}`).join(' · ')}</p>}
        </div>
      </div>

      <section className="vk-claes" id="partnerskap">
        <small>Från Claes · Partnerskap och affärsmodell</small>
        <h2>Det som händer runt sidan</h2>
        <p className="vk-claes-ingress">Inte delar på sidan, utan sättet Svalla håller ihop med verksamheterna. Allt här är idéer, inget är bestämt.</p>
        <div className="vk-claes-grid">
          <article>
            <em>Idé</em>
            <b>Registrera sig som partner</b>
            <p>Verksamheten skapar ett partnerkonto. Då har Svalla en kontakt att skriva till, och verksamheten en plats att uppdatera sin sida.</p>
          </article>
          <article>
            <em>Idé</em>
            <b>Partnerbrev varje månad</b>
            <p>Ett brev inför varje månad, till exempel:</p>
            <ul>
              <li>Hej, här kommer partnerbrevet inför juni</li>
              <li>Nya samarbetspartners förra månaden, med en lista</li>
              <li>Grattis till den verksamhet vars förmån hämtades flest gånger</li>
              <li>Ett nytt erbjudande att testa</li>
              <li>Rabatt på toppplaceringen om man bokar före ett datum, till exempel inför midsommar</li>
            </ul>
            <small>Bara siffror vi faktiskt mäter, som hämtade förmåner. Brevet går till partner som sagt ja till det.</small>
          </article>
          <article>
            <em>Idé</em>
            <b>Freemium: Svalla Bas och Svalla Premium</b>
            <p>Det mest grundläggande gratis. Mer värde kostar ett symboliskt belopp, till exempel några hundralappar. Det ger en intäkt och visar att Svalla är proffs och vågar ta betalt.</p>
            <small>Vad som ingår i Premium och vad det kostar är inte bestämt.</small>
          </article>
          <article>
            <em>Idé</em>
            <b>Kampanj före säsongen</b>
            <p>Halva priset på Svalla Premium fram till sista april, så att verksamheterna fyller sina sidor innan säsongen drar igång på riktigt.</p>
          </article>
        </div>
      </section>
    </div>
  )
}

const CSS = `
.vk{background:#f3ece0;color:#192830;font-family:Inter,system-ui,sans-serif;padding-bottom:72px;overflow-x:clip}
.vk h1,.vk h2,.vk h3{font-family:'Playfair Display',Georgia,serif;font-weight:400;color:#0d2440}
.vk-varning{position:sticky;top:0;z-index:30;background:#fbe8c0;color:#7a4a10;font-size:13px;font-weight:600;text-align:center;padding:9px 16px}
.vk-topp{max-width:1200px;margin:0 auto;padding:18px 24px 0}
.vk-intro{max-width:1200px;margin:0 auto;padding:28px 24px 8px}
.vk-intro small{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#b5591a}
.vk-intro h1{font-size:clamp(32px,5vw,56px);line-height:1.05;margin:10px 0 12px;max-width:760px}
.vk-intro p{font-size:16.5px;line-height:1.6;color:#3d5664;max-width:640px;margin:0 0 20px}
.vk-val{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.vk-seg{display:inline-flex;background:#fffdf8;border:1px solid rgba(150,110,60,.18);border-radius:999px;padding:3px}
.vk-seg button,.vk-snabb button{border:none;background:none;font:inherit;font-size:13.5px;font-weight:600;color:#3d5664;padding:7px 14px;border-radius:999px;cursor:pointer}
.vk-seg button.pa{background:#0d2440;color:#fff}
.vk-snabb{display:inline-flex;gap:6px}
.vk-snabb button{background:#fffdf8;border:1px solid rgba(150,110,60,.18)}
.vk-yta{max-width:1200px;margin:0 auto;padding:24px 24px 0;display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:40px;align-items:start}
.vk-grupp{margin-bottom:22px}
.vk-grupp h2{font-size:22px;margin:0 0 10px}
.vk-del{display:flex;gap:12px;align-items:flex-start;background:#fffdf8;border:1px solid rgba(150,110,60,.14);border-radius:16px;padding:14px 16px;margin-bottom:8px;cursor:pointer;opacity:.6;transition:opacity .15s,border-color .15s}
.vk-del.pa{opacity:1;border-color:rgba(13,36,64,.22)}
.vk-del input{margin-top:3px;width:18px;height:18px;accent-color:#0d2440;flex-shrink:0}
.vk-del-text{display:flex;flex-direction:column;gap:3px;min-width:0;font-size:14px;line-height:1.5;color:#3d5664}
.vk-del-rad{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px}
.vk-del-rad b{font-size:15px;color:#0d2440}
.vk-del-rad em{font-style:normal;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-radius:999px;padding:3px 9px}
.vk-del-rad em.finns{background:#dff0e6;color:#1e6b4f}
.vk-del-rad em.ide{background:#fbe8c0;color:#7a4a10}
.vk-del-text small{font-size:12.5px;color:#6b7f88}
.vk-telefon-plats{position:sticky;top:56px}
.vk-telefon{background:#0d2440;border-radius:46px;padding:12px;box-shadow:0 24px 60px rgba(13,36,64,.28)}
.vk-skarm{position:relative;background:#fffdf8;border-radius:36px;overflow:hidden;height:min(720px,calc(100vh - 150px));min-height:520px}
.vk-inne{height:100%;overflow-y:auto;scrollbar-width:none}
.vk-inne::-webkit-scrollbar{display:none}
.vk-galleri{position:relative;height:210px;display:grid;grid-template-columns:2fr 1fr;grid-template-rows:1fr 1fr;gap:3px}
.vk-gbild{background-size:cover;background-position:center}
.vk-gbild:first-child{grid-row:1/3}
.vk-tomtopp{position:relative;height:48px}
.vk-ex{position:absolute;left:12px;top:12px;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:#fbe8c0;color:#7a4a10;border-radius:999px;padding:3px 8px}
.vk-ikoner{position:absolute;right:12px;top:10px;display:flex;gap:6px}
.vk-ikoner i{font-style:normal;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.9);color:#0d2440;display:flex;align-items:center;justify-content:center;font-size:14px}
.vk-ikoner.mork i{background:#f3ece0}
.vk-video{margin:12px 14px 0;height:120px;border-radius:16px;background:#0d2440 center/cover;color:#fff;display:flex;flex-direction:column;justify-content:flex-end;padding:12px;gap:4px}
.vk-video span{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.9);color:#0d2440;display:flex;align-items:center;justify-content:center;font-size:13px}
.vk-video b{font-size:14px}
.vk-partnermark{margin:12px 14px 0;font-size:11px;font-weight:700;color:#1e6b4f;background:#dff0e6;border-radius:999px;padding:5px 10px;display:inline-block}
.vk-huvud{padding:14px 16px 4px;display:flex;flex-direction:column;gap:3px}
.vk-huvud small{font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#b5591a}
.vk-huvud b{font-family:'Playfair Display',Georgia,serif;font-weight:400;font-size:25px;color:#0d2440;line-height:1.1}
.vk-huvud span{font-size:13px;color:#52717f}
.vk-speciellt{margin:8px 16px 0;font-size:13.5px;line-height:1.45;color:#0d2440;font-style:italic}
.vk-taggar,.vk-chips{display:flex;flex-wrap:wrap;gap:5px;margin:10px 16px 0}
.vk-taggar span,.vk-chips span{font-size:11.5px;background:#f3ece0;color:#3d5664;border-radius:999px;padding:4px 9px}
.vk-chips{margin:0}
.vk-forman{margin:12px 14px 0;display:grid;grid-template-columns:28px minmax(0,1fr);gap:4px 10px;align-items:center;background:#f3ece0;border-radius:14px;padding:10px 12px}
.vk-forman i{font-style:normal;width:28px;height:28px;border-radius:50%;background:#fde9c8;color:#b5591a;display:flex;align-items:center;justify-content:center}
.vk-forman span{display:flex;flex-direction:column;min-width:0}
.vk-forman b{font-size:13.5px;color:#0d2440}
.vk-forman small{font-size:11.5px;color:#52717f}
.vk-forman em{grid-column:2;justify-self:start;font-style:normal;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1e6b4f;background:#dff0e6;border-radius:999px;padding:3px 8px}
.vk-text{margin:12px 16px 0;font-size:13px;line-height:1.55;color:#3d5664}
.vk-insta{margin:12px 14px 0;display:flex;align-items:center;gap:8px;border:1px solid rgba(13,36,64,.15);border-radius:14px;padding:10px 12px;font-size:13px}
.vk-insta b{color:#0d2440}
.vk-insta span:last-child{margin-left:auto;color:#6b7f88;font-size:12px}
.vk-ig{width:26px;height:26px;border-radius:8px;background:#c8642a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px}
.vk-flode{margin:8px 14px 0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px}
.vk-flode div{aspect-ratio:1;border-radius:8px;background-size:cover;background-position:center}
.vk-kort{margin:12px 14px 0;background:#fff;border:1px solid rgba(150,110,60,.14);border-radius:14px;padding:10px 12px}
.vk-kort h3{font-size:16px;margin:0 0 6px}
.vk-rad{font-size:12.5px;color:#3d5664;padding:6px 0;border-top:1px solid rgba(150,110,60,.12)}
.vk-rad:first-of-type{border-top:none}
.vk-karta{margin:12px 14px 0;height:110px;border-radius:14px;background:radial-gradient(ellipse at 40% 50%,#cfe3ea,#a8c9d6);position:relative}
.vk-pin{position:absolute;left:46%;top:42%;width:16px;height:16px;border-radius:50%;background:#c8642a;border:3px solid #fff}
.vk-karta em{position:absolute;right:10px;bottom:10px;font-style:normal;font-size:11.5px;font-weight:700;background:#0d2440;color:#fff;border-radius:999px;padding:5px 10px}
.vk-knapprad{margin:12px 14px 0}
.vk-knapprad span{display:block;text-align:center;font-size:13.5px;font-weight:700;background:#0d2440;color:#fff;border-radius:999px;padding:10px}
.vk-knapprad.ljus span{background:#fff;color:#0d2440;border:1.5px solid rgba(13,36,64,.2)}
.vk-stampel{margin:14px 0 0;display:flex;justify-content:center}
.vk-stampel span{width:96px;height:96px;border-radius:50%;border:2px solid #b5591a;color:#b5591a;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:8.5px;font-weight:700;letter-spacing:.14em;transform:rotate(-8deg)}
.vk-stampel b{font-family:'Playfair Display',Georgia,serif;font-size:17px;letter-spacing:0;font-weight:400}
.vk-thorkel{margin:12px 14px 0;background:#0d2440;border-radius:14px;padding:10px;display:flex;flex-direction:column;gap:6px}
.vk-thorkel span{font-size:12px;line-height:1.4;border-radius:12px;padding:7px 10px;max-width:88%}
.vk-thorkel .fraga{align-self:flex-end;background:#c8642a;color:#fff}
.vk-thorkel .svar{align-self:flex-start;background:#fffdf8;color:#192830}
.vk-uppdaterad{margin:12px 16px 0;font-size:11px;color:#6b7f88}
.vk-luft{height:76px}
.vk-bokabar{position:absolute;left:0;right:0;bottom:0;padding:10px 14px 14px;background:linear-gradient(rgba(255,253,248,0),#fffdf8 35%)}
.vk-bokabar span{display:block;text-align:center;font-size:14px;font-weight:700;background:#c8642a;color:#fff;border-radius:999px;padding:12px;box-shadow:0 6px 18px rgba(200,100,42,.35)}
.vk-under{margin:12px 0 0;text-align:center;font-size:12.5px;color:#6b7f88}
.vk-foto{margin:4px 0 0;text-align:center;font-size:10.5px;color:#8a9aa2}
.vk-claes{max-width:1200px;margin:0 auto;padding:64px 24px 0;scroll-margin-top:50px}
.vk-claes>small{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#b5591a}
.vk-claes h2{font-size:clamp(28px,4vw,42px);margin:8px 0 8px}
.vk-claes-ingress{font-size:16px;line-height:1.6;color:#3d5664;margin:0 0 20px;max-width:640px}
.vk-claes-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.vk-claes-grid article{background:#fffdf8;border:1px solid rgba(150,110,60,.16);border-radius:18px;padding:20px;display:flex;flex-direction:column;gap:6px}
.vk-claes-grid em{align-self:flex-start;font-style:normal;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:#fbe8c0;color:#7a4a10;border-radius:999px;padding:3px 9px}
.vk-claes-grid b{font-family:'Playfair Display',Georgia,serif;font-weight:400;font-size:21px;color:#0d2440}
.vk-claes-grid p{margin:0;font-size:14.5px;line-height:1.55;color:#3d5664}
.vk-claes-grid ul{margin:4px 0 0;padding-left:18px;font-size:14px;line-height:1.55;color:#3d5664}
.vk-claes-grid small{font-size:12.5px;color:#6b7f88;margin-top:4px}
@media (max-width:900px){
  .vk-yta{grid-template-columns:minmax(0,1fr);gap:24px}
  .vk-telefon-plats{position:static;order:-1;max-width:360px;width:100%;justify-self:center}
  .vk-skarm{height:620px}
  .vk-claes-grid{grid-template-columns:minmax(0,1fr)}
}
@media (max-width:640px){
  .vk-intro,.vk-yta,.vk-topp{padding-left:16px;padding-right:16px}
  .vk-skarm{height:560px;min-height:0}
}
`
