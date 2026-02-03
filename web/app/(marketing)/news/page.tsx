'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';
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
        // pinned always first
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
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px' }}>
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
        <div style={{ maxWidth: '900px', margin: '0 auto 40px', display: 'grid', gridTemplateColumns: '1fr 180px', gap: '14px' }}>
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
              placeholder="Search news by title or description..."
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

        {/* Cards */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '28px',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            {filtered.map((news) => (
              <motion.article
                key={news.id}
                whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(34, 211, 238, 0.35)' }}
                style={{
                  width: '100%',
                  maxWidth: '420px',
                  padding: '24px',
                  background: 'rgba(17, 24, 39, 0.85)',
                  border: news.isPinned ? '2px solid rgba(34, 211, 238, 0.8)' : '2px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                <img
                  src={news.heroImages[0]}
                  alt={news.title}
                  style={{
                    width: '100%',
                    height: '190px',
                    objectFit: 'cover',
                    borderRadius: '14px',
                    marginBottom: '18px',
                  }}
                />

                {news.isPinned && (
                  <div style={{ fontSize: '13px', color: '#22d3ee', fontWeight: 800, marginBottom: '8px' }}>
                    📌 Pinned
                  </div>
                )}

                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 800,
                    color: 'white',
                    marginBottom: '8px',
                    fontFamily: 'var(--font-space-mono)',
                    lineHeight: 1.25,
                    letterSpacing: '0.2px',
                  }}
                >
                  {news.title}
                </h3>

                <p style={{ color: '#9ca3af', marginBottom: '10px', fontSize: '13px' }}>{news.date}</p>

                <p style={{ fontSize: '15px', color: '#d1d5db', lineHeight: 1.7, marginBottom: '18px' }}>
                  {news.shortDescription}
                </p>

                <Link href={`/news/${news.id}`} style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 28px',
                      background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(168, 85, 247, 0.15))',
                      border: '2px solid rgba(34, 211, 238, 0.4)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-space-mono)',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 5px 15px rgba(34, 211, 238, 0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    See more
                  </div>
                </Link>
              </motion.article>
            ))}
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
