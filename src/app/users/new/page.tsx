'use server';

import Link from 'next/link';
import { createUser } from './actions';

export default async function NewUserPage() {
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
                    <h2 id="new-user-heading">Novo Usuário</h2>
                </header>

                <form
                    action={createUser.bind(null)}
                    aria-labelledby="new-user-heading"
                >
                    <label htmlFor="name" id="name-label">
                        Nome
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nome completo"
                            required
                            aria-required="true"
                            aria-labelledby="name-label"
                            aria-invalid={false}
                        />
                    </label>

                    <label htmlFor="email" id="email-label">
                        Email
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                            aria-required="true"
                            aria-labelledby="email-label"
                            aria-invalid={false}
                        />
                    </label>

                    <label htmlFor="password" id="password-label">
                        Senha
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Senha"
                            required
                            aria-required="true"
                            aria-labelledby="password-label"
                            aria-invalid={false}
                        />
                    </label>

                    <label htmlFor="profile" id="profile-label">
                        Perfil
                        <select
                            id="profile"
                            name="profile"
                            required
                            aria-required="true"
                            aria-labelledby="profile-label"
                            aria-invalid={false}
                        >
                            <option>Administrador</option>
                            <option>Professor</option>
                        </select>
                    </label>

                    <footer role="group" aria-label="Ações do formulário">
                        <button
                            type="submit"
                            aria-label="Adicionar novo usuário ao sistema"
                        >
                            Adicionar novo usuário
                        </button>
                    </footer>
                </form>
            </article>
        </main>
    );
}
