import type { ReactNode } from "react";

type WindowProps = {
  /** Centred mono label. Omit when `titlebar` supplies its own content. */
  label?: string;
  /** Inline titlebar content placed after the traffic lights, e.g. a tab row. */
  titlebar?: ReactNode;
  /** Right-aligned titlebar slot. Callers control its responsive visibility. */
  badge?: ReactNode;
  /** Panel body. Callers supply their own padding, which differs per panel. */
  children: ReactNode;
};

/**
 * Shared window chrome: rounded panel, titlebar with traffic lights, and either
 * a centred label or caller-supplied inline content. Used by PlanPanel,
 * MarkdownSection and SdkSection so the three panels cannot drift apart.
 */
export function Window({ label, titlebar, badge, children }: WindowProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-panel">
      <div className="relative flex shrink-0 items-center border-b border-line px-[14px] py-[10px]">
        <div className="flex gap-[6px]">
          <span className="h-[9px] w-[9px] rounded-full bg-dot-red" />
          <span className="h-[9px] w-[9px] rounded-full bg-dot-amber" />
          <span className="h-[9px] w-[9px] rounded-full bg-dot-green" />
        </div>

        {label ? (
          <span className="absolute inset-x-0 text-center font-mono text-[11.5px] text-dim">
            {label}
          </span>
        ) : null}

        {titlebar}

        {/* `relative` so the badge paints above the absolutely-centred label. */}
        {badge ? <div className="relative ml-auto">{badge}</div> : null}
      </div>

      {/* Takes the remaining height so the body fills an equal-height column. */}
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}

export default Window;
