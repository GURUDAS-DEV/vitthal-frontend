"use client";

const marketStats = [
  { label: "Active Vendors", value: "2,300+" },
  { label: "Live Product Listings", value: "24,000+" },
  { label: "Avg. Quote Turnaround", value: "< 24 hrs" },
  { label: "Cities Served", value: "180+" },
];

export function MarketStats() {
  return (
    <section className="border-y border-zinc-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-x divide-zinc-100 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
        {marketStats.map((stat) => (
          <article key={stat.label} className="flex flex-col items-center justify-center px-4 py-2 text-center">
            <p className="text-3xl font-bold tracking-tight text-[#1d4ed8]">{stat.value}</p>
            <p className="mt-2 text-xs font-medium text-zinc-500 sm:text-sm">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

