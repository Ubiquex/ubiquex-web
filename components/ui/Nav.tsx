import Link from "next/link";
import { Container } from "./Container";

const links = [{ href: "/blog", label: "Blog" }];

export function Nav() {
  return (
    <header className="border-b border-edge">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-brand hover:text-brand-bright"
          >
            Ubiquex
          </Link>

          <ul className="flex items-center gap-6 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-fg-muted hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Nav;
