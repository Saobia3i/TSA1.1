import { courses } from "@/features/courses/data/courses";
import { services } from "@/features/services/data/services";
import { NEWS } from "@/features/news/data/NewsData";
import { consultants } from "@/features/consultant/Consultantdata";

type KnowledgeChunk = {
  id: string;
  title: string;
  body: string;
  keywords: string[];
};

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "tell",
  "the",
  "to",
  "what",
  "with",
  "you",
]);

// ─── STATIC KNOWLEDGE CHUNKS ─────────────────────────────

const staticChunks: KnowledgeChunk[] = [
  {
    id: "tsa-overview",
    title: "Tensor Security Academy overview",
    body:
      "Tensor Security Academy (TSA) is a cybersecurity learning platform offering hands-on cybersecurity courses, mentorship, practical labs, career guidance, and professional cybersecurity services. TSA was founded by Abrar Jahin during his university days, driven by a vision to democratize cybersecurity education globally. TSA bridges exceptional talent with world-class training, making high-quality cybersecurity education accessible regardless of geography or financial background. TSA trains students across Bangladesh, the USA, and Australia, with growing interest from the UK and Canada.",
    keywords: ["tsa", "tensor", "security", "academy", "about", "overview", "who", "what"],
  },
  {
    id: "tsa-pricing-policy",
    title: "TSA pricing policy",
    body:
      "Course and service prices shown on the website are reference or starting prices. Prices are negotiable and may vary based on student needs, scope, package, schedule, group size, and custom requirements. For final pricing, users should contact TSA or submit an enrollment/service request.",
    keywords: [
      "price",
      "pricing",
      "cost",
      "fee",
      "fees",
      "negotiable",
      "discount",
      "quote",
      "budget",
    ],
  },
  {
    id: "tsa-enrollment",
    title: "TSA enrollment process and how to enroll",
    body: [
      "How to enroll in a TSA course (step-by-step):",
      "1. Click the 'Courses' button from the top navigation bar (navbar).",
      "2. You will see a list of all available courses. Browse and find the course you want.",
      "3. Click on the course card to open the full course details page.",
      "4. On the course details page, you will find the 'Enroll Now' button. Click it.",
      "5. If you are not logged in, you will be prompted to log in or create an account first.",
      "6. Fill in the enrollment form.",
      "",
      "Why do we ask for your WhatsApp number?",
      "TSA collects your WhatsApp number during enrollment so the team can communicate with you directly and personally about the course. After successful enrollment, you will receive 1-on-1 mentorship, and WhatsApp is used for better, faster communication between you and your mentor regarding course details, schedules, progress, and any questions.",
      "",
      "After submitting the enrollment form, TSA reviews your request and contacts you via WhatsApp to discuss next steps, onboarding, schedule, and payment details. Prices are always negotiable.",
    ].join("\n"),
    keywords: ["enroll", "enrollment", "admission", "join", "course", "login", "how", "sign", "up", "register", "whatsapp", "number", "phone", "mentorship", "find", "where", "navigate", "button", "click"],
  },
  {
    id: "tsa-service-booking",
    title: "TSA service booking process and how to book a service",
    body: [
      "How to book a TSA professional service (step-by-step):",
      "1. Click the 'Services' button from the top navigation bar (navbar).",
      "2. You will see all available professional cybersecurity services listed.",
      "3. Click on any service card to view full details, including packages (Basic, Medium, Pro) with pricing and features.",
      "4. On the service details page, click the 'Book Service' or 'Get Started' button.",
      "5. Fill in the service request form with your details and requirements.",
      "",
      "After submitting, TSA contacts you via email or WhatsApp to discuss scope, pricing, timeline, and onboarding details. All prices are negotiable based on your specific needs.",
    ].join("\n"),
    keywords: ["service", "booking", "whatsapp", "email", "scope", "onboarding", "how", "book", "find", "where", "navigate", "button", "click", "package"],
  },

  // ─── WEBSITE NAVIGATION GUIDE ─────────────────────────────
  {
    id: "tsa-navigation",
    title: "How to navigate the TSA website",
    body: [
      "TSA Website Navigation Guide:",
      "",
      "The top navigation bar (navbar) has the following main sections:",
      "- Courses: Click to see all available cybersecurity courses. Click any course to view details, curriculum, and enroll.",
      "- Services: Click to see all professional cybersecurity services. Click any service to view packages and book.",
      "- Tools: Click to explore TSA Labs' open-source security tools and resources (ebooks, methodologies, practice labs).",
      "- Consultants: Click to view TSA's expert consultants and their detailed profiles.",
      "- News: Click to read the latest TSA news, events, and achievements.",
      "- About: Click to learn about TSA's journey, mission, and what makes TSA different. From there you can also navigate to 'Our Team' and 'Join Us'.",
      "",
      "Quick paths:",
      "- To enroll in a course: Navbar -> Courses -> Select a course -> Click 'Enroll Now'",
      "- To book a service: Navbar -> Services -> Select a service -> Click 'Book Service'",
      "- To see the team: Navbar -> About -> Our Team",
      "- To see tools: Navbar -> Tools",
      "- To read news: Navbar -> News",
      "- To contact or join TSA: Navbar -> About -> Join Us",
    ].join("\n"),
    keywords: [
      "navigate", "navigation", "find", "where", "how", "click", "button",
      "navbar", "menu", "page", "go", "open", "see", "path", "link",
    ],
  },

  // ─── ABOUT / JOURNEY ─────────────────────────────
  {
    id: "tsa-about-journey",
    title: "About TSA - Our Journey and Mission",
    body: [
      "Tensor Security Academy was born from lived experience, not market trends.",
      "Founder Abrar Jahin launched TSA during his university days to solve three critical problems:",
      "1. Guidance Gap: Endless YouTube tutorials and generic blog posts created noise, not clarity. Aspiring professionals were drowning in surface-level content with no roadmap, no structure, and no one to turn to.",
      "2. AI Disruption: The cybersecurity landscape was evolving at breakneck speed. Skills that landed jobs last year were becoming obsolete. Traditional education couldn't keep pace.",
      "3. Access Barrier: Elite training programs in the US, UK, and developed nations carried price tags that locked out talented individuals worldwide.",
      "What Makes TSA Different:",
      "- A Mentor-Led Journey: Seasoned cybersecurity professionals guide you in real-time.",
      "- Live, Interactive Training: Every session is live and interactive with real tools and real challenges.",
      "- Real-World Projects & Industry Insight: Actual industry scenarios, not just theory.",
      "- Radical Affordability: World-class instruction at a fraction of traditional costs.",
      "TSA decentralizes knowledge. TSA is the bridge that elevates Bangladesh and South Asia's extraordinary, untapped tech talent onto the international stage.",
      "TSA has expanded to the United States of America, with plans for UK, Australia, and Canada.",
      "This is more than a platform. TSA proves that genius knows no geography.",
    ].join("\n"),
    keywords: [
      "about", "journey", "mission", "vision", "story", "history", "why", "different",
      "mentor", "live", "affordable", "guidance", "ai", "disruption", "access",
      "problem", "solve", "founded", "university", "bangladesh", "usa", "australia",
    ],
  },

  // ─── FOUNDER ─────────────────────────────
  {
    id: "tsa-founder",
    title: "TSA Founder - Abrar Jahin",
    body: [
      "Abrar Jahin is the Founder & CEO of Tensor Security Academy (TSA).",
      "He is a Security Researcher from Narayanganj, Bangladesh.",
      "He launched TSA during his university days, driven by a clear vision to solve the broken global cybersecurity education system.",
      "Growing up, Abrar showed early curiosity in technology, robotics, machine learning, and cybersecurity.",
      "During the 2024 Bangladesh floods, he and his university team built a robot to deliver relief supplies and emergency medicine to affected areas.",
      "That same problem-solving mindset led to the founding of TSA in October 2025.",
      "TSA was featured in Bangladesh's national daily Naya Diganta for reshaping global cybersecurity education.",
      "Within four months of launch, TSA student Fabrice Njeh successfully passed the CompTIA Security+ certification.",
      "Founder's Message: AI is changing everything. It's erasing career paths overnight and leaving professionals with two choices: Adapt or Expire. We break the cycle. We give you what no tutorial can — a structured, Mentor-led journey with Live interactive training & real industry insight. This isn't just learning, it's a career transformation built for the AI era.",
      "LinkedIn: https://www.linkedin.com/in/abrarjahinsachcha/",
      "Quote from team page: TSA was born from a simple belief: exceptional talent shouldn't be limited by geography or financial barriers. Every student who breaks through represents our collective victory against an outdated system.",
    ].join("\n"),
    keywords: [
      "founder", "abrar", "jahin", "ceo", "who", "created", "started",
      "narayanganj", "bangladesh", "message", "vision", "linkedin",
    ],
  },

  // ─── TEAM MEMBERS ─────────────────────────────
  {
    id: "tsa-team-members",
    title: "TSA Team Members",
    body: [
      "Tensor Security Academy has a dedicated core team:",
      "",
      "1. Abrar Jahin - Founder & CEO, TSA | Security Researcher",
      "   Quote: TSA was born from a simple belief: exceptional talent shouldn't be limited by geography or financial barriers.",
      "   LinkedIn: https://www.linkedin.com/in/abrarjahinsachcha/",
      "",
      "2. Nuren Tasnim - Director of Business Development",
      "   Quote: Watching our students transform from uncertain beginners to confident professionals is why I do this. TSA isn't just teaching skills — we're changing lives and rewriting futures.",
      "   Email: tasnimnuren@gmail.com",
      "",
      "3. Abid Hossain Ove - Managing Director (Academics)",
      "   Quote: Education should empower, not overwhelm. At TSA, we break down complex cybersecurity concepts into actionable knowledge that students can apply from day one.",
      "   Email: abidhossainove199@gmail.com",
      "",
      "4. Saobia Islam Tinni- Lead Software Engineer",
      "   Saobia Islam Tinni is the sole architect and developer behind the entire Tensor Security Academy website and web application.",
      "   She single-handedly designed, developed, and deployed the complete TSA web application — a Progressive Web App (PWA) featuring a visually stunning, modern frontend with rich animations and responsive design, a robust backend with authentication, database management, and API architecture, an AI-powered chatbot (Tensora) which she built and trained with comprehensive knowledge of TSA's courses, services, tools, team, and more, and a full-featured admin panel for content and user management.",
      "   The TSA software is a production-grade, AI-integrated web application that showcases her exceptional full-stack engineering capabilities across frontend design, backend systems, AI/ML integration, and DevOps.",
      "   Saobia is deeply passionate about building software that creates real impact. Her dedication to quality and craft is evident in every pixel and every line of code across the TSA web application.",
      "   Quote: Technology is the great equalizer. Through TSA, we're building bridges that connect passionate learners with opportunities that were once out of reach.",
      "   Email: islamsaobia@gmail.com",
      "linkedin: https://www.linkedin.com/in/saobia-islam",
      "",
      "5. Iftekhar Salehin - Managing Director (Operations)",
      "   Quote: Behind every success story is a system that works seamlessly. I'm proud to ensure TSA operates with excellence so our students can focus on what matters — learning and growing.",
      "   Email: iftekharzihad@gmail.com",
      "",
      "6. Mubtasim Fuad - Director of TSA Labs, Red Team Analyst",
      "   Quote: Real-world cybersecurity isn't learned from books alone. TSA Labs gives students hands-on experience with the actual challenges they'll face in their careers.",
      "   Email: mubtasimfuad945@gmail.com",
      "",
      "7. Prottoy Rudro - Faculty Member, Cybersecurity Researcher",
      "   Quote: Teaching at TSA means preparing students for tomorrow's threats, not yesterday's textbook examples. Our curriculum evolves as fast as the cybersecurity landscape itself.",
      "   Email: pdrrudro@gmail.com",
    ].join("\n"),
    keywords: [
      "team", "members", "who", "people", "staff", "instructor", "faculty",
      "nuren", "tasnim", "abid", "ove", "saobia", "iftekhar", "mubtasim", "prottoy", "rudro",
      "director", "engineer", "operations", "academics", "labs",
      "developer", "built", "made", "website", "created", "platform", "chatbot", "tensora",
    ],
  },

  // ─── WEBSITE CREATOR ─────────────────────────────
  {
    id: "tsa-website-creator",
    title: "Who made the TSA website - Saobia Islam",
    body: [
      "The entire Tensor Security Academy website and platform was designed, developed, and deployed single-handedly by Saobia Islam, TSA's Lead Software Engineer.",
      "",
      "Saobia built every aspect of this production-grade platform from the ground up, including:",
      "- A Progressive Web App (PWA) with a visually rich, premium frontend featuring smooth animations, glassmorphism effects, dark-themed UI, and fully responsive layouts across all devices.",
      "- A complete backend architecture with NextAuth authentication, Prisma ORM with PostgreSQL, RESTful API routes, and server-side rendering.",
      "- The AI-powered chatbot 'Tensora' — she built the entire conversational AI system, integrated it with Groq (Llama 3.3) and Google Gemini as a fallback, implemented the RAG (Retrieval-Augmented Generation) knowledge pipeline, and trained it with comprehensive data about all TSA courses, services, tools, team members, news, and more.",
      "- A full-featured admin dashboard for managing users, enrollments, and platform content.",
      "- SEO optimization, performance tuning, and deployment infrastructure.",
      "",
      "This is not a template or a team effort — Saobia Islam is the sole engineer who conceived, architected, and brought this entire platform to life.",
     
      "Linkedin: www.linkedin.com/in/saobia-islam/"
    ].join("\n"),
    keywords: [
      "website", "made", "built", "created", "developed", "developer", "who",
      "saobia", "islam", "engineer", "platform", "pwa", "chatbot", "tensora",
      "frontend", "backend", "design", "code", "software",
    ],
  },

  // ─── TOOLS / TSA LABS ─────────────────────────────
  {
    id: "tsa-tools-labs",
    title: "TSA Labs - Open-Source Security Tools",
    body: [
      "TSA Labs develops open-source offensive security tools to empower penetration testers and security researchers worldwide.",
      "GitHub Organization: https://github.com/tools-tensorsecurityacademy",
      "",
      "Tools developed by TSA:",
      "",
      "1. AI PENTEST Toolkit - AI powered offensive security framework that automates the entire penetration testing workflow. Integrates LLMs for intelligent target scoping, automated recon, vulnerability chaining, custom payload generation, exploit generation, natural language report writing, and attack path prediction.",
      "",
      "2. DirRumble - Lightning-fast, completely raw HTTP directory and file fuzzing tool. Perfect for high-speed directory brute-forcing, API endpoint discovery, parameter fuzzing, and WAF bypass testing.",
      "",
      "3. NexusTrace - High-speed DNS resolving and subdomain enumeration tool featuring concurrent brute-forcing, passive source scraping (CRT.sh, CertSpotter, DNSdumpster), custom resolver support, wildcard detection, DNSSEC validation, AXFR attempts, IPv6 support.",
      "",
      "4. GateWaySeeker - Lightning fast admin panel and hidden directory discovery tool with multi-threaded scanning, built-in and custom wordlists, extension brute-forcing, HTTP status code filtering, response size analysis, stealth mode.",
      "",
      "5. SubScape - Advanced subdomain enumeration engine combining passive recon (certificate logs, search engines, threat intel feeds), DNS brute-forcing, permutation generation, takeover detection.",
      "",
      "6. Cicada - Fast, modular vulnerability scanner for web applications. Supports active and passive scanning, built-in payloads for SQLi, XSS, SSTI, LFI/RFI, SSRF, command injection, and open redirects. Features smart crawler with JavaScript rendering.",
      "",
      "7. XSS-Cobra - Ultra fast, payload-agnostic XSS vulnerability scanner with hybrid detection. Features automatic DOM based, reflected, and stored XSS testing, polyglot & context-aware payload generation, headless Chrome + static analysis.",
      "",
      "8. SQLStrike - High speed automated SQL injection detection and exploitation assistant. Supports error-based, blind, union-based, and stacked queries across MySQL, PostgreSQL, MSSQL, Oracle, and SQLite.",
      "",
      "TSA Library Resources:",
      "- Ebooks: https://github.com/tools-tensorsecurityacademy/ebooks",
      "- Methodologies: https://github.com/tools-tensorsecurityacademy/methodologies",
      "- OSINT Resources: https://github.com/tools-tensorsecurityacademy/OSINT",
      "- Practice Labs: https://github.com/tools-tensorsecurityacademy/practice-labs",
    ].join("\n"),
    keywords: [
      "tools", "labs", "open", "source", "github", "pentest", "toolkit",
      "dirrumble", "nexustrace", "gatewayseeker", "subscape", "cicada", "xss", "cobra",
      "sqlstrike", "library", "ebook", "methodology", "osint", "practice", "lab",
      "scanner", "fuzzer", "enumeration", "subdomain",
    ],
  },
];

