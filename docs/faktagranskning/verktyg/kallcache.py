"""Källcache och mekanisk citatkontroll för faktagranskningen.

Användning:
  python3 -I kallcache.py CACHEMAPP UTMAPP register1.tsv [register2.tsv ...]

För varje rad i registren delas kolumnen "befintlig källa" upp i par av
(URL, citat). Varje URL hämtas EN gång till CACHEMAPP: först med curl (PDF via
pdftotext), och med Chromium när curl inte hittar citatet, sidan är nästan
tom eller svarar fel. Sedan kontrolleras om varje citat finns ordagrant på
sidan (blanksteg, citattecken och tankstreck normaliseras, inget annat).

Ut:
  UTMAPP/<slug>.forkontroll.tsv, en rad per (register-id, URL, citat):
    id | url | citat | hittat | http | slutadress | startsida | metod | läst
    hittat: ja (ordagrant) / skiftläge (bara med annan versalisering) /
            nej / inget-citat (KÄLLA-raden saknar citat) / ingen-sida
  UTMAPP/<slug>.utan-kalla.txt, id för rader utan någon KÄLLA-URL
  CACHEMAPP/index.json, per URL: HTTP-status, slutadress, metod, läsdatum

Detta avgör INTE om källan stöder påståendet. Det gör Granskaren. Ett "ja"
betyder bara att citatet står på sidan i dag; ett "nej" är inget fynd förrän
någon läst sidan (ARBETSREGLER, Kontrollsteget).
"""
import sys, os, re, csv, json, hashlib, subprocess, unicodedata, datetime, collections
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse
from bs4 import BeautifulSoup

URL_RE = re.compile(r'https?://[^\s"”“„)>\]]+')
CIT_RE = re.compile(r'["“„]([^"“”„]{4,}?)["”“]')
LAST = datetime.date.today().isoformat()
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'


def norm(s):
    s = unicodedata.normalize('NFKC', s).replace('­', '')
    s = re.sub(r'[‘’‚′`´]', "'", s)
    s = re.sub(r'[“”„″«»]', '"', s)
    s = re.sub(r'[‐-―−]', '-', s)
    return re.sub(r'\s+', ' ', s).strip()


def kalla_par(falt):
    """Lista av (url, citat) ur kolumnen befintlig källa. Citat utan URL före
    sig knyts till radens första URL."""
    par = []
    for rad in falt.split(' || '):
        if not re.search(r'KÄLLA', rad, re.I):
            continue
        urls = [(m.start(), m.group(0).rstrip('.,;:')) for m in URL_RE.finditer(rad)]
        if not urls:
            continue
        citat = [(m.start(), m.group(1)) for m in CIT_RE.finditer(rad)]
        anvanda = set()
        for pos, c in citat:
            fore = [u for p, u in urls if p < pos]
            u = fore[-1] if fore else urls[0][1]
            par.append((u, c))
            anvanda.add(u)
        for _, u in urls:
            if u not in anvanda:
                par.append((u, ''))
    return par


def hamta_curl(url, mapp):
    h = hashlib.sha1(url.encode()).hexdigest()[:16]
    ra = os.path.join(mapp, h + '.raw')
    r = subprocess.run(['curl', '-sS', '-L', '--max-time', '45', '-A', UA, '-o', ra,
                        '-w', '%{http_code}\t%{content_type}\t%{url_effective}', url],
                       capture_output=True, text=True)
    if r.returncode != 0:
        return '', {'http': 0, 'slut': '', 'fel': r.stderr.strip()[:160]}
    kod, typ, slut = (r.stdout.split('\t') + ['', '', ''])[:3]
    text = ''
    try:
        if 'pdf' in typ.lower() or url.lower().split('?')[0].endswith('.pdf'):
            text = subprocess.run(['pdftotext', ra, '-'], capture_output=True, text=True).stdout
        else:
            soup = BeautifulSoup(open(ra, encoding='utf-8', errors='replace').read(), 'html.parser')
            for x in soup(['script', 'style', 'noscript']):
                x.decompose()
            text = soup.get_text('\n')
    except Exception as e:
        return '', {'http': int(kod or 0), 'slut': slut, 'fel': str(e)[:160]}
    return text, {'http': int(kod or 0), 'slut': slut, 'typ': typ}


