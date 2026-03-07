import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";

const verifySchema = z.object({
  pin: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "4 digit PIN is required"),
});

function canUseAdminPanel(session: Session | null) {
  if (!session?.user?.id || session.user.role !== "ADMIN") return false;
  const requiredEmail = process.env.ADMIN_PANEL_EMAIL?.trim().toLowerCase();
  if (!requiredEmail) return true;
  return (session.user.email || "").trim().toLowerCase() === requiredEmail;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!canUseAdminPanel(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const adminPin =
    process.env.ADMIN_APPROVAL_PIN?.trim() || process.env.ADMIN_PANEL_PIN?.trim();
  if (!adminPin) {
    return NextResponse.json(
      { error: "ADMIN_APPROVAL_PIN or ADMIN_PANEL_PIN is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { pin } = verifySchema.parse(body);

    if (pin !== adminPin) {
      return NextResponse.json({ error: "Invalid admin PIN" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true, message: "Admin verified" });
    res.cookies.set("admin_panel_auth", "verified", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return res;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || "Invalid data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to verify admin password" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_panel_auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return res;
}
