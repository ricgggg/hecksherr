"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const NAVY = "#1B3A6B";
const ACCENT = "#2196C9";

const articles = [
  {
    id: 1,
    tag: "NEWS",
    title: "How Hecksher is cutting emissions across ocean freight",
    excerpt:
      "Reducing emissions from ocean freight is one of the key challenges facing the maritime industry. The transition to fossil-free shipping requires renewable fuels and new infrastructure.",
    image: "/images/img2.webp",
    href: "/news/ocean-freight-emissions",
  },
  {
    id: 2,
    tag: "NEWS",
    title: "Meet Hecksher's Operational Business Development Manager",
    excerpt:
      "From a chance opportunity to more than 40 years in the logistics industry — a career centered around people, problem-solving, and growth.",
    image: "/images/img3.webp",
    href: "/news/business-development-manager",
  },
  {
    id: 3,
    tag: "BLOG",
    title: "What is SAF — and how can it help reduce air freight emissions?",
    excerpt:
      "A conversation with Hecksher's Head of Sustainability. As companies face growing pressure to reduce supply chain emissions, transport choices are receiving more attention.",
    image: "/images/img4.webp",
    href: "/news/what-is-saf",
  },
];

export default function NewsSection() {
  return (
    <section style={{ padding: "100px 32px", backgroundColor: "#f7f8fa" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "clamp(26px, 3vw, 34px)",
            fontWeight: 800,
            color: NAVY,
            marginBottom: "40px",
          }}
        >
          News & Insights
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {articles.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              }}
            >
              <div style={{ position: "relative", height: "220px" }}>
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    backgroundColor: ACCENT,
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "5px 12px",
                    borderRadius: "2px",
                    letterSpacing: "1px",
                  }}
                >
                  {a.tag}
                </span>
              </div>
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: NAVY,
                    marginBottom: "12px",
                    lineHeight: 1.45,
                  }}
                >
                  <Link
                    href={a.href}
                    style={{ color: "inherit", textDecoration: "none" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = ACCENT)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = NAVY)
                    }
                  >
                    {a.title}
                  </Link>
                </h3>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.65 }}>
                  {a.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link
            href="/news"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: ACCENT,
              color: "#ffffff",
              padding: "14px 36px",
              borderRadius: "2px",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "15px",
            }}
          >
            All News & Insights →
          </Link>
        </div>
      </div>
    </section>
  );
}