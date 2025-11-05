'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/auth';

export async function getUser(id: string) {
    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
        redirect('/');
    }

    return prisma.user.findUnique({ where: { id } });
}

export async function updateUser(id: string, formData: FormData) {
    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
        redirect('/');
    }

    const data: {
        name: string;
        email: string;
        profile: string;
        password?: string;
    } = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        profile: formData.get('profile') as string,
        password: formData.get('password') as string,
    };

    if (data.password?.trim() === '') {
        delete data.password;
    }

    await prisma.user.update({
        where: { id },
        data,
    });

    revalidatePath('/users');
    redirect('/users');
}

export async function deleteUser(id: string) {
    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
        redirect('/');
    }

    await prisma.user.delete({ where: { id } });

    revalidatePath('/users');
    redirect('/users');
}
