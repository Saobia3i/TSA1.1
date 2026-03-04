// lib/performance.ts - Web Vitals Monitoring

export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  navigationType?: string;
}

export const reportWebVitals = (metric: WebVitalsMetric) => {
  const { id, name, value, rating } = metric;
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    const color = rating === 'good' ? '\x1b[32m' : rating === 'needs-improvement' ? '\x1b[33m' : '\x1b[31m';
    console.log(`${color}[${name}]:\x1b[0m`, value, `(${rating})`);
  }
  
  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Option 1: Send to custom API endpoint
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({ id, name, value, rating }),
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(() => {
      // Silently fail
    });
    
    // Option 2: Send to Vercel Analytics (if installed)
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', name, { value, rating });
    }

    // Option 3: Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, {
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        event_category: 'Web Vitals',
        event_label: id,
        non_interaction: true,
      });
    }
  }
};

// Helper to get Web Vitals thresholds
export const getWebVitalsThresholds = () => ({
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
});

// Helper to calculate rating
export const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds = getWebVitalsThresholds();
  const threshold = thresholds[name as keyof typeof thresholds];
  
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};
