"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { getFAQs } from "@/features/home/data/faqs";
import {
  sectionSubtitleStyle,
  sectionTitleStyle,
} from "@/features/home/components/homeSectionStyles";

export default function FAQPreview() {
  const faqs = getFAQs();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(44px, 7vw, 86px) clamp(16px, 4vw, 24px)",
        background:
          "radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.1), transparent 34%), radial-gradient(circle at 82% 76%, rgba(168, 85, 247, 0.12), transparent 30%)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "920px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: "clamp(28px, 5vw, 48px)" }}
        >
          <h2 style={sectionTitleStyle}>Frequently Asked Questions</h2>
          <p style={sectionSubtitleStyle}>
            Quick answers about our training, mentorship, and cybersecurity services.
          </p>
        </motion.div>

        <div style={{ display: "grid", gap: "clamp(12px, 2vw, 18px)" }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.42, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  border: isOpen
                    ? "1px solid rgba(34, 211, 238, 0.62)"
                    : "1px solid rgba(34, 211, 238, 0.28)",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, rgba(17, 24, 39, 0.88), rgba(15, 23, 42, 0.78))",
                  boxShadow: isOpen
                    ? "0 22px 58px rgba(2, 6, 23, 0.38), 0 0 32px rgba(34, 211, 238, 0.1)"
                    : "0 14px 34px rgba(2, 6, 23, 0.26)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    minHeight: "clamp(54px, 7vw, 64px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "clamp(14px, 2.8vw, 20px) clamp(14px, 3vw, 24px)",
                    border: 0,
                    background: "transparent",
                    color: "#e5e7eb",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "var(--font-nunito)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(14px, 2.3vw, 17px)",
                      fontWeight: 800,
                      lineHeight: 1.35,
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "999px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "0 0 auto",
                      border: "1px solid rgba(34, 211, 238, 0.56)",
                      background: isOpen
                        ? "linear-gradient(135deg, #22d3ee, #a855f7)"
                        : "rgba(34, 211, 238, 0.08)",
                      color: isOpen ? "#020617" : "#cbd5e1",
                      transition: "all 0.22s ease",
                    }}
                  >
                    <ChevronDown
                      aria-hidden="true"
                      style={{
                        width: "17px",
                        height: "17px",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.22s ease",
                      }}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          margin: 0,
                          padding: "0 clamp(14px, 3vw, 24px) clamp(18px, 3vw, 24px)",
                          color: "#cbd5e1",
                          fontFamily: "var(--font-nunito)",
                          fontSize: "clamp(13px, 2vw, 15px)",
                          lineHeight: 1.7,
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
