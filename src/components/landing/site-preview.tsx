"use client";

import * as React from "react";

/**
 * Renders real page content at a fixed desktop width and scales it down to fit
 * its container — so a template preview looks like an actual landing page
 * screenshot (anchored to the top, clipped to the frame). Non-interactive.
 */
export function SitePreview({
  children,
  designWidth = 1280,
}: {
  children: React.ReactNode;
  designWidth?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(0.28);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / designWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-white" aria-hidden>
      <div
        className="pointer-events-none origin-top-left select-none"
        style={{ width: designWidth, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
