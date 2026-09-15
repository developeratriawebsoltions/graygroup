import type { Property, TourScene } from "@/types";

/**
 * Curated Arizona portfolio. All content is original editorial copy written for
 * this brand; imagery is licensed stock photography served locally.
 */
const propertyList: Property[] = [
  {
    slug: "paradise-valley-modern-desert-estate",
    name: "Modern Desert Estate",
    type: "Estate",
    address: "6840 E Desert Fairways Drive",
    city: "Paradise Valley",
    neighborhoodSlug: "paradise-valley",
    price: 2850000,
    status: "For Sale",
    beds: 5,
    baths: 6,
    sqft: 6900,
    lotAcres: 1.2,
    yearBuilt: 2021,
    heroImage: "/images/properties/paradise-valley-modern-desert-estate.jpg",
    gallery: [
      {
        src: "/images/properties/paradise-valley-modern-desert-estate.jpg",
        alt: "White stucco and timber residence framed by a mirror-still pool at midday",
      },
      {
        src: "/images/interiors/great-room-fireplace.jpg",
        alt: "Great room with floor-to-ceiling glass and a honed limestone fireplace",
      },
      {
        src: "/images/interiors/chef-kitchen-ivory.jpg",
        alt: "Chef's kitchen with ivory cabinetry and a waterfall stone island",
      },
      {
        src: "/images/interiors/primary-suite.jpg",
        alt: "Primary suite with soft neutral textiles and garden outlook",
      },
      {
        src: "/images/interiors/spa-bathroom-stone.jpg",
        alt: "Spa bathroom in book-matched stone with a freestanding soaking tub",
      },
      {
        src: "/images/interiors/pool-terrace-glass.jpg",
        alt: "Glass-walled pool terrace connecting the great room to the garden",
      },
    ],
    summary:
      "A disciplined modern composition of white stucco, warm timber and glass, arranged around a north-facing courtyard and pool.",
    description: [
      "Set on a quiet interior lot beneath Camelback's northern flank, this residence was designed around a single idea: let the desert light do the work. Deep roof overhangs shade the glass during summer while winter sun reaches all the way to the back of the great room.",
      "The plan reads as two wings joined by a glazed gallery. Living, dining and kitchen occupy one continuous volume that opens on two sides to the pool terrace; the primary suite and three guest rooms sit in the quieter wing, buffered from the street by a planted forecourt.",
      "Finishes are restrained and tactile — honed limestone, rift-sawn white oak, bronze hardware and plaster walls that shift colour through the day. The result is a house that feels calm at noon and luminous at dusk.",
    ],
    features: [
      "Chef's kitchen with 48\" range and waterfall island",
      "Disappearing glass walls to pool terrace",
      "Primary suite with dual dressing rooms",
      "Climate-controlled 600-bottle wine room",
      "Detached guest casita with private entry",
      "Owned solar array and dual-zone HVAC",
      "Motorised shades and full home automation",
      "Four-car garage with EV charging",
    ],
    highlights: [
      { label: "Lot", value: "1.2 acres" },
      { label: "Year Built", value: "2021" },
      { label: "Garage", value: "4 cars" },
      { label: "Pool", value: "Heated, saltwater" },
    ],
    location: {
      lat: 33.5312,
      lng: -111.9511,
      blurb:
        "Minutes from the Camelback corridor and Old Town Scottsdale, with direct access to the Camelback Mountain trailheads.",
    },
    featured: true,
    agentSlugs: ["chris-gray", "jan-gray"],
    mls: "GG-6824011",
  },
  {
    slug: "north-scottsdale-hillside-contemporary",
    name: "Hillside Contemporary",
    type: "Contemporary",
    address: "11204 E Whispering Wind Drive",
    city: "North Scottsdale",
    neighborhoodSlug: "north-scottsdale",
    price: 4200000,
    status: "For Sale",
    beds: 6,
    baths: 7,
    sqft: 8420,
    lotAcres: 1.8,
    yearBuilt: 2019,
    heroImage: "/images/properties/north-scottsdale-hillside-contemporary.jpg",
    gallery: [
      {
        src: "/images/properties/north-scottsdale-hillside-contemporary.jpg",
        alt: "Hillside residence with cantilevered upper volume above a reflecting pool",
      },
      {
        src: "/images/interiors/open-plan-timber.jpg",
        alt: "Open-plan living space in rift-sawn oak with a linear fireplace",
      },
      {
        src: "/images/interiors/glass-living-view.jpg",
        alt: "Living room glazing framing long desert and mountain views",
      },
      {
        src: "/images/interiors/minimal-kitchen-island.jpg",
        alt: "Minimal kitchen with integrated appliances and stone island",
      },
      {
        src: "/images/interiors/dining-pavilion.jpg",
        alt: "Dining pavilion with pendant lighting and courtyard access",
      },
      {
        src: "/images/interiors/serene-bedroom.jpg",
        alt: "Guest bedroom with muted palette and desert light",
      },
    ],
    summary:
      "A cantilevered hillside home engineered so that every principal room looks out across the McDowell range to the horizon.",
    description: [
      "Building on a slope is an exercise in restraint. Here the main volume was pushed forward on a concrete plinth so the living level floats above the desert floor, giving uninterrupted sightlines over the preserve to the north and east.",
      "Inside, the palette stays deliberately quiet — oak floors, board-formed concrete, blackened steel and plaster — allowing the view to act as the primary decoration. Rooms are sized for entertaining without becoming cavernous.",
      "Outside, a negative-edge pool appears to spill toward the valley, with a shaded ramada, outdoor kitchen and a series of terraced native plantings that need almost no irrigation once established.",
    ],
    features: [
      "Negative-edge pool with valley views",
      "Shaded ramada with outdoor kitchen",
      "Board-formed concrete and blackened steel detailing",
      "Home theatre and conditioned wine cellar",
      "Guest wing with separate access",
      "Whole-home water filtration",
      "Native, low-water landscape design",
      "Six-car garage with workshop bay",
    ],
    highlights: [
      { label: "Lot", value: "1.8 acres" },
      { label: "Year Built", value: "2019" },
      { label: "Views", value: "McDowell Range" },
      { label: "Garage", value: "6 cars" },
    ],
    location: {
      lat: 33.6742,
      lng: -111.9019,
      blurb:
        "Tucked into a gated hillside enclave north of Shea, ten minutes from Kierland and Scottsdale Airpark.",
    },
    featured: true,
    agentSlugs: ["chris-gray"],
    mls: "GG-6819077",
  },
  {
    slug: "scottsdale-silverleaf-estate",
    name: "Silverleaf Estate",
    type: "Estate",
    address: "18702 N 101st Way",
    city: "North Scottsdale",
    neighborhoodSlug: "north-scottsdale",
    price: 6750000,
    status: "Coming Soon",
    beds: 7,
    baths: 9,
    sqft: 11240,
    lotAcres: 2.4,
    yearBuilt: 2023,
    heroImage: "/images/properties/scottsdale-silverleaf-estate.jpg",
    gallery: [
      {
        src: "/images/properties/scottsdale-silverleaf-estate.jpg",
        alt: "Contemporary estate facade lit warmly against a deep blue evening sky",
      },
      {
        src: "/images/interiors/editorial-living-warm.jpg",
        alt: "Formal living room with layered warm neutrals",
      },
      {
        src: "/images/interiors/neutral-lounge.jpg",
        alt: "Lounge seating arranged around a sculptural coffee table",
      },
      {
        src: "/images/interiors/midcentury-timber-lounge.jpg",
        alt: "Timber-lined lounge with mid-century furnishings",
      },
      {
        src: "/images/interiors/marble-bath-detail.jpg",
        alt: "Marble bathroom with freestanding tub and garden window",
      },
      {
        src: "/images/interiors/family-room-neutral.jpg",
        alt: "Family room opening to the covered terrace",
      },
    ],
    summary:
      "A two-and-a-half-acre Silverleaf compound with a guest house, wellness wing and views across the golf course to Camelback.",
    description: [
      "Silverleaf remains the benchmark for upper-tier Scottsdale living, and this compound is one of the few parcels that captures both golf-course frontage and an unobstructed Camelback silhouette.",
      "The main residence is arranged around a central courtyard, a device that keeps the interior cool while allowing every wing its own outdoor room. A dedicated wellness wing houses a gym, sauna, cold plunge and treatment room.",
      "A detached two-bedroom guest house, a twelve-car gallery garage and staff quarters complete a property designed to operate quietly at scale.",
    ],
    features: [
      "Detached two-bedroom guest house",
      "Wellness wing with sauna and cold plunge",
      "Twelve-car gallery garage",
      "Formal and informal dining rooms",
      "Elevator to all levels",
      "Whole-property generator",
      "Gated motor court",
      "Golf course and mountain views",
    ],
    highlights: [
      { label: "Lot", value: "2.4 acres" },
      { label: "Year Built", value: "2023" },
      { label: "Guest House", value: "2 bed / 2 bath" },
      { label: "Garage", value: "12 cars" },
    ],
    location: {
      lat: 33.6488,
      lng: -111.8891,
      blurb:
        "Within the Silverleaf community, adjacent to the DC Ranch Village and the Sonoran Trail system.",
    },
    featured: true,
    agentSlugs: ["chris-gray", "marcus-hale"],
    mls: "GG-6831502",
  },
  {
    slug: "arcadia-camelback-vista-residence",
    name: "Camelback Vista Residence",
    type: "Ranch",
    address: "4521 N Arcadia Lane",
    city: "Arcadia",
    neighborhoodSlug: "arcadia",
    price: 3395000,
    status: "For Sale",
    beds: 5,
    baths: 5,
    sqft: 5120,
    lotAcres: 0.6,
    yearBuilt: 2016,
    heroImage: "/images/properties/arcadia-camelback-vista-residence.jpg",
    gallery: [
      {
        src: "/images/properties/arcadia-camelback-vista-residence.jpg",
        alt: "Arcadia residence at dusk with warm interior light spilling onto the lawn",
      },
      {
        src: "/images/interiors/warm-living-garden.jpg",
        alt: "Living room with garden outlook and layered natural textiles",
      },
      {
        src: "/images/interiors/breakfast-nook.jpg",
        alt: "Breakfast nook set within a bay of windows",
      },
      {
        src: "/images/interiors/sunlit-living.jpg",
        alt: "Sunlit living area with vaulted ceiling",
      },
      {
        src: "/images/interiors/guest-bedroom-light.jpg",
        alt: "Guest bedroom in soft whites and pale timber",
      },
    ],
    summary:
      "Classic Arcadia proportions — mature citrus, wide lawns, Camelback at the end of the street — with an entirely rebuilt interior.",
    description: [
      "Arcadia's appeal has never been about square footage. It is the canopy of mature trees, the irrigation heritage that keeps the lawns green, and a street grid laid out in the 1920s that puts Camelback at the end of almost every view corridor.",
      "This home was taken back to the studs and rebuilt with an open plan that respects the original footprint. Ceilings were vaulted, a wall of glass added to the garden side, and the kitchen repositioned to look out over the pool.",
      "A separate studio at the rear works as an office, gym or guest suite, and the citrus grove — grapefruit, orange and lemon — is mature and productive.",
    ],
    features: [
      "Fully rebuilt interior (2016)",
      "Mature citrus grove",
      "Detached studio / guest suite",
      "Vaulted ceilings with exposed beams",
      "Pebble-tec pool with baja shelf",
      "Outdoor fireplace and covered patio",
      "Dual-pane low-E glazing throughout",
      "Irrigated raised garden beds",
    ],
    highlights: [
      { label: "Lot", value: "0.6 acres" },
      { label: "Year Built", value: "2016" },
      { label: "Studio", value: "Detached" },
      { label: "Views", value: "Camelback Mountain" },
    ],
    location: {
      lat: 33.5039,
      lng: -111.9868,
      blurb:
        "Between 44th and 56th Street, a short drive from the Biltmore and the Arcadia restaurants on Indian School.",
    },
    featured: true,
    agentSlugs: ["jan-gray"],
    mls: "GG-6827440",
  },
  {
    slug: "phoenix-papago-park-modern",
    name: "Papago Park Modern",
    type: "Contemporary",
    address: "2140 N College Avenue",
    city: "Phoenix",
    neighborhoodSlug: "phoenix",
    price: 1895000,
    status: "For Sale",
    beds: 4,
    baths: 4,
    sqft: 3480,
    lotAcres: 0.35,
    yearBuilt: 2020,
    heroImage: "/images/properties/phoenix-papago-park-modern.jpg",
    gallery: [
      {
        src: "/images/properties/phoenix-papago-park-modern.jpg",
        alt: "Compact modern residence with red sandstone cladding",
      },
      {
        src: "/images/interiors/stone-bath-vanity.jpg",
        alt: "Stone vanity bathroom with integrated lighting",
      },
      {
        src: "/images/interiors/glass-living-view.jpg",
        alt: "Living area opening to a private courtyard",
      },
      {
        src: "/images/interiors/minimal-kitchen-island.jpg",
        alt: "Compact kitchen with integrated appliances",
      },
    ],
    summary:
      "An efficient, architect-designed home two blocks from Papago Park, built for lock-and-leave ownership.",
    description: [
      "Designed for owners who travel, this house is small on purpose and generous where it counts. The footprint is compact, the ceilings are high, and every room opens to a courtyard that is fully enclosed and virtually maintenance-free.",
      "Materials are robust — sandstone cladding, polished concrete floors, quartzite counters — chosen to look better with age and to survive long absences without attention.",
      "It is a five-minute walk to the Papago Park trail network and a short drive to both Sky Harbor and Old Town Scottsdale, which makes it equally viable as a principal residence or a low-friction pied-à-terre.",
    ],
    features: [
      "Enclosed private courtyard",
      "Polished concrete floors",
      "Quartzite kitchen surfaces",
      "Lock-and-leave low maintenance",
      "Xeriscape landscape with drip irrigation",
      "Two-car garage with storage",
      "Walkable to Papago Park trails",
      "Smart entry and security system",
    ],
    highlights: [
      { label: "Lot", value: "0.35 acres" },
      { label: "Year Built", value: "2020" },
      { label: "Garage", value: "2 cars" },
      { label: "Airport", value: "9 minutes" },
    ],
    location: {
      lat: 33.4729,
      lng: -111.9542,
      blurb:
        "Adjacent to Papago Park, the Phoenix Zoo and the Desert Botanical Garden, with quick access to the 202.",
    },
    featured: false,
    agentSlugs: ["jan-gray"],
    mls: "GG-6822995",
  },
  {
    slug: "paradise-valley-vista-del-sol",
    name: "Vista del Sol",
    type: "Villa",
    address: "5720 E Cheney Drive",
    city: "Paradise Valley",
    neighborhoodSlug: "paradise-valley",
    price: 5100000,
    status: "For Sale",
    beds: 6,
    baths: 8,
    sqft: 9150,
    lotAcres: 1.6,
    yearBuilt: 2018,
    heroImage: "/images/properties/paradise-valley-vista-del-sol.jpg",
    gallery: [
      {
        src: "/images/properties/paradise-valley-vista-del-sol.jpg",
        alt: "White villa with resort pool and palm planting",
      },
      {
        src: "/images/interiors/neutral-lounge.jpg",
        alt: "Neutral lounge with sculptural seating",
      },
      {
        src: "/images/interiors/dining-pavilion.jpg",
        alt: "Dining pavilion set for a formal dinner",
      },
      {
        src: "/images/interiors/spa-bathroom-stone.jpg",
        alt: "Spa bathroom with freestanding tub",
      },
      {
        src: "/images/interiors/editorial-living-warm.jpg",
        alt: "Formal living room with warm layered neutrals",
      },
    ],
    summary:
      "A resort-scaled Paradise Valley villa on 1.6 acres, with a guest casita, sport court and mature palm garden.",
    description: [
      "Vista del Sol was conceived as a private resort. The pool terrace alone runs the full width of the house, with a swim-up shelf, a shaded cabana and a lawn that steps down to a sport court screened by mature ficus.",
      "Interiors are generous but never showy: a formal living room, a family room that opens to the terrace, and a kitchen organised around a fourteen-foot island. Six bedroom suites are spread across two levels, giving guests genuine privacy.",
      "The grounds are fully walled and gated, with an east-facing orientation that makes the terrace usable from morning through late afternoon.",
    ],
    features: [
      "Resort pool with swim-up shelf and cabana",
      "Detached guest casita",
      "North-south sport court",
      "Fourteen-foot kitchen island",
      "Formal living and family rooms",
      "Walled and gated grounds",
      "Mature palm and citrus garden",
      "Five-car garage",
    ],
    highlights: [
      { label: "Lot", value: "1.6 acres" },
      { label: "Year Built", value: "2018" },
      { label: "Casita", value: "1 bed / 1 bath" },
      { label: "Garage", value: "5 cars" },
    ],
    location: {
      lat: 33.5443,
      lng: -111.9576,
      blurb:
        "On the eastern edge of Paradise Valley, close to the Scottsdale border and the Camelback golf corridor.",
    },
    featured: false,
    agentSlugs: ["chris-gray", "jan-gray"],
    mls: "GG-6826610",
  },
  {
    slug: "central-scottsdale-cactus-corridor",
    name: "Cactus Corridor Contemporary",
    type: "Contemporary",
    address: "8214 E Cactus Road",
    city: "Central Scottsdale",
    neighborhoodSlug: "central-scottsdale",
    price: 2275000,
    status: "Pending",
    beds: 5,
    baths: 5,
    sqft: 4610,
    lotAcres: 0.45,
    yearBuilt: 2017,
    heroImage: "/images/properties/central-scottsdale-cactus-corridor.jpg",
    gallery: [
      {
        src: "/images/properties/central-scottsdale-cactus-corridor.jpg",
        alt: "Contemporary Scottsdale home with a lap pool and glass railings",
      },
      {
        src: "/images/interiors/open-plan-timber.jpg",
        alt: "Open-plan interior in oak and plaster",
      },
      {
        src: "/images/interiors/chef-kitchen-ivory.jpg",
        alt: "Ivory kitchen with stone island",
      },
      {
        src: "/images/interiors/primary-suite.jpg",
        alt: "Primary suite with garden outlook",
      },
    ],
    summary:
      "A move-in-ready contemporary in the Cactus Corridor, walking distance to the Scottsdale Ranch trail network.",
    description: [
      "Central Scottsdale's appeal is its equilibrium: established streets, mature landscaping, and a location that puts the 101, Old Town and the greenbelt within easy reach.",
      "This home updates the formula with a genuinely open plan, a lap pool set into the courtyard, and a primary suite that occupies its own end of the house. Finishes are contemporary but warm, and the layout has proven equally suited to families and to downsizing buyers who still want space for guests.",
      "The property is currently under contract.",
    ],
    features: [
      "Courtyard lap pool",
      "Open-plan living with 12-foot ceilings",
      "Primary suite on its own wing",
      "Three guest bedrooms plus office",
      "Covered outdoor dining",
      "Two-car garage with epoxy floors",
      "Block construction with upgraded insulation",
      "Walkable to the Scottsdale greenbelt",
    ],
    highlights: [
      { label: "Lot", value: "0.45 acres" },
      { label: "Year Built", value: "2017" },
      { label: "Status", value: "Under contract" },
      { label: "Garage", value: "2 cars" },
    ],
    location: {
      lat: 33.5992,
      lng: -111.9021,
      blurb:
        "Between Hayden and Pima, a short distance from Scottsdale Ranch Park and the Loop 101.",
    },
    featured: false,
    agentSlugs: ["jan-gray"],
    mls: "GG-6825188",
  },
  {
    slug: "gilbert-agritopia-courtyard-home",
    name: "Agritopia Courtyard Home",
    type: "Courtyard Home",
    address: "3412 E Colter Street",
    city: "Gilbert",
    neighborhoodSlug: "gilbert",
    price: 1485000,
    status: "For Sale",
    beds: 4,
    baths: 3,
    sqft: 3120,
    lotAcres: 0.22,
    yearBuilt: 2022,
    heroImage: "/images/properties/gilbert-agritopia-courtyard-home.jpg",
    gallery: [
      {
        src: "/images/properties/gilbert-agritopia-courtyard-home.jpg",
        alt: "Contemporary courtyard home with warm timber screening, photographed at dusk",
      },
      {
        src: "/images/interiors/family-room-neutral.jpg",
        alt: "Family room with built-in cabinetry",
      },
      {
        src: "/images/interiors/breakfast-nook.jpg",
        alt: "Breakfast nook overlooking the courtyard",
      },
      {
        src: "/images/interiors/guest-bedroom-light.jpg",
        alt: "Guest bedroom in pale neutrals",
      },
    ],
    summary:
      "A courtyard home in the Agritopia farm community, where the front door opens onto a working urban farm.",
    description: [
      "Agritopia is one of the few planned communities in the Valley built around something real: a working farm, a coffee roaster, a pub and a school, all within walking distance of the front porch.",
      "This courtyard home responds to the setting with a plan that turns inward — a walled entry court, a shaded loggia, and a kitchen window that looks out over the neighbourhood's community garden.",
      "It is the most approachable property in our portfolio, and consistently one of the most requested by buyers relocating from out of state who want walkability without giving up new construction.",
    ],
    features: [
      "Walled entry courtyard",
      "Covered loggia with fireplace",
      "Walkable to Agritopia farm and shops",
      "Community pool and gardens",
      "Energy-efficient new construction",
      "Owned solar",
      "Two-car garage",
      "Direct access to the Heritage Trail",
    ],
    highlights: [
      { label: "Lot", value: "0.22 acres" },
      { label: "Year Built", value: "2022" },
      { label: "Walk Score", value: "72" },
      { label: "Garage", value: "2 cars" },
    ],
    location: {
      lat: 33.3369,
      lng: -111.7588,
      blurb:
        "Within Agritopia, a few minutes from the Loop 202 and downtown Gilbert's restaurant district.",
    },
    featured: false,
    agentSlugs: ["elena-ruiz"],
    mls: "GG-6830114",
  },
  {
    slug: "mesa-las-sendas-desert-retreat",
    name: "Las Sendas Desert Retreat",
    type: "Ranch",
    address: "7820 E Eagle Crest Drive",
    city: "Mesa",
    neighborhoodSlug: "mesa",
    price: 1240000,
    status: "For Sale",
    beds: 4,
    baths: 4,
    sqft: 3640,
    lotAcres: 0.4,
    yearBuilt: 2015,
    heroImage: "/images/properties/mesa-las-sendas-desert-retreat.jpg",
    gallery: [
      {
        src: "/images/properties/mesa-las-sendas-desert-retreat.jpg",
        alt: "Desert home with timber cladding and a walled motor court",
      },
      {
        src: "/images/interiors/sunlit-living.jpg",
        alt: "Sunlit living area with desert views",
      },
      {
        src: "/images/interiors/dining-pavilion.jpg",
        alt: "Dining area opening to the terrace",
      },
      {
        src: "/images/interiors/marble-bath-detail.jpg",
        alt: "Bathroom with garden window",
      },
    ],
    summary:
      "Elevated above the Las Sendas golf course, with red-mountain views and direct trail access from the back gate.",
    description: [
      "Mesa's northeast corner sits at the foot of the Usery and Goldfield ranges, and the difference in elevation is dramatic — the desert opens up and the heat moderates.",
      "This home takes full advantage, with a great room oriented toward the red rock formations and a rear gate that opens directly onto the trail network. The covered terrace runs the length of the house and is genuinely usable for most of the year.",
      "Buyers here typically get considerably more house and land than the same budget buys in Scottsdale, which is why we recommend the area to clients who prioritise space and landscape over proximity to Old Town.",
    ],
    features: [
      "Elevated golf-course and mountain views",
      "Direct trail access from the rear gate",
      "Full-length covered terrace",
      "Outdoor kitchen and fire feature",
      "Desert botanical garden",
      "Three-car garage",
      "Community golf, tennis and pools",
      "High-efficiency HVAC",
    ],
    highlights: [
      { label: "Lot", value: "0.4 acres" },
      { label: "Year Built", value: "2015" },
      { label: "Views", value: "Usery Mountains" },
      { label: "Garage", value: "3 cars" },
    ],
    location: {
      lat: 33.4906,
      lng: -111.6524,
      blurb:
        "Within Las Sendas, ten minutes from the Loop 202 and twenty-five from Sky Harbor.",
    },
    featured: false,
    agentSlugs: ["marcus-hale"],
    mls: "GG-6824033",
  },
  {
    slug: "tempe-papago-contemporary",
    name: "Papago Foothills Contemporary",
    type: "Townhome",
    address: "1620 S Mill Avenue",
    city: "Tempe",
    neighborhoodSlug: "tempe",
    price: 1150000,
    status: "For Sale",
    beds: 3,
    baths: 3,
    sqft: 2480,
    lotAcres: 0.18,
    yearBuilt: 2021,
    heroImage: "/images/properties/tempe-papago-contemporary.jpg",
    gallery: [
      {
        src: "/images/properties/tempe-papago-contemporary.jpg",
        alt: "Dark-clad contemporary townhome with landscaped forecourt",
      },
      {
        src: "/images/interiors/stone-bath-vanity.jpg",
        alt: "Stone bathroom with floating vanity",
      },
      {
        src: "/images/interiors/minimal-kitchen-island.jpg",
        alt: "Minimal kitchen with integrated appliances",
      },
      {
        src: "/images/interiors/serene-bedroom.jpg",
        alt: "Bedroom with muted tones",
      },
    ],
    summary:
      "A lock-and-leave townhome a block from Mill Avenue, well suited to investors and to buyers who want a low-maintenance base in the East Valley.",
    description: [
      "Mill Avenue has matured into one of the Valley's most walkable addresses, with light rail, a farmers' market, and a restaurant and gallery scene anchored by the university.",
      "This townhome sits on the quiet southern end of the corridor, with a private walled forecourt and a rooftop terrace that looks toward A Mountain. The interior is compact but precise, with a full-floor primary suite and two guest rooms below.",
      "For investors, the property has a strong short-term and executive-rental record, and we can share the operating history on request.",
    ],
    features: [
      "Rooftop terrace with A Mountain views",
      "Private walled forecourt",
      "Full-floor primary suite",
      "Light rail within one block",
      "Rental-eligible with documented history",
      "Two-car tandem garage",
      "Integrated smart home controls",
      "Low-maintenance landscape",
    ],
    highlights: [
      { label: "Lot", value: "0.18 acres" },
      { label: "Year Built", value: "2021" },
      { label: "Walk Score", value: "89" },
      { label: "Garage", value: "2 cars" },
    ],
    location: {
      lat: 33.4148,
      lng: -111.9401,
      blurb:
        "One block from Mill Avenue and the light rail, ten minutes from Sky Harbor and downtown Phoenix.",
    },
    featured: false,
    agentSlugs: ["marcus-hale"],
    mls: "GG-6829755",
  },
  {
    slug: "north-scottsdale-desert-highlands",
    name: "Desert Highlands Retreat",
    type: "Contemporary",
    address: "14820 E Desert Vista Trail",
    city: "North Scottsdale",
    neighborhoodSlug: "north-scottsdale",
    price: 3950000,
    status: "Sold",
    beds: 5,
    baths: 6,
    sqft: 7300,
    lotAcres: 2.1,
    yearBuilt: 2014,
    heroImage: "/images/properties/north-scottsdale-desert-highlands.jpg",
    gallery: [
      {
        src: "/images/properties/north-scottsdale-desert-highlands.jpg",
        alt: "Contemporary home with timber screens lit against a twilight sky",
      },
      {
        src: "/images/interiors/open-plan-timber.jpg",
        alt: "Timber-lined open-plan living space",
      },
      {
        src: "/images/interiors/editorial-living-warm.jpg",
        alt: "Warm living room with layered textiles",
      },
      {
        src: "/images/interiors/primary-suite.jpg",
        alt: "Primary suite with private terrace",
      },
    ],
    summary:
      "A two-acre boulder-field site transformed into a private desert compound — sold by Gray Group in 2025.",
    description: [
      "Desert Highlands occupies some of the most dramatic terrain in north Scottsdale, where granite boulders and saguaro forest make every lot feel like a nature preserve.",
      "The house was sited to disturb as little of that as possible: a single-storey bar plan that threads between the boulder outcrops, with timber screens providing shade and privacy from the west.",
      "Gray Group represented the sellers, prepared the property for market, and closed above the original list price after a competitive process.",
    ],
    features: [
      "Two-acre boulder-field site",
      "Single-storey bar plan",
      "Timber sun screens on western elevation",
      "Detached guest casita",
      "Negative-edge pool and spa",
      "Four-car garage",
      "Private well and water treatment",
      "Preserve and mountain views",
    ],
    highlights: [
      { label: "Lot", value: "2.1 acres" },
      { label: "Year Built", value: "2014" },
      { label: "Sold", value: "2025" },
      { label: "Garage", value: "4 cars" },
    ],
    location: {
      lat: 33.7031,
      lng: -111.8672,
      blurb:
        "North of Pinnacle Peak Road, adjoining the Scottsdale Sonoran Preserve.",
    },
    featured: false,
    agentSlugs: ["chris-gray"],
    mls: "GG-6811720",
  },
  {
    slug: "phoenix-biltmore-estate",
    name: "Biltmore Circle Estate",
    type: "Estate",
    address: "6120 N 24th Street",
    city: "Phoenix",
    neighborhoodSlug: "phoenix",
    price: 2640000,
    status: "For Sale",
    beds: 5,
    baths: 5,
    sqft: 5880,
    lotAcres: 0.7,
    yearBuilt: 2013,
    heroImage: "/images/properties/phoenix-biltmore-estate.jpg",
    gallery: [
      {
        src: "/images/properties/phoenix-biltmore-estate.jpg",
        alt: "Biltmore-area estate with pool and mature planting",
      },
      {
        src: "/images/interiors/great-room-fireplace.jpg",
        alt: "Great room with fireplace and glass doors",
      },
      {
        src: "/images/interiors/neutral-lounge.jpg",
        alt: "Neutral lounge with sculptural seating",
      },
      {
        src: "/images/interiors/chef-kitchen-ivory.jpg",
        alt: "Ivory kitchen with stone island",
      },
      {
        src: "/images/interiors/guest-bedroom-light.jpg",
        alt: "Guest bedroom in soft neutrals",
      },
    ],
    summary:
      "A mature, walled estate in the Biltmore Circle, minutes from the Arizona Biltmore and the Camelback corridor.",
    description: [
      "The Biltmore corridor remains one of Phoenix's most established addresses, with the Frank Lloyd Wright-influenced hotel and its two golf courses at its centre.",
      "This walled estate sits on a heavily planted corner lot, with a generous pool terrace, a lawn framed by mature palms, and interiors that have been progressively updated rather than replaced — the result feels settled rather than new.",
      "It suits buyers who want the gravitas of an established neighbourhood, walkable access to the hotel and the canal trail, and a short commute to both downtown and Scottsdale.",
    ],
    features: [
      "Walled corner lot with mature palms",
      "Updated kitchen and bathrooms",
      "Pool terrace with covered dining",
      "Library / home office",
      "Three-car garage",
      "Canal trail within walking distance",
      "Formal dining room",
      "Guest suite with private entry",
    ],
    highlights: [
      { label: "Lot", value: "0.7 acres" },
      { label: "Year Built", value: "2013" },
      { label: "Corridor", value: "Biltmore" },
      { label: "Garage", value: "3 cars" },
    ],
    location: {
      lat: 33.5214,
      lng: -112.0079,
      blurb:
        "In the Biltmore Circle, adjoining the Arizona Biltmore and the Murphy Bridle Path.",
    },
    featured: false,
    agentSlugs: ["jan-gray", "elena-ruiz"],
    mls: "GG-6828370",
  },
];

