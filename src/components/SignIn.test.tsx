import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignIn from './SignIn';
import '@testing-library/jest-dom';

describe('SignIn Component', () => {
    it('should close dialog after submitting form', () => {
        render(<SignIn />);

        const closeMock = jest.fn();
        HTMLDialogElement.prototype.close = closeMock;

        const emailInput = screen.getByLabelText(/email:/i);
        const passwordInput = screen.getByLabelText(/senha:/i);
        const submitButton = screen.getByRole('button', { name: /entrar/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'anypassword' } });
        fireEvent.click(submitButton);

        expect(closeMock).toHaveBeenCalledTimes(1);
    });
});
