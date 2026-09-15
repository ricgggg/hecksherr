"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const NAVY = "#1B3A6B";
const ACCENT = "#2196C9";

export default function WhatSetsUsApart() {
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
          transition={{ duration: 0.7 }}
        >
          <h2
            style={{
              fontSize: "clamp(26px, 3vw, 36px)",
              fontWeight: 800,
              color: NAVY,
              marginBottom: "20px",
            }}
          >
            What sets us apart
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: NAVY,
              fontWeight: 600,
              lineHeight: 1.6,
              marginBottom: "16px",
            }}
          >
            Personal commitment combined with robust logistics solutions sets
            us apart from other logistics providers.
          </p>
          <p
            style={{
              fontSize: "15px",
              color: "#555",
              lineHeight: 1.8,
              marginBottom: "28px",
            }}
          >
            We turn customer relations into long-lasting partnerships by
            providing superior services — regardless of size, weight, or
            shape — ensuring your cargo arrives at the right place, at the
            right time, and at a fair cost. Our highly trained logistics
            professionals are dedicated to serving you from our offices
            worldwide.
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
            This is Hecksher →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            position: "relative",
            height: "400px",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/img3.webp"
            alt="Hecksher team"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
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