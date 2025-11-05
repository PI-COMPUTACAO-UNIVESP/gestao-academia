import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function middleware(
    request: NextRequest,
): Promise<NextResponse> {
    const userId = request.cookies.get('userId')?.value;

    if (!userId) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        const response = NextResponse.json(
            { error: 'User not found' },
            { status: 401 },
        );

        response.cookies.set('userId', '', {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 0,
        });

        return response;
    }

    // Pass user data via headers to avoid re-fetching in route handlers
    const requestHeaders = new Headers(request.headers);
    const { password: _, ...userWithoutPassword } = user;
    requestHeaders.set('x-user-data', JSON.stringify(userWithoutPassword));

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        '/((?!api/auth/signin|_next/static|_next/image|favicon.ico).*)',
    ],
};
