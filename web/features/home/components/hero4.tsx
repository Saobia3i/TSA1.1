'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';

const PROOF_POINTS = ['Live mentor-led training', 'Real-world lab projects', 'Career support + interview prep'];

const METRICS = [
  { value: '15,000+', label: 'Professionals trained' },
  { value: '98%', label: 'Placement support success' },
  { value: '4.9/5', label: 'Average learner rating' },
];

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(84px, 11vw, 140px) 20px clamp(56px, 7vw, 84px)',
        background:
          'radial-gradient(1200px 500px at 25% -10%, rgba(34,211,238,.18), transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(14,116,144,.14), transparent 65%), #020617',
        borderBottom: '1px solid rgba(148,163,184,.2)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(148,163,184,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.08) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 78%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 78%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1160,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: 'clamp(22px, 4vw, 54px)',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              width: 'fit-content',
              padding: '8px 12px',
              borderRadius: 999,
              border: '1px solid rgba(34,211,238,.35)',
              background: 'rgba(15,23,42,.7)',
              color: '#67e8f9',
              fontSize: 12,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-nunito)',
              fontWeight: 700,
            }}
          >
            <ShieldCheck size={14} />
            Cohort closes this week
          </div>

          <h1
            style={{
              margin: 0,
              color: '#f8fafc',
              lineHeight: 1.03,
              letterSpacing: '-0.03em',
              fontWeight: 800,
              fontFamily: 'var(--font-nunito)',
              fontSize: 'clamp(34px, 6vw, 74px)',
              maxWidth: 700,
            }}
          >
            Become the cybersecurity hire companies compete to recruit.
          </h1>

          <p
            style={{
              margin: 0,
              color: 'rgba(226,232,240,.86)',
              lineHeight: 1.7,
              maxWidth: 640,
              fontSize: 'clamp(15px, 2.1vw, 19px)',
              fontFamily: 'var(--font-nunito)',
            }}
          >
            Structured training, live experts, and portfolio-ready labs designed to move you from theory to offer
            letter fast.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Link
              href="/courses"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 18px',
                borderRadius: 10,
                fontWeight: 700,
                fontFamily: 'var(--font-nunito)',
                background: '#ecfeff',
                color: '#0f172a',
                border: '1px solid rgba(255,255,255,.5)',
                boxShadow: '0 10px 26px rgba(0,0,0,.3)',
              }}
            >
              Start Learning
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/about/join"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 18px',
                borderRadius: 10,
                fontWeight: 600,
                fontFamily: 'var(--font-nunito)',
                color: '#cbd5e1',
                border: '1px solid rgba(148,163,184,.38)',
                background: 'rgba(15,23,42,.75)',
              }}
            >
              Talk to an advisor
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 6 }}>
            {PROOF_POINTS.map((item) => (
              <span
                key={item}
                style={{
                  color: 'rgba(203,213,225,.88)',
                  fontFamily: 'var(--font-nunito)',
                  fontSize: 13,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 999, background: '#67e8f9' }} />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            borderRadius: 16,
            border: '1px solid rgba(148,163,184,.3)',
            background: 'linear-gradient(180deg, rgba(15,23,42,.9), rgba(2,6,23,.85))',
            backdropFilter: 'blur(8px)',
            padding: '20px',
            boxShadow: '0 24px 56px rgba(0,0,0,.36)',
          }}
        >
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 10,
              border: '1px solid rgba(34,211,238,.35)',
              background: 'rgba(8,47,73,.24)',
              color: '#cffafe',
              fontFamily: 'var(--font-nunito)',
              fontSize: 13,
              lineHeight: 1.55,
            }}
          >
            Next intake: <strong>5 days</strong>. Limited mentor slots for high-touch feedback.
          </div>

          <div
            style={{
              marginTop: 14,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 8,
            }}
          >
            {METRICS.map((item) => (
              <div
                key={item.label}
                style={{
                  border: '1px solid rgba(148,163,184,.25)',
                  borderRadius: 10,
                  padding: '12px 10px',
                  background: 'rgba(15,23,42,.7)',
                }}
              >
                <div
                  style={{
                    color: '#f8fafc',
                    fontWeight: 800,
                    fontSize: 'clamp(16px, 2vw, 22px)',
                    letterSpacing: '-0.02em',
                    fontFamily: 'var(--font-nunito)',
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    color: 'rgba(148,163,184,.95)',
                    marginTop: 4,
                    fontSize: 11,
                    lineHeight: 1.35,
                    fontFamily: 'var(--font-nunito)',
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px solid rgba(148,163,184,.24)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}
          >
            <span
              style={{
                color: 'rgba(203,213,225,.9)',
                fontSize: 12,
                fontFamily: 'var(--font-nunito)',
                letterSpacing: '.02em',
              }}
            >
              Trusted by teams at global startups and enterprise orgs
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#facc15' }}>
              <Star size={14} fill="#facc15" />
              <Star size={14} fill="#facc15" />
              <Star size={14} fill="#facc15" />
            </span>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
