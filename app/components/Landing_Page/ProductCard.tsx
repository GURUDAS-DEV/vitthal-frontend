"use client";

import Image from "next/image";

type ProductCardProps = {
  name: string;
  price: string;
  moq: string;
  leadTime: string;
  vendor: string;
  location: string;
  image: string;
};

export function ProductCard(product: ProductCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md">
      <div className="relative h-44 w-full overflow-hidden rounded-md bg-zinc-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-3 space-y-2">
        <h3 className="line-clamp-2 text-base font-semibold text-zinc-900">{product.name}</h3>
        <p className="text-sm font-bold text-[#1d4ed8]">{product.price}</p>
        <div className="space-y-1">
          <p className="text-xs text-zinc-600">{product.moq}</p>
          <p className="text-xs text-zinc-600">{product.leadTime}</p>
        </div>
        <div className="border-t border-zinc-100 pt-2">
          <p className="text-xs font-medium text-zinc-700">{product.vendor}</p>
          <p className="text-xs text-zinc-500">{product.location}</p>
        </div>
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-md border border-[#1d4ed8] px-3 py-2 text-sm font-medium text-[#1d4ed8] hover:bg-[#1d4ed8]/5 transition-colors"
      >
        View Details
      </button>
    </article>
  );
}