/* --------------------------------- tours --------------------------------- */

/**
 * Seamless cylindrical panoramas rendered by the canvas viewer. Each scene is a
 * 360° × 90° strip, so the viewer can wrap horizontally without a seam.
 */
export const tourScenes: TourScene[] = [
  {
    id: "great-room",
    label: "Great Room",
    caption: "Living volume, glass to the terrace",
    src: "/images/tours/great-room.jpg",
    initialYaw: 0,
  },
  {
    id: "kitchen-dining",
    label: "Kitchen & Dining",
    caption: "Island, pantry wall and dining",
    src: "/images/tours/kitchen-dining.jpg",
    initialYaw: 24,
  },
  {
    id: "primary-suite",
    label: "Primary Suite",
    caption: "Bedroom, dressing and garden outlook",
    src: "/images/tours/primary-suite.jpg",
    initialYaw: 12,
  },
  {
    id: "pool-terrace",
    label: "Pool Terrace",
    caption: "Covered dining and the water's edge",
    src: "/images/tours/pool-terrace.jpg",
    initialYaw: 40,
  },
];

/**
 * Every listing carries a tour. The scene order is rotated per property so the
 * tour opens on a different room each time, and the starting headings are
 * offset so no two tours begin on the same framing.
 */
function tourFor(index: number): TourScene[] {
  const offset = index % tourScenes.length;
  return tourScenes.map((scene, i) => {
    const rotation = (i + offset) % tourScenes.length;
    return {
      ...tourScenes[rotation],
      initialYaw: (tourScenes[rotation].initialYaw ?? 0) + index * 9,
    };
  });
}

