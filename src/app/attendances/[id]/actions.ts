'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Class, Member } from '@prisma/client';

type ClassWithAttendances = Class & {
    attendances: Array<{
        member: Member;
    }>;
};

export async function getClass(
    id: string,
): Promise<ClassWithAttendances | null> {
    try {
        return await prisma.class.findUnique({
            where: { id },
            include: {
                attendances: {
                    include: {
                        member: true,
                    },
                    orderBy: {
                        member: {
                            firstName: 'asc',
                        },
                    },
                },
            },
        });
    } catch (_error) {
        return null;
    }
}

export async function updateClass(id: string, formData: FormData) {
    await prisma.class.update({
        where: { id },
        data: {
            type: formData.get('type') as string,
            date: new Date(formData.get('date') as string),
        },
    });

    revalidatePath('/attendances');
    revalidatePath(`/attendances/${id}`);
    redirect('/attendances');
}

export async function deleteClass(id: string) {
    await prisma.class.delete({
        where: { id },
    });

    revalidatePath('/attendances');
    redirect('/attendances');
}

export async function searchMembers(query: string): Promise<Array<Member>> {
    if (!query || query.length < 2) {
        return [];
    }

    try {
        return await prisma.member.findMany({
            where: {
                OR: [
                    {
                        firstName: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        lastName: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            take: 10,
            orderBy: {
                firstName: 'asc',
            },
        });
    } catch (_error) {
        return [];
    }
}

export async function addAttendance(classId: string, memberId: string) {
    try {
        await prisma.attendance.create({
            data: {
                classId,
                memberId,
            },
        });

        revalidatePath(`/attendances/${classId}`);
        return { success: true };
    } catch (_error) {
        return { success: false, error: 'Membro já registrado nesta aula' };
    }
}

export async function removeAttendance(
    classId: string,
    memberId: string,
) {
    await prisma.attendance.delete({
        where: {
            classId_memberId: {
                classId,
                memberId,
            },
        },
    });

    revalidatePath(`/attendances/${classId}`);
}
