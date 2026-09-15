"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const NAVY = "#1B3A6B";
const ACCENT = "#2196C9";

export default function AboutTeaserSection() {
  return (
    <section style={{ padding: "100px 32px", backgroundColor: "#ffffff" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{
            position: "relative",
            height: "380px",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/img4.webp"
            alt="Hecksher history"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 34px)",
              fontWeight: 800,
              color: NAVY,
              marginBottom: "20px",
            }}
          >
            A shipping company with centuries of experience
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#444",
              lineHeight: 1.8,
              marginBottom: "28px",
            }}
          >
            Hecksher is one of the oldest shipping companies in the world.
            Founded over two centuries ago, we have vast experience in the
            shipping industry. Despite our age, we are a modern and flexible
            company thriving in the rapidly changing world at sea, on land,
            and in the air. We pride ourselves on delivering optimal shipping
            solutions every time.
          </p>
          <Link
            href="/about"
            style={{
              color: ACCENT,
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              fontSize: "15px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Our history →
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}