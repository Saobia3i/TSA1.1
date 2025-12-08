import { Shield, Target, Bug, Brain, Zap, Code } from 'lucide-react';
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
  topics: string[];
  color: string;
}

export const courses: Course[] = [
  {
    id: '1',
    slug: 'security-analyst-bootcamp',
    title: 'Beginner to Hired: Security Analyst Live Training',
    shortDescription: 'Launch your cybersecurity career from scratch with SOC operations, threat intelligence, and SIEM tools.',
    description: 'Comprehensive training program designed to take you from beginner to job-ready security analyst. Learn SOC operations, threat hunting, incident response, and master industry-standard SIEM tools.',
    icon: Shield,
    duration: '12 Weeks',
    badge: 'Beginner to Advanced',
    level: 'Beginner',
    color: '#22d3ee',
    tags: ['SOC', 'SIEM', 'Threat Intelligence', 'Live Training'],
    topics: [
      'SOC Fundamentals & Operations',
      'Threat Intelligence Analysis',
      'SIEM Tools (Splunk, ELK Stack)',
      'Incident Response & Handling',
      'Log Analysis & Correlation',
      'Security Monitoring Best Practices',
    ],
  },
  {
    id: '2',
    slug: 'ethical-hacking-red-team',
    title: 'Ethical Hacking & Red Teaming Live Training',
    shortDescription: 'Master penetration testing methodologies and advanced exploitation techniques.',
    description: 'Advanced penetration testing course covering reconnaissance, exploitation, privilege escalation, and post-exploitation. Learn to think like an attacker and master red team operations.',
    icon: Target,
    duration: '16 Weeks',
    badge: 'Trending',
    level: 'Intermediate',
    color: '#ec4899',
    tags: ['Pentesting', 'Red Team', 'Exploitation', 'Live Training'],
    topics: [
      'Reconnaissance & Information Gathering',
      'Vulnerability Assessment',
      'Web Application Exploitation',
      'Network Penetration Testing',
      'Privilege Escalation Techniques',
      'Active Directory Attacks',
      'Post-Exploitation & Pivoting',
    ],
  },
  {
    id: '3',
    slug: 'bug-bounty-mastery',
    title: 'Advanced Bug Bounty Training',
    shortDescription: 'Learn to find critical vulnerabilities in web applications on platforms like HackerOne.',
    description: 'Specialized training for bug bounty hunters. Master advanced web vulnerabilities, automation, and learn how to earn from bug bounty programs on HackerOne, Bugcrowd, and more.',
    icon: Bug,
    duration: '10 Weeks',
    level: 'Intermediate',
    color: '#a855f7',
    tags: ['Bug Bounty', 'Web Security', 'OWASP'],
    topics: [
      'OWASP Top 10 Deep Dive',
      'Advanced XSS & CSRF',
      'SQL Injection Techniques',
      'SSRF & XXE Exploitation',
      'Authentication Bypass',
      'Bug Bounty Automation',
      'Report Writing & Communication',
    ],
  },
  {
    id: '4',
    slug: 'machine-learning-zero-to-alpha',
    title: 'Machine Learning: Zero to Alpha',
    shortDescription: 'Build powerful machine learning models with data science fundamentals.',
    description: 'Complete machine learning course from fundamentals to advanced techniques. Learn Python, data preprocessing, model building, and deployment of real-world ML applications.',
    icon: Brain,
    duration: '14 Weeks',
    badge: 'Coming Soon',
    level: 'Beginner',
    color: '#10b981',
    tags: ['Machine Learning', 'AI', 'Python', 'Data Science'],
    topics: [
      'Python for Data Science',
      'Statistics & Mathematics Fundamentals',
      'Supervised Learning Algorithms',
      'Unsupervised Learning & Clustering',
      'Neural Networks & Deep Learning',
      'Model Evaluation & Optimization',
      'ML Project Deployment',
    ],
  },
  {
    id: '5',
    slug: 'ai-automation-for-business',
    title: 'How to Build AI Automations for Businesses',
    shortDescription: 'Create custom automation bots and integrate AI APIs for real business solutions.',
    description: 'Practical AI automation course focused on building real business solutions. Learn to create chatbots, automate workflows, and integrate AI APIs like OpenAI, Claude, and more.',
    icon: Zap,
    duration: '8 Weeks',
    level: 'Intermediate',
    color: '#f59e0b',
    tags: ['AI Automation', 'LLMs', 'APIs', 'Business'],
    topics: [
      'AI & LLM Fundamentals',
      'OpenAI & Claude API Integration',
      'Building Custom Chatbots',
      'Workflow Automation',
      'Document Processing with AI',
      'Voice & Speech Recognition',
      'Deploying AI Solutions',
    ],
  },
  {
    id: '6',
    slug: 'professional-web-developer',
    title: 'Professional Web Developer',
    shortDescription: 'Master full stack development with emphasis on security best practices.',
    description: 'Complete web development bootcamp covering frontend, backend, databases, and security. Build secure, scalable web applications using modern technologies and best practices.',
    icon: Code,
    duration: '20 Weeks',
    badge: 'Beginner to Advanced',
    level: 'Beginner',
    color: '#8b5cf6',
    tags: ['Web Development', 'Full Stack', 'Security', 'React', 'Node.js'],
    topics: [
      'HTML, CSS, JavaScript Fundamentals',
      'React & Modern Frontend',
      'Node.js & Express Backend',
      'Database Design (SQL & NoSQL)',
      'RESTful API Development',
      'Authentication & Authorization',
      'Web Security Best Practices',
      'Deployment & DevOps Basics',
    ],
  },
];

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getFeaturedCourses(count: number = 3): Course[] {
  return courses.slice(0, count);
}
