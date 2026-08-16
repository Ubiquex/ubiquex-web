import { PlanPanel } from "./PlanPanel";

export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-11 px-7 pt-14 pb-16 menu:grid-cols-2">
      <div>
        <h1 className="text-[28px] font-bold leading-[1.14] tracking-tight menu:text-[38px]">
          <span className="text-primary">AI-Native </span>
          <span className="text-brand-bright">Infrastructure Management</span>
        </h1>

        <p className="mt-5 max-w-[440px] text-[14.5px] text-muted menu:text-[15.5px]">
          Every infrastructure change is a typed, hashed, signed proposal. AI
          drafts it, you sign it, the ledger remembers.
        </p>
      </div>

      {/* Below `menu` the grid is single-column, so this stacks under the text. */}
      <div className="mt-7 menu:mt-0">
        <PlanPanel />
      </div>
    </section>
  );
}

export default Hero;
