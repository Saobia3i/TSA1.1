import type { Metadata } from "next";
import { Nunito_Sans } from 'next/font/google';
import "./globals.css";

const nunitoSans = Nunito_Sans({
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tensorsecurityacademy.com'),
  
  title: {
    default: 'Tensor Security Academy - Your Path to Cybersecurity Career',
    template: '%s | Tensor Security Academy',
  },
  
  description: 'Fast-track your cybersecurity career with TSA. Get 1-on-1 mentorship, live training, certification support, and premium resources.',
  
  keywords: [
    'cybersecurity training', 
    'ethical hacking course', 
    'penetration testing', 
    'security analyst', 
    'SOC analyst', 
    'cybersecurity mentorship',
  ],
  
  authors: [{ name: 'Abrar Jahin Sachcha' }],
  creator: 'Tensor Security Academy',
  publisher: 'Tensor Security Academy',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tensorsecurityacademy.com',
    siteName: 'Tensor Security Academy',
    title: 'Tensor Security Academy - Your Path to Cybersecurity Career',
    description: 'Fast-track your cybersecurity career with 1-on-1 mentorship, live training, and certification support.',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Tensor Security Academy',
    description: 'Fast-track your cybersecurity career',
    images: ['/og-image.png'],
    creator: '@TensorSecurity',
  },
  
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: 'https://www.tensorsecurityacademy.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={nunitoSans.variable}
        style={{ margin: 0, padding: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
