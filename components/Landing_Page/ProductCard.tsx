"use client";

import Image from "next/image";

const FALLBACK_IMAGE = "/placeholder-product.png";

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

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
    <article className="group flex flex-col rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:border-zinc-300 hover:shadow-md overflow-hidden">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
        <Image
          src={isValidUrl(product.image) ? product.image : FALLBACK_IMAGE}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-900">
          {product.name}
        </h3>

        <p className="mt-2 text-base font-bold text-[#1d4ed8]">{product.price}</p>

        <div className="mt-2 space-y-0.5">
          <p className="text-xs text-zinc-500">{product.moq}</p>
          <p className="text-xs text-zinc-500">{product.leadTime}</p>
        </div>

        <div className="mt-3 border-t border-zinc-100 pt-3">
          <p className="text-xs font-semibold text-zinc-700">{product.vendor}</p>
          <p className="mt-0.5 text-xs text-zinc-400">{product.location}</p>
        </div>

        <button
          type="button"
          className="mt-4 w-full rounded-lg border border-[#1d4ed8] px-3 py-2 text-xs font-semibold text-[#1d4ed8] transition-colors hover:bg-[#1d4ed8] hover:text-white"
        >
          View Details
        </button>
      </div>
    </article>
  );
}

