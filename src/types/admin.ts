import { SuburbCoverage } from "@/data/ugandaCoverage";
import { PricingPlan } from "@/data/pricingPlans";
import { ServiceCategory } from "@/data/wasteServices";
import { BlogPost } from "@/data/blogPosts";
import { TestimonialItem } from "@/data/testimonials";
import { ProjectItem } from "@/data/projects";

export type RequestType =
  | "residential_inquiry"
  | "commercial_inquiry"
  | "dumpster_rental"
  | "missed_pickup"
  | "demo_booking"
  | "trial_registration"
  | "on_demand_pickup"
  | "supplies_order"
  | "general_contact";

export type RequestStatus = "new" | "in_review" | "in_progress" | "resolved" | "archived";

export type RequestPriority = "normal" | "high" | "urgent";

export interface ClientRequest {
  id: string;
  type: RequestType;
  title: string;
  name: string;
  phone: string;
  email?: string;
  organization?: string;
  suburb?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  locationAddress?: string;
  volumeOrTier?: string;
  preferredDate?: string;
  message?: string;
  status: RequestStatus;
  priority: RequestPriority;
  createdAt: string;
  updatedAt?: string;
  assignedTo?: string;
  notes?: {
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }[];
}

export type UserRole = "client" | "admin" | "dispatcher" | "compliance";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  organization?: string;
  suburb?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  locationAddress?: string;
  plan?: string;
  accountStatus: "active" | "pending" | "suspended";
  ecoPoints?: number;
  assignedBinId?: string;
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
}

export interface AnnouncementBannerData {
  enabled: boolean;
  message: string;
  badge?: string;
  linkText?: string;
  linkUrl?: string;
  type: "info" | "warning" | "success" | "emergency";
}

export interface CompanySettings {
  companyName: string;
  phonePrimary: string;
  phoneCommercial: string;
  whatsappNumber: string;
  emailPrimary: string;
  emailTenders: string;
  addressLine1: string;
  addressLine2: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  nemaLicenseNumber: string;
  statsTonnage: string;
  statsHouseholds: string;
  statsPurity: string;
  statsFleet: string;
}

export interface WebsiteDataStore {
  announcement: AnnouncementBannerData;
  companySettings: CompanySettings;
  coverageAreas: SuburbCoverage[];
  pricingPlans: PricingPlan[];
  wasteServices: ServiceCategory[];
  blogPosts: BlogPost[];
  testimonials: TestimonialItem[];
  recentProjects: ProjectItem[];
  requests: ClientRequest[];
  users: UserProfile[];
}
