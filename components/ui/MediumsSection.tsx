import type { CSSProperties, ReactNode } from "react";

/*
 * The authoring-mediums circuit: three mediums converging on one signed
 * proposal. Server component — static markup, no state, no interactivity.
 *
 * Raw hex appears only inside the two SVGs, where gradient stops and stroke
 * paint need literal values. Everything outside them uses design tokens.
 */

function MarkdownIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  );
}

function SdkIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="8 6 3 12 8 18" />
      <polyline points="16 6 21 12 16 18" />
    </svg>
  );
}

function DiagramIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="7" height="6" rx="1.5" />
      <rect x="15" y="3" width="7" height="6" rx="1.5" />
      <rect x="8.5" y="15" width="7" height="6" rx="1.5" />
      <path d="M5.5 9v3h13V9" />
      <path d="M12 12v3" />
    </svg>
  );
}

type Medium = {
  key: string;
  icon: ReactNode;
  /** Base tone, for the icon. */
  iconClass: string;
  /** Bright tone, for the hairline and glow. */
  accent: string;
  title: string;
  body: ReactNode;
};

const mediums: Medium[] = [
  {
    key: "markdown",
    icon: <MarkdownIcon />,
    iconClass: "text-brand",
    accent: "var(--color-brand-bright)",
    title: "Markdown",
    body: (
      <>
        Author intent as a document. Frontmatter plus prose, resolved against
        live state into a typed, hashed proposal.
      </>
    ),
  },
  {
    key: "sdk",
    icon: <SdkIcon />,
    iconClass: "text-accent-bright",
    accent: "var(--color-accent-bright)",
    title: "SDK",
    body: (
      <>
        Describe-only TypeScript with{" "}
        <code className="font-mono text-[13px] text-primary">
          Computed&lt;T&gt;
        </code>{" "}
        and secret refs. Evaluates in a hermetic sandbox — zero execution
        authority.
      </>
    ),
  },
  {
    key: "diagram",
    icon: <DiagramIcon />,
    iconClass: "text-highlight",
    accent: "var(--color-highlight-bright)",
    title: "Diagram",
    body: (
      <>
        Sketch the topology and let ubx resolve the rest. Converges on structure
        — config is the medium&rsquo;s designed limit.
      </>
    ),
  },
];

function DesktopCircuit() {
  return (
    <svg
      viewBox="0 0 1100 400"
      className="hidden h-auto w-full min-[820px]:block"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="nodeGlow">
          <stop offset="0%" stopColor="#00A693" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#00A693" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#00A693" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nodeEdge" x1="0" y1="0" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A693" />
          <stop offset="50%" stopColor="#4B5FD4" />
          <stop offset="100%" stopColor="#CC2936" />
        </linearGradient>
      </defs>

      {/* Ambient traces — inert circuitry behind the node. */}
      <g fill="none" stroke="#1e1e22" strokeWidth="1.2">
        <path d="M470 118 L470 58 L404 58" />
        <path d="M550 116 L550 46" />
        <path d="M630 118 L630 72 L826 72 L826 128" />
        <path d="M56 238 L56 172 L428 172" />
        <path d="M1044 238 L1044 190 L672 190" />
        <path d="M196 300 L196 214 L428 214" />
        <path d="M904 296 L904 226 L672 226" />
      </g>
      <g fill="#2c2c31">
        <circle cx="400" cy="58" r="3.5" />
        <circle cx="550" cy="42" r="3.5" />
        <circle cx="826" cy="132" r="3.5" />
        <circle cx="56" cy="242" r="3.5" />
        <circle cx="1044" cy="242" r="3.5" />
        <circle cx="196" cy="304" r="3.5" />
        <circle cx="904" cy="300" r="3.5" />
      </g>

      {/* The convergence node. */}
      <circle cx="550" cy="182" r="150" fill="url(#nodeGlow)" />
      <circle
        className="ring"
        cx="550"
        cy="182"
        r="104"
        fill="none"
        stroke="#00A693"
        strokeOpacity="0.18"
        strokeWidth="1"
      />
      <circle
        className="ring"
        cx="550"
        cy="182"
        r="128"
        fill="none"
        stroke="#00A693"
        strokeOpacity="0.10"
        strokeWidth="1"
      />
      <rect
        x="432"
        y="126"
        width="236"
        height="112"
        rx="16"
        fill="#0d0d10"
        stroke="url(#nodeEdge)"
        strokeWidth="1.4"
        strokeOpacity="0.55"
      />
      <g fill="none" stroke="#e8e8ea" strokeWidth="2" strokeLinecap="round">
        <path d="M444 148 L444 138 L454 138" />
        <path d="M656 148 L656 138 L646 138" />
        <path d="M444 216 L444 226 L454 226" />
        <path d="M656 216 L656 226 L646 226" />
      </g>
      <text
        x="550"
        y="178"
        textAnchor="middle"
        fontSize="27"
        fontWeight="600"
        fill="#f0f0f2"
      >
        Resource
      </text>
      <text
        x="550"
        y="202"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        fill="#00A693"
        letterSpacing="1"
      >
        signed · 9f3a81
      </text>

      {/* Card -> node traces: an inert base, then the travelling pulse on top. */}
      <g fill="none" stroke="#1e1e22" strokeWidth="1.4">
        <path d="M175 400 L175 292 L490 292 L490 240" />
        <path d="M550 400 L550 240" />
        <path d="M925 400 L925 292 L610 292 L610 240" />
      </g>
      <path
        className="flow flow-md"
        pathLength="1000"
        d="M175 400 L175 292 L490 292 L490 240"
      />
      <path className="flow flow-sdk" pathLength="1000" d="M550 400 L550 240" />
      <path
        className="flow flow-diag"
        pathLength="1000"
        d="M925 400 L925 292 L610 292 L610 240"
      />

      <circle cx="490" cy="240" r="3" fill="#00C4AE" />
      <circle cx="550" cy="240" r="3" fill="#4B5FD4" />
      <circle cx="610" cy="240" r="3" fill="#E8404E" />
    </svg>
  );
}

