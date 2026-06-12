import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const apiKey = process.env.BUTTONDOWN_API_KEY;
const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
const postFiles = process.argv.slice(2);

if (!apiKey) throw new Error("BUTTONDOWN_API_KEY is required.");
if (!siteUrl) throw new Error("SITE_URL is required, for example https://example.com.");
if (postFiles.length === 0) {
  console.log("No new blog posts to send.");
  process.exit(0);
}

async function waitForPublication(url) {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      if (response.ok) return;
    } catch {
      // The deployment may still be starting.
    }

    console.log(`Waiting for ${url} to be deployed (${attempt}/30)...`);
    await new Promise((resolve) => setTimeout(resolve, 10_000));
  }

  throw new Error(`${url} was not available after five minutes; no email was sent.`);
}

for (const filename of postFiles) {
  const source = fs.readFileSync(filename, "utf8");
  const { data, content } = matter(source);
  const slug = path.basename(filename, path.extname(filename));
  const title = String(data.title || slug);
  const excerpt = String(data.excerpt || "");
  const canonicalUrl = `${siteUrl}/blog/${slug}`;
  const body = `<!-- buttondown-editor-mode: plaintext -->\n${content.trim()}\n\n---\n\n[Read this essay on the website](${canonicalUrl})`;

  await waitForPublication(canonicalUrl);

  const response = await fetch("https://api.buttondown.com/v1/emails", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: title,
      slug,
      description: excerpt,
      canonical_url: canonicalUrl,
      body,
      status: "about_to_send",
    }),
  });

  if (response.status === 409) {
    console.log(`Skipped ${slug}: an email with this slug already exists.`);
    continue;
  }

  if (!response.ok) {
    throw new Error(`Buttondown rejected ${slug} (${response.status}): ${await response.text()}`);
  }

  console.log(`Queued ${slug} for delivery.`);
}
