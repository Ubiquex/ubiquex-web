import { Hero } from "@/components/ui/Hero";
import { MediumsSection } from "@/components/ui/MediumsSection";

// Nav and Footer are rendered once in app/layout.tsx so every route gets them;
// the homepage supplies only its own content.
export default function HomePage() {
  return (
    <>
      <Hero />
      <MediumsSection />
    </>
  );
}
