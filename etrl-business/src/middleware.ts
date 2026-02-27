import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the response object to modify cookies
  const response = NextResponse.next()
  
  // Extract referral code from URL if present
  const refCode = request.nextUrl.searchParams.get('ref')
  
  if (refCode) {
    // Set cookie for 30 days
    const expires = new Date()
    expires.setDate(expires.getDate() + 30)
    
    response.cookies.set({
      name: 'ref_code',
      value: refCode,
      expires,
      domain: '.etrl.chat',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }
  
  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
