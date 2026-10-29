"""Hittar de källkommentarer i supabase/datafix/*.sql som hör till platsernas
NUVARANDE text i tabellen restaurants.

Användning:
  python3 -I datafix_kallor.py DATAFIXMAPP UTMAPP slug1 slug2 ...
    Skriver UTMAPP/datafix-kandidater.tsv: slug | fil | md5(description) | kommentar
  python3 -I datafix_kallor.py --valj UTMAPP md5fil.tsv
    md5fil.tsv: slug<TAB>md5 ur databasen (select slug, md5(description) ...).
    Skriver UTMAPP/datafix-kallor.tsv (bara kandidater vars text är den som
    står i databasen i dag) och UTMAPP/datafix-pseudoregister.tsv i
    registerformat, så att kallcache.py kan hämta och förkontrollera källorna.

Kommentarerna står direkt ovanför varje UPDATE ("-- domän/sökväg: "citat"").
Domäner utan https:// kompletteras med https://. Verktyget avgör inte om
källan stöder texten – det gör Granskaren.
"""
import sys, os, re, glob, hashlib, csv

DOMAN = re.compile(r'(?<![\w/@.])((?:https?://)?(?:[a-z0-9-]+\.)+(?:se|com|nu|org|net|info|fi|eu|io|dk|no)(?:/[^\s"”“:;,)]*)?)', re.I)


def las_satser(fil):
    rader = open(fil, encoding='utf-8', errors='replace').read().split('\n')
    kommentar, i = [], 0
    while i < len(rader):
        r = rader[i]
        if r.strip().startswith('--'):
            kommentar.append(r.strip()[2:].strip())
            i += 1
            continue
        if re.match(r'\s*update\s+restaurants\b', r, re.I):
            sats = [r]
            while not (sats[-1].rstrip().endswith(';') and (''.join(sats).replace("''", '').count("'") % 2 == 0)) and i + 1 < len(rader):
                i += 1
                sats.append(rader[i])
            text = '\n'.join(sats)
            m = re.search(r"where\s+slug\s*=\s*'([^']+)'", text, re.I)
            d = re.search(r"description\s*=\s*'((?:[^']|'')*)'", text, re.I | re.S)
            if m and d:
                yield m.group(1), d.group(1).replace("''", "'"), ' '.join(kommentar)
            kommentar = []
            i += 1
            continue
        if r.strip():
            kommentar = []
        i += 1


def kandidater(mapp, ut, slugs):
    vill = set(slugs)
    with open(os.path.join(ut, 'datafix-kandidater.tsv'), 'w') as f:
        f.write('slug\tfil\tmd5\tkommentar\n')
        for fil in sorted(glob.glob(os.path.join(mapp, '*.sql'))):
            for slug, desc, kom in las_satser(fil):
                if slug in vill:
                    f.write('\t'.join([slug, os.path.basename(fil), hashlib.md5(desc.encode('utf-8')).hexdigest(), kom.replace('\t', ' ')]) + '\n')


def valj(ut, md5fil):
    db = dict(r[:2] for r in csv.reader(open(md5fil, encoding='utf-8'), delimiter='\t') if len(r) >= 2)
    kand = list(csv.reader(open(os.path.join(ut, 'datafix-kandidater.tsv'), encoding='utf-8'), delimiter='\t', quoting=csv.QUOTE_NONE))[1:]
    traff = {}
    for slug, fil, md5, kom in kand:
        if db.get(slug) == md5:
            traff[slug] = (fil, kom)          # senaste filen vinner (sorterad ordning)
    with open(os.path.join(ut, 'datafix-kallor.tsv'), 'w') as f, open(os.path.join(ut, 'datafix-pseudoregister.tsv'), 'w') as p:
        f.write('slug\tfil\tkommentar\n')
        p.write('\t'.join(['id', 'sida', 'fil:rad', 'fält', 'påstående', 'typ', 'befintlig källa'] + [''] * 8) + '\n')
        for slug in sorted(db):
            if slug not in traff:
                f.write(f'{slug}\t\t(ingen datafix-sats med den text som står i databasen i dag)\n')
                continue
            fil, kom = traff[slug]
            f.write(f'{slug}\t{fil}\t{kom}\n')
            kalla = DOMAN.sub(lambda m: m.group(1) if m.group(1).lower().startswith('http') else 'https://' + m.group(1), kom)
            p.write('\t'.join([f'datafix:{slug}', '', fil, 'description', '', '', 'KÄLLA: ' + kalla] + [''] * 8) + '\n')
    print(f'{len(traff)} av {len(db)} platser har en datafix-sats med dagens text')


if __name__ == '__main__':
    if sys.argv[1] == '--valj':
        valj(sys.argv[2], sys.argv[3])
    else:
        kandidater(sys.argv[1], sys.argv[2], sys.argv[3:])
