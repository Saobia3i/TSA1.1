'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { IconPinnedFilled } from '@tabler/icons-react';
import { getAllNews, NewsItem } from '@/features/news/data/NewsData';
import {
  homePreviewButtonStyle,
  homePreviewCardButtonStyle,
  sectionSubtitleStyle,
  sectionTitleStyle,
} from '@/features/home/components/homeSectionStyles';

const isValidNewsItem = (item: NewsItem | null | undefined): item is NewsItem => {
  return Boolean(item && typeof item.id === 'number' && item.title && item.date);
};

export default function NewsPreview() {
  const previewFrameHeight = 'clamp(620px, 88vw, 760px)';
  const previewImageHeight = 'clamp(160px, 24vw, 280px)';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const currentIndex = featured.length > 0 ? activeIndex % featured.length : 0;
  const activeItem = featured[currentIndex];

  useEffect(() => {
    if (featured.length <= 1 || paused) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % featured.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeIndex, paused, featured.length]);

  useEffect(() => {
    if (!paused) return;

    const timer = setTimeout(() => {
      setPaused(false);
    }, 12000);

    return () => clearTimeout(timer);
  }, [paused]);

  const renderCard = (item: NewsItem) => {
    const itemHeroImage = Array.isArray(item.heroImages) ? item.heroImages[0] : undefined;

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: 'clamp(10px, 1.5vw, 16px)',
        }}
      >
        <div
          style={{
            background:
              'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(8, 12, 22, 0.99) 100%)',
            border: item.isPinned
              ? '1px solid rgba(34, 211, 238, 0.65)'
              : '1px solid rgba(148, 163, 184, 0.22)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: item.isPinned
              ? '0 24px 56px rgba(2, 6, 23, 0.48), 0 0 0 1px rgba(34, 211, 238, 0.16), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 24px 56px rgba(2, 6, 23, 0.40), inset 0 1px 0 rgba(255,255,255,0.05)',
            position: 'relative',
            backdropFilter: 'blur(18px)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: item.isPinned
                ? 'radial-gradient(circle at top right, rgba(34, 211, 238, 0.14), transparent 34%), radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.12), transparent 32%)'
                : 'radial-gradient(circle at top right, rgba(34, 211, 238, 0.08), transparent 28%), radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.08), transparent 30%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              width: '100%',
              height: previewImageHeight,
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'rgba(17, 24, 39, 0.8)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {itemHeroImage ? (
              <Image
                src={itemHeroImage}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 1100px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                aria-hidden
                style={{
                  width: '100%',
                  height: '100%',
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
          </div>

          <div
            style={{
              padding: 'clamp(18px, 3vw, 28px)',
              position: 'relative',
              zIndex: 1,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {item.isPinned && (
              <div
                style={{
                  fontSize: '11px',
                  color: '#67e8f9',
                  fontWeight: 700,
                  marginBottom: '12px',
                  letterSpacing: '1px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-space-mono)',
                  width: 'fit-content',
                  padding: '6px 10px',
                  borderRadius: '999px',
                  background: 'rgba(34, 211, 238, 0.12)',
                  border: '1px solid rgba(34, 211, 238, 0.2)',
                }}
              >
                <IconPinnedFilled size={13} />
                Pinned
              </div>
            )}

            <h3
              style={{
                fontSize: 'clamp(18px, 2.2vw, 24px)',
                fontWeight: 800,
                color: 'white',
                marginBottom: '10px',
                fontFamily: 'var(--font-space-mono)',
                lineHeight: 1.25,
                letterSpacing: '0.2px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: 'calc(1em * 1.25 * 2)',
              }}
            >
              {item.title}
            </h3>

            <div
              style={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 10px',
                marginBottom: '14px',
                borderRadius: '999px',
                background: 'rgba(148, 163, 184, 0.12)',
                border: '1px solid rgba(148, 163, 184, 0.18)',
                color: '#cbd5e1',
                fontSize: 'clamp(10px, 1.3vw, 12px)',
                fontFamily: 'var(--font-space-mono)',
              }}
            >
              {item.date}
            </div>

            <p
              style={{
                fontSize: 'clamp(13px, 1.55vw, 15px)',
                color: '#cbd5e1',
                lineHeight: 1.75,
                marginBottom: '18px',
                maxWidth: '92%',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: 'calc(1em * 1.75 * 3)',
              }}
            >
              {item.shortDescription}
            </p>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: '16px',
                borderTop: '1px solid rgba(34, 211, 238, 0.14)',
                marginTop: 'auto',
              }}
            >
              <Link href={`/news/${item.id}`} style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      '0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    ...homePreviewCardButtonStyle,
                  }}
                >
                  Read More
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (featured.length === 0) {
    return (
      <section style={{ padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ color: '#9ca3af' }}>No news available</p>
      </section>
    );
  }

  if (!activeItem) {
    return (
      <section style={{ padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ color: '#9ca3af' }}>No news available</p>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.16, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: 'clamp(40px, 5vw, 64px) clamp(16px, 3vw, 24px)',
        background:
          'radial-gradient(circle at top, rgba(34, 211, 238, 0.08), transparent 32%), radial-gradient(circle at bottom, rgba(168, 85, 247, 0.08), transparent 28%), rgba(17, 24, 39, 0.3)',
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: 'center',
          marginBottom: 'clamp(28px, 4vw, 44px)',
          maxWidth: '860px',
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
        <h2 style={sectionTitleStyle}>
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
        <p style={sectionSubtitleStyle}>
          Updates, announcements, and community highlights
        </p>
      </motion.div>

      {/* News Cards Container - Fixed Wrapper */}
      <div
        style={{
          maxWidth: '980px',
          margin: '0 auto',
          paddingBottom: '88px',
        }}
      >
        {/* Carousel Container with Overflow Hidden */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'clip',
            borderRadius: '28px',
            padding: 'clamp(10px, 1.2vw, 14px)',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.015))',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.32)',
            height: previewFrameHeight,
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '100%' }}
            >
              {renderCard(activeItem)}
            </motion.div>
          </AnimatePresence>
        </div>

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
                setActiveIndex(i);
                setPaused(true);
              }}
              whileHover={{ scale: 1.15 }}
              style={{
                width: currentIndex === i ? '28px' : '12px',
                height: '12px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background:
                  currentIndex === i
                    ? 'linear-gradient(135deg, #22d3ee, #a855f7)'
                    : 'rgba(255, 255, 255, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: currentIndex === i ? '0 0 12px rgba(34, 211, 238, 0.5)' : 'none',
              }}
              aria-label={`Show news ${i + 1}`}
            />
          ))}
        </div>
      </div>

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
            style={homePreviewButtonStyle}
          >
            View All News
          </motion.button>
        </Link>
      </div>
    </motion.section>
  );
}
