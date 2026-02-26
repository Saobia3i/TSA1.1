'use client';

import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

const HEADLINE_ROTATION = [
  'Penetration Testing',
  'Threat Intelligence',
  'Cloud Security',
  'AI Security Ops',
  'Red Team Execution',
];

const TRUST_POINTS = [
  'No credit card required',
  '14-day money-back guarantee',
  'Live mentor support',
];

const METRICS = [
  { value: '15,000+', label: 'Professionals trained' },
  { value: '98%', label: 'Placement rate' },
  { value: '$120K', label: 'Avg. starting salary' },
  { value: '4.9/5', label: 'Learner rating' },
];

const CERTS = [
  'CEH',
  'CISSP',
  'OSCP',
  'Security+',
  'CISM',
  'CCSP',
  'GPEN',
  'GCIH',
  'CISA',
  'CASP+',
];

export default function CyberHero() {
  const [mounted, setMounted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % HEADLINE_ROTATION.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <div style={{ minHeight: '100vh', background: '#01040a' }} />;
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#01040a',
        color: '#fafafa',
        borderBottom: '1px solid rgba(56,189,248,.38)',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

        .hero-wrap * { box-sizing: border-box; }
        .hero-wrap {
          font-family: 'Manrope', sans-serif;
          --accent-cyan: #38bdf8;
          --accent-cyan-soft: #7dd3fc;
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(.7); opacity: .6; }
        }

        @keyframes shimmer {
          from { transform: translateX(-130%); }
          to { transform: translateX(130%); }
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes glowBreathe {
          0%, 100% { opacity: .78; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.06); }
        }

        @keyframes arcPulse {
          0%, 100% { opacity: .84; box-shadow: 0 0 22px rgba(56,189,248,.28), 0 0 60px rgba(56,189,248,.24); }
          50% { opacity: 1; box-shadow: 0 0 34px rgba(56,189,248,.42), 0 0 94px rgba(56,189,248,.36); }
        }

        @keyframes ambientDrift {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: .36; }
          50% { transform: translateX(-50%) translateY(12px); opacity: .52; }
        }

        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 10px 24px rgba(0,0,0,.42), 0 0 0 1px rgba(191,232,255,.34) inset, 0 0 0 rgba(56,189,248,0); }
          50% { box-shadow: 0 12px 30px rgba(0,0,0,.5), 0 0 0 1px rgba(191,232,255,.5) inset, 0 0 36px rgba(56,189,248,.26); }
        }

        .hero-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #38bdf8;
          animation: pulseDot 1.8s ease-in-out infinite;
          box-shadow: 0 0 16px rgba(56,189,248,.8);
        }

        .hero-btn-primary {
          position: relative;
          overflow: hidden;
          transition: transform .2s ease, filter .2s ease;
          animation: ctaPulse 4.8s ease-in-out infinite;
          border-radius: 8px !important;
        }

        .hero-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 25%,
            rgba(255,255,255,.2) 45%,
            transparent 65%
          );
          animation: shimmer 2.5s linear infinite;
        }

        .hero-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.12); }
        .hero-btn-secondary:hover { background: rgba(56,189,248,.12) !important; border-color: rgba(56,189,248,.5) !important; color: #e0f2fe !important; }

        .hero-marquee {
          display: flex;
          width: max-content;
          min-width: 200%;
          animation: marquee 24s linear infinite;
        }

        .hero-horizon-glow {
          position: absolute;
          left: 50%;
          bottom: -800px;
          transform: translateX(-50%);
          width: min(2750px, 240vw);
          height: 1560px;
          border-radius: 50%;
          background:
            radial-gradient(ellipse at 50% 36%, rgba(56,189,248,.56) 0%, rgba(56,189,248,.24) 30%, rgba(56,189,248,.1) 56%, rgba(56,189,248,0) 80%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 1;
          animation: glowBreathe 7.2s ease-in-out infinite;
        }

        .hero-horizon-ambient {
          position: absolute;
          left: 50%;
          bottom: -880px;
          transform: translateX(-50%);
          width: min(3000px, 255vw);
          height: 1700px;
          border-radius: 50%;
          background: radial-gradient(ellipse at 50% 34%, rgba(56,189,248,.2) 0%, rgba(56,189,248,.07) 42%, rgba(56,189,248,0) 76%);
          filter: blur(56px);
          pointer-events: none;
          z-index: 0;
          animation: ambientDrift 9s ease-in-out infinite;
        }

        .hero-horizon-core {
          position: absolute;
          left: 50%;
          bottom: -700px;
          transform: translateX(-50%);
          width: min(1900px, 170vw);
          height: 1080px;
          border-radius: 50%;
          background: radial-gradient(ellipse at 50% 37%, rgba(123,243,255,.35) 0%, rgba(123,243,255,.15) 38%, rgba(123,243,255,0) 74%);
          filter: blur(24px);
          pointer-events: none;
          z-index: 2;
          animation: glowBreathe 6.6s ease-in-out infinite;
        }

        .hero-horizon-arc {
          position: absolute;
          left: 50%;
          bottom: -820px;
          transform: translateX(-50%);
          width: min(2700px, 235vw);
          height: 1500px;
          border-radius: 50%;
          border-top: 2.5px solid rgba(125,211,252,.98);
          pointer-events: none;
          z-index: 3;
          animation: arcPulse 6.8s ease-in-out infinite;
        }

        .hero-horizon-arc::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 8px;
          height: 100%;
          border-radius: 50%;
          border-top: 1px solid rgba(125,211,252,.45);
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.065) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.065) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(circle at 50% 40%, black, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black, transparent 85%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% -20%, rgba(255,255,255,.18), transparent 44%), linear-gradient(to bottom, rgba(255,255,255,.06), transparent 30%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div className="hero-horizon-ambient" />
      <div className="hero-horizon-glow" />
      <div className="hero-horizon-core" />
      <div className="hero-horizon-arc" />

      <div className="hero-wrap" style={{ position: 'relative', zIndex: 5 }}>
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            minHeight: 'calc(100vh - 70px)',
            padding: '96px 22px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              marginBottom: 26,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              padding: '8px 14px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,.14)',
              background: 'rgba(255,255,255,.03)',
              boxShadow: 'inset 0 0 0 1px rgba(56,189,248,.2)',
            }}
          >
            <span className="hero-dot" />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '.1em',
                color: 'rgba(191,245,255,.9)',
              }}
            >
              COHORT 14 CLOSING SOON
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            style={{
              margin: 0,
              fontWeight: 800,
              color: '#fff',
              fontSize: 'clamp(34px, 6.2vw, 84px)',
              lineHeight: 1.02,
              letterSpacing: '-0.045em',
              maxWidth: 980,
              fontFamily: "'Cinzel', serif",
            }}
          >
            Become the cybersecurity operator companies compete for.
          </motion.h1>

          <div
            style={{
              height: 'clamp(44px, 6vw, 84px)',
              overflow: 'hidden',
              marginTop: 14,
              marginBottom: 22,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={wordIndex}
                initial={{ y: '120%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-80%', opacity: 0, filter: 'blur(5px)' }}
                transition={{ duration: 0.46, ease: [0.75, 0, 0.25, 1] }}
                style={{
                color: '#7dd3fc',
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 5.2vw, 74px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.02,
                  textShadow: '0 0 34px rgba(56,189,248,.5)',
                }}
              >
                {HEADLINE_ROTATION[wordIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            style={{
              marginTop: 0,
              marginBottom: 34,
              maxWidth: 770,
              color: 'rgba(255,255,255,.82)',
              fontSize: 'clamp(16px, 2vw, 20px)',
              lineHeight: 1.65,
              letterSpacing: '-0.01em',
            }}
          >
            Train with active red-team experts, build production-grade labs, and graduate with the portfolio and
            certifications hiring managers trust. Enrollment is limited each cohort, and if you do not see measurable
            progress in 14 days, you get a full refund.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 22,
            }}
          >
            <Link
              href="/enroll"
              className="hero-btn-primary"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                borderRadius: 8,
                padding: '13px 22px',
                background: 'linear-gradient(120deg, #e0f2fe 0%, #7dd3fc 52%, #38bdf8 100%)',
                color: '#031319',
                border: '1px solid rgba(56,189,248,.5)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                boxShadow: '0 10px 28px rgba(0,0,0,.5), 0 0 0 1px rgba(191,232,255,.5) inset',
              }}
            >
              Enroll Now
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </Link>

            <Link
              href="/curriculum"
              className="hero-btn-secondary"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                borderRadius: 8,
                padding: '13px 22px',
                border: '1px solid rgba(56,189,248,.34)',
                color: 'rgba(224,242,254,.92)',
                background: 'rgba(56,189,248,.12)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                transition: 'all .2s ease',
              }}
            >
              Download Syllabus
              <Sparkles size={15} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38, duration: 0.45 }}
            style={{
              marginTop: -4,
              marginBottom: 20,
              fontSize: 12,
              letterSpacing: '.02em',
              color: 'rgba(186,230,253,.94)',
              textTransform: 'uppercase',
            }}
          >
            Next live batch starts in 5 days. Seats filling fast.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              marginBottom: 38,
            }}
          >
            {TRUST_POINTS.map((point) => (
              <span
                key={point}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  color: 'rgba(255,255,255,.7)',
                  fontSize: 13,
                  letterSpacing: '-0.01em',
                }}
              >
                <CheckCircle2 size={14} color="rgba(56,189,248,.95)" />
                {point}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
            style={{
              width: '100%',
              maxWidth: 920,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 10,
              marginBottom: 30,
            }}
          >
            {METRICS.map((item) => (
              <div
                key={item.label}
                style={{
                  border: '1px solid rgba(56,189,248,.34)',
                  background: 'linear-gradient(180deg, rgba(255,255,255,.05), rgba(56,189,248,.08))',
                  borderRadius: 12,
                  padding: '18px 14px',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.1), 0 6px 18px rgba(0,0,0,.24)',
                }}
              >
                <div
                  style={{
                    color: '#fff',
                    fontSize: 'clamp(22px, 2.2vw, 30px)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                  }}
                >
                  {item.value}
                </div>
                <div style={{ color: 'rgba(255,255,255,.72)', fontSize: 12, marginTop: 5 }}>{item.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.55 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 14px',
              borderRadius: 999,
              border: '1px solid rgba(56,189,248,.4)',
              background: 'rgba(56,189,248,.14)',
              color: 'rgba(224,242,254,.96)',
              fontSize: 13,
            }}
          >
            <ShieldCheck size={15} color="#38bdf8" />
            Trusted by engineers from Fortune 500 and high-growth startups
            <Star size={14} color="#7dd3fc" fill="#7dd3fc" />
          </motion.div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(56,189,248,.36)',
            borderBottom: '1px solid rgba(56,189,248,.36)',
            overflow: 'hidden',
            padding: '12px 0',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 110,
              background: 'linear-gradient(to right, #01040a, transparent)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 110,
              background: 'linear-gradient(to left, #01040a, transparent)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          <div className="hero-marquee">
            {[...CERTS, ...CERTS].map((cert, index) => (
              <span
                key={`${cert}-${index}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 14,
                  paddingRight: 28,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '.12em',
                  color: 'rgba(186,230,253,.58)',
                }}
              >
                {cert}
                <span style={{ color: 'rgba(186,230,253,.32)' }}>|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

