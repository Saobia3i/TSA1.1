// app/(marketing)/layout.tsx
import Navbar from '@/features/layout/components/Navbar'
import Footer from '@/features/layout/components/Footer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Head from 'next/head'

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
      {/* Head Meta Tags for SEO & Open Graph */}
      <Head>
        {/* General Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tensor Security Academy</title>

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Tensor Security Academy" />
        <meta property="og:description" content="A Global edtech website" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://tensorsecurityacademy.com" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
