// app/(marketing)/about/team/page.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageSquare, Quote, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Linkedin from '@mui/icons-material/LinkedIn';
import Instagram from '@mui/icons-material/Instagram';
import Facebook from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import CSSAuroraBackground from '@/components/backgrounds/CSSAuroraBackground';
import styles from '../page.module.css';
import { useState } from 'react';

const teamMembers = [
  {
    name: 'Abrar Jahin',
    role: 'Founder and CEO, Security Researcher',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    quote: 'TSA was born from a simple belief: exceptional talent shouldn\'t be limited by geography or financial barriers. Every student who breaks through represents our collective victory against an outdated system.',
    socials: {
      linkedin: 'https://linkedin.com/in/abrar-jahin',
      twitter: 'https://twitter.com/abrajahin',
      facebook: 'https://facebook.com/abrajahin',
      instagram: 'https://instagram.com/abrajahin',
    },
    isFounder: true,
  },
  {
    name: 'Nuren Tasnim',
    role: 'Director of Business Development',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    quote: 'Watching our students transform from uncertain beginners to confident professionals is why I do this. TSA isn\'t just teaching skills—we\'re changing lives and rewriting futures.',
    socials: {
      linkedin: 'https://linkedin.com/in/nuren',
      twitter: 'https://twitter.com/nuren',
      facebook: 'https://facebook.com/nuren',
      instagram: 'https://instagram.com/nuren',
    },
  },
  {
    name: 'Abid Hossain Ove',
    role: 'Managing Director (Academics)',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    quote: 'Education should empower, not overwhelm. At TSA, we break down complex cybersecurity concepts into actionable knowledge that students can apply from day one.',
    socials: {
      linkedin: 'https://linkedin.com/in/abid',
      twitter: 'https://twitter.com/abid',
      facebook: 'https://facebook.com/abid',
      instagram: 'https://instagram.com/abid',
    },
  },
  {
    name: 'Saobia Tinni',
    role: 'Principal Web Engineer',
    image: 'https://ik.imagekit.io/ekb0d0it0/Saobia%20Islam.png?updatedAt=1764317906408',
    quote: 'Technology is the great equalizer. Through TSA, we\'re building bridges that connect passionate learners with opportunities that were once out of reach.',
    socials: {
      linkedin: 'https://linkedin.com/in/saobia',
      twitter: 'https://twitter.com/saobia',
      facebook: 'https://facebook.com/saobia',
      instagram: 'https://instagram.com/saobia',
    },
  },
  {
    name: 'Iftekhar Salehin',
    role: 'Managing Director (Operations)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    quote: 'Behind every success story is a system that works seamlessly. I\'m proud to ensure TSA operates with excellence so our students can focus on what matters—learning and growing.',
    socials: {
      linkedin: 'https://linkedin.com/in/iftekhar',
      twitter: 'https://twitter.com/iftekhar',
      facebook: 'https://facebook.com/iftekhar',
      instagram: 'https://instagram.com/iftekhar',
    },
  },
  {
    name: 'Mubtasim Fuad',
    role: 'Director of TSA Labs, Red Team Analyst',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    quote: 'Real-world cybersecurity isn\'t learned from books alone. TSA Labs gives students hands-on experience with the actual challenges they\'ll face in their careers.',
    socials: {
      linkedin: 'https://linkedin.com/in/mubtasim',
      twitter: 'https://twitter.com/mubtasim',
      facebook: 'https://facebook.com/mubtasim',
      instagram: 'https://instagram.com/mubtasim',
    },
  },
  {
    name: 'Prottoy Rudro',
    role: 'Faculty Member, Cyber Security Expert',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    quote: 'Teaching at TSA means preparing students for tomorrow\'s threats, not yesterday\'s textbook examples. Our curriculum evolves as fast as the cybersecurity landscape itself.',
    socials: {
      linkedin: 'https://linkedin.com/in/prottoy',
      twitter: 'https://twitter.com/prottoy',
      facebook: 'https://facebook.com/prottoy',
      instagram: 'https://instagram.com/prottoy',
    },
  },
];

