import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/component/Header/Header';

export const metadata: Metadata = {
    title: {
        default: 'Gestão Academia',
        template: '%s | Gestão Academia',
    },
    description: 'Sistema de gestão para academias',
    keywords: [
        'gestao',
        'academia',
    ],
    authors: [{ name: 'Gestão Academia' }],
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
                <Header />
                {children}
            </body>
        </html>
    );
}
