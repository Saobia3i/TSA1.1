'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from "@/lib/ThemeContext";

/* ── data ─────────────────────────────────────────────────── */
const HERO_SLIDES = [
  'Forge your future in Cybersecurity, AI and Web3',
  'Become Indispensable in the Future of Tech',
  'Live Guidance from Industry Experts',
  'Your Path from Learning to Leading',
  'Join the Next Generation of Tech Leaders.',
  'Build More Than a Career',
];

const SLIDE_INTERVAL = 4000;

const TRUST = [
  '1-on-1 mentorship',
  'Certification support',
  'Live mentor support',
  'Career guidance',
];

const CERTS = ['CEH','CISSP','OSCP','Security+','CISM','CCSP','GPEN','GCIH','CISA','CASP+'];

/* ── stripe config ───────────────────────────────────────── */
const STRIPES = 18;
const GLOW_ON      = 0.35;
const GLOW_FADE    = 0.25;
const SERIAL_GAP   = 0.45;
const TOTAL_CYCLE  = STRIPES * SERIAL_GAP + 1.2;
const STRIPE_COLORS = ['#7dd3fc','#a78bfa','#38bdf8','#c084fc','#7dd3fc','#818cf8','#38bdf8','#a78bfa','#7dd3fc','#c084fc','#38bdf8','#a78bfa','#818cf8','#7dd3fc'];

/* ── CountUp component ───────────────────────────────────── */
function CountUp5() {
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
        setTimeout(() => { current = 1; paused = false; setCount(current); }, 1200);
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
        fontSize: '26px',
        fontWeight: 900,
        color: '#f97316',
        letterSpacing: '-0.02em',
        lineHeight: 1,
        textShadow: '0px 0px 20px rgba(249,115,22,0.8)',
        willChange: 'transform'
      }}
    >
      {count}+
    </motion.span>
  );
}

/* ── USFlag ──────────────────────────────────────────────── */
function USFlagIcon({ size = 80 }: { size?: number }) {
  return (
    <Image
      src={`https://ik.imagekit.io/7yw4jtfbt/TSA/FLAG.png?tr=w-${size * 2},h-${size * 2},q-85,f-webp`}
      alt="United States Flag"
      width={size}
      height={size}
      loading="lazy"
      style={{ objectFit: 'cover', borderRadius: '50%' }}
    />
  );
}

/* ── TOP FEATURES (from Feature.tsx) ─────────────────────── */
/* ── BOTTOM FEATURES (from Feature.tsx) ──────────────────── */
const BOTTOM_FEATURES = [
  {
    icon: (
      <div style={{
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        background: 'rgba(249,115,22,0.15)',
        border: '2px solid rgba(249,115,22,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 20px rgba(249,115,22,0.3)'
      }}>
        <CountUp5 />
      </div>
    ),
    color: '#f97316',
    text: 'Countries Projected Expansion by 2026',
  },
  {
    icon: (
      <div style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'rgba(34,197,94,0.15)',
        border: '2px solid rgba(34,197,94,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 22px rgba(34,197,94,0.3)',
        overflow: 'hidden'
      }}>
        <USFlagIcon size={46} />
      </div>
    ),
    color: '#22c55e',
    text: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', userSelect: 'text' }}>
        <span style={{ userSelect: 'text' }}>Current Operations (USA)</span>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: '#22c55e', userSelect: 'text' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.9)', display: 'inline-block', animation: 'pulseDot 2s ease-in-out infinite', userSelect: 'none' }} />
          <span style={{ userSelect: 'text' }}>Active</span>
        </div>
      </div>
    ),
  },
];

/* ── Feature Card (for right wave) ───────────────────────── */
function FloatingFeatureCard({ icon, text, color, top, right, delay, horizontal = false, width, className }: { icon: React.ReactNode; text: React.ReactNode; color: string; top: string; right: string; delay: number; horizontal?: boolean; width?: string; className?: string }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const positionVars = {
    ['--card-top' as any]: top,
    ['--card-right' as any]: right,
  } as React.CSSProperties;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{
        ...positionVars,
        position: 'absolute',
        top: 'var(--card-top)',
        right: 'var(--card-right)',
        padding: horizontal ? '12px 16px' : '14px 18px',
        borderRadius: '12px',
        minWidth: width || (horizontal ? '170px' : '160px'),
        maxWidth: width || (horizontal ? '190px' : '180px'),
        border: `1px solid ${color}40`,
        background: isLight ? 'rgba(248,250,252,0.92)' : 'rgba(2,8,24,0.88)',
        backdropFilter: 'blur(16px)',
        boxShadow: isLight
          ? '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(0,0,0,0.05)'
          : '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
        animation: `floatB 9s ease-in-out infinite ${delay * 0.5}s`,
        pointerEvents: 'auto',
        userSelect: 'text',
        cursor: 'text',
      }}
    >
      <div style={{ display: 'flex', flexDirection: horizontal ? 'row' : 'column', alignItems: 'center', gap: horizontal ? '12px' : '10px' }}>
        <div style={{ flexShrink: 0, userSelect: 'none' }}>
          {icon}
        </div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: isLight ? '#13343b' : '#fff', lineHeight: 1.4, textAlign: horizontal ? 'left' : 'center', userSelect: 'text' }}>
          {text}
        </div>
      </div>
    </motion.div>
  );
}

