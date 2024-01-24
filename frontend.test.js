/**
 * @jest-environment jsdom
 */

import React from 'React';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { store } from './client/redux/store';
import App from './client/App';
import { configureStore } from '@reduxjs/toolkit';
import { login } from './client/redux/isLoggedIn';

const initialstate = {
  decks: [],
  currentDeck: [],
  login: {
    isLoggedIn: true,
  },
  user: {},
};

const mockStore = configureStore({
  reducer: {
    login: (state = initialstate.login, action) => state,
  },
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('React-Redux integration tests', () => {
  describe('Empty state before interactions', () => {
    beforeEach(async () => {
      mockStore.dispatch(login(true));
      const currentState = mockStore.getState();
      console.log(currentState.login.isLoggedIn);

      const app = await render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );
    });

    // test('The page loads with Add button', () => {
    //   expect(screen.getByRole('button', { name: 'Sign In' }));
    // });

    test('The page loads with Add button', () => {
      expect(screen.getByRole('button', { name: 'Add' }));
    });
  });
});
