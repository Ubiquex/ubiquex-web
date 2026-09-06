import { CodeBlock, CodeTabs, PageShell } from "@ubx/docs-ui";
import { Terminal } from "@/components/home/Terminal";
import { NAV, FOOTER } from "@/lib/site";
import "./home.css";

// The seven bands of design/home-reference.html, DOM for DOM.
//
// The styling comes from app/home.css, which is that file's own
// stylesheet ported verbatim rather than reimplemented in utilities.
// If this page and the reference disagree, the reference is right.

const TS = `// payments.ts

import * as ubx from "@ubx/sdk";
import * as aws from "@ubx/sdk-aws";

export default ubx.stack("payments", () => {
  aws.rds.DbInstance(stack, "main", {
    instanceClass:    "db.r6g.large",
    allocatedStorage: 100,
    password: ubx.secret("db-password"),
  });

  aws.sqs.Queue(stack, "settlements", {
    messageRetentionSeconds: 345600,
  });
});`;

const GO = `// payments.go

package main

import (
	ubx "github.com/ubiquex/ubx-sdk-go/runtime"
	aws "github.com/ubiquex/ubx-sdk-aws/sdk/go/aws"
)

func main() {
	ubx.Main(ubx.Stack("payments", func() {
		aws.RdsDbInstance("main", aws.RdsDbInstanceConfig{
			InstanceClass:    "db.r6g.large",
			AllocatedStorage: 100,
		})
	}))
}`;

const PY = `# payments.py

import ubx_sdk as ubx
from ubx.aws import rds, sqs

def describe():
    rds.db_instance("main", instance_class="db.r6g.large",
                    allocated_storage=100)
    sqs.queue("settlements", message_retention_seconds=345600)`;

const HCL = `# payments.ubx.hcl

stack = "payments"

blueprint "postgres" "primary" {
  source  = "acme/postgres"
  version = "1.2.0"
  size    = "db.r6g.large"
}

blueprint "service" "api" {
  source   = "acme/service"
  vpc_id   = "@network.aws_vpc.main.id"
  replicas = 3
}`;

const STATS = [
  { n: "Signed", c: "var(--accent-lt)", l: "every change, bound to its hash" },
  { n: "Generated", c: "var(--blue)", l: "from each vendor's own API" },
  { n: "Typed", c: "var(--yellow)", l: "in Go, TypeScript and Python" },
  { n: "Stateless", c: "var(--red)", l: "truth folds from the ledger" },
];

const STEPS = [
  { n: "1", cmd: "your editor", h: "Author", p: "Write it in Go, TypeScript or Python, or describe it to an assistant. The SDK describes infrastructure and never executes anything." },
  { n: "2", cmd: "ubx plan", h: "Plan", p: "Resolved against live state into a typed, hashed proposal. Every assumption an assistant made is listed for you to read." },
  { n: "3", cmd: "ubx accept", h: "Accept", p: "One signature, bound to that exact hash. Nothing can change between review and apply, and there is no path around this step." },
  { n: "4", cmd: "ubx ship", h: "Ship", p: "The only command that reaches a provider. It applies what was signed, then appends the result to the ledger.", live: true },
];

const CHAIN = [
  { hash: "4b1e77", h: "vpc created", p: "signed by roozbeh · 12 Aug" },
  { hash: "7fc2a91", h: "primary database", p: "signed by roozbeh · 14 Aug" },
  { hash: "9f3a81", h: "read replica, queue", p: "awaiting signature" },
];

const LEDGER = [
  { h: "Why does this exist", cmd: "ubx why", p: "Walk any resource back to the proposal that created it, the intent behind it, and the person who signed it." },
  { h: "What changed underneath", cmd: "ubx scan", p: "Compare live state against the ledger, and turn any difference into an adoption or revert proposal." },
  { h: "Who set this attribute", cmd: "ubx blame", p: "Per-attribute provenance: which proposal last set each field, and who signed that one." },
];