// ─── COURSE CHUNKS (with full curriculum + topics) ─────────

const courseChunks: KnowledgeChunk[] = courses.map((course) => ({
  id: `course-${course.slug}`,
  title: course.title,
  body: [
    `Course: ${course.title}`,
    `Short description: ${course.shortDescription}`,
    `Description: ${course.description}`,
    `Duration: ${course.duration}`,
    `Level: ${course.level}`,
    `Price: ${course.price ?? "Contact TSA for pricing"}; prices are negotiable.`,
    `Tags: ${course.tags.join(", ")}`,
    `Badge: ${course.badge || "None"}`,
    "",
    `What You'll Learn (Topics):`,
    ...course.topics.map((t, i) => `  ${i + 1}. ${t}`),
    "",
    `Detailed Curriculum:`,
    ...course.curriculum.map((c) => `  ${c}`),
  ].join("\n"),
  keywords: [
    course.slug,
    course.title,
    course.level,
    course.price ?? "",
    ...course.tags,
    ...course.topics,
    ...course.curriculum.filter((c) => !c.startsWith("•")).map((c) => c.trim()),
  ],
}));

// ─── SERVICE CHUNKS (with full package details) ─────────

const serviceChunks: KnowledgeChunk[] = services.map((service) => ({
  id: `service-${service.slug}`,
  title: service.title,
  body: [
    `Service: ${service.title}`,
    `Short description: ${service.shortDescription}`,
    `Long description: ${service.longDescription}`,
    "",
    `Packages:`,
    ...service.packages.map(
      (pkg) =>
        `  ${pkg.name} (${pkg.price}; negotiable)${pkg.highlight ? " [RECOMMENDED]" : ""}:\n    ${pkg.features.join("\n    ")}`
    ),
  ].join("\n"),
  keywords: [
    service.slug,
    service.title,
    service.shortDescription,
    service.longDescription,
    ...service.packages.flatMap((pkg) => [
      pkg.name,
      pkg.price,
      ...pkg.features,
    ]),
  ],
}));

