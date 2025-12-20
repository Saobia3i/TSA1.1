// app/marketing/services/[slug]/page.tsx - FIXED ROUTE STRUCTURE
import { notFound } from 'next/navigation';
import ServiceDetailsPage from '@/features/services/components/ServiceDetailsPage';
import { getServiceBySlug } from '@/features/services/data/services';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailsPageWrapper({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    notFound();
  }

  // Extract only serializable data, excluding the icon component
  const serviceData = {
    slug: service.slug,
    title: service.title,
    shortDescription: service.shortDescription,
    longDescription: service.longDescription,
    packages: service.packages,
  };

  return <ServiceDetailsPage service={serviceData} />;
}
