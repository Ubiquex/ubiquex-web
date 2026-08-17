import { Hero } from "@/components/ui/Hero";
import { MediumsSection } from "@/components/ui/MediumsSection";
import { TimelineSection } from "@/components/ui/TimelineSection";
import { MarkdownSection } from "@/components/ui/MarkdownSection";
import { SdkSection } from "@/components/ui/SdkSection";
import { DiagramSection } from "@/components/ui/DiagramSection";
import { Surface } from "@/components/ui/Surface";
import type { SurfaceTone } from "@/components/ui/Surface";

// Nav and Footer are rendered once in app/layout.tsx so every route gets them;
// the homepage supplies only its own content.

/*
 * Surface alternation lives here, at the composition point, rather than as a
 * background class inside each section. Reordering the lists below re-tones the
 * whole page; no section knows or cares which band it sits on.
 *
 * The hero and the mediums circuit read as one opening block on the base
 * surface. Alternation starts at the timeline, which has to be raised because
 * it carries the bloom.
 *
 * Strict alternation across all six sections is not satisfiable: the hero must
 * be base, the timeline must be raised, and the section before the footer must
 * be base, which together need an odd number of sections. Holding the intro as
 * one block resolves it and keeps every other assignment exact.
 */
const INTRO = [
  { key: "hero", Section: Hero },
  { key: "mediums", Section: MediumsSection },
];

const ALTERNATING = [
  { key: "timeline", Section: TimelineSection, glow: true },
  { key: "markdown", Section: MarkdownSection },
  { key: "sdk", Section: SdkSection },
  { key: "diagram", Section: DiagramSection },
];

const toneAt = (index: number): SurfaceTone =>
  index % 2 === 0 ? "raised" : "base";

/*
 * The footer is raised, so the last section here must be base or the two would
 * meet on the same surface with only a hairline between them. This runs at
 * build time in a server component, so breaking the invariant fails the build
 * instead of shipping quietly.
 */
if (toneAt(ALTERNATING.length - 1) !== "base") {
  throw new Error(
    `Surface alternation broken: ALTERNATING has ${ALTERNATING.length} entries, ` +
      "which ends on surface-1. The section before the footer must be surface-0. " +
      "Add or remove a section to restore the alternation.",
  );
}

export default function HomePage() {
  return (
    <>
      {INTRO.map(({ key, Section }, index) => (
        <Surface key={key} tone="base" seam={index > 0}>
          <Section />
        </Surface>
      ))}

      {ALTERNATING.map(({ key, Section, glow }, index) => (
        <Surface key={key} tone={toneAt(index)} glow={glow}>
          <Section />
        </Surface>
      ))}
    </>
  );
}
