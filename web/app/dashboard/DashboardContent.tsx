'use client';

import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Award } from 'lucide-react';
import Navbar from '@/features/layout/components/Navbar'; // ✅ Same navbar

interface DashboardContentProps {
  user: {
    name: string;
    email: string;
    id: string;
    role: string;
  };
}

export default function DashboardContent({ user }: DashboardContentProps) {
  return (
    <div 
      style={{ 
        backgroundColor: '#0a1929', 
        minHeight: '100vh',
        fontFamily: 'var(--font-nunito)',
      }}
    >
      {/* ✅ Pass user to same Navbar */}
      <Navbar user={{ name: user.name, email: user.email }} />

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 32px 60px' }}>
        
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            padding: '40px',
            background: 'rgba(17, 24, 39, 0.8)',
            backdropFilter: 'blur(30px)',
            borderRadius: '20px',
            border: '2px solid rgba(0, 212, 255, 0.4)',
            boxShadow: '0 0 60px rgba(0, 212, 255, 0.3)',
            marginBottom: '48px',
          }}
        >
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: 800, 
            color: '#ffffff', 
            marginBottom: '16px',
          }}>
            Welcome back, {user.name}!
          </h2>
          <p style={{ fontSize: '16px', color: '#9ca3af' }}>
            Ready to continue your cybersecurity journey?
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {[
            {
              icon: BookOpen,
              title: 'My Courses',
              description: 'View and manage your enrolled courses',
              color: '#00d4ff',
              href: '/dashboard/courses',
            },
            {
              icon: TrendingUp,
              title: 'Progress',
              description: 'Track your learning progress',
              color: '#a855f7',
              href: '/dashboard/progress',
            },
            {
              icon: Award,
              title: 'Certificates',
              description: 'View your earned certificates',
              color: '#ec4899',
              href: '/dashboard/certificates',
            },
          ].map((card, index) => (
            <motion.a
              key={card.title}
              href={card.href}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                boxShadow: `0 0 60px ${card.color}60`,
                borderColor: card.color,
              }}
              style={{
                padding: '36px',
                background: 'rgba(17, 24, 39, 0.8)',
                backdropFilter: 'blur(30px)',
                borderRadius: '20px',
                border: `2px solid ${card.color}40`,
                boxShadow: `0 10px 40px ${card.color}20`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              <card.icon 
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  color: card.color,
                  marginBottom: '20px',
                  filter: `drop-shadow(0 0 15px ${card.color}80)`,
                }} 
              />
              <h3 style={{ 
                fontSize: '22px', 
                fontWeight: 800, 
                color: '#ffffff', 
                marginBottom: '12px',
              }}>
                {card.title}
              </h3>
              <p style={{ 
                fontSize: '15px', 
                color: '#d1d5db', 
                lineHeight: 1.7,
              }}>
                {card.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
