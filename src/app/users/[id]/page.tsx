'use server';

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { deleteUser, getUser, updateUser } from './actions';
import { getCurrentUser } from '@/lib/auth';

type Props = {
    params: Promise<{ id: string }>,
};

export default async function Page({ params }: Props) {
    const { id } = await params;
    const user = await getUser(id);
    const currentUser = await getCurrentUser();
    const isAdmin = currentUser?.profile === 'Administrador';

    if (!user) {
        redirect('/users');
    }

    const updateUserWithId = updateUser.bind(null, id);
    const deleteUserWithId = deleteUser.bind(null, id);

    return (
        <main className='container'>
            <article>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link
                                    href="/users"
                                    role="button"
                                    className="secondary outline"
                                >
                                    &lt; Voltar
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <h2 id="form-heading">Visualizar Usuário</h2>
                </header>

                <form
                    action={updateUserWithId}
                    aria-labelledby="form-heading"
                >
                    <label htmlFor="name" id="name-label">
                        Nome
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nome completo"
                            defaultValue={user.name}
                            required
                            aria-required="true"
                            aria-labelledby="name-label"
                            aria-invalid={false}
                            disabled={!isAdmin}
                        />
                    </label>

                    <label htmlFor="email" id="email-label">
                        Email
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            defaultValue={user.email}
                            required
                            aria-required="true"
                            aria-labelledby="email-label"
                            aria-invalid={false}
                            disabled={!isAdmin}
                        />
                    </label>

                    <label htmlFor="password" id="password-label">
                        Nova Senha (deixe em branco para manter a atual)
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Nova senha"
                            aria-labelledby="password-label"
                            aria-invalid={false}
                            disabled={!isAdmin}
                        />
                    </label>

                    <label htmlFor="profile" id="profile-label">
                        Perfil
                        <select
                            id="profile"
                            name="profile"
                            defaultValue={user.profile}
                            required
                            aria-required="true"
                            aria-labelledby="profile-label"
                            aria-invalid={false}
                            disabled={!isAdmin}
                        >
                            <option>Administrador</option>
                            <option>Professor</option>
                        </select>
                    </label>

                    {isAdmin && (
                        <footer
                            className='grid'
                            role="group"
                            aria-label="Ações do formulário"
                        >
                            <div className="grid">
                                <button
                                    type="submit"
                                    aria-label="Salvar alterações no cadastro"
                                >
                                    Salvar
                                </button>
                                <button
                                    type="submit"
                                    onClick={deleteUserWithId}
                                    className="secondary"
                                    aria-label="Excluir este usuário"
                                >
                                    Excluir
                                </button>
                            </div>
                        </footer>
                    )}
                </form>
            </article>
        </main>
    );
}
