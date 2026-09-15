import { sustainabilityItems, getSustainabilityBySlug } from "@/data/sustainability";
import { notFound } from "next/navigation";
import Link from "next/link";

const NAVY = "#1B3A6B";
const GREEN = "#2D6A4F";
const CREAM = "#E8EDD9";

const itemMeta: Record<
  string,
  { image: string; highlights: string[] }
> = {
  "fossil-free-shipping": {
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=80",
    highlights: [
      "Certified emission-reduction fuel used across partner ocean carriers",
      "Verified, third-party audited carbon accounting for every shipment",
      "Available on all major container trade lanes at no schedule impact",
      "Detailed emissions certificates provided for client ESG reporting",
    ],
  },
  "sustainability-work": {
    image:
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1600&q=80",
    highlights: [
      "Route and mode optimization to cut unnecessary fuel burn",
      "Partnerships with carriers investing in LNG and hydrogen fleets",
      "Warehouse operations powered by renewable electricity where available",
      "Employee programs supporting community and environmental initiatives",
    ],
  },
  "sustainability-report": {
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80",
    highlights: [
      "Year-over-year emissions data across sea, air, and road freight",
      "Progress against our published 2030 reduction targets",
      "Independent third-party verification of reported figures",
      "Downloadable summary for client sustainability disclosures",
    ],
  },
};

export function generateStaticParams() {
  return sustainabilityItems.map((s) => ({ slug: s.slug }));
}

export default function SustainabilityDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = getSustainabilityBySlug(params.slug);
  if (!item) return notFound();

  const meta = itemMeta[item.slug];
  const others = sustainabilityItems.filter((s) => s.slug !== item.slug);

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
            backgroundImage: `url('${meta?.image}')`,
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
              href="/sustainability"
              style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
            >
              Sustainability
            </Link>{" "}
            / {item.title}
          </p>
          <h1
            style={{
              fontSize: "clamp(34px, 4.5vw, 56px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "20px",
            }}
          >
            {item.title}
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "700px",
              lineHeight: 1.7,
            }}
          >
            {item.shortDescription}
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
              {item.description}
            </p>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: NAVY,
                marginBottom: "20px",
              }}
            >
              What this means for your cargo
            </h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {meta?.highlights.map((h) => (
                <li
                  key={h}
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
                  {h}
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
              Talk to Our Team
            </Link>
          </div>
          <img
            src={meta?.image}
            alt={item.title}
            style={{
              width: "100%",
              height: "420px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      </section>

      {/* Related */}
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
            Explore more
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}
            className="related-grid"
          >
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/sustainability/${o.slug}`}
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
          .related-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}
