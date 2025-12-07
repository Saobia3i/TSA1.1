import { Lock, Brain, Eye, Bot, Globe, Shield, Target, Code } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  features: string[];
  pricing?: string;
}

export const services: Service[] = [
  {
    slug: 'web-application-vapt',
    title: 'Web Application VAPT',
    description: 'Identify and remediate critical security vulnerabilities before exploitation.',
    longDescription: 'Comprehensive vulnerability assessment and penetration testing for web applications. We use industry-standard methodologies to identify security flaws.',
    icon: Lock,
    features: [
      'OWASP Top 10 Testing',
      'Manual + Automated Testing',
      'Detailed Remediation Report',
      'Post-Remediation Verification'
    ],
    pricing: 'Starting from $2,500'
  },
  {
    slug: 'ai-llm-pentesting',
    title: 'AI & LLM Pentesting',
    description: 'Secure your AI deployments with specialized vulnerability testing.',
    longDescription: 'Specialized security testing for AI/ML models and LLM applications. Protect against prompt injection, data poisoning, and model manipulation.',
    icon: Brain,
    features: [
      'Prompt Injection Testing',
      'Model Security Assessment',
      'Data Privacy Evaluation',
      'AI-Specific Threat Modeling'
    ],
    pricing: 'Custom Quote'
  },
  {
    slug: 'soc-monitoring',
    title: 'Contract SOC Monitoring',
    description: 'Professional security monitoring without building an in-house SOC.',
    longDescription: '24/7 security operations center monitoring services. Get enterprise-level threat detection without the overhead.',
    icon: Eye,
    features: [
      '24/7 Threat Monitoring',
      'Incident Response',
      'Log Analysis & SIEM',
      'Monthly Security Reports'
    ],
    pricing: 'From $5,000/month'
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation Solutions',
    description: 'Custom AI workflows to automate repetitive business tasks.',
    longDescription: 'Build intelligent automation solutions using LLMs and AI APIs. Streamline business processes and reduce manual work.',
    icon: Bot,
    features: [
      'Custom AI Workflows',
      'Process Automation',
      'API Integration',
      'Ongoing Support'
    ],
    pricing: 'Starting from $3,000'
  },
  {
    slug: 'web-development',
    title: 'Web Development Services',
    description: 'Fast, secure, and scalable web applications with security-first approach.',
    longDescription: 'Full-stack web development with built-in security best practices. Modern, responsive, and performant applications.',
    icon: Globe,
    features: [
      'Secure Full-Stack Development',
      'Modern Tech Stack (Next.js, React)',
      'Security-First Architecture',
      'Deployment & Maintenance'
    ],
    pricing: 'From $4,000'
  },
  {
    slug: 'network-security-audit',
    title: 'Network Security Audit',
    description: 'Comprehensive network infrastructure security assessment.',
    longDescription: 'Deep dive into your network infrastructure to identify misconfigurations, vulnerabilities, and compliance gaps.',
    icon: Shield,
    features: [
      'Network Vulnerability Scanning',
      'Configuration Review',
      'Firewall & IDS/IPS Assessment',
      'Compliance Mapping'
    ],
    pricing: 'Starting from $3,500'
  },
  {
    slug: 'red-team-assessment',
    title: 'Red Team Assessment',
    description: 'Simulate real-world attacks to test your security posture.',
    longDescription: 'Advanced adversary simulation to test your detection and response capabilities. Go beyond traditional penetration testing.',
    icon: Target,
    features: [
      'Full Attack Simulation',
      'Social Engineering',
      'Physical Security Testing',
      'Executive Debrief'
    ],
    pricing: 'Custom Quote'
  },
  {
    slug: 'secure-code-review',
    title: 'Secure Code Review',
    description: 'Manual source code analysis to find hidden vulnerabilities.',
    longDescription: 'Expert manual code review to identify security flaws that automated tools miss. Support for multiple languages.',
    icon: Code,
    features: [
      'Manual Code Analysis',
      'OWASP Secure Coding Review',
      'Business Logic Flaws',
      'Developer Training'
    ],
    pricing: 'From $2,000'
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getAllServices() {
  return services;
}

export function getFeaturedServices(count: number = 3) {
  return services.slice(0, count);
}
