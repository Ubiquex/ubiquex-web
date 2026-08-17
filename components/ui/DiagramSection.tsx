import { CodeLine as Line } from "./CodeLine";
import { MediumLayout, MediumCopy } from "./MediumLayout";
import type { MediumPoint } from "./MediumLayout";
import { TabbedWindow } from "./TabbedWindow";
import type { WindowTab } from "./TabbedWindow";
import { accents } from "./accents";

/*
 * The D2 diagram medium in detail. Server component — the tab state lives
 * inside TabbedWindow.
 *
 * The two panes are two views of the same thing: the rendered SVG must keep
 * matching the D2 source beside it (two resources, one edge, one pinned ref).
 */

/* Syntax token helpers for the D2 source. */
const Key = ({ t }: { t: string }) => <span className="text-code-type">{t}</span>;
const Str = ({ t }: { t: string }) => (
  <span className="text-code-string">{t}</span>
);
const Shape = ({ t }: { t: string }) => (
  <span className="text-code-keyword">{t}</span>
);
const Arrow = () => <span className="text-highlight">{"->"}</span>;
const Comment = ({ t }: { t: string }) => (
  <span className="text-dim italic">{t}</span>
);

const points: MediumPoint[] = [
  {
    lead: "Topology is the contract",
    rest: " — nodes become resources, edges become dependencies and pinned cross-stack refs.",
  },
  {
    lead: "Converges with every medium",
    rest: " — the same stack drawn, written or coded resolves to byte-identical intent.",
  },
  {
    lead: "Honest about its limits",
    rest: " — a diagram owns structure. Config detail lives in the other mediums, by design.",
  },
];

function D2Source() {
  return (
    <pre className="min-h-[262px] overflow-x-auto p-[16px] font-mono text-[11px] leading-[1.8] whitespace-pre text-code-plain min-[860px]:min-h-[316px] min-[860px]:p-[20px_22px] min-[860px]:text-[12.5px]">
      <Line>
        <Key t="payments" />
        {": {"}
      </Line>
      <Line>
        {"  "}
        <Key t="label" />
        {": "}
        <Str t={'"stack: payments"'} />
      </Line>
      <Line />
      <Line>
        {"  "}
        <Key t="main" />
        {": {"}
      </Line>
      <Line>
        {"    "}
        <Key t="label" />
        {": "}
        <Str t={'"aws_db_instance"'} />
      </Line>
      <Line>
        {"    "}
        <Key t="shape" />
        {": "}
        <Shape t="cylinder" />
      </Line>
      <Line>{"  }"}</Line>
      <Line />
      <Line>
        {"  "}
        <Key t="settlements" />
        {": {"}
      </Line>
      <Line>
        {"    "}
        <Key t="label" />
        {": "}
        <Str t={'"aws_sqs_queue"'} />
      </Line>
      <Line>
        {"    "}
        <Key t="shape" />
        {": "}
        <Shape t="queue" />
      </Line>
      <Line>{"  }"}</Line>
      <Line />
      <Line>
        {"  main "}
        <Arrow />
        {" settlements: "}
        <Str t={'"writes"'} />
      </Line>
      <Line>{"}"}</Line>
      <Line />
      <Line>
        <Key t="network" />
        {": {"}
      </Line>
      <Line>
        {"  "}
        <Key t="label" />
        {": "}
        <Str t={'"stack: network"'} />
      </Line>
      <Line>{"  vpc_id"}</Line>
      <Line>{"}"}</Line>
      <Line />
      <Line>
        <Comment t="# pinned cross-stack reference" />
      </Line>
      <Line>
        {"payments.main "}
        <Arrow />
        {" network.vpc_id: {"}
      </Line>
      <Line>
        {"  "}
        <Key t="style.stroke-dash" />
        {": 3"}
      </Line>
      <Line>{"}"}</Line>
    </pre>
  );
}

/*
 * The resolved form of the D2 above. `currentColor` carries the highlight
 * accent from the wrapper so the tint stays a token; the remaining literals are
 * SVG paint values, which is the one place this codebase allows raw hex.
 */
