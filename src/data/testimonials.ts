export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  content: string;
  rating: number;
}

export const testimonials: TestimonialItem[] = [
  {
    id: "1",
    name: "Eng. Arthur Byaruhanga",
    role: "Director of Public Health & Environment",
    organization: "Metropolitan Urban Council",
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=300&q=80",
    content: "Nature Waste Connect revolutionized our city's collection logistics. The IoT fill sensors alone eliminated street overflow hotspots and saved our sanitation fleet 40% in weekly fuel costs.",
    rating: 5,
  },
  {
    id: "2",
    name: "Beatrice Namuli",
    role: "Head of ESG & Sustainability",
    organization: "East African Breweries Logistics",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    content: "Meeting our Zero-Waste-to-Landfill mandate was a massive headache before Nature Waste Management Ltd stepped in. Their automated weighbridge audit logs provide verified data for our annual sustainability report.",
    rating: 5,
  },
  {
    id: "3",
    name: "Dr. Patrick Omondi",
    role: "Chief Medical Operations Officer",
    organization: "Nile Health Group",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
    content: "Handling infectious medical waste requires strict chain-of-custody. Nature Waste Connect generates cryptographic manifests from hospital bin pickup all the way through high-temp incineration with zero compliance incidents.",
    rating: 5,
  },
  {
    id: "4",
    name: "Grace Kigozi",
    role: "Estate Property Director",
    organization: "Victoria Heights Residences",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
    content: "Our 800+ homeowners love the resident app. Scheduling bulky cardboard and garden waste pickups takes 10 seconds, and our communal waste bays are spotless and odor-free 365 days a year.",
    rating: 5,
  },
];
