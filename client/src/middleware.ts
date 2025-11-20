import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    // Get the token from cookies
    const token = request.cookies.get("TOKEN");

    // If accessing admin dashboard without token, redirect to login
    if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/dashboard/:path*"],
};
