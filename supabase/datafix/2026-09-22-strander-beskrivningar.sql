-- 2026-09-22: beskrivningar för havsbad (block 4) + namn- och länkrättelser.
--
-- Källor: Havs- och vattenmyndigheten (havochvatten.se), kommunens egen sida eller goteborg.com.
-- Varje citat kontrollerat mot en ny hämtning av källsidan (Playwright textContent, 2026-09-22).
-- Bara havsbad får text. Insjöbad och platser utan tillåten källa lämnas orörda (lista i PR).
-- Inga priser, tider eller telefonnummer. Namn rättas bara där källan och koordinaterna stämmer.

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-goteborgs-stad/askimsbadet.html (läst 2026-09-22)
--   "Sex hektar havsbad med långgrund sandbotten."
--   "långgrund sandstrand och stora gräsytor för lek, spel och solbad"
--   "Här kan du sola och bada från den 259 meter långa badpiren"
--   "Ramper ner till sandstranden och från piren gör det lättare för rullstolsburna att bada."
--   Avvikelse: website är en gammal goteborg.com EventGuide-länk (Askimsbadet_4927), sannolikt inaktuell – ej verifierad.
update restaurants set description = 'Askimsbadet är ett havsbad med långgrund sandstrand, sandbotten och stora gräsytor för lek, spel och solbad. Man kan sola och bada från den 259 meter långa badpiren, och ramper ner till sandstranden och från piren gör det lättare för rullstolsburna att bada. Här finns kafé, lekplats, bangolf, duschar, toaletter och grillplatser.', updated_at = now() where slug = 'askimsbadet' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-goteborgs-stad/fiskeback.html (läst 2026-09-22)
--   "klippbad med en liten sandstrand och fast badbrygga"
--   "Flera fasta stegar finns på berget."
--   "Har man missat matsäcken finns kafé och kiosk."
--   "Från hållplatsen är det 300 meter till badplatsen."
update restaurants set description = 'Fiskebäcksbadet är ett klippbad med en liten sandstrand och fast badbrygga, och flera fasta stegar finns på berget. Badplatsen har bryggor, badstegar, grillplats och lekplats samt kafé och kiosk. Närmaste hållplats är Fiskebäcks småbåtshamn, 300 meter från badplatsen.', updated_at = now() where slug = 'fiskebacksbadet' and type = 'beach' and description is null;

-- KÄLLA: https://www.goteborg.com/platser/branno (läst 2026-09-22)
--   "Från Rödsten är det cirka en kilometer till badplatsen Gröna Vik."
--   "Här finns sandstrand och bryggor."
--   "Brännö är en levande skärgårdsö i södra delen av Göteborgs skärgård"
--   "Skärgårdsfärjorna till Brännö stannar på två olika färjelägen på ön – Brännö Husvik och Brännö Rödsten."
update restaurants set description = 'Gröna Vik är en badplats på Brännö i södra delen av Göteborgs skärgård. Här finns sandstrand och bryggor. Badplatsen ligger cirka en kilometer från färjeläget Brännö Rödsten, där skärgårdsfärjorna stannar.', updated_at = now() where slug = 'grona-vik-badplats' and type = 'beach' and description is null;

