import type { ReactNode } from "react";

type WindowProps = {
  /** Centred mono label in the titlebar. */
  label: string;
  /** Optional right-aligned titlebar slot. Callers control its responsive visibility. */
  badge?: ReactNode;
  /** Panel body. Callers supply their own padding, which differs per panel. */
  children: ReactNode;
};

/**
 * Shared window chrome: rounded panel, titlebar with traffic lights and a
 * centred label. Used by PlanPanel and MarkdownSection so the two panels
 * cannot drift apart.
 */
export function Window({ label, badge, children }: WindowProps) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-line bg-panel">
      <div className="relative flex items-center border-b border-line px-4 py-3">
        <div className="flex gap-[6px]">
          <span className="h-[10px] w-[10px] rounded-full bg-dot-red" />
          <span className="h-[10px] w-[10px] rounded-full bg-dot-amber" />
          <span className="h-[10px] w-[10px] rounded-full bg-dot-green" />
        </div>

        <span className="absolute inset-x-0 text-center font-mono text-[12px] text-dim">
          {label}
        </span>

        {/* `relative` so the badge paints above the absolutely-centred label. */}
        {badge ? <div className="relative ml-auto">{badge}</div> : null}
      </div>

      {children}
    </div>
  );
}

export default Window;
