export interface Consultant {
  id: string;
  name: string;
  title: string;
  role: string;
  image: string;
  country: string;
  location: string;
  qualifications: string[];
  specializations: string[];
  achievements: string[];
  experience: {
    organization: string;
    position: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications: string[];
  languages: string[];
  expertise: {
    category: string;
    skills: string[];
  }[];
  biography: string;
  shortDescription: string;
  quote: string;
  linkedIn?: string;
  email?: string;
  highlights: string[];
  publicSpeaking: {
    event: string;
    topic: string;
    year: string;
  }[];
  publications?: {
    title: string;
    publisher: string;
    year: string;
  }[];
}

export const consultants: Consultant[] = [
  {
    id: 'nestor-lana-da-silva',
    name: 'Col. Nestor Lana da Silva',
    title: 'Ret. Colonel | Cybersecurity & Defense Specialist',
    role: 'Senior Consultant, TSA Labs & Country Director, Brazil',
    image: 'https://ik.imagekit.io/ekb0d0it0/silva.jpg', // Replace with actual path
    country: 'Brazil',
    location: 'Federal District, Brazil',
    qualifications: [
      'Former Head of IT, Brazilian Army Cyber Defense Command',
      'Coordinator of "Cyber Guardian" Exercise',
      'COP30 UN Climate Conference Cybersecurity Lead',
      'Locked Shields International Exercise Representative',
      'Military Veteran with 25+ Years Experience'
    ],
    specializations: [
      'National Infrastructure Defense',
      'Critical Infrastructure Protection',
      'Cyber Defense Strategy',
      'Military Cyber Operations',
      'Incident Response & Threat Intelligence',
      'Large-Scale Security Exercises'
    ],
    achievements: [
      'Coordinated the largest digital defense exercise in the Southern Hemisphere',
      'Secured critical national infrastructure including power grids, water systems, telecommunications, financial institutions, nuclear facilities, and transportation networks',
      'Led cybersecurity operations for COP30 United Nations Climate Conference in Belém, Brazil',
      'Represented Brazil at Locked Shields - the world\'s largest international cyber defense exercise',
      'Transformed cyber defense capabilities of the Brazilian Army',
      'Pioneered integration of traditional military tactics with modern cyber warfare'
    ],
    experience: [
      {
        organization: 'Brazilian Army Cyber Defense Command',
        position: 'Head of IT & Cyber Defense',
        duration: '2015 - 2024',
        description: 'Led strategic cyber defense initiatives, coordinated national-level security exercises, and established protocols for protecting critical infrastructure. Managed teams responsible for defending against nation-state level threats and coordinating incident response across military and civilian sectors.'
      },
      {
        organization: 'Tensor Security Academy',
        position: 'Senior Consultant & Country Director, Brazil',
        duration: '2024 - Present',
        description: 'Providing strategic guidance on cybersecurity training programs, developing enterprise-level security solutions, and expanding TSA\'s presence in Latin America. Leading initiatives to make world-class cybersecurity education accessible and affordable across Brazil and the Southern Hemisphere.'
      },
      {
        organization: 'Brazilian Armed Forces',
        position: 'Military Officer & Technology Specialist',
        duration: '1998 - 2024',
        description: 'Served in various technology and security roles, witnessing the transformation of modern warfare from traditional combat to cyber operations. Developed expertise in both physical and digital defense strategies.'
      }
    ],
    education: [
      {
        degree: 'Master\'s in Information Security',
        institution: 'Brazilian Military Institute of Engineering',
        year: '2012'
      },
      {
        degree: 'Bachelor\'s in Computer Science',
        institution: 'Federal University of Rio de Janeiro',
        year: '2005'
      },
      {
        degree: 'Military Academy Graduate',
        institution: 'Brazilian Military Academy (AMAN)',
        year: '1998'
      }
    ],
    certifications: [
      'CISSP - Certified Information Systems Security Professional',
      'CEH - Certified Ethical Hacker',
      'CISM - Certified Information Security Manager',
      'Military Cyber Operations Certification',
      'Critical Infrastructure Protection Specialist',
      'Incident Response Team Leader'
    ],
    languages: [
      'Portuguese (Native)',
      'English (Fluent)',
      'Spanish (Professional)'
    ],
    expertise: [
      {
        category: 'Cyber Defense',
        skills: [
          'National Security Strategy',
          'Threat Intelligence',
          'Incident Response',
          'Security Operations Center (SOC)',
          'Red Team / Blue Team Operations',
          'Vulnerability Management'
        ]
      },
      {
        category: 'Critical Infrastructure',
        skills: [
          'Power Grid Security',
          'Water System Protection',
          'Telecommunications Security',
          'Financial Infrastructure',
          'Nuclear Facility Security',
          'Transportation Networks'
        ]
      },
      {
        category: 'Leadership & Strategy',
        skills: [
          'Team Building & Management',
          'Strategic Planning',
          'Crisis Management',
          'Stakeholder Engagement',
          'Policy Development',
          'International Collaboration'
        ]
      }
    ],
    biography: `Retired Colonel Nestor Lana da Silva is a living legend in the world of cybersecurity, bringing over 25 years of distinguished military and technology leadership experience. As the Former Head of IT at the Brazilian Army Cyber Defense Command, he coordinated "Cyber Guardian" - the largest digital defense exercise in the Southern Hemisphere.

Under his leadership, Brazil's most critical national infrastructure - power grids, water systems, telecommunications, financial institutions, nuclear facilities, and transportation networks - were fortified against sophisticated cyber threats. His strategic vision and operational excellence secured the cybersecurity of COP30, the United Nations Climate Conference held in Belém, Brazil, demonstrating his capability to protect high-profile international events.

Col. Nestor represented Brazil at Locked Shields, the world's largest and most complex international cyber defense exercise, showcasing Brazilian capabilities on the global stage. What makes his experience truly unique is that he has witnessed firsthand how the modern battlefield has transformed - from traditional military operations to commanding cyber operations with keyboards and sophisticated technology. He has lived both worlds, and that perspective is irreplacable.

His journey with technology began in 1993 when he received his first PC 386. What started as an initial aversion to the unfriendly DOS interface transformed into a passionate career spanning logistics, public administration, and ultimately cyber defense. This evolution from skeptic to expert gives him a unique understanding of how to make complex technology accessible to others.

Now, as Senior Consultant at TSA Labs and Country Director for Brazil at Tensor Security Academy, Col. Nestor is dedicated to a shared vision: making world-class cybersecurity education truly accessible and affordable for everyone, regardless of where they come from or what resources they have.`,
    shortDescription: 'Former Head of IT at Brazilian Army Cyber Defense Command. Coordinated the largest digital defense exercise in the Southern Hemisphere and secured critical national infrastructure against nation-state threats.',
    quote: 'Not using technology in today\'s world means losing quality of life. My mission is to ensure everyone has access to the knowledge they need to thrive in our digital age.',
    linkedIn: 'https://www.linkedin.com/in/nestor-lana-da-silva',
    highlights: [
      'Coordinated "Cyber Guardian" - largest digital defense exercise in Southern Hemisphere',
      'Secured COP30 UN Climate Conference cybersecurity',
      'Represented Brazil at Locked Shields international exercise',
      'Protected critical national infrastructure across 6 major sectors',
      '25+ years of military and technology leadership experience'
    ],
    publicSpeaking: [
      {
        event: 'Latin American Cybersecurity Summit',
        topic: 'National Infrastructure Defense in the Digital Age',
        year: '2023'
      },
      {
        event: 'Locked Shields International Conference',
        topic: 'Collaborative Cyber Defense Strategies',
        year: '2022'
      },
      {
        event: 'Brazilian Military Technology Forum',
        topic: 'Evolution of Cyber Warfare: From Battlefield to Keyboard',
        year: '2021'
      }
    ]
  }
];

export function getConsultantById(id: string): Consultant | undefined {
  return consultants.find(consultant => consultant.id === id);
}

export function getFeaturedConsultants(): Consultant[] {
  return consultants.slice(0, 3);
}