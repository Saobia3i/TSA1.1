'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Optimized particle generation
const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const x = (i * 97) % 1400;
  const y = (i * 131) % 1000;
  const targetY = (i * 173 + 240) % 1000;
  const duration = 4 + (i % 6);
  return { x, y, targetY, duration };
});

// Icon Components - Memoized for performance
const XIcon: React.FC = React.memo(() => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
));
XIcon.displayName = 'XIcon';

const Linkedin: React.FC = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
));
Linkedin.displayName = 'Linkedin';

const Youtube: React.FC = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
));
Youtube.displayName = 'Youtube';

const Instagram: React.FC = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
));
Instagram.displayName = 'Instagram';

const ExternalLink: React.FC<{ className?: string }> = React.memo(({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
));
ExternalLink.displayName = 'ExternalLink';

const Globe: React.FC = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
));
Globe.displayName = 'Globe';

const BookOpen: React.FC<{ className?: string }> = React.memo(({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
));
BookOpen.displayName = 'BookOpen';

const Shield: React.FC = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
));
Shield.displayName = 'Shield';

const Sparkles: React.FC = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </svg>
));
Sparkles.displayName = 'Sparkles';

// Types
interface SocialLink {
  name: string;
  icon: React.FC;
  url: string;
}

interface ServiceItem {
  icon: React.FC;
  label: string;
}

