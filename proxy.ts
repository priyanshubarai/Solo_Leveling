import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isApiRoute = createRouteMatcher(['/api(.*)'])
const allowedOrigin = "http://localhost:8080";

export default clerkMiddleware(async (auth, req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS,PATCH',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const {isAuthenticated} = await auth();
  
  if(!isAuthenticated && isApiRoute(req)){
    console.log("Unauthorised!!");
    return NextResponse.json({ error: 'Unauthorized' }, { 
      status: 401,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
      },
    });
  }

  // For authenticated requests, proceed and add CORS headers
  return NextResponse.next({
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};