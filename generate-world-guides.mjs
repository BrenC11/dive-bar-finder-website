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
    etiquette: "Open with bonsoir, follow the venue’s language lead and tip appropriately. Montréal’s relaxed surface still has clear local manners."
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
    etiquette: "Keep your phone away where requested, have cash, greet with a simple hallo and do not treat local regulars as evidence for your authenticity hunt."
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

const appUrl = "https://apps.apple.com/gb/app/dive-bar-finder/id6758267440";
const date = "2026-07-18";
const displayDate = "18 July 2026";

function esc(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function page(city, index) {
  const prev = cities[(index - 1 + cities.length) % cities.length];
  const next = cities[(index + 1) % cities.length];
  const districts = city.districts.map(([zone, name, copy]) => `
          <article><span>${zone}</span><h3>${name}</h3><p>${copy}</p></article>`).join("");
  const notes = city.fieldNotes.map(([label, copy]) => `
            <article><span>${label}</span><h3>${label}</h3><p>${copy}</p></article>`).join("");
  return `<!doctype html>
<html lang="${city.locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Dive Bars in ${city.name}: A Local Search Guide | Dive Bar Finder</title>
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
      ${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Article","headline":`Dive Bars in ${city.name}: ${city.tagline}`,"description":city.description,"image":"https://divebarfinder.info/assets/app-store/screenshot-6.webp","author":{"@type":"Organization","name":"Dive Bar Finder","url":"https://divebarfinder.info/about.html"},"publisher":{"@type":"Organization","name":"Fear Army LTD","logo":{"@type":"ImageObject","url":"https://divebarfinder.info/assets/app-store/app-icon.jpg"}},"datePublished":date,"dateModified":date,"mainEntityOfPage":`https://divebarfinder.info/guides/dive-bars-${city.slug}.html`,"about":{"@type":"Place","name":city.name,"address":{"@type":"PostalAddress","addressLocality":city.name,"addressCountry":city.country}}},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://divebarfinder.info/"},{"@type":"ListItem","position":2,"name":"City guides","item":"https://divebarfinder.info/guides/cities.html"},{"@type":"ListItem","position":3,"name":`Dive bars in ${city.name}`,"item":`https://divebarfinder.info/guides/dive-bars-${city.slug}.html`}]}]}, null, 2)}
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
          <div class="breadcrumbs"><a href="../index.html">Home</a> / <a href="cities.html">City guides</a> / ${city.name}</div>
          <div class="city-stamp" aria-hidden="true">${city.code}<br />${String(index + 2).padStart(2, "0")}</div>
          <div class="eyebrow">After-dark field notes · ${city.country}</div>
          <h1>Dive bars in ${city.name}. <em>${city.tagline}</em></h1>
          <p class="guide-dek">${city.description}</p>
          <div class="guide-meta"><span>8 minute read</span><span>Updated ${displayDate}</span><span>By <a href="../about.html">Dive Bar Finder</a></span></div>
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
          <li><strong>Open the map where you are.</strong> Use Nearby in Dive Bar Finder so distance and open status reflect your real starting point—not a generic city centre.</li>
          <li><strong>Choose the character you want.</strong> Start with Dive bars, then add rock, metal, punk, gothic or unique/alternative when the scene matters more than the label.</li>
          <li><strong>Compare a small cluster.</strong> Use list view for ratings, Dive Score and open status, then map view to see whether two or three candidates form a realistic route.</li>
          <li><strong>Check the live details.</strong> Verify hours, door policy, programme, accessibility and payment information with the venue before making a special journey.</li>
          <li><strong>Save the good ones.</strong> Favourite candidates and check in after a visit so your collection becomes a useful personal map of ${city.name}.</li>
        </ol>

        <h2>${city.short} night field notes</h2>
        <div class="intent-cards city-notes">${notes}
        </div>

        <h2>Getting home changes the search</h2>
        <p>${city.transport}</p>
        <p>A responsible route includes the return journey. Never drive after drinking, and use official transport information because schedules, closures and local conditions can change without notice.</p>

        <h2>Enter as a guest</h2>
        <p>${city.etiquette}</p>
        <p>Characterful bars are communities, workplaces and sometimes small cultural institutions. Recent safety, accessibility and venue information should always outweigh a romantic description of grit.</p>

        <section class="article-cta london-cta">
          <div><span class="eyebrow">The live map beats the old list</span><h2>Find your ${city.short} bar.</h2><p>Compare nearby options, filter by scene, save favourites and open directions on your iPhone.</p></div>
          <a class="app-button" data-download-source="dive-bars-${city.slug}" href="${appUrl}">Download Dive Bar Finder</a>
        </section>
      </article>
      <section class="related"><div class="article-wrap"><h3>Next city</h3><div class="related-grid"><a href="dive-bars-${prev.slug}.html">${prev.name} after dark →</a><a href="cities.html">Explore every city guide →</a><a href="dive-bars-${next.slug}.html">${next.name} after dark →</a></div></div></section>
    </main>
    <script src="../script.js"></script>
  </body>
</html>`;
}

function hub() {
  const regions = [
    ["United States", cities.slice(0, 6)],
    ["Canada", cities.slice(6, 8)],
    ["Europe", cities.slice(8, 13)],
    ["Asia Pacific", cities.slice(13)]
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
    <script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"CollectionPage","name":"World City Dive Bar Guides","description":"Neighbourhood-first guides to dive bars and alternative nightlife in major world cities.","url":"https://divebarfinder.info/guides/cities.html","isPartOf":{"@type":"WebSite","name":"Dive Bar Finder","url":"https://divebarfinder.info/"},"hasPart":[{"@type":"Article","name":"Dive bars in London","url":"https://divebarfinder.info/guides/dive-bars-london.html"},...cities.map(c=>({"@type":"Article","name":`Dive bars in ${c.name}`,"url":`https://divebarfinder.info/guides/dive-bars-${c.slug}.html`}))]}, null, 2)}</script>
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
      <section class="atlas-method"><div class="wrap"><div><span>01</span><h2>Start local.</h2><p>Open Nearby from your actual location. City-wide lists ignore the hour you lose crossing town.</p></div><div><span>02</span><h2>Filter the mood.</h2><p>Combine dive, punk, rock, metal, gothic and alternative filters around the night you want.</p></div><div><span>03</span><h2>Verify tonight.</h2><p>Check current hours, programmes, transport and access before making a special journey.</p></div></div></section>
      <section class="article-cta atlas-cta wrap"><div><span class="eyebrow">Sixteen cities. One live map.</span><h2>Find the room you’ll remember.</h2><p>Download Dive Bar Finder for iPhone and turn the guide into a nearby search.</p></div><a class="app-button" data-download-source="cities-hub" href="${appUrl}">Download Dive Bar Finder</a></section>
    </main><script src="../script.js"></script>
  </body>
</html>`;
}

function addFile(path, content) {
  return `*** Add File: ${path}\n${content.split("\n").map((line) => `+${line}`).join("\n")}\n`;
}

let patch = "*** Begin Patch\n";
patch += addFile("guides/cities.html", hub());
cities.forEach((city, index) => { patch += addFile(`guides/dive-bars-${city.slug}.html`, page(city, index)); });
patch += "*** End Patch\n";
process.stdout.write(patch);
