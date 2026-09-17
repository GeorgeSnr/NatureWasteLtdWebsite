export interface LegalSection {
  id: string;
  heading: string;
  content: string;
}

export interface LegalDocument {
  id: "privacy_policy" | "terms_and_conditions";
  title: string;
  lastUpdated: string;
  summary: string;
  sections: LegalSection[];
  updatedAt?: string;
}
