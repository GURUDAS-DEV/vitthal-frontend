"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface ProductFiltersProps {
  hideCategory?: boolean;
}

export function ProductFilters({ hideCategory = false }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [productType, setProductType] = useState(searchParams.get("productType") || "");

  // Debounced Search Update
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl(search, category, productType);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    updateUrl(search, val, productType);
  };

  const handleTypeChange = (val: string) => {
    setProductType(val);
    updateUrl(search, category, val);
  };

  const updateUrl = (s: string, c: string, p: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (s) params.set("search", s);
    else params.delete("search");
    
    // If hideCategory is true, we shouldn't modify the category query param because it's managed by the URL path
    if (!hideCategory) {
      if (c) params.set("category", c);
      else params.delete("category");
    }
    
    if (p) params.set("productType", p);
    else params.delete("productType");

    // Reset to page 1 when filtering
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name..."
          className="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-colors text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3 w-full md:w-auto">
        {!hideCategory && (
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="border border-zinc-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 text-zinc-700 min-w-[140px] transition-colors text-sm"
          >
            <option value="">All Categories</option>
            <option value="plastic">Plastic</option>
            <option value="metal">Metal</option>
          </select>
        )}

        <select
          value={productType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="border border-zinc-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 text-zinc-700 min-w-[140px] transition-colors text-sm"
        >
          <option value="">All Types</option>
          <option value="hdpe">HDPE</option>
          <option value="pet">PET</option>
          <option value="aluminum">Aluminum</option>
          <option value="steel">Steel</option>
        </select>
      </div>
    </div>
  );
}
