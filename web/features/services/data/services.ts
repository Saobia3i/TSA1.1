// features/services/data/services.ts - FIXED TYPESCRIPT SYNTAX
import { 
  Lock, 
  Brain, 
  Eye, 
  Bot, 
  Globe, 
  Shield, 
  Target, 
  Code, 
  Server, 
  Database, 
  ShieldCheck, 
  Zap, 
  ShieldAlert, 
  Activity, 
  BarChart3, 
  FileText, 
  Users, 
  Clock, 
  Award, 
  CheckCircle, 
  Star 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Package {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  packages: Package[];
}

export const services: Service[] = [
  {
    slug: 'web-application-vapt',
    title: 'Web Application Penetration Testing',
    shortDescription: 'Comprehensive security assessment of web applications identifying OWASP Top 10 vulnerabilities, authentication bypasses, business logic flaws, and session management weaknesses.',
    longDescription: 'Our methodology combines automated reconnaissance with manual exploitation techniques to validate real-world attack vectors. Delivers actionable remediation guidance with proof-of-concept demonstrations for critical findings.',
    icon: Lock,
    packages: [
      {
        name: 'Basic Package',
        price: '$2,500',
        features: [
          'OWASP Top 10 vulnerabilities A01-A10 Methodology',
          'Automated scanning Burp Suite, OWASP ZAP with manual validation',
          'Authentication Testing Login mechanism analysis, password policy review, session token entropy testing',
          'Injection Testing SQL, NoSQL, command injection, LDAP injection',
          'Deliverables Vulnerability report with CVSS scoring, screenshots, reproduction steps, remediation guidance',
          'Retesting Single retest cycle included'
        ]
      },
      {
        name: 'Medium Package',
        price: '$4,500',
        features: [
          'All Basic features plus',
          'Business Logic Testing Payment flow manipulation, privilege escalation, workflow bypass, race conditions',
          'Authorization Flaws Horizontal/vertical privilege escalation, IDOR, forced browsing',
          'Session Management Token predictability, session fixation/hijacking, concurrent session handling',
          'Advanced Injection Second-order injection, XML injection, template injection',
          'Client-Side Security DOM-based vulnerabilities, CORS misconfiguration, CSP bypass',
          'Deliverables Video walkthrough, developer remediation workshop, JIRA integration support'
        ],
        highlight: true
      },
      {
        name: 'Pro Package',
        price: 'Custom Quote',
        features: [
          'All Medium features plus',
          'White-Box Testing Source code review SAST, architecture analysis, framework-specific vulnerabilities',
          'Advanced Exploitation Chained attack scenarios, custom exploit development, privilege escalation chains',
          'API Integration Testing Authentication token manipulation, endpoint enumeration, rate limit bypass',
          'Cryptographic Analysis TLS configuration review, certificate validation, encryption implementation flaws',
          'Security Headers HSTS, X-Frame-Options, CSP, Referrer-Policy analysis',
          'Compliance Mapping PCI-DSS, GDPR, HIPAA alignment documentation',
          'Deliverables Executive presentation, unlimited retesting, secure SDLC integration guidance, custom WAF rules'
        ]
      }
    ]
  },
  {
    slug: 'vapt',
    title: 'VAPT Vulnerability Assessment Penetration Testing',
    shortDescription: 'Enterprise-grade assessment combining automated vulnerability scanning with manual penetration testing across network perimeters, internal infrastructure, and cloud environments.',
    longDescription: 'Validates exploitability of identified vulnerabilities through controlled attack simulations. Provides risk-prioritized findings mapped to compliance frameworks with detailed remediation roadmaps.',
    icon: Shield,
    packages: [
      {
        name: 'Basic Package',
        price: '$3,500',
        features: [
          'External Scanning Nmap, Nessus, Qualys vulnerability assessment of internet-facing assets',
          'Service Enumeration Port scanning, banner grabbing, service version detection',
          'Vulnerability Validation Manual verification of critical/high findings to eliminate false positives',
          'Exploit Attempts Controlled exploitation of confirmed vulnerabilities',
          'Deliverables Risk-prioritized report with CVSS v3.1 scoring, patch recommendations, network diagram'
        ]
      },
      {
        name: 'Medium Package',
        price: '$6,000',
        features: [
          'All Basic features plus',
          'Internal Assessment Assumed breach scenario testing from internal network perspective',
          'Active Directory Testing Kerberoasting, AS-REP roasting, pass-the-hash, Golden Ticket attacks',
          'Privilege Escalation Kernel exploits, misconfigured services, weak file permissions',
          'Lateral Movement SMB relay, credential harvesting, pivot techniques',
          'Cloud Configuration S3 bucket exposure, IAM misconfigurations, security group analysis',
          'Deliverables Attack narrative documentation, risk scoring matrix, remediation priority roadmap, QA session'
        ],
        highlight: true
      },
      {
        name: 'Pro Package',
        price: 'Custom Quote',
        features: [
          'All Medium features plus',
          'Red Team Simulation Multi-stage attack campaign simulating advanced persistent threats',
          'Social Engineering Phishing campaigns, vishing, physical security testing optional',
          'Persistence Mechanisms Backdoor installation, scheduled task abuse, registry manipulation',
          'Data Exfiltration Proof of concept for sensitive data extraction via DNS tunneling, HTTPS exfil',
          'Wireless Assessment WPA2/WPA3 cracking, rogue AP detection, client isolation testing',
          'Container Security Docker/Kubernetes misconfiguration, registry vulnerabilities',
          'Compliance Framework Mapping NIST CSF, ISO 27001, CIS Controls alignment',
          'Deliverables Executive briefing, board-level presentation, unlimited retesting, dedicated remediation support, purple team knowledge transfer'
        ]
      }
    ]
  },
  {
    slug: 'api-security-testing',
    title: 'API Security Testing',
    shortDescription: 'Specialized assessment of REST, GraphQL, SOAP, and gRPC endpoints focusing on authentication mechanisms, authorization flaws, injection vulnerabilities, and data exposure risks.',
    longDescription: 'Employs fuzzing, mass assignment testing, and BOLA/IDOR analysis to identify API-specific attack vectors. Includes specification review and rate limiting validation.',
    icon: Server,
    packages: [
      {
        name: 'Basic Package',
        price: '$3,000',
        features: [
          'API Discovery Endpoint enumeration, documentation analysis Swagger/OpenAPI, hidden endpoint detection',
          'Authentication Testing JWT manipulation, OAuth 2.0 flow analysis, API key exposure, token expiration validation',
          'Input Validation JSON/XML injection, parameter pollution, mass assignment vulnerabilities',
          'OWASP API Top 10 Broken object level authorization BOLA, broken authentication, excessive data exposure, lack of resources rate limiting',
          'Deliverables API vulnerability report, endpoint inventory, authentication flow diagram, remediation guidelines'
        ]
      },
      {
        name: 'Medium Package',
        price: '$5,000',
        features: [
          'All Basic features plus',
          'Authorization Testing IDOR, function-level authorization bypass, context-dependent access control flaws',
          'Fuzzing Operations Parameter fuzzing, payload mutation, boundary condition testing',
          'Rate Limiting Brute force protection, API throttling validation, resource exhaustion testing',
          'Business Logic Transaction manipulation, workflow bypass, concurrent request race conditions',
          'GraphQL-Specific Query depth analysis, introspection abuse, batching attacks, circular query exploitation',
          'Deliverables Postman collection with attack payloads, API security best practices document, developer training session'
        ],
        highlight: true
      },
      {
        name: 'Pro Package',
        price: 'Custom Quote',
        features: [
          'All Medium features plus',
          'Deep Specification Review Complete OpenAPI/Swagger audit, schema validation, endpoint deprecation analysis',
          'Advanced Authorization Role-based access control bypass, attribute-based access control flaws, cross-tenant data leakage',
          'Chain Attack Scenarios Multi-endpoint exploitation, privilege escalation chains, data exfiltration paths',
          'Legacy Protocol Support SOAP injection, XML External Entity XXE, WSDL analysis',
          'Microservices Testing Service mesh security, inter-service authentication, API gateway bypass',
          'Third-Party Integration Webhook validation, callback URL manipulation, supply chain risk assessment',
          'Deliverables API security architecture review, custom security middleware recommendations, CICD integration guide, GraphQL resolver hardening, ongoing consultation'
        ]
      }
    ]
  }
  // Add remaining services from Services.txt following exact same pattern
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServices(): Service[] {
  return services;
}
