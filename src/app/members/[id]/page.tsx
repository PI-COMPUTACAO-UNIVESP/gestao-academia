'use server';

import { redirect } from 'next/navigation';
import { formatDateForInput } from '@/utils/format';
import Link from 'next/link';
import { deleteMember, getMember, updateMember } from './actions';
import { getCurrentUser } from '@/lib/auth';

type Props = {
    params: Promise<{ id: string }>,
};

export default async function Page({ params }: Props) {
    const currentUser = await getCurrentUser();
    const isAdmin = currentUser?.profile === 'Administrador';

    const { id } = await params;
    const member = await getMember(id);

    if (!member) {
        redirect('/members');
    }

    const updateMemberWithId = updateMember.bind(null, id);
    const deleteMemberWithId = deleteMember.bind(null, id);

    return (
        <main className='container'>
            <article>
                <header>
                    <nav aria-label='Breadcrumb'>
                        <ul>
                            <li>
                                <Link
                                    href='/members'
                                    role='button'
                                    className='secondary outline'
                                    aria-label='Voltar para lista de membros'
                                >
                                    &lt; Voltar
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <h2 id='form-heading'>Visualizar Membro</h2>
                </header>

                <form
                    action={updateMemberWithId}
                    aria-labelledby='form-heading'
                >
                    <div className='grid'>
                        <label htmlFor='firstName' id='firstName-label'>
                            Nome
                            <input
                                type='text'
                                id='firstName'
                                name='firstName'
                                placeholder='Nome'
                                defaultValue={member.firstName}
                                required
                                aria-required='true'
                                aria-labelledby='firstName-label'
                                aria-invalid={false}
                            />
                        </label>

                        <label htmlFor='lastName' id='lastName-label'>
                            Sobrenome
                            <input
                                type='text'
                                id='lastName'
                                name='lastName'
                                placeholder='Sobrenome'
                                defaultValue={member.lastName}
                                required
                                aria-required='true'
                                aria-labelledby='lastName-label'
                                aria-invalid={false}
                            />
                        </label>
                    </div>

                    <label htmlFor='birthDate' id='birthDate-label'>
                        Data de Nascimento
                        <input
                            type='date'
                            id='birthDate'
                            name='birthDate'
                            defaultValue={formatDateForInput(member.birthDate)}
                            required
                            aria-required='true'
                            aria-labelledby='birthDate-label'
                            aria-invalid={false}
                        />
                    </label>

                    <label htmlFor='phone' id='phone-label'>
                        Telefone
                        <input
                            type='tel'
                            id='phone'
                            name='phone'
                            placeholder='Telefone'
                            defaultValue={member.phone}
                            required
                            aria-required='true'
                            aria-labelledby='phone-label'
                            aria-invalid={false}
                        />
                    </label>

                    <label htmlFor='email' id='email-label'>
                        Email
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Email'
                            defaultValue={member.email}
                            required
                            aria-required='true'
                            aria-labelledby='email-label'
                            aria-invalid={false}
                        />
                    </label>

                    <footer
                        className='grid'
                        aria-label='Ações do formulário'
                    >
                        <div className='grid'>
                            <button
                                type='submit'
                                aria-label='Salvar alterações no cadastro'
                                disabled={!isAdmin}
                            >
                                Salvar
                            </button>

                            <button
                                type='submit'
                                onClick={deleteMemberWithId}
                                className='secondary'
                                aria-label='Excluir este membro'
                                disabled={!isAdmin}
                            >
                                Excluir
                            </button>
                        </div>
                    </footer>
                </form>
            </article>
        </main>
    );
}
