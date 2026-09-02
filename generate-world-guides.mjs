import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { expansionCities } from "./seo/expansion-cities.mjs";

const cities = [
  {
    slug: "new-york", name: "New York City", short: "New York", code: "NYC", country: "US", locale: "en-US", accent: "#f2c94c",
    tagline: "Five boroughs. One good barstool.",
    description: "A borough-first field guide to finding dive bars in New York City, from old neighbourhood rooms to music-led bars beyond the obvious Manhattan crawl.",
    intro: "In New York, the nearest bar may be around the corner, but the right dive may be across a bridge. The city’s density makes discovery easy and judgement difficult: old neighbourhood institutions, punk rooms, sports bars and deliberately distressed newcomers can all occupy the same few blocks.",
    meaning: "A New York dive is usually defined less by décor than by continuity. Look for a room that serves its neighbourhood, keeps the offer simple and feels used rather than staged. Age alone proves nothing, and a fashionable postcode does not automatically erase character.",
    calloutTitle: "Think in boroughs, then blocks",
    callout: "Do not build a five-borough crawl. Pick one area, compare several nearby results and leave enough time to stay when a room feels right.",
    districts: [
      ["Manhattan", "East Village & Lower East Side", "Dense, late and historically tied to downtown music culture. Compare current atmosphere carefully: legacy rooms and polished imitations often sit side by side."],
      ["Brooklyn", "Williamsburg & Greenpoint", "Music rooms, long-standing neighbourhood bars and newer concepts overlap. Search beyond the busiest waterfront blocks for a more local rhythm."],
      ["Brooklyn", "Bushwick & Ridgewood", "Useful for DIY energy, event-led nights and bars at the edge of club culture. Check tonight’s programming before travelling."],
      ["Queens", "Astoria & Jackson Heights", "Broaden the search for lived-in neighbourhood bars, varied communities and places that are destinations for locals rather than visitors."]
    ],
    fieldNotes: [["Distance", "Subway time matters more than straight-line miles."], ["Timing", "A quiet early drink and a 1am room can be completely different experiences."], ["Signal", "Recent interior photos and repeated local reviews beat ‘hidden gem’ language."]],
    transport: "Check the late-night subway route before crossing boroughs; service changes can turn a simple return into a long detour.",
    etiquette: "Order clearly, make room at a busy bar and remember that the people beside you may use this place every week—not as a stop on a themed crawl."
  },
  {
    slug: "los-angeles", name: "Los Angeles", short: "Los Angeles", code: "LAX", country: "US", locale: "en-US", accent: "#ff6b35",
    tagline: "Choose a neighbourhood. Save the night.",
    description: "Find dive bars in Los Angeles with a neighbourhood-first plan that accounts for distance, traffic, music scenes and LA’s early last call.",
    intro: "Los Angeles is not one nightlife district but a network of compact scenes separated by traffic. The mistake is choosing four famous bars across the map; the better move is choosing one neighbourhood, finding a strong first room and keeping the rest of the night close.",
    meaning: "LA dives range from dark valley institutions and music-adjacent bars to beach-town locals and Eastside rooms with jukeboxes, patios or tiny stages. The useful signal is not a movie-ready exterior—it is whether the bar still functions for its regulars.",
    calloutTitle: "The route is part of the choice",
    callout: "A six-mile result can consume the best hour of the night. Compare travel time, closing time and nearby alternatives before committing.",
    districts: [
      ["Eastside", "Echo Park & Highland Park", "Start here for music-adjacent bars, independent energy and compact clusters where a second option may be walkable."],
      ["Central", "Koreatown", "Dense, late-feeling and good for pairing a bar search with food. Parking and block-by-block atmosphere deserve checking."],
      ["Northeast", "Atwater & Glendale edges", "Look for neighbourhood rooms that serve a stable local crowd rather than a destination-only weekend rush."],
      ["Harbour", "Long Beach", "A city-scale scene of its own, with music culture, old bars and enough density to reward a separate night rather than an LA add-on."]
    ],
    fieldNotes: [["Distance", "Judge drive time, not miles."], ["Last call", "Build the night backwards from California closing time."], ["Cluster", "Save two backups within the same part of town."]],
    transport: "Decide who is driving, using a ride service or staying local before the first drink. Never improvise a cross-city drive after drinking.",
    etiquette: "Do not treat a neighbourhood bar like a film location. Ask before photographing people, respect the queue and tip according to local custom."
  },
  {
    slug: "austin", name: "Austin", short: "Austin", code: "AUS", country: "US", locale: "en-US", accent: "#ff4d9d",
    tagline: "Follow the sound, not the slogan.",
    description: "A practical guide to dive bars in Austin, live-music districts and neighbourhood rooms beyond the busiest stretch of Sixth Street.",
    intro: "Austin’s reputation creates its own search problem: ‘live music’ can mean a revered small room, a ticketed showcase, a patio songwriter or a high-volume entertainment strip. Finding your kind of dive means matching the district and the calendar to the night you actually want.",
    meaning: "An Austin dive often sits close to the music ecosystem: working musicians, cheap drinks, outdoor space and a stage or jukebox that matters. Authenticity is not measured by how much Texas decoration fits on the wall; it is measured by how the room participates in local life.",
    calloutTitle: "Check the bill before the bar",
    callout: "During festivals and major events, normal patterns collapse. Confirm cover charges, set times and access directly with the venue.",
    districts: [
      ["Downtown", "Red River", "A compact live-music district where programming is the decisive filter. Compare the bill, door time and genre before choosing."],
      ["East", "East Sixth & surrounds", "Casual bars, patios, food and music overlap east of the interstate. Weekend intensity varies sharply by block."],
      ["South", "South Congress & South Lamar", "Search for Texas-rooted rooms, long-running music culture and places that make sense as part of a southside night."],
      ["North", "North Loop & campus edges", "Useful for smaller neighbourhood bars and a less destination-driven night away from the headline districts."]
    ],
    fieldNotes: [["Music", "Genre and set time are stronger signals than a generic live-music tag."], ["Heat", "Walking plans change with summer temperature."], ["Events", "SXSW and festival weeks require a completely different strategy."]],
    transport: "Keep the night in one district when possible and confirm the return ride before venues empty at the same time.",
    etiquette: "If music is playing, listen. Do not talk over a quiet set, block the stage for photos or assume every performance is free."
  },
  {
    slug: "chicago", name: "Chicago", short: "Chicago", code: "CHI", country: "US", locale: "en-US", accent: "#64b5f6",
    tagline: "A neighbourhood city after midnight.",
    description: "Find Chicago dive bars by neighbourhood, from music-rich North Side rooms to taverns and local bars beyond the downtown core.",
    intro: "Chicago’s bar culture makes most sense at neighbourhood scale. The Loop is a useful landmark, not the centre of every good night, and the character you want may live along a Blue, Red or Brown Line corridor several stops away.",
    meaning: "The Chicago version of a dive is often a tavern: a straightforward room built around a bar, regulars, beer and the habits of its block. Music history adds another layer, from blues and jazz to punk and indie rooms, but a live stage and a neighbourhood bar are not always the same experience.",
    calloutTitle: "Follow a train line, not a top-ten list",
    callout: "Choose a corridor with several plausible results. Winter weather and late service make scattered recommendations expensive in time.",
    districts: [
      ["North", "Uptown & Andersonville", "Historic music rooms, taverns and varied late-night options make this a strong search zone when sound and neighbourhood character overlap."],
      ["Northwest", "Logan Square & Avondale", "Blue Line access, independent venues and local bars create useful clusters, though the atmosphere changes quickly along Milwaukee Avenue."],
      ["West", "West Town & Ukrainian Village", "Search for music-adjacent rooms and long-standing taverns within reach of denser restaurant and nightlife streets."],
      ["Southwest", "Pilsen & Bridgeport", "Neighbourhood bars and community identity matter here. Arrive with respect rather than treating the area as an ‘undiscovered’ backdrop."]
    ],
    fieldNotes: [["Transit", "Build around one CTA line."], ["Weather", "A ten-minute walk is a different proposition in February."], ["Type", "Separate tavern, music venue and late-night bar intent."]],
    transport: "Check the final train and bus connections, especially when moving between north, west and south side neighbourhoods.",
    etiquette: "Chicago taverns reward straightforward behaviour: know what you want, respect the regular crowd and never describe someone’s neighbourhood as newly discovered."
  },
  {
    slug: "nashville", name: "Nashville", short: "Nashville", code: "BNA", country: "US", locale: "en-US", accent: "#ffd166",
    tagline: "Music City beyond the loudest block.",
    description: "Find Nashville dive bars, songwriter rooms and neighbourhood music spots beyond the most obvious Broadway nightlife circuit.",
    intro: "Nashville can deliver live music before lunch and long after dinner, but volume alone does not guarantee connection. A useful search distinguishes the Broadway spectacle from songwriter rooms, neighbourhood bars, rock clubs and the places working musicians use between gigs.",
    meaning: "A Nashville dive may be a beer-led local, a small stage, a honky-tonk outside the main circuit or a bar where the person playing matters more than the production. Search by the experience you want, not by cowboy signage.",
    calloutTitle: "Broadway is one version of Nashville",
    callout: "See it if you want the spectacle, then widen the map. East Nashville and other neighbourhoods offer a different relationship between music and the room.",
    districts: [
      ["Centre", "Lower Broadway", "High-energy, dense and visitor-facing. Use open status and crowd signals, and know that ‘authentic’ is not the only valid reason to go."],
      ["Historic", "Printer’s Alley", "A compact nightlife pocket with a long entertainment history and a broader genre mix than a country-only search suggests."],
      ["East", "Five Points & East Nashville", "Independent bars, rock and songwriter culture reward a neighbourhood-focused search and a check of the night’s programme."],
      ["South", "Wedgewood-Houston", "Creative spaces, music and newer bar clusters make this useful when you want to step outside the central circuit."]
    ],
    fieldNotes: [["Programme", "Search the performer as carefully as the venue."], ["Cover", "Free entry can still mean a musician tip expectation."], ["Crowd", "Weekends and major events change every central room."]],
    transport: "Plan rides between neighbourhoods; the city’s most interesting options do not form one continuous walking district.",
    etiquette: "Tip musicians when a jar or digital option is offered, keep conversation down during songwriter sets and do not demand the same song everywhere."
  },
  {
    slug: "new-orleans", name: "New Orleans", short: "New Orleans", code: "MSY", country: "US", locale: "en-US", accent: "#b388ff",
    tagline: "Let the neighbourhood set the rhythm.",
    description: "Find dive bars in New Orleans with a respectful guide to neighbourhood bars, live music, Frenchmen Street and nights beyond Bourbon Street.",
    intro: "In New Orleans, bars are part of a living music and neighbourhood culture—not merely attractions between meals. Bourbon Street is visible, but the city’s deeper night runs through corner bars, music clubs, porches, kitchens and communities well beyond one famous strip.",
    meaning: "A New Orleans dive can be a 24-hour-feeling neighbourhood room, a music bar, a kitchen with a counter or a place whose history is carried by the people inside. Patina is abundant; what matters is whether you enter as a guest rather than a consumer of local colour.",
    calloutTitle: "Music is work as well as atmosphere",
    callout: "Check whether there is a cover, minimum or tip expectation. Pay the musicians, listen to the set and verify schedules because line-ups change.",
    districts: [
      ["Quarter", "French Quarter", "Dense, historic and varied. Move beyond Bourbon Street and compare side streets, opening patterns and the room’s actual purpose."],
      ["Downriver", "Marigny & Frenchmen Street", "A major live-music search zone where genre, set time and cover matter more than proximity alone."],
      ["Bywater", "Bywater", "Neighbourhood bars and creative spaces sit within a residential community. Keep transport and respectful noise levels in mind."],
      ["Upriver", "Mid-City & Uptown", "Broaden the map for corner bars, local music and places connected to everyday city life rather than the visitor core."]
    ],
    fieldNotes: [["Music", "Confirm who is playing and how musicians are paid."], ["Weather", "Heat and storms can change the route quickly."], ["Respect", "Residential streets are not an extension of the party."]],
    transport: "Use streetcars where practical, but check service and arrange a safe return when the night moves beyond their route or hours.",
    etiquette: "Listen, tip, avoid blocking pavements and remember that New Orleans culture is not a costume. Support the people making the night possible."
  },
  {
    slug: "toronto", name: "Toronto", short: "Toronto", code: "YYZ", country: "CA", locale: "en-CA", accent: "#ef5350",
    tagline: "Ride west. Look between the headlines.",
    description: "A neighbourhood guide to dive bars in Toronto, live-music rooms and local nightlife along the city’s west-end and east-end corridors.",
    intro: "Toronto nightlife spreads along streets and streetcar routes rather than resolving into one obvious district. The useful search often moves west of the towers, where small venues, taverns and neighbourhood bars sit between restaurants, record shops and residential blocks.",
    meaning: "Toronto dives range from old taverns and music rooms to unpretentious bars serving a mixed local crowd. Cheap is relative in a high-cost city, so judge character through continuity, atmosphere and community use rather than yesterday’s price reputation.",
    calloutTitle: "Think in streetcar corridors",
    callout: "Queen, Dundas, College and Bloor each connect multiple scenes. Pick a stretch instead of zig-zagging across the grid.",
    districts: [
      ["West", "Queen West & Parkdale", "Music history, varied bars and changing neighbourhood identity make recent evidence essential. Continue west when the central stretch feels too polished."],
      ["West", "Dundas West & Ossington", "Dense enough for comparison, with independent rooms and food nearby. Weekend queues can change the character of the search."],
      ["Northwest", "Bloorcourt & Junction", "Neighbourhood bars and smaller music spaces reward a search beyond the most promoted downtown strips."],
      ["East", "Danforth & Riverside", "A different pace, strong neighbourhood identity and transit access make the east side useful when the west is not your route."]
    ],
    fieldNotes: [["Transit", "Streetcar disruptions can redraw the night."], ["Price", "Use value and atmosphere, not an outdated definition of cheap."], ["Season", "Patio Toronto and February Toronto are different cities."]],
    transport: "Check live TTC information and keep the final leg simple; replacement buses and overnight routes can materially change journey time.",
    etiquette: "Respect queues, tip according to local norms and do not mistake a quiet room for a failed night—Toronto bars often build gradually."
  },
  {
    slug: "montreal", name: "Montréal", short: "Montréal", code: "YUL", country: "CA", locale: "en-CA", accent: "#4dd0e1",
    generated: false,
    modified: "2026-07-28", displayModified: "28 July 2026",
    tagline: "Late nights in two languages.",
    description: "Find dive bars in Montréal across the Plateau, Mile End, Village and emerging neighbourhood scenes, with practical bilingual and late-night tips.",
    intro: "Montréal combines dense neighbourhood life, deep music culture and a genuinely late rhythm. A bar search can move between French and English, terrace and basement, neighbourhood tavern and experimental music room within a short walk—especially when you choose the right axis.",
    meaning: "The local dive may look like a taverne, bar de quartier, music room or unfussy counter. Montréal character often comes from regular use, winter resilience, bilingual social texture and a cultural programme that matters beyond tourism.",
    calloutTitle: "A little French goes a long way",
    callout: "You can navigate much of Montréal in English, but a greeting and thanks in French show respect. Read current event information in either language.",
    districts: [
      ["Plateau", "Plateau & Mile End", "Independent culture, small venues and bars spread along Saint-Laurent, Saint-Denis and side streets. Compare the immediate blocks rather than the district label."],
      ["Centre", "Quartier Latin", "Culture, students, theatres and late-night energy overlap. Programme and day of week strongly shape the result."],
      ["East", "The Village", "A major LGBTQ+ district with bars, clubs and performance. Check each venue’s audience and event rather than treating the area as one scene."],
      ["North", "Villeray & Little Italy", "Neighbourhood drinking and dining offer a slower alternative to the central nightlife axes, especially for an early-to-late local route."]
    ],
    fieldNotes: [["Language", "Search French terms as well as English ones."], ["Season", "Terrace season and deep winter require different plans."], ["Hours", "Late closing changes the shape of the entire evening."]],
    transport: "The Métro stops before the bars do. Check the final train and night-bus route before settling into a late room.",
    etiquette: "Open with bonsoir, follow the venue’s language lead and tip appropriately. Montréal’s relaxed surface still has clear local manners.",
    faq: [
      ["What should I search for besides dive bar in Montréal?", "Try taverne, bar de quartier, bar rock, salle de spectacle and the name of the neighbourhood. French search terms often reveal places that an English only search misses."],
      ["Do I need to speak French in Montréal bars?", "You can visit many Montréal bars in English, but starting with bonsoir and saying merci is courteous. Follow the language used by staff and never assume everyone wants to switch languages."],
      ["Which Montréal neighbourhoods are good for an alternative bar search?", "The Plateau and Mile End are strong for independent culture, the Quartier Latin for student and theatre energy, the Village for LGBTQ+ nightlife, and Villeray for a more neighbourhood focused route."],
      ["How late can I use the Montréal Métro after a night out?", "The bars can stay open later than the Métro runs. Check the current STM last train and night bus times before choosing a late venue, because service varies by line and day."]
    ]
  },
  {
    slug: "paris", name: "Paris", short: "Paris", code: "PAR", country: "FR", locale: "en", accent: "#ff8a80",
    tagline: "Look past the postcard glow.",
    description: "Find dive bars in Paris by arrondissement, from bars de quartier and rock rooms to late-night alternatives beyond the postcard centre.",
    intro: "Paris does not usually call its rough-edged bars ‘dives’. Search instead for bars de quartier, rock bars, caves, concert rooms and small counters whose identity belongs to a street or scene. The language of the search matters as much as the map.",
    meaning: "A Paris equivalent may be a narrow neighbourhood bar, an old zinc counter, a basement music room or an unpolished late-night spot. Low lighting and vintage furniture are easy to manufacture; the stronger evidence is a mixed local crowd, straightforward service and current cultural life.",
    calloutTitle: "Search the arrondissement and the French term",
    callout: "Try bar de quartier, bar rock, bar alternatif or concert alongside your location. ‘Dive bar’ alone can return places styled for visitors.",
    districts: [
      ["Northeast", "Oberkampf & the 11th", "Dense nightlife around Oberkampf and Bastille makes comparison easy. Move onto side streets when the main axis feels too uniform."],
      ["North", "Pigalle & the 9th/18th", "Rock history, music rooms, cabaret and visitor traffic overlap. Confirm what the venue actually hosts tonight."],
      ["East", "Belleville & Ménilmontant", "Neighbourhood bars, music and a varied local population make this useful for a less postcard-driven search."],
      ["Canal", "Canal Saint-Martin & northeast", "Bars and cultural spaces extend along the canal and toward Pantin; distance from central sights can change the crowd and pace."]
    ],
    fieldNotes: [["Language", "Bonjour or bonsoir comes before the order."], ["Metro", "The final train can arrive before the final drink."], ["Type", "Bar, cave and salle de concert signal different nights."]],
    transport: "Check the last Métro and the Noctilien night-bus option. A late taxi across Paris can cost more than the whole bar tab.",
    etiquette: "Greet staff before ordering, avoid shouting across a small room and do not expect American-style speed or drink sizes."
  },
  {
    slug: "berlin", name: "Berlin", short: "Berlin", code: "BER", country: "DE", locale: "en", accent: "#d4e157",
    generated: false,
    modified: "2026-07-28", displayModified: "28 July 2026",
    tagline: "No last call. Still make a plan.",
    description: "A field guide to Berlin dive bars, Kneipen, punk rooms and neighbourhood nightlife across Kreuzberg, Neukölln and Friedrichshain.",
    intro: "Berlin’s lack of a universal closing time changes the psychology of a night out: there is less pressure to arrive early, but more reason to understand the room you are entering. The city’s Kneipen, music bars and club-adjacent spaces are distinct cultures, not interchangeable stops.",
    meaning: "The closest Berlin equivalent to a dive may be an Eckkneipe—a corner pub—or a smoky-feeling rock bar, punk room or neighbourhood Kneipe. Cheapness and grit have been reshaped by gentrification, so look for living continuity rather than nostalgia for someone else’s Berlin.",
    calloutTitle: "A bar is not a club warm-up by default",
    callout: "Choose whether you want conversation, live music or a club night. Door policies, payment methods and photography rules vary sharply.",
    districts: [
      ["South", "Kreuzberg", "Kneipen, punk history, queer culture and late bars overlap. Search by micro-neighbourhood because Bergmannkiez and SO36 offer different nights."],
      ["Southeast", "Neukölln", "Weserstraße and surrounding Kieze mix neighbourhood bars, small music rooms and newer concepts. Recent local evidence is essential."],
      ["East", "Friedrichshain", "Rock, punk and club culture sit close together around RAW and residential streets. Know which experience you are actually choosing."],
      ["West", "Schöneberg & City West", "Historic queer nightlife and old-school pubs complicate the idea that every interesting Berlin night must happen in the east."]
    ],
    fieldNotes: [["Cash", "Carry euros; card acceptance is not universal."], ["Smoking", "Rules and real-world smoke levels may differ from expectations."], ["Privacy", "A no-photo rule is a rule, not a suggestion."]],
    transport: "Weekend all-night services help, but weekday gaps and replacement transport still matter. Check BVG before moving across the city.",
    etiquette: "Keep your phone away where requested, have cash, greet with a simple hallo and do not treat local regulars as evidence for your authenticity hunt.",
    faq: [
      ["What should I search for besides dive bar in Berlin?", "Try Kneipe, Eckkneipe, Rockkneipe, Musikbar and the name of the Kiez. These local terms separate neighbourhood pubs and music rooms from clubs and themed tourist bars."],
      ["Do Berlin dive bars take cards?", "Some do, but cash only service remains common enough that carrying euros is sensible. Check recent venue information and ask before ordering if the payment policy is unclear."],
      ["Can people smoke inside Berlin bars?", "Smoking conditions vary by venue, room size and local rules. Recent reviews and official venue information are the safest way to check, especially if smoke affects your health or comfort."],
      ["Which Berlin areas are useful for a Kneipe or punk bar search?", "Kreuzberg, Neukölln and Friedrichshain offer dense alternative nightlife, while Schöneberg and City West add historic queer venues and older neighbourhood pubs. Search at Kiez level because the atmosphere changes quickly between nearby streets."]
    ]
  },
  {
    slug: "amsterdam", name: "Amsterdam", short: "Amsterdam", code: "AMS", country: "NL", locale: "en", accent: "#ff5252",
    tagline: "Beyond the party postcard.",
    description: "Find dive bars and brown cafés in Amsterdam while avoiding the busiest tourist circuit and respecting the city’s neighbourhoods.",
    intro: "Amsterdam’s centre is compact enough to encourage aimless bar-hopping—and busy enough to make that a poor strategy. The city’s more characterful search includes brown cafés, music bars and neighbourhood pubs outside the most pressured visitor streets.",
    meaning: "A brown café is not simply the Dutch translation of a dive bar: it is its own tradition, often marked by dark wood, age and a stable local rhythm. Music bars and rougher late rooms add other possibilities. Search the category you actually want instead of flattening them into one label.",
    calloutTitle: "Be a visitor the city can live with",
    callout: "Amsterdam actively asks visitors to reduce nuisance. Keep noise down on residential streets, use bins and never assume the centre is a consequence-free party zone.",
    districts: [
      ["West", "Jordaan & Oud-West", "Historic cafés and neighbourhood bars sit among popular dining streets. Search side streets and judge crowd balance in real time."],
      ["East", "Amsterdam-Oost", "Bars and cultural venues serve distinct residential districts, offering a useful route beyond the central visitor circuit."],
      ["North", "Amsterdam-Noord", "The ferry opens a different map of creative spaces and local bars. Check the return connection and venue schedule."],
      ["South", "De Pijp", "Dense food and bar options make comparison easy, though the busiest streets can feel more destination-led at weekends."]
    ],
    fieldNotes: [["Category", "Brown café, music bar and coffeeshop mean different things."], ["Bikes", "Never stand in a cycle lane while checking the map."], ["Noise", "Residential canals amplify late-night sound."]],
    transport: "Walk, tram or use the free ferries where practical; if cycling, do not drink and ride, and learn the traffic rules first.",
    etiquette: "Keep groups compact, respect closing staff and neighbourhood quiet, and understand that a coffeeshop is not a conventional bar."
  },
  {
    slug: "dublin", name: "Dublin", short: "Dublin", code: "DUB", country: "IE", locale: "en-IE", accent: "#66bb6a",
    tagline: "Find the pub, not the performance of one.",
    description: "Find authentic Dublin pubs, dive bars and live-music rooms beyond the busiest Temple Bar visitor circuit.",
    intro: "Dublin’s challenge is not finding a pub; it is distinguishing a working local room from a polished export of Irish-pub imagery. Conversation, the pace of service, the shape of the counter and the regular weeknight matter more than decorative signs.",
    meaning: "‘Dive bar’ is not the natural Dublin phrase. Look for an old-school pub, neighbourhood local, music pub or unpretentious bar. A great Dublin room can be immaculate and still have character; worn furniture is not the test.",
    calloutTitle: "Temple Bar is a district, not a verdict",
    callout: "The area can be lively and convenient, but it is heavily visitor-facing. Compare price, crowd and music with Camden Street, The Liberties or northside neighbourhoods.",
    districts: [
      ["South centre", "Camden Street", "A strong late-night axis with pubs, rock rooms and music venues. Check the programme rather than assuming every room offers trad."],
      ["West centre", "The Liberties", "Historic streets and pubs sit within a lived-in community. Visit with respect and avoid reducing the area to Guinness scenery."],
      ["Northwest", "Smithfield & Stoneybatter", "Neighbourhood pubs and a village-like rhythm offer a useful contrast with the most concentrated visitor streets."],
      ["Coast", "Phibsborough & Drumcondra", "Broaden the map for locals, sports-night energy and straightforward pubs connected to residential Dublin."]
    ],
    fieldNotes: [["Rounds", "Understand the group round before joining one."], ["Music", "A session is not background entertainment."], ["Price", "Central Dublin is expensive; old-looking does not mean cheap."]],
    transport: "Check the final Luas, DART or bus and remember that late-night routes can be limited outside the centre.",
    etiquette: "Do not interrupt a traditional session, return a round if you join one and let conversation happen without forcing a performance from strangers."
  },
  {
    slug: "edinburgh", name: "Edinburgh", short: "Edinburgh", code: "EDI", country: "GB", locale: "en-GB", accent: "#90a4ae",
    tagline: "Stone closes in. The night opens out.",
    description: "Find Edinburgh dive bars, old pubs and alternative music rooms from the Old Town closes to Leith and Southside.",
    intro: "Edinburgh’s compact centre hides sharp changes in elevation, crowd and purpose. A cellar bar near the Royal Mile, a student music room in Southside and a Leith local may sit only minutes apart on a map while offering entirely different versions of the city.",
    meaning: "The Edinburgh equivalent of a dive is often an old pub, basement rock bar or unpretentious local. History is everywhere, so age is not enough; the stronger signs are a genuine regular crowd, a clear music identity and a room that works outside festival season.",
    calloutTitle: "Festival Edinburgh is a different city",
    callout: "During August and Hogmanay, capacity, prices and opening patterns change. Confirm entry and do not rely on an ordinary-week guide.",
    districts: [
      ["Old Town", "Cowgate & South Bridge", "Cellars, live music, rock and student energy concentrate below street level. Stairs and accessibility require checking."],
      ["South", "Southside & Newington", "Student pubs, small rooms and cultural venues make a useful route away from the busiest Old Town closes."],
      ["North", "Leith Walk & Leith", "Neighbourhood pubs, music and a distinct port identity reward a dedicated evening rather than a rushed extension from the centre."],
      ["West", "Dalry & Gorgie", "Look for straightforward locals and match-night energy beyond the visitor core, with transport planned around the final bus."]
    ],
    fieldNotes: [["Terrain", "A short route may include steep closes and stairs."], ["Festival", "August rewrites normal demand."], ["Weather", "Wind and rain make distant backups less useful."]],
    transport: "The centre is walkable, but hills, weather and late buses matter. Keep a realistic route home from Leith or the west.",
    etiquette: "Do not demand a ‘Scottish experience’, respect live performers and understand that a quiet local is not there to entertain a tour group."
  },
  {
    slug: "manchester", name: "Manchester", short: "Manchester", code: "MAN", country: "GB", locale: "en-GB", accent: "#ff6b35",
    region: "Europe", regionHub: "europe.html", managed: true,
    published: "2026-09-02", modified: "2026-09-02", displayModified: "2 September 2026",
    seoTitle: "Dive Bars in Manchester: Rock and Alternative Nightlife",
    tagline: "Follow the railway arches and the riff.",
    description: "Find Manchester dive bars, rock pubs and alternative music rooms across Oxford Road, the Northern Quarter, Ancoats and Salford.",
    intro: "Manchester rewards a music-first bar search. Everyday pubs, basement rooms, gig venues and late alternative clubs sit close together in the centre, but they do different jobs. Decide whether you want a drink, a soundtrack, a live bill or a club night before following the nearest pin.",
    meaning: "A Manchester dive might be a compact basement bar, a rock pub near a station, an independent music venue or a no-frills local outside the centre. The strongest signal is a room with a clear identity and a crowd that returns between major event nights, not a wall of borrowed music memorabilia.",
    calloutTitle: "Oxford Road is a route, not one neighbourhood",
    callout: "The corridor runs from the city centre past universities and major venues. Check walking time and the exact entrance before assuming two nearby pins belong to the same part of the night.",
    districts: [
      ["South centre", "Oxford Road & Princess Street", "Rock pubs, basement bars and live rooms cluster around the stations and university corridor. Separate an everyday bar from a ticketed venue before setting off."],
      ["Northeast", "Northern Quarter & Ancoats", "Independent bars, small venues and busy weekend streets overlap. Look beyond décor and compare the current programme, crowd and closing time."],
      ["West", "Salford & Chapel Street", "Independent venues and neighbourhood pubs continue beyond the city boundary on the map. Treat Salford as its own route rather than a casual final stop."],
      ["South", "Hulme & Moss Side edges", "Community venues, pubs and DIY culture sit outside the most obvious visitor circuit. Current event information matters more than an old best-of list."]
    ],
    fieldNotes: [["Search", "Try rock pub, metal bar, punk venue and live music alongside Manchester."], ["Programme", "A familiar venue can change character completely between events."], ["Route", "Oxford Road and Piccadilly are different late-night starting points."]],
    transport: "Use Transport for Greater Manchester's journey planner for the last tram, bus or train, especially when the route crosses into Salford.",
    transportUrl: "https://tfgm.com/plan-a-journey",
    transportLabel: "Plan a journey with Transport for Greater Manchester",
    etiquette: "Buy a ticket when the bill is the point, give the support act a chance and do not treat a working music pub like a themed photo stop.",
    faq: [
      ["Where should I start looking for alternative bars in Manchester?", "Oxford Road and Princess Street are useful for rock pubs, basement bars and venues. The Northern Quarter and Ancoats offer another compact search area, while Salford deserves a separate route."],
      ["Should I search for dive bars or rock pubs in Manchester?", "Try both, then add metal bar, punk venue and live music. Dive bar is only one label, while many characterful Manchester rooms describe themselves through music or venue type."],
      ["How do I plan a late night across Manchester and Salford?", "Check the final tram, bus or train before leaving the first area. Straight-line distance can hide a slow late-night connection, so keep one backup close to your starting point."]
    ]
  },
  {
    slug: "glasgow", name: "Glasgow", short: "Glasgow", code: "GLA", country: "GB", locale: "en-GB", accent: "#4dd0e1",
    region: "Europe", regionHub: "europe.html", managed: true,
    published: "2026-09-02", modified: "2026-09-02", displayModified: "2 September 2026",
    seoTitle: "Dive Bars in Glasgow: Rock Pubs and Alternative Nights",
    tagline: "One good room can carry the whole night.",
    description: "Find Glasgow dive bars, rock pubs and alternative nightlife across the city centre, Finnieston, the West End and the Southside.",
    intro: "Glasgow's best bar searches are built around conversation and music rather than a checklist of décor. The city centre offers compact late-night options, while Finnieston, the West End and the Southside work better as focused neighbourhood evenings than as add-ons to a central crawl.",
    meaning: "The local equivalent of a dive is often an unpretentious pub, a music bar or a small room with a steady crowd. It can be bright, tidy and still full of character. Search for the atmosphere and soundtrack you want instead of expecting every useful result to use the American label.",
    calloutTitle: "Do not confuse a gig room with a late bar",
    callout: "Glasgow's live-music identity creates plenty of promising pins, but a venue may only open around a ticketed show. Verify ordinary bar hours separately from doors and stage times.",
    districts: [
      ["Centre", "Sauchiehall Street & Bath Street", "Rock bars, late venues and busy nightlife sit within a compact grid. Check current opening patterns because the street changes quickly between early evening and late night."],
      ["West", "Finnieston", "Music venues, pubs and newer bars share the same corridor. Compare recent evidence so an atmospheric room is not confused with a polished destination bar."],
      ["Northwest", "West End", "Traditional pubs, student nights and music-led rooms spread around Byres Road and Great Western Road. Pick one corridor before moving farther west."],
      ["South", "Southside", "Neighbourhood pubs and independent venues around Shawlands and Govanhill reward a dedicated search. Keep the return route in view after the subway stops."]
    ],
    fieldNotes: [["Search", "Try rock bar, music pub, punk bar and late bar alongside Glasgow."], ["Timing", "A gig-night room and its ordinary weekday version may feel unrelated."], ["Distance", "The Clyde and late transport can turn a short map line into a longer trip."]],
    transport: "Check Strathclyde Partnership for Transport information before relying on the subway or a connection beyond the city centre late at night.",
    transportUrl: "https://www.spt.co.uk/travel-with-spt/",
    transportLabel: "Check late travel with SPT",
    etiquette: "Let conversation develop naturally, support independent venues when you use their rooms and never mistake friendliness for an invitation to perform a Glasgow stereotype.",
    faq: [
      ["What should I search for besides dive bar in Glasgow?", "Try rock bar, music pub, punk bar, late bar and the neighbourhood name. Many unpretentious Glasgow rooms are described by their music or pub identity rather than as dive bars."],
      ["Which Glasgow areas are useful for alternative nightlife?", "The city centre has the densest late-night cluster. Finnieston and the West End offer strong music and pub routes, while the Southside works best as its own neighbourhood evening."],
      ["Does Glasgow's subway run all night?", "Do not assume it does. Check current SPT information and plan a bus, taxi or walk before the final service, particularly when crossing between the centre, West End and Southside."]
    ]
  },
  {
    slug: "bristol", name: "Bristol", short: "Bristol", code: "BRS", country: "GB", locale: "en-GB", accent: "#ff4d9d",
    region: "Europe", regionHub: "europe.html", managed: true,
    published: "2026-09-02", modified: "2026-09-02", displayModified: "2 September 2026",
    seoTitle: "Dive Bars in Bristol: Alternative Pubs and Music Rooms",
    tagline: "Old pubs, small rooms, steep streets.",
    description: "Find Bristol dive bars, alternative pubs and independent music rooms across the Old City, Stokes Croft, Gloucester Road and Bedminster.",
    intro: "Bristol's alternative nightlife is spread between historic centre pubs, independent music rooms and neighbourhood corridors climbing away from the harbour. The most useful search starts with the kind of room you need, then checks whether tonight is an ordinary bar session, a club night or a ticketed show.",
    meaning: "A Bristol dive may look like an old pub, a basement metal bar, a DIY venue or a lived-in local. The city's independent culture matters more than a fixed visual formula. Rough edges alone do not make a place authentic, and a historic frontage says little about tonight's music.",
    calloutTitle: "The hill changes the backup plan",
    callout: "A second option that looks close can sit at the top of a steep climb or across the harbour. Choose a compact area and keep one realistic backup within it.",
    districts: [
      ["Centre", "Old City & St Nicholas", "Historic pubs, basement rooms and central venues sit close together. Check access, stairs and the live programme before relying on an old description."],
      ["North", "Stokes Croft", "Independent venues, late bars and street-level culture create a strong alternative route. Respect residents and do not turn the neighbourhood into a backdrop."],
      ["North", "Gloucester Road", "A long corridor of pubs, music and independent businesses rewards a route built around the bus rather than a city-centre loop."],
      ["South", "Bedminster & Southville", "Neighbourhood pubs, arts spaces and music venues across the river suit a separate evening, with the final connection planned before the first drink."]
    ],
    fieldNotes: [["Search", "Try alternative pub, punk venue, metal bar and gig pub alongside Bristol."], ["Terrain", "A short distance can include a steep climb or harbour crossing."], ["Format", "Check whether the listing is a pub, venue, club night or all three."]],
    transport: "Use Travelwest for current bus, walking and cycling information, and do not plan to ride a bicycle or scooter after drinking.",
    transportUrl: "https://travelwest.info/",
    transportLabel: "Plan the route with Travelwest",
    etiquette: "Pay for the show when a venue is hosting one, keep residential streets quiet and support the independent rooms whose programmes create the scene.",
    faq: [
      ["Where should I look for alternative bars in Bristol?", "Start with the Old City and St Nicholas for a compact central search, or build a separate route around Stokes Croft and Gloucester Road. Bedminster and Southville work better as their own evening."],
      ["What search terms work for Bristol's alternative nightlife?", "Try alternative pub, punk venue, metal bar, gig pub and independent music venue. Check the programme because many Bristol rooms change style by event."],
      ["Can I walk between Bristol nightlife areas?", "Some central routes are walkable, but hills, the harbour and late-night conditions matter. Compare travel time rather than distance and keep a nearby backup."]
    ]
  },
  {
    slug: "liverpool", name: "Liverpool", short: "Liverpool", code: "LPL", country: "GB", locale: "en-GB", accent: "#ffd166",
    region: "Europe", regionHub: "europe.html", managed: true,
    published: "2026-09-02", modified: "2026-09-02", displayModified: "2 September 2026",
    seoTitle: "Dive Bars in Liverpool: Rock Pubs and Punk Venues",
    tagline: "Look beyond the obvious music history.",
    description: "Find Liverpool dive bars, rock pubs and punk venues across the Ropewalks, Baltic Triangle, Georgian Quarter and north city centre.",
    intro: "Liverpool's music reputation can make search results feel broader than the night you actually want. A heritage venue, an everyday rock pub, a grassroots gig room and a visitor-facing live bar are different choices. Start with the format, then choose a compact part of the centre.",
    meaning: "A Liverpool dive is more likely to call itself a pub, rock bar, music bar or independent venue. Character comes from regular use, a clear soundtrack and a room that works when no famous story is being retold. The strongest pages and listings explain what happens there now.",
    calloutTitle: "Music history is context, not tonight's programme",
    callout: "A famous address can still be the wrong room for the current night. Check who is playing, whether entry is ticketed and what happens after the show.",
    districts: [
      ["Centre", "Ropewalks", "Independent bars, rock pubs and small venues cluster around Slater Street, Seel Street and Bold Street. Street-by-street differences make this the easiest comparison zone."],
      ["South centre", "Georgian Quarter", "Traditional pubs, student routes and independent music venues overlap around Hope Street and the university edge. Check whether the room is event-led."],
      ["South", "Baltic Triangle", "Warehouses, venues and destination bars create a looser route. Confirm the exact event and return journey before leaving the central cluster."],
      ["North centre", "Cavern Quarter & Dale Street", "Music heritage and visitor traffic dominate parts of the area, but independent rooms still exist nearby. Current identity matters more than a famous postcode."]
    ],
    fieldNotes: [["Search", "Try rock pub, punk venue, music bar and grassroots venue alongside Liverpool."], ["History", "A legendary address does not guarantee the soundtrack you want tonight."], ["Cluster", "Ropewalks is compact; the Baltic Triangle needs a more deliberate route."]],
    transport: "Check Merseytravel information for the last train or bus, especially when the night crosses the city centre, Baltic Triangle or the river.",
    transportUrl: "https://www.merseytravel.gov.uk/",
    transportLabel: "Check the journey with Merseytravel",
    etiquette: "Listen to the current bands, not only the city's history, respect working pubs and keep residential routes quiet when leaving late.",
    faq: [
      ["Where should I start looking for rock bars in Liverpool?", "Ropewalks is the easiest compact search around Slater Street, Seel Street and Bold Street. The Georgian Quarter and Baltic Triangle offer different venue-led routes, so treat them separately."],
      ["How do I find Liverpool punk and metal venues?", "Search punk venue, metal bar, rock pub, grassroots venue and the date you are going. Many useful rooms are programme-led rather than permanently tied to one genre."],
      ["Is every Liverpool music bar aimed at live bands?", "No. Some are everyday pubs with a strong soundtrack, some host ticketed gigs and others are visitor-facing live bars. Check the current programme and entry details before choosing."]
    ]
  },
  {
    slug: "tokyo", name: "Tokyo", short: "Tokyo", code: "TYO", country: "JP", locale: "en", accent: "#ff1744",
    tagline: "One door. Eight seats. A whole night.",
    description: "Find Tokyo dive bars, tiny music bars, izakaya and live houses with practical neighbourhood, etiquette and last-train guidance.",
    intro: "Tokyo turns bar discovery vertical. A building may hold a different eight-seat world on every floor, and the most interesting door may reveal almost nothing from the street. The challenge is not scarcity but interpreting categories, cover charges and welcome signals correctly.",
    meaning: "‘Dive bar’ is an imperfect translation here. You may be looking for a tiny music bar, tachinomi standing bar, izakaya, rock bar, jazz kissa or live house. Each has its own purpose. A small, aged room is not automatically casual, cheap or open to every group size.",
    calloutTitle: "Read the door before opening it",
    callout: "Check seating charges, cover, membership cues, language information and group capacity. If staff say the room is full, accept it without argument.",
    districts: [
      ["West", "Shinjuku", "Golden Gai, Kabukichō and Ni-chōme contain very different cultures in a tight area. Avoid touts and choose a room whose rules you understand."],
      ["Southwest", "Shibuya", "Clubs, live houses and music bars stack across a busy district. Check the exact floor, entry time and last admission."],
      ["West", "Shimokitazawa", "Live houses, record culture and small bars make this a strong music-first search with a more neighbourhood-scale street pattern."],
      ["West", "Koenji", "Punk, underground music, izakaya and small rooms reward patient exploration and current Japanese-language event research."]
    ],
    fieldNotes: [["Capacity", "Eight seats means your group may not fit."], ["Charges", "Cover and otōshi seating charges are normal in many places."], ["Trains", "Miss the last train and the plan changes until morning."]],
    transport: "Build the evening backwards from the last train unless you deliberately plan to stay out until first service. Taxis across Tokyo are costly.",
    etiquette: "Keep voices low in tiny rooms, do not photograph without permission, order at a reasonable pace and never follow street touts into an unknown venue."
  },
  {
    slug: "melbourne", name: "Melbourne", short: "Melbourne", code: "MEL", country: "AU", locale: "en-AU", accent: "#26c6da",
    tagline: "Laneways, band rooms and the long way home.",
    description: "Find Melbourne dive bars, live-music pubs and neighbourhood rooms across Fitzroy, Collingwood, Brunswick and St Kilda.",
    intro: "Melbourne’s nightlife identity sits at the intersection of laneway bars, suburban pubs and one of the world’s densest live-music ecosystems. The CBD hides doors vertically; the inner north spreads band rooms and locals along tram corridors.",
    meaning: "A Melbourne dive might be a front bar attached to a band room, an old pub, a basement bar or an unfussy neighbourhood local. The music programme often tells you more than the décor, while a renovated pub can still function as a genuine community room.",
    calloutTitle: "Front bar and band room are different choices",
    callout: "A pub can offer a casual drink at the front and a ticketed show behind it. Check which space, door time and access your listing refers to.",
    districts: [
      ["Inner north", "Fitzroy & Collingwood", "Brunswick and Smith Streets combine bars, pubs and music rooms in walkable clusters, with atmosphere changing sharply by night."],
      ["North", "Brunswick", "Sydney Road supports live music, multicultural food and neighbourhood pubs over a long corridor. Use the tram route to shape the search."],
      ["Centre", "CBD laneways", "Hidden entrances, basements and vertical venues reward precise addresses. A pin may be correct even when the door is not obvious."],
      ["South", "St Kilda", "Beachside pub and live-music history create a distinct route, best treated as its own night rather than a late CBD detour."]
    ],
    fieldNotes: [["Music", "Check whether the listing means front bar or ticketed band room."], ["Transit", "Night Network frequency varies by route and day."], ["Scale", "A CBD pin may hide several floors of venues."]],
    transport: "Use trams to build a corridor-based night and confirm Night Network services before relying on a late return from the inner suburbs.",
    etiquette: "Pay the cover, listen to the support act, respect smoking-area neighbours and do not call every old pub a hidden gem."
  }
];

