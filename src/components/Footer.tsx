"use client";

import Link from "next/link";
import HecksherLogo from "./icons/HecksherLogo";
import { services } from "@/data/services";

const NAVY = "#1B3A6B";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: NAVY, color: "#ffffff" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "72px 32px 48px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "48px",
        }}
      >
        {/* Brand column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <HecksherLogo size={40} color="#ffffff" />
            <div>
              <p style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "2px", lineHeight: 1 }}>
                HECKSHER
              </p>
              <p style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "1.5px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
                SERVICES TO SHIPPING SINCE 1797
              </p>
            </div>
          </div>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: "220px" }}>
            Personal service and sustainable logistics solutions for global trade.
          </p>
        </div>

        {/* Our services */}
        <div>
          <p style={{ fontSize: "16px", fontWeight: 800, marginBottom: "20px" }}>
            Our services
          </p>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/our-services/${s.slug}`}
              style={{
                display: "block",
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                padding: "5px 0",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#ffffff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)")
              }
            >
              {s.title}
            </Link>
          ))}
        </div>

        {/* Contact us */}
        <div>
          <p style={{ fontSize: "16px", fontWeight: 800, marginBottom: "20px" }}>
            Contact us
          </p>
          <p style={{ fontSize: "15px", fontWeight: 600, lineHeight: "1.9", color: "rgba(255,255,255,0.85)" }}>
            Klarabergsviadukten 63
            <br />
            101 23 Stockholm
            <br />
            Sweden
            <br />
            +46 766 920 874
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "12px 28px",
              backgroundColor: "#ffffff",
              color: NAVY,
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 800,
              borderRadius: "2px",
            }}
          >
            Our offices
          </Link>
        </div>

        {/* Social media */}
        <div>
          <p style={{ fontSize: "16px", fontWeight: 800, marginBottom: "20px" }}>
            Social media
          </p>
          {[
            { name: "LinkedIn", href: "#" },
            { name: "Instagram", href: "#" },
            { name: "YouTube", href: "#" },
          ].map((s) => (
            <a
              key={s.name}
              href={s.href}
              style={{
                display: "block",
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                padding: "5px 0",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#ffffff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)")
              }
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "20px 32px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
          © 2026 All rights reserved. HECKSHER — Terms & Conditions · Cookie settings · info@hecksher.com
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Privacy Policy", "Cookie Settings"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#ffffff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")
              }
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}