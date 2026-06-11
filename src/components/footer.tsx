import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer section-shell">
      <Link className="brand" href="/" aria-label="Neeraj Jha home"><span className="brand-name"><span>NEERAJ</span><span>JHA</span></span><span className="brand-line">SPORT · MEDIA · IMAGES · IDEAS</span></Link>
      <p>SPORTS MEDIA EXECUTIVE<br />AUTHOR / PHOTOGRAPHER</p>
      <div><a href="https://www.linkedin.com/in/neerajkjha/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="https://www.instagram.com/neeraj_sports/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href="https://twitter.com/neerajkjha" target="_blank" rel="noreferrer">X / TWITTER ↗</a><a href="https://www.facebook.com/neerajkjha4" target="_blank" rel="noreferrer">FACEBOOK ↗</a></div>
      <small>© {new Date().getFullYear()} NEERAJ JHA</small>
    </footer>
  );
}
