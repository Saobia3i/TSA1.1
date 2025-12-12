// app/(auth)/signup/page.tsx
'use client'

import { signup } from '@/app/actions/auth'
import { useState, useTransition, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User as UserIcon, UserPlus, AlertCircle, Phone } from 'lucide-react'

function SignupForm() {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const result = await signup(formData)
      
      if (result.error) {
        setError(result.error)
      } else if (result.success) {
        router.push('/login?success=Account created successfully! Please login.')
      }
    })
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .signup-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #0a0a0a 100%);
          padding: 20px;
        }

        .signup-card {
          width: 100%;
          max-width: 440px;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(236, 72, 153, 0.3);
          border-radius: 24px;
          padding: 48px 40px;
          box-shadow: 0 20px 80px rgba(236, 72, 153, 0.2);
        }

        .signup-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .signup-title {
          font-size: 32px;
          font-weight: 900;
          background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .signup-subtitle {
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

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          color: #d1d5db;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: 0.3px;
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
          z-index: 1;
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
          border-color: #ec4899;
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
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
          background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
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
          box-shadow: 0 4px 20px rgba(236, 72, 153, 0.3);
          margin-top: 32px;
          letter-spacing: 0.3px;
          font-family: inherit;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(236, 72, 153, 0.5);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
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
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .login-text {
          text-align: center;
          color: #9ca3af;
          font-size: 14px;
          font-weight: 600;
        }

        .login-link {
          color: #ec4899;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .login-link:hover {
          color: #f472b6;
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
          .signup-card {
            padding: 36px 24px;
          }
          
          .signup-title {
            font-size: 28px;
          }

          .form-input {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h1 className="signup-title">Create Account</h1>
            <p className="signup-subtitle">Start your cybersecurity journey</p>
          </div>

          {(error || urlError) && (
            <div className="alert alert-error">
              <AlertCircle size={20} strokeWidth={2.5} />
              <span>{error || urlError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                FULL NAME
              </label>
              <div className="input-wrapper">
                <UserIcon className="input-icon" size={20} strokeWidth={2} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  minLength={2}
                  maxLength={50}
                  className="form-input"
                  autoComplete="name"
                  disabled={isPending}
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                EMAIL ADDRESS
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} strokeWidth={2} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="form-input"
                  autoComplete="email"
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact" className="form-label">
                CONTACT NUMBER (Optional)
              </label>
              <div className="input-wrapper">
                <Phone className="input-icon" size={20} strokeWidth={2} />
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className="form-input"
                  autoComplete="tel"
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                PASSWORD
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} strokeWidth={2} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Min 8 chars, 1 uppercase, 1 number, 1 special"
                  required
                  minLength={8}
                  maxLength={128}
                  className="form-input"
                  autoComplete="new-password"
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                CONFIRM PASSWORD
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} strokeWidth={2} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  minLength={8}
                  maxLength={128}
                  className="form-input"
                  autoComplete="new-password"
                  disabled={isPending}
                />
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={isPending}>
              <UserPlus size={20} strokeWidth={2.5} />
              {isPending ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="divider">
            <span className="divider-text">OR</span>
          </div>

          <p className="login-text">
            Already have an account?{' '}
            <Link href="/login" className="login-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #0a0a0a 100%)' }} />}>
      <SignupForm />
    </Suspense>
  )
}
