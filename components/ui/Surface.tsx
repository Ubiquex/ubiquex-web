import type { ReactNode } from "react";

export type SurfaceTone = "base" | "raised";

type SurfaceProps = {
  tone: SurfaceTone;
  /** Hairline at the top edge. Carried by every section except the first. */
  seam?: boolean;
  /** Radial bloom at the top edge. The timeline only. */
  glow?: boolean;
  children: ReactNode;
};

/**
 * One band of the page.
 *
 * Sections do not set their own background: they are wrapped in a Surface at
 * the composition point, so the alternation is decided in one place and cannot
 * drift when sections are reordered.
 *
 * `raised` also carries the .surface-raised class, which rebinds --panel-bg and
 * --panel-border. That is how panels sitting on a raised band get lifted
 * without any section overriding colours itself.
 */
export function Surface({
  tone,
  seam = true,
  glow = false,
  children,
}: SurfaceProps) {
  const classes = [
    tone === "raised" ? "surface-raised bg-surface-1" : "bg-ink",
    seam ? "border-t border-seam" : "",
    glow ? "timeline-glow relative overflow-hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}

export default Surface;
