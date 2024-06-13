import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"
const secret = process.env.NEXTAUTH_SECRET
export async function middleware(request: NextRequest) {
    const url = request.nextUrl
    const token = await getToken({ req: request, secret })
    if (token &&
        (url.pathname.startsWith('/signin') ||
            url.pathname.startsWith('/signup') ||
            url.pathname.startsWith('/forget-password'))
    ) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/signin',
        '/signup',
        '/forget-password',
    ]
}