import { createSlice } from '@reduxjs/toolkit';
import decksReducer from './decksSlice';
import currentDeckReducer from './currentDeckSlice';

const UserInfo = createSlice({
  name: 'user info',
  initialState: {
    userInfo: {
      username: '',
      password: '',
      decks: [],
      currentDeck: {
        id: '',
        cards: [],
      },}
  },
  reducers:{
    UserInfoReducer: (state, action) => {
      state.userInfo = Object.assign(state.userInfo, action.payload)
    },
    selectDeck: (state, action) => {
      state.id = action.payload;
    },
    loadCards: (state, action) => {
      state.userInfo.currentDeck.cards = action.payload;
    },
    addCard: (state, action) => {
      state.userInfo.currentDeck.cards.push(action.payload);
    },
    deleteCard: (state, action) => {
      state.userInfo.currentDeck.cards.filter((card, index) => {
        index !== action.payload;
      });
    },
    loadDecks: (state, action) => {
      state.userInfo.decks = action.payload;
    },
    addDeck: (state, action) => {
      state.userInfo.decks.push(action.payload);
    },
    deleteDeck: (state, action) => {
      state.userInfo.decks.filter((deck, index) => {
        index !== action.payload;
      });
    },
  }
})

export const { UserInfoReducer, selectDeck, loadCards, addCard, deleteCard, loadDecks, addDeck, deleteDeck } =
  UserInfo.actions;

export default UserInfo.reducer;