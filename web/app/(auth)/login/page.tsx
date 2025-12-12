'use client';

import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { login } from '@/app/actions/auth';

export default function LoginPage() {
  return (
    <div 
      style={{ 
        backgroundColor: '#0a1929', 
        minHeight: '100vh',
        fontFamily: 'var(--font-nunito)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '48px',
          background: 'rgba(17, 24, 39, 0.8)',
          backdropFilter: 'blur(30px)',
          borderRadius: '24px',
          border: '2px solid rgba(34, 211, 238, 0.4)',
          boxShadow: '0 0 60px rgba(34, 211, 238, 0.3)',
        }}
      >
        {/* Back Button */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: '2px solid rgba(34, 211, 238, 0.3)',
              borderRadius: '10px',
              padding: '10px 20px',
              color: '#22d3ee',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: '32px',
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowLeft style={{ width: '18px', height: '18px' }} />
            Back
          </motion.button>
        </Link>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: '36px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '12px',
              letterSpacing: '1px',
            }}
          >
            Welcome Back!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '16px', color: '#d1d5db', fontWeight: 500 }}
          >
            Login to Tensor Security Academy
          </motion.p>
        </div>

        {/* Form */}
        <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: 700, 
              color: '#d1d5db', 
              marginBottom: '8px',
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail 
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
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 48px',
                  fontSize: '16px',
                  border: '2px solid rgba(34, 211, 238, 0.3)',
                  borderRadius: '12px',
                  background: 'rgba(17, 24, 39, 0.6)',
                  color: '#ffffff',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22d3ee';
                  e.target.style.boxShadow = '0 0 20px rgba(34, 211, 238, 0.4)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(34, 211, 238, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: 700, 
              color: '#d1d5db', 
              marginBottom: '8px',
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock 
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
                type="password"
                name="password"
                required
                minLength={6}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 48px',
                  fontSize: '16px',
                  border: '2px solid rgba(34, 211, 238, 0.3)',
                  borderRadius: '12px',
                  background: 'rgba(17, 24, 39, 0.6)',
                  color: '#ffffff',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#22d3ee';
                  e.target.style.boxShadow = '0 0 20px rgba(34, 211, 238, 0.4)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(34, 211, 238, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '18px',
              fontWeight: 700,
              borderRadius: '12px',
              border: '2px solid rgba(34, 211, 238, 0.6)',
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.3), rgba(34, 211, 238, 0.2))',
              backdropFilter: 'blur(10px)',
              color: '#22d3ee',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
              transition: 'all 0.3s ease',
              marginTop: '8px',
            }}
          >
            <LogIn style={{ width: '22px', height: '22px' }} />
            Login
          </motion.button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '15px', color: '#9ca3af' }}>
          No account?{' '}
          <Link 
            href="/signup" 
            style={{ 
              color: '#ec4899', 
              fontWeight: 700, 
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
