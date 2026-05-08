import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const deleteSchema = z.object({
  type: z.enum(["enrollment", "serviceBooking"]),
  id: z.string().min(1, "ID is required"),
});

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  const adminEmail = process.env.ADMIN_PANEL_EMAIL?.trim().toLowerCase();
  const sessionEmail = session?.user?.email?.trim().toLowerCase() || "";

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return null;
  }

  if (adminEmail && sessionEmail !== adminEmail) {
    return null;
  }

  return session;
}

export async function DELETE(request: Request) {
  const session = await ensureAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { type, id } = deleteSchema.parse(await request.json());

    if (type === "enrollment") {
      await prisma.enrollment.delete({ where: { id } });
    } else {
      await prisma.serviceBooking.delete({ where: { id } });
    }

    revalidatePath("/dashboard");
    revalidatePath("/admin/enrollments");

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Invalid delete request" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
  }
}
