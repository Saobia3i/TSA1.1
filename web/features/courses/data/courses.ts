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
  instructor?: string;
  students?: number;
  rating?: number;
  price?: string;
}

export const courses: Course[] = [
  {
    id: '1',
    slug: 'security-analyst-bootcamp',
    title: 'Beginner to Hired: Security Analyst Live Training',
    shortDescription: 'Launch your cybersecurity career from scratch with SOC operations, threat intelligence, and SIEM tools.',
    description: 'Comprehensive training program designed to take you from beginner to job-ready security analyst. Learn SOC operations, threat hunting, incident response, and master industry-standard SIEM tools. This course covers everything you need to start your career in cybersecurity with hands-on labs and real-world scenarios.',
    icon: Shield,
    duration: '12 Weeks',
    badge: 'Beginner to Advanced',
    level: 'Beginner',
    color: '#22d3ee',
    instructor: 'John Doe',
    students: 1250,
    rating: 4.8,
    price: '$499',
    tags: ['SOC', 'SIEM', 'Threat Intelligence', 'Live Training', 'Incident Response'],
    topics: [
      'SOC Fundamentals & Operations',
      'Threat Intelligence Analysis',
      'SIEM Tools (Splunk, ELK Stack)',
      'Incident Response & Handling',
      'Log Analysis & Correlation',
      'Security Monitoring Best Practices',
      'Threat Hunting Techniques',
      'Malware Analysis Basics',
      'Security Information Management',
      'Compliance & Reporting',
    ],
  },
  {
    id: '2',
    slug: 'ethical-hacking-red-team',
    title: 'Ethical Hacking & Red Teaming Live Training',
    shortDescription: 'Master penetration testing methodologies and advanced exploitation techniques.',
    description: 'Advanced penetration testing course covering reconnaissance, exploitation, privilege escalation, and post-exploitation. Learn to think like an attacker and master red team operations. This comprehensive course prepares you for CEH, OSCP, and other professional certifications with extensive hands-on practice.',
    icon: Target,
    duration: '16 Weeks',
    badge: 'Trending',
    level: 'Intermediate',
    color: '#ec4899',
    instructor: 'Jane Smith',
    students: 2100,
    rating: 4.9,
    price: '$699',
    tags: ['Pentesting', 'Red Team', 'Exploitation', 'Live Training', 'Kali Linux'],
    topics: [
      'Reconnaissance & Information Gathering',
      'Vulnerability Assessment & Scanning',
      'Web Application Exploitation',
      'Network Penetration Testing',
      'Privilege Escalation Techniques',
      'Active Directory Attacks',
      'Post-Exploitation & Pivoting',
      'Social Engineering Tactics',
      'Wireless Network Hacking',
      'Report Writing & Documentation',
      'Exploit Development Basics',
      'Advanced Payload Generation',
    ],
  },
  {
    id: '3',
    slug: 'bug-bounty-mastery',
    title: 'Advanced Bug Bounty Training',
    shortDescription: 'Learn to find critical vulnerabilities in web applications on platforms like HackerOne.',
    description: 'Specialized training for bug bounty hunters. Master advanced web vulnerabilities, automation, and learn how to earn from bug bounty programs on HackerOne, Bugcrowd, Synack, and more. This course teaches you the methodology, tools, and mindset needed to become a successful bug bounty hunter.',
    icon: Bug,
    duration: '10 Weeks',
    level: 'Intermediate',
    color: '#a855f7',
    instructor: 'Alex Johnson',
    students: 1800,
    rating: 4.7,
    price: '$599',
    tags: ['Bug Bounty', 'Web Security', 'OWASP', 'HackerOne', 'Automation'],
    topics: [
      'OWASP Top 10 Deep Dive',
      'Advanced XSS & CSRF Techniques',
      'SQL Injection & Database Exploitation',
      'SSRF & XXE Exploitation',
      'Authentication & Authorization Bypass',
      'Bug Bounty Automation with Python',
      'Report Writing & Communication',
      'Burp Suite Pro Mastery',
      'API Security Testing',
      'Mobile App Security Basics',
      'Subdomain Takeover',
      'Business Logic Vulnerabilities',
    ],
  },
  {
    id: '4',
    slug: 'machine-learning-zero-to-alpha',
    title: 'Machine Learning: Zero to Alpha',
    shortDescription: 'Build powerful machine learning models with data science fundamentals.',
    description: 'Complete machine learning course from fundamentals to advanced techniques. Learn Python, data preprocessing, model building, and deployment of real-world ML applications. This course covers supervised and unsupervised learning, deep learning, and practical implementation of ML algorithms.',
    icon: Brain,
    duration: '14 Weeks',
    badge: 'Coming Soon',
    level: 'Beginner',
    color: '#10b981',
    instructor: 'Dr. Sarah Chen',
    students: 950,
    rating: 4.9,
    price: '$799',
    tags: ['Machine Learning', 'AI', 'Python', 'Data Science', 'Deep Learning'],
    topics: [
      'Python for Data Science',
      'Statistics & Mathematics Fundamentals',
      'Data Preprocessing & Feature Engineering',
      'Supervised Learning Algorithms',
      'Unsupervised Learning & Clustering',
      'Neural Networks & Deep Learning',
      'Model Evaluation & Optimization',
      'TensorFlow & Keras',
      'Natural Language Processing',
      'Computer Vision Basics',
      'ML Project Deployment',
      'MLOps & Production Best Practices',
    ],
  },
  {
    id: '5',
    slug: 'ai-automation-for-business',
    title: 'How to Build AI Automations for Businesses',
    shortDescription: 'Create custom automation bots and integrate AI APIs for real business solutions.',
    description: 'Practical AI automation course focused on building real business solutions. Learn to create chatbots, automate workflows, and integrate AI APIs like OpenAI, Claude, Gemini, and more. This course is perfect for entrepreneurs, developers, and business professionals looking to leverage AI for automation.',
    icon: Zap,
    duration: '8 Weeks',
    level: 'Intermediate',
    color: '#f59e0b',
    instructor: 'Mike Rodriguez',
    students: 1400,
    rating: 4.6,
    price: '$549',
    tags: ['AI Automation', 'LLMs', 'APIs', 'Business', 'ChatGPT', 'No-Code'],
    topics: [
      'AI & LLM Fundamentals',
      'OpenAI & Claude API Integration',
      'Building Custom Chatbots',
      'Workflow Automation with AI',
      'Document Processing with AI',
      'Voice & Speech Recognition',
      'Prompt Engineering Mastery',
      'Deploying AI Solutions',
      'RAG (Retrieval-Augmented Generation)',
      'AI Agent Development',
      'Zapier & Make.com Integration',
      'Monetizing AI Automation Services',
    ],
  },
  {
    id: '6',
    slug: 'professional-web-developer',
    title: 'Professional Web Developer',
    shortDescription: 'Master full stack development with emphasis on security best practices.',
    description: 'Complete web development bootcamp covering frontend, backend, databases, and security. Build secure, scalable web applications using modern technologies and best practices. This course prepares you for a career as a full-stack developer with a strong focus on security and performance.',
    icon: Code,
    duration: '20 Weeks',
    badge: 'Beginner to Advanced',
    level: 'Beginner',
    color: '#8b5cf6',
    instructor: 'David Lee',
    students: 3200,
    rating: 4.8,
    price: '$899',
    tags: ['Web Development', 'Full Stack', 'Security', 'React', 'Node.js', 'TypeScript'],
    topics: [
      'HTML, CSS, JavaScript Fundamentals',
      'React & Modern Frontend Development',
      'TypeScript & Type Safety',
      'Node.js & Express Backend',
      'Database Design (SQL & NoSQL)',
      'RESTful API Development',
      'GraphQL Basics',
      'Authentication & Authorization',
      'Web Security Best Practices',
      'DevOps & CI/CD Basics',
      'Deployment & Hosting',
      'Performance Optimization',
      'Testing (Unit, Integration, E2E)',
      'Git & GitHub Workflows',
    ],
  },
];

// Get all courses
export function getAllCourses(): Course[] {
  return courses;
}

// Get a single course by slug
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

// Get a single course by ID
export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

// Get featured courses (first N courses)
export function getFeaturedCourses(count: number = 3): Course[] {
  return courses.slice(0, count);
}

// Get courses by level
export function getCoursesByLevel(level: string): Course[] {
  return courses.filter((course) => course.level.toLowerCase() === level.toLowerCase());
}

// Get courses by tag
export function getCoursesByTag(tag: string): Course[] {
  return courses.filter((course) =>
    course.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// Search courses by keyword
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

// Get total number of students across all courses
export function getTotalStudents(): number {
  return courses.reduce((total, course) => total + (course.students || 0), 0);
}

// Get average rating across all courses
export function getAverageRating(): number {
  const coursesWithRating = courses.filter((course) => course.rating);
  if (coursesWithRating.length === 0) return 0;
  
  const totalRating = coursesWithRating.reduce((sum, course) => sum + (course.rating || 0), 0);
  return parseFloat((totalRating / coursesWithRating.length).toFixed(1));
}
