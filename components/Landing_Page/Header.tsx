"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-50">
      <div className="border-b border-zinc-100 bg-zinc-50/80">
        <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between px-4 text-xs text-zinc-600 sm:px-6 lg:px-8">
          <p>Trusted by procurement teams in manufacturing and distribution</p>
          <p className="hidden sm:block">support@vitthal.com</p>
        </div>
      </div>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="text-xl font-semibold tracking-tight text-zinc-900">
          Vitthal
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-zinc-700">
            <li>
              <a href="/#categories" className="hover:text-zinc-900 transition-colors">
                Categories
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-zinc-900 transition-colors">
                Products
              </a>
            </li>
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
                href="#categories"
                className="hover:text-zinc-900 transition-colors block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="#featured-products"
                className="hover:text-zinc-900 transition-colors block py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </a>
            </li>
            <li>
              <a href="/Login" className="hover:text-zinc-900 transition-colors block py-2">
                Login
              </a>
            </li>
            <li>
              <a
                href="/Register"
                className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-800 hover:bg-zinc-100 transition-colors inline-block w-full text-center"
              >
                Signup
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
