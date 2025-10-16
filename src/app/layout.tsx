import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gym management',
    description: 'Manage your gym effectively',
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
