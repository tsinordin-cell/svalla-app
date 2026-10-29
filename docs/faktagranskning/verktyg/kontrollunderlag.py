"""Bygger Kontrollantens underlag ur ett ifyllt register (uppdraget DEL 4, roll 5).

Kontrollanten får bara slutlig text, KÄLLA-rad och citat – inga domar, inget
resonemang, inga utkast. Urvalet följer DEL 4:
  - 100 % av ändrade och nya påståenden
  - 100 % av högriskklasserna även när de var KORREKT: transport,
    skyddsstatus och föreskrifter, säkerhet
  - ett slumpat stickprov på 30 av de övriga KORREKT-raderna (fast frö per ö,
    så att urvalet går att göra om)

Användning:
  python3 -I kontrollunderlag.py REGISTER.tsv UTMAPP [--stickprov 30] [--alla-korrekt]
    --alla-korrekt: full kontroll av alla KORREKT-rader (efter två fynd eller
    fler i stickprovet).
Ut:
  UTMAPP/<slug>.underlag.tsv  kid | sida | fil:rad | text | källa (URL) | citat | läst | ny mening
  UTMAPP/<slug>.strukna.tsv   kid | sida | fil:rad | struken text
  UTMAPP/<slug>.nyckel.tsv    kid | register-id | urval   (bara för Redaktören)
"""
import sys, os, csv, re, random, hashlib

HOGRISK = re.compile(
    r'getting_there|transport_meta|travel_time|komma-dit|sista båt|avgång|turer|tidtabell|linje|färja|båttaxi|'
    r'pendelbåt|waxholmsbolaget|\bsl\b|västtrafik|strömma|cinderella|restid|'
    r'naturreservat|nationalpark|natura 2000|fågelskydd|sälskydd|tillträdesförbud|förbjud|föreskrift|reservat|'
    r'eldning|elda|tält|koppel|hund|knop|fartbegräns|fart |'
    r'djup|grund|segelfri|säker|varning|livrädd|flytväst|isen|\bis\b|ström',
    re.I)
ANDRAD = {'RÄTTA', 'PRECISERA', 'FRÅNVARO', 'STRYK+KOMPENSERA', 'NY'}


def main():
    reg, ut = sys.argv[1], sys.argv[2]
    n_stick = int(sys.argv[sys.argv.index('--stickprov') + 1]) if '--stickprov' in sys.argv else 30
    alla = '--alla-korrekt' in sys.argv
    slug = os.path.basename(reg).rsplit('.', 1)[0]
    os.makedirs(ut, exist_ok=True)
    rader = list(csv.reader(open(reg, encoding='utf-8'), delimiter='\t', quoting=csv.QUOTE_NONE))[1:]
    valda, strukna, pool = [], [], []
    for r in rader:
        rid, sida, filrad, falt, pastaende, typ, _bef, dom, _ratt, kalla, citat, last, atgard, ny, _k = (r + [''] * 15)[:15]
        if atgard == 'STRYK+KOMPENSERA':
            strukna.append((rid, sida, filrad, pastaende))
            continue
        text = ny if atgard in ANDRAD and ny.strip() else pastaende
        post = (rid, sida, filrad, text, kalla, citat, last, 'ja' if atgard == 'NY' else 'nej')
        if atgard in ANDRAD or dom != 'KORREKT':
            valda.append(post + ('ÄNDRAD',))
        elif HOGRISK.search(' '.join([sida, falt, pastaende])):
            valda.append(post + ('HÖGRISK',))
        else:
            pool.append(post)
    rnd = random.Random(int(hashlib.sha1(slug.encode()).hexdigest()[:8], 16))
    stick = pool if alla else rnd.sample(pool, min(n_stick, len(pool)))
    valda += [p + ('ALLA-KORREKT' if alla else 'STICKPROV',) for p in stick]
    rnd.shuffle(valda)   # Kontrollanten ska inte kunna se urvalet i ordningen
    with open(os.path.join(ut, slug + '.underlag.tsv'), 'w') as fu, \
         open(os.path.join(ut, slug + '.nyckel.tsv'), 'w') as fn:
        fu.write('kid\tsida\tfil:rad\ttext\tkälla (URL)\tciat\tläst\tny mening\n'.replace('ciat', 'citat'))
        fn.write('kid\tregister-id\turval\n')
        for i, p in enumerate(valda, 1):
            kid = f'{slug}-k{i:03d}'
            fu.write('\t'.join([kid] + [x.replace('\t', ' ') for x in p[1:8]]) + '\n')
            fn.write(f'{kid}\t{p[0]}\t{p[8]}\n')
    with open(os.path.join(ut, slug + '.strukna.tsv'), 'w') as fs:
        fs.write('kid\tsida\tfil:rad\tstruken text\n')
        for i, s in enumerate(strukna, 1):
            fs.write('\t'.join([f'{slug}-s{i:03d}', s[1], s[2], s[3].replace('\t', ' ')]) + '\n')
        # nyckeln för strukna
    with open(os.path.join(ut, slug + '.nyckel.tsv'), 'a') as fn:
        for i, s in enumerate(strukna, 1):
            fn.write(f'{slug}-s{i:03d}\t{s[0]}\tSTRUKEN\n')
    from collections import Counter
    print(f'{slug}: {len(valda)} rader att kontrollera {dict(Counter(p[8] for p in valda))}, {len(strukna)} strukna, pool {len(pool)}')


if __name__ == '__main__':
    main()
