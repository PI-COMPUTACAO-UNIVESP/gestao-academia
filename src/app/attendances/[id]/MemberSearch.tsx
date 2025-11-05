'use client';

import { Member } from '@prisma/client';
import { useState } from 'react';
import { addAttendance, searchMembers } from './actions';

type MemberSearchProps = {
    classId: string;
    currentMembers: Array<{ member: { id: string } }>;
};

export function MemberSearch({
    classId,
    currentMembers,
}: MemberSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Array<Member>>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [message, setMessage] = useState('');

    const handleSearch = async (searchQuery: string) => {
        setQuery(searchQuery);
        setMessage('');

        if (searchQuery.length < 2) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        const members = await searchMembers(searchQuery);
        setResults(members);
        setIsSearching(false);
    };

    const handleAddMember = async (memberId: string) => {
        const result = await addAttendance(classId, memberId);

        if (result.success) {
            setMessage('Membro adicionado com sucesso!');
            setQuery('');
            setResults([]);
        } else {
            setMessage(result.error || 'Erro ao adicionar membro');
        }

        setTimeout(() => setMessage(''), 3000);
    };

    const currentMemberIds = currentMembers.map((m) => m.member.id);

    return (
        <div>
            <label htmlFor="member-search" id="search-label">
                Buscar Membro por Nome
                <input
                    type="text"
                    id="member-search"
                    placeholder="Digite o nome do membro"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    aria-labelledby="search-label"
                    autoComplete="off"
                />
            </label>

            {message && (
                <p
                    role="status"
                    aria-live="polite"
                    style={{
                        color: message.includes('sucesso') ?
                            'green' :
                            'red',
                    }}
                >
                    {message}
                </p>
            )}

            {isSearching && <p>Buscando...</p>}

            {results.length > 0 && (
                <div
                    style={{
                        marginTop: '1rem',
                        border: '1px solid var(--muted-border-color)',
                        borderRadius: 'var(--border-radius)',
                    }}
                >
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((member) => {
                                const isAlreadyAdded =
                                    currentMemberIds.includes(member.id);
                                return (
                                    <tr key={member.id}>
                                        <td>
                                            {member.firstName}{' '}
                                            {member.lastName}
                                        </td>
                                        <td>{member.email}</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleAddMember(member.id)
                                                }
                                                disabled={isAlreadyAdded}
                                                className="secondary"
                                                style={{
                                                    padding:
                                                        '0.5rem 1rem',
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                {isAlreadyAdded ?
                                                    'Já adicionado' :
                                                    'Adicionar'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {query.length >= 2 && !isSearching && results.length === 0 && (
                <p>Nenhum membro encontrado.</p>
            )}
        </div>
    );
}
