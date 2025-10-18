'use client';

import { useRef } from 'react';

export default function SignIn() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    return <dialog ref={dialogRef} open>
        <article>
            <header>
                <h2>Login</h2>
            </header>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Digite seu email"
                        required
                    />
                </label>
                <label htmlFor="password">
                    Senha:
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Digite sua senha"
                        required
                    />
                </label>
                <button type="submit">Entrar</button>
            </form>
        </article>
    </dialog>;
}
