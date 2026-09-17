import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { ClientRequest } from "@/types/admin";

// GET /api/requests - Fetch all requests from Neon
export async function GET() {
  try {
    const rows = await sql`
      SELECT 
        id,
        type,
        title,
        name,
        phone,
        email,
        organization,
        suburb,
        address,
        latitude,
        longitude,
        location_address as "locationAddress",
        volume_or_tier as "volumeOrTier",
        preferred_date as "preferredDate",
        message,
        status,
        priority,
        assigned_to as "assignedTo",
        notes,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM client_requests
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({ success: true, requests: rows });
  } catch (error: any) {
    console.error("Error fetching requests from Neon:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch requests" },
      { status: 500 }
    );
  }
}

// POST /api/requests - Create new client request in Neon
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = body.id || `REQ-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
    const createdAt = body.createdAt || new Date().toISOString();

    const notesJson = JSON.stringify(body.notes || []);

    await sql`
      INSERT INTO client_requests (
        id,
        type,
        title,
        name,
        phone,
        email,
        organization,
        suburb,
        address,
        latitude,
        longitude,
        location_address,
        volume_or_tier,
        preferred_date,
        message,
        status,
        priority,
        assigned_to,
        notes,
        created_at,
        updated_at
      ) VALUES (
        ${id},
        ${body.type},
        ${body.title},
        ${body.name},
        ${body.phone},
        ${body.email || null},
        ${body.organization || null},
        ${body.suburb || null},
        ${body.address || null},
        ${body.latitude || null},
        ${body.longitude || null},
        ${body.locationAddress || null},
        ${body.volumeOrTier || null},
        ${body.preferredDate || null},
        ${body.message || null},
        ${body.status || "new"},
        ${body.priority || "normal"},
        ${body.assignedTo || null},
        ${notesJson}::jsonb,
        ${createdAt},
        ${createdAt}
      );
    `;

    return NextResponse.json({ success: true, id, message: "Request saved to Neon database" });
  } catch (error: any) {
    console.error("Error creating request in Neon:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create request" },
      { status: 500 }
    );
  }
}

// PATCH /api/requests - Update request status, assignedTo, or append note
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, assignedTo, note, priority } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Request ID required" }, { status: 400 });
    }

    const updatedAt = new Date().toISOString();

    if (note) {
      const noteObj = {
        id: `note-${Date.now()}`,
        author: note.author || "Dispatch Staff",
        content: note.content,
        createdAt: updatedAt,
      };
      await sql`
        UPDATE client_requests
        SET 
          notes = notes || ${JSON.stringify([noteObj])}::jsonb,
          updated_at = ${updatedAt}
        WHERE id = ${id};
      `;
    }

    if (status) {
      await sql`
        UPDATE client_requests
        SET status = ${status}, updated_at = ${updatedAt}
        WHERE id = ${id};
      `;
    }

    if (assignedTo !== undefined) {
      await sql`
        UPDATE client_requests
        SET assigned_to = ${assignedTo}, updated_at = ${updatedAt}
        WHERE id = ${id};
      `;
    }

    if (priority) {
      await sql`
        UPDATE client_requests
        SET priority = ${priority}, updated_at = ${updatedAt}
        WHERE id = ${id};
      `;
    }

    return NextResponse.json({ success: true, message: "Request updated in Neon" });
  } catch (error: any) {
    console.error("Error updating request in Neon:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update request" },
      { status: 500 }
    );
  }
}
