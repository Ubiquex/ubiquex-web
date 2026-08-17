/**
 * Per-medium accent classes.
 *
 * These are whole literal class strings rather than interpolated fragments:
 * Tailwind scans source text, so a constructed name like `text-${tone}` would
 * never be generated. The alpha steps differ per medium because each section
 * was specified with its own values.
 */
export type MediumAccent = {
  /** Eyebrow pill: border, background and text. */
  pill: string;
  /** Second clause of the h2. */
  headline: string;
  /** Check-list icon. */
  check: string;
  /** Active tab: border, background and text. */
  tabActive: string;
};

export const accents: Record<"markdown" | "sdk" | "diagram", MediumAccent> = {
  markdown: {
    pill: "border-brand/28 bg-brand/7 text-brand-bright",
    headline: "text-brand-bright",
    check: "text-brand",
    tabActive: "border-brand/42 bg-brand/16 text-brand-bright",
  },
  sdk: {
    pill: "border-accent/45 bg-accent/14 text-accent",
    headline: "text-accent",
    check: "text-accent",
    tabActive: "border-accent/42 bg-accent/16 text-accent",
  },
  diagram: {
    pill: "border-highlight/45 bg-highlight/13 text-highlight",
    headline: "text-highlight",
    check: "text-highlight",
    tabActive: "border-highlight/42 bg-highlight/15 text-highlight",
  },
};
