import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** "prose" narrows the measure for long-form reading (blog posts). */
  width?: "default" | "prose";
};

const widths = {
  default: "max-w-5xl",
  prose: "max-w-2xl",
} as const;

export function Container({
  children,
  className = "",
  width = "default",
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-6 ${widths[width]} ${className}`}>
      {children}
    </div>
  );
}

export default Container;
