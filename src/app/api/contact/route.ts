import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// nodemailer needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

const MAX = { name: 120, company: 160, email: 200, phone: 60, service: 120, message: 5000 };

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Very small in-memory throttle (per server instance) to blunt spam bursts.
const recent = new Map<string, number[]>();
function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Honeypot: real visitors never see or fill this field. Pretend success to bots.
    if (typeof body?.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (tooManyRequests(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
    }

    const name = clean(body?.name, MAX.name);
    const company = clean(body?.company, MAX.company);
    const email = clean(body?.email, MAX.email);
    const phone = clean(body?.phone, MAX.phone);
    const service = clean(body?.service, MAX.service);
    const message = clean(body?.message, MAX.message);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please fill in your name, email and message." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) {
      console.error("contact: SMTP_HOST / SMTP_USER / SMTP_PASS are not set.");
      return NextResponse.json({ error: "Email is not configured yet. Please try again later." }, { status: 500 });
    }

    const port = Number(process.env.SMTP_PORT ?? 465);
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = SSL, 587 = STARTTLS
      auth: { user, pass },
    });

    const to = process.env.CONTACT_TO || "info@hecksherr.com";
    const from = process.env.CONTACT_FROM || user;

    const rows: [string, string][] = [
      ["Name", name],
      ["Company", company || "—"],
      ["Email", email],
      ["Phone", phone || "—"],
      ["Service", service || "—"],
    ];

    await transporter.sendMail({
      from: `"Hecksher Website" <${from}>`,
      to,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `New website enquiry from ${name}${service ? ` — ${service}` : ""}`,
      text: [...rows.map(([k, v]) => `${k}: ${v}`), "", "Message:", message].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;color:#1B3A6B;max-width:640px">
          <h2 style="margin:0 0 16px">New website enquiry</h2>
          <table style="border-collapse:collapse;width:100%">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:6px 12px 6px 0;font-weight:700;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 0">${esc(v)}</td></tr>`
              )
              .join("")}
          </table>
          <h3 style="margin:20px 0 8px">Message</h3>
          <p style="white-space:pre-wrap;margin:0">${esc(message)}</p>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact error:", err);
    return NextResponse.json({ error: "We couldn't send your message. Please try again or email us directly." }, { status: 500 });
  }
}
