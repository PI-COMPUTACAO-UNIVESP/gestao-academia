'use client';

import { Member } from '@prisma/client';
import { useState } from 'react';
import { MemberSearch } from './MemberSearch';
import { createPayment } from './actions';
import Link from 'next/link';

const DAYS_30_IN_MS = 30 * 24 * 60 * 60 * 1000;

export default function NewPaymentPage() {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [error, setError] = useState<string>('');
    const [validUntil, setValidUntil] = useState<string>('');

    const handlePaymentDateChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const paymentDate = e.target.value;
        if (paymentDate) {
            const date = new Date(paymentDate + 'T00:00:00');
            const futureDate = new Date(date.getTime() + DAYS_30_IN_MS);
            const validUntilDate = futureDate.toISOString().split('T')[0];
            setValidUntil(validUntilDate);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        if (!selectedMember) {
            setError('Por favor, selecione um membro');
            return;
        }

        formData.append('memberId', selectedMember.id);
        const result = await createPayment(formData);

        if (result && !result.success) {
            setError(result.error || 'Erro ao criar pagamento');
        }
    };

    return (
        <main className='container'>
            <article>
                <header>
                    <h2 id='payment-heading'>Novo Pagamento</h2>
                </header>

                {error && (
                    <p
                        style={{ color: 'red', marginBottom: '1rem' }}
                    >
                        {error}
                    </p>
                )}

                <form action={handleSubmit} aria-labelledby='payment-heading'>
                    <MemberSearch
                        onSelectMember={setSelectedMember}
                        selectedMember={selectedMember}
                    />

                    <label htmlFor='paymentDate'>
                        Data do Pagamento
                        <input
                            type='date'
                            id='paymentDate'
                            name='paymentDate'
                            required
                            onChange={handlePaymentDateChange}
                        />
                    </label>

                    <label htmlFor='amount'>
                        Valor (R$)
                        <input
                            type='number'
                            id='amount'
                            name='amount'
                            step='0.01'
                            min='0'
                            required
                            placeholder='0.00'
                        />
                    </label>

                    <label htmlFor='validUntil'>
                        Válido até
                        <input
                            type='date'
                            id='validUntil'
                            name='validUntil'
                            required
                            value={validUntil}
                            onChange={(e) => setValidUntil(e.target.value)}
                        />
                    </label>

                    <footer aria-label='Ações do formulário'>
                        <button
                            type='submit'
                            disabled={!selectedMember}
                            aria-label='Salvar novo pagamento'
                        >
                            Salvar
                        </button>
                        <Link
                            href='/payments'
                            role='button'
                            className='secondary'
                            aria-label={
                                'Cancelar e voltar para lista ' +
                                'de pagamentos'
                            }
                        >
                            Cancelar
                        </Link>
                    </footer>
                </form>
            </article>
        </main>
    );
}
