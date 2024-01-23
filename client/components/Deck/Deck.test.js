import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Deck from './Deck';

// Mocking fetch to simulate API call
jest.mock('node-fetch');

describe('Deck Component Tests', () => {
  // Mock data for testing
  const mockDeck = {
    _id: 'mockDeckId',
    deckName: 'Test Deck',
  };

  // Test rendering
  test('renders Deck component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Deck deck={mockDeck} index={0} />
        </MemoryRouter>
      </Provider>
    );

    // Assert that the deck name is rendered
    expect(screen.getByText('Test Deck')).toBeInTheDocument();
  });

  // Test clicking into deck
  test('navigates to deck details on deck click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Deck deck={mockDeck} index={0} />
        </MemoryRouter>
      </Provider>
    );

    // Simulate click on the deck color
    fireEvent.click(screen.getByTestId('deckColor'));

    // Assert that navigation occurred
    expect(window.location.pathname).toBe('/deck/mockDeckId');
  });

  // Test deck deletion
  test('deletes a deck on delete button click', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Deck deck={mockDeck} index={0} />
        </MemoryRouter>
      </Provider>
    );

    // Simulate click on the delete button
    fireEvent.click(screen.getByText('Delete'));

    // Wait for fetch and assert that it was called with the correct arguments
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/deck/mockDeckId',
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );
    });

    // Assert that getDecks function is invoked
    expect(getDecks).toHaveBeenCalled();
  });
});


