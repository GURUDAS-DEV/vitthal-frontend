"use client";

export function CTASection() {
  return (
    <section className="bg-[#1d4ed8]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <h3 className="text-xl font-semibold text-white sm:text-2xl">
            Need bulk pricing for recurring orders?
          </h3>
          <p className="mt-2 max-w-lg text-sm text-blue-100">
            Create one RFQ and receive competitive quotes from verified vendors within 24 hours.
            No middlemen, no hidden charges.
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-wrap gap-3">
          <button
            type="button"
            className="whitespace-nowrap rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[#1d4ed8] transition-colors hover:bg-blue-50"
          >
            Create RFQ
          </button>
          <button
            type="button"
            className="whitespace-nowrap rounded-lg border border-white/40 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

