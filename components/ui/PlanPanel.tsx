import { Window } from "./Window";

const resources = [
  { type: "aws_db_instance", name: "main" },
  { type: "aws_sqs_queue", name: "settlements" },
  { type: "aws_s3_bucket", name: "receipts" },
  { type: "helm_release", name: "payments-api" },
];

/** Static mock of `ubx plan` output. Presentational only — no interactivity. */
export function PlanPanel() {
  return (
    <Window label="ubx plan">
      <div className="px-5 py-[18px] font-mono text-[11.5px] leading-[1.85]">
        <p>
          <span className="text-dim">$</span>{" "}
          <span className="text-primary">ubx plan --stack payments</span>
        </p>

        <p>&nbsp;</p>

        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[12px] font-medium text-brand-bright">
            Proposal 9f3a81
          </span>
          <span className="text-[10px] text-dim">stack: payments</span>
        </div>

        <hr className="my-2 border-t border-rule" />

        {resources.map((resource) => (
          <div
            key={resource.type}
            className="flex items-baseline justify-between gap-4"
          >
            <span>
              <span className="text-diff-add">+</span>{" "}
              <span className="text-resource">{resource.type}</span>
            </span>
            <span className="text-right text-[10px] text-muted">
              {resource.name}
            </span>
          </div>
        ))}

        <hr className="my-2 border-t border-rule" />

        <div className="flex items-baseline justify-between gap-4">
          <span className="text-muted">
            blast radius <span className="text-diff-add">+4</span> ~0 -0
          </span>
          <span className="text-cost">cost &Delta; +$244/mo</span>
        </div>

        <div className="mt-3">
          <span className="inline-block rounded-lg border border-brand bg-badge-bg px-3 py-[5px] text-[10.5px] text-brand-bright">
            &#10003; signed &middot; ready
          </span>
        </div>
      </div>
    </Window>
  );
}

export default PlanPanel;
