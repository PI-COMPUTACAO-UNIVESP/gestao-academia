import { render, screen } from '@testing-library/react';
import SignIn from './page';
import AuthProvider from '../../context/AuthProvider';

describe('Sign in page', () => {
    it('renders the sign in form', () => {
        render(
            <AuthProvider>
                <SignIn />
            </AuthProvider>,
        );
        const form = screen.getByRole('form', { name: /sign in form/i });
        expect(form).toBeInTheDocument();
    });
});
