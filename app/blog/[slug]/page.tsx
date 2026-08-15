import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

type Params = { slug: string };

/** Enumerates every post at build time — required by output: "export". */
export function generateStaticParams(): Params[] {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // The static prefix lets the bundler resolve every content/blog/*.mdx file at
  // build time, so the MDX is compiled into the export — nothing is read at runtime.
  const { default: PostBody } = await import(
    `../../../content/blog/${slug}.mdx`
  );

  return (
    <Container width="prose">
      <article className="py-20">
        <header className="mb-10">
          <time
            dateTime={post.date}
            className="font-mono text-xs tracking-wide text-fg-muted uppercase"
          >
            {formatDate(post.date)}
          </time>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-fg-muted">{post.description}</p>
        </header>

        <PostBody />

        <footer className="mt-16 border-t border-edge pt-8">
          <Link
            href="/blog"
            className="text-sm text-accent-bright hover:text-brand-bright"
          >
            &larr; All posts
          </Link>
        </footer>
      </article>
    </Container>
  );
}
