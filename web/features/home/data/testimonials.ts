export type Testimonial = {
  id: string;
  name: string;
  position?: string;
  review: string;
  image?: string;
  postLink?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "nestor-lana",
    name: "Nestor Lana",
    position:
      "Former Head of IT, Brazilian Army Cyber Defense Command | Cybersecurity & National Defense Specialist",
    review:
      "My Special Thanks to Tensor Security Academy for the seriousness with which he promotes high-level education in cybersecurity, connecting international experiences and strategic realities.",
    postLink:
      "https://www.linkedin.com/posts/nestorlana_tensor-security-cyberwarfare-activity-7420516473175158785-OyMV?utm_source=share&utm_medium=member_android&rcm=ACoAAE5YPIYBoEZcaC6R2KKbLGuWysV031o8Fo0",
  },
  {
    id: "miraj-rony",
    name: "Miraj Rony",
    position: "Australia",
    review:
      "Honestly, the modules feel very real-world. They are built around what employers are actually asking for on Indeed, Seek, and LinkedIn not just random theory. It is practical, straight to the point, and genuinely helps you get job-ready.",
  },
  {
    id: "fabrice",
    name: "Fabrice",
    position: "Student",
    review:
      "I passed CompTIA Security+ in 2 months With Tensor Security Academy.",
    postLink:
      "https://www.linkedin.com/posts/fabrice-njeh-b7716228b_certificate-activity-7382077784505982976-sNwr?utm_source=share&utm_medium=member_android&rcm=ACoAAE5YPIYBoEZcaC6R2KKbLGuWysV031o8Fo0",
  },
  {
    id: "khaled-hasan",
    name: "Khaled Hasan",
    review:
      "My experience has been excellent. It stands out as one of the best places for cybersecurity training, with a strong focus on practical skills, knowledgeable instructors, and industry-relevant content. Certainly recommended.",
    postLink: "https://www.trustpilot.com/reviews/69f6c8f805fab8e806e7e14c",
  },
  {
    id: "reward-njefeh-yonkeu",
    name: "Reward Njefeh Yonkeu",
    review:
      "Starting from absolute zero in cybersecurity, I needed more than just video lessons. I needed guidance. Tensor Security Academy provided that bridge, offering a clear path from beginner to confident security professional. The live mentorship and focus on real-world skills like penetration testing have been priceless for my engineering journey.",
    postLink: "https://www.trustpilot.com/reviews/69ee191cbbe27b4f60a6b3b0",
  },
  {
    id: "boris-kamsu",
    name: "Boris Kamsu",
    review: "OUTSTANDING.",
    postLink: "https://www.trustpilot.com/reviews/6999f12f3ddd97ecaaa116f0",
  },
];

export function getTestimonials() {
  return testimonials;
}
