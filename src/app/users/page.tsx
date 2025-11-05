import { formatDate } from '@/utils/format';
import { User } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { getUsers } from './actions';
import { getCurrentUser } from '@/lib/auth';

export default async function UsersPage() {
    const users: Array<User> = await getUsers();
    const currentUser = await getCurrentUser();
    const isAdmin = currentUser?.profile === 'Administrador';

    return (
        <main
            className='container'
            role="main"
            aria-labelledby="users-heading"
        >
            <article>
                <header>
                    <h2 id="users-heading">Usuários</h2>
                </header>
                <table aria-label="Lista de usuários do sistema" role="grid">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Perfil</th>
                            <th scope="col">Data de criação</th>
                            {isAdmin && <th scope="col">Ações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.profile}</td>
                                <td>{formatDate(user.createdAt)}</td>
                                {isAdmin && (
                                    <td>
                                        <Link
                                            href={`/users/${user.id}`}
                                            title="Editar"
                                            aria-label={
                                                'Editar detalhes do usuário'
                                            }
                                            data-tooltip="Editar"
                                        >
                                            <Image
                                                src={
                                                    '/square-top-up-' +
                                                    'svgrepo-com.svg'
                                                }
                                                alt="Editar"
                                                width={24}
                                                height={24}
                                            />
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isAdmin && (
                    <footer>
                        <Link
                            href="/users/new"
                            role="button"
                        >
                            Adicionar usuário
                        </Link>
                    </footer>
                )}
            </article>
        </main>
    );
}
