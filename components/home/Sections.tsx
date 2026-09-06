import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

// The four-step flow. These are four real commands, each of which exists
// in `ubx --help`, in this order.
const STEPS = [
  { verb: "author", cmd: "your editor, or an assistant",
    body: "Describe the change in an SDK program, an HCL file, or a plain intent file. Nothing is signed yet." },
  { verb: "plan", cmd: "ubx plan",
    body: "Resolve it into a draft proposal against real provider schema. Every interpretive choice is listed for you to sign." },
  { verb: "accept", cmd: "ubx accept",
    body: "Sign it. The proposal is hashed and appended to an append-only ledger, or derived from a reviewed PR merge." },
  { verb: "ship", cmd: "ubx ship",
    body: "The only command that touches your cloud. It executes an already-accepted proposal, nothing else." },
];

export function StepFlow() {
  return (
    <Container className="py-20">
      <h2 className="text-2xl font-medium text-primary">Four steps, and only one of them touches your cloud</h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Card key={s.verb}>
            <div className="p-5">
              <div className="text-xs text-muted">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-2 font-medium text-primary">{s.verb}</div>
              <code className="mt-1 block text-[13px] text-brand-bright">{s.cmd}</code>
              <p className="mt-3 text-sm leading-relaxed text-body">{s.body}</p>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}

// Both cards below make claims that are checked.
//   8 MCP tools: exactly eight mcp.AddTool calls in cli/mcp.go and
//   cli/mcp_blueprint.go, named in the card itself.
//   30 public repos: gh repo list Ubiquex --visibility public, none
//   archived. NOT 23, which is the private count.
export function AiAndEcosystem() {
  return (
    <Container className="py-20">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="p-6">
            <h3 className="font-medium text-primary">AI native, and bounded</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">
              An assistant can read your ledger and draft blueprints over MCP, through
              eight tools: <code className="text-brand-bright">ubx_why</code>,{" "}
              <code className="text-brand-bright">ubx_status</code>,{" "}
              <code className="text-brand-bright">ubx_scan</code>, and five for authoring.
              None of them can ship. Every interpretive choice a draft makes is listed
              under &ldquo;AI defaults, you are signing these&rdquo; before you sign.
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="font-medium text-primary">Open ecosystem</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">
              Thirty public repositories: the engine, the provider bridge, eight pinned
              provider schemas, and SDK bindings in Go, TypeScript and Python. Providers
              come from real published schemas, not hand-written wrappers, so the
              reference is generated rather than maintained.
            </p>
          </div>
        </Card>
      </div>
    </Container>
  );
}

export function ClosingCta() {
  return (
    <Container className="py-24 text-center">
      <h2 className="text-3xl font-medium text-primary">Every change, recorded and signed</h2>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-body">
        ubx is v0.3.0 and early. The ledger format and CLI surface are still moving.
        If that is the right trade for you, the install page is one command.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <a href="https://docs.ubiquex.io/install"
           className="rounded-full bg-brand px-5 py-2.5 text-ink transition-colors hover:bg-brand-bright">
          Install ubx
        </a>
        <a href="https://docs.ubiquex.io"
           className="rounded-full border border-line px-5 py-2.5 text-primary transition-colors hover:border-brand">
          Read the docs
        </a>
      </div>
    </Container>
  );
}
