'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ChevronDown, ChevronUp, Book, Code, FlaskConical } from 'lucide-react';
import Link from 'next/link';

const customTools = [
  {
    name: 'AI PENTEST Toolkit',
    description: 'AI powered offensive security framework that automates and enhances the entire penetration testing workflow. Integrates large language models for intelligent target scoping, automated reconnaissance, vulnerability chaining, custom payload generation, exploit generation, natural language report writing, and attack path prediction.',
    github: 'https://github.com/tools-tensorsecurityacademy/AI-Pentest-Toolkit',
    color: '#ec4899',
  },
  {
    name: 'DirRumble',
    description: 'Lightning-fast, completely raw HTTP directory and file fuzzing tool that sends exactly what you write - no normalization, no auto fixes, no hidden headers. Perfect for high-speed directory brute-forcing, API endpoint discovery, parameter fuzzing, and WAF bypass testing when you need full control over every single byte.',
    github: 'https://github.com/tools-tensorsecurityacademy/dirrumble',
    color: '#a855f7',
  },
  {
    name: 'NexusTrace',
    description: 'High-speed DNS resolving and subdomain enumeration tool featuring concurrent brute-forcing, passive source scraping (CRT.sh, CertSpotter, DNSdumpster, etc.), custom resolver support, wildcard detection & filtering, DNSSEC validation, AXFR attempts, IPv6 support, and intelligent rate limiting.',
    github: 'https://github.com/tools-tensorsecurityacademy/NexusTrace',
    color: '#22d3ee',
  },
  {
    name: 'GateWaySeeker',
    description: 'Lightning fast admin panel and hidden directory discovery tool with multi-threaded scanning, built-in and custom wordlists, extension brute-forcing (.php, .asp, .bak, etc.), HTTP status code filtering, response size analysis, stealth mode (random delays & User-Agent rotation), and colored console + JSON output.',
    github: 'https://github.com/tools-tensorsecurityacademy/GatewaySeeker',
    color: '#f59e0b',
  },
  {
    name: 'SubScape',
    description: 'Advanced subdomain enumeration engine combining passive reconnaissance (certificate logs, search engines, threat intel feeds), DNS brute-forcing, permutation & alteration generation, takeover detection, custom DNS resolvers, rate-limit evasion, wildcard handling, and export in multiple formats (TXT, JSON, CSV).',
    github: 'https://github.com/tools-tensorsecurityacademy/SubScape',
    color: '#10b981',
  },
  {
    name: 'Cicada',
    description: 'Fast, modular vulnerability scanner for web applications. Supports active and passive scanning, built-in payloads for SQLi, XSS, SSTI, LFI/RFI, SSRF, command injection, and open redirects. Features smart crawler with JavaScript rendering (headless Chrome), automatic parameter discovery, rate limiting, custom headers/cookie support, detailed vulnerability reports (JSON/HTML), and plugin-based payload engine.',
    github: 'https://github.com/tools-tensorsecurityacademy/Cicada',
    color: '#8b5cf6',
  },
  {
    name: 'XSS-Cobra',
    description: 'Ultra fast, payload-agnostic XSS vulnerability scanner with hybrid detection. Features automatic DOM based, reflected, and stored XSS testing, polyglot & context-aware payload generation (HTML, JS, SVG, event handlers, etc.), headless Chrome + static analysis for accurate DOM XSS, intelligent mutation engine (bypasses WAFs and filters), automatic parameter discovery & fuzzing, CSP analysis, detailed proof-of-concept generation, and export in JSON/HTML/TXT.',
    github: 'https://github.com/tools-tensorsecurityacademy/XSS-Cobra',
    color: '#ef4444',
  },
  {
    name: 'SQLStrike',
    description: 'High speed automated SQL injection detection and exploitation assistant. Supports error-based, blind (boolean/time-based), union-based, and stacked queries across MySQL, PostgreSQL, MSSQL, Oracle, and SQLite. Features intelligent payload crafting, tamper scripts (WAF bypass), automatic GET/POST/JSON/headers/cookie testing, customizable time delays, differential response analysis, built-in crawler for parameter discovery, database enumeration (version, users, tables, columns, dump), and detailed JSON/HTML report output.',
    github: 'https://github.com/tools-tensorsecurityacademy/SQLStrike',
    color: '#06b6d4',
  },
];

