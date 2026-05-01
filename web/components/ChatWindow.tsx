"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Send, RefreshCw, ChevronDown } from "lucide-react";
import type { ChatMessage, ChatWindowState } from "@/types/chat";

interface ChatWindowProps {
  state: ChatWindowState;
  onStateChange: (state: ChatWindowState) => void;
  launcherPosition?: { x: number; y: number } | null;
}

const TRUNCATE_LENGTH = 500;

function TypingIndicator() {
  return (
    <div className="tensora-typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="tensora-typing-dot"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

function MessageBubble({
  msg,
  expanded,
  onToggle,
}: {
  msg: ChatMessage;
  expanded: boolean;
  onToggle: () => void;
}) {
  const isUser = msg.role === "user";
  const isTruncatable = msg.content.length > TRUNCATE_LENGTH;
  const display =
    isTruncatable && !expanded
      ? msg.content.slice(0, TRUNCATE_LENGTH) + "..."
      : msg.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`tensora-message-row ${
        isUser ? "tensora-message-row-user" : "tensora-message-row-ai"
      }`}
    >
      <div
        className={`tensora-message ${isUser ? "tensora-message-user" : "tensora-message-ai"}`}
      >
        {display}
        {isTruncatable && (
          <button
            onClick={onToggle}
            className="tensora-read-more"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

function MessageSkeleton() {
  return (
    <div className="tensora-message-row tensora-message-row-ai">
      <div className="tensora-skeleton">
        <div className="tensora-skeleton-lines">
          <div className="tensora-skeleton-line" />
          <div className="tensora-skeleton-line tensora-skeleton-line-short" />
        </div>
      </div>
    </div>
  );
}

export default function ChatWindow({
  state,
  onStateChange,
  launcherPosition,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [retryPayload, setRetryPayload] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (state === "open" && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Hi! I'm Tensora. How can I help you?",
          createdAt: new Date(),
        },
      ]);
    }
  }, [state, messages.length]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content: text.trim(),
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);
      setError(null);
      setRetryPayload(null);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text.trim(), conversationId }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(
            res.status === 429
              ? "Too many questions — take a break! 😅"
              : data.error ?? "Something went wrong."
          );
          if (res.status !== 429) setRetryPayload(text.trim());
          return;
        }

        setConversationId(data.conversationId);
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: data.reply,
            createdAt: new Date(),
          },
        ]);
      } catch {
        setError("Network error. Check your connection.");
        setRetryPayload(text.trim());
      } finally {
        setLoading(false);
      }
    },
    [loading, conversationId]
  );

  const handleSubmit = () => {
    if (!input.trim() || loading) return;
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const resetConversation = () => {
    setMessages([]);
    setConversationId(undefined);
    setError(null);
    setRetryPayload(null);
  };

  if (state === "closed") return null;

  const windowStyle: CSSProperties | undefined = launcherPosition
    ? (() => {
        const viewportWidth =
          typeof window === "undefined" ? 1024 : window.innerWidth;
        const viewportHeight =
          typeof window === "undefined" ? 768 : window.innerHeight;
        const chatWidth = Math.min(330, viewportWidth - 28);
        const chatHeight = state === "open" ? 430 : 48;
        const left = Math.min(
          Math.max(launcherPosition.x, 14),
          viewportWidth - chatWidth - 14
        );
        const opensAbove = launcherPosition.y > chatHeight + 28;
        const preferredTop = opensAbove
          ? launcherPosition.y - chatHeight - 16
          : launcherPosition.y + 74;
        const top = Math.min(
          Math.max(preferredTop, 14),
          viewportHeight - chatHeight - 14
        );

        return {
          left,
          top,
          bottom: "auto",
        };
      })()
    : undefined;

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="chat-window"
          className="tensora-window"
          style={windowStyle}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={
            state === "minimized"
              ? { opacity: 1, y: 0, scale: 1, height: 48 }
              : { opacity: 1, y: 0, scale: 1, height: "auto" }
          }
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
        >
          {/* Header */}
          <div className="tensora-header">
            <div className="tensora-title-row">
              <span className="tensora-status-dot" />
              <div>
                <p className="tensora-title">Tensora</p>
                <p className="tensora-subtitle">
                  Your AI Assistant
                </p>
              </div>
            </div>
            <div className="tensora-actions">
              <button
                onClick={resetConversation}
                title="New chat"
                className="tensora-action-button"
              >
                <RefreshCw size={14} strokeWidth={1.9} />
              </button>
              <button
                onClick={() =>
                  onStateChange(state === "minimized" ? "open" : "minimized")
                }
                title={state === "minimized" ? "Expand" : "Minimize"}
                className="tensora-action-button"
              >
                {state === "minimized" ? (
                  <ChevronDown size={14} strokeWidth={1.9} />
                ) : (
                  <Minus size={14} strokeWidth={1.9} />
                )}
              </button>
              <button
                onClick={() => onStateChange("closed")}
                title="Close"
                className="tensora-action-button tensora-action-button-close"
              >
                <X size={14} strokeWidth={1.9} />
              </button>
            </div>
          </div>

          {/* Messages */}
          {state === "open" && (
            <>
              <div className="tensora-messages">
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    msg={msg}
                    expanded={expandedIds.has(msg.id)}
                    onToggle={() => toggleExpanded(msg.id)}
                  />
                ))}
                {loading && (
                  <>
                    <MessageSkeleton />
                    <TypingIndicator />
                  </>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="tensora-error"
                  >
                    <p>{error}</p>
                    {retryPayload && (
                      <button
                        onClick={() => sendMessage(retryPayload)}
                        className="tensora-retry"
                      >
                        Retry
                      </button>
                    )}
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="tensora-input-shell">
                <div className="tensora-input-row">
                  <div className="tensora-input-wrap">
                    <textarea
                      value={input}
                      onChange={(e) =>
                        setInput(e.target.value.slice(0, 500))
                      }
                      onKeyDown={handleKeyDown}
                      disabled={loading}
                      rows={1}
                      placeholder="Ask about cybersecurity..."
                      className="tensora-input"
                    />
                    <span className="tensora-counter">
                      {input.length}/500
                    </span>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !input.trim()}
                    className="tensora-send"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <style>{`
        .tensora-window {
          z-index: 9999;
          position: fixed;
          bottom: 196px;
          left: 26px;
          width: min(330px, calc(100vw - 28px));
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(34, 211, 238, 0.45);
          background: linear-gradient(
              180deg,
              rgba(8, 48, 56, 0.82),
              rgba(3, 14, 18, 0.78)
            ),
            rgba(9, 9, 11, 0.72);
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 30px rgba(34, 211, 238, 0.15),
            0 20px 50px rgba(0, 0, 0, 0.85);
        }

        .tensora-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 12px 18px;
          border-bottom: 1px solid rgba(34, 211, 238, 0.2);
          background: rgba(18, 24, 29, 0.78);
        }

        .tensora-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .tensora-status-dot {
          width: 8px;
          height: 8px;
          flex: 0 0 auto;
          border-radius: 999px;
          background: #22d3ee;
          box-shadow: 0 0 8px rgba(34, 211, 238, 0.95);
          animation: tensoraPulse 2s infinite;
        }

        .tensora-title {
          margin: 0;
          color: #67e8f9;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
          text-shadow: 0 0 8px rgba(34, 211, 238, 0.5);
        }

        .tensora-subtitle {
          margin: 4px 0 0;
          color: #a1a1aa;
          font-size: 10px;
          line-height: 1;
        }

        .tensora-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .tensora-action-button {
          width: 28px;
          height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 9px;
          color: #cbd5e1;
          background: rgba(24, 24, 27, 0.72);
          cursor: pointer;
          transition: color 160ms ease, background 160ms ease;
        }

        .tensora-action-button svg {
          width: 14px;
          height: 14px;
          display: block;
          flex: 0 0 auto;
          color: currentColor;
          stroke: currentColor;
          opacity: 1;
          visibility: visible;
        }

        .tensora-action-button:hover {
          color: #22d3ee;
          background: rgba(39, 39, 42, 0.8);
        }

        .tensora-action-button-close:hover {
          color: #f87171;
        }

        .tensora-messages {
          height: 280px;
          overflow-y: auto;
          padding: 22px 24px 24px;
          scrollbar-width: thin;
        }

        .tensora-message-row {
          display: flex;
          width: 100%;
          margin-bottom: 16px;
        }

        .tensora-message-row-ai {
          justify-content: flex-start;
          padding-left: 4px;
          padding-right: 22px;
        }

        .tensora-message-row-user {
          justify-content: flex-end;
          padding-left: 22px;
          padding-right: 4px;
        }

        .tensora-message {
          max-width: 78%;
          padding: 11px 14px;
          border-radius: 16px;
          background: transparent;
          color: #f4f4f5;
          font-size: 13px;
          line-height: 1.6;
          overflow-wrap: anywhere;
          white-space: pre-wrap;
        }

        .tensora-message-ai {
          border: 1px solid rgba(103, 232, 249, 0.38);
          box-shadow: 0 0 8px rgba(34, 211, 238, 0.12);
        }

        .tensora-message-user {
          border: 1px solid rgba(74, 222, 128, 0.68);
          color: #f0fdf4;
          box-shadow: 0 0 8px rgba(74, 222, 128, 0.16);
        }

        .tensora-read-more {
          display: block;
          margin-top: 6px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #22d3ee;
          font-size: 11px;
          cursor: pointer;
        }

        .tensora-read-more:hover {
          color: #67e8f9;
        }

        .tensora-skeleton {
          width: 160px;
          padding: 12px 14px;
          border: 1px solid rgba(103, 232, 249, 0.28);
          border-radius: 16px;
        }

        .tensora-skeleton-lines {
          display: grid;
          gap: 7px;
        }

        .tensora-skeleton-line {
          height: 10px;
          width: 100%;
          border-radius: 999px;
          background: rgba(113, 113, 122, 0.6);
          animation: tensoraSkeleton 1.2s ease-in-out infinite;
        }

        .tensora-skeleton-line-short {
          width: 66%;
        }

        .tensora-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 2px 0 8px 8px;
        }

        .tensora-typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #22d3ee;
        }

        .tensora-error {
          margin-bottom: 12px;
          text-align: center;
        }

        .tensora-error p {
          margin: 0 0 6px;
          color: #f87171;
          font-size: 12px;
        }

        .tensora-retry {
          padding: 4px 10px;
          border: 1px solid rgba(34, 211, 238, 0.3);
          border-radius: 8px;
          background: rgba(22, 78, 99, 0.38);
          color: #67e8f9;
          font-size: 11px;
          cursor: pointer;
        }

        .tensora-input-shell {
          padding: 14px 18px 16px;
          border-top: 1px solid rgba(34, 211, 238, 0.15);
          background: rgba(8, 51, 68, 0.2);
        }

        .tensora-input-row {
          display: flex;
          align-items: flex-end;
          gap: 10px;
        }

        .tensora-input-wrap {
          position: relative;
          flex: 1 1 auto;
          min-width: 0;
        }

        .tensora-input {
          width: 100%;
          max-height: 96px;
          resize: none;
          overflow-y: auto;
          padding: 9px 52px 9px 14px;
          border: 1px solid rgba(34, 211, 238, 0.36);
          border-radius: 14px;
          outline: 0;
          background: rgba(14, 25, 30, 0.82);
          color: #f4f4f5;
          font-size: 13px;
          line-height: 1.35;
          scrollbar-width: none;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }

        .tensora-input::placeholder {
          color: #71717a;
        }

        .tensora-input:focus {
          border-color: rgba(34, 211, 238, 0.58);
          box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.12);
        }

        .tensora-input:disabled {
          opacity: 0.5;
        }

        .tensora-counter {
          position: absolute;
          right: 12px;
          bottom: 10px;
          color: #71717a;
          font-size: 9px;
          pointer-events: none;
        }

        .tensora-send {
          flex: 0 0 auto;
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(34, 211, 238, 0.42);
          border-radius: 14px;
          background: rgba(34, 211, 238, 0.12);
          color: #22d3ee;
          cursor: pointer;
          transition: box-shadow 160ms ease, opacity 160ms ease;
        }

        .tensora-send:hover:not(:disabled) {
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.4);
        }

        .tensora-send:disabled {
          cursor: not-allowed;
          opacity: 0.25;
        }

        @keyframes tensoraPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }

        @keyframes tensoraSkeleton {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </>
  );
}
