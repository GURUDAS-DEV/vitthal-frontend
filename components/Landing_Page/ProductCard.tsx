"use client";

import Image from "next/image";
import Link from "next/link";

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
  minPrice: number;
  maxPrice: number;
  moq: number;
  sellerCount: number;
  image: string;
  id: string;
};

export function ProductCard(product: ProductCardProps) {
  const priceLabel = product.minPrice === product.maxPrice
    ? `₹${product.minPrice.toLocaleString()}`
    : `₹${product.minPrice.toLocaleString()} – ₹${product.maxPrice.toLocaleString()}`;

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
        {product.sellerCount > 0 && (
          <span className="absolute top-2.5 left-2.5 rounded bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-zinc-600 shadow-sm">
            {product.sellerCount} {product.sellerCount === 1 ? "Supplier" : "Suppliers"}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Product Name */}
        <div>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-900">
            {product.name}
          </h3>
        </div>

        {/* Price Section */}
        <div className="pt-2 border-t border-zinc-100">
          <p className="text-sm text-zinc-500">Price Range</p>
          <p className="text-lg font-bold text-zinc-900">{priceLabel}</p>
        </div>

        {/* Order Details */}
        <div className="pt-2 border-t border-zinc-100 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-500">Minimum Order</span>
            <span className="font-medium text-zinc-700">{product.moq} pieces</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-500">Suppliers</span>
            <span className="font-medium text-emerald-600">
              {product.sellerCount === 1 ? "1 Verified" : `${product.sellerCount} Verified`}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/product/${product.id}`}
          className="mt-auto pt-2 w-full rounded-lg border border-[#1d4ed8] px-3 py-2.5 text-center text-xs font-semibold text-[#1d4ed8] transition-colors hover:bg-[#1d4ed8] hover:text-white"
        >
          Order Now
        </Link>
      </div>
    </article>
  );
}

