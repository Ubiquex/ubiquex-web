import type { MDXComponents } from "mdx/types";

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
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-line bg-panel p-4 font-mono text-sm"
      {...props}
    />
  ),
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