-- KÄLLA: https://goteborg.se/wps/portal/start/uppleva-och-gora/idrott-motion-och-friluftsliv/simma-och-bada/badplatser/hitta-badplatser-utomhusbad?id=3689 (läst 2026-09-22)
--   "En barnvänlig, skyddad sandstrand omgiven av bergsknallar."
--   "Du kan ta dig i vattnet från både betongdäck och badstegar."
--   "Tillgänglighetsanpassad ramp ner i vattnet finns för personer med fysisk funktionsnedsättning."
--   "Från hållplatsen är det 1 kilometer till badplatsen."
update restaurants set description = 'Hovåsbadet är en barnvänlig, skyddad sandstrand omgiven av bergsknallar, där man tar sig i vattnet från betongdäck och badstegar. Här finns bryggor, gungor, grillplats, kafé och toalett, även tillgänglighetsanpassad, samt en ramp ner i vattnet. Närmaste hållplats är Hovås nedre, 1 kilometer från badplatsen.', updated_at = now() where slug = 'hovasbadet' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-uddevalla-kommun/lyckorna-kungsparken.html (läst 2026-09-22)
--   "Badplatsen ligger i en grönskande parkmiljö och omges av historiska byggnader."
--   "3 badstegar på två bryggor"
--   "Avgiftsbelagd parkering vid Lyckorna Brygga, ca 500 meter från badplatsen."
--   Avvikelse: HaV-namn: "Lyckorna Kungsparken".
update restaurants set description = 'Badplatsen i Kungsparken vid Lyckorna ligger i en grönskande parkmiljö omgiven av historiska byggnader. Här finns badstegar på två bryggor, en flotte med badstege och ett hopptorn samt grillplats, bord och bänkar, gunga, klätterställning och torrtoalett. Parkering finns vid Lyckorna Brygga, cirka 500 meter från badplatsen.', updated_at = now() where slug = 'kungsparkens-badplats' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-goteborgs-stad/naset.html (läst 2026-09-22)
--   "barnvänlig långgrund sandstrand omgiven av klippor"
--   "Här finns betongdäck att solbada på och bryggor med badstegar att bada från."
--   "Från hållplatsen är det 400 meter till badplatsen."
--   Avvikelse: website är ingen URL ("goteborg.se (enhetskatalogen)"); goteborg.se-sidan har id=3696.
update restaurants set description = 'Näsetbadet har en barnvänlig, långgrund sandstrand omgiven av klippor, med betongdäck att solbada på och bryggor med badstegar att bada från. Här finns gungor, toalett (även tillgänglighetsanpassad), kiosk och servering. Närmaste hållplats är Näsbovägen, 400 meter från badplatsen.', updated_at = now() where slug = 'nasetbadet' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-lysekils-kommun/govik.html (läst 2026-09-22)
--   "Badplatsen delas upp i Govik inre och Govik yttre badplats och består av sandstränder, klippor och gräsytor och hopptorn."
--   "Två flytbryggor med landgång och badtrappor"
--   "Badtrappor på bergsparti - Hopptorn med trampolin -Omklädningshytter - Toalett"
--   Avvikelse: Fel namn: HaV kallar badplatsen "Govik" (Govik inre och Govik yttre); Röhälla nämns inte i källan.
update restaurants set description = 'Badplatsen vid Govik delas i Govik inre och Govik yttre och består av sandstränder, klippor, gräsytor och hopptorn. Här finns flytbryggor med landgång och badtrappor, och vid Govik yttre även badtrappor på bergsparti, hopptorn med trampolin, omklädningshytter och toalett.', name = 'Govik', updated_at = now() where slug = 'rohalla' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-goteborgs-stad/smithska-udden.html (läst 2026-09-22)
--   "6,5 ha havsbad med en liten strand i norra delen, i övrigt främst beståendes av klippor med fasta badstegar."
--   "Här finns plats för många i det vidsträckta klippområdet, på stränder och gräsytor."
--   "Bryggor, badstegar, lekplats, kiosk, toalett (dam, herr och handikapp)."
--   "sydvästra del badar många nakna"
--   Avvikelse: website använder gammal goteborg.se-sökväg (id=3698 stämmer med nuvarande sida).
update restaurants set description = 'Smithska udden är ett havsbad med en liten strand i norra delen och i övrigt främst klippor med fasta badstegar, med plats i klippområdet, på stränder och gräsytor. Här finns bryggor, lekplats, kiosk och toaletter, även handikapptoalett. På uddens sydvästra del badar många nakna.', updated_at = now() where slug = 'smithska-udden' and type = 'beach' and description is null;

-- KÄLLA: https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/backbyn/ (läst 2026-09-22)
--   "Badplatsen är ett havsbad vid Backby på ön Singös östra sida."
--   "Här hittar du 20 meter strandlinje och en sandstrand med gräsytor i en skyddad vik i söderläge."
--   "Öster om badplatsen finns ett fiskeläge."
update restaurants set description = 'Backbys badplats är ett havsbad på Singös östra sida med 20 meter strandlinje och en sandstrand med gräsytor i en skyddad vik i söderläge. Här finns brygga, badstege, bänkar, omklädningsrum, toalett och parkeringsplats. Öster om badplatsen finns ett fiskeläge.', updated_at = now() where slug = 'backbybadet' and type = 'beach' and description is null;

