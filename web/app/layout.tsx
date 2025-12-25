// app/(marketing)/layout.tsx
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://tensorsecurityacademy.com'),
  title: {
    default: 'Tensor Security Academy',
    template: '%s | TSA',
  },
  description: 'If you\'re ready to step into Cybersecurity but don\'t know where to Start, TSA gives you a clear path...',
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
    title: 'Tensor Security Academy',
    description: 'Step into Cybersecurity with TSA!',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TSA Open Graph Image',
      },
    ],
    url: 'https://tensorsecurityacademy.com',
  },
  twitter: {
    card: 'summary_large_image', // Fixed: was 'cardType'
    title: 'Tensor Security Academy',
    description: 'Step into Cybersecurity with TSA!',
    creator: '@yourhandle',
    images: ['/twitter-image.png'], // Simplified format
  },
  icons: {
    icon: '/favicon.ico',
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
