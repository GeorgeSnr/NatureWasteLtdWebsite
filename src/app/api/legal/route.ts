import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

function getSql() {
  const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_0Cuofl6VKkhw@ep-still-salad-b5fenabt-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  return neon(connectionString);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const docId = searchParams.get("id");
    const sql = getSql();

    if (docId) {
      const rows = await sql`
        SELECT id, title, last_updated as "lastUpdated", summary, sections, updated_at as "updatedAt"
        FROM legal_documents
        WHERE id = ${docId}
        LIMIT 1;
      `;
      if (rows.length === 0) {
        return NextResponse.json({ success: false, message: "Document not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, document: rows[0] });
    }

    const rows = await sql`
      SELECT id, title, last_updated as "lastUpdated", summary, sections, updated_at as "updatedAt"
      FROM legal_documents
      ORDER BY id ASC;
    `;
    return NextResponse.json({ success: true, documents: rows });
  } catch (error: any) {
    console.error("Error fetching legal documents from Neon:", error);
    return NextResponse.json(
      { success: false, message: "Database query failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, lastUpdated, summary, sections } = body;

    if (!id || !title || !sections) {
      return NextResponse.json(
        { success: false, message: "id, title, and sections are required fields" },
        { status: 400 }
      );
    }

    const sql = getSql();
    const formattedLastUpdated = lastUpdated || new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const rows = await sql`
      INSERT INTO legal_documents (id, title, last_updated, summary, sections, updated_at)
      VALUES (
        ${id},
        ${title},
        ${formattedLastUpdated},
        ${summary || ""},
        ${JSON.stringify(sections)}::jsonb,
        CURRENT_TIMESTAMP
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        last_updated = EXCLUDED.last_updated,
        summary = EXCLUDED.summary,
        sections = EXCLUDED.sections,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, title, last_updated as "lastUpdated", summary, sections, updated_at as "updatedAt";
    `;

    return NextResponse.json({ success: true, document: rows[0] });
  } catch (error: any) {
    console.error("Error saving legal document to Neon:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save document to Neon", error: error.message },
      { status: 500 }
    );
  }
}
