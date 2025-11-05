'use server';

import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { isAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function getUsers(): Promise<Array<User>> {
    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
        redirect('/');
    }

    try {
        return await prisma.user.findMany({
            orderBy: {
                name: 'asc',
            },
        });
    } catch (_error) {
        return [];
    }
}
