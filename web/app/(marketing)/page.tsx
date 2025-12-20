"use client";

import { motion } from "framer-motion";
import { MessageCircle, Quote, Handshake } from "lucide-react";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/features/home/components/HeroSection";
import CoursesPreview from "@/features/home/components/CoursesPreview";
import ServicesPreview from "@/features/home/components/ServicesPreview";
import ToolsPreview from "@/features/home/components/ToolsPreview";

export default function HomePage() {
  const founderRef = useRef<HTMLElement>(null);

  const { scrollYProgress: founderProgress } = useScroll({
    target: founderRef,
    offset: ["start end", "end start"],
  });

  return (
    <div style={{ backgroundColor: "#000", overflowX: "hidden" }}>
      {/* Hero Section */}
      <HeroSection />

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/+8801331759287"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.8,
          duration: 0.4,
          type: "spring",
          stiffness: 200,
        }}
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 50,
          width: "60px",
          height: "60px",
          backgroundColor: "#25D366",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 30px rgba(37, 211, 102, 0.4)",
          cursor: "pointer",
        }}
      >
        <MessageCircle
          style={{ width: "28px", height: "28px", color: "white" }}
        />
      </motion.a>

      {/* Founder Message Section */}
      <motion.section
        ref={founderRef}
        style={{
          padding: "clamp(40px, 6vw, 60px) 24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center" as const, marginBottom: "50px" }}
        >
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              background: "linear-gradient(135deg, #22d3ee, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "var(--font-nunito)",
              marginBottom: "12px",
            }}
          >
            Message from the Founder
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 16px)",
              color: "#9ca3af",
              fontFamily: "var(--font-nunito)",
            }}
          >
            Our commitment to your success
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            padding: "clamp(24px, 5vw, 40px)",
            backgroundColor: "rgba(17, 24, 39, 0.6)",
            borderRadius: "24px",
            border: "2px solid rgba(34, 211, 238, 0.2)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            style={{
              position: "absolute",
              top: "20px",
              left: "30px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(168, 85, 247, 0.2))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Quote
              style={{ width: "24px", height: "24px", color: "#22d3ee" }}
            />
          </motion.div>

          <div
            style={{
              display: "flex",
              gap: "32px",
              alignItems: "center",
              flexDirection: "row" as const,
              flexWrap: "wrap" as const,
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3, type: "spring" }}
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #06b6d4, #a855f7)",
                padding: "4px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "18px",
                  backgroundColor: "#111827",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #22d3ee, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "var(--font-nunito)",
                  }}
                >
                  AJ
                </div>
              </div>
            </motion.div>

            <div style={{ flex: 1, minWidth: "300px", maxWidth: "700px" }}>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.6 }}
                style={{
                  fontSize: "clamp(14px, 2vw, 16px)",
                  color: "#e5e7eb",
                  lineHeight: 1.8,
                  marginBottom: "16px",
                  fontFamily: "var(--font-nunito)",
                  fontStyle: "italic" as const,
                }}
              >
                At Tensor Security Academy, we believe in direct, personalized
                guidance. Every program is built around{" "}
                <span style={{ color: "#22d3ee", fontWeight: 600 }}>
                  one-on-one live training with expert mentors
                </span>
                .
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.6 }}
                style={{
                  fontSize: "clamp(14px, 2vw, 16px)",
                  color: "#e5e7eb",
                  lineHeight: 1.8,
                  marginBottom: "20px",
                  fontFamily: "var(--font-nunito)",
                  fontStyle: "italic" as const,
                }}
              >
                Our mentors provide real-time feedback and career advice. Your
                success is our mission.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(34, 211, 238, 0.2)",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "40px",
                    background: "linear-gradient(to bottom, #22d3ee, #a855f7)",
                    borderRadius: "2px",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#22d3ee",
                      fontFamily: "var(--font-nunito)",
                      marginBottom: "2px",
                    }}
                  >
                    Abrar Jahin Sachcha
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#9ca3af",
                      fontFamily: "var(--font-nunito)",
                    }}
                  >
                    Founder & Lead Mentor
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Feature Previews from Features folder */}
      <CoursesPreview />
      <ServicesPreview />
      <ToolsPreview />
      {/* Our Concern Section - NO styles import needed */}
      <section
        style={{
          padding: "80px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Heading */}
        <div style={{ textAlign: "center" as const, marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 700,
              background: "linear-gradient(135deg, #22d3ee, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "var(--font-nunito)",
            }}
          >
            Our Concern
          </h2>
        </div>

        {/* Circle Logos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "32px",
            marginBottom: "60px",
            justifyItems: "center",
          }}
        >
          {/* Logo 1 */}
          <motion.div
            whileHover={{
              scale: 1.1,
              y: -10,
              boxShadow: "0 25px 50px rgba(34, 211, 238, 0.4)",
            }}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundColor: "rgba(17, 24, 39, 0.9)",
              border: "2px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src="https://ik.imagekit.io/7yw4jtfbt/TSA/WhatsApp%20Image%202025-12-18%20at%208.38.36%20PM.jpeg?updatedAt=1766169177657"
              alt="Partner 1"
              width={180}
              height={180}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                width: "90%",
                height: "90%",
              }}
            />
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.1,
              y: -10,
              boxShadow: "0 25px 50px rgba(34, 211, 238, 0.4)",
            }}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundColor: "rgba(17, 24, 39, 0.9)",
              border: "2px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src="https://ik.imagekit.io/7yw4jtfbt/TSA/WhatsApp%20Image%202025-12-18%20at%208.37.38%20PM.jpeg?updatedAt=1766169177677"
              alt="Partner 2"
              width={180}
              height={180}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                width: "90%",
                height: "90%",
              }}
            />
          </motion.div>

          {/* Logo 1 */}
          <motion.div
            whileHover={{
              scale: 1.1,
              y: -10,
              boxShadow: "0 25px 50px rgba(34, 211, 238, 0.4)",
            }}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundColor: "rgba(17, 24, 39, 0.9)",
              border: "2px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src="https://ik.imagekit.io/7yw4jtfbt/TSA/WhatsApp%20Image%202025-12-18%20at%208.33.52%20PM.jpeg?updatedAt=1766169177263"
              alt="Partner 3"
              width={180}
              height={180}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                width: "90%",
                height: "90%",
              }}
            />
          </motion.div>
        </div>

        {/* EXACT BUTTON - Inline styles */}
        <div style={{ textAlign: "center" as const }}>
          <Link href="/about/join">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: 700,
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(168, 85, 247, 0.15))",
                border: "2px solid rgba(34, 211, 238, 0.4)",
                color: "white",
                cursor: "pointer",
                fontFamily: "var(--font-nunito)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 25px rgba(34, 211, 238, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(34, 211, 238, 0.5)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(34, 211, 238, 0.25), rgba(168, 85, 247, 0.25))";
                e.currentTarget.style.borderColor = "rgba(34, 211, 238, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(34, 211, 238, 0.3)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(168, 85, 247, 0.15))";
                e.currentTarget.style.borderColor = "rgba(34, 211, 238, 0.4)";
              }}
            >
              <Handshake style={{ width: "20px", height: "20px" }} />
              Become a partner
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
