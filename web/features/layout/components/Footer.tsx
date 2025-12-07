'use client';

import { Mail, MapPin, MessageCircle } from 'lucide-react';
import Linkedin from '@mui/icons-material/LinkedIn';
import Instagram from '@mui/icons-material/Instagram';
import Facebook from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import Link from 'next/link';

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/tensor-security', color: '#0A66C2' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/tensorsecurity', color: '#E4405F' },
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/tensorsecurity', color: '#1877F2' },
  { name: 'X', icon: XIcon, url: 'https://x.com/tensorsecurity', color: '#000000' },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#111827',
        borderTop: '2px solid rgba(255, 255, 255, 0.2)',
        padding: '60px 24px',
        overflowX: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '50px',
          }}
        >
          {/* Company Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src="/logofinal.gif" alt="TSA Logo" style={{ width: '40px', height: '40px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', fontFamily: 'var(--font-space-mono)' }}>
                Tensor Security
              </h3>
            </div>
            <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6 }}>
              Elite cybersecurity training and professional services. Transform your career or secure your business.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '16px', fontFamily: 'var(--font-space-mono)' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/courses', label: 'Courses' },
                { href: '/services', label: 'Services' },
                { href: '/about', label: 'About Us' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '14px',
                    color: '#9ca3af',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
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
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '16px', fontFamily: 'var(--font-space-mono)' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail style={{ width: '18px', height: '18px', color: '#22d3ee' }} />
                <a
                  href="mailto:info@tensorsecurity.com"
                  style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'none' }}
                >
                  info@tensorsecurity.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageCircle style={{ width: '18px', height: '18px', color: '#22c55e' }} />
                <span style={{ fontSize: '14px', color: '#9ca3af' }}>WhatsApp Support</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                <MapPin style={{ width: '18px', height: '18px', color: '#22d3ee', marginTop: '2px' }} />
                <span style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.5 }}>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '16px', fontFamily: 'var(--font-space-mono)' }}>
              Follow Us
            </h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.2)';
                    e.currentTarget.style.borderColor = '#22d3ee';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                >
                  <social.icon style={{ width: '20px', height: '20px', color: social.color }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '14px', color: '#9ca3af', fontFamily: 'var(--font-space-mono)' }}>
            © {new Date().getFullYear()} Tensor Security Academy. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>Built with Next.js • Secured by Design</p>
        </div>
      </div>
    </footer>
  );
}
