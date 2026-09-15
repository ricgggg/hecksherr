"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ShipIcon from "./icons/ShipIcon";

export default function AboutSection() {
  return (
    <section style={{ backgroundColor: "#2D6A4F" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "80px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "rgba(255,255,255,0.65)",
              marginBottom: "20px",
            }}
          >
            About Green Carrier
          </p>

          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "32px",
            }}
          >
            A global logistics partner with an entrepreneurial spirit
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.8,
              marginBottom: "48px",
            }}
          >
            From our offices across North America, Europe, Asia, and the
            Middle East, we offer efficient logistics and supply chain solutions
            to clients worldwide. Green Carrier is present at the world's most
            important trading hubs and major port cities, holding a strong and
            trusted position in the global market.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              marginBottom: "48px",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "20+", label: "Years of experience" },
              { value: "180+", label: "Global destinations" },
              { value: "15", label: "Offices worldwide" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontSize: "36px",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                    marginTop: "4px",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            style={{
              display: "inline-flex",
              backgroundColor: "transparent",
              color: "#ffffff",
              textDecoration: "none",
              padding: "14px 32px",
              fontSize: "15px",
              fontWeight: 600,
              borderRadius: "2px",
              border: "2px solid rgba(255,255,255,0.5)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.borderColor = "#ffffff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.5)";
            }}
          >
            Read more about our group
          </Link>
        </motion.div>

        {/* Right — Ship illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ShipIcon color="rgba(255,255,255,0.7)" />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 60px 32px !important;
          }
          .about-grid > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}