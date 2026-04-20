"use client";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeading({ title, subtitle, action }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{subtitle}</p> : null}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
