// app/(marketing)/layout.tsx
import Navbar from '@/features/layout/components/Navbar'
import Footer from '@/features/layout/components/Footer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const user = session?.user 
    ? { name: session.user.name || 'User', email: session.user.email || '' } 
    : null

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
