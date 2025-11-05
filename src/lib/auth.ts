import { NextRequest } from 'next/server';
import { User } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'password'>;

/**
 * Get the authenticated user from the request headers.
 * The middleware adds user data to headers after authentication.
 * @param request - The Next.js request object
 * @returns The user object without password, or null if not found
 */
export function getAuthenticatedUser(
    request: NextRequest,
): UserWithoutPassword | null {
    try {
        const userDataHeader = request.headers.get('x-user-data');

        if (!userDataHeader) {
            return null;
        }

        return JSON.parse(userDataHeader) as UserWithoutPassword;
    } catch (error) {
        console.error('Error parsing user data from headers:', error);
        return null;
    }
}
