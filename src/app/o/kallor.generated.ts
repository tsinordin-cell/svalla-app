// GENERERAD AV scripts/generera-kallor.mjs — REDIGERA INTE FÖR HAND.
//
// Källorna kommer från KÄLLA-kommentarerna i island-data.ts och bohuslan-data.ts.
// Ändra kommentaren i datafilen och kör om skriptet; ändrar du här skrivs det över.
//
// En KÄLLA-rad utan URL hamnar inte här. Det är meningen: en källa som inte går
// att öppna är inget belägg, och ska inte se ut som ett.

export type Kalla = {
  /**
   * Adressen står först med flit: verify-claims letar efter ett källmärke inom
   * fem rader ovanför ett påstående, så den här ordningen gör att filen
   * belägger sig själv i stället för att undantas från spärren.
   */
  url: string
  /** Myndigheten, kommunen eller verksamheten som står bakom uppgiften */
  org: string
  /** Vad källan bekräftar — kortfattat */
  vad: string
  /** Datum då någon faktiskt läste sidan */
  last: string | null
  /** true för myndighetskällor — visas med annan markering */
  myndighet: boolean
}

export const KALLOR_PER_O: Record<string, Kalla[]> = {
  "sandhamn": [
    {
      "url": "https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html",
      "org": "Värmdö kommun",
      "vad": "",
      "last": "2026-08-06",
      "myndighet": true
    },
    {
      "url": "https://www.ksss.se/hamnar/sandhamn",
      "org": "ksss.se",
      "vad": "Det finns ca 150 gästplatser på Sandhamn, Gästhamnen har 20 st bokningsbara platser som bokas via www.dockspot.com;  — el på brygga B och C, Vatten på bryggorna och servicehusen med dusch",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "uto": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html",
      "org": "lansstyrelsen.se",
      "vad": "Här finns också Utö gruvor från järnmalmsbrytningen som funnits till och från under 700 år med början redan under 1100-talet.",
      "last": "2026-09-19",
      "myndighet": true
    }
  ],
  "vaxholm": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bogesundslandet.html",
      "org": "lansstyrelsen.se",
      "vad": "bildat 2015; \"4341 hektar varav 2 891 hektar land\"; Vaxholms kommun; förvaltare Statens fastighetsverk; naturtyper \"barrskog, ädellövskog, odlingslandskap\"; \"många gamla grova ekar som växer i området, såväl i betesmark som i skogsmiljö\"; Natura 2000-området \"Damstakärret SE0110132 ligger inom området\"",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/vaxholms-kastell",
      "org": "sfv.se",
      "vad": "arkitekter \"Erik Dahlberg, C M Stuart, C F Meijer\"; \"Efter första världskriget flyttades försvarslinjen längre ut i skärgården och Vaxholm förlorade då återigen sin militära betydelse\"; \"1964 invigdes kastellets museum\"; i dag finns \"restaurang, konsertlokaler och en uppskattad äventyrsverksamhet\"",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/rindo-redutt",
      "org": "sfv.se",
      "vad": "byggd \"1859–1864\" för att komplettera Vaxholms kastell i försvaret av Stockholms inlopp; domineras av en donjon omgiven av vallar, djup grav och fältvall; innehöll två kaponjärer, \"de första som byggdes i landet\"; sten och tegel; statligt byggnadsminne; \"går att besöka på egen hand\"",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/oscar-fredriksborg",
      "org": "sfv.se",
      "vad": "Byggår: 1867-1877; anlagt vid Oxdjupet sedan en farled öppnats där efter århundraden av stenblockering; modernt bergfort med tunnelsprängning med nitroglycerin, betongen som byggmaterial och pansar som fasadskydd; byggnadsminne 2002 (sidan stavar namnet Oscar Fredriksborg i rubrik och löptext men Oskar-Fredriksborg i just den meningen); Området vid Oscar Fredriksborg är öppet för besök.",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v670.pdf",
      "org": "SL:s tryckta tidtabell linje 670",
      "vad": "Stockholm–Vaxholm, Alla hållplatser för buss 670 mot Västerhamnsplan, hållplats Tekniska högskolan; Giltig 11 december 2022–22 juni 2023 . Senare utgåva hittades inte som öppningsbar fil.",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/vaxholm/vaxholms-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "År 1760 lades grunden till den nuvarande kyrkan, färdig 1803 och kallad Gustav Adolfkyrkan efter Gustav III och Gustav IV Adolf; ritad av C F Adelcrantz och Olof Tempelman; det planerade tornet byggdes aldrig utan ersattes av en klockstapel i trä med tre klockor; dopfunt i gotländsk sandsten från slutet av 1300-talet, ursprungligen i Riddarholmskyrkan, överförd omkring 1677; modeller av roslagsbåtar i sidokapellen",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia",
      "org": "vaxholm.se",
      "vad": "Vaxholm fick sina första stadsprivilegier år 1647, av drottning Kristina; Viss bebyggelse har funnits på Vaxön sedan 1200-talets slut; omkring 1770 ca 800 invånare; början av 1900-talet ca 2 000 invånare; Vaxholm fick sina första reguljära ångbåtsförbindelser c:a 1850",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm",
      "org": "vaxholm.se",
      "vad": "cirka 12 000 fastboende (2024); \"Kommunen omfattar cirka 70 öar, varav 57 bebodda samt den stora gröna halvön Bogesundslandet\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.vaxholm.se/trafik--infrastruktur/trafik-gator-och-parkering/parkering/taxor-och-avgifter",
      "org": "Vaxholms stad",
      "vad": "",
      "last": "2026-08-06",
      "myndighet": false
    }
  ],
  "grinda": [
    {
      "url": "https://www.skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "skargardsstiftelsen.se/om-skargardsstiftelsen/var-historia/",
      "vad": "Stiftelsen Stockholms skärgård bildas den 20 mars 1959; 1998 skänkte Stockholms stad sina skärgårdsmarker och stiftelsens innehav ökade från ca 7 000 ha till ca 14 000 ha mark; stiftelsen är Stockholms läns tredje största markägare. KÄLLA:  — cirka tvåtusen byggnader i Stockholms skärgård",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "moja": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/storo-bocko-lokao.html",
      "org": "lansstyrelsen.se",
      "vad": "skyddat sedan 1972; \"6 045 hektar varav land 1 892 hektar\"; Värmdö kommun; förvaltare Skärgårdsstiftelsen; syfte att \"säkra ett för allmänhetens friluftsliv värdefullt skärgårdsområde samt att skydda och bibehålla områdets värdefulla växt- och djurvärld\"; björk dominerar yttersta öarna, hällmarkstallskog i övrigt; arter svärta, vigg, ejder, roskarl, labb, tobisgrissla",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/moja-bjorndalen.html",
      "org": "lansstyrelsen.se",
      "vad": "skyddat sedan 1992, utvidgat 1998; 143 hektar; Värmdö; förvaltare Skärgårdsstiftelsen; syfte \"bevara och vårda ett för faunan värdefullt skogsområde samt att låta delar av skogsmarken utvecklas mot naturskog\"; hällmarkstallskog, barr- och blandskog, myrmarker; anordningar rast-/övernattningsstuga och torrdass; tältning och eldning förbjuden",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/granholmen.html",
      "org": "lansstyrelsen.se",
      "vad": "Skyddat sedan: 1978, utvidgat 2018; Storlek: 39 hektar varav land 18 hektar; Värmdö; Skärgårdsstiftelsen; arter blodnäva, småborre, darrgräs, jungfrulin, vildlin och tvåblad; naturhamnen Munkhamnen; tältning högst två dygn per plats",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html",
      "org": "Värmdö kommun",
      "vad": "",
      "last": "2026-08-06",
      "myndighet": true
    },
    {
      "url": "https://www.rolandsvenssonmuseet.se/",
      "org": "rolandsvenssonmuseet.se",
      "vad": "Roland Svensson (1910-2003);  — målar- och skrivarhörnorna. Dessa har sedan Rolands bortgång 2003 bevarats i hans gamla ateljé på Tornö och allt är nu flyttat till det nybyggda museet vid Ramsmora ångbåtsbrygga, där även en glasad vägg ger ett vidunderligt perspektiv; Museet öppnade 2014",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/moja-bockon-och-lokaon/",
      "org": "stockholmslansmuseum.se",
      "vad": "Längs Möjas och Södermöjas östra kust har det funnits skyddade hamnvikar som lockat till sig bebyggelse ända sedan medeltiden; Vid 1800-talets mitt fanns där 74 gårdar; Det goda fisket var basen för försörjningen; jordgubbsodlingen blomstrade från sekelskiftet 1900 och en bit in på 1970-talet; Möja fick fast ångbåtsförbindelse 1906",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/djuro-moja-namdo/moja-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Möja kyrka är från 1768 och uppfördes av byggmästare Carl Örn; Tornet är från 1885; Ingången till tornet har dörrar som är från 1924; renovering påbörjad 1924; altartavla föreställande Kristus på korset med ram från 1700-talets senare hälft; Kyrkogården anlades omkring 1755; nuvarande orgel byggd 1982 av Walter Thür",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Möja.pdf",
      "org": "varmdo.se",
      "vad": "Det var troligen under vikingatiden som Möja fick bofast befolkning; Möja nämns som Myghi i Kung Valdemars seglingsbeskrivning från 1200-talet; ön är cirka 6 km lång och 4 km bred; Här finns tre insjöar; landhöjningen 30 - 40 centimeter per hundra år",
      "last": null,
      "myndighet": false
    }
  ],
  "ljustero": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html",
      "org": "lansstyrelsen.se",
      "vad": "Brännholmen är udden vid nordöstra spetsen av reservatet och här kan du bada, tälta och fiska. Klipporna mot havet är mjukt slipade av inlandsisen och randiga av bergarterna svart diabas och ljusröd fältspat. / På Brännholmen finns ett gammalt självföryngrande idegransbestånd.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.osteraker.se/download/18.367d658917909e8fc2b5172/1628586891118/Ljusterö_planprogram_Hela_Lågupplöst.pdf",
      "org": "osteraker.se",
      "vad": "Det finns två geologiska skyddsobjekt på Ljusterö, nämligen ett stråk av urkalksten längs norra stranden av Östra Lagnö och ett mindre åsparti vid Skogshult, där utsiktspunkten Ljusterö Huvud ligger. De dominerande bergarterna i kommunen utgörs av gnejser och gnejsgraniter. Till de äldsta formationerna hör leptitgnejserna som bland annat är särskilt framträdande på Västra och Östra Lagnö.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/",
      "org": "trafikverket.se",
      "vad": "Färjeledens längd är 1100 meter och överfartstiden är sju minuter.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/ostra-lagno/",
      "org": "skargardsstiftelsen.se",
      "vad": "Östra Lagnö är ett lättillgängligt naturreservat på Ljusterös östra sida där släta havsklippor, strandängar och skogsstigar möter utsikten över Svartlögafjärden. / Hit tar du dig med bil eller SL-buss via färjan till Ljusterö. Från Lagnö by är det en kort promenad till reservatet.",
      "last": null,
      "myndighet": false
    }
  ],
  "dalaro": [
    {
      "url": "https://www.dalarohembygd.se/Aretvarx/Aret%20var%20kronologi.pdf",
      "org": "dalarohembygd.se",
      "vad": "1675 Per Eriksson utses till Sveriges första lotsåldersman, med placering på Dalarö; 1770 Kungligt postkontor, med egen postmästare, Lars Filéen inrättas på Dalarö den 14 mars; 1858 Elektrisk telegraflinje mellan Stockholm - Dalarö invigs; 1844 Inrättades den första skolan i hyrd lokal",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/besok-och-upplev-haninge/sevardheter/dalaro-skeppsvraksomrade/",
      "org": "haninge.se",
      "vad": "omkring 30 registrerade fartygslämningar från 1600- till 1900-talet, varav tre gjorts tillgängliga för dykning; all dykning måste ske från båt; tillstånd krävs från Dalarö Dykpark före varje dyk; dykguide håller en kulturhistorisk genomgång före dyket; förbjudet att dyka över skrovet; minst en meters säkerhetsavstånd till fartygslämningen",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://vandrarhemmetlotsen.se",
      "org": "smadalarogard.se",
      "vad": "I Fiskehamnen precis vid vattnet ligger Vandrarhemmet Lotsen, The house has 12 beds spread over 4 rooms, VI HAR ÖPPET ÅRET RUNT!; inte STF . Dalarö Strand Hotell gick inte att belägga; Dalarö Skans är evenemangsplats (SFV), inget boende",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/dalaro-och-dalaro-skans/",
      "org": "stockholmslansmuseum.se",
      "vad": "ångbåtstrafik till Stockholm 1852; \"Vid slutet av 1800-talet och början av 1900-talet blev det populärt bland stockholmare som hade råd att bygga sommarhus\"; \"Kända konstnärer som Anders Zorn arbetade och kopplade av på Dalarö\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/haninge/historik-dalaro-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "kyrkan uppfördes 1649–1652 som kapell; \"Fram till 1780-talet behöll kapellet sin form, en rektangulär knuttimrad byggnad med sadeltak och sakristia i norr\"; ombyggnad 1786–1787 då \"väggarna höjdes och brädfodrades, taket fick sin brutna form\"; restaurering 1936 av arkitekt Einar Lundberg; kyrkan och Sandemar var de enda byggnader som inte brändes av ryssarna 1719",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.vrak.se/utforska/vrak-och-lamningar/1600-talet/riksapplet",
      "org": "vrak.se",
      "vad": "Fartyget byggdes på flottans varv vid Stigberget i Göteborg och var färdigt 1663; längd 48 meter, bredd 12 meter; i storm 5 juni (1676) slet sig skeppet från sina förtöjningar, grundstötte och sjönk på 16 meters djup; djup 7–16 meter",
      "last": null,
      "myndighet": false
    }
  ],
  "arholma": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html",
      "org": "lansstyrelsen.se",
      "vad": "förvaltare Skärgårdsstiftelsen, markägare Skärgårdsstiftelsen, staten och privata; \"lek- och uppväxtplatser för fisk\"; mjuka lerbottnar, skärgårdsgrund och sandbottnar; öarna hyser flera häckande rovfåglar; lundmiljöer med rik kärlväxt- och svampflora",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/arholma-nord",
      "org": "sfv.se",
      "vad": "anläggningen stod färdig 1968; bergrum \"i fyra nivåer\" med \"stridsledningscentral, kraftaggregatsrum, verkstäder, logement, kök med kantin, sjukvårdrum och operationssal\"; ca 110 man; 10,5 cm kustartilleripjäs; sista kanonskottet 1992; statligt byggnadsminne våren 2007; SFV tog över förvaltningen 2008",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://sfv.se/upptack-mer/kulturvarden/sok-innehall/kulturvarden-2-2020/en-hallbar-utpost",
      "org": "sfv.se",
      "vad": "vattenbristen 2018; vattnet tas \"direkt från Östersjön och filtreras, avsaltas, renas och mineraliseras\", anläggningen placerad i bergrum; Arholma Nord har \"totalt 75 bäddar, utspridda på sex hus\"; \"Större delen av ön är naturreservat\"; cirka 50 personer bor permanent på ön",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://arholmahandel.se/cykeluthyrning/",
      "org": "(hämtad 2026-08-06)",
      "vad": "",
      "last": "2026-08-06",
      "myndighet": false
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/batteri-arholma--upplevelsemuseum/",
      "org": "norrtalje.se",
      "vad": "Anläggningen byggdes för Kalla kriget och stod klar 1968; På ön Arholmas norra spets och gömd i berget; Den visas av säkerhetsskäl endast genom guidade turer",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/arholma/",
      "org": "skargardsstiftelsen.se",
      "vad": "landskapet brukats i hundratals år; åkrar, strandängar, hagmarker och skogspartier; på Arholma är kor våra bästa naturvårdsarbetare, de hjälper till att hålla markerna öppna; Bull-Augusts gård är en klassisk roslagsgård som idag fungerar som vandrarhem",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-arholma/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Arholma markerar den nordligaste punkten på den 270 km långa Stockholm Archipelago Trail; etappen anges som Medel 13.4 km; start vid kajen på Arholma; leden passerar Bull-Augusts gård, kyrkan och båken",
      "last": null,
      "myndighet": false
    }
  ],
  "orno": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sundby.html",
      "org": "lansstyrelsen.se",
      "vad": "Med start vid Sundby gård finns en drygt sex kilometer lång, lättvandrad rundslinga. På grusvägar och stigar går du igenom naturreservatets uråldriga odlingslandskap. Slingan är till stora delar tillgänglig för barnvagn eller rullstol, men tyvärr inte hela vägen runt. Här har marken brukats sedan 1400-talet.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norra-skogen.html",
      "org": "lansstyrelsen.se",
      "vad": "Vid Kvarnbacken mellan Nybysjön och Hemträsket låg på 1700-talet en vattenkvarn. I dag finns inga spår kvar.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/stora-och-lilla-sandbote.html",
      "org": "lansstyrelsen.se",
      "vad": "Skyddat sedan: 1938 Storlek: 21 hektar ... Markägare: Skärgårdsstiftelsen / En av de gamla stugorna är ett fiskartorp från 1700-talet som byggts upp efter en brand 2001 efter originalritningar och med gamla metoder och ställts i ordning som museum. Invid hamnen visas även ett båtbyggarmuseum. / Öarna donerades till Naturskyddsföreningen 1941 av Anna Lindhagen ... Anna hade fått området naturminnesförklarat redan 1938.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c3749289/1732517028266/Förorenade",
      "org": "områden - inventering av gruvbranschen i Stockholms län.pdf",
      "vad": "De största gruvorna var Härsbacka i Österåkers kommun och Lugnet på Ornö i Haninge kommun. / Ornö, Lugnets fältspatsbrott ... Ett av länets största fältspatsbrott.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/",
      "org": "haninge.se",
      "vad": "sevärdheter: \"orkidéerna vid Mane äng\", \"gravfält från bronsåldern vid Hässelmara\", \"ruinerna efter öns första säteriet\", \"bergarter på Ornöhuvud\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-orno/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Det är en ö med ungefär 300 bofasta året om. / Ornö har vackra skogar, klipphällar, orkidéer, tolv injöar och två naturreservat. / Under 1500-talet fanns ett 30-tal gårdar och torp, under 1800-talet hade dessa mer än fördubblats. 1719 brändes mer eller mindre hela Ornö ner under Rysshärjningarna. / Under tidigt 1900-tal styckade och sålde Sundby Säteri mark för fritidsboende.",
      "last": null,
      "myndighet": false
    }
  ],
  "landsort": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html",
      "org": "lansstyrelsen.se",
      "vad": "skyddsform \"naturvårdsområde\"; förvaltare Länsstyrelsen; markägare staten; karaktär \"skärgård, lövskog, kulturmiljö\"; björk och al dominerar, begränsad tallskog; arter vitoxel, åkerbär och idegran; ejder dominerar sträcket, även sädgås, prutgås och sångsvan",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard",
      "org": "sfv.se",
      "vad": "Under 1930-talet anlades ett kustartilleribatteri på Landsort; ERSTA-batteriet byggdes 1974–78 som ett fyravåningshus av stål inuti berget, konstruerat för att kunna stå emot kärnvapenangrepp, statligt byggnadsminne 2018",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.sjofartsverket.se/en/about-us/fyrar-och-kulturfastigheter/visningsfyrar/landsort--the-oldest-swedish-built-lighthouse/",
      "org": "sjofartsverket.se",
      "vad": "The present lighthouse was built in 1686; metre-thick walls; The Russians turned up in 1719 and set fire to Landsort; Landsort is located on the island of Öja, some 90 km south of Stockholm; beskrivs som one of the most substantial lighthouses that we have in Sweden",
      "last": null,
      "myndighet": true
    },
    {
      "url": "http://www.landsort.com/?page_id=138",
      "org": "landsort.com",
      "vad": "1820 övergång till rovoljelampor med försilvrade speglar; 1839 staten inlöser fyren och Mauritz Enegren blir första fyrmästare; 1844 antas Sofia Charlotta Löfström som kvinnligt biträde; 1870 påbörjas ombyggnad med konisk fyr ovanpå stenfyren; 1909 monteras Lux-brännare",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/landsort",
      "org": "nynashamn.se",
      "vad": "20 bofasta på ön, men sommartid mångdubblas ofta befolkningen; ön har tre hamnar — Österhamn, Västerhamn och Norrhamn; Batteri Landsort är en underjordisk försvarsanläggning från kalla kriget, nu ett museum; Hela ön är naturskyddsområde; På Landsorts fågelstation dokumenteras och ringmärks över 12 000 fåglar varje år",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://visitlandsort.se/resa-till-landsort/",
      "org": "visitlandsort.se",
      "vad": "Buss 852 till Torö, sista hållplatsen Ankarudden. Alla båtturer passar bussen; Waxholmsbolaget/Landsortstrafiken AB trafikerar Landsort . Båtbenet ~30 min uppmätt mot ResRobot 2026-08-05: färja 29-1 Ankarudden 07:20 → Landsort 07:50 (inte ~1 h som stod här tidigare).",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "furusund": [
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/",
      "org": "Trafikverket",
      "vad": "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård; Färjeledens längd är 600 meter; överfartstiden är fyra minuter; Resan med vägfärjan är avgiftsfri",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://furusund.se/hamnen/",
      "org": "Furusund Hamn",
      "vad": "I vår gästhamn finns plats för upp till hundra båtar, med toaletter, duschar, bastu, el, vatten och tvätt",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://hotellfurusund.se/historia/",
      "org": "Hotell Furusund",
      "vad": "hovjuveleraren Christian Hammer (1818-1905) som köper ön 1882 och omvandlar den till ett sommarparadis, som med sina badhus, pittoreska villor och vackra promenadstråk attraherade så väl societeten och kungligheter, konstnärer och författare",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/section-furusund/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Since the mid-19th century, Furusund has grown into a popular—and originally exclusive—vacation spot; struken.",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "blido": [
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/batsmanstorpet--blido-sockens-hembygdsforening/",
      "org": "Norrtälje kommun",
      "vad": "Båtsmanstorpet från 1730-talet på Blidö är inrett som det såg ut på den siste båtsmannens tid; Bromskärsvägen 2, Oxhalsö; Hösten 2021 invigs en Bagarstuga samt Silversmedens hus med utställningar och aktiviteter kopplade till Yngve Bergers konstnärskap; Sommartid arrangeras aktiviteter som byavandringar, utställningar m m.",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/",
      "org": "Trafikverket",
      "vad": "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård; Färjeledens längd är 600 meter; överfartstiden är fyra minuter; Resan med vägfärjan är avgiftsfri",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/",
      "org": "Trafikverket",
      "vad": "Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård; Färjeledens längd är 530 meter; överfartstiden är fyra minuter; Resan med vägfärjan är avgiftsfri",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.hembygd.se/blido/about",
      "org": "Blidö sockens hembygdsförening",
      "vad": "Hembygdsgården består alltså av fyra hus: Båtsmanstorpet, fähuset, Silversmedens hus och Bagarstugan; fähuset är en så kallad 'en ko-ladugård', som var avsedd just för en ko",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "nattaro": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html",
      "org": "lansstyrelsen.se",
      "vad": "Nåttaröfladen har med sina många små kobbar och skär ett rikt fågelliv ... För att skydda fågellivet råder tillträdesförbud mellan 1 februari och 15 augusti. / föreskrifterna räknar upp bland annat Östra Rödko, Långholmen, Grönborgen, Båten, Vittskär, Gjusskär, Brandholmen, Björkskär, Boskär, Rönnkobben, Tärnkobben och Grenkullen",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/nattaro/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Nåttarö ligger i Stockholms södra skärgård mellan Utö och Landsort. / Nåttarö är också en perfekt plats för höstsurfing.",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-nattaro/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Är du äventyrlig och stark kan du ta dig längs grusvägen norrut (1,5 km) förbi Drottninggrottan till Nåttarö Storsand. En fin plats att upptäcka och där det är långgrunt. / Vid Ångbåtsbryggan möter du skärgårdsidyllen direkt. Vid kajkanten är det en fin badstrand.",
      "last": null,
      "myndighet": false
    }
  ],
  "namdo": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Skyddat sedan: 2025; Storlek: 25 300 hektar. 97 procent av ytan består av vatten; I nationalparken finns 1 353 öar, kobbar och skär; Nämdöskärgården är vår första svenska marina nationalpark i Östersjön; Förvaltare: Länsstyrelsen i Stockholms län",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/om-oss/aktuellt/nyheter-och-pressmeddelanden/2025/juni/namdoskargarden-blir-sveriges-31a-nationalpark/",
      "org": "Naturvårdsverket",
      "vad": "Nämdöskärgården blir Sveriges 31:a nationalpark (nyhet 2025-06-23); Den omfattar en areal på 25 300 hektar varav 97 procent är hav; drygt 1 300 öar, kobbar och skär; landets andra nationalpark med marint fokus och den första i Östersjön",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000445278",
      "org": "Riksantikvarieämbetet",
      "vad": "knuttimrat kapell på Nämdö efter 1607, nytt kapell 1701–1702, kapell vid Östanvik färdigt 1798; \"Nämdö kyrka invigdes hösten 1876\"; stilen är nygotisk med hög takresning, torn och spetsbågade fönster; \"Trästomme, granitsockel samt svartmålat plåttak\"; \"Numera är kyrkan enhetligt vitmålad\"",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/byggabomiljo/skargardnaturochparker/namdoskargardensnationalpark.4.18c983316e0536cb189c3ba.html",
      "org": "Värmdö kommun",
      "vad": "Den 17 juni 2025 röstade riksdagen i frågan, kort därefter beslutade regeringen att Nämdöskärgården blir Sveriges 31:a nationalpark; Nationalparksområdet ligger öster om ön Nämdö; Nationalparken omfattar det som tidigare var Bullerö och Långviksskärs naturreservat samt ett stort område hav utanför",
      "last": "2026-09-19",
      "myndighet": true
    }
  ],
  "svartso": [
    {
      "url": "https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf",
      "org": "varmdo.se",
      "vad": "Svartsö är en av de större öarna i Stockholms skärgård och befolkades troligen under medeltiden. Vid 1500-talets mitt fanns skattegårdar vid Ahlsvik, Skälvik och Svartsö; Ett av de äldsta husen på ön är det vackra stenhuset i Ahlsviks by, som bankokommissarie Johan Söderling lät bygga 1732; Ahlsvik köptes på 1720-talet av bankokommissarien Johan Söderling som lät uppföra en herrgård här 1732. Byggnadsmaterialet togs från tegelbruket på ön Hästnacken vilket han anlagt några år tidigare; Det f d missionshuset är ett av de äldsta missionshusen i skärgården, invigt 1880; Skolan byggdes 1897",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.svartso.se/att-gora",
      "org": "svartso.se",
      "vad": "14 km långa grusvägar; Cykel kan du antingen hyra på Svartsö lanthandel (Alsviks brygga) eller Svartsö hotell och vandrarhem",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://www.svartsolanthandel.se/cykeluthyrning",
      "org": "Svartsö Lanthandel",
      "vad": "Vid Ahlsviks brygga väntar Svartsö Lanthandel med cykel och karta över ön; Cykla sedan längs öns 14 km långa, vackra grusvägar",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "runmaro": [
    {
      "url": "https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf",
      "org": "Natur",
      "vad": "Strax sydväst om Gatan finns ett område som kallas Ryssflykten efter att ryska soldater slagit läger här under rysshärjningarna sommaren 1719 ... Ett hundratal fartyg och tusentals man övernattade ett par nätter på Runmarö i sluttningen mot fjärden. Här finns än i dag ett tiotal ryssugnar",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c3749289/1732517028266/Förorenade",
      "org": "områden - inventering av gruvbranschen i Stockholms län.pdf (Länsstyrelsen Stockholm)",
      "vad": "Sulfidmineralen zinkblände och blyglans bröts på Runmarö i Stockholms skärgård. En mängd av 4 771 ton zinkmalm utvanns i början av 1900-talet. / Värmdös gruvor är med få undantag belägna på Runmarö. Här finns cirka sju sulfidmalmsbrott eller större skärpningar. De tre gruvorna Kilagruvorna, Söderbygruvorna och Vånögruvorna, alla belägna på Runmarö",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://xn--runmarhembygdsfrening-mecj.se/lotsbyar/",
      "org": "(Runmarö Hembygdsförening)",
      "vad": "år 1703 kom \"nio av nitton Stockholmslotsar\" från Runmarö; år 1797 var \"49 av 68 Stockholmslotsar\" bosatta på ön; lotsstationen Berghamn mellan Värmdö och Runmarö etablerades 1741 och upphörde i början av 1900-talet; då byggdes \"den lilla lotsutkiken på berget i Styrsvik\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.runmaro.se/om",
      "org": "Runmarö",
      "vad": "Från Stavsnäs Vinterhamn finns det gott om reguljära förbindelser till Runmarö med Waxholmsbolaget eller andra båtbolag; Utgår du från Stockholm tar du buss 433 eller 434 från Slussen. Bussresan till Stavsnäs tar ca 50 minuter",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-runmaro/",
      "org": "Stockholm Archipelago Trail",
      "vad": "Du åker till Runmarö flera gånger om dagen från Stavsnäs eller Sandhamn, året om.",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/v16.pdf",
      "org": "Waxholmsbolaget linje 16",
      "vad": "16A STAVSNÄS — SANDHAMN — HAGEDE, gäller 2 april–18 juni och 17 augusti–12 december 2026; Stavsnäs 07.00 → Styrsvik (Runmarö) 07.05, 09.45 → 09.50, 14.45 → 14.50, alltså ca 5 minuter",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "fejan": [
    {
      "url": "https://skargardsstiftelsen.se/omraden/fejan/",
      "org": "Skärgårdsstiftelsen",
      "vad": "I slutet av 1800-talet anlades här en karantänstation för fartyg som misstänktes bära smittsamma sjukdomar, och de välbevarade byggnaderna berättar än idag om öns unika förflutna; Under 2026 håller vandrarhemmet stängt; Fejan är inte naturreservat: ön finns inte med i Norrtälje kommuns lista över skyddad natur (kontrollerat 2026-09-14) och tidigare tips om naturreservatsregler är borttaget",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "lido": [
    {
      "url": "https://kund.printhuset-sthlm.se/wa/v31.pdf",
      "org": "Waxholmsbolaget linje 31",
      "vad": "31A RÄFSNÄS — TJOCKÖ — FEJAN, gäller 2 april–18 juni och 17 augusti–12 december 2026; turer som angör Lidö: Räfsnäs 07.55 → Lidö 08.05 (10 min), 10.05 → 10.15 (10 min), 09.45 → 10.00 (15 min), 17.35 → 17.50 (15 min); turen 06.40 angör inte Lidö (07.05 är Fejan); ingen bilfärja till ön",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "vaddo": [
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h637.pdf",
      "org": "SL buss 637 Norrtälje–Singö",
      "vad": "går från Norrtälje via Väddö kyrka, Älmsta och Grisslehamn till ändhållplatsen Ellans vändplan",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h676676x.pdf",
      "org": "SL buss 676 Stockholm–Norrtälje",
      "vad": "Tekniska högskolan–Norrtälje busstation",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "yxlan": [
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/",
      "org": "Trafikverket",
      "vad": "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård; Färjeledens längd är 600 meter; överfartstiden är fyra minuter; Resan med vägfärjan är avgiftsfri",
      "last": "2026-09-19",
      "myndighet": true
    }
  ],
  "svenska-hogarna": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html",
      "org": "lansstyrelsen.se",
      "vad": "cirka 35 kilometer (cirka 19 nautiska mil) öster om Möja / sedan gammalt en fyrplats. På Storön finns flera stigar runt Ytterhamnen, Innerhamnen, fyren och öns anläggningar . Heidenstam, 1855, 1874, 1966, 1968 står inte på sidan; strukna.",
      "last": "2026-09-19",
      "myndighet": true
    }
  ],
  "tynningo": [
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/tynningoleden/",
      "org": "Trafikverket",
      "vad": "Tynningöleden går mellan Lagnö på Värmdö och Tynningö i Stockholms skärgård; Färjeledens längd är 1000 meter lång; Resan med vägfärjan är avgiftsfri",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h4.pdf",
      "org": "Waxholmsbolaget linje 4",
      "vad": "4A STOCKHOLM — VAXHOLM — RAMSÖSUND — ÅLSTÄKET, gäller 2 april–18 juni och 17 augusti–12 december 2026; angör Norra Tynningö: Strömkajen 07.45 → Norra Tynningö 08.59 (1 h 14 min), 11.00 → 12.23 (1 h 23 min); Vaxholm avg. 08.52 → Norra Tynningö 08.59 (7 min), 12.15 → 12.23 (8 min)",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "marstrand": [
    {
      "url": "https://www.marstrandsgasthamn.se/sv/",
      "org": "drift av Kungälvs kommun",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/",
      "org": "Kungälvs kommun",
      "vad": "bekräftar att färjan mellan Koön och Marstrand drivs av kommunen och att biljetter och dispensansökningar hanteras där",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand",
      "org": "Statens fastighetsverk",
      "vad": "bekräftar provisorisk skans efter freden i Roskilde 1658, mindre stenfästning från 1660, bygget 1682 under Erik Dahlberg, färdig 1860, \"en av Europas starkaste fästningar\", statligt byggnadsminne förvaltat av SFV sedan hösten 1993",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.kungalv.se/trafik--gator/parkering/parkeringsplatser-i-marstrand/",
      "org": "Besöksparkering i Marstrand",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://carlsten.se/en/carlsten-waffle-cafe/",
      "org": "Carlstens fästning",
      "vad": "bekräftar caféet vid fästningens entré, utbudet av våfflor, pajer, baguetter och sallader samt att fästningsbiljett inte krävs",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://grandmarstrand.se/restaurang-tenan/",
      "org": "Grand Hotel Marstrand",
      "vad": "bekräftar Restaurang Tenan med \"vällagad à la carte, fisk och skaldjur samt klassiska rätter\"",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/produkter/marstrands-gasthamn/",
      "org": "gästhamnsdata (bryggorna G/H/D/E",
      "vad": "bekräftar kommunal gästhamn på sydöstra Marstrandsön, el och vatten som ingår i gästhamnsavgiften samt dusch och WC",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.hamnkrogenmarstrand.se/",
      "org": "Hamnkrogen Marstrand",
      "vad": "bekräftar namn, adressen Lilla Varvsgatan 20 samt rubrikerna KÖK & BAR och Butik",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/produkter/restaurang-tenan/",
      "org": "läget Rådhusgatan 2",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.kungalv.se/trafik--gator/kollektivtrafik/samlastning/",
      "org": "Samlastning Marstrand",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/kungalv/products/marstrand/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar att orten grundades på 1200-talet av Håkon Håkonsson, blev svensk 1658 och på 1500-talet var centrum för sillhandeln i Europa",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/marstrand/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar \"Sommarens seglingshöjdpunkt är när Match Cup Sweden avgörs första veckan i juli\" och \"Sveriges största gästhamn\"",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/kungalv/products/grand-hotel-marstrand/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar namnet, Rådhusgatan 2 på Marstrandsön och matsalarna Grand Tenan och Bakfickan",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/kungalv/products/marstrands-havshotell/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar läget på Koön intill färjeläget, spa, 144 rum och restaurangen Otto\\'s Vardagsrum & Kök",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/kungalv/products/marstrands-kurhotell/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar byggnaden som på 1800-talet inrymde kall- och varmbad, 39 rum, Kungsplanen på Marstrandsön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/produkter/marstands-wardshus/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar skaldjursplatåer och grillmat samt adressen \"Mitt på kajen\" på Marstrandsön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/produkter/johans-krog-marstrand/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar \"fransk bistro\" och adressen Kungsgatan 12",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.gasthamnsguide.se/omradesindelat/vastkusten/item/marstrands-gasthamn",
      "org": "tvättmaskin och torktumlare",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "smogen": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bekräftar bildat 1975, ca 292 hektar, förvaltas av Västkuststiftelsen, Bohusläns äldsta fyr på plats sedan 1842 med vit blixt var tolfte sekund, byggnadsminne 1935, Marmorbassängen och regelbundna badturer från Kungshamn sommartid",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/smogens-gasthamn",
      "org": "Sotenäs kommun",
      "vad": "bekräftar kommunal drift, ca 120 gästplatser, fastförtöjning, vattendjup 3–5 meter, servicen WC, färskvatten, el, wifi, tvättmaskin/torktumlare, sopor och dusch, hamnkontor öppet vecka 25–33 samt bokning via Dockspot",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatserhundbad/smogen.4.15eba9af15b0a9219ba31966.html",
      "org": "Sotenäs kommun",
      "vad": "bekräftar de tre badplatserna Sandö, Vallevik samt Herr- och dambadet i Makrillviken med angiven service",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/batarochhamnar/gasthamnar/smogensgasthamn.4.15eba9af15b0a9219ba328a8.html",
      "org": "Sotenäs kommun",
      "vad": "bekräftar kommunal drift och servicen \"WC, färskvatten, el, wifi, tvättmaskin/torktumlare, sopor och dusch\"",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vastsverige.com/sotenas/produkter/gasthamn-smogen/",
      "org": "ca 120 platser",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/artiklar/smogen/",
      "org": "första omnämnandet 1594",
      "vad": "bekräftar att Hotell Smögens Hafvsbad stod klart 1900 och tog emot sommargäster som kom för att bada tångbad och roa sig",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.smogenshafvsbad.se/restaurang/",
      "org": "Smögens Hafvsbad",
      "vad": "bekräftar hotell med spa och restaurang på Smögen med utsikt över havet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/produkter/smogenbryggan/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar \"1 km långt\", \"Sveriges mest besökta brygga\", caféer, krogar och butiker, båtturer till Hållö och Kungshamn samt hamnen använd av fiskare redan under mitten av 1500-talet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/sotenas/produkter/sea-lodge-smogen/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar namnet, adressen Nordmanshuvudet 1, 15 rum och restaurang med servering på bryggan",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/produkter/pensionat-bryggan/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar läget på Smögenbryggan, rum mot hamnen och bistro i sjöboden nedanför huset",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/produkter/glasscafet/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar namnet, adressen Smögenbryggan och servering av glass och lunch inne och ute med utsikt över hamnen, säsongsöppet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/sotenas/produkter/skarets-krog/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar krog och pianobar vid Smögenbryggan med café och bistro, \"Allt här är bakat och tillagat från grunden, med lokala råvaror som utgångspunkt\", Hamnen 1",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/sotenas/produkter/gostas-fiskekrog/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar fisk och skaldjur direkt från kajen samt adressen Fiskhamnsgatan 32",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "lysekil": [
    {
      "url": "https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser",
      "org": "Lysekils kommun",
      "vad": "bekräftar \"salta och friska bad från klippor till sandstränder med lättillgängliga parkeringar, toaletter samt kiosk\" och att Pinnevik i Lysekil och Bökevik i Fiskebäckskil namnges",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stangehuvud.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bekräftar ca 48 hektar, bildat 1983, förvaltas av Lysekils kommun tillsammans med Kungliga Vetenskapsakademien som skänkte marken under stenindustrins glansdagar, rundhällar med isräfflor och pegmatitgångar, Galleberget lämnat orört av kulturhistoriska skäl, stigar med trappor och broar samt bad och fiske längs västsidan",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/gullmarn.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bekräftar \"en äkta tröskelfjord\", största djup cirka 125 meter nära Alsbäck en mil från mynningen, tröskel på omkring 45 meters djup, djurarter i djupbassängen som saknas i fjorden i övrigt, bildat 1983, ca 16 499 hektar, förvaltas av Västkuststiftelsen",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lysekil.se/uppleva-och-gora/kultur/kulturhistoria-och-kulturarv/industrihistoria.html",
      "org": "bohusgranitens roll i Lysekil",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.bohuslansmuseum.se/samlingar-och-historia/gamla-historiska-artiklar/badorten-lysekil/",
      "org": "Bohusläns museum",
      "vad": "bekräftar badinrättning 1847, första varmbadhuset som däckshus från ett fartyg, första egentliga badhuset 1849, Carl Curman som badläkare, nytt varmbadhus och kallbadhus 1864, Havsbadrestaurangen 1869, Societetshuset 1872 utbyggt 1882, Curmans villor som byggnadsminnen, gångbryggan Trampen och kallbadhuset från 1911",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/en/akvariet/about-the-aquarium/",
      "org": "Havets Hus",
      "vad": "bekräftar att akvariet visar arter från Gullmarsfjorden och Västerhavet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/akvariet/om-akvariet/",
      "org": "Havets Hus",
      "vad": "bekräftar 25 akvarier, hälleflundror, rockor och havsaborrar i tunnelakvariet samt det grunda strandområdet med alger och sand; omkring 100 arter från Gullmarsfjorden och Västerhavet enligt sidans meta-beskrivning",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/strandflickornas-havshotell/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar namnet, Turistgatan 13 i Lysekil, sekelskifteshotell vid vattnet med spa, restaurang och privat brygga",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/lysekil/produkter/hotell-lysekil/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar namnet, Rosvikstorg 1 i Lysekils södra hamn, anor från 1952 och restaurangen My Italian Friend i huset",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/siviks-camping-eng/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar läget 4 km norr om Lysekils centrum, havsnära, med campingplatser och stugor",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/grand-hotel-lysekil/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar drift sedan 1878 och adressen Kungsgatan 36 i centrala Lysekil",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/lysekil/produkter/kommunala-gasthamnar/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar att Lysekils kommun driver fem gästhamnar och att Fiskhamnens ligger mitt i Lysekil med gångavstånd till butiker och restauranger samt café och sjömack",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/brygghuset/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar fisk- och skaldjursrestaurang med säsongsmeny i Fiskebäckskil på Skaftö, knuten till Slipens Hotell",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/norra-hamnen-5/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar adressen Norra Hamngatan 5 i Lysekil och menyn med skaldjur, fiskrätter, inlagd sill och moules frites",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "kosterhavet": [
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/djurliv",
      "org": "Djurliv",
      "vad": "Djurliv — bekräftar \"omkring 6 000 olika arter\", \"Närmare 300 av dem finns inte någon annanstans i Sverige\", Kosterfjordens djupränna, \"Västerhavets största bestånd av knubbsälar\" och \"ett av Sveriges två kända växtplatser för revbildande korall, ögonkorall\"",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://sverigesnationalparker.se/park/kosterhavets-nationalpark/nationalparksfakta",
      "org": "Fakta om parken",
      "vad": "bekräftar bildad 9 september 2009, \"38 900 hektar, varav 860 hektar land\", kommunerna Strömstad och Tanum samt Länsstyrelsen Västra Götaland som förvaltare",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark",
      "org": "sverigesnationalparker.se",
      "vad": "bekräftar \"Kosterhavets nationalpark är Sveriges första marina nationalpark och består främst av vatten och undervattensmiljöer\"",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/sevardheter/naturum-kosterhavet",
      "org": "sverigesnationalparker.se",
      "vad": "bekräftar utställningar, filmer och bildspel, klappakvarium, guidningar, föredrag, visningar och turer samt kartor",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vasttrafik.se/info/kosterbatarna/",
      "org": "Västtrafik",
      "vad": "bekräftar linje 899, cykel ombord i mån av plats och biljett via Västtrafik To Go eller av däcksman ombord",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vastsverige.com/en/stromstad/articles/faq-koster/",
      "org": "avgång från Strömstads norra hamn",
      "vad": "bekräftar \"both are virtually car-free\", Sydkoster 8 kvadratkilometer och Nordkoster 4 kvadratkilometer, \"it is only biking on South Koster. North Koster is not bike friendly\", stränderna Rörvik, Kilesand, Västra Bryggan, Basteviken och Norrvikarna samt linfärjan Västra Bryggan–Långegärde bemannad sommartid",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.ekenashavshotell.se/en",
      "org": "egen webbplats",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/ekenas-havshotell/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar namnet, läget på Sydkoster i Kosterhavets marina nationalpark samt rum och lägenheter med havsutsikt",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/reservatet-nordkoster/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar \"Kosteröarnas enda campingplats för tält samt sju ekologiska stugor\", läget på Nordkosters nordöstra kust och att tältplatserna måste förbokas",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/stromstad/produkter/klapphagen-koster/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar läget vid Ekenäs på Sydkoster, sex sviter med terrass, glampingtält, Gårdshuset och restaurang med mat över öppen eld",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/stromstad/produkter/kostergarden/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar läget vid sandstranden Kilesand på Sydkoster, stugor, lägenheter och sviter samt restaurang med två uteserveringar",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/gasthamn-ekenas/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Ekenäs gästhamn — bekräftar namnet och läget på Sydkoster, restauranger, hotell och cykeluthyrning vid bryggan, besökscenter för Kosterhavets nationalpark intill samt ICA ca 1,5 km bort öppet året runt",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/gasthamn-nordkoster/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar lägena Bopallen (Västra Bryggan) och Vettnet, restauranger vid Västra Bryggan och livsmedelsaffären \"Affärn på Nord\" sommartid",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/strandkanten/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar familjerestaurang i renoverad sjöbod vid stranden på Nordkoster, Kalkemyrsvägen 4, rätter från havet, utsikt över Kostersundet och presentbutik intill",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/kosters-rokeri/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar läget vid Ekenäs brygga på Sydkoster bredvid naturum samt färsk och rökt fisk med tillhörande fiskaffär",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/sundets-skaldjurscafe/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar läget vid Långegärde brygga på Sydkoster, färska skaldjur och säsongsöppet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/things-to-do/explore-the-west-coast-by-boat/ferry-lines/route-map-stromstadkoster/",
      "org": "turlistkarta Strömstad–Koster som visar att Långegärde ligger på Sydkoster",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "grebbestad": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/tjurpanneomradet.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bekräftar bildat 1968, ca 499 hektar, förvaltas av Västkuststiftelsen, öppet och kargt landskap med branta klippstränder och ljunghed samt vandring i flera längder",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/otteron.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 1967, ca 629 hektar, Västkuststiftelsen, ett av de mest välbesökta reservaten bland Bohusläns öar, stigar, naturhamnar, orkidéer, lövskog, bronsåldersrös, en kopia av en runsten med den längsta urnordiska runskrift som påträffats och taxibåt från Grebbestad",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html",
      "org": "Tanums kommun",
      "vad": "bekräftar Ostronakademien bildad 2004, NM i ostronöppning i maj, Ostronets dag i september, Kalvö Ostron handplockat sedan 1600-talet, Grebbestads Ostron med EU-skyddad ursprungsbeteckning sedan maj 2023 och 50 000–60 000 ostron per år samt Havstenssunds Ostron som enda kommersiella odlingen i Skandinavien med säsong september–maj",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vitlyckemuseum.se/",
      "org": "Vitlycke museum drivs av Västra Götalandsregionens kulturförvaltning",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145",
      "org": "Falkerödsleden tre kilometer lång",
      "vad": "bekräftar första moderna omnämnandet i början av 1600-talet, utvecklingen under 1800-talet, stenhuggarna i slutet av 1800-talet, gästhamnen som fullserviceanläggning med gott om båtplatser samt att Evert Taube skrev \"Så länge skutan kan gå\" på Otterön sommaren 1954",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/tanumstrand/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar namnet TanumStrand, postadress 457 95 Grebbestad, hotellrum och stugor med havsutsikt, nordiskt spa samt restaurangen Latitud 58°",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/rosenhill-bb/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar namnet, Sövallsvägen 5 i Grebbestad, Grebbestads gamla skolbyggnad renoverad och öppnad 2009 samt ca 500 m från centrum",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/grebys-hotell-o-restaurang/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar Strandvägen 1 i Grebbestad, nio individuellt inredda rum och restaurang med fisk och skaldjur från lokala vatten",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/accomodation/marinas/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar ordagrant \"Grebbestad Seaport Guest Harbour. 30 berths. WC, shower, waste disposal, water and fuel refill.\" samt \"TanumStrand Guest Harbour. Just south of Grebbestad. 250 berths directly adjacent to TanumStrand SPA & Resort. Toilet, shower, washing machine, dryer, shore power, and WiFi.\"",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/everts-sjobod/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar namn och läge Grönemadsvägen 61 i Grebbestad, ostronsafari och skaldjursupplevelser med servering i en fiskebod från 1800-talet samt sex dubbelrum",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/restaurant-telegrafen/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar namnet, Nedre Långgatan 28 i Grebbestad, husmanskost och à la carte med kött och fisk samt drift sedan 2002 i en gammal telegrafstation",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/cafe-skafferiet-grebbestad/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bekräftar Nedre Långgatan 40 i Grebbestad och att stället fungerar både som café och restaurang",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "fjallbacka": [
    {
      "url": "https://gasthamnsbolaget.se/en/guest-harbours-in-bohuslan/fjallbacka-guest-harbour/",
      "org": "Gästhamnsbolaget (driver Tanums gästhamnar på uppdrag av kommunen)",
      "vad": "adress Ingrid Bergmanstorg 457 40 Fjällbacka, toaletter, duschar och el; drivmedel anges inte",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 2011, cirka 18 300 hektar, 365 öar och skär, turbåtar från bland annat Fjällbacka och Hamburgsund, ett av Sveriges mest värdefulla marina områden tillsammans med Kosterhavets nationalpark",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html",
      "org": "Tanums kommun",
      "vad": "sillfiskeperioderna, spannmålsfrakt till England, ansjovisen uppfanns i Fjällbacka på 1860–1880-talen och fick utmärkelser på internationella utställningar",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.brygganfjallbacka.se/",
      "org": "Bryggan Fjällbacka",
      "vad": "listar Bryggan Café & Bistro, Restaurant Matilda, Everts Tapasbar och The Harbour House på Ingrid Bergmans Torg",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://fjallbackagk.se/sandbunkern-bistro-deli/",
      "org": "Fjällbacka Golfklubb",
      "vad": "Sandbunkern Bistro & Deli i klubbhuset, Långö Rörvikarna 1",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://shfjallbacka.se/en/restaurants/",
      "org": "Stora Hotellet Fjällbacka",
      "vad": "Restaurant Mamsell är hotellets restaurang, Galärbacken 2, Fjällbacka",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "trappor från Ingrid Bergmans Torg, Stora och Lilla Vetteberget, fastkilat klippblock som tak, namnet efter Oscar II:s besök 1887 och hans signatur på bergväggen, filmscener från Ronja Rövardotter, utsikt över både övärld och fastland",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/fjallbacka/guided-tours-in-fjallbacka/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "guidade turer om Bergmans arv och Läckbergs mordvandring, arrangörer Fjällbackaguiderna och Kustguiden, start vid Ingrid Bergmans torg",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/aktiviteter/paddling/paddla-fjallbacka/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "rutten namnger Kråkholmen, Köttöarna, Porsholmen, Valö, Dannholmen och Hjärterön i skyddat vatten",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/accomodation/marinas/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Fjällbacka Guest Harbour ligger intill Ingrid Bergmans torg och har toalett, dusch och landström",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/vettebergsleden/?site=145",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "tätortsnära rundslinga med blå markering, del av Kuststigen, start lämpligen vid Ingrid Bergmans torg, varierad terräng, svårighetsgrad och längd",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/stora-hotellet-fjallbacka/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Galärbacken 2, 457 40 Fjällbacka; hotellets egen webbplats shfjallbacka.se anger Restaurant Mamsell i huset",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/badholmens-vandrarhem/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "adress Badholmen, 45741 Fjällbacka, rum med våningssängar",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "grundsund": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vagerod.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 2003, cirka 121 hektar i Lysekils kommun, kuperat med blockrika sluttningar och lodräta klippor, ek och bok, krattekskog, gräsarten råglosta, känt för sina blåsippor, förvaltas av Västkuststiftelsen",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/gullmarsleden/",
      "org": "Trafikverket",
      "vad": "mellan Finnsbo i Lysekils kommun och Skår i Uddevalla kommun, 1 850 meter, överfarten tar tio minuter, resan med vägfärjan är avgiftsfri",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.grundenshotell.se/",
      "org": "Grundéns hotell",
      "vad": "adress Furtofta 204, 451 79 Grundsund, hotell vid infarten till Grundsund",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/skafto/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Grundsund beskrivs som en aktiv fiskehamn med en lång hamnkanal som byn är byggd kring",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "sillperioden på 1700-talet, byn förblev i allt väsentligt en fiskehamn medan andra fiskelägen blev badorter i slutet av 1800-talet, fisket fortfarande ekonomiskt viktigt, stora delar av tv-serien Saltön inspelade i Grundsund",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/lysekil/produkter/skafto-grundsunds-kyrka/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "kapell 1799, torn 1818, ombyggnad 1893 av Fredrik Falkenberg med förlängning åt öster och nytt tresidigt avslutat kor, breda korsarmar, 400 platser, gospelkonserter i juli och julkonserter i december",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/things-to-do/explore-the-west-coast-by-boat/ferry-lines/route-map-lysekiluddevallaljungskile/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Västtrafiks linje 847 Lysekil–Fiskebäckskil–Östersidan på Skaftö, året runt",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/leder/skafto---vagerod/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "2,4 km, följer delvis den blåmarkerade Kuststigen, gamla landsvägen, bok- och ekskog, bäver i Edsvattnet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/skafto/bo/rum--och-stugformedling/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Skaftö Vandrarhem förmedlar rum, stugor och kaptenshus på Skaftö, läge Grundsund",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/skafto-gasthamn-grundsund/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "läge på sydvästra Skaftö i en gammal fiskeby, förtöjning längs Östra kaj och med akterlinor vid Västra kaj, service; drivmedel anges inte",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/skafto/artiklar/premiar-for-krogens-fisk--krog/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "ligger vid torget i Grundsund, fisk och skaldjur kombinerat med fiskbutik",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/lysekil/produkter/pelles-rokeri/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "adress Östra kajen 20, 451 79 Grundsund, restaurang med havsutsikt samt Terrassen Pizza & Loungebar; på samma sida Hugos Bu, Bar & Café i en genuin sjöbod från 1905",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/skafto---eng/food--beverage/eat-on-skafto/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "listar Smultron & Tång bland Skaftös serveringar med orten Grundsund",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "hamburgsund": [
    {
      "url": "https://gasthamnsbolaget.se/en/guest-harbours-in-bohuslan/hamburgsund-guest-harbour/",
      "org": "Gästhamnsbolaget (driver Tanums gästhamnar på uppdrag av kommunen)",
      "vad": "Skolvägen 5, 457 45 Hamburgsund, platser vid två huvudkajer samt Hjalmars Kaj, tvättstuga på fastlandet, sugtömning av porta potti på Hamburgö; drivmedel anges inte",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/kulturmiljoer/greby-gravfalt.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Bohusläns största gravfält strax norr om Grebbestad, cirka 200 gravar, 68 runda högar, 54 långhögar samt 47 runda och 12 ovala stensättningar, 200 till 600 år efter vår tideräknings början, 28 resta stenar upp till 4,5 meter, fynd från undersökningarna 1873 av brända ben, glaspärlor, benkammar och sländtrissor",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "turbåtar till Väderöarna från bland annat Fjällbacka och Hamburgsund",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/hamburgsund.4.7664b4813898b7df9844de1.html",
      "org": "Tanums kommun",
      "vad": "traditionen säger att tingsplatsen för Viken under medeltiden låg vid sundets södra del, Viken det administrativa område som bestod av norra Bohuslän och det nu norska området runt Oslofjorden, namnet av öns medeltida namn Hornbora, den hornförsedda, utan koppling till tyska Hamburg, sillfiske och trankokerier 1500–1700-tal, stenhuggeri och fraktsegling 1800–1900-tal, ett av Bohusläns största skutsamhällen i början av 1900-talet, hemmahamn för stor del av fiskeflottan",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/hamburgsundsleden/",
      "org": "Trafikverket",
      "vad": "linfärja Hamburgsund–Hamburgö —  och Länsstyrelsen Västra Götaland, Greby gravfält",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/hamburgsund/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Hornborgs borgruin med storhetstid enligt fynden omkring 1450–1530, utgrävd i början av 1900-talet med fynd av bakstycket till en kanon, kanonkulor och andra vapen, vikingamarknaden Hornbore Ting varje sommar, konstskolan Gerlesborgsskolan",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/accomodation/marinas/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "50 platser i Hamburgsund och på Hamburgö i sundet, toalett, dusch, tvättmaskin, torktumlare och landström",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/hamburgsund-bed-and-breakfast/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "adress Udden 1, 45745 Hamburgsund, intill färjestationen, tio dubbelrum",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/kustnara-bb-och-konferens/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "adress Heestrand Rådalen 10, 45747 Hamburgsund, drivs av Gästhamnsbolaget Väst AB, cirka 5 km från Hamburgsund",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/rorvik-family-camping/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "adress Rörviksängen 15, 45747 Hamburgsund, 1,5 km söder om Hamburgsund, stugor, rum, husvagns- och tältplatser",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/hjalmars/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "adress Strandvägen 8, 45745 Hamburgsund, läge vid kajen, mat med lokala råvaror",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "karingon": [
    {
      "url": "https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn",
      "org": "Orust kommun",
      "vad": "125 platser, djup cirka 4 meter, servicehus med toalett, dusch, tvättmaskin och torktumlare, sugtömningsstation 1 april–31 oktober",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/bygga-bo-och-miljo/bygga-nytt-andra-eller-riva/kulturhistoriska-byggnader-kulturmiljoer",
      "org": "Orust kommun",
      "vad": "Käringön ligger inom riksintresse för kulturmiljövården, de flesta byggnaderna är q-märkta i detaljplan, varsamhetskrav och förvanskningsförbud enligt plan- och bygglagen gäller även utanför de orter där byggnaderna är skyddsmärkta, och bygglov kan krävas för annars lovbefriade åtgärder som staket, altaner, trädäck, attefallsåtgärder och solceller",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.karingon.se/",
      "org": "Hotell Käringön",
      "vad": "21 rum (enkelrum, dubbelrum, trebäddsrum, familjerum och juniorsviter) samt restaurang och bar, Käringöns Brygga",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.petersonskrog.se/",
      "org": "Petersons Krog",
      "vad": "krog på Käringön med lunch, à la carte och sällskapsmenyer",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/karingon/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "bilfri, smala gator med vita trähus, kyrkan omgiven av gräsmattor och planteringar, permanent bebodd 1596 av fiskarfamiljer, över 300 invånare under 1700-talets sillperiod, fördubblad folkmängd på 1800-talet, namnet av käring som benämning på ett litet stentorn eller kummel använt som sjömärke",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Västtrafiks personfärja linje 381 går till Gullholmen, Härmanö och Käringön, 5 minuter till Härmanö/Gullholmen och cirka 35 minuter till Käringön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/karingon/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "båtresan mellan klippor och kobbar tar inte mer än 40 minuter, ön är bilfri",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/karingon-gullholmen/eat-and-drink/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "listar Skafferiet, Creperiet och Karingo bland Käringöns serveringar",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "orust": [
    {
      "url": "https://www.orust.se/kommun-och-politik/kommunfakta",
      "org": "Orust kommun",
      "vad": "drygt 15 000 invånare och cirka 40 000 sommartid, cirka 2,8 mil i väst-östlig och cirka 2,5 mil i nord-sydlig riktning, västkustens största ö",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/bygga-bo-och-miljo/bygga-nytt-andra-eller-riva/kulturhistoriska-byggnader-kulturmiljoer",
      "org": "Orust kommun",
      "vad": "Käringön, Mollösund, Gullholmen och Härmanö är exempel på platser som ligger inom riksintresse för kulturmiljövården, de flesta byggnaderna q-märkta med strikta detaljplaneregler, varsamhetskrav och förvanskningsförbud enligt plan- och bygglagen även utanför de orter där byggnaderna är skyddsmärkta",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser",
      "org": "Orust kommun",
      "vad": "nio badplatser: Småholmarna i Henån, Sörkilen i Ellös, Hälleviksstrand, Kungsviken, Kattevik i Mollösund, Nösund, Svanesund, Slussen och Hagen i Stocken; simskola sommartid vid Småholmarna och flera badplatser som sköts av föreningar med kommunalt stöd",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/amnesomrade/upplevaochgora/gasthamnar/henansgasthamn.4.2f8c9bd513dca025875ec3.html",
      "org": "Orust kommun",
      "vad": "10 gästplatser, djup cirka 1–2,5 meter, el, dusch, toalett, ramp och sugtömningsstation 1 april–31 oktober; bensin och diesel anges som tillgångar i orten Henån",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/uppleva-och-gora/gasthamnar/mollosunds-gasthamn",
      "org": "Orust kommun",
      "vad": "sydvästspetsen av Orust, 100 platser, djup cirka 4 meter, el, dusch, toalett, tvättmaskin och torktumlare i servicehuset, sugtömningsstation 1 april–31 oktober; bensin och diesel anges som tillgångar i samhället Mollösund",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.hallberg-rassy.com/sv/varvet/varvets-historia",
      "org": "Hallberg-Rassy",
      "vad": "Harry Hallberg öppnade eget varv i Kungsviken på Orust 1943, nya lokaler byggdes i Ellös i mitten av 1960-talet, samgående med Christoph Rassys varv 1972 till Hallberg-Rassy Varvs AB, omkring 9 800 levererade båtar",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://najad.se/najad-yachts-moves-production-back-to-orust-following-the-acquisition-of-orust-yacht-service/",
      "org": "Najad Yachts",
      "vad": "produktionen flyttad tillbaka till Henån på Orust efter förvärvet av Orust Yacht Service, meddelat 2 november 2022",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/mollosund/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "sydvästra spetsen av Orust, sillfisket från 1500-talet och Bohusläns främsta fiskecentrum inom hundra år, fyren på Gallebergs udde, träskulpturen av fiskarkvinna med barn vid Klockeberget, kyrkan färdig 1866, väderkvarnen från 1700-talet i bruk till 1929, hamnen byggd under andra världskriget",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Västtrafiks personfärja linje 381 till Gullholmen, Härmanö och Käringön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/villa-frideborg/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "familjehotell och B&B, Åvägen 1, 473 32 Henån",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/prastgardens-pensionat/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Kyrkvägen 1, 47470 Mollösund, i en byggnad från 1893",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/kobbar-skar/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "stugförmedlare för Orust och Tjörn, Tyfta 560, 473 98 Henån",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/slussens-pensionat/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Slussen 415, 47392 Henån, pensionat med restaurang och konferens",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/hotel-varvet/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Ravinvägen 2, 474 31 Ellös, lägenhetshotell med restaurang och spa",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/wards-i-mollosund/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "hotell och restaurang med cocktailbar, Kyrkvägen 9, 474 70 Mollösund",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/brygghuset-mollosund/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "Hamnvägen 4, 47440 Mollösund, restaurang med havsinspirerad mat samt rum med utsikt över hamnen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/restaurang-cafe-bryggvingen/",
      "org": "Turistrådet Västsverige (vastsverige.com)",
      "vad": "restaurang och fiskaffär på Lyr, Orust",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "tjorn": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stigfjorden.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 1979, cirka 6 714 hektar i Orusts och Tjörns kommuner, näringsplats för tusentals änder, gäss, svanar och vadarfåglar under vår och höst, Ramsarkonventionen, Natura 2000",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn",
      "org": "Tjörns kommun",
      "vad": "två holmar, den södra Klädesholmen med den äldsta bebyggelsen och den norra Koholmen, sillperioden 1747–1808 med uppemot 1 000 personer, 40 procent av alla svenska sillkonserver, personfärja från Rönnängs brygga till Åstol, Tjörnekalv och Dyrön medan Härön nås via Kyrkesund",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser",
      "org": "Tjörns kommun",
      "vad": "Tjörnbron som utsiktsplats med utsikt över fjordarna och skärgården, Sankt Olovs valar som \"ett av Bohusläns mest kända sjömärken\"",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/webbplatser/sundsby-sateri",
      "org": "Tjörns kommun",
      "vad": "säteriet på ön Mjörn med trädgård, park, vandringsleder, köksträdgård, utställningar, kafé och gårdsbutik",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser",
      "org": "Tjörns kommun",
      "vad": "Gråskär, Skärhamn listad med sandstrand och tillgänglighetsanpassning",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/bygga-bo-miljo-och-trafik/trafik-och-resor/buss-bat-och-tag",
      "org": "Tjörns kommun",
      "vad": "expressbussar mot Stenungsund och Göteborg",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014620800000/",
      "org": "Västtrafik",
      "vad": "Buss Tjörn express: Tjörn — Göteborg",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/pilane-gravfalt/",
      "org": "Bohusläns museum",
      "vad": "ungefär 80 synliga gravar från järnåldern, 57 runda stensättningar, tio runda högar, sju domarringar och sex resta stenar, inga uppgifter om utgrävning, skulpturen \"Anna\" 14 meter hög av Jaume Plensa",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://digitaltmuseum.se/021015874271/almobron-i-bohuslan-paseglad-av-bulkfartyget-star-clipper-i-januari-198",
      "org": "Bohusläns museum via DigitaltMuseum",
      "vad": "18 januari 1980 klockan 01.30, åtta omkomna, omedelbar planering av provisorisk färjeförbindelse och projektering av ny bro",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://kladesholmenvh.se/gasthamn/",
      "org": "Klädesholmen Västra Hamn",
      "vad": "Klädesholmens gästhamn",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.akvarellmuseet.org/om/historia",
      "org": "Nordiska Akvarellmuseet",
      "vad": "öppnade 16 juni 2000, arkitekttävlingsförslaget \"Mötet\" av de danska arkitekterna Niels Bruun och Henrik Corfitsen, huvudbyggnaden längs strandlinjen delvis ute i vattnet, fem gästateljéer på betongpelare i vattnet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/",
      "org": "Salt & Sill",
      "vad": "Sverige första flytande hotell",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/om-salt-sill/",
      "org": "Salt & Sill",
      "vad": "Sveriges första flytande hotell, adress Rytterholmen 1, Klädesholmen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/restauranger/",
      "org": "Salt & Sill",
      "vad": "huvudrestaurangen heter Salt & Sill, färska skaldjur från lokala fiskare",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.skarhamnsgasthamn.se/service/",
      "org": "Skärhamns Gästhamn",
      "vad": "wifi, toalett, dusch, tvättmaskin, torktumlare, septitanksugning, grillplats; inget drivmedel anges",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sodrabohuslan/produkter/rovor-rum/",
      "org": "Västsverige/Södra Bohuslän",
      "vad": "Toftenäs 4, Skärhamn, fungerar även som vandrarhem utanför sommaren",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/",
      "org": "Västsverige/Tjörn",
      "vad": "1546 öar och skär att uppleva året om",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/kladesholmen/",
      "org": "Västsverige/Tjörn",
      "vad": "25 konservfabriker och cirka 150 yrkesfiskare år 1950",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/hotel-nordevik/",
      "org": "Västsverige/Tjörn",
      "vad": "a charming boutique hotel in the heart of Skärhamn, Hamngatan 60, Skärhamn",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/skarhamn-guest-marina/",
      "org": "Västsverige/Tjörn",
      "vad": "centralt läge, toaletter, duschar, wifi och tvättmaskin, inget bränsle",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/kladesholmens-gasthamn/",
      "org": "Västsverige/Tjörn",
      "vad": "den \"omtalade sillön\", grytformad hamn där vinden inte stör, fasta förtöjningslinor",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/vatten-restaurang-kafe/",
      "org": "Västsverige/Tjörn",
      "vad": "Södra Hamnen 6, Skärhamn, certifierad av A Taste of West Sweden, fisk och skaldjur som favoritråvaror",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/bistro-port-sud/",
      "org": "Västsverige/Tjörn",
      "vad": "Södra Hamnen 8, Skärhamn, meny som blandar västkust och provensalskt",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "kungshamn": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 1975, cirka 292 hektar, Bohusläns äldsta fyr rest 1842 på Hållös högsta punkt med vit blixt var tolfte sekund, byggnadsminne 1935, turbåtar från Kungshamn, badplatser, eldplatser, toalett och vandrarhem i gamla radiopejlstationen",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn",
      "org": "Sotenäs kommun",
      "vad": "cirka 100 platser, vattendjup 2,5–5 m, dusch, WC, tvättstuga, färskvatten, eluttag, wifi, sopor; inget drivmedel anges; centralt läge med butiker, restauranger och banker nära",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/kungshamn",
      "org": "Sotenäs kommun",
      "vad": "Fisketången (klippbad med sandstrand, bryggor med badstegar, handikappramp, omklädningsrum och toaletter), Stenbogen (klippbad med badstegar, hopptorn och trampolin), Ramnerer (klippbad)",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/vandringsleder/soteleden-och-kuststigen",
      "org": "Sotenäs kommun",
      "vad": "digitala kartor och etappförslag",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://nordensark.se/om-oss/",
      "org": "Nordens Ark",
      "vad": "ideell stiftelse för hotade djur sedan 1989, totalt 383 hektar mark, nationellt uppfödningsansvar, adress Åby säteri, Hunnebostrand",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://fyrenkungshamn.se/",
      "org": "Restaurang Fyren",
      "vad": "Bäckeviksgatan 3D, Kungshamn, \"precis vid havet och strandpromenaden\"",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/artiklar/kungshamn/",
      "org": "Västsverige/Sotenäs",
      "vad": "Gravarne, Bäckevik och Fisketången slogs ihop för drygt fyrtio år sedan och de gamla ortnamnen används fortfarande lokalt",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/artiklar/smogen/",
      "org": "Västsverige/Sotenäs",
      "vad": "möjlighet att följa med lokala fiskare och delta i räkfisketurer",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/sotenas/produkter/hotell-kungshamn/",
      "org": "Västsverige/Sotenäs",
      "vad": "namnet, adress Hotellgatan 6, Kungshamn, lägenhetssviter och egen restaurang med utsikt över Kungshamnsinloppet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/artiklar/artiklar-se--gora/krogar-och-cafeer-aret-om/",
      "org": "Västsverige/Sotenäs",
      "vad": "Calmars Veranda, Hamnbageriet och Coza Café & Mat listade under Kungshamn",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "pater-noster": [
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn",
      "org": "Tjörns kommun",
      "vad": "Pater Noster släcktes 1977, fyren togs iland för omfattande renovering och fördes tillbaka sommaren 2007, statligt byggnadsminne med högt kulturhistoriskt värde 2015",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://paternoster.se/",
      "org": "Pater Noster",
      "vad": "150 dagsgäster, Vi använder lokala råvaror utifrån säsong, Fisk och skaldjur från Kattegatt och Skagerrak står i fokus, utmärkelserna Världens bästa hotellkoncept, Stora Turismpriset och The Special One",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://en.paternoster.se/faq",
      "org": "Pater Noster",
      "vad": "hotellgäster med egen båt anmäler minst tre timmar i förväg, dagsbesökare med egen båt i mån av plats max två timmar, platser kan inte förbokas —  och",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/pater-noster/",
      "org": "Västsverige/Tjörn",
      "vad": "nio väldesignade rum för 18 gäster, sovplatser på klipporna sommartid, renovering av designbyrån Stylt Trampoli",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/",
      "org": "Västsverige/Tjörn",
      "vad": "Tjörn Island of Art med Skulptur i Pilane, Nordiska Akvarellmuseet och Pater Noster",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/pater-noster/",
      "org": "Västsverige/Tjörn",
      "vad": "nio rum i de restaurerade fyrvaktarbostäderna",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "vinga": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 1987, cirka 559 hektar, \"Klipphällar möter buskiga snår av slån, björnbär, nypon och vinbär\", sparris, västkustarv, strandkål och marviol, gök och näktergal, Koholmen som häckningsplats",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/vinga--goteborgarnas-fyr/",
      "org": "Sjöfartsverket",
      "vad": "Göteborgarnas fyr — tornet 29 meter högt och ritat av fyringenjör Emil Karlsson, mittdelen göts i betong av Skånska Cementgjuteriet och \"Tornet kläddes med porfyrit bruten på Vinga\", automatisering 1975 och avbemannad fyrplats, kvarvarande lotsning, utställningen \"Fyrplats Vinga\"",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "Göteborg & Co",
      "vad": "Vinga i Göteborgs yttre skärgård",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/goteborg/utflykter/guidad-batutflykt-till-vinga/",
      "org": "Strömma",
      "vad": "avgång Lilla Bommens hamn, cirka 1 timme 15 minuter enkel väg, två timmar på Vinga",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/produkter/on-vinga/",
      "org": "Västsverige/Visit Öckerö",
      "vad": "cirka fyra timmar på ön med turbåten från Hönö Klåva, kiosk och grillplatsen \"Brända Fläsket\"",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://vinga.nu/",
      "org": "Winga Vänner",
      "vad": "Evert Taube tillbringade sin barndom här på Vinga eftersom pappan, Carl Gunnar Taube var fyrvaktare mellan 1889 och 1905",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://vinga.nu/turbatar/",
      "org": "Winga Vänner",
      "vad": "Strömma från Lilla Bommen, Kungsö från Stenpiren, Silvana, Hönö Båtturer och Kastor från Hönö Klåva, Emma från Fotö",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://vinga.nu/uthyrning-av-stugor/",
      "org": "Winga Vänner",
      "vad": "Biskopsgården och Fyrmästarbostaden hyrs ut av föreningen medan \"Båken hyres ut endast för ceremonier som bröllop och dop\", Fyrfolkets By drivs av Vinga Event",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://vinga.nu/uthyrning/",
      "org": "Winga Vänner",
      "vad": "Biskopsgården med 7 rum och 10 bäddar plus 2 extrabäddar, Fyrmästarbostaden med 3 rum och 7 bäddar, uthyrning till föreningens medlemmar; Fyrfolkets By sköts av Vinga Event",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://vinga.nu/gasthamn/",
      "org": "Winga Vänner",
      "vad": "plats för cirka 30 båtar av normalstorlek, max 40 fot och max djup 2,5 meter, \"du är alltid välkommen med egen båt till Vinga, året runt\", toaletter, el, soprum, grillplatsen \"Brända Fläsket\" och kiosk",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "hono": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/ersdalen.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 1999, cirka 529 hektar på nordvästra Hönö i Öckerö kommun, \"Strandlinjen är sönderskuren i vikar och uddar och här finns ett rikt fågelliv\", hedar och lavklädda hällar, skalrik jord, grusade stigar, klippformationen Kröckle Kyrka, Kråkudden med fågelskådarskydd, grillplats, torrdass, bad, informationstavla och cykelled",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/kommun-och-politik/kommunfakta",
      "org": "Öckerö kommun",
      "vad": "Öckerö kommun ligger i Göteborgs skärgård och består av cirka 1000 öar och skär. På våra tio bebodda öar bor det nästan 13 000 personer, högsta punkten på Röseberget på norra Björkö cirka 50 meter över havet",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser",
      "org": "Öckerö kommun",
      "vad": "tretton kommunala badplatser, bland dem Gula skäret, Jungfruviken, Lapposand och Knöten",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/naturomraden-och-naturreservat",
      "org": "Öckerö kommun",
      "vad": "Rörö naturreservat, Grötö Knötens naturreservat, Björkö naturområde samt naturområden och motionsspår på Hälsö, Källö-Knippla och Öckerö",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.gasthamnsguide.se/omradesindelat/vastkusten/item/hono-klava-gasthamn",
      "org": "drivmedel endast belagt via reservkällan gasthamnsguide.se",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "Göteborg & Co",
      "vad": "väg 155 till färjeläget vid Lilla Varholmen, den avgiftsfria vägfärjan, buss 290 från Järntorget hela vägen inklusive färjeöverfarten och buss X6 från Centralstationen till Lilla Varholmen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/hono",
      "org": "Göteborg & Co",
      "vad": "en populär gästhamn, ett tjugotal butiker samt restauranger, kaféer och pizzerior, Klipporna breder ut sig längs kusterna, badplatserna Hästen, Lappesand, Jungfruviken och Halse Långe",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://honoklavahamn.se/",
      "org": "Hönö Klåva Hamn",
      "vad": "privatägd båt- och fiskehamn, nyrenoverat servicehus vid gästhamnen med duschar, toaletter, tvättmaskin och torktumlare",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://skargardshotellethono.se/en/home/",
      "org": "Skärgårdshotellet Hönö",
      "vad": "Västra vägen 17, Hönö Klåva, 16 rum varav hälften med havsutsikt, restaurang, konferens och festvåning",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.tullhuset.se/",
      "org": "Tullhuset",
      "vad": "Västra Vägen 3, Hönö, fisk- och skaldjursrestaurang med à la carte, smakmeny och skaldjursbuffé",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/",
      "org": "Visit Öckerö",
      "vad": "Hela året går färjorna från Lilla Varholmens färjeläge ... avgiftsfria turer ut till Öckeröarna",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/centrum-for-fiske/",
      "org": "Visit Öckerö",
      "vad": "cirka 300 yrkesfiskare i kommunen, \"var tionde svensk yrkesfiskare\", \"tillsammans med kollegerna i Fiskebäck levererar de 75 procent av all fisk som fångas i Sverige\", fiskebåtar längs kajerna i Hönö Klåva, Öckerö och Rörö",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/bo/bourvalhonoklava/",
      "org": "Visit Öckerö",
      "vad": "Hönö Sjöbodar som ett av boendena på ön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/visitockero/eat-drink/eat-klava/",
      "org": "Visit Öckerö",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/visitockero/produkter/havskatten/",
      "org": "Västsverige/Visit Öckerö",
      "vad": "namnet \"Havskatten Hotell & Vandrarhem\", läge i Hönö Röds hamn, 12 hotelldubbelrum och 9 sovrum med eget badrum, bastu och konferens",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/visitockero/produkter/honoklavahamn/",
      "org": "Västsverige/Visit Öckerö",
      "vad": "gästplatser och ställplatser för husbil, restauranger i hamnen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/produkter/restaurang-kroken/",
      "org": "Västsverige/Visit Öckerö",
      "vad": "namnet \"Klova Hamnkrog\" (även kallad Nya Kroken), Hönö Klåva hamn väg 15, uteservering i lä, mat lagad från grunden, hummermiddagar och à la carte",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "gullholmen": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Det finns fina uppmärkta stigar på Härmanö, och ett par av dem är anpassade för rullstol, stigen leder till Härmanö huvud med badplats och utkiksplats",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/uppleva-och-gora/gasthamnar/gullholmens-gasthamn",
      "org": "Orust kommun",
      "vad": "50 platser, el, servicebyggnad med toalett, dusch och tvättmaskin, sugtömningsstation, inget drivmedel",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/",
      "org": "Bohusläns museum",
      "vad": "bekräftar äldsta säkra belägg 1588, ca 100 hus och ca 400 invånare år 1800 samt drygt 800 invånare 1910",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://gullholmenshamnkrog.se/",
      "org": "Gullholmens Hamnkrog",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.gullholmsbaden.se/",
      "org": "Gullholmsbaden",
      "vad": "69 fullt utrustade stugor, egen restaurang, konferenslokaler och minigolf",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.gullholmsbaden.se/?page_id=19",
      "org": "Gullholmsbaden",
      "vad": "Restaurangen — Sommarterrass med havsutsikt, a la carte samt hantverkarlunch",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.gasthamnsguiden.se/en/harbor/gullholmen-gasthamn-2/",
      "org": "Gästhamnsguiden",
      "vad": "Harbour Depth 2 - 7 m Spots 50, bekräftar färskvatten, el, dusch, toalett och tvättstuga, inget drivmedel",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5",
      "org": "Västsverige",
      "vad": "bekräftar att samhällshalvan brukar kallas Sveriges mest tätbebyggda ö och att andra halvan ligger på Härmanö",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/trails/harmano-hiking-trails/",
      "org": "Västsverige",
      "vad": "bekräftar leder från färjeläget hela vägen till Härmanö huvud, ca 8 km uppdelat i etapper",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/",
      "org": "Västsverige",
      "vad": "Gullholmen — Käringön — Västtrafiks linje 381 avgår från Tuvesvik, tio minuter till Gullholmen, cykel kan tas med",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/",
      "org": "Västsverige/Orust",
      "vad": "bekräftar att Gullholmen är bilfri och har butik, kyrka, bibliotek och biograf",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/gullholmens-hamnkrog/",
      "org": "Västsverige/Orust",
      "vad": "mötesplats ett stenkast från hamnen",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "kladesholmen": [
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/tjorn-pa-hosten-och-vintern/tjorn-och-sillen",
      "org": "Tjörns kommun",
      "vad": "sillhandel sedan 1500-talet, den stora sillperioden på 1700-talet, nästa sillperiod runt 1870, 26 fabriker 1967, tre kvar vid millennieskiftet som gick samman",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn",
      "org": "Tjörns kommun",
      "vad": "ordagrant \"Under den stora sillperioden 1747-1808 bodde uppemot 1 000 personer på Klädesholmen\"",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo",
      "org": "Tjörns kommun",
      "vad": "Sjöboden på Salt och Sill — Restaurang på Salt & Sill som specialiserar sig på pizza",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/batliv-och-hamnar",
      "org": "Tjörns kommun",
      "vad": "listar Klädesholmen bland kommunens gästhamnar",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://kladesholmenvh.se/gasthamn/",
      "org": "Klädesholmen Västra Hamn",
      "vad": "el (6 A ingår), färskvatten, dusch och toalett samt grillplats, inget drivmedel",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://kladesholmen.com/",
      "org": "Klädesholmens Samhällsförening",
      "vad": "beskriver ön som \"Klädesholmen, solens & sillens ö\"",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://kladesholmen.com/att-gora/museum/",
      "org": "Klädesholmens Samhällsförening",
      "vad": "Sillebua — öppnade 1995 i en gammal konservfabrik, flyttade 2020 till Sillens hus på Strandgatan 12B, visar fisk- och sillberedning från ca 1860, dokumentationsavdelning",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/om-salt-sill/var-historia/",
      "org": "Salt & Sill",
      "vad": "Sveriges första flytande hotell, sex moduler bogserade till Klädesholmen i juli 2008 på specialtillverkade pontoner, 300 m² konferens- och eventlokaler våren 2013",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/hotell/",
      "org": "Salt & Sill",
      "vad": "Sveriges första flytande hotell, fyra serveringar och konferens på anläggningen, bastubåt —  och",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/restauranger/",
      "org": "Salt & Sill",
      "vad": "listar Saltbaren som en av fyra serveringar på anläggningen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/restauranger/sjoboden/",
      "org": "Salt & Sill",
      "vad": "neapolitansk pizza och skaldjur från lokala fiskare",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/holmens-kiosk/",
      "org": "Salt & Sill",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/kladesholmen/",
      "org": "Västsverige/Tjörn",
      "vad": "bebodd redan på 1200-talet, norsk biskop passerade 1594 och beskrev ön som ett gammalt fiskeläge, drygt 400 invånare 1830, nästan tusen i början av 1900-talet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/kladesholmens-sauna/",
      "org": "Västsverige/Tjörn",
      "vad": "ligger i Jungfruviken, drivs av Klädesholmens Bastuförening, havsvatten kan pumpas in i badtunnan, bokning via bastuföreningen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/house-of-herrings/",
      "org": "Västsverige/Tjörn",
      "vad": "sillbutik på Klädesholmen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/kladesholmens-gasthamn/",
      "org": "Västsverige/Tjörn",
      "vad": "35 platser, dusch, el, livsmedel, restaurang, toalett, sugtömning och miljöstation",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "astol": [
    {
      "url": "https://www.raa.se/app/uploads/2022/11/V%C3%A4stra-G%C3%B6taland-O_riksintressen.pdf",
      "org": "Riksantikvarieämbetet",
      "vad": "Åstol [O 62] (Rönnäng sn)",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/batliv-och-hamnar",
      "org": "Tjörns kommun",
      "vad": "listar Åstol bland kommunens gästhamnar",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo",
      "org": "Tjörns kommun",
      "vad": "Åstols Café — Kafé på Åstol, dit du kommer med personfärja från Rönnäng",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/astol/",
      "org": "Västsverige/Tjörn",
      "vad": "vita trähus mot kala klippor, smala bilfria gator, befolkades vid mitten av 1700-talet under en av de stora sillperioderna, mer än tjugo stora ståltrålare med hemmahamn på Åstol på 1960-talet, fiskeindustri fram till 1970-talet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/",
      "org": "Västsverige/Tjörn",
      "vad": "en bilfri klippö, smala gränder mellan vitmålade trähus",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/",
      "org": "Västsverige/Tjörn",
      "vad": "Tjörnekalv — Dyrön — Åstol — Västtrafiks linje 361 från Rönnängs brygga, cirka en kvart till Åstol, biljettautomat vid färjeläget, cykel kan tas med",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/astols-rokeri/",
      "org": "Västsverige/Tjörn",
      "vad": "fiskrestaurang med eget rökeri och en liten butik, adress Hamnen 4, 471 44 Åstol",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/astols-gasthamn/",
      "org": "Västsverige/Tjörn",
      "vad": "80 platser, el, wifi, färskvatten, båtkran, miljöstation, septisug, dusch, tvättmaskin, torktumlare, WC",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.astolshamn.se/gasthamn/",
      "org": "Åstols hamn",
      "vad": "vatten april–oktober, el 220 V, dusch och toalett, tvättmaskin och torktumlare, wifi, inget drivmedel",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "http://www.astolsrokeri.se",
      "org": "Åstols Rökeri",
      "vad": "mat och musik mitt i havet, adress Hamnen 4, 471 44 Åstol, havsrätter och pizza, regelbundna musikframträdanden",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://astol.se/besok-astol/",
      "org": "Åstols Samhällsförening",
      "vad": "hamnen väl skyddad från de flesta vindar, gästhamnsplatser på norra och södra sidan",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "dyron": [
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder",
      "org": "Tjörns kommun",
      "vad": "gula leden 5 km och medelsvår, gula brickor på trästolpar, delen Sydhamnen–bastun framkomlig med rullstol och barnvagn, blå leden 1,6 km över bergen från norr till söder, rastplatser, utsikt mot Marstrand, Åstol och Pater Noster, sandstrand på östra sidan",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo",
      "org": "Tjörns kommun",
      "vad": "Dyrön Cafe & Kiosk med uteservering i Sydhamnen under sommaren",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/batliv-och-hamnar",
      "org": "Tjörns kommun",
      "vad": "listar både Nordhamnen och Sydhamnen som gästhamnar",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.dyron.se/om-dyron/",
      "org": "Dyrön",
      "vad": "Ett speciellt inslag är de inplanterade vilda bergsfåren s k mufflonfår, varierat och dramatiskt landskap",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://dyronsvardshus.se/",
      "org": "Dyröns Värdshus",
      "vad": "upp till 12 sjöbodar, plats för upp till 6 personer per bod, pentry, badrum, tvättmaskin, vardagsrum och uteplats",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://linasbrygga.se/",
      "org": "Linas Brygga",
      "vad": "kafé i Södra Hamnen, 47114 Dyrön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/",
      "org": "Västsverige/Tjörn",
      "vad": "Dyrön som grönskande ö känd för sin storslagna natur, dramatisk skärgårdsmiljö, vilda mufflonfår",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/dyrons-gasthamn-nord-sydhamnen/",
      "org": "Västsverige/Tjörn",
      "vad": "Nordhamnen 20 platser långsides på norra sidan och akterförtöjning i inloppet, Sydhamnen 55 platser med fast akterförtöjning och långsides, båda med sjömack/diesel och sugtömning, nära till mataffär, färjetrafik från Nordhamnen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/dyrons-vardshus/",
      "org": "Västsverige/Tjörn",
      "vad": "restaurang med skaldjur, fisk, kött, grönsaker och svamp samt övernattning i sjöbodar vid vattnet, adress Hamnvägen, 471 43 Dyrön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/",
      "org": "Västsverige/Tjörn",
      "vad": "Tjörnekalv — Dyrön — Åstol — Västtrafiks linje 361 utgår från Rönnängs brygga, 20 minuter till Dyröns norra hamn, biljettautomat vid färjeläget i Rönnäng",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/dyron/",
      "org": "Västsverige/Tjörn",
      "vad": "södra hamnen har förbindelse till Rökan, därifrån buss",
      "last": "2026-09-16",
      "myndighet": false
    }
  ]
}

/** Antal öar med minst en publicerbar källa. */
export const OAR_MED_KALLOR = 41
