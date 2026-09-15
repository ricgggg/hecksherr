"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const offices = [
  {
    city: "Stockholm",
    address: "Klarabergsviadukten 63\n101 23 Stockholm, Sweden",
    phone: "+46 766 920 874",
    email: "stockholm@hecksherr.com",
  },
  {
    city: "Turkey",
    address: "Fulya Mh Büyükdere Caddesi, Likör Yanı Sk.\nAkabe Ticaret Merkezi No:80 Kat 2/202 No:78\n34437 Şişli/İstanbul, Türkiye",
    phone: "+971 52 349 4184",
    email: "turkey@hecksherr.com",
  },
  {
    city: "Houston",
    address: "14 Harbor Commerce Drive, Suite 800\nHouston, TX 77002, USA",
    phone: "+1 (713) 555 0198",
    email: "houston@hecksherr.com",
  },
  {
    city: "Rotterdam",
    address: "Waalhaven Oostzijde 12\n3087 BM Rotterdam, Netherlands",
    phone: "+31 10 555 0234",
    email: "rotterdam@hecksherr.com",
  },
  {
    city: "Singapore",
    address: "80 Raffles Place, Level 22\nSingapore 048624",
    phone: "+65 6555 0178",
    email: "singapore@hecksherr.com",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          backgroundColor: "#1B3A6B",
          padding: "160px 48px 80px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
            Contact Us
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
              maxWidth: "700px",
            }}
          >
            Let's move your cargo — together
          </motion.h1>
        </div>
      </section>

      {/* Form + Offices */}
      <section style={{ backgroundColor: "#E8EDD9", padding: "80px 48px" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "80px",
            alignItems: "flex-start",
          }}
          className="contact-grid"
        >
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "#1B3A6B",
                marginBottom: "8px",
              }}
            >
              Send us a message
            </h2>
            <p style={{ fontSize: "15px", color: "#3a4a5c", marginBottom: "36px" }}>
              Fill in your details and a logistics specialist will respond within
              one business day.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  backgroundColor: "#2D6A4F",
                  borderRadius: "8px",
                  padding: "48px 36px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "48px", marginBottom: "16px" }}>✓</p>
                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", marginBottom: "12px" }}>
                  Message received!
                </h3>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)" }}>
                  Thank you for reaching out. Our team will be in touch within one
                  business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                  className="form-row"
                >
                  {/* Name */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1B3A6B" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Smith"
                      style={{
                        padding: "13px 16px",
                        borderRadius: "4px",
                        border: "2px solid rgba(27,58,107,0.2)",
                        fontSize: "15px",
                        color: "#1B3A6B",
                        backgroundColor: "#ffffff",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#2D6A4F")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(27,58,107,0.2)")}
                    />
                  </div>

                  {/* Company */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1B3A6B" }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Corp"
                      style={{
                        padding: "13px 16px",
                        borderRadius: "4px",
                        border: "2px solid rgba(27,58,107,0.2)",
                        fontSize: "15px",
                        color: "#1B3A6B",
                        backgroundColor: "#ffffff",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#2D6A4F")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(27,58,107,0.2)")}
                    />
                  </div>
                </div>

                <div
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
                  className="form-row"
                >
                  {/* Email */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1B3A6B" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      style={{
                        padding: "13px 16px",
                        borderRadius: "4px",
                        border: "2px solid rgba(27,58,107,0.2)",
                        fontSize: "15px",
                        color: "#1B3A6B",
                        backgroundColor: "#ffffff",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#2D6A4F")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(27,58,107,0.2)")}
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "#1B3A6B" }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 555 0100"
                      style={{
                        padding: "13px 16px",
                        borderRadius: "4px",
                        border: "2px solid rgba(27,58,107,0.2)",
                        fontSize: "15px",
                        color: "#1B3A6B",
                        backgroundColor: "#ffffff",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#2D6A4F")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(27,58,107,0.2)")}
                    />
                  </div>
                </div>

                {/* Service */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#1B3A6B" }}>
                    Service Required
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    style={{
                      padding: "13px 16px",
                      borderRadius: "4px",
                      border: "2px solid rgba(27,58,107,0.2)",
                      fontSize: "15px",
                      color: "#1B3A6B",
                      backgroundColor: "#ffffff",
                      outline: "none",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#2D6A4F")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(27,58,107,0.2)")}
                  >
                    <option value="">Select a service...</option>
                    <option>FCL — Full Container Load</option>
                    <option>LCL — Less than Container Load</option>
                    <option>Air Freight</option>
                    <option>Customs Clearance</option>
                    <option>Freight Forwarding</option>
                    <option>Other / Not sure yet</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "#1B3A6B" }}>
                    Tell us about your shipment *
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Origin, destination, cargo type, volume, timeline..."
                    rows={5}
                    style={{
                      padding: "13px 16px",
                      borderRadius: "4px",
                      border: "2px solid rgba(27,58,107,0.2)",
                      fontSize: "15px",
                      color: "#1B3A6B",
                      backgroundColor: "#ffffff",
                      outline: "none",
                      resize: "vertical",
                      fontFamily: "inherit",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#2D6A4F")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(27,58,107,0.2)")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? "#3a4a5c" : "#2D6A4F",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "16px 40px",
                    fontSize: "16px",
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "background-color 0.2s",
                    alignSelf: "flex-start",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTop: "2px solid #ffffff",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                          display: "inline-block",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    "Send message →"
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — Offices */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1B3A6B",
                marginBottom: "32px",
              }}
            >
              Our offices
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {offices.map((office) => (
                <div
                  key={office.city}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "4px",
                    padding: "28px 24px",
                    borderLeft: "4px solid #2D6A4F",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#1B3A6B",
                      marginBottom: "12px",
                    }}
                  >
                    {office.city}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#3a4a5c", lineHeight: 1.7, whiteSpace: "pre-line", marginBottom: "12px" }}>
                    {office.address}
                  </p>
                  <p style={{ fontSize: "14px", color: "#3a4a5c" }}>{office.phone}</p>
                  <a
                    href={`mailto:${office.email}`}
                    style={{
                      fontSize: "14px",
                      color: "#2D6A4F",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    {office.email}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          section { padding: 60px 24px !important; }
        }
      `}</style>
    </>
  );
}