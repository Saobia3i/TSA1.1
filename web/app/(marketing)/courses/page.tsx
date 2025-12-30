"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import Link from "next/link";
import { getAllCourses, type Course } from "@/features/courses/data/courses";
import CourseCard from "@/features/courses/components/CourseCard";
import CourseDetailsModal from "@/features/courses/components/CourseDetailsModal";
//import { Metadata } from 'next'
const ITEMS_PER_PAGE = 6;
// export const metadata: Metadata = {
//   title: 'Courses - Tensor Security Academy',
//   description: 'Explore our comprehensive cybersecurity courses including ethical hacking, penetration testing, blockchain security, and more.',
//   openGraph: {
//     title: 'Cybersecurity Courses - Tensor Security Academy',
//     description: 'Comprehensive cybersecurity training courses for beginners to advanced professionals.',
//     images: ['/og-image.png'],
//   },
// }
export default function CoursesPage() {
  const allCourses = getAllCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = allCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedCourses = filteredCourses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      <div
        style={{ minHeight: "100vh", paddingTop: "90px", overflowX: "hidden" }}
      >
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 24px" }}
        >
          {/* Back Button */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(17, 24, 39, 0.7)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "10px",
                padding: "10px 20px",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: "40px",
                fontFamily: "var(--font-nunito)",
              }}
            >
              <ArrowLeft style={{ width: "18px", height: "18px" }} />
              Back to Home
            </motion.button>
          </Link>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                background: "linear-gradient(to right, #22d3ee, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
                fontFamily: "var(--font-nunito)",
              }}
            >
              Our Courses
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "#9ca3af",
                maxWidth: "700px",
                margin: "0 auto",
                fontFamily: "var(--font-nunito)",
              }}
            >
              Master cybersecurity with expert-led live training programs
            </p>
          </div>

         <div style={{ textAlign: "center", marginBottom: "30px" }}>
  <motion.a
    href="https://drive.google.com/file/d/1-0_F78lIVtdHOJfKU18fzZEUAXFFVdth/view?usp=sharing" // Corrected the link
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)' }}
    whileTap={{ scale: 0.95 }}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 28px",
      fontSize: "16px",
      fontWeight: 700,
      borderRadius: "12px",
      background: "linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(168, 85, 247, 0.15))",
      border: "2px solid rgba(34, 211, 238, 0.4)",
      color: "white",
      cursor: "pointer",
      fontFamily: "var(--font-nunito)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 25px rgba(34, 211, 238, 0.3)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }}
  >
    TSA Whitepaper
    <Download style={{ width: "18px", height: "18px" }} />
  </motion.a>
</div>


          {/* Search Bar */}
          <div style={{ maxWidth: "600px", margin: "0 auto 50px" }}>
            <div
              style={{
                position: "relative",
                backgroundColor: "rgba(17, 24, 39, 0.7)",
                borderRadius: "12px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                overflow: "hidden",
              }}
            >
              <Search
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "20px",
                  height: "20px",
                  color: "#22d3ee",
                }}
              />
              <input
                type="text"
                placeholder="Search courses by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 48px",
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "15px",
                  outline: "none",
                  fontFamily: "var(--font-nunito)",
                }}
              />
            </div>
            {searchQuery && (
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  color: "#9ca3af",
                  textAlign: "center",
                  fontFamily: "var(--font-nunito)",
                }}
              >
                Found {filteredCourses.length} course
                {filteredCourses.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Courses Grid */}
          {displayedCourses.length > 0 ? (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "24px",
                  marginBottom: "50px",
                }}
              >
                {displayedCourses.map((course, index) => (
                  <CourseCard
                    key={course.slug}
                    course={course}
                    index={index}
                    onClick={() => setSelectedCourse(course)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "2px solid rgba(255, 255, 255, 0.6)",
                      background:
                        currentPage === 1
                          ? "rgba(17, 24, 39, 0.5)"
                          : "rgba(17, 24, 39, 0.7)",
                      color: currentPage === 1 ? "#6b7280" : "white",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ChevronLeft style={{ width: "20px", height: "20px" }} />
                  </motion.button>

                  <span
                    style={{
                      fontSize: "14px",
                      color: "#9ca3af",
                      fontFamily: "var(--font-nunito)",
                    }}
                  >
                    Page {currentPage} of {totalPages}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "2px solid rgba(255, 255, 255, 0.6)",
                      background:
                        currentPage === totalPages
                          ? "rgba(17, 24, 39, 0.5)"
                          : "rgba(17, 24, 39, 0.7)",
                      color: currentPage === totalPages ? "#6b7280" : "white",
                      cursor:
                        currentPage === totalPages ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ChevronRight style={{ width: "20px", height: "20px" }} />
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p
                style={{
                  fontSize: "18px",
                  color: "#9ca3af",
                  fontFamily: "var(--font-nunito)",
                }}
              >
                No courses found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseDetailsModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
