"use client";

import Image from "next/image";

type Category = {
  title: string;
  description: string;
  suppliers: string;
  products: string;
  image: string;
  alt: string;
  slug: string;
};

const categories: Category[] = [
  {
    title: "Plastic",
    description: "Resins, granules, compounds, and recycled polymers",
    suppliers: "1,140+ suppliers",
    products: "8,200+ products",
    image:
      "/Landing/PlasticManufacturing.webp",
    alt: "Plastic raw materials or granules",
    slug: "plastic",
  },
  {
    title: "Metal",
    description: "Sheets, coils, bars, and fabrication-grade metals",
    suppliers: "920+ suppliers",
    products: "6,500+ products",
    image:
      "/Landing/MetalManufacturing.jpg",
    alt: "Metal sheets or industrial metal materials",
    slug: "metal",
  },
];

export function CategoryBrowse() {
  return (
    <section id="categories" className="border-t border-zinc-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Browse by Category</h2>
          <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
            Explore supplier depth across core industrial categories
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {categories.map((category) => (
            <article
              key={category.title}
              className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-64 w-full bg-zinc-100 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-3 p-6">
                <h3 className="text-lg font-semibold text-zinc-900">{category.title}</h3>
                <p className="text-sm text-zinc-600">{category.description}</p>
                <div className="flex gap-4 text-xs text-zinc-500 py-2 border-t border-zinc-100">
                  <span>{category.suppliers}</span>
                  <span>•</span>
                  <span>{category.products}</span>
                </div>
                <a
                  href={`/products/${category.slug}`}
                  className="inline-block mt-1 rounded-lg bg-[#1d4ed8] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1e40af] transition-colors"
                >
                  Explore {category.title}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

