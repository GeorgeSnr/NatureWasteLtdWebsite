export interface ServiceModule {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  features: string[];
  metrics: string;
}

export const serviceModules: ServiceModule[] = [
  {
    id: "smart-collection",
    name: "Smart Collection & Routing",
    shortDesc: "IoT fill-level sensors, dynamic compactor truck dispatch, and automated overflow mitigation.",
    fullDesc: "Nature Waste Connect equips street bins, estate skips, and industrial compactors with wireless ultrasonic fill sensors. Our dispatch engine dynamically sequences pickup routes based on live fill thresholds, cutting fuel consumption by up to 34% and preventing overflowing waste bins.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Ultrasonic IoT Bin Level Monitoring",
      "Dynamic Dispatch & Route Optimization",
      "Automated Resident Overflow SMS Alerts",
      "Real-time GPS Driver Turn-by-Turn Navigation",
    ],
    metrics: "34% Reduction in Fuel & Emissions",
  },
  {
    id: "material-recovery",
    name: "Material Recovery & Recycling",
    shortDesc: "End-to-end MRF sorting tracking, baling inventories, and certified circular plastic pelletizing.",
    fullDesc: "Digitize your waste streams from intake scale to buyer shipment. Nature Waste Management Ltd tracks incoming recyclables across PET, HDPE, cardboard, scrap metal, and glass with QR inventory labeling and carbon avoidance certification.",
    image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Automated Weighbridge Ticket Generation",
      "Baled Material Quality & Grade Tracking",
      "Traceable Recycled Polymer Supply Chains",
      "Verified Carbon Offset Certificates",
    ],
    metrics: "120,000+ Tons Diverted from Landfills",
  },
  {
    id: "municipal-billing",
    name: "Municipal & Estate Billing",
    shortDesc: "Multi-currency digital invoicing, automated PAYG bin tags, and community compliance portals.",
    fullDesc: "Eliminate revenue leakage in municipal and private residential waste contracts. Our integrated billing engine supports Mobile Money (M-Pesa, MTN MoMo, Airtel), card payments, and RFID-tagged bin scans for transparent pay-as-you-throw models.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Integrated Mobile Money & Bank Gateways",
      "RFID Bin Tagging for Pay-As-You-Throw",
      "Automated Defaulter & Arrears Notifications",
      "Government Revenue Sharing Dashboards",
    ],
    metrics: "99.2% Collection Rate Efficiency",
  },
  {
    id: "fleet-telematics",
    name: "Fleet Telematics & Maintenance",
    shortDesc: "Compactor truck diagnostics, driver safety scoring, hydraulic lifecycle, and fuel sensors.",
    fullDesc: "Ensure maximum fleet availability with real-time telematics built specifically for waste collection vehicles. Monitor compactor hydraulic pressures, PTO cycles, engine idling, fuel levels, and proactive maintenance alerts.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Hydraulic & Compactor PTO Telematics",
      "Fuel Tank Anti-Theft Sensor Monitoring",
      "Predictive Preventative Maintenance Schedules",
      "Driver Eco-Driving & Safety Scorecards",
    ],
    metrics: "98.8% Vehicle Fleet Uptime",
  },
  {
    id: "hazardous-waste",
    name: "Commercial & Hazardous Waste",
    shortDesc: "Regulated medical, chemical, and industrial hazardous waste chain-of-custody manifests.",
    fullDesc: "Strict regulatory compliance with NEMA, EPA, and WHO standards for hazardous waste. Generate digital hazardous waste manifests with cryptographic chain-of-custody verification, high-temperature incineration logs, and certified disposal documentation.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    features: [
      "NEMA & EPA Regulatory Manifests",
      "Medical Biohazard Chain-of-Custody",
      "High-Temp Incineration Destruction Logs",
      "Certified ESG Compliance Reports",
    ],
    metrics: "100% Audit & Compliance Pass Rate",
  },
  {
    id: "citizen-connect",
    name: "Citizen & Community Connect",
    shortDesc: "Mobile portal for on-demand bulky waste pickup, recycling reward tokens, and illegal dump reporting.",
    fullDesc: "Empower households and neighborhood associations to participate directly in clean communities. Citizens can report illegal dump sites with GPS photos, schedule bulky item pickups (furniture, electronics), and earn EcoRewards redeemable for airtime or utility credits.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    features: [
      "On-Demand Bulky Waste Scheduling",
      "GPS Photo Reporting of Illegal Dumps",
      "EcoRewards Loyalty Recycling Points",
      "Neighborhood Cleanup Event Coordination",
    ],
    metrics: "150,000+ Active Community Users",
  },
];
