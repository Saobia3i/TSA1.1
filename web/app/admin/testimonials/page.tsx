import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminVerifyClient from "../enrollments/AdminVerifyClient";
import AdminTestimonialsClient, { type AdminTestimonialItem } from "./AdminTestimonialsClient";

export default async function AdminTestimonialsPage({
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
    return <AdminVerifyClient email={session.user.email} redirectTo="/admin/testimonials?verified=1" />;
  }

  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: 500,
  });

  const items: AdminTestimonialItem[] = testimonials.map((testimonial) => ({
    id: testimonial.id,
    name: testimonial.name,
    position: testimonial.position,
    review: testimonial.review,
    image: testimonial.image,
    postLink: testimonial.postLink,
    isPublished: testimonial.isPublished,
    sortOrder: testimonial.sortOrder,
    createdAt: testimonial.createdAt.toISOString(),
  }));

  return <AdminTestimonialsClient initialTestimonials={items} />;
}
