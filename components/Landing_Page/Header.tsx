"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Menu, X, ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, isLoading, fetchUser, logout } = useAuthStore();
  const totalItems = useCartStore((s) => s.totalItems());
  const router = useRouter();

  useLayoutEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useLayoutEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    setProfileDropdown(false);
    toast.success("Logged out successfully");
    router.push("/");
  }

  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-50">
      <div className="border-b border-zinc-100 bg-zinc-50/80">
        <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between px-4 text-xs text-zinc-600 sm:px-6 lg:px-8">
          <p>Trusted by procurement teams in manufacturing and distribution</p>
          <p className="hidden sm:block">support@vitthal.com</p>
        </div>
      </div>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="text-xl font-semibold tracking-tight text-zinc-900">
          Vitthal
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block font-body">
          <ul className="flex items-center gap-6 text-sm font-medium text-zinc-700">
            <li>
              <a href="/products" className="hover:text-zinc-900 transition-colors">
                Products
              </a>
            </li>
            <li>
              <a href="/#categories" className="hover:text-zinc-900 transition-colors">
                Categories
              </a>
            </li>
            <li>
              <a href="/#aboutUs" className="hover:text-zinc-900 transition-colors">
                About us
              </a>
            </li>
            <li>
              <a href="/#contacts" className="hover:text-zinc-900 transition-colors">
                Contact us
              </a>
            </li>

            {isLoading ? (
              // Skeleton loaders for desktop auth buttons
              <>
                <li className="animate-pulse">
                  <div className="h-5 w-16 bg-zinc-200 rounded"></div>
                </li>
                <li className="animate-pulse">
                  <div className="h-8 w-20 bg-zinc-200 rounded"></div>
                </li>
              </>
            ) : isAuthenticated ? (
              <>
                <li>
                  <Link href="/cart" className="hover:text-zinc-900 transition-colors relative flex items-center gap-1">
                    <ShoppingCart size={18} />
                    Cart
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#1d4ed8] text-[10px] font-bold text-white">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="relative">
                  <div ref={dropdownRef}>
                    <button
                      onClick={() => setProfileDropdown(!profileDropdown)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d4ed8] text-white">
                        <User size={16} />
                      </div>
                      <span className="text-sm font-medium text-zinc-700">{user?.username || "Account"}</span>
                      <ChevronDown size={16} className={`text-zinc-400 transition-transform ${profileDropdown ? "rotate-180" : ""}`} />
                    </button>
                    {profileDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-zinc-200 bg-white py-2 shadow-xl z-50">
                        <div className="px-4 py-3 border-b border-zinc-100">
                          <p className="text-sm font-medium text-zinc-900">{user?.username || "User"}</p>
                          <p className="text-xs text-zinc-500 truncate">{user?.email || ""}</p>
                        </div>
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <User size={18} className="text-zinc-400" />
                          My Profile
                        </Link>
                        <Link
                          href="/cart"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <ShoppingCart size={18} className="text-zinc-400" />
                          My Cart
                        </Link>
                        <div className="border-t border-zinc-100 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut size={18} />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login" className="hover:text-zinc-900 transition-colors">
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    className="rounded-md border border-zinc-300 px-3 py-1.5 text-zinc-800 hover:bg-zinc-100 transition-colors"
                  >
                    Signup
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-zinc-700 hover:text-zinc-900 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-zinc-200 bg-white md:hidden">
          <ul className="flex flex-col px-4 py-4 space-y-3 text-sm font-medium text-zinc-700">
            <li>
              <a
                href="/products"
                className="hover:text-zinc-900 transition-colors block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/#categories"
                className="hover:text-zinc-900 transition-colors block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </a>
            </li>

            {isLoading ? (
              // Mobile skeleton loaders
              <>
                <li className="animate-pulse py-2">
                  <div className="h-5 w-20 bg-zinc-200 rounded"></div>
                </li>
                <li className="animate-pulse py-2">
                  <div className="h-10 w-full bg-zinc-200 rounded border border-zinc-300"></div>
                </li>
                <li className="animate-pulse py-2">
                  <div className="h-10 w-full bg-zinc-200 rounded border border-zinc-300"></div>
                </li>
              </>
            ) : isAuthenticated ? (
              <>
                <li>
                  <Link
                    href="/cart"
                    className="hover:text-zinc-900 transition-colors flex items-center gap-2 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart size={18} /> Cart
                    {totalItems > 0 && (
                      <span className="rounded-full bg-[#1d4ed8] px-2 py-0.5 text-[10px] font-bold text-white">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="hover:text-zinc-900 transition-colors flex items-center gap-2 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={18} /> Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2 py-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login" className="hover:text-zinc-900 transition-colors block py-2">
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-800 hover:bg-zinc-100 transition-colors inline-block w-full text-center"
                  >
                    Signup
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
