"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import FCLIcon from "./icons/FCLIcon";
import LCLIcon from "./icons/LCLIcon";
import MultiIcon from "./icons/MultiIcon";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function ServicesSection() {
  return (
    <section style={{ backgroundColor: "#E8EDD9", padding: "80px 0 100px" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "#1B3A6B",
            marginBottom: "12px",
          }}
        >
          Our Services
        </motion.p>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: "clamp(36px, 4.5vw, 60px)",
            fontWeight: 700,
            color: "#1B3A6B",
            marginBottom: "20px",
            lineHeight: 1.1,
          }}
        >
          We move your goods
          <br />
          across the world
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "17px",
            color: "#3a4a5c",
            maxWidth: "700px",
            lineHeight: 1.7,
            marginBottom: "56px",
          }}
        >
          With over two decades of global logistics experience and a
          client-first team, Green Carrier delivers reliable, efficient, and
          sustainable freight solutions by sea and air. To us, every shipment
          matters.
        </motion.p>

        {/* 3 Service Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Card 1 — FCL — Dark Green */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              backgroundColor: "#2D6A4F",
              borderRadius: "4px",
              padding: "48px 36px 36px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            whileHover={{ y: -4 }}
          >
            <FCLIcon color="#ffffff" />
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.3,
              }}
            >
              Do you want to ship a full container?
            </h3>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
              With our FCL solutions — Full Container Load — we give you
              exclusive use of an entire container. Ideal for large shipments,
              offering speed, security, and the lowest CO₂ impact in the
              industry.
            </p>
            <Link
              href="/our-services#sea-freight"
              style={{
                marginTop: "auto",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Discover FCL solutions with Green Carrier →
            </Link>
          </motion.div>

          {/* Card 2 — LCL — Dark Navy */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              backgroundColor: "#1B3A6B",
              borderRadius: "4px",
              padding: "48px 36px 36px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              cursor: "pointer",
            }}
            whileHover={{ y: -4 }}
          >
            <LCLIcon color="#ffffff" />
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.3,
              }}
            >
              Just need a part of a container?
            </h3>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
              LCL — Less than Container Load — lets you share container space
              with other shippers. Pay only for the volume you need. Perfect
              for smaller cargo volumes without compromising on service quality.
            </p>
            <Link
              href="/our-services#sea-freight"
              style={{
                marginTop: "auto",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Discover LCL solutions with Green Carrier →
            </Link>
          </motion.div>

          {/* Card 3 — Other/Air — Sage Light */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              backgroundColor: "#d1ddb8",
              borderRadius: "4px",
              padding: "48px 36px 36px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              cursor: "pointer",
            }}
            whileHover={{ y: -4 }}
          >
            <MultiIcon color="#2D6A4F" />
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#1B3A6B",
                lineHeight: 1.3,
              }}
            >
              Unsure or need other shipping solutions?
            </h3>
            <p style={{ fontSize: "15px", color: "#3a4a5c", lineHeight: 1.7 }}>
              From air freight to customs clearance and freight forwarding —
              we handle it all. Tell us about your shipment, and we will design
              the perfect solution for your needs.
            </p>
            <Link
              href="/our-services"
              style={{
                marginTop: "auto",
                color: "#2D6A4F",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(45,106,79,0.2)",
              }}
            >
              Discover what we can do for you →
            </Link>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}