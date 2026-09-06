import type { NavLink } from "@ubx/docs-ui";

// The same six destinations, in the same order, as both docs sites.
// One product across three surfaces: a reader moving between
// ubiquex.io, docs.ubiquex.io and providers.ubiquex.io should not have
// to relearn the header.
export const NAV: NavLink[] = [
  { label: "Home", href: "/", current: true },
  { label: "Install", href: "https://docs.ubiquex.io/install" },
  { label: "Documentation", href: "https://docs.ubiquex.io" },
  { label: "Tutorials", href: "https://docs.ubiquex.io/tutorial" },
  { label: "Providers", href: "https://providers.ubiquex.io" },
  { label: "Blog", href: "/blog/" },
];

export const FOOTER = {
  tagline: "ubx is in an early stage and actively under development.",
  links: [
    // Blog is here as well as in the header. It is this site's only
    // content section, and with it missing from the footer the migrated
    // post had exactly one route in.
    { label: "Blog", href: "/blog/" },
    { label: "Documentation", href: "https://docs.ubiquex.io" },
    { label: "GitHub", href: "https://github.com/Ubiquex" },
    { label: "License", href: "https://github.com/Ubiquex/ubiquex-web/blob/main/LICENSE" },
  ],
};
