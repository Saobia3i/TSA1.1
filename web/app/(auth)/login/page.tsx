// app/(auth)/login/page.tsx
import { login } from '@/app/actions/auth';
import Link from 'next/link';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) {
  return (
    <>
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #0a0a0a 100%);
          padding: 20px;
          font-family: var(--font-nunito), sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
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
          background-clip: text;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
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
          border-color: #00d4ff;
          box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
          background: rgba(17, 24, 39, 0.8);
        }

        .form-input::placeholder {
          color: #6b7280;
        }

        .forgot-password {
          text-align: right;
          margin-top: 8px;
        }

        .forgot-link {
          color: #a855f7;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .forgot-link:hover {
          color: #c084fc;
          text-decoration: underline;
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
          font-family: var(--font-nunito), sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
          margin-top: 32px;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 212, 255, 0.5);
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
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Login to continue your journey</p>
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
          <form action={login}>
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
                  placeholder="Enter your password"
                  required
                  className="form-input"
                  autoComplete="current-password"
                />
              </div>
              <div className="forgot-password">
                <Link href="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              <LogIn size={20} strokeWidth={2.5} />
              Login to Account
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span className="divider-text">OR</span>
          </div>

          {/* Signup Link */}
          <p className="signup-text">
            Don't have an account?{' '}
            <Link href="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
