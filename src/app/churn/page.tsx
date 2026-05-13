import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import ChurnForm from './ChurnForm';

export default async function ChurnPage() {
    const admin = await isAdmin();

    if (!admin) {
        redirect('/');
    }

    return (
        <main
            className='container'
            aria-labelledby='churn-heading'
        >
            <article>
                <header>
                    <h2 id='churn-heading'>Previsão de Cancelamento (Churn)</h2>
                    <p>
                        Consulte a nossa Inteligência Artificial para descobrir
                        a probabilidade de um membro cancelar seu plano, baseada
                        na sua frequência e no histórico de pagamentos.
                    </p>
                </header>
                <ChurnForm />
            </article>
        </main>
    );
}
