import { formatDate } from '@/utils/format';
import { Member } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { getMembers } from './actions';

export default async function HomePage() {
    const members: Array<Member> = await getMembers();

    return (
        <main
            className='container'
            role="main"
            aria-labelledby="members-heading"
        >
            <article>
                <header>
                    <h2 id="members-heading">Membros</h2>
                </header>
                <table aria-label="Lista de membros da academia" role="grid">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Data de nascimento</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id}>
                                <td>{member.firstName} {member.lastName}</td>
                                <td>{formatDate(member.birthDate)}</td>
                                <td>{member.phone}</td>
                                <td>{member.email}</td>
                                <td>
                                    <Link
                                        href={`/members/${member.id}`}
                                        title="Editar"
                                        aria-label="Editar detalhes do membro"
                                        data-tooltip="Editar"
                                    >
                                        <Image
                                            src="/square-top-up-svgrepo-com.svg"
                                            alt="Editar"
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
                        href="/members/new"
                        role="button"
                    >
                        Adicionar membro
                    </Link>
                </footer>
            </article>
        </main>
    );
}
