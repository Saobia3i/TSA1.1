import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminEnrollmentsClient from "./AdminEnrollmentsClient";
import AdminVerifyClient from "./AdminVerifyClient";

export default async function AdminEnrollmentsPage({
  searchParams,
}: {
  searchParams?: Promise<{ verified?: string }>;
}) {
  noStore();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !session.user.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const requiredEmail = process.env.ADMIN_PANEL_EMAIL?.trim().toLowerCase();
  const sessionEmail = session.user.email.trim().toLowerCase();
  if (requiredEmail && requiredEmail !== sessionEmail) {
    redirect("/dashboard");
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const isVerified = (await cookies()).get("admin_panel_auth")?.value === "verified";
  const allowAccess = isVerified && resolvedSearchParams?.verified === "1";
  if (!allowAccess) {
    return <AdminVerifyClient email={session.user.email} />;
  }

  const enrollments = await prisma.enrollment.findMany({
    orderBy: { enrolledAt: "desc" },
    select: {
      id: true,
      courseId: true,
      courseName: true,
      status: true,
      enrolledAt: true,
      approvedAt: true,
      mailSentAt: true,
      user: {
        select: {
          name: true,
          email: true,
          contact: true,
        },
      },
    },
    take: 500,
  });

  return <AdminEnrollmentsClient pendingEnrollments={enrollments} />;
}
