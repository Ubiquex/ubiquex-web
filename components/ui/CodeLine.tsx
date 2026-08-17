import type { ReactNode } from "react";

/**
 * One line of a code or document sample, with its trailing newline. Keeps the
 * <pre> blocks readable as source instead of one unbroken string.
 */
export function CodeLine({ children }: { children?: ReactNode }) {
  return (
    <>
      {children}
      {"\n"}
    </>
  );
}

export default CodeLine;
