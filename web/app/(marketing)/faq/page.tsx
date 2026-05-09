import type { Metadata } from "next";
import { getFAQs } from "@/features/home/data/faqs";

export const metadata: Metadata = {
  title: "FAQ - Tensor Security Academy",
  description:
    "Frequently asked questions about Tensor Security Academy courses, mentorship, labs, and cybersecurity services.",
};

export default function FAQPage() {
  const faqs = getFAQs();

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(34, 211, 238, 0.1), transparent 34%), #000",
        padding: "clamp(96px, 12vw, 132px) clamp(16px, 4vw, 24px) 72px",
      }}
    >
      <section style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "42px" }}>
          <p
            style={{
              color: "#22d3ee",
              fontFamily: "var(--font-family-base)",
              fontSize: "var(--font-size-sm)",
              fontWeight: "var(--font-weight-bold)",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            FAQ
          </p>
          <h1
            style={{
              margin: 0,
              background: "linear-gradient(135deg, #22d3ee, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "var(--font-family-base)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: "var(--font-weight-bold)",
              letterSpacing: 0,
              lineHeight: 1.15,
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            style={{
              maxWidth: "680px",
              margin: "16px auto 0",
              color: "#9ca3af",
              fontFamily: "var(--font-family-base)",
              fontSize: "clamp(14px, 2vw, 16px)",
              fontWeight: "var(--font-weight-medium)",
              lineHeight: 1.6,
            }}
          >
            Quick answers about our training, mentorship, labs, and cybersecurity services.
          </p>
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
          {faqs.map((faq) => (
            <article
              key={faq.question}
              style={{
                border: "1px solid rgba(34, 211, 238, 0.22)",
                borderRadius: "16px",
                background: "rgba(17, 24, 39, 0.72)",
                padding: "clamp(18px, 3vw, 24px)",
                boxShadow: "0 18px 42px rgba(0, 0, 0, 0.28)",
              }}
            >
              <h2
                style={{
                  margin: "0 0 10px",
                  color: "#ffffff",
                  fontFamily: "var(--font-family-base)",
                  fontSize: "clamp(18px, 3vw, 22px)",
                  fontWeight: "var(--font-weight-bold)",
                  lineHeight: 1.25,
                }}
              >
                {faq.question}
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "#cbd5e1",
                  fontFamily: "var(--font-family-base)",
                  fontSize: "clamp(14px, 2.4vw, 16px)",
                  fontWeight: "var(--font-weight-medium)",
                  lineHeight: 1.7,
                }}
              >
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
