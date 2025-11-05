'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';

interface SignInFormData {
    email: string;
    password: string;
}

export default function SignIn() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [error, setError] = useState('');
    const { user, signIn, loading } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>();

    const onSubmit = async (data: SignInFormData) => {
        setError('');

        const result = await signIn(data.email, data.password);

        if (!result) {
            setError('Email ou senha inválidos');
        } else if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    // Don't show if user is already signed in or still loading
    if (loading || user) {
        return null;
    }

    return <dialog ref={dialogRef} open>
        <article>
            <header>
                <h2>Login</h2>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <p style={{ color: 'red', marginBottom: '1rem' }}>
                        {error}
                    </p>
                )}
                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu email"
                        {...register('email', {
                            required: 'Email é obrigatório',
                        })}
                    />
                    {errors.email && (
                        <small style={{ color: 'red' }}>
                            {errors.email.message}
                        </small>
                    )}
                </label>
                <label htmlFor="password">
                    Senha:
                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha"
                        {...register('password', {
                            required: 'Senha é obrigatória',
                        })}
                    />
                    {errors.password && (
                        <small style={{ color: 'red' }}>
                            {errors.password.message}
                        </small>
                    )}
                </label>
                <button type="submit">Entrar</button>
            </form>
        </article>
    </dialog>;
}
