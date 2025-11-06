'use server';

import Link from 'next/link';
import { createMember } from './actions';

export default async function NewMemberPage() {
    return (
        <main className='container'>
            <article>
                <header>
                    <nav aria-label="Breadcrumb">
                        <ul>
                            <li>
                                <Link
                                    href="/members"
                                    role="button"
                                    className="secondary outline"
                                    aria-label="Voltar para lista de membros"
                                >
                                    &lt; Voltar
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <h2 id="new-member-heading">Novo Membro</h2>
                </header>

                <form
                    action={createMember.bind(null)}
                    aria-labelledby="new-member-heading"
                >
                    <div
                        className="grid"
                        aria-label="Informações pessoais"
                    >
                        <label htmlFor="firstName" id="firstName-label">
                            Nome
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Nome"
                                required
                                aria-required="true"
                                aria-labelledby="firstName-label"
                                aria-invalid={false}
                            />
                        </label>

                        <label htmlFor="lastName" id="lastName-label">
                            Sobrenome
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Sobrenome"
                                required
                                aria-required="true"
                                aria-labelledby="lastName-label"
                                aria-invalid={false}
                            />
                        </label>
                    </div>

                    <label htmlFor="birthDate" id="birthDate-label">
                        Data de Nascimento
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            required
                            aria-required="true"
                            aria-labelledby="birthDate-label"
                            aria-invalid={false}
                        />
                    </label>

                    <label htmlFor="phone" id="phone-label">
                        Telefone
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Telefone"
                            required
                            aria-required="true"
                            aria-labelledby="phone-label"
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

                    <footer aria-label="Ações do formulário">
                        <button
                            type="submit"
                            aria-label="Adicionar novo membro à academia"
                        >
                            Adicionar novo membro
                        </button>
                    </footer>
                </form>
            </article>
        </main>
    );
}
