// app/(marketing)/layout.tsx
import { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import InstallPrompt from "../components/InstallPrompt";
import RegisterSW from "./RegisterSW";
import PWAUpdateManager from "@/components/PWAUpdateManager";
import { Providers } from "./providers";
import WhatsAppChatBubble from "@/features/home/components/WhatsAppChatBubble";
import ChatBubble from "@/components/ChatBubble";
import { siteConfig } from "@/config/site";

const BASE_URL = "https://tensorsecurityacademy.com";
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "Organization"],
  "@id": `${BASE_URL}/#organization`,
  name: siteConfig.name,
  alternateName: "TSA",
  url: BASE_URL,
  description: siteConfig.description,
  slogan: "Cybersecurity Training and Professional Services",
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
  },
  image: [siteConfig.ogImage, `${BASE_URL}/logo.png`],
  sameAs: [
    siteConfig.links.linkedin,
    siteConfig.links.instagram,
    siteConfig.links.facebook,
    siteConfig.links.x,
    "https://www.youtube.com/@TensorSecurityAcademy",
  ],
  areaServed: "Worldwide",
  knowsAbout: [
    "Cybersecurity Training",
    "Ethical Hacking",
    "Penetration Testing",
    "Blockchain Security",
    "Web Application Security",
    "Network Security",
    "Cloud Security",
    "Security Operations",
    "Incident Response",
    "Cybersecurity Consulting",
  ],
  offers: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Cybersecurity Training",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Cybersecurity Professional Services",
      },
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: {
    "@id": `${BASE_URL}/#organization`,
  },
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/courses?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

// ✅ Export Web Vitals reporting
export { reportWebVitals } from '@/lib/performance';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      "Tensor Security Academy - Cybersecurity & Blockchain Training Platform",
    template: "%s | Tensor Security Academy",
  },
  description:
    siteConfig.description,
  keywords: [
    // Core Cybersecurity Keywords (High Volume)
    "cybersecurity",
    "cyber security training",
    "cybersecurity certification",
    "information security",
    "network security",
    "cyber security courses",
    "ethical hacking",
    "penetration testing",

    // Blockchain & Web3 Security
    "blockchain security",
    "blockchain security training",
    "cryptocurrency security",
    "smart contract security",
    "web3 security",
    "blockchain cybersecurity",

    // Training & Education
    "cybersecurity training online",
    "cyber security courses online",
    "cybersecurity bootcamp",
    "cyber security for beginners",
    "learn cybersecurity",
    "cybersecurity edtech",
    "online security training",

    // Specialized Topics
    "web application security",
    "cloud security training",
    "incident response training",
    "malware analysis course",
    "security operations center",
    "vulnerability assessment",
    "threat intelligence",

    // Tools & Services
    "cybersecurity tools",
    "penetration testing tools",
    "vulnerability scanning",
    "security audit services",
    "cybersecurity consulting",

    // Career & Certification
    "cybersecurity career",
    "cyber security certification online",
    "ethical hacking certification",
    "comptia security+",
    "certified ethical hacker",
    "penetration testing certification",

    // Location-based (if applicable)
    "cybersecurity training Bangladesh",
    "cyber security courses South Asia",
  ],
  authors: [{ name: "Tensor Security Academy" }],
  creator: "Tensor Security Academy",
  publisher: "Tensor Security Academy",
  applicationName: "Tensor Security Academy",
  referrer: "origin-when-cross-origin",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Tensor Security Academy",
    title: "Cybersecurity & Blockchain Training - Tensor Security Academy",
    description:
      siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tensor Security Academy - Professional Cybersecurity Education",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tensor Security Academy - Cybersecurity Training",
    description:
      siteConfig.description,
    creator: "@tensorsecurity",
    images: ["/twitter-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Google Verification (Add your verification code)
  verification: {
    google: "google982b476790b09ef0",
  },

  // Canonical URL
  alternates: {
    canonical: "/", // ✅ Relative path (recommended)
    // OR
    //canonical: BASE_URL, // ✅ Use the variable (no quotes)
  },

  // Additional metadata for better indexing
  category: "Education",
  classification: "Cybersecurity Training Platform",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={nunitoSans.variable}>
      <head>
        {/* Preconnect for ImageKit CDN */}
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="TSA" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon-512.png" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
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
      <body suppressHydrationWarning style={{ margin: 0, padding: 0 }}>
        <Providers>
          <InstallPrompt />
          <RegisterSW />
          {children}
          <WhatsAppChatBubble />
          <ChatBubble />
          <PWAUpdateManager />
        </Providers>
      </body>
    </html>
  );
}
