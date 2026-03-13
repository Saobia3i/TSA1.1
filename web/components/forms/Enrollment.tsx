'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { COUNTRY_CODES } from './enrollment/countryCodes';

interface EnrollmentFormProps {
  courseId: string;
  courseSlug?: string;
  courseName: string;
  courseDescription?: string;
  onSuccessChange?: (success: boolean) => void;
}

export default function EnrollmentForm({
  courseId,
  courseSlug,
  courseName,
  courseDescription,
  onSuccessChange,
}: EnrollmentFormProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState('+880');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const hasAutoSubmittedRef = useRef(false);
  const pendingStorageKey = useMemo(() => `tsa:pending-enrollment:${courseId}`, [courseId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pendingRaw = window.sessionStorage.getItem(pendingStorageKey);
    if (pendingRaw) {
      try {
        const pending = JSON.parse(pendingRaw) as {
          countryCode?: string;
          whatsappNumber?: string;
        };
        if (pending.countryCode) setCountryCode(pending.countryCode);
        if (pending.whatsappNumber) setWhatsappNumber(pending.whatsappNumber);
      } catch {
        window.sessionStorage.removeItem(pendingStorageKey);
      }
    }

    const savedContact = session?.user?.contact?.trim();
    if (!savedContact) return;

    const match = savedContact.match(/^(\+\d{1,4})(\d+)$/);
    if (!match) {
      setWhatsappNumber(savedContact.replace(/[^\d]/g, ''));
      return;
    }

    setCountryCode(match[1]);
    setWhatsappNumber(match[2]);
  }, [pendingStorageKey, session?.user?.contact]);

  const loginCallbackUrl = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (courseSlug) {
      params.set('openCourse', courseSlug);
      params.set('openEnrollment', '1');
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [courseSlug, pathname, searchParams]);

  const submitEnrollment = useCallback(async (cleanWhatsappNumber: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const resolvedDialCode = countryCode.replace(/-[A-Z]{2}$/, '');

    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          courseName,
          whatsappCountryCode: resolvedDialCode,
          whatsappNumber: cleanWhatsappNumber,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message =
          payload?.error ||
          (response.status === 401
            ? 'Please login to enroll.'
            : 'Enrollment failed. Please try again.');
        throw new Error(message);
      }

      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(pendingStorageKey);
      }

      setSuccess(true);
      onSuccessChange?.(true);
    } finally {
      clearTimeout(timeoutId);
    }
  }, [countryCode, courseId, courseName, onSuccessChange, pendingStorageKey]);

  useEffect(() => {
    if (status !== 'authenticated' || hasAutoSubmittedRef.current || success) return;
    if (typeof window === 'undefined') return;

    const pendingRaw = window.sessionStorage.getItem(pendingStorageKey);
    if (!pendingRaw) return;

    try {
      const pending = JSON.parse(pendingRaw) as { whatsappNumber?: string };
      const cleanWhatsappNumber = pending.whatsappNumber?.replace(/[^\d]/g, '') || '';
      if (cleanWhatsappNumber.length < 6) {
        window.sessionStorage.removeItem(pendingStorageKey);
        return;
      }

      hasAutoSubmittedRef.current = true;
      setIsEnrolling(true);
      setError('');
      void submitEnrollment(cleanWhatsappNumber)
        .catch((err) => {
          console.error('Enrollment error:', err);
          onSuccessChange?.(false);
          if (err instanceof DOMException && err.name === 'AbortError') {
            setError('Request timed out. Please try again.');
          } else {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
          }
          hasAutoSubmittedRef.current = false;
        })
        .finally(() => setIsEnrolling(false));
    } catch {
      window.sessionStorage.removeItem(pendingStorageKey);
    }
  }, [pendingStorageKey, status, submitEnrollment, success, onSuccessChange]);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEnrolling(true);
    setError('');

    try {
      const dialCode = countryCode.replace(/-[A-Z]{2}$/, '');
      if (!dialCode.match(/^\+\d{1,4}$/)) throw new Error('Select a valid country code.');
      const cleanWhatsappNumber = whatsappNumber.replace(/[^\d]/g, '');
      if (cleanWhatsappNumber.length < 6) throw new Error('WhatsApp number is required.');

      if (status === 'unauthenticated') {
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(
            pendingStorageKey,
            JSON.stringify({ courseId, courseName, countryCode, whatsappNumber: cleanWhatsappNumber })
          );
        }
        router.push(`/login?callbackUrl=${encodeURIComponent(loginCallbackUrl)}`);
        return;
      }

      await submitEnrollment(cleanWhatsappNumber);
    } catch (err) {
      console.error('Enrollment error:', err);
      onSuccessChange?.(false);
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  if (success) return (
    <div className="enrollment-card success-state">
      <div className="success-content">
        <div className="success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#32B8C6" strokeWidth="2"/>
            <path d="M8 12l2 2 4-4" stroke="#32B8C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="success-title">Enrollment Request Successful!</h3>
        <p className="success-message">we have received your enrollment request. we will contact you soon.</p>
      </div>
    </div>
  );

  return (
    <div className="enrollment-card">
      <div className="card-header">
        <div className="glow-dot"></div>
        <h3 className="card-title">Enroll in This Course</h3>
      </div>

      <div className="course-info">
        <h4 className="course-name">{courseName}</h4>
        {courseDescription && <p className="course-description">{courseDescription}</p>}
      </div>

      <div className="benefits-section">
        <h5 className="benefits-title">What You&apos;ll Get:</h5>
        <ul className="benefits-list">
          {[
            'Lifetime access to course materials',
            'Certificate of completion',
            '24/7 support from instructors',
            'Access to exclusive community',
          ].map((benefit) => (
            <li key={benefit}>
              <span className="check-icon">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

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

        <div className="whatsapp-grid">
          <div className="field-group field-group-code">
            <label htmlFor="countryCode" className="field-label">Country Code</label>
            <select
              id="countryCode"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="field-input field-select"
              required
            >
              {COUNTRY_CODES.map((option) => (
                <option key={`${option.value}-${option.label}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field-group">
            <label htmlFor="whatsappNumber" className="field-label">WhatsApp Number</label>
            <input
              id="whatsappNumber"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="1712345678"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="field-input"
              required
            />
          </div>
        </div>

        <p className="field-note">
          {status === 'unauthenticated'
            ? 'First time only: enter WhatsApp and continue to login. After login, enrollment will be submitted automatically.'
            : 'Your WhatsApp number will be saved for enrollment follow-up and shown in the dashboard.'}
        </p>

        <button
          type="submit"
          disabled={isEnrolling || status === 'loading'}
          className="enroll-button"
        >
          {isEnrolling ? (
            <><span className="spinner"></span><span>Enrolling...</span></>
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
              <span>Request Enrollment</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>

        {status === 'unauthenticated' && (
          <p className="login-hint">
            You&apos;ll be redirected to login and then enrollment will continue automatically.
          </p>
        )}
      </form>

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
        .enrollment-card { background: rgba(38, 40, 40, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(50, 184, 198, 0.2); border-radius: 12px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(50,184,198,0.1), inset 0 1px 0 rgba(255,255,255,0.05); position: relative; overflow: hidden; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
        .enrollment-card::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(50,184,198,0.1) 0%, transparent 70%); opacity: 0; transition: opacity 0.5s ease; pointer-events: none; }
        .enrollment-card:hover::before { opacity: 1; }
        .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid rgba(119,124,124,0.2); }
        .glow-dot { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg,#32B8C6,#21808D); box-shadow: 0 0 10px rgba(50,184,198,0.6), 0 0 20px rgba(50,184,198,0.3); animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.8; } }
        .card-title { font-size: 18px; font-weight: 600; color: #F5F5F5; margin: 0; letter-spacing: -0.01em; }
        .course-info { margin-bottom: 24px; }
        .course-name { font-size: 20px; font-weight: 600; color: #F5F5F5; margin-bottom: 12px; line-height: 1.3; }
        .course-description { font-size: 14px; color: rgba(245,245,245,0.7); line-height: 1.5; margin-top: 12px; }
        .benefits-section { background: rgba(50,184,198,0.05); border: 1px solid rgba(50,184,198,0.15); border-radius: 10px; padding: 16px; margin-bottom: 24px; }
        .benefits-title { font-size: 14px; font-weight: 600; color: #32B8C6; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
        .benefits-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .benefits-list li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: rgba(245,245,245,0.85); }
        .check-icon { display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg,#32B8C6,#21808D); color: #13343B; font-size: 12px; font-weight: 700; flex-shrink: 0; }
        .user-info { background: rgba(19,52,59,0.4); border: 1px solid rgba(50,184,198,0.2); border-radius: 8px; padding: 12px; margin-bottom: 16px; display: flex; flex-direction: column; gap: 8px; }
        .info-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
        .info-row .label { color: rgba(245,245,245,0.6); font-weight: 500; }
        .info-row .value { color: #F5F5F5; font-weight: 600; }
        .whatsapp-grid { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 12px; margin-bottom: 12px; }
        .field-group { display: flex; flex-direction: column; gap: 8px; }
        .field-group-code { min-width: 0; }
        .field-label { color: rgba(245,245,245,0.72); font-size: 12px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
        .field-input { width: 100%; border: 1px solid rgba(50,184,198,0.22); border-radius: 10px; background: rgba(19,52,59,0.42); color: #F5F5F5; padding: 13px 14px; font-size: 14px; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .field-select { appearance: none; }
        .field-input:focus { border-color: rgba(50,184,198,0.7); box-shadow: 0 0 0 3px rgba(50,184,198,0.12); }
        .field-note { margin: 0 0 16px; color: rgba(245,245,245,0.6); font-size: 12px; line-height: 1.5; }
        .enroll-button { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 24px; background: linear-gradient(135deg,#32B8C6,#21808D); color: #13343B; font-size: 16px; font-weight: 600; border: none; border-radius: 10px; cursor: pointer; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); position: relative; overflow: hidden; box-shadow: 0 4px 12px rgba(50,184,198,0.3), 0 0 0 1px rgba(50,184,198,0.2), inset 0 1px 0 rgba(255,255,255,0.2); }
        .enroll-button::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent); transition: left 0.5s ease; }
        .enroll-button:hover::before { left: 100%; }
        .enroll-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(50,184,198,0.4), 0 0 0 1px rgba(50,184,198,0.3), inset 0 1px 0 rgba(255,255,255,0.3); }
        .enroll-button:active { transform: translateY(0); }
        .enroll-button:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .enroll-button:disabled:hover { transform: none; box-shadow: 0 4px 12px rgba(50,184,198,0.3), 0 0 0 1px rgba(50,184,198,0.2); }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(19,52,59,0.3); border-top-color: #13343B; border-radius: 50%; animation: spin 0.6s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .error-message { display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.3); border-radius: 8px; color: #FCA5A5; font-size: 14px; margin-bottom: 16px; }
        .error-message svg { flex-shrink: 0; color: #DC2626; }
        .login-hint { text-align: center; font-size: 12px; color: rgba(245,245,245,0.5); margin-top: 8px; }
        .trust-section { display: flex; justify-content: center; gap: 16px; margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(119,124,124,0.2); }
        .trust-badge { display: flex; align-items: center; gap: 6px; font-size: 12px; color: rgba(245,245,245,0.6); }
        .trust-badge svg { color: #32B8C6; }
        @media (max-width: 480px) {
          .enrollment-card { padding: 20px; }
          .card-title { font-size: 16px; }
          .course-name { font-size: 18px; }
          .whatsapp-grid { grid-template-columns: 1fr; }
          .enroll-button { padding: 12px 20px; font-size: 15px; }
          .trust-section { flex-direction: column; gap: 8px; }
        }
      `}</style>
    </div>
  );
}
