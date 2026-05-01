"use client";

import { useRef, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import type { ChatWindowState } from "@/types/chat";

const ChatWindow = lazy(() => import("./ChatWindow"));

// Minimal female assistant bot icon with headphones (inline so no extra dep)
function BotFemaleIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5.8 11.8v-1.2C5.8 7.2 8.5 4.7 12 4.7s6.2 2.5 6.2 5.9v1.2" />
      <rect x="4.3" y="10.7" width="2.5" height="4.5" rx="1.2" />
      <rect x="17.2" y="10.7" width="2.5" height="4.5" rx="1.2" />
      <path d="M18.2 15.2c-.6 2.1-2.3 3.4-4.4 3.8" />
      <circle cx="13.7" cy="18.9" r="0.55" fill="currentColor" stroke="none" />
      <path d="M8.1 8.6c.7-1.2 2-1.9 3.9-1.9s3.2.7 3.9 1.9" />
      <rect x="7.6" y="8" width="8.8" height="7.6" rx="2.8" />
      <path d="M8.1 9.1c1.7-.2 3-.7 3.9-1.6 1 .9 2.3 1.4 3.9 1.6" />
      <circle cx="10.1" cy="11.2" r="0.62" fill="currentColor" stroke="none" />
      <circle cx="13.9" cy="11.2" r="0.62" fill="currentColor" stroke="none" />
      <path d="M10.4 13.5c.9.7 2.3.7 3.2 0" strokeWidth="1.2" />
      <path d="M9.5 16.7c1.4.9 3.6.9 5 0" />
    </svg>
  );
}

