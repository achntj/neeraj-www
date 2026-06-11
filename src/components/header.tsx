"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["/about", "About"],
  ["/blog", "Opinions"],
  ["/gallery", "Gallery"],
];

export function Header({ dark = false }: { dark?: boolean }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className={`site-header ${dark ? "on-dark" : ""}`}>
      <Link className="brand" href="/" aria-label="Neeraj Jha home"><span className="brand-name"><span>NEERAJ</span><span>JHA</span></span><span className="brand-line">SPORT · MEDIA · IMAGES · IDEAS</span></Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? "CLOSE" : "MENU"}</button>
      <nav className={open ? "open" : ""}>
        {links.map(([href, label]) => <Link key={href} className={path === href ? "active" : ""} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <a href="https://www.linkedin.com/in/neerajkjha/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </nav>
    </header>
  );
}
