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
              fontFamily: "var(--font-space-mono)",
              fontSize: "13px",
              fontWeight: 700,
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
              color: "#ffffff",
              fontFamily: "var(--font-nunito)",
              fontSize: "clamp(34px, 6vw, 54px)",
              fontWeight: 800,
              lineHeight: 1.08,
            }}
          >
            Frequently Asked Questions
          </h1>
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
                  fontFamily: "var(--font-nunito)",
                  fontSize: "clamp(18px, 3vw, 22px)",
                  fontWeight: 800,
                  lineHeight: 1.25,
                }}
              >
                {faq.question}
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "#cbd5e1",
                  fontFamily: "var(--font-nunito)",
                  fontSize: "clamp(14px, 2.4vw, 16px)",
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
