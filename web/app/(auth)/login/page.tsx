// app/(auth)/login/page.tsx
'use client'

import { signIn } from 'next-auth/react'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Lock, LogIn, AlertCircle, CheckCircle } from 'lucide-react'
import { motion } from "framer-motion";

function safeDecodeURIComponent(str: string): string {
  try {
    return decodeURIComponent(str)
  } catch {
    return str
  }
}

function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error')
  const urlSuccess = searchParams.get('success')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else if (result?.ok) {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #0a0a0a 100%);
          padding: 20px;
          font-family: 'Nunito Sans', -apple-system, sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 24px;
          padding: 48px 40px;
          box-shadow: 0 20px 80px rgba(0, 212, 255, 0.2);
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .login-title {
          font-size: 32px;
          font-weight: 900;
          background: linear-gradient(135deg, #00d4ff 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .login-subtitle {
          color: #9ca3af;
          font-size: 15px;
          font-weight: 600;
        }

        .alert {
          padding: 14px 18px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: slideIn 0.3s ease-out;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .alert-success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #22c55e;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          color: #d1d5db;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          background: rgba(17, 24, 39, 0.6);
          border: 1px solid rgba(75, 85, 99, 0.5);
          border-radius: 12px;
          color: white;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.3s ease;
          outline: none;
          font-family: inherit;
        }

        .form-input:focus {
          border-color: #00d4ff;
          box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
          background: rgba(17, 24, 39, 0.8);
        }

        .form-input::placeholder {
          color: #6b7280;
          font-weight: 500;
        }

        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #a855f7 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
          margin-top: 32px;
          font-family: inherit;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 212, 255, 0.5);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .divider {
          text-align: center;
          margin: 32px 0;
          position: relative;
        }

        .divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(75, 85, 99, 0.5), transparent);
        }

        .divider-text {
          position: relative;
          display: inline-block;
          padding: 0 16px;
          background: rgba(0, 0, 0, 0.85);
          color: #6b7280;
          font-size: 13px;
          font-weight: 600;
        }

        .signup-text {
          text-align: center;
          color: #9ca3af;
          font-size: 14px;
          font-weight: 600;
        }

        .signup-link {
          color: #00d4ff;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .signup-link:hover {
          color: #22d3ee;
          text-decoration: underline;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 36px 24px;
          }
          .login-title {
            font-size: 28px;
          }
          .form-input {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Login to continue your journey</p>
          </div>

          {(error || urlError) && (
            <div className="alert alert-error">
              <AlertCircle size={20} />
              <span>{error || (urlError ? safeDecodeURIComponent(urlError) : '')}</span>
            </div>
          )}

          {urlSuccess && (
            <div className="alert alert-success">
              <CheckCircle size={20} />
              <span>{safeDecodeURIComponent(urlSuccess)}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                EMAIL ADDRESS
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="form-input"
                  autoComplete="email"
                  disabled={loading}
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                PASSWORD
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  minLength={8}
                  className="form-input"
                  autoComplete="current-password"
                  disabled={loading}
                />
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              <LogIn size={20} />
              {loading ? 'Logging in...' : 'Login to Account'}
            </button>
          </form>
          {/* Divider */}
<div style={{ 
  display: 'flex', 
  alignItems: 'center', 
  gap: '16px',
  margin: '16px 0' 
}}>
  <div style={{ flex: 1, height: '1px', background: 'rgba(209, 213, 219, 0.3)' }} />
  <span style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 600 }}>OR</span>
  <div style={{ flex: 1, height: '1px', background: 'rgba(209, 213, 219, 0.3)' }} />
</div>

{/* Google Sign In Button */}
<motion.button
  type="button"
  onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
  disabled={loading}
  whileHover={!loading ? { scale: 1.02, boxShadow: '0 4px 20px rgba(66, 133, 244, 0.3)' } : {}}
  whileTap={!loading ? { scale: 0.98 } : {}}
  style={{
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 700,
    borderRadius: '12px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#1f2937',
    cursor: loading ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
    opacity: loading ? 0.6 : 1,
    marginBottom: '8px',
  }}
>
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
  Continue with Google
</motion.button>
          <div className="divider">
            <span className="divider-text">OR</span>
          </div>

          <p className="signup-text">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #0a0a0a 100%)' }} />}>
      <LoginForm />
    </Suspense>
  )
}
