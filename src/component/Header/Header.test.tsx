import { render, screen } from '@testing-library/react';
import Header, { navigationLinks } from './Header';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

describe('Header component', () => {
    it('renders the logo', () => {
        render(<Header />);
        const logo = screen.getByLabelText('Gestão Academia - Página inicial');
        expect(logo).toBeInTheDocument();
    });

    it('renders all navigation links with correct href and label', () => {
        render(<Header />);

        const navLinks = screen.getAllByRole('link').slice(1);

        expect(navLinks).toHaveLength(navigationLinks.length);

        navigationLinks.forEach((link, index) => {
            const renderedLink = navLinks[index];
            expect(renderedLink).toHaveAttribute('href', link.href);
            expect(renderedLink).toHaveTextContent(link.label);
        });
    });

    it('marks the current page as active', () => {
        const activePath = '/members';
        (usePathname as jest.Mock).mockReturnValue(activePath);

        render(<Header />);

        const activeLink = screen.getByText('Membros');

        expect(activeLink.closest('a')).toHaveAttribute('aria-current', 'page');

        navigationLinks
            .filter((link) => link.href !== activePath)
            .forEach((link) => {
                const nonActiveLink = screen.getByText(link.label);
                expect(nonActiveLink.closest('a')).not.toHaveAttribute(
                    'aria-current',
                    'page',
                );
            });
    });
});
