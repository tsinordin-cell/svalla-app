"""Läser en sida i riktig webbläsare (Chromium) och skriver ut det en besökare
kan se, inklusive det som ligger bakom utfällbara listor och ikoner.

Användning: python3 -I las_sida.py URL [sökord ...]
  Utan sökord: hela texten. Med sökord: bara raderna som innehåller något av dem.

Gör i ordning: väntar in sidan, godkänner kakdialogen, öppnar alla <details>,
klickar "Visa fler/alla/mer/hela", "Läs mer/hela" och knappar med
aria-expanded="false" (två varv), och skriver sedan ut
  1. synlig text (innerText),
  2. ATTRIBUT: alt-, title- och aria-label-texter (ikoner som bockar för el
     och vatten har ofta bara sådana),
  3. DOLD TEXT: text som finns i sidan men inte syns (stängda flikar o.d.).
"""
import sys
from playwright.sync_api import sync_playwright

OPPNA = """() => { document.querySelectorAll('details').forEach(d => d.open = true);
  const re = /^(visa (fler|alla|mer|hela)|läs (mer|hela)|show (more|all))/i; let n = 0;
  document.querySelectorAll('button, [role=button], a[aria-expanded="false"]').forEach(b => {
    const t = (b.innerText || '').trim();
    if (re.test(t) || b.getAttribute('aria-expanded') === 'false') { try { b.click(); n++ } catch (e) {} } });
  return n }"""
ATTRIBUT = """() => { const ut = new Set();
  document.querySelectorAll('[alt], [title], [aria-label]').forEach(e => {
    for (const a of ['alt', 'title', 'aria-label']) { const v = (e.getAttribute(a) || '').trim(); if (v) ut.add(v) } });
  return [...ut] }"""

url = sys.argv[1]
sok = [s.lower() for s in sys.argv[2:]]
with sync_playwright() as p:
    b = p.chromium.launch(args=['--disable-http2'])  # proxyn återställer vissa HTTP/2-anslutningar (MÄTT 2026-10-29)
    pg = b.new_page(locale='sv-SE')
    r = pg.goto(url, wait_until='domcontentloaded', timeout=60000)
    try:
        pg.wait_for_load_state('networkidle', timeout=15000)
    except Exception:
        pass
    pg.wait_for_timeout(1200)
    for knapp in ['Godkänn alla', 'Acceptera alla', 'Godkänn', 'Acceptera', 'Tillåt alla', 'Accept all', 'Accept']:
        try:
            pg.get_by_role('button', name=knapp).first.click(timeout=500)
            pg.wait_for_timeout(400)
            break
        except Exception:
            pass
    klick = 0
    for _ in range(2):
        try:
            klick += pg.evaluate(OPPNA)
        except Exception:
            pass
        pg.wait_for_timeout(700)
    synlig = pg.inner_text('body')
    attribut = pg.evaluate(ATTRIBUT)
    allt = pg.evaluate('() => document.body.textContent')
    synliga_rader = set(l.strip() for l in synlig.split('\n') if l.strip())
    dold = [l.strip() for l in allt.split('\n') if l.strip() and l.strip() not in synliga_rader and len(l.strip()) > 2]
    print(f'STATUS {r.status if r else "?"} SLUTURL {pg.url} (öppnade {klick} knappar)')
    delar = [('', synlig.split('\n')), ('=== ATTRIBUT ===', attribut), ('=== DOLD TEXT ===', dold)]
    for rubrik, rader in delar:
        if rubrik:
            print(rubrik)
        for rad in rader:
            rad = rad.strip()
            if rad and (not sok or any(s in rad.lower() for s in sok)):
                print(rad)
    b.close()
