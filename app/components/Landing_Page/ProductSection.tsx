"use client";

import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";

type Product = {
  name: string;
  price: string;
  moq: string;
  leadTime: string;
  vendor: string;
  location: string;
  image: string;
};

interface ProductSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  showViewAll?: boolean;
  showMore?: boolean;
}

export function ProductSection({
  id,
  title,
  subtitle,
  products,
  showViewAll = false,
  showMore = false,
}: ProductSectionProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        title={title}
        subtitle={subtitle}
        action={
          showViewAll || showMore ? (
            <a href="#" className="text-sm font-medium text-[#1d4ed8] hover:text-[#1e40af]">
              {showMore ? "Show More" : "View All"}
            </a>
          ) : null
        }
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </section>
  );
}
