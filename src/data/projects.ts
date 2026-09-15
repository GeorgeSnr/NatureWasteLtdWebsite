export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  impact: string;
  description: string;
}

export const recentProjects: ProjectItem[] = [
  {
    id: "metro-smart-bins",
    title: "Greater Metropolitan Smart Bin Deployment",
    category: "Municipal",
    location: "Kampala Metropolitan Area",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    impact: "12,500 Smart Bins Online",
    description: "Equipped municipal street bins with solar IoT ultrasonic sensors, streamlining route collection and eliminating street overflow by 91%.",
  },
  {
    id: "lake-victoria-plastics",
    title: "Lake Victoria Shoreline Circular Plastics Recovery",
    category: "Environmental",
    location: "Entebbe & Jinja Basin",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
    impact: "3,200 MT Plastic Reclaimed",
    description: "Community recovery initiative collecting post-consumer PET bottles, pelletizing recycled flake for local packaging manufacturers.",
  },
  {
    id: "industrial-zero-waste",
    title: "EcoIndustrial Park Zero-Landfill Initiative",
    category: "Industrial",
    location: "Namanve Industrial Park",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    impact: "88% Waste Stream Diverted",
    description: "Integrated on-site compactors, organic anaerobic digestion, and cardboard recycling across 24 manufacturing plants.",
  },
  {
    id: "hospital-biohazard",
    title: "Regional Healthcare Safe Biohazard Management",
    category: "Healthcare",
    location: "Central Referral Hospitals",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    impact: "100% Certified Thermal Destruction",
    description: "Closed-loop hazardous medical waste collection, digital chain-of-custody tracking, and zero-leakage autoclave incineration.",
  },
  {
    id: "commercial-mall-compactors",
    title: "Oasis Mall & Retail Center High-Density Compaction",
    category: "Commercial",
    location: "CBD Commercial Hub",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    impact: "4x Volume Reduction",
    description: "Replaced open dumpster bays with hydraulic sealed compactors and odor neutralizing misting systems, reducing truck visits from 14/wk to 3/wk.",
  },
  {
    id: "green-estate-compost",
    title: "Lakeside Residential Organic Composting & Biogas",
    category: "Residential",
    location: "Lubowa Estate & Environs",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    impact: "450 MT Organic Compost Generated",
    description: "Source-segregated organic food waste transformed into premium bio-fertilizer and clean methane gas for local landscaping.",
  },
];
