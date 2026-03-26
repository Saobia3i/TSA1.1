"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  Clock,
  BarChart,
  CheckCircle,
  Star,
  Users,
  BookOpen,
} from "lucide-react";
import type { Course } from "../data/courses";
import EnrollmentForm from "@/components/forms/Enrollment";

interface CourseDetailsModalProps {
  course: Course;
  onClose: () => void;
  initialShowEnrollment?: boolean;
}

export default memo(function CourseDetailsModal({
  course,
  onClose,
  initialShowEnrollment = false,
}: CourseDetailsModalProps) {
  const Icon = course.icon;
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [showEnrollment, setShowEnrollment] = useState(initialShowEnrollment);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const isEnrollmentView = enrollmentSuccess || showEnrollment || initialShowEnrollment;

  const whatsappUrl = `https://wa.me/8801871719419?text=${encodeURIComponent(
    `Hello, I want faster enrollment support for ${course.title}.`
  )}`;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(10px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        overflowY: "auto",
        
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 900,
          width: "100%",
          maxHeight: "90vh",
          backgroundColor: "rgba(17,24,39,0.95)",
          color: "white",
          borderRadius: 5,
          border: `2px solid ${course.color}60`,
          boxShadow: `0 0 80px ${course.color}60`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          //zIndex: 99999,
        }}
      >
        {/* Close */}
        <motion.button
          type="button"
          aria-label="Close course details"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            background: `${course.color}30`,
            border: `2px solid ${course.color}60`,
            borderRadius: "50%",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: course.color,
            zIndex: 3,
          }}
        >
          <X />
        </motion.button>

        {/* Scrollable Content - FIXED SCROLLBAR */}
        <div
          className="scrollContainer"
          style={{
            padding: 40,
            overflowY: "auto",
            paddingBottom: 140,
            scrollbarWidth: "thin", // Firefox
            scrollbarColor: "rgba(34, 197, 94, 0.5) transparent", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
        >
          <AnimatePresence mode="wait">
            {!showCurriculum ? (
              <motion.div
                key="details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {isEnrollmentView ? (
                  <EnrollmentForm
                    courseId={course.id}
                    courseSlug={course.slug}
                    courseName={course.title}
                    courseDescription={course.shortDescription}
                    onSuccessChange={setEnrollmentSuccess}
                  />
                ) : (
                  <>
                {/* Icon */}
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 16,
                    background: `linear-gradient(${course.color}40, ${course.color}20)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                  }}
                >
                  <Icon size={36} color={course.color} />
                </div>

                {/* Badge */}
                {course.badge && (
                  <span
                    style={{
                      display: "inline-block",
                      padding: "6px 16px",
                      background: `${course.color}30`,
                      border: `1px solid ${course.color}60`,
                      borderRadius: 20,
                      fontSize: 12,
                      color: course.color,
                      fontWeight: 700,
                      marginBottom: 16,
                      fontFamily: "var(--font-nunito)",
                    }}
                  >
                    {course.badge}
                  </span>
                )}

                {/* Title */}
                <h2
                  id="course-title"
                  style={{
                    fontSize: "clamp(24px, 4vw, 36px)",
                    fontWeight: 800,
                    color: "white",
                    marginBottom: 16,
                    fontFamily: "var(--font-nunito)",
                  }}
                >
                  {course.title}
                </h2>

                {/* Stats */}
                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    flexWrap: "wrap",
                    marginBottom: 20,
                  }}
                >
                  {course.rating && (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <Star size={18} color="#fbbf24" fill="#fbbf24" />
                      <span style={{ color: "#d1d5db" }}>
                        {course.rating} Rating
                      </span>
                    </div>
                  )}
                  {course.students && (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <Users size={18} color={course.color} />
                      <span style={{ color: "#d1d5db" }}>
                        {course.students.toLocaleString()} Students
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "#d1d5db",
                    lineHeight: 1.8,
                    marginBottom: 24,
                  }}
                >
                  {course.description}
                </p>

                {/* Meta */}
                <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
                  <Clock size={20} color={course.color} />
                  <span>{course.duration}</span>
                  <BarChart size={20} color={course.color} />
                  <span>{course.level}</span>
                </div>

                {/* Topics */}
                <h3 style={{ color: "white", marginBottom: 20 }}>
                  What You&apos;ll Learn
                </h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {course.topics.map((topic, i) => (
                    <li
                      key={i}
                      style={{ display: "flex", gap: 12, marginBottom: 12 }}
                    >
                      <CheckCircle size={20} color={course.color} />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="curriculum"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 style={{ fontSize: 24, marginBottom: 24, color: "white" }}>
                  Full Curriculum
                </h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {course.curriculum.map(
                    (
                      item,
                      i // ✅ FIXED: course.curriculum
                    ) => (
                      <li key={i} style={{ paddingLeft: 28, marginBottom: 14 }}>
                        {/* <CheckCircle size={18} color={course.color} /> */}
                        <span style={{ color: "#ffff" }}>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Bar */}
        {!enrollmentSuccess ? (
          <div
            className="modal-footer"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            }}
          >
            <motion.button
              type="button"
              className="footer-button footer-button-secondary"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setShowEnrollment(false);
                setEnrollmentSuccess(false);
                setShowCurriculum((v) => !v);
              }}
              style={{
                borderColor: `${course.color}90`,
                width: "100%",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <BookOpen size={18} />
                {showCurriculum ? "What You'll Learn" : "View Curriculum"}
              </span>
            </motion.button>
            <motion.button
              type="button"
              className="footer-button footer-button-primary"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setShowEnrollment(true);
                setEnrollmentSuccess(false);
                setShowCurriculum(false);
              }}
              style={{
                borderColor: `${course.color}80`,
                background: `linear-gradient(${course.color}, ${course.color}50)`,
                width: "100%",
              }}
            >
              Enroll Now
            </motion.button>
          </div>
        ) : (
          <div
            className="modal-footer"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
            }}
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              className="footer-button footer-button-whatsapp"
              onClick={() => window.open(whatsappUrl, "_blank", "noopener,noreferrer")}
              style={{
                width: "100%",
                borderColor: "#25d366",
                background: "linear-gradient(135deg, #25d366, #1ebe5b)",
                minHeight: "72px",
                padding: "20px 28px",
                fontSize: "16px",
                boxShadow: "0 16px 34px rgba(37, 211, 102, 0.28)",
                color: "#ffffff",
              }}
            >
              For faster enrollment contact us via WhatsApp
            </motion.button>
          </div>
        )}
        <style jsx>{`
          .modal-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 24px 40px;
            gap: 16px;
            background: linear-gradient(to top, rgba(17, 24, 39, 0.98) 0%, rgba(17, 24, 39, 0.95) 50%, transparent 100%);
            z-index: 2;
            box-sizing: border-box;
            width: 100%;
          }

          .footer-button {
            min-height: 64px;
            padding: 18px 24px;
            border-radius: 12px;
            border: 2px solid transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            color: white;
            font-weight: 700;
            font-size: 15px;
            font-family: var(--font-nunito);
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            line-height: 1.4;
            transition: all 0.3s ease;
            box-sizing: border-box;
            white-space: normal;
            word-break: normal;
            overflow-wrap: anywhere;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 0;
          }

          .footer-button-secondary {
            background: #000000;
            color: white;
          }

          .footer-button-secondary:hover {
            background: #050505;
          }

          .footer-button-primary {
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
            color: white;
          }

          .footer-button-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
          }

          .footer-button-whatsapp {
            color: #ffffff;
          }

          @media (max-width: 768px) {
            .modal-footer {
              padding: 20px 24px;
              gap: 14px;
            }

            .footer-button {
              min-height: 58px;
              padding: 16px 20px;
              font-size: 14px;
            }

            .footer-button-whatsapp {
              min-height: 66px;
              padding: 18px 22px;
              font-size: 15px;
            }
          }

          @media (max-width: 560px) {
            .modal-footer {
              padding: 16px 18px;
              gap: 10px;
            }

            .footer-button {
              min-height: 52px;
              padding: 12px 14px;
              font-size: 13px;
            }

            .footer-button-whatsapp {
              min-height: 60px;
              padding: 16px 18px;
              font-size: 14px;
            }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
});


