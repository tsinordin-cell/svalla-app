#!/usr/bin/env python3
"""Samlar Redaktörens beslut som återstår att arbeta in, per ö.

Läser kontroll/<namn>.beslut.tsv för de kontroller vars fynd inte har
arbetats in i någon tidigare Skribentrunda (oar-omk2, full-02 … full-28 och
utanför-raderna i mallar-omk3) och skriver en TSV per ö i
redaktor/omarbete-ko/. Varje rad: källfil, kid, register-id, fynd, beslut,
flaggor (TOM = väntar på Toms beslut, OMPROVAS = ska omprövas i
slutomkontrollen, ANM = OK med anmärkning).

Användning: python3 -I samla_omarbete.py
"""
import csv
import glob
import os
import re
import sys
import unicodedata

B = '/tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01'
K = os.path.join(B, 'kontroll')
UT = os.path.join(B, 'redaktor', 'omarbete-ko')
OAR = ['storholmen', 'moja', 'uto', 'sandhamn', 'fjaderholmarna', 'grinda',
       'vaxholm', 'styrso', 'husaro']


def oslug(text):
    t = unicodedata.normalize('NFKD', text.lower())
    t = ''.join(c for c in t if not unicodedata.combining(c))
    m = re.match(r'[a-z]+', t.strip())
    if not m:
        return 'ovrigt'
    return m.group(0) if m.group(0) in OAR else 'ovrigt'


def filer():
    namn = ['oar-omk2'] + [f'full-{n:02d}' for n in range(2, 29)] + ['mallar-omk3', 'redaktor-09']
    for n in namn:
        p = os.path.join(K, f'{n}.beslut.tsv')
        if os.path.exists(p):
            yield n, p


def main():
    os.makedirs(UT, exist_ok=True)
    per_o = {}
    saknas = []
    for n, p in filer():
        with open(p, encoding='utf-8', newline='') as f:
            rader = list(csv.reader(f, delimiter='\t', quoting=csv.QUOTE_NONE))
        huvud = rader[0]
        for r in rader[1:]:
            if not r or not r[0].strip():
                continue
            if len(huvud) == 4:
                kid, rid, fynd, beslut = (r + [''] * 4)[:4]
            else:
                kid, fynd, beslut = (r + [''] * 3)[:3]
                rid = kid
            if n == 'mallar-omk3' and not kid.startswith('utanför'):
                continue  # mallarnas egna fynd är inarbetade i mallarnas runda 4
            flaggor = []
            if re.search(r'Toms beslut', beslut):
                flaggor.append('TOM')
            if re.search(r'[Oo]mprövas|slutomkontroll', beslut):
                flaggor.append('OMPROVAS')
            if fynd.startswith('OK'):
                flaggor.append('ANM')
            o = oslug(rid)
            per_o.setdefault(o, []).append([n, kid, rid, fynd, beslut, ','.join(flaggor)])
        if n.startswith('full-'):
            pass
    for n in [f'full-{i:02d}' for i in range(2, 29)]:
        if not os.path.exists(os.path.join(K, f'{n}.beslut.tsv')):
            saknas.append(n)
    for o, rader in sorted(per_o.items()):
        with open(os.path.join(UT, f'{o}.tsv'), 'w', encoding='utf-8', newline='') as f:
            w = csv.writer(f, delimiter='\t', quoting=csv.QUOTE_NONE, escapechar='\\', lineterminator='\n')
            w.writerow(['fil', 'kid', 'register-id', 'fynd', 'beslut', 'flaggor'])
            w.writerows(rader)
    print('per ö:', ', '.join(f'{o} {len(r)}' for o, r in sorted(per_o.items())))
    print('beslutsfiler som saknas:', ' '.join(saknas) if saknas else 'inga')


if __name__ == '__main__':
    sys.exit(main())
