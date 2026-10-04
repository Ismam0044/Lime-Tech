import React, { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Bot, Check, ChevronRight, Cloud, Globe2, Layers3, Menu, MessageCircle, MonitorSmartphone, Network, Server, Sparkles, Users, X, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './components/ui/dialog.jsx';

const ThreeCore = lazy(() => import('./ThreeCore.jsx'));

gsap.registerPlugin(ScrollTrigger, SplitText);

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'LimeOS', href: '/limeos' },
  { label: 'About', href: '/about' },
];

const services = [
  { n: '01', icon: Globe2, title: 'Websites & digital products', text: 'A clear story, carefully designed and built to move people from curious to customer.', detail: 'Brand-led websites, company portals, customer experiences and practical web applications.', tags: ['Strategy & design', 'React development', 'E-commerce', 'Integrations'] },
  { n: '02', icon: Layers3, title: 'Business ERP', text: 'A connected view of orders, inventory, finance and operations, shaped around your workflows.', detail: 'Cloud-hosted or on-premise ERP systems that bring day-to-day operations into one place.', tags: ['Finance', 'Inventory', 'Sales & CRM', 'Reporting'] },
  { n: '03', icon: Users, title: 'HRM & people operations', text: 'Less admin for your people team, and a more considered experience for every employee.', detail: 'Practical HR systems for employee records, attendance, leave, payroll and approvals.', tags: ['Employee records', 'Attendance', 'Leave & payroll', 'Approvals'] },
  { n: '04', icon: Bot, title: 'AI agents & chat', text: 'AI that answers useful questions, handles repeatable tasks and knows when to hand off.', detail: 'Business-aware chatbots and agents connected to your knowledge and systems.', tags: ['Customer support', 'Internal assistants', 'Workflow automation', 'Knowledge search'] },
  { n: '05', icon: MonitorSmartphone, title: 'Mobile & field tools', text: 'Give the people away from their desks the same useful view as everyone else.', detail: 'Mobile apps and responsive experiences for ERP, HRM, field teams and customers.', tags: ['ERP companion apps', 'Field workflows', 'Employee self-service', 'Push updates'] },
];

function Dashboard() {
  return <div className="dash-wrap" aria-label="Illustration of a LimeOS analytics dashboard"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="dash-card"><div className="dash-top"><div className="dash-brand"><span className="mini-mark">✳</span> LimeOS <span className="dash-label">OVERVIEW</span></div><span className="avatar">LT</span></div><div className="dash-title">Good morning, team <span>✦</span></div><div className="dash-sub">A live view across your business.</div><div className="metric-row"><div className="metric"><small>REVENUE · THIS MONTH</small><strong>$84,260</strong><em>↗ 12.8%</em></div><div className="metric"><small>ORDERS FULFILLED</small><strong>1,284</strong><em>↗ 8.2%</em></div></div><div className="chart-head"><b>Revenue overview</b><span>Last 7 months⌄</span></div><div className="chart"><div className="chart-grid"><i/><i/><i/><i/></div><svg viewBox="0 0 480 110" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#b5e44a" stopOpacity=".28"/><stop offset="1" stopColor="#b5e44a" stopOpacity="0"/></linearGradient></defs><path d="M0 87 C25 82 36 74 58 79 S93 60 119 68 S156 53 177 60 S212 38 239 48 S273 35 296 42 S337 22 358 33 S399 18 420 25 S455 10 480 13 V110 H0Z" fill="url(#fill)"/><path d="M0 87 C25 82 36 74 58 79 S93 60 119 68 S156 53 177 60 S212 38 239 48 S273 35 296 42 S337 22 358 33 S399 18 420 25 S455 10 480 13" fill="none" stroke="#b5e44a" strokeWidth="3"/></svg><div className="months"><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span></div></div><div className="dash-foot"><span><i className="live-dot"/> All systems in sync</span><span>Updated just now</span></div></div><div className="float-note note-ai"><span className="note-icon"><Sparkles size={15}/></span><div><small>AI INSIGHT</small><b>Stock is trending up</b></div><span className="note-up">↗</span></div><div className="float-note note-mobile"><div className="phone-icon"><MonitorSmartphone size={17}/></div><div><small>YOUR BUSINESS</small><b>In your pocket.</b></div></div><div className="spark spark-a">✳</div><div className="spark spark-b">✳</div></div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  return <header className="nav-shell fixed top-0 inset-x-0 z-50 bg-[#101d1b]/90 backdrop-blur-xl shadow-lg shadow-black/10"><a href="/" className="brand"><picture><source srcSet="/lime-logo.avif" type="image/avif"/><source srcSet="/lime-logo.webp" type="image/webp"/><img src="/lime-logo.png" alt="Lime Tech"/></picture><span className="brand-tag">DIGITAL, GROWN WELL.</span></a><nav className="nav-links" aria-label="Main navigation">{navItems.map(item => <a key={item.href} href={item.href} className={path === item.href ? 'nav-current' : ''} aria-current={path === item.href ? 'page' : undefined}>{item.label}</a>)}<a className="nav-cta" href="/contact">Let’s talk <ArrowUpRight size={15}/></a></nav><Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><button className="mobile-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X/> : <Menu/>}</button></DialogTrigger><DialogContent className="mobile-nav-panel"><DialogTitle className="sr-only">Lime Tech navigation</DialogTitle><DialogDescription className="sr-only">Choose a page to explore.</DialogDescription><div className="mobile-nav-top"><span>LT / EXPLORE</span><DialogClose asChild><button className="mobile-nav-close" aria-label="Close navigation"><X size={18}/></button></DialogClose></div><nav className="mobile-nav-links" aria-label="Mobile navigation">{[...navItems, { label: 'Contact', href: '/contact' }].map((item, index) => <DialogClose asChild key={item.href}><a href={item.href} className={path === item.href ? 'mobile-nav-link nav-current' : 'mobile-nav-link'} aria-current={path === item.href ? 'page' : undefined}><span><small>0{index + 1}</small>{item.label}</span><ArrowUpRight size={18}/></a></DialogClose>)}</nav><div className="mobile-nav-bottom"><span>BUILT WITH PURPOSE IN BANGLADESH</span><a href="mailto:lime.tech.contact@gmail.com">LET’S TALK <ArrowUpRight size={15}/></a></div></DialogContent></Dialog></header>;
}

