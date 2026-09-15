export interface IndustryItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  keyProblems: string[];
  ourSolution: string[];
  stats: { label: string; value: string };
}

export const industriesData: IndustryItem[] = [
  {
    id: "municipalities",
    name: "Municipalities & City Councils",
    subtitle: "Public health, overflowing street bins, and fleet fuel control",
    description: "Empowering urban governance with smart bin fill monitoring, automated billing, and illegal dump GPS heatmaps to build clean, resilient African cities.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    keyProblems: [
      "Frequent street bin overflows causing public health hazards and pest infestation",
      "Massive revenue leakage from manual cash fee collection",
      "High fuel costs from rigid, unoptimized collection truck routes",
    ],
    ourSolution: [
      "Ultrasonic solar-powered bin sensors flagging overflow before it happens",
      "Automated Mobile Money and bank billing linked to resident property registries",
      "Dynamic routing reducing vehicle miles traveled by 30-40%",
    ],
    stats: { label: "Overflow Reduction", value: "91%" },
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Industrial Parks",
    subtitle: "Zero-landfill compliance, scrap sorting, and EPA audit trails",
    description: "Transforming factory production scrap into valuable circular inputs with on-site compaction, scrap segregation, and verifiable material disposal manifests.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    keyProblems: [
      "Heavy landfill tipping fees for bulky packaging and production trimmings",
      "Lack of verifiable records for ESG environmental audits",
      "Fire hazards from unsegregated combustible waste storage",
    ],
    ourSolution: [
      "Custom hydraulic industrial balers and compactors installed on-site",
      "Certified material recovery facilities buying back clean sorted polymers and metals",
      "Tamper-proof digital weight logs and environmental certificates",
    ],
    stats: { label: "Landfill Diversion", value: "88%" },
  },
  {
    id: "healthcare",
    name: "Hospitals & Healthcare Facilities",
    subtitle: "Infectious biohazards, sharps, and pharmaceutical destruction",
    description: "Strict closed-loop clinical waste handling compliant with WHO and national health standards, featuring barcoded yellow bags and high-temp thermal incineration.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    keyProblems: [
      "Extreme risk of needle-stick injuries and infectious pathogen exposure",
      "Stringent regulatory penalties for improper hazardous waste disposal",
      "Unreliable third-party haulers lacking temperature-controlled transport",
    ],
    ourSolution: [
      "Dedicated puncture-resistant sharps bins and UN-certified biohazard containers",
      "Full digital chain-of-custody tracking with driver cryptographic signatures",
      "Dual-chamber 1200°C thermal destruction with continuous emissions monitoring",
    ],
    stats: { label: "Safety Compliance", value: "100%" },
  },
  {
    id: "commercial-retail",
    name: "Commercial Centers & Shopping Malls",
    subtitle: "High-volume food waste, cardboard baling, and tenant billing",
    description: "Clean, odorless back-of-house operations for high-footfall shopping centers and hotel complexes with automated tenant waste metering.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    keyProblems: [
      "Food court organic waste creating pest attraction and odor complaints",
      "Overcrowded loading docks blocked by uncompacted cardboard boxes",
      "Difficulty allocating fair waste service costs among 50+ retail tenants",
    ],
    ourSolution: [
      "Hermetically sealed organic waste containers with enzymatic deodorizers",
      "High-pressure hydraulic balers condensing cardboard by 80%",
      "Tenant RFID scan-to-dump cards enabling exact usage-based billing",
    ],
    stats: { label: "Dock Volume Reduction", value: "75%" },
  },
  {
    id: "residential-estates",
    name: "Residential Estates & Gated Communities",
    subtitle: "Curbside sorting, weekly pickups, and eco-friendly neighborhoods",
    description: "Reliable, clean residential waste management that makes recycling effortless for modern suburban neighborhoods and apartment towers.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    keyProblems: [
      "Missed pickup days by unreliable informal trash collectors",
      "Disorganized sorting with recyclables mixed into general rotting waste",
      "No convenient mechanism to dispose of old mattresses or appliances",
    ],
    ourSolution: [
      "Guaranteed schedule with automated arrival SMS alerts",
      "Free color-coded recycling bags and doorstep sorting collection",
      "In-app one-click booking for bulky furniture and electronics",
    ],
    stats: { label: "Pickup Reliability", value: "99.4%" },
  },
];
