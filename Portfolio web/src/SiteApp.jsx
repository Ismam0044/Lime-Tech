import React, { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AppWindow, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, BookOpen, Bot, CalendarDays, ChartColumn, ChartLine, Check, ChevronDown, ChevronRight, ClipboardList, Clock, Cloud, CreditCard, Eye, FileText, Gauge, Globe2, Handshake, Headphones, Layers3, MapPin, Menu, MessageCircle, MessageSquare, MonitorSmartphone, Network, Package, PenTool, Plug, Repeat, Search, Server, ShieldCheck, ShoppingCart, Smartphone, Sparkles, Target, TrendingUp, UserCheck, UserPlus, Users, Wallet, Workflow, X, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx';

const ThreeCore = lazy(() => import('./ThreeCore.jsx'));

gsap.registerPlugin(ScrollTrigger, SplitText);

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'LimeOS', href: '/limeos' },
  { label: 'About', href: '/about' },
];

const services = [
  { n: '01', icon: Globe2, href: '/services/websites', title: 'Websites & digital products', text: 'A clear story, carefully designed and built to move people from curious to customer.', detail: 'Brand-led websites, company portals, customer experiences and practical web applications.', tags: ['Strategy & design', 'React development', 'E-commerce', 'Integrations'] },
  { n: '02', icon: Layers3, href: '/services/erp', title: 'Business ERP', text: 'A connected view of orders, inventory, finance and operations, shaped around your workflows.', detail: 'Cloud-hosted or on-premise ERP systems that bring day-to-day operations into one place.', tags: ['Finance', 'Inventory', 'Sales & CRM', 'Reporting'] },
  { n: '03', icon: Users, href: '/services/hrm', title: 'HRM & people operations', text: 'Less admin for your people team, and a more considered experience for every employee.', detail: 'Practical HR systems for employee records, attendance, leave, payroll and approvals.', tags: ['Employee records', 'Attendance', 'Leave & payroll', 'Approvals'] },
  { n: '04', icon: Bot, href: '/services/ai-agents', title: 'AI agents & chat', text: 'AI that answers useful questions, handles repeatable tasks and knows when to hand off.', detail: 'Business-aware chatbots and agents connected to your knowledge and systems.', tags: ['Customer support', 'Internal assistants', 'Workflow automation', 'Knowledge search'] },
  { n: '05', icon: MonitorSmartphone, href: '/services/mobile', title: 'Mobile & field tools', text: 'Give the people away from their desks the same useful view as everyone else.', detail: 'Mobile apps and responsive experiences for ERP, HRM, field teams and customers.', tags: ['ERP companion apps', 'Field workflows', 'Employee self-service', 'Push updates'] },
  { n: '06', icon: AppWindow, href: '/services/saas', title: 'SaaS products', text: 'Turn a good idea into a subscription product people sign up for, pay for and keep using.', detail: 'Software-as-a-service platforms built from first version to launch, ready for real customers and room to scale.', tags: ['Product design & MVP', 'Subscriptions & billing', 'Multi-tenant accounts', 'Cloud hosting & scaling'] },
];

