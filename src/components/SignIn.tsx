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

    if (loading || user) {
        return null;
    }

    return <dialog
        ref={dialogRef}
        open
        aria-labelledby="login-heading"
    >
        <article>
            <header>
                <h2 id="login-heading">Login</h2>
            </header>
            <form
                onSubmit={handleSubmit(onSubmit)}
                aria-labelledby="login-heading"
            >
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
                        aria-describedby={
                            errors.email ? 'email-error' : undefined
                        }
                        {...register('email', {
                            required: 'Email é obrigatório',
                        })}
                    />
                    {errors.email && (
                        <small
                            id="email-error"
                            style={{ color: 'red' }}
                        >
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
                        aria-describedby={
                            errors.password ?
                                'password-error' :
                                undefined
                        }
                        {...register('password', {
                            required: 'Senha é obrigatória',
                        })}
                    />
                    {errors.password && (
                        <small
                            id="password-error"
                            style={{ color: 'red' }}
                        >
                            {errors.password.message}
                        </small>
                    )}
                </label>
                <button
                    type="submit"
                    aria-label="Fazer login no sistema"
                >
                    Entrar
                </button>
            </form>
        </article>
    </dialog>;
}
