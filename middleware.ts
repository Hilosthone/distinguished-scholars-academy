import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdminLoggedIn = request.cookies.get('admin_token') // Or your auth logic

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isAdminLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}
