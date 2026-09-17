import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET /api/announcement
export async function GET() {
  try {
    const rows = await sql`
      SELECT id, enabled, message, badge, link_text as "linkText", link_url as "linkUrl", type
      FROM announcement_banner
      WHERE id = 'current'
      LIMIT 1;
    `;
    if (rows.length === 0) {
      return NextResponse.json({ success: true, announcement: null });
    }
    return NextResponse.json({ success: true, announcement: rows[0] });
  } catch (error: any) {
    console.error("Error fetching announcement:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/announcement
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await sql`
      INSERT INTO announcement_banner (
        id, enabled, message, badge, link_text, link_url, type, updated_at
      ) VALUES (
        'current',
        ${body.enabled ?? true},
        ${body.message || ""},
        ${body.badge || "Notice"},
        ${body.linkText || null},
        ${body.linkUrl || null},
        ${body.type || "info"},
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (id) DO UPDATE SET
        enabled = EXCLUDED.enabled,
        message = EXCLUDED.message,
        badge = EXCLUDED.badge,
        link_text = EXCLUDED.link_text,
        link_url = EXCLUDED.link_url,
        type = EXCLUDED.type,
        updated_at = CURRENT_TIMESTAMP;
    `;
    return NextResponse.json({ success: true, message: "Announcement updated in Neon" });
  } catch (error: any) {
    console.error("Error updating announcement:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
