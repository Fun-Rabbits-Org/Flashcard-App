import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CardForm from "./CardForm";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { MemoryRouter, Route, Router } from "react-router-dom";
import '@testing-library/jest-dom';

describe('Unit testing CardForm component', () => {

  // Mock data
  const mockDeckId = 'mockDeckId';

  test('renders CardForm component', () => {
    render(
      <Provider store={store}>
        <Router>
            <CardForm />
        </Router>
      </Provider>
    );
    const frontInput = getByPlaceholderText('Front of card');
    const backInput = getByPlaceholderText('Back of card');

    expect(frontInput).toBeInTheDocument();
    expect(backInput).toBeInTheDocument();
  });


  test('submits form data and redirects', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/deck/${mockDeckId}/card`]}>
          <Route path="/deck/:deckId/card">
            <CardForm />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    const frontInput = getByPlaceholderText('Front of card');
    const backInput = getByPlaceholderText('Back of card');

    // Fill in form inputs
    fireEvent.change(frontInput, { target: { value: 'New Front' } });
    fireEvent.change(backInput, { target: { value: 'New Back' } });

    // Submit the form
    fireEvent.submit(getByText('Add Card'));

    // Ensure fetch request is made with the correct data
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:3000/deck/${mockDeckId}/card`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ front: 'New Front', back: 'New Back' }),
      }
    );
    // Ensure navigation occurs
    expect(navigate).toHaveBeenCalledWith(`/deck/${mockDeckId}`);
  });
});
