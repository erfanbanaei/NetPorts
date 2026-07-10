import {
  getAllProtocolSlugs,
  getFullName,
  getProtocolBySlug,
  getRelatedProtocols,
  nameToSlug,
  protocolsData,
} from "@/lib/protocols";

import { Metadata } from "next";
import ProtocolDetailClient from "./ProtocolDetailClient";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

// ── Static Generation ──
export async function generateStaticParams() {
  return getAllProtocolSlugs().map((slug) => ({ slug }));
}

// ── Dynamic Metadata ──
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const protocol = protocolsData.find((p) => nameToSlug(p.name) === slug);
  if (!protocol) return { title: 'Protocol Not Found' };

  const title = `${protocol.name} Port ${protocol.port} | مرجع پورت‌های شبکه`;
  const description = protocol.description.fa.substring(0, 160);
  const url = `https://netports.ir/protocol/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url }, // Canonical URL
    openGraph: {
      title,
      description,
      url,
      siteName: 'NetPorts',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }], // یک تصویر عمومی در public قرار دهید
      locale: 'fa_IR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}
// ── Page Component ──
export default async function ProtocolDetailPage({ params }: Props) {
  const { slug } = await params;
  const protocol = getProtocolBySlug(slug);

  if (!protocol) {
    notFound();
  }

  const relatedProtocols = getRelatedProtocols(protocol, 4);

  return (
    <ProtocolDetailClient
      protocol={protocol}
      relatedProtocols={relatedProtocols}
    />
  );
}