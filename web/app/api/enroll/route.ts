import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Your auth config
import { prisma } from '@/lib/prisma'; // Your Prisma client
import { z } from 'zod';

// ============================================
// VALIDATION SCHEMA
// ============================================

const enrollmentSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  courseName: z.string().min(1, 'Course name is required'),
});

// ============================================
// POST /api/enroll
// ============================================

export async function POST(request: Request) {
  try {
    console.log('📥 Enrollment request received');

    // 1. CHECK AUTHENTICATION
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      console.log('❌ Unauthorized access attempt');
      return NextResponse.json(
        { error: 'Please login to enroll' },
        { status: 401 }
      );
    }

    console.log('✅ User authenticated:', session.user.email);

    // 2. PARSE AND VALIDATE REQUEST BODY
    const body = await request.json();
    const validatedData = enrollmentSchema.parse(body);

    console.log('✅ Request data validated:', validatedData);

    // 3. GET USER FROM DATABASE
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        contact: true,
      }
    });

    if (!user) {
      console.log('❌ User not found in database');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('✅ User found:', user.email);

    // 4. CHECK FOR DUPLICATE ENROLLMENT
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: validatedData.courseId,
        }
      }
    });

    if (existingEnrollment) {
      console.log('⚠️ User already enrolled in this course');
      return NextResponse.json(
        { error: 'You are already enrolled in this course' },
        { status: 400 }
      );
    }

    // 5. CREATE ENROLLMENT IN DATABASE (CRITICAL: Database First!)
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: validatedData.courseId,
        courseName: validatedData.courseName,
      }
    });

    console.log('✅ Enrollment created in database:', enrollment.id);

    // 6. PREPARE DATA FOR n8n WEBHOOK
    const n8nPayload = {
      // Enrollment Info
      enrollmentId: enrollment.id,
      courseId: validatedData.courseId,
      courseName: validatedData.courseName,
      enrolledAt: enrollment.enrolledAt.toISOString(),
      
      // Student Info
      studentName: user.name || 'Unknown',
      studentEmail: user.email,
      studentContact: user.contact || 'Not provided',
      
      // Formatted Date (Bangladesh timezone)
      enrolledAtFormatted: enrollment.enrolledAt.toLocaleString('en-BD', {
        timeZone: 'Asia/Dhaka',
        dateStyle: 'full',
        timeStyle: 'short',
      }),
    };

    // 7. TRIGGER n8n WORKFLOW (ASYNC - NON-BLOCKING)
    // Important: We don't await this - fire and forget
    // This ensures fast response to user even if n8n is slow
    fetch(process.env.N8N_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optional: Add authentication header for security
        ...(process.env.N8N_WEBHOOK_SECRET && {
          'Authorization': `Bearer ${process.env.N8N_WEBHOOK_SECRET}`,
        }),
      },
      body: JSON.stringify(n8nPayload),
    })
    .then(async (res) => {
      if (res.ok) {
        console.log('✅ n8n workflow triggered successfully');
        const responseData = await res.json().catch(() => null);
        console.log('n8n response:', responseData);
      } else {
        console.error('⚠️ n8n workflow failed but enrollment is saved');
        console.error('Status:', res.status, await res.text());
      }
    })
    .catch((err) => {
      // Log error but DON'T fail the enrollment
      console.error('⚠️ n8n webhook error (enrollment still successful):', err);
    });

    console.log('🚀 n8n webhook triggered (async)');

    // 8. RETURN SUCCESS IMMEDIATELY (Don't wait for n8n)
    return NextResponse.json({
      success: true,
      message: 'Enrollment successful!',
      enrollment: {
        id: enrollment.id,
        courseName: enrollment.courseName,
        enrolledAt: enrollment.enrolledAt,
      }
    }, { status: 201 });

  } catch (error) {
    console.error('💥 Enrollment error:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid data provided', 
          details: error.issues.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          }))
        },
        { status: 400 }
      );
    }

    // Handle Prisma errors
    if (error instanceof Error && error.message.includes('Prisma')) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Database error. Please try again.' },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// ============================================
// GET /api/enroll (Optional - Check enrollment status)
// ============================================

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get courseId from URL params
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID required' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId,
        }
      }
    });

    return NextResponse.json({
      isEnrolled: !!enrollment,
      enrollment: enrollment || null,
    });

  } catch (error) {
    console.error('Error checking enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to check enrollment status' },
      { status: 500 }
    );
  }
}