function MobileCircuit() {
  return (
    <svg
      viewBox="0 0 360 250"
      className="block h-auto w-full min-[820px]:hidden"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="mGlow">
          <stop offset="0%" stopColor="#00A693" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00A693" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mEdge" x1="0" y1="0" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A693" />
          <stop offset="50%" stopColor="#4B5FD4" />
          <stop offset="100%" stopColor="#CC2936" />
        </linearGradient>
        <linearGradient id="stubL" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="#CC2936" stopOpacity="0" />
          <stop offset="100%" stopColor="#E8404E" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="stubR" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="#4B5FD4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1C39BB" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g fill="none" stroke="#1e1e22" strokeWidth="1.2">
        <path d="M150 78 L150 30" />
        <path d="M180 78 L180 16" />
        <path d="M225 78 L225 42 L300 42 L300 70" />
        <path d="M135 78 L135 56 L60 56" />
      </g>
      <g fill="#2c2c31">
        <circle cx="150" cy="26" r="3" />
        <circle cx="180" cy="12" r="3" />
        <circle cx="300" cy="74" r="3" />
        <circle cx="56" cy="56" r="3" />
      </g>

      {/* Side stubs imply the traces that run off-canvas on narrow screens. */}
      <path
        d="M22 148 L96 148"
        fill="none"
        stroke="url(#stubL)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M264 122 L338 122"
        fill="none"
        stroke="url(#stubR)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle cx="180" cy="118" r="86" fill="url(#mGlow)" />
      <circle
        className="ring"
        cx="180"
        cy="118"
        r="74"
        fill="none"
        stroke="#00A693"
        strokeOpacity="0.14"
        strokeWidth="1"
      />
      <rect
        x="96"
        y="78"
        width="168"
        height="80"
        rx="14"
        fill="#0d0d10"
        stroke="url(#mEdge)"
        strokeWidth="1.3"
        strokeOpacity="0.55"
      />
      <g fill="none" stroke="#e8e8ea" strokeWidth="1.8" strokeLinecap="round">
        <path d="M107 95 L107 88 L114 88" />
        <path d="M253 95 L253 88 L246 88" />
        <path d="M107 141 L107 148 L114 148" />
        <path d="M253 141 L253 148 L246 148" />
      </g>
      <text
        x="180"
        y="116"
        textAnchor="middle"
        fontSize="20"
        fontWeight="600"
        fill="#f0f0f2"
      >
        Resource
      </text>
      <text
        x="180"
        y="134"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        fill="#00A693"
        letterSpacing="1"
      >
        signed · 9f3a81
      </text>

      <path
        d="M180 250 L180 158"
        fill="none"
        stroke="#1e1e22"
        strokeWidth="1.4"
      />
      <path
        className="flow flow-md"
        pathLength="1000"
        d="M180 250 L180 158"
      />
    </svg>
  );
}

export function MediumsSection() {
  return (
    <section className="bg-ink">
      <div className="mx-auto w-full max-w-6xl px-7 pt-8 pb-20">
        <div className="text-center">
          <h2 className="text-[27px] font-bold tracking-tight text-primary min-[820px]:text-[40px]">
            Author however you think
          </h2>
          <p className="mt-3 text-[15px] text-dim">
            Every medium converges on the same signed proposal.
          </p>
        </div>

        <div className="mt-10">
          <DesktopCircuit />
          <MobileCircuit />
        </div>

        <div className="grid grid-cols-1 gap-4 min-[820px]:-mt-[14px] min-[820px]:grid-cols-3 min-[820px]:gap-6">
          {mediums.map((medium) => (
            <div
              key={medium.key}
              className="medium-card rounded-[14px] border border-line bg-panel p-[26px_22px_28px] min-[820px]:p-[30px_28px_32px]"
              style={{ "--accent": medium.accent } as CSSProperties}
            >
              <div className={`mb-[26px] min-[820px]:mb-[44px] ${medium.iconClass}`}>
                {medium.icon}
              </div>
              <h3 className="mb-3 text-[21px] font-bold tracking-tight text-primary">
                {medium.title}
              </h3>
              <p className="text-[14.5px] leading-[1.62] text-muted">
                {medium.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MediumsSection;
