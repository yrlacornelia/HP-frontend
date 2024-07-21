import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {

    const sessionId = cookies().get("customCookieName");

    if (!sessionId && !request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/login', request.url))
    }

}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};