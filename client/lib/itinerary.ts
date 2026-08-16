/* ------------------------------------------------------------------ */
/*  Atlas & Aire — itinerary engine                                    */
/*  Hand-authored destination modules + heuristic assembly.            */
/* ------------------------------------------------------------------ */

export type CostLevel = 0 | 1 | 2 | 3;

export interface Slot {
  time: string;
  title: string;
  detail: string;
  cost: CostLevel;
}

export interface DayModule {
  theme: string;
  morning: Slot;
  afternoon: Slot;
  evening: Slot;
  secret: string;
  dish: string;
}

export interface Destination {
  name: string;
  country: string;
  code: string;
  aliases: string[];
  image: string;
  from: string;
  tagline: string;
  costIndex: 1 | 2 | 3 | 4;
  bestTime: string;
  vibes: string[];
  tips: string[];
  days: DayModule[];
}

export interface PlanInput {
  destination: string;
  days: number;
  styles: string[];
  pace: "relaxed" | "balanced" | "packed";
  budget: "shoestring" | "comfort" | "luxe";
  travelers: number;
  month: string;
}

export interface DayPlan {
  n: number;
  theme: string;
  slots: Slot[];
  secret: string;
  dish: string;
}

export interface PlanResult {
  title: string;
  code: string;
  name: string;
  country: string;
  tagline: string;
  days: DayPlan[];
  budget: { perDay: string; total: string; note: string };
  bestTime: string;
  vibes: string[];
  tips: string[];
}

export const STYLE_OPTIONS = [
  "Foodie",
  "Culture",
  "Adventure",
  "Slow living",
  "Nightlife",
  "Nature",
  "Design",
  "Off-grid",
] as const;

export const THINKING_STEPS = [
  "Charting 12,406 route combinations…",
  "Reading 312 local forums (translated)…",
  "Cross-checking opening hours & closures…",
  "Negotiating with the sunset schedule…",
  "Reserving the table locals don't list…",
  "Stamping your itinerary…",
];

/* ------------------------------- data ------------------------------ */

