"use client";

import { motion } from "framer-motion";
import { ExternalLink, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTestimonials, type Testimonial } from "@/features/home/data/testimonials";
import styles from "./TestimonialsPreview.module.css";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function TestimonialCard({
  testimonial,
  isExpanded,
  onHoverChange,
  onToggleExpand,
  onTouchPauseChange,
}: {
  testimonial: Testimonial;
  isExpanded: boolean;
  onHoverChange: (isHovering: boolean) => void;
  onToggleExpand: () => void;
  onTouchPauseChange: (isTouching: boolean) => void;
}) {
  return (
    <article
      className={`${styles.card} ${isExpanded ? styles.expandedCard : ""}`}
      aria-expanded={isExpanded}
      onClick={() => {
        onToggleExpand();
      }}
      onKeyDown={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggleExpand();
        }
      }}
      role="button"
      tabIndex={0}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          onHoverChange(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          onHoverChange(false);
        }
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse") {
          onTouchPauseChange(true);
        }
      }}
      onPointerUp={(event) => {
        if (event.pointerType !== "mouse") {
          onTouchPauseChange(false);
        }
      }}
      onPointerCancel={(event) => {
        if (event.pointerType !== "mouse") {
          onTouchPauseChange(false);
        }
      }}
    >
      <div className={styles.cardShine} />
      <Quote className={styles.quoteIcon} aria-hidden="true" />

      <div className={styles.cardHeader}>
        <div className={styles.avatar}>
          {testimonial.image ? (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              sizes="56px"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span>{getInitials(testimonial.name)}</span>
          )}
        </div>

        <div className={styles.person}>
          <h3>{testimonial.name}</h3>
          {testimonial.position ? <p>{testimonial.position}</p> : null}
        </div>
      </div>

      <p className={styles.review}>{testimonial.review}</p>

      <div className={styles.cardFooter}>
        {testimonial.postLink ? (
          <Link
            href={testimonial.postLink}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open ${testimonial.name}'s testimonial post`}
            onClick={(event) => {
              event.stopPropagation();
              onTouchPauseChange(false);
            }}
          >
            <span>View post</span>
            <ExternalLink aria-hidden="true" />
          </Link>
        ) : (
          <span>Verified experience</span>
        )}
      </div>
    </article>
  );
}

export default function TestimonialsPreview() {
  const [reviews, setReviews] = useState<Testimonial[]>(() => getTestimonials());
  const [expandedTestimonialIds, setExpandedTestimonialIds] = useState<Set<string>>(() => new Set());
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isTouchPaused, setIsTouchPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/testimonials")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { testimonials?: Testimonial[] } | null) => {
        if (isMounted && data?.testimonials?.length) {
          setReviews(data.testimonials);
        }
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, []);

  const midpoint = Math.ceil(reviews.length / 2);
  const upperRowReviews = reviews.slice(0, midpoint);
  const lowerRowReviews = reviews.slice(midpoint);
  const isPaused = expandedTestimonialIds.size > 0 || isHoverPaused || isTouchPaused;

  if (reviews.length === 0) {
    return null;
  }

  const toggleExpanded = (testimonialId: string) => {
    setExpandedTestimonialIds((current) => {
      const next = new Set(current);

      if (next.has(testimonialId)) {
        next.delete(testimonialId);
      } else {
        next.add(testimonialId);
      }

      return next;
    });
  };

  return (
    <section
      className={`${styles.preview} ${isPaused ? styles.paused : ""}`}
      aria-label="What people say about us"
    >
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>What People Say About Us</h2>
            <p className={styles.subtitle}>
              Student reviews, professional perspectives, and community feedback on our work.
            </p>
          </div>
        </motion.div>

        <div className={styles.gridWrap}>
          <div className={styles.lane}>
            <div className={`${styles.track} ${styles.trackUpper}`}>
              {[...upperRowReviews, ...upperRowReviews].map((testimonial, index) => (
                <TestimonialCard
                  key={`upper-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  isExpanded={expandedTestimonialIds.has(testimonial.id)}
                  onHoverChange={setIsHoverPaused}
                  onToggleExpand={() => toggleExpanded(testimonial.id)}
                  onTouchPauseChange={setIsTouchPaused}
                />
              ))}
            </div>
          </div>

          {lowerRowReviews.length > 0 ? (
            <div className={styles.lane}>
              <div className={`${styles.track} ${styles.trackLower}`}>
                {[...lowerRowReviews, ...lowerRowReviews].map((testimonial, index) => (
                  <TestimonialCard
                    key={`lower-${testimonial.id}-${index}`}
                    testimonial={testimonial}
                    isExpanded={expandedTestimonialIds.has(testimonial.id)}
                    onHoverChange={setIsHoverPaused}
                    onToggleExpand={() => toggleExpanded(testimonial.id)}
                    onTouchPauseChange={setIsTouchPaused}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
