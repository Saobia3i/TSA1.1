'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Globe2, 
  Languages, 
  Mail, 
  MapPin,
  Quote,
  Shield,
  Star,
  Target,
  Users,
  Mic
} from 'lucide-react';
import { useRef } from 'react';
import { getFeaturedConsultants } from '@/features/consultant/Consultantdata';
import Link from 'next/link';
import Image from 'next/image';

export default function ConsultantDetailPage() {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Get the first (and only) consultant
  const consultant = getFeaturedConsultants()[0];

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={pageRef} style={{ 
      minHeight: '100vh', 
      paddingTop: 'clamp(60px, 10vh, 80px)',
      background: '#0a0f1e',
      overflowX: 'hidden'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.05), transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed',
        top: '40%',
        right: '5%',
        width: 'clamp(200px, 40vw, 500px)',
        height: 'clamp(200px, 40vw, 500px)',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1), transparent 70%)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 clamp(16px, 4vw, 60px)',
          marginTop: 'clamp(12px, 2vh, 24px)',
          marginBottom: 'clamp(20px, 4vh, 40px)',
        }}
      >
        <motion.button
          onClick={() => router.back()}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: 'clamp(10px, 2vw, 12px) clamp(18px, 3vw, 24px)',
            background: 'rgba(17, 24, 39, 0.8)',
            border: '2px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '12px',
            color: '#22d3ee',
            fontSize: 'clamp(13px, 2vw, 14px)',
            fontWeight: 600,
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            fontFamily: 'var(--font-nunito)',
          }}
        >
          <ArrowLeft style={{ width: 'clamp(16px, 3vw, 18px)', height: 'clamp(16px, 3vw, 18px)' }} />
          Back
        </motion.button>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative z-10"
      >
        <div style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 60px)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.90))',
              borderRadius: 'clamp(20px, 4vw, 32px)',
              padding: 'clamp(18px, 3.5vw, 44px)',
              border: '2px solid rgba(34, 211, 238, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(34, 211, 238, 0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow Effect */}
            <motion.div
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-20%',
                width: '140%',
                height: '200%',
                background: 'radial-gradient(ellipse, rgba(34, 211, 238, 0.2), transparent 60%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 'clamp(20px, 4vw, 40px)',
              position: 'relative',
              zIndex: 1,
            }}>
              {/* Image Section */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'clamp(12px, 2.5vw, 18px)',
              }}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{
                    position: 'relative',
                    width: 'clamp(130px, 30vw, 220px)',
                    height: 'clamp(130px, 30vw, 220px)',
                    filter: 'drop-shadow(0 0 16px rgba(34, 211, 238, 0.35))',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: '-6px',
                    background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                    borderRadius: 'clamp(18px, 4vw, 28px)',
                    opacity: 0.45,
                    filter: 'blur(18px)',
                  }} />
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: 'clamp(18px, 4vw, 28px)',
                    overflow: 'hidden',
                    border: '4px solid rgba(34, 211, 238, 0.4)',
                    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(168, 85, 247, 0.15))',
                  }}>
                    {consultant.image ? (
                      <Image
                        src={consultant.image}
                        alt={consultant.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 220px"
                        style={{ objectFit: 'cover' }}
                        priority
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'clamp(50px, 12vw, 110px)',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}>
                        {consultant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Location Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: 'clamp(8px, 2vw, 10px) clamp(16px, 3vw, 20px)',
                    background: 'rgba(34, 211, 238, 0.1)',
                    border: '2px solid rgba(34, 211, 238, 0.3)',
                    borderRadius: '50px',
                  }}
                >
                  <MapPin style={{ width: 'clamp(14px, 3vw, 16px)', height: 'clamp(14px, 3vw, 16px)', color: '#22d3ee' }} />
                  <span style={{
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    color: '#22d3ee',
                    fontWeight: 600,
                    fontFamily: 'var(--font-nunito)',
                  }}>
                    {consultant.location}
                  </span>
                </motion.div>
              </div>

              {/* Info Section */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(16px, 3vw, 20px)',
                textAlign: 'center',
              }}>
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      fontSize: 'clamp(24px, 6vw, 48px)',
                      fontWeight: 800,
                      color: '#ffffff',
                      textShadow: '0 2px 14px rgba(255, 255, 255, 0.25)',
                      marginBottom: 'clamp(8px, 2vw, 12px)',
                      fontFamily: 'var(--font-nunito)',
                      lineHeight: 1.2,
                      wordBreak: 'break-word',
                    }}
                  >
                    {consultant.name}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      fontSize: 'clamp(14px, 3vw, 20px)',
                      color: '#67e8f9',
                      textShadow: '0 1px 10px rgba(34, 211, 238, 0.35)',
                      fontWeight: 700,
                      marginBottom: 'clamp(6px, 1.5vw, 8px)',
                      fontFamily: 'var(--font-nunito)',
                    }}
                  >
                    {consultant.title}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{
                      fontSize: 'clamp(12px, 2.5vw, 16px)',
                      color: '#d8b4fe',
                      textShadow: '0 1px 10px rgba(168, 85, 247, 0.35)',
                      fontWeight: 600,
                      fontFamily: 'var(--font-nunito)',
                    }}
                  >
                    {consultant.role}
                  </motion.p>
                </div>

                {/* Quick Contact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    justifyContent: 'center',
                  }}
                >
                  {consultant.linkedIn && (
                    <a
                      href={consultant.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          padding: 'clamp(10px, 2vw, 12px) clamp(18px, 3vw, 24px)',
                          background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.32), rgba(168, 85, 247, 0.28))',
                          border: '2px solid rgba(34, 211, 238, 0.75)',
                          borderRadius: '12px',
                          color: '#a5f3fc',
                          fontSize: 'clamp(12px, 2.5vw, 14px)',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'var(--font-nunito)',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 8px 24px rgba(34, 211, 238, 0.22)',
                        }}
                      >
                        LinkedIn Profile
                      </motion.button>
                    </a>
                  )}
                  {consultant.email && (
                    <a href={`mailto:${consultant.email}`} style={{ textDecoration: 'none' }}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          padding: 'clamp(10px, 2vw, 12px) clamp(18px, 3vw, 24px)',
                          background: 'rgba(168, 85, 247, 0.15)',
                          border: '2px solid rgba(168, 85, 247, 0.4)',
                          borderRadius: '12px',
                          color: '#a855f7',
                          fontSize: 'clamp(12px, 2.5vw, 14px)',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: 'var(--font-nunito)',
                        }}
                      >
                        <Mail style={{ width: 'clamp(14px, 3vw, 16px)', height: 'clamp(14px, 3vw, 16px)' }} />
                        Contact
                      </motion.button>
                    </a>
                  )}
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                    gap: 'clamp(10px, 2vw, 12px)',
                    marginTop: 'clamp(12px, 3vw, 16px)',
                  }}
                >
                  {[
                    { icon: Briefcase, value: consultant.experience.length + '+', label: 'Major Roles' },
                    { icon: Award, value: consultant.certifications.length + '+', label: 'Certifications' },
                    { icon: Globe2, value: consultant.languages.length, label: 'Languages' },
                    { icon: Target, value: consultant.specializations.length + '+', label: 'Specializations' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        padding: 'clamp(12px, 3vw, 16px)',
                        background: 'rgba(34, 211, 238, 0.05)',
                        border: '1px solid rgba(34, 211, 238, 0.2)',
                        borderRadius: 'clamp(12px, 3vw, 16px)',
                        textAlign: 'center',
                      }}
                    >
                      <stat.icon style={{
                        width: 'clamp(18px, 4vw, 24px)',
                        height: 'clamp(18px, 4vw, 24px)',
                        color: '#22d3ee',
                        margin: '0 auto clamp(6px, 1.5vw, 8px)',
                      }} />
                      <div style={{
                        fontSize: 'clamp(16px, 4vw, 20px)',
                        fontWeight: 800,
                        color: 'white',
                        fontFamily: 'var(--font-nunito)',
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: 'clamp(9px, 2vw, 11px)',
                        color: '#ffffff',
                        fontFamily: 'var(--font-nunito)',
                      }}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div style={{
        maxWidth: '1080px',
        margin: 'clamp(40px, 8vw, 80px) auto',
        padding: 'clamp(20px, 4vw, 40px)',
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.92), rgba(17, 24, 39, 0.86))',
        border: '2px solid rgba(34, 211, 238, 0.2)',
        borderRadius: 'clamp(16px, 4vw, 24px)',
        boxShadow: '0 18px 50px rgba(0, 0, 0, 0.4), 0 0 50px rgba(34, 211, 238, 0.08)',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(168, 85, 247, 0.08))',
          border: '2px solid rgba(34, 211, 238, 0.2)',
          borderRadius: 'clamp(14px, 3vw, 20px)',
          padding: 'clamp(20px, 4vw, 36px)',
          position: 'relative',
          marginBottom: 'clamp(20px, 4vw, 32px)',
        }}>
          <Quote style={{
            position: 'absolute',
            top: 'clamp(10px, 2.5vw, 16px)',
            left: 'clamp(10px, 2.5vw, 16px)',
            width: 'clamp(20px, 5vw, 34px)',
            height: 'clamp(20px, 5vw, 34px)',
            color: 'rgba(34, 211, 238, 0.25)',
          }} />
          <p style={{
            fontSize: 'clamp(14px, 3vw, 24px)',
            fontStyle: 'italic',
            color: '#ffffff',
            lineHeight: 1.7,
            textAlign: 'center',
            fontFamily: 'var(--font-nunito)',
            paddingTop: 'clamp(12px, 3vw, 18px)',
          }}>
            "{consultant.quote}"
          </p>
        </div>
        {/* Biography */}
        <ContentSection
          icon={Users}
          title="Biography"
          delay={0.2}
        >
          <p style={{
            fontSize: 'clamp(13px, 2.5vw, 16px)',
            color: '#ffffff',
            lineHeight: 1.8,
            fontFamily: 'var(--font-nunito)',
            whiteSpace: 'pre-line',
          }}>
            {consultant.biography}
          </p>
        </ContentSection>

        {/* Key Achievements */}
        <ContentSection
          icon={Award}
          title="Key Achievements"
          delay={0.3}
        >
          <div style={{
            display: 'grid',
            gap: 'clamp(12px, 3vw, 16px)',
          }}>
            {consultant.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                style={{
                  padding: 'clamp(14px, 3vw, 20px)',
                  background: 'rgba(34, 211, 238, 0.05)',
                  border: '1px solid rgba(34, 211, 238, 0.2)',
                  borderRadius: 'clamp(12px, 3vw, 16px)',
                  display: 'flex',
                  gap: 'clamp(10px, 3vw, 16px)',
                  alignItems: 'flex-start',
                }}
              >
                <Star style={{
                  width: 'clamp(18px, 4vw, 24px)',
                  height: 'clamp(18px, 4vw, 24px)',
                  color: '#22d3ee',
                  flexShrink: 0,
                  marginTop: '2px',
                }} />
                <span style={{
                  fontSize: 'clamp(12px, 2.5vw, 16px)',
                  color: '#ffffff',
                  lineHeight: 1.6,
                  fontFamily: 'var(--font-nunito)',
                }}>
                  {achievement}
                </span>
              </motion.div>
            ))}
          </div>
        </ContentSection>

        {/* Experience */}
        <ContentSection
          icon={Briefcase}
          title="Professional Experience"
          delay={0.4}
        >
          <div style={{ display: 'grid', gap: 'clamp(16px, 4vw, 24px)' }}>
            {consultant.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                style={{
                  padding: 'clamp(16px, 4vw, 24px)',
                  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.6))',
                  border: '2px solid rgba(34, 211, 238, 0.2)',
                  borderRadius: 'clamp(14px, 4vw, 20px)',
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(8px, 2vw, 12px)',
                  marginBottom: 'clamp(8px, 2vw, 12px)',
                }}>
                  <div>
                    <h4 style={{
                      fontSize: 'clamp(16px, 3vw, 22px)',
                      fontWeight: 700,
                      color: 'white',
                      marginBottom: 'clamp(4px, 1vw, 6px)',
                      fontFamily: 'var(--font-nunito)',
                    }}>
                      {exp.position}
                    </h4>
                    <p style={{
                      fontSize: 'clamp(13px, 2.5vw, 16px)',
                      color: '#22d3ee',
                      fontWeight: 600,
                      fontFamily: 'var(--font-nunito)',
                    }}>
                      {exp.organization}
                    </p>
                  </div>
                  <span style={{
                    padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)',
                    background: 'rgba(168, 85, 247, 0.15)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '8px',
                    fontSize: 'clamp(11px, 2vw, 13px)',
                    color: '#a855f7',
                    fontWeight: 600,
                    fontFamily: 'var(--font-nunito)',
                    display: 'inline-block',
                    width: 'fit-content',
                  }}>
                    {exp.duration}
                  </span>
                </div>
                <p style={{
                  fontSize: 'clamp(12px, 2vw, 15px)',
                  color: '#ffffff',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-nunito)',
                }}>
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </ContentSection>

        {/* Expertise Areas */}
        <ContentSection
          icon={Target}
          title="Areas of Expertise"
          delay={0.5}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(14px, 3vw, 20px)',
          }}>
            {consultant.expertise.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{
                  padding: 'clamp(16px, 4vw, 24px)',
                  background: 'rgba(34, 211, 238, 0.05)',
                  border: '2px solid rgba(34, 211, 238, 0.2)',
                  borderRadius: 'clamp(14px, 4vw, 20px)',
                }}
              >
                <h4 style={{
                  fontSize: 'clamp(14px, 3vw, 18px)',
                  fontWeight: 700,
                  color: '#22d3ee',
                  marginBottom: 'clamp(12px, 3vw, 16px)',
                  fontFamily: 'var(--font-nunito)',
                }}>
                  {area.category}
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(8px, 2vw, 10px)',
                }}>
                  {area.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'clamp(8px, 2vw, 10px)',
                      }}
                    >
                      <div style={{
                        width: 'clamp(5px, 1vw, 6px)',
                        height: 'clamp(5px, 1vw, 6px)',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                        boxShadow: '0 0 8px rgba(34, 211, 238, 0.4)',
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontSize: 'clamp(11px, 2vw, 14px)',
                        color: '#ffffff',
                        fontFamily: 'var(--font-nunito)',
                      }}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </ContentSection>

        {/* Education & Languages Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(20px, 4vw, 40px)',
          marginTop: 'clamp(30px, 6vw, 60px)',
        }}>
          {/* Education */}
          <ContentSection
            icon={GraduationCap}
            title="Education"
            delay={0.6}
          >
            <div style={{ display: 'grid', gap: 'clamp(12px, 3vw, 16px)' }}>
              {consultant.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    padding: 'clamp(14px, 3vw, 18px)',
                    background: 'rgba(168, 85, 247, 0.05)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    borderRadius: 'clamp(10px, 3vw, 14px)',
                  }}
                >
                  <h5 style={{
                    fontSize: 'clamp(13px, 2.5vw, 17px)',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: 'clamp(4px, 1vw, 6px)',
                    fontFamily: 'var(--font-nunito)',
                  }}>
                    {edu.degree}
                  </h5>
                  <p style={{
                    fontSize: 'clamp(11px, 2vw, 14px)',
                    color: '#a855f7',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-nunito)',
                  }}>
                    {edu.institution}
                  </p>
                  <p style={{
                    fontSize: 'clamp(10px, 1.8vw, 12px)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-nunito)',
                  }}>
                    {edu.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </ContentSection>

          {/* Languages */}
          <ContentSection
            icon={Languages}
            title="Languages"
            delay={0.7}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(10px, 2vw, 12px)',
            }}>
              {consultant.languages.map((language, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    padding: 'clamp(12px, 3vw, 14px) clamp(16px, 4vw, 20px)',
                    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(168, 85, 247, 0.08))',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                    borderRadius: 'clamp(10px, 3vw, 12px)',
                    fontSize: 'clamp(12px, 2.5vw, 15px)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontFamily: 'var(--font-nunito)',
                    textAlign: 'center',
                  }}
                >
                  {language}
                </motion.div>
              ))}
            </div>
          </ContentSection>
        </div>

        {/* Certifications */}
        <ContentSection
          icon={Award}
          title="Certifications & Credentials"
          delay={0.8}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 'clamp(12px, 3vw, 16px)',
          }}>
            {consultant.certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                style={{
                  padding: 'clamp(12px, 3vw, 16px) clamp(14px, 3vw, 20px)',
                  background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.05), rgba(168, 85, 247, 0.05))',
                  border: '2px solid rgba(34, 211, 238, 0.2)',
                  borderRadius: 'clamp(10px, 3vw, 12px)',
                  fontSize: 'clamp(11px, 2vw, 14px)',
                  color: '#22d3ee',
                  fontWeight: 600,
                  textAlign: 'center',
                  fontFamily: 'var(--font-nunito)',
                }}
              >
                {cert}
              </motion.div>
            ))}
          </div>
        </ContentSection>

        {/* Public Speaking */}
        {consultant.publicSpeaking && consultant.publicSpeaking.length > 0 && (
          <ContentSection
            icon={Mic}
            title="Public Speaking & Conferences"
            delay={0.9}
          >
            <div style={{ display: 'grid', gap: 'clamp(12px, 3vw, 16px)' }}>
              {consultant.publicSpeaking.map((speaking, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    padding: 'clamp(14px, 3vw, 20px)',
                    background: 'rgba(168, 85, 247, 0.05)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    borderRadius: 'clamp(12px, 3vw, 16px)',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(8px, 2vw, 10px)',
                  }}>
                    <div>
                      <h5 style={{
                        fontSize: 'clamp(13px, 2.5vw, 17px)',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: 'clamp(4px, 1vw, 6px)',
                        fontFamily: 'var(--font-nunito)',
                      }}>
                        {speaking.topic}
                      </h5>
                      <p style={{
                        fontSize: 'clamp(11px, 2vw, 14px)',
                        color: '#a855f7',
                        fontFamily: 'var(--font-nunito)',
                      }}>
                        {speaking.event}
                      </p>
                    </div>
                    <span style={{
                      padding: 'clamp(4px, 1vw, 6px) clamp(10px, 2vw, 14px)',
                      background: 'rgba(34, 211, 238, 0.1)',
                      border: '1px solid rgba(34, 211, 238, 0.3)',
                      borderRadius: '8px',
                      fontSize: 'clamp(10px, 2vw, 12px)',
                      color: '#22d3ee',
                      fontWeight: 600,
                      fontFamily: 'var(--font-nunito)',
                      display: 'inline-block',
                      width: 'fit-content',
                    }}>
                      {speaking.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </ContentSection>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            marginTop: 'clamp(40px, 8vw, 80px)',
            marginBottom: 'clamp(40px, 8vw, 80px)',
            padding: 'clamp(30px, 6vw, 60px)',
            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.1))',
            border: '2px solid rgba(34, 211, 238, 0.3)',
            borderRadius: 'clamp(20px, 4vw, 28px)',
            textAlign: 'center',
          }}
        >
          <h3 style={{
            fontSize: 'clamp(20px, 4vw, 32px)',
            fontWeight: 700,
            color: 'white',
            marginBottom: 'clamp(12px, 3vw, 16px)',
            fontFamily: 'var(--font-nunito)',
          }}>
            Ready to Learn from the Best?
          </h3>
          <p style={{
            fontSize: 'clamp(12px, 2.5vw, 16px)',
            color: '#ffffff',
            marginBottom: 'clamp(20px, 4vw, 28px)',
            maxWidth: '600px',
            margin: '0 auto clamp(20px, 4vw, 28px)',
            fontFamily: 'var(--font-nunito)',
          }}>
            Join Tensor Security Academy and gain access to world-class cybersecurity training from legendary experts
          </p>
          <Link href="/courses" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: 'clamp(12px, 3vw, 16px) clamp(24px, 5vw, 36px)',
                background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                border: 'none',
                borderRadius: 'clamp(10px, 3vw, 14px)',
                color: 'white',
                fontSize: 'clamp(13px, 2.5vw, 15px)',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-nunito)',
              }}
            >
              Explore Courses
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

// Helper Component for Content Sections
function ContentSection({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      style={{
        marginTop: 'clamp(30px, 6vw, 60px)',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(10px, 2vw, 12px)',
        marginBottom: 'clamp(16px, 4vw, 24px)',
      }}>
        <div style={{
          width: 'clamp(36px, 8vw, 48px)',
          height: 'clamp(36px, 8vw, 48px)',
          borderRadius: 'clamp(10px, 3vw, 12px)',
          background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(168, 85, 247, 0.2))',
          border: '2px solid rgba(34, 211, 238, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon style={{ width: 'clamp(18px, 4vw, 24px)', height: 'clamp(18px, 4vw, 24px)', color: '#22d3ee' }} />
        </div>
        <h3 style={{
          fontSize: 'clamp(18px, 4vw, 28px)',
          fontWeight: 700,
          color: 'white',
          fontFamily: 'var(--font-nunito)',
        }}>
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}