-- KÄLLA: https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/kvarnsand/ (läst 2026-09-22)
--   "Kvarnsandsbadet är ett havsbad på Väddö östkust, söder om Grisslehamn."
--   "Den har cirka 190 meter lång strandlinje i österläge."
update restaurants set description = 'Kvarnsandsbadet är ett havsbad på Väddös östkust söder om Grisslehamn, med cirka 190 meter lång strandlinje i österläge. Vid badplatsen finns beachvolleyplan, bänkar, eldstad, toalett och parkeringsplats. Brygga och badstege saknas.', updated_at = now() where slug = 'kvarnsand' and type = 'beach' and description is null;

-- KÄLLA: https://www.osteraker.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.367d658917909e8fc2b985.html (läst 2026-09-22)
--   "Till Österskärs havsbad, i folkmun kallad Solbrännan, kan du ta dig med Roslagsbanan."
--   "Badet består av en lång inbjudande sandstrand med badbrygga."
--   "Ovanför stranden finns några tallbevuxna klippor och gräsytor att sola på."
--   "vilket gör stranden relativt lättillgänglig för personer med rörelsenedsättningar"
--   Avvikelse: Officiellt namn är Österskärs havsbad (Solbrännan). Fel länk i website (mymenuweb – förbjuden/irrelevant källa).
update restaurants set description = 'Österskärs havsbad, i folkmun kallat Solbrännan, ligger vid Trälhavet en kort promenad från Roslagsbanans Österskärs station. Badet har en lång sandstrand med badbrygga, och ovanför stranden finns tallbevuxna klippor och gräsytor samt en lekplats. Ett upplyst promenadstråk i trä gör stranden relativt lättillgänglig för personer med rörelsenedsättningar.', name = 'Österskärs havsbad (Solbrännan)', website = 'https://www.osteraker.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.367d658917909e8fc2b985.html', updated_at = now() where slug = 'solbrannan' and type = 'beach' and description is null;

-- KÄLLA: https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser (läst 2026-09-22)
--   "På Överby finns denna fina familjevänliga badplats som ligger utefter Badviksvägen."
--   "Badryggor med stege"
--   "Grillplats med fasta bänkar och lösa bord"
--   Avvikelse: Fel namn: officiellt Överbybadet (Resarö). Fel länk i website (HSB Minnebergs samlingslokaler).
update restaurants set description = 'Överbybadet på Resarö är en familjevänlig badplats utefter Badviksvägen, med sandstrand och gräsytor. Här finns badbryggor med stege, omklädningshytt, grillplats med bänkar och bord, beachvolleybollplan, lekplats och parkering, och under badsäsongen en Baja-maja.', name = 'Överbybadet', website = 'https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser', updated_at = now() where slug = 'badviken' and type = 'beach' and description is null;

-- KÄLLA: https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser (läst 2026-09-22)
--   "Eriksö badplats är ett EU-bad."
--   "Handikappramp för tillgänglighet"
--   "Flytbrygga med hopptorn"
--   "Camping med uthyrningsstugor och uthyrningsvagnar"
update restaurants set description = 'Eriksö badplats ligger längs elljusspåret i Eriksö friluftsområde på Vaxön och har sandstränder och klippbad. Här finns handikappramp, flytbrygga med hopptorn, grillplats med bänkar och bord, omklädningshytt och beachvolleybollplan. Badet är ett EU-bad, och i friluftsområdet finns camping, kiosk och servering.', updated_at = now() where slug = 'eriksobadet' and type = 'beach' and description is null;

-- KÄLLA: https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser (läst 2026-09-22)
--   "Detta välbesökta enklare bad finner du längs med Militärvägen."
--   "Här har du utsikt mot Vaxholmsfjärden vid Oxdjupet där alla stora fartyg passerar på väg in mot Stockholm."
--   "Badbryggor med stege"
--   Avvikelse: Fel länk i website (parker.stockholm Mälarhöjdsbadet – annat bad i Mälaren).
update restaurants set description = 'Måldepån på Rindö är ett enklare bad längs Militärvägen, med utsikt mot Vaxholmsfjärden vid Oxdjupet där de stora fartygen passerar på väg in mot Stockholm. Här finns stenstrand, badbryggor med stege, gräsytor och grillplats, och under badsäsongen en Baja-maja.', website = 'https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser', updated_at = now() where slug = 'maldepan' and type = 'beach' and description is null;

