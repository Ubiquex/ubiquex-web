// Tests for the CloudFront viewer-request function.
//
// This is the DIRECTORY-INDEX variant. This site is trailingSlash: true,
// so the export writes out/blog/x/index.html where the two docs sites
// write out/blog/x.html. Their function and this one are deliberately
// different, and copying either into the other repo would 404 nearly
// everything, so both are tested against their own site's real export.
//
// The legacy cases are the URLs the retired Astro site published in its
// sitemap. There were 12 of them; "/" and "/blog/" still exist here, so
// 10 need redirecting. Nine go to the index. One goes to a successor:
// that post was rewritten for v2 under a new slug rather than dropped.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const here = dirname(fileURLToPath(import.meta.url));
const handler = new Function(`${readFileSync(join(here, "rewrite.js"), "utf8")}; return handler;`)();
const call = (uri) => handler({ request: { uri, headers: {} } });
const rewrite = (uri) => call(uri).uri;
const redirect = (uri) => {
  const r = call(uri);
  assert.equal(r.statusCode, 301, `${uri} should redirect`);
  return r.headers.location.value;
};

// Real routes from this site's own export.
for (const [uri, expected] of [
  ["/", "/index.html"],
  ["/blog/", "/blog/index.html"],
  ["/blog/cross-stack-references/", "/blog/cross-stack-references/index.html"],
  ["/404/", "/404/index.html"],
]) {
  test(`${uri} -> ${expected}`, () => assert.equal(rewrite(uri), expected));
}

// Real files pass through untouched.
for (const uri of [
  "/_next/static/chunks/abc.js",
  "/_next/static/media/x.css",
  "/blog/index.txt",
  "/favicon.ico",
]) {
  test(`${uri} passes through`, () => assert.equal(rewrite(uri), uri));
}

test("extensionless without a slash redirects to the canonical slash form", () => {
  assert.equal(redirect("/blog/cross-stack-references"), "/blog/cross-stack-references/");
  assert.equal(redirect("/blog"), "/blog/");
});

test("the rewritten post keeps its old URL working, pointing at the successor", () => {
  assert.equal(
    redirect("/blog/automatic-dependency-resolution/"),
    "/blog/cross-stack-references/",
  );
});

test("the cut post and every category and tag URL go to the blog index", () => {
  for (const uri of [
    "/blog/ubx-public-preview/",
    "/blog/category/Announcement/",
    "/blog/category/Engineering/",
    "/blog/tags/announcement/",
    "/blog/tags/dependency-resolution/",
    "/blog/tags/multi-stack/",
    "/blog/tags/platform-engineering/",
    "/blog/tags/public-preview/",
    "/blog/tags/ubx/",
  ]) {
    assert.equal(redirect(uri), "/blog/", uri);
  }
});

test("category URLs match regardless of the capitalisation they were published with", () => {
  assert.equal(redirect("/blog/category/Announcement/"), "/blog/");
  assert.equal(redirect("/blog/category/announcement/"), "/blog/");
});

test("a legacy URL arriving without its trailing slash still redirects", () => {
  assert.equal(redirect("/blog/tags/ubx"), "/blog/");
});

test("all ten legacy URLs are covered, so none 404s", () => {
  const legacy = [
    "/blog/ubx-public-preview/",
    "/blog/automatic-dependency-resolution/",
    "/blog/category/Announcement/",
    "/blog/category/Engineering/",
    "/blog/tags/announcement/",
    "/blog/tags/dependency-resolution/",
    "/blog/tags/multi-stack/",
    "/blog/tags/platform-engineering/",
    "/blog/tags/public-preview/",
    "/blog/tags/ubx/",
  ];
  assert.equal(legacy.length, 10);
  for (const uri of legacy) assert.equal(call(uri).statusCode, 301, uri);
});

test("no rewrite ever produces index.html/index.html", () => {
  for (const uri of ["/index.html", "/blog/index.html"]) {
    assert.equal(rewrite(uri), uri);
  }
});
