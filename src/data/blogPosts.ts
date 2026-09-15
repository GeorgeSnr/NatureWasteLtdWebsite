export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "gogreenug-youth-waste-solutions-kampala",
    title: "The GoGreenug Initiative: How Youth Environmentalists are Tackling Kampala's Suburban Waste Crisis",
    excerpt: "Learn how Nature Waste Management Limited was founded by Ugandan youth environmentalists to implement selective waste collection across Kampala's fast-growing suburbs.",
    date: "September 14, 2026",
    author: "Nature Waste Leadership Team",
    category: "Community & Policy",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    content: `In response to the rapid accumulation of unmanaged municipal solid waste across Kampala's expanding peri-urban suburbs, a dedicated group of Ugandan youth environmentalists came together to form Nature Waste Management Limited.

Operating from Kitende on Entebbe Road, Nature Waste Management Limited operates under full regulatory licensing from the National Environment Management Authority (NEMA) Uganda. Rather than relying on outdated dumping methods that clog wetlands and drainage channels, the company pioneers selective collection.

Waste Streams Handled Selectively:
1. Post-Consumer Plastics (PET beverage bottles, HDPE jerrycans, and LDPE films)
2. Scrap Metals and Aluminum Cans
3. Waste Paper, Cardboard boxes, and Office Documents
4. Biodegradable Animal and Plant Waste for Organic Composting and Bio-fertilizers

By pairing community sensitization campaigns with reliable collection schedules, the GoGreenug movement has empowered over 45,000 households and businesses to actively participate in Uganda's Vision 2040 sustainable urban growth.`,
  },
  {
    slug: "iot-smart-waste-collection-african-cities",
    title: "How IoT Smart Sensors are Solving Urban Waste Backlogs in Fast-Growing Cities",
    excerpt: "Discover how deploying ultrasonic fill-level sensors on municipal bins reduces empty truck runs by 35% while keeping urban neighborhoods clean and pest-free.",
    date: "September 12, 2026",
    author: "Nature Waste Research Team",
    category: "Smart Cities",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    content: `Urban centers across East Africa are undergoing unprecedented population growth. Traditional fixed-schedule waste collection often leads to trucks collecting half-empty bins on one street while bins on the next avenue overflow for days.

With Nature Waste Connect's IoT ultrasonic sensors installed in bin lids, sanitation teams receive real-time telemetry on exact fill percentages. When bins reach 80% capacity, automated dispatch queues assign dynamic routing to the closest compactor truck.

Key Results Achieved:
1. 35% reduction in fleet diesel consumption
2. 91% reduction in roadside overflowing dumpsters
3. Real-time municipal supervisor dashboards tracking truck GPS and collection timestamps
4. Citizen satisfaction ratings climbed from 42% to 94% within 6 months of rollout.`,
  },
  {
    slug: "circular-economy-plastics-recovery-guide",
    title: "The Circular Economy in Practice: Turning Post-Consumer Plastics into High-Grade Resins",
    excerpt: "A deep dive into how modern Material Recovery Facilities (MRFs) sort, wash, and pelletize PET and HDPE waste into circular raw materials for regional manufacturers.",
    date: "August 28, 2026",
    author: "Eng. Samuel K., Chief Metallurgist & Materials Scientist",
    category: "Recycling",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1000&q=80",
    content: `Plastic waste does not have to be an environmental crisis—it is an untapped industrial feedstock. In this whitepaper, Nature Waste Management Ltd outlines the technical workflow inside our advanced sorting facility.

By implementing optical sorting and automated baling, we achieve 99.4% polymer purity across clear PET, amber bottles, and rigid HDPE containers. Local packaging companies purchase our recycled resin pellets at a 25% cost saving compared to imported virgin plastics, keeping wealth within the community and preventing marine pollution.`,
  },
  {
    slug: "esg-compliance-hazardous-waste-manifests",
    title: "Automating ESG Compliance & Hazardous Waste Chain-of-Custody for Manufacturing",
    excerpt: "Why corporate ESG disclosure mandates now require tamper-evident digital tracking for toxic sludges, chemical residues, and clinical waste streams.",
    date: "August 14, 2026",
    author: "Brenda Katusabe, Environmental Law & Compliance Lead",
    category: "Regulatory & ESG",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80",
    content: `With global supply chain audits and institutional investors demanding verifiable environmental governance, industrial operators can no longer rely on paper manifests that get lost or misfiled.

Nature Waste Connect provides cryptographically verifiable waste disposal certificates. Each batch of hazardous, chemical, or medical waste is tagged with a unique QR identifier that records weight, vehicle GPS trail, licensed driver identity, and certified thermal destruction temperature at our high-temperature incineration facility.`,
  },
];
