import { services, getServiceBySlug } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
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
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=80",
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
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80",
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
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80",
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
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=1600&q=80",
    features: [
      "Engineering-led planning for oversized and heavy-lift cargo",
      "Specialized equipment sourcing \u2014 flat racks, heavy-lift vessels, cranes",
      "Route surveys and permits for out-of-gauge shipments",
      "Single point of contact from feasibility study to delivery",
    ],
  },
  "contract-logistics": {
    icon: WarehouseIcon,
    image:
      "https://images.unsplash.com/photo-1553413077-190083f66cef?w=1600&q=80",
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
      "https://images.unsplash.com/photo-1554774853-b415df9eeb92?w=1600&q=80",
    features: [
      "Customs brokerage and compliance across every trade lane",
      "Comprehensive cargo insurance options",
      "Documentation support to keep shipments moving without delay",
      "Trade advisory to help you navigate changing regulations",
    ],
  },
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return notFound();

  const meta = serviceMeta[service.slug];
  const Icon = meta.icon;
  const others = services.filter((s) => s.slug !== service.slug);

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
            backgroundImage: `url('${meta.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div style={{ position: "relative", maxWidth: "1000px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "16px",
            }}
          >
            <Link
              href="/our-services"
              style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
            >
              Our Services
            </Link>{" "}
            / {service.title}
          </p>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "12px",
              backgroundColor: GREEN,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <Icon size={32} color="#ffffff" />
          </div>
          <h1
            style={{
              fontSize: "clamp(34px, 4.5vw, 56px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "20px",
            }}
          >
            {service.title}
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "700px",
              lineHeight: 1.7,
            }}
          >
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 48px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "64px",
            alignItems: "start",
          }}
          className="detail-grid"
        >
          <div>
            <p
              style={{
                fontSize: "17px",
                color: "#3a4a5c",
                lineHeight: 1.9,
                marginBottom: "32px",
              }}
            >
              {service.description}
            </p>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: NAVY,
                marginBottom: "20px",
              }}
            >
              What&apos;s included
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {meta.features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "15px",
                    color: "#2c3a4a",
                    marginBottom: "14px",
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
                marginTop: "32px",
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
          </div>
          <img
            src={meta.image}
            alt={service.title}
            style={{
              width: "100%",
              height: "420px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      </section>

      {/* Related services */}
      <section style={{ backgroundColor: CREAM, padding: "70px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: NAVY,
              marginBottom: "28px",
            }}
          >
            Other services
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
            className="related-grid"
          >
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/our-services/${o.slug}`}
                style={{
                  display: "block",
                  padding: "24px",
                  backgroundColor: "#ffffff",
                  borderRadius: "6px",
                  textDecoration: "none",
                  color: NAVY,
                }}
              >
                <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>
                  {o.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.5 }}>
                  {o.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}
