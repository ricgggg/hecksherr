export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
}

export const services: ServiceItem[] = [
  {
    slug: "sea-freight",
    title: "Sea Freight",
    shortDescription: "Reliable ocean freight for cargo of any size.",
    description:
      "Our sea freight solutions cover FCL and LCL shipments across every major trade lane. With strong carrier partnerships and a dedicated operations team, we make sure your cargo moves efficiently, safely, and on schedule — wherever it needs to go.",
  },
  {
    slug: "air-freight",
    title: "Air Freight",
    shortDescription: "Fast, dependable air freight for time-critical cargo.",
    description:
      "When speed matters, our air freight network connects you to destinations worldwide. We manage everything from booking to customs, giving you a fast and transparent way to move urgent shipments.",
  },
  {
    slug: "road-freight",
    title: "Road Freight",
    shortDescription: "Flexible road transport across regions.",
    description:
      "Our road freight services provide flexible, door-to-door transport solutions. Whether it's cross-border distribution or last-mile delivery, our network keeps your goods moving efficiently.",
  },
  {
    slug: "project-logistics",
    title: "Project Logistics",
    shortDescription: "Tailored solutions for oversized and complex cargo.",
    description:
      "Some cargo doesn't fit standard shipping methods. Our project logistics team specializes in planning and executing complex, oversized, and heavy-lift shipments from start to finish.",
  },
  {
    slug: "contract-logistics",
    title: "Contract Logistics",
    shortDescription: "Warehousing and supply chain management.",
    description:
      "From warehousing to inventory management, our contract logistics services help you streamline your supply chain and reduce operational complexity.",
  },
  {
    slug: "value-added-services",
    title: "Value-Added Services",
    shortDescription: "Additional support to simplify your shipping.",
    description:
      "Customs clearance, cargo insurance, documentation support — our value-added services are designed to remove friction from your shipping process.",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}