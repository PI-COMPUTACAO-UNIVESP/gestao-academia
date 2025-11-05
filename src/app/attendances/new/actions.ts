'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createClass(formData: FormData) {
    const newClass = await prisma.class.create({
        data: {
            type: formData.get('type') as string,
            date: new Date(formData.get('date') as string),
        },
    });

    revalidatePath('/attendances');
    redirect(`/attendances/${newClass.id}`);
}
