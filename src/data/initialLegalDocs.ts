import { LegalDocument } from "@/types/legal";

export const initialPrivacyPolicy: LegalDocument = {
  id: "privacy_policy",
  title: "Nature Waste Management Ltd – Privacy Policy",
  lastUpdated: "September 17, 2026",
  summary:
    "How Nature Waste Management Ltd collects, uses, and safeguards personal and property information from residential clients, commercial partners, and portal users in Uganda under the Data Protection and Privacy Act (2019).",
  sections: [
    {
      id: "scope",
      heading: "1. Scope & Data Controller",
      content:
        "This Privacy Policy outlines how Nature Waste Management Ltd (referred to as 'Nature Waste', 'we', 'us', or 'our'), registered under NEMA Uganda licensing with operating headquarters at Karl House, Room 9, Kitende, Entebbe Road, Kampala, collects and processes your information when using our public website, mobile portal, and curbside collection services.",
    },
    {
      id: "collection",
      heading: "2. Information We Collect",
      content:
        "We collect information essential to providing reliable waste management and recycling services:\n\n• Personal & Contact Information: Full name, email address, phone number (used for dispatch alerts and Mobile Money payments), and company or estate name.\n• Premises Gate GPS Location: Precise latitude and longitude coordinates provided by clients to direct compactor drivers to the exact property gate in Kampala, Wakiso, and Entebbe corridors.\n• Service & Telemetry Data: Bin capacities (120L, 240L wheelie bins, 7m³–20m³ skips), collection frequency, waste segregation categories, and fill-level alerts.\n• Billing & Transaction History: Invoicing records, Mobile Money transaction identifiers, and EcoRewards points earned.",
    },
    {
      id: "usage",
      heading: "3. How We Use Your Information",
      content:
        "Your data is used strictly for legitimate operational purposes:\n\n• Scheduling curbside garbage collection, dumpster drop-offs, and emergency bulk pickups.\n• Real-time dispatch optimization for our compactor truck fleet.\n• Processing monthly service payments and mobile invoicing (MTN Mobile Money, Airtel Money, Bank Transfer).\n• Calculating EcoRewards recycling credits redeemable for bill deductions.\n• Fulfilling regulatory waste manifest reporting mandated by the National Environment Management Authority (NEMA) Uganda.\n\nWe do not sell, lease, or distribute your personal data to commercial third parties or advertisers.",
    },
    {
      id: "gps",
      heading: "4. Premises Gate GPS & Location Data",
      content:
        "Due to non-standard street addressing in certain areas of Wakiso and Kampala, Nature Waste Connect utilizes browser geolocation to pin your collection gate. This location is stored in encrypted databases and made available strictly to authorized dispatchers and assigned route drivers. You may modify or delete your GPS coordinates anytime via your Client Portal account.",
    },
    {
      id: "security",
      heading: "5. Security, MFA & Access Controls",
      content:
        "All data is transmitted via TLS encryption and stored in secure cloud infrastructure (Neon PostgreSQL). System operators, dispatchers, and administrators access records through mandatory Multi-Factor Authentication (MFA). Accounts can be deactivated instantly by administrators upon security review.",
    },
    {
      id: "rights",
      heading: "6. Your Rights Under Ugandan Law",
      content:
        "Under the Uganda Data Protection and Privacy Act, 2019, you retain the right to:\n\n• Access and review personal data held by Nature Waste.\n• Request correction of obsolete or erroneous addresses and contact numbers.\n• Request erasure of your account upon termination of waste handling contracts, subject to statutory environmental record-keeping obligations.",
    },
    {
      id: "contact",
      heading: "7. Contact Data Protection Officer",
      content:
        "For questions regarding your data privacy or to exercise statutory rights, contact:\n\n• Email: privacy@naturewaste.ug / dispatch@naturewaste.ug\n• Phone Hotline: +256 766 532915\n• Office: Karl House, Room 9, Entebbe Road, Kitende, Uganda.",
    },
  ],
};

export const initialTermsConditions: LegalDocument = {
  id: "terms_and_conditions",
  title: "Nature Waste Management Ltd – Terms & Conditions of Service",
  lastUpdated: "September 17, 2026",
  summary:
    "Contractual terms and conditions governing residential garbage collection, commercial dumpster rentals, industrial recycling, and online portal services across Uganda.",
  sections: [
    {
      id: "agreement",
      heading: "1. Agreement to Terms",
      content:
        "By accessing the Nature Waste Connect portal or contracting our residential, commercial, or industrial waste management services, you agree to be bound by these Terms and Conditions and all applicable regulations enforced by NEMA Uganda and local municipal councils.",
    },
    {
      id: "pricing_policy",
      heading: "2. Free Portal Access & Transparent Service Pricing",
      content:
        "Account creation and ongoing access to the Nature Waste Client Portal are 100% free of charge. We do not charge subscription fees or trial fees for using our digital management portal. Clients only pay for actual physical waste services rendered—such as scheduled curbside bin pickups, skip container leasing, bulk waste hauling, or NEMA ESG compliance certification.",
    },
    {
      id: "collection_duties",
      heading: "3. Curbside Collection & Container Placement",
      content:
        "• Pickup Days: Clients must place color-coded wheelie bins or heavy-duty sacks outside their compound gate by 6:00 AM on scheduled collection mornings.\n• Access: Clear vehicular access must be maintained for compactor trucks. If gates are locked or routes blocked, pickup will be rescheduled for the next route rotation.\n• Overfilled Containers: Waste must fit within container lids. Lids must close flush to prevent littering and pest attraction.",
    },
    {
      id: "prohibited_waste",
      heading: "4. Acceptable Waste & Prohibited Hazardous Materials",
      content:
        "Standard residential and commercial containers accept non-hazardous municipal solid waste, food organics, clean paper, plastic packaging, and dry cardboard.\n\nStrictly Prohibited in Standard Bins:\n• Raw industrial chemicals, strong acids, radioactive compounds.\n• Untreated infectious clinical waste (must use our Specialized Clinical Autoclave Stream).\n• Uncontained explosives, automotive batteries, and flammable solvents.\n\nDischarging hazardous waste into regular containers violates NEMA statutory regulations and constitutes grounds for immediate contract termination.",
    },
    {
      id: "billing_payment",
      heading: "5. Billing, Invoicing & Mobile Money Payments",
      content:
        "• Residential accounts are invoiced monthly on a prepaid or postpaid cycle as agreed in the service tier.\n• Commercial roll-off skips are billed per-haul or per monthly rental contract.\n• Payments are accepted securely via MTN Mobile Money, Airtel Money, direct electronic bank transfer, or portal checkout.\n• Invoices unpaid beyond 30 days from due date may trigger temporary collection suspension until balances are settled.",
    },
    {
      id: "container_care",
      heading: "6. Container Ownership & Maintenance",
      content:
        "Wheelie bins (120L, 240L) and industrial roll-off skips supplied by Nature Waste remain the property of the company unless purchased outright. Clients are responsible for maintaining reasonable care. In case of theft, fire, or accidental damage, clients must notify dispatch promptly via the portal.",
    },
    {
      id: "governing_law",
      heading: "7. Governing Law & Environmental Jurisdiction",
      content:
        "These terms are governed by the laws of the Republic of Uganda, including the National Environment Act 2019 and relevant Kampala Capital City Authority (KCCA) and Wakiso District Local Government by-laws. Any disputes shall be resolved through amicable mediation before recourse to the Courts of Uganda.",
    },
  ],
};
