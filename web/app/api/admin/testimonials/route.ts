import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  position: z.string().trim().optional(),
  review: z.string().trim().min(4, "Review is required"),
  image: z.string().trim().url("Image must be a valid URL").optional().or(z.literal("")),
  postLink: z.string().trim().url("Post link must be a valid URL").optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.coerce.boolean().default(true),
});

const updateSchema = testimonialSchema.extend({
  id: z.string().min(1, "Testimonial ID is required"),
});

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

function revalidateTestimonials() {
  revalidatePath("/");
  revalidatePath("/testimonials");
  revalidatePath("/admin/testimonials");
}

export async function GET() {
  const session = await ensureAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: 500,
  });

  return NextResponse.json({ testimonials });
}

export async function POST(request: Request) {
  const session = await ensureAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const parsed = testimonialSchema.parse(await request.json());
    const testimonial = await prisma.testimonial.create({
      data: {
        name: parsed.name,
        position: parsed.position || null,
        review: parsed.review,
        image: parsed.image || null,
        postLink: parsed.postLink || null,
        sortOrder: parsed.sortOrder,
        isPublished: parsed.isPublished,
      },
    });

    revalidateTestimonials();

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Invalid testimonial data" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await ensureAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const parsed = updateSchema.parse(await request.json());
    const testimonial = await prisma.testimonial.update({
      where: { id: parsed.id },
      data: {
        name: parsed.name,
        position: parsed.position || null,
        review: parsed.review,
        image: parsed.image || null,
        postLink: parsed.postLink || null,
        sortOrder: parsed.sortOrder,
        isPublished: parsed.isPublished,
      },
    });

    revalidateTestimonials();

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Invalid testimonial data" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await ensureAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = z.object({ id: z.string().min(1) }).parse(await request.json());

    await prisma.testimonial.delete({ where: { id } });
    revalidateTestimonials();

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid testimonial ID" }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
