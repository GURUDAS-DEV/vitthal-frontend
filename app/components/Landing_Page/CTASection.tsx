"use client";

export function CTASection() {
  return (
    <section className="border-y border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <h3 className="text-xl font-semibold text-zinc-900">Need bulk pricing for recurring orders?</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Create one RFQ and receive competitive quotes from verified vendors instantly.
          </p>
        </div>
        <button
          type="button"
          className="whitespace-nowrap rounded-md bg-[#1d4ed8] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#1e40af] transition-colors"
        >
          Create RFQ
        </button>
      </div>
    </section>
  );
}
