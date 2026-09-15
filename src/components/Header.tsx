"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HecksherLogo from "./icons/HecksherLogo";

const NAVY = "#1B3A6B";
const ACCENT = "#2196C9";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !isHome || isScrolled;
  const textColor = solid ? NAVY : "#ffffff";
  const logoColor = solid ? NAVY : "#ffffff";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          backgroundColor: solid ? "#ffffff" : "transparent",
          boxShadow: solid ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 32px",
            height: "84px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <HecksherLogo size={44} color={logoColor} />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 900,
                  letterSpacing: "2px",
                  color: textColor,
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                HECKSHER
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  color: solid ? "rgba(27,58,107,0.6)" : "rgba(255,255,255,0.75)",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                SERVICES TO SHIPPING SINCE 1797
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>

            {/* Our Services link */}
            <Link
              href="/our-services"
              style={{
                color: textColor,
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
                paddingBottom: "4px",
                borderBottom: "2px solid transparent",
                transition: "border-color 0.2s",
              }}
            >
              Our Services
            </Link>

            {/* Sustainability link */}
            <Link
              href="/sustainability"
              style={{
                color: textColor,
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
                paddingBottom: "4px",
                borderBottom: "2px solid transparent",
                transition: "border-color 0.2s",
              }}
            >
              Sustainability
            </Link>

            <Link
              href="/news"
              style={{ color: textColor, fontSize: "15px", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ACCENT)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = textColor)}
            >
              News & Insights
            </Link>

            {/* Contact Us link */}
            <Link
              href="/contact"
              style={{ color: textColor, fontSize: "15px", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ACCENT)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = textColor)}
            >
              Contact Us
            </Link>

            {/* About Hecksher link */}
            <Link
              href="/about"
              style={{ color: textColor, fontSize: "15px", fontWeight: 600, textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ACCENT)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = textColor)}
            >
              About Hecksher
            </Link>
          </nav>
        </div>
      </header>

      {solid && <div style={{ height: "84px" }} />}
    </>
  );
}