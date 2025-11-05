import { NextRequest, NextResponse } from 'next/server';
import { User } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export type UserWithoutPassword = Omit<User, 'password'>;

export async function requireAuth(
    request: NextRequest,
): Promise<UserWithoutPassword | NextResponse> {
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

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export function isAuthError(
    result: UserWithoutPassword | NextResponse,
): result is NextResponse {
    return result instanceof NextResponse;
}

export async function getCurrentUser(): Promise<UserWithoutPassword | null> {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function isAdmin(): Promise<boolean> {
    const user = await getCurrentUser();
    return user?.profile === 'Administrador';
}