function Footer() {
  return <footer className="footer"><a href="/" className="footer-brand"><picture><source srcSet="/lime-logo.avif" type="image/avif"/><source srcSet="/lime-logo.webp" type="image/webp"/><img src="/lime-logo.png" alt="Lime Tech"/></picture></a><span>© {new Date().getFullYear()} LIME TECH. GROWN WITH PURPOSE.</span><div><a href="/services">SERVICES</a><a href="/limeos">LIMEOS</a><a href="/about">ABOUT</a><a href="/contact">CONTACT</a></div><a className="back-top" href="/" aria-label="Back to home"><ArrowUpRight size={17}/></a></footer>;
}

function Eyebrow({ children, dark = false }) { return <div className={'eyebrow' + (dark ? ' dark-eyebrow' : '')}><span className="eyebrow-dot"/>{children}</div>; }
function PageIntro({ kicker, title, accent, body, light = false, children }) { return <section className={'page-intro section-pad' + (light ? ' page-intro-light' : '')}><div className="page-intro-copy"><Eyebrow>{kicker}</Eyebrow><h1>{title}<br/><span>{accent}</span></h1><p>{body}</p>{children}</div><div className="page-intro-index"><span>LT</span><i/> DIGITAL, GROWN WELL.</div></section>; }
function CTA({ title = 'Have a good one in mind?', body = 'Tell us what you’re trying to make easier. We’ll help you shape the next step.' }) { return <section className="cta-band section-pad"><div><Eyebrow>LET’S BUILD SOMETHING USEFUL</Eyebrow><h2>{title}</h2><p>{body}</p></div><a href="/contact" className="button button-lime">Start a conversation <ArrowUpRight size={16}/></a></section>; }

