import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from the Ubiquex team.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <Container>
      <section className="py-20">
        <h1 className="text-4xl font-semibold tracking-tight text-fg">Blog</h1>
        <p className="mt-3 text-fg-muted">Notes from the Ubiquex team.</p>

        {posts.length === 0 ? (
          <p className="mt-12 text-fg-muted">No posts yet.</p>
        ) : (
          <ul className="mt-12 space-y-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Card href={`/blog/${post.slug}`}>
                  <time
                    dateTime={post.date}
                    className="font-mono text-xs tracking-wide text-fg-muted uppercase"
                  >
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold text-fg">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-fg-muted">{post.description}</p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Container>
  );
}
