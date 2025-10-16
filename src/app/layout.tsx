import type { Metadata, Viewport } from 'next';
import './globals.css';
import Nav from '../components/Nav';
import AuthProvider from '../context/AuthProvider';

export const metadata: Metadata = {
    title: 'Gym management',
    description: 'Manage your gym effectively',
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
        <html lang="en">
            <body className='container'>
                <AuthProvider>
                    <Nav />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
