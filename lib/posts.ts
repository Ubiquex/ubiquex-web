import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function readMeta(filename: string): PostMeta {
  const slug = filename.replace(/\.mdx$/, "");
  const source = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data } = matter(source);

  // Fail the build loudly rather than shipping a post with a blank title.
  for (const field of ["title", "date", "description"] as const) {
    if (typeof data[field] !== "string" || data[field].trim() === "") {
      throw new Error(
        `content/blog/${filename}: missing or empty frontmatter field "${field}"`,
      );
    }
  }

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
  };
}

/** All posts, newest first. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readMeta)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPost(slug: string): PostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Renders an ISO date as e.g. "15 August 2026", stable across locales. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
