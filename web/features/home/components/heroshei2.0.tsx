'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Star,
  Zap, TrendingUp, BookOpen, Users,
} from 'lucide-react';
import Link from 'next/link';

/* ── data ─────────────────────────────────────────────────── */
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
  { value: '15K+', label: 'Trained'     },
  { value: '98%',  label: 'Placed'      },
  { value: '$120K',label: 'Avg. Salary' },
  { value: '4.9★', label: 'Rating'      },
];

const CERTS = ['CEH','CISSP','OSCP','Security+','CISM','CCSP','GPEN','GCIH','CISA','CASP+'];

/* ── stripe config ───────────────────────────────────────── */
// 8 stripes, serial synchronized glow top→bottom
const STRIPES = 14;
// Faster serial glow — each stripe flashes bright then dims quickly
const GLOW_ON      = 0.35;  // bright duration
const GLOW_FADE    = 0.25;  // fade-out
const SERIAL_GAP   = 0.45;  // time between each stripe start
const TOTAL_CYCLE  = STRIPES * SERIAL_GAP + 1.2; // full cycle
const STRIPE_COLORS = ['#7dd3fc','#a78bfa','#38bdf8','#c084fc','#7dd3fc','#818cf8','#38bdf8','#a78bfa','#7dd3fc','#c084fc','#38bdf8','#a78bfa','#818cf8','#7dd3fc'];

