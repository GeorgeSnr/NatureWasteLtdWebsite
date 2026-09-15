export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  priceMonthly: number | string;
  priceAnnual: number | string;
  description: string;
  popular?: boolean;
  features: string[];
  cta: string;
  ctaLink: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "residential",
    name: "Residential Connect",
    badge: "Households & Estates",
    priceMonthly: 15,
    priceAnnual: 12,
    description: "Designed for single residences, gated communities, and private residential estates.",
    features: [
      "Weekly automated doorstep pickup",
      "Standard 120L or 240L wheelie bin included",
      "Mobile app access for ad-hoc collections",
      "Curbside recycling sorting bags provided",
      "SMS collection arrival notifications",
      "Basic EcoRewards points program",
    ],
    cta: "Start Residential Plan",
    ctaLink: "/register?plan=residential",
  },
  {
    id: "commercial",
    name: "Commercial Business",
    badge: "MOST POPULAR",
    priceMonthly: 89,
    priceAnnual: 75,
    description: "For offices, restaurants, retail malls, schools, and commercial establishments.",
    popular: true,
    features: [
      "2x to 5x weekly scheduled compactor visits",
      "Heavy-duty 660L / 1100L commercial skips",
      "Cardboard, glass & organic food waste streams",
      "Automated electronic weighbridge receipts",
      "Multi-user billing portal & Mobile Money API",
      "Monthly diversion & recycling report",
      "Dedicated account manager",
    ],
    cta: "Select Commercial Plan",
    ctaLink: "/register?plan=commercial",
  },
  {
    id: "municipal",
    name: "Municipal & Industrial Enterprise",
    badge: "Enterprises & Cities",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    description: "Tailored infrastructure for city councils, industrial parks, and multi-hospital networks.",
    features: [
      "Unlimited smart bins with ultrasonic IoT sensors",
      "Full Nature Waste Connect dispatch & fleet ERP",
      "Hazardous & biohazard certified chain-of-custody",
      "Weighbridge telematics & driver dispatch apps",
      "Custom NEMA / EPA regulatory audit integrations",
      "Dedicated implementation engineers & 24/7 SLA",
      "Guaranteed zero-waste-to-landfill roadmap",
    ],
    cta: "Contact Enterprise Sales",
    ctaLink: "/book-demo?plan=enterprise",
  },
];

export const featureComparison = [
  {
    category: "COLLECTION & BINS",
    items: [
      { name: "Doorstep Scheduled Pickup", residential: true, commercial: true, enterprise: true },
      { name: "Smart Bin IoT Ultrasonic Fill Sensor", residential: false, commercial: "Optional", enterprise: true },
      { name: "Heavy Duty Commercial Skips (660L - 1100L)", residential: false, commercial: true, enterprise: true },
      { name: "On-Demand Bulky Waste Scheduling", residential: true, commercial: true, enterprise: true },
      { name: "Hydraulic Compactor Truck Access", residential: false, commercial: true, enterprise: true },
    ],
  },
  {
    category: "RECYCLING & ESG REPORTING",
    items: [
      { name: "Source Segregation Bags (Plastics, Paper, Organic)", residential: true, commercial: true, enterprise: true },
      { name: "Certified Tonnage Diversion Certificate", residential: false, commercial: true, enterprise: true },
      { name: "Digital Hazardous / Biohazard Manifests", residential: false, commercial: false, enterprise: true },
      { name: "ESG Corporate Sustainability Dashboard", residential: false, commercial: true, enterprise: true },
      { name: "Carbon Avoidance Offset Accreditation", residential: false, commercial: "Optional", enterprise: true },
    ],
  },
  {
    category: "SOFTWARE & PLATFORM",
    items: [
      { name: "Citizen Mobile App (iOS & Android)", residential: true, commercial: true, enterprise: true },
      { name: "Multi-User Corporate Billing Portal", residential: false, commercial: true, enterprise: true },
      { name: "Fleet GPS & Dispatch Telematics", residential: false, commercial: false, enterprise: true },
      { name: "Weighbridge Scale API Integration", residential: false, commercial: false, enterprise: true },
      { name: "Dedicated 24/7 Operations SLA", residential: false, commercial: "Standard", enterprise: "Priority 24/7" },
    ],
  },
];
