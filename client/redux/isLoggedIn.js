import { createSlice } from '@reduxjs/toolkit';

const Login = createSlice({
  name: 'currentDeck',
  initialState: {
    isLoggedIn: false
  },
  reducers:{
    login: (state, action) => {
      state.isLoggedIn = true
  }
  },
})

export const { login } =
  Login.actions;

export default Login.reducer;