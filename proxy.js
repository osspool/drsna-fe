import { NextResponse } from 'next/server';

export function proxy(request) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  // Extract domain information
  const isPShotDomain =
    hostname.includes('pshots.com') ||
    hostname.includes('pshot.drsnaclinic.com') ||
    hostname.includes('pshot.localhost'); // For local development

  // Clone the URL for rewriting
  const rewriteUrl = url.clone();

  // Handle P-Shot domain routing
  if (isPShotDomain) {
    // Rewrite root to P-Shot landing page
    if (url.pathname === '/') {
      rewriteUrl.pathname = '/pshot';
    }
    // If already prefixed with /pshot, leave as is
    else if (!url.pathname.startsWith('/pshot')) {
      // For other pages, prefix with /pshot
      rewriteUrl.pathname = `/pshot${url.pathname}`;
    }

    // Set custom header to identify P-Shot domain
    const response = NextResponse.rewrite(rewriteUrl);
    response.headers.set('x-domain-context', 'pshot');
    response.headers.set('x-site-name', 'P-Shot Clinic');
    return response;
  }

  // Default: Main site (drsnaclinic.com)
  const response = NextResponse.next();
  response.headers.set('x-domain-context', 'main');
  response.headers.set('x-site-name', 'Dr SNA Clinic');
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*$).*)',
  ],
};
