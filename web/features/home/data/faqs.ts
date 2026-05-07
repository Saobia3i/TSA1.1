export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "What is Tensor Security Academy?",
    answer:
      "Tensor Security Academy is a cybersecurity learning platform that provides hands-on courses, mentorship, practical labs, and cybersecurity professional services.",
  },
  {
    question: "What can users learn at Tensor Security Academy?",
    answer:
      "Users can learn ethical hacking, penetration testing, blockchain security, web application security, network security, cloud security, and other practical cybersecurity topics.",
  },
  {
    question: "Does Tensor Security Academy offer cybersecurity services too?",
    answer:
      "Yes. Tensor Security Academy offers cybersecurity professional services alongside its training platform, including security-focused consulting and related service offerings.",
  },
  {
    question: "Are the courses practical or theory-based?",
    answer:
      "The courses are built around practical, job-focused learning with mentor guidance, real-world examples, and hands-on security skills instead of only theory.",
  },
  {
    question: "Can beginners join Tensor Security Academy?",
    answer:
      "Yes. Beginners can start with structured guidance and progress toward practical cybersecurity skills through live mentorship, labs, and a clear learning path.",
  },
];

export function getFAQs() {
  return faqs;
}