-- KÄLLA: https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser (läst 2026-09-22)
--   "I Tenöreservatet på Bogesund ligger denna badplats"
--   "Följ Tenövägen fram till den stora parkeringen på höger sida."
--   "Tenöbadet är ett EU-bad."
--   Avvikelse: Website upplevvaxholm.se är en allmän turistsida, inte specifik för badet.
update restaurants set description = 'Tenöbadet ligger i Tenöreservatet på Bogesund, med sandstrand, stora grönytor och närhet till vandringsleder. Här finns grillplats, omklädningshytt, beachvolleybollplan och lekplats, och badet är ett EU-bad. Man kör över Pålsundsbron och följer Tenövägen fram till den stora parkeringen.', updated_at = now() where slug = 'tenobadet' and type = 'beach' and description is null;

-- KÄLLA: https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser (läst 2026-09-22)
--   "på södra Rindö i slutet på Grönviksvägen finns detta lilla lokala bad."
--   "Rindö nås med gratis bilfärja från Vaxön."
--   Avvikelse: Koordinaterna stämmer inte helt: HaV anger 59.39997, 18.41631 (ca 1 km norr om Svallas 59.39047, 18.41412). Fel länk i website (gronviksarrende.se – fritidshusområde vid Ensjön söder om Norrköping).
update restaurants set description = 'Grönviksbadet är ett litet lokalt bad på södra Rindö, i slutet av Grönviksvägen. Här finns sandstrand, badbrygga och grillplats, och under badsäsongen en Baja-maja. Rindö nås med gratis bilfärja från Vaxön.', website = 'https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser', updated_at = now() where slug = 'gronviksbadet' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-varmdo-kommun/grisslinge-havsbad.html (läst 2026-09-22)
--   "Grisslinge Havsbad ligger i Grisslingefjärden på Farstalandets östra del i Värmdö Kommun."
--   "Badplatsen består av en ca 300 meter lång sandstrand samt angränsande gräsytor."
--   "Vid badplatsen finns lekplats, toalett, omklädningsrum, utedusch, parkeringsplats, kiosk, konditori och restaurang."
--   "Man kan även spela boule och beachvolleyboll på badplatsen."
update restaurants set description = 'Grisslinge havsbad ligger i Grisslingefjärden på Farstalandets östra del och består av en cirka 300 meter lång sandstrand med angränsande gräsytor. Vid badplatsen finns lekplats, toalett, omklädningsrum, utedusch, parkeringsplats, kiosk, konditori och restaurang. Här kan man även spela boule och beachvolleyboll.', updated_at = now() where slug = 'grisslinge-havsbad' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-varmdo-kommun/sodersved.html (läst 2026-09-22)
--   "Ingarö Havscamping/Södersved ligger i Värmdö kommun, mellan Kolströmskanalen och Grisslingefjärden."
--   "Badplatsen består av en ca 150 meter lång sandstrand och större angränsande gräsytor."
--   "Vid badet finns brygga, omklädningsrum och kiosk."
--   "Badet är handikappvänligt."
--   Avvikelse: website pekar på badkartan.se (förbjuden källa)
update restaurants set description = 'Södersved havsbad har en sandstrand på ca 150 meter vid Ingarö Havscamping, mellan Kolströmskanalen och Grisslingefjärden, med större angränsande gräsytor. Vid badet finns brygga, omklädningsrum och kiosk, och badet är handikappvänligt.', website = 'https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-varmdo-kommun/sodersved.html', updated_at = now() where slug = 'sodersved-havsbad' and type = 'beach' and description is null;

