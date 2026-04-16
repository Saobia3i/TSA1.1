"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote, Handshake } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import HeroSection from "@/features/home/components/HeroSection";
import {
  homePreviewButtonStyle,
  sectionSubtitleStyle,
  sectionTitleStyle,
} from "@/features/home/components/homeSectionStyles";

// Lazy load preview components for better performance
const CoursesPreview = dynamic(() => import("@/features/home/components/CoursesPreview"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-900/20" />,
});

const NewsPreview = dynamic(() => import("@/features/home/components/NewsPreview"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-900/20" />,
});

const ServicesPreview = dynamic(() => import("@/features/home/components/ServicesPreview"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-900/20" />,
});

const ToolsPreview = dynamic(() => import("@/features/home/components/ToolsPreview"), {
  loading: () => <div className="h-96 animate-pulse bg-gray-900/20" />,
});

import Consultantpreview from "@/features/home/components/Consultantpreview";
//import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Tensor Security Academy - Cybersecurity & Blockchain Training',
//   description: 'Master cybersecurity with hands-on training in ethical hacking, penetration testing, blockchain security, and network security. Industry-recognized certifications, expert instructors, and practical labs.',
//   openGraph: {
//     title: 'Tensor Security Academy - Cybersecurity Training',
//     description: 'Master cybersecurity with hands-on training in ethical hacking, penetration testing, and blockchain security.',
//     images: ['/og-image.png'],
//   },
// }
// Add structured data for homepage
// const homeJsonLd = {
//   '@context': 'https://schema.org',
//   '@type': 'WebSite',
//   name: 'Tensor Security Academy',
//   url: 'https://tensorsecurityacademy.com',
//   potentialAction: {
//     '@type': 'SearchAction',
//     target: 'https://tensorsecurityacademy.com/search?q={search_term_string}',
//     'query-input': 'required name=search_term_string',
//   },
// }

