import { Window } from "./Window";
import { CodeLine as Line } from "./CodeLine";
import { MediumSection } from "./MediumSection";
import type { MediumPoint } from "./MediumSection";
import { accents } from "./accents";

/*
 * The markdown medium in detail. Server component — static markup, no state.
 */

const points: MediumPoint[] = [
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

const preClass =
  "h-full overflow-auto p-[14px_14px_16px] font-mono text-[10.5px] leading-[1.65] whitespace-pre text-code-plain min-[860px]:p-[16px_18px_18px] min-[860px]:text-[11.5px]";

function PaymentsDocument() {
  return (
    <pre className={preClass}>
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
      <Line />
      <Line>
        <span className="font-medium text-primary">
          {"# Payments infrastructure"}
        </span>
      </Line>
      <Line />
      <Line>
        <span className="text-md-heading">{"## Goal"}</span>
      </Line>
      <Line>
        <span className="text-code-plain">
          {"Postgres for payments, half of staging"}
        </span>
      </Line>
      <Line>
        <span className="text-code-plain">
          {"capacity, plus a settlement queue."}
        </span>
      </Line>
      <Line />
      <Line>
        <span className="text-md-heading">{"## Requirements"}</span>
      </Line>
      <Line>
        <span className="text-code-plain">
          {"- Never public · eu-west-1 only"}
        </span>
      </Line>
      <Line>
        <span className="text-code-plain">{"- Queue retention ≥ 4 days"}</span>
      </Line>
      <Line>
        <span className="text-code-plain">{"- Cost ceiling: $250/month"}</span>
      </Line>
      <Line />
      <Line>
        <span className="text-md-heading">{"## References"}</span>
      </Line>
      <Line>
        <span className="text-code-plain">{"- network: "}</span>
        <span className="text-brand-bright">{"@network.vpc_id"}</span>
      </Line>
    </pre>
  );
}

export function MarkdownSection() {
  return (
    <MediumSection
      accent={accents.markdown}
      eyebrow="markdown medium"
      headingLead="Describe the intent."
      headingAccent="Skip the resources."
      paragraph="Write what the infrastructure is for, in a document a reviewer can actually read. ubx resolves it against live state and neighbouring stacks, then freezes the result into a typed, hashed proposal."
      points={points}
    >
      <Window
        label="payments.md"
        badge={
          /* Hidden, not removed — it crowds the narrow titlebar. */
          <span className="hidden rounded-md border border-line-strong px-[7px] py-[3px] font-mono text-[9.5px] text-dim min-[860px]:inline-block">
            intent/v1
          </span>
        }
      >
        <PaymentsDocument />
      </Window>
    </MediumSection>
  );
}

export default MarkdownSection;
