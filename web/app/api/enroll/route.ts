import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const enrollmentSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  courseName: z.string().min(1, "Course name is required"),
});

type EnrollmentStatusValue = "PENDING" | "APPROVED" | "REJECTED";

function getEnvAny(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];
    if (value && value.trim()) return value.trim();
  }
  return "";
}

async function sendEnrollmentNotificationEmail(params: {
  studentName: string;
  studentEmail: string;
  studentContact: string;
  courseName: string;
  courseId: string;
  enrolledAt: Date;
}) {
  const smtpUser = getEnvAny("SMTP_USER", "SmtpUser", "Email__SmtpUser");
  const smtpPass = getEnvAny("SMTP_PASS", "SmtpPass", "Email__SmtpPass");
  const smtpHost =
    getEnvAny("SMTP_HOST", "SmtpHost", "Email__SmtpHost") || "smtp.gmail.com";
  const smtpPort = Number(
    getEnvAny("SMTP_PORT", "SmtpPort", "Email__SmtpPort") || "587"
  );

  if (!smtpUser || !smtpPass) {
    console.warn("SMTP_USER/SMTP_PASS not set. Skipping enrollment email.");
    return;
  }

  const notifyTo =
    getEnvAny("ENROLLMENT_NOTIFY_EMAIL", "Email__NotifyTo") ||
    "tensorsecurityacademy@gmail.com";
  const fromAddress =
    getEnvAny("SMTP_FROM", "FromEmail", "Email__FromEmail") || smtpUser;

  const nodemailer = await import("nodemailer");
  const transporter = smtpHost
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      })
    : nodemailer.createTransport({
        service: "gmail",
        auth: { user: smtpUser, pass: smtpPass },
      });

  const enrolledAtBd = params.enrolledAt.toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    dateStyle: "full",
    timeStyle: "short",
  });

  await transporter.sendMail({
    from: fromAddress,
    to: notifyTo,
    subject: `New enrollment request: ${params.courseName}`,
    text: [
      `${params.studentName} wants to enroll in "${params.courseName}" course.`,
      ``,
      `Student Name: ${params.studentName}`,
      `Student Email: ${params.studentEmail}`,
      `Student Contact: ${params.studentContact}`,
      `Course Name: ${params.courseName}`,
      `Course ID: ${params.courseId}`,
      `Enrolled At: ${enrolledAtBd}`,
    ].join("\n"),
    html: `
      <h2>New Enrollment Request</h2>
      <p><strong>${params.studentName}</strong> wants to enroll in "<strong>${params.courseName}</strong>" course.</p>
      <ul>
        <li><strong>Student Name:</strong> ${params.studentName}</li>
        <li><strong>Student Email:</strong> ${params.studentEmail}</li>
        <li><strong>Student Contact:</strong> ${params.studentContact}</li>
        <li><strong>Course Name:</strong> ${params.courseName}</li>
        <li><strong>Course ID:</strong> ${params.courseId}</li>
        <li><strong>Enrolled At:</strong> ${enrolledAtBd}</li>
      </ul>
    `,
  });
}

export async function POST(request: Request) {
  try {
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

    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: validatedData.courseId,
        },
      },
    });

    if (existingEnrollment) {
      const existingStatus =
        ((existingEnrollment as unknown as { status?: EnrollmentStatusValue }).status ??
          "PENDING") as EnrollmentStatusValue;

      if (existingStatus === "PENDING") {
        return NextResponse.json(
          {
            success: true,
            message: "we have received your enrollment request. we will contact you soon.",
            enrollment: {
              id: existingEnrollment.id,
              courseName: existingEnrollment.courseName,
              status: existingStatus,
              enrolledAt: existingEnrollment.enrolledAt,
            },
          },
          { status: 200 }
        );
      }

      if (existingStatus === "APPROVED") {
        return NextResponse.json(
          { error: "You are already enrolled in this course" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Your previous enrollment was rejected. Please contact support." },
        { status: 400 }
      );
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: validatedData.courseId,
        courseName: validatedData.courseName,
      },
    });

    try {
      await sendEnrollmentNotificationEmail({
        studentName: user.name || "Unknown",
        studentEmail: user.email,
        studentContact: user.contact || "Not provided",
        courseName: validatedData.courseName,
        courseId: validatedData.courseId,
        enrolledAt: enrollment.enrolledAt,
      });
    } catch (mailError) {
      // Email delivery failure should not block saved enrollment.
      console.error("Enrollment saved but email notification failed:", mailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "we have received your enrollment request. we will contact you soon.",
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

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
    });

    return NextResponse.json({
      isEnrolled:
        ((enrollment as unknown as { status?: EnrollmentStatusValue } | null)?.status ??
          "PENDING") === "APPROVED",
      enrollment: enrollment || null,
    });
  } catch (error) {
    console.error("Error checking enrollment:", error);
    return NextResponse.json(
      { error: "Failed to check enrollment status" },
      { status: 500 }
    );
  }
}