export default function HomePage() {
  const founderRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // const { scrollYProgress } = useScroll({
  //   target: founderRef,
  //   offset: ["start end", "end start"],
  // });

  const getPreviewReveal = (direction: "up" | "left" | "right") => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.28, ease: "easeOut" as const },
      };
    }

    const distance = isMobile ? 18 : 26;
    const initial =
      direction === "left"
        ? { opacity: 0, x: -distance }
        : direction === "right"
          ? { opacity: 0, x: distance }
          : { opacity: 0, y: distance };

    return {
      initial,
      whileInView: { opacity: 1, x: 0, y: 0 },
      transition: {
        duration: isMobile ? 0.42 : 0.52,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    };
  };

  const previewRevealStyle = {
    transform: "translateZ(0)",
    backfaceVisibility: "hidden" as const,
  };

  return (
    <div style={{ backgroundColor: "#000", overflowX: "hidden", position: "relative" }}>
      {/* Hero Section */}
      <HeroSection />

      
      {/* <Feature /> */}

      <NewsPreview />
      
      <motion.div
        {...getPreviewReveal("up")}
        viewport={{ once: true, amount: 0.16, margin: "0px 0px -8% 0px" }}
        style={previewRevealStyle}
      >
        <Consultantpreview />
      </motion.div>
      {/* Feature Previews from Features folder */}
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
          initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: isMobile ? 0.5 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center" as const, marginBottom: "50px" }}
        >
          <h2 style={sectionTitleStyle}>
            Message from the Founder
          </h2>
          <p style={sectionSubtitleStyle}>
            Our commitment to your success
          </p>
        </motion.div>

        <motion.div
          initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: isMobile ? 0.5 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            padding: "clamp(24px, 5vw, 40px)",
            backgroundColor: "rgba(17, 24, 39, 0.6)",
            borderRadius: "24px",
            border: "2px solid rgba(34, 211, 238, 0.2)",
            backdropFilter: isMobile ? "blur(10px)" : "blur(20px)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <motion.div
            initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: isMobile ? 0 : 0.2, duration: isMobile ? 0.4 : 0.5, type: "spring", stiffness: 100 }}
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
              whileHover={isMobile ? {} : { scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "5px",
                padding: "3px",
                position: "relative",
                background: "linear-gradient(135deg, #269f9a, #22d3ee)",
              }}
            >
              {/* Glow layer */}
              {!isMobile && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: "1px",
                    borderRadius: "1px",
                    background: "linear-gradient(135deg, rgb(38,159,154), rgb(38,159,154) 25%)",
                    filter: "blur(18px)",
                    opacity: 0.6,
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Image container */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#111827",
                  overflow: "hidden",
                  position: "relative",
                  zIndex: 1,
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="https://ik.imagekit.io/7yw4jtfbt/TSA/WhatsApp%20Image%202025-12-25%20at%207.49.50%20PM.jpeg?tr=w-280,h-280,q-85,f-webp"
                  alt="Founder - Abrar Jahin"
                  width={280}
                  height={280}
                  priority
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            </motion.div>

            <div style={{ flex: 1, minWidth: "300px", maxWidth: "700px" }}>
              <motion.p
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: isMobile ? 0 : 0.15, duration: isMobile ? 0.4 : 0.6 }}
                style={{
                  fontSize: "clamp(14px, 2vw, 16px)",
                  color: "#e5e7eb",
                  lineHeight: 1.8,
                  marginBottom: "16px",
                  fontFamily: "var(--font-nunito)",
                  fontStyle: "italic" as const,
                }}
              >
                Let&apos;s be brutally honest for a moment. AI is changing
                everything. It&apos;s erasing career paths overnight and leaving
                professionals with two choices: Adapt or Expire. At the same
                time you&apos;re stuck in the endless{" "}
                {/* <span style={{ color: "#22d3ee", fontWeight: 600, gap: "4px" }}>
                 
                </span> */}
                Tutorial Loop jumping from one outdated video to the next,
                piecing together fragments of information with no map, no
                mentor, and no measurable progress. Endless content, but no true
                guide. That&apos;s the Trial and Error loop that keeps you stagnant.
                <span style={{ color: "#22d3ee", fontWeight: 600, gap: "4px" }}>
                  <br />
                  <br />
                  We break the cycle. We give you what no tutorial can, a
                  structured, Mentor-led journey with Live interactive training
                  & real industry insight.
                </span>
              </motion.p>
              <motion.p
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: isMobile ? 0 : 0.25, duration: isMobile ? 0.4 : 0.6 }}
                style={{
                  fontSize: "clamp(14px, 2vw, 16px)",
                  color: "#e5e7eb",
                  lineHeight: 1.8,
                  marginBottom: "20px",
                  fontFamily: "var(--font-nunito)",
                  fontStyle: "italic" as const,
                }}
              >
                This isn&apos;t just learning, it&apos;s a career transformation, built
                for the AI era.
              </motion.p>
              <span style={{ color: "#22d3ee", fontWeight: 600, gap: "4px" }}>
                <br />
                Your future won&apos;t wait. Secure your spot, before the world moves
                on without you.
              </span>
              <motion.div
                initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: isMobile ? 0 : 0.35, duration: isMobile ? 0.4 : 0.6 }}
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
                    Abrar Jahin
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#9ca3af",
                      fontFamily: "var(--font-nunito)",
                    }}
                  >
                    Founder,Tensor Security Academy
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>
      <motion.div
        {...getPreviewReveal("right")}
        viewport={{ once: true, amount: 0.16, margin: "0px 0px -8% 0px" }}
        style={previewRevealStyle}
      >
        <CoursesPreview />
      </motion.div>
      <motion.div
        {...getPreviewReveal("up")}
        viewport={{ once: true, amount: 0.16, margin: "0px 0px -8% 0px" }}
        style={previewRevealStyle}
      >
        <ServicesPreview />
      </motion.div>
      <motion.div
        {...getPreviewReveal("up")}
        viewport={{ once: true, amount: 0.16, margin: "0px 0px -8% 0px" }}
        style={previewRevealStyle}
      >
        <ToolsPreview />
      </motion.div>
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
          <h2 style={sectionTitleStyle}>
            Trusted by
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
            whileHover={isMobile ? {} : {
              scale: 1.1,
              y: -10,
              boxShadow: "0 25px 50px rgba(34, 211, 238, 0.4)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
              src="https://ik.imagekit.io/7yw4jtfbt/TSA/WhatsApp%20Image%202025-12-18%20at%208.38.36%20PM.jpeg?tr=w-360,h-360,q-80,f-webp"
              alt="Partner 1"
              width={180}
              height={180}
              loading="lazy"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                width: "90%",
                height: "90%",
              }}
            />
          </motion.div>
          <motion.div
            whileHover={isMobile ? {} : {
              scale: 1.1,
              y: -10,
              boxShadow: "0 25px 50px rgba(34, 211, 238, 0.4)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
              src="https://ik.imagekit.io/7yw4jtfbt/TSA/WhatsApp%20Image%202025-12-18%20at%208.37.38%20PM.jpeg?tr=w-360,h-360,q-80,f-webp"
              alt="Partner 2"
              width={180}
              height={180}
              loading="lazy"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                width: "90%",
                height: "90%",
              }}
            />
          </motion.div>

          {/* Logo 3 */}
          <motion.div
            whileHover={isMobile ? {} : {
              scale: 1.1,
              y: -10,
              boxShadow: "0 25px 50px rgba(34, 211, 238, 0.4)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
              src="https://ik.imagekit.io/7yw4jtfbt/TSA/WhatsApp%20Image%202025-12-18%20at%208.33.52%20PM.jpeg?tr=w-360,h-360,q-80,f-webp"
              alt="Partner 3"
              width={180}
              height={180}
              loading="lazy"
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
              whileHover={isMobile ? {} : { scale: 1.05, y: -3 }}
              whileTap={isMobile ? {} : { scale: 0.95 }}
              style={homePreviewButtonStyle}
            >
              <Handshake style={{ width: "18px", height: "18px" }} />
              Become a partner
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
