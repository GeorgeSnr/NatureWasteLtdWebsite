import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_0Cuofl6VKkhw@ep-still-salad-b5fenabt-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(connectionString);

async function init() {
  console.log("Connecting to Neon PostgreSQL...");

  // 1. Create Users Table
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(64) NOT NULL,
      role VARCHAR(32) NOT NULL DEFAULT 'client',
      organization VARCHAR(255),
      suburb VARCHAR(128),
      address TEXT,
      plan VARCHAR(128),
      account_status VARCHAR(32) NOT NULL DEFAULT 'active',
      eco_points INTEGER DEFAULT 150,
      assigned_bin_id VARCHAR(64),
      latitude DOUBLE PRECISION,
      longitude DOUBLE PRECISION,
      location_address TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table 'users' verified/created.");

  // 2. Create Client Requests Table
  await sql`
    CREATE TABLE IF NOT EXISTS client_requests (
      id VARCHAR(64) PRIMARY KEY,
      type VARCHAR(64) NOT NULL,
      title VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(64) NOT NULL,
      email VARCHAR(255),
      organization VARCHAR(255),
      suburb VARCHAR(128),
      address TEXT,
      latitude DOUBLE PRECISION,
      longitude DOUBLE PRECISION,
      location_address TEXT,
      volume_or_tier VARCHAR(128),
      preferred_date VARCHAR(64),
      message TEXT,
      status VARCHAR(32) NOT NULL DEFAULT 'new',
      priority VARCHAR(32) NOT NULL DEFAULT 'normal',
      assigned_to VARCHAR(128),
      notes JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table 'client_requests' verified/created.");

  // 3. Create Announcement Banner Table
  await sql`
    CREATE TABLE IF NOT EXISTS announcement_banner (
      id VARCHAR(32) PRIMARY KEY DEFAULT 'current',
      enabled BOOLEAN NOT NULL DEFAULT true,
      message TEXT NOT NULL,
      badge VARCHAR(64) DEFAULT 'Notice',
      link_text VARCHAR(128),
      link_url VARCHAR(255),
      type VARCHAR(32) NOT NULL DEFAULT 'info',
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table 'announcement_banner' verified/created.");

  // 4. Create Company Settings Table
  await sql`
    CREATE TABLE IF NOT EXISTS company_settings (
      id VARCHAR(32) PRIMARY KEY DEFAULT 'main',
      company_name VARCHAR(255) NOT NULL DEFAULT 'Nature Waste Management Ltd',
      phone_primary VARCHAR(64) NOT NULL,
      phone_commercial VARCHAR(64) NOT NULL,
      whatsapp_number VARCHAR(64) NOT NULL,
      email_primary VARCHAR(255) NOT NULL,
      email_tenders VARCHAR(255) NOT NULL,
      address_line1 VARCHAR(255) NOT NULL,
      address_line2 VARCHAR(255) NOT NULL,
      hours_weekday VARCHAR(128) NOT NULL,
      hours_saturday VARCHAR(128) NOT NULL,
      hours_sunday VARCHAR(128) NOT NULL,
      nema_license_number VARCHAR(128) NOT NULL,
      stats_tonnage VARCHAR(64) NOT NULL,
      stats_households VARCHAR(64) NOT NULL,
      stats_purity VARCHAR(64) NOT NULL,
      stats_fleet VARCHAR(64) NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ Table 'company_settings' verified/created.");

  // 5. Seed Users
  const seedUsers = [
    {
      id: "USR-S-001",
      name: "Geoffrey Magezi",
      email: "geoffrey@naturewasteug.com",
      phone: "+256 766 532915",
      role: "admin",
      organization: "Nature Waste Management Ltd HQ",
      suburb: "Kitende",
      address: "Karl House, Room 9, Entebbe Road, Kampala",
      plan: "Operations Executive & SuperAdmin",
      account_status: "active",
      eco_points: 0,
      assigned_bin_id: null,
      password_hash: "Admin#Magezi2026!NW",
      mfa_enabled: false,
      latitude: 0.2215,
      longitude: 32.5342,
      location_address: "Karl House, Room 9, Kitende, Kampala",
    },
    {
      id: "USR-S-002",
      name: "Simon Ssekitoleko",
      email: "dispatch@naturewasteug.com",
      phone: "+256 700 890124",
      role: "dispatcher",
      organization: "Nature Waste Fleet Operations",
      suburb: "Kajjansi",
      address: "Entebbe Highway Junction Depot, Kajjansi",
      plan: "Fleet Dispatch & Route Supervisor",
      account_status: "active",
      eco_points: 0,
      assigned_bin_id: null,
      password_hash: "Fleet#Simon2026*Op",
      mfa_enabled: false,
      latitude: 0.2105,
      longitude: 32.5284,
      location_address: "Kajjansi Junction Fleet Depot, Entebbe Road",
    },
    {
      id: "USR-S-003",
      name: "Brenda Katusabe",
      email: "compliance@naturewasteug.com",
      phone: "+256 700 890125",
      role: "compliance",
      organization: "NEMA Statutory Audit Desk",
      suburb: "Central Kampala",
      address: "Plot 42, Jinja Road, Kampala",
      plan: "NEMA Compliance & Manifest Desk",
      account_status: "active",
      eco_points: 0,
      assigned_bin_id: null,
      password_hash: "NEMA#Audit2026$Bk",
      mfa_enabled: false,
      latitude: 0.3136,
      longitude: 32.5811,
      location_address: "Central Referral Division, Jinja Road",
    },
    {
      id: "USR-C-101",
      name: "Eng. David Mukasa",
      email: "david.mukasa@ubl-logistics.ug",
      phone: "+256 772 458921",
      role: "client",
      organization: "Uganda Breweries Logistics Hub",
      suburb: "Namanve",
      address: "Plot 18, Industrial Estate Road, Namanve",
      plan: "Commercial Skip Service (1100L Skip)",
      account_status: "active",
      eco_points: 1450,
      assigned_bin_id: "BIN-COMM-101",
      password_hash: "Client#DavidUBL2026",
      mfa_enabled: false,
      latitude: 0.3542,
      longitude: 32.6914,
      location_address: "Block C, Namanve Industrial Estate, Mukono",
    },
    {
      id: "USR-C-102",
      name: "Sarah Nalubega",
      email: "sarah.nalubega@gmail.com",
      phone: "+256 782 314567",
      role: "client",
      organization: "Private Residence",
      suburb: "Lubowa",
      address: "Plot 24, Sunset Avenue, Lubowa Hill",
      plan: "Residential Connect (240L Wheelie Bin)",
      account_status: "active",
      eco_points: 380,
      assigned_bin_id: "BIN-RES-102",
      password_hash: "Client#SarahLubowa26",
      mfa_enabled: false,
      latitude: 0.2528,
      longitude: 32.5621,
      location_address: "Sunset Avenue, Lubowa Hill, Wakiso",
    },
    {
      id: "USR-C-103",
      name: "Patrick Mugerwa",
      email: "pmugerwa@spekeresort.ug",
      phone: "+256 754 112233",
      role: "client",
      organization: "Speke Resort Convention Centre",
      suburb: "Munyonyo",
      address: "Wavamunno Road, Munyonyo, Kampala",
      plan: "Municipal & Industrial Enterprise",
      account_status: "active",
      eco_points: 920,
      assigned_bin_id: "BIN-CORP-103",
      password_hash: "Client#PatrickSpeke26",
      mfa_enabled: false,
      latitude: 0.2398,
      longitude: 32.6205,
      location_address: "Speke Resort Frontage, Munyonyo, Kampala",
    },
    {
      id: "USR-C-104",
      name: "Arthur Kasirye",
      email: "akasirye@gmail.com",
      phone: "+256 701 445566",
      role: "client",
      organization: "Private Household",
      suburb: "Kitende",
      address: "Karl House Enclave, Kitende",
      plan: "Residential Connect (120L Wheelie Bin)",
      account_status: "active",
      eco_points: 210,
      assigned_bin_id: "BIN-RES-104",
      password_hash: "Client#ArthurKitende26",
      mfa_enabled: false,
      latitude: 0.2189,
      longitude: 32.5314,
      location_address: "Karl House Enclave, Kitende, Entebbe Road",
    },
  ];

  for (const u of seedUsers) {
    await sql`
      INSERT INTO users (
        id, name, email, phone, role, organization, suburb, address, plan, account_status, eco_points, assigned_bin_id, latitude, longitude, location_address, password_hash, mfa_enabled
      ) VALUES (
        ${u.id}, ${u.name}, ${u.email}, ${u.phone}, ${u.role}, ${u.organization}, ${u.suburb}, ${u.address}, ${u.plan}, ${u.account_status}, ${u.eco_points}, ${u.assigned_bin_id || null}, ${u.latitude}, ${u.longitude}, ${u.location_address}, ${u.password_hash}, ${u.mfa_enabled}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        password_hash = EXCLUDED.password_hash,
        mfa_enabled = EXCLUDED.mfa_enabled,
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude,
        location_address = EXCLUDED.location_address;
    `;
  }
  console.log(`✓ Seeded ${seedUsers.length} users into Neon.`);

  // 6. Seed Client Requests
  const seedRequests = [
    {
      id: "REQ-2026-001",
      type: "missed_pickup",
      title: "Missed Residential Curbside Collection",
      name: "Dr. Sarah Namutebi",
      phone: "+256 772 341 890",
      email: "sarah.namutebi@gmail.com",
      organization: "Private Household",
      suburb: "Kitende",
      address: "Plot 14, Hilltop Close, Kitende (Behind Karl House)",
      latitude: 0.2224,
      longitude: 32.5361,
      location_address: "Hilltop Close, Kitende, off Entebbe Road",
      volume_or_tier: "Residential 240L Wheelie Bin",
      preferred_date: "2026-09-17",
      message: "Our 240L wheelie bin was not emptied during the Tuesday morning round. Kindly arrange a quick recovery sweep.",
      status: "new",
      priority: "urgent",
      assigned_to: "Kitende Route Supervisor",
      notes: JSON.stringify([
        {
          id: "n-1",
          author: "System Dispatch Bot",
          content: "GPS Coordinates verified. Routed to Kitende Compactor 01.",
          createdAt: "2026-09-17T08:31:00Z",
        },
      ]),
    },
    {
      id: "REQ-2026-002",
      type: "dumpster_rental",
      title: "12m³ Construction Roll-Off Skip Rental",
      name: "Eng. Ronald Ssemwogerere",
      phone: "+256 701 992 455",
      email: "ronald@apexconstruct.ug",
      organization: "Apex Construction Limited",
      suburb: "Lubowa",
      address: "Victoria View Estates, Gate 3, Lubowa",
      latitude: 0.2541,
      longitude: 32.5645,
      location_address: "Victoria View Estates Gate 3, Lubowa Hill",
      volume_or_tier: "12 Cubic Meter Heavy Duty Skip",
      preferred_date: "2026-09-19",
      message: "Renovating a commercial duplex. Need a 12m³ roll-off skip dropped off on Friday morning for brick rubble, timber, and packing crates.",
      status: "in_review",
      priority: "high",
      assigned_to: "Fleet Dispatch Lead",
      notes: JSON.stringify([
        {
          id: "n-2",
          author: "Admin Geoffrey",
          content: "Site access verified for 14-ton hook-lift truck. Quoted UGX 650,000 all-inclusive.",
          createdAt: "2026-09-16T17:00:00Z",
        },
      ]),
    },
    {
      id: "REQ-2026-003",
      type: "on_demand_pickup",
      title: "On-Demand Bulky Electronics & White Goods",
      name: "Beatrice Akello",
      phone: "+256 782 109 432",
      email: "beatrice.akello@spekehotel.com",
      organization: "Speke Resort & Conference Centre",
      suburb: "Entebbe",
      address: "Plot 88, Lake Victoria Crescent, Entebbe",
      latitude: 0.0512,
      longitude: 32.4635,
      location_address: "Lake Victoria Crescent, Entebbe Municipality",
      volume_or_tier: "Bulky Cardboard & E-Waste",
      preferred_date: "2026-09-18",
      message: "Replacing 40 hotel room mini-refrigerators and air conditioning units. Need official NEMA certified e-waste transfer manifest.",
      status: "in_progress",
      priority: "high",
      assigned_to: "NEMA Compliance Team",
      notes: JSON.stringify([
        {
          id: "n-3",
          author: "NEMA Lead",
          content: "Hazardous refrigerant gases certified. Manifest #NEMA-EW-2026-88 issued.",
          createdAt: "2026-09-17T09:00:00Z",
        },
      ]),
    },
    {
      id: "REQ-2026-004",
      type: "supplies_order",
      title: "Zero-Waste Color-Coded Recycling Sacks (30 Pack)",
      name: "David Tumuhimbise",
      phone: "+256 752 881 902",
      email: "david.t@gmail.com",
      organization: "Private Household",
      suburb: "Kajjansi",
      address: "Clays Junction Road, Plot 5",
      latitude: 0.2144,
      longitude: 32.5281,
      location_address: "Clays Junction Road, Kajjansi",
      volume_or_tier: "Color-Coded Sacks (Blue/Yellow/Green)",
      preferred_date: "2026-09-18",
      message: "Need 10 Blue (plastics), 10 Yellow (paper), and 10 Green (biodegradables) sacks for our residential compound.",
      status: "resolved",
      priority: "normal",
      assigned_to: "Logistics Store Lead",
      notes: JSON.stringify([]),
    },
    {
      id: "REQ-2026-005",
      type: "commercial_inquiry",
      title: "Daily Compactor Waste Management Tender",
      name: "Patricia Kyomugisha",
      phone: "+256 703 112 334",
      email: "patricia.k@centurycinemas.ug",
      organization: "Century Cinemax Acacia Mall",
      suburb: "Kololo",
      address: "Plot 14-18, Acacia Avenue, Kololo",
      latitude: 0.3341,
      longitude: 32.5892,
      location_address: "Acacia Mall Loading Dock, Kololo, Kampala",
      volume_or_tier: "Commercial Daily Compactor Collection",
      preferred_date: "2026-09-22",
      message: "Seeking annual contract for 7-days-a-week night pickup of food court, cinema beverage cups, and packaging waste.",
      status: "new",
      priority: "high",
      assigned_to: "Commercial Sales Manager",
      notes: JSON.stringify([]),
    },
  ];

  for (const r of seedRequests) {
    await sql`
      INSERT INTO client_requests (
        id, type, title, name, phone, email, organization, suburb, address, latitude, longitude, location_address, volume_or_tier, preferred_date, message, status, priority, assigned_to, notes
      ) VALUES (
        ${r.id}, ${r.type}, ${r.title}, ${r.name}, ${r.phone}, ${r.email}, ${r.organization}, ${r.suburb}, ${r.address}, ${r.latitude}, ${r.longitude}, ${r.location_address}, ${r.volume_or_tier}, ${r.preferred_date}, ${r.message}, ${r.status}, ${r.priority}, ${r.assigned_to}, ${r.notes}::jsonb
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        status = EXCLUDED.status,
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude,
        location_address = EXCLUDED.location_address;
    `;
  }
  console.log(`✓ Seeded ${seedRequests.length} client requests into Neon.`);

  // 7. Seed Announcement Banner
  await sql`
    INSERT INTO announcement_banner (
      id, enabled, message, badge, link_text, link_url, type
    ) VALUES (
      'current', true, 'Public Notice: Kitende, Lubowa & Kajjansi corridor collections proceed as scheduled. Same-day emergency dumpster drops available.', 'Notice', 'View Pickup Schedule', '/#schedule-finder', 'info'
    )
    ON CONFLICT (id) DO UPDATE SET
      message = EXCLUDED.message,
      badge = EXCLUDED.badge;
  `;
  console.log("✓ Seeded announcement banner into Neon.");

  // 8. Seed Company Settings
  await sql`
    INSERT INTO company_settings (
      id, company_name, phone_primary, phone_commercial, whatsapp_number, email_primary, email_tenders, address_line1, address_line2, hours_weekday, hours_saturday, hours_sunday, nema_license_number, stats_tonnage, stats_households, stats_purity, stats_fleet
    ) VALUES (
      'main', 'Nature Waste Management Ltd', '+256 766 532915', '+256 700 488477', '+256 766 532915', 'info@naturewaste.ug', 'tenders@naturewaste.ug', 'Kitende, Karl House, Room 9', 'Entebbe Road, Kampala, Uganda', '07:00 AM – 06:00 PM', '08:00 AM – 04:00 PM', 'Emergency Dispatch On-Call (24/7)', 'NEMA/WM/2024/098', '14,800+ MT', '8,400+', '94.2%', '16 Trucks'
    )
    ON CONFLICT (id) DO UPDATE SET
      company_name = EXCLUDED.company_name,
      phone_primary = EXCLUDED.phone_primary;
  `;
  console.log("✓ Seeded company settings into Neon.");

  // Verify counts
  const usersCount = await sql`SELECT count(*) FROM users`;
  const reqsCount = await sql`SELECT count(*) FROM client_requests`;
  console.log(`\nVerification successful:`);
  console.log(`- Total Users in Neon: ${usersCount[0].count}`);
  console.log(`- Total Client Requests in Neon: ${reqsCount[0].count}`);
  console.log("\nNeon PostgreSQL database initialized and seeded successfully!");
}

init().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
