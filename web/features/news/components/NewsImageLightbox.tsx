"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type NewsImageLightboxProps = {
  image: {
    src: string;
    alt: string;
  } | null;
  onClose: () => void;
};

export default function NewsImageLightbox({ image, onClose }: NewsImageLightboxProps) {
  const isOpen = Boolean(image);

  useEffect(() => {
    if (!image) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;
  const safeImageUrl = image.src.replace(/"/g, '\\"');

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        background: "rgba(0, 0, 0, 0.86)",
        display: isOpen ? "grid" : "none",
        placeItems: "center",
        padding: "12px",
      }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        style={{
          position: "fixed",
          top: "14px",
          right: "14px",
          width: "30px",
          height: "30px",
          border: "0",
          borderRadius: "50%",
          background: "rgba(15, 23, 42, 0.82)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 2,
          padding: 0,
          lineHeight: 0,
        }}
      >
        <X size={18} aria-hidden="true" />
      </button>

      <div
        aria-label={image.alt}
        style={{
          width: "calc(100vw - 24px)",
          height: "calc(100dvh - 24px)",
          maxWidth: "1200px",
          maxHeight: "820px",
          backgroundImage: `url("${safeImageUrl}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
    </div>,
    document.body,
  );
}
