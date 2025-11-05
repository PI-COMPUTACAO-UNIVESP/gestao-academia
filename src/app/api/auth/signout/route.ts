import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.json(
            { message: 'Signed out successfully' },
            { status: 200 },
        );

        response.cookies.set('userId', '', {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 0,
        });

        return response;
    } catch (error) {
        console.error('Sign out error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
