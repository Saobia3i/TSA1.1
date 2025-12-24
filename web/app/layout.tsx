import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Global metadata - সব page এ common
  metadataBase: new URL('https://tensorsecurityacademy.com'),
  title: {
    default: 'Tensor Security Academy',
    template: '%s | TSA' // প্রতিটা page এ এভাবে append হবে
  },
  description: 'If you’re ready to step into Cybersecurity but don’t know where to Start, TSA gives you a clear path. We provide 1on1 Mentorship, LIve training, career guidance, Certification support, and hand picked Premium Resources ,everything designed to fast track you into your First Cybersecurity Role. You’ll gain both Offensive and Defensive Security Skills, opening doors to High Demand roles like Penetration Tester, Ethical Hacker, Security Analyst, Malware Developer, SOC Analyst, and Incident Responder. With us, you don’t waste time guessing, you get the exact support and training needed to secure your First Cybersecurity Role with Confidence.',
  keywords: ['general', 'keywords', 'for', 'whole', 'site'],
  authors: [{ name: 'Abrar Jahin' }],
  creator: 'Abrar Jahin',
  publisher: 'Tensor Security Academy',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'TSA',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourhandle',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}