export const DESTINATIONS: Destination[] = [
  {
    name: "Kyoto",
    country: "Japan",
    code: "KYO",
    aliases: ["japan", "kansai"],
    image: "/images/kyoto.jpeg",
    from: "$1,890 · 6 days",
    tagline: "Temple hush, lantern alleys, kaiseki precision.",
    costIndex: 3,
    bestTime: "Late March–April (sakura) or mid-November (maple fire)",
    vibes: ["temple hush", "kaiseki precision", "lantern alleys"],
    tips: [
      "Buy an ICOCA card on day one — buses, trains and konbini all tap.",
      "Temples close early. Flip your day: shrines at dawn, museums at 3pm.",
    ],
    days: [
      {
        theme: "Gion after dark",
        morning: {
          time: "09:00",
          title: "Weekenders coffee, Nakagyō",
          detail: "Standing-room espresso in a parking-lot café — Kyoto's quiet caffeine church.",
          cost: 1,
        },
        afternoon: {
          time: "14:00",
          title: "Philosopher's Path wander",
          detail: "Two kilometres of canal, moss temples, and zero urgency.",
          cost: 0,
        },
        evening: {
          time: "19:00",
          title: "Gion lantern walk",
          detail: "Hanamikoji at dusk — spot a geiko heading to work. Never chase one.",
          cost: 0,
        },
        secret: "Ishibe-kōji alley at 21:00: lanterns, silence, no crowds.",
        dish: "Yudofu — silken tofu simmered tableside near Nanzen-ji.",
      },
      {
        theme: "Arashiyama, early",
        morning: {
          time: "07:00",
          title: "Bamboo grove before the buses",
          detail: "Light falls in green shafts. You'll have it almost alone.",
          cost: 0,
        },
        afternoon: {
          time: "13:30",
          title: "Ōkōchi Sansō garden",
          detail: "Matcha included with entry; maple ridgelines over the whole valley.",
          cost: 1,
        },
        evening: {
          time: "19:30",
          title: "Pontocho Alley counter dinner",
          detail: "Six seats, one chef, river lanterns outside the window.",
          cost: 3,
        },
        secret: "Giō-ji's moss garden — a few hundred yen of pure green silence.",
        dish: "Yuba sashimi at a riverside machiya house.",
      },
      {
        theme: "Ten thousand gates",
        morning: {
          time: "06:30",
          title: "Fushimi Inari before 8am",
          detail: "The higher you climb, the fewer phones. Summit in 90 minutes.",
          cost: 0,
        },
        afternoon: {
          time: "14:00",
          title: "Sake district hopping",
          detail: "Gekkeikan Okura tastings among cedar vats in Fushimi.",
          cost: 1,
        },
        evening: {
          time: "18:30",
          title: "Nishiki Market dusk graze",
          detail: "Tamagoyaki skewers and pickles under arcade lights.",
          cost: 2,
        },
        secret: "Keep walking past the crowds — the trail exits at a mossy shrine with a koi pond.",
        dish: "Matcha everything at Nakamura Tokichi, queue and all.",
      },
      {
        theme: "The craft day",
        morning: {
          time: "08:00",
          title: "Kiyomizu-dera terrace",
          detail: "Sunrise over the wooden stage, city still grey-blue below.",
          cost: 1,
        },
        afternoon: {
          time: "13:30",
          title: "Knife shopping on Teramachi",
          detail: "Get a santoku engraved while you wait — a souvenir with an edge.",
          cost: 3,
        },
        evening: {
          time: "18:00",
          title: "Kamogawa riverbanks",
          detail: "Picnic benches fill at golden hour. Bring sake, keep the bench.",
          cost: 1,
        },
        secret: "Sanzen-in in Ōhara — an hour out, moss gardens with almost nobody.",
        dish: "Obanzai — Kyoto grandma cooking, ten small plates.",
      },
      {
        theme: "Farewell, slowly",
        morning: {
          time: "09:30",
          title: "Ryōan-ji rock garden",
          detail: "Fifteen stones, fourteen visible. Sit until it stops mattering.",
          cost: 1,
        },
        afternoon: {
          time: "14:00",
          title: "Golden Pavilion + Zen money",
          detail: "Kinkaku-ji glares; buy the calligraphy charm at the exit.",
          cost: 1,
        },
        evening: {
          time: "19:00",
          title: "Kyoto Station ramen street",
          detail: "Ten counters, one decision. Rich chicken-broth kotteri wins.",
          cost: 1,
        },
        secret: "The station's rooftop garden is free, empty, and weirdly lovely at night.",
        dish: "Saba-zushi — pressed mackerel sushi, the ekiben to take home.",
      },
    ],
  },
  {
    name: "Santorini",
    country: "Greece",
    code: "JTR",
    aliases: ["greece", "cyclades"],
    image: "/images/santorini.png",
    from: "$1,240 · 5 days",
    tagline: "Caldera blues, volcanic wine, white-wash glare.",
    costIndex: 4,
    bestTime: "May–June or late September — caldera light, minus the crush",
    vibes: ["caldera blues", "volcanic wine", "white-wash glare"],
    tips: [
      "Rent an ATV over a car — lanes are narrow, parking mythical.",
      "Sunset is a west-coast sport. Book dinner facing east for cheaper seats.",
    ],
    days: [
      {
        theme: "Arrive above the sea",
        morning: {
          time: "09:30",
          title: "Slow breakfast, three sides sea",
          detail: "Tomatokeftedes and Greek coffee while the caldera wakes up.",
          cost: 1,
        },
        afternoon: {
          time: "15:00",
          title: "Caldera rim walk: Fira → Imerovigli",
          detail: "The Skaros Rock scramble at the far end is worth every step.",
          cost: 0,
        },
        evening: {
          time: "19:45",
          title: "Oia from below",
          detail: "Watch sunset from Ammoudi Bay's rocks, not the castle mob.",
          cost: 2,
        },
        secret: "Lioyerma's back terrace gets the same sunset with zero queue.",
        dish: "Fava purée with capers — the island's humble masterpiece.",
      },
      {
        theme: "Volcano day",
        morning: {
          time: "08:30",
          title: "Boat to Nea Kameni",
          detail: "Hike a still-warm crater, sulfur underfoot, sea everywhere else.",
          cost: 2,
        },
        afternoon: {
          time: "13:00",
          title: "Hot springs swim",
          detail: "Rust-orange water off Palea Kameni. Wear a dark suit — it stains.",
          cost: 0,
        },
        evening: {
          time: "19:30",
          title: "Akrotiri lighthouse sunset",
          detail: "The locals' spot. Bring wine, leave before the dark roads.",
          cost: 0,
        },
        secret: "Vlychada's black-sand cliffs look lunar at low sun — go late.",
        dish: "Chloro cheese and thyme honey from Pyrgos village.",
      },
      {
        theme: "Wine grown in ash",
        morning: {
          time: "10:00",
          title: "Santo winery terrace flight",
          detail: "Assyrtiko from 3,000-year-old vines coiled in volcanic ash.",
          cost: 2,
        },
        afternoon: {
          time: "14:30",
          title: "Pyrgos village climb",
          detail: "Venetian lanes, three churches per corner, one great kafenio.",
          cost: 0,
        },
        evening: {
          time: "20:00",
          title: "Megalochori long dinner",
          detail: "Family taverna, no menu. Just keep saying yes.",
          cost: 2,
        },
        secret: "Venetsanos winery's cave terrace — same caldera view, half the price.",
        dish: "Tomatokeftedes — crisp-edged fritters of the island's tiny tomatoes.",
      },
      {
        theme: "Blue everything",
        morning: {
          time: "09:00",
          title: "Red Beach by kayak",
          detail: "Paddle past iron-red cliffs to coves the buses can't reach.",
          cost: 2,
        },
        afternoon: {
          time: "14:00",
          title: "Ancient Thera ridge ruins",
          detail: "Hellenistic streets 360 metres above the sea, goats as ushers.",
          cost: 1,
        },
        evening: {
          time: "20:30",
          title: "Fira cliffside cocktails",
          detail: "Caldera lights come on one by one. Order the Vinsanto.",
          cost: 2,
        },
        secret: "Exo Gonia's ruined bell tower frames the whole island for free.",
        dish: "Sun-dried grilled octopus at Ammoudi Bay.",
      },
      {
        theme: "The long goodbye",
        morning: {
          time: "08:30",
          title: "Skaros Rock at opening light",
          detail: "The chapel on the rock, you and the gulls.",
          cost: 0,
        },
        afternoon: {
          time: "13:30",
          title: "Last swim at Perissa",
          detail: "Black sand, cold beer, zero plans.",
          cost: 1,
        },
        evening: {
          time: "20:00",
          title: "Farewell dinner in Imerovigli",
          detail: "Book the caldera-edge table you walked past all week.",
          cost: 3,
        },
        secret: "Ask any baker for 'the yesterday's loukoumades' — cheaper, still warm, no shame.",
        dish: "Apochti — air-cured pork, the island's answer to prosciutto.",
      },
    ],
  },
  {
    name: "Marrakech",
    country: "Morocco",
    code: "RAK",
    aliases: ["morocco", "maroc"],
    image: "/images/marrakech.jpg",
    from: "$780 · 4 days",
    tagline: "Souk labyrinth, mint tea steam, rose-pink walls.",
    costIndex: 2,
    bestTime: "March–May or October — warm days, cool riad courtyards",
    vibes: ["souk labyrinth", "mint tea steam", "rose-pink walls"],
    tips: [
      "Stay in a riad — courtyards mute the medina chaos beautifully.",
      "Petit taxis: agree the fare before the door closes. In town, about 20–30 MAD.",
    ],
    days: [
      {
        theme: "Medina plunge",
        morning: {
          time: "09:00",
          title: "Bahia Palace early",
          detail: "Zellige courtyards and carved cedar, before the tour groups wake.",
          cost: 1,
        },
        afternoon: {
          time: "14:30",
          title: "Souk navigation (get lost on purpose)",
          detail: "Leather, brass, saffron. Agree prices with a smile, over tea.",
          cost: 2,
        },
        evening: {
          time: "19:30",
          title: "Jemaa el-Fnaa at blue hour",
          detail: "Snail broth, storytellers, drum circles under rising smoke.",
          cost: 1,
        },
        secret: "The spice souk's back stairs lead to a silent rooftop over the square.",
        dish: "Tanjia — the 'bachelor's stew' slow-cooked in hammam ashes.",
      },
      {
        theme: "Gardens & that blue",
        morning: {
          time: "08:00",
          title: "Jardin Majorelle at opening",
          detail: "That blue, those cacti, 8:00 am stillness.",
          cost: 2,
        },
        afternoon: {
          time: "13:30",
          title: "Le Jardin Secret + YSL museum",
          detail: "Climb the tower for 360° of medina rooftops to the Atlas.",
          cost: 2,
        },
        evening: {
          time: "20:00",
          title: "Riad rooftop dinner",
          detail: "Lanterns, pastilla, mint tea poured from a great height.",
          cost: 2,
        },
        secret: "Café des Épices' top floor beats every rooftop queue in the square.",
        dish: "Pastilla — pigeon pie under a snowfall of cinnamon.",
      },
      {
        theme: "Atlas escape",
        morning: {
          time: "08:00",
          title: "Drive to Imlil",
          detail: "Ninety minutes of walnut valleys beneath Toubkal. Mules overtake you.",
          cost: 2,
        },
        afternoon: {
          time: "13:00",
          title: "Berber village lunch",
          detail: "Tagine with a family in Aroumd; bread from the communal oven.",
          cost: 1,
        },
        evening: {
          time: "19:00",
          title: "Hammam, then back to medina",
          detail: "Black soap, eucalyptus steam, a brand-new spine.",
          cost: 1,
        },
        secret: "Café Clock's rooftop serves a camel burger. Seriously. Get it.",
        dish: "Harira at a streetside counter, with msemen torn in.",
      },
      {
        theme: "Craft & farewell",
        morning: {
          time: "07:30",
          title: "Tanneries at dawn",
          detail: "Watch from the dye-shop balconies — safer and better at distance.",
          cost: 1,
        },
        afternoon: {
          time: "14:00",
          title: "Maison de la Photographie",
          detail: "Vintage Morocco in glass plates, then tea on its roof terrace.",
          cost: 1,
        },
        evening: {
          time: "19:30",
          title: "Final souk sweep",
          detail: "Argan, argan, argan — and one last round of orange juice.",
          cost: 1,
        },
        secret: "Nomad's rooftop booking beats the queue downstairs — same view, seated.",
        dish: "Méchoui — slow lamb you must order a day ahead.",
      },
    ],
  },
  {
    name: "El Chaltén",
    country: "Argentina (Patagonia)",
    code: "FTE",
    aliases: ["patagonia", "argentina", "fitz roy"],
    image: "/images/patagonia.png",
    from: "$1,120 · 5 days",
    tagline: "Granite spires, glacier blue, wind as religion.",
    costIndex: 2,
    bestTime: "November–March — the austral summer's endless light",
    vibes: ["granite spires", "glacier blue", "wind religion"],
    tips: [
      "Wind peaks 14:00–18:00 — start every hike absurdly early.",
      "Carry cash. Card readers fear the wind too.",
    ],
    days: [
      {
        theme: "Acclimatize to the wind",
        morning: {
          time: "09:00",
          title: "Bus in from El Calafate",
          detail: "Three hours of steppe — then Fitz Roy appears like a dare.",
          cost: 1,
        },
        afternoon: {
          time: "15:00",
          title: "Chorrillo del Salto falls",
          detail: "Shake-out hike. Glacier-fed spray, lenga forest, easy legs.",
          cost: 0,
        },
        evening: {
          time: "20:00",
          title: "Craft beer at La Zorra",
          detail: "Trail maps on every table, war stories on tap.",
          cost: 1,
        },
        secret: "The free campground's riverbank bench has the town's best Fitz Roy sunrise.",
        dish: "Cordero al palo — whole lamb over open flame.",
      },
      {
        theme: "Laguna de los Tres",
        morning: {
          time: "05:30",
          title: "Alpine start",
          detail: "Ten hard kilometres. The final pull-up is granite steps and gasps.",
          cost: 0,
        },
        afternoon: {
          time: "12:00",
          title: "The turquoise payoff",
          detail: "Laguna's impossible colour, ice calving somewhere above.",
          cost: 0,
        },
        evening: {
          time: "20:30",
          title: "Empanada coma",
          detail: "La Vaca Atada — beet-and-cheese empanadas, no regrets.",
          cost: 1,
        },
        secret: "Fill bottles at the Río Blanco tap, not the lagoon — less grit, same glory.",
        dish: "Calafate-berry ice cream. Legend says it guarantees your return.",
      },
      {
        theme: "Cerro Torre trail",
        morning: {
          time: "07:30",
          title: "Laguna Torre hike",
          detail: "Easier legs, spire drama, condors riding thermals overhead.",
          cost: 0,
        },
        afternoon: {
          time: "13:30",
          title: "Mirador Maestri",
          detail: "Ten minutes further; the glacier face fills the whole frame.",
          cost: 0,
        },
        evening: {
          time: "19:30",
          title: "Dusk at Lago del Desierto",
          detail: "Lenga forest turns copper. Nobody speaks. Correct.",
          cost: 1,
        },
        secret: "The trailhead bakery sells fresh facturas at 7am — official hiker fuel.",
        dish: "Trucha patagónica with lemon butter, caught that morning.",
      },
      {
        theme: "Ice day",
        morning: {
          time: "08:00",
          title: "Viedma glacier boat",
          detail: "Back to Calafate, then within 100 metres of a blue wall.",
          cost: 3,
        },
        afternoon: {
          time: "14:00",
          title: "Mini-trek on the ice",
          detail: "Crampons on, whisky poured over glacier rocks after.",
          cost: 3,
        },
        evening: {
          time: "21:00",
          title: "Calafate farewell steak",
          detail: "Parrilla, malbec, southern stars doing unreasonable things.",
          cost: 2,
        },
        secret: "Book the ice trek for your first flexible day — weather cancels often.",
        dish: "Malbec, obviously — high-altitude Patagonian.",
      },
    ],
  },
  {
    name: "Reykjavík",
    country: "Iceland",
    code: "KEF",
    aliases: ["iceland", "reykjavik"],
    image: "/images/iceland.png",
    from: "$1,650 · 4 days",
    tagline: "Black sand drama, geothermal steam, aurora static.",
    costIndex: 4,
    bestTime: "June for midnight sun, September onward for aurora odds",
    vibes: ["black sand drama", "geothermal steam", "aurora static"],
    tips: [
      "The weather app lies hourly. Dress for four seasons before breakfast.",
      "Book aurora tours with free rebooking — KP forecasts are gossip.",
    ],
    days: [
      {
        theme: "Steam city",
        morning: {
          time: "09:30",
          title: "Hallgrímskirkja tower",
          detail: "The whole tin-roof city, mountains queued behind it.",
          cost: 1,
        },
        afternoon: {
          time: "14:00",
          title: "Old harbour + Harpa",
          detail: "Walk the harbour, eat fish straight off the boat, gawk at Harpa's glass.",
          cost: 2,
        },
        evening: {
          time: "19:00",
          title: "Sky Lagoon soak",
          detail: "Seven-step ritual, infinity edge dissolving into the North Atlantic.",
          cost: 3,
        },
        secret: "The lagoon's cold plunge has a timer. It builds character you didn't ask for.",
        dish: "Kjötsúpa — lamb soup with all-you-can-refill rye bread.",
      },
      {
        theme: "South coast",
        morning: {
          time: "08:00",
          title: "Seljalandsfoss walk-behind",
          detail: "Get soaked. The curtain view is worth the soaking.",
          cost: 0,
        },
        afternoon: {
          time: "13:00",
          title: "Skógafoss + Reynisfjara",
          detail: "Basalt columns and black sand. Never turn your back on sneaker waves.",
          cost: 0,
        },
        evening: {
          time: "20:30",
          title: "Vík, aurora watch",
          detail: "If KP ≥ 4, the sky does the rest. Bring thermos cocoa.",
          cost: 1,
        },
        secret: "Sólheimasandur's plane wreck: 7km round trip — go before 9am.",
        dish: "Langoustine soup in Höfn — criminal, in the best way.",
      },
      {
        theme: "Golden Circle, plus",
        morning: {
          time: "08:30",
          title: "Þingvellir rift walk",
          detail: "Between tectonic plates, literally. Mind the gap (it grows yearly).",
          cost: 0,
        },
        afternoon: {
          time: "13:30",
          title: "Geysir + Gullfoss",
          detail: "Strokkur erupts every eight minutes. Gullfoss shakes the ground.",
          cost: 0,
        },
        evening: {
          time: "18:30",
          title: "Secret Lagoon, Flúðir",
          detail: "The 1891 original — geothermal, modest, crowd-free.",
          cost: 2,
        },
        secret: "Kerið crater: red walls, green lake, a 15-minute detour.",
        dish: "Tomato soup at Friðheimar's greenhouse, grown around your table.",
      },
      {
        theme: "Whales & blue farewell",
        morning: {
          time: "09:00",
          title: "Whale watching, Faxaflói",
          detail: "Humpbacks, white-beaked dolphins, puffins stacked on Lundey.",
          cost: 3,
        },
        afternoon: {
          time: "14:00",
          title: "Reykjanes geothermal fields",
          detail: "Gunnuhver hisses. The Bridge Between Continences creaks.",
          cost: 0,
        },
        evening: {
          time: "19:00",
          title: "Blue Lagoon float",
          detail: "Silica mask on. Flight tomorrow. Suspended in warm milk-blue.",
          cost: 3,
        },
        secret: "Valahnúkamöl's sea stacks glow at sunset — five minutes from the Lagoon.",
        dish: "Rye-bread ice cream. Trust it.",
      },
    ],
  },
  {
    name: "Amalfi Coast",
    country: "Italy",
    code: "NAP",
    aliases: ["italy", "amalfi", "positano", "campania"],
    image: "/images/amalfi.jpg",
    from: "$1,980 · 5 days",
    tagline: "Lemon terraces, cliff roads, aperitivo gold.",
    costIndex: 4,
    bestTime: "May–June or September — swimmable sea, walkable lanes",
    vibes: ["lemon terraces", "cliff roads", "aperitivo gold"],
    tips: [
      "Ferries beat the coast road June–September. Every single time.",
      "Pack soft bags — stairs are the local transit system.",
    ],
    days: [
      {
        theme: "Positano, vertical",
        morning: {
          time: "10:00",
          title: "Ferry in from Naples",
          detail: "The coast unfolds like a deck of postcards.",
          cost: 2,
        },
        afternoon: {
          time: "15:00",
          title: "Positano stair drift",
          detail: "Every turn is a painting. Budget extra film.",
          cost: 0,
        },
        evening: {
          time: "19:30",
          title: "Fornillo beach aperitivo",
          detail: "Cliff tables, spritz, the town lighting up bulb by bulb.",
          cost: 2,
        },
        secret: "La Porta's terrace — the same Positano view, none of the attitude.",
        dish: "Delizia al limone — lemon sponge that tastes like the grove.",
      },
      {
        theme: "Path of the Gods",
        morning: {
          time: "07:30",
          title: "Sentiero degli Dei",
          detail: "Bus to Bomerano, then three hours of cornice path 500m above the blue.",
          cost: 0,
        },
        afternoon: {
          time: "13:30",
          title: "Descend Nocelle → Positano",
          detail: "Knees first, pride second. 1,700 steps to gelato.",
          cost: 0,
        },
        evening: {
          time: "20:00",
          title: "Recover with fritto misto",
          detail: "Da Vincenzo's courtyard — fried everything, cold white wine.",
          cost: 2,
        },
        secret: "Start westward by 8am: light on your back, crowds behind you.",
        dish: "Spaghetti alle vongole where the shells are still arguing.",
      },
      {
        theme: "Ravello heights",
        morning: {
          time: "09:30",
          title: "Villa Cimbrone's Infinity Terrace",
          detail: "Wagner was right to lose his mind here.",
          cost: 1,
        },
        afternoon: {
          time: "14:00",
          title: "Villa Rufolo + ceramics",
          detail: "Patterned plates you'll hand-carry home like relics.",
          cost: 2,
        },
        evening: {
          time: "19:00",
          title: "Dusk concert in Ravello",
          detail: "If the festival's on, the sea is your orchestra pit.",
          cost: 3,
        },
        secret: "Below Cimbrone: a family lemon-farm tour that ends in limoncello proof.",
        dish: "Scialatielli ai frutti di mare, handmade this morning.",
      },
      {
        theme: "Capri day",
        morning: {
          time: "07:55",
          title: "First hydrofoil to Capri",
          detail: "Chairlift to Monte Solaro — the whole Tyrrhenian underfoot.",
          cost: 3,
        },
        afternoon: {
          time: "14:00",
          title: "Faraglioni boat loop",
          detail: "Swim stop in water too blue to be legal. Green Grotto if the sea allows.",
          cost: 2,
        },
        evening: {
          time: "20:30",
          title: "Amalfi town gelato",
          detail: "Piazza Duomo steps, cathedral floodlit, lemon everything.",
          cost: 1,
        },
        secret: "Take the 7:55am ferry — Capri before the day-trippers land.",
        dish: "Granita di limone with brioche for breakfast. Non-negotiable.",
      },
      {
        theme: "Slow goodbye",
        morning: {
          time: "09:00",
          title: "Nocelle's quiet morning",
          detail: "The village above Positano — one bar, three old men, total truth.",
          cost: 1,
        },
        afternoon: {
          time: "13:30",
          title: "Last swim at La Porta beach club",
          detail: "Lido lounger, sea below, cliff above, nowhere to be.",
          cost: 2,
        },
        evening: {
          time: "20:00",
          title: "Farewell seafood feast",
          detail: "Book the terrace table you walked past all week. Do it.",
          cost: 3,
        },
        secret: "Buy lemons at the roadside stand near Montepertuso — cheaper and colder than town.",
        dish: "Cuoppo — fried seafood in a paper cone, eaten while walking.",
      },
    ],
  },
  {
    name: "Ubud",
    country: "Indonesia (Bali)",
    code: "DPS",
    aliases: ["bali", "indonesia"],
    image: "/images/ubud.png",
    from: "$890 · 5 days",
    tagline: "Rice-terrace green, temple incense, jungle dawn chorus.",
    costIndex: 1,
    bestTime: "April–October dry season — green everywhere, humidity manageable",
    vibes: ["rice-terrace green", "temple incense", "jungle dawn chorus"],
    tips: [
      "Gojek bikes beat traffic; agree prices with drivers outside app zones.",
      "Carry a sarong — temple gates are everywhere, and dress codes are real.",
    ],
    days: [
      {
        theme: "Ridge time",
        morning: {
          time: "07:00",
          title: "Campuhan Ridge walk",
          detail: "Gold grass, temple silhouettes, almost nobody — go early.",
          cost: 0,
        },
        afternoon: {
          time: "14:00",
          title: "Tegalalang terraces, upper gates",
          detail: "Pay at the official gate and skip the swing photo queue.",
          cost: 1,
        },
        evening: {
          time: "19:00",
          title: "Warung dinner over the valley",
          detail: "Nasi campur as the ravine turns purple.",
          cost: 1,
        },
        secret: "The terraces' back path exits at a tiny family warung with the best view.",
        dish: "Babi guling at Ibu Oka — crispy-skin religion.",
      },
      {
        theme: "Temples & holy water",
        morning: {
          time: "07:30",
          title: "Tirta Empul purification",
          detail: "Join the ritual respectfully. Sarongs at the gate, hearts at the spouts.",
          cost: 1,
        },
        afternoon: {
          time: "13:00",
          title: "Gunung Kawi carved shrines",
          detail: "300 steps down into an 11th-century valley.",
          cost: 1,
        },
        evening: {
          time: "19:30",
          title: "Legong dance at the palace",
          detail: "Gamelan under the banyan. Arrive 30 minutes early for front mats.",
          cost: 1,
        },
        secret: "Pura Mengening's springs — Tirta Empul's ritual, zero crowds.",
        dish: "Bebek betutu — duck smoked 12 hours in banana leaf.",
      },
      {
        theme: "North day",
        morning: {
          time: "06:30",
          title: "Sekumpul waterfalls",
          detail: "The island's grandest. A local guide earns their fee here.",
          cost: 2,
        },
        afternoon: {
          time: "13:30",
          title: "Hidden canyon pools",
          detail: "Vine swings optional. Screaming encouraged.",
          cost: 1,
        },
        evening: {
          time: "18:30",
          title: "Banjar hot springs",
          detail: "Stone spouts, frangipani, dusk steam.",
          cost: 1,
        },
        secret: "Warung at the Sekumpul viewpoint: mie goreng tastes better at altitude.",
        dish: "Fresh vanilla shake in Munduk's clove hills.",
      },
      {
        theme: "Craft + farewell",
        morning: {
          time: "09:00",
          title: "Silver workshop in Celuk",
          detail: "Hammer your own ring over two hours. Keep it forever.",
          cost: 2,
        },
        afternoon: {
          time: "14:00",
          title: "Ubud market + coffee tasting",
          detail: "Luwak is the tourist trap — the vanilla is the real find.",
          cost: 1,
        },
        evening: {
          time: "19:00",
          title: "Farewell over the rice fields",
          detail: "A warung at the terrace edge. Sunset, geckos, last Bintang.",
          cost: 1,
        },
        secret: "Rent a scooter before 8am — the roads belong to locals by noon.",
        dish: "Lawar and sate lilit at the night market's north stalls.",
      },
    ],
  },
  {
    name: "Oaxaca",
    country: "Mexico",
    code: "OAX",
    aliases: ["mexico", "oaxaca de juarez"],
    image: "/images/oaxaca.png",
    from: "$720 · 4 days",
    tagline: "Mole depth, mezcal smoke, marigold streets.",
    costIndex: 1,
    bestTime: "October–November (Día de Muertos) or March — dry, festive",
    vibes: ["mole depth", "mezcal smoke", "marigold streets"],
    tips: [
      "Mezcal is sipped, never shot — the maestro will judge you kindly either way.",
      "Sunday is Tlacolula market day. Plan the whole week around it.",
    ],
    days: [
      {
        theme: "Centro on foot",
        morning: {
          time: "09:30",
          title: "Templo de Santo Domingo",
          detail: "Baroque overload in the best way — then the gold chapel beyond.",
          cost: 1,
        },
        afternoon: {
          time: "14:00",
          title: "Mercado 20 de Mayo",
          detail: "Tlayudas grilled over coals. Chapulines if you dare (you will).",
          cost: 1,
        },
        evening: {
          time: "19:30",
          title: "Zócalo at dusk",
          detail: "Marimba, danzones, the whole city dancing under the laurel.",
          cost: 0,
        },
        secret: "Mezcalería In Situ's back room — 200 agave spirits, no tourist menu.",
        dish: "Tlayuda with tasajo — Oaxaca's edible flag.",
      },
      {
        theme: "Mole day",
        morning: {
          time: "09:00",
          title: "Mole cooking class",
          detail: "Thirty ingredients, one pot, no shortcuts. You'll never rush again.",
          cost: 2,
        },
        afternoon: {
          time: "14:30",
          title: "Teotitlán del Valle weavers",
          detail: "Zapotec rugs dyed with cochineal — the red is a bug. Embrace it.",
          cost: 1,
        },
        evening: {
          time: "20:00",
          title: "Memelas at a street stand",
          detail: "If the line moves, join it. Ask for salsa negra.",
          cost: 1,
        },
        secret: "Order the coloradito — mole's middle child, perfect balance.",
        dish: "Chocolate de agua with pan de yema at breakfast.",
      },
      {
        theme: "Monte Albán & mezcal",
        morning: {
          time: "08:00",
          title: "Monte Albán at opening",
          detail: "Zapotec pyramids on a flattened mountaintop, mist burning off.",
          cost: 1,
        },
        afternoon: {
          time: "14:00",
          title: "Mezcal palenque in Matatlán",
          detail: "Watch piñas roast in earth ovens. Taste espadín against tobalá.",
          cost: 2,
        },
        evening: {
          time: "20:30",
          title: "Jalatlaco cantina crawl",
          detail: "The painted-streets barrio, mezcalita in hand.",
          cost: 1,
        },
        secret: "The palenque's puntas — first-run mezcal — is offered only to the curious.",
        dish: "Tamales oaxaqueños in banana leaf, from a morning cart.",
      },
      {
        theme: "Petrified waterfalls",
        morning: {
          time: "07:30",
          title: "Hierve el Agua",
          detail: "Stone cascades over a valley. Swim at the infinity edge.",
          cost: 1,
        },
        afternoon: {
          time: "14:00",
          title: "Mitla ruins",
          detail: "Geometric grecas cut so fine they seem laser-made.",
          cost: 1,
        },
        evening: {
          time: "20:00",
          title: "Farewell degustación",
          detail: "A seven-mole progression, if the chef offers. She will.",
          cost: 3,
        },
        secret: "Take the 8am colectivo to Hierve — empty pools, sideways light.",
        dish: "Nicuatole — pre-Hispanic corn custard, barely known, deeply loved.",
      },
    ],
  },
];

