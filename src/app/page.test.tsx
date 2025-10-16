import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
    it('shows the GYM MANAGEMENT text', () => {
        render(<Home />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent('GYM MANAGEMENT');
    });
});
