"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { services } from "@/data/services";
import {
  ShipIcon,
  PlaneIcon,
  TruckIcon,
  ProjectIcon,
  WarehouseIcon,
  ValueAddedIcon,
} from "@/components/icons/ServiceIcons";

const NAVY = "#1B3A6B";
const GREEN = "#2D6A4F";
const CREAM = "#E8EDD9";

const serviceMeta: Record<
  string,
  {
    icon: (props: { size?: number; color?: string }) => React.JSX.Element;
    image: string;
    features: string[];
  }
> = {
  "sea-freight": {
    icon: ShipIcon,
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1200&q=80",
    features: [
      "FCL and LCL container solutions on every major trade lane",
      "Strong carrier partnerships for competitive, reliable rates",
      "Real-time shipment visibility from port to port",
      "Dedicated operations team handling documentation and booking",
    ],
  },
  "air-freight": {
    icon: PlaneIcon,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
    features: [
      "Time-critical and charter freight to over 180 countries",
      "End-to-end management from booking through customs clearance",
      "Priority handling for perishables, pharma, and high-value cargo",
      "Transparent tracking and proactive delay alerts",
    ],
  },
  "road-freight": {
    icon: TruckIcon,
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80",
    features: [
      "Flexible full-truckload and part-load transport",
      "Cross-border distribution across major trade corridors",
      "Last-mile delivery network for fast, reliable drop-off",
      "Live route tracking and delivery confirmation",
    ],
  },
  "project-logistics": {
    icon: ProjectIcon,
    image:
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=1200&q=80",
    features: [
      "Engineering-led planning for oversized and heavy-lift cargo",
      "Specialized equipment sourcing — flat racks, heavy-lift vessels, cranes",
      "Route surveys and permits for out-of-gauge shipments",
      "Single point of contact from feasibility study to delivery",
    ],
  },
  "contract-logistics": {
    icon: WarehouseIcon,
    image:
      "https://images.unsplash.com/photo-1553413077-190083f66cef?w=1200&q=80",
    features: [
      "Public and contract warehousing with flexible storage terms",
      "Inventory management and order fulfillment systems",
      "Supply chain design to reduce cost and complexity",
      "Scalable capacity for seasonal and peak-demand shifts",
    ],
  },
  "value-added-services": {
    icon: ValueAddedIcon,
    image:
      "https://images.unsplash.com/photo-1554774853-b415df9eeb92?w=1200&q=80",
    features: [
      "Customs brokerage and compliance across every trade lane",
      "Comprehensive cargo insurance options",
      "Documentation support to keep shipments moving without delay",
      "Trade advisory to help you navigate changing regulations",
    ],
  },
};

export default function OurServicesPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          backgroundColor: NAVY,
          padding: "160px 48px 90px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
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
            What We Do
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
              maxWidth: "820px",
              marginBottom: "24px",
            }}
          >
            Freight and logistics services built around your cargo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.75)",
              maxWidth: "620px",
              lineHeight: 1.7,
            }}
          >
            From ocean and air freight to warehousing and customs, Green
            Carrier moves your goods with reliability, transparency, and a
            team that treats every shipment as its own.
          </motion.p>
        </div>
      </section>

      {/* Quick nav strip */}
      <section style={{ backgroundColor: "#ffffff", padding: "28px 48px", borderBottom: "1px solid #eee" }}>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: NAVY,
                textDecoration: "none",
                padding: "8px 16px",
                border: `1px solid #dfe6ee`,
                borderRadius: "999px",
              }}
              className="service-pill"
            >
              {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* Service sections */}
      {services.map((s, i) => {
        const meta = serviceMeta[s.slug];
        const Icon = meta.icon;
        const reversed = i % 2 === 1;
        return (
          <section
            id={s.slug}
            key={s.slug}
            style={{
              backgroundColor: reversed ? CREAM : "#ffffff",
              padding: "80px 48px",
              scrollMarginTop: "80px",
            }}
          >
            <div
              style={{
                maxWidth: "1400px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "72px",
                alignItems: "center",
                direction: reversed ? "rtl" : "ltr",
              }}
              className="service-grid"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ direction: "ltr" }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "12px",
                    backgroundColor: NAVY,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                  }}
                >
                  <Icon size={32} color="#ffffff" />
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 700,
                    color: NAVY,
                    marginBottom: "18px",
                  }}
                >
                  {s.title}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#3a4a5c",
                    lineHeight: 1.8,
                    marginBottom: "28px",
                  }}
                >
                  {s.description}
                </p>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "32px" }}>
                  {meta.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontSize: "15px",
                        color: "#2c3a4a",
                        marginBottom: "12px",
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          minWidth: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: GREEN,
                          marginTop: "7px",
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-block",
                    backgroundColor: GREEN,
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: 700,
                    padding: "14px 28px",
                    borderRadius: "4px",
                    textDecoration: "none",
                  }}
                >
                  Request a Quote
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                style={{ direction: "ltr" }}
              >
                <img
                  src={meta.image}
                  alt={s.title}
                  style={{
                    width: "100%",
                    height: "440px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section style={{ backgroundColor: NAVY, padding: "90px 48px" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Not sure which service fits your shipment?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.75)",
              marginBottom: "36px",
              lineHeight: 1.7,
            }}
          >
            Talk to our logistics team and get a tailored recommendation and
            quote within one business day.
          </motion.p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              backgroundColor: GREEN,
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 700,
              padding: "16px 36px",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Contact Our Team
          </Link>
        </div>
      </section>

      <style>{`
        .service-pill:hover { background-color: #1B3A6B; color: #fff !important; border-color: #1B3A6B; }
        @media (max-width: 900px) {
          .service-grid { grid-template-columns: 1fr !important; direction: ltr !important; gap: 32px !important; }
          .service-grid img { height: 280px !important; }
        }
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}
