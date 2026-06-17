import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isApproved = !!req.auth?.user?.isApproved;
    const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');

    if (isOnDashboard && (!isLoggedIn || !isApproved)) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
