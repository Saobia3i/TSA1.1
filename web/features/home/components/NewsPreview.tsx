'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    if (featured.length === 0) {
      setIndex(0);
      return;
    }
  }, [featured.length]);

  useEffect(() => {
    if (paused || featured.length === 0) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [paused, featured.length]);

  // Handle infinite loop reset
  useEffect(() => {
    if (index === featured.length && featured.length > 0) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 600); // Match transition duration
      return () => clearTimeout(timeout);
    }
  }, [index, featured.length]);

  if (featured.length === 0) {
    return (
      <section style={{ padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ color: '#9ca3af' }}>No news available</p>
      </section>
    );
  }

  if (!featured[Math.min(index, featured.length - 1)]) {
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
        animate={{ opacity: 1, y: 0 }}
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
          maxWidth: '620px',
          margin: '0 auto',
          paddingBottom: '72px',
        }}
      >
        {/* Carousel Container with Overflow Hidden */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            borderRadius: '24px',
          }}
        >
          {/* Sliding Flex Container */}
          <div
            style={{
              display: 'flex',
              transform: `translate3d(-${index * 100}%, 0, 0)`,
              transition: isTransitioning ? 'transform 0.52s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Render all featured items */}
            {featured.map((item) => {
              const itemHeroImage = Array.isArray(item?.heroImages) ? item?.heroImages?.[0] : undefined;
              return (
                <div
                  key={item.id}
                  style={{
                    minWidth: '100%',
                    width: '100%',
                    flexShrink: 0,
                    padding: '8px',
                  }}
                >
                  <div
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(17, 24, 39, 0.96) 0%, rgba(10, 15, 28, 0.98) 100%)',
                      border: item.isPinned
                        ? '1px solid rgba(34, 211, 238, 0.65)'
                        : '1px solid rgba(148, 163, 184, 0.22)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: item.isPinned
                        ? '0 18px 42px rgba(2, 6, 23, 0.42), 0 0 0 1px rgba(34, 211, 238, 0.16), inset 0 1px 0 rgba(255,255,255,0.06)'
                        : '0 18px 42px rgba(2, 6, 23, 0.36), inset 0 1px 0 rgba(255,255,255,0.04)',
                      position: 'relative',
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
                    {/* Fixed height image container */}
                    <div
                      style={{
                        width: '100%',
                        height: '260px',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {itemHeroImage ? (
                        <img
                          src={itemHeroImage}
                          alt={item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
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
                        padding: 'clamp(16px, 2.6vw, 20px)',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {item.isPinned && (
                        <div
                          style={{
                            fontSize: '11px',
                            color: '#22d3ee',
                            fontWeight: 700,
                            marginBottom: '10px',
                            letterSpacing: '0.8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-space-mono)',
                          }}
                        >
                          <IconPinnedFilled size={13} />
                          Pinned
                        </div>
                      )}

                      <h3
                        style={{
                          fontSize: 'clamp(15px, 2vw, 18px)',
                          fontWeight: 800,
                          color: 'white',
                          marginBottom: '8px',
                          fontFamily: 'var(--font-space-mono)',
                          lineHeight: 1.35,
                          letterSpacing: '0.2px',
                        }}
                      >
                        {item.title}
                      </h3>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '5px 10px',
                          marginBottom: '12px',
                          borderRadius: '999px',
                          background: 'rgba(148, 163, 184, 0.1)',
                          border: '1px solid rgba(148, 163, 184, 0.16)',
                          color: '#94a3b8',
                          fontSize: 'clamp(10px, 1.3vw, 12px)',
                          fontFamily: 'var(--font-space-mono)',
                        }}
                      >
                        {item.date}
                      </div>

                      <p
                        style={{
                          fontSize: 'clamp(11.5px, 1.45vw, 13px)',
                          color: '#cbd5e1',
                          lineHeight: 1.65,
                          marginBottom: '16px',
                          maxWidth: '100%',
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
                          justifyContent: 'center',
                          paddingTop: '12px',
                          borderTop: '1px solid rgba(255,255,255,0.08)',
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
            })}
            
            {/* Duplicate first slide for infinite loop */}
            {featured.length > 0 && (() => {
              const firstItem = featured[0];
              const itemHeroImage = Array.isArray(firstItem?.heroImages) ? firstItem?.heroImages?.[0] : undefined;
              return (
                <div
                  key={`${firstItem.id}-clone`}
                  style={{
                    minWidth: '100%',
                    width: '100%',
                    flexShrink: 0,
                    padding: '8px',
                  }}
                >
                  <div
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(17, 24, 39, 0.96) 0%, rgba(10, 15, 28, 0.98) 100%)',
                      border: firstItem.isPinned
                        ? '1px solid rgba(34, 211, 238, 0.65)'
                        : '1px solid rgba(148, 163, 184, 0.22)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: firstItem.isPinned
                        ? '0 18px 42px rgba(2, 6, 23, 0.42), 0 0 0 1px rgba(34, 211, 238, 0.16), inset 0 1px 0 rgba(255,255,255,0.06)'
                        : '0 18px 42px rgba(2, 6, 23, 0.36), inset 0 1px 0 rgba(255,255,255,0.04)',
                      position: 'relative',
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: firstItem.isPinned
                          ? 'radial-gradient(circle at top right, rgba(34, 211, 238, 0.14), transparent 34%), radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.12), transparent 32%)'
                          : 'radial-gradient(circle at top right, rgba(34, 211, 238, 0.08), transparent 28%), radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.08), transparent 30%)',
                        pointerEvents: 'none',
                      }}
                    />
                    <div
                      style={{
                        width: '100%',
                        height: '260px',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {itemHeroImage ? (
                        <img
                          src={itemHeroImage}
                          alt={firstItem.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
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
                        padding: 'clamp(16px, 2.6vw, 20px)',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {firstItem.isPinned && (
                        <div
                          style={{
                            fontSize: '11px',
                            color: '#22d3ee',
                            fontWeight: 700,
                            marginBottom: '10px',
                            letterSpacing: '0.8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-space-mono)',
                          }}
                        >
                          <IconPinnedFilled size={13} />
                          Pinned
                        </div>
                      )}

                      <h3
                        style={{
                          fontSize: 'clamp(15px, 2vw, 18px)',
                          fontWeight: 800,
                          color: 'white',
                          marginBottom: '8px',
                          fontFamily: 'var(--font-space-mono)',
                          lineHeight: 1.35,
                          letterSpacing: '0.2px',
                        }}
                      >
                        {firstItem.title}
                      </h3>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '5px 10px',
                          marginBottom: '12px',
                          borderRadius: '999px',
                          background: 'rgba(148, 163, 184, 0.1)',
                          border: '1px solid rgba(148, 163, 184, 0.16)',
                          color: '#94a3b8',
                          fontSize: 'clamp(10px, 1.3vw, 12px)',
                          fontFamily: 'var(--font-space-mono)',
                        }}
                      >
                        {firstItem.date}
                      </div>

                      <p
                        style={{
                          fontSize: 'clamp(11.5px, 1.45vw, 13px)',
                          color: '#cbd5e1',
                          lineHeight: 1.65,
                          marginBottom: '16px',
                          maxWidth: '100%',
                        }}
                      >
                        {firstItem.shortDescription}
                      </p>

                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingTop: '12px',
                          borderTop: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        <Link href={`/news/${firstItem.id}`} style={{ textDecoration: 'none' }}>
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
            })()}
          </div>
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
                setIsTransitioning(true);
                setIndex(i);
                setPaused(true);
              }}
              whileHover={{ scale: 1.15 }}
              style={{
                width: (index % featured.length) === i ? '28px' : '12px',
                height: '12px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background:
                  (index % featured.length) === i
                    ? 'linear-gradient(135deg, #22d3ee, #a855f7)'
                    : 'rgba(255, 255, 255, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: (index % featured.length) === i ? '0 0 12px rgba(34, 211, 238, 0.5)' : 'none',
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
    </section>
  );
}
