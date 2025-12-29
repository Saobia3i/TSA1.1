// app/(marketing)/layout.tsx
import { Metadata } from "next";
import "./globals.css";
const BASE_URL = 'https://tensorsecurityacademy.com'; 
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Tensor Security Academy - Cybersecurity & Blockchain Training Platform',
    template: '%s | Tensor Security Academy',
  },
  description: 'Master cybersecurity with hands-on training in ethical hacking, penetration testing, blockchain security, and network security. Industry-recognized certifications, expert instructors, and practical labs for beginners to advanced professionals.',
  keywords: [
    // Core Cybersecurity Keywords (High Volume)
    'cybersecurity',
    'cyber security training',
    'cybersecurity certification',
    'information security',
    'network security',
    'cyber security courses',
    'ethical hacking',
    'penetration testing',
    
    // Blockchain & Web3 Security
    'blockchain security',
    'blockchain security training',
    'cryptocurrency security',
    'smart contract security',
    'web3 security',
    'blockchain cybersecurity',
    
    // Training & Education
    'cybersecurity training online',
    'cyber security courses online',
    'cybersecurity bootcamp',
    'cyber security for beginners',
    'learn cybersecurity',
    'cybersecurity edtech',
    'online security training',
    
    // Specialized Topics
    'web application security',
    'cloud security training',
    'incident response training',
    'malware analysis course',
    'security operations center',
    'vulnerability assessment',
    'threat intelligence',
    
    // Tools & Services
    'cybersecurity tools',
    'penetration testing tools',
    'vulnerability scanning',
    'security audit services',
    'cybersecurity consulting',
    
    // Career & Certification
    'cybersecurity career',
    'cyber security certification online',
    'ethical hacking certification',
    'comptia security+',
    'certified ethical hacker',
    'penetration testing certification',
    
    // Location-based (if applicable)
    'cybersecurity training Bangladesh',
    'cyber security courses South Asia',
  ],
  authors: [{ name: 'Tensor Security Academy' }],
  creator: 'Tensor Security Academy',
  publisher: 'Tensor Security Academy',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Tensor Security Academy',
    title: 'Cybersecurity & Blockchain Training - Tensor Security Academy',
    description: 'Learn cybersecurity and blockchain security through hands-on courses, industry certifications, and practical labs. Expert-led training for ethical hacking, penetration testing, and security operations.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tensor Security Academy - Professional Cybersecurity Education',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Tensor Security Academy - Cybersecurity Training',
    description: 'Master ethical hacking, blockchain security, and penetration testing with industry-leading courses and certifications.',
    creator: '@tensorsecurity',
    images: ['/twitter-image.png'],
  },
  
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  
  // Google Verification (Add your verification code)
  verification: {
    google: 'google982b476790b09ef0',
  },
  
  // Canonical URL
  alternates: {
    canonical: 'BASE_URL',
  },
  
  // Additional metadata for better indexing
  category: 'Education',
  classification: 'Cybersecurity Training Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Tensor Security Academy',
              description: 'Professional cybersecurity and blockchain security training platform',
              url: BASE_URL,
              logo: `${BASE_URL}/logo.png`,
              sameAs: [
                'https://x.com/Tensor_Security"',
                'https://www.linkedin.com/company/tensorsecurityacademy',
              ],
              offers: {
                '@type': 'AggregateOffer',
                itemOffered: [
                  {
                    '@type': 'Course',
                    name: 'Cybersecurity Training',
                    description: 'Comprehensive cybersecurity courses',
                    provider: {
                      '@type': 'Organization',
                      name: 'Tensor Security Academy',
                    },
                  },
                  {
                    '@type': 'Course',
                    name: 'Blockchain Security Training',
                    description: 'Specialized blockchain and cryptocurrency security',
                    provider: {
                      '@type': 'Organization',
                      name: 'Tensor Security Academy',
                    },
                  },
                ],
              },
              areaServed: 'Worldwide',
              availableLanguage: 'English',
            }),
          }}
        />
 {/* CRITICAL FIX: Render-blocking CSS inline (150ms → 0ms) */}
  <style id="critical-css">{`
    /* Hero + Featured courses critical styles only */
    .hero-section,.featured-grid{min-height:60vh;display:flex;align-items:center;justify-content:center}
    .hero-title{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.1}
    .course-card{background:linear-gradient(145deg,#1e293b,#334155);border-radius:1rem;padding:2rem}
    .grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
    .container{max-width:1200px;margin:0 auto;padding:0 1.5rem}
    .text-white{color:#fff}
    .mb-6{margin-bottom:1.5rem}
  `}</style>
  


      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
