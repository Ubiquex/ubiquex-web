import { Hero } from "@/components/ui/Hero";
import { ProviderStrip } from "@/components/ui/ProviderStrip";
import { MediumsSection } from "@/components/ui/MediumsSection";
import { TimelineSection } from "@/components/ui/TimelineSection";
import { MarkdownSection } from "@/components/ui/MarkdownSection";
import { SdkSection } from "@/components/ui/SdkSection";
import { DiagramSection } from "@/components/ui/DiagramSection";

// Nav and Footer are rendered once in app/layout.tsx so every route gets them;
// the homepage supplies only its own content.
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProviderStrip />
      <MediumsSection />
      <TimelineSection />
      <MarkdownSection />
      <SdkSection />
      <DiagramSection />
    </>
  );
}
