"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Window } from "./Window";

/*
 * The SDK medium in detail. Client component — the only state is the active
 * language tab.
 *
 * One markup tree, one copy of each sample. The copy block is first in the DOM
 * and already belongs on the left at desktop width, so unlike MarkdownSection
 * this section carries no `order` utilities.
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

/** One line of a sample, with its trailing newline. */
function Line({ children }: { children?: ReactNode }) {
  return (
    <>
      {children}
      {"\n"}
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[3px] h-[15px] w-[15px] flex-shrink-0 text-accent min-[860px]:h-4 min-[860px]:w-4"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const points: { lead: string; rest: string }[] = [
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
    rest: " — every attribute across 5,200+ resource types is typed at author time.",
  },
];

function TypeScriptSample() {
  return (
    <>
      <Line>
        <K t="import" />
        {" { stack, aws, secret, cross } "}
        <K t="from" />
        {" "}
        <S t={'"@ubx/sdk"'} />
        {";"}
      </Line>
      <Line />
      <Line>
        <K t="const" />
        {" s   = "}
        <F t="stack" />
        {"("}
        <S t={'"payments"'} />
        {");"}
      </Line>
      <Line>
        <K t="const" />
        {" vpc = "}
        <F t="cross" />
        {"("}
        <S t={'"network"'} />
        {", "}
        <S t={'"vpc_id"'} />
        {");   "}
        <C t="// pinned" />
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
      <Line>{"  vpcId:            vpc,"}</Line>
      <Line>
        {"  password:         "}
        <F t="secret" />
        {"("}
        <S t={'"payments-db-password"'} />
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
        {",     "}
        <C t="// 4 days" />
      </Line>
      <Line>{"});"}</Line>
    </>
  );
}

function GoSample() {
  return (
    <>
      <Line>
        <K t="package" />
        {" main"}
      </Line>
      <Line />
      <Line>
        <K t="import" />
        {" ("}
      </Line>
      <Line>
        {"  "}
        <S t={'"github.com/ubiquex/ubx-sdk-go/ubx"'} />
      </Line>
      <Line>
        {"  "}
        <S t={'"github.com/ubiquex/ubx-sdk-go/aws"'} />
      </Line>
      <Line>{")"}</Line>
      <Line />
      <Line>
        <K t="func" />
        {" "}
        <F t="main" />
        {"() {"}
      </Line>
      <Line>
        {"  s   := ubx."}
        <F t="Stack" />
        {"("}
        <S t={'"payments"'} />
        {")"}
      </Line>
      <Line>
        {"  vpc := ubx."}
        <F t="Cross" />
        {"("}
        <S t={'"network"'} />
        {", "}
        <S t={'"vpc_id"'} />
        {")  "}
        <C t="// pinned" />
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
        <S t={'"vpcId"'} />
        {":            vpc,"}
      </Line>
      <Line>
        {"    "}
        <S t={'"password"'} />
        {":         ubx."}
        <F t="Secret" />
        {"("}
        <S t={'"payments-db-password"'} />
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
        {",   "}
        <C t="// 4 days" />
      </Line>
      <Line>{"  })"}</Line>
      <Line>{"}"}</Line>
    </>
  );
}

function PythonSample() {
  return (
    <>
      <Line>
        <K t="from" />
        {" ubx "}
        <K t="import" />
        {" stack, aws, secret, cross"}
      </Line>
      <Line />
      <Line>
        {"s   = "}
        <F t="stack" />
        {"("}
        <S t={'"payments"'} />
        {")"}
      </Line>
      <Line>
        {"vpc = "}
        <F t="cross" />
        {"("}
        <S t={'"network"'} />
        {", "}
        <S t={'"vpc_id"'} />
        {")   "}
        <C t="# pinned" />
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
      <Line>{"  vpc_id            = vpc,"}</Line>
      <Line>
        {"  password          = "}
        <F t="secret" />
        {"("}
        <S t={'"payments-db-password"'} />
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
        {",      "}
        <C t="# 4 days" />
      </Line>
      <Line>{")"}</Line>
    </>
  );
}

const languages = [
  { id: "ts", long: "TypeScript", short: "TS", Sample: TypeScriptSample },
  { id: "go", long: "Go", short: "Go", Sample: GoSample },
  { id: "py", long: "Python", short: "Py", Sample: PythonSample },
];

export function SdkSection() {
  const [active, setActive] = useState(languages[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();

    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next = (index + delta + languages.length) % languages.length;
    setActive(languages[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="bg-ink">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-[30px] px-7 pt-8 pb-20 min-[860px]:grid-cols-2 min-[860px]:items-center min-[860px]:gap-[52px]">
        {/* Copy is first in the DOM and already belongs on the left: no `order`. */}
        <div>
          <span className="mb-4 inline-block rounded-full border border-accent/45 bg-accent/14 px-[10px] py-[4px] font-mono text-[10.5px] tracking-[0.08em] text-accent uppercase min-[860px]:mb-5 min-[860px]:px-[12px] min-[860px]:py-[5px] min-[860px]:text-[11.5px]">
            sdk medium
          </span>

          <h2 className="mb-[14px] text-[27px] font-bold leading-[1.14] tracking-tight min-[860px]:mb-[18px] min-[860px]:text-[37px]">
            <span className="text-primary">Real types. </span>
            <span className="text-accent">Zero execution.</span>
          </h2>

          <p className="mb-[22px] text-[14.5px] leading-[1.65] text-muted min-[860px]:mb-[26px] min-[860px]:max-w-[470px] min-[860px]:text-[16px]">
            Author in the language your team already uses. The SDK describes
            infrastructure and nothing else — it emits IR, and the deterministic
            resolver does the rest.
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

        <div>
          <Window
            titlebar={
              <div role="tablist" aria-label="SDK language" className="ml-1 flex gap-[3px]">
                {languages.map((language, index) => {
                  const selected = language.id === active;
                  return (
                    <button
                      key={language.id}
                      ref={(node) => {
                        tabRefs.current[index] = node;
                      }}
                      type="button"
                      role="tab"
                      id={`sdk-tab-${language.id}`}
                      aria-controls={`sdk-panel-${language.id}`}
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActive(language.id)}
                      onKeyDown={(event) => onTabKeyDown(event, index)}
                      className={`rounded-md border px-2 py-[4px] font-mono text-[10.5px] whitespace-nowrap transition-colors min-[860px]:px-[11px] min-[860px]:text-[11.5px] ${
                        selected
                          ? "border-accent/42 bg-accent/16 text-accent"
                          : "border-transparent text-dim hover:text-code-plain"
                      }`}
                    >
                      {/* Both labels ship; the variant picks one. */}
                      <span className="hidden min-[860px]:inline">
                        {language.long}
                      </span>
                      <span className="min-[860px]:hidden">
                        {language.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            }
          >
            {languages.map(({ id, Sample }) => (
              <div
                key={id}
                role="tabpanel"
                id={`sdk-panel-${id}`}
                aria-labelledby={`sdk-tab-${id}`}
                hidden={id !== active}
              >
                <pre className="min-h-[260px] overflow-x-auto p-[16px] font-mono text-[11px] leading-[1.8] whitespace-pre text-code-plain min-[860px]:min-h-[300px] min-[860px]:p-[20px_22px] min-[860px]:text-[12.5px]">
                  <Sample />
                </pre>
              </div>
            ))}
          </Window>
        </div>
      </div>
    </section>
  );
}

export default SdkSection;
