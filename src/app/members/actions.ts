'use server';

import { prisma } from '@/lib/prisma';
import { Member } from '@prisma/client';

export async function getMembers(): Promise<Array<Member>> {
    try {
        return await prisma.member.findMany({
            orderBy: {
                firstName: 'asc',
            },
        });
    } catch (_error) {
        return [];
    }
}
