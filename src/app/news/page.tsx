"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const allArticles = [
  {
    id: 1,
    category: "News",
    title: "Green Carrier expands operations into Southeast Asia with new Singapore hub",
    excerpt: "Our new Singapore office strengthens our regional capabilities across ASEAN, giving clients faster access to key Asian manufacturing hubs.",
    date: "July 6, 2026",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    href: "/news/singapore-expansion",
  },
  {
    id: 2,
    category: "Insights",
    title: "How Green Carrier is reducing ocean freight emissions across FCL and LCL shipments",
    excerpt: "A detailed look at our biofuel inset program and how it delivers verified carbon reductions for both full and partial container shipments.",
    date: "June 23, 2026",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=600&q=80",
    href: "/news/ocean-freight-emissions",
  },
  {
    id: 3,
    category: "Sustainability",
    title: "Fuel Switch Routes: How we deliver verified emission reductions by default",
    excerpt: "Our fuel-switch routes now cover 24 major trade lanes, making low-carbon shipping the default — not an optional add-on.",
    date: "June 10, 2026",
    image: "https://images.unsplash.com/photo-1578575436955-ef29da568c6d?w=600&q=80",
    href: "/news/fuel-switch-routes",
  },
  {
    id: 4,
    category: "Blue Initiative",
    title: "Green Carrier Blue Initiative: 12 months of ocean cleanup partnerships",
    excerpt: "One year in, our Blue Initiative has supported the removal of over 400 tonnes of ocean plastic across 8 coastal communities.",
    date: "May 28, 2026",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    href: "/news/blue-initiative-12-months",
  },
  {
    id: 5,
    category: "News",
    title: "Green Carrier wins Global Logistics Excellence Award 2026",
    excerpt: "We are proud to have been recognized at this year's Global Freight Summit for innovation in sustainable shipping and client service.",
    date: "May 14, 2026",
    image: "https://images.unsplash.com/photo-1521791055366-0d553872952f?w=600&q=80",
    href: "/news/excellence-award-2026",
  },
  {
    id: 6,
    category: "Insights",
    title: "Air vs. Sea freight: How to choose the right mode for your cargo",
    excerpt: "A practical guide to understanding when sea freight is the smarter choice, and when air freight is worth the premium.",
    date: "April 30, 2026",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    href: "/news/air-vs-sea-freight-guide",
  },
];

const categories = ["All", "News", "Insights", "Sustainability", "Blue Initiative"];

export default function NewsPage() {
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
            News & Stories
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
            News, insights, and stories from Green Carrier
          </motion.h1>
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ backgroundColor: "#E8EDD9", padding: "48px 48px 0" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              style={{
                padding: "10px 24px",
                borderRadius: "2px",
                border: "2px solid #2D6A4F",
                backgroundColor: cat === "All" ? "#2D6A4F" : "transparent",
                color: cat === "All" ? "#ffffff" : "#2D6A4F",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles grid */}
      <section style={{ backgroundColor: "#E8EDD9", padding: "48px 48px 80px" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {allArticles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "4px",
                overflow: "hidden",
              }}
              whileHover={{ boxShadow: "0 12px 40px rgba(27,58,107,0.12)" }}
            >
              <div style={{ height: "220px", overflow: "hidden" }}>
                <motion.img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div style={{ padding: "28px 24px" }}>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#2D6A4F18",
                    color: "#2D6A4F",
                    border: "1px solid #2D6A4F30",
                    borderRadius: "3px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    fontWeight: 600,
                    marginBottom: "16px",
                  }}
                >
                  {article.category}
                </span>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1B3A6B",
                    lineHeight: 1.4,
                    marginBottom: "12px",
                  }}
                >
                  <Link
                    href={article.href}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {article.title}
                  </Link>
                </h3>
                <p style={{ fontSize: "14px", color: "#3a4a5c", lineHeight: 1.65, marginBottom: "20px" }}>
                  {article.excerpt}
                </p>
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(27,58,107,0.1)",
                    marginBottom: "16px",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: "13px", color: "#2D6A4F", fontWeight: 500 }}>
                    {article.date}
                  </p>
                  <Link
                    href={article.href}
                    style={{
                      fontSize: "18px",
                      color: "#1B3A6B",
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}