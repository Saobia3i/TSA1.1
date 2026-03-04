// app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, name, value, rating } = data;

    // Log metrics (in production, send to analytics service)
    console.log('[Web Vitals]', {
      metric: name,
      value: value,
      rating: rating,
      id: id,
      timestamp: new Date().toISOString(),
    });

    // Optional: Send to external analytics service
    // await fetch('https://your-analytics-service.com/metrics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ id, name, value, rating }),
    // });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Web Vitals Error]', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
