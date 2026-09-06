import { Window } from "@/components/ui/Window";

// Verbatim output from `ubx plan`, produced by the built binary against
// the hermetic fakeprovider fixture. Not written by hand, not tidied.
//
// Two things deliberately absent, both because they are not real:
//   - no AI summary sentence under the header. It was removed in the
//     v2 output spec as noise once every resource block renders in full.
//   - no cost line. `cost delta: $0/mo` is in the real output, and it
//     is always literally zero because every code path that writes
//     CostDelta writes 0. Showing it would imply a feature that does
//     not exist, so the line is cut here rather than shown as $0.
const PLAN = `Plan  payments · from queue.json

  + aws_sqs_queue.events create
      message_retention_seconds: "259200"
      name: "payment-events"

delta: +1 create(s), ~0 change(s), -0 terminate(s)

blast radius: +1 ~0 -0

AI defaults — you are signing these:

◦ named the queue "payment-events" as the document specified
    affects: payments.aws_sqs_queue.events.name

◦ retention left at 3 days, the document did not say
    affects: payments.aws_sqs_queue.events.message_retention_seconds

ubx-proposal: ec6ac5c72a59…
next: ubx ship ec6ac5c72a59`;

export function PlanWindow() {
  return (
    <Window label="ubx plan">
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-body">
        <code>{PLAN}</code>
      </pre>
    </Window>
  );
}