/* --------------------------- generic engine ------------------------ */

const GENERIC_MORNINGS: Slot[] = [
  { time: "08:30", title: "Old-town drift", detail: "No map, first coffee, second left — the centre reveals itself on foot.", cost: 1 },
  { time: "08:00", title: "Market circuit", detail: "Follow the grandmas. Whatever they're buying, you're eating.", cost: 1 },
  { time: "07:30", title: "Hilltop lookout, early", detail: "The postcard view without the postcard crowd. Bring pastry.", cost: 0 },
  { time: "09:00", title: "Museum hour, one room only", detail: "Pick one museum, one masterpiece, forty minutes. Depth over ticking.", cost: 1 },
  { time: "08:30", title: "Riverside or harbour walk", detail: "Cities explain themselves along water. Listen.", cost: 0 },
  { time: "09:30", title: "Bakery reconnaissance", detail: "Locate the best bread in a three-block radius. This is research.", cost: 1 },
];

const GENERIC_AFTERNOONS: Slot[] = [
  { time: "14:00", title: "The long neighbourhood lunch", detail: "Order what the table next to you has. It's always right.", cost: 2 },
  { time: "13:30", title: "Craft-street crawl", detail: "Ceramics, knives, textiles — buy one thing made by hands today.", cost: 2 },
  { time: "14:30", title: "Siesta-grade park hour", detail: "Find a bench, lose an afternoon. Agendas are optional.", cost: 0 },
  { time: "13:30", title: "Day-trip pocket", detail: "One train stop out, a smaller town with bigger quiet.", cost: 1 },
  { time: "14:00", title: "Architecture walk", detail: "Look up. Every city hides its best floors above eye level.", cost: 0 },
  { time: "15:00", title: "Local rite of passage", detail: "The thing locals do at 3pm — hammam, caffè, siesta, sauna.", cost: 1 },
];