-- KÄLLA: https://www.nacka.se/uppleva--gora/friluftsliv-motion/badplatser-och-badvatten/saltsjobaden-fisksatra/ (läst 2026-09-22)
--   "Saltsjöbadens friluftsbad är ett anrikt friluftsbad med separata badhus för herr- och dambad, bastu och vinterbad."
--   "Här finns också en sandstrand dit alla är välkomna, hopptorn, servering och kajakuthyrning."
--   "Saltsjöbanan till station Saltsjöbaden. Därefter promenad ca 500 meter."
--   "Ett fåtal p-platser finns."
update restaurants set description = 'Saltsjöbadens friluftsbad är ett anrikt friluftsbad med separata badhus för herr- och dambad, bastu och vinterbad. Här finns också en sandstrand dit alla är välkomna, hopptorn, servering och kajakuthyrning. Från Saltsjöbanans station Saltsjöbaden är det ca 500 meter att promenera, och ett fåtal p-platser finns.', updated_at = now() where slug = 'saltsjobadens-friluftsbad' and type = 'beach' and description is null;

-- KÄLLA: https://www.tyreso.se/uppleva--gora/natur-och-friluftsliv/badplatser-och-friluftsbad.html (läst 2026-09-22)
--   "Ligger vid Erstaviken, Breviksvägen/Tegelbruksvägen. Sandstrand med brygga. Busshållplats: Trinntorp."
--   "Parkering för rörelsehindrade: 2 platser."
--   "Service: Dass finns vid badplatsen under badsäsong. Restaurang finns cirka 200 meter från badplatsen."
update restaurants set description = 'Trinntorpsbadet ligger vid Erstaviken, vid Breviksvägen/Tegelbruksvägen i Tyresö, och har sandstrand med brygga. Parkering finns intill badet, med två platser för rörelsehindrade, och busshållplatsen heter Trinntorp. Under badsäsongen finns dass, och en restaurang ligger cirka 200 meter bort.', updated_at = now() where slug = 'trinntorpsbadet' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-varmdo-kommun/torpesand.html (läst 2026-09-22)
--   "Strand- och klippbad i Björnö naturreservat på Ingarö i Stockholms skärgård."
--   "Sandstranden är ca 120 meter lång."
--   "Botten är sandbotten och är långgrund."
--   "Klippbadet har en handikappanpassad badbrygga."
update restaurants set description = 'Torpesand är ett strand- och klippbad i Björnö naturreservat på Ingarö. Sandstranden är ca 120 meter lång och botten är långgrund sandbotten. Vid klippbadet finns en handikappanpassad badbrygga.', updated_at = now() where slug = 'torpesand' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-varmdo-kommun/bjorno-sandarna-stora-sand.html (läst 2026-09-22)
--   "Badet består av en ca 200 meter lång naturlig sandstrand, med öppet läge i söder mot Nämdöfjärden"
--   "flankerad på båda sidor av söder- och östergående klippuddar ca 150 meter"
--   "Ligger 500 m från busshållplats och 150 m från parkering."
--   Avvikelse: Namnet i källan är 'Björnö Sandarna Stora Sand'. Ligger på Ingarö i Värmdö kommun, inte södra Stockholms län/Haninge.
update restaurants set description = 'Badplatsen ligger på södra Ingarö och består av en cirka 200 meter lång naturlig sandstrand med öppet läge i söder mot Nämdöfjärden. Stranden flankeras på båda sidor av klippuddar. Busshållplatsen ligger cirka 500 meter bort och parkeringen cirka 150 meter bort.', updated_at = now() where slug = 'stora-sandarna' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-varmdo-kommun/bjorno-sandarna-lilla-sand.html (läst 2026-09-22)
--   "Badet består av en ca 100 meter lång naturlig sandstrand, med öppet läge i söder mot Nämdöfjärden"
--   "Promenad från busshållplats Stora sand ca 500 meter och från närmast liggande p-plats ca 150 meter."
--   Avvikelse: Namnet i källan är 'Björnö Sandarna Lilla Sand'. Ligger på Ingarö i Värmdö kommun.
update restaurants set description = 'Badplatsen ligger på södra Ingarö och består av en cirka 100 meter lång naturlig sandstrand med öppet läge i söder mot Nämdöfjärden och en östergående klippudde. Det är cirka 500 meters promenad från busshållplats Stora sand och cirka 150 meter från närmaste parkering.', updated_at = now() where slug = 'lilla-sandarna' and type = 'beach' and description is null;

