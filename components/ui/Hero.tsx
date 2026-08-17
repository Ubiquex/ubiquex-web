import { PlanPanel } from "./PlanPanel";

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
      </div>

      {/* Flex so the panel can be h-full and fill the equal-height row. */}
      <div className="flex flex-col">
        <PlanPanel />
      </div>
    </section>
  );
}

export default Hero;
