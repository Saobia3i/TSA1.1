'use client';

import { useParams } from 'next/navigation';
import NewsDetails from '@/features/news/components/NewsDetails';

export default function NewsDetailsRoute() {
  const params = useParams<{ id: string }>();
  const newsId = Number(params.id);

  return <NewsDetails id={newsId} />;
}
