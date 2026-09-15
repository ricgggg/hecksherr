"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ACCENT = "#2196C9";

export default function JoinCTASection() {
  return (
    <section
      style={{
        position: "relative",
        padding: "120px 32px",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(10,26,50,0.72)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(26px, 3vw, 38px)",
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          Want to join Hecksher?
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.88)",
            fontSize: "16px",
            marginBottom: "32px",
            maxWidth: "520px",
            lineHeight: 1.6,
          }}
        >
          We are always interested in new talents. Explore our available job
          openings or send us your application.
        </p>
        <Link
          href="/career"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: ACCENT,
            color: "#ffffff",
            padding: "15px 32px",
            borderRadius: "2px",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "15px",
          }}
        >
          Available job positions →
        </Link>
      </motion.div>
    </section>
  );
}