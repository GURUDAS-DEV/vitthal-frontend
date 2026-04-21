"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type ProductImage = {
  image_url: string;
  is_primary: boolean;
  display_order: number;
};

type ProductImageGalleryProps = {
  images?: ProductImage[];
  productName: string;
};

const FALLBACK_IMAGE =
  "https://www.shutterstock.com/image-photo/neatly-stacked-light-green-gypsum-600nw-2690641841.jpg";

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const orderedImages = useMemo(() => {
    const safeImages = (images ?? []).filter((img) => Boolean(img?.image_url));
    return [...safeImages].sort((a, b) => {
      if (a.is_primary && !b.is_primary) return -1;
      if (!a.is_primary && b.is_primary) return 1;
      return (a.display_order ?? 0) - (b.display_order ?? 0);
    });
  }, [images]);

  const [selectedImage, setSelectedImage] = useState<string>(orderedImages[0]?.image_url || FALLBACK_IMAGE);

  return (
    <div className="lg:w-1/2 p-6 bg-zinc-50/50 border-r border-zinc-100 flex flex-col">
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-zinc-200 shadow-sm">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          className="object-contain p-4 hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {orderedImages.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {orderedImages.map((img, idx) => {
            const isActive = selectedImage === img.image_url;
            return (
              <button
                key={`${img.image_url}-${idx}`}
                type="button"
                onClick={() => setSelectedImage(img.image_url)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 cursor-pointer border transition-colors ${
                  isActive ? "border-blue-600 ring-2 ring-blue-200" : "border-zinc-200 hover:border-blue-500"
                }`}
                aria-label={`View ${productName} image ${idx + 1}`}
              >
                <Image src={img.image_url} alt={`${productName} angle ${idx + 1}`} fill className="object-cover" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}