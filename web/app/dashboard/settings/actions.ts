"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }
  
  const name = formData.get("name") as string;
  
  if (!name || name.trim().length === 0) {
    return { error: "Name is required" };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: name.trim() },
    });
    
    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    return { error: "Failed to update profile" };
  }
}

export async function deleteAccount() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  try {
    await prisma.user.delete({
      where: { id: session.user.id },
    });
    
    return { success: true };
  } catch (err) {
    return { error: "Failed to delete account" };
  }
}