export default function TeamPage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const founder = teamMembers[0];
  const members = teamMembers.slice(1);

  return (
    <CSSAuroraBackground intensity="low">
      <div className={styles.pageWrapper}>
        {/* BACK BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.backButtonContainer}
        >
          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className={styles.backButton}
            >
              <ArrowLeft style={{ width: '18px', height: '18px' }} />
              Back to About
            </motion.button>
          </Link>
        </motion.div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={styles.heroSection}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={styles.heroTitle}
          >
            Meet Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={styles.heroSubtitle}
          >
            The architects who transformed vision into reality
          </motion.p>
        </motion.div>

        {/* TEAM SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.section}
        >
         {/* FOUNDER - First Row */}
<div className={styles.founderRow}>
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={styles.compactTeamCard}
    style={{ border: '3px solid #FFD700', boxShadow: '0 15px 50px rgba(255, 215, 0, 0.3)' }}
  >
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4, repeat: Infinity }}
      className={styles.compactCardGlow}
      style={{ background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent 60%)' }}
    />

    <div className={styles.compactCardBadge} style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.35), rgba(255, 165, 0, 0.25))', border: '2px solid #FFD700', color: '#FFD700' }}>
      <Sparkles style={{ width: '12px', height: '12px' }} />
      FOUNDER
    </div>

    <motion.div
      animate={{
        boxShadow: [
          '0 0 25px rgba(255, 215, 0, 0.4)',
          '0 0 50px rgba(255, 165, 0, 0.6)',
          '0 0 25px rgba(255, 215, 0, 0.4)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity }}
      className={styles.compactCardImage}
      style={{ backgroundImage: `url('${founder.image}')`, border: '4px solid #FFD700' }}
    />

    <h3 className={styles.compactCardName} style={{ color: '#FFD700' }}>{founder.name}</h3>
    <p className={styles.compactCardRole} style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{founder.role}</p>

    {/* EXPAND BUTTON */}
   <div 
  className={styles.expandQuoteIcon} 
  onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
  style={{ cursor: 'pointer', fontSize: '20px', color: expandedCard === 0 ? '#FFD700' : '#ccc' }}
>
  <Quote />
</div>

    {/* QUOTE EXPAND */}
    <AnimatePresence>
      {expandedCard === 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.compactQuoteExpand}
          style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 165, 0, 0.04))', border: '1.5px solid rgba(255, 215, 0, 0.25)' }}
        >
          <MessageSquare style={{ width: '20px', height: '20px', color: '#FFD700', marginBottom: '8px' }} />
          <p className={styles.compactQuoteText}>{founder.quote}</p>
        </motion.div>
      )}
    </AnimatePresence>

    {/* SOCIAL LINKS */}
    <div className={styles.compactSocialLinks}>
      <a href={founder.socials.facebook} target="_blank" rel="noopener noreferrer" className={styles.compactSocialButton} style={{ border: '1.5px solid #FFD700', color: '#FFD700' }}>
        <Facebook style={{ width: '18px', height: '18px' }} />
      </a>
      <a href={founder.socials.twitter} target="_blank" rel="noopener noreferrer" className={styles.compactSocialButton} style={{ border: '1.5px solid #FFD700', color: '#FFD700' }}>
        <XIcon style={{ width: '18px', height: '18px' }} />
      </a>
      <a href={founder.socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.compactSocialButton} style={{ border: '1.5px solid #FFD700', color: '#FFD700' }}>
        <Linkedin style={{ width: '18px', height: '18px' }} />
      </a>
      <a href={founder.socials.instagram} target="_blank" rel="noopener noreferrer" className={styles.compactSocialButton} style={{ border: '1.5px solid #FFD700', color: '#FFD700' }}>
        <Instagram style={{ width: '18px', height: '18px' }} />
      </a>
    </div>
  </motion.div>
</div>


          {/* MEMBERS - 3 + 3 Grid */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Core Team Members</h2>
          </div>

          <div className={styles.compactTeamGrid}>
            {members.map((member, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.08 }}
    whileHover={{ y: -8 }}
    className={styles.compactTeamCard}
  >
    <motion.div
      animate={{ opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
      className={styles.compactCardGlow}
    />

    <motion.div
      animate={{
        boxShadow: [
          '0 0 20px rgba(0, 212, 255, 0.3)',
          '0 0 40px rgba(124, 58, 237, 0.5)',
          '0 0 20px rgba(0, 212, 255, 0.3)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity }}
      className={styles.compactCardImage}
      style={{ backgroundImage: `url('${member.image}')` }}
    />

    <h3 className={styles.compactCardName}>{member.name}</h3>
    <p className={styles.compactCardRole}>{member.role}</p>

    {/* EXPAND BUTTON */}
  <div 
  className={styles.expandQuoteIcon} 
  onClick={() => setExpandedCard(expandedCard === index + 1 ? null : index + 1)}
  style={{ cursor: 'pointer', fontSize: '18px', color: expandedCard === index + 1 ? '#00d4ff' : '#ccc' }}
>
  <Quote />
</div>


    {/* QUOTE EXPAND */}
    <AnimatePresence>
      {expandedCard === index + 1 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.compactQuoteExpand}
        >
          <MessageSquare style={{ width: '18px', height: '18px', color: '#00d4ff', marginBottom: '8px' }} />
          <p className={styles.compactQuoteText}>{member.quote}</p>
        </motion.div>
      )}
    </AnimatePresence>

    {/* SOCIAL LINKS */}
    <div className={styles.compactSocialLinks}>
      <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className={styles.compactSocialButton}>
        <Facebook style={{ width: '18px', height: '18px' }} />
      </a>
      <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className={styles.compactSocialButton}>
        <XIcon style={{ width: '18px', height: '18px' }} />
      </a>
      <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.compactSocialButton}>
        <Linkedin style={{ width: '18px', height: '18px' }} />
      </a>
      <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className={styles.compactSocialButton}>
        <Instagram style={{ width: '18px', height: '18px' }} />
      </a>
    </div>
  </motion.div>
))}

          
          </div>
        </motion.section>
      </div>
    </CSSAuroraBackground>
  );
}
