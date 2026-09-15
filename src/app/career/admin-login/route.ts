import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      console.error("ADMIN_PASSWORD is not set in environment variables.");
      return NextResponse.json(
        { error: "Server misconfiguration: admin password not set." },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Incorrect password." },
      { status: 401 }
    );
  } catch (err) {
    console.error("admin-login error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}