import { CodeLine as Line } from "./CodeLine";
import { MediumSection } from "./MediumSection";
import type { MediumPoint } from "./MediumSection";
import { TabbedWindow } from "./TabbedWindow";
import type { WindowTab } from "./TabbedWindow";
import { accents } from "./accents";

/*
 * The SDK medium in detail. Server component — the tab state lives inside
 * TabbedWindow, so only that primitive ships to the client.
 *
 * One markup tree, one copy of each sample. Copy already belongs on the left at
 * desktop width, so the layout is not reversed and emits no order utilities.
 */

/* Syntax token helpers, so sample lines below stay readable as source. */
const K = ({ t }: { t: string }) => (
  <span className="text-code-keyword">{t}</span>
);
const S = ({ t }: { t: string }) => <span className="text-code-string">{t}</span>;
const N = ({ t }: { t: string }) => <span className="text-code-number">{t}</span>;
const F = ({ t }: { t: string }) => (
  <span className="text-code-function">{t}</span>
);
const T = ({ t }: { t: string }) => <span className="text-code-type">{t}</span>;
const C = ({ t }: { t: string }) => <span className="text-dim italic">{t}</span>;

const points: MediumPoint[] = [
  {
    lead: "Describe-only by design",
    rest: " — the SDK never calls a cloud API. No execution authority, ever.",
  },
  {
    lead: "Hermetic sandbox",
    rest: " — no network, filesystem or env access. A security boundary, not a convention.",
  },
  {
    lead: "Codegen'd from provider schemas",
    rest: " — every attribute across 4,200+ resource types is typed at author time.",
  },
];

// Height is governed by TabbedWindow's panes, not per sample.
const preClass =
  "h-full overflow-auto p-[14px_14px_16px] font-mono text-[10.5px] leading-[1.65] whitespace-pre text-code-plain min-[860px]:p-[16px_18px_18px] min-[860px]:text-[11.5px]";

function TypeScriptSample() {
  return (
    <pre className={preClass}>
      <Line>
        <K t="import" />
        {" { stack, aws, secret } "}
        <K t="from" />
        {" "}
        <S t={'"@ubx/sdk"'} />
        {";"}
      </Line>
      <Line />
      <Line>
        <K t="const" />
        {" s = "}
        <F t="stack" />
        {"("}
        <S t={'"payments"'} />
        {");"}
      </Line>
      <Line />
      <Line>
        <K t="const" />
        {" db = s."}
        <F t="resource" />
        {"(aws.rds."}
        <T t="Instance" />
        {", "}
        <S t={'"main"'} />
        {", {"}
      </Line>
      <Line>
        {"  instanceClass:    "}
        <S t={'"db.r6g.large"'} />
        {","}
      </Line>
      <Line>
        {"  allocatedStorage: "}
        <N t="100" />
        {","}
      </Line>
      <Line>
        {"  password:         "}
        <F t="secret" />
        {"("}
        <S t={'"db-password"'} />
        {"),"}
      </Line>
      <Line>{"});"}</Line>
      <Line />
      <Line>
        {"s."}
        <F t="resource" />
        {"(aws.sqs."}
        <T t="Queue" />
        {", "}
        <S t={'"settlements"'} />
        {", {"}
      </Line>
      <Line>
        {"  messageRetentionSeconds: "}
        <N t="345_600" />
        {",   "}
        <C t="// 4 days" />
      </Line>
      <Line>{"});"}</Line>
    </pre>
  );
}

function GoSample() {
  return (
    <pre className={preClass}>
      <Line>
        <K t="package" />
        {" main"}
      </Line>
      <Line />
      <Line>
        <K t="import" />
        {" "}
        <S t={'"github.com/ubiquex/ubx-sdk-go/ubx"'} />
      </Line>
      <Line />
      <Line>
        <K t="func" />
        {" "}
        <F t="main" />
        {"() {"}
      </Line>
      <Line>
        {"  s := ubx."}
        <F t="Stack" />
        {"("}
        <S t={'"payments"'} />
        {")"}
      </Line>
      <Line />
      <Line>
        {"  s."}
        <F t="Resource" />
        {"(aws."}
        <T t="RDSInstance" />
        {", "}
        <S t={'"main"'} />
        {", ubx."}
        <T t="Args" />
        {"{"}
      </Line>
      <Line>
        {"    "}
        <S t={'"instanceClass"'} />
        {":    "}
        <S t={'"db.r6g.large"'} />
        {","}
      </Line>
      <Line>
        {"    "}
        <S t={'"allocatedStorage"'} />
        {": "}
        <N t="100" />
        {","}
      </Line>
      <Line>
        {"    "}
        <S t={'"password"'} />
        {":         ubx."}
        <F t="Secret" />
        {"("}
        <S t={'"db-password"'} />
        {"),"}
      </Line>
      <Line>{"  })"}</Line>
      <Line />
      <Line>
        {"  s."}
        <F t="Resource" />
        {"(aws."}
        <T t="SQSQueue" />
        {", "}
        <S t={'"settlements"'} />
        {", ubx."}
        <T t="Args" />
        {"{"}
      </Line>
      <Line>
        {"    "}
        <S t={'"messageRetentionSeconds"'} />
        {": "}
        <N t="345600" />
        {","}
      </Line>
      <Line>{"  })"}</Line>
      <Line>{"}"}</Line>
    </pre>
  );
}

function PythonSample() {
  return (
    <pre className={preClass}>
      <Line>
        <K t="from" />
        {" ubx "}
        <K t="import" />
        {" stack, aws, secret"}
      </Line>
      <Line />
      <Line>
        {"s = "}
        <F t="stack" />
        {"("}
        <S t={'"payments"'} />
        {")"}
      </Line>
      <Line />
      <Line>
        {"db = s."}
        <F t="resource" />
        {"(aws.rds."}
        <T t="Instance" />
        {", "}
        <S t={'"main"'} />
        {","}
      </Line>
      <Line>
        {"  instance_class    = "}
        <S t={'"db.r6g.large"'} />
        {","}
      </Line>
      <Line>
        {"  allocated_storage = "}
        <N t="100" />
        {","}
      </Line>
      <Line>
        {"  password          = "}
        <F t="secret" />
        {"("}
        <S t={'"db-password"'} />
        {"),"}
      </Line>
      <Line>{")"}</Line>
      <Line />
      <Line>
        {"s."}
        <F t="resource" />
        {"(aws.sqs."}
        <T t="Queue" />
        {", "}
        <S t={'"settlements"'} />
        {","}
      </Line>
      <Line>
        {"  message_retention_seconds = "}
        <N t="345_600" />
        {",   "}
        <C t="# 4 days" />
      </Line>
      <Line>{")"}</Line>
    </pre>
  );
}

const tabs: WindowTab[] = [
  { id: "ts", long: "TypeScript", short: "TS", content: <TypeScriptSample /> },
  { id: "go", long: "Go", short: "Go", content: <GoSample /> },
  { id: "py", long: "Python", short: "Py", content: <PythonSample /> },
];

export function SdkSection() {
  return (
    <MediumSection
      accent={accents.sdk}
          eyebrow="sdk medium"
          headingLead="Real types."
          headingAccent="Zero execution."
          paragraph="Author in the language your team already uses. The SDK describes infrastructure and nothing else — it emits IR, and the deterministic resolver does the rest."
      points={points}
    >
      <TabbedWindow
        idPrefix="sdk"
        ariaLabel="SDK language"
        tabs={tabs}
        activeTabClass={accents.sdk.tabActive}
      />
    </MediumSection>
  );
}

export default SdkSection;
