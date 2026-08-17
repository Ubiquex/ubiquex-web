"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Window } from "./Window";

/*
 * A Window whose titlebar is a real ARIA tabset: roving tabindex, arrow-key
 * navigation, and inactive panes hidden rather than merely collapsed.
 *
 * This is the client boundary for the medium sections. The sections themselves
 * stay server components and pass their panes in as already-rendered nodes.
 */

export type WindowTab = {
  id: string;
  /** Label at desktop width. */
  long: string;
  /** Label below 860px, where the titlebar is narrow. */
  short: string;
  content: ReactNode;
};

type TabbedWindowProps = {
  /** Namespaces the tab/panel ids so several tabsets can coexist on a page. */
  idPrefix: string;
  ariaLabel: string;
  tabs: WindowTab[];
  /** Accent classes for the selected tab. */
  activeTabClass: string;
};

export function TabbedWindow({
  idPrefix,
  ariaLabel,
  tabs,
  activeTabClass,
}: TabbedWindowProps) {
  const [active, setActive] = useState(tabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();

    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next = (index + delta + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <Window
      titlebar={
        <div
          role="tablist"
          aria-label={ariaLabel}
          className="ml-1 flex gap-[3px]"
        >
          {tabs.map((tab, index) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${idPrefix}-tab-${tab.id}`}
                aria-controls={`${idPrefix}-panel-${tab.id}`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`rounded-md border px-2 py-[4px] font-mono text-[10.5px] whitespace-nowrap transition-colors min-[860px]:px-[11px] min-[860px]:text-[11.5px] ${
                  selected
                    ? activeTabClass
                    : "border-transparent text-dim hover:text-code-plain"
                }`}
              >
                {/* Both labels ship; the variant picks one. */}
                <span className="hidden min-[860px]:inline">{tab.long}</span>
                <span className="min-[860px]:hidden">{tab.short}</span>
              </button>
            );
          })}
        </div>
      }
    >
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${idPrefix}-panel-${tab.id}`}
          aria-labelledby={`${idPrefix}-tab-${tab.id}`}
          hidden={tab.id !== active}
        >
          {tab.content}
        </div>
      ))}
    </Window>
  );
}

export default TabbedWindow;
