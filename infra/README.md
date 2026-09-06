# infra

Infrastructure for ubiquex.io. AWS account `839333509514`, us-east-1.
Committed before it is applied, matching both docs sites.

## Status

**Not created yet.** `deploy.yml` refuses to run while its identifiers
are placeholders.

| Resource | State |
|---|---|
| S3 bucket `ubiquex-web-site` | not created |
| Origin Access Control | not created |
| CloudFront Function `ubiquex-web-rewrite` | not created |
| CloudFront distribution | not created |
| ACM certificate for `ubiquex.io` + `www.ubiquex.io` | not requested |
| IAM deploy role `ubiquex-web-deploy` | not created |

## The apex, which is the part that differs from the docs sites

`ubiquex.io` is an apex, not a subdomain, so a CNAME cannot be used: the
apex must also carry NS and SOA, and a CNAME cannot coexist with other
records at the same name.

**name.com supports ANAME**, their ALIAS equivalent, documented as
resolving A and AAAA from the target and, critically, as able to sit
"next to other records". That is the property a CNAME lacks and the one
an apex needs. So this does not need Route53.

The apex currently holds four A records pointing at GitHub Pages
(`185.199.108-111.153`), and `www.ubiquex.io` CNAMEs to
`ubiquex.github.io`. Both change in the cutover.

**Release the Pages binding in the same pass.** The `ubiquex.io` repo's
GitHub Pages config claims this apex (`cname=ubiquex.io`). If DNS moves
while that binding stands, two systems believe they own the name.

## The rewrite function differs from the docs sites, deliberately

This site is `trailingSlash: true`, so the export writes
`out/blog/x/index.html`. Both docs sites are `trailingSlash: false` and
write `out/blog/x.html`. The two functions are opposites and neither can
be copied into the other repo.

It also carries the legacy redirects. The retired Astro site published
12 URLs in its sitemap; `/` and `/blog/` still exist, so 10 redirect.
Nine go to `/blog/`. One, `automatic-dependency-resolution`, goes to
`/blog/cross-stack-references/`, because that post was rewritten for v2
under a new slug rather than dropped.

```
node --test infra/cloudfront/rewrite.test.mjs
```

## Order

1. Create the bucket, OAC, function and distribution.
2. Apply the bucket policy conditioned on the distribution ARN.
3. Create the IAM role and its scoped policy.
4. Request the certificate for `ubiquex.io` and `www.ubiquex.io`, add the
   validation CNAMEs at name.com, wait for ISSUED, attach both aliases.
5. Fill the identifiers in `deploy.yml`, deploy, and verify on the
   CloudFront domain while the Astro site still serves the apex.
6. Only then: release the Pages binding on the `ubiquex.io` repo and
   move DNS in the same pass.
7. Archive the `ubiquex.io` repo. Archive, not delete: the Astro source
   and its history stay recoverable, and archiving also disables its
   Pages deployment.
8. Repoint both docs sites' headers from the GitHub project page URL to
   `https://ubiquex.io`.
