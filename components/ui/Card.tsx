import Link from "next/link";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** When set, the whole card becomes a link and gains a hover affordance. */
  href?: string;
};

const base = "block rounded-lg border border-edge bg-panel p-6";
const interactive =
  "transition-colors duration-150 hover:border-brand focus-visible:border-brand";

export function Card({ children, className = "", href }: CardProps) {
  if (href) {
    return (
      <Link href={href} className={`${base} ${interactive} ${className}`}>
        {children}
      </Link>
    );
  }

  return <div className={`${base} ${className}`}>{children}</div>;
}

export default Card;