/* ── right wave + cards ──────────────────────────────────── */
function RightWave() {
  /*
    Full-screen viewBox 1000×900.
    Wave boundary = diagonal line tilted like \  (top-left to bottom-right)
    but positioned in the RIGHT HALF of the screen:
      top-left of right half  = x=500 at y=0
      bottom-right            = x=900 at y=900
    So the wave fills the right side, leaning diagonally.
    Stripes: ONLY to the RIGHT of the boundary line (x > boundary).
    DX = 900-500 = +400 (leans right going down = \ tilt)
  */
  const TOP_X    = 480;   // wave boundary at top of screen
  const BOT_X    = 880;   // wave boundary at bottom of screen
  const DX       = BOT_X - TOP_X;  // +400
  const LINE_LEN = Math.sqrt(DX * DX + 900 * 900); // ~997

  // Stripes start just right of the boundary, going to right edge (1000)
  // At top: boundary=480, stripes from 500 to 960
  // At bottom: boundary=880, stripes from 900 to 1000 (clipped by overflow)
  const STRIPE_START = 500;
  const STRIPE_STEP  = 32;

  return (
    // Full screen — wave SVG covers entire viewport
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none', zIndex: 1,
    }}>

      {/* ── Wave fill + boundary + stripes (overflow hidden keeps SVG inside) ── */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
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

          {/*
            Wave: diagonal \ shape in RIGHT half
            top x=480 → bottom x=880, fill everything to the RIGHT
          */}
          <path
            d={`M ${TOP_X},0 L ${BOT_X},900 L 1000,900 L 1000,0 Z`}
            fill="url(#wg)"
          />
          {/* primary boundary line */}
          <path
            d={`M ${TOP_X},0 L ${BOT_X},900`}
            fill="none" stroke="url(#sg)" strokeWidth="3"
            style={{ filter:'drop-shadow(0 0 8px rgba(125,211,252,0.8)) drop-shadow(0 0 20px rgba(125,211,252,0.4))' }}
          />
          {/* echo 1 — 50px LEFT of boundary (into the dark side) */}
          <path
            d={`M ${TOP_X - 50},0 L ${BOT_X - 50},900`}
            fill="none" stroke="rgba(125,211,252,0.13)" strokeWidth="1.1"
          />
          {/* echo 2 — 100px LEFT */}
          <path
            d={`M ${TOP_X - 100},0 L ${BOT_X - 100},900`}
            fill="none" stroke="rgba(125,211,252,0.06)" strokeWidth="0.7"
          />
        </svg>

        {/* ── Dim base stripes — RIGHT of wave boundary only ── */}
        <svg viewBox="0 0 1000 900" preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {Array.from({ length: STRIPES }).map((_, i) => {
            const x1 = STRIPE_START + i * STRIPE_STEP;
            const x2 = x1 + DX;
            return (
              <line key={i}
                x1={x1} y1={0} x2={x2} y2={900}
                stroke="rgba(125,211,252,0.07)" strokeWidth="0.9"
              />
            );
          })}
        </svg>

        {/* ── Serial glow — one stripe lights up then dims, next fires ── */}
        <svg viewBox="0 0 1000 900" preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {Array.from({ length: STRIPES }).map((_, i) => {
            const x1 = STRIPE_START + i * STRIPE_STEP;
            const x2 = x1 + DX;
            const color = STRIPE_COLORS[i % STRIPE_COLORS.length];
            const sw = i % 3 === 0 ? 2.2 : i % 3 === 1 ? 1.6 : 1.2;
            // Keyframe: 0 opacity → spike to 1 (glow on) → back to 0 (fade) → stay 0 until cycle repeats
            // The spike occupies GLOW_ON+GLOW_FADE out of TOTAL_CYCLE seconds
            const onPct  = Math.round((GLOW_ON / TOTAL_CYCLE) * 100);
            const offPct = Math.round(((GLOW_ON + GLOW_FADE) / TOTAL_CYCLE) * 100);
            return (
              <motion.line key={i}
                x1={x1} y1={0} x2={x2} y2={900}
                stroke={color}
                strokeWidth={sw}
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 0, 0] }}
                transition={{
                  duration: TOTAL_CYCLE,
                  delay: i * SERIAL_GAP,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.01, onPct / 100, offPct / 100, 1],
                }}
                style={{
                  filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 22px ${color}cc) drop-shadow(0 0 40px ${color}55)`,
                }}
              />
            );
          })}
        </svg>

        {/* ── Glow orbs — right side ── */}
        <div style={{
          position: 'absolute', top: '10%', right: '8%',
          width: 260, height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(56,189,248,0.18) 0%,transparent 70%)',
          filter: 'blur(40px)', animation: 'floatD 9s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', right: '4%',
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(99,102,241,0.16) 0%,transparent 70%)',
          filter: 'blur(32px)', animation: 'floatB 11s ease-in-out infinite 1.5s',
        }} />
      </div>

      {/*
        ── 5 floating cards — outside overflow:hidden so they won't clip ──
        ZIG = right:4%   ZAG = right:34%
        Vertical: 7% → 22% → 38% → 54% → 70%
      */}

      {/* Card 1 — Live Lab — ZIG top:7% */}
      <motion.div
        initial={{ opacity:0, x:40, scale:0.94 }}
        animate={{ opacity:1, x:0,  scale:1 }}
        transition={{ delay:0.4, duration:0.6, ease:[0.22,1,0.36,1] }}
        style={{
          position:'absolute', top:'16%', right:'4%',
          padding:'14px 18px', borderRadius:14, minWidth:182,
          border:'1px solid rgba(125,211,252,0.28)',
          background:'rgba(2,8,24,0.88)', backdropFilter:'blur(16px)',
          boxShadow:'0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
          animation:'floatA 7s ease-in-out infinite',
        }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
          <ShieldCheck size={14} color="#38bdf8" />
          <span style={{ fontFamily:'monospace', fontSize:10, letterSpacing:'0.13em', color:'rgba(186,230,253,0.65)', textTransform:'uppercase' }}>Live Lab</span>
        </div>
        <div style={{ color:'#f0f9ff', fontWeight:700, fontSize:13, lineHeight:1.4 }}>
          Network Intrusion<br />Detection — Active
        </div>
        <div style={{ marginTop:9, height:4, borderRadius:999, background:'rgba(255,255,255,0.08)', overflow:'hidden' }}>
          <motion.div initial={{ width:'0%' }} animate={{ width:'72%' }}
            transition={{ delay:1.0, duration:1.4, ease:'easeOut' }}
            style={{ height:'100%', borderRadius:999, background:'linear-gradient(90deg,#38bdf8,#818cf8)' }}
          />
        </div>
        <div style={{ marginTop:6, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:11, color:'rgba(134,239,172,0.9)', display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80',
              boxShadow:'0 0 8px rgba(74,222,128,0.9)', display:'inline-block',
              animation:'pulseDot 2s ease-in-out infinite' }} />
            Session active
          </span>
          <span style={{ fontFamily:'monospace', fontSize:10, color:'rgba(186,230,253,0.45)' }}>72%</span>
        </div>
      </motion.div>

      {/* Card 2 — Students online — ZAG top:22% */}
      <motion.div
        initial={{ opacity:0, x:40 }}
        animate={{ opacity:1, x:0 }}
        transition={{ delay:0.6, duration:0.55, ease:[0.22,1,0.36,1] }}
        style={{
          position:'absolute', top:'28%', right:'22%',
          display:'flex', alignItems:'center', gap:10,
          padding:'12px 16px', borderRadius:12,
          border:'1px solid rgba(74,222,128,0.28)',
          background:'rgba(2,8,24,0.88)', backdropFilter:'blur(14px)',
          boxShadow:'0 4px 24px rgba(0,0,0,0.5)',
          animation:'floatD 10s ease-in-out infinite 0.5s',
        }}
      >
        <div style={{ width:36, height:36, borderRadius:'50%',
          background:'rgba(74,222,128,0.14)',
          display:'flex', alignItems:'center', justifyContent:'center',
          border:'1px solid rgba(74,222,128,0.3)', flexShrink:0,
        }}>
          <Users size={15} color="#4ade80" />
        </div>
        <div>
          <div style={{ color:'#fff', fontWeight:800, fontSize:16, letterSpacing:'-0.02em', lineHeight:1 }}>
            247 <span style={{ fontSize:10, fontWeight:500, color:'rgba(134,239,172,0.8)' }}>online</span>
          </div>
          <div style={{ fontSize:10, color:'rgba(255,255,255,0.42)', marginTop:3 }}>Students in labs now</div>
        </div>
      </motion.div>

      {/* Card 3 — OSCP badge — ZIG top:38% */}
      <motion.div
        initial={{ opacity:0, x:40, scale:0.9 }}
        animate={{ opacity:1, x:0,  scale:1 }}
        transition={{ delay:0.8, duration:0.5, ease:[0.22,1,0.36,1] }}
        style={{
          position:'absolute', top:'38%', right:'4%',
          display:'flex', alignItems:'center', gap:9,
          padding:'10px 18px', borderRadius:999,
          border:'1px solid rgba(250,204,21,0.38)',
          background:'rgba(2,8,24,0.88)', backdropFilter:'blur(12px)',
          boxShadow:'0 4px 20px rgba(0,0,0,0.5), 0 0 24px rgba(250,204,21,0.07)',
          animation:'floatC 8s ease-in-out infinite 1s',
        }}
      >
        <Star size={14} color="#facc15" fill="#facc15" />
        <span style={{ fontSize:12, fontWeight:700, color:'rgba(254,249,195,0.92)' }}>OSCP Certified</span>
      </motion.div>

      {/* Card 4 — Placement — ZAG top:53% */}
      <motion.div
        initial={{ opacity:0, x:40, scale:0.94 }}
        animate={{ opacity:1, x:0,  scale:1 }}
        transition={{ delay:1.0, duration:0.6, ease:[0.22,1,0.36,1] }}
        style={{
          position:'absolute', top:'53%', right:'20%',
          padding:'14px 18px', borderRadius:14, minWidth:162,
          border:'1px solid rgba(167,139,250,0.28)',
          background:'rgba(2,8,24,0.88)', backdropFilter:'blur(16px)',
          boxShadow:'0 8px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
          animation:'floatB 9s ease-in-out infinite',
        }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:6 }}>
          <Zap size={13} color="#a78bfa" />
          <span style={{ fontFamily:'monospace', fontSize:10, letterSpacing:'0.13em', color:'rgba(196,181,253,0.65)', textTransform:'uppercase' }}>Placement</span>
        </div>
        <div style={{ color:'#f5f3ff', fontWeight:900, fontSize:30, lineHeight:1, letterSpacing:'-0.04em' }}>98%</div>
        <div style={{ color:'rgba(196,181,253,0.65)', fontSize:11, marginTop:4 }}>Job placement rate</div>
        <div style={{ marginTop:10, display:'flex', gap:3 }}>
          {[1,1,1,1,0.3].map((o,i) => (
            <div key={i} style={{ flex:1, height:3, borderRadius:999, background:`rgba(167,139,250,${o})` }} />
          ))}
        </div>
      </motion.div>

      {/* Card 5 — Module Progress — ZIG top:69% */}
      <motion.div
        initial={{ opacity:0, x:40 }}
        animate={{ opacity:1, x:0 }}
        transition={{ delay:1.2, duration:0.55, ease:[0.22,1,0.36,1] }}
        style={{
          position:'absolute', top:'69%', right:'4%',
          padding:'16px 20px', borderRadius:16, minWidth:214,
          border:'1px solid rgba(56,189,248,0.24)',
          background:'rgba(2,8,24,0.89)', backdropFilter:'blur(16px)',
          boxShadow:'0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
          animation:'floatE 11s ease-in-out infinite 2s',
        }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
          <BookOpen size={14} color="#38bdf8" />
          <span style={{ fontFamily:'monospace', fontSize:10, letterSpacing:'0.13em', color:'rgba(186,230,253,0.65)', textTransform:'uppercase' }}>Module Progress</span>
        </div>
        {[
          { label:'Web App Hacking',  pct:100, color:'#4ade80' },
          { label:'Network Recon',    pct:78,  color:'#38bdf8' },
          { label:'Privilege Escal.', pct:45,  color:'#a78bfa' },
        ].map(row => (
          <div key={row.label} style={{ marginBottom:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
              <span style={{ fontSize:11, color:'rgba(255,255,255,0.58)' }}>{row.label}</span>
              <span style={{ fontFamily:'monospace', fontSize:11, fontWeight:700, color:row.color }}>{row.pct}%</span>
            </div>
            <div style={{ height:4, borderRadius:999, background:'rgba(255,255,255,0.08)' }}>
              <motion.div initial={{ width:'0%' }} animate={{ width:`${row.pct}%` }}
                transition={{ delay:1.5, duration:1.3, ease:'easeOut' }}
                style={{ height:'100%', borderRadius:999, background:row.color,
                  opacity:0.88, boxShadow:`0 0 8px ${row.color}80` }}
              />
            </div>
          </div>
        ))}
        <div style={{ marginTop:8, paddingTop:8, borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', gap:6 }}>
          <TrendingUp size={12} color="#4ade80" />
          <span style={{ fontSize:11, color:'rgba(134,239,172,0.85)' }}>On track for OSCP in 6 weeks</span>
        </div>
      </motion.div>

    </div>
  );
}

/* ── mobile stats strip ───────────────────────────────────── */
function MobileStrip() {
  return (
    <div style={{ padding:'0 16px 24px' }}>
      <div style={{
        borderRadius:14, border:'1px solid rgba(56,189,248,0.22)',
        background:'rgba(255,255,255,0.03)', backdropFilter:'blur(10px)',
        padding:'16px', display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:12,
      }}>
        {METRICS.map(m => (
          <div key={m.label} style={{ textAlign:'center' }}>
            <div style={{ fontWeight:800, fontSize:22, color:'#fff', letterSpacing:'-0.03em' }}>{m.value}</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.42)', marginTop:2 }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── cert marquee ─────────────────────────────────────────── */
function CertMarquee() {
  const doubled = [...CERTS, ...CERTS];
  return (
    <div style={{ position:'relative', overflow:'hidden', borderTop:'1px solid rgba(56,189,248,0.18)', borderBottom:'1px solid rgba(56,189,248,0.18)', padding:'10px 0' }}>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:72, background:'linear-gradient(to right,#01040a,transparent)', zIndex:2, pointerEvents:'none' }} />
      <div style={{ position:'absolute', right:0, top:0, bottom:0, width:72, background:'linear-gradient(to left,#01040a,transparent)', zIndex:2, pointerEvents:'none' }} />
      <div style={{ display:'flex', width:'max-content', animation:'marquee 28s linear infinite' }}>
        {doubled.map((c,i) => (
          <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:12, paddingRight:24, fontFamily:'monospace', fontSize:11, letterSpacing:'0.14em', color:'rgba(186,230,253,0.45)' }}>
            {c}
            <span style={{ color:'rgba(186,230,253,0.2)' }}>|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── main ─────────────────────────────────────────────────── */
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx]         = useState(0);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setIdx(p => (p + 1) % WORDS.length), 3000);
    return () => clearInterval(t);
  }, []);

  if (!mounted) return <div style={{ minHeight:'100vh', background:'#01040a' }} />;

  return (
    <section style={{ position:'relative', minHeight:'100vh', width:'100%', overflow:'hidden', background:'#01040a', color:'#fff', display:'flex', flexDirection:'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .hff { font-family:'Inter',sans-serif; }

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

        @media(max-width:900px) {
          .h-grid { grid-template-columns:1fr; padding:88px 20px 36px; }
          .h-right-col { display:none !important; }
          .h-wave-desk { display:none !important; }
          .h-wave-mob  { display:block !important; }
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
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
        background:'radial-gradient(ellipse 80% 50% at 20% -5%,rgba(56,189,248,0.13) 0%,transparent 60%), radial-gradient(ellipse 50% 40% at 85% 55%,rgba(99,102,241,0.09) 0%,transparent 55%)',
      }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
        backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
        backgroundSize:'52px 52px',
        maskImage:'radial-gradient(ellipse 100% 60% at 30% 10%,black 20%,transparent 75%)',
        WebkitMaskImage:'radial-gradient(ellipse 100% 60% at 30% 10%,black 20%,transparent 75%)',
      }} />

      {/* desktop wave */}
      <div className="h-wave-desk" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }}>
        <RightWave />
      </div>

      {/* content */}
      <div className="hff h-grid" style={{ position:'relative', zIndex:2 }}>

        {/* ── LEFT ── */}
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>

          {/* badge */}
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }}
            style={{ display:'inline-flex', alignItems:'center', gap:8, width:'fit-content',
              padding:'7px 13px', borderRadius:999,
              border:'1px solid rgba(56,189,248,0.32)',
              background:'rgba(56,189,248,0.07)', backdropFilter:'blur(8px)',
            }}
          >
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80',
              boxShadow:'0 0 8px rgba(74,222,128,0.9)', animation:'pulseDot 2s ease-in-out infinite' }} />
            <span style={{ fontFamily:'monospace', fontSize:11, letterSpacing:'0.14em', color:'rgba(186,230,253,0.88)', textTransform:'uppercase' }}>
              Cohort 14 · Closing Soon
            </span>
          </motion.div>

          {/* headline */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.07 }}>
            <h1 style={{ margin:0, fontWeight:900, fontSize:'clamp(30px,5.2vw,70px)', lineHeight:1.02, letterSpacing:'-0.045em', color:'#fff' }}>
              Become the<br />
              <span style={{ color:'rgba(255,255,255,0.26)' }}>cybersecurity</span>
            </h1>
            <div style={{ height:'clamp(38px,5.4vw,72px)', overflow:'hidden', marginTop:2 }}>
              <AnimatePresence mode="wait">
                <motion.div key={idx}
                  initial={{ y:'110%', opacity:0, filter:'blur(6px)' }}
                  animate={{ y:0,      opacity:1, filter:'blur(0px)' }}
                  exit={{   y:'-80%', opacity:0, filter:'blur(5px)' }}
                  transition={{ duration:0.38, ease:[0.76,0,0.24,1] }}
                  style={{ fontSize:'clamp(30px,5vw,68px)', fontWeight:900, letterSpacing:'-0.045em', lineHeight:1.02,
                    background:'linear-gradient(110deg,#7dd3fc 0%,#38bdf8 48%,#818cf8 100%)',
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                  }}
                >
                  {WORDS[idx]}
                </motion.div>
              </AnimatePresence>
            </div>
            <h1 style={{ margin:'2px 0 0', fontWeight:900, fontSize:'clamp(30px,5.2vw,70px)', lineHeight:1.02, letterSpacing:'-0.045em', color:'rgba(255,255,255,0.2)' }}>
              expert teams hire for.
            </h1>
          </motion.div>

          {/* sub copy */}
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
            style={{ margin:0, maxWidth:460, color:'rgba(255,255,255,0.56)', fontSize:'clamp(13px,1.55vw,17px)', lineHeight:1.72, letterSpacing:'-0.01em' }}
          >
            Train with active red-team operators. Build production labs.
            Graduate with the certs and portfolio Fortune 500 teams compete for —
            or get a <span style={{ color:'#7dd3fc', fontWeight:600 }}>full refund in 14 days</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.3 }}
            style={{ display:'flex', flexWrap:'wrap', gap:10 }}
          >
            <Link href="/enroll" className="h-btn-p"
              style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8,
                padding:'13px 24px', borderRadius:10,
                background:'#fff', color:'#0a0f1e', fontWeight:800, fontSize:14, letterSpacing:'-0.02em',
                boxShadow:'0 8px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              Enroll Now <ArrowRight size={15} strokeWidth={2.6} />
            </Link>
            <Link href="/curriculum" className="h-btn-s"
              style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8,
                padding:'13px 24px', borderRadius:10,
                border:'1px solid rgba(255,255,255,0.13)',
                background:'rgba(255,255,255,0.04)', backdropFilter:'blur(8px)',
                color:'rgba(255,255,255,0.78)', fontWeight:600, fontSize:14, letterSpacing:'-0.02em',
                transition:'all .18s ease',
              }}
            >
              View Curriculum <Sparkles size={14} color="#7dd3fc" />
            </Link>
          </motion.div>

          {/* urgency */}
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
            style={{ margin:0, fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(186,230,253,0.6)', fontWeight:600 }}
          >
            Next live batch starts in 5 days · Seats filling fast
          </motion.p>

          {/* trust */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.46 }}
            style={{ display:'flex', flexWrap:'wrap', gap:14 }}
          >
            {TRUST.map(t => (
              <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12, color:'rgba(255,255,255,0.48)' }}>
                <CheckCircle2 size={13} color="rgba(56,189,248,0.8)" />
                {t}
              </span>
            ))}
          </motion.div>

          {/* metrics */}
          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.52, duration:0.5 }}
            style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:2 }}
          >
            {METRICS.map((m,i) => (
              <motion.div key={m.label}
                initial={{ opacity:0, scale:0.88 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.55+i*0.06 }}
                style={{ padding:'10px 15px', borderRadius:10,
                  border:'1px solid rgba(56,189,248,0.18)',
                  background:'rgba(255,255,255,0.03)', backdropFilter:'blur(8px)',
                  minWidth:76,
                }}
              >
                <div style={{ fontWeight:800, fontSize:'clamp(16px,2vw,23px)', letterSpacing:'-0.03em', color:'#fff', lineHeight:1 }}>{m.value}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:3 }}>{m.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* right col placeholder */}
        <div className="h-right-col" />
      </div>

      {/* mobile strip */}
      <div className="h-wave-mob" style={{ position:'relative', zIndex:2 }}>
        <MobileStrip />
      </div>

      {/* marquee */}
      <div style={{ position:'relative', zIndex:2 }}>
        <CertMarquee />
      </div>
    </section>
  );
}
