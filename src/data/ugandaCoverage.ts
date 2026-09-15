export interface SuburbCoverage {
  id: string;
  name: string;
  division: string;
  pickupDays: string;
  recyclingDay: string;
  servicesAvailable: string[];
  contactPerson: string;
  hotline: string;
}

export const ugandaCoverageAreas: SuburbCoverage[] = [
  {
    id: "kitende",
    name: "Kitende (Headquarters)",
    division: "Entebbe Road Corridor / Wakiso",
    pickupDays: "Tuesdays & Fridays",
    recyclingDay: "Every Wednesday",
    servicesAvailable: ["Residential Curbside", "Commercial Waste", "Roll-off Skips", "Plastics Recycling"],
    contactPerson: "Kitende Dispatch Desk",
    hotline: "+256 700 890 123",
  },
  {
    id: "lubowa",
    name: "Lubowa & Quality Chemicals Area",
    division: "Entebbe Road / Makindye Ssabagabo",
    pickupDays: "Mondays & Thursdays",
    recyclingDay: "Every Saturday",
    servicesAvailable: ["Estate Residential", "Pharmaceutical Waste", "Commercial Dumpsters", "Garden Compost"],
    contactPerson: "Lubowa Area Supervisor",
    hotline: "+256 700 890 124",
  },
  {
    id: "kajjansi",
    name: "Kajjansi & Seguku",
    division: "Wakiso District",
    pickupDays: "Tuesdays & Saturdays",
    recyclingDay: "Every Thursday",
    servicesAvailable: ["Residential Collection", "Commercial Markets", "Bulk Scrap Metal"],
    contactPerson: "Kajjansi Route Team",
    hotline: "+256 700 890 125",
  },
  {
    id: "entebbe",
    name: "Entebbe Municipality & Airport Zone",
    division: "Entebbe Municipality",
    pickupDays: "Daily & Mon-Wed-Fri Residential",
    recyclingDay: "Tuesdays & Thursdays",
    servicesAvailable: ["Hospitality & Hotels", "Residential Estates", "Marine Plastic Recovery", "Airport Logistics"],
    contactPerson: "Entebbe Municipal Lead",
    hotline: "+256 700 890 126",
  },
  {
    id: "bugolobi",
    name: "Bugolobi, Mbuya & Village Mall Environs",
    division: "Nakawa Division, Kampala",
    pickupDays: "Mondays & Thursdays",
    recyclingDay: "Every Wednesday",
    servicesAvailable: ["Commercial Retail Malls", "High-Density Residential", "Paper & Carton Recycling"],
    contactPerson: "Bugolobi Route Manager",
    hotline: "+256 700 890 127",
  },
  {
    id: "kololo",
    name: "Kololo, Nakasero & CBD Commercial",
    division: "Central Division, Kampala",
    pickupDays: "Daily Nightly Shift & Wed/Sat Residential",
    recyclingDay: "Every Tuesday",
    servicesAvailable: ["Corporate Offices", "Embassies & Consulates", "Compactor Units", "Zero-Waste Audits"],
    contactPerson: "CBD Commercial Division",
    hotline: "+256 700 890 128",
  },
  {
    id: "namanve",
    name: "Namanve Industrial Park & Bweyogerere",
    division: "Mukono / Wakiso Border",
    pickupDays: "Scheduled Industrial Runs (Mon - Sat)",
    recyclingDay: "Continuous Bulk Hauling",
    servicesAvailable: ["Industrial Roll-Off Skips", "Factory Scrap Processing", "Hazardous Waste Manifests", "Baled Polymers"],
    contactPerson: "Industrial Parks Coordinator",
    hotline: "+256 700 890 129",
  },
  {
    id: "makindye",
    name: "Makindye, Buziga & Munyonyo",
    division: "Makindye Division, Kampala",
    pickupDays: "Wednesdays & Saturdays",
    recyclingDay: "Every Monday",
    servicesAvailable: ["Gated Community Pickup", "Lakeside Hospitality", "Organic Food Waste Biogas"],
    contactPerson: "Makindye Operations",
    hotline: "+256 700 890 130",
  },
  {
    id: "kira",
    name: "Kira, Naalya & Namugongo",
    division: "Kira Municipality, Wakiso",
    pickupDays: "Mondays & Thursdays",
    recyclingDay: "Every Friday",
    servicesAvailable: ["Residential Doorstep Pickup", "Shopping Centers", "Estate Composting"],
    contactPerson: "Kira Municipal Route",
    hotline: "+256 700 890 131",
  },
];