// ─── NEWS CHUNKS ─────────────────────────────

const newsChunks: KnowledgeChunk[] = NEWS.map((news) => {
  const textContent = news.content
    .filter((block): block is { type: "paragraph"; text: string } | { type: "heading"; text: string } =>
      block.type === "paragraph" || block.type === "heading"
    )
    .map((block) => block.text)
    .join("\n");

  return {
    id: `news-${news.id}`,
    title: news.title,
    body: [
      `News: ${news.title}`,
      `Date: ${news.date}`,
      `Summary: ${news.shortDescription}`,
      `Pinned: ${news.isPinned ? "Yes" : "No"}`,
      "",
      `Full Content:`,
      textContent,
    ].join("\n"),
    keywords: [
      "news",
      "article",
      "event",
      news.title,
      news.shortDescription,
      ...(news.isPinned ? ["pinned", "featured", "latest"] : []),
    ],
  };
});

// ─── CONSULTANT CHUNKS ─────────────────────────────

const consultantChunks: KnowledgeChunk[] = consultants.map((consultant) => ({
  id: `consultant-${consultant.id}`,
  title: `Consultant: ${consultant.name}`,
  body: [
    `Consultant: ${consultant.name}`,
    `Title: ${consultant.title}`,
    `Role at TSA: ${consultant.role}`,
    `Country: ${consultant.country}`,
    `Location: ${consultant.location}`,
    "",
    `Short Description: ${consultant.shortDescription}`,
    "",
    `Qualifications: ${consultant.qualifications.join("; ")}`,
    "",
    `Specializations: ${consultant.specializations.join("; ")}`,
    "",
    `Key Achievements: ${consultant.achievements.slice(0, 6).join("; ")}`,
    "",
    `Education: ${consultant.education.map((e) => `${e.degree} from ${e.institution} (${e.year})`).join("; ")}`,
    "",
    `Certifications: ${consultant.certifications.join("; ")}`,
    "",
    `Languages: ${consultant.languages.join(", ")}`,
    "",
    `Expertise Areas:`,
    ...consultant.expertise.map((exp) => `  ${exp.category}: ${exp.skills.join("; ")}`),
    "",
    `Quote: "${consultant.quote}"`,
    "",
    `Highlights: ${consultant.highlights.slice(0, 8).join("; ")}`,
    "",
    consultant.linkedIn ? `LinkedIn: ${consultant.linkedIn}` : "",
    consultant.email ? `Email: ${consultant.email}` : "",
    "",
    `Public Speaking:`,
    ...consultant.publicSpeaking.map((ps) => `  ${ps.event} - ${ps.topic} (${ps.year})`),
    "",
    consultant.militaryDecorations
      ? `Military Decorations: ${consultant.militaryDecorations.join(", ")}`
      : "",
    "",
    consultant.internationalExercises
      ? `International Exercises:\n${consultant.internationalExercises.map((ex) => `  ${ex.name} - ${ex.role} (${ex.year}): ${ex.description}`).join("\n")}`
      : "",
    "",
    `Biography (Summary): ${consultant.biography.slice(0, 600)}...`,
  ].join("\n"),
  keywords: [
    consultant.id,
    consultant.name,
    consultant.country,
    "consultant",
    "expert",
    "advisor",
    ...consultant.specializations,
    ...consultant.qualifications,
    ...consultant.highlights.slice(0, 5),
  ],
}));