function HomePage() {
  return <><section className="hero section-pad"><div className="hero-grid"/><div className="hero-copy"><Eyebrow>TECHNOLOGY FOR WHAT’S NEXT</Eyebrow><h1>Make your<br/>next move <span className="lime-word">count<span className="period">.</span></span></h1><p className="hero-intro">We build the digital foundations that help ambitious businesses move forward—from their first website to the systems that run the whole show.</p><div className="hero-actions"><a href="/contact" className="button button-lime">Tell us what you’re building <ArrowUpRight size={17}/></a><a href="/services" className="text-link">Explore our services <ArrowDownRight size={16}/></a></div><div className="hero-note"><span className="note-rule"/> BIG IDEAS. THOUGHTFUL BUILDING. REAL-WORLD RESULTS.</div></div><Dashboard/><div className="hero-index"><span>01</span><i/> DIGITAL PARTNER FOR GROWING TEAMS</div></section><section className="ticker"><div className="ticker-track">{['WEB EXPERIENCES','CONNECTED OPERATIONS','HUMAN-CENTRED HR','PRACTICAL AI','BETTER BUSINESS DATA','WEB EXPERIENCES','CONNECTED OPERATIONS'].map((x,i)=><span key={i}>{x}<b>✳</b></span>)}</div></section><section className="services section-pad"><div className="section-heading"><div><Eyebrow dark>WHAT WE MAKE POSSIBLE</Eyebrow><h2>One partner.<br/><span className="muted-heading">Room to grow.</span></h2></div><p>From a first impression online to a clearer picture of the whole business, we help the pieces work together.</p></div><div className="service-grid">{services.slice(0,4).map(({n,icon:Icon,title,text})=><article className="service-card" key={n}><div className="service-top"><span>{n} / 05</span><Icon size={22} strokeWidth={1.5}/></div><h3>{title}</h3><p>{text}</p><a href="/services" aria-label={'Explore ' + title}><ArrowUpRight size={19}/></a></article>)}</div><div className="service-foot"><span>DESIGNED AROUND THE WAY YOUR BUSINESS WORKS.</span><a href="/services">See all services <ArrowRight size={15}/></a></div></section><section className="platform section-pad"><div className="platform-top"><Eyebrow>ONE CONNECTED BUSINESS HQ</Eyebrow><div className="platform-stamp"><span>YOUR BUSINESS.<br/>IN SYNC.</span><Layers3 size={28}/></div></div><div className="platform-layout"><div className="platform-copy"><div className="product-name"><span className="product-symbol">✳</span> Lime<span>OS</span></div><h2>Every moving part.<br/><span>Moving together.</span></h2><p>ERP, HRM, helpful AI, forecasting and mobile access—connected in a system that can run in your cloud or on your own servers.</p><div className="platform-points"><div><span className="check-mark"><Check size={13}/></span> One connected ERP + HRM</div><div><span className="check-mark"><Check size={13}/></span> Built-in AI chat</div><div><span className="check-mark"><Check size={13}/></span> Forecasting reports</div><div><span className="check-mark"><Check size={13}/></span> Mobile companion app</div></div><a href="/limeos" className="button button-outline">Explore LimeOS <ArrowUpRight size={16}/></a></div><SystemDiagram/></div></section><section className="home-next section-pad"><div className="home-next-copy"><Eyebrow dark>THE NEXT STEP, MADE CLEARER</Eyebrow><h2>Less guesswork.<br/><span>More next steps.</span></h2><p>We help teams make good technology decisions and build with a clear path from first idea to everyday use.</p><a href="/about" className="text-link dark-link">How we work <ArrowRight size={16}/></a></div><div className="home-next-card"><div className="next-card-icon"><MessageCircle size={22}/></div><span>NO COOKIE-CUTTER PLANS</span><h3>Start with your actual business.</h3><p>Get a partner who asks the right questions, then makes the right-sized solution with you.</p><a href="/about">Meet our approach <ArrowUpRight size={17}/></a></div></section><CTA/></>;
}

function DeferredThreeCore() {
  const hostRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '140px' });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return <div className="three-core-frame" ref={hostRef} aria-hidden="true">{visible && <Suspense fallback={<div className="three-core"/>}><ThreeCore/></Suspense>}</div>;
}

function SystemDiagram() { return <div className="platform-visual"><div className="platform-ring ring-1"/><div className="platform-ring ring-2"/><DeferredThreeCore/><div className="platform-center"><span className="platform-spark">✳</span><strong>One business.<br/>A clearer picture.</strong><small>CONNECTED BY LIMEOS</small></div><div className="node node-erp"><Layers3/><span>ERP</span></div><div className="node node-hr"><Users/><span>HRM</span></div><div className="node node-ai"><Bot/><span>AI + INSIGHTS</span></div><div className="node node-mobile"><MonitorSmartphone/><span>MOBILE</span></div><div className="connect-line line-1"/><div className="connect-line line-2"/><div className="connect-line line-3"/><div className="connect-line line-4"/></div>; }

