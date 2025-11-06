'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
    const pathname = usePathname();
    const { user, signOut } = useAuth();

    return (
        <header>
            <div className='container'>
                <h1
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <Image
                        src='/chart-2-svgrepo-com.svg'
                        alt='Logo'
                        width={32}
                        height={32}
                    />
                    Gestão de academias
                </h1>
                <nav aria-label='Menu principal'>
                    <ul
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',
                        }}
                    >
                        <li>
                            <Link
                                href='/'
                                aria-current={
                                    pathname === '/' ?
                                        'page' :
                                        undefined
                                }
                            >
                                Início
                            </Link>
                        </li>
                        {user?.profile === 'Administrador' && (
                            <>
                                <li>
                                    <Link
                                        href='/users'
                                        aria-current={
                                            pathname?.startsWith('/users') ?
                                                'page' :
                                                undefined
                                        }
                                    >
                                        Usuários
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/payments'
                                        aria-current={
                                            pathname?.startsWith('/payments') ?
                                                'page' :
                                                undefined
                                        }
                                    >
                                        Pagamentos
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link
                                href='/members'
                                aria-current={
                                    pathname?.startsWith('/members') ?
                                        'page' :
                                        undefined
                                }
                            >
                                Membros
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/attendances'
                                aria-current={
                                    pathname?.startsWith('/attendances') ?
                                        'page' :
                                        undefined
                                }
                            >
                                Presenças
                            </Link>
                        </li>
                    </ul>
                    <Link
                        href='/'
                        onClick={signOut}
                        aria-label='Sair do sistema'
                    >
                        Sair
                    </Link>
                </nav>
            </div>
        </header>
    );
}
