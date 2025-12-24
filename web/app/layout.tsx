// app/layout.tsx
import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/features/layout/components/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const nunitoSans = Nunito_Sans({
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Tensor Security Academy',
  description: 'Cybersecurity training and tools',
}

// app/layout.tsx
// app/layout.tsx
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const user = session?.user
    ? { name: session.user.name || 'User', email: session.user.email || '' }
    : null

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={nunitoSans.variable} style={{ margin: 0, padding: 0 }}>
        <Navbar user={user} />
        <main style={{ paddingTop: 96, position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  )
}