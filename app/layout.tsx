import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { THEME_INIT_SCRIPT } from "@ubx/docs-ui";
import "./globals.css";

// Self-hosted, not a <link> to fonts.googleapis.com. The design
// reference links them from Google because it has to work as a single
// file opened off disk. next/font downloads and serves them from our own
// origin, which is identical rendering with no third-party request on
// every page load, and matches how the docs sites handle fonts.
//
// The weights are exactly the ones the reference asks for: Poppins
// 400/500/600, JetBrains Mono 400. Requesting more would ship bytes
// nothing uses.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
    <html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">{children}</body>
    </html>
  );
}
