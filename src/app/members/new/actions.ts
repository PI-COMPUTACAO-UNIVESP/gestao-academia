'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createMember(formData: FormData) {
    await prisma.member.create({
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
