import { NextResponse } from 'next/server';
import { getAllNews } from '@/features/news/data/NewsData';

export async function GET() {
  try {
    const news = getAllNews();
    return NextResponse.json(news);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load news' }, { status: 500 });
  }
}