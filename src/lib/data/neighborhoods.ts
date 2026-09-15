import type { Neighborhood } from "@/types";

/**
 * The nine communities Gray Group works in most often, ordered the way we
 * introduce them to relocating clients: valley core first, then the periphery.
 */
export const neighborhoods: Neighborhood[] = [
  {
    slug: "paradise-valley",
    name: "Paradise Valley",
    region: "Paradise Valley",
    image: "/images/neighborhoods/paradise-valley.jpg",
    tagline: "One-acre minimums and a town that never got busy",
    summary:
      "Arizona's most quietly expensive address — no sidewalks, no strip malls, one-acre minimums and Camelback Mountain as a backdrop.",
    description: [
      "Paradise Valley incorporated in 1961 for a single reason: to stay rural. Six decades later it has succeeded almost completely. There is no commercial zoning to speak of, no through traffic, and a one-acre minimum lot size that guarantees the sense of space buyers travel here to find.",
      "The housing stock divides roughly into three eras — mid-century ranch homes on generous lots, 1990s Mediterranean estates, and a wave of contemporary architecture built since 2015. The common thread is privacy: walls, gates, mature planting.",
      "Values are driven less by square footage than by the quality of the lot and the view corridor. A well-sited home on Camelback's north slope will outperform a larger house on a flat interior parcel, consistently.",
    ],
    medianPrice: 3450000,
    pricePerSqft: 612,
    inventory: 34,
    walkScore: 18,
    lifestyle: [
      "Camelback and Mummy Mountain trailheads",
      "Five minutes to Old Town Scottsdale",
      "Estate-scale lots with genuine privacy",
      "No commercial development",
      "Sanctuary and Camelback golf clubs",
    ],
    schools: [
      { name: "Kiva Elementary", type: "Public K–5" },
      { name: "Mohave Middle School", type: "Public 6–8" },
      { name: "Saguaro High School", type: "Public 9–12" },
      { name: "Phoenix Country Day School", type: "Private K–12" },
    ],
    facts: [
      { label: "Median sale price", value: "$3.45M" },
      { label: "Price per sq ft", value: "$612" },
      { label: "Active inventory", value: "34 homes" },
      { label: "Minimum lot", value: "1 acre" },
    ],
  },
  {
    slug: "scottsdale",
    name: "Scottsdale",
    region: "Scottsdale",
    image: "/images/neighborhoods/scottsdale.jpg",
    tagline: "The valley's established luxury benchmark",
    summary:
      "From the canal to the foothills, Scottsdale carries the deepest concentration of luxury inventory and the strongest resale record in Arizona.",
    description: [
      "Scottsdale is not one market. It is at least four, each with its own price behaviour — the historic districts around Old Town, the established central corridor, the resort belt along Camelback and Lincoln, and the newer hillside communities to the north.",
      "What unites them is infrastructure for wealth: private aviation at Scottsdale Airport, the highest concentration of destination resorts in the state, and a restaurant and gallery culture that operates year-round rather than seasonally.",
      "For international buyers, Scottsdale is usually the entry point. It offers the most transparent pricing data, the deepest pool of comparable sales, and the most straightforward path to financing for non-resident purchasers.",
    ],
    medianPrice: 1280000,
    pricePerSqft: 486,
    inventory: 412,
    walkScore: 48,
    lifestyle: [
      "Old Town dining and galleries",
      "Scottsdale Airport private aviation",
      "Thirty-plus golf courses",
      "McDowell Sonoran Preserve",
      "Barrett-Jackson and PGA tournaments",
    ],
    schools: [
      { name: "Cherokee Elementary", type: "Public K–5" },
      { name: "Cocopah Middle School", type: "Public 6–8" },
      { name: "Chaparral High School", type: "Public 9–12" },
      { name: "Notre Dame Preparatory", type: "Private 9–12" },
    ],
    facts: [
      { label: "Median sale price", value: "$1.28M" },
      { label: "Price per sq ft", value: "$486" },
      { label: "Active inventory", value: "412 homes" },
      { label: "Resort hotels", value: "30+" },
    ],
  },
  {
    slug: "arcadia",
    name: "Arcadia",
    region: "Phoenix",
    image: "/images/neighborhoods/arcadia.jpg",
    tagline: "Citrus groves, wide lawns, Camelback views",
    summary:
      "A 1920s Phoenix subdivision built on citrus acreage, now the valley's most walkable established neighbourhood.",
    description: [
      "Arcadia was laid out in the 1920s on former citrus land, and the irrigation infrastructure that made the groves possible still runs beneath it — which is why Arcadia has lawns and mature trees where the rest of Phoenix has gravel.",
      "The original housing stock was modest ranch homes on generous lots. Over the last fifteen years most have been rebuilt or extensively remodelled, producing a neighbourhood that reads as established but performs like new construction.",
      "The appeal is the combination: you can walk to restaurants on Indian School and Camelback, see the mountain from your kitchen window, and still be fifteen minutes from the airport. Lot sizes of a third to three-quarters of an acre are typical.",
    ],
    medianPrice: 1740000,
    pricePerSqft: 528,
    inventory: 61,
    walkScore: 62,
    lifestyle: [
      "Mature citrus and shade trees",
      "Restaurant row on Indian School Road",
      "Camelback Mountain trailheads",
      "Canal path cycling and running",
      "Ten minutes to the Biltmore",
    ],
    schools: [
      { name: "Hopi Elementary", type: "Public K–5" },
      { name: "Ingleside Middle School", type: "Public 6–8" },
      { name: "Arcadia High School", type: "Public 9–12" },
      { name: "The Gregory School", type: "Private 5–12" },
    ],
    facts: [
      { label: "Median sale price", value: "$1.74M" },
      { label: "Price per sq ft", value: "$528" },
      { label: "Active inventory", value: "61 homes" },
      { label: "Typical lot", value: "0.35–0.75 acre" },
    ],
  },
  {
    slug: "tempe",
    name: "Tempe",
    region: "East Valley",
    image: "/images/neighborhoods/tempe.jpg",
    tagline: "The valley's most walkable urban core",
    summary:
      "A university city with genuine street life, light rail, and the strongest rental fundamentals in metropolitan Phoenix.",
    description: [
      "Tempe is the outlier in the Valley: a compact, walkable city with a functioning downtown, a light rail spine, and a demographic mix that keeps the streets busy year-round rather than seasonally.",
      "For buyers, that translates into the best rental performance in the metro. Executive rentals, student housing and short-term lets all clear comfortably, which is why a significant share of our investor clients concentrate here.",
      "The residential stock runs from historic districts near Mill Avenue to newer townhome and mid-rise product along the lake and the 202. Prices remain materially below Scottsdale for equivalent proximity to employment.",
    ],
    medianPrice: 545000,
    pricePerSqft: 372,
    inventory: 148,
    walkScore: 89,
    lifestyle: [
      "Mill Avenue dining and nightlife",
      "Light rail to Phoenix and Mesa",
      "Tempe Town Lake and marina",
      "Arizona State University",
      "Papago Park and the botanical garden",
    ],
    schools: [
      { name: "Broadmor Elementary", type: "Public K–5" },
      { name: "Connolly Middle School", type: "Public 6–8" },
      { name: "McClintock High School", type: "Public 9–12" },
      { name: "Tempe Preparatory Academy", type: "Charter 6–12" },
    ],
    facts: [
      { label: "Median sale price", value: "$545K" },
      { label: "Price per sq ft", value: "$372" },
      { label: "Active inventory", value: "148 homes" },
      { label: "Walk Score", value: "89" },
    ],
  },
  {
    slug: "phoenix",
    name: "Phoenix",
    region: "Phoenix",
    image: "/images/neighborhoods/phoenix.jpg",
    tagline: "Established corridors and a fast-changing core",
    summary:
      "The valley's centre of gravity, from the Biltmore and Arcadia edges to a downtown that has added tens of thousands of residents in a decade.",
    description: [
      "Phoenix is where the valley's growth is most visible. Downtown has added residential towers, a biomedical campus and a convention business that keeps hotel occupancy high, while the historic districts around it have appreciated steadily.",
      "Our clients typically focus on three Phoenix sub-markets: the Biltmore corridor for established estates, the historic districts north of downtown for character housing, and the new-build mid-rise product downtown for investment.",
      "Pricing is the most varied in the metro — a renovated bungalow in Willo and a penthouse on Central Avenue are the same zip code and entirely different asset classes. Local guidance matters more here than anywhere else in the valley.",
    ],
    medianPrice: 462000,
    pricePerSqft: 318,
    inventory: 634,
    walkScore: 41,
    lifestyle: [
      "Downtown arts and restaurant districts",
      "Heard Museum and Phoenix Art Museum",
      "Encanto and Steele Indian School parks",
      "Sky Harbor International Airport",
      "Roosevelt Row galleries",
    ],
    schools: [
      { name: "Madison Elementary", type: "Public K–8" },
      { name: "North High School", type: "Public 9–12" },
      { name: "Brophy College Preparatory", type: "Private 9–12" },
      { name: "Phoenix Country Day School", type: "Private K–12" },
    ],
    facts: [
      { label: "Median sale price", value: "$462K" },
      { label: "Price per sq ft", value: "$318" },
      { label: "Active inventory", value: "634 homes" },
      { label: "Sub-markets", value: "12 distinct" },
    ],
  },
  {
    slug: "north-scottsdale",
    name: "North Scottsdale",
    region: "Scottsdale",
    image: "/images/neighborhoods/north-scottsdale.jpg",
    tagline: "Hillside terrain and gated privacy",
    summary:
      "The valley's newest luxury frontier — elevation, gated enclaves, and contemporary architecture built into the granite.",
    description: [
      "North Scottsdale begins roughly at the Loop 101 and continues to the Tonto National Forest boundary, a stretch of hillside terrain that has absorbed most of the valley's new luxury construction since 2010.",
      "The distinguishing feature is topography. Elevation changes of several hundred feet are common, which means genuine view corridors, natural drainage, and lot shapes that will not accept a generic floor plan. The best houses here were designed for their specific site.",
      "Communities such as Silverleaf, Desert Highlands and Estancia set the upper tier, but the area also contains a broad range of gated and semi-custom product between $1.5M and $4M.",
    ],
    medianPrice: 2180000,
    pricePerSqft: 552,
    inventory: 196,
    walkScore: 22,
    lifestyle: [
      "Gated hillside communities",
      "McDowell Sonoran Preserve access",
      "Kierland Commons and Scottsdale Quarter",
      "Private aviation at Scottsdale Airport",
      "Pinnacle Peak and Tom's Thumb trails",
    ],
    schools: [
      { name: "Copper Ridge Elementary", type: "Public K–5" },
      { name: "Copper Ridge Middle School", type: "Public 6–8" },
      { name: "Chaparral High School", type: "Public 9–12" },
      { name: "Basis Scottsdale", type: "Charter K–12" },
    ],
    facts: [
      { label: "Median sale price", value: "$2.18M" },
      { label: "Price per sq ft", value: "$552" },
      { label: "Active inventory", value: "196 homes" },
      { label: "Elevation range", value: "1,600–3,000 ft" },
    ],
  },
  {
    slug: "central-scottsdale",
    name: "Central Scottsdale",
    region: "Scottsdale",
    image: "/images/neighborhoods/central-scottsdale.jpg",
    tagline: "Established streets, mature landscape, best value in Scottsdale",
    summary:
      "The corridor between Hayden and Pima — established 1970s and 80s neighbourhoods now being renewed home by home.",
    description: [
      "Central Scottsdale is where buyers who want the Scottsdale address without the hillside premium tend to land. The street grid is mature, the landscaping is established, and the homes are on real lots rather than zero-lot lines.",
      "The housing stock dates largely from the 1970s and 1980s, which means a wide spectrum of condition: original homes, partial renovations, and a growing number of full rebuilds. Careful diligence separates a good purchase from an expensive one here.",
      "The location is the strongest argument. The greenbelt runs through it, Old Town is ten minutes south, Kierland is ten minutes north, and the 101 is immediately accessible.",
    ],
    medianPrice: 985000,
    pricePerSqft: 428,
    inventory: 224,
    walkScore: 44,
    lifestyle: [
      "Scottsdale greenbelt and bike paths",
      "Ten minutes to Old Town",
      "Scottsdale Ranch and Cactus parks",
      "Established shade trees",
      "Wide range of renovation potential",
    ],
    schools: [
      { name: "Sequoya Elementary", type: "Public K–5" },
      { name: "Cocopah Middle School", type: "Public 6–8" },
      { name: "Chaparral High School", type: "Public 9–12" },
      { name: "Notre Dame Preparatory", type: "Private 9–12" },
    ],
    facts: [
      { label: "Median sale price", value: "$985K" },
      { label: "Price per sq ft", value: "$428" },
      { label: "Active inventory", value: "224 homes" },
      { label: "Build era", value: "1975–1990" },
    ],
  },
  {
    slug: "gilbert",
    name: "Gilbert",
    region: "East Valley",
    image: "/images/neighborhoods/gilbert.jpg",
    tagline: "Family-first planning and walkable new districts",
    summary:
      "The East Valley's most thoughtfully planned town, with heritage neighbourhoods and a genuinely walkable downtown.",
    description: [
      "Gilbert grew from an agricultural town into one of the largest municipalities in Arizona without losing its centre. The heritage downtown around the water tower is intact, and newer districts such as Agritopia and the Heritage District were planned around walkability rather than cul-de-sacs.",
      "For families, the appeal is straightforward: newer housing stock, consistently strong schools, parks within walking distance of most homes, and a level of municipal investment in amenities that is unusual at this price point.",
      "Prices have risen steadily but remain well below Scottsdale for comparable square footage, which makes Gilbert the most common recommendation we make to buyers relocating with young families.",
    ],
    medianPrice: 592000,
    pricePerSqft: 296,
    inventory: 286,
    walkScore: 38,
    lifestyle: [
      "Agritopia farm and market district",
      "Heritage District restaurants",
      "Riparian Preserve at Water Ranch",
      "Extensive park and trail network",
      "Top-rated unified school district",
    ],
    schools: [
      { name: "Ashland Ranch Elementary", type: "Public K–6" },
      { name: "South Valley Junior High", type: "Public 7–8" },
      { name: "Campo Verde High School", type: "Public 9–12" },
      { name: "Gilbert Christian Schools", type: "Private K–12" },
    ],
    facts: [
      { label: "Median sale price", value: "$592K" },
      { label: "Price per sq ft", value: "$296" },
      { label: "Active inventory", value: "286 homes" },
      { label: "Median age", value: "34 years" },
    ],
  },
  {
    slug: "mesa",
    name: "Mesa",
    region: "East Valley",
    image: "/images/neighborhoods/mesa.jpg",
    tagline: "Red mountain views and the valley's best value per acre",
    summary:
      "Arizona's third-largest city, where the northeast foothills offer dramatic desert terrain at a fraction of Scottsdale pricing.",
    description: [
      "Mesa covers a great deal of ground, and the difference between its western neighbourhoods and the northeast foothills is substantial. Our clients almost always gravitate to the latter — Las Sendas, Red Mountain Ranch and the Usery corridor.",
      "The terrain there is genuinely dramatic. Elevation rises sharply, the vegetation shifts to saguaro and cholla, and views extend across the Salt River corridor to the Superstitions. It is the closest the East Valley comes to the landscape of north Scottsdale.",
      "What buyers give up is proximity to Old Town and the resort belt. What they gain is land, view, and a price per square foot that is frequently thirty to forty per cent lower for comparable construction.",
    ],
    medianPrice: 468000,
    pricePerSqft: 274,
    inventory: 502,
    walkScore: 31,
    lifestyle: [
      "Usery Mountain and Red Mountain parks",
      "Las Sendas golf and tennis",
      "Salt River tubing and recreation",
      "Mesa Arts Center and downtown revival",
      "Lower price per acre than Scottsdale",
    ],
    schools: [
      { name: "Las Sendas Elementary", type: "Public K–6" },
      { name: "Fremont Junior High", type: "Public 7–8" },
      { name: "Red Mountain High School", type: "Public 9–12" },
      { name: "Heritage Academy", type: "Charter 6–12" },
    ],
    facts: [
      { label: "Median sale price", value: "$468K" },
      { label: "Price per sq ft", value: "$274" },
      { label: "Active inventory", value: "502 homes" },
      { label: "Foothill elevation", value: "up to 2,400 ft" },
    ],
  },
];

/* ------------------------------- selectors ------------------------------- */

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}

export function getNeighborhoodName(slug: string): string {
  return getNeighborhood(slug)?.name ?? slug;
}

/** Order used for the homepage explorer: the three we lead with, then the rest. */
export const featuredNeighborhoodSlugs = [
  "paradise-valley",
  "scottsdale",
  "arcadia",
  "north-scottsdale",
  "phoenix",
  "central-scottsdale",
  "gilbert",
  "tempe",
  "mesa",
];
