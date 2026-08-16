import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  // Server component, so this is evaluated once at build time.
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line">
      <Container>
        <div className="flex flex-col gap-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Ubiquex</p>

          <nav className="flex gap-6">
            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>
            <a
              href="https://github.com/Ubiquex"
              className="hover:text-primary"
              rel="noreferrer"
            >
              GitHub
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
