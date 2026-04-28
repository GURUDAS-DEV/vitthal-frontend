"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductImageGallery from "@/components/ProductImageGallery";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import {
  ChevronRight,
  Package,
  ShieldCheck,
  Truck,
  Building,
  ShoppingCart,
  Plus,
  Minus,
  Info,
  Layers,
  BadgeCheck,
  Star,
  ArrowRight,
  Loader2,
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

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const addItem = useCartStore((s) => s.addItem);
  const fetchCart = useCartStore((s) => s.fetchCart);
  const totalItems = useCartStore((s) => s.items.length);
  const [addingVendorId, setAddingVendorId] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      const data = await fetchProduct(id);
      setProduct(data);
      if (data?.vendors) {
        const initialQuantities: Record<string, number> = {};
        data.vendors.forEach((v) => {
          initialQuantities[v.vendor_id] = v.moq || 1;
        });
        setQuantities(initialQuantities);
      }
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  const updateQuantity = (vendorId: string, moq: number, delta: number, stock: number) => {
    setQuantities((prev) => {
      const newQty = (prev[vendorId] || moq) + delta;
      if (newQty < moq) {
        toast.error(`Minimum order quantity is ${moq}`);
        return prev;
      }
      if (stock && newQty > stock) {
        toast.error(`Maximum available stock is ${stock}`);
        return prev;
      }
      return { ...prev, [vendorId]: newQty };
    });
  };

  const handleAddToCart = async (vendor: Vendor) => {
    if (!product) return;
    const qty = quantities[vendor.vendor_id] || vendor.moq || 1;
    
    setAddingVendorId(vendor.vendor_id);
    
    const success = await addItem({
      productId: product.product_id,
      productName: product.product_name,
      image: product.images?.find((img) => img.is_primary)?.image_url || product.images?.[0]?.image_url || "",
      price: typeof vendor.price === "string" ? parseFloat(vendor.price) || 0 : vendor.price || 0,
      moq: vendor.moq || 1,
      quantity: qty,
      vendorId: vendor.vendor_id,
      vendorName: vendor.company_name,
    });
    
    setAddingVendorId(null);
    
    if (success) {
      toast.success(`Added ${qty} units to cart from ${vendor.company_name}`);
      await fetchCart();
    } else {
      toast.error("Failed to add item. Please login.");
    }
  };

  const getPriceRange = () => {
    if (!product?.vendors?.length) return null;
    const prices = product.vendors
      .map((v) => (typeof v.price === "string" ? parseFloat(v.price) : v.price))
      .filter((p): p is number => !!p && !isNaN(p));
    if (!prices.length) return null;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `₹${min.toLocaleString()}` : `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-zinc-200 rounded-lg mb-4"></div>
          <div className="h-6 w-48 bg-zinc-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-zinc-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <Package size={64} className="text-zinc-200 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-zinc-500 mb-8">
            The product you are looking for might have been removed or is temporarily unavailable.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-[#1d4ed8] text-white rounded-lg font-medium hover:bg-blue-800 transition"
          >
            Browse Products
          </Link>
        </main>
      </div>
    );
  }

  const priceRange = getPriceRange();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      <main className="flex-1">
        {/* Breadcrumbs & Cart Summary */}
        <div className="bg-white border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <nav className="text-sm flex items-center gap-2 text-zinc-500">
                <Link href="/" className="hover:text-zinc-800 transition-colors">Home</Link>
                <ChevronRight size={14} className="text-zinc-400" />
                <Link href="/products" className="hover:text-zinc-800 transition-colors">Products</Link>
                <ChevronRight size={14} className="text-zinc-400" />
                <span className="text-zinc-800 font-medium truncate max-w-xs">{product.product_name}</span>
              </nav>
              <Link 
                href="/cart" 
                className="flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors"
              >
                <ShoppingCart size={18} className="text-zinc-600" />
                <span className="text-sm font-medium text-zinc-700">Cart ({totalItems})</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Product Overview Section */}
        <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col lg:flex-row">

            {/* Left: Images Array */}
            <div className="lg:w-1/2 bg-zinc-50/50 p-4 lg:p-6 min-h-[400px] lg:min-h-[600px]">
              <ProductImageGallery images={product.images} productName={product.product_name} />
            </div>

            {/* Right: Core Details */}
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col">
              {/* Category & Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full">
                  {product.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                  <BadgeCheck size={12} />
                  Verified Product
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 mb-3">
                {product.product_name}
              </h1>

              {/* Price Range Display */}
              {priceRange && (
                <div className="mb-4">
                  <p className="text-sm text-zinc-500 mb-1">Price Range (per unit)</p>
                  <p className="text-2xl font-bold text-[#1d4ed8]">{priceRange}</p>
                  <p className="text-xs text-zinc-400 mt-1">* Prices vary by supplier. MOQ applies.</p>
                </div>
              )}

              <p className="text-zinc-600 leading-relaxed mb-6">
                {product.description || "Industrial grade material with verified quality standards. Multiple suppliers available with competitive pricing."}
              </p>

              {/* B2B Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="flex flex-col items-center p-3 rounded-xl border border-zinc-100 bg-zinc-50/50 text-center">
                  <Building className="text-blue-600 mb-2" size={22} />
                  <p className="text-xs text-zinc-500 font-medium">{product.vendors?.length || 0} Suppliers</p>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl border border-zinc-100 bg-zinc-50/50 text-center">
                  <ShieldCheck className="text-emerald-500 mb-2" size={22} />
                  <p className="text-xs text-zinc-500 font-medium">Quality Assured</p>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl border border-zinc-100 bg-zinc-50/50 text-center">
                  <Truck className="text-orange-500 mb-2" size={22} />
                  <p className="text-xs text-zinc-500 font-medium">Bulk Delivery</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-zinc-100 mt-auto">
                <a 
                  href="#vendors-list" 
                  className="flex-1 px-6 py-3.5 bg-[#1d4ed8] text-white text-sm font-semibold rounded-xl hover:bg-blue-800 hover:shadow-lg transition-all text-center flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  View Suppliers & Add to Cart
                </a>
                <Link 
                  href="/cart"
                  className="px-6 py-3.5 border-2 border-zinc-200 text-zinc-700 text-sm font-semibold rounded-xl hover:border-zinc-300 hover:bg-zinc-50 transition-all text-center flex items-center justify-center gap-2"
                >
                  Go to Cart
                  <ArrowRight size={16} />
                </Link>
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
                <h3 className="text-lg font-semibold text-zinc-900">Technical Specifications</h3>
              </div>
              <div className="p-6">
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <ul className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <li key={key} className="flex justify-between items-start py-2 border-b border-zinc-50 last:border-0">
                        <span className="text-sm text-zinc-500 capitalize">{key.replace(/_/g, ' ')}</span>
                        <span className="text-sm font-semibold text-zinc-900 text-right max-w-[60%]">{String(value)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-8 text-center text-zinc-500 flex flex-col items-center">
                    <Info size={24} className="mb-2 opacity-20" />
                    <p className="text-sm">Specifications available on request</p>
                  </div>
                )}
              </div>
            </div>

            {/* Vendors & Add to Cart */}
            <div id="vendors-list" className="lg:col-span-2 border border-zinc-200 bg-white rounded-2xl shadow-sm">
              <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building size={18} className="text-zinc-500" />
                  <h3 className="text-lg font-semibold text-zinc-900">Compare Suppliers & Order</h3>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                  {product.vendors?.length || 0} suppliers
                </span>
              </div>

              <div className="divide-y divide-zinc-100">
                {product.vendors && product.vendors.length > 0 ? (
                  product.vendors.map((v) => {
                    const qty = quantities[v.vendor_id] || v.moq || 1;
                    const price = typeof v.price === "string" ? parseFloat(v.price) || 0 : v.price || 0;
                    const totalPrice = price * qty;
                    
                    return (
                      <div key={v.vendor_id} className="p-5 hover:bg-zinc-50/50 transition-colors">
                        <div className="flex flex-col lg:flex-row gap-4">
                          {/* Supplier Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-zinc-900">{v.company_name}</h4>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs rounded-full">
                                <Star size={10} fill="currentColor" />
                                Verified
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-3 mb-3">
                              <div className="bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-lg">
                                <p className="text-xs text-zinc-500">Unit Price</p>
                                <p className="text-sm font-bold text-[#1d4ed8]">₹{v.price || "Contact"}</p>
                              </div>
                              <div className="bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-lg">
                                <p className="text-xs text-zinc-500">MOQ</p>
                                <p className="text-sm font-semibold text-zinc-800">{v.moq || 1} units</p>
                              </div>
                              <div className="bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-lg">
                                <p className="text-xs text-zinc-500">Stock</p>
                                <p className="text-sm font-semibold text-zinc-800">{v.stock_quantity || "N/A"}</p>
                              </div>
                            </div>
                          </div>

                          {/* Quantity & Add to Cart */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:w-auto">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-lg px-2 py-1.5">
                              <button
                                onClick={() => updateQuantity(v.vendor_id, v.moq || 1, -1, v.stock_quantity)}
                                className="p-1.5 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded transition-colors disabled:opacity-40"
                                disabled={qty <= (v.moq || 1)}
                              >
                                <Minus size={16} />
                              </button>
                              <div className="flex flex-col items-center min-w-[60px]">
                                <input
                                  type="number"
                                  min={v.moq || 1}
                                  max={v.stock_quantity || undefined}
                                  value={qty}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val) && val >= (v.moq || 1)) {
                                      if (!v.stock_quantity || val <= v.stock_quantity) {
                                        setQuantities((prev) => ({ ...prev, [v.vendor_id]: val }));
                                      } else {
                                        toast.error(`Maximum available stock is ${v.stock_quantity}`);
                                      }
                                    }
                                  }}
                                  onBlur={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (isNaN(val) || val < (v.moq || 1)) {
                                      setQuantities((prev) => ({ ...prev, [v.vendor_id]: v.moq || 1 }));
                                      toast.error(`Minimum order quantity is ${v.moq || 1}`);
                                    }
                                  }}
                                  className="w-[60px] text-center text-sm font-semibold text-zinc-900 bg-transparent outline-none border-b border-zinc-300 focus:border-[#1d4ed8] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="text-[10px] text-zinc-400">units</span>
                              </div>
                              <button
                                onClick={() => updateQuantity(v.vendor_id, v.moq || 1, 1, v.stock_quantity)}
                                className="p-1.5 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Total & Add Button */}
                            <div className="flex flex-col items-end gap-2">
                              {price > 0 && (
                                <p className="text-sm font-semibold text-zinc-900">
                                  Total: ₹{totalPrice.toLocaleString()}
                                </p>
                              )}
                              <button 
                                onClick={() => handleAddToCart(v)}
                                disabled={addingVendorId === v.vendor_id}
                                className="px-5 py-2.5 bg-[#1d4ed8] text-white text-sm font-semibold rounded-lg hover:bg-blue-800 hover:shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                              >
                                {addingVendorId === v.vendor_id ? (
                                  <Loader2 size={16} className="animate-spin" />
                                ) : (
                                  <ShoppingCart size={16} />
                                )}
                                {addingVendorId === v.vendor_id ? "Adding..." : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-12 text-center flex flex-col items-center justify-center">
                    <Truck size={48} className="text-zinc-200 mb-4" />
                    <h4 className="text-lg font-medium text-zinc-900 mb-1">No suppliers available</h4>
                    <p className="text-zinc-500 text-sm max-w-sm">We&apos;re actively sourcing verified suppliers for this product. Check back soon or contact our team.</p>
                  </div>
                )}
              </div>
              
              {/* Cart CTA Footer */}
              {product.vendors?.length > 0 && (
                <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
                  <p className="text-sm text-zinc-500">
                    {totalItems > 0 ? `${totalItems} items in your cart` : "Add items to proceed"}
                  </p>
                  <Link 
                    href="/cart"
                    className="px-5 py-2 bg-zinc-900 text-white text-sm font-semibold rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2"
                  >
                    View Cart & Checkout
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>

          </div>
        </section>
      </main>
      
    </div>
  );
}