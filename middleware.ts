import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // return NextResponse.redirect(new URL('/home', request.url))
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup";
    const token = request.cookies.get('uid')?.value;

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', "/signup"]
}