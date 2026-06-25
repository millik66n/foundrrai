import * as React from "react";

import { cn } from "@/lib/utils";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Show a small accent dot before the label. */
  dot?: boolean;
}

/** Small label chip used for eyebrows and badges. */
export function Pill({ className, dot = false, children, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {dot ? (
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.18)]" />
      ) : null}
      {children}
    </span>
  );
}
