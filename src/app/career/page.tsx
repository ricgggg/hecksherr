"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const openRoles = [
  {
    title: "Senior Freight Operations Specialist",
    location: "Houston, TX — USA",
    type: "Full-time",
    department: "Operations",
  },
  {
    title: "LCL Consolidation Coordinator",
    location: "Rotterdam — Netherlands",
    type: "Full-time",
    department: "Sea Freight",
  },
  {
    title: "Business Development Manager — Asia",
    location: "Singapore",
    type: "Full-time",
    department: "Sales",
  },
  {
    title: "Customs Compliance Officer",
    location: "Dubai — UAE",
    type: "Full-time",
    department: "Customs",
  },
  {
    title: "Air Freight Account Executive",
    location: "Houston, TX — USA",
    type: "Full-time",
    department: "Air Freight",
  },
  {
    title: "Sustainability Reporting Analyst",
    location: "Remote — Global",
    type: "Full-time",
    department: "ESG & Sustainability",
  },
];

export default function CareerPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          backgroundColor: "#2D6A4F",
          padding: "160px 48px 80px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')",
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
              color: "rgba(255,255,255,0.7)",
              marginBottom: "16px",
            }}
          >
            Career at Green Carrier
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
              maxWidth: "800px",
              marginBottom: "24px",
            }}
          >
            Join a team that keeps the world moving
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "580px",
              lineHeight: 1.7,
            }}
          >
            We are growing fast and looking for motivated, curious, and
            collaborative people to join us at offices around the world.
          </motion.p>
        </div>
      </section>

      {/* Culture */}
      <section style={{ backgroundColor: "#E8EDD9", padding: "80px 48px" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
          className="career-grid"
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 44px)",
                fontWeight: 700,
                color: "#1B3A6B",
                marginBottom: "24px",
              }}
            >
              Why Green Carrier?
            </h2>
            <p style={{ fontSize: "16px", color: "#3a4a5c", lineHeight: 1.8, marginBottom: "24px" }}>
              We are a company built on relationships. Whether you are a recent
              graduate or a seasoned logistics professional, you will find a
              place where your work has real impact.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "Competitive salary and global mobility opportunities",
                "Flexible working arrangements and remote options",
                "Annual personal development and training budget",
                "A culture of transparency, trust, and collaboration",
                "Meaningful work in a sustainability-led company",
              ].map((benefit) => (
                <div
                  key={benefit}
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
                >
                  <span style={{ color: "#2D6A4F", fontWeight: 700, marginTop: "2px" }}>✓</span>
                  <p style={{ fontSize: "15px", color: "#3a4a5c" }}>{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
              alt="Green Carrier team"
              style={{
                width: "100%",
                height: "460px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Open Roles */}
      <section style={{ backgroundColor: "#f4f6ee", padding: "80px 48px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 700,
              color: "#1B3A6B",
              marginBottom: "8px",
            }}
          >
            Open positions
          </motion.h2>
          <p style={{ fontSize: "16px", color: "#3a4a5c", marginBottom: "40px" }}>
            We are currently hiring across the following roles.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {openRoles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  padding: "24px 28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                  borderLeft: "4px solid #2D6A4F",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s",
                }}
                whileHover={{ boxShadow: "0 4px 20px rgba(27,58,107,0.1)" }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#1B3A6B",
                      marginBottom: "6px",
                    }}
                  >
                    {role.title}
                  </h3>
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "13px", color: "#3a4a5c" }}>
                      📍 {role.location}
                    </span>
                    <span style={{ fontSize: "13px", color: "#3a4a5c" }}>
                      🏢 {role.department}
                    </span>
                    <span style={{ fontSize: "13px", color: "#2D6A4F", fontWeight: 600 }}>
                      {role.type}
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    backgroundColor: "#2D6A4F",
                    color: "#ffffff",
                    textDecoration: "none",
                    padding: "10px 24px",
                    fontSize: "14px",
                    fontWeight: 600,
                    borderRadius: "2px",
                    transition: "background-color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = "#1e4d38")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = "#2D6A4F")
                  }
                >
                  Apply now →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .career-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .career-grid img { height: 280px !important; }
        }
        @media (max-width: 768px) {
          section { padding: 60px 24px !important; }
        }
      `}</style>
    </>
  );
}