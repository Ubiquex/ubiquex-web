import { PlanPanel } from "./PlanPanel";

/*
 * The two hero actions are written out rather than routed through the shared
 * Button: they differ from it in radius, padding and icon placement, and adding
 * two single-use variants there would cost more than it saves.
 */
const actionBase =
  "inline-flex items-center gap-[9px] rounded-[10px] border p-[11px_18px] " +
  "text-[14px] font-semibold whitespace-nowrap transition-colors " +
  "min-[860px]:p-[12px_22px] min-[860px]:text-[14.5px]";

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="M7 11l5 5 5-5" />
      <path d="M4 19h16" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

/*
 * The hero. Unlike the medium sections, which are top-aligned, the copy column
 * is vertically centred inside its full-height cell: a hero reads better
 * balanced. The grid itself stays on the default stretch so both columns share
 * the row height.
 *
 * Copy is centred below 860px and left-aligned above it.
 */
export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-11 px-7 pt-14 pb-16 min-[860px]:grid-cols-2">
      <div className="flex flex-col items-center text-center min-[860px]:items-start min-[860px]:justify-center min-[860px]:text-left">
        <h1 className="mb-[22px] text-[34px] font-bold leading-[1.14] tracking-tight min-[860px]:mb-5 min-[860px]:text-[46px] min-[860px]:leading-[1.08]">
          <span className="text-primary">AI-Native </span>
          <span className="text-brand-bright">Infrastructure Management</span>
        </h1>

        {/*
         * Two strings rather than one. Centred at mobile width the full
         * paragraph ran seven ragged lines and outweighed the heading, so the
         * short form carries the small screen and the full one the large.
         */}
        <p className="text-[15.5px] leading-[1.58] text-muted min-[860px]:max-w-[480px] min-[860px]:text-[16.5px] min-[860px]:leading-[1.66]">
          <span className="min-[860px]:hidden">
            Describe a change in markdown, code, a diagram or a conversation.
            ubx resolves it into a typed, hashed proposal showing what changes,
            what it costs and what it could break. Nothing ships until a human
            signs that hash.
          </span>
          <span className="hidden min-[860px]:inline">
            Describe a change in markdown, code, a diagram or a conversation.
            ubx resolves it against live state into a typed, hashed proposal
            showing exactly what changes, what it costs and what it could break.
            Nothing reaches a provider until a human signs that hash.
          </span>
        </p>

        {/*
         * Inside the copy column and after the paragraph, so DOM order matches
         * the visual order: the panel column comes later in the document, which
         * keeps tab order running heading, copy, actions, panel.
         */}
        <div className="mt-[28px] flex flex-wrap justify-center gap-3 min-[860px]:mt-8 min-[860px]:justify-start">
          <a
            href="https://github.com/Ubiquex/ubiquex/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download ubx, latest release on GitHub"
            className={`${actionBase} border-brand bg-brand text-[#06120f] hover:bg-brand-bright`}
          >
            <DownloadIcon />
            Download
          </a>

          <a
            href="https://docs.ubiquex.io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get Started with the Ubiquex documentation"
            className={`${actionBase} border-[#2a323d] bg-transparent text-[#d6dde5] hover:border-[#3c4552] hover:text-primary`}
          >
            Get Started
            <ArrowIcon />
          </a>
        </div>

        {/*
         * Platform list is what the latest release actually ships: darwin and
         * linux, each on amd64 and arm64. There is no Windows build, so it is
         * not claimed here.
         */}
        <p className="mt-3 font-mono text-[11px] text-dim">
          latest release · macOS, Linux
        </p>
      </div>

      {/* Flex so the panel can be h-full and fill the equal-height row. */}
      <div className="flex flex-col">
        <PlanPanel />
      </div>
    </section>
  );
}

export default Hero;
