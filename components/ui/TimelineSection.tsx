import type { CSSProperties, ReactNode } from "react";

/*
 * The "how it works" timeline: five steps, one direction, top to bottom.
 * Server component with no state.
 *
 * Per-step colour is carried on the <li> as custom properties, so the card
 * decorations and node styling in globals.css can read them. That keeps the hex
 * values in one table here instead of scattered across a dozen class strings.
 *
 * House rule for this file: no em dash characters anywhere, comments included.
 */

/* ---------- step 2: the blueprint visual ---------- */

const mediums = ["markdown", "sdk", "diagram", "dialogue"];

function BlueprintVisual() {
  return (
    <div className="mt-[22px] flex flex-col items-stretch gap-[14px] min-[860px]:flex-row min-[860px]:items-center min-[860px]:gap-[26px]">
      <div className="flex flex-row flex-wrap gap-[7px] min-[860px]:flex-col min-[860px]:gap-[9px]">
        {mediums.map((medium) => (
          <div
            key={medium}
            className="rounded-lg border border-[#262b36] bg-[#0f131a] px-[11px] py-[6px] text-center font-mono text-[10px] text-[#9aa3ae] min-[860px]:min-w-[92px] min-[860px]:px-[14px] min-[860px]:py-[7px] min-[860px]:text-[10.5px]"
          >
            {medium}
          </div>
        ))}
      </div>

      {/* Hidden below 860px, not removed: the column layout has no room for it. */}
      <svg
        width="76"
        height="130"
        viewBox="0 0 76 130"
        className="hidden shrink-0 min-[860px]:block"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="#2f3542" strokeWidth="1.3">
          <path d="M0 16 H30 Q40 16 40 30 V58" />
          <path d="M0 50 H30 Q40 50 40 60 V62" />
          <path d="M0 82 H30 Q40 82 40 72 V68" />
          <path d="M0 114 H30 Q40 114 40 100 V70" />
        </g>
        <g fill="none" stroke="#6D3BC4" strokeWidth="1.6" strokeLinecap="round">
          <path d="M40 64 H72" />
          <path d="M66 59 L73 64 L66 69" />
        </g>
      </svg>

      <div className="relative rounded-[12px] border border-[rgba(109,59,196,0.55)] bg-[#0c0f15] px-[20px] py-[18px] text-center shadow-[0_0_40px_rgba(109,59,196,0.16)] min-[860px]:px-[40px] min-[860px]:py-[24px]">
        <span className="bp-corner bp-tl" />
        <span className="bp-corner bp-tr" />
        <span className="bp-corner bp-bl" />
        <span className="bp-corner bp-br" />

        <b className="mb-[5px] block text-[15px] font-bold text-[#eef1f6] min-[860px]:text-[19px]">
          Blueprint
        </b>
        <div className="font-mono text-[9px] tracking-[0.04em] text-persian-purple-bright min-[860px]:text-[10px]">
          typed · canonical · hashed
        </div>
      </div>
    </div>
  );
}

/* ---------- step 3: the plan readout ---------- */

const planRow = "flex justify-between gap-[12px]";
const planRule =
  "my-[9px] border-t border-[#1c212b] min-[860px]:my-[11px]";

function PlanReadout() {
  return (
    <div className="mt-[18px] rounded-[12px] border border-[#212734] bg-[#0c0f15] p-[14px] font-mono text-[10px] leading-[1.95] min-[860px]:mt-[22px] min-[860px]:p-[18px_20px] min-[860px]:text-[11.5px] min-[860px]:leading-[2.05]">
      <div className={planRow}>
        <span>
          <span className="text-dim">$</span> ubx plan
          {/* The stack flag is dropped below 860px, where the line would wrap. */}
          <span className="hidden min-[860px]:inline"> --stack payments</span>
        </span>
        <span className="text-dim">9f3a81</span>
      </div>

      <hr className={planRule} />

      <div className={planRow}>
        <span>
          <span className="text-diff-add">+</span>{" "}
          <span className="text-resource">aws_db_instance</span>
        </span>
        <span className="text-dim">main</span>
      </div>
      <div className={planRow}>
        <span>
          <span className="text-diff-add">+</span>{" "}
          <span className="text-resource">aws_sqs_queue</span>
        </span>
        <span className="text-dim">settlements</span>
      </div>
      {/* `planRow` is not reused here: its unconditional `flex` would beat
          `hidden` and leave this row visible below 860px. */}
      <div className="hidden justify-between gap-[12px] min-[860px]:flex">
        <span>
          <span className="text-diff-add">+</span>{" "}
          <span className="text-resource">helm_release</span>
        </span>
        <span className="text-dim">payments-api</span>
      </div>

      <hr className={planRule} />

      <div className={planRow}>
        <span className="text-dim">
          blast radius <span className="text-diff-add">+3</span> ~0 -0
        </span>
        <span className="text-persian-yellow-bright">
          <span className="hidden min-[860px]:inline">cost &Delta; </span>
          +$244/mo
        </span>
      </div>
    </div>
  );
}

