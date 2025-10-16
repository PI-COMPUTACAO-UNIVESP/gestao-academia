'use client';
import React from 'react';

type AuthContextValue = {
    loggedIn: boolean;
    signIn: () => void;
    signOut: () => void;
};

const AuthContext = React.createContext<
    AuthContextValue | undefined
>(undefined);

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const signIn = () => setLoggedIn(true);
    const signOut = () => setLoggedIn(false);

    return (
        <AuthContext.Provider value={{ loggedIn, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = React.useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
