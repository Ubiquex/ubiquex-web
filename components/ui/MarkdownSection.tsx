import type { ReactNode } from "react";
import { Window } from "./Window";

/*
 * The markdown medium in detail. Server component — static markup, no state.
 *
 * One markup tree: the copy block comes first in the DOM so stacked mobile
 * order and reading order are both copy-then-window, and `order` utilities
 * flip the two columns on desktop. No duplicated layout.
 */

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[3px] h-[15px] w-[15px] flex-shrink-0 text-brand min-[860px]:h-4 min-[860px]:w-4"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const points: { lead: string; rest: ReactNode }[] = [
  {
    lead: "Frontmatter carries the contract",
    rest: " — schema version and target stack, validated before anything resolves.",
  },
  {
    lead: "Prose becomes constraints",
    rest: " — requirements read as policy, and are checked at propose time.",
  },
  {
    lead: "References are pinned, not live",
    rest: " — cross-stack reads record the head they saw, so drift is detected, never discovered.",
  },
];

/** One line of the document, so the <pre> stays readable as source. */
function Line({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      {"\n"}
    </>
  );
}

function PaymentsDocument() {
  return (
    <pre className="overflow-x-auto p-[16px] font-mono text-[11px] leading-[1.85] whitespace-pre min-[860px]:p-[20px_22px] min-[860px]:text-[12.5px]">
      <Line>
        <span className="text-dim">{"---"}</span>
      </Line>
      <Line>
        <span className="text-code-keyword">{"ubx:"}</span>
        <span className="text-code-string">{" intent/v1"}</span>
      </Line>
      <Line>
        <span className="text-code-keyword">{"stack:"}</span>
        <span className="text-code-string">{" payments"}</span>
      </Line>
      <Line>
        <span className="text-dim">{"---"}</span>
      </Line>
      <Line>{""}</Line>
      <Line>
        <span className="font-medium text-primary">
          {"# Payments infrastructure"}
        </span>
      </Line>
      <Line>{""}</Line>
      <Line>
        <span className="text-md-heading">{"## Goal"}</span>
      </Line>
      <Line>
        <span className="text-code-plain">
          {"Postgres for the payments service, modelled on"}
        </span>
      </Line>
      <Line>
        <span className="text-code-plain">
          {"staging but roughly half capacity, plus a queue"}
        </span>
      </Line>
      <Line>
        <span className="text-code-plain">{"for settlement jobs."}</span>
      </Line>
      <Line>{""}</Line>
      <Line>
        <span className="text-md-heading">{"## Requirements"}</span>
      </Line>
      <Line>
        <span className="text-code-plain">
          {"- Reachable only from payments, never public"}
        </span>
      </Line>
      <Line>
        <span className="text-code-plain">{"- Data stays in eu-west-1"}</span>
      </Line>
      <Line>
        <span className="text-code-plain">{"- Queue retention ≥ 4 days"}</span>
      </Line>
      <Line>
        <span className="text-code-plain">{"- Cost ceiling: $250/month"}</span>
      </Line>
      <Line>{""}</Line>
      <Line>
        <span className="text-md-heading">{"## References"}</span>
      </Line>
      <Line>
        <span className="text-code-plain">{"- staging db: "}</span>
        <span className="text-brand-bright">
          {"@staging.aws_db_instance.main"}
        </span>
      </Line>
      <Line>
        <span className="text-code-plain">{"- network:    "}</span>
        <span className="text-brand-bright">{"@network.vpc_id"}</span>
      </Line>
    </pre>
  );
}

export function MarkdownSection() {
  return (
    <section className="bg-ink">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-[30px] px-7 pt-8 pb-20 min-[860px]:grid-cols-2 min-[860px]:items-center min-[860px]:gap-[52px]">
        {/* Copy first in the DOM; `order` moves it right on desktop. */}
        <div className="order-1 min-[860px]:order-2">
          <span className="mb-4 inline-block rounded-full border border-brand/28 bg-brand/7 px-[10px] py-[4px] font-mono text-[10.5px] tracking-[0.08em] text-brand-bright uppercase min-[860px]:mb-5 min-[860px]:px-[12px] min-[860px]:py-[5px] min-[860px]:text-[11.5px]">
            markdown medium
          </span>

          <h2 className="mb-[14px] text-[27px] font-bold leading-[1.14] tracking-tight min-[860px]:mb-[18px] min-[860px]:text-[37px]">
            <span className="text-primary">Describe the intent. </span>
            <span className="text-brand-bright">Skip the resources.</span>
          </h2>

          <p className="mb-[22px] text-[14.5px] leading-[1.65] text-muted min-[860px]:mb-[26px] min-[860px]:max-w-[470px] min-[860px]:text-[16px]">
            Write what the infrastructure is for, in a document a reviewer can
            actually read. ubx resolves it against live state and neighbouring
            stacks, then freezes the result into a typed, hashed proposal.
          </p>

          <ul className="flex flex-col gap-[14px]">
            {points.map((point) => (
              <li key={point.lead} className="flex gap-[10px]">
                <CheckIcon />
                <span className="text-[13.5px] leading-[1.55] text-muted min-[860px]:text-[14.5px]">
                  <strong className="font-semibold text-primary">
                    {point.lead}
                  </strong>
                  {point.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-2 min-[860px]:order-1">
          <Window
            label="payments.md"
            badge={
              /* Hidden, not removed — it crowds the narrow titlebar. */
              <span className="hidden rounded-md border border-line-strong px-2 py-[3px] font-mono text-[10px] text-dim min-[860px]:inline-block">
                intent/v1
              </span>
            }
          >
            <PaymentsDocument />
          </Window>
        </div>
      </div>
    </section>
  );
}

export default MarkdownSection;