/* ---------- step data ---------- */

type Step = {
  n: string;
  title: string;
  chip: string;
  paragraph: string;
  pills: string[];
  /* --step base, --step-bright text, --step-glow node halo, --step-bloom card
     bloom, --chip-border and --chip-bg for the mono chip. */
  vars: CSSProperties;
  extra?: ReactNode;
};

const steps: Step[] = [
  {
    n: "1",
    title: "Author",
    chip: "any medium",
    paragraph:
      "Write the change in whatever form fits the task. A markdown document when the reasoning matters more than the fields, Go, TypeScript, or Python when you want types and editor completion, a D2 diagram when the shape is the point, or a plain conversation when you are still working it out. None of these is a wrapper around a blessed format. Each one authors directly.",
    pills: ["markdown", "sdk", "diagram", "dialogue"],
    vars: {
      "--step": "#E49B0F",
      "--card-accent": "#E49B0F",
      "--card-accent-soft": "rgba(228,155,15,0.35)",
      "--step-bright": "#F0B429",
      "--step-glow": "rgba(228,155,15,0.22)",
      "--step-bloom": "#E49B0F",
      "--chip-border": "rgba(228,155,15,0.32)",
      "--chip-bg": "rgba(228,155,15,0.08)",
    } as CSSProperties,
  },
  {
    n: "2",
    title: "Blueprint",
    chip: "canonical IR",
    paragraph:
      "Whatever you wrote collapses into one typed intermediate representation. The resolver reads live provider state, pins every cross-stack reference to the exact head it saw, and computes concrete values. Evaluation runs twice and the results are compared byte for byte, so a non-deterministic evaluator fails here rather than in production.",
    pills: ["live state read", "refs pinned @7fc2", "double-run verified"],
    vars: {
      "--step": "#6D3BC4",
      "--card-accent": "#8B5CF6",
      "--card-accent-soft": "rgba(139,92,246,0.35)",
      "--step-bright": "#A98BE8",
      "--step-glow": "rgba(109,59,196,0.26)",
      "--step-bloom": "#6D3BC4",
      "--chip-border": "rgba(109,59,196,0.36)",
      "--chip-bg": "rgba(109,59,196,0.10)",
    } as CSSProperties,
    extra: <BlueprintVisual />,
  },
  {
    n: "3",
    title: "Plan",
    chip: "ubx plan",
    paragraph:
      "It becomes something a reviewer can actually judge: which resources change, on which provider and region, what the monthly cost delta is, and which policy invariants it satisfies. The result is hashed and frozen. If live state moves afterwards, the proposal goes stale rather than applying against a world that has already changed.",
    pills: ["3 invariants passed", "hash frozen", "stale on drift"],
    vars: {
      "--step": "#1C39BB",
      "--card-accent": "#4B6BE8",
      "--card-accent-soft": "rgba(75,107,232,0.35)",
      "--step-bright": "#7C8FE8",
      "--step-glow": "rgba(28,57,187,0.28)",
      "--step-bloom": "#4B5FD4",
      "--chip-border": "rgba(28,57,187,0.36)",
      "--chip-bg": "rgba(28,57,187,0.10)",
    } as CSSProperties,
    extra: <PlanReadout />,
  },
  {
    n: "4",
    title: "Accept",
    chip: "ubx accept",
    paragraph:
      "One human signs that exact hash, either locally or by merging a pull request. The signature binds to the content rather than to a file or a branch, so nothing can be edited in the gap between review and apply. There is no automation path around this step and no override for it.",
    pills: [
      "signature bound to hash",
      "approver recorded",
      "PR merge or local sign",
    ],
    vars: {
      "--step": "#CC2936",
      "--card-accent": "#E8404E",
      "--card-accent-soft": "rgba(232,64,78,0.35)",
      "--step-bright": "#E8404E",
      "--step-glow": "rgba(204,41,54,0.28)",
      "--step-glow-size": "32px",
      "--step-bloom": "#CC2936",
      "--chip-border": "rgba(204,41,54,0.34)",
      "--chip-bg": "rgba(204,41,54,0.08)",
    } as CSSProperties,
  },
  {
    n: "5",
    title: "Ship",
    chip: "ubx ship",
    paragraph:
      "The native executor speaks the plugin protocol directly to provider binaries and owns failure semantics end to end: a per-resource state machine, reconcile by query when a failure is ambiguous, and partial applies modeled as real state rather than guessed at. The applied proposal appends to the ledger.",
    pills: ["plugin protocol v6", "no state file", "ledger appended"],
    vars: {
      "--step": "#00A693",
      "--card-accent": "#00C4AE",
      "--card-accent-soft": "rgba(0,196,174,0.35)",
      "--step-bright": "#00C4AE",
      "--step-glow": "rgba(0,166,147,0.24)",
      "--step-bloom": "#00A693",
      "--chip-border": "rgba(0,166,147,0.30)",
      "--chip-bg": "rgba(0,166,147,0.07)",
    } as CSSProperties,
  },
];

