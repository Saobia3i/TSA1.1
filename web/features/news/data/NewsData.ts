export type NewsBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; caption?: string }
  | { type: "youtube"; videoId: string }
  | {
      type: "link";
      title: string;
      description: string;
      url: string;
      image?: string;
    };

export type NewsItem = {
  id: number;
  title: string;
  date: string;
  heroImages: string[];
  shortDescription: string;
  content: NewsBlock[];
  isPinned?: boolean;
  
};

export const NEWS: NewsItem[] = [
  {
    id: 1,
    title: "TSA Hosts Live Talk with Former Head of Brazilian Army Cyber Defense Command",
    date: "2026-01-23",
    heroImages: [
      
      "https://ik.imagekit.io/chujc3k4l/Screenshot%202026-01-24%20004048.png",
      "https://ik.imagekit.io/chujc3k4l/1.png",
      "https://ik.imagekit.io/chujc3k4l/Screenshot%202026-01-24%20003943.png",
    ],
    shortDescription: "International cybersecurity professionals join exclusive session as Ret. Col. Nestor Lana da Silva shares national defense insights.",
    content: [
      {
        type: "paragraph",
        text: "Tensor Security Academy (TSA) successfully hosted a landmark live webinar today featuring Ret. Col. Nestor Lana da Silva, former head of IT at Brazil's Army Cyber Defense Command, bringing together cybersecurity professionals from across the globe for an unprecedented look inside national-level cyber defense operations.",
      },
      {
        type: "paragraph",
        text: "The live session attracted an impressive international turnout, with participants joining from the United States, Australia, Brazil, Malaysia, and Bangladesh transforming the event into a truly global knowledge exchange platform spanning multiple continents.",
      },
      {
        type: "heading",
        text: "A Legendary Figure in Cybersecurity",
      },
      {
        type: "paragraph",
        text: "Colonel da Silva is a distinguished figure in Brazil's cybersecurity landscape, having served as the head of IT for the Brazilian Army Cyber Defense Command. Under his leadership, he coordinated 'Cyber Guardian,' the largest digital defense exercise in the Southern Hemisphere, protecting Brazil's critical national infrastructure including power grids, water systems, telecommunications, financial institutions, nuclear facilities, and transportation networks against sophisticated cyber threats.",
      },
      {
        type: "paragraph",
        text: "His credentials include ensuring cybersecurity for COP30 (the United Nations Climate Change Conference) held in Belém, Brazil in November 2025, and representing Brazil in 'Locked Shields' the world's largest and most complex international cyber defense exercise.",
      },
      {
        type: "paragraph",
        text: "What makes Colonel da Silva's experience truly unique is his firsthand perspective on how modern warfare has evolved from parachuting into enemy territory to conducting operations with keyboards and mouse in the digital battlespace.",
      },
      {
        type: "youtube",
        videoId: "JGNd6EPLFkQ",
      },
      {
        type: "heading",
        text: "Real-World Insights from the Front Lines",
      },
      {
        type: "paragraph",
        text: "This wasn't a theoretical presentation—it was frontline experience translated into actionable knowledge. Colonel da Silva shared invaluable insights drawn directly from his experience defending an entire nation, covering critical topics that rarely make it outside classified military briefings:",
      },
      {
        type: "paragraph",
        text: "→ How governments build cyber resilience at scale\n→ Tactics military cyber units deploy against nation-state threats\n→ Digital evidence preservation protocols in high-stakes national security incidents\n→ Protecting critical infrastructure from advanced persistent threats\n→ Coordinating international cyber defense exercises",
      },
      {
        type: "image",
        src: "https://ik.imagekit.io/chujc3k4l/Screenshot%202026-01-24%20004048.png",
        caption: "Live webinar session with international participants",
      },
      {
        type: "paragraph",
        text: "The diverse international audience brought varied perspectives from different cybersecurity landscapes, creating a rich dialogue that highlighted both universal challenges and region-specific approaches to cyber defense. From corporate security teams to government sector professionals, attendees gained strategic insights that can only come from someone who's commanded cyber defense at the national level.",
      },
      {
        type: "heading",
        text: "Building Global Networks",
      },
      {
        type: "paragraph",
        text: "Tensor Security Academy's ability to bring together such high-caliber speakers with engaged professionals from five countries demonstrates the organization's commitment to elevating the cybersecurity profession through knowledge-sharing and international collaboration.",
      },
      
      {
        type: "paragraph",
        text: "Founder Abrar Jahin expressed gratitude to all participants and reaffirmed TSA's commitment to creating more such opportunities, building global networks for Bangladesh's cybersecurity community, and showcasing Bangladeshi talent on the world stage.",
      },
      {
        type: "paragraph",
        text: "For those who attended, the session provided the kind of expertise that transforms good cybersecurity professionals into exceptional ones—lessons learned not from textbooks, but from defending an entire nation in the digital battlespace.",
      },
      
      {
        type: "paragraph",
        text: "Tensor Security Academy continues to connect cybersecurity professionals worldwide with industry leaders and experienced practitioners. Stay connected for upcoming events and opportunities to learn from global experts.",
      },
    ],
    isPinned: true,
  },
{
  id: 2,
  title: "TSA Founder Abrar Jahin Makes National Headlines for Revolutionizing Global Cybersecurity Education",
  date: "2026-01-15",
  heroImages: [
    "https://ik.imagekit.io/chujc3k4l/tsa%20news%20about%20abrar.png",
  ],
  shortDescription:
    "Tensor Security Academy founder Abrar Jahin is featured in Bangladesh’s national daily Naya Diganta for reshaping global cybersecurity education through accessible, mentor-led training.",
  content: [
    {
      type: "paragraph",
      text: "Tensor Security Academy (TSA) founder Abrar Jahin has been featured in Naya Diganta, one of Bangladesh’s most respected national daily newspapers, recognizing his role in transforming how cybersecurity education is delivered globally.",
    },
    {
      type: "image",
      src: "https://ik.imagekit.io/chujc3k4l/image%201.png",
      caption: "Featured coverage highlighting TSA and its global impact",
    },
    {
      type: "paragraph",
      text: "The article highlights how Abrar Jahin has gone beyond building a company to creating a movement—making high-quality cybersecurity education accessible to talented individuals worldwide, regardless of geography or financial background.",
    },
    {
      type: "heading",
      text: "A Journey Rooted in Purpose",
    },
    {
      type: "paragraph",
      text: "Growing up in Narayanganj, Abrar Jahin showed early curiosity in technology, robotics, machine learning, and cybersecurity. A defining moment came during the 2024 Bangladesh floods, when he and his university team built a robot to deliver relief supplies and emergency medicine to affected areas—demonstrating a problem-solving mindset grounded in real-world impact.",
    },
    {
      type: "paragraph",
      text: "That same drive later led to the founding of Tensor Security Academy, with a mission to fix what Abrar saw as a broken global cybersecurity education system.",
    },
    {
      type: "heading",
      text: "Fixing a Broken Education Model",
    },
    {
      type: "paragraph",
      text: "Traditional cybersecurity training in Western countries is often prohibitively expensive, while free online resources lack structure, mentorship, and real-world relevance. TSA was launched in October 2025 to bridge this gap through live, mentor-led, hands-on training delivered by experienced professionals from Bangladesh to a global audience.",
    },
    {
      type: "image",
      src: "https://ik.imagekit.io/chujc3k4l/image%20.png",
      caption: "TSA’s growing international presence and recognition",
    },
    {
      type: "heading",
      text: "Results That Speak",
    },
    {
      type: "paragraph",
      text: "Within just four months of launch, TSA student Fabrice Njeh successfully passed the CompTIA Security+ certification—one of the world’s most respected cybersecurity credentials—providing early validation of TSA’s practical and results-driven approach.",
    },
    {
      type: "image",
      src: "https://ik.imagekit.io/chujc3k4l/fabrice%20njeh%20passed%20securrity+.png",
      caption: "TSA student achieving CompTIA Security+ certification",
    },
    {
      type: "heading",
      text: "National Recognition and Vision",
    },
    {
      type: "paragraph",
      text: "The Naya Diganta feature also emphasized the national importance of cybersecurity. Expert Ziaur Rahman noted that as Bangladesh accelerates digital transformation, building skilled cybersecurity manpower is critical for protecting infrastructure and citizens alike.",
    },
    {
      type: "paragraph",
      text: "Abrar Jahin shared his vision clearly: raising cybersecurity awareness and creating skilled professionals to strengthen information security at both national and global levels.",
    },
    {
      type: "heading",
      text: "A Team and a Global Future",
    },
    {
      type: "paragraph",
      text: "TSA’s success is powered by a strong team covering offensive security, curriculum design, strategy, operations, and web development—making it a collaborative movement rather than a one-person effort.",
    },
    {
      type: "paragraph",
      text: "Today, TSA trains students across Bangladesh, the USA, and Australia, with growing interest from the UK and Canada. International credibility was further reinforced when former Head of IT, Cyber Defence Command of the Brazilian Army, Nestor Lana Da Silva, joined TSA for a live talk.",
    },
    {
      type: "link",
      title: "Read the Full Naya Diganta Feature",
      description:
        "National coverage highlighting Abrar Jahin and Tensor Security Academy’s impact on global cybersecurity education.",
      url: "https://dailynayadiganta-com.translate.goog/bangladesh/country-news/SgLHzIoLgYdp?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en#goog_rewarded",
    },
    {
      type: "paragraph",
      text: "The recognition by Naya Diganta signals that a globally relevant cybersecurity education platform—born in Narayanganj, Bangladesh—is now firmly on the world stage.",
    },
  ],
  isPinned: false,
}

];

// Sort news: pinned first, then by date (newest first)
export const getAllNews = () => [...NEWS].sort((a, b) => {
  if (a.isPinned && !b.isPinned) return -1;
  if (!a.isPinned && b.isPinned) return 1;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export const getNewsById = (id: number) => NEWS.find((n) => n.id === id);
