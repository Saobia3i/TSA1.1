"use client";
import Link from "next/link";
import Image from "next/image";
import { IconSparkles } from '@tabler/icons-react';
import { NewsItem } from "../data/NewsData";

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Link 
      href={`/news/${news.id}`}
      className="group block"
    >
      <article 
        className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[rgba(255,255,255,0.15)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all duration-[var(--duration-normal)] h-full flex flex-col"
        style={{
          backdropFilter: 'blur(10px)',
          background: 'rgba(38, 40, 40, 0.6)'
        }}
      >
        {/* Hero Image */}
        {news.heroImages && news.heroImages.length > 0 && (
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <Image
              src={news.heroImages[0]}
              alt={news.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Featured Badge - Premium Style */}
            {news.isPinned && (
              <div 
                className="absolute top-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1.5px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                <IconSparkles 
                  className="w-4 h-4" 
                  style={{ 
                    color: 'var(--color-primary)',
                    filter: 'drop-shadow(0 0 8px rgba(50, 184, 198, 0.6))'
                  }} 
                />
                <span 
                  className="text-xs font-[var(--font-weight-bold)] uppercase tracking-wider"
                  style={{
                    color: 'var(--color-white)',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                    fontFamily: 'var(--font-family-base)'
                  }}
                >
                  Featured
                </span>
              </div>
            )}
            
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-60"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Date */}
          <time 
            className="block mb-3 text-sm font-medium tracking-wide uppercase"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-family-base)'
            }}
          >
            {new Date(news.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>

          {/* Title */}
          <h3 
            className="mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-300 line-clamp-2"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text)',
              lineHeight: 'var(--line-height-tight)',
              fontFamily: 'var(--font-family-base)'
            }}
          >
            {news.title}
          </h3>

          {/* Short Description */}
          <p 
            className="mb-4 line-clamp-3 flex-1"
            style={{
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--line-height-normal)',
              fontFamily: 'var(--font-family-base)'
            }}
          >
            {news.shortDescription}
          </p>

          {/* Read More Link */}
          <div 
            className="inline-flex items-center gap-2 font-medium text-sm group-hover:gap-3 transition-all duration-300"
            style={{
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-family-base)'
            }}
          >
            <span>Read More</span>
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}