/* ── right wave + cards ──────────────────────────────────── */
function RightWave() {
  const TOP_X    = 480;
  const BOT_X    = 880;
  const DX       = BOT_X - TOP_X;
  const STRIPE_START = 500;
  const STRIPE_STEP  = 28;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1 }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <svg viewBox="0 0 1000 900" preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="rgba(56,189,248,0.14)" />
              <stop offset="50%"  stopColor="rgba(56,189,248,0.06)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0.10)" />
            </linearGradient>
            <linearGradient id="sg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="rgba(125,211,252,0.95)" />
              <stop offset="55%"  stopColor="rgba(125,211,252,0.38)" />
              <stop offset="100%" stopColor="rgba(125,211,252,0.04)" />
            </linearGradient>
          </defs>
          <path d={`M ${TOP_X},0 L ${BOT_X},900 L 1000,900 L 1000,0 Z`} fill="url(#wg)" />
          <path d={`M ${TOP_X},0 L ${BOT_X},900`} fill="none" stroke="url(#sg)" strokeWidth="3"
            style={{ filter: 'drop-shadow(0 0 8px rgba(125,211,252,0.8)) drop-shadow(0 0 20px rgba(125,211,252,0.4))' }} />
          <path d={`M ${TOP_X - 50},0 L ${BOT_X - 50},900`} fill="none" stroke="rgba(125,211,252,0.13)" strokeWidth="1.1" />
          <path d={`M ${TOP_X - 100},0 L ${BOT_X - 100},900`} fill="none" stroke="rgba(125,211,252,0.06)" strokeWidth="0.7" />
        </svg>

        <svg viewBox="0 0 1000 900" preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {Array.from({ length: STRIPES }).map((_, i) => {
            const x1 = STRIPE_START + i * STRIPE_STEP;
            const x2 = x1 + DX;
            return <line key={i} x1={x1} y1={0} x2={x2} y2={900} stroke="rgba(125,211,252,0.09)" strokeWidth="1.4" />;
          })}
        </svg>

        <svg viewBox="0 0 1000 900" preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            {Array.from({ length: STRIPES }).map((_, i) => {
              const color = STRIPE_COLORS[i % STRIPE_COLORS.length];
              const delay = i * SERIAL_GAP;
              return (
                <style key={i}>{`
                  @keyframes stripe${i} {
                    0%,${Math.round((delay/TOTAL_CYCLE)*100)}% { opacity:0 }
                    ${Math.round(((delay+GLOW_ON)/TOTAL_CYCLE)*100)}% { opacity:1 }
                    ${Math.round(((delay+GLOW_ON+GLOW_FADE)/TOTAL_CYCLE)*100)}%,100% { opacity:0 }
                  }
                  .stripe-${i} { animation: stripe${i} ${TOTAL_CYCLE}s ease-in-out infinite; will-change: opacity; filter: drop-shadow(0 0 6px ${color}); }
                `}</style>
              );
            })}
          </defs>
          {Array.from({ length: STRIPES }).map((_, i) => {
            const x1 = STRIPE_START + i * STRIPE_STEP;
            const x2 = x1 + DX;
            const color = STRIPE_COLORS[i % STRIPE_COLORS.length];
            const sw = i % 3 === 0 ? 2.8 : i % 3 === 1 ? 2.1 : 1.6;
            return (
              <line key={i}
                x1={x1} y1={0} x2={x2} y2={900}
                stroke={color} strokeWidth={sw} strokeLinecap="round"
                className={`stripe-${i}`}
                style={{ opacity: 0 }}
              />
            );
          })}
        </svg>

        <div style={{ position: 'absolute', top: '10%', right: '8%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,189,248,0.18) 0%,transparent 70%)', filter: 'blur(40px)', animation: 'floatD 9s ease-in-out infinite', willChange: 'transform' }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '4%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.16) 0%,transparent 70%)', filter: 'blur(32px)', animation: 'floatB 11s ease-in-out infinite 1.5s', willChange: 'transform' }} />
      </div>

      {/* Feature Cards in Zigzag Pattern */}
      <FloatingFeatureCard className="ff-card usa-card" icon={BOTTOM_FEATURES[1].icon} text={BOTTOM_FEATURES[1].text} color={BOTTOM_FEATURES[1].color} top="36%" right="8%" delay={0.8} />
      <FloatingFeatureCard className="ff-card expansion-card" icon={BOTTOM_FEATURES[0].icon} text={BOTTOM_FEATURES[0].text} color={BOTTOM_FEATURES[0].color} top="72%" right="2%" delay={1.2} horizontal width="220px" />
    </div>
  );
}



