'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthProvider';

export default function Nav() {
    const { loggedIn, signOut } = useAuth();

    return (
        <header role="banner">
            <nav className="container">
                <Link className="contrast" href="/">
                    GYM MANAGEMENT
                </Link>
                {loggedIn ? (
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/clients">Clients</Link>
                        </li>
                        <li>
                            <button onClick={signOut}>Sign out</button>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <Link href="/signin">Sign in</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
}
