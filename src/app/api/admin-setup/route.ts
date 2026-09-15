import { NextRequest, NextResponse } from "next/server";
import { isAdminPasswordSet, setAdminPassword } from "@/lib/admin";

export async function GET() {
  try {
    const isSetup = await isAdminPasswordSet();
    return NextResponse.json({ isSetup });
  } catch (err) {
    console.error("admin-setup GET error:", err);
    return NextResponse.json({ error: "Failed to check setup status." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { password, confirmPassword } = await req.json();

    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    const alreadySet = await isAdminPasswordSet();
    if (alreadySet) {
      return NextResponse.json({ error: "Admin password has already been set." }, { status: 403 });
    }

    await setAdminPassword(password);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("admin-setup POST error:", err);
    return NextResponse.json({ error: "Failed to set password." }, { status: 500 });
  }
}