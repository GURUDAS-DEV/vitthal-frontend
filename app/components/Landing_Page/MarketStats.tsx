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
      <div className="mx-auto flex w-full max-w-7xl items-center justify-around px-4 py-8 sm:px-6 lg:px-8">
        {marketStats.map((stat) => (
          <article key={stat.label} className="text-center">
            <p className="text-2xl font-bold tracking-tight text-zinc-900">{stat.value}</p>
            <p className="mt-2 text-xs text-zinc-600 sm:text-sm">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
