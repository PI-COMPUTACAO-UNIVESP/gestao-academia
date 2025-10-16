'use client';

import { useAuth } from '../../context/AuthProvider';

export default function SignIn() {
    const { signIn } = useAuth();

    return (
        <main className="container" aria-labelledby="signin-heading">
            <h1 id="signin-heading">Sign in</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    signIn();
                }}
                aria-label="sign in form">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required />

                <button type="submit">Sign in</button>
            </form>
        </main>
    );
}
