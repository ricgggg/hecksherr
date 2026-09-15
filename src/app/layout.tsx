import "./globals.css";
import type { Metadata } from "next";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: "Hecksher — Services to Shipping Since 1797",
  description:
    "Hecksher offers world-class sea freight, air freight, road freight, project logistics, and global shipping solutions. Your trusted shipping partner worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}