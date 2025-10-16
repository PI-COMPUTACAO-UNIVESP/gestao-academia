import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
    it('renders the athletes image', () => {
        render(<Home />);
        const image = screen.getByAltText('Pessoas praticando exercícios');
        expect(image).toBeInTheDocument();
    });
});
