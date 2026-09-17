import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET /api/settings
export async function GET() {
  try {
    const rows = await sql`
      SELECT 
        company_name as "companyName",
        phone_primary as "phonePrimary",
        phone_commercial as "phoneCommercial",
        whatsapp_number as "whatsappNumber",
        email_primary as "emailPrimary",
        email_tenders as "emailTenders",
        address_line1 as "addressLine1",
        address_line2 as "addressLine2",
        hours_weekday as "hoursWeekday",
        hours_saturday as "hoursSaturday",
        hours_sunday as "hoursSunday",
        nema_license_number as "nemaLicenseNumber",
        stats_tonnage as "statsTonnage",
        stats_households as "statsHouseholds",
        stats_purity as "statsPurity",
        stats_fleet as "statsFleet"
      FROM company_settings
      WHERE id = 'main'
      LIMIT 1;
    `;
    if (rows.length === 0) {
      return NextResponse.json({ success: true, settings: null });
    }
    return NextResponse.json({ success: true, settings: rows[0] });
  } catch (error: any) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/settings
export async function POST(req: Request) {
  try {
    const s = await req.json();
    await sql`
      INSERT INTO company_settings (
        id, company_name, phone_primary, phone_commercial, whatsapp_number, email_primary, email_tenders, address_line1, address_line2, hours_weekday, hours_saturday, hours_sunday, nema_license_number, stats_tonnage, stats_households, stats_purity, stats_fleet, updated_at
      ) VALUES (
        'main', ${s.companyName}, ${s.phonePrimary}, ${s.phoneCommercial}, ${s.whatsappNumber}, ${s.emailPrimary}, ${s.emailTenders}, ${s.addressLine1}, ${s.addressLine2}, ${s.hoursWeekday}, ${s.hoursSaturday}, ${s.hoursSunday}, ${s.nemaLicenseNumber}, ${s.statsTonnage}, ${s.statsHouseholds}, ${s.statsPurity}, ${s.statsFleet}, CURRENT_TIMESTAMP
      )
      ON CONFLICT (id) DO UPDATE SET
        company_name = EXCLUDED.company_name,
        phone_primary = EXCLUDED.phone_primary,
        phone_commercial = EXCLUDED.phone_commercial,
        whatsapp_number = EXCLUDED.whatsapp_number,
        email_primary = EXCLUDED.email_primary,
        email_tenders = EXCLUDED.email_tenders,
        address_line1 = EXCLUDED.address_line1,
        address_line2 = EXCLUDED.address_line2,
        hours_weekday = EXCLUDED.hours_weekday,
        hours_saturday = EXCLUDED.hours_saturday,
        hours_sunday = EXCLUDED.hours_sunday,
        nema_license_number = EXCLUDED.nema_license_number,
        stats_tonnage = EXCLUDED.stats_tonnage,
        stats_households = EXCLUDED.stats_households,
        stats_purity = EXCLUDED.stats_purity,
        stats_fleet = EXCLUDED.stats_fleet,
        updated_at = CURRENT_TIMESTAMP;
    `;
    return NextResponse.json({ success: true, message: "Settings updated in Neon" });
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
