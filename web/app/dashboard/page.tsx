import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardContent from "./DashboardContent";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !session.user.id) {
    redirect("/login");
  }

  const isAdmin = session.user.role === "ADMIN";

  const [enrollments, serviceBookings] = await Promise.all([
    prisma.enrollment.findMany({
      where: isAdmin ? undefined : { userId: session.user.id },
      orderBy: { enrolledAt: "desc" },
      take: isAdmin ? 500 : 200,
      select: {
        id: true,
        courseId: true,
        courseName: true,
        status: true,
        enrolledAt: true,
        approvedAt: true,
        user: isAdmin
          ? {
              select: {
                id: true,
                name: true,
                email: true,
                contact: true,
              },
            }
          : false,
      },
    }),
    prisma.serviceBooking.findMany({
      where: isAdmin ? undefined : { email: session.user.email },
      orderBy: { createdAt: "desc" },
      take: isAdmin ? 500 : 50,
      select: {
        id: true,
        serviceTitle: true,
        fullName: true,
        email: true,
        packageName: true,
        engagementType: true,
        timeline: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <DashboardContent
      user={{
        name: session.user.name || "User",
        email: session.user.email,
        id: session.user.id,
        role: session.user.role || "STUDENT",
      }}
      enrollments={enrollments}
      serviceBookings={serviceBookings}
    />
  );
}
