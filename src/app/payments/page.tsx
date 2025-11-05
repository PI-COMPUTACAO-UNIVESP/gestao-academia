import { formatDate } from '@/utils/format';
import Link from 'next/link';
import Image from 'next/image';
import { getPayments, deletePayment } from './actions';
import { getCurrentUser } from '@/lib/auth';

const SVG_TRASH_BIN = '/trash-bin-trash-svgrepo-com.svg';

export default async function PaymentsPage() {
    const payments = await getPayments();
    const currentUser = await getCurrentUser();
    const isAdmin = currentUser?.profile === 'Administrador';

    return (
        <main
            className='container'
            role="main"
            aria-labelledby="payments-heading"
        >
            <article>
                <header>
                    <h2 id="payments-heading">Pagamentos</h2>
                </header>
                <table aria-label="Lista de pagamentos" role="grid">
                    <thead>
                        <tr>
                            <th scope="col">Data do Pagamento</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Válido até</th>
                            <th scope="col">Membro</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{formatDate(payment.paymentDate)}</td>
                                <td>R$ {payment.amount.toString()}</td>
                                <td>{formatDate(payment.validUntil)}</td>
                                <td>
                                    <Link
                                        href={`/members/${payment.member.id}`}
                                    >
                                        {payment.member.firstName}{' '}
                                        {payment.member.lastName}
                                    </Link>
                                </td>
                                <td>
                                    {isAdmin && (
                                        <form
                                            action={async () => {
                                                'use server';
                                                await deletePayment(payment.id);
                                            }}
                                            style={{ display: 'inline' }}
                                        >
                                            <button
                                                type="submit"
                                                className="secondary"
                                                title="Excluir"
                                                aria-label="Excluir pagamento"
                                                data-tooltip="Excluir"
                                                style={{
                                                    padding: '0.5rem',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <Image
                                                    src={SVG_TRASH_BIN}
                                                    alt="Excluir"
                                                    width={24}
                                                    height={24}
                                                />
                                            </button>
                                        </form>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isAdmin && (
                    <footer>
                        <Link
                            href="/payments/new"
                            role="button"
                        >
                            Adicionar pagamento
                        </Link>
                    </footer>
                )}
            </article>
        </main>
    );
}