function ServicesPage() {
  return <><PageIntro kicker="SERVICES / BUILT AROUND YOU" title="Technology that" accent="earns its place." body="Need a sharper website, a more connected operation, or an AI assistant that handles real work? We’ll shape the right solution around your goals."><a href="/contact" className="button button-lime">Tell us what you need <ArrowUpRight size={16}/></a></PageIntro><section className="service-details section-pad"><div className="service-details-head"><Eyebrow dark>WHAT WE CAN BUILD TOGETHER</Eyebrow><p>Start with one clear need. Add capabilities as your business grows.</p></div><div className="service-detail-grid">{services.map(({n,icon:Icon,title,detail,tags})=><article className="service-detail" key={n}><div className="service-detail-top"><span>{n}</span><Icon size={23}/></div><h2>{title}</h2><p>{detail}</p><ul>{tags.map(tag=><li key={tag}><Check size={13}/>{tag}</li>)}</ul><a href="/contact">Discuss this service <ArrowRight size={15}/></a></article>)}</div></section><section className="approach section-pad"><div className="approach-aside"><Eyebrow>MADE WITH YOU</Eyebrow><div className="approach-index">LT<br/><span>STUDIO / 01</span></div></div><div className="approach-main"><h2>The right-sized<br/><span>way forward.</span></h2><div className="approach-bottom"><p>No mystery process. No technology for technology’s sake. Just a curious team, a clear plan and work made to earn its place in your business.</p><div className="steps"><div><b>01</b><span>Listen<br/><small>Start with the real problem.</small></span></div><div><b>02</b><span>Shape<br/><small>Map the right-sized solution.</small></span></div><div><b>03</b><span>Make<br/><small>Build, launch and improve.</small></span></div></div></div></div></section><CTA title="Not sure where to start?"/></>;
}

function LimeOSPage() {
  const [hosting, setHosting] = useState('cloud');
  return <><PageIntro kicker="LIMEOS / BUSINESS SYSTEMS" title="Every moving part." accent="Moving together." body="ERP, HRM, AI, forecasts and mobile access in one connected platform, built around the way your business actually runs."><a href="/contact" className="button button-lime">Book a LimeOS conversation <ArrowUpRight size={16}/></a></PageIntro><section className="limeos-intro section-pad"><div className="limeos-copy"><Eyebrow dark>YOUR BUSINESS, IN ONE CLEARER VIEW</Eyebrow><h2>Less switching.<br/><span>More seeing the whole picture.</span></h2><p>LimeOS connects the day-to-day work across your business. Teams share one source of information, and leaders get a better view of what’s happening and what may be coming next.</p><div className="limeos-points"><div><Check size={15}/> ERP + HRM in one core</div><div><Check size={15}/> AI chat built into workflows</div><div><Check size={15}/> Forecasting and reports</div><div><Check size={15}/> Mobile app for your ERP</div></div></div><Dashboard/></section><section className="hosting section-pad"><div className="hosting-heading"><Eyebrow>CHOOSE HOW YOU RUN IT</Eyebrow><h2>Your systems.<br/><span>Your terms.</span></h2><div className="hosting-tabs" role="tablist" aria-label="Hosting options"><button className={hosting === 'cloud' ? 'selected' : ''} onClick={() => setHosting('cloud')} role="tab" aria-selected={hosting === 'cloud'}><Cloud size={16}/> Cloud</button><button className={hosting === 'local' ? 'selected' : ''} onClick={() => setHosting('local')} role="tab" aria-selected={hosting === 'local'}><Server size={16}/> On-premise</button></div></div><div className="hosting-detail"><div className="hosting-icon">{hosting === 'cloud' ? <Cloud size={27}/> : <Server size={27}/>}</div><div><span>{hosting === 'cloud' ? 'CLOUD-HOSTED' : 'SELF-HOSTED'}</span><h3>{hosting === 'cloud' ? 'Access your operation from anywhere.' : 'Keep your infrastructure in your hands.'}</h3><p>{hosting === 'cloud' ? 'A managed cloud setup for teams that want simple access, dependable updates and less server maintenance.' : 'Deploy LimeOS on infrastructure you control when your policies or operations call for local hosting.'}</p></div><a href="/contact" aria-label="Ask about LimeOS hosting"><ArrowUpRight size={18}/></a></div></section><section className="capabilities section-pad"><Eyebrow dark>ONE PLATFORM. USEFUL CAPABILITIES.</Eyebrow><div className="capability-grid"><article><Layers3/><h3>Operations connected</h3><p>Keep orders, inventory, purchasing and finance aligned with the way work flows.</p></article><article><Users/><h3>People supported</h3><p>Bring employee information, leave, attendance and approvals into one HR workspace.</p></article><article><Bot/><h3>Answers, faster</h3><p>Let the built-in assistant search approved business knowledge and help with common tasks.</p></article><article><Zap/><h3>Look ahead</h3><p>Turn business activity into forecasting reports that help teams prepare their next move.</p></article><article><MonitorSmartphone/><h3>Work on the move</h3><p>Give teams mobile access to essential ERP information while they’re away from a desk.</p></article><article><Network/><h3>Fit your process</h3><p>Shape permissions, integrations and workflows around what your business needs.</p></article></div></section><CTA title="Want a closer look at LimeOS?" body="Tell us about your team and we’ll walk through how the pieces can fit together."/></>;
}

