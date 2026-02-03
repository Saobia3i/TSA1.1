'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { getAllNews } from '@/features/news/data/NewsData';

export default function NewsPage() {
  const allNews = getAllNews();
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState<'new' | 'old'>('new');

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = allNews
      .filter((n) => {
        if (!q) return true;
        return (
          n.title.toLowerCase().includes(q) ||
          n.shortDescription.toLowerCase().includes(q)
        );
      })
      .slice()
      .sort((a, b) => {
        const pinDiff = Number(!!b.isPinned) - Number(!!a.isPinned);
        if (pinDiff !== 0) return pinDiff;
        
        const ta = new Date(a.date).getTime();
        const tb = new Date(b.date).getTime();
        return sort === 'new' ? tb - ta : ta - tb;
      });

    return list;
  }, [allNews, searchQuery, sort]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>
        {/* Back Button */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(17, 24, 39, 0.7)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '10px',
              padding: '10px 20px',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '40px',
              fontFamily: 'var(--font-space-mono)',
            }}
          >
            <ArrowLeft style={{ width: '18px', height: '18px' }} />
            Back to Home
          </motion.button>
        </Link>

        {/* Header */}
        <div
          style={{
            textAlign: 'left',
            marginBottom: '50px',
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(34, 211, 238, 0.12)',
              border: '1px solid rgba(34, 211, 238, 0.4)',
              color: '#22d3ee',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              marginBottom: '14px',
              fontFamily: 'var(--font-space-mono)',
            }}
          >
            TSA Newsroom
          </div>
          <h1
            style={{
              fontSize: 'clamp(34px, 5.6vw, 56px)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '14px',
              fontFamily: 'var(--font-space-mono)',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              textShadow: '0 10px 30px rgba(34, 211, 238, 0.2)',
            }}
          >
            News & Updates
          </h1>
          <div
            style={{
              width: '100%',
              height: '4px',
              margin: '0 0 16px',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #22d3ee, #a855f7)',
              boxShadow: '0 6px 16px rgba(168, 85, 247, 0.35)',
              maxWidth: '680px',
            }}
          />
          <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '700px', margin: '0' }}>
            Latest announcements, blogs, webinars and community highlights
          </p>
        </div>

        {/* Search + Sort */}
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto 40px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 180px',
            gap: '14px',
          }}
        >
          <div
            style={{
              position: 'relative',
              backgroundColor: 'rgba(17, 24, 39, 0.7)',
              borderRadius: '12px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              overflow: 'hidden',
            }}
          >
            <Search
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: '#22d3ee',
              }}
            />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '15px',
                outline: 'none',
                fontFamily: 'var(--font-space-mono)',
              }}
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'new' | 'old')}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(17, 24, 39, 0.7)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontFamily: 'var(--font-space-mono)',
              outline: 'none',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
          </select>
        </div>

        {searchQuery && (
          <p style={{ marginBottom: '22px', fontSize: '14px', color: '#9ca3af', textAlign: 'center' }}>
            Found {filtered.length} news item{filtered.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* News Cards Container */}
        {filtered.length > 0 ? (
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              background: 'rgba(17, 24, 39, 0.5)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              padding: 'clamp(20px, 3vw, 32px)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {filtered.map((news, idx) => (
                <div key={news.id}>
                  <Link href={`/news/${news.id}`} style={{ textDecoration: 'none' }}>
                    <motion.article
                      whileHover={{
                        y: -2,
                        boxShadow: '0 15px 30px rgba(34, 211, 238, 0.25)',
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 'clamp(16px, 2.5vw, 24px)',
                        padding: 'clamp(16px, 2.5vw, 20px)',
                        background: 'rgba(17, 24, 39, 0.7)',
                        border: news.isPinned
                          ? '2px solid rgba(34, 211, 238, 0.8)'
                          : '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                      }}
                    >
                      {/* Image */}
                      <div
                        style={{
                          position: 'relative',
                          width: 'clamp(200px, 25vw, 280px)',
                          minWidth: 'clamp(200px, 25vw, 280px)',
                          height: 'clamp(140px, 18vw, 200px)',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={news.heroImages[0]}
                          alt={news.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
                          quality={85}
                        />

                        {news.isPinned && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '5px 10px',
                              borderRadius: '999px',
                              background: 'rgba(255, 255, 255, 0.15)',
                              border: '1.5px solid rgba(255, 255, 255, 0.4)',
                              backdropFilter: 'blur(10px)',
                              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#22d3ee"
                              strokeWidth="2"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 800,
                                color: 'white',
                                textTransform: 'uppercase',
                                fontFamily: 'var(--font-space-mono)',
                              }}
                            >
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                        <div>
                          <p
                            style={{
                              color: '#9ca3af',
                              marginBottom: '10px',
                              fontSize: 'clamp(11px, 1.4vw, 13px)',
                              fontWeight: 600,
                              fontFamily: 'var(--font-space-mono)',
                            }}
                          >
                            {new Date(news.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>

                          <h3
                            style={{
                              fontSize: 'clamp(16px, 2.2vw, 22px)',
                              fontWeight: 800,
                              color: 'white',
                              marginBottom: '10px',
                              fontFamily: 'var(--font-space-mono)',
                              lineHeight: 1.3,
                            }}
                          >
                            {news.title}
                          </h3>

                          <p
                            style={{
                              fontSize: 'clamp(13px, 1.6vw, 15px)',
                              color: '#d1d5db',
                              lineHeight: 1.6,
                              marginBottom: '14px',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {news.shortDescription}
                          </p>
                        </div>

                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(168, 85, 247, 0.15))',
                            border: '2px solid rgba(34, 211, 238, 0.4)',
                            borderRadius: '10px',
                            color: '#22d3ee',
                            fontSize: 'clamp(12px, 1.5vw, 14px)',
                            fontWeight: 700,
                            fontFamily: 'var(--font-space-mono)',
                            alignSelf: 'flex-start',
                          }}
                        >
                          Read Article
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </motion.article>
                  </Link>

                  {idx < filtered.length - 1 && (
                    <div
                      style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                        margin: '24px 0',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#9ca3af' }}>No news found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}