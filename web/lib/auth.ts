// lib/auth.ts
import { type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
    contact?: string
    role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
  }

  interface Session extends DefaultSession {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    email?: string
    name?: string
    contact?: string
    role?: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() }, // ✅ Fixed
          select: {
            id: true,
            email: true,
            name: true,
            contact: true,
            password: true,
            role: true,
          },
        })

        if (!user || !user.password) {
          return null
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          contact: user.contact ?? undefined,
          role: user.role as 'ADMIN' | 'INSTRUCTOR' | 'STUDENT',
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.contact = user.contact
        token.role = user.role as 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id || ''
        session.user.email = token.email || ''
        session.user.name = token.name || ''
        session.user.contact = token.contact
        session.user.role = (token.role || 'STUDENT') as 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