/* ---------- post-ship group ---------- */

/* 15px stroke glyphs, inheriting the node's accent through currentColor. */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-[15px] w-[15px]",
  "aria-hidden": true,
};

function HistoryIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3.5 9a9 9 0 1 0 2.4-4.1L3 8" />
      <path d="M3 3.5V8h4.5" />
      <path d="M12 8v4.4l3 1.8" />
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21a9 9 0 1 0-9-9" />
      <path d="M12 16.5a4.5 4.5 0 1 0-4.5-4.5" />
      <path d="M12 12l6.5-6.5" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 8h12" />
      <path d="M15 5l3 3-3 3" />
      <path d="M18 16H6" />
      <path d="M9 13l-3 3 3 3" />
    </svg>
  );
}

type PostShip = {
  key: string;
  title: string;
  chip: string;
  icon: ReactNode;
  body: string;
  vars: CSSProperties;
};

/*
 * The accents repeat step 5, step 1 and step 4 on purpose: green carries on
 * from Ship, yellow marks the thing wanting attention, red marks the
 * destructive option. Nothing here is numbered, and the nodes are smaller than
 * the step nodes, so the group reads as a branch rather than steps 6 to 8.
 */
const postShip: PostShip[] = [
  {
    key: "why",
    title: "why",
    chip: "ubx why",
    icon: <HistoryIcon />,
    body: "Walk any resource back through the ledger to the proposal that created it, the intent behind that proposal, and the person who signed it.",
    vars: {
      "--node-accent": "#00A693",
      "--card-accent": "#00C4AE",
      "--card-accent-soft": "rgba(0,196,174,0.35)",
      "--step-bloom": "#00A693",
      "--step-bright": "#00C4AE",
      "--chip-border": "rgba(0,166,147,0.30)",
      "--chip-bg": "rgba(0,166,147,0.07)",
    } as CSSProperties,
  },
  {
    key: "drift",
    title: "Drift detection",
    chip: "ubx scan",
    icon: <RadarIcon />,
    body: "Reality diverging from the ledger is surfaced along with the actor, session and timestamp that caused it, correlated from provider audit logs.",
    vars: {
      "--node-accent": "#E49B0F",
      "--card-accent": "#E49B0F",
      "--card-accent-soft": "rgba(228,155,15,0.35)",
      "--step-bloom": "#E49B0F",
      "--step-bright": "#F0B429",
      "--chip-border": "rgba(228,155,15,0.32)",
      "--chip-bg": "rgba(228,155,15,0.08)",
    } as CSSProperties,
  },
  {
    key: "adopt",
    title: "Adopt or revert",
    chip: "signed either way",
    icon: <SwapIcon />,
    body: "Drift becomes a decision rather than a surprise. Adopt records reality into the ledger, revert restores the signed state. Both are proposals, and both are signed.",
    vars: {
      "--node-accent": "#E8404E",
      "--card-accent": "#E8404E",
      "--card-accent-soft": "rgba(232,64,78,0.35)",
      "--step-bloom": "#CC2936",
      "--step-bright": "#E8404E",
      "--chip-border": "rgba(204,41,54,0.34)",
      "--chip-bg": "rgba(204,41,54,0.08)",
    } as CSSProperties,
  },
];

