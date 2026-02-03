// app/(marketing)/page.tsx
import { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Tensor Security Academy - Professional Cybersecurity & Blockchain Training',
  description: 'Master cybersecurity with hands-on training in ethical hacking, penetration testing, blockchain security, and network security. Industry-recognized certifications, expert instructors, and practical labs for beginners to advanced professionals.',
   other: {
    'description': 'Master cybersecurity with hands-on training in ethical hacking, penetration testing, blockchain security, and network security. Industry-recognized certifications, expert instructors, and practical labs for beginners to advanced professionals.',
  },
  alternates: {
    canonical: 'https://tensorsecurityacademy.com',
  },
  
  openGraph: {
    title: 'Tensor Security Academy - Elite Cybersecurity Training and Professional Services',
    description: 'Transform your career with expert-led cybersecurity training. Learn ethical hacking, penetration testing, and blockchain security from industry professionals.',
    url: 'https://tensorsecurityacademy.com',
    siteName: 'Tensor Security Academy',
    images: [
      {
        url: 'https://tensorsecurityacademy.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tensor Security Academy',
      },
    ],
    locale: 'en_US',

    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Tensor Security Academy - Cybersecurity Training',
    description: 'Master ethical hacking, blockchain security, and penetration testing.',
    images: ['https://tensorsecurityacademy.com/og-image.png'],
  },
   robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://tensorsecurityacademy.com/#webpage',
  url: 'https://tensorsecurityacademy.com',
  name: 'Tensor Security Academy - Cybersecurity Training',
  description: 'Professional cybersecurity and blockchain security training platform.',
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://tensorsecurityacademy.com/#website',
    url: 'https://tensorsecurityacademy.com',
    name: 'Tensor Security Academy',
    publisher: {
      '@type': 'EducationalOrganization',
      '@id': 'https://tensorsecurityacademy.com/#organization',
      name: 'Tensor Security Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ik.imagekit.io/ekb0d0it0/logofinal1.webp',
        width: 600,
        height: 600,
      },
    },
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://tensorsecurityacademy.com',
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  )
}
