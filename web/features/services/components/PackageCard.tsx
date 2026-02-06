// components/services/PackageCard.tsx
'use client';

import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

interface PackageCardProps {
  pkg: {
    name: string;
    price?: string;
    features: string[];
    highlight?: boolean;
  };
  index: number;
  onSelect?: (packageName: string) => void;
}

export function PackageCard({ pkg, index, onSelect }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -12, boxShadow: '0 30px 60px rgba(34, 211, 238, 0.5)' }}
      style={{
        padding: '40px 32px',
        background: pkg.highlight 
          ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.1))'
          : 'rgba(17, 24, 39, 0.9)',
        border: pkg.highlight 
          ? '3px solid rgba(34, 211, 238, 0.6)' 
          : '2px solid rgba(255, 255, 255, 0.9)',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s ease',
        boxShadow: pkg.highlight 
          ? '0 20px 50px rgba(34, 211, 238, 0.3)' 
          : '0 15px 40px rgba(0, 0, 0, 0.6)'
      }}
    >
      {pkg.highlight && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '24px',
            background: 'transparent',
            border: '2px solid rgba(0, 255, 255, 0.4)',
            padding: '8px 16px',
            borderRadius: '16px',
            gap: '8px',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 700,
            fontFamily: 'var(--font-space-mono)'
          }}
        >
          <Star style={{ width: '14px', height: '14px', display: 'inline' }} />
          MOST POPULAR
        </div>
      )}
      
      <h3
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'white',
          marginBottom: '12px',
          fontFamily: 'var(--font-space-mono)'
        }}
      >
        {pkg.name}
      </h3>
      
      <div
        style={{
          fontSize: '36px',
          fontWeight: 800,
          color: pkg.highlight ? '#22d3ee' : '#fff',
          marginBottom: '32px',
          fontFamily: 'var(--font-space-mono)'
        }}
      >
        {/* {pkg.price} */}
      </div>
      
      <div style={{ flexGrow: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {pkg.features.map((feature, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 0',
                fontSize: '15px',
                color: '#d1d5db',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'var(--font-space-mono)'
              }}
            >
              <Check 
                style={{ 
                  width: '20px', 
                  height: '20px', 
                  color: pkg.highlight ? '#22d3ee' : '#fff',
                  flexShrink: 0
                }} 
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <div
        style={{
          marginTop: 'auto',
          padding: '16px 0 0 0',
          textAlign: 'center'
        }}
      >
        <button
          style={{
            width: '100%',
            padding: '16px 24px',
            background: 'transparent',
            border: pkg.highlight 
              ? '2px solid rgba(34, 211, 238, 0.8)' 
              : '2px solid rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-space-mono)',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: pkg.highlight 
              ? '0 0 20px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)' 
              : '0 0 15px rgba(255, 255, 255, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = pkg.highlight 
              ? '0 0 30px rgba(34, 211, 238, 0.5), inset 0 0 30px rgba(34, 211, 238, 0.2)' 
              : '0 0 25px rgba(255, 255, 255, 0.5), inset 0 0 25px rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = pkg.highlight ? 'rgba(34, 211, 238, 1)' : 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = pkg.highlight 
              ? '0 0 20px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)' 
              : '0 0 15px rgba(255, 255, 255, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = pkg.highlight ? 'rgba(34, 211, 238, 0.8)' : 'rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onClick={() => onSelect?.(pkg.name)}
        >
          Select {pkg.name}
        </button>
      </div>
    </motion.div>
  );
}
