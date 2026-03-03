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
    positions?: {
      organization: string;
      title: string;
      year: string;
      details: string;
    }[];
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
  militaryDecorations?: string[];
  internationalExercises?: {
    name: string;
    role: string;
    year: string;
    description: string;
  }[];
}

export const consultants: Consultant[] = [
  {
    id: 'nestor-lana-da-silva',
    name: 'Ret. Col. Nestor Lana da Silva',
    title: 'Former Head of IT, Brazilian Army Cyber Defense Command | Cybersecurity & National Defense Specialist',
    role: 'Senior Consultant - Cybersecurity & Defense Operations | Country Director, TSA Brazil',
    image: 'https://ik.imagekit.io/ekb0d0it0/silva.jpg?tr=w-560,h-560,q-85,f-webp',
    country: 'Brazil',
    location: 'Brasília, Federal District, Brazil',
    
    qualifications: [
      'Postgraduate Degree in Cyber Defense (Senac DF)',
      'Postgraduate Degree in Information Security (Uniminas)',
      'Postgraduate Degree in Web Application Development (Uniminas)',
      'Bachelor of Military Sciences - Leadership and Military Administration',
      'Free Fall Parachute Jump Specialist',
      'Air Transport Operations Specialist'
    ],
    
    specializations: [
      'Government Cyber Defense Architecture',
      'Critical Infrastructure Protection',
      'Cyber Incident Response & Digital Forensics',
      'National Security & Defense Strategy',
      'Military Cyber Operations',
      'Web Application Development (PHP & MySQL)',
      'IT Infrastructure & Network Management',
      'Cybersecurity Risk Assessment',
      'Crisis Management & Emergency Response',
      'International Cyber Defense Exercises'
    ],
    
    achievements: [
      'Led the IT Division at Brazil\'s Cyber Defense Command protecting critical national infrastructure',
      'Served as Advisor on Cyber Defense for Brazil\'s Eastern Military Command during Federal Intervention',
      'Participated as Blue Team member in Locked Shields - the world\'s largest international cyber defense exercise',
      'Technical Committee Member for Itaipu Binacional\'s Research, Development & Innovation Partnership',
      'Key participant in Cyber Guardian Exercise 7.0 - Southern Hemisphere\'s largest digital defense drill',
      'Successfully managed cybersecurity operations during COP30 UN Climate Conference in Belém, Brazil',
      'Awarded five prestigious military medals including Gold, Silver, and Bronze Aeroterrestrial Merit Medals',
      'Pioneered early computer network implementations using HUB and UTP cable technology in Brazilian military',
      'Developed multiple custom database systems for military operational efficiency',
      'Certified by Brazilian Army\'s National Cyber Defense School in Sectoral Cyber Incident Management'
    ],
    
    experience: [
      {
        position: 'Chief of Information Technology',
        organization: 'Multiple Brazilian Army Organizations',
        duration: '1999 - 2024 (25 years across 8 organizations)',
        description: 'Led IT operations across 8 major Brazilian Army organizations over 25 years, managing networks of 150-250+ computers, implementing cutting-edge security infrastructure, and pioneering early network implementations that laid the foundation for modern military IT systems.',
        positions: [
          {
            organization: 'Cyber Defense Command',
            title: 'Chief of IT & Communications Division',
            year: 'August 2022 - November 2024',
            details: 'Led IT division protecting Brazil\'s critical national infrastructure from cyberattacks. Managed cyber defense strategies for energy, water, telecommunications, finance, nuclear, and transportation sectors.'
          },
          {
            organization: 'Communications & Electronic Warfare Command',
            title: 'Chief of Information Technology Section',
            year: 'January 2019 - August 2022',
            details: 'Headed IT operations and supervised the Cyber Force Project. Advanced Brazil\'s military cyber capabilities during critical development phase.'
          },
          {
            organization: 'Parachute Infantry Brigade Command',
            title: 'Chief of IT Section',
            year: 'January 2016 - December 2017',
            details: 'Managed network infrastructure of ~250 computers. Administered virtualization, email (PostFix), firewalls (IPTABLES/PfSense), proxy (SQUID), domain controllers. Developed custom databases for housing, procurement, and financial tracking.'
          },
          {
            organization: 'Parachute Infantry Brigade Command',
            title: 'Chief of IT Section',
            year: 'January 2009 - January 2011',
            details: 'Managed network infrastructure of ~250 computers. Administered virtualization, email, firewalls, proxy, file servers, and videoconference systems. Maintained web presence.'
          },
          {
            organization: '20th Parachute Logistics Battalion',
            title: 'Chief of IT Section',
            year: 'January 2008 - December 2008',
            details: 'Managed network of ~200 computers. Installed and maintained surveillance camera systems for security operations.'
          },
          {
            organization: 'Central Ammunition Depot (DCMun), Paracambi-RJ',
            title: 'Chief of IT Section',
            year: 'March 2006 - December 2006',
            details: 'Managed network of ~150 computers. Provided technical support for ammunition shelf-life and storage control software.'
          },
          {
            organization: 'Reserve Officers Training Center Porto Alegre (CPOR-PA)',
            title: 'Chief of IT Section',
            year: 'January 2004 - March 2006',
            details: 'Managed network of ~250 computers. Maintained institutional web presence at www.cporpa.eb.mil.br.'
          },
          {
            organization: 'Parachute Folding, Maintenance & Air Supply Battalion (BDOMPSA)',
            title: 'Chief of IT Section',
            year: 'January 1999 - December 2002',
            details: 'Pioneered first network infrastructure using HUB and UTP cables. Established internet terminals and file/printer sharing at www.bdompsa.eb.mil.br.'
          }
        ]
      },
      {
        position: 'Senior Consultant - Cybersecurity & Defense Operations',
        organization: 'Tensor Security Academy',
        duration: 'February 2026 - Present',
        description: 'Providing strategic cybersecurity consulting and defense operations expertise, sharing insights from extensive military cyber defense experience to protect organizations against evolving digital threats.'
      },
      {
        position: 'Executive Director & Founder',
        organization: 'Minuto da Cibernética',
        duration: 'August 2022 - Present',
        description: 'Leading cybersecurity education initiative focused on democratizing cyber knowledge and empowering professionals across Brazil at www.minutociber.com.br.'
      },
      {
        position: 'Advisory Member - Cybersecurity Commission',
        organization: 'Brazilian Bar Association (OAB/DF)',
        duration: 'August 2025 - Present',
        description: 'Contributing technical and strategic analysis for digital environment protection. Participating in studies, debates, and guidance to strengthen information security and prepare organizations against current cyber threats.'
      },
      {
        position: 'Solutions & Innovation Consultant',
        organization: 'FastHelp Information Security',
        duration: 'January 2025 - December 2025',
        description: 'Provided strategic support for enterprise digital security, conducting cyber risk mapping and proposing specialized solutions ensuring business continuity and complete operational protection.'
      },
      {
        position: 'Cyber Defense Advisor',
        organization: 'Brazilian Army - Communications & Electronic Warfare Command',
        duration: 'January 2019 - June 2019',
        description: 'Served as Cyber Defense Advisor and Supervisor of the Cyber Force Project during strategic cyber defense initiatives.'
      },
      {
        position: 'Cyber Defense Advisor',
        organization: 'Brazilian Army - Eastern Military Command (CML)',
        duration: 'December 2017 - January 2019',
        description: 'Served as key advisor during Federal Intervention in Rio de Janeiro, providing crucial technological support and cyber defense expertise during high-stakes national security operations.'
      },
      {
        position: 'Chief of Procurement & Contracts Section',
        organization: 'Parachute Infantry Brigade Command',
        duration: 'July 2013 - December 2015',
        description: 'Led procurement operations for Brigade combat readiness, ensuring efficient and transparent resource allocation through rapid contract management in compliance with federal regulations.'
      },
      {
        position: 'Chief of Administrative Oversight',
        organization: 'Parachute Folding Battalion (BDOMPSA)',
        duration: 'January 2013 - July 2013',
        description: 'Oversaw administrative operations ensuring compliance and operational efficiency during transition period.'
      },
      {
        position: 'Web Developer (PHP & MySQL)',
        organization: 'Military Academy of Agulhas Negras (AMAN)',
        duration: 'January 2011 - December 2012',
        description: 'Developed custom web systems using Linux servers, PHP, and MySQL, including housing management database (PNR) and health support coordination system for military and academic activities.'
      },
      {
        position: 'Student - Postgraduate in Military Sciences',
        organization: 'School of Officer Improvement (EsAO)',
        duration: 'January 2007 - December 2007',
        description: 'Completed advanced military leadership and strategic studies program at the prestigious School of Officer Improvement (Escola de Aperfeiçoamento de Oficiais).'
      },
      {
        position: 'Material Management Officer',
        organization: 'Reserve Officers Training Center (CPOR-PA)',
        duration: 'January 2003 - December 2003',
        description: 'Responsible for material inventory, logistics coordination, and equipment management supporting training operations.'
      },
      {
        position: 'Commander - 1st Parachute Folding Platoon',
        organization: 'Parachute Folding Battalion (BDOMPSA)',
        duration: 'December 2000 - December 2001',
        description: 'Led platoon responsible for parachute folding, aeroterrestrial equipment maintenance, cargo preparation, aircraft loading, and air drop operations at www.bdompsa.eb.mil.br.'
      },
      {
        position: 'Cadet - Bachelor of Military Sciences',
        organization: 'Military Academy of Agulhas Negras (AMAN)',
        duration: 'January 1995 - December 1998',
        description: 'Completed four-year military officer training program earning Bachelor\'s degree in Military Sciences with emphasis on leadership and military administration at www.aman.eb.mil.br.'
      },
      {
        position: 'Student - Preparatory Military Education',
        organization: 'Army Preparatory School for Cadets (EsPCEx)',
        duration: 'February 1994 - December 1994',
        description: 'Completed preparatory military education program in Campinas, São Paulo, as foundation for military career.'
      }
    ],
    
    education: [
      {
        degree: 'Postgraduate Degree in Cyber Defense',
        institution: 'Senac DF',
        year: '2019 - 2020'
      },
      {
        degree: 'Postgraduate Degree in Web Application Development',
        institution: 'Uniminas EAD',
        year: '2023 - 2024'
      },
      {
        degree: 'Postgraduate Degree in Information Security',
        institution: 'Uniminas EAD',
        year: '2023'
      },
      {
        degree: 'Postgraduate in Military Sciences (Officer Improvement Course)',
        institution: 'School of Officer Improvement, Brazilian Army',
        year: '2007'
      },
      {
        degree: 'Bachelor of Military Sciences - Leadership & Military Administration',
        institution: 'Military Academy of Agulhas Negras (AMAN)',
        year: '1995 - 1998'
      },
      {
        degree: 'Preparatory Military Education',
        institution: 'Army Preparatory School for Cadets (EsPCEx)',
        year: '1994'
      }
    ],
    
    certifications: [
      'National Cyber Defense School - Sectoral Cyber Incident Management for Defense (2024)',
      'Free Fall Parachute Jump Course - General Penha Brasil Parachute Instruction Center (2013)',
      'Air Transport Course - General Penha Brasil Parachute Instruction Center (2012)',
      'Introduction to Internet of Things - Cisco Networking Academy',
      'PHP & MySQL I: Fundamentals for Web System Development',
      'FCF - Introduction to the Threat Landscape 2.0',
      'Database Modeling'
    ],
    
    languages: [
      'Portuguese (Native)',
      'English (Professional Working Proficiency)',
      'Spanish (Limited Working Proficiency)'
    ],
    
    expertise: [
      {
        category: 'National Cyber Defense & Critical Infrastructure',
        skills: [
          'Leading cyber defense operations protecting government critical infrastructure across energy, water, telecom, finance, nuclear, and transportation sectors',
          'Designing and executing large-scale national cyber exercises including Cyber Guardian 7.0 and international collaboration through Locked Shields',
          'Military cyber operations planning integrating cyber warfare, electronic warfare, and advanced threat intelligence against nation-state actors'
        ]
      },
      {
        category: 'Incident Response & Digital Forensics',
        skills: [
          'End-to-end incident response from detection to containment with digital evidence preservation, chain of custody, and comprehensive forensic analysis',
          'Security Operations Center (SOC) management including threat hunting, malware analysis, network traffic monitoring, and proactive defense strategies',
          'Crisis management during cyber emergencies with rapid decision-making, disaster recovery execution, and post-incident root cause analysis'
        ]
      },
      {
        category: 'Enterprise IT Infrastructure & Security',
        skills: [
          'Designing and managing large-scale enterprise networks (250+ endpoints) with multi-platform server administration across Linux and Windows environments',
          'Security infrastructure deployment including firewalls (IPTABLES, PfSense), email systems (PostFix), proxy servers (SQUID), and virtualization technologies',
          'Database administration and web server management (Apache, Nginx, MySQL, PostgreSQL) ensuring high availability and operational resilience'
        ]
      },
      {
        category: 'Software Development & Custom Solutions',
        skills: [
          'Full-stack PHP web application development with MySQL database design for mission-critical military and government systems',
          'Custom database solutions for operational management including housing, procurement, financial tracking, and visitor control systems',
          'Web security implementation, API development, and integration with legacy military infrastructure serving hundreds of concurrent users'
        ]
      },
      {
        category: 'Cybersecurity Governance & Compliance',
        skills: [
          'Comprehensive cyber risk assessment, mapping, and mitigation strategies aligned with organizational objectives and regulatory requirements (LGPD)',
          'Information security governance framework development including policy creation, third-party risk management, and vendor security assessments',
          'Security awareness training programs, business continuity planning, IT audit coordination, and privacy impact assessments'
        ]
      },
      {
        category: 'Strategic Leadership & Communication',
        skills: [
          'Leading high-performing cybersecurity teams with vision, mentorship, and operational excellence across military, government, and private sector contexts',
          'Cross-functional collaboration and stakeholder management translating complex technical concepts into actionable business and strategic insights',
          'International partnership development, public speaking at major conferences (RSA, Black Hat), and thought leadership in cyber defense'
        ]
      }
    ],
    
    biography: `Ret. Col. Nestor Lana da Silva represents the evolution of modern warfare—from traditional military operations to the invisible battlegrounds of cyberspace. With over three decades of distinguished service in the Brazilian Army, he has positioned himself at the vanguard of national cyber defense, transforming how nations protect their most critical digital infrastructure.

His journey began in 1993 with a PC 386 from his mother, just before entering military service. What started as initial reluctance toward the unfriendly DOS interface evolved into an unrelenting passion for technology. This personal transformation mirrors his professional philosophy: "Not using technology in today's world means losing quality of life."

From 2022 to 2024, Colonel Silva commanded the Information Technology and Communications Division at Brazil's Cyber Defense Command, orchestrating defense strategies protecting critical infrastructure spanning energy, telecommunications, water, finance, nuclear facilities, and transportation networks. His leadership proved instrumental during the 2023 national blackout, applying the military principle that "every anomaly should be treated as an attack."

His international recognition came through participation in Locked Shields, the world's largest real-time cyber defense exercise, and Operation Cyber Guardian 7.0—the Southern Hemisphere's largest digital defense drill. These experiences cemented Brazil's position in international cyber defense cooperation and demonstrated his ability to operate alongside elite cyber warriors from dozens of nations.

The breadth of his technical mastery spans from pioneering network implementations in the late 1990s to sophisticated web application development using PHP and MySQL. He developed custom database systems for housing management, health support coordination, procurement tracking, and financial operations—demonstrating that effective cyber defense requires understanding every layer of the technological stack.

As a decorated military officer wearing five military medals—including Gold, Silver, and Bronze Aeroterrestrial Merit Medals—he brings military-grade discipline and precision to civilian cybersecurity challenges. His background as a qualified parachutist and air transport specialist reminds us that cyber warriors must possess the same courage and precision as their physical battlefield counterparts.

Beyond military service, his vision extends to democratizing cybersecurity knowledge. As founder of "Minuto da Cibernética" (Cyber Minute) and Advisory Member of the Brazilian Bar Association's Cybersecurity Commission, he works tirelessly to ensure cybersecurity expertise is accessible to all Brazilians.

At Tensor Security Academy, Colonel Silva brings this wealth of knowledge to organizations worldwide, sharing lessons learned from defending a nation to help enterprises build resilient cyber defense programs. His mission remains unchanged: to ensure that those he serves can operate with confidence, knowing their digital infrastructure is protected by someone who has faced the most sophisticated threats and emerged victorious.`,
    
    shortDescription: 'Retired Brazilian Army Colonel with 30+ years of distinguished service specializing in national cyber defense, critical infrastructure protection, and military cyber operations. Former Head of IT at Brazil\'s Cyber Defense Command, bringing elite military-grade cybersecurity expertise to protect organizations against sophisticated digital threats.',
    
    quote: 'Not using technology in today\'s world means losing quality of life. My mission is to ensure everyone has access to the knowledge they need to thrive in our digital age.',
    
    linkedIn: 'https://www.linkedin.com/in/nestorlana/',
    email: 'nestorlana@gmail.com',
    
    highlights: [
      'Led IT Division at Brazilian Army\'s Cyber Defense Command protecting critical national infrastructure (2022-2024)',
      'Participated in Locked Shields - the world\'s largest international cyber defense exercise',
      'Key technical advisor during Brazil\'s Federal Intervention in Rio de Janeiro (2017-2019)',
      '30+ years of military service with extensive cybersecurity and IT leadership experience',
      'Three postgraduate degrees in Cyber Defense, Information Security, and Web Development',
      'Founder of Minuto da Cibernética - democratizing cybersecurity education in Brazil',
      'Technical Committee Member for Itaipu Binacional\'s Research & Innovation Partnership',
      'Awarded five prestigious military medals including Gold, Silver, and Bronze Aeroterrestrial Merit',
      'Expert in critical infrastructure protection across energy, water, telecom, finance, nuclear, and transport sectors',
      'Advisory Member of Brazilian Bar Association\'s Cybersecurity Commission',
      'Pioneered early computer network implementations in Brazilian military facilities',
      'Managed large-scale cybersecurity operations during COP30 UN Climate Conference',
      'Developed multiple custom database systems for military operational efficiency',
      'Certified by Brazilian Army\'s National Cyber Defense School'
    ],
    
    publicSpeaking: [
      {
        event: 'Tensor Security Academy Webinar - Inside National Defense',
        topic: 'Government Cyber Operations Unveiled: Inside the Brazilian Army Cyber Defense Command',
        year: '2026'
      },
      {
        event: 'Cyber Guardian Exercise 7.0',
        topic: 'Critical Infrastructure Protection and National Cyber Defense Strategy',
        year: '2024'
      },
      {
        event: 'COP30 UN Climate Conference',
        topic: 'Cybersecurity Operations for Large-Scale International Events',
        year: '2025'
      },
      {
        event: 'Locked Shields International Cyber Defense Exercise',
        topic: 'Real-time Cyber Defense Operations and International Collaboration',
        year: '2024'
      },
      {
        event: 'Brazilian Bar Association (OAB/DF) Cybersecurity Commission',
        topic: 'Legal and Technical Aspects of Cyber Defense in Critical Infrastructure',
        year: '2025'
      },
      {
        event: 'RSA Conference',
        topic: 'Strategic, Governance, and Business Perspectives in Information Security',
        year: '2024'
      },
      {
        event: 'Black Hat Conference',
        topic: 'Technical and Offensive Cybersecurity Operations',
        year: '2024'
      }
    ],
    
    publications: [
      {
        title: 'Minuto da Cibernética Blog - Regular Cybersecurity Educational Content',
        publisher: 'www.minutociber.com.br',
        year: '2022 - Present'
      }
    ],
    
    militaryDecorations: [
      'Gold Aeroterrestrial Merit Medal',
      'Silver Aeroterrestrial Merit Medal',
      'Bronze Aeroterrestrial Merit Medal',
      'Bronze Military Medal',
      'Silver Military Medal'
    ],
    
    internationalExercises: [
      {
        name: 'Locked Shields',
        role: 'Blue Team Member',
        year: '2024',
        description: 'Participated in the world\'s largest and most complex international real-time cyber defense exercise, defending simulated critical infrastructure against sophisticated cyberattacks alongside elite cyber warriors from NATO member and partner nations.'
      },
      {
        name: 'Cyber Guardian 7.0',
        role: 'Senior Coordinator',
        year: '2024',
        description: 'Led coordination efforts in the Southern Hemisphere\'s largest digital defense exercise, simulating cyberattacks against Brazil\'s critical infrastructure (energy, water, telecommunications, finance, nuclear, transportation) to assess national response capacity and resilience.'
      },
      {
        name: 'COP30 Cyber Security Operations',
        role: 'Cyber Defense Coordinator',
        year: '2025',
        description: 'Coordinated cybersecurity operations for the 30th UN Conference of the Parties on Climate Change held in Belém, Pará, Brazil, ensuring digital security for one of the world\'s most significant climate summits chaired by Brazil.'
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

export function getConsultantsByCountry(country: string): Consultant[] {
  return consultants.filter(consultant => consultant.country === country);
}

export function getConsultantsByExpertise(expertiseCategory: string): Consultant[] {
  return consultants.filter(consultant => 
    consultant.expertise.some(exp => exp.category === expertiseCategory)
  );
}