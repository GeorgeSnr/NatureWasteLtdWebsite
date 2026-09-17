import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { UserProfile } from "@/types/admin";

// GET /api/users - Fetch all users from Neon
export async function GET() {
  try {
    const rows = await sql`
      SELECT 
        id,
        name,
        email,
        phone,
        role,
        organization,
        suburb,
        address,
        latitude,
        longitude,
        location_address as "locationAddress",
        plan,
        account_status as "accountStatus",
        password_hash as "passwordHash",
        COALESCE(mfa_enabled, true) as "mfaEnabled",
        eco_points as "ecoPoints",
        assigned_bin_id as "assignedBinId",
        created_at as "createdAt",
        last_login as "lastLogin"
      FROM users
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({ success: true, users: rows });
  } catch (error: any) {
    console.error("Error fetching users from Neon:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/users - Create new user in Neon
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id =
      body.id ||
      (body.role === "client"
        ? `USR-C-${Date.now().toString().slice(-4)}`
        : `USR-S-${Date.now().toString().slice(-4)}`);
    const createdAt = body.createdAt || new Date().toISOString();
    const passwordHash =
      body.password ||
      body.passwordHash ||
      (body.role === "client" ? `Client#${Math.floor(1000 + Math.random() * 9000)}` : `Staff#${Math.floor(1000 + Math.random() * 9000)}`);
    const mfaEnabled = typeof body.mfaEnabled === "boolean" ? body.mfaEnabled : false;
    const accountStatus = body.accountStatus || "active";

    await sql`
      INSERT INTO users (
        id,
        name,
        email,
        phone,
        role,
        organization,
        suburb,
        address,
        latitude,
        longitude,
        location_address,
        plan,
        account_status,
        password_hash,
        mfa_enabled,
        eco_points,
        assigned_bin_id,
        created_at,
        last_login
      ) VALUES (
        ${id},
        ${body.name},
        ${body.email},
        ${body.phone},
        ${body.role || "client"},
        ${body.organization || null},
        ${body.suburb || null},
        ${body.address || null},
        ${body.latitude || null},
        ${body.longitude || null},
        ${body.locationAddress || null},
        ${body.plan || null},
        ${accountStatus},
        ${passwordHash},
        ${mfaEnabled},
        ${body.ecoPoints || 150},
        ${body.assignedBinId || null},
        ${createdAt},
        ${createdAt}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        role = EXCLUDED.role,
        account_status = EXCLUDED.account_status,
        password_hash = EXCLUDED.password_hash,
        mfa_enabled = EXCLUDED.mfa_enabled,
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude,
        location_address = EXCLUDED.location_address;
    `;

    const user: UserProfile = {
      id,
      name: body.name,
      email: body.email,
      phone: body.phone,
      role: body.role || "client",
      organization: body.organization,
      suburb: body.suburb,
      address: body.address,
      latitude: body.latitude,
      longitude: body.longitude,
      locationAddress: body.locationAddress,
      plan: body.plan,
      accountStatus,
      passwordHash,
      mfaEnabled,
      ecoPoints: body.ecoPoints || 150,
      assignedBinId: body.assignedBinId,
      createdAt,
      lastLogin: createdAt,
    };

    return NextResponse.json({
      success: true,
      user,
      message: "User account saved to Neon database successfully",
    });
  } catch (error: any) {
    console.error("Error creating user in Neon:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}

// PATCH /api/users - Update user role, accountStatus, MFA, or lastLogin
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, accountStatus, role, password, mfaEnabled, lastLogin, organization, suburb, plan } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 });
    }

    if (accountStatus !== undefined) {
      await sql`
        UPDATE users
        SET account_status = ${accountStatus}
        WHERE id = ${id};
      `;
    }

    if (role !== undefined) {
      await sql`
        UPDATE users
        SET role = ${role}
        WHERE id = ${id};
      `;
    }

    if (password !== undefined) {
      await sql`
        UPDATE users
        SET password_hash = ${password}
        WHERE id = ${id};
      `;
    }

    if (mfaEnabled !== undefined) {
      await sql`
        UPDATE users
        SET mfa_enabled = ${mfaEnabled}
        WHERE id = ${id};
      `;
    }

    if (organization !== undefined) {
      await sql`
        UPDATE users
        SET organization = ${organization}
        WHERE id = ${id};
      `;
    }

    if (suburb !== undefined) {
      await sql`
        UPDATE users
        SET suburb = ${suburb}
        WHERE id = ${id};
      `;
    }

    if (plan !== undefined) {
      await sql`
        UPDATE users
        SET plan = ${plan}
        WHERE id = ${id};
      `;
    }

    if (lastLogin !== undefined) {
      await sql`
        UPDATE users
        SET last_login = ${lastLogin}
        WHERE id = ${id};
      `;
    }

    return NextResponse.json({ success: true, message: "User updated in Neon database" });
  } catch (error: any) {
    console.error("Error updating user in Neon:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/users - Delete user
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 });
    }

    await sql`
      DELETE FROM users
      WHERE id = ${id};
    `;

    return NextResponse.json({ success: true, message: "User deleted from Neon database" });
  } catch (error: any) {
    console.error("Error deleting user from Neon:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}