cities.push(...expansionCities);

const appUrl = "https://apps.apple.com/gb/app/dive-bar-finder/id6758267440";
const date = "2026-09-02";
const displayDate = "2 September 2026";

const europeanCountries = new Set(["AT", "BE", "CZ", "DE", "DK", "ES", "FI", "FR", "GB", "GR", "HU", "IE", "IT", "NL", "NO", "PL", "PT", "SE"]);
const northAmericanCountries = new Set(["CA", "MX", "US"]);

function regionFor(city) {
  if (city.region) return city.region;
  if (europeanCountries.has(city.country)) return "Europe";
  if (northAmericanCountries.has(city.country)) return "North America";
  return "Worldwide";
}

function regionHubFor(city) {
  const region = regionFor(city);
  if (region === "Europe") return "europe.html";
  if (region === "North America") return "north-america.html";
  return "cities.html";
}

function esc(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function page(city, index) {
  const siblings = cities.filter((candidate) => regionFor(candidate) === regionFor(city));
  const siblingIndex = siblings.findIndex((candidate) => candidate.slug === city.slug);
  const prev = siblings[(siblingIndex - 1 + siblings.length) % siblings.length];
  const next = siblings[(siblingIndex + 1) % siblings.length];
  const regionalHub = regionHubFor(city);
  const regionalLabel = regionFor(city) === "Worldwide" ? "City guides" : `${regionFor(city)} guides`;
  const districts = city.districts.map(([zone, name, copy]) => `
          <article><span>${zone}</span><h3>${name}</h3><p>${copy}</p></article>`).join("");
  const notes = city.fieldNotes.map(([label, copy]) => `
            <article><span>${label}</span><h3>${label}</h3><p>${copy}</p></article>`).join("");
  const faq = city.faq ?? [];
  const faqMarkup = faq.length ? `
        <section class="guide-faq" aria-labelledby="${city.slug}-faq">
          <h2 id="${city.slug}-faq">${city.short} dive bar questions</h2>
          ${faq.map(([question, answer]) => `<details><summary>${question}</summary><p class="answer">${answer}</p></details>`).join("\n          ")}
        </section>` : "";
  const articleSchema = {"@type":"Article","headline":city.seoTitle ?? `Dive Bars in ${city.name}: ${city.tagline}`,"description":city.description,"image":"https://divebarfinder.info/assets/app-store/screenshot-6.webp","author":{"@type":"Organization","name":"Dive Bar Finder","url":"https://divebarfinder.info/about.html"},"publisher":{"@type":"Organization","name":"Fear Army LTD","logo":{"@type":"ImageObject","url":"https://divebarfinder.info/assets/app-store/app-icon.jpg"}},"datePublished":city.published ?? date,"dateModified":city.modified ?? date,"mainEntityOfPage":`https://divebarfinder.info/guides/dive-bars-${city.slug}.html`,"about":{"@type":"Place","name":city.name,"address":{"@type":"PostalAddress","addressLocality":city.name,"addressCountry":city.country}}};
  const breadcrumbSchema = {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://divebarfinder.info/"},{"@type":"ListItem","position":2,"name":"City guides","item":"https://divebarfinder.info/guides/cities.html"},{"@type":"ListItem","position":3,"name":regionalLabel,"item":`https://divebarfinder.info/guides/${regionalHub}`},{"@type":"ListItem","position":4,"name":`Dive bars in ${city.name}`,"item":`https://divebarfinder.info/guides/dive-bars-${city.slug}.html`} ]};
  const faqSchema = faq.length ? {"@type":"FAQPage","mainEntity":faq.map(([question, answer]) => ({"@type":"Question","name":question,"acceptedAnswer":{"@type":"Answer","text":answer}}))} : null;
  const graph = [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];
  return `<!doctype html>
<html lang="${city.locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${city.seoTitle ?? `Dive Bars in ${city.name}: A Local Search Guide | Dive Bar Finder`}</title>
    <meta name="description" content="${esc(city.description)}" />
    <link rel="canonical" href="https://divebarfinder.info/guides/dive-bars-${city.slug}.html" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="Dive Bars in ${city.name}: ${city.tagline}" />
    <meta property="og:description" content="${esc(city.description)}" />
    <meta property="og:url" content="https://divebarfinder.info/guides/dive-bars-${city.slug}.html" />
    <meta property="og:image" content="https://divebarfinder.info/assets/app-store/screenshot-6.webp" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="../assets/app-store/app-icon.jpg" />
    <link rel="stylesheet" href="../styles.css" />
    <script type="application/ld+json">
      ${JSON.stringify({"@context":"https://schema.org","@graph":graph}, null, 2)}
    </script>
  </head>
  <body class="city-guide world-city-guide" style="--city-accent:${city.accent}">
    <header class="site-header">
      <div class="wrap nav">
        <a class="brand" href="../index.html"><img src="../assets/app-store/app-icon.jpg" alt="Dive Bar Finder app icon" />Dive Bar Finder</a>
        <button class="menu" aria-label="Open navigation" aria-expanded="false">☰</button>
        <nav class="navlinks" aria-label="Main navigation"><a href="../index.html#how">How it works</a><a href="cities.html">City guides</a><a href="../about.html">About</a><a class="nav-cta" data-download-source="${city.slug}-nav" href="${appUrl}">Get the app</a></nav>
      </div>
    </header>
    <main>
      <section class="guide-hero world-city-hero">
        <div class="world-grid" aria-hidden="true"></div>
        <div class="wrap">
          <div class="breadcrumbs"><a href="../index.html">Home</a> / <a href="cities.html">City guides</a> / <a href="${regionalHub}">${regionalLabel}</a> / ${city.name}</div>
          <div class="city-stamp" aria-hidden="true">${city.code}<br />${String(index + 2).padStart(2, "0")}</div>
          <div class="eyebrow">After-dark field notes · ${city.country}</div>
          <h1>Dive bars in ${city.name}. <em>${city.tagline}</em></h1>
          <p class="guide-dek">${city.description}</p>
          <div class="guide-meta"><span>8 minute read</span><span>Updated ${city.displayModified ?? displayDate}</span><span>By <a href="../about.html">Dive Bar Finder</a></span></div>
        </div>
      </section>

      <article class="article article-wrap">
        <p class="article-lead">${city.intro}</p>
        <h2>What “dive bar” means in ${city.name}</h2>
        <p>${city.meaning}</p>
        <div class="callout"><h3>${city.calloutTitle}</h3><p>${city.callout}</p></div>
        <h2>Where to begin your ${city.short} search</h2>
        <p>These areas are search zones, not endorsements of every result inside them. Venues change, event nights move and neighbourhoods belong to the people who live there. Use the map to compare current evidence.</p>
      </article>

      <section class="district-board" aria-label="${city.name} nightlife search areas">
        <div class="wrap district-grid">${districts}
        </div>
      </section>

      <article class="article article-wrap">
        <h2>How to find a ${city.short} dive tonight</h2>
        <ol class="route-steps">
          <li><strong>Open the map where you are.</strong> Use Nearby in Dive Bar Finder so distance and open status reflect your real starting point, not a generic city centre.</li>
          <li><strong>Choose the character you want.</strong> Start with Dive bars, then add rock, metal, punk, gothic or unique/alternative when the scene matters more than the label.</li>
          <li><strong>Compare a small cluster.</strong> Use list view for ratings, Dive Score and open status, then map view to see whether two or three candidates form a realistic route.</li>
          <li><strong>Check the live details.</strong> Verify hours, door policy, programme, accessibility and payment information with the venue before making a special journey.</li>
          <li><strong>Save the good ones.</strong> Favourite candidates and check in after a visit so your collection becomes a useful personal map of ${city.name}.</li>
        </ol>

        <h2>${city.short} night field notes</h2>
        <div class="intent-cards city-notes">${notes}
        </div>

        <h2>Getting home changes the search</h2>
        <p>${city.transport}${city.transportUrl ? ` <a href="${city.transportUrl}">${city.transportLabel} ↗</a>` : ""}</p>
        <p>A responsible route includes the return journey. Never drive after drinking, and use official transport information because schedules, closures and local conditions can change without notice.</p>

        <h2>Enter as a guest</h2>
        <p>${city.etiquette}</p>
        <p>Characterful bars are communities, workplaces and sometimes small cultural institutions. Recent safety, accessibility and venue information should always outweigh a romantic description of grit.</p>

        ${faqMarkup.trimStart()}

        <section class="article-cta london-cta">
          <div><span class="eyebrow">The live map beats the old list</span><h2>Find your ${city.short} bar.</h2><p>Compare nearby options, filter by scene, save favourites and open directions on your iPhone.</p></div>
          <a class="app-button" data-download-source="dive-bars-${city.slug}" href="${appUrl}">Download Dive Bar Finder</a>
        </section>
      </article>
      <section class="related"><div class="article-wrap"><h3>Next city</h3><div class="related-grid"><a href="dive-bars-${prev.slug}.html">${prev.name} after dark →</a><a href="${regionalHub}">Explore ${regionalLabel.toLowerCase()} →</a><a href="dive-bars-${next.slug}.html">${next.name} after dark →</a></div></div></section>
    </main>
    <script src="../script.js"></script>
  </body>
</html>`;
}

function regionalHub(region, slug, title, description, intro, extraCity = null) {
  const items = cities.filter((city) => regionFor(city) === region);
  const cards = [
    ...(extraCity ? [extraCity] : []),
    ...items,
  ].map((city) => `<a href="${city.href ?? `dive-bars-${city.slug}.html`}" style="--city-accent:${city.accent}"><span>${city.code}</span><h2>${city.name}</h2><p>${city.tagline}</p><b>Open field guide ↗</b></a>`).join("");
  const hasPart = [
    ...(extraCity ? [extraCity] : []),
    ...items,
  ].map((city) => ({"@type":"Article","name":`Dive bars in ${city.name}`,"url":`https://divebarfinder.info/guides/${city.href ?? `dive-bars-${city.slug}.html`}`}));
  return `<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="https://divebarfinder.info/guides/${slug}.html" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="https://divebarfinder.info/guides/${slug}.html" />
    <meta property="og:image" content="https://divebarfinder.info/assets/app-store/screenshot-6.webp" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="../assets/app-store/app-icon.jpg" />
    <link rel="stylesheet" href="../styles.css" />
    <script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"CollectionPage","name":title,"description":description,"url":`https://divebarfinder.info/guides/${slug}.html`,"dateModified":date,"isPartOf":{"@type":"CollectionPage","name":"World City Dive Bar Guides","url":"https://divebarfinder.info/guides/cities.html"},"hasPart":hasPart}, null, 2)}</script>
  </head>
  <body class="cities-hub">
    <header class="site-header"><div class="wrap nav"><a class="brand" href="../index.html"><img src="../assets/app-store/app-icon.jpg" alt="Dive Bar Finder app icon" />Dive Bar Finder</a><button class="menu" aria-label="Open navigation" aria-expanded="false">☰</button><nav class="navlinks" aria-label="Main navigation"><a href="../index.html#how">How it works</a><a href="cities.html">City guides</a><a href="../about.html">About</a><a class="nav-cta" data-download-source="${slug}-nav" href="${appUrl}">Get the app</a></nav></div></header>
    <main>
      <section class="atlas-hero"><div class="atlas-orbit" aria-hidden="true"></div><div class="wrap"><div class="breadcrumbs"><a href="../index.html">Home</a> / <a href="cities.html">City guides</a> / ${region}</div><div class="eyebrow">The after-dark atlas · ${String(items.length + (extraCity ? 1 : 0)).padStart(2, "0")} cities</div><h1>${region}.<br /><em>After dark.</em></h1><p>${intro}</p><a class="atlas-jump" href="#city-index">Choose a city <span>↓</span></a></div></section>
      <section class="atlas-manifesto"><div class="wrap"><span>How to use it</span><p>Choose a city, understand its neighbourhoods and local scene language, then use the live map for current nearby results. Every guide includes a route-home check.</p></div></section>
      <section class="city-index wrap" id="city-index"><section class="city-region"><div class="city-region-title"><span>${region} city guides</span><b>${String(items.length + (extraCity ? 1 : 0)).padStart(2, "0")}</b></div><div class="city-index-grid">${cards}</div></section></section>
      <section class="related"><div class="article-wrap"><h3>Keep exploring</h3><div class="related-grid"><a href="cities.html">World city atlas →</a><a href="${region === "Europe" ? "north-america.html" : "europe.html"}">${region === "Europe" ? "North America" : "Europe"} guides →</a><a href="../index.html#how">How Dive Bar Finder works →</a></div></div></section>
      <section class="article-cta atlas-cta wrap"><div><span class="eyebrow">${items.length + (extraCity ? 1 : 0)} cities. One live map.</span><h2>Find the room you will remember.</h2><p>Download Dive Bar Finder for iPhone and turn the field guide into a nearby search.</p></div><a class="app-button" data-download-source="${slug}-hub" href="${appUrl}">Download Dive Bar Finder</a></section>
    </main><script src="../script.js"></script>
  </body>
</html>`;
}

function manifest() {
  const managed = cities.filter((city) => city.managed);
  return managed.map((city, index) => {
    const hub = regionHubFor(city);
    const siblings = managed.filter((candidate) => regionFor(candidate) === regionFor(city));
    const siblingIndex = siblings.findIndex((candidate) => candidate.slug === city.slug);
    const prev = siblings[(siblingIndex - 1 + siblings.length) % siblings.length];
    const next = siblings[(siblingIndex + 1) % siblings.length];
    const searchTerms = city.searchTerms ?? city.fieldNotes?.find(([label]) => label === "Search language")?.[1]?.split(", ") ?? ["dive bar", "rock bar", "alternative nightlife"];
    return {
      slug: `/guides/dive-bars-${city.slug}`,
      canonical_path: `/guides/dive-bars-${city.slug}.html`,
      page_family: "city-guide",
      primary_query: `dive bars ${city.name.toLowerCase()}`,
      secondary_queries: [`rock bars ${city.name.toLowerCase()}`, `alternative bars ${city.name.toLowerCase()}`, `punk bars ${city.name.toLowerCase()}`],
      search_intent: "commercial",
      audience: `${city.name} visitors and locals looking for unpretentious or alternative nightlife`,
      user_problem: `The searcher needs current local terminology, a realistic neighbourhood cluster and a safe route home in ${city.name}.`,
      unique_value: `Explains ${city.districts.map((district) => district[1]).join(", ")} as distinct search zones, with local scene language, transport context and live verification checks.`,
      evidence: ["Current public search results reviewed on 2026-09-02", `${city.transit ?? "Official local transport information"}`, "First-party Dive Bar Finder workflow and category filters"],
      template_fields: {city: city.name, region: regionFor(city), district_count: city.districts.length, field_note_count: city.fieldNotes.length, search_terms: searchTerms},
      hub_slug: `/guides/${hub.replace(".html", "")}`,
      hub_path: `/guides/${hub}`,
      internal_links_in: [`/guides/${hub.replace(".html", "")}`, index === 0 ? "/guides/cities" : `/guides/dive-bars-${managed[index - 1].slug}`],
      internal_links_out: [`/guides/${hub.replace(".html", "")}`, `/guides/dive-bars-${prev.slug}`, `/guides/dive-bars-${next.slug}`],
      conversion_path: `Download Dive Bar Finder and open the ${city.name} map with scene filters`,
      indexing_decision: "index",
      risk_flags: ["Venue and transport information can change and must be verified live"],
      status: "verified-local",
      verified_on: date,
      score: {business_fit:5,intent_value:4,differentiation:4,evidence:4,usefulness:4,authority_fit:5,conversion_path:5,competitiveness:3,cannibalisation:1,maintenance:2,content_risk:1,priority:39},
    };
  });
}

function htmlFiles(directory) {
  return readdirSync(directory, {withFileTypes:true}).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === "node_modules") return [];
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.isFile() && entry.name.endsWith(".html") ? [path] : [];
  });
}

function sitemap() {
  const previous = readFileSync("sitemap.xml", "utf8");
  const previousDates = new Map([...previous.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((match) => [match[1], match[2]]));
  const changed = new Set(["https://divebarfinder.info/", "https://divebarfinder.info/guides/cities.html", "https://divebarfinder.info/guides/europe.html", "https://divebarfinder.info/guides/north-america.html", ...cities.filter((city) => city.managed).map((city) => `https://divebarfinder.info/guides/dive-bars-${city.slug}.html`)]);
  const urls = htmlFiles(".").map((file) => {
    const source = readFileSync(file, "utf8");
    const canonical = source.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    if (!canonical) throw new Error(`Missing canonical in ${file}`);
    const lastmod = changed.has(canonical) ? date : previousDates.get(canonical) ?? date;
    return {canonical, lastmod};
  }).sort((a, b) => a.canonical.localeCompare(b.canonical));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({canonical,lastmod}) => `  <url>\n    <loc>${canonical}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join("\n")}\n</urlset>\n`;
}

function hub() {
  const regions = [
    ["United States", cities.slice(0, 6)],
    ["Canada", cities.slice(6, 8)],
    ["Europe", cities.slice(8, 17)],
    ["Asia Pacific", cities.slice(17)]
  ];
  const cards = regions.map(([region, items]) => `<section class="city-region"><div class="city-region-title"><span>${region}</span><b>${String(items.length).padStart(2,"0")}</b></div><div class="city-index-grid">${items.map((c) => `<a href="dive-bars-${c.slug}.html" style="--city-accent:${c.accent}"><span>${c.code}</span><h2>${c.name}</h2><p>${c.tagline}</p><b>Open field guide ↗</b></a>`).join("")}</div></section>`).join("");
  return `<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>World City Dive Bar Guides | Dive Bar Finder</title>
    <meta name="description" content="Explore practical, neighbourhood-first guides to dive bars and alternative nightlife in London, New York, Los Angeles, Tokyo, Berlin and more great cities." />
    <link rel="canonical" href="https://divebarfinder.info/guides/cities.html" />
    <meta property="og:type" content="website" /><meta property="og:title" content="After-dark field guides for the world’s great bar cities" /><meta property="og:description" content="No stale top-ten lists. Learn how each city works, then use the live map to find your room." /><meta property="og:url" content="https://divebarfinder.info/guides/cities.html" /><meta property="og:image" content="https://divebarfinder.info/assets/app-store/screenshot-6.webp" /><meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="../assets/app-store/app-icon.jpg" /><link rel="stylesheet" href="../styles.css" />
    <script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"CollectionPage","name":"World City Dive Bar Guides","description":"Neighbourhood-first guides to dive bars and alternative nightlife in major world cities.","url":"https://divebarfinder.info/guides/cities.html","dateModified":"2026-09-02","isPartOf":{"@type":"WebSite","name":"Dive Bar Finder","url":"https://divebarfinder.info/"},"hasPart":[{"@type":"Article","name":"Dive bars in London","url":"https://divebarfinder.info/guides/dive-bars-london.html"},...cities.map(c=>({"@type":"Article","name":`Dive bars in ${c.name}`,"url":`https://divebarfinder.info/guides/dive-bars-${c.slug}.html`})),{"@type":"Article","name":"Punk, metal and goth places in Berlin","url":"https://divebarfinder.info/guides/alternative-bars-berlin.html"},{"@type":"Article","name":"Punk, rock and metal bars in Montréal","url":"https://divebarfinder.info/guides/punk-rock-bars-montreal.html"}]}, null, 2)}</script>
  </head>
  <body class="cities-hub">
    <header class="site-header"><div class="wrap nav"><a class="brand" href="../index.html"><img src="../assets/app-store/app-icon.jpg" alt="Dive Bar Finder app icon" />Dive Bar Finder</a><button class="menu" aria-label="Open navigation" aria-expanded="false">☰</button><nav class="navlinks" aria-label="Main navigation"><a href="../index.html#how">How it works</a><a href="cities.html">City guides</a><a href="../about.html">About</a><a class="nav-cta" data-download-source="cities-nav" href="${appUrl}">Get the app</a></nav></div></header>
    <main>
      <section class="atlas-hero"><div class="atlas-orbit" aria-hidden="true"></div><div class="wrap"><div class="eyebrow">The after-dark atlas · Edition 01</div><h1>Good bars.<br /><em>Great cities.</em></h1><p>Every city has its own word for character. These guides explain the neighbourhoods, transport, etiquette and scene signals—then hand the search to the live map.</p><a class="atlas-jump" href="#city-index">Choose a city <span>↓</span></a></div></section>
      <section class="atlas-manifesto"><div class="wrap"><span>Our rule</span><p>No brittle ranking of venues that may close next month. We teach you how a city works, where to begin and how to recognise the right room tonight.</p></div></section>
      <section class="city-index wrap" id="city-index">
        <section class="city-region featured-region"><div class="city-region-title"><span>United Kingdom · Original guide</span><b>01</b></div><div class="city-index-grid"><a href="dive-bars-london.html" style="--city-accent:#ee321f"><span>LON</span><h2>London</h2><p>Pubs, basements and scenes beyond the label.</p><b>Open the London cluster ↗</b></a></div></section>
        ${cards}
      </section>
      <section class="related"><div class="article-wrap"><h3>City scene guides</h3><div class="related-grid"><a href="alternative-bars-berlin.html">Punk, metal and goth places in Berlin →</a><a href="punk-rock-bars-montreal.html">Punk and rock bars in Montréal →</a><a href="rock-metal-bars-london.html">Rock and metal bars in London →</a></div></div></section>
      <section class="atlas-method"><div class="wrap"><div><span>01</span><h2>Start local.</h2><p>Open Nearby from your actual location. City-wide lists ignore the hour you lose crossing town.</p></div><div><span>02</span><h2>Filter the mood.</h2><p>Combine dive, punk, rock, metal, gothic and alternative filters around the night you want.</p></div><div><span>03</span><h2>Verify tonight.</h2><p>Check current hours, programmes, transport and access before making a special journey.</p></div></div></section>
      <section class="article-cta atlas-cta wrap"><div><span class="eyebrow">Twenty cities. One live map.</span><h2>Find the room you’ll remember.</h2><p>Download Dive Bar Finder for iPhone and turn the guide into a nearby search.</p></div><a class="app-button" data-download-source="cities-hub" href="${appUrl}">Download Dive Bar Finder</a></section>
    </main><script src="../script.js"></script>
  </body>
</html>`;
}

function addFile(path, content) {
  return `*** Add File: ${path}\n${content.split("\n").map((line) => `+${line}`).join("\n")}\n`;
}

if (process.argv.includes("--write")) {
  writeFileSync("guides/europe.html", regionalHub("Europe", "europe", "Dive Bars in Europe: 36 City Guides | Dive Bar Finder", "Explore 36 practical city guides to dive bars, rock pubs, punk venues and alternative nightlife across Europe.", "From British pub culture and Iberian late nights to Nordic rock bars and Central European cellars, each guide starts with how the city actually works.", {name:"London",slug:"london",href:"dive-bars-london.html",code:"LON",accent:"#ee321f",tagline:"Pubs, basements and scenes beyond the label."}));
  writeFileSync("guides/north-america.html", regionalHub("North America", "north-america", "Dive Bars in North America: 32 City Guides | Dive Bar Finder", "Explore 32 practical city guides to dive bars, punk venues, rock clubs and neighbourhood taverns across the United States, Canada and Mexico.", "From corner taverns and desert locals to punk basements and megacity rock bars, these guides turn a continent-scale search into one workable neighbourhood at a time."));
  cities.forEach((city, index) => {
    if (!city.managed) return;
    writeFileSync(`guides/dive-bars-${city.slug}.html`, page(city, index));
  });
  writeFileSync("seo/page-manifest.json", `${JSON.stringify(manifest(), null, 2)}\n`);
  writeFileSync("sitemap.xml", sitemap());
} else {
  process.stdout.write("Run node generate-world-guides.mjs --write to generate managed city guides, regional hubs, the SEO manifest and sitemap.\n");
}
