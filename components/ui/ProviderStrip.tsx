/*
 * "Works with" strip beneath the hero.
 *
 * Names are set as text rather than logos. The AWS and Azure marks are absent
 * from simple-icons entirely, and an approximation drawn by hand would look
 * plausible while being wrong, so all four get one uniform text treatment
 * instead of a row that is half real marks and half not.
 */

const providers = ["AWS", "Google Cloud", "Azure", "Kubernetes"];

export function ProviderStrip() {
  return (
    <section className="border-t border-line px-5 pt-7 pb-9 text-center min-[860px]:px-10 min-[860px]:pt-[34px] min-[860px]:pb-[46px]">
      <p className="mb-[22px] text-[13.5px] text-dim min-[860px]:mb-[26px]">
        Covering over{" "}
        <strong className="font-semibold text-[#a8b0ba]">
          4,197 resource types
        </strong>
        {/* The qualifier is dropped below 860px, where the line would wrap. */}
        <span className="hidden min-[860px]:inline"> across four providers</span>
      </p>

      {/*
       * A 2x2 grid below 860px. Left to wrap on its own the four names break
       * 3 + 1 and strand Kubernetes on its own line; the grid makes the break
       * symmetric at every phone width. Above 860px they fit one row.
       */}
      <div className="grid grid-cols-2 justify-items-center gap-x-5 gap-y-4 min-[860px]:flex min-[860px]:flex-wrap min-[860px]:items-center min-[860px]:justify-center min-[860px]:gap-12">
        {providers.map((provider) => (
          <span
            key={provider}
            className="text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap text-[#8b939d] min-[860px]:text-[14.5px]"
          >
            {provider}
          </span>
        ))}
      </div>
    </section>
  );
}

export default ProviderStrip;
