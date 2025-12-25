// app/(marketing)/about/join/page.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import {
  AcademicCapIcon,
  UserGroupIcon,
  SparklesIcon,
  RocketLaunchIcon,
  TrophyIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";
import CSSAuroraBackground from "@/components/backgrounds/CSSAuroraBackground";
import styles from "../page.module.css";

export default function JoinPage() {
  return (
    <CSSAuroraBackground intensity="low">
      <div className={styles.pageWrapper}>
        {/* BACK BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.backButtonContainer}
        >
          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className={styles.backButton}
            >
              <ArrowLeft style={{ width: "18px", height: "18px" }} />
              Back to About
            </motion.button>
          </Link>
        </motion.div>

        {/* JOIN MOVEMENT SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={styles.joinMovementSection}
        >
          <div className={styles.joinMovementHeader}>
            <h1 className={styles.joinMovementTitle}>Join the Movement</h1>
            <p className={styles.joinMovementDescription}>
              Be more than a participant. Become a catalyst for change. Help us
              bridge exceptional tech talent to the global stage while building
              your own success.
            </p>
          </div>

          <div className={styles.opportunityGrid}>
            {/* CAMPUS AMBASSADOR */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={styles.opportunityCard}
            >
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className={`${styles.opportunityGlow} ${styles.opportunityGlowLeft}`}
              />

              <div className={styles.opportunityContent}>
                <div
                  className={`${styles.opportunityIcon} ${styles.opportunityIconCyan}`}
                >
                  <AcademicCapIcon
                    style={{ width: "44px", height: "44px", color: "#00d4ff" }}
                  />
                </div>

                <h2 className={styles.opportunityTitle}>Campus Ambassador</h2>
                <p
                  className={`${styles.opportunitySubtitle} ${styles.opportunitySubtitleCyan}`}
                >
                  Lead the Revolution on Your Campus
                </p>

                <p className={styles.opportunityDescription}>
                  Transform your campus into a launchpad for global tech
                  careers. As a TSA Campus Ambassador, you're not just promoting
                  a program you're opening doors that will change lives.
                </p>

                <h3 className={styles.opportunityBenefitsTitle}>
                  What You Gain:
                </h3>
                <ul className={styles.opportunityList}>
                  <li className={styles.opportunityListItem}>
                    <CheckCircle className={styles.opportunityBulletCyan} />
                    Earn competitive commissions for every enrollment
                  </li>
                  <li className={styles.opportunityListItem}>
                    <CheckCircle className={styles.opportunityBulletCyan} />
                    Free access to premium TSA courses and resources
                  </li>
                  <li className={styles.opportunityListItem}>
                    <CheckCircle className={styles.opportunityBulletCyan} />
                    Build leadership and marketing skills that set you apart
                  </li>
                  <li className={styles.opportunityListItem}>
                    <CheckCircle className={styles.opportunityBulletCyan} />
                    Direct mentorship from TSA leadership
                  </li>
                  <li className={styles.opportunityListItem}>
                    <CheckCircle className={styles.opportunityBulletCyan} />
                    Recognition, bonuses, and long-term career opportunities
                  </li>
                  <li className={styles.opportunityListItem}>
                    <CheckCircle className={styles.opportunityBulletCyan} />
                    Be the voice that inspires real transformation on your
                    campus
                  </li>
                </ul>

                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSf72LAUaDzn76H_xEWe796HtK0wasYrhlvZrJlrQSbtKm8X3A/viewform?usp=dialog">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 15px 40px rgba(0, 212, 255, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`${styles.opportunityButton} ${styles.opportunityButtonCyan}`}
                  >
                    Apply Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* AFFILIATE PARTNER */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={styles.opportunityCard}
            >
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className={`${styles.opportunityGlow} ${styles.opportunityGlowRight}`}
              />

              <div className={styles.opportunityContent}>
                <div
                  className={`${styles.opportunityIcon} ${styles.opportunityIconPurple}`}
                >
                  <UserGroupIcon
                    style={{ width: "44px", height: "44px", color: "#7c3aed" }}
                  />
                </div>

                <h2 className={styles.opportunityTitle}>Affiliate Partner</h2>
                <p
                  className={`${styles.opportunitySubtitle} ${styles.opportunitySubtitlePurple}`}
                >
                  Turn Your Influence Into Impact
                </p>

                <p className={styles.opportunityDescription}>
                  Have an audience? A platform? A community that values growth?
                  Partner with TSA and earn while empowering others to break
                  barriers and reach their potential.
                </p>

                <h3 className={styles.opportunityBenefitsTitle}>
                  What You Gain:
                </h3>
                
                <ul className={styles.opportunityList}>
                  <li className={styles.opportunityListItem}>
                    <CheckCircle className={styles.opportunityBulletPurple} />
                    Lucrative commissions with recurring revenue potential
                  </li>
                  <li className={styles.opportunityListItem}>
                    <CheckCircle className={styles.opportunityBulletPurple} />
                    Professional marketing materials ready to use
                  </li>
                  <li className={styles.opportunityListItem}>
                    <CheckCircle className={styles.opportunityBulletPurple} />
                    Real-time dashboard to track your success
                  </li>
                  <li className={styles.opportunityListItem}>
                    <CheckCircle className={styles.opportunityBulletPurple} />
                    Dedicated support team invested in your growth
                  </li>
                  <li className={styles.opportunityListItem}>
                    <CheckCircle className={styles.opportunityBulletPurple} />
                    Promote education that genuinely transforms lives
                  </li>
                  <li className={styles.opportunityListItem}>
                    <CheckCircle className={styles.opportunityBulletPurple} />
                    Be part of democratizing elite tech education worldwide
                  </li>
                </ul>

                <Link href="https://docs.google.com/forms/d/e/1FAIpQLScGk1YoPIxqv8NTSyw7PIfboCRvARfluca0zTqPycHqX1cGIQ/viewform">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 15px 40px rgba(124, 58, 237, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`${styles.opportunityButton} ${styles.opportunityButtonPurple}`}
                  >
                    Join as Affiliate
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </CSSAuroraBackground>
  );
}
