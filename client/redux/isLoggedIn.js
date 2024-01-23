import { createSlice } from '@reduxjs/toolkit';

const Login = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false
  },
  reducers:{
    login: (state, action) => {
      state.isLoggedIn = action.payload
  }
  },
})

export const { login } =
  Login.actions;

export default Login.reducer;