export interface ServiceCategory {
  id: string;
  title: string;
  category: "residential" | "commercial" | "dumpster" | "recycling";
  shortDesc: string;
  fullDesc: string;
  badge: string;
  image: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export const wasteServicesList: ServiceCategory[] = [
  {
    id: "residential-pickup",
    title: "Residential Garbage & Curbside Collection",
    category: "residential",
    shortDesc: "Scheduled weekly household refuse collection across Kampala and Wakiso neighborhoods with durable bins and color-coded sacks.",
    fullDesc: "Dependable, clean, and odor-free doorstep pickup for residential homes, gated estates, and apartments. Never worry about missed trash days with automated SMS route reminders.",
    badge: "Popular for Homes",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    features: [
      "120L & 240L heavy-duty wheelie bins provided",
      "Choice of 1x or 2x weekly scheduled collections",
      "Free initial supply of color-coded sorting sacks",
      "SMS & mobile notifications before collection day",
    ],
    ctaText: "Check Residential Rates",
    ctaLink: "/pricing",
  },
  {
    id: "commercial-waste",
    title: "Commercial & Business Waste Management",
    category: "commercial",
    shortDesc: "Tailored waste management programs and containers for hotels, restaurants, retail malls, corporate offices, and institutions.",
    fullDesc: "We provide commercial containers ranging from 1.5m³ front-load bins to stationary compactors, accompanied by verifiable NEMA waste manifests and ESG reporting.",
    badge: "For Businesses",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    features: [
      "Flexible schedule (nightly, daily, or tri-weekly)",
      "Front-load lockable bins to prevent scavengers & pests",
      "Waste audit certificates for ISO 14001 & ESG reporting",
      "Dedicated account manager & 24/7 dispatch hotline",
    ],
    ctaText: "Request Business Proposal",
    ctaLink: "/book-demo",
  },
  {
    id: "dumpster-rental",
    title: "Roll-Off Dumpsters & Construction Skips",
    category: "dumpster",
    shortDesc: "7m³, 12m³, and 20m³ steel skip containers delivered directly to your job site, estate renovation, or factory cleanout.",
    fullDesc: "Whether you are clearing estate garden debris, managing commercial remodeling, or hauling construction and demolition rubble, our heavy-duty roll-off skips make disposal effortless.",
    badge: "Heavy Duty",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    features: [
      "Same-day or next-day delivery across Kampala & Entebbe",
      "Flexible rental durations (3-day, 7-day, or monthly)",
      "Handles concrete, scrap timber, metals, and packaging",
      "Environmentally certified sorting at our Kitende facility",
    ],
    ctaText: "Rent a Dumpster",
    ctaLink: "/pricing#calculator",
  },
  {
    id: "recycling-gogreenug",
    title: "Plastics, Paper & Metal Circular Recycling",
    category: "recycling",
    shortDesc: "Pioneering selective collection under the GoGreenug banner, transforming post-consumer waste into valuable industrial feedstocks.",
    fullDesc: "Nature Waste Management Limited operates a licensed sorting and baling plant in Kitende. We divert over 120,000 MT of plastics, aluminum cans, and scrap cardboard from open landfills annually.",
    badge: "GoGreenug Initiative",
    image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800&q=80",
    features: [
      "Optical and manual sorting for PET bottles & HDPE jerrycans",
      "High-density cardboard baling for packaging manufacturers",
      "Organic compost processing for agricultural bio-fertilizer",
      "Community incentive buy-back programs in Kampala suburbs",
    ],
    ctaText: "Explore Recycling Programs",
    ctaLink: "/features",
  },
];
