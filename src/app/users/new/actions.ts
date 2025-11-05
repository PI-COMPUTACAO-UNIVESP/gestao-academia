'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/auth';

export async function createUser(formData: FormData) {
    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
        redirect('/');
    }

    await prisma.user.create({
        data: {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            profile: formData.get('profile') as string,
        },
    });

    revalidatePath('/users');
    redirect('/users');
}
