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
  { value: '15K+', label: 'Trained' },
  { value: '98%',  label: 'Placed'  },
  { value: '$120K',label: 'Avg. Salary' },
  { value: '4.9★', label: 'Rating'  },
];

const CERTS = ['CEH','CISSP','OSCP','Security+','CISM','CCSP','GPEN','GCIH','CISA','CASP+'];

/* ── floating cards data ──────────────────────────────────── */
// card A — Live Lab (top-right)
// card B — Placement (bottom-right)
// card C — OSCP badge (left-middle)
// card D — Students (top-left area) — NEW
// card E — Course progress (center-bottom) — NEW

/* ── right wave panel ─────────────────────────────────────── */
// Stripe config — serial glow top→bottom, equally spaced delays
// dur = travel time (same for all so they sweep at same speed)
// delay = stagger so each one fires after the previous finishes
const SERIAL_DUR = 1.8;   // how long one stripe takes to sweep
const SERIAL_GAP = 0.55;  // gap between each stripe start
const STRIPE_CFG = [
  { xi: 6,  color:'#7dd3fc', width:1.6 },
  { xi: 8,  color:'#a78bfa', width:1.4 },
  { xi: 10, color:'#38bdf8', width:1.8 },
  { xi: 12, color:'#c084fc', width:1.4 },
  { xi: 14, color:'#7dd3fc', width:1.6 },
  { xi: 16, color:'#818cf8', width:1.2 },
];

