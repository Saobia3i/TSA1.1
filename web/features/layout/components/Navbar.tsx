'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Linkedin from '@mui/icons-material/LinkedIn';
import Instagram from '@mui/icons-material/Instagram';
import Facebook from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
];

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/tensor-security', color: '#0A66C2' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/tensorsecurity', color: '#E4405F' },
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/tensorsecurity', color: '#1877F2' },
  { name: 'X', icon: XIcon, url: 'https://x.com/tensorsecurity', color: '#000000' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [socialsOpen, setSocialsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-button { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-button { display: none !important; }
        }
        
        .nav-link-wrapper {
          position: relative;
          display: inline-block;
        }
        
        .nav-link-wrapper::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #a855f7 100%);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
        }
        
        .nav-link-wrapper:hover::after,
        .nav-link-wrapper.active::after {
          width: 100%;
        }
      `}</style>

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled 
            ? '1px solid rgba(59, 130, 246, 0.4)' 
            : '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 4px 30px rgba(59, 130, 246, 0.2)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 20px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link 
            href="/" 
            aria-label="Tensor Security Academy - Home"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              textDecoration: 'none', 
              zIndex: 50 
            }}
          >
            <Image
              src="/logofinal.gif"
              alt="Tensor Security Academy Logo"
              width={45}
              height={45}
              priority
              quality={100}
              style={{ objectFit: 'contain' }}
            />
            <span 
              style={{ 
                fontSize: 'clamp(11px, 2vw, 14px)', 
                fontWeight: 900, 
                color: 'white',
                letterSpacing: '2px',
                fontFamily: 'var(--font-nunito)',
                textTransform: 'uppercase',
                textShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
              }}
            >
              TENSOR SECURITY ACADEMY
            </span>
          </Link>

          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {navLinks.map((link) => (
              <div key={link.href} className={`nav-link-wrapper ${pathname === link.href ? 'active' : ''}`}>
                <Link
                  href={link.href}
                  style={{
                    color: pathname === link.href ? '#3b82f6' : 'white',
                    fontSize: '15px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontWeight: 800,
                    fontFamily: 'var(--font-nunito)',
                    letterSpacing: '0.5px',
                    textShadow: pathname === link.href ? '0 0 15px rgba(59, 130, 246, 0.8)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#60a5fa';
                    e.currentTarget.style.textShadow = '0 0 15px rgba(59, 130, 246, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== link.href) {
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.textShadow = 'none';
                    }
                  }}
                >
                  {link.label}
                </Link>
              </div>
            ))}

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setSocialsOpen(!socialsOpen)}
                aria-label="Social media links"
                aria-expanded={socialsOpen}
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.25), rgba(168, 85, 247, 0.25))',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-nunito)',
                  letterSpacing: '0.5px',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.5), 0 0 50px rgba(168, 85, 247, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4), rgba(168, 85, 247, 0.4))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.25), rgba(168, 85, 247, 0.25))';
                }}
              >
                Socials
                <ChevronDown
                  style={{
                    width: '16px',
                    height: '16px',
                    transform: socialsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                  }}
                />
              </button>

              {socialsOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '12px',
                    background: 'rgba(0, 0, 0, 0.95)',
                    backdropFilter: 'blur(25px)',
                    borderRadius: '12px',
                    border: '2px solid rgba(59, 130, 246, 0.4)',
                    padding: '10px',
                    minWidth: '220px',
                    boxShadow: '0 10px 50px rgba(59, 130, 246, 0.4)',
                  }}
                >
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.name}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '14px',
                        transition: 'all 0.3s ease',
                        fontFamily: 'var(--font-nunito)',
                        fontWeight: 600,
                        border: '1px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))';
                        e.currentTarget.style.transform = 'translateX(6px)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <social.icon style={{ width: '22px', height: '22px', color: social.color }} />
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))',
              border: 'none',
              borderRadius: '8px',
              color: '#3b82f6',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 50,
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
            }}
          >
            {mobileMenuOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.98)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(59, 130, 246, 0.3)',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <nav aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '16px',
                        fontFamily: 'var(--font-nunito)',
                        fontWeight: 700,
                        transition: 'all 0.3s ease',
                        display: 'block',
                        background: pathname === link.href 
                          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))'
                          : 'transparent',
                        border: pathname === link.href 
                          ? '2px solid rgba(59, 130, 246, 0.5)'
                          : '2px solid transparent',
                        boxShadow: pathname === link.href 
                          ? '0 4px 15px rgba(59, 130, 246, 0.3)'
                          : 'none',
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div style={{ borderTop: '1px solid rgba(59, 130, 246, 0.3)', paddingTop: '16px', marginTop: '8px' }}>
                  <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '12px', paddingLeft: '16px', fontFamily: 'var(--font-nunito)', fontWeight: 700 }}>
                    Follow Us
                  </p>
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.name}`}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        fontFamily: 'var(--font-nunito)',
                        fontWeight: 600,
                        border: '2px solid transparent',
                      }}
                    >
                      <social.icon style={{ width: '22px', height: '22px', color: social.color }} />
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
