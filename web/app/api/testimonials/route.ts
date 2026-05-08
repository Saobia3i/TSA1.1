import { NextResponse } from "next/server";
import { getPublishedTestimonials } from "@/lib/testimonials";

export async function GET() {
  const testimonials = await getPublishedTestimonials();

  return NextResponse.json({ testimonials });
}
