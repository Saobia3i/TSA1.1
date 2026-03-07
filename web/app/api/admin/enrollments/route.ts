import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const actionSchema = z.object({
  enrollmentId: z.string().min(1, "Enrollment ID is required"),
  action: z.enum(["APPROVE", "SEND_MAIL"]).default("APPROVE"),
});

function getEnvAny(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];
    if (value && value.trim()) return value.trim();
  }
  return "";
}

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  const adminEmail = process.env.ADMIN_PANEL_EMAIL?.trim().toLowerCase();
  const sessionEmail = session?.user?.email?.trim().toLowerCase() || "";
  const panelVerified = (await cookies()).get("admin_panel_auth")?.value === "verified";

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return null;
  }

  if (adminEmail && sessionEmail !== adminEmail) {
    return null;
  }

  if (!panelVerified) {
    return null;
  }
  return session;
}

async function sendCourseDetailsMail(params: {
  to: string;
  studentName: string;
  courseName: string;
  courseId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  enrolledAt: Date;
  approvedAt: Date | null;
}) {
  const smtpUser = getEnvAny("SMTP_USER", "SmtpUser", "Email__SmtpUser");
  const smtpPass = getEnvAny("SMTP_PASS", "SmtpPass", "Email__SmtpPass");
  const smtpHost =
    getEnvAny("SMTP_HOST", "SmtpHost", "Email__SmtpHost") || "smtp.gmail.com";
  const smtpPort = Number(
    getEnvAny("SMTP_PORT", "SmtpPort", "Email__SmtpPort") || "587"
  );
  const fromAddress =
    getEnvAny("SMTP_FROM", "FromEmail", "Email__FromEmail") || smtpUser;

  if (!smtpUser || !smtpPass) {
    throw new Error("SMTP credentials are not configured.");
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const enrolledAtText = params.enrolledAt.toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    dateStyle: "full",
    timeStyle: "short",
  });
  const approvedAtText = params.approvedAt
    ? params.approvedAt.toLocaleString("en-BD", {
        timeZone: "Asia/Dhaka",
        dateStyle: "full",
        timeStyle: "short",
      })
    : "Not approved yet";

  await transporter.sendMail({
    from: fromAddress,
    to: params.to,
    subject: `Course enrollment details - ${params.courseName}`,
    text: [
      `Hello ${params.studentName},`,
      ``,
      `Here are your enrollment details:`,
      `Course: ${params.courseName}`,
      `Course ID: ${params.courseId}`,
      `Status: ${params.status}`,
      `Requested At: ${enrolledAtText}`,
      `Approved At: ${approvedAtText}`,
      ``,
      `Tensor Security Academy`,
    ].join("\n"),
  });
}

export async function GET() {
  const session = await ensureAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const pendingEnrollments = await prisma.enrollment.findMany({
    orderBy: { enrolledAt: "desc" },
    select: {
      id: true,
      courseId: true,
      courseName: true,
      status: true,
      enrolledAt: true,
      approvedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          contact: true,
        },
      },
    },
    take: 200,
  });

  return NextResponse.json({ pendingEnrollments });
}

export async function PATCH(request: Request) {
  const session = await ensureAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { enrollmentId, action } = actionSchema.parse(body);

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      select: {
        id: true,
        courseId: true,
        courseName: true,
        status: true,
        enrolledAt: true,
        approvedAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
    }

    if (action === "SEND_MAIL") {
      await sendCourseDetailsMail({
        to: enrollment.user.email,
        studentName: enrollment.user.name || "Student",
        courseName: enrollment.courseName,
        courseId: enrollment.courseId,
        status: enrollment.status,
        enrolledAt: enrollment.enrolledAt,
        approvedAt: enrollment.approvedAt,
      });

      return NextResponse.json({
        success: true,
        message: `Course details mail sent to ${enrollment.user.email}`,
      });
    }

    const updated = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        status: "APPROVED",
        approvedAt: new Date(),
      },
      select: {
        id: true,
        courseName: true,
        status: true,
        approvedAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/enrollments");

    return NextResponse.json({
      success: true,
      message: "Enrollment approved successfully.",
      enrollment: updated,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Invalid data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to approve enrollment" },
      { status: 500 }
    );
  }
}
