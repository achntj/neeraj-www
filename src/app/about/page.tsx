import Image from "next/image";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const skills = ["Media Rights Negotiation", "Content Acquisition", "OTT Strategy", "Sports Broadcasting", "P&L Management", "Business Development", "Distribution Strategy", "Stakeholder Management"];
const properties = ["MotoGP", "AEW", "TNA", "PGA Tour", "FIA WEC", "IndyCar", "Cycling Grand Tours"];

export default function AboutPage() {
  return (
    <main><Header />
      <section className="page-hero section-shell"><p className="eyebrow red">ABOUT / NEERAJ JHA</p><h1>A career built across the full value chain of sport.</h1></section>
      <section className="about-grid section-shell">
        <div className="about-image about-image-natural"><Image src="/images/gallery/personal/15167540_10154747268564878_1363210169171072417_o.jpg" alt="Neeraj Jha" width={2048} height={1383} sizes="(max-width: 800px) 100vw, 40vw" /></div>
        <div className="about-copy">
          <p className="lead">I&apos;m a senior sports media executive with over 25 years of experience spanning broadcasting, content strategy, rights acquisition, and business growth across South Asia, MENA, and the Caribbean.</p>
          <p>As Head of Sports Business – India &amp; South Asia at Warner Bros. Discovery, I lead strategic initiatives across sports content, partnerships, and revenue growth for premium sports brands including Eurosport. In March 2026, my mandate expanded to cover long-term rights strategy, broadcast operations, digital growth, and business development across the region.</p>
          <p>Over the course of my career, I&apos;ve helped build and scale major sports properties across television and digital platforms. That includes securing and extending exclusive South Asian rights for MotoGP, AEW, and TNA, and helping establish Eurosport as a leading destination for motorsports and wrestling.</p>
          <p>My work has also extended across the PGA Tour, FIA World Endurance Championship, IndyCar, and cycling&apos;s Grand Tours, leading content strategy, partnerships, and audience engagement. Collaborations with sports personalities including Shikhar Dhawan have helped create locally relevant ways for fans to connect with global properties.</p>
          <p>Before Warner Bros. Discovery, I held senior roles at Zee Entertainment Enterprises, IMG, and Ten Sports Network across production, programming, and live broadcasting, including the launch of the daily sports show <cite>Sports Night</cite>.</p>
          <p>I&apos;m also the author of the national bestseller <cite>Virat: The Making of a Champion</cite>, an alumnus of IIMC and IMT Ghaziabad, and a continuing student of the changes happening where sport, OTT, and AI-driven fan engagement meet.</p>
          <p>Outside work, I&apos;m an avid reader, photographer, and writer.</p>
        </div>
      </section>
      <section className="career-band"><div className="section-shell career-grid"><div><span>25+</span><p>YEARS IN<br />SPORT & MEDIA</p></div><div><span>4</span><p>GLOBAL<br />REGIONS</p></div><div><span>TV→AI</span><p>FULL MEDIA<br />VALUE CHAIN</p></div></div></section>
      <section className="skills section-shell"><p className="section-index">CAPABILITIES</p><div>{skills.map((skill, index) => <p key={skill}><span>0{index + 1}</span>{skill}</p>)}</div></section>
      <section className="properties section-shell"><div><p className="eyebrow red">SELECTED SPORTS PORTFOLIO</p><h2>Global properties.<br />Local relevance.</h2><p>Rights, content strategy, partnerships, and audience growth across some of the world&apos;s most recognised sports properties.</p></div><div>{properties.map((property, index) => <span key={property}><b>{String(index + 1).padStart(2, "0")}</b>{property}</span>)}</div></section>
      <section className="credentials section-shell"><p className="section-index">INDUSTRY / PHOTOGRAPHY</p><div>
        <a href="https://www.worldsportsphotographyawards.com/judges" target="_blank" rel="noreferrer"><span>JURY</span><h3>World Sports Photography Awards</h3><p>Judge alongside senior leaders from sport, media, brands, and photography.</p><b>VIEW ↗</b></a>
        <a href="https://www.linkedin.com/posts/neerajkjha_roadtooldtrafford-roadtooldtrafford-manchesterunited-activity-7337033102545866752-cU5S" target="_blank" rel="noreferrer"><span>SPORT / COMMUNITY</span><h3>Road to Old Trafford</h3><p>A field note shared from the intersection of football, opportunity, and fan culture.</p><b>VIEW ↗</b></a>
        <a href="https://www.linkedin.com/posts/neerajkjha_canon-wspa26-activity-7392189493153447936-Zp_E" target="_blank" rel="noreferrer"><span>PHOTOGRAPHY</span><h3>Canon × WSPA26</h3><p>Photography, judgement, and the images that define sporting emotion.</p><b>VIEW ↗</b></a>
        <a href="https://www.linkedin.com/posts/association-for-sports-industry-professionals_sportsindustry-asip-sports-activity-7292872592384831489-qBIs" target="_blank" rel="noreferrer"><span>INDUSTRY</span><h3>Sports industry leadership</h3><p>A conversation with the Association for Sports Industry Professionals.</p><b>VIEW ↗</b></a>
      </div></section>
      <section className="experience section-shell"><p className="section-index">SELECTED EXPERIENCE</p><div><article><span>NOW / CURRENTLY</span><h3>Warner Bros. Discovery</h3><p>Head of Sports Business – India &amp; South Asia. Rights strategy, broadcast operations, digital growth, partnerships, and business development.</p></article><article><span>PREVIOUSLY</span><h3>Zee · IMG · Ten Sports</h3><p>Senior leadership across sports production, programming, live broadcasting, rights, and business growth in South Asia, MENA, and the Caribbean.</p></article><article><span>AUTHOR</span><h3>Hachette India</h3><p>National bestseller, <cite>Virat: The Making of a Champion</cite>.</p></article><article><span>EDUCATION</span><h3>IIMC · IMT Ghaziabad</h3><p>Media, communication, management, and the business foundations behind a career in sport.</p></article></div></section>
      <section className="connect-band"><div className="section-shell connect-inner"><p className="eyebrow">SPORTS MEDIA / RIGHTS / DIGITAL INNOVATION</p><h2>Let&apos;s compare notes.</h2><a href="https://www.linkedin.com/in/neerajkjha/" target="_blank" rel="noreferrer">CONNECT ON LINKEDIN <span>↗</span></a></div></section>
      <Footer />
    </main>
  );
}
