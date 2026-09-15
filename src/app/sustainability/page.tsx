"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { sustainabilityItems } from "@/data/sustainability";

const NAVY = "#1B3A6B";
const GREEN = "#2D6A4F";
const CREAM = "#E8EDD9";

const itemMeta: Record<string, { image: string }> = {
  "fossil-free-shipping": {
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
  },
  "sustainability-work": {
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
  },
  "sustainability-report": {
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
  },
};

const stats = [
  { value: "30%", label: "Emissions reduction target by 2030" },
  { value: "12", label: "Countries with green corridor routes" },
  { value: "100%", label: "Offices running on renewable electricity" },
  { value: "1,400t", label: "CO\u2082 offset for clients in the last year" },
];

export default function SustainabilityOverviewPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          backgroundColor: NAVY,
          padding: "160px 48px 90px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
          }}
        />
        <div style={{ position: "relative", maxWidth: "1400px", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "16px",
            }}
          >
            Sustainability
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(40px, 5vw, 72px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              maxWidth: "820px",
              marginBottom: "24px",
            }}
          >
            Moving global trade toward a lower-carbon future
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.75)",
              maxWidth: "620px",
              lineHeight: 1.7,
            }}
          >
            From fossil-free ocean freight to transparent emissions
            reporting, we&apos;re building sustainability into every leg of
            the supply chain — not bolting it on afterward.
          </motion.p>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ backgroundColor: GREEN, padding: "48px" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
          className="stats-grid"
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "6px",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.5,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section style={{ backgroundColor: "#ffffff", padding: "90px 48px 40px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(26px, 3vw, 36px)",
              fontWeight: 700,
              color: NAVY,
              marginBottom: "20px",
            }}
          >
            Our approach to responsible logistics
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "16px", color: "#3a4a5c", lineHeight: 1.8 }}
          >
            Freight moves the world&apos;s economy, and that comes with real
            environmental responsibility. We work with clients, carriers, and
            regulators to cut emissions, invest in cleaner fuels, and give
            you the data to track and report your own supply chain impact.
          </motion.p>
        </div>
      </section>

      {/* Initiative cards */}
      <section style={{ backgroundColor: "#ffffff", padding: "40px 48px 100px" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
          }}
          className="initiative-grid"
        >
          {sustainabilityItems.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div
                style={{
                  border: "1px solid #eaeaea",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: "100%",
                  backgroundColor: CREAM,
                }}
                className="initiative-card"
              >
                <div
                  style={{
                    height: "220px",
                    backgroundImage: `url('${itemMeta[s.slug]?.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div style={{ padding: "28px" }}>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: NAVY,
                      marginBottom: "10px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#5a6a7a",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: NAVY, padding: "90px 48px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Want to make your supply chain greener?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.75)",
              marginBottom: "36px",
              lineHeight: 1.7,
            }}
          >
            Talk to our sustainability team about emissions reporting, green
            trade lanes, and offset programs tailored to your cargo.
          </motion.p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              backgroundColor: GREEN,
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 700,
              padding: "16px 36px",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Contact Our Team
          </Link>
        </div>
      </section>

      <style>{`
        .initiative-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .initiative-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(27,58,107,0.12); }
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .initiative-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}
