import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword, isAdminPasswordSet } from "@/lib/admin";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const setupDone = await isAdminPasswordSet();
    if (!setupDone) {
      return NextResponse.json({ error: "Admin password has not been set up yet." }, { status: 400 });
    }

    const valid = await verifyAdminPassword(password);
    if (valid) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  } catch (err) {
    console.error("admin-login error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}