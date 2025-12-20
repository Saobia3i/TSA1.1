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
  Code2,
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
  Star,
  Network,
  Search,
  Monitor
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

// Service 2: VAPT (Vulnerability Assessment & Penetration Testing)
{
  slug: 'vapt-service',
  title: 'VAPT (Vulnerability Assessment & Penetration Testing)',
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
      price: '$6,500',
      features: [
        'All Basic features plus',
        'Internal Assessment Assumed breach scenario testing from internal network perspective',
        'Active Directory Testing Kerberoasting, AS-REP roasting, pass-the-hash, Golden Ticket attacks',
        'Privilege Escalation Kernel exploits, misconfigured services, weak file permissions',
        'Lateral Movement SMB relay, credential harvesting, pivot techniques',
        'Cloud Configuration S3 bucket exposure, IAM misconfigurations, security group analysis',
        'Deliverables Attack narrative documentation, risk scoring matrix, remediation priority roadmap, Q&A session'
      ],
      highlight: true
    },
    {
      name: 'Pro Package',
      price: 'Custom Quote',
      features: [
        'All Medium features plus',
        'Red Team Simulation Multi-stage attack campaign simulating advanced persistent threats',
        'Social Engineering Phishing campaigns, vishing, physical security testing (optional)',
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

// Service 3: API Security Testing
{
  slug: 'api-security-testing',
  title: 'API Security Testing',
  shortDescription: 'Specialized assessment of REST, GraphQL, SOAP, and gRPC endpoints focusing on authentication mechanisms, authorization flaws, injection vulnerabilities, and data exposure risks.',
  longDescription: 'Employs fuzzing, mass assignment testing, and BOLA/IDOR analysis to identify API-specific attack vectors. Includes specification review and rate limiting validation.',
  icon: Code,
  packages: [
    {
      name: 'Basic Package',
      price: '$2,000',
      features: [
        'API Discovery Endpoint enumeration, documentation analysis (Swagger/OpenAPI), hidden endpoint detection',
        'Authentication Testing JWT manipulation, OAuth 2.0 flow analysis, API key exposure, token expiration validation',
        'Input Validation JSON/XML injection, parameter pollution, mass assignment vulnerabilities',
        'OWASP API Top 10 Broken object level authorization (BOLA), broken authentication, excessive data exposure, lack of resources & rate limiting',
        'Deliverables API vulnerability report, endpoint inventory, authentication flow diagram, remediation guidelines'
      ]
    },
    {
      name: 'Medium Package',
      price: '$3,800',
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
        'Legacy Protocol Support SOAP injection, XML External Entity (XXE), WSDL analysis',
        'Microservices Testing Service mesh security, inter-service authentication, API gateway bypass',
        'Third-Party Integration Webhook validation, callback URL manipulation, supply chain risk assessment',
        'Deliverables API security architecture review, custom security middleware recommendations, CI/CD integration guide, GraphQL resolver hardening, ongoing consultation'
      ]
    },
  ]
  },

  // Service 4: AI/LLM Security Assessment
  {
  slug: 'ai-llm-security-assessment',
  title: 'AI/LLM Security Assessment',
  shortDescription: 'Targeted evaluation of Large Language Model implementations and AI-powered applications against emerging threats including prompt injection, model inversion, jailbreak techniques, and training data extraction.',
  longDescription: 'Targeted evaluation of Large Language Model implementations and AI-powered applications against emerging threats including prompt injection, model inversion, jailbreak techniques, and training data extraction.',
  icon: Brain,
  packages: [
    {
      name: 'Basic Package',
      price: '$2,800',
      features: [
        'Direct Prompt Injection Command injection, system prompt leakage, instruction override attempts',
        'Basic Jailbreaking Guardrail bypass, ethical constraint circumvention, role-playing exploits',
        'Data Exposure PII leakage, training data extraction, context window poisoning',
        'Output Validation Harmful content generation, bias detection, hallucination assessment',
        'Deliverables Vulnerability report with prompt examples, risk assessment, basic mitigation strategies'
      ]
    },
    {
      name: 'Medium Package',
      price: '$5,200',
      features: [
        'All Basic features plus',
        'Indirect Prompt Injection Cross-context attacks, retrieval manipulation, document poisoning',
        'Multi-Turn Attacks Conversation hijacking, state manipulation, memory exploitation',
        'Model Behavior Analysis Token probability manipulation, temperature exploitation, sampling attacks',
        'Context Pollution RAG poisoning, vector database manipulation, semantic search bypass',
        'API Abuse Model endpoint enumeration, rate limit bypass, token usage manipulation',
        'Deliverables Attack scenario documentation, conversation flow analysis, enhanced defense recommendations, model configuration review'
      ],
      highlight: true
    },
    {
      name: 'Pro Package',
      price: 'Custom Quote',
      features: [
        'All Medium features plus',
        'RAG Pipeline Security Vector database injection, retrieval manipulation, embedding poisoning, chunking strategy exploitation',
        'Agent System Testing Tool-calling abuse, plugin vulnerabilities, multi-agent coordination attacks',
        'Model Inversion Training data reconstruction, membership inference, model extraction attempts',
        'Supply Chain Assessment Third-party model risks, fine-tuning vulnerabilities, dataset poisoning potential',
        'Advanced Jailbreaking Multi-stage attacks, encoding obfuscation, linguistic manipulation, cross-lingual exploits',
        'Plugin/Extension Security Function-calling abuse, sandboxing bypass, privilege escalation via tools',
        'Compliance Review AI Act alignment, GDPR implications, bias and fairness testing',
        'Deliverables Secure AI development framework, guardrail architecture design, ongoing red team engagement, threat modeling workshop, model governance recommendations'
      ]
    }
  ]
},

// Service 5: Network Security Audit
{
  slug: 'network-security-audit',
  title: 'Network Security Audit',
  shortDescription: 'Infrastructure-wide security evaluation encompassing perimeter defense assessment, internal network segmentation analysis, and cloud configuration review.',
  longDescription: 'Identifies misconfigurations, privilege escalation paths, and lateral movement opportunities through active exploitation attempts. Delivers network topology visualization with attack path mapping.',
  icon: Network,
  packages: [
    {
      name: 'Basic Package',
      price: '$2,200',
      features: [
        'External Network Scanning Perimeter vulnerability assessment, exposed service identification',
        'Port & Service Analysis TCP/UDP scanning, version detection, banner grabbing',
        'Firewall Rule Review Basic ruleset analysis, unnecessary port exposure identification',
        'SSL/TLS Assessment Certificate validation, cipher suite analysis, protocol downgrade testing',
        'Deliverables Network vulnerability report, open port inventory, basic hardening recommendations'
      ]
    },
    {
      name: 'Medium Package',
      price: '$4,800',
      features: [
        'All Basic features plus',
        'Internal Network Testing Assumed breach scenario, internal vulnerability scanning',
        'Network Segmentation Analysis VLAN hopping, inter-segment routing review, broadcast domain assessment',
        'Active Directory Exploitation Kerberos attacks, LDAP enumeration, GPO analysis, trust relationship abuse',
        'Lateral Movement Simulation SMB relay, PsExec, WMI abuse, remote service exploitation',
        'Network Visualization Topology mapping, trust boundary identification, attack path diagrams',
        'Deliverables Network architecture review, segmentation recommendations, attack narrative, visual network map with exploitation paths'
      ],
      highlight: true
    },
    {
      name: 'Pro Package',
      price: 'Custom Quote',
      features: [
        'All Medium features plus',
        'Red Team Operations Multi-phase attack simulation, command and control (C2) infrastructure, evasion techniques',
        'APT Simulation Mimicking nation-state tactics, persistence mechanisms, covert channel establishment',
        'Cloud Network Security VPC configuration review, security group analysis, network ACL validation (AWS/Azure/GCP)',
        'Wireless Security WPA2/WPA3 enterprise testing, rogue AP detection, client isolation, EAP method analysis',
        'Zero Trust Assessment Micro-segmentation validation, identity-based access review, least privilege analysis',
        'VPN/Remote Access IPSec/SSL VPN testing, MFA bypass attempts, split-tunneling risks',
        'IDS/IPS Evasion Signature bypass, packet fragmentation, protocol obfuscation',
        'Deliverables Comprehensive defense strategy, zero trust roadmap, firewall ruleset optimization, endpoint detection recommendations, network architecture redesign proposal, incident response integration'
      ]
    }
  ]
},

// Service 6: OSINT (Open Source Intelligence) Assessment
{
  slug: 'osint-assessment',
  title: 'OSINT (Open Source Intelligence) Assessment',
  shortDescription: 'Systematic collection and analysis of publicly available information exposing organizational attack surface through subdomain enumeration, credential leakage detection, and digital footprint mapping.',
  longDescription: 'Identifies exposed cloud storage, misconfigured services, and employee information suitable for social engineering. Provides threat actor perspective on exploitable intelligence.',
  icon: Search,
  packages: [
    {
      name: 'Basic Package',
      price: '$1,500',
      features: [
        'Domain Enumeration Subdomain discovery via DNS brute-forcing, certificate transparency logs, search engine dorking',
        'Cloud Storage Scanning S3 bucket enumeration, Azure Blob exposure, misconfigured cloud storage',
        'Breach Database Correlation HaveIBeenPwned, DeHashed, breach compilation analysis',
        'Public Code Repositories GitHub/GitLab secret scanning, API key exposure, credentials in commits',
        'Deliverables Exposure summary report, credential list, immediate remediation priorities'
      ]
    },
    {
      name: 'Medium Package',
      price: '$3,200',
      features: [
        'All Basic features plus',
        'Employee Footprinting LinkedIn enumeration, social media profiling, email pattern identification',
        'Technology Stack Identification Wappalyzer analysis, job posting review, error message leakage',
        'Historical Data Analysis Wayback Machine reconnaissance, archived credential dumps, old infrastructure exposure',
        'Third-Party Exposure Vendor security posture, supply chain intelligence, partner organization risks',
        'Metadata Extraction Document metadata analysis, geolocation data, author information',
        'Deliverables Visual exposure map, social engineering risk assessment, technology inventory, phishing susceptibility analysis'
      ],
      highlight: true
    },
    {
      name: 'Pro Package',
      price: 'Custom Quote',
      features: [
        'All Medium features plus',
        'Corporate Relationship Mapping Subsidiary identification, M&A intelligence, organizational structure analysis',
        'Executive/VIP Profiling C-suite digital footprint, personal information exposure, targeted attack surface',
        'Dark Web Monitoring Forum mentions, credential sales, threat actor discussions, ransomware targeting',
        'Geopolitical Intelligence Industry-specific threats, regional risk factors, adversary capability assessment',
        'Supply Chain Deep Dive Fourth-party risk analysis, critical vendor assessment, dependency mapping',
        'Continuous Monitoring Setup Automated alerting infrastructure, brand monitoring, credential leak detection',
        'Deliverables Comprehensive intelligence dossier, threat actor landscape report, takedown coordination guidance, ongoing monitoring dashboard, incident response playbook, social engineering defense training'
      ]
    }
  ]
},

// Service 7: SOC as a Service (Security Operations Center)
{
  slug: 'soc-as-a-service',
  title: 'SOC as a Service (Security Operations Center)',
  shortDescription: 'Continuous security monitoring and threat detection through 24/7 log analysis, SIEM correlation, and behavioral analytics.',
  longDescription: 'Provides incident response capabilities with mean-time-to-detect optimization and threat hunting operations. Includes custom detection rule development and integration with existing security infrastructure.',
  icon: Monitor,
  packages: [
    {
      name: 'Basic Package',
      price: '$3,000/month',
      features: [
        'Monitoring Coverage Business hours (8x5) monitoring and alerting',
        'Log Sources Core infrastructure (firewalls, IDS/IPS, authentication logs, critical servers)',
        'Alert Management Triage and classification of security events, false positive reduction',
        'Basic Detection Rules Signature-based threat detection, IOC matching, anomaly alerting',
        'Incident Notification Email/Slack/Teams alerts for critical events',
        'Deliverables Weekly summary reports, alert statistics, threat landscape overview'
      ]
    },
    {
      name: 'Medium Package',
      price: '$6,500/month',
      features: [
        'All Basic features plus',
        'Extended Monitoring 16x5 or 12x7 coverage with extended response times',
        'Enhanced Log Integration Cloud platforms (AWS CloudTrail, Azure Sentinel), endpoint logs, application logs',
        'Proactive Threat Hunting Weekly manual investigation of suspicious patterns, behavioral anomaly analysis',
        'Incident Investigation Root cause analysis, attack timeline reconstruction, evidence collection',
        'Threat Intelligence Integration IOC correlation with MISP, STIX/TAXII feeds, dark web monitoring',
        'Playbook Automation SOAR integration for common incident types, automated containment actions',
        'Deliverables Monthly threat intelligence reports, incident post-mortems, security metrics dashboard, quarterly security posture review'
      ],
      highlight: true
    },
    {
      name: 'Pro Package (24/7 MDR)',
      price: 'Custom Quote',
      features: [
        'All Medium features plus',
        'Full 24/7/365 Coverage Continuous monitoring with dedicated SOC analysts and 1-hour SLA for critical incidents',
        'Comprehensive Log Coverage All infrastructure, applications, cloud, endpoint, network, identity sources',
        'Advanced Threat Hunting Daily proactive hunting using MITRE ATT&CK framework, anomaly detection via ML/AI',
        'Full Incident Response Active containment, malware analysis, forensic investigation, threat eradication',
        'Dedicated Response Team Named analysts, priority escalation path, on-call security engineers',
        'Custom Detection Engineering Tailored correlation rules, behavioral baselines, environment-specific use cases',
        'Vulnerability Intelligence Proactive alerting on exploited vulnerabilities, patch prioritization guidance',
        'Compliance Support Audit log retention, compliance reporting (SOC 2, ISO 27001, PCI-DSS)',
        'Deliverables Real-time security dashboard, executive monthly briefings, annual security posture assessment with improvement roadmap, on-demand forensic reports, tabletop exercise facilitation'
      ]
    }
  ]
},

// Service 8: AI Automation Solutions
{
  slug: 'ai-automation-solutions',
  title: 'AI Automation Solutions',
  shortDescription: 'Enterprise-grade artificial intelligence implementation for business process automation and workflow optimization.',
  longDescription: 'Develops custom AI agents, RAG systems, and intelligent automation pipelines leveraging LLM capabilities and API orchestration. Integrates with existing infrastructure to reduce operational overhead and enhance decision-making processes through machine learning.',
  icon: Bot,
  packages: [
    {
      name: 'Basic Package',
      price: '$5,000',
      features: [
        'Use Case Analysis Business process evaluation, automation opportunity identification, ROI assessment',
        'AI Workflow Design Single-purpose automation (document processing, email classification, data extraction)',
        'LLM Integration OpenAI, Anthropic, or open-source model implementation with prompt optimization',
        'API Orchestration RESTful API integration with 2-3 business systems',
        'Basic RAG Implementation Document ingestion, vector embedding, semantic search for knowledge retrieval',
        'User Interface Simple web interface or Slack/Teams bot for interaction',
        'Deliverables Functional automation workflow, technical documentation, basic usage training, 30-day support'
      ]
    },
    {
      name: 'Medium Package',
      price: '$12,000',
      features: [
        'All Basic features plus',
        'Multi-Step Workflows Complex automation chains with conditional logic, error handling, human-in-the-loop',
        'Advanced RAG System Multi-source data integration, hybrid search (vector + keyword), citation tracking, context optimization',
        'Agent Architecture Goal-oriented AI agents with tool-calling, memory, and decision-making capabilities',
        'Enhanced API Integration 5-10 system integrations including CRM, ERP, project management, communication platforms',
        'Fine-Tuning Custom model adaptation for domain-specific language, improved accuracy on specialized tasks',
        'Data Pipeline Automated data preprocessing, ETL workflows, scheduled batch processing',
        'Monitoring Dashboard Performance metrics, error tracking, cost analysis, usage analytics',
        'Deliverables Scalable automation platform, comprehensive API documentation, staff training sessions, 90-day support with optimization'
      ],
      highlight: true
    },
    {
      name: 'Pro Package',
      price: 'Custom Quote',
      features: [
        'All Medium features plus',
        'Enterprise AI Architecture Multi-agent systems, autonomous workflow orchestration, distributed processing',
        'Advanced RAG Pipeline Multi-modal retrieval (text, images, tables), graph-based knowledge representation, query routing',
        'Model Optimization Quantization, caching strategies, response time optimization, cost reduction techniques',
        'Security Hardening Prompt injection prevention, output sanitization, PII redaction, access control implementation',
        'Custom Model Training Fine-tuning or LoRA adaptation on proprietary datasets, model evaluation and benchmarking',
        'Comprehensive Integration Unlimited API connections, webhook management, event-driven architecture',
        'MLOps Infrastructure CI/CD pipelines for model deployment, A/B testing, version control, rollback capabilities',
        'Governance Framework Audit logging, compliance documentation, bias detection, responsible AI guidelines',
        'Scalability & Reliability Load balancing, failover mechanisms, horizontal scaling, 99.9% uptime SLA',
        'Deliverables Production-grade AI platform, full source code and infrastructure-as-code, executive training, 12-month managed support with continuous optimization, quarterly performance reviews'
      ]
    }
  ]
},

// Service 9: Secure Web Application Development
{
  slug: 'secure-web-development',
  title: 'Secure Web Application Development',
  shortDescription: 'Full-stack application development with security-by-design methodology employing modern frameworks and DevSecOps practices.',
  longDescription: 'Implements defense-in-depth architecture, secure authentication systems, and OWASP-compliant coding standards. Delivers scalable, performant applications with comprehensive security controls and vulnerability mitigation built into every layer.',
  icon: Code2,
  packages: [
    {
      name: 'Basic Package',
      price: '$8,000',
      features: [
        'Technology Stack Next.js/React frontend, Node.js/Python backend, PostgreSQL/MongoDB database',
        'Core Features User authentication (JWT/session-based), CRUD operations, RESTful API, responsive design',
        'Security Controls Input validation, output encoding, parameterized queries, CSRF protection, secure password storage (bcrypt/Argon2)',
        'Infrastructure Cloud deployment (AWS/GCP/Azure), SSL/TLS configuration, basic WAF setup',
        'Testing Unit tests, integration tests, basic security scanning (npm audit, Snyk)',
        'Deliverables Functional web application, basic documentation, 30-day bug fixes, codebase handover'
      ]
    },
    {
      name: 'Medium Package',
      price: '$18,000',
      features: [
        'All Basic features plus',
        'Advanced Architecture Microservices or modular monolith, API gateway, message queues (RabbitMQ/Redis)',
        'Enhanced Security OAuth 2.0/OIDC integration, role-based access control (RBAC), MFA implementation, rate limiting, API key management',
        'Security Headers CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy implementation',
        'Data Protection Encryption at rest (AES-256), field-level encryption for sensitive data, secure key management (AWS KMS/Azure Key Vault)',
        'DevSecOps Pipeline GitHub Actions/GitLab CI with SAST (SonarQube), DAST, dependency scanning, automated security gates',
        'Monitoring & Logging Structured logging, ELK stack or CloudWatch, application performance monitoring, error tracking (Sentry)',
        'Compliance Foundation GDPR-ready data handling, audit trail implementation, privacy controls',
        'Deliverables Production-ready application, API documentation (OpenAPI/Swagger), deployment runbooks, security architecture diagram, 90-day support'
      ],
      highlight: true
    },
    {
      name: 'Pro Package',
      price: 'Custom Quote',
      features: [
        'All Medium features plus',
        'Enterprise Architecture Multi-tenant SaaS infrastructure, horizontal scaling, CDN integration, geo-distributed deployment',
        'Advanced Security Features Zero-trust architecture, attribute-based access control (ABAC), anomaly detection, security event monitoring',
        'Cryptographic Implementation End-to-end encryption, digital signatures, secure key exchange, HSM integration',
        'API Security OAuth 2.1, API versioning, GraphQL security, webhook signature validation, rate limiting per-client',
        'Container Security Docker image hardening, Kubernetes security policies, secrets management, runtime protection',
        'Penetration Testing Pre-launch security assessment, vulnerability remediation, security certification preparation',
        'Compliance & Governance SOC 2, ISO 27001, HIPAA, PCI-DSS compliance implementation, DPO-ready documentation',
        'Disaster Recovery Automated backups, point-in-time recovery, failover strategies, 99.95% uptime SLA',
        'Performance Optimization Caching strategies (Redis/Memcached), database query optimization, lazy loading, code splitting',
        'Advanced DevSecOps Blue-green deployments, canary releases, infrastructure-as-code (Terraform), secret rotation, vulnerability management',
        'Deliverables Enterprise-grade application with full source code, comprehensive security documentation, threat model, incident response plan, staff training, 12-month managed support with security updates and feature enhancements'
      ],
      highlight: true
    },
    {
      name: 'Pro Package',
      price: 'Custom Quote',
      features: [
        'All Medium features plus',
        'Enterprise Architecture Multi-tenant SaaS infrastructure, horizontal scaling, CDN integration, geo-distributed deployment',
        'Advanced Security Features Zero-trust architecture, attribute-based access control (ABAC), anomaly detection, security event monitoring',
        'Cryptographic Implementation End-to-end encryption, digital signatures, secure key exchange, HSM integration',
        'API Security OAuth 2.1, API versioning, GraphQL security, webhook signature validation, rate limiting per-client',
        'Container Security Docker image hardening, Kubernetes security policies, secrets management, runtime protection',
        'Penetration Testing Pre-launch security assessment, vulnerability remediation, security certification preparation',
        'Compliance & Governance SOC 2, ISO 27001, HIPAA, PCI-DSS compliance implementation, DPO-ready documentation',
        'Disaster Recovery Automated backups, point-in-time recovery, failover strategies, 99.95% uptime SLA',
        'Performance Optimization Caching strategies (Redis/Memcached), database query optimization, lazy loading, code splitting',
        'Advanced DevSecOps Blue-green deployments, canary releases, infrastructure-as-code (Terraform), secret rotation, vulnerability management',
        'Deliverables Enterprise-grade application with full source code, comprehensive security documentation, threat model, incident response plan, staff training, 12-month managed support with security updates and feature enhancements'
      ]
    }
  ]
}
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServices(): Service[] {
  return services;
}
