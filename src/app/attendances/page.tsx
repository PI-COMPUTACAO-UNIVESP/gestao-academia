import { formatDateTime } from '@/utils/format';
import Link from 'next/link';
import Image from 'next/image';
import { getClasses } from './actions';

export default async function AttendancesPage() {
    const classes = await getClasses();

    return (
        <main
            className='container'
            role="main"
            aria-labelledby="attendances-heading"
        >
            <article>
                <header>
                    <h2 id="attendances-heading">Aulas e Presenças</h2>
                    <p>
                        Gerencie as aulas cadastradas e controle a presença
                        dos alunos.
                    </p>
                </header>
                <table aria-label="Lista de aulas" role="grid">
                    <thead>
                        <tr>
                            <th scope="col">Tipo</th>
                            <th scope="col">Data e Hora</th>
                            <th scope="col">Presenças</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((classItem) => (
                            <tr key={classItem.id}>
                                <td>{classItem.type}</td>
                                <td>{formatDateTime(classItem.date)}</td>
                                <td>{classItem._count.attendances}</td>
                                <td>
                                    <Link
                                        href={`/attendances/${classItem.id}`}
                                        title="Gerenciar presenças"
                                        aria-label="Gerenciar presenças da aula"
                                        data-tooltip="Gerenciar"
                                    >
                                        <Image
                                            src="/square-top-up-svgrepo-com.svg"
                                            alt="Gerenciar"
                                            width={24}
                                            height={24}
                                        />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <footer>
                    <Link
                        href="/attendances/new"
                        role="button"
                    >
                        Cadastrar nova aula
                    </Link>
                </footer>
            </article>
        </main>
    );
}
