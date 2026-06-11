import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <main><Header />
      <section className="page-hero blog-hero section-shell"><p className="eyebrow red">OPINIONS / ESSAYS</p><h1>Firm convictions,<br /><em>open conclusions.</em></h1><p>Observations on sport, media economics, technology, brands, and the business behind the spectacle.</p><span className="blog-issue">ESSAYS ON THE BUSINESS<br />AND CULTURE OF SPORT</span></section>
      <section className="topic-row section-shell"><span>THE JOURNAL</span><p>{categories.join(" · ")}</p><b>{String(posts.length).padStart(2, "0")} ESSAYS</b></section>
      <section className="post-list section-shell">
        {posts.map((post, index) => {
          const readingTime = Math.max(1, Math.ceil(post.content.trim().split(/\s+/).length / 220));
          return <Link href={`/blog/${post.slug}`} key={post.slug}><span className="post-no">{String(index + 1).padStart(2, "0")}</span><div><p className="eyebrow red">{post.category}</p><h2>{post.title}</h2><p className="post-excerpt">{post.excerpt}</p><p className="post-meta">{new Date(`${post.date}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} <i /> {readingTime} MIN READ</p></div><span className="post-arrow">READ<br />↗</span></Link>;
        })}
      </section>
      <section className="newsletter section-shell" id="newsletter"><p className="eyebrow">THE OCCASIONAL DISPATCH</p><h2>One useful idea.<br />No noise.</h2><p>Field notes on the changing sports business, delivered when there is something worth saying.</p><form><label><span>EMAIL ADDRESS</span><input type="email" placeholder="you@company.com" required /></label><button type="submit">SUBSCRIBE ↗</button></form><small>Demo form. Connect this to Buttondown, Substack, or Mailchimp before launch.</small></section>
      <Footer />
    </main>
  );
}
