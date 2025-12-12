'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Handshake,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  LogIn,
  UserPlus,
  User,
  Settings,
  LogOut,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  MapIcon, 
  UserGroupIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { logout } from '@/app/actions/auth';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/services', label: 'Services' },
  { href: '/tools', label: 'Tools' },
];

const aboutDropdownLinks = [
  { href: '/about', label: 'About Our Journey', icon: MapIcon },
  { href: '/about/team', label: 'Our Team Members', icon: UserGroupIcon },
  { href: '/about/join', label: 'Join Us', icon: Handshake },
];

const socialLinks = [
  { name: 'LinkedIn', url: 'https://linkedin.com/company/tensor-security', icon: Linkedin },
  { name: 'Instagram', url: 'https://instagram.com/tensorsecurity', icon: Instagram },
  { name: 'Facebook', url: 'https://facebook.com/tensorsecurity', icon: Facebook },
  { name: 'X', url: 'https://x.com/tensorsecurity', icon: Twitter },
];

interface NavbarProps {
  user?: {
    name: string;
    email: string;
  } | null;
}

export default function Navbar({ user = null }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [aboutDropdownOpenMobile, setAboutDropdownOpenMobile] = useState(false);
  const [socialsOpen, setSocialsOpen] = useState(false);
  const [socialsOpenMobile, setSocialsOpenMobile] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const aboutRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
      if (socialsRef.current && !socialsRef.current.contains(event.target as Node)) {
        setSocialsOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const isAboutActive = pathname.startsWith('/about');

  return (
    <>
      <style>{`
        /* ✅ CSS Animations - No Framer Motion */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInMobile {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 100vh; }
        }

        .dropdown-enter {
          animation: fadeIn 0.2s ease-out forwards;
        }

        .mobile-menu-enter {
          animation: fadeInMobile 0.3s ease-out forwards;
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
          background: linear-gradient(90deg, #00d4ff 0%, #7c3aed 50%, #a855f7 100%);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
        }
        
        .nav-link-wrapper:hover::after,
        .nav-link-wrapper.active::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .desktop-only-nav { display: none !important; }
          .mobile-only-button { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-only-nav { display: flex !important; }
          .mobile-only-button { display: none !important; }
        }
      `}</style>

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          borderBottom: scrolled 
            ? '1px solid rgba(0, 212, 255, 0.4)' 
            : '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: scrolled ? '0 4px 30px rgba(0, 212, 255, 0.2)' : 'none',
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
          {/* LOGO */}
          <Link 
            href="/" 
            aria-label="Tensor Security Academy - Home"
            prefetch={true}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              textDecoration: 'none', 
              zIndex: 10000 
            }}
          >
            <Image
              src="/logofinal.webp"
              alt="Tensor Security Academy Logo"
              width={45}
              height={45}
              priority
              quality={90}
              style={{ objectFit: 'contain' }}
            />
            <span 
              style={{ 
                fontSize: 'clamp(11px, 2vw, 14px)', 
                fontWeight: 900, 
                color: 'white',
                letterSpacing: '2px',
                fontFamily: '"Nunito Sans", sans-serif',
                textTransform: 'uppercase',
                textShadow: '0 0 20px rgba(0, 212, 255, 0.6)',
              }}
            >
              TENSOR SECURITY ACADEMY
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="desktop-only-nav">
            {navLinks.map((link) => (
              <div key={link.href} className={`nav-link-wrapper ${pathname === link.href ? 'active' : ''}`}>
                <Link
                  href={link.href}
                  prefetch={true}
                  style={{
                    color: pathname === link.href ? '#00d4ff' : 'white',
                    fontSize: '15px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontWeight: 600,
                    fontFamily: '"Nunito Sans", sans-serif',
                    letterSpacing: '0.5px',
                    textShadow: pathname === link.href ? '0 0 15px rgba(0, 212, 255, 0.8)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00d4ff';
                    e.currentTarget.style.textShadow = '0 0 15px rgba(0, 212, 255, 0.8)';
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

            {/* ABOUT DROPDOWN - DESKTOP */}
            <div ref={aboutRef} style={{ position: 'relative' }}>
              <div className={`nav-link-wrapper ${isAboutActive ? 'active' : ''}`}>
                <button
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  aria-label="About menu"
                  aria-expanded={aboutDropdownOpen}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: isAboutActive ? '#00d4ff' : 'white',
                    fontSize: '15px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 600,
                    fontFamily: '"Nunito Sans", sans-serif',
                    letterSpacing: '0.5px',
                    padding: 0,
                    transition: 'all 0.3s ease',
                    textShadow: isAboutActive ? '0 0 15px rgba(0, 212, 255, 0.8)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00d4ff';
                    e.currentTarget.style.textShadow = '0 0 15px rgba(0, 212, 255, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isAboutActive) {
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.textShadow = 'none';
                    }
                  }}
                >
                  About
                  <ChevronDown
                    style={{
                      width: '16px',
                      height: '16px',
                      transform: aboutDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </button>
              </div>

              {aboutDropdownOpen && (
                <div
                  className="dropdown-enter"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '16px',
                    background: 'rgba(0, 0, 0, 0.92)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    padding: '8px',
                    minWidth: '240px',
                    boxShadow: '0 20px 60px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.05)',
                    zIndex: 10001,
                  }}
                >
                  {aboutDropdownLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        prefetch={true}
                        onClick={() => setAboutDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '14px 18px',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          color: pathname === link.href ? '#00d4ff' : 'white',
                          fontSize: '14px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          fontFamily: '"Nunito Sans", sans-serif',
                          fontWeight: 600,
                          border: '1px solid transparent',
                          background: pathname === link.href 
                            ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.1))'
                            : 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          if (pathname !== link.href) {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(124, 58, 237, 0.08))';
                            e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (pathname !== link.href) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }
                        }}
                      >
                        <IconComponent 
                          style={{ 
                            width: '18px', 
                            height: '18px', 
                            strokeWidth: 2,
                            color: '#ffffff'
                          }} 
                        />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SOCIALS DROPDOWN - DESKTOP */}
            <div ref={socialsRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setSocialsOpen(!socialsOpen)}
                aria-label="Social media links"
                aria-expanded={socialsOpen}
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15))',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 600,
                  fontFamily: '"Nunito Sans", sans-serif',
                  letterSpacing: '0.5px',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 15px rgba(0, 212, 255, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 212, 255, 0.5), 0 0 50px rgba(124, 58, 237, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.25), rgba(124, 58, 237, 0.25))';
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15))';
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                }}
              >
                <ShareIcon style={{ width: '18px', height: '18px', strokeWidth: 2 }} />
                Socials
                <ChevronDown
                  style={{
                    width: '16px',
                    height: '16px',
                    transform: socialsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </button>

              {socialsOpen && (
                <div
                  className="dropdown-enter"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '16px',
                    background: 'rgba(0, 0, 0, 0.92)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    padding: '8px',
                    minWidth: '220px',
                    boxShadow: '0 20px 60px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.05)',
                    zIndex: 10001,
                  }}
                >
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
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
                          padding: '14px 18px',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          color: 'white',
                          fontSize: '14px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          fontFamily: '"Nunito Sans", sans-serif',
                          fontWeight: 600,
                          border: '1px solid transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(124, 58, 237, 0.08))';
                          e.currentTarget.style.transform = 'translateX(6px)';
                          e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                          e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.borderColor = 'transparent';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '50%', 
                          border: '2px solid rgba(255, 255, 255, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(255, 255, 255, 0.05)',
                          transition: 'all 0.3s ease',
                        }}>
                          <IconComponent size={18} strokeWidth={2} color="#ffffff" />
                        </div>
                        <span>{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CONDITIONAL: Login/Signup OR User Dropdown */}
            {!user ? (
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href="/login" prefetch={true} style={{ textDecoration: 'none' }}>
                  <button
                    style={{
                      padding: '10px 24px',
                      fontSize: '14px',
                      fontWeight: 700,
                      borderRadius: '10px',
                      border: '2px solid rgba(0, 212, 255, 0.5)',
                      background: 'transparent',
                      color: '#00d4ff',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Nunito Sans", sans-serif',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
                      e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <LogIn style={{ width: '16px', height: '16px' }} />
                    Login
                  </button>
                </Link>

                <Link href="/signup" prefetch={true} style={{ textDecoration: 'none' }}>
                  <button
                    style={{
                      padding: '10px 24px',
                      fontSize: '14px',
                      fontWeight: 700,
                      borderRadius: '10px',
                      border: '2px solid rgba(236, 72, 153, 0.6)',
                      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.1))',
                      color: '#ec4899',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: '"Nunito Sans", sans-serif',
                      boxShadow: '0 4px 15px rgba(236, 72, 153, 0.2)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(236, 72, 153, 0.6)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(236, 72, 153, 0.2)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <UserPlus style={{ width: '16px', height: '16px' }} />
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (
              <div ref={userRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-label="User menu"
                  aria-expanded={userDropdownOpen}
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15))',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: 600,
                    fontFamily: '"Nunito Sans", sans-serif',
                    letterSpacing: '0.5px',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 15px rgba(0, 212, 255, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 212, 255, 0.5), 0 0 50px rgba(124, 58, 237, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.25), rgba(124, 58, 237, 0.25))';
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15))';
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                  }}
                >
                  <User style={{ width: '18px', height: '18px' }} />
                  {user.name}
                  <ChevronDown
                    style={{
                      width: '16px',
                      height: '16px',
                      transform: userDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </button>

                {userDropdownOpen && (
                  <div
                    className="dropdown-enter"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '16px',
                      background: 'rgba(0, 0, 0, 0.92)',
                      backdropFilter: 'blur(30px)',
                      WebkitBackdropFilter: 'blur(30px)',
                      borderRadius: '16px',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      padding: '8px',
                      minWidth: '260px',
                      boxShadow: '0 20px 60px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.05)',
                      zIndex: 10001,
                    }}
                  >
                    <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '8px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: '#00d4ff', marginBottom: '4px', fontFamily: '"Nunito Sans", sans-serif' }}>
                        {user.name}
                      </p>
                      <p style={{ fontSize: '12px', color: '#9ca3af', fontFamily: '"Nunito Sans", sans-serif' }}>
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      prefetch={true}
                      onClick={() => setUserDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: pathname === '/dashboard' ? '#00d4ff' : 'white',
                        fontSize: '14px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        fontFamily: '"Nunito Sans", sans-serif',
                        fontWeight: 600,
                        border: '1px solid transparent',
                        background: pathname === '/dashboard' 
                          ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.1))'
                          : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (pathname !== '/dashboard') {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(124, 58, 237, 0.08))';
                          e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (pathname !== '/dashboard') {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'transparent';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }
                      }}
                    >
                      <Home style={{ width: '18px', height: '18px' }} />
                      Dashboard
                    </Link>

                    <Link
                      href="/dashboard/settings"
                      prefetch={true}
                      onClick={() => setUserDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: pathname === '/dashboard/settings' ? '#00d4ff' : 'white',
                        fontSize: '14px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        fontFamily: '"Nunito Sans", sans-serif',
                        fontWeight: 600,
                        border: '1px solid transparent',
                        background: pathname === '/dashboard/settings' 
                          ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.1))'
                          : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (pathname !== '/dashboard/settings') {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.12), rgba(124, 58, 237, 0.08))';
                          e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (pathname !== '/dashboard/settings') {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'transparent';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }
                      }}
                    >
                      <Settings style={{ width: '18px', height: '18px' }} />
                      Settings
                    </Link>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '8px', paddingTop: '8px' }}>
                      <form action={logout}>
                        <button
                          type="submit"
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 18px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'transparent',
                            color: '#ef4444',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            fontFamily: '"Nunito Sans", sans-serif',
                            fontWeight: 600,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.1))';
                            e.currentTarget.style.transform = 'translateX(4px)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <LogOut style={{ width: '18px', height: '18px' }} />
                          Logout
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="mobile-only-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.2))',
              border: '1px solid rgba(0, 212, 255, 0.4)',
              borderRadius: '10px',
              color: '#00d4ff',
              cursor: 'pointer',
              padding: '10px',
              zIndex: 10000,
              boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            {mobileMenuOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div
            className="mobile-menu-enter"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              borderTop: '1px solid rgba(0, 212, 255, 0.3)',
              maxHeight: 'calc(100vh - 70px)',
              overflowY: 'auto',
            }}
          >
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {user && (
                <div style={{ padding: '14px 18px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '12px', marginBottom: '16px', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: '#00d4ff', marginBottom: '4px', fontFamily: '"Nunito Sans", sans-serif' }}>
                    {user.name}
                  </p>
                  <p style={{ fontSize: '13px', color: '#9ca3af', fontFamily: '"Nunito Sans", sans-serif' }}>
                    {user.email}
                  </p>
                </div>
              )}

              <nav aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: 'white',
                      fontSize: '16px',
                      fontFamily: '"Nunito Sans", sans-serif',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      display: 'block',
                      background: pathname === link.href 
                        ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.15))'
                        : 'transparent',
                      border: pathname === link.href 
                        ? '1px solid rgba(0, 212, 255, 0.5)'
                        : '1px solid transparent',
                      boxShadow: pathname === link.href 
                        ? '0 4px 15px rgba(0, 212, 255, 0.3)'
                        : 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* About & Socials Dropdowns - Mobile */}
                <div style={{ marginTop: '8px' }}>
                  <button
                    onClick={() => setAboutDropdownOpenMobile(!aboutDropdownOpenMobile)}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: 'transparent',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '12px',
                      color: '#00d4ff',
                      fontSize: '16px',
                      fontWeight: 700,
                      fontFamily: '"Nunito Sans", sans-serif',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    About
                    <ChevronDown
                      style={{
                        width: '20px',
                        height: '20px',
                        transform: aboutDropdownOpenMobile ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </button>
                  
                  {aboutDropdownOpenMobile && (
                    <div style={{ marginTop: '8px', transition: 'all 0.3s ease' }}>
                      {aboutDropdownLinks.map((link) => {
                        const IconComponent = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            prefetch={true}
                            onClick={() => {
                              setAboutDropdownOpenMobile(false);
                              setMobileMenuOpen(false);
                            }}
                            style={{
                              padding: '12px 18px 12px 32px',
                              borderRadius: '12px',
                              textDecoration: 'none',
                              color: 'white',
                              fontSize: '15px',
                              fontFamily: '"Nunito Sans", sans-serif',
                              fontWeight: 600,
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              background: pathname === link.href 
                                ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.1))'
                                : 'transparent',
                              border: pathname === link.href 
                                ? '1px solid rgba(0, 212, 255, 0.4)'
                                : '1px solid transparent',
                              marginBottom: '4px',
                            }}
                          >
                            <IconComponent style={{ width: '18px', height: '18px', strokeWidth: 2 }} />
                            <span>{link.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '8px' }}>
                  <button
                    onClick={() => setSocialsOpenMobile(!socialsOpenMobile)}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: 'transparent',
                      border: '1px solid rgba(124, 58, 237, 0.3)',
                      borderRadius: '12px',
                      color: '#a855f7',
                      fontSize: '16px',
                      fontWeight: 700,
                      fontFamily: '"Nunito Sans", sans-serif',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    Our Socials
                    <ChevronDown
                      style={{
                        width: '20px',
                        height: '20px',
                        transform: socialsOpenMobile ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </button>

                  {socialsOpenMobile && (
                    <div style={{ marginTop: '8px', transition: 'all 0.3s ease' }}>
                      {socialLinks.map((social) => {
                        const IconComponent = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              setSocialsOpenMobile(false);
                              setMobileMenuOpen(false);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '14px 18px 14px 32px',
                              borderRadius: '12px',
                              textDecoration: 'none',
                              color: 'white',
                              fontSize: '15px',
                              transition: 'all 0.3s ease',
                              fontFamily: '"Nunito Sans", sans-serif',
                              fontWeight: 600,
                              border: '1px solid transparent',
                              marginBottom: '4px',
                            }}
                          >
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid rgba(255, 255, 255, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)' }}>
                              <IconComponent size={18} strokeWidth={2} color="#ffffff" />
                            </div>
                            <span>{social.name}</span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>

                {!user ? (
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Link href="/login" prefetch={true} onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
                      <button
                        style={{
                          width: '100%',
                          padding: '14px',
                          fontSize: '16px',
                          fontWeight: 700,
                          borderRadius: '12px',
                          border: '2px solid rgba(0, 212, 255, 0.5)',
                          background: 'transparent',
                          color: '#00d4ff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          fontFamily: '"Nunito Sans", sans-serif',
                        }}
                      >
                        <LogIn style={{ width: '20px', height: '20px' }} />
                        Login
                      </button>
                    </Link>

                    <Link href="/signup" prefetch={true} onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
                      <button
                        style={{
                          width: '100%',
                          padding: '14px',
                          fontSize: '16px',
                          fontWeight: 700,
                          borderRadius: '12px',
                          border: '2px solid rgba(236, 72, 153, 0.6)',
                          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.1))',
                          color: '#ec4899',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          fontFamily: '"Nunito Sans", sans-serif',
                        }}
                      >
                        <UserPlus style={{ width: '20px', height: '20px' }} />
                        Sign Up
                      </button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link href="/dashboard" prefetch={true} onClick={() => setMobileMenuOpen(false)} style={{ padding: '14px 18px', borderRadius: '12px', textDecoration: 'none', color: 'white', fontSize: '16px', fontFamily: '"Nunito Sans", sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px', background: pathname === '/dashboard' ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.15))' : 'transparent', border: pathname === '/dashboard' ? '1px solid rgba(0, 212, 255, 0.5)' : '1px solid rgba(0, 212, 255, 0.3)', marginTop: '16px' }}>
                      <Home style={{ width: '20px', height: '20px' }} />
                      Dashboard
                    </Link>

                    <Link href="/dashboard/settings" prefetch={true} onClick={() => setMobileMenuOpen(false)} style={{ padding: '14px 18px', borderRadius: '12px', textDecoration: 'none', color: 'white', fontSize: '16px', fontFamily: '"Nunito Sans", sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px', background: pathname === '/dashboard/settings' ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.15))' : 'transparent', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                      <Settings style={{ width: '20px', height: '20px' }} />
                      Settings
                    </Link>

                    <form action={logout} style={{ marginTop: '8px' }}>
                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: '12px',
                          border: '2px solid rgba(239, 68, 68, 0.5)',
                          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))',
                          color: '#ef4444',
                          fontSize: '16px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          fontFamily: '"Nunito Sans", sans-serif',
                        }}
                      >
                        <LogOut style={{ width: '20px', height: '20px' }} />
                        Logout
                      </button>
                    </form>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
