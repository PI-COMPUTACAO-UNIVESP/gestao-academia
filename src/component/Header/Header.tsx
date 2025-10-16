'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export const navigationLinks = [
    { href: '/members', label: 'Membros' },
    { href: '/planos', label: 'Planos' },
    { href: '/relatorios', label: 'Relatórios' },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className={`container-fluid ${styles.header}`} role="banner">
            <nav
                className="container"
                role="navigation"
                aria-label="Navegação principal"
            >
                <ul>
                    <li>
                        <Link
                            href="/"
                            className={styles.logo}
                            aria-label="Gestão Academia - Página inicial"
                        >
                            <Image
                                src="/clipboard-heart-svgrepo-com.svg"
                                alt=""
                                width={32}
                                height={32}
                                className={styles.logoImage}
                                priority
                            />
                            <strong>Gestão Academia</strong>
                        </Link>
                    </li>
                </ul>
                <ul>
                    {navigationLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                aria-current={
                                    pathname === link.href ? 'page' : undefined
                                }
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
