function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // DIRECTORY-INDEX VARIANT. This site is trailingSlash: true, so the
    // export writes out/blog/x/index.html, not out/blog/x.html. The docs
    // sites are trailingSlash: false and use the opposite rule; copying
    // their function here would 404 everything but the root.
    //
    // Legacy redirects first, before any rewriting. These are URLs the
    // Astro site published in its sitemap and this site does not serve.
    var LEGACY = {
        '/blog/ubx-public-preview/': '/blog/',
        '/blog/category/announcement/': '/blog/',
        '/blog/category/engineering/': '/blog/',
        '/blog/tags/announcement/': '/blog/',
        '/blog/tags/dependency-resolution/': '/blog/',
        '/blog/tags/multi-stack/': '/blog/',
        '/blog/tags/platform-engineering/': '/blog/',
        '/blog/tags/public-preview/': '/blog/',
        '/blog/tags/ubx/': '/blog/',
        // The one that is not a dead end: this post was rewritten for v2
        // under a new slug, so it redirects to its successor rather than
        // to the index.
        '/blog/automatic-dependency-resolution/': '/blog/cross-stack-references/'
    };
    // Lowercased for lookup: the category URLs were published capitalised
    // ("/blog/category/Announcement/") and a reader may arrive either way.
    var legacyKey = uri.toLowerCase();
    if (legacyKey.charAt(legacyKey.length - 1) !== '/') {
        legacyKey = legacyKey + '/';
    }
    if (LEGACY[legacyKey]) {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: { location: { value: LEGACY[legacyKey] } }
        };
    }

    // A known static extension is a real file. Match a list rather than
    // asking "does the last segment contain a dot": that heuristic 404'd
    // every version landing page on the provider site, because a version
    // number has a dot in it.
    var STATIC_EXT = /\.(html|txt|json|js|mjs|css|map|svg|png|jpe?g|gif|ico|webp|avif|woff2?|ttf|eot|xml|webmanifest)$/i;
    if (STATIC_EXT.test(uri)) {
        return request;
    }

    // Trailing slash: serve that directory's index.html.
    if (uri.charAt(uri.length - 1) === '/') {
        request.uri = uri + 'index.html';
        return request;
    }

    // Extensionless and no trailing slash: redirect to the canonical
    // slash form rather than rewriting. trailingSlash: true means the
    // slash form IS the canonical URL, and serving both would duplicate
    // every page at two addresses.
    return {
        statusCode: 301,
        statusDescription: 'Moved Permanently',
        headers: { location: { value: uri + '/' } }
    };
}
