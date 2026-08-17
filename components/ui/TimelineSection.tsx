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

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[2px] h-4 w-4 shrink-0 text-brand min-[860px]:h-[17px] min-[860px]:w-[17px]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

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

        <ol className="relative mt-[42px] list-none pl-[52px] min-[860px]:mt-[66px] min-[860px]:pl-24">
          {/* The rail. Its gradient and travelling pulse live in globals.css. */}
          <div className="rail absolute top-[30px] bottom-[46px] left-[15px] w-[2px] overflow-hidden rounded min-[860px]:left-[26px]">
            <div className="rail-pulse" />
          </div>

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

        <div className="mt-9 flex items-start gap-[13px] border-t border-[#161b22] pt-[22px] min-[860px]:mt-[52px] min-[860px]:pt-7">
          <InfoIcon />
          <p className="text-[13px] leading-[1.62] text-muted min-[860px]:text-[14.5px]">
            Months later,{" "}
            <code className="font-mono text-brand-bright">ubx why</code> walks
            any resource back through the ledger to the proposal that created
            it, the intent behind that proposal, and the person who signed it.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
