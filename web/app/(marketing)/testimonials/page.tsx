import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedTestimonials } from "@/lib/testimonials";

const BASE_URL = "https://tensorsecurityacademy.com";

export const metadata: Metadata = {
  title: "Testimonials - Tensor Security Academy",
  description:
    "Read reviews and learner experiences from Tensor Security Academy students, professionals, and cybersecurity community members.",
  alternates: {
    canonical: "/testimonials",
  },
};

export default async function TestimonialsPage() {
  const testimonials = await getPublishedTestimonials();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE_URL}/testimonials#testimonials`,
    name: "Tensor Security Academy Testimonials",
    itemListElement: testimonials.map((testimonial, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: testimonial.name,
          jobTitle: testimonial.position,
        },
        reviewBody: testimonial.review,
        url: testimonial.postLink,
        itemReviewed: {
          "@type": "EducationalOrganization",
          name: "Tensor Security Academy",
          url: BASE_URL,
        },
      },
    })),
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(34, 211, 238, 0.1), transparent 34%), radial-gradient(circle at 80% 35%, rgba(168, 85, 247, 0.1), transparent 28%), #000",
        padding: "clamp(96px, 12vw, 132px) clamp(16px, 4vw, 24px) 72px",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "42px" }}>
          <p
            style={{
              color: "#22d3ee",
              fontFamily: "var(--font-space-mono)",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Testimonials
          </p>
          <h1
            style={{
              margin: 0,
              color: "#ffffff",
              fontFamily: "var(--font-nunito)",
              fontSize: "clamp(34px, 6vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.08,
            }}
          >
            What People Say About Us
          </h1>
          <p
            style={{
              maxWidth: "720px",
              margin: "16px auto 0",
              color: "#9ca3af",
              fontFamily: "var(--font-nunito)",
              fontSize: "clamp(14px, 2.4vw, 16px)",
              lineHeight: 1.7,
            }}
          >
            Real feedback from learners and professionals growing with Tensor Security Academy.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "18px",
          }}
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              style={{
                border: "1px solid rgba(34, 211, 238, 0.22)",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, rgba(17, 24, 39, 0.82), rgba(2, 6, 23, 0.86))",
                padding: "clamp(18px, 3vw, 24px)",
                boxShadow: "0 18px 42px rgba(0, 0, 0, 0.28)",
              }}
            >
              <h2
                style={{
                  margin: "0 0 6px",
                  color: "#ffffff",
                  fontFamily: "var(--font-nunito)",
                  fontSize: "clamp(18px, 3vw, 22px)",
                  fontWeight: 800,
                  lineHeight: 1.25,
                }}
              >
                {testimonial.name}
              </h2>
              {testimonial.position ? (
                <p
                  style={{
                    margin: "0 0 16px",
                    color: "#22d3ee",
                    fontFamily: "var(--font-nunito)",
                    fontSize: "13px",
                    fontWeight: 700,
                    lineHeight: 1.45,
                  }}
                >
                  {testimonial.position}
                </p>
              ) : null}
              <p
                style={{
                  margin: 0,
                  color: "#cbd5e1",
                  fontFamily: "var(--font-nunito)",
                  fontSize: "clamp(14px, 2.4vw, 16px)",
                  lineHeight: 1.7,
                }}
              >
                {testimonial.review}
              </p>
              {testimonial.postLink ? (
                <Link
                  href={testimonial.postLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    marginTop: "18px",
                    color: "#22d3ee",
                    fontFamily: "var(--font-nunito)",
                    fontSize: "13px",
                    fontWeight: 800,
                  }}
                >
                  View original post
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
