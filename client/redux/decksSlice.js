import { createSlice } from "@reduxjs/toolkit";

export const decksSlice = createSlice({
  name: "decks",
  initialState: {
    decks: [],
    searchCriteria: "",
  },
  reducers: {
    loadDecks: (state, action) => {
      state.decks = action.payload;
    },
    addDeck: (state, action) => {
      state.decks.push(action.payload);
    },
    deleteDeck: (state, action) => {
      state.decks.filter((deck, index) => {
        index !== action.payload;
      });
    },
    searchInputText: (state, action) => {
      state.searchCriteria = action.payload;
    },
  },
});

export const { loadDecks, addDeck, deleteDeck, searchInputText } =
  decksSlice.actions;

export default decksSlice.reducer;
