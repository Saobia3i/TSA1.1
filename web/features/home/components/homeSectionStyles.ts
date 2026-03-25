import type { CSSProperties } from 'react';

export const sectionTitleStyle: CSSProperties = {
  fontSize: 'clamp(32px, 5vw, 48px)',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '12px',
  fontFamily: 'var(--font-nunito)',
  letterSpacing: '-0.5px',
  lineHeight: 1.15,
};

export const sectionSubtitleStyle: CSSProperties = {
  fontSize: 'clamp(14px, 2vw, 16px)',
  color: '#9ca3af',
  fontFamily: 'var(--font-nunito)',
  fontWeight: 500,
  lineHeight: 1.6,
  maxWidth: '680px',
  margin: '0 auto',
};

export const homePreviewButtonBaseStyle: CSSProperties = {
  width: 'clamp(170px, 18vw, 190px)',
  minHeight: '46px',
  padding: 'clamp(10px, 1.8vw, 12px) clamp(20px, 3.5vw, 26px)',
  fontSize: 'clamp(12px, 1.6vw, 13px)',
  fontWeight: 600,
  borderRadius: '10px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  whiteSpace: 'nowrap',
  textAlign: 'center',
};

export const homePreviewButtonStyle: CSSProperties = {
  ...homePreviewButtonBaseStyle,
  border: '2px solid rgba(34, 211, 238, 0.6)',
  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15))',
  color: '#ffffff',
  cursor: 'pointer',
  fontFamily: 'var(--font-nunito)',
  boxShadow: '0 0 14px rgba(34, 211, 238, 0.32)',
  transition: 'all 0.3s ease',
};

export const homePreviewCardButtonStyle: CSSProperties = {
  ...homePreviewButtonStyle,
  alignSelf: 'center',
};

export const primarySectionButtonStyle: CSSProperties = {
  ...homePreviewButtonStyle,
  padding: 'clamp(10px, 1.8vw, 12px) clamp(20px, 3.5vw, 26px)',
};

export const pageTitleStyle: CSSProperties = {
  ...sectionTitleStyle,
  fontSize: 'clamp(32px, 5vw, 48px)',
  marginBottom: '16px',
  textAlign: 'center',
};

export const pageSubtitleStyle: CSSProperties = {
  ...sectionSubtitleStyle,
  fontSize: 'clamp(14px, 2vw, 16px)',
  textAlign: 'center',
  margin: '0 auto',
};

export const backButtonStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '10px 20px',
  fontSize: '14px',
  fontWeight: 600,
  borderRadius: '10px',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  background: 'rgba(17, 24, 39, 0.7)',
  color: '#ffffff',
  cursor: 'pointer',
  fontFamily: 'var(--font-nunito)',
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  lineHeight: 1,
};
