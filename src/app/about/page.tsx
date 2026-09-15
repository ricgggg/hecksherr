"use client";

import { motion } from "framer-motion";

const offices = [
  { city: "Houston", country: "USA", region: "Americas HQ" },
  { city: "Rotterdam", country: "Netherlands", region: "Europe" },
  { city: "Singapore", country: "Singapore", region: "Asia Pacific" },
  { city: "Dubai", country: "UAE", region: "Middle East" },
  { city: "Lagos", country: "Nigeria", region: "Africa" },
  { city: "Shanghai", country: "China", region: "East Asia" },
];

const values = [
  {
    title: "Client First",
    description:
      "Every decision we make starts with one question: what is best for our client? We are not just a logistics provider — we are your supply chain partner.",
  },
  {
    title: "Entrepreneurial Spirit",
    description:
      "We move fast, think creatively, and never accept 'that's not possible' as an answer. Our team finds solutions where others see dead ends.",
  },
  {
    title: "Sustainable Growth",
    description:
      "We grow with intention — building a business that is profitable, responsible, and designed to last for generations, not just quarters.",
  },
  {
    title: "People Over Process",
    description:
      "Behind every container is a team of dedicated people. We invest in our staff, celebrate diversity, and build a culture of trust and ambition.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          backgroundColor: "#1B3A6B",
          padding: "160px 48px 80px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
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
            About Green Carrier
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
            A global logistics partner with a people-first culture
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.75)",
              maxWidth: "600px",
              lineHeight: 1.7,
            }}
          >
            Founded on entrepreneurial values and a deep commitment to service
            excellence, Green Carrier has grown into a trusted global logistics
            group serving clients in over 180 countries.
          </motion.p>
        </div>
      </section>

      {/* Story */}
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
          className="about-story-grid"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1573164574001-518958d9baa2?w=800&q=80"
              alt="Green Carrier team"
              style={{
                width: "100%",
                height: "480px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 44px)",
                fontWeight: 700,
                color: "#1B3A6B",
                marginBottom: "24px",
              }}
            >
              Built by people who love what they do
            </h2>
            <p style={{ fontSize: "16px", color: "#3a4a5c", lineHeight: 1.8, marginBottom: "20px" }}>
              Green Carrier was founded by a small team of shipping professionals
              who believed that great logistics is not just about moving cargo —
              it is about building relationships, solving problems, and treating
              every shipment as if it were their own.
            </p>
            <p style={{ fontSize: "16px", color: "#3a4a5c", lineHeight: 1.8, marginBottom: "20px" }}>
              Today, with offices across six continents and a team of over 400
              logistics specialists, we continue to operate with the same
              values: entrepreneurial energy, honest communication, and an
              uncompromising focus on our clients.
            </p>
            <p style={{ fontSize: "16px", color: "#3a4a5c", lineHeight: 1.8 }}>
              We are present at the world's most important ports and trading
              hubs — giving our clients access to global routes, competitive
              rates, and local expertise wherever they need it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: "#1B3A6B", padding: "80px 48px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "48px",
              textAlign: "center",
            }}
          >
            What we believe in
          </motion.h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderRadius: "4px",
                  padding: "36px 28px",
                  borderTop: "4px solid #2D6A4F",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "14px",
                  }}
                >
                  {v.title}
                </h3>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section style={{ backgroundColor: "#E8EDD9", padding: "80px 48px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 700,
              color: "#1B3A6B",
              marginBottom: "12px",
            }}
          >
            Our global offices
          </motion.h2>
          <p
            style={{
              fontSize: "16px",
              color: "#3a4a5c",
              marginBottom: "48px",
              maxWidth: "500px",
            }}
          >
            Strategically located at the world's most important trading hubs and
            port cities.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  padding: "28px 24px",
                  borderLeft: "4px solid #2D6A4F",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: "#2D6A4F",
                    marginBottom: "8px",
                  }}
                >
                  {office.region}
                </p>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#1B3A6B",
                  }}
                >
                  {office.city}
                </h3>
                <p style={{ fontSize: "14px", color: "#3a4a5c", marginTop: "4px" }}>
                  {office.country}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-story-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .about-story-grid img { height: 280px !important; }
        }
        @media (max-width: 768px) {
          section { padding: 60px 24px !important; }
        }
      `}</style>
    </>
  );
}