import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import DeckContainer from './DeckContainer';
import { useSelector } from 'react';

// Mocking fetch to simulate API call
jest.mock('node-fetch');

describe('DeckContainer Component Tests', () => {
  // Mock data for testing
  const mockDecks = [
    { _id: 'deck1', deckName: 'Deck 1', cards: [] },
    { _id: 'deck2', deckName: 'Deck 2', cards: [] },
  ];

  // Mock useSelector to return mockDecks
  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
  }));

  beforeEach(() => {
    // Reset the mock implementation before each test
    useSelector.mockImplementation(() => mockDecks);
  });

  // Test rendering
  test('renders DeckContainer component with decks', () => {
    render(
      <Provider store={store}>
        <DeckContainer />
      </Provider>
    );

    // Assert that deck names are rendered
    expect(screen.getByText('Deck 1')).toBeInTheDocument();
    expect(screen.getByText('Deck 2')).toBeInTheDocument();
  });

  // Test adding a new deck
  test('adds a new deck on form submission', async () => {
    render(
      <Provider store={store}>
        <DeckContainer />
      </Provider>
    );

    // Simulate entering a new deck name
    fireEvent.change(screen.getByPlaceholderText('Enter deck name'), {
      target: { value: 'New Deck' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText('Add'));

    // Wait for fetch and assert that it was called with the correct arguments
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String),
      });
    });

    // Assert that getDecks function is invoked
    expect(getDecks).toHaveBeenCalled();
  });
});
