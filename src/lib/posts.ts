import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content: string;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs.readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => getPostBySlug(filename.replace(/\.md$/, "")))
    .filter((post): post is Post => Boolean(post))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return {
    slug,
    title: String(data.title || slug),
    excerpt: String(data.excerpt || ""),
    date: String(data.date || ""),
    category: String(data.category || "Opinion"),
    content,
  };
}