function AboutPage() {
  return <><PageIntro kicker="ABOUT LIME TECH / OUR APPROACH" title="Good technology" accent="starts with people." body="We help companies and teams turn ambitious ideas into useful digital tools. The best solution is the one that makes real work simpler."><a href="/services" className="button button-lime">What we do <ArrowUpRight size={16}/></a></PageIntro><section className="about-statement section-pad"><div className="about-mark">✳</div><div><Eyebrow dark>OUR POINT OF VIEW</Eyebrow><h2>Make it useful.<br/><span>Make it last.</span></h2><p>Every project starts with listening. We learn how people work today, where friction is building and what better could look like. Then we combine thoughtful design, reliable engineering and the right technology to make that better future tangible.</p></div></section><section className="values section-pad"><Eyebrow dark>HOW WE THINK</Eyebrow><div className="value-grid"><article><span>01</span><h3>Clarity over complexity</h3><p>Choose the simplest system that genuinely solves the problem.</p></article><article><span>02</span><h3>People are the point</h3><p>Build around the people who will use, manage and rely on the work.</p></article><article><span>03</span><h3>Room to evolve</h3><p>Make decisions today that leave sensible options open for tomorrow.</p></article></div></section><section className="approach section-pad"><div className="approach-aside"><Eyebrow>HOW WE WORK</Eyebrow><div className="approach-index">LT<br/><span>STUDIO / 01</span></div></div><div className="approach-main"><h2>Built with you.<br/><span>Ready for real life.</span></h2><div className="approach-bottom"><p>Clear communication and steady progress from first conversation to launch and beyond.</p><div className="steps"><div><b>01</b><span>Listen<br/><small>Understand the work and the people.</small></span></div><div><b>02</b><span>Shape<br/><small>Agree on the best way forward.</small></span></div><div><b>03</b><span>Make<br/><small>Build, learn and improve together.</small></span></div></div></div></div></section><CTA/></>;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); const data = new FormData(e.currentTarget); const subject = encodeURIComponent('Let’s build something — ' + data.get('name')); const body = encodeURIComponent('Hi Lime Tech,\n\n' + data.get('message') + '\n\n' + data.get('name') + '\n' + data.get('email')); window.location.href = 'mailto:lime.tech.contact@gmail.com?subject=' + subject + '&body=' + body; setSent(true); };
  return <><section className="contact-page section-pad"><div className="contact-page-copy"><Eyebrow>CONTACT / YOUR NEXT CHAPTER</Eyebrow><h1>Let’s make<br/>something <span>useful.</span></h1><p>Share a little about what you’re trying to do. We’ll get back to you and work out a sensible next step.</p><div className="contact-email"><span>OR WRITE TO US DIRECTLY</span><a href="mailto:lime.tech.contact@gmail.com">lime.tech.contact@gmail.com <ArrowUpRight size={15}/></a></div><div className="contact-email"><span>CALL OR WHATSAPP</span><a href="tel:+8801673014744">+8801673014744 <ArrowUpRight size={15}/></a></div><div className="contact-prompt"><MessageCircle size={19}/><span>Not sure which service fits?<br/><b>That’s a fine place to start.</b></span></div></div><form className="contact-form rounded-2xl shadow-2xl shadow-black/20 ring-1 ring-white/5" onSubmit={submit}><div className="contact-form-heading"><span>PROJECT ENQUIRY</span><i>01 / 01</i></div><label>Your name<input required name="name" placeholder="What should we call you?"/></label><label>Email address<input required type="email" name="email" placeholder="you@company.com"/></label><label>What are you thinking?<textarea required name="message" rows="5" placeholder="A website, a better way to work, an ambitious idea…"/></label><button className="button button-lime rounded-lg shadow-md shadow-lime-300/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-lime-300/20" type="submit">{sent ? 'Email draft opened' : 'Start the conversation'}{sent ? <Check size={17}/> : <ArrowUpRight size={17}/>}</button><small className="form-note">Your email app will open with a draft. Review it, then press send.</small></form></section><section className="contact-bottom section-pad"><span>WE CAN HELP WITH</span><a href="/services">Websites <ChevronRight size={14}/></a><a href="/services">ERP + HRM <ChevronRight size={14}/></a><a href="/limeos">LimeOS <ChevronRight size={14}/></a><a href="/services">AI + mobile <ChevronRight size={14}/></a></section></>;
}

