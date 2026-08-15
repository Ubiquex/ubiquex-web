import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <Container>
      <section className="flex flex-col items-start py-28 sm:py-36">
        <h1 className="text-6xl font-semibold tracking-tight text-brand sm:text-7xl">
          Ubiquex
        </h1>

        {/* PLACEHOLDER: replace with the real tagline before cutover. */}
        <p className="mt-6 max-w-xl text-xl leading-relaxed text-fg-muted">
          Infrastructure change management, as a ledger you can trust.
        </p>

        <div className="mt-10">
          <Button href="/blog">Read the blog</Button>
        </div>
      </section>
    </Container>
  );
}
