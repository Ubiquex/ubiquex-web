import { PageShell } from "@ubx/docs-ui";
import { Surface } from "@/components/ui/Surface";
import { Container } from "@/components/ui/Container";
import { PlanWindow } from "@/components/home/PlanWindow";
import { StatsBand } from "@/components/home/StatsBand";
import { StepFlow, AiAndEcosystem, ClosingCta } from "@/components/home/Sections";
import { SdkTabs, HclSection, LedgerSection } from "@/components/home/CodeSections";
import { NAV, FOOTER } from "@/lib/site";

// showThemeToggle={false}: this site is dark-only and defines no light
// palette, so a toggle would switch between dark and dark. Recorded in
// full in app/globals.css's alias layer, including that a light palette
// is the real fix and that this flag should be removed rather than
// flipped when one exists.
export default function HomePage() {
  return (
    <PageShell
      nav={NAV}
      footer={FOOTER}
      showThemeToggle={false}
      githubUrl="https://github.com/Ubiquex/ubiquex"
    >
      <Container className="pt-16 pb-20">
        <h1 className="max-w-3xl text-4xl font-medium leading-tight text-primary md:text-5xl">
          <span className="text-brand-bright">AI-Native</span> Infrastructure Management
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">
          ubx turns a change into a typed, hashed proposal you read before it happens.
          What an assistant assumed is listed for you to sign. Nothing reaches your
          cloud until you accept it.
        </p>
        <div className="mt-10">
          <PlanWindow />
        </div>
      </Container>

      <Surface tone="raised"><StatsBand /></Surface>
      <Surface tone="base"><StepFlow /></Surface>
      <Surface tone="raised"><SdkTabs /></Surface>
      <Surface tone="base"><HclSection /></Surface>
      <Surface tone="raised"><LedgerSection /></Surface>
      <Surface tone="base"><AiAndEcosystem /></Surface>
      <Surface tone="raised"><ClosingCta /></Surface>
    </PageShell>
  );
}