-- KÄLLA: https://www.haninge.se/uppleva-och-gora/idrott-och-friluftsliv/friluft-och-natur/bad/ (läst 2026-09-22)
--   "Stort bad vid havet med strand."
--   "Schweizerbadet är känt för att vara väldigt långgrunt."
--   Avvikelse: Fel länk i website: schweizerdalen.se är Schweizerdalens Tomtägare Ekonomisk Förening, inte badet.
update restaurants set description = 'Schweizerbadet på Dalarö är ett stort havsbad med strand, och det är mycket långgrunt. Vid badet finns toalett, kiosk, grillplats och stor parkering. Närmaste busshållplats är Schweizerparken, och hundbad finns vid Vadviken.', website = 'https://www.haninge.se/uppleva-och-gora/idrott-och-friluftsliv/friluft-och-natur/bad/', updated_at = now() where slug = 'schweizerbadet' and type = 'beach' and description is null;

-- KÄLLA: https://www.haninge.se/uppleva-och-gora/idrott-och-friluftsliv/friluft-och-natur/bad/ (läst 2026-09-22)
--   "Stort bad vid havet med strand, hopptorn och flera bryggor."
--   "Närmaste busshållplats är Årsta havsbad."
--   "Badet drivs av Årsta havsbads samfällighetsförening."
update restaurants set description = 'Årsta havsbad är ett stort bad vid havet med strand, hopptorn och flera bryggor. Här finns toalett, kiosk och en stor parkeringsplats, och närmaste busshållplats heter Årsta havsbad. Badet drivs av Årsta havsbads samfällighetsförening.', updated_at = now() where slug = 'arsta-havsbad' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-nynashamn-kommun/nickstabadet.html (läst 2026-09-22)
--   "Längst in i Nickstaviken, Nynäshamns kommun, ligger Nickstabadet."
--   "Badplatsen består av en ca 600 meter lång sandstrand samt omgivande större gräsytor."
--   "I anslutning till badet finns bland annat hopptorn och vattenrutschbanor."
update restaurants set description = 'Nickstabadet ligger längst in i Nickstaviken, strax väster om centrala Nynäshamn. Badplatsen består av en cirka 600 meter lång sandstrand med omgivande större gräsytor, och badet är långgrunt. I anslutning till badet finns bland annat hopptorn och vattenrutschbanor.', updated_at = now() where slug = 'nickstabadet' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-nynashamn-kommun/hamnviken.html (läst 2026-09-22)
--   "Hamnvikens badplats ligger i en skyddad vik söder om Nynäshamn."
--   "Vikens utlopp är endast ca tre meter brett"
--   "Badet består av en sandstrand med angränsande gräsytor och en brygga, men möjlighet till bad från klippor finns också."
--   Avvikelse: Fel namn: källan kallar badet 'Hamnviken' (namnet Tian förekommer inte i källan). Fel länk i website: 10anvaxholm.se hör till Vaxholm och har inget med badet att göra.
update restaurants set description = 'Hamnvikens badplats ligger i en skyddad vik söder om Nynäshamn, där vikens utlopp bara är cirka tre meter brett. Badet består av en sandstrand med angränsande gräsytor och en brygga, och det finns även möjlighet till bad från klippor.', name = 'Hamnvikens badplats', website = 'https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-nynashamn-kommun/hamnviken.html', updated_at = now() where slug = 'tian' and type = 'beach' and description is null;

-- KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-trosa-kommun/trosa-havsbad.html (läst 2026-09-22)
--   "Trosa Havsbad ligger i södra delen av Öbolandet, ca 3 km söder om Trosa centrum."
--   "hopptorn, bryggor, 50 m lång sandstrand och klippor"
--   "Havsbadet ligger på Trosa camping och har en sandstrand med lerbotten."
--   "En mindre småbåtshamn ligger i närheten av badplatsen."
update restaurants set description = 'Trosa Havsbad ligger i södra delen av Öbolandet, cirka 3 km söder om Trosa centrum, på Trosa camping. Här finns hopptorn, bryggor, en 50 meter lång sandstrand med lerbotten och klippor. Gräsytor och klippor finns vid bryggor och strand, och en mindre småbåtshamn ligger i närheten.', updated_at = now() where slug = 'trosa-havsbad' and type = 'beach' and description is null;
