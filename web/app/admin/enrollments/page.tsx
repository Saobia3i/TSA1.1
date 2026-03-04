import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminEnrollmentsClient from "./AdminEnrollmentsClient";
import AdminVerifyClient from "./AdminVerifyClient";

export default async function AdminEnrollmentsPage() {
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

  const isVerified = (await cookies()).get("admin_panel_auth")?.value === "verified";
  if (!isVerified) {
    return <AdminVerifyClient email={session.user.email} />;
  }

  const pendingEnrollments = await prisma.enrollment.findMany({
    where: { status: "PENDING" },
    orderBy: { enrolledAt: "asc" },
    select: {
      id: true,
      courseName: true,
      enrolledAt: true,
      user: {
        select: {
          name: true,
          email: true,
          contact: true,
        },
      },
    },
    take: 200,
  });

  return <AdminEnrollmentsClient pendingEnrollments={pendingEnrollments} />;
}
