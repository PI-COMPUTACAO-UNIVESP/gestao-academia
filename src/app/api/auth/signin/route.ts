import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 },
            );
        }

        const user = await prisma.user.findFirst({
            where: {
                email,
                password,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found or invalid credentials' },
                { status: 401 },
            );
        }

        const { password: _, ...userWithoutPassword } = user;

        const response = NextResponse.json(
            userWithoutPassword,
            { status: 200 },
        );

        response.cookies.set('userId', user.id, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: ONE_WEEK_IN_SECONDS,
        });

        return response;
    } catch (error) {
        console.error('Sign in error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
