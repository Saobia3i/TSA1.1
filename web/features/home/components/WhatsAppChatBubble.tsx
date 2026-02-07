"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface WhatsAppChatBubbleProps {
  phoneNumber?: string;
  message?: string;
  position?: {
    bottom?: string;
    right?: string;
    left?: string;
    top?: string;
  };
  autoShowDelay?: number;
  buttonSize?: number;
  iconSize?: number;
}

export default function WhatsAppChatBubble({
  phoneNumber = "8801871719419",
  message = "👋 Chat with us!",
  position = { bottom: "24px", right: "24px" },
  autoShowDelay = 3000,
  buttonSize = 60,
  iconSize = 28,
}: WhatsAppChatBubbleProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Auto-show popup after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) {
        setShowPopup(true);
      }
    }, autoShowDelay);

    return () => clearTimeout(timer);
  }, [dismissed, autoShowDelay]);

  // Auto-hide popup after 5 seconds
  useEffect(() => {
    if (showPopup && !dismissed) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showPopup, dismissed]);

  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <div
      style={{
        position: "fixed",
        ...position,
        zIndex: 50,
      }}
    >
      {/* Popup Message */}
      <AnimatePresence>
        {showPopup && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, x: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: `${buttonSize + 18}px`,
              right: "0",
              padding: "10px 12px",
              borderRadius: "14px",
              fontSize: "13px",
              fontWeight: 600,
              color: "black",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: "0 12px 34px rgba(0,0,0,0.35)",
              fontFamily: "var(--font-nunito)",
            }}
          >
            <span>{message}</span>

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDismissed(true);
                setShowPopup(false);
              }}
              aria-label="Close"
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.9)",
                color: "red",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
                fontSize: "14px",
              }}
            >
              ✕
            </button>

            {/* Tail */}
            <div
              style={{
                position: "absolute",
                bottom: "-6px",
                right: "18px",
                width: "12px",
                height: "12px",
                background: "rgba(255, 255, 255, 0.9)",
                borderRight: "1px solid rgba(255, 255, 255, 0.14)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.14)",
                transform: "rotate(45deg)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
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
        onMouseEnter={() => {
          if (!dismissed) setShowPopup(true);
        }}
        style={{
          width: `${buttonSize}px`,
          height: `${buttonSize}px`,
          backgroundColor: "#25D366",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 30px rgba(37, 211, 102, 0.4)",
          cursor: "pointer",
        }}
      >
        <MessageCircle
          style={{ width: `${iconSize}px`, height: `${iconSize}px`, color: "white" }}
        />
      </motion.a>
    </div>
  );
}