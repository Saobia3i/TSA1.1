// components/services/ServiceCard.tsx - UPDATED WITH "Learn More" BUTTON
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  icon: LucideIcon;
  slug: string;
}

export function ServiceCard({ title, shortDescription, icon: Icon, slug }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(34, 211, 238, 0.4)' }}
      style={{
        padding: '28px',
        background: 'rgba(17, 24, 39, 0.85)',
        border: '2px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 211, 238, 0.1)'
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(168, 85, 247, 0.2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          border: '2px solid rgba(34, 211, 238, 0.3)'
        }}
      >
        <Icon style={{ width: '32px', height: '32px', color: '#22d3ee' }} />
      </div>
      
      <h3
        style={{
          fontSize: '22px',
          fontWeight: 700,
          color: 'white',
          marginBottom: '16px',
          fontFamily: 'var(--font-space-mono)'
        }}
      >
        {title}
      </h3>
      
      <p
        style={{
          fontSize: '15px',
          color: '#9ca3af',
          lineHeight: 1.7,
          marginBottom: '24px',
          flexGrow: 1
        }}
      >
        {shortDescription}
      </p>
      
      {/* LEARN MORE BUTTON - EXACTLY AS REQUESTED */}
      <Link href={`/services/${slug}`}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 28px',
            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(168, 85, 247, 0.15))',
            border: '2px solid rgba(34, 211, 238, 0.4)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            textDecoration: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-space-mono)',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 15px rgba(34, 211, 238, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          Learn More
        </div>
      </Link>
    </motion.div>
  );
}