class Webblasare:
    def __init__(self):
        self.igang = False

    def text(self, url):
        if not self.igang:
            from playwright.sync_api import sync_playwright
            self.pw = sync_playwright().start()
            self.b = self.pw.chromium.launch()
            self.ctx = self.b.new_context(locale='sv-SE', user_agent=UA)
            self.igang = True
        pg = self.ctx.new_page()
        try:
            r = pg.goto(url, wait_until='domcontentloaded', timeout=45000)
            try:
                pg.wait_for_load_state('networkidle', timeout=15000)
            except Exception:
                pass
            pg.wait_for_timeout(1500)
            for namn in ['Godkänn alla', 'Acceptera alla', 'Godkänn', 'Acceptera', 'Tillåt alla', 'Accept all', 'Accept']:
                try:
                    pg.get_by_role('button', name=namn).first.click(timeout=400)
                    pg.wait_for_timeout(500)
                    break
                except Exception:
                    pass
            pg.evaluate("() => document.querySelectorAll('details').forEach(d => d.open = true)")
            synlig = pg.inner_text('body')
            allt = pg.evaluate('() => document.body.textContent')
            return synlig + '\n' + allt, {'http': r.status if r else 0, 'slut': pg.url}
        except Exception as e:
            return '', {'http': 0, 'slut': '', 'fel': str(e)[:160]}
        finally:
            pg.close()

    def stang(self):
        if self.igang:
            self.b.close()
            self.pw.stop()


def finns(citat, tn, tl):
    if not citat:
        return 'inget-citat'
    delar = [d.strip(' .') for d in re.split(r'…|\.\.\.', norm(citat)) if len(d.strip(' .')) >= 4]
    if not delar:
        return 'inget-citat'
    if all(d in tn for d in delar):
        return 'ja'
    if all(d.lower() in tl for d in delar):
        return 'skiftläge'
    return 'nej'


def startsida(url, slut):
    a, b = urlparse(url), urlparse(slut or url)
    return 'ja' if len(a.path.strip('/')) > 0 and b.path.strip('/') == '' else ''


