'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface EnrollmentFormProps {
  courseId: string;
  courseName: string;
  coursePrice?: number;
  courseDescription?: string;
}

export default function EnrollmentForm({
  courseId,
  courseName,
  coursePrice,
  courseDescription,
}: EnrollmentFormProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check authentication
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=/courses/${courseId}`);
      return;
    }

    setIsEnrolling(true);
    setError('');

    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          courseName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Enrollment failed');
      }

      // Success!
      setSuccess(true);
      
      // Wait 2 seconds then redirect
      setTimeout(() => {
        router.push('/dashboard/my-courses');
        router.refresh();
      }, 2000);

    } catch (err) {
      console.error('Enrollment error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  // Success State
  if (success) {
    return (
      <div className="enrollment-card success-state">
        <div className="success-content">
          <div className="success-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-teal-300"/>
              <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300"/>
            </svg>
          </div>
          <h3 className="success-title">🎉 Enrollment Successful!</h3>
          <p className="success-message">
            You've been enrolled in <strong>{courseName}</strong>
          </p>
          <p className="redirect-message">
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="enrollment-card">
      {/* Card Header */}
      <div className="card-header">
        <div className="glow-dot"></div>
        <h3 className="card-title">Enroll in This Course</h3>
      </div>

      {/* Course Info */}
      <div className="course-info">
        <h4 className="course-name">{courseName}</h4>
        
        {coursePrice && (
          <div className="price-tag">
            <span className="currency">৳</span>
            <span className="amount">{coursePrice.toLocaleString()}</span>
          </div>
        )}

        {courseDescription && (
          <p className="course-description">{courseDescription}</p>
        )}
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <h5 className="benefits-title">What You'll Get:</h5>
        <ul className="benefits-list">
          <li>
            <span className="check-icon">✓</span>
            <span>Lifetime access to course materials</span>
          </li>
          <li>
            <span className="check-icon">✓</span>
            <span>Certificate of completion</span>
          </li>
          <li>
            <span className="check-icon">✓</span>
            <span>24/7 support from instructors</span>
          </li>
          <li>
            <span className="check-icon">✓</span>
            <span>Access to exclusive community</span>
          </li>
        </ul>
      </div>

      {/* Enrollment Form */}
      <form onSubmit={handleEnroll} className="enrollment-form">
        {error && (
          <div className="error-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* User Info Display (if logged in) */}
        {session?.user && (
          <div className="user-info">
            <div className="info-row">
              <span className="label">Name:</span>
              <span className="value">{session.user.name || 'Not provided'}</span>
            </div>
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{session.user.email}</span>
            </div>
          </div>
        )}

        {/* Enroll Button */}
        <button
          type="submit"
          disabled={isEnrolling || status === 'loading'}
          className="enroll-button"
        >
          {isEnrolling ? (
            <>
              <span className="spinner"></span>
              <span>Enrolling...</span>
            </>
          ) : status === 'loading' ? (
            <span>Loading...</span>
          ) : status === 'unauthenticated' ? (
            <>
              <span>Login to Enroll</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          ) : (
            <>
              <span>Enroll Now</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>

        {status === 'unauthenticated' && (
          <p className="login-hint">
            You'll be redirected to login page
          </p>
        )}
      </form>

      {/* Trust Badges */}
      <div className="trust-section">
        <div className="trust-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span>Secure Enrollment</span>
        </div>
        <div className="trust-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Instant Access</span>
        </div>
      </div>

      <style jsx>{`
        /* ============================================
           ENROLLMENT CARD - THEME MATCHED
           ============================================ */
        
        .enrollment-card {
          background: rgba(38, 40, 40, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(50, 184, 198, 0.2);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(50, 184, 198, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .enrollment-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(50, 184, 198, 0.1) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .enrollment-card:hover::before {
          opacity: 1;
        }

        /* ============================================
           CARD HEADER
           ============================================ */
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(119, 124, 124, 0.2);
        }

        .glow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #32B8C6, #21808D);
          box-shadow: 
            0 0 10px rgba(50, 184, 198, 0.6),
            0 0 20px rgba(50, 184, 198, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #F5F5F5;
          margin: 0;
          letter-spacing: -0.01em;
        }

        /* ============================================
           COURSE INFO
           ============================================ */
        
        .course-info {
          margin-bottom: 24px;
        }

        .course-name {
          font-size: 20px;
          font-weight: 600;
          color: #F5F5F5;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .price-tag {
          display: inline-flex;
          align-items: baseline;
          gap: 4px;
          padding: 8px 16px;
          background: linear-gradient(135deg, 
            rgba(50, 184, 198, 0.15),
            rgba(33, 128, 141, 0.15)
          );
          border: 1px solid rgba(50, 184, 198, 0.3);
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .currency {
          font-size: 20px;
          font-weight: 600;
          color: #32B8C6;
        }

        .amount {
          font-size: 28px;
          font-weight: 700;
          color: #32B8C6;
          letter-spacing: -0.02em;
        }

        .course-description {
          font-size: 14px;
          color: rgba(245, 245, 245, 0.7);
          line-height: 1.5;
          margin-top: 12px;
        }

        /* ============================================
           BENEFITS SECTION
           ============================================ */
        
        .benefits-section {
          background: rgba(50, 184, 198, 0.05);
          border: 1px solid rgba(50, 184, 198, 0.15);
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .benefits-title {
          font-size: 14px;
          font-weight: 600;
          color: #32B8C6;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .benefits-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: rgba(245, 245, 245, 0.85);
        }

        .check-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #32B8C6, #21808D);
          color: #13343B;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }

        /* ============================================
           USER INFO
           ============================================ */
        
        .user-info {
          background: rgba(19, 52, 59, 0.4);
          border: 1px solid rgba(50, 184, 198, 0.2);
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .info-row .label {
          color: rgba(245, 245, 245, 0.6);
          font-weight: 500;
        }

        .info-row .value {
          color: #F5F5F5;
          font-weight: 600;
        }

        /* ============================================
           ENROLL BUTTON
           ============================================ */
        
        .enroll-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 24px;
          background: linear-gradient(135deg, #32B8C6, #21808D);
          color: #13343B;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 4px 12px rgba(50, 184, 198, 0.3),
            0 0 0 1px rgba(50, 184, 198, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .enroll-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s ease;
        }

        .enroll-button:hover::before {
          left: 100%;
        }

        .enroll-button:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 6px 20px rgba(50, 184, 198, 0.4),
            0 0 0 1px rgba(50, 184, 198, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .enroll-button:active {
          transform: translateY(0);
        }

        .enroll-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .enroll-button:disabled:hover {
          transform: none;
          box-shadow: 
            0 4px 12px rgba(50, 184, 198, 0.3),
            0 0 0 1px rgba(50, 184, 198, 0.2);
        }

        /* ============================================
           SPINNER
           ============================================ */
        
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(19, 52, 59, 0.3);
          border-top-color: #13343B;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ============================================
           ERROR MESSAGE
           ============================================ */
        
        .error-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.3);
          border-radius: 8px;
          color: #FCA5A5;
          font-size: 14px;
          margin-bottom: 16px;
        }

        .error-message svg {
          flex-shrink: 0;
          color: #DC2626;
        }

        /* ============================================
           SUCCESS STATE
           ============================================ */
        
        .enrollment-card.success-state {
          border-color: rgba(50, 184, 198, 0.4);
        }

        .success-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 0;
        }

        .success-icon {
          margin-bottom: 16px;
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .success-title {
          font-size: 24px;
          font-weight: 700;
          color: #32B8C6;
          margin-bottom: 12px;
        }

        .success-message {
          font-size: 16px;
          color: rgba(245, 245, 245, 0.85);
          margin-bottom: 8px;
        }

        .success-message strong {
          color: #F5F5F5;
          font-weight: 600;
        }

        .redirect-message {
          font-size: 14px;
          color: rgba(245, 245, 245, 0.6);
        }

        /* ============================================
           LOGIN HINT
           ============================================ */
        
        .login-hint {
          text-align: center;
          font-size: 12px;
          color: rgba(245, 245, 245, 0.5);
          margin-top: 8px;
        }

        /* ============================================
           TRUST SECTION
           ============================================ */
        
        .trust-section {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(119, 124, 124, 0.2);
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: rgba(245, 245, 245, 0.6);
        }

        .trust-badge svg {
          color: #32B8C6;
        }

        /* ============================================
           RESPONSIVE
           ============================================ */
        
        @media (max-width: 480px) {
          .enrollment-card {
            padding: 20px;
          }

          .card-title {
            font-size: 16px;
          }

          .course-name {
            font-size: 18px;
          }

          .amount {
            font-size: 24px;
          }

          .enroll-button {
            padding: 12px 20px;
            font-size: 15px;
          }

          .trust-section {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}