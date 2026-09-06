import { Container } from "@/components/ui/Container";
import { Window } from "@/components/ui/Window";
import { TabbedWindow } from "@/components/ui/TabbedWindow";

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-body">
      <code>{children}</code>
    </pre>
  );
}

// Import paths and package names verified against the real registries:
// @ubx/sdk and @ubx/sdk-aws on npm, ubx-sdk and ubx-sdk-aws on PyPI,
// github.com/ubiquex/ubx-sdk-go and .../ubx-sdk-aws/sdk/go on the Go
// module proxy. Not written from memory.
const GO = `import (
	ubx "github.com/ubiquex/ubx-sdk-go/runtime"
	sqs "github.com/ubiquex/ubx-sdk-aws/sdk/go/aws/sqs"
)

func main() {
	ubx.Main(ubx.Stack("payments", func() {
		ubx.Intent(ubx.IntentInfo{Summary: "hello, ubx"})
		ubx.Resource(sqs.Queue, "example", sqs.QueueConfig{
			Name: "example",
		})
	}))
}`;

const TS = `import { stack, intent, resource } from "@ubx/sdk";
import { Queue } from "@ubx/sdk-aws/aws/sqs/queue";

export default stack("payments", () => {
  intent({ summary: "hello, ubx" });
  resource(Queue, "example", {
    name: "example",
  });
});`;

const PY = `import ubx_sdk as ubx
from ubx.aws.sqs import Queue, QueueConfig

def describe():
    ubx.intent("hello, ubx")
    ubx.resource(Queue, "example", QueueConfig(
        name="example",
    ))`;

export function SdkTabs() {
  return (
    <Container className="py-20">
      <h2 className="text-2xl font-medium text-primary">Real code, in a language you already use</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-body">
        Typed bindings generated from each provider&rsquo;s own published schema. The
        program describes intent and never executes anything: it is evaluated into a
        proposal, which you then read.
      </p>
      <div className="mt-8">
        <TabbedWindow
          idPrefix="sdk"
          ariaLabel="SDK language"
          activeTabClass="text-brand-bright"
          tabs={[
            { id: "go", long: "Go", short: "Go", content: <Code>{GO}</Code> },
            { id: "ts", long: "TypeScript", short: "TS", content: <Code>{TS}</Code> },
            { id: "py", long: "Python", short: "Py", content: <Code>{PY}</Code> },
          ]}
        />
      </div>
    </Container>
  );
}

// The HCL form and the "@<stack>.<type>.<name>.<attribute>" reference are
// verified against the real docs and against a live two-stack run.
const HCL = `stack = "platform"

blueprint "postgres" "primary" {
  source  = "../blueprints/postgres"
  size    = "db.r6g.large"
  storage = 100
}

blueprint "service" "api" {
  source   = "../blueprints/service"
  replicas = 3
  vpc_id   = "@network.aws_vpc.main.id"
}`;

export function HclSection() {
  return (
    <Container className="py-20">
      <h2 className="text-2xl font-medium text-primary">Compose without a language to learn</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-body">
        A fixed, closed shape: blocks, parameters, and cross-stack references. No
        locals, no loops, no conditionals, no functions, no string interpolation. The
        same handful of moves every time.
      </p>
      <div className="mt-8">
        <Window label="platform.ubx.hcl">
          <Code>{HCL}</Code>
        </Window>
      </div>
    </Container>
  );
}

// Every command named here exists in `ubx --help`.
const LEDGER = [
  { cmd: "ubx why", body: "Explain any accepted proposal, or a resource's full history: what changed, who signed it, and when." },
  { cmd: "ubx scan", body: "Compare one resource's live state against the ledger, and generate an adoption or drift proposal if they differ." },
  { cmd: "ubx blame", body: "Per-attribute provenance: which proposal last set each attribute, and who signed that one." },
];

export function LedgerSection() {
  return (
    <Container className="py-20">
      <h2 className="text-2xl font-medium text-primary">The ledger answers the questions you actually ask</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-body">
        Current truth is folded from an append-only record rather than stored, so there
        is no state file to lock, corrupt or lose. When reality and the ledger disagree,
        the disagreement is itself a proposal you sign: adopt what changed, or revert it.
      </p>
      <div className="mt-8 space-y-3">
        {LEDGER.map((l) => (
          <div key={l.cmd} className="rounded-xl border border-line p-5">
            <code className="text-brand-bright">{l.cmd}</code>
            <p className="mt-2 text-sm leading-relaxed text-body">{l.body}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