const routes = { '/': { title: 'Home', component: HomePage }, '/services': { title: 'Services', component: ServicesPage }, '/limeos': { title: 'LimeOS', component: LimeOSPage }, '/about': { title: 'About', component: AboutPage }, '/contact': { title: 'Contact', component: ContactPage } };

export default function SiteApp() {
  const pageRef = useRef(null);
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const route = routes[path] || { title: 'Page not found', component: () => <PageIntro kicker="404 / NOT FOUND" title="This page" accent="took a detour." body="Let’s get you back to where you need to be."><a className="button button-lime" href="/">Back to home <ArrowRight size={16}/></a></PageIntro> };
  const Page = route.component;
  useEffect(() => { document.title = route.title === 'Home' ? 'Lime Tech — Build what’s next' : route.title + ' — Lime Tech'; }, [route.title]);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const scope = pageRef.current;
      const ctx = gsap.context(() => {
        const cleanups = [];
        gsap.from('.nav-shell', { y: -14, autoAlpha: 0, duration: 0.65, ease: 'power3.out' });
        if (document.querySelector('.hero')) {
          const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
          intro
            .from('.hero-copy .eyebrow', { y: 18, autoAlpha: 0, duration: 0.6 })
            .from('.hero-intro', { y: 22, autoAlpha: 0, duration: 0.65 }, '-=0.4')
            .from('.hero-actions > *', { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, '-=0.32')
            .from('.dash-card', { y: 38, rotate: -2.5, scale: 0.97, autoAlpha: 0, duration: 0.9 }, '-=0.85')
            .from('.float-note', { y: 16, scale: 0.92, autoAlpha: 0, duration: 0.55, stagger: 0.12 }, '-=0.48');
          gsap.to('.float-note', { y: -7, duration: 2.6, stagger: 0.25, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 });
        }

        const headline = scope.querySelector('.hero h1, .page-intro h1, .contact-page h1');
        if (headline) {
          SplitText.create(headline, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (split) => gsap.from(split.lines, {
              yPercent: 112, autoAlpha: 0, duration: 0.86, stagger: 0.12, delay: 0.16, ease: 'power3.out'
            }),
          });
        }

        if (!document.querySelector('.hero')) {
          gsap.from('.page-intro-copy > :not(h1), .contact-page-copy > :not(h1)', {
            y: 24, autoAlpha: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out', clearProps: 'all'
          });
          gsap.from('.page-intro-index, .contact-form', {
            y: 28, autoAlpha: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', clearProps: 'all'
          });
        }

        gsap.utils.toArray('.service-grid, .service-detail-grid, .capability-grid, .value-grid, .steps').forEach((grid) => {
          gsap.from(grid.children, {
            y: 28, autoAlpha: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out',
            scrollTrigger: { trigger: grid, start: 'top 82%', once: true }, clearProps: 'all'
          });
        });

        gsap.utils.toArray('.section-heading, .platform-layout, .hosting-detail, .about-statement > div, .approach-main, .home-next > *, .cta-band > *, .contact-bottom > *').forEach((item) => {
          gsap.from(item, {
            y: 30, autoAlpha: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 86%', once: true }, clearProps: 'all'
          });
        });

        gsap.utils.toArray('.service-card, .service-detail, .capability-grid article, .value-grid article, .home-next-card').forEach((card) => {
          const lift = () => gsap.to(card, { y: -5, duration: 0.22, ease: 'power2.out' });
          const settle = () => gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
          card.addEventListener('pointerenter', lift);
          card.addEventListener('pointerleave', settle);
          cleanups.push(() => {
            card.removeEventListener('pointerenter', lift);
            card.removeEventListener('pointerleave', settle);
          });
        });
        return () => cleanups.forEach((cleanup) => cleanup());
      }, pageRef);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, [path]);
  return <><Header/><main ref={pageRef}><Page/></main><Footer/></>;
}
