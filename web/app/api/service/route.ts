import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma"; // Add Prisma client

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
    console.log('📥 Service booking request received');

    // 1. VALIDATE REQUEST BODY
    const body = await request.json();
    const validatedData = serviceBookingSchema.parse(body);

    console.log('✅ Request data validated');

    // 2. SAVE TO DATABASE FIRST (CRITICAL!)
    const booking = await prisma.serviceBooking.create({
      data: {
        serviceTitle: validatedData.serviceTitle,
        fullName: validatedData.fullName,
        organization: validatedData.organization,
        email: validatedData.email,
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

    console.log('✅ Booking saved to database:', booking.id);

    // 3. TRIGGER n8n WORKFLOW (ASYNC - FIRE AND FORGET)
    const webhookUrl = process.env.N8N_SERVICE_WEBHOOK_URL;
    
    if (webhookUrl) {
      const payload = {
        bookingId: booking.id,
        ...validatedData,
        submittedAt: booking.createdAt.toISOString(),
        submittedAtFormatted: booking.createdAt.toLocaleString('en-BD', {
          timeZone: 'Asia/Dhaka',
          dateStyle: 'full',
          timeStyle: 'short',
        }),
      };

      // DON'T AWAIT - Fire and forget
      fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.N8N_SERVICE_WEBHOOK_SECRET && {
            Authorization: `Bearer ${process.env.N8N_SERVICE_WEBHOOK_SECRET}`,
          }),
        },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          if (res.ok) {
            console.log('✅ n8n workflow triggered successfully');
            const responseData = await res.json().catch(() => null);
            console.log('n8n response:', responseData);
          } else {
            console.error('⚠️ n8n workflow failed but booking is saved');
            console.error('Status:', res.status, await res.text());
          }
        })
        .catch((err) => {
          console.error('⚠️ n8n webhook error (booking still successful):', err);
        });

      console.log('🚀 n8n webhook triggered (async)');
    } else {
      console.warn('⚠️ N8N_SERVICE_WEBHOOK_URL not set. Skipping webhook.');
    }

    // 4. RETURN SUCCESS IMMEDIATELY
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
    console.error('💥 Service booking error:', error);

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

    if (error instanceof Error && error.message.includes('Prisma')) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Database error. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}