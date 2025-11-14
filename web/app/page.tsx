'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Code, Bug, Brain, Zap, Globe, Lock, Target, Users, CheckCircle, Menu, X, Linkedin, MessageCircle, ArrowRight, Eye, Bot } from 'lucide-react';

// Gradient Button Component
const GradientButton = ({ children, onClick, large = false }: { children: React.ReactNode; onClick?: () => void; large?: boolean }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center ${large ? 'px-8 py-4 text-lg' : 'px-6 py-3'} font-semibold text-white overflow-hidden group`}
    >
      <span className="absolute inset-0 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute inset-0.5 bg-black group-hover:bg-transparent transition-colors duration-300" />
      <span className="absolute inset-0 border-2 border-transparent bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500" 
            style={{ 
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            } as React.CSSProperties} />
      <span className="relative z-10 flex items-center">{children}</span>
    </motion.button>
  );
};

// Course Card Component
const CourseCard = ({ course, index }: { course: any; index: number }) => {
  const Icon = course.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="relative group h-full"
    >
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative h-full bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all duration-300 flex flex-col">
        <div className="mb-6">
          <div className="w-16 h-16 bg-linear-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4">
            <Icon size={32} className="text-cyan-500" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-500 transition-colors">
            {course.title}
          </h3>
        </div>
        <p className="text-gray-400 mb-6 leading-relaxed grow">
          {course.description}
        </p>
        <GradientButton>
          Learn More & Enroll
        </GradientButton>
      </div>
    </motion.div>
  );
};

// Service Card Component
const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="relative group h-full"
    >
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative h-full bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all duration-300 flex flex-col">
        <div className="w-16 h-16 bg-linear-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4">
          <Icon size={32} className="text-cyan-500" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-500 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-400 leading-relaxed grow">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

const TensorSecurityAcademy = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const courses = [
    {
      title: "Beginner to Hired: Security Analyst Live Training",
      description: "Launch your cybersecurity career from scratch. This intensive program covers the fundamentals of SOC operations, threat intelligence, and SIEM tools, culminating in expert guidance to land your first job in the industry even if you are a complete beginner.",
      icon: Shield,
      color: "#00ff88"
    },
    {
      title: "Ethical Hacking & Red Teaming Live Training",
      description: "Think like an attacker to defend like a pro. Dive deep into penetration testing methodologies, advanced exploitation techniques, and real-world red teaming tactics to breach and defend complex enterprise networks.",
      icon: Target,
      color: "#ff0088"
    },
    {
      title: "Advanced Bug Bounty Training",
      description: "Turn your hacking skills into a profitable venture. Learn the systematic approach to finding critical vulnerabilities in web applications and navigating popular bug bounty platforms like HackerOne and Bugcrowd.",
      icon: Bug,
      color: "#00d4ff"
    },
    {
      title: "Machine Learning: Zero to Alpha",
      description: "Demystify AI and build powerful machine learning models from the ground up. This course covers data science fundamentals, model training, and deployment, empowering you to create intelligent solutions.",
      icon: Brain,
      color: "#a855f7"
    },
    {
      title: "How to Build AI Automations for Businesses",
      description: "Leverage the power of AI to streamline workflows and boost productivity. Learn to build custom automation bots, integrate AI APIs, and deploy intelligent systems that solve real business problems.",
      icon: Zap,
      color: "#fbbf24"
    },
    {
      title: "Professional Web Developer",
      description: "Build robust, scalable, and secure web applications. Master the full stack, from modern front-end frameworks to back-end development and databases, with a strong emphasis on security best practices.",
      icon: Code,
      color: "#06b6d4"
    }
  ];

  const services = [
    {
      title: "Web Application VAPT",
      description: "We proactively identify and help you remediate critical security vulnerabilities in your web applications before they can be exploited by malicious actors.",
      icon: Lock
    },
    {
      title: "AI & LLM Pentesting",
      description: "Secure your AI-powered future. Our experts specialize in identifying unique vulnerabilities in Large Language Models and AI systems, ensuring your AI deployments are robust and secure.",
      icon: Brain
    },
    {
      title: "Contract SOC Monitoring",
      description: "Get professional security monitoring without building an in-house SOC. I provide contract-based SOC services, detecting and responding to threats in real time as your extended security partner.",
      icon: Eye
    },
    {
      title: "AI Automation Solutions",
      description: "Unlock efficiency and innovation. We design and build custom AI automation workflows and AI based solutions to help businesses automate repetitive tasks, saving time and reducing costs while driving efficiency and growth.",
      icon: Bot
    },
    {
      title: "Web Development Services",
      description: "Our Expert Team build fast, secure, and scalable websites and web applications with a security-first mindset, ensuring your digital presence is both powerful and protected.",
      icon: Globe
    }
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 border-2 border-cyan-500 rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center text-cyan-500 font-bold text-xl">
                  T
                </div>
              </div>
              <span className="text-xl font-bold">Tensor Security Academy</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-cyan-500 transition">Home</button>
              <button onClick={() => scrollToSection('courses')} className="hover:text-cyan-500 transition">Courses</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-cyan-500 transition">Services</button>
              <GradientButton onClick={() => scrollToSection('contact')}>
                Contact
              </GradientButton>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-cyan-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-t border-cyan-500/20"
          >
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 hover:text-cyan-500 transition">Home</button>
              <button onClick={() => scrollToSection('courses')} className="block w-full text-left py-2 hover:text-cyan-500 transition">Courses</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 hover:text-cyan-500 transition">Services</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 hover:text-cyan-500 transition">Contact</button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-900/20 via-black to-purple-900/20" />
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Forge Your Future in Tech Security & AI
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
          >
            Go from curious to career-ready, and from theory to execution. Tensor Security Academy provides elite, personalized training to master the most in-demand skills of tomorrow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GradientButton onClick={() => scrollToSection('courses')} large>
              Explore Our Courses <ArrowRight className="ml-2" size={20} />
            </GradientButton>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
          >
            {[
              { icon: Users, text: "1-on-1 Mentorship" },
              { icon: Zap, text: "Live Training" },
              { icon: CheckCircle, text: "Career Guidance" },
              { icon: Shield, text: "Certification Support" }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 p-4">
                <feature.icon className="text-cyan-500" size={32} />
                <p className="text-sm text-gray-400">{feature.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Master Your Craft with Expert-Led Training
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our courses aren't just pre-recorded videos. They are immersive, live, and interactive learning experiences designed for one thing: <span className="text-cyan-500 font-semibold">your success.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              A Message from the Founder
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-cyan-500/30">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 rounded-full bg-linear-to-br from-cyan-500 to-purple-500 p-1 shrink-0">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-6xl font-bold text-cyan-500">
                    AJ
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    "At Tensor Security Academy, we believe that the best way to learn is through direct, personalized guidance. The tech landscape is evolving fast, and generic tutorials won't cut it. That's why every one of our programs is built around a core principle: <span className="text-cyan-500 font-semibold">one-on-one live training with expert mentors</span>, so you learn exactly what you need without the long trial-and-error time-wasting loop most people get stuck in.
                  </p>
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    Our mentors are seasoned industry professionals who are not just teachers, but practitioners. They provide real-time feedback, career advice, and the nuanced understanding you can only get from someone who's been in the trenches. Your success is our mission."
                  </p>
                  <p className="text-xl font-bold text-cyan-500 mb-6">
                    — Abrar Jahin Sachcha, Founder of Tensor Security Academy
                  </p>
                  <GradientButton>
                    <Linkedin className="mr-2" size={20} />
                    Connect on LinkedIn
                  </GradientButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Professional Cybersecurity & Tech Solutions
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Beyond training the next generation of experts, we partner with businesses to fortify their digital assets and drive innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <GradientButton large>
              Get a Free Consultation
            </GradientButton>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Transform Your Skills or Secure Your Business?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Let's start a conversation. Reach out to us directly on WhatsApp for instant answers to your questions about courses or services.
            </p>
            <GradientButton large>
              <MessageCircle className="mr-2" size={24} />
              Message Us on WhatsApp
            </GradientButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2025 Tensor Security Academy. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TensorSecurityAcademy;