export default function ToolsPage() {
  const [isOslintOpen, setIsOslintOpen] = useState(false);

  return (
    <div 
      style={{ 
        backgroundColor: '#000', 
        minHeight: '100vh', 
        paddingTop: '90px', 
        overflowX: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 24px' }}>
        
        {/* Back Button */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5, boxShadow: '0 0 30px rgba(34, 211, 238, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(17, 24, 39, 0.4)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(34, 211, 238, 0.4)',
              borderRadius: '12px',
              padding: '12px 24px',
              color: 'white',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: '60px',
              fontFamily: 'var(--font-nunito)',
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowLeft style={{ width: '20px', height: '20px' }} />
            Back to Home
          </motion.button>
        </Link>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #22d3ee, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '24px',
              fontFamily: 'var(--font-nunito)',
              letterSpacing: '2px',
            }}
          >
            Our Custom Tools
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ 
              fontSize: '18px', 
              color: '#d1d5db', 
              maxWidth: '800px', 
              margin: '0 auto',
              lineHeight: 1.8,
              fontFamily: 'var(--font-nunito)',
              fontWeight: 500,
            }}
          >
            Open-source offensive security tools built by TSA to empower penetration testers and security researchers worldwide.
          </motion.p>
        </motion.div>

        {/* Custom Tools Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '32px',
            marginBottom: '120px',
          }}
        >
          {customTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                boxShadow: `0 0 60px ${tool.color}60`,
                borderColor: tool.color,
              }}
              style={{
                padding: '32px',
                background: 'rgba(17, 24, 39, 0.5)',
                backdropFilter: 'blur(30px)',
                borderRadius: '20px',
                border: `2px solid ${tool.color}40`,
                boxShadow: `0 10px 40px ${tool.color}20`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ 
                  fontSize: '26px', 
                  fontWeight: 800, 
                  color: '#ffffff', 
                  marginBottom: '16px',
                  fontFamily: 'var(--font-nunito)',
                  letterSpacing: '0.5px',
                }}>
                  {tool.name}
                </h3>

                <p style={{ 
                  fontSize: '15px', 
                  color: '#d1d5db', 
                  lineHeight: 1.8,
                  marginBottom: '24px',
                  fontFamily: 'var(--font-nunito)',
                }}>
                  {tool.description}
                </p>
              </div>

              <a
                href={tool.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${tool.color}80` }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    fontSize: '16px',
                    fontWeight: 700,
                    borderRadius: '12px',
                    border: `2px solid ${tool.color}60`,
                    background: `linear-gradient(135deg, ${tool.color}20, ${tool.color}10)`,
                    backdropFilter: 'blur(10px)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-nunito)',
                    boxShadow: `0 0 20px ${tool.color}40`,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Github style={{ width: '20px', height: '20px' }} />
                  View on GitHub
                </motion.button>
              </a>
            </motion.div>
          ))}
        </div>

        {/* TSA Library Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ 
            textAlign: 'center', 
            marginBottom: '60px',
            padding: '60px 40px',
            background: 'rgba(17, 24, 39, 0.5)',
            backdropFilter: 'blur(30px)',
            border: '2px solid rgba(34, 211, 238, 0.4)',
            borderRadius: '24px',
            boxShadow: '0 0 60px rgba(34, 211, 238, 0.3)',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '20px',
              fontFamily: 'var(--font-nunito)',
              letterSpacing: '1px',
            }}
          >
            TSA Library
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#d1d5db', 
            maxWidth: '900px', 
            margin: '0 auto 40px',
            lineHeight: 1.9,
            fontFamily: 'var(--font-nunito)',
          }}>
            Curated learning resources, frameworks, and practice labs designed to accelerate your cybersecurity journey. From foundational concepts to advanced exploitation techniques—everything you need in one place.
          </p>

          {/* OSint Dropdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              background: 'rgba(17, 24, 39, 0.6)',
              backdropFilter: 'blur(25px)',
              borderRadius: '16px',
              border: '2px solid rgba(168, 85, 247, 0.4)',
              overflow: 'hidden',
              boxShadow: '0 0 40px rgba(168, 85, 247, 0.3)',
            }}
          >
            <motion.button
              onClick={() => setIsOslintOpen(!isOslintOpen)}
              whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}
              style={{
                width: '100%',
                padding: '20px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '22px',
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'var(--font-nunito)',
                transition: 'all 0.3s ease',
              }}
            >
              <span>OSINT</span>
              {isOslintOpen ? (
                <ChevronUp style={{ width: '24px', height: '24px', color: '#a855f7' }} />
              ) : (
                <ChevronDown style={{ width: '24px', height: '24px', color: '#a855f7' }} />
              )}
            </motion.button>

            <motion.div
              initial={false}
              animate={{ height: isOslintOpen ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '0 32px 32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Framework */}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.03, x: 8 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '16px 24px',
                      background: 'rgba(168, 85, 247, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(168, 85, 247, 0.3)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '17px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontFamily: 'var(--font-nunito)',
                      boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Book style={{ width: '22px', height: '22px', color: '#a855f7' }} />
                    Framework
                  </motion.a>

                  {/* Resources */}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.03, x: 8 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '16px 24px',
                      background: 'rgba(34, 211, 238, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(34, 211, 238, 0.3)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '17px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontFamily: 'var(--font-nunito)',
                      boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Code style={{ width: '22px', height: '22px', color: '#22d3ee' }} />
                    Resources
                  </motion.a>

                  {/* Practice Labs */}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.03, x: 8 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '16px 24px',
                      background: 'rgba(236, 72, 153, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(236, 72, 153, 0.3)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '17px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontFamily: 'var(--font-nunito)',
                      boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <FlaskConical style={{ width: '22px', height: '22px', color: '#ec4899' }} />
                    Practice Labs
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