// ─── COMBINE ALL CHUNKS ─────────────────────────────

const knowledgeChunks = [
  ...staticChunks,
  ...courseChunks,
  ...serviceChunks,
  ...newsChunks,
  ...consultantChunks,
];

// ─── SEARCH / RETRIEVAL ─────────────────────────────

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

function scoreChunk(queryTokens: string[], chunk: KnowledgeChunk): number {
  const titleTokens = tokenize(chunk.title);
  const bodyTokens = tokenize(chunk.body);
  const keywordTokens = tokenize(chunk.keywords.join(" "));
  let score = 0;

  for (const token of queryTokens) {
    if (titleTokens.includes(token)) score += 5;
    if (keywordTokens.includes(token)) score += 4;
    if (bodyTokens.includes(token)) score += 2;
    if (
      titleTokens.some((word) => word.includes(token)) ||
      keywordTokens.some((word) => word.includes(token))
    ) {
      score += 1;
    }
  }

  return score;
}

export function retrieveTensoraKnowledge(query: string, limit = 5): KnowledgeChunk[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return staticChunks.slice(0, 2);
  }

  const ranked = knowledgeChunks
    .map((chunk) => ({ chunk, score: scoreChunk(queryTokens, chunk) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.chunk);

  const hasPricingIntent = queryTokens.some((token) =>
    ["price", "pricing", "cost", "fee", "fees", "negotiable", "discount", "quote"].includes(token)
  );

  if (hasPricingIntent && !ranked.some((chunk) => chunk.id === "tsa-pricing-policy")) {
    return [staticChunks[1], ...ranked].slice(0, limit);
  }

  return ranked.length > 0 ? ranked : staticChunks.slice(0, 2);
}

export function buildTensoraKnowledgeContext(query: string): string {
  const chunks = retrieveTensoraKnowledge(query);

  return [
    "TSA Knowledge Context:",
    "Use this context when it is relevant. If the answer is not in the context, say you do not have that exact TSA detail and suggest contacting TSA.",
    "Pricing rule: prices are negotiable. Mention this when users ask about price, cost, quote, packages, discounts, or budget.",
    ...chunks.map(
      (chunk, index) => `Context ${index + 1} - ${chunk.title}\n${chunk.body}`
    ),
  ].join("\n\n");
}
