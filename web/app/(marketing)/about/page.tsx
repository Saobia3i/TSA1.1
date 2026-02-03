'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Handshake } from 'lucide-react';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Link from 'next/link';
import {
  UserGroupIcon,

  AcademicCapIcon,
  BoltIcon,
  RocketLaunchIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

import styles from './page.module.css';

const PROBLEMS = [
  {
    title: 'Guidance Gap',
    description: 'Endless YouTube tutorials and generic blog posts created noise, not clarity. Aspiring professionals were drowning in surface-level content with no roadmap, no structure, and no one to turn to when they hit a wall.',
  },
  {
    title: 'AI Disruption',
    description: 'The cybersecurity landscape was evolving at breakneck speed. Skills that landed jobs last year were becoming obsolete. Traditional education couldn\'t keep pace, leaving students trained for yesterday\'s threats while tomorrow\'s challenges loomed.',
  },
  {
    title: 'Access Barrier',
    description: 'Elite training programs in the US, UK, and developed nations carried price tags that locked out talented individuals worldwide. Geographic location and financial circumstances were determining who could access world-class education, not potential or drive.',
  },
];

const DIFFERENCES = [
  {
    title: 'A Mentor-Led Journey',
    description: 'Forget the isolation of solo learning. Imagine having seasoned cybersecurity professionals in your corner. Experts who\'ve walked the path you\'re on, who answer your questions in real-time, and who guide you past the pitfalls that derail most beginners.',
    icon: AcademicCapIcon,
  },
  {
    title: 'Live, Interactive Training',
    description: 'Here\'s what most courses won\'t tell you: watching videos doesn\'t make you job ready. Employers need people who can perform under pressure. That\'s why every session is live and interactive. You\'ll engage with real tools, tackle real challenges, and build muscle memory that sticks.',
    icon: BoltIcon,
  },
  {
    title: 'Real-World Projects & Industry Insight',
    description: 'Anyone can teach theory. We teach you to think like a cybersecurity professional. You\'ll work on actual industry scenarios, understand the "why" behind every technique, and develop the practical judgment that separates those with certificates from those with careers. When you finish, you won\'t just know cybersecurity. You\'ll BE a cybersecurity professional.',
    icon: RocketLaunchIcon,
  },
  {
    title: 'Radical Affordability',
    description: 'On-demand education in the latest technologies shouldn\'t come with a crippling price tag. We\'ve shattered that barrier. You\'ll get the same world-class instruction, mentorship, and career transformation at a fraction of traditional costs accessible to international students everywhere. Because your ambition shouldn\'t be limited by your budget.',
    icon: CurrencyDollarIcon,
  },
];

export default function AboutPage() {
  return (
    <div className={ styles.pageBackground }>
      <div className={ styles.pageWrapper }>
        {/* BACK BUTTON */ }
        <motion.div
          initial={ { opacity: 0, y: -20 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { duration: 0.3 } }
          className={ styles.backButtonContainer }
        >
          <Link href="/">
            <motion.button
              whileHover={ { scale: 1.05, x: -5 } }
              whileTap={ { scale: 0.95 } }
              className={ styles.backButton }
            >
              <ArrowLeft className={ styles.backButtonIcon } />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>

        {/* HERO */ }
        <motion.div
          initial={ { opacity: 0 } }
          animate={ { opacity: 1 } }
          transition={ { duration: 0.5 } }
          className={ styles.heroSection }
        >
          <motion.h1
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.5, delay: 0.1 } }
            className={ styles.heroTitle }
          >
            About Our Journey
          </motion.h1>
          <motion.p
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.5, delay: 0.2 } }
            className={ styles.heroSubtitle }
          >
            Democratizing cybersecurity education globally. Bridging exceptional talent with world-class training.
          </motion.p>

          {/* Quick Nav */ }
          <motion.div
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.5, delay: 0.3 } }
            className={ styles.quickNavContainer }
          >
            <Link href="/about/team">
              <motion.button
                whileHover={ { scale: 1.05, y: -3 } }
                whileTap={ { scale: 0.95 } }
                className={ styles.quickNavButton }
              >
                <UserGroupIcon className={ styles.navIcon } />
                Our Team
              </motion.button>
            </Link>
            <Link href="/about/join">
              <motion.button
                whileHover={ { scale: 1.05, y: -3 } }
                whileTap={ { scale: 0.95 } }

                className={ `${ styles.quickNavButton } ${ styles.quickNavButtonAlt }` }
              >
                <Handshake className={ styles.navIcon } />
                Join Us
              </motion.button>
            </Link>
            <Link href="/news">
              <motion.button
                whileHover={ { scale: 1.05, y: -3 } }
                whileTap={ { scale: 0.95 } }
                className={ styles.quickNavButton }
              >
                <NewspaperIcon className={ styles.navIcon } />
                News
              </motion.button>
            </Link>

          </motion.div>

        </motion.div>

        {/* PROBLEMS SECTION */ }
        <motion.section
          initial={ { opacity: 0 } }
          whileInView={ { opacity: 1 } }
          viewport={ { once: true, margin: "-100px" } }
          transition={ { duration: 0.5 } }
          className={ styles.section }
        >
          <div className={ styles.sectionHeader }>
            <h2 className={ styles.sectionTitle }>The Problem We Exist to Solve</h2>
            <p className={ styles.sectionDescription }>
              Tensor Security Academy wasn&apos;t built to chase EdTech market trends, it was born from lived experience. Founder Abrar Jahin launched TSA during his university days, driven by a clear vision: to solve three critical problems he had personally encountered in his early career. Instead of accepting these barriers, he founded TSA with a vision to eliminate them for the next generation of security professionals.
            </p>
          </div>

          <div className={ styles.roadmapContainer }>
            <div className={ styles.roadmapLine } />
            { PROBLEMS.map((problem, index) => (
              <motion.div
                key={ problem.title }
                initial={ { opacity: 0, x: 50 } }
                whileInView={ { opacity: 1, x: 0 } }
                viewport={ { once: true, margin: "-50px" } }
                transition={ { duration: 0.5, delay: index * 0.1 } }
                className={ styles.roadmapItem }
              >
                <div className={ styles.roadmapDot } />
                <motion.div
                  whileHover={ { y: -8 } }
                  className={ styles.card }
                >
                  <h3 className={ styles.cardTitle }>&quot;{ problem.title }&quot;</h3>
                  <p className={ styles.cardDescription }>{ problem.description }</p>
                </motion.div>
              </motion.div>
            )) }
          </div>

          <motion.div
            initial={ { opacity: 0, y: 30 } }
            whileInView={ { opacity: 1, y: 0 } }
            viewport={ { once: true } }
            transition={ { duration: 0.5 } }
            className={ styles.conclusionCard }
          >
            <p className={ styles.conclusionText }>
              The conclusion was inescapable: <span className={ styles.highlightCyan }>passive learning doesn&apos;t build cybersecurity careers</span>. Certificates without capability won&apos;t get you hired. And going it alone? That&apos;s the slowest, most frustrating path possible—one that causes most aspiring professionals to give up before they ever break through.
            </p>
          </motion.div>
        </motion.section>

        {/* DIFFERENCES SECTION */ }
        <motion.section
          initial={ { opacity: 0 } }
          whileInView={ { opacity: 1 } }
          viewport={ { once: true, margin: "-100px" } }
          transition={ { duration: 0.5 } }
          className={ styles.sectionLarge }
        >
          <div className={ styles.sectionHeader }>
            <h2 className={ styles.sectionTitleGradient }>What Makes Us Different</h2>
            <p className={ styles.sectionSubtitle }>And Why It Matters to Your Career</p>
          </div>

          <div className={ styles.premiumRoadmapContainer }>
            <div className={ `${ styles.centralLine } desktop-only-line` } />

            { DIFFERENCES.map((diff, index) => {
              const isLeft = index % 2 === 0;
              const IconComponent = diff.icon;

              return (
                <motion.div
                  key={ diff.title }
                  initial={ { opacity: 0, x: isLeft ? -80 : 80 } }
                  whileInView={ { opacity: 1, x: 0 } }
                  viewport={ { once: true, margin: "-50px" } }
                  transition={ { duration: 0.5, delay: index * 0.1 } }
                  className={ `${ styles.roadmapItemWrapper } ${ isLeft ? styles.roadmapItemLeft : styles.roadmapItemRight }` }
                >
                  <div className={ `${ styles.centralDot } desktop-only-dot` } />

                  <motion.div
                    whileHover={ { scale: 1.03, y: -8 } }
                    className={ styles.premiumCard }
                  >
                    <div className={ `${ styles.compactIconBadge } ${ isLeft ? styles.compactIconBadgeLeft : styles.compactIconBadgeRight }` }>
                      <IconComponent className={ styles.compactHeroIcon } />
                    </div>
                    <h3 className={ styles.premiumCardTitle }>{ diff.title }</h3>
                    <p className={ styles.premiumCardDescription }>{ diff.description }</p>
                  </motion.div>
                </motion.div>
              );
            }) }
          </div>

          {/* CLOSING STATEMENT */ }
          <motion.div
            initial={ { opacity: 0, scale: 0.95 } }
            whileInView={ { opacity: 1, scale: 1 } }
            viewport={ { once: true } }
            transition={ { duration: 0.5 } }
            className={ styles.closingStatement }
          >
            <p className={ styles.closingStatementText }>
              This approach works. The model was validated. The impact was undeniable. What began as Abrar&apos;s vision in Bangladesh has now expanded to{ ' ' }
              <span className={ styles.highlightGradient }>
                United States of America
              </span>, where TSA is actively training students and career shifters across America, equipping them with the hands-on skills and mentorship needed to launch successful cybersecurity careers. With ambitious plans to bring this transformative approach to the UK, Australia, Canada, and other English-speaking countries. This isn&apos;t just growth—it&apos;s a mission to democratize cybersecurity education on a global scale.
            </p>
          </motion.div>
        </motion.section>

        {/* WHY TSA SECTION */ }
        <motion.section
          initial={ { opacity: 0 } }
          whileInView={ { opacity: 1 } }
          viewport={ { once: true, margin: "-100px" } }
          transition={ { duration: 0.5 } }
          className={ styles.section }
        >
          <motion.div
            whileHover={ { scale: 1.01 } }
            className={ styles.whyTsaCard }
          >
            <h2 className={ styles.whyTsaTitle }>Why TSA Is More Than an Academy</h2>
            <p className={ styles.whyTsaText }>
              TSA decentralizes knowledge. We&apos;re the bridge that elevates Bangladesh and South Asia&apos;s extraordinary, untapped tech talent onto the international stage at scale with the Western world&apos;s need for affordable, expert-led training. For too long, world-class cybersecurity and tech knowledge has been locked behind six-figure tuitions and geographic barriers. <span className={ styles.whyTsaHighlight }>We&apos;re shattering those walls.</span>
            </p>
            <p className={ styles.whyTsaText }>
              TSA is a revolutionary platform where brilliance meets opportunity, regardless of borders. Western students get expert training without crushing debt. Our professionals get global recognition without artificial barriers. Everyone wins when knowledge flows freely.
            </p>
            <p className={ styles.whyTsaTextAlt }>
              This is more than a platform. This is how we prove that genius knows no geography. Your breakthrough becomes our shared legacy. Your excellence becomes our collective proof to the world, where Bangladesh&apos;s tech excellence becomes impossible to ignore.
            </p>
          </motion.div>


        </motion.section>
      </div>
    </div>
  );
}
