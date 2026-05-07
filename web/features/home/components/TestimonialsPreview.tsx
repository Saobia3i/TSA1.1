"use client";

import { motion } from "framer-motion";
import { ExternalLink, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getTestimonials, type Testimonial } from "@/features/home/data/testimonials";

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
  onHoverChange,
  onTogglePause,
  onTouchPauseChange,
}: {
  testimonial: Testimonial;
  onHoverChange: (isHovering: boolean) => void;
  onTogglePause: () => void;
  onTouchPauseChange: (isTouching: boolean) => void;
}) {
  return (
    <article
      className="testimonial-card"
      onClick={(event) => {
        if ("pointerType" in event.nativeEvent && event.nativeEvent.pointerType !== "mouse") {
          return;
        }
        onTogglePause();
      }}
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
      <div className="testimonial-card-shine" />
      <div className="testimonial-card-header">
        <div className="testimonial-avatar">
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

        <div className="testimonial-person">
          <h3>{testimonial.name}</h3>
          {testimonial.position ? <p>{testimonial.position}</p> : null}
        </div>

        <Quote className="testimonial-quote-icon" aria-hidden="true" />
      </div>

      <p className="testimonial-review">{testimonial.review}</p>

      <div className="testimonial-card-footer">
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
  const reviews = useMemo(() => getTestimonials(), []);
  const [isClickPaused, setIsClickPaused] = useState(false);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isTouchPaused, setIsTouchPaused] = useState(false);

  const midpoint = Math.ceil(reviews.length / 2);
  const upperRowReviews = reviews.slice(0, midpoint);
  const lowerRowReviews = reviews.slice(midpoint);
  const isPaused = isClickPaused || isHoverPaused || isTouchPaused;

  if (reviews.length === 0) {
    return null;
  }

  const togglePause = () => setIsClickPaused((current) => !current);

  return (
    <section
      className={`testimonials-preview ${isPaused ? "is-paused" : ""}`}
      aria-label="What people say about us"
    >
      <style>{`
        @keyframes testimonials-move-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes testimonials-move-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .testimonials-preview {
          position: relative;
          overflow: hidden;
          padding: clamp(28px, 5vw, 52px) clamp(14px, 4vw, 24px);
          background:
            radial-gradient(circle at 10% 0%, rgba(168, 85, 247, 0.1), transparent 34%),
            radial-gradient(circle at 82% 44%, rgba(34, 211, 238, 0.08), transparent 36%),
            transparent;
        }

        .testimonials-preview::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(to bottom, transparent, black 22%, black 78%, transparent);
          pointer-events: none;
        }

        .testimonials-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1040px;
          margin: 0 auto;
        }

        .testimonials-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin: 0 0 clamp(16px, 3vw, 24px);
          text-align: left;
        }

        .testimonials-title-wrap {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .testimonials-title-mark {
          color: #22d3ee;
          font-size: clamp(21px, 3vw, 28px);
          font-weight: 900;
          line-height: 1;
        }

        .testimonials-title {
          margin: 0;
          color: #ffffff;
          font-family: var(--font-nunito);
          font-size: clamp(22px, 2.8vw, 30px);
          font-weight: 800;
          line-height: 1.15;
        }

        .testimonials-grid-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 2.4vw, 18px);
          width: 100%;
        }

        .testimonial-lane {
          overflow: hidden;
          border-radius: 18px;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }

        .testimonial-track {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          width: max-content;
          will-change: transform;
        }

        .testimonial-track-upper {
          animation: testimonials-move-left 26s linear infinite;
        }

        .testimonial-track-lower {
          animation: testimonials-move-right 26s linear infinite;
        }

        .testimonials-preview.is-paused .testimonial-track {
          animation-play-state: paused;
        }

        .testimonial-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: clamp(340px, 42vw, 500px);
          height: 146px;
          padding: 15px 16px;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 12px;
          background:
            linear-gradient(135deg, rgba(15, 23, 42, 0.84), rgba(2, 6, 23, 0.88)),
            radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.08), transparent 42%);
          box-shadow:
            0 18px 42px rgba(0, 0, 0, 0.26),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          box-sizing: border-box;
          font-family: var(--font-nunito);
          cursor: pointer;
        }

        .testimonial-card-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent, rgba(255, 255, 255, 0.055), transparent);
          transform: translateX(-70%);
          pointer-events: none;
        }

        .testimonial-card:hover .testimonial-card-shine {
          transform: translateX(70%);
          transition: transform 0.7s ease;
        }

        .testimonial-card-header {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .testimonial-avatar {
          position: relative;
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          overflow: hidden;
          border: 2px solid rgba(34, 211, 238, 0.38);
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(168, 85, 247, 0.2));
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.14);
        }

        .testimonial-avatar span {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
        }

        .testimonial-person {
          min-width: 0;
          flex: 1;
        }

        .testimonial-person h3 {
          margin: 0 0 3px;
          color: #ffffff;
          font-size: 15px;
          font-weight: 800;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .testimonial-person p {
          margin: 0;
          color: #22d3ee;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.35;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .testimonial-quote-icon {
          width: 20px;
          height: 20px;
          flex: 0 0 auto;
          color: rgba(34, 211, 238, 0.7);
        }

        .testimonial-review {
          position: relative;
          z-index: 1;
          display: -webkit-box;
          min-height: calc(1.5em * 2);
          margin: 10px 0 0;
          overflow: hidden;
          color: #aeb7cc;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.5;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .testimonial-card-footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          margin-top: 10px;
          padding-top: 0;
          border-top: 0;
        }

        .testimonial-card-footer span {
          color: #22d3ee;
          font-size: 12px;
          font-weight: 700;
        }

        .testimonial-card-footer a {
          display: inline-flex;
          min-height: 28px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex: 0 0 auto;
          padding: 0 10px;
          border: 1px solid rgba(34, 211, 238, 0.28);
          border-radius: 999px;
          color: #22d3ee;
          background: rgba(34, 211, 238, 0.08);
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }

        .testimonial-card-footer a:hover {
          transform: translateY(-2px);
          border-color: rgba(34, 211, 238, 0.56);
          background: rgba(34, 211, 238, 0.14);
        }

        .testimonial-card-footer svg {
          width: 16px;
          height: 16px;
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-track {
            animation: none;
            transform: none;
          }
        }

        @media (max-width: 640px) {
          .testimonials-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .testimonial-lane {
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
            mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
          }

          .testimonial-card {
            width: min(360px, calc(100vw - 48px));
            height: 142px;
            padding: 13px 14px;
          }

          .testimonial-avatar {
            width: 36px;
            height: 36px;
            flex-basis: 36px;
          }

          .testimonial-person h3 {
            font-size: 14px;
          }

          .testimonial-person p,
          .testimonial-card-footer span {
            font-size: 11px;
          }

          .testimonial-review {
            margin-top: 8px;
            font-size: 12px;
            line-height: 1.45;
            min-height: calc(1.45em * 2);
          }
        }
      `}</style>

      <div className="testimonials-inner">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="testimonials-title-wrap">
            <span className="testimonials-title-mark" aria-hidden="true">&gt;</span>
            <h2 className="testimonials-title">What People Say</h2>
          </div>
        </motion.div>

        <div className="testimonials-grid-wrap">
          <div className="testimonial-lane">
            <div className="testimonial-track testimonial-track-upper">
              {[...upperRowReviews, ...upperRowReviews].map((testimonial, index) => (
                <TestimonialCard
                  key={`upper-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  onHoverChange={setIsHoverPaused}
                  onTogglePause={togglePause}
                  onTouchPauseChange={setIsTouchPaused}
                />
              ))}
            </div>
          </div>

          {lowerRowReviews.length > 0 ? (
            <div className="testimonial-lane">
              <div className="testimonial-track testimonial-track-lower">
                {[...lowerRowReviews, ...lowerRowReviews].map((testimonial, index) => (
                  <TestimonialCard
                    key={`lower-${testimonial.id}-${index}`}
                    testimonial={testimonial}
                    onHoverChange={setIsHoverPaused}
                    onTogglePause={togglePause}
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