export default function HomePage() {
  return (
    <PageShell nav={NAV} footer={FOOTER} showThemeToggle={false} githubUrl="https://github.com/Ubiquex/ubiquex" fullBleed>
      {/* BAND 1: hero and terminal, base tone */}
      <div className="band first" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="wrap">
          <div className="hero">
            <h1>
              <span style={{ color: "var(--accent)" }}>AI-Native</span> Infrastructure Engineering
            </h1>
            <p className="lede">AI assists. A human signs. The ledger remembers.</p>
            <div className="cta-row">
              <a className="btn btn-primary" href="https://docs.ubiquex.io">Get started</a>
              <a className="btn btn-ghost" href="https://providers.ubiquex.io">Browse providers</a>
            </div>
          </div>
          <Terminal />
        </div>
      </div>

      {/* BAND 2: stats, alt tone */}
      <div className="band alt" style={{ padding: "44px 0" }}>
        <div className="wrap">
          <div className="stats">
            {STATS.map((s) => (
              <div className="stat" key={s.n}>
                <div className="n fact" style={{ color: s.c }}>{s.n}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BAND 3: how it works, base tone */}
      <div className="band">
        <div className="wrap">
          <div className="kicker">HOW IT WORKS</div>
          <h2>From intent to signed reality</h2>
          <p className="section-lede">Each step leaves a record. Months later you can walk any resource back through all four and see what happened, and who decided it.</p>
          <div className="steps">
            {STEPS.map((s) => (
              <div className={s.live ? "step live" : "step"} key={s.n}>
                <span className="ghost">{s.n}</span>
                <div className="cmd">{s.cmd}</div>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BAND 4: authoring, two columns side by side, alt tone */}
      <div className="band alt">
        <div className="wrap">
          <div className="authoring">
            <div>
              <div className="kicker">AUTHOR</div>
              <h2>Real types. Zero execution.</h2>
              <p className="section-lede">Typed bindings generated from each provider&rsquo;s own schema. The program describes intent and never executes anything.</p>
              {/* The shared shell, not this site's own copy. That copy was
                  correct and the provider site's equivalent was not, which
                  is exactly the split @ubx/docs-ui exists to close.
                  classNames carry the reference's own .tabs markup, so the
                  appearance is unchanged. */}
              <CodeTabs
                defaultLabel="TypeScript"
                classNames={{ list: "tabs", tabActive: "on", panel: "code-panel" }}
                tabs={[
                  { label: "TypeScript", panel: <CodeBlock code={TS} lang="typescript" /> },
                  { label: "Go", panel: <CodeBlock code={GO} lang="go" /> },
                  { label: "Python", panel: <CodeBlock code={PY} lang="python" /> },
                ]}
              />
            </div>
            <div>
              <div className="kicker">COMPOSE</div>
              <h2>Without a language to learn</h2>
              <p className="section-lede">The complexity lives in the blueprint, where a real language earns its keep. Calling one is declarative.</p>
              <CodeTabs
                classNames={{ list: "tabs", tabActive: "on", panel: "code-panel" }}
                tabs={[{ label: "HCL", panel: <CodeBlock code={HCL} lang="hcl" /> }]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* BAND 5: the ledger, alt tone */}
      <div className="band alt">
        <div className="wrap">
          <div className="kicker">THE LEDGER</div>
          <h2>No state file. An append-only record.</h2>
          <p className="section-lede">Current truth is folded from the record rather than stored, so there is nothing to lock, corrupt or lose. Each entry names its parent, so history cannot be quietly rewritten.</p>
          <div className="chain">
            {CHAIN.map((c) => (
              <div className="link" key={c.hash}>
                <div className="node"><span className="bullet" />{c.hash}</div>
                <h4>{c.h}</h4>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
          <div className="ledger-grid">
            {LEDGER.map((l) => (
              <div key={l.cmd}>
                <h3>{l.h}</h3>
                <div className="cmd">{l.cmd}</div>
                <p>{l.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BAND 6: theme cards, base tone */}
      <div className="band">
        <div className="wrap">
          <div className="kicker">WHY UBX</div>
          <h2>Built for assistants, open by construction</h2>
          <p className="section-lede">An assistant can do the work but never the signing. Providers are generated from each vendor&rsquo;s published API, so coverage is broad on day one and stays current on its own.</p>
          <div className="themes">
            <div className="theme-card">
              <div className="kicker">MCP NATIVE</div>
              <h2>Bring your own model</h2>
              <p>ubx speaks the Model Context Protocol, so Claude, ChatGPT or any MCP client can read your ledger, explain a resource and draft a blueprint. Eight tools, none of which can ship.</p>
              <div className="theme-stats">
                <div><div className="n">8</div><div className="l">MCP tools</div></div>
                <div><div className="n">0</div><div className="l">that can apply</div></div>
              </div>
            </div>
            <div className="theme-card">
              <div className="kicker">OPEN ECOSYSTEM</div>
              <h2>Generated from the vendor&rsquo;s own API</h2>
              <p>No hand-written provider to wait on. Schemas come from CloudFormation, OpenAPI, Smithy and Discovery Docs, so coverage tracks the API rather than a maintainer&rsquo;s backlog.</p>
              <div className="theme-stats">
                <div><div className="n">8</div><div className="l">providers</div></div>
                <div><div className="n">13,000+</div><div className="l">resources and data sources</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BAND 7: closing, alt tone */}
      <div className="band alt">
        <div className="wrap">
          <div className="closing">
            <h2>Ship your first stack</h2>
            <p>Install ubx, write a stack in the language you already use, and read the proposal before anything reaches a provider.</p>
            <div className="cta-row">
              <a className="btn btn-primary" href="https://docs.ubiquex.io/install">Install ubx</a>
              <a className="btn btn-ghost" href="https://docs.ubiquex.io">Read the docs</a>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