function RenderedDiagram() {
  return (
    <div className="min-h-[262px] p-[14px_16px_18px] text-highlight min-[860px]:min-h-[316px]">
      <svg
        viewBox="0 0 440 280"
        className="h-auto w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <marker
            id="d2-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {/* payments stack */}
        <rect
          x="12"
          y="18"
          width="250"
          height="240"
          rx="10"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1.4"
          strokeDasharray="6,4"
        />
        <text
          x="26"
          y="38"
          fontFamily="ui-monospace, monospace"
          fontSize="10.5"
          fill="currentColor"
        >
          stack: payments
        </text>

        <rect
          x="34"
          y="56"
          width="206"
          height="62"
          rx="8"
          fill="#1a1a22"
          stroke="#3a3a44"
        />
        <text
          x="48"
          y="80"
          fontFamily="ui-monospace, monospace"
          fontSize="9.5"
          fill="#6e7681"
        >
          aws_db_instance
        </text>
        <text
          x="48"
          y="100"
          fontFamily="ui-monospace, monospace"
          fontSize="13"
          fill="#e6edf3"
        >
          main
        </text>

        <rect
          x="34"
          y="168"
          width="206"
          height="62"
          rx="8"
          fill="#1a1a22"
          stroke="#3a3a44"
        />
        <text
          x="48"
          y="192"
          fontFamily="ui-monospace, monospace"
          fontSize="9.5"
          fill="#6e7681"
        >
          aws_sqs_queue
        </text>
        <text
          x="48"
          y="212"
          fontFamily="ui-monospace, monospace"
          fontSize="13"
          fill="#e6edf3"
        >
          settlements
        </text>

        {/* main -> settlements */}
        <line
          x1="137"
          y1="118"
          x2="137"
          y2="164"
          stroke="currentColor"
          strokeWidth="1.4"
          markerEnd="url(#d2-arrow)"
        />
        <text
          x="147"
          y="146"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#8b949e"
        >
          writes
        </text>

        {/* network stack */}
        <rect
          x="296"
          y="76"
          width="132"
          height="86"
          rx="10"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="1.4"
          strokeDasharray="6,4"
        />
        <text
          x="308"
          y="96"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fill="currentColor"
          fillOpacity="0.8"
        >
          stack: network
        </text>
        <rect
          x="312"
          y="108"
          width="100"
          height="38"
          rx="7"
          fill="#1a1a22"
          stroke="#3a3a44"
        />
        <text
          x="362"
          y="132"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="12"
          fill="#e6edf3"
        >
          vpc_id
        </text>

        {/* pinned cross-stack reference */}
        <line
          x1="240"
          y1="86"
          x2="292"
          y2="120"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeDasharray="4,3"
          markerEnd="url(#d2-arrow)"
        />
        <text
          x="244"
          y="76"
          fontFamily="ui-monospace, monospace"
          fontSize="8"
          fill="#8b949e"
        >
          pinned @7fc2
        </text>
      </svg>

      {/* The diagram restates pane 1, so screen readers get prose, not shapes. */}
      <p className="sr-only">
        Resolved topology: the payments stack contains an aws_db_instance named
        main and an aws_sqs_queue named settlements, with main writing to
        settlements. A pinned cross-stack reference links payments.main to
        vpc_id in the network stack.
      </p>
    </div>
  );
}

const tabs: WindowTab[] = [
  {
    id: "source",
    long: "payments.d2",
    short: ".d2",
    content: <D2Source />,
  },
  {
    id: "rendered",
    long: "rendered",
    short: "rendered",
    content: <RenderedDiagram />,
  },
];

export function DiagramSection() {
  return (
    <MediumLayout
      copy={
        <MediumCopy
          accent={accents.diagram}
          eyebrow="diagram medium"
          headingLead="Sketch the shape."
          headingAccent="Keep the contract."
          paragraph="Draw the topology in D2 and let ubx resolve it. The diagram is a first-class author, not documentation generated after the fact — it produces the same typed, hashed proposal as every other medium."
          points={points}
        />
      }
      panel={
        <TabbedWindow
          idPrefix="d2"
          ariaLabel="Diagram view"
          tabs={tabs}
          activeTabClass={accents.diagram.tabActive}
        />
      }
    />
  );
}

export default DiagramSection;
