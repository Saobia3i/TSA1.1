import Navbar from '@/features/layout/components/Navbar';
import Footer from '@/features/layout/components/Footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
