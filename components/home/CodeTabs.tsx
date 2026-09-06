"use client";

import { useState } from "react";

// A client shell around panels the server already rendered.
//
// CodeBlock is an async server component, so it cannot be called from
// inside a client component. Rendering every panel on the server and
// toggling visibility here is the way to have both real syntax
// highlighting and tabs that actually switch. The reference could only
// show a static `.on` span; this keeps its markup and makes it work.
//
// Inactive panels are hidden rather than unmounted, matching the shim
// layer on the docs site: unmounting would re-run nothing (they are
// already rendered) but would lose scroll position in a wide block.
export function CodeTabs({
  labels,
  panels,
}: {
  labels: string[];
  panels: React.ReactNode[];
}) {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className="tabs">
        {labels.map((l, i) => (
          <span
            key={l}
            role="button"
            tabIndex={0}
            className={i === active ? "on" : undefined}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(i);
              }
            }}
          >
            {l}
          </span>
        ))}
      </div>
      {panels.map((p, i) => (
        <div key={i} className="code-panel" hidden={i !== active}>
          {p}
        </div>
      ))}
    </>
  );
}
