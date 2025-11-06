'use client';

import { Member } from '@prisma/client';
import { useState } from 'react';
import { searchMembers } from '../actions';

type MemberSearchProps = {
    onSelectMember: (member: Member) => void;
    selectedMember: Member | null;
};

export function MemberSearch({
    onSelectMember,
    selectedMember,
}: MemberSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Array<Member>>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (searchQuery: string) => {
        setQuery(searchQuery);

        if (searchQuery.length < 2) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        const members = await searchMembers(searchQuery);
        setResults(members);
        setIsSearching(false);
    };

    const handleSelectMember = (member: Member) => {
        onSelectMember(member);
        setQuery('');
        setResults([]);
    };

    return (
        <div>
            {!selectedMember && (
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
            )}

            {selectedMember && (
                <div
                    style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        border: '1px solid var(--primary)',
                        borderRadius: 'var(--border-radius)',
                        backgroundColor: 'var(--card-background-color)',
                    }}
                >
                    <p>
                        <strong>Membro selecionado:</strong>{' '}
                        {selectedMember.firstName} {selectedMember.lastName}
                    </p>
                    <button
                        type="button"
                        className="secondary outline"
                        onClick={() =>
                            onSelectMember(null as unknown as Member)
                        }
                        aria-label="Trocar membro selecionado"
                        style={{
                            marginTop: '0.5rem',
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                        }}
                    >
                        Trocar membro
                    </button>
                </div>
            )}

            {isSearching && <p>Buscando...</p>}

            {results.length > 0 && !selectedMember && (
                <div
                    aria-label="Resultados da busca"
                    style={{
                        marginTop: '1rem',
                        border: '1px solid var(--muted-border-color)',
                        borderRadius: 'var(--border-radius)',
                    }}
                >
                    <table aria-label="Membros encontrados">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Email</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((member) => (
                                <tr key={member.id}>
                                    <td>
                                        {member.firstName} {member.lastName}
                                    </td>
                                    <td>{member.email}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSelectMember(member)
                                            }
                                            className="secondary"
                                            aria-label={
                                                `Selecionar ` +
                                                `${member.firstName} ` +
                                                `${member.lastName}`
                                            }
                                            style={{
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            Selecionar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {query.length >= 2 &&
                !isSearching &&
                results.length === 0 &&
                !selectedMember && (
                <p>Nenhum membro encontrado.</p>
            )}
        </div>
    );
}
