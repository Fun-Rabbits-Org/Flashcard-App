import { configureStore } from '@reduxjs/toolkit';
import decksReducer from './decksSlice';
import currentDeckReducer from './currentDeckSlice';
import isLoggedIn from './isLoggedIn';

export const store = configureStore({
  reducer: {
    decks: decksReducer,
    currentDeck: currentDeckReducer,
    login: isLoggedIn
  },
});
