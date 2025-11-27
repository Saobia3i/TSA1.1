'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// UI icons from Lucide

import {
  Shield, Code, Bug, Brain, Zap, Globe, LucideIcon, Lock, Target,
  Users, CheckCircle, Menu, MessageCircle, ArrowRight, Eye, Bot,
  Mail, MapPin, ChevronDown, X as CloseIcon
} from 'lucide-react';

import Linkedin from '@mui/icons-material/LinkedIn';
import Instagram from '@mui/icons-material/Instagram';
import Facebook from '@mui/icons-material/Facebook';
import X from '@mui/icons-material/X'; // Twitter er latest name (X)

import type { SvgIconComponent } from '@mui/icons-material';




interface CardItem {
  title: string;
  description: string;
  icon: LucideIcon;
  showButton: boolean;
  tag?: string; // Optional
}

interface SocialLink {
  name: string;
  icon: SvgIconComponent;
  url: string;
  color: string;
}

interface Instructor {
  name: string;
  role: string;
  expertise: string;
  image: string;
}

// ============================================
// STYLES
// ============================================
const styles = {
  button: {
    padding: '12px 28px',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600,
    borderRadius: '10px',
    border: '2px solid transparent',
    backgroundImage: 'linear-gradient(black, black), linear-gradient(to right, #06b6d4, #a855f7, #ec4899)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s',
  },
  card: {
    padding: '20px',
    minHeight: '200px',
    borderRadius: '16px',
    backgroundColor: 'rgba(17, 24, 39, 0.7)',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(6, 182, 212, 0.3)',
    display: 'flex',
    flexDirection: 'column' as const,
    transition: 'all 0.3s',
    maxWidth: '320px',
    margin: '0 auto',
  },
  iconBox: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    backgroundImage: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'white',
    marginBottom: '12px',
    lineHeight: '1.3',
  },
  description: {
    fontSize: '13px',
    color: '#9ca3af',
    lineHeight: '1.6',
    marginBottom: '16px',
    flexGrow: 1,
  },
  section: {
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '80px 32px',
  },
  sectionTitle: {
    fontSize: 'clamp(28px, 4vw, 40px)',
    fontWeight: 700,
    background: 'linear-gradient(to right, #22d3ee, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
  sectionSubtitle: {
    fontSize: '16px',
    color: '#9ca3af',
    maxWidth: '700px',
    margin: '0 auto',
    textAlign: 'center' as const,
  },
};

// ============================================
// HERO BACKGROUND - Cyber Security Theme
// ============================================
const CyberSecurityBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',  zIndex: 0  }}>
      {/* Animated Matrix Grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Glowing Network Nodes */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`node-${i}`}
          style={{
            position: 'absolute',
            // eslint-disable-next-line react-hooks/purity
            left: `${Math.random() * 100}%`,
            // eslint-disable-next-line react-hooks/purity
            top: `${Math.random() * 100}%`,
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00F0FF',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.8)',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Floating Code Blocks */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`code-${i}`}
          style={{
            position: 'absolute',
            // eslint-disable-next-line react-hooks/purity
            left: `${Math.random() * 100}%`,
            // eslint-disable-next-line react-hooks/purity
            top: `${Math.random() * 100}%`,
            fontSize: '12px',
            color: 'rgba(0, 240, 255, 0.4)',
            fontFamily: 'monospace',
          }}
          animate={{
            y: [-20, 20],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
         
        </motion.div>
      ))}

      {/* Large Gradient Orb */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      {/* Secondary Orb */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12), transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

// ============================================
// GRADIENT BUTTON COMPONENT
// ============================================
interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  large?: boolean;
}

const GradientButton = ({ children, onClick, large = false }: GradientButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.button,
        padding: large ? '14px 32px' : '12px 28px',
        fontSize: large ? '16px' : '14px',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {children}
    </button>
  );
};

// ============================================
// COURSE CARD COMPONENT - Fixed 'any' type
// ============================================
interface CardProps {
  item: CardItem;
  index: number;
}