const GENERIC_EVENINGS: Slot[] = [
  { time: "19:30", title: "Golden-hour vantage", detail: "One drink at the viewpoint, timed to the minute. Worth every coin.", cost: 2 },
  { time: "20:00", title: "Counter dinner", detail: "Six seats facing the kitchen. Watch your dinner become dinner.", cost: 2 },
  { time: "21:00", title: "Night market graze", detail: "Five stalls, five bites, zero cutlery.", cost: 1 },
  { time: "19:00", title: "Aperitivo with the old town", detail: "Square-side table, people as theatre.", cost: 2 },
  { time: "20:30", title: "Live music, small room", detail: "Ask the bartender where locals actually listen. Go there.", cost: 1 },
  { time: "21:30", title: "Night swim or night walk", detail: "The city at its quietest hour is a different city.", cost: 0 },
];

const GENERIC_SECRETS = [
  "Ask any shopkeeper where they eat on their day off. Write it down.",
  "The alley behind the main square always hides the better café.",
  "Buy tickets at the door one hour before close — same art, no queues.",
  "The free walking tour's real value: the guide's after-tour list.",
  "Sit down restaurants two streets from the plaza cost 40% less.",
];

const GENERIC_DISHES = [
  "Whatever the market stall sells at 8am — it was alive at 6.",
  "The region's slow-cooked Sunday dish, ordered on any day.",
  "Street bread + local cheese + market fruit = perfect lunch.",
  "The house speciality at the place with no English menu.",
];

