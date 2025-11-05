'use server';

import Link from 'next/link';
import { createClass } from './actions';

export default async function NewClassPage() {
    return (
        <main className='container'>
            <article>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link
                                    href="/attendances"
                                    role="button"
                                    className="secondary outline"
                                >
                                    &lt; Voltar
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <h2 id="new-class-heading">Nova Aula</h2>
                </header>

                <form
                    action={createClass.bind(null)}
                    aria-labelledby="new-class-heading"
                >
                    <label htmlFor="type" id="type-label">
                        Tipo da Aula
                        <select
                            id="type"
                            name="type"
                            required
                            aria-required="true"
                            aria-labelledby="type-label"
                            aria-invalid={false}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Selecione o tipo (ex: Dança, Karatê, Boxe)
                            </option>
                            <option value="Dança">Dança</option>
                            <option value="Karatê">Karatê</option>
                            <option value="Boxe">Boxe</option>
                            <option value="Judô">Judô</option>
                            <option value="Muay Thai">Muay Thai</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Pilates">Pilates</option>
                            <option value="Funcional">Funcional</option>
                        </select>
                    </label>

                    <label htmlFor="date" id="date-label">
                        Data e Hora
                        <input
                            type="datetime-local"
                            id="date"
                            name="date"
                            step="1800"
                            required
                            aria-required="true"
                            aria-labelledby="date-label"
                            aria-invalid={false}
                        />
                    </label>

                    <footer role="group" aria-label="Ações do formulário">
                        <button
                            type="submit"
                            aria-label="Cadastrar nova aula"
                        >
                            Cadastrar aula
                        </button>
                    </footer>
                </form>
            </article>
        </main>
    );
}
