"use client";

import { SectionHeading } from "./SectionHeading";

const trustPoints = [
  {
    title: "Verified Vendors",
    detail: "KYC-checked suppliers with consistent trade records and buyer ratings",
  },
  {
    title: "Transparent Pricing",
    detail: "Compare quotes side-by-side with clear MOQ and lead times",
  },
  {
    title: "Fast Procurement",
    detail: "Centralized RFQ workflow for faster vendor finalization",
  },
  {
    title: "Wide Supplier Network",
    detail: "2,300+ verified suppliers across 180+ cities in India",
  },
  {
    title: "Bulk Discounts",
    detail: "Access competitive bulk pricing and recurring order agreements",
  },
  {
    title: "Reliable Support",
    detail: "24/7 customer support for procurement queries and disputes",
  },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading title="Why Choose Vitthal" subtitle="Built for enterprise procurement teams" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trustPoints.map((point) => (
          <article
            key={point.title}
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-base font-semibold text-zinc-900">{point.title}</h3>
            <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{point.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
