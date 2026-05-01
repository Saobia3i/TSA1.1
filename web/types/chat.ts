export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  reply: string;
  conversationId: string;
}

export interface ChatApiError {
  error: string;
  code: "RATE_LIMIT" | "SERVICE_UNAVAILABLE" | "INVALID_REQUEST" | "NOT_FOUND";
}

export type ChatWindowState = "open" | "minimized" | "closed";
