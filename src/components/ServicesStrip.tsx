"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShipIcon,
  PlaneIcon,
  TruckIcon,
  ProjectIcon,
  ValueAddedIcon,
} from "./icons/ServiceIcons";

const NAVY_DARK = "#0F2A4D";

const strip = [
  {
    slug: "sea-freight",
    title: "Sea",
    desc: "Ship your goods anywhere with economy in mind.",
    Icon: ShipIcon,
    bg: NAVY_DARK,
  },
  {
    slug: "air-freight",
    title: "Air",
    desc: "Fast and reliable air freight provided by professionals.",
    Icon: PlaneIcon,
    bg: NAVY_DARK,
  },
  {
    slug: "road-freight",
    title: "Road",
    desc: "Move your cargo flexibly and efficiently by road.",
    Icon: TruckIcon,
    bg: NAVY_DARK,
  },
  {
    slug: "project-logistics",
    title: "Project logistics",
    desc: "When the box doesn't fit, we think outside of it.",
    Icon: ProjectIcon,
    bg: NAVY_DARK,
  },
  {
    slug: "value-added-services",
    title: "Value-added services",
    desc: "We help you move from complexity to simplicity.",
    Icon: ValueAddedIcon,
    bg: NAVY_DARK,
  },
];

export default function ServicesStrip() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 3,
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
        }}
      >
        {strip.map((item, i) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{
              backgroundColor: item.bg,
              padding: "40px 28px 36px",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <item.Icon size={48} color="#ffffff" />
            <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "16px 0 10px" }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.88)", marginBottom: "24px", lineHeight: 1.6, minHeight: "42px" }}>
              {item.desc}
            </p>
            <Link
              href={`/our-services/${item.slug}`}
              style={{
                display: "inline-block",
                border: "2px solid rgba(255,255,255,0.8)",
                color: "#ffffff",
                padding: "9px 24px",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: "2px",
                transition: "all 0.2s",
                marginTop: "auto",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              Read more
            </Link>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          section > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}