export default function ChatBubble() {
  const [windowState, setWindowState] = useState<ChatWindowState>("closed");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const dragRef = useRef<{
    pointerId: number;
    offsetX: number;
    offsetY: number;
    startX: number;
    startY: number;
    moved: boolean;
    dragging: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  const handleBubbleClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    setWindowState((prev) =>
      prev === "closed" ? "open" : prev === "minimized" ? "open" : "closed"
    );
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (!rect) return;

    dragRef.current = {
      pointerId: e.pointerId,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
      dragging: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId || e.buttons !== 1) return;

    const distanceX = Math.abs(e.clientX - drag.startX);
    const distanceY = Math.abs(e.clientY - drag.startY);
    if (!drag.dragging && distanceX < 10 && distanceY < 10) return;

    drag.dragging = true;
    drag.moved = true;

    const size = 58;
    const padding = 14;
    const nextX = Math.min(
      Math.max(e.clientX - drag.offsetX, padding),
      window.innerWidth - size - padding
    );
    const nextY = Math.min(
      Math.max(e.clientY - drag.offsetY, padding),
      window.innerHeight - size - padding
    );

    setPosition({ x: nextX, y: nextY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    suppressClickRef.current = Boolean(drag?.moved);
    dragRef.current = null;
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragRef.current = null;
  };

  const isActive = windowState !== "closed";
  const windowAnchor = position
    ? { x: position.x, y: position.y + 28 }
    : null;

  return (
    <>
      {isActive && (
        <Suspense fallback={null}>
          <ChatWindow
            state={windowState}
            onStateChange={setWindowState}
            launcherPosition={windowAnchor}
          />
        </Suspense>
      )}

      {/* Fixed launcher, draggable by pointer/touch */}
      <div
        style={{
          zIndex: 9999,
          position: "fixed",
          left: position ? `${position.x}px` : "24px",
          top: position ? `${position.y}px` : undefined,
          bottom: position ? undefined : "25px",
        }}
        className="flex flex-col items-center gap-2"
      >
        <span
          className="text-sm font-semibold text-cyan-300 whitespace-nowrap"
          style={{
            fontFamily: "var(--font-nunito, 'Nunito Sans', sans-serif)",
            textShadow: "0 0 8px rgba(34,211,238,0.75)",
            visibility: isActive ? "hidden" : "visible",
            pointerEvents: "none",
          }}
        >
          Ai Assistant
        </span>

        {/* Bubble button */}
        <motion.button
          onClick={handleBubbleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          aria-label={isActive ? "Close Tensora AI" : "Open Tensora AI"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.8,
            duration: 0.4,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="tensora-launcher-button"
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: "rgba(9,9,11,0.85)",
            backdropFilter: "blur(12px)",
            border: isActive
              ? "2px solid rgba(34,211,238,0.9)"
              : "2px solid rgba(34,211,238,0.5)",
            boxShadow: isActive
              ? "0 0 16px rgba(34,211,238,0.65), 0 0 32px rgba(34,211,238,0.3)"
              : "0 0 10px rgba(34,211,238,0.4), 0 0 20px rgba(34,211,238,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            transition:
              "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
            position: "relative",
            touchAction: "none",
          }}
        >
          <span className="tensora-ai-sparkles" aria-hidden="true">
            <span className="tensora-ai-star tensora-ai-star-one" />
            <span className="tensora-ai-star tensora-ai-star-two" />
            <span className="tensora-ai-star tensora-ai-star-three" />
          </span>
          {/* Ping ring when idle */}
          {!isActive && (
            <span
              style={{
                position: "absolute",
                inset: -2,
                borderRadius: "50%",
                border: "2px solid rgba(34,211,238,0.35)",
                animation: "ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
              }}
            />
          )}
          <BotFemaleIcon
            size={34}
            className={isActive ? "text-cyan-300" : "text-cyan-400"}
          />
        </motion.button>
      </div>

      <style>{`
        .tensora-launcher-button > svg {
          position: relative;
          z-index: 2;
        }

        .tensora-ai-sparkles {
          position: absolute;
          inset: 3px;
          z-index: 3;
          pointer-events: none;
        }

        .tensora-ai-star {
          position: absolute;
          width: 5px;
          height: 5px;
          color: #ffffff;
          background: currentColor;
          clip-path: polygon(
            50% 0%,
            61% 35%,
            100% 50%,
            61% 65%,
            50% 100%,
            39% 65%,
            0% 50%,
            39% 35%
          );
          filter:
            drop-shadow(0 0 3px rgba(255, 255, 255, 1))
            drop-shadow(0 0 8px rgba(255, 255, 255, 0.96))
            drop-shadow(0 0 14px rgba(226, 232, 240, 0.9))
            drop-shadow(0 0 22px rgba(148, 163, 184, 0.72));
          opacity: 0;
          animation: tensoraStarTwinkle 2.45s ease-in-out infinite;
        }

        .tensora-ai-star::before,
        .tensora-ai-star::after {
          content: "";
          position: absolute;
          inset: 22%;
          margin: auto;
          background: #ffffff;
          clip-path: polygon(
            50% 0%,
            58% 37%,
            100% 50%,
            58% 63%,
            50% 100%,
            42% 63%,
            0% 50%,
            42% 37%
          );
        }

        .tensora-ai-star::after {
          transform: rotate(45deg) scale(0.72);
          opacity: 0.82;
        }

        .tensora-ai-star-one {
          top: 5px;
          left: 10px;
          width: 7px;
          height: 7px;
          animation-delay: 0s;
        }

        .tensora-ai-star-two {
          top: 16px;
          right: 5px;
          width: 10px;
          height: 10px;
          animation-delay: 0.42s;
        }

        .tensora-ai-star-three {
          left: 10px;
          bottom: 8px;
          width: 8px;
          height: 8px;
          color: #ffffff;
          animation-delay: 0.84s;
        }

        @keyframes ping {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }

        @keyframes tensoraStarTwinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0.45) rotate(0deg);
          }
          18% {
            opacity: 1;
            transform: scale(1.18) rotate(45deg);
          }
          36% {
            opacity: 0.62;
            transform: scale(0.88) rotate(90deg);
          }
          54% {
            opacity: 0;
            transform: scale(0.45) rotate(135deg);
          }
        }
      `}</style>
    </>
  );
}
