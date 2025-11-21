import { NextResponse } from 'next/server';

/**
 * Next.js 16 Proxy
 *
 * Handles domain-based routing:
 * - pshots.co.uk -> /pshot content
 * - drsnaclinic.com -> main site
 */
export function proxy(request) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  // Check if this is the P-Shot domain
  const isPShotDomain =
    hostname.includes('pshots.co.uk') ||
    hostname.includes('pshot.localhost'); // For local development

  // Clone the URL for rewriting
  const rewriteUrl = url.clone();

  // Handle /about redirect to /about-us
  if (url.pathname === '/about') {
    return NextResponse.redirect(new URL('/about-us', request.url));
  }

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
    response.headers.set('x-site-name', 'P-Shot UK');
    return response;
  }

  // Check if this is the ED domain
  const isEDDomain =
    hostname.includes('erectiledysfunction-treatments.com') ||
    hostname.includes('ed.localhost');

  // Handle ED domain routing
  if (isEDDomain) {
    if (url.pathname === '/') {
      rewriteUrl.pathname = '/erectiledysfunction';
    } else if (!url.pathname.startsWith('/erectiledysfunction')) {
      rewriteUrl.pathname = `/erectiledysfunction${url.pathname}`;
    }

    const response = NextResponse.rewrite(rewriteUrl);
    response.headers.set('x-domain-context', 'erectiledysfunction');
    response.headers.set('x-site-name', 'Erectile Dysfunction Treatment London');
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
