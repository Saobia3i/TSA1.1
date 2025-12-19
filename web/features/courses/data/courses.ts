// courses.ts - Complete production-ready file with PDF data
// Senior Developer Standards: TypeScript strict, exhaustive data, curriculum toggle ready

import { Shield, Target, Bug, Brain, Zap, Code, Database, Server, Lock, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  duration: string;
  badge?: string;
  level: string;
  tags: string[];
  topics: string[];           // What You'll Learn (short list)
  curriculum: string[];       // Detailed curriculum (for toggle view)
  color: string;
  instructor?: string;
  students?: number;
  rating?: number;
  price?: string;
}

export const courses: Course[] = [
  // 1. Cyber Security Engineering with Generative AI
  {
    id: '1',
    slug: 'cyber-security-engineering-ai',
    title: 'Cyber Security Engineering with Generative AI',
    shortDescription: 'Emerge as a cybersecurity engineer who commands both traditional security frameworks and cutting-edge AI toolchains.',
    description: 'Learn ethical hacking, threat detection, AI-powered security, and defensive operations through hands-on labs and real-world simulations. 80+ Hours of Live Classes + 1-Month Internship.',
    icon: Shield,
    duration: '5 Months Training + 1 Month Internship',
    badge: 'Beginner to Advanced',
    level: 'Beginner to Advanced',
    color: '#22d3ee',
    instructor: 'Tensor Security Academy',
    students: 1250,
    rating: 4.9,
    price: '$99/month',
    tags: ['Cybersecurity', 'Penetration Testing', 'Generative AI', 'SOC', 'Red Team', 'Blue Team', 'CTF', 'Live Training'],
    topics: [
      'Cybersecurity Foundations & CIA Triad',
      'Linux & Windows System Security',
      'Networking & Network Security',
      'Red Team Operations & Ethical Hacking',
      'Blue Team Operations & Incident Response',
      'Generative AI for Cybersecurity Automation',
      'Web Application Security & Bug Bounty Hunting',
      'Capture the Flag (CTF) Challenges',
      'Open Source Intelligence (OSINT)',
      'Capstone Projects & Career Readiness',
    ],
    curriculum: [
      'Phase 1: Foundations (Weeks 1-4)',
      '• Cybersecurity Fundamentals: Mindset, threats, risk assessment, compliance frameworks',
      '• Operating Systems Security: Linux (Kali) & Windows administration, CLI, permissions, Bash scripting',
      'Phase 2: Networking & Core Security (Weeks 5-8)',
      '• Networking Fundamentals: OSI/TCP-IP, IP addressing, subnetting, firewalls, VPNs',
      '• Network Security Tools: Nmap, Wireshark, IDS/IPS, NAC, DNS analysis',
      'Phase 3: Offensive Security (Weeks 9-12)',
      '• Red Team Operations: Ethical hacking, OWASP Top 10, SQLI, XSS, Metasploit, phishing',
      '• Web App Security: Burp Suite, vulnerability scanning, exploitation techniques',
      'Phase 4: Defensive Security & AI (Weeks 13-16)',
      '• Blue Team Operations: SIEM, Splunk, log analysis, incident response, threat hunting',
      '• Generative AI for Security: ChatGPT, prompt engineering, AI automation, ethical AI use',
      'Phase 5: Practical Mastery & Career (Weeks 17-20)',
      '• CTF & OSINT: Hands-on challenges, reconnaissance, forensics, team competitions',
      '• Capstone Project: Full-spectrum red/blue team simulation with AI integration',
      '• Career Prep: Resume, LinkedIn, GitHub portfolio, interview training, certification roadmap',
    ],
  },

  // 2. Complete Penetration Testing Masterclass
  {
    id: '2',
    slug: 'penetration-testing-masterclass',
    title: 'Complete Penetration Testing Masterclass: Zero to Professional Pentester',
    shortDescription: 'From Zero to Ethical Hacker in 26 Intensive Classes.',
    description: 'Comprehensive, hands-on penetration testing program designed to transform beginners into job-ready ethical hackers. 100+ Hands-On Labs.',
    icon: Target,
    duration: '26 Weeks (or 13 Weeks Intensive)',
    badge: 'Trending',
    level: 'Beginner to Intermediate',
    color: '#ec4899',
    instructor: 'Tensor Security Academy',
    students: 2100,
    rating: 4.9,
    price: '$129/month',
    tags: ['Ethical Hacking', 'Penetration Testing', 'Web Security', 'Network Security', 'Active Directory', 'OSCP Prep', 'Bug Bounty', 'Live Training'],
    topics: [
      'Cybersecurity Foundations & Ethical Hacking Mindset',
      'Lab Setup with Kali Linux & Victim Machines',
      'Linux Command Line & Bash Scripting for Pentesters',
      'Networking Deep Dive (TCP/IP, Wireshark, Subnetting)',
      'Web Application Attacks (SQLI, XSS, SSRF, CSRF, XXE, API Hacking)',
      'Burp Suite Mastery',
      'Active & Passive Reconnaissance',
      'Post-Exploitation & Active Directory Attacks',
    ],
    curriculum: [
      'Phase 1: Foundations & Environment Setup (Weeks 1-2)',
      '• Week 1 - Cyber Security Foundations & Mindset',
      '• Week 2 - Setting Up Your Lab (Kali Linux, VMs)',
      'Phase 2: Core Skills & Networking (Weeks 3-5)',
      '• Week 3 - Linux & Command Line Mastery',
      '• Week 4 - Computer Networking for Hackers',
      '• Week 5 - How the Web Actually Works',
      'Phase 3: Web Application Penetration Testing (Weeks 6-15)',
      '• Week 6 - Burp Suite - Your Primary Weapon',
      '• Week 7 - SQL Injection (Basics to Blind)',
      '• Week 8 - Cross-Site Scripting (XSS)',
      '• Week 9 - File Inclusion & Path Traversal',
      '• Week 10 - Command Injection & SSRF',
      '• Week 11 - File Upload & XXE',
      '• Week 12 - Authentication & Authorization Attacks',
      '• Week 13 - CSRF, Clickjacking, Web Cache Attacks',
      '• Week 14 - Insecure Deserialization',
      '• Week 15 - API Pentesting Basics',
      'Phase 4: Reconnaissance & Scanning (Weeks 16-19)',
      '• Week 16 - OSINT & Passive Recon',
      '• Week 17 - Active Recon - Network Scanning (Nmap)',
      '• Week 18 - Enumeration Deep Dive',
      '• Week 19 - Vulnerability Scanning & Assessment',
      'Phase 5: Exploitation & Post-Exploitation (Weeks 20-23)',
      '• Week 20 - Exploitation Phase (Metasploit)',
      '• Week 21 - Linux Privilege Escalation',
      '• Week 22 - Windows & Active Directory Attacks',
      '• Week 23 - Maintaining Access & Pivoting',
      'Phase 6: Professional Skills & Career (Weeks 24-26)',
      '• Week 24 - Report Writing & Communication',
      '• Week 25 - Python for Pentesters',
      '• Week 26 - Bug Bounty & Career Path',
    ],
  },

  // 3. Security Analyst Professional Live Training
  {
    id: '3',
    slug: 'security-analyst-professional',
    title: 'Security Analyst Professional Live Training',
    shortDescription: 'From SOC Fundamentals to Advanced Threat Detection.',
    description: 'Comprehensive training from beginner to job-ready Security Analyst. Learn SOC operations, SIEM management, incident detection, and response.',
    icon: Bug,
    duration: '15 Weeks',
    level: 'Beginner to Advanced',
    color: '#a855f7',
    instructor: 'Tensor Security Academy',
    students: 1800,
    rating: 4.8,
    price: '$99/month',
    tags: ['Security Analyst', 'SOC', 'SIEM', 'Incident Response', 'Threat Intelligence', 'Splunk', 'Live Training'],
    topics: [
      'Security Operations Center (SOC) Fundamentals',
      'Cyber Threat Landscape & Attack Methodologies',
      'SIEM & Incident Detection',
      'Incident Response Procedures',
      'Threat Intelligence Integration',
      'Alert Triaging & Investigation',
    ],
    curriculum: [
      'Module 4: Defensive Security Fundamentals (Weeks 1-4)',
      '• Week 1: Security Operations and Management (SOC, Splunk setup)',
      '• Week 2: Cyber Threats, IoCs, Attack Methodology',
      '• Week 3: Cyber Threat IoCs & Hacking Methodologies',
      '• Week 4: Incidents, Events, and Logging',
      'Module 5: Blue Team Core Skills (Weeks 5-8)',
      '• Week 6: Incident Detection with SIEM',
      '• Week 7: Application & Insider Incident Detection',
      '• Week 8: Network & Host Level Incident Detection',
      'Module 6: Security Analyst Skills (Weeks 9-12)',
      '• Week 9: Alert Triaging & Incident Response',
      '• Week 10: Network & Email Security Incidents',
      '• Week 11: Malware Incidents & Threat Intelligence',
      'Module 7: Career Preparation (Weeks 13-15)',
      '• Week 13: Threat Intelligence Use Cases',
      '• Week 14: Enhanced Incident Response SOPs',
      '• Week 15: Career Advice & Final Exam',
    ],
  },

  // 4. Machine Learning & Deep Learning for Security
  {
    id: '4',
    slug: 'ml-deep-learning-security',
    title: 'Machine Learning & Deep Learning for Security Professionals',
    shortDescription: 'From Fundamentals to Secure AI.',
    description: 'Learn Python, mathematics, ML algorithms, neural networks with security-first approach. Prerequisite for advanced ML Security courses.',
    icon: Brain,
    duration: '16 Weeks',
    badge: 'Coming Soon',
    level: 'Beginner to Intermediate',
    color: '#10b981',
    instructor: 'Tensor Security Academy',
    students: 950,
    rating: 4.9,
    price: '$99/month',
    tags: ['Machine Learning', 'Deep Learning', 'ML Security', 'Python', 'Neural Networks', 'AI Security'],
    topics: [
      'Python Programming for Machine Learning & Security',
      'Essential Mathematics for ML',
      'Data Preprocessing & Secure Feature Engineering',
      'Core ML Algorithms with Security Context',
      'Neural Networks & Deep Learning Architectures',
      'TensorFlow & PyTorch for Secure Model Development',
    ],
    curriculum: [
      'Phase 1: Foundation with Security Context (Weeks 1-4)',
      '• Python Fundamentals for ML & Security (NumPy, Pandas)',
      '• Mathematical Foundations (Linear Algebra, Calculus, Statistics)',
      'Phase 2: Core Machine Learning (Weeks 5-9)',
      '• ML Fundamentals & Secure Preprocessing',
      '• Supervised Learning Algorithms & Attack Vectors',
      '• Unsupervised Learning & Anomaly Detection',
      'Phase 3: Neural Networks & Deep Learning (Weeks 10-14)',
      '• Neural Network Fundamentals & Vulnerabilities',
      '• Deep Learning Architectures (CNNs, RNNs)',
      '• TensorFlow & PyTorch with Security Focus',
      'Phase 4: ML Security Fundamentals (Weeks 15-16)',
      '• Adversarial Machine Learning Introduction',
      '• ML Security & Threat Modeling (OWASP Top 10 for ML)',
    ],
  },

  // 5. AI & LLM Security Mastery
  {
    id: '5',
    slug: 'ai-llm-security-mastery',
    title: 'AI & LLM Security Mastery: From Fundamentals to Advanced Penetration Testing',
    shortDescription: 'OWASP Top 10 for LLMs (2023-2025) + MITRE ATLAS.',
    description: 'Secure AI/LLM systems with latest threats, attack techniques, and hands-on penetration testing. 36 Live Classes + CTF Challenges.',
    icon: Zap,
    duration: '18 Weeks',
    level: 'Intermediate to Advanced',
    color: '#f59e0b',
    instructor: 'Tensor Security Academy',
    students: 1400,
    rating: 4.8,
    price: '$199/month',
    tags: ['AI Security', 'LLM', 'OWASP', 'Prompt Injection', 'DevSecOps', 'Red Teaming', 'MITRE ATLAS'],
    topics: [
      'OWASP Top 10 for LLMs (2023-2025 Updates)',
      'Prompt Injection Techniques & Defense',
      'AI Supply Chain & Data Poisoning Attacks',
      'LLM Misinformation & Agency Risks',
      'Hands-On AI Penetration Testing',
    ],
    curriculum: [
      'Phase 1: AI Security Foundation (Weeks 1-3)',
      '• OWASP Top 10 LLM 2023-2025 Updates',
      '• AI/LLM Ecosystem & Architectures',
      '• AI Security Frameworks (MITRE ATLAS)',
      'Phase 2: Core AI Vulnerabilities (Weeks 4-8)',
      '• Prompt Injection (Direct/Indirect, Jailbreaking)',
      '• Sensitive Information Disclosure',
      '• Supply Chain Vulnerabilities',
      '• Model & Training Data Poisoning',
      'Phase 3: Advanced AI Security (Weeks 9-13)',
      '• Improper Output Handling',
      '• Excessive Agency & System Prompt Leakage',
      '• Vector & Embedding Weaknesses',
      'Phase 4: Real-World Challenges (Weeks 14-18)',
      '• Prompt Airlines AI/ML CTF Challenge',
      '• SecOps Group AI/ML Mock Exam',
      '• AI Prompt Attack & Defense Game',
    ],
  },

  // 6. Mastering DevOps
  {
    id: '6',
    slug: 'mastering-devops',
    title: 'Mastering DevOps: From Fundamentals to Advanced Practices',
    shortDescription: 'Git, AWS, Docker, Kubernetes, Terraform, CI/CD, DevSecOps.',
    description: 'Complete DevOps bootcamp from beginner to job-ready engineer. 34 Live Classes + Hands-On Cloud Labs.',
    icon: Code,
    duration: '17 Weeks',
    level: 'Beginner to Advanced',
    color: '#8b5cf6',
    instructor: 'Tensor Security Academy',
    students: 3200,
    rating: 4.8,
    price: '$149/month',
    tags: ['DevOps', 'DevSecOps', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    topics: [
      'DevOps Engineering Fundamentals',
      'Git Version Control & Workflows',
      'Cloud Infrastructure (AWS)',
      'CI/CD Pipeline Automation',
      'Docker Containerization',
      'Kubernetes Orchestration',
      'Infrastructure as Code (Terraform & Ansible)',
    ],
    curriculum: [
      'Phase 1: Foundation (Weeks 1-4)',
      '• DevOps Fundamentals & Git Workflows',
      '• Linux & Cloud Basics (AWS EC2)',
      '• Application Deployment (Nginx, SSL, Database)',
      'Phase 2: Automation & Observability (Weeks 5-6)',
      '• CI/CD Pipelines (GitHub Actions)',
      '• Monitoring & Logging (Prometheus, Grafana, Loki)',
      'Phase 3: Infrastructure as Code (Weeks 7-9)',
      '• Terraform Fundamentals',
      '• 3-Tier Architecture on AWS',
      'Phase 4: Containerization & Orchestration (Weeks 10-12)',
      '• Docker & Docker Compose',
      '• Kubernetes Core Concepts',
      'Phase 5: DevSecOps & Cloud Mastery (Weeks 13-17)',
      '• DevSecOps Integration',
      '• Advanced AWS & Serverless',
      '• Capstone Project & Certification Prep',
    ],
  },
];

// 🛠️ Production-ready utility functions (unchanged)
export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getFeaturedCourses(count: number = 3): Course[] {
  return courses.slice(0, count);
}

export function getCoursesByLevel(level: string): Course[] {
  return courses.filter((course) => course.level.toLowerCase().includes(level.toLowerCase()));
}

export function getCoursesByTag(tag: string): Course[] {
  return courses.filter((course) =>
    course.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

export function searchCourses(keyword: string): Course[] {
  const lowerKeyword = keyword.toLowerCase();
  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowerKeyword) ||
      course.description.toLowerCase().includes(lowerKeyword) ||
      course.shortDescription.toLowerCase().includes(lowerKeyword) ||
      course.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
  );
}

export function getTotalStudents(): number {
  return courses.reduce((total, course) => total + (course.students || 0), 0);
}

export function getAverageRating(): number {
  const coursesWithRating = courses.filter((course) => course.rating);
  if (coursesWithRating.length === 0) return 0;
  const totalRating = coursesWithRating.reduce((sum, course) => sum + (course.rating || 0), 0);
  return parseFloat((totalRating / coursesWithRating.length).toFixed(1));
}
