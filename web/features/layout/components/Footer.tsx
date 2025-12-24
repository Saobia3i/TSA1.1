'use client';

import { Mail, MapPin, MessageCircle } from 'lucide-react';
import Linkedin from '@mui/icons-material/LinkedIn';
import Instagram from '@mui/icons-material/Instagram';
import Facebook from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import Link from 'next/link';
import Image from 'next/image';

const LOGO_URL = 'https://res.cloudinary.com/dojh4b9sb/image/upload/v1765462630/logo1_cyoiop.jpg';

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/tensorsecurityacademy', color: '#0A66C2' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/tensor_security_academy', color: '#E4405F' },
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/tensorsecurityacademy', color: '#1877F2' },
  { name: 'X', icon: XIcon, url: 'https://x.com/Tensor_Security', color: '#000000' },
];

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/services', label: 'Services' },
  { href: '/tools', label: 'Tools' },
  { href: '/about', label: 'About' },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#111827',
        borderTop: '2px solid rgba(34, 211, 238, 0.3)',
        padding: 'clamp(40px, 8vw, 60px) clamp(16px, 4vw, 24px)',
        overflowX: 'hidden',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: 'clamp(28px, 6vw, 40px)',
            marginBottom: 'clamp(40px, 8vw, 50px)',
          }}
        >
          {/* Company Info */}
          <div>
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                marginBottom: '16px',
                flexWrap: 'wrap',
                
              }}
            >
              <Image 
                src={LOGO_URL} 
                alt="TSA Logo" 
                width={40} 
                height={40}
                style={{ 
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
                priority
              />
              <h3 
                style={{ 
                  fontSize: 'clamp(16px, 3vw, 18px)', 
                  fontWeight: 700, 
                  color: '#22d3ee', 
                  fontFamily: 'var(--font-space-mono)',
                  margin: 0,
                }}
              >
                Tensor Security
              </h3>
            </div>
            <p 
              style={{ 
                fontSize: 'clamp(13px, 2.5vw, 14px)', 
                color: '#9ca3af', 
                lineHeight: 1.6,
                maxWidth: '280px',
              }}
            >
              Elite cybersecurity training and professional services. Transform your career or secure your business.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              style={{ 
                fontSize: 'clamp(15px, 2.8vw, 16px)', 
                fontWeight: 600, 
                color: '#22d3ee', 
                marginBottom: '16px', 
                fontFamily: 'var(--font-space-mono)',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: 'clamp(13px, 2.5vw, 14px)',
                    color: '#9ca3af',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    width: 'fit-content',
                     alignContent: 'center',
                    
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 
              style={{ 
                fontSize: 'clamp(15px, 2.8vw, 16px)', 
                fontWeight: 600, 
                color: '#22d3ee', 
                marginBottom: '16px', 
                fontFamily: 'var(--font-space-mono)',
              }}
            >
              Contact
            </h4>
            <div style={{ display: 'flex',  alignContent: 'center',flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <Mail style={{ width: '18px', height: '18px', color: '#22d3ee', flexShrink: 0 }} />
                <a
                  href="mailto:info@tensorsecurity.com"
                  style={{ 
                    fontSize: 'clamp(12px, 2.3vw, 14px)', 
                    color: '#9ca3af', 
                    textDecoration: 'none',
                    wordBreak: 'break-word',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
                >
                  contact@tensorsecurityacademy.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageCircle style={{ width: '18px', height: '18px', color: '#22c55e', flexShrink: 0 }} />
                <span style={{ fontSize: 'clamp(12px, 2.3vw, 14px)', color: '#9ca3af' }}>
                  WhatsApp Support
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                <MapPin style={{ width: '18px', height: '18px', color: '#22d3ee', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: 'clamp(12px, 2.3vw, 14px)', color: '#9ca3af', lineHeight: 1.5 }}>
                  Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 
              style={{ 
                fontSize: 'clamp(15px, 2.8vw, 16px)', 
                fontWeight: 600, 
                color: '#22d3ee', 
                marginBottom: '16px', 
                fontFamily: 'var(--font-space-mono)',
              }}
            >
              Follow Us
            </h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.name}`}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    border: '2px solid rgba(34, 211, 238, 0.3)',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.3)';
                    e.currentTarget.style.borderColor = '#22d3ee';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <social.icon style={{ width: '20px', height: '20px', color: '#22d3ee' }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(34, 211, 238, 0.2)',
            paddingTop: 'clamp(20px, 4vw, 24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'center',
          }}
        >
          <p 
            style={{ 
              fontSize: 'clamp(12px, 2.5vw, 14px)', 
              color: '#9ca3af', 
              fontFamily: 'var(--font-space-mono)',
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Tensor Security Academy. All rights reserved.
          </p>
          <p 
            style={{ 
              fontSize: 'clamp(11px, 2vw, 12px)', 
              color: '#6b7280',
              margin: 0,
            }}
          >
            Built with Next.js • Secured by Design
          </p>
        </div>
      </div>
    </footer>
  );
}
