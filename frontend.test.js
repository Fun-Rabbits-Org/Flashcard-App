/**
 * @jest-environment jsdom
 */

import React from 'React';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { store } from './client/redux/store';
import App from './client/App';

describe('React-Redux integration tests', () => {
  describe('Empty state before interactions', () => {
    beforeEach(async () => {
      const app = await render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );
    });

    test('The page loads with Add button', () => {
      expect(screen.getByRole('button', { name: 'Sign In' }));
    });

    //   test('The page loads with Add button', () => {
    //     expect(screen.getByRole('button', { name: 'Add' }));
    //   });
  });
});
