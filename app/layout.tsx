import type { Metadata } from "next";
import type { ReactNode } from "react";
import { THEME_INIT_SCRIPT } from "@ubx/docs-ui";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Ubiquex", template: "%s — Ubiquex" },
  description: "Infrastructure change management via a proposal ledger.",
};

// The local Nav and Footer are gone: both come from @ubx/docs-ui via
// PageShell now, so all three surfaces share one header and one footer
// rather than three that drift.
//
// THEME_INIT_SCRIPT is included for shape-consistency with the docs
// sites, and it is currently inert here: this site defines no light
// palette, so there is no stored choice for it to apply. See the alias
// layer in globals.css for why, and for what the real fix is.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">{children}</body>
    </html>
  );
}
