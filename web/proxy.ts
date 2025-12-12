import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isAuthPage = nextUrl.pathname.startsWith('/login') || 
                     nextUrl.pathname.startsWith('/signup')
  
  const isProtectedRoute = nextUrl.pathname.startsWith('/dashboard') ||
                           nextUrl.pathname.startsWith('/profile') ||
                           nextUrl.pathname.startsWith('/courses')

  // যদি logged in থাকে এবং auth page এ যেতে চায়
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  // যদি logged in না থাকে এবং protected route এ যেতে চায়
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}