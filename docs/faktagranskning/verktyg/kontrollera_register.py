"""Vaktens formkontroll av ett batchregister (inte av sanningen).
Användning: python3 -I kontrollera_register.py REGISTERMAPP RÅMAPP slug1 slug2 ...
Kontrollerar: rubrikraden, 15 kolumner per rad, unika id, att varje rad i
grundregistret (faktaregister.mjs --register) har minst en rad i registret
(samma fil:rad och fält), och räknar typer, källor och domäner."""
import sys, csv, re, collections, os
HUVUD = ['id','sida','fil:rad eller tabell.slug.kolumn','fält','påstående (ordagrant)','typ','befintlig källa','dom','rätt uppgift','källa (URL)','citat (ordagrant)','läst','åtgärd','ny text','kontrollant']
reg, ra, slugs = sys.argv[1], sys.argv[2], sys.argv[3:]
url_re = re.compile(r'https?://[^\s"”)>\]]+')
for s in slugs:
    p = os.path.join(reg, s + '.tsv')
    rader = list(csv.reader(open(p, encoding='utf-8'), delimiter='\t', quoting=csv.QUOTE_NONE))
    fel = []
    if rader[0] != HUVUD: fel.append('rubrikraden avviker')
    data = rader[1:]
    for i, r in enumerate(data, 2):
        if len(r) != 15: fel.append(f'rad {i}: {len(r)} kolumner')
    ids = [r[0] for r in data]
    dubbel = [k for k, v in collections.Counter(ids).items() if v > 1]
    if dubbel: fel.append(f'dubbla id: {dubbel[:5]}')
    ifyllda = sum(1 for r in data if len(r) == 15 and any(x.strip() for x in r[7:15]))
    typ = collections.Counter(r[5] for r in data if len(r) > 5)
    kalla = sum(1 for r in data if len(r) > 6 and r[6].strip())
    ursprung = collections.Counter(('render' if r[2].startswith('render') else 'restaurants' if r[2].startswith('restaurants') else 'datafil' if r[2].startswith('src/') else 'annat') for r in data if len(r) > 2)
    # täckning mot grundregistret
    tack = collections.defaultdict(set)
    for r in data:
        if len(r) > 3: tack[r[2].strip()].add(r[3].strip())
    saknas = []
    for r in list(csv.reader(open(os.path.join(ra, s + '.ra.tsv'), encoding='utf-8'), delimiter='\t', quoting=csv.QUOTE_NONE))[1:]:
        fr, falt = r[2], r[3].split('#')[0]
        if not any(f.split('#')[0].startswith(falt) or falt.startswith(f.split('#')[0]) for f in tack.get(fr, ())) :
            saknas.append(f'{fr} {r[3]}')
    urls = collections.Counter(u.rstrip('.,;') for r in data if len(r) > 6 for u in url_re.findall(r[6]))
    doman = collections.Counter(re.sub(r'^https?://(www\.)?', '', u).split('/')[0] for u in urls)
    print(f'== {s}: {len(data)} rader | typ {dict(typ)} | med befintlig källa {kalla} | {dict(ursprung)} | olika URL:er {len(urls)} | domäner {len(doman)} | ifyllda domkolumner {ifyllda}')
    print(f'   formfel: {fel or "inga"} | grundrader utan motsvarighet: {len(saknas)}' + (f' t.ex. {saknas[:4]}' if saknas else ''))
