import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@ubx/docs-ui";

/**
 * Flattens an MDX child tree to its text.
 *
 * A fence's content is not always a single string: MDX splits it around
 * anything it parses inside, so reading `children` directly loses whole
 * lines from longer blocks.
 */
function textOf(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

/**
 * Element styling for MDX content.
 *
 * Tailwind's preflight resets headings, lists and links to unstyled, so blog
 * body copy is styled here rather than by pulling in a typography plugin.
 * Every color is a design token from app/globals.css.
 */
const components: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-12 mb-4 text-3xl font-semibold tracking-tight text-primary"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-10 mb-3 text-2xl font-semibold tracking-tight text-primary"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-2 text-xl font-semibold text-primary" {...props} />
  ),
  p: (props) => <p className="my-4 leading-7 text-primary" {...props} />,
  a: (props) => (
    <a
      className="text-accent-bright underline underline-offset-4 hover:text-brand-bright"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-primary" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-primary" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-brand pl-4 text-muted italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-panel px-1.5 py-0.5 font-mono text-sm text-brand-bright"
      {...props}
    />
  ),
  // Fenced blocks go through the shared CodeBlock, which is what
  // highlights them. This mapped straight to a styled <pre>, so every
  // code block in every post rendered as one flat colour: the built
  // pages contained zero shiki spans. The home page's own panels were
  // already using CodeBlock, so the blog was the only surface on the
  // site with no highlighting at all.
  //
  // The wrapping div carries the vertical rhythm because CodeBlock sets
  // no margin of its own, by design: the home page places it inside a
  // grid where a margin would be wrong.
  pre: (props) => {
    const child = props.children as
      | React.ReactElement<{ className?: string; children?: React.ReactNode }>
      | undefined;
    const lang = (child?.props?.className ?? "").replace(/^language-/, "") || "text";
    return (
      <div className="my-6">
        <CodeBlock code={textOf(child?.props?.children)} lang={lang} />
      </div>
    );
  },
  hr: (props) => <hr className="my-10 border-line" {...props} />,
  strong: (props) => <strong className="font-semibold text-primary" {...props} />,
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-line px-3 py-2 font-semibold" {...props} />
  ),
  td: (props) => <td className="border-b border-line px-3 py-2" {...props} />,
};

export function useMDXComponents(existing: MDXComponents): MDXComponents {
  return { ...existing, ...components };
}
