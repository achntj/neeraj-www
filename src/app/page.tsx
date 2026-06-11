import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MediaCarousel } from "@/components/media-carousel";

const mediaMentions = [
  {
    tag: "QUOTED COMMENTARY",
    source: "THE ECONOMIC TIMES",
    title: "After Virat, can Shubman Gill become the next poster boy for brands?",
    copy: "Neeraj shares his perspective on athlete branding, performance, timing, and cultural relevance.",
    href: "https://economictimes.indiatimes.com/news/sports/after-virat-kohli-shubman-gill-may-be-the-next-poster-boy-for-brands/articleshow/123428883.cms?from=mdr",
  },
  {
    tag: "INTERVIEW / QUOTED",
    source: "SPORTSKEEDA",
    title: "Relationships still matter in the business of sports rights",
    copy: "A conversation with Neeraj on trust, access, and long-term relationships in sports media rights.",
    href: "https://www.sportskeeda.com/bos/relationships-matter-for-securing-sports-media-rights-admits-neeraj-jha-eurosport",
  },
  {
    tag: "JUDGE PROFILE",
    source: "WORLD SPORTS PHOTOGRAPHY AWARDS",
    title: "Judging the images that define sporting emotion",
    copy: "Neeraj is featured among the judges for the World Sports Photography Awards.",
    href: "https://www.worldsportsphotographyawards.com/judges",
  },
];

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">SPORT. MEDIA. BUSINESS. STORIES.</p>
          <h1>
            Building the future
            <br />
            of <em>fandom.</em>
          </h1>
          <p className="hero-deck">
            Sports media executive, rights strategist, author and photographer.
            Twenty-five years turning premium sport into experiences audiences
            choose to care about.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/about">My story <span>↗</span></Link>
            <Link className="text-link" href="/gallery">Enter the photo archive <span>→</span></Link>
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src="/images/gallery/personal/IMG_5259.jpg"
            alt="Neeraj Jha"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 43vw"
          />
        </div>
      </section>

      <section className="ticker" aria-label="Areas of expertise">
        <div className="ticker-rail">
          {[0, 1].map((track) => <div className="ticker-track" aria-hidden={track === 1} key={track}>MEDIA RIGHTS <i>✦</i> CONTENT ACQUISITION <i>✦</i> OTT STRATEGY <i>✦</i> SPORTS BROADCASTING <i>✦</i> BUSINESS DEVELOPMENT <i>✦</i></div>)}
        </div>
      </section>

      <section className="section-shell split-intro">
        <p className="section-index">01 / PERSPECTIVE</p>
        <div>
          <p className="eyebrow red">IN THE MEDIA</p>
          <h2>Interviews, quotes &amp; profiles.</h2>
          <p className="section-lead">Selected coverage featuring Neeraj&apos;s perspective on sports business, media rights, athlete brands, and photography.</p>
        </div>
      </section>

      <section className="section-shell take-grid">
        {mediaMentions.map((item, index) => (
          <a className="take-card" href={item.href} key={item.title} target="_blank" rel="noreferrer">
            <span className="take-number">0{index + 1}</span>
            <p className="eyebrow">{item.tag} / {item.source}</p>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <span className="card-arrow">↗</span>
          </a>
        ))}
      </section>

      <section className="photo-tease">
        <div className="photo-tease-image"><Image src="/images/gallery/personal/_DSC5526x.jpg" alt="Photograph from Neeraj Jha's local archive" fill sizes="100vw" /></div>
        <div className="photo-tease-copy">
          <p className="eyebrow">THE OTHER LENS</p>
          <h2>Looking is part<br />of the work.</h2>
          <p>Photography trains attention: to people, place, rhythm, and the fraction of a second where a story becomes visible.</p>
          <Link className="button button-light" href="/gallery">Explore the archive <span>↗</span></Link>
        </div>
      </section>

      <section className="section-shell media-section">
        <div className="media-heading">
          <div><p className="eyebrow red">WATCH / LISTEN</p><h2>In conversation.</h2></div>
        </div>
        <MediaCarousel />
      </section>

      <section className="book-section section-shell">
        <div className="book-cover"><span>VIRAT</span><small>THE MAKING OF A CHAMPION</small><b>NEERAJ JHA</b></div>
        <div className="book-copy">
          <p className="eyebrow red">PUBLISHED AUTHOR / HACHETTE</p>
          <h2>The best sports stories live both on screen and on the page.</h2>
          <p><cite>Virat: The Making of a Champion</cite> traces the discipline, ambition, and defining moments behind one of cricket&apos;s most compelling careers.</p>
          <a className="text-link" href="https://www.google.com/search?q=Virat+The+Making+of+a+Champion+Neeraj+Jha" target="_blank" rel="noreferrer">Discover the book <span>↗</span></a>
        </div>
      </section>

      <section className="connect-band">
        <div className="section-shell connect-inner">
          <p className="eyebrow">A GOOD CONVERSATION CAN START ANYWHERE.</p>
          <h2>Working on what&apos;s next in sport?</h2>
          <a href="https://www.linkedin.com/in/neerajkjha/" target="_blank" rel="noreferrer">LET&apos;S CONNECT <span>↗</span></a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
