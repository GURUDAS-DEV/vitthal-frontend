"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const buildHref = (page: number) => {
    const separator = basePath.includes("?") ? "&" : "?";
    return `${basePath}${separator}page=${page}`;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={buildHref(currentPage - 1)}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
          currentPage === 1
            ? "border-zinc-200 text-zinc-300 pointer-events-none"
            : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </Link>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="h-10 w-10 flex items-center justify-center text-sm text-zinc-400">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(page as number)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
              currentPage === page
                ? "border-[#1d4ed8] bg-[#1d4ed8] text-white"
                : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400"
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Link>
        )
      )}

      <Link
        href={buildHref(currentPage + 1)}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? "border-zinc-200 text-zinc-300 pointer-events-none"
            : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400"
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </Link>
    </nav>
  );
}