function RightWave() {
  // wave boundary x at y=0 is ~300, slopes left → x≈0 at y=900
  // stripes start at xi * 30 (all > 240 = right of wave edge)
  const LINE_LEN = 910; // sqrt(130²+900²)

  return (
    <div style={{ position:'absolute', top:0, right:0, bottom:0, width:'52%', pointerEvents:'none', zIndex:1, overflow:'hidden' }}>

      {/* ── wave fill + boundary line ── */}
      <svg viewBox="0 0 600 900" preserveAspectRatio="none"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
        <defs>
          <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(56,189,248,0.14)" />
            <stop offset="50%"  stopColor="rgba(56,189,248,0.06)" />
            <stop offset="100%" stopColor="rgba(99,102,241,0.10)" />
          </linearGradient>
          <linearGradient id="sg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(125,211,252,0.9)" />
            <stop offset="55%"  stopColor="rgba(125,211,252,0.38)" />
            <stop offset="100%" stopColor="rgba(125,211,252,0.03)" />
          </linearGradient>
        </defs>
        {/*
          S-curve, starts further LEFT (x=200 at top)
          tilted diagonally top-right → bottom-left
        */}
        <path d="M 200,0 C 360,120 60,280 220,450 C 380,620 -40,750 -120,900 L 600,900 L 600,0 Z"
          fill="url(#wg)" />
        {/* primary S boundary */}
        <path d="M 200,0 C 360,120 60,280 220,450 C 380,620 -40,750 -120,900"
          fill="none" stroke="url(#sg)" strokeWidth="2.5" />
        {/* echo 1 — offset ~80px right */}
        <path d="M 280,0 C 440,120 140,280 300,450 C 460,620 40,750 -40,900"
          fill="none" stroke="rgba(125,211,252,0.18)" strokeWidth="1.2" />
        {/* echo 2 — offset ~80px left */}
        <path d="M 120,0 C 280,120 -20,280 140,450 C 300,620 -120,750 -200,900"
          fill="none" stroke="rgba(125,211,252,0.08)" strokeWidth="0.8" />
      </svg>

      {/* ── RIGHT-ONLY dim base stripes — tilted same as wave ── */}
      <svg viewBox="0 0 600 900" preserveAspectRatio="none"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
        {Array.from({ length: 16 }).map((_, i) => {
          // slope: same tilt as wave (dx=-360 over dy=900)
          // start x shifted left to match new wave boundary at ~200
          const x1 = 290 + i * 18;
          const x2 = x1 - 360;
          return (
            <line key={i}
              x1={x1} y1={0} x2={x2} y2={900}
              stroke="rgba(125,211,252,0.09)" strokeWidth="0.7"
            />
          );
        })}
      </svg>

      {/* ── animated glow sweep — serial top→bottom, one by one ── */}
      <svg viewBox="0 0 600 900" preserveAspectRatio="none"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
        {STRIPE_CFG.map((s, gi) => {
          const x1 = 310 + gi * 28;
          const x2 = x1 - 360;
          // total cycle = all stripes fire once then wait, then repeat
          const totalCycle = STRIPE_CFG.length * SERIAL_GAP + SERIAL_DUR + 1.2;
          const delay = gi * SERIAL_GAP;
          return (
            <motion.line key={gi}
              x1={x1} y1={0} x2={x2} y2={900}
              stroke={s.color}
              strokeWidth={s.width}
              strokeLinecap="round"
              strokeDasharray={`${LINE_LEN * 0.14} ${LINE_LEN}`}
              animate={{ strokeDashoffset: [LINE_LEN * 0.14, -(LINE_LEN * 1.0)] }}
              transition={{
                duration: SERIAL_DUR,
                delay,
                repeat: Infinity,
                repeatDelay: totalCycle - SERIAL_DUR,
                ease: 'easeInOut',
              }}
              style={{ filter: `drop-shadow(0 0 6px ${s.color}) drop-shadow(0 0 14px ${s.color}80)` }}
            />
          );
        })}
      </svg>

      {/* ── glow orbs ── */}
      <div style={{ position:'absolute', top:'8%',  right:'5%',  width:300, height:300, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(56,189,248,0.2) 0%,transparent 70%)',
        filter:'blur(42px)', animation:'floatD 8s ease-in-out infinite' }} />
      <div style={{ position:'absolute', bottom:'12%', right:'2%', width:220, height:220, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%)',
        filter:'blur(34px)', animation:'floatB 10s ease-in-out infinite 1.2s' }} />
      <div style={{ position:'absolute', top:'42%', right:'30%', width:160, height:160, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(167,139,250,0.16) 0%,transparent 70%)',
        filter:'blur(28px)', animation:'floatA 9s ease-in-out infinite 2s' }} />

      {/*
        ── Cards: zig-zag layout ──
        Vertical spacing ~17% apart (100vh / 5 cards ≈ 18%)
        ZIG = right:4%   ZAG = right:32%
        top: 6% → 22% → 38% → 54% → 70%
      */}

      {/* Card A — Live Lab — ZIG (far right) — top 6% */}
      <motion.div
        initial={{ opacity:0, x:40, scale:0.93 }}
        animate={{ opacity:1, x:0,  scale:1 }}
        transition={{ delay:0.45, duration:0.6, ease:[0.22,1,0.36,1] }}
        style={{ position:'absolute', top:'6%', right:'4%',
          padding:'14px 18px', borderRadius:14, minWidth:178,
          border:'1px solid rgba(125,211,252,0.28)',
          background:'rgba(2,8,24,0.84)', backdropFilter:'blur(16px)',
          boxShadow:'0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
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
            transition={{ delay:1.1, duration:1.4, ease:'easeOut' }}
            style={{ height:'100%', borderRadius:999, background:'linear-gradient(90deg,#38bdf8,#818cf8)' }} />
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

      {/* Card D — Students — ZAG (shifted left) — top 22% */}
      <motion.div
        initial={{ opacity:0, x:40 }}
        animate={{ opacity:1, x:0 }}
        transition={{ delay:0.65, duration:0.55, ease:[0.22,1,0.36,1] }}
        style={{ position:'absolute', top:'22%', right:'32%',
          display:'flex', alignItems:'center', gap:10,
          padding:'11px 16px', borderRadius:12,
          border:'1px solid rgba(74,222,128,0.28)',
          background:'rgba(2,8,24,0.84)', backdropFilter:'blur(14px)',
          boxShadow:'0 4px 24px rgba(0,0,0,0.45)',
          animation:'floatD 10s ease-in-out infinite 0.5s',
        }}
      >
        <div style={{ width:34, height:34, borderRadius:'50%',
          background:'rgba(74,222,128,0.15)',
          display:'flex', alignItems:'center', justifyContent:'center',
          border:'1px solid rgba(74,222,128,0.3)', flexShrink:0,
        }}>
          <Users size={15} color="#4ade80" />
        </div>
        <div>
          <div style={{ color:'#fff', fontWeight:800, fontSize:15, letterSpacing:'-0.02em', lineHeight:1 }}>
            247 <span style={{ fontSize:10, fontWeight:500, color:'rgba(134,239,172,0.8)' }}>online</span>
          </div>
          <div style={{ fontSize:10, color:'rgba(255,255,255,0.45)', marginTop:3 }}>Students in labs now</div>
        </div>
      </motion.div>

      {/* Card C — OSCP badge — ZIG (far right) — top 38% */}
      <motion.div
        initial={{ opacity:0, x:40, scale:0.88 }}
        animate={{ opacity:1, x:0,  scale:1 }}
        transition={{ delay:0.85, duration:0.5, ease:[0.22,1,0.36,1] }}
        style={{ position:'absolute', top:'38%', right:'4%',
          display:'flex', alignItems:'center', gap:9,
          padding:'10px 16px', borderRadius:999,
          border:'1px solid rgba(250,204,21,0.38)',
          background:'rgba(2,8,24,0.84)', backdropFilter:'blur(12px)',
          boxShadow:'0 4px 20px rgba(0,0,0,0.45), 0 0 24px rgba(250,204,21,0.07)',
          animation:'floatC 8s ease-in-out infinite 1s',
        }}
      >
        <Star size={14} color="#facc15" fill="#facc15" />
        <span style={{ fontSize:12, fontWeight:700, color:'rgba(254,249,195,0.92)' }}>OSCP Certified</span>
      </motion.div>

      {/* Card B — Placement — ZAG (shifted left) — top 54% */}
      <motion.div
        initial={{ opacity:0, x:40, scale:0.93 }}
        animate={{ opacity:1, x:0,  scale:1 }}
        transition={{ delay:1.05, duration:0.6, ease:[0.22,1,0.36,1] }}
        style={{ position:'absolute', top:'54%', right:'30%',
          padding:'14px 18px', borderRadius:14, minWidth:158,
          border:'1px solid rgba(167,139,250,0.28)',
          background:'rgba(2,8,24,0.84)', backdropFilter:'blur(16px)',
          boxShadow:'0 8px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          animation:'floatB 9s ease-in-out infinite',
        }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:6 }}>
          <Zap size={13} color="#a78bfa" />
          <span style={{ fontFamily:'monospace', fontSize:10, letterSpacing:'0.13em', color:'rgba(196,181,253,0.65)', textTransform:'uppercase' }}>Placement</span>
        </div>
        <div style={{ color:'#f5f3ff', fontWeight:900, fontSize:28, lineHeight:1, letterSpacing:'-0.04em' }}>98%</div>
        <div style={{ color:'rgba(196,181,253,0.65)', fontSize:11, marginTop:4 }}>Job placement rate</div>
        <div style={{ marginTop:10, display:'flex', gap:3 }}>
          {[1,1,1,1,0.3].map((o,i)=>(
            <div key={i} style={{ flex:1, height:3, borderRadius:999, background:`rgba(167,139,250,${o})` }} />
          ))}
        </div>
      </motion.div>

      {/* Card E — Module Progress — ZIG (far right) — top 70% */}
      <motion.div
        initial={{ opacity:0, x:40 }}
        animate={{ opacity:1, x:0 }}
        transition={{ delay:1.25, duration:0.55, ease:[0.22,1,0.36,1] }}
        style={{ position:'absolute', top:'70%', right:'4%',
          padding:'16px 20px', borderRadius:16, minWidth:210,
          border:'1px solid rgba(56,189,248,0.25)',
          background:'rgba(2,8,24,0.86)', backdropFilter:'blur(16px)',
          boxShadow:'0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
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
              <span style={{ fontSize:11, color:'rgba(255,255,255,0.6)' }}>{row.label}</span>
              <span style={{ fontFamily:'monospace', fontSize:11, fontWeight:700, color:row.color }}>{row.pct}%</span>
            </div>
            <div style={{ height:4, borderRadius:999, background:'rgba(255,255,255,0.08)' }}>
              <motion.div initial={{ width:'0%' }} animate={{ width:`${row.pct}%` }}
                transition={{ delay:1.5, duration:1.3, ease:'easeOut' }}
                style={{ height:'100%', borderRadius:999, background:row.color,
                  opacity:0.88, boxShadow:`0 0 8px ${row.color}80` }} />
            </div>
          </div>
        ))}
        <div style={{ marginTop:10, paddingTop:10, borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', gap:6 }}>
          <TrendingUp size={12} color="#4ade80" />
          <span style={{ fontSize:11, color:'rgba(134,239,172,0.85)' }}>On track for OSCP in 6 weeks</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── mobile cards grid ────────────────────────────────────── */
function MobileCards() {
  return (
    <motion.div
      initial={{ opacity:0, y:16 }}
      animate={{ opacity:1, y:0 }}
      transition={{ delay:0.55, duration:0.55 }}
      style={{ padding:'0 16px 28px', display:'flex', flexDirection:'column', gap:10 }}
    >
      {/* row 1: stats */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {/* live lab */}
        <div style={{ padding:'12px 14px', borderRadius:12,
          border:'1px solid rgba(56,189,248,0.28)',
          background:'rgba(255,255,255,0.03)', backdropFilter:'blur(10px)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
            <ShieldCheck size={12} color="#38bdf8" />
            <span style={{ fontFamily:'monospace', fontSize:9, letterSpacing:'0.12em', color:'rgba(186,230,253,0.6)', textTransform:'uppercase' }}>Live Lab</span>
          </div>
          <div style={{ color:'#f0f9ff', fontWeight:700, fontSize:12, lineHeight:1.35 }}>Network Intrusion<br />Detection</div>
          <div style={{ marginTop:7, height:3, borderRadius:999, background:'rgba(255,255,255,0.08)' }}>
            <motion.div initial={{ width:'0%' }} animate={{ width:'72%' }} transition={{ delay:0.9, duration:1.2 }}
              style={{ height:'100%', borderRadius:999, background:'linear-gradient(90deg,#38bdf8,#818cf8)' }} />
          </div>
          <div style={{ marginTop:5, display:'flex', alignItems:'center', gap:4 }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 6px rgba(74,222,128,0.9)', display:'inline-block', animation:'pulseDot 2s ease-in-out infinite' }} />
            <span style={{ fontSize:10, color:'rgba(134,239,172,0.85)' }}>Active</span>
          </div>
        </div>

        {/* placement */}
        <div style={{ padding:'12px 14px', borderRadius:12,
          border:'1px solid rgba(167,139,250,0.28)',
          background:'rgba(255,255,255,0.03)', backdropFilter:'blur(10px)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
            <Zap size={12} color="#a78bfa" />
            <span style={{ fontFamily:'monospace', fontSize:9, letterSpacing:'0.12em', color:'rgba(196,181,253,0.6)', textTransform:'uppercase' }}>Placement</span>
          </div>
          <div style={{ color:'#f5f3ff', fontWeight:900, fontSize:26, lineHeight:1, letterSpacing:'-0.04em' }}>98%</div>
          <div style={{ color:'rgba(196,181,253,0.6)', fontSize:10, marginTop:3 }}>Job placement rate</div>
          <div style={{ marginTop:8, display:'flex', gap:2 }}>
            {[1,1,1,1,0.3].map((o,i)=>(
              <div key={i} style={{ flex:1, height:2.5, borderRadius:999, background:`rgba(167,139,250,${o})` }} />
            ))}
          </div>
        </div>
      </div>

      {/* row 2: students + badge */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {/* students online */}
        <div style={{ padding:'12px 14px', borderRadius:12, display:'flex', alignItems:'center', gap:10,
          border:'1px solid rgba(74,222,128,0.25)',
          background:'rgba(255,255,255,0.03)', backdropFilter:'blur(10px)',
        }}>
          <div style={{ width:30, height:30, borderRadius:'50%', background:'rgba(74,222,128,0.12)',
            display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(74,222,128,0.25)', flexShrink:0 }}>
            <Users size={13} color="#4ade80" />
          </div>
          <div>
            <div style={{ color:'#fff', fontWeight:800, fontSize:16, letterSpacing:'-0.02em', lineHeight:1 }}>247</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.42)', marginTop:2 }}>Online now</div>
          </div>
        </div>

        {/* OSCP badge */}
        <div style={{ padding:'12px 14px', borderRadius:12, display:'flex', alignItems:'center', gap:8,
          border:'1px solid rgba(250,204,21,0.28)',
          background:'rgba(255,255,255,0.03)', backdropFilter:'blur(10px)',
        }}>
          <Star size={16} color="#facc15" fill="#facc15" />
          <div>
            <div style={{ color:'rgba(254,249,195,0.9)', fontWeight:700, fontSize:12 }}>OSCP</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.42)', marginTop:1 }}>Certified path</div>
          </div>
        </div>
      </div>

      {/* row 3: course progress full width */}
      <div style={{ padding:'14px 16px', borderRadius:12,
        border:'1px solid rgba(56,189,248,0.2)',
        background:'rgba(255,255,255,0.03)', backdropFilter:'blur(10px)',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
          <BookOpen size={12} color="#38bdf8" />
          <span style={{ fontFamily:'monospace', fontSize:9, letterSpacing:'0.12em', color:'rgba(186,230,253,0.55)', textTransform:'uppercase' }}>Your Module Progress</span>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
          {[
            { label:'Web App Hacking', pct:100, color:'#4ade80' },
            { label:'Network Recon',   pct:78,  color:'#38bdf8' },
            { label:'Privilege Escal.', pct:45, color:'#a78bfa' },
          ].map(row => (
            <div key={row.label}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                <span style={{ fontSize:11, color:'rgba(255,255,255,0.55)' }}>{row.label}</span>
                <span style={{ fontFamily:'monospace', fontSize:10, color:row.color }}>{row.pct}%</span>
              </div>
              <div style={{ height:3, borderRadius:999, background:'rgba(255,255,255,0.08)' }}>
                <motion.div initial={{ width:'0%' }} animate={{ width:`${row.pct}%` }}
                  transition={{ delay:0.8, duration:1.1, ease:'easeOut' }}
                  style={{ height:'100%', borderRadius:999, background:row.color, opacity:0.85 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:10, display:'flex', alignItems:'center', gap:5 }}>
          <TrendingUp size={11} color="#4ade80" />
          <span style={{ fontSize:10, color:'rgba(134,239,172,0.8)' }}>On track for OSCP in 6 weeks</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── cert marquee ─────────────────────────────────────────── */
function CertMarquee() {
  const doubled = [...CERTS, ...CERTS];
  return (
    <div style={{ position:'relative', overflow:'hidden', borderTop:'1px solid rgba(56,189,248,0.2)', borderBottom:'1px solid rgba(56,189,248,0.2)', padding:'10px 0' }}>
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
  const [idx, setIdx] = useState(0);

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
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.6)} }
        @keyframes shimmer  { from{transform:translateX(-120%)} to{transform:translateX(120%)} }

        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-11px) rotate(1deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)}               50%{transform:translateY(-14px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotate(1deg)}  50%{transform:translateY(-8px) rotate(-1deg)} }
        @keyframes floatD { 0%,100%{transform:translateY(0)}               50%{transform:translateY(-9px)} }
        @keyframes floatE { 0%,100%{transform:translateY(0) rotate(.5deg)} 50%{transform:translateY(-12px) rotate(-.5deg)} }


        /* layout */
        .h-grid {
          display:grid;
          grid-template-columns:1fr 1fr;
          min-height:calc(100vh - 70px);
          align-items:center;
          max-width:1200px;
          margin:0 auto;
          padding:100px 28px 56px;
        }
        .h-right-col { display:block; }
        .h-wave-desktop { display:block; }
        .h-wave-mobile  { display:none; }

        @media(max-width:900px) {
          .h-grid {
            grid-template-columns:1fr;
            padding:88px 20px 36px;
          }
          .h-right-col    { display:none !important; }
          .h-wave-desktop { display:none !important; }
          .h-wave-mobile  { display:block !important; }
        }
        @media(max-width:480px) {
          .h-grid { padding:80px 16px 28px; }
        }

        .h-btn-primary {
          position:relative; overflow:hidden;
          transition:transform .18s ease, box-shadow .18s ease;
        }
        .h-btn-primary::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(110deg,transparent 25%,rgba(255,255,255,.22) 48%,transparent 68%);
          animation:shimmer 2.4s linear infinite;
        }
        .h-btn-primary:hover { transform:translateY(-2px); }
        .h-btn-secondary:hover { border-color:rgba(255,255,255,.22) !important; background:rgba(255,255,255,.08) !important; }
      `}</style>

      {/* bg */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
        background:'radial-gradient(ellipse 80% 50% at 20% -5%,rgba(56,189,248,0.13) 0%,transparent 60%), radial-gradient(ellipse 50% 40% at 85% 55%,rgba(99,102,241,0.09) 0%,transparent 55%)',
      }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
        backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
        backgroundSize:'52px 52px',
        maskImage:'radial-gradient(ellipse 100% 60% at 30% 10%,black 20%,transparent 75%)',
        WebkitMaskImage:'radial-gradient(ellipse 100% 60% at 30% 10%,black 20%,transparent 75%)',
      }} />

      {/* desktop wave + 5 cards */}
      <div className="h-wave-desktop" style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }}>
        <RightWave />
      </div>

      {/* content */}
      <div className="hff h-grid" style={{ position:'relative', zIndex:2 }}>

        {/* ── LEFT col ── */}
        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>

          {/* badge */}
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }}
            style={{ display:'inline-flex', alignItems:'center', gap:8, width:'fit-content',
              padding:'7px 13px', borderRadius:999,
              border:'1px solid rgba(56,189,248,0.32)',
              background:'rgba(56,189,248,0.07)', backdropFilter:'blur(8px)',
            }}
          >
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px rgba(74,222,128,0.9)', animation:'pulseDot 2s ease-in-out infinite' }} />
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
            {/* animated word */}
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
            <Link href="/enroll" className="h-btn-primary"
              style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8,
                padding:'13px 24px', borderRadius:10,
                background:'#fff', color:'#0a0f1e', fontWeight:800, fontSize:14, letterSpacing:'-0.02em',
                boxShadow:'0 8px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              Enroll Now <ArrowRight size={15} strokeWidth={2.6} />
            </Link>
            <Link href="/curriculum" className="h-btn-secondary"
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

          {/* metric pills */}
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

      {/* mobile cards */}
      <div className="h-wave-mobile">
        <MobileCards />
      </div>

      {/* marquee */}
      <div style={{ position:'relative', zIndex:2 }}>
        <CertMarquee />
      </div>
    </section>
  );
}
