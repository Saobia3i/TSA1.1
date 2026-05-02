import { prisma } from "@/lib/prisma";
import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildTensoraKnowledgeContext } from "@/lib/tensoraKnowledge";

const SYSTEM_PROMPT = `You are Tensora, a cybersecurity AI assistant for Tensor Security Academy (TSA).

Rules (follow strictly):
- Respond in the user's language when possible
- Maximum 80 words — be direct and to the point
- No lengthy intros, greetings, or filler phrases
- Never use emojis
- Use bullet points only when listing 3+ distinct items
- Give concrete examples when explaining concepts
- For greetings, reply in 1 sentence only`;

const MAX_MESSAGES_PER_CONVERSATION = 20;
const CONTEXT_WINDOW = 10;

const RAG_SYSTEM_PROMPT = `Additional Tensora instructions:
- Use TSA Knowledge Context when relevant.
- Match the user's language. If the user writes Bangla/Banglish, reply in natural Bangla-English.
- If users ask about prices, say prices are negotiable and final pricing depends on scope, package, schedule, or student need.
- If exact TSA information is not available in the provided context, say so briefly and suggest contacting TSA.`;

export async function getOrCreateConversation(conversationId?: string) {
  if (conversationId) {
    const conv = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: CONTEXT_WINDOW,
          skip: 0,
        },
      },
    });
    if (conv) return conv;
  }

  return prisma.conversation.create({
    data: {},
    include: { messages: true },
  });
}

export async function getConversationContext(conversationId: string) {
  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "desc" },
    take: CONTEXT_WINDOW,
  });
  return messages.reverse();
}

export async function countMessages(conversationId: string): Promise<number> {
  return prisma.message.count({ where: { conversationId } });
}

export async function saveMessages(
  conversationId: string,
  userContent: string,
  assistantContent: string
) {
  await prisma.message.createMany({
    data: [
      { conversationId, role: "user", content: userContent },
      { conversationId, role: "assistant", content: assistantContent },
    ],
  });
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });
}

type ContextMessage = { role: string; content: string };

export async function callGroq(
  userMessage: string,
  context: ContextMessage[],
  knowledgeContext: string
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not configured");

  const groq = new Groq({ apiKey });

  const messages: Groq.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "system", content: RAG_SYSTEM_PROMPT },
    { role: "system", content: knowledgeContext },
    ...context.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: userMessage },
  ];

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages,
    max_tokens: 600,
    temperature: 0.7,
  });

  const reply = completion.choices[0]?.message?.content;
  if (!reply) throw new Error("Empty response from Groq");
  return reply;
}

export async function callGemini(
  userMessage: string,
  context: ContextMessage[],
  knowledgeContext: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const historyForGemini = context.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({
    history: historyForGemini,
    systemInstruction: `${SYSTEM_PROMPT}\n\n${RAG_SYSTEM_PROMPT}\n\n${knowledgeContext}`,
  });

  const result = await chat.sendMessage(userMessage);
  const reply = result.response.text();
  if (!reply) throw new Error("Empty response from Gemini");
  return reply;
}

export async function generateReply(
  userMessage: string,
  conversationId: string
): Promise<string> {
  const context = await getConversationContext(conversationId);
  const knowledgeContext = buildTensoraKnowledgeContext(userMessage);

  try {
    return await callGroq(userMessage, context, knowledgeContext);
  } catch (groqError) {
    console.error("[Tensora] Groq failed, falling back to Gemini:", groqError);
    return await callGemini(userMessage, context, knowledgeContext);
  }
}

export { MAX_MESSAGES_PER_CONVERSATION };