/* ── cert marquee ─────────────────────────────────────────── */
function CertMarquee() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const doubled = [...CERTS, ...CERTS];
  return (
    <div style={{ position:'relative', overflow:'hidden', borderTop:'1px solid rgba(56,189,248,0.18)', borderBottom:'1px solid rgba(56,189,248,0.18)', padding:'10px 0' }}>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:72, background:`linear-gradient(to right,${isLight ? '#fcfcf9' : '#01040a'},transparent)`, zIndex:2, pointerEvents:'none' }} />
      <div style={{ position:'absolute', right:0, top:0, bottom:0, width:72, background:`linear-gradient(to left,${isLight ? '#fcfcf9' : '#01040a'},transparent)`, zIndex:2, pointerEvents:'none' }} />
      <div style={{ display:'flex', width:'max-content', animation:'marquee 28s linear infinite' }}>
        {doubled.map((c,i) => (
          <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:12, paddingRight:24, fontFamily:'monospace', fontSize:11, letterSpacing:'0.14em', color: isLight ? 'rgba(19,52,59,0.5)' : 'rgba(186,230,253,0.45)' }}>
            {c}
            <span style={{ color: isLight ? 'rgba(19,52,59,0.2)' : 'rgba(186,230,253,0.2)' }}>|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── main ─────────────────────────────────────────────────── */
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <section style={{ position:'relative', minHeight:'100vh', width:'100%', overflow:'hidden', background: isLight ? '#fcfcf9' : '#01040a', color: isLight ? '#13343b' : '#fff', display:'flex', flexDirection:'column' }}>
      <style>{`
        .hff { font-family:'Inter',system-ui,sans-serif; }

        @keyframes marquee  { from{transform:translateX(0)}  to{transform:translateX(-50%)} }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.6)} }
        @keyframes shimmer  { from{transform:translateX(-120%)} to{transform:translateX(120%)} }
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-11px) rotate(1deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-8px) rotate(-1deg)} }
        @keyframes floatD { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes floatE { 0%,100%{transform:translateY(0) rotate(.5deg)} 50%{transform:translateY(-12px) rotate(-.5deg)} }

        .h-grid {
          display:grid;
          grid-template-columns:1fr 1fr;
          min-height:calc(100vh - 70px);
          align-items:center;
          max-width:1200px;
          margin:0 auto;
          padding:100px 28px 56px;
        }
        .h-right-col  { display:block; }
        .h-wave-desk  { display:block; }
        .h-wave-mob   { display:none; }
        .h-left-col { display:flex; flex-direction:column; gap:32px; }
        .ff-card { --card-top: 0%; --card-right: 0%; }

        @media(max-width:1100px) {
          .h-grid { grid-template-columns:1.08fr 0.92fr; padding:92px 22px 44px; column-gap:24px; }
        }
        @media(max-width:1024px) and (min-width:769px) {
          .ff-card.usa-card { --card-top: 30%; --card-right: 8%; }
          .ff-card.expansion-card { --card-top: 68%; --card-right: 10%; }
        }

        @media(max-width:768px) {
          .h-grid { grid-template-columns:1fr; padding:88px 20px 36px; }
          .h-right-col { display:none !important; }
          .h-wave-desk { display:none !important; }
          .h-wave-mob  { display:block !important; }
          .h-left-col { gap:16px !important; }
          .ff-card { display:none !important; }
        }
        @media(max-width:480px) { .h-grid { padding:80px 16px 28px; } }

        .h-btn-p { position:relative; overflow:hidden; transition:transform .18s ease, box-shadow .18s ease; }
        .h-btn-p::after { content:''; position:absolute; inset:0;
          background:linear-gradient(110deg,transparent 25%,rgba(255,255,255,.22) 48%,transparent 68%);
          animation:shimmer 2.4s linear infinite; }
        .h-btn-p:hover { transform:translateY(-2px); }
        .h-btn-s:hover { border-color:rgba(255,255,255,.22)!important; background:rgba(255,255,255,.08)!important; }
      `}</style>

      {/* bg radial + grid */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, background:'radial-gradient(ellipse 80% 50% at 20% -5%,rgba(56,189,248,0.13) 0%,transparent 60%), radial-gradient(ellipse 50% 40% at 85% 55%,rgba(99,102,241,0.09) 0%,transparent 55%)' }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize:'52px 52px', maskImage:'radial-gradient(ellipse 100% 60% at 30% 10%,black 20%,transparent 75%)', WebkitMaskImage:'radial-gradient(ellipse 100% 60% at 30% 10%,black 20%,transparent 75%)' }} />

      {/* desktop wave */}
      <div className="h-wave-desk" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }}>
        <RightWave />
      </div>
      {/* mobile wave */}
      <div className="h-wave-mob" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }}>
        <RightWave />
      </div>

      {/* content */}
      <div className="hff h-grid" style={{ position:'relative', zIndex:2 }}>

        {/* ── LEFT ── */}
        <div className="h-left-col">

          {/* badge */}
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }}
            style={{ display:'inline-flex', alignItems:'center', gap:8, width:'fit-content', padding:'7px 13px', borderRadius:999, border:'1px solid rgba(56,189,248,0.32)', background:'rgba(56,189,248,0.07)', backdropFilter:'blur(8px)' }}
          >
            <span style={{ fontFamily:'monospace', fontSize:11, letterSpacing:'0.14em', color: isLight ? 'rgba(19,52,59,0.88)' : 'rgba(186,230,253,0.88)', textTransform:'uppercase' }}>
              A Globally Trusted Edtech
            </span>
          </motion.div>

          {/* headline - Hero Slides (no layout shift) */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.07 }}>
            <div
              style={{
                width: '100%',
                position: 'relative',
                minHeight: 'clamp(170px, 26vw, 300px)',
                display: 'block',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    margin: 0,
                    fontWeight: 900,
                    fontSize: 'clamp(30px, 5.2vw, 70px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.045em',
                    color: isLight ? '#13343b' : '#fff',
                    textAlign: 'left',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    willChange: 'transform, opacity',
                  }}
                >
                  {HERO_SLIDES[currentSlide]}
                </motion.h1>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.3 }}
            style={{ display:'flex', flexWrap:'wrap', gap:10 }}
          >
            <Link href="/courses" className="h-btn-p"
              style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8, padding:'13px 24px', borderRadius:10, background: isLight ? '#13343b' : '#fff', color: isLight ? '#ffffff' : '#0a0f1e', fontWeight:800, fontSize:14, letterSpacing:'-0.02em', boxShadow:'0 8px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)' }}
            >
              Enroll Now <ArrowRight size={15} strokeWidth={2.6} />
            </Link>
            <Link href="/services" className="h-btn-s"
              style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8, padding:'13px 24px', borderRadius:10, border: isLight ? '1px solid rgba(19,52,59,0.2)' : '1px solid rgba(255,255,255,0.13)', background: isLight ? 'rgba(19,52,59,0.05)' : 'rgba(255,255,255,0.04)', backdropFilter:'blur(8px)', color: isLight ? 'rgba(19,52,59,0.78)' : 'rgba(255,255,255,0.78)', fontWeight:600, fontSize:14, letterSpacing:'-0.02em', transition:'all .18s ease' }}
            >
              Our Services <Sparkles size={14} color="#7dd3fc" />
            </Link>
          </motion.div>

          {/* urgency */}
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
            style={{ margin:0, fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color: isLight ? 'rgba(19,52,59,0.5)' : 'rgba(186,230,253,0.6)', fontWeight:600 }}
          >
            Next live batch starts in 5 days · Seats filling fast
          </motion.p>

          {/* trust */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.46 }}
            style={{ display:'flex', flexWrap:'wrap', gap:14 }}
          >
            {TRUST.map(t => (
              <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12, color: isLight ? 'rgba(19,52,59,0.6)' : 'rgba(255,255,255,0.48)' }}>
                <CheckCircle2 size={13} color="rgba(56,189,248,0.8)" />
                {t}
              </span>
            ))}
          </motion.div>

        </div>

        {/* right col placeholder */}
        <div className="h-right-col" />
      </div>



      {/* marquee */}
      <div style={{ position:'relative', zIndex:2 }}>
        <CertMarquee />
      </div>
    </section>
  );
}
