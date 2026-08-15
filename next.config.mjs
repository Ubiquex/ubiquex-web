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

  // NOTE: no basePath/assetPrefix. That is correct for an apex/custom domain,
  // which is where this site is headed at cutover. If it is ever served from a
  // GitHub project page (user.github.io/ubiquex-web) instead, set
  // basePath: "/ubiquex-web" here or every asset URL will 404.

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
