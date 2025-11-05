'use server';

import { getCurrentUser, isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getPayments() {
    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
        redirect('/');
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/');
    }

    const payments = await prisma.payment.findMany({
        include: {
            member: true,
        },
        orderBy: {
            paymentDate: 'desc',
        },
    });

    return payments;
}

export async function deletePayment(id: string) {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.profile !== 'Administrador') {
        return { success: false, error: 'Não autorizado' };
    }

    try {
        await prisma.payment.delete({
            where: { id },
        });

        revalidatePath('/payments');
        return { success: true };
    } catch (error) {
        console.error('Error deleting payment:', error);
        return { success: false, error: 'Erro ao excluir pagamento' };
    }
}

export async function searchMembers(query: string) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return [];
    }

    const members = await prisma.member.findMany({
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
    });

    return members;
}
