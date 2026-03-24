// app/(marketing)/page.tsx
import { Metadata } from 'next'
import HomePageClient from './HomePageClient'
import { siteConfig } from '@/config/site'

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
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://tensorsecurityacademy.com/#webpage',
      url: 'https://tensorsecurityacademy.com',
      name: 'Tensor Security Academy - Cybersecurity Training',
      description: siteConfig.description,
      isPartOf: {
        '@id': 'https://tensorsecurityacademy.com/#website',
      },
      about: {
        '@id': 'https://tensorsecurityacademy.com/#organization',
      },
      breadcrumb: {
        '@id': 'https://tensorsecurityacademy.com/#breadcrumb',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: siteConfig.ogImage,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://tensorsecurityacademy.com/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://tensorsecurityacademy.com',
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': 'https://tensorsecurityacademy.com/#highlights',
      name: 'Tensor Security Academy Highlights',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          url: 'https://tensorsecurityacademy.com/courses',
          name: 'Cybersecurity Courses',
        },
        {
          '@type': 'ListItem',
          position: 2,
          url: 'https://tensorsecurityacademy.com/services',
          name: 'Cybersecurity Professional Services',
        },
        {
          '@type': 'ListItem',
          position: 3,
          url: 'https://tensorsecurityacademy.com/tools',
          name: 'Open Source Security Tools',
        },
        {
          '@type': 'ListItem',
          position: 4,
          url: 'https://tensorsecurityacademy.com/about',
          name: 'About Tensor Security Academy',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://tensorsecurityacademy.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Tensor Security Academy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tensor Security Academy is a cybersecurity learning platform that provides hands-on courses, mentorship, practical labs, and cybersecurity professional services.',
          },
        },
        {
          '@type': 'Question',
          name: 'What can users learn at Tensor Security Academy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Users can learn ethical hacking, penetration testing, blockchain security, web application security, network security, cloud security, and other practical cybersecurity topics.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Tensor Security Academy offer cybersecurity services too?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Tensor Security Academy offers cybersecurity professional services alongside its training platform, including security-focused consulting and related service offerings.',
          },
        },
      ],
    },
  ],
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
