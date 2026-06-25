import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

/** Clickable example chip with a small accent arrow. */
export function Chip({ label, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {label}
      <ArrowUpRight className="h-3.5 w-3.5 text-primary opacity-70 transition-opacity group-hover:opacity-100" />
    </button>
  );
}
