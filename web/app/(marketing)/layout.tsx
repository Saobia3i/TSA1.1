import SmoothScroll from '@/features/layout/components/SmoothScroll';
import Navbar from '@/features/layout/components/Navbar';
import Footer from '@/features/layout/components/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothScroll />
      <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
