'use server';

import { getCurrentUser, isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPayment(formData: FormData) {
    const userIsAdmin = await isAdmin();
    if (!userIsAdmin) {
        redirect('/');
    }

    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.profile !== 'Administrador') {
        return { success: false, error: 'Não autorizado' };
    }

    const memberId = formData.get('memberId') as string;
    const paymentDate = formData.get('paymentDate') as string;
    const amount = formData.get('amount') as string;
    const validUntil = formData.get('validUntil') as string;

    if (!memberId || !paymentDate || !amount || !validUntil) {
        return {
            success: false,
            error: 'Todos os campos são obrigatórios',
        };
    }

    try {
        await prisma.payment.create({
            data: {
                memberId,
                paymentDate: new Date(paymentDate),
                amount: parseFloat(amount),
                validUntil: new Date(validUntil),
            },
        });
    } catch (error) {
        console.error('Error creating payment:', error);
        return { success: false, error: 'Erro ao criar pagamento' };
    }

    revalidatePath('/payments');
    redirect('/payments');
}
