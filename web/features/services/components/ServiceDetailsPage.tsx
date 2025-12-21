// features/services/ServiceDetailsPage.tsx - FIXED COMPONENT (renamed from previous)
'use client';

import { PackageCard } from '../components/PackageCard';
import Link from 'next/link';
import { ArrowLeft, Calendar  } from 'lucide-react';
import type { Service } from '../data/services';

interface ServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  packages: Service['packages'];
}

interface Props {
  service: ServiceData;
}

export default function ServiceDetailsPage({ service }: Props) {

  return (
    <div style={{ 
      // background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)', 
      minHeight: '100vh', 
      paddingTop: '90px',
      overflowX: 'hidden'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        {/* Back Button */}
        <Link href="/services" style={{ textDecoration: 'none', display: 'inline-flex', marginBottom: '60px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(17, 24, 39, 0.7)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              padding: '14px 24px',
              color: 'white',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-space-mono)',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            <ArrowLeft style={{ width: '20px', height: '20px' }} />
            Back to Services
          </div>
        </Link>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1
            style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '20px',
              fontFamily: 'var(--font-space-mono)',
              textShadow: '0 0 30px rgba(34, 211, 238, 0.5)'
            }}
          >
            {service.title}
          </h1>
          
          {/* <p
            style={{
              fontSize: '18px',
              color: '#fff',
              maxWidth: '800px',
              margin: '0 auto 40px',
              lineHeight: 1.7,
              fontFamily: 'var(--font-space-mono)'
            }}
          >
            {service.shortDescription}
          </p> */}
          
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(34, 211, 238, 0.8)',
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '1200px',
              margin: '0 auto',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 20px rgba(34, 211, 238, 0.4)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.6)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 20px rgba(34, 211, 238, 0.4)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.6)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
              
            }}
          >
            <p
              style={{
                fontSize: '18px',
                color: '#fff',
                lineHeight: 1.7,
                fontFamily: 'var(--font-space-mono)',
                margin: '20px 0',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              {service.shortDescription}
            </p>
            <p
              style={{
                fontSize: '16px',
                color: '#fff',
                lineHeight: 1.8,
                fontFamily: 'var(--font-space-mono)',
                margin: '20px 0',
                textAlign: 'center'
              }}
            >
              {service.longDescription}
            </p>
          </div>
        </div>

        {/* Packages Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '16px', fontFamily: 'var(--font-space-mono)' }}>
            Choose Your Package
          </h2>
          <p style={{ fontSize: '16px', color: '#9ca3af', fontFamily: 'var(--font-space-mono)' }}>
            Select the perfect plan for your security needs
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '28px', maxWidth: '1200px', margin: '0 auto' }}>
          {service.packages.map((pkg, index) => (
            <PackageCard key={pkg.name} pkg={pkg} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '20px 48px',
              background: 'transparent',
              border: '2px solid rgba(34, 211, 238, 0.5)',
              borderRadius: '16px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 700,
              textDecoration: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-nunito-sans)',
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              zIndex: 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.4)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.8)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(34, 211, 238, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.5)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.4)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.8)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(34, 211, 238, 0.3)';
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.5)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Calendar style={{ width: '22px', height: '22px' }} /> 
            Book an appointment
          </a>
        </div>
      </div>
    </div>
  );
}
