"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, Package } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore();
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (items.length === 0) {
    return (
      <main className="flex-1 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <ShoppingCart size={64} className="text-zinc-300 mb-4" />
            <h1 className="text-2xl font-semibold text-zinc-900 mb-2">Your cart is empty</h1>
            <p className="text-sm text-zinc-500 mb-6 max-w-md">
              Browse our industrial products catalog and add items to your cart to get started with procurement.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-[#1d4ed8] px-6 py-3 text-sm font-medium text-white hover:bg-[#1e40af] transition-colors"
            >
              <ArrowLeft size={16} />
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-800 font-medium">Cart</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900">Shopping Cart</h1>
          <button
            onClick={() => { clearCart(); toast.success("Cart cleared"); }}
            className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.vendorId}`}
                className="rounded-lg border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 rounded-md border border-zinc-200 bg-zinc-100 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />
                    ) : (
                      <Package size={24} className="text-zinc-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-900 truncate">{item.productName}</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">Supplier: {item.vendorName}</p>
                      </div>
                      <button
                        onClick={() => { removeItem(item.productId, item.vendorId); toast.success("Item removed"); }}
                        className="flex-shrink-0 rounded p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <div className="text-sm font-bold text-blue-700">₹{item.price}</div>
                      <div className="text-xs text-zinc-500">MOQ: {item.moq} units</div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.vendorId, item.quantity - 1)}
                          disabled={item.quantity <= item.moq}
                          className="rounded border border-zinc-300 p-1 text-zinc-600 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-zinc-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.vendorId, item.quantity + 1)}
                          className="rounded border border-zinc-300 p-1 text-zinc-600 hover:bg-zinc-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-sm font-semibold text-zinc-900 ml-auto">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span>Items ({items.length})</span>
                  <span>₹{totalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>GST (18%)</span>
                  <span>₹{Math.round(totalPrice() * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t border-zinc-200 pt-3 flex justify-between font-semibold text-zinc-900">
                  <span>Total</span>
                  <span>₹{Math.round(totalPrice() * 1.18).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => toast.info("Checkout coming soon!")}
                className="mt-6 h-11 w-full rounded-md bg-[#1d4ed8] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1e40af]"
              >
                Request Quotation
              </button>

              <Link
                href="/products"
                className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-[#1d4ed8] hover:text-[#1e40af] transition-colors"
              >
                <ArrowLeft size={14} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
