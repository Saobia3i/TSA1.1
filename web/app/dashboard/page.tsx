// app/dashboard/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardContent from './DashboardContent'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
 

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <DashboardContent 
      user={{
        name: session.user.name || 'User',
        email: session.user.email || '',
        id: session.user.id || crypto.randomUUID(),
        role: session.user.role, // ✅ Default role
      }} 
    />
  );
}
