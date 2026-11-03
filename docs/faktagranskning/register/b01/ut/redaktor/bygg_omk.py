"""Bygger ett omkontrollunderlag för Kontrollanten ur registren.
Användning: python3 -I bygg_omk.py SLUG PREFIX MD-FIL [MD-FIL ...]
Registerraderna som omarbetet ändrade läses ur MD-filerna (register-id som husaro-0018, styrso-N003).
Ut i kontroll/: SLUG.underlag.tsv, SLUG.strukna.tsv, SLUG.nyckel.tsv (nyckeln bara för Redaktören)."""
import sys, csv, re, random, os
csv.field_size_limit(10**9)
REG = '/home/claude/svalla-app/docs/faktagranskning/register/b01'
UT = '/tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/kontroll'
ANDRAD = {'RÄTTA', 'PRECISERA', 'FRÅNVARO', 'STRYK+KOMPENSERA', 'NY'}
slug, prefix, mds = sys.argv[1], sys.argv[2], sys.argv[3:]
ids = set()
for md in mds:
    ids |= set(re.findall(r'\b((?:husaro|styrso|grinda|moja|uto|sandhamn|vaxholm|storholmen|fjaderholmarna|mall|badkomp-[a-z-]+)-(?:\d{4}|N\d{3}))\b', open(md, encoding='utf-8').read()))
rows = []
for f in sorted(os.listdir(REG)):
    if not f.endswith('.tsv'): continue
    for r in list(csv.reader(open(os.path.join(REG, f), encoding='utf-8'), delimiter='\t', quoting=csv.QUOTE_NONE))[1:]:
        if r and r[0] in ids:
            rows.append(r)
valda, strukna = [], []
for r in rows:
    rid, sida, filrad, falt, pastaende, typ, _bef, dom, _ratt, kalla, citat, last, atgard, ny, _k = (r + [''] * 15)[:15]
    if atgard == 'STRYK+KOMPENSERA':
        strukna.append((rid, sida, filrad, pastaende)); continue
    text = ny if atgard in ANDRAD and ny.strip() else pastaende
    valda.append((rid, sida, filrad, text, kalla, citat, last, 'ja' if atgard == 'NY' else 'nej'))
rnd = random.Random(20261103)
rnd.shuffle(valda)
with open(f'{UT}/{slug}.underlag.tsv', 'w') as fu, open(f'{UT}/{slug}.nyckel.tsv', 'w') as fn, open(f'{UT}/{slug}.strukna.tsv', 'w') as fs:
    fu.write('kid\tsida\tfil:rad\ttext\tkälla (URL)\tcitat\tläst\tny mening\n')
    fn.write('kid\tregister-id\turval\n')
    fs.write('kid\tsida\tfil:rad\tstruken text\n')
    for i, p in enumerate(valda, 1):
        kid = f'{prefix}{i:03d}'
        fu.write('\t'.join([kid] + [x.replace('\t', ' ').replace('\n', ' ') for x in p[1:]]) + '\n')
        fn.write(f'{kid}\t{p[0]}\tOMARBETAD\n')
    for j, s in enumerate(strukna, 1):
        kid = f'{prefix}s{j:02d}'
        fs.write('\t'.join([kid] + [x.replace('\t', ' ').replace('\n', ' ') for x in s[1:]]) + '\n')
        fn.write(f'{kid}\t{s[0]}\tSTRUKEN\n')
print(f'{slug}: {len(ids)} id i md, {len(valda)} rader i underlaget, {len(strukna)} strukna, saknas i registret: {sorted(ids - {r[0] for r in rows})[:20]}')
