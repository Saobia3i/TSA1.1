import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { appendEnrollmentToGoogleSheet } from "@/lib/googleSheets";
import { normalizeWhatsappWithCountryCode } from "@/lib/validators";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { sendMail } from "@/lib/mailer";

const enrollmentSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  courseName: z.string().min(1, "Course name is required"),
  whatsappCountryCode: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}$/, "Valid country code is required"),
  whatsappNumber: z
    .string()
    .trim()
    .min(6, "WhatsApp number is required"),
});

type EnrollmentStatusValue = "PENDING" | "APPROVED" | "REJECTED";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rl = rateLimit(`enroll:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 }); // 5 per hour
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Please login to enroll" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = enrollmentSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        contact: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const normalizedWhatsapp = normalizeWhatsappWithCountryCode(
      validatedData.whatsappCountryCode,
      validatedData.whatsappNumber
    );

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        contact: normalizedWhatsapp,
      },
      select: {
        id: true,
        name: true,
        email: true,
        contact: true,
      },
    });

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: updatedUser.id,
        courseId: validatedData.courseId,
        courseName: validatedData.courseName,
      },
    });

    // Try to append to Google Sheets (non-blocking - database is source of truth)
    // If sheets sync fails, user still sees success because database save succeeded
    try {
      await appendEnrollmentToGoogleSheet({
        enrollmentId: enrollment.id,
        studentName: updatedUser.name || "Unknown",
        studentEmail: updatedUser.email,
        studentContact: updatedUser.contact || "Not provided",
        courseName: validatedData.courseName,
        courseId: validatedData.courseId,
        status:
          ((enrollment as unknown as { status?: EnrollmentStatusValue }).status ??
            "PENDING") as EnrollmentStatusValue,
        enrolledAt: enrollment.enrolledAt,
      });
      console.log(`✓ Enrollment ${enrollment.id} synced to Google Sheets`);
    } catch (sheetError) {
      console.error("❌ Google Sheets sync failed (enrollment saved in database):", sheetError);
      // Don't throw - database save succeeded, user will see success message
    }

    try {
      const notifyTo =
        process.env.ENROLLMENT_NOTIFY_EMAIL || process.env.SMTP_USER || "";
      const enrolledAtBd = enrollment.enrolledAt.toLocaleString("en-BD", {
        timeZone: "Asia/Dhaka",
        dateStyle: "full",
        timeStyle: "short",
      });
      if (notifyTo) {
        await sendMail({
          to: notifyTo,
          subject: `New enrollment request: ${validatedData.courseName}`,
          text: [
            `${updatedUser.name || "Unknown"} wants to enroll in "${validatedData.courseName}" course.`,
            ``,
            `Student Name: ${updatedUser.name || "Unknown"}`,
            `Student Email: ${updatedUser.email}`,
            `Student Contact: ${updatedUser.contact || "Not provided"}`,
            `Course Name: ${validatedData.courseName}`,
            `Course ID: ${validatedData.courseId}`,
            `Enrolled At: ${enrolledAtBd}`,
          ].join("\n"),
          html: `
            <h2>New Enrollment Request</h2>
            <p><strong>${updatedUser.name || "Unknown"}</strong> wants to enroll in "<strong>${validatedData.courseName}</strong>" course.</p>
            <ul>
              <li><strong>Student Name:</strong> ${updatedUser.name || "Unknown"}</li>
              <li><strong>Student Email:</strong> ${updatedUser.email}</li>
              <li><strong>Student Contact:</strong> ${updatedUser.contact || "Not provided"}</li>
              <li><strong>Course Name:</strong> ${validatedData.courseName}</li>
              <li><strong>Course ID:</strong> ${validatedData.courseId}</li>
              <li><strong>Enrolled At:</strong> ${enrolledAtBd}</li>
            </ul>
          `,
        });
      }
    } catch (mailError) {
      console.error("Enrollment saved but email notification failed:", mailError);
    }

    revalidatePath("/dashboard");
    revalidatePath("/admin/enrollments");

    // Always return success if database save succeeded
    // Sheet sync status is only logged server-side, not exposed to user
    return NextResponse.json(
      {
        success: true,
        message: "we have received your enrollment request. we will contact you soon.",
        whatsapp: updatedUser.contact,
        enrollment: {
          id: enrollment.id,
          courseName: enrollment.courseName,
          status:
            ((enrollment as unknown as { status?: EnrollmentStatusValue }).status ??
              "PENDING") as EnrollmentStatusValue,
          enrolledAt: enrollment.enrolledAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid data provided",
          details: error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    if (
      error instanceof Error &&
      (error.message === "Valid country code is required." ||
        error.message === "Valid WhatsApp number is required.")
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
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

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Course ID required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const [latestEnrollment, approvedEnrollment] = await Promise.all([
      prisma.enrollment.findFirst({
        where: {
          userId: user.id,
          courseId,
        },
        orderBy: {
          enrolledAt: "desc",
        },
      }),
      prisma.enrollment.findFirst({
        where: {
          userId: user.id,
          courseId,
          status: "APPROVED",
        },
      }),
    ]);

    return NextResponse.json({
      isEnrolled: Boolean(approvedEnrollment),
      enrollment: latestEnrollment || null,
    });
  } catch (error) {
    console.error("Error checking enrollment:", error);
    return NextResponse.json(
      { error: "Failed to check enrollment status" },
      { status: 500 }
    );
  }
}
