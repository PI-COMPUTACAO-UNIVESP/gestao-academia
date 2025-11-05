'use server';

import { prisma } from '@/lib/prisma';
import { Class } from '@prisma/client';

type ClassWithCount = Class & {
    _count: { attendances: number };
};

export async function getClasses(): Promise<Array<ClassWithCount>> {
    try {
        return await prisma.class.findMany({
            include: {
                _count: {
                    select: { attendances: true },
                },
            },
            orderBy: {
                date: 'desc',
            },
        });
    } catch (_error) {
        return [];
    }
}