def main():
    cache, ut, filer = sys.argv[1], sys.argv[2], sys.argv[3:]
    os.makedirs(cache, exist_ok=True)
    os.makedirs(ut, exist_ok=True)
    rader = {}       # slug -> lista av (id, [(url, citat)])
    citat_per_url = collections.defaultdict(set)
    for f in filer:
        slug = os.path.basename(f).rsplit('.', 1)[0]
        data = list(csv.reader(open(f, encoding='utf-8'), delimiter='\t', quoting=csv.QUOTE_NONE))[1:]
        rader[slug] = [(r[0], kalla_par(r[6])) for r in data if len(r) > 6]
        for _, par in rader[slug]:
            for u, c in par:
                citat_per_url[u].add(c)
    urls = sorted(citat_per_url)
    idxp = os.path.join(cache, 'index.json')
    index = json.load(open(idxp)) if os.path.exists(idxp) else {}
    nya = [u for u in urls if not (index.get(u, {}).get('tecken') and os.path.exists(os.path.join(cache, index[u]['fil'])))]
    print(f'{len(urls)} olika URL:er, {len(nya)} nya att hämta, {len(urls) - len(nya)} redan i cachen', flush=True)

    with ThreadPoolExecutor(6) as ex:
        curl = dict(zip(nya, ex.map(lambda u: hamta_curl(u, cache), nya)))

    resultat = {}
    wb = Webblasare()
    try:
        for u in urls:
            if u in curl:
                text, meta = curl[u]
                metod = 'curl'
            else:
                i = index[u]
                text = open(os.path.join(cache, i['fil'])).read()
                meta = {'http': i['http'], 'slut': i['slut']}
                metod = i['metod']
            tn, tl = norm(text), norm(text).lower()
            utfall = {c: finns(c, tn, tl) for c in citat_per_url[u]}
            behover = meta.get('http') != 200 or len(tn) < 400 or any(v in ('nej', 'skiftläge') for v in utfall.values())
            if behover and 'chromium' not in metod and not u.lower().split('?')[0].endswith('.pdf'):
                t2, m2 = wb.text(u)
                if t2:
                    tn2 = norm(t2)
                    tl2 = tn2.lower()
                    rang = {'ja': 3, 'skiftläge': 2, 'inget-citat': 1, 'nej': 0}
                    utfall2 = {c: finns(c, tn2, tl2) for c in citat_per_url[u]}
                    if sum(rang[v] for v in utfall2.values()) >= sum(rang[v] for v in utfall.values()) or meta.get('http') != 200:
                        text, meta, utfall, metod = t2, m2, utfall2, 'chromium'
                    elif any(rang[utfall2[c]] > rang[utfall[c]] for c in utfall):
                        for c in utfall:
                            if rang[utfall2[c]] > rang[utfall[c]]:
                                utfall[c] = utfall2[c]
                        text = text + '\n' + t2
                        metod = 'curl+chromium'
            h = hashlib.sha1(u.encode()).hexdigest()[:16]
            open(os.path.join(cache, h + '.txt'), 'w').write(text)
            if not norm(text):
                utfall = {c: 'ingen-sida' for c in utfall}
            index[u] = {'fil': h + '.txt', 'http': meta.get('http'), 'slut': meta.get('slut', ''),
                        'startsida': startsida(u, meta.get('slut', '')), 'metod': metod,
                        'last': index.get(u, {}).get('last', LAST) if u not in curl else LAST,
                        'tecken': len(norm(text)), 'fel': meta.get('fel', '')}
            resultat[u] = utfall
            print(f"{metod:13} {meta.get('http')} {u[:90]} {collections.Counter(utfall.values())}", flush=True)
    finally:
        wb.stang()
    json.dump(index, open(idxp, 'w'), ensure_ascii=False, indent=1)

    for slug, lista in rader.items():
        sammanfattning = collections.Counter()
        with open(os.path.join(ut, slug + '.forkontroll.tsv'), 'w') as f:
            f.write('id\turl\tcitat\thittat\thttp\tslutadress\tstartsida\tmetod\tläst\n')
            utan = []
            for rid, par in lista:
                if not par:
                    utan.append(rid)
                    sammanfattning['rad utan KÄLLA-URL'] += 1
                    continue
                varden = []
                for u, c in par:
                    v = resultat[u].get(c, 'ingen-sida')
                    varden.append(v)
                    i = index[u]
                    f.write('\t'.join([rid, u, c.replace('\t', ' '), v, str(i['http']), i['slut'], i['startsida'], i['metod'], i['last']]) + '\n')
                if all(v == 'ja' for v in varden):
                    sammanfattning['alla citat ordagrant'] += 1
                elif any(v in ('nej', 'ingen-sida') for v in varden):
                    sammanfattning['minst ett citat saknas'] += 1
                else:
                    sammanfattning['bara URL eller skiftläge'] += 1
        open(os.path.join(ut, slug + '.utan-kalla.txt'), 'w').write('\n'.join(utan) + '\n')
        print(f'== {slug}: {dict(sammanfattning)}')
    dod = [u for u, i in index.items() if i['http'] != 200 or i['startsida']]
    print(f'URL:er som inte svarar 200 eller går till startsidan: {len(dod)}')
    for u in dod:
        print(f"   {index[u]['http']} {'STARTSIDA ' if index[u]['startsida'] else ''}{u}")


if __name__ == '__main__':
    main()
