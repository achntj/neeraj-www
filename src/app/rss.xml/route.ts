import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET(request: Request) {
  const siteUrl = new URL(request.url).origin;
  const posts = getAllPosts();
  const lastBuildDate = posts[0]?.date
    ? new Date(`${posts[0].date}T00:00:00Z`).toUTCString()
    : new Date().toUTCString();

  const items = posts.map((post) => {
    const postUrl = `${siteUrl}/blog/${post.slug}`;

    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
  }).join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Neeraj Jha | The Occasional Dispatch</title>
    <link>${escapeXml(`${siteUrl}/blog`)}</link>
    <description>Field notes on sport, media economics, technology, brands, and the business behind the spectacle.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(`${siteUrl}/rss.xml`)}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