export function TimelineSection() {
  return (
    <section className="px-[18px] pt-[46px] pb-[54px] min-[860px]:px-12 min-[860px]:pt-[68px] min-[860px]:pb-20">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex flex-col items-center text-center">
          <span className="mb-[14px] inline-flex rounded-full border border-[rgba(0,166,147,0.32)] bg-[rgba(0,166,147,0.08)] px-[12px] py-[5px] font-mono text-[10px] tracking-[0.1em] text-brand-bright uppercase shadow-[0_0_24px_rgba(0,196,174,0.10)] min-[860px]:mb-[22px] min-[860px]:px-[15px] min-[860px]:py-[6px] min-[860px]:text-[11.5px]">
            how it works
          </span>

          <h2 className="mb-[12px] text-[27px] leading-[1.16] font-extrabold tracking-[-0.03em] min-[860px]:mb-[18px] min-[860px]:text-[46px] min-[860px]:leading-[1.08]">
            <span className="text-primary">From intent to </span>
            <span className="text-brand-bright">signed reality</span>
          </h2>

          <p className="max-w-[580px] text-[14px] text-muted min-[860px]:text-[16.5px]">
            <span className="min-[860px]:hidden">
              Each leaves a record you can replay.
            </span>
            <span className="hidden min-[860px]:inline">
              Five steps in one direction. Each of them leaves a record you can
              replay months later.
            </span>
          </p>
        </header>

        {/*
         * One relative wrapper over the steps and the post-ship group, so the
         * travelling pulse has a single box to cross. The colour is still drawn
         * in two pieces (the gradient scoped to the ol, the neutral scoped to
         * the group), but the pulse cannot be: an element only animates inside
         * its own containing block, so while it lived in the rail it died at
         * the end of step 5 and the last stretch of line was never lit.
         *
         * The margin sits here rather than on the ol, so the wrapper's top edge
         * is the ol's top edge and the 30px offsets below still mean what they
         * meant when the rail was the ol's own child.
         */}
        <div className="relative mt-[42px] min-[860px]:mt-[66px]">
          <ol className="relative list-none pl-[52px] min-[860px]:pl-24">
            {/* The rail's gradient. The pulse that runs it is further down. */}
            <div className="rail absolute top-[30px] bottom-0 left-[15px] w-[2px] min-[860px]:left-[26px]" />

            {steps.map((step, index) => (
              <li
                key={step.n}
                style={step.vars}
                className={`relative ${index === steps.length - 1 ? "pb-0" : "pb-[26px] min-[860px]:pb-[38px]"}`}
              >
                <div className="step-node absolute top-[16px] left-[-52px] z-[3] flex h-8 w-8 items-center justify-center rounded-full bg-[#0c0f15] font-mono text-[13px] font-medium min-[860px]:top-[22px] min-[860px]:left-[-96px] min-[860px]:h-[54px] min-[860px]:w-[54px] min-[860px]:text-[18px]">
                  {step.n}
                </div>

                <div className="step-card relative overflow-hidden p-[22px_20px_24px] min-[860px]:p-[30px_34px_32px]">
                  <div className="mb-[9px] flex flex-wrap items-baseline gap-3 min-[860px]:mb-3">
                    <h3 className="text-[17.5px] font-bold tracking-[-0.015em] text-[#f5f8fc] min-[860px]:text-[22px]">
                      {step.title}
                    </h3>
                    <span className="step-chip rounded-md px-[7px] py-[3px] font-mono text-[9.5px] min-[860px]:px-[9px] min-[860px]:text-[10.5px]">
                      {step.chip}
                    </span>
                  </div>

                  <p className="text-[13.5px] leading-[1.68] text-[#9aa3ae] min-[860px]:max-w-[660px] min-[860px]:text-[14.5px]">
                    {step.paragraph}
                  </p>

                  {step.extra}

                  <ul className="mt-4 flex list-none flex-wrap gap-2 min-[860px]:mt-5">
                    {step.pills.map((pill) => (
                      <li
                        key={pill}
                        className="rounded-[7px] border border-[#232935] bg-[rgba(255,255,255,0.03)] px-[9px] py-[5px] font-mono text-[10px] text-[#aab2bd] min-[860px]:px-[11px] min-[860px]:py-[6px] min-[860px]:text-[11px]"
                      >
                        {pill}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          {/*
           * The post-ship group. The line runs on past step 5, elbows
           * left-to-horizontal, and the three nodes sit on that horizontal rail.
           *
           * Padding rather than margin on the top edge, so the group's box
           * starts exactly where the ol's ends and the tail below picks the line
           * up with nothing between them.
           *
           * Geometry, in the group's own coordinate space (its padding-left
           * matches the ol's, so the cards align with the step cards and the
           * line sits outside them at x 26 to 28):
           *   - the tail occupies x 26 to 28, the same column as the ol's rail,
           *     so there is no sideways jog where one hands over to the other
           *   - the elbow is 20px tall with a 20px radius, so it is only the
           *     curve. Its left border occupies the same x 26 to 28 and its top
           *     edge sits at bottom 36px, which is where the tail stops: they
           *     abut rather than overlap, and two semi-transparent strokes never
           *     stack into a darker patch
           *   - the curve ends at x 46 and the elbow's bottom border runs on to
           *     its own right edge, x 70, where the horizontal rail starts
           *   - elbow and horizontal rail are both pinned to bottom 16px. The
           *     grid is the last child and the group has no bottom padding, so
           *     that offset resolves to the same line for the elbow (in the
           *     group) and the rail (in the grid)
           *   - a 34px node at bottom 0 of a wrapper padded 46px has its centre
           *     17px up, which is the rail's centre line
           */}
          <div className="relative pt-9 pl-[52px] min-[860px]:pt-12 min-[860px]:pl-24">
            {/*
             * The line, continued. Above 860px it stops 36px up: the elbow below
             * is 20px tall and pinned 16px up, so the tail ends exactly where the
             * curve begins. Below 860px there is no elbow and it runs to the
             * group's bottom, which is the last card's bottom.
             */}
            <div
              className="rail-tail absolute top-0 bottom-0 left-[15px] w-[2px] min-[860px]:bottom-[36px] min-[860px]:left-[26px]"
              aria-hidden="true"
            />

            {/* Desktop only: the corner. A bordered box, so it survives reflow. */}
            <div
              className="post-elbow absolute bottom-[16px] left-[26px] hidden h-[20px] w-[44px] min-[860px]:block"
              aria-hidden="true"
            />

            <p className="mb-5 font-mono text-[11px] tracking-[0.1em] text-dim uppercase">
              once it ships
            </p>

            <ul className="relative grid list-none grid-cols-1 gap-[14px] min-[860px]:grid-cols-3 min-[860px]:gap-5">
              {/*
               * Right edge lands on the centre of the third column: with three
               * equal columns and a 20px gap that centre is W*5/6 minus g/3 from
               * the left, so the inset from the right is W/6 minus g/3. Expressed
               * as a percentage it stays correct at every width.
               */}
              <li
                className="post-rail-h absolute bottom-[16px] left-[-26px] right-[calc(16.6667%-6.667px)] hidden h-[2px] overflow-hidden min-[860px]:block"
                aria-hidden="true"
              >
                {/* The glow's second leg. Timed against the first in globals.css. */}
                <div className="rail-pulse-h" />
              </li>

              {postShip.map((op) => (
                <li key={op.key} style={op.vars} className="relative min-[860px]:pb-[46px]">
                  {/*
                   * Centred on the wrapper rather than placed at an x offset, so
                   * the nodes track the cards as they grow. Below 860px it moves
                   * out to the vertical rail: 26px wide, so its left edge is 49px
                   * out (not the steps' 52px) to put its centre on the rail.
                   */}
                  <div className="post-node absolute top-[16px] left-[-49px] z-[3] flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#0c0f15] min-[860px]:top-auto min-[860px]:bottom-0 min-[860px]:left-1/2 min-[860px]:h-[34px] min-[860px]:w-[34px] min-[860px]:-translate-x-1/2">
                    {op.icon}
                  </div>

                  <div className="step-card relative overflow-hidden p-[20px_18px_22px] min-[860px]:p-[22px_24px_24px]">
                    <div className="mb-[9px] flex flex-wrap items-baseline gap-3 min-[860px]:mb-[10px]">
                      <h3 className="text-[15.5px] font-bold tracking-[-0.015em] text-[#f5f8fc] min-[860px]:text-[17px]">
                        {op.title}
                      </h3>
                      <span className="step-chip rounded-md px-[7px] py-[3px] font-mono text-[9.5px] min-[860px]:px-[9px] min-[860px]:text-[10.5px]">
                        {op.chip}
                      </span>
                    </div>

                    <p className="text-[13.5px] leading-[1.6] text-[#9aa3ae]">
                      {op.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/*
           * The pulse, over the whole run. It clips to the same column the rail
           * and the tail occupy and stops where they stop: at the elbow's curve
           * above 860px, at the last card's bottom below it.
           *
           * Last child of the wrapper, so it paints over both segments. The
           * nodes carry z-3 and still sit on top of it, which is what lets the
           * pulse pass behind them rather than washing them out.
           */}
          <div
            className="rail-run absolute top-[30px] bottom-0 left-[15px] w-[2px] overflow-hidden min-[860px]:bottom-[36px] min-[860px]:left-[26px]"
            aria-hidden="true"
          >
            <div className="rail-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
