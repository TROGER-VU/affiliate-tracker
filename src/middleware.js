import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error('Error getting session:', sessionError);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  console.log('Session data:', session); // Log the entire session object

  const user = session?.user;

  if (!user) {
    console.log('No user in session, redirecting...');
    if (
      req.nextUrl.pathname.startsWith('/publisher') ||
      req.nextUrl.pathname.startsWith('/admin')
    ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return res; // No user, but not a protected route
  }

  console.log('User from session:', user); // Log the user object

  try {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user role:', userError);
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    const role = userData?.role;
    console.log('Fetched role:', role);

    const pathname = req.nextUrl.pathname;

    const protectedRoutes = {
      '/publisher/dashboard': ['publisher'],
      '/admin/dashboard': ['admin'],
    };

    for (const route in protectedRoutes) {
      if (pathname.startsWith(route)) {
        const allowedRoles = protectedRoutes[route];
        if (!role || !allowedRoles.includes(role)) {
          console.log(
            'Redirecting to unauthorized due to role:',
            role,
            'for route:',
            route
          );
          return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        return res; // User has the required role
      }
    }

    // If the route is not explicitly protected, allow access
    return res;
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.redirect(new URL('/unauthorized', req.url)); // Important: Handle errors during the role fetch
  }
}

// Specify the paths that this middleware should run for
export const config = {
  matcher: ['/publisher/:path*', '/admin/:path*'],
};