'use client';

import { motion } from 'framer-motion';
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
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    try {
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

  const safeIndex = featured.length === 0 ? 0 : Math.min(index, featured.length - 1);
  const current = featured[safeIndex];

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

      {/* News Cards Container - Fixed Wrapper */}
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          paddingBottom: '80px',
        }}
      >
        {/* Carousel Container with Overflow Hidden */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Sliding Flex Container */}
          <div
            style={{
              display: 'flex',
              transform: `translateX(-${index * 100}%)`,
              transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
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
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(17, 24, 39, 0.85)',
                      border: item.isPinned
                        ? '2px solid rgba(34, 211, 238, 0.95)'
                        : '2px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      boxShadow: item.isPinned
                        ? '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 30px rgba(34, 211, 238, 0.2)'
                        : '0 8px 24px rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {/* Fixed height image container */}
                    <div
                      style={{
                        width: '100%',
                        height: '260px',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
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

                    <div style={{ padding: 'clamp(14px, 2.5vw, 20px)' }}>
                      {item.isPinned && (
                        <div
                          style={{
                            fontSize: '11px',
                            color: '#22d3ee',
                            fontWeight: 700,
                            marginBottom: '6px',
                            letterSpacing: '0.3px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <IconPinnedFilled size={13} />
                          Pinned
                        </div>
                      )}

                      <h3
                        style={{
                          fontSize: 'clamp(16px, 2.2vw, 20px)',
                          fontWeight: 800,
                          color: 'white',
                          marginBottom: '6px',
                          fontFamily: 'var(--font-space-mono)',
                          lineHeight: 1.3,
                        }}
                      >
                        {item.title}
                      </h3>

                      <p
                        style={{
                          color: '#9ca3af',
                          marginBottom: '8px',
                          fontSize: 'clamp(10px, 1.3vw, 12px)',
                          fontFamily: 'var(--font-space-mono)',
                        }}
                      >
                        {item.date}
                      </p>

                      <p
                        style={{
                          fontSize: 'clamp(12px, 1.5vw, 13px)',
                          color: '#d1d5db',
                          lineHeight: 1.5,
                          marginBottom: '14px',
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
                              padding: '9px 18px',
                              fontSize: '13px',
                              fontWeight: 700,
                              borderRadius: '8px',
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
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(17, 24, 39, 0.85)',
                      border: firstItem.isPinned
                        ? '2px solid rgba(34, 211, 238, 0.95)'
                        : '2px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      boxShadow: firstItem.isPinned
                        ? '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 30px rgba(34, 211, 238, 0.2)'
                        : '0 8px 24px rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '260px',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
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

                    <div style={{ padding: 'clamp(14px, 2.5vw, 20px)' }}>
                      {firstItem.isPinned && (
                        <div
                          style={{
                            fontSize: '11px',
                            color: '#22d3ee',
                            fontWeight: 700,
                            marginBottom: '6px',
                            letterSpacing: '0.3px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <IconPinnedFilled size={13} />
                          Pinned
                        </div>
                      )}

                      <h3
                        style={{
                          fontSize: 'clamp(16px, 2.2vw, 20px)',
                          fontWeight: 800,
                          color: 'white',
                          marginBottom: '6px',
                          fontFamily: 'var(--font-space-mono)',
                          lineHeight: 1.3,
                        }}
                      >
                        {firstItem.title}
                      </h3>

                      <p
                        style={{
                          color: '#9ca3af',
                          marginBottom: '8px',
                          fontSize: 'clamp(10px, 1.3vw, 12px)',
                          fontFamily: 'var(--font-space-mono)',
                        }}
                      >
                        {firstItem.date}
                      </p>

                      <p
                        style={{
                          fontSize: 'clamp(12px, 1.5vw, 13px)',
                          color: '#d1d5db',
                          lineHeight: 1.5,
                          marginBottom: '14px',
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
                              padding: '9px 18px',
                              fontSize: '13px',
                              fontWeight: 700,
                              borderRadius: '8px',
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