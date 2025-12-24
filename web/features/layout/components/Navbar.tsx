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

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/services', label: 'Services' },
  { href: '/tools', label: 'Tools' },
];

const aboutDropdownLinks = [
  { href: '/about', label: 'About Our Journey' },
  { href: '/about/team', label: 'Our Team Members' },
  { href: '/about/join', label: 'Join Us' },
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
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const aboutRef = useRef(null);
  const socialsRef = useRef(null);
  const userRef = useRef(null);

  // Logout handler - redirects to NextAuth signout
  const handleLogout = () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    // Redirect to NextAuth signout endpoint
    window.location.href = '/api/auth/signout';
  };

  // Truncate name function
  const truncateName = (name, maxLength = 15) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + '...';
  };

  // scroll hide/show + glass intensity
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      if (y > 80 && y > lastY) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastY(y);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  // click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setAboutDropdownOpen(false);
      }
      if (socialsRef.current && !socialsRef.current.contains(event.target)) {
        setSocialsOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isAboutActive = pathname.startsWith('/about');

  return (
    <>
      <style>{`
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

      {/* Fixed navbar wrapper - completely transparent background */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9998, // Below modals but above content
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          transform: hidden ? 'translateY(-130%)' : 'translateY(0)',
          transition: 'transform 0.35s ease',
        }}
      >
        {/* floating glass pill */}
        <div
          style={{
            marginTop: 10,
            width: 'min(1040px, 100% - 40px)',
            borderRadius: 9999,
            backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.55)' : 'rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: scrolled
              ? '1px solid rgba(0, 212, 255, 0.35)'
              : '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: scrolled
              ? '0 16px 50px rgba(0, 0, 0, 0.65)'
              : '0 10px 40px rgba(0, 0, 0, 0.55)',
            pointerEvents: 'auto',
          }}
        >
          {/* main row */}
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
            {/* logo */}
            <a
              href="/"
              aria-label="Tensor Security Academy - Home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                zIndex: 50,
              }}
            >
              <img
                src="https://ik.imagekit.io/ekb0d0it0/logofinal1.webp"
                alt="Tensor Security Academy Logo"
                style={{
                  width: 45,
                  height: 45,
                  objectFit: 'contain',
                }}
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
            </a>

            {/* desktop nav */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '36px' }}
              className="desktop-only-nav"
            >
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className={`nav-link-wrapper ${pathname === link.href ? 'active' : ''}`}
                >
                  <a
                    href={link.href}
                    style={{
                      color: pathname === link.href ? '#00d4ff' : 'white',
                      fontSize: '15px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      fontWeight: 600,
                      fontFamily: '"Nunito Sans", sans-serif',
                      letterSpacing: '0.5px',
                      textShadow:
                        pathname === link.href ? '0 0 15px rgba(0, 212, 255, 0.8)' : 'none',
                    }}
                  >
                    {link.label}
                  </a>
                </div>
              ))}

              {/* about dropdown – desktop */}
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
                      textShadow: isAboutActive
                        ? '0 0 15px rgba(0, 212, 255, 0.8)'
                        : 'none',
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
                      boxShadow:
                        '0 20px 60px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.05)',
                      zIndex: 9999, // Above navbar
                    }}
                  >
                    {aboutDropdownLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
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
                          background:
                            pathname === link.href
                              ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.1))'
                              : 'transparent',
                        }}
                      >
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* socials dropdown – desktop */}
              <div ref={socialsRef} style={{ position: 'relative' }}>
                <div className="nav-link-wrapper">
                  <button
                    onClick={() => setSocialsOpen(!socialsOpen)}
                    aria-label="Social media links"
                    aria-expanded={socialsOpen}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      fontSize: '15px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 600,
                      fontFamily: '"Nunito Sans", sans-serif',
                      letterSpacing: '0.5px',
                      padding: 0,
                    }}
                  >
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
                </div>

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
                      boxShadow:
                        '0 20px 60px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.05)',
                      zIndex: 9999, // Above navbar
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
                        >
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              border: '2px solid rgba(255, 255, 255, 0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'transparent',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            <IconComponent
                              size={18}
                              strokeWidth={2}
                              color="#ffffff"
                            />
                          </div>
                          <span>{social.name}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* auth – desktop */}
              {!user ? (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href="/login" style={{ textDecoration: 'none' }}>
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
                    >
                      <LogIn style={{ width: '16px', height: '16px' }} />
                      Login
                    </button>
                  </a>

                  <a href="/signup" style={{ textDecoration: 'none' }}>
                    <button
                      style={{
                        padding: '10px 24px',
                        fontSize: '14px',
                        fontWeight: 700,
                        borderRadius: '10px',
                        border: '2px solid rgba(236, 72, 153, 0.6)',
                        background:
                          'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.1))',
                        color: '#ec4899',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: '"Nunito Sans", sans-serif',
                        boxShadow: '0 4px 15px rgba(236, 72, 153, 0.2)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <UserPlus style={{ width: '16px', height: '16px' }} />
                      Sign Up
                    </button>
                  </a>
                </div>
              ) : (
                <div ref={userRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    aria-label="User menu"
                    aria-expanded={userDropdownOpen}
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15))',
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
                      padding: '10px 16px',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 15px rgba(0, 212, 255, 0.2)',
                      maxWidth: '200px',
                    }}
                  >
                    <User style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                    <span style={{ 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap',
                      maxWidth: '120px'
                    }}>
                      {truncateName(user.name)}
                    </span>
                    <ChevronDown
                      style={{
                        width: '16px',
                        height: '16px',
                        flexShrink: 0,
                        transform: userDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
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
                        boxShadow:
                          '0 20px 60px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.05)',
                        zIndex: 9999, // Above navbar
                      }}
                    >
                      <div
                        style={{
                          padding: '14px 18px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          marginBottom: '8px',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '14px',
                            fontWeight: 700,
                            color: '#00d4ff',
                            marginBottom: '4px',
                            wordBreak: 'break-word',
                          }}
                        >
                          {user.name}
                        </p>
                        <p
                          style={{
                            fontSize: '12px',
                            color: '#9ca3af',
                            wordBreak: 'break-word',
                          }}
                        >
                          {user.email}
                        </p>
                      </div>

                      <a
                        href="/dashboard"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '14px 18px',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          color: pathname === '/dashboard' ? '#00d4ff' : 'white',
                          fontSize: '14px',
                        }}
                      >
                        <Home style={{ width: '18px', height: '18px' }} />
                        Dashboard
                      </a>

                      <a
                        href="/dashboard/settings"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '14px 18px',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          color:
                            pathname === '/dashboard/settings'
                              ? '#00d4ff'
                              : 'white',
                          fontSize: '14px',
                        }}
                      >
                        <Settings style={{ width: '18px', height: '18px' }} />
                        Settings
                      </a>

                      <div
                        style={{
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                          marginTop: '8px',
                          paddingTop: '8px',
                        }}
                      >
                        <button
                          type="button"
                          onClick={handleLogout}
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
                          }}
                        >
                          <LogOut style={{ width: '18px', height: '18px' }} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* mobile hamburger */}
            <button
              className="mobile-only-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.2))',
                border: '1px solid rgba(0, 212, 255, 0.4)',
                borderRadius: '10px',
                color: '#00d4ff',
                cursor: 'pointer',
                padding: '10px',
                zIndex: 50,
                boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {mobileMenuOpen ? (
                <X style={{ width: '24px', height: '24px' }} />
              ) : (
                <Menu style={{ width: '24px', height: '24px' }} />
              )}
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
              <div
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {user && (
                  <div
                    style={{
                      padding: '14px 18px',
                      background: 'rgba(0, 212, 255, 0.1)',
                      borderRadius: '12px',
                      marginBottom: '16px',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#00d4ff',
                        marginBottom: '4px',
                        wordBreak: 'break-word',
                      }}
                    >
                      {user.name}
                    </p>
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#9ca3af',
                        wordBreak: 'break-word',
                      }}
                    >
                      {user.email}
                    </p>
                  </div>
                )}

                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 600,
                      background:
                        pathname === link.href
                          ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.15))'
                          : 'transparent',
                      border:
                        pathname === link.href
                          ? '1px solid rgba(0, 212, 255, 0.5)'
                          : '1px solid transparent',
                    }}
                  >
                    {link.label}
                  </a>
                ))}

                <button
                  onClick={() => setAboutDropdownOpenMobile(!aboutDropdownOpenMobile)}
                  style={{
                    width: '100%',
                    marginTop: '12px',
                    padding: '14px 18px',
                    background: 'transparent',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '12px',
                    color: '#00d4ff',
                    fontSize: '16px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  About
                  <ChevronDown
                    style={{
                      width: '20px',
                      height: '20px',
                      transform: aboutDropdownOpenMobile ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                {aboutDropdownOpenMobile && (
                  <div style={{ marginTop: 8 }}>
                    {aboutDropdownLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
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
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setSocialsOpenMobile(!socialsOpenMobile)}
                  style={{
                    width: '100%',
                    marginTop: '12px',
                    padding: '14px 18px',
                    background: 'transparent',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '12px',
                    color: '#a855f7',
                    fontSize: '16px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  Our Socials
                  <ChevronDown
                    style={{
                      width: '20px',
                      height: '20px',
                      transform: socialsOpenMobile ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                {socialsOpenMobile && (
                  <div style={{ marginTop: 8 }}>
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
                          }}
                        >
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              border: '2px solid rgba(255, 255, 255, 0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'transparent',
                            }}
                          >
                            <IconComponent size={18} strokeWidth={2} color="#ffffff" />
                          </div>
                          <span>{social.name}</span>
                        </a>
                      );
                    })}
                  </div>
                )}

                {!user ? (
                  <div
                    style={{
                      marginTop: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <a
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ textDecoration: 'none' }}
                    >
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
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        <LogIn style={{ width: 20, height: 20 }} />
                        Login
                      </button>
                    </a>

                    <a
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ textDecoration: 'none' }}
                    >
                      <button
                        style={{
                          width: '100%',
                          padding: '14px',
                          fontSize: '16px',
                          fontWeight: 700,
                          borderRadius: '12px',
                          border: '2px solid rgba(236, 72, 153, 0.6)',
                          background:
                            'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.1))',
                          color: '#ec4899',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        <UserPlus style={{ width: 20, height: 20 }} />
                        Sign Up
                      </button>
                    </a>
                  </div>
                ) : (
                  <>
                    <a
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background:
                          pathname === '/dashboard'
                            ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.15))'
                            : 'transparent',
                        border:
                          pathname === '/dashboard'
                            ? '1px solid rgba(0, 212, 255, 0.5)'
                            : '1px solid rgba(0, 212, 255, 0.3)',
                        marginTop: '16px',
                      }}
                    >
                      <Home style={{ width: 20, height: 20 }} />
                      Dashboard
                    </a>

                    <a
                      href="/dashboard/settings"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                      }}
                    >
                      <Settings style={{ width: 20, height: 20 }} />
                      Settings
                    </a>

                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: '2px solid rgba(239, 68, 68, 0.5)',
                        background: 
                          'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))',
                        color: '#ef4444',
                        fontSize: '16px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        marginTop: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <LogOut style={{ width: 20, height: 20 }} />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}