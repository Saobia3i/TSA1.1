// lib/auth.ts
import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    contact?: string;
    role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    contact?: string;
    role?: "ADMIN" | "INSTRUCTOR" | "STUDENT";
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code"
      //   }
      // }
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
          select: {
            id: true,
            email: true,
            name: true,
            contact: true,
            password: true,
            role: true,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          contact: user.contact ?? undefined,
          role: user.role as "ADMIN" | "INSTRUCTOR" | "STUDENT",
        };
      },
    }),
  ],
  
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      // ✅ Sudhu Google er jonno custom logic
      if (account?.provider === "google") {
        try {
          // 1) Agei account linked ache kina check
          const existingAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider!,
                providerAccountId: account.providerAccountId!,
              },
            },
            select: { userId: true },
          });

          if (existingAccount) {
            // Google account already linked -> allow
            return true;
          }

          // 2) Email diye user khujbo
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // User nai -> user + account duita ekshathe create
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name || "User",
                password: null, // Google users don't need password
                role: "STUDENT",
                accounts: {
                  create: {
                    type: account.type!,
                    provider: account.provider!,
                    providerAccountId: account.providerAccountId!,
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                    session_state: account.session_state,
                  },
                },
              },
            });
          } else {
            // User ache but Google account nowo -> link account
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type!,
                provider: account.provider!,
                providerAccountId: account.providerAccountId!,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            });
          }

          return true;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }

      // ✅ Credentials ba onnano provider jemon chilo temon
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.contact = user.contact;
        token.role = user.role as "ADMIN" | "INSTRUCTOR" | "STUDENT";
      }

      if (account?.provider === "google" && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: {
            id: true,
            email: true,
            name: true,
            contact: true,
            role: true,
          },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.email = dbUser.email;
          token.name = dbUser.name;
          token.contact = dbUser.contact;
          token.role = dbUser.role as "ADMIN" | "INSTRUCTOR" | "STUDENT";
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id || "";
        session.user.email = token.email || "";
        session.user.name = token.name || "";
        session.user.contact = token.contact;
        session.user.role = (token.role || "STUDENT") as
          | "ADMIN"
          | "INSTRUCTOR"
          | "STUDENT";
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
