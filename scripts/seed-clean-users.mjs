import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_0Cuofl6VKkhw@ep-still-salad-b5fenabt-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(connectionString);

async function seed() {
  console.log("Connecting to Neon PostgreSQL to seed clean clients and staff accounts...");

  // 1. Clean Users to Insert/Update
  const users = [
    // Staff & Administrators
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
      created_at: "2026-01-01T08:00:00Z",
      last_login: "2026-09-17T07:30:00Z",
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
      created_at: "2026-02-15T08:00:00Z",
      last_login: "2026-09-17T06:00:00Z",
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
      created_at: "2026-03-01T08:00:00Z",
      last_login: "2026-09-16T15:00:00Z",
    },

    // Clients
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
      created_at: "2026-06-15T10:00:00Z",
      last_login: "2026-09-17T08:15:00Z",
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
      created_at: "2026-07-20T11:30:00Z",
      last_login: "2026-09-16T14:40:00Z",
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
      created_at: "2026-08-01T09:00:00Z",
      last_login: "2026-09-15T16:20:00Z",
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
      created_at: "2026-08-25T14:00:00Z",
      last_login: "2026-09-14T10:10:00Z",
    },
  ];

  // Clear previous dummy users and insert clean users
  await sql`DELETE FROM users;`;
  console.log("✓ Cleared prior user records.");

  for (const u of users) {
    await sql`
      INSERT INTO users (
        id, name, email, phone, role, organization, suburb, address,
        plan, account_status, eco_points, assigned_bin_id,
        password_hash, mfa_enabled, latitude, longitude, location_address,
        created_at, last_login
      ) VALUES (
        ${u.id}, ${u.name}, ${u.email}, ${u.phone}, ${u.role}, ${u.organization}, ${u.suburb}, ${u.address},
        ${u.plan}, ${u.account_status}, ${u.eco_points}, ${u.assigned_bin_id},
        ${u.password_hash}, ${u.mfa_enabled}, ${u.latitude}, ${u.longitude}, ${u.location_address},
        ${u.created_at}, ${u.last_login}
      );
    `;
  }
  console.log(`✓ Inserted ${users.length} clean client and staff users.`);

  // Verify in Neon
  const verified = await sql`
    SELECT id, name, email, phone, role, password_hash, account_status, mfa_enabled
    FROM users
    ORDER BY role, id;
  `;
  console.table(verified);
}

seed().catch((err) => {
  console.error("Failed to seed:", err);
  process.exit(1);
});
