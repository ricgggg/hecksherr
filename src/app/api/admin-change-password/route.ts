import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword, setAdminPassword } from "@/lib/admin";

export async function POST(req: NextRequest) {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = await req.json();

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
    }
    if (newPassword !== confirmNewPassword) {
      return NextResponse.json({ error: "New passwords do not match." }, { status: 400 });
    }

    const valid = await verifyAdminPassword(currentPassword);
    if (!valid) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
    }

    await setAdminPassword(newPassword);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("admin-change-password error:", err);
    return NextResponse.json({ error: "Failed to change password." }, { status: 500 });
  }
}