"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NAVY_DARK = "#0F2A4D";

const badges = [
  "Maritime Biofuel Insets",
  "Sustainable Aviation Fuel",
  "Fuel Switch Routes",
];

export default function SustainabilitySection() {
  return (
    <section
      style={{
        backgroundColor: NAVY_DARK,
        backgroundImage:
          "url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 32px 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(15,42,77,0.80)",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "clamp(26px, 3vw, 36px)",
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: "20px",
            maxWidth: "800px",
          }}
        >
          Discover our emission reduction services
        </motion.h2>

        <p
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "15px",
            maxWidth: "860px",
            marginBottom: "16px",
            lineHeight: 1.7,
          }}
        >
          Through certified emission reduction solutions — such as Sustainable
          Aviation Fuel certificates, Maritime Biofuel Insets, and Fuel Switch
          Routes — you can significantly reduce emissions across your logistics
          chain and support the shift to renewable energy in global transport.
        </p>

        <Link
          href="/sustainability"
          style={{
            color: "#ffffff",
            fontWeight: 700,
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            fontSize: "15px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "60px",
          }}
        >
          Read more here →
        </Link>

        {/* Circular badges */}
        <div
          style={{
            display: "flex",
            gap: "60px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {badges.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.18, duration: 0.5 }}
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
                transform: `rotate(${i % 2 === 0 ? -6 : 6}deg)`,
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  lineHeight: 1.4,
                }}
              >
                {b}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}