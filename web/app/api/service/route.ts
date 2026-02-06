import { NextResponse } from "next/server";
import { z } from "zod";

const serviceBookingSchema = z.object({
  serviceTitle: z.string().min(1, "Service title is required"),
  fullName: z.string().min(1, "Full name is required"),
  organization: z.string().optional(),
  email: z.string().email("Valid email is required"),
  whatsapp: z.string().min(5, "WhatsApp contact number is required"),
  country: z.string().min(1, "Country is required"),
  packageName: z.string().min(1, "Package selection is required"),
  requirements: z.string().min(1, "Requirements are required"),
  engagementType: z.string().min(1, "Engagement type is required"),
  timeline: z.string().min(1, "Timeline is required"),
  budget: z.string().optional(),
  notes: z.string().optional(),
  legalAgreement: z.boolean().refine((value) => value === true, {
    message: "Legal agreement is required",
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = serviceBookingSchema.parse(body);

    const webhookUrl =
      process.env.N8N_SERVICE_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "N8N_SERVICE_WEBHOOK_URL or N8N_WEBHOOK_URL is not set" },
        { status: 500 }
      );
    }

    const payload = {
      ...validatedData,
      submittedAt: new Date().toISOString(),
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.N8N_SERVICE_WEBHOOK_SECRET && {
          Authorization: `Bearer ${process.env.N8N_SERVICE_WEBHOOK_SECRET}`,
        }),
        ...(process.env.N8N_WEBHOOK_SECRET &&
          !process.env.N8N_SERVICE_WEBHOOK_SECRET && {
            Authorization: `Bearer ${process.env.N8N_WEBHOOK_SECRET}`,
          }),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return NextResponse.json(
        { error: "Webhook request failed", details: text },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid data provided",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
