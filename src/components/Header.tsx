'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    return (
        <header role="banner">
            <div className="container">
                <h1>Gestão de academias</h1>
                <nav aria-label="Menu principal">
                    <ul role="menubar">
                        <li role="menuitem">
                            <Link
                                href="/"
                                aria-current={
                                    pathname === '/' ?
                                        'page' :
                                        undefined
                                }
                            >
                                Início
                            </Link>
                        </li>
                        <li role="menuitem">
                            <Link
                                href="/members"
                                aria-current={
                                    pathname?.startsWith('/members') ?
                                        'page' :
                                        undefined
                                }
                            >
                                Membros
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}


