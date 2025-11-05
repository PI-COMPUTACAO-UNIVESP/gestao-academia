import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, isAuthError } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const authResult = await requireAuth(request);

        if (isAuthError(authResult)) {
            return authResult;
        }

        return NextResponse.json(authResult, { status: 200 });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