const CONTACT_EMAIL = 'lime.tech.contact@gmail.com';
const SUPPORT_EMAIL = 'support@limetech.site';
const socialLinks = [['Facebook', 'https://www.facebook.com/profile.php?id=61595088683841'], ['LinkedIn', 'https://www.linkedin.com/company/limetech-software/']];
const SocialLink = ({ label, href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" aria-label={'Lime Tech on ' + label + ' (opens in a new tab)'}>{children}</a>;

const tickerItems =['WEB EXPERIENCES', 'CONNECTED OPERATIONS', 'HUMAN-CENTRED HR', 'PRACTICAL AI', 'SAAS PRODUCTS', 'BETTER BUSINESS DATA'];

// FAQ answers shared by several service pages.
const costFaq = ['How much does it cost?', 'It depends on what you need. After a first conversation, we’ll give you a clear quote and explain what’s included, so there are no surprises later.'];
const limeOSFaq = ['How does this relate to LimeOS?', 'LimeOS is our connected platform that brings ERP, HRM, AI and mobile access together. If it fits the way you work, it can be a quick way to get started. If it doesn’t, we’ll tell you and suggest a better route.'];
const migrationFaq = ['Can you bring over our existing data?', 'In most cases, yes. We’ll look at where your data lives today, whether that’s spreadsheets or an older system, and agree the best way to bring it across.'];

// One entry per service page at /services/<key>; ServicePage renders the same layout for each.
const serviceDetails = {
  websites: {
    pageTitle: 'Websites & digital products',
    intro: { kicker: 'SERVICES / WEBSITES & DIGITAL PRODUCTS', title: 'Websites that', accent: 'do real work.', body: 'Your website is often the first conversation someone has with your business. We design and build sites and web apps that tell your story clearly and turn visitors into customers.', button: 'Talk about your website' },
    fit: {
      kicker: 'IS THIS FOR YOU?', title: 'First impressions', accent: 'count online too.',
      body: 'A good website isn’t just a brochure. It explains what you do in seconds, works beautifully on a phone, and makes it easy for the right people to get in touch, book or buy.',
      audience: [
        'Your current site looks dated, loads slowly or doesn’t work well on phones.',
        'You’re launching a new business, product or brand and need to look credible from day one.',
        'You want to sell online, take bookings or give customers a portal of their own.',
      ],
    },
    benefits: {
      kicker: 'WHY IT MATTERS', title: 'More than looks.', accent: 'Built to convert.',
      items: [
        { icon: Target, title: 'More enquiries', text: 'A clear story and obvious next steps turn more visitors into conversations.' },
        { icon: MonitorSmartphone, title: 'Great on every screen', text: 'Most people will find you on a phone. Your site should feel made for it.' },
        { icon: Gauge, title: 'Fast and findable', text: 'Quick pages and a clean structure help both visitors and search engines.' },
      ],
    },
    included: {
      kicker: 'WHAT WE BUILD WITH YOU',
      items: [
        { icon: PenTool, title: 'Strategy & design', text: 'We work out who the site is for and design each page around what they need to know.' },
        { icon: Globe2, title: 'React development', text: 'Fast, modern sites built with the same tools behind today’s best web apps.' },
        { icon: ShoppingCart, title: 'E-commerce', text: 'Product pages, carts and payments for selling online.' },
        { icon: Plug, title: 'Integrations', text: 'Connect forms, bookings, payments, CRMs and the other tools you already use.' },
        { icon: Search, title: 'Search-friendly foundations', text: 'Clean structure, page titles and descriptions so search engines understand your site.' },
        { icon: AppWindow, title: 'Portals & web apps', text: 'Customer or partner logins with the information and actions they need.' },
      ],
    },
    process: {
      kicker: 'HOW IT WORKS', title: 'From first sketch', accent: 'to launch day.',
      body: 'You see the design before we build it, and the site before it goes live, so there are no surprises at the end.',
      steps: [
        ['Discover', 'Agree goals, audience and the pages you need.'],
        ['Design', 'Shape the look and content, page by page.'],
        ['Build', 'Develop the site and test it on real devices.'],
        ['Launch', 'Go live, then measure and improve.'],
      ],
    },
    faqs: [
      ['Will it work on phones?', 'Yes. Every page is designed and checked for phones, tablets and desktops.'],
      ['Can you redesign our existing website?', 'Yes. We can start from what you have, keep what works and rebuild what doesn’t.'],
      costFaq,
    ],
    cta: { title: 'Ready for a better website?', body: 'Tell us about your business and what the site needs to do. We’ll suggest a sensible starting point.' },
  },
  erp: {
    pageTitle: 'Business ERP',
    intro: { kicker: 'SERVICES / BUSINESS ERP', title: 'Your whole operation,', accent: 'in one place.', body: 'ERP — enterprise resource planning — is one system for the everyday work of running a business: orders, stock, purchasing, finance and reports. We set it up around the way your team actually works.', button: 'Talk about your operations' },
    fit: {
      kicker: 'IS THIS FOR YOU?', title: 'Fewer spreadsheets.', accent: 'More clarity.',
      body: 'When orders live in one place, stock in another and finance somewhere else, people spend their day copying numbers between them. An ERP connects those pieces, so everyone works from the same up-to-date information.',
      audience: [
        'Your team runs the business on spreadsheets, paper or disconnected tools.',
        'You don’t trust your stock or sales numbers until someone double-checks them.',
        'You’re growing, and the way you work today won’t keep up for much longer.',
      ],
    },
    benefits: {
      kicker: 'WHY ERP', title: 'One source of truth.', accent: 'Fewer surprises.',
      items: [
        { icon: Zap, title: 'Less manual work', text: 'Enter information once and let it flow through to stock, invoices and reports.' },
        { icon: Eye, title: 'See the whole picture', text: 'Live numbers across sales, stock and finance, without waiting for month-end.' },
        { icon: ChartLine, title: 'Decide with confidence', text: 'Reports and forecasts help you plan purchasing, staffing and cash.' },
      ],
    },
    included: {
      kicker: 'WHAT WE SET UP WITH YOU',
      items: [
        { icon: Wallet, title: 'Finance & accounting', text: 'Invoices, payments, expenses and the numbers your accountant needs.' },
        { icon: Package, title: 'Inventory', text: 'Stock levels, movements and reorder points across locations.' },
        { icon: Users, title: 'Sales & CRM', text: 'Customers, quotes and orders in one clear pipeline.' },
        { icon: ClipboardList, title: 'Purchasing', text: 'Suppliers, purchase orders and goods received.' },
        { icon: ChartColumn, title: 'Reporting & forecasts', text: 'Dashboards and reports that show what’s happening and what’s coming.' },
        { icon: Server, title: 'Cloud or on-premise', text: 'Run it in the cloud or on your own servers, depending on your needs.' },
      ],
    },
    process: {
      kicker: 'HOW IT WORKS', title: 'From how you work', accent: 'to a system that fits.',
      body: 'We start by understanding your processes, then roll the system out in stages, so your team isn’t asked to change everything overnight.',
      steps: [
        ['Map', 'Walk through how orders, stock and money move today.'],
        ['Shape', 'Agree what the system needs to do, and in what order.'],
        ['Set up', 'Configure the system and connect it to your tools.'],
        ['Launch', 'Get your team comfortable, then keep improving.'],
      ],
    },
    faqs: [
      limeOSFaq,
      ['Can it run on our own servers?', 'Yes. You can choose a managed cloud setup or host it on infrastructure you control.'],
      migrationFaq,
      ['Will our team need training?', 'We’ll help with that. We walk your team through the system as it rolls out, so people feel confident using it from day one.'],
      costFaq,
    ],
    cta: { title: 'Ready to connect your operations?', body: 'Tell us how your business runs today. We’ll help you find the right place to start.' },
  },
  hrm: {
    pageTitle: 'HRM & people operations',
    intro: { kicker: 'SERVICES / HRM & PEOPLE OPERATIONS', title: 'Less admin.', accent: 'Happier people.', body: 'HRM — human resource management — software keeps employee records, attendance, leave, payroll and approvals in one place, so your people team can focus on people rather than paperwork.', button: 'Talk about your HR' },
    fit: {
      kicker: 'IS THIS FOR YOU?', title: 'HR that runs', accent: 'without the chasing.',
      body: 'Leave requests in email threads, attendance on paper, payroll rebuilt in a spreadsheet every month. An HR system brings all of it into one place, with clear approvals and records you can rely on.',
      audience: [
        'Your HR team spends hours each month on leave, attendance and payroll admin.',
        'Employees have to ask someone just to check their leave balance or details.',
        'You’re hiring, and today’s way of doing things won’t scale with your team.',
      ],
    },
    benefits: {
      kicker: 'WHY HRM', title: 'Less paperwork.', accent: 'Fewer mistakes.',
      items: [
        { icon: Clock, title: 'Hours back every month', text: 'Automate the routine work around leave, attendance and payroll.' },
        { icon: UserCheck, title: 'Self-service for employees', text: 'People can check their own details and request leave without chasing anyone.' },
        { icon: ShieldCheck, title: 'Records you can rely on', text: 'One accurate record for every employee, with a clear history of approvals.' },
      ],
    },
    included: {
      kicker: 'WHAT WE SET UP WITH YOU',
      items: [
        { icon: FileText, title: 'Employee records', text: 'Personal details, contracts, documents and history, all in one profile.' },
        { icon: Clock, title: 'Attendance', text: 'Track working hours, shifts and absences.' },
        { icon: CalendarDays, title: 'Leave management', text: 'Requests, balances and approvals, without the email threads.' },
        { icon: Wallet, title: 'Payroll', text: 'Calculate pay from attendance and leave, ready to review and run.' },
        { icon: Workflow, title: 'Approvals', text: 'Clear approval steps for leave, expenses and changes.' },
        { icon: Smartphone, title: 'Employee self-service', text: 'Employees view their own information and make requests from any device.' },
      ],
    },
    process: {
      kicker: 'HOW IT WORKS', title: 'From paperwork', accent: 'to smoother HR.',
      body: 'We learn your policies first, then set the system up to follow them, so HR doesn’t have to bend to fit the software.',
      steps: [
        ['Understand', 'Learn your policies, approvals and pain points.'],
        ['Configure', 'Set up leave rules, shifts, payroll and roles.'],
        ['Launch', 'Roll it out to HR first, then to every employee.'],
        ['Improve', 'Refine the setup as your team grows.'],
      ],
    },
    faqs: [
      ['Can employees use it on their phones?', 'Yes. Employee self-service works on phones as well as computers, so people can check details and make requests wherever they are.'],
      migrationFaq,
      limeOSFaq,
      costFaq,
    ],
    cta: { title: 'Ready to spend less time on HR admin?', body: 'Tell us how your team handles HR today. We’ll show you where a system can take the load.' },
  },
  'ai-agents': {
    pageTitle: 'AI agents & chat',
    intro: { kicker: 'SERVICES / AI AGENTS & CHAT', title: 'AI that', accent: 'actually helps.', body: 'AI agents are assistants that answer questions and handle routine tasks for your customers or your team. We build them around your own knowledge and systems, so their answers are useful and relevant.', button: 'Talk about AI' },
    fit: {
      kicker: 'IS THIS FOR YOU?', title: 'Useful answers.', accent: 'Less repetitive work.',
      body: 'Many teams answer the same questions every day, or copy information between systems by hand. A well-built AI assistant takes on that repeatable work, and knows when to hand over to a person.',
      audience: [
        'Your team answers the same customer questions again and again.',
        'Staff lose time hunting for information across documents and systems.',
        'You want to use AI in your business, but in a practical, low-risk way.',
      ],
    },
    benefits: {
      kicker: 'WHY AI', title: 'Faster answers.', accent: 'Lighter workloads.',
      items: [
        { icon: MessageSquare, title: 'Answers around the clock', text: 'Customers get helpful replies at any hour, not just during office time.' },
        { icon: Zap, title: 'Routine tasks handled', text: 'Let the assistant look up, draft and sort, so people can focus on harder work.' },
        { icon: BookOpen, title: 'Knowledge at hand', text: 'Staff find what they need by asking, instead of digging through files.' },
      ],
    },
    included: {
      kicker: 'WHAT WE BUILD WITH YOU',
      items: [
        { icon: Headphones, title: 'Customer support assistants', text: 'Answer common questions on your website or chat channels, and pass on what they can’t.' },
        { icon: Users, title: 'Internal assistants', text: 'Help your team find policies, product details and answers quickly.' },
        { icon: Workflow, title: 'Workflow automation', text: 'Hand repeatable steps such as sorting, summarising and drafting to AI.' },
        { icon: Search, title: 'Knowledge search', text: 'Search across your approved documents and data in plain language.' },
        { icon: Plug, title: 'System connections', text: 'Connect the assistant to the tools and data it needs to be useful.' },
        { icon: Handshake, title: 'Human handoff', text: 'Pass the conversation to a person when a question needs one.' },
      ],
    },
    process: {
      kicker: 'HOW IT WORKS', title: 'Start small.', accent: 'Prove it works.',
      body: 'We begin with one clear use case, try it on real questions and expand once it’s earning its place.',
      steps: [
        ['Pick a use case', 'Choose one task where AI can clearly help.'],
        ['Connect knowledge', 'Bring in the documents and data it should use.'],
        ['Test', 'Try it on real questions and tune the answers.'],
        ['Roll out', 'Launch, watch how it’s used and improve.'],
      ],
    },
    faqs: [
      ['Will the AI make things up?', 'No AI is perfect, so we design for that. Assistants work from your approved information, say when they don’t know, and hand off to a person when they should.'],
      ['Will it replace our team?', 'No. It takes on repetitive questions and tasks, so your people can spend more time on work that needs a human.'],
      ['Where can the assistant live?', 'On your website, inside the tools your team already uses, or in the chat channels your customers prefer.'],
      costFaq,
    ],
    cta: { title: 'Curious where AI could help?', body: 'Tell us about the questions and tasks that eat up your team’s time. We’ll suggest a sensible first use case.' },
  },
  mobile: {
    pageTitle: 'Mobile & field tools',
    intro: { kicker: 'SERVICES / MOBILE & FIELD TOOLS', title: 'Your business,', accent: 'in their pocket.', body: 'Mobile apps and tools that give people away from a desk — in the field, on the shop floor or with customers — the same useful view as everyone in the office.', button: 'Talk about mobile' },
    fit: {
      kicker: 'IS THIS FOR YOU?', title: 'Work happens', accent: 'away from desks too.',
      body: 'Sales reps, drivers, technicians and managers on the move often rely on phone calls and paper to stay in the loop. A mobile tool puts the right information and actions in their hands, connected to the systems back at base.',
      audience: [
        'Your field team phones the office to check stock, orders or schedules.',
        'Information is written down on paper and typed up again later.',
        'You want employees or customers to reach your systems from their phones.',
      ],
    },
    benefits: {
      kicker: 'WHY MOBILE', title: 'The right information.', accent: 'Right where it’s needed.',
      items: [
        { icon: Zap, title: 'Faster decisions on the spot', text: 'People can check, update and approve where they are, instead of waiting.' },
        { icon: ClipboardList, title: 'No more double entry', text: 'Capture information once, on the phone, straight into your systems.' },
        { icon: Eye, title: 'Everyone in sync', text: 'Office and field teams see the same up-to-date information.' },
      ],
    },
    included: {
      kicker: 'WHAT WE BUILD WITH YOU',
      items: [
        { icon: Layers3, title: 'ERP companion apps', text: 'Check stock, orders and customers from a phone.' },
        { icon: MapPin, title: 'Field workflows', text: 'Visits, deliveries, checklists and photos, captured where the work happens.' },
        { icon: UserCheck, title: 'Employee self-service', text: 'Attendance, leave and personal details from any phone.' },
        { icon: Bell, title: 'Push updates', text: 'Timely notifications for approvals, assignments and changes.' },
        { icon: MonitorSmartphone, title: 'Responsive web apps', text: 'Browser-based tools that work on any device, with nothing to install.' },
        { icon: Network, title: 'Connected to your systems', text: 'Linked to your ERP, HRM or other tools, so information flows both ways.' },
      ],
    },
    process: {
      kicker: 'HOW IT WORKS', title: 'Designed for thumbs,', accent: 'not desks.',
      body: 'We look at how people work on the move, then design screens that are quick to use one-handed and on the go.',
      steps: [
        ['Observe', 'See how the work happens in the field today.'],
        ['Design', 'Shape simple screens around the key tasks.'],
        ['Build & connect', 'Develop the app and link it to your systems.'],
        ['Roll out', 'Get it on people’s phones and refine from feedback.'],
      ],
    },
    faqs: [
      ['Do people need to install anything?', 'Not always. Some tools work best as an app, while others run in the phone’s browser with nothing to install. We’ll recommend what suits your team.'],
      ['Can it connect to LimeOS or our existing systems?', 'Yes. LimeOS includes a mobile companion app, and we can link mobile tools to the other systems your business relies on.'],
      ['Will it be hard for staff to learn?', 'We design around a few key tasks with simple screens, so most people can pick it up quickly.'],
      costFaq,
    ],
    cta: { title: 'Got people working on the move?', body: 'Tell us what they need to see and do away from a desk. We’ll help you shape the right tool.' },
  },
  saas: {
    pageTitle: 'SaaS products',
    intro: { kicker: 'SERVICES / SAAS PRODUCTS', title: 'Software people', accent: 'happily pay for.', body: 'SaaS — software as a service — is software your customers use online and pay for by subscription. We help you design it, build it and launch it, ready for real customers.', button: 'Talk about your product' },
    fit: {
      kicker: 'IS THIS FOR YOU?', title: 'A good idea.', accent: 'Ready to become a product.',
      body: 'Instead of selling software once, a SaaS product runs in the cloud. Customers sign up, log in and pay monthly or yearly. You keep improving one product, and every customer gets the update at the same time.',
      audience: [
        'You have an idea for software that people or businesses would pay for every month.',
        'You’ve built a tool for your own team, and other companies keep asking to use it.',
        'You run a service business and want to turn part of it into a product that scales.',
      ],
    },
    benefits: {
      kicker: 'WHY SAAS', title: 'Built once.', accent: 'Earning every month.',
      items: [
        { icon: Repeat, title: 'Recurring revenue', text: 'Subscriptions turn one-off sales into predictable monthly income you can plan around.' },
        { icon: UserPlus, title: 'Customers serve themselves', text: 'People can find you, sign up, pay and get started without waiting on your team.' },
        { icon: TrendingUp, title: 'Grow without starting over', text: 'One product can serve ten customers or ten thousand. Every improvement reaches all of them at once.' },
      ],
    },
    included: {
      kicker: 'WHAT WE BUILD WITH YOU',
      items: [
        { icon: PenTool, title: 'Product design & first version', text: 'We shape the core idea into a focused first version you can put in front of real users quickly.' },
        { icon: AppWindow, title: 'Sign-up & onboarding', text: 'Smooth account creation and a first-run experience that helps new customers find value fast.' },
        { icon: CreditCard, title: 'Subscriptions & billing', text: 'Plans, trials, payments and invoices, connected to a payment provider that suits your market.' },
        { icon: Network, title: 'Multi-tenant accounts', text: 'Each customer’s data kept separate and secure, with roles for the people on their team.' },
        { icon: ChartColumn, title: 'Admin & insights', text: 'A back office to manage customers and plans, plus the numbers that show how the product is doing.' },
        { icon: Cloud, title: 'Cloud hosting & scaling', text: 'Set up to run reliably online and grow comfortably with your customer base.' },
      ],
    },
    process: {
      kicker: 'HOW IT WORKS', title: 'From idea', accent: 'to paying customers.',
      body: 'We start small, launch early and improve with real feedback, so you aren’t paying for features nobody uses.',
      steps: [
        ['Discover', 'Agree who it’s for and what the first version must do.'],
        ['Build', 'Design and develop it, with regular check-ins.'],
        ['Launch', 'Go live with real customers and billing switched on.'],
        ['Improve', 'Use feedback and data to decide what comes next.'],
      ],
    },
    faqs: [
      ['Do I need to be technical?', 'No. We explain choices in plain language and handle the technical side. You bring what you know about your customers and your market.'],
      ['Can we start small?', 'Yes, and we recommend it. A focused first version gets you real feedback sooner and keeps early costs down.'],
      costFaq,
      ['What does it cost to run once it’s live?', 'That depends on how many customers you have and what the product does. We’ll explain the running costs, such as hosting and payment fees, before you commit.'],
    ],
    cta: { title: 'Got a product idea?', body: 'Tell us what it does and who it’s for. We’ll help you work out a sensible first version.' },
  },
};

function ServicePage({ service: { intro, fit, benefits, included, process, faqs, cta } }) {
  return <><PageIntro kicker={intro.kicker} title={intro.title} accent={intro.accent} body={intro.body}><div className="intro-actions"><a href="/contact" className="button button-lime">{intro.button} <ArrowUpRight size={16}/></a><a href="/services" className="text-link">All services <ArrowRight size={15}/></a></div></PageIntro><section className="service-fit section-pad"><div><Eyebrow dark>{fit.kicker}</Eyebrow><h2>{fit.title}<br/><span>{fit.accent}</span></h2><p>{fit.body}</p></div><ul className="fit-list">{fit.audience.map(item=><li key={item}><span className="check-mark"><Check size={13}/></span>{item}</li>)}</ul></section><section className="benefits section-pad"><Eyebrow>{benefits.kicker}</Eyebrow><h2>{benefits.title}<br/><span>{benefits.accent}</span></h2><div className="benefit-grid">{benefits.items.map(({icon:Icon,title,text},i)=><article key={title}><div className="benefit-top"><span>0{i + 1}</span><Icon size={21}/></div><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="capabilities section-pad"><Eyebrow dark>{included.kicker}</Eyebrow><div className="capability-grid">{included.items.map(({icon:Icon,title,text})=><article key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="approach section-pad"><div className="approach-aside"><Eyebrow>{process.kicker}</Eyebrow><div className="approach-index">LT<br/><span>STUDIO / 01</span></div></div><div className="approach-main"><h2>{process.title}<br/><span>{process.accent}</span></h2><div className="approach-bottom"><div className="approach-copy"><p>{process.body}</p><p>Every project is different, so we agree a realistic timeline with you before work starts.</p></div><div className="steps">{process.steps.map(([title,text],i)=><div key={title}><b>0{i + 1}</b><span>{title}<br/><small>{text}</small></span></div>)}</div></div></div></section><section className="faq section-pad"><div><Eyebrow>QUESTIONS, ANSWERED</Eyebrow><h2>Good questions<br/><span>to ask early.</span></h2></div><div className="faq-list">{faqs.map(([question,answer])=><details key={question}><summary>{question}<ChevronDown size={17}/></summary><div className="faq-answer">{answer}</div></details>)}</div></section><CTA title={cta.title} body={cta.body}/></>;
}

function Dashboard() {
  return <div className="dash-wrap" aria-label="Illustration of a LimeOS analytics dashboard"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="dash-card"><div className="dash-top"><div className="dash-brand"><span className="mini-mark">✳</span> LimeOS <span className="dash-label">OVERVIEW</span></div><span className="avatar">LT</span></div><div className="dash-title">Good morning, team <span>✦</span></div><div className="dash-sub">A live view across your business.</div><div className="metric-row"><div className="metric"><small>REVENUE · THIS MONTH</small><strong>$84,260</strong><em>↗ 12.8%</em></div><div className="metric"><small>ORDERS FULFILLED</small><strong>1,284</strong><em>↗ 8.2%</em></div></div><div className="chart-head"><b>Revenue overview</b><span>Last 7 months⌄</span></div><div className="chart"><div className="chart-grid"><i/><i/><i/><i/></div><svg viewBox="0 0 480 110" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#b5e44a" stopOpacity=".28"/><stop offset="1" stopColor="#b5e44a" stopOpacity="0"/></linearGradient></defs><path d="M0 87 C25 82 36 74 58 79 S93 60 119 68 S156 53 177 60 S212 38 239 48 S273 35 296 42 S337 22 358 33 S399 18 420 25 S455 10 480 13 V110 H0Z" fill="url(#fill)"/><path d="M0 87 C25 82 36 74 58 79 S93 60 119 68 S156 53 177 60 S212 38 239 48 S273 35 296 42 S337 22 358 33 S399 18 420 25 S455 10 480 13" fill="none" stroke="#b5e44a" strokeWidth="3"/></svg><div className="months"><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span></div></div><div className="dash-foot"><span><i className="live-dot"/> All systems in sync</span><span>Updated just now</span></div></div><div className="float-note note-ai"><span className="note-icon"><Sparkles size={15}/></span><div><small>AI INSIGHT</small><b>Stock is trending up</b></div><span className="note-up">↗</span></div><div className="float-note note-mobile"><div className="phone-icon"><MonitorSmartphone size={17}/></div><div><small>YOUR BUSINESS</small><b>In your pocket.</b></div></div><div className="spark spark-a">✳</div><div className="spark spark-b">✳</div></div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const isCurrent = (href) => path === href || (href !== '/' && path.startsWith(href + '/'));
  return <header className="nav-shell"><a href="/" className="brand"><picture><source srcSet="/lime-logo.avif" type="image/avif"/><source srcSet="/lime-logo.webp" type="image/webp"/><img src="/lime-logo.png" alt="Lime Tech"/></picture><span className="brand-tag">DIGITAL, GROWN WELL.</span></a><nav className="nav-links" aria-label="Main navigation">{navItems.map(item => <a key={item.href} href={item.href} className={isCurrent(item.href) ? 'nav-current' : ''} aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</a>)}<a className="nav-cta" href="/contact">Let’s talk <ArrowUpRight size={15}/></a></nav><Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><button className="mobile-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X/> : <Menu/>}</button></DialogTrigger><DialogContent className="mobile-nav-panel"><DialogTitle className="sr-only">Lime Tech navigation</DialogTitle><DialogDescription className="sr-only">Choose a page to explore.</DialogDescription><div className="mobile-nav-top"><span>LT / EXPLORE</span><DialogClose asChild><button className="mobile-nav-close" aria-label="Close navigation"><X size={18}/></button></DialogClose></div><nav className="mobile-nav-links" aria-label="Mobile navigation">{[...navItems, { label: 'Contact', href: '/contact' }].map((item, index) => <DialogClose asChild key={item.href}><a href={item.href} className={isCurrent(item.href) ? 'mobile-nav-link nav-current' : 'mobile-nav-link'} aria-current={isCurrent(item.href) ? 'page' : undefined}><span><small>0{index + 1}</small>{item.label}</span><ArrowUpRight size={18}/></a></DialogClose>)}</nav><div className="mobile-nav-bottom"><span>BUILT WITH PURPOSE IN BANGLADESH</span><a href={'mailto:' + CONTACT_EMAIL}>LET’S TALK <ArrowUpRight size={15}/></a></div></DialogContent></Dialog></header>;
}

function Footer() {
  return <footer className="footer"><a href="/" className="footer-brand"><picture><source srcSet="/lime-logo.avif" type="image/avif"/><source srcSet="/lime-logo.webp" type="image/webp"/><img src="/lime-logo.png" alt="Lime Tech"/></picture></a><span>© {new Date().getFullYear()} LIME TECH. GROWN WITH PURPOSE.</span><div><a href="/services">SERVICES</a><a href="/limeos">LIMEOS</a><a href="/about">ABOUT</a><a href="/contact">CONTACT</a></div><div className="footer-social">{socialLinks.map(([label, href]) => <SocialLink key={label} label={label} href={href}>{label.toUpperCase()}</SocialLink>)}</div><a className="back-top" href="/" aria-label="Back to home"><ArrowUpRight size={17}/></a></footer>;
}

function Eyebrow({ children, dark = false }) { return <div className={'eyebrow' + (dark ? ' dark-eyebrow' : '')}><span className="eyebrow-dot"/>{children}</div>; }
function PageIntro({ kicker, title, accent, body, light = false, children }) { return <section className={'page-intro section-pad' + (light ? ' page-intro-light' : '')}><div className="page-intro-copy"><Eyebrow>{kicker}</Eyebrow><h1>{title}<br/><span>{accent}</span></h1><p>{body}</p>{children}</div><div className="page-intro-index"><span>LT</span><i/> DIGITAL, GROWN WELL.</div></section>; }
function CTA({ title = 'Have a good one in mind?', body = 'Tell us what you’re trying to make easier. We’ll help you shape the next step.' }) { return <section className="cta-band section-pad"><div><Eyebrow>LET’S BUILD SOMETHING USEFUL</Eyebrow><h2>{title}</h2><p>{body}</p></div><a href="/contact" className="button button-lime">Start a conversation <ArrowUpRight size={16}/></a></section>; }

function HomePage() {
  return <><section className="hero section-pad"><div className="hero-grid"/><div className="hero-copy"><Eyebrow>TECHNOLOGY FOR WHAT’S NEXT</Eyebrow><h1>Make your<br/>next move <span className="lime-word">count<span className="period">.</span></span></h1><p className="hero-intro">We build the digital foundations that help ambitious businesses move forward—from their first website to the systems that run the whole show.</p><div className="hero-actions"><a href="/contact" className="button button-lime">Tell us what you’re building <ArrowUpRight size={17}/></a><a href="/services" className="text-link">Explore our services <ArrowDownRight size={16}/></a></div><div className="hero-note"><span className="note-rule"/> BIG IDEAS. THOUGHTFUL BUILDING. REAL-WORLD RESULTS.</div></div><Dashboard/><div className="hero-index"><span>01</span><i/> DIGITAL PARTNER FOR GROWING TEAMS</div></section><section className="ticker"><div className="ticker-track">{[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((x,i)=><span key={i} aria-hidden={i >= tickerItems.length || undefined}>{x}<b>✳</b></span>)}</div></section><section className="services section-pad"><div className="section-heading"><div><Eyebrow dark>WHAT WE MAKE POSSIBLE</Eyebrow><h2>One partner.<br/><span className="muted-heading">Room to grow.</span></h2></div><p>From a first impression online to a clearer picture of the whole business, we help the pieces work together.</p></div><div className="service-grid">{services.slice(0,4).map(({n,icon:Icon,href,title,text})=><article className="service-card" key={n}><div className="service-top"><span>{n} / {String(services.length).padStart(2, '0')}</span><Icon size={22} strokeWidth={1.5}/></div><h3>{title}</h3><p>{text}</p><a href={href} aria-label={'Explore ' + title}><ArrowUpRight size={19}/></a></article>)}</div><div className="service-foot"><span>DESIGNED AROUND THE WAY YOUR BUSINESS WORKS.</span><a href="/services">See all services <ArrowRight size={15}/></a></div></section><section className="platform section-pad"><div className="platform-top"><Eyebrow>ONE CONNECTED BUSINESS HQ</Eyebrow><div className="platform-stamp"><span>YOUR BUSINESS.<br/>IN SYNC.</span><Layers3 size={28}/></div></div><div className="platform-layout"><div className="platform-copy"><div className="product-name"><span className="product-symbol">✳</span> Lime<span>OS</span></div><h2>Every moving part.<br/><span>Moving together.</span></h2><p>ERP, HRM, helpful AI, forecasting and mobile access—connected in a system that can run in your cloud or on your own servers.</p><div className="platform-points"><div><span className="check-mark"><Check size={13}/></span> One connected ERP + HRM</div><div><span className="check-mark"><Check size={13}/></span> Built-in AI chat</div><div><span className="check-mark"><Check size={13}/></span> Forecasting reports</div><div><span className="check-mark"><Check size={13}/></span> Mobile companion app</div></div><a href="/limeos" className="button button-outline">Explore LimeOS <ArrowUpRight size={16}/></a></div><SystemDiagram/></div></section><section className="home-next section-pad"><div className="home-next-copy"><Eyebrow dark>THE NEXT STEP, MADE CLEARER</Eyebrow><h2>Less guesswork.<br/><span>More next steps.</span></h2><p>We help teams make good technology decisions and build with a clear path from first idea to everyday use.</p><a href="/about" className="text-link dark-link">How we work <ArrowRight size={16}/></a></div><div className="home-next-card"><div className="next-card-icon"><MessageCircle size={22}/></div><span>NO COOKIE-CUTTER PLANS</span><h3>Start with your actual business.</h3><p>Get a partner who asks the right questions, then makes the right-sized solution with you.</p><a href="/about">Meet our approach <ArrowUpRight size={17}/></a></div></section><CTA/></>;
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

function SystemDiagram() { return <div className="platform-visual"><div className="platform-ring ring-inner"/><div className="platform-ring ring-outer"/><DeferredThreeCore/><div className="platform-center"><span className="platform-spark">✳</span><strong>One business.<br/>A clearer picture.</strong><small>CONNECTED BY LIMEOS</small></div><div className="node node-erp"><Layers3/><span>ERP</span></div><div className="node node-hr"><Users/><span>HRM</span></div><div className="node node-ai"><Bot/><span>AI + INSIGHTS</span></div><div className="node node-mobile"><MonitorSmartphone/><span>MOBILE</span></div><div className="connect-line line-1"/><div className="connect-line line-2"/><div className="connect-line line-3"/><div className="connect-line line-4"/></div>; }

function ServicesPage() {
  return <><PageIntro kicker="SERVICES / BUILT AROUND YOU" title="Technology that" accent="earns its place." body="Need a sharper website, a SaaS product, a more connected operation, or an AI assistant that handles real work? We’ll shape the right solution around your goals."><a href="/contact" className="button button-lime">Tell us what you need <ArrowUpRight size={16}/></a></PageIntro><section className="service-details section-pad"><div className="service-details-head"><Eyebrow dark>WHAT WE CAN BUILD TOGETHER</Eyebrow><p>Start with one clear need. Add capabilities as your business grows.</p></div><div className="service-detail-grid">{services.map(({n,icon:Icon,href,title,detail,tags})=><article className="service-detail" key={n}><div className="service-detail-top"><span>{n}</span><Icon size={23}/></div><h2>{title}</h2><p>{detail}</p><ul>{tags.map(tag=><li key={tag}><Check size={13}/>{tag}</li>)}</ul><div className="service-detail-links"><a href={href}>Learn more <ArrowRight size={15}/></a><a href="/contact">Discuss this service <ArrowRight size={15}/></a></div></article>)}</div></section><section className="approach section-pad"><div className="approach-aside"><Eyebrow>MADE WITH YOU</Eyebrow><div className="approach-index">LT<br/><span>STUDIO / 01</span></div></div><div className="approach-main"><h2>The right-sized<br/><span>way forward.</span></h2><div className="approach-bottom"><p>No mystery process. No technology for technology’s sake. Just a curious team, a clear plan and work made to earn its place in your business.</p><div className="steps"><div><b>01</b><span>Listen<br/><small>Start with the real problem.</small></span></div><div><b>02</b><span>Shape<br/><small>Map the right-sized solution.</small></span></div><div><b>03</b><span>Make<br/><small>Build, launch and improve.</small></span></div></div></div></div></section><CTA title="Not sure where to start?"/></>;
}

const hostingOptions = ['cloud', 'local'];

function LimeOSPage() {
  const [hosting, setHosting] = useState('cloud');
  // Arrow keys move between the hosting tabs, as in the WAI-ARIA tabs pattern.
  const onTabKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = hostingOptions[(hostingOptions.indexOf(hosting) + step + hostingOptions.length) % hostingOptions.length];
    setHosting(next);
    document.getElementById('hosting-tab-' + next)?.focus();
  };
  const tabProps = (option) => ({ id: 'hosting-tab-' + option, role: 'tab', 'aria-selected': hosting === option, 'aria-controls': 'hosting-panel', tabIndex: hosting === option ? 0 : -1, className: hosting === option ? 'selected' : '', onClick: () => setHosting(option), onKeyDown: onTabKeyDown });
  return<><PageIntro kicker="LIMEOS / BUSINESS SYSTEMS" title="Every moving part." accent="Moving together." body="ERP, HRM, AI, forecasts and mobile access in one connected platform, built around the way your business actually runs."><a href="/contact" className="button button-lime">Book a LimeOS conversation <ArrowUpRight size={16}/></a></PageIntro><section className="limeos-intro section-pad"><div className="limeos-copy"><Eyebrow dark>YOUR BUSINESS, IN ONE CLEARER VIEW</Eyebrow><h2>Less switching.<br/><span>More seeing the whole picture.</span></h2><p>LimeOS connects the day-to-day work across your business. Teams share one source of information, and leaders get a better view of what’s happening and what may be coming next.</p><div className="limeos-points"><div><Check size={15}/> ERP + HRM in one core</div><div><Check size={15}/> AI chat built into workflows</div><div><Check size={15}/> Forecasting and reports</div><div><Check size={15}/> Mobile app for your ERP</div></div></div><Dashboard/></section><section className="hosting section-pad"><div className="hosting-heading"><Eyebrow>CHOOSE HOW YOU RUN IT</Eyebrow><h2>Your systems.<br/><span>Your terms.</span></h2><div className="hosting-tabs" role="tablist" aria-label="Hosting options"><button {...tabProps('cloud')}><Cloud size={16}/> Cloud</button><button {...tabProps('local')}><Server size={16}/> On-premise</button></div></div><div className="hosting-detail" id="hosting-panel" role="tabpanel" aria-labelledby={'hosting-tab-' + hosting}><div className="hosting-icon">{hosting === 'cloud' ? <Cloud size={27}/> : <Server size={27}/>}</div><div><span>{hosting === 'cloud' ? 'CLOUD-HOSTED' : 'SELF-HOSTED'}</span><h3>{hosting === 'cloud' ? 'Access your operation from anywhere.' : 'Keep your infrastructure in your hands.'}</h3><p>{hosting === 'cloud' ? 'A managed cloud setup for teams that want simple access, dependable updates and less server maintenance.' : 'Deploy LimeOS on infrastructure you control when your policies or operations call for local hosting.'}</p></div><a href="/contact" aria-label="Ask about LimeOS hosting"><ArrowUpRight size={18}/></a></div></section><section className="capabilities section-pad"><Eyebrow dark>ONE PLATFORM. USEFUL CAPABILITIES.</Eyebrow><div className="capability-grid"><article><Layers3/><h3>Operations connected</h3><p>Keep orders, inventory, purchasing and finance aligned with the way work flows.</p></article><article><Users/><h3>People supported</h3><p>Bring employee information, leave, attendance and approvals into one HR workspace.</p></article><article><Bot/><h3>Answers, faster</h3><p>Let the built-in assistant search approved business knowledge and help with common tasks.</p></article><article><Zap/><h3>Look ahead</h3><p>Turn business activity into forecasting reports that help teams prepare their next move.</p></article><article><MonitorSmartphone/><h3>Work on the move</h3><p>Give teams mobile access to essential ERP information while they’re away from a desk.</p></article><article><Network/><h3>Fit your process</h3><p>Shape permissions, integrations and workflows around what your business needs.</p></article></div></section><CTA title="Want a closer look at LimeOS?" body="Tell us about your team and we’ll walk through how the pieces can fit together."/></>;
}

function AboutPage() {
  return <><PageIntro kicker="ABOUT LIME TECH / OUR APPROACH" title="Good technology" accent="starts with people." body="We help companies and teams turn ambitious ideas into useful digital tools. The best solution is the one that makes real work simpler."><a href="/services" className="button button-lime">What we do <ArrowUpRight size={16}/></a></PageIntro><section className="about-statement section-pad"><div className="about-mark">✳</div><div><Eyebrow dark>OUR POINT OF VIEW</Eyebrow><h2>Make it useful.<br/><span>Make it last.</span></h2><p>Every project starts with listening. We learn how people work today, where friction is building and what better could look like. Then we combine thoughtful design, reliable engineering and the right technology to make that better future tangible.</p></div></section><section className="values section-pad"><Eyebrow dark>HOW WE THINK</Eyebrow><div className="value-grid"><article><span>01</span><h3>Clarity over complexity</h3><p>Choose the simplest system that genuinely solves the problem.</p></article><article><span>02</span><h3>People are the point</h3><p>Build around the people who will use, manage and rely on the work.</p></article><article><span>03</span><h3>Room to evolve</h3><p>Make decisions today that leave sensible options open for tomorrow.</p></article></div></section><section className="approach section-pad"><div className="approach-aside"><Eyebrow>HOW WE WORK</Eyebrow><div className="approach-index">LT<br/><span>STUDIO / 01</span></div></div><div className="approach-main"><h2>Built with you.<br/><span>Ready for real life.</span></h2><div className="approach-bottom"><p>Clear communication and steady progress from first conversation to launch and beyond.</p><div className="steps"><div><b>01</b><span>Listen<br/><small>Understand the work and the people.</small></span></div><div><b>02</b><span>Shape<br/><small>Agree on the best way forward.</small></span></div><div><b>03</b><span>Make<br/><small>Build, learn and improve together.</small></span></div></div></div></div></section><CTA/></>;
}

// FormSubmit relays the enquiry to the inbox; the first submission sends a one-time activation email to CONTACT_EMAIL.
const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;
const formMessages = {
  idle: 'We’ll reply to the email address you share above.',
  sending: 'Sending your message…',
  sent: 'Thanks — your message is on its way. We’ll be in touch soon.',
};
const contactLinks = [['Websites', '/services/websites'], ['ERP', '/services/erp'], ['HRM', '/services/hrm'], ['AI agents', '/services/ai-agents'], ['Mobile', '/services/mobile'], ['SaaS', '/services/saas'], ['LimeOS', '/limeos']];
// Bots tend to submit instantly; a person needs at least a few seconds to fill in the form.
const MIN_FILL_MS = 3000;

function ContactPage() {
  const [status, setStatus] = useState('idle');
  const openedAt = useRef(Date.now());
  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('_honey') || Date.now() - openedAt.current < MIN_FILL_MS) return;
    setStatus('sending');
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: data.get('name'), email: data.get('email'), message: data.get('message'), _subject: 'New enquiry from ' + data.get('name'), _template: 'table', _captcha: 'false' }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || String(result.success) === 'false') throw new Error(result.message || 'Request failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };
  return <><section className="contact-page section-pad"><div className="contact-page-copy"><Eyebrow>CONTACT / YOUR NEXT CHAPTER</Eyebrow><h1>Let’s make<br/>something <span>useful.</span></h1><p>Share a little about what you’re trying to do. We’ll get back to you and work out a sensible next step.</p><div className="contact-email"><span>OR WRITE TO US DIRECTLY</span><a href={'mailto:' + CONTACT_EMAIL}>{CONTACT_EMAIL} <ArrowUpRight size={15}/></a></div><div className="contact-email"><span>CUSTOMER SUPPORT</span><a href={'mailto:' + SUPPORT_EMAIL}>{SUPPORT_EMAIL} <ArrowUpRight size={15}/></a></div><div className="contact-email"><span>CALL OR WHATSAPP</span><a href="tel:+8801673014744">+8801673014744 <ArrowUpRight size={15}/></a></div><div className="contact-email"><span>FOLLOW US</span><div className="contact-social">{socialLinks.map(([label, href]) => <SocialLink key={label} label={label} href={href}>{label} <ArrowUpRight size={15}/></SocialLink>)}</div></div><div className="contact-prompt"><MessageCircle size={19}/><span>Not sure which service fits?<br/><b>That’s a fine place to start.</b></span></div></div><form className="contact-form" onSubmit={submit} onInput={() => status === 'sent' && setStatus('idle')}><div className="contact-form-heading"><span>PROJECT ENQUIRY</span><i>01 / 01</i></div><label>Your name<input required name="name" autoComplete="name" maxLength={120} placeholder="What should we call you?"/></label><label>Email address<input required type="email" name="email" autoComplete="email" maxLength={160} placeholder="you@company.com"/></label><label>What are you thinking?<textarea required name="message" rows="5" maxLength={5000} placeholder="A website, a better way to work, an ambitious idea…"/></label><input className="form-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true"/><button className="button button-lime" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent' : 'Start the conversation'}{status === 'sent' ? <Check size={17}/> : <ArrowUpRight size={17}/>}</button><small className={'form-note' + (status === 'error' ? ' form-note-error' : status === 'sent' ? ' form-note-success' : '')} role="status" aria-live="polite">{status === 'error' ? <>We couldn’t send that just now. Please try again, or email us at <a href={'mailto:' + CONTACT_EMAIL}>{CONTACT_EMAIL}</a>.</> : formMessages[status]}</small></form></section><section className="contact-bottom section-pad"><span>WE CAN HELP WITH</span>{contactLinks.map(([label, href]) => <a key={href} href={href}>{label} <ChevronRight size={14}/></a>)}</section></>;
}

const SITE_URL = 'https://limetech.site';
const defaultDescription = 'Lime Tech builds ambitious websites, SaaS products, connected ERP and HRM platforms, and practical AI tools for growing businesses.';

const routes = { '/': { title: 'Home', description: defaultDescription, component: HomePage }, '/services': { title: 'Services', description: 'Websites, SaaS products, ERP, HRM, AI agents and mobile tools, shaped around your goals by Lime Tech.', component: ServicesPage }, '/limeos': { title: 'LimeOS', description: 'LimeOS brings ERP, HRM, AI, forecasts and mobile access together in one connected platform, in the cloud or on your own servers.', component: LimeOSPage }, '/about': { title: 'About', description: 'Lime Tech helps companies turn ambitious ideas into useful digital tools. Good technology starts with people.', component: AboutPage }, '/contact': { title: 'Contact', description: 'Tell Lime Tech what you’re trying to do. We’ll get back to you and work out a sensible next step.', component: ContactPage }, ...Object.fromEntries(Object.entries(serviceDetails).map(([slug, service]) => ['/services/' + slug, { title: service.pageTitle, description: service.intro.body, component: () => <ServicePage service={service}/> }])) };

// Sets a <meta> or <link> tag in <head>, creating it if needed; a null value removes it.
function setHeadTag(tag, keyAttr, key, valueAttr, value) {
  let el = document.head.querySelector(`${tag}[${keyAttr}="${key}"]`);
  if (value == null) return el?.remove();
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(keyAttr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
}

export default function SiteApp() {
  const pageRef = useRef(null);
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const route = routes[path] || { title: 'Page not found', notFound: true, description: defaultDescription, component: () => <PageIntro kicker="404 / NOT FOUND" title="This page" accent="took a detour." body="Let’s get you back to where you need to be."><a className="button button-lime" href="/">Back to home <ArrowRight size={16}/></a></PageIntro> };
  const Page = route.component;
  useEffect(() => {
    const title = route.title === 'Home' ? 'Lime Tech — Build what’s next' : route.title + ' — Lime Tech';
    const url = SITE_URL + (path === '/' ? '/' : path);
    document.title = title;
    setHeadTag('meta', 'name', 'description', 'content', route.description);
    setHeadTag('meta', 'property', 'og:title', 'content', title);
    setHeadTag('meta', 'property', 'og:description', 'content', route.description);
    setHeadTag('meta', 'property', 'og:url', 'content', route.notFound ? null : url);
    setHeadTag('link', 'rel', 'canonical', 'href', route.notFound ? null : url);
    setHeadTag('meta', 'name', 'robots', 'content', route.notFound ? 'noindex' : null);
  }, [path]);
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
            linesClass: 'split-line',
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

        gsap.utils.toArray('.service-grid, .service-detail-grid, .capability-grid, .value-grid, .steps, .benefit-grid, .fit-list').forEach((grid) => {
          gsap.from(grid.children, {
            y: 28, autoAlpha: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out',
            scrollTrigger: { trigger: grid, start: 'clamp(top 82%)', once: true }, clearProps: 'all'
          });
        });

        gsap.utils.toArray('.section-heading, .platform-layout, .hosting-detail, .about-statement > div, .approach-main, .home-next > *, .cta-band > *, .contact-bottom > *, .service-fit > div, .benefits > h2, .faq > *').forEach((item) => {
          gsap.from(item, {
            y: 30, autoAlpha: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'clamp(top 86%)', once: true }, clearProps: 'all'
          });
        });

        gsap.utils.toArray('.service-card, .service-detail, .capability-grid article, .value-grid article, .home-next-card, .benefit-grid article').forEach((card) => {
          const lift = () => gsap.to(card, { y: -5, duration: 0.22, ease: 'power2.out' });
          const settle = () => gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
          card.addEventListener('pointerenter', lift);
          card.addEventListener('pointerleave', settle);
          cleanups.push(() => {
            card.removeEventListener('pointerenter', lift);
            card.removeEventListener('pointerleave', settle);
          });
        });
        // Web fonts change the page height after the first measure; re-measure so bottom-of-page reveals can still fire.
        let active = true;
        document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
        cleanups.push(() => { active = false; });
        return () => cleanups.forEach((cleanup) => cleanup());
      }, pageRef);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, [path]);
  return <><Header/><main ref={pageRef}><Page/></main><Footer/></>;
}
