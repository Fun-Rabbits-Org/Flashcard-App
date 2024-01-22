import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import Card from './Card';

// test rendering
test('renders Card component', () => {
    render(<Card />);
});

// test card flipping
test('flips card between front and back when clicked', () => {
    const { getByText } = render(<Card />);
    const flashCard = getByText('Mock Front Text');
    fireEvent.click(flashCard);
    expect(getByText('Mock Back of Card')).toBeInTheDocument();
});

// test navigation buttons


// test delete functionality


    // mock fetch request
