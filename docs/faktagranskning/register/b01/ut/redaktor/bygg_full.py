"""Full kontroll av batch 01:s oförändrade KORREKT-rader (regeln: två fynd eller fler i stickprovet).
Urvalet är detsamma som stickprovets pool i kontrollunderlag.py: dom KORREKT, åtgärd inte ändrad,
inte högrisk. Stickprovets 30 rader är redan kontrollerade och tas bort. Raderna grupperas efter
första källans URL och packas i paket om högst MAX rader, så att varje källa läses en gång."""
import sys, csv, re, os, collections
csv.field_size_limit(10**9)
sys.path.insert(0, '/home/claude/svalla-app/docs/faktagranskning/verktyg')
REG = '/home/claude/svalla-app/docs/faktagranskning/register/b01'
UT = '/tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/kontroll'
MAX = int(sys.argv[1]) if len(sys.argv) > 1 else 110
src = open('/home/claude/svalla-app/docs/faktagranskning/verktyg/kontrollunderlag.py', encoding='utf-8').read()
HOGRISK = re.compile(re.search(r"HOGRISK = re.compile\(\n?\s*(r'.*?'\s*(?:\n\s*r'.*?'\s*)*),\s*\n?\s*re.I\)", src, re.S).group(1).replace("'\n", "' ").replace("r'", "").replace("'", "").replace("\n", "").replace("    ", ""), re.I)
ANDRAD = {'RÄTTA', 'PRECISERA', 'FRÅNVARO', 'STRYK+KOMPENSERA', 'NY'}
stick = set()
import glob
for nf in glob.glob(f'{UT}/*.nyckel.tsv'):
    if os.path.basename(nf).startswith('full-'): continue
    for r in csv.DictReader(open(nf), delimiter='\t'):
        rid = (r.get('register-id') or '')
        stick.add(rid.split(':', 1)[1] if ':' in rid else rid)
pool = []
for f in sorted(os.listdir(REG)):
    if not f.endswith('.tsv'): continue
    for r in list(csv.reader(open(os.path.join(REG, f), encoding='utf-8'), delimiter='\t', quoting=csv.QUOTE_NONE))[1:]:
        rid, sida, filrad, falt, pastaende, typ, _bef, dom, _ratt, kalla, citat, last, atgard, ny, _k = (r + [''] * 15)[:15]
        if atgard == 'STRYK+KOMPENSERA' or atgard in ANDRAD or dom != 'KORREKT':
            continue
        if HOGRISK.search(' '.join([sida, falt, pastaende])):
            continue
        if rid in stick:
            continue
        pool.append((rid, sida, filrad, pastaende, kalla, citat, last, 'nej'))
def nyckel(p):
    u = (p[4].split(';')[0].strip() or '(ingen källa)')
    u = re.sub(r'#.*$', '', u)
    return u
grupper = collections.defaultdict(list)
for p in pool:
    grupper[nyckel(p)].append(p)
# Stora grupper först; delas i bitar om de är större än MAX
bitar = []
for url, g in sorted(grupper.items(), key=lambda kv: -len(kv[1])):
    g.sort(key=lambda p: (p[1], p[0]))
    for i in range(0, len(g), MAX):
        bitar.append((url, g[i:i + MAX]))
paket = []
for url, g in bitar:   # first fit decreasing
    for pk in paket:
        if sum(len(x) for _, x in pk) + len(g) <= MAX:
            pk.append((url, g)); break
    else:
        paket.append([(url, g)])
print('pool', len(pool), 'källor', len(grupper), 'paket', len(paket))
print('största källor:', [(u[:70], len(g)) for u, g in sorted(grupper.items(), key=lambda kv: -len(kv[1]))[:12]])
for n, pk in enumerate(paket, 1):
    slug = f'full-{n:02d}'
    with open(f'{UT}/{slug}.underlag.tsv', 'w') as fu, open(f'{UT}/{slug}.nyckel.tsv', 'w') as fn, open(f'{UT}/{slug}.strukna.tsv', 'w') as fs:
        fu.write('kid\tsida\tfil:rad\ttext\tkälla (URL)\tcitat\tläst\tny mening\n')
        fn.write('kid\tregister-id\turval\n')
        fs.write('kid\tsida\tfil:rad\tstruken text\n')
        i = 0
        for url, g in pk:
            for p in g:
                i += 1
                kid = f'f{n:02d}-k{i:03d}'
                fu.write('\t'.join([kid] + [x.replace('\t', ' ').replace('\n', ' ') for x in p[1:]]) + '\n')
                fn.write(f'{kid}\t{p[0]}\tALLA-KORREKT\n')
    print(slug, sum(len(g) for _, g in pk), 'rader,', len(pk), 'källor')