export const properties: Property[] = propertyList.map((property, index) => ({
  ...property,
  tour: property.tour ?? tourFor(index),
}));

/* ------------------------------- selectors ------------------------------- */

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(limit = 4): Property[] {
  return properties.filter((p) => p.featured).slice(0, limit);
}

export function getPropertiesByNeighborhood(slug: string): Property[] {
  return properties.filter((p) => p.neighborhoodSlug === slug);
}

export function getRelatedProperties(slug: string, limit = 3): Property[] {
  const current = getProperty(slug);
  if (!current) return properties.slice(0, limit);
  const sameArea = properties.filter(
    (p) => p.slug !== slug && p.neighborhoodSlug === current.neighborhoodSlug,
  );
  const others = properties.filter(
    (p) => p.slug !== slug && p.neighborhoodSlug !== current.neighborhoodSlug,
  );
  return [...sameArea, ...others].slice(0, limit);
}

export const propertyCities: string[] = Array.from(
  new Set(properties.map((p) => p.city)),
).sort();

export const propertyTypes: string[] = Array.from(
  new Set(properties.map((p) => p.type)),
).sort();

export const priceBands = [
  { label: "Any price", value: "any" },
  { label: "Up to $1.5M", value: "0-1500000" },
  { label: "$1.5M – $3M", value: "1500000-3000000" },
  { label: "$3M – $5M", value: "3000000-5000000" },
  { label: "$5M+", value: "5000000-99999999" },
] as const;

export const bedroomOptions = ["Any", "3+", "4+", "5+", "6+"] as const;
export const bathroomOptions = ["Any", "2+", "3+", "4+", "5+"] as const;
export const statusOptions = [
  "For Sale",
  "Pending",
  "Coming Soon",
  "Sold",
] as const;

/** Sort orders offered on the listing page. */
export const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Largest first", value: "sqft-desc" },
  { label: "Newest build", value: "year-desc" },
] as const;
