'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function getMember(id: string) {
    return prisma.member.findUnique({ where: { id } });
}

export async function updateMember(id: string, formData: FormData) {
    await prisma.member.update({
        where: { id },
        data: {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            birthDate: new Date(formData.get('birthDate') as string),
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
        },
    });

    revalidatePath('/members');
    redirect('/members');
}

export async function deleteMember(id: string) {
    await prisma.member.delete({ where: { id } });

    revalidatePath('/members');
    redirect('/members');
}
