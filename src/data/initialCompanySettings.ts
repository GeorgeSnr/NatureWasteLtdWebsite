import { AnnouncementBannerData, CompanySettings } from "@/types/admin";

export const initialAnnouncementBanner: AnnouncementBannerData = {
  enabled: true,
  message: "Kampala & Entebbe Road Service Notice: Scheduled Friday curbside collections remain on regular schedule. Download NatureWaste Connect on Android for live route GPS.",
  badge: "Operational Update",
  linkText: "Check Schedule",
  linkUrl: "/#schedule-finder",
  type: "info",
};

export const initialCompanySettings: CompanySettings = {
  companyName: "Nature Waste Management Limited",
  phonePrimary: "+256 766 532915",
  phoneCommercial: "+256 312 456 789",
  whatsappNumber: "+256 766 532915",
  emailPrimary: "info@naturewasteug.com",
  emailTenders: "tenders@naturewasteug.com",
  addressLine1: "Kitende, Karl House, Room 9",
  addressLine2: "Entebbe Road, Kampala, Uganda",
  hoursWeekday: "Monday – Friday: 7:00 AM – 6:00 PM",
  hoursSaturday: "Saturday: 8:00 AM – 3:00 PM",
  hoursSunday: "Sunday: Emergency Dispatch Only",
  nemaLicenseNumber: "NEMA Statutory Lic #WM/2024/098",
  statsTonnage: "120,000+ MT",
  statsHouseholds: "45,000+",
  statsPurity: "99.4%",
  statsFleet: "16 Compactor Units",
};