const BusinessCardPage: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Optimized viewport detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    
    // Delay particle load for better initial render
    const timer = setTimeout(() => setIsLoaded(true), 300);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateViewport);
      return () => {
        clearTimeout(timer);
        mediaQuery.removeEventListener('change', updateViewport);
      };
    }

    mediaQuery.addListener(updateViewport);
    return () => {
      clearTimeout(timer);
      mediaQuery.removeListener(updateViewport);
    };
  }, []);

  const LOGO_URL: string = 'https://ik.imagekit.io/ekb0d0it0/logo3.png?updatedAt=1764315001067';
  
  const socialLinks: SocialLink[] = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/tensorsecurityacademy' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@TensorSecurityAcademy' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/tensor_security_academy' },
    { name: 'X', icon: XIcon, url: 'https://x.com/Tensor_Security' }
  ];

  const serviceItems: ServiceItem[] = [
    { icon: Shield, label: 'Security Services' },
    { icon: BookOpen, label: 'Live Training' },
    { icon: Sparkles, label: 'AI & Web3' }
  ];

  const handleVisitWebsite = useCallback(() => {
    window.open('https://tensorsecurityacademy.com', '_blank', 'noopener,noreferrer');
  }, []);

  const handleCourses = useCallback(() => {
    window.open('https://tensorsecurityacademy.com/courses', '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-start justify-center overflow-x-hidden px-2 sm:px-4 md:px-6 lg:px-8"
      style={{ 
        paddingTop: 'max(calc(var(--navbar-height, 60px) + 24px), 80px)',
        paddingBottom: 'clamp(32px, 5vw, 64px)'
      }}
    >
      {/* Background Grid - Optimized */}
      <div className="hidden sm:block fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)] pointer-events-none opacity-50" />

      {/* Animated Particles - Mobile optimized */}
      <AnimatePresence>
        {isLoaded && (
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {PARTICLES.slice(0, isMobile ? 6 : 12).map((particle, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-cyan-500/60 rounded-full will-change-transform"
                initial={{ x: particle.x, y: particle.y, opacity: 0 }}
                animate={{ 
                  y: [particle.y, particle.targetY], 
                  opacity: [0, 0.6, 0] 
                }}
                transition={{ 
                  duration: particle.duration + (isMobile ? 2 : 0), 
                  repeat: Infinity, 
                  ease: 'linear',
                  delay: i * 0.3
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full flex justify-center"
        >
          <motion.div
            onHoverStart={() => !isMobile && setIsHovered(true)}
            onHoverEnd={() => !isMobile && setIsHovered(false)}
            className="relative group w-full max-w-[calc(100vw-1rem)] xs:max-w-[22rem] sm:max-w-2xl md:max-w-3xl"
          >
            {/* Glow Border Effect - Smooth transition */}
            <motion.div
              className="absolute -inset-[2px] sm:-inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl sm:rounded-2xl blur opacity-20 sm:opacity-30 group-hover:opacity-100 pointer-events-none"
              animate={{ 
                scale: isHovered ? 1.02 : 1,
                opacity: isHovered ? 1 : isMobile ? 0.2 : 0.3
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />

            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg sm:rounded-2xl p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-2xl border border-cyan-500/20 backdrop-blur-xl w-full">

              {/* Falling Binary Code Effect - Mobile optimized */}
              <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] sm:opacity-[0.08] overflow-hidden rounded-xl sm:rounded-2xl">
                {[...Array(isMobile ? 3 : 6)].map((_, i) => (
                  <motion.div
                    key={`binary-${i}`}
                    className="absolute top-[-120px] text-[8px] sm:text-[9px] font-mono text-emerald-300/35 whitespace-pre leading-3 will-change-transform"
                    style={{ left: `${10 + i * (isMobile ? 28 : 14)}%` }}
                    initial={{ y: -200, opacity: 0 }}
                    animate={{ y: 900, opacity: [0, 0.35, 0] }}
                    transition={{ 
                      duration: 20 + (i % 3) * 4, 
                      repeat: Infinity, 
                      ease: 'linear', 
                      delay: i * 0.7 
                    }}
                  >
                    {'01001101\n10101010\n00110110\n11100011\n01010101\n11001010\n00110011\n10101100'}
                  </motion.div>
                ))}
              </div>

              {/* Animated Gradient Orbs - Smoother, slower motion */}
              <motion.div
                className="pointer-events-none absolute -inset-[35%] z-0 will-change-transform"
                animate={{ 
                  rotate: [0, 4, 0], 
                  x: ['-26%', '26%', '-26%'], 
                  y: ['-20%', '18%', '-20%'] 
                }}
                transition={{ 
                  duration: isMobile ? 18 : 12, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
              >
                <div className="h-full w-full bg-[linear-gradient(138deg,transparent_34%,rgba(34,211,238,0.16)_48%,rgba(99,102,241,0.12)_58%,transparent_72%)] blur-2xl" />
              </motion.div>

              <motion.div
                className="pointer-events-none absolute -inset-[30%] z-0 will-change-transform"
                animate={{ 
                  rotate: [0, -3, 0], 
                  x: ['22%', '-20%', '22%'], 
                  y: ['16%', '-14%', '16%'] 
                }}
                transition={{ 
                  duration: isMobile ? 20 : 14, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
              >
                <div className="h-full w-full bg-[linear-gradient(133deg,transparent_38%,rgba(34,211,238,0.13)_54%,transparent_70%)] blur-xl" />
              </motion.div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-cyan-500/35 rounded-tl-xl sm:rounded-tl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-cyan-500/35 rounded-br-xl sm:rounded-br-2xl pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 w-full flex flex-col items-center space-y-3.5 sm:space-y-5 md:space-y-6 lg:space-y-7">
                
                {/* Logo Section */}
                <motion.div 
                  className="flex justify-center w-full pt-1 sm:pt-2"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500 blur-lg sm:blur-xl opacity-18 sm:opacity-22 rounded-full" />
                    <img 
                      src={LOGO_URL} 
                      alt="Tensor Security Academy" 
                      className="relative w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain rounded-lg sm:rounded-xl" 
                      loading="eager"
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  className="text-base xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent w-full px-1.5 sm:px-2 leading-tight"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  Tensor Security Academy
                </motion.h1>

                {/* Location Badge */}
                <motion.div 
                  className="flex justify-center w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                >
                  <motion.div 
                    className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full touch-manipulation"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Globe />
                    <span className="text-cyan-400 font-semibold text-[11px] xs:text-xs sm:text-sm md:text-base whitespace-normal xs:whitespace-nowrap text-center">
                      US Based <span className="hidden xs:inline">&bull; Global Platform</span>
                    </span>
                  </motion.div>
                </motion.div>

                {/* Tagline */}
                <motion.p
                  className="text-center text-gray-300 text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xl w-full px-2.5 sm:px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                >
                  <span className="text-cyan-400 font-semibold">Decentralized Global EdTech Platform</span>
                  <span className="mx-1 sm:mx-1.5 md:mx-2">&bull;</span>
                  <span className="inline-block xs:inline">Break into <span className="text-blue-400 font-semibold">Security, AI/ML & Web3</span> with live training</span>
                  <span className="mx-1 sm:mx-1.5 md:mx-2">&bull;</span>
                  Join our <span className="text-purple-400 font-semibold">Global Community</span>
                </motion.p>

                {/* Services Icons - LARGER CIRCLES */}
                <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full flex-wrap py-3 sm:py-4 md:py-5">
                  {serviceItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isLiveTraining = item.label === 'Live Training';
                    return (
                      <motion.div
                        key={`service-${index}`}
                        className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-2 min-w-[72px] sm:min-w-[82px]"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 + index * 0.08, duration: 0.35 }}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <div
                          className={`bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-xl border border-cyan-500/25 transition-all duration-300 ${
                            isLiveTraining 
                              ? 'p-4 sm:p-5 md:p-6 shadow-[0_0_28px_rgba(34,211,238,0.35)]' 
                              : 'p-3 sm:p-3.5 md:p-4'
                          }`}
                        >
                          <IconComponent />
                        </div>
                        <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 text-center leading-tight max-w-[76px] sm:max-w-none px-1">
                          {item.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Action Buttons - Enhanced with smooth glow */}
                <motion.div 
                  className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 w-full px-2 sm:px-3 max-w-[340px] sm:max-w-none mx-auto"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.4 }}
                >
                  <motion.button
                    onClick={handleVisitWebsite}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="
                      relative overflow-visible group
                      flex-1 inline-flex items-center justify-center gap-2
                      rounded-full px-3 py-2.5 sm:px-4 sm:py-3
                      text-[11px] sm:text-sm font-semibold
                      bg-gradient-to-r from-gray-800/95 via-gray-900/95 to-slate-900/95
                      text-cyan-300 hover:text-cyan-200
                      border border-cyan-500/40 hover:border-cyan-400/60
                      shadow-[0_4px_20px_rgba(34,211,238,0.25)]
                      hover:shadow-[0_6px_35px_rgba(34,211,238,0.45)]
                      transition-all duration-300
                      touch-manipulation
                    "
                  >
                    {/* Smooth Pulsing Glow */}
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-radial from-cyan-500/28 via-cyan-500/8 to-transparent blur-xl"
                      animate={{
                        scale: [1, 1.35, 1],
                        opacity: [0.28, 0.48, 0.28]
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <ExternalLink className="h-3.5 w-3.5 relative z-10" />
                    <span className="relative z-10">Visit Website</span>
                  </motion.button>

                  <motion.button
                    onClick={handleCourses}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="
                      relative overflow-visible group
                      flex-1 inline-flex items-center justify-center gap-2
                      rounded-full px-3 py-2.5 sm:px-4 sm:py-3
                      text-[11px] sm:text-sm font-semibold
                      bg-gradient-to-r from-gray-800/95 via-gray-900/95 to-slate-900/95
                      text-cyan-300 hover:text-cyan-200
                      border border-cyan-500/40 hover:border-cyan-400/60
                      shadow-[0_4px_20px_rgba(34,211,238,0.25)]
                      hover:shadow-[0_6px_35px_rgba(34,211,238,0.45)]
                      transition-all duration-300
                      touch-manipulation
                    "
                  >
                    {/* Smooth Pulsing Glow */}
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-radial from-cyan-500/28 via-cyan-500/8 to-transparent blur-xl"
                      animate={{
                        scale: [1, 1.35, 1],
                        opacity: [0.28, 0.48, 0.28]
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.6
                      }}
                    />
                    <BookOpen className="h-3.5 w-3.5 relative z-10" />
                    <span className="relative z-10">Our Courses</span>
                  </motion.button>
                </motion.div>

                {/* Social Links Section - Perfectly balanced */}
                <motion.div 
                  className="border-t border-gray-700/35 pt-5 sm:pt-6 md:pt-7 mt-5 sm:mt-6 md:mt-7 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.4 }}
                >
                  <p className="text-center text-cyan-300 text-[10px] xs:text-xs sm:text-sm mb-3 sm:mb-4 md:mb-5 font-semibold tracking-wider uppercase w-full">
                    Follow Us
                  </p>
                  
                  {/* Social Cards Grid */}
                  <div className="flex justify-center w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-4 w-full max-w-[300px] sm:max-w-xl md:max-w-2xl justify-items-center px-1 sm:px-0">
                      {socialLinks.map((social, index) => {
                        const IconComponent = social.icon;
                        return (
                          <motion.a
                            key={`social-${social.name}`}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative w-full max-w-[95px] sm:max-w-[130px] md:max-w-[140px] min-h-[62px] sm:min-h-[80px] md:min-h-[85px] p-1.5 sm:p-2.5 md:p-3 bg-gray-900/55 border border-cyan-500/22 rounded-lg sm:rounded-xl transition-all duration-300 overflow-hidden flex flex-col items-center justify-center text-center touch-manipulation active:scale-95"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.95 + index * 0.06, duration: 0.35 }}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {/* Smooth Animated Gradient */}
                            <motion.div
                              className="pointer-events-none absolute -inset-[38%] will-change-transform"
                              animate={{ 
                                rotate: [0, 5, 0], 
                                x: ['-23%', '26%', '-23%'], 
                                y: ['-14%', '12%', '-14%'] 
                              }}
                              transition={{ 
                                duration: isMobile ? 14 : 9, 
                                repeat: Infinity, 
                                ease: 'easeInOut', 
                                delay: index * 0.25 
                              }}
                            >
                              <div className="h-full w-full bg-[linear-gradient(136deg,transparent_38%,rgba(34,211,238,0.18)_52%,transparent_68%)] blur-lg" />
                            </motion.div>

                            {/* Icon and Name */}
                            <div className="relative flex items-center justify-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1 md:mb-1.5">
                              <div className="text-cyan-300 group-hover:text-cyan-100 transition-colors duration-300 flex-shrink-0 scale-[0.86] sm:scale-100">
                                <IconComponent />
                              </div>
                              <span className="text-[9px] sm:text-xs md:text-sm font-semibold text-cyan-100 leading-tight">
                                {social.name}
                              </span>
                            </div>

                            {/* Smooth Hover Effects */}
                            <div className="absolute inset-0 rounded-lg sm:rounded-xl ring-1 ring-cyan-400/0 group-hover:ring-cyan-400/45 transition-all duration-300 pointer-events-none" />
                            <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/7 transition-colors duration-300 pointer-events-none rounded-lg sm:rounded-xl" />

                            {/* Corner Decorations */}
                            <div className="absolute top-0 left-0 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 border-t border-l border-cyan-400/35 rounded-tl-lg sm:rounded-tl-xl pointer-events-none" />
                            <div className="absolute bottom-0 right-0 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 border-b border-r border-cyan-400/35 rounded-br-lg sm:rounded-br-xl pointer-events-none" />
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Side Decorative Lines */}
                <div className="hidden sm:block absolute top-1/2 left-0 w-px h-24 md:h-32 bg-gradient-to-b from-transparent via-cyan-500/35 to-transparent pointer-events-none" />
                <div className="hidden sm:block absolute top-1/2 right-0 w-px h-24 md:h-32 bg-gradient-to-b from-transparent via-cyan-500/35 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Bottom Glow Effect */}
          <motion.div
            className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-cyan-500/12 rounded-full blur-3xl pointer-events-none"
            animate={{ 
              scale: [1, 1.12, 1], 
              opacity: [0.12, 0.25, 0.12] 
            }}
            transition={{ 
              duration: isMobile ? 10 : 6, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessCardPage;