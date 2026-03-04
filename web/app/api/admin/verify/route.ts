import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";

const verifySchema = z.object({
  password: z.string().min(1, "Password is required"),
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

  const adminPassword = process.env.ADMIN_PANEL_PASSWORD?.trim();
  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PANEL_PASSWORD is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { password } = verifySchema.parse(body);

    if (password !== adminPassword) {
      return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
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
