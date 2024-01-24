import { configureStore } from '@reduxjs/toolkit';
import decksReducer from './decksSlice';
import currentDeckReducer from './currentDeckSlice';
import isLoggedIn from './isLoggedIn'
import UserInfo from './UserInfo';

export const store = configureStore({
  reducer: {
    decks: decksReducer,
    currentDeck: currentDeckReducer,
    login: isLoggedIn,
    userInfo: UserInfo
  },
});