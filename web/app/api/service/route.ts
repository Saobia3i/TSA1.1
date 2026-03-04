import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

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
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const validatedData = serviceBookingSchema.parse(body);

    const booking = await prisma.serviceBooking.create({
      data: {
        serviceTitle: validatedData.serviceTitle,
        fullName: session?.user?.name || validatedData.fullName,
        organization: validatedData.organization,
        email: session?.user?.email || validatedData.email,
        whatsapp: validatedData.whatsapp,
        country: validatedData.country,
        packageName: validatedData.packageName,
        requirements: validatedData.requirements,
        engagementType: validatedData.engagementType,
        timeline: validatedData.timeline,
        budget: validatedData.budget,
        notes: validatedData.notes,
        legalAgreement: validatedData.legalAgreement,
      },
    });

    const webhookUrl = process.env.N8N_SERVICE_WEBHOOK_URL;

    if (webhookUrl) {
      const payload = {
        bookingId: booking.id,
        ...validatedData,
        email: session?.user?.email || validatedData.email,
        fullName: session?.user?.name || validatedData.fullName,
        submittedAt: booking.createdAt.toISOString(),
      };

      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.N8N_SERVICE_WEBHOOK_SECRET && {
              Authorization: `Bearer ${process.env.N8N_SERVICE_WEBHOOK_SECRET}`,
            }),
          },
          body: JSON.stringify(payload),
        });
      } catch {
        // webhook failure must not block booking success
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Service booking submitted successfully!",
        booking: {
          id: booking.id,
          serviceTitle: booking.serviceTitle,
          submittedAt: booking.createdAt,
        },
      },
      { status: 201 }
    );
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

    if (error instanceof Error && error.message.includes("Prisma")) {
      return NextResponse.json(
        { error: "Database error. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
