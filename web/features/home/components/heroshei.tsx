'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Star, Zap } from 'lucide-react';
import Link from 'next/link';

/* ── data ──────────────────────────────────────────────────── */
const WORDS = [
  'Penetration Testing',
  'Threat Intelligence',
  'Cloud Security',
  'AI Security Ops',
  'Red Team Execution',
];

const TRUST = [
  'No credit card required',
  '14-day money-back guarantee',
  'Live mentor support',
];

const METRICS = [
  { value: '15K+', label: 'Trained' },
  { value: '98%',  label: 'Placed'  },
  { value: '$120K',label: 'Avg. Salary' },
  { value: '4.9★', label: 'Rating'  },
];

const CERTS = ['CEH','CISSP','OSCP','Security+','CISM','CCSP','GPEN','GCIH','CISA','CASP+'];

/* ── wave path ─────────────────────────────────────────────── */
// Diagonal slashes \\\ on the right half — decorative SVG wave
function RightWave() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '52%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* The wave shape that clips the right panel */}
      <svg
        viewBox="0 0 600 900"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(56,189,248,0.18)" />
            <stop offset="50%"  stopColor="rgba(56,189,248,0.08)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.12)" />
          </linearGradient>
          <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(125,211,252,0.9)" />
            <stop offset="60%"  stopColor="rgba(125,211,252,0.4)" />
            <stop offset="100%" stopColor="rgba(125,211,252,0.05)" />
          </linearGradient>
        </defs>

        {/* filled wave background */}
        <path
          d="M 160,0 Q 80,180 140,360 Q 200,540 100,720 Q 50,810 0,900 L 600,900 L 600,0 Z"
          fill="url(#waveGrad)"
        />
        {/* wave stroke line */}
        <path
          d="M 160,0 Q 80,180 140,360 Q 200,540 100,720 Q 50,810 0,900"
          fill="none"
          stroke="url(#strokeGrad)"
          strokeWidth="1.5"
        />
        {/* secondary softer wave */}
        <path
          d="M 220,0 Q 140,200 200,400 Q 260,580 170,760 Q 120,840 80,900"
          fill="none"
          stroke="rgba(125,211,252,0.18)"
          strokeWidth="1"
        />
      </svg>

      {/* diagonal slash lines \\\ */}
      <svg
        viewBox="0 0 600 900"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* repeating diagonal strokes like \\\ */}
        {Array.from({ length: 18 }).map((_, i) => {
          const x = 80 + i * 38;
          return (
            <line
              key={i}
              x1={x}       y1={0}
              x2={x - 120} y2={900}
              stroke="rgba(125,211,252,0.6)"
              strokeWidth="0.8"
            />
          );
        })}
      </svg>

      {/* glow orbs */}
      <div style={{
        position: 'absolute', top: '15%', right: '18%',
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.22) 0%, transparent 70%)',
        filter: 'blur(32px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '8%',
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
        filter: 'blur(28px)',
      }} />

      {/* floating card 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{
          position: 'absolute',
          top: '22%',
          right: '12%',
          padding: '14px 18px',
          borderRadius: 14,
          border: '1px solid rgba(125,211,252,0.3)',
          background: 'rgba(1,10,30,0.75)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
          animation: 'floatA 7s ease-in-out infinite',
          minWidth: 160,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <ShieldCheck size={14} color="#38bdf8" />
          <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(186,230,253,0.7)', textTransform: 'uppercase' }}>Live Lab</span>
        </div>
        <div style={{ color: '#f0f9ff', fontWeight: 700, fontSize: 13, lineHeight: 1.35 }}>
          Network Intrusion<br />Detection — Active
        </div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.9)', display: 'inline-block' }} />
          <span style={{ fontSize: 11, color: 'rgba(134,239,172,0.9)' }}>Session active</span>
        </div>
      </motion.div>

      {/* floating card 2 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        style={{
          position: 'absolute',
          top: '55%',
          right: '6%',
          padding: '12px 16px',
          borderRadius: 12,
          border: '1px solid rgba(125,211,252,0.2)',
          background: 'rgba(1,10,30,0.72)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
          animation: 'floatB 9s ease-in-out infinite',
          minWidth: 150,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Zap size={13} color="#a78bfa" />
          <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(196,181,253,0.7)', textTransform: 'uppercase' }}>Placement</span>
        </div>
        <div style={{ color: '#f5f3ff', fontWeight: 800, fontSize: 22, lineHeight: 1, letterSpacing: '-0.03em' }}>98%</div>
        <div style={{ color: 'rgba(196,181,253,0.7)', fontSize: 11, marginTop: 3 }}>Job placement rate</div>
      </motion.div>

      {/* floating card 3 — cert badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        style={{
          position: 'absolute',
          top: '38%',
          left: '4%',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '9px 14px',
          borderRadius: 999,
          border: '1px solid rgba(250,204,21,0.35)',
          background: 'rgba(1,10,30,0.75)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          animation: 'floatC 8s ease-in-out infinite 1s',
        }}
      >
        <Star size={13} color="#facc15" fill="#facc15" />
        <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(254,249,195,0.9)' }}>OSCP Certified</span>
      </motion.div>
    </div>
  );
}

/* ── marquee ───────────────────────────────────────────────── */
function CertMarquee() {
  const doubled = [...CERTS, ...CERTS];
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(56,189,248,0.22)', borderBottom: '1px solid rgba(56,189,248,0.22)', padding: '10px 0' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right,#01040a,transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left,#01040a,transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 26s linear infinite' }}>
        {doubled.map((c, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, paddingRight: 24, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(186,230,253,0.5)' }}>
            {c}
            <span style={{ color: 'rgba(186,230,253,0.22)' }}>|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── main ──────────────────────────────────────────────────── */
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setIdx(p => (p + 1) % WORDS.length), 3000);
    return () => clearInterval(t);
  }, []);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#01040a' }} />;

  return (
    <section style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden', background: '#01040a', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .hero-ff { font-family: 'Inter', sans-serif; }

        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes floatA {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0px) rotate(1deg); }
          50%      { transform: translateY(-8px) rotate(-1deg); }
        }
        @keyframes shimmer {
          from { transform: translateX(-120%); }
          to   { transform: translateX(120%); }
        }
        @keyframes pulseDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:.5; transform:scale(.65); }
        }

        /* ── responsive ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 70px);
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 24px 56px;
          gap: 0;
        }
        .hero-right-col {
          display: block;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            padding: 90px 20px 48px;
          }
          .hero-right-col {
            display: none;
          }
          .hero-wave-desktop {
            display: none !important;
          }
          /* mobile bottom wave strip */
          .hero-wave-mobile {
            display: block !important;
          }
        }
        @media (max-width: 480px) {
          .hero-grid {
            padding: 80px 16px 40px;
          }
        }
        .hero-wave-mobile { display: none; }

        .hero-btn-primary {
          position: relative;
          overflow: hidden;
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .hero-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,.22) 48%, transparent 68%);
          animation: shimmer 2.4s linear infinite;
        }
        .hero-btn-primary:hover { transform: translateY(-2px); }
      `}</style>

      {/* bg layers */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 50% at 20% -5%, rgba(56,189,248,0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 55%, rgba(99,102,241,0.1) 0%, transparent 55%)',
      }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 100% 60% at 30% 10%, black 20%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 100% 60% at 30% 10%, black 20%, transparent 75%)',
      }} />

      {/* right wave — desktop only */}
      <div className="hero-wave-desktop" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <RightWave />
      </div>

      {/* content grid */}
      <div className="hero-ff hero-grid" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content',
              padding: '7px 13px', borderRadius: 999,
              border: '1px solid rgba(56,189,248,0.35)',
              background: 'rgba(56,189,248,0.07)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.9)', animation: 'pulseDot 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(186,230,253,0.9)', textTransform: 'uppercase' }}>
              Cohort 14 · Closing Soon
            </span>
          </motion.div>

          {/* headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.07 }}
          >
            <h1 style={{ margin: 0, fontWeight: 900, fontSize: 'clamp(32px,5.2vw,70px)', lineHeight: 1.03, letterSpacing: '-0.045em', color: '#fff' }}>
              Become the<br />
              <span style={{ color: 'rgba(255,255,255,0.28)' }}>cybersecurity</span>
            </h1>
            {/* animated word */}
            <div style={{ height: 'clamp(40px,5.4vw,72px)', overflow: 'hidden', marginTop: 2 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ y: '110%', opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: 0,      opacity: 1, filter: 'blur(0px)' }}
                  exit={{   y: '-80%',  opacity: 0, filter: 'blur(5px)' }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  style={{
                    fontSize: 'clamp(32px,5vw,68px)',
                    fontWeight: 900,
                    letterSpacing: '-0.045em',
                    lineHeight: 1.03,
                    background: 'linear-gradient(110deg,#7dd3fc 0%,#38bdf8 50%,#818cf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {WORDS[idx]}
                </motion.div>
              </AnimatePresence>
            </div>
            <h1 style={{ margin: '2px 0 0', fontWeight: 900, fontSize: 'clamp(32px,5.2vw,70px)', lineHeight: 1.03, letterSpacing: '-0.045em', color: 'rgba(255,255,255,0.22)' }}>
              expert teams hire for.
            </h1>
          </motion.div>

          {/* sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ margin: 0, maxWidth: 480, color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(14px,1.6vw,17px)', lineHeight: 1.72, letterSpacing: '-0.01em' }}
          >
            Train with active red-team operators. Build production labs.
            Graduate with the certs and portfolio Fortune 500 teams compete for —
            or get a <span style={{ color: '#7dd3fc', fontWeight: 600 }}>full refund in 14 days</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
          >
            <Link
              href="/enroll"
              className="hero-btn-primary"
              style={{
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 24px', borderRadius: 10,
                background: '#fff',
                color: '#0a0f1e',
                fontWeight: 800, fontSize: 14,
                letterSpacing: '-0.02em',
                boxShadow: '0 8px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              Enroll Now
              <ArrowRight size={15} strokeWidth={2.6} />
            </Link>

            <Link
              href="/curriculum"
              style={{
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 24px', borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(8px)',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 600, fontSize: 14,
                letterSpacing: '-0.02em',
                transition: 'all .18s ease',
              }}
            >
              View Curriculum
              <Sparkles size={14} color="#7dd3fc" />
            </Link>
          </motion.div>

          {/* urgency */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ margin: 0, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(186,230,253,0.65)', fontWeight: 600 }}
          >
            Next live batch starts in 5 days · Seats filling fast
          </motion.p>

          {/* trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.46 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}
          >
            {TRUST.map(t => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.52)' }}>
                <CheckCircle2 size={13} color="rgba(56,189,248,0.85)" />
                {t}
              </span>
            ))}
          </motion.div>

          {/* stats row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}
          >
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.58 + i * 0.06 }}
                style={{
                  padding: '11px 16px', borderRadius: 10,
                  border: '1px solid rgba(56,189,248,0.2)',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(8px)',
                  minWidth: 80,
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 'clamp(17px,2vw,24px)', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.42)', marginTop: 3 }}>{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN placeholder (wave cards overlap this area) ── */}
        <div className="hero-right-col" style={{ height: '100%' }} />
      </div>

      {/* mobile: small stats strip instead of wave */}
      <div className="hero-wave-mobile" style={{ position: 'relative', zIndex: 2, padding: '0 20px 24px' }}>
        <div style={{
          borderRadius: 14, border: '1px solid rgba(56,189,248,0.25)',
          background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)',
          padding: '16px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 12,
        }}>
          {METRICS.map(m => (
            <div key={m.label} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 22, color: '#fff', letterSpacing: '-0.03em' }}>{m.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* cert marquee */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <CertMarquee />
      </div>
    </section>
  );
}
