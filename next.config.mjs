import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> ./out, deployable to GitHub Pages.
  output: "export",

  // next/image's optimizer needs a server; static export has none.
  images: { unoptimized: true },

  // Emit out/blog/hello-world/index.html rather than out/blog/hello-world.html,
  // so URLs resolve identically on GitHub Pages and any other static host.
  trailingSlash: true,

  // The site is served from a GitHub project page,
  // https://ubiquex.github.io/ubiquex-web, so every route and asset URL needs
  // the repo-name prefix. Without it the HTML loads but all CSS and JS 404.
  //
  // REMOVE THIS AT CUSTOM-DOMAIN CUTOVER. Once the site is served from an apex
  // domain, basePath must go or every URL gains a bogus /ubiquex-web segment.
  basePath: "/ubiquex-web",

  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    // Plugins are named as strings, not imported: Turbopack requires loader
    // options to be serializable, and a function reference is not.
    //
    // remark-frontmatter parses the leading --- block so it is not rendered as
    // page content. The frontmatter *values* are read separately, in lib/posts.ts,
    // which keeps one source of truth for post metadata.
    remarkPlugins: [["remark-frontmatter"], ["remark-gfm"]],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
