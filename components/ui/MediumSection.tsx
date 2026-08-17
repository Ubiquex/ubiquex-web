import type { ReactNode } from "react";
import type { MediumAccent } from "./accents";

/*
 * The shell every medium section shares: a centred header, and a stage where
 * the description card overlaps the code window's right edge.
 *
 * DOM order is header -> window -> description, which is both the correct
 * reading order and the correct stacked mobile order, so no `order` utilities
 * exist anywhere in this layout.
 *
 * Below 860px the card is a plain static block: no absolute positioning, no
 * background, border, shadow or padding. Overlapping at narrow widths clips the
 * code and was rejected.
 */

function CheckIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`mt-[3px] h-[15px] w-[15px] flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export type MediumPoint = { lead: string; rest: ReactNode };

type MediumSectionProps = {
  accent: MediumAccent;
  eyebrow: string;
  /** Rendered in text-primary. */
  headingLead: string;
  /** Rendered in the medium's accent colour. */
  headingAccent: string;
  paragraph: ReactNode;
  points: MediumPoint[];
  /** The code window, which occupies 62% of the stage at desktop width. */
  children: ReactNode;
};

export function MediumSection({
  accent,
  eyebrow,
  headingLead,
  headingAccent,
  paragraph,
  points,
  children,
}: MediumSectionProps) {
  return (
    <section>
      <div className="mx-auto w-full max-w-6xl px-7 pt-8 pb-20">
        <header className="mb-[26px] flex flex-col items-center text-center min-[860px]:mb-[44px]">
          <span
            className={`mb-4 inline-flex rounded-full border px-[10px] py-[4px] font-mono text-[10.5px] tracking-[0.08em] uppercase min-[860px]:mb-5 min-[860px]:px-[12px] min-[860px]:py-[5px] min-[860px]:text-[11.5px] ${accent.pill}`}
          >
            {eyebrow}
          </span>

          <h2 className="text-[26px] font-bold leading-[1.18] tracking-[-0.025em] text-balance min-[860px]:text-[42px] min-[860px]:leading-[1.1]">
            <span className="text-primary">{headingLead} </span>
            <span className={accent.headline}>{headingAccent}</span>
          </h2>
        </header>

        {/*
         * The stage. The window is in normal flow at 62%; the card is taken out
         * of flow at 47% and pinned to the right, so the two overlap across
         * roughly 9% of the container. The opaque background and the drop
         * shadow are what make the overlap read as intentional.
         */}
        <div className="relative">
          <div className="min-[860px]:w-[62%]">{children}</div>

          <div className="mt-[30px] min-[860px]:absolute min-[860px]:top-1/2 min-[860px]:right-0 min-[860px]:z-10 min-[860px]:mt-0 min-[860px]:w-[47%] min-[860px]:-translate-y-1/2 min-[860px]:rounded-[14px] min-[860px]:border min-[860px]:border-line-strong min-[860px]:bg-card min-[860px]:p-[28px_30px_30px] min-[860px]:shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
            <p className="text-[14.5px] leading-[1.6] text-body min-[860px]:text-[15px]">
              {paragraph}
            </p>

            {/* Hairline matches the page below 860px and the card border above it. */}
            <hr className="my-[22px] border-t border-line min-[860px]:my-[18px] min-[860px]:border-line-strong" />

            <ul className="flex flex-col gap-[14px]">
              {points.map((point) => (
                <li key={point.lead} className="flex gap-[10px]">
                  <CheckIcon className={accent.check} />
                  <span className="text-[13.5px] leading-[1.55] text-muted">
                    <strong className="font-semibold text-primary">
                      {point.lead}
                    </strong>
                    {point.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MediumSection;
