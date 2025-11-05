'use server';

import { redirect } from 'next/navigation';
import { formatDateTimeForInput } from '@/utils/format';
import Link from 'next/link';
import {
    deleteClass,
    getClass,
    removeAttendance,
    updateClass,
} from './actions';
import { MemberSearch } from './MemberSearch';
import { getCurrentUser } from '@/lib/auth';

type Props = {
    params: Promise<{ id: string }>;
};

export default async function ClassPage({ params }: Props) {
    const currentUser = await getCurrentUser();
    const isAdmin = currentUser?.profile === 'Administrador';

    const { id } = await params;
    const classData = await getClass(id);

    if (!classData) {
        redirect('/attendances');
    }

    const updateClassWithId = updateClass.bind(null, id);
    const deleteClassWithId = deleteClass.bind(null, id);

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
                    <h2 id="form-heading">Gerenciar Aula</h2>
                </header>

                <form
                    action={updateClassWithId}
                    aria-labelledby="form-heading"
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
                            defaultValue={classData.type}
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
                            defaultValue={formatDateTimeForInput(
                                classData.date,
                            )}
                            step="1800"
                            required
                            aria-required="true"
                            aria-labelledby="date-label"
                            aria-invalid={false}
                        />
                    </label>

                    <footer
                        className='grid'
                        role="group"
                        aria-label="Ações do formulário"
                    >
                        <div className="grid">
                            <button
                                type="submit"
                                aria-label="Salvar alterações na aula"
                            >
                                Salvar
                            </button>

                            <button
                                type="submit"
                                onClick={deleteClassWithId}
                                className="secondary"
                                aria-label="Excluir esta aula"
                                disabled={!isAdmin}
                            >
                                Excluir
                            </button>
                        </div>
                    </footer>
                </form>
            </article>

            <article>
                <header>
                    <h3>Adicionar Membros à Aula</h3>
                </header>
                <MemberSearch
                    classId={id}
                    currentMembers={classData.attendances}
                />
            </article>

            <article>
                <header>
                    <h3>
                        Membros Presentes (
                        {classData.attendances.length})
                    </h3>
                </header>
                {classData.attendances.length === 0 ? (
                    <p>Nenhum membro registrado nesta aula ainda.</p>
                ) : (
                    <table
                        aria-label="Lista de membros presentes"
                        role="grid"
                    >
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classData.attendances.map((attendance) => (
                                <tr key={attendance.member.id}>
                                    <td>
                                        {attendance.member.firstName}{' '}
                                        {attendance.member.lastName}
                                    </td>
                                    <td>{attendance.member.email}</td>
                                    <td>{attendance.member.phone}</td>
                                    <td>
                                        <form
                                            action={removeAttendance.bind(
                                                null,
                                                id,
                                                attendance.member.id,
                                            )}
                                        >
                                            <button
                                                type="submit"
                                                className="secondary outline"
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    fontSize: '0.875rem',
                                                }}
                                                aria-label="Remover membro"
                                            >
                                                Remover
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </article>
        </main>
    );
}
