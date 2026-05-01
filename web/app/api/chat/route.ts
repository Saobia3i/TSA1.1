import { NextRequest, NextResponse } from "next/server";
import {
  getOrCreateConversation,
  countMessages,
  saveMessages,
  generateReply,
  MAX_MESSAGES_PER_CONVERSATION,
} from "@/lib/chatService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, conversationId } = body as {
      message?: string;
      conversationId?: string;
    };

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required", code: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    if (message.trim().length > 500) {
      return NextResponse.json(
        { error: "Message too long (max 500 chars)", code: "INVALID_REQUEST" },
        { status: 400 }
      );
    }

    const conversation = await getOrCreateConversation(conversationId);

    const msgCount = await countMessages(conversation.id);
    if (msgCount >= MAX_MESSAGES_PER_CONVERSATION) {
      return NextResponse.json(
        {
          error: "Too many questions, take a break! Start a new conversation.",
          code: "RATE_LIMIT",
        },
        { status: 429 }
      );
    }

    const reply = await generateReply(message.trim(), conversation.id);

    await saveMessages(conversation.id, message.trim(), reply);

    return NextResponse.json({
      reply,
      conversationId: conversation.id,
    });
  } catch (error) {
    console.error("[Tensora API] Error:", error);

    const isKeyMissing =
      error instanceof Error &&
      (error.message.includes("GROQ_API_KEY") ||
        error.message.includes("GEMINI_API_KEY"));

    if (isKeyMissing) {
      return NextResponse.json(
        { error: "Service unavailable", code: "SERVICE_UNAVAILABLE" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again.", code: "SERVICE_UNAVAILABLE" },
      { status: 500 }
    );
  }
}
