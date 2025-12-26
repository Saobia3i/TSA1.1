"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Users, Zap, CheckCircle, Shield } from "lucide-react";
import Image from "next/image";

/* ================= Responsive Hook (No CSS file) ================= */

function useBreakpoints() {
  const [w, setW] = useState<number>(
    typeof window === "undefined" ? 1200 : window.innerWidth
  );

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = w < 640; // < sm
  const isTablet = w >= 640 && w < 1024; // sm..md-ish

  return { w, isMobile, isTablet };
}

/* ================= COUNT (1 → 5+ LOOP, BIG) ================= */

function CountUp5({ big }: { big?: boolean }) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    let current = 1;
    let paused = false;

    const id = setInterval(() => {
      if (paused) return;

      current += 1;
      if (current >= 5) {
        current = 5;
        paused = true;
        setCount(current);

        setTimeout(() => {
          current = 1;
          paused = false;
          setCount(current);
        }, 1200);
      } else {
        setCount(current);
      }
    }, 180);

    return () => clearInterval(id);
  }, []);

  return (
    <motion.span
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.2 }}
      style={{
        fontSize: big ? "38px" : "32px", // ✅ bigger
        fontWeight: 750,
        color: "#f97316",
        letterSpacing: "1px",
        lineHeight: 1,
        gap: "5px",
        textShadow: "0px 0px 50px rgba(249,115,22,0.75)",
        willChange: "transform",
      }}
    >
      {count}+
    </motion.span>
  );
}

/* ================= TYPES ================= */

type FeatureItem = {
  icon: React.ReactNode | null;
  text: React.ReactNode;
  color: string;
};

/* ================= DATA ================= */

const TOP_FEATURES: FeatureItem[] = [
  { icon: <Users size={28} />, text: "1-on-1 Mentorship", color: "#22d3ee" },
  { icon: <Zap size={28} />, text: "Live Training", color: "#a855f7" },
  {
    icon: <CheckCircle size={28} />,
    text: "Career Guidance",
    color: "#ec4899",
  },
  {
    icon: <Shield size={28} />,
    text: "Certification Support",
    color: "#06b6d4",
  },
];
function USFlagIcon({ size = 80 }: { size?: number }) {
  return (
    <Image
      src="https://ik.imagekit.io/7yw4jtfbt/TSA/FLAG.png" // Your image URL
      alt="United States Flag"
      width={size} // Dynamically set width
      height={size} // Dynamically set height
      style={{
        objectFit: "cover",
        borderRadius: "50%",
      }}
    />
  );
}

function buildBottomFeatures(isMobile: boolean): FeatureItem[] {
  return [
    {
      icon: <CountUp5 big />,
      color: "#f97316",
      text: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            // gap: '12px',
          }}
        >
          <span
            style={{
              alignContent: "center",
              fontWeight: 800,
              fontSize: isMobile ? "14px" : "15px",
            }}
          >
            Countries
            <br />
            Projected Expansion by 2026
          </span>
        </div>
      ),
    },

    {
      icon: <USFlagIcon size={80} />,
      color: "#22c55e",
      text: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            textAlign: "center",
          }}
        >
          <span style={{ fontWeight: 800 }}>
            Current Operations
            <br />
            (USA)
          </span>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-nunito)",
              fontSize: "15px",
              fontWeight: 600,
              color: "#22c55e",
            }}
          >
            <span
              aria-label="active"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 10px rgba(34,197,94,0.6)",
                display: "inline-block",
              }}
            />
            <span>Active</span>
          </div>
        </div>
      ),
    },
  ];
}

/* ================= CARD ================= */

function FeatureCard({
  icon,
  text,
  color,
  isMobile,
}: FeatureItem & { isMobile: boolean }) {
  const padding = isMobile ? "18px 14px" : "26px 20px";
  const radius = isMobile ? "18px" : "20px";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={isMobile ? undefined : { y: -8, scale: 1.05 }}
      transition={{ duration: 0.35 }}
      style={{
        width: "100%",
        padding,
        borderRadius: radius,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(14px)",
        border: `1px solid ${color}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? "12px" : "16px",
        boxShadow: `0 0 0 rgba(0,0,0,0)`,
      }}
    >
      {/* ICON (if exists) */}
      {icon && (
        <div
          style={{
            width: isMobile ? "58px" : "64px",
            height: isMobile ? "54px" : "60px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}55, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            //color,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      )}

      {/* TEXT */}
      <div
        style={{
          fontSize: isMobile ? "13px" : "14px",
          fontWeight: 650,
          letterSpacing: "0.6px",
          color: "#ffffff",
          textAlign: "center",
          width: "100%",
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}

/* ================= MAIN ================= */

export default function Feature() {
  const { isMobile, isTablet } = useBreakpoints();
  const bottom = useMemo(() => buildBottomFeatures(isMobile), [isMobile]);

  // ✅ responsive columns
  const topCols = isMobile
    ? "repeat(2, minmax(0, 1fr))"
    : isTablet
    ? "repeat(2, minmax(0, 1fr))"
    : "repeat(4, minmax(0, 1fr))";
  const bottomCols = isMobile
    ? "repeat(1, minmax(0, 1fr))"
    : "repeat(2, minmax(0, 1fr))";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: isMobile ? "22px auto 0" : "40px auto 0",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "18px" : "28px",
        pointerEvents: "auto",
        padding: isMobile ? "0 10px" : "0",
      }}
    >
      {/* TOP ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: topCols,
          gap: isMobile ? "14px" : "22px",
        }}
      >
        {TOP_FEATURES.map((f, i) => (
          <FeatureCard key={i} {...f} isMobile={isMobile} />
        ))}
      </div>

      {/* BOTTOM ROW (centered) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: bottomCols,
          gap: isMobile ? "14px" : "22px",
          maxWidth: isMobile ? "520px" : "720px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {bottom.map((f, i) => (
          <FeatureCard key={i} {...f} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
}
