export interface SustainabilityItem {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
}

export const sustainabilityItems: SustainabilityItem[] = [
  {
    slug: "fossil-free-shipping",
    title: "Fossil Free Shipping",
    shortDescription: "Reduce emissions across your entire supply chain.",
    description:
      "Through certified emission reduction solutions, we help you significantly reduce emissions across ocean, air, and road freight — supporting the shift toward renewable energy in global transport.",
  },
  {
    slug: "sustainability-work",
    title: "Our Sustainability Work",
    shortDescription: "How we're building a greener logistics future.",
    description:
      "Sustainability sits at the core of everything we do. From optimized routing to fuel-efficient partnerships, we continuously invest in reducing our environmental footprint.",
  },
  {
    slug: "sustainability-report",
    title: "Sustainability Report",
    shortDescription: "Our latest environmental performance and goals.",
    description:
      "Our annual sustainability report outlines our environmental performance, targets, and the progress we've made toward a more sustainable logistics industry.",
  },
];

export function getSustainabilityBySlug(slug: string) {
  return sustainabilityItems.find((s) => s.slug === slug);
}