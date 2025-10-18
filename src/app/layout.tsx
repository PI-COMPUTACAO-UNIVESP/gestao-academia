import './globals.css';
import type { Metadata, Viewport } from 'next';
import SignIn from '@/components/SignIn';
import Header from '@/components/Header';

export const metadata: Metadata = {
    title: 'Gestão de academias',
    description: 'Sistema de gestão para academias',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'light dark',
};

export default function RootLayout(
    { children }: Readonly<{ children: React.ReactNode }>,
) {
    return (
        <html lang="pt-BR">
            <body>
                <SignIn />
                <Header />
                {children}
            </body>
        </html>
    );
}
