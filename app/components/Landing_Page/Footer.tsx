"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div>
            <h3 className="text-base font-semibold text-zinc-900">Vitthal</h3>
            <p className="mt-4 text-sm text-zinc-600 leading-relaxed">
              B2B industrial sourcing and procurement marketplace connecting manufacturers with verified suppliers.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Product</h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li>
                <a href="#" className="hover:text-zinc-900 transition-colors">
                  Browse Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-900 transition-colors">
                  Featured Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-900 transition-colors">
                  Bulk Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-900 transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li>
                <a href="#" className="hover:text-zinc-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-900 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-900 transition-colors">
                  Buyer Protection
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-900 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Support</h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li>
                <a href="#" className="hover:text-zinc-900 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-900 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-900 transition-colors">
                  Vendor Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-zinc-900 transition-colors">
                  Report Dispute
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Get in Touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li>
                <a href="mailto:support@vitthal.com" className="hover:text-zinc-900 transition-colors break-all">
                  support@vitthal.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="hover:text-zinc-900 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li>
                <p className="text-xs text-zinc-500">Available 24/7 for support</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-600">&copy; {currentYear} Vitthal. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-zinc-600">
              <a href="#" className="hover:text-zinc-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-zinc-900 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-zinc-900 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