const Card = ({ item, index }: CardProps) => {
  const Icon = item.icon;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{ height: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          ...styles.card,
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          borderColor: isHovered ? 'rgba(6, 182, 212, 0.7)' : 'rgba(6, 182, 212, 0.3)',
          position: 'relative',
        }}
      >
        {/* Tag */}
        {item.tag && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '4px 12px',
            background: item.tag === 'Trending' 
              ? 'linear-gradient(to right, #ec4899, #f97316)' 
              : 'linear-gradient(to right, #06b6d4, #a855f7)',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 700,
            color: 'white',
            textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(236, 72, 153, 0.4)',
          }}>
            {item.tag}
          </div>
        )}

        <div style={styles.iconBox}>
          <Icon style={{ width: '28px', height: '28px', color: '#06b6d4' }} />
        </div>
        
        <h3 style={{
          ...styles.title,
          color: isHovered ? '#22d3ee' : 'white',
        }}>
          {item.title}
        </h3>
        
        <p style={styles.description}>
          {item.description}
        </p>
        
        {item.showButton && (
          <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
            <GradientButton>Learn More</GradientButton>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const TensorSecurityAcademy = () => {
  // States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentInstructor, setCurrentInstructor] = useState(0);
  const [socialsOpen, setSocialsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);

  // Data Arrays
  const heroSlides: string[] = [
    "Forge Your Future in Tech Security & AI",
    "Master Cybersecurity with Live Expert Training",
    "Transform Your Career in 90 Days",
    "Join the Next Generation of Security Experts"
  ];

  const instructors: Instructor[] = [
    { name: "Abrar Jahin Sachcha", role: "Founder & Lead Instructor", expertise: "Penetration Testing & Red Teaming", image: "AJ" },
    { name: "Sarah Ahmed", role: "AI Security Expert", expertise: "Machine Learning & AI Security", image: "SA" },
    { name: "Michael Chen", role: "SOC Analyst Lead", expertise: "Threat Intelligence & SIEM", image: "MC" },
    { name: "Priya Sharma", role: "Web Security Specialist", expertise: "Application Security & Bug Bounty", image: "PS" }
  ];

  const courses: CardItem[] = [
    { 
      title: "Beginner to Hired: Security Analyst Live Training", 
      description: "Launch your cybersecurity career from scratch with SOC operations, threat intelligence, and SIEM tools.", 
      icon: Shield, 
      showButton: true,
      tag: "Beginner to Pro"
    },
    { 
      title: "Ethical Hacking & Red Teaming Live Training", 
      description: "Master penetration testing methodologies and advanced exploitation techniques.", 
      icon: Target, 
      showButton: true,
      tag: "Trending"
    },
    { 
      title: "Advanced Bug Bounty Training", 
      description: "Learn to find critical vulnerabilities in web applications on platforms like HackerOne.", 
      icon: Bug, 
      showButton: true,
    },
    { 
      title: "Machine Learning: Zero to Alpha", 
      description: "Build powerful machine learning models with data science fundamentals.", 
      icon: Brain, 
      showButton: true 
    },
    { 
      title: "How to Build AI Automations for Businesses", 
      description: "Create custom automation bots and integrate AI APIs for real business solutions.", 
      icon: Zap, 
      showButton: true 
    },
    { 
      title: "Professional Web Developer", 
      description: "Master full stack development with emphasis on security best practices.", 
      icon: Code, 
      showButton: true 
    }
  ];

  const services: CardItem[] = [
    { title: "Web Application VAPT", description: "Identify and remediate critical security vulnerabilities before exploitation.", icon: Lock, showButton: false },
    { title: "AI & LLM Pentesting", description: "Secure your AI deployments with specialized vulnerability testing.", icon: Brain, showButton: false },
    { title: "Contract SOC Monitoring", description: "Professional security monitoring without building an in-house SOC.", icon: Eye, showButton: false },
    { title: "AI Automation Solutions", description: "Custom AI workflows to automate repetitive business tasks.", icon: Bot, showButton: false },
    { title: "Web Development Services", description: "Fast, secure, and scalable web applications with security-first approach.", icon: Globe, showButton: false }
  ];

const socialLinks: SocialLink[] = [
  { name: 'LinkedInIcon',  icon: Linkedin,  url: 'https://linkedin.com/YOUR_PROFILE', color: '#1DA1F2' },
  { name: 'InstagramIcon', icon: Instagram, url: 'https://instagram.com/YOUR_PROFILE', color: '#E4405F' },
  { name: 'FacebookIcon',  icon: Facebook,  url: 'https://facebook.com/YOUR_PAGE',    color: '#1877F2' },
  { name: 'X',         icon: X,         url: 'https://twitter.com/YOUR_HANDLE',   color: '#1DA1F2' },
];


  // ============================================
  // USE EFFECTS
  // ============================================
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const sections = ['home', 'courses', 'services', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  useEffect(() => {
    const instructorInterval = setInterval(() => {
      setCurrentInstructor((prev) => (prev + 1) % instructors.length);
    }, 3000);
    return () => clearInterval(instructorInterval);
  }, [instructors.length]);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  
 const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  const headerOffset = 90;
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - headerOffset;

  setMobileMenuOpen(false);
  setSocialsOpen(false);

  setTimeout(() => {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }, 10);
};



  // ============================================
  // NAV LINK COMPONENT
  // ============================================
  interface NavLinkProps {
    section: string;
    label: string;
    mobile?: boolean;
  }

  const NavLink = ({ section, label, mobile = false }: NavLinkProps) => {
    const isActive = activeSection === section;
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button
        onClick={() => scrollToSection(section)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: mobile && isActive ? 'rgba(6, 182, 212, 0.1)' : 'none',
          border: 'none',
          color: isActive ? '#22d3ee' : (isHovered ? '#a855f7' : 'white'),
          fontSize: mobile ? '16px' : '14px',
          cursor: 'pointer',
          padding: mobile ? '12px 16px' : '8px 0',
          textAlign: mobile ? 'left' : 'center',
          borderRadius: mobile ? '8px' : '0',
          position: 'relative',
          transition: 'color 0.3s ease',
          fontWeight: isActive ? 600 : 400,
          width: mobile ? '100%' : 'auto',
        }}
      >
        {label}
        
        {!mobile && isActive && (
          <motion.div
            layoutId="navbar-underline"
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(to right, #22d3ee, #a855f7)',
              borderRadius: '2px',
            }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {mobile && isActive && (
          <motion.div
            layoutId="mobile-indicator"
            style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '70%',
              background: 'linear-gradient(to bottom, #22d3ee, #a855f7)',
              borderRadius: '0 4px 4px 0',
            }}
          />
        )}
      </button>
    );
  };

  return (
    <div style={{ backgroundColor: '#000', color: 'white', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-button { display: flex !important; }
        }

        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-button { display: none !important; }
        }
      `}</style>

      {/* WhatsApp Button */}
      {mounted && (
        <a 
          href="https://wa.me/8801331759287"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 50,
            width: '56px',
            height: '56px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            cursor: 'pointer',
          }}
        >
          <MessageCircle style={{ width: '24px', height: '24px', color: 'white' }} />
        </a>
      )}

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 20px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 50 }}>
            <img src="/logofinal.gif" alt="logo" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
            <span style={{ 
              fontSize: 'clamp(14px, 2vw, 16px)',
              fontWeight: 600,
            }}>
              Tensor Security Academy
            </span>
          </div>
          
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <NavLink section="home" label="Home" />
            <NavLink section="courses" label="Courses" />
            <NavLink section="services" label="Services" />
            <NavLink section="contact" label="Contact" />
            
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setSocialsOpen(!socialsOpen)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: activeSection === 'socials' ? '#22d3ee' : 'white',
                  fontSize: '14px', 
                  cursor: 'pointer', 
                  padding: '8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { 
                  e.currentTarget.style.color = '#a855f7'; 
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { 
                  e.currentTarget.style.color = activeSection === 'socials' ? '#22d3ee' : 'white'; 
                }}
              >
                Socials
                <ChevronDown style={{ width: '16px', height: '16px', transform: socialsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
              </button>
              
              {socialsOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '12px',
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  padding: '8px',
                  minWidth: '200px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                }}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '14px',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
                      }}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <social.icon style={{ width: '20px', height: '20px', color: social.color }} />
                      <span>Join us on {social.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              color: '#22d3ee',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 50,
            }}
          >
            {mobileMenuOpen ? <CloseIcon style={{ width: '28px', height: '28px' }} /> : <Menu style={{ width: '28px', height: '28px' }} />}
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
                borderTop: '1px solid rgba(6, 182, 212, 0.2)',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <NavLink section="home" label="Home" mobile />
                <NavLink section="courses" label="Courses" mobile />
                <NavLink section="services" label="Services" mobile />
                <NavLink section="contact" label="Contact" mobile />

                <div style={{
                  borderTop: '1px solid rgba(6, 182, 212, 0.2)',
                  paddingTop: '16px',
                  marginTop: '8px',
                }}>
                  <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '12px', paddingLeft: '16px' }}>
                    Follow Us
                  </p>
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: '16px',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
                      }}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <social.icon style={{ width: '20px', height: '20px', color: social.color }} />
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section id="home" style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '140px',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom right, rgba(0, 20, 40, 0.95), rgba(0, 0, 0, 0.98), rgba(20, 0, 40, 0.95))',
          zIndex: 0,
        }} />

        <CyberSecurityBackground />
        
        <div style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px',
          }}>
            
            <div style={{ width: '100%', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    fontWeight: 700,
                    background: 'linear-gradient(to right, #00F0FF, #a855f7, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                  }}
                >
                  {heroSlides[currentSlide]}
                </motion.h1>
              </AnimatePresence>
            </div>
            
            <p style={{ fontSize: '16px', color: '#d1d5db', maxWidth: '700px', lineHeight: 1.6 }}>
              Go from curious to career-ready, and from theory to execution. Tensor Security Academy provides elite, personalized training to master the most in-demand skills of tomorrow.
            </p>
            
            <div style={{ marginTop: '12px' }}>
              <GradientButton onClick={() => scrollToSection('courses')} large>
                Explore Courses
                <ArrowRight style={{ width: '20px', height: '20px' }} />
              </GradientButton>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              width: '100%',
              maxWidth: '800px',
              marginTop: '24px',
            }}>
              {[
                { icon: Users, text: "1-on-1 Mentorship" },
                { icon: Zap, text: "Live Training" },
                { icon: CheckCircle, text: "Career Guidance" },
                { icon: Shield, text: "Certification Support" }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '18px',
                    backgroundColor: 'rgba(17, 24, 39, 0.5)',
                    borderRadius: '12px',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                  }}
                >
                  <feature.icon style={{ width: '28px', height: '28px', color: '#00F0FF' }} />
                  <p style={{ fontSize: '12px', color: '#d1d5db', fontWeight: 500, textAlign: 'center' }}>{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSTRUCTORS */}
      <section style={{ ...styles.section, paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={styles.sectionTitle}>Our Team Member</h2>
          <p style={{ ...styles.sectionSubtitle, marginTop: '16px' }}>
            Learn from industry professionals with real-world experience
          </p>
        </div>
        
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentInstructor}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <div style={{
                padding: '36px',
                backgroundColor: 'rgba(17, 24, 39, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '2px solid rgba(6, 182, 212, 0.4)',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  margin: '0 auto 24px',
                  borderRadius: '50%',
                  background: 'linear-gradient(to bottom right, #06b6d4, #a855f7)',
                  padding: '3px',
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: '#111827',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    fontWeight: 700,
                    color: '#22d3ee',
                  }}>
                    {instructors[currentInstructor].image}
                  </div>
                </div>
                
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '10px' }}>
                  {instructors[currentInstructor].name}
                </h3>
                
                <p style={{ fontSize: '16px', color: '#22d3ee', fontWeight: 600, marginBottom: '10px' }}>
                  {instructors[currentInstructor].role}
                </p>
                
                <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                  {instructors[currentInstructor].expertise}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px', gap: '12px' }}>
            {instructors.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentInstructor(index)}
                style={{
                  height: '8px',
                  width: index === currentInstructor ? '48px' : '8px',
                  borderRadius: '999px',
                  backgroundColor: index === currentInstructor ? '#22d3ee' : '#4b5563',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" style={styles.section}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={styles.sectionTitle}>Master Your Craft with Expert-Led Training</h2>
          <p style={{ ...styles.sectionSubtitle, marginTop: '16px' }}>
            Our courses are immersive, live, and interactive learning experiences designed for <span style={{ color: '#22d3ee', fontWeight: 600 }}>your success</span>.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {courses.map((course, index) => (
            <Card key={index} item={course} index={index} />
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section id="founder" style={{ ...styles.section, backgroundColor: '#000', paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={styles.sectionTitle}>A Message from the Founder</h2>
        </div>
        
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '32px',
          backgroundColor: 'rgba(17, 24, 39, 0.7)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '2px solid rgba(6, 182, 212, 0.4)',
        }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'linear-gradient(to bottom right, #06b6d4, #a855f7)',
              padding: '3px',
              flexShrink: 0,
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 700,
                color: '#22d3ee',
              }}>AJ</div>
            </div>
            
            <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '14px', color: '#d1d5db', lineHeight: 1.6 }}>
                At Tensor Security Academy, we believe in direct, personalized guidance. Every program is built around <span style={{ color: '#22d3ee', fontWeight: 600 }}>one-on-one live training with expert mentors</span>.
              </p>
              
              <p style={{ fontSize: '14px', color: '#d1d5db', lineHeight: 1.6 }}>
                Our mentors provide real-time feedback and career advice. Your success is our mission.
              </p>
              
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#22d3ee' }}>
                — Abrar Jahin Sachcha, Founder
              </p>
              
              <div style={{ paddingTop: '8px' }}>
                <GradientButton>
                  <Linkedin style={{ width: '16px', height: '16px' }} />
                  Connect on LinkedIn
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={styles.section}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={styles.sectionTitle}>Professional Cybersecurity & Tech Solutions</h2>
          <p style={{ ...styles.sectionSubtitle, marginTop: '16px' }}>
            We partner with businesses to fortify their digital assets and drive innovation.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '50px',
        }}>
          {services.map((service, index) => (
            <Card key={index} item={service} index={index} />
          ))}
        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
          <GradientButton large>Get a Free Consultation</GradientButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{
        backgroundColor: '#111827',
        borderTop: '2px solid rgba(6, 182, 212, 0.3)',
        padding: '60px 24px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '40px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="/logo1.jpg" alt="Logo" style={{ width: '40px', height: '40px' }} />
                <span style={{ fontSize: '16px', fontWeight: 700 }}>Tensor Security</span>
              </div>
              <p style={{ color: '#9ca3af', lineHeight: 1.6, fontSize: '13px' }}>
                Elite cybersecurity and AI training academy transforming minds into professionals.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#22d3ee' }}>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={() => scrollToSection('courses')} style={{ background: 'none', border: 'none', color: '#9ca3af', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '13px' }}>Courses</button>
                <button onClick={() => scrollToSection('services')} style={{ background: 'none', border: 'none', color: '#9ca3af', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '13px' }}>Services</button>
                <button onClick={() => scrollToSection('founder')} style={{ background: 'none', border: 'none', color: '#9ca3af', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '13px' }}>About Us</button>
                <button onClick={() => scrollToSection('contact')} style={{ background: 'none', border: 'none', color: '#9ca3af', textAlign: 'left', cursor: 'pointer', padding: 0, fontSize: '13px' }}>Contact</button>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#22d3ee' }}>Get in Touch</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MessageCircle style={{ width: '16px', height: '16px', color: '#22d3ee' }} />
                  <span style={{ color: '#9ca3af', fontSize: '13px' }}>WhatsApp Support</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail style={{ width: '16px', height: '16px', color: '#22d3ee' }} />
                  <span style={{ color: '#9ca3af', fontSize: '13px' }}>abrar@tensorsecurity.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin style={{ width: '16px', height: '16px', color: '#22d3ee' }} />
                  <span style={{ color: '#9ca3af', fontSize: '13px' }}>Dhaka, Bangladesh</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', paddingTop: '10px' }}>
                <a href="#" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundImage: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Linkedin style={{ width: '18px', height: '18px', color: '#22d3ee' }} />
                </a>
                <a href="#" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundImage: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <MessageCircle style={{ width: '18px', height: '18px', color: '#22d3ee' }} />
                </a>
              </div>
            </div>
          </div>
          
          <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(6, 182, 212, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <p style={{ color: '#9ca3af', fontSize: '13px' }}>© 2025 Tensor Security Academy. All Rights Reserved.</p>
              <div style={{ display: 'flex', gap: '24px' }}>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '13px' }}>Privacy Policy</a>
                <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '13px' }}>Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TensorSecurityAcademy;