const GENERIC_TIPS = [
  "Learn 'hello' and 'thank you' in the local script — doors open.",
  "Book the one splurge meal for lunch: same kitchen, half the price.",
  "Keep one afternoon unscheduled. Cities reward the unscripted.",
  "A soft bag beats a hard case on stairs, boats and cobblestones.",
];

/* ----------------------------- helpers ----------------------------- */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shiftTime(time: string, deltaMinutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = (h * 60 + m + deltaMinutes + 24 * 60) % (24 * 60);
  const hh = Math.floor(total / 60);
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function deriveCode(name: string): string {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, "");
  if (clean.length === 0) return "ANY";
  if (clean.length <= 3) return clean.padEnd(3, "X");
  return `${clean[0]}${clean[Math.floor(clean.length / 2)]}${clean[clean.length - 1]}`;
}

export function findDestination(query: string): Destination | undefined {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;
  return DESTINATIONS.find(
    (d) =>
      d.name.toLowerCase() === q ||
      d.name.toLowerCase().includes(q) ||
      q.includes(d.name.toLowerCase()) ||
      d.aliases.some((a) => q.includes(a) || a.includes(q)),
  );
}

function budgetFor(costIndex: number, tier: PlanInput["budget"], days: number) {
  const base = { shoestring: 55, comfort: 160, luxe: 480 }[tier];
  const factor = 0.55 + costIndex * 0.22;
  const low = Math.round((base * factor * 0.8) / 5) * 5;
  const high = Math.round((base * factor * 1.3) / 5) * 5;
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
  return {
    perDay: `${fmt(low)}–${fmt(high)} / day`,
    total: `${fmt(low * days)}–${fmt(high * days)} total`,
    note: "Per person, on the ground — flights not included.",
  };
}

