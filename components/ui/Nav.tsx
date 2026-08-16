"use client";

import Link from "next/link";
import { useState } from "react";

type NavLink = { href: string; label: string; external?: boolean };

const links: NavLink[] = [
  { href: "https://docs.ubiquex.io", label: "Docs", external: true },
  { href: "/providers", label: "Providers" },
  {
    href: "https://docs.ubiquex.io/v1/installation",
    label: "Install",
    external: true,
  },
  {
    href: "https://docs.ubiquex.io/v1/tutorials",
    label: "Tutorial",
    external: true,
  },
  { href: "/blog", label: "Blog" },
];

/** Renders an <a> for off-site links and a next/link for internal routes. */
function NavItem({
  link,
  className,
  onClick,
}: {
  link: NavLink;
  className?: string;
  onClick?: () => void;
}) {
  if (link.external) {
    return (
      <a
        href={link.href}
        className={className}
        onClick={onClick}
        rel="noreferrer"
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className} onClick={onClick}>
      {link.label}
    </Link>
  );
}

function GitHubMark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

/** Shared styling for the two 32x32 icon buttons on the right. */
const iconButton =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg border " +
  "border-line bg-transparent text-muted transition-colors hover:text-primary";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-line bg-ink">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-7 py-3">
        <Link
          href="/"
          className="text-[19px] font-bold tracking-tight text-brand"
        >
          Ubiquex
        </Link>

        {/* Center menu — hidden below the 860px `menu` breakpoint. */}
        <nav className="hidden items-center gap-[22px] menu:flex">
          {links.map((link) => (
            <NavItem
              key={link.label}
              link={link}
              className="text-[13.5px] text-muted transition-colors hover:text-primary"
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/ubiquex"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-[10px] py-[7px] text-[13.5px] font-medium text-ink transition-colors hover:bg-brand-bright menu:px-[14px]"
          >
            <GitHubMark />
            {/* Label drops below `menu`, leaving an icon-only button. */}
            <span className="hidden menu:inline">GitHub</span>
          </a>

          {/* Placeholder: dark theme is the only theme for now. */}
          <button
            type="button"
            className={iconButton}
            aria-label="Toggle theme"
          >
            <SunIcon />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`${iconButton} menu:hidden`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {/*
       * Always rendered so the links stay in the DOM (and in the static export)
       * at every viewport; `hidden` only collapses the panel visually.
       */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-line menu:hidden"
      >
        <nav className="mx-auto flex w-full max-w-6xl flex-col px-7 py-2">
          {links.map((link) => (
            <NavItem
              key={link.label}
              link={link}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-[13.5px] text-muted transition-colors hover:text-primary"
            />
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Nav;
