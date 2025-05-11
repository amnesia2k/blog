import type { Metadata } from "next";
import { baseMetadata } from "~@/lib/metadata";
import ContactClientPage from "./ContactClientPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the MetaBlog team. We'd love to hear from you!",
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Contact Us | MetaBlog",
    description:
      "Get in touch with the MetaBlog team. We'd love to hear from you!",
    url: "https://metablog.example.com/contact",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Contact Us | MetaBlog",
    description:
      "Get in touch with the MetaBlog team. We'd love to hear from you!",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClientPage />;
}
