import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getTestimonials as getStaticTestimonials, type Testimonial } from "@/features/home/data/testimonials";

type DbTestimonial = {
  id: string;
  name: string;
  position: string | null;
  review: string;
  image: string | null;
  postLink: string | null;
};

function normalizeTestimonial(testimonial: DbTestimonial): Testimonial {
  return {
    id: testimonial.id,
    name: testimonial.name,
    position: testimonial.position || undefined,
    review: testimonial.review,
    image: testimonial.image || undefined,
    postLink: testimonial.postLink || undefined,
  };
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  noStore();

  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        position: true,
        review: true,
        image: true,
        postLink: true,
      },
    });

    if (testimonials.length > 0) {
      const databaseTestimonials = testimonials.map(normalizeTestimonial);
      const databaseIds = new Set(databaseTestimonials.map((testimonial) => testimonial.id));
      const fallbackTestimonials = getStaticTestimonials().filter(
        (testimonial) => !databaseIds.has(testimonial.id)
      );

      return [...databaseTestimonials, ...fallbackTestimonials];
    }
  } catch {
    return getStaticTestimonials();
  }

  return getStaticTestimonials();
}
