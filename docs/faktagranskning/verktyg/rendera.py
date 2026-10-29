"""Renderar ösidor i Chromium som en besökare ser dem: öppnar alla <details> och
klickar "Visa fler"/"Visa alla"/"Läs mer"-knappar, tar sedan synlig text ur <main>,
metadata och sidans egen JSON-LD (sajtgemensam Organization/WebSite utelämnas).
Användning: python3 -I rendera.py UTMAPP slug1 slug2 ...   (undersidorna tas med)"""
import asyncio, json, sys, os
from playwright.async_api import async_playwright
UNDER = ['', 'komma-dit', 'restauranger', 'boende', 'bad', 'hamnar', 'med-barn', 'aktiviteter', 'hantverkare']
OPPNA = """() => { document.querySelectorAll('details').forEach(d => d.open = true);
  const re = /^(visa (fler|alla|mer|hela)|läs (mer|hela))/i; let n = 0;
  document.querySelectorAll('button').forEach(b => { if (re.test((b.innerText||'').trim())) { b.click(); n++ } });
  return n }"""
HAMTA = """() => { const m = n => (document.querySelector(`meta[name="${n}"]`)||{}).content || '';
  const p = n => (document.querySelector(`meta[property="${n}"]`)||{}).content || '';
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { return JSON.parse(s.textContent) } catch (e) { return s.textContent } });
  const main = document.querySelector('main');
  return { meta: { title: document.title, description: m('description'), 'og:title': p('og:title'), 'og:description': p('og:description') }, ld, text: (main || document.body).innerText, harMain: !!main } }"""
def sajtgemensam(x):
    return isinstance(x, dict) and x.get('@type') in ('Organization', 'WebSite')
async def en(ctx, ut, slug, sub, sem):
    url = f"https://svalla.se/o/{slug}" + (f"/{sub}" if sub else '')
    namn = slug + (f"__{sub}" if sub else '')
    async with sem:
        for forsok in (1, 2):
            pg = await ctx.new_page()
            try:
                r = await pg.goto(url, wait_until='networkidle', timeout=60000)
                await pg.wait_for_timeout(800)
                klick = await pg.evaluate(OPPNA); await pg.wait_for_timeout(600)
                klick += await pg.evaluate(OPPNA); await pg.wait_for_timeout(400)
                d = await pg.evaluate(HAMTA)
                ld = [x for x in d['ld'] if not sajtgemensam(x)]
                rader = [l.strip() for l in d['text'].split('\n') if l.strip()]
                with open(os.path.join(ut, namn + '.txt'), 'w') as f:
                    f.write(f"=== URL === {url} (HTTP {r.status if r else '?'}, renderad i Chromium, {klick} knappar öppnade)\n")
                    f.write('=== META ===\n' + json.dumps(d['meta'], ensure_ascii=False, indent=1) + '\n')
                    f.write('=== JSON-LD (sidans egen) ===\n' + json.dumps(ld, ensure_ascii=False, indent=1) + '\n')
                    f.write('=== SYNLIG TEXT ===\n' + '\n'.join(rader) + '\n')
                await pg.close()
                return namn, r.status if r else 0, len(' '.join(rader).split()), klick
            except Exception as e:
                await pg.close()
                if forsok == 2: return namn, -1, 0, str(e)[:80]
async def main():
    ut = sys.argv[1]; os.makedirs(ut, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(locale='sv-SE', viewport={'width': 1280, 'height': 900})
        sem = asyncio.Semaphore(5)
        res = await asyncio.gather(*[en(ctx, ut, s, u, sem) for s in sys.argv[2:] for u in UNDER])
        await b.close()
    for r in sorted(res): print(*r, sep='\t')
asyncio.run(main())
