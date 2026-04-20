"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:px-8 lg:py-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#1d4ed8]">
          B2B Industrial Marketplace
        </p>
        <h1 className="mt-4 max-w-xl text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
          Source Industrial Products from Verified Vendors
        </h1>
        <p className="mt-5 max-w-xl text-base text-zinc-600 sm:text-lg">
          Compare pricing, MOQ, lead times, and delivery commitments in one place. Connect with trusted suppliers across India.
        </p>

        <form className="mt-8 flex w-full flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-2.5 shadow-sm sm:flex-row">
          <input
            type="text"
            placeholder="Search for plastic granules, metal sheets..."
            className="h-12 w-full rounded-md border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8]/30"
          />
          <button
            type="submit"
            className="h-12 whitespace-nowrap rounded-md bg-[#1d4ed8] px-6 text-sm font-medium text-white hover:bg-[#1e40af]"
          >
            Search
          </button>
        </form>

        <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-700">
          <button type="button" className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 hover:bg-zinc-50 transition-colors cursor-pointer">
            PP Granules
          </button>
          <button type="button" className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 hover:bg-zinc-50 transition-colors cursor-pointer">
            Stainless Sheets
          </button>
          <button type="button" className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 hover:bg-zinc-50 transition-colors cursor-pointer">
            Aluminium Ingots
          </button>
          <button type="button" className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 hover:bg-zinc-50 transition-colors cursor-pointer">
            Copper Rods
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-sm">
          <Image
            src="https://supplyx.info/wp-content/uploads/2023/05/2305_warehousing_solutions_lager_adrian_sulyok_unsplash-scaled-2.jpg"
            alt="Industrial supply chain illustration showing logistics and manufacturing"
            width={1000}
            height={720}
            className="h-72 w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm text-center">
            <p className="text-lg font-bold text-zinc-900">2,300+</p>
            <p className="mt-1 text-xs text-zinc-600">Verified Vendors</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm text-center">
            <p className="text-lg font-bold text-zinc-900">24 hrs</p>
            <p className="mt-1 text-xs text-zinc-600">Quote Turnaround</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm text-center">
            <p className="text-lg font-bold text-zinc-900">180+</p>
            <p className="mt-1 text-xs text-zinc-600">Cities Served</p>
          </div>
        </div>
      </div>
    </section>
  );
}
