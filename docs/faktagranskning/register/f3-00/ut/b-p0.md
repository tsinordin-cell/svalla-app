# P0, fas 3 batch 00 del B (läst 2026-11-28)

## P0-1 Lidö: beställningsbrygga visas som vanlig linje på /farjor
- Fil:rad: src/app/farjor/page.tsx:466 (`{ name: 'Färja 31-1', desc: 'Räfsnäs brygga → Lidö, ca 15 min' }`), register f300b-0062.
- Felet: kortet under "Waxholmsbolaget: pendlarbåtarna" visar Räfsnäs → Lidö som en vanlig tur. I Waxholmsbolagets tabell 31 är varje tur från Räfsnäs till Lidö märkt b (beställ), i hösttabellen som gäller nu, i vintertabellen från 13 december och i sommartabellen 2026 (utom en tur). Den som går ombord i Räfsnäs utan att ha beställt kan inte räkna med att båten lägger till vid Lidö.
- Källa: https://kund.printhuset-sthlm.se/wa/h31.pdf och https://kund.printhuset-sthlm.se/wa/w31.pdf — "31A RÄFSNÄS – TJOCKÖ – FEJAN", raden Lidö med tiderna märkta b, och anmärkningen "Beställ resan i SL-appen, på" … "Waxholmsbolagets webb eller via kundtjänst" … "08-600 10 00 minst 2 timmar innan" (h31: "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"; w31: "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027").
- Rättelse i ut/b.edits.json: kortet säger att resan till Lidö måste beställas i förväg, med restiden 10 till 15 minuter uppmätt i w31.
