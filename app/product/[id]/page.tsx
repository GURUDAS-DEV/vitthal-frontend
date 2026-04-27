import React from "react";
import Link from "next/link";
import { Header, Footer } from "@/components/Landing_Page";
import ProductImageGallery from "@/components/ProductImageGallery";
import {
  ChevronRight,
  Package,
  ShieldCheck,
  Truck,
  Building,
  Mail,
  Info,
  Layers,
} from "lucide-react";

type Vendor = {
  vendor_id: string;
  vendor_name: string;
  company_name: string;
  price: number | string;
  moq: number;
  stock_quantity: number;
};

type ProductImage = {
  image_url: string;
  is_primary: boolean;
  display_order: number;
};

type ProductDetail = {
  product_id: string;
  product_name: string;
  description: string;
  category: string;
  product_type: string;
  specifications: Record<string, string | number>;
  images: ProductImage[];
  vendors: Vendor[];
};

// Next.js 15+ searchParams/params handling
interface PageProps {
  params: Promise<{ id: string }>;
}

const PRODUCTS_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  : "http://localhost:9000/api/products";

async function fetchProduct(id: string): Promise<ProductDetail | null> {
  const url = `${PRODUCTS_BASE_URL}/getProductById/${id}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error("Error fetching individual product:", err);
    return null;
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-zinc-500 mb-8">
            The product you are looking for might have been removed or is temporarily unavailable.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-[#1d4ed8] text-white rounded-lg font-medium hover:bg-blue-800 transition"
          >
            Back to Products
          </Link>
        </main>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <nav className="text-sm flex items-center gap-2 text-zinc-500">
              <Link href="/" className="hover:text-zinc-800 transition-colors">Home</Link>
              <ChevronRight size={14} className="text-zinc-400" />
              <Link href="/products" className="hover:text-zinc-800 transition-colors">All Products</Link>
              <ChevronRight size={14} className="text-zinc-400" />
              <span className="text-zinc-800 font-medium truncate max-w-xs">{product.product_name}</span>
            </nav>
          </div>
        </div>

        {/* Product Overview Section */}
        <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col lg:flex-row">

            {/* Left: Images Array */}
            <ProductImageGallery images={product.images} productName={product.product_name} />

            {/* Right: Core Details */}
            <div className="lg:w-1/2 p-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-4 w-max">
                {product.category}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
                {product.product_name}
              </h1>

              <p className="text-zinc-600 leading-relaxed mb-8">
                {product.description || "No specific description available for this industrial material. Check specifications below."}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl border border-zinc-100 bg-zinc-50/50">
                  <Package className="text-blue-600" size={24} />
                  <div>
                    <p className="text-xs text-zinc-500 font-medium">Available Suppliers</p>
                    <p className="text-sm font-semibold">{product.vendors?.length || 0} Verified</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-zinc-100 bg-zinc-50/50">
                  <ShieldCheck className="text-emerald-500" size={24} />
                  <div>
                    <p className="text-xs text-zinc-500 font-medium">Quality Assurance</p>
                    <p className="text-sm font-semibold">Standard MTC</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-zinc-100 mt-auto">
                <a href="#suppliers-list" className="w-full md:w-auto px-8 py-3.5 bg-[#1d4ed8] text-white text-sm font-semibold rounded-xl hover:bg-blue-800 hover:shadow-lg transition-all text-center flex items-center justify-center gap-2">
                  <Mail size={18} />
                  Request Quotation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Lower Content Grid */}
        <section className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Technical Specifications */}
            <div className="lg:col-span-1 border border-zinc-200 bg-white rounded-2xl shadow-sm h-max overflow-hidden">
              <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50 flex items-center gap-2">
                <Layers size={18} className="text-zinc-500" />
                <h3 className="text-lg font-semibold text-zinc-900">Technical Specs</h3>
              </div>
              <div className="p-6">
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <ul className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <li key={key} className="flex justify-between items-center py-2 border-b border-zinc-50 last:border-0 last:pb-0">
                        <span className="text-sm text-zinc-500 capitalize">{key.replace(/_/g, ' ')}</span>
                        <span className="text-sm font-semibold text-zinc-900 text-right">{String(value)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-8 text-center text-zinc-500 flex flex-col items-center">
                    <Info size={24} className="mb-2 opacity-20" />
                    <p className="text-sm">Detailed specifications pending from manufacturer.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Vendors & Quotation */}
            <div id="suppliers-list" className="lg:col-span-2 border border-zinc-200 bg-white rounded-2xl shadow-sm">
              <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building size={18} className="text-zinc-500" />
                  <h3 className="text-lg font-semibold text-zinc-900">Available Suppliers</h3>
                </div>
                <span className="px-3 py-1 bg-zinc-200 text-zinc-700 text-xs font-bold rounded-full">
                  {product.vendors?.length || 0} found
                </span>
              </div>

              <div className="divide-y divide-zinc-100">
                {product.vendors && product.vendors.length > 0 ? (
                  product.vendors.map((v) => (
                    <div key={v.vendor_id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-zinc-50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-zinc-900 text-lg">{v.company_name}</h4>
                        {/* <p className="text-sm text-zinc-500 mb-2">Verified Supplier ID: {v.vendor_id.substring(0,8)}</p> */}
                        <div className="flex flex-wrap gap-4 mt-3">
                          <div className="bg-white border border-zinc-200 px-3 py-1.5 rounded-lg">
                            <p className="text-xs text-zinc-500 mb-0.5">Indicative Price</p>
                            <p className="text-sm font-bold text-blue-700">₹{v.price || "Contact"}</p>
                          </div>
                          <div className="bg-white border border-zinc-200 px-3 py-1.5 rounded-lg">
                            <p className="text-xs text-zinc-500 mb-0.5">Min. Order (MOQ)</p>
                            <p className="text-sm font-semibold text-zinc-800">{v.moq || 1} units</p>
                          </div>
                          <div className="bg-white border border-zinc-200 px-3 py-1.5 rounded-lg">
                            <p className="text-xs text-zinc-500 mb-0.5">Stock Capacity</p>
                            <p className="text-sm font-semibold text-zinc-800">{v.stock_quantity || "Check"} limits</p>
                          </div>
                        </div>
                      </div>

                      <button className="w-full md:w-auto mt-2 md:mt-0 px-6 py-3 border border-[#1d4ed8] text-[#1d4ed8] font-semibold text-sm rounded-xl hover:bg-[#1d4ed8] hover:text-white transition-colors flex items-center justify-center gap-2">
                        <Mail size={16} />
                        Get Quote
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center flex flex-col items-center justify-center">
                    <Truck size={48} className="text-zinc-200 mb-4" />
                    <h4 className="text-lg font-medium text-zinc-900 mb-1">No vendors matched</h4>
                    <p className="text-zinc-500 text-sm max-w-sm">We are currently sourcing verified suppliers for this specific requirement. Check back later or contact support.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>

    </div>
  );
}