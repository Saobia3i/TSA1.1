"use client";

import { useRef, useState, lazy, Suspense } from "react";
import type { ChatWindowState } from "@/types/chat";

const ChatWindow = lazy(() => import("./ChatWindow"));

// Female bot SVG icon with headphones (inline so no extra dep)
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
      {/* Headphones */}
      <path d="M6 12v-1.2C6 7.6 8.6 5 12 5s6 2.6 6 5.8V12" strokeWidth="1.6" />
      <rect x="4.4" y="10.4" width="2.5" height="4.2" rx="1.1" />
      <rect x="17.1" y="10.4" width="2.5" height="4.2" rx="1.1" />
      <path d="M18.2 14.4c-.5 2.2-2.4 3.8-4.7 4.1" strokeWidth="1.25" />
      <circle cx="13.3" cy="18.5" r="0.7" fill="currentColor" stroke="none" />
      {/* Head */}
      <rect x="7.2" y="7.1" width="9.6" height="8.2" rx="3" />
      {/* Eyes */}
      <circle cx="9.8" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14.2" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
      {/* Smile */}
      <path d="M10 13.2 Q12 14.4 14 13.2" strokeWidth="1.2" />
      {/* Eyelashes (feminine) */}
      <line x1="9.8" y1="9" x2="9.2" y2="8.2" strokeWidth="1" />
      <line x1="14.2" y1="9" x2="14.8" y2="8.2" strokeWidth="1" />
      {/* Neck + body */}
      <line x1="12" y1="15.3" x2="12" y2="17" />
      <path d="M8.5 17.2 Q12 19.5 15.5 17.2" />
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
          bottom: position ? undefined : "118px",
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
          Tensora
        </span>

        {/* Bubble button */}
        <button
          onClick={handleBubbleClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          aria-label={isActive ? "Close Tensora AI" : "Open Tensora AI"}
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
            transition: "all 0.25s ease",
            position: "relative",
            touchAction: "none",
          }}
        >
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
        </button>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </>
  );
}
