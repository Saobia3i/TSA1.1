"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IconArrowLeft, IconPinnedFilled, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { getNewsById, NewsBlock } from "../data/NewsData";
import { useState, useEffect } from "react";

type NewsDetailsProps = {
  id: number;
};

export default function NewsDetails({ id }: NewsDetailsProps) {
  const news = getNewsById(id);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    if (!news?.heroImages || news.heroImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % news.heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news?.heroImages]);

  const nextSlide = () => {
    if (!news?.heroImages) return;
    setCurrentSlide((prev) => (prev + 1) % news.heroImages.length);
  };

  const prevSlide = () => {
    if (!news?.heroImages) return;
    setCurrentSlide((prev) => (prev - 1 + news.heroImages.length) % news.heroImages.length);
  };

  if (!news) {
    return (
      <section className="page-with-navbar">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
          <Link 
            href="/news"
            className="inline-flex items-center gap-3 btn bg-[var(--color-surface)] hover:bg-[var(--color-primary)] hover:text-[var(--color-btn-primary-text)] border border-[var(--color-border)] text-[var(--color-text)] font-medium px-8 py-4 rounded-[var(--radius-lg)] shadow-lg mb-12"
          >
            <IconArrowLeft className="w-5 h-5" />
            Back to News
          </Link>
          <h2 className="text-[var(--font-size-2xl)] text-[var(--color-text-secondary)] text-center">
            News not found
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="page-with-navbar">
      <article style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px 60px' }}>
        {/* Back Button - Left corner */}
        <div style={{ marginBottom: '48px' }}>
          <Link 
            href="/news"
            className="inline-flex items-center gap-2 group"
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '12px',
              border: '2px solid rgba(34, 211, 238, 0.6)',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15))',
              color: '#22d3ee',
              cursor: 'pointer',
              fontFamily: 'var(--font-family-base)',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(34, 211, 238, 0.4)';
            }}
          >
            <IconArrowLeft className="w-5 h-5" />
            <span>Back to News</span>
          </Link>
        </div>

        {/* Hero Images Carousel */}
        {news.heroImages?.length > 0 && (
          <div
            className="relative overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] border border-[rgba(255,255,255,0.1)] bg-[var(--color-surface)]"
            style={{ marginBottom: '48px' }} // increased spacing from hero to badges
          >
            <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '300px', maxHeight: '500px' }}>
              {news.heroImages.map((img: string, index: number) => (
                <div 
                  key={index}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{ 
                    opacity: index === currentSlide ? 1 : 0,
                    pointerEvents: index === currentSlide ? 'auto' : 'none'
                  }}
                >
                  <Image 
                    src={img}
                    alt={`Hero image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              
              {/* Navigation Arrows */}
              {news.heroImages.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-[var(--duration-normal)] border border-[rgba(255,255,255,0.2)] z-10"
                    aria-label="Previous slide"
                  >
                    <IconChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-[var(--duration-normal)] border border-[rgba(255,255,255,0.2)] z-10"
                    aria-label="Next slide"
                  >
                    <IconChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            
            {/* Dot Indicators */}
            {news.heroImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {news.heroImages.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: index === currentSlide ? '32px' : '12px',
                      height: '12px',
                      background: index === currentSlide 
                        ? 'linear-gradient(to right, var(--color-primary), var(--color-teal-500))'
                        : 'rgba(255, 255, 255, 0.5)',
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Badges Section - Centered with gaps */}
        <header className="mb-16">
          <div 
            className="flex items-center justify-center gap-4 mb-10 flex-wrap"
            style={{ marginTop: '48px' }} // increased gap above badges
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(34, 211, 238, 0.12)',
                border: '1px solid rgba(34, 211, 238, 0.4)',
                color: '#22d3ee',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-family-base)',
              }}
            >
              TSA News
            </span>
            <time className="text-[var(--font-size-lg)] text-white font-medium tracking-wide uppercase">
              {new Date(news.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            {news.isPinned && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #ec4899, #f97316)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'white',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-family-base)',
                  letterSpacing: '0.5px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                🔥 Featured
              </span>
            )}
          </div>
          
          {/* Title with spacing */}
          <h1 
            className="leading-tight mb-6"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 3.4rem)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'var(--font-family-base)',
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
              marginTop: '36px', // increased space above title
            }}
          >
            {news.title}
          </h1>
          <div
            style={{
              width: '100%',
              height: '4px',
              margin: '0 0 24px',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #22d3ee, #a855f7)',
              boxShadow: '0 6px 16px rgba(168, 85, 247, 0.35)',
              maxWidth: '720px',
            }}
          />
          
          {/* Description with spacing */}
          <p 
            className="leading-relaxed max-w-2xl"
            style={{
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-family-base)',
              marginTop: '28px', // increased spacing before description
            }}
          >
            {news.shortDescription}
          </p>
        </header>

        {/* Content Blocks with improved spacing */}
        <div className="news-content" style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {news.content.map((block: NewsBlock, idx: number) => (
            <div key={idx}>
              {block.type === "heading" && (
                <h2 
                  className="relative pb-4 mb-10 mt-16"
                  style={{
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: 800,
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-family-base)',
                    lineHeight: 'var(--line-height-tight)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {block.text}
                  <span 
                    className="block mt-3 rounded"
                    style={{
                      width: '100%',
                      height: '3px',
                      background: 'linear-gradient(to right, var(--color-primary), var(--color-teal-500))'
                    }}
                  />
                </h2>
              )}

              {block.type === "paragraph" && (
                <p 
                  className="mb-8 whitespace-pre-line"
                  style={{
                    fontSize: 'var(--font-size-lg)',
                    color: 'var(--color-gray-200)',
                    lineHeight: 'var(--line-height-normal)',
                    fontFamily: 'var(--font-family-base)',
                    textAlign: 'left'
                  }}
                >
                  {block.text}
                </p>
              )}

              {block.type === "image" && (
                <figure className="my-14">
                  <div className="rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-lg)] border border-[rgba(255,255,255,0.1)]">
                    <Image 
                      src={block.src} 
                      alt={block.caption || "News image"}
                      width={900}
                      height={600}
                      className="w-full h-auto hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {block.caption && (
                    <figcaption 
                      className="mt-4 text-center italic"
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)',
                        fontFamily: 'var(--font-family-base)'
                      }}
                    >
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {block.type === "youtube" && (
                <div className="my-14">
                  <div className="relative w-full rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-lg)] border border-[rgba(255,255,255,0.1)] bg-[var(--color-surface)]">
                    <div style={{ paddingBottom: '56.25%', position: 'relative' }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${(block as any).videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                  </div>
                  <p 
                    className="mt-5 text-center font-medium"
                    style={{
                      fontSize: 'var(--font-size-base)',
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-family-base)'
                    }}
                  >
                    <a 
                      href={`https://youtube.com/watch?v=${(block as any).videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--color-primary)] transition-colors"
                    >
                      Watch on YouTube →
                    </a>
                  </p>
                </div>
              )}

              {block.type === "link" && (
                <a
                  href={(block as any).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block my-12 p-6 rounded-[var(--radius-lg)] border border-[rgba(255,255,255,0.1)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row gap-5 items-start">
                    {(block as any).image && (
                      <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-[var(--radius-md)] overflow-hidden border border-[rgba(255,255,255,0.1)]">
                        <Image 
                          src={(block as any).image} 
                          alt={(block as any).title}
                          width={192}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 
                        className="mb-2 line-clamp-2"
                        style={{
                          fontSize: 'var(--font-size-xl)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--color-text)',
                          fontFamily: 'var(--font-family-base)'
                        }}
                      >
                        {(block as any).title}
                      </h4>
                      <p 
                        className="mb-3 line-clamp-3"
                        style={{
                          fontSize: 'var(--font-size-base)',
                          color: 'var(--color-text-secondary)',
                          lineHeight: 'var(--line-height-normal)',
                          fontFamily: 'var(--font-family-base)'
                        }}
                      >
                        {(block as any).description}
                      </p>
                      <div 
                        className="inline-flex items-center gap-2 font-medium text-sm group-hover:text-[var(--color-primary-hover)] transition-colors"
                        style={{
                          color: 'var(--color-primary)',
                          fontFamily: 'var(--font-family-base)'
                        }}
                      >
                        <span>{new URL((block as any).url).hostname.replace('www.', '')}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              )}
            </div>
          ))}
        </div>

        
      </article>
    </section>
  );
}