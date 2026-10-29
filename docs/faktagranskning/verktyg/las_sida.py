"""Läser en sida i riktig webbläsare (Chromium) och skriver ut synlig text.
Användning: python3 las_sida.py URL [sökord ...]  -> skriver text, eller rader som innehåller sökorden."""
import sys
from playwright.sync_api import sync_playwright
url=sys.argv[1]; sok=[s.lower() for s in sys.argv[2:]]
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_page(locale='sv-SE')
    r=pg.goto(url,wait_until='networkidle',timeout=60000)
    pg.wait_for_timeout(1500)
    for knapp in ['Godkänn','Acceptera','Tillåt alla','Accept']:
        try: pg.get_by_role('button',name=knapp).first.click(timeout=800)
        except Exception: pass
    t=pg.inner_text('body')
    print(f'STATUS {r.status if r else "?"} SLUTURL {pg.url}')
    if sok:
        for rad in t.split('\n'):
            if any(s in rad.lower() for s in sok): print(rad.strip())
    else: print(t)
    b.close()
