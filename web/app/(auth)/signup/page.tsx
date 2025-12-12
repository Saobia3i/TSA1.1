// app/(auth)/signup/page.tsx
import { signup } from '@/app/actions/auth';
import Link from 'next/link';
import { Mail, Lock, User as UserIcon, UserPlus } from 'lucide-react';

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) {
  return (
    <>
      <style>{`
        .signup-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #0a0a0a 100%);
          padding: 20px;
          font-family: var(--font-nunito), sans-serif;
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
          letter-spacing: 0.5px;
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
          font-family: var(--font-nunito), sans-serif;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus {
          border-color: #ec4899;
          box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
          background: rgba(17, 24, 39, 0.8);
        }

        .form-input::placeholder {
          color: #6b7280;
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
          font-family: var(--font-nunito), sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 20px rgba(236, 72, 153, 0.3);
          margin-top: 32px;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(236, 72, 153, 0.5);
        }

        .submit-button:active {
          transform: translateY(0);
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
        }
      `}</style>

      <div className="signup-container">
        <div className="signup-card">
          {/* Header */}
          <div className="signup-header">
            <h1 className="signup-title">Create Account</h1>
            <p className="signup-subtitle">Start your cybersecurity journey</p>
          </div>

          {/* Error/Success Messages */}
          {searchParams.error && (
            <div className="alert alert-error">
              {searchParams.error}
            </div>
          )}

          {searchParams.success && (
            <div className="alert alert-success">
              {searchParams.success}
            </div>
          )}

          {/* Form */}
          <form action={signup}>
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <div className="input-wrapper">
                <UserIcon className="input-icon" size={20} strokeWidth={2} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="form-input"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
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
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} strokeWidth={2} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                  className="form-input"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
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
                  className="form-input"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              <UserPlus size={20} strokeWidth={2.5} />
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span className="divider-text">OR</span>
          </div>

          {/* Login Link */}
          <p className="login-text">
            Already have an account?{' '}
            <Link href="/login" className="login-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