const PACE_SHIFT = { relaxed: 60, balanced: 0, packed: -30 } as const;

/* ----------------------------- generator --------------------------- */

export function generatePlan(input: PlanInput): PlanResult {
  const days = Math.min(10, Math.max(2, Math.round(input.days)));
  const dest = findDestination(input.destination);
  const delta = PACE_SHIFT[input.pace];

  let dayPlans: DayPlan[];
  let meta: {
    name: string;
    country: string;
    code: string;
    tagline: string;
    costIndex: number;
    bestTime: string;
    vibes: string[];
    tips: string[];
  };

  if (dest) {
    const pool = dest.days;
    const modules: DayModule[] = [];
    if (days === 1) {
      modules.push(pool[0]);
    } else if (days <= pool.length) {
      const middle = shuffle(pool.slice(1, pool.length - 1));
      modules.push(pool[0], ...middle.slice(0, days - 2), pool[pool.length - 1]);
    } else {
      const middle = shuffle(pool.slice(1, pool.length - 1));
      modules.push(pool[0]);
      while (modules.length < days - 1) {
        for (const m of shuffle(middle)) {
          if (modules.length >= days - 1) break;
          modules.push(m);
        }
      }
      modules.push(pool[pool.length - 1]);
    }
    dayPlans = modules.map((m, i) => ({
      n: i + 1,
      theme: m.theme,
      slots: [m.morning, m.afternoon, m.evening].map((s) => ({
        ...s,
        time: shiftTime(s.time, delta),
      })),
      secret: m.secret,
      dish: m.dish,
    }));
    meta = {
      name: dest.name,
      country: dest.country,
      code: dest.code,
      tagline: dest.tagline,
      costIndex: dest.costIndex,
      bestTime: dest.bestTime,
      vibes: dest.vibes,
      tips: dest.tips,
    };
  } else {
    const raw = input.destination.trim();
    const name = raw.charAt(0).toUpperCase() + raw.slice(1);
    const styleNote = input.styles.length
      ? `tuned for ${input.styles.map((s) => s.toLowerCase()).join(" · ")}`
      : "open to wonder";
    const mornings = shuffle(GENERIC_MORNINGS);
    const afternoons = shuffle(GENERIC_AFTERNOONS);
    const evenings = shuffle(GENERIC_EVENINGS);
    dayPlans = Array.from({ length: days }, (_, i) => ({
      n: i + 1,
      theme: i === 0 ? "Land & learn the light" : i === days - 1 ? "The long goodbye" : pick(["Deep cuts", "Local rhythm", "Side quests", "Slow gold"]),
      slots: [
        { ...mornings[i % mornings.length], time: shiftTime(mornings[i % mornings.length].time, delta) },
        { ...afternoons[i % afternoons.length], time: shiftTime(afternoons[i % afternoons.length].time, delta) },
        { ...evenings[i % evenings.length], time: shiftTime(evenings[i % evenings.length].time, delta) },
      ],
      secret: GENERIC_SECRETS[i % GENERIC_SECRETS.length],
      dish: GENERIC_DISHES[i % GENERIC_DISHES.length],
    }));
    meta = {
      name,
      country: "Earth (details on arrival)",
      code: deriveCode(raw),
      tagline: `An improvised ${days}-day route, ${styleNote}.`,
      costIndex: 2,
      bestTime: "Shoulder season — whenever the crowds thin and the light slants",
      vibes: ["unmapped", "local-first", "improvised"],
      tips: shuffle(GENERIC_TIPS).slice(0, 3),
    };
  }

  return {
    title: `${meta.name} — ${days} days${input.styles[0] ? `, ${input.styles[0].toLowerCase()}` : ""}`,
    code: meta.code,
    name: meta.name,
    country: meta.country,
    tagline: meta.tagline,
    days: dayPlans,
    budget: budgetFor(meta.costIndex, input.budget, days),
    bestTime: meta.bestTime,
    vibes: meta.vibes,
    tips: meta.tips,
  };
}
