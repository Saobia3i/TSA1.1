import Navbar from '@/features/layout/components/Navbar';
import Footer from '@/features/layout/components/Footer';
import { auth } from '@/lib/auth';

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user 
    ? { name: session.user.name || 'User', email: session.user.email || '' } 
    : null;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* ✅ Navbar overlay - content এর উপরে থাকবে */}
      <Navbar user={user} />
      
      {/* ✅ No padding - content navbar এর নিচে থেকে শুরু হবে */}
      <main>{children}</main>
      
      <Footer />
    </div>
  );
}
