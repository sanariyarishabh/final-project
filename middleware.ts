import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session-crypto';

const protectedRoutes = ['/admin', '/user'];
const adminRoutes = ['/admin'];

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
    const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));

    // 1. Check for session cookie
    const cookie = req.cookies.get('session')?.value;
    if (isProtectedRoute && !cookie) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // 2. Decrypt session if it exists to check roles
    if (cookie) {
        const session = await decrypt(cookie);

        // If session is invalid (e.g. expired or tampered), redirect to login
        if (!session) {
            return NextResponse.redirect(new URL('/login', req.nextUrl));
        }

        // 3. Role-based access control
        if (isAdminRoute && session.role !== 'ADMIN') {
            // Redirect non-admins trying to access admin routes to user dashboard or unauthorized page
            return NextResponse.redirect(new URL('/user/dashboard', req.nextUrl));
        }

        // Prevent Admins from accessing User routes
        if (path.startsWith('/user') && session.role === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl));
        }

        // Prevent authenticated users from visiting login page again? Optional.
        if (path.startsWith('/login') || path.startsWith('/register')) {
            if (session.role === 'ADMIN') return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl));
            return NextResponse.redirect(new URL('/user/dashboard', req.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
