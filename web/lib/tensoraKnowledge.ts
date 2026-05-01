import { courses } from "@/features/courses/data/courses";
import { services } from "@/features/services/data/services";

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

const staticChunks: KnowledgeChunk[] = [
  {
    id: "tsa-overview",
    title: "Tensor Security Academy overview",
    body:
      "Tensor Security Academy (TSA) is a cybersecurity learning platform offering hands-on cybersecurity courses, mentorship, practical labs, career guidance, and professional cybersecurity services.",
    keywords: ["tsa", "tensor", "security", "academy", "about", "overview"],
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
    title: "TSA enrollment process",
    body:
      "Users can enroll through the course page. If they are not logged in, they may be asked to log in first. TSA stores enrollment requests and contacts students for next steps, details, and approval.",
    keywords: ["enroll", "enrollment", "admission", "join", "course", "login"],
  },
  {
    id: "tsa-service-booking",
    title: "TSA service booking process",
    body:
      "Users can request professional services through the service booking form. TSA contacts the requester via email or WhatsApp to discuss scope, pricing, timeline, and onboarding details.",
    keywords: ["service", "booking", "whatsapp", "email", "scope", "onboarding"],
  },
];

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
    `Topics: ${course.topics.slice(0, 8).join("; ")}`,
  ].join("\n"),
  keywords: [
    course.slug,
    course.title,
    course.level,
    course.price ?? "",
    ...course.tags,
    ...course.topics,
  ],
}));

const serviceChunks: KnowledgeChunk[] = services.map((service) => ({
  id: `service-${service.slug}`,
  title: service.title,
  body: [
    `Service: ${service.title}`,
    `Short description: ${service.shortDescription}`,
    `Long description: ${service.longDescription}`,
    `Packages: ${service.packages
      .map((pkg) => `${pkg.name} (${pkg.price}; negotiable): ${pkg.features.slice(0, 4).join(", ")}`)
      .join(" | ")}`,
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

const knowledgeChunks = [...staticChunks, ...courseChunks, ...serviceChunks];

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
