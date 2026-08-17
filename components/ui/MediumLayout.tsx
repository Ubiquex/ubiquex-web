import type { ReactNode } from "react";
import type { MediumAccent } from "./accents";

/*
 * The shell every medium section shares: the two-column grid, and the copy
 * block (eyebrow pill, split h2, paragraph, check list). Server-safe — the only
 * interactive part of a medium section is TabbedWindow, which owns its own
 * client boundary.
 */

type MediumLayoutProps = {
  copy: ReactNode;
  panel: ReactNode;
  /** Puts the panel on the left at desktop width. Off by default. */
  reverse?: boolean;
};

export function MediumLayout({
  copy,
  panel,
  reverse = false,
}: MediumLayoutProps) {
  return (
    <section className="bg-ink">
      {/*
       * No `items-center`: the grid default (stretch) gives both columns the
       * row's full height, so their content starts at the top and the panel can
       * fill its cell. The taller column sets the height and the shorter one
       * has space below it — that is what top-aligned equal-height means.
       */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-[30px] px-7 pt-8 pb-20 min-[860px]:grid-cols-2 min-[860px]:gap-[52px]">
        {/*
         * Copy is always first in the DOM, so stacked mobile order and reading
         * order are copy-then-panel. `reverse` flips the columns on desktop
         * only; without it no order utilities are emitted at all.
         */}
        <div
          className={`flex flex-col ${reverse ? "order-1 min-[860px]:order-2" : ""}`}
        >
          {copy}
        </div>
        <div
          className={`flex flex-col ${reverse ? "order-2 min-[860px]:order-1" : ""}`}
        >
          {panel}
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`mt-[3px] h-[15px] w-[15px] flex-shrink-0 min-[860px]:h-4 min-[860px]:w-4 ${className}`}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export type MediumPoint = { lead: string; rest: ReactNode };

type MediumCopyProps = {
  eyebrow: string;
  /** Rendered in text-primary. */
  headingLead: string;
  /** Rendered in the medium's accent colour. */
  headingAccent: string;
  paragraph: ReactNode;
  points: MediumPoint[];
  accent: MediumAccent;
};

export function MediumCopy({
  eyebrow,
  headingLead,
  headingAccent,
  paragraph,
  points,
  accent,
}: MediumCopyProps) {
  return (
    <>
      {/* `self-start` keeps the pill its own width — as a flex item it would
          otherwise stretch across the whole column. */}
      <span
        className={`mb-4 inline-block self-start rounded-full border px-[10px] py-[4px] font-mono text-[10.5px] tracking-[0.08em] uppercase min-[860px]:mb-5 min-[860px]:px-[12px] min-[860px]:py-[5px] min-[860px]:text-[11.5px] ${accent.pill}`}
      >
        {eyebrow}
      </span>

      <h2 className="mb-[14px] text-[27px] font-bold leading-[1.14] tracking-tight min-[860px]:mb-[18px] min-[860px]:text-[37px]">
        <span className="text-primary">{headingLead} </span>
        <span className={accent.headline}>{headingAccent}</span>
      </h2>

      <p className="mb-[22px] text-[14.5px] leading-[1.65] text-muted min-[860px]:mb-[26px] min-[860px]:max-w-[470px] min-[860px]:text-[16px]">
        {paragraph}
      </p>

      <ul className="flex flex-col gap-[14px]">
        {points.map((point) => (
          <li key={point.lead} className="flex gap-[10px]">
            <CheckIcon className={accent.check} />
            <span className="text-[13.5px] leading-[1.55] text-muted min-[860px]:text-[14.5px]">
              <strong className="font-semibold text-primary">
                {point.lead}
              </strong>
              {point.rest}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
