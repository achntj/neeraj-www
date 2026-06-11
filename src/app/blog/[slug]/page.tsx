import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const readingTime = Math.max(1, Math.ceil(post.content.trim().split(/\s+/).length / 220));
  const formattedDate = new Date(`${post.date}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main><Header />
      <article className="article-shell section-shell">
        <Link className="article-back" href="/blog">← ALL OPINIONS</Link>
        <header><p className="eyebrow red">{post.category}</p><h1>{post.title}</h1><p className="article-standfirst">{post.excerpt}</p><div className="article-byline"><span>WORDS BY <b>NEERAJ JHA</b></span><span>{formattedDate}</span><span>{readingTime} MIN READ</span></div></header>
        <div className="article-rule"><span>OPINION</span></div>
        <div className="markdown"><ReactMarkdown>{post.content}</ReactMarkdown></div>
        <footer className="article-end"><span>END</span><Link href="/blog">CONTINUE READING →</Link></footer>
      </article>
      <Footer />
    </main>
  );
}
