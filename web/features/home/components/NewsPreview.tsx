'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { IconPinnedFilled } from '@tabler/icons-react';
import { getAllNews, NewsItem } from '@/features/news/data/NewsData';

const isValidNewsItem = (item: NewsItem | null | undefined): item is NewsItem => {
  return Boolean(item && typeof item.id === 'number' && item.title && item.date);
};

export default function NewsPreview() {
  const allNews = useMemo(() => {
    try {
      const news = getAllNews().filter(isValidNewsItem);
      if (!news || news.length === 0) {
        console.warn('NewsPreview - No news data available');
        return [];
      }
      return news;
    } catch (e) {
      console.error('NewsPreview - Error loading news:', e);
      return [];
    }
  }, []);

  const featured = useMemo(() => allNews.slice(0, 4), [allNews]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Dev-time mount log to help debugging when preview doesn't show
    try {
      // eslint-disable-next-line no-console
      console.debug('NewsPreview mounted', { allNewsLength: allNews.length, featuredLength: featured.length });
    } catch (e) {
      // ignore
    }
  }, [allNews.length, featured.length]);

  useEffect(() => {
    if (featured.length === 0) {
      setIndex(0);
      return;
    }
    if (index >= featured.length) setIndex(0);
  }, [featured.length, index]);

  useEffect(() => {
    if (paused || featured.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % Math.max(featured.length, 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [paused, featured.length]);

  if (featured.length === 0) {
    return (
      <section style={{ padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ color: '#9ca3af' }}>No news available</p>
      </section>
    );
  }

  const safeIndex = featured.length === 0 ? 0 : Math.min(index, featured.length - 1);
  const current = featured[safeIndex];
  const heroImage = Array.isArray(current?.heroImages) ? current?.heroImages?.[0] : undefined;

  if (!current) {
    return (
      <section style={{ padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ color: '#9ca3af' }}>No news available</p>
      </section>
    );
  }

  return (
    <section
      style={{
        padding: 'clamp(32px, 4vw, 48px) clamp(16px, 3vw, 24px)',
        backgroundColor: 'rgba(17, 24, 39, 0.3)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        position: 'relative',
      }}
    >
      {/* Header */}
      {process.env.NODE_ENV !== 'production' && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 12,
            background: 'rgba(255,255,255,0.06)',
            color: '#e5e7eb',
            padding: '6px 10px',
            borderRadius: 8,
            fontSize: 12,
            zIndex: 60,
          }}
        >
          News: {featured.length}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(28px, 4vw, 40px)',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 12px',
            borderRadius: '999px',
            background: 'rgba(34, 211, 238, 0.12)',
            border: '1px solid rgba(34, 211, 238, 0.4)',
            color: '#22d3ee',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '12px',
            fontFamily: 'var(--font-space-mono)',
          }}
        >
          TSA Newsroom
        </div>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
            fontFamily: 'var(--font-space-mono)',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          Latest News
        </h2>
        <div
          style={{
            width: '60%',
            maxWidth: '400px',
            height: '3px',
            margin: '0 auto 10px',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #22d3ee, #a855f7)',
            boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)',
          }}
        />
        <p style={{ fontSize: 'clamp(13px, 1.6vw, 15px)', color: '#9ca3af' }}>
          Updates, announcements, and community highlights
        </p>
      </motion.div>

      {/* News Cards Container */}
      <motion.div
        layout
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          paddingBottom: '80px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(17, 24, 39, 0.85)',
              border: current.isPinned
                ? '2px solid rgba(34, 211, 238, 0.8)'
                : '2px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {heroImage ? (
              <img
                src={heroImage}
                alt={current.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  minHeight: 'clamp(180px, 25vw, 240px)',
                  maxHeight: '320px',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block',
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                }}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                aria-hidden
                style={{
                  width: '100%',
                  height: 'clamp(180px, 25vw, 240px)',
                  display: 'grid',
                  placeItems: 'center',
                  background:
                    'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(168, 85, 247, 0.15))',
                  color: '#e5e7eb',
                  fontWeight: 600,
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                }}
              >
                Image Coming Soon
              </div>
            )}

            <div style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
              {current.isPinned && (
                <div
                  style={{
                    fontSize: '12px',
                    color: '#22d3ee',
                    fontWeight: 700,
                    marginBottom: '8px',
                    letterSpacing: '0.3px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <IconPinnedFilled size={14} />
                  Pinned
                </div>
              )}

              <h3
                style={{
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  fontWeight: 800,
                  color: 'white',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-space-mono)',
                  lineHeight: 1.3,
                }}
              >
                {current.title}
              </h3>

              <p
                style={{
                  color: '#9ca3af',
                  marginBottom: '10px',
                  fontSize: 'clamp(11px, 1.4vw, 13px)',
                  fontFamily: 'var(--font-space-mono)',
                }}
              >
                {current.date}
              </p>

              <p
                style={{
                  fontSize: 'clamp(13px, 1.6vw, 14px)',
                  color: '#d1d5db',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                  maxWidth: '680px',
                }}
              >
                {current.shortDescription}
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <Link href={`/news/${current.id}`} style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow:
                        '0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
                    }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '11px 22px',
                      fontSize: '14px',
                      fontWeight: 700,
                      borderRadius: '10px',
                      border: '2px solid rgba(34, 211, 238, 0.6)',
                      background:
                        'linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(168, 85, 247, 0.12))',
                      color: '#22d3ee',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontFamily: 'var(--font-space-mono)',
                    }}
                  >
                    Read More
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: 'clamp(16px, 2.5vw, 22px)',
            flexWrap: 'wrap',
          }}
        >
          {featured.map((n, i) => (
            <motion.button
              key={n.id}
              onClick={() => {
                setIndex(i);
                setPaused(true);
              }}
              whileHover={{ scale: 1.15 }}
              style={{
                width: index === i ? '28px' : '12px',
                height: '12px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background:
                  index === i
                    ? 'linear-gradient(135deg, #22d3ee, #a855f7)'
                    : 'rgba(255, 255, 255, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: index === i ? '0 0 12px rgba(34, 211, 238, 0.5)' : 'none',
              }}
              aria-label={`Show news ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Fixed Button */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '16px',
          transform: 'translateX(-50%)',
        }}
      >
        <Link href="/news" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '11px 20px',
              fontSize: '14px',
              fontWeight: 700,
              borderRadius: '10px',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              background: 'rgba(17, 24, 39, 0.4)',
              color: '#e5e7eb',
              cursor: 'pointer',
              alignItems: 'center',
              display: 'inline-flex',
              gap: '8px',
              transition: 'all 0.3s ease',
              fontFamily: 'var(--font-space-mono)',
            }}
          >
            View